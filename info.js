// ==========================================
// Info (ドキュメント・アンケート・リンク集) モジュール
// ==========================================

import { initSurveyModule, renderSurveyList, openSurveyResponsePage } from './survey.js';

let supabase = null;
let currentAppUser = null;
let currentUserRole = 'user';
let canManageInfo = false;

// 状態管理
let currentTab = 'docs'; // 'docs' | 'surveys' | 'links'
let documentsList = [];
let linksList = [];
let currentDocFilter = 'すべて';
let currentLinkFilter = 'すべて';
let currentSearchQuery = '';

// トップ構成Markdown
let topAnnouncementMarkdown = '';

// ローカルストレージキー
const STORAGE_KEY_DOCS = 'ants_info_documents_v1';
const STORAGE_KEY_LINKS = 'ants_info_links_v1';
const STORAGE_KEY_TOP_MD = 'ants_info_top_md_v1';

// デフォルトのトップ構成Markdown
const DEFAULT_TOP_MD = `## 🐜 Arinko Ants チーム情報 &amp; ドキュメントポータル
本ポータルでは、チーム運営に関する**各種マニュアル（配車・当番・緊急対応）**の閲覧、**合宿・イベント出欠アンケート（日程調整・お弁当注文）**の実施、および**グラウンド地図や公式連盟などの便利リンク集**を一元管理しています。

> [!NOTE]
> - **配車調整マニュアル**や**当番業務の手引き**は「ドキュメント」タブよりいつでも閲覧・ダウンロード可能です。
> - 夏季合宿やイベントの日程調整・注文アンケートは「アンケート」タブから回答できます（ゲスト回答も可能）。
`;

// 初期プリセットデータ: ドキュメント
const DEFAULT_DOCUMENTS = [
    {
        id: 'doc-manual-dispatch',
        title: '配車調整機能 利用者マニュアル',
        category: '配車マニュアル',
        summary: '少年野球チーム「Arinko Ants」の活動におけるイベント配車の自動作成・手動微調整・LINE案内出力までの全体操作マニュアルです。',
        content: `# 配車調整機能 利用者マニュアル

本システムは、少年野球チーム「Arinko Ants（ありんこアントス）」の活動におけるイベント時の配車（メンバーの乗り分け・駐車場の割り当て）を自動的に行い、手動での微調整を経て、LINE等にそのまま貼り付けられる案内テキストを素早く作成・共有するためのシステムです。

> [!TIP]
> 配車作成はイベント前日の夜までに行い、LINE等で保護者グループへ共有してください。

---

## 1. 配車調整の全体フロー

配車作成は、以下のステップで進めます。

1. **イベント・タイムラインの入力**: 日時・相手チーム名・集合場所・タイムラインを入力
2. **グラウンド・駐車場情報の入力**: 目的地グラウンドと指定駐車場の上限台数を入力
3. **参加者・車とドライバーの選択**: 参加する選手・保護者、出す車と運転手をチェック
4. **別便メンバーの指定**: 自車で直接現地へ向かうメンバーを指定
5. **割り当て実行（自動配車）**: ボタン1クリックで家族・学年・台数制限を自動最適化
6. **結果の確認・手動入れ替え調整**: ドラッグ＆ドロップまたはプルダウンで微調整
7. **テキスト出力・LINE等へ共有**: 連絡用テキストを生成してワンクリックコピー

---

## 2. 各セクションの入力と操作方法

### 2.1. イベント情報・タイムライン
- **イベント日**: 例：\`2026/6/14(日)\`
- **イベント名**: 例：\`vs向小金ファイターズ(富士見橋大会A)\`
- **イベントタイムライン**: 集合時間や出発時間などを入力（改行可）
  - *例*:
    - ⭕️東小集合 08:30
    - ⭕️東小出発 08:40
    - ⭕️グランドイン 08:50
    - ⭕️試合開始 10:00

### 2.2. グラウンド・駐車場情報
- **グラウンド名**: 遠征先や会場のグラウンド名
- **指定駐車場の名称 & 台数制限**: 指定枠の上限台数を設定すると、上限を超えた車は自動的に「指定以外（第2駐車場等）」へ割り振られます。
- **備考**: GoogleマップURLや「奥から順に駐車」などの現地ルールを記載できます。

### 2.3. 参加者・車・ドライバー選択
- **参加チェック**: 参加するメンバーにチェックを入れます。学年や学校も考慮されます。
- **車とドライバー**: 当日出動可能な車にチェックを入れ、ドライバーを選択します。
- **荷物車設定**: 道具車の場合「荷物あり (2名制限)」にチェックすると、定員を自動制限します。

### 2.4. 自動配車ルール
- **家族優先**: ドライバーと同じ家族（選手・保護者）が最優先で同乗します。
- **同学年・同学校優先**: 低学年の選手が一人きりにならないよう考慮して割り当てられます。
- **別便指定**: 自車直行のメンバーは配車から除外され「◆別便」枠にまとまります。`,
        files: [],
        created_by: '管理者',
        updated_at: '2026-06-01'
    },
    {
        id: 'doc-emergency-guide',
        title: '緊急時対応・熱中症予防ガイドライン',
        category: 'チーム運営・規約',
        summary: '練習中・試合中の負傷や熱中症発生時の応急手当手順、緊急搬送先リスト、連絡体制に関するガイドラインです。',
        content: `# 緊急時対応・熱中症予防ガイドライン

Arinko Antsでは、選手および指導者・保護者の安全確保を最優先として活動しています。

> [!WARNING]
> 意識障害・激しい痙攣・呼名に反応しない等の症状が見られた場合は、躊躇せず直ちに119番通報を行ってください。

---

## 1. 熱中症予防方針
- **WBGT（暑さ指数）の計測**: 夏季はグラウンド本部にてWBGTを定期計測します。
  - **WBGT 28〜31℃ (厳重警戒)**: 20〜30分おきに日陰での強制給水・塩分補給を実施。
  - **WBGT 31℃以上 (危険)**: 原則として激しい運動を中止または短縮練習に切り替え。
- **氷嚢・冷却タオルの常備**: ベンチ内にクーラーボックス（氷・保冷剤・スポドリ）を常備。

---

## 2. 負傷・体調不良発生時の対応フロー
1. **初期対応**: 直ちにプレーを止め、日陰の涼しい場所またはベンチへ移動。
2. **応急手当 (RICE処置)**:
   - Rest (安静)
   - Ice (冷却)
   - Compression (圧迫)
   - Elevation (挙上)
3. **保護者・責任者への連絡**: 当番保護者より保護者へ状況報告。
4. **救急搬送の判断**: 119番通報時は正確な場所（住所または学校名）を伝達。

---

## 3. 主な救急連絡先
- **流山市消防本部**: 119
- **流山中央病院**: 04-7154-1521
- **千葉県立東葛飾病院**: 04-7152-8111`,
        files: [],
        created_by: 'チーム本部',
        updated_at: '2026-05-10'
    },
    {
        id: 'doc-scorer-guide',
        title: 'スコアラー記入の手引き・基本ルール',
        category: '野球ルール・スコア',
        summary: '公式戦・練習試合における早稲田式スコアブックの記入方法、凡例記号、打撃・走塁判定のポイント解説です。',
        content: `# スコアラー記入の手引き・基本ルール

少年野球の試合記録を正確に残すための基本的なスコアブックの付け方です。

---

## 1. 基本記号一覧
| プレー内容 | 記号 / 記入法 | 備考 |
| :--- | :--- | :--- |
| **単打 (ヒット)** | \`-\` | 1塁方向へ線を引く |
| **二塁打** | \`=\` | 2塁方向へ線を引く |
| **三塁打** | \`≡\` | 3塁方向へ線を引く |
| **本塁打** | \`HR\` | ひし形を一周塗りつぶす |
| **四球 / 死球** | \`B\` / \`DB\` | 1塁へ進塁 |
| **三振** | \`K\` (空振り) / 逆さK (見逃し) | アウトカウント |
| **ゴロ凡打** | \`4-3\` (セカンドゴロ) | 守備位置番号で記録 |
| **フライ凡打** | \`8\` または \`F8\` (センターフライ) | - |
| **失策 (エラー)** | \`E\` (例: \`E5\` サードエラー) | 打点なし |

---

## 2. 投球数・イニング管理
- 大会規定による球数制限（1日あたり最大投球数）に注意し、1球ごとにカウントを記録します。
- 交代時の打者・イニング・カウント・走者状況を明確に記載してください。`,
        files: [],
        created_by: 'スコア担当',
        updated_at: '2026-04-15'
    },
    {
        id: 'doc-ground-rules',
        title: 'ホームグラウンド利用規則 &amp; 当番業務マニュアル',
        category: 'チーム運営・規約',
        summary: '東小学校グラウンド等の施設利用ルール、鍵の開錠・施錠手順、道具・倉庫の整理整頓、当番保護者の業務一覧です。',
        content: `# ホームグラウンド利用規則 & 当番業務マニュアル

## 1. 施設利用上の遵守事項
- 車両の乗り入れは原則指定の台数のみとし、正門付近のアイドリングは禁止です。
- 校舎内・体育館周辺への無断立ち入りは厳禁です。
- トイレ利用時は泥を落としてから利用し、トイレットペーパーの補充確認を行ってください。

---

## 2. 当番保護者の業務内容チェックリスト
- [ ] **朝の準備**:
  - [ ] 救急箱・クーラーボックス（氷・水・スポドリ）の準備
  - [ ] 日除けテントの設営（夏季）
  - [ ] 来客・指導者用ベンチの設置
- [ ] **練習中・試合中**:
  - [ ] 選手の体調変化（顔色・給水状況）の見守り
  - [ ] ファウルボール拾いの補助
- [ ] **終了時**:
  - [ ] グラウンド整備（トンボがけ・ベース撤去・散水）
  - [ ] ゴミの持ち帰り確認
  - [ ] 倉庫施錠および学校鍵の返却`,
        files: [],
        created_by: '父母会',
        updated_at: '2026-04-01'
    }
];

