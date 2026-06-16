import { supabaseClient, showLoading, hideLoading, currentUserRole, logAction } from './main.js';

let isDashboardInitialized = false;
let allGames = [];
let allBatterStats = [];
let allPitcherStats = [];
let allPlayers = [];
let dashboardSettings = { homeTeamNames: ['ありんこアントス@A軍'], defaultFilterDate: { from: '', to: '', teamRegex: '', category: '' } };
let isFilterInitialized = false;
let charts = {};
let personalCharts = {};
let comparisonCharts = {};
let testModeCharts = {};
let currentRankingData = { batter: [], pitcher: [] };
let rankingSortState = { batter: { key: 'ops', order: 'desc' }, pitcher: { key: 'era', order: 'asc' } };

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
                <button data-tab="test-mode" class="px-4 py-2 font-bold text-gray-500 border-b-2 border-transparent hover:text-gray-700 whitespace-nowrap transition-colors">テストモード</button>
                <button data-tab="settings" class="px-4 py-2 font-bold text-gray-500 border-b-2 border-transparent hover:text-gray-700 whitespace-nowrap transition-colors">設定</button>
                <button data-tab="import-data" class="px-4 py-2 font-bold text-gray-500 border-b-2 border-transparent hover:text-gray-700 whitespace-nowrap transition-colors">データインポート</button>
            </div>
            
            <div id="tab-content-team-summary">
                <div class="bg-white p-4 rounded-lg shadow-md mb-6 text-sm">
                    <h3 class="font-bold mb-2 text-gray-800 border-b pb-1">フィルタ設定</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 mt-2">
                        <div>
                            <label class="block text-gray-600 font-bold mb-1">期間</label>
                            <div class="flex items-center space-x-2">
                                <input type="date" id="filter-date-from" class="border p-1.5 rounded w-full">
                                <span class="text-gray-500">〜</span>
                                <input type="date" id="filter-date-to" class="border p-1.5 rounded w-full">
                            </div>
                        </div>
                        <div>
                            <label class="block text-gray-600 font-bold mb-1">相手チーム名 (正規表現可)</label>
                            <input type="text" id="filter-team-regex" class="border p-1.5 rounded w-full" placeholder="例: イーグルス|シャークス">
                        </div>
                        <div>
                            <label class="block text-gray-600 font-bold mb-1">大会・カテゴリ (複数選択/カンマ区切)</label>
                            <input type="text" id="filter-category" class="border p-1.5 rounded w-full" placeholder="例: 練習試合, 東部近隣大会">
                        </div>
                    </div>
                    <div class="flex space-x-3">
                        <button id="btn-apply-filter" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded font-bold shadow-sm">適用</button>
                        <button id="btn-clear-filter" class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1.5 rounded font-bold shadow-sm">クリア/リセット</button>
                    </div>
                </div>

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
                <div class="bg-white p-4 rounded-lg shadow-md flex flex-wrap gap-4 items-end text-sm">
                    <div><label class="block font-bold text-gray-600 mb-1">選手</label><select id="ps-player" class="border p-2 rounded w-48"></select></div>
                    <div><label class="block font-bold text-gray-600 mb-1">役割</label><select id="ps-role" class="border p-2 rounded w-24"><option value="batter">打撃</option><option value="pitcher">投手</option></select></div>
                    <div><label class="block font-bold text-gray-600 mb-1">集計単位</label><select id="ps-unit" class="border p-2 rounded w-32"><option value="game">試合別</option><option value="month" selected>月別</option><option value="3month">3ヶ月ごと</option></select></div>
                </div>
                <div id="ps-batter-charts" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-white p-4 rounded shadow-md"><canvas id="chart-ps-b-cum"></canvas></div>
                    <div class="bg-white p-4 rounded shadow-md"><canvas id="chart-ps-b-rate"></canvas></div>
                    <div class="bg-white p-4 rounded shadow-md md:col-span-2 relative min-h-[300px] md:min-h-[400px]"><canvas id="chart-ps-b-game"></canvas></div>
                </div>
                <div id="ps-pitcher-charts" class="grid grid-cols-1 md:grid-cols-2 gap-6 hidden">
                    <div class="bg-white p-4 rounded shadow-md"><canvas id="chart-ps-p-cum"></canvas></div>
                    <div class="bg-white p-4 rounded shadow-md"><canvas id="chart-ps-p-rate"></canvas></div>
                </div>
            </div>

            <div id="tab-content-ranking" class="hidden space-y-6">
                <div class="flex border-b mb-4 space-x-2">
                    <button data-ranking-tab="batter" class="px-4 py-2 font-bold text-blue-600 border-b-2 border-blue-600 whitespace-nowrap transition-colors">打撃ランキング</button>
                    <button data-ranking-tab="pitcher" class="px-4 py-2 font-bold text-gray-500 border-b-2 border-transparent hover:text-gray-700 whitespace-nowrap transition-colors">投手ランキング</button>
                </div>
                
                <div id="ranking-content-batter" class="bg-white p-4 rounded-lg shadow-md">
                    <div class="overflow-x-auto"><table class="w-full text-sm text-left border">
                        <thead class="bg-gray-100">
                            <tr>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="name" data-role="batter">選手<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="pa" data-role="batter">打席<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="avg" data-role="batter">打率<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="ops" data-role="batter">OPS<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="obp" data-role="batter">出塁率<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="h" data-role="batter">安打<span></span></th>
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
                <div class="bg-white p-4 rounded-lg shadow-md text-sm">
                    <div class="flex flex-wrap gap-4 mb-4 items-end">
                        <div><label class="block font-bold text-gray-600 mb-1">役割</label><select id="comp-role" class="border p-2 rounded w-24"><option value="batter">打撃</option><option value="pitcher">投手</option></select></div>
                    </div>
                    <label class="block font-bold text-gray-600 mb-2 border-t pt-2">比較する選手を選択</label>
                    <div class="mb-2 max-h-40 overflow-y-auto border p-3 rounded grid grid-cols-2 md:grid-cols-4 gap-2 bg-gray-50" id="comp-players-list"></div>
                </div>
                <div id="comp-charts-container" class="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
            </div>

            <div id="tab-content-test-mode" class="hidden space-y-6">
                <div class="bg-yellow-50 p-3 rounded border border-yellow-200 text-sm text-yellow-800 mb-2 font-bold">【テストモード】累積ではなく、直近の指定試合数での「移動平均」で調子の推移を確認できます。</div>
                <div class="bg-white p-4 rounded-lg shadow-md text-sm">
                    <div class="flex flex-wrap gap-4 mb-4 items-end">
                        <div><label class="block font-bold text-gray-600 mb-1">役割</label><select id="tm-role" class="border p-2 rounded w-24"><option value="batter">打撃</option><option value="pitcher">投手</option></select></div>
                        <div><label class="block font-bold text-gray-600 mb-1">移動平均 試合数</label><input type="number" id="tm-window" value="5" min="1" class="border p-2 rounded w-24"></div>
                    </div>
                    <label class="block font-bold text-gray-600 mb-2 border-t pt-2">比較する選手を選択</label>
                    <div class="mb-2 max-h-40 overflow-y-auto border p-3 rounded grid grid-cols-2 md:grid-cols-4 gap-2 bg-gray-50" id="tm-players-list"></div>
                </div>
                <div id="tm-charts-container" class="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
            </div>

            <div id="tab-content-settings" class="hidden space-y-6">
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="font-bold text-lg mb-4 text-gray-800 border-b pb-2">集計設定</h3>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">自チームとして集計するチーム名</label>
                            <div id="home-team-list" class="flex flex-wrap gap-2 mb-3"></div>
                            <div class="flex items-center space-x-2">
                                <input type="text" id="new-home-team-name" placeholder="チーム名を追加 (例: ありんこアントス@A軍)" class="border p-2 rounded w-full md:w-1/2">
                                <button id="btn-add-home-team" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-bold shadow-sm">追加</button>
                            </div>
                        </div>
                        <div class="mt-6 border-t pt-4">
                            <label class="block text-sm font-bold text-gray-700 mb-2">デフォルトのフィルタ設定</label>
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
                            </div>
                            <p class="text-xs text-gray-500 mt-2 mb-3">※ダッシュボードを開いた時や、フィルタをクリアした時に適用される初期設定値です。</p>
                            <button id="btn-save-default-date" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold shadow-sm">設定を保存</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="tab-content-import-data" class="hidden bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 class="text-lg font-bold mb-4 border-b pb-2">CSVデータインポート</h3>
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
        `;
        document.getElementById('app-view')?.parentNode.appendChild(container);
        
        // イベントリスナー設定
        document.getElementById('btn-back-to-menu-dash').addEventListener('click', () => {
            import('./main.js').then(module => module.switchAuthScreen('app-menu-view'));
        });

        document.getElementById('btn-exec-csv-import').addEventListener('click', handleCsvImport);

        // タブ切り替え制御
        document.querySelectorAll('#dashboard-tabs button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('#dashboard-tabs button').forEach(b => {
                    b.classList.remove('text-blue-600', 'border-blue-600');
                    b.classList.add('text-gray-500', 'border-transparent');
                });
                ['team-summary', 'personal-summary', 'ranking', 'comparison', 'test-mode', 'settings', 'import-data'].forEach(t => document.getElementById(`tab-content-${t}`)?.classList.add('hidden'));

                const target = e.currentTarget;
                target.classList.remove('text-gray-500', 'border-transparent');
                target.classList.add('text-blue-600', 'border-blue-600');
                document.getElementById(`tab-content-${target.dataset.tab}`).classList.remove('hidden');
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

        // ランキングテーブルのソートイベント設定
        document.querySelectorAll('#tab-content-ranking th[data-sort]').forEach(th => {
            th.addEventListener('click', (e) => {
                const role = e.currentTarget.dataset.role;
                const key = e.currentTarget.dataset.sort;
                handleRankingSort(role, key);
            });
        });

        // フィルタ制御
        document.getElementById('btn-apply-filter').addEventListener('click', applyFiltersAndRender);
        document.getElementById('btn-clear-filter').addEventListener('click', () => {
            document.getElementById('filter-date-from').value = dashboardSettings.defaultFilterDate.from || '';
            document.getElementById('filter-date-to').value = dashboardSettings.defaultFilterDate.to || '';
            document.getElementById('filter-team-regex').value = dashboardSettings.defaultFilterDate.teamRegex || '';
            document.getElementById('filter-category').value = dashboardSettings.defaultFilterDate.category || '';
            applyFiltersAndRender();
        });

        ['ps-player', 'ps-role', 'ps-unit'].forEach(id => document.getElementById(id)?.addEventListener('change', renderPersonalSummary));
        ['tm-role', 'tm-window'].forEach(id => document.getElementById(id)?.addEventListener('change', renderTestMode));
        document.getElementById('tm-players-list')?.addEventListener('change', renderTestMode);
        document.getElementById('comp-players-list')?.addEventListener('change', renderComparison);
        
        document.getElementById('comp-role')?.addEventListener('change', (e) => {
            renderComparison();
        });

        document.getElementById('btn-add-home-team')?.addEventListener('click', handleAddHomeTeam);
        
        document.getElementById('btn-save-default-date')?.addEventListener('click', async () => {
            const from = document.getElementById('setting-default-date-from').value;
            const to = document.getElementById('setting-default-date-to').value;
            const teamRegex = document.getElementById('setting-default-team-regex').value.trim();
            const category = document.getElementById('setting-default-category').value.trim();
            
            const updatedFilter = { from, to, teamRegex, category };
            
            // localStorage に保存
            localStorage.setItem('ants_defaultFilterDate', JSON.stringify(updatedFilter));
            
            // 管理者であればSupabaseにも保存して共有する
            if (currentUserRole === 'admin') {
                showLoading('デフォルトのフィルタ設定を保存中 (DB同期)...');
                try {
                    const { error } = await supabaseClient.from('dashboard_settings').upsert(
                        { key: 'defaultFilterDate', value: updatedFilter },
                        { onConflict: 'key' }
                    );
                    if (error) throw error;
                    alert('デフォルトのフィルタ設定を保存し、DBと同期しました。');
                } catch (e) {
                    console.error('Supabase sync failed', e);
                    alert('DBへの同期に失敗しましたが、このブラウザには保存されました: ' + e.message);
                } finally {
                    hideLoading();
                }
            } else {
                alert('デフォルトのフィルタ設定をこのブラウザに保存しました。');
            }
            
            dashboardSettings.defaultFilterDate = updatedFilter;

            // 現在のフィルタ入力欄に反映
            const filterDateFrom = document.getElementById('filter-date-from');
            const filterDateTo = document.getElementById('filter-date-to');
            const filterTeamRegex = document.getElementById('filter-team-regex');
            const filterCategory = document.getElementById('filter-category');

            if (filterDateFrom) filterDateFrom.value = from;
            if (filterDateTo) filterDateTo.value = to;
            if (filterTeamRegex) filterTeamRegex.value = teamRegex;
            if (filterCategory) filterCategory.value = category;

            // 即座に再描画を実行
            applyFiltersAndRender();
        });
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
            { data: plData, error: plErr },
            { data: settingsData, error: settingsErr }
        ] = await Promise.all([
            supabaseClient.from('games').select('*').order('date', { ascending: true }),
            supabaseClient.from('batter_stats').select('*'),
            supabaseClient.from('pitcher_stats').select('*'),
            supabaseClient.from('players').select('*'),
            supabaseClient.from('dashboard_settings').select('*')
        ]);
        
        if (gamesErr) throw gamesErr;
        if (bStatsErr) throw bStatsErr;
        if (pStatsErr) throw pStatsErr;

        allGames = gamesData || [];
        allBatterStats = bStatsData || [];
        allPitcherStats = pStatsData || [];
        allPlayers = plData || [];
        
        // デフォルト初期値の定義
        let homeTeamNames = ['ありんこアントス@A軍'];
        let defaultFilterDate = { from: '', to: '', teamRegex: '', category: '' };

        // 1. DB (Supabase) からの共通デフォルト設定を読み込み
        if (settingsData) {
            const homeTeamsObj = settingsData.find(s => s.key === 'homeTeamNames');
            if (homeTeamsObj && homeTeamsObj.value !== null && homeTeamsObj.value !== undefined) {
                homeTeamNames = homeTeamsObj.value;
            }
            const defaultFilterObj = settingsData.find(s => s.key === 'defaultFilterDate');
            if (defaultFilterObj && defaultFilterObj.value) {
                defaultFilterDate = {
                    from: defaultFilterObj.value.from || '',
                    to: defaultFilterObj.value.to || '',
                    teamRegex: defaultFilterObj.value.teamRegex || '',
                    category: defaultFilterObj.value.category || '',
                };
            }
        }

        // 2. localStorage からの個人別設定を読み込み (あれば上書き)
        const localHomeTeams = localStorage.getItem('ants_homeTeamNames');
        if (localHomeTeams) {
            try {
                homeTeamNames = JSON.parse(localHomeTeams);
            } catch (e) {
                console.error('Failed to parse local homeTeamNames', e);
            }
        }
        const localDefaultFilter = localStorage.getItem('ants_defaultFilterDate');
        if (localDefaultFilter) {
            try {
                defaultFilterDate = JSON.parse(localDefaultFilter);
            } catch (e) {
                console.error('Failed to parse local defaultFilterDate', e);
            }
        }

        dashboardSettings.homeTeamNames = homeTeamNames;
        dashboardSettings.defaultFilterDate = defaultFilterDate;

        renderHomeTeamList();
        document.getElementById('setting-default-date-from').value = dashboardSettings.defaultFilterDate.from || '';
        document.getElementById('setting-default-date-to').value = dashboardSettings.defaultFilterDate.to || '';
        document.getElementById('setting-default-team-regex').value = dashboardSettings.defaultFilterDate.teamRegex || '';
        document.getElementById('setting-default-category').value = dashboardSettings.defaultFilterDate.category || '';
        if (!isFilterInitialized) {
            document.getElementById('btn-clear-filter').click(); // 初回ロード時にデフォルト期間を適用
            isFilterInitialized = true;
        }

        applyFiltersAndRender();
    } catch (e) {
        console.error(e);
        alert('成績データの取得に失敗しました: ' + e.message);
    } finally {
        hideLoading();
    }
}

// 自チーム名にマッチするか判定する共通関数
function isHomeTeam(teamName) {
    if (!teamName) return false;
    return dashboardSettings.homeTeamNames.some(name => {
        try {
            return new RegExp(name, 'i').test(teamName);
        } catch (e) {
            return teamName.includes(name); // 正規表現として不正な場合は部分一致
        }
    });
}

let currentFiltered = { games: [], bStats: [], pStats: [] };
function applyFiltersAndRender() {
    const from = document.getElementById('filter-date-from').value;
    const to = document.getElementById('filter-date-to').value;
    const teamRegexStr = document.getElementById('filter-team-regex').value;
    const categoryStr = document.getElementById('filter-category').value;

    let regex = null;
    if (teamRegexStr) {
        try { regex = new RegExp(teamRegexStr, 'i'); } catch(e){}
    }
    const categories = categoryStr ? categoryStr.split(',').map(s=>s.trim()).filter(s=>s) : [];

    const filteredGames = allGames.filter(g => {
        // 自チームが先攻・後攻のいずれかに含まれる試合のみを抽出
        const isHomeFirst = isHomeTeam(g.team_first);
        const isHomeSecond = isHomeTeam(g.team_second);
        if (!isHomeFirst && !isHomeSecond) return false;

        const dateStr = g.date ? g.date.split('T')[0] : '';
        if (from && dateStr < from) return false;
        if (to && dateStr > to) return false;
        if (categories.length > 0 && !categories.includes(g.category)) return false;
        if (regex) {
            const isMatchFirst = regex.test(g.team_first);
            const isMatchSecond = regex.test(g.team_second);
            if (!isMatchFirst && !isMatchSecond) return false;
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
        cpList.innerHTML = activePlayers.map(p => `<label class="flex items-center space-x-1 cursor-pointer"><input type="checkbox" value="${p.id}" class="comp-player-cb rounded text-blue-600" ${checkedVals.has(String(p.id)) ? 'checked' : ''}><span>${p.name}</span></label>`).join('');
    }
    const tmList = document.getElementById('tm-players-list');
    if (tmList) {
        const checkedVals = new Set(Array.from(document.querySelectorAll('.tm-player-cb:checked')).map(cb => cb.value));
        tmList.innerHTML = activePlayers.map(p => `<label class="flex items-center space-x-1 cursor-pointer"><input type="checkbox" value="${p.id}" class="tm-player-cb rounded text-blue-600" ${checkedVals.has(String(p.id)) ? 'checked' : ''}><span>${p.name}</span></label>`).join('');
    }

    renderTeamSummary(filteredGames, filteredBStats, filteredPStats);
    renderRanking();
    renderPersonalSummary();
    renderComparison();
    renderTestMode();
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

    const gameLabels = [], teamRuns = [], oppRuns = [], cumWinRates = [];
    let wins = 0, validGames = 0;

    games.forEach((g, idx) => {
        const dateStr = g.date ? g.date.split('T')[0] : '';
        let tr = 0, or = 0;
        const isAntsFirst = isHomeTeam(g.team_first);
        
        if (g.score && g.score.includes('-')) {
            const [s1, s2] = g.score.split('-').map(s => parseInt(s, 10) || 0);
            if (isAntsFirst) { tr = s1; or = s2; } else { tr = s2; or = s1; }
        }
        teamRuns.push(tr); oppRuns.push(-or);
        if (tr > or) wins++;
        validGames++;
        cumWinRates.push(validGames > 0 ? (wins / validGames * 100).toFixed(1) : 0);

        // X軸ラベルを配列にして改行し、相手チーム名を追加
        const oppTeam = isAntsFirst ? g.team_second : g.team_first;
        gameLabels.push([dateStr ? dateStr.substring(5) : `G${idx+1}`, oppTeam || '']);
    });

    charts.games = new window.Chart(document.getElementById('chart-games-wl').getContext('2d'), {
        type: 'bar',
        data: { labels: gameLabels, datasets: [ { label: '得点', data: teamRuns, backgroundColor: 'rgba(75, 192, 192, 0.8)' }, { label: '失点', data: oppRuns, backgroundColor: 'rgba(255, 99, 132, 0.8)' }, { label: '累積勝率(%)', type: 'line', data: cumWinRates, borderColor: 'rgba(255, 205, 86, 1)', yAxisID: 'y1' } ] },
        options: { responsive: true, scales: { x: { stacked: true, ticks: { font: { size: 10 } } }, y: { stacked: true, position: 'left' }, y1: { position: 'right', beginAtZero: true, min: 0, max: 100 } } }
    });
}

// --- 共通成績計算ロジック ---
function calcBatterStats(stats) {
    let pa=0, ab=0, h=0, tb=0, rbi=0, r=0, sb=0, bb=0, hbp=0, so=0, hr=0;
    stats.forEach(s => {
        pa+=s.plate_appearances||0; ab+=s.at_bats||0; h+=s.hits||0; hr+=s.home_runs||0;
        tb+=s.total_bases||0; rbi+=s.runs_batted_in||0; r+=s.runs||0; sb+=s.stolen_bases||0;
        bb+=s.walks||0; hbp+=s.hit_by_pitch||0; so+=s.strike_outs||0;
    });
    const avg = ab > 0 ? h / ab : 0;
    const obp = pa > 0 ? (h + bb + hbp) / pa : 0;
    const slg = ab > 0 ? tb / ab : 0;
    return { pa, ab, h, bb, hbp, rbi, r, sb, hr, avg, obp, slg, ops: obp+slg, bbRate: pa>0?(bb+hbp)/pa:0, soRate: pa>0?so/pa:0 };
}

function calcPitcherStats(stats) {
    let outs=0, er=0, h=0, bb=0, so=0, bf=0, pc=0, st=0;
    stats.forEach(s => {
        outs+=s.outs||0; er+=s.earned_runs||0; h+=s.hits_allowed||0;
        bb+=(s.walks_allowed||0)+(s.hit_batters||0); so+=s.strike_outs||0;
        bf+=s.batters_faced||0; pc+=s.pitch_count||0; st+=s.strikes||0;
    });
    const ip = outs / 3;
    return { outs, era: ip>0?(er*7)/ip:0, whip: ip>0?(h+bb)/ip:0, k7: ip>0?(so*7)/ip:0, bb7: ip>0?(bb*7)/ip:0, kRate: bf>0?so/bf:0, bbRate: bf>0?bb/bf:0, kbb: bb>0?so/bb:(so>0?99.9:0), sRate: pc>0?st/pc:0 };
}

// --- タブ2: 個人成績 ---
async function renderPersonalSummary() {
    await loadChartJs();
    const pid = document.getElementById('ps-player').value;
    const role = document.getElementById('ps-role').value;
    const unit = document.getElementById('ps-unit').value;
    if(!pid) return;

    document.getElementById('ps-batter-charts').classList.toggle('hidden', role !== 'batter');
    document.getElementById('ps-pitcher-charts').classList.toggle('hidden', role !== 'pitcher');

    const { games, bStats, pStats } = currentFiltered;
    const targetStats = (role === 'batter' ? bStats : pStats).filter(s => s.player_id == pid);
    const merged = targetStats.map(s => ({ date: games.find(x => x.id === s.game_id)?.date || '', stats: s, game: games.find(x => x.id === s.game_id) })).filter(x => x.date).sort((a, b) => a.date.localeCompare(b.date));

    // 指定された集計単位（game, month, 3month）でグループ化
    const groupedStats = [];
    merged.forEach((m, idx) => {
        let lbl = '';
        if (unit === 'game') lbl = `G${idx+1}`;
        else if (unit === 'month') lbl = m.date.substring(0, 7);
        else lbl = `${m.date.substring(0,4)}-Q${Math.ceil(parseInt(m.date.substring(5,7))/3)}`;

        let group = groupedStats.find(g => g.label === lbl);
        if (!group) {
            group = { label: lbl, stats: [], game: m.game };
            groupedStats.push(group);
        }
        group.stats.push(m.stats);
    });

    const labels = [], dataPoints = [], periodDataPoints = [];
    let totalCumStats = [];

    groupedStats.forEach(group => {
        // 区間ごとのデータ
        periodDataPoints.push(role === 'batter' ? calcBatterStats(group.stats) : calcPitcherStats(group.stats));
        // 累積データ
        totalCumStats = totalCumStats.concat(group.stats);
        dataPoints.push(role === 'batter' ? calcBatterStats(totalCumStats) : calcPitcherStats(totalCumStats));
        
        let displayLabel = group.label;
        if (unit === 'game' && group.game) {
            const oppTeam = isHomeTeam(group.game.team_first) ? group.game.team_second : group.game.team_first;
            displayLabel = [group.label, oppTeam || ''];
        }
        labels.push(displayLabel);
    });

    Object.values(personalCharts).forEach(c => c.destroy());
    personalCharts = {};

    const heightClass = unit === 'game' ? 'h-[450px]' : 'h-[300px]';
    const bGameHeightClass = unit === 'game' ? 'h-[600px]' : 'h-[400px]';
    ['chart-ps-b-cum', 'chart-ps-b-rate', 'chart-ps-p-cum', 'chart-ps-p-rate'].forEach(id => {
        const el = document.getElementById(id);
        if (el && el.parentElement) el.parentElement.className = `bg-white p-4 rounded shadow-md relative ${heightClass}`;
    });
    const bGameWrap = document.getElementById('chart-ps-b-game')?.parentElement;
    if (bGameWrap) bGameWrap.className = `bg-white p-4 rounded shadow-md md:col-span-2 relative ${bGameHeightClass}`;

    if (role === 'batter') {
        personalCharts.bCum = new window.Chart(document.getElementById('chart-ps-b-cum').getContext('2d'), { type: 'line', data: { labels, datasets: [ { label: '打率', data: dataPoints.map(d=>d.avg), borderColor: 'red' }, { label: '出塁率', data: dataPoints.map(d=>d.obp), borderColor: 'blue' }, { label: '長打率', data: dataPoints.map(d=>d.slg), borderColor: 'green' }, { label: 'OPS', data: dataPoints.map(d=>d.ops), borderColor: 'purple', borderDash: [5,5] } ]}, options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: '累積打撃成績' } }, scales:{ y:{min:0}, x: { ticks: { font: { size: 10 } } } } } });
        personalCharts.bRate = new window.Chart(document.getElementById('chart-ps-b-rate').getContext('2d'), { type: 'line', data: { labels, datasets: [ { label: '四死球率(%)', data: dataPoints.map(d=>d.bbRate*100), borderColor: 'orange' }, { label: '三振率(%)', data: dataPoints.map(d=>d.soRate*100), borderColor: 'gray' } ]}, options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: '累積四死球・三振率' } }, scales:{ y:{min:0, max:100}, x: { ticks: { font: { size: 10 } } } } } });
        const periodTitle = unit === 'game' ? '試合別 打数・安打' : (unit === 'month' ? '月別 打数・安打' : '3ヶ月毎 打数・安打');
        personalCharts.bGame = new window.Chart(document.getElementById('chart-ps-b-game').getContext('2d'), { type: 'bar', data: { labels, datasets: [ { label: '安打', data: periodDataPoints.map(d=>d.h), backgroundColor: 'blue' }, { label: '打数', data: periodDataPoints.map(d=>d.ab), backgroundColor: 'rgba(0,0,0,0.1)' } ]}, options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: periodTitle } }, scales: { x: { ticks: { font: { size: 10 } } } } } });
    } else {
        personalCharts.pCum = new window.Chart(document.getElementById('chart-ps-p-cum').getContext('2d'), { type: 'line', data: { labels, datasets: [ { label: '防御率', data: dataPoints.map(d=>d.era), borderColor: 'red' }, { label: 'WHIP', data: dataPoints.map(d=>d.whip), borderColor: 'blue' }, { label: 'S率(%)', data: dataPoints.map(d=>d.sRate*100), borderColor: 'green', yAxisID: 'y1' } ]}, options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: '累積防御率・WHIP・S率' } }, scales: { y: { min:0, position: 'left' }, y1: { position: 'right', min: 0, max: 100 }, x: { ticks: { font: { size: 10 } } } } } });
        personalCharts.pRate = new window.Chart(document.getElementById('chart-ps-p-rate').getContext('2d'), { type: 'line', data: { labels, datasets: [ { label: 'K/7', data: dataPoints.map(d=>d.k7), borderColor: 'red' }, { label: 'BB/7', data: dataPoints.map(d=>d.bb7), borderColor: 'blue' } ]}, options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: '累積 K/7・BB/7' } }, scales:{ y:{min:0}, x: { ticks: { font: { size: 10 } } } } } });
    }
}

// --- タブ3: ランキング ---
function renderRanking() {
    const { bStats, pStats } = currentFiltered;
    const bMap = {}, pMap = {};
    bStats.forEach(s => { if(!bMap[s.player_id]) bMap[s.player_id] = []; bMap[s.player_id].push(s); });
    pStats.forEach(s => { if(!pMap[s.player_id]) pMap[s.player_id] = []; pMap[s.player_id].push(s); });

    currentRankingData.batter = Object.keys(bMap).map(pid => ({ name: allPlayers.find(x=>x.id==pid)?.name || '不明', ...calcBatterStats(bMap[pid]) })).filter(x => x.pa > 0);
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
        let valA = a[state.key];
        let valB = b[state.key];
        if (typeof valA === 'string') return state.order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        return state.order === 'asc' ? valA - valB : valB - valA;
    });

    if (role === 'batter') {
        document.getElementById('ranking-batter-tbody').innerHTML = data.map(r => `<tr class="border-b"><td class="p-2 font-bold">${r.name}</td><td class="p-2">${r.pa}</td><td class="p-2">${r.avg.toFixed(3).replace(/^0/,'')}</td><td class="p-2 text-purple-700 font-bold">${r.ops.toFixed(3)}</td><td class="p-2">${r.obp.toFixed(3)}</td><td class="p-2">${r.h}</td><td class="p-2">${r.bb}</td><td class="p-2">${r.hbp}</td><td class="p-2">${r.rbi}</td><td class="p-2">${r.r}</td><td class="p-2">${r.sb}</td><td class="p-2">${r.hr}</td></tr>`).join('');
    } else {
        document.getElementById('ranking-pitcher-tbody').innerHTML = data.map(r => `<tr class="border-b"><td class="p-2 font-bold">${r.name}</td><td class="p-2">${r.outs}</td><td class="p-2 text-red-600 font-bold">${r.era.toFixed(2)}</td><td class="p-2">${r.whip.toFixed(2)}</td><td class="p-2">${r.k7.toFixed(2)}</td><td class="p-2">${r.bb7.toFixed(2)}</td><td class="p-2">${r.kRate.toFixed(3)}</td><td class="p-2">${r.bbRate.toFixed(3)}</td><td class="p-2">${(r.sRate*100).toFixed(1)}</td><td class="p-2">${r.kbb.toFixed(2)}</td></tr>`).join('');
    }

    // アイコンの更新
    document.querySelectorAll(`#tab-content-ranking th[data-role="${role}"] span`).forEach(span => span.textContent = '');
    const activeTh = document.querySelector(`#tab-content-ranking th[data-role="${role}"][data-sort="${state.key}"] span`);
    if (activeTh) activeTh.textContent = state.order === 'asc' ? ' ▲' : ' ▼';
}

