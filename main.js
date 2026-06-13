import { initAttendanceApp } from './attendance.js';
import { initDashboardApp } from './dashboard.js';

// ==========================================
// ★Vercel環境変数からSupabase情報を読み込む
// ==========================================
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    alert("Supabaseの接続情報（環境変数）が正しく読み込めていません。\nVercel等の設定を確認してください。");
    console.error("Missing SUPABASE_URL or SUPABASE_ANON_KEY");
}

if (SUPABASE_URL && !SUPABASE_URL.startsWith('https://')) {
    alert("設定エラー: VITE_SUPABASE_URL に https:// が含まれていません。\n現在の値: " + SUPABASE_URL + "\n\nVercelの設定を確認して再デプロイしてください。");
}
console.log("Checking Supabase URL:", SUPABASE_URL ? "Exists" : "Empty");

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
let currentUser = null;
let isAppInitialized = false;
let currentUserRole = 'user'; // 'admin' or 'user'

// --- ローディング表示のカウント管理 ---
let loadingCount = 0;
let loadingDetailEl = null;

function updateLoadingText(msg) {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        const span = overlay.querySelector('span');
        if (span) span.textContent = msg;
    }
    if (!loadingDetailEl) {
        loadingDetailEl = document.createElement('div');
        loadingDetailEl.id = 'loading-detail-text';
        loadingDetailEl.className = 'fixed bottom-2 right-2 text-xs md:text-sm font-bold text-gray-600 bg-white/90 border border-gray-300 px-3 py-1.5 rounded shadow-lg pointer-events-none z-[9999] transition-opacity duration-300';
        document.body.appendChild(loadingDetailEl);
    }
    loadingDetailEl.textContent = msg;
    loadingDetailEl.style.opacity = '1';
}

function showLoading(msg = '通信中...') {
    loadingCount++;
    const overlay = document.getElementById('loading-overlay');
    if (overlay && loadingCount === 1) overlay.classList.remove('hidden');
    updateLoadingText(msg);
}

function hideLoading() {
    loadingCount--;
    if (loadingCount <= 0) {
        loadingCount = 0;
        document.getElementById('loading-overlay')?.classList.add('hidden');
        if (loadingDetailEl) loadingDetailEl.style.opacity = '0';
    }
}

// --- 強制的にローディングを解除する安全装置 ---
function forceHideLoading() {
    loadingCount = 0;
    document.getElementById('loading-overlay')?.classList.add('hidden');
    if (loadingDetailEl) loadingDetailEl.style.opacity = '0';
}

// --- ローディングラッパー ---
async function withLoading(asyncFunc, msg = '通信中...') {
    if (!SUPABASE_URL) {
        alert("環境変数 (VITE_SUPABASE_URL) が設定されていません。Vercelの設定を確認してください。");
        return;
    }
    showLoading(msg);
    try {
        const result = await asyncFunc();
        return result;
    } catch (e) {
        console.error('Supabase DB Error:', e);
        forceHideLoading();
        if (e.message === 'Load failed' || e.message === 'Failed to fetch') {
            alert('サーバー通信エラー: 通信に失敗しました。\nネットワーク接続、または環境変数(Supabase URL)の設定が正しいか確認してください。');
        } else {
            alert('サーバー通信エラー:\n' + e.message);
        }
        throw e;
    } finally {
        hideLoading();
    }
}

// --- 操作ログ記録関数 ---
async function logAction(actionType, details) {
    if (!currentUser) return;
    if (actionType === 'NAVIGATE') return;
    try {
        await supabaseClient.from('action_logs').insert({
            user_email: currentUser.email,
            action_type: actionType,
            details: details
        });
    } catch (e) {
        console.error("Log error:", e);
    }
}

// --- 認証 (Auth) ロジック ---
function initAppDOM() {
    if (window.isDomInitialized) return;
    
    try {
        window.isDomInitialized = true;

        // ページタイトルと画面内のテキストを「bb-sys for arinko ants.」に変更
        document.title = "bb-sys for arinko ants.";
        
        if (document.body) {
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
            let node;
            while ((node = walker.nextNode())) {
                if (node.nodeValue.includes('配車調整アプリ')) {
                    node.nodeValue = node.nodeValue.replace(/配車調整アプリ/g, 'bb-sys for arinko ants.');
                }
                if (node.nodeValue.includes('少年野球に役立つツール for arinko ants.')) {
                    node.nodeValue = node.nodeValue.replace(/少年野球に役立つツール for arinko ants./g, 'bb-sys for arinko ants.');
                }
            }
        }

        // UI表示の初期化
        document.documentElement.style.setProperty('--layout-columns', LAYOUT_COLUMNS);
        window.addEventListener('resize', updateLayouts);
        updateLayouts();

        // ログインボタン等のイベント
        document.getElementById('btn-login')?.addEventListener('click', handleLogin);
        // フォームのsubmitイベントでログイン処理を発火（オートフィル対応）
        document.getElementById('auth-form')?.addEventListener('submit', handleLogin);
        document.getElementById('btn-logout')?.addEventListener('click', handleLogout);
        document.getElementById('btn-logout-menu')?.addEventListener('click', handleLogout);
        document.getElementById('btn-clear-cache')?.addEventListener('click', handleClearCache);

        // ビュー切り替えイベント
        document.getElementById('link-to-signup')?.addEventListener('click', (e) => { e.preventDefault(); switchAuthScreen('signup-view'); });
        document.getElementById('link-to-reset')?.addEventListener('click', (e) => { e.preventDefault(); switchAuthScreen('password-reset-view'); });
        document.querySelectorAll('.link-back-to-login').forEach(el => el.addEventListener('click', (e) => { e.preventDefault(); switchAuthScreen('auth-view'); }));

        document.getElementById('btn-submit-signup')?.addEventListener('click', handleSignupRequest);
        document.getElementById('btn-send-reset')?.addEventListener('click', handlePasswordResetRequest);
        document.getElementById('btn-update-password')?.addEventListener('click', handlePasswordUpdate);

        // パスワード変更モーダル
        document.getElementById('btn-change-password')?.addEventListener('click', () => {
            document.getElementById('change-password-modal')?.classList.remove('hidden');
        });
        document.getElementById('btn-close-change-password')?.addEventListener('click', () => {
            document.getElementById('change-password-modal')?.classList.add('hidden');
        });
        document.getElementById('btn-submit-change-password')?.addEventListener('click', handlePasswordChangeInApp);
        
        // アカウント設定等の文言を「パスワード変更」に統一
        const btnChangePw = document.getElementById('btn-change-password');
        if (btnChangePw) {
            btnChangePw.textContent = 'パスワード変更';
        }

        // ユーザー管理イベント
        document.getElementById('nav-users')?.addEventListener('click', handleNavUsers);
        document.getElementById('btn-admin-add-user')?.addEventListener('click', adminAddUser);
        document.getElementById('btn-reload-users')?.addEventListener('click', loadAdminUsersData);
        document.getElementById('btn-save-all-users')?.addEventListener('click', saveAllAdminUsers);

        // 管理画面にダミーユーザー追加ボタンを動的に挿入
        const btnAdminAddUser = document.getElementById('btn-admin-add-user');
        if (btnAdminAddUser && !document.getElementById('btn-admin-add-dummy-user')) {
            const dummyBtn = document.createElement('button');
            dummyBtn.id = 'btn-admin-add-dummy-user';
            dummyBtn.className = 'ml-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow font-bold text-sm';
            dummyBtn.textContent = '代行専用メンバー追加';
            dummyBtn.onclick = adminAddDummyUser;
            btnAdminAddUser.parentNode?.appendChild(dummyBtn);
        }

        // 配車調整マスター画面からログUIを削除 (管理者メニューへ移動するため)
        const oldLoadLogsBtn = document.querySelector('#view-master #btn-load-logs');
        if (oldLoadLogsBtn) oldLoadLogsBtn.remove();
        const oldLogList = document.querySelector('#view-master #log-list');
        if (oldLogList) {
            const parentBlock = oldLogList.closest('.bg-white');
            if (parentBlock) parentBlock.remove();
            else oldLogList.remove();
        }
        document.querySelectorAll('#view-master h2').forEach(h2 => {
            if (h2.textContent.includes('操作ログ')) h2.remove();
        });

        // 管理者メニューに「操作ログ」タブを動的に追加
        const tabMasterAdminBtn = document.getElementById('tab-master-admin');
        if (tabMasterAdminBtn && !document.getElementById('tab-logs-admin')) {
            const tabsContainer = tabMasterAdminBtn.parentElement;
            const tabLogsAdmin = document.createElement('button');
            tabLogsAdmin.id = 'tab-logs-admin';
            tabLogsAdmin.className = 'px-4 py-2 font-bold text-gray-500 hover:text-gray-700 border-b-2 border-transparent transition-colors';
            tabLogsAdmin.textContent = '操作ログ';
            tabsContainer?.appendChild(tabLogsAdmin);

            const tabContentLogsAdmin = document.createElement('div');
            tabContentLogsAdmin.id = 'tab-content-logs-admin';
            tabContentLogsAdmin.className = 'hidden';
            tabContentLogsAdmin.innerHTML = `
                <div class="mb-4 flex space-x-2 mt-4">
                    <button id="btn-load-logs" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow font-bold">最新を読み込み</button>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
                    <div id="log-list" class="min-w-[600px] text-sm flex flex-col">
                        <p class="text-gray-500 py-4 text-center">「最新を読み込み」ボタンを押してください</p>
                    </div>
                </div>
            `;
            const tabContentMasterAdmin = document.getElementById('tab-content-master-admin');
            if (tabContentMasterAdmin && tabContentMasterAdmin.parentElement) {
                tabContentMasterAdmin.parentElement.appendChild(tabContentLogsAdmin);
            }
        }

        // ユーザー管理画面のタブ切り替え
        const switchAdminTab = (activeTabId) => {
            const tabs = [
                { btnId: 'tab-users-admin', contentId: 'tab-content-users-admin' },
                { btnId: 'tab-master-admin', contentId: 'tab-content-master-admin' },
                { btnId: 'tab-logs-admin', contentId: 'tab-content-logs-admin' }
            ];

            tabs.forEach(t => {
                const btn = document.getElementById(t.btnId);
                const content = document.getElementById(t.contentId);
                if (!btn || !content) return;

                if (t.btnId === activeTabId) {
                    btn.className = 'px-4 py-2 font-bold text-blue-600 border-b-2 border-blue-600 transition-colors';
                    content.classList.remove('hidden');
                    if (activeTabId === 'tab-logs-admin') loadLogs();
                } else {
                    btn.className = 'px-4 py-2 font-bold text-gray-500 hover:text-gray-700 border-b-2 border-transparent transition-colors';
                    content.classList.add('hidden');
                }
            });
        };

        document.getElementById('tab-users-admin')?.addEventListener('click', () => switchAdminTab('tab-users-admin'));
        document.getElementById('tab-master-admin')?.addEventListener('click', () => switchAdminTab('tab-master-admin'));
        document.getElementById('tab-logs-admin')?.addEventListener('click', () => switchAdminTab('tab-logs-admin'));
        document.getElementById('btn-load-logs')?.addEventListener('click', loadLogs);

        // アプリメニューイベント
        document.getElementById('btn-app-dispatch')?.addEventListener('click', () => {
            switchAuthScreen('app-view', 'dispatch');
            if (!isAppInitialized) {
                initApp();
            } else {
                document.getElementById('nav-dispatch')?.click();
            }
        });
        document.getElementById('btn-app-attendance')?.addEventListener('click', async () => {
            switchAuthScreen('attendance-view');
            await withLoading(initAttendanceApp, '出欠管理画面を準備中...');
        });
        document.getElementById('btn-app-dashboard')?.addEventListener('click', async () => {
            await withLoading(initDashboardApp, 'ダッシュボードを準備中...');
            switchAuthScreen('dashboard-view');
        });
        document.getElementById('btn-back-to-menu')?.addEventListener('click', () => {
            switchAuthScreen('app-menu-view');
        });

        document.getElementById('btn-back-to-menu-att')?.addEventListener('click', () => switchAuthScreen('app-menu-view'));
        document.getElementById('btn-logout-att')?.addEventListener('click', handleLogout);

        // メニューのレイアウト調整（縦並びのリスト化）
        const menuContainer = document.getElementById('app-menu-view')?.querySelector('.space-y-4');
        if (menuContainer) {
            menuContainer.className = 'w-full max-w-xs mx-auto space-y-3 mt-4';
        }

        const btnDispatch = document.getElementById('btn-app-dispatch');
        if (btnDispatch) {
            btnDispatch.className = 'flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-blue-600 hover:bg-blue-700 hover:shadow-lg text-white text-left';
            btnDispatch.innerHTML = '<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">🚗</span><span>配車調整</span></div><span class="text-white/60 text-sm font-normal">❯</span>';
        }

        const btnAttendance = document.getElementById('btn-app-attendance');
        if (btnAttendance) {
            btnAttendance.className = 'flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-green-600 hover:bg-green-700 hover:shadow-lg text-white text-left';
            btnAttendance.innerHTML = '<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">📅</span><span>出欠管理</span></div><span class="text-white/60 text-sm font-normal">❯</span>';
        }
    } catch (e) {
        console.error("DOM Initialization failed:", e);
        forceHideLoading();
        switchAuthScreen('auth-view');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAppDOM);
} else {
    setTimeout(initAppDOM, 0);
}

let isPopStateNavigating = false;

function pushHistoryState(screenId, subView = null) {
    if (isPopStateNavigating) return;
    const hash = '#' + screenId + (subView ? '-' + subView : '');
    if (window.location.hash !== hash) {
        history.pushState({ screenId, subView }, '', hash);
    }
}

