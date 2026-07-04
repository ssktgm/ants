// ==========================================
// ANTS_BB ポジションシミュレーター (打順・印刷 ＆ Supabase 同期対応)
// ==========================================

import { switchAuthScreen } from './main.js';

// Supabase クライアント初期化
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
let supabaseClient = null;

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
        if (!window.supabaseClient && window.supabase && window.supabase.createClient) {
            window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        }
        supabaseClient = window.supabaseClient;
    } catch (e) {
        console.error('Supabase Client initialize error:', e);
    }
}

// 状態管理
let players = []; // { id, name, number }
let patterns = []; // { id, name, mode (9:DHなし, 10:DHあり), basePositions: { p: playerId, ... }, customSubstitutions: [], battingOrder: { 1: playerId, ... }, headerInfo: { date, tournament, ... } }
let currentPatternId = null;
let activeTab = 'setup';
let selectedPlayerId = null;
let selectedSourcePos = null;
let simulatorMode = 9; // 9: DH制なし, 10: DH制あり

// 守備位置の日本語ラベル
const POSITION_LABELS = {
    p: '投手',
    c: '捕手',
    '1b': '一塁手',
    '2b': '二塁手',
    '3b': '三塁手',
    ss: '遊撃手',
    lf: '左翼手',
    cf: '中堅手',
    rf: '右翼手',
    dh: '指名打者'
};

// 守備番号 (スコアブック・アナウンス用)
const POSITION_NUMBERS = {
    p: '1',
    c: '2',
    '1b': '3',
    '2b': '4',
    '3b': '5',
    ss: '6',
    lf: '7',
    cf: '8',
    rf: '9',
    dh: 'DH'
};

const NUMBER_TO_POSITION = {
    '1': 'p',
    '2': 'c',
    '3': '1b',
    '4': '2b',
    '5': '3b',
    '6': 'ss',
    '7': 'lf',
    '8': 'cf',
    '9': 'rf',
    '10': 'dh',
    'd': 'dh',
    'dh': 'dh',
    'DH': 'dh'
};

const POSITIONS_9 = ['p', 'c', '1b', '2b', '3b', 'ss', 'lf', 'cf', 'rf'];
const POSITIONS_DH = ['p', 'c', '1b', '2b', '3b', 'ss', 'lf', 'cf', 'rf', 'dh'];

// LocalStorage キー (フォールバック用)
const STORAGE_PLAYERS_KEY = 'ants_sim_players';
const STORAGE_PATTERNS_KEY = 'ants_sim_patterns';

/**
 * 初期化関数
 */
export async function initPositionSimulator() {
    try {
        setupEventListeners();
        await loadData();
        
        updatePatternSelectOptions();
        
        if (patterns.length > 0) {
            currentPatternId = patterns[0].id;
            const select = document.getElementById('sim-pattern-select');
            if (select) select.value = currentPatternId;
            const pattern = patterns.find(p => p.id === currentPatternId);
            if (pattern) {
                simulatorMode = pattern.mode || 9;
            }
        } else {
            await createNewPattern('デフォルト配置');
        }
        
        updateModeUI();
        switchTab('setup');
        initRuleFormSelects();
        renderSimulator();
    } catch (e) {
        console.error('Fatal initialization error:', e);
        alert('アプリケーションの初期化中にエラーが発生しました。\n詳細: ' + e.message);
    }
}

/**
 * パターンデータの構造を補正・健全化するヘルパー
 */
function sanitizePattern(pat) {
    if (!pat) return pat;
    if (!pat.basePositions) pat.basePositions = {};
    if (!pat.customSubstitutions) pat.customSubstitutions = [];
    if (!pat.battingOrder) pat.battingOrder = {};
    if (!pat.headerInfo) pat.headerInfo = {};
    if (pat.mode === undefined) pat.mode = 9;
    if (pat.isSynced === undefined) pat.isSynced = false;
    return pat;
}

/**
 * Supabase ＆ LocalStorage からデータ読み込み
 */
async function loadData() {
    let success = false;
    
    if (supabaseClient) {
        try {
            const { data: dbPlayers, error: pError } = await supabaseClient.from('sim_players').select('*').order('created_at', { ascending: true });
            const { data: dbPatterns, error: patError } = await supabaseClient.from('sim_patterns').select('*').order('created_at', { ascending: true });
            
            if (!pError && !patError && dbPlayers && dbPatterns) {
                players = dbPlayers;
                patterns = dbPatterns.map(p => sanitizePattern({
                    id: p.id,
                    name: p.name,
                    mode: p.has_dh ? 10 : 9,
                    basePositions: p.base_positions || {},
                    customSubstitutions: p.custom_substitutions || [],
                    battingOrder: p.batting_order || {},
                    headerInfo: p.header_info || {},
                    isSynced: true
                }));
                success = true;
            } else {
                if (pError) console.error('Supabase load players error:', pError);
                if (patError) console.error('Supabase load patterns error:', patError);
            }
        } catch (err) {
            console.error('Supabase load failed, falling back to local storage:', err);
        }
    }
    
    if (!success) {
        loadFromLocalStorage();
    } else {
        // 双方向同期：ローカルの未同期データをDBにマージ
        const dbPlayerIds = new Set(players.map(p => p.id));
        const dbPatIds = new Set(patterns.map(p => p.id));
        
        try {
            const storedP = localStorage.getItem(STORAGE_PLAYERS_KEY);
            if (storedP) {
                const localP = JSON.parse(storedP);
                localP.forEach(p => {
                    if (!dbPlayerIds.has(p.id)) {
                        players.push(p);
                        syncPlayerToDB(p);
                    }
                });
            }
            
            const storedPat = localStorage.getItem(STORAGE_PATTERNS_KEY);
            if (storedPat) {
                const localPats = JSON.parse(storedPat);
                localPats.forEach(async (pat) => {
                    if (!dbPatIds.has(pat.id)) {
                        const sanitized = sanitizePattern(pat);
                        sanitized.isSynced = false;
                        patterns.push(sanitized);
                        // 非同期でDBへ自動プッシュし、成功したら同期済みに更新
                        const err = await syncPatternToDB(sanitized);
                        sanitized.isSynced = !err;
                        updatePatternSelectOptions();
                    }
                });
            }
        } catch (e) {
            console.error('LocalStorage sync merge error:', e);
        }
        
        savePlayersToLocalStorage();
        savePatternsToLocalStorage();
    }
}

function loadFromLocalStorage() {
    try {
        const storedPlayers = localStorage.getItem(STORAGE_PLAYERS_KEY);
        if (storedPlayers) {
            players = JSON.parse(storedPlayers);
        } else {
            players = [
                { id: 'p1', name: 'とあ', number: '2' },
                { id: 'p2', name: 'そうま', number: '10' },
                { id: 'p3', name: 'あきと', number: '3' },
                { id: 'p4', name: 'ゆうき', number: '4' },
                { id: 'p5', name: 'あいのすけ', number: '1' },
                { id: 'p6', name: 'けんせい', number: '6' },
                { id: 'p7', name: 'りゅうと', number: '7' },
                { id: 'p8', name: 'ながまさ', number: '8' },
                { id: 'p9', name: 'そうすけ', number: '9' },
                { id: 'p10', name: 'たいち', number: '5' }
            ];
            savePlayersToLocalStorage();
        }
        
        const storedPatterns = localStorage.getItem(STORAGE_PATTERNS_KEY);
        if (storedPatterns) {
            patterns = JSON.parse(storedPatterns).map(pat => {
                // 互換性補正
                if (!pat.basePositions && pat.innings && pat.innings[0]) {
                    pat.basePositions = pat.innings[0].positions || {};
                }
                return sanitizePattern(pat);
            });
        }
    } catch (e) {
        console.error('LocalStorage load error:', e);
    }
}

function savePlayersToLocalStorage() {
    localStorage.setItem(STORAGE_PLAYERS_KEY, JSON.stringify(players));
}

function savePatternsToLocalStorage() {
    localStorage.setItem(STORAGE_PATTERNS_KEY, JSON.stringify(patterns));
}

/**
 * Supabase 同期処理
 */
async function syncPlayerToDB(player, isDelete = false) {
    if (!supabaseClient) return null;
    try {
        let res;
        if (isDelete) {
            res = await supabaseClient.from('sim_players').delete().eq('id', player.id);
        } else {
            res = await supabaseClient.from('sim_players').upsert({
                id: player.id,
                name: player.name,
                number: player.number
            });
        }
        return res ? res.error : null;
    } catch (e) {
        console.error('Supabase player sync error:', e);
        return e;
    }
}

async function syncPatternToDB(pattern, isDelete = false) {
    if (!supabaseClient) return null;
    try {
        let res;
        if (isDelete) {
            res = await supabaseClient.from('sim_patterns').delete().eq('id', pattern.id);
        } else {
            res = await supabaseClient.from('sim_patterns').upsert({
                id: pattern.id,
                name: pattern.name,
                has_dh: pattern.mode === 10,
                base_positions: pattern.basePositions,
                custom_substitutions: pattern.customSubstitutions,
                batting_order: pattern.battingOrder || {},
                header_info: pattern.headerInfo || {},
                updated_at: new Date().toISOString()
            });
        }
        return res ? res.error : null;
    } catch (e) {
        console.error('Supabase pattern sync error:', e);
        return e;
    }
}

/**
 * 自動セーブ＆同期ステータス更新処理
 */
async function autoSavePattern(pattern) {
    if (!pattern) return;
    savePatternsToLocalStorage();
    const err = await syncPatternToDB(pattern);
    pattern.isSynced = !err;
    updatePatternSelectOptions();
}

/**
 * 新規パターンの作成
 */
