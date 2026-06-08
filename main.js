/**
 * ANTS - 配車・出欠管理コアモジュール
 * 認証、ロック防止ローディング、手動スワップ、管理マスタロジック
 */

// アプリケーション全体の状態管理（Supabaseデータをここへ集約・キャッシュ）
const state = {
  user: null,
  role: 'admin', // admin | leader | user 
  currentTab: 'attendance', // attendance | matching | master
  events: [
    { id: 1, title: '初夏の公式戦 vs 青葉ユナイテッド', date: '2026-06-14', time: '09:00', location: '青葉スポーツ公園', category: '試合' },
    { id: 2, title: '強化合同練習会', date: '2026-06-21', time: '13:00', location: '本校第2グラウンド', category: '練習' }
  ],
  attendance: [
    { id: 1, event_id: 1, name: '山田 太郎', status: 'present', companions: 1, car_available: 2, comment: '大型ワゴンなので荷物も十分に積み込めます！' },
    { id: 2, event_id: 1, name: '佐藤 次郎', status: 'present', companions: 0, car_available: 0, comment: '現地まで直接向かいます。' },
    { id: 3, event_id: 1, name: '鈴木 花子', status: 'maybe', companions: 0, car_available: 0, comment: '午前中の予定次第で途中合流する予定です。' },
    { id: 4, event_id: 1, name: '高橋 健太', status: 'absent', companions: 0, car_available: 0, comment: '法事の都合上、今回は欠席いたします。' }
  ],
  cars: [
    { id: 1, driver: '山田 太郎', capacity: 6, note: 'ミニバン・チーム荷物積載可', parking: '第1駐車場（Aブロック）' },
    { id: 2, driver: '佐藤 次郎', capacity: 4, note: 'コンパクトカー', parking: '第1駐車場（Bブロック）' },
    { id: 3, driver: '渡辺 三郎', capacity: 7, note: 'ミニバン・ルーフキャリア搭載', parking: '第2駐車場（グラウンド奥）' }
  ],
  allocations: [
    { carId: 1, passengers: ['山田 太郎', '山田 結衣(保護者)', '鈴木 花子'] },
    { carId: 2, passengers: ['佐藤 次郎', '高橋 翔太(選手)'] },
    { carId: 3, passengers: ['渡辺 三郎', '渡辺 陸(選手)', '田中 颯太(選手)'] }
  ]
};

// ------------------------------------------
// 1. スマートなフリーズ回避・進行状況付きローディング
// ------------------------------------------
let loadingInterval = null;

function withLoading(asyncOperation, processTitle = "データを同期中...") {
  const overlay = document.getElementById('loading-overlay');
  const titleEl = document.getElementById('loading-title');
  const descEl = document.getElementById('loading-desc');
  const actionContainer = document.getElementById('loading-actions');

  // 表示リセット
  overlay.classList.remove('pointer-events-none');
  overlay.style.opacity = '1';
  titleEl.innerText = processTitle;
  descEl.innerText = "リクエストの安全なルートを構築しています...";
  actionContainer.classList.add('hidden');

  let duration = 0;
  clearInterval(loadingInterval);

  // 通信遅延やスリープを段階的に感知するタイマー
  loadingInterval = setInterval(() => {
    duration++;
    if (duration === 3) {
      descEl.innerText = "データを安全にトランザクションしています...";
    } else if (duration === 6) {
      descEl.innerText = "データベースとの応答接続を確認しています。そのままお待ちください...";
    } else if (duration === 10) {
      descEl.innerHTML = `<span class="text-amber-500 font-bold">【データベース起動チェック中】</span><br>BaaSが一時スリープしている可能性があります。起動完了まで約15〜30秒ほど掛かります。`;
    } else if (duration >= 14) {
      descEl.innerHTML = `<span class="text-rose-500 font-bold">通信が規定の制限時間を超えました。</span><br>セッション状態か接続設定に障害が発生している恐れがあります。`;
      actionContainer.classList.remove('hidden'); // セーフボタンの露出
      clearInterval(loadingInterval);
    }
  }, 1000);

  return new Promise((resolve, reject) => {
    asyncOperation()
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      })
      .finally(() => {
        hideLoading();
      });
  });
}