// 初期プリセットデータ: リンク集
const DEFAULT_LINKS = [
    {
        id: 'link-official-site',
        title: 'Arinko Ants 公式ホームページ',
        url: 'https://arinkoants.sakura.ne.jp/',
        category: '公式・連盟',
        description: 'チームの公式Webサイト。チーム紹介、選手募集案内、活動予定などが掲載されています。',
        icon: '🐜',
        display_order: 1
    },
    {
        id: 'link-google-calendar',
        title: 'チーム活動予定 Googleカレンダー',
        url: 'https://calendar.google.com/',
        category: 'スケジュール・連絡',
        description: '練習日、遠征試合、大会スケジュールが登録されているGoogleカレンダーです。',
        icon: '📅',
        display_order: 2
    },
    {
        id: 'link-nagareyama-league',
        title: '流山市少年野球連盟 公式サイト',
        url: 'http://nagareyama-baseball.jp/',
        category: '公式・連盟',
        description: '市内大会の組み合わせトーナメント表、試合日程、グラウンド規程などが確認できます。',
        icon: '⚾',
        display_order: 3
    },
    {
        id: 'link-chiba-league',
        title: '千葉県少年野球連盟',
        url: 'http://chiba-baseball.jp/',
        category: '公式・連盟',
        description: '千葉県大会の要項、大会結果、競技規則の最新情報が掲載されています。',
        icon: '🏆',
        display_order: 4
    },
    {
        id: 'link-ground-map',
        title: '主な活動グラウンド案内 (Google Maps)',
        url: 'https://maps.google.com/',
        category: 'グラウンド・施設',
        description: 'ホームグラウンド（東小学校）および近隣の流山市内グラウンドへのアクセス地図一覧です。',
        icon: '📍',
        display_order: 5
    },
    {
        id: 'link-weather-forecast',
        title: '流山市のピンポイント天気予報 (tenki.jp)',
        url: 'https://tenki.jp/forecast/3/15/4510/12220/',
        category: '便利ツール',
        description: '当日の雨雲レーダー、1時間ごとの降水確率、風速、WBGT（熱中症指数）を確認できます。',
        icon: '☀️',
        display_order: 6
    },
    {
        id: 'link-baseball-rules',
        title: '公認野球規則 & 少年野球特別規則',
        url: 'https://japan-baseball.jp/',
        category: '便利ツール',
        description: '全日本軟式野球連盟（JSBB）による少年野球特別規程および公認野球規則の解説です。',
        icon: '📖',
        display_order: 7
    }
];

// カテゴリ一覧
const DOC_CATEGORIES = ['すべて', '配車マニュアル', 'チーム運営・規約', '野球ルール・スコア', 'その他'];
const LINK_CATEGORIES = ['すべて', '公式・連盟', 'グラウンド・施設', 'スケジュール・連絡', '便利ツール', 'その他'];

// ==========================================
// 初期化関数
// ==========================================
export async function initInfoApp({ supabaseClient: sb, currentUser: user, currentUserRole: role }) {
    supabase = sb;
    currentAppUser = user;
    currentUserRole = role;
    canManageInfo = (role === 'admin' || role === 'leader');

    // UI表示の更新
    updateAdminControlsVisibility();

    // データの読み込み
    await loadInfoData();

    // アンケートモジュールの初期化
    await initSurveyModule({ supabaseClient: supabase, currentUser: currentAppUser, currentUserRole: currentUserRole });

    // イベントリスナー登録（一度だけ）
    setupInfoEventListeners();

    // 画面レンダリング
    renderInfoTopAnnouncement();
    renderInfoView();
}

function updateAdminControlsVisibility() {
    const adminControls = document.querySelectorAll('.info-admin-only');
    adminControls.forEach(el => {
        if (canManageInfo) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });

    const userBadgeEl = document.getElementById('info-user-role-badge');
    if (userBadgeEl) {
        if (currentUserRole === 'admin') {
            userBadgeEl.className = 'px-2.5 py-0.5 text-xs font-bold rounded-full bg-purple-100 text-purple-700 border border-purple-200';
            userBadgeEl.textContent = '管理者 (編集可)';
        } else if (currentUserRole === 'leader') {
            userBadgeEl.className = 'px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-100 text-blue-700 border border-blue-200';
            userBadgeEl.textContent = 'リーダー (編集可)';
        } else {
            userBadgeEl.className = 'px-2.5 py-0.5 text-xs font-bold rounded-full bg-gray-100 text-gray-700 border border-gray-200';
            userBadgeEl.textContent = '閲覧専用';
        }
    }
}

