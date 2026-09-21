// ==========================================
// Survey (アンケート・日程調整・注文集計) モジュール
// ==========================================

let supabase = null;
let currentAppUser = null;
let currentUserRole = 'user';
let canManage = false;

const STORAGE_KEY_SURVEYS = 'ants_surveys_v1';
const STORAGE_KEY_RESPONSES = 'ants_survey_responses_v1';

// メモリ内データ
let surveysList = [];
let responsesList = [];

// 初期サンプルアンケート（初回起動時用）
const DEFAULT_SURVEYS = [
    {
        id: 'survey_sample_1',
        title: '【夏季合宿】参加日程調整 & お弁当・合宿Tシャツ注文とりまとめ',
        description: `少年野球チーム Arinko Ants 夏季合宿（8月開催）の出欠日程および備品・お弁当の事前注文確認です。
**1回の送信で、保護者様ご本人と選手（兄弟含む）全員分の出欠・注文をまとめてご登録いただけます。**
ご不明な点がありましたら役員までお問い合わせください。`,
        status: 'active',
        deadline: '2026-07-20 23:59',
        enable_schedule: true,
        schedule_options: [
            '8/8(土) 午前 (練習・遠征)',
            '8/8(土) 午後 (練習試合・BBQ)',
            '8/8(土) 宿泊',
            '8/9(日) 終日 (紅白戦・グラウンド納め)'
        ],
        enable_family: true,
        enable_orders: true,
        order_items: [
            { id: 'item_lunch_sat', name: '8/8(土) 選手・保護者弁当', price: 650, max: 10 },
            { id: 'item_lunch_sun', name: '8/9(日) 選手・保護者弁当', price: 650, max: 10 },
            { id: 'item_tshirt', name: '合宿記念チームTシャツ', price: 2200, max: 5 },
            { id: 'item_cap', name: ' Ants オリジナル冷感タオル', price: 800, max: 5 }
        ],
        questions: [
            {
                id: 'q_attendance',
                type: 'single',
                title: '合宿全体の参加可否をお選びください',
                required: true,
                options: [
                    { label: '参加する（部分参加含む）', skip_to: null },
                    { label: '不参加（全日程）', skip_to: 'q_remarks' }
                ],
                help: '不参加を選択された場合、日程詳細およびお弁当等の注文設問はスキップされます。'
            },
            {
                id: 'q_transport',
                type: 'single',
                title: '現地までの移動手段について',
                required: false,
                options: [
                    { label: '配車（チーム車）を利用希望', skip_to: null },
                    { label: '自車で現地直行（他メンバー同乗可）', skip_to: null },
                    { label: '自車で現地直行（家族のみ）', skip_to: null }
                ],
                help: ''
            },
            {
                id: 'q_remarks',
                type: 'text',
                title: '特記事項・アレルギー・連絡事項など',
                required: false,
                options: [],
                help: '食物アレルギーや遅刻・早退のご予定等があればご記入ください。'
            }
        ],
        created_by: '役員会',
        created_at: '2026-06-01',
        updated_at: '2026-06-01'
    }
];

// 初期サンプル回答
const DEFAULT_RESPONSES = [
    {
        id: 'resp_sample_1',
        survey_id: 'survey_sample_1',
        respondent_name: '菱沼 (保護者)',
        family_members: [
            { name: '菱沼 健一 (保護者・指導者)', role: '保護者' },
            { name: '菱沼 翔太 (6年・主将)', role: '選手' }
        ],
        schedules: {
            '8/8(土) 午前 (練習・遠征)': '○',
            '8/8(土) 午後 (練習試合・BBQ)': '○',
            '8/8(土) 宿泊': '○',
            '8/9(日) 終日 (紅白戦・グラウンド納め)': '○'
        },
        answers: {
            'q_attendance': '参加する（部分参加含む）',
            'q_transport': '自車で現地直行（他メンバー同乗可）',
            'q_remarks': '車出し可能です。道具車としても利用できます。'
        },
        orders: {
            'item_lunch_sat': 2,
            'item_lunch_sun': 2,
            'item_tshirt': 1,
            'item_cap': 2
        },
        total_amount: 6400,
        created_at: '2026-06-02 10:15'
    }
];

// ==========================================
// 初期化
// ==========================================
export async function initSurveyModule({ supabaseClient: sb, currentUser: user, currentUserRole: role }) {
    supabase = sb;
    currentAppUser = user;
    currentUserRole = role;
    canManage = (role === 'admin' || role === 'leader');

    await loadSurveyData();
    setupSurveyAdminEvents();
    renderSurveyList();
}

// データの読み込み
export async function loadSurveyData() {
    let surveysLoaded = false;
    let responsesLoaded = false;

    if (supabase) {
        try {
            const { data: dbSurveys, error: sErr } = await supabase
                .from('surveys')
                .select('*')
                .order('created_at', { ascending: false });

            if (!sErr && dbSurveys && dbSurveys.length > 0) {
                surveysList = dbSurveys;
                surveysLoaded = true;
            }
        } catch (e) {
            console.warn('Supabase surveys load failed, using local:', e);
        }

        try {
            const { data: dbResponses, error: rErr } = await supabase
                .from('survey_responses')
                .select('*')
                .order('created_at', { ascending: false });

            if (!rErr && dbResponses) {
                responsesList = dbResponses;
                responsesLoaded = true;
            }
        } catch (e) {
            console.warn('Supabase survey_responses load failed, using local:', e);
        }
    }

    if (!surveysLoaded) {
        try {
            const localSurveysStr = localStorage.getItem(STORAGE_KEY_SURVEYS);
            if (localSurveysStr) {
                surveysList = JSON.parse(localSurveysStr);
            } else {
                surveysList = [...DEFAULT_SURVEYS];
                localStorage.setItem(STORAGE_KEY_SURVEYS, JSON.stringify(surveysList));
            }
        } catch (e) {
            surveysList = [...DEFAULT_SURVEYS];
        }
    }

    if (!responsesLoaded) {
        try {
            const localResponsesStr = localStorage.getItem(STORAGE_KEY_RESPONSES);
            if (localResponsesStr) {
                responsesList = JSON.parse(localResponsesStr);
            } else {
                responsesList = [...DEFAULT_RESPONSES];
                localStorage.setItem(STORAGE_KEY_RESPONSES, JSON.stringify(responsesList));
            }
        } catch (e) {
            responsesList = [...DEFAULT_RESPONSES];
        }
    }
}

// アンケートの保存
async function saveSurveyToStorage(survey, isNew = false) {
    const idx = surveysList.findIndex(s => s.id === survey.id);
    if (idx >= 0) {
        surveysList[idx] = survey;
    } else {
        surveysList.unshift(survey);
    }
    try {
        localStorage.setItem(STORAGE_KEY_SURVEYS, JSON.stringify(surveysList));
    } catch (e) {
        console.error(e);
    }

    if (supabase) {
        try {
            if (isNew) {
                await supabase.from('surveys').insert([survey]);
            } else {
                await supabase.from('surveys').update(survey).eq('id', survey.id);
            }
        } catch (e) {
            console.warn('Supabase survey save failed:', e);
        }
    }
}

// アンケートの削除
async function deleteSurveyFromStorage(surveyId) {
    surveysList = surveysList.filter(s => s.id !== surveyId);
    responsesList = responsesList.filter(r => r.survey_id !== surveyId);
    try {
        localStorage.setItem(STORAGE_KEY_SURVEYS, JSON.stringify(surveysList));
        localStorage.setItem(STORAGE_KEY_RESPONSES, JSON.stringify(responsesList));
    } catch (e) {
        console.error(e);
    }

    if (supabase) {
        try {
            await supabase.from('survey_responses').delete().eq('survey_id', surveyId);
            await supabase.from('surveys').delete().eq('id', surveyId);
        } catch (e) {
            console.warn('Supabase survey delete failed:', e);
        }
    }
}