// 画面切り替えヘルパー関数
export function switchAuthScreen(screenId, subView = null) {
    ['auth-view', 'signup-view', 'password-reset-view', 'password-update-view', 'app-menu-view', 'app-view', 'attendance-view', 'view-users', 'dashboard-view', 'dashboard-settings'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    const targetEl = document.getElementById(screenId);
    if (targetEl) targetEl.classList.remove('hidden');
    
    pushHistoryState(screenId, subView);

    if (screenId !== 'auth-view' && currentUser) {
        logAction('NAVIGATE', `画面遷移: ${screenId}${subView ? ' > ' + subView : ''}`);
    }
}

// ブラウザの戻る/進む（popstate）対応
window.addEventListener('popstate', async (e) => {
    isPopStateNavigating = true;
    try {
        if (e.state && e.state.screenId) {
            switchAuthScreen(e.state.screenId, e.state.subView);
            
            // app-view の内部タブ復元
            if (e.state.screenId === 'app-view') {
                if (e.state.subView === 'users') {
                    await handleNavUsers();
                } else if (e.state.subView === 'master') {
                    document.getElementById('nav-master')?.click();
                } else {
                    document.getElementById('nav-dispatch')?.click();
                }
            }
        } else {
            if (currentUser) { switchAuthScreen('app-menu-view'); } 
            else { switchAuthScreen('auth-view'); }
        }
    } finally {
        isPopStateNavigating = false;
    }
});

// ログイン状態の監視
if (supabaseClient) {
    supabaseClient.auth.onAuthStateChange(async (event, session) => {
        // パスワードリセット用リンクを踏んで戻ってきた時
        if (event === 'PASSWORD_RECOVERY') {
            switchAuthScreen('password-update-view');
            return;
        }

        // アプリ起動済みで同じユーザーのままのトークン更新等のバックグラウンドイベントは処理をスキップ
        if (session && isAppInitialized && currentUser && (event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED')) {
            console.log(`Bypassing auth state change handling for event: ${event}`);
            return;
        }

        // DOM操作を安全に行うための内部非同期関数
        const handleAuthUI = async () => {
            if (session) {
                showLoading('ユーザー権限確認中...');
                try {
                    const isNewLogin = !currentUser || currentUser.id !== session.user.id;
                    currentUser = { ...session.user };
                    
                    if (isNewLogin) {
                        await logAction('LOGIN', 'ログインしました');
                    }
                    
                    // 管理者権限のチェック
                    let canUseDispatch = true;
                    let canUseDashboard = true;
                    let canUseAttendance = true;

                    try {
                        const { data: userData } = await supabaseClient.from('app_users').select('role, name, can_use_dispatch, can_use_dashboard, can_use_attendance').eq('email', currentUser.email).single();
                        
                        if (userData) {
                            currentUserRole = userData.role;
                            currentUser.name = userData.name; // 取得したメンバー名を保持
                            if (userData.can_use_dispatch === false) canUseDispatch = false;
                            if (userData.can_use_dashboard === false) canUseDashboard = false;
                            if (userData.can_use_attendance === false) canUseAttendance = false;
                        } else {
                            currentUserRole = 'user';
                        }
                    } catch (e) {
                        currentUserRole = 'user';
                    }

                    // 初期セットアップ・ロックアウト防止用: 特定のアドレスを強制的に管理者として扱う
                    if (currentUser.email === 'hishinumak@gmail.com') {
                        currentUserRole = 'admin';
                    }
                    
                    // 管理者は無条件に全機能を利用可能とする
                    if (currentUserRole === 'admin') {
                        canUseDispatch = true;
                        canUseDashboard = true;
                        canUseAttendance = true;
                    }

                    // --- ダッシュボードボタンの共通追加処理 (全ユーザーに表示) ---
                    let dashMenuBtn = document.getElementById('btn-app-dashboard');
                    if (canUseDashboard) {
                        if (!dashMenuBtn) {
                            const menuContainer = document.getElementById('app-menu-view')?.querySelector('.space-y-3') || document.getElementById('app-menu-view')?.querySelector('.space-y-4') || document.getElementById('app-menu-view')?.querySelector('.grid');
                            if (menuContainer) {
                                dashMenuBtn = document.createElement('button');
                                dashMenuBtn.id = 'btn-app-dashboard';
                                dashMenuBtn.className = 'flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg text-white text-left';
                                dashMenuBtn.innerHTML = '<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">📊</span><span>分析</span></div><span class="text-white/60 text-sm font-normal">❯</span>';
                                dashMenuBtn.onclick = async () => { 
                                    await withLoading(initDashboardApp, 'ダッシュボードを準備中...'); 
                                    switchAuthScreen('dashboard-view'); 
                                };
                                menuContainer.appendChild(dashMenuBtn);
                            }
                        } else {
                            dashMenuBtn.classList.remove('hidden');
                        }
                    } else {
                        if (dashMenuBtn) dashMenuBtn.classList.add('hidden');
                    }

                    // ロールに基づくUI制御
                    const navUsers = document.getElementById('nav-users');
                    const navMaster = document.getElementById('nav-master');
                    const navDispatch = document.getElementById('nav-dispatch');
                    const btnAppDispatch = document.getElementById('btn-app-dispatch');
                    const btnGotoMaster = document.getElementById('btn-goto-master');
                    const clearDbBtn = document.getElementById('clear-db-button');
                    
                    let adminMenuBtn = document.getElementById('btn-app-users-admin');

                    navUsers?.classList.add('hidden'); // 配車調整内のユーザー管理への導線を削除 (全員共通)

                    // 上部バーの配車調整・マスタ導線の制御をロール別に復元
                    if (currentUserRole === 'admin') {
                        navDispatch?.classList.remove('hidden');
                        navMaster?.classList.remove('hidden');
                    } else if (currentUserRole === 'leader') {
                        navDispatch?.classList.remove('hidden');
                        navMaster?.classList.add('hidden');
                    } else {
                        navDispatch?.classList.add('hidden');
                        navMaster?.classList.add('hidden');
                    }

                    if (currentUserRole === 'admin') {
                        btnGotoMaster?.classList.remove('hidden');
                        clearDbBtn?.classList.remove('hidden');
                        
                        // メインメニューに「ユーザー・グループ管理」ボタンを追加
                        if (!adminMenuBtn) {
                            const menuContainer = document.getElementById('app-menu-view')?.querySelector('.space-y-3') || document.getElementById('app-menu-view')?.querySelector('.space-y-4') || document.getElementById('app-menu-view')?.querySelector('.grid');
                            if (menuContainer) {
                                adminMenuBtn = document.createElement('button');
                                adminMenuBtn.id = 'btn-app-users-admin';
                                adminMenuBtn.className = 'flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-purple-600 hover:bg-purple-700 hover:shadow-lg text-white text-left order-last';
                                adminMenuBtn.innerHTML = '<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">⚙️</span><span>管理者メニュー</span></div><span class="text-white/60 text-sm font-normal">❯</span>';
                                adminMenuBtn.onclick = () => goToUsersAdmin();
                                menuContainer.appendChild(adminMenuBtn);
                            }
                        } else {
                            adminMenuBtn.classList.remove('hidden');
                        }
                    } else {
                        btnGotoMaster?.classList.add('hidden');
                        clearDbBtn?.classList.add('hidden');
                        if (adminMenuBtn) adminMenuBtn.classList.add('hidden');
                    }
                    
                    // 配車調整メニューの表示制御 (安全なオプショナルチェーニングに変更)
                    if (canUseDispatch) {
                        btnAppDispatch?.classList.remove('hidden');
                    } else {
                        btnAppDispatch?.classList.add('hidden');
                    }

                    // 出欠管理メニューの表示制御
                    const btnAppAttendance = document.getElementById('btn-app-attendance');
                    if (canUseAttendance) {
                        btnAppAttendance?.classList.remove('hidden');
                    } else {
                        btnAppAttendance?.classList.add('hidden');
                    }

                    const emailDisplay = document.getElementById('user-email-display');
                    if (emailDisplay) emailDisplay.textContent = currentUser.name || currentUser.email; // 名前があれば名前を表示

                    // URLハッシュから前回開いていた画面を復元（タブ復帰やリロード対策）
                    const hash = window.location.hash;
                    if (hash && hash !== '#app-menu-view' && hash !== '#auth-view') {
                        const validScreens = ['app-view', 'attendance-view', 'dashboard-view'];
                        let restored = false;
                        for (const sId of validScreens) {
                            if (hash.startsWith('#' + sId)) {
                                const subView = hash.length > sId.length + 1 ? hash.substring(sId.length + 2) : null;
                                if (sId === 'app-view') {
                                    switchAuthScreen('app-view', subView);
                                    if (!isAppInitialized) {
                                        initApp().then(() => {
                                            if (subView === 'users') handleNavUsers();
                                            else if (subView === 'master') document.getElementById('nav-master')?.click();
                                            else document.getElementById('nav-dispatch')?.click();
                                        }).catch(err => {
                                            console.error("App init error:", err);
                                            forceHideLoading();
                                        });
                                    } else {
                                        if (subView === 'users') handleNavUsers();
                                        else if (subView === 'master') document.getElementById('nav-master')?.click();
                                        else document.getElementById('nav-dispatch')?.click();
                                    }
                                } else if (sId === 'attendance-view') {
                                    switchAuthScreen('attendance-view');
                                    initAttendanceApp().catch(err => {
                                        console.error("Attendance init error:", err);
                                        forceHideLoading();
                                    });
                                } else if (sId === 'dashboard-view') {
                                    switchAuthScreen('dashboard-view');
                                    initDashboardApp().catch(err => {
                                        console.error("Dashboard init error:", err);
                                        forceHideLoading();
                                    });
                                }
                                restored = true;
                                break;
                            }
                        }
                        if (!restored) switchAuthScreen('app-menu-view');
                    } else {
                        switchAuthScreen('app-menu-view');
                    }
                } catch (err) {
                    console.error("Auth state handling error:", err);
                    forceHideLoading();
                } finally {
                    hideLoading();
                }
            } else {
                currentUser = null;
                forceHideLoading(); // セッション切れ等でログアウト状態に落ちた際、確実にローディングを解除する
                const pwUpdateEl = document.getElementById('password-update-view');
                if (!pwUpdateEl || pwUpdateEl.classList.contains('hidden')) {
                    switchAuthScreen('auth-view');
                }
            }
        };

        // DOMパースの完了状況に応じて実行タイミングを調整
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                handleAuthUI().catch(console.error);
            });
        } else {
            // スクリプト全体のパース・定数評価が完了するのを待つため、非同期で実行する
            setTimeout(() => {
                handleAuthUI().catch(console.error);
            }, 0);
        }
    });
}

async function handleClearCache(e) {
    if (e && e.preventDefault) e.preventDefault();
    
    if (!confirm("ブラウザに保存されているログイン情報（キャッシュ）をクリアして、ページを再読み込みしますか？\n（動作がおかしい・ログインできない場合にお試しください）")) {
        return;
    }
    
    showLoading('キャッシュクリア中...');
    try {
        await supabaseClient.auth.signOut().catch(() => {});
        
        // LocalStorage内のSupabase関連キーを強制削除
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('sb-')) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));
        
        alert("キャッシュをクリアしました。ページを再読み込みします。");
        location.reload();
    } catch (err) {
        forceHideLoading();
    }
}

let isAuthenticating = false; // 二重クリック防止フラグ

async function handleLogin(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (isAuthenticating) return;
    
    const email = document.getElementById('email-address')?.value || '';
    const password = document.getElementById('password')?.value || '';
    const msg = document.getElementById('auth-message');
    if (msg) msg.classList.add('hidden');
    
    // 入力が空の場合は処理を中断（パスワード補助機能などによる意図しない空の自動送信を防ぐ）
    if (!email || !password) {
        return;
    }
    
    isAuthenticating = true;
    showLoading('ログイン認証中...');
    try {
        const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
        
        if (error) {
            if (msg) {
                msg.textContent = "ログイン失敗: " + error.message;
                msg.classList.remove('hidden');
                msg.classList.add('text-red-500');
            } else {
                alert("ログイン失敗: " + error.message);
            }
        }
    } catch (err) {
        console.error("Login Error:", err);
        const errDetail = err.message + "\n" + JSON.stringify(err, Object.getOwnPropertyNames(err));
        if (msg) {
            msg.textContent = "通信エラー詳細: " + errDetail;
            msg.classList.remove('hidden');
            msg.classList.add('text-red-500');
        } else {
            alert("通信エラー詳細:\n" + errDetail);
        }
    } finally {
        hideLoading();
        isAuthenticating = false;
    }
}

// 出欠アプリ等から管理画面へ飛ぶためのグローバル関数
async function goToUsersAdmin() {
    switchAuthScreen('app-view', 'users');
    await handleNavUsers();
}
function openChangePasswordModal() {
    const modal = document.getElementById('change-password-modal');
    if (modal) {
        // 親画面が非表示（hidden）でも確実に最前面に見えるように、bodyの直下に配置を移動
        document.body.appendChild(modal);
        modal.classList.remove('hidden');
        modal.style.zIndex = '9999'; // 最前面を強制
    }
}

let isSigningUp = false; // 新規登録用の二重クリック防止フラグ

async function handleSignupRequest(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (isSigningUp) return;
    const parentName = document.getElementById('signup-parent-name')?.value || '';
    const playerName = document.getElementById('signup-player-name')?.value || '';
    const email = document.getElementById('signup-email')?.value || '';
    let password = document.getElementById('signup-password')?.value || '';
    const msg = document.getElementById('signup-message');
    if (msg) msg.classList.add('hidden');

    // HTMLにパスワード入力欄がない場合は一時的なダミーパスワードを自動生成
    const hasPasswordInput = document.getElementById('signup-password') !== null;
    if (!hasPasswordInput) {
        password = Math.random().toString(36).slice(-10) + 'A1!'; // ランダムな安全な文字列
    }

    if (!parentName || !playerName || !email || (hasPasswordInput && password.length < 6)) {
        if (msg) msg.textContent = hasPasswordInput ? "すべての項目を正しく入力してください(パスワードは6文字以上)" : "すべての項目を正しく入力してください";
        if (msg) msg.classList.remove('hidden', 'text-green-600');
        if (msg) msg.classList.add('text-red-500');
        return;
    }

    isSigningUp = true;
    showLoading('利用申請を送信中...');
    try {
        // 1. Supabase Auth にアカウントを作成（サインアップ）
        const { data: authData, error: authError } = await supabaseClient.auth.signUp({ email, password });
        
        if (authError) {
            if (msg) msg.textContent = "登録エラー: " + authError.message;
            if (msg) msg.classList.remove('hidden', 'text-green-600');
            if (msg) msg.classList.add('text-red-500');
            return;
        }

        // Supabaseの「signup_requests」テーブルに申請データを保存する
        const { error } = await supabaseClient.from('signup_requests').insert([{
            parent_name: parentName,
            player_name: playerName,
            email: email,
            status: 'pending'
        }]);

        // もしすでに管理者が allowed_users に追加済みのメアドだった場合、
        // そのままログインできてしまうのを防ぐため、明示的にサインアウトしておく
        // （本当に事前追加されていれば、次回ログインですぐ入れる）
        await supabaseClient.auth.signOut();
        
        if (error) {
            if (msg) msg.textContent = "申請失敗: " + error.message;
            if (msg) msg.classList.remove('hidden', 'text-green-600');
            if (msg) msg.classList.add('text-red-500');
        } else {
            if (msg) {
                msg.textContent = hasPasswordInput 
                    ? "アカウントが作成され、利用申請が送信されました。管理者の承認をお待ちください。"
                    : "利用申請が送信されました。管理者の承認後、「パスワードを忘れた場合」からパスワードを再設定してログインしてください。";
            }
            if (msg) msg.classList.remove('text-red-500');
            if (msg) msg.classList.add('text-green-600');
            if (msg) msg.classList.remove('hidden');
            // 入力欄クリア
            if (document.getElementById('signup-parent-name')) document.getElementById('signup-parent-name').value = '';
            if (document.getElementById('signup-player-name')) document.getElementById('signup-player-name').value = '';
            if (document.getElementById('signup-email')) document.getElementById('signup-email').value = '';
            if (document.getElementById('signup-password')) document.getElementById('signup-password').value = '';
        }
    } catch (err) {
        forceHideLoading();
        console.error("Signup Error:", err);
        if (msg) {
            msg.textContent = "登録処理中にエラーが発生しました。";
            msg.classList.remove('hidden', 'text-green-600');
            msg.classList.add('text-red-500');
        }
    } finally {
        hideLoading();
        isSigningUp = false;
    }
}

async function handlePasswordResetRequest(e) {
    if (e && e.preventDefault) e.preventDefault();
    const email = document.getElementById('reset-email')?.value || '';
    const msg = document.getElementById('reset-message');
    if (msg) msg.classList.add('hidden');

    if (!email) return;
    
    showLoading('パスワード再設定メール送信中...');
    try {
        // ユーザーにパスワード再設定メールを送信
        const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin
        });
        
        if (error) {
            if (msg) {
                msg.textContent = "送信失敗: " + error.message;
                msg.classList.remove('hidden', 'text-green-600');
                msg.classList.add('text-red-500');
            } else {
                alert("送信失敗: " + error.message);
            }
        } else {
            if (msg) {
                msg.textContent = "パスワード再設定メールを送信しました。";
                msg.classList.remove('text-red-500');
                msg.classList.add('text-green-600');
                msg.classList.remove('hidden');
            } else {
                alert("パスワード再設定メールを送信しました。");
            }
        }
    } catch (err) {
        console.error("Password reset error:", err);
    } finally {
        hideLoading();
    }
}

async function handlePasswordUpdate(e) {
    if (e && e.preventDefault) e.preventDefault();
    const newPassword = document.getElementById('new-password')?.value || '';
    const msg = document.getElementById('update-password-message');
    if (msg) msg.classList.add('hidden');

    if (!newPassword || newPassword.length < 6) {
        if (msg) {
            msg.textContent = "6文字以上のパスワードを入力してください";
            msg.classList.remove('hidden', 'text-green-600');
            msg.classList.add('text-red-500');
        } else {
            alert("6文字以上のパスワードを入力してください");
        }
        return;
    }
    
    showLoading('パスワード更新中...');
    try {
        // 新しいパスワードをSupabaseに反映
        const { error } = await supabaseClient.auth.updateUser({ password: newPassword });
        
        if (error) {
            if (msg) {
                msg.textContent = "更新失敗: " + error.message;
                msg.classList.remove('hidden', 'text-green-600');
                msg.classList.add('text-red-500');
            } else {
                alert("更新失敗: " + error.message);
            }
        } else {
            alert("パスワードが更新されました。再度ログインしてください。");
            switchAuthScreen('auth-view');
        }
    } catch (err) {
        console.error("Password update error:", err);
    } finally {
        hideLoading();
    }
}

async function handlePasswordChangeInApp(e) {
    if (e && e.preventDefault) e.preventDefault();
    const newPassword = document.getElementById('change-new-password')?.value || '';
    if (!newPassword || newPassword.length < 6) return alert("6文字以上のパスワードを入力してください");
    
    showLoading('パスワード変更中...');
    try {
        const { error } = await supabaseClient.auth.updateUser({ password: newPassword });
        
        if (error) {
            alert("更新失敗: " + error.message);
        } else {
            alert("パスワードが変更されました。");
            const modal = document.getElementById('change-password-modal');
            if (modal) modal.classList.add('hidden');
            const input = document.getElementById('change-new-password');
            if (input) input.value = '';
        }
    } catch (err) {
        console.error("Password change error:", err);
    } finally {
        hideLoading();
    }
}

async function handleLogout(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (currentUser) await logAction('LOGOUT', 'ログアウトしました');
    showLoading('ログアウト処理中...');
    try {
        await supabaseClient.auth.signOut().catch(() => {});
    } finally {
        hideLoading();
        isAppInitialized = false; // 再ログイン時にデータを再読込させる
        history.pushState(null, '', window.location.pathname); // URL履歴をクリア
    }
}