// ==========================================
// データ読み込み & 保存
// ==========================================
async function loadInfoData() {
    let docsLoaded = false;
    let linksLoaded = false;
    let topMdLoaded = false;

    if (supabase) {
        try {
            const { data: dbDocs, error: docErr } = await supabase
                .from('info_documents')
                .select('*')
                .order('updated_at', { ascending: false });

            if (!docErr && dbDocs && dbDocs.length > 0) {
                documentsList = dbDocs;
                docsLoaded = true;
            }
        } catch (e) {
            console.warn('Supabase info_documents select failed:', e);
        }

        try {
            const { data: dbLinks, error: linkErr } = await supabase
                .from('info_links')
                .select('*')
                .order('display_order', { ascending: true });

            if (!linkErr && dbLinks && dbLinks.length > 0) {
                linksList = dbLinks;
                linksLoaded = true;
            }
        } catch (e) {
            console.warn('Supabase info_links select failed:', e);
        }

        try {
            const { data: dbPage, error: pageErr } = await supabase
                .from('info_pages')
                .select('*')
                .eq('id', 'top_announcement')
                .single();

            if (!pageErr && dbPage && dbPage.content) {
                topAnnouncementMarkdown = dbPage.content;
                topMdLoaded = true;
            }
        } catch (e) {
            console.warn('Supabase info_pages select failed:', e);
        }
    }

    if (!docsLoaded) {
        try {
            const localDocsStr = localStorage.getItem(STORAGE_KEY_DOCS);
            if (localDocsStr) {
                documentsList = JSON.parse(localDocsStr);
            } else {
                documentsList = [...DEFAULT_DOCUMENTS];
                localStorage.setItem(STORAGE_KEY_DOCS, JSON.stringify(documentsList));
            }
        } catch (e) {
            documentsList = [...DEFAULT_DOCUMENTS];
        }
    }

    if (!linksLoaded) {
        try {
            const localLinksStr = localStorage.getItem(STORAGE_KEY_LINKS);
            if (localLinksStr) {
                linksList = JSON.parse(localLinksStr);
            } else {
                linksList = [...DEFAULT_LINKS];
                localStorage.setItem(STORAGE_KEY_LINKS, JSON.stringify(linksList));
            }
        } catch (e) {
            linksList = [...DEFAULT_LINKS];
        }
    }

    if (!topMdLoaded) {
        const localTop = localStorage.getItem(STORAGE_KEY_TOP_MD);
        topAnnouncementMarkdown = localTop !== null ? localTop : DEFAULT_TOP_MD;
    }
}

// ドキュメント保存
async function saveDocumentItem(docItem, isNew = false) {
    const existingIdx = documentsList.findIndex(d => d.id === docItem.id);
    if (existingIdx >= 0) {
        documentsList[existingIdx] = docItem;
    } else {
        documentsList.unshift(docItem);
    }
    try {
        localStorage.setItem(STORAGE_KEY_DOCS, JSON.stringify(documentsList));
    } catch (e) {
        console.error(e);
    }

    if (supabase) {
        try {
            if (isNew) {
                await supabase.from('info_documents').insert([docItem]);
            } else {
                await supabase.from('info_documents').update(docItem).eq('id', docItem.id);
            }
        } catch (e) {
            console.warn('Supabase document save failed:', e);
        }
    }
}

async function deleteDocumentItem(docId) {
    documentsList = documentsList.filter(d => d.id !== docId);
    try {
        localStorage.setItem(STORAGE_KEY_DOCS, JSON.stringify(documentsList));
    } catch (e) {
        console.error(e);
    }

    if (supabase) {
        try {
            await supabase.from('info_documents').delete().eq('id', docId);
        } catch (e) {
            console.warn('Supabase document delete failed:', e);
        }
    }
}

// リンク保存
async function saveLinkItem(linkItem, isNew = false) {
    const existingIdx = linksList.findIndex(l => l.id === linkItem.id);
    if (existingIdx >= 0) {
        linksList[existingIdx] = linkItem;
    } else {
        linksList.push(linkItem);
    }
    try {
        localStorage.setItem(STORAGE_KEY_LINKS, JSON.stringify(linksList));
    } catch (e) {
        console.error(e);
    }

    if (supabase) {
        try {
            if (isNew) {
                await supabase.from('info_links').insert([linkItem]);
            } else {
                await supabase.from('info_links').update(linkItem).eq('id', linkItem.id);
            }
        } catch (e) {
            console.warn('Supabase link save failed:', e);
        }
    }
}

async function deleteLinkItem(linkId) {
    linksList = linksList.filter(l => l.id !== linkId);
    try {
        localStorage.setItem(STORAGE_KEY_LINKS, JSON.stringify(linksList));
    } catch (e) {
        console.error(e);
    }

    if (supabase) {
        try {
            await supabase.from('info_links').delete().eq('id', linkId);
        } catch (e) {
            console.warn('Supabase link delete failed:', e);
        }
    }
}

// トップ構成Markdownの保存
async function saveTopAnnouncementMarkdown(newMd) {
    topAnnouncementMarkdown = newMd;
    try {
        localStorage.setItem(STORAGE_KEY_TOP_MD, newMd);
    } catch (e) {
        console.error(e);
    }

    if (supabase) {
        try {
            await supabase.from('info_pages').upsert([{
                id: 'top_announcement',
                content: newMd,
                updated_at: new Date().toISOString(),
                updated_by: currentAppUser?.name || '管理者'
            }]);
        } catch (e) {
            console.warn('Supabase top_announcement save failed:', e);
        }
    }

    renderInfoTopAnnouncement();
}

// ==========================================
// レンダリング: トップお知らせ
// ==========================================
function renderInfoTopAnnouncement() {
    const container = document.getElementById('info-top-announcement-rendered');
    const wrap = document.getElementById('info-top-announcement-wrap');
    if (!container || !wrap) return;

    if (topAnnouncementMarkdown && topAnnouncementMarkdown.trim()) {
        wrap.classList.remove('hidden');
        container.innerHTML = parseMarkdownToHtml(topAnnouncementMarkdown);
    } else {
        wrap.classList.add('hidden');
    }
}

// ==========================================
// レンダリング: 全体
// ==========================================
function renderInfoView() {
    renderCategoryFilters();

    if (currentTab === 'docs') {
        renderDocuments();
    } else if (currentTab === 'surveys') {
        renderSurveyList();
    } else {
        renderLinks();
    }
}

function renderCategoryFilters() {
    const container = document.getElementById('info-category-filters');
    if (!container) return;

    if (currentTab === 'surveys') {
        container.classList.add('hidden');
        return;
    }
    container.classList.remove('hidden');

    const categories = currentTab === 'docs' ? DOC_CATEGORIES : LINK_CATEGORIES;
    const activeFilter = currentTab === 'docs' ? currentDocFilter : currentLinkFilter;

    container.innerHTML = categories.map(cat => {
        const isActive = activeFilter === cat;
        const activeClass = isActive 
            ? 'bg-teal-600 text-white shadow-sm font-bold' 
            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200';
        return `<button class="info-cat-btn px-3.5 py-1.5 text-xs rounded-full transition-all cursor-pointer ${activeClass}" data-category="${cat}">${cat}</button>`;
    }).join('');

    container.querySelectorAll('.info-cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.getAttribute('data-category');
            if (currentTab === 'docs') {
                currentDocFilter = cat;
                renderDocuments();
            } else {
                currentLinkFilter = cat;
                renderLinks();
            }
            renderCategoryFilters();
        });
    });
}

