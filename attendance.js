/**
 * ANTS_BB - 出欠管理・カレンダーモジュール
 * 出欠一覧描画、各種ステータスの算出と可視化
 */

const AttendanceModule = {
  // 出欠ステータスごとのバッジ装飾関数
  getStatusBadge: (status) => {
    switch(status) {
      case 'present': 
        return '<span class="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full flex items-center gap-1.5 w-fit"><span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>出席</span>';
      case 'absent': 
        return '<span class="px-2.5 py-1 bg-rose-50 text-rose-700 text-xs font-semibold rounded-full flex items-center gap-1.5 w-fit"><span class="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>欠席</span>';
      default: 
        return '<span class="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full flex items-center gap-1.5 w-fit"><span class="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>未定</span>';
    }
  },

  // 出欠管理全体のテンプレート描画
  render: (state) => {
    const totalPresent = state.attendance.filter(a => a.status === 'present').length;
    const totalAbsent = state.attendance.filter(a => a.status === 'absent').length;
    const totalMaybe = state.attendance.filter(a => a.status === 'maybe').length;

    return `
      <div class="space-y-8 fade-in">
        <!-- 美しいグラデーションダッシュボードボード -->
        <div class="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.12),transparent)] pointer-events-none"></div>
          <div class="relative z-10">
            <span class="text-xs font-bold text-brand-100 uppercase tracking-wider bg-brand-500/20 px-3 py-1.5 rounded-full">出欠・集計ダッシュボード</span>
            <h2 class="text-3xl font-extrabold mt-3 tracking-tight">活動カレンダー・予定一覧</h2>
            <p class="text-slate-300 text-sm mt-2 max-w-xl">
              近日開催予定の活動日に対する出欠登録・車出し確認を行えます。集計値は自動計算され配車シミュレーションに直結します。
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- 左側：予定カレンダー/リスト -->
          <div class="lg:col-span-2 space-y-5">
            <h3 class="text-lg font-bold text-slate-800 flex items-center gap-2">
              <i data-lucide="calendar" class="w-5 h-5 text-brand-500"></i>
              <span>登録対象の予定一覧</span>
            </h3>

            <div class="space-y-4">
              ${state.events.map(event => `
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition duration-200">
                  <div class="flex flex-wrap justify-between items-start gap-4">
                    <div class="space-y-2">
                      <span class="px-2.5 py-0.5 bg-brand-50 text-brand-600 text-xs font-bold rounded-full">${event.category}</span>
                      <h4 class="text-lg font-bold text-slate-800">${event.title}</h4>
                      <div class="flex flex-wrap gap-4 text-xs text-slate-400">
                        <span class="flex items-center gap-1.5"><i data-lucide="calendar-days" class="w-4 h-4"></i>${event.date} (${event.time}〜)</span>
                        <span class="flex items-center gap-1.5"><i data-lucide="map-pin" class="w-4 h-4"></i>${event.location}</span>
                      </div>
                    </div>
                    
                    <button onclick="showToast('出欠フォームは現在最新データ準備中です。', 'info')" class="px-4 py-2 bg-brand-50 hover:bg-brand-100 text-brand-600 text-xs font-bold rounded-xl transition duration-150">
                      自身の出欠を編集
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- 右側：出欠状況のリアルタイム集計パネル -->
          <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <h3 class="text-lg font-bold text-slate-800 flex items-center gap-2">
              <i data-lucide="pie-chart" class="w-5 h-5 text-brand-500"></i>
              <span>第一回戦 出欠状況</span>
            </h3>
            
            <div class="grid grid-cols-3 gap-4 text-center">
              <div class="bg-emerald-50/40 p-4 rounded-xl border border-emerald-100/20">
                <span class="text-[10px] text-emerald-600 font-bold block mb-1">出席</span>
                <span class="text-2xl font-extrabold text-emerald-700">${totalPresent}</span>
              </div>
              <div class="bg-rose-50/40 p-4 rounded-xl border border-rose-100/20">
                <span class="text-[10px] text-rose-600 font-bold block mb-1">欠席</span>
                <span class="text-2xl font-extrabold text-rose-700">${totalAbsent}</span>
              </div>
              <div class="bg-amber-50/40 p-4 rounded-xl border border-amber-100/20">
                <span class="text-[10px] text-amber-600 font-bold block mb-1">未定</span>
                <span class="text-2xl font-extrabold text-amber-700">${totalMaybe}</span>
              </div>
            </div>

            <!-- 出欠者コメント＆リスト -->
            <div class="border-t border-slate-100 pt-6">
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">メンバー出欠リスト</h4>
              <div class="space-y-4 max-h-[250px] overflow-y-auto pr-2">
                ${state.attendance.map(attendee => `
                  <div class="py-1 border-b border-slate-50 last:border-0">
                    <div class="flex items-center justify-between">
                      <div>
                        <span class="text-sm font-bold text-slate-700">${attendee.name}</span>
                        ${attendee.companions > 0 ? `<span class="text-[10px] text-slate-400 ml-1.5">(保護者等他 ${attendee.companions}名)</span>` : ''}
                      </div>
                      ${AttendanceModule.getStatusBadge(attendee.status)}
                    </div>
                    ${attendee.comment ? `
                      <p class="text-[11px] text-slate-400 mt-1 bg-slate-50/80 p-2 rounded-lg border border-slate-100 flex items-start gap-1">
                        <i data-lucide="message-square" class="w-3 h-3 text-slate-300 mt-0.5"></i>
                        <span>${attendee.comment}</span>
                      </p>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};