async function createNewPattern(name = '') {
    const id = 'pat_' + Date.now();
    const newPat = {
        id: id,
        name: name || '新規データ',
        mode: simulatorMode,
        basePositions: {},
        customSubstitutions: [],
        battingOrder: {},
        headerInfo: {
            date: '',
            tournament: '',
            teamHome: 'ありんこアントス',
            teamVisitor: '',
            manager: '',
            captain: '',
            scorer: '',
            stadium: '',
            time: ''
        }
    };
    patterns.push(newPat);
    currentPatternId = id;
    
    await autoSavePattern(newPat);
    
    const select = document.getElementById('sim-pattern-select');
    if (select) select.value = id;
    const nameInput = document.getElementById('sim-pattern-name-input');
    if (nameInput) nameInput.value = newPat.name;
}

function updatePatternSelectOptions() {
    const select = document.getElementById('sim-pattern-select');
    if (!select) return;
    
    select.innerHTML = '<option value="">新規作成...</option>';
    patterns.forEach(p => {
        const option = document.createElement('option');
        option.value = p.id;
        const suffix = p.isSynced === false ? ' (未同期)' : '';
        option.textContent = p.name + suffix;
        select.appendChild(option);
    });
    
    if (currentPatternId) {
        select.value = currentPatternId;
    }
}

function updateModeUI() {
    const btn9 = document.getElementById('btn-sim-mode-9');
    const btn10 = document.getElementById('btn-sim-mode-10');
    
    if (simulatorMode === 9) {
        btn9.className = 'px-3 py-1.5 text-xs font-bold bg-amber-600 text-white transition';
        btn10.className = 'px-3 py-1.5 text-xs font-bold bg-white text-gray-700 border-l hover:bg-gray-50 transition';
    } else {
        btn9.className = 'px-3 py-1.5 text-xs font-bold bg-white text-gray-700 transition';
        btn10.className = 'px-3 py-1.5 text-xs font-bold bg-amber-600 text-white border-l hover:bg-gray-50 transition';
    }
}

/**
 * 交代を重ね合わせた最終的なポジション配置を算出する
 */
function getPositionsToDraw(pattern) {
    const currentPositions = { ...(pattern.basePositions || {}) };
    const activePositions = simulatorMode === 9 ? POSITIONS_9 : POSITIONS_DH;
    
    Object.keys(currentPositions).forEach(k => {
        if (!activePositions.includes(k)) {
            delete currentPositions[k];
        }
    });
    
    const activeSubs = (pattern.customSubstitutions || []).filter(s => s.active);
    
    activeSubs.forEach(sub => {
        if (sub.type === 'swap') {
            const { pos1, pos2 } = sub.details;
            if (activePositions.includes(pos1) && activePositions.includes(pos2)) {
                const temp = currentPositions[pos1];
                currentPositions[pos1] = currentPositions[pos2];
                currentPositions[pos2] = temp;
            }
        } else if (sub.type === 'sub') {
            const { outPlayerId, inPlayerId, pos } = sub.details;
            if (outPlayerId) {
                const posKey = Object.keys(currentPositions).find(k => currentPositions[k] === outPlayerId);
                if (posKey) {
                    currentPositions[posKey] = inPlayerId;
                }
            } else if (pos && activePositions.includes(pos)) {
                currentPositions[pos] = inPlayerId;
            }
        } else if (sub.type === 'rotation') {
            const keys = sub.details.positions;
            const validKeys = keys.filter(k => activePositions.includes(k));
            if (validKeys.length > 1) {
                const originalVals = validKeys.map(k => currentPositions[k]);
                for (let i = 0; i < validKeys.length; i++) {
                    const prevVal = originalVals[(i - 1 + validKeys.length) % validKeys.length];
                    currentPositions[validKeys[i]] = prevVal;
                }
            }
        }
    });
    
    return currentPositions;
}

/**
 * 選手がすでに交代により退いている（再出場不可）かを調べる
 */
function getRetiredPlayerIds(pattern) {
    const retired = new Set();
    const activeSubs = (pattern.customSubstitutions || []).filter(s => s.active);
    activeSubs.forEach(sub => {
        if (sub.type === 'sub') {
            if (sub.details.outPlayerId) {
                retired.add(sub.details.outPlayerId);
            }
        }
    });
    return retired;
}

/**
 * 打順の自動整合性・デフォルト割当ロジック
 */
function assignDefaultBattingOrder(pattern) {
    if (!pattern.battingOrder) pattern.battingOrder = {};
    
    const activePositions = simulatorMode === 9 ? POSITIONS_9 : POSITIONS_DH;
    const base = pattern.basePositions || {};
    
    // 現在スタメンとして配置されている選手IDの集合
    const currentLineupPlayerIds = new Set();
    activePositions.forEach(pos => {
        if (base[pos]) {
            currentLineupPlayerIds.add(base[pos]);
        }
    });
    
    // 1. スタメンから外れた選手を打順から削除
    Object.keys(pattern.battingOrder).forEach(ord => {
        const pId = pattern.battingOrder[ord];
        if (!currentLineupPlayerIds.has(pId)) {
            delete pattern.battingOrder[ord];
        }
    });
    
    // 2. 打順がまだ決まっていないスタメン選手を抽出
    const assignedPlayerIds = new Set(Object.values(pattern.battingOrder));
    const unassignedPlayerIds = [];
    currentLineupPlayerIds.forEach(pId => {
        if (!assignedPlayerIds.has(pId)) {
            unassignedPlayerIds.push(pId);
        }
    });
    
    // 3. 空いている打順番号に順次割り当て
    const maxOrder = activePositions.length;
    for (let ord = 1; ord <= maxOrder; ord++) {
        if (unassignedPlayerIds.length === 0) break;
        if (!pattern.battingOrder[ord]) {
            const nextPlayerId = unassignedPlayerIds.shift();
            pattern.battingOrder[ord] = nextPlayerId;
        }
    }
}

/**
 * 全体レンダリング
 */
function renderSimulator() {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    // 交代適用後のポジション算出
    const drawPositions = getPositionsToDraw(currentPattern);
    const retiredPlayerIds = getRetiredPlayerIds(currentPattern);
    
    // 1. 配置済み選手IDのリスト
    const assignedPlayerIds = new Set(Object.values(drawPositions).filter(Boolean));
    
    // 2. 打順のデフォルト整合性補正
    assignDefaultBattingOrder(currentPattern);
    
    // 3. 選手リストの描画
    renderPlayersList(assignedPlayerIds, retiredPlayerIds);
    
    // 4. ベンチ（控え選手）の描画
    renderBenchList(assignedPlayerIds, retiredPlayerIds);
    
    // 5. グラウンドポジションスロットの描画
    renderFieldPositions(drawPositions, currentPattern);
    
    // 6. 打順設定リストの描画
    renderBattingOrderList(currentPattern);
    
    // 7. 交代ルールリストの描画
    renderSubRulesList(currentPattern);
    
    // 8. アナウンスログの描画
    renderAnnouncementLogs(currentPattern);
}

/**
 * 登録選手リストの描画
 */
function renderPlayersList(assignedPlayerIds, retiredPlayerIds) {
    const listEl = document.getElementById('sim-players-list');
    const countEl = document.getElementById('sim-player-count');
    if (!listEl) return;
    
    listEl.innerHTML = '';
    if (countEl) countEl.textContent = `${players.length} 人`;
    
    if (players.length === 0) {
        listEl.innerHTML = '<span class="text-xs text-gray-400 p-2">登録されている選手がいません。</span>';
        return;
    }
    
    players.forEach(player => {
        const isAssigned = assignedPlayerIds.has(player.id);
        const isRetired = retiredPlayerIds.has(player.id);
        const isSelected = selectedPlayerId === player.id && selectedSourcePos === 'players-list';
        
        const badge = document.createElement('div');
        badge.className = `sim-player-badge ${isAssigned ? 'assigned' : ''} ${isRetired ? 'retired' : ''} ${isSelected ? 'selected' : ''}`;
        badge.setAttribute('data-player-id', player.id);
        
        if (!isAssigned && !isRetired) {
            badge.setAttribute('draggable', 'true');
            badge.addEventListener('dragstart', handleDragStart);
        }
        
        const numLabel = player.number ? `#${player.number} ` : '';
        badge.innerHTML = `
            <span>${numLabel}${escapeHTML(player.name)}${isRetired ? ' (交代済)' : ''}</span>
            <span class="sim-player-delete-btn" data-player-id="${player.id}">×</span>
        `;
        
        badge.addEventListener('click', (e) => {
            if (e.target.classList.contains('sim-player-delete-btn')) {
                handleDeletePlayer(player.id);
                return;
            }
            if (isAssigned || isRetired) return;
            handleSelectPlayer(player.id, 'players-list');
        });
        
        listEl.appendChild(badge);
    });
}

/**
 * ベンチ（控え選手）の描画
 */
function renderBenchList(assignedPlayerIds, retiredPlayerIds) {
    const benchEl = document.getElementById('sim-bench-list');
    if (!benchEl) return;
    
    benchEl.innerHTML = '';
    
    const benchPlayers = players.filter(p => !assignedPlayerIds.has(p.id) && !retiredPlayerIds.has(p.id));
    
    if (benchPlayers.length === 0) {
        benchEl.innerHTML = '<span class="text-xs text-gray-400 p-1">控え選手はいません。</span>';
        return;
    }
    
    benchPlayers.forEach(player => {
        const isSelected = selectedPlayerId === player.id && selectedSourcePos === 'bench';
        
        const badge = document.createElement('div');
        badge.className = `sim-player-badge sim-bench-badge ${isSelected ? 'selected' : ''}`;
        badge.setAttribute('data-player-id', player.id);
        badge.setAttribute('draggable', 'true');
        
        const numLabel = player.number ? `#${player.number} ` : '';
        badge.innerHTML = `<span>${numLabel}${escapeHTML(player.name)}</span>`;
        
        badge.addEventListener('dragstart', handleDragStart);
        badge.addEventListener('click', () => {
            handleSelectPlayer(player.id, 'bench');
        });
        
        benchEl.appendChild(badge);
    });
}