// ドキュメント一覧の描画
function renderDocuments() {
    const listContainer = document.getElementById('info-docs-container');
    const emptyEl = document.getElementById('info-docs-empty');
    if (!listContainer) return;

    let filtered = documentsList;

    if (currentDocFilter !== 'すべて') {
        filtered = filtered.filter(d => d.category === currentDocFilter);
    }

    if (currentSearchQuery.trim()) {
        const q = currentSearchQuery.toLowerCase().trim();
        filtered = filtered.filter(d => 
            (d.title && d.title.toLowerCase().includes(q)) ||
            (d.summary && d.summary.toLowerCase().includes(q)) ||
            (d.content && d.content.toLowerCase().includes(q)) ||
            (d.category && d.category.toLowerCase().includes(q))
        );
    }

    if (filtered.length === 0) {
        listContainer.innerHTML = '';
        if (emptyEl) emptyEl.classList.remove('hidden');
        return;
    }
    if (emptyEl) emptyEl.classList.add('hidden');

    listContainer.innerHTML = filtered.map(doc => {
        const categoryColor = getCategoryBadgeColor(doc.category);
        const fileCount = doc.files ? doc.files.length : 0;
        return `
            <div class="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between group">
                <div>
                    <div class="flex items-center justify-between gap-2 mb-2.5">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${categoryColor}">
                            ${doc.category || 'その他'}
                        </span>
                        <span class="text-[11px] text-gray-400 font-mono">更新: ${doc.updated_at || '-'}</span>
                    </div>
                    <h3 class="text-base font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                        ${escapeHtml(doc.title)}
                    </h3>
                    <p class="text-xs text-gray-600 line-clamp-3 mb-3 leading-relaxed">
                        ${escapeHtml(doc.summary || doc.content.slice(0, 100))}
                    </p>
                    ${fileCount > 0 ? `
                    <div class="flex items-center gap-1.5 text-[11px] text-gray-500 mb-3 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-200">
                        <span>📎 添付ファイル:</span>
                        <span class="font-bold text-teal-700">${fileCount} 件</span>
                    </div>
                    ` : ''}
                </div>
                <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <button class="btn-view-doc inline-flex items-center text-xs font-bold text-teal-600 hover:text-teal-700 transition cursor-pointer" data-id="${doc.id}">
                        <span>閲覧する</span>
                        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                    ${canManageInfo ? `
                    <div class="flex items-center space-x-2">
                        <button class="btn-edit-doc text-xs text-gray-500 hover:text-blue-600 p-1.5 rounded hover:bg-gray-100 transition cursor-pointer" data-id="${doc.id}" title="編集">
                            ✏️
                        </button>
                        <button class="btn-delete-doc text-xs text-gray-500 hover:text-red-600 p-1.5 rounded hover:bg-gray-100 transition cursor-pointer" data-id="${doc.id}" title="削除">
                            🗑️
                        </button>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');

    listContainer.querySelectorAll('.btn-view-doc').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const doc = documentsList.find(d => d.id === id);
            if (doc) openDocumentReader(doc);
        });
    });

    if (canManageInfo) {
        listContainer.querySelectorAll('.btn-edit-doc').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const doc = documentsList.find(d => d.id === id);
                if (doc) openDocumentEditor(doc);
            });
        });

        listContainer.querySelectorAll('.btn-delete-doc').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.getAttribute('data-id');
                const doc = documentsList.find(d => d.id === id);
                if (!doc) return;
                if (confirm(`ドキュメント「${doc.title}」を削除しますか？`)) {
                    await deleteDocumentItem(id);
                    renderDocuments();
                }
            });
        });
    }
}

// リンク集の描画
function renderLinks() {
    const listContainer = document.getElementById('info-links-container');
    const emptyEl = document.getElementById('info-links-empty');
    if (!listContainer) return;

    let filtered = linksList;

    if (currentLinkFilter !== 'すべて') {
        filtered = filtered.filter(l => l.category === currentLinkFilter);
    }

    if (currentSearchQuery.trim()) {
        const q = currentSearchQuery.toLowerCase().trim();
        filtered = filtered.filter(l => 
            (l.title && l.title.toLowerCase().includes(q)) ||
            (l.description && l.description.toLowerCase().includes(q)) ||
            (l.url && l.url.toLowerCase().includes(q)) ||
            (l.category && l.category.toLowerCase().includes(q))
        );
    }

    if (filtered.length === 0) {
        listContainer.innerHTML = '';
        if (emptyEl) emptyEl.classList.remove('hidden');
        return;
    }
    if (emptyEl) emptyEl.classList.add('hidden');

    listContainer.innerHTML = filtered.map(link => {
        const categoryColor = getCategoryBadgeColor(link.category);
        const icon = link.icon || '🔗';
        const displayUrl = link.url ? link.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';
        return `
            <div class="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between group">
                <div>
                    <div class="flex items-center justify-between gap-2 mb-3">
                        <div class="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-xl shrink-0 border border-teal-100 shadow-xs">
                            ${icon}
                        </div>
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${categoryColor}">
                            ${link.category || 'その他'}
                        </span>
                    </div>
                    <h3 class="text-base font-bold text-gray-900 mb-1.5 group-hover:text-teal-600 transition-colors">
                        ${escapeHtml(link.title)}
                    </h3>
                    <p class="text-xs text-gray-400 font-mono mb-2 truncate" title="${escapeHtml(link.url)}">
                        ${escapeHtml(displayUrl)}
                    </p>
                    <p class="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3">
                        ${escapeHtml(link.description || '説明はありません')}
                    </p>
                </div>
                <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" 
                       class="inline-flex items-center text-xs font-bold bg-teal-50 hover:bg-teal-600 text-teal-700 hover:text-white px-3 py-1.5 rounded-lg transition duration-150 cursor-pointer">
                        <span>サイトを開く</span>
                        <svg class="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                    ${canManageInfo ? `
                    <div class="flex items-center space-x-2">
                        <button class="btn-edit-link text-xs text-gray-500 hover:text-blue-600 p-1.5 rounded hover:bg-gray-100 transition cursor-pointer" data-id="${link.id}" title="編集">
                            ✏️
                        </button>
                        <button class="btn-delete-link text-xs text-gray-500 hover:text-red-600 p-1.5 rounded hover:bg-gray-100 transition cursor-pointer" data-id="${link.id}" title="削除">
                            🗑️
                        </button>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');

    if (canManageInfo) {
        listContainer.querySelectorAll('.btn-edit-link').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const link = linksList.find(l => l.id === id);
                if (link) openLinkEditor(link);
            });
        });

        listContainer.querySelectorAll('.btn-delete-link').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.getAttribute('data-id');
                const link = linksList.find(l => l.id === id);
                if (!link) return;
                if (confirm(`リンク「${link.title}」を削除しますか？`)) {
                    await deleteLinkItem(id);
                    renderLinks();
                }
            });
        });
    }
}

