import { supabaseClient, currentUser, showLoading, hideLoading, forceHideLoading, currentUserRole, openChangePasswordModal, logAction } from './main.js';

let currentDate = new Date();
let events = [];
let groups = [];
let categories = [];
let userGroups = [];
let attendances = [];
let allUserGroups = [];
let allAttendances = [];
let appUsers = [];
let userAttributes = [];
let isAttendanceInitialized = false;
let myDelegations = [];
let eventLocations = [];
let modalSelectedDates = [];

window.att_multiSelectMode = false;
window.att_selectedDates = new Set();


// イベントの対象グループ情報を取得するヘルパー
function getEventTargetGroupsInfo(ev) {
    let gIds = ev.target_group_ids || [];
    if (gIds.length === 0 && ev.target_group_id) gIds = [ev.target_group_id];
    
    if (gIds.length === 0) return { ids: [], name: '全体', color: '#e5e7eb' };
    
    const matchedGroups = groups.filter(g => gIds.includes(g.id));
    if (matchedGroups.length === 0) return { ids: [], name: '全体', color: '#e5e7eb' };
    
    return {
        ids: gIds,
        name: matchedGroups.map(g => g.name).join(', '),
        color: matchedGroups[0].color || '#e5e7eb',
        groups: matchedGroups
    };
}

// ヘルパー関数: グループのタグHTMLを生成
function generateGroupTagsHtml(groupInfo) {
    if (groupInfo.ids.length === 0) {
        return `<span class="text-xs border border-gray-300 text-gray-800 px-2 py-0.5 rounded shadow-sm" style="background-color: #e5e7eb">全体</span>`;
    }
    return groupInfo.groups.map(g => `<span class="text-xs border border-gray-300 text-gray-800 px-2 py-0.5 rounded shadow-sm" style="background-color: ${g.color || '#e5e7eb'}">${g.name}</span>`).join(' ');
}

function formatUpdatedAt(isoStr) {
    if (!isoStr) return '-';
    try {
        const d = new Date(isoStr);
        if (isNaN(d.getTime())) return '-';
        const m = d.getMonth() + 1;
        const date = d.getDate();
        const h = String(d.getHours()).padStart(2, '0');
        const min = String(d.getMinutes()).padStart(2, '0');
        return `${m}/${date} ${h}:${min}`;
    } catch (e) {
        return '-';
    }
}

// =====================================
// 初期化とイベントリスナー設定
// =====================================
export async function initAttendanceApp() {
    try {
        if (!isAttendanceInitialized) {
            setupEventListeners();
            isAttendanceInitialized = true;
        }
        await loadData();
        renderCalendar();
        updateGroupFilter();
        updateCategoryFilter();
    } catch (err) {
        console.error("Attendance App Init Error:", err);
        if (typeof forceHideLoading === 'function') forceHideLoading();
    }
}

function setupEventListeners() {
    // パスワード変更ボタンの追加
    const logoutBtn = document.getElementById('btn-logout-att');
    if (logoutBtn && !document.getElementById('btn-change-password-att')) {
        const changePwBtn = document.createElement('button');
        changePwBtn.id = 'btn-change-password-att';
        changePwBtn.className = 'text-xs md:text-sm bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 md:px-3 md:py-1 rounded shadow mr-2 font-bold';
        changePwBtn.textContent = 'パスワード変更';
        changePwBtn.onclick = () => openChangePasswordModal();
        logoutBtn.parentNode.insertBefore(changePwBtn, logoutBtn);
    }

    // タブ切り替え
    document.getElementById('tab-calendar')?.addEventListener('click', () => switchTab('calendar'));
    document.getElementById('tab-list')?.addEventListener('click', () => {
        switchTab('list');
        renderList();
    });

    // カレンダー月移動
    document.getElementById('cal-prev-month')?.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    document.getElementById('cal-next-month')?.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // 「今日」ボタンを動的に追加
    const nextMonthBtn = document.getElementById('cal-next-month');
    if (nextMonthBtn && !document.getElementById('cal-today')) {
        const todayBtn = document.createElement('button');
        todayBtn.id = 'cal-today';
        todayBtn.className = 'text-xs md:text-sm bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 px-3 py-1 rounded shadow-sm ml-2 font-bold transition';
        todayBtn.textContent = '今日';
        todayBtn.onclick = () => {
            currentDate = new Date();
            renderCalendar();
        };
        nextMonthBtn.parentNode.insertBefore(todayBtn, nextMonthBtn.nextSibling);
    }

    // モーダルオープン系
    document.getElementById('btn-add-event')?.addEventListener('click', () => openAddEventModal());
    
    // 古いグループ管理ボタンは非表示化
    const manageBtn = document.getElementById('btn-group-manage');
    if(manageBtn) manageBtn.style.display = 'none';

    // リストフィルター
    document.getElementById('filter-category')?.addEventListener('change', () => {
        renderList();
        renderCalendar();
    });
    document.getElementById('filter-group')?.addEventListener('change', () => {
        renderList();
        renderCalendar();
    });
    
    document.getElementById('btn-toggle-multiselect')?.addEventListener('click', function() {
        window.att_multiSelectMode = !window.att_multiSelectMode;
        if (!window.att_multiSelectMode) {
            window.att_selectedDates.clear();
        }
        this.classList.toggle('bg-blue-600', window.att_multiSelectMode);
        this.classList.toggle('text-white', window.att_multiSelectMode);
        this.classList.toggle('bg-blue-50', !window.att_multiSelectMode);
        this.classList.toggle('text-blue-600', !window.att_multiSelectMode);
        
        renderCalendar();
        window.att_updateMultiselectBar();
    });
}

function switchTab(tab) {
    const btnCal = document.getElementById('tab-calendar');
    const btnList = document.getElementById('tab-list');
    
    if (tab === 'calendar') {
        document.getElementById('calendar-container').classList.remove('hidden');
        document.getElementById('list-container').classList.add('hidden');
        btnCal.classList.replace('bg-white', 'bg-green-600');
        btnCal.classList.replace('text-green-600', 'text-white');
        btnList.classList.replace('bg-green-600', 'bg-white');
        btnList.classList.replace('text-white', 'text-green-600');
    } else {
        document.getElementById('calendar-container').classList.add('hidden');
        document.getElementById('list-container').classList.remove('hidden');
        btnList.classList.replace('bg-white', 'bg-green-600');
        btnList.classList.replace('text-green-600', 'text-white');
        btnCal.classList.replace('bg-green-600', 'bg-white');
        btnCal.classList.replace('text-white', 'text-green-600');
    }
}

async function loadData() {
    showLoading('イベント・出欠データ読み込み中...');
    
    try {
        // グループ読み込み
        const { data: gData } = await supabaseClient.from('groups').select('*').order('created_at');
        if (gData) groups = gData;

        // カテゴリ読み込み
        const { data: cData } = await supabaseClient.from('event_categories').select('*').order('created_at');
        if (cData && cData.length > 0) {
            categories = cData;
        } else {
            categories = [{id:'1', name:'練習'}, {id:'2', name:'試合'}, {id:'3', name:'イベント'}];
        }

        // 取得するイベントの日付範囲を計算（現在日時から前後6ヶ月）
        const now = new Date();
        const rangeStart = new Date(now.getFullYear(), now.getMonth() - 6, 1);
        const rangeEnd = new Date(now.getFullYear(), now.getMonth() + 7, 1);

        // イベント読み込み
        const { data: eData } = await supabaseClient.from('events')
            .select('*')
            .gte('start_time', rangeStart.toISOString())
            .lt('start_time', rangeEnd.toISOString())
            .order('start_time');
        if (eData) events = eData;

        // 全ユーザー情報（出欠集計用）
        const { data: uData } = await supabaseClient.from('app_users').select('email, name, attribute_id');
        if (uData) appUsers = uData;

        // ユーザー属性情報（出欠集計用）
        const { data: attrData } = await supabaseClient.from('user_attributes').select('*').order('created_at');
        if (attrData) userAttributes = attrData;

        // 場所情報（場所マスタ）
        try {
            const { data: locData } = await supabaseClient.from('event_locations').select('*').order('name');
            if (locData) eventLocations = locData;
        } catch (e) {
            console.warn("event_locations table might not exist yet:", e);
            eventLocations = [];
        }

        // 全員の所属グループ
        const { data: ugData } = await supabaseClient.from('user_groups').select('*');
        if (ugData) {
            allUserGroups = ugData;
            if (currentUser) userGroups = ugData.filter(u => u.user_email === currentUser.email);
        }

        // 全員の出欠情報
        let aData = [];
        if (events && events.length > 0) {
            const eventIds = events.map(e => e.id);
            const { data } = await supabaseClient.from('attendances')
                .select('*')
                .in('event_id', eventIds);
            if (data) aData = data;
        }
        allAttendances = aData;
        if (currentUser) attendances = aData.filter(a => a.user_email === currentUser.email);
        
        // 代行権限情報の読み込み
        try {
            const { data: mdData } = await supabaseClient.from('master_data').select('data').eq('key', 'ATTENDANCE_DELEGATIONS').single();
            if (mdData && mdData.data && currentUser) {
                myDelegations = mdData.data[currentUser.email] || [];
            }
        } catch (err) { myDelegations = []; }

    } catch (e) {
        console.error("Attendance DB Error:", e);
        // テーブルがない場合などのエラーを握りつぶし、空の状態で動作させる
    } finally {
        if (typeof forceHideLoading === 'function') {
            forceHideLoading();
        } else {
            hideLoading();
        }
    }
}

function updateGroupFilter() {
    const sel = document.getElementById('filter-group');
    if (!sel) return;
    sel.innerHTML = '<option value="">すべてのグループ</option>' + groups.map(g => `<option value="${g.id}">${g.name}</option>`).join('');
}

function updateCategoryFilter() {
    const sel = document.getElementById('filter-category');
    if (!sel) return;
    const currentVal = sel.value;
    sel.innerHTML = '<option value="">すべてのカテゴリ</option>' + categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
    if(categories.some(c => c.name === currentVal)) sel.value = currentVal;
}