// 回答の保存（ゲスト送信含む）
export async function saveSurveyResponse(response) {
    responsesList.unshift(response);
    try {
        localStorage.setItem(STORAGE_KEY_RESPONSES, JSON.stringify(responsesList));
    } catch (e) {
        console.error(e);
    }

    if (supabase) {
        try {
            await supabase.from('survey_responses').insert([response]);
        } catch (e) {
            console.warn('Supabase response insert failed:', e);
        }
    }
}

// ==========================================
// アンケート一覧のレンダリング (Infoタブ内)
// ==========================================
export function renderSurveyList() {
    const container = document.getElementById('info-surveys-container');
    const emptyEl = document.getElementById('info-surveys-empty');
    const btnNew = document.getElementById('btn-survey-new');

    if (!container) return;

    if (btnNew) {
        if (canManage) {
            btnNew.classList.remove('hidden');
        } else {
            btnNew.classList.add('hidden');
        }
    }

    if (surveysList.length === 0) {
        container.innerHTML = '';
        if (emptyEl) emptyEl.classList.remove('hidden');
        return;
    }
    if (emptyEl) emptyEl.classList.add('hidden');

    container.innerHTML = surveysList.map(survey => {
        const surveyResponses = responsesList.filter(r => r.survey_id === survey.id);
        const respCount = surveyResponses.length;
        const totalAmount = surveyResponses.reduce((sum, r) => sum + (Number(r.total_amount) || 0), 0);
        
        let statusBadge = '';
        if (survey.status === 'active') {
            statusBadge = '<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">🟢 受付中</span>';
        } else if (survey.status === 'closed') {
            statusBadge = '<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">⚪ 締切済み</span>';
        } else {
            statusBadge = '<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">🟡 下書き</span>';
        }

        const features = [];
        if (survey.enable_schedule) features.push('📅 日程調整');
        if (survey.enable_family) features.push('👨‍👩‍👧 家族一括');
        if (survey.enable_orders) features.push('🛒 注文集計');

        return `
            <div class="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between gap-2 mb-3">
                        ${statusBadge}
                        <span class="text-xs text-gray-400 font-mono">期限: ${survey.deadline || 'なし'}</span>
                    </div>
                    <h3 class="text-base font-bold text-gray-900 mb-2 leading-snug">
                        ${escapeHtml(survey.title)}
                    </h3>
                    <p class="text-xs text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                        ${escapeHtml(survey.description || '')}
                    </p>
                    <div class="flex flex-wrap gap-1.5 mb-4">
                        ${features.map(f => `<span class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-gray-100 text-gray-600 border border-gray-200">${f}</span>`).join('')}
                    </div>
                    <!-- 回答統計サマリー -->
                    <div class="bg-gray-50 rounded-xl p-3 border border-gray-100 flex items-center justify-around text-center mb-4">
                        <div>
                            <span class="block text-[11px] text-gray-400 font-bold">回答数</span>
                            <span class="text-base font-extrabold text-teal-600">${respCount} <span class="text-xs font-normal">件</span></span>
                        </div>
                        ${survey.enable_orders ? `
                        <div class="border-l border-gray-200 pl-4">
                            <span class="block text-[11px] text-gray-400 font-bold">注文合計額</span>
                            <span class="text-base font-extrabold text-purple-600">¥${totalAmount.toLocaleString()}</span>
                        </div>
                        ` : ''}
                    </div>
                </div>

                <!-- アクションボタン群 -->
                <div class="pt-3 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2">
                    <div class="flex items-center gap-2">
                        <button class="btn-survey-respond px-3 py-1.5 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition shadow-xs flex items-center gap-1 cursor-pointer" data-id="${survey.id}">
                            <span>📝</span><span>回答する</span>
                        </button>
                        <button class="btn-survey-share px-2.5 py-1.5 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition border border-gray-200 cursor-pointer" data-id="${survey.id}" title="回答用URLをコピー">
                            <span>🔗 共有URL</span>
                        </button>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <button class="btn-survey-results px-3 py-1.5 text-xs font-bold bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition border border-purple-200 cursor-pointer" data-id="${survey.id}">
                            📊 集計・CSV
                        </button>
                        ${canManage ? `
                        <button class="btn-survey-edit text-xs text-gray-400 hover:text-blue-600 p-1.5 rounded hover:bg-gray-100 transition cursor-pointer" data-id="${survey.id}" title="編集">
                            ✏️
                        </button>
                        <button class="btn-survey-delete text-xs text-gray-400 hover:text-red-600 p-1.5 rounded hover:bg-gray-100 transition cursor-pointer" data-id="${survey.id}" title="削除">
                            🗑️
                        </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // イベントバインド
    container.querySelectorAll('.btn-survey-respond').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            openSurveyResponsePage(id);
        });
    });

    container.querySelectorAll('.btn-survey-share').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            copySurveyUrl(id);
        });
    });

    container.querySelectorAll('.btn-survey-results').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            openSurveyResultsModal(id);
        });
    });

    if (canManage) {
        container.querySelectorAll('.btn-survey-edit').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const survey = surveysList.find(s => s.id === id);
                if (survey) openSurveyEditor(survey);
            });
        });

        container.querySelectorAll('.btn-survey-delete').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.getAttribute('data-id');
                const survey = surveysList.find(s => s.id === id);
                if (!survey) return;
                if (confirm(`アンケート「${survey.title}」と、そのすべての回答データを削除しますか？`)) {
                    await deleteSurveyFromStorage(id);
                    renderSurveyList();
                }
            });
        });
    }
}

// 回答用URLのコピー
function copySurveyUrl(surveyId) {
    const url = `${window.location.origin}${window.location.pathname}#survey-${surveyId}`;
    navigator.clipboard.writeText(url).then(() => {
        alert(`アンケート回答用URLをコピーしました！\nLINEやメール等に貼り付けてご案内いただけます。\n\n${url}`);
    }).catch(() => {
        prompt('アンケート回答用URL:', url);
    });
}

// ==========================================
// アンケート作成・編集モーダル
// ==========================================
let editingSurveyId = null;
let currentEditorQuestions = [];
let currentEditorScheduleOptions = [];
let currentEditorOrderItems = [];

export function openSurveyEditor(survey = null) {
    const modal = document.getElementById('modal-survey-editor');
    if (!modal) return;

    editingSurveyId = survey ? survey.id : null;
    document.getElementById('survey-editor-modal-title').textContent = survey ? 'アンケートの編集' : '新規アンケート作成';
    document.getElementById('input-survey-title').value = survey ? survey.title : '';
    document.getElementById('input-survey-desc').value = survey ? (survey.description || '') : '';
    document.getElementById('select-survey-status').value = survey ? survey.status : 'active';
    document.getElementById('input-survey-deadline').value = survey ? (survey.deadline || '') : '';

    const chkSchedule = document.getElementById('chk-survey-enable-schedule');
    const chkFamily = document.getElementById('chk-survey-enable-family');
    const chkOrders = document.getElementById('chk-survey-enable-orders');

    chkSchedule.checked = survey ? Boolean(survey.enable_schedule) : true;
    chkFamily.checked = survey ? Boolean(survey.enable_family) : true;
    chkOrders.checked = survey ? Boolean(survey.enable_orders) : false;

    currentEditorScheduleOptions = survey && survey.schedule_options ? [...survey.schedule_options] : [
        '7/18(土) 午前', '7/18(土) 午後', '7/19(日) 終日'
    ];

    currentEditorOrderItems = survey && survey.order_items ? JSON.parse(JSON.stringify(survey.order_items)) : [
        { id: `item_${Date.now()}_1`, name: '選手用お弁当', price: 600, max: 10 },
        { id: `item_${Date.now()}_2`, name: '保護者用お弁当', price: 700, max: 10 }
    ];

    currentEditorQuestions = survey && survey.questions ? JSON.parse(JSON.stringify(survey.questions)) : [];

    renderEditorScheduleOptions();
    renderEditorOrderItems();
    renderEditorQuestions();

    updateEditorSectionToggles();
    modal.classList.remove('hidden');
}

export function closeSurveyEditor() {
    const modal = document.getElementById('modal-survey-editor');
    if (modal) modal.classList.add('hidden');
    editingSurveyId = null;
}

function updateEditorSectionToggles() {
    const isSchedule = document.getElementById('chk-survey-enable-schedule')?.checked;
    const isOrders = document.getElementById('chk-survey-enable-orders')?.checked;

    const secSchedule = document.getElementById('editor-schedule-section');
    const secOrders = document.getElementById('editor-orders-section');

    if (secSchedule) secSchedule.style.display = isSchedule ? 'block' : 'none';
    if (secOrders) secOrders.style.display = isOrders ? 'block' : 'none';
}

function renderEditorScheduleOptions() {
    const container = document.getElementById('editor-schedule-list');
    if (!container) return;

    container.innerHTML = currentEditorScheduleOptions.map((opt, idx) => `
        <div class="flex items-center gap-2 mb-2">
            <span class="text-xs font-bold text-gray-400 w-5">#${idx + 1}</span>
            <input type="text" class="input-sched-opt flex-grow border border-gray-300 rounded-lg p-1.5 text-xs focus:ring-2 focus:ring-teal-500" value="${escapeHtml(opt)}" data-index="${idx}" placeholder="例: 7/18(土) 午前 (9:00〜12:00)">
            <button class="btn-del-sched-opt text-xs text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded" data-index="${idx}">🗑️</button>
        </div>
    `).join('');

    container.querySelectorAll('.input-sched-opt').forEach(input => {
        input.addEventListener('input', (e) => {
            const idx = Number(e.target.getAttribute('data-index'));
            currentEditorScheduleOptions[idx] = e.target.value;
        });
    });

    container.querySelectorAll('.btn-del-sched-opt').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = Number(btn.getAttribute('data-index'));
            currentEditorScheduleOptions.splice(idx, 1);
            renderEditorScheduleOptions();
        });
    });
}