function hideLoading() {
  const overlay = document.getElementById('loading-overlay');
  clearInterval(loadingInterval);
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.classList.add('pointer-events-none');
  }, 300);
}

function retryConnection() {
  hideLoading();
  showToast('再接続を初期化しました。', 'info');
  setTimeout(() => {
    initApp();
  }, 300);
}

// ------------------------------------------
// 2. インタラクティブなスワップ（手動調整）
// ------------------------------------------
let activeSwapSource = null;

function selectForSwap(itemType, carId, elementIndex, domElement) {
  // すべての点滅・選択スタイルを一度クリーンアップ
  document.querySelectorAll('.swap-selected').forEach(el => {
    el.classList.remove('swap-selected');
  });

  if (!activeSwapSource) {
    // 最初の移動元アイテムを選択
    activeSwapSource = { itemType, carId, elementIndex, domElement };
    domElement.classList.add('swap-selected');
    showToast('移動元のシート（または駐車場）を選択しました。次に、移動先をタップしてください。', 'info');
  } else {
    const source = activeSwapSource;
    const target = { itemType, carId, elementIndex, domElement };

    // 全く同じシートを選択した場合はトグルで解除
    if (source.carId === target.carId && source.elementIndex === target.elementIndex) {
      activeSwapSource = null;
      showToast('選択をクリアしました。', 'info');
      return;
    }

    // スワップロジックの評価
    withLoading(async () => {
      // 1. 同乗者の位置変更・入れ替え
      if (source.itemType === 'passenger' && target.itemType === 'passenger') {
        const sourceCar = state.allocations.find(a => a.carId === source.carId);
        const targetCar = state.allocations.find(a => a.carId === target.carId);
        
        const temp = sourceCar.passengers[source.elementIndex];
        sourceCar.passengers[source.elementIndex] = targetCar.passengers[target.elementIndex];
        targetCar.passengers[target.elementIndex] = temp;
      } 
      // 2. 同乗者を「空のシート」に移動
      else if (source.itemType === 'passenger' && target.itemType === 'empty') {
        const sourceCar = state.allocations.find(a => a.carId === source.carId);
        const targetCar = state.allocations.find(a => a.carId === target.carId);
        
        const movingPassenger = sourceCar.passengers.splice(source.elementIndex, 1)[0];
        targetCar.passengers.push(movingPassenger);
      }
      // 3. 駐車場ブロック同士の入れ替え
      else if (source.itemType === 'car-parking' && target.itemType === 'car-parking') {
        const sourceCarObj = state.cars.find(c => c.id === source.carId);
        const targetCarObj = state.cars.find(c => c.id === target.carId);
        
        const tempParking = sourceCarObj.parking;
        sourceCarObj.parking = targetCarObj.parking;
        targetCarObj.parking = tempParking;
      } else {
        throw new Error("このターゲットの組み合わせは移動・入れ替えできません");
      }

      activeSwapSource = null;
      showToast('シートの配置変更が完了しました。');
      renderContent();
    }, "配置データをアップデート中...")
    .catch((err) => {
      activeSwapSource = null;
      showToast(err.message, 'error');
    });
  }
}

// ------------------------------------------
// 3. 自動マッチングロジック (シャッフル・シミュレーション)
// ------------------------------------------
function triggerAutoAllocation() {
  withLoading(async () => {
    // 擬似的な家族・学年優先アルゴリズムの稼働
    state.allocations = [
      { carId: 1, passengers: ['山田 太郎', '鈴木 花子', '高橋 翔太(選手)'] },
      { carId: 2, passengers: ['佐藤 次郎', '山田 結衣(保護者)'] },
      { carId: 3, passengers: ['渡辺 三郎', '渡辺 陸(選手)', '田中 颯太(選手)'] }
    ];
    showToast('最適な家族同乗・学年マッチングロジックを実行しました。');
    renderContent();
  }, "マッチングシミュレーション中...");
}