function updateHeaderTabsVisibility(activeSubView) {
    const navDispatch = document.getElementById('nav-dispatch');
    const navMaster = document.getElementById('nav-master');
    const navUsers = document.getElementById('nav-users');

    if (activeSubView === 'users') {
        navDispatch?.classList.add('hidden');
        navMaster?.classList.add('hidden');
        navUsers?.classList.add('hidden');
    } else {
        navUsers?.classList.add('hidden');
        if (currentUserRole === 'admin') {
            navDispatch?.classList.remove('hidden');
            navMaster?.classList.remove('hidden');
        } else if (currentUserRole === 'leader') {
            navDispatch?.classList.remove('hidden');
            navMaster?.classList.add('hidden');
        } else {
            navDispatch?.classList.add('hidden');
            navMaster?.classList.add('hidden');
        }
    }
}

// --- アプリ初期化 ---
let localFamilies = [];
let localCars = [];
let localParkings = [];
let deletedParkingIds = new Set();

async function initApp() {
    isAppInitialized = true;
    
    // Set initial header tab visibility
    updateHeaderTabsVisibility('dispatch');
    
    // ナビゲーションイベント設定
    navDispatch?.addEventListener('click', async () => {
        viewDispatch?.classList.remove('hidden'); 
        viewMaster?.classList.add('hidden');
        document.getElementById('view-users')?.classList.add('hidden');
        
        // Restore tab visibility
        updateHeaderTabsVisibility('dispatch');
        
        navDispatch?.classList.add('text-blue-300'); navDispatch?.classList.remove('text-gray-400');
        navMaster?.classList.remove('text-blue-300'); navMaster?.classList.add('text-gray-400');
        document.getElementById('nav-users')?.classList.remove('text-blue-300');
        pushHistoryState('app-view', 'dispatch');
        await reloadDispatchData();
    });
    navMaster?.addEventListener('click', async () => {
        viewMaster?.classList.remove('hidden'); 
        viewDispatch?.classList.add('hidden');
        document.getElementById('view-users')?.classList.add('hidden');
        
        // Restore tab visibility
        updateHeaderTabsVisibility('master');
        
        navMaster?.classList.add('text-blue-300'); navMaster?.classList.remove('text-gray-400');
        navDispatch?.classList.remove('text-blue-300'); navDispatch?.classList.add('text-gray-400');
        document.getElementById('nav-users')?.classList.remove('text-blue-300');
        pushHistoryState('app-view', 'master');
        await fetchAndRenderMasterData();
        loadLogs(); // マスター画面を開いた時にログも読み込む
    });
    
    // 画面内ボタンからのタブ切り替えサポート（導線が非表示になっても遷移できるように）
    document.getElementById('btn-goto-master')?.addEventListener('click', () => {
        navMaster?.click();
    });
    document.getElementById('btn-back-to-dispatch')?.addEventListener('click', () => {
        navDispatch?.click();
    });

    try {
        await db.initMasterData();
        if (localFamilies.length === 0 && localCars.length === 0) {
            await db.bulkAddFamilies(DEFAULT_FAMILIES);
            await db.bulkAddCars(DEFAULT_AVAILABLE_CARS_INFO);
            await db.syncMaster();
            await db.initMasterData();
        }
        await reloadDispatchData();
        setupDispatchEventListeners();
        setupMasterEventListeners();
        document.getElementById('btn-load-logs')?.addEventListener('click', loadLogs);
    } catch (err) {
        console.error(err);
        showDispatchMessage('データの読み込みに失敗しました。', 'error');
    }
}

// ==========================================
// ユーザー管理 (Admin) ロジック
// ==========================================
async function handleNavUsers() {
    if (currentUserRole !== 'admin') return;
    document.getElementById('view-users').classList.remove('hidden');
    document.getElementById('view-master').classList.add('hidden');
    document.getElementById('view-dispatch').classList.add('hidden');
    
    updateHeaderTabsVisibility('users');
    
    document.getElementById('nav-users').classList.add('text-blue-300');
    document.getElementById('nav-users').classList.remove('text-gray-400');
    document.getElementById('nav-dispatch').classList.remove('text-blue-300');
    document.getElementById('nav-master').classList.remove('text-blue-300');
    
    pushHistoryState('app-view', 'users');
    await loadAdminUsersData();
}

async function loadAdminUsersData() {
    showLoading('メンバー・マスタ情報読み込み中...');
    try {
        // 1. 許可済みユーザー一覧の取得
        const { data: usersData } = await supabaseClient.from('app_users').select('*').order('created_at', { ascending: false });
        
        // 出欠グループ関連データの取得
        let groupsData = [];
        let userGroupsData = [];
        let categoriesData = [];
        let userAttributesData = [];
        let eventLocationsData = [];
        try {
            const { data: gData } = await supabaseClient.from('groups').select('*').order('created_at');
            if (gData) groupsData = gData;
            const { data: ugData } = await supabaseClient.from('user_groups').select('*');
            if (ugData) userGroupsData = ugData;
            const { data: catData } = await supabaseClient.from('event_categories').select('*').order('created_at');
            if (catData) categoriesData = catData;
            const { data: attrData } = await supabaseClient.from('user_attributes').select('*').order('created_at');
            if (attrData) userAttributesData = attrData;
            try {
                const { data: locData } = await supabaseClient.from('event_locations').select('*').order('name');
                if (locData) eventLocationsData = locData;
            } catch (e) {
                console.warn("event_locations table not created yet:", e);
            }
            
            // 代行権限の取得
            const { data: mdData } = await supabaseClient.from('master_data').select('*').eq('key', 'ATTENDANCE_DELEGATIONS').single();
            if (mdData && mdData.data) window.adminDelegations = mdData.data;
            else window.adminDelegations = {};
        } catch (e) { console.error("Groups DB Error:", e); }
    
        const allowedListEl = document.getElementById('allowed-users-list');
        
        // --- ユーザー属性マスター管理ブロック ---
        let attributeMasterHtml = `
        <div class="mb-6 p-4 bg-orange-50 border border-orange-200 rounded shadow-sm">
            <h3 class="font-bold text-orange-800 mb-2">ユーザー属性の管理</h3>
            <div class="flex flex-wrap gap-2 mb-3">
                ${userAttributesData.length === 0 ? '<span class="text-sm text-gray-500">属性なし</span>' : ''}
                ${userAttributesData.map(a => `<div class="bg-white border rounded px-2 py-1 flex items-center text-sm w-fit"><span class="mr-2 font-bold">${a.name}</span><button onclick="renameUserAttributeAdmin('${a.id}', '${a.name}')" class="text-blue-500 hover:text-blue-700 mr-2 font-bold" title="名称変更">✎</button><button onclick="deleteUserAttributeAdmin('${a.id}')" class="text-red-500 hover:text-red-700 font-bold" title="削除">×</button></div>`).join('')}
            </div>
            <div class="flex space-x-2 items-center">
                <input type="text" id="admin-new-attribute-name" placeholder="新しい属性名" class="border p-1 rounded text-sm w-48">
                <button onclick="saveNewUserAttributeAdmin()" class="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-sm shadow font-bold">追加</button>
            </div>
        </div>
        `;
    
        // --- カテゴリマスター管理ブロック ---
        let categoryMasterHtml = `
        <div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded shadow-sm">
            <h3 class="font-bold text-blue-800 mb-2">イベントカテゴリの管理</h3>
            <div class="flex flex-wrap gap-2 mb-3">
                ${categoriesData.length === 0 ? '<span class="text-sm text-gray-500">カテゴリなし</span>' : ''}
                ${categoriesData.map(c => `<div class="bg-white border rounded px-2 py-1 flex items-center text-sm w-fit"><input type="color" value="${c.color || '#bfdbfe'}" onchange="updateCategoryColorAdmin('${c.id}', this.value)" class="w-6 h-6 mr-2 border-0 p-0 cursor-pointer" title="色を変更"><span class="mr-2 font-bold">${c.name}</span><button onclick="renameCategoryAdmin('${c.id}', '${c.name}')" class="text-blue-500 hover:text-blue-700 mr-2 font-bold" title="名称変更">✎</button><button onclick="deleteCategoryAdmin('${c.id}')" class="text-red-500 hover:text-red-700 font-bold" title="削除">×</button></div>`).join('')}
            </div>
            <div class="flex space-x-2 items-center">
                <input type="color" id="admin-new-category-color" value="#bfdbfe" class="w-8 h-8 border p-0 rounded cursor-pointer" title="カテゴリの色">
                <input type="text" id="admin-new-category-name" placeholder="新しいカテゴリ名" class="border p-1 rounded text-sm w-48">
                <button onclick="saveNewCategoryAdmin()" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm shadow font-bold">追加</button>
            </div>
        </div>
        `;
    
        // --- グループマスター管理ブロック ---
        let groupMasterHtml = `
        <div class="mb-6 p-4 bg-purple-50 border border-purple-200 rounded shadow-sm">
            <h3 class="font-bold text-purple-800 mb-2">出欠グループの管理</h3>
            <div class="flex flex-col gap-2 mb-3">
                ${groupsData.length === 0 ? '<span class="text-sm text-gray-500">グループなし</span>' : ''}
                ${groupsData.map(g => `<div class="bg-white border rounded px-2 py-1 flex items-center text-sm w-fit"><input type="color" value="${g.color || '#d1fae5'}" onchange="updateGroupColorAdmin('${g.id}', this.value)" class="w-6 h-6 mr-2 border-0 p-0 cursor-pointer" title="色を変更"><span class="mr-2 font-bold">${g.name}</span><button onclick="renameGroupAdmin('${g.id}', '${g.name}')" class="text-blue-500 hover:text-blue-700 mr-2 font-bold" title="名称変更">✎</button><button onclick="deleteGroupAdmin('${g.id}')" class="text-red-500 hover:text-red-700 font-bold" title="削除">×</button></div>`).join('')}
            </div>
            <div class="flex space-x-2 items-center">
                <input type="color" id="admin-new-group-color" value="#d1fae5" class="w-8 h-8 border p-0 rounded cursor-pointer" title="グループの色">
                <input type="text" id="admin-new-group-name" placeholder="新しいグループ名" class="border p-1 rounded text-sm w-48">
                <button onclick="saveNewGroupAdmin()" class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm shadow font-bold">追加</button>
            </div>
        </div>
        `;

        // --- 場所マスター管理ブロック ---
        let locationMasterHtml = `
        <div class="mb-6 p-4 bg-teal-50 border border-teal-200 rounded shadow-sm">
            <h3 class="font-bold text-teal-800 mb-2">場所マスタの管理</h3>
            <div class="flex flex-col gap-2 mb-3">
                ${eventLocationsData.length === 0 ? '<span class="text-sm text-gray-500">登録済みの場所はありません</span>' : ''}
                ${eventLocationsData.map(loc => `
                    <div class="bg-white border rounded px-2 py-1 flex items-center text-sm w-fit gap-2">
                        <span class="font-bold text-teal-900">${loc.name}</span>
                        ${loc.url ? `<a href="${loc.url}" target="_blank" class="text-blue-500 text-xs hover:underline truncate max-w-xs">${loc.url}</a>` : ''}
                        <button onclick="renameLocationAdmin('${loc.id}', '${loc.name}', '${loc.url || ''}')" class="text-blue-500 hover:text-blue-700 font-bold ml-2" title="名称変更">✎</button>
                        <button onclick="deleteLocationAdmin('${loc.id}')" class="text-red-500 hover:text-red-700 font-bold" title="削除">×</button>
                    </div>
                `).join('')}
            </div>
            <div class="flex flex-wrap gap-2 items-center">
                <input type="text" id="admin-new-location-name" placeholder="場所の名前" class="border p-1 rounded text-sm w-48">
                <input type="text" id="admin-new-location-url" placeholder="URL (任意)" class="border p-1 rounded text-sm w-64">
                <button onclick="saveNewLocationAdmin()" class="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-sm shadow font-bold">追加</button>
            </div>
        </div>
        `;
    
        // --- ユーザー一覧ブロック ---
        const usersHtml = (usersData || []).map((u, i) => {
            const isDummy = u.email.endsWith('@local.dummy');

            const selectedGroupId = userGroupsData.find(ug => ug.user_email === u.email)?.group_id || '';
            const groupSelectOptions = groupsData.map(g => {
                return `<option value="${g.id}" ${selectedGroupId === g.id ? 'selected' : ''}>${g.name}</option>`;
            }).join('');
            const groupSelectHtml = `
                <select id="edit-group-${i}" class="border p-1 rounded text-sm w-36 font-semibold text-gray-700 bg-white">
                    <option value="">選択なし</option>
                    ${groupSelectOptions}
                </select>
            `;
    
            const delegationCheckboxes = (usersData || []).filter(other => other.email !== u.email).map(other => `
                <label class="inline-flex items-center text-xs mr-3 mb-1 w-32 truncate" title="${other.email}">
                    <input type="checkbox" name="edit-delegation-${i}" value="${other.email}" ${window.adminDelegations[u.email] && window.adminDelegations[u.email].includes(other.email) ? 'checked' : ''} class="mr-1 rounded text-blue-600">
                    <span class="truncate">${other.name || other.email}</span>
                </label>
            `).join('');

            return `
            <div class="user-admin-card flex flex-col p-3 bg-white border rounded shadow-sm mb-2 hover:bg-gray-50 transition" data-email="${u.email}" data-index="${i}" data-old-role="${u.role}">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-gray-100 pb-2 mb-2">
                    <div class="flex-grow flex flex-col md:flex-row md:items-center gap-2">
                    <input type="text" id="edit-name-${i}" value="${u.name || ''}" placeholder="氏名" class="border p-1 rounded text-sm w-32 font-bold">
                    <input type="email" id="edit-email-${i}" value="${u.email}" class="border p-1 rounded text-sm w-48 font-bold" ${u.email === currentUser.email || isDummy ? 'disabled' : ''}>
                    <select id="edit-attribute-${i}" class="border p-1 rounded text-sm w-28">
                        <option value="">属性なし</option>
                        ${userAttributesData.map(a => `<option value="${a.id}" ${u.attribute_id === a.id ? 'selected' : ''}>${a.name}</option>`).join('')}
                    </select>
                    <select id="edit-role-${i}" class="border p-1 rounded text-sm" ${u.email === currentUser.email ? 'disabled' : ''}>
                        <option value="user" ${u.role === 'user' ? 'selected' : ''}>一般ユーザー</option>
                        <option value="leader" ${u.role === 'leader' ? 'selected' : ''}>リーダー</option>
                        <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>管理者</option>
                    </select>
                    <div class="flex items-center space-x-3 ml-2 border-l pl-2">
                        <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-dispatch-${i}" class="rounded text-blue-600" ${u.can_use_dispatch !== false ? 'checked' : ''}><span>配車可</span></label>
                        <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-dashboard-${i}" class="rounded text-blue-600" ${u.can_use_dashboard !== false ? 'checked' : ''}><span>成績可</span></label>
                        <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-attendance-${i}" class="rounded text-blue-600" ${u.can_use_attendance !== false ? 'checked' : ''}><span>出欠可</span></label>
                    </div>
                </div>
                <div class="flex items-center space-x-2 shrink-0">
                    ${!isDummy ? `<button onclick="forceResetPassword('${u.email}')" class="text-xs bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded shadow">PWリセット送信</button>` : ''}
                    ${u.email !== currentUser.email ? `<button onclick="deleteAdminUser('${u.email}')" class="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded shadow">削除</button>` : ''}
                </div>
            </div>
                <div class="flex flex-col md:flex-row md:items-start justify-between gap-2">
                    <div class="flex-grow">
                        <div class="text-xs font-bold text-gray-500 mb-1">所属グループ:</div>
                        <div id="group-container-${i}">${groupSelectHtml}</div>
                    </div>
                    <div class="flex-grow mt-2 md:mt-0 border-t md:border-t-0 md:border-l border-gray-200 pt-2 md:pt-0 md:pl-4">
                        <div class="text-xs font-bold text-gray-500 mb-1">代行権限 (他メンバーの出欠を代理で入力できる権限):</div>
                        <details class="text-xs border p-2 bg-gray-50 rounded shadow-inner">
                            <summary class="cursor-pointer text-gray-700 font-bold">代行入力できるメンバーを選択 (複数可)</summary>
                            <div class="flex flex-wrap mt-2 max-h-32 overflow-y-auto border-t border-gray-200 pt-2">${delegationCheckboxes || '<span class="text-gray-400">他のメンバーがいません</span>'}</div>
                        </details>
                    </div>
                </div>
            </div>
            `;
        }).join('');
    
        allowedListEl.innerHTML = usersHtml;
    
        const masterListEl = document.getElementById('admin-master-list');
        if (masterListEl) {
            masterListEl.innerHTML = attributeMasterHtml + categoryMasterHtml + groupMasterHtml + locationMasterHtml;
        }
    
        // 2. 申請待ち一覧の取得
        const { data: requestsData } = await supabaseClient.from('signup_requests').select('*').eq('status', 'pending').order('created_at', { ascending: false });
        const requestsListEl = document.getElementById('signup-requests-list');
        if (!requestsData || requestsData.length === 0) {
            requestsListEl.innerHTML = '<p class="text-gray-500 text-sm">現在、承認待ちの申請はありません。</p>';
        } else {
            requestsListEl.innerHTML = requestsData.map(r => `
                <div class="p-3 bg-white border rounded shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                        <div class="font-bold">${r.parent_name} <span class="text-sm font-normal text-gray-600">様 (選手: ${r.player_name})</span></div>
                        <div class="text-sm text-gray-500">${r.email}</div>
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="approveRequest('${r.id}', '${r.email}')" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-bold shadow">承認</button>
                        <button onclick="rejectRequest('${r.id}')" class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded text-sm shadow">拒否</button>
                    </div>
                </div>
            `).join('');
        }
    } finally {
        hideLoading();
    }
}

