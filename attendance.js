import { supabaseClient, currentUser, showLoading, hideLoading, currentUserRole, openChangePasswordModal } from './main.js';

let currentDate = new Date();
let events = [];
let groups = [];
let userGroups = [];
let attendances = [];
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
    document.getElementById('filter-category')?.addEventListener('change', renderList);
    document.getElementById('filter-group')?.addEventListener('change', renderList);
    
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

        // イベント読み込み
        const { data: eData } = await supabaseClient.from('events').select('*').order('start_time');
        if (eData) events = eData;

        if (currentUser) {
            // 所属グループ
            const { data: ugData } = await supabaseClient.from('user_groups').select('*').eq('user_email', currentUser.email);
            if (ugData) userGroups = ugData;

            // 自身の出欠情報
            const { data: aData } = await supabaseClient.from('attendances').select('*').eq('user_email', currentUser.email);
            if (aData) attendances = aData;
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

// =====================================
// カレンダー・リスト 描画
// =====================================
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
        
        const dayEvents = events.filter(e => e.start_time && e.start_time.startsWith(targetDateStr));
        
        dayEvents.forEach(e => {
            const evEl = document.createElement('div');
            evEl.className = 'text-[10px] bg-green-100 hover:bg-green-200 text-green-800 rounded px-1 mt-1 truncate w-full text-left border border-green-200 shadow-sm';
            evEl.textContent = e.title;
            evEl.onclick = (ev) => {
                ev.stopPropagation();
                window.att_openEventDetail(e.id);
            };
            cell.appendChild(evEl);
        });
        
        cell.onclick = () => openAddEventModal(targetDateStr);
        grid.appendChild(cell);
    }
}

function renderList() {
    const catFilter = document.getElementById('filter-category').value;
    const groupFilter = document.getElementById('filter-group').value;
    
    let filtered = events.filter(e => {
        if (catFilter && e.category !== catFilter) return false;
        if (groupFilter && e.target_group_id !== groupFilter) return false;
        return true;
    });

    const container = document.getElementById('event-list-content');
    if (filtered.length === 0) {
        container.innerHTML = '<p class="text-gray-500 p-4">表示するイベントがありません。</p>';
        return;
    }

    container.innerHTML = filtered.map(e => {
        const dt = e.start_time ? e.start_time.substring(0, 16).replace('T', ' ') : '日時未定';
        const groupName = groups.find(g => g.id === e.target_group_id)?.name || '全体';
        const myAtt = attendances.find(a => a.event_id === e.id);
        const statusStr = myAtt ? myAtt.status : '未入力';
        
        return `
        <div class="p-4 border rounded-lg hover:shadow-md transition bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer" onclick="window.att_openEventDetail('${e.id}')">
            <div>
                <div class="flex items-center space-x-2 mb-1">
                    <span class="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">${e.category || 'イベント'}</span>
                    <span class="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">${groupName}</span>
                </div>
                <h3 class="font-bold text-lg text-gray-800">${e.title}</h3>
                <p class="text-sm text-gray-600">${dt} @ ${e.location || '未定'}</p>
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
                        <select id="ev-category" class="w-full border p-2 rounded"><option value="練習">練習</option><option value="試合">試合</option><option value="イベント">イベント</option></select>
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
        
        window.att_closeModal();
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
    showLoading();
    try {
        await supabaseClient.from('events').delete().eq('id', id);
        window.att_closeModal();
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

    const modalHtml = `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
        <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-bold text-gray-800">${ev.title}</h3>
                <button onclick="window.att_deleteEvent('${ev.id}')" class="text-red-500 text-xs border border-red-500 px-2 py-1 rounded hover:bg-red-50">削除</button>
            </div>
            <div class="text-sm text-gray-600 mb-4 space-y-1">
                <p><strong>日時:</strong> ${dt}</p>
                <p><strong>場所:</strong> ${ev.location || '未定'}</p>
                <p><strong>対象:</strong> ${groupName}</p>
                <p class="mt-2 whitespace-pre-wrap border p-2 bg-gray-50 rounded">${ev.description || '説明なし'}</p>
            </div>
            
            ${ev.requires_attendance ? `
            <div class="border-t pt-4">
                <h4 class="font-bold text-gray-700 mb-2">あなたの出欠情報: <span class="${statusStr==='出席'?'text-green-600':statusStr==='欠席'?'text-red-500':''}">${statusStr}</span></h4>
                ${canAttend ? 
                    `<button onclick="window.att_openAttendanceForm('${ev.id}')" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded shadow">出欠を登録・変更する</button>` 
                    : `<p class="text-xs text-red-500">※対象グループに所属していないため入力できません</p>`
                }
            </div>
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
    showLoading();
    try {
        const payload = {
            event_id: eventId,
            user_email: currentUser.email,
            status: document.getElementById('att-status').value,
            accompanying_persons: document.getElementById('att-acc').value,
            car_capacity: parseInt(document.getElementById('att-car').value) || 0,
            separate_action: document.getElementById('att-sep').value,
            comment: document.getElementById('att-comment').value,
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