function renderEditorOrderItems() {
    const container = document.getElementById('editor-orders-list');
    if (!container) return;

    container.innerHTML = currentEditorOrderItems.map((item, idx) => `
        <div class="grid grid-cols-12 gap-2 mb-2 items-center bg-gray-50/70 p-2 rounded-lg border border-gray-200">
            <div class="col-span-6">
                <input type="text" class="input-order-name w-full border border-gray-300 rounded p-1 text-xs" value="${escapeHtml(item.name)}" data-index="${idx}" placeholder="商品・品目名 (例: お弁当)">
            </div>
            <div class="col-span-3 flex items-center gap-1">
                <span class="text-xs text-gray-500">¥</span>
                <input type="number" class="input-order-price w-full border border-gray-300 rounded p-1 text-xs" value="${item.price}" data-index="${idx}" placeholder="単価">
            </div>
            <div class="col-span-2">
                <input type="number" class="input-order-max w-full border border-gray-300 rounded p-1 text-xs" value="${item.max || 10}" data-index="${idx}" placeholder="上限">
            </div>
            <div class="col-span-1 text-right">
                <button class="btn-del-order-item text-xs text-red-500 hover:text-red-700 p-1" data-index="${idx}">🗑️</button>
            </div>
        </div>
    `).join('');

    container.querySelectorAll('.input-order-name').forEach(el => {
        el.addEventListener('input', (e) => {
            const idx = Number(e.target.getAttribute('data-index'));
            currentEditorOrderItems[idx].name = e.target.value;
        });
    });
    container.querySelectorAll('.input-order-price').forEach(el => {
        el.addEventListener('input', (e) => {
            const idx = Number(e.target.getAttribute('data-index'));
            currentEditorOrderItems[idx].price = Number(e.target.value) || 0;
        });
    });
    container.querySelectorAll('.input-order-max').forEach(el => {
        el.addEventListener('input', (e) => {
            const idx = Number(e.target.getAttribute('data-index'));
            currentEditorOrderItems[idx].max = Number(e.target.value) || 10;
        });
    });
    container.querySelectorAll('.btn-del-order-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = Number(btn.getAttribute('data-index'));
            currentEditorOrderItems.splice(idx, 1);
            renderEditorOrderItems();
        });
    });
}