function getCategoryBadgeColor(cat) {
    switch (cat) {
        case '配車マニュアル':
            return 'bg-blue-100 text-blue-800 border border-blue-200';
        case 'チーム運営・規約':
            return 'bg-amber-100 text-amber-800 border border-amber-200';
        case '野球ルール・スコア':
            return 'bg-green-100 text-green-800 border border-green-200';
        case '公式・連盟':
            return 'bg-purple-100 text-purple-800 border border-purple-200';
        case 'グラウンド・施設':
            return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
        case 'スケジュール・連絡':
            return 'bg-sky-100 text-sky-800 border border-sky-200';
        case '便利ツール':
            return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
        default:
            return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
}

// ==========================================
// モーダル: ドキュメント閲覧 & エクスポート
// ==========================================
let currentReadingDoc = null;

function openDocumentReader(doc) {
    const modal = document.getElementById('modal-info-doc-reader');
    if (!modal) return;

    currentReadingDoc = doc;

    document.getElementById('reader-doc-title').textContent = doc.title;
    document.getElementById('reader-doc-category').textContent = doc.category || 'その他';
    document.getElementById('reader-doc-category').className = `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getCategoryBadgeColor(doc.category)}`;
    document.getElementById('reader-doc-updated').textContent = `最終更新: ${doc.updated_at || '-'} (作成: ${doc.created_by || 'チーム'})`;

    // 添付ファイル一覧の表示
    const filesContainer = document.getElementById('reader-doc-files-container');
    const filesList = document.getElementById('reader-doc-files-list');
    if (filesContainer && filesList) {
        if (doc.files && doc.files.length > 0) {
            filesContainer.classList.remove('hidden');
            filesList.innerHTML = doc.files.map(f => `
                <a href="${f.dataUrl || '#'}" download="${escapeHtml(f.name)}" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-teal-50 text-gray-700 hover:text-teal-700 border border-gray-200 text-xs font-bold transition">
                    <span>📎</span>
                    <span>${escapeHtml(f.name)}</span>
                    <span class="text-[10px] text-gray-400 font-normal">(${Math.round((f.size || 0) / 1024)}KB)</span>
                </a>
            `).join('');
        } else {
            filesContainer.classList.add('hidden');
            filesList.innerHTML = '';
        }
    }

    const bodyEl = document.getElementById('reader-doc-content');
    if (bodyEl) {
        bodyEl.innerHTML = parseMarkdownToHtml(doc.content || '', true); // 目次生成付き
        bindCodeCopyButtons(bodyEl);
    }

    modal.classList.remove('hidden');
}

function closeDocumentReader() {
    const modal = document.getElementById('modal-info-doc-reader');
    if (modal) modal.classList.add('hidden');
    currentReadingDoc = null;
}

// ドキュメントのMarkdownエクスポート
function exportCurrentDocumentMd() {
    if (!currentReadingDoc) return;
    const doc = currentReadingDoc;
    const blob = new Blob([doc.content || ''], { type: 'text/markdown;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${doc.title || 'document'}.md`;
    link.click();
}

// ==========================================
// モーダル: ドキュメント作成・編集 & インポート
// ==========================================
let editingDocId = null;
let currentEditorFiles = [];

function openDocumentEditor(doc = null) {
    const modal = document.getElementById('modal-info-doc-editor');
    if (!modal) return;

    editingDocId = doc ? doc.id : null;
    currentEditorFiles = doc && doc.files ? JSON.parse(JSON.stringify(doc.files)) : [];

    document.getElementById('doc-editor-modal-title').textContent = doc ? 'ドキュメントの編集' : '新規ドキュメント作成';
    document.getElementById('input-doc-title').value = doc ? doc.title : '';
    document.getElementById('input-doc-summary').value = doc ? (doc.summary || '') : '';
    document.getElementById('input-doc-content').value = doc ? doc.content : '';

    const catSelect = document.getElementById('select-doc-category');
    catSelect.innerHTML = DOC_CATEGORIES.filter(c => c !== 'すべて').map(c => 
        `<option value="${c}" ${doc && doc.category === c ? 'selected' : ''}>${c}</option>`
    ).join('');

    renderEditorFilesList();
    switchEditorTab('write');
    modal.classList.remove('hidden');
}

function closeDocumentEditor() {
    const modal = document.getElementById('modal-info-doc-editor');
    if (modal) modal.classList.add('hidden');
    editingDocId = null;
    currentEditorFiles = [];
}

function renderEditorFilesList() {
    const container = document.getElementById('doc-editor-files-list');
    if (!container) return;

    if (currentEditorFiles.length === 0) {
        container.innerHTML = '<span class="text-xs text-gray-400">添付ファイルはありません</span>';
        return;
    }

    container.innerHTML = currentEditorFiles.map((f, idx) => `
        <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 border border-gray-200 text-xs text-gray-700">
            <span>📎 ${escapeHtml(f.name)} (${Math.round((f.size || 0) / 1024)}KB)</span>
            <button class="btn-del-file text-red-500 hover:text-red-700 font-bold ml-1" data-index="${idx}">✕</button>
        </div>
    `).join('');

    container.querySelectorAll('.btn-del-file').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = Number(btn.getAttribute('data-index'));
            currentEditorFiles.splice(idx, 1);
            renderEditorFilesList();
        });
    });
}

// ファイル添付処理
function handleAttachFiles(files) {
    Array.from(files).forEach(file => {
        if (file.size > 5 * 1024 * 1024) {
            alert(`ファイル「${file.name}」が5MBを超えているため添付できません。`);
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            currentEditorFiles.push({
                name: file.name,
                size: file.size,
                type: file.type,
                dataUrl: e.target.result
            });
            renderEditorFilesList();
        };
        reader.readAsDataURL(file);
    });
}

// Markdownファイルのインポート
function handleImportMdFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const text = e.target.result;
        const titleInput = document.getElementById('input-doc-title');
        const contentArea = document.getElementById('input-doc-content');
        if (titleInput && (!titleInput.value || titleInput.value.trim() === '')) {
            titleInput.value = file.name.replace(/\.md$/i, '');
        }
        if (contentArea) {
            contentArea.value = text;
        }
    };
    reader.readAsText(file);
}

function switchEditorTab(tab) {
    const writeBtn = document.getElementById('btn-doc-tab-write');
    const previewBtn = document.getElementById('btn-doc-tab-preview');
    const textarea = document.getElementById('input-doc-content');
    const previewArea = document.getElementById('doc-preview-content');

    if (tab === 'write') {
        writeBtn?.classList.add('bg-white', 'text-teal-700', 'shadow-xs');
        writeBtn?.classList.remove('text-gray-500');
        previewBtn?.classList.remove('bg-white', 'text-teal-700', 'shadow-xs');
        previewBtn?.classList.add('text-gray-500');
        textarea?.classList.remove('hidden');
        previewArea?.classList.add('hidden');
    } else {
        previewBtn?.classList.add('bg-white', 'text-teal-700', 'shadow-xs');
        previewBtn?.classList.remove('text-gray-500');
        writeBtn?.classList.remove('bg-white', 'text-teal-700', 'shadow-xs');
        writeBtn?.classList.add('text-gray-500');
        textarea?.classList.add('hidden');
        previewArea?.classList.remove('hidden');
        if (previewArea && textarea) {
            previewArea.innerHTML = parseMarkdownToHtml(textarea.value || '*本文が入力されていません*');
            bindCodeCopyButtons(previewArea);
        }
    }
}

async function handleSaveDocumentForm() {
    const title = document.getElementById('input-doc-title')?.value.trim();
    const category = document.getElementById('select-doc-category')?.value;
    const summary = document.getElementById('input-doc-summary')?.value.trim();
    const content = document.getElementById('input-doc-content')?.value.trim();

    if (!title) {
        alert('タイトルを入力してください');
        return;
    }
    if (!content) {
        alert('本文を入力してください');
        return;
    }

    const today = new Date().toISOString().split('T')[0];
    const isNew = !editingDocId;
    const docItem = {
        id: editingDocId || `doc_${Date.now()}`,
        title,
        category,
        summary: summary || content.slice(0, 100),
        content,
        files: currentEditorFiles,
        created_by: currentAppUser?.name || '管理者',
        updated_at: today
    };

    await saveDocumentItem(docItem, isNew);
    closeDocumentEditor();
    renderDocuments();
}

// ==========================================
// モーダル: トップお知らせ構成の編集
// ==========================================
function openTopAnnouncementEditor() {
    const modal = document.getElementById('modal-info-top-editor');
    if (!modal) return;

    const textarea = document.getElementById('input-info-top-content');
    if (textarea) {
        textarea.value = topAnnouncementMarkdown;
    }

    switchTopEditorTab('write');
    modal.classList.remove('hidden');
}

function closeTopAnnouncementEditor() {
    const modal = document.getElementById('modal-info-top-editor');
    if (modal) modal.classList.add('hidden');
}

function switchTopEditorTab(tab) {
    const writeBtn = document.getElementById('btn-top-tab-write');
    const previewBtn = document.getElementById('btn-top-tab-preview');
    const textarea = document.getElementById('input-info-top-content');
    const previewArea = document.getElementById('top-preview-content');

    if (tab === 'write') {
        writeBtn?.classList.add('bg-white', 'text-teal-700', 'shadow-xs');
        writeBtn?.classList.remove('text-gray-500');
        previewBtn?.classList.remove('bg-white', 'text-teal-700', 'shadow-xs');
        previewBtn?.classList.add('text-gray-500');
        textarea?.classList.remove('hidden');
        previewArea?.classList.add('hidden');
    } else {
        previewBtn?.classList.add('bg-white', 'text-teal-700', 'shadow-xs');
        previewBtn?.classList.remove('text-gray-500');
        writeBtn?.classList.remove('bg-white', 'text-teal-700', 'shadow-xs');
        writeBtn?.classList.add('text-gray-500');
        textarea?.classList.add('hidden');
        previewArea?.classList.remove('hidden');
        if (previewArea && textarea) {
            previewArea.innerHTML = parseMarkdownToHtml(textarea.value || '*内容が入力されていません*');
            bindCodeCopyButtons(previewArea);
        }
    }
}