// =====================================
// カレンダー・リスト 描画
// =====================================
function getFilteredEvents() {
    const catFilter = document.getElementById('filter-category')?.value;
    const groupFilter = document.getElementById('filter-group')?.value;
    
    return events.filter(e => {
        if (catFilter && e.category !== catFilter) return false;
        if (groupFilter) {
            const groupInfo = getEventTargetGroupsInfo(e);
            if (groupInfo.ids.length === 0) return false; // 全体の予定は除外
            if (!groupInfo.ids.includes(groupFilter)) return false;
        }
        return true;
    });
}

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    document.getElementById('cal-current-month').textContent = `${year}年 ${month + 1}月`;
    
    const grid = document.getElementById('calendar-grid');
    if (grid) {
        // 余白を詰めるためにgapやpaddingを削除する
        grid.classList.remove('gap-1', 'gap-px', 'gap-2', 'p-1', 'p-2', 'p-4');
    }
    // ヘッダー（曜日）は残してクリア
    Array.from(grid.children).forEach((child, index) => {
        if (index >= 7) grid.removeChild(child);
    });
    
    // 月の初日と、その週の日曜日を計算
    const firstDayOfMonth = new Date(year, month, 1);
    const startOffset = firstDayOfMonth.getDay(); 
    const startDate = new Date(year, month, 1 - startOffset);
    
    // 6週間 (42日) 分を描画
    const now = new Date();
    for (let i = 0; i < 42; i++) {
        const targetDate = new Date(startDate);
        targetDate.setDate(startDate.getDate() + i);
        
        const cellYear = targetDate.getFullYear();
        const cellMonth = targetDate.getMonth();
        const cellDate = targetDate.getDate();
        const isCurrentMonth = (cellMonth === month);
        
        const targetDateStr = `${cellYear}-${String(cellMonth+1).padStart(2, '0')}-${String(cellDate).padStart(2, '0')}`;
        const isSelected = window.att_multiSelectMode && window.att_selectedDates.has(targetDateStr);
        
        const dayOfWeek = targetDate.getDay();
        const isHoliday = isJapaneseHoliday(targetDate);
        const isToday = (cellYear === now.getFullYear() && cellMonth === now.getMonth() && cellDate === now.getDate());

        const cell = document.createElement('div');
        let cellClass = `border-r border-b min-h-[100px] flex flex-col p-0 cursor-pointer`;
        
        if (!isCurrentMonth) {
            cellClass += ' bg-gray-50 opacity-60';
        } else {
            if (isHoliday || dayOfWeek === 0) {
                cellClass += ' bg-sunday-hatch';
            } else if (dayOfWeek === 6) {
                cellClass += ' bg-saturday-hatch';
            } else {
                cellClass += ' bg-white';
            }
        }
        
        if (isSelected) {
            cellClass = `border-2 border-blue-500 min-h-[100px] flex flex-col p-0 bg-blue-50/70 cursor-pointer z-10`;
        }
        
        if (isToday) {
            cellClass += ' today-cell-border';
        }
        
        cell.className = cellClass;
        
        cell.onclick = () => {
            if (window.att_multiSelectMode) {
                if (window.att_selectedDates.has(targetDateStr)) {
                    window.att_selectedDates.delete(targetDateStr);
                } else {
                    window.att_selectedDates.add(targetDateStr);
                }
                renderCalendar();
                window.att_updateMultiselectBar();
            } else {
                openAddEventModal(targetDateStr);
            }
        };
        
        // 日付は右上に配置（土日祝の色分け）
        const dateHeader = document.createElement('div');
        let dateColorClass = 'text-gray-700';
        if (isCurrentMonth) {
            if (isHoliday || dayOfWeek === 0) {
                dateColorClass = 'text-red-600 font-bold';
            } else if (dayOfWeek === 6) {
                dateColorClass = 'text-blue-600 font-bold';
            }
        }
        dateHeader.className = `text-right text-[11px] ${dateColorClass} mb-0 pr-1 pt-1 leading-none`;
        dateHeader.textContent = cellDate;
        cell.appendChild(dateHeader);
        
        // 予定格納コンテナ
        const eventsContainer = document.createElement('div');
        eventsContainer.className = 'flex-1 overflow-hidden flex flex-col gap-0';
        
        const filteredEvents = getFilteredEvents();
        const dayEvents = filteredEvents.filter(e => e.start_time && e.start_time.startsWith(targetDateStr));
        
        const displayEvents = dayEvents.slice(0, 5); // 1日5件まで表示
        const hasMore = dayEvents.length > 5;
        
        displayEvents.forEach(e => {
            const evEl = document.createElement('div');
            
            const myAtt = attendances.find(a => a.event_id === e.id);
            let iconHtml = '';
            let statusClass = 'text-gray-800'; // 出欠なしのデフォルト
            if (e.requires_attendance) {
                const status = myAtt ? myAtt.status : '未入力';
                if (status === '出席') {
                    iconHtml = '<span class="inline-block text-[9px] font-bold text-white bg-blue-600 rounded px-0.5 mr-0.5 leading-none shrink-0 align-middle">出</span>';
                    statusClass = 'text-blue-700 font-bold';
                } else if (status === '欠席') {
                    iconHtml = '<span class="inline-block text-[9px] font-bold text-white bg-gray-400 rounded px-0.5 mr-0.5 leading-none shrink-0 align-middle">欠</span>';
                    statusClass = 'text-gray-800 opacity-70'; // 少し薄くする
                } else if (status === '保留' || status === '未定') {
                    iconHtml = '<span class="inline-block text-[9px] font-bold text-white bg-amber-500 rounded px-0.5 mr-0.5 leading-none shrink-0 align-middle">保</span>';
                    statusClass = 'text-gray-800';
                } else {
                    iconHtml = '<span class="inline-block text-[9px] font-bold text-white bg-red-500 rounded px-0.5 mr-0.5 leading-none shrink-0 align-middle">未</span>';
                    statusClass = 'text-red-600 font-bold';
                }
            }
            
            const categoryObj = categories.find(c => c.name === e.category);
            const categoryColor = categoryObj?.color || '#bfdbfe';
            // タイトル内の改行コードを半角スペースに置換して表示崩れを防ぐ
            const cleanTitle = (e.title || '').replace(/[\r\n]+/g, ' ');
            
            evEl.className = `text-[10px] rounded px-0.5 py-px truncate whitespace-nowrap overflow-hidden text-ellipsis w-full text-left cursor-pointer hover:opacity-80 leading-tight mb-0.5 ${statusClass}`;
            evEl.style.backgroundColor = categoryColor;
            evEl.innerHTML = `${iconHtml}${cleanTitle}`;
            evEl.title = e.title;
            evEl.onclick = (ev) => {
                ev.stopPropagation();
                window.att_openEventDetail(e.id);
            };
            eventsContainer.appendChild(evEl);
        });
        
        if (hasMore) {
            const moreEl = document.createElement('div');
            moreEl.className = 'text-[10px] text-gray-500 text-center mt-[1px] cursor-pointer hover:underline';
            moreEl.textContent = `他 ${dayEvents.length - 5} 件`;
            moreEl.onclick = (ev) => {
                ev.stopPropagation();
                alert(`${targetDateStr} の予定が多すぎます。リストビューで確認してください。`);
            };
            eventsContainer.appendChild(moreEl);
        }
        
        cell.appendChild(eventsContainer);
        grid.appendChild(cell);
    }
}

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

function formatEventHeaderDate(dateStr) {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const dateNum = d.getDate();
    const day = WEEKDAYS[d.getDay()];
    return `${dateNum}日(${day})`;
}

function formatEventDateTime(startStr, endStr, isAllDay) {
    const start = new Date(startStr);
    if (isNaN(start.getTime())) return '日時未定';
    
    const month = start.getMonth() + 1;
    const date = start.getDate();
    const day = WEEKDAYS[start.getDay()];
    const datePart = `${month}/${date}(${day})`;
    
    if (isAllDay) {
        return `${datePart} 終日`;
    }
    
    const timePart = startStr.substring(11, 16);
    let endPart = '';
    if (endStr) {
        const end = new Date(endStr);
        if (!isNaN(end.getTime())) {
            endPart = ` - ${endStr.substring(11, 16)}`;
        }
    }
    return `${datePart}${timePart}${endPart}`;
}

