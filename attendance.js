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
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'border min-h-[80px] bg-gray-50';
        grid.appendChild(emptyCell);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
        const cell = document.createElement('div');
        cell.className = 'border min-h-[80px] bg-white p-1 flex flex-col items-start relative cursor-pointer hover:bg-green-50 transition';
        cell.innerHTML = `<span class="text-xs font-bold text-gray-700">${i}</span>`;
        
        const targetDateStr = `${year}-${String(month+1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        
        const filteredEvents = getFilteredEvents();
        const dayEvents = filteredEvents.filter(e => e.start_time && e.start_time.startsWith(targetDateStr));
        
        dayEvents.forEach(e => {
            const evEl = document.createElement('div');
            
            const myAtt = attendances.find(a => a.event_id === e.id);
            let iconHtml = '';
            if (e.requires_attendance) {
                const status = myAtt ? myAtt.status : '未入力';
                if (status === '出席') iconHtml = '<span class="inline-block bg-green-100 text-green-700 rounded px-1 mr-1 text-[10px] font-bold leading-none py-0.5">●</span>';
                else if (status === '欠席') iconHtml = '<span class="inline-block bg-gray-200 text-gray-700 rounded px-1 mr-1 text-[10px] font-bold leading-none py-0.5">✖</span>';
                else iconHtml = '<span class="inline-block bg-orange-100 text-orange-700 rounded px-1 mr-1 text-[10px] font-bold leading-none py-0.5">➖</span>';
            }
            
            const groupColor = groups.find(g => g.id === e.target_group_id)?.color || '#d1fae5';
            evEl.className = 'text-[10px] text-gray-800 rounded px-1 mt-1 truncate w-full text-left border border-gray-200 shadow-sm transition hover:opacity-80';
            evEl.style.backgroundColor = groupColor;
            evEl.innerHTML = `${iconHtml}${e.title}`;
            evEl.onclick = (ev) => {
                ev.stopPropagation();
                window.att_openEventDetail(e.id);
            };
            cell.appendChild(evEl);
        });
        
        // カレンダーの空きセルクリック時の新規作成モーダル表示は、誤操作防止のため無効化
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
        const dt = e.start_time ? e.start_time.substring(0, 16).replace('T', ' ') : '日時未定';
        const group = groups.find(g => g.id === e.target_group_id);
        const groupName = group?.name || '全体';
        const groupColor = group?.color || '#e5e7eb';
        const myAtt = attendances.find(a => a.event_id === e.id);
        const statusStr = myAtt ? myAtt.status : '未入力';
        
        let iconHtml = '';
        if (e.requires_attendance) {
            if (statusStr === '出席') iconHtml = '<div class="flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-md mr-3 font-bold text-lg shrink-0" title="出席">●</div>';
            else if (statusStr === '欠席') iconHtml = '<div class="flex items-center justify-center w-8 h-8 bg-gray-200 text-gray-600 rounded-md mr-3 font-bold text-lg shrink-0" title="欠席">✖</div>';
            else iconHtml = '<div class="flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-500 rounded-md mr-3 font-bold text-lg shrink-0" title="保留/未定">➖</div>';
        }
        
        return `
        <div class="p-4 border-l-4 rounded-lg hover:shadow-md transition bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer border-gray-200" style="border-left-color: ${groupColor}" onclick="window.att_openEventDetail('${e.id}')">
            <div class="flex items-center">
                ${iconHtml}
                <div>
                    <div class="flex items-center space-x-2 mb-1">
                        <span class="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">${e.category || 'イベント'}</span>
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
                    <div class="w-1/2"><label class="text-xs font-bold text-gray-600">日付*</label><input type="date" id="ev-date" value="${dateStr}" class="w-full border p-2 rounded"></div>
                    <div class="w-1/2"><label class="text-xs font-bold text-gray-600">開始時間</label><input type="time" id="ev-time" class="w-full border p-2 rounded"></div>
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
    
    if (!title || !date) return alert('イベント名と日付は必須です');

    window.att_closeModal();
    showLoading();
    try {
        const startTime = `${date}T${time || '00:00'}:00`;
        const { error } = await supabaseClient.from('events').insert({
            title, category: document.getElementById('ev-category').value,
            description: document.getElementById('ev-description').value,
            location: document.getElementById('ev-location').value,
            start_time: startTime,
            requires_attendance: document.getElementById('ev-requires-attendance').checked,
            target_group_id: document.getElementById('ev-target-group').value || null,
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

window.openEventDetailModal = function(eventId) {
    const ev = events.find(e => e.id === eventId);
    if(!ev) return;

    const groupName = groups.find(g => g.id === ev.target_group_id)?.name || '全体';
    const dt = ev.start_time ? ev.start_time.substring(0, 16).replace('T', ' ') : '';
    const myAtt = attendances.find(a => a.event_id === ev.id);
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

    const modalHtml = `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
        <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-bold text-gray-800">${ev.title}</h3>
                <button onclick="window.att_deleteEvent('${ev.id}')" class="text-red-500 text-xs border border-red-500 px-2 py-1 rounded hover:bg-red-50 shrink-0 ml-2">削除</button>
            </div>
            <div class="text-sm text-gray-600 mb-4 space-y-1">
                <p><strong>日時:</strong> ${dt}</p>
                <p><strong>場所:</strong> ${ev.location || '未定'}</p>
                <p><strong>対象:</strong> ${groupName}</p>
                <p class="mt-2 whitespace-pre-wrap border p-2 bg-gray-50 rounded">${ev.description || '説明なし'}</p>
            </div>
            
            ${ev.requires_attendance ? `
            <div class="border-t pt-4 mt-4">
                <h4 class="font-bold text-gray-700 mb-2">あなたの出欠情報: <span class="${statusStr==='出席'?'text-green-600':statusStr==='欠席'?'text-gray-600':''}">${statusStr}</span></h4>
                ${canAttend ? 
                    `<button onclick="window.att_openAttendanceForm('${ev.id}')" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded shadow">出欠を登録・変更する</button>` 
                    : `<p class="text-xs text-red-500">※対象グループに所属していないため入力できません</p>`
                }
            </div>
            ${attendanceSummaryHtml}
            ` : ''}
            
            <div class="mt-6 text-center">
                <button onclick="window.att_closeModal()" class="text-gray-500 underline font-bold">閉じる</button>
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