// --- タブ4: 選手間比較 ---
async function renderComparison() {
    await loadChartJs();
    const role = document.getElementById('comp-role').value;
    const selectedPids = Array.from(document.querySelectorAll('.comp-player-cb:checked')).map(cb => cb.value);
    
    Object.values(comparisonCharts).forEach(c => c.destroy());
    comparisonCharts = {};
    const container = document.getElementById('comp-charts-container');
    if(container) container.innerHTML = '';
    if(selectedPids.length === 0) return;

    const { games, bStats, pStats } = currentFiltered;
    const allDates = [...new Set(games.filter(g => g.date).map(g => g.date.split('T')[0]))].sort();
    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899'];

    const metrics = role === 'batter' 
        ? [{key: 'avg', name: '打率'}, {key: 'ops', name: 'OPS'}, {key: 'obp', name: '出塁率'}, {key: 'slg', name: '長打率'}]
        : [{key: 'era', name: '防御率'}, {key: 'whip', name: 'WHIP'}, {key: 'k7', name: 'K/7'}, {key: 'bb7', name: 'BB/7'}, {key: 'sRate', name: 'S率(%)'}];

    metrics.forEach((metricObj, mIndex) => {
        const chartId = `chart-comp-${mIndex}`;
        const wrap = document.createElement('div');
        wrap.className = 'bg-white p-4 rounded shadow-md relative h-[300px] md:h-[400px]';
        wrap.innerHTML = `<canvas id="${chartId}"></canvas>`;
        container.appendChild(wrap);

        const datasets = selectedPids.map((pid, i) => {
            const tStats = (role === 'batter' ? bStats : pStats).filter(s => s.player_id == pid);
            const merged = tStats.map(s => ({ date: games.find(x => x.id === s.game_id)?.date.split('T')[0] || '', stats: s })).filter(x => x.date).sort((a, b) => a.date.localeCompare(b.date));
            
            let cCum = [], dMap = {};
            merged.forEach(m => {
                cCum.push(m.stats);
                const cStat = role === 'batter' ? calcBatterStats(cCum) : calcPitcherStats(cCum);
                let val = cStat[metricObj.key];
                if (metricObj.key === 'sRate') val = val * 100;
                dMap[m.date] = val;
            });

            let lastVal = null;
            const dataArr = allDates.map(d => { if(dMap[d] !== undefined) lastVal = dMap[d]; return lastVal; });
            
            return { label: allPlayers.find(x => x.id == pid)?.name || '不明', data: dataArr, borderColor: colors[i % colors.length], spanGaps: true, tension: 0.1 };
        });

        comparisonCharts[chartId] = new window.Chart(document.getElementById(chartId).getContext('2d'), {
            type: 'line', data: { labels: allDates, datasets },
            options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: `選手比較 (${metricObj.name})` } } }
        });
    });
}

