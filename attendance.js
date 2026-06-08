import { supabaseClient, currentUser, showLoading, hideLoading, currentUserRole, openChangePasswordModal } from './main.js';

let currentDate = new Date();
let events = [];
let groups = [];
let categories = [];
let userGroups = [];
let attendances = [];
let allUserGroups = [];
let allAttendances = [];
let appUsers = [];
let isAttendanceInitialized = false;

// =====================================
// 初期化とイベントリスナー設定
// =====================================
export async function initAttendanceApp() {
    if (!isAttendanceInitialized) {
        setupEventListeners();
        isAttendanceInitialized = true;
    }
    await loadData();
    renderCalendar();
    updateGroupFilter();
    updateCategoryFilter();
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
    
    // グローバルにアクセスさせる関数 (HTMLのonclickから呼ぶ用)
    window.att_closeModal = () => document.getElementById('attendance-modals').innerHTML = '';
    window.att_saveEvent = saveEvent;
    window.att_deleteEvent = deleteEvent;
    window.att_openEventDetail = openEventDetailModal;
    window.att_openAttendanceForm = openAttendanceFormModal;
    window.att_saveAttendance = saveAttendance;
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
    showLoading();
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

        // イベント読み込み
        const { data: eData } = await supabaseClient.from('events').select('*').order('start_time');
        if (eData) events = eData;

        // 全ユーザー情報（出欠集計用）
        const { data: uData } = await supabaseClient.from('app_users').select('email, name');
        if (uData) appUsers = uData;

        // 全員の所属グループ
        const { data: ugData } = await supabaseClient.from('user_groups').select('*');
        if (ugData) {
            allUserGroups = ugData;
            if (currentUser) userGroups = ugData.filter(u => u.user_email === currentUser.email);
        }

        // 全員の出欠情報
        const { data: aData } = await supabaseClient.from('attendances').select('*');
        if (aData) {
            allAttendances = aData;
            if (currentUser) attendances = aData.filter(a => a.user_email === currentUser.email);
        }
    } catch (e) {
        console.error("Attendance DB Error:", e);
        // テーブルがない場合などのエラーを握りつぶし、空の状態で動作させる
    } finally {
        hideLoading();
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
        if (groupFilter && e.target_group_id !== groupFilter) return false;
        return true;
    });
}

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    document.getElementById('cal-current-month').textContent = `${year}年 ${month + 1}月`;
    
    const grid = document.getElementById('calendar-grid');
    // ヘッダー（曜日）は残してクリア
    Array.from(grid.children).forEach((child, index) => {
        if (index >= 7) grid.removeChild(child);
    });
    
    // 月の初日と、その週の日曜日を計算
    const firstDayOfMonth = new Date(year, month, 1);
    const startOffset = firstDayOfMonth.getDay(); 
    const startDate = new Date(year, month, 1 - startOffset);
    
    // 6週間 (42日) 分を描画
    for (let i = 0; i < 42; i++) {
        const targetDate = new Date(startDate);
        targetDate.setDate(startDate.getDate() + i);
        
        const cellYear = targetDate.getFullYear();
        const cellMonth = targetDate.getMonth();
        const cellDate = targetDate.getDate();
        const isCurrentMonth = (cellMonth === month);
        
        const cell = document.createElement('div');
        // 余白を最小化（1px程度）
        cell.className = `border min-h-[100px] flex flex-col p-[1px] bg-white ${!isCurrentMonth ? 'bg-gray-50 opacity-60' : ''}`;
        
        // 日付は右上に配置
        const dateHeader = document.createElement('div');
        dateHeader.className = 'text-right text-xs text-gray-700 font-bold mb-[1px] pr-1 pt-1 leading-none';
        dateHeader.textContent = cellDate;
        cell.appendChild(dateHeader);
        
        // 予定格納コンテナ
        const eventsContainer = document.createElement('div');
        eventsContainer.className = 'flex-1 overflow-hidden flex flex-col gap-[1px]';
        
        const targetDateStr = `${cellYear}-${String(cellMonth+1).padStart(2, '0')}-${String(cellDate).padStart(2, '0')}`;
        
        const filteredEvents = getFilteredEvents();
        const dayEvents = filteredEvents.filter(e => e.start_time && e.start_time.startsWith(targetDateStr));
        
        const displayEvents = dayEvents.slice(0, 5); // 1日5件まで表示
        const hasMore = dayEvents.length > 5;
        
        displayEvents.forEach(e => {
            const evEl = document.createElement('div');
            
            const myAtt = attendances.find(a => a.event_id === e.id);
            let iconHtml = '';
            if (e.requires_attendance) {
                const status = myAtt ? myAtt.status : '未入力';
                if (status === '出席') iconHtml = '<span class="text-green-700 mr-0.5 font-bold leading-none">[出]</span>';
                else if (status === '欠席') iconHtml = '<span class="text-red-500 mr-0.5 font-bold leading-none">[欠]</span>';
                else if (status === '未定') iconHtml = '<span class="text-orange-500 mr-0.5 font-bold leading-none">[保]</span>';
                else iconHtml = '<span class="text-gray-500 mr-0.5 font-bold leading-none">[未]</span>';
            }
            
            const categoryObj = categories.find(c => c.name === e.category);
            const categoryColor = categoryObj?.color || '#bfdbfe';
            evEl.className = 'text-[10px] text-gray-800 rounded px-1 py-[1px] truncate w-full text-left cursor-pointer hover:opacity-80 leading-tight';
            evEl.style.backgroundColor = categoryColor;
            evEl.innerHTML = `${iconHtml}${e.title}`;
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

function renderList() {
    const filtered = getFilteredEvents();

    const container = document.getElementById('event-list-content');
    if (filtered.length === 0) {
        container.innerHTML = '<p class="text-gray-500 p-4">表示するイベントがありません。</p>';
        return;
    }

    container.innerHTML = filtered.map(e => {
        let dt = '日時未定';
        if (e.is_all_day && e.start_time) {
            dt = e.start_time.substring(0, 10) + ' (終日)';
        } else if (e.start_time) {
            dt = e.start_time.substring(0, 16).replace('T', ' ');
            if (e.end_time) dt += ' 〜 ' + e.end_time.substring(11, 16);
        }
        
        const group = groups.find(g => g.id === e.target_group_id);
        const groupName = group?.name || '全体';
        const groupColor = group?.color || '#e5e7eb';
        const categoryObj = categories.find(c => c.name === e.category);
        const categoryColor = categoryObj?.color || '#bfdbfe';
        const myAtt = attendances.find(a => a.event_id === e.id);
        const statusStr = myAtt ? myAtt.status : '未入力';
        
        let iconHtml = '';
        if (e.requires_attendance) {
            if (statusStr === '出席') iconHtml = '<div class="flex items-center justify-center w-8 h-8 bg-green-100 text-green-700 rounded-md mr-3 font-bold text-sm shrink-0" title="出席">出</div>';
            else if (statusStr === '欠席') iconHtml = '<div class="flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 rounded-md mr-3 font-bold text-sm shrink-0" title="欠席">欠</div>';
            else if (statusStr === '未定') iconHtml = '<div class="flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-500 rounded-md mr-3 font-bold text-sm shrink-0" title="保留/未定">保</div>';
            else iconHtml = '<div class="flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-500 rounded-md mr-3 font-bold text-sm shrink-0" title="未入力">未</div>';
        }
        
        return `
        <div class="p-4 border-l-4 rounded-lg hover:shadow-md transition bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer border-gray-200" style="border-left-color: ${categoryColor}" onclick="window.att_openEventDetail('${e.id}')">
            <div class="flex items-center">
                ${iconHtml}
                <div>
                    <div class="flex items-center space-x-2 mb-1">
                        <span class="text-xs text-gray-800 px-2 py-0.5 rounded shadow-sm" style="background-color: ${categoryColor}">${e.category || 'イベント'}</span>
                        <span class="text-xs border border-gray-300 text-gray-800 px-2 py-0.5 rounded" style="background-color: ${groupColor}">${groupName}</span>
                    </div>
                    <h3 class="font-bold text-lg text-gray-800">${e.title}</h3>
                    <p class="text-sm text-gray-600">${dt} @ ${e.location || '未定'}</p>
                </div>
            </div>
            <div class="flex items-center space-x-3 shrink-0">
                ${e.requires_attendance ? 
                    `<span class="text-sm font-bold ${statusStr==='出席'?'text-green-600':statusStr==='欠席'?'text-red-500':'text-gray-500'}">出欠: ${statusStr}</span>` 
                    : '<span class="text-xs text-gray-400">出欠なし</span>'}
            </div>
        </div>
        `;
    }).join('');
}

// =====================================
// モーダルとDB操作（イベント）
// =====================================
function openAddEventModal(dateStr = '') {
    const modalHtml = `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
        <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 class="text-xl font-bold mb-4">新規イベント登録</h3>
            <div class="space-y-3">
                <div><label class="text-xs font-bold text-gray-600">イベント名*</label>
                <input type="text" id="ev-title" placeholder="イベント名" class="w-full border p-2 rounded"></div>
                <div class="flex space-x-2">
                    <div class="w-1/2"><label class="text-xs font-bold text-gray-600">日付*</label><input type="date" id="ev-date" value="${dateStr}" class="w-full border p-2 rounded" onchange="this.blur()"></div>
                    <div class="w-1/4"><label class="text-xs font-bold text-gray-600">開始</label><input type="time" id="ev-time" class="w-full border p-2 rounded"></div>
                    <div class="w-1/4"><label class="text-xs font-bold text-gray-600">終了</label><input type="time" id="ev-end-time" class="w-full border p-2 rounded"></div>
                </div>
                <div class="flex items-center space-x-2 mt-1 mb-2">
                    <input type="checkbox" id="ev-all-day" class="w-4 h-4 text-blue-600 cursor-pointer" onchange="const t=document.getElementById('ev-time'); const et=document.getElementById('ev-end-time'); t.disabled=this.checked; et.disabled=this.checked; if(this.checked){t.value=''; et.value='';} t.parentElement.classList.toggle('opacity-50', this.checked); et.parentElement.classList.toggle('opacity-50', this.checked);">
                    <label for="ev-all-day" class="font-bold text-gray-700 text-sm cursor-pointer">終日イベントにする</label>
                </div>
                <div class="flex space-x-2">
                    <div class="w-1/2">
                        <label class="text-xs font-bold text-gray-600">カテゴリ</label>
                        <select id="ev-category" class="w-full border p-2 rounded">
                            ${categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="w-1/2">
                        <label class="text-xs font-bold text-gray-600">対象グループ</label>
                        <select id="ev-target-group" class="w-full border p-2 rounded">
                            <option value="">全体</option>
                            ${groups.map(g => `<option value="${g.id}">${g.name}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <div><label class="text-xs font-bold text-gray-600">場所</label><input type="text" id="ev-location" placeholder="場所" class="w-full border p-2 rounded"></div>
                <div><label class="text-xs font-bold text-gray-600">説明</label><textarea id="ev-description" placeholder="説明" class="w-full border p-2 rounded" rows="3"></textarea></div>
                
                <div class="flex items-center space-x-2 pt-2">
                    <input type="checkbox" id="ev-requires-attendance" checked class="w-4 h-4 text-blue-600">
                    <label for="ev-requires-attendance" class="font-bold text-gray-700">出欠管理を行う</label>
                </div>
            </div>
            <div class="flex justify-end space-x-3 mt-6">
                <button onclick="window.att_closeModal()" class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded font-bold">キャンセル</button>
                <button onclick="window.att_saveEvent()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold shadow">保存</button>
            </div>
        </div>
    </div>`;
    document.getElementById('attendance-modals').innerHTML = modalHtml;
}

async function saveEvent() {
    const title = document.getElementById('ev-title').value;
    const date = document.getElementById('ev-date').value;
    const time = document.getElementById('ev-time').value;
    const endTimeStr = document.getElementById('ev-end-time').value;
    const isAllDay = document.getElementById('ev-all-day').checked;
    
    if (!title || !date) return alert('イベント名と日付は必須です');

    // モーダルを閉じてDOMが削除される前に、すべての入力値を取得する
    const category = document.getElementById('ev-category').value;
    const description = document.getElementById('ev-description').value;
    const location = document.getElementById('ev-location').value;
    const requires_attendance = document.getElementById('ev-requires-attendance').checked;
    const target_group_id = document.getElementById('ev-target-group').value || null;

    window.att_closeModal();
    showLoading();
    try {
        const startTime = `${date}T${time || '00:00'}:00`;
        let endTime = null;
        if (endTimeStr) endTime = `${date}T${endTimeStr}:00`;

        const { error } = await supabaseClient.from('events').insert({
            title, category: category,
            description: description,
            location: location,
            start_time: startTime,
            end_time: endTime,
            is_all_day: isAllDay,
            requires_attendance: requires_attendance,
            target_group_id: target_group_id,
            created_by: currentUser?.email
        });
        if (error) throw error;
        
        await loadData();
        renderCalendar();
        if (!document.getElementById('list-container').classList.contains('hidden')) renderList();
    } catch (e) {
        console.error('Save Event Error:', e);
        if (e.message === 'Load failed' || e.message === 'Failed to fetch') {
            alert('保存エラー: 通信に失敗しました。ネットワーク接続を確認するか、データベース(Supabase)が一時停止されていないか確認してください。');
        } else {
            alert('保存エラー: ' + e.message);
        }
    } finally {
        hideLoading();
    }
}

async function deleteEvent(id) {
    if(!confirm("このイベントを削除しますか？")) return;
    window.att_closeModal();
    showLoading();
    try {
        await supabaseClient.from('events').delete().eq('id', id);
        await loadData();
        renderCalendar();
        renderList();
    } catch (e) {
        console.error(e);
    } finally { hideLoading(); }
}

window.att_openEventDetail = window.openEventDetailModal = function(eventId, activeTab = 'basic') {
    const ev = events.find(e => e.id === eventId);
    if(!ev) return;

    const group = groups.find(g => g.id === ev.target_group_id);
    const groupName = group?.name || '全体';
    const groupColor = group?.color || '#e5e7eb';
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
    const statusStr = myAtt ? myAtt.status : '未入力';

    // 所属グループ判定 (全体 or 所属しているか)
    const canAttend = !ev.target_group_id || userGroups.some(ug => ug.group_id === ev.target_group_id);

    let attendanceSummaryHtml = '';
    if (ev.requires_attendance) {
        let targetUsers = [];
        if (!ev.target_group_id) {
            targetUsers = appUsers;
        } else {
            const memberEmails = allUserGroups.filter(ug => ug.group_id === ev.target_group_id).map(ug => ug.user_email);
            targetUsers = appUsers.filter(u => memberEmails.includes(u.email));
        }

        const evAtts = allAttendances.filter(a => a.event_id === ev.id);
        
        let attending = [];
        let absent = [];
        let pending = [];
        let unassigned = [];
        
        targetUsers.forEach(u => {
            const att = evAtts.find(a => a.user_email === u.email);
            const userName = u.name || u.email.split('@')[0];
            if (!att) unassigned.push(userName);
            else if (att.status === '出席') attending.push(userName);
            else if (att.status === '欠席') absent.push(userName);
            else pending.push(userName);
        });
        
        attendanceSummaryHtml = `
            <div class="mt-4 border-t pt-4">
                <h4 class="font-bold text-gray-700 mb-2">メンバーの出欠状況</h4>
                <div class="grid grid-cols-2 gap-2 text-sm">
                    <div class="bg-green-50 p-2 rounded border border-green-100">
                        <div class="font-bold text-green-700 mb-1 flex justify-between items-center"><span>出席</span><span class="bg-green-200 text-green-800 px-1.5 py-0.5 rounded-full text-xs">${attending.length}</span></div>
                        <div class="text-xs text-gray-600 break-words">${attending.join(', ') || 'なし'}</div>
                    </div>
                    <div class="bg-gray-50 p-2 rounded border border-gray-200">
                        <div class="font-bold text-gray-700 mb-1 flex justify-between items-center"><span>欠席</span><span class="bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded-full text-xs">${absent.length}</span></div>
                        <div class="text-xs text-gray-600 break-words">${absent.join(', ') || 'なし'}</div>
                    </div>
                    <div class="bg-orange-50 p-2 rounded border border-orange-100">
                        <div class="font-bold text-orange-700 mb-1 flex justify-between items-center"><span>未定/保留</span><span class="bg-orange-200 text-orange-800 px-1.5 py-0.5 rounded-full text-xs">${pending.length}</span></div>
                        <div class="text-xs text-gray-600 break-words">${pending.join(', ') || 'なし'}</div>
                    </div>
                    <div class="bg-blue-50 p-2 rounded border border-blue-100">
                        <div class="font-bold text-blue-700 mb-1 flex justify-between items-center"><span>未回答</span><span class="bg-blue-200 text-blue-800 px-1.5 py-0.5 rounded-full text-xs">${unassigned.length}</span></div>
                        <div class="text-xs text-gray-600 break-words">${unassigned.join(', ') || 'なし'}</div>
                    </div>
                </div>
            </div>
        `;
    }

    const basicTabClass = activeTab === 'basic' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700';
    const attTabClass = activeTab === 'attendance' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700';

    const modalHtml = `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
            <div class="flex justify-between items-center p-4 border-b shrink-0">
                <h3 class="text-lg font-bold text-gray-800 truncate pr-2">${ev.title}</h3>
                <div class="flex items-center shrink-0">
                    <button onclick="window.att_deleteEvent('${ev.id}')" class="text-red-500 text-xs border border-red-500 px-2 py-1 rounded hover:bg-red-50 mr-2">削除</button>
                    <button onclick="window.att_closeModal()" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
                </div>
            </div>

            <div class="flex border-b shrink-0">
                <button onclick="window.att_openEventDetail('${ev.id}', 'basic')" class="flex-1 py-2 text-sm font-medium ${basicTabClass}">基本情報</button>
                ${ev.requires_attendance ? `<button onclick="window.att_openEventDetail('${ev.id}', 'attendance')" class="flex-1 py-2 text-sm font-medium ${attTabClass}">出欠</button>` : ''}
            </div>

            <div class="p-4 overflow-y-auto">
                ${activeTab === 'basic' ? `
                    <div class="text-sm text-gray-600 mb-4 space-y-1">
                        <p><strong>日時:</strong> ${dt}</p>
                        <p><strong>場所:</strong> ${ev.location || '未定'}</p>
                        <p class="flex items-center gap-1 mt-1"><strong>カテゴリ:</strong> <span class="px-2 py-0.5 rounded text-xs text-gray-800 shadow-sm" style="background-color: ${categoryColor}">${ev.category || '未設定'}</span></p>
                        <p class="flex items-center gap-1 mt-1"><strong>対象:</strong> <span class="px-2 py-0.5 rounded text-xs border border-gray-300 text-gray-800 shadow-sm" style="background-color: ${groupColor}">${groupName}</span></p>
                        <p class="mt-2 whitespace-pre-wrap border p-2 bg-gray-50 rounded min-h-[60px] text-gray-800">${ev.description || '説明なし'}</p>
                    </div>
                    ${ev.requires_attendance ? attendanceSummaryHtml : ''}
                ` : `
                    <div class="space-y-4">
                        <div class="text-sm border-b pb-2 mb-2">
                            現在のステータス: <span class="font-bold ${statusStr==='出席'?'text-green-600':statusStr==='欠席'?'text-red-500':'text-gray-800'}">${statusStr}</span>
                            ${!canAttend ? '<p class="text-xs text-red-500 mt-1">※対象グループに所属していないため入力できません</p>' : ''}
                        </div>
                        ${canAttend ? `
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-1">ステータス*</label>
                                <select id="att-status" class="w-full border p-2 rounded font-bold text-sm">
                                    <option value="出席" ${myAtt.status==='出席'?'selected':''}>出席</option>
                                    <option value="欠席" ${myAtt.status==='欠席'?'selected':''}>欠席</option>
                                    <option value="未定" ${myAtt.status==='未定'?'selected':''}>未定</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-1">同伴者 (例: 父、母、弟)</label>
                                <input type="text" id="att-acc" value="${myAtt.accompanying_persons||''}" class="w-full border p-2 rounded text-sm">
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-1">車出し可否 (乗車可能人数)</label>
                                <input type="number" id="att-car" value="${myAtt.car_capacity||0}" min="0" class="w-full border p-2 rounded text-sm" placeholder="0で不可">
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-1">別行動 (例: 現地集合、早退)</label>
                                <input type="text" id="att-sep" value="${myAtt.separate_action||''}" class="w-full border p-2 rounded text-sm">
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-1">コメント</label>
                                <textarea id="att-comment" class="w-full border p-2 rounded text-sm" rows="2">${myAtt.comment||''}</textarea>
                            </div>
                            <div class="mt-4 text-right">
                                <button onclick="window.att_saveAttendance('${ev.id}')" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-bold shadow">出欠を保存</button>
                            </div>
                        ` : ''}
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
    const myAtt = attendances.find(a => a.event_id === eventId) || {};
    
    const modalHtml = `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[110]">
        <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
            <h3 class="text-lg font-bold mb-4">出欠入力</h3>
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">ステータス*</label>
                    <select id="att-status" class="w-full border p-2 rounded font-bold">
                        <option value="出席" ${myAtt.status==='出席'?'selected':''}>出席</option>
                        <option value="欠席" ${myAtt.status==='欠席'?'selected':''}>欠席</option>
                        <option value="未定" ${myAtt.status==='未定'?'selected':''}>未定</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">同伴者 (例: 父、母、弟)</label>
                    <input type="text" id="att-acc" value="${myAtt.accompanying_persons||''}" class="w-full border p-2 rounded text-sm">
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">車出し可否 (乗車可能人数)</label>
                    <input type="number" id="att-car" value="${myAtt.car_capacity||0}" min="0" class="w-full border p-2 rounded text-sm" placeholder="0で不可">
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">別行動 (例: 現地集合、早退)</label>
                    <input type="text" id="att-sep" value="${myAtt.separate_action||''}" class="w-full border p-2 rounded text-sm">
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">コメント</label>
                    <textarea id="att-comment" class="w-full border p-2 rounded text-sm" rows="2">${myAtt.comment||''}</textarea>
                </div>
            </div>
            <div class="flex justify-end space-x-3 mt-6">
                <button onclick="window.att_openEventDetail('${eventId}')" class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded font-bold">戻る</button>
                <button onclick="window.att_saveAttendance('${eventId}')" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold shadow">登録</button>
            </div>
        </div>
    </div>`;
    document.getElementById('attendance-modals').innerHTML = modalHtml;
}

async function saveAttendance(eventId) {
    // DOMを削除する前に各入力値を取得する
    const status = document.getElementById('att-status').value;
    const accompanyingPersons = document.getElementById('att-acc').value;
    const carCapacity = parseInt(document.getElementById('att-car').value) || 0;
    const separateAction = document.getElementById('att-sep').value;
    const comment = document.getElementById('att-comment').value;

    window.att_closeModal(); // モーダルを閉じる
    
    showLoading();
    try {
        const payload = {
            event_id: eventId,
            user_email: currentUser.email,
            status: status,
            accompanying_persons: accompanyingPersons,
            car_capacity: carCapacity,
            separate_action: separateAction,
            comment: comment,
            updated_at: new Date().toISOString()
        };

        const { error } = await supabaseClient.from('attendances').upsert(payload, { onConflict: 'event_id, user_email' });
        if (error) throw error;
        
        await loadData(); // 再取得
        window.att_openEventDetail(eventId); // 詳細画面に戻る
        if (!document.getElementById('list-container').classList.contains('hidden')) renderList();
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
    const header = ['タイトル', '日付', '開始時刻', '終了時刻', '終日', 'カテゴリ', '対象グループ', '場所', '出欠管理', '説明'];
    const rows = [header.join(',')];
    
    events.forEach(e => {
        const date = e.start_time ? e.start_time.split('T')[0] : '';
        const startTime = e.start_time && !e.is_all_day ? e.start_time.split('T')[1].substring(0,5) : '';
        const endTime = e.end_time && !e.is_all_day ? e.end_time.split('T')[1].substring(0,5) : '';
        const group = groups.find(g => g.id === e.target_group_id)?.name || '';
        
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
            escapeCsv(group),
            escapeCsv(e.location),
            e.requires_attendance ? 'TRUE' : 'FALSE',
            escapeCsv(e.description)
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
            const groupName = row[6];
            const location = row[7];
            const reqAtt = (row[8] || '').toUpperCase() === 'TRUE' || (row[8] || '').trim() === '';
            const description = row[9];
            
            const startDt = `${date}T${startTime || '00:00'}:00`;
            let endDt = null;
            if (endTime) endDt = `${date}T${endTime}:00`;
            
            const group = groups.find(g => g.name === groupName);
            const groupId = group ? group.id : null;
            
            newEvents.push({
                title,
                category: category || null,
                description: description || null,
                location: location || null,
                start_time: startDt,
                end_time: endDt,
                is_all_day: isAllDay,
                requires_attendance: reqAtt,
                target_group_id: groupId,
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
            showLoading();
            try {
                const { error } = await supabaseClient.from('events').insert(newEvents);
                if (error) throw error;
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