function formatCreatedAt(createdStr) {
    if (!createdStr) return '';
    const d = new Date(createdStr);
    if (isNaN(d.getTime())) return '';
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}/${month}/${date} ${hours}:${minutes}`;
}

function renderList() {
    const filtered = getFilteredEvents();

    const container = document.getElementById('event-list-content');
    if (filtered.length === 0) {
        container.innerHTML = '<p class="text-gray-500 p-4">表示するイベントがありません。</p>';
        return;
    }

    // 1. 日付順にソート (start_time 昇順)
    const sorted = [...filtered].sort((a, b) => {
        if (!a.start_time) return 1;
        if (!b.start_time) return -1;
        return a.start_time.localeCompare(b.start_time);
    });

    // 2. 日付ごとにグループ化
    const groupsMap = {};
    sorted.forEach(e => {
        const dateKey = e.start_time ? e.start_time.split('T')[0] : '未定';
        if (!groupsMap[dateKey]) {
            groupsMap[dateKey] = [];
        }
        groupsMap[dateKey].push(e);
    });

    // 今日の日付文字列 (JST対応でローカル時間を基準にする)
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    // 3. HTMLを構築
    let html = '';
    
    Object.keys(groupsMap).forEach(dateStr => {
        const dateEvents = groupsMap[dateStr];
        
        // 日付ヘッダーのフォーマット
        let headerText = '日時未定';
        let todayBadgeHtml = '';
        
        if (dateStr !== '未定') {
            headerText = formatEventHeaderDate(dateStr);
            if (dateStr === todayStr) {
                const d = new Date(dateStr);
                todayBadgeHtml = `<span class="ml-2 bg-green-600 text-white text-xs px-2.5 py-0.5 rounded-full font-bold shadow-sm">${d.getDate()}日(今日)</span>`;
            }
        }

        html += `
        <div class="space-y-2 mb-4">
            <div class="flex items-center text-sm font-bold text-gray-700 border-b border-gray-200 pb-1 px-1">
                <span>${headerText}</span>
                ${todayBadgeHtml}
            </div>
        `;

        dateEvents.forEach(e => {
            const groupInfo = getEventTargetGroupsInfo(e);
            const groupName = groupInfo.name;
            const groupColor = groupInfo.color;
            const categoryObj = categories.find(c => c.name === e.category);
            const categoryColor = categoryObj?.color || '#bfdbfe';
            
            // 出欠状況
            const myAtt = attendances.find(a => a.event_id === e.id);
            let statusStr = myAtt && myAtt.status ? myAtt.status : '未回答';
            if (statusStr === '未定') statusStr = '保留';
            
            // 日時フォーマット
            const dt = formatEventDateTime(e.start_time, e.end_time, e.is_all_day);

            // 登録者名と作成日時のフォーマット
            let creatorName = '不明';
            if (e.created_by) {
                const userObj = appUsers.find(u => u.email === e.created_by);
                creatorName = userObj ? (userObj.name || e.created_by.split('@')[0]) : e.created_by.split('@')[0];
            }
            const createdAtStr = formatCreatedAt(e.created_at);
            const creatorHtml = e.created_by ? `
                <div class="flex items-center text-gray-400 text-[10px] mt-1 space-x-1">
                    <span class="w-4 h-4 rounded-full bg-green-50 flex items-center justify-center text-[10px] text-green-700 font-bold">👤</span>
                    <span>${creatorName} ${createdAtStr}</span>
                </div>
            ` : '';

            // 右上のバッジ（回答期限と出欠マーク）
            let rightHeaderHtml = '';
            if (e.requires_attendance) {
                const isPastDeadline = e.attendance_deadline ? new Date() > new Date(e.attendance_deadline) : false;
                let deadlineBadgeClass = 'bg-gray-100 text-gray-600';
                let deadlineText = '';
                
                if (isPastDeadline) {
                    deadlineText = '回答期限切れ';
                    deadlineBadgeClass = 'bg-gray-200 text-gray-500';
                } else if (e.attendance_deadline) {
                    const dl = new Date(e.attendance_deadline);
                    const dlMonth = dl.getMonth() + 1;
                    const dlDate = dl.getDate();
                    const dlHours = String(dl.getHours()).padStart(2, '0');
                    const dlMinutes = String(dl.getMinutes()).padStart(2, '0');
                    deadlineText = `回答期限: ${dlMonth}/${dlDate} ${dlHours}:${dlMinutes}`;
                }

                const deadlineHtml = deadlineText ? `<span class="text-[10px] px-1.5 py-0.5 rounded ${deadlineBadgeClass} font-semibold">${deadlineText}</span>` : '';

                // 出欠アイコン (画像に近いスタイル)
                let statusIconHtml = '';
                if (statusStr === '出席') {
                    statusIconHtml = `<div class="flex items-center justify-center w-5 h-5 bg-green-600 text-white rounded-full text-[10px] font-bold shadow-sm" title="出席">O</div>`;
                } else if (statusStr === '欠席') {
                    statusIconHtml = `<div class="flex items-center justify-center w-5 h-5 bg-black text-white rounded text-[10px] font-bold shadow-sm" title="欠席">X</div>`;
                } else if (statusStr === '保留') {
                    statusIconHtml = `<div class="flex items-center justify-center w-5 h-5 bg-yellow-600 text-white rounded-full text-[10px] font-bold shadow-sm" title="保留">-</div>`;
                } else {
                    statusIconHtml = `<div class="flex items-center justify-center w-5 h-5 bg-red-600 text-white rounded-full text-[10px] font-bold shadow-sm animate-pulse" title="未回答">?</div>`;
                }

                rightHeaderHtml = `
                    <div class="flex items-center space-x-2 shrink-0">
                        ${deadlineHtml}
                        ${statusIconHtml}
                    </div>
                `;
            }

            html += `
            <div class="p-2 px-3 border border-gray-200/60 rounded-lg hover:shadow-md transition bg-white flex flex-col justify-between cursor-pointer relative shadow-sm" onclick="window.att_openEventDetail('${e.id}')">
                
                <!-- カード上部（タイトルと右上バッジ） -->
                <div class="flex justify-between items-start mb-1 gap-2">
                    <h3 class="font-bold text-sm md:text-base text-gray-800 flex items-center pr-2">
                        <span class="mr-1 text-base">📅</span>
                        <span>${e.title}</span>
                    </h3>
                    ${rightHeaderHtml}
                </div>

                <!-- カード中部（カテゴリと詳細） -->
                <div class="flex flex-wrap items-center gap-2 text-[11px] md:text-xs text-gray-600">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold" style="background-color: ${categoryColor}; color: #1f2937">${e.category || 'イベント'}</span>
                    <span class="flex items-center space-x-1">
                        <span>🕒</span>
                        <span>${dt}</span>
                    </span>
                    <span class="flex items-center space-x-0.5">
                        <span>📍</span>
                        <span>${formatLocationHtml(e.location)}</span>
                    </span>
                </div>

                <!-- カード下部（登録者と詳細矢印） -->
                <div class="flex justify-between items-end mt-1">
                    ${creatorHtml}
                    <!-- 詳細矢印 (緑の右向き) -->
                    <div class="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition absolute right-2 bottom-2">
                        <span class="text-green-700 text-[10px] font-bold leading-none">&#10095;</span>
                    </div>
                </div>

            </div>
            `;
        });

        html += `</div>`;
    });

    container.innerHTML = html;
}

// =====================================
// モーダルとDB操作（イベント）
// =====================================
function openAddEventModal(dateStr = '', sourceEvent = null, isEdit = false, initialDates = null) {
    let titleVal = '';
    if (sourceEvent) {
        titleVal = sourceEvent.title.replace(/"/g, '&quot;');
        if (!isEdit) titleVal += ' (コピー)';
    }
    const isNew = !sourceEvent && !isEdit;
    
    // Initialize modalSelectedDates
    if (initialDates && initialDates.length > 0) {
        modalSelectedDates = [...initialDates];
    } else if (sourceEvent) {
        modalSelectedDates = [sourceEvent.start_time.split('T')[0]];
    } else if (dateStr) {
        modalSelectedDates = [dateStr];
    } else {
        modalSelectedDates = [new Date().toISOString().split('T')[0]];
    }
    window.att_modalSelectedDates = modalSelectedDates;
    window.att_isEditingModal = isEdit;

    const timeVal = sourceEvent && sourceEvent.start_time && !sourceEvent.is_all_day ? sourceEvent.start_time.split('T')[1].substring(0,5) : (isNew ? '12:30' : '');
    const endTimeVal = sourceEvent && sourceEvent.end_time && !sourceEvent.is_all_day ? sourceEvent.end_time.split('T')[1].substring(0,5) : (isNew ? '17:00' : '');
    const isAllDay = sourceEvent ? sourceEvent.is_all_day : false;
    const categoryVal = sourceEvent ? sourceEvent.category : '';
    const locationVal = sourceEvent ? (sourceEvent.location || '').replace(/"/g, '&quot;') : '';
    const descVal = sourceEvent ? (sourceEvent.description || '').replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
    const reqAtt = sourceEvent ? sourceEvent.requires_attendance : true;
    const reqDetAtt = sourceEvent ? sourceEvent.require_detailed_attendance : false;

    const timeH = timeVal ? timeVal.split(':')[0] : '';
    const timeM = timeVal ? timeVal.split(':')[1] : '';
    const endTimeH = endTimeVal ? endTimeVal.split(':')[0] : '';
    const endTimeM = endTimeVal ? endTimeVal.split(':')[1] : '';

    // Check if the current event's location is in the master list
    const isCustomLocation = !locationVal || !eventLocations.some(loc => {
        const fullVal = loc.url ? `${loc.name} ${loc.url}` : loc.name;
        return fullVal === locationVal;
    });
    
    let customName = '';
    let customUrl = '';
    if (locationVal) {
        const urlMatch = locationVal.match(/(https?:\/\/[^\s\<\>\"]+)/);
        if (urlMatch) {
            customUrl = urlMatch[0];
            customName = locationVal.replace(customUrl, '').trim();
        } else {
            customName = locationVal;
        }
    }

    // Determine custom deadline or auto-deadline status
    const hasCustomDeadline = !!(sourceEvent && sourceEvent.attendance_deadline && (sourceEvent.attendance_deadline !== getDefaultDeadline(sourceEvent.start_time.split('T')[0])));
    
    const defaultDlDate = getDefaultDeadline(modalSelectedDates[0]) ? getDefaultDeadline(modalSelectedDates[0]).split('T')[0] : '';
    const dlDate = sourceEvent && sourceEvent.attendance_deadline ? sourceEvent.attendance_deadline.split('T')[0] : defaultDlDate;
    const dlTime = sourceEvent && sourceEvent.attendance_deadline ? sourceEvent.attendance_deadline.split('T')[1].substring(0,5) : '12:00';
    const dlTimeH = dlTime ? dlTime.split(':')[0] : '12';
    const dlTimeM = dlTime ? dlTime.split(':')[1] : '00';

    const hoursOptions = (selectedVal) => '<option value="">--</option>' + Array.from({length: 24}, (_, i) => String(i).padStart(2, '0')).map(h => `<option value="${h}" ${h === selectedVal ? 'selected' : ''}>${h}</option>`).join('');
    const minutesOptions = (selectedVal) => '<option value="">--</option>' + Array.from({length: 60}, (_, i) => String(i).padStart(2, '0')).map(m => `<option value="${m}" ${m === selectedVal ? 'selected' : ''}>${m}</option>`).join('');

    const copyGroupIds = sourceEvent ? (sourceEvent.target_group_ids && sourceEvent.target_group_ids.length > 0 ? sourceEvent.target_group_ids : (sourceEvent.target_group_id ? [sourceEvent.target_group_id] : [])) : [];

    const modalTitle = isEdit ? 'イベントを編集' : (sourceEvent ? 'イベントを複製' : '新規イベント登録');

    const groupCheckboxes = `
        <div class="border p-2 rounded max-h-32 overflow-y-auto space-y-1 bg-white">
            <label class="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" id="ev-group-all" value="all" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" ${(copyGroupIds.length === 0) ? 'checked' : ''}>
                <span class="text-xs font-medium">全体</span>
            </label>
            ${groups.map(g => `
                <label class="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" name="ev-group-cb" value="${g.id}" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" ${copyGroupIds.includes(g.id) ? 'checked' : ''}>
                    <span class="text-xs">${g.name}</span>
                </label>
            `).join('')}
        </div>
    `;

    let datesHtml = '';
    if (isEdit) {
        datesHtml = `
            <div>
                <label class="text-xs font-bold text-gray-600">日付*</label>
                <div id="ev-dates-container" class="mt-1">
                    <input type="date" value="${modalSelectedDates[0]}" class="w-full border p-1.5 rounded text-xs px-1" onchange="window.att_onSingleDateChange(this.value)">
                </div>
            </div>
        `;
    } else {
        datesHtml = `
            <div>
                <label class="text-xs font-bold text-gray-600">日付*</label>
                <div id="ev-dates-container" class="space-y-1.5 max-h-32 overflow-y-auto border p-2 rounded bg-gray-50 mt-1">
                    <!-- Rendered by renderDateRows() -->
                </div>
                <button type="button" onclick="window.att_addDateRow()" class="mt-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded text-xs font-bold flex items-center space-x-1 transition shadow-sm border border-gray-200">
                    <span>＋ 日付を追加</span>
                </button>
            </div>
        `;
    }


    const modalHtml = `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
        <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col text-sm text-gray-800">
            <h3 class="text-lg font-bold mb-3 shrink-0">${modalTitle}</h3>
            <div class="space-y-3 overflow-y-auto pr-1 flex-1">
                <div>
                    <label class="text-xs font-bold text-gray-600">イベント名*</label>
                    <input type="text" id="ev-title" value="${titleVal}" placeholder="イベント名" class="w-full border p-1.5 rounded text-xs">
                </div>
                
                <!-- Date input block -->
                ${datesHtml}
                
                <!-- Time and AllDay Row -->
                <div class="flex space-x-4 items-end">
                    <div id="ev-time-container" class="flex-1 ${isAllDay ? 'opacity-50' : ''}">
                        <label class="text-xs font-bold text-gray-600">開始時間</label>
                        <div class="flex items-center space-x-1 mt-1">
                            <select id="ev-time-h" class="w-full border py-1.5 px-1.5 rounded text-xs bg-white" ${isAllDay ? 'disabled' : ''}>${hoursOptions(timeH)}</select>
                            <span class="font-bold text-gray-500">:</span>
                            <select id="ev-time-m" class="w-full border py-1.5 px-1.5 rounded text-xs bg-white" ${isAllDay ? 'disabled' : ''}>${minutesOptions(timeM)}</select>
                        </div>
                    </div>
                    <div id="ev-end-time-container" class="flex-1 ${isAllDay ? 'opacity-50' : ''}">
                        <label class="text-xs font-bold text-gray-600">終了時間</label>
                        <div class="flex items-center space-x-1 mt-1">
                            <select id="ev-end-time-h" class="w-full border py-1.5 px-1.5 rounded text-xs bg-white" ${isAllDay ? 'disabled' : ''}>${hoursOptions(endTimeH)}</select>
                            <span class="font-bold text-gray-500">:</span>
                            <select id="ev-end-time-m" class="w-full border py-1.5 px-1.5 rounded text-xs bg-white" ${isAllDay ? 'disabled' : ''}>${minutesOptions(endTimeM)}</select>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2 pb-1.5">
                        <input type="checkbox" id="ev-all-day" class="w-4 h-4 text-blue-600 cursor-pointer rounded border-gray-300 focus:ring-blue-500" ${isAllDay ? 'checked' : ''} onchange="['ev-time-h','ev-time-m','ev-end-time-h','ev-end-time-m'].forEach(id=>{const el=document.getElementById(id); el.disabled=this.checked; if(this.checked)el.value='';}); document.getElementById('ev-time-container').classList.toggle('opacity-50', this.checked); document.getElementById('ev-end-time-container').classList.toggle('opacity-50', this.checked);">
                        <label for="ev-all-day" class="font-bold text-gray-700 text-xs cursor-pointer select-none">終日</label>
                    </div>
                </div>
                
                <div class="flex space-x-2 pb-2 mb-2 border-b">
                    <div class="w-1/2">
                        <label class="text-xs font-bold text-gray-600">出欠設定</label>
                        <select id="ev-attendance-type" class="w-full border p-1.5 rounded font-bold text-xs bg-white" onchange="document.getElementById('ev-deadline-container').style.display = this.value === 'none' ? 'none' : 'block';">
                            <option value="none" ${!reqAtt ? 'selected' : ''}>なし</option>
                            <option value="simple" ${reqAtt && !reqDetAtt ? 'selected' : ''}>簡易</option>
                            <option value="detailed" ${reqAtt && reqDetAtt ? 'selected' : ''}>詳細 (車・同伴者)</option>
                        </select>
                    </div>
                    
                    <div class="w-1/2" id="ev-deadline-container" style="display: ${!reqAtt ? 'none' : 'block'}">
                        <div class="flex items-center justify-between mb-0.5">
                            <label class="text-xs font-bold text-gray-600">回答期限</label>
                            <div class="flex items-center space-x-1">
                                <input type="checkbox" id="ev-deadline-custom-cb" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer" ${hasCustomDeadline ? 'checked' : ''} onchange="window.att_toggleDeadlineCustom(this.checked)">
                                <label for="ev-deadline-custom-cb" class="text-[11px] font-bold text-gray-500 cursor-pointer select-none">個別指定</label>
                            </div>
                        </div>
                        
                        <!-- Custom Deadline Inputs -->
                        <div id="ev-deadline-custom-inputs" class="flex items-center space-x-0.5 ${hasCustomDeadline ? '' : 'hidden'}">
                            <input type="date" id="ev-deadline-date" value="${dlDate}" class="w-[50%] border p-1.5 rounded text-xs px-1" onchange="this.blur()">
                            <select id="ev-deadline-time-h" class="w-[25%] border py-1.5 px-1 rounded text-xs bg-white">${hoursOptions(dlTimeH)}</select>
                            <span class="font-bold text-gray-500">:</span>
                            <select id="ev-deadline-time-m" class="w-[25%] border py-1.5 px-1 rounded text-xs bg-white">${minutesOptions(dlTimeM)}</select>
                        </div>
                        
                        <!-- Default Deadline Auto Label -->
                        <div id="ev-deadline-auto-preview" class="text-[11px] text-gray-600 bg-gray-50 border border-dashed border-gray-200 rounded p-1.5 font-medium leading-normal ${hasCustomDeadline ? 'hidden' : ''}">
                        </div>
                    </div>
                </div>

                <div class="flex space-x-2">
                    <div class="w-1/2">
                        <label class="text-xs font-bold text-gray-600">カテゴリ</label>
                        <select id="ev-category" class="w-full border p-1.5 rounded text-xs bg-white">
                            ${categories.map(c => `<option value="${c.name}" ${c.name === categoryVal ? 'selected' : ''}>${c.name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="w-1/2 flex flex-col">
                        <label class="text-xs font-bold text-gray-600 mb-1">対象グループ</label>
                        ${groupCheckboxes}
                    </div>
                </div>
                
                <!-- Place selection using Master Data -->
                <div class="flex flex-col space-y-1.5">
                    <label class="text-xs font-bold text-gray-600">場所</label>
                    <select id="ev-location-select" class="w-full border p-1.5 rounded text-xs font-medium bg-white" onchange="window.att_onLocationSelectChange(this.value)">
                        <option value="custom">-- 直接入力 / 新規マスタ追加 --</option>
                        ${eventLocations.map(loc => {
                            const fullVal = loc.url ? `${loc.name} ${loc.url}` : loc.name;
                            const isSelected = (locationVal === fullVal);
                            return `<option value="${fullVal}" ${isSelected ? 'selected' : ''}>${loc.name}${loc.url ? ' (URLあり)' : ''}</option>`;
                        }).join('')}
                    </select>
                    
                    <!-- Direct Input & Inline Master Register container -->
                    <div id="ev-location-custom-container" class="border p-2.5 rounded bg-gray-50 space-y-2 mt-1 ${isCustomLocation ? '' : 'hidden'}">
                        <div class="flex space-x-2">
                            <div class="flex-1">
                                <label class="text-[10px] font-bold text-gray-500">場所名</label>
                                <input type="text" id="ev-location-custom-name" value="${customName}" placeholder="例: 〇〇グラウンド" class="w-full border p-1 rounded text-xs bg-white">
                            </div>
                            <div class="flex-1">
                                <label class="text-[10px] font-bold text-gray-500">URL (Google Map 等、任意)</label>
                                <input type="text" id="ev-location-custom-url" value="${customUrl}" placeholder="https://..." class="w-full border p-1 rounded text-xs bg-white">
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <button type="button" onclick="window.att_registerNewLocation()" class="bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 px-3 py-1 rounded text-xs font-bold transition shadow-sm">
                                場所マスタに登録して選択する
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <label class="text-xs font-bold text-gray-600">説明</label>
                    <textarea id="ev-description" placeholder="説明" class="w-full border p-1.5 rounded text-xs" rows="3">${descVal}</textarea>
                </div>
            </div>
            <div class="flex justify-end space-x-3 mt-4 pt-4 border-t shrink-0">
                <button onclick="window.att_closeModal()" class="bg-gray-300 hover:bg-gray-400 px-4 py-1.5 rounded font-bold text-xs">キャンセル</button>
                <button onclick="window.att_saveEvent(${isEdit ? `'${sourceEvent.id}'` : 'null'})" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded font-bold text-xs shadow">${isEdit ? '更新' : '保存'}</button>
            </div>
        </div>
    </div>`;
    document.getElementById('attendance-modals').innerHTML = modalHtml;

    // Call helpers to render default deadline
    updateDefaultDeadlineLabel();

    if (!isEdit) {
        renderDateRows();
    }

    // 全体と個別の排他制御イベントリスナー
    const allCb = document.getElementById('ev-group-all');
    const groupCbs = document.querySelectorAll('input[name="ev-group-cb"]');
    
    allCb.addEventListener('change', function() {
        if (this.checked) {
            groupCbs.forEach(cb => cb.checked = false);
        }
    });
    groupCbs.forEach(cb => {
        cb.addEventListener('change', function() {
            if (this.checked) {
                allCb.checked = false;
            }
        });
    });
}

async function saveEvent(editEventId = null) {
    const title = document.getElementById('ev-title').value.trim();
    
    // Get all date values from the container
    const dateInputs = document.querySelectorAll('#ev-dates-container input[type="date"]');
    const dates = Array.from(dateInputs).map(inp => inp.value).filter(Boolean);
    
    if (!title) return alert('イベント名は必須です');
    if (dates.length === 0) return alert('日付を1つ以上指定してください');

    const th = document.getElementById('ev-time-h').value;
    const tm = document.getElementById('ev-time-m').value;
    let time = '';
    if (th || tm) {
        time = `${th || '00'}:${tm || '00'}`;
    }
    
    const eth = document.getElementById('ev-end-time-h').value;
    const etm = document.getElementById('ev-end-time-m').value;
    let endTimeStr = '';
    if (eth || etm) {
        endTimeStr = `${eth || '00'}:${etm || '00'}`;
    }
    
    const isAllDay = document.getElementById('ev-all-day').checked;

    // モーダルを閉じてDOMが削除される前に、すべての入力値を取得する
    const category = document.getElementById('ev-category').value;
    const description = document.getElementById('ev-description').value;
    
    // Location handling
    const locationSelect = document.getElementById('ev-location-select');
    let location = '';
    if (locationSelect) {
        if (locationSelect.value === 'custom') {
            const custName = document.getElementById('ev-location-custom-name')?.value.trim() || '';
            const custUrl = document.getElementById('ev-location-custom-url')?.value.trim() || '';
            location = custUrl ? `${custName} ${custUrl}` : custName;
        } else {
            location = locationSelect.value;
        }
    }
    
    const attType = document.getElementById('ev-attendance-type').value;
    const requires_attendance = attType !== 'none';
    const require_detailed_attendance = attType === 'detailed';
    
    const isCustomDeadline = document.getElementById('ev-deadline-custom-cb')?.checked || false;
    const dlDate = document.getElementById('ev-deadline-date')?.value;
    const dlH = document.getElementById('ev-deadline-time-h')?.value;
    const dlM = document.getElementById('ev-deadline-time-m')?.value;

    const isAll = document.getElementById('ev-group-all').checked;
    let target_group_ids = [];
    if (!isAll) {
        document.querySelectorAll('input[name="ev-group-cb"]:checked').forEach(cb => target_group_ids.push(cb.value));
    }
    const target_group_id = target_group_ids.length > 0 ? target_group_ids[0] : null;

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const MAX_RETRIES = 3;
    let attempt = 0;

    while (attempt < MAX_RETRIES) {
        attempt++;
        if (attempt > 1) {
            showLoading(`通信リトライ中 (${attempt - 1}/${MAX_RETRIES - 1}回目)...`);
            await sleep(1500);
        } else {
            showLoading('イベント保存中...');
        }

        try {
            if (editEventId) {
                const dateVal = dates[0];
                const startTime = `${dateVal}T${time || '00:00'}:00`;
                let endTime = null;
                if (endTimeStr) endTime = `${dateVal}T${endTimeStr}:00`;
                
                let attendanceDeadline = null;
                if (requires_attendance) {
                    if (isCustomDeadline) {
                        if (dlDate && dlH && dlM) {
                            attendanceDeadline = `${dlDate}T${dlH}:${dlM}:00`;
                        }
                    } else {
                        attendanceDeadline = getDefaultDeadline(dateVal);
                    }
                }
                
                const payload = {
                    title, category: category,
                    description: description,
                    location: location,
                    start_time: startTime,
                    end_time: endTime,
                    is_all_day: isAllDay,
                    requires_attendance: requires_attendance,
                    require_detailed_attendance: require_detailed_attendance,
                    attendance_deadline: attendanceDeadline,
                    target_group_id: target_group_id,
                    target_group_ids: target_group_ids.length > 0 ? target_group_ids : null,
                };
                
                const { error } = await supabaseClient.from('events').update(payload).eq('id', editEventId);
                if (error) throw error;
                await logAction('UPDATE_EVENT', `イベント「${title}」を更新しました`);
            } else {
                const payloads = dates.map(dVal => {
                    const startTime = `${dVal}T${time || '00:00'}:00`;
                    let endTime = null;
                    if (endTimeStr) endTime = `${dVal}T${endTimeStr}:00`;
                    
                    let attendanceDeadline = null;
                    if (requires_attendance) {
                        if (isCustomDeadline) {
                            if (dlDate && dlH && dlM) {
                                attendanceDeadline = `${dlDate}T${dlH}:${dlM}:00`;
                            }
                        } else {
                            attendanceDeadline = getDefaultDeadline(dVal);
                        }
                    }
                    
                    return {
                        title, category: category,
                        description: description,
                        location: location,
                        start_time: startTime,
                        end_time: endTime,
                        is_all_day: isAllDay,
                        requires_attendance: requires_attendance,
                        require_detailed_attendance: require_detailed_attendance,
                        attendance_deadline: attendanceDeadline,
                        target_group_id: target_group_id,
                        target_group_ids: target_group_ids.length > 0 ? target_group_ids : null,
                        created_by: currentUser?.email
                    };
                });
                
                const { error } = await supabaseClient.from('events').insert(payloads);
                if (error) throw error;
                await logAction('CREATE_EVENT', `イベント「${title}」を${payloads.length}件作成しました`);
            }
            
            await loadData();
            renderCalendar();
            if (!document.getElementById('list-container').classList.contains('hidden')) renderList();
            
            if (!editEventId && typeof window.att_clearDateSelection === 'function') {
                window.att_clearDateSelection();
            }
            window.att_closeModal();
            break;
        } catch (e) {
            console.error(`Save Event Attempt ${attempt} Error:`, e);
            
            const isNetworkError = e.message === 'Load failed' || e.message === 'Failed to fetch' || !e.code;
            
            if (attempt < MAX_RETRIES && isNetworkError) {
                continue;
            } else {
                let errMsg = e.message || String(e);
                if (e.details) errMsg += '\nDetails: ' + e.details;
                if (e.hint) errMsg += '\nHint: ' + e.hint;
                if (e.code) errMsg += '\nCode: ' + e.code;
                alert('保存エラー: ' + errMsg + '\n（ネットワーク接続をご確認のうえ、再度お試しください）');
                break;
            }
        }
    }
    hideLoading();
}


async function deleteEvent(id) {
    if(!confirm("このイベントを削除しますか？")) return;
    showLoading('イベント削除中...');
    try {
        await supabaseClient.from('events').delete().eq('id', id);
        await logAction('DELETE_EVENT', `イベント(ID:${id})を削除しました`);
        await loadData();
        renderCalendar();
        renderList();
        window.att_closeModal();
    } catch (e) {
        console.error(e);
    } finally { hideLoading(); }
}

// 出欠フォームを生成する共通ヘルパー（代行分も含む）
function generateAttendanceFormsHtml(ev, groupInfo, isPastDeadline = false) {
    const canAttend = groupInfo.ids.length === 0 || userGroups.some(ug => groupInfo.ids.includes(ug.group_id));
    const targets = [{ email: currentUser.email, name: '自分 ( ' + (currentUser?.name || currentUser.email.split('@')[0]) + ' )', canAttend: canAttend }];
    
    myDelegations.forEach(targetEmail => {
        const targetUser = appUsers.find(u => u.email === targetEmail);
        if (targetUser) {
            const canAttendTarget = groupInfo.ids.length === 0 || allUserGroups.some(ug => groupInfo.ids.includes(ug.group_id) && ug.user_email === targetEmail);
            targets.push({ email: targetEmail, name: targetUser.name || targetEmail.split('@')[0], canAttend: canAttendTarget });
        }
    });

    let hasAnyForm = false;

    const formsHtml = targets.map((target, idx) => {
        if (!target.canAttend) {
            return `<div class="p-3 bg-gray-50 border rounded mb-2">
                <h4 class="font-bold text-gray-700 mb-1">${target.name}</h4>
                <p class="text-xs text-red-500">※対象グループに所属していないため入力できません</p>
            </div>`;
        }
        hasAnyForm = true;
        const tAtt = allAttendances.find(a => a.event_id === ev.id && a.user_email === target.email) || {};
        let tStatus = tAtt.status || '未回答';
        if (tStatus === '未定') tStatus = '保留';
        
        // 荷物車対応のパース
        let luggageCarInit = '否';
        let displayComment = tAtt.comment || '';
        if (displayComment.startsWith('[荷物車:可]')) {
            luggageCarInit = '可';
            displayComment = displayComment.substring(8);
        } else if (displayComment.startsWith('[荷物車:否]')) {
            luggageCarInit = '否';
            displayComment = displayComment.substring(8);
        }
        
        return `
        <div class="p-3 bg-blue-50 border border-blue-100 rounded mb-3" data-target-email="${target.email}">
            <h4 class="font-bold text-blue-800 mb-2 border-b border-blue-200 pb-1">${target.name}</h4>
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">ステータス*</label>
                <select id="att-status-${idx}" class="w-full border p-1.5 rounded text-sm font-bold" ${isPastDeadline ? 'disabled' : ''}>
                    <option value="未回答" ${tStatus==='未回答'?'selected':''}>未回答</option>
                    <option value="出席" ${tStatus==='出席'?'selected':''}>出席</option>
                    <option value="欠席" ${tStatus==='欠席'?'selected':''}>欠席</option>
                    <option value="保留" ${tStatus==='保留'?'selected':''}>保留</option>
                </select>
            </div>
            ${ev.require_detailed_attendance ? `
                <div class="flex items-center space-x-2 mt-2">
                    <div class="w-1/3">
                        <label class="block text-xs font-bold text-gray-700 mb-1">車出し可否</label>
                        <select id="att-car-flag-${idx}" class="w-full border p-1.5 rounded text-sm font-bold" onchange="const isCar = this.value === '可'; document.getElementById('att-car-cap-${idx}').disabled = !isCar; document.getElementById('att-luggage-flag-${idx}').disabled = !isCar; if(isCar && document.getElementById('att-car-cap-${idx}').value == 0) document.getElementById('att-car-cap-${idx}').value = 1;" ${isPastDeadline ? 'disabled' : ''}>
                            <option value="否" ${!tAtt.car_capacity || tAtt.car_capacity === 0 ? 'selected' : ''}>否</option>
                            <option value="可" ${tAtt.car_capacity > 0 ? 'selected' : ''}>可</option>
                        </select>
                    </div>
                    <div class="w-1/3">
                        <label class="block text-xs font-bold text-gray-700 mb-1">乗車可能人数</label>
                        <input type="number" id="att-car-cap-${idx}" value="${tAtt.car_capacity||0}" min="0" class="w-full border p-1.5 rounded text-sm" ${isPastDeadline || !tAtt.car_capacity || tAtt.car_capacity === 0 ? 'disabled' : ''}>
                    </div>
                    <div class="w-1/3">
                        <label class="block text-xs font-bold text-gray-700 mb-1">荷物車対応</label>
                        <select id="att-luggage-flag-${idx}" class="w-full border p-1.5 rounded text-sm font-bold" ${isPastDeadline || !tAtt.car_capacity || tAtt.car_capacity === 0 ? 'disabled' : ''}>
                            <option value="否" ${luggageCarInit === '否' ? 'selected' : ''}>否</option>
                            <option value="可" ${luggageCarInit === '可' ? 'selected' : ''}>可</option>
                        </select>
                    </div>
                </div>
                <div class="mt-2">
                    <label class="block text-xs font-bold text-gray-700 mb-1">同伴者 (例: 父、母、弟)</label>
                    <input type="text" id="att-acc-${idx}" value="${tAtt.accompanying_persons||''}" class="w-full border p-1.5 rounded text-sm" ${isPastDeadline ? 'disabled' : ''}>
                </div>
            ` : ''}
            <div class="mt-2">
                <label class="block text-xs font-bold text-gray-700 mb-1">コメント ${isPastDeadline ? '<span class="text-red-500 font-normal">(期限後も修正可)</span>' : ''}</label>
                <textarea id="att-comment-${idx}" class="w-full border p-1.5 rounded text-sm" rows="1">${displayComment}</textarea>
            </div>
        </div>`;
    }).join('');

    return { formsHtml, hasAnyForm };
}

window.att_openEventDetail = window.openEventDetailModal = function(eventId, activeTab = 'basic') {
    const ev = events.find(e => e.id === eventId);
    if(!ev) return;

    const groupInfo = getEventTargetGroupsInfo(ev);
    const groupName = groupInfo.name;
    const groupColor = groupInfo.color;
    const categoryObj = categories.find(c => c.name === ev.category);
    const categoryColor = categoryObj?.color || '#bfdbfe';
    let dt = '日時未定';
    if (ev.is_all_day && ev.start_time) {
        dt = ev.start_time.substring(0, 10) + ' (終日)';
    } else if (ev.start_time) {
        dt = ev.start_time.substring(0, 16).replace('T', ' ');
        if (ev.end_time) dt += ' 〜 ' + ev.end_time.substring(11, 16);
    }
    
    const myAtt = attendances.find(a => a.event_id === ev.id) || {};
    let statusStr = myAtt && myAtt.status ? myAtt.status : '未回答';
    if (statusStr === '未定') statusStr = '保留';

    const isPastDeadline = ev.attendance_deadline ? new Date() > new Date(ev.attendance_deadline) : false;
    let deadlineStr = ev.attendance_deadline ? ev.attendance_deadline.replace('T', ' ').substring(0, 16) : '設定なし';

    // 所属グループ判定 (全体 or 所属しているか)
    const canAttend = groupInfo.ids.length === 0 || userGroups.some(ug => groupInfo.ids.includes(ug.group_id));

    // 対象ユーザー一覧の収集 (グループ対象者 + 回答実績者)
    let targetUsers = [];
    if (groupInfo.ids.length === 0) {
        targetUsers = [...appUsers];
    } else {
        const memberEmails = allUserGroups.filter(ug => groupInfo.ids.includes(ug.group_id)).map(ug => ug.user_email);
        const evAtts = allAttendances.filter(a => a.event_id === ev.id);
        const answeredEmails = evAtts.map(a => a.user_email);
        targetUsers = appUsers.filter(u => memberEmails.includes(u.email) || answeredEmails.includes(u.email));
    }

    // 表示切替とフィルター設定の初期値
    if (!window.att_statusViewType) window.att_statusViewType = 'group';
    if (!window.att_statusFilter) window.att_statusFilter = 'all';

    const isGroupView = (window.att_statusViewType === 'group');

    // 1. 全体集計
    let totalAttending = 0;
    let totalAbsent = 0;
    let totalPending = 0;

    targetUsers.forEach(u => {
        const att = allAttendances.find(a => a.event_id === ev.id && a.user_email === u.email);
        if (att && att.status === '出席') totalAttending++;
        else if (att && att.status === '欠席') totalAbsent++;
        else totalPending++;
    });

    // 2. グループ/属性別集計
    const rowsData = [];
    if (isGroupView) {
        groups.forEach(g => {
            const memberEmails = allUserGroups.filter(ug => ug.group_id === g.id).map(ug => ug.user_email);
            const groupMembers = targetUsers.filter(u => memberEmails.includes(u.email));
            
            let attendingCount = 0;
            let absentCount = 0;
            let pendingCount = 0;
            let hasInput = false;
            
            groupMembers.forEach(u => {
                const att = allAttendances.find(a => a.event_id === ev.id && a.user_email === u.email);
                if (att && att.status && att.status !== '未回答') {
                    hasInput = true;
                    if (att.status === '出席') attendingCount++;
                    else if (att.status === '欠席') absentCount++;
                    else pendingCount++;
                } else {
                    pendingCount++;
                }
            });
            
            if (hasInput) {
                rowsData.push({
                    name: g.name,
                    attending: attendingCount,
                    absent: absentCount,
                    pending: pendingCount
                });
            }
        });
    } else {
        userAttributes.forEach(attr => {
            const attrMembers = targetUsers.filter(u => u.attribute_id === attr.id);
            
            let attendingCount = 0;
            let absentCount = 0;
            let pendingCount = 0;
            let hasInput = false;
            
            attrMembers.forEach(u => {
                const att = allAttendances.find(a => a.event_id === ev.id && a.user_email === u.email);
                if (att && att.status && att.status !== '未回答') {
                    hasInput = true;
                    if (att.status === '出席') attendingCount++;
                    else if (att.status === '欠席') absentCount++;
                    else pendingCount++;
                } else {
                    pendingCount++;
                }
            });
            
            if (hasInput) {
                rowsData.push({
                    name: attr.name,
                    attending: attendingCount,
                    absent: absentCount,
                    pending: pendingCount
                });
            }
        });
    }

    // 表示切替トグルHTML
    const viewToggleHtml = `
        <div class="flex items-center space-x-1 mb-4 p-1 bg-gray-100/80 rounded-lg w-fit shrink-0">
            <button onclick="window.att_setStatusViewType('${ev.id}', 'group')" class="px-4 py-1.5 rounded-md text-xs font-bold transition shadow-sm ${isGroupView ? 'bg-green-600 text-white' : 'text-gray-600 hover:text-gray-900'}">📂 グループ別</button>
            <button onclick="window.att_setStatusViewType('${ev.id}', 'attribute')" class="px-4 py-1.5 rounded-md text-xs font-bold transition shadow-sm ${!isGroupView ? 'bg-green-600 text-white' : 'text-gray-600 hover:text-gray-900'}">👥 属性別</button>
        </div>
    `;

    const footnoteText = isGroupView ? '※出欠の入力があるグループのみ表示しています。' : '※出欠の入力がある属性のみ表示しています。';
    
    let tableRowsHtml = `
        <tr class="bg-gray-50/50 font-bold border-b border-gray-200">
            <td class="px-4 py-2.5 text-gray-800">全体</td>
            <td class="px-4 py-2.5 text-center text-green-600 font-extrabold">${totalAttending}</td>
            <td class="px-4 py-2.5 text-center text-red-500 font-extrabold">${totalAbsent}</td>
            <td class="px-4 py-2.5 text-center text-gray-600">${totalPending}</td>
        </tr>
    `;
    
    if (rowsData.length === 0) {
        tableRowsHtml += `
            <tr>
                <td colspan="4" class="px-4 py-6 text-center text-gray-400 text-xs">出欠の入力がある${isGroupView ? 'グループ' : '属性'}はありません。</td>
            </tr>
        `;
    } else {
        tableRowsHtml += rowsData.map(r => `
            <tr class="border-b border-gray-100 hover:bg-gray-50/30 transition">
                <td class="px-4 py-2.5 text-gray-700 font-semibold text-xs">${r.name}</td>
                <td class="px-4 py-2.5 text-center text-green-600 font-bold text-xs">${r.attending}</td>
                <td class="px-4 py-2.5 text-center text-red-500 font-bold text-xs">${r.absent}</td>
                <td class="px-4 py-2.5 text-center text-gray-500 text-xs">${r.pending}</td>
            </tr>
        `).join('');
    }

    const summaryTableHtml = `
        <div class="overflow-hidden border border-gray-200 rounded-lg shadow-sm bg-white mb-1">
            <table class="min-w-full text-xs">
                <thead>
                    <tr class="bg-gray-50 border-b border-gray-200">
                        <th class="px-4 py-2.5 text-left font-bold text-gray-600"></th>
                        <th class="px-4 py-2.5 text-center font-bold text-gray-600">🟢 参加</th>
                        <th class="px-4 py-2.5 text-center font-bold text-gray-600">❌ 不参加</th>
                        <th class="px-4 py-2.5 text-center font-bold text-gray-600">❓ 未定/その他</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRowsHtml}
                </tbody>
            </table>
        </div>
        <p class="text-[10px] text-gray-400 font-semibold mb-4">${footnoteText}</p>
    `;

    // 参加者リストの構築
    const filteredUsers = targetUsers.filter(u => {
        const att = allAttendances.find(a => a.event_id === ev.id && a.user_email === u.email);
        const statusVal = att?.status || '未回答';
        
        if (window.att_statusFilter === 'all') return true;
        if (window.att_statusFilter === 'answered') return statusVal === '出席' || statusVal === '欠席' || statusVal === '保留' || statusVal === '未定';
        if (window.att_statusFilter === 'attending') return statusVal === '出席';
        if (window.att_statusFilter === 'absent') return statusVal === '欠席';
        if (window.att_statusFilter === 'pending') return statusVal === '保留' || statusVal === '未定';
        if (window.att_statusFilter === 'unanswered') return statusVal === '未回答' || !statusVal;
        return true;
    });

    const filters = [
        { type: 'all', label: 'すべて' },
        { type: 'answered', label: '回答済' },
        { type: 'attending', label: '出席' },
        { type: 'absent', label: '欠席' },
        { type: 'pending', label: '保留' },
        { type: 'unanswered', label: '未回答' }
    ];
    
    const pillsHtml = filters.map(f => {
        const isActive = (window.att_statusFilter === f.type);
        return `<button onclick="window.att_setStatusFilter('${ev.id}', '${f.type}')" class="px-2.5 py-1 rounded-full text-xs font-bold transition ${isActive ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">${f.label}</button>`;
    }).join(' ');

    let listRowsHtml = '';
    if (filteredUsers.length === 0) {
        listRowsHtml = `
            <tr>
                <td colspan="5" class="px-4 py-6 text-center text-gray-400 text-xs">該当するメンバーはいません。</td>
            </tr>
        `;
    } else {
        listRowsHtml = filteredUsers.map(u => {
            const userName = u.name || u.email.split('@')[0];
            
            let matched = '-';
            if (isGroupView) {
                const userGIds = allUserGroups.filter(ug => ug.user_email === u.email).map(ug => ug.group_id);
                matched = groups.filter(g => userGIds.includes(g.id)).map(g => g.name).join(', ') || '-';
            } else {
                matched = userAttributes.find(a => a.id === u.attribute_id)?.name || '-';
            }
            
            const att = allAttendances.find(a => a.event_id === ev.id && a.user_email === u.email);
            let statusVal = att?.status || '未回答';
            if (statusVal === '未定') statusVal = '保留';
            
            let statusBadgeHtml = '';
            if (statusVal === '出席') {
                statusBadgeHtml = `<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-green-100 text-green-800 border border-green-200">🟢 参加</span>`;
            } else if (statusVal === '欠席') {
                statusBadgeHtml = `<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-red-100 text-red-800 border border-red-200">❌ 不参加</span>`;
            } else if (statusVal === '保留') {
                statusBadgeHtml = `<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-yellow-100 text-yellow-800 border border-yellow-200">❓ 未定/その他</span>`;
            } else {
                statusBadgeHtml = `<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-gray-100 text-gray-500 border border-gray-200">❓ 未定/その他</span>`;
            }
            
            let displayComment = att?.comment || '';
            let luggageCar = '否';
            if (displayComment.startsWith('[荷物車:可]')) {
                luggageCar = '可';
                displayComment = displayComment.substring(8);
            } else if (displayComment.startsWith('[荷物車:否]')) {
                luggageCar = '否';
                displayComment = displayComment.substring(8);
            }
            
            let details = [];
            if (att && att.status && att.status !== '未回答') {
                if (ev.require_detailed_attendance) {
                    if (att.accompanying_persons) {
                        details.push(`同伴: ${att.accompanying_persons}`);
                    }
                    if (att.car_capacity && att.car_capacity > 0) {
                        details.push(`車出: 可[${att.car_capacity}人]`);
                        details.push(`荷物車: ${luggageCar}`);
                    }
                }
                if (displayComment.trim()) {
                    details.push(`メモ: ${displayComment.trim()}`);
                }
            }
            
            const memoText = details.length > 0 ? details.join(', ') : '-';
            const updatedTimeText = att ? formatUpdatedAt(att.updated_at) : '-';
            
            return `
                <tr class="hover:bg-gray-50/50 border-b border-gray-100 transition">
                    <td class="px-4 py-2 font-bold text-gray-800 text-[11px]">${userName}</td>
                    <td class="px-4 py-2 text-gray-500 text-[11px] font-semibold">${matched}</td>
                    <td class="px-4 py-2">${statusBadgeHtml}</td>
                    <td class="px-4 py-2 text-gray-600 text-[11px] max-w-[180px] truncate" title="${memoText}">${memoText}</td>
                    <td class="px-4 py-2 text-gray-400 text-[11px] font-semibold">${updatedTimeText}</td>
                </tr>
            `;
        }).join('');
    }

    const participantListHtml = `
        <div class="mt-4 border-t pt-4">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                <h4 class="font-bold text-gray-700 text-xs shrink-0">参加者リスト</h4>
                <div class="flex flex-wrap items-center gap-2">
                    <div class="flex items-center space-x-1">
                        ${pillsHtml}
                    </div>
                </div>
            </div>
            <div class="overflow-x-auto border border-gray-200 rounded-lg shadow-sm bg-white">
                <table class="min-w-full text-xs">
                    <thead>
                        <tr class="bg-gray-50 border-b border-gray-200">
                            <th class="px-4 py-2 font-bold text-gray-600 text-left text-xs">名前</th>
                            <th class="px-4 py-2 font-bold text-gray-600 text-left text-xs">${isGroupView ? 'グループ' : '属性'}</th>
                            <th class="px-4 py-2 font-bold text-gray-600 text-left text-xs">出欠</th>
                            <th class="px-4 py-2 font-bold text-gray-600 text-left text-xs">出欠メモ</th>
                            <th class="px-4 py-2 font-bold text-gray-600 text-left text-xs">更新日時</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${listRowsHtml}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    const basicTabClass = activeTab === 'basic' ? 'border-b-2 border-blue-500 text-blue-600 font-bold' : 'text-gray-500 hover:text-gray-700';
    const attTabClass = activeTab === 'attendance' ? 'border-b-2 border-blue-500 text-blue-600 font-bold' : 'text-gray-500 hover:text-gray-700';
    const statusTabClass = activeTab === 'status' ? 'border-b-2 border-blue-500 text-blue-600 font-bold' : 'text-gray-500 hover:text-gray-700';

    const modalHtml = `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div class="flex justify-between items-center p-4 border-b shrink-0">
                <h3 class="text-lg font-bold text-gray-800 truncate pr-2">${ev.title}</h3>
                <div class="flex items-center shrink-0">
                    <button onclick="window.att_editEvent('${ev.id}')" class="text-green-600 text-xs border border-green-600 px-2 py-1 rounded hover:bg-green-50 mr-2">編集</button>
                    <button onclick="window.att_copyEvent('${ev.id}')" class="text-blue-500 text-xs border border-blue-500 px-2 py-1 rounded hover:bg-blue-50 mr-2">複製</button>
                    <button onclick="window.att_deleteEvent('${ev.id}')" class="text-red-500 text-xs border border-red-500 px-2 py-1 rounded hover:bg-red-50 mr-2">削除</button>
                    <button onclick="window.att_closeModal()" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
                </div>
            </div>

            <div class="flex border-b shrink-0">
                <button onclick="window.att_openEventDetail('${ev.id}', 'basic')" class="flex-1 py-2 text-sm font-medium ${basicTabClass}">基本情報</button>
                ${ev.requires_attendance ? `
                    <button onclick="window.att_openEventDetail('${ev.id}', 'attendance')" class="flex-1 py-2 text-sm font-medium ${attTabClass}">出欠登録</button>
                    <button onclick="window.att_openEventDetail('${ev.id}', 'status')" class="flex-1 py-2 text-sm font-medium ${statusTabClass}">出欠状況</button>
                ` : ''}
            </div>

            <div class="p-4 overflow-y-auto">
                ${activeTab === 'basic' ? `
                    <div class="text-sm text-gray-600 mb-4 space-y-1">
                        <p><strong>日時:</strong> ${dt}</p>
                        <p><strong>場所:</strong> ${formatLocationHtml(ev.location)}</p>
                        <p class="flex items-center gap-1 mt-1"><strong>カテゴリ:</strong> <span class="px-2 py-0.5 rounded text-xs text-gray-800 shadow-sm" style="background-color: ${categoryColor}">${ev.category || '未設定'}</span></p>
                        <p class="flex items-center gap-1 mt-1"><strong>対象:</strong> <span class="px-2 py-0.5 rounded text-xs border border-gray-300 text-gray-800 shadow-sm" style="background-color: ${groupColor}">${groupName}</span></p>
                        <p class="mt-2 whitespace-pre-wrap border p-2 bg-gray-50 rounded min-h-[60px] text-gray-800">${ev.description || '説明なし'}</p>
                    </div>
                ` : activeTab === 'attendance' ? `
                    <div class="space-y-4">
                        <div class="text-sm border-b pb-2 mb-2">
                            現在のステータス: <span class="font-bold ${statusStr==='出席'?'text-green-600':statusStr==='欠席'?'text-red-500':'text-gray-800'}">${statusStr}</span>
                            <br><span class="text-xs text-gray-500">回答期限: ${deadlineStr}</span>
                            ${isPastDeadline ? `<span class="ml-2 text-red-500 font-bold text-xs bg-red-100 px-2 py-0.5 rounded shadow-sm">期限切れ</span>` : ''}
                        </div>
                        ${(() => {
                            const { formsHtml, hasAnyForm } = generateAttendanceFormsHtml(ev, groupInfo, isPastDeadline);
                            return formsHtml + (hasAnyForm ? `
                                <div class="mt-4 text-right">
                                    <button onclick="window.att_saveAttendance('${ev.id}')" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-bold shadow">出欠を一括保存</button>
                                </div>
                            ` : '');
                        })()}
                    </div>
                ` : `
                    <div class="space-y-4">
                        ${viewToggleHtml}
                        ${summaryTableHtml}
                        ${participantListHtml}
                    </div>
                `}
            </div>
        </div>
    </div>`;
    document.getElementById('attendance-modals').innerHTML = modalHtml;
}

// =====================================
// 出欠登録フォーム
// =====================================
function openAttendanceFormModal(eventId) {
    const ev = events.find(e => e.id === eventId);
    if (!ev) return;
    const groupInfo = getEventTargetGroupsInfo(ev);
    
    const isPastDeadline = ev.attendance_deadline ? new Date() > new Date(ev.attendance_deadline) : false;
    const { formsHtml, hasAnyForm } = generateAttendanceFormsHtml(ev, groupInfo, isPastDeadline);
    
    const modalHtml = `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[110]">
        <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm max-h-[90vh] overflow-y-auto">
            <h3 class="text-lg font-bold mb-4">出欠入力</h3>
            <div class="space-y-4">
                ${formsHtml}
            </div>
            <div class="flex justify-end space-x-3 mt-6">
                <button onclick="window.att_openEventDetail('${eventId}')" class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded font-bold">戻る</button>
                ${hasAnyForm ? `<button onclick="window.att_saveAttendance('${eventId}')" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold shadow">一括保存</button>` : ''}
            </div>
        </div>
    </div>`;
    document.getElementById('attendance-modals').innerHTML = modalHtml;
}

async function saveAttendance(eventId) {
    const containers = document.querySelectorAll('[data-target-email]');
    if (containers.length === 0) return window.att_closeModal();

    const ev = events.find(e => e.id === eventId);
    if (!ev) return;
    
    const payloads = [];
    containers.forEach((container) => {
        const targetEmail = container.getAttribute('data-target-email');
        const statusEl = container.querySelector('select[id^="att-status-"]');
        if (statusEl) {
            const accEl = container.querySelector('input[id^="att-acc-"]');
            const carFlagEl = container.querySelector('select[id^="att-car-flag-"]');
            const carCapEl = container.querySelector('input[id^="att-car-cap-"]');
            const luggageFlagEl = container.querySelector('select[id^="att-luggage-flag-"]');
            const commentEl = container.querySelector('textarea[id^="att-comment-"]');
            
            const carFlag = carFlagEl ? carFlagEl.value : '否';
            const carCapacity = carFlag === '可' && carCapEl ? (parseInt(carCapEl.value) || 0) : 0;
            
            let finalComment = commentEl ? commentEl.value.trim() : '';
            
            // 詳細出欠かつ車出し「可」の場合、荷物車フラグをコメントのプレフィックスに埋め込む
            if (ev.require_detailed_attendance && carFlag === '可') {
                const luggageCar = luggageFlagEl ? luggageFlagEl.value : '否';
                finalComment = `[荷物車:${luggageCar}]` + finalComment;
            }
            
            payloads.push({
                event_id: eventId,
                user_email: targetEmail,
                status: statusEl.value,
                accompanying_persons: accEl ? accEl.value : '',
                car_capacity: carCapacity,
                separate_action: null,
                comment: finalComment,
                updated_at: new Date().toISOString()
            });
        }
    });

    showLoading('出欠保存中...');
    try {
        const { error } = await supabaseClient.from('attendances').upsert(payloads, { onConflict: 'event_id, user_email' });
        if (error) throw error;
        
        await logAction('UPDATE_ATTENDANCE', `イベント(ID:${eventId})の出欠を ${payloads.length}件更新しました`);
        
        await loadData(); // 再取得
        renderCalendar(); // カレンダーの表示を更新
        renderList();     // リストの表示を更新
        
        window.att_openEventDetail(eventId, 'status'); // 保存成功後に詳細画面の出欠状況タブに切り替える
    } catch (e) {
        console.error('Save Attendance Error:', e);
        if (e.message === 'Load failed' || e.message === 'Failed to fetch') {
            alert('出欠登録エラー: 通信に失敗しました。ネットワーク接続やデータベースの状態を確認してください。');
        } else {
            alert('出欠登録エラー: ' + e.message);
        }
    } finally { hideLoading(); }
}

// =====================================
// CSV インポート・エクスポート
// =====================================
function exportCsv() {
    const header = ['タイトル', '日付', '開始時刻', '終了時刻', '終日', 'カテゴリ', '対象グループ', '場所', '出欠管理', '詳細出欠', '説明', '回答期限'];
    const rows = [header.join(',')];
    
    events.forEach(e => {
        const date = e.start_time ? e.start_time.split('T')[0] : '';
        const startTime = e.start_time && !e.is_all_day ? e.start_time.split('T')[1].substring(0,5) : '';
        const endTime = e.end_time && !e.is_all_day ? e.end_time.split('T')[1].substring(0,5) : '';
        
        const groupInfo = getEventTargetGroupsInfo(e);
        const groupName = groupInfo.name;
        
        const escapeCsv = (str) => {
            if (str === null || str === undefined) return '""';
            const s = String(str).replace(/"/g, '""');
            return `"${s}"`;
        };
        
        rows.push([
            escapeCsv(e.title),
            escapeCsv(date),
            escapeCsv(startTime),
            escapeCsv(endTime),
            e.is_all_day ? 'TRUE' : 'FALSE',
            escapeCsv(e.category),
            escapeCsv(groupName),
            escapeCsv(e.location),
            e.requires_attendance ? 'TRUE' : 'FALSE',
            e.require_detailed_attendance ? 'TRUE' : 'FALSE',
            escapeCsv(e.description),
            escapeCsv(e.attendance_deadline)
        ].join(','));
    });
    
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]); // UTF-8 BOM
    const blob = new Blob([bom, rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `events_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

function parseCSV(text) {
    const result = [];
    let row = [];
    let field = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (inQuotes) {
            if (char === '"') {
                if (i + 1 < text.length && text[i + 1] === '"') { field += '"'; i++; }
                else { inQuotes = false; }
            } else { field += char; }
        } else {
            if (char === '"') { inQuotes = true; }
            else if (char === ',') { row.push(field); field = ''; }
            else if (char === '\n' || char === '\r') {
                row.push(field); result.push(row); row = []; field = '';
                if (char === '\r' && i + 1 < text.length && text[i + 1] === '\n') i++;
            } else { field += char; }
        }
    }
    if (field || row.length > 0) { row.push(field); result.push(row); }
    return result;
}

window.att_importCsv = async function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (e) => {
        const text = e.target.result;
        const rows = parseCSV(text);
        if (rows.length < 2) return alert('インポートするデータがありません。');
        
        const newEvents = [];
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (row.length < 2) continue;
            if (!row[0] || !row[1]) continue;
            
            const title = row[0];
            const date = row[1];
            const startTime = row[2];
            const endTime = row[3];
            const isAllDay = (row[4] || '').toUpperCase() === 'TRUE';
            const category = row[5];
            const groupNameStr = row[6] || '';
            const location = row[7];
            const reqAtt = (row[8] || '').toUpperCase() === 'TRUE' || (row[8] || '').trim() === '';
            const reqDetAtt = (row[9] || '').toUpperCase() === 'TRUE';
            const description = row[10];
            const attendanceDeadline = row[11] || null;
            
            const startDt = `${date}T${startTime || '00:00'}:00`;
            let endDt = null;
            if (endTime) endDt = `${date}T${endTime}:00`;
            
            const groupNames = groupNameStr.split(',').map(s => s.trim());
            const matchedGroups = groups.filter(g => groupNames.includes(g.name));
            const target_group_ids = matchedGroups.length > 0 ? matchedGroups.map(g => g.id) : null;
            const target_group_id = target_group_ids ? target_group_ids[0] : null;
            
            newEvents.push({
                title,
                category: category || null,
                description: description || null,
                location: location || null,
                start_time: startDt,
                end_time: endDt,
                is_all_day: isAllDay,
                requires_attendance: reqAtt,
                require_detailed_attendance: reqDetAtt,
                attendance_deadline: attendanceDeadline,
                target_group_id: target_group_id,
                target_group_ids: target_group_ids,
                created_by: currentUser?.email
            });
        }
        
        if (newEvents.length === 0) return alert('インポート可能なイベントがありませんでした。\nタイトルと日付は必須です。');

        const listHtml = newEvents.map(ev => {
            const dt = ev.is_all_day ? ev.start_time.split('T')[0] + ' (終日)' : ev.start_time.replace('T', ' ').substring(0, 16);
            return `<div class="text-sm border-b py-2 border-gray-200">
                <div class="font-bold text-gray-800">${ev.title}</div>
                <div class="text-gray-600 text-xs">${dt}</div>
            </div>`;
        }).join('');

        const modalHtml = `
        <div id="csv-import-confirm-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[120]">
            <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
                <h3 class="text-lg font-bold mb-4">インポート確認 (${newEvents.length}件)</h3>
                <div class="overflow-y-auto flex-1 mb-4 border rounded p-2 bg-gray-50 min-h-[150px]">
                    ${listHtml}
                </div>
                <div class="flex justify-end space-x-3 mt-2">
                    <button id="btn-cancel-import" class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded font-bold">キャンセル</button>
                    <button id="btn-exec-import" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold shadow">インポート実行</button>
                </div>
            </div>
        </div>`;

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = modalHtml;
        document.body.appendChild(tempDiv.firstElementChild);

        document.getElementById('btn-cancel-import').onclick = () => {
            document.getElementById('csv-import-confirm-modal').remove();
            document.getElementById('file-import-csv').value = '';
        };

        document.getElementById('btn-exec-import').onclick = async () => {
            document.getElementById('csv-import-confirm-modal').remove();
            showLoading('インポート実行中...');
            try {
                const { error } = await supabaseClient.from('events').insert(newEvents);
                if (error) throw error;
                await logAction('IMPORT_EVENTS', `イベントデータを${newEvents.length}件インポートしました`);
                alert(`${newEvents.length}件のインポートが完了しました。`);
                await loadData();
                renderCalendar();
                renderList();
            } catch (err) {
                alert('インポート中にエラーが発生しました:\n' + err.message);
            } finally {
                hideLoading();
                document.getElementById('file-import-csv').value = '';
            }
        };
    };
    reader.readAsText(file);
};