async function saveAllAdminUsers() {
    const cards = document.querySelectorAll('.user-admin-card');
    if (cards.length === 0) return;

    if (!confirm('全メンバーの設定を一括保存しますか？')) return;

    showLoading('全メンバー設定を保存中...');
    try {
        const userUpdates = [];
        const groupInserts = [];
        const emailsToSave = [];
        
        cards.forEach(card => {
            const oldEmail = card.getAttribute('data-email');
            const index = card.getAttribute('data-index');
            const oldRole = card.getAttribute('data-old-role');
            
            const emailEl = document.getElementById(`edit-email-${index}`);
            const nameEl = document.getElementById(`edit-name-${index}`);
            const attrEl = document.getElementById(`edit-attribute-${index}`);
            const roleEl = document.getElementById(`edit-role-${index}`);
            const useDispatchEl = document.getElementById(`edit-use-dispatch-${index}`);
            const useDashboardEl = document.getElementById(`edit-use-dashboard-${index}`);
            const useAttendanceEl = document.getElementById(`edit-use-attendance-${index}`);
            
            const newEmail = emailEl.disabled ? oldEmail : emailEl.value.trim();
            const newName = nameEl.value.trim();
            const newAttributeId = attrEl ? (attrEl.value || null) : null;
            const newRole = roleEl.disabled ? oldRole : roleEl.value;
            const canUseDispatch = useDispatchEl ? useDispatchEl.checked : true;
            const canUseDashboard = useDashboardEl ? useDashboardEl.checked : true;
            const canUseAttendance = useAttendanceEl ? useAttendanceEl.checked : true;

            if (!newEmail) {
                throw new Error('メールアドレスが空のレコードがあります。');
            }
            
            emailsToSave.push(oldEmail);
            
            const updatePayload = {
                email: newEmail,
                name: newName,
                attribute_id: newAttributeId,
                role: newRole,
                can_use_dispatch: canUseDispatch,
                can_use_dashboard: canUseDashboard,
                can_use_attendance: canUseAttendance
            };
            userUpdates.push({ oldEmail, updatePayload });

            const groupSelectEl = document.getElementById(`edit-group-${index}`);
            const selectedGroupId = groupSelectEl ? groupSelectEl.value : '';
            if (selectedGroupId) {
                groupInserts.push({ user_email: newEmail, group_id: selectedGroupId });
            }

            const delegationCbs = document.querySelectorAll(`input[name="edit-delegation-${index}"]:checked`);
            const newDelegations = Array.from(delegationCbs).map(cb => cb.value);
            if (oldEmail !== newEmail && window.adminDelegations[oldEmail]) {
                delete window.adminDelegations[oldEmail];
            }
            window.adminDelegations[newEmail] = newDelegations;
        });

        // 1. ユーザー情報の更新
        const userPromises = userUpdates.map(u => {
            return supabaseClient.from('app_users').update(u.updatePayload).eq('email', u.oldEmail);
        });
        const userResults = await Promise.all(userPromises);
        for (const res of userResults) {
            if (res.error) throw res.error;
        }

        // 2. 所属グループの更新
        const { error: delErr } = await supabaseClient.from('user_groups').delete().in('user_email', emailsToSave);
        if (delErr) throw delErr;

        if (groupInserts.length > 0) {
            const { error: insErr } = await supabaseClient.from('user_groups').insert(groupInserts);
            if (insErr) throw insErr;
        }

        // 3. 代行権限の更新
        const { error: delgErr } = await supabaseClient.from('master_data').upsert({ key: 'ATTENDANCE_DELEGATIONS', data: window.adminDelegations });
        if (delgErr) throw delgErr;

        await logAction('UPDATE_USERS_ALL', '全メンバーの設定を一括更新しました');
        alert('全メンバーの設定を一括保存しました');
        await loadAdminUsersData();
    } catch (err) {
        console.error(err);
        alert('保存中にエラーが発生しました: ' + (err.message === 'Load failed' || err.message === 'Failed to fetch' ? '通信に失敗しました。' : err.message));
    } finally {
        hideLoading();
    }
}

window.forceResetPassword = async function(email) {
    if (!confirm(`${email} 宛にパスワード再設定メールを送信し、強制的にパスワードをリセットさせますか？`)) return;
    
    showLoading('パスワード再設定メール送信中...');
    try {
        const { error } = await supabaseClient.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin });
        if (error) { alert("送信失敗: " + error.message); } 
        else { alert("パスワード再設定メールを送信しました。"); }
    } catch (err) {
        console.error(err);
    } finally {
        hideLoading();
    }
};

window.adminAddUser = async function() {
    const email = document.getElementById('admin-add-email').value.trim();
    const role = document.getElementById('admin-add-role').value;
    if (!email) return;
    showLoading('ユーザー追加処理中...');
    try {
        await supabaseClient.from('app_users').insert([{ email, role }]);
        await logAction('ADD_USER', `ユーザー「${email}」を追加しました`);
        document.getElementById('admin-add-email').value = '';
        await loadAdminUsersData();
    } catch (err) {
        console.error(err);
        alert('追加エラー: ' + (err.message === 'Load failed' || err.message === 'Failed to fetch' ? '通信に失敗しました。' : err.message));
    } finally {
        hideLoading();
    }
};

window.adminAddDummyUser = async function() {
    const name = prompt('追加する代行専用メンバーの「氏名」を入力してください。\n（※ログインはできず、他のメンバーからの代行入力専用アカウントとなります）');
    if (!name || name.trim() === '') return;
    
    const dummyEmail = `dummy_${Date.now()}@local.dummy`;
    showLoading('代行専用メンバー追加処理中...');
    try {
        await supabaseClient.from('app_users').insert([{ email: dummyEmail, name: name.trim(), role: 'user' }]);
        await logAction('ADD_DUMMY_USER', `代行専用メンバー「${name.trim()}」を追加しました`);
        await loadAdminUsersData();
    } catch (err) {
        console.error(err);
        alert('追加エラー: ' + (err.message === 'Load failed' || err.message === 'Failed to fetch' ? '通信に失敗しました。' : err.message));
    } finally {
        hideLoading();
    }
};

window.deleteAdminUser = async function(email) {
    if (!confirm(`${email} のアクセス許可を取り消しますか？`)) return;
    showLoading('ユーザー削除処理中...');
    try {
        await supabaseClient.from('app_users').delete().eq('email', email);
        await logAction('DELETE_USER', `ユーザー「${email}」を削除しました`);
        await loadAdminUsersData();
    } catch (err) {
        console.error(err);
        alert('削除エラー: ' + (err.message === 'Load failed' || err.message === 'Failed to fetch' ? '通信に失敗しました。' : err.message));
    } finally {
        hideLoading();
    }
};

window.saveNewCategoryAdmin = async function() {
    const name = document.getElementById('admin-new-category-name').value.trim();
    const color = document.getElementById('admin-new-category-color')?.value || '#bfdbfe';
    if (!name) return alert('カテゴリ名を入力してください');
    showLoading('カテゴリ追加中...');
    try {
        const { error } = await supabaseClient.from('event_categories').insert([{ name, color }]);
        if (error) throw error;
        await loadAdminUsersData();
    } catch (e) { alert('追加エラー: ' + (e.message === 'Load failed' || e.message === 'Failed to fetch' ? '通信に失敗しました。' : e.message)); } finally { hideLoading(); }
};

window.deleteCategoryAdmin = async function(id) {
    if (!confirm('このカテゴリを削除しますか？\n※既存のイベントに設定されているカテゴリ名には影響しませんが、新規作成・編集時に選択できなくなります。')) return;
    showLoading('カテゴリ削除中...');
    try {
        const { error } = await supabaseClient.from('event_categories').delete().eq('id', id);
        if (error) throw error;
        await loadAdminUsersData();
    } catch (e) { alert('削除エラー: ' + (e.message === 'Load failed' || e.message === 'Failed to fetch' ? '通信に失敗しました。' : e.message)); } finally { hideLoading(); }
};

window.renameCategoryAdmin = async function(id, currentName) {
    const newName = prompt('新しいカテゴリ名を入力してください:', currentName);
    if (!newName || newName.trim() === '' || newName === currentName) return;
    showLoading('カテゴリ名称変更中...');
    try {
        const { error } = await supabaseClient.from('event_categories').update({ name: newName.trim() }).eq('id', id);
        if (error) throw error;
        await loadAdminUsersData();
    } catch (e) { alert('変更エラー: ' + (e.message === 'Load failed' || e.message === 'Failed to fetch' ? '通信に失敗しました。' : e.message)); } finally { hideLoading(); }
};

window.updateCategoryColorAdmin = async function(id, color) {
    showLoading('カテゴリ色変更中...');
    try {
        const { error } = await supabaseClient.from('event_categories').update({ color }).eq('id', id);
        if (error) throw error;
        await loadAdminUsersData();
    } catch (e) { alert('変更エラー: ' + (e.message === 'Load failed' || e.message === 'Failed to fetch' ? '通信に失敗しました。' : e.message)); } finally { hideLoading(); }
};

window.updateGroupColorAdmin = async function(id, color) {
    showLoading('グループ色変更中...');
    try {
        const { error } = await supabaseClient.from('groups').update({ color }).eq('id', id);
        if (error) throw error;
        await loadAdminUsersData();
    } catch (e) { alert('色変更エラー: ' + (e.message === 'Load failed' || e.message === 'Failed to fetch' ? '通信に失敗しました。' : e.message)); } finally { hideLoading(); }
};

window.saveNewGroupAdmin = async function() {
    const name = document.getElementById('admin-new-group-name').value.trim();
    const color = document.getElementById('admin-new-group-color')?.value || '#d1fae5';
    if (!name) return alert('グループ名を入力してください');
    showLoading('グループ追加中...');
    try {
        const { error } = await supabaseClient.from('groups').insert([{ name, color }]);
        if (error) throw error;
        await loadAdminUsersData();
    } catch (e) { alert('追加エラー: ' + (e.message === 'Load failed' || e.message === 'Failed to fetch' ? '通信に失敗しました。' : e.message)); } finally { hideLoading(); }
};

window.deleteGroupAdmin = async function(id) {
    if (!confirm('このグループを削除しますか？\n※関連する出欠データやメンバー設定にも影響が出る可能性があります。')) return;
    showLoading('グループ削除中...');
    try {
        const { error } = await supabaseClient.from('groups').delete().eq('id', id);
        if (error) throw error;
        await loadAdminUsersData();
    } catch (e) { alert('削除エラー: ' + (e.message === 'Load failed' || e.message === 'Failed to fetch' ? '通信に失敗しました。' : e.message)); } finally { hideLoading(); }
};

window.renameGroupAdmin = async function(id, currentName) {
    const newName = prompt('新しいグループ名を入力してください:', currentName);
    if (!newName || newName.trim() === '' || newName === currentName) return;
    showLoading('グループ名称変更中...');
    try {
        const { error } = await supabaseClient.from('groups').update({ name: newName.trim() }).eq('id', id);
        if (error) throw error;
        await loadAdminUsersData();
    } catch (e) { alert('変更エラー: ' + (e.message === 'Load failed' || e.message === 'Failed to fetch' ? '通信に失敗しました。' : e.message)); } finally { hideLoading(); }
};

window.saveNewLocationAdmin = async function() {
    const name = document.getElementById('admin-new-location-name').value.trim();
    const url = document.getElementById('admin-new-location-url').value.trim();
    if (!name) return alert('場所名を入力してください');
    showLoading('場所追加中...');
    try {
        const { error } = await supabaseClient.from('event_locations').insert([{ name, url: url || null }]);
        if (error) throw error;
        await loadAdminUsersData();
    } catch (e) {
        alert('追加エラー: ' + (e.message === 'Load failed' || e.message === 'Failed to fetch' ? '通信に失敗しました。' : e.message));
    } finally {
        hideLoading();
    }
};

window.deleteLocationAdmin = async function(id) {
    if (!confirm('この場所をマスタから削除しますか？\n※既存の予定データ内の場所テキスト自体は削除されません。')) return;
    showLoading('場所削除中...');
    try {
        const { error } = await supabaseClient.from('event_locations').delete().eq('id', id);
        if (error) throw error;
        await loadAdminUsersData();
    } catch (e) {
        alert('削除エラー: ' + (e.message === 'Load failed' || e.message === 'Failed to fetch' ? '通信に失敗しました。' : e.message));
    } finally {
        hideLoading();
    }
};

window.renameLocationAdmin = async function(id, currentName, currentUrl) {
    const newName = prompt('新しい場所名を入力してください:', currentName);
    if (newName === null) return;
    const newUrl = prompt('新しいURLを入力してください (空にする場合はそのまま確定):', currentUrl);
    if (newUrl === null) return;
    
    if (newName.trim() === '' && newUrl.trim() === '') return;
    
    showLoading('場所マスタ更新中...');
    try {
        const { error } = await supabaseClient.from('event_locations').update({
            name: newName.trim() || currentName,
            url: newUrl.trim() || null
        }).eq('id', id);
        if (error) throw error;
        await loadAdminUsersData();
    } catch (e) {
        alert('更新エラー: ' + (e.message === 'Load failed' || e.message === 'Failed to fetch' ? '通信に失敗しました。' : e.message));
    } finally {
        hideLoading();
    }
};

window.saveNewUserAttributeAdmin = async function() {
    const name = document.getElementById('admin-new-attribute-name').value.trim();
    if (!name) return alert('属性名を入力してください');
    showLoading('属性追加中...');
    try {
        const { error } = await supabaseClient.from('user_attributes').insert([{ name }]);
        if (error) throw error;
        await loadAdminUsersData();
    } catch (e) { alert('追加エラー: ' + (e.message === 'Load failed' || e.message === 'Failed to fetch' ? '通信に失敗しました。' : e.message)); } finally { hideLoading(); }
};

window.deleteUserAttributeAdmin = async function(id) {
    if (!confirm('この属性を削除しますか？\n※ユーザーに設定されている属性は解除されます。')) return;
    showLoading('属性削除中...');
    try {
        const { error } = await supabaseClient.from('user_attributes').delete().eq('id', id);
        if (error) throw error;
        await loadAdminUsersData();
    } catch (e) { alert('削除エラー: ' + (e.message === 'Load failed' || e.message === 'Failed to fetch' ? '通信に失敗しました。' : e.message)); } finally { hideLoading(); }
};

window.renameUserAttributeAdmin = async function(id, currentName) {
    const newName = prompt('新しい属性名を入力してください:', currentName);
    if (!newName || newName.trim() === '' || newName === currentName) return;
    showLoading('属性名称変更中...');
    try {
        const { error } = await supabaseClient.from('user_attributes').update({ name: newName.trim() }).eq('id', id);
        if (error) throw error;
        await loadAdminUsersData();
    } catch (e) { alert('変更エラー: ' + (e.message === 'Load failed' || e.message === 'Failed to fetch' ? '通信に失敗しました。' : e.message)); } finally { hideLoading(); }
};

window.approveRequest = async function(id, email) {
    showLoading('申請承認中...');
    try {
        // 申請データを取得して名前を生成
        const { data: reqData } = await supabaseClient.from('signup_requests').select('parent_name, player_name').eq('id', id).single();
        const nameToSave = reqData ? `${reqData.parent_name} (${reqData.player_name})` : '';
        // 許可リストに追加
        await supabaseClient.from('app_users').insert([{ email, role: 'user', name: nameToSave }]);
        // リクエストのステータスを更新
        await supabaseClient.from('signup_requests').update({ status: 'approved' }).eq('id', id);
        await loadAdminUsersData();
    } catch (err) {
        console.error(err);
        alert('承認エラー: ' + (err.message === 'Load failed' || err.message === 'Failed to fetch' ? '通信に失敗しました。' : err.message));
    } finally {
        hideLoading();
    }
};

window.rejectRequest = async function(id) {
    if (!confirm('この申請を拒否しますか？')) return;
    showLoading('申請拒否中...');
    try {
        await supabaseClient.from('signup_requests').update({ status: 'rejected' }).eq('id', id);
        await loadAdminUsersData();
    } catch (err) {
        console.error(err);
        alert('拒否エラー: ' + (err.message === 'Load failed' || err.message === 'Failed to fetch' ? '通信に失敗しました。' : err.message));
    } finally {
        hideLoading();
    }
};