/**
 * グラウンド上のポジションスロットの描画
 */
function renderFieldPositions(drawPositions, currentPattern) {
    const container = document.getElementById('sim-field-positions');
    if (!container) return;
    
    container.innerHTML = '';
    
    const activePositions = simulatorMode === 9 ? POSITIONS_9 : POSITIONS_DH;
    
    activePositions.forEach(pos => {
        const playerId = drawPositions[pos];
        const player = players.find(p => p.id === playerId);
        
        const isChanged = (currentPattern.basePositions || {})[pos] !== playerId && playerId;
        const isSelected = selectedPlayerId && selectedSourcePos === pos;
        
        const slot = document.createElement('div');
        slot.className = `sim-pos-slot pos-${pos} ${isSelected ? 'swap-selected' : ''}`;
        slot.setAttribute('data-position', pos);
        
        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('dragleave', handleDragLeave);
        slot.addEventListener('drop', handleDrop);
        slot.addEventListener('click', () => {
            handleFieldSlotClick(pos);
        });
        
        const numLabel = (player && player.number) ? `#${player.number} ` : '';
        slot.innerHTML = `
            <div class="sim-pos-title">${POSITION_LABELS[pos]}</div>
            <div class="sim-pos-player ${isChanged ? 'player-changed' : ''}">
                ${player ? numLabel + escapeHTML(player.name) : '<span class="text-gray-300 text-xs font-normal">未配置</span>'}
            </div>
        `;
        
        container.appendChild(slot);
    });
}

/**
 * 打順設定リストの描画
 */
