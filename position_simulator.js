// ==========================================
// ANTS_BB ポジションシミュレーター
// ==========================================

import { switchAuthScreen } from './main.js';

// 状態管理
let players = []; // { id, name }
let patterns = []; // { id, name, mode, basePositions: { p: playerId, ... }, customSubstitutions: [{ id, type, active, details }] }
let currentPatternId = null;
let activeTab = 'setup'; // 'setup' or 'subrules'
let selectedPlayerId = null; // タップ選択用 (選手リストまたはグラウンド上のスロット)
let selectedSourcePos = null; // タップ選択の移動元
let simulatorMode = 9; // 9人制または10人制

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
    lcf: '左中堅',
    rcf: '右中堅'
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
    lcf: '10',
    rcf: '11'
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
    '10': 'lcf',
    '11': 'rcf'
};

const POSITIONS_9 = ['p', 'c', '1b', '2b', '3b', 'ss', 'lf', 'cf', 'rf'];
const POSITIONS_10 = ['p', 'c', '1b', '2b', '3b', 'ss', 'lf', 'lcf', 'rcf', 'rf'];

// LocalStorage キー
const STORAGE_PLAYERS_KEY = 'ants_sim_players';
const STORAGE_PATTERNS_KEY = 'ants_sim_patterns';

/**
 * 初期化関数
 */
export function initPositionSimulator() {
    loadFromLocalStorage();
    setupEventListeners();
    
    if (patterns.length > 0) {
        currentPatternId = patterns[0].id;
        const select = document.getElementById('sim-pattern-select');
        if (select) select.value = currentPatternId;
        const pattern = patterns.find(p => p.id === currentPatternId);
        if (pattern) {
            simulatorMode = pattern.mode || 9;
        }
    } else {
        createNewPattern();
    }
    
    updateModeUI();
    switchTab('setup');
    initRuleFormSelects();
    renderSimulator();
}

/**
 * LocalStorage からデータをロード
 */
