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
function showLoading() {
    loadingCount++;
    if (loadingCount === 1) {
        document.getElementById('loading-overlay')?.classList.remove('hidden');
    }
}
function hideLoading() {
    loadingCount--;
    if (loadingCount <= 0) {
        loadingCount = 0;
        document.getElementById('loading-overlay')?.classList.add('hidden');
    }
}

// --- 強制的にローディングを解除する安全装置 ---
function forceHideLoading() {
    loadingCount = 0;
    document.getElementById('loading-overlay')?.classList.add('hidden');
}

// --- ローディングラッパー ---
async function withLoading(asyncFunc) {
    if (!SUPABASE_URL) {
        alert("環境変数 (VITE_SUPABASE_URL) が設定されていません。Vercelの設定を確認してください。");
        return;
    }
    showLoading();
    try {
        const result = await asyncFunc();
        return result;
    } catch (e) {
        console.error('Supabase DB Error:', e);
        forceHideLoading();
        alert('サーバー通信エラー:\n' + e.message);
        throw e;
    } finally {
        hideLoading();
    }
}

// --- 操作ログ記録関数 ---
async function logAction(actionType, details) {
    if (!currentUser) return;
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
document.addEventListener('DOMContentLoaded', () => {
    // UI表示の初期化
    document.documentElement.style.setProperty('--layout-columns', LAYOUT_COLUMNS);
    window.addEventListener('resize', updateLayouts);
    updateLayouts();

    // ログインボタン等のイベント
    document.getElementById('btn-login')?.addEventListener('click', handleLogin);
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

    // ユーザー管理イベント
    document.getElementById('nav-users')?.addEventListener('click', handleNavUsers);
    document.getElementById('btn-admin-add-user')?.addEventListener('click', adminAddUser);
    document.getElementById('btn-reload-users')?.addEventListener('click', loadAdminUsersData);

    // アプリメニューイベント
    document.getElementById('btn-app-dispatch')?.addEventListener('click', () => {
        switchAuthScreen('app-view');
        if (!isAppInitialized) {
            initApp();
        }
    });
    document.getElementById('btn-app-attendance')?.addEventListener('click', () => {
        alert('イベント出欠アプリは現在準備中です。');
    });
    document.getElementById('btn-back-to-menu')?.addEventListener('click', () => {
        switchAuthScreen('app-menu-view');
    });

    // ページ（タブ）が再びアクティブになった際に、まれにローディングが残る問題を解消するための安全装置
    window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && loadingCount > 0) {
            // 一定時間経過後に強制解除
            setTimeout(() => {
                if (loadingCount > 0) {
                    forceHideLoading();
                }
            }, 1000);
        }
    });
});