async function handleSaveTopAnnouncement() {
    const content = document.getElementById('input-info-top-content')?.value;
    await saveTopAnnouncementMarkdown(content);
    closeTopAnnouncementEditor();
}

// ==========================================
// モーダル: リンク作成・編集
// ==========================================
let editingLinkId = null;

function openLinkEditor(link = null) {
    const modal = document.getElementById('modal-info-link-editor');
    if (!modal) return;

    editingLinkId = link ? link.id : null;
    document.getElementById('link-editor-modal-title').textContent = link ? 'リンクの編集' : '新規リンク追加';
    document.getElementById('input-link-title').value = link ? link.title : '';
    document.getElementById('input-link-url').value = link ? link.url : '';
    document.getElementById('input-link-desc').value = link ? (link.description || '') : '';
    document.getElementById('input-link-icon').value = link ? (link.icon || '🔗') : '🔗';

    const catSelect = document.getElementById('select-link-category');
    catSelect.innerHTML = LINK_CATEGORIES.filter(c => c !== 'すべて').map(c => 
        `<option value="${c}" ${link && link.category === c ? 'selected' : ''}>${c}</option>`
    ).join('');

    modal.classList.remove('hidden');
}

function closeLinkEditor() {
    const modal = document.getElementById('modal-info-link-editor');
    if (modal) modal.classList.add('hidden');
    editingLinkId = null;
}

async function handleSaveLinkForm() {
    const title = document.getElementById('input-link-title')?.value.trim();
    const url = document.getElementById('input-link-url')?.value.trim();
    const category = document.getElementById('select-link-category')?.value;
    const description = document.getElementById('input-link-desc')?.value.trim();
    const icon = document.getElementById('input-link-icon')?.value.trim() || '🔗';

    if (!title) {
        alert('タイトルを入力してください');
        return;
    }
    if (!url) {
        alert('URLを入力してください');
        return;
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        alert('URLは http:// または https:// から入力してください');
        return;
    }

    const isNew = !editingLinkId;
    const linkItem = {
        id: editingLinkId || `link_${Date.now()}`,
        title,
        url,
        category,
        description,
        icon,
        display_order: isNew ? linksList.length + 1 : (linksList.find(l => l.id === editingLinkId)?.display_order || 1),
        created_by: currentAppUser?.name || '管理者',
        updated_at: new Date().toISOString().split('T')[0]
    };

    await saveLinkItem(linkItem, isNew);
    closeLinkEditor();
    renderLinks();
}

// ==========================================
// モーダル: Supabase SQL表示
// ==========================================
const SUPABASE_DDL_SQL = `-- ==========================================
-- Arinko Ants: Info & Surveys テーブル定義
-- Supabase の SQL Editor に貼り付けて実行してください
-- ==========================================

-- 1. app_users に can_use_info カラムを追加
ALTER TABLE app_users 
ADD COLUMN IF NOT EXISTS can_use_info boolean DEFAULT true;

-- 2. info_pages (トップ構成Markdown)
CREATE TABLE IF NOT EXISTS info_pages (
    id text PRIMARY KEY,
    content text NOT NULL,
    updated_at text,
    updated_by text
);
ALTER TABLE info_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated info_pages" ON info_pages FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow public read info_pages" ON info_pages FOR SELECT TO anon USING (true);

-- 3. info_documents (ドキュメント)
CREATE TABLE IF NOT EXISTS info_documents (
    id text PRIMARY KEY,
    title text NOT NULL,
    category text DEFAULT 'その他',
    summary text,
    content text NOT NULL,
    files jsonb DEFAULT '[]'::jsonb,
    created_by text,
    updated_at text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE info_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated info_documents" ON info_documents FOR ALL TO authenticated USING (true);

-- 4. info_links (リンク集)
CREATE TABLE IF NOT EXISTS info_links (
    id text PRIMARY KEY,
    title text NOT NULL,
    url text NOT NULL,
    category text DEFAULT 'その他',
    description text,
    icon text DEFAULT '🔗',
    display_order integer DEFAULT 1,
    created_by text,
    updated_at text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE info_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated info_links" ON info_links FOR ALL TO authenticated USING (true);

-- 5. surveys (アンケート本体)
CREATE TABLE IF NOT EXISTS surveys (
    id text PRIMARY KEY,
    title text NOT NULL,
    description text,
    status text DEFAULT 'active',
    deadline text,
    enable_schedule boolean DEFAULT false,
    schedule_options jsonb DEFAULT '[]'::jsonb,
    enable_family boolean DEFAULT false,
    enable_orders boolean DEFAULT false,
    order_items jsonb DEFAULT '[]'::jsonb,
    questions jsonb DEFAULT '[]'::jsonb,
    created_by text,
    created_at text,
    updated_at text
);
ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all surveys select" ON surveys FOR SELECT USING (true);
CREATE POLICY "Allow authenticated surveys modify" ON surveys FOR ALL TO authenticated USING (true);

-- 6. survey_responses (アンケート回答: ゲスト回答対応)
CREATE TABLE IF NOT EXISTS survey_responses (
    id text PRIMARY KEY,
    survey_id text NOT NULL,
    respondent_name text NOT NULL,
    family_members jsonb DEFAULT '[]'::jsonb,
    schedules jsonb DEFAULT '{}'::jsonb,
    answers jsonb DEFAULT '{}'::jsonb,
    orders jsonb DEFAULT '{}'::jsonb,
    total_amount integer DEFAULT 0,
    created_at text
);
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anyone to insert survey_responses" ON survey_responses FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anyone to select survey_responses" ON survey_responses FOR SELECT USING (true);
`;

function openSqlModal() {
    const modal = document.getElementById('modal-info-sql');
    if (!modal) return;
    const codeEl = document.getElementById('info-sql-code');
    if (codeEl) codeEl.textContent = SUPABASE_DDL_SQL;
    modal.classList.remove('hidden');
}

function closeSqlModal() {
    const modal = document.getElementById('modal-info-sql');
    if (modal) modal.classList.add('hidden');
}

function copySqlToClipboard() {
    navigator.clipboard.writeText(SUPABASE_DDL_SQL).then(() => {
        alert('SQL文をクリップボードにコピーしました！\nSupabase Dashboardの「SQL Editor」で実行してください。');
    }).catch(err => {
        console.error('Copy failed:', err);
    });
}

// ==========================================
// イベントリスナーのセットアップ
// ==========================================
let isEventsBound = false;