function renderBattingOrderList(pattern) {
    const container = document.getElementById('sim-batting-order-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    const activePositions = simulatorMode === 9 ? POSITIONS_9 : POSITIONS_DH;
    const maxOrder = activePositions.length;
    const base = pattern.basePositions || {};
    
    // 現在スタメンとして配置されている選手とポジションの逆引きマップを作成
    const playerToPos = {};
    activePositions.forEach(pos => {
        const pId = base[pos];
        if (pId) {
            playerToPos[pId] = pos;
        }
    });
    
    // 打順 1番〜最大数 順に行をレンダリング
    let hasLineup = false;
    
    for (let ord = 1; ord <= maxOrder; ord++) {
        const playerId = pattern.battingOrder[ord];
        if (!playerId) continue;
        
        const player = players.find(p => p.id === playerId);
        if (!player) continue;
        
        hasLineup = true;
        const pos = playerToPos[playerId];
        const posLabel = pos ? POSITION_LABELS[pos] : '未配置';
        
        const row = document.createElement('div');
        row.className = 'flex items-center justify-between bg-amber-50/50 border border-amber-100 rounded-lg p-2 text-xs';
        
        // 矢印ボタンエリア
        const btnContainer = document.createElement('div');
        btnContainer.className = 'flex items-center gap-1 shrink-0';
        
        const btnUp = document.createElement('button');
        btnUp.className = 'px-2 py-1 bg-amber-100 hover:bg-amber-200 disabled:opacity-30 disabled:cursor-not-allowed text-amber-900 font-bold rounded text-[10px] leading-none transition shadow-sm';
        btnUp.textContent = '▲';
        if (ord === 1) btnUp.disabled = true;
        btnUp.addEventListener('click', () => handleSwapBattingOrder(ord, 'up'));
        
        const btnDown = document.createElement('button');
        btnDown.className = 'px-2 py-1 bg-amber-100 hover:bg-amber-200 disabled:opacity-30 disabled:cursor-not-allowed text-amber-900 font-bold rounded text-[10px] leading-none transition shadow-sm';
        btnDown.textContent = '▼';
        if (ord === maxOrder) btnDown.disabled = true;
        btnDown.addEventListener('click', () => handleSwapBattingOrder(ord, 'down'));
        
        btnContainer.appendChild(btnUp);
        btnContainer.appendChild(btnDown);
        
        const numText = player.number ? `#${player.number} ` : '';
        row.innerHTML = `
            <div class="flex items-center gap-2">
                <span class="bg-amber-600 text-white font-bold rounded-full w-5 h-5 flex items-center justify-center text-[10px]">${ord}</span>
                <span class="font-bold text-gray-800">${numText}${escapeHTML(player.name)}</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">${posLabel}</span>
            </div>
        `;
        
        row.appendChild(btnContainer);
        container.appendChild(row);
    }
    
    if (!hasLineup) {
        container.innerHTML = '<p class="text-xs text-gray-400 text-center py-2">選手をスタメン配置すると打順が設定できます。</p>';
    }
}

/**
 * 打順スワップハンドラー
 */
async function handleSwapBattingOrder(order, direction) {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    if (!currentPattern.battingOrder) currentPattern.battingOrder = {};
    
    const targetOrder = direction === 'up' ? order - 1 : order + 1;
    
    const activePositions = simulatorMode === 9 ? POSITIONS_9 : POSITIONS_DH;
    const maxOrder = activePositions.length;
    
    if (targetOrder < 1 || targetOrder > maxOrder) return;
    
    const playerA = currentPattern.battingOrder[order];
    const playerB = currentPattern.battingOrder[targetOrder];
    
    // スワップ実行
    if (playerA && playerB) {
        currentPattern.battingOrder[order] = playerB;
        currentPattern.battingOrder[targetOrder] = playerA;
    } else if (playerA) {
        currentPattern.battingOrder[targetOrder] = playerA;
        delete currentPattern.battingOrder[order];
    }
    
    await autoSavePattern(currentPattern);
    
    renderSimulator();
}

/**
 * 交代ルールの概要テキスト（守備番号・アナウンス調テキスト）を取得
 */
function getRuleSummaryText(rule, tempPositions, isHTML) {
    if (!rule) return { code: '', desc: '', fullDesc: '' };
    
    if (rule.type === 'sub') {
        const { outPlayerId, inPlayerId } = rule.details;
        const outPlayer = players.find(p => p.id === outPlayerId);
        const inPlayer = players.find(p => p.id === inPlayerId);
        
        const outName = outPlayer ? outPlayer.name : '不明';
        const inName = inPlayer ? inPlayer.name : '不明';
        
        // 元の守備位置を探す
        const posKey = Object.keys(tempPositions).find(k => tempPositions[k] === outPlayerId);
        const posNum = posKey ? POSITION_NUMBERS[posKey] || '' : '';
        const posLabel = posKey ? POSITION_LABELS[posKey] || '' : '選手';
        
        const code = posNum ? `交代 (${posNum})` : '交代';
        
        const desc = isHTML 
            ? `<span class="font-bold text-amber-900">${escapeHTML(outName)}</span>に代わって<span class="font-bold text-amber-900">${escapeHTML(inName)}</span>`
            : `${outName}に代わって${inName}`;
            
        const fullDesc = `${posLabel}の${outName}に代わりまして、${inName}が入ります。`;
        
        return { code, desc, fullDesc };
        
    } else if (rule.type === 'rotation') {
        const keys = rule.details.positions || [];
        const nums = keys.map(k => POSITION_NUMBERS[k] || k);
        const code = nums.join('-');
        
        const steps = [];
        for (let i = 0; i < keys.length - 1; i++) {
            const fromPos = keys[i];
            const toPos = keys[i + 1];
            const pId = tempPositions[fromPos];
            const player = players.find(p => p.id === pId);
            if (player) {
                const name = isHTML 
                    ? `<span class="font-bold text-amber-900">${escapeHTML(player.name)}</span>` 
                    : player.name;
                steps.push(`${name}が${POSITION_LABELS[toPos]}`);
            }
        }
        
        const desc = steps.join('、');
        const fullDesc = desc ? `${desc}へ。` : 'ポジション交代';
        
        return { code, desc, fullDesc };
        
    } else if (rule.type === 'swap') {
        const { pos1, pos2 } = rule.details;
        const pId1 = tempPositions[pos1];
        const pId2 = tempPositions[pos2];
        const player1 = players.find(p => p.id === pId1);
        const player2 = players.find(p => p.id === pId2);
        
        const num1 = POSITION_NUMBERS[pos1] || pos1;
        const num2 = POSITION_NUMBERS[pos2] || pos2;
        const label1 = POSITION_LABELS[pos1] || '';
        const label2 = POSITION_LABELS[pos2] || '';
        
        const name1 = player1 ? player1.name : '未配置';
        const name2 = player2 ? player2.name : '未配置';
        
        const code = `${num1}⇔${num2}`;
        const desc = isHTML
            ? `<span class="font-bold text-amber-900">${escapeHTML(name1)}</span>と<span class="font-bold text-amber-900">${escapeHTML(name2)}</span>の入れ替え`
            : `${name1}と${name2}の入れ替え`;
            
        const fullDesc = `${label1}の${name1}と${label2}の${name2}が入れ替わります。`;
        
        return { code, desc, fullDesc };
    }
    
    return { code: '', desc: '', fullDesc: '' };
}

/**
 * 交代定義リストの描画
 */
function renderSubRulesList(pattern) {
    const listEl = document.getElementById('sim-sub-rules-list');
    if (!listEl) return;
    
    listEl.innerHTML = '';
    const rules = pattern.customSubstitutions || [];
    
    if (rules.length === 0) {
        listEl.innerHTML = '<p class="text-xs text-gray-400 text-center py-4">登録された交代はありません。</p>';
        return;
    }
    
    const activePositions = simulatorMode === 9 ? POSITIONS_9 : POSITIONS_DH;
    let tempPositions = { ...(pattern.basePositions || {}) };
    
    rules.forEach(rule => {
        const title = getRuleSummaryText(rule, tempPositions, true);
        
        if (rule.active) {
            if (rule.type === 'swap') {
                const { pos1, pos2 } = rule.details;
                if (activePositions.includes(pos1) && activePositions.includes(pos2)) {
                    const temp = tempPositions[pos1];
                    tempPositions[pos1] = tempPositions[pos2];
                    tempPositions[pos2] = temp;
                }
            } else if (rule.type === 'sub') {
                const { outPlayerId, inPlayerId, pos } = rule.details;
                if (outPlayerId) {
                    const posKey = Object.keys(tempPositions).find(k => tempPositions[k] === outPlayerId);
                    if (posKey) {
                        tempPositions[posKey] = inPlayerId;
                    }
                } else if (pos && activePositions.includes(pos)) {
                    tempPositions[pos] = inPlayerId;
                }
            } else if (rule.type === 'rotation') {
                const keys = rule.details.positions;
                const validKeys = keys.filter(k => activePositions.includes(k));
                if (validKeys.length > 1) {
                    const originalVals = validKeys.map(k => tempPositions[k]);
                    for (let i = 0; i < validKeys.length; i++) {
                        const prevVal = originalVals[(i - 1 + validKeys.length) % validKeys.length];
                        tempPositions[validKeys[i]] = prevVal;
                    }
                }
            }
        }
        
        const card = document.createElement('div');
        card.className = `sub-rule-card ${rule.active ? 'active' : ''}`;
        
        card.innerHTML = `
            <div class="flex items-center gap-2">
                <label class="sim-switch">
                    <input type="checkbox" ${rule.active ? 'checked' : ''} data-rule-id="${rule.id}">
                    <span class="sim-slider"></span>
                </label>
                <div class="flex flex-col">
                    <span class="text-xs font-bold text-gray-800">${title.code}</span>
                    <span class="text-[11px] text-gray-600 leading-tight">${title.desc}</span>
                </div>
            </div>
            <button class="text-gray-400 hover:text-red-500 font-bold text-sm px-2 py-1 transition btn-delete-rule" data-rule-id="${rule.id}">×</button>
        `;
        
        card.querySelector('input[type="checkbox"]').addEventListener('change', (e) => {
            handleToggleSubRule(rule.id, e.target.checked);
        });
        
        card.querySelector('.btn-delete-rule').addEventListener('click', () => {
            handleDeleteSubRule(rule.id);
        });
        
        listEl.appendChild(card);
    });
}

/**
 * アナウンスログの描画
 */
function renderAnnouncementLogs(pattern) {
    const container = document.getElementById('sim-announcement-logs');
    if (!container) return;
    
    container.innerHTML = '';
    const activeRules = (pattern.customSubstitutions || []).filter(s => s.active);
    
    if (activeRules.length === 0) {
        container.innerHTML = '<p class="text-xs text-gray-400 text-center py-2">適用中の交代はありません（基本配置のままです）。</p>';
        return;
    }
    
    const activePositions = simulatorMode === 9 ? POSITIONS_9 : POSITIONS_DH;
    let tempPositions = { ...(pattern.basePositions || {}) };
    
    activeRules.forEach(rule => {
        const textObj = getRuleSummaryText(rule, tempPositions, false);
        
        if (rule.type === 'swap') {
            const { pos1, pos2 } = rule.details;
            if (activePositions.includes(pos1) && activePositions.includes(pos2)) {
                const temp = tempPositions[pos1];
                tempPositions[pos1] = tempPositions[pos2];
                tempPositions[pos2] = temp;
            }
        } else if (rule.type === 'sub') {
            const { outPlayerId, inPlayerId, pos } = rule.details;
            if (outPlayerId) {
                const posKey = Object.keys(tempPositions).find(k => tempPositions[k] === outPlayerId);
                if (posKey) {
                    tempPositions[posKey] = inPlayerId;
                }
            } else if (pos && activePositions.includes(pos)) {
                tempPositions[pos] = inPlayerId;
            }
        } else if (rule.type === 'rotation') {
            const keys = rule.details.positions;
            const validKeys = keys.filter(k => activePositions.includes(k));
            if (validKeys.length > 1) {
                const originalVals = validKeys.map(k => tempPositions[k]);
                for (let i = 0; i < validKeys.length; i++) {
                    const prevVal = originalVals[(i - 1 + validKeys.length) % validKeys.length];
                    tempPositions[validKeys[i]] = prevVal;
                }
            }
        }
        
        const item = document.createElement('div');
        item.className = 'announcement-item';
        item.innerHTML = `
            <span class="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0">${textObj.code}</span>
            <span class="text-xs font-semibold truncate text-amber-900">${textObj.fullDesc}</span>
        `;
        container.appendChild(item);
    });
}

// ==========================================
// 交代作成フォームのセレクトボックス初期化
// ==========================================
function initRuleFormSelects() {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    const activePositions = simulatorMode === 9 ? POSITIONS_9 : POSITIONS_DH;
    
    const subPlayerOut = document.getElementById('sub-player-out');
    const subPlayerIn = document.getElementById('sub-player-in');
    
    const currentPositions = getPositionsToDraw(currentPattern);
    const assignedPlayerIds = new Set(Object.values(currentPositions).filter(Boolean));
    const retiredIds = getRetiredPlayerIds(currentPattern);
    
    if (subPlayerOut) {
        subPlayerOut.innerHTML = '';
        activePositions.forEach(pos => {
            const pId = currentPositions[pos];
            if (pId) {
                const name = players.find(p => p.id === pId)?.name || '未配置';
                const opt = document.createElement('option');
                opt.value = pId;
                opt.textContent = `${name} (${POSITION_LABELS[pos]})`;
                subPlayerOut.appendChild(opt);
            }
        });
    }
    
    if (subPlayerIn) {
        subPlayerIn.innerHTML = '';
        const availableIn = players.filter(p => !assignedPlayerIds.has(p.id) && !retiredIds.has(p.id));
        
        if (availableIn.length === 0) {
            subPlayerIn.innerHTML = '<option value="">控え選手なし</option>';
        } else {
            availableIn.forEach(p => {
                const opt = document.createElement('option');
                opt.value = p.id;
                opt.textContent = p.name;
                subPlayerIn.appendChild(opt);
            });
        }
    }
    
    const rotInput = document.getElementById('rot-input-text');
    if (rotInput) {
        rotInput.value = '';
    }
}

// ==========================================
// 交代の適用・解除ロジック & 競合チェック
// ==========================================

async function handleToggleSubRule(ruleId, active) {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    const rule = currentPattern.customSubstitutions.find(s => s.id === ruleId);
    if (!rule) return;
    
    if (active) {
        const conflict = checkSubstitutionConflict(rule, currentPattern);
        if (conflict) {
            alert(`適用エラー: 他の有効な交代と競合するため適用できません。\n理由: ${conflict}`);
            renderSimulator();
            return;
        }
    }
    
    rule.active = active;
    
    await autoSavePattern(currentPattern);
    
    initRuleFormSelects();
    renderSimulator();
}

/**
 * 競合検出
 */
function checkSubstitutionConflict(newRule, pattern) {
    // ユーザーが自由に重ね合わせの交代をシミュレーションできるように競合チェックを緩和（常に競合なしとする）
    return null;
}

/**
 * 交代ルールの新規作成
 */
async function handleCreateSubRule() {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    const typeSelect = document.getElementById('rule-type-select');
    const type = typeSelect ? typeSelect.value : 'rotation';
    
    let details = {};
    
    if (type === 'sub') {
        const outPlayerId = document.getElementById('sub-player-out').value;
        const inPlayerId = document.getElementById('sub-player-in').value;
        
        if (!outPlayerId) {
            alert('退く選手を選択してください。');
            return;
        }
        if (!inPlayerId) {
            alert('入る控え選手を選択してください。');
            return;
        }
        
        details = { outPlayerId, inPlayerId };
    } else if (type === 'rotation') {
        const textInput = document.getElementById('rot-input-text');
        const text = textInput ? textInput.value.trim() : '';
        
        if (!text) {
            alert('交代ルートを入力してください（例: 1-3-1）。');
            return;
        }
        
        if (!/^[0-9a-zA-Z]+(-[0-9a-zA-Z]+)*$/.test(text)) {
            alert('入力形式が正しくありません。半角数字・英字とハイフンで入力してください（例: 1-3-1）。');
            return;
        }
        
        const nums = text.split('-').filter(Boolean);
        
        if (nums.length < 2) {
            alert('交代には最低2つのポジションが必要です（例: 1-3）。');
            return;
        }
        
        const activePositions = simulatorMode === 9 ? POSITIONS_9 : POSITIONS_DH;
        
        const rotPositions = [];
        for (const num of nums) {
            const posKey = NUMBER_TO_POSITION[num];
            if (!posKey) {
                alert(`無効なポジション番号「${num}」が含まれています。1〜9またはDHを指定してください。`);
                return;
            }
            if (!activePositions.includes(posKey)) {
                alert(`ポジション「${num}」(${POSITION_LABELS[posKey] || posKey})は、現在の守備モード（DH${simulatorMode === 10 ? 'あり' : 'なし'}）では使用できません。`);
                return;
            }
            rotPositions.push(posKey);
        }
        
        // 隣り合う同一ポジションの重複のみ禁止（循環や再移動は許可）
        for (let i = 0; i < rotPositions.length - 1; i++) {
            if (rotPositions[i] === rotPositions[i + 1]) {
                alert('隣り合うポジションに同じものを指定することはできません（例: 1-1-3 は不可）。');
                return;
            }
        }
        
        details = { positions: rotPositions };
    }
    
    const newRule = {
        id: 'rule_' + Date.now(),
        type: type,
        active: false,
        details: details
    };
    
    if (!currentPattern.customSubstitutions) {
        currentPattern.customSubstitutions = [];
    }
    
    currentPattern.customSubstitutions.push(newRule);
    
    await autoSavePattern(currentPattern);
    
    initRuleFormSelects();
    renderSimulator();
    switchTab('subrules');
}

/**
 * 交代ルールの削除
 */
async function handleDeleteSubRule(ruleId) {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    currentPattern.customSubstitutions = currentPattern.customSubstitutions.filter(s => s.id !== ruleId);
    
    await autoSavePattern(currentPattern);
    
    initRuleFormSelects();
    renderSimulator();
}

// ==========================================
// タブ切り替え制御
// ==========================================
function switchTab(tabName) {
    activeTab = tabName;
    const tabSetup = document.getElementById('tab-btn-setup');
    const tabSubrules = document.getElementById('tab-btn-subrules');
    const panelSetup = document.getElementById('panel-setup');
    const panelSubrules = document.getElementById('panel-subrules');
    
    if (tabName === 'setup') {
        tabSetup.className = 'flex-1 py-2 px-3 text-center text-sm font-bold bg-amber-600 text-white transition';
        tabSubrules.className = 'flex-1 py-2 px-3 text-center text-sm font-bold bg-white text-gray-700 border-l hover:bg-gray-50 transition';
        panelSetup.classList.remove('hidden');
        panelSubrules.classList.add('hidden');
    } else {
        tabSetup.className = 'flex-1 py-2 px-3 text-center text-sm font-bold bg-white text-gray-700 transition';
        tabSubrules.className = 'flex-1 py-2 px-3 text-center text-sm font-bold bg-amber-600 text-white border-l hover:bg-gray-50 transition font-bold';
        panelSetup.classList.add('hidden');
        panelSubrules.classList.remove('hidden');
    }
}

// ==========================================
// スタメン基本配置設定の D&D / タップロジック
// ==========================================

function handleDragStart(e) {
    const playerId = e.currentTarget.getAttribute('data-player-id');
    e.dataTransfer.setData('text/plain', playerId);
    
    let source = 'bench';
    if (e.currentTarget.parentNode.id === 'sim-players-list') {
        source = 'players-list';
    }
    e.dataTransfer.setData('source-pos', source);
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    const playerId = e.dataTransfer.getData('text/plain');
    const targetPos = e.currentTarget.getAttribute('data-position');
    
    if (!playerId || !targetPos) return;
    
    assignPlayerToMasterPosition(playerId, targetPos);
}

/**
 * 選手を基本配置（スタメン）に登録する
 */
async function assignPlayerToMasterPosition(playerId, targetPos) {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    if (!currentPattern.basePositions) currentPattern.basePositions = {};
    
    let currentPosOfPlayer = null;
    Object.keys(currentPattern.basePositions).forEach(pos => {
        if (currentPattern.basePositions[pos] === playerId) {
            currentPosOfPlayer = pos;
        }
    });
    
    const previousPlayerAtTarget = currentPattern.basePositions[targetPos];
    
    if (currentPosOfPlayer) {
        currentPattern.basePositions[currentPosOfPlayer] = previousPlayerAtTarget;
        currentPattern.basePositions[targetPos] = playerId;
    } else {
        currentPattern.basePositions[targetPos] = playerId;
    }
    
    // 打順の同期
    assignDefaultBattingOrder(currentPattern);
    
    await autoSavePattern(currentPattern);
    
    selectedPlayerId = null;
    selectedSourcePos = null;
    
    initRuleFormSelects();
    renderSimulator();
}

/**
 * タップ選択時の処理
 */
function handleSelectPlayer(playerId, source) {
    if (selectedPlayerId === playerId && selectedSourcePos === source) {
        selectedPlayerId = null;
        selectedSourcePos = null;
    } else {
        selectedPlayerId = playerId;
        selectedSourcePos = source;
    }
    renderSimulator();
}

/**
 * 基本配置のグラウンド枠タップ処理
 */
async function handleFieldSlotClick(clickedPos) {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    if (!currentPattern.basePositions) currentPattern.basePositions = {};
    
    const playerAtSlot = currentPattern.basePositions[clickedPos];
    
    if (selectedPlayerId) {
        if (selectedSourcePos !== 'players-list' && selectedSourcePos !== 'bench') {
            const playerAtSource = currentPattern.basePositions[selectedSourcePos];
            
            currentPattern.basePositions[selectedSourcePos] = playerAtSlot;
            currentPattern.basePositions[clickedPos] = playerAtSource;
            
            // 打順の同期
            assignDefaultBattingOrder(currentPattern);
            
            await autoSavePattern(currentPattern);
            
            selectedPlayerId = null;
            selectedSourcePos = null;
            initRuleFormSelects();
            renderSimulator();
        } else {
            assignPlayerToMasterPosition(selectedPlayerId, clickedPos);
        }
    } else {
        if (playerAtSlot) {
            selectedPlayerId = playerAtSlot;
            selectedSourcePos = clickedPos;
            renderSimulator();
        }
    }
}

/**
 * 基本配置から選手を外す
 */
async function removePlayerFromMasterPosition(pos) {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    if (!currentPattern.basePositions) currentPattern.basePositions = {};
    
    currentPattern.basePositions[pos] = null;
    
    // 打順の同期
    assignDefaultBattingOrder(currentPattern);
    
    await autoSavePattern(currentPattern);
    
    selectedPlayerId = null;
    selectedSourcePos = null;
    
    initRuleFormSelects();
    renderSimulator();
}

// ==========================================
// 選手管理 (登録・削除)
// ==========================================

async function handleAddPlayer() {
    const input = document.getElementById('sim-new-player-input');
    const numberInput = document.getElementById('sim-new-player-number');
    if (!input) return;
    
    const name = input.value.trim();
    const number = numberInput ? numberInput.value.trim() : '';
    if (!name) return;
    
    if (players.some(p => p.name === name)) {
        alert('同じフルネームの選手が既に登録されています。');
        return;
    }
    
    const newPlayer = {
        id: 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        name: name,
        number: number
    };
    
    players.push(newPlayer);
    savePlayersToLocalStorage();
    await syncPlayerToDB(newPlayer);
    
    input.value = '';
    if (numberInput) numberInput.value = '';
    
    initRuleFormSelects();
    renderSimulator();
}

async function handleDeletePlayer(playerId) {
    const player = players.find(p => p.id === playerId);
    if (!player) return;
    
    if (!confirm(`選手「${player.name}」を削除しますか？\n（SQL/ローカルの全データ配置・交代設定からも削除されます）`)) {
        return;
    }
    
    players = players.filter(p => p.id !== playerId);
    savePlayersToLocalStorage();
    await syncPlayerToDB(player, true);
    
    for (const pat of patterns) {
        let changed = false;
        if (!pat.basePositions) pat.basePositions = {};
        
        Object.keys(pat.basePositions).forEach(pos => {
            if (pat.basePositions[pos] === playerId) {
                pat.basePositions[pos] = null;
                changed = true;
            }
        });
        
        if (pat.battingOrder) {
            Object.keys(pat.battingOrder).forEach(ord => {
                if (pat.battingOrder[ord] === playerId) {
                    delete pat.battingOrder[ord];
                    changed = true;
                }
            });
        }
        
        if (pat.customSubstitutions) {
            const beforeCount = pat.customSubstitutions.length;
            pat.customSubstitutions = pat.customSubstitutions.filter(rule => {
                if (rule.type === 'sub') {
                    return rule.details.outPlayerId !== playerId && rule.details.inPlayerId !== playerId;
                }
                return true;
            });
            if (pat.customSubstitutions.length !== beforeCount) {
                changed = true;
            }
        }
        
        if (changed) {
            await autoSavePattern(pat);
        }
    }
    
    if (selectedPlayerId === playerId) {
        selectedPlayerId = null;
        selectedSourcePos = null;
    }
    
    initRuleFormSelects();
    renderSimulator();
}

// ==========================================
// 保存データの読み込み・保存・削除
// ==========================================

async function handleSavePattern() {
    const nameInput = document.getElementById('sim-pattern-name-input');
    if (!nameInput) return;
    
    const name = nameInput.value.trim();
    if (!name) {
        alert('データ名を入力してください。');
        return;
    }
    
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (currentPattern) {
        currentPattern.name = name;
        currentPattern.mode = simulatorMode;
        
        savePatternsToLocalStorage();
        const err = await syncPatternToDB(currentPattern);
        
        updatePatternSelectOptions();
        
        if (err) {
            alert(`データ「${name}」をローカルに保存しましたが、データベースとの同期に失敗しました。\nエラー詳細: ${err.message || err}`);
        } else {
            alert(`データ「${name}」を上書き保存しました。`);
        }
    }
}

async function handleSaveAsNewPattern() {
    const nameInput = document.getElementById('sim-pattern-name-input');
    if (!nameInput) return;
    
    const name = nameInput.value.trim();
    if (!name) {
        alert('新規データ名を入力してください。');
        return;
    }
    
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    // 現在の設定情報を複製して新規作成
    const id = 'pat_' + Date.now();
    const newPat = {
        id: id,
        name: name,
        mode: simulatorMode,
        basePositions: { ...(currentPattern.basePositions || {}) },
        customSubstitutions: JSON.parse(JSON.stringify(currentPattern.customSubstitutions || [])),
        battingOrder: { ...(currentPattern.battingOrder || {}) },
        headerInfo: JSON.parse(JSON.stringify(currentPattern.headerInfo || {}))
    };
    
    patterns.push(newPat);
    currentPatternId = id;
    
    savePatternsToLocalStorage();
    const err = await syncPatternToDB(newPat);
    
    updatePatternSelectOptions();
    
    const select = document.getElementById('sim-pattern-select');
    if (select) select.value = id;
    
    if (err) {
        alert(`データ「${name}」を新規ローカル登録しましたが、データベースとの同期に失敗しました。\nエラー詳細: ${err.message || err}`);
    } else {
        alert(`データ「${name}」を新規別名で保存しました。`);
    }
    renderSimulator();
}

async function handleDeletePattern() {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    if (!confirm(`配置データ「${currentPattern.name}」を削除しますか？\n（SQL/ローカルの双方から削除されます）`)) {
        return;
    }
    
    patterns = patterns.filter(p => p.id !== currentPatternId);
    
    savePatternsToLocalStorage();
    const err = await syncPatternToDB(currentPattern, true);
    
    if (patterns.length > 0) {
        currentPatternId = patterns[0].id;
    } else {
        currentPatternId = null;
    }
    
    updatePatternSelectOptions();
    
    if (err) {
        alert(`データ「${currentPattern.name}」をローカルから削除しましたが、データベースとの同期（削除）に失敗しました。\nエラー詳細: ${err.message || err}`);
    } else {
        alert(`データ「${currentPattern.name}」を削除しました。`);
    }
    
    if (!currentPatternId) {
        await createNewPattern('デフォルト配置');
    }
    
    const select = document.getElementById('sim-pattern-select');
    if (select) select.value = currentPatternId;
    
    const nameInput = document.getElementById('sim-pattern-name-input');
    const pat = patterns.find(p => p.id === currentPatternId);
    if (nameInput && pat) nameInput.value = pat.name;
    
    selectedPlayerId = null;
    selectedSourcePos = null;
    
    updateModeUI();
    initRuleFormSelects();
    renderSimulator();
}

async function handlePatternSelectChange(e) {
    const targetId = e.target.value;
    
    if (!targetId) {
        const name = prompt('新しいデータ名を入力してください:');
        if (name === null) {
            e.target.value = currentPatternId || '';
            return;
        }
        await createNewPattern(name);
        initRuleFormSelects();
        renderSimulator();
    } else {
        currentPatternId = targetId;
        
        const pattern = patterns.find(p => p.id === currentPatternId);
        if (pattern) {
            simulatorMode = pattern.mode || 9;
            const nameInput = document.getElementById('sim-pattern-name-input');
            if (nameInput) nameInput.value = pattern.name;
        }
        
        selectedPlayerId = null;
        selectedSourcePos = null;
        
        updateModeUI();
        initRuleFormSelects();
        renderSimulator();
    }
}

// ==========================================
// メンバー表テキスト生成＆モーダル制御
// ==========================================
function handleExportMemberTable() {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    const drawPositions = getPositionsToDraw(currentPattern);
    const retiredPlayerIds = getRetiredPlayerIds(currentPattern);
    const activePositions = simulatorMode === 9 ? POSITIONS_9 : POSITIONS_DH;
    
    // モーダル入力欄の初期化（headerInfo から復元）
    const info = currentPattern.headerInfo || {};
    document.getElementById('member-input-date').value = info.date || '';
    document.getElementById('member-input-tournament').value = info.tournament || '';
    document.getElementById('member-input-team-home').value = info.teamHome || 'ありんこアントス';
    document.getElementById('member-input-team-visitor').value = info.teamVisitor || '';
    document.getElementById('member-input-manager').value = info.manager || '';
    document.getElementById('member-input-captain').value = info.captain || '';
    document.getElementById('member-input-scorer').value = info.scorer || '';
    document.getElementById('member-input-stadium').value = info.stadium || '';
    document.getElementById('member-input-time').value = info.time || '';
    
    // コピー用のテキストエリア生成
    updateMemberTextarea(currentPattern, drawPositions, retiredPlayerIds);
    
    const modal = document.getElementById('sim-member-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

/**
 * 試合詳細変更の監視と自動DB保存
 */
function handleHeaderInfoChange() {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    if (!currentPattern.headerInfo) currentPattern.headerInfo = {};
    
    currentPattern.headerInfo.date = document.getElementById('member-input-date').value.trim();
    currentPattern.headerInfo.tournament = document.getElementById('member-input-tournament').value.trim();
    currentPattern.headerInfo.teamHome = document.getElementById('member-input-team-home').value.trim();
    currentPattern.headerInfo.teamVisitor = document.getElementById('member-input-team-visitor').value.trim();
    currentPattern.headerInfo.manager = document.getElementById('member-input-manager').value.trim();
    currentPattern.headerInfo.captain = document.getElementById('member-input-captain').value.trim();
    currentPattern.headerInfo.scorer = document.getElementById('member-input-scorer').value.trim();
    currentPattern.headerInfo.stadium = document.getElementById('member-input-stadium').value.trim();
    currentPattern.headerInfo.time = document.getElementById('member-input-time').value.trim();
    
    // 保存
    autoSavePattern(currentPattern);
    
    // テキストエリア更新
    const drawPositions = getPositionsToDraw(currentPattern);
    const retiredPlayerIds = getRetiredPlayerIds(currentPattern);
    updateMemberTextarea(currentPattern, drawPositions, retiredPlayerIds);
}

function updateMemberTextarea(currentPattern, drawPositions, retiredPlayerIds) {
    const activePositions = simulatorMode === 9 ? POSITIONS_9 : POSITIONS_DH;
    const info = currentPattern.headerInfo || {};
    
    let text = `【 メンバー表 (Ants) 】\n`;
    text += `日時: ${info.date || '未設定'}  時間: ${info.time || '未設定'}\n`;
    text += `大会: ${info.tournament || '未設定'}  球場: ${info.stadium || '未設定'}\n`;
    text += `対戦: ${info.teamHome || '未設定'} vs ${info.teamVisitor || '未設定'}\n`;
    text += `監督: ${info.manager || '未設定'}  主将: ${info.captain || '未設定'}  スコアラー: ${info.scorer || '未設定'}\n`;
    text += `------------------------------------\n\n`;
    
    text += `◆ スターティングメンバー (打順順)\n`;
    
    // 打順情報が存在する場合は打順順、なければ守備位置順で出力
    const maxOrder = activePositions.length;
    const base = currentPattern.basePositions || {};
    
    // 現在スタメンの選手IDとポジションの逆引き
    const playerToPos = {};
    activePositions.forEach(pos => {
        const pId = base[pos];
        if (pId) playerToPos[pId] = pos;
    });
    
    for (let ord = 1; ord <= maxOrder; ord++) {
        const pId = currentPattern.battingOrder[ord];
        if (pId) {
            const player = players.find(p => p.id === pId);
            const pos = playerToPos[pId];
            if (player && pos) {
                const posNum = POSITION_NUMBERS[pos];
                const numText = player.number ? ` [#${player.number}]` : '';
                text += `${ord}. [${posNum}] ${POSITION_LABELS[pos]} : ${player.name}${numText}\n`;
            }
        }
    }
    
    text += `\n◆ 控え選手 (ベンチ)\n`;
    const assignedPlayerIds = new Set(Object.values(drawPositions).filter(Boolean));
    const benchPlayers = players.filter(p => !assignedPlayerIds.has(p.id) && !retiredPlayerIds.has(p.id));
    
    if (benchPlayers.length === 0) {
        text += `(なし)\n`;
    } else {
        benchPlayers.forEach(p => {
            const numText = p.number ? ` [#${p.number}]` : '';
            text += `・${p.name}${numText}\n`;
        });
    }
    
    text += `\n◆ 交代履歴\n`;
    const activeRules = (currentPattern.customSubstitutions || []).filter(s => s.active);
    if (activeRules.length === 0) {
        text += `(なし: 基本配置のままです)\n`;
    } else {
        let tempPositions = { ...(currentPattern.basePositions || {}) };
        activeRules.forEach((rule, idx) => {
            const textObj = getRuleSummaryText(rule, tempPositions, false);
            text += `${idx + 1}. [${textObj.code}] ${textObj.fullDesc}\n`;
            
            if (rule.type === 'swap') {
                const { pos1, pos2 } = rule.details;
                const temp = tempPositions[pos1];
                tempPositions[pos1] = tempPositions[pos2];
                tempPositions[pos2] = temp;
            } else if (rule.type === 'sub') {
                const { outPlayerId, inPlayerId } = rule.details;
                const posKey = Object.keys(tempPositions).find(k => tempPositions[k] === outPlayerId);
                if (posKey) tempPositions[posKey] = inPlayerId;
            } else if (rule.type === 'rotation') {
                const keys = rule.details.positions;
                const originalVals = keys.map(k => tempPositions[k]);
                for (let i = 0; i < keys.length; i++) {
                    const prevVal = originalVals[(i - 1 + keys.length) % keys.length];
                    tempPositions[keys[i]] = prevVal;
                }
            }
        });
    }
    
    const textarea = document.getElementById('sim-member-text');
    if (textarea) {
        textarea.value = text;
    }
}

function handleCopyMemberText() {
    const textarea = document.getElementById('sim-member-text');
    if (textarea) {
        textarea.select();
        document.execCommand('copy');
        alert('メンバー表をクリップボードにコピーしました！');
    }
}

function handleCloseMemberModal() {
    const modal = document.getElementById('sim-member-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// ==========================================
// 4枚綴り (A4横) 印刷画面の生成と出力
// ==========================================
function handlePrintMemberTable() {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    const drawPositions = getPositionsToDraw(currentPattern);
    const retiredPlayerIds = getRetiredPlayerIds(currentPattern);
    const activePositions = simulatorMode === 9 ? POSITIONS_9 : POSITIONS_DH;
    const info = currentPattern.headerInfo || {};
    
    // スタメン打順順のリストを取得
    const base = currentPattern.basePositions || {};
    const playerToPos = {};
    activePositions.forEach(pos => {
        const pId = base[pos];
        if (pId) playerToPos[pId] = pos;
    });
    
    const maxOrder = activePositions.length;
    const lineup = [];
    for (let ord = 1; ord <= maxOrder; ord++) {
        const pId = currentPattern.battingOrder[ord];
        if (pId) {
            const player = players.find(p => p.id === pId);
            const pos = playerToPos[pId];
            if (player && pos) {
                lineup.push({
                    order: ord,
                    posNum: POSITION_NUMBERS[pos],
                    name: player.name,
                    number: player.number || ''
                });
            }
        }
    }
    
    // もしスタメンが空なら、空き枠を埋める
    while (lineup.length < 9) {
        lineup.push({ order: lineup.length + 1, posNum: '', name: '', number: '' });
    }
    
    // 控え選手（左右2列表示用にペア化）
    const assignedPlayerIds = new Set(Object.values(drawPositions).filter(Boolean));
    const benchPlayers = players.filter(p => !assignedPlayerIds.has(p.id) && !retiredPlayerIds.has(p.id));
    
    const benchPairs = [];
    // 10行(合計20枠)程度作っておき、手書き用の空行を確保
    for (let i = 0; i < 9; i++) {
        const leftIdx = i * 2;
        const rightIdx = i * 2 + 1;
        const leftPlayer = benchPlayers[leftIdx];
        const rightPlayer = benchPlayers[rightIdx];
        
        benchPairs.push({
            leftName: leftPlayer ? leftPlayer.name : '',
            leftNumber: leftPlayer ? (leftPlayer.number || '') : '',
            rightName: rightPlayer ? rightPlayer.name : '',
            rightNumber: rightPlayer ? (rightPlayer.number || '') : ''
        });
    }
    
    // HTML構築
    let cardsHtml = '';
    for (let sheet = 1; sheet <= 4; sheet++) {
        // 各カード（1/4 〜 4/4）
        let lineupRows = '';
        lineup.forEach(item => {
            lineupRows += `
                <tr>
                    <td class="cell-order">${item.order}</td>
                    <td class="cell-pos">${item.posNum}</td>
                    <td class="cell-name">${escapeHTML(item.name)}</td>
                    <td class="cell-number">${item.number}</td>
                </tr>
            `;
        });
        // もしDHありで10行なら、さらにもう1行追加
        if (simulatorMode === 10 && lineup.length < 10) {
            lineupRows += `<tr><td class="cell-order">10</td><td class="cell-pos"></td><td class="cell-name"></td><td class="cell-number"></td></tr>`;
        }
        // 足りない枠がある場合の予備空行(通常9行+2行のバッファ、合計11行にしておく)
        const totalRowsNeeded = simulatorMode === 10 ? 11 : 10;
        const currentCount = lineup.length;
        for (let j = currentCount; j < totalRowsNeeded; j++) {
            lineupRows += `<tr><td class="cell-order"></td><td class="cell-pos"></td><td class="cell-name"></td><td class="cell-number"></td></tr>`;
        }
        
        // 控え選手行
        let benchRows = '';
        benchPairs.forEach(pair => {
            benchRows += `
                <tr>
                    <td class="cell-bench-name">${escapeHTML(pair.leftName)}</td>
                    <td class="cell-bench-num">${pair.leftNumber}</td>
                    <td class="cell-bench-name">${escapeHTML(pair.rightName)}</td>
                    <td class="cell-bench-num">${pair.rightNumber}</td>
                </tr>
            `;
        });
        
        cardsHtml += `
            <div class="sheet-card">
                <div class="card-page-idx">(${sheet}/4)</div>
                <div class="card-title">メンバー表</div>
                
                <div class="header-table-wrapper">
                    <table class="table-header">
                        <tr>
                            <td colspan="3" class="cell-date font-variable">${escapeHTML(info.date || '')}</td>
                            <td class="cell-tournament-label">大会名</td>
                            <td class="cell-tournament font-variable">${escapeHTML(info.tournament || '')}</td>
                        </tr>
                        <tr>
                            <td class="cell-team-label-l">チーム</td>
                            <td class="cell-team font-variable">${escapeHTML(info.teamHome || '')}</td>
                            <td class="cell-vs">対</td>
                            <td class="cell-team-label-r text-[8px] font-normal leading-none" style="font-size: 7px; padding: 2px 0;">相手<br>チーム</td>
                            <td class="cell-team font-variable">${escapeHTML(info.teamVisitor || '')}</td>
                        </tr>
                    </table>
                </div>
                
                <table class="table-lineup">
                    <thead>
                        <tr>
                            <th style="width: 13%;">打順</th>
                            <th style="width: 15%; line-height: 1.1;">守備<br>位置</th>
                            <th style="width: 54%;">選手名</th>
                            <th style="width: 18%;">背番号</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${lineupRows}
                    </tbody>
                </table>
                
                <div class="bench-section-label">控え選手</div>
                <table class="table-bench">
                    <thead>
                        <tr>
                            <th style="width: 37%;">選手名</th>
                            <th style="width: 13%;">背番号</th>
                            <th style="width: 37%;">選手名</th>
                            <th style="width: 13%;">背番号</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${benchRows}
                    </tbody>
                </table>
                
                <table class="table-footer">
                    <tr>
                        <td class="footer-label">監督</td>
                        <td class="footer-val font-variable">${escapeHTML(info.manager || '')}</td>
                        <td class="footer-label">主将</td>
                        <td class="footer-val font-variable">${escapeHTML(info.captain || '')}</td>
                        <td class="footer-label font-sans leading-none text-[7px]" style="font-size: 6.5px; padding: 0;">スコ<br>アラー</td>
                        <td class="footer-val font-variable">${escapeHTML(info.scorer || '')}</td>
                    </tr>
                    <tr>
                        <td class="footer-label">球場</td>
                        <td colspan="3" class="footer-val font-variable">${escapeHTML(info.stadium || '')}</td>
                        <td class="footer-label">時間</td>
                        <td class="footer-val font-variable">${escapeHTML(info.time || '')}</td>
                    </tr>
                </table>
            </div>
        `;
    }
    
    // 印刷ウィンドウを開く
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        alert('ポップアップブロックが有効になっているため、印刷用画面を開けませんでした。許可してください。');
        return;
    }
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>印刷用メンバー表 (4枚綴り)</title>
            <meta charset="utf-8">
            <style>
                @page {
                    size: A4 landscape;
                    margin: 0;
                }
                body {
                    margin: 0;
                    padding: 0;
                    font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Segoe UI", sans-serif;
                    background-color: #fff;
                    -webkit-print-color-adjust: exact;
                }
                .print-container {
                    width: 297mm;
                    height: 210mm;
                    box-sizing: border-box;
                    padding: 3mm 4mm;
                    display: flex;
                    justify-content: space-between;
                }
                .sheet-card {
                    width: 68mm;
                    height: 204mm;
                    box-sizing: border-box;
                    /* 一番外側の外枠は不要のためborder削除 */
                    border: none;
                    padding: 2mm 3.5mm;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                }
                /* カット用の境界点線 (隣のカードとの間) */
                .sheet-card:not(:last-child) {
                    position: relative;
                }
                /* カット用点線ガイド（印刷用紙の外側） */
                .sheet-card:not(:last-child)::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    right: -4mm;
                    width: 1px;
                    height: 204mm;
                    border-right: 1px dashed #777;
                }
                .card-page-idx {
                    position: absolute;
                    top: 1.5mm;
                    right: 2.5mm;
                    font-size: 8px;
                    font-family: "Helvetica Neue", Arial, sans-serif;
                    color: #555;
                    font-weight: bold;
                }
                .card-title {
                    text-align: center;
                    font-size: 17px;
                    font-weight: bold;
                    letter-spacing: 2px;
                    margin-bottom: 2mm;
                    margin-top: 1mm;
                    text-decoration: underline;
                    text-underline-offset: 3px;
                    font-family: "Helvetica Neue", Arial, sans-serif;
                }
                .header-table-wrapper {
                    margin-bottom: 1.5mm;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 9px;
                    table-layout: fixed;
                }
                th, td {
                    border: 1px solid #333;
                    text-align: center;
                    vertical-align: middle;
                    height: 5.2mm;
                    box-sizing: border-box;
                }
                
                /* フォントファミリーの差別化（固定値：ゴシック体、可変値：明朝体） */
                th, .card-title, .bench-section-label, .cell-tournament-label, 
                .cell-team-label-l, .cell-team-label-r, .cell-vs, .footer-label {
                    font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", sans-serif;
                    font-weight: bold;
                }
                .font-variable, .cell-date, .cell-tournament, .cell-team, 
                .cell-name, .cell-bench-name, .footer-val {
                    font-family: "MS Mincho", "Hiragino Mincho ProN", "MS PMincho", Georgia, serif;
                    font-weight: bold;
                }
                .cell-order, .cell-number, .cell-bench-num {
                    font-family: "Helvetica Neue", Arial, sans-serif;
                    font-weight: bold;
                }

                /* ヘッダーテーブル */
                .table-header {
                    font-size: 8px;
                }
                .table-header td {
                    height: 5.0mm;
                    padding: 0 2px;
                }
                .cell-date {
                    width: 48%;
                    font-size: 7.5px;
                }
                .cell-tournament-label {
                    width: 12%;
                    background-color: #f2f2f2;
                    font-weight: bold;
                }
                .cell-tournament {
                    width: 40%;
                    font-size: 7.5px;
                    text-align: left;
                    padding-left: 2px;
                    white-space: normal;
                    word-break: break-all;
                    line-height: 1.1;
                }
                .cell-team-label-l, .cell-team-label-r {
                    width: 12%;
                    background-color: #f2f2f2;
                    font-weight: bold;
                }
                .cell-team {
                    width: 36%;
                    font-size: 8.5px;
                    white-space: normal;
                    word-break: break-all;
                    line-height: 1.1;
                }
                .cell-vs {
                    width: 4%;
                    font-weight: bold;
                    font-size: 7px;
                    background-color: #f9f9f9;
                }
                
                /* スタメンテーブル */
                .table-lineup {
                    margin-bottom: 1.5mm;
                }
                .table-lineup th {
                    background-color: #f2f2f2;
                    font-weight: bold;
                    font-size: 8.5px;
                    height: 5.2mm;
                }
                .table-lineup td {
                    height: 6.2mm;
                }
                .cell-order {
                    font-size: 11px;
                }
                .cell-pos {
                    font-size: 10px;
                }
                .cell-name {
                    font-size: 11.5px;
                }
                .cell-number {
                    font-size: 11px;
                }
                
                /* 控え選手 */
                .bench-section-label {
                    font-size: 8.5px;
                    font-weight: bold;
                    background-color: #e5e5e5;
                    border: 1px solid #333;
                    border-bottom: none;
                    text-align: center;
                    height: 4mm;
                    line-height: 4mm;
                    box-sizing: border-box;
                }
                .table-bench {
                    margin-bottom: 1.5mm;
                }
                .table-bench th {
                    background-color: #f2f2f2;
                    font-size: 7px;
                    height: 3.5mm;
                    font-weight: bold;
                }
                .table-bench td {
                    height: 5.6mm;
                    font-size: 8.5px;
                }
                .cell-bench-name {
                    text-align: center;
                    font-size: 9.5px;
                    padding: 0 1px;
                    white-space: normal;
                    word-break: break-all;
                    line-height: 1.1;
                }
                .cell-bench-num {
                    font-size: 8.5px;
                }
                
                /* フッターテーブル */
                .table-footer {
                    font-size: 8px;
                }
                .table-footer td {
                    height: 4.8mm;
                }
                .footer-label {
                    width: 14%;
                    background-color: #f2f2f2;
                    font-weight: bold;
                }
                .footer-val {
                    width: 19%;
                    font-size: 8.5px;
                    white-space: normal;
                    word-break: break-all;
                    line-height: 1.1;
                }
                
                /* 印刷時の設定 */
                @media print {
                    .sheet-card::after {
                        border-right-color: #000;
                    }
                }
            </style>
        </head>
        <body>
            <div class="print-container">
                ${cardsHtml}
            </div>
            <script>
                // 読み込み完了後に自動的に印刷ダイアログを表示
                window.onload = function() {
                    setTimeout(function() {
                        window.print();
                    }, 500);
                };
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// ==========================================
// JSON インポート/エクスポート
// ==========================================

function handleExportJSON() {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    const exportData = {
        version: 'ants-sim-3.0',
        players: players,
        pattern: currentPattern
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ants_positions_${currentPattern.name.replace(/[\s/\\?%*:|"<>\.]/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function handleImportJSON(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async function(evt) {
        try {
            const data = JSON.parse(evt.target.result);
            if (data.version !== 'ants-sim-3.0' && data.version !== 'ants-sim-2.0' && data.version !== 'ants-sim-1.0') {
                alert('ファイル形式が正しくありません。');
                return;
            }
            
            if (confirm('インポートを実行しますか？\n※既存の選手リストと配置データがマージ/追加されます。')) {
                for (const newP of data.players) {
                    if (!players.some(p => p.id === newP.id || p.name === newP.name)) {
                        players.push(newP);
                        await syncPlayerToDB(newP);
                    }
                }
                savePlayersToLocalStorage();
                
                if (data.version === 'ants-sim-3.0') {
                    const newPat = data.pattern;
                    newPat.id = 'pat_' + Date.now();
                    newPat.name = newPat.name + ' (インポート)';
                    patterns.push(newPat);
                    currentPatternId = newPat.id;
                    simulatorMode = newPat.mode;
                    await autoSavePattern(newPat);
                } else if (data.version === 'ants-sim-2.0') {
                    const newPat = data.pattern;
                    newPat.id = 'pat_' + Date.now();
                    newPat.name = newPat.name + ' (インポート)';
                    newPat.mode = newPat.mode || 9;
                    newPat.battingOrder = {};
                    newPat.headerInfo = {};
                    patterns.push(newPat);
                    currentPatternId = newPat.id;
                    simulatorMode = newPat.mode;
                    await autoSavePattern(newPat);
                } else {
                    const oldPat = data.pattern;
                    const baseInning = oldPat.innings && oldPat.innings[0] ? oldPat.innings[0].positions : {};
                    
                    const newPat = {
                        id: 'pat_' + Date.now(),
                        name: oldPat.name + ' (旧移行)',
                        mode: oldPat.mode || 9,
                        basePositions: baseInning,
                        customSubstitutions: [],
                        battingOrder: {},
                        headerInfo: {}
                    };
                    patterns.push(newPat);
                    currentPatternId = newPat.id;
                    simulatorMode = newPat.mode;
                    await autoSavePattern(newPat);
                }
                
                updateModeUI();
                initRuleFormSelects();
                renderSimulator();
                alert('インポートが完了しました。');
            }
        } catch (err) {
            console.error(err);
            alert('ファイルの読み込みに失敗しました。');
        }
        e.target.value = '';
    };
    reader.readAsText(file);
}

// ==========================================
// イベントリスナー設定
// ==========================================
function setupEventListeners() {
    // タブ制御
    document.getElementById('tab-btn-setup')?.addEventListener('click', () => switchTab('setup'));
    document.getElementById('tab-btn-subrules')?.addEventListener('click', () => switchTab('subrules'));
    
    // 交代種別切り替え
    document.getElementById('rule-type-select')?.addEventListener('change', (e) => {
        const val = e.target.value;
        document.getElementById('form-sub').classList.add('hidden');
        document.getElementById('form-rotation').classList.add('hidden');
        
        if (val === 'sub') document.getElementById('form-sub').classList.remove('hidden');
        else if (val === 'rotation') document.getElementById('form-rotation').classList.remove('hidden');
    });
    
    // メンバー表モーダルイベント
    document.getElementById('btn-export-member-table')?.addEventListener('click', handleExportMemberTable);
    document.getElementById('btn-copy-member-text')?.addEventListener('click', handleCopyMemberText);
    document.getElementById('btn-close-member-modal')?.addEventListener('click', handleCloseMemberModal);
    document.getElementById('btn-close-member-modal-footer')?.addEventListener('click', handleCloseMemberModal);
    document.getElementById('btn-print-member-table')?.addEventListener('click', handlePrintMemberTable);
    
    // 試合情報入力の自動セーブ登録
    const headerInputs = [
        'member-input-date', 'member-input-tournament', 'member-input-team-home', 'member-input-team-visitor',
        'member-input-manager', 'member-input-captain', 'member-input-scorer', 'member-input-stadium', 'member-input-time'
    ];
    headerInputs.forEach(id => {
        document.getElementById(id)?.addEventListener('input', handleHeaderInfoChange);
    });
    
    // 交代ルール追加実行
    document.getElementById('btn-create-sub-rule')?.addEventListener('click', handleCreateSubRule);
    
    // 選手追加
    document.getElementById('btn-add-sim-player')?.addEventListener('click', handleAddPlayer);
    document.getElementById('sim-new-player-input')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAddPlayer();
    });
    document.getElementById('sim-new-player-number')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAddPlayer();
    });
    
    // パターン操作
    document.getElementById('sim-pattern-select')?.addEventListener('change', handlePatternSelectChange);
    document.getElementById('btn-save-sim-pattern')?.addEventListener('click', handleSavePattern);
    document.getElementById('btn-save-as-new-pattern')?.addEventListener('click', handleSaveAsNewPattern);
    document.getElementById('btn-delete-sim-pattern')?.addEventListener('click', handleDeletePattern);
    
    // モード切替
    document.getElementById('btn-sim-mode-9')?.addEventListener('click', async () => {
        if (simulatorMode !== 9) {
            simulatorMode = 9;
            updateModeUI();
            const pat = patterns.find(p => p.id === currentPatternId);
            if (pat) {
                pat.mode = 9;
                assignDefaultBattingOrder(pat);
                await autoSavePattern(pat);
            }
            initRuleFormSelects();
            renderSimulator();
        }
    });
    
    document.getElementById('btn-sim-mode-10')?.addEventListener('click', async () => {
        if (simulatorMode !== 10) {
            simulatorMode = 10;
            updateModeUI();
            const pat = patterns.find(p => p.id === currentPatternId);
            if (pat) {
                pat.mode = 10;
                assignDefaultBattingOrder(pat);
                await autoSavePattern(pat);
            }
            initRuleFormSelects();
            renderSimulator();
        }
    });
    
    // JSON操作
    document.getElementById('btn-export-sim')?.addEventListener('click', handleExportJSON);
    document.getElementById('import-sim-input')?.addEventListener('change', handleImportJSON);
    
    // 戻る/ログアウト
    document.getElementById('btn-back-to-menu-sim')?.addEventListener('click', () => {
        selectedPlayerId = null;
        selectedSourcePos = null;
        switchAuthScreen('app-menu-view');
    });
    
    document.getElementById('btn-logout-sim')?.addEventListener('click', () => {
        document.getElementById('btn-logout')?.click();
    });
    
    // ベンチ背景タップでスタメン解除
    document.getElementById('sim-bench-list')?.addEventListener('click', (e) => {
        if (e.target.id === 'sim-bench-list' && selectedPlayerId && selectedSourcePos !== 'players-list' && selectedSourcePos !== 'bench') {
            removePlayerFromMasterPosition(selectedSourcePos);
        }
    });
}

function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag] || tag));
}
