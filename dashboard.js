import { supabaseClient, showLoading, hideLoading, currentUserRole, logAction } from './main.js';

let isDashboardInitialized = false;
let allGames = [];
let allBatterStats = [];
let allPitcherStats = [];
let allPlayers = [];
let allGameDetails = []; // DB (master_data: SCORER_GAME_DETAIL_*) から取得した詳細プレイデータ
let tempPreviewDetails = []; // ファイル読込時の一時プレビュー用詳細データ
let dashboardSettings = { homeTeamNames: ['ありんこアントス@A軍'], defaultFilterDate: { from: '', to: '', teamRegex: '', category: '', outcome: 'all', firstScore: 'all' } };
let isFilterInitialized = false;
let isRankingRegulationEnabled = true;
let detailTranscriptShowPitches = false;
let detailTranscriptHalfFilter = 'all'; // 'all' or specific half-inning label e.g. '1回表'
let charts = {};
let personalCharts = {};
let comparisonCharts = {};
let currentRankingData = { batter: [], pitcher: [] };
let rankingSortState = { batter: { key: 'ops', order: 'desc' }, pitcher: { key: 'era', order: 'asc' } };
let psAllSortState = { batter: { key: 'ops', order: 'desc' }, pitcher: { key: 'era', order: 'asc' } };
let parsedDetailData = null;
let detailCharts = {};

export async function initDashboardApp() {
    if (!isDashboardInitialized) {
        setupDashboardUI();
        isDashboardInitialized = true;
    }
    
    // 権限による制御 (データインポートタブは管理者のみ表示)
    const importTabBtn = document.querySelector('button[data-tab="import-data"]');
    if (importTabBtn) {
        if (currentUserRole === 'admin') {
            importTabBtn.classList.remove('hidden');
        } else {
            importTabBtn.classList.add('hidden');
        }
    }

    await loadDashboardData();
}

// --- 簡単なCSVパーサー ---
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

function setupDashboardUI() {
    // HTML要素がまだ無い場合は動的に生成して追加
    let container = document.getElementById('dashboard-view');
    if (!container) {
        container = document.createElement('div');
        container.id = 'dashboard-view';
        container.className = 'hidden p-4 max-w-4xl mx-auto';
        container.innerHTML = `
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">成績ダッシュボード</h2>
                <button id="btn-back-to-menu-dash" class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded shadow font-bold">メニューに戻る</button>
            </div>

            <div id="dashboard-tabs" class="flex border-b mb-4 overflow-x-auto space-x-2">
                <button data-tab="team-summary" class="px-4 py-2 font-bold text-blue-600 border-b-2 border-blue-600 whitespace-nowrap transition-colors">チーム成績</button>
                <button data-tab="personal-summary" class="px-4 py-2 font-bold text-gray-500 border-b-2 border-transparent hover:text-gray-700 whitespace-nowrap transition-colors">個人成績</button>
                <button data-tab="ranking" class="px-4 py-2 font-bold text-gray-500 border-b-2 border-transparent hover:text-gray-700 whitespace-nowrap transition-colors">ランキング</button>
                <button data-tab="comparison" class="px-4 py-2 font-bold text-gray-500 border-b-2 border-transparent hover:text-gray-700 whitespace-nowrap transition-colors">選手比較</button>
                <button data-tab="settings" class="px-4 py-2 font-bold text-gray-500 border-b-2 border-transparent hover:text-gray-700 whitespace-nowrap transition-colors">設定</button>
                <button data-tab="import-data" class="px-4 py-2 font-bold text-gray-500 border-b-2 border-transparent hover:text-gray-700 whitespace-nowrap transition-colors">データインポート</button>
                <button data-tab="detail-analysis" class="px-4 py-2 font-bold text-gray-500 border-b-2 border-transparent hover:text-gray-700 whitespace-nowrap transition-colors">詳細分析・文字起こし</button>
            </div>
            
            <!-- 共通絞り込みフィルタ（チーム成績・個人成績・ランキング・選手比較・テストモードで共有） -->
            <div id="dashboard-common-filter" class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-6 text-sm">
                <div class="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                    <div class="flex items-center space-x-2">
                        <span class="p-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-black">🔍</span>
                        <h3 class="font-bold text-gray-800 text-sm">成績・ランキング 共通絞り込みフィルタ</h3>
                    </div>
                    <span class="text-[11px] text-gray-400 font-medium hidden sm:inline">選択項目を変更すると自動で即時再集計されます</span>
                </div>

                <!-- 1行目: 期間 / 相手チーム / 大会カテゴリ -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    <div class="bg-gray-50/70 p-2.5 rounded-lg border border-gray-100">
                        <label class="block text-xs font-bold text-gray-600 mb-1">📅 期間指定</label>
                        <div class="flex items-center space-x-1.5">
                            <input type="date" id="db-filter-date-from" class="border border-gray-300 p-1.5 rounded-md w-full text-xs bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none">
                            <span class="text-gray-400 font-bold text-xs">〜</span>
                            <input type="date" id="db-filter-date-to" class="border border-gray-300 p-1.5 rounded-md w-full text-xs bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none">
                        </div>
                    </div>
                    <div class="bg-gray-50/70 p-2.5 rounded-lg border border-gray-100">
                        <label class="block text-xs font-bold text-gray-600 mb-1">⚔️ 相手チーム名 (正規表現可)</label>
                        <input type="text" id="db-filter-team-regex" class="border border-gray-300 p-1.5 rounded-md w-full text-xs bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" placeholder="例: イーグルス|シャークス">
                    </div>
                    <div class="bg-gray-50/70 p-2.5 rounded-lg border border-gray-100">
                        <label class="block text-xs font-bold text-gray-600 mb-1">🏆 大会・カテゴリ (カンマ区切り)</label>
                        <input type="text" id="db-filter-category" class="border border-gray-300 p-1.5 rounded-md w-full text-xs bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" placeholder="例: 練習試合, 東部近隣大会">
                    </div>
                </div>

                <!-- 2行目: 勝敗結果 / 先制点 / 操作ボタン -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                    <div class="bg-gray-50/70 p-2.5 rounded-lg border border-gray-100">
                        <label class="block text-xs font-bold text-gray-600 mb-1">📊 勝敗結果</label>
                        <select id="db-filter-outcome" class="border border-gray-300 p-1.5 rounded-md w-full text-xs font-bold text-gray-800 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none cursor-pointer">
                            <option value="all">全試合 (問わない)</option>
                            <option value="win">⭕ 勝ち試合のみ</option>
                            <option value="loss">❌ 負け試合のみ</option>
                            <option value="draw">🔺 引き分けのみ</option>
                        </select>
                    </div>
                    <div class="bg-gray-50/70 p-2.5 rounded-lg border border-gray-100">
                        <label class="block text-xs font-bold text-gray-600 mb-1">⚡ 先制点</label>
                        <select id="db-filter-first-score" class="border border-gray-300 p-1.5 rounded-md w-full text-xs font-bold text-gray-800 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none cursor-pointer">
                            <option value="all">全試合 (問わない)</option>
                            <option value="scored">⚡ 先制点を取った試合</option>
                            <option value="conceded">🛡️ 先制点を取られた試合</option>
                        </select>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button id="btn-apply-dashboard-filter" class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold py-2 px-3 rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer flex items-center justify-center space-x-1">
                            <span>適用</span>
                        </button>
                        <button id="btn-clear-dashboard-filter" class="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-semibold py-2 px-3 rounded-lg border border-gray-200 transition-all duration-200 cursor-pointer whitespace-nowrap">
                            デフォルトに戻す
                        </button>
                    </div>
                </div>
            </div>

            <div id="tab-content-team-summary">

                <div class="space-y-6">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="bg-white p-4 rounded shadow-md text-center">
                            <div class="text-gray-500 font-bold text-xs mb-1">集計試合数</div>
                            <div class="text-3xl font-black text-gray-800" id="summary-games">0</div>
                        </div>
                        <div class="bg-white p-4 rounded shadow-md text-center">
                            <div class="text-gray-500 font-bold text-xs mb-1">チーム打率</div>
                            <div class="text-3xl font-black text-blue-600" id="summary-avg">.000</div>
                        </div>
                        <div class="bg-white p-4 rounded shadow-md text-center">
                            <div class="text-gray-500 font-bold text-xs mb-1">総得点</div>
                            <div class="text-3xl font-black text-green-600" id="summary-runs">0</div>
                        </div>
                        <div class="bg-white p-4 rounded shadow-md text-center">
                            <div class="text-gray-500 font-bold text-xs mb-1">チーム防御率</div>
                            <div class="text-3xl font-black text-red-600" id="summary-era">0.00</div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-white p-4 rounded shadow-md">
                            <h4 class="font-bold text-gray-700 mb-4 text-sm text-center border-b pb-2">打撃推移 (月別)</h4>
                            <canvas id="chart-batting-monthly"></canvas>
                        </div>
                        <div class="bg-white p-4 rounded shadow-md">
                            <h4 class="font-bold text-gray-700 mb-4 text-sm text-center border-b pb-2">投手推移 (月別)</h4>
                            <canvas id="chart-pitching-monthly"></canvas>
                        </div>
                    </div>
                    <div class="bg-white p-4 rounded shadow-md">
                        <h4 class="font-bold text-gray-700 mb-4 text-sm text-center border-b pb-2">試合別 得失点と累積勝率推移</h4>
                        <canvas id="chart-games-wl"></canvas>
                    </div>
                </div>
            </div>

            <div id="tab-content-personal-summary" class="hidden space-y-6">
                <!-- コントロールパネル -->
                <div class="bg-white p-4 rounded-lg shadow-md text-sm space-y-4 no-print">
                    <div class="flex flex-wrap gap-4 items-end">
                        <div>
                            <label class="block font-bold text-gray-700 mb-1">表示モード</label>
                            <select id="ps-mode" class="border-2 border-blue-500 font-bold p-2 rounded w-44 bg-blue-50 text-blue-900">
                                <option value="single">👤 個人詳細モード</option>
                                <option value="all">👥 全選手一括モード</option>
                            </select>
                        </div>
                        <div id="ps-player-select-wrap">
                            <label class="block font-bold text-gray-700 mb-1">選手</label>
                            <select id="ps-player" class="border p-2 rounded w-48 font-bold text-gray-800 bg-white"></select>
                        </div>
                        <div>
                            <label class="block font-bold text-gray-700 mb-1">役割</label>
                            <select id="ps-role" class="border p-2 rounded w-28 font-bold">
                                <option value="batter">⚾ 打撃</option>
                                <option value="pitcher">🥎 投手</option>
                            </select>
                        </div>
                        <div>
                            <label class="block font-bold text-gray-700 mb-1">直近試合数</label>
                            <select id="ps-limit-games" class="border p-2 rounded w-36 font-bold">
                                <option value="all">全試合</option>
                                <option value="3">直近 3 試合</option>
                                <option value="5" selected>直近 5 試合</option>
                                <option value="10">直近 10 試合</option>
                                <option value="20">直近 20 試合</option>
                            </select>
                        </div>
                        <div>
                            <label class="block font-bold text-gray-700 mb-1">移動平均 単位</label>
                            <select id="ps-ma-unit" class="border p-2 rounded w-32">
                                <option value="ab">打数/登板単位</option>
                                <option value="game">試合単位</option>
                            </select>
                        </div>
                        <div>
                            <label class="block font-bold text-gray-700 mb-1">平均ウィンドウ</label>
                            <div class="flex items-center space-x-1">
                                <input type="number" id="ps-ma-window" value="10" min="1" max="100" class="border p-2 rounded w-20 text-center font-bold">
                                <span class="text-xs text-gray-500 font-semibold" id="ps-ma-window-label">打数</span>
                            </div>
                        </div>
                        <div class="flex space-x-2 ml-auto">
                            <button id="btn-export-ps-csv" class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded font-bold shadow-sm text-xs flex items-center space-x-1">
                                <span>📥 CSV出力</span>
                            </button>
                            <button id="btn-print-ps" class="bg-gray-700 hover:bg-gray-800 text-white px-3 py-2 rounded font-bold shadow-sm text-xs flex items-center space-x-1">
                                <span>🖨️ 印刷/PDF</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 個人選択モード用コンテナ -->
                <div id="ps-single-container" class="space-y-6">
                    <!-- 直近コンディション & ハイライト -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4" id="ps-highlight-cards">
                        <!-- 動的に挿入 -->
                    </div>

                    <!-- グラフ表示エリア（純粋グラフ ＆ 移動平均グラフ） -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- ① 純粋な成績推移グラフ -->
                        <div class="bg-white p-4 rounded-lg shadow-md">
                            <div class="flex justify-between items-center mb-2 border-b pb-2">
                                <h4 class="font-bold text-gray-800 text-sm flex items-center space-x-2">
                                    <span>📊 成績推移グラフ（累積・実数値）</span>
                                </h4>
                            </div>
                            <div class="h-64 md:h-80 relative">
                                <canvas id="chart-ps-raw-stats"></canvas>
                            </div>
                        </div>

                        <!-- ② 移動平均 推移グラフ -->
                        <div class="bg-white p-4 rounded-lg shadow-md">
                            <div class="flex justify-between items-center mb-2 border-b pb-2">
                                <h4 class="font-bold text-gray-800 text-sm flex items-center space-x-2">
                                    <span>📈 移動平均 推移グラフ</span>
                                    <span id="ps-ma-graph-subtitle" class="text-xs font-normal text-gray-500"></span>
                                </h4>
                            </div>
                            <div class="h-64 md:h-80 relative">
                                <canvas id="chart-ps-moving-avg"></canvas>
                            </div>
                        </div>
                    </div>

                    <!-- 試合別詳細成績一覧テーブル -->
                    <div class="bg-white p-4 rounded-lg shadow-md">
                        <div class="flex justify-between items-center border-b pb-2 mb-3">
                            <h4 class="font-bold text-gray-800 text-sm">📋 試合別 詳細成績一覧</h4>
                            <span class="text-xs text-gray-500" id="ps-game-count-label"></span>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full text-xs text-left border border-gray-200">
                                <thead class="bg-gray-100 text-gray-700" id="ps-game-thead"></thead>
                                <tbody id="ps-game-tbody" class="divide-y divide-gray-200"></tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- 全選手一括モード用コンテナ -->
                <div id="ps-all-container" class="space-y-6 hidden">
                    <div class="bg-white p-4 rounded-lg shadow-md">
                        <div class="flex justify-between items-center border-b pb-2 mb-4">
                            <h4 class="font-bold text-gray-800 text-base" id="ps-all-title">👥 全選手成績一覧（直近試合＆移動平均）</h4>
                            <span class="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-bold border border-blue-200" id="ps-all-subtitle"></span>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full text-xs text-left border border-gray-200">
                                <thead class="bg-gray-100 text-gray-700" id="ps-all-thead"></thead>
                                <tbody id="ps-all-tbody" class="divide-y divide-gray-200"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div id="tab-content-ranking" class="hidden space-y-6">
                <div class="flex flex-wrap justify-between items-center border-b pb-2 mb-4 gap-3">
                    <div class="flex space-x-2">
                        <button data-ranking-tab="batter" class="px-4 py-2 font-bold text-blue-600 border-b-2 border-blue-600 whitespace-nowrap transition-colors">打撃ランキング</button>
                        <button data-ranking-tab="pitcher" class="px-4 py-2 font-bold text-gray-500 border-b-2 border-transparent hover:text-gray-700 whitespace-nowrap transition-colors">投手ランキング</button>
                    </div>
                    <div class="flex flex-wrap items-center gap-3 text-xs bg-blue-50/80 border border-blue-200 px-3 py-2 rounded-lg">
                        <span id="ranking-summary-info" class="font-bold text-blue-900">対象試合: 0試合 / 規定打席: 0打席 (試合数×2)</span>
                        <label class="flex items-center space-x-1.5 cursor-pointer font-bold text-blue-800 bg-white px-2.5 py-1 rounded border border-blue-200 shadow-xs select-none" title="ON: 規定打席到達者を上位・規定未満を下段に薄グレー網掛けで表示 / OFF: 規定打席を考慮せず全選手を順位付け">
                            <input type="checkbox" id="ranking-regulation-cb" checked class="rounded text-blue-600 focus:ring-blue-500">
                            <span>規定打席を考慮してランキング表示</span>
                        </label>
                    </div>
                </div>
                
                <div id="ranking-content-batter" class="bg-white p-4 rounded-lg shadow-md space-y-2">
                    <div class="text-[11px] text-gray-500 flex flex-wrap justify-between gap-2 pb-1">
                        <span id="ranking-mode-note">※規定打席＝対象試合数×2打席（規定到達者を上位、規定未満を薄グレー網掛けで下段に表示）</span>
                        <span>※出塁率＝(安打＋四球＋死球)÷(打数＋四球＋死球＋犠飛) ／ 長打率＝塁打÷打数 ／ OPS＝出塁率＋長打率</span>
                    </div>
                    <div class="overflow-x-auto"><table class="w-full text-sm text-left border">
                        <thead class="bg-gray-100">
                            <tr>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="name" data-role="batter">選手<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="pa" data-role="batter">打席<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="ab" data-role="batter">打数<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="avg" data-role="batter">打率<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="ops" data-role="batter">OPS<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="obp" data-role="batter">出塁率<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="slg" data-role="batter">長打率<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="h" data-role="batter">安打<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="tb" data-role="batter">塁打<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="bb" data-role="batter">四球<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="hbp" data-role="batter">死球<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="rbi" data-role="batter">打点<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="r" data-role="batter">得点<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="sb" data-role="batter">盗塁<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="hr" data-role="batter">本塁打<span></span></th>
                            </tr>
                        </thead>
                        <tbody id="ranking-batter-tbody"></tbody>
                    </table></div>
                </div>
                <div id="ranking-content-pitcher" class="bg-white p-4 rounded-lg shadow-md hidden">
                    <div class="overflow-x-auto"><table class="w-full text-sm text-left border">
                        <thead class="bg-gray-100">
                            <tr>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="name" data-role="pitcher">選手<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none font-bold text-green-700" data-sort="wins" data-role="pitcher">勝<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none font-bold text-red-600" data-sort="losses" data-role="pitcher">負<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="outs" data-role="pitcher">アウト<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="era" data-role="pitcher">防御率<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="whip" data-role="pitcher">WHIP<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="k7" data-role="pitcher">K/7<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="bb7" data-role="pitcher">BB/7<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="kRate" data-role="pitcher">奪三振率<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="bbRate" data-role="pitcher">与四死球率<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="sRate" data-role="pitcher">S率(%)<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="kbb" data-role="pitcher">K/BB<span></span></th>
                            </tr>
                        </thead>
                        <tbody id="ranking-pitcher-tbody"></tbody>
                    </table></div>
                </div>
            </div>

            <div id="tab-content-comparison" class="hidden space-y-6">
                <div class="bg-white p-4 rounded-lg shadow-md text-sm space-y-4">
                    <div class="flex flex-wrap gap-4 items-end">
                        <div>
                            <label class="block font-bold text-gray-600 mb-1">役割</label>
                            <select id="comp-role" class="border p-2 rounded w-28 font-bold bg-white">
                                <option value="batter">⚾ 打撃</option>
                                <option value="pitcher">🥎 投手</option>
                            </select>
                        </div>
                        <div>
                            <label class="block font-bold text-gray-600 mb-1">計算方法</label>
                            <select id="comp-calc-mode" class="border p-2 rounded font-bold bg-white">
                                <option value="cumulative">📊 累積成績</option>
                                <option value="moving_avg">📈 移動平均（直近N試合）</option>
                            </select>
                        </div>
                        <div id="comp-window-wrap" class="hidden">
                            <label class="block font-bold text-gray-600 mb-1">移動平均 試合数</label>
                            <div class="flex items-center space-x-1">
                                <input type="number" id="comp-ma-window" value="5" min="1" max="100" class="border p-2 rounded w-20 text-center font-bold">
                                <span class="text-xs text-gray-500 font-semibold">試合</span>
                            </div>
                        </div>
                    </div>
                    <div id="comp-ma-note" class="hidden bg-yellow-50 p-2.5 rounded border border-yellow-200 text-xs text-yellow-800 font-bold">
                        ※移動平均モード: 累積ではなく、各時点の直近指定試合数での「移動平均」で選手間の調子の推移を比較します。
                    </div>
                    <div>
                        <label class="block font-bold text-gray-600 mb-2 border-t pt-2">比較する選手を選択</label>
                        <div class="mb-2 max-h-40 overflow-y-auto border p-3 rounded grid grid-cols-2 md:grid-cols-4 gap-2 bg-gray-50" id="comp-players-list"></div>
                    </div>
                </div>
                <div id="comp-charts-container" class="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
            </div>

            <div id="tab-content-settings" class="hidden space-y-6">
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="font-bold text-lg mb-4 text-gray-800 border-b pb-2">集計設定</h3>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">自チームとして集計するチーム名 (DB同期)</label>
                            <div id="home-team-list" class="flex flex-wrap gap-2 mb-3"></div>
                            <div class="flex items-center space-x-2">
                                <input type="text" id="new-home-team-name" placeholder="チーム名を追加 (例: ありんこアントス@A軍)" class="border p-2 rounded w-full md:w-1/2">
                                <button id="btn-add-home-team" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-bold shadow-sm">追加</button>
                            </div>
                        </div>
                        <div class="mt-6 border-t pt-4">
                            <label class="block text-sm font-bold text-gray-700 mb-2">デフォルトのフィルタ設定 (DB同期)</label>
                            <div class="space-y-3 max-w-md">
                                <div class="flex items-center space-x-2">
                                    <span class="text-sm font-semibold text-gray-600 w-24">期間:</span>
                                    <input type="date" id="setting-default-date-from" class="border p-1.5 rounded text-sm w-full">
                                    <span class="text-gray-500">〜</span>
                                    <input type="date" id="setting-default-date-to" class="border p-1.5 rounded text-sm w-full">
                                </div>
                                <div class="flex items-center space-x-2">
                                    <span class="text-sm font-semibold text-gray-600 w-24">相手チーム:</span>
                                    <input type="text" id="setting-default-team-regex" placeholder="例: イーグルス|シャークス" class="border p-1.5 rounded text-sm w-full">
                                </div>
                                <div class="flex items-center space-x-2">
                                    <span class="text-sm font-semibold text-gray-600 w-24">カテゴリ:</span>
                                    <input type="text" id="setting-default-category" placeholder="例: 練習試合" class="border p-1.5 rounded text-sm w-full">
                                </div>
                                <div class="flex items-center space-x-2">
                                    <span class="text-sm font-semibold text-gray-600 w-24">勝敗結果:</span>
                                    <select id="setting-default-outcome" class="border p-1.5 rounded text-sm w-full bg-white">
                                        <option value="all">全試合 (問わない)</option>
                                        <option value="win">⭕ 勝ち試合のみ</option>
                                        <option value="loss">❌ 負け試合のみ</option>
                                        <option value="draw">🔺 引き分けのみ</option>
                                    </select>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <span class="text-sm font-semibold text-gray-600 w-24">先制点:</span>
                                    <select id="setting-default-first-score" class="border p-1.5 rounded text-sm w-full bg-white">
                                        <option value="all">全試合 (問わない)</option>
                                        <option value="scored">⚡ 先制点を取った試合</option>
                                        <option value="conceded">🛡️ 先制点を取られた試合</option>
                                    </select>
                                </div>
                            </div>
                            <p class="text-xs text-gray-500 mt-2 mb-2">※DB（Supabase）に保存され、全端末・全ブラウザで共通の初期設定値として同期されます。</p>
                            <div id="settings-db-sync-status" class="text-xs font-bold mb-3 text-gray-500"></div>
                            <button id="btn-save-default-date" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold shadow-sm">設定を保存 (DB同期)</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="tab-content-import-data" class="hidden space-y-6 mb-6">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h3 class="text-lg font-bold mb-4 border-b pb-2">① CSVデータインポート</h3>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-1">データ種別</label>
                            <select id="csv-import-type" class="w-full md:w-1/2 border p-2 rounded">
                                <option value="batter">打者成績 (scorer_stats_raw_b.csv)</option>
                                <option value="pitcher">投手成績 (scorer_stats_raw_p.csv)</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-1">CSVファイルを選択</label>
                            <input type="file" id="csv-import-file" accept=".csv" class="w-full border p-1 rounded">
                        </div>
                        <button id="btn-exec-csv-import" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow font-bold mt-2 disabled:bg-gray-400">
                            インポート実行
                        </button>
                    </div>
                    <div id="import-result-msg" class="mt-4 text-sm font-bold hidden"></div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h3 class="text-lg font-bold mb-2 border-b pb-2">② Scorerバックアップデータ (scorer_data*.txt) の一括インポート＆データ抽出</h3>
                    <p class="text-xs text-gray-600 mb-4">
                        Scorerアプリのバックアップファイル（<code>scorer_dataYYYYMMDD.txt</code>）または単一試合ファイル（<code>scorer_gameYYYYMMDD.txt</code>）から、DBへの直接一括インポート（通常成績＋詳細プレイ・文字起こしデータ）や、<code>scorer_stats_raw_b.csv</code>・<code>scorer_stats_raw_p.csv</code>・個別試合・試合文字起こしテキストの抽出が行えます。
                    </p>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-1">バックアップ / 試合ファイル (scorer_data*.txt / scorer_game*.txt) を選択</label>
                            <input type="file" id="backup-extract-file" accept=".txt,.json" class="w-full border p-1.5 rounded bg-white">
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <button id="btn-backup-import-db" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow font-bold text-xs">
                                📥 DBへ一括インポート (打者・投手・試合・詳細分析データ)
                            </button>
                            <button id="btn-extract-raw-b" class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded shadow font-bold text-xs">
                                📄 scorer_stats_raw_b.csv を抽出保存
                            </button>
                            <button id="btn-extract-raw-p" class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded shadow font-bold text-xs">
                                📄 scorer_stats_raw_p.csv を抽出保存
                            </button>
                        </div>
                        <div id="backup-game-extract-area" class="hidden border-t pt-4 mt-4 space-y-3">
                            <label class="block text-sm font-bold text-gray-700">試合別データ・戦績文字起こしを抽出 / プレビュー</label>
                            <div class="flex flex-wrap gap-2 items-center">
                                <select id="backup-game-select" class="border p-2 rounded text-xs font-bold bg-white flex-1 min-w-[240px]"></select>
                                <button id="btn-extract-single-game" class="bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded shadow font-bold text-xs">
                                    ⚾ 試合ファイル(.txt)抽出
                                </button>
                                <button id="btn-extract-game-transcript" class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded shadow font-bold text-xs">
                                    📝 戦績文字起こし(.txt)保存
                                </button>
                                <button id="btn-preview-backup-detail" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded shadow font-bold text-xs">
                                    👁️ 詳細分析・文字起こしを見る
                                </button>
                            </div>
                        </div>
                        <div id="backup-extract-msg" class="mt-2 text-sm font-bold hidden"></div>
                    </div>
                </div>
            </div>

            <div id="tab-content-detail-analysis" class="hidden space-y-6 mb-6">
                <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <div class="flex flex-wrap justify-between items-center gap-3 border-b pb-3 mb-4">
                        <div>
                            <h3 class="text-lg font-bold text-gray-800">📊 詳細分析 ＆ 試合経過文字起こし</h3>
                            <p class="text-xs text-gray-500 mt-0.5">DBに保存されたScorerの詳細プレイ履歴を参照し、上部の共通絞り込みフィルタと連動して集計・文字起こしを表示します。</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <span id="detail-db-status-badge" class="text-xs font-bold px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">DBデータ確認中...</span>
                            <button id="btn-detail-exit-preview" class="hidden text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300">DB表示に戻す</button>
                        </div>
                    </div>

                    <div id="detail-empty-notice" class="hidden bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-lg text-sm space-y-2 mb-4">
                        <div class="font-bold">まだDBに詳細プレイデータがインポートされていません（またはフィルタ条件に一致する試合がありません）。</div>
                        <p class="text-xs">「データインポート」タブの ② Scorerバックアップデータ から <code>scorer_data*.txt</code>（または <code>scorer_game*.txt</code>）を一括インポートすると、以降すべての端末・ブラウザから都度読み込み不要で詳細分析＆試合文字起こしを参照できます。</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">分析・表示対象を選択</label>
                            <select id="detail-scope-select" class="border-2 border-indigo-300 p-2 rounded-lg w-full text-sm font-bold bg-white text-gray-800"></select>
                        </div>
                        <details class="text-xs bg-gray-50 border rounded-lg p-2.5">
                            <summary class="cursor-pointer font-bold text-gray-700 select-none">📂 ローカルの scorer_data / scorer_game ファイルを一時読み込み（任意）</summary>
                            <div class="mt-2 flex flex-wrap gap-2 items-center">
                                <input type="file" id="detail-analysis-file" accept=".txt,.json" class="flex-1 text-xs border p-1 rounded bg-white">
                                <button id="btn-load-detail-data" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded font-bold text-xs">一時プレビュー</button>
                            </div>
                        </details>
                    </div>
                    <div id="detail-games-quicklist" class="hidden mt-3 pt-3 border-t border-gray-100"></div>
                    <div id="detail-jump-transcript-bar" class="hidden mt-3 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 bg-purple-50/70 px-3 py-2 rounded-lg border border-purple-200">
                        <span class="text-xs font-bold text-purple-900">📋 選択した試合の詳細スコアボード ＆ 試合経過文字起こしが下の分析エリアの下に表示されています</span>
                        <button type="button" id="btn-jump-to-transcript" class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm whitespace-nowrap cursor-pointer">📝 文字起こしへジャンプ ↓</button>
                    </div>
                </div>

                <!-- チーム詳細サマリー（エラー発生・イニング別得点アウト状況） -->
                <div id="detail-team-overview" class="hidden grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-white p-4 rounded-lg shadow border">
                        <h4 class="font-black text-gray-800 text-sm border-b pb-2 mb-3">📈 イニング別 得点＆アウト構成</h4>
                        <div class="h-56 relative">
                            <canvas id="chart-detail-innings"></canvas>
                        </div>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow border">
                        <h4 class="font-black text-gray-800 text-sm border-b pb-2 mb-3">🛡️ チーム守備・ポジション別エラー状況</h4>
                        <div id="detail-team-errors-summary" class="text-xs space-y-2 max-h-56 overflow-y-auto"></div>
                    </div>
                </div>

                <div id="detail-analysis-dashboard" class="space-y-6 hidden">
                    <!-- 選手選択エリア -->
                    <div class="bg-blue-50 border border-blue-200 p-4 rounded-lg flex flex-wrap gap-4 items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <label class="font-black text-blue-900 text-base">対象選手を選択:</label>
                            <select id="detail-player-select" class="border-2 border-blue-400 p-2 rounded-lg text-base font-bold bg-white text-gray-800 w-56 focus:outline-none focus:ring-2 focus:ring-blue-500"></select>
                        </div>
                        <div class="text-xs text-blue-700 font-semibold bg-blue-100/50 px-3 py-1.5 rounded-full border border-blue-200">
                            ※「ありんこアントス」所属選手のみに絞り込まれています
                        </div>
                    </div>

                    <!-- 一括表示グリッド -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <!-- 1. 打撃結果内訳 & ドーナツグラフ -->
                        <div class="bg-white p-4 rounded-lg shadow border flex flex-col justify-between">
                            <h4 class="font-black text-gray-800 text-sm border-b pb-2 mb-4">⚾ 打撃結果の内訳</h4>
                            <div class="grid grid-cols-2 gap-4 items-center">
                                <div class="h-48 relative">
                                    <canvas id="chart-detail-player-batting-result"></canvas>
                                </div>
                                <div class="overflow-x-auto text-xs">
                                    <table class="w-full text-left">
                                        <tbody>
                                            <tr class="border-b"><td class="py-1">安打(H)</td><td class="py-1 text-right font-bold text-green-600" id="stat-p-hits">0</td></tr>
                                            <tr class="border-b"><td class="py-1">三振(SO)</td><td class="py-1 text-right font-bold text-red-500" id="stat-p-strikeouts">0</td></tr>
                                            <tr class="border-b"><td class="py-1">ゴロアウト</td><td class="py-1 text-right" id="stat-p-groundouts">0</td></tr>
                                            <tr class="border-b"><td class="py-1">フライアウト</td><td class="py-1 text-right" id="stat-p-flyouts">0</td></tr>
                                            <tr class="border-b"><td class="py-1">四死球(BB/HBP)</td><td class="py-1 text-right text-blue-600" id="stat-p-walks">0</td></tr>
                                            <tr class="border-b"><td class="py-1">その他</td><td class="py-1 text-right" id="stat-p-others">0</td></tr>
                                            <tr class="font-bold bg-gray-50"><td class="py-1.5 pl-1">打率</td><td class="py-1.5 pr-1 text-right text-blue-700" id="stat-p-avg">.000</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <!-- 2. 打球方向の割合 -->
                        <div class="bg-white p-4 rounded-lg shadow border min-h-[250px] flex flex-col">
                            <h4 class="font-black text-gray-800 text-sm border-b pb-2 mb-4">🎯 打球方向の傾向</h4>
                            <div class="h-48 relative flex-grow">
                                <canvas id="chart-detail-player-direction"></canvas>
                            </div>
                        </div>

                        <!-- 3. チャンス・得点圏状況 & 盗塁 -->
                        <div class="bg-white p-4 rounded-lg shadow border flex flex-col justify-between">
                            <h4 class="font-black text-gray-800 text-sm border-b pb-2 mb-4">🔥 チャンス（得点圏）＆ 走塁スタッツ</h4>
                            <div class="space-y-6 text-sm flex-grow flex flex-col justify-around">
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="bg-red-50 p-3 rounded-lg border border-red-100 text-center">
                                        <div class="text-xs text-red-700 font-bold mb-1">得点圏安打率</div>
                                        <div class="text-2xl font-black text-red-600" id="stat-p-chance-avg">.000</div>
                                        <div class="text-[10px] text-red-500 mt-1" id="stat-p-chance-detail">0打席 0安打</div>
                                    </div>
                                    <div class="bg-green-50 p-3 rounded-lg border border-green-100 text-center">
                                        <div class="text-xs text-green-700 font-bold mb-1">盗塁成功率</div>
                                        <div class="text-2xl font-black text-green-600" id="stat-p-steal-rate">0.0%</div>
                                        <div class="text-[10px] text-green-500 mt-1" id="stat-p-steal-detail">成功0 / 企図0</div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 p-3 rounded-lg border text-xs space-y-1 text-gray-700">
                                    <div>・<strong>総打点 (RBI):</strong> <span class="font-bold text-gray-900" id="stat-p-rbi">0</span> 点</div>
                                    <div>・得点圏では走者が2塁以上のシチュエーションを集計しています。</div>
                                </div>
                            </div>
                        </div>

                        <!-- 4. 守備・エラー状況 -->
                        <div class="bg-white p-4 rounded-lg shadow border">
                            <h4 class="font-black text-gray-800 text-sm border-b pb-2 mb-4">🛡️ 守備・エラー状況</h4>
                            <div class="space-y-4 text-sm">
                                <div class="bg-yellow-50 p-3 rounded-lg border border-yellow-100 text-center">
                                    <div class="text-xs text-yellow-700 font-bold mb-1">期間内総エラー数</div>
                                    <div class="text-2xl font-black text-yellow-600" id="stat-p-errors-count">0 件</div>
                                </div>
                                <div class="overflow-y-auto max-h-28 text-xs border rounded bg-gray-50 p-2 space-y-1 text-gray-700" id="stat-p-errors-detail">
                                    <!-- エラーのあったポジションやイニングが表示される -->
                                </div>
                            </div>
                        </div>

                        <!-- 5. カウント別分析 -->
                        <div class="bg-white p-4 rounded-lg shadow border md:col-span-2 min-h-[300px] flex flex-col">
                            <h4 class="font-black text-gray-800 text-sm border-b pb-2 mb-4">📊 投球カウント（Ball-Strike）別の打撃結果</h4>
                            <div class="h-60 relative flex-grow">
                                <canvas id="chart-detail-player-count"></canvas>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- 試合ごとの文字起こし・スコアボード表示エリア（詳細分析の下に配置・個別試合選択時に表示） -->
                <div id="detail-transcript-panel" class="hidden bg-white p-5 rounded-xl shadow-md border border-gray-200 space-y-4">
                    <div class="flex flex-wrap justify-between items-center gap-2 border-b pb-3">
                        <div>
                            <h4 class="font-black text-gray-800 text-base" id="detail-transcript-title">📋 試合スコア ＆ 戦績文字起こし</h4>
                            <div class="text-xs text-gray-500 mt-0.5" id="detail-transcript-meta"></div>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <button type="button" id="btn-jump-to-detail-top" class="bg-gray-50 hover:bg-gray-100 text-gray-700 border px-3 py-1.5 rounded-lg text-xs font-bold">↑ 分析トップへ</button>
                            <button type="button" id="btn-detail-back-to-all" class="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg text-xs font-bold">← 全試合合算に戻る</button>
                            <button type="button" id="btn-detail-copy-transcript" class="bg-gray-100 hover:bg-gray-200 text-gray-800 border px-3 py-1.5 rounded-lg text-xs font-bold">📋 テキストをコピー</button>
                            <button type="button" id="btn-detail-download-transcript" class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm">📥 .txt ダウンロード</button>
                        </div>
                    </div>

                    <!-- イニングスコア表 (R H B E) -->
                    <div class="overflow-x-auto">
                        <table class="w-full text-xs text-center border border-gray-300" id="detail-scoreboard-table"></table>
                    </div>
                    <div class="text-xs text-gray-600 space-y-0.5 bg-gray-50 p-2.5 rounded border" id="detail-battery-hr-info"></div>

                    <!-- Scorer風コントローラ (試合全体 / 各攻撃回 + 投球表示トグル) -->
                    <div class="flex flex-wrap justify-between items-center gap-3 pt-1">
                        <div class="flex flex-wrap items-center gap-1.5" id="detail-transcript-half-tabs"></div>
                        <label class="flex items-center space-x-1.5 text-xs font-bold text-gray-700 cursor-pointer select-none bg-gray-100 px-3 py-1.5 rounded-lg border">
                            <input type="checkbox" id="detail-transcript-show-pitches" class="rounded text-blue-600">
                            <span>投球カウント (BSO・全投球) もすべて表示</span>
                        </label>
                    </div>

                    <!-- タイムラインカード一覧 -->
                    <div id="detail-transcript-timeline" class="max-h-[540px] overflow-y-auto space-y-1.5 border rounded-lg p-3 bg-stone-50"></div>
                </div>
            </div>
        `;
        document.getElementById('app-view')?.parentNode.appendChild(container);
        
        // イベントリスナー設定
        document.getElementById('btn-back-to-menu-dash').addEventListener('click', () => {
            import('./main.js').then(module => module.switchAuthScreen('app-menu-view'));
        });

        document.getElementById('btn-exec-csv-import').addEventListener('click', handleCsvImport);
        document.getElementById('backup-extract-file')?.addEventListener('change', handleBackupFileSelect);
        document.getElementById('btn-backup-import-db')?.addEventListener('click', handleBackupImportDb);
        document.getElementById('btn-extract-raw-b')?.addEventListener('click', () => handleExtractRawCsv('batter'));
        document.getElementById('btn-extract-raw-p')?.addEventListener('click', () => handleExtractRawCsv('pitcher'));
        document.getElementById('btn-extract-single-game')?.addEventListener('click', handleExtractSingleGame);
        document.getElementById('btn-extract-game-transcript')?.addEventListener('click', handleExtractGameTranscript);
        document.getElementById('btn-preview-backup-detail')?.addEventListener('click', handlePreviewBackupDetail);
        document.getElementById('btn-load-detail-data')?.addEventListener('click', handleDetailDataLoad);
        document.getElementById('detail-scope-select')?.addEventListener('change', (e) => renderDetailAnalysisTab(true, e.target.value));
        document.getElementById('btn-detail-back-to-all')?.addEventListener('click', () => renderDetailAnalysisTab(true, 'all'));
        document.getElementById('btn-detail-exit-preview')?.addEventListener('click', () => {
            tempPreviewDetails = [];
            renderDetailAnalysisTab(false, 'all');
        });
        document.getElementById('detail-transcript-show-pitches')?.addEventListener('change', (e) => {
            detailTranscriptShowPitches = e.target.checked;
            renderSelectedGameTranscript();
        });
        document.getElementById('btn-detail-copy-transcript')?.addEventListener('click', handleCopyCurrentTranscript);
        document.getElementById('btn-detail-download-transcript')?.addEventListener('click', handleDownloadCurrentTranscript);
        document.getElementById('btn-jump-to-transcript')?.addEventListener('click', () => {
            document.getElementById('detail-transcript-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        document.getElementById('btn-jump-to-detail-top')?.addEventListener('click', () => {
            document.getElementById('tab-content-detail-analysis')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        // タブ切り替え制御
        document.querySelectorAll('#dashboard-tabs button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                switchDashboardTab(e.currentTarget.dataset.tab);
            });
        });

        // ランキングタブ内のサブタブ切り替え
        document.querySelectorAll('button[data-ranking-tab]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('button[data-ranking-tab]').forEach(b => {
                    b.classList.remove('text-blue-600', 'border-blue-600');
                    b.classList.add('text-gray-500', 'border-transparent');
                });
                ['batter', 'pitcher'].forEach(t => document.getElementById(`ranking-content-${t}`).classList.add('hidden'));

                const target = e.currentTarget;
                target.classList.remove('text-gray-500', 'border-transparent');
                target.classList.add('text-blue-600', 'border-blue-600');
                document.getElementById(`ranking-content-${target.dataset.rankingTab}`).classList.remove('hidden');
            });
        });

        // 規定打席フィルタの切り替え
        document.getElementById('ranking-regulation-cb')?.addEventListener('change', (e) => {
            isRankingRegulationEnabled = e.target.checked;
            renderRanking();
        });

        // ランキングテーブルのソートイベント設定
        document.querySelectorAll('#tab-content-ranking th[data-sort]').forEach(th => {
            th.addEventListener('click', (e) => {
                const role = e.currentTarget.dataset.role;
                const key = e.currentTarget.dataset.sort;
                handleRankingSort(role, key);
            });
        });

        // フィルタ制御（全タブ連動・即時反映）
        document.getElementById('btn-apply-dashboard-filter').addEventListener('click', applyFiltersAndRender);
        ['db-filter-date-from', 'db-filter-date-to', 'db-filter-outcome', 'db-filter-first-score'].forEach(id => {
            document.getElementById(id)?.addEventListener('change', applyFiltersAndRender);
        });
        ['db-filter-team-regex', 'db-filter-category'].forEach(id => {
            document.getElementById(id)?.addEventListener('change', applyFiltersAndRender);
            document.getElementById(id)?.addEventListener('input', applyFiltersAndRender);
        });
        document.getElementById('btn-clear-dashboard-filter').addEventListener('click', () => {
            document.getElementById('db-filter-date-from').value = dashboardSettings.defaultFilterDate.from || '';
            document.getElementById('db-filter-date-to').value = dashboardSettings.defaultFilterDate.to || '';
            document.getElementById('db-filter-team-regex').value = dashboardSettings.defaultFilterDate.teamRegex || '';
            document.getElementById('db-filter-category').value = dashboardSettings.defaultFilterDate.category || '';
            const outcomeEl = document.getElementById('db-filter-outcome');
            if (outcomeEl) outcomeEl.value = dashboardSettings.defaultFilterDate.outcome || 'all';
            const firstScoreEl = document.getElementById('db-filter-first-score');
            if (firstScoreEl) firstScoreEl.value = dashboardSettings.defaultFilterDate.firstScore || 'all';
            applyFiltersAndRender();
        });

        ['ps-mode', 'ps-player', 'ps-role', 'ps-limit-games', 'ps-ma-unit', 'ps-ma-window'].forEach(id => document.getElementById(id)?.addEventListener('change', () => {
            const unit = document.getElementById('ps-ma-unit')?.value;
            const labelEl = document.getElementById('ps-ma-window-label');
            if (labelEl) labelEl.textContent = unit === 'ab' ? '打数/登板' : '試合';
            const isSingle = document.getElementById('ps-mode')?.value === 'single';
            document.getElementById('ps-player-select-wrap')?.classList.toggle('hidden', !isSingle);
            renderPersonalSummary();
        }));
        document.getElementById('btn-export-ps-csv')?.addEventListener('click', handleExportPsCsv);
        document.getElementById('btn-print-ps')?.addEventListener('click', () => window.print());

        document.getElementById('comp-players-list')?.addEventListener('change', renderComparison);
        ['comp-role', 'comp-calc-mode'].forEach(id => {
            document.getElementById(id)?.addEventListener('change', renderComparison);
        });
        document.getElementById('comp-ma-window')?.addEventListener('change', renderComparison);
        document.getElementById('comp-ma-window')?.addEventListener('input', renderComparison);

        document.getElementById('btn-add-home-team')?.addEventListener('click', handleAddHomeTeam);
        
        document.getElementById('btn-save-default-date')?.addEventListener('click', async () => {
            const from = document.getElementById('setting-default-date-from').value;
            const to = document.getElementById('setting-default-date-to').value;
            const teamRegex = document.getElementById('setting-default-team-regex').value.trim();
            const category = document.getElementById('setting-default-category').value.trim();
            const outcome = document.getElementById('setting-default-outcome')?.value || 'all';
            const firstScore = document.getElementById('setting-default-first-score')?.value || 'all';
            
            const updatedFilter = { from, to, teamRegex, category, outcome, firstScore, _updatedAt: Date.now() };
            localStorage.setItem('ants_defaultFilterDate', JSON.stringify(updatedFilter));
            
            showLoading('デフォルトのフィルタ設定を保存中 (DB同期)...');
            try {
                await syncDashboardSettingToDb('defaultFilterDate', updatedFilter, 'DASHBOARD_DEFAULT_FILTER', updatedFilter);
                updateSettingsSyncStatusUi(true, 'デフォルト設定をSupabase DBへ保存・同期しました');
                alert('デフォルトのフィルタ設定をDBに保存し、同期しました。');
            } catch (e) {
                console.error('Supabase sync failed', e);
                updateSettingsSyncStatusUi(false, `DB同期に失敗 (このブラウザのみ保存): ${e.message}`);
                alert('DBへの同期に失敗しましたが、このブラウザには保存されました: ' + e.message);
            } finally {
                hideLoading();
            }
            
            dashboardSettings.defaultFilterDate = updatedFilter;

            const filterDateFrom = document.getElementById('db-filter-date-from');
            const filterDateTo = document.getElementById('db-filter-date-to');
            const filterTeamRegex = document.getElementById('db-filter-team-regex');
            const filterCategory = document.getElementById('db-filter-category');
            const filterOutcome = document.getElementById('db-filter-outcome');
            const filterFirstScore = document.getElementById('db-filter-first-score');

            if (filterDateFrom) filterDateFrom.value = from;
            if (filterDateTo) filterDateTo.value = to;
            if (filterTeamRegex) filterTeamRegex.value = teamRegex;
            if (filterCategory) filterCategory.value = category;
            if (filterOutcome) filterOutcome.value = outcome;
            if (filterFirstScore) filterFirstScore.value = firstScore;

            applyFiltersAndRender();
        });
    }
}