function setupInfoEventListeners() {
    if (isEventsBound) return;
    isEventsBound = true;

    // タブ切り替え（ドキュメント / アンケート / リンク集）
    const tabDocs = document.getElementById('tab-info-docs');
    const tabSurveys = document.getElementById('tab-info-surveys');
    const tabLinks = document.getElementById('tab-info-links');
    const viewDocs = document.getElementById('view-info-docs');
    const viewSurveys = document.getElementById('view-info-surveys');
    const viewLinks = document.getElementById('view-info-links');
    const btnNew = document.getElementById('btn-info-new');
    const btnSurveyNew = document.getElementById('btn-survey-new');

    function setActiveTab(tab) {
        currentTab = tab;
        [tabDocs, tabSurveys, tabLinks].forEach(t => {
            if (t) t.className = 'px-4 py-2 font-bold text-gray-500 hover:text-gray-700 border-b-2 border-transparent transition-colors flex items-center space-x-2 cursor-pointer';
        });
        [viewDocs, viewSurveys, viewLinks].forEach(v => v?.classList.add('hidden'));

        if (tab === 'docs') {
            tabDocs.className = 'px-4 py-2 font-bold text-teal-600 border-b-2 border-teal-600 transition-colors flex items-center space-x-2 cursor-pointer';
            viewDocs?.classList.remove('hidden');
            if (btnNew) {
                btnNew.classList.remove('hidden');
                btnNew.textContent = '＋ 新規ドキュメント';
            }
            if (btnSurveyNew) btnSurveyNew.classList.add('hidden');
        } else if (tab === 'surveys') {
            tabSurveys.className = 'px-4 py-2 font-bold text-teal-600 border-b-2 border-teal-600 transition-colors flex items-center space-x-2 cursor-pointer';
            viewSurveys?.classList.remove('hidden');
            if (btnNew) btnNew.classList.add('hidden');
            if (btnSurveyNew && canManageInfo) btnSurveyNew.classList.remove('hidden');
        } else {
            tabLinks.className = 'px-4 py-2 font-bold text-teal-600 border-b-2 border-teal-600 transition-colors flex items-center space-x-2 cursor-pointer';
            viewLinks?.classList.remove('hidden');
            if (btnNew) {
                btnNew.classList.remove('hidden');
                btnNew.textContent = '＋ 新規リンク';
            }
            if (btnSurveyNew) btnSurveyNew.classList.add('hidden');
        }
        renderInfoView();
    }

    tabDocs?.addEventListener('click', () => setActiveTab('docs'));
    tabSurveys?.addEventListener('click', () => setActiveTab('surveys'));
    tabLinks?.addEventListener('click', () => setActiveTab('links'));

    // 検索入力
    const searchInput = document.getElementById('input-info-search');
    searchInput?.addEventListener('input', (e) => {
        currentSearchQuery = e.target.value;
        if (currentTab === 'docs') {
            renderDocuments();
        } else if (currentTab === 'links') {
            renderLinks();
        }
    });

    // 新規作成ボタン
    btnNew?.addEventListener('click', () => {
        if (currentTab === 'docs') {
            openDocumentEditor();
        } else if (currentTab === 'links') {
            openLinkEditor();
        }
    });

    // トップ構成・お知らせ編集
    document.getElementById('btn-edit-top-announcement')?.addEventListener('click', openTopAnnouncementEditor);
    document.getElementById('btn-close-top-editor')?.addEventListener('click', closeTopAnnouncementEditor);
    document.getElementById('btn-cancel-top-editor')?.addEventListener('click', closeTopAnnouncementEditor);
    document.getElementById('btn-top-tab-write')?.addEventListener('click', () => switchTopEditorTab('write'));
    document.getElementById('btn-top-tab-preview')?.addEventListener('click', () => switchTopEditorTab('preview'));
    document.getElementById('btn-save-top-announcement')?.addEventListener('click', handleSaveTopAnnouncement);

    // ドキュメント閲覧モーダル
    document.getElementById('btn-close-doc-reader')?.addEventListener('click', closeDocumentReader);
    document.getElementById('btn-close-doc-reader-bg')?.addEventListener('click', closeDocumentReader);
    document.getElementById('btn-export-doc-md')?.addEventListener('click', exportCurrentDocumentMd);

    // ドキュメント編集モーダル
    document.getElementById('btn-close-doc-editor')?.addEventListener('click', closeDocumentEditor);
    document.getElementById('btn-cancel-doc-editor')?.addEventListener('click', closeDocumentEditor);
    document.getElementById('btn-doc-tab-write')?.addEventListener('click', () => switchEditorTab('write'));
    document.getElementById('btn-doc-tab-preview')?.addEventListener('click', () => switchEditorTab('preview'));
    document.getElementById('btn-save-doc')?.addEventListener('click', handleSaveDocumentForm);

    // ファイル添付・Markdownインポート
    const fileInput = document.getElementById('input-doc-attach-files');
    fileInput?.addEventListener('change', (e) => {
        if (e.target.files) handleAttachFiles(e.target.files);
    });

    const mdImportInput = document.getElementById('input-doc-import-md');
    mdImportInput?.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) handleImportMdFile(e.target.files[0]);
    });

    // リンク編集モーダル
    document.getElementById('btn-close-link-editor')?.addEventListener('click', closeLinkEditor);
    document.getElementById('btn-cancel-link-editor')?.addEventListener('click', closeLinkEditor);
    document.getElementById('btn-save-link')?.addEventListener('click', handleSaveLinkForm);

    // SQL表示モーダル
    document.getElementById('btn-info-sql-modal')?.addEventListener('click', openSqlModal);
    document.getElementById('btn-close-info-sql')?.addEventListener('click', closeSqlModal);
    document.getElementById('btn-copy-info-sql')?.addEventListener('click', copySqlToClipboard);
}