// =====================================
// 一括登録・場所マスタ・回答期限自動算出のヘルパー関数群
// =====================================
function getDefaultDeadline(eventDateStr) {
    if (!eventDateStr) return null;
    const d = new Date(eventDateStr + 'T00:00:00');
    if (isNaN(d.getTime())) return null;
    const deadlineDate = new Date(d.getTime() - 3 * 24 * 60 * 60 * 1000);
    const year = deadlineDate.getFullYear();
    const month = String(deadlineDate.getMonth() + 1).padStart(2, '0');
    const date = String(deadlineDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${date}T12:00:00`;
}

function formatDefaultDeadlineDisplay(eventDateStr) {
    const dlStr = getDefaultDeadline(eventDateStr);
    if (!dlStr) return '';
    const d = new Date(dlStr);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    const day = WEEKDAYS[d.getDay()];
    return `${year}/${month}/${date}(${day}) 12:00`;
}

function formatLocationHtml(locationStr) {
    if (!locationStr) return '未定';
    let escaped = locationStr
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    
    const urlRegex = /(https?:\/\/[^\s\<\>\"]+)/g;
    return escaped.replace(urlRegex, (url) => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="text-blue-600 hover:underline inline-flex items-center space-x-0.5 ml-1 font-semibold">
            <span>地図/リンク</span>
            <svg class="w-3.5 h-3.5 inline ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
        </a>`;
    });
}