// --- Supabase DB連携モック ---
const db = {
    initMasterData: async () => {
        return withLoading(async () => {
            const { data, error } = await supabaseClient.from('master_data').select('*');
            if (error) throw error;
            localFamilies = [];
            localCars = [];
            if (data) {
                const fam = data.find(r => r.key === 'FAMILIES');
                const cars = data.find(r => r.key === 'CARS');
                if (fam) localFamilies = fam.data || [];
                if (cars) localCars = cars.data || [];
            }
        }, 'マスターデータ初期化中...');
    },
    getAllFamilies: async () => localFamilies,
    getFamily: async (name) => localFamilies.find(f => f.familyName === name),
    addFamily: (family) => { localFamilies.push(family); },
    updateFamily: (family) => {
        const idx = localFamilies.findIndex(f => f.familyName === family.familyName);
        if (idx > -1) localFamilies[idx] = family;
    },
    deleteFamily: (name) => {
        localFamilies = localFamilies.filter(f => f.familyName !== name);
    },
    bulkAddFamilies: (families) => { localFamilies = families; },

    getAllCars: async () => localCars,
    getCar: async (id) => localCars.find(c => c.id === id),
    addCar: (car) => { localCars.push(car); },
    updateCar: (car) => {
        const idx = localCars.findIndex(c => c.id === car.id);
        if (idx > -1) localCars[idx] = car;
    },
    deleteCar: (id) => {
        localCars = localCars.filter(c => c.id !== id);
    },
    bulkAddCars: (cars) => { localCars = cars; },

    syncMaster: async () => { 
        return withLoading(async () => {
            const { error } = await supabaseClient.from('master_data').upsert([
                { key: 'FAMILIES', data: localFamilies },
                { key: 'CARS', data: localCars }
            ]);
            if (error) throw error;
            await logAction('UPDATE_MASTER', '初期データ(または強制)のマスター保存を実行しました');
        }, 'マスターデータ同期中...');
    },

    saveState: async (state, name) => {
        return withLoading(async () => {
            const id = Date.now().toString();
            const { error } = await supabaseClient.from('states').insert({
                id: id,
                name: name,
                created_at: Date.now(),
                state_data: state
            });
            if (error) throw error;
            await logAction('SAVE_DISPATCH', `配車データ「${name}」を保存しました`);
            return true;
        }, '配車状態を保存中...');
    },
    getAllSavedStates: async () => {
        return withLoading(async () => {
            const { data, error } = await supabaseClient.from('states').select('*').order('created_at', { ascending: false });
            if (error) throw error;
            return data.map(d => ({ id: d.id, name: d.name, timestamp: d.created_at, state: d.state_data }));
        }, '配車状態一覧を取得中...');
    },
    getState: async (id) => { 
        return withLoading(async () => {
            const { data, error } = await supabaseClient.from('states').select('*').eq('id', id).single();
            if (error) throw error;
            return data ? { id: data.id, name: data.name, timestamp: data.created_at, state: data.state_data } : null;
        }, '配車状態を取得中...');
    },
    deleteState: async (id) => {
        return withLoading(async () => {
            const { error } = await supabaseClient.from('states').delete().eq('id', id);
            if (error) throw error;
            await logAction('DELETE_DISPATCH', `配車データ(ID:${id})を削除しました`);
            return true;
        }, '配車状態を削除中...');
    },

    saveParking: async (parking, name) => {
        return withLoading(async () => {
            const id = 'p' + Date.now() + Math.floor(Math.random() * 1000);
            const { error } = await supabaseClient.from('parkings').insert({
                id: id,
                name: name,
                created_at: Date.now(),
                parking_data: parking
            });
            if (error) throw error;
            await logAction('SAVE_PARKING', `駐車場データ「${name}」を保存しました`);
            return true;
        }, '駐車場データを保存中...');
    },
    getAllSavedParking: async () => {
        return withLoading(async () => {
            const { data, error } = await supabaseClient.from('parkings').select('*').order('created_at', { ascending: false });
            if (error) throw error;
            return data.map(d => ({ id: d.id, name: d.name, timestamp: d.created_at, parking: d.parking_data }));
        }, '駐車場データ一覧を取得中...');
    },
    getParking: async (id) => { 
        return withLoading(async () => {
            const { data, error } = await supabaseClient.from('parkings').select('*').eq('id', id).single();
            if (error) throw error;
            return data ? { id: data.id, name: data.name, timestamp: data.created_at, parking: data.parking_data } : null;
        }, '駐車場データを取得中...');
    },
    updateParking: async (parkingItem) => {
        return withLoading(async () => {
            const { error } = await supabaseClient.from('parkings').update({
                name: parkingItem.name,
                parking_data: parkingItem.parking
            }).eq('id', parkingItem.id);
            if (error) throw error;
            return true;
        }, '駐車場データを更新中...');
    },
    deleteParking: async (id) => {
        return withLoading(async () => {
            const { error } = await supabaseClient.from('parkings').delete().eq('id', id);
            if (error) throw error;
            await logAction('DELETE_PARKING', `駐車場データ(ID:${id})を削除しました`);
            return true;
        }, '駐車場データを削除中...');
    },

    addParkingMaster: (parking, name) => {
        localParkings.push({ id: 'p' + Date.now() + Math.floor(Math.random() * 1000), name: name, timestamp: Date.now(), parking: parking, isNew: true });
    },
    updateParkingMaster: (parkingItem) => {
        const idx = localParkings.findIndex(p => p.id === parkingItem.id);
        if(idx > -1) {
            localParkings[idx] = parkingItem;
            localParkings[idx].isModified = true;
        }
    },
    deleteParkingMaster: (id) => {
        const p = localParkings.find(x => x.id === id);
        if(p && !p.isNew) deletedParkingIds.add(id);
        localParkings = localParkings.filter(x => x.id !== id);
    },
    
    syncAllMaster: async () => {
        return withLoading(async () => {
            const { error: e1 } = await supabaseClient.from('master_data').upsert([
                { key: 'FAMILIES', data: localFamilies },
                { key: 'CARS', data: localCars }
            ]);
            if (e1) throw e1;

            for (const id of deletedParkingIds) {
                await supabaseClient.from('parkings').delete().eq('id', id);
            }
            deletedParkingIds.clear();

            for (const p of localParkings) {
                if (p.isNew || p.isModified) {
                    const { error: e2 } = await supabaseClient.from('parkings').upsert({
                        id: p.id,
                        name: p.name,
                        created_at: p.timestamp,
                        parking_data: p.parking
                    });
                    if (e2) throw e2;
                    p.isNew = false;
                    p.isModified = false;
                }
            }
            
            await logAction('UPDATE_MASTER', 'マスターデータ(家族・車・駐車場)を一括保存しました');
        }, 'マスターデータ一括同期中...');
    },

    clearDatabase: async () => { 
        return withLoading(async () => {
            localFamilies = []; localCars = []; 
            await supabaseClient.from('master_data').delete().neq('key', '');
            await supabaseClient.from('states').delete().neq('id', '');
            await supabaseClient.from('parkings').delete().neq('id', '');
            await logAction('CLEAR_DB', 'データベースの全リセットを実行しました');
        }, 'データベース初期化中...');
    }
};

// --- デフォルトデータ ---
const DEFAULT_FAMILIES = [
    { familyName: '山田家', order: 1, members: [ { id: 'p1', name: '太郎', type: '選手', isFlagTarget: true, data: { grade: '5年', school: 'A小', other: '', memo: '' } }, { id: 'p2', name: '山田父', type: '保護者', data: { memo: '' } } ] },
    { familyName: '佐藤家', order: 2, members: [ { id: 'p3', name: '次郎', type: '選手', isFlagTarget: true, data: { grade: '5年', school: 'B小', other: '', memo: '' } }, { id: 'p4', name: '佐藤母', type: '保護者', data: { memo: '' } } ] },
    { familyName: 'スタッフ・個人', order: 99, members: [ { id: 'p99', name: '監督', type: 'その他', data: { memo: '' } } ] }
];
const DEFAULT_AVAILABLE_CARS_INFO = [
    { id: 'c1', name: '山田カー', familyName: '山田家', baseCapacity: 6, order: 1 }, 
    { id: 'c2', name: '佐藤カー', familyName: '佐藤家', baseCapacity: 5, order: 2 }
];

// --- 共通変数・状態 ---
let FAMILIES = [];
let AVAILABLE_CARS_INFO = [];
let ALL_PARTICIPANTS_FLAT = [];

let selectedParticipantIds = new Set();
let selectedCarIds = new Set();
let selectedDrivers = new Map();
let selectedLuggage = new Set();
let excludedParticipantIds = new Set();
let participantData = new Map();

let parkingInfo = { groundName: '', designated: { name: '', limit: 0, memo: '' }, other: { name: '', memo: '' } };
let eventInfo = { date: '', name: '', timeline: '', notes: '' };
let currentAssignments = [];
let selectedSwapItems = { car: null, seat: null };
let dispatchMessageTimer = null;
let masterMessageTimer = null;

const LAYOUT_COLUMNS = 3;

// --- DOM Elements ---
const navDispatch = document.getElementById('nav-dispatch');
const navMaster = document.getElementById('nav-master');
const viewDispatch = document.getElementById('view-dispatch');
const viewMaster = document.getElementById('view-master');

const participantListEl = document.getElementById('participant-list');
const carListEl = document.getElementById('car-list');
const exclusionListEl = document.getElementById('exclusion-list');
const resultsEl = document.getElementById('results');
const textOutputEl = document.getElementById('text-output');

const familyListMasterEl = document.getElementById('family-list');
const carListMasterEl = document.getElementById('car-list-master');
const parkingListMasterEl = document.getElementById('parking-list-master');

function updateLayouts() { 
    const resultsSection = document.getElementById('results-section');
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.style.display = 'grid';
        mainContent.style.gap = '1.5rem';
        if (window.innerWidth >= 768) {
            mainContent.style.gridTemplateColumns = `repeat(${LAYOUT_COLUMNS}, minmax(0, 1fr))`;
            if (resultsSection) resultsSection.style.gridColumn = `span ${LAYOUT_COLUMNS}`;
        } else {
            mainContent.style.gridTemplateColumns = 'repeat(1, minmax(0, 1fr))';
            if (resultsSection) resultsSection.style.gridColumn = 'auto';
        }
    }
}

async function reloadDispatchData() {
    FAMILIES = await db.getAllFamilies();
    AVAILABLE_CARS_INFO = await db.getAllCars();
    ALL_PARTICIPANTS_FLAT = FAMILIES.flatMap(f => f.members);
    initializeParticipantData(); 
    renderParticipantList();
    renderCarList();
    renderExclusionList();
    await loadSavedStatesList();
    await loadSavedParkingList();
}

async function fetchAndRenderMasterData() {
    localParkings = await db.getAllSavedParking() || [];
    deletedParkingIds.clear();
    renderFamilies_master();
    loadCars_master();
    loadParking_master();
}