// ------------------------------------------
// 4. マスタビュー構築テンプレート
// ------------------------------------------
const viewTemplates = {
  // 配車調整ビュー
  matching: () => `
    <div class="space-y-8 fade-in">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm glass-card">
        <div>
          <span class="text-xs font-bold text-brand-500 uppercase tracking-wider">配車・乗員マッチング調整</span>
          <h2 class="text-2xl font-bold text-slate-800 mt-1">配車シミュレーション</h2>
        </div>
        
        <div class="flex gap-2 w-full sm:w-auto">
          <button onclick="triggerAutoAllocation()" class="flex-1 sm:flex-initial px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-brand-500/10 transition duration-200 flex items-center justify-center gap-2">
            <i data-lucide="sparkles" class="w-4 h-4 animate-pulse"></i>
            <span>自動マッチング</span>
          </button>
          <button onclick="copyMatchingToClipboard()" class="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200 transition duration-200" title="テキストをクリップボードにコピー">
            <i data-lucide="copy" class="w-5 h-5"></i>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${state.cars.map(car => {
          const allocation = state.allocations.find(a => a.carId === car.id) || { passengers: [] };
          const usedSeats = allocation.passengers.length;
          const capacity = car.capacity;
          const remaining = capacity - usedSeats;
          
          return `
            <div class="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden transition-all duration-300">
              <!-- 車両ヘッダー -->
              <div class="p-5 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
                <div class="flex justify-between items-start">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-bold rounded-md">ドライバー</span>
                      <span class="text-xs font-bold text-slate-400">定員 ${capacity}名</span>
                    </div>
                    <h4 class="text-lg font-bold text-slate-800 mt-1">${car.driver} の車</h4>
                  </div>
                  <span class="px-2 py-1 bg-brand-50 text-brand-600 text-xs font-bold rounded-lg">${car.parking || '未設定'}</span>
                </div>
                <p class="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                  <i data-lucide="info" class="w-3.5 h-3.5"></i>
                  <span>${car.note || '特記事項なし'}</span>
                </p>
              </div>

              <!-- 乗客シートリスト -->
              <div class="p-5 flex-grow space-y-2">
                <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">搭乗メンバー (${usedSeats}/${capacity})</div>
                
                ${allocation.passengers.map((passenger, pIdx) => `
                  <div 
                    onclick="selectForSwap('passenger', ${car.id}, ${pIdx}, this)"
                    class="p-3 bg-slate-50 hover:bg-indigo-50/50 rounded-xl text-sm font-medium text-slate-700 border border-transparent cursor-pointer flex items-center justify-between transition"
                  >
                    <span class="flex items-center gap-2">
                      <i data-lucide="user" class="w-4 h-4 text-slate-400"></i>
                      <span>${passenger}</span>
                    </span>
                    <span class="text-[9px] text-brand-500 font-bold bg-white border border-brand-100 px-1.5 py-0.5 rounded-md">移動対象</span>
                  </div>
                `).join('')}

                <!-- 空席 -->
                ${Array.from({ length: remaining }).map((_, emptyIdx) => `
                  <div 
                    onclick="selectForSwap('empty', ${car.id}, ${usedSeats + emptyIdx}, this)"
                    class="p-3 bg-slate-50/40 border border-dashed border-slate-200 text-slate-400 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 hover:border-slate-300 transition"
                  >
                    <i data-lucide="plus" class="w-4 h-4"></i>
                    <span>シート空き</span>
                  </div>
                `).join('')}
              </div>

              <!-- 車両フッターアクション -->
              <div class="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
                <button onclick="selectForSwap('car-parking', ${car.id}, null, this)" class="text-xs text-brand-500 hover:text-brand-600 font-bold flex items-center gap-1.5">
                  <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
                  <span>駐車場をスワップ対象にする</span>
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `,

  master: () => `
    <div class="space-y-8 fade-in">
      <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm glass-card">
        <span class="text-xs font-bold text-brand-500 uppercase tracking-wider">各種設定 / メンテナンス</span>
        <h2 class="text-2xl font-bold text-slate-800 mt-1">マスターデータ管理</h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition">
          <div class="w-10 h-10 bg-brand-50 text-brand-500 rounded-xl flex items-center justify-center">
            <i data-lucide="car" class="w-5 h-5"></i>
          </div>
          <h3 class="text-base font-bold text-slate-800">車両・ドライバー設定</h3>
          <p class="text-xs text-slate-400 leading-relaxed">活動に出動する車、駐車可能台数、および優先駐車場を編集・同期します。</p>
          <button onclick="showToast('モジュール読込中...', 'info')" class="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg transition border border-slate-200">
            車両設定を開く
          </button>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition">
          <div class="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center">
            <i data-lucide="users" class="w-5 h-5"></i>
          </div>
          <h3 class="text-base font-bold text-slate-800">家族・優先同乗グループ</h3>
          <p class="text-xs text-slate-400 leading-relaxed">同じ車への優先割り当てが求められる家族や兄弟のアソシエーションを構成します。</p>
          <button onclick="showToast('モジュール読込中...', 'info')" class="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg transition border border-slate-200">
            家族設定を開く
          </button>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition">
          <div class="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
            <i data-lucide="user-check" class="w-5 h-5"></i>
          </div>
          <h3 class="text-base font-bold text-slate-800">ユーザー権限設定</h3>
          <p class="text-xs text-slate-400 leading-relaxed">登録済みの各アカウントの操作可能範囲（管理者、リーダー、ユーザー）を設定します。</p>
          <button onclick="showToast('モジュール読込中...', 'info')" class="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg transition border border-slate-200">
            権限管理を開く
          </button>
        </div>
      </div>
    </div>
  `,

  login: () => `
    <div class="max-w-md mx-auto my-12 fade-in">
      <div class="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-brand-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-500/20">
            <i data-lucide="lock" class="w-8 h-8"></i>
          </div>
          <h2 class="text-2xl font-bold text-slate-800">ANTSへログイン</h2>
          <p class="text-sm text-slate-400 mt-2">配車と出欠をスマートに調整・確認</p>
        </div>
        
        <form onsubmit="handleLoginSubmit(event)" class="space-y-5">
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">メールアドレス</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <i data-lucide="mail" class="w-4 h-4"></i>
              </div>
              <input type="email" id="login-email" value="admin@example.com" required class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition text-sm" placeholder="your@email.com">
            </div>
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider">パスワード</label>
              <a href="#" class="text-xs text-brand-500 hover:underline">パスワードをお忘れですか？</a>
            </div>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <i data-lucide="key-round" class="w-4 h-4"></i>
              </div>
              <input type="password" id="login-password" value="password" required class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition text-sm" placeholder="••••••••">
            </div>
          </div>

          <button type="submit" id="btn-login" class="w-full py-3 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-semibold rounded-xl shadow-lg shadow-brand-500/20 transition duration-150 flex items-center justify-center gap-2">
            <span>ログインする</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </form>
      </div>
    </div>
  `
};

// ------------------------------------------
// 5. アプリケーション共通管理
// ------------------------------------------

// トースト通知処理
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  
  let icon = 'check-circle';
  let bgColor = 'bg-emerald-50 border-emerald-100 text-emerald-800';
  
  if (type === 'error') {
    icon = 'alert-triangle';
    bgColor = 'bg-rose-50 border-rose-100 text-rose-800';
  } else if (type === 'info') {
    icon = 'info';
    bgColor = 'bg-blue-50 border-blue-100 text-blue-800';
  }

  toast.className = `p-4 rounded-xl border ${bgColor} shadow-lg flex items-start gap-3 transform translate-y-2 opacity-0 transition-all duration-300 pointer-events-auto`;
  toast.innerHTML = `
    <i data-lucide="${icon}" class="w-5 h-5 mt-0.5"></i>
    <div class="text-xs font-semibold leading-relaxed">${message}</div>
  `;

  container.appendChild(toast);
  lucide.createIcons();

  // フェードイン
  setTimeout(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  }, 50);

  // 3.5秒で自動消去
  setTimeout(() => {
    toast.classList.add('translate-y-2', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// クリップボードへコピー
function copyMatchingToClipboard() {
  let text = "【ANTS 配車マッチング決定表】\n\n";
  state.cars.forEach(car => {
    const allocation = state.allocations.find(a => a.carId === car.id);
    text += `🚘 ${car.driver} 車 [定員: ${car.capacity} / ${car.parking}]\n`;
    if (allocation && allocation.passengers.length > 0) {
      allocation.passengers.forEach((p, idx) => {
        text += `  └ [${idx + 1}] ${p}\n`;
      });
    } else {
      text += "  └ 搭乗メンバーなし (空車)\n";
    }
    text += "\n";
  });

  const tempInput = document.createElement('textarea');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);

  showToast('マッチング内容をクリップボードにコピーしました！');
}

// ナビゲーションバーのレンダリング
function renderNavigation() {
  const mainNav = document.getElementById('main-nav');
  const mobileNav = document.getElementById('mobile-nav');
  
  if (!state.user) {
    mainNav.classList.add('hidden');
    mobileNav.classList.add('hidden');
    return;
  }

  const navTabs = [
    { id: 'attendance', name: '出欠管理', icon: 'calendar-check' },
    { id: 'matching', name: '配車シミュレーション', icon: 'shuffle', requiredRole: ['admin', 'leader'] },
    { id: 'master', name: 'マスター管理', icon: 'sliders-horizontal', requiredRole: ['admin'] }
  ];

  const mainTabsHtml = navTabs.map(tab => {
    if (tab.requiredRole && !tab.requiredRole.includes(state.role)) return '';
    const active = state.currentTab === tab.id;
    return `
      <button onclick="switchTab('${tab.id}')" class="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${active ? 'bg-brand-500 text-white shadow-md shadow-brand-500/10' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'} flex items-center gap-2">
        <i data-lucide="${tab.icon}" class="w-4 h-4"></i>
        <span>${tab.name}</span>
      </button>
    `;
  }).join('');

  const mobileTabsHtml = navTabs.map(tab => {
    if (tab.requiredRole && !tab.requiredRole.includes(state.role)) return '';
    const active = state.currentTab === tab.id;
    return `
      <button onclick="switchTab('${tab.id}')" class="flex flex-col items-center py-1 gap-1 ${active ? 'text-brand-500 font-bold' : 'text-slate-400'}">
        <i data-lucide="${tab.icon}" class="w-5 h-5"></i>
        <span class="text-[9px] tracking-tight">${tab.name}</span>
      </button>
    `;
  }).join('');

  mainNav.innerHTML = mainTabsHtml;
  mobileNav.innerHTML = mobileTabsHtml;
  mainNav.classList.remove('hidden');
  mobileNav.classList.remove('hidden');

  lucide.createIcons();
}

function switchTab(tabId) {
  state.currentTab = tabId;
  renderNavigation();
  renderContent();
}

function renderContent() {
  const appContainer = document.getElementById('app');
  if (!state.user) {
    appContainer.innerHTML = viewTemplates.login();
  } else if (state.currentTab === 'attendance') {
    // 出欠モジュールからHTMLを取得
    appContainer.innerHTML = AttendanceModule.render(state);
  } else {
    appContainer.innerHTML = viewTemplates[state.currentTab]();
  }
  lucide.createIcons();
}

// ログインアクション
function handleLoginSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const btn = document.getElementById('btn-login');

  btn.disabled = true;
  btn.innerHTML = `<span class="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>ログイン処理中...`;

  withLoading(async () => {
    // 擬似セッションキャッシュ
    state.user = { email: email };
    
    document.getElementById('user-display-name').innerText = email.split('@')[0];
    document.getElementById('user-display-role').innerText = state.role.toUpperCase();
    document.getElementById('user-menu').classList.remove('hidden');

    showToast('アカウントログインに成功しました。');
    renderNavigation();
    switchTab('attendance');
  }, "セッション認証を確立中...")
  .catch(() => {
    showToast('ログインに失敗しました。認証プロバイダーの設定を確認してください。', 'error');
    btn.disabled = false;
    btn.innerHTML = `<span>ログインする</span><i data-lucide="arrow-right" class="w-4 h-4"></i>`;
    lucide.createIcons();
  });
}

// ログアウトアクション
function handleLogout() {
  withLoading(async () => {
    state.user = null;
    document.getElementById('user-menu').classList.add('hidden');
    renderNavigation();
    renderContent();
    showToast('ログアウトしました。');
  }, "セッションをクローズ中...");
}

// ------------------------------------------
// 初期化
// ------------------------------------------
function initApp() {
  withLoading(async () => {
    // 初期データのフェッチなど
    renderNavigation();
    renderContent();
  }, "最新のスケジュールを取得中...");
}

window.onload = function() {
  initApp();
};