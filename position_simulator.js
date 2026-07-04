// ==========================================
// ANTS_BB ポジションシミュレーター
// ==========================================

import { switchAuthScreen } from './main.js';

// 状態管理
let players = []; // { id, name }
let patterns = []; // { id, name, mode (9|10), innings: [{ inningIndex, positions: { p: playerId, ... } }] }
let currentPatternId = null;
let currentInningIndex = 0; // 0-indexed (0 = 1回, 1 = 2回...)
let selectedPlayerId = null; // タップ選択用 (選手リストまたはグラウンド上のスロット)
let selectedSourcePos = null; // タップ選択の移動元ポジション ('players-list', 'bench', またはポジション名 'p', '1b'...)
let simulatorMode = 9; // 9人制または10人制

// ポジション定義
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
    lcf: '左中堅', // 10人制用
    rcf: '右中堅'  // 10人制用
};

// 9人制で使用するポジション
const POSITIONS_9 = ['p', 'c', '1b', '2b', '3b', 'ss', 'lf', 'cf', 'rf'];
// 10人制で使用するポジション
const POSITIONS_10 = ['p', 'c', '1b', '2b', '3b', 'ss', 'lf', 'lcf', 'rcf', 'rf'];

// LocalStorage キー
const STORAGE_PLAYERS_KEY = 'ants_sim_players';
const STORAGE_PATTERNS_KEY = 'ants_sim_patterns';

/**
 * 初期化関数 (main.js から呼び出す)
 */
export function initPositionSimulator() {
    loadFromLocalStorage();
    setupEventListeners();
    
    // 初期表示設定
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
 * 新規パターンを作成
 */
function createNewPattern(name = '') {
    const id = 'pat_' + Date.now();
    const newPat = {
        id: id,
        name: name || '新規パターン',
        mode: simulatorMode,
        innings: [
            {
                inningIndex: 0,
                positions: {} // ポジション名: 選手ID
            }
        ]
    };
    patterns.push(newPat);
    currentPatternId = id;
    currentInningIndex = 0;
    savePatternsToLocalStorage();
    updatePatternSelectOptions();
    
    const select = document.getElementById('sim-pattern-select');
    if (select) select.value = id;
    const nameInput = document.getElementById('sim-pattern-name-input');
    if (nameInput) nameInput.value = newPat.name;
}

/**
 * パターン選択セレクトボックスの更新
 */
function updatePatternSelectOptions() {
    const select = document.getElementById('sim-pattern-select');
    if (!select) return;
    
    // 「新規作成」の選択肢を残してクリア
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

/**
 * 9人制/10人制モードのUI切り替え
 */
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
 * 全体レンダリング
 */
function renderSimulator() {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    // イニングデータの整合性をチェック
    if (!currentPattern.innings || currentPattern.innings.length === 0) {
        currentPattern.innings = [{ inningIndex: 0, positions: {} }];
    }
    if (currentInningIndex >= currentPattern.innings.length) {
        currentInningIndex = currentPattern.innings.length - 1;
    }
    
    const currentInningData = currentPattern.innings[currentInningIndex];
    const activePositions = simulatorMode === 9 ? POSITIONS_9 : POSITIONS_10;
    
    // 1. 配置済み選手IDのリスト
    const assignedPlayerIds = new Set();
    Object.keys(currentInningData.positions).forEach(pos => {
        if (activePositions.includes(pos) && currentInningData.positions[pos]) {
            assignedPlayerIds.add(currentInningData.positions[pos]);
        }
    });
    
    // 2. 選手リストの描画
    renderPlayersList(assignedPlayerIds);
    
    // 3. ベンチ（控え選手）の描画
    renderBenchList(assignedPlayerIds);
    
    // 4. イニングタブの描画
    renderInningTabs(currentPattern.innings);
    
    // 5. グラウンドポジションスロットの描画
    renderFieldPositions(currentInningData, currentPattern);
}

/**
 * 登録選手リストの描画
 */
function renderPlayersList(assignedPlayerIds) {
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
        const isSelected = selectedPlayerId === player.id && selectedSourcePos === 'players-list';
        
        const badge = document.createElement('div');
        badge.className = `sim-player-badge ${isAssigned ? 'assigned' : ''} ${isSelected ? 'selected' : ''}`;
        badge.setAttribute('data-player-id', player.id);
        
        if (!isAssigned) {
            badge.setAttribute('draggable', 'true');
            badge.addEventListener('dragstart', handleDragStart);
        }
        
        badge.innerHTML = `
            <span>${escapeHTML(player.name)}</span>
            <span class="sim-player-delete-btn" data-player-id="${player.id}">×</span>
        `;
        
        // タップ/クリックイベント
        badge.addEventListener('click', (e) => {
            if (e.target.classList.contains('sim-player-delete-btn')) {
                handleDeletePlayer(player.id);
                return;
            }
            if (isAssigned) return;
            handleSelectPlayer(player.id, 'players-list');
        });
        
        listEl.appendChild(badge);
    });
}