function updateMultiselectBar() {
    const bar = document.getElementById('multiselect-bar');
    const count = document.getElementById('multiselect-count');
    if (!bar || !count) return;
    
    if (window.att_multiSelectMode && window.att_selectedDates.size > 0) {
        count.textContent = window.att_selectedDates.size;
        bar.classList.remove('hidden');
    } else {
        bar.classList.add('hidden');
    }
}

function clearDateSelection() {
    window.att_selectedDates.clear();
    renderCalendar();
    updateMultiselectBar();
}

function openBulkAddEvent() {
    if (window.att_selectedDates.size === 0) {
        alert('日程が選択されていません。');
        return;
    }
    const sortedDates = Array.from(window.att_selectedDates).sort();
    openAddEventModal('', null, false, sortedDates);
}

function renderDateRows() {
    const container = document.getElementById('ev-dates-container');
    if (!container) return;
    
    container.innerHTML = '';
    if (modalSelectedDates.length === 0) {
        container.innerHTML = '<div class="text-xs text-gray-500 py-1.5 text-center">日付が選択されていません</div>';
        return;
    }
    
    modalSelectedDates.forEach((dVal, idx) => {
        const row = document.createElement('div');
        row.className = 'flex items-center space-x-2 bg-white p-1.5 rounded border shadow-sm';
        
        const input = document.createElement('input');
        input.type = 'date';
        input.value = dVal;
        input.className = 'border rounded text-xs px-2 py-1 flex-1 min-w-0 font-medium focus:ring-1 focus:ring-blue-500 focus:border-blue-500';
        input.onchange = (e) => {
            modalSelectedDates[idx] = e.target.value;
            updateDefaultDeadlineLabel();
        };
        row.appendChild(input);
        
        if (!window.att_isEditingModal) {
            const delBtn = document.createElement('button');
            delBtn.type = 'button';
            delBtn.className = 'text-red-500 hover:text-red-700 font-bold p-1 transition rounded hover:bg-red-50';
            delBtn.innerHTML = `
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            `;
            delBtn.onclick = () => {
                modalSelectedDates.splice(idx, 1);
                renderDateRows();
                updateDefaultDeadlineLabel();
            };
            row.appendChild(delBtn);
        }
        
        container.appendChild(row);
    });
}