function renderEditorQuestions() {
    const container = document.getElementById('editor-questions-list');
    if (!container) return;

    if (currentEditorQuestions.length === 0) {
        container.innerHTML = '<p class="text-xs text-gray-400 py-3 text-center border border-dashed rounded-lg">設問がありません。「＋ 設問を追加」ボタンで追加してください。</p>';
        return;
    }

    container.innerHTML = currentEditorQuestions.map((q, qIdx) => {
        const otherQuestions = currentEditorQuestions.filter((_, i) => i > qIdx);
        return `
            <div class="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-4" data-q-index="${qIdx}">
                <div class="flex items-center justify-between gap-2 mb-2">
                    <div class="flex items-center gap-2">
                        <span class="px-2 py-0.5 rounded bg-teal-600 text-white text-xs font-bold">設問 ${qIdx + 1}</span>
                        <select class="select-q-type border border-gray-300 rounded p-1 text-xs bg-white font-bold text-gray-700" data-q-index="${qIdx}">
                            <option value="single" ${q.type === 'single' ? 'selected' : ''}>単一選択 (ラジオボタン)</option>
                            <option value="multiple" ${q.type === 'multiple' ? 'selected' : ''}>複数選択 (チェックボックス)</option>
                            <option value="text" ${q.type === 'text' ? 'selected' : ''}>自由記述 (テキスト入力)</option>
                        </select>
                        <label class="flex items-center gap-1 text-xs text-gray-600 font-bold ml-2">
                            <input type="checkbox" class="chk-q-req rounded text-teal-600" data-q-index="${qIdx}" ${q.required ? 'checked' : ''}>
                            <span>必須</span>
                        </label>
                    </div>
                    <div class="flex items-center gap-1">
                        ${qIdx > 0 ? `<button class="btn-move-q-up text-xs text-gray-500 hover:text-gray-800 p-1" data-q-index="${qIdx}" title="上に移動">▲</button>` : ''}
                        ${qIdx < currentEditorQuestions.length - 1 ? `<button class="btn-move-q-down text-xs text-gray-500 hover:text-gray-800 p-1" data-q-index="${qIdx}" title="下に移動">▼</button>` : ''}
                        <button class="btn-del-q text-xs text-red-500 hover:text-red-700 p-1 font-bold ml-1" data-q-index="${qIdx}">削除</button>
                    </div>
                </div>

                <div class="mb-3">
                    <input type="text" class="input-q-title w-full border border-gray-300 rounded-lg p-2 text-xs font-bold text-gray-800" value="${escapeHtml(q.title)}" data-q-index="${qIdx}" placeholder="設問のタイトルを入力してください">
                </div>

                <!-- 選択肢セクション (single または multiple の場合) -->
                ${(q.type === 'single' || q.type === 'multiple') ? `
                <div class="pl-3 border-l-2 border-teal-300 mb-2">
                    <label class="block text-[11px] font-bold text-gray-500 mb-1.5">選択肢一覧 &amp; 設問スキップ設定:</label>
                    <div class="space-y-2">
                        ${(q.options || []).map((opt, optIdx) => `
                            <div class="flex items-center gap-2">
                                <input type="text" class="input-opt-label flex-grow border border-gray-300 rounded p-1.5 text-xs" value="${escapeHtml(opt.label)}" data-q-index="${qIdx}" data-opt-index="${optIdx}" placeholder="選択肢 ${optIdx + 1}">
                                ${q.type === 'single' ? `
                                <div class="flex items-center gap-1 shrink-0 bg-white border border-gray-200 rounded px-2 py-1">
                                    <span class="text-[10px] text-gray-500 font-bold">スキップ先:</span>
                                    <select class="select-opt-skip text-xs border-0 bg-transparent text-teal-700 font-bold focus:ring-0" data-q-index="${qIdx}" data-opt-index="${optIdx}">
                                        <option value="">(通常通り次へ)</option>
                                        ${otherQuestions.map((oq, oqIdx) => `<option value="${oq.id}" ${opt.skip_to === oq.id ? 'selected' : ''}>設問 ${qIdx + 2 + oqIdx}へジャンプ</option>`).join('')}
                                    </select>
                                </div>
                                ` : ''}
                                <button class="btn-del-opt text-xs text-gray-400 hover:text-red-600 p-1" data-q-index="${qIdx}" data-opt-index="${optIdx}">✕</button>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn-add-opt mt-2 text-xs font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1 cursor-pointer" data-q-index="${qIdx}">
                        <span>＋ 選択肢を追加</span>
                    </button>
                </div>
                ` : ''}

                <div>
                    <input type="text" class="input-q-help w-full border border-gray-200 rounded p-1.5 text-[11px] text-gray-500 bg-white" value="${escapeHtml(q.help || '')}" data-q-index="${qIdx}" placeholder="補足説明・注釈 (任意)">
                </div>
            </div>
        `;
    }).join('');

    // 各種変更イベントリスナーの登録
    container.querySelectorAll('.input-q-title').forEach(el => {
        el.addEventListener('input', (e) => {
            const qIdx = Number(e.target.getAttribute('data-q-index'));
            currentEditorQuestions[qIdx].title = e.target.value;
        });
    });
    container.querySelectorAll('.input-q-help').forEach(el => {
        el.addEventListener('input', (e) => {
            const qIdx = Number(e.target.getAttribute('data-q-index'));
            currentEditorQuestions[qIdx].help = e.target.value;
        });
    });
    container.querySelectorAll('.select-q-type').forEach(el => {
        el.addEventListener('change', (e) => {
            const qIdx = Number(e.target.getAttribute('data-q-index'));
            currentEditorQuestions[qIdx].type = e.target.value;
            if (!currentEditorQuestions[qIdx].options || currentEditorQuestions[qIdx].options.length === 0) {
                currentEditorQuestions[qIdx].options = [{ label: '選択肢 1', skip_to: null }, { label: '選択肢 2', skip_to: null }];
            }
            renderEditorQuestions();
        });
    });
    container.querySelectorAll('.chk-q-req').forEach(el => {
        el.addEventListener('change', (e) => {
            const qIdx = Number(e.target.getAttribute('data-q-index'));
            currentEditorQuestions[qIdx].required = e.target.checked;
        });
    });
    container.querySelectorAll('.btn-del-q').forEach(btn => {
        btn.addEventListener('click', () => {
            const qIdx = Number(btn.getAttribute('data-q-index'));
            currentEditorQuestions.splice(qIdx, 1);
            renderEditorQuestions();
        });
    });
    container.querySelectorAll('.btn-move-q-up').forEach(btn => {
        btn.addEventListener('click', () => {
            const qIdx = Number(btn.getAttribute('data-q-index'));
            if (qIdx > 0) {
                const temp = currentEditorQuestions[qIdx];
                currentEditorQuestions[qIdx] = currentEditorQuestions[qIdx - 1];
                currentEditorQuestions[qIdx - 1] = temp;
                renderEditorQuestions();
            }
        });
    });
    container.querySelectorAll('.btn-move-q-down').forEach(btn => {
        btn.addEventListener('click', () => {
            const qIdx = Number(btn.getAttribute('data-q-index'));
            if (qIdx < currentEditorQuestions.length - 1) {
                const temp = currentEditorQuestions[qIdx];
                currentEditorQuestions[qIdx] = currentEditorQuestions[qIdx + 1];
                currentEditorQuestions[qIdx + 1] = temp;
                renderEditorQuestions();
            }
        });
    });
    container.querySelectorAll('.btn-add-opt').forEach(btn => {
        btn.addEventListener('click', () => {
            const qIdx = Number(btn.getAttribute('data-q-index'));
            if (!currentEditorQuestions[qIdx].options) currentEditorQuestions[qIdx].options = [];
            currentEditorQuestions[qIdx].options.push({ label: `選択肢 ${currentEditorQuestions[qIdx].options.length + 1}`, skip_to: null });
            renderEditorQuestions();
        });
    });
    container.querySelectorAll('.input-opt-label').forEach(el => {
        el.addEventListener('input', (e) => {
            const qIdx = Number(e.target.getAttribute('data-q-index'));
            const optIdx = Number(e.target.getAttribute('data-opt-index'));
            currentEditorQuestions[qIdx].options[optIdx].label = e.target.value;
        });
    });
    container.querySelectorAll('.select-opt-skip').forEach(el => {
        el.addEventListener('change', (e) => {
            const qIdx = Number(e.target.getAttribute('data-q-index'));
            const optIdx = Number(e.target.getAttribute('data-opt-index'));
            currentEditorQuestions[qIdx].options[optIdx].skip_to = e.target.value || null;
        });
    });
    container.querySelectorAll('.btn-del-opt').forEach(btn => {
        btn.addEventListener('click', () => {
            const qIdx = Number(btn.getAttribute('data-q-index'));
            const optIdx = Number(btn.getAttribute('data-opt-index'));
            currentEditorQuestions[qIdx].options.splice(optIdx, 1);
            renderEditorQuestions();
        });
    });
}

// フォーム保存ハンドラ
async function handleSaveSurvey() {
    const title = document.getElementById('input-survey-title')?.value.trim();
    if (!title) {
        alert('アンケートのタイトルを入力してください');
        return;
    }

    const description = document.getElementById('input-survey-desc')?.value.trim() || '';
    const status = document.getElementById('select-survey-status')?.value || 'active';
    const deadline = document.getElementById('input-survey-deadline')?.value.trim() || '';

    const enable_schedule = document.getElementById('chk-survey-enable-schedule')?.checked || false;
    const enable_family = document.getElementById('chk-survey-enable-family')?.checked || false;
    const enable_orders = document.getElementById('chk-survey-enable-orders')?.checked || false;

    const isNew = !editingSurveyId;
    const today = new Date().toISOString().split('T')[0];

    const survey = {
        id: editingSurveyId || `survey_${Date.now()}`,
        title,
        description,
        status,
        deadline,
        enable_schedule,
        schedule_options: enable_schedule ? currentEditorScheduleOptions.filter(o => o.trim()) : [],
        enable_family,
        enable_orders,
        order_items: enable_orders ? currentEditorOrderItems.filter(i => i.name.trim()) : [],
        questions: currentEditorQuestions,
        created_by: currentAppUser?.name || '管理者',
        created_at: editingSurveyId ? (surveysList.find(s => s.id === editingSurveyId)?.created_at || today) : today,
        updated_at: today
    };

    await saveSurveyToStorage(survey, isNew);
    closeSurveyEditor();
    renderSurveyList();
}

// ==========================================
// 集計・結果確認モーダル & CSV出力
// ==========================================
let activeResultsSurvey = null;

export function openSurveyResultsModal(surveyId) {
    const modal = document.getElementById('modal-survey-results');
    if (!modal) return;

    const survey = surveysList.find(s => s.id === surveyId);
    if (!survey) return;

    activeResultsSurvey = survey;
    const surveyResponses = responsesList.filter(r => r.survey_id === surveyId);

    document.getElementById('results-survey-title').textContent = survey.title;
    document.getElementById('results-survey-subtitle').textContent = `回答数: ${surveyResponses.length}件 | 締切: ${survey.deadline || 'なし'}`;

    renderResultsSummary(survey, surveyResponses);
    renderResultsScheduleMatrix(survey, surveyResponses);
    renderResultsOrders(survey, surveyResponses);
    renderResultsQuestions(survey, surveyResponses);
    renderResultsTable(survey, surveyResponses);

    modal.classList.remove('hidden');
}

export function closeSurveyResultsModal() {
    const modal = document.getElementById('modal-survey-results');
    if (modal) modal.classList.add('hidden');
    activeResultsSurvey = null;
}

function renderResultsSummary(survey, responses) {
    const totalResponses = responses.length;
    let totalFamilyCount = 0;
    responses.forEach(r => {
        if (r.family_members && r.family_members.length > 0) {
            totalFamilyCount += r.family_members.length;
        } else {
            totalFamilyCount += 1;
        }
    });

    const totalAmount = responses.reduce((sum, r) => sum + (Number(r.total_amount) || 0), 0);

    const summaryEl = document.getElementById('results-summary-cards');
    if (!summaryEl) return;

    summaryEl.innerHTML = `
        <div class="bg-teal-50 border border-teal-200 rounded-xl p-4 text-center">
            <span class="text-xs text-teal-700 font-bold block mb-1">総回答件数</span>
            <span class="text-2xl font-black text-teal-800">${totalResponses} <span class="text-xs font-normal">件</span></span>
        </div>
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <span class="text-xs text-blue-700 font-bold block mb-1">参加予定人数 (家族含む)</span>
            <span class="text-2xl font-black text-blue-800">${totalFamilyCount} <span class="text-xs font-normal">名</span></span>
        </div>
        ${survey.enable_orders ? `
        <div class="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
            <span class="text-xs text-purple-700 font-bold block mb-1">注文総額</span>
            <span class="text-2xl font-black text-purple-800">¥${totalAmount.toLocaleString()}</span>
        </div>
        ` : ''}
    `;
}

// 日程調整マトリクス集計の描画
function renderResultsScheduleMatrix(survey, responses) {
    const container = document.getElementById('results-schedule-container');
    if (!container) return;

    if (!survey.enable_schedule || !survey.schedule_options || survey.schedule_options.length === 0) {
        container.classList.add('hidden');
        return;
    }
    container.classList.remove('hidden');

    const scheduleCounts = {};
    survey.schedule_options.forEach(opt => {
        scheduleCounts[opt] = { ok: [], maybe: [], ng: [] };
    });

    responses.forEach(r => {
        const name = r.respondent_name || '無名';
        if (r.schedules) {
            Object.entries(r.schedules).forEach(([opt, val]) => {
                if (scheduleCounts[opt]) {
                    if (val === '○' || val === 'ok') scheduleCounts[opt].ok.push(name);
                    else if (val === '△' || val === 'maybe') scheduleCounts[opt].maybe.push(name);
                    else if (val === '×' || val === 'ng') scheduleCounts[opt].ng.push(name);
                }
            });
        }
    });

    const tbody = document.getElementById('results-schedule-tbody');
    if (!tbody) return;

    tbody.innerHTML = survey.schedule_options.map(opt => {
        const item = scheduleCounts[opt];
        const okNames = item.ok.join('、 ');
        return `
            <tr class="border-b border-gray-100 hover:bg-gray-50/50">
                <td class="px-3 py-2.5 font-bold text-gray-800 whitespace-nowrap">${escapeHtml(opt)}</td>
                <td class="px-3 py-2.5 text-center font-extrabold text-emerald-600 bg-emerald-50/30">
                    ${item.ok.length}
                </td>
                <td class="px-3 py-2.5 text-center font-bold text-amber-600">
                    ${item.maybe.length}
                </td>
                <td class="px-3 py-2.5 text-center font-bold text-gray-400">
                    ${item.ng.length}
                </td>
                <td class="px-3 py-2.5 text-xs text-gray-600 max-w-xs truncate" title="${escapeHtml(okNames)}">
                    ${escapeHtml(okNames) || '<span class="text-gray-300">なし</span>'}
                </td>
            </tr>
        `;
    }).join('');
}

// 注文・金額集計の描画
function renderResultsOrders(survey, responses) {
    const container = document.getElementById('results-orders-container');
    if (!container) return;

    if (!survey.enable_orders || !survey.order_items || survey.order_items.length === 0) {
        container.classList.add('hidden');
        return;
    }
    container.classList.remove('hidden');

    const itemTotals = {};
    survey.order_items.forEach(item => {
        itemTotals[item.id] = { name: item.name, price: item.price, count: 0 };
    });

    responses.forEach(r => {
        if (r.orders) {
            Object.entries(r.orders).forEach(([itemId, qty]) => {
                if (itemTotals[itemId]) {
                    itemTotals[itemId].count += Number(qty) || 0;
                }
            });
        }
    });

    const tbody = document.getElementById('results-orders-tbody');
    if (!tbody) return;

    tbody.innerHTML = survey.order_items.map(item => {
        const st = itemTotals[item.id] || { count: 0 };
        const subtotal = (st.count * item.price);
        return `
            <tr class="border-b border-gray-100 hover:bg-gray-50/50">
                <td class="px-3 py-2.5 font-bold text-gray-800">${escapeHtml(item.name)}</td>
                <td class="px-3 py-2.5 text-right font-mono text-gray-600">¥${item.price.toLocaleString()}</td>
                <td class="px-3 py-2.5 text-center font-extrabold text-purple-600">${st.count} <span class="text-xs font-normal">個</span></td>
                <td class="px-3 py-2.5 text-right font-extrabold text-purple-800 font-mono">¥${subtotal.toLocaleString()}</td>
            </tr>
        `;
    }).join('');
}

// 設問集計の描画
function renderResultsQuestions(survey, responses) {
    const container = document.getElementById('results-questions-list');
    if (!container) return;

    if (!survey.questions || survey.questions.length === 0) {
        container.innerHTML = '<p class="text-xs text-gray-400">設問はありません</p>';
        return;
    }

    container.innerHTML = survey.questions.map((q, idx) => {
        const answers = responses.map(r => r.answers && r.answers[q.id]).filter(a => a !== undefined && a !== null && a !== '');

        if (q.type === 'single' || q.type === 'multiple') {
            const counts = {};
            (q.options || []).forEach(opt => counts[opt.label] = 0);
            counts['(未回答)'] = 0;

            answers.forEach(a => {
                if (Array.isArray(a)) {
                    a.forEach(val => { counts[val] = (counts[val] || 0) + 1; });
                } else if (counts[a] !== undefined) {
                    counts[a] += 1;
                } else {
                    counts[a] = (counts[a] || 0) + 1;
                }
            });

            const total = responses.length;
            return `
                <div class="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-3">
                    <h4 class="text-xs font-bold text-gray-800 mb-2">設問 ${idx + 1}: ${escapeHtml(q.title)}</h4>
                    <div class="space-y-1.5">
                        ${Object.entries(counts).filter(([k, v]) => k !== '(未回答)' || v > 0).map(([opt, cnt]) => {
                            const pct = total > 0 ? Math.round((cnt / total) * 100) : 0;
                            return `
                                <div>
                                    <div class="flex justify-between text-xs mb-0.5">
                                        <span class="text-gray-700">${escapeHtml(opt)}</span>
                                        <span class="font-bold text-gray-900">${cnt}票 (${pct}%)</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-teal-600 h-2 rounded-full" style="width: ${pct}%"></div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        } else {
            // テキスト回答
            return `
                <div class="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-3">
                    <h4 class="text-xs font-bold text-gray-800 mb-2">設問 ${idx + 1}: ${escapeHtml(q.title)} (${answers.length}件の回答)</h4>
                    <div class="max-h-36 overflow-y-auto space-y-1.5 pr-2 scrollbar-thin">
                        ${answers.length > 0 ? answers.map(a => `
                            <div class="bg-white p-2 rounded border border-gray-200 text-xs text-gray-700">
                                ${escapeHtml(String(a))}
                            </div>
                        `).join('') : '<span class="text-xs text-gray-400">回答がありません</span>'}
                    </div>
                </div>
            `;
        }
    }).join('');
}

// 全回答テーブルの描画
function renderResultsTable(survey, responses) {
    const tbody = document.getElementById('results-responses-tbody');
    if (!tbody) return;

    if (responses.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-6 text-xs text-gray-400">まだ回答がありません</td></tr>';
        return;
    }

    tbody.innerHTML = responses.map(r => {
        const familyStr = (r.family_members || []).map(f => f.name).join('、 ') || '-';
        const ordersSummary = r.orders ? Object.entries(r.orders)
            .filter(([_, q]) => q > 0)
            .map(([itemId, q]) => {
                const it = (survey.order_items || []).find(i => i.id === itemId);
                return `${it ? it.name : itemId} ×${q}`;
            }).join(', ') : '-';

        return `
            <tr class="border-b border-gray-100 hover:bg-gray-50/50 text-xs">
                <td class="px-3 py-2 text-gray-400 whitespace-nowrap">${r.created_at || '-'}</td>
                <td class="px-3 py-2 font-bold text-gray-900 whitespace-nowrap">${escapeHtml(r.respondent_name)}</td>
                <td class="px-3 py-2 text-gray-600 max-w-xs truncate" title="${escapeHtml(familyStr)}">${escapeHtml(familyStr)}</td>
                <td class="px-3 py-2 text-gray-600 max-w-xs truncate" title="${escapeHtml(ordersSummary)}">${escapeHtml(ordersSummary)}</td>
                <td class="px-3 py-2 text-right font-mono font-bold text-purple-700">¥${(Number(r.total_amount) || 0).toLocaleString()}</td>
            </tr>
        `;
    }).join('');
}

// ==========================================
// CSV出力機能 (BOM付きUTF-8)
// ==========================================
export function exportSurveyResultsCSV() {
    if (!activeResultsSurvey) return;
    const survey = activeResultsSurvey;
    const responses = responsesList.filter(r => r.survey_id === survey.id);

    // ヘッダー構築
    const headers = ['回答ID', '回答日時', '回答者(代表者名)'];

    if (survey.enable_family) {
        headers.push('家族メンバー一覧');
    }

    if (survey.enable_schedule && survey.schedule_options) {
        survey.schedule_options.forEach(opt => {
            headers.push(`日程: ${opt}`);
        });
    }

    if (survey.questions) {
        survey.questions.forEach((q, idx) => {
            headers.push(`設問${idx + 1}: ${q.title}`);
        });
    }

    if (survey.enable_orders && survey.order_items) {
        survey.order_items.forEach(item => {
            headers.push(`注文: ${item.name} (${item.price}円)`);
        });
        headers.push('注文合計金額(円)');
    }

    const rows = [headers];

    responses.forEach(r => {
        const row = [
            r.id,
            r.created_at || '',
            r.respondent_name || ''
        ];

        if (survey.enable_family) {
            const familyStr = (r.family_members || []).map(f => `${f.name}${f.role ? `(${f.role})` : ''}`).join(', ');
            row.push(familyStr);
        }

        if (survey.enable_schedule && survey.schedule_options) {
            survey.schedule_options.forEach(opt => {
                row.push((r.schedules && r.schedules[opt]) || '');
            });
        }

        if (survey.questions) {
            survey.questions.forEach(q => {
                const ans = r.answers ? r.answers[q.id] : '';
                if (Array.isArray(ans)) {
                    row.push(ans.join('; '));
                } else {
                    row.push(ans || '');
                }
            });
        }

        if (survey.enable_orders && survey.order_items) {
            survey.order_items.forEach(item => {
                const qty = (r.orders && r.orders[item.id]) || 0;
                row.push(qty);
            });
            row.push(r.total_amount || 0);
        }

        rows.push(row);
    });

    const csvContent = rows.map(r => r.map(c => `"${String(c || '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const dateStr = new Date().toISOString().split('T')[0];
    link.download = `survey_${survey.id}_${dateStr}.csv`;
    link.click();
}

// ==========================================
// 公開回答画面 (ゲスト回答対応)
// ==========================================
let activeRespondingSurvey = null;
let currentRespondingFamily = [];

export async function openSurveyResponsePage(surveyId) {
    setupSurveyAdminEvents();
    if (!surveysList || surveysList.length === 0) {
        await loadSurveyData();
    }
    const survey = surveysList.find(s => s.id === surveyId);
    if (!survey) {
        alert('指定されたアンケートが見つかりませんでした。');
        return;
    }

    activeRespondingSurvey = survey;
    currentRespondingFamily = [];

    // 画面切り替え
    ['auth-view', 'signup-view', 'password-reset-view', 'password-update-view', 'app-menu-view', 'app-view', 'attendance-view', 'view-users', 'dashboard-view', 'dashboard-settings', 'position-simulator-view', 'info-view'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    const respondView = document.getElementById('survey-respond-view');
    if (respondView) respondView.classList.remove('hidden');

    document.getElementById('respond-survey-title').textContent = survey.title;
    document.getElementById('respond-survey-desc').innerHTML = survey.description ? survey.description.replace(/\n/g, '<br>') : '';
    document.getElementById('respond-survey-deadline').textContent = survey.deadline ? `回答期限: ${survey.deadline}` : '';

    // 回答者名（ログイン中なら初期設定）
    const nameInput = document.getElementById('input-respondent-name');
    if (nameInput) {
        nameInput.value = (currentAppUser && currentAppUser.name) ? currentAppUser.name : '';
    }

    renderRespondingFamilySection(survey);
    renderRespondingScheduleSection(survey);
    renderRespondingQuestionsSection(survey);
    renderRespondingOrdersSection(survey);

    // 完了表示のリセット
    document.getElementById('survey-respond-form-container')?.classList.remove('hidden');
    document.getElementById('survey-respond-success-container')?.classList.add('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderRespondingFamilySection(survey) {
    const sec = document.getElementById('respond-family-section');
    if (!sec) return;

    if (!survey.enable_family) {
        sec.classList.add('hidden');
        return;
    }
    sec.classList.remove('hidden');

    const listEl = document.getElementById('respond-family-list');
    if (!listEl) return;

    listEl.innerHTML = currentRespondingFamily.map((fam, idx) => `
        <div class="flex items-center gap-2 mb-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
            <input type="text" class="input-fam-name flex-grow border border-gray-300 rounded-lg p-2 text-xs" value="${escapeHtml(fam.name)}" data-index="${idx}" placeholder="ご家族・選手のお名前 (例: 翔太)">
            <select class="select-fam-role border border-gray-300 rounded-lg p-2 text-xs bg-white font-bold" data-index="${idx}">
                <option value="選手" ${fam.role === '選手' ? 'selected' : ''}>選手</option>
                <option value="保護者" ${fam.role === '保護者' ? 'selected' : ''}>保護者</option>
                <option value="兄弟・姉妹" ${fam.role === '兄弟・姉妹' ? 'selected' : ''}>兄弟・姉妹</option>
                <option value="その他" ${fam.role === 'その他' ? 'selected' : ''}>その他</option>
            </select>
            <button class="btn-del-fam text-xs text-red-500 hover:text-red-700 p-2" data-index="${idx}">🗑️</button>
        </div>
    `).join('');

    listEl.querySelectorAll('.input-fam-name').forEach(el => {
        el.addEventListener('input', (e) => {
            const idx = Number(e.target.getAttribute('data-index'));
            currentRespondingFamily[idx].name = e.target.value;
        });
    });
    listEl.querySelectorAll('.select-fam-role').forEach(el => {
        el.addEventListener('change', (e) => {
            const idx = Number(e.target.getAttribute('data-index'));
            currentRespondingFamily[idx].role = e.target.value;
        });
    });
    listEl.querySelectorAll('.btn-del-fam').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = Number(btn.getAttribute('data-index'));
            currentRespondingFamily.splice(idx, 1);
            renderRespondingFamilySection(survey);
        });
    });
}

function renderRespondingScheduleSection(survey) {
    const sec = document.getElementById('respond-schedule-section');
    if (!sec) return;

    if (!survey.enable_schedule || !survey.schedule_options || survey.schedule_options.length === 0) {
        sec.classList.add('hidden');
        return;
    }
    sec.classList.remove('hidden');

    const container = document.getElementById('respond-schedule-list');
    if (!container) return;

    container.innerHTML = survey.schedule_options.map((opt, idx) => `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl border border-gray-200 bg-white mb-2.5">
            <span class="text-xs font-bold text-gray-800">${escapeHtml(opt)}</span>
            <div class="flex items-center gap-4">
                <label class="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-100 transition">
                    <input type="radio" name="respond_sched_${idx}" value="○" checked class="text-emerald-600 focus:ring-emerald-500">
                    <span>○ (参加)</span>
                </label>
                <label class="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 hover:bg-amber-100 transition">
                    <input type="radio" name="respond_sched_${idx}" value="△" class="text-amber-600 focus:ring-amber-500">
                    <span>△ (未定)</span>
                </label>
                <label class="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 transition">
                    <input type="radio" name="respond_sched_${idx}" value="×" class="text-gray-600 focus:ring-gray-500">
                    <span>× (不参加)</span>
                </label>
            </div>
        </div>
    `).join('');
}

function renderRespondingQuestionsSection(survey) {
    const sec = document.getElementById('respond-questions-section');
    if (!sec) return;

    if (!survey.questions || survey.questions.length === 0) {
        sec.classList.add('hidden');
        return;
    }
    sec.classList.remove('hidden');

    const container = document.getElementById('respond-questions-list');
    if (!container) return;

    container.innerHTML = survey.questions.map((q, idx) => `
        <div id="respond-q-block-${q.id}" class="respond-q-block p-4 rounded-xl border border-gray-200 bg-white mb-4 transition-all" data-q-id="${q.id}">
            <div class="flex items-start gap-2 mb-2">
                <span class="px-2 py-0.5 rounded bg-teal-100 text-teal-800 text-xs font-bold shrink-0">Q${idx + 1}</span>
                <div>
                    <h4 class="text-xs font-bold text-gray-900 leading-snug">
                        ${escapeHtml(q.title)}
                        ${q.required ? '<span class="text-red-500 ml-1">*必須</span>' : ''}
                    </h4>
                    ${q.help ? `<p class="text-[11px] text-gray-500 mt-0.5">${escapeHtml(q.help)}</p>` : ''}
                </div>
            </div>

            <div class="mt-3 pl-2">
                ${renderQuestionInputHtml(q)}
            </div>
        </div>
    `).join('');

    // 設問スキップロジックのイベント登録
    container.querySelectorAll('input[type="radio"].q-opt-radio').forEach(radio => {
        radio.addEventListener('change', () => {
            evaluateSkipLogic(survey);
        });
    });

    evaluateSkipLogic(survey);
}

function renderQuestionInputHtml(q) {
    if (q.type === 'single') {
        return (q.options || []).map((opt, optIdx) => `
            <label class="flex items-center gap-2 cursor-pointer text-xs text-gray-700 mb-2 hover:text-teal-700">
                <input type="radio" name="respond_ans_${q.id}" value="${escapeHtml(opt.label)}" class="q-opt-radio text-teal-600 focus:ring-teal-500" data-q-id="${q.id}" data-skip-to="${opt.skip_to || ''}" ${optIdx === 0 ? 'checked' : ''}>
                <span>${escapeHtml(opt.label)}</span>
            </label>
        `).join('');
    } else if (q.type === 'multiple') {
        return (q.options || []).map(opt => `
            <label class="flex items-center gap-2 cursor-pointer text-xs text-gray-700 mb-2 hover:text-teal-700">
                <input type="checkbox" name="respond_ans_${q.id}" value="${escapeHtml(opt.label)}" class="rounded text-teal-600 focus:ring-teal-500">
                <span>${escapeHtml(opt.label)}</span>
            </label>
        `).join('');
    } else {
        return `
            <textarea name="respond_ans_${q.id}" rows="3" class="w-full border border-gray-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-teal-500 outline-none" placeholder="回答を入力してください..."></textarea>
        `;
    }
}

// 設問スキップ（条件分岐）評価
function evaluateSkipLogic(survey) {
    if (!survey.questions) return;

    let skippedIds = new Set();

    survey.questions.forEach((q, idx) => {
        if (q.type === 'single') {
            const checked = document.querySelector(`input[name="respond_ans_${q.id}"]:checked`);
            if (checked) {
                const skipTo = checked.getAttribute('data-skip-to');
                if (skipTo) {
                    // q の直後から skipTo の直前までをスキップ対象にする
                    const targetIdx = survey.questions.findIndex(t => t.id === skipTo);
                    if (targetIdx > idx) {
                        for (let k = idx + 1; k < targetIdx; k++) {
                            skippedIds.add(survey.questions[k].id);
                        }
                    }
                }
            }
        }
    });

    survey.questions.forEach(q => {
        const block = document.getElementById(`respond-q-block-${q.id}`);
        if (block) {
            if (skippedIds.has(q.id)) {
                block.classList.add('opacity-40', 'bg-gray-100', 'pointer-events-none');
                const badge = block.querySelector('.skip-badge');
                if (!badge) {
                    const skipSpan = document.createElement('span');
                    skipSpan.className = 'skip-badge text-[10px] bg-gray-300 text-gray-700 font-bold px-1.5 py-0.5 rounded ml-2';
                    skipSpan.textContent = 'スキップされました';
                    block.querySelector('h4')?.appendChild(skipSpan);
                }
            } else {
                block.classList.remove('opacity-40', 'bg-gray-100', 'pointer-events-none');
                block.querySelector('.skip-badge')?.remove();
            }
        }
    });
}

function renderRespondingOrdersSection(survey) {
    const sec = document.getElementById('respond-orders-section');
    if (!sec) return;

    if (!survey.enable_orders || !survey.order_items || survey.order_items.length === 0) {
        sec.classList.add('hidden');
        return;
    }
    sec.classList.remove('hidden');

    const listEl = document.getElementById('respond-orders-list');
    if (!listEl) return;

    listEl.innerHTML = survey.order_items.map(item => `
        <div class="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-white mb-2.5">
            <div>
                <span class="block text-xs font-bold text-gray-900">${escapeHtml(item.name)}</span>
                <span class="text-xs text-teal-700 font-mono font-bold">¥${item.price.toLocaleString()}</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-xs text-gray-500">数量:</span>
                <select class="select-order-qty border border-gray-300 rounded-lg p-1.5 text-xs bg-white font-bold" data-item-id="${item.id}" data-price="${item.price}">
                    ${Array.from({ length: (item.max || 10) + 1 }, (_, i) => `<option value="${i}">${i}</option>`).join('')}
                </select>
            </div>
        </div>
    `).join('');

    listEl.querySelectorAll('.select-order-qty').forEach(sel => {
        sel.addEventListener('change', updateRespondingOrderTotal);
    });

    updateRespondingOrderTotal();
}

function updateRespondingOrderTotal() {
    let total = 0;
    document.querySelectorAll('.select-order-qty').forEach(sel => {
        const qty = Number(sel.value) || 0;
        const price = Number(sel.getAttribute('data-price')) || 0;
        total += (qty * price);
    });

    const totalEl = document.getElementById('respond-orders-total-amount');
    if (totalEl) {
        totalEl.textContent = `¥${total.toLocaleString()}`;
    }
}

// 回答の送信処理
export async function handleSubmitSurveyResponse() {
    if (!activeRespondingSurvey) return;
    const survey = activeRespondingSurvey;

    const respondentName = document.getElementById('input-respondent-name')?.value.trim();
    if (!respondentName) {
        alert('回答者（代表者名）を入力してください');
        document.getElementById('input-respondent-name')?.focus();
        return;
    }

    // 日程調整
    const schedules = {};
    if (survey.enable_schedule && survey.schedule_options) {
        survey.schedule_options.forEach((opt, idx) => {
            const checked = document.querySelector(`input[name="respond_sched_${idx}"]:checked`);
            if (checked) {
                schedules[opt] = checked.value;
            }
        });
    }

    // 設問回答
    const answers = {};
    let hasValidationErr = false;
    if (survey.questions) {
        survey.questions.forEach(q => {
            const block = document.getElementById(`respond-q-block-${q.id}`);
            const isSkipped = block && block.classList.contains('opacity-40');
            if (isSkipped) return;

            if (q.type === 'single') {
                const checked = document.querySelector(`input[name="respond_ans_${q.id}"]:checked`);
                if (checked) {
                    answers[q.id] = checked.value;
                } else if (q.required) {
                    hasValidationErr = true;
                }
            } else if (q.type === 'multiple') {
                const checkedList = Array.from(document.querySelectorAll(`input[name="respond_ans_${q.id}"]:checked`)).map(c => c.value);
                answers[q.id] = checkedList;
                if (q.required && checkedList.length === 0) {
                    hasValidationErr = true;
                }
            } else {
                const val = document.querySelector(`textarea[name="respond_ans_${q.id}"]`)?.value.trim();
                answers[q.id] = val || '';
                if (q.required && !val) {
                    hasValidationErr = true;
                }
            }
        });
    }

    if (hasValidationErr) {
        alert('必須の設問に回答してください。');
        return;
    }

    // 注文
    const orders = {};
    let totalAmount = 0;
    if (survey.enable_orders && survey.order_items) {
        document.querySelectorAll('.select-order-qty').forEach(sel => {
            const itemId = sel.getAttribute('data-item-id');
            const qty = Number(sel.value) || 0;
            const price = Number(sel.getAttribute('data-price')) || 0;
            orders[itemId] = qty;
            totalAmount += (qty * price);
        });
    }

    const now = new Date();
    const created_at = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const responseObj = {
        id: `resp_${Date.now()}`,
        survey_id: survey.id,
        respondent_name: respondentName,
        family_members: currentRespondingFamily.filter(f => f.name.trim()),
        schedules,
        answers,
        orders,
        total_amount: totalAmount,
        created_at
    };

    await saveSurveyResponse(responseObj);

    // 完了表示
    document.getElementById('survey-respond-form-container')?.classList.add('hidden');
    document.getElementById('survey-respond-success-container')?.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

// ==========================================
// 管理画面・UIイベント登録
// ==========================================
let isSurveyEventsBound = false;

function setupSurveyAdminEvents() {
    if (isSurveyEventsBound) return;
    isSurveyEventsBound = true;

    // 新規アンケート作成ボタン
    document.getElementById('btn-survey-new')?.addEventListener('click', () => openSurveyEditor());

    // エディタ内トグル
    document.getElementById('chk-survey-enable-schedule')?.addEventListener('change', updateEditorSectionToggles);
    document.getElementById('chk-survey-enable-orders')?.addEventListener('change', updateEditorSectionToggles);

    // 日程候補追加
    document.getElementById('btn-add-sched-opt')?.addEventListener('click', () => {
        currentEditorScheduleOptions.push(`候補日 ${currentEditorScheduleOptions.length + 1}`);
        renderEditorScheduleOptions();
    });

    // 注文品目追加
    document.getElementById('btn-add-order-item')?.addEventListener('click', () => {
        currentEditorOrderItems.push({
            id: `item_${Date.now()}`,
            name: `注文品目 ${currentEditorOrderItems.length + 1}`,
            price: 500,
            max: 10
        });
        renderEditorOrderItems();
    });

    // 設問追加
    document.getElementById('btn-add-question')?.addEventListener('click', () => {
        currentEditorQuestions.push({
            id: `q_${Date.now()}`,
            type: 'single',
            title: `設問 ${currentEditorQuestions.length + 1}`,
            required: false,
            options: [{ label: '選択肢 1', skip_to: null }, { label: '選択肢 2', skip_to: null }],
            help: ''
        });
        renderEditorQuestions();
    });

    // エディタ保存 & 閉じる
    document.getElementById('btn-save-survey')?.addEventListener('click', handleSaveSurvey);
    document.getElementById('btn-close-survey-editor')?.addEventListener('click', closeSurveyEditor);
    document.getElementById('btn-cancel-survey-editor')?.addEventListener('click', closeSurveyEditor);

    // 集計モーダル閉じる & CSV
    document.getElementById('btn-close-survey-results')?.addEventListener('click', closeSurveyResultsModal);
    document.getElementById('btn-export-survey-csv')?.addEventListener('click', exportSurveyResultsCSV);

    // 回答画面: 家族追加
    document.getElementById('btn-respond-add-family')?.addEventListener('click', () => {
        currentRespondingFamily.push({ name: '', role: '選手' });
        if (activeRespondingSurvey) {
            renderRespondingFamilySection(activeRespondingSurvey);
        }
    });

    // 回答画面: 送信
    document.getElementById('btn-submit-survey-response')?.addEventListener('click', handleSubmitSurveyResponse);

    // 回答画面: 完了後の戻るボタン
    document.getElementById('btn-back-from-survey-respond')?.addEventListener('click', () => {
        if (currentAppUser) {
            // ログイン中ならInfo画面に戻る
            const respondView = document.getElementById('survey-respond-view');
            if (respondView) respondView.classList.add('hidden');
            const infoView = document.getElementById('info-view');
            if (infoView) infoView.classList.remove('hidden');
            renderSurveyList();
        } else {
            // 未ログインならトップ画面（auth-view）へ
            const respondView = document.getElementById('survey-respond-view');
            if (respondView) respondView.classList.add('hidden');
            const authView = document.getElementById('auth-view');
            if (authView) authView.classList.remove('hidden');
        }
    });
}