function switchDashboardTab(tabName) {
    const filterVisibleTabs = new Set(['team-summary', 'personal-summary', 'ranking', 'comparison', 'detail-analysis']);
    document.querySelectorAll('#dashboard-tabs button').forEach(b => {
        b.classList.remove('text-blue-600', 'border-blue-600');
        b.classList.add('text-gray-500', 'border-transparent');
    });
    ['team-summary', 'personal-summary', 'ranking', 'comparison', 'settings', 'import-data', 'detail-analysis'].forEach(t => {
        document.getElementById(`tab-content-${t}`)?.classList.add('hidden');
    });

    const activeBtn = document.querySelector(`#dashboard-tabs button[data-tab="${tabName}"]`);
    if (activeBtn) {
        activeBtn.classList.remove('text-gray-500', 'border-transparent');
        activeBtn.classList.add('text-blue-600', 'border-blue-600');
    }
    document.getElementById(`tab-content-${tabName}`)?.classList.remove('hidden');

    const commonFilterEl = document.getElementById('dashboard-common-filter');
    if (commonFilterEl) {
        commonFilterEl.classList.toggle('hidden', !filterVisibleTabs.has(tabName));
    }
}

async function syncDashboardSettingToDb(dashKey, dashValue, masterKey, masterDataValue) {
    const [resMaster, resDash] = await Promise.all([
        supabaseClient.from('master_data').upsert(
            { key: masterKey, data: masterDataValue },
            { onConflict: 'key' }
        ),
        supabaseClient.from('dashboard_settings').upsert(
            { key: dashKey, value: dashValue },
            { onConflict: 'key' }
        )
    ]);
    if (resMaster.error && resDash.error) {
        throw resMaster.error;
    }
    if (resMaster.error) console.warn('master_data upsert warning:', resMaster.error);
    if (resDash.error) console.warn('dashboard_settings upsert warning:', resDash.error);
}

function updateSettingsSyncStatusUi(isSynced, customMsg = '') {
    const el = document.getElementById('settings-db-sync-status');
    if (!el) return;
    if (isSynced) {
        el.textContent = `✅ ${customMsg || 'DB (Supabase) と同期済みです（LocalStorageによる上書きは無効化）'}`;
        el.className = 'text-xs font-bold mb-3 text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded';
    } else {
        el.textContent = `⚠️ ${customMsg || 'DBに設定が未登録のため初期値・ローカルキャッシュを表示中（「設定を保存」でDB同期できます）'}`;
        el.className = 'text-xs font-bold mb-3 text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded';
    }
}

// --- ダッシュボードデータ処理・グラフ描画 ---
async function loadDashboardData() {
    showLoading('成績データを読み込み中...');
    try {
        const [
            { data: gamesData, error: gamesErr },
            { data: bStatsData, error: bStatsErr },
            { data: pStatsData, error: pStatsErr },
            { data: plData },
            { data: settingsData },
            { data: masterSettingsData },
            { data: detailRowsData }
        ] = await Promise.all([
            supabaseClient.from('games').select('*').order('date', { ascending: true }),
            supabaseClient.from('batter_stats').select('*'),
            supabaseClient.from('pitcher_stats').select('*'),
            supabaseClient.from('players').select('*'),
            supabaseClient.from('dashboard_settings').select('*'),
            supabaseClient.from('master_data').select('key, data').in('key', ['DASHBOARD_DEFAULT_FILTER', 'DASHBOARD_HOME_TEAMS']),
            supabaseClient.from('master_data').select('key, data').like('key', 'SCORER_GAME_DETAIL_%')
        ]);
        
        if (gamesErr) throw gamesErr;
        if (bStatsErr) throw bStatsErr;
        if (pStatsErr) throw pStatsErr;

        allGames = gamesData || [];
        allBatterStats = bStatsData || [];
        allPitcherStats = pStatsData || [];
        allPlayers = plData || [];

        allGameDetails = (detailRowsData || [])
            .map(row => row?.data)
            .filter(d => d && (d.gid !== undefined || d.cd))
            .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')) || ((b.gid || 0) - (a.gid || 0)));
        
        // デフォルト初期値の定義
        let homeTeamNames = ['ありんこアントス@A軍'];
        let defaultFilterDate = { from: '', to: '', teamRegex: '', category: '', outcome: 'all', firstScore: 'all' };
        let loadedHomeFromDb = false;
        let loadedFilterFromDb = false;
        let bestHomeTs = -1;
        let bestFilterTs = -1;

        const parseMaybeJson = (v) => {
            if (typeof v === 'string') {
                try { return JSON.parse(v); } catch (e) { return null; }
            }
            return v;
        };

        // 1. DB (Supabase: master_data & dashboard_settings) からの設定を最優先で読み込み
        if (Array.isArray(settingsData)) {
            const homeObj = settingsData.find(s => s.key === 'homeTeamNames');
            const homeVal = parseMaybeJson(homeObj?.value);
            if (Array.isArray(homeVal) && homeVal.length > 0) {
                homeTeamNames = homeVal;
                loadedHomeFromDb = true;
                bestHomeTs = 0;
            }
            const filterObj = settingsData.find(s => s.key === 'defaultFilterDate');
            const filterVal = parseMaybeJson(filterObj?.value);
            if (filterVal && typeof filterVal === 'object') {
                defaultFilterDate = {
                    from: filterVal.from || '',
                    to: filterVal.to || '',
                    teamRegex: filterVal.teamRegex || '',
                    category: filterVal.category || '',
                    outcome: filterVal.outcome || 'all',
                    firstScore: filterVal.firstScore || 'all',
                };
                loadedFilterFromDb = true;
                bestFilterTs = Number(filterVal._updatedAt || 0);
            }
        }

        if (Array.isArray(masterSettingsData)) {
            const mHome = masterSettingsData.find(m => m.key === 'DASHBOARD_HOME_TEAMS');
            const mHomeData = parseMaybeJson(mHome?.data);
            if (mHomeData) {
                const teams = Array.isArray(mHomeData) ? mHomeData : (Array.isArray(mHomeData.teams) ? mHomeData.teams : null);
                const ts = Number(mHomeData._updatedAt || 1);
                if (teams && teams.length > 0 && (!loadedHomeFromDb || ts >= bestHomeTs)) {
                    homeTeamNames = teams;
                    loadedHomeFromDb = true;
                    bestHomeTs = ts;
                }
            }
            const mFilter = masterSettingsData.find(m => m.key === 'DASHBOARD_DEFAULT_FILTER');
            const mFilterData = parseMaybeJson(mFilter?.data);
            if (mFilterData && typeof mFilterData === 'object') {
                const ts = Number(mFilterData._updatedAt || 1);
                if (!loadedFilterFromDb || ts >= bestFilterTs) {
                    defaultFilterDate = {
                        from: mFilterData.from || '',
                        to: mFilterData.to || '',
                        teamRegex: mFilterData.teamRegex || '',
                        category: mFilterData.category || '',
                        outcome: mFilterData.outcome || 'all',
                        firstScore: mFilterData.firstScore || 'all',
                    };
                    loadedFilterFromDb = true;
                    bestFilterTs = ts;
                }
            }
        }

        // 2. DBに値が存在すれば localStorage を DB の値で上書き（LocalStorage優先バグを完全排除）
        // DBに未登録の場合のみ localStorage をフォールバック参照する
        if (loadedHomeFromDb) {
            localStorage.setItem('ants_homeTeamNames', JSON.stringify(homeTeamNames));
        } else {
            const localHomeTeams = localStorage.getItem('ants_homeTeamNames');
            if (localHomeTeams) {
                try {
                    const parsed = JSON.parse(localHomeTeams);
                    if (Array.isArray(parsed) && parsed.length > 0) homeTeamNames = parsed;
                } catch (e) {}
            }
        }

        if (loadedFilterFromDb) {
            localStorage.setItem('ants_defaultFilterDate', JSON.stringify(defaultFilterDate));
        } else {
            const localDefaultFilter = localStorage.getItem('ants_defaultFilterDate');
            if (localDefaultFilter) {
                try {
                    const parsed = JSON.parse(localDefaultFilter);
                    defaultFilterDate = {
                        from: parsed.from || '',
                        to: parsed.to || '',
                        teamRegex: parsed.teamRegex || '',
                        category: parsed.category || '',
                        outcome: parsed.outcome || 'all',
                        firstScore: parsed.firstScore || 'all',
                    };
                } catch (e) {}
            }
        }

        updateSettingsSyncStatusUi(loadedFilterFromDb || loadedHomeFromDb);

        dashboardSettings.homeTeamNames = homeTeamNames;
        dashboardSettings.defaultFilterDate = defaultFilterDate;

        renderHomeTeamList();
        const setFromEl = document.getElementById('setting-default-date-from');
        const setToEl = document.getElementById('setting-default-date-to');
        const setRegexEl = document.getElementById('setting-default-team-regex');
        const setCatEl = document.getElementById('setting-default-category');
        const setOutcomeEl = document.getElementById('setting-default-outcome');
        const setFirstScoreEl = document.getElementById('setting-default-first-score');

        if (setFromEl) setFromEl.value = dashboardSettings.defaultFilterDate.from || '';
        if (setToEl) setToEl.value = dashboardSettings.defaultFilterDate.to || '';
        if (setRegexEl) setRegexEl.value = dashboardSettings.defaultFilterDate.teamRegex || '';
        if (setCatEl) setCatEl.value = dashboardSettings.defaultFilterDate.category || '';
        if (setOutcomeEl) setOutcomeEl.value = dashboardSettings.defaultFilterDate.outcome || 'all';
        if (setFirstScoreEl) setFirstScoreEl.value = dashboardSettings.defaultFilterDate.firstScore || 'all';

        if (!isFilterInitialized) {
            document.getElementById('btn-clear-dashboard-filter').click(); // 初回ロード時にDBのデフォルトフィルタを適用
            isFilterInitialized = true;
        } else {
            applyFiltersAndRender();
        }
    } catch (e) {
        console.error(e);
        alert('成績データの取得に失敗しました: ' + e.message);
    } finally {
        hideLoading();
    }
}