async function loadLogs() {
    const btn = document.getElementById('btn-load-logs');

    // CSVダウンロードボタンの動的追加
    if (btn && !document.getElementById('btn-download-logs-csv')) {
        const dlBtn = document.createElement('button');
        dlBtn.id = 'btn-download-logs-csv';
        dlBtn.className = 'ml-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-bold shadow';
        dlBtn.textContent = 'CSVダウンロード';
        dlBtn.onclick = downloadLogsCsv;
        btn.parentNode.insertBefore(dlBtn, btn.nextSibling);
    }

    // 6ヶ月前のログを削除 (ログローテート)
    try {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        await supabaseClient.from('action_logs').delete().lt('created_at', sixMonthsAgo.toISOString());
    } catch (e) {
        console.error("Log rotation error:", e);
    }

    if (btn) btn.textContent = "読込中...";
    const { data, error } = await supabaseClient
        .from('action_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
        
    if (btn) btn.textContent = "最新を読み込み";
    if (error) {
        console.error("Failed to load logs:", error);
        return;
    }
    
    const list = document.getElementById('log-list');
    if (!list) return;
    if (!data || data.length === 0) {
        list.innerHTML = `<p class="text-gray-500 text-center py-4">ログはありません</p>`;
        return;
    }
    
    list.innerHTML = data.map(log => {
        const dateStr = new Date(log.created_at).toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
        return `
        <div class="border-b border-gray-100 py-2 flex flex-col md:flex-row md:items-center">
            <span class="font-mono text-gray-500 text-xs w-32 shrink-0">${dateStr}</span>
            <span class="text-blue-600 font-semibold text-xs w-28 shrink-0">${log.action_type}</span>
            <span class="flex-grow text-gray-700 truncate pr-2" title="${log.details}">${log.details}</span>
            <span class="text-gray-400 text-xs text-right w-40 shrink-0 truncate" title="${log.user_email}">${log.user_email}</span>
        </div>
        `;
    }).join('');
}

async function downloadLogsCsv() {
    showLoading('ログ取得中...');
    try {
        const { data, error } = await supabaseClient
            .from('action_logs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(10000);
            
        if (error) throw error;
        if (!data || data.length === 0) return alert('ログデータがありません');

        const rows = [['日時', 'アクション', 'ユーザー', '詳細']];
        data.forEach(log => {
            const dateStr = new Date(log.created_at).toLocaleString('ja-JP');
            const escapeCsv = (str) => `"${String(str || '').replace(/"/g, '""')}"`;
            rows.push([
                escapeCsv(dateStr),
                escapeCsv(log.action_type),
                escapeCsv(log.user_email),
                escapeCsv(log.details)
            ]);
        });

        const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
        const blob = new Blob([bom, rows.map(r => r.join(',')).join('\n')], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `action_logs_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    } catch (e) {
        console.error(e);
        alert('CSVの作成に失敗しました: ' + e.message);
    } finally {
        hideLoading();
    }
}

// ==========================================
// View: Dispatch ロジック
// ==========================================
function setupDispatchEventListeners() {
    participantListEl?.addEventListener('change', handleParticipantChange);
    participantListEl?.addEventListener('input', handleParticipantDataInput); 
    participantListEl?.addEventListener('click', handleFamilyCheck); 
    carListEl?.addEventListener('change', handleCarChange);
    exclusionListEl?.addEventListener('change', handleExclusionChange);
    document.getElementById('assign-button')?.addEventListener('click', handleAssignment);
    document.getElementById('dispatch-message-close')?.addEventListener('click', hideDispatchMessage);
    resultsEl?.addEventListener('change', handleSwapCheckboxChange);
    
    document.getElementById('export-state-button')?.addEventListener('click', handleExportState);
    document.getElementById('import-state-input')?.addEventListener('change', handleImportState);
    document.getElementById('show-text-output-button')?.addEventListener('click', () => {
        document.getElementById('text-output-container')?.classList.toggle('hidden');
        updateTextOutput();
    });
    document.getElementById('copy-text-output-button')?.addEventListener('click', handleCopyTextOutput);
    document.getElementById('toggle-details-button')?.addEventListener('click', handleToggleDetails);

    document.getElementById('save-state-db-button')?.addEventListener('click', handleSaveStateToDB);
    document.getElementById('load-state-db-button')?.addEventListener('click', handleLoadStateFromDB);
    document.getElementById('delete-state-db-button')?.addEventListener('click', handleDeleteStateFromDB);

    document.getElementById('save-parking-db-button')?.addEventListener('click', handleSaveParkingToDB);
    document.getElementById('load-parking-db-button')?.addEventListener('click', handleLoadParkingFromDB);
    document.getElementById('delete-parking-db-button')?.addEventListener('click', handleDeleteParkingFromDB);

    document.getElementById('clear-db-button')?.addEventListener('click', handleClearDB);
}

function initializeParticipantData() {
    participantData.clear(); 
    FAMILIES.forEach(family => {
        family.members.forEach(member => {
            const defaultData = { grade: '', school: '', other: '', memo: '', ...(member.data || {}) };
            if (!member.isFlagTarget) { defaultData.grade = ''; defaultData.school = ''; defaultData.other = ''; }
            participantData.set(member.id, defaultData);
        });
    });
}

function renderParticipantList() {
    if (!participantListEl) return;
    participantListEl.innerHTML = '';
    if (FAMILIES.length === 0) return participantListEl.innerHTML = '<p class="text-gray-500">データなし</p>';
    FAMILIES.forEach(family => {
        const details = document.createElement('details'); details.className = 'bg-gray-50 rounded border'; details.open = true;
        const summary = document.createElement('summary'); summary.className = 'p-3 cursor-pointer select-none flex justify-between items-center';
        summary.innerHTML = `<span class="font-semibold">${family.familyName}</span><div class="space-x-1"><button data-family-id="${family.familyName}" data-check-action="check" class="text-xs bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded">全員参加</button><button data-family-id="${family.familyName}" data-check-action="uncheck" class="text-xs bg-gray-400 hover:bg-gray-500 text-white py-1 px-2 rounded">全員不参加</button></div>`;
        const memberList = document.createElement('div'); memberList.className = 'p-3 border-t border-gray-200 space-y-3';
        family.members.forEach(p => {
            const isChecked = selectedParticipantIds.has(p.id);
            const data = participantData.get(p.id) || { grade: '', school: '', other: '', memo: '' };
            let inputsHtml = p.isFlagTarget ? 
                `<input type="text" data-id="${p.id}" data-type="grade" value="${data.grade}" placeholder="学年" class="w-full text-sm p-1 border rounded" ${!isChecked?'disabled':''}>
                 <input type="text" data-id="${p.id}" data-type="school" value="${data.school}" placeholder="学校" class="w-full text-sm p-1 border rounded" ${!isChecked?'disabled':''}>
                 <input type="text" data-id="${p.id}" data-type="other" value="${data.other}" placeholder="その他" class="w-full text-sm p-1 border rounded" ${!isChecked?'disabled':''}>
                 <input type="text" data-id="${p.id}" data-type="memo" value="${data.memo}" placeholder="備考" class="w-full text-sm p-1 border rounded" ${!isChecked?'disabled':''}>` : 
                `<div class="col-span-3"></div><input type="text" data-id="${p.id}" data-type="memo" value="${data.memo}" placeholder="備考" class="w-full text-sm p-1 border rounded" ${!isChecked?'disabled':''}`;
            
            memberList.innerHTML += `<div class="ml-4"><div class="flex items-center"><input type="checkbox" id="p-${p.id}" data-id="${p.id}" data-action="select-participant" class="mr-3 rounded border-gray-300 text-blue-600" ${isChecked?'checked':''}><label for="p-${p.id}">${p.name} (${p.type})</label></div><div id="data-inputs-${p.id}" class="ml-8 mt-1.5 grid grid-cols-4 gap-2 ${isChecked?'':'opacity-50'}">${inputsHtml}</div></div>`;
        });
        details.appendChild(summary); details.appendChild(memberList); participantListEl.appendChild(details);
    });
}

function handleFamilyCheck(e) {
    const btn = e.target.closest('button[data-check-action]'); if(!btn) return; e.preventDefault();
    const shouldCheck = btn.dataset.checkAction === 'check';
    const family = FAMILIES.find(f => f.familyName === btn.dataset.familyId);
    if(!family) return;
    family.members.forEach(m => {
        const cb = document.getElementById(`p-${m.id}`);
        if(cb && cb.checked !== shouldCheck) { cb.checked = shouldCheck; cb.dispatchEvent(new Event('change',{bubbles:true})); }
    });
}

function renderCarList() {
    if (!carListEl) return;
    carListEl.innerHTML = '';
    if (AVAILABLE_CARS_INFO.length === 0) return carListEl.innerHTML = '<p class="text-gray-500">データなし</p>';
    AVAILABLE_CARS_INFO.forEach(car => {
        const family = FAMILIES.find(f => f.familyName === car.familyName);
        const drivers = (family ? family.members : ALL_PARTICIPANTS_FLAT).filter(p => p.type !== '選手' && p.type !== '兄弟');
        const isChecked = selectedCarIds.has(car.id);
        let defId = '';
        if (family) {
            const f = drivers.find(m => m.type === '保護者' && (m.name.includes('父')||m.name.includes('監督')));
            const m = drivers.find(x => x.type === '保護者' && x.name.includes('母'));
            defId = f ? f.id : (m ? m.id : '');
        }
        const dId = selectedDrivers.get(car.id) || defId;
        if(defId && !selectedDrivers.has(car.id)) selectedDrivers.set(car.id, defId);
        const hasLug = selectedLuggage.has(car.id);
        
        carListEl.innerHTML += `<div class="bg-gray-50 rounded border p-3" data-car-id="${car.id}">
            <div class="flex items-center"><input type="checkbox" id="c-${car.id}" data-id="${car.id}" data-action="select-car" class="mr-3 rounded text-blue-600" ${isChecked?'checked':''}><label for="c-${car.id}" class="font-semibold">${car.name} (定員${car.baseCapacity}名)</label></div>
            <div id="car-options-${car.id}" class="ml-8 mt-3 space-y-3 ${isChecked?'':'hidden'}">
                <select id="driver-${car.id}" data-action="select-driver" class="w-full p-2 border rounded text-sm"><option value="">ドライバー選択...</option>${drivers.map(p=>`<option value="${p.id}" ${dId===p.id?'selected':''}>${p.name}</option>`).join('')}</select>
                <label class="flex items-center"><input type="checkbox" data-action="select-luggage" class="mr-2" ${hasLug?'checked':''}>荷物あり(2名制限)</label>
            </div></div>`;
    });
}

function renderExclusionList() {
    if (!exclusionListEl) return;
    exclusionListEl.innerHTML = '';
    const parts = ALL_PARTICIPANTS_FLAT.filter(p => selectedParticipantIds.has(p.id));
    if(parts.length===0) return exclusionListEl.innerHTML='<p class="text-gray-500 text-sm">参加者を選択してください</p>';
    parts.forEach(p => {
        exclusionListEl.innerHTML += `<div class="flex items-center"><input type="checkbox" id="ex-${p.id}" data-id="${p.id}" data-action="exclude-participant" class="mr-3" ${excludedParticipantIds.has(p.id)?'checked':''}><label for="ex-${p.id}">${p.name} (${p.type})</label></div>`;
    });
}

function handleParticipantChange(e) { 
    const t = e.target; if(t.dataset.action==='select-participant') {
        const id=t.dataset.id, el=document.getElementById(`data-inputs-${id}`);
        if(t.checked){ selectedParticipantIds.add(id); if(el){el.classList.remove('opacity-50'); el.querySelectorAll('input').forEach(i=>i.disabled=false);} }
        else { selectedParticipantIds.delete(id); excludedParticipantIds.delete(id); if(el){el.classList.add('opacity-50'); el.querySelectorAll('input').forEach(i=>i.disabled=true);} }
        renderExclusionList();
    }
}
function handleParticipantDataInput(e) { const t=e.target; if(t.dataset.type){ const d=participantData.get(t.dataset.id); d[t.dataset.type]=t.value; participantData.set(t.dataset.id,d); } }
function handleCarChange(e) {
    const t=e.target, cid=t.closest('[data-car-id]')?.dataset.carId; if(!cid) return;
    if(t.dataset.action==='select-car'){ if(t.checked){selectedCarIds.add(cid); document.getElementById(`car-options-${cid}`).classList.remove('hidden');}else{selectedCarIds.delete(cid); selectedLuggage.delete(cid); document.getElementById(`car-options-${cid}`).classList.add('hidden');} }
    else if(t.dataset.action==='select-driver'){ if(t.value) selectedDrivers.set(cid,t.value); else selectedDrivers.delete(cid); }
    else if(t.dataset.action==='select-luggage'){ if(t.checked) selectedLuggage.add(cid); else selectedLuggage.delete(cid); }
}
function handleExclusionChange(e) { const t=e.target; if(t.dataset.action==='exclude-participant'){ if(t.checked) excludedParticipantIds.add(t.dataset.id); else excludedParticipantIds.delete(t.dataset.id); } }

function handleAssignment() {
    if (selectedCarIds.size === 0) return showDispatchMessage('車を選択してください', 'error');
    
    eventInfo = { 
        date: document.getElementById('event-date')?.value || '', 
        name: document.getElementById('event-name')?.value || '', 
        timeline: document.getElementById('event-timeline')?.value || '', 
        notes: document.getElementById('event-notes')?.value || '' 
    };
    parkingInfo = { 
        groundName: document.getElementById('ground-name')?.value || '', 
        designated: { 
            name: document.getElementById('parking-designated-name')?.value || '指定駐車場', 
            limit: parseInt(document.getElementById('parking-designated-limit')?.value) || 999, 
            memo: document.getElementById('parking-designated-memo')?.value || '' 
        }, 
        other: { 
            name: document.getElementById('parking-other-name')?.value || '指定以外', 
            memo: document.getElementById('parking-other-memo')?.value || '' 
        } 
    };
    
    let isKeep = false;
    if (currentAssignments && currentAssignments.length > 0 && currentAssignments.some(c => c.id !== 'excluded-car')) {
        if (confirm("すでに配車結果が存在します。\n現在の配車状態を【維持】して、追加・変更分のみを反映しますか？\n（「キャンセル」を選ぶと、全てリセットして最初からやり直すか確認します）")) {
            isKeep = true;
        } else {
            if (!confirm("現在の状態を【全てリセット】して、最初から割り当てをやり直しますか？\n（キャンセルを選ぶと処理を中断します）")) {
                return;
            }
        }
    }

    let errs=[], dMap=new Map(), cData=[];
    const parts = ALL_PARTICIPANTS_FLAT.filter(p=>selectedParticipantIds.has(p.id)).map(p=>{
        const f=FAMILIES.find(f=>f.members.some(m=>m.id===p.id)), cd=participantData.get(p.id) || {};
        return {...p, grade:cd.grade, school:cd.school, other:cd.other, memo:cd.memo, familyName:f?f.familyName:null};
    });
    
    selectedCarIds.forEach(cid => {
        const did=selectedDrivers.get(cid), cinfo=AVAILABLE_CARS_INFO.find(c=>c.id===cid); if(!cinfo) return;
        if(!did) return errs.push(`${cinfo.name}のドライバー未選択`);
        const d=parts.find(p=>p.id===did); if(!d) return errs.push(`${cinfo.name}のドライバーが参加者にいません`);
        dMap.set(cid,d);
        const hL=selectedLuggage.has(cid);
        cData.push({id:cid, name:cinfo.name, familyName:cinfo.familyName, baseCapacity:hL?2:cinfo.baseCapacity, driverId:did, capacity:hL?1:cinfo.baseCapacity-1, hasLuggage:hL});
    });
    if(errs.length>0) return showDispatchMessage(errs.join('<br>'), 'error');
    
    const dIds = new Set(Array.from(dMap.values()).map(d=>d.id));
    let exPs = parts.filter(p=>excludedParticipantIds.has(p.id) && !dIds.has(p.id));
    
    let ass = [];
    
    if (isKeep) {
        cData.forEach(c => {
            let oldCar = currentAssignments.find(oc => oc.id === c.id);
            let keepMembers = [];
            if (oldCar) {
                keepMembers = oldCar.members.filter(m => {
                    if (!m) return false;
                    let isSelected = parts.some(p => p.id === m.id);
                    let isExcluded = excludedParticipantIds.has(m.id);
                    let isDriver = dIds.has(m.id);
                    return isSelected && !isExcluded && !isDriver;
                });
                if (keepMembers.length > c.capacity) keepMembers = keepMembers.slice(0, c.capacity);
            }
            ass.push({...c, driver: dMap.get(c.id), members: keepMembers});
        });
    } else {
        ass = cData.map(c=>({...c, driver:dMap.get(c.id), members:[]}));
    }

    let assignedIds = new Set(dIds);
    ass.forEach(c => c.members.forEach(m => { if(m) assignedIds.add(m.id); }));

    let toAss = parts.filter(p => !assignedIds.has(p.id) && !excludedParticipantIds.has(p.id));
    
    let currentTotalCapacity = ass.reduce((s,c)=>s+c.capacity,0);
    let currentAssignedCount = ass.reduce((s,c)=>s+c.members.length,0);
    
    if(toAss.length > currentTotalCapacity - currentAssignedCount) showDispatchMessage('定員オーバーです','warning'); else hideDispatchMessage();
    
    let rem = [...toAss];
    const pType = {'保護者':1,'兄弟':2,'選手':3,'その他':4};

    ass.forEach(c=>{ 
        if(c.driver&&c.familyName){ 
            let fm=rem.filter(p=>p.familyName===c.familyName).sort((a,b)=>(pType[a.type]||9)-(pType[b.type]||9)); 
            fm.forEach(m=>{
                if(c.members.length<c.capacity){
                    c.members.push(m); 
                    rem=rem.filter(p=>p.id!==m.id);
                }
            }); 
        } 
    });
    
    rem.sort((a,b)=>a.isFlagTarget===b.isFlagTarget ? Math.random()-0.5 : (a.isFlagTarget?-1:1)).forEach(p=>{
        let best=[], ms=0;
        ass.forEach(c=>{ 
            if(c.members.length>=c.capacity) return; 
            let s=c.members.filter(x=>x).reduce((acc,m)=>acc+(m.isFlagTarget&&p.isFlagTarget? (p.grade===m.grade?1:0)+(p.school===m.school?1:0):0),0); 
            if(s>ms){ms=s;best=[c];}else if(s===ms)best.push(c); 
        });
        if(best.length>0) best[Math.floor(Math.random()*best.length)].members.push(p); else {
            let cv=ass.filter(c=>c.members.length<c.capacity);
            if(cv.length>0) cv[0].members.push(p);
        }
    });
    
    ass.forEach(c=>{ 
        c.members=c.members.filter(x=>x); 
        while(c.members.length<c.capacity) c.members.push(null); 
    });
    
    if (isKeep) {
        ass.sort((a, b) => {
            let oldIdxA = currentAssignments.findIndex(oc => oc.id === a.id);
            let oldIdxB = currentAssignments.findIndex(oc => oc.id === b.id);
            if (oldIdxA !== -1 && oldIdxB !== -1) return oldIdxA - oldIdxB;
            if (oldIdxA !== -1) return -1;
            if (oldIdxB !== -1) return 1;
            return b.members.filter(x=>x&&x.type==='選手').length - a.members.filter(x=>x&&x.type==='選手').length;
        });
    } else {
        ass.sort((a,b)=> b.members.filter(x=>x&&x.type==='選手').length - a.members.filter(x=>x&&x.type==='選手').length);
    }
    
    let dCount=0;
    ass.forEach(c=>{ 
        if (isKeep) {
            let oldCar = currentAssignments.find(oc => oc.id === c.id);
            if (oldCar) {
                c.assignedParking = oldCar.assignedParking;
                if (c.assignedParking === 'designated') dCount++;
            } else {
                if(dCount<parkingInfo.designated.limit){c.assignedParking='designated'; dCount++;} else c.assignedParking='other';
            }
        } else {
            if(dCount<parkingInfo.designated.limit){c.assignedParking='designated'; dCount++;} else c.assignedParking='other'; 
        }
    });
    
    ass.push({id:'excluded-car', name:'別便', capacity:999, baseCapacity:999, driver:null, members:exPs, hasLuggage:false, assignedParking:'excluded'});
    
    currentAssignments = ass;
    renderResults(); updateTextOutput();
}

function renderResults() {
    const resultsEl = document.getElementById('results');
    if (!resultsEl) return;
    resultsEl.innerHTML = ''; selectedSwapItems = {car:null, seat:null};
    if(currentAssignments.length===0) return resultsEl.innerHTML='<p class="text-gray-500 bg-white p-4 rounded shadow">結果なし</p>';
    
    if(eventInfo.name||eventInfo.date) resultsEl.innerHTML+=`<h2 class="text-2xl font-bold mb-2">${eventInfo.date} ${eventInfo.name} ${parkingInfo.groundName?`@${parkingInfo.groundName}`:''}</h2>`;
    
    const dc=currentAssignments.filter(c=>c.assignedParking==='designated'), oc=currentAssignments.filter(c=>c.assignedParking==='other'), ec=currentAssignments.filter(c=>c.id==='excluded-car');
    const sec=(type, info, cars) => `<div class="bg-white rounded shadow p-4"><h3 class="font-bold text-lg mb-2">◆${info.name||'別便'} ${type==='designated'&&info.limit<999?`(${info.limit}台)`:''}</h3><p class="text-sm text-gray-600 mb-4 whitespace-pre-line">${info.memo}</p><div class="grid grid-cols-1 md:grid-cols-3 gap-4">${cars.map(createCarCardHtml).join('')}</div></div>`;
    
    resultsEl.innerHTML += sec('designated', parkingInfo.designated, dc);
    resultsEl.innerHTML += sec('other', parkingInfo.other, oc);
    if(ec[0].members.length>0) resultsEl.innerHTML += sec('excluded', {name:'別便',memo:''}, ec);
}

function createCarCardHtml(car) {
    const cardId = `car-result-${car.id}`;
    let headerHtml = '';
    let driverHtml = '';
    let membersHtml = '';
    const swapCheckboxId = `swap-car-${car.id}`;

    if (car.id === 'excluded-car') {
         headerHtml = `<div class="p-4 border-b bg-gray-100 flex-shrink-0"><h4 class="font-bold text-lg text-gray-700">合計: ${car.members.length}名</h4></div>`;
        
        membersHtml = car.members.map((p, i) => { 
            if (!p) return ''; 
            const memo = (participantData.get(p.id)?.memo || '').trim();
            const flags = (p.isFlagTarget && (p.grade || p.school || p.other)) ? [p.grade, p.school, p.other].filter(Boolean).join(' ') : '';
            const id = `seat-${car.id}-${p.id}`;
            return `<li class="p-2 bg-gray-100 rounded shadow-sm flex items-center justify-between">
                        <div class="flex items-center min-w-0">
                            <input type="checkbox" id="${id}" data-swap-type="seat" data-car-id="${car.id}" data-participant-id="${p.id}" data-is-driver="false" data-slot-index="${i}" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                            <label for="${id}" class="flex flex-col min-w-0">
                                <span class="break-words">${p.name} (${p.type})</span>
                                ${memo ? `<span class="text-xs text-gray-500 break-words">[${memo}]</span>` : ''}
                            </label>
                        </div>
                        <span class="text-xs text-gray-400 ml-2 flex-shrink-0">${flags}</span>
                    </li>`;
        }).join('');
        
        const emptySeatId = `seat-excluded-car-empty`;
        membersHtml += `<li class="p-2 bg-gray-50 rounded shadow-sm flex items-center">
                            <input type="checkbox" id="${emptySeatId}" data-swap-type="seat" data-car-id="${car.id}" data-participant-id="empty" data-is-driver="false" data-slot-index="-1" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                            <label for="${emptySeatId}" class="text-gray-400 italic">-- 別便へ移動 --</label>
                        </li>`;

    } else {
        const totalOccupants = (car.driver ? 1 : 0) + car.members.filter(p => p !== null).length;
        const totalVacancy = car.baseCapacity - totalOccupants;
        const passengerVacancy = car.capacity - car.members.filter(p => p !== null).length;
        const luggageInfo = car.hasLuggage ? ' (荷物あり)' : '';
        
        headerHtml = `
            <div class="p-4 border-b flex-shrink-0 flex items-center car-header">
                <input type="checkbox" id="${swapCheckboxId}" data-swap-type="car" data-car-id="${car.id}" class="mr-3 rounded border-gray-400 text-green-600 focus:ring-green-500">
                <div>
                    <h4 class="font-bold text-lg"><label for="${swapCheckboxId}">${car.name} ${luggageInfo}</label></h4>
                    <p class="text-sm font-medium ${passengerVacancy < 0 ? 'text-red-600' : 'text-blue-600'}">
                    総定員 ${car.baseCapacity}名 (空き ${totalVacancy}名)
                    </p>
                </div>
            </div>`;
        
        const d = car.driver;
        const driverId = d ? d.id : 'empty';
        const driverLabel = d ? `[D] ${d.name} (${d.type})` : 'ドライバー空席';
        const driverMemo = (d && (participantData.get(d.id)?.memo || '').trim());
        const driverSeatId = `seat-${car.id}-driver`;
        
        driverHtml = `
        <div id="driver-dropzone-${car.id}" class="p-4 border-b driver-dropzone flex-shrink-0">
            <li class="p-2 ${d ? 'bg-blue-100' : 'bg-red-50'} rounded shadow-sm flex items-center">
                 <input type="checkbox" id="${driverSeatId}" data-swap-type="seat" data-car-id="${car.id}" data-participant-id="${driverId}" data-is-driver="true" data-slot-index="-1" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                 <label for="${driverSeatId}" class="flex flex-col min-w-0 ${d ? 'text-blue-800' : 'text-red-700'}">
                    <span class="font-semibold break-words">${driverLabel}</span>
                    ${driverMemo ? `<span class="text-xs ${d ? 'text-blue-600' : 'text-red-600'} ml-2 break-words">[${driverMemo}]</span>` : ''}
                 </label>
            </li>
        </div>`;
        
        for (let i = 0; i < car.capacity; i++) {
            const p = car.members[i]; 
            
            if (p) {
                const memo = (participantData.get(p.id)?.memo || '').trim();
                const flags = (p.isFlagTarget && (p.grade || p.school || p.other)) ? [p.grade, p.school, p.other].filter(Boolean).join(' ') : '';
                const seatId = `seat-${car.id}-${p.id}`;
                membersHtml += `<li class="p-2 bg-gray-100 rounded shadow-sm flex items-center justify-between">
                                    <div class="flex items-center min-w-0">
                                        <input type="checkbox" id="${seatId}" data-swap-type="seat" data-car-id="${car.id}" data-participant-id="${p.id}" data-is-driver="false" data-slot-index="${i}" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                        <label for="${seatId}" class="flex flex-col min-w-0">
                                            <span class="break-words">${p.name} (${p.type})</span>
                                            ${memo ? `<span class="text-xs text-gray-500 break-words">[${memo}]</span>` : ''}
                                        </label>
                                    </div>
                                    <span class="text-xs text-gray-400 ml-2 flex-shrink-0">${flags}</span>
                                </li>`;
            } else {
                const seatId = `seat-${car.id}-empty-${i}`;
                membersHtml += `<li class="p-2 bg-gray-50 rounded shadow-sm flex items-center">
                                    <input type="checkbox" id="${seatId}" data-swap-type="seat" data-car-id="${car.id}" data-participant-id="empty" data-is-driver="false" data-slot-index="${i}" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                    <label for="${seatId}" class="text-gray-400 italic">-- 空席 --</label>
                                </li>`;
            }
        }
    }
    
    return `<div class="bg-white border rounded-lg shadow-md car-dropzone flex flex-col">${headerHtml}${driverHtml}<ul id="members-dropzone-${car.id}" class="p-4 space-y-2 min-h-[50px] members-dropzone flex-grow overflow-y-auto">${membersHtml}</ul></div>`;
}

function handleSwapCheckboxChange(e) {
    const t=e.target; if(t.type!=='checkbox'||!t.dataset.swapType) return;
    const st=t.dataset.swapType;
    if(selectedSwapItems[st] && selectedSwapItems[st].el===t) { selectedSwapItems[st]=null; t.closest('div').classList.remove('swap-selected'); return; }
    const ni = {carId:t.dataset.carId, pid:t.dataset.participantId, isD:t.dataset.isDriver==='true', idx:parseInt(t.dataset.slotIndex), el:t};
    t.closest('div').classList.add('swap-selected');
    if((st==='car'&&selectedSwapItems.seat)||(st==='seat'&&selectedSwapItems.car)){ t.checked=false; return showDispatchMessage('車と席の混在不可','error'); }
    if(!selectedSwapItems[st]){ selectedSwapItems[st]=ni; return; }
    
    const a=selectedSwapItems[st], b=ni;
    if(st==='car') {
        const ca=currentAssignments.find(x=>x.id===a.carId), cb=currentAssignments.find(x=>x.id===b.carId);
        if (ca && cb) {
            if (ca.assignedParking === cb.assignedParking) {
                const idxA = currentAssignments.indexOf(ca);
                const idxB = currentAssignments.indexOf(cb);
                if (idxA > -1 && idxB > -1) {
                    [currentAssignments[idxA], currentAssignments[idxB]] = [currentAssignments[idxB], currentAssignments[idxA]];
                }
            } else {
                const tp=ca.assignedParking; ca.assignedParking=cb.assignedParking; cb.assignedParking=tp;
            }
        }
    } else {
        const ca=currentAssignments.find(x=>x.id===a.carId), cb=currentAssignments.find(x=>x.id===b.carId);
        const pa=a.pid==='empty'?null:(a.isD?ca.driver:ca.members[a.idx]), pb=b.pid==='empty'?null:(b.isD?cb.driver:cb.members[b.idx]);
        if(a.isD)ca.driver=pb; else if(ca.id!=='excluded-car')ca.members[a.idx]=pb; else {ca.members=ca.members.filter(x=>x&&x.id!==pa?.id); if(pb)ca.members.push(pb);}
        if(b.isD)cb.driver=pa; else if(cb.id!=='excluded-car')cb.members[b.idx]=pa; else {cb.members=cb.members.filter(x=>x&&x.id!==pb?.id); if(pa)cb.members.push(pa);}
        
        [ca, cb].forEach(c => {
            if (c.id !== 'excluded-car') {
                c.members = c.members.filter(x => x);
                while (c.members.length < c.capacity) c.members.push(null);
            } else {
                c.members = c.members.filter(x => x);
            }
        });
    }
    renderResults(); updateTextOutput();
}

function updateTextOutput() {
    const textOutputEl = document.getElementById('text-output');
    if (!textOutputEl) return;
    if(currentAssignments.length===0) { textOutputEl.value=''; return; }
    const gn = parkingInfo.groundName?`@${parkingInfo.groundName}`:'';
    let out = [`${eventInfo.date} ${eventInfo.name}${gn}\n`];
    if(eventInfo.timeline) out.push(eventInfo.timeline+'\n');
    const fm=(car)=>`${car.name.replace(/の車|家の車/g,'カー')} (${car.driver?car.driver.name:'未定'}, ${car.members.filter(x=>x).map(p=>(p.type==='選手'?'★':'')+p.name).join(', ')}${car.hasLuggage?', 荷物':''})`;
    
    out.push(`◆${parkingInfo.designated.name}\n${parkingInfo.designated.memo}`);
    currentAssignments.filter(c=>c.assignedParking==='designated').forEach(c=>out.push('・'+fm(c)));
    
    const oc = currentAssignments.filter(c=>c.assignedParking==='other');
    if(oc.length>0){ out.push(`\n◆${parkingInfo.other.name}\n${parkingInfo.other.memo}`); oc.forEach(c=>out.push('・'+fm(c))); }
    
    const ex = currentAssignments.find(c=>c.id==='excluded-car');
    if(ex&&ex.members.length>0){ out.push('\n◆別便'); ex.members.filter(x=>x).forEach(p=>out.push('・'+(p.type==='選手'?'★':'')+p.name)); }
    
    if(eventInfo.notes) out.push('\n◆その他\n'+eventInfo.notes);
    textOutputEl.value = out.join('\n');
}

function handleCopyTextOutput() { 
    const textOutputEl = document.getElementById('text-output');
    if (!textOutputEl) return;
    navigator.clipboard.writeText(textOutputEl.value); 
    showDispatchMessage('コピーしました','success'); 
}
function handleToggleDetails() { const b=document.getElementById('toggle-details-button'), op=b.textContent==='すべて開く'; participantListEl.querySelectorAll('details').forEach(d=>d.open=op); b.textContent=op?'すべて閉じる':'すべて開く'; }

// --- Data Save / Load ---
function getCurrentState() {
    return { selectedParticipantIds:Array.from(selectedParticipantIds), selectedCarIds:Array.from(selectedCarIds), selectedDrivers:Array.from(selectedDrivers.entries()), selectedLuggage:Array.from(selectedLuggage), excludedParticipantIds:Array.from(excludedParticipantIds), participantData:Array.from(participantData.entries()), currentAssignments, parkingInfo, eventInfo };
}
function restoreState(s) {
    selectedParticipantIds=new Set(s.selectedParticipantIds||[]); selectedCarIds=new Set(s.selectedCarIds||[]); selectedDrivers=new Map(s.selectedDrivers||[]); selectedLuggage=new Set(s.selectedLuggage||[]); excludedParticipantIds=new Set(s.excludedParticipantIds||[]); participantData=new Map(s.participantData||[]);
    parkingInfo=s.parkingInfo || {groundName:'', designated:{name:'',limit:0,memo:''}, other:{name:'',memo:''}}; 
    eventInfo=s.eventInfo || {date:'', name:'', timeline:'', notes:''};
    
    if (document.getElementById('event-date')) document.getElementById('event-date').value = eventInfo.date || '';
    if (document.getElementById('event-name')) document.getElementById('event-name').value = eventInfo.name || '';
    if (document.getElementById('event-timeline')) document.getElementById('event-timeline').value = eventInfo.timeline || '';
    if (document.getElementById('event-notes')) document.getElementById('event-notes').value = eventInfo.notes || '';
    
    if (document.getElementById('ground-name')) document.getElementById('ground-name').value = parkingInfo.groundName || '';
    if (document.getElementById('parking-designated-name')) document.getElementById('parking-designated-name').value = parkingInfo.designated?.name || '';
    if (document.getElementById('parking-designated-limit')) document.getElementById('parking-designated-limit').value = parkingInfo.designated?.limit || '';
    if (document.getElementById('parking-designated-memo')) document.getElementById('parking-designated-memo').value = parkingInfo.designated?.memo || '';
    if (document.getElementById('parking-other-name')) document.getElementById('parking-other-name').value = parkingInfo.other?.name || '';
    if (document.getElementById('parking-other-memo')) document.getElementById('parking-other-memo').value = parkingInfo.other?.memo || '';
    
    currentAssignments = s.currentAssignments||[]; renderResults(); updateTextOutput();
}

function handleExportState() {
    const blob = new Blob([JSON.stringify(getCurrentState(),null,2)], {type:'application/json'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'state.json'; a.click();
}
function handleImportState(e) {
    const f=e.target.files[0]; if(!f) return;
    const r=new FileReader(); r.onload=(ev)=>{ restoreState(JSON.parse(ev.target.result)); renderParticipantList(); renderCarList(); renderExclusionList(); }; r.readAsText(f);
}

async function handleSaveStateToDB() {
    const selectEl = document.getElementById('saved-state-select');
    const selectedId = selectEl.value;
    
    let nameToSave = `${document.getElementById('event-date').value}_${document.getElementById('event-name').value}`;
    let isOverwrite = false;
    let targetIdToOverwrite = null;

    if (selectedId) {
        const selectedOption = selectEl.options[selectEl.selectedIndex];
        const confirmOverwrite = confirm(`現在「${selectedOption.text}」が選択されています。\nこのデータに上書き保存しますか？\n（「キャンセル」を選ぶと新規保存になります）`);
        
        if (confirmOverwrite) {
            isOverwrite = true;
            nameToSave = selectedOption.text;
            targetIdToOverwrite = selectedId;
        }
    }

    if (!isOverwrite) {
        const promptName = prompt("保存名", nameToSave);
        if (!promptName) return;
        nameToSave = promptName;
    }

    try {
        if (isOverwrite && targetIdToOverwrite) {
            await db.deleteState(targetIdToOverwrite);
        }
        await db.saveState(getCurrentState(), nameToSave); 
        await loadSavedStatesList(); 
        
        const newSelectEl = document.getElementById('saved-state-select');
        for (let i = 0; i < newSelectEl.options.length; i++) {
            if (newSelectEl.options[i].text === nameToSave) {
                newSelectEl.selectedIndex = i;
                break;
            }
        }
        
        showDispatchMessage(isOverwrite ? '上書き保存しました' : '保存しました', 'success');
    } catch (err) {
        showDispatchMessage('保存に失敗しました', 'error');
    }
}

async function handleLoadStateFromDB() {
    const id = document.getElementById('saved-state-select').value; if(!id) return;
    const s = await db.getState(id); if(s) { restoreState(s.state); renderParticipantList(); renderCarList(); renderExclusionList(); showDispatchMessage('読込完了','success'); }
}
async function handleDeleteStateFromDB() {
    const id = document.getElementById('saved-state-select').value; if(!id) return;
    await db.deleteState(id); await loadSavedStatesList(); showDispatchMessage('削除完了','success');
}
async function loadSavedStatesList() {
    const st = await db.getAllSavedStates(); const sel = document.getElementById('saved-state-select');
    if (sel) sel.innerHTML = '<option value="">作業一覧...</option>' + st.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
}

async function handleSaveParkingToDB() {
    const selectEl = document.getElementById('saved-parking-select');
    const selectedId = selectEl.value;
    
    let nameToSave = document.getElementById('ground-name').value || "新規駐車場";
    let isOverwrite = false;
    let targetIdToOverwrite = null;

    if (selectedId) {
        const selectedOption = selectEl.options[selectEl.selectedIndex];
        const confirmOverwrite = confirm(`現在「${selectedOption.text}」が選択されています。\nこのデータに上書き保存しますか？\n（「キャンセル」を選ぶと新規保存になります）`);
        
        if (confirmOverwrite) {
            isOverwrite = true;
            nameToSave = selectedOption.text;
            targetIdToOverwrite = selectedId;
        }
    }

    if (!isOverwrite) {
        const promptName = prompt("駐車場保存名", nameToSave);
        if (!promptName) return;
        nameToSave = promptName;
    }

    const p = { groundName: document.getElementById('ground-name').value, designated: { name: document.getElementById('parking-designated-name').value, limit: parseInt(document.getElementById('parking-designated-limit').value), memo: document.getElementById('parking-designated-memo').value }, other: { name: document.getElementById('parking-other-name').value, memo: document.getElementById('parking-other-memo').value } };
    
    try {
        if (isOverwrite && targetIdToOverwrite) {
            await db.deleteParking(targetIdToOverwrite);
        }
        await db.saveParking(p, nameToSave); 
        await loadSavedParkingList(); 
        
        const newSelectEl = document.getElementById('saved-parking-select');
        for (let i = 0; i < newSelectEl.options.length; i++) {
            if (newSelectEl.options[i].text === nameToSave) {
                newSelectEl.selectedIndex = i;
                break;
            }
        }
        
        showDispatchMessage(isOverwrite ? '駐車場を上書き保存しました' : '駐車場を保存しました', 'success');
    } catch(e) {
        showDispatchMessage('保存に失敗しました', 'error');
    }
}

async function handleLoadParkingFromDB() {
    const id = document.getElementById('saved-parking-select').value; if(!id) return;
    const p = await db.getParking(id); if(p) { document.getElementById('ground-name').value=p.parking.groundName; document.getElementById('parking-designated-name').value=p.parking.designated.name; document.getElementById('parking-designated-limit').value=p.parking.designated.limit; document.getElementById('parking-designated-memo').value=p.parking.designated.memo; document.getElementById('parking-other-name').value=p.parking.other.name; document.getElementById('parking-other-memo').value=p.parking.other.memo; showDispatchMessage('駐車場読込完了','success'); }
}
async function handleDeleteParkingFromDB() {
    const id = document.getElementById('saved-parking-select').value; if(!id) return;
    await db.deleteParking(id); await loadSavedParkingList(); showDispatchMessage('駐車場削除完了','success');
}
async function loadSavedParkingList() {
    const pk = await db.getAllSavedParking(); const sel = document.getElementById('saved-parking-select');
    if (sel) sel.innerHTML = '<option value="">駐車場一覧...</option>' + pk.map(p=>`<option value="${p.id}">${p.name}</option>`).join('');
}
async function handleClearDB() {
    if(confirm('全データをリセットしますか？')) { await db.clearDatabase(); location.reload(); }
}

function showDispatchMessage(msg, type='info') {
    const mc = document.getElementById('dispatch-message'); mc.className = `p-4 h-full border rounded-lg ${type==='error'?'bg-red-100 text-red-700':(type==='success'?'bg-green-100 text-green-700':'bg-blue-100 text-blue-700')}`;
    document.getElementById('dispatch-message-text').innerHTML = msg; mc.classList.remove('hidden');
    if(dispatchMessageTimer) clearTimeout(dispatchMessageTimer); dispatchMessageTimer = setTimeout(hideDispatchMessage, 5000);
}
function hideDispatchMessage() { document.getElementById('dispatch-message').classList.add('hidden'); }

// ==========================================
// View: Master ロジック
// ==========================================
function setupMasterEventListeners() {
    // 配車調整マスター画面に「配車調整に戻る」導線を新設
    const viewMasterHeader = document.querySelector('#view-master h2');
    if (viewMasterHeader && !document.getElementById('btn-back-to-dispatch-master')) {
        const backBtn = document.createElement('button');
        backBtn.id = 'btn-back-to-dispatch-master';
        backBtn.className = 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 px-4 py-2 rounded shadow font-bold text-sm mb-4 flex items-center w-fit';
        backBtn.innerHTML = '<span class="mr-1">◀</span> 配車調整に戻る';
        backBtn.addEventListener('click', () => document.getElementById('nav-dispatch')?.click());
        
        viewMasterHeader.parentElement.insertBefore(backBtn, viewMasterHeader);
    }

    document.getElementById('add-family-button')?.addEventListener('click', handleAddFamily_master);
    familyListMasterEl?.addEventListener('click', handleFamilyAction_master);
    familyListMasterEl?.addEventListener('input', handleMemberInput_master);
    familyListMasterEl?.addEventListener('change', handleFamilyChange_master);
    document.getElementById('add-car-button')?.addEventListener('click', handleAddCar_master);
    carListMasterEl?.addEventListener('click', handleCarAction_master);
    carListMasterEl?.addEventListener('input', handleCarInput_master);
    document.getElementById('add-parking-button-master')?.addEventListener('click', handleAddParking_master);
    parkingListMasterEl?.addEventListener('click', handleParkingAction_master);
    parkingListMasterEl?.addEventListener('input', handleParkingInput_master);
    
    document.getElementById('export-master-button')?.addEventListener('click', handleExportMasterData);
    document.getElementById('import-master-input')?.addEventListener('change', handleImportMasterData);
    document.getElementById('master-message-close')?.addEventListener('click', hideMasterMessage);
    
    document.getElementById('save-master-db-button')?.addEventListener('click', handleSaveMasterDB);
}

async function handleSaveMasterDB() {
    const btn = document.getElementById('save-master-db-button');
    try {
        btn.textContent = "保存中...";
        await db.syncAllMaster();
        showMasterMessage('マスターデータをサーバーに保存しました', 'success');
        localParkings = await db.getAllSavedParking() || [];
        loadLogs(); // ログを更新
    } catch (e) {
        showMasterMessage('保存に失敗しました: ' + e.message, 'error');
    } finally {
        btn.textContent = "マスターデータを保存 (更新)";
    }
}

function renderFamilies_master() {
    if (!familyListMasterEl) return;
    familyListMasterEl.innerHTML = '';
    localFamilies.sort((a,b)=>(a.order ?? 99)-(b.order ?? 99)).forEach((f,i)=>{
        const mHtml = f.members.map(m=>`<div class="p-2 border rounded bg-gray-50 member-grid"><input data-id="${m.id}" data-f="name" value="${m.name}" class="col-span-3 md:col-span-1 p-1 border"><select data-id="${m.id}" data-f="type" class="col-span-2 md:col-span-1 p-1 border"><option ${m.type==='選手'?'selected':''}>選手</option><option ${m.type==='保護者'?'selected':''}>保護者</option><option ${m.type==='兄弟'?'selected':''}>兄弟</option><option ${m.type==='その他'?'selected':''}>その他</option></select><input data-id="${m.id}" data-f="data.grade" value="${m.data.grade||''}" placeholder="学年" class="col-span-1 border"><input data-id="${m.id}" data-f="data.school" value="${m.data.school||''}" placeholder="学校" class="col-span-2 md:col-span-1 border"><input data-id="${m.id}" data-f="data.other" value="${m.data.other||''}" placeholder="他" class="col-span-2 md:col-span-1 border"><input data-id="${m.id}" data-f="data.memo" value="${m.data.memo||''}" placeholder="備考" class="col-span-2 md:col-span-1 border"><div class="col-span-3 md:col-span-1 flex items-center justify-between"><label class="text-xs"><input type="checkbox" data-id="${m.id}" data-f="isFlagTarget" ${m.isFlagTarget?'checked':''}>同乗優先</label><button data-action="del-m" data-id="${m.id}" class="bg-red-500 text-white px-2 py-1 rounded text-xs">削</button></div></div>`).join('');
        familyListMasterEl.innerHTML += `<div class="bg-white border rounded shadow" data-fname="${f.familyName}"><div class="family-header"><input data-action="ren-f" value="${f.familyName}" class="font-bold border p-1"><div class="space-x-2"><button data-action="up" class="bg-gray-400 text-white px-2 rounded text-xs">▲</button><button data-action="down" class="bg-gray-400 text-white px-2 rounded text-xs">▼</button><button data-action="del-f" class="bg-red-500 text-white px-2 py-1 rounded text-xs">家族削除</button></div></div><div class="p-3 space-y-2">${mHtml}</div><button data-action="add-m" class="ml-3 mb-3 bg-blue-500 text-white px-2 py-1 rounded text-xs">＋メンバー</button></div>`;
    });
}
function handleAddFamily_master() { const n=prompt("家族名"); if(n){ db.addFamily({familyName:n, order:99, members:[{id:'p'+Date.now(), name:'新規', type:'選手', isFlagTarget:true, data:{}}]}); renderFamilies_master(); } }
async function handleFamilyAction_master(e) {
    const t=e.target, act=t.dataset.action, card=t.closest('[data-fname]'); if(!card) return; const fn=card.dataset.fname;
    if(act==='del-f'){ if(confirm('削除?')){ db.deleteFamily(fn); renderFamilies_master(); } }
    if(act==='add-m'){ const f=await db.getFamily(fn); f.members.push({id:'p'+Date.now(), name:'新規', type:'保護者', isFlagTarget:false, data:{}}); db.updateFamily(f); renderFamilies_master(); }
    if(act==='del-m'){ const f=await db.getFamily(fn); f.members=f.members.filter(m=>m.id!==t.dataset.id); db.updateFamily(f); renderFamilies_master(); }
    if(act==='up'||act==='down'){
        localFamilies.sort((a,b)=>(a.order ?? 99)-(b.order ?? 99));
        localFamilies.forEach((f, idx) => { f.order = idx; });
        const i=localFamilies.findIndex(x=>x.familyName===fn), ti=act==='up'?i-1:i+1;
        if(ti>=0&&ti<localFamilies.length){ const tmp=localFamilies[i].order; localFamilies[i].order=localFamilies[ti].order; localFamilies[ti].order=tmp; renderFamilies_master(); }
    }
}

function handleFamilyChange_master(e) {
    const t = e.target, card = t.closest('[data-fname]');
    if (!card) return;
    const oldFn = card.dataset.fname;

    if (t.dataset.action === 'ren-f') {
        const newName = t.value.trim();
        if (newName && newName !== oldFn) {
            const existing = localFamilies.find(f => f.familyName === newName);
            if (existing) {
                alert(`家族名「${newName}」は既に存在します。別の名前を入力してください。`);
                t.value = oldFn;
                return;
            }
            const fam = localFamilies.find(f => f.familyName === oldFn);
            if (fam) {
                fam.familyName = newName;
                card.dataset.fname = newName; 
                
                let carUpdated = false;
                localCars.forEach(c => {
                    if (c.familyName === oldFn) {
                        c.familyName = newName;
                        carUpdated = true;
                    }
                });
                if (carUpdated) loadCars_master();
            }
        } else if (!newName) {
            t.value = oldFn;
        }
    }
}

async function handleMemberInput_master(e) {
    const t=e.target;
    if (t.dataset.action === 'ren-f') return;
    const id=t.dataset.id, f=t.dataset.f, fn=t.closest('[data-fname]').dataset.fname; if(!id||!f) return;
    const fam=await db.getFamily(fn), m=fam.members.find(x=>x.id===id); const v=t.type==='checkbox'?t.checked:t.value;
    if(f.startsWith('data.')) m.data[f.split('.')[1]]=v; else m[f]=v;
    db.updateFamily(fam); 
}

function loadCars_master() {
    if (!carListMasterEl) return;
    carListMasterEl.innerHTML = '';
    localCars.sort((a,b)=>(a.order ?? 99)-(b.order ?? 99)).forEach(c=>{
        carListMasterEl.innerHTML += `<div class="p-3 border rounded bg-gray-50 flex flex-wrap gap-2 items-center" data-cid="${c.id}"><button data-act="up" class="bg-gray-400 text-white px-2 py-1 text-xs">▲</button><button data-act="down" class="bg-gray-400 text-white px-2 py-1 text-xs">▼</button><input data-f="name" value="${c.name}" class="p-1 border text-sm w-32"><input data-f="familyName" value="${c.familyName}" class="p-1 border text-sm w-32"><input type="number" data-f="baseCapacity" value="${c.baseCapacity}" class="p-1 border text-sm w-16"><button data-act="del" class="bg-red-500 text-white px-2 py-1 rounded text-xs">削</button></div>`;
    });
}
function handleAddCar_master() { db.addCar({id:'c'+Date.now(), name:'新規車', familyName:'', baseCapacity:5, order:99}); loadCars_master(); }
function handleCarAction_master(e) {
    const t=e.target, act=t.dataset.act, card=t.closest('[data-cid]'); if(!card) return; const cid=card.dataset.cid;
    if(act==='del'){ db.deleteCar(cid); loadCars_master(); }
    if(act==='up'||act==='down'){
        localCars.sort((a,b)=>(a.order ?? 99)-(b.order ?? 99));
        localCars.forEach((c, idx) => { c.order = idx; });
        const i=localCars.findIndex(x=>x.id===cid), ti=act==='up'?i-1:i+1;
        if(ti>=0&&ti<localCars.length){ const tmp=localCars[i].order; localCars[i].order=localCars[ti].order; localCars[ti].order=tmp; loadCars_master(); }
    }
}
async function handleCarInput_master(e) { const t=e.target, f=t.dataset.f, cid=t.closest('[data-cid]').dataset.cid; if(!f) return; const c=await db.getCar(cid); c[f]=t.type==='number'?parseInt(t.value):t.value; db.updateCar(c); }

function loadParking_master() {
    parkingListMasterEl.innerHTML='';
    localParkings.forEach(p=>{
        parkingListMasterEl.innerHTML += `
        <div class="p-4 border rounded bg-gray-50 text-sm shadow-sm" data-pid="${p.id}">
            <div class="flex justify-between items-center mb-3">
                <div class="flex-1 flex items-center space-x-2">
                    <label class="font-bold text-gray-700">保存名:</label>
                    <input data-f="name" value="${p.name}" class="border p-1.5 rounded w-1/2 font-bold bg-white" placeholder="駐車場データの保存名">
                </div>
                <button data-act="del" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow text-xs">削除</button>
            </div>
            <div class="space-y-3">
                <div>
                    <input data-f="parking.groundName" value="${p.parking.groundName || ''}" placeholder="グラウンド名 (例: 東谷グラウンド)" class="border p-1.5 rounded w-full bg-white font-semibold">
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div class="border p-3 rounded bg-white shadow-sm">
                        <label class="block text-xs font-bold text-blue-800 mb-2 border-b pb-1">指定駐車場</label>
                        <input data-f="parking.designated.name" value="${p.parking.designated.name || ''}" placeholder="名称 (例: SF-A面)" class="border p-1.5 rounded w-full mb-2">
                        <div class="flex items-center space-x-2 mb-2">
                            <span class="text-xs text-gray-600">台数制限:</span>
                            <input type="number" data-f="parking.designated.limit" value="${p.parking.designated.limit || ''}" placeholder="台数" class="border p-1.5 rounded w-24">
                        </div>
                        <textarea data-f="parking.designated.memo" placeholder="備考 (地図URLや注意事項など)" rows="2" class="border p-1.5 rounded w-full">${p.parking.designated.memo || ''}</textarea>
                    </div>
                    <div class="border p-3 rounded bg-white shadow-sm">
                        <label class="block text-xs font-bold text-green-800 mb-2 border-b pb-1">指定以外の駐車場</label>
                        <input data-f="parking.other.name" value="${p.parking.other.name || ''}" placeholder="名称 (例: 丘の上)" class="border p-1.5 rounded w-full mb-2">
                        <textarea data-f="parking.other.memo" placeholder="備考" rows="4" class="border p-1.5 rounded w-full">${p.parking.other.memo || ''}</textarea>
                    </div>
                </div>
            </div>
        </div>`;
    });
}
function handleAddParking_master() { db.addParkingMaster({groundName:'', designated:{name:'',limit:0,memo:''}, other:{name:'',memo:''}}, '新規P'); loadParking_master(); }
function handleParkingAction_master(e) { if(e.target.dataset.act==='del') { db.deleteParkingMaster(e.target.closest('[data-pid]').dataset.pid); loadParking_master(); } }
function handleParkingInput_master(e) {
    const t=e.target, f=t.dataset.f, pid=t.closest('[data-pid]').dataset.pid; if(!f) return;
    const p = localParkings.find(x => x.id === pid); const v=t.type==='number'?parseInt(t.value):t.value;
    if(f==='name') p.name=v; else { const fs=f.split('.'); if(fs.length===2) p[fs[0]][fs[1]]=v; else p[fs[0]][fs[1]][fs[2]]=v; }
    db.updateParkingMaster(p);
}

async function handleExportMasterData() {
    const m = { families: localFamilies, cars: localCars, parking: await db.getAllSavedParking() };
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(m)], {type:'application/json'})); a.download = 'master.json'; a.click();
}
function handleImportMasterData(e) {
    const f=e.target.files[0]; if(!f) return; const r=new FileReader();
    r.onload=(ev)=>{
        const m=JSON.parse(ev.target.result); db.bulkAddFamilies(m.families); db.bulkAddCars(m.cars);
        if(m.parking) {
            localParkings.forEach(p => deletedParkingIds.add(p.id));
            localParkings = [];
            for(let p of m.parking) {
                localParkings.push({
                    id: p.id || 'p' + Date.now() + Math.floor(Math.random() * 1000),
                    name: p.name,
                    timestamp: p.timestamp || Date.now(),
                    parking: p.parking,
                    isNew: true
                });
            }
        }
        renderFamilies_master();
        loadCars_master();
        loadParking_master();
        showMasterMessage('読込完了 (※まだ保存されていません。保存ボタンを押してください)', 'info');
    }; r.readAsText(f);
}

function showMasterMessage(msg, type='info') {
    const mc = document.getElementById('master-message'); mc.className = `p-4 mb-4 border rounded-lg ${type==='error'?'bg-red-100 text-red-700':(type==='success'?'bg-green-100 text-green-700':'bg-blue-100 text-blue-700')}`;
    document.getElementById('master-message-text').innerHTML = msg; mc.classList.remove('hidden');
    if(masterMessageTimer) clearTimeout(masterMessageTimer); masterMessageTimer = setTimeout(hideMasterMessage, 5000);
}
function hideMasterMessage() { document.getElementById('master-message').classList.add('hidden'); }

export { supabaseClient, currentUser, currentUserRole, showLoading, hideLoading, forceHideLoading, logAction, withLoading, goToUsersAdmin, openChangePasswordModal };