function addDateRow() {
    let nextDateStr = new Date().toISOString().split('T')[0];
    if (modalSelectedDates.length > 0) {
        const lastDate = new Date(modalSelectedDates[modalSelectedDates.length - 1]);
        if (!isNaN(lastDate.getTime())) {
            lastDate.setDate(lastDate.getDate() + 1);
            nextDateStr = lastDate.toISOString().split('T')[0];
        }
    }
    modalSelectedDates.push(nextDateStr);
    renderDateRows();
    updateDefaultDeadlineLabel();
}

function removeDateRow(idx) {
    modalSelectedDates.splice(idx, 1);
    renderDateRows();
    updateDefaultDeadlineLabel();
}

function updateDefaultDeadlineLabel() {
    const previewEl = document.getElementById('ev-deadline-auto-preview');
    if (!previewEl) return;
    
    if (modalSelectedDates.length === 0) {
        previewEl.innerHTML = '<span class="text-red-500 font-semibold text-xs">日付を入力してください</span>';
        return;
    }
    
    if (modalSelectedDates.length === 1) {
        const dl = getDefaultDeadline(modalSelectedDates[0]);
        if (dl) {
            const formatted = formatDefaultDeadlineDisplay(modalSelectedDates[0]);
            previewEl.innerHTML = `<span class="text-blue-600 font-bold">自動算出:</span> ${formatted}`;
        } else {
            previewEl.innerHTML = '<span class="text-red-500 font-semibold text-xs">日付が不正です</span>';
        }
    } else {
        const formatted1 = formatDefaultDeadlineDisplay(modalSelectedDates[0]);
        previewEl.innerHTML = `<span class="text-blue-600 font-bold">自動算出:</span> 各日程の3日前の12:00<br><span class="text-[10px] text-gray-400 font-semibold">(例: ${modalSelectedDates[0]}分 → ${formatted1})</span>`;
    }
}