function loadFromLocalStorage() {
    try {
        const storedPlayers = localStorage.getItem(STORAGE_PLAYERS_KEY);
        if (storedPlayers) {
            players = JSON.parse(storedPlayers);
        } else {
            // 初期選手データ (サンプル)
            players = [
                { id: 'p1', name: 'とあ' },
                { id: 'p2', name: 'そうま' },
                { id: 'p3', name: 'あきと' },
                { id: 'p4', name: 'ゆうき' },
                { id: 'p5', name: 'あいのすけ' },
                { id: 'p6', name: 'けんせい' },
                { id: 'p7', name: 'りゅうと' },
                { id: 'p8', name: 'ながまさ' },
                { id: 'p9', name: 'そうすけ' },
                { id: 'p10', name: 'かーくん' },
                { id: 'p11', name: 'たいち' },
                { id: 'p12', name: 'れお' },
                { id: 'p13', name: 'たもつ' }
            ];
            savePlayersToLocalStorage();
        }
        
        const storedPatterns = localStorage.getItem(STORAGE_PATTERNS_KEY);
        if (storedPatterns) {
            patterns = JSON.parse(storedPatterns);
            // 旧イニング形式から新規モジュール型配置への自動移行（マイグレーション）
            patterns.forEach(pat => {
                if (!pat.basePositions) {
                    if (pat.innings && pat.innings[0]) {
                        pat.basePositions = pat.innings[0].positions || {};
                    } else {
                        pat.basePositions = {};
                    }
                }
                if (!pat.customSubstitutions) {
                    pat.customSubstitutions = [];
                }
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
 * 新規パターン (保存データ) の作成
 */
function createNewPattern(name = '') {
    const id = 'pat_' + Date.now();
    const newPat = {
        id: id,
        name: name || '新規データ',
        mode: simulatorMode,
        basePositions: {}, // ポジションキー: 選手ID (基本スタメン)
        customSubstitutions: [] // 交代イベントのリスト
    };
    patterns.push(newPat);
    currentPatternId = id;
    savePatternsToLocalStorage();
    updatePatternSelectOptions();
    
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
        option.textContent = p.name;
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
    const activePositions = simulatorMode === 9 ? POSITIONS_9 : POSITIONS_10;
    
    // 現在のモードで使用するポジションのみに制限
    Object.keys(currentPositions).forEach(k => {
        if (!activePositions.includes(k)) {
            delete currentPositions[k];
        }
    });
    
    // 有効な交代ルールを順次適用
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
            // モードで有効なポジションのみ処理
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
 * 有効な 選手交代 (sub) ルールで 'outPlayerId' になっている選手
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
 * 全体レンダリング
 */
function renderSimulator() {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    // 交代適用後のポジション算出
    const drawPositions = getPositionsToDraw(currentPattern);
    const retiredPlayerIds = getRetiredPlayerIds(currentPattern);
    
    // 1. 配置済み選手IDのリスト (グラウンドに立っている選手)
    const assignedPlayerIds = new Set(Object.values(drawPositions).filter(Boolean));
    
    // 2. 選手リストの描画
    renderPlayersList(assignedPlayerIds, retiredPlayerIds);
    
    // 3. ベンチ（控え選手）の描画
    renderBenchList(assignedPlayerIds, retiredPlayerIds);
    
    // 4. グラウンドポジションスロットの描画
    renderFieldPositions(drawPositions, currentPattern);
    
    // 5. 交代ルールリストの描画
    renderSubRulesList(currentPattern);
    
    // 6. アナウンスログの描画
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
        
        badge.innerHTML = `
            <span>${escapeHTML(player.name)}${isRetired ? ' (交代済)' : ''}</span>
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
    
    // 現在フィールドに立っておらず、かつ交代で退いてもいない選手
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
        
        badge.innerHTML = `<span>${escapeHTML(player.name)}</span>`;
        
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
    
    const activePositions = simulatorMode === 9 ? POSITIONS_9 : POSITIONS_10;
    
    activePositions.forEach(pos => {
        const playerId = drawPositions[pos];
        const player = players.find(p => p.id === playerId);
        
        // 交代適用によって基本スタメンから変更されているかをチェック
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
        
        slot.innerHTML = `
            <div class="sim-pos-title">${POSITION_LABELS[pos]}</div>
            <div class="sim-pos-player ${isChanged ? 'player-changed' : ''}">
                ${player ? escapeHTML(player.name) : '<span class="text-gray-300 text-xs font-normal">未配置</span>'}
            </div>
        `;
        
        container.appendChild(slot);
    });
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
    
    const activePositions = simulatorMode === 9 ? POSITIONS_9 : POSITIONS_10;
    let tempPositions = { ...(pattern.basePositions || {}) };
    
    rules.forEach(rule => {
        // カードのテキスト用に、このルールが適用される時点（またはその直前）の tempPositions を渡す
        const title = getRuleSummaryText(rule, tempPositions, true);
        
        // もしこのルールが有効なら、tempPositions を更新して次のルールの状態にする
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
    
    const activePositions = simulatorMode === 9 ? POSITIONS_9 : POSITIONS_10;
    let tempPositions = { ...(pattern.basePositions || {}) };
    
    activeRules.forEach(rule => {
        // 直前状態の tempPositions を渡してテキストを取得
        const textObj = getRuleSummaryText(rule, tempPositions, false);
        
        // tempPositions を更新
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

/**
 * 交代ルールをアナウンス風テキストにパースする
 */
function getRuleSummaryText(rule, tempPositions, shortVersion = false) {
    const base = tempPositions || {};
    
    if (rule.type === 'swap') {
        const { pos1, pos2 } = rule.details;
        const num1 = POSITION_NUMBERS[pos1] || '?';
        const num2 = POSITION_NUMBERS[pos2] || '?';
        
        const p1Id = base[pos1];
        const p2Id = base[pos2];
        const name1 = players.find(p => p.id === p1Id)?.name || '未配置';
        const name2 = players.find(p => p.id === p2Id)?.name || '未配置';
        
        return {
            code: `${num1}-${num2}-${num1}`,
            desc: `${POSITION_LABELS[pos1]}(${escapeHTML(name1)}) ⇔ ${POSITION_LABELS[pos2]}(${escapeHTML(name2)})`,
            fullDesc: `${POSITION_LABELS[pos1]}の${escapeHTML(name1)}が${POSITION_LABELS[pos2]}、${POSITION_LABELS[pos2]}の${escapeHTML(name2)}が${POSITION_LABELS[pos1]}`
        };
    } else if (rule.type === 'sub') {
        const { outPlayerId, inPlayerId, pos } = rule.details;
        
        // outPlayerId がその時点で守っているポジションを特定
        let detectedPos = null;
        if (outPlayerId) {
            detectedPos = Object.keys(base).find(k => base[k] === outPlayerId);
        }
        // 旧データ互換
        if (!detectedPos && pos) {
            detectedPos = pos;
        }
        
        const num = detectedPos ? POSITION_NUMBERS[detectedPos] : '?';
        const posLabel = detectedPos ? POSITION_LABELS[detectedPos] : '守備';
        
        const outName = players.find(p => p.id === outPlayerId)?.name || '未配置';
        const inName = players.find(p => p.id === inPlayerId)?.name || '交代選手';
        
        return {
            code: `${num}`,
            desc: `${posLabel}(${escapeHTML(outName)}) ➔ ${escapeHTML(inName)}`,
            fullDesc: `${posLabel}の${escapeHTML(outName)}に代わって、${escapeHTML(inName)}が${posLabel}`
        };
    } else if (rule.type === 'rotation') {
        const keys = rule.details.positions;
        const numbers = keys.map(k => POSITION_NUMBERS[k] || '?');
        const numCode = [...numbers, numbers[0]].join('-'); // 例: 1-4-5-1
        
        const names = keys.map(k => {
            const pId = base[k];
            return players.find(p => p.id === pId)?.name || '未配置';
        });
        
        // 概要テキスト
        const descChain = keys.map((k, i) => `${POSITION_LABELS[k]}(${escapeHTML(names[i])})`).join(' ➔ ');
        
        // アナウンス風詳細テキスト
        const announcementChain = keys.map((k, i) => {
            const nextKey = keys[(i + 1) % keys.length];
            return `${POSITION_LABELS[k]}の${escapeHTML(names[i])}が${POSITION_LABELS[nextKey]}`;
        }).join('、');
        
        return {
            code: numCode,
            desc: descChain,
            fullDesc: announcementChain
        };
    }
    
    return { code: '?', desc: '不明な交代', fullDesc: '不明な交代' };
}

// ==========================================
// 交代作成フォームのセレクトボックス初期化
// ==========================================
function initRuleFormSelects() {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    const activePositions = simulatorMode === 9 ? POSITIONS_9 : POSITIONS_10;
    const base = currentPattern.basePositions || {};
    
    const subPlayerOut = document.getElementById('sub-player-out');
    const subPlayerIn = document.getElementById('sub-player-in');
    
    // その時点の交代適用後の配置を取得
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
        // 現在グラウンドに立っておらず、退いてもいない選手
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
    
    // ポジション交代テキストのクリア
    const rotInput = document.getElementById('rot-input-text');
    if (rotInput) {
        rotInput.value = '';
    }
}

// ==========================================
// 交代の適用・解除ロジック & 競合チェック
// ==========================================

/**
 * 交代ルール適用時の競合チェック
 * 有効にしようとするルールが、既に有効な他のルールと衝突（同じ選手またはポジションを重複変更）しないか確認する
 */
function handleToggleSubRule(ruleId, active) {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    const rule = currentPattern.customSubstitutions.find(s => s.id === ruleId);
    if (!rule) return;
    
    if (active) {
        // 競合チェックを実行
        const conflict = checkSubstitutionConflict(rule, currentPattern);
        if (conflict) {
            alert(`適用エラー: 他の有効な交代と競合するため適用できません。\n理由: ${conflict}`);
            // トグルをOFFに戻す
            renderSimulator();
            return;
        }
    }
    
    rule.active = active;
    savePatternsToLocalStorage();
    initRuleFormSelects(); // 交代可能選手のリストアップに影響があるため再構築
    renderSimulator();
}

/**
 * 競合検出のコアロジック
 */
function checkSubstitutionConflict(newRule, pattern) {
    const activeRules = (pattern.customSubstitutions || []).filter(s => s.active && s.id !== newRule.id);
    
    // 1. ポジション交代（rotation）同士のポジション重複チェック
    // 同じポジションが複数の有効なポジション交代ルールに登場する場合、適用順序の競合を避けるためエラーとする
    if (newRule.type === 'rotation') {
        const newPositions = new Set(newRule.details.positions);
        for (const activeRule of activeRules) {
            if (activeRule.type === 'rotation') {
                const activePositions = activeRule.details.positions;
                for (const pos of activePositions) {
                    if (newPositions.has(pos)) {
                        return `ポジション交代「${POSITION_LABELS[pos]}」が既に他の有効なポジション交代に含まれています。`;
                    }
                }
            }
        }
    }
    
    // 2. 選手交代（sub）同士の選手重複チェック
    // 選手交代に関わる選手のみをチェックする。ポジション交代で移動する選手は除外する
    const newInPlayers = new Set();
    const newOutPlayers = new Set();
    
    if (newRule.type === 'sub') {
        if (newRule.details.inPlayerId) newInPlayers.add(newRule.details.inPlayerId);
        if (newRule.details.outPlayerId) newOutPlayers.add(newRule.details.outPlayerId);
    }
    
    for (const activeRule of activeRules) {
        if (activeRule.type !== 'sub') continue; // 選手交代同士のみチェック
        
        const activeInPlayerId = activeRule.details.inPlayerId;
        const activeOutPlayerId = activeRule.details.outPlayerId;
        
        // A. 同じ選手が二重にグラウンドに入る(inPlayerId)チェック
        for (const pId of newInPlayers) {
            if (activeInPlayerId === pId) {
                const name = players.find(p => p.id === pId)?.name || '選手';
                return `選手「${name}」は、既に他の有効な交代でグラウンドに入ることになっています。`;
            }
        }
        
        // B. 同じ選手が二重に退場する(outPlayerId)チェック
        for (const pId of newOutPlayers) {
            if (activeOutPlayerId === pId) {
                const name = players.find(p => p.id === pId)?.name || '選手';
                return `選手「${name}」は、既に他の有効な交代で退くことになっています。`;
            }
        }
    }
    
    return null; // 競合なし
}

/**
 * 交代ルールの新規作成
 */
function handleCreateSubRule() {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    const typeSelect = document.getElementById('rule-type-select');
    const type = typeSelect ? typeSelect.value : 'swap';
    
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
        
        // 半角数字とハイフンのみかチェック
        if (!/^\d+(-\d+)*$/.test(text)) {
            alert('入力形式が正しくありません。半角数字とハイフンで入力してください（例: 1-3-1）。');
            return;
        }
        
        const nums = text.split('-').filter(Boolean);
        
        if (nums.length < 2) {
            alert('交代には最低2つのポジションが必要です（例: 1-3）。');
            return;
        }
        
        // 最初と最後が同じであれば、末尾をカットして循環を表す
        if (nums.length > 2 && nums[0] === nums[nums.length - 1]) {
            nums.pop();
        }
        
        const activePositions = simulatorMode === 9 ? POSITIONS_9 : POSITIONS_10;
        
        // ポジションキーへの変換とバリデーション
        const rotPositions = [];
        for (const num of nums) {
            const posKey = NUMBER_TO_POSITION[num];
            if (!posKey) {
                alert(`無効なポジション番号「${num}」が含まれています。1〜11の範囲で指定してください。`);
                return;
            }
            if (!activePositions.includes(posKey)) {
                alert(`ポジション番号「${num}」(${POSITION_LABELS[posKey] || posKey})は、現在の守備人数（${simulatorMode}人制）では使用できません。`);
                return;
            }
            rotPositions.push(posKey);
        }
        
        // ポジションの重複チェック
        const uniquePos = new Set(rotPositions);
        if (uniquePos.size !== rotPositions.length) {
            alert('交代ルート内で同じポジションを重複して指定することはできません（例: 1-3-3-1 は無効）。');
            return;
        }
        
        details = { positions: rotPositions };
    }
    
    const newRule = {
        id: 'rule_' + Date.now(),
        type: type,
        active: false, // 初期はOFF状態で追加
        details: details
    };
    
    if (!currentPattern.customSubstitutions) {
        currentPattern.customSubstitutions = [];
    }
    
    currentPattern.customSubstitutions.push(newRule);
    savePatternsToLocalStorage();
    
    // フォームとUIの更新
    initRuleFormSelects();
    renderSimulator();
    
    // 交代ルール管理タブの表示に切り替え
    switchTab('subrules');
}

/**
 * 交代ルールの削除
 */
function handleDeleteSubRule(ruleId) {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    currentPattern.customSubstitutions = currentPattern.customSubstitutions.filter(s => s.id !== ruleId);
    savePatternsToLocalStorage();
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
function assignPlayerToMasterPosition(playerId, targetPos) {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    if (!currentPattern.basePositions) currentPattern.basePositions = {};
    
    // 基本配置の設定はスタメン決定であるため、交代ルールに影響しないようにする
    let currentPosOfPlayer = null;
    Object.keys(currentPattern.basePositions).forEach(pos => {
        if (currentPattern.basePositions[pos] === playerId) {
            currentPosOfPlayer = pos;
        }
    });
    
    const previousPlayerAtTarget = currentPattern.basePositions[targetPos];
    
    if (currentPosOfPlayer) {
        // スタメン内の移動 (スワップ)
        currentPattern.basePositions[currentPosOfPlayer] = previousPlayerAtTarget;
        currentPattern.basePositions[targetPos] = playerId;
    } else {
        // 新規スタメン配置
        currentPattern.basePositions[targetPos] = playerId;
    }
    
    savePatternsToLocalStorage();
    
    selectedPlayerId = null;
    selectedSourcePos = null;
    
    initRuleFormSelects(); // 選択可能な交代対象を更新するためにリビルド
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
function handleFieldSlotClick(clickedPos) {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    if (!currentPattern.basePositions) currentPattern.basePositions = {};
    
    const playerAtSlot = currentPattern.basePositions[clickedPos];
    
    if (selectedPlayerId) {
        if (selectedSourcePos !== 'players-list' && selectedSourcePos !== 'bench') {
            // グラウンド内でのスワップ
            const playerAtSource = currentPattern.basePositions[selectedSourcePos];
            
            currentPattern.basePositions[selectedSourcePos] = playerAtSlot;
            currentPattern.basePositions[clickedPos] = playerAtSource;
            
            savePatternsToLocalStorage();
            selectedPlayerId = null;
            selectedSourcePos = null;
            initRuleFormSelects();
            renderSimulator();
        } else {
            // 新規配置
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
function removePlayerFromMasterPosition(pos) {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    if (!currentPattern.basePositions) currentPattern.basePositions = {};
    
    currentPattern.basePositions[pos] = null;
    savePatternsToLocalStorage();
    selectedPlayerId = null;
    selectedSourcePos = null;
    
    initRuleFormSelects();
    renderSimulator();
}

// ==========================================
// 選手管理 (登録・削除)
// ==========================================

function handleAddPlayer() {
    const input = document.getElementById('sim-new-player-input');
    if (!input) return;
    
    const name = input.value.trim();
    if (!name) return;
    
    if (players.some(p => p.name === name)) {
        alert('同じ名前の選手が既に登録されています。');
        return;
    }
    
    const newPlayer = {
        id: 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        name: name
    };
    
    players.push(newPlayer);
    savePlayersToLocalStorage();
    input.value = '';
    
    initRuleFormSelects();
    renderSimulator();
}

function handleDeletePlayer(playerId) {
    const player = players.find(p => p.id === playerId);
    if (!player) return;
    
    if (!confirm(`選手「${player.name}」を削除しますか？\n（全てのデータ配置・交代設定からも削除されます）`)) {
        return;
    }
    
    players = players.filter(p => p.id !== playerId);
    savePlayersToLocalStorage();
    
    patterns.forEach(pat => {
        // スタメン配置から削除
        if (!pat.basePositions) pat.basePositions = {};
        Object.keys(pat.basePositions).forEach(pos => {
            if (pat.basePositions[pos] === playerId) {
                pat.basePositions[pos] = null;
            }
        });
        
        // 交代ルールから削除、または交代ルール自体の無効化
        if (pat.customSubstitutions) {
            pat.customSubstitutions = pat.customSubstitutions.filter(rule => {
                if (rule.type === 'sub') {
                    return rule.details.outPlayerId !== playerId && rule.details.inPlayerId !== playerId;
                }
                return true; // swap, rotationはポジションベースなので維持されるが、基本配置から選手が消えると表示は空になる
            });
        }
    });
    
    savePatternsToLocalStorage();
    
    if (selectedPlayerId === playerId) {
        selectedPlayerId = null;
        selectedSourcePos = null;
    }
    
    initRuleFormSelects();
    renderSimulator();
}

// ==========================================
// 保存データの読み込み・保存・JSON操作
// ==========================================

function handleSavePattern() {
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
        updatePatternSelectOptions();
        alert(`データ「${name}」を保存しました。`);
    }
}

function handleDeletePattern() {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    if (!confirm(`データ「${currentPattern.name}」を削除しますか？`)) {
        return;
    }
    
    patterns = patterns.filter(p => p.id !== currentPatternId);
    savePatternsToLocalStorage();
    
    if (patterns.length > 0) {
        currentPatternId = patterns[0].id;
    } else {
        createNewPattern();
    }
    
    updatePatternSelectOptions();
    
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

function handlePatternSelectChange(e) {
    const targetId = e.target.value;
    
    if (!targetId) {
        const name = prompt('新しいデータ名を入力してください:');
        if (name === null) {
            e.target.value = currentPatternId || '';
            return;
        }
        createNewPattern(name);
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

function handleExportJSON() {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    const exportData = {
        version: 'ants-sim-2.0',
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
    reader.onload = function(evt) {
        try {
            const data = JSON.parse(evt.target.result);
            if (data.version !== 'ants-sim-2.0' && data.version !== 'ants-sim-1.0') {
                alert('ファイル形式が正しくありません。');
                return;
            }
            
            if (confirm('インポートを実行しますか？\n※既存の選手リストと配置データがマージ/追加されます。')) {
                // 選手リストのマージ
                data.players.forEach(newP => {
                    if (!players.some(p => p.id === newP.id || p.name === newP.name)) {
                        players.push(newP);
                    }
                });
                savePlayersToLocalStorage();
                
                // バージョン2.0のデータ構造をロード
                if (data.version === 'ants-sim-2.0') {
                    const newPat = data.pattern;
                    newPat.id = 'pat_' + Date.now();
                    newPat.name = newPat.name + ' (インポート)';
                    patterns.push(newPat);
                    currentPatternId = newPat.id;
                    simulatorMode = newPat.mode || 9;
                } else {
                    // 旧バージョン (1.0) のイニングデータを移行
                    const oldPat = data.pattern;
                    const baseInning = oldPat.innings && oldPat.innings[0] ? oldPat.innings[0].positions : {};
                    
                    const newPat = {
                        id: 'pat_' + Date.now(),
                        name: oldPat.name + ' (旧移行)',
                        mode: oldPat.mode || 9,
                        basePositions: baseInning,
                        customSubstitutions: []
                    };
                    patterns.push(newPat);
                    currentPatternId = newPat.id;
                    simulatorMode = newPat.mode || 9;
                }
                
                savePatternsToLocalStorage();
                updatePatternSelectOptions();
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
    
    // 交代ルール追加実行
    document.getElementById('btn-create-sub-rule')?.addEventListener('click', handleCreateSubRule);
    
    // 選手追加
    document.getElementById('btn-add-sim-player')?.addEventListener('click', handleAddPlayer);
    document.getElementById('sim-new-player-input')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAddPlayer();
    });
    
    // パターン操作
    document.getElementById('sim-pattern-select')?.addEventListener('change', handlePatternSelectChange);
    document.getElementById('btn-save-sim-pattern')?.addEventListener('click', handleSavePattern);
    document.getElementById('btn-delete-sim-pattern')?.addEventListener('click', handleDeletePattern);
    
    // モード切替
    document.getElementById('btn-sim-mode-9')?.addEventListener('click', () => {
        if (simulatorMode !== 9) {
            simulatorMode = 9;
            updateModeUI();
            const pat = patterns.find(p => p.id === currentPatternId);
            if (pat) pat.mode = 9;
            savePatternsToLocalStorage();
            initRuleFormSelects();
            renderSimulator();
        }
    });
    
    document.getElementById('btn-sim-mode-10')?.addEventListener('click', () => {
        if (simulatorMode !== 10) {
            simulatorMode = 10;
            updateModeUI();
            const pat = patterns.find(p => p.id === currentPatternId);
            if (pat) pat.mode = 10;
            savePatternsToLocalStorage();
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