/**
 * ベンチ（控え選手）の描画
 */
function renderBenchList(assignedPlayerIds) {
    const benchEl = document.getElementById('sim-bench-list');
    if (!benchEl) return;
    
    benchEl.innerHTML = '';
    
    const benchPlayers = players.filter(p => !assignedPlayerIds.has(p.id));
    
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
 * イニングタブの描画
 */
function renderInningTabs(innings) {
    const container = document.getElementById('sim-inning-tabs');
    if (!container) return;
    
    container.innerHTML = '';
    
    innings.forEach((inn, idx) => {
        const tab = document.createElement('button');
        tab.className = `sim-inning-tab ${idx === currentInningIndex ? 'active' : ''}`;
        tab.textContent = `${idx + 1}回`;
        
        tab.addEventListener('click', () => {
            currentInningIndex = idx;
            selectedPlayerId = null;
            selectedSourcePos = null;
            renderSimulator();
        });
        
        container.appendChild(tab);
    });
}

/**
 * グラウンド上のポジションスロットの描画
 */
function renderFieldPositions(currentInningData, currentPattern) {
    const container = document.getElementById('sim-field-positions');
    if (!container) return;
    
    container.innerHTML = '';
    
    const activePositions = simulatorMode === 9 ? POSITIONS_9 : POSITIONS_10;
    
    activePositions.forEach(pos => {
        const playerId = currentInningData.positions[pos];
        const player = players.find(p => p.id === playerId);
        
        // 前のイニングと比較してポジション変更（赤字）判定
        let isChanged = false;
        if (currentInningIndex > 0 && playerId) {
            const prevInningData = currentPattern.innings[currentInningIndex - 1];
            // 前の回での同じ選手のポジションを調べる
            let prevPos = null;
            if (prevInningData && prevInningData.positions) {
                Object.keys(prevInningData.positions).forEach(k => {
                    if (prevInningData.positions[k] === playerId) {
                        prevPos = k;
                    }
                });
            }
            // 前の回とポジションが異なる場合、赤字にする
            if (prevPos !== pos) {
                isChanged = true;
            }
        }
        
        const isSelected = selectedPlayerId && selectedSourcePos === pos;
        
        const slot = document.createElement('div');
        slot.className = `sim-pos-slot pos-${pos} ${isSelected ? 'swap-selected' : ''}`;
        slot.setAttribute('data-position', pos);
        
        // ドラッグ＆ドロップ用イベント
        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('dragleave', handleDragLeave);
        slot.addEventListener('drop', handleDrop);
        
        // タップ/クリック用イベント
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

// ==========================================
// イベントハンドラー (D&D / タップ / CRUD)
// ==========================================

/**
 * 選手名の追加
 */
function handleAddPlayer() {
    const input = document.getElementById('sim-new-player-input');
    if (!input) return;
    
    const name = input.value.trim();
    if (!name) return;
    
    // 重複チェック
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
    renderSimulator();
}

/**
 * 選手名の削除
 */
function handleDeletePlayer(playerId) {
    const player = players.find(p => p.id === playerId);
    if (!player) return;
    
    if (!confirm(`選手「${player.name}」を削除しますか？\n（全ての配置パターンからも削除されます）`)) {
        return;
    }
    
    // 選手をリストから削除
    players = players.filter(p => p.id !== playerId);
    savePlayersToLocalStorage();
    
    // 各パターンの配置データからも削除
    patterns.forEach(pat => {
        pat.innings.forEach(inn => {
            Object.keys(inn.positions).forEach(pos => {
                if (inn.positions[pos] === playerId) {
                    inn.positions[pos] = null;
                }
            });
        });
    });
    savePatternsToLocalStorage();
    
    if (selectedPlayerId === playerId) {
        selectedPlayerId = null;
        selectedSourcePos = null;
    }
    
    renderSimulator();
}

/**
 * ドラッグ開始
 */
function handleDragStart(e) {
    const playerId = e.currentTarget.getAttribute('data-player-id');
    e.dataTransfer.setData('text/plain', playerId);
    
    // ドラッグ元のポジションを特定
    let source = 'bench';
    if (e.currentTarget.parentNode.id === 'sim-players-list') {
        source = 'players-list';
    }
    e.dataTransfer.setData('source-pos', source);
}

/**
 * ドラッグオーバー
 */
function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

/**
 * ドラッグアウト
 */
function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

/**
 * ドロップされたときの処理
 */
function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    const playerId = e.dataTransfer.getData('text/plain');
    const targetPos = e.currentTarget.getAttribute('data-position');
    
    if (!playerId || !targetPos) return;
    
    assignPlayerToPosition(playerId, targetPos);
}

/**
 * 選手をポジションに配置する（共通処理）
 */
function assignPlayerToPosition(playerId, targetPos) {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    const currentInningData = currentPattern.innings[currentInningIndex];
    
    // 1. すでに他のポジションにその選手が配置されているか調べる (スワップ処理のため)
    let currentPosOfPlayer = null;
    Object.keys(currentInningData.positions).forEach(pos => {
        if (currentInningData.positions[pos] === playerId) {
            currentPosOfPlayer = pos;
        }
    });
    
    const previousPlayerAtTarget = currentInningData.positions[targetPos];
    
    if (currentPosOfPlayer) {
        // 同一イニング内のポジション移動 (入れ替え)
        currentInningData.positions[currentPosOfPlayer] = previousPlayerAtTarget;
        currentInningData.positions[targetPos] = playerId;
    } else {
        // 新規配置
        currentInningData.positions[targetPos] = playerId;
    }
    
    savePatternsToLocalStorage();
    
    // 選択状態を解除
    selectedPlayerId = null;
    selectedSourcePos = null;
    
    renderSimulator();
}

/**
 * 選手リスト/ベンチでのタップ選択処理
 */
function handleSelectPlayer(playerId, source) {
    if (selectedPlayerId === playerId && selectedSourcePos === source) {
        // 再度タップで解除
        selectedPlayerId = null;
        selectedSourcePos = null;
    } else {
        selectedPlayerId = playerId;
        selectedSourcePos = source;
    }
    renderSimulator();
}

/**
 * グラウンド上のスロットがクリックされた時の処理 (タップ配置・スワップ)
 */
function handleFieldSlotClick(clickedPos) {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    const currentInningData = currentPattern.innings[currentInningIndex];
    const playerAtSlot = currentInningData.positions[clickedPos];
    
    // 1. 選手が選択されている状態で、スロットをタップした場合
    if (selectedPlayerId) {
        // 移動元が別のポジションスロットの場合（グラウンド内のポジション入れ替え）
        if (selectedSourcePos !== 'players-list' && selectedSourcePos !== 'bench') {
            const playerAtSource = currentInningData.positions[selectedSourcePos];
            
            currentInningData.positions[selectedSourcePos] = playerAtSlot;
            currentInningData.positions[clickedPos] = playerAtSource;
            
            savePatternsToLocalStorage();
            selectedPlayerId = null;
            selectedSourcePos = null;
            renderSimulator();
        } else {
            // リスト/ベンチから空き、または既存のスロットへ配置
            assignPlayerToPosition(selectedPlayerId, clickedPos);
        }
    } else {
        // 2. 選手が選択されていない状態で、配置済みのスロットをタップした場合
        if (playerAtSlot) {
            // そのスロットを選択状態にする（他のスロットとの入れ替えや、ベンチへの戻しのため）
            selectedPlayerId = playerAtSlot;
            selectedSourcePos = clickedPos;
            renderSimulator();
        }
    }
}

/**
 * グラウンド上の選手を外してベンチに戻す（タップ選択解除）
 * 選択状態のポジションを再度タップするか、ベンチエリアをタップしたときに外す
 */
function removePlayerFromPosition(pos) {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    const currentInningData = currentPattern.innings[currentInningIndex];
    currentInningData.positions[pos] = null;
    
    savePatternsToLocalStorage();
    selectedPlayerId = null;
    selectedSourcePos = null;
    renderSimulator();
}

/**
 * 回（イニング）の追加
 */
function handleAddInning() {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    const newInningIndex = currentPattern.innings.length;
    currentPattern.innings.push({
        inningIndex: newInningIndex,
        positions: {}
    });
    
    savePatternsToLocalStorage();
    currentInningIndex = newInningIndex;
    selectedPlayerId = null;
    selectedSourcePos = null;
    renderSimulator();
}

/**
 * 回（イニング）の削除
 */
function handleDeleteInning() {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    if (currentPattern.innings.length <= 1) {
        alert('これ以上イニングを削除できません。');
        return;
    }
    
    if (!confirm(`${currentInningIndex + 1}回を削除しますか？`)) {
        return;
    }
    
    // 削除してインデックスを再構成
    currentPattern.innings.splice(currentInningIndex, 1);
    currentPattern.innings.forEach((inn, idx) => {
        inn.inningIndex = idx;
    });
    
    savePatternsToLocalStorage();
    
    if (currentInningIndex >= currentPattern.innings.length) {
        currentInningIndex = currentPattern.innings.length - 1;
    }
    
    selectedPlayerId = null;
    selectedSourcePos = null;
    renderSimulator();
}

/**
 * 前の回からコピー
 */
function handleCopyPrevInning() {
    if (currentInningIndex === 0) {
        alert('1回にはコピー元の「前の回」がありません。');
        return;
    }
    
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    const prevInningData = currentPattern.innings[currentInningIndex - 1];
    const currentInningData = currentPattern.innings[currentInningIndex];
    
    // ディープコピー
    currentInningData.positions = { ...prevInningData.positions };
    
    savePatternsToLocalStorage();
    renderSimulator();
}

/**
 * 配置パターンの保存
 */
function handleSavePattern() {
    const nameInput = document.getElementById('sim-pattern-name-input');
    if (!nameInput) return;
    
    const name = nameInput.value.trim();
    if (!name) {
        alert('パターン名を入力してください。');
        return;
    }
    
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (currentPattern) {
        currentPattern.name = name;
        currentPattern.mode = simulatorMode;
        savePatternsToLocalStorage();
        updatePatternSelectOptions();
        alert(`パターン「${name}」を保存しました。`);
    }
}

/**
 * 配置パターンの削除
 */
function handleDeletePattern() {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    if (!confirm(`配置パターン「${currentPattern.name}」を削除しますか？`)) {
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
    
    currentInningIndex = 0;
    selectedPlayerId = null;
    selectedSourcePos = null;
    
    renderSimulator();
}

/**
 * 配置パターンの切り替え
 */
function handlePatternSelectChange(e) {
    const targetId = e.target.value;
    
    if (!targetId) {
        // 「新規作成」を選択した場合
        const name = prompt('新しいパターン名を入力してください:');
        if (name === null) {
            // キャンセルされた場合
            e.target.value = currentPatternId || '';
            return;
        }
        createNewPattern(name);
        renderSimulator();
    } else {
        currentPatternId = targetId;
        currentInningIndex = 0;
        
        const pattern = patterns.find(p => p.id === currentPatternId);
        if (pattern) {
            simulatorMode = pattern.mode || 9;
            const nameInput = document.getElementById('sim-pattern-name-input');
            if (nameInput) nameInput.value = pattern.name;
        }
        
        selectedPlayerId = null;
        selectedSourcePos = null;
        
        updateModeUI();
        renderSimulator();
    }
}

/**
 * JSONエクスポート
 */
function handleExportJSON() {
    const currentPattern = patterns.find(p => p.id === currentPatternId);
    if (!currentPattern) return;
    
    const exportData = {
        version: 'ants-sim-1.0',
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

/**
 * JSONインポート
 */
function handleImportJSON(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(evt) {
        try {
            const data = JSON.parse(evt.target.result);
            if (data.version !== 'ants-sim-1.0' || !data.players || !data.pattern) {
                alert('ファイル形式が正しくありません。');
                return;
            }
            
            if (confirm('インポートを実行しますか？\n※既存の選手リストと配置パターンが更新されます。')) {
                // 選手リストのマージ（IDが重複しないようにする）
                data.players.forEach(newP => {
                    if (!players.some(p => p.id === newP.id || p.name === newP.name)) {
                        players.push(newP);
                    }
                });
                savePlayersToLocalStorage();
                
                // パターンの追加
                const newPat = data.pattern;
                // 新しいIDを発行して追加
                newPat.id = 'pat_' + Date.now();
                newPat.name = newPat.name + ' (インポート)';
                patterns.push(newPat);
                currentPatternId = newPat.id;
                currentInningIndex = 0;
                simulatorMode = newPat.mode || 9;
                
                savePatternsToLocalStorage();
                updatePatternSelectOptions();
                updateModeUI();
                renderSimulator();
                alert('インポートが完了しました。');
            }
        } catch (err) {
            console.error(err);
            alert('ファイルの読み込みに失敗しました。JSONファイルが壊れている可能性があります。');
        }
        // inputファイルをクリア
        e.target.value = '';
    };
    reader.readAsText(file);
}

// ==========================================
// イベントリスナー設定
// ==========================================
function setupEventListeners() {
    // 選手登録関連
    document.getElementById('btn-add-sim-player')?.addEventListener('click', handleAddPlayer);
    document.getElementById('sim-new-player-input')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAddPlayer();
    });
    
    // パターン操作
    document.getElementById('sim-pattern-select')?.addEventListener('change', handlePatternSelectChange);
    document.getElementById('btn-save-sim-pattern')?.addEventListener('click', handleSavePattern);
    document.getElementById('btn-delete-sim-pattern')?.addEventListener('click', handleDeletePattern);
    
    // イニング操作
    document.getElementById('btn-add-sim-inning')?.addEventListener('click', handleAddInning);
    document.getElementById('btn-delete-sim-inning')?.addEventListener('click', handleDeleteInning);
    document.getElementById('btn-copy-prev-inning')?.addEventListener('click', handleCopyPrevInning);
    
    // モード切替
    document.getElementById('btn-sim-mode-9')?.addEventListener('click', () => {
        if (simulatorMode !== 9) {
            simulatorMode = 9;
            updateModeUI();
            
            // 現在のパターンのモードを更新
            const pat = patterns.find(p => p.id === currentPatternId);
            if (pat) pat.mode = 9;
            savePatternsToLocalStorage();
            
            renderSimulator();
        }
    });
    
    document.getElementById('btn-sim-mode-10')?.addEventListener('click', () => {
        if (simulatorMode !== 10) {
            simulatorMode = 10;
            updateModeUI();
            
            // 現在のパターンのモードを更新
            const pat = patterns.find(p => p.id === currentPatternId);
            if (pat) pat.mode = 10;
            savePatternsToLocalStorage();
            
            renderSimulator();
        }
    });
    
    // JSON操作
    document.getElementById('btn-export-sim')?.addEventListener('click', handleExportJSON);
    document.getElementById('import-sim-input')?.addEventListener('change', handleImportJSON);
    
    // メニューに戻る/ログアウト
    document.getElementById('btn-back-to-menu-sim')?.addEventListener('click', () => {
        selectedPlayerId = null;
        selectedSourcePos = null;
        switchAuthScreen('app-menu-view');
    });
    
    document.getElementById('btn-logout-sim')?.addEventListener('click', () => {
        document.getElementById('btn-logout')?.click();
    });
    
    // ベンチの背景タップで、グラウンドの選択選手を外す
    document.getElementById('sim-bench-list')?.addEventListener('click', (e) => {
        if (e.target.id === 'sim-bench-list' && selectedPlayerId && selectedSourcePos !== 'players-list' && selectedSourcePos !== 'bench') {
            removePlayerFromPosition(selectedSourcePos);
        }
    });
}

// ==========================================
// ユーティリティ
// ==========================================
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