function onLocationSelectChange(value) {
    const customContainer = document.getElementById('ev-location-custom-container');
    if (!customContainer) return;
    if (value === 'custom') {
        customContainer.classList.remove('hidden');
    } else {
        customContainer.classList.add('hidden');
    }
}

async function registerNewLocation() {
    const nameInput = document.getElementById('ev-location-custom-name');
    const urlInput = document.getElementById('ev-location-custom-url');
    if (!nameInput) return;
    
    const name = nameInput.value.trim();
    const url = urlInput ? urlInput.value.trim() : '';
    
    if (!name) return alert('場所名は必須です');
    
    showLoading('場所マスタに登録中...');
    try {
        const { error } = await supabaseClient.from('event_locations').insert({ name, url: url || null });
        if (error) throw error;
        
        const { data: locData } = await supabaseClient.from('event_locations').select('*').order('name');
        if (locData) eventLocations = locData;
        
        const selectEl = document.getElementById('ev-location-select');
        if (selectEl) {
            const fullVal = url ? `${name} ${url}` : name;
            selectEl.innerHTML = `
                <option value="custom">-- 直接入力 / 新規マスタ追加 --</option>
                ${eventLocations.map(loc => {
                    const fVal = loc.url ? `${loc.name} ${loc.url}` : loc.name;
                    return `<option value="${fVal}" ${fVal === fullVal ? 'selected' : ''}>${loc.name}${loc.url ? ' (URLあり)' : ''}</option>`;
                }).join('')}
            `;
            
            const customContainer = document.getElementById('ev-location-custom-container');
            if (customContainer) customContainer.classList.add('hidden');
            
            nameInput.value = '';
            if (urlInput) urlInput.value = '';
        }
        alert('場所マスタに登録しました');
    } catch (err) {
        console.error("Failed to register location:", err);
        alert('マスタ登録エラー: ' + (err.message || String(err)));
    } finally {
        hideLoading();
    }
}