// 自チーム名にマッチするか判定する共通関数 (部分一致・チーム名表記ブレ対応)
function isHomeTeam(teamName) {
    if (!teamName) return false;
    const trimmed = teamName.trim();
    // 単に「ありんこ」のみ、「アントス」のみとなっているものは除外
    if (trimmed === 'ありんこ' || trimmed === 'アントス') return false;

    return dashboardSettings.homeTeamNames.some(name => {
        if (!name) return false;
        const cleanName = name.replace(/@.*$/, '').trim();
        const cleanTeam = teamName.replace(/@.*$/, '').trim();
        try {
            if (new RegExp(name, 'i').test(teamName) || new RegExp(cleanName, 'i').test(cleanTeam)) return true;
        } catch (e) {}
        return teamName.includes(name) || name.includes(teamName) ||
               (cleanName && cleanTeam && (cleanTeam.includes(cleanName) || cleanName.includes(cleanTeam)));
    });
}

// 試合結果の得点をパースして自チーム得点 (tr) と相手チーム得点 (or) を取得するヘルパー関数
function getGameScores(g) {
    const isAntsFirst = isHomeTeam(g.team_first);
    let tr = 0, or = 0;

    // スコア文字列から数字を抽出 (例: "5 - 3", "5-3", "5 - 3 (5回コールド)")
    if (g.score && typeof g.score === 'string') {
        const matches = g.score.match(/\d+/g);
        if (matches && matches.length >= 2) {
            const s1 = parseInt(matches[0], 10);
            const s2 = parseInt(matches[1], 10);
            if (isAntsFirst) {
                tr = s1;
                or = s2;
            } else {
                tr = s2;
                or = s1;
            }
            return { tr, or, isAntsFirst };
        }
    }

    const r1 = parseInt(g.runs_first ?? g.score_first ?? 0, 10) || 0;
    const r2 = parseInt(g.runs_second ?? g.score_second ?? 0, 10) || 0;
    if (isAntsFirst) {
        tr = r1;
        or = r2;
    } else {
        tr = r2;
        or = r1;
    }

    return { tr, or, isAntsFirst };
}

// 試合の先制点状況を判定するヘルパー関数
// 返り値: 'scored' (自チームが先制), 'conceded' (相手チームが先制), 'unknown' (判定不能または0-0)
function getFirstScoreStatus(g) {
    const isAntsFirst = isHomeTeam(g.team_first);

    // 1. プロパティの直接チェック
    if (g.first_score_team) {
        return isHomeTeam(g.first_score_team) ? 'scored' : 'conceded';
    }
    if (g.first_scored !== undefined && g.first_scored !== null) {
        if (g.first_scored === 'home' || g.first_scored === true || g.first_scored === 1) return 'scored';
        if (g.first_scored === 'opp' || g.first_scored === false || g.first_scored === 0) return 'conceded';
    }

    // 2. イニング詳細スコア (例: "1,0,2,0|0,1,0,0") のチェック
    const inningStr = g.inning_scores || g.score_detail || g.innings;
    if (inningStr && typeof inningStr === 'string' && inningStr.includes('|')) {
        const [topStr, botStr] = inningStr.split('|');
        const topScores = topStr.split(/[,-]/).map(s => parseInt(s.trim(), 10) || 0);
        const botScores = botStr.split(/[,-]/).map(s => parseInt(s.trim(), 10) || 0);
        const maxLen = Math.max(topScores.length, botScores.length);

        for (let i = 0; i < maxLen; i++) {
            const topRuns = topScores[i] || 0;
            const botRuns = botScores[i] || 0;

            if (topRuns > 0 && botRuns === 0) {
                return isAntsFirst ? 'scored' : 'conceded';
            } else if (botRuns > 0 && topRuns === 0) {
                return isAntsFirst ? 'conceded' : 'scored';
            } else if (topRuns > 0 && botRuns > 0) {
                return isAntsFirst ? 'scored' : 'conceded';
            }
        }
    }

    // 3. 得点・失点および先攻/後攻からの推定ロジック
    const { tr: ourRuns, or: oppRuns } = getGameScores(g);

    if (ourRuns === 0 && oppRuns === 0) return 'unknown';

    // 完封勝ち/完封負け
    if (ourRuns > 0 && oppRuns === 0) return 'scored';
    if (oppRuns > 0 && ourRuns === 0) return 'conceded';

    // 先攻チーム (表攻撃) が得点している場合、先攻が先制と判定
    if (isAntsFirst) {
        return ourRuns > 0 ? 'scored' : 'conceded';
    } else {
        return oppRuns > 0 ? 'conceded' : 'scored';
    }
}

function normalizeIsoDate(daStr) {
    if (!daStr) return '';
    const parts = String(daStr).split('T')[0].replace(/\//g, '-').split('-');
    if (parts.length === 3) {
        const y = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10);
        const d = parseInt(parts[2], 10);
        if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
            return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        }
    }
    return '';
}

function normalizePlayerNameKey(name) {
    return String(name || '').replace(/髙/g, '高').replace(/[\s　]+/g, '').trim();
}

let currentFiltered = { games: [], bStats: [], pStats: [] };
function applyFiltersAndRender() {
    const from = document.getElementById('db-filter-date-from').value;
    const to = document.getElementById('db-filter-date-to').value;
    const teamRegexStr = document.getElementById('db-filter-team-regex').value;
    const categoryStr = document.getElementById('db-filter-category').value;
    const outcomeFilter = document.getElementById('db-filter-outcome')?.value || 'all';
    const firstScoreFilter = document.getElementById('db-filter-first-score')?.value || 'all';

    let regex = null;
    if (teamRegexStr) {
        try { regex = new RegExp(teamRegexStr, 'i'); } catch(e){}
    }
    const categories = categoryStr ? categoryStr.split(',').map(s=>s.trim()).filter(s=>s) : [];

    const filteredGames = allGames.filter(g => {
        const teamFirstStr = (g.team_first || '').trim();
        const teamSecondStr = (g.team_second || '').trim();
        const titleCategoryStr = (g.title || '') + (g.category || '');

        // チーム名が「ありんこ」のみ、または「アントス」のみの試合は除外
        if (teamFirstStr === 'ありんこ' || teamFirstStr === 'アントス' ||
            teamSecondStr === 'ありんこ' || teamSecondStr === 'アントス') {
            return false;
        }

        // タイトル・カテゴリ・チーム名に「紅白」が含まれる試合は除外
        if (titleCategoryStr.includes('紅白') || teamFirstStr.includes('紅白') || teamSecondStr.includes('紅白')) {
            return false;
        }

        // 自チームが先攻・後攻のいずれかに含まれる試合のみを抽出
        const isHomeFirst = isHomeTeam(g.team_first);
        const isHomeSecond = isHomeTeam(g.team_second);

        // 両方が自チーム（＝身内戦・紅白戦）の場合は除外
        if (isHomeFirst && isHomeSecond) return false;
        if (!isHomeFirst && !isHomeSecond) return false;

        const dateStr = normalizeIsoDate(g.date);
        if (from && dateStr < from) return false;
        if (to && dateStr > to) return false;
        if (categories.length > 0 && !categories.some(cat => (g.title || '').includes(cat) || (g.category || '').includes(cat))) return false;
        if (regex) {
            const oppTeam = isHomeFirst ? teamSecondStr : teamFirstStr;
            if (!regex.test(oppTeam)) return false;
        }

        // 勝敗結果フィルタ (win: 勝ち試合のみ, loss: 負け試合のみ, draw: 引き分けのみ)
        if (outcomeFilter !== 'all') {
            const { tr: ourRuns, or: oppRuns } = getGameScores(g);

            if (outcomeFilter === 'win' && ourRuns <= oppRuns) return false;
            if (outcomeFilter === 'loss' && ourRuns >= oppRuns) return false;
            if (outcomeFilter === 'draw' && ourRuns !== oppRuns) return false;
        }

        // 先制点フィルタ (scored: 先制点を取った試合, conceded: 先制点を取られた試合)
        if (firstScoreFilter !== 'all') {
            const firstStatus = getFirstScoreStatus(g);
            if (firstScoreFilter === 'scored' && firstStatus !== 'scored') return false;
            if (firstScoreFilter === 'conceded' && firstStatus !== 'conceded') return false;
        }

        return true;
    });

    const gameIds = new Set(filteredGames.map(g => g.id));
    const filteredBStats = allBatterStats.filter(s => gameIds.has(s.game_id));
    const filteredPStats = allPitcherStats.filter(s => gameIds.has(s.game_id));

    currentFiltered = { games: filteredGames, bStats: filteredBStats, pStats: filteredPStats };

    // フィルタ結果に含まれる選手のみをリストに表示する
    const activePlayerIds = new Set();
    filteredBStats.forEach(s => activePlayerIds.add(s.player_id));
    filteredPStats.forEach(s => activePlayerIds.add(s.player_id));
    const activePlayers = allPlayers.filter(p => activePlayerIds.has(p.id)).sort((a, b) => a.name.localeCompare(b.name));

    const psSel = document.getElementById('ps-player');
    if (psSel) {
        const currentVal = psSel.value;
        psSel.innerHTML = activePlayers.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
        if (currentVal && activePlayerIds.has(parseInt(currentVal))) psSel.value = currentVal;
    }
    const cpList = document.getElementById('comp-players-list');
    if (cpList) {
        const checkedVals = new Set(Array.from(document.querySelectorAll('.comp-player-cb:checked')).map(cb => cb.value));
        cpList.innerHTML = activePlayers.map(p => `<label class="flex items-center space-x-1 cursor-pointer"><input type="checkbox" value="${p.id}" class="comp-player-cb rounded text-blue-600" ${checkedVals.has(String(p.id)) ? 'checked' : ''}><span>${escapeHtml(p.name)}</span></label>`).join('');
    }

    renderTeamSummary(filteredGames, filteredBStats, filteredPStats);
    renderRanking();
    renderPersonalSummary();
    renderComparison();
    renderDetailAnalysisTab(true);
}

function renderTeamSummary(games, bStats, pStats) {
    document.getElementById('summary-games').textContent = games.length;

    const totalAtBats = bStats.reduce((sum, s) => sum + (s.at_bats || 0), 0);
    const totalHits = bStats.reduce((sum, s) => sum + (s.hits || 0), 0);
    const avg = totalAtBats > 0 ? (totalHits / totalAtBats).toFixed(3).replace(/^0/, '') : '.000';
    document.getElementById('summary-avg').textContent = avg;

    const totalRuns = bStats.reduce((sum, s) => sum + (s.runs || 0), 0);
    document.getElementById('summary-runs').textContent = totalRuns;

    const totalEarnedRuns = pStats.reduce((sum, s) => sum + (s.earned_runs || 0), 0);
    const totalOuts = pStats.reduce((sum, s) => sum + (s.outs || 0), 0);
    const era = totalOuts > 0 ? ((totalEarnedRuns * 7) / (totalOuts / 3)).toFixed(2) : '0.00';
    document.getElementById('summary-era').textContent = era;

    drawCharts(games, bStats, pStats);
}

let isChartJsLoaded = false;
function loadChartJs() {
    if (isChartJsLoaded || window.Chart) return Promise.resolve();
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = () => { isChartJsLoaded = true; resolve(); };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

async function drawCharts(games, bStats, pStats) {
    await loadChartJs();
    Object.values(charts).forEach(c => c.destroy());
    charts = {};

    const monthlyData = {};
    games.forEach(g => {
        const dateStr = g.date ? g.date.split('T')[0] : '';
        if (!dateStr) return;
        const month = dateStr.substring(0, 7);
        if (!monthlyData[month]) {
            monthlyData[month] = { atBats: 0, hits: 0, runs: 0, strikeOuts: 0, hitsAllowed: 0, walksAllowed: 0, strikes: 0, pitchCount: 0, earnedRuns: 0, outs: 0 };
        }
    });

    bStats.forEach(s => {
        const g = games.find(x => x.id === s.game_id);
        if (!g || !g.date) return;
        const m = g.date.split('T')[0].substring(0, 7);
        if(monthlyData[m]) {
            monthlyData[m].atBats += (s.at_bats || 0);
            monthlyData[m].hits += (s.hits || 0);
            monthlyData[m].runs += (s.runs || 0);
        }
    });

    pStats.forEach(s => {
        const g = games.find(x => x.id === s.game_id);
        if (!g || !g.date) return;
        const m = g.date.split('T')[0].substring(0, 7);
        if(monthlyData[m]) {
            monthlyData[m].strikeOuts += (s.strike_outs || 0);
            monthlyData[m].hitsAllowed += (s.hits_allowed || 0);
            monthlyData[m].walksAllowed += (s.walks_allowed || 0);
            monthlyData[m].strikes += (s.strikes || 0);
            monthlyData[m].pitchCount += (s.pitch_count || 0);
            monthlyData[m].earnedRuns += (s.earned_runs || 0);
            monthlyData[m].outs += (s.outs || 0);
        }
    });

    const labels = Object.keys(monthlyData).sort();
    let cumAtBats = 0, cumHits = 0;
    let cumEarnedRuns = 0, cumOuts = 0;
    const cumAvgs = [], monthlyRuns = [], monthlySOs = [], monthlyHitsAllowed = [], monthlyWalksAllowed = [], monthlySRates = [], cumERAs = [], monthlyERAs = [];

    labels.forEach(m => {
        cumAtBats += monthlyData[m].atBats;
        cumHits += monthlyData[m].hits;
        cumAvgs.push(cumAtBats > 0 ? (cumHits / cumAtBats) : 0);
        monthlyRuns.push(monthlyData[m].runs);
        monthlySOs.push(monthlyData[m].strikeOuts);
        monthlyHitsAllowed.push(monthlyData[m].hitsAllowed);
        monthlyWalksAllowed.push(monthlyData[m].walksAllowed);
        monthlySRates.push(monthlyData[m].pitchCount > 0 ? (monthlyData[m].strikes / monthlyData[m].pitchCount * 100).toFixed(1) : 0);
        
        // 月別防御率の計算
        const mEarnedRuns = monthlyData[m].earnedRuns;
        const mOuts = monthlyData[m].outs;
        const mIp = mOuts / 3;
        monthlyERAs.push(mIp > 0 ? (mEarnedRuns * 7) / mIp : 0);

        cumEarnedRuns += monthlyData[m].earnedRuns;
        cumOuts += monthlyData[m].outs;
        const ip = cumOuts / 3;
        cumERAs.push(ip > 0 ? (cumEarnedRuns * 7) / ip : 0);
    });

    charts.batting = new window.Chart(document.getElementById('chart-batting-monthly').getContext('2d'), {
        type: 'bar',
        data: {
            labels,
            datasets: [
                { label: '月間得点', type: 'bar', data: monthlyRuns, backgroundColor: 'rgba(75, 192, 192, 0.6)', yAxisID: 'y' },
                { label: '累積打率', type: 'line', data: cumAvgs, borderColor: 'rgba(255, 99, 132, 1)', yAxisID: 'y1' }
            ]
        },
        options: { responsive: true, scales: { y: { position: 'left', beginAtZero: true }, y1: { position: 'right', beginAtZero: true, min: 0, max: 1 } } }
    });

    charts.pitching = new window.Chart(document.getElementById('chart-pitching-monthly').getContext('2d'), {
        type: 'bar',
        data: {
            labels,
            datasets: [
                { label: '奪三振', data: monthlySOs, backgroundColor: 'rgba(54, 162, 235, 0.6)' },
                { label: '被安打', data: monthlyHitsAllowed, backgroundColor: 'rgba(255, 159, 64, 0.6)' },
                { label: '与四死球', data: monthlyWalksAllowed, backgroundColor: 'rgba(255, 205, 86, 0.6)' },
                { label: 'S率(%)', type: 'line', data: monthlySRates, borderColor: 'rgba(153, 102, 255, 1)', yAxisID: 'y1' },
                { label: '累積防御率', type: 'line', data: cumERAs, borderColor: 'rgba(255, 99, 132, 1)', yAxisID: 'y2' },
                { label: '月別防御率', type: 'line', data: monthlyERAs, borderColor: 'rgba(75, 192, 192, 1)', borderDash: [5, 5], yAxisID: 'y2' }
            ]
        },
        options: { 
            responsive: true, 
            scales: { 
                y: { position: 'left', beginAtZero: true }, 
                y1: { position: 'right', beginAtZero: true, min: 0, max: 100, grid: { drawOnChartArea: false } },
                y2: { position: 'right', beginAtZero: true, grid: { drawOnChartArea: false } }
            } 
        }
    });

    const gameLabels = [], teamRuns = [], oppRuns = [], cumWinRates = [], gameMetaList = [];
    let wins = 0, validGames = 0;

    games.forEach((g, idx) => {
        const dateStr = g.date ? g.date.split('T')[0] : '';
        const { tr, or, isAntsFirst } = getGameScores(g);

        const myTeam = isAntsFirst ? g.team_first : g.team_second;
        const oppTeam = isAntsFirst ? g.team_second : g.team_first;
        const titleStr = g.title || g.category || '試合';

        gameMetaList.push({
            date: dateStr,
            title: titleStr,
            myTeam: myTeam || '自チーム',
            oppTeam: oppTeam || '相手チーム',
            tr,
            or,
            isAntsFirst
        });

        teamRuns.push(tr); oppRuns.push(-or);
        if (tr > or) wins++;
        validGames++;
        cumWinRates.push(validGames > 0 ? (wins / validGames * 100).toFixed(1) : 0);

        // X軸ラベルを配列にして改行し、相手チーム名を追加
        gameLabels.push([dateStr ? dateStr.substring(5) : `G${idx+1}`, oppTeam || '']);
    });

    charts.games = new window.Chart(document.getElementById('chart-games-wl').getContext('2d'), {
        type: 'bar',
        data: { labels: gameLabels, datasets: [ { label: '得点', data: teamRuns, backgroundColor: 'rgba(75, 192, 192, 0.8)' }, { label: '失点', data: oppRuns, backgroundColor: 'rgba(255, 99, 132, 0.8)' }, { label: '累積勝率(%)', type: 'line', data: cumWinRates, borderColor: 'rgba(255, 205, 86, 1)', yAxisID: 'y1' } ] },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        title: function(tooltipItems) {
                            if (!tooltipItems.length) return '';
                            const idx = tooltipItems[0].dataIndex;
                            const meta = gameMetaList[idx];
                            if (!meta) return '';
                            return `${meta.date} 【${meta.title}】\n${meta.myTeam} vs ${meta.oppTeam}`;
                        },
                        label: function(context) {
                            const idx = context.dataIndex;
                            const meta = gameMetaList[idx];
                            const datasetLabel = context.dataset.label || '';
                            if (datasetLabel === '得点') {
                                return `得点 (${meta?.myTeam || '自チーム'}): ${context.raw} 点`;
                            } else if (datasetLabel === '失点') {
                                return `失点 (${meta?.oppTeam || '相手チーム'}): ${Math.abs(context.raw)} 点`;
                            } else if (datasetLabel === '累積勝率(%)') {
                                return `累積勝率: ${context.raw} %`;
                            }
                            return `${datasetLabel}: ${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                x: { stacked: true, ticks: { font: { size: 10 } } },
                y: { stacked: true, position: 'left' },
                y1: { position: 'right', beginAtZero: true, min: 0, max: 100 }
            }
        }
    });
}

function calcBatterStats(stats) {
    let pa=0, ab=0, h=0, tb=0, rbi=0, r=0, sb=0, bb=0, hbp=0, so=0, hr=0;
    let doubles=0, triples=0, sf=0, sh=0;
    stats.forEach(s => {
        const curPa = s.plate_appearances || 0;
        const curAb = s.at_bats || 0;
        const curH = s.hits || 0;
        const cur2b = s.doubles || 0;
        const cur3b = s.triples || 0;
        const curHr = s.home_runs || 0;
        const curBb = s.walks || 0;
        const curHbp = s.hit_by_pitch || 0;
        const curSo = s.strike_outs || (s.strikeouts || 0);
        const curSf = s.sacrifice_flies || (s.sac_flies || 0);
        const curSh = s.sacrifice_hits || (s.sac_bunts || 0);
        const curRbi = s.runs_batted_in || 0;
        const curR = s.runs || 0;
        const curSb = s.stolen_bases || 0;

        pa += curPa;
        ab += curAb;
        h += curH;
        doubles += cur2b;
        triples += cur3b;
        hr += curHr;
        bb += curBb;
        hbp += curHbp;
        so += curSo;
        sf += curSf;
        sh += curSh;
        rbi += curRbi;
        r += curR;
        sb += curSb;

        // 塁打（TB）の計算: 単打 = 安打 - 二塁打 - 三塁打 - 本塁打
        // 長打率 = 塁打数 / 打数 を正確に保つため、内訳（単打×1 + 二塁打×2 + 三塁打×3 + 本塁打×4）または total_bases を使用
        const cur1b = s.singles !== undefined ? s.singles : Math.max(0, curH - cur2b - cur3b - curHr);
        const calcTb = cur1b * 1 + cur2b * 2 + cur3b * 3 + curHr * 4;
        const curTb = calcTb > 0 ? calcTb : (s.total_bases || 0);
        tb += curTb;
    });

    const avgRaw = ab > 0 ? h / ab : 0;
    const avg = Math.round(avgRaw * 1000) / 1000;
    // 公認野球規則の出塁率: (安打 + 四球 + 死球) / (打数 + 四球 + 死球 + 犠飛)
    const obpDenom = ab + bb + hbp + sf;
    const obpRaw = obpDenom > 0 ? (h + bb + hbp) / obpDenom : (pa > 0 ? (h + bb + hbp) / pa : 0);
    const obp = Math.round(obpRaw * 1000) / 1000;
    // 長打率: 塁打数 / 打数
    const slgRaw = ab > 0 ? tb / ab : 0;
    const slg = Math.round(slgRaw * 1000) / 1000;
    // OPS: 出塁率 + 長打率 (小数第3位表示同士の和と完全一致するよう丸め後の値を加算)
    const ops = Math.round((obp + slg) * 1000) / 1000;

    const ob = h + bb + hbp;
    const runRate = ob > 0 ? (r / ob) : 0;

    return {
        pa, ab, h, doubles, triples, hr, tb, sf, sh, bb, hbp, rbi, r, sb, so, ob,
        avg, obp, slg, ops, runRate,
        avgStr: avg.toFixed(3).replace(/^0/, ''),
        obpStr: obp.toFixed(3).replace(/^0/, ''),
        slgStr: slg.toFixed(3).replace(/^0/, ''),
        opsStr: ops.toFixed(3),
        runRateStr: ob > 0 ? (runRate * 100).toFixed(1) + '%' : '0.0%',
        bbRate: pa > 0 ? (bb + hbp) / pa : 0,
        soRate: pa > 0 ? so / pa : 0
    };
}

function calcPitcherStats(stats) {
    let outs=0, er=0, h=0, bb=0, so=0, bf=0, pc=0, st=0, wins=0, losses=0;
    stats.forEach(s => {
        outs+=s.outs||0; er+=s.earned_runs||0; h+=s.hits_allowed||0;
        bb+=(s.walks_allowed||0)+(s.hit_batters||0); so+=s.strike_outs||0;
        bf+=s.batters_faced||0; pc+=s.pitch_count||0; st+=s.strikes||0;
        wins+=s.wins||0; losses+=s.losses||0;
    });
    const ip = outs / 3;
    const era = ip > 0 ? (er * 7) / ip : 0;
    const whip = ip > 0 ? (h + bb) / ip : 0;
    const k7 = ip > 0 ? (so * 7) / ip : 0;
    const bb7 = ip > 0 ? (bb * 7) / ip : 0;

    return {
        outs, er, h, bb, so, bf, pc, st, wins, losses,
        era, whip, k7, bb7,
        eraStr: era.toFixed(2),
        whipStr: whip.toFixed(2),
        k7Str: k7.toFixed(2),
        bb7Str: bb7.toFixed(2),
        kRate: bf > 0 ? so / bf : 0,
        bbRate: bf > 0 ? bb / bf : 0,
        kbb: bb > 0 ? so / bb : (so > 0 ? 99.9 : 0),
        sRate: pc > 0 ? st / pc : 0
    };
}

// --- タブ2: 個人成績・履歴・移動平均分析 ---
async function renderPersonalSummary() {
    await loadChartJs();
    const mode = document.getElementById('ps-mode')?.value || 'single';
    const pid = document.getElementById('ps-player')?.value;
    const role = document.getElementById('ps-role')?.value || 'batter';
    const limitGamesVal = document.getElementById('ps-limit-games')?.value || '5';
    const maUnit = document.getElementById('ps-ma-unit')?.value || 'ab';
    const maWindow = parseInt(document.getElementById('ps-ma-window')?.value || '10', 10);

    const singleContainer = document.getElementById('ps-single-container');
    const allContainer = document.getElementById('ps-all-container');
    
    if (mode === 'single') {
        singleContainer?.classList.remove('hidden');
        allContainer?.classList.add('hidden');
        if (pid) {
            renderSinglePlayerHistoryView(pid, role, limitGamesVal, maUnit, maWindow);
        }
    } else {
        singleContainer?.classList.add('hidden');
        allContainer?.classList.remove('hidden');
        renderAllPlayersHistoryView(role, limitGamesVal, maUnit, maWindow);
    }
}

// 単一選手の試合別履歴＆移動平均ビューのレンダリング
function renderSinglePlayerHistoryView(pid, role, limitGamesVal, maUnit, maWindow) {
    const { games, bStats, pStats } = currentFiltered;
    const playerName = allPlayers.find(p => p.id == pid)?.name || '選手';
    const targetStats = (role === 'batter' ? bStats : pStats).filter(s => s.player_id == pid);
    
    // 試合データとマージして日付順ソート
    const allMerged = targetStats.map(s => {
        const game = games.find(g => g.id === s.game_id);
        return {
            date: game?.date || '',
            game: game,
            stats: s
        };
    }).filter(x => x.date).sort((a, b) => a.date.localeCompare(b.date));

    // 全期間（通算）データ
    const totalCalc = role === 'batter' ? calcBatterStats(allMerged.map(x => x.stats)) : calcPitcherStats(allMerged.map(x => x.stats));

    // 直近N試合フィルター適用
    let merged = [...allMerged];
    if (limitGamesVal !== 'all') {
        const limit = parseInt(limitGamesVal, 10);
        if (merged.length > limit) {
            merged = merged.slice(merged.length - limit);
        }
    }

    const periodCalc = role === 'batter' ? calcBatterStats(merged.map(x => x.stats)) : calcPitcherStats(merged.map(x => x.stats));

    // 1. 直近ハイライトカード描画
    renderHighlightCards(playerName, role, periodCalc, totalCalc, merged);

    // 2. 移動平均データ計算
    const maData = calculateMovingAverageData(merged, role, maUnit, maWindow);

    // 3. 純粋成績推移グラフ描画（累積・実数値）
    drawRawStatsGraph(playerName, role, merged);

    // 4. 移動平均グラフ描画
    drawMovingAvgGraph(playerName, role, maData, maUnit, maWindow);

    // 5. 試合別詳細一覧テーブル描画
    renderGameDetailTable(role, merged);
}

// 直近コンディション＆ハイライトカードの表示
function renderHighlightCards(playerName, role, periodCalc, totalCalc, merged) {
    const container = document.getElementById('ps-highlight-cards');
    if (!container) return;

    if (role === 'batter') {
        const avgDiff = periodCalc.avg - totalCalc.avg;
        const diffStr = (avgDiff >= 0 ? '+' : '') + avgDiff.toFixed(3).replace(/^0/, '');
        const isHot = avgDiff >= 0.03;
        const isCold = avgDiff <= -0.05;
        const conditionBadge = isHot ? '🔥 好調' : (isCold ? '❄️ 不調' : '⚖️ 安定');
        const badgeBg = isHot ? 'bg-red-100 text-red-700 border-red-200' : (isCold ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-700 border-gray-200');

        // 連続試合安打数
        let streak = 0;
        for (let i = merged.length - 1; i >= 0; i--) {
            const h = merged[i].stats.hits || 0;
            const ab = merged[i].stats.at_bats || 0;
            if (h > 0) streak++;
            else if (ab > 0) break;
        }

        container.innerHTML = `
            <div class="bg-white p-3 rounded-lg shadow border border-gray-100">
                <div class="text-xs text-gray-500 font-bold mb-1 flex justify-between items-center">
                    <span>直近打率 vs 通算</span>
                    <span class="text-[10px] px-1.5 py-0.5 rounded border ${badgeBg}">${conditionBadge}</span>
                </div>
                <div class="text-2xl font-black text-blue-600">${periodCalc.avgStr}</div>
                <div class="text-xs ${avgDiff >= 0 ? 'text-red-500' : 'text-blue-500'} font-bold mt-0.5">
                    通算 (${totalCalc.avgStr}) 比: ${diffStr}
                </div>
            </div>
            <div class="bg-white p-3 rounded-lg shadow border border-gray-100">
                <div class="text-xs text-gray-500 font-bold mb-1">直近 OPS / 出塁率・長打率</div>
                <div class="text-2xl font-black text-purple-600">${periodCalc.opsStr}</div>
                <div class="text-xs text-gray-500 mt-0.5">出塁率: <span class="font-bold text-gray-800">${periodCalc.obpStr}</span> / 長打率: <span class="font-bold text-gray-800">${periodCalc.slgStr}</span></div>
            </div>
            <div class="bg-white p-3 rounded-lg shadow border border-gray-100">
                <div class="text-xs text-gray-500 font-bold mb-1">直近 生還率 (R/OB)</div>
                <div class="text-2xl font-black text-amber-600">${periodCalc.runRateStr}</div>
                <div class="text-xs text-gray-500 mt-0.5">出塁: <span class="font-bold text-gray-800">${periodCalc.ob}</span>回 / 得点: <span class="font-bold text-green-600">${periodCalc.r}</span></div>
            </div>
            <div class="bg-white p-3 rounded-lg shadow border border-gray-100">
                <div class="text-xs text-gray-500 font-bold mb-1">連続安打 / 打撃内訳</div>
                <div class="text-xl font-black text-gray-800">${streak} <span class="text-xs font-normal text-gray-600">試合連続</span> (${periodCalc.h}H)</div>
                <div class="text-xs text-gray-500 mt-0.5">打点: <span class="font-bold text-gray-800">${periodCalc.rbi}</span> / HR: <span class="font-bold text-red-600">${periodCalc.hr}</span></div>
            </div>
        `;
    } else {
        const eraDiff = periodCalc.era - totalCalc.era;
        const diffStr = (eraDiff <= 0 ? '' : '+') + eraDiff.toFixed(2);
        container.innerHTML = `
            <div class="bg-white p-3 rounded-lg shadow border border-gray-100">
                <div class="text-xs text-gray-500 font-bold mb-1">直近 防御率 vs 通算</div>
                <div class="text-2xl font-black text-red-600">${periodCalc.eraStr}</div>
                <div class="text-xs ${eraDiff <= 0 ? 'text-green-600' : 'text-red-500'} font-bold mt-0.5">
                    通算 (${totalCalc.eraStr}) 比: ${diffStr}
                </div>
            </div>
            <div class="bg-white p-3 rounded-lg shadow border border-gray-100">
                <div class="text-xs text-gray-500 font-bold mb-1">直近 WHIP</div>
                <div class="text-2xl font-black text-blue-600">${periodCalc.whipStr}</div>
                <div class="text-xs text-gray-500 mt-0.5">被安打: ${periodCalc.h} / 与四死: ${periodCalc.bb}</div>
            </div>
            <div class="bg-white p-3 rounded-lg shadow border border-gray-100">
                <div class="text-xs text-gray-500 font-bold mb-1">直近 投球回・奪三振</div>
                <div class="text-xl font-black text-gray-800">${(periodCalc.outs/3).toFixed(1)} <span class="text-xs font-normal text-gray-500">回</span> ${periodCalc.so} <span class="text-xs font-normal text-gray-500">K</span></div>
                <div class="text-xs text-gray-500 mt-0.5">K/7: <span class="font-bold text-gray-800">${periodCalc.k7Str}</span></div>
            </div>
            <div class="bg-white p-3 rounded-lg shadow border border-gray-100">
                <div class="text-xs text-gray-500 font-bold mb-1">ストライク率</div>
                <div class="text-2xl font-black text-green-600">${(periodCalc.sRate * 100).toFixed(1)}%</div>
                <div class="text-xs text-gray-500 mt-0.5">球数: ${periodCalc.pc} (S: ${periodCalc.st})</div>
            </div>
        `;
    }
}

// 移動平均データの計算処理
function calculateMovingAverageData(merged, role, maUnit, maWindow) {
    const results = [];
    if (merged.length === 0) return results;

    if (maUnit === 'game') {
        // 試合単位の移動平均
        for (let i = 0; i < merged.length; i++) {
            const startIdx = Math.max(0, i - maWindow + 1);
            const windowSlice = merged.slice(startIdx, i + 1);
            const stats = windowSlice.map(x => x.stats);
            const calc = role === 'batter' ? calcBatterStats(stats) : calcPitcherStats(stats);
            const currentGame = merged[i];
            const opp = isHomeTeam(currentGame.game?.team_first) ? currentGame.game?.team_second : currentGame.game?.team_first;

            results.push({
                label: `${currentGame.date.substring(5)} vs ${opp || ''}`,
                date: currentGame.date,
                windowSpan: `${startIdx + 1}〜${i + 1}試合目 (${windowSlice.length}試合)`,
                calc,
                stats
            });
        }
    } else {
        // 打数/登板単位の移動平均
        for (let i = 0; i < merged.length; i++) {
            let accCount = 0;
            const windowSlice = [];
            for (let j = i; j >= 0; j--) {
                windowSlice.unshift(merged[j]);
                const count = role === 'batter' ? (merged[j].stats.at_bats || 0) : 1;
                accCount += count;
                if (accCount >= maWindow) break;
            }
            const stats = windowSlice.map(x => x.stats);
            const calc = role === 'batter' ? calcBatterStats(stats) : calcPitcherStats(stats);
            const currentGame = merged[i];
            const opp = isHomeTeam(currentGame.game?.team_first) ? currentGame.game?.team_second : currentGame.game?.team_first;

            results.push({
                label: `${currentGame.date.substring(5)} vs ${opp || ''}`,
                date: currentGame.date,
                windowSpan: role === 'batter' ? `直近 ${calc.ab} 打数` : `直近 ${windowSlice.length} 登板`,
                calc,
                stats
            });
        }
    }
    return results;
}

// 純粋成績推移グラフ（累積・実数値）の描画
function drawRawStatsGraph(playerName, role, merged) {
    if (personalCharts.rawGraph) {
        personalCharts.rawGraph.destroy();
    }

    const canvas = document.getElementById('chart-ps-raw-stats');
    if (!canvas || merged.length === 0) return;

    const labels = [];
    const cumDataPoints = [];
    let runningStats = [];

    merged.forEach((m) => {
        runningStats.push(m.stats);
        const opp = isHomeTeam(m.game?.team_first) ? m.game?.team_second : m.game?.team_first;
        labels.push(`${m.date.substring(5)} vs ${opp || ''}`);
        const calc = role === 'batter' ? calcBatterStats(runningStats) : calcPitcherStats(runningStats);
        cumDataPoints.push(calc);
    });

    if (role === 'batter') {
        personalCharts.rawGraph = new window.Chart(canvas.getContext('2d'), {
            type: 'line',
            data: {
                labels,
                datasets: [
                    { label: '累積打率', data: cumDataPoints.map(d => d.avg), borderColor: '#ef4444', backgroundColor: '#ef4444', tension: 0.2 },
                    { label: '累積出塁率', data: cumDataPoints.map(d => d.obp), borderColor: '#3b82f6', backgroundColor: '#3b82f6', tension: 0.2 },
                    { label: '累積OPS', data: cumDataPoints.map(d => d.ops), borderColor: '#8b5cf6', backgroundColor: '#8b5cf6', borderDash: [4, 4], tension: 0.2 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' }
                },
                scales: {
                    y: { min: 0, ticks: { font: { size: 10 } } },
                    x: { ticks: { font: { size: 10 }, maxRotation: 45 } }
                }
            }
        });
    } else {
        personalCharts.rawGraph = new window.Chart(canvas.getContext('2d'), {
            type: 'line',
            data: {
                labels,
                datasets: [
                    { label: '累積防御率', data: cumDataPoints.map(d => d.era), borderColor: '#ef4444', backgroundColor: '#ef4444', tension: 0.2 },
                    { label: '累積WHIP', data: cumDataPoints.map(d => d.whip), borderColor: '#3b82f6', backgroundColor: '#3b82f6', tension: 0.2 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' }
                },
                scales: {
                    y: { min: 0, ticks: { font: { size: 10 } } },
                    x: { ticks: { font: { size: 10 }, maxRotation: 45 } }
                }
            }
        });
    }
}

// 移動平均グラフの描画
function drawMovingAvgGraph(playerName, role, maData, maUnit, maWindow) {
    const subtitleEl = document.getElementById('ps-ma-graph-subtitle');
    if (subtitleEl) {
        subtitleEl.textContent = `(${playerName} - 直近${maWindow}${maUnit === 'ab' ? '打数/登板' : '試合'}移動平均)`;
    }

    if (personalCharts.maGraph) {
        personalCharts.maGraph.destroy();
    }

    const labels = maData.map(d => d.label);
    const canvas = document.getElementById('chart-ps-moving-avg');
    if (!canvas) return;

    if (role === 'batter') {
        personalCharts.maGraph = new window.Chart(canvas.getContext('2d'), {
            type: 'line',
            data: {
                labels,
                datasets: [
                    { label: '移動平均 打率', data: maData.map(d => d.calc.avg), borderColor: '#ef4444', backgroundColor: '#ef4444', tension: 0.2 },
                    { label: '移動平均 出塁率', data: maData.map(d => d.calc.obp), borderColor: '#3b82f6', backgroundColor: '#3b82f6', tension: 0.2 },
                    { label: '移動平均 OPS', data: maData.map(d => d.calc.ops), borderColor: '#8b5cf6', backgroundColor: '#8b5cf6', borderDash: [4, 4], tension: 0.2 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' }
                },
                scales: {
                    y: { min: 0, ticks: { font: { size: 10 } } },
                    x: { ticks: { font: { size: 10 }, maxRotation: 45 } }
                }
            }
        });
    } else {
        personalCharts.maGraph = new window.Chart(canvas.getContext('2d'), {
            type: 'line',
            data: {
                labels,
                datasets: [
                    { label: '移動平均 防御率', data: maData.map(d => d.calc.era), borderColor: '#ef4444', backgroundColor: '#ef4444', tension: 0.2 },
                    { label: '移動平均 WHIP', data: maData.map(d => d.calc.whip), borderColor: '#3b82f6', backgroundColor: '#3b82f6', tension: 0.2 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' }
                },
                scales: {
                    y: { min: 0, ticks: { font: { size: 10 } } },
                    x: { ticks: { font: { size: 10 }, maxRotation: 45 } }
                }
            }
        });
    }
}

// 試合別詳細成績一覧テーブルの描画
function renderGameDetailTable(role, merged) {
    const thead = document.getElementById('ps-game-thead');
    const tbody = document.getElementById('ps-game-tbody');
    const labelEl = document.getElementById('ps-game-count-label');
    if (!thead || !tbody) return;

    if (labelEl) labelEl.textContent = `対象全 ${merged.length} 試合（最新順）`;

    // テーブル用に新しい順にソート
    const reversedMerged = [...merged].reverse();

    if (role === 'batter') {
        thead.innerHTML = `
            <tr>
                <th class="p-2 border">日付</th>
                <th class="p-2 border">相手チーム</th>
                <th class="p-2 border text-center">打席</th>
                <th class="p-2 border text-center">打数</th>
                <th class="p-2 border text-center font-bold text-green-600">安打</th>
                <th class="p-2 border text-center">1B</th>
                <th class="p-2 border text-center">2B</th>
                <th class="p-2 border text-center">3B</th>
                <th class="p-2 border text-center text-red-600">HR</th>
                <th class="p-2 border text-center">打点</th>
                <th class="p-2 border text-center">得点</th>
                <th class="p-2 border text-center">四球</th>
                <th class="p-2 border text-center">死球</th>
                <th class="p-2 border text-center">三振</th>
                <th class="p-2 border text-center">犠打/飛</th>
                <th class="p-2 border text-center">盗塁</th>
                <th class="p-2 border text-center">失策</th>
                <th class="p-2 border text-center font-bold text-red-600">打率</th>
                <th class="p-2 border text-center font-bold text-purple-600">OPS</th>
            </tr>
        `;

        tbody.innerHTML = reversedMerged.map(m => {
            const s = m.stats;
            const opp = isHomeTeam(m.game?.team_first) ? m.game?.team_second : m.game?.team_first;
            const pa = s.plate_appearances || 0;
            const ab = s.at_bats || 0;
            const h = s.hits || 0;
            const h2 = s.doubles || 0;
            const h3 = s.triples || 0;
            const hr = s.home_runs || 0;
            const h1 = s.singles !== undefined ? s.singles : Math.max(0, h - h2 - h3 - hr);
            const rbi = s.runs_batted_in || 0;
            const r = s.runs || 0;
            const bb = s.walks || 0;
            const hbp = s.hit_by_pitch || 0;
            const so = s.strikeouts || (s.strike_outs || 0);
            const sf = s.sacrifice_flies || (s.sac_flies || 0);
            const sh = (s.sacrifice_hits || (s.sac_bunts || 0)) + sf;
            const sb = s.stolen_bases || 0;
            const err = s.errors || 0;
            const avg = ab > 0 ? (h / ab).toFixed(3).replace(/^0/, '') : '.000';
            const obpDenom = ab + bb + hbp + sf;
            const obpRaw = obpDenom > 0 ? ((h + bb + hbp) / obpDenom) : (pa > 0 ? ((h + bb + hbp) / pa) : 0);
            const obpNum = Math.round(obpRaw * 1000) / 1000;
            const obp = obpNum.toFixed(3).replace(/^0/, '');
            const calcTb = h1 + (h2 * 2) + (h3 * 3) + (hr * 4);
            const tb = calcTb > 0 ? calcTb : (s.total_bases || 0);
            const slgRaw = ab > 0 ? (tb / ab) : 0;
            const slgNum = Math.round(slgRaw * 1000) / 1000;
            const slg = slgNum.toFixed(3).replace(/^0/, '');
            const ops = (Math.round((obpNum + slgNum) * 1000) / 1000).toFixed(3);

            return `
                <tr class="hover:bg-gray-50">
                    <td class="p-2 border font-bold">${m.date}</td>
                    <td class="p-2 border">${opp || '不明'}</td>
                    <td class="p-2 border text-center">${pa}</td>
                    <td class="p-2 border text-center font-bold">${ab}</td>
                    <td class="p-2 border text-center text-green-600 font-bold ${h > 0 ? 'bg-green-50' : ''}">${h}</td>
                    <td class="p-2 border text-center">${h1}</td>
                    <td class="p-2 border text-center">${h2}</td>
                    <td class="p-2 border text-center">${h3}</td>
                    <td class="p-2 border text-center text-red-600 font-bold ${hr > 0 ? 'bg-red-50' : ''}">${hr}</td>
                    <td class="p-2 border text-center font-bold">${rbi}</td>
                    <td class="p-2 border text-center">${r}</td>
                    <td class="p-2 border text-center">${bb}</td>
                    <td class="p-2 border text-center">${hbp}</td>
                    <td class="p-2 border text-center text-gray-500">${so}</td>
                    <td class="p-2 border text-center">${sh}</td>
                    <td class="p-2 border text-center">${sb}</td>
                    <td class="p-2 border text-center text-gray-500">${err}</td>
                    <td class="p-2 border text-center font-black text-red-600">${avg}</td>
                    <td class="p-2 border text-center font-bold text-purple-700 bg-purple-50">${ops}</td>
                </tr>
            `;
        }).join('');
    } else {
        thead.innerHTML = `
            <tr>
                <th class="p-2 border">日付</th>
                <th class="p-2 border">相手チーム</th>
                <th class="p-2 border text-center">投球回</th>
                <th class="p-2 border text-center">球数(S)</th>
                <th class="p-2 border text-center">被安打</th>
                <th class="p-2 border text-center">被HR</th>
                <th class="p-2 border text-center">与四球</th>
                <th class="p-2 border text-center">与死球</th>
                <th class="p-2 border text-center font-bold text-green-600">奪三振</th>
                <th class="p-2 border text-center text-red-600">失点</th>
                <th class="p-2 border text-center text-red-600">自責点</th>
                <th class="p-2 border text-center font-bold text-red-600">防御率</th>
                <th class="p-2 border text-center font-bold text-blue-600">WHIP</th>
            </tr>
        `;

        tbody.innerHTML = reversedMerged.map(m => {
            const s = m.stats;
            const opp = isHomeTeam(m.game?.team_first) ? m.game?.team_second : m.game?.team_first;
            const outs = s.outs || 0;
            const ipStr = `${Math.floor(outs/3)}${outs%3 !== 0 ? '.'+outs%3 : ''}`;
            const pc = s.pitch_count || 0;
            const st = s.strikes || 0;
            const h = s.hits_allowed || 0;
            const hr = s.home_runs_allowed || 0;
            const bb = s.walks_allowed || 0;
            const hbp = s.hit_batters || 0;
            const so = s.strike_outs || 0;
            const r = s.runs_allowed || 0;
            const er = s.earned_runs || 0;
            const ip = outs / 3;
            const era = ip > 0 ? ((er * 7) / ip).toFixed(2) : '0.00';
            const whip = ip > 0 ? ((h + bb) / ip).toFixed(2) : '0.00';

            return `
                <tr class="hover:bg-gray-50">
                    <td class="p-2 border font-bold">${m.date}</td>
                    <td class="p-2 border">${opp || '不明'}</td>
                    <td class="p-2 border text-center font-bold">${ipStr}</td>
                    <td class="p-2 border text-center">${pc} (${st})</td>
                    <td class="p-2 border text-center">${h}</td>
                    <td class="p-2 border text-center text-red-600">${hr}</td>
                    <td class="p-2 border text-center">${bb}</td>
                    <td class="p-2 border text-center">${hbp}</td>
                    <td class="p-2 border text-center text-green-600 font-bold">${so}</td>
                    <td class="p-2 border text-center text-red-600">${r}</td>
                    <td class="p-2 border text-center text-red-600 font-bold">${er}</td>
                    <td class="p-2 border text-center font-black text-red-600">${era}</td>
                    <td class="p-2 border text-center font-bold text-blue-600">${whip}</td>
                </tr>
            `;
        }).join('');
    }
}

// 全選手一括モードの描画
function renderAllPlayersHistoryView(role, limitGamesVal, maUnit, maWindow) {
    const titleEl = document.getElementById('ps-all-title');
    const subtitleEl = document.getElementById('ps-all-subtitle');
    const thead = document.getElementById('ps-all-thead');
    const tbody = document.getElementById('ps-all-tbody');
    if (!thead || !tbody) return;

    const { games, bStats, pStats } = currentFiltered;
    const limitLabel = limitGamesVal === 'all' ? '全試合' : `直近 ${limitGamesVal} 試合`;
    if (titleEl) titleEl.textContent = `👥 全選手成績一覧 (${role === 'batter' ? '打撃' : '投手'})`;
    if (subtitleEl) subtitleEl.textContent = `対象: ${limitLabel} / 移動平均: 直近${maWindow}${maUnit === 'ab' ? '打数/登板' : '試合'} (各列クリックでソート)`;

    const activePlayerIds = new Set();
    bStats.forEach(s => activePlayerIds.add(s.player_id));
    pStats.forEach(s => activePlayerIds.add(s.player_id));
    const activePlayers = allPlayers.filter(p => activePlayerIds.has(p.id)).sort((a, b) => a.name.localeCompare(b.name));

    const rows = activePlayers.map(player => {
        const pStatsList = (role === 'batter' ? bStats : pStats).filter(s => s.player_id == player.id);
        const merged = pStatsList.map(s => {
            const g = games.find(x => x.id === s.game_id);
            return { date: g?.date || '', game: g, stats: s };
        }).filter(x => x.date).sort((a, b) => a.date.localeCompare(b.date));

        // 直近N試合フィルター
        let filteredMerged = [...merged];
        if (limitGamesVal !== 'all') {
            const limit = parseInt(limitGamesVal, 10);
            if (filteredMerged.length > limit) {
                filteredMerged = filteredMerged.slice(filteredMerged.length - limit);
            }
        }

        const calcPeriod = role === 'batter' ? calcBatterStats(filteredMerged.map(x => x.stats)) : calcPitcherStats(filteredMerged.map(x => x.stats));
        const maData = calculateMovingAverageData(filteredMerged, role, maUnit, maWindow);
        const latestMa = maData.length > 0 ? maData[maData.length - 1].calc : calcPeriod;

        return {
            player,
            name: player.name,
            gameCount: filteredMerged.length,
            calcPeriod,
            latestMa,
            // ソート用キー
            ab: calcPeriod.ab,
            h: calcPeriod.h,
            hr: calcPeriod.hr,
            rbi: calcPeriod.rbi,
            r: calcPeriod.r,
            bb: calcPeriod.bb + calcPeriod.hbp,
            avg: calcPeriod.avg,
            obp: calcPeriod.obp,
            slg: calcPeriod.slg,
            ops: calcPeriod.ops,
            runRate: calcPeriod.runRate,
            maAvg: latestMa.avg,
            maOps: latestMa.ops,
            outs: calcPeriod.outs,
            so: calcPeriod.so,
            pBb: calcPeriod.bb,
            wins: calcPeriod.wins,
            losses: calcPeriod.losses,
            era: calcPeriod.era,
            whip: calcPeriod.whip,
            maEra: latestMa.era,
            maWhip: latestMa.whip
        };
    });

    const sortState = psAllSortState[role];
    rows.sort((a, b) => {
        let valA = a[sortState.key];
        let valB = b[sortState.key];
        if (valA === undefined) valA = 0;
        if (valB === undefined) valB = 0;
        if (typeof valA === 'string') {
            return sortState.order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return sortState.order === 'asc' ? valA - valB : valB - valA;
    });

    const getSortIcon = (key) => sortState.key === key ? (sortState.order === 'asc' ? ' ▲' : ' ▼') : '';

    if (role === 'batter') {
        thead.innerHTML = `
            <tr>
                <th class="p-2 border cursor-pointer select-none hover:bg-gray-200" data-ps-sort="name">選手名<span>${getSortIcon('name')}</span></th>
                <th class="p-2 border text-center cursor-pointer select-none hover:bg-gray-200" data-ps-sort="gameCount">試合数<span>${getSortIcon('gameCount')}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="ab">打数<span>${getSortIcon('ab')}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="h">安打<span>${getSortIcon('h')}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="hr">HR<span>${getSortIcon('hr')}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="rbi">打点<span>${getSortIcon('rbi')}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 text-green-700 font-bold" data-ps-sort="r">得点<span>${getSortIcon('r')}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 text-blue-700 font-bold" data-ps-sort="bb">四死球<span>${getSortIcon('bb')}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-red-600" data-ps-sort="avg">打率 (${limitLabel})<span>${getSortIcon('avg')}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-blue-600" data-ps-sort="obp">出塁率 (${limitLabel})<span>${getSortIcon('obp')}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-teal-600" data-ps-sort="slg">長打率 (${limitLabel})<span>${getSortIcon('slg')}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-purple-600" data-ps-sort="ops">OPS (${limitLabel})<span>${getSortIcon('ops')}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-amber-600" data-ps-sort="runRate">生還率 (R/OB)<span>${getSortIcon('runRate')}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-blue-600" data-ps-sort="maAvg">移動平均 打率<span>${getSortIcon('maAvg')}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-indigo-600" data-ps-sort="maOps">移動平均 OPS<span>${getSortIcon('maOps')}</span></th>
            </tr>
        `;

        tbody.innerHTML = rows.map(r => `
            <tr class="hover:bg-gray-50">
                <td class="p-2 border font-bold text-gray-800">${r.player.name}</td>
                <td class="p-2 border text-center">${r.gameCount}</td>
                <td class="p-2 border text-right font-semibold">${r.calcPeriod.ab}</td>
                <td class="p-2 border text-right text-green-600 font-bold">${r.calcPeriod.h}</td>
                <td class="p-2 border text-right">${r.calcPeriod.hr}</td>
                <td class="p-2 border text-right">${r.calcPeriod.rbi}</td>
                <td class="p-2 border text-right font-bold text-green-700">${r.calcPeriod.r}</td>
                <td class="p-2 border text-right font-bold text-blue-700">${r.calcPeriod.bb + r.calcPeriod.hbp}</td>
                <td class="p-2 border text-right font-black text-red-600">${r.calcPeriod.avgStr}</td>
                <td class="p-2 border text-right font-bold text-blue-600">${r.calcPeriod.obpStr}</td>
                <td class="p-2 border text-right font-bold text-teal-600">${r.calcPeriod.slgStr}</td>
                <td class="p-2 border text-right font-black text-purple-700 bg-purple-50">${r.calcPeriod.opsStr}</td>
                <td class="p-2 border text-right font-bold text-amber-600 bg-amber-50">${r.calcPeriod.runRateStr}</td>
                <td class="p-2 border text-right font-bold text-blue-600">${r.latestMa.avgStr}</td>
                <td class="p-2 border text-right font-bold text-indigo-600">${r.latestMa.opsStr}</td>
            </tr>
        `).join('');
    } else {
        thead.innerHTML = `
            <tr>
                <th class="p-2 border cursor-pointer select-none hover:bg-gray-200" data-ps-sort="name">選手名<span>${getSortIcon('name')}</span></th>
                <th class="p-2 border text-center cursor-pointer select-none hover:bg-gray-200" data-ps-sort="gameCount">登板数<span>${getSortIcon('gameCount')}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 text-green-700 font-bold" data-ps-sort="wins">勝利<span>${getSortIcon('wins')}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 text-red-600 font-bold" data-ps-sort="losses">敗戦<span>${getSortIcon('losses')}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="outs">投球回<span>${getSortIcon('outs')}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="so">奪三振<span>${getSortIcon('so')}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="pBb">与四死<span>${getSortIcon('pBb')}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-red-600" data-ps-sort="era">防御率 (${limitLabel})<span>${getSortIcon('era')}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-blue-600" data-ps-sort="whip">WHIP (${limitLabel})<span>${getSortIcon('whip')}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-red-500" data-ps-sort="maEra">移動平均 防御率<span>${getSortIcon('maEra')}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-blue-500" data-ps-sort="maWhip">移動平均 WHIP<span>${getSortIcon('maWhip')}</span></th>
            </tr>
        `;

        tbody.innerHTML = rows.map(r => `
            <tr class="hover:bg-gray-50">
                <td class="p-2 border font-bold text-gray-800">${r.player.name}</td>
                <td class="p-2 border text-center">${r.gameCount}</td>
                <td class="p-2 border text-right font-bold text-green-700">${r.calcPeriod.wins}</td>
                <td class="p-2 border text-right font-bold text-red-600">${r.calcPeriod.losses}</td>
                <td class="p-2 border text-right font-semibold">${(r.calcPeriod.outs/3).toFixed(1)}</td>
                <td class="p-2 border text-right text-green-600 font-bold">${r.calcPeriod.so}</td>
                <td class="p-2 border text-right">${r.calcPeriod.bb}</td>
                <td class="p-2 border text-right font-black text-red-600">${r.calcPeriod.eraStr}</td>
                <td class="p-2 border text-right font-black text-blue-600 bg-blue-50">${r.calcPeriod.whipStr}</td>
                <td class="p-2 border text-right font-bold text-red-500">${r.latestMa.eraStr}</td>
                <td class="p-2 border text-right font-bold text-blue-500">${r.latestMa.whipStr}</td>
            </tr>
        `).join('');
    }

    // 列クリック時のソートイベント登録
    thead.querySelectorAll('th[data-ps-sort]').forEach(th => {
        th.addEventListener('click', () => {
            const key = th.dataset.psSort;
            if (psAllSortState[role].key === key) {
                psAllSortState[role].order = psAllSortState[role].order === 'asc' ? 'desc' : 'asc';
            } else {
                psAllSortState[role].key = key;
                psAllSortState[role].order = (key === 'era' || key === 'whip' || key === 'maEra' || key === 'maWhip' || key === 'name') ? 'asc' : 'desc';
            }
            renderPersonalSummary();
        });
    });
}

// CSVエクスポート処理
function handleExportPsCsv() {
    const mode = document.getElementById('ps-mode')?.value || 'single';
    const role = document.getElementById('ps-role')?.value || 'batter';
    const pid = document.getElementById('ps-player')?.value;
    const playerName = allPlayers.find(p => p.id == pid)?.name || '全選手';

    let csvContent = '\uFEFF'; // UTF-8 BOM
    let filename = `ants_stats_${mode}_${role}_${playerName}_${new Date().toISOString().substring(0, 10)}.csv`;

    let tableEl = null;
    if (mode === 'single') {
        tableEl = document.querySelector('#ps-game-tbody')?.closest('table');
    } else {
        tableEl = document.querySelector('#ps-all-tbody')?.closest('table');
    }

    if (!tableEl) {
        alert('出力対象のテーブルが見つかりません。');
        return;
    }

    const rows = Array.from(tableEl.querySelectorAll('tr'));
    rows.forEach(row => {
        const cols = Array.from(row.querySelectorAll('th, td'));
        const rowData = cols.map(c => {
            let text = c.textContent.trim().replace(/"/g, '""');
            return `"${text}"`;
        }).join(',');
        csvContent += rowData + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}

// --- タブ3: ランキング ---
function renderRanking() {
    const { games, bStats, pStats } = currentFiltered;
    const gameCount = games ? games.length : 0;
    const regulationPA = gameCount * 2;

    const infoEl = document.getElementById('ranking-summary-info');
    if (infoEl) {
        infoEl.textContent = `対象試合: ${gameCount}試合 / 規定打席: ${regulationPA}打席 (試合数×2)`;
    }

    const noteEl = document.getElementById('ranking-mode-note');
    if (noteEl) {
        noteEl.textContent = isRankingRegulationEnabled
            ? '※規定打席＝対象試合数×2打席（規定到達者を上位、規定未満を薄グレー網掛けで下段に表示）'
            : '※規定打席を考慮せず全打者を合算順位で表示中（規定打席＝対象試合数×2打席）';
    }

    const bMap = {}, pMap = {};
    bStats.forEach(s => { if(!bMap[s.player_id]) bMap[s.player_id] = []; bMap[s.player_id].push(s); });
    pStats.forEach(s => { if(!pMap[s.player_id]) pMap[s.player_id] = []; pMap[s.player_id].push(s); });

    currentRankingData.batter = Object.keys(bMap)
        .map(pid => {
            const stats = calcBatterStats(bMap[pid]);
            return {
                name: allPlayers.find(x => x.id == pid)?.name || '不明',
                ...stats,
                meetsRegulation: stats.pa >= regulationPA
            };
        })
        .filter(x => x.pa > 0);

    currentRankingData.pitcher = Object.keys(pMap).map(pid => ({ name: allPlayers.find(x=>x.id==pid)?.name || '不明', ...calcPitcherStats(pMap[pid]) })).filter(x => x.outs > 0);

    drawRankingTable('batter');
    drawRankingTable('pitcher');
}

function handleRankingSort(role, key) {
    if (rankingSortState[role].key === key) {
        rankingSortState[role].order = rankingSortState[role].order === 'asc' ? 'desc' : 'asc';
    } else {
        rankingSortState[role].key = key;
        // ERA/WHIP/与四死球などは低い方が良いため昇順をデフォルトにする
        if (key === 'era' || key === 'whip' || key === 'bb7' || key === 'bbRate' || key === 'name') {
            rankingSortState[role].order = 'asc';
        } else {
            rankingSortState[role].order = 'desc';
        }
    }
    drawRankingTable(role);
}

function drawRankingTable(role) {
    const state = rankingSortState[role];
    const data = currentRankingData[role];

    data.sort((a, b) => {
        if (role === 'batter' && isRankingRegulationEnabled && a.meetsRegulation !== b.meetsRegulation) {
            return a.meetsRegulation ? -1 : 1;
        }
        let valA = a[state.key];
        let valB = b[state.key];
        if (typeof valA === 'string') return state.order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        return state.order === 'asc' ? valA - valB : valB - valA;
    });

    if (role === 'batter') {
        const tbody = document.getElementById('ranking-batter-tbody');
        if (tbody) {
            if (data.length === 0) {
                tbody.innerHTML = `<tr><td colspan="15" class="p-4 text-center text-gray-500">該当する選手データがありません</td></tr>`;
            } else {
                const hatchStyle = 'background-image: repeating-linear-gradient(135deg, #f3f4f6 0px, #f3f4f6 6px, #e5e7eb 6px, #e5e7eb 12px);';
                let sawBelowReg = false;
                tbody.innerHTML = data.map(r => {
                    const isBelow = isRankingRegulationEnabled && !r.meetsRegulation;
                    const isBoundary = isBelow && !sawBelowReg;
                    if (isBelow) sawBelowReg = true;

                    const rowClass = isBelow
                        ? `border-b text-gray-500 ${isBoundary ? 'border-t-2 border-t-gray-300' : ''}`
                        : 'border-b hover:bg-gray-50';
                    const rowStyle = isBelow ? `style="${hatchStyle}"` : '';
                    const badgeHtml = isBelow
                        ? '<span class="ml-1 text-[10px] font-normal px-1 py-0.5 rounded bg-gray-300/80 text-gray-700">規定未満</span>'
                        : '';
                    const avgClass = isBelow ? 'font-bold text-gray-600' : 'font-bold text-red-600';
                    const opsClass = isBelow ? 'font-bold text-gray-600' : 'text-purple-700 font-bold bg-purple-50';
                    const obpClass = isBelow ? 'text-gray-600' : 'text-blue-600';
                    const slgClass = isBelow ? 'text-gray-600' : 'text-teal-600';

                    return `<tr class="${rowClass}" ${rowStyle}><td class="p-2 font-bold">${escapeHtml(r.name)}${badgeHtml}</td><td class="p-2">${r.pa}</td><td class="p-2">${r.ab}</td><td class="p-2 ${avgClass}">${r.avgStr}</td><td class="p-2 ${opsClass}">${r.opsStr}</td><td class="p-2 ${obpClass}">${r.obpStr}</td><td class="p-2 ${slgClass}">${r.slgStr}</td><td class="p-2">${r.h}</td><td class="p-2">${r.tb}</td><td class="p-2">${r.bb}</td><td class="p-2">${r.hbp}</td><td class="p-2">${r.rbi}</td><td class="p-2">${r.r}</td><td class="p-2">${r.sb}</td><td class="p-2">${r.hr}</td></tr>`;
                }).join('');
            }
        }
    } else {
        document.getElementById('ranking-pitcher-tbody').innerHTML = data.map(r => `<tr class="border-b hover:bg-gray-50"><td class="p-2 font-bold">${escapeHtml(r.name)}</td><td class="p-2 text-green-700 font-bold">${r.wins}</td><td class="p-2 text-red-600 font-bold">${r.losses}</td><td class="p-2">${r.outs}</td><td class="p-2 text-red-600 font-bold">${r.era.toFixed(2)}</td><td class="p-2">${r.whip.toFixed(2)}</td><td class="p-2">${r.k7.toFixed(2)}</td><td class="p-2">${r.bb7.toFixed(2)}</td><td class="p-2">${r.kRate.toFixed(3)}</td><td class="p-2">${r.bbRate.toFixed(3)}</td><td class="p-2">${(r.sRate*100).toFixed(1)}</td><td class="p-2">${r.kbb.toFixed(2)}</td></tr>`).join('');
    }

    // アイコンの更新
    document.querySelectorAll(`#tab-content-ranking th[data-role="${role}"] span`).forEach(span => span.textContent = '');
    const activeTh = document.querySelector(`#tab-content-ranking th[data-role="${role}"][data-sort="${state.key}"] span`);
    if (activeTh) activeTh.textContent = state.order === 'asc' ? ' ▲' : ' ▼';
}

// --- タブ4: 選手間比較（累積 ＆ 移動平均 統合） ---
async function renderComparison() {
    await loadChartJs();
    const role = document.getElementById('comp-role')?.value || 'batter';
    const calcMode = document.getElementById('comp-calc-mode')?.value || 'cumulative';
    const isMovingAvg = calcMode === 'moving_avg';
    const wSize = Math.max(1, parseInt(document.getElementById('comp-ma-window')?.value, 10) || 5);
    const selectedPids = Array.from(document.querySelectorAll('.comp-player-cb:checked')).map(cb => cb.value);

    document.getElementById('comp-window-wrap')?.classList.toggle('hidden', !isMovingAvg);
    document.getElementById('comp-ma-note')?.classList.toggle('hidden', !isMovingAvg);

    Object.values(comparisonCharts).forEach(c => c.destroy());
    comparisonCharts = {};
    const container = document.getElementById('comp-charts-container');
    if (container) container.innerHTML = '';
    if (selectedPids.length === 0) return;

    const { games, bStats, pStats } = currentFiltered;
    const allDates = [...new Set(games.map(g => normalizeIsoDate(g.date)).filter(Boolean))].sort();
    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899'];

    const metrics = role === 'batter'
        ? [{ key: 'avg', name: '打率' }, { key: 'ops', name: 'OPS' }, { key: 'obp', name: '出塁率' }, { key: 'slg', name: '長打率' }]
        : [{ key: 'era', name: '防御率' }, { key: 'whip', name: 'WHIP' }, { key: 'k7', name: 'K/7' }, { key: 'bb7', name: 'BB/7' }, { key: 'sRate', name: 'S率(%)' }];

    metrics.forEach((metricObj, mIndex) => {
        const chartId = `chart-comp-${mIndex}`;
        const wrap = document.createElement('div');
        wrap.className = 'bg-white p-4 rounded shadow-md relative h-[300px] md:h-[400px]';
        wrap.innerHTML = `<canvas id="${chartId}"></canvas>`;
        container.appendChild(wrap);

        const datasets = selectedPids.map((pid, i) => {
            const tStats = (role === 'batter' ? bStats : pStats).filter(s => s.player_id == pid);
            const merged = tStats
                .map(s => ({ date: normalizeIsoDate(games.find(x => x.id === s.game_id)?.date), stats: s }))
                .filter(x => x.date)
                .sort((a, b) => a.date.localeCompare(b.date));

            const dMap = {};
            if (isMovingAvg) {
                for (let j = 0; j < merged.length; j++) {
                    const wStats = merged.slice(Math.max(0, j - wSize + 1), j + 1).map(m => m.stats);
                    const wStat = role === 'batter' ? calcBatterStats(wStats) : calcPitcherStats(wStats);
                    let val = wStat[metricObj.key];
                    if (metricObj.key === 'sRate') val = val * 100;
                    dMap[merged[j].date] = val;
                }
            } else {
                const cCum = [];
                merged.forEach(m => {
                    cCum.push(m.stats);
                    const cStat = role === 'batter' ? calcBatterStats(cCum) : calcPitcherStats(cCum);
                    let val = cStat[metricObj.key];
                    if (metricObj.key === 'sRate') val = val * 100;
                    dMap[m.date] = val;
                });
            }

            let lastVal = null;
            const dataArr = allDates.map(d => {
                if (dMap[d] !== undefined) lastVal = dMap[d];
                return lastVal;
            });

            return {
                label: allPlayers.find(x => x.id == pid)?.name || '不明',
                data: dataArr,
                borderColor: colors[i % colors.length],
                spanGaps: true,
                tension: 0.1
            };
        });

        const chartTitle = isMovingAvg
            ? `選手比較・直近${wSize}試合 移動平均 (${metricObj.name})`
            : `選手比較・累積 (${metricObj.name})`;

        comparisonCharts[chartId] = new window.Chart(document.getElementById(chartId).getContext('2d'), {
            type: 'line',
            data: { labels: allDates, datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { title: { display: true, text: chartTitle } }
            }
        });
    });
}

// --- タブ6: 設定 ---
function renderHomeTeamList() {
    const listEl = document.getElementById('home-team-list');
    if (!listEl) return;
    listEl.innerHTML = dashboardSettings.homeTeamNames.map(name => 
        `<div class="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2">
            <span>${name}</span>
            <button onclick="window.dashboard_removeHomeTeam('${name}')" class="text-red-500 hover:text-red-700 font-bold">&times;</button>
        </div>`
    ).join('');
}

async function handleAddHomeTeam() {
    const input = document.getElementById('new-home-team-name');
    const newName = input.value.trim();
    if (!newName || dashboardSettings.homeTeamNames.includes(newName)) return;

    const updatedTeams = [...dashboardSettings.homeTeamNames, newName];
    localStorage.setItem('ants_homeTeamNames', JSON.stringify(updatedTeams));

    showLoading('自チーム名を追加中 (DB同期)...');
    try {
        await syncDashboardSettingToDb('homeTeamNames', updatedTeams, 'DASHBOARD_HOME_TEAMS', { teams: updatedTeams, _updatedAt: Date.now() });
        updateSettingsSyncStatusUi(true, '自チーム名をSupabase DBへ保存・同期しました');
    } catch (e) {
        console.error('Supabase sync failed', e);
        updateSettingsSyncStatusUi(false, `DB同期に失敗 (このブラウザのみ保存): ${e.message}`);
    } finally {
        hideLoading();
    }

    dashboardSettings.homeTeamNames = updatedTeams;
    renderHomeTeamList();
    input.value = '';
    applyFiltersAndRender();
}

window.dashboard_removeHomeTeam = async function(nameToRemove) {
    if (!confirm(`「${nameToRemove}」を自チームから削除しますか？`)) return;
    
    const updatedTeams = dashboardSettings.homeTeamNames.filter(name => name !== nameToRemove);
    localStorage.setItem('ants_homeTeamNames', JSON.stringify(updatedTeams));

    showLoading('自チーム名を削除中 (DB同期)...');
    try {
        await syncDashboardSettingToDb('homeTeamNames', updatedTeams, 'DASHBOARD_HOME_TEAMS', { teams: updatedTeams, _updatedAt: Date.now() });
        updateSettingsSyncStatusUi(true, '自チーム名をSupabase DBから更新・同期しました');
    } catch (e) {
        console.error('Supabase sync failed', e);
        updateSettingsSyncStatusUi(false, `DB同期に失敗 (このブラウザのみ保存): ${e.message}`);
    } finally {
        hideLoading();
    }

    dashboardSettings.homeTeamNames = updatedTeams;
    renderHomeTeamList();
    applyFiltersAndRender();
}

async function handleCsvImport() {
    const fileInput = document.getElementById('csv-import-file');
    const type = document.getElementById('csv-import-type').value;
    const msgEl = document.getElementById('import-result-msg');
    
    if (!fileInput.files || fileInput.files.length === 0) {
        return alert("CSVファイルを選択してください。");
    }
    
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = async (e) => {
        let text = e.target.result;
        
        // BOM(Byte Order Mark)が含まれている場合は除去して誤動作を防ぐ
        text = text.replace(/^\uFEFF/, '');
        
        // Scorer出力CSVの改行欠落バグを正規表現で強制補正（例: "FO247,難波" -> "FO\n247,難波"）
        text = text.replace(/([A-Za-z0-9]+)(\d{3},[^0-9,])/g, '$1\n$2');

        const rows = parseCSV(text);
        if (rows.length < 2) return alert("データが空かフォーマットが不正です。");

        showLoading('データベースへ保存中...');
        msgEl.classList.add('hidden');
        
        try {
            const playersMap = new Map();
            const gamesMap = new Map();
            const stats = [];

            // ヘッダーをスキップしてデータ行を処理
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                if (row.length < 30) continue; // 行が短すぎる場合はスキップ

                const playerId = parseInt(row[0]);
                const gameId = parseInt(row[3]);
                if (isNaN(playerId) || isNaN(gameId)) continue;

                // 選手情報の抽出
                playersMap.set(playerId, {
                    id: playerId,
                    name: row[1] || '不明',
                    uniform_number: row[2] || null
                });

              // 日付の安全なパース (タイムゾーンのズレを防ぐため YYYY-MM-DD 形式に変換)
                let validDate = null;
                if (row[4] && row[4].trim()) {
                    const dateStr = row[4].trim().replace(/\//g, '-');
                    const d = new Date(dateStr);
                    if (!isNaN(d.getTime())) {
                        const y = d.getFullYear();
                        const m = String(d.getMonth() + 1).padStart(2, '0');
                        const day = String(d.getDate()).padStart(2, '0');
                        validDate = `${y}-${m}-${day}`;
                    } else {
                        // Safari対策: ゼロ埋めされていない YYYY-M-D を手動でパース
                        const parts = dateStr.split('-');
                        if (parts.length === 3) {
                            const y = parseInt(parts[0], 10);
                            const m = parseInt(parts[1], 10);
                            const day = parseInt(parts[2], 10);
                            if (!isNaN(y) && !isNaN(m) && !isNaN(day)) {
                                validDate = `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                            }
                        }
                    }
                }

                // 試合情報の抽出
                gamesMap.set(gameId, {
                    id: gameId,
                    date: validDate,
                    team_first: row[5] || null,
                    score: row[6] || null,
                    team_second: row[7] || null,
                    title: row[8] || null,
                    category: row[9] || null,
                    stadium: row[10] || null
                });

                // 成績情報の抽出 (空白や不正値は0に変換)
                const statRow = { player_id: playerId, game_id: gameId };
                
                if (type === 'batter') {
                    const cols = ['plate_appearances','at_bats','runs','hits','doubles','triples','home_runs','total_bases','runs_batted_in','stolen_bases','caught_stealing','sacrifice_hits','sacrifice_flies','walks','hit_by_pitch','strike_outs','left_on_base','double_plays','scoring_position_at_bats','scoring_position_hits','go','fo'];
                    cols.forEach((col, idx) => statRow[col] = parseInt(row[11 + idx]) || 0);
                } else if (type === 'pitcher') {
                    const cols = ['is_starter','wins','losses','saves','holds','qs','outs','pitch_count','strikes','batters_faced','at_bats','hits_allowed','home_runs_allowed','walks_allowed','hit_batters','strike_outs','runs_allowed','earned_runs','wild_pitches','balks','sacrifice_hits_allowed','sacrifice_flies_allowed','go','fo'];
                    cols.forEach((col, idx) => statRow[col] = parseInt(row[11 + idx]) || 0);
                }
                stats.push(statRow);
            }

            // 1. 選手マスタの更新 (重複回避)
            const { error: pErr } = await supabaseClient.from('players').upsert(Array.from(playersMap.values()));
            if (pErr) throw pErr;

            // 2. 試合マスタの更新
            const { error: gErr } = await supabaseClient.from('games').upsert(Array.from(gamesMap.values()));
            if (gErr) throw gErr;

            // 3. 成績の更新
            const tableName = type === 'batter' ? 'batter_stats' : 'pitcher_stats';
            const { error: sErr } = await supabaseClient.from(tableName).upsert(stats, { onConflict: 'player_id, game_id' });
            if (sErr) throw sErr;

            await logAction('IMPORT_CSV', `成績データ(${type === 'batter' ? '打者' : '投手'})を${stats.length}件インポートしました`);
            msgEl.textContent = `成功: ${stats.length} 件のデータをインポートしました。`;
            msgEl.className = "mt-4 text-sm font-bold text-green-600";
            msgEl.classList.remove('hidden');
            fileInput.value = ''; // 成功したらクリア
            
            loadDashboardData(); // インポート後に表示データを更新

        } catch (error) {
            msgEl.textContent = `エラー: ${error.message}`;
            msgEl.className = "mt-4 text-sm font-bold text-red-600";
            msgEl.classList.remove('hidden');
        } finally {
            hideLoading();
        }
    };
    reader.readAsText(file);
}

// --- Scorer バックアップ・単一試合データ (scorer_data*.txt / scorer_game*.txt) 解析・抽出・DB保存 ---
let loadedScorerBackup = null;
let loadedScorerExtracted = null;
let currentDecodedGameForTranscript = null;

const SCORER_POS_NAMES = {
    '0': 'ピッチャー', '1': 'キャッチャー', '2': 'ファースト', '3': 'セカンド',
    '4': 'サード', '5': 'ショート', '6': 'レフト', '7': 'センター', '8': 'ライト', '9': '指名打者'
};
const FLD_POS_NAMES = {
    0: 'ピッチャー', 1: 'キャッチャー', 2: 'ファースト', 3: 'セカンド', 4: 'サード', 5: 'ショート', 6: '外野'
};

function escapeHtml(str) {
    return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function safeJsonParse(val, fallback = null) {
    if (val === undefined || val === null || val === '') return fallback;
    if (typeof val !== 'string') return val;
    try { return JSON.parse(val); } catch (e) { return fallback; }
}

function formatEpochIsoDate(tm) {
    if (!tm || isNaN(Number(tm))) return '';
    const d = new Date(Number(tm));
    if (isNaN(d.getTime())) return '';
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getScorerGameRawDate(g, cfObj = null) {
    const cf = cfObj || safeJsonParse(g?.cf, {});
    return cf?.date || g?.da || formatEpochIsoDate(g?.tm) || '';
}

function formatScorerCsvDate(daStr) {
    if (!daStr) return '';
    const parts = String(daStr).split('T')[0].replace(/\//g, '-').split('-');
    if (parts.length === 3) {
        const y = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10);
        const d = parseInt(parts[2], 10);
        if (!isNaN(y) && !isNaN(m) && !isNaN(d)) return `${y}-${m}-${d}`;
    }
    return daStr;
}

function extractScoreStringFromBackupGame(g) {
    if (!g || !g.sc) return '';
    const scObj = safeJsonParse(g.sc, null);
    if (Array.isArray(scObj) && scObj[1] && Array.isArray(scObj[1]) && scObj[1][0] && scObj[1][1]) {
        return `${scObj[1][0][0]}-${scObj[1][1][0]}`;
    }
    return '';
}

function formatScorerPlayerDisplayName(p) {
    if (!p) return '不明';
    return p.disp || p.di || ((p.la || p.last || '') + (p.fi || p.first ? ' ' + (p.fi || p.first) : '')).trim() || p.na || '不明';
}

function extractFromScorerBackup(backupData) {
    const playersMap = new Map();
    const gamesMap = new Map();
    const gameDetailsMap = new Map();
    const batterStats = [];
    const pitcherStats = [];
    const rawBRows = [
        ['選手ID', '選手名', '背番号', '試合ID', '日付', '先攻チーム', '得点', '後攻チーム', 'タイトル', 'カテゴリ', '球場', '打席', '打数', '得点', '安打', '二塁打', '三塁打', '本塁打', '塁打', '打点', '盗塁', '盗塁死', '犠打', '犠飛', '四球', '死球', '三振', '残塁', '併殺打', '得点圏打数', '得点圏安打', 'GO', 'FO']
    ];
    const rawPRows = [
        ['選手ID', '選手名', '背番号', '試合ID', '日付', '先攻チーム', '得点', '後攻チーム', 'タイトル', 'カテゴリ', '球場', '先発', '勝数', '負数', 'セーブ', 'ホールド', 'QS', 'アウト数', '球数', 'S数', '打者', '打数', '安打', '本塁打', '四球', '死球', '三振', '失点', '自責点', '暴投', 'ボーク', '犠打', '犠飛', 'GO', 'FO']
    ];

    const fldByGame = new Map();
    if (Array.isArray(backupData.fld)) {
        backupData.fld.forEach(f => {
            const gid = parseInt(f.gid, 10);
            const pid = parseInt(f.pid, 10);
            if (isNaN(gid) || isNaN(pid) || pid <= 0) return;
            if (!fldByGame.has(gid)) fldByGame.set(gid, []);
            fldByGame.get(gid).push(f);
        });
    }

    const rawGamesById = new Map();
    const rawGameList = Array.isArray(backupData.game)
        ? backupData.game
        : (backupData.game ? [backupData.game] : (backupData.cd && backupData.cf ? [backupData] : []));
    rawGameList.forEach(g => {
            const gid = parseInt(g.gid ?? g._id, 10);
            if (isNaN(gid)) return;
            rawGamesById.set(gid, g);

            const cfObj = safeJsonParse(g.cf, {});
            const rawDate = getScorerGameRawDate(g, cfObj);
            const isoDate = normalizeIsoDate(rawDate) || null;
            const scoreStr = extractScoreStringFromBackupGame(g);
            const title = g.tt || cfObj?.title || null;
            const stadium = g.pa || cfObj?.stadi || null;

            gamesMap.set(gid, {
                id: gid,
                date: isoDate,
                team_first: g.tn || null,
                score: scoreStr || null,
                team_second: g.bn || null,
                title,
                category: g.ca || null,
                stadium
            });

            gameDetailsMap.set(gid, {
                gid,
                date: isoDate || '',
                rawDate,
                tn: g.tn || '',
                bn: g.bn || '',
                tt: title || '',
                ca: g.ca || '',
                pa: stadium || '',
                ti: g.ti || '',
                bi: g.bi || '',
                sc: g.sc || '',
                cf: g.cf || '',
                cd: g.cd || '',
                pl: g.pl || '',
                te: g.te || '',
                fld: fldByGame.get(gid) || [],
                updatedAt: Date.now()
            });

            // 試合内選手マスタからも補完
            const gamePl = safeJsonParse(g.pl, []);
            if (Array.isArray(gamePl)) {
                gamePl.forEach(gp => {
                    const pid = parseInt(gp.id ?? gp.pid, 10);
                    if (isNaN(pid) || pid <= 0 || playersMap.has(pid)) return;
                    playersMap.set(pid, {
                        id: pid,
                        name: formatScorerPlayerDisplayName(gp),
                        uniform_number: gp.num !== undefined && gp.num !== null && gp.num !== '' ? String(gp.num) : null
                    });
                });
            }
        });

    // グローバル選手マスタ (backupData.player) で最新名称・背番号を上書き登録
    if (Array.isArray(backupData.player)) {
        backupData.player.forEach(p => {
            const pid = parseInt(p.pid ?? p._id, 10);
            if (isNaN(pid) || pid <= 0) return;
            const pName = formatScorerPlayerDisplayName(p);
            const pNum = p.nu !== undefined && p.nu !== null && String(p.nu) !== '' ? String(p.nu) : '';
            playersMap.set(pid, {
                id: pid,
                name: pName,
                uniform_number: pNum || null
            });
        });
    }

    const appendBatterEntry = (pid, gid, st) => {
        if (isNaN(pid) || pid <= 0 || isNaN(gid) || !Array.isArray(st) || st.length < 22) return;
        const gRaw = rawGamesById.get(gid);
        const cfObj = gRaw ? safeJsonParse(gRaw.cf, {}) : null;
        const scoreStr = gRaw ? extractScoreStringFromBackupGame(gRaw) : '';
        const csvDate = gRaw ? formatScorerCsvDate(getScorerGameRawDate(gRaw, cfObj)) : '';
        const pInfo = playersMap.get(pid) || { name: '不明', uniform_number: null };

        // st[20]は妨害出塁のため、23要素時はst[21]=GO, st[22]=FO
        const goVal = st.length >= 23 ? (st[21] ?? 0) : (st[20] ?? 0);
        const foVal = st.length >= 23 ? (st[22] ?? 0) : (st[21] ?? 0);

        const bCols = [
            st[0] ?? 0, st[1] ?? 0, st[2] ?? 0, st[3] ?? 0, st[4] ?? 0,
            st[5] ?? 0, st[6] ?? 0, st[7] ?? 0, st[8] ?? 0, st[9] ?? 0,
            st[10] ?? 0, st[11] ?? 0, st[12] ?? 0, st[13] ?? 0, st[14] ?? 0,
            st[15] ?? 0, st[16] ?? 0, st[17] ?? 0, st[18] ?? 0, st[19] ?? 0,
            goVal, foVal
        ];

        rawBRows.push([
            pid, pInfo.name, pInfo.uniform_number || '', gid, csvDate,
            gRaw?.tn || '', scoreStr, gRaw?.bn || '', gRaw?.tt || cfObj?.title || '', gRaw?.ca || '', gRaw?.pa || cfObj?.stadi || '',
            ...bCols
        ]);

        const dbColNames = ['plate_appearances','at_bats','runs','hits','doubles','triples','home_runs','total_bases','runs_batted_in','stolen_bases','caught_stealing','sacrifice_hits','sacrifice_flies','walks','hit_by_pitch','strike_outs','left_on_base','double_plays','scoring_position_at_bats','scoring_position_hits','go','fo'];
        const statRow = { player_id: pid, game_id: gid };
        dbColNames.forEach((col, idx) => { statRow[col] = parseInt(bCols[idx], 10) || 0; });
        batterStats.push(statRow);
    };

    const appendPitcherEntry = (pid, gid, st) => {
        if (isNaN(pid) || pid <= 0 || isNaN(gid) || !Array.isArray(st) || st.length < 24) return;
        const gRaw = rawGamesById.get(gid);
        const cfObj = gRaw ? safeJsonParse(gRaw.cf, {}) : null;
        const scoreStr = gRaw ? extractScoreStringFromBackupGame(gRaw) : '';
        const csvDate = gRaw ? formatScorerCsvDate(getScorerGameRawDate(gRaw, cfObj)) : '';
        const pInfo = playersMap.get(pid) || { name: '不明', uniform_number: null };

        // st[5]=球数, st[19]=ボール数 => S数 = st[5] - st[19], st[21]=ホールド, st[20]=QS
        const pitchCount = parseInt(st[5], 10) || 0;
        const ballsCount = parseInt(st[19], 10) || 0;
        const strikesCount = Math.max(0, pitchCount - ballsCount);

        const pCols = [
            st[0] ?? 0, st[1] ?? 0, st[2] ?? 0, st[3] ?? 0, st[21] ?? 0, st[20] ?? 0,
            st[4] ?? 0, pitchCount, strikesCount, st[6] ?? 0, st[7] ?? 0, st[8] ?? 0,
            st[9] ?? 0, st[10] ?? 0, st[11] ?? 0, st[12] ?? 0, st[13] ?? 0, st[14] ?? 0,
            st[15] ?? 0, st[16] ?? 0, st[17] ?? 0, st[18] ?? 0, st[22] ?? 0, st[23] ?? 0
        ];

        rawPRows.push([
            pid, pInfo.name, pInfo.uniform_number || '', gid, csvDate,
            gRaw?.tn || '', scoreStr, gRaw?.bn || '', gRaw?.tt || cfObj?.title || '', gRaw?.ca || '', gRaw?.pa || cfObj?.stadi || '',
            ...pCols
        ]);

        const dbColNames = ['is_starter','wins','losses','saves','holds','qs','outs','pitch_count','strikes','batters_faced','at_bats','hits_allowed','home_runs_allowed','walks_allowed','hit_batters','strike_outs','runs_allowed','earned_runs','wild_pitches','balks','sacrifice_hits_allowed','sacrifice_flies_allowed','go','fo'];
        const statRow = { player_id: pid, game_id: gid };
        dbColNames.forEach((col, idx) => { statRow[col] = parseInt(pCols[idx], 10) || 0; });
        pitcherStats.push(statRow);
    };

    // 1. 現行 Scorer バックアップ形式: トップレベル bat[] / pit[] 配列
    if (Array.isArray(backupData.bat)) {
        backupData.bat.forEach(entry => {
            appendBatterEntry(parseInt(entry.pid, 10), parseInt(entry.gid, 10), entry.st);
        });
    }
    if (Array.isArray(backupData.pit)) {
        backupData.pit.forEach(entry => {
            appendPitcherEntry(parseInt(entry.pid, 10), parseInt(entry.gid, 10), entry.st);
        });
    }

    // 2. フォールバック: 旧形式 (player[].st.bat / player[].st.pit)
    if (batterStats.length === 0 && pitcherStats.length === 0 && Array.isArray(backupData.player)) {
        backupData.player.forEach(p => {
            const pid = parseInt(p.pid ?? p._id, 10);
            if (isNaN(pid) || pid <= 0 || !p.st) return;
            const stObj = safeJsonParse(p.st, null);
            if (!stObj) return;
            if (Array.isArray(stObj.bat)) stObj.bat.forEach(b => appendBatterEntry(pid, parseInt(b.id ?? b.gid, 10), b.st));
            if (Array.isArray(stObj.pit)) stObj.pit.forEach(pt => appendPitcherEntry(pid, parseInt(pt.id ?? pt.gid, 10), pt.st));
        });
    }

    // 成績・選手登録で使われている有効な選手のみ抽出
    const usedPlayerIds = new Set();
    batterStats.forEach(s => usedPlayerIds.add(s.player_id));
    pitcherStats.forEach(s => usedPlayerIds.add(s.player_id));
    if (usedPlayerIds.size === 0) {
        playersMap.forEach((_, pid) => usedPlayerIds.add(pid));
    }
    const dbPlayers = Array.from(playersMap.values()).filter(p => usedPlayerIds.has(p.id));

    return {
        players: dbPlayers,
        allPlayersMap: playersMap,
        games: Array.from(gamesMap.values()),
        gameDetails: Array.from(gameDetailsMap.values()),
        batterStats,
        pitcherStats,
        rawBRows,
        rawPRows,
        rawGamesById
    };
}

function handleBackupFileSelect(e) {
    const file = e.target.files?.[0];
    const msgEl = document.getElementById('backup-extract-msg');
    const gameSel = document.getElementById('backup-game-select');
    const gameArea = document.getElementById('backup-game-extract-area');
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
        try {
            const text = String(ev.target.result || '').replace(/^\uFEFF/, '');
            const data = JSON.parse(text);
            const hasGames = Array.isArray(data.game) ? data.game.length > 0 : Boolean(data.game || (data.cd && data.cf));
            if (!hasGames) {
                throw new Error('Scorerのバックアップ／試合データ (gameデータを含むJSON) ではありません。');
            }
            loadedScorerBackup = data;
            loadedScorerExtracted = extractFromScorerBackup(data);

            if (gameSel) {
                const sortedGames = [...loadedScorerExtracted.gameDetails].sort((a, b) =>
                    String(b.date || '').localeCompare(String(a.date || '')) || ((b.gid || 0) - (a.gid || 0))
                );
                gameSel.innerHTML = sortedGames.map(gd => {
                    const sc = extractScoreStringFromBackupGame(gd);
                    return `<option value="${gd.gid}">${escapeHtml(gd.date || '日付不明')} | ${escapeHtml(gd.tn)} ${escapeHtml(sc)} ${escapeHtml(gd.bn)} (${escapeHtml(gd.tt || '試合')}) [ID:${gd.gid}]</option>`;
                }).join('');
            }
            if (gameArea) {
                gameArea.classList.toggle('hidden', loadedScorerExtracted.gameDetails.length === 0);
            }

            if (msgEl) {
                msgEl.textContent = `読み込み完了: 試合 ${loadedScorerExtracted.games.length}件 / 詳細プレイログ ${loadedScorerExtracted.gameDetails.filter(x => x.cd).length}件 / 打者成績 ${loadedScorerExtracted.batterStats.length}件 / 投手成績 ${loadedScorerExtracted.pitcherStats.length}件`;
                msgEl.className = 'mt-3 text-sm font-bold text-indigo-700';
                msgEl.classList.remove('hidden');
            }
        } catch (err) {
            loadedScorerBackup = null;
            loadedScorerExtracted = null;
            gameArea?.classList.add('hidden');
            if (msgEl) {
                msgEl.textContent = `読み込みエラー: ${err.message}`;
                msgEl.className = 'mt-3 text-sm font-bold text-red-600';
                msgEl.classList.remove('hidden');
            }
        }
    };
    reader.readAsText(file);
}

async function upsertInChunks(table, rows, chunkSize, options = undefined) {
    for (let i = 0; i < rows.length; i += chunkSize) {
        const slice = rows.slice(i, i + chunkSize);
        const { error } = options
            ? await supabaseClient.from(table).upsert(slice, options)
            : await supabaseClient.from(table).upsert(slice);
        if (error) throw error;
    }
}

async function handleBackupImportDb() {
    const msgEl = document.getElementById('backup-extract-msg');
    if (!loadedScorerExtracted) {
        return alert('先に scorer_data*.txt または scorer_game*.txt を選択してください。');
    }

    showLoading('バックアップデータから成績・詳細分析データをDBへ一括インポート中...');
    try {
        const { players, games, gameDetails, batterStats, pitcherStats } = loadedScorerExtracted;

        if (players.length > 0) await upsertInChunks('players', players, 200);
        if (games.length > 0) await upsertInChunks('games', games, 100);
        if (batterStats.length > 0) await upsertInChunks('batter_stats', batterStats, 200, { onConflict: 'player_id, game_id' });
        if (pitcherStats.length > 0) await upsertInChunks('pitcher_stats', pitcherStats, 200, { onConflict: 'player_id, game_id' });

        // 詳細分析・文字起こし用データを master_data に試合単位で永続保存
        const detailRows = gameDetails.map(gd => ({
            key: `SCORER_GAME_DETAIL_${gd.gid}`,
            data: gd
        }));
        if (detailRows.length > 0) {
            await upsertInChunks('master_data', detailRows, 15, { onConflict: 'key' });
        }

        await logAction('IMPORT_BACKUP', `Scorerデータ一括インポート: 試合=${games.length}件, 詳細ログ=${detailRows.length}件, 打者=${batterStats.length}件, 投手=${pitcherStats.length}件`);
        if (msgEl) {
            msgEl.textContent = `DBインポート完了: 試合 ${games.length}件 / 詳細プレイ ${detailRows.length}件 / 打者成績 ${batterStats.length}件 / 投手成績 ${pitcherStats.length}件を保存しました（「詳細分析・文字起こし」タブから即座に参照できます）。`;
            msgEl.className = 'mt-3 text-sm font-bold text-green-600';
            msgEl.classList.remove('hidden');
        }
        tempPreviewDetails = []; // DBインポート完了後は一時プレビューを解除してDB表示に切り替え
        await loadDashboardData();
    } catch (err) {
        console.error(err);
        if (msgEl) {
            msgEl.textContent = `DBインポートエラー: ${err.message}`;
            msgEl.className = 'mt-3 text-sm font-bold text-red-600';
            msgEl.classList.remove('hidden');
        }
    } finally {
        hideLoading();
    }
}

function downloadBlobFile(content, mimeType, filename) {
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}

function handleExtractRawCsv(type) {
    if (!loadedScorerExtracted) {
        return alert('先に scorer_data*.txt ファイルを選択してください。');
    }
    const rows = type === 'batter' ? loadedScorerExtracted.rawBRows : loadedScorerExtracted.rawPRows;
    if (rows.length <= 1) {
        return alert('このファイルには該当する集計成績レコード（bat/pit配列）が含まれていません。');
    }
    const filename = type === 'batter' ? 'scorer_stats_raw_b.csv' : 'scorer_stats_raw_p.csv';

    const csvText = '\uFEFF' + rows.map(row => row.map(cell => {
        const s = cell === null || cell === undefined ? '' : String(cell);
        return (s.includes(',') || s.includes('"') || s.includes('\n')) ? `"${s.replace(/"/g, '""')}"` : s;
    }).join(',')).join('\n') + '\n';

    downloadBlobFile(csvText, 'text/csv;charset=utf-8;', filename);
}

function handleExtractSingleGame() {
    if (!loadedScorerBackup || !loadedScorerExtracted) {
        return alert('先に scorer_data*.txt ファイルを選択してください。');
    }
    const selectedGid = parseInt(document.getElementById('backup-game-select')?.value, 10);
    if (isNaN(selectedGid)) return alert('抽出する試合を選択してください。');

    const gObj = loadedScorerExtracted.rawGamesById.get(selectedGid);
    if (!gObj) return alert('選択された試合データが見つかりません。');

    const cfObj = safeJsonParse(gObj.cf, {});
    const gameTe = safeJsonParse(gObj.te, []);
    const gamePl = safeJsonParse(gObj.pl, []);
    const teamIds = new Set(gameTe.map(t => t.id).filter(Boolean));
    const playerIds = new Set(gamePl.map(p => p.id).filter(Boolean));

    const gameExportObj = {
        kind: 'GD',
        team: Array.isArray(loadedScorerBackup.team) ? loadedScorerBackup.team.filter(t => teamIds.has(t.tid ?? t.id)) : [],
        player: Array.isArray(loadedScorerBackup.player) ? loadedScorerBackup.player.filter(p => playerIds.has(p.pid ?? p.id)) : [],
        game: [gObj],
        bat: Array.isArray(loadedScorerBackup.bat) ? loadedScorerBackup.bat.filter(b => parseInt(b.gid, 10) === selectedGid) : [],
        pit: Array.isArray(loadedScorerBackup.pit) ? loadedScorerBackup.pit.filter(pt => parseInt(pt.gid, 10) === selectedGid) : [],
        fld: Array.isArray(loadedScorerBackup.fld) ? loadedScorerBackup.fld.filter(f => parseInt(f.gid, 10) === selectedGid) : [],
        cat: Array.isArray(loadedScorerBackup.cat) ? loadedScorerBackup.cat.filter(c => parseInt(c.gid, 10) === selectedGid) : []
    };

    const dateDigits = normalizeIsoDate(getScorerGameRawDate(gObj, cfObj)).replace(/[^0-9]/g, '') || String(selectedGid);
    downloadBlobFile(JSON.stringify(gameExportObj), 'text/plain;charset=utf-8;', `scorer_game${dateDigits}.txt`);
}

function handleExtractGameTranscript() {
    if (!loadedScorerExtracted) return alert('先にバックアップ／試合ファイルを選択してください。');
    const selectedGid = parseInt(document.getElementById('backup-game-select')?.value, 10);
    if (isNaN(selectedGid)) return alert('抽出する試合を選択してください。');

    const detailObj = loadedScorerExtracted.gameDetails.find(gd => gd.gid === selectedGid);
    if (!detailObj) return alert('選択された試合データが見つかりません。');

    const decoded = decodeScorerGamePlayByPlay(detailObj);
    const includePitches = confirm('1球ごとの投球カウント（[1]ボール等）もテキストに含めますか？\n（「キャンセル」を押すと打席結果・重要イベントのみのすっきりした戦績表を保存します）');
    const txt = formatGameTranscriptText(decoded, includePitches);
    const dateDigits = (detailObj.date || '').replace(/[^0-9]/g, '') || String(selectedGid);
    downloadBlobFile('\uFEFF' + txt, 'text/plain;charset=utf-8;', `戦績文字起こし_${dateDigits}_${detailObj.tn}_vs_${detailObj.bn}.txt`);
}

function handlePreviewBackupDetail() {
    if (!loadedScorerExtracted || loadedScorerExtracted.gameDetails.length === 0) {
        return alert('先にバックアップ／試合ファイルを選択してください。');
    }
    const selectedGid = document.getElementById('backup-game-select')?.value;
    tempPreviewDetails = loadedScorerExtracted.gameDetails;
    switchDashboardTab('detail-analysis');
    renderDetailAnalysisTab(true, selectedGid ? String(selectedGid) : 'all');
}

// =========================================================================
// Scorer イベントコード (game[].cd) -> 試合経過プレイバイプレイ デコーダ
// =========================================================================

function baseBitmaskToText(mask) {
    const b = [];
    if (mask & 1) b.push('1');
    if (mask & 2) b.push('2');
    if (mask & 4) b.push('3');
    return b.length ? b.join('･') + '塁' : '';
}

function formatBaseOccupiedText(mask) {
    const b = [];
    if (mask & 1) b.push('1');
    if (mask & 2) b.push('2');
    if (mask & 4) b.push('3');
    return b.length ? `◆(${b.join(',')}塁)` : '◇';
}

function decodeScorerGamePlayByPlay(detailObj) {
    const cf = safeJsonParse(detailObj?.cf, {});
    const te = safeJsonParse(detailObj?.te, []);
    const plArr = safeJsonParse(detailObj?.pl, []);
    const sc = safeJsonParse(detailObj?.sc, [[[], []], [[0, 0, 0, 0], [0, 0, 0, 0]]]);

    const playerMap = new Map();
    if (Array.isArray(plArr)) {
        plArr.forEach(p => {
            const id = parseInt(p.id ?? p.pid, 10);
            if (!isNaN(id)) playerMap.set(id, { id, name: formatScorerPlayerDisplayName(p), num: String(p.num ?? p.nu ?? '') });
        });
    }
    const getPlayer = (id) => playerMap.get(parseInt(id, 10)) || { id: parseInt(id, 10), name: `選手${id}`, num: '' };

    const gteams = Array.isArray(cf?.gteams) ? cf.gteams : [];
    const lineup = [[], []];
    [0, 1].forEach(side => {
        const gt = gteams[side];
        if (gt && Array.isArray(gt.players)) {
            lineup[side] = gt.players
                .filter(gp => gp.ord >= 0)
                .sort((a, b) => a.ord - b.ord)
                .map(gp => {
                    const p = getPlayer(gp.id);
                    return { ord: gp.ord, pos: gp.pos, id: gp.id, name: p.name, num: p.num };
                });
        }
    });

    const topTeam = detailObj?.tn || te[0]?.disp || te[0]?.name || '先攻';
    const botTeam = detailObj?.bn || te[1]?.disp || te[1]?.name || '後攻';
    const isHomeTop = isHomeTeam(topTeam);
    const isHomeBot = isHomeTeam(botTeam);

    const batterIdx = [0, 0];
    let battingSide = 0, inn = 0, ball = 0, strk = 0, out = 0, pitchSeq = 0;
    let runners = { 1: null, 2: null, 3: null };
    let scores = [0, 0];
    let paCompleted = false;
    let currentInningLabel = '1回表';

    const pcl = [];
    const timeline = [];
    const errorEvents = []; // { inning, posName, fielderName, play, isHomeFielding }

    const getRnrBitmask = () => (runners[1] ? 1 : 0) + (runners[2] ? 2 : 0) + (runners[3] ? 4 : 0);
    const findFielderByPos = (side, posStr) => lineup[side].find(p => p && String(p.pos) === String(posStr));
    const upsertLineupByOrd = (side, ord, entry) => {
        const idx = lineup[side].findIndex(p => p && p.ord === ord);
        if (idx >= 0) lineup[side][idx] = entry;
        else lineup[side].push(entry);
    };

    function processActionBody(str, curBatter, initialFielderPos = null) {
        const msgs = [];
        const errDetails = [];
        let lastPos = initialFielderPos !== undefined && initialFielderPos !== null ? String(initialFielderPos) : null;
        const re = /(J)(\d)([1-4a-g])|([OT])(\d)(\d)|(Th|Tb|Es|Ek|Ec|Ej|Eu)(\d+)|(Cb|Ch|Cf)/g;
        for (const m of str.matchAll(re)) {
            if (m[1] === 'J') {
                const from = parseInt(m[2], 10);
                const toRaw = m[3];
                const to = /[1-4]/.test(toRaw) ? parseInt(toRaw, 10) : ({ a: 1, b: 2, c: 3, d: 4, e: 2, f: 3, g: 4 }[toRaw] || 1);
                const runnerObj = from === 0 ? curBatter : runners[from];
                const rName = runnerObj ? runnerObj.name : curBatter.name;
                const fromLabel = from === 0 ? `打者${rName}` : `${from}塁ランナー${rName}`;

                if (from > 0 && from !== to) runners[from] = null;
                if (to === 4) {
                    scores[battingSide]++;
                    msgs.push(`${fromLabel}生還`);
                } else if (from !== to) {
                    if (to >= 1 && to <= 3) runners[to] = runnerObj;
                    msgs.push(`${fromLabel}${to}塁へ`);
                }
            } else if (m[4] === 'O' || m[4] === 'T') {
                const kind = m[4], from = parseInt(m[5], 10), to = parseInt(m[6], 10);
                out++;
                if (from === 0 && to === 0) {
                    msgs.push(kind === 'T' ? 'タッチアウト' : 'アウト');
                } else {
                    const runnerObj = from === 0 ? curBatter : runners[from];
                    const rName = runnerObj ? runnerObj.name : curBatter.name;
                    const fromLabel = from === 0 ? `打者${rName}` : `${from}塁ランナー${rName}`;
                    const toLabel = to === 4 ? '本塁' : (to > 0 ? `${to}塁` : '');
                    msgs.push(`${fromLabel}${toLabel}${kind === 'T' ? 'タッチアウト' : 'アウト'}`);
                    if (from > 0) runners[from] = null;
                }
            } else if (m[7]) {
                const ct = m[7], digits = m[8];
                const pos = digits.slice(-1);
                const errPosName = (d) => (d === '9' ? 'その他' : (SCORER_POS_NAMES[d] || 'その他'));
                // ScorerのEs/Ek/Ejの後続数字は「送球先・対象塁」であり、失策した野手は直前に捕球・送球した lastPos
                const resolvedFielderPos = (lastPos !== null && lastPos !== undefined && lastPos !== '9')
                    ? lastPos
                    : (pos !== '9' ? pos : null);
                if (ct === 'Th') {
                    msgs.push(`${SCORER_POS_NAMES[pos] || ''}に送球`);
                    lastPos = pos;
                } else if (ct === 'Tb') {
                    msgs.push(`${SCORER_POS_NAMES[pos] || ''}`);
                    lastPos = pos;
                } else if (ct === 'Es') {
                    msgs.push(`${SCORER_POS_NAMES[pos] || ''}に送球エラー`);
                    errDetails.push({
                        pos: resolvedFielderPos || undefined,
                        posName: resolvedFielderPos ? errPosName(resolvedFielderPos) : '送球エラー'
                    });
                } else if (ct === 'Ek' || ct === 'Ej') {
                    msgs.push(resolvedFielderPos && SCORER_POS_NAMES[resolvedFielderPos] ? `${SCORER_POS_NAMES[resolvedFielderPos]}エラー` : 'エラー');
                    errDetails.push({
                        pos: resolvedFielderPos || undefined,
                        posName: resolvedFielderPos ? errPosName(resolvedFielderPos) : 'その他'
                    });
                } else if (ct === 'Ec') {
                    // Ecは野選/送球間の進塁であり公式記録上の失策ではない
                    msgs.push(pos !== '9' && SCORER_POS_NAMES[pos] ? `${SCORER_POS_NAMES[pos]}送球(野選)` : '送球選択(野選)');
                } else if (ct === 'Eu') {
                    // Euも公式失策を伴わない送球間の進塁
                    msgs.push('送球間の進塁');
                }
            }
        }
        return { msgs, errDetails };
    }

    const tokens = String(detailObj?.cd || '').split('=').filter(Boolean);
    for (const cd of tokens) {
        let sPlay = '';
        let type = 'play';
        let isPitchOnly = false;
        let recordErrs = [];

        const fsSide = 1 - battingSide;
        const curTeamName = battingSide === 0 ? topTeam : botTeam;
        const isHomeBatting = battingSide === 0 ? isHomeTop : isHomeBot;
        const isHomeFielding = battingSide === 0 ? isHomeBot : isHomeTop;
        const curBatter = lineup[battingSide][batterIdx[battingSide]] || { name: '', num: '', id: null };

        if (/^I([tb])(\d+)$/.test(cd)) {
            const m = cd.match(/^I([tb])(\d+)$/);
            battingSide = m[1] === 't' ? 0 : 1;
            const innNum = parseInt(m[2], 10);
            inn = (innNum - 1) * 2 + battingSide;
            currentInningLabel = `${innNum}回${battingSide === 0 ? '表' : 'ｳﾗ'}`;
            out = 0; ball = 0; strk = 0; pitchSeq = 0;
            runners = { 1: null, 2: null, 3: null };
            paCompleted = false;
            sPlay = `${currentInningLabel} `;
            type = 'inning_header';
        } else if (/^A([tb])(\d+)(?:Lb(\d+))?$/.test(cd)) {
            const m = cd.match(/^A([tb])(\d+)(?:Lb(\d+))?$/);
            const innNum = parseInt(m[2], 10);
            const halfStr = m[1] === 't' ? '表' : 'ｳﾗ';
            const lbText = m[3] ? ` ${baseBitmaskToText(parseInt(m[3], 10))}ランナー残塁` : '';
            sPlay = `${innNum}回${halfStr}終了${lbText} `;
            type = 'inning_end';
            if (paCompleted && lineup[battingSide].length > 0) {
                batterIdx[battingSide] = (batterIdx[battingSide] + 1) % lineup[battingSide].length;
                paCompleted = false;
            }
        } else if (cd === 'Ah') {
            sPlay = '試合終了 ';
            type = 'game_end';
        } else if (/^(Am|Ag|Ap|Odp|Sc|Sw|Qw|Qx)/.test(cd)) {
            sPlay = '';
        } else if (cd === 'Nb') {
            if (lineup[battingSide].length > 0) batterIdx[battingSide] = (batterIdx[battingSide] + 1) % lineup[battingSide].length;
            ball = 0; strk = 0; pitchSeq = 0; paCompleted = false;
        } else if (cd === 'Na') {
            ball = 0; strk = 0; pitchSeq = 0; paCompleted = false;
            const ord = batterIdx[battingSide] + 1;
            const b = lineup[battingSide][batterIdx[battingSide]];
            sPlay = b ? `${ord}番${b.name}${b.num ? '#' + b.num : ''}` : `${ord}番`;
            type = 'batter';
        } else if (/^Iz/.test(cd)) {
            const len = lineup[battingSide].length || 9;
            runners[1] = lineup[battingSide][(batterIdx[battingSide] - 1 + len) % len];
            runners[2] = lineup[battingSide][(batterIdx[battingSide] - 2 + len) % len];
            sPlay = 'タイブレーク (1･2塁ランナー設定) ';
        } else if (/^P([bslf])$/.test(cd) || cd === 'Px' || cd === 'Pt') {
            pitchSeq++;
            isPitchOnly = true;
            if (cd === 'Pb') { if (ball < 4) ball++; sPlay = `[${pitchSeq}]ボール `; }
            else if (cd === 'Ps') { if (strk < 3) strk++; sPlay = `[${pitchSeq}]空振りストライク `; }
            else if (cd === 'Pl') { if (strk < 3) strk++; sPlay = `[${pitchSeq}]見逃しストライク `; }
            else if (cd === 'Pf') { if (strk < 2) strk++; sPlay = `[${pitchSeq}]ファウル `; }
            else if (cd === 'Pt') { if (strk < 3) strk++; sPlay = `[${pitchSeq}]ファウルチップ `; }
            else { if (strk < 3) strk++; sPlay = `[${pitchSeq}]バント/カット `; }
        } else if (cd === 'Ko') {
            out++; paCompleted = true;
            sPlay = `[${Math.max(1, pitchSeq)}]三振アウト `;
        } else if (/^(Bb|Db|Dn|Dk)/.test(cd)) {
            const k = cd.slice(0, 2);
            if (k === 'Db') pitchSeq++;
            if (k !== 'Dk') paCompleted = true;
            const pref = { Bb: 'フォアボール', Db: `[${pitchSeq}]デッドボール`, Dn: '打撃妨害', Dk: 'ボーク' }[k];
            const res = processActionBody(cd.slice(2), curBatter, k === 'Dn' ? '1' : null);
            recordErrs = k === 'Dn' ? [{ pos: '1', posName: SCORER_POS_NAMES['1'] }, ...res.errDetails] : res.errDetails;
            sPlay = [pref, ...res.msgs].join(' ') + ' ';
        } else if (/^E([wp])/.test(cd)) {
            const lbl = cd[1] === 'w' ? 'ワイルドピッチ' : 'パスボール';
            const res = processActionBody(cd.slice(2), curBatter, '1');
            recordErrs = res.errDetails;
            sPlay = [lbl, ...res.msgs].join(' ') + ' ';
        } else if (cd === 'Kr') {
            sPlay = '';
        } else if (/^K([wpt])/.test(cd)) {
            paCompleted = true;
            const sub = cd[1];
            const pref = sub === 't' ? '振り逃げ失敗' : `振り逃げ (${sub === 'w' ? '暴投' : '捕逸'})`;
            const res = processActionBody(cd.slice(2), curBatter, '1');
            recordErrs = res.errDetails;
            sPlay = [pref, ...res.msgs].join(' ') + ' ';
        } else if (/^H([1-4])([a-z-])([a-z-])(\d)(.*)/.test(cd)) {
            const m = cd.match(/^H([1-4])([a-z-])([a-z-])(\d)(.*)/);
            pitchSeq++; paCompleted = true;
            const bases = parseInt(m[1], 10), m1 = m[2], m2 = m[3], pos = m[4], rest = m[5];
            let hw = ['', 'ヒット', 'ツーベース', 'スリーベース', 'ホームラン'][bases];
            if (bases === 1 && m1 === 'b' && m2 === 'i') hw = 'バント内野安打';
            else if (bases === 1 && m1 === 'h' && m2 === 'i') hw = '強襲ヒット';
            else if (bases === 1 && m1 === 'i') hw = '内野安打';
            else if (bases === 4 && m1 === 'r') hw = 'ランニングホームラン';
            const res = processActionBody(rest, curBatter, pos);
            recordErrs = res.errDetails;
            sPlay = [`[${pitchSeq}]${SCORER_POS_NAMES[pos] || ''}${hw}`, ...res.msgs].join(' ') + ' ';
        } else if (/^(Gob|Go|Fob|Fof|Fol|Fo)[-]*(\d)?\d?(.*)/.test(cd)) {
            const m = cd.match(/^(Gob|Go|Fob|Fof|Fol|Fo)[-]*(\d)?\d?(.*)/);
            pitchSeq++; paCompleted = true;
            const kw = { Go: 'ゴロ', Gob: 'バントゴロ', Fo: 'フライ', Fol: 'ライナー', Fof: 'ファウルフライ', Fob: 'バントフライ' }[m[1]] || 'アウト';
            const res = processActionBody(m[3] || '', curBatter, m[2]);
            recordErrs = res.errDetails;
            sPlay = [`[${pitchSeq}]${m[2] !== undefined ? (SCORER_POS_NAMES[m[2]] || '') : ''}${kw}`, ...res.msgs].join(' ') + ' ';
        } else if (/^Rq(\d)(\d)/.test(cd)) {
            const m = cd.match(/^Rq(\d)(\d)/);
            sPlay = `${m[1] === '1' ? 'キャッチャー' : 'ピッチャー'}${{ '1': '1塁', '2': '2塁', '4': '3塁' }[m[2]] || '塁'}牽制 `;
            isPitchOnly = true;
        } else if (/^Ru(\d+)/.test(cd)) {
            sPlay = `${baseBitmaskToText(parseInt(cd.slice(2), 10))}ランナースタート `;
            isPitchOnly = true;
        } else if (/^(Rs|Rd|Rc|Rf|Rg|Rr|Rz)(.*)/.test(cd)) {
            const k = cd.slice(0, 2);
            const lbl = { Rs: '盗塁', Rd: 'ダブルスチール', Rc: '守備無関心', Rf: '盗塁失敗', Rg: '牽制アウト', Rr: '走塁アウト', Rz: '' }[k];
            const initActor = ((k === 'Rr' || k === 'Rg') && /^[01]$/.test(cd[2])) ? cd[2] : '1';
            const res = processActionBody(cd.slice(2), curBatter, initActor);
            recordErrs = res.errDetails;
            sPlay = (lbl ? [lbl, ...res.msgs] : res.msgs).join(' ') + ' ';
        } else if (/^Sh([0-9a-z])#(\d+):/.test(cd)) {
            const [, oChr, pid] = cd.match(/^Sh([0-9a-z])#(\d+):/);
            const ord = parseInt(oChr, 36);
            const np = getPlayer(pid), op = lineup[battingSide].find(p => p && p.ord === ord);
            sPlay = `${ord + 1}番${op?.name || ''}に代打${np.name}${np.num ? '#' + np.num : ''}`;
            upsertLineupByOrd(battingSide, ord, { ...op, ord, id: parseInt(pid, 10), name: np.name, num: np.num });
        } else if (/^Sha#(\d+):/.test(cd)) {
            const [, pid] = cd.match(/^Sha#(\d+):/);
            const np = getPlayer(pid), ord = batterIdx[battingSide], op = lineup[battingSide][ord];
            sPlay = `${ord + 1}番${op?.name || ''}に代打${np.name}${np.num ? '#' + np.num : ''}`;
            upsertLineupByOrd(battingSide, op?.ord ?? ord, { ...op, ord: op?.ord ?? ord, id: parseInt(pid, 10), name: np.name, num: np.num });
        } else if (/^Sr([0-9a-z])#(\d+):/.test(cd)) {
            const [, oChr, pid] = cd.match(/^Sr([0-9a-z])#(\d+):/);
            const ord = parseInt(oChr, 36);
            const np = getPlayer(pid), op = lineup[battingSide].find(p => p && p.ord === ord);
            let baseFound = '';
            for (const b of [1, 2, 3]) {
                if (runners[b]?.id === op?.id) {
                    baseFound = `${b}塁ランナー`;
                    runners[b] = { id: parseInt(pid, 10), name: np.name, num: np.num };
                }
            }
            sPlay = `${baseFound}${op?.name || ''}に代走${np.name}${np.num ? '#' + np.num : ''}`;
            upsertLineupByOrd(battingSide, ord, { ...op, ord, id: parseInt(pid, 10), name: np.name, num: np.num });
        } else if (/^S(ih|ir)(\d)#(\d+):/.test(cd)) {
            const [, st, pos, pid] = cd.match(/^S(ih|ir)(\d)#(\d+):/);
            const np = getPlayer(pid);
            const slot = lineup[fsSide].find(p => p && p.id === parseInt(pid, 10));
            if (slot) slot.pos = parseInt(pos, 10);
            sPlay = `${st === 'ih' ? '代打' : '代走'}${np.name}が${SCORER_POS_NAMES[pos] || ''}へ`;
        } else if (/^Sk(\d)(\d)#(\d+):/.test(cd)) {
            const [, p1, p2, pid] = cd.match(/^Sk(\d)(\d)#(\d+):/);
            const np = getPlayer(pid);
            const slot = lineup[fsSide].find(p => p && p.id === parseInt(pid, 10));
            if (slot) slot.pos = parseInt(p2, 10);
            sPlay = `${SCORER_POS_NAMES[p1] || ''}${np.name}が${SCORER_POS_NAMES[p2] || ''}へ`;
        } else if (/^Skh(\d)#(\d+):/.test(cd)) {
            const [, p2, pid] = cd.match(/^Skh(\d)#(\d+):/);
            const np = getPlayer(pid);
            const slot = lineup[fsSide].find(p => p && p.id === parseInt(pid, 10));
            if (slot) slot.pos = parseInt(p2, 10);
            sPlay = `${np.name}が${SCORER_POS_NAMES[p2] || ''}へ`;
        } else if (/^Sd([0-9a-z])(\d)#(\d+):/.test(cd)) {
            const [, oChr, pos, pid] = cd.match(/^Sd([0-9a-z])(\d)#(\d+):/);
            const ord = parseInt(oChr, 36);
            const np = getPlayer(pid), op = lineup[fsSide].find(p => p && p.ord === ord);
            sPlay = `${ord + 1}番${op?.name || ''}に代わり${np.name}が${SCORER_POS_NAMES[pos] || ''}へ`;
            upsertLineupByOrd(fsSide, ord, { ...op, ord, pos: parseInt(pos, 10), id: parseInt(pid, 10), name: np.name, num: np.num });
        } else if (/^Sda(\d)#(\d+):/.test(cd)) {
            const [, pos, pid] = cd.match(/^Sda(\d)#(\d+):/);
            const np = getPlayer(pid), ord = 10, op = lineup[fsSide].find(p => p && p.ord === ord);
            sPlay = `${ord + 1}番${op?.name || ''}に代わり${np.name}が${SCORER_POS_NAMES[pos] || ''}へ`;
            upsertLineupByOrd(fsSide, ord, { ...op, ord, pos: parseInt(pos, 10), id: parseInt(pid, 10), name: np.name, num: np.num });
        } else if (/^W/.test(cd)) {
            isPitchOnly = true;
            if (cd === 'Wtf') sPlay = `${curTeamName}：チーム初安打 `;
            else if (/^Wtc(\d+)/.test(cd)) sPlay = `${curTeamName}：チーム${cd.slice(3)}者連続安打 `;
            else if (/^Whm(\d+)/.test(cd)) sPlay = `バッター${curBatter.name}：${cd.slice(3)}安打 `;
            else if (/^Wh(\d+)/.test(cd)) sPlay = `バッター${curBatter.name}：猛打賞 `;
            else if (/^Wkb(\d+)/.test(cd)) sPlay = `バッター${curBatter.name}：三振${cd.slice(3)}個目 `;
            else if (/^Wkc(\d+)/.test(cd)) {
                const p = findFielderByPos(fsSide, '0');
                sPlay = `ピッチャー${p?.name || ''}：${cd.slice(3)}者連続三振 `;
            }
        }

        recordErrs.forEach(errItem => {
            const fielder = errItem.pos !== undefined ? findFielderByPos(fsSide, errItem.pos) : null;
            errorEvents.push({
                inning: currentInningLabel,
                posName: errItem.posName,
                fielderName: fielder?.name || '',
                play: sPlay.trim(),
                isHomeFielding
            });
        });

        const rnrMask = getRnrBitmask();
        pcl.push({
            inn, ball, strk, out, rnr: rnrMask, trun: scores[0], brun: scores[1],
            isHomeBatting, isHomeFielding, currentBatterName: curBatter.name,
            codes: [{ cd, pli: { sPlay } }]
        });

        const trimmedPlay = sPlay.trim();
        if (trimmedPlay) {
            timeline.push({
                type,
                cd,
                inningLabel: currentInningLabel,
                half: battingSide === 0 ? 'top' : 'bot',
                isHomeBatting,
                text: trimmedPlay,
                scoreTop: scores[0],
                scoreBot: scores[1],
                topTeam,
                botTeam,
                ball,
                strk,
                out,
                rnr: rnrMask,
                basesText: formatBaseOccupiedText(rnrMask),
                isPitchOnly
            });
        }
    }

    // スコアボード情報の整理
    const topArr = Array.isArray(sc?.[0]?.[0]) ? sc[0][0] : [];
    const botArr = Array.isArray(sc?.[0]?.[1]) ? sc[0][1] : [];
    let maxInnings = 7;
    for (let i = Math.max(topArr.length, botArr.length) - 1; i >= 0; i--) {
        if ((topArr[i] !== undefined && topArr[i] !== -1) || (botArr[i] !== undefined && botArr[i] !== -1)) {
            maxInnings = Math.max(7, i + 1);
            break;
        }
    }
    const formatInnCell = (v) => {
        if (v === undefined || v === null || v === -1) return '';
        if (v === 300) return 'x';
        if (v >= 200) return `${v - 200}x`;
        return String(v);
    };

    const meta = {
        gid: detailObj?.gid,
        date: detailObj?.date || '',
        title: detailObj?.tt || cf?.title || '',
        stadium: detailObj?.pa || cf?.stadi || '',
        start: cf?.start || '',
        end: cf?.end || '',
        weather: cf?.weath || '',
        topTeam,
        botTeam,
        isHomeTop,
        isHomeBot,
        homeTid: isHomeTop && !isHomeBot
            ? (te[0]?.id ?? gteams[0]?.id ?? null)
            : (isHomeBot && !isHomeTop ? (te[1]?.id ?? gteams[1]?.id ?? null) : null),
        ti: detailObj?.ti || '',
        bi: detailObj?.bi || '',
        maxInnings,
        topInnings: Array.from({ length: maxInnings }, (_, i) => formatInnCell(topArr[i])),
        botInnings: Array.from({ length: maxInnings }, (_, i) => formatInnCell(botArr[i])),
        topSum: {
            r: sc?.[1]?.[0]?.[0] ?? scores[0],
            h: sc?.[1]?.[0]?.[1] ?? 0,
            b: sc?.[1]?.[0]?.[2] ?? 0,
            e: sc?.[1]?.[0]?.[3] ?? 0
        },
        botSum: {
            r: sc?.[1]?.[1]?.[0] ?? scores[1],
            h: sc?.[1]?.[1]?.[1] ?? 0,
            b: sc?.[1]?.[1]?.[2] ?? 0,
            e: sc?.[1]?.[1]?.[3] ?? 0
        }
    };

    return { meta, timeline, pcl, errorEvents, fld: detailObj?.fld || [], playerMap };
}

function formatGameTranscriptText(decoded, includePitches = false, halfFilter = 'all') {
    const { meta, timeline } = decoded;
    const lines = [];
    lines.push('==================================================');
    lines.push(`試合戦績文字起こし: ${meta.topTeam} vs ${meta.botTeam}`);
    lines.push(`日時: ${meta.date || '不明'}${meta.start ? ` (${meta.start}〜${meta.end || ''})` : ''} / 球場: ${meta.stadium || '不明'} / 大会: ${meta.title || '記録'}`);
    lines.push('==================================================');
    lines.push('');

    const innHeaders = Array.from({ length: meta.maxInnings }, (_, i) => String(i + 1));
    lines.push(['チーム', ...innHeaders, 'R', 'H', 'B', 'E'].join(' | '));
    lines.push([meta.topTeam, ...meta.topInnings.map(c => c || '-'), meta.topSum.r, meta.topSum.h, meta.topSum.b, meta.topSum.e].join(' | '));
    lines.push([meta.botTeam, ...meta.botInnings.map(c => c || '-'), meta.botSum.r, meta.botSum.h, meta.botSum.b, meta.botSum.e].join(' | '));
    if (meta.ti) lines.push(meta.ti);
    if (meta.bi) lines.push(meta.bi);
    lines.push('');

    const renderTextDots = (cnt, max) => {
        const c = Math.max(0, Math.min(max, cnt || 0));
        return '●'.repeat(c) + '○'.repeat(max - c);
    };

    timeline.forEach(item => {
        if (halfFilter !== 'all' && item.inningLabel !== halfFilter) return;
        if (!includePitches && item.isPitchOnly) return;

        if (item.type === 'inning_header') {
            lines.push(`\n--- ${item.text} ---`);
        } else if (item.type === 'batter') {
            lines.push(`■ ${item.text}`);
        } else if (item.type === 'inning_end' || item.type === 'game_end') {
            lines.push(`  ▶ ${item.text} (${meta.topTeam} ${item.scoreTop}-${item.scoreBot} ${meta.botTeam})`);
        } else {
            const countStr = includePitches
                ? `[B:${renderTextDots(item.ball, 4)} S:${renderTextDots(item.strk, 3)} O:${renderTextDots(item.out, 3)}]`
                : `[O:${renderTextDots(item.out, 3)}]`;
            const statusStr = `${meta.topTeam} ${item.scoreTop}-${item.scoreBot} ${meta.botTeam} ${countStr} ${item.basesText}`;
            lines.push(`  ${item.text}`);
            lines.push(`    ${statusStr}`);
        }
    });

    return lines.join('\n');
}

// =========================================================================
// DB連携 詳細分析タブ & 試合文字起こしUI描画
// =========================================================================

function getDetailGamesMatchingCurrentFilter() {
    const sourceList = tempPreviewDetails.length > 0 ? tempPreviewDetails : allGameDetails;
    if (tempPreviewDetails.length > 0) return sourceList;

    // 通常の共通フィルタ結果 (currentFiltered.games) と一致するDB詳細データのみを抽出
    const filteredGameIds = new Set((currentFiltered.games || []).map(g => g.id));
    const filteredKeySet = new Set(
        (currentFiltered.games || []).map(g => `${normalizeIsoDate(g.date)}_${(g.team_first || '').trim()}_${(g.team_second || '').trim()}`)
    );

    if (filteredGameIds.size === 0 && allGames.length > 0) {
        return [];
    }

    return sourceList.filter(gd => {
        if (allGames.length === 0) return true;
        if (filteredGameIds.has(gd.gid)) return true;
        const key = `${normalizeIsoDate(gd.date)}_${(gd.tn || '').trim()}_${(gd.bn || '').trim()}`;
        return filteredKeySet.has(key);
    });
}

function renderDetailAnalysisTab(preserveScope = true, forceScope = null) {
    const badgeEl = document.getElementById('detail-db-status-badge');
    const exitPreviewBtn = document.getElementById('btn-detail-exit-preview');
    const emptyEl = document.getElementById('detail-empty-notice');
    const scopeSel = document.getElementById('detail-scope-select');
    const quickListEl = document.getElementById('detail-games-quicklist');
    const jumpBarEl = document.getElementById('detail-jump-transcript-bar');
    const overviewEl = document.getElementById('detail-team-overview');
    const dashEl = document.getElementById('detail-analysis-dashboard');
    const transcriptPanel = document.getElementById('detail-transcript-panel');
    if (!scopeSel) return;

    const availableDetails = getDetailGamesMatchingCurrentFilter();
    const isPreviewMode = tempPreviewDetails.length > 0;

    if (badgeEl) {
        badgeEl.textContent = isPreviewMode
            ? `一時プレビュー表示中 (${availableDetails.length}試合)`
            : `DB保存詳細データ: 全${allGameDetails.length}試合（フィルタ一致: ${availableDetails.length}試合）`;
    }
    exitPreviewBtn?.classList.toggle('hidden', !isPreviewMode);

    if (availableDetails.length === 0) {
        emptyEl?.classList.remove('hidden');
        quickListEl?.classList.add('hidden');
        jumpBarEl?.classList.add('hidden');
        overviewEl?.classList.add('hidden');
        dashEl?.classList.add('hidden');
        transcriptPanel?.classList.add('hidden');
        scopeSel.innerHTML = '<option value="">表示できる詳細データがありません</option>';
        return;
    }

    emptyEl?.classList.add('hidden');

    const prevValue = forceScope || (preserveScope ? scopeSel.value : 'all') || 'all';
    const optionsHtml = [
        `<option value="all">📊 フィルタ一致 全試合合算 (${availableDetails.length}試合) ※選手打撃・打球方向・エラー傾向</option>`,
        ...availableDetails.map(gd => {
            const sc = extractScoreStringFromBackupGame(gd);
            return `<option value="${gd.gid}">📋 ${escapeHtml(gd.date || '日付不明')} | ${escapeHtml(gd.tn)} ${escapeHtml(sc)} ${escapeHtml(gd.bn)} (${escapeHtml(gd.tt || '試合')})</option>`;
        })
    ].join('');
    scopeSel.innerHTML = optionsHtml;

    if (prevValue === 'all' || availableDetails.some(gd => String(gd.gid) === String(prevValue))) {
        scopeSel.value = prevValue;
    } else {
        scopeSel.value = 'all';
    }

    const selectedScope = scopeSel.value;
    const targetDetails = selectedScope === 'all'
        ? availableDetails
        : availableDetails.filter(gd => String(gd.gid) === String(selectedScope));

    const decodedList = targetDetails.map(gd => decodeScorerGamePlayByPlay(gd));

    // 個別試合が選択されていれば分析の下にスコアボード＆文字起こしパネルを表示し、上部へジャンプリンクを出す
    if (selectedScope !== 'all' && decodedList.length === 1) {
        currentDecodedGameForTranscript = decodedList[0];
        detailTranscriptHalfFilter = 'all';
        renderSelectedGameTranscript();
        transcriptPanel?.classList.remove('hidden');
        jumpBarEl?.classList.remove('hidden');
        quickListEl?.classList.add('hidden');
    } else {
        currentDecodedGameForTranscript = null;
        transcriptPanel?.classList.add('hidden');
        jumpBarEl?.classList.add('hidden');
        if (quickListEl) {
            quickListEl.innerHTML = `
                <div class="text-xs font-bold text-gray-700 mb-2">📝 試合ごとのスコアボード＆戦績文字起こしを見る（クリックで切り替え）:</div>
                <div class="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                    ${availableDetails.map(gd => {
                        const sc = extractScoreStringFromBackupGame(gd);
                        return `<button type="button" data-quick-gid="${gd.gid}" class="text-xs px-2.5 py-1 rounded-lg border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-indigo-900 font-semibold transition-colors">${escapeHtml(gd.date || '')} ${escapeHtml(gd.tn)} ${escapeHtml(sc)} ${escapeHtml(gd.bn)}</button>`;
                    }).join('')}
                </div>
            `;
            quickListEl.classList.remove('hidden');
            quickListEl.querySelectorAll('button[data-quick-gid]').forEach(btn => {
                btn.addEventListener('click', () => {
                    renderDetailAnalysisTab(true, btn.dataset.quickGid);
                    document.getElementById('detail-transcript-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            });
        }
    }

    // 詳細集計データを生成して各種グラフ・選手別UIへ反映
    parsedDetailData = aggregateDecodedGames(decodedList);
    overviewEl?.classList.remove('hidden');
    dashEl?.classList.remove('hidden');
    renderTeamDetailOverview(parsedDetailData);
    initDetailAnalysisUI();
}

function renderSelectedGameTranscript() {
    const decoded = currentDecodedGameForTranscript;
    if (!decoded) return;
    const { meta, timeline } = decoded;

    document.getElementById('detail-transcript-title').textContent = `📋 ${meta.topTeam} ${meta.topSum.r} - ${meta.botSum.r} ${meta.botTeam}`;
    document.getElementById('detail-transcript-meta').textContent =
        `${meta.date || ''}${meta.start ? ` (${meta.start}〜${meta.end || ''})` : ''} | ${meta.title || '記録'} | 球場: ${meta.stadium || '不明'}${meta.weather ? ` | 天候: ${meta.weather}` : ''}`;

    // スコアボード描画 (R H B E)
    const sbTable = document.getElementById('detail-scoreboard-table');
    if (sbTable) {
        const innThs = Array.from({ length: meta.maxInnings }, (_, i) => `<th class="p-1.5 border bg-gray-100 w-7">${i + 1}</th>`).join('');
        const topTds = meta.topInnings.map(c => `<td class="p-1.5 border">${escapeHtml(c)}</td>`).join('');
        const botTds = meta.botInnings.map(c => `<td class="p-1.5 border">${escapeHtml(c)}</td>`).join('');
        sbTable.innerHTML = `
            <thead>
                <tr>
                    <th class="p-1.5 border bg-gray-100 text-left min-w-[120px]">チーム</th>
                    ${innThs}
                    <th class="p-1.5 border bg-gray-200 font-black w-8">R</th>
                    <th class="p-1.5 border bg-gray-200 font-bold w-8">H</th>
                    <th class="p-1.5 border bg-gray-200 font-bold w-8">B</th>
                    <th class="p-1.5 border bg-gray-200 font-bold w-8">E</th>
                </tr>
            </thead>
            <tbody>
                <tr class="${meta.isHomeTop ? 'bg-purple-50/60 font-bold' : 'bg-white'}">
                    <td class="p-1.5 border text-left ${meta.isHomeTop ? 'text-purple-800 font-black' : 'text-green-800 font-bold'}">${escapeHtml(meta.topTeam)}</td>
                    ${topTds}
                    <td class="p-1.5 border font-black bg-gray-50">${meta.topSum.r}</td>
                    <td class="p-1.5 border bg-gray-50">${meta.topSum.h}</td>
                    <td class="p-1.5 border bg-gray-50">${meta.topSum.b}</td>
                    <td class="p-1.5 border bg-gray-50">${meta.topSum.e}</td>
                </tr>
                <tr class="${meta.isHomeBot ? 'bg-purple-50/60 font-bold' : 'bg-white'}">
                    <td class="p-1.5 border text-left ${meta.isHomeBot ? 'text-purple-800 font-black' : 'text-green-800 font-bold'}">${escapeHtml(meta.botTeam)}</td>
                    ${botTds}
                    <td class="p-1.5 border font-black bg-gray-50">${meta.botSum.r}</td>
                    <td class="p-1.5 border bg-gray-50">${meta.botSum.h}</td>
                    <td class="p-1.5 border bg-gray-50">${meta.botSum.b}</td>
                    <td class="p-1.5 border bg-gray-50">${meta.botSum.e}</td>
                </tr>
            </tbody>
        `;
    }

    const batteryEl = document.getElementById('detail-battery-hr-info');
    if (batteryEl) {
        const lines = [];
        if (meta.ti) lines.push(`<div>${escapeHtml(meta.ti)}</div>`);
        if (meta.bi) lines.push(`<div>${escapeHtml(meta.bi)}</div>`);
        batteryEl.innerHTML = lines.join('');
        batteryEl.classList.toggle('hidden', lines.length === 0);
    }

    // 攻撃回フィルタータブ生成
    const halfTabsEl = document.getElementById('detail-transcript-half-tabs');
    if (halfTabsEl) {
        const halfLabels = [];
        timeline.forEach(item => {
            if (item.type === 'inning_header' && !halfLabels.includes(item.inningLabel)) {
                halfLabels.push(item.inningLabel);
            }
        });
        const makeBtn = (val, label) => {
            const active = detailTranscriptHalfFilter === val;
            return `<button type="button" data-half-filter="${escapeHtml(val)}" class="px-2.5 py-1 rounded-full text-xs font-bold border transition-colors ${active ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}">${escapeHtml(label)}</button>`;
        };
        halfTabsEl.innerHTML = makeBtn('all', '試合全体') + halfLabels.map(lbl => makeBtn(lbl, lbl)).join('');
        halfTabsEl.querySelectorAll('button[data-half-filter]').forEach(btn => {
            btn.addEventListener('click', () => {
                detailTranscriptHalfFilter = btn.dataset.halfFilter;
                renderSelectedGameTranscript();
            });
        });
    }

    // タイムライン描画
    const timelineEl = document.getElementById('detail-transcript-timeline');
    if (!timelineEl) return;

    const filteredItems = timeline.filter(item => {
        if (detailTranscriptHalfFilter !== 'all' && item.inningLabel !== detailTranscriptHalfFilter) return false;
        if (!detailTranscriptShowPitches && item.isPitchOnly) return false;
        return true;
    });

    const renderBaseSvg = (mask) => {
        const c1 = (mask & 1) ? '#f59e0b' : '#ffffff';
        const c2 = (mask & 2) ? '#f59e0b' : '#ffffff';
        const c3 = (mask & 4) ? '#f59e0b' : '#ffffff';
        return `<svg viewBox="0 0 36 24" class="w-8 h-5 inline-block align-middle ml-1" aria-label="${escapeHtml(formatBaseOccupiedText(mask))}">
            <polygon points="18,2 23,7 18,12 13,7" fill="${c2}" stroke="#9ca3af" stroke-width="1.2"/>
            <polygon points="25,9 30,14 25,19 20,14" fill="${c1}" stroke="#9ca3af" stroke-width="1.2"/>
            <polygon points="11,9 16,14 11,19 6,14" fill="${c3}" stroke="#9ca3af" stroke-width="1.2"/>
        </svg>`;
    };

    const renderDotGroup = (label, labelClass, count, maxCount, activeClass) => {
        const c = Math.max(0, Math.min(maxCount, count || 0));
        const dots = Array.from({ length: maxCount }, (_, idx) =>
            `<span class="inline-block w-2.5 h-2.5 rounded-full border ${idx < c ? activeClass : 'bg-white border-gray-300'}"></span>`
        ).join('');
        return `<span class="inline-flex items-center gap-0.5" data-count-type="${label}"><span class="font-black text-[11px] leading-none mr-0.5 ${labelClass}">${label}</span>${dots}</span>`;
    };

    const renderCountDots = (item) => {
        if (!detailTranscriptShowPitches) {
            return `<span class="inline-flex items-center ml-1" title="O:${item.out || 0}">${renderDotGroup('O', 'text-red-600', item.out, 3, 'bg-red-500 border-red-600')}</span>`;
        }
        const b = Math.max(0, Math.min(4, item.ball || 0));
        const s = Math.max(0, Math.min(3, item.strk || 0));
        const o = Math.max(0, Math.min(3, item.out || 0));
        return `<span class="inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 ml-1" title="B:${b} S:${s} O:${o}">${renderDotGroup('B', 'text-green-700', b, 4, 'bg-green-500 border-green-600')}${renderDotGroup('S', 'text-amber-600', s, 3, 'bg-amber-400 border-amber-500')}${renderDotGroup('O', 'text-red-600', o, 3, 'bg-red-500 border-red-600')}</span>`;
    };

    timelineEl.innerHTML = filteredItems.map(item => {
        if (item.type === 'inning_header') {
            return `<div class="bg-amber-50 border border-amber-200 text-amber-950 font-black px-3 py-1.5 rounded text-sm mt-2">${escapeHtml(item.text)}</div>`;
        }
        if (item.type === 'batter') {
            return `<div class="bg-emerald-900 text-white font-bold px-3 py-1.5 rounded text-xs tracking-wide">${escapeHtml(item.text)}</div>`;
        }
        if (item.type === 'inning_end' || item.type === 'game_end') {
            return `<div class="bg-gray-200 text-gray-800 font-bold px-3 py-1 rounded text-xs flex justify-between items-center">
                <span>${escapeHtml(item.text)}</span>
                <span class="text-[11px] text-gray-600">${escapeHtml(item.topTeam)} ${item.scoreTop}-${item.scoreBot} ${escapeHtml(item.botTeam)}</span>
            </div>`;
        }
        const pitchClass = item.isPitchOnly ? 'bg-gray-50 border-gray-200 text-gray-600' : 'bg-white border-emerald-200 text-emerald-950';
        return `<div class="border px-3 py-2 rounded shadow-2xs ${pitchClass}">
            <div class="text-xs font-bold">${escapeHtml(item.text)}</div>
            <div class="text-[11px] text-gray-600 mt-1 flex flex-wrap items-center justify-between gap-1">
                <span>${escapeHtml(item.topTeam)} <strong class="text-gray-900">${item.scoreTop}-${item.scoreBot}</strong> ${escapeHtml(item.botTeam)}</span>
                <span class="flex flex-wrap items-center gap-1">${renderCountDots(item)} ${renderBaseSvg(item.rnr)} <span class="ml-1 text-[10px] text-gray-500">${escapeHtml(item.basesText)}</span></span>
            </div>
        </div>`;
    }).join('');
}

async function handleCopyCurrentTranscript() {
    if (!currentDecodedGameForTranscript) return;
    const txt = formatGameTranscriptText(currentDecodedGameForTranscript, detailTranscriptShowPitches, detailTranscriptHalfFilter);
    try {
        await navigator.clipboard.writeText(txt);
        alert('試合経過のテキストをクリップボードにコピーしました。');
    } catch (e) {
        alert('クリップボードへのコピーに失敗しました。ダウンロードボタンをご利用ください。');
    }
}

function handleDownloadCurrentTranscript() {
    if (!currentDecodedGameForTranscript) return;
    const { meta } = currentDecodedGameForTranscript;
    const txt = formatGameTranscriptText(currentDecodedGameForTranscript, detailTranscriptShowPitches, detailTranscriptHalfFilter);
    const dateDigits = (meta.date || '').replace(/[^0-9]/g, '') || String(meta.gid || 'game');
    downloadBlobFile('\uFEFF' + txt, 'text/plain;charset=utf-8;', `戦績文字起こし_${dateDigits}_${meta.topTeam}_vs_${meta.botTeam}.txt`);
}

function handleDetailDataLoad() {
    const fileInput = document.getElementById('detail-analysis-file');
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        return alert('ファイルを選択してください。');
    }
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const text = String(e.target.result || '').replace(/^\uFEFF/, '');
            const data = JSON.parse(text);
            if (Array.isArray(data.game) && data.game.length > 0) {
                const extracted = extractFromScorerBackup(data);
                tempPreviewDetails = extracted.gameDetails;
                renderDetailAnalysisTab(false, tempPreviewDetails.length === 1 ? String(tempPreviewDetails[0].gid) : 'all');
                return;
            }
            // 旧 sysdata23 単体フォールバック
            const legacy = parseScorerData(data);
            if (!legacy) {
                return alert('詳細データのパースに失敗しました (game配列またはsysdata23が見つかりません)。');
            }
            parsedDetailData = legacy;
            document.getElementById('detail-analysis-dashboard')?.classList.remove('hidden');
            initDetailAnalysisUI();
        } catch (err) {
            console.error(err);
            alert('JSONデータのパースに失敗しました。ファイル形式を確認してください。');
        }
    };
    reader.readAsText(file);
}

// 複数または単一のデコード済み試合データから詳細集計オブジェクトを構築
function aggregateDecodedGames(decodedList) {
    const result = {
        innings: {}, // e.g. '1回': { ours: 0, opp: 0 }
        batters: {}, // key: normalizedPlayerName
        batterDisplayNames: {},
        steals: {},
        errors: {
            byInning: {},
            byPosition: {},
            byPlayer: {}
        },
        counts: {}
    };

    const ensureInningBucket = (lbl) => {
        const innNumMatch = String(lbl).match(/^(\d+回)/);
        const innKey = innNumMatch ? innNumMatch[1] : lbl;
        if (!result.innings[innKey]) {
            result.innings[innKey] = { ourRuns: 0, oppRuns: 0, outs: { strikeout: 0, groundout: 0, flyout: 0, other: 0 } };
        }
        return result.innings[innKey];
    };

    const ensureBatterBucket = (displayName) => {
        const normKey = normalizePlayerNameKey(displayName);
        if (!normKey) return null;
        if (!result.batters[normKey]) {
            result.batterDisplayNames[normKey] = displayName;
            result.batters[normKey] = {
                pa: 0, ab: 0, hits: 0, strikeout: 0, walk: 0,
                groundout: 0, flyout: 0, otherout: 0, rbi: 0,
                chances: { pa: 0, hits: 0, rbi: 0 },
                directions: { left: 0, center: 0, right: 0, inner: 0, other: 0 },
                counts: {}
            };
        }
        return result.batters[normKey];
    };

    const isScoringPosition = (rnr) => [2, 3, 4, 5, 6, 7].includes(rnr);

    decodedList.forEach(decoded => {
        const { meta, pcl, errorEvents, fld, playerMap } = decoded;
        const hasHomeTeamInGame = (meta.isHomeTop && !meta.isHomeBot) || (!meta.isHomeTop && meta.isHomeBot);
        // 複数試合合算時は紅白戦（「ありんこ vs アントス」等）を集計から除外
        if (decodedList.length > 1) {
            const t1 = (meta.topTeam || '').trim(), t2 = (meta.botTeam || '').trim();
            if (t1 === 'ありんこ' || t1 === 'アントス' || t2 === 'ありんこ' || t2 === 'アントス' ||
                (meta.isHomeTop && meta.isHomeBot) || (meta.title || '').includes('紅白')) {
                return;
            }
        }

        // 1. イニング別得失点の集計 (公式スコア sc に基づく)
        for (let i = 0; i < meta.maxInnings; i++) {
            const topRaw = meta.topInnings[i];
            const botRaw = meta.botInnings[i];
            if (!topRaw && !botRaw) continue;
            const bucket = ensureInningBucket(`${i + 1}回`);
            const topNum = topRaw && topRaw !== 'x' ? (parseInt(topRaw, 10) || 0) : 0;
            const botNum = botRaw && botRaw !== 'x' ? (parseInt(botRaw, 10) || 0) : 0;
            if (meta.isHomeTop) { bucket.ourRuns += topNum; bucket.oppRuns += botNum; }
            else if (meta.isHomeBot) { bucket.ourRuns += botNum; bucket.oppRuns += topNum; }
            else { bucket.ourRuns += topNum + botNum; }
        }

        // 2. エラー状況の集計 (守備側が自チームの場合、またはチーム不明時は両方)
        const gameErrCountByPlayer = new Map();
        let gameRecordedErrTotal = 0;
        errorEvents.forEach(ev => {
            if (hasHomeTeamInGame && !ev.isHomeFielding) return;
            gameRecordedErrTotal++;
            result.errors.byInning[ev.inning] = (result.errors.byInning[ev.inning] || 0) + 1;
            const posLbl = ev.posName || 'その他';
            result.errors.byPosition[posLbl] = (result.errors.byPosition[posLbl] || 0) + 1;

            if (ev.fielderName) {
                const normKey = normalizePlayerNameKey(ev.fielderName);
                gameErrCountByPlayer.set(normKey, (gameErrCountByPlayer.get(normKey) || 0) + 1);
                if (!result.errors.byPlayer[normKey]) result.errors.byPlayer[normKey] = [];
                result.errors.byPlayer[normKey].push({
                    inning: `${meta.date ? meta.date + ' ' : ''}${ev.inning}`,
                    play: `[${posLbl}] ${ev.play}`
                });
            }
        });

        // fld[] (Scorer公式守備集計) からプレイログで拾いきれなかった失策を補完 (対象試合でまだ未記録の不足分がある場合のみ)
        const ourScErrors = meta.isHomeTop ? (meta.topSum?.e || 0) : (meta.isHomeBot ? (meta.botSum?.e || 0) : 0);
        if (Array.isArray(fld) && (gameRecordedErrTotal === 0 || (ourScErrors > 0 && gameRecordedErrTotal < ourScErrors))) {
            const fldByPlayer = new Map();
            fld.forEach(f => {
                if (meta.homeTid != null && f.tid != null && String(f.tid) !== String(meta.homeTid)) return;
                const errCnt = Array.isArray(f.st) ? (parseInt(f.st[4], 10) || 0) : 0;
                if (errCnt <= 0) return;
                const pName = playerMap.get(parseInt(f.pid, 10))?.name || allPlayers.find(p => p.id == f.pid)?.name;
                if (!pName) return;
                const normKey = normalizePlayerNameKey(pName);
                const posLabel = FLD_POS_NAMES[f.st[0]] || '守備';
                if (!fldByPlayer.has(normKey)) fldByPlayer.set(normKey, { total: 0, items: [] });
                const entry = fldByPlayer.get(normKey);
                entry.total += errCnt;
                entry.items.push({ posLabel, cnt: errCnt });
            });

            fldByPlayer.forEach((entry, normKey) => {
                let remaining = entry.total - (gameErrCountByPlayer.get(normKey) || 0);
                if (remaining <= 0) return;
                if (!result.errors.byPlayer[normKey]) result.errors.byPlayer[normKey] = [];
                entry.items.forEach(({ posLabel, cnt }) => {
                    const take = Math.min(remaining, cnt);
                    for (let k = 0; k < take; k++) {
                        result.errors.byPosition[posLabel] = (result.errors.byPosition[posLabel] || 0) + 1;
                        result.errors.byInning['記録集計'] = (result.errors.byInning['記録集計'] || 0) + 1;
                        result.errors.byPlayer[normKey].push({
                            inning: meta.date || '試合内',
                            play: `記録失策 (${posLabel})`
                        });
                    }
                    remaining -= take;
                });
            });
        }

        // 3. 打席・打球方向・得点圏・カウント別・盗塁の集計
        let currentInnLbl = '1回表';
        let currentBatterName = null;
        let currentBatterBucket = null;
        let prePitchBall = 0;
        let prePitchStrk = 0;

        pcl.forEach(play => {
            const rnr = play.rnr;
            const onlyAntsFilter = !hasHomeTeamInGame || play.isHomeBatting;

            (play.codes || []).forEach(c => {
                const cd = c.cd || '';
                const text = (c.pli?.sPlay || '').trim();
                if (!text) {
                    prePitchBall = play.ball;
                    prePitchStrk = play.strk;
                    return;
                }

                const innMatch = text.match(/^(\d+回(?:表|ｳﾗ|裏))/);
                if (innMatch) currentInnLbl = innMatch[1];

                // 打席開始
                const batterMatch = text.match(/^\d+番(.+?)(?:#\d+)?$/);
                if (batterMatch) {
                    if (onlyAntsFilter) {
                        currentBatterName = batterMatch[1].trim();
                        currentBatterBucket = ensureBatterBucket(currentBatterName);
                        if (currentBatterBucket) {
                            currentBatterBucket.pa++;
                            if (isScoringPosition(rnr)) currentBatterBucket.chances.pa++;
                        }
                    } else {
                        currentBatterName = null;
                        currentBatterBucket = null;
                    }
                    prePitchBall = 0;
                    prePitchStrk = 0;
                    return;
                }

                // 代打時にも現在打者を切り替え
                const phMatch = text.match(/^\d+番.+?に代打(.+?)(?:#\d+)?$/);
                if (phMatch && onlyAntsFilter) {
                    currentBatterName = phMatch[1].trim();
                    currentBatterBucket = ensureBatterBucket(currentBatterName);
                }

                // 盗塁集計
                if (onlyAntsFilter && (cd.startsWith('Rs') || cd.startsWith('Rf') || cd.startsWith('Rd') || text.includes('盗塁'))) {
                    const runnerMatch = text.match(/(?:ランナー|打者)([^0-9\s]+(?:\s[^0-9\s]+)?)(?:\d+塁|本塁|$)/);
                    if (runnerMatch) {
                        const rNorm = normalizePlayerNameKey(runnerMatch[1]);
                        if (rNorm && rNorm !== '打者') {
                            if (!result.steals[rNorm]) result.steals[rNorm] = { attempts: 0, success: 0, fail: 0 };
                            result.steals[rNorm].attempts++;
                            if (text.includes('失敗') || text.includes('アウト')) result.steals[rNorm].fail++;
                            else result.steals[rNorm].success++;
                        }
                    }
                }

                if (onlyAntsFilter && currentBatterBucket) {
                    // 打点カウント
                    const rbiMatches = text.match(/生還/g);
                    if (rbiMatches && !cd.startsWith('Ew') && !cd.startsWith('Ep') && !cd.startsWith('Dk') && !cd.startsWith('Rs')) {
                        currentBatterBucket.rbi += rbiMatches.length;
                        if (isScoringPosition(rnr)) currentBatterBucket.chances.rbi += rbiMatches.length;
                    }

                    const isAtBatResult = /^(H[1-4]|Go|Gob|Fo|Fob|Fof|Fol|Ko|Bb|Db|K[wpt])/.test(cd);
                    if (isAtBatResult) {
                        const countKey = `${Math.min(3, prePitchBall)}-${Math.min(2, prePitchStrk)}`;
                        if (!result.counts[countKey]) result.counts[countKey] = { pa: 0, hits: 0 };
                        result.counts[countKey].pa++;
                        if (/^H[1-4]/.test(cd)) result.counts[countKey].hits++;

                        if (!currentBatterBucket.counts[countKey]) currentBatterBucket.counts[countKey] = { pa: 0, hits: 0 };
                        currentBatterBucket.counts[countKey].pa++;
                        if (/^H[1-4]/.test(cd)) currentBatterBucket.counts[countKey].hits++;
                    }

                    const innBucket = ensureInningBucket(currentInnLbl);
                    if (/^H[1-4]/.test(cd)) {
                        currentBatterBucket.hits++;
                        currentBatterBucket.ab++;
                        if (isScoringPosition(rnr)) currentBatterBucket.chances.hits++;
                        if (text.includes('レフト')) currentBatterBucket.directions.left++;
                        else if (text.includes('センター')) currentBatterBucket.directions.center++;
                        else if (text.includes('ライト')) currentBatterBucket.directions.right++;
                        else if (text.includes('内野') || /ピッチャー|キャッチャー|ファースト|セカンド|サード|ショート/.test(text)) currentBatterBucket.directions.inner++;
                        else currentBatterBucket.directions.other++;
                    } else if (/^(Bb|Db)/.test(cd)) {
                        currentBatterBucket.walk++;
                    } else if (cd === 'Ko' || /^K[wpt]/.test(cd)) {
                        currentBatterBucket.strikeout++;
                        currentBatterBucket.ab++;
                        innBucket.outs.strikeout++;
                    } else if (/^Gob?/.test(cd)) {
                        if (!cd.includes('Cb')) {
                            currentBatterBucket.ab++;
                        }
                        currentBatterBucket.groundout++;
                        innBucket.outs.groundout++;
                        if (text.includes('サード') || text.includes('ショート')) currentBatterBucket.directions.left++;
                        else if (text.includes('セカンド') || text.includes('ファースト')) currentBatterBucket.directions.right++;
                        else currentBatterBucket.directions.inner++;
                    } else if (/^Fo/.test(cd)) {
                        currentBatterBucket.flyout++;
                        if (!cd.includes('Cf')) {
                            currentBatterBucket.ab++;
                        }
                        innBucket.outs.flyout++;
                        if (text.includes('レフト')) currentBatterBucket.directions.left++;
                        else if (text.includes('センター')) currentBatterBucket.directions.center++;
                        else if (text.includes('ライト')) currentBatterBucket.directions.right++;
                        else currentBatterBucket.directions.inner++;
                    }
                }

                // 投球前のカウントを次回用に保持
                prePitchBall = play.ball;
                prePitchStrk = play.strk;
            });
        });
    });

    return result;
}

// 旧 sysdata23 単体 JSON 解析互換用ラッパー
function parseScorerData(data) {
    const sys23 = data?.sys ? data.sys.find(s => s.ke === 'sysdata23') : null;
    if (!sys23 || !sys23.va) return null;
    const pclData = safeJsonParse(sys23.va, null);
    if (!pclData || !Array.isArray(pclData.pcl)) return null;
    return aggregateDecodedGames([{
        meta: { date: '', isHomeTop: false, isHomeBot: false, maxInnings: 0, topInnings: [], botInnings: [] },
        pcl: pclData.pcl,
        errorEvents: [],
        fld: [],
        playerMap: new Map()
    }]);
}

async function renderTeamDetailOverview(detailData) {
    if (!detailData) return;
    await loadChartJs();

    const innLabels = Object.keys(detailData.innings).sort((a, b) => (parseInt(a, 10) || 99) - (parseInt(b, 10) || 99));
    const ourRuns = innLabels.map(k => detailData.innings[k].ourRuns);
    const oppRuns = innLabels.map(k => detailData.innings[k].oppRuns);

    if (detailCharts.innings) detailCharts.innings.destroy();
    const innCanvas = document.getElementById('chart-detail-innings');
    if (innCanvas) {
        detailCharts.innings = new window.Chart(innCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: innLabels,
                datasets: [
                    { label: '自チーム得点', data: ourRuns, backgroundColor: 'rgba(16, 185, 129, 0.75)' },
                    { label: '失点', data: oppRuns, backgroundColor: 'rgba(239, 68, 68, 0.75)' }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
            }
        });
    }

    const errSummaryEl = document.getElementById('detail-team-errors-summary');
    if (errSummaryEl) {
        const posEntries = Object.entries(detailData.errors.byPosition).sort((a, b) => b[1] - a[1]);
        const parseInningOrder = (lbl) => {
            const m = String(lbl).match(/^(\d+)回(表|ｳﾗ|裏)?/);
            if (!m) return 9999;
            return parseInt(m[1], 10) * 10 + (m[2] === '表' ? 0 : 1);
        };
        const innEntries = Object.entries(detailData.errors.byInning)
            .sort((a, b) => parseInningOrder(a[0]) - parseInningOrder(b[0]) || a[0].localeCompare(b[0]));
        const totalErrors = posEntries.reduce((sum, [, cnt]) => sum + cnt, 0);
        if (posEntries.length === 0) {
            errSummaryEl.innerHTML = '<div class="text-gray-400 text-center py-6">対象試合で記録されたエラーはありません</div>';
        } else {
            errSummaryEl.innerHTML = `
                <div class="flex items-center justify-between text-[11px] font-bold text-yellow-900 bg-yellow-100/70 border border-yellow-200 rounded px-2.5 py-1 mb-2">
                    <span>総記録エラー数</span>
                    <span class="text-sm font-black">${totalErrors} 件</span>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                    ${posEntries.map(([pos, cnt]) => `
                        <div class="bg-yellow-50 border border-yellow-200 rounded p-2 text-center">
                            <div class="text-[11px] font-bold text-yellow-800">${escapeHtml(pos)}</div>
                            <div class="text-lg font-black text-yellow-700">${cnt} 件</div>
                        </div>
                    `).join('')}
                </div>
                <div class="text-[11px] text-gray-600 border-t pt-2">
                    <strong>発生イニング別:</strong> ${innEntries.map(([inn, c]) => `${escapeHtml(inn)}(${c})`).join(' / ')}
                </div>
            `;
        }
    }
}

function initDetailAnalysisUI() {
    if (!parsedDetailData) return;

    const playerSelect = document.getElementById('detail-player-select');
    if (!playerSelect) return;

    const antsNormNames = allPlayers.map(p => normalizePlayerNameKey(p.name));
    const keys = Object.keys(parsedDetailData.batters);

    const filteredKeys = keys.filter(normKey => {
        if (antsNormNames.length === 0) return true;
        return antsNormNames.some(an => an && (normKey.includes(an) || an.includes(normKey)));
    });
    const targetKeys = (filteredKeys.length > 0 ? filteredKeys : keys).sort((a, b) =>
        (parsedDetailData.batterDisplayNames[a] || a).localeCompare(parsedDetailData.batterDisplayNames[b] || b)
    );

    if (targetKeys.length === 0) {
        playerSelect.innerHTML = '<option value="">該当する選手がいません</option>';
        return;
    }

    const prevSelected = playerSelect.value;
    playerSelect.innerHTML = targetKeys.map(k =>
        `<option value="${escapeHtml(k)}">${escapeHtml(parsedDetailData.batterDisplayNames[k] || k)}</option>`
    ).join('');

    if (prevSelected && targetKeys.includes(prevSelected)) {
        playerSelect.value = prevSelected;
    }

    playerSelect.onchange = function(e) {
        renderPlayerDetailReport(e.target.value);
    };

    renderPlayerDetailReport(playerSelect.value || targetKeys[0]);
}

async function renderPlayerDetailReport(playerKey) {
    if (!parsedDetailData || !playerKey) return;
    await loadChartJs();

    const normKey = normalizePlayerNameKey(playerKey);
    const bData = parsedDetailData.batters[normKey] || parsedDetailData.batters[playerKey] || {
        pa: 0, ab: 0, hits: 0, strikeout: 0, walk: 0,
        groundout: 0, flyout: 0, otherout: 0, rbi: 0,
        chances: { pa: 0, hits: 0, rbi: 0 },
        directions: { left: 0, center: 0, right: 0, inner: 0, other: 0 },
        counts: {}
    };

    document.getElementById('stat-p-hits').textContent = bData.hits;
    document.getElementById('stat-p-strikeouts').textContent = bData.strikeout;
    document.getElementById('stat-p-groundouts').textContent = bData.groundout;
    document.getElementById('stat-p-flyouts').textContent = bData.flyout;
    document.getElementById('stat-p-walks').textContent = bData.walk || 0;
    document.getElementById('stat-p-others').textContent = bData.otherout;

    const ab = bData.ab || Math.max(0, bData.pa - (bData.walk || 0));
    const avg = ab > 0 ? (bData.hits / ab) : 0;
    document.getElementById('stat-p-avg').textContent = avg.toFixed(3).replace(/^0/, '');

    if (detailCharts.playerBattingResult) detailCharts.playerBattingResult.destroy();
    const ctxBatting = document.getElementById('chart-detail-player-batting-result').getContext('2d');
    detailCharts.playerBattingResult = new window.Chart(ctxBatting, {
        type: 'doughnut',
        data: {
            labels: ['安打', '三振', 'ゴロ', 'フライ', '四死球', '他'],
            datasets: [{
                data: [bData.hits, bData.strikeout, bData.groundout, bData.flyout, bData.walk || 0, bData.otherout],
                backgroundColor: ['#10B981', '#EF4444', '#FBBF24', '#3B82F6', '#6366F1', '#9CA3AF']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });

    if (detailCharts.playerDirection) detailCharts.playerDirection.destroy();
    const dirData = [bData.directions.left, bData.directions.center, bData.directions.right, bData.directions.inner, bData.directions.other];
    const ctxDir = document.getElementById('chart-detail-player-direction').getContext('2d');
    detailCharts.playerDirection = new window.Chart(ctxDir, {
        type: 'doughnut',
        data: {
            labels: ['レフト方向', 'センター方向', 'ライト方向', '内野・投捕', 'その他'],
            datasets: [{
                data: dirData,
                backgroundColor: ['#EC4899', '#3B82F6', '#14B8A6', '#F59E0B', '#8B5CF6']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } } }
        }
    });

    const chancePa = bData.chances.pa;
    const chanceHits = bData.chances.hits;
    const chanceAvg = chancePa > 0 ? (chanceHits / chancePa) : 0;
    document.getElementById('stat-p-chance-avg').textContent = chanceAvg.toFixed(3).replace(/^0/, '');
    document.getElementById('stat-p-chance-detail').textContent = `${chancePa}打席 ${chanceHits}安打`;
    document.getElementById('stat-p-rbi').textContent = bData.rbi;

    let playerSteals = parsedDetailData.steals[normKey] || { attempts: 0, success: 0, fail: 0 };
    if (playerSteals.attempts === 0) {
        const matchStealKey = Object.keys(parsedDetailData.steals).find(k => normKey.includes(k) || k.includes(normKey));
        if (matchStealKey) playerSteals = parsedDetailData.steals[matchStealKey];
    }
    const stealRate = playerSteals.attempts > 0 ? (playerSteals.success / playerSteals.attempts * 100) : 0;
    document.getElementById('stat-p-steal-rate').textContent = stealRate.toFixed(1) + '%';
    document.getElementById('stat-p-steal-detail').textContent = `成功 ${playerSteals.success} / 企図 ${playerSteals.attempts}`;

    const playerErrors = parsedDetailData.errors.byPlayer[normKey] || [];
    document.getElementById('stat-p-errors-count').textContent = `${playerErrors.length} 件`;

    const errorsDetailEl = document.getElementById('stat-p-errors-detail');
    if (errorsDetailEl) {
        if (playerErrors.length === 0) {
            errorsDetailEl.innerHTML = '<div class="text-gray-400 text-center py-2">対象期間・試合でエラーの記録はありません</div>';
        } else {
            errorsDetailEl.innerHTML = playerErrors.map(err => `
                <div class="border-b pb-1 last:border-0 mb-1">
                    <span class="font-bold text-blue-600 bg-blue-50 px-1 rounded">${escapeHtml(err.inning)}</span>
                    <span class="text-gray-700">${escapeHtml(err.play)}</span>
                </div>
            `).join('');
        }
    }

    const playerCounts = bData.counts || {};
    const allCounts = ['0-0', '1-0', '2-0', '3-0', '0-1', '1-1', '2-1', '3-1', '0-2', '1-2', '2-2', '3-2'];
    const pas = allCounts.map(c => playerCounts[c] ? playerCounts[c].pa : 0);
    const hits = allCounts.map(c => playerCounts[c] ? playerCounts[c].hits : 0);

    if (detailCharts.playerCount) detailCharts.playerCount.destroy();
    const ctxCount = document.getElementById('chart-detail-player-count').getContext('2d');
    detailCharts.playerCount = new window.Chart(ctxCount, {
        type: 'bar',
        data: {
            labels: allCounts.map(c => c + ' count'),
            datasets: [
                { label: '打席数', data: pas, backgroundColor: 'rgba(99, 102, 241, 0.6)' },
                { label: '安打数', data: hits, backgroundColor: 'rgba(16, 185, 129, 0.8)' }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1 } }
            }
        }
    });
}