// ==========================================
// 拡張 Markdown パーサー
// ==========================================
function parseMarkdownToHtml(md, includeToc = false) {
    if (!md) return '';

    const lines = md.split('\n');
    let html = '';
    let inList = false;
    let inOrderedList = false;
    let inCodeBlock = false;
    let codeLang = '';
    let codeContent = '';
    let inTable = false;
    let tableRows = [];
    let inCallout = false;
    let calloutType = '';
    let calloutContent = '';

    const headings = [];

    function closePending() {
        if (inList) {
            html += '</ul>\n';
            inList = false;
        }
        if (inOrderedList) {
            html += '</ol>\n';
            inOrderedList = false;
        }
        if (inTable) {
            html += renderTableHtml(tableRows);
            tableRows = [];
            inTable = false;
        }
        if (inCallout) {
            html += renderCalloutHtml(calloutType, calloutContent);
            calloutContent = '';
            inCallout = false;
        }
    }

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // コードブロックの開始/終了
        if (line.trim().startsWith('```')) {
            if (inCodeBlock) {
                html += `
                    <div class="relative my-3 group">
                        <pre class="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-xs font-mono border border-gray-800 leading-relaxed"><code>${escapeHtml(codeContent.trim())}</code></pre>
                        <button class="btn-copy-code absolute top-2 right-2 px-2 py-1 text-[10px] font-bold rounded bg-gray-800 text-gray-300 hover:text-white border border-gray-700 opacity-0 group-hover:opacity-100 transition">コピー</button>
                    </div>\n`;
                codeContent = '';
                inCodeBlock = false;
            } else {
                closePending();
                inCodeBlock = true;
                codeLang = line.trim().slice(3).trim();
            }
            continue;
        }

        if (inCodeBlock) {
            codeContent += line + '\n';
            continue;
        }

        // コールアウト判定 (> [!NOTE], > [!TIP], > [!WARNING], > [!IMPORTANT], > [!CAUTION])
        const calloutMatch = line.trim().match(/^>\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]/i);
        if (calloutMatch) {
            closePending();
            inCallout = true;
            calloutType = calloutMatch[1].toUpperCase();
            calloutContent = '';
            continue;
        }

        if (inCallout) {
            if (line.startsWith('>')) {
                calloutContent += line.replace(/^>\s?/, '') + '\n';
                continue;
            } else {
                closePending();
            }
        }

        // テーブル判定
        if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
            if (!inTable) {
                closePending();
                inTable = true;
                tableRows = [];
            }
            tableRows.push(line.trim());
            continue;
        } else if (inTable) {
            html += renderTableHtml(tableRows);
            tableRows = [];
            inTable = false;
        }

        // 空行
        if (line.trim() === '') {
            closePending();
            continue;
        }

        // 水平線
        if (/^(\*{3,}|-{3,}|_{3,})$/.test(line.trim())) {
            closePending();
            html += '<hr class="my-6 border-t border-gray-200">\n';
            continue;
        }

        // 見出し (h1〜h4)
        if (line.startsWith('# ')) {
            closePending();
            const text = line.slice(2).trim();
            const hId = `heading-${headings.length}`;
            headings.push({ level: 1, text, id: hId });
            html += `<h1 id="${hId}" class="text-2xl font-bold text-gray-900 mt-6 mb-3 pb-2 border-b border-gray-200">${inlineMarkdown(text)}</h1>\n`;
            continue;
        }
        if (line.startsWith('## ')) {
            closePending();
            const text = line.slice(3).trim();
            const hId = `heading-${headings.length}`;
            headings.push({ level: 2, text, id: hId });
            html += `<h2 id="${hId}" class="text-xl font-bold text-gray-800 mt-5 mb-2.5">${inlineMarkdown(text)}</h2>\n`;
            continue;
        }
        if (line.startsWith('### ')) {
            closePending();
            const text = line.slice(4).trim();
            const hId = `heading-${headings.length}`;
            headings.push({ level: 3, text, id: hId });
            html += `<h3 id="${hId}" class="text-lg font-bold text-gray-800 mt-4 mb-2">${inlineMarkdown(text)}</h3>\n`;
            continue;
        }
        if (line.startsWith('#### ')) {
            closePending();
            const text = line.slice(5).trim();
            html += `<h4 class="text-base font-semibold text-gray-700 mt-3 mb-1.5">${inlineMarkdown(text)}</h4>\n`;
            continue;
        }

        // 通常の引用ブロック
        if (line.startsWith('> ')) {
            closePending();
            html += `<blockquote class="border-l-4 border-teal-500 pl-4 py-1.5 my-3 bg-teal-50/50 text-xs text-gray-700 rounded-r">${inlineMarkdown(line.slice(2))}</blockquote>\n`;
            continue;
        }

        // チェックリスト (- [ ] または - [x])
        const checkMatch = line.trim().match(/^[-*]\s*\[([ xX])\]\s*(.*)/);
        if (checkMatch) {
            closePending();
            const isChecked = checkMatch[1].toLowerCase() === 'x';
            html += `
                <div class="flex items-center gap-2 my-1 text-xs text-gray-700">
                    <input type="checkbox" ${isChecked ? 'checked' : ''} disabled class="rounded text-teal-600">
                    <span class="${isChecked ? 'line-through text-gray-400' : ''}">${inlineMarkdown(checkMatch[2])}</span>
                </div>\n`;
            continue;
        }

        // 順序なしリスト
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
            if (inOrderedList) {
                html += '</ol>\n';
                inOrderedList = false;
            }
            if (!inList) {
                html += '<ul class="list-disc list-inside my-2 space-y-1 text-xs text-gray-700 leading-relaxed">\n';
                inList = true;
            }
            const itemText = line.trim().slice(2);
            html += `  <li>${inlineMarkdown(itemText)}</li>\n`;
            continue;
        }

        // 順序付きリスト
        const olMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
        if (olMatch) {
            if (inList) {
                html += '</ul>\n';
                inList = false;
            }
            if (!inOrderedList) {
                html += '<ol class="list-decimal list-inside my-2 space-y-1 text-xs text-gray-700 leading-relaxed">\n';
                inOrderedList = true;
            }
            html += `  <li>${inlineMarkdown(olMatch[2])}</li>\n`;
            continue;
        }

        // 通常段落
        closePending();
        html += `<p class="my-2 text-xs text-gray-700 leading-relaxed">${inlineMarkdown(line)}</p>\n`;
    }

    closePending();

    // 目次（TOC）の生成
    if (includeToc && headings.length >= 2) {
        let tocHtml = `
            <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                <span class="text-xs font-bold text-gray-700 block mb-2">📑 目次</span>
                <ul class="space-y-1 text-xs">
                    ${headings.map(h => `
                        <li class="${h.level === 2 ? 'pl-3' : (h.level === 3 ? 'pl-6' : '')}">
                            <a href="#${h.id}" class="text-teal-600 hover:text-teal-800 hover:underline">
                                ${escapeHtml(h.text)}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
        html = tocHtml + html;
    }

    return html;
}

function renderCalloutHtml(type, content) {
    let borderColor = 'border-teal-500';
    let bgColor = 'bg-teal-50/70';
    let titleColor = 'text-teal-800';
    let icon = 'ℹ️';
    let title = 'NOTE';

    if (type === 'TIP') {
        borderColor = 'border-emerald-500';
        bgColor = 'bg-emerald-50/70';
        titleColor = 'text-emerald-800';
        icon = '💡';
        title = 'TIP';
    } else if (type === 'WARNING' || type === 'CAUTION') {
        borderColor = 'border-amber-500';
        bgColor = 'bg-amber-50/70';
        titleColor = 'text-amber-800';
        icon = '⚠️';
        title = 'WARNING';
    } else if (type === 'IMPORTANT') {
        borderColor = 'border-blue-500';
        bgColor = 'bg-blue-50/70';
        titleColor = 'text-blue-800';
        icon = '📌';
        title = 'IMPORTANT';
    }

    const bodyHtml = content.split('\n').filter(l => l.trim()).map(l => `<p class="my-1 text-xs text-gray-700 leading-relaxed">${inlineMarkdown(l)}</p>`).join('');

    return `
        <div class="border-l-4 ${borderColor} ${bgColor} p-3.5 my-3 rounded-r-xl border border-gray-200/50">
            <div class="flex items-center gap-1.5 font-bold text-xs ${titleColor} mb-1">
                <span>${icon}</span>
                <span>${title}</span>
            </div>
            ${bodyHtml}
        </div>
    `;
}

function renderTableHtml(rows) {
    if (rows.length < 2) return '';
    let html = '<div class="overflow-x-auto my-4 scrollbar-thin"><table class="min-w-full text-xs border border-gray-200 rounded-xl overflow-hidden">';
    
    const headerCells = rows[0].split('|').slice(1, -1).map(c => c.trim());
    html += '<thead class="bg-gray-50 border-b border-gray-200"><tr>';
    headerCells.forEach(cell => {
        html += `<th class="px-3.5 py-2.5 text-left font-bold text-gray-700 border-r border-gray-200 last:border-r-0">${inlineMarkdown(cell)}</th>`;
    });
    html += '</tr></thead><tbody>';

    for (let i = 2; i < rows.length; i++) {
        const cells = rows[i].split('|').slice(1, -1).map(c => c.trim());
        html += `<tr class="${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'} border-b border-gray-100 last:border-b-0 hover:bg-teal-50/30">`;
        cells.forEach(cell => {
            html += `<td class="px-3.5 py-2.5 text-gray-600 border-r border-gray-100 last:border-r-0">${inlineMarkdown(cell)}</td>`;
        });
        html += '</tr>';
    }
    html += '</tbody></table></div>';
    return html;
}

function inlineMarkdown(text) {
    if (!text) return '';
    let res = escapeHtml(text);
    res = res.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>');
    res = res.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    res = res.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-gray-100 text-teal-700 rounded text-[11px] font-mono border border-gray-200">$1</code>');
    res = res.replace(/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-teal-600 hover:text-teal-800 underline font-semibold">$1 ↗</a>');
    return res;
}

function bindCodeCopyButtons(container) {
    container.querySelectorAll('.btn-copy-code').forEach(btn => {
        btn.addEventListener('click', () => {
            const code = btn.parentElement.querySelector('code')?.textContent || '';
            navigator.clipboard.writeText(code).then(() => {
                const originalText = btn.textContent;
                btn.textContent = 'コピー完了！';
                setTimeout(() => { btn.textContent = originalText; }, 2000);
            });
        });
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