// =====================================
// Global Window API Bindings
// =====================================
window.att_closeModal = () => {
    const modalsContainer = document.getElementById('attendance-modals');
    if (modalsContainer) modalsContainer.innerHTML = '';
};
window.att_saveEvent = saveEvent;
window.att_deleteEvent = deleteEvent;
window.att_openEventDetail = openEventDetailModal;
window.att_openAttendanceForm = openAttendanceFormModal;
window.att_saveAttendance = saveAttendance;
window.att_exportCsv = exportCsv;
window.att_statusViewType = window.att_statusViewType || 'group';
window.att_statusFilter = window.att_statusFilter || 'all';
window.att_setStatusViewType = (eventId, viewType) => {
    window.att_statusViewType = viewType;
    window.att_openEventDetail(eventId, 'status');
};
window.att_setStatusFilter = (eventId, filterType) => {
    window.att_statusFilter = filterType;
    window.att_openEventDetail(eventId, 'status');
};
window.att_copyEvent = function(eventId) {
    const ev = events.find(e => e.id === eventId);
    if (!ev) return;
    const initialDates = window.att_selectedDates && window.att_selectedDates.size > 0 ? Array.from(window.att_selectedDates).sort() : null;
    openAddEventModal('', ev, false, initialDates);
};
window.att_editEvent = function(eventId) {
    const ev = events.find(e => e.id === eventId);
    if (!ev) return;
    openAddEventModal('', ev, true);
};

window.att_addDateRow = addDateRow;
window.att_removeDateRow = removeDateRow;
window.att_renderDateRows = renderDateRows;
window.att_updateDefaultDeadlineLabel = updateDefaultDeadlineLabel;
window.att_openBulkAddEvent = openBulkAddEvent;
window.att_clearDateSelection = clearDateSelection;
window.att_onLocationSelectChange = onLocationSelectChange;
window.att_registerNewLocation = registerNewLocation;
window.att_updateMultiselectBar = updateMultiselectBar;

window.att_onSingleDateChange = (val) => {
    modalSelectedDates = [val];
    updateDefaultDeadlineLabel();
    
    // Also update the custom deadline inputs to match the new date's default deadline
    const dl = getDefaultDeadline(val);
    if (dl) {
        const dlDate = dl.split('T')[0];
        const dlTime = dl.split('T')[1].substring(0,5);
        const dlH = dlTime.split(':')[0];
        const dlM = dlTime.split(':')[1];
        
        const dateInput = document.getElementById('ev-deadline-date');
        const hSelect = document.getElementById('ev-deadline-time-h');
        const mSelect = document.getElementById('ev-deadline-time-m');
        
        if (dateInput) dateInput.value = dlDate;
        if (hSelect) hSelect.value = dlH;
        if (mSelect) mSelect.value = dlM;
    }
};

window.att_toggleDeadlineCustom = (isChecked) => {
    const customInputs = document.getElementById('ev-deadline-custom-inputs');
    const autoPreview = document.getElementById('ev-deadline-auto-preview');
    if (!customInputs || !autoPreview) return;
    if (isChecked) {
        customInputs.classList.remove('hidden');
        autoPreview.classList.add('hidden');
        
        // Populate custom inputs if they are empty
        const dateVal = modalSelectedDates[0];
        const dl = getDefaultDeadline(dateVal);
        if (dl) {
            const dlDate = dl.split('T')[0];
            const dlTime = dl.split('T')[1].substring(0,5);
            const dlH = dlTime.split(':')[0];
            const dlM = dlTime.split(':')[1];
            
            const dateInput = document.getElementById('ev-deadline-date');
            const hSelect = document.getElementById('ev-deadline-time-h');
            const mSelect = document.getElementById('ev-deadline-time-m');
            
            if (dateInput && !dateInput.value) dateInput.value = dlDate;
            if (hSelect && !hSelect.value) hSelect.value = dlH;
            if (mSelect && !mSelect.value) mSelect.value = dlM;
        }
    } else {
        customInputs.classList.add('hidden');
        autoPreview.classList.remove('hidden');
        updateDefaultDeadlineLabel();
    }
};

function isJapaneseHoliday(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // 静的祝日
    if (month === 1 && day === 1) return true; // 元日
    if (month === 2 && day === 11) return true; // 建国記念の日
    if (month === 2 && day === 23) return true; // 天皇誕生日
    if (month === 4 && day === 29) return true; // 昭和の日
    if (month === 5 && day === 3) return true; // 憲法記念日
    if (month === 5 && day === 4) return true; // みどりの日
    if (month === 5 && day === 5) return true; // こどもの日
    if (month === 8 && day === 11) return true; // 山の日
    if (month === 11 && day === 3) return true; // 文化の日
    if (month === 11 && day === 23) return true; // 勤労感謝の日
    
    // ハッピーマンデー (第2月曜日)
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 1) { // 月曜日
        const nth = Math.floor((day - 1) / 7) + 1;
        if (month === 1 && nth === 2) return true; // 成人の日
        if (month === 7 && nth === 3) return true; // 海の日 (第3月曜日)
        if (month === 9 && nth === 3) return true; // 敬老の日 (第3月曜日)
        if (month === 10 && nth === 2) return true; // スポーツの日 (第2月曜日)
    }
    
    // 春分の日・秋分の日の簡易計算（2000〜2099年対応）
    if (month === 3) {
        const syunbun = Math.floor(20.8431 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
        if (day === syunbun) return true;
    }
    if (month === 9) {
        const syubun = Math.floor(23.2488 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
        if (day === syubun) return true;
    }
    
    // 振替休日判定（日曜日の翌日が祝日の場合）
    if (dayOfWeek === 1) { // 月曜日
        const prevDate = new Date(year, date.getMonth(), day - 1);
        if (isJapaneseHoliday(prevDate)) return true;
    }
    
    // 国民の休日判定（祝日と祝日に挟まれた平日）
    const prevDate = new Date(year, date.getMonth(), day - 1);
    const nextDate = new Date(year, date.getMonth(), day + 1);
    if (isJapaneseHoliday(prevDate) && isJapaneseHoliday(nextDate)) {
        return true;
    }
    
    return false;
}