// 画面切り替えヘルパー関数
function switchAuthScreen(screenId) {
    ['auth-view', 'signup-view', 'password-reset-view', 'password-update-view', 'app-menu-view', 'app-view'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
}

// ログイン状態の監視
if (supabaseClient) {
    supabaseClient.auth.onAuthStateChange(async (event, session) => {
        // パスワードリセット用リンクを踏んで戻ってきた時
        if (event === 'PASSWORD_RECOVERY') {
            switchAuthScreen('password-update-view');
            return;
        }

        if (session) {
            showLoading();
            try {
                currentUser = session.user;
                
                // 管理者権限のチェック
                try {
                    const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve({ data: null }), 8000));
                    const queryPromise = supabaseClient.from('app_users').select('role').eq('email', currentUser.email).single();
                    const { data: userData } = await Promise.race([queryPromise, timeoutPromise]);
                    
                    if (userData) {
                        currentUserRole = userData.role;
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

                // ロールに基づくUI制御
                const navUsers = document.getElementById('nav-users');
                const navMaster = document.getElementById('nav-master');
                const navDispatch = document.getElementById('nav-dispatch');
                const btnAppDispatch = document.getElementById('btn-app-dispatch');
                const btnGotoMaster = document.getElementById('btn-goto-master');
                const clearDbBtn = document.getElementById('clear-db-button');

                if (currentUserRole === 'admin') {
                    navUsers?.classList.remove('hidden');
                    navMaster?.classList.remove('hidden');
                    navDispatch?.classList.remove('hidden');
                    btnAppDispatch?.classList.remove('hidden');
                    btnGotoMaster?.classList.remove('hidden');
                    clearDbBtn?.classList.remove('hidden');
                } else if (currentUserRole === 'leader') {
                    navUsers?.classList.add('hidden');
                    navMaster?.classList.add('hidden');
                    navDispatch?.classList.remove('hidden');
                    btnAppDispatch?.classList.remove('hidden');
                    btnGotoMaster?.classList.add('hidden');
                    clearDbBtn?.classList.add('hidden');
                } else {
                    // 一般ユーザー
                    navUsers?.classList.add('hidden');
                    navMaster?.classList.add('hidden');
                    navDispatch?.classList.add('hidden');
                    btnAppDispatch?.classList.add('hidden');
                    btnGotoMaster?.classList.add('hidden');
                    clearDbBtn?.classList.add('hidden');
                }

                switchAuthScreen('app-menu-view');
                const emailDisplay = document.getElementById('user-email-display');
                if (emailDisplay) emailDisplay.textContent = currentUser.email;
            } finally {
                hideLoading();
            }
        } else {
            currentUser = null;
            if (document.getElementById('password-update-view').classList.contains('hidden')) {
                switchAuthScreen('auth-view');
            }
        }
    });
}

async function handleClearCache(e) {
    if (e && e.preventDefault) e.preventDefault();
    
    if (!confirm("ブラウザに保存されているログイン情報（キャッシュ）をクリアして、ページを再読み込みしますか？\n（動作がおかしい・ログインできない場合にお試しください）")) {
        return;
    }
    
    showLoading();
    try {
        // 通信環境が悪くサインアウト処理がフリーズするのを防ぐため、3秒でタイムアウトさせる
        const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 3000));
        await Promise.race([
            supabaseClient.auth.signOut().catch(() => {}),
            timeoutPromise
        ]);
        
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
    
    isAuthenticating = true;
    showLoading();
    try {
        // 15秒でタイムアウトするPromiseを作成
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("通信がタイムアウトしました。ネットワーク環境を確認するか、時間をおいて再度お試しください。")), 15000)
        );
        
        // Supabaseのログイン処理とタイムアウトを競争させる
        const authPromise = supabaseClient.auth.signInWithPassword({ email, password });
        const { error } = await Promise.race([authPromise, timeoutPromise]);
        
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
        forceHideLoading();
        console.error("Login Error:", err);
        const errDetail = err.message + "\n" + JSON.stringify(err, Object.getOwnPropertyNames(err));
        if (msg) {
            msg.textContent = "通信エラー詳細: " + errDetail;
            msg.classList.remove('hidden');
            msg.classList.add('text-red-500');
        } else {
            alert("通信エラー詳細:\n" + errDetail);
        }
        
        // パスワード間違い等の通常の認証エラー以外の場合（タイムアウトや古いセッションの不整合など）、
        // フリーズの原因となるゴミデータを強制的にクリアする
        if (!err.message || !err.message.toLowerCase().includes("invalid login credentials")) {
            supabaseClient.auth.signOut().catch(() => {});
            // LocalStorage内のSupabase関連キーを強制削除
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('sb-')) {
                    keysToRemove.push(key);
                }
            }
            keysToRemove.forEach(k => localStorage.removeItem(k));
        }
    } finally {
        hideLoading();
        isAuthenticating = false;
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
    showLoading();
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
    
    showLoading();
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
    
    showLoading();
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
    
    showLoading();
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
    showLoading();
    try {
        const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 3000));
        await Promise.race([
            supabaseClient.auth.signOut().catch(() => {}),
            timeoutPromise
        ]);
    } finally {
        hideLoading();
        isAppInitialized = false; // 再ログイン時にデータを再読込させる
    }
}


// --- アプリ初期化 ---
let localFamilies = [];
let localCars = [];
let localParkings = [];
let deletedParkingIds = new Set();

async function initApp() {
    isAppInitialized = true;
    
    // ナビゲーションイベント設定
    navDispatch?.addEventListener('click', async () => {
        viewDispatch?.classList.remove('hidden'); 
        viewMaster?.classList.add('hidden');
        document.getElementById('view-users')?.classList.add('hidden');
        
        navDispatch?.classList.add('text-blue-300'); navDispatch?.classList.remove('text-gray-400');
        navMaster?.classList.remove('text-blue-300'); navMaster?.classList.add('text-gray-400');
        document.getElementById('nav-users')?.classList.remove('text-blue-300');
        await reloadDispatchData();
    });
    navMaster?.addEventListener('click', async () => {
        viewMaster?.classList.remove('hidden'); 
        viewDispatch?.classList.add('hidden');
        document.getElementById('view-users')?.classList.add('hidden');
        
        navMaster?.classList.add('text-blue-300'); navMaster?.classList.remove('text-gray-400');
        navDispatch?.classList.remove('text-blue-300'); navDispatch?.classList.add('text-gray-400');
        document.getElementById('nav-users')?.classList.remove('text-blue-300');
        await fetchAndRenderMasterData();
        loadLogs(); // マスター画面を開いた時にログも読み込む
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
    document.getElementById('nav-users').classList.add('text-blue-300');
    document.getElementById('nav-users').classList.remove('text-gray-400');
    document.getElementById('nav-dispatch').classList.remove('text-blue-300');
    document.getElementById('nav-master').classList.remove('text-blue-300');
    
    await loadAdminUsersData();
}

async function loadAdminUsersData() {
    // 1. 許可済みユーザー一覧の取得
    const { data: usersData } = await supabaseClient.from('app_users').select('*').order('created_at', { ascending: false });
    const allowedListEl = document.getElementById('allowed-users-list');
    allowedListEl.innerHTML = (usersData || []).map((u, i) => `
        <div class="flex flex-col md:flex-row md:items-center justify-between p-3 bg-white border rounded shadow-sm gap-2">
            <div class="flex-grow flex flex-col md:flex-row md:items-center gap-2">
                <input type="email" id="edit-email-${i}" value="${u.email}" class="border p-1 rounded text-sm w-48 font-bold" ${u.email === currentUser.email ? 'disabled' : ''}>
                <select id="edit-role-${i}" class="border p-1 rounded text-sm" ${u.email === currentUser.email ? 'disabled' : ''}>
                    <option value="user" ${u.role === 'user' ? 'selected' : ''}>一般ユーザー</option>
                    <option value="leader" ${u.role === 'leader' ? 'selected' : ''}>リーダー</option>
                    <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>管理者</option>
                </select>
                ${u.email !== currentUser.email ? `<button onclick="updateAdminUser('${u.email}', ${i})" class="text-xs bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded shadow">更新</button>` : '<span class="text-xs text-gray-500 ml-2">※自身は変更不可</span>'}
            </div>
            <div class="flex items-center space-x-2 shrink-0">
                <button onclick="forceResetPassword('${u.email}')" class="text-xs bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded shadow">PWリセット送信</button>
                ${u.email !== currentUser.email ? `<button onclick="deleteAdminUser('${u.email}')" class="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded shadow">削除</button>` : ''}
            </div>
        </div>
    `).join('');

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
}

window.updateAdminUser = async function(oldEmail, index) {
    const newEmail = document.getElementById(`edit-email-${index}`).value.trim();
    const newRole = document.getElementById(`edit-role-${index}`).value;
    
    if (!newEmail) return alert('メールアドレスを入力してください');
    if (!confirm(`${oldEmail} の情報を更新しますか？\n（※アプリのアクセス許可情報の更新であり、SupabaseのログインID自体は変更されません）`)) return;

    showLoading();
    try {
        const { error } = await supabaseClient.from('app_users').update({ email: newEmail, role: newRole }).eq('email', oldEmail);
        if (error) {
            alert('更新失敗: ' + error.message);
        } else {
            alert('更新しました');
            loadAdminUsersData();
        }
    } catch (err) {
        alert('更新処理中にエラーが発生しました。');
    } finally {
        hideLoading();
    }
};

window.forceResetPassword = async function(email) {
    if (!confirm(`${email} 宛にパスワード再設定メールを送信し、強制的にパスワードをリセットさせますか？`)) return;
    
    showLoading();
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
    showLoading();
    try {
        await supabaseClient.from('app_users').insert([{ email, role }]);
        document.getElementById('admin-add-email').value = '';
        loadAdminUsersData();
    } catch (err) {
        console.error(err);
    } finally {
        hideLoading();
    }
};

window.deleteAdminUser = async function(email) {
    if (!confirm(`${email} のアクセス許可を取り消しますか？`)) return;
    showLoading();
    try {
        await supabaseClient.from('app_users').delete().eq('email', email);
        loadAdminUsersData();
    } catch (err) {
        console.error(err);
    } finally {
        hideLoading();
    }
};

window.approveRequest = async function(id, email) {
    showLoading();
    try {
        // 許可リストに追加
        await supabaseClient.from('app_users').insert([{ email, role: 'user' }]);
        // リクエストのステータスを更新
        await supabaseClient.from('signup_requests').update({ status: 'approved' }).eq('id', id);
        loadAdminUsersData();
    } catch (err) {
        console.error(err);
    } finally {
        hideLoading();
    }
};

window.rejectRequest = async function(id) {
    if (!confirm('この申請を拒否しますか？')) return;
    showLoading();
    try {
        await supabaseClient.from('signup_requests').update({ status: 'rejected' }).eq('id', id);
        loadAdminUsersData();
    } catch (err) {
        console.error(err);
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
        });
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
            logAction('UPDATE_MASTER', '初期データ(または強制)のマスター保存を実行しました');
        });
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
            logAction('SAVE_DISPATCH', `配車データ「${name}」を保存しました`);
            return true;
        });
    },
    getAllSavedStates: async () => {
        return withLoading(async () => {
            const { data, error } = await supabaseClient.from('states').select('*').order('created_at', { ascending: false });
            if (error) throw error;
            return data.map(d => ({ id: d.id, name: d.name, timestamp: d.created_at, state: d.state_data }));
        });
    },
    getState: async (id) => { 
        return withLoading(async () => {
            const { data, error } = await supabaseClient.from('states').select('*').eq('id', id).single();
            if (error) throw error;
            return data ? { id: data.id, name: data.name, timestamp: data.created_at, state: data.state_data } : null;
        });
    },
    deleteState: async (id) => {
        return withLoading(async () => {
            const { error } = await supabaseClient.from('states').delete().eq('id', id);
            if (error) throw error;
            logAction('DELETE_DISPATCH', `配車データ(ID:${id})を削除しました`);
            return true;
        });
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
            logAction('SAVE_PARKING', `駐車場データ「${name}」を保存しました`);
            return true;
        });
    },
    getAllSavedParking: async () => {
        return withLoading(async () => {
            const { data, error } = await supabaseClient.from('parkings').select('*').order('created_at', { ascending: false });
            if (error) throw error;
            return data.map(d => ({ id: d.id, name: d.name, timestamp: d.created_at, parking: d.parking_data }));
        });
    },
    getParking: async (id) => { 
        return withLoading(async () => {
            const { data, error } = await supabaseClient.from('parkings').select('*').eq('id', id).single();
            if (error) throw error;
            return data ? { id: data.id, name: data.name, timestamp: data.created_at, parking: data.parking_data } : null;
        });
    },
    updateParking: async (parkingItem) => {
        return withLoading(async () => {
            const { error } = await supabaseClient.from('parkings').update({
                name: parkingItem.name,
                parking_data: parkingItem.parking
            }).eq('id', parkingItem.id);
            if (error) throw error;
            return true;
        });
    },
    deleteParking: async (id) => {
        return withLoading(async () => {
            const { error } = await supabaseClient.from('parkings').delete().eq('id', id);
            if (error) throw error;
            logAction('DELETE_PARKING', `駐車場データ(ID:${id})を削除しました`);
            return true;
        });
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
            
            logAction('UPDATE_MASTER', 'マスターデータ(家族・車・駐車場)を一括保存しました');
        });
    },

    clearDatabase: async () => { 
        return withLoading(async () => {
            localFamilies = []; localCars = []; 
            await supabaseClient.from('master_data').delete().neq('key', '');
            await supabaseClient.from('states').delete().neq('id', '');
            await supabaseClient.from('parkings').delete().neq('id', '');
            logAction('CLEAR_DB', 'データベースの全リセットを実行しました');
        });
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
    if (window.innerWidth >= 768) {
        document.getElementById('main-content').style.gridTemplateColumns = `repeat(${LAYOUT_COLUMNS}, minmax(0, 1fr))`;
        resultsSection.style.gridColumn = `span ${LAYOUT_COLUMNS}`;
    } else {
        document.getElementById('main-content').style.gridTemplateColumns = 'repeat(1, minmax(0, 1fr))';
        resultsSection.style.gridColumn = 'auto';
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
    eventInfo = { date: document.getElementById('event-date').value, name: document.getElementById('event-name').value, timeline: document.getElementById('event-timeline').value, notes: document.getElementById('event-notes').value };
    parkingInfo = { groundName: document.getElementById('ground-name').value, designated: { name: document.getElementById('parking-designated-name').value||'指定駐車場', limit: parseInt(document.getElementById('parking-designated-limit').value)||999, memo: document.getElementById('parking-designated-memo').value }, other: { name: document.getElementById('parking-other-name').value||'指定以外', memo: document.getElementById('parking-other-memo').value } };
    
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
        const f=FAMILIES.find(f=>f.members.some(m=>m.id===p.id)), cd=participantData.get(p.id);
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
    resultsEl.innerHTML = ''; selectedSwapItems = {car:null, seat:null};
    if(currentAssignments.length===0) return resultsEl.innerHTML='<p class="text-gray-500 bg-white p-4 rounded shadow">結果なし</p>';
    
    if(eventInfo.name||eventInfo.date) resultsEl.innerHTML+=`<h2 class="text-2xl font-bold mb-2">${eventInfo.date} ${eventInfo.name} ${parkingInfo.groundName?`@${parkingInfo.groundName}`:''}</h2>`;
    
    const dc=currentAssignments.filter(c=>c.assignedParking==='designated'), oc=currentAssignments.filter(c=>c.assignedParking==='other'), ec=currentAssignments.filter(c=>c.id==='excluded-car');
    const sec=(type, info, cars) => `<div class="bg-white rounded shadow p-4"><h3 class="font-bold text-lg mb-2">◆${info.name||'別便'} ${type==='designated'&&info.limit<999?`(${info.limit}台)`:''}</h3><p class="text-sm text-gray-600 mb-4 whitespace-pre-line">${info.memo}</p><div class="results-grid-layout">${cars.map(createCarCardHtml).join('')}</div></div>`;
    
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
    if(currentAssignments.length===0) return textOutputEl.value='';
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

function handleCopyTextOutput() { navigator.clipboard.writeText(textOutputEl.value); showDispatchMessage('コピーしました','success'); }
function handleToggleDetails() { const b=document.getElementById('toggle-details-button'), op=b.textContent==='すべて開く'; participantListEl.querySelectorAll('details').forEach(d=>d.open=op); b.textContent=op?'すべて閉じる':'すべて開く'; }

// --- Data Save / Load ---
function getCurrentState() {
    return { selectedParticipantIds:Array.from(selectedParticipantIds), selectedCarIds:Array.from(selectedCarIds), selectedDrivers:Array.from(selectedDrivers.entries()), selectedLuggage:Array.from(selectedLuggage), excludedParticipantIds:Array.from(excludedParticipantIds), participantData:Array.from(participantData.entries()), currentAssignments, parkingInfo, eventInfo };
}
function restoreState(s) {
    selectedParticipantIds=new Set(s.selectedParticipantIds||[]); selectedCarIds=new Set(s.selectedCarIds||[]); selectedDrivers=new Map(s.selectedDrivers||[]); selectedLuggage=new Set(s.selectedLuggage||[]); excludedParticipantIds=new Set(s.excludedParticipantIds||[]); participantData=new Map(s.participantData||[]);
    parkingInfo=s.parkingInfo; eventInfo=s.eventInfo;
    document.getElementById('event-date').value=eventInfo.date; document.getElementById('event-name').value=eventInfo.name; document.getElementById('event-timeline').value=eventInfo.timeline; document.getElementById('event-notes').value=eventInfo.notes;
    document.getElementById('ground-name').value=parkingInfo.groundName; document.getElementById('parking-designated-name').value=parkingInfo.designated.name; document.getElementById('parking-designated-limit').value=parkingInfo.designated.limit; document.getElementById('parking-designated-memo').value=parkingInfo.designated.memo; document.getElementById('parking-other-name').value=parkingInfo.other.name; document.getElementById('parking-other-memo').value=parkingInfo.other.memo;
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
    localFamilies.sort((a,b)=>(a.order||99)-(b.order||99)).forEach((f,i)=>{
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
    localCars.sort((a,b)=>(a.order||99)-(b.order||99)).forEach(c=>{
        carListMasterEl.innerHTML += `<div class="p-3 border rounded bg-gray-50 flex flex-wrap gap-2 items-center" data-cid="${c.id}"><button data-act="up" class="bg-gray-400 text-white px-2 py-1 text-xs">▲</button><button data-act="down" class="bg-gray-400 text-white px-2 py-1 text-xs">▼</button><input data-f="name" value="${c.name}" class="p-1 border text-sm w-32"><input data-f="familyName" value="${c.familyName}" class="p-1 border text-sm w-32"><input type="number" data-f="baseCapacity" value="${c.baseCapacity}" class="p-1 border text-sm w-16"><button data-act="del" class="bg-red-500 text-white px-2 py-1 rounded text-xs">削</button></div>`;
    });
}
function handleAddCar_master() { db.addCar({id:'c'+Date.now(), name:'新規車', familyName:'', baseCapacity:5, order:99}); loadCars_master(); }
function handleCarAction_master(e) {
    const t=e.target, act=t.dataset.act, card=t.closest('[data-cid]'); if(!card) return; const cid=card.dataset.cid;
    if(act==='del'){ db.deleteCar(cid); loadCars_master(); }
    if(act==='up'||act==='down'){ const i=localCars.findIndex(x=>x.id===cid), ti=act==='up'?i-1:i+1; if(ti>=0&&ti<localCars.length){ const tmp=localCars[i].order; localCars[i].order=localCars[ti].order; localCars[ti].order=tmp; loadCars_master(); } }
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
    if(f==='name') p.name=v; else { const fs=f.split('.'); if(fs.length===2) p.parking[fs[0]][fs[1]]=v; else p.parking[fs[0]][fs[1]][fs[2]]=v; }
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