// --- タブ5: テストモード(移動平均) ---
async function renderTestMode() {
    await loadChartJs();
    const role = document.getElementById('tm-role').value;
    const wSize = parseInt(document.getElementById('tm-window').value) || 5;
    const selectedPids = Array.from(document.querySelectorAll('.tm-player-cb:checked')).map(cb => cb.value);
    
    Object.values(testModeCharts).forEach(c => c.destroy());
    testModeCharts = {};
    const container = document.getElementById('tm-charts-container');
    if (container) container.innerHTML = '';
    if (selectedPids.length === 0) return;

    const { games, bStats, pStats } = currentFiltered;
    const allDates = [...new Set(games.filter(g => g.date).map(g => g.date.split('T')[0]))].sort();
    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899'];

    const metrics = role === 'batter' 
        ? [{key: 'avg', name: '打率'}, {key: 'ops', name: 'OPS'}, {key: 'obp', name: '出塁率'}, {key: 'slg', name: '長打率'}]
        : [{key: 'era', name: '防御率'}, {key: 'whip', name: 'WHIP'}, {key: 'k7', name: 'K/7'}, {key: 'bb7', name: 'BB/7'}, {key: 'sRate', name: 'S率(%)'}];

    metrics.forEach((metricObj, mIndex) => {
        const chartId = `chart-tm-${mIndex}`;
        const wrap = document.createElement('div');
        wrap.className = 'bg-white p-4 rounded shadow-md relative h-[300px] md:h-[400px]';
        wrap.innerHTML = `<canvas id="${chartId}"></canvas>`;
        container.appendChild(wrap);

        const datasets = selectedPids.map((pid, i) => {
            const tStats = (role === 'batter' ? bStats : pStats).filter(s => s.player_id == pid);
            const merged = tStats.map(s => ({ date: games.find(x => x.id === s.game_id)?.date.split('T')[0] || '', stats: s })).filter(x => x.date).sort((a, b) => a.date.localeCompare(b.date));
            
            let dMap = {};
            for (let j = 0; j < merged.length; j++) {
                const wStats = merged.slice(Math.max(0, j - wSize + 1), j + 1).map(m => m.stats);
                const wStat = role === 'batter' ? calcBatterStats(wStats) : calcPitcherStats(wStats);
                let val = wStat[metricObj.key];
                if (metricObj.key === 'sRate') val = val * 100;
                dMap[merged[j].date] = val;
            }

            let lastVal = null;
            const dataArr = allDates.map(d => { if(dMap[d] !== undefined) lastVal = dMap[d]; return lastVal; });
            
            return { label: allPlayers.find(x => x.id == pid)?.name || '不明', data: dataArr, borderColor: colors[i % colors.length], spanGaps: true, tension: 0.1 };
        });

        testModeCharts[chartId] = new window.Chart(document.getElementById(chartId).getContext('2d'), {
            type: 'line', data: { labels: allDates, datasets },
            options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: `移動平均 (${metricObj.name})` } } }
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

    // localStorage に保存
    localStorage.setItem('ants_homeTeamNames', JSON.stringify(updatedTeams));

    // 管理者であればSupabaseにも保存して共有する
    if (currentUserRole === 'admin') {
        showLoading('自チーム名を追加中 (DB同期)...');
        try {
            const { error } = await supabaseClient.from('dashboard_settings').upsert(
                { key: 'homeTeamNames', value: updatedTeams },
                { onConflict: 'key' }
            );
            if (error) throw error;
        } catch (e) {
            console.error('Supabase sync failed', e);
            console.warn('DBへの同期に失敗しましたが、このブラウザには保存されました: ' + e.message);
        } finally {
            hideLoading();
        }
    }

    dashboardSettings.homeTeamNames = updatedTeams;
    renderHomeTeamList();
    input.value = '';
    // フィルタを再適用して描画
    applyFiltersAndRender();
}

window.dashboard_removeHomeTeam = async function(nameToRemove) {
    if (!confirm(`「${nameToRemove}」を自チームから削除しますか？`)) return;
    
    const updatedTeams = dashboardSettings.homeTeamNames.filter(name => name !== nameToRemove);

    // localStorage に保存
    localStorage.setItem('ants_homeTeamNames', JSON.stringify(updatedTeams));

    // 管理者であればSupabaseにも保存して共有する
    if (currentUserRole === 'admin') {
        showLoading('自チーム名を削除中 (DB同期)...');
        try {
            const { error } = await supabaseClient.from('dashboard_settings').upsert(
                { key: 'homeTeamNames', value: updatedTeams },
                { onConflict: 'key' }
            );
            if (error) throw error;
        } catch (e) {
            console.error('Supabase sync failed', e);
            console.warn('DBへの同期に失敗しましたが、このブラウザからは削除されました: ' + e.message);
        } finally {
            hideLoading();
        }
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
        
        // 投手データの改行欠落バグを正規表現で強制補正（例: "FO247,難波" -> "FO\n247,難波"）
        if (type === 'pitcher') {
            text = text.replace(/([A-Za-z0-9]+)(\d{3},[^0-9,])/g, '$1\n$2');
        }

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