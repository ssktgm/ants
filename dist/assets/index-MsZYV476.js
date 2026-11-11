(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();let vn=new Date,kt=[],mt=[],st=[],Gs=[],za=[],Nt=[],Ue=[],cn=[],an=[],gr=!1,vs=[],un=[],$e=[];window.att_multiSelectMode=!1;window.att_selectedDates=new Set;window.att_selectedCategories=new Set;window.att_selectedGroups=new Set;function Zn(e){let t=e.target_group_ids||[];if(t.length===0&&e.target_group_id&&(t=[e.target_group_id]),t.length===0)return{ids:[],name:"全体",color:"#e5e7eb"};const n=mt.filter(a=>t.includes(a.id));return n.length===0?{ids:[],name:"全体",color:"#e5e7eb"}:{ids:t,name:n.map(a=>a.name).join(", "),color:n[0].color||"#e5e7eb",groups:n}}function Vr(e){return e.ids.length===0?'<span class="text-xs border border-gray-300 text-gray-800 px-2 py-0.5 rounded shadow-sm" style="background-color: #e5e7eb">全体</span>':e.groups.map(t=>`<span class="text-xs border border-gray-300 text-gray-800 px-2 py-0.5 rounded shadow-sm" style="background-color: ${t.color||"#e5e7eb"}">${t.name}</span>`).join(" ")}function Gr(e){if(!e)return"-";try{const t=new Date(e);if(isNaN(t.getTime()))return"-";const n=t.getMonth()+1,a=t.getDate(),s=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}/${a} ${s}:${r}`}catch{return"-"}}async function ws(){try{gr||(Ro(),gr=!0),await Dn(),pt(),Oo(),Fo()}catch(e){console.error("Attendance App Init Error:",e),typeof at=="function"&&at()}}function Ro(){var n,a,s,r,o,i,d,l,c,u,g,b,f,y,p,m,w,v,x,k,$,h,E,_,I;const e=document.getElementById("btn-logout-att");if(e&&!document.getElementById("btn-change-password-att")){const S=document.createElement("button");S.id="btn-change-password-att",S.className="text-xs md:text-sm bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 md:px-3 md:py-1 rounded shadow mr-2 font-bold",S.textContent="パスワード変更",S.onclick=()=>lr(),e.parentNode.insertBefore(S,e)}(n=document.getElementById("tab-calendar"))==null||n.addEventListener("click",()=>br("calendar")),(a=document.getElementById("tab-list"))==null||a.addEventListener("click",()=>{br("list"),tn()}),(s=document.getElementById("cal-prev-month"))==null||s.addEventListener("click",()=>{vn.setMonth(vn.getMonth()-1),pt()}),(r=document.getElementById("cal-next-month"))==null||r.addEventListener("click",()=>{vn.setMonth(vn.getMonth()+1),pt()}),(o=document.getElementById("cal-today"))==null||o.addEventListener("click",()=>{vn=new Date,pt()}),(i=document.getElementById("btn-add-event"))==null||i.addEventListener("click",()=>fa()),(d=document.getElementById("btn-export-events"))==null||d.addEventListener("click",ai),(l=document.getElementById("btn-import-events"))==null||l.addEventListener("click",()=>document.getElementById("input-import-events-csv").click()),(c=document.getElementById("btn-import-ics-events"))==null||c.addEventListener("click",()=>document.getElementById("input-import-events-ics").click()),(u=document.getElementById("btn-download-events-sample"))==null||u.addEventListener("click",oi),(g=document.getElementById("input-import-events-csv"))==null||g.addEventListener("change",si),(b=document.getElementById("input-import-events-ics"))==null||b.addEventListener("change",di),(f=document.getElementById("btn-close-ics-modal-x"))==null||f.addEventListener("click",Es),(y=document.getElementById("btn-close-ics-modal"))==null||y.addEventListener("click",Es),(p=document.getElementById("btn-execute-ics-import"))==null||p.addEventListener("click",ci),(m=document.getElementById("ics-import-list"))==null||m.addEventListener("change",S=>{if(S.target&&S.target.classList.contains("ics-row-location-select")){const A=S.target,P=A.closest(".ics-row").querySelector(".ics-row-location");A.value&&A.value!=="custom"?P.value=A.value:A.value==="custom"&&(P.value="",P.focus())}});const t=document.getElementById("btn-group-manage");t&&(t.style.display="none"),(w=document.getElementById("btn-toggle-multiselect"))==null||w.addEventListener("click",function(){window.att_multiSelectMode=!window.att_multiSelectMode,window.att_multiSelectMode||window.att_selectedDates.clear(),this.classList.toggle("bg-blue-600",window.att_multiSelectMode),this.classList.toggle("text-white",window.att_multiSelectMode),this.classList.toggle("bg-blue-50",!window.att_multiSelectMode),this.classList.toggle("text-blue-600",!window.att_multiSelectMode),pt(),window.att_updateMultiselectBar()}),(v=document.getElementById("btn-cal-filter"))==null||v.addEventListener("click",yr),(x=document.getElementById("btn-cal-filter-clear"))==null||x.addEventListener("click",ds),(k=document.getElementById("btn-list-filter"))==null||k.addEventListener("click",yr),($=document.getElementById("btn-list-filter-clear"))==null||$.addEventListener("click",ds),(h=document.getElementById("btn-close-filter-modal-x"))==null||h.addEventListener("click",Ta),(E=document.getElementById("btn-close-filter-modal"))==null||E.addEventListener("click",Ta),(_=document.getElementById("btn-apply-filter"))==null||_.addEventListener("click",Ho),(I=document.getElementById("btn-filter-clear"))==null||I.addEventListener("click",ds)}function br(e){const t=document.getElementById("tab-calendar"),n=document.getElementById("tab-list");e==="calendar"?(document.getElementById("calendar-container").classList.remove("hidden"),document.getElementById("list-container").classList.add("hidden"),t.classList.replace("bg-white","bg-green-600"),t.classList.replace("text-green-600","text-white"),n.classList.replace("bg-green-600","bg-white"),n.classList.replace("text-white","text-green-600")):(document.getElementById("calendar-container").classList.add("hidden"),document.getElementById("list-container").classList.remove("hidden"),n.classList.replace("bg-white","bg-green-600"),n.classList.replace("text-green-600","text-white"),t.classList.replace("bg-green-600","bg-white"),t.classList.replace("text-white","text-green-600"))}async function Dn(){z("イベント・出欠データ読み込み中...");try{const{data:e}=await L.from("groups").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});e&&(mt=e);const{data:t}=await L.from("event_categories").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});t&&t.length>0?st=t:st=[{id:"1",name:"練習"},{id:"2",name:"試合"},{id:"3",name:"イベント"}];const n=new Date,a=new Date(n.getFullYear(),n.getMonth()-6,1),s=new Date(n.getFullYear(),n.getMonth()+7,1),{data:r}=await L.from("events").select("*").gte("start_time",a.toISOString()).lt("start_time",s.toISOString()).order("start_time");r&&(kt=r);const{data:o}=await L.from("app_users").select("email, name, attribute_id, can_use_attendance");o&&(cn=o);const{data:i}=await L.from("user_attributes").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});i&&(an=i);try{const{data:c}=await L.from("event_locations").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});c&&(un=c)}catch(c){console.warn("event_locations table might not exist yet:",c),un=[]}const{data:d}=await L.from("user_groups").select("*");d&&(Nt=d,Y&&(Gs=d.filter(c=>c.user_email===Y.email)));let l=[];if(kt&&kt.length>0){const c=kt.map(g=>g.id),{data:u}=await L.from("attendances").select("*").in("event_id",c);u&&(l=u)}Ue=l,Y&&(za=l.filter(c=>c.user_email===Y.email));try{const{data:c}=await L.from("master_data").select("data").eq("key","ATTENDANCE_DELEGATIONS").single();c&&c.data&&Y&&(vs=c.data[Y.email]||[])}catch{vs=[]}}catch(e){console.error("Attendance DB Error:",e)}finally{typeof at=="function"?at():V()}}function Oo(){const e=document.getElementById("filter-group");e&&(e.innerHTML='<option value="">すべてのグループ</option>'+mt.map(t=>`<option value="${t.id}">${t.name}</option>`).join(""))}function Fo(){const e=document.getElementById("filter-category");if(!e)return;const t=e.value;e.innerHTML='<option value="">すべてのカテゴリ</option>'+st.map(n=>`<option value="${n.name}">${n.name}</option>`).join(""),st.some(n=>n.name===t)&&(e.value=t)}function yr(){const e=document.getElementById("filter-modal-content");if(!e)return;let t="";t+='<div class="mb-5">',t+='<h4 class="text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">カテゴリ（複数選択）</h4>',st.length===0?t+='<p class="text-xs text-gray-400">カテゴリが登録されていません</p>':(t+='<div class="grid grid-cols-2 gap-2">',st.forEach(a=>{const s=window.att_selectedCategories.has(a.name)?"checked":"";t+=`
                <label class="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition">
                    <input type="checkbox" class="filter-cat-checkbox w-4 h-4 rounded text-green-600 focus:ring-green-500 border-gray-300" value="${a.name}" ${s}>
                    <span class="select-none">${a.name}</span>
                </label>
            `}),t+="</div>"),t+="</div>",t+='<div class="mb-2">',t+='<h4 class="text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">対象グループ（複数選択）</h4>',t+='<div class="grid grid-cols-2 gap-2">';const n=window.att_selectedGroups.has("all")?"checked":"";t+=`
        <label class="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition font-medium">
            <input type="checkbox" class="filter-group-checkbox w-4 h-4 rounded text-green-600 focus:ring-green-500 border-gray-300" value="all" ${n}>
            <span class="select-none font-semibold text-gray-900">全体（全員対象）</span>
        </label>
    `,mt.length>0&&mt.forEach(a=>{const s=window.att_selectedGroups.has(a.id)?"checked":"";t+=`
                <label class="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition">
                    <input type="checkbox" class="filter-group-checkbox w-4 h-4 rounded text-green-600 focus:ring-green-500 border-gray-300" value="${a.id}" ${s}>
                    <span class="select-none">${a.name}</span>
                </label>
            `}),t+="</div>",t+="</div>",e.innerHTML=t,document.getElementById("filter-modal").classList.remove("hidden")}function Ta(){document.getElementById("filter-modal").classList.add("hidden")}function Ho(){const e=document.querySelectorAll(".filter-cat-checkbox"),t=document.querySelectorAll(".filter-group-checkbox");window.att_selectedCategories.clear(),e.forEach(n=>{n.checked&&window.att_selectedCategories.add(n.value)}),window.att_selectedGroups.clear(),t.forEach(n=>{n.checked&&window.att_selectedGroups.add(n.value)}),Wr(),pt(),tn(),Ta()}function ds(){window.att_selectedCategories.clear(),window.att_selectedGroups.clear(),Wr(),pt(),tn(),Ta()}function Wr(){const e=window.att_selectedCategories.size+window.att_selectedGroups.size,t=document.getElementById("cal-filter-badge"),n=document.getElementById("btn-cal-filter-clear"),a=document.getElementById("btn-cal-filter"),s=document.getElementById("list-filter-badge"),r=document.getElementById("btn-list-filter-clear"),o=document.getElementById("btn-list-filter");e>0?(t&&(t.textContent=e,t.classList.remove("hidden")),n&&n.classList.remove("hidden"),a&&(a.classList.remove("bg-[#e6e5dd]","hover:bg-[#dcdad2]","text-slate-800"),a.classList.add("bg-green-100","hover:bg-green-200","text-green-800","border-green-300")),s&&(s.textContent=e,s.classList.remove("hidden")),r&&r.classList.remove("hidden"),o&&(o.classList.remove("bg-gray-100","hover:bg-gray-200","text-gray-800"),o.classList.add("bg-green-100","hover:bg-green-200","text-green-800","border-green-300"))):(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),a&&(a.classList.remove("bg-green-100","hover:bg-green-200","text-green-800","border-green-300"),a.classList.add("bg-[#e6e5dd]","hover:bg-[#dcdad2]","text-slate-800")),s&&s.classList.add("hidden"),r&&r.classList.add("hidden"),o&&(o.classList.remove("bg-green-100","hover:bg-green-200","text-green-800","border-green-300"),o.classList.add("bg-gray-100","hover:bg-gray-200","text-gray-800")))}function zr(){return kt.filter(e=>{if(window.att_selectedCategories&&window.att_selectedCategories.size>0&&!window.att_selectedCategories.has(e.category))return!1;if(window.att_selectedGroups&&window.att_selectedGroups.size>0){const t=Zn(e);if(t.ids.length===0){if(!window.att_selectedGroups.has("all"))return!1}else if(!t.ids.some(a=>window.att_selectedGroups.has(a)))return!1}return!0})}function pt(){const e=vn.getFullYear(),t=vn.getMonth();document.getElementById("cal-current-month").textContent=`${e}年${t+1}月`;const n=document.getElementById("calendar-grid");n&&n.classList.remove("gap-1","gap-px","gap-2","p-1","p-2","p-4"),Array.from(n.children).forEach((i,d)=>{d>=7&&n.removeChild(i)});const s=new Date(e,t,1).getDay(),r=new Date(e,t,1-s),o=new Date;for(let i=0;i<42;i++){const d=new Date(r);d.setDate(r.getDate()+i);const l=d.getFullYear(),c=d.getMonth(),u=d.getDate(),g=c===t,b=`${l}-${String(c+1).padStart(2,"0")}-${String(u).padStart(2,"0")}`,f=window.att_multiSelectMode&&window.att_selectedDates.has(b),y=d.getDay(),p=ni(d),m=l===o.getFullYear()&&c===o.getMonth()&&u===o.getDate(),w=document.createElement("div");let v="border-r border-b min-h-[100px] flex flex-col p-0 cursor-pointer";g?p||y===0?v+=" bg-sunday-hatch":y===6?v+=" bg-saturday-hatch":v+=" bg-white":v+=" bg-gray-50 opacity-60",f&&(v="border-2 border-blue-500 min-h-[100px] flex flex-col p-0 bg-blue-50/70 cursor-pointer z-10"),m&&!window.att_multiSelectMode&&(v+=" today-cell-border"),w.className=v,w.onclick=()=>{window.att_multiSelectMode?(window.att_selectedDates.has(b)?window.att_selectedDates.delete(b):window.att_selectedDates.add(b),pt(),window.att_updateMultiselectBar()):fa(b)};const x=document.createElement("div");let k="text-gray-700";g&&(p||y===0?k="text-red-600 font-bold":y===6&&(k="text-blue-600 font-bold")),x.className=`text-right text-[11px] ${k} mb-0 pr-1 pt-1 leading-none`,x.textContent=u,w.appendChild(x);const $=document.createElement("div");$.className="flex-1 overflow-hidden flex flex-col gap-0";const E=zr().filter(S=>S.start_time&&S.start_time.startsWith(b)),_=E.slice(0,5),I=E.length>5;if(_.forEach(S=>{const A=document.createElement("div"),P=za.find(C=>C.event_id===S.id);let M="",N="text-gray-800";if(S.requires_attendance){const C=P?P.status:"未入力";C==="出席"?(M='<span class="inline-block text-[9px] font-bold text-white bg-blue-600 rounded px-0.5 mr-0.5 leading-none shrink-0 align-middle">出</span>',N="text-blue-700 font-bold"):C==="欠席"?(M='<span class="inline-block text-[9px] font-bold text-white bg-gray-400 rounded px-0.5 mr-0.5 leading-none shrink-0 align-middle">欠</span>',N="text-gray-800 opacity-70"):C==="保留"||C==="未定"?(M='<span class="inline-block text-[9px] font-bold text-white bg-amber-500 rounded px-0.5 mr-0.5 leading-none shrink-0 align-middle">保</span>',N="text-gray-800"):(M='<span class="inline-block text-[9px] font-bold text-white bg-red-500 rounded px-0.5 mr-0.5 leading-none shrink-0 align-middle">未</span>',N="text-red-600 font-bold")}const G=st.find(C=>C.name===S.category),R=(G==null?void 0:G.color)||"#bfdbfe",B=(S.title||"").replace(/[\r\n]+/g," ");A.className=`text-[10px] rounded px-0.5 py-px truncate whitespace-nowrap overflow-hidden text-ellipsis w-full text-left cursor-pointer hover:opacity-80 leading-tight mb-0.5 ${N}`,A.style.backgroundColor=R,A.innerHTML=`${M}${B}`,A.title=S.title,A.onclick=C=>{C.stopPropagation(),window.att_openEventDetail(S.id)},$.appendChild(A)}),I){const S=document.createElement("div");S.className="text-[10px] text-gray-500 text-center mt-[1px] cursor-pointer hover:underline",S.textContent=`他 ${E.length-5} 件`,S.onclick=A=>{A.stopPropagation(),alert(`${b} の予定が多すぎます。リストビューで確認してください。`)},$.appendChild(S)}w.appendChild($),n.appendChild(w)}}const Ws=["日","月","火","水","木","金","土"];function qo(e){const t=new Date(e);if(isNaN(t.getTime()))return e;const n=t.getDate(),a=Ws[t.getDay()];return`${n}日(${a})`}function Uo(e,t,n){const a=new Date(e);if(isNaN(a.getTime()))return"日時未定";const s=a.getMonth()+1,r=a.getDate(),o=Ws[a.getDay()],i=`${s}/${r}(${o})`;if(n)return`${i} 終日`;const d=e.substring(11,16);let l="";if(t){const c=new Date(t);isNaN(c.getTime())||(l=` - ${t.substring(11,16)}`)}return`${i}${d}${l}`}function jo(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const n=t.getFullYear(),a=t.getMonth()+1,s=t.getDate(),r=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}/${a}/${s} ${r}:${o}`}function tn(){const e=zr(),t=document.getElementById("event-list-content");if(e.length===0){t.innerHTML='<p class="text-gray-500 p-4">表示するイベントがありません。</p>';return}const n=[...e].sort((i,d)=>i.start_time?d.start_time?i.start_time.localeCompare(d.start_time):-1:1),a={};n.forEach(i=>{const d=i.start_time?i.start_time.split("T")[0]:"未定";a[d]||(a[d]=[]),a[d].push(i)});const s=new Date,r=`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}-${String(s.getDate()).padStart(2,"0")}`;let o="";Object.keys(a).forEach(i=>{const d=a[i];let l="日時未定",c="";i!=="未定"&&(l=qo(i),i===r&&(c=`<span class="ml-2 bg-green-600 text-white text-xs px-2.5 py-0.5 rounded-full font-bold shadow-sm">${new Date(i).getDate()}日(今日)</span>`)),o+=`
        <div class="space-y-2 mb-4">
            <div class="flex items-center text-sm font-bold text-gray-700 border-b border-gray-200 pb-1 px-1">
                <span>${l}</span>
                ${c}
            </div>
        `,d.forEach(u=>{const g=Zn(u);g.name,g.color;const b=st.find($=>$.name===u.category),f=(b==null?void 0:b.color)||"#bfdbfe",y=za.find($=>$.event_id===u.id);let p=y&&y.status?y.status:"未回答";p==="未定"&&(p="保留");const m=Uo(u.start_time,u.end_time,u.is_all_day);let w="不明";if(u.created_by){const $=cn.find(h=>h.email===u.created_by);w=$&&$.name||u.created_by.split("@")[0]}const v=jo(u.created_at),x=u.created_by?`
                <div class="flex items-center text-gray-400 text-[10px] mt-1 space-x-1">
                    <span class="w-4 h-4 rounded-full bg-green-50 flex items-center justify-center text-[10px] text-green-700 font-bold">👤</span>
                    <span>${w} ${v}</span>
                </div>
            `:"";let k="";if(u.requires_attendance){const $=u.attendance_deadline?new Date>new Date(u.attendance_deadline):!1;let h="bg-gray-100 text-gray-600",E="";if($)E="回答期限切れ",h="bg-gray-200 text-gray-500";else if(u.attendance_deadline){const S=new Date(u.attendance_deadline),A=S.getMonth()+1,P=S.getDate(),M=String(S.getHours()).padStart(2,"0"),N=String(S.getMinutes()).padStart(2,"0");E=`回答期限: ${A}/${P} ${M}:${N}`}const _=E?`<span class="text-[10px] px-1.5 py-0.5 rounded ${h} font-semibold">${E}</span>`:"";let I="";p==="出席"?I='<div class="flex items-center justify-center w-5 h-5 bg-green-600 text-white rounded-full text-[10px] font-bold shadow-sm" title="出席">O</div>':p==="欠席"?I='<div class="flex items-center justify-center w-5 h-5 bg-black text-white rounded text-[10px] font-bold shadow-sm" title="欠席">X</div>':p==="保留"?I='<div class="flex items-center justify-center w-5 h-5 bg-yellow-600 text-white rounded-full text-[10px] font-bold shadow-sm" title="保留">-</div>':I='<div class="flex items-center justify-center w-5 h-5 bg-red-600 text-white rounded-full text-[10px] font-bold shadow-sm animate-pulse" title="未回答">?</div>',k=`
                    <div class="flex items-center space-x-2 shrink-0">
                        ${_}
                        ${I}
                    </div>
                `}o+=`
            <div class="p-2 px-3 border border-gray-200/60 rounded-lg hover:shadow-md transition bg-white flex flex-col justify-between cursor-pointer relative shadow-sm" onclick="window.att_openEventDetail('${u.id}')">
                
                <!-- カード上部（タイトルと右上バッジ） -->
                <div class="flex justify-between items-start mb-1 gap-2">
                    <h3 class="font-bold text-sm md:text-base text-gray-800 flex items-center pr-2">
                        <span class="mr-1 text-base">📅</span>
                        <span>${u.title}</span>
                    </h3>
                    ${k}
                </div>

                <!-- カード中部（カテゴリと詳細） -->
                <div class="flex flex-wrap items-center gap-2 text-[11px] md:text-xs text-gray-600">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold" style="background-color: ${f}; color: #1f2937">${u.category||"イベント"}</span>
                    ${Vr(g)}
                    <span class="flex items-center space-x-1">
                        <span>🕒</span>
                        <span>${m}</span>
                    </span>
                    <span class="flex items-center space-x-0.5">
                        <span>📍</span>
                        <span>${Yr(u.location)}</span>
                    </span>
                </div>

                <!-- カード下部（登録者と詳細矢印） -->
                <div class="flex justify-between items-end mt-1">
                    ${x}
                    <!-- 詳細矢印 (緑の右向き) -->
                    <div class="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition absolute right-2 bottom-2">
                        <span class="text-green-700 text-[10px] font-bold leading-none">&#10095;</span>
                    </div>
                </div>

            </div>
            `}),o+="</div>"}),t.innerHTML=o}function fa(e="",t=null,n=!1,a=null){let s="";t&&(s=t.title.replace(/"/g,"&quot;"),n||(s+=" (コピー)"));const r=!t&&!n;a&&a.length>0?$e=[...a]:t?$e=[t.start_time.split("T")[0]]:e?$e=[e]:$e=[new Date().toISOString().split("T")[0]],window.att_modalSelectedDates=$e,window.att_isEditingModal=n;const o=t&&t.start_time&&!t.is_all_day?t.start_time.split("T")[1].substring(0,5):r?"12:30":"",i=t&&t.end_time&&!t.is_all_day?t.end_time.split("T")[1].substring(0,5):r?"17:00":"",d=t?t.is_all_day:!1,l=t?t.category:"",c=t?(t.location||"").replace(/"/g,"&quot;"):"",u=t?(t.description||"").replace(/</g,"&lt;").replace(/>/g,"&gt;"):"",g=t?t.requires_attendance:!0,b=t?t.require_detailed_attendance:!1,f=o?o.split(":")[0]:"",y=o?o.split(":")[1]:"",p=i?i.split(":")[0]:"",m=i?i.split(":")[1]:"",w=!c||!un.some(T=>(T.url?`${T.name} ${T.url}`:T.name)===c);let v="",x="";if(c){const T=c.match(/(https?:\/\/[^\s\<\>\"]+)/);T?(x=T[0],v=c.replace(x,"").trim()):v=c}const k=!!(t&&t.attendance_deadline&&t.attendance_deadline!==Jt(t.start_time.split("T")[0])),$=Jt($e[0])?Jt($e[0]).split("T")[0]:"",h=t&&t.attendance_deadline?t.attendance_deadline.split("T")[0]:$,E=t&&t.attendance_deadline?t.attendance_deadline.split("T")[1].substring(0,5):"12:00",_=E?E.split(":")[0]:"12",I=E?E.split(":")[1]:"00",S=T=>'<option value="">--</option>'+Array.from({length:24},(F,X)=>String(X).padStart(2,"0")).map(F=>`<option value="${F}" ${F===T?"selected":""}>${F}</option>`).join(""),A=T=>'<option value="">--</option>'+Array.from({length:60},(F,X)=>String(X).padStart(2,"0")).map(F=>`<option value="${F}" ${F===T?"selected":""}>${F}</option>`).join(""),P=t?t.target_group_ids&&t.target_group_ids.length>0?t.target_group_ids:t.target_group_id?[t.target_group_id]:[]:[],M=n?"イベントを編集":t?"イベントを複製":"新規イベント登録",N=`
        <div class="border p-2 rounded max-h-32 overflow-y-auto space-y-1 bg-white">
            <label class="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" id="ev-group-all" value="all" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" ${P.length===0?"checked":""}>
                <span class="text-xs font-medium">全体</span>
            </label>
            ${mt.map(T=>`
                <label class="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" name="ev-group-cb" value="${T.id}" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" ${P.includes(T.id)?"checked":""}>
                    <span class="text-xs">${T.name}</span>
                </label>
            `).join("")}
        </div>
    `;let G="";n?G=`
            <div>
                <label class="text-xs font-bold text-gray-600">日付*</label>
                <div id="ev-dates-container" class="mt-1">
                    <input type="date" value="${$e[0]}" class="w-full border p-1.5 rounded text-xs px-1" onchange="window.att_onSingleDateChange(this.value)">
                </div>
            </div>
        `:G=`
            <div>
                <label class="text-xs font-bold text-gray-600">日付*</label>
                <div id="ev-dates-container" class="space-y-1.5 max-h-32 overflow-y-auto border p-2 rounded bg-gray-50 mt-1">
                    <!-- Rendered by renderDateRows() -->
                </div>
                <button type="button" onclick="window.att_addDateRow()" class="mt-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded text-xs font-bold flex items-center space-x-1 transition shadow-sm border border-gray-200">
                    <span>＋ 日付を追加</span>
                </button>
            </div>
        `;const R=`
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
        <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col text-sm text-gray-800">
            <h3 class="text-lg font-bold mb-3 shrink-0">${M}</h3>
            <div class="space-y-3 overflow-y-auto pr-1 flex-1">
                <div>
                    <label class="text-xs font-bold text-gray-600">イベント名*</label>
                    <input type="text" id="ev-title" value="${s}" placeholder="イベント名" class="w-full border p-1.5 rounded text-xs">
                </div>
                
                <!-- Date input block -->
                ${G}
                
                <!-- Time and AllDay Row -->
                <div class="flex space-x-4 items-end">
                    <div id="ev-time-container" class="flex-1 ${d?"opacity-50":""}">
                        <label class="text-xs font-bold text-gray-600">開始時間</label>
                        <div class="flex items-center space-x-1 mt-1">
                            <select id="ev-time-h" class="w-full border py-1.5 px-1.5 rounded text-xs bg-white" ${d?"disabled":""}>${S(f)}</select>
                            <span class="font-bold text-gray-500">:</span>
                            <select id="ev-time-m" class="w-full border py-1.5 px-1.5 rounded text-xs bg-white" ${d?"disabled":""}>${A(y)}</select>
                        </div>
                    </div>
                    <div id="ev-end-time-container" class="flex-1 ${d?"opacity-50":""}">
                        <label class="text-xs font-bold text-gray-600">終了時間</label>
                        <div class="flex items-center space-x-1 mt-1">
                            <select id="ev-end-time-h" class="w-full border py-1.5 px-1.5 rounded text-xs bg-white" ${d?"disabled":""}>${S(p)}</select>
                            <span class="font-bold text-gray-500">:</span>
                            <select id="ev-end-time-m" class="w-full border py-1.5 px-1.5 rounded text-xs bg-white" ${d?"disabled":""}>${A(m)}</select>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2 pb-1.5">
                        <input type="checkbox" id="ev-all-day" class="w-4 h-4 text-blue-600 cursor-pointer rounded border-gray-300 focus:ring-blue-500" ${d?"checked":""} onchange="['ev-time-h','ev-time-m','ev-end-time-h','ev-end-time-m'].forEach(id=>{const el=document.getElementById(id); el.disabled=this.checked; if(this.checked)el.value='';}); document.getElementById('ev-time-container').classList.toggle('opacity-50', this.checked); document.getElementById('ev-end-time-container').classList.toggle('opacity-50', this.checked);">
                        <label for="ev-all-day" class="font-bold text-gray-700 text-xs cursor-pointer select-none">終日</label>
                    </div>
                </div>
                
                <div class="flex space-x-2 pb-2 mb-2 border-b">
                    <div class="w-1/2">
                        <label class="text-xs font-bold text-gray-600">出欠設定</label>
                        <select id="ev-attendance-type" class="w-full border p-1.5 rounded font-bold text-xs bg-white" onchange="document.getElementById('ev-deadline-container').style.display = this.value === 'none' ? 'none' : 'block';">
                            <option value="none" ${g?"":"selected"}>なし</option>
                            <option value="simple" ${g&&!b?"selected":""}>簡易</option>
                            <option value="detailed" ${g&&b?"selected":""}>詳細 (車・同伴者)</option>
                        </select>
                    </div>
                    
                    <div class="w-1/2" id="ev-deadline-container" style="display: ${g?"block":"none"}">
                        <div class="flex items-center justify-between mb-0.5">
                            <label class="text-xs font-bold text-gray-600">回答期限</label>
                            <div class="flex items-center space-x-1">
                                <input type="checkbox" id="ev-deadline-custom-cb" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer" ${k?"checked":""} onchange="window.att_toggleDeadlineCustom(this.checked)">
                                <label for="ev-deadline-custom-cb" class="text-[11px] font-bold text-gray-500 cursor-pointer select-none">個別指定</label>
                            </div>
                        </div>
                        
                        <!-- Custom Deadline Inputs -->
                        <div id="ev-deadline-custom-inputs" class="flex items-center space-x-0.5 ${k?"":"hidden"}">
                            <input type="date" id="ev-deadline-date" value="${h}" class="w-[50%] border p-1.5 rounded text-xs px-1" onchange="this.blur()">
                            <select id="ev-deadline-time-h" class="w-[25%] border py-1.5 px-1 rounded text-xs bg-white">${S(_)}</select>
                            <span class="font-bold text-gray-500">:</span>
                            <select id="ev-deadline-time-m" class="w-[25%] border py-1.5 px-1 rounded text-xs bg-white">${A(I)}</select>
                        </div>
                        
                        <!-- Default Deadline Auto Label -->
                        <div id="ev-deadline-auto-preview" class="text-[11px] text-gray-600 bg-gray-50 border border-dashed border-gray-200 rounded p-1.5 font-medium leading-normal ${k?"hidden":""}">
                        </div>
                    </div>
                </div>

                <div class="flex space-x-2">
                    <div class="w-1/2">
                        <label class="text-xs font-bold text-gray-600">カテゴリ</label>
                        <select id="ev-category" class="w-full border p-1.5 rounded text-xs bg-white">
                            ${st.map(T=>`<option value="${T.name}" ${T.name===l?"selected":""}>${T.name}</option>`).join("")}
                        </select>
                    </div>
                    <div class="w-1/2 flex flex-col">
                        <label class="text-xs font-bold text-gray-600 mb-1">対象グループ</label>
                        ${N}
                    </div>
                </div>
                
                <!-- Place selection using Master Data -->
                <div class="flex flex-col space-y-1.5">
                    <label class="text-xs font-bold text-gray-600">場所</label>
                    <select id="ev-location-select" class="w-full border p-1.5 rounded text-xs font-medium bg-white" onchange="window.att_onLocationSelectChange(this.value)">
                        <option value="custom">-- 直接入力 / 新規マスタ追加 --</option>
                        ${un.map(T=>{const F=T.url?`${T.name} ${T.url}`:T.name;return`<option value="${F}" ${c===F?"selected":""}>${T.name}${T.url?" (URLあり)":""}</option>`}).join("")}
                    </select>
                    
                    <!-- Direct Input & Inline Master Register container -->
                    <div id="ev-location-custom-container" class="border p-2.5 rounded bg-gray-50 space-y-2 mt-1 ${w?"":"hidden"}">
                        <div class="flex space-x-2">
                            <div class="flex-1">
                                <label class="text-[10px] font-bold text-gray-500">場所名</label>
                                <input type="text" id="ev-location-custom-name" value="${v}" placeholder="例: 〇〇グラウンド" class="w-full border p-1 rounded text-xs bg-white">
                            </div>
                            <div class="flex-1">
                                <label class="text-[10px] font-bold text-gray-500">URL (Google Map 等、任意)</label>
                                <input type="text" id="ev-location-custom-url" value="${x}" placeholder="https://..." class="w-full border p-1 rounded text-xs bg-white">
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <button type="button" onclick="window.att_registerNewLocation()" class="bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 px-3 py-1 rounded text-xs font-bold transition shadow-sm">
                                場所マスタに登録して選択する
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <label class="text-xs font-bold text-gray-600">説明</label>
                    <textarea id="ev-description" placeholder="説明" class="w-full border p-1.5 rounded text-xs" rows="3">${u}</textarea>
                </div>
            </div>
            <div class="flex justify-end space-x-3 mt-4 pt-4 border-t shrink-0">
                <button onclick="window.att_closeModal()" class="bg-gray-300 hover:bg-gray-400 px-4 py-1.5 rounded font-bold text-xs">キャンセル</button>
                <button onclick="window.att_saveEvent(${n?`'${t.id}'`:"null"})" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded font-bold text-xs shadow">${n?"更新":"保存"}</button>
            </div>
        </div>
    </div>`;document.getElementById("attendance-modals").innerHTML=R,mn(),n||ga();const B=document.getElementById("ev-group-all"),C=document.querySelectorAll('input[name="ev-group-cb"]');B.addEventListener("change",function(){this.checked&&C.forEach(T=>T.checked=!1)}),C.forEach(T=>{T.addEventListener("change",function(){this.checked&&(B.checked=!1)})})}async function Vo(e=null){var A,P,M,N,G,R;const t=document.getElementById("ev-title").value.trim(),n=document.querySelectorAll('#ev-dates-container input[type="date"]'),a=Array.from(n).map(B=>B.value).filter(Boolean);if(!t)return alert("イベント名は必須です");if(a.length===0)return alert("日付を1つ以上指定してください");const s=document.getElementById("ev-time-h").value,r=document.getElementById("ev-time-m").value;let o="";(s||r)&&(o=`${s||"00"}:${r||"00"}`);const i=document.getElementById("ev-end-time-h").value,d=document.getElementById("ev-end-time-m").value;let l="";(i||d)&&(l=`${i||"00"}:${d||"00"}`);const c=document.getElementById("ev-all-day").checked,u=document.getElementById("ev-category").value,g=document.getElementById("ev-description").value,b=document.getElementById("ev-location-select");let f="";if(b)if(b.value==="custom"){const B=((A=document.getElementById("ev-location-custom-name"))==null?void 0:A.value.trim())||"",C=((P=document.getElementById("ev-location-custom-url"))==null?void 0:P.value.trim())||"";f=C?`${B} ${C}`:B}else f=b.value;const y=document.getElementById("ev-attendance-type").value,p=y!=="none",m=y==="detailed",w=((M=document.getElementById("ev-deadline-custom-cb"))==null?void 0:M.checked)||!1,v=(N=document.getElementById("ev-deadline-date"))==null?void 0:N.value,x=(G=document.getElementById("ev-deadline-time-h"))==null?void 0:G.value,k=(R=document.getElementById("ev-deadline-time-m"))==null?void 0:R.value,$=document.getElementById("ev-group-all").checked;let h=[];$||document.querySelectorAll('input[name="ev-group-cb"]:checked').forEach(B=>h.push(B.value));const E=h.length>0?h[0]:null,_=B=>new Promise(C=>setTimeout(C,B)),I=3;let S=0;for(;S<I;){S++,S>1?(z(`通信リトライ中 (${S-1}/${I-1}回目)...`),await _(1500)):z("イベント保存中...");try{if(e){const B=a[0],C=`${B}T${o||"00:00"}:00`;let T=null;l&&(T=`${B}T${l}:00`);let F=null;p&&(w?v&&x&&k&&(F=`${v}T${x}:${k}:00`):F=Jt(B));const X={title:t,category:u,description:g,location:f,start_time:C,end_time:T,is_all_day:c,requires_attendance:p,require_detailed_attendance:m,attendance_deadline:F,target_group_id:E,target_group_ids:h.length>0?h:null},{error:W}=await L.from("events").update(X).eq("id",e);if(W)throw W;await be("UPDATE_EVENT",`イベント「${t}」を更新しました`)}else{const B=a.map(T=>{const F=`${T}T${o||"00:00"}:00`;let X=null;l&&(X=`${T}T${l}:00`);let W=null;return p&&(w?v&&x&&k&&(W=`${v}T${x}:${k}:00`):W=Jt(T)),{title:t,category:u,description:g,location:f,start_time:F,end_time:X,is_all_day:c,requires_attendance:p,require_detailed_attendance:m,attendance_deadline:W,target_group_id:E,target_group_ids:h.length>0?h:null,created_by:Y==null?void 0:Y.email}}),{error:C}=await L.from("events").insert(B);if(C)throw C;await be("CREATE_EVENT",`イベント「${t}」を${B.length}件作成しました`)}await Dn(),pt(),document.getElementById("list-container").classList.contains("hidden")||tn(),!e&&typeof window.att_clearDateSelection=="function"&&window.att_clearDateSelection(),window.att_closeModal();break}catch(B){console.error(`Save Event Attempt ${S} Error:`,B);const C=B.message==="Load failed"||B.message==="Failed to fetch"||!B.code;if(S<I&&C)continue;{let T=B.message||String(B);B.details&&(T+=`
Details: `+B.details),B.hint&&(T+=`
Hint: `+B.hint),B.code&&(T+=`
Code: `+B.code),alert("保存エラー: "+T+`
（ネットワーク接続をご確認のうえ、再度お試しください）`);break}}}V()}async function Go(e){if(confirm("このイベントを削除しますか？")){z("イベント削除中...");try{await L.from("events").delete().eq("id",e),await be("DELETE_EVENT",`イベント(ID:${e})を削除しました`),await Dn(),pt(),tn(),window.att_closeModal()}catch(t){console.error(t)}finally{V()}}}function Jr(e,t,n=!1){const a=t.ids.length===0||Gs.some(l=>t.ids.includes(l.group_id)),s=cn.find(l=>l.email===Y.email),r=s?s.can_use_attendance!==!1:!0,o=[];r&&o.push({email:Y.email,name:"自分 ( "+((Y==null?void 0:Y.name)||Y.email.split("@")[0])+" )",canAttend:a}),vs.forEach(l=>{const c=cn.find(u=>u.email===l);if(c&&c.can_use_attendance!==!1){const u=t.ids.length===0||Nt.some(g=>t.ids.includes(g.group_id)&&g.user_email===l);o.push({email:l,name:c.name||l.split("@")[0],canAttend:u})}});let i=!1;return{formsHtml:o.map((l,c)=>{if(!l.canAttend)return`<div class="p-3 bg-gray-50 border rounded mb-2">
                <h4 class="font-bold text-gray-700 mb-1">${l.name}</h4>
                <p class="text-xs text-red-500">※対象グループに所属していないため入力できません</p>
            </div>`;i=!0;const u=Ue.find(y=>y.event_id===e.id&&y.user_email===l.email)||{};let g=u.status||"未回答";g==="未定"&&(g="保留");let b="否",f=u.comment||"";return f.startsWith("[荷物車:可]")?(b="可",f=f.substring(8)):f.startsWith("[荷物車:否]")&&(b="否",f=f.substring(8)),`
        <div class="p-3 bg-blue-50 border border-blue-100 rounded mb-3" data-target-email="${l.email}">
            <h4 class="font-bold text-blue-800 mb-2 border-b border-blue-200 pb-1">${l.name}</h4>
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">ステータス*</label>
                <select id="att-status-${c}" class="w-full border p-1.5 rounded text-sm font-bold" ${n?"disabled":""}>
                    <option value="未回答" ${g==="未回答"?"selected":""}>未回答</option>
                    <option value="出席" ${g==="出席"?"selected":""}>出席</option>
                    <option value="欠席" ${g==="欠席"?"selected":""}>欠席</option>
                    <option value="保留" ${g==="保留"?"selected":""}>保留</option>
                </select>
            </div>
            ${e.require_detailed_attendance?`
                <div class="flex items-center space-x-2 mt-2">
                    <div class="w-1/3">
                        <label class="block text-xs font-bold text-gray-700 mb-1">車出し可否</label>
                        <select id="att-car-flag-${c}" class="w-full border p-1.5 rounded text-sm font-bold" onchange="const isCar = this.value === '可'; document.getElementById('att-car-cap-${c}').disabled = !isCar; document.getElementById('att-luggage-flag-${c}').disabled = !isCar; if(isCar && document.getElementById('att-car-cap-${c}').value == 0) document.getElementById('att-car-cap-${c}').value = 1;" ${n?"disabled":""}>
                            <option value="否" ${!u.car_capacity||u.car_capacity===0?"selected":""}>否</option>
                            <option value="可" ${u.car_capacity>0?"selected":""}>可</option>
                        </select>
                    </div>
                    <div class="w-1/3">
                        <label class="block text-xs font-bold text-gray-700 mb-1">乗車可能人数</label>
                        <input type="number" id="att-car-cap-${c}" value="${u.car_capacity||0}" min="0" class="w-full border p-1.5 rounded text-sm" ${n||!u.car_capacity||u.car_capacity===0?"disabled":""}>
                    </div>
                    <div class="w-1/3">
                        <label class="block text-xs font-bold text-gray-700 mb-1">荷物車対応</label>
                        <select id="att-luggage-flag-${c}" class="w-full border p-1.5 rounded text-sm font-bold" ${n||!u.car_capacity||u.car_capacity===0?"disabled":""}>
                            <option value="否" ${b==="否"?"selected":""}>否</option>
                            <option value="可" ${b==="可"?"selected":""}>可</option>
                        </select>
                    </div>
                </div>
                <div class="mt-2">
                    <label class="block text-xs font-bold text-gray-700 mb-1">同伴者 (例: 父、母、弟)</label>
                    <input type="text" id="att-acc-${c}" value="${u.accompanying_persons||""}" class="w-full border p-1.5 rounded text-sm" ${n?"disabled":""}>
                </div>
            `:""}
            <div class="mt-2">
                <label class="block text-xs font-bold text-gray-700 mb-1">コメント ${n?'<span class="text-red-500 font-normal">(期限後も修正可)</span>':""}</label>
                <textarea id="att-comment-${c}" class="w-full border p-1.5 rounded text-sm" rows="1">${f}</textarea>
            </div>
        </div>`}).join(""),hasAnyForm:i}}window.att_openEventDetail=window.openEventDetailModal=function(e,t="basic"){const n=kt.find(R=>R.id===e);if(!n)return;const a=Zn(n);a.name,a.color;const s=st.find(R=>R.name===n.category),r=(s==null?void 0:s.color)||"#bfdbfe";let o="日時未定";n.is_all_day&&n.start_time?o=n.start_time.substring(0,10)+" (終日)":n.start_time&&(o=n.start_time.substring(0,16).replace("T"," "),n.end_time&&(o+=" 〜 "+n.end_time.substring(11,16)));const i=za.find(R=>R.event_id===n.id)||{};let d=i&&i.status?i.status:"未回答";d==="未定"&&(d="保留");const l=n.attendance_deadline?new Date>new Date(n.attendance_deadline):!1;let c=n.attendance_deadline?n.attendance_deadline.replace("T"," ").substring(0,16):"設定なし";a.ids.length===0||Gs.some(R=>a.ids.includes(R.group_id));let u=[];if(a.ids.length===0)u=cn.filter(R=>R.can_use_attendance!==!1);else{const R=Nt.filter(T=>a.ids.includes(T.group_id)).map(T=>T.user_email),C=Ue.filter(T=>T.event_id===n.id).map(T=>T.user_email);u=cn.filter(T=>T.can_use_attendance!==!1&&(R.includes(T.email)||C.includes(T.email)))}window.att_statusViewType||(window.att_statusViewType="group"),window.att_statusFilter||(window.att_statusFilter="all");const g=window.att_statusViewType==="group";let b=0,f=0,y=0;u.forEach(R=>{const B=Ue.find(C=>C.event_id===n.id&&C.user_email===R.email);B&&B.status==="出席"?b++:B&&B.status==="欠席"?f++:y++});const p=[];g?mt.forEach(R=>{const B=Nt.filter(Z=>Z.group_id===R.id).map(Z=>Z.user_email),C=u.filter(Z=>B.includes(Z.email));let T=0,F=0,X=0,W=!1;C.forEach(Z=>{const j=Ue.find(Q=>Q.event_id===n.id&&Q.user_email===Z.email);j&&j.status&&j.status!=="未回答"?(W=!0,j.status==="出席"?T++:j.status==="欠席"?F++:X++):X++}),W&&p.push({name:R.name,attending:T,absent:F,pending:X})}):an.forEach(R=>{const B=u.filter(W=>W.attribute_id===R.id);let C=0,T=0,F=0,X=!1;B.forEach(W=>{const Z=Ue.find(j=>j.event_id===n.id&&j.user_email===W.email);Z&&Z.status&&Z.status!=="未回答"?(X=!0,Z.status==="出席"?C++:Z.status==="欠席"?T++:F++):F++}),X&&p.push({name:R.name,attending:C,absent:T,pending:F})});const m=`
        <div class="flex items-center space-x-1 mb-4 p-1 bg-gray-100/80 rounded-lg w-fit shrink-0">
            <button onclick="window.att_setStatusViewType('${n.id}', 'group')" class="px-4 py-1.5 rounded-md text-xs font-bold transition shadow-sm ${g?"bg-green-600 text-white":"text-gray-600 hover:text-gray-900"}">📂 グループ別</button>
            <button onclick="window.att_setStatusViewType('${n.id}', 'attribute')" class="px-4 py-1.5 rounded-md text-xs font-bold transition shadow-sm ${g?"text-gray-600 hover:text-gray-900":"bg-green-600 text-white"}">👥 属性別</button>
        </div>
    `,w=g?"※出欠の入力があるグループのみ表示しています。":"※出欠の入力がある属性のみ表示しています。";let v=`
        <tr class="bg-gray-50/50 font-bold border-b border-gray-200">
            <td class="px-4 py-2.5 text-gray-800">全体</td>
            <td class="px-4 py-2.5 text-center text-green-600 font-extrabold">${b}</td>
            <td class="px-4 py-2.5 text-center text-red-500 font-extrabold">${f}</td>
            <td class="px-4 py-2.5 text-center text-gray-600">${y}</td>
        </tr>
    `;p.length===0?v+=`
            <tr>
                <td colspan="4" class="px-4 py-6 text-center text-gray-400 text-xs">出欠の入力がある${g?"グループ":"属性"}はありません。</td>
            </tr>
        `:v+=p.map(R=>`
            <tr class="border-b border-gray-100 hover:bg-gray-50/30 transition">
                <td class="px-4 py-2.5 text-gray-700 font-semibold text-xs">${R.name}</td>
                <td class="px-4 py-2.5 text-center text-green-600 font-bold text-xs">${R.attending}</td>
                <td class="px-4 py-2.5 text-center text-red-500 font-bold text-xs">${R.absent}</td>
                <td class="px-4 py-2.5 text-center text-gray-500 text-xs">${R.pending}</td>
            </tr>
        `).join("");const x=`
        <div class="overflow-hidden border border-gray-200 rounded-lg shadow-sm bg-white mb-1">
            <table class="min-w-full text-xs">
                <thead>
                    <tr class="bg-gray-50 border-b border-gray-200">
                        <th class="px-4 py-2.5 text-left font-bold text-gray-600"></th>
                        <th class="px-4 py-2.5 text-center font-bold text-gray-600">🟢 参加</th>
                        <th class="px-4 py-2.5 text-center font-bold text-gray-600">❌ 不参加</th>
                        <th class="px-4 py-2.5 text-center font-bold text-gray-600">❓ 未定/その他</th>
                    </tr>
                </thead>
                <tbody>
                    ${v}
                </tbody>
            </table>
        </div>
        <p class="text-[10px] text-gray-400 font-semibold mb-4">${w}</p>
    `,k=u.filter(R=>{const B=Ue.find(T=>T.event_id===n.id&&T.user_email===R.email),C=(B==null?void 0:B.status)||"未回答";return window.att_statusFilter==="all"?!0:window.att_statusFilter==="answered"?C==="出席"||C==="欠席"||C==="保留"||C==="未定":window.att_statusFilter==="attending"?C==="出席":window.att_statusFilter==="absent"?C==="欠席":window.att_statusFilter==="pending"?C==="保留"||C==="未定":window.att_statusFilter==="unanswered"?C==="未回答"||!C:!0});window.att_statusSortKey||(window.att_statusSortKey="default"),window.att_statusSortOrder||(window.att_statusSortOrder="asc");const $=window.att_statusSortKey,h=window.att_statusSortOrder;$!=="default"&&k.sort((R,B)=>{var F,X;let C,T;if($==="name")C=R.name||R.email.split("@")[0],T=B.name||B.email.split("@")[0];else if($==="group")if(g){const W=Nt.filter(j=>j.user_email===R.email).map(j=>j.group_id);C=mt.filter(j=>W.includes(j.id)).map(j=>j.name).join(", ")||"-";const Z=Nt.filter(j=>j.user_email===B.email).map(j=>j.group_id);T=mt.filter(j=>Z.includes(j.id)).map(j=>j.name).join(", ")||"-"}else C=((F=an.find(W=>W.id===R.attribute_id))==null?void 0:F.name)||"-",T=((X=an.find(W=>W.id===B.attribute_id))==null?void 0:X.name)||"-";else if($==="status"){const W=Z=>{const j=Ue.find(H=>H.event_id===n.id&&H.user_email===Z.email),Q=(j==null?void 0:j.status)||"未回答";return Q==="出席"?1:Q==="保留"||Q==="未定"?2:Q==="未回答"?3:Q==="欠席"?4:5};C=W(R),T=W(B)}else if($==="comment"){const W=Z=>{const j=Ue.find(oe=>oe.event_id===n.id&&oe.user_email===Z.email);if(!j||!j.status||j.status==="未回答")return"";let Q=j.comment||"",H="否";Q.startsWith("[荷物車:可]")?(H="可",Q=Q.substring(8)):Q.startsWith("[荷物車:否]")&&(H="否",Q=Q.substring(8));let re=[];return n.require_detailed_attendance&&(j.accompanying_persons&&re.push(`同伴: ${j.accompanying_persons}`),j.car_capacity&&j.car_capacity>0&&(re.push(`車出: 可[${j.car_capacity}人]`),re.push(`荷物車: ${H}`))),Q.trim()&&re.push(`メモ: ${Q.trim()}`),re.join(", ")};C=W(R),T=W(B)}else if($==="updated_at"){const W=Ue.find(j=>j.event_id===n.id&&j.user_email===R.email),Z=Ue.find(j=>j.event_id===n.id&&j.user_email===B.email);C=W?new Date(W.updated_at).getTime():0,T=Z?new Date(Z.updated_at).getTime():0}return C<T?h==="asc"?-1:1:C>T?h==="asc"?1:-1:0});const _=[{type:"all",label:"すべて"},{type:"answered",label:"回答済"},{type:"attending",label:"出席"},{type:"absent",label:"欠席"},{type:"pending",label:"保留"},{type:"unanswered",label:"未回答"}].map(R=>{const B=window.att_statusFilter===R.type;return`<button onclick="window.att_setStatusFilter('${n.id}', '${R.type}')" class="px-2.5 py-1 rounded-full text-xs font-bold transition ${B?"bg-blue-600 text-white shadow-sm":"bg-gray-100 text-gray-600 hover:bg-gray-200"}">${R.label}</button>`}).join(" ");let I="";k.length===0?I=`
            <tr>
                <td colspan="5" class="px-4 py-6 text-center text-gray-400 text-xs">該当するメンバーはいません。</td>
            </tr>
        `:I=k.map(R=>{var re;const B=R.name||R.email.split("@")[0];let C="-";if(g){const oe=Nt.filter(he=>he.user_email===R.email).map(he=>he.group_id);C=mt.filter(he=>oe.includes(he.id)).map(he=>he.name).join(", ")||"-"}else C=((re=an.find(oe=>oe.id===R.attribute_id))==null?void 0:re.name)||"-";const T=Ue.find(oe=>oe.event_id===n.id&&oe.user_email===R.email);let F=(T==null?void 0:T.status)||"未回答";F==="未定"&&(F="保留");let X="";F==="出席"?X='<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-green-100 text-green-800 border border-green-200">🟢 参加</span>':F==="欠席"?X='<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-red-100 text-red-800 border border-red-200">❌ 不参加</span>':F==="保留"?X='<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-yellow-100 text-yellow-800 border border-yellow-200">❓ 未定/その他</span>':X='<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-gray-100 text-gray-500 border border-gray-200">❓ 未定/その他</span>';let W=(T==null?void 0:T.comment)||"",Z="否";W.startsWith("[荷物車:可]")?(Z="可",W=W.substring(8)):W.startsWith("[荷物車:否]")&&(Z="否",W=W.substring(8));let j=[];T&&T.status&&T.status!=="未回答"&&(n.require_detailed_attendance&&(T.accompanying_persons&&j.push(`同伴: ${T.accompanying_persons}`),T.car_capacity&&T.car_capacity>0&&(j.push(`車出: 可[${T.car_capacity}人]`),j.push(`荷物車: ${Z}`))),W.trim()&&j.push(`メモ: ${W.trim()}`));const Q=j.length>0?j.join(", "):"-",H=T?Gr(T.updated_at):"-";return`
                <tr class="hover:bg-gray-50/50 border-b border-gray-100 transition">
                    <td class="px-4 py-2 font-bold text-gray-800 text-[11px]">${B}</td>
                    <td class="px-4 py-2 text-gray-500 text-[11px] font-semibold">${C}</td>
                    <td class="px-4 py-2">${X}</td>
                    <td class="px-4 py-2 text-gray-600 text-[11px] max-w-[180px] truncate" title="${Q}">${Q}</td>
                    <td class="px-4 py-2 text-gray-400 text-[11px] font-semibold">${H}</td>
                </tr>
            `}).join("");const S=R=>$!==R?'<span class="text-gray-300 ml-1">⇅</span>':h==="asc"?'<span class="text-blue-600 ml-1">▲</span>':'<span class="text-blue-600 ml-1">▼</span>',A=`
        <div class="mt-4 border-t pt-4">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                <h4 class="font-bold text-gray-700 text-xs shrink-0">参加者リスト</h4>
                <div class="flex flex-wrap items-center gap-2">
                    <div class="flex items-center space-x-1">
                        ${_}
                    </div>
                    <button onclick="window.att_exportParticipantList('${n.id}')" class="px-3 py-1.5 rounded bg-green-600 hover:bg-green-700 text-white font-bold text-xs shadow transition flex items-center gap-1 shrink-0">
                        📥 CSVエクスポート
                    </button>
                </div>
            </div>
            <div class="overflow-x-auto border border-gray-200 rounded-lg shadow-sm bg-white">
                <table class="min-w-full text-xs">
                    <thead>
                        <tr class="bg-gray-50 border-b border-gray-200 select-none">
                            <th onclick="window.att_toggleSort('${n.id}', 'name')" class="px-4 py-2 font-bold text-gray-600 text-left text-xs cursor-pointer hover:bg-gray-100 transition">名前 ${S("name")}</th>
                            <th onclick="window.att_toggleSort('${n.id}', 'group')" class="px-4 py-2 font-bold text-gray-600 text-left text-xs cursor-pointer hover:bg-gray-100 transition">${g?"グループ":"属性"} ${S("group")}</th>
                            <th onclick="window.att_toggleSort('${n.id}', 'status')" class="px-4 py-2 font-bold text-gray-600 text-left text-xs cursor-pointer hover:bg-gray-100 transition">出欠 ${S("status")}</th>
                            <th onclick="window.att_toggleSort('${n.id}', 'comment')" class="px-4 py-2 font-bold text-gray-600 text-left text-xs cursor-pointer hover:bg-gray-100 transition">出欠メモ ${S("comment")}</th>
                            <th onclick="window.att_toggleSort('${n.id}', 'updated_at')" class="px-4 py-2 font-bold text-gray-600 text-left text-xs cursor-pointer hover:bg-gray-100 transition">更新日時 ${S("updated_at")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${I}
                    </tbody>
                </table>
            </div>
        </div>
    `,P=t==="basic"?"border-b-2 border-blue-500 text-blue-600 font-bold":"text-gray-500 hover:text-gray-700",M=t==="attendance"?"border-b-2 border-blue-500 text-blue-600 font-bold":"text-gray-500 hover:text-gray-700",N=t==="status"?"border-b-2 border-blue-500 text-blue-600 font-bold":"text-gray-500 hover:text-gray-700",G=`
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div class="flex justify-between items-center p-4 border-b shrink-0">
                <h3 class="text-lg font-bold text-gray-800 truncate pr-2">${n.title}</h3>
                <div class="flex items-center shrink-0">
                    <button onclick="window.att_editEvent('${n.id}')" class="text-green-600 text-xs border border-green-600 px-2 py-1 rounded hover:bg-green-50 mr-2">編集</button>
                    <button onclick="window.att_copyEvent('${n.id}')" class="text-blue-500 text-xs border border-blue-500 px-2 py-1 rounded hover:bg-blue-50 mr-2">複製</button>
                    <button onclick="window.att_deleteEvent('${n.id}')" class="text-red-500 text-xs border border-red-500 px-2 py-1 rounded hover:bg-red-50 mr-2">削除</button>
                    <button onclick="window.att_closeModal()" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
                </div>
            </div>

            <div class="flex border-b shrink-0">
                <button onclick="window.att_openEventDetail('${n.id}', 'basic')" class="flex-1 py-2 text-sm font-medium ${P}">基本情報</button>
                ${n.requires_attendance?`
                    <button onclick="window.att_openEventDetail('${n.id}', 'attendance')" class="flex-1 py-2 text-sm font-medium ${M}">出欠登録</button>
                    <button onclick="window.att_openEventDetail('${n.id}', 'status')" class="flex-1 py-2 text-sm font-medium ${N}">出欠状況</button>
                `:""}
            </div>

            <div class="p-4 overflow-y-auto">
                ${t==="basic"?`
                    <div class="text-sm text-gray-600 mb-4 space-y-1">
                        <p><strong>日時:</strong> ${o}</p>
                        <p><strong>場所:</strong> ${Yr(n.location)}</p>
                        <p class="flex items-center gap-1 mt-1"><strong>カテゴリ:</strong> <span class="px-2 py-0.5 rounded text-xs text-gray-800 shadow-sm" style="background-color: ${r}">${n.category||"未設定"}</span></p>
                        <p class="flex items-center gap-1 mt-1"><strong>対象:</strong> ${Vr(a)}</p>
                        <p class="mt-2 whitespace-pre-wrap border p-2 bg-gray-50 rounded min-h-[60px] text-gray-800">${n.description||"説明なし"}</p>
                    </div>
                `:t==="attendance"?`
                    <div class="space-y-4">
                        <div class="text-sm border-b pb-2 mb-2">
                            現在のステータス: <span class="font-bold ${d==="出席"?"text-green-600":d==="欠席"?"text-red-500":"text-gray-800"}">${d}</span>
                            <br><span class="text-xs text-gray-500">回答期限: ${c}</span>
                            ${l?'<span class="ml-2 text-red-500 font-bold text-xs bg-red-100 px-2 py-0.5 rounded shadow-sm">期限切れ</span>':""}
                        </div>
                        ${(()=>{const{formsHtml:R,hasAnyForm:B}=Jr(n,a,l);return R+(B?`
                                <div class="mt-4 text-right">
                                    <button onclick="window.att_saveAttendance('${n.id}')" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-bold shadow">出欠を一括保存</button>
                                </div>
                            `:"")})()}
                    </div>
                `:`
                    <div class="space-y-4">
                        ${m}
                        ${x}
                        ${A}
                    </div>
                `}
            </div>
        </div>
    </div>`;document.getElementById("attendance-modals").innerHTML=G};function Wo(e){const t=kt.find(i=>i.id===e);if(!t)return;const n=Zn(t),a=t.attendance_deadline?new Date>new Date(t.attendance_deadline):!1,{formsHtml:s,hasAnyForm:r}=Jr(t,n,a),o=`
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[110]">
        <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm max-h-[90vh] overflow-y-auto">
            <h3 class="text-lg font-bold mb-4">出欠入力</h3>
            <div class="space-y-4">
                ${s}
            </div>
            <div class="flex justify-end space-x-3 mt-6">
                <button onclick="window.att_openEventDetail('${e}')" class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded font-bold">戻る</button>
                ${r?`<button onclick="window.att_saveAttendance('${e}')" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold shadow">一括保存</button>`:""}
            </div>
        </div>
    </div>`;document.getElementById("attendance-modals").innerHTML=o}async function zo(e){const t=document.querySelectorAll("[data-target-email]");if(t.length===0)return window.att_closeModal();const n=kt.find(s=>s.id===e);if(!n)return;const a=[];t.forEach(s=>{const r=s.getAttribute("data-target-email"),o=s.querySelector('select[id^="att-status-"]');if(o){const i=s.querySelector('input[id^="att-acc-"]'),d=s.querySelector('select[id^="att-car-flag-"]'),l=s.querySelector('input[id^="att-car-cap-"]'),c=s.querySelector('select[id^="att-luggage-flag-"]'),u=s.querySelector('textarea[id^="att-comment-"]'),g=d?d.value:"否",b=g==="可"&&l&&parseInt(l.value)||0;let f=u?u.value.trim():"";n.require_detailed_attendance&&g==="可"&&(f=`[荷物車:${c?c.value:"否"}]`+f),a.push({event_id:e,user_email:r,status:o.value,accompanying_persons:i?i.value:"",car_capacity:b,separate_action:null,comment:f,updated_at:new Date().toISOString()})}}),z("出欠保存中...");try{const{error:s}=await L.from("attendances").upsert(a,{onConflict:"event_id, user_email"});if(s)throw s;await be("UPDATE_ATTENDANCE",`イベント(ID:${e})の出欠を ${a.length}件更新しました`),await Dn(),pt(),tn(),window.att_openEventDetail(e,"status")}catch(s){console.error("Save Attendance Error:",s),s.message==="Load failed"||s.message==="Failed to fetch"?alert("出欠登録エラー: 通信に失敗しました。ネットワーク接続やデータベースの状態を確認してください。"):alert("出欠登録エラー: "+s.message)}finally{V()}}function Jo(){const t=[["タイトル","日付","開始時刻","終了時刻","終日","カテゴリ","対象グループ","場所","出欠管理","詳細出欠","説明","回答期限"].join(",")];kt.forEach(o=>{const i=o.start_time?o.start_time.split("T")[0]:"",d=o.start_time&&!o.is_all_day?o.start_time.split("T")[1].substring(0,5):"",l=o.end_time&&!o.is_all_day?o.end_time.split("T")[1].substring(0,5):"",u=Zn(o).name,g=b=>b==null?'""':`"${String(b).replace(/"/g,'""')}"`;t.push([g(o.title),g(i),g(d),g(l),o.is_all_day?"TRUE":"FALSE",g(o.category),g(u),g(o.location),o.requires_attendance?"TRUE":"FALSE",o.require_detailed_attendance?"TRUE":"FALSE",g(o.description),g(o.attendance_deadline)].join(","))});const n=new Uint8Array([239,187,191]),a=new Blob([n,t.join(`
`)],{type:"text/csv;charset=utf-8;"}),s=URL.createObjectURL(a),r=document.createElement("a");r.href=s,r.download=`events_${new Date().toISOString().split("T")[0]}.csv`,r.click(),URL.revokeObjectURL(s)}function Yo(e){const t=[];let n=[],a="",s=!1;for(let r=0;r<e.length;r++){const o=e[r];s?o==='"'?r+1<e.length&&e[r+1]==='"'?(a+='"',r++):s=!1:a+=o:o==='"'?s=!0:o===","?(n.push(a),a=""):o===`
`||o==="\r"?(n.push(a),t.push(n),n=[],a="",o==="\r"&&r+1<e.length&&e[r+1]===`
`&&r++):a+=o}return(a||n.length>0)&&(n.push(a),t.push(n)),t}window.att_importCsv=async function(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=async a=>{const s=a.target.result,r=Yo(s);if(r.length<2)return alert("インポートするデータがありません。");const o=[];for(let c=1;c<r.length;c++){const u=r[c];if(u.length<2||!u[0]||!u[1])continue;const g=u[0],b=u[1],f=u[2],y=u[3],p=(u[4]||"").toUpperCase()==="TRUE",m=u[5],w=u[6]||"",v=u[7],x=(u[8]||"").toUpperCase()==="TRUE"||(u[8]||"").trim()==="",k=(u[9]||"").toUpperCase()==="TRUE",$=u[10],h=u[11]||null,E=`${b}T${f||"00:00"}:00`;let _=null;y&&(_=`${b}T${y}:00`);const I=w.split(",").map(M=>M.trim()),S=mt.filter(M=>I.includes(M.name)),A=S.length>0?S.map(M=>M.id):null,P=A?A[0]:null;o.push({title:g,category:m||null,description:$||null,location:v||null,start_time:E,end_time:_,is_all_day:p,requires_attendance:x,require_detailed_attendance:k,attendance_deadline:h,target_group_id:P,target_group_ids:A,created_by:Y==null?void 0:Y.email})}if(o.length===0)return alert(`インポート可能なイベントがありませんでした。
タイトルと日付は必須です。`);const i=o.map(c=>{const u=c.is_all_day?c.start_time.split("T")[0]+" (終日)":c.start_time.replace("T"," ").substring(0,16);return`<div class="text-sm border-b py-2 border-gray-200">
                <div class="font-bold text-gray-800">${c.title}</div>
                <div class="text-gray-600 text-xs">${u}</div>
            </div>`}).join(""),d=`
        <div id="csv-import-confirm-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[120]">
            <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
                <h3 class="text-lg font-bold mb-4">インポート確認 (${o.length}件)</h3>
                <div class="overflow-y-auto flex-1 mb-4 border rounded p-2 bg-gray-50 min-h-[150px]">
                    ${i}
                </div>
                <div class="flex justify-end space-x-3 mt-2">
                    <button id="btn-cancel-import" class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded font-bold">キャンセル</button>
                    <button id="btn-exec-import" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold shadow">インポート実行</button>
                </div>
            </div>
        </div>`,l=document.createElement("div");l.innerHTML=d,document.body.appendChild(l.firstElementChild),document.getElementById("btn-cancel-import").onclick=()=>{document.getElementById("csv-import-confirm-modal").remove(),document.getElementById("file-import-csv").value=""},document.getElementById("btn-exec-import").onclick=async()=>{document.getElementById("csv-import-confirm-modal").remove(),z("インポート実行中...");try{const{error:c}=await L.from("events").insert(o);if(c)throw c;await be("IMPORT_EVENTS",`イベントデータを${o.length}件インポートしました`),alert(`${o.length}件のインポートが完了しました。`),await Dn(),pt(),tn()}catch(c){alert(`インポート中にエラーが発生しました:
`+c.message)}finally{V(),document.getElementById("file-import-csv").value=""}}},n.readAsText(t)};function Jt(e){if(!e)return null;const t=new Date(e+"T00:00:00");if(isNaN(t.getTime()))return null;const n=new Date(t.getTime()-3*24*60*60*1e3),a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),r=String(n.getDate()).padStart(2,"0");return`${a}-${s}-${r}T12:00:00`}function hr(e){const t=Jt(e);if(!t)return"";const n=new Date(t),a=n.getFullYear(),s=n.getMonth()+1,r=n.getDate(),o=Ws[n.getDay()];return`${a}/${s}/${r}(${o}) 12:00`}function Yr(e){if(!e)return"未定";let t=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");const n=/(https?:\/\/[^\s\<\>\"]+)/g;return t.replace(n,a=>`<a href="${a}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="text-blue-600 hover:underline inline-flex items-center space-x-0.5 ml-1 font-semibold">
            <span>地図/リンク</span>
            <svg class="w-3.5 h-3.5 inline ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
        </a>`)}function Kr(){const e=document.getElementById("multiselect-bar"),t=document.getElementById("multiselect-count");!e||!t||(window.att_multiSelectMode&&window.att_selectedDates.size>0?(t.textContent=window.att_selectedDates.size,e.classList.remove("hidden")):e.classList.add("hidden"))}function Ko(){window.att_selectedDates.clear(),pt(),Kr()}function Qo(){if(window.att_selectedDates.size===0){alert("日程が選択されていません。");return}const e=Array.from(window.att_selectedDates).sort();fa("",null,!1,e)}function ga(){const e=document.getElementById("ev-dates-container");if(e){if(e.innerHTML="",$e.length===0){e.innerHTML='<div class="text-xs text-gray-500 py-1.5 text-center">日付が選択されていません</div>';return}$e.forEach((t,n)=>{const a=document.createElement("div");a.className="flex items-center space-x-2 bg-white p-1.5 rounded border shadow-sm";const s=document.createElement("input");if(s.type="date",s.value=t,s.className="border rounded text-xs px-2 py-1 flex-1 min-w-0 font-medium focus:ring-1 focus:ring-blue-500 focus:border-blue-500",s.onchange=r=>{$e[n]=r.target.value,mn()},a.appendChild(s),!window.att_isEditingModal){const r=document.createElement("button");r.type="button",r.className="text-red-500 hover:text-red-700 font-bold p-1 transition rounded hover:bg-red-50",r.innerHTML=`
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            `,r.onclick=()=>{$e.splice(n,1),ga(),mn()},a.appendChild(r)}e.appendChild(a)})}}function Zo(){let e=new Date().toISOString().split("T")[0];if($e.length>0){const t=new Date($e[$e.length-1]);isNaN(t.getTime())||(t.setDate(t.getDate()+1),e=t.toISOString().split("T")[0])}$e.push(e),ga(),mn()}function Xo(e){$e.splice(e,1),ga(),mn()}function mn(){const e=document.getElementById("ev-deadline-auto-preview");if(e){if($e.length===0){e.innerHTML='<span class="text-red-500 font-semibold text-xs">日付を入力してください</span>';return}if($e.length===1)if(Jt($e[0])){const n=hr($e[0]);e.innerHTML=`<span class="text-blue-600 font-bold">自動算出:</span> ${n}`}else e.innerHTML='<span class="text-red-500 font-semibold text-xs">日付が不正です</span>';else{const t=hr($e[0]);e.innerHTML=`<span class="text-blue-600 font-bold">自動算出:</span> 各日程の3日前の12:00<br><span class="text-[10px] text-gray-400 font-semibold">(例: ${$e[0]}分 → ${t})</span>`}}}function ei(e){const t=document.getElementById("ev-location-custom-container");t&&(e==="custom"?t.classList.remove("hidden"):t.classList.add("hidden"))}async function ti(){const e=document.getElementById("ev-location-custom-name"),t=document.getElementById("ev-location-custom-url");if(!e)return;const n=e.value.trim(),a=t?t.value.trim():"";if(!n)return alert("場所名は必須です");z("場所マスタに登録中...");try{const{error:s}=await L.from("event_locations").insert({name:n,url:a||null});if(s)throw s;const{data:r}=await L.from("event_locations").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});r&&(un=r);const o=document.getElementById("ev-location-select");if(o){const i=a?`${n} ${a}`:n;o.innerHTML=`
                <option value="custom">-- 直接入力 / 新規マスタ追加 --</option>
                ${un.map(l=>{const c=l.url?`${l.name} ${l.url}`:l.name;return`<option value="${c}" ${c===i?"selected":""}>${l.name}${l.url?" (URLあり)":""}</option>`}).join("")}
            `;const d=document.getElementById("ev-location-custom-container");d&&d.classList.add("hidden"),e.value="",t&&(t.value="")}alert("場所マスタに登録しました")}catch(s){console.error("Failed to register location:",s),alert("マスタ登録エラー: "+(s.message||String(s)))}finally{V()}}window.att_closeModal=()=>{const e=document.getElementById("attendance-modals");e&&(e.innerHTML="")};window.att_saveEvent=Vo;window.att_deleteEvent=Go;window.att_openEventDetail=openEventDetailModal;window.att_openAttendanceForm=Wo;window.att_saveAttendance=zo;window.att_exportCsv=Jo;window.att_statusViewType=window.att_statusViewType||"group";window.att_statusFilter=window.att_statusFilter||"all";window.att_setStatusViewType=(e,t)=>{window.att_statusViewType=t,window.att_openEventDetail(e,"status")};window.att_setStatusFilter=(e,t)=>{window.att_statusFilter=t,window.att_openEventDetail(e,"status")};window.att_copyEvent=function(e){const t=kt.find(a=>a.id===e);if(!t)return;const n=window.att_selectedDates&&window.att_selectedDates.size>0?Array.from(window.att_selectedDates).sort():null;fa("",t,!1,n)};window.att_editEvent=function(e){const t=kt.find(n=>n.id===e);t&&fa("",t,!0)};window.att_addDateRow=Zo;window.att_removeDateRow=Xo;window.att_renderDateRows=ga;window.att_updateDefaultDeadlineLabel=mn;window.att_openBulkAddEvent=Qo;window.att_clearDateSelection=Ko;window.att_onLocationSelectChange=ei;window.att_registerNewLocation=ti;window.att_updateMultiselectBar=Kr;window.att_onSingleDateChange=e=>{$e=[e],mn();const t=Jt(e);if(t){const n=t.split("T")[0],a=t.split("T")[1].substring(0,5),s=a.split(":")[0],r=a.split(":")[1],o=document.getElementById("ev-deadline-date"),i=document.getElementById("ev-deadline-time-h"),d=document.getElementById("ev-deadline-time-m");o&&(o.value=n),i&&(i.value=s),d&&(d.value=r)}};window.att_toggleDeadlineCustom=e=>{const t=document.getElementById("ev-deadline-custom-inputs"),n=document.getElementById("ev-deadline-auto-preview");if(!(!t||!n))if(e){t.classList.remove("hidden"),n.classList.add("hidden");const a=$e[0],s=Jt(a);if(s){const r=s.split("T")[0],o=s.split("T")[1].substring(0,5),i=o.split(":")[0],d=o.split(":")[1],l=document.getElementById("ev-deadline-date"),c=document.getElementById("ev-deadline-time-h"),u=document.getElementById("ev-deadline-time-m");l&&!l.value&&(l.value=r),c&&!c.value&&(c.value=i),u&&!u.value&&(u.value=d)}}else t.classList.add("hidden"),n.classList.remove("hidden"),mn()};function wa(e){const t=e.getFullYear(),n=e.getMonth()+1,a=e.getDate();if(n===1&&a===1||n===2&&a===11||n===2&&a===23||n===4&&a===29||n===5&&a===3||n===5&&a===4||n===5&&a===5||n===8&&a===11||n===11&&a===3||n===11&&a===23)return!0;if(e.getDay()===1){const r=Math.floor((a-1)/7)+1;if(n===1&&r===2||n===7&&r===3||n===9&&r===3||n===10&&r===2)return!0}if(n===3){const r=Math.floor(20.8431+.242194*(t-1980)-Math.floor((t-1980)/4));if(a===r)return!0}if(n===9){const r=Math.floor(23.2488+.242194*(t-1980)-Math.floor((t-1980)/4));if(a===r)return!0}return!1}function ni(e){if(wa(e))return!0;const t=e.getFullYear(),n=e.getMonth(),a=e.getDate(),s=e.getDay();if(s===1){const i=new Date(t,n,a-1);if(wa(i))return!0}const r=new Date(t,n,a-1),o=new Date(t,n,a+1);return!!(wa(r)&&wa(o)&&s!==0)}async function ai(){z("予定情報をエクスポート中...");try{const{data:e}=await L.from("events").select("*").order("start_time",{ascending:!0}),{data:t}=await L.from("groups").select("*"),n=new Map(t.map(d=>[d.id,d.name])),s=[["ID","タイトル","カテゴリ","場所","開始日時","終了日時","説明","終日(1/0)","出欠回答要(1/0)","詳細回答要(1/0)","回答期限","対象グループ名","削除(1/0)"]];e.forEach(d=>{let l="";d.target_group_ids&&d.target_group_ids.length>0?l=d.target_group_ids.map(b=>n.get(b)||"").filter(b=>b).join(", "):d.target_group_id&&(l=n.get(d.target_group_id)||"");const c=d.start_time?d.start_time.replace("T"," ").substring(0,16):"",u=d.end_time?d.end_time.replace("T"," ").substring(0,16):"",g=d.attendance_deadline?d.attendance_deadline.replace("T"," ").substring(0,16):"";s.push([d.id,d.title||"",d.category||"",d.location||"",c,u,d.description||"",d.is_all_day?"1":"0",d.requires_attendance?"1":"0",d.require_detailed_attendance?"1":"0",g,l,"0"])});const r=s.map(d=>d.map(window.escapeCSV).join(",")).join(`
`),o=new Blob([new Uint8Array([239,187,191]),r],{type:"text/csv;charset=utf-8;"}),i=document.createElement("a");i.href=URL.createObjectURL(o),i.download=`schedule_${new Date().toISOString().split("T")[0]}.csv`,i.click()}catch(e){console.error(e),alert("予定のエクスポートに失敗しました: "+e.message)}finally{V()}}async function si(e){const t=e.target.files[0];if(!t)return;z("CSVファイルを解析中...");const n=new FileReader;n.onload=async a=>{try{const s=a.target.result,r=window.parseCSV(s);if(r.length<2){alert("有効なデータがありません。"),V();return}const o=r[0].map(M=>M.trim()),i=o.indexOf("ID"),d=o.indexOf("タイトル"),l=o.indexOf("カテゴリ"),c=o.indexOf("場所"),u=o.indexOf("開始日時"),g=o.indexOf("終了日時"),b=o.indexOf("説明"),f=o.findIndex(M=>M.includes("終日")),y=o.findIndex(M=>M.includes("出欠回答要")),p=o.findIndex(M=>M.includes("詳細回答要")),m=o.findIndex(M=>M.includes("回答期限")),w=o.findIndex(M=>M.includes("対象グループ名")),v=o.findIndex(M=>M.includes("削除"));if(d===-1||u===-1){alert("「タイトル」および「開始日時」列は必須です。"),V();return}const{data:x}=await L.from("events").select("*"),{data:k}=await L.from("groups").select("*"),$=new Map(k.map(M=>[M.name,M.id])),h=new Map(x.map(M=>[M.id,M])),E=new Map(x.map(M=>[`${M.title}_${M.start_time?M.start_time.substring(0,16).replace("T"," "):""}`,M])),_=[],I=[],S=[],A=M=>{if(!M)return null;let N=M.trim().replace(/\//g,"-").replace(" ","T");return N.length===10?N+="T00:00:00":N.length===16&&(N+=":00"),N};for(let M=1;M<r.length;M++){const N=r[M];if(N.length<2)continue;const G=(N[d]||"").trim(),R=(N[u]||"").trim();if(!G||!R)continue;const B=A(R),C=i!==-1?(N[i]||"").trim():"",T=l!==-1?(N[l]||"").trim():"",F=c!==-1?(N[c]||"").trim():"",X=g!==-1?A(N[g]):null,W=b!==-1?(N[b]||"").trim():"",Z=f!==-1?N[f]==="1"||N[f]==="true":!1,j=y!==-1?!(N[y]==="0"||N[y]==="false"):!0,Q=p!==-1?N[p]==="1"||N[p]==="true":!1,H=m!==-1?A(N[m]):null,re=v!==-1?N[v]==="1"||N[v]==="削除":!1,oe=w!==-1?(N[w]||"").trim():"";let he=[],Te="";if(oe){const ot=oe.split(",").map(He=>He.trim()).filter(He=>He);he=ot.map(He=>$.get(He)).filter(He=>He),Te=ot.join(", ")}const tt={id:C,title:G,category:T,location:F,start_time:B,end_time:X,description:W,is_all_day:Z,requires_attendance:j,require_detailed_attendance:Q,attendance_deadline:H,target_group_ids:he,target_group_name:Te};let me=null;if(C&&(me=h.get(C)),!me){const ot=`${G}_${R.substring(0,16).replace(/\//g,"-")}`;me=E.get(ot)}if(me)if(tt.id=me.id,re)S.push(tt);else{const ot=me.title!==G,He=me.category!==T,Ft=me.location!==F,Dt=me.description!==W,xt=(me.start_time?me.start_time.substring(0,16):"")!==(B?B.substring(0,16):""),vt=(me.end_time?me.end_time.substring(0,16):"")!==(X?X.substring(0,16):""),gt=me.is_all_day!==Z,K=me.requires_attendance!==j,pe=me.require_detailed_attendance!==Q,D=(me.attendance_deadline?me.attendance_deadline.substring(0,16):"")!==(H?H.substring(0,16):""),q=me.target_group_ids||(me.target_group_id?[me.target_group_id]:[]),fe=JSON.stringify([...q].sort())!==JSON.stringify([...he].sort());(ot||He||Ft||Dt||xt||vt||gt||K||pe||D||fe)&&I.push(tt)}else re||_.push(tt)}V();let P="";S.length>0&&(P=`⚠️ 警告: ${S.length}件の予定が削除されます。予定を削除すると、その予定に紐づいているメンバー全員の出欠データや配車データも自動的に削除されます。`),window.showCSVConfirmModal("events",_,I,S,"予定CSVインポート確認",P)}catch(s){console.error(s),alert("CSVの解析に失敗しました: "+s.message),V()}},n.readAsText(t)}async function ri(){const{add:e,update:t,delete:n}=Qt;z("予定データを保存中...");try{if(n.length>0){const a=n.map(r=>r.id),{error:s}=await L.from("events").delete().in("id",a);if(s)throw s;await be("IMPORT_EVENTS_DELETE",`${n.length}件の予定をインポートで削除しました`)}if(e.length>0){const a=e.map(r=>({title:r.title,category:r.category,location:r.location,start_time:r.start_time,end_time:r.end_time,description:r.description,is_all_day:r.is_all_day,requires_attendance:r.requires_attendance,require_detailed_attendance:r.requires_attendance?r.require_detailed_attendance:!1,attendance_deadline:r.attendance_deadline,target_group_ids:r.target_group_ids.length>0?r.target_group_ids:null,created_by:Y==null?void 0:Y.email})),{error:s}=await L.from("events").insert(a);if(s)throw s;await be("IMPORT_EVENTS_ADD",`${e.length}件の予定をインポートで追加しました`)}if(t.length>0){for(let a of t){const{error:s}=await L.from("events").update({title:a.title,category:a.category,location:a.location,start_time:a.start_time,end_time:a.end_time,description:a.description,is_all_day:a.is_all_day,requires_attendance:a.requires_attendance,require_detailed_attendance:a.requires_attendance?a.require_detailed_attendance:!1,attendance_deadline:a.attendance_deadline,target_group_ids:a.target_group_ids.length>0?a.target_group_ids:null}).eq("id",a.id);if(s)throw s}await be("IMPORT_EVENTS_UPDATE",`${t.length}件の予定をインポートで更新しました`)}alert("予定のインポートが完了しました。"),window.closeCSVConfirmModal(),await Dn(),pt(),document.getElementById("list-container").classList.contains("hidden")||tn()}catch(a){console.error(a),alert("予定データの保存に失敗しました: "+a.message)}finally{V()}}window.executeEventsImport=ri;function oi(){const n=[["ID","タイトル","カテゴリ","場所","開始日時","終了日時","説明","終日(1/0)","出欠回答要(1/0)","詳細回答要(1/0)","回答期限","対象グループ名","削除(1/0)"],["","土曜練習","練習","第一グラウンド","2026-06-20 09:00","2026-06-20 12:00","通常練習を行います。","0","1","1","2026-06-19 18:00","選手・保護者","0"],["","練習試合(イーグルス戦)","試合","イーグルス球場","2026-06-21 13:00","2026-06-21 16:00","遠征試合です。車出しをお願いします。","0","1","1","2026-06-20 12:00","選手・保護者","0"]].map(r=>r.map(window.escapeCSV).join(",")).join(`
`),a=new Blob([new Uint8Array([239,187,191]),n],{type:"text/csv;charset=utf-8;"}),s=document.createElement("a");s.href=URL.createObjectURL(a),s.download="schedule_sample.csv",s.click()}window.att_toggleSort=function(e,t){window.att_statusSortKey===t?window.att_statusSortOrder==="asc"?window.att_statusSortOrder="desc":(window.att_statusSortKey="default",window.att_statusSortOrder="asc"):(window.att_statusSortKey=t,window.att_statusSortOrder="asc"),window.att_openEventDetail(e,"status")};window.att_exportParticipantList=function(e){const t=kt.find(f=>f.id===e);if(!t)return;const n=Zn(t),a=window.att_statusViewType==="group";let s=[];if(n.ids.length===0)s=cn.filter(f=>f.can_use_attendance!==!1);else{const f=Nt.filter(m=>n.ids.includes(m.group_id)).map(m=>m.user_email),p=Ue.filter(m=>m.event_id===t.id).map(m=>m.user_email);s=cn.filter(m=>m.can_use_attendance!==!1&&(f.includes(m.email)||p.includes(m.email)))}const r=s.filter(f=>{const y=Ue.find(m=>m.event_id===t.id&&m.user_email===f.email),p=(y==null?void 0:y.status)||"未回答";return window.att_statusFilter==="all"?!0:window.att_statusFilter==="answered"?p==="出席"||p==="欠席"||p==="保留"||p==="未定":window.att_statusFilter==="attending"?p==="出席":window.att_statusFilter==="absent"?p==="欠席":window.att_statusFilter==="pending"?p==="保留"||p==="未定":window.att_statusFilter==="unanswered"?p==="未回答"||!p:!0}),o=window.att_statusSortKey||"default",i=window.att_statusSortOrder||"asc";o!=="default"&&r.sort((f,y)=>{var w,v;let p,m;if(o==="name")p=f.name||f.email.split("@")[0],m=y.name||y.email.split("@")[0];else if(o==="group")if(a){const x=Nt.filter($=>$.user_email===f.email).map($=>$.group_id);p=mt.filter($=>x.includes($.id)).map($=>$.name).join(", ")||"-";const k=Nt.filter($=>$.user_email===y.email).map($=>$.group_id);m=mt.filter($=>k.includes($.id)).map($=>$.name).join(", ")||"-"}else p=((w=an.find(x=>x.id===f.attribute_id))==null?void 0:w.name)||"-",m=((v=an.find(x=>x.id===y.attribute_id))==null?void 0:v.name)||"-";else if(o==="status"){const x=k=>{const $=Ue.find(E=>E.event_id===t.id&&E.user_email===k.email),h=($==null?void 0:$.status)||"未回答";return h==="出席"?1:h==="保留"||h==="未定"?2:h==="未回答"?3:h==="欠席"?4:5};p=x(f),m=x(y)}else if(o==="comment"){const x=k=>{const $=Ue.find(I=>I.event_id===t.id&&I.user_email===k.email);if(!$||!$.status||$.status==="未回答")return"";let h=$.comment||"",E="否";h.startsWith("[荷物車:可]")?(E="可",h=h.substring(8)):h.startsWith("[荷物車:否]")&&(E="否",h=h.substring(8));let _=[];return t.require_detailed_attendance&&($.accompanying_persons&&_.push(`同伴: ${$.accompanying_persons}`),$.car_capacity&&$.car_capacity>0&&(_.push(`車出: 可[${$.car_capacity}人]`),_.push(`荷物車: ${E}`))),h.trim()&&_.push(`メモ: ${h.trim()}`),_.join(", ")};p=x(f),m=x(y)}else if(o==="updated_at"){const x=Ue.find($=>$.event_id===t.id&&$.user_email===f.email),k=Ue.find($=>$.event_id===t.id&&$.user_email===y.email);p=x?new Date(x.updated_at).getTime():0,m=k?new Date(k.updated_at).getTime():0}return p<m?i==="asc"?-1:1:p>m?i==="asc"?1:-1:0});const l=[["名前",a?"グループ":"属性","出欠ステータス","同伴者","車出し可否","乗車人数","荷物車対応","コメント","更新日時"]];r.forEach(f=>{var _;const y=f.name||f.email.split("@")[0];let p="-";if(a){const I=Nt.filter(S=>S.user_email===f.email).map(S=>S.group_id);p=mt.filter(S=>I.includes(S.id)).map(S=>S.name).join(", ")||"-"}else p=((_=an.find(I=>I.id===f.attribute_id))==null?void 0:_.name)||"-";const m=Ue.find(I=>I.event_id===t.id&&I.user_email===f.email);let w=(m==null?void 0:m.status)||"未回答";w==="未定"&&(w="保留");let v=(m==null?void 0:m.comment)||"",x="否";v.startsWith("[荷物車:可]")?(x="可",v=v.substring(8)):v.startsWith("[荷物車:否]")&&(x="否",v=v.substring(8));const k=(m==null?void 0:m.accompanying_persons)||"",$=(m==null?void 0:m.car_capacity)||0,h=$>0?"可":"否",E=m?Gr(m.updated_at):"-";l.push([y,p,w,k,h,$,x,v,E])});const c=l.map(f=>f.map(window.escapeCSV).join(",")).join(`
`),u=new Blob([new Uint8Array([239,187,191]),c],{type:"text/csv;charset=utf-8;"}),g=document.createElement("a"),b=t.title.replace(/[\/\\?%*:|"<>]/g,"_");g.href=URL.createObjectURL(u),g.setAttribute("download",`参加者リスト_${b}_${window.att_statusFilter}.csv`),document.body.removeChild(g)};function ls(e){if(!e||isNaN(e.getTime()))return"";const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0"),s=String(e.getHours()).padStart(2,"0"),r=String(e.getMinutes()).padStart(2,"0");return`${t}-${n}-${a}T${s}:${r}`}function ii(e){const t=e.split(/\r?\n/),n=[];let a=null,s=!1;const r=[];for(let o of t)o.startsWith(" ")||o.startsWith("	")?r.length>0&&(r[r.length-1]+=o.substring(1)):r.push(o);for(let o of r){const i=o.trim();if(i){if(i==="BEGIN:VEVENT")a={title:"",description:"",location:"",start:null,end:null,isAllDay:!1},s=!0;else if(i==="END:VEVENT")a&&n.push(a),s=!1,a=null;else if(s&&a){const d=i.indexOf(":");if(d===-1)continue;const l=i.substring(0,d),c=i.substring(d+1),u=l.split(";")[0],g=l.split(";").slice(1);if(u==="SUMMARY")a.title=cs(c);else if(u==="DESCRIPTION")a.description=cs(c);else if(u==="LOCATION")a.location=cs(c);else if(u==="DTSTART"){const b=g.some(f=>f.toUpperCase()==="VALUE=DATE");a.start=xr(c,b),b&&(a.isAllDay=!0)}else if(u==="DTEND"){const b=g.some(f=>f.toUpperCase()==="VALUE=DATE");a.end=xr(c,b)}}}}return n}function cs(e){return e.replace(/\\n/g,`
`).replace(/\\r/g,"\r").replace(/\\t/g,"	").replace(/\\,/g,",").replace(/\\;/g,";").replace(/\\\\/g,"\\")}function xr(e,t){if(!e)return null;const n=parseInt(e.substring(0,4)),a=parseInt(e.substring(4,6))-1,s=parseInt(e.substring(6,8));if(t||e.indexOf("T")===-1)return new Date(n,a,s);const r=e.indexOf("T"),o=parseInt(e.substring(r+1,r+3)),i=parseInt(e.substring(r+3,r+5)),d=parseInt(e.substring(r+5,r+7))||0;return e.endsWith("Z")?new Date(Date.UTC(n,a,s,o,i,d)):new Date(n,a,s,o,i,d)}async function di(e){const t=e.target.files[0];if(!t)return;z("ICSファイルを解析中...");const n=new FileReader;n.onload=async a=>{try{const s=a.target.result,r=ii(s);if(V(),r.length===0){alert("ICSファイルから有効な予定が見つかりませんでした。");return}li(r)}catch(s){console.error(s),alert("ICSファイルの解析に失敗しました: "+s.message),V()}},n.readAsText(t),e.target.value=""}function li(e){const t=document.getElementById("ics-import-list");if(!t)return;const n=document.getElementById("ics-import-count");n&&(n.textContent=e.length),t.innerHTML=e.map((r,o)=>{var y,p;const i=r.title||"",d=i.toLowerCase();let l=((y=st[0])==null?void 0:y.name)||"練習";for(let m of st)if(d.includes(m.name)){l=m.name;break}l===((p=st[0])==null?void 0:p.name)&&(d.includes("試合")||d.includes("vs")||d.includes("戦")?st.find(w=>w.name==="試合")&&(l="試合"):(d.includes("イベント")||d.includes("会")||d.includes("式")||d.includes("フェス"))&&st.find(w=>w.name==="イベント")&&(l="イベント"));let c="";if(r.location){const m=un.find(w=>w.name===r.location);m?c=m.name:c="custom"}const u=ls(r.start),g=ls(r.end||(r.start?new Date(r.start.getTime()+2*60*60*1e3):null));let b=r.start?new Date(r.start.getTime()-3*24*60*60*1e3):null;b&&b.setHours(12,0,0,0);const f=ls(b);return`
            <div class="ics-row p-4 border border-gray-200 rounded-xl bg-gray-50/30 hover:bg-gray-50/70 transition flex gap-4" data-idx="${o}">
                <!-- 左側: 選択チェックボックス -->
                <div class="flex items-start pt-2 justify-center shrink-0 w-8">
                    <input type="checkbox" class="ics-row-select h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" checked>
                </div>
                
                <!-- 右側: フィールド群 -->
                <div class="flex-1 space-y-3">
                    <!-- 1行目: タイトル, カテゴリ, 場所 -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">タイトル *</label>
                            <input type="text" class="ics-row-title w-full border p-2 rounded-lg font-bold text-sm bg-white focus:ring-2 focus:ring-blue-500" value="${i}">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">カテゴリ</label>
                            <select class="ics-row-category w-full border p-2 rounded-lg font-semibold text-sm bg-white focus:ring-2 focus:ring-blue-500">
                                ${st.map(m=>`<option value="${m.name}" ${m.name===l?"selected":""}>${m.name}</option>`).join("")}
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">場所</label>
                            <div class="flex gap-2">
                                <select class="ics-row-location-select w-1/2 border p-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500">
                                    <option value="">(登録場所から選択...)</option>
                                    ${un.map(m=>`<option value="${m.name}" ${m.name===c?"selected":""}>${m.name}</option>`).join("")}
                                    <option value="custom" ${c==="custom"?"selected":""}>直接入力...</option>
                                </select>
                                <input type="text" class="ics-row-location w-1/2 border p-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500" placeholder="直接入力" value="${r.location||""}">
                            </div>
                        </div>
                    </div>

                    <!-- 2行目: 日時 (開始, 終了, 終日) -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">開始日時</label>
                            <input type="datetime-local" class="ics-row-start w-full border p-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500" value="${u}">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">終了日時</label>
                            <input type="datetime-local" class="ics-row-end w-full border p-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500" value="${g}">
                        </div>
                        <div class="flex items-end pb-2">
                            <label class="inline-flex items-center text-sm font-semibold text-gray-700 cursor-pointer select-none">
                                <input type="checkbox" class="ics-row-allday mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" ${r.isAllDay?"checked":""}>
                                終日イベント
                            </label>
                        </div>
                    </div>

                    <!-- 3行目: 出欠要否, 詳細回答, 回答期限 -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div class="flex items-center gap-4">
                            <label class="inline-flex items-center text-sm font-semibold text-gray-700 cursor-pointer select-none">
                                <input type="checkbox" class="ics-row-req-att mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" checked>
                                出欠回答を求める
                            </label>
                            <label class="inline-flex items-center text-sm font-semibold text-gray-700 cursor-pointer select-none">
                                <input type="checkbox" class="ics-row-req-det mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                詳細回答 (車・同伴等)
                            </label>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">回答期限</label>
                            <input type="datetime-local" class="ics-row-deadline w-full border p-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500" value="${f}">
                        </div>
                    </div>

                    <!-- 4行目: 対象グループ (横並び) -->
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">対象グループ</label>
                        <div class="flex flex-wrap gap-3 p-2.5 bg-white border rounded-lg max-h-28 overflow-y-auto">
                            ${mt.map(m=>`
                                <label class="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 cursor-pointer select-none mr-2">
                                    <input type="checkbox" class="ics-row-group-cb h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" value="${m.id}">
                                    <span>${m.name}</span>
                                </label>
                            `).join("")}
                        </div>
                    </div>

                    <!-- 5行目: 説明 (複数行) -->
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">説明 (詳細・連絡事項など)</label>
                        <textarea class="ics-row-description w-full border p-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500" rows="2" placeholder="改行を含む説明文を入力できます">${r.description||""}</textarea>
                    </div>
                </div>
            </div>
        `}).join("");const a=document.getElementById("ics-select-all");a&&(a.checked=!0,a.onclick=r=>{document.querySelectorAll(".ics-row-select").forEach(o=>o.checked=r.target.checked)});const s=document.getElementById("ics-import-modal");s&&s.classList.remove("hidden")}function Es(){var e;(e=document.getElementById("ics-import-modal"))==null||e.classList.add("hidden")}async function ci(){const e=document.querySelectorAll(".ics-row"),t=[];if(e.forEach(n=>{var p,m,w,v,x,k,$,h,E,_;const a=n.querySelector(".ics-row-select");if(!a||!a.checked)return;const s=((p=n.querySelector(".ics-row-title"))==null?void 0:p.value)||"";if(!s)return;const r=((m=n.querySelector(".ics-row-category"))==null?void 0:m.value)||"",o=((w=n.querySelector(".ics-row-location"))==null?void 0:w.value)||"",i=((v=n.querySelector(".ics-row-start"))==null?void 0:v.value)||"",d=((x=n.querySelector(".ics-row-end"))==null?void 0:x.value)||"",l=((k=n.querySelector(".ics-row-allday"))==null?void 0:k.checked)||!1,c=[];n.querySelectorAll(".ics-row-group-cb:checked").forEach(I=>{c.push(I.value)});const u=(($=n.querySelector(".ics-row-req-att"))==null?void 0:$.checked)||!1,g=((h=n.querySelector(".ics-row-req-det"))==null?void 0:h.checked)||!1,b=((E=n.querySelector(".ics-row-deadline"))==null?void 0:E.value)||"",f=((_=n.querySelector(".ics-row-description"))==null?void 0:_.value)||"",y=I=>I?new Date(I).toISOString():null;t.push({title:s,category:r,location:o,start_time:y(i),end_time:y(d),is_all_day:l,target_group_ids:c.length>0?c:null,requires_attendance:u,require_detailed_attendance:u?g:!1,attendance_deadline:u?y(b):null,description:f,created_by:Y==null?void 0:Y.email})}),t.length===0){alert("登録対象の予定が選択されていません。");return}z("予定データを登録中...");try{const{error:n}=await L.from("events").insert(t);if(n)throw n;await be("IMPORT_ICS_EVENTS",`${t.length}件の予定をICSファイルから一括登録しました`),alert(`${t.length}件の予定を登録しました。`),Es(),await Dn(),pt(),document.getElementById("list-container").classList.contains("hidden")||tn()}catch(n){console.error(n),alert("予定の登録に失敗しました: "+n.message)}finally{V()}}const ui="modulepreload",mi=function(e){return"/"+e},vr={},pi=function(t,n,a){let s=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),i=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));s=Promise.allSettled(n.map(d=>{if(d=mi(d),d in vr)return;vr[d]=!0;const l=d.endsWith(".css"),c=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${c}`))return;const u=document.createElement("link");if(u.rel=l?"stylesheet":ui,l||(u.as="script"),u.crossOrigin="",u.href=d,i&&u.setAttribute("nonce",i),document.head.appendChild(u),l)return new Promise((g,b)=>{u.addEventListener("load",g),u.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(o){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=o,window.dispatchEvent(i),!i.defaultPrevented)throw o}return s.then(o=>{for(const i of o||[])i.status==="rejected"&&r(i.reason);return t().catch(r)})};let wr=!1,Da=[],Qr=[],Zr=[],Mt=[],zs=[],Yt=[],De={homeTeamNames:["ありんこアントス@A軍"],defaultFilterDate:{from:"",to:"",teamRegex:"",category:"",outcome:"all",firstScore:"all"}},Er=!1,Ca=!0,Ja=!1,wn="all",sa={},sn={},us={},ms={},_s={batter:[],pitcher:[]},xn={batter:{key:"ops",order:"desc"},pitcher:{key:"era",order:"asc"}},Rn={batter:{key:"ops",order:"desc"},pitcher:{key:"era",order:"asc"}},ct=null,It={};async function Is(){wr||(gi(),wr=!0);const e=document.querySelector('button[data-tab="import-data"]');e&&(qe==="admin"?e.classList.remove("hidden"):e.classList.add("hidden")),await Ys()}function fi(e){const t=[];let n=[],a="",s=!1;for(let r=0;r<e.length;r++){const o=e[r];s?o==='"'?r+1<e.length&&e[r+1]==='"'?(a+='"',r++):s=!1:a+=o:o==='"'?s=!0:o===","?(n.push(a),a=""):o===`
`||o==="\r"?(n.push(a),t.push(n),n=[],a="",o==="\r"&&r+1<e.length&&e[r+1]===`
`&&r++):a+=o}return(a||n.length>0)&&(n.push(a),t.push(n)),t}function gi(){var t,n,a,s,r,o,i,d,l,c,u,g,b,f,y,p,m,w,v,x,k;let e=document.getElementById("dashboard-view");e||(e=document.createElement("div"),e.id="dashboard-view",e.className="hidden p-4 max-w-4xl mx-auto",e.innerHTML=`
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
                </div>

                <!-- 試合ごとの文字起こし・スコアボード表示エリア（個別試合選択時に表示） -->
                <div id="detail-transcript-panel" class="hidden bg-white p-5 rounded-xl shadow-md border border-gray-200 space-y-4">
                    <div class="flex flex-wrap justify-between items-center gap-2 border-b pb-3">
                        <div>
                            <h4 class="font-black text-gray-800 text-base" id="detail-transcript-title">📋 試合スコア ＆ 戦績文字起こし</h4>
                            <div class="text-xs text-gray-500 mt-0.5" id="detail-transcript-meta"></div>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <button id="btn-detail-copy-transcript" class="bg-gray-100 hover:bg-gray-200 text-gray-800 border px-3 py-1.5 rounded-lg text-xs font-bold">📋 テキストをコピー</button>
                            <button id="btn-detail-download-transcript" class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm">📥 .txt ダウンロード</button>
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
                            <span>投球カウント ([1]ボール等) もすべて表示</span>
                        </label>
                    </div>

                    <!-- タイムラインカード一覧 -->
                    <div id="detail-transcript-timeline" class="max-h-[540px] overflow-y-auto space-y-1.5 border rounded-lg p-3 bg-stone-50"></div>
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
            </div>
        `,(t=document.getElementById("app-view"))==null||t.parentNode.appendChild(e),document.getElementById("btn-back-to-menu-dash").addEventListener("click",()=>{pi(()=>Promise.resolve().then(()=>$c),void 0).then($=>$.switchAuthScreen("app-menu-view"))}),document.getElementById("btn-exec-csv-import").addEventListener("click",Li),(n=document.getElementById("backup-extract-file"))==null||n.addEventListener("change",Ti),(a=document.getElementById("btn-backup-import-db"))==null||a.addEventListener("click",Di),(s=document.getElementById("btn-extract-raw-b"))==null||s.addEventListener("click",()=>$r("batter")),(r=document.getElementById("btn-extract-raw-p"))==null||r.addEventListener("click",()=>$r("pitcher")),(o=document.getElementById("btn-extract-single-game"))==null||o.addEventListener("click",Ci),(i=document.getElementById("btn-extract-game-transcript"))==null||i.addEventListener("click",Ni),(d=document.getElementById("btn-preview-backup-detail"))==null||d.addEventListener("click",Pi),(l=document.getElementById("btn-load-detail-data"))==null||l.addEventListener("click",Fi),(c=document.getElementById("detail-scope-select"))==null||c.addEventListener("change",()=>Ka(!1)),(u=document.getElementById("detail-transcript-show-pitches"))==null||u.addEventListener("change",$=>{Ja=$.target.checked,er()}),(g=document.getElementById("btn-detail-copy-transcript"))==null||g.addEventListener("click",Ri),(b=document.getElementById("btn-detail-download-transcript"))==null||b.addEventListener("click",Oi),document.querySelectorAll("#dashboard-tabs button").forEach($=>{$.addEventListener("click",h=>{Xr(h.currentTarget.dataset.tab)})}),document.querySelectorAll("button[data-ranking-tab]").forEach($=>{$.addEventListener("click",h=>{document.querySelectorAll("button[data-ranking-tab]").forEach(_=>{_.classList.remove("text-blue-600","border-blue-600"),_.classList.add("text-gray-500","border-transparent")}),["batter","pitcher"].forEach(_=>document.getElementById(`ranking-content-${_}`).classList.add("hidden"));const E=h.currentTarget;E.classList.remove("text-gray-500","border-transparent"),E.classList.add("text-blue-600","border-blue-600"),document.getElementById(`ranking-content-${E.dataset.rankingTab}`).classList.remove("hidden")})}),(f=document.getElementById("ranking-regulation-cb"))==null||f.addEventListener("change",$=>{Ca=$.target.checked,to()}),document.querySelectorAll("#tab-content-ranking th[data-sort]").forEach($=>{$.addEventListener("click",h=>{const E=h.currentTarget.dataset.role,_=h.currentTarget.dataset.sort;Si(E,_)})}),document.getElementById("btn-apply-dashboard-filter").addEventListener("click",Ut),["db-filter-date-from","db-filter-date-to","db-filter-outcome","db-filter-first-score"].forEach($=>{var h;(h=document.getElementById($))==null||h.addEventListener("change",Ut)}),["db-filter-team-regex","db-filter-category"].forEach($=>{var h,E;(h=document.getElementById($))==null||h.addEventListener("change",Ut),(E=document.getElementById($))==null||E.addEventListener("input",Ut)}),document.getElementById("btn-clear-dashboard-filter").addEventListener("click",()=>{document.getElementById("db-filter-date-from").value=De.defaultFilterDate.from||"",document.getElementById("db-filter-date-to").value=De.defaultFilterDate.to||"",document.getElementById("db-filter-team-regex").value=De.defaultFilterDate.teamRegex||"",document.getElementById("db-filter-category").value=De.defaultFilterDate.category||"";const $=document.getElementById("db-filter-outcome");$&&($.value=De.defaultFilterDate.outcome||"all");const h=document.getElementById("db-filter-first-score");h&&(h.value=De.defaultFilterDate.firstScore||"all"),Ut()}),["ps-mode","ps-player","ps-role","ps-limit-games","ps-ma-unit","ps-ma-window"].forEach($=>{var h;return(h=document.getElementById($))==null?void 0:h.addEventListener("change",()=>{var S,A,P;const E=(S=document.getElementById("ps-ma-unit"))==null?void 0:S.value,_=document.getElementById("ps-ma-window-label");_&&(_.textContent=E==="ab"?"打数/登板":"試合");const I=((A=document.getElementById("ps-mode"))==null?void 0:A.value)==="single";(P=document.getElementById("ps-player-select-wrap"))==null||P.classList.toggle("hidden",!I),Qs()})}),(y=document.getElementById("btn-export-ps-csv"))==null||y.addEventListener("click",$i),(p=document.getElementById("btn-print-ps"))==null||p.addEventListener("click",()=>window.print()),["tm-role","tm-window"].forEach($=>{var h;return(h=document.getElementById($))==null?void 0:h.addEventListener("change",ks)}),(m=document.getElementById("tm-players-list"))==null||m.addEventListener("change",ks),(w=document.getElementById("comp-players-list"))==null||w.addEventListener("change",Ss),(v=document.getElementById("comp-role"))==null||v.addEventListener("change",()=>{Ss()}),(x=document.getElementById("btn-add-home-team"))==null||x.addEventListener("click",ki),(k=document.getElementById("btn-save-default-date"))==null||k.addEventListener("click",async()=>{var C,T;const $=document.getElementById("setting-default-date-from").value,h=document.getElementById("setting-default-date-to").value,E=document.getElementById("setting-default-team-regex").value.trim(),_=document.getElementById("setting-default-category").value.trim(),I=((C=document.getElementById("setting-default-outcome"))==null?void 0:C.value)||"all",S=((T=document.getElementById("setting-default-first-score"))==null?void 0:T.value)||"all",A={from:$,to:h,teamRegex:E,category:_,outcome:I,firstScore:S,_updatedAt:Date.now()};localStorage.setItem("ants_defaultFilterDate",JSON.stringify(A)),z("デフォルトのフィルタ設定を保存中 (DB同期)...");try{await Js("defaultFilterDate",A,"DASHBOARD_DEFAULT_FILTER",A),An(!0,"デフォルト設定をSupabase DBへ保存・同期しました"),alert("デフォルトのフィルタ設定をDBに保存し、同期しました。")}catch(F){console.error("Supabase sync failed",F),An(!1,`DB同期に失敗 (このブラウザのみ保存): ${F.message}`),alert("DBへの同期に失敗しましたが、このブラウザには保存されました: "+F.message)}finally{V()}De.defaultFilterDate=A;const P=document.getElementById("db-filter-date-from"),M=document.getElementById("db-filter-date-to"),N=document.getElementById("db-filter-team-regex"),G=document.getElementById("db-filter-category"),R=document.getElementById("db-filter-outcome"),B=document.getElementById("db-filter-first-score");P&&(P.value=$),M&&(M.value=h),N&&(N.value=E),G&&(G.value=_),R&&(R.value=I),B&&(B.value=S),Ut()}))}function Xr(e){var s;const t=new Set(["team-summary","personal-summary","ranking","comparison","test-mode","detail-analysis"]);document.querySelectorAll("#dashboard-tabs button").forEach(r=>{r.classList.remove("text-blue-600","border-blue-600"),r.classList.add("text-gray-500","border-transparent")}),["team-summary","personal-summary","ranking","comparison","test-mode","settings","import-data","detail-analysis"].forEach(r=>{var o;(o=document.getElementById(`tab-content-${r}`))==null||o.classList.add("hidden")});const n=document.querySelector(`#dashboard-tabs button[data-tab="${e}"]`);n&&(n.classList.remove("text-gray-500","border-transparent"),n.classList.add("text-blue-600","border-blue-600")),(s=document.getElementById(`tab-content-${e}`))==null||s.classList.remove("hidden");const a=document.getElementById("dashboard-common-filter");a&&a.classList.toggle("hidden",!t.has(e))}async function Js(e,t,n,a){const[s,r]=await Promise.all([L.from("master_data").upsert({key:n,data:a},{onConflict:"key"}),L.from("dashboard_settings").upsert({key:e,value:t},{onConflict:"key"})]);if(s.error&&r.error)throw s.error;s.error&&console.warn("master_data upsert warning:",s.error),r.error&&console.warn("dashboard_settings upsert warning:",r.error)}function An(e,t=""){const n=document.getElementById("settings-db-sync-status");n&&(e?(n.textContent=`✅ ${t||"DB (Supabase) と同期済みです（LocalStorageによる上書きは無効化）"}`,n.className="text-xs font-bold mb-3 text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded"):(n.textContent=`⚠️ ${t||"DBに設定が未登録のため初期値・ローカルキャッシュを表示中（「設定を保存」でDB同期できます）"}`,n.className="text-xs font-bold mb-3 text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded"))}async function Ys(){z("成績データを読み込み中...");try{const[{data:e,error:t},{data:n,error:a},{data:s,error:r},{data:o},{data:i},{data:d},{data:l}]=await Promise.all([L.from("games").select("*").order("date",{ascending:!0}),L.from("batter_stats").select("*"),L.from("pitcher_stats").select("*"),L.from("players").select("*"),L.from("dashboard_settings").select("*"),L.from("master_data").select("key, data").in("key",["DASHBOARD_DEFAULT_FILTER","DASHBOARD_HOME_TEAMS"]),L.from("master_data").select("key, data").like("key","SCORER_GAME_DETAIL_%")]);if(t)throw t;if(a)throw a;if(r)throw r;Da=e||[],Qr=n||[],Zr=s||[],Mt=o||[],zs=(l||[]).map(h=>h==null?void 0:h.data).filter(h=>h&&(h.gid!==void 0||h.cd)).sort((h,E)=>String(E.date||"").localeCompare(String(h.date||""))||(E.gid||0)-(h.gid||0));let c=["ありんこアントス@A軍"],u={from:"",to:"",teamRegex:"",category:"",outcome:"all",firstScore:"all"},g=!1,b=!1,f=-1,y=-1;const p=h=>{if(typeof h=="string")try{return JSON.parse(h)}catch{return null}return h};if(Array.isArray(i)){const h=i.find(S=>S.key==="homeTeamNames"),E=p(h==null?void 0:h.value);Array.isArray(E)&&E.length>0&&(c=E,g=!0,f=0);const _=i.find(S=>S.key==="defaultFilterDate"),I=p(_==null?void 0:_.value);I&&typeof I=="object"&&(u={from:I.from||"",to:I.to||"",teamRegex:I.teamRegex||"",category:I.category||"",outcome:I.outcome||"all",firstScore:I.firstScore||"all"},b=!0,y=Number(I._updatedAt||0))}if(Array.isArray(d)){const h=d.find(S=>S.key==="DASHBOARD_HOME_TEAMS"),E=p(h==null?void 0:h.data);if(E){const S=Array.isArray(E)?E:Array.isArray(E.teams)?E.teams:null,A=Number(E._updatedAt||1);S&&S.length>0&&(!g||A>=f)&&(c=S,g=!0,f=A)}const _=d.find(S=>S.key==="DASHBOARD_DEFAULT_FILTER"),I=p(_==null?void 0:_.data);if(I&&typeof I=="object"){const S=Number(I._updatedAt||1);(!b||S>=y)&&(u={from:I.from||"",to:I.to||"",teamRegex:I.teamRegex||"",category:I.category||"",outcome:I.outcome||"all",firstScore:I.firstScore||"all"},b=!0,y=S)}}if(g)localStorage.setItem("ants_homeTeamNames",JSON.stringify(c));else{const h=localStorage.getItem("ants_homeTeamNames");if(h)try{const E=JSON.parse(h);Array.isArray(E)&&E.length>0&&(c=E)}catch{}}if(b)localStorage.setItem("ants_defaultFilterDate",JSON.stringify(u));else{const h=localStorage.getItem("ants_defaultFilterDate");if(h)try{const E=JSON.parse(h);u={from:E.from||"",to:E.to||"",teamRegex:E.teamRegex||"",category:E.category||"",outcome:E.outcome||"all",firstScore:E.firstScore||"all"}}catch{}}An(b||g),De.homeTeamNames=c,De.defaultFilterDate=u,Zs();const m=document.getElementById("setting-default-date-from"),w=document.getElementById("setting-default-date-to"),v=document.getElementById("setting-default-team-regex"),x=document.getElementById("setting-default-category"),k=document.getElementById("setting-default-outcome"),$=document.getElementById("setting-default-first-score");m&&(m.value=De.defaultFilterDate.from||""),w&&(w.value=De.defaultFilterDate.to||""),v&&(v.value=De.defaultFilterDate.teamRegex||""),x&&(x.value=De.defaultFilterDate.category||""),k&&(k.value=De.defaultFilterDate.outcome||"all"),$&&($.value=De.defaultFilterDate.firstScore||"all"),Er?Ut():(document.getElementById("btn-clear-dashboard-filter").click(),Er=!0)}catch(e){console.error(e),alert("成績データの取得に失敗しました: "+e.message)}finally{V()}}function Tt(e){if(!e)return!1;const t=e.trim();return t==="ありんこ"||t==="アントス"?!1:De.homeTeamNames.some(n=>{if(!n)return!1;const a=n.replace(/@.*$/,"").trim(),s=e.replace(/@.*$/,"").trim();try{if(new RegExp(n,"i").test(e)||new RegExp(a,"i").test(s))return!0}catch{}return e.includes(n)||n.includes(e)||a&&s&&(s.includes(a)||a.includes(s))})}function Ks(e){const t=Tt(e.team_first);let n=0,a=0;if(e.score&&typeof e.score=="string"){const o=e.score.match(/\d+/g);if(o&&o.length>=2){const i=parseInt(o[0],10),d=parseInt(o[1],10);return t?(n=i,a=d):(n=d,a=i),{tr:n,or:a,isAntsFirst:t}}}const s=parseInt(e.runs_first??e.score_first??0,10)||0,r=parseInt(e.runs_second??e.score_second??0,10)||0;return t?(n=s,a=r):(n=r,a=s),{tr:n,or:a,isAntsFirst:t}}function bi(e){const t=Tt(e.team_first);if(e.first_score_team)return Tt(e.first_score_team)?"scored":"conceded";if(e.first_scored!==void 0&&e.first_scored!==null){if(e.first_scored==="home"||e.first_scored===!0||e.first_scored===1)return"scored";if(e.first_scored==="opp"||e.first_scored===!1||e.first_scored===0)return"conceded"}const n=e.inning_scores||e.score_detail||e.innings;if(n&&typeof n=="string"&&n.includes("|")){const[r,o]=n.split("|"),i=r.split(/[,-]/).map(c=>parseInt(c.trim(),10)||0),d=o.split(/[,-]/).map(c=>parseInt(c.trim(),10)||0),l=Math.max(i.length,d.length);for(let c=0;c<l;c++){const u=i[c]||0,g=d[c]||0;if(u>0&&g===0)return t?"scored":"conceded";if(g>0&&u===0)return t?"conceded":"scored";if(u>0&&g>0)return t?"scored":"conceded"}}const{tr:a,or:s}=Ks(e);return a===0&&s===0?"unknown":a>0&&s===0?"scored":s>0&&a===0?"conceded":t?a>0?"scored":"conceded":s>0?"conceded":"scored"}function la(e){if(!e)return"";const t=String(e).split("T")[0].replace(/\//g,"-").split("-");if(t.length===3){const n=parseInt(t[0],10),a=parseInt(t[1],10),s=parseInt(t[2],10);if(!isNaN(n)&&!isNaN(a)&&!isNaN(s))return`${n}-${String(a).padStart(2,"0")}-${String(s).padStart(2,"0")}`}return""}function qn(e){return String(e||"").replace(/髙/g,"高").replace(/[\s　]+/g,"").trim()}let pn={games:[],bStats:[],pStats:[]};function Ut(){var m,w;const e=document.getElementById("db-filter-date-from").value,t=document.getElementById("db-filter-date-to").value,n=document.getElementById("db-filter-team-regex").value,a=document.getElementById("db-filter-category").value,s=((m=document.getElementById("db-filter-outcome"))==null?void 0:m.value)||"all",r=((w=document.getElementById("db-filter-first-score"))==null?void 0:w.value)||"all";let o=null;if(n)try{o=new RegExp(n,"i")}catch{}const i=a?a.split(",").map(v=>v.trim()).filter(v=>v):[],d=Da.filter(v=>{const x=(v.team_first||"").trim(),k=(v.team_second||"").trim(),$=(v.title||"")+(v.category||"");if(x==="ありんこ"||x==="アントス"||k==="ありんこ"||k==="アントス"||$.includes("紅白")||x.includes("紅白")||k.includes("紅白"))return!1;const h=Tt(v.team_first),E=Tt(v.team_second);if(h&&E||!h&&!E)return!1;const _=la(v.date);if(e&&_<e||t&&_>t||i.length>0&&!i.some(I=>(v.title||"").includes(I)||(v.category||"").includes(I)))return!1;if(o){const I=h?k:x;if(!o.test(I))return!1}if(s!=="all"){const{tr:I,or:S}=Ks(v);if(s==="win"&&I<=S||s==="loss"&&I>=S||s==="draw"&&I!==S)return!1}if(r!=="all"){const I=bi(v);if(r==="scored"&&I!=="scored"||r==="conceded"&&I!=="conceded")return!1}return!0}),l=new Set(d.map(v=>v.id)),c=Qr.filter(v=>l.has(v.game_id)),u=Zr.filter(v=>l.has(v.game_id));pn={games:d,bStats:c,pStats:u};const g=new Set;c.forEach(v=>g.add(v.player_id)),u.forEach(v=>g.add(v.player_id));const b=Mt.filter(v=>g.has(v.id)).sort((v,x)=>v.name.localeCompare(x.name)),f=document.getElementById("ps-player");if(f){const v=f.value;f.innerHTML=b.map(x=>`<option value="${x.id}">${x.name}</option>`).join(""),v&&g.has(parseInt(v))&&(f.value=v)}const y=document.getElementById("comp-players-list");if(y){const v=new Set(Array.from(document.querySelectorAll(".comp-player-cb:checked")).map(x=>x.value));y.innerHTML=b.map(x=>`<label class="flex items-center space-x-1 cursor-pointer"><input type="checkbox" value="${x.id}" class="comp-player-cb rounded text-blue-600" ${v.has(String(x.id))?"checked":""}><span>${x.name}</span></label>`).join("")}const p=document.getElementById("tm-players-list");if(p){const v=new Set(Array.from(document.querySelectorAll(".tm-player-cb:checked")).map(x=>x.value));p.innerHTML=b.map(x=>`<label class="flex items-center space-x-1 cursor-pointer"><input type="checkbox" value="${x.id}" class="tm-player-cb rounded text-blue-600" ${v.has(String(x.id))?"checked":""}><span>${x.name}</span></label>`).join("")}yi(d,c,u),to(),Qs(),Ss(),ks(),Ka(!0)}function yi(e,t,n){document.getElementById("summary-games").textContent=e.length;const a=t.reduce((c,u)=>c+(u.at_bats||0),0),s=t.reduce((c,u)=>c+(u.hits||0),0),r=a>0?(s/a).toFixed(3).replace(/^0/,""):".000";document.getElementById("summary-avg").textContent=r;const o=t.reduce((c,u)=>c+(u.runs||0),0);document.getElementById("summary-runs").textContent=o;const i=n.reduce((c,u)=>c+(u.earned_runs||0),0),d=n.reduce((c,u)=>c+(u.outs||0),0),l=d>0?(i*7/(d/3)).toFixed(2):"0.00";document.getElementById("summary-era").textContent=l,hi(e,t,n)}let _r=!1;function Xn(){return _r||window.Chart?Promise.resolve():new Promise((e,t)=>{const n=document.createElement("script");n.src="https://cdn.jsdelivr.net/npm/chart.js",n.onload=()=>{_r=!0,e()},n.onerror=t,document.head.appendChild(n)})}async function hi(e,t,n){await Xn(),Object.values(sa).forEach(E=>E.destroy()),sa={};const a={};e.forEach(E=>{const _=E.date?E.date.split("T")[0]:"";if(!_)return;const I=_.substring(0,7);a[I]||(a[I]={atBats:0,hits:0,runs:0,strikeOuts:0,hitsAllowed:0,walksAllowed:0,strikes:0,pitchCount:0,earnedRuns:0,outs:0})}),t.forEach(E=>{const _=e.find(S=>S.id===E.game_id);if(!_||!_.date)return;const I=_.date.split("T")[0].substring(0,7);a[I]&&(a[I].atBats+=E.at_bats||0,a[I].hits+=E.hits||0,a[I].runs+=E.runs||0)}),n.forEach(E=>{const _=e.find(S=>S.id===E.game_id);if(!_||!_.date)return;const I=_.date.split("T")[0].substring(0,7);a[I]&&(a[I].strikeOuts+=E.strike_outs||0,a[I].hitsAllowed+=E.hits_allowed||0,a[I].walksAllowed+=E.walks_allowed||0,a[I].strikes+=E.strikes||0,a[I].pitchCount+=E.pitch_count||0,a[I].earnedRuns+=E.earned_runs||0,a[I].outs+=E.outs||0)});const s=Object.keys(a).sort();let r=0,o=0,i=0,d=0;const l=[],c=[],u=[],g=[],b=[],f=[],y=[],p=[];s.forEach(E=>{r+=a[E].atBats,o+=a[E].hits,l.push(r>0?o/r:0),c.push(a[E].runs),u.push(a[E].strikeOuts),g.push(a[E].hitsAllowed),b.push(a[E].walksAllowed),f.push(a[E].pitchCount>0?(a[E].strikes/a[E].pitchCount*100).toFixed(1):0);const _=a[E].earnedRuns,S=a[E].outs/3;p.push(S>0?_*7/S:0),i+=a[E].earnedRuns,d+=a[E].outs;const A=d/3;y.push(A>0?i*7/A:0)}),sa.batting=new window.Chart(document.getElementById("chart-batting-monthly").getContext("2d"),{type:"bar",data:{labels:s,datasets:[{label:"月間得点",type:"bar",data:c,backgroundColor:"rgba(75, 192, 192, 0.6)",yAxisID:"y"},{label:"累積打率",type:"line",data:l,borderColor:"rgba(255, 99, 132, 1)",yAxisID:"y1"}]},options:{responsive:!0,scales:{y:{position:"left",beginAtZero:!0},y1:{position:"right",beginAtZero:!0,min:0,max:1}}}}),sa.pitching=new window.Chart(document.getElementById("chart-pitching-monthly").getContext("2d"),{type:"bar",data:{labels:s,datasets:[{label:"奪三振",data:u,backgroundColor:"rgba(54, 162, 235, 0.6)"},{label:"被安打",data:g,backgroundColor:"rgba(255, 159, 64, 0.6)"},{label:"与四死球",data:b,backgroundColor:"rgba(255, 205, 86, 0.6)"},{label:"S率(%)",type:"line",data:f,borderColor:"rgba(153, 102, 255, 1)",yAxisID:"y1"},{label:"累積防御率",type:"line",data:y,borderColor:"rgba(255, 99, 132, 1)",yAxisID:"y2"},{label:"月別防御率",type:"line",data:p,borderColor:"rgba(75, 192, 192, 1)",borderDash:[5,5],yAxisID:"y2"}]},options:{responsive:!0,scales:{y:{position:"left",beginAtZero:!0},y1:{position:"right",beginAtZero:!0,min:0,max:100,grid:{drawOnChartArea:!1}},y2:{position:"right",beginAtZero:!0,grid:{drawOnChartArea:!1}}}}});const m=[],w=[],v=[],x=[],k=[];let $=0,h=0;e.forEach((E,_)=>{const I=E.date?E.date.split("T")[0]:"",{tr:S,or:A,isAntsFirst:P}=Ks(E),M=P?E.team_first:E.team_second,N=P?E.team_second:E.team_first,G=E.title||E.category||"試合";k.push({date:I,title:G,myTeam:M||"自チーム",oppTeam:N||"相手チーム",tr:S,or:A,isAntsFirst:P}),w.push(S),v.push(-A),S>A&&$++,h++,x.push(h>0?($/h*100).toFixed(1):0),m.push([I?I.substring(5):`G${_+1}`,N||""])}),sa.games=new window.Chart(document.getElementById("chart-games-wl").getContext("2d"),{type:"bar",data:{labels:m,datasets:[{label:"得点",data:w,backgroundColor:"rgba(75, 192, 192, 0.8)"},{label:"失点",data:v,backgroundColor:"rgba(255, 99, 132, 0.8)"},{label:"累積勝率(%)",type:"line",data:x,borderColor:"rgba(255, 205, 86, 1)",yAxisID:"y1"}]},options:{responsive:!0,plugins:{tooltip:{callbacks:{title:function(E){if(!E.length)return"";const _=E[0].dataIndex,I=k[_];return I?`${I.date} 【${I.title}】
${I.myTeam} vs ${I.oppTeam}`:""},label:function(E){const _=E.dataIndex,I=k[_],S=E.dataset.label||"";return S==="得点"?`得点 (${(I==null?void 0:I.myTeam)||"自チーム"}): ${E.raw} 点`:S==="失点"?`失点 (${(I==null?void 0:I.oppTeam)||"相手チーム"}): ${Math.abs(E.raw)} 点`:S==="累積勝率(%)"?`累積勝率: ${E.raw} %`:`${S}: ${E.raw}`}}}},scales:{x:{stacked:!0,ticks:{font:{size:10}}},y:{stacked:!0,position:"left"},y1:{position:"right",beginAtZero:!0,min:0,max:100}}}})}function Zt(e){let t=0,n=0,a=0,s=0,r=0,o=0,i=0,d=0,l=0,c=0,u=0,g=0,b=0,f=0,y=0;e.forEach(I=>{const S=I.plate_appearances||0,A=I.at_bats||0,P=I.hits||0,M=I.doubles||0,N=I.triples||0,G=I.home_runs||0,R=I.walks||0,B=I.hit_by_pitch||0,C=I.strike_outs||I.strikeouts||0,T=I.sacrifice_flies||I.sac_flies||0,F=I.sacrifice_hits||I.sac_bunts||0,X=I.runs_batted_in||0,W=I.runs||0,Z=I.stolen_bases||0;t+=S,n+=A,a+=P,g+=M,b+=N,u+=G,d+=R,l+=B,c+=C,f+=T,y+=F,r+=X,o+=W,i+=Z;const Q=(I.singles!==void 0?I.singles:Math.max(0,P-M-N-G))*1+M*2+N*3+G*4,H=Q>0?Q:I.total_bases||0;s+=H});const p=n>0?a/n:0,m=Math.round(p*1e3)/1e3,w=n+d+l+f,v=w>0?(a+d+l)/w:t>0?(a+d+l)/t:0,x=Math.round(v*1e3)/1e3,k=n>0?s/n:0,$=Math.round(k*1e3)/1e3,h=Math.round((x+$)*1e3)/1e3,E=a+d+l,_=E>0?o/E:0;return{pa:t,ab:n,h:a,doubles:g,triples:b,hr:u,tb:s,sf:f,sh:y,bb:d,hbp:l,rbi:r,r:o,sb:i,so:c,ob:E,avg:m,obp:x,slg:$,ops:h,runRate:_,avgStr:m.toFixed(3).replace(/^0/,""),obpStr:x.toFixed(3).replace(/^0/,""),slgStr:$.toFixed(3).replace(/^0/,""),opsStr:h.toFixed(3),runRateStr:E>0?(_*100).toFixed(1)+"%":"0.0%",bbRate:t>0?(d+l)/t:0,soRate:t>0?c/t:0}}function Xt(e){let t=0,n=0,a=0,s=0,r=0,o=0,i=0,d=0,l=0,c=0;e.forEach(p=>{t+=p.outs||0,n+=p.earned_runs||0,a+=p.hits_allowed||0,s+=(p.walks_allowed||0)+(p.hit_batters||0),r+=p.strike_outs||0,o+=p.batters_faced||0,i+=p.pitch_count||0,d+=p.strikes||0,l+=p.wins||0,c+=p.losses||0});const u=t/3,g=u>0?n*7/u:0,b=u>0?(a+s)/u:0,f=u>0?r*7/u:0,y=u>0?s*7/u:0;return{outs:t,er:n,h:a,bb:s,so:r,bf:o,pc:i,st:d,wins:l,losses:c,era:g,whip:b,k7:f,bb7:y,eraStr:g.toFixed(2),whipStr:b.toFixed(2),k7Str:f.toFixed(2),bb7Str:y.toFixed(2),kRate:o>0?r/o:0,bbRate:o>0?s/o:0,kbb:s>0?r/s:r>0?99.9:0,sRate:i>0?d/i:0}}async function Qs(){var d,l,c,u,g,b;await Xn();const e=((d=document.getElementById("ps-mode"))==null?void 0:d.value)||"single",t=(l=document.getElementById("ps-player"))==null?void 0:l.value,n=((c=document.getElementById("ps-role"))==null?void 0:c.value)||"batter",a=((u=document.getElementById("ps-limit-games"))==null?void 0:u.value)||"5",s=((g=document.getElementById("ps-ma-unit"))==null?void 0:g.value)||"ab",r=parseInt(((b=document.getElementById("ps-ma-window"))==null?void 0:b.value)||"10",10),o=document.getElementById("ps-single-container"),i=document.getElementById("ps-all-container");e==="single"?(o==null||o.classList.remove("hidden"),i==null||i.classList.add("hidden"),t&&xi(t,n,a,s,r)):(o==null||o.classList.add("hidden"),i==null||i.classList.remove("hidden"),Ii(n,a,s,r))}function xi(e,t,n,a,s){var y;const{games:r,bStats:o,pStats:i}=pn,d=((y=Mt.find(p=>p.id==e))==null?void 0:y.name)||"選手",c=(t==="batter"?o:i).filter(p=>p.player_id==e).map(p=>{const m=r.find(w=>w.id===p.game_id);return{date:(m==null?void 0:m.date)||"",game:m,stats:p}}).filter(p=>p.date).sort((p,m)=>p.date.localeCompare(m.date)),u=t==="batter"?Zt(c.map(p=>p.stats)):Xt(c.map(p=>p.stats));let g=[...c];if(n!=="all"){const p=parseInt(n,10);g.length>p&&(g=g.slice(g.length-p))}const b=t==="batter"?Zt(g.map(p=>p.stats)):Xt(g.map(p=>p.stats));vi(d,t,b,u,g);const f=eo(g,t,a,s);wi(d,t,g),Ei(d,t,f,a,s),_i(t,g)}function vi(e,t,n,a,s){const r=document.getElementById("ps-highlight-cards");if(r)if(t==="batter"){const o=n.avg-a.avg,i=(o>=0?"+":"")+o.toFixed(3).replace(/^0/,""),d=o>=.03,l=o<=-.05,c=d?"🔥 好調":l?"❄️ 不調":"⚖️ 安定",u=d?"bg-red-100 text-red-700 border-red-200":l?"bg-blue-100 text-blue-700 border-blue-200":"bg-gray-100 text-gray-700 border-gray-200";let g=0;for(let b=s.length-1;b>=0;b--){const f=s[b].stats.hits||0,y=s[b].stats.at_bats||0;if(f>0)g++;else if(y>0)break}r.innerHTML=`
            <div class="bg-white p-3 rounded-lg shadow border border-gray-100">
                <div class="text-xs text-gray-500 font-bold mb-1 flex justify-between items-center">
                    <span>直近打率 vs 通算</span>
                    <span class="text-[10px] px-1.5 py-0.5 rounded border ${u}">${c}</span>
                </div>
                <div class="text-2xl font-black text-blue-600">${n.avgStr}</div>
                <div class="text-xs ${o>=0?"text-red-500":"text-blue-500"} font-bold mt-0.5">
                    通算 (${a.avgStr}) 比: ${i}
                </div>
            </div>
            <div class="bg-white p-3 rounded-lg shadow border border-gray-100">
                <div class="text-xs text-gray-500 font-bold mb-1">直近 OPS / 出塁率・長打率</div>
                <div class="text-2xl font-black text-purple-600">${n.opsStr}</div>
                <div class="text-xs text-gray-500 mt-0.5">出塁率: <span class="font-bold text-gray-800">${n.obpStr}</span> / 長打率: <span class="font-bold text-gray-800">${n.slgStr}</span></div>
            </div>
            <div class="bg-white p-3 rounded-lg shadow border border-gray-100">
                <div class="text-xs text-gray-500 font-bold mb-1">直近 生還率 (R/OB)</div>
                <div class="text-2xl font-black text-amber-600">${n.runRateStr}</div>
                <div class="text-xs text-gray-500 mt-0.5">出塁: <span class="font-bold text-gray-800">${n.ob}</span>回 / 得点: <span class="font-bold text-green-600">${n.r}</span></div>
            </div>
            <div class="bg-white p-3 rounded-lg shadow border border-gray-100">
                <div class="text-xs text-gray-500 font-bold mb-1">連続安打 / 打撃内訳</div>
                <div class="text-xl font-black text-gray-800">${g} <span class="text-xs font-normal text-gray-600">試合連続</span> (${n.h}H)</div>
                <div class="text-xs text-gray-500 mt-0.5">打点: <span class="font-bold text-gray-800">${n.rbi}</span> / HR: <span class="font-bold text-red-600">${n.hr}</span></div>
            </div>
        `}else{const o=n.era-a.era,i=(o<=0?"":"+")+o.toFixed(2);r.innerHTML=`
            <div class="bg-white p-3 rounded-lg shadow border border-gray-100">
                <div class="text-xs text-gray-500 font-bold mb-1">直近 防御率 vs 通算</div>
                <div class="text-2xl font-black text-red-600">${n.eraStr}</div>
                <div class="text-xs ${o<=0?"text-green-600":"text-red-500"} font-bold mt-0.5">
                    通算 (${a.eraStr}) 比: ${i}
                </div>
            </div>
            <div class="bg-white p-3 rounded-lg shadow border border-gray-100">
                <div class="text-xs text-gray-500 font-bold mb-1">直近 WHIP</div>
                <div class="text-2xl font-black text-blue-600">${n.whipStr}</div>
                <div class="text-xs text-gray-500 mt-0.5">被安打: ${n.h} / 与四死: ${n.bb}</div>
            </div>
            <div class="bg-white p-3 rounded-lg shadow border border-gray-100">
                <div class="text-xs text-gray-500 font-bold mb-1">直近 投球回・奪三振</div>
                <div class="text-xl font-black text-gray-800">${(n.outs/3).toFixed(1)} <span class="text-xs font-normal text-gray-500">回</span> ${n.so} <span class="text-xs font-normal text-gray-500">K</span></div>
                <div class="text-xs text-gray-500 mt-0.5">K/7: <span class="font-bold text-gray-800">${n.k7Str}</span></div>
            </div>
            <div class="bg-white p-3 rounded-lg shadow border border-gray-100">
                <div class="text-xs text-gray-500 font-bold mb-1">ストライク率</div>
                <div class="text-2xl font-black text-green-600">${(n.sRate*100).toFixed(1)}%</div>
                <div class="text-xs text-gray-500 mt-0.5">球数: ${n.pc} (S: ${n.st})</div>
            </div>
        `}}function eo(e,t,n,a){var r,o,i,d,l,c;const s=[];if(e.length===0)return s;if(n==="game")for(let u=0;u<e.length;u++){const g=Math.max(0,u-a+1),b=e.slice(g,u+1),f=b.map(w=>w.stats),y=t==="batter"?Zt(f):Xt(f),p=e[u],m=Tt((r=p.game)==null?void 0:r.team_first)?(o=p.game)==null?void 0:o.team_second:(i=p.game)==null?void 0:i.team_first;s.push({label:`${p.date.substring(5)} vs ${m||""}`,date:p.date,windowSpan:`${g+1}〜${u+1}試合目 (${b.length}試合)`,calc:y,stats:f})}else for(let u=0;u<e.length;u++){let g=0;const b=[];for(let w=u;w>=0;w--){b.unshift(e[w]);const v=t==="batter"?e[w].stats.at_bats||0:1;if(g+=v,g>=a)break}const f=b.map(w=>w.stats),y=t==="batter"?Zt(f):Xt(f),p=e[u],m=Tt((d=p.game)==null?void 0:d.team_first)?(l=p.game)==null?void 0:l.team_second:(c=p.game)==null?void 0:c.team_first;s.push({label:`${p.date.substring(5)} vs ${m||""}`,date:p.date,windowSpan:t==="batter"?`直近 ${y.ab} 打数`:`直近 ${b.length} 登板`,calc:y,stats:f})}return s}function wi(e,t,n){sn.rawGraph&&sn.rawGraph.destroy();const a=document.getElementById("chart-ps-raw-stats");if(!a||n.length===0)return;const s=[],r=[];let o=[];n.forEach(i=>{var c,u,g;o.push(i.stats);const d=Tt((c=i.game)==null?void 0:c.team_first)?(u=i.game)==null?void 0:u.team_second:(g=i.game)==null?void 0:g.team_first;s.push(`${i.date.substring(5)} vs ${d||""}`);const l=t==="batter"?Zt(o):Xt(o);r.push(l)}),t==="batter"?sn.rawGraph=new window.Chart(a.getContext("2d"),{type:"line",data:{labels:s,datasets:[{label:"累積打率",data:r.map(i=>i.avg),borderColor:"#ef4444",backgroundColor:"#ef4444",tension:.2},{label:"累積出塁率",data:r.map(i=>i.obp),borderColor:"#3b82f6",backgroundColor:"#3b82f6",tension:.2},{label:"累積OPS",data:r.map(i=>i.ops),borderColor:"#8b5cf6",backgroundColor:"#8b5cf6",borderDash:[4,4],tension:.2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"}},scales:{y:{min:0,ticks:{font:{size:10}}},x:{ticks:{font:{size:10},maxRotation:45}}}}}):sn.rawGraph=new window.Chart(a.getContext("2d"),{type:"line",data:{labels:s,datasets:[{label:"累積防御率",data:r.map(i=>i.era),borderColor:"#ef4444",backgroundColor:"#ef4444",tension:.2},{label:"累積WHIP",data:r.map(i=>i.whip),borderColor:"#3b82f6",backgroundColor:"#3b82f6",tension:.2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"}},scales:{y:{min:0,ticks:{font:{size:10}}},x:{ticks:{font:{size:10},maxRotation:45}}}}})}function Ei(e,t,n,a,s){const r=document.getElementById("ps-ma-graph-subtitle");r&&(r.textContent=`(${e} - 直近${s}${a==="ab"?"打数/登板":"試合"}移動平均)`),sn.maGraph&&sn.maGraph.destroy();const o=n.map(d=>d.label),i=document.getElementById("chart-ps-moving-avg");i&&(t==="batter"?sn.maGraph=new window.Chart(i.getContext("2d"),{type:"line",data:{labels:o,datasets:[{label:"移動平均 打率",data:n.map(d=>d.calc.avg),borderColor:"#ef4444",backgroundColor:"#ef4444",tension:.2},{label:"移動平均 出塁率",data:n.map(d=>d.calc.obp),borderColor:"#3b82f6",backgroundColor:"#3b82f6",tension:.2},{label:"移動平均 OPS",data:n.map(d=>d.calc.ops),borderColor:"#8b5cf6",backgroundColor:"#8b5cf6",borderDash:[4,4],tension:.2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"}},scales:{y:{min:0,ticks:{font:{size:10}}},x:{ticks:{font:{size:10},maxRotation:45}}}}}):sn.maGraph=new window.Chart(i.getContext("2d"),{type:"line",data:{labels:o,datasets:[{label:"移動平均 防御率",data:n.map(d=>d.calc.era),borderColor:"#ef4444",backgroundColor:"#ef4444",tension:.2},{label:"移動平均 WHIP",data:n.map(d=>d.calc.whip),borderColor:"#3b82f6",backgroundColor:"#3b82f6",tension:.2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"}},scales:{y:{min:0,ticks:{font:{size:10}}},x:{ticks:{font:{size:10},maxRotation:45}}}}}))}function _i(e,t){const n=document.getElementById("ps-game-thead"),a=document.getElementById("ps-game-tbody"),s=document.getElementById("ps-game-count-label");if(!n||!a)return;s&&(s.textContent=`対象全 ${t.length} 試合（最新順）`);const r=[...t].reverse();e==="batter"?(n.innerHTML=`
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
        `,a.innerHTML=r.map(o=>{var B,C,T;const i=o.stats,d=Tt((B=o.game)==null?void 0:B.team_first)?(C=o.game)==null?void 0:C.team_second:(T=o.game)==null?void 0:T.team_first,l=i.plate_appearances||0,c=i.at_bats||0,u=i.hits||0,g=i.doubles||0,b=i.triples||0,f=i.home_runs||0,y=i.singles!==void 0?i.singles:Math.max(0,u-g-b-f),p=i.runs_batted_in||0,m=i.runs||0,w=i.walks||0,v=i.hit_by_pitch||0,x=i.strikeouts||i.strike_outs||0,k=i.sacrifice_flies||i.sac_flies||0,$=(i.sacrifice_hits||i.sac_bunts||0)+k,h=i.stolen_bases||0,E=i.errors||0,_=c>0?(u/c).toFixed(3).replace(/^0/,""):".000",I=c+w+v+k,S=I>0?(u+w+v)/I:l>0?(u+w+v)/l:0,A=Math.round(S*1e3)/1e3;A.toFixed(3).replace(/^0/,"");const P=y+g*2+b*3+f*4,M=P>0?P:i.total_bases||0,N=c>0?M/c:0,G=Math.round(N*1e3)/1e3;G.toFixed(3).replace(/^0/,"");const R=(Math.round((A+G)*1e3)/1e3).toFixed(3);return`
                <tr class="hover:bg-gray-50">
                    <td class="p-2 border font-bold">${o.date}</td>
                    <td class="p-2 border">${d||"不明"}</td>
                    <td class="p-2 border text-center">${l}</td>
                    <td class="p-2 border text-center font-bold">${c}</td>
                    <td class="p-2 border text-center text-green-600 font-bold ${u>0?"bg-green-50":""}">${u}</td>
                    <td class="p-2 border text-center">${y}</td>
                    <td class="p-2 border text-center">${g}</td>
                    <td class="p-2 border text-center">${b}</td>
                    <td class="p-2 border text-center text-red-600 font-bold ${f>0?"bg-red-50":""}">${f}</td>
                    <td class="p-2 border text-center font-bold">${p}</td>
                    <td class="p-2 border text-center">${m}</td>
                    <td class="p-2 border text-center">${w}</td>
                    <td class="p-2 border text-center">${v}</td>
                    <td class="p-2 border text-center text-gray-500">${x}</td>
                    <td class="p-2 border text-center">${$}</td>
                    <td class="p-2 border text-center">${h}</td>
                    <td class="p-2 border text-center text-gray-500">${E}</td>
                    <td class="p-2 border text-center font-black text-red-600">${_}</td>
                    <td class="p-2 border text-center font-bold text-purple-700 bg-purple-50">${R}</td>
                </tr>
            `}).join("")):(n.innerHTML=`
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
        `,a.innerHTML=r.map(o=>{var h,E,_;const i=o.stats,d=Tt((h=o.game)==null?void 0:h.team_first)?(E=o.game)==null?void 0:E.team_second:(_=o.game)==null?void 0:_.team_first,l=i.outs||0,c=`${Math.floor(l/3)}${l%3!==0?"."+l%3:""}`,u=i.pitch_count||0,g=i.strikes||0,b=i.hits_allowed||0,f=i.home_runs_allowed||0,y=i.walks_allowed||0,p=i.hit_batters||0,m=i.strike_outs||0,w=i.runs_allowed||0,v=i.earned_runs||0,x=l/3,k=x>0?(v*7/x).toFixed(2):"0.00",$=x>0?((b+y)/x).toFixed(2):"0.00";return`
                <tr class="hover:bg-gray-50">
                    <td class="p-2 border font-bold">${o.date}</td>
                    <td class="p-2 border">${d||"不明"}</td>
                    <td class="p-2 border text-center font-bold">${c}</td>
                    <td class="p-2 border text-center">${u} (${g})</td>
                    <td class="p-2 border text-center">${b}</td>
                    <td class="p-2 border text-center text-red-600">${f}</td>
                    <td class="p-2 border text-center">${y}</td>
                    <td class="p-2 border text-center">${p}</td>
                    <td class="p-2 border text-center text-green-600 font-bold">${m}</td>
                    <td class="p-2 border text-center text-red-600">${w}</td>
                    <td class="p-2 border text-center text-red-600 font-bold">${v}</td>
                    <td class="p-2 border text-center font-black text-red-600">${k}</td>
                    <td class="p-2 border text-center font-bold text-blue-600">${$}</td>
                </tr>
            `}).join(""))}function Ii(e,t,n,a){const s=document.getElementById("ps-all-title"),r=document.getElementById("ps-all-subtitle"),o=document.getElementById("ps-all-thead"),i=document.getElementById("ps-all-tbody");if(!o||!i)return;const{games:d,bStats:l,pStats:c}=pn,u=t==="all"?"全試合":`直近 ${t} 試合`;s&&(s.textContent=`👥 全選手成績一覧 (${e==="batter"?"打撃":"投手"})`),r&&(r.textContent=`対象: ${u} / 移動平均: 直近${a}${n==="ab"?"打数/登板":"試合"} (各列クリックでソート)`);const g=new Set;l.forEach(m=>g.add(m.player_id)),c.forEach(m=>g.add(m.player_id));const f=Mt.filter(m=>g.has(m.id)).sort((m,w)=>m.name.localeCompare(w.name)).map(m=>{let x=[...(e==="batter"?l:c).filter(E=>E.player_id==m.id).map(E=>{const _=d.find(I=>I.id===E.game_id);return{date:(_==null?void 0:_.date)||"",game:_,stats:E}}).filter(E=>E.date).sort((E,_)=>E.date.localeCompare(_.date))];if(t!=="all"){const E=parseInt(t,10);x.length>E&&(x=x.slice(x.length-E))}const k=e==="batter"?Zt(x.map(E=>E.stats)):Xt(x.map(E=>E.stats)),$=eo(x,e,n,a),h=$.length>0?$[$.length-1].calc:k;return{player:m,name:m.name,gameCount:x.length,calcPeriod:k,latestMa:h,ab:k.ab,h:k.h,hr:k.hr,rbi:k.rbi,r:k.r,bb:k.bb+k.hbp,avg:k.avg,obp:k.obp,slg:k.slg,ops:k.ops,runRate:k.runRate,maAvg:h.avg,maOps:h.ops,outs:k.outs,so:k.so,pBb:k.bb,wins:k.wins,losses:k.losses,era:k.era,whip:k.whip,maEra:h.era,maWhip:h.whip}}),y=Rn[e];f.sort((m,w)=>{let v=m[y.key],x=w[y.key];return v===void 0&&(v=0),x===void 0&&(x=0),typeof v=="string"?y.order==="asc"?v.localeCompare(x):x.localeCompare(v):y.order==="asc"?v-x:x-v});const p=m=>y.key===m?y.order==="asc"?" ▲":" ▼":"";e==="batter"?(o.innerHTML=`
            <tr>
                <th class="p-2 border cursor-pointer select-none hover:bg-gray-200" data-ps-sort="name">選手名<span>${p("name")}</span></th>
                <th class="p-2 border text-center cursor-pointer select-none hover:bg-gray-200" data-ps-sort="gameCount">試合数<span>${p("gameCount")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="ab">打数<span>${p("ab")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="h">安打<span>${p("h")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="hr">HR<span>${p("hr")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="rbi">打点<span>${p("rbi")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 text-green-700 font-bold" data-ps-sort="r">得点<span>${p("r")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 text-blue-700 font-bold" data-ps-sort="bb">四死球<span>${p("bb")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-red-600" data-ps-sort="avg">打率 (${u})<span>${p("avg")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-blue-600" data-ps-sort="obp">出塁率 (${u})<span>${p("obp")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-teal-600" data-ps-sort="slg">長打率 (${u})<span>${p("slg")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-purple-600" data-ps-sort="ops">OPS (${u})<span>${p("ops")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-amber-600" data-ps-sort="runRate">生還率 (R/OB)<span>${p("runRate")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-blue-600" data-ps-sort="maAvg">移動平均 打率<span>${p("maAvg")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-indigo-600" data-ps-sort="maOps">移動平均 OPS<span>${p("maOps")}</span></th>
            </tr>
        `,i.innerHTML=f.map(m=>`
            <tr class="hover:bg-gray-50">
                <td class="p-2 border font-bold text-gray-800">${m.player.name}</td>
                <td class="p-2 border text-center">${m.gameCount}</td>
                <td class="p-2 border text-right font-semibold">${m.calcPeriod.ab}</td>
                <td class="p-2 border text-right text-green-600 font-bold">${m.calcPeriod.h}</td>
                <td class="p-2 border text-right">${m.calcPeriod.hr}</td>
                <td class="p-2 border text-right">${m.calcPeriod.rbi}</td>
                <td class="p-2 border text-right font-bold text-green-700">${m.calcPeriod.r}</td>
                <td class="p-2 border text-right font-bold text-blue-700">${m.calcPeriod.bb+m.calcPeriod.hbp}</td>
                <td class="p-2 border text-right font-black text-red-600">${m.calcPeriod.avgStr}</td>
                <td class="p-2 border text-right font-bold text-blue-600">${m.calcPeriod.obpStr}</td>
                <td class="p-2 border text-right font-bold text-teal-600">${m.calcPeriod.slgStr}</td>
                <td class="p-2 border text-right font-black text-purple-700 bg-purple-50">${m.calcPeriod.opsStr}</td>
                <td class="p-2 border text-right font-bold text-amber-600 bg-amber-50">${m.calcPeriod.runRateStr}</td>
                <td class="p-2 border text-right font-bold text-blue-600">${m.latestMa.avgStr}</td>
                <td class="p-2 border text-right font-bold text-indigo-600">${m.latestMa.opsStr}</td>
            </tr>
        `).join("")):(o.innerHTML=`
            <tr>
                <th class="p-2 border cursor-pointer select-none hover:bg-gray-200" data-ps-sort="name">選手名<span>${p("name")}</span></th>
                <th class="p-2 border text-center cursor-pointer select-none hover:bg-gray-200" data-ps-sort="gameCount">登板数<span>${p("gameCount")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 text-green-700 font-bold" data-ps-sort="wins">勝利<span>${p("wins")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 text-red-600 font-bold" data-ps-sort="losses">敗戦<span>${p("losses")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="outs">投球回<span>${p("outs")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="so">奪三振<span>${p("so")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="pBb">与四死<span>${p("pBb")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-red-600" data-ps-sort="era">防御率 (${u})<span>${p("era")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-blue-600" data-ps-sort="whip">WHIP (${u})<span>${p("whip")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-red-500" data-ps-sort="maEra">移動平均 防御率<span>${p("maEra")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-blue-500" data-ps-sort="maWhip">移動平均 WHIP<span>${p("maWhip")}</span></th>
            </tr>
        `,i.innerHTML=f.map(m=>`
            <tr class="hover:bg-gray-50">
                <td class="p-2 border font-bold text-gray-800">${m.player.name}</td>
                <td class="p-2 border text-center">${m.gameCount}</td>
                <td class="p-2 border text-right font-bold text-green-700">${m.calcPeriod.wins}</td>
                <td class="p-2 border text-right font-bold text-red-600">${m.calcPeriod.losses}</td>
                <td class="p-2 border text-right font-semibold">${(m.calcPeriod.outs/3).toFixed(1)}</td>
                <td class="p-2 border text-right text-green-600 font-bold">${m.calcPeriod.so}</td>
                <td class="p-2 border text-right">${m.calcPeriod.bb}</td>
                <td class="p-2 border text-right font-black text-red-600">${m.calcPeriod.eraStr}</td>
                <td class="p-2 border text-right font-black text-blue-600 bg-blue-50">${m.calcPeriod.whipStr}</td>
                <td class="p-2 border text-right font-bold text-red-500">${m.latestMa.eraStr}</td>
                <td class="p-2 border text-right font-bold text-blue-500">${m.latestMa.whipStr}</td>
            </tr>
        `).join("")),o.querySelectorAll("th[data-ps-sort]").forEach(m=>{m.addEventListener("click",()=>{const w=m.dataset.psSort;Rn[e].key===w?Rn[e].order=Rn[e].order==="asc"?"desc":"asc":(Rn[e].key=w,Rn[e].order=w==="era"||w==="whip"||w==="maEra"||w==="maWhip"||w==="name"?"asc":"desc"),Qs()})})}function $i(){var c,u,g,b,f,y;const e=((c=document.getElementById("ps-mode"))==null?void 0:c.value)||"single",t=((u=document.getElementById("ps-role"))==null?void 0:u.value)||"batter",n=(g=document.getElementById("ps-player"))==null?void 0:g.value,a=((b=Mt.find(p=>p.id==n))==null?void 0:b.name)||"全選手";let s="\uFEFF",r=`ants_stats_${e}_${t}_${a}_${new Date().toISOString().substring(0,10)}.csv`,o=null;if(e==="single"?o=(f=document.querySelector("#ps-game-tbody"))==null?void 0:f.closest("table"):o=(y=document.querySelector("#ps-all-tbody"))==null?void 0:y.closest("table"),!o){alert("出力対象のテーブルが見つかりません。");return}Array.from(o.querySelectorAll("tr")).forEach(p=>{const w=Array.from(p.querySelectorAll("th, td")).map(v=>`"${v.textContent.trim().replace(/"/g,'""')}"`).join(",");s+=w+`
`});const d=new Blob([s],{type:"text/csv;charset=utf-8;"}),l=document.createElement("a");l.href=URL.createObjectURL(d),l.download=r,l.click(),URL.revokeObjectURL(l.href)}function to(){const{games:e,bStats:t,pStats:n}=pn,a=e?e.length:0,s=a*2,r=document.getElementById("ranking-summary-info");r&&(r.textContent=`対象試合: ${a}試合 / 規定打席: ${s}打席 (試合数×2)`);const o=document.getElementById("ranking-mode-note");o&&(o.textContent=Ca?"※規定打席＝対象試合数×2打席（規定到達者を上位、規定未満を薄グレー網掛けで下段に表示）":"※規定打席を考慮せず全打者を合算順位で表示中（規定打席＝対象試合数×2打席）");const i={},d={};t.forEach(l=>{i[l.player_id]||(i[l.player_id]=[]),i[l.player_id].push(l)}),n.forEach(l=>{d[l.player_id]||(d[l.player_id]=[]),d[l.player_id].push(l)}),_s.batter=Object.keys(i).map(l=>{var u;const c=Zt(i[l]);return{name:((u=Mt.find(g=>g.id==l))==null?void 0:u.name)||"不明",...c,meetsRegulation:c.pa>=s}}).filter(l=>l.pa>0),_s.pitcher=Object.keys(d).map(l=>{var c;return{name:((c=Mt.find(u=>u.id==l))==null?void 0:c.name)||"不明",...Xt(d[l])}}).filter(l=>l.outs>0),$s("batter"),$s("pitcher")}function Si(e,t){xn[e].key===t?xn[e].order=xn[e].order==="asc"?"desc":"asc":(xn[e].key=t,t==="era"||t==="whip"||t==="bb7"||t==="bbRate"||t==="name"?xn[e].order="asc":xn[e].order="desc"),$s(e)}function $s(e){const t=xn[e],n=_s[e];if(n.sort((s,r)=>{if(e==="batter"&&Ca&&s.meetsRegulation!==r.meetsRegulation)return s.meetsRegulation?-1:1;let o=s[t.key],i=r[t.key];return typeof o=="string"?t.order==="asc"?o.localeCompare(i):i.localeCompare(o):t.order==="asc"?o-i:i-o}),e==="batter"){const s=document.getElementById("ranking-batter-tbody");if(s)if(n.length===0)s.innerHTML='<tr><td colspan="15" class="p-4 text-center text-gray-500">該当する選手データがありません</td></tr>';else{const r="background-image: repeating-linear-gradient(135deg, #f3f4f6 0px, #f3f4f6 6px, #e5e7eb 6px, #e5e7eb 12px);";let o=!1;s.innerHTML=n.map(i=>{const d=Ca&&!i.meetsRegulation,l=d&&!o;d&&(o=!0);const c=d?`border-b text-gray-500 ${l?"border-t-2 border-t-gray-300":""}`:"border-b hover:bg-gray-50",u=d?`style="${r}"`:"",g=d?'<span class="ml-1 text-[10px] font-normal px-1 py-0.5 rounded bg-gray-300/80 text-gray-700">規定未満</span>':"",b=d?"font-bold text-gray-600":"font-bold text-red-600",f=d?"font-bold text-gray-600":"text-purple-700 font-bold bg-purple-50",y=d?"text-gray-600":"text-blue-600",p=d?"text-gray-600":"text-teal-600";return`<tr class="${c}" ${u}><td class="p-2 font-bold">${ae(i.name)}${g}</td><td class="p-2">${i.pa}</td><td class="p-2">${i.ab}</td><td class="p-2 ${b}">${i.avgStr}</td><td class="p-2 ${f}">${i.opsStr}</td><td class="p-2 ${y}">${i.obpStr}</td><td class="p-2 ${p}">${i.slgStr}</td><td class="p-2">${i.h}</td><td class="p-2">${i.tb}</td><td class="p-2">${i.bb}</td><td class="p-2">${i.hbp}</td><td class="p-2">${i.rbi}</td><td class="p-2">${i.r}</td><td class="p-2">${i.sb}</td><td class="p-2">${i.hr}</td></tr>`}).join("")}}else document.getElementById("ranking-pitcher-tbody").innerHTML=n.map(s=>`<tr class="border-b hover:bg-gray-50"><td class="p-2 font-bold">${ae(s.name)}</td><td class="p-2 text-green-700 font-bold">${s.wins}</td><td class="p-2 text-red-600 font-bold">${s.losses}</td><td class="p-2">${s.outs}</td><td class="p-2 text-red-600 font-bold">${s.era.toFixed(2)}</td><td class="p-2">${s.whip.toFixed(2)}</td><td class="p-2">${s.k7.toFixed(2)}</td><td class="p-2">${s.bb7.toFixed(2)}</td><td class="p-2">${s.kRate.toFixed(3)}</td><td class="p-2">${s.bbRate.toFixed(3)}</td><td class="p-2">${(s.sRate*100).toFixed(1)}</td><td class="p-2">${s.kbb.toFixed(2)}</td></tr>`).join("");document.querySelectorAll(`#tab-content-ranking th[data-role="${e}"] span`).forEach(s=>s.textContent="");const a=document.querySelector(`#tab-content-ranking th[data-role="${e}"][data-sort="${t.key}"] span`);a&&(a.textContent=t.order==="asc"?" ▲":" ▼")}async function Ss(){await Xn();const e=document.getElementById("comp-role").value,t=Array.from(document.querySelectorAll(".comp-player-cb:checked")).map(l=>l.value);Object.values(us).forEach(l=>l.destroy()),us={};const n=document.getElementById("comp-charts-container");if(n&&(n.innerHTML=""),t.length===0)return;const{games:a,bStats:s,pStats:r}=pn,o=[...new Set(a.filter(l=>l.date).map(l=>l.date.split("T")[0]))].sort(),i=["#ef4444","#3b82f6","#10b981","#f59e0b","#8b5cf6","#06b6d4","#ec4899"];(e==="batter"?[{key:"avg",name:"打率"},{key:"ops",name:"OPS"},{key:"obp",name:"出塁率"},{key:"slg",name:"長打率"}]:[{key:"era",name:"防御率"},{key:"whip",name:"WHIP"},{key:"k7",name:"K/7"},{key:"bb7",name:"BB/7"},{key:"sRate",name:"S率(%)"}]).forEach((l,c)=>{const u=`chart-comp-${c}`,g=document.createElement("div");g.className="bg-white p-4 rounded shadow-md relative h-[300px] md:h-[400px]",g.innerHTML=`<canvas id="${u}"></canvas>`,n.appendChild(g);const b=t.map((f,y)=>{var $;const m=(e==="batter"?s:r).filter(h=>h.player_id==f).map(h=>{var E;return{date:((E=a.find(_=>_.id===h.game_id))==null?void 0:E.date.split("T")[0])||"",stats:h}}).filter(h=>h.date).sort((h,E)=>h.date.localeCompare(E.date));let w=[],v={};m.forEach(h=>{w.push(h.stats);let _=(e==="batter"?Zt(w):Xt(w))[l.key];l.key==="sRate"&&(_=_*100),v[h.date]=_});let x=null;const k=o.map(h=>(v[h]!==void 0&&(x=v[h]),x));return{label:(($=Mt.find(h=>h.id==f))==null?void 0:$.name)||"不明",data:k,borderColor:i[y%i.length],spanGaps:!0,tension:.1}});us[u]=new window.Chart(document.getElementById(u).getContext("2d"),{type:"line",data:{labels:o,datasets:b},options:{responsive:!0,maintainAspectRatio:!1,plugins:{title:{display:!0,text:`選手比較 (${l.name})`}}}})})}async function ks(){await Xn();const e=document.getElementById("tm-role").value,t=parseInt(document.getElementById("tm-window").value)||5,n=Array.from(document.querySelectorAll(".tm-player-cb:checked")).map(c=>c.value);Object.values(ms).forEach(c=>c.destroy()),ms={};const a=document.getElementById("tm-charts-container");if(a&&(a.innerHTML=""),n.length===0)return;const{games:s,bStats:r,pStats:o}=pn,i=[...new Set(s.filter(c=>c.date).map(c=>c.date.split("T")[0]))].sort(),d=["#ef4444","#3b82f6","#10b981","#f59e0b","#8b5cf6","#06b6d4","#ec4899"];(e==="batter"?[{key:"avg",name:"打率"},{key:"ops",name:"OPS"},{key:"obp",name:"出塁率"},{key:"slg",name:"長打率"}]:[{key:"era",name:"防御率"},{key:"whip",name:"WHIP"},{key:"k7",name:"K/7"},{key:"bb7",name:"BB/7"},{key:"sRate",name:"S率(%)"}]).forEach((c,u)=>{const g=`chart-tm-${u}`,b=document.createElement("div");b.className="bg-white p-4 rounded shadow-md relative h-[300px] md:h-[400px]",b.innerHTML=`<canvas id="${g}"></canvas>`,a.appendChild(b);const f=n.map((y,p)=>{var $;const w=(e==="batter"?r:o).filter(h=>h.player_id==y).map(h=>{var E;return{date:((E=s.find(_=>_.id===h.game_id))==null?void 0:E.date.split("T")[0])||"",stats:h}}).filter(h=>h.date).sort((h,E)=>h.date.localeCompare(E.date));let v={};for(let h=0;h<w.length;h++){const E=w.slice(Math.max(0,h-t+1),h+1).map(S=>S.stats);let I=(e==="batter"?Zt(E):Xt(E))[c.key];c.key==="sRate"&&(I=I*100),v[w[h].date]=I}let x=null;const k=i.map(h=>(v[h]!==void 0&&(x=v[h]),x));return{label:(($=Mt.find(h=>h.id==y))==null?void 0:$.name)||"不明",data:k,borderColor:d[p%d.length],spanGaps:!0,tension:.1}});ms[g]=new window.Chart(document.getElementById(g).getContext("2d"),{type:"line",data:{labels:i,datasets:f},options:{responsive:!0,maintainAspectRatio:!1,plugins:{title:{display:!0,text:`移動平均 (${c.name})`}}}})})}function Zs(){const e=document.getElementById("home-team-list");e&&(e.innerHTML=De.homeTeamNames.map(t=>`<div class="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2">
            <span>${t}</span>
            <button onclick="window.dashboard_removeHomeTeam('${t}')" class="text-red-500 hover:text-red-700 font-bold">&times;</button>
        </div>`).join(""))}async function ki(){const e=document.getElementById("new-home-team-name"),t=e.value.trim();if(!t||De.homeTeamNames.includes(t))return;const n=[...De.homeTeamNames,t];localStorage.setItem("ants_homeTeamNames",JSON.stringify(n)),z("自チーム名を追加中 (DB同期)...");try{await Js("homeTeamNames",n,"DASHBOARD_HOME_TEAMS",{teams:n,_updatedAt:Date.now()}),An(!0,"自チーム名をSupabase DBへ保存・同期しました")}catch(a){console.error("Supabase sync failed",a),An(!1,`DB同期に失敗 (このブラウザのみ保存): ${a.message}`)}finally{V()}De.homeTeamNames=n,Zs(),e.value="",Ut()}window.dashboard_removeHomeTeam=async function(e){if(!confirm(`「${e}」を自チームから削除しますか？`))return;const t=De.homeTeamNames.filter(n=>n!==e);localStorage.setItem("ants_homeTeamNames",JSON.stringify(t)),z("自チーム名を削除中 (DB同期)...");try{await Js("homeTeamNames",t,"DASHBOARD_HOME_TEAMS",{teams:t,_updatedAt:Date.now()}),An(!0,"自チーム名をSupabase DBから更新・同期しました")}catch(n){console.error("Supabase sync failed",n),An(!1,`DB同期に失敗 (このブラウザのみ保存): ${n.message}`)}finally{V()}De.homeTeamNames=t,Zs(),Ut()};async function Li(){const e=document.getElementById("csv-import-file"),t=document.getElementById("csv-import-type").value,n=document.getElementById("import-result-msg");if(!e.files||e.files.length===0)return alert("CSVファイルを選択してください。");const a=e.files[0],s=new FileReader;s.onload=async r=>{let o=r.target.result;o=o.replace(/^\uFEFF/,""),o=o.replace(/([A-Za-z0-9]+)(\d{3},[^0-9,])/g,`$1
$2`);const i=fi(o);if(i.length<2)return alert("データが空かフォーマットが不正です。");z("データベースへ保存中..."),n.classList.add("hidden");try{const d=new Map,l=new Map,c=[];for(let y=1;y<i.length;y++){const p=i[y];if(p.length<30)continue;const m=parseInt(p[0]),w=parseInt(p[3]);if(isNaN(m)||isNaN(w))continue;d.set(m,{id:m,name:p[1]||"不明",uniform_number:p[2]||null});let v=null;if(p[4]&&p[4].trim()){const k=p[4].trim().replace(/\//g,"-"),$=new Date(k);if(isNaN($.getTime())){const h=k.split("-");if(h.length===3){const E=parseInt(h[0],10),_=parseInt(h[1],10),I=parseInt(h[2],10);!isNaN(E)&&!isNaN(_)&&!isNaN(I)&&(v=`${E}-${String(_).padStart(2,"0")}-${String(I).padStart(2,"0")}`)}}else{const h=$.getFullYear(),E=String($.getMonth()+1).padStart(2,"0"),_=String($.getDate()).padStart(2,"0");v=`${h}-${E}-${_}`}}l.set(w,{id:w,date:v,team_first:p[5]||null,score:p[6]||null,team_second:p[7]||null,title:p[8]||null,category:p[9]||null,stadium:p[10]||null});const x={player_id:m,game_id:w};t==="batter"?["plate_appearances","at_bats","runs","hits","doubles","triples","home_runs","total_bases","runs_batted_in","stolen_bases","caught_stealing","sacrifice_hits","sacrifice_flies","walks","hit_by_pitch","strike_outs","left_on_base","double_plays","scoring_position_at_bats","scoring_position_hits","go","fo"].forEach(($,h)=>x[$]=parseInt(p[11+h])||0):t==="pitcher"&&["is_starter","wins","losses","saves","holds","qs","outs","pitch_count","strikes","batters_faced","at_bats","hits_allowed","home_runs_allowed","walks_allowed","hit_batters","strike_outs","runs_allowed","earned_runs","wild_pitches","balks","sacrifice_hits_allowed","sacrifice_flies_allowed","go","fo"].forEach(($,h)=>x[$]=parseInt(p[11+h])||0),c.push(x)}const{error:u}=await L.from("players").upsert(Array.from(d.values()));if(u)throw u;const{error:g}=await L.from("games").upsert(Array.from(l.values()));if(g)throw g;const b=t==="batter"?"batter_stats":"pitcher_stats",{error:f}=await L.from(b).upsert(c,{onConflict:"player_id, game_id"});if(f)throw f;await be("IMPORT_CSV",`成績データ(${t==="batter"?"打者":"投手"})を${c.length}件インポートしました`),n.textContent=`成功: ${c.length} 件のデータをインポートしました。`,n.className="mt-4 text-sm font-bold text-green-600",n.classList.remove("hidden"),e.value="",Ys()}catch(d){n.textContent=`エラー: ${d.message}`,n.className="mt-4 text-sm font-bold text-red-600",n.classList.remove("hidden")}finally{V()}},s.readAsText(a)}let dt=null,Me=null,rn=null;const bt={0:"ピッチャー",1:"キャッチャー",2:"ファースト",3:"セカンド",4:"サード",5:"ショート",6:"レフト",7:"センター",8:"ライト",9:"指名打者"},Bi={0:"ピッチャー",1:"キャッチャー",2:"ファースト",3:"セカンド",4:"サード",5:"ショート",6:"外野"};function ae(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ut(e,t=null){if(e==null||e==="")return t;if(typeof e!="string")return e;try{return JSON.parse(e)}catch{return t}}function Ai(e){if(!e||isNaN(Number(e)))return"";const t=new Date(Number(e));return isNaN(t.getTime())?"":`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}function $a(e,t=null){const n=t||ut(e==null?void 0:e.cf,{});return(n==null?void 0:n.date)||(e==null?void 0:e.da)||Ai(e==null?void 0:e.tm)||""}function Ir(e){if(!e)return"";const t=String(e).split("T")[0].replace(/\//g,"-").split("-");if(t.length===3){const n=parseInt(t[0],10),a=parseInt(t[1],10),s=parseInt(t[2],10);if(!isNaN(n)&&!isNaN(a)&&!isNaN(s))return`${n}-${a}-${s}`}return e}function oa(e){if(!e||!e.sc)return"";const t=ut(e.sc,null);return Array.isArray(t)&&t[1]&&Array.isArray(t[1])&&t[1][0]&&t[1][1]?`${t[1][0][0]}-${t[1][1][0]}`:""}function Ls(e){return e&&(e.disp||e.di||((e.la||e.last||"")+(e.fi||e.first?" "+(e.fi||e.first):"")).trim()||e.na)||"不明"}function no(e){const t=new Map,n=new Map,a=new Map,s=[],r=[],o=[["選手ID","選手名","背番号","試合ID","日付","先攻チーム","得点","後攻チーム","タイトル","カテゴリ","球場","打席","打数","得点","安打","二塁打","三塁打","本塁打","塁打","打点","盗塁","盗塁死","犠打","犠飛","四球","死球","三振","残塁","併殺打","得点圏打数","得点圏安打","GO","FO"]],i=[["選手ID","選手名","背番号","試合ID","日付","先攻チーム","得点","後攻チーム","タイトル","カテゴリ","球場","先発","勝数","負数","セーブ","ホールド","QS","アウト数","球数","S数","打者","打数","安打","本塁打","四球","死球","三振","失点","自責点","暴投","ボーク","犠打","犠飛","GO","FO"]],d=new Map;Array.isArray(e.fld)&&e.fld.forEach(f=>{const y=parseInt(f.gid,10),p=parseInt(f.pid,10);isNaN(y)||isNaN(p)||p<=0||(d.has(y)||d.set(y,[]),d.get(y).push(f))});const l=new Map;Array.isArray(e.game)&&e.game.forEach(f=>{const y=parseInt(f.gid??f._id,10);if(isNaN(y))return;l.set(y,f);const p=ut(f.cf,{}),m=$a(f,p),w=la(m)||null,v=oa(f),x=f.tt||(p==null?void 0:p.title)||null,k=f.pa||(p==null?void 0:p.stadi)||null;n.set(y,{id:y,date:w,team_first:f.tn||null,score:v||null,team_second:f.bn||null,title:x,category:f.ca||null,stadium:k}),a.set(y,{gid:y,date:w||"",rawDate:m,tn:f.tn||"",bn:f.bn||"",tt:x||"",ca:f.ca||"",pa:k||"",ti:f.ti||"",bi:f.bi||"",sc:f.sc||"",cf:f.cf||"",cd:f.cd||"",pl:f.pl||"",te:f.te||"",fld:d.get(y)||[],updatedAt:Date.now()});const $=ut(f.pl,[]);Array.isArray($)&&$.forEach(h=>{const E=parseInt(h.id??h.pid,10);isNaN(E)||E<=0||t.has(E)||t.set(E,{id:E,name:Ls(h),uniform_number:h.num!==void 0&&h.num!==null&&h.num!==""?String(h.num):null})})}),Array.isArray(e.player)&&e.player.forEach(f=>{const y=parseInt(f.pid??f._id,10);if(isNaN(y)||y<=0)return;const p=Ls(f),m=f.nu!==void 0&&f.nu!==null&&String(f.nu)!==""?String(f.nu):"";t.set(y,{id:y,name:p,uniform_number:m||null})});const c=(f,y,p)=>{if(isNaN(f)||f<=0||isNaN(y)||!Array.isArray(p)||p.length<22)return;const m=l.get(y),w=m?ut(m.cf,{}):null,v=m?oa(m):"",x=m?Ir($a(m,w)):"",k=t.get(f)||{name:"不明",uniform_number:null},$=p.length>=23?p[21]??0:p[20]??0,h=p.length>=23?p[22]??0:p[21]??0,E=[p[0]??0,p[1]??0,p[2]??0,p[3]??0,p[4]??0,p[5]??0,p[6]??0,p[7]??0,p[8]??0,p[9]??0,p[10]??0,p[11]??0,p[12]??0,p[13]??0,p[14]??0,p[15]??0,p[16]??0,p[17]??0,p[18]??0,p[19]??0,$,h];o.push([f,k.name,k.uniform_number||"",y,x,(m==null?void 0:m.tn)||"",v,(m==null?void 0:m.bn)||"",(m==null?void 0:m.tt)||(w==null?void 0:w.title)||"",(m==null?void 0:m.ca)||"",(m==null?void 0:m.pa)||(w==null?void 0:w.stadi)||"",...E]);const _=["plate_appearances","at_bats","runs","hits","doubles","triples","home_runs","total_bases","runs_batted_in","stolen_bases","caught_stealing","sacrifice_hits","sacrifice_flies","walks","hit_by_pitch","strike_outs","left_on_base","double_plays","scoring_position_at_bats","scoring_position_hits","go","fo"],I={player_id:f,game_id:y};_.forEach((S,A)=>{I[S]=parseInt(E[A],10)||0}),s.push(I)},u=(f,y,p)=>{if(isNaN(f)||f<=0||isNaN(y)||!Array.isArray(p)||p.length<24)return;const m=l.get(y),w=m?ut(m.cf,{}):null,v=m?oa(m):"",x=m?Ir($a(m,w)):"",k=t.get(f)||{name:"不明",uniform_number:null},$=parseInt(p[5],10)||0,h=parseInt(p[19],10)||0,E=Math.max(0,$-h),_=[p[0]??0,p[1]??0,p[2]??0,p[3]??0,p[21]??0,p[20]??0,p[4]??0,$,E,p[6]??0,p[7]??0,p[8]??0,p[9]??0,p[10]??0,p[11]??0,p[12]??0,p[13]??0,p[14]??0,p[15]??0,p[16]??0,p[17]??0,p[18]??0,p[22]??0,p[23]??0];i.push([f,k.name,k.uniform_number||"",y,x,(m==null?void 0:m.tn)||"",v,(m==null?void 0:m.bn)||"",(m==null?void 0:m.tt)||(w==null?void 0:w.title)||"",(m==null?void 0:m.ca)||"",(m==null?void 0:m.pa)||(w==null?void 0:w.stadi)||"",..._]);const I=["is_starter","wins","losses","saves","holds","qs","outs","pitch_count","strikes","batters_faced","at_bats","hits_allowed","home_runs_allowed","walks_allowed","hit_batters","strike_outs","runs_allowed","earned_runs","wild_pitches","balks","sacrifice_hits_allowed","sacrifice_flies_allowed","go","fo"],S={player_id:f,game_id:y};I.forEach((A,P)=>{S[A]=parseInt(_[P],10)||0}),r.push(S)};Array.isArray(e.bat)&&e.bat.forEach(f=>{c(parseInt(f.pid,10),parseInt(f.gid,10),f.st)}),Array.isArray(e.pit)&&e.pit.forEach(f=>{u(parseInt(f.pid,10),parseInt(f.gid,10),f.st)}),s.length===0&&r.length===0&&Array.isArray(e.player)&&e.player.forEach(f=>{const y=parseInt(f.pid??f._id,10);if(isNaN(y)||y<=0||!f.st)return;const p=ut(f.st,null);p&&(Array.isArray(p.bat)&&p.bat.forEach(m=>c(y,parseInt(m.id??m.gid,10),m.st)),Array.isArray(p.pit)&&p.pit.forEach(m=>u(y,parseInt(m.id??m.gid,10),m.st)))});const g=new Set;return s.forEach(f=>g.add(f.player_id)),r.forEach(f=>g.add(f.player_id)),g.size===0&&t.forEach((f,y)=>g.add(y)),{players:Array.from(t.values()).filter(f=>g.has(f.id)),allPlayersMap:t,games:Array.from(n.values()),gameDetails:Array.from(a.values()),batterStats:s,pitcherStats:r,rawBRows:o,rawPRows:i,rawGamesById:l}}function Ti(e){var o;const t=(o=e.target.files)==null?void 0:o[0],n=document.getElementById("backup-extract-msg"),a=document.getElementById("backup-game-select"),s=document.getElementById("backup-game-extract-area");if(!t)return;const r=new FileReader;r.onload=i=>{try{const d=String(i.target.result||"").replace(/^\uFEFF/,""),l=JSON.parse(d);if(!l.game||!Array.isArray(l.game))throw new Error("Scorerのバックアップ／試合データ (game配列を含むJSON) ではありません。");if(dt=l,Me=no(l),a){const c=[...Me.gameDetails].sort((u,g)=>String(g.date||"").localeCompare(String(u.date||""))||(g.gid||0)-(u.gid||0));a.innerHTML=c.map(u=>{const g=oa(u);return`<option value="${u.gid}">${ae(u.date||"日付不明")} | ${ae(u.tn)} ${ae(g)} ${ae(u.bn)} (${ae(u.tt||"試合")}) [ID:${u.gid}]</option>`}).join("")}s&&s.classList.toggle("hidden",Me.gameDetails.length===0),n&&(n.textContent=`読み込み完了: 試合 ${Me.games.length}件 / 詳細プレイログ ${Me.gameDetails.filter(c=>c.cd).length}件 / 打者成績 ${Me.batterStats.length}件 / 投手成績 ${Me.pitcherStats.length}件`,n.className="mt-3 text-sm font-bold text-indigo-700",n.classList.remove("hidden"))}catch(d){dt=null,Me=null,s==null||s.classList.add("hidden"),n&&(n.textContent=`読み込みエラー: ${d.message}`,n.className="mt-3 text-sm font-bold text-red-600",n.classList.remove("hidden"))}},r.readAsText(t)}async function ra(e,t,n,a=void 0){for(let s=0;s<t.length;s+=n){const r=t.slice(s,s+n),{error:o}=a?await L.from(e).upsert(r,a):await L.from(e).upsert(r);if(o)throw o}}async function Di(){const e=document.getElementById("backup-extract-msg");if(!Me)return alert("先に scorer_data*.txt または scorer_game*.txt を選択してください。");z("バックアップデータから成績・詳細分析データをDBへ一括インポート中...");try{const{players:t,games:n,gameDetails:a,batterStats:s,pitcherStats:r}=Me;t.length>0&&await ra("players",t,200),n.length>0&&await ra("games",n,100),s.length>0&&await ra("batter_stats",s,200,{onConflict:"player_id, game_id"}),r.length>0&&await ra("pitcher_stats",r,200,{onConflict:"player_id, game_id"});const o=a.map(i=>({key:`SCORER_GAME_DETAIL_${i.gid}`,data:i}));o.length>0&&await ra("master_data",o,15,{onConflict:"key"}),await be("IMPORT_BACKUP",`Scorerデータ一括インポート: 試合=${n.length}件, 詳細ログ=${o.length}件, 打者=${s.length}件, 投手=${r.length}件`),e&&(e.textContent=`DBインポート完了: 試合 ${n.length}件 / 詳細プレイ ${o.length}件 / 打者成績 ${s.length}件 / 投手成績 ${r.length}件を保存しました（「詳細分析・文字起こし」タブから即座に参照できます）。`,e.className="mt-3 text-sm font-bold text-green-600",e.classList.remove("hidden")),Yt=[],await Ys()}catch(t){console.error(t),e&&(e.textContent=`DBインポートエラー: ${t.message}`,e.className="mt-3 text-sm font-bold text-red-600",e.classList.remove("hidden"))}finally{V()}}function Ya(e,t,n){const a=new Blob([e],{type:t}),s=document.createElement("a");s.href=URL.createObjectURL(a),s.download=n,s.click(),URL.revokeObjectURL(s.href)}function $r(e){if(!Me)return alert("先に scorer_data*.txt ファイルを選択してください。");const t=e==="batter"?Me.rawBRows:Me.rawPRows;if(t.length<=1)return alert("このファイルには該当する集計成績レコード（bat/pit配列）が含まれていません。");const n=e==="batter"?"scorer_stats_raw_b.csv":"scorer_stats_raw_p.csv",a="\uFEFF"+t.map(s=>s.map(r=>{const o=r==null?"":String(r);return o.includes(",")||o.includes('"')||o.includes(`
`)?`"${o.replace(/"/g,'""')}"`:o}).join(",")).join(`
`)+`
`;Ya(a,"text/csv;charset=utf-8;",n)}function Ci(){var l;if(!dt||!Me)return alert("先に scorer_data*.txt ファイルを選択してください。");const e=parseInt((l=document.getElementById("backup-game-select"))==null?void 0:l.value,10);if(isNaN(e))return alert("抽出する試合を選択してください。");const t=Me.rawGamesById.get(e);if(!t)return alert("選択された試合データが見つかりません。");const n=ut(t.cf,{}),a=ut(t.te,[]),s=ut(t.pl,[]),r=new Set(a.map(c=>c.id).filter(Boolean)),o=new Set(s.map(c=>c.id).filter(Boolean)),i={kind:"GD",team:Array.isArray(dt.team)?dt.team.filter(c=>r.has(c.tid??c.id)):[],player:Array.isArray(dt.player)?dt.player.filter(c=>o.has(c.pid??c.id)):[],game:[t],bat:Array.isArray(dt.bat)?dt.bat.filter(c=>parseInt(c.gid,10)===e):[],pit:Array.isArray(dt.pit)?dt.pit.filter(c=>parseInt(c.gid,10)===e):[],fld:Array.isArray(dt.fld)?dt.fld.filter(c=>parseInt(c.gid,10)===e):[],cat:Array.isArray(dt.cat)?dt.cat.filter(c=>parseInt(c.gid,10)===e):[]},d=la($a(t,n)).replace(/[^0-9]/g,"")||String(e);Ya(JSON.stringify(i),"text/plain;charset=utf-8;",`scorer_game${d}.txt`)}function Ni(){var o;if(!Me)return alert("先にバックアップ／試合ファイルを選択してください。");const e=parseInt((o=document.getElementById("backup-game-select"))==null?void 0:o.value,10);if(isNaN(e))return alert("抽出する試合を選択してください。");const t=Me.gameDetails.find(i=>i.gid===e);if(!t)return alert("選択された試合データが見つかりません。");const n=so(t),a=confirm(`1球ごとの投球カウント（[1]ボール等）もテキストに含めますか？
（「キャンセル」を押すと打席結果・重要イベントのみのすっきりした戦績表を保存します）`),s=Xs(n,a),r=(t.date||"").replace(/[^0-9]/g,"")||String(e);Ya("\uFEFF"+s,"text/plain;charset=utf-8;",`戦績文字起こし_${r}_${t.tn}_vs_${t.bn}.txt`)}function Pi(){var t;if(!Me||Me.gameDetails.length===0)return alert("先にバックアップ／試合ファイルを選択してください。");const e=(t=document.getElementById("backup-game-select"))==null?void 0:t.value;Yt=Me.gameDetails,Xr("detail-analysis"),Ka(!0,e?String(e):"all")}function Sr(e){const t=[];return e&1&&t.push("1"),e&2&&t.push("2"),e&4&&t.push("3"),t.length?t.join("･")+"塁":""}function ao(e){const t=[];return e&1&&t.push("1"),e&2&&t.push("2"),e&4&&t.push("3"),t.length?`◆(${t.join(",")}塁)`:"◇"}function so(e){var T,F,X,W,Z,j,Q,H,re,oe,he,Te,tt,me,ot,He,Ft,Dt,xt,vt,gt,K,pe;const t=ut(e==null?void 0:e.cf,{}),n=ut(e==null?void 0:e.te,[]),a=ut(e==null?void 0:e.pl,[]),s=ut(e==null?void 0:e.sc,[[[],[]],[[0,0,0,0],[0,0,0,0]]]),r=new Map;Array.isArray(a)&&a.forEach(D=>{const q=parseInt(D.id??D.pid,10);isNaN(q)||r.set(q,{id:q,name:Ls(D),num:String(D.num??D.nu??"")})});const o=D=>r.get(parseInt(D,10))||{id:parseInt(D,10),name:`選手${D}`,num:""},i=Array.isArray(t==null?void 0:t.gteams)?t.gteams:[],d=[[],[]];[0,1].forEach(D=>{const q=i[D];q&&Array.isArray(q.players)&&(d[D]=q.players.filter(fe=>fe.ord>=0).sort((fe,ve)=>fe.ord-ve.ord).map(fe=>{const ve=o(fe.id);return{ord:fe.ord,pos:fe.pos,id:fe.id,name:ve.name,num:ve.num}}))});const l=(e==null?void 0:e.tn)||((T=n[0])==null?void 0:T.disp)||((F=n[0])==null?void 0:F.name)||"先攻",c=(e==null?void 0:e.bn)||((X=n[1])==null?void 0:X.disp)||((W=n[1])==null?void 0:W.name)||"後攻",u=Tt(l),g=Tt(c),b=[0,0];let f=0,y=0,p=0,m=0,w=0,v=0,x={1:null,2:null,3:null},k=[0,0],$=!1,h="1回表";const E=[],_=[],I=[],S=()=>(x[1]?1:0)+(x[2]?2:0)+(x[3]?4:0),A=(D,q)=>d[D].find(fe=>String(fe.pos)===String(q));function P(D,q,fe=null){const ve=[],it=[];let Qe=fe!=null?String(fe):null;const Mn=/(J)(\d)([1-4a-g])|([OT])(\d)(\d)|(Th|Tb|Es|Ek|Ec|Ej|Eu)(\d+)|(Cb|Ch|Cf)/g;for(const nt of D.matchAll(Mn))if(nt[1]==="J"){const Se=parseInt(nt[2],10),ye=nt[3],ce=/[1-4]/.test(ye)?parseInt(ye,10):{a:1,b:2,c:3,d:4,e:2,f:3,g:4}[ye]||1,Ze=Se===0?q:x[Se],O=Ze?Ze.name:q.name,U=Se===0?`打者${O}`:`${Se}塁ランナー${O}`;Se>0&&Se!==ce&&(x[Se]=null),ce===4?(k[f]++,ve.push(`${U}生還`)):Se!==ce&&(ce>=1&&ce<=3&&(x[ce]=Ze),ve.push(`${U}${ce}塁へ`))}else if(nt[4]==="O"||nt[4]==="T"){const Se=nt[4],ye=parseInt(nt[5],10),ce=parseInt(nt[6],10);if(w++,ye===0&&ce===0)ve.push(Se==="T"?"タッチアウト":"アウト");else{const Ze=ye===0?q:x[ye],O=Ze?Ze.name:q.name,U=ye===0?`打者${O}`:`${ye}塁ランナー${O}`,J=ce===4?"本塁":ce>0?`${ce}塁`:"";ve.push(`${U}${J}${Se==="T"?"タッチアウト":"アウト"}`),ye>0&&(x[ye]=null)}}else if(nt[7]){const Se=nt[7],ye=nt[8],ce=ye.slice(-1),Ze=J=>J==="9"?"その他":bt[J]||"その他",O=Ze(ce),U=ye.length>=2&&ye[0]!=="0"&&ye[0]!=="9"?ye[0]:Qe;if(Se==="Th")ve.push(`${bt[ce]||""}に送球`),Qe=ce;else if(Se==="Tb")ve.push(`${bt[ce]||""}`),Qe=ce;else if(Se==="Es")ve.push(`${bt[ce]||""}に送球エラー`),it.push({pos:U||void 0,posName:U?Ze(U):"送球エラー"});else if(Se==="Ek"||Se==="Ej"){ve.push(ce!=="9"&&bt[ce]?`${bt[ce]}エラー`:"エラー");const J=ce==="9"&&Qe?Qe:ce;it.push({pos:J,posName:Ze(J)})}else Se==="Ec"?(ve.push(`${O}捕球エラー`),it.push({pos:ce,posName:O})):Se==="Eu"&&(ve.push("悪送球エラー"),it.push({pos:U||void 0,posName:U?Ze(U):"悪送球エラー"}))}return{msgs:ve,errDetails:it}}const M=String((e==null?void 0:e.cd)||"").split("=").filter(Boolean);for(const D of M){let q="",fe="play",ve=!1,it=[];const Qe=1-f,Mn=f===0?l:c,nt=f===0?u:g,Se=f===0?g:u,ye=d[f][b[f]]||{name:"",num:"",id:null};if(/^I([tb])(\d+)$/.test(D)){const O=D.match(/^I([tb])(\d+)$/);f=O[1]==="t"?0:1;const U=parseInt(O[2],10);y=(U-1)*2+f,h=`${U}回${f===0?"表":"ｳﾗ"}`,w=0,p=0,m=0,v=0,x={1:null,2:null,3:null},$=!1,q=`${h} `,fe="inning_header"}else if(/^A([tb])(\d+)(?:Lb(\d+))?$/.test(D)){const O=D.match(/^A([tb])(\d+)(?:Lb(\d+))?$/),U=parseInt(O[2],10),J=O[1]==="t"?"表":"ｳﾗ",ee=O[3]?` ${Sr(parseInt(O[3],10))}ランナー残塁`:"";q=`${U}回${J}終了${ee} `,fe="inning_end",$&&d[f].length>0&&(b[f]=(b[f]+1)%d[f].length,$=!1)}else if(D==="Ah")q="試合終了 ",fe="game_end";else if(/^(Am|Ag|Ap|Odp|Sc|Sw|Qw|Qx|Pt)/.test(D))q="";else if(D==="Nb")d[f].length>0&&(b[f]=(b[f]+1)%d[f].length),p=0,m=0,v=0,$=!1;else if(D==="Na"){p=0,m=0,v=0,$=!1;const O=b[f]+1,U=d[f][b[f]];q=U?`${O}番${U.name}${U.num?"#"+U.num:""}`:`${O}番`,fe="batter"}else if(/^Iz/.test(D)){const O=d[f].length||9;x[1]=d[f][(b[f]-1+O)%O],x[2]=d[f][(b[f]-2+O)%O],q="タイブレーク (1･2塁ランナー設定) "}else if(/^P([bslf])$/.test(D)||D==="Px")v++,ve=!0,D==="Pb"?(p++,q=`[${v}]ボール `):D==="Ps"?(m++,q=`[${v}]空振りストライク `):D==="Pl"?(m++,q=`[${v}]見逃しストライク `):D==="Pf"?(m<2&&m++,q=`[${v}]ファウル `):(m<3&&m++,q=`[${v}]バント/カット `);else if(D==="Ko")w++,$=!0,q=`[${Math.max(1,v)}]三振アウト `;else if(/^(Bb|Db|Dn|Dk)/.test(D)){const O=D.slice(0,2);O==="Db"&&v++,O!=="Dk"&&($=!0);const U={Bb:"フォアボール",Db:`[${v}]デッドボール`,Dn:"打撃妨害",Dk:"ボーク"}[O],J=P(D.slice(2),ye);it=J.errDetails,q=[U,...J.msgs].join(" ")+" "}else if(/^E([wp])/.test(D)){const O=D[1]==="w"?"ワイルドピッチ":"パスボール",U=P(D.slice(2),ye);it=U.errDetails,q=[O,...U.msgs].join(" ")+" "}else if(D==="Kr")q="";else if(/^K([wpt])/.test(D)){$=!0;const O=D[1],U=O==="t"?"振り逃げ失敗":`振り逃げ (${O==="w"?"暴投":"捕逸"})`,J=P(D.slice(2),ye);it=J.errDetails,q=[U,...J.msgs].join(" ")+" "}else if(/^H([1-4])([a-z-])([a-z-])(\d)(.*)/.test(D)){const O=D.match(/^H([1-4])([a-z-])([a-z-])(\d)(.*)/);v++,$=!0;const U=parseInt(O[1],10),J=O[2],ee=O[3],ue=O[4],wt=O[5];let Ht=["","ヒット","ツーベース","スリーベース","ホームラン"][U];U===1&&J==="b"&&ee==="i"?Ht="バント内野安打":U===1&&J==="h"&&ee==="i"?Ht="強襲ヒット":U===1&&J==="i"?Ht="内野安打":U===4&&J==="r"&&(Ht="ランニングホームラン");const fr=P(wt,ye,ue);it=fr.errDetails,q=[`[${v}]${bt[ue]||""}${Ht}`,...fr.msgs].join(" ")+" "}else if(/^(Gob|Go|Fob|Fof|Fol|Fo)[-]*(\d)?\d?(.*)/.test(D)){const O=D.match(/^(Gob|Go|Fob|Fof|Fol|Fo)[-]*(\d)?\d?(.*)/);v++,$=!0;const U={Go:"ゴロ",Gob:"バントゴロ",Fo:"フライ",Fol:"ライナー",Fof:"ファウルフライ",Fob:"バントフライ"}[O[1]]||"アウト",J=P(O[3]||"",ye,O[2]);it=J.errDetails,q=[`[${v}]${O[2]!==void 0&&bt[O[2]]||""}${U}`,...J.msgs].join(" ")+" "}else if(/^Rq(\d)(\d)/.test(D)){const O=D.match(/^Rq(\d)(\d)/);q=`${O[1]==="1"?"キャッチャー":"ピッチャー"}${{1:"1塁",2:"2塁",4:"3塁"}[O[2]]||"塁"}牽制 `,ve=!0}else if(/^Ru(\d+)/.test(D))q=`${Sr(parseInt(D.slice(2),10))}ランナースタート `,ve=!0;else if(/^(Rs|Rd|Rc|Rf|Rg|Rr|Rz)(.*)/.test(D)){const O=D.slice(0,2),U={Rs:"盗塁",Rd:"ダブルスチール",Rc:"守備無関心",Rf:"盗塁失敗",Rg:"牽制アウト",Rr:"走塁アウト",Rz:""}[O],J=(O==="Rr"||O==="Rg")&&/^[01]$/.test(D[2])?D[2]:null,ee=P(D.slice(2),ye,J);it=ee.errDetails,q=(U?[U,...ee.msgs]:ee.msgs).join(" ")+" "}else if(/^Sh([0-9a-c])#(\d+):/.test(D)){const[,O,U]=D.match(/^Sh([0-9a-c])#(\d+):/),J=parseInt(O,16),ee=o(U),ue=d[f][J];q=`${J+1}番${(ue==null?void 0:ue.name)||""}に代打${ee.name}${ee.num?"#"+ee.num:""}`,d[f][J]={...ue,ord:J,id:parseInt(U,10),name:ee.name,num:ee.num}}else if(/^Sha#(\d+):/.test(D)){const[,O]=D.match(/^Sha#(\d+):/),U=o(O),J=b[f],ee=d[f][J];q=`${J+1}番${(ee==null?void 0:ee.name)||""}に代打${U.name}${U.num?"#"+U.num:""}`,d[f][J]={...ee,ord:J,id:parseInt(O,10),name:U.name,num:U.num}}else if(/^Sr([0-9a-c])#(\d+):/.test(D)){const[,O,U]=D.match(/^Sr([0-9a-c])#(\d+):/),J=parseInt(O,16),ee=o(U),ue=d[f][J];let wt="";for(const Ht of[1,2,3])((Z=x[Ht])==null?void 0:Z.id)===(ue==null?void 0:ue.id)&&(wt=`${Ht}塁ランナー`,x[Ht]={id:parseInt(U,10),name:ee.name,num:ee.num});q=`${wt}${(ue==null?void 0:ue.name)||""}に代走${ee.name}${ee.num?"#"+ee.num:""}`,d[f][J]={...ue,ord:J,id:parseInt(U,10),name:ee.name,num:ee.num}}else if(/^S(ih|ir)(\d)#(\d+):/.test(D)){const[,O,U,J]=D.match(/^S(ih|ir)(\d)#(\d+):/),ee=o(J),ue=d[Qe].find(wt=>wt.id===parseInt(J,10));ue&&(ue.pos=parseInt(U,10)),q=`${O==="ih"?"代打":"代走"}${ee.name}が${bt[U]||""}へ`}else if(/^Sk(\d)(\d)#(\d+):/.test(D)){const[,O,U,J]=D.match(/^Sk(\d)(\d)#(\d+):/),ee=o(J),ue=d[Qe].find(wt=>wt.id===parseInt(J,10));ue&&(ue.pos=parseInt(U,10)),q=`${bt[O]||""}${ee.name}が${bt[U]||""}へ`}else if(/^Skh(\d)#(\d+):/.test(D)){const[,O,U]=D.match(/^Skh(\d)#(\d+):/),J=o(U),ee=d[Qe].find(ue=>ue.id===parseInt(U,10));ee&&(ee.pos=parseInt(O,10)),q=`${J.name}が${bt[O]||""}へ`}else if(/^Sd([0-9a-c])(\d)#(\d+):/.test(D)){const[,O,U,J]=D.match(/^Sd([0-9a-c])(\d)#(\d+):/),ee=parseInt(O,16),ue=o(J),wt=d[Qe][ee];q=`${ee+1}番${(wt==null?void 0:wt.name)||""}に代わり${ue.name}が${bt[U]||""}へ`,d[Qe][ee]={...wt,ord:ee,pos:parseInt(U,10),id:parseInt(J,10),name:ue.name,num:ue.num}}else if(/^Sda(\d)#(\d+):/.test(D)){const[,O,U]=D.match(/^Sda(\d)#(\d+):/),J=o(U),ee=10,ue=d[Qe][ee];q=`${ee+1}番${(ue==null?void 0:ue.name)||""}に代わり${J.name}が${bt[O]||""}へ`,d[Qe][ee]={...ue,ord:ee,pos:parseInt(O,10),id:parseInt(U,10),name:J.name,num:J.num}}else if(/^W/.test(D)){if(ve=!0,D==="Wtf")q=`${Mn}：チーム初安打 `;else if(/^Wtc(\d+)/.test(D))q=`${Mn}：チーム${D.slice(3)}者連続安打 `;else if(/^Whm(\d+)/.test(D))q=`バッター${ye.name}：${D.slice(3)}安打 `;else if(/^Wh(\d+)/.test(D))q=`バッター${ye.name}：猛打賞 `;else if(/^Wkb(\d+)/.test(D))q=`バッター${ye.name}：三振${D.slice(3)}個目 `;else if(/^Wkc(\d+)/.test(D)){const O=A(Qe,"0");q=`ピッチャー${(O==null?void 0:O.name)||""}：${D.slice(3)}者連続三振 `}}it.forEach(O=>{const U=O.pos!==void 0?A(Qe,O.pos):null;I.push({inning:h,posName:O.posName,fielderName:(U==null?void 0:U.name)||"",play:q.trim(),isHomeFielding:Se})});const ce=S();E.push({inn:y,ball:p,strk:m,out:w,rnr:ce,trun:k[0],brun:k[1],isHomeBatting:nt,isHomeFielding:Se,currentBatterName:ye.name,codes:[{cd:D,pli:{sPlay:q}}]});const Ze=q.trim();Ze&&_.push({type:fe,cd:D,inningLabel:h,half:f===0?"top":"bot",isHomeBatting:nt,text:Ze,scoreTop:k[0],scoreBot:k[1],topTeam:l,botTeam:c,ball:p,strk:m,out:w,rnr:ce,basesText:ao(ce),isPitchOnly:ve})}const N=Array.isArray((j=s==null?void 0:s[0])==null?void 0:j[0])?s[0][0]:[],G=Array.isArray((Q=s==null?void 0:s[0])==null?void 0:Q[1])?s[0][1]:[];let R=7;for(let D=Math.max(N.length,G.length)-1;D>=0;D--)if(N[D]!==void 0&&N[D]!==-1||G[D]!==void 0&&G[D]!==-1){R=Math.max(7,D+1);break}const B=D=>D==null||D===-1?"":D===300?"x":D>=200?`${D-200}x`:String(D);return{meta:{gid:e==null?void 0:e.gid,date:(e==null?void 0:e.date)||"",title:(e==null?void 0:e.tt)||(t==null?void 0:t.title)||"",stadium:(e==null?void 0:e.pa)||(t==null?void 0:t.stadi)||"",start:(t==null?void 0:t.start)||"",end:(t==null?void 0:t.end)||"",weather:(t==null?void 0:t.weath)||"",topTeam:l,botTeam:c,isHomeTop:u,isHomeBot:g,ti:(e==null?void 0:e.ti)||"",bi:(e==null?void 0:e.bi)||"",maxInnings:R,topInnings:Array.from({length:R},(D,q)=>B(N[q])),botInnings:Array.from({length:R},(D,q)=>B(G[q])),topSum:{r:((re=(H=s==null?void 0:s[1])==null?void 0:H[0])==null?void 0:re[0])??k[0],h:((he=(oe=s==null?void 0:s[1])==null?void 0:oe[0])==null?void 0:he[1])??0,b:((tt=(Te=s==null?void 0:s[1])==null?void 0:Te[0])==null?void 0:tt[2])??0,e:((ot=(me=s==null?void 0:s[1])==null?void 0:me[0])==null?void 0:ot[3])??0},botSum:{r:((Ft=(He=s==null?void 0:s[1])==null?void 0:He[1])==null?void 0:Ft[0])??k[1],h:((xt=(Dt=s==null?void 0:s[1])==null?void 0:Dt[1])==null?void 0:xt[1])??0,b:((gt=(vt=s==null?void 0:s[1])==null?void 0:vt[1])==null?void 0:gt[2])??0,e:((pe=(K=s==null?void 0:s[1])==null?void 0:K[1])==null?void 0:pe[3])??0}},timeline:_,pcl:E,errorEvents:I,fld:(e==null?void 0:e.fld)||[],playerMap:r}}function Xs(e,t=!1,n="all"){const{meta:a,timeline:s}=e,r=[];r.push("=================================================="),r.push(`試合戦績文字起こし: ${a.topTeam} vs ${a.botTeam}`),r.push(`日時: ${a.date||"不明"}${a.start?` (${a.start}〜${a.end||""})`:""} / 球場: ${a.stadium||"不明"} / 大会: ${a.title||"記録"}`),r.push("=================================================="),r.push("");const o=Array.from({length:a.maxInnings},(i,d)=>String(d+1));return r.push(["チーム",...o,"R","H","B","E"].join(" | ")),r.push([a.topTeam,...a.topInnings.map(i=>i||"-"),a.topSum.r,a.topSum.h,a.topSum.b,a.topSum.e].join(" | ")),r.push([a.botTeam,...a.botInnings.map(i=>i||"-"),a.botSum.r,a.botSum.h,a.botSum.b,a.botSum.e].join(" | ")),a.ti&&r.push(a.ti),a.bi&&r.push(a.bi),r.push(""),s.forEach(i=>{if(!(n!=="all"&&i.inningLabel!==n)&&!(!t&&i.isPitchOnly))if(i.type==="inning_header")r.push(`
--- ${i.text} ---`);else if(i.type==="batter")r.push(`■ ${i.text}`);else if(i.type==="inning_end"||i.type==="game_end")r.push(`  ▶ ${i.text} (${a.topTeam} ${i.scoreTop}-${i.scoreBot} ${a.botTeam})`);else{const d="●".repeat(Math.min(3,i.out))+"○".repeat(Math.max(0,3-i.out)),l=`${a.topTeam} ${i.scoreTop}-${i.scoreBot} ${a.botTeam} [アウト:${d}] ${i.basesText}`;r.push(`  ${i.text}`),r.push(`    ${l}`)}}),r.join(`
`)}function Mi(){const e=Yt.length>0?Yt:zs;if(Yt.length>0)return e;const t=new Set((pn.games||[]).map(a=>a.id)),n=new Set((pn.games||[]).map(a=>`${la(a.date)}_${(a.team_first||"").trim()}_${(a.team_second||"").trim()}`));return t.size===0&&Da.length>0?[]:e.filter(a=>{if(Da.length===0||t.has(a.gid))return!0;const s=`${la(a.date)}_${(a.tn||"").trim()}_${(a.bn||"").trim()}`;return n.has(s)})}function Ka(e=!0,t=null){const n=document.getElementById("detail-db-status-badge"),a=document.getElementById("detail-empty-notice"),s=document.getElementById("detail-scope-select"),r=document.getElementById("detail-team-overview"),o=document.getElementById("detail-analysis-dashboard"),i=document.getElementById("detail-transcript-panel");if(!s)return;const d=Mi(),l=Yt.length>0;if(n&&(n.textContent=l?`一時プレビュー表示中 (${d.length}試合)`:`DB保存詳細データ: 全${zs.length}試合（フィルタ一致: ${d.length}試合）`),d.length===0){a==null||a.classList.remove("hidden"),r==null||r.classList.add("hidden"),o==null||o.classList.add("hidden"),i==null||i.classList.add("hidden"),s.innerHTML='<option value="">表示できる詳細データがありません</option>';return}a==null||a.classList.add("hidden");const c=t||(e?s.value:"all")||"all",u=[`<option value="all">📊 フィルタ一致 全試合合算 (${d.length}試合) ※選手打撃・打球方向・エラー傾向</option>`,...d.map(y=>{const p=oa(y);return`<option value="${y.gid}">📋 ${ae(y.date||"日付不明")} | ${ae(y.tn)} ${ae(p)} ${ae(y.bn)} (${ae(y.tt||"試合")})</option>`})].join("");s.innerHTML=u,c==="all"||d.some(y=>String(y.gid)===String(c))?s.value=c:s.value="all";const g=s.value,f=(g==="all"?d:d.filter(y=>String(y.gid)===String(g))).map(y=>so(y));g!=="all"&&f.length===1?(rn=f[0],wn="all",er(),i==null||i.classList.remove("hidden")):(rn=null,i==null||i.classList.add("hidden")),ct=ro(f),r==null||r.classList.remove("hidden"),o==null||o.classList.remove("hidden"),qi(ct),oo()}function er(){const e=rn;if(!e)return;const{meta:t,timeline:n}=e;document.getElementById("detail-transcript-title").textContent=`📋 ${t.topTeam} ${t.topSum.r} - ${t.botSum.r} ${t.botTeam}`,document.getElementById("detail-transcript-meta").textContent=`${t.date||""}${t.start?` (${t.start}〜${t.end||""})`:""} | ${t.title||"記録"} | 球場: ${t.stadium||"不明"}${t.weather?` | 天候: ${t.weather}`:""}`;const a=document.getElementById("detail-scoreboard-table");if(a){const c=Array.from({length:t.maxInnings},(b,f)=>`<th class="p-1.5 border bg-gray-100 w-7">${f+1}</th>`).join(""),u=t.topInnings.map(b=>`<td class="p-1.5 border">${ae(b)}</td>`).join(""),g=t.botInnings.map(b=>`<td class="p-1.5 border">${ae(b)}</td>`).join("");a.innerHTML=`
            <thead>
                <tr>
                    <th class="p-1.5 border bg-gray-100 text-left min-w-[120px]">チーム</th>
                    ${c}
                    <th class="p-1.5 border bg-gray-200 font-black w-8">R</th>
                    <th class="p-1.5 border bg-gray-200 font-bold w-8">H</th>
                    <th class="p-1.5 border bg-gray-200 font-bold w-8">B</th>
                    <th class="p-1.5 border bg-gray-200 font-bold w-8">E</th>
                </tr>
            </thead>
            <tbody>
                <tr class="${t.isHomeTop?"bg-purple-50/60 font-bold":"bg-white"}">
                    <td class="p-1.5 border text-left ${t.isHomeTop?"text-purple-800 font-black":"text-green-800 font-bold"}">${ae(t.topTeam)}</td>
                    ${u}
                    <td class="p-1.5 border font-black bg-gray-50">${t.topSum.r}</td>
                    <td class="p-1.5 border bg-gray-50">${t.topSum.h}</td>
                    <td class="p-1.5 border bg-gray-50">${t.topSum.b}</td>
                    <td class="p-1.5 border bg-gray-50">${t.topSum.e}</td>
                </tr>
                <tr class="${t.isHomeBot?"bg-purple-50/60 font-bold":"bg-white"}">
                    <td class="p-1.5 border text-left ${t.isHomeBot?"text-purple-800 font-black":"text-green-800 font-bold"}">${ae(t.botTeam)}</td>
                    ${g}
                    <td class="p-1.5 border font-black bg-gray-50">${t.botSum.r}</td>
                    <td class="p-1.5 border bg-gray-50">${t.botSum.h}</td>
                    <td class="p-1.5 border bg-gray-50">${t.botSum.b}</td>
                    <td class="p-1.5 border bg-gray-50">${t.botSum.e}</td>
                </tr>
            </tbody>
        `}const s=document.getElementById("detail-battery-hr-info");if(s){const c=[];t.ti&&c.push(`<div>${ae(t.ti)}</div>`),t.bi&&c.push(`<div>${ae(t.bi)}</div>`),s.innerHTML=c.join(""),s.classList.toggle("hidden",c.length===0)}const r=document.getElementById("detail-transcript-half-tabs");if(r){const c=[];n.forEach(g=>{g.type==="inning_header"&&!c.includes(g.inningLabel)&&c.push(g.inningLabel)});const u=(g,b)=>{const f=wn===g;return`<button type="button" data-half-filter="${ae(g)}" class="px-2.5 py-1 rounded-full text-xs font-bold border transition-colors ${f?"bg-emerald-700 text-white border-emerald-700":"bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}">${ae(b)}</button>`};r.innerHTML=u("all","試合全体")+c.map(g=>u(g,g)).join(""),r.querySelectorAll("button[data-half-filter]").forEach(g=>{g.addEventListener("click",()=>{wn=g.dataset.halfFilter,er()})})}const o=document.getElementById("detail-transcript-timeline");if(!o)return;const i=n.filter(c=>!(wn!=="all"&&c.inningLabel!==wn||!Ja&&c.isPitchOnly)),d=c=>{const u=c&1?"#f59e0b":"#ffffff",g=c&2?"#f59e0b":"#ffffff",b=c&4?"#f59e0b":"#ffffff";return`<svg viewBox="0 0 36 24" class="w-8 h-5 inline-block align-middle ml-1" aria-label="${ae(ao(c))}">
            <polygon points="18,2 23,7 18,12 13,7" fill="${g}" stroke="#9ca3af" stroke-width="1.2"/>
            <polygon points="25,9 30,14 25,19 20,14" fill="${u}" stroke="#9ca3af" stroke-width="1.2"/>
            <polygon points="11,9 16,14 11,19 6,14" fill="${b}" stroke="#9ca3af" stroke-width="1.2"/>
        </svg>`},l=c=>{const u=Math.max(0,Math.min(3,c));return`<span class="text-[11px] font-bold tracking-tight ml-1"><span class="text-green-700">○</span>${'<span class="text-red-500">●</span>'.repeat(u)}${'<span class="text-gray-300">○</span>'.repeat(3-u)}</span>`};o.innerHTML=i.map(c=>c.type==="inning_header"?`<div class="bg-amber-50 border border-amber-200 text-amber-950 font-black px-3 py-1.5 rounded text-sm mt-2">${ae(c.text)}</div>`:c.type==="batter"?`<div class="bg-emerald-900 text-white font-bold px-3 py-1.5 rounded text-xs tracking-wide">${ae(c.text)}</div>`:c.type==="inning_end"||c.type==="game_end"?`<div class="bg-gray-200 text-gray-800 font-bold px-3 py-1 rounded text-xs flex justify-between items-center">
                <span>${ae(c.text)}</span>
                <span class="text-[11px] text-gray-600">${ae(c.topTeam)} ${c.scoreTop}-${c.scoreBot} ${ae(c.botTeam)}</span>
            </div>`:`<div class="border px-3 py-2 rounded shadow-2xs ${c.isPitchOnly?"bg-gray-50 border-gray-200 text-gray-600":"bg-white border-emerald-200 text-emerald-950"}">
            <div class="text-xs font-bold">${ae(c.text)}</div>
            <div class="text-[11px] text-gray-600 mt-1 flex flex-wrap items-center justify-between gap-1">
                <span>${ae(c.topTeam)} <strong class="text-gray-900">${c.scoreTop}-${c.scoreBot}</strong> ${ae(c.botTeam)}</span>
                <span class="flex items-center">${l(c.out)} ${d(c.rnr)} <span class="ml-1 text-[10px] text-gray-500">${ae(c.basesText)}</span></span>
            </div>
        </div>`).join("")}async function Ri(){if(!rn)return;const e=Xs(rn,Ja,wn);try{await navigator.clipboard.writeText(e),alert("試合経過のテキストをクリップボードにコピーしました。")}catch{alert("クリップボードへのコピーに失敗しました。ダウンロードボタンをご利用ください。")}}function Oi(){if(!rn)return;const{meta:e}=rn,t=Xs(rn,Ja,wn),n=(e.date||"").replace(/[^0-9]/g,"")||String(e.gid||"game");Ya("\uFEFF"+t,"text/plain;charset=utf-8;",`戦績文字起こし_${n}_${e.topTeam}_vs_${e.botTeam}.txt`)}function Fi(){const e=document.getElementById("detail-analysis-file");if(!e||!e.files||e.files.length===0)return alert("ファイルを選択してください。");const t=e.files[0],n=new FileReader;n.onload=function(a){var s;try{const r=String(a.target.result||"").replace(/^\uFEFF/,""),o=JSON.parse(r);if(Array.isArray(o.game)&&o.game.length>0){Yt=no(o).gameDetails,Ka(!1,Yt.length===1?String(Yt[0].gid):"all");return}const i=Hi(o);if(!i)return alert("詳細データのパースに失敗しました (game配列またはsysdata23が見つかりません)。");ct=i,(s=document.getElementById("detail-analysis-dashboard"))==null||s.classList.remove("hidden"),oo()}catch(r){console.error(r),alert("JSONデータのパースに失敗しました。ファイル形式を確認してください。")}},n.readAsText(t)}function ro(e){const t={innings:{},batters:{},batterDisplayNames:{},steals:{},errors:{byInning:{},byPosition:{},byPlayer:{}},counts:{}},n=r=>{const o=String(r).match(/^(\d+回)/),i=o?o[1]:r;return t.innings[i]||(t.innings[i]={ourRuns:0,oppRuns:0,outs:{strikeout:0,groundout:0,flyout:0,other:0}}),t.innings[i]},a=r=>{const o=qn(r);return o?(t.batters[o]||(t.batterDisplayNames[o]=r,t.batters[o]={pa:0,ab:0,hits:0,strikeout:0,walk:0,groundout:0,flyout:0,otherout:0,rbi:0,chances:{pa:0,hits:0,rbi:0},directions:{left:0,center:0,right:0,inner:0,other:0},counts:{}}),t.batters[o]):null},s=r=>[2,3,4,5,6,7].includes(r);return e.forEach(r=>{const{meta:o,pcl:i,errorEvents:d,fld:l,playerMap:c}=r,u=o.isHomeTop&&!o.isHomeBot||!o.isHomeTop&&o.isHomeBot;if(e.length>1){const w=(o.topTeam||"").trim(),v=(o.botTeam||"").trim();if(w==="ありんこ"||w==="アントス"||v==="ありんこ"||v==="アントス"||o.isHomeTop&&o.isHomeBot||(o.title||"").includes("紅白"))return}for(let w=0;w<o.maxInnings;w++){const v=o.topInnings[w],x=o.botInnings[w];if(!v&&!x)continue;const k=n(`${w+1}回`),$=v&&v!=="x"&&parseInt(v,10)||0,h=x&&x!=="x"&&parseInt(x,10)||0;o.isHomeTop?(k.ourRuns+=$,k.oppRuns+=h):o.isHomeBot?(k.ourRuns+=h,k.oppRuns+=$):k.ourRuns+=$+h}const g=new Set;d.forEach(w=>{if(u&&!w.isHomeFielding)return;t.errors.byInning[w.inning]=(t.errors.byInning[w.inning]||0)+1;const v=w.posName||"その他";if(t.errors.byPosition[v]=(t.errors.byPosition[v]||0)+1,w.fielderName){const x=qn(w.fielderName);g.add(`${x}`),t.errors.byPlayer[x]||(t.errors.byPlayer[x]=[]),t.errors.byPlayer[x].push({inning:`${o.date?o.date+" ":""}${w.inning}`,play:`[${v}] ${w.play}`})}}),Array.isArray(l)&&l.forEach(w=>{var h,E;const v=Array.isArray(w.st)&&parseInt(w.st[4],10)||0;if(v<=0)return;const x=((h=c.get(parseInt(w.pid,10)))==null?void 0:h.name)||((E=Mt.find(_=>_.id==w.pid))==null?void 0:E.name);if(!x)return;const k=qn(x),$=(t.errors.byPlayer[k]||[]).filter(_=>!o.date||_.inning.startsWith(o.date)).length;if($<v){const _=Bi[w.st[0]]||"守備";t.errors.byPlayer[k]||(t.errors.byPlayer[k]=[]);for(let I=$;I<v;I++)t.errors.byPlayer[k].push({inning:o.date||"試合内",play:`記録失策 (${_})`})}});let b="1回表",f=null,y=null,p=0,m=0;i.forEach(w=>{const v=w.rnr,x=!u||w.isHomeBatting;(w.codes||[]).forEach(k=>{var S;const $=k.cd||"",h=(((S=k.pli)==null?void 0:S.sPlay)||"").trim();if(!h){p=w.ball,m=w.strk;return}const E=h.match(/^(\d+回(?:表|ｳﾗ|裏))/);E&&(b=E[1]);const _=h.match(/^\d+番(.+?)(?:#\d+)?$/);if(_){x?(f=_[1].trim(),y=a(f),y&&(y.pa++,s(v)&&y.chances.pa++)):(f=null,y=null),p=0,m=0;return}const I=h.match(/^\d+番.+?に代打(.+?)(?:#\d+)?$/);if(I&&x&&(f=I[1].trim(),y=a(f)),x&&($.startsWith("Rs")||$.startsWith("Rf")||$.startsWith("Rd")||h.includes("盗塁"))){const A=h.match(/(?:ランナー|打者)([^0-9\s]+(?:\s[^0-9\s]+)?)(?:\d+塁|本塁|$)/);if(A){const P=qn(A[1]);P&&P!=="打者"&&(t.steals[P]||(t.steals[P]={attempts:0,success:0,fail:0}),t.steals[P].attempts++,h.includes("失敗")||h.includes("アウト")?t.steals[P].fail++:t.steals[P].success++)}}if(x&&y){const A=h.match(/生還/g);if(A&&!$.startsWith("Ew")&&!$.startsWith("Ep")&&!$.startsWith("Dk")&&!$.startsWith("Rs")&&(y.rbi+=A.length,s(v)&&(y.chances.rbi+=A.length)),/^(H[1-4]|Go|Gob|Fo|Fob|Fof|Fol|Ko|Bb|Db|K[wpt])/.test($)){const N=`${Math.min(3,p)}-${Math.min(2,m)}`;t.counts[N]||(t.counts[N]={pa:0,hits:0}),t.counts[N].pa++,/^H[1-4]/.test($)&&t.counts[N].hits++,y.counts[N]||(y.counts[N]={pa:0,hits:0}),y.counts[N].pa++,/^H[1-4]/.test($)&&y.counts[N].hits++}const M=n(b);/^H[1-4]/.test($)?(y.hits++,y.ab++,s(v)&&y.chances.hits++,h.includes("レフト")?y.directions.left++:h.includes("センター")?y.directions.center++:h.includes("ライト")?y.directions.right++:h.includes("内野")||/ピッチャー|キャッチャー|ファースト|セカンド|サード|ショート/.test(h)?y.directions.inner++:y.directions.other++):/^(Bb|Db)/.test($)?y.walk++:$==="Ko"||/^K[wpt]/.test($)?(y.strikeout++,y.ab++,M.outs.strikeout++):/^Gob?/.test($)?(/^Gob/.test($)&&!$.includes("Cb")||$.includes("Cb")||y.ab++,y.groundout++,M.outs.groundout++,h.includes("サード")||h.includes("ショート")?y.directions.left++:h.includes("セカンド")||h.includes("ファースト")?y.directions.right++:y.directions.inner++):/^Fo/.test($)&&(y.flyout++,y.ab++,M.outs.flyout++,h.includes("レフト")?y.directions.left++:h.includes("センター")?y.directions.center++:h.includes("ライト")?y.directions.right++:y.directions.inner++)}p=w.ball,m=w.strk})})}),t}function Hi(e){const t=e!=null&&e.sys?e.sys.find(a=>a.ke==="sysdata23"):null;if(!t||!t.va)return null;const n=ut(t.va,null);return!n||!Array.isArray(n.pcl)?null:ro([{meta:{date:"",isHomeTop:!1,isHomeBot:!1,maxInnings:0,topInnings:[],botInnings:[]},pcl:n.pcl,errorEvents:[],fld:[],playerMap:new Map}])}async function qi(e){if(!e)return;await Xn();const t=Object.keys(e.innings).sort((o,i)=>(parseInt(o,10)||99)-(parseInt(i,10)||99)),n=t.map(o=>e.innings[o].ourRuns),a=t.map(o=>e.innings[o].oppRuns);It.innings&&It.innings.destroy();const s=document.getElementById("chart-detail-innings");s&&(It.innings=new window.Chart(s.getContext("2d"),{type:"bar",data:{labels:t,datasets:[{label:"自チーム得点",data:n,backgroundColor:"rgba(16, 185, 129, 0.75)"},{label:"失点",data:a,backgroundColor:"rgba(239, 68, 68, 0.75)"}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{y:{beginAtZero:!0,ticks:{stepSize:1}}}}}));const r=document.getElementById("detail-team-errors-summary");if(r){const o=Object.entries(e.errors.byPosition).sort((d,l)=>l[1]-d[1]),i=Object.entries(e.errors.byInning);o.length===0?r.innerHTML='<div class="text-gray-400 text-center py-6">対象試合で記録されたエラーはありません</div>':r.innerHTML=`
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                    ${o.map(([d,l])=>`
                        <div class="bg-yellow-50 border border-yellow-200 rounded p-2 text-center">
                            <div class="text-[11px] font-bold text-yellow-800">${ae(d)}</div>
                            <div class="text-lg font-black text-yellow-700">${l} 件</div>
                        </div>
                    `).join("")}
                </div>
                <div class="text-[11px] text-gray-600 border-t pt-2">
                    <strong>発生イニング別:</strong> ${i.map(([d,l])=>`${ae(d)}(${l})`).join(" / ")}
                </div>
            `}}function oo(){if(!ct)return;const e=document.getElementById("detail-player-select");if(!e)return;const t=Mt.map(o=>qn(o.name)),n=Object.keys(ct.batters),a=n.filter(o=>t.length===0?!0:t.some(i=>i&&(o.includes(i)||i.includes(o)))),s=(a.length>0?a:n).sort((o,i)=>(ct.batterDisplayNames[o]||o).localeCompare(ct.batterDisplayNames[i]||i));if(s.length===0){e.innerHTML='<option value="">該当する選手がいません</option>';return}const r=e.value;e.innerHTML=s.map(o=>`<option value="${ae(o)}">${ae(ct.batterDisplayNames[o]||o)}</option>`).join(""),r&&s.includes(r)&&(e.value=r),e.onchange=function(o){kr(o.target.value)},kr(e.value||s[0])}async function kr(e){if(!ct||!e)return;await Xn();const t=qn(e),n=ct.batters[t]||ct.batters[e]||{pa:0,ab:0,hits:0,strikeout:0,walk:0,groundout:0,flyout:0,otherout:0,rbi:0,chances:{pa:0,hits:0},directions:{left:0,center:0,right:0,inner:0,other:0},counts:{}};document.getElementById("stat-p-hits").textContent=n.hits,document.getElementById("stat-p-strikeouts").textContent=n.strikeout,document.getElementById("stat-p-groundouts").textContent=n.groundout,document.getElementById("stat-p-flyouts").textContent=n.flyout,document.getElementById("stat-p-walks").textContent=n.walk||0,document.getElementById("stat-p-others").textContent=n.otherout;const a=n.ab||Math.max(0,n.pa-(n.walk||0)),s=a>0?n.hits/a:0;document.getElementById("stat-p-avg").textContent=s.toFixed(3).replace(/^0/,""),It.playerBattingResult&&It.playerBattingResult.destroy();const r=document.getElementById("chart-detail-player-batting-result").getContext("2d");It.playerBattingResult=new window.Chart(r,{type:"doughnut",data:{labels:["安打","三振","ゴロ","フライ","四死球","他"],datasets:[{data:[n.hits,n.strikeout,n.groundout,n.flyout,n.walk||0,n.otherout],backgroundColor:["#10B981","#EF4444","#FBBF24","#3B82F6","#6366F1","#9CA3AF"]}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}}}}),It.playerDirection&&It.playerDirection.destroy();const o=[n.directions.left,n.directions.center,n.directions.right,n.directions.inner,n.directions.other],i=document.getElementById("chart-detail-player-direction").getContext("2d");It.playerDirection=new window.Chart(i,{type:"doughnut",data:{labels:["レフト方向","センター方向","ライト方向","内野・投捕","その他"],datasets:[{data:o,backgroundColor:["#EC4899","#3B82F6","#14B8A6","#F59E0B","#8B5CF6"]}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",labels:{boxWidth:10,font:{size:10}}}}}});const d=n.chances.pa,l=n.chances.hits,c=d>0?l/d:0;document.getElementById("stat-p-chance-avg").textContent=c.toFixed(3).replace(/^0/,""),document.getElementById("stat-p-chance-detail").textContent=`${d}打席 ${l}安打`,document.getElementById("stat-p-rbi").textContent=n.rbi;let u=ct.steals[t]||{attempts:0,success:0};if(u.attempts===0){const x=Object.keys(ct.steals).find(k=>t.includes(k)||k.includes(t));x&&(u=ct.steals[x])}const g=u.attempts>0?u.success/u.attempts*100:0;document.getElementById("stat-p-steal-rate").textContent=g.toFixed(1)+"%",document.getElementById("stat-p-steal-detail").textContent=`成功 ${u.success} / 企図 ${u.attempts}`;const b=ct.errors.byPlayer[t]||[];document.getElementById("stat-p-errors-count").textContent=`${b.length} 件`;const f=document.getElementById("stat-p-errors-detail");f&&(b.length===0?f.innerHTML='<div class="text-gray-400 text-center py-2">対象期間・試合でエラーの記録はありません</div>':f.innerHTML=b.map(x=>`
                <div class="border-b pb-1 last:border-0 mb-1">
                    <span class="font-bold text-blue-600 bg-blue-50 px-1 rounded">${ae(x.inning)}</span>
                    <span class="text-gray-700">${ae(x.play)}</span>
                </div>
            `).join(""));const y=n.counts||{},p=["0-0","1-0","2-0","3-0","0-1","1-1","2-1","3-1","0-2","1-2","2-2","3-2"],m=p.map(x=>y[x]?y[x].pa:0),w=p.map(x=>y[x]?y[x].hits:0);It.playerCount&&It.playerCount.destroy();const v=document.getElementById("chart-detail-player-count").getContext("2d");It.playerCount=new window.Chart(v,{type:"bar",data:{labels:p.map(x=>x+" count"),datasets:[{label:"打席数",data:m,backgroundColor:"rgba(99, 102, 241, 0.6)"},{label:"安打数",data:w,backgroundColor:"rgba(16, 185, 129, 0.8)"}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{y:{beginAtZero:!0,ticks:{stepSize:1}}}}})}const Ui="https://arcdgbzqfengqyvfbodt.supabase.co",ji="sb_publishable_Ei6ti5lKjAECmi36haftpw_DQsKMp4p";let je=null;try{!window.supabaseClient&&window.supabase&&window.supabase.createClient&&(window.supabaseClient=window.supabase.createClient(Ui,ji)),je=window.supabaseClient}catch(e){console.error("Supabase Client initialize error:",e)}let Pe=[],Fe="team_default",Bt=[],Ve=[],Re=[],rt="",Sa=null;function Cn(){return Pe.find(e=>e.id===Fe)||Pe[0]||{id:"team_default",name:"ありんこアントス (A軍)"}}function Nn(){return Ve.filter(e=>(e.teamId||"team_default")===Fe)}function Vi(){if(!Sa){const e=Cn();Sa={id:"",name:"新規配置データ",teamId:Fe,mode:le,basePositions:{},customSubstitutions:[],battingOrder:{},playerSnapshots:{},headerInfo:{date:"",tournament:"",teamHome:e.name||"ありんこアントス",teamVisitor:"",manager:"",captain:"",scorer:"",stadium:"",time:""}}}return Sa}function Le(){return Re.find(e=>e.id===rt)||Vi()}let Oe=null,Ae=null,le=9;const Wt={p:"投手",c:"捕手","1b":"一塁手","2b":"二塁手","3b":"三塁手",ss:"遊撃手",lf:"左翼手",cf:"中堅手",rf:"右翼手",dh:"指名打者"},Un={p:"1",c:"2","1b":"3","2b":"4","3b":"5",ss:"6",lf:"7",cf:"8",rf:"9",dh:"DH"},Gi={1:"p",2:"c",3:"1b",4:"2b",5:"3b",6:"ss",7:"lf",8:"cf",9:"rf",10:"dh",d:"dh",dh:"dh",DH:"dh"},Rt=["p","c","1b","2b","3b","ss","lf","cf","rf"],Ot=["p","c","1b","2b","3b","ss","lf","cf","rf","dh"];async function ka(){try{if(Td(),await zi(),fn(),Za(),ea(),Re.length>0){rt=Re[0].id;const e=document.getElementById("sim-pattern-select");e&&(e.value=rt);const t=Le();t&&(le=t.mode||9,t.teamId&&Pe.some(n=>n.id===t.teamId)&&(Fe=t.teamId,fn()))}gn(),Pa("setup"),Ge(),we()}catch(e){console.error("Fatal initialization error:",e),alert(`アプリケーションの初期化中にエラーが発生しました。
詳細: `+e.message)}}function Wi(e){return e&&(e.basePositions||(e.basePositions={}),e.customSubstitutions||(e.customSubstitutions=[]),e.battingOrder||(e.battingOrder={}),e.headerInfo||(e.headerInfo={}),e.teamId||(e.teamId=e.headerInfo.teamId||"team_default"),e.mode===void 0&&(e.mode=9),e.playerSnapshots||(e.playerSnapshots=e.headerInfo.playerSnapshots||{}),e)}function Qa(e,t=!1){const n=e&&!t&&e.playerSnapshots?{...e.playerSnapshots}:{},a=new Set;return e&&(e.basePositions&&Object.values(e.basePositions).forEach(r=>r&&a.add(r)),e.battingOrder&&Object.values(e.battingOrder).forEach(r=>r&&a.add(r)),e.customSubstitutions&&e.customSubstitutions.forEach(r=>{var o,i;r.type==="sub"&&((o=r.details)!=null&&o.outPlayerId&&a.add(r.details.outPlayerId),(i=r.details)!=null&&i.inPlayerId&&a.add(r.details.inPlayerId))})),Nn().forEach(r=>a.add(r.id)),a.forEach(r=>{if(t||!n[r]){const o=Ve.find(i=>i.id===r);o&&(n[r]={id:o.id,name:o.name,number:o.number||""})}}),n}function Et(e,t=null){if(!e)return null;const n=t||Le();if(n&&n.playerSnapshots&&n.playerSnapshots[e])return n.playerSnapshots[e];const a=Ve.find(s=>s.id===e);return a||{id:e,name:"未配置選手",number:""}}async function zi(){let e=!1;if(je)try{const{data:t,error:n}=await je.from("sim_players").select("*").order("created_at",{ascending:!0}),{data:a,error:s}=await je.from("sim_patterns").select("*").order("created_at",{ascending:!1}),{data:r}=await je.from("master_data").select("data").eq("key","SIM_TEAMS").single(),{data:o}=await je.from("master_data").select("data").eq("key","SIM_TEMPLATES").single(),{data:i}=await je.from("master_data").select("data").eq("key","SIM_PLAYERS_MAP").single();if(r&&Array.isArray(r.data)&&r.data.length>0?Pe=r.data:Pe=[{id:"team_default",name:"ありんこアントス (A軍)"},{id:"team_b",name:"ありんこアントス (B軍・ジュニア)"}],Fe=Pe[0].id,o&&Array.isArray(o.data)?Bt=o.data:Bt=[],!n&&!s&&t&&a){const d=i&&typeof i.data=="object"?i.data:{};Ve=t.map(l=>({id:l.id,name:l.name,number:l.number||"",teamId:l.team_id||d[l.id]||"team_default"})),Re=a.map(l=>{var c,u;return Wi({id:l.id,name:l.name,teamId:((c=l.header_info)==null?void 0:c.teamId)||"team_default",mode:l.has_dh?10:9,basePositions:l.base_positions||{},customSubstitutions:l.custom_substitutions||[],battingOrder:l.batting_order||{},playerSnapshots:((u=l.header_info)==null?void 0:u.playerSnapshots)||{},headerInfo:l.header_info||{},created_at:l.created_at,updated_at:l.updated_at,isSynced:!0})}),Re.sort((l,c)=>{const u=new Date(l.updated_at||l.created_at||(l.id.startsWith("pat_")?parseInt(l.id.replace("pat_","")):0)).getTime()||0;return(new Date(c.updated_at||c.created_at||(c.id.startsWith("pat_")?parseInt(c.id.replace("pat_","")):0)).getTime()||0)-u}),e=!0}else n&&console.error("Supabase load players error:",n),s&&console.error("Supabase load patterns error:",s)}catch(t){console.error("Supabase load failed:",t)}e||(Pe=[{id:"team_default",name:"ありんこアントス (A軍)"},{id:"team_b",name:"ありんこアントス (B軍・ジュニア)"}],Fe=Pe[0].id,Bt=[],Ve=[{id:"p1",name:"とあ",number:"2",teamId:"team_default"},{id:"p2",name:"そうま",number:"10",teamId:"team_default"},{id:"p3",name:"あきと",number:"3",teamId:"team_default"},{id:"p4",name:"ゆうき",number:"4",teamId:"team_default"},{id:"p5",name:"あいのすけ",number:"1",teamId:"team_default"},{id:"p6",name:"けんせい",number:"6",teamId:"team_default"},{id:"p7",name:"りゅうと",number:"7",teamId:"team_default"},{id:"p8",name:"ながまさ",number:"8",teamId:"team_default"},{id:"p9",name:"そうすけ",number:"9",teamId:"team_default"},{id:"p10",name:"たいち",number:"5",teamId:"team_default"}],Re=[])}async function tr(){if(!je)return null;try{const e=await je.from("master_data").upsert({key:"SIM_TEAMS",data:Pe});return e?e.error:null}catch(e){return console.error("Supabase teams sync error:",e),e}}async function io(){if(!je)return null;try{const e=await je.from("master_data").upsert({key:"SIM_TEMPLATES",data:Bt});return e?e.error:null}catch(e){return console.error("Supabase templates sync error:",e),e}}async function Ji(){if(!je)return null;try{const e={};Ve.forEach(t=>{e[t.id]=t.teamId||"team_default"}),await je.from("master_data").upsert({key:"SIM_PLAYERS_MAP",data:e})}catch(e){console.error("Supabase players map sync error:",e)}}async function ba(e,t=!1){if(!je)return null;try{let n;return t?n=await je.from("sim_players").delete().eq("id",e.id):n=await je.from("sim_players").upsert({id:e.id,name:e.name,number:e.number}),await Ji(),n?n.error:null}catch(n){return console.error("Supabase player sync error:",n),n}}async function Na(e,t=!1){if(!je)return null;try{let n;if(t)n=await je.from("sim_patterns").delete().eq("id",e.id);else{const a=Qa(e);e.playerSnapshots=a;const s={...e.headerInfo||{},teamId:e.teamId||Fe,playerSnapshots:a};n=await je.from("sim_patterns").upsert({id:e.id,name:e.name,has_dh:e.mode===10,base_positions:e.basePositions,custom_substitutions:e.customSubstitutions,batting_order:e.battingOrder||{},header_info:s,updated_at:new Date().toISOString()})}return n?n.error:null}catch(n){return console.error("Supabase pattern sync error:",n),n}}async function et(e){e&&(await Na(e),ea())}function fn(){const e=document.getElementById("sim-team-select"),t=document.getElementById("new-sim-team"),n=document.getElementById("sim-current-team-label"),a=Cn();n&&(n.textContent=`[${a.name}]`),e&&(e.innerHTML="",Pe.forEach(s=>{const r=document.createElement("option");r.value=s.id,r.textContent=s.name,e.appendChild(r)}),e.value=Fe),t&&(t.innerHTML="",Pe.forEach(s=>{const r=document.createElement("option");r.value=s.id,r.textContent=s.name,t.appendChild(r)}),t.value=Fe)}function Za(){const e=document.getElementById("sim-template-select-inline"),t=document.getElementById("new-sim-template");e&&(e.innerHTML='<option value="">(選択して適用)</option>',Bt.forEach(n=>{const a=document.createElement("option");a.value=n.id,a.textContent=n.name,e.appendChild(a)})),t&&(t.innerHTML='<option value="">(未配置から開始)</option>',Bt.forEach(n=>{const a=document.createElement("option");a.value=n.id,a.textContent=n.name,t.appendChild(a)}))}async function Yi(e="",t=null,n=null,a=null){const s="pat_"+Date.now(),r=t||Fe,o=Pe.find(g=>g.id===r)||Cn();let i={},d={},l=a!==null?a:le;if(n){const g=Bt.find(b=>b.id===n);g&&(i=JSON.parse(JSON.stringify(g.basePositions||{})),d=JSON.parse(JSON.stringify(g.battingOrder||{})),l=g.mode||l)}le=l,Fe=r;const c={id:s,name:e||"新規データ",teamId:r,mode:le,basePositions:i,customSubstitutions:[],battingOrder:d,playerSnapshots:Qa({basePositions:i,battingOrder:d}),headerInfo:{date:"",tournament:"",teamHome:o.name||"ありんこアントス",teamVisitor:"",manager:"",captain:"",scorer:"",stadium:"",time:""}};Re.unshift(c),rt=s,await et(c),fn(),gn(),ea();const u=document.getElementById("sim-pattern-select");u&&(u.value=s)}function ea(){const e=document.getElementById("sim-pattern-select");e&&(e.innerHTML='<option value="">選択してください...</option>',Re.forEach(t=>{const n=document.createElement("option");n.value=t.id;const a=t.isSynced===!1?" (未同期)":"",s=Pe.find(o=>o.id===t.teamId),r=s?`[${s.name}] `:"";n.textContent=r+t.name+a,e.appendChild(n)}),rt&&(e.value=rt))}function gn(){const e=document.getElementById("btn-sim-mode-9"),t=document.getElementById("btn-sim-mode-10");le===9?(e.className="px-3 py-1.5 text-xs font-bold bg-amber-600 text-white transition",t.className="px-3 py-1.5 text-xs font-bold bg-white text-gray-700 border-l hover:bg-gray-50 transition"):(e.className="px-3 py-1.5 text-xs font-bold bg-white text-gray-700 transition",t.className="px-3 py-1.5 text-xs font-bold bg-amber-600 text-white border-l hover:bg-gray-50 transition")}function ya(e){const t={...e.basePositions||{}},n=le===9?Rt:Ot;return Object.keys(t).forEach(s=>{n.includes(s)||delete t[s]}),(e.customSubstitutions||[]).filter(s=>s.active).forEach(s=>{if(s.type==="swap"){const{pos1:r,pos2:o}=s.details;if(n.includes(r)&&n.includes(o)){const i=t[r];t[r]=t[o],t[o]=i}}else if(s.type==="sub"){const{outPlayerId:r,inPlayerId:o,pos:i}=s.details;if(r){const d=Object.keys(t).find(l=>t[l]===r);d&&(t[d]=o)}else i&&n.includes(i)&&(t[i]=o)}else if(s.type==="rotation"){const o=s.details.positions.filter(i=>n.includes(i));if(o.length>1){const i=o.map(d=>t[d]);for(let d=0;d<o.length;d++){const l=i[(d-1+o.length)%o.length];t[o[d]]=l}}}}),t}function ha(e){const t=new Set;return(e.customSubstitutions||[]).filter(a=>a.active).forEach(a=>{a.type==="sub"&&a.details.outPlayerId&&t.add(a.details.outPlayerId)}),t}function zn(e){e.battingOrder||(e.battingOrder={});const t=le===9?Rt:Ot,n=e.basePositions||{},a=new Set;t.forEach(i=>{n[i]&&a.add(n[i])}),Object.keys(e.battingOrder).forEach(i=>{const d=e.battingOrder[i];a.has(d)||delete e.battingOrder[i]});const s=new Set(Object.values(e.battingOrder)),r=[];a.forEach(i=>{s.has(i)||r.push(i)});const o=t.length;for(let i=1;i<=o&&r.length!==0;i++)if(!e.battingOrder[i]){const d=r.shift();e.battingOrder[i]=d}}function we(){const e=Le();if(!e)return;const t=ya(e),n=ha(e),a=new Set(Object.values(t).filter(Boolean));zn(e),Ki(a,n),Qi(a,n),Zi(t,e),Xi(e),ed(e),td(e)}function Ki(e,t){const n=document.getElementById("sim-players-list"),a=document.getElementById("sim-player-count");if(!n)return;n.innerHTML="";const s=Nn();if(a&&(a.textContent=`${s.length} 人`),s.length===0){n.innerHTML='<span class="text-xs text-gray-400 p-2">このチームに登録されている選手がいません。</span>';return}s.forEach(r=>{const o=e.has(r.id),i=t.has(r.id),d=Oe===r.id&&Ae==="players-list",l=document.createElement("div");l.className=`sim-player-badge ${o?"assigned":""} ${i?"retired":""} ${d?"selected":""}`,l.setAttribute("data-player-id",r.id),!o&&!i&&(l.setAttribute("draggable","true"),l.addEventListener("dragstart",lo));const c=r.number?`#${r.number} `:"";l.innerHTML=`
            <span>${c}${Be(r.name)}${i?" (交代済)":""}</span>
            <span class="sim-player-edit-btn" data-player-id="${r.id}" title="選手名・背番号を編集">✏️</span>
            <span class="sim-player-delete-btn" data-player-id="${r.id}" title="削除">×</span>
        `,l.addEventListener("click",u=>{if(u.target.classList.contains("sim-player-edit-btn")){u.stopPropagation(),xd(r.id);return}if(u.target.classList.contains("sim-player-delete-btn")){u.stopPropagation(),wd(r.id);return}o||i||uo(r.id,"players-list")}),n.appendChild(l)})}function Qi(e,t){const n=document.getElementById("sim-bench-list");if(!n)return;n.innerHTML="";const s=Nn().filter(r=>!e.has(r.id)&&!t.has(r.id));if(s.length===0){n.innerHTML='<span class="text-xs text-gray-400 p-1">控え選手はいません。</span>';return}s.forEach(r=>{const o=Oe===r.id&&Ae==="bench",i=document.createElement("div");i.className=`sim-player-badge sim-bench-badge ${o?"selected":""}`,i.setAttribute("data-player-id",r.id),i.setAttribute("draggable","true");const d=r.number?`#${r.number} `:"";i.innerHTML=`<span>${d}${Be(r.name)}</span>`,i.addEventListener("dragstart",lo),i.addEventListener("click",()=>{uo(r.id,"bench")}),n.appendChild(i)})}function Zi(e,t){const n=document.getElementById("sim-field-positions");if(!n)return;n.innerHTML="",(le===9?Rt:Ot).forEach(s=>{const r=e[s],o=Et(r,t),i=(t.basePositions||{})[s]!==r&&r,d=Oe&&Ae===s,l=document.createElement("div");l.className=`sim-pos-slot pos-${s} ${d?"swap-selected":""}`,l.setAttribute("data-position",s),l.addEventListener("dragover",rd),l.addEventListener("dragleave",od),l.addEventListener("drop",id),l.addEventListener("click",()=>{dd(s)});const c=o&&o.number?`#${o.number} `:"";l.innerHTML=`
            <div class="sim-pos-title">${Wt[s]}</div>
            <div class="sim-pos-player ${i?"player-changed":""}">
                ${o?c+Be(o.name):'<span class="text-gray-300 text-xs font-normal">未配置</span>'}
            </div>
        `,n.appendChild(l)})}function Xi(e){const t=document.getElementById("sim-batting-order-list");if(!t)return;t.innerHTML="";const n=le===9?Rt:Ot,a=n.length,s=e.basePositions||{},r={};n.forEach(o=>{const i=s[o];i&&(r[i]=o)});for(let o=1;o<=a;o++){const i=e.battingOrder[o],d=i?Et(i,e):null,l=d?r[d.id]:null,c=l?Wt[l]:"未配置",u=document.createElement("div");d?u.className="flex items-center justify-between bg-amber-50/50 border border-amber-100 rounded-lg p-2 text-xs transition-colors duration-150":u.className="flex items-center justify-between bg-gray-50/50 border border-dashed border-gray-200 rounded-lg p-2 text-xs text-gray-400 transition-colors duration-150";const g=document.createElement("div");g.className="flex items-center gap-1 shrink-0";const b=document.createElement("button");b.className="px-2 py-1 bg-amber-100 hover:bg-amber-200 disabled:opacity-30 disabled:cursor-not-allowed text-amber-900 font-bold rounded text-[10px] leading-none transition shadow-sm",b.textContent="▲",o===1&&(b.disabled=!0),b.addEventListener("click",()=>Lr(o,"up"));const f=document.createElement("button");f.className="px-2 py-1 bg-amber-100 hover:bg-amber-200 disabled:opacity-30 disabled:cursor-not-allowed text-amber-900 font-bold rounded text-[10px] leading-none transition shadow-sm",f.textContent="▼",o===a&&(f.disabled=!0),f.addEventListener("click",()=>Lr(o,"down")),g.appendChild(b),g.appendChild(f);let y="";if(d){const p=d.number?`#${d.number} `:"";y=`
                <div class="flex items-center gap-2">
                    <span class="bg-amber-600 text-white font-bold rounded-full w-5 h-5 flex items-center justify-center text-[10px]">${o}</span>
                    <span class="font-bold text-gray-800">${p}${Be(d.name)}</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">${c}</span>
                </div>
            `}else y=`
                <div class="flex items-center gap-2">
                    <span class="bg-gray-400 text-white font-bold rounded-full w-5 h-5 flex items-center justify-center text-[10px]">${o}</span>
                    <span class="italic text-gray-400">（未設定）</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-[10px] bg-gray-100 text-gray-400 font-bold px-1.5 py-0.5 rounded">${c}</span>
                </div>
            `;u.innerHTML=y,u.appendChild(g),t.appendChild(u)}}async function Lr(e,t){const n=Le();if(!n)return;n.battingOrder||(n.battingOrder={});const a=t==="up"?e-1:e+1,r=(le===9?Rt:Ot).length;if(a<1||a>r)return;const o=n.battingOrder[e],i=n.battingOrder[a];o&&i?(n.battingOrder[e]=i,n.battingOrder[a]=o):o?(n.battingOrder[a]=o,delete n.battingOrder[e]):i&&(n.battingOrder[e]=i,delete n.battingOrder[a]),await et(n),we()}function nr(e,t,n,a=null){if(!e)return{code:"",desc:"",fullDesc:""};const s=a||Le();if(e.type==="sub"){const{outPlayerId:r,inPlayerId:o}=e.details,i=Et(r,s),d=Et(o,s),l=i?i.name:"不明",c=d?d.name:"不明",u=Object.keys(t).find(m=>t[m]===r),g=u&&Un[u]||"",b=u?Wt[u]||"":"選手",f=g?`交代 (${g})`:"交代",y=n?`<span class="font-bold text-amber-900">${Be(l)}</span>に代わって<span class="font-bold text-amber-900">${Be(c)}</span>`:`${l}に代わって${c}`,p=`${b}の${l}に代わりまして、${c}が入ります。`;return{code:f,desc:y,fullDesc:p}}else if(e.type==="rotation"){const r=e.details.positions||[],i=r.map(u=>Un[u]||u).join("-"),d=[];for(let u=0;u<r.length-1;u++){const g=r[u],b=r[u+1],f=t[g],y=Et(f,s);if(y){const p=n?`<span class="font-bold text-amber-900">${Be(y.name)}</span>`:y.name;d.push(`${p}が${Wt[b]}`)}}const l=d.join("、"),c=l?`${l}へ。`:"ポジション交代";return{code:i,desc:l,fullDesc:c}}else if(e.type==="swap"){const{pos1:r,pos2:o}=e.details,i=t[r],d=t[o],l=Et(i,s),c=Et(d,s),u=Un[r]||r,g=Un[o]||o,b=Wt[r]||"",f=Wt[o]||"",y=l?l.name:"未配置",p=c?c.name:"未配置",m=`${u}⇔${g}`,w=n?`<span class="font-bold text-amber-900">${Be(y)}</span>と<span class="font-bold text-amber-900">${Be(p)}</span>の入れ替え`:`${y}と${p}の入れ替え`,v=`${b}の${y}と${f}の${p}が入れ替わります。`;return{code:m,desc:w,fullDesc:v}}return{code:"",desc:"",fullDesc:""}}function ed(e){const t=document.getElementById("sim-sub-rules-list");if(!t)return;t.innerHTML="";const n=e.customSubstitutions||[];if(n.length===0){t.innerHTML='<p class="text-xs text-gray-400 text-center py-4">登録された交代はありません。</p>';return}const a=le===9?Rt:Ot;let s={...e.basePositions||{}};n.forEach(r=>{const o=nr(r,s,!0);if(r.active){if(r.type==="swap"){const{pos1:l,pos2:c}=r.details;if(a.includes(l)&&a.includes(c)){const u=s[l];s[l]=s[c],s[c]=u}}else if(r.type==="sub"){const{outPlayerId:l,inPlayerId:c,pos:u}=r.details;if(l){const g=Object.keys(s).find(b=>s[b]===l);g&&(s[g]=c)}else u&&a.includes(u)&&(s[u]=c)}else if(r.type==="rotation"){const c=r.details.positions.filter(u=>a.includes(u));if(c.length>1){const u=c.map(g=>s[g]);for(let g=0;g<c.length;g++){const b=u[(g-1+c.length)%c.length];s[c[g]]=b}}}}const i=document.createElement("div");i.className=`sub-rule-card ${r.active?"active":""}`;const d=r.name?`<span class="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded leading-none inline-block mb-1 border border-amber-200/50">${Be(r.name)}</span>`:"";i.innerHTML=`
            <div class="flex items-center gap-2">
                <label class="sim-switch">
                    <input type="checkbox" ${r.active?"checked":""} data-rule-id="${r.id}">
                    <span class="sim-slider"></span>
                </label>
                <div class="flex flex-col">
                    ${d}
                    <span class="text-xs font-bold text-gray-800">${o.code}</span>
                    <span class="text-[11px] text-gray-600 leading-tight">${o.desc}</span>
                </div>
            </div>
            <button class="text-gray-400 hover:text-red-500 font-bold text-sm px-2 py-1 transition btn-delete-rule" data-rule-id="${r.id}">×</button>
        `,i.querySelector('input[type="checkbox"]').addEventListener("change",l=>{nd(r.id,l.target.checked)}),i.querySelector(".btn-delete-rule").addEventListener("click",()=>{sd(r.id)}),t.appendChild(i)})}function td(e){const t=document.getElementById("sim-announcement-logs");if(!t)return;t.innerHTML="";const n=(e.customSubstitutions||[]).filter(r=>r.active);if(n.length===0){t.innerHTML='<p class="text-xs text-gray-400 text-center py-2">適用中の交代はありません（基本配置のままです）。</p>';return}const a=le===9?Rt:Ot;let s={...e.basePositions||{}};n.forEach(r=>{const o=nr(r,s,!1);if(r.type==="swap"){const{pos1:l,pos2:c}=r.details;if(a.includes(l)&&a.includes(c)){const u=s[l];s[l]=s[c],s[c]=u}}else if(r.type==="sub"){const{outPlayerId:l,inPlayerId:c,pos:u}=r.details;if(l){const g=Object.keys(s).find(b=>s[b]===l);g&&(s[g]=c)}else u&&a.includes(u)&&(s[u]=c)}else if(r.type==="rotation"){const c=r.details.positions.filter(u=>a.includes(u));if(c.length>1){const u=c.map(g=>s[g]);for(let g=0;g<c.length;g++){const b=u[(g-1+c.length)%c.length];s[c[g]]=b}}}const i=r.name?`【${Be(r.name)}】`:"",d=document.createElement("div");d.className="announcement-item",d.innerHTML=`
            <span class="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0">${o.code}</span>
            <span class="text-xs font-semibold truncate text-amber-900">${i}${o.fullDesc}</span>
        `,t.appendChild(d)})}function Ge(){const e=Le();if(!e)return;const t=le===9?Rt:Ot,n=document.getElementById("sub-player-out"),a=document.getElementById("sub-player-in"),s=ya(e),r=new Set(Object.values(s).filter(Boolean)),o=ha(e);if(n&&(n.innerHTML="",t.forEach(d=>{var c;const l=s[d];if(l){const u=((c=Et(l,e))==null?void 0:c.name)||"未配置",g=document.createElement("option");g.value=l,g.textContent=`${u} (${Wt[d]})`,n.appendChild(g)}})),a){a.innerHTML="";const l=Nn().filter(c=>!r.has(c.id)&&!o.has(c.id));l.length===0?a.innerHTML='<option value="">控え選手なし</option>':l.forEach(c=>{const u=document.createElement("option");u.value=c.id,u.textContent=c.name,a.appendChild(u)})}const i=document.getElementById("rot-input-text");i&&(i.value="")}async function nd(e,t){const n=Le();if(!n)return;const a=n.customSubstitutions.find(s=>s.id===e);a&&(a.active=t,await et(n),Ge(),we())}async function ad(){const e=Le();if(!e)return;const t=document.getElementById("rule-type-select"),n=t?t.value:"rotation";let a={};if(n==="sub"){const d=document.getElementById("sub-player-out").value,l=document.getElementById("sub-player-in").value;if(!d){alert("退く選手を選択してください。");return}if(!l){alert("入る控え選手を選択してください。");return}a={outPlayerId:d,inPlayerId:l}}else if(n==="rotation"){const d=document.getElementById("rot-input-text"),l=d?d.value.trim():"";if(!l){alert("交代ルートを入力してください（例: 1-3-1）。");return}if(!/^[0-9a-zA-Z]+(-[0-9a-zA-Z]+)*$/.test(l)){alert("入力形式が正しくありません。半角数字・英字とハイフンで入力してください（例: 1-3-1）。");return}const c=l.split("-").filter(Boolean);if(c.length<2){alert("交代には最低2つのポジションが必要です（例: 1-3）。");return}const u=le===9?Rt:Ot,g=[];for(const b of c){const f=Gi[b];if(!f){alert(`無効なポジション番号「${b}」が含まれています。1〜9またはDHを指定してください。`);return}if(!u.includes(f)){alert(`ポジション「${b}」(${Wt[f]||f})は、現在の守備モード（DH${le===10?"あり":"なし"}）では使用できません。`);return}g.push(f)}for(let b=0;b<g.length-1;b++)if(g[b]===g[b+1]){alert("隣り合うポジションに同じものを指定することはできません（例: 1-1-3 は不可）。");return}a={positions:g}}const s=document.getElementById("rule-name-input"),r=s?s.value.trim():"",o={id:"rule_"+Date.now(),name:r,type:n,active:!1,details:a};e.customSubstitutions||(e.customSubstitutions=[]),e.customSubstitutions.push(o),await et(e),s&&(s.value="");const i=document.getElementById("rot-input-text");i&&(i.value=""),Ge(),we(),Pa("subrules")}async function sd(e){const t=Le();t&&(t.customSubstitutions=t.customSubstitutions.filter(n=>n.id!==e),await et(t),Ge(),we())}function Pa(e){const t=document.getElementById("tab-btn-setup"),n=document.getElementById("tab-btn-subrules"),a=document.getElementById("panel-setup"),s=document.getElementById("panel-subrules");e==="setup"?(t.className="flex-1 py-2 px-3 text-center text-sm font-bold bg-amber-600 text-white transition",n.className="flex-1 py-2 px-3 text-center text-sm font-bold bg-white text-gray-700 border-l hover:bg-gray-50 transition",a.classList.remove("hidden"),s.classList.add("hidden")):(t.className="flex-1 py-2 px-3 text-center text-sm font-bold bg-white text-gray-700 transition",n.className="flex-1 py-2 px-3 text-center text-sm font-bold bg-amber-600 text-white border-l hover:bg-gray-50 transition font-bold",a.classList.add("hidden"),s.classList.remove("hidden"))}function lo(e){const t=e.currentTarget.getAttribute("data-player-id");e.dataTransfer.setData("text/plain",t);let n="bench";e.currentTarget.parentNode.id==="sim-players-list"&&(n="players-list"),e.dataTransfer.setData("source-pos",n)}function rd(e){e.preventDefault(),e.currentTarget.classList.add("drag-over")}function od(e){e.currentTarget.classList.remove("drag-over")}function id(e){e.preventDefault(),e.currentTarget.classList.remove("drag-over");const t=e.dataTransfer.getData("text/plain"),n=e.currentTarget.getAttribute("data-position");!t||!n||co(t,n)}async function co(e,t){const n=Le();if(!n)return;n.basePositions||(n.basePositions={});let a=null;Object.keys(n.basePositions).forEach(r=>{n.basePositions[r]===e&&(a=r)});const s=n.basePositions[t];a&&(n.basePositions[a]=s),n.basePositions[t]=e,zn(n),await et(n),Oe=null,Ae=null,Ge(),we()}function uo(e,t){Oe===e&&Ae===t?(Oe=null,Ae=null):(Oe=e,Ae=t),we()}async function dd(e){const t=Le();if(!t)return;t.basePositions||(t.basePositions={});const n=t.basePositions[e];if(Oe)if(Ae!=="players-list"&&Ae!=="bench"){const a=t.basePositions[Ae];t.basePositions[Ae]=n,t.basePositions[e]=a,zn(t),await et(t),Oe=null,Ae=null,Ge(),we()}else co(Oe,e);else n&&(Oe=n,Ae=e,we())}async function ld(e){const t=Le();t&&(t.basePositions||(t.basePositions={}),t.basePositions[e]=null,zn(t),await et(t),Oe=null,Ae=null,Ge(),we())}async function cd(){const e=prompt(`新しいチーム名を入力してください:
(例: ありんこアントス (B軍), ジュニア選抜など)`);if(!e||!e.trim())return;const t=e.trim();if(Pe.some(a=>a.name===t)){alert("同じ名前のチームが既に存在します。");return}const n={id:"team_"+Date.now(),name:t};Pe.push(n),Fe=n.id,await tr(),fn(),we()}async function ud(){const e=Cn(),t=prompt("チーム名を変更してください:",e.name);if(!t||!t.trim())return;const n=t.trim();if(n!==e.name){if(Pe.some(a=>a.id!==e.id&&a.name===n)){alert("同じ名前のチームが既に存在します。");return}e.name=n,await tr(),fn(),ea(),we()}}async function md(){if(Pe.length<=1){alert("登録チームが1つのみのため、削除できません。");return}const e=Cn(),t=Nn();let n=`チーム「${e.name}」を削除しますか？`;if(t.length>0&&(n+=`
※このチームに登録されている ${t.length} 名の選手データも削除されます。`),!confirm(n))return;const a=new Set(t.map(s=>s.id));Ve=Ve.filter(s=>!a.has(s.id));for(const s of t)await ba(s,!0);Pe=Pe.filter(s=>s.id!==e.id),Fe=Pe[0].id,await tr(),fn(),we()}function pd(e){Fe=e.target.value;const t=document.getElementById("sim-current-team-label"),n=Cn();t&&(t.textContent=`[${n.name}]`),Oe=null,Ae=null,Ge(),we()}async function fd(){const e=Le();if(!e)return;const t=e.name?`${e.name}の基本形`:"基本配置パターン",n=prompt(`初期パターン（テンプレート）の登録名を入力してください:
(例: A軍 守備基本形、10人制DH基本配置など)`,t);if(!n||!n.trim())return;const a=n.trim(),s={id:"tmpl_"+Date.now(),name:a,mode:le,basePositions:JSON.parse(JSON.stringify(e.basePositions||{})),battingOrder:JSON.parse(JSON.stringify(e.battingOrder||{}))};Bt.push(s),await io(),Za(),alert(`初期パターン「${a}」を登録しました。
新規作成時や初期パターンセレクタからいつでも適用できます。`)}async function gd(e){if(!e)return;const t=Bt.find(s=>s.id===e);if(!t)return;if(!confirm(`初期パターン「${t.name}」を現在のグラウンドに適用しますか？
（現在のスタメン配置・打順が上書きされます）`)){const s=document.getElementById("sim-template-select-inline");s&&(s.value="");return}const n=Le();n&&(n.basePositions=JSON.parse(JSON.stringify(t.basePositions||{})),n.battingOrder=JSON.parse(JSON.stringify(t.battingOrder||{})),t.mode&&(n.mode=t.mode,le=t.mode,gn()),await et(n));const a=document.getElementById("sim-template-select-inline");a&&(a.value=""),Ge(),we()}async function bd(){const e=document.getElementById("sim-template-select-inline"),t=e?e.value:"";if(!t){alert("削除したい初期パターンを選択してください。");return}const n=Bt.find(a=>a.id===t);n&&confirm(`初期パターン「${n.name}」を削除しますか？`)&&(Bt=Bt.filter(a=>a.id!==t),await io(),Za(),alert(`初期パターン「${n.name}」を削除しました。`))}function yd(){const e=document.getElementById("sim-new-modal");if(!e)return;fn(),Za();const t=document.getElementById("new-sim-name");if(t){const r=new Date,o=`${r.getFullYear()}/${String(r.getMonth()+1).padStart(2,"0")}/${String(r.getDate()).padStart(2,"0")}`;t.value=`${o} 練習試合`}const n=document.getElementById("new-sim-team");n&&(n.value=Fe);const a=document.getElementById("new-sim-template");a&&(a.value="");const s=document.querySelector(`input[name="new-sim-dh-mode"][value="${le}"]`);s&&(s.checked=!0),e.classList.remove("hidden")}function Bs(){const e=document.getElementById("sim-new-modal");e&&e.classList.add("hidden")}async function hd(){const e=document.getElementById("new-sim-name"),t=document.getElementById("new-sim-team"),n=document.getElementById("new-sim-template"),a=document.querySelector('input[name="new-sim-dh-mode"]:checked'),s=e?e.value.trim():"",r=t?t.value:Fe,o=n?n.value:null,i=a?parseInt(a.value,10):9;if(!s){alert("シミュレーションデータ名を入力してください。");return}await Yi(s,r,o,i),Bs(),Ge(),we()}async function ps(){const e=document.getElementById("sim-new-player-input"),t=document.getElementById("sim-new-player-number");if(!e)return;const n=e.value.trim(),a=t?t.value.trim():"";if(!n)return;if(Nn().some(o=>o.name===n)){alert("このチームには同じフルネームの選手が既に登録されています。");return}const r={id:"p_"+Date.now()+"_"+Math.random().toString(36).substr(2,5),name:n,number:a,teamId:Fe};Ve.push(r),await ba(r),e.value="",t&&(t.value=""),Ge(),we()}function xd(e){const t=Ve.find(o=>o.id===e);if(!t)return;const n=document.getElementById("sim-edit-player-modal"),a=document.getElementById("edit-player-id"),s=document.getElementById("edit-player-name"),r=document.getElementById("edit-player-number");a&&(a.value=t.id),s&&(s.value=t.name),r&&(r.value=t.number||""),n&&n.classList.remove("hidden"),s&&(s.focus(),s.select())}function As(){const e=document.getElementById("sim-edit-player-modal");e&&e.classList.add("hidden")}async function fs(){const e=document.getElementById("edit-player-id"),t=document.getElementById("edit-player-name"),n=document.getElementById("edit-player-number"),a=e?e.value:"",s=t?t.value.trim():"",r=n?n.value.trim():"";if(!a)return;if(!s){alert("選手フルネームを入力してください。");return}const o=Ve.find(d=>d.id===a);if(!o)return;if(Nn().some(d=>d.id!==a&&d.name===s)){alert("このチームには同じフルネームの別の選手が既に登録されています。");return}o.name=s,o.number=r,await ba(o),As(),Ge(),we()}async function vd(){const e=Le();if(!e){alert("配置データが選択されていません。");return}e.playerSnapshots=Qa(e,!0),e.headerInfo||(e.headerInfo={}),e.headerInfo.playerSnapshots=e.playerSnapshots,await et(e),Ge(),we(),alert(`配置データ「${e.name||"現在のデータ"}」の選手情報（氏名・背番号）をマスターの最新データで上書き更新しました。`)}async function wd(e){const t=Ve.find(n=>n.id===e);if(t&&confirm(`選手「${t.name}」を削除しますか？
（データベースの全データ配置・交代設定からも削除されます）`)){Ve=Ve.filter(n=>n.id!==e),await ba(t,!0);for(const n of Re){let a=!1;if(n.basePositions||(n.basePositions={}),Object.keys(n.basePositions).forEach(s=>{n.basePositions[s]===e&&(n.basePositions[s]=null,a=!0)}),n.battingOrder&&Object.keys(n.battingOrder).forEach(s=>{n.battingOrder[s]===e&&(delete n.battingOrder[s],a=!0)}),n.customSubstitutions){const s=n.customSubstitutions.length;n.customSubstitutions=n.customSubstitutions.filter(r=>r.type==="sub"?r.details.outPlayerId!==e&&r.details.inPlayerId!==e:!0),n.customSubstitutions.length!==s&&(a=!0)}a&&await et(n)}Oe===e&&(Oe=null,Ae=null),Ge(),we()}}async function Ed(){const e=document.getElementById("sim-pattern-select");if(!e)return;const t=e.value;let n=!1,a=null,s="";const r=Le();if(t){const o=e.options[e.selectedIndex];confirm(`現在「${o.text}」が選択されています。
このデータに上書き保存しますか？
（「キャンセル」を選ぶと新規保存になります）`)&&(n=!0,s=o.text,a=t)}if(!n){const o=r?r.name:"新規配置データ",i=prompt("保存名を入力してください：",o);if(!i)return;if(s=i.trim(),!s){alert("有効な保存名を入力してください。");return}}try{if(n&&a){if(r){r.name=s,r.teamId=Fe,r.mode=le,r.updated_at=new Date().toISOString();const i=await Na(r);if(i)throw i;const d=Re.findIndex(l=>l.id===r.id);d>0&&(Re.splice(d,1),Re.unshift(r)),alert(`データ「${s}」を上書き保存しました。`)}}else{const i="pat_"+Date.now(),d=Cn(),l=new Date().toISOString(),c={id:i,name:s,teamId:Fe,mode:le,created_at:l,updated_at:l,basePositions:r?{...r.basePositions||{}}:{},customSubstitutions:r?JSON.parse(JSON.stringify(r.customSubstitutions||[])):[],battingOrder:r?{...r.battingOrder||{}}:{},playerSnapshots:r&&r.playerSnapshots?{...r.playerSnapshots}:Qa(r),headerInfo:r?JSON.parse(JSON.stringify(r.headerInfo||{})):{date:"",tournament:"",teamHome:d.name||"ありんこアントス",teamVisitor:"",manager:"",captain:"",scorer:"",stadium:"",time:""}};Re.unshift(c),rt=i;const u=await Na(c);if(u)throw u;alert(`データ「${s}」を保存しました。`)}ea();const o=document.getElementById("sim-pattern-select");o&&(o.value=rt),we()}catch(o){console.error("Save pattern error:",o),alert(`保存に失敗しました。
エラー詳細: ${o.message||o}`)}}async function _d(){const e=Le();if(!e||!e.id){alert("削除する配置データが選択されていません。");return}if(!confirm(`配置データ「${e.name}」を削除しますか？
（データベースから削除されます）`))return;Re=Re.filter(n=>n.id!==rt);const t=await Na(e,!0);Re.length>0?rt=Re[0].id:rt="",ea(),alert(t?`データ「${e.name}」のデータベースからの削除に失敗しました。
エラー詳細: ${t.message||t}`:`データ「${e.name}」を削除しました。`),Oe=null,Ae=null,gn(),Ge(),we()}async function Id(e){const t=e.target.value;if(!t)rt="",Sa=null,Oe=null,Ae=null,we();else{rt=t;const n=Le();n&&(le=n.mode||9,n.teamId&&Pe.some(a=>a.id===n.teamId)&&(Fe=n.teamId,fn())),Oe=null,Ae=null,gn(),Ge(),we()}}function $d(){const e=Le();if(!e)return;const t=ya(e),n=ha(e),a=e.headerInfo||{};document.getElementById("member-input-date").value=a.date||"",document.getElementById("member-input-tournament").value=a.tournament||"",document.getElementById("member-input-team-home").value=a.teamHome||"ありんこアントス",document.getElementById("member-input-team-visitor").value=a.teamVisitor||"",document.getElementById("member-input-manager").value=a.manager||"",document.getElementById("member-input-captain").value=a.captain||"",document.getElementById("member-input-scorer").value=a.scorer||"",document.getElementById("member-input-stadium").value=a.stadium||"",document.getElementById("member-input-time").value=a.time||"",mo(e,t,n);const s=document.getElementById("sim-member-modal");s&&s.classList.remove("hidden")}function Sd(){const e=Le();if(!e)return;e.headerInfo||(e.headerInfo={}),e.headerInfo.date=document.getElementById("member-input-date").value.trim(),e.headerInfo.tournament=document.getElementById("member-input-tournament").value.trim(),e.headerInfo.teamHome=document.getElementById("member-input-team-home").value.trim(),e.headerInfo.teamVisitor=document.getElementById("member-input-team-visitor").value.trim(),e.headerInfo.manager=document.getElementById("member-input-manager").value.trim(),e.headerInfo.captain=document.getElementById("member-input-captain").value.trim(),e.headerInfo.scorer=document.getElementById("member-input-scorer").value.trim(),e.headerInfo.stadium=document.getElementById("member-input-stadium").value.trim(),e.headerInfo.time=document.getElementById("member-input-time").value.trim(),et(e);const t=ya(e),n=ha(e);mo(e,t,n)}function mo(e,t,n){const a=le===9?Rt:Ot,s=e.headerInfo||{};let r=`【 メンバー表 (Ants) 】
`;r+=`日時: ${s.date||"未設定"}  時間: ${s.time||"未設定"}
`,r+=`大会: ${s.tournament||"未設定"}  球場: ${s.stadium||"未設定"}
`,r+=`対戦: ${s.teamHome||"未設定"} vs ${s.teamVisitor||"未設定"}
`,r+=`監督: ${s.manager||"未設定"}  主将: ${s.captain||"未設定"}  スコアラー: ${s.scorer||"未設定"}
`,r+=`------------------------------------

`,r+=`◆ スターティングメンバー (打順順)
`;const o=a.length,i=e.basePositions||{},d={};a.forEach(b=>{const f=i[b];f&&(d[f]=b)});for(let b=1;b<=o;b++){const f=e.battingOrder[b];if(f){const y=Et(f,e),p=d[f];if(y&&p){const m=Un[p],w=y.number?` [#${y.number}]`:"";r+=`${b}. [${m}] ${Wt[p]} : ${y.name}${w}
`}}}r+=`
◆ 控え選手 (ベンチ)
`;const l=new Set(Object.values(t).filter(Boolean)),c=Ve.filter(b=>!l.has(b.id)&&!n.has(b.id));c.length===0?r+=`(なし)
`:c.forEach(b=>{const f=Et(b.id,e),y=f.number?` [#${f.number}]`:"";r+=`・${f.name}${y}
`}),r+=`
◆ 交代履歴
`;const u=(e.customSubstitutions||[]).filter(b=>b.active);if(u.length===0)r+=`(なし: 基本配置のままです)
`;else{let b={...e.basePositions||{}};u.forEach((f,y)=>{const p=nr(f,b,!1,e);if(r+=`${y+1}. [${p.code}] ${p.fullDesc}
`,f.type==="swap"){const{pos1:m,pos2:w}=f.details,v=b[m];b[m]=b[w],b[w]=v}else if(f.type==="sub"){const{outPlayerId:m,inPlayerId:w}=f.details,v=Object.keys(b).find(x=>b[x]===m);v&&(b[v]=w)}else if(f.type==="rotation"){const m=f.details.positions,w=m.map(v=>b[v]);for(let v=0;v<m.length;v++){const x=w[(v-1+m.length)%m.length];b[m[v]]=x}}})}const g=document.getElementById("sim-member-text");g&&(g.value=r)}function kd(){const e=document.getElementById("sim-member-text");e&&(e.select(),document.execCommand("copy"),alert("メンバー表をクリップボードにコピーしました！"))}function Br(){const e=document.getElementById("sim-member-modal");e&&e.classList.add("hidden")}function Ld(){const e=Le();if(!e)return;const t=ya(e),n=ha(e),a=le===9?Rt:Ot,s=e.headerInfo||{},r=e.basePositions||{},o={};a.forEach(f=>{const y=r[f];y&&(o[y]=f)});const i=a.length,d=[];for(let f=1;f<=i;f++){const y=e.battingOrder[f];if(y){const p=Et(y,e),m=o[y];p&&m&&d.push({order:f,posNum:Un[m],name:p.name,number:p.number||""})}}for(;d.length<9;)d.push({order:d.length+1,posNum:"",name:"",number:""});const l=new Set(Object.values(t).filter(Boolean)),c=Ve.filter(f=>!l.has(f.id)&&!n.has(f.id)),u=[];for(let f=0;f<6;f++){const y=f*2,p=f*2+1,m=c[y],w=c[p],v=m?Et(m.id,e):null,x=w?Et(w.id,e):null;u.push({leftName:v?v.name:"",leftNumber:v&&v.number||"",rightName:x?x.name:"",rightNumber:x&&x.number||""})}let g="";for(let f=1;f<=4;f++){let y="";d.forEach(v=>{y+=`
                <tr>
                    <td class="cell-order">${v.order}</td>
                    <td class="cell-pos">${v.posNum}</td>
                    <td class="cell-name">${Be(v.name)}</td>
                    <td class="cell-number">${v.number}</td>
                </tr>
            `}),le===10&&d.length<10&&(y+='<tr><td class="cell-order">10</td><td class="cell-pos"></td><td class="cell-name"></td><td class="cell-number"></td></tr>');const p=le===10?11:10,m=d.length;for(let v=m;v<p;v++)y+='<tr><td class="cell-order"></td><td class="cell-pos"></td><td class="cell-name"></td><td class="cell-number"></td></tr>';let w="";u.forEach(v=>{w+=`
                <tr>
                    <td class="cell-bench-name">${Be(v.leftName)}</td>
                    <td class="cell-bench-num">${v.leftNumber}</td>
                    <td class="cell-bench-name">${Be(v.rightName)}</td>
                    <td class="cell-bench-num">${v.rightNumber}</td>
                </tr>
            `}),g+=`
            <div class="sheet-card">
                <div class="card-page-idx">(${f}/4)</div>
                <div class="card-title">メンバー表</div>
                
                <div class="header-table-wrapper">
                    <!-- 1行目: 日付・大会名 -->
                    <table class="table-header table-header-top">
                        <tr>
                            <td class="cell-date font-variable">${Be(s.date||"")}</td>
                            <td class="cell-tournament font-variable">${Be(s.tournament||"")}</td>
                        </tr>
                    </table>
                    <!-- 2行目: 自チーム・相手チーム -->
                    <table class="table-header table-header-bottom">
                        <tr>
                            <td class="cell-team-label-l cell-label-vertical"><span class="label-v-wrap">チーム</span></td>
                            <td class="cell-team-val font-variable">${Be(s.teamHome||"")}</td>
                            <td class="cell-team-label-r cell-label-vertical"><span class="label-v-wrap">相手チーム</span></td>
                            <td class="cell-team-val font-variable">${Be(s.teamVisitor||"")}</td>
                        </tr>
                    </table>
                </div>
                
                <table class="table-lineup">
                    <thead>
                        <tr>
                            <th style="width: 13%;">打順</th>
                            <th style="width: 15%; line-height: 1.1;">守備<br>位置</th>
                            <th style="width: 54%;">選手名</th>
                            <th style="width: 18%;">背番号</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${y}
                    </tbody>
                </table>
                
                <div class="bench-section-label">控え選手</div>
                <table class="table-bench">
                    <thead>
                        <tr>
                            <th style="width: 37%;">選手名</th>
                            <th style="width: 13%;">背番号</th>
                            <th style="width: 37%;">選手名</th>
                            <th style="width: 13%;">背番号</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${w}
                    </tbody>
                </table>
                
                <table class="table-footer">
                    <tr>
                        <td class="footer-label">監督</td>
                        <td class="footer-val font-variable">${Be(s.manager||"")}</td>
                        <td class="footer-label">主将</td>
                        <td class="footer-val font-variable">${Be(s.captain||"")}</td>
                        <td class="footer-label font-sans leading-none" style="font-size: 6.5px; padding: 0; text-align: center; white-space: nowrap;"><span style="display: inline-block; transform: scaleX(0.75); transform-origin: center;">スコアラー</span></td>
                        <td class="footer-val font-variable">${Be(s.scorer||"")}</td>
                    </tr>
                    <tr>
                        <td class="footer-label">球場</td>
                        <td colspan="3" class="footer-val font-variable">${Be(s.stadium||"")}</td>
                        <td class="footer-label">時間</td>
                        <td class="footer-val font-variable">${Be(s.time||"")}</td>
                    </tr>
                </table>
            </div>
        `}const b=window.open("","_blank");if(!b){alert("ポップアップブロックが有効になっているため、印刷用画面を開けませんでした。許可してください。");return}b.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>印刷用メンバー表 (4枚綴り)</title>
            <meta charset="utf-8">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700;900&family=Zen+Kurenaido&display=swap" rel="stylesheet">
            <style>
                @page {
                    size: A4 landscape;
                    margin: 0;
                }
                body {
                    margin: 0;
                    padding: 0;
                    font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Segoe UI", sans-serif;
                    background-color: #fff;
                    -webkit-print-color-adjust: exact;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    text-rendering: optimizeLegibility;
                    color: #000;
                }
                .print-container {
                    width: 297mm;
                    height: 210mm;
                    box-sizing: border-box;
                    padding: 3mm 4mm;
                    display: flex;
                    justify-content: space-between;
                }
                .sheet-card {
                    width: 68mm;
                    height: 204mm;
                    box-sizing: border-box;
                    /* 一番外側の外枠は不要のためborder削除 */
                    border: none;
                    padding: 4mm 3.5mm;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                }
                /* カット用の境界点線 (隣のカードとの間) */
                .sheet-card:not(:last-child) {
                    position: relative;
                }
                /* カット用点線ガイド（印刷用紙の外側） */
                .sheet-card:not(:last-child)::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    right: -2.83mm;
                    width: 1px;
                    height: 204mm;
                    border-right: 0.5px dashed #ccc;
                }
                .card-page-idx {
                    position: absolute;
                    top: 1.5mm;
                    right: 2.5mm;
                    font-size: 8px;
                    font-family: "Helvetica Neue", Arial, sans-serif;
                    color: #555;
                    font-weight: bold;
                }
                .card-title {
                    text-align: center;
                    font-size: 17px;
                    font-weight: bold;
                    letter-spacing: 2px;
                    margin-top: 3mm;
                    margin-bottom: 4mm;
                    text-decoration: underline;
                    text-underline-offset: 3px;
                    font-family: "Helvetica Neue", Arial, sans-serif;
                }
                .header-table-wrapper {
                    margin-bottom: 2.5mm;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 9px;
                    table-layout: fixed;
                }
                th, td {
                    border: 0.05px solid #000;
                    text-align: center;
                    vertical-align: middle;
                    height: 5.2mm;
                    box-sizing: border-box;
                }
                
                /* フォントファミリーの差別化（固定値：Noto Serif JP、可変値：M PLUS Rounded 1c） */
                th, .card-title, .bench-section-label, .cell-tournament-label, 
                .cell-team-label-l, .cell-team-label-r, .footer-label {
                    font-family: 'Noto Serif JP', serif;
                    font-weight: 400;
                }
                .font-variable, .cell-date, .cell-tournament, .cell-team-val, 
                .cell-name, .cell-bench-name, .footer-val,
                .cell-order, .cell-pos, .cell-number, .cell-bench-num {
                    font-family: 'Zen Kurenaido', sans-serif;
                    font-weight: 400;
                }

                /* ヘッダーテーブル */
                .table-header {
                    font-size: 8px;
                    width: 100%;
                    border-collapse: collapse;
                    table-layout: fixed;
                }
                .table-header td {
                    height: 7.5mm;
                    padding: 0 2px;
                    border: 0.05px solid #000;
                    box-sizing: border-box;
                    vertical-align: middle;
                }
                .table-header-bottom {
                    margin-top: -0.05px;
                }
                .table-header-top .cell-date {
                    width: 45%;
                    font-size: 10px;
                    border-right: none;
                }
                .cell-label-vertical {
                    width: 6%;
                    padding: 0 !important;
                    margin: 0;
                    background-color: #f2f2f2;
                    text-align: center;
                    vertical-align: middle;
                }
                .label-v-wrap {
                    display: inline-block;
                    writing-mode: vertical-rl;
                    -webkit-writing-mode: vertical-rl;
                    text-align: center;
                    line-height: 1.0;
                    white-space: nowrap;
                    margin: 0 auto;
                }
                .cell-team-label-l .label-v-wrap {
                    font-size: 5.5px;
                    letter-spacing: 0px;
                }
                .cell-team-label-r .label-v-wrap {
                    font-size: 4.8px;
                    letter-spacing: -0.5px;
                }
                .table-header-top .cell-tournament {
                    width: 55%;
                    font-size: 10px;
                    text-align: center;
                    border-left: none;
                    white-space: normal;
                    word-break: break-all;
                    line-height: 1.1;
                    letter-spacing: -0.1px;
                }
                .table-header-bottom .cell-team-val {
                    width: 44%;
                    font-size: 10px;
                    white-space: normal;
                    word-break: break-all;
                    line-height: 1.1;
                }
                
                /* スタメンテーブル */
                .table-lineup {
                    margin-bottom: 2.5mm;
                }
                .table-lineup th {
                    background-color: #f2f2f2;
                    font-size: 8.5px;
                    height: 5.2mm;
                }
                .table-lineup td {
                    height: 7.2mm;
                }
                .cell-order {
                    font-size: 11px;
                }
                .cell-pos {
                    font-size: 14px;
                }
                .cell-name {
                    font-size: 14px;
                }
                .cell-number {
                    font-size: 14px;
                }
                
                /* 控え選手 */
                .bench-section-label {
                    font-size: 11px;
                    background-color: #e5e5e5;
                    border: 0.05px solid #000;
                    border-bottom: none;
                    text-align: center;
                    height: 4mm;
                    line-height: 4mm;
                    box-sizing: border-box;
                    margin-top: 1.5mm;
                }
                .table-bench {
                    margin-bottom: 2.5mm;
                }
                .table-bench th {
                    background-color: #f2f2f2;
                    font-size: 7px;
                    height: 3.5mm;
                }
                .table-bench td {
                    height: 5.6mm;
                    font-size: 10.5px;
                }
                .cell-bench-name {
                    text-align: center;
                    font-size: 11.5px;
                    padding: 0 1px;
                    white-space: normal;
                    word-break: break-all;
                    line-height: 1.1;
                }
                .cell-bench-num {
                    font-size: 10.5px;
                }
                
                /* フッターテーブル */
                .table-footer {
                    font-size: 8px;
                }
                .table-footer td {
                    height: 4.8mm;
                }
                .footer-label {
                    width: 14%;
                    background-color: #f2f2f2;
                }
                .footer-val {
                    width: 19%;
                    font-size: 8.5px;
                    white-space: normal;
                    word-break: break-all;
                    line-height: 1.1;
                }
                
                /* 印刷時の設定 */
                @media print {
                    .sheet-card::after {
                        border-right-color: #bbb;
                    }
                }
            </style>
        </head>
        <body>
            <div class="print-container">
                ${g}
            </div>
            <script>
                // 読み込み完了後に自動的に印刷ダイアログを表示
                window.onload = function() {
                    setTimeout(function() {
                        window.print();
                    }, 500);
                };
            <\/script>
        </body>
        </html>
    `),b.document.close()}function Bd(){const e=Le();if(!e)return;const t={version:"ants-sim-3.0",players:Ve,pattern:e},n=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),a=URL.createObjectURL(n),s=document.createElement("a");s.href=a,s.download=`ants_positions_${e.name.replace(/[\s/\\?%*:|"<>\.]/g,"_")}.json`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(a)}function Ad(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=async function(a){try{const s=JSON.parse(a.target.result);if(s.version!=="ants-sim-3.0"&&s.version!=="ants-sim-2.0"&&s.version!=="ants-sim-1.0"){alert("ファイル形式が正しくありません。");return}if(confirm(`インポートを実行しますか？
※既存の選手リストと配置データがマージ/追加されます。`)){for(const r of s.players)Ve.some(o=>o.id===r.id||o.name===r.name)||(Ve.push(r),await ba(r));if(s.version==="ants-sim-3.0"){const r=s.pattern;r.id="pat_"+Date.now(),r.name=r.name+" (インポート)",Re.push(r),rt=r.id,le=r.mode,await et(r)}else if(s.version==="ants-sim-2.0"){const r=s.pattern;r.id="pat_"+Date.now(),r.name=r.name+" (インポート)",r.mode=r.mode||9,r.battingOrder={},r.headerInfo={},Re.push(r),rt=r.id,le=r.mode,await et(r)}else{const r=s.pattern,o=r.innings&&r.innings[0]?r.innings[0].positions:{},i={id:"pat_"+Date.now(),name:r.name+" (旧移行)",mode:r.mode||9,basePositions:o,customSubstitutions:[],battingOrder:{},headerInfo:{}};Re.push(i),rt=i.id,le=i.mode,await et(i)}gn(),Ge(),we(),alert("インポートが完了しました。")}}catch(s){console.error(s),alert("ファイルの読み込みに失敗しました。")}e.target.value=""},n.readAsText(t)}function Td(){var s,r,o,i,d,l,c,u,g,b,f,y,p,m,w,v,x,k,$,h,E,_,I,S,A,P,M,N,G,R,B,C,T,F,X,W,Z,j,Q;const e=document.getElementById("btn-toggle-players-panel"),t=document.getElementById("players-panel-content"),n=document.getElementById("icon-toggle-players");e&&t&&n&&(e.addEventListener("click",()=>{const re=t.classList.toggle("hidden");n.textContent=re?"▼":"▲",localStorage.setItem("ants_sim_players_panel_collapsed",re?"true":"false")}),localStorage.getItem("ants_sim_players_panel_collapsed")==="true"&&(t.classList.add("hidden"),n.textContent="▼")),(s=document.getElementById("tab-btn-setup"))==null||s.addEventListener("click",()=>Pa("setup")),(r=document.getElementById("tab-btn-subrules"))==null||r.addEventListener("click",()=>Pa("subrules")),(o=document.getElementById("rule-type-select"))==null||o.addEventListener("change",H=>{const re=H.target.value;document.getElementById("form-sub").classList.add("hidden"),document.getElementById("form-rotation").classList.add("hidden"),re==="sub"?document.getElementById("form-sub").classList.remove("hidden"):re==="rotation"&&document.getElementById("form-rotation").classList.remove("hidden")}),(i=document.getElementById("btn-export-member-table"))==null||i.addEventListener("click",$d),(d=document.getElementById("btn-copy-member-text"))==null||d.addEventListener("click",kd),(l=document.getElementById("btn-close-member-modal"))==null||l.addEventListener("click",Br),(c=document.getElementById("btn-close-member-modal-footer"))==null||c.addEventListener("click",Br),(u=document.getElementById("btn-print-member-table"))==null||u.addEventListener("click",Ld),["member-input-date","member-input-tournament","member-input-team-home","member-input-team-visitor","member-input-manager","member-input-captain","member-input-scorer","member-input-stadium","member-input-time"].forEach(H=>{var re;(re=document.getElementById(H))==null||re.addEventListener("input",Sd)}),(g=document.getElementById("btn-create-sub-rule"))==null||g.addEventListener("click",ad),(b=document.getElementById("btn-add-sim-player"))==null||b.addEventListener("click",ps),(f=document.getElementById("sim-new-player-input"))==null||f.addEventListener("keypress",H=>{H.key==="Enter"&&ps()}),(y=document.getElementById("sim-new-player-number"))==null||y.addEventListener("keypress",H=>{H.key==="Enter"&&ps()}),(p=document.getElementById("sim-team-select"))==null||p.addEventListener("change",pd),(m=document.getElementById("btn-add-sim-team"))==null||m.addEventListener("click",cd),(w=document.getElementById("btn-edit-sim-team"))==null||w.addEventListener("click",ud),(v=document.getElementById("btn-delete-sim-team"))==null||v.addEventListener("click",md),(x=document.getElementById("sim-template-select-inline"))==null||x.addEventListener("change",H=>gd(H.target.value)),(k=document.getElementById("btn-save-as-template"))==null||k.addEventListener("click",fd),($=document.getElementById("btn-delete-template"))==null||$.addEventListener("click",bd),(h=document.getElementById("btn-open-new-sim-modal"))==null||h.addEventListener("click",yd),(E=document.getElementById("btn-close-new-sim-modal"))==null||E.addEventListener("click",Bs),(_=document.getElementById("btn-close-new-sim-modal-footer"))==null||_.addEventListener("click",Bs),(I=document.getElementById("btn-create-new-sim"))==null||I.addEventListener("click",hd),(S=document.getElementById("sim-pattern-select"))==null||S.addEventListener("change",Id),(A=document.getElementById("btn-save-sim-pattern"))==null||A.addEventListener("click",Ed),(P=document.getElementById("btn-delete-sim-pattern"))==null||P.addEventListener("click",_d),(M=document.getElementById("btn-refresh-sim-pattern"))==null||M.addEventListener("click",vd),(N=document.getElementById("btn-close-edit-player-modal"))==null||N.addEventListener("click",As),(G=document.getElementById("btn-close-edit-player-modal-footer"))==null||G.addEventListener("click",As),(R=document.getElementById("btn-save-edit-player"))==null||R.addEventListener("click",fs),(B=document.getElementById("edit-player-name"))==null||B.addEventListener("keypress",H=>{H.key==="Enter"&&fs()}),(C=document.getElementById("edit-player-number"))==null||C.addEventListener("keypress",H=>{H.key==="Enter"&&fs()}),(T=document.getElementById("btn-sim-mode-9"))==null||T.addEventListener("click",async()=>{if(le!==9){le=9,gn();const H=Le();H&&(H.mode=9,zn(H),await et(H)),Ge(),we()}}),(F=document.getElementById("btn-sim-mode-10"))==null||F.addEventListener("click",async()=>{if(le!==10){le=10,gn();const H=Le();H&&(H.mode=10,zn(H),await et(H)),Ge(),we()}}),(X=document.getElementById("btn-export-sim"))==null||X.addEventListener("click",Bd),(W=document.getElementById("import-sim-input"))==null||W.addEventListener("change",Ad),(Z=document.getElementById("btn-back-to-menu-sim"))==null||Z.addEventListener("click",()=>{Oe=null,Ae=null,se("app-menu-view")}),(j=document.getElementById("btn-logout-sim"))==null||j.addEventListener("click",()=>{var H;(H=document.getElementById("btn-logout"))==null||H.click()}),(Q=document.getElementById("sim-bench-list"))==null||Q.addEventListener("click",H=>{H.target.id==="sim-bench-list"&&Oe&&Ae!=="players-list"&&Ae!=="bench"&&ld(Ae)})}function Be(e){return typeof e!="string"?"":e.replace(/[&<>'"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[t]||t)}let po=null,on=null,Sn=!1;const kn="ants_surveys_v1",Vn="ants_survey_responses_v1";let ge=[],ke=[];const Ar=[{id:"survey_sample_1",title:"【夏季合宿】参加日程調整 & お弁当・合宿Tシャツ注文とりまとめ",description:`少年野球チーム Arinko Ants 夏季合宿（8月開催）の出欠日程および備品・お弁当の事前注文確認です。
**1回の送信で、保護者様ご本人と選手（兄弟含む）全員分の出欠・注文をまとめてご登録いただけます。**
ご不明な点がありましたら役員までお問い合わせください。`,status:"active",deadline:"2026-07-20 23:59",public_results:!0,enable_schedule:!0,schedule_options:["8/8(土) 午前 (練習・遠征)","8/8(土) 午後 (練習試合・BBQ)","8/8(土) 宿泊","8/9(日) 終日 (紅白戦・グラウンド納め)"],enable_family:!0,enable_orders:!0,order_items:[{id:"item_lunch_sat",name:"8/8(土) 選手・保護者弁当",price:650,max:10},{id:"item_lunch_sun",name:"8/9(日) 選手・保護者弁当",price:650,max:10},{id:"item_tshirt",name:"合宿記念チームTシャツ",price:2200,max:5},{id:"item_cap",name:" Ants オリジナル冷感タオル",price:800,max:5}],questions:[{id:"q_attendance",type:"single",title:"合宿全体の参加可否をお選びください",required:!0,options:[{label:"参加する（部分参加含む）",skip_to:null},{label:"不参加（全日程）",skip_to:"q_remarks"}],help:"不参加を選択された場合、日程詳細およびお弁当等の注文設問はスキップされます。"},{id:"q_transport",type:"single",title:"現地までの移動手段について",required:!1,options:[{label:"配車（チーム車）を利用希望",skip_to:null},{label:"自車で現地直行（他メンバー同乗可）",skip_to:null},{label:"自車で現地直行（家族のみ）",skip_to:null}],help:""},{id:"q_remarks",type:"text",title:"特記事項・アレルギー・連絡事項など",required:!1,options:[],help:"食物アレルギーや遅刻・早退のご予定等があればご記入ください。"}],created_by:"役員会",created_at:"2026-06-01",updated_at:"2026-06-01"}],Tr=[{id:"resp_sample_1",survey_id:"survey_sample_1",respondent_name:"菱沼 (保護者)",family_members:[{name:"菱沼 健一 (保護者・指導者)",role:"保護者"},{name:"菱沼 翔太 (6年・主将)",role:"選手"}],schedules:{"8/8(土) 午前 (練習・遠征)":"○","8/8(土) 午後 (練習試合・BBQ)":"○","8/8(土) 宿泊":"○","8/9(日) 終日 (紅白戦・グラウンド納め)":"○"},answers:{q_attendance:"参加する（部分参加含む）",q_transport:"自車で現地直行（他メンバー同乗可）",q_remarks:"車出し可能です。道具車としても利用できます。"},orders:{item_lunch_sat:2,item_lunch_sun:2,item_tshirt:1,item_cap:2},total_amount:6400,created_at:"2026-06-02 10:15"}];async function Dd({supabaseClient:e,currentUser:t,currentUserRole:n,canManageInfo:a=null}){po=e,on=t,a!==null?Sn=a:Sn=n==="admin"||(t==null?void 0:t.can_edit_info)===!0||n==="leader"&&(t==null?void 0:t.can_edit_info)!==!1,await Ts(),Sn&&Cd(),yo(),Pn()}async function Cd(){const e=ta();if(e)try{const t=localStorage.getItem(kn);if(t){const n=JSON.parse(t);Array.isArray(n)&&n.length>0&&(await e.from("master_data").upsert({key:"ANTS_SURVEYS",data:n}),console.log("Auto-synced surveys to master_data:",n.length))}}catch(t){console.warn("Auto-sync surveys to DB failed:",t)}}function ta(){return po||window.supabaseClient||null}async function Ts(){let e=!1,t=!1;const n=ta();if(n){try{const{data:a,error:s}=await n.from("surveys").select("*").order("created_at",{ascending:!1});!s&&a&&a.length>0&&(ge=a,e=!0)}catch(a){console.warn("Supabase surveys load failed, trying master_data fallback:",a)}if(!e)try{const{data:a,error:s}=await n.from("master_data").select("data").eq("key","ANTS_SURVEYS");!s&&a&&a.length>0&&Array.isArray(a[0].data)&&a[0].data.length>0&&(ge=a[0].data,e=!0)}catch(a){console.warn("Supabase master_data ANTS_SURVEYS load skipped:",a)}try{const{data:a,error:s}=await n.from("survey_responses").select("*").order("created_at",{ascending:!1});!s&&a&&a.length>0&&(ke=a,t=!0)}catch(a){console.warn("Supabase survey_responses load failed, trying master_data fallback:",a)}if(!t)try{const{data:a,error:s}=await n.from("master_data").select("data").eq("key","ANTS_SURVEY_RESPONSES");!s&&a&&a.length>0&&Array.isArray(a[0].data)&&(ke=a[0].data,t=!0)}catch(a){console.warn("Supabase master_data ANTS_SURVEY_RESPONSES load skipped:",a)}}if(e)try{localStorage.setItem(kn,JSON.stringify(ge))}catch{}else try{const a=localStorage.getItem(kn);a?ge=JSON.parse(a):(ge=[...Ar],localStorage.setItem(kn,JSON.stringify(ge)))}catch{ge=[...Ar]}if(t)try{localStorage.setItem(Vn,JSON.stringify(ke))}catch{}else try{const a=localStorage.getItem(Vn);a?ke=JSON.parse(a):(ke=[...Tr],localStorage.setItem(Vn,JSON.stringify(ke)))}catch{ke=[...Tr]}}async function fo(e,t=!1){const n=ge.findIndex(s=>s.id===e.id);n>=0?ge[n]=e:ge.unshift(e);try{localStorage.setItem(kn,JSON.stringify(ge))}catch(s){console.error(s)}const a=ta();if(a){try{t?await a.from("surveys").insert([e]):await a.from("surveys").update(e).eq("id",e.id)}catch(s){console.warn("Supabase survey table save skipped:",s)}try{await a.from("master_data").upsert({key:"ANTS_SURVEYS",data:ge})}catch(s){console.warn("Supabase master_data ANTS_SURVEYS upsert failed:",s)}}}async function Nd(e){ge=ge.filter(n=>n.id!==e),ke=ke.filter(n=>n.survey_id!==e);try{localStorage.setItem(kn,JSON.stringify(ge)),localStorage.setItem(Vn,JSON.stringify(ke))}catch(n){console.error(n)}const t=ta();if(t){try{await t.from("survey_responses").delete().eq("survey_id",e),await t.from("surveys").delete().eq("id",e)}catch{}try{await t.from("master_data").upsert({key:"ANTS_SURVEYS",data:ge}),await t.from("master_data").upsert({key:"ANTS_SURVEY_RESPONSES",data:ke})}catch{}}}async function Pd(e){const t=ke.findIndex(s=>s.id===e.id),n=t>=0;n?ke[t]=e:ke.unshift(e);try{localStorage.setItem(Vn,JSON.stringify(ke))}catch(s){console.error(s)}const a=ta();if(a){try{n?await a.from("survey_responses").update(e).eq("id",e.id):await a.from("survey_responses").insert([e])}catch(s){console.warn("Supabase survey_responses table save skipped:",s)}try{await a.from("master_data").upsert({key:"ANTS_SURVEY_RESPONSES",data:ke})}catch(s){console.warn("Supabase master_data ANTS_SURVEY_RESPONSES upsert failed:",s)}}}async function Md(e){ke=ke.filter(n=>n.id!==e);try{localStorage.setItem(Vn,JSON.stringify(ke))}catch(n){console.error(n)}const t=ta();if(t){try{await t.from("survey_responses").delete().eq("id",e)}catch{}try{await t.from("master_data").upsert({key:"ANTS_SURVEY_RESPONSES",data:ke})}catch{}}Jn&&es(Jn.id),Pn()}function Pn(){const e=document.getElementById("info-surveys-container"),t=document.getElementById("info-surveys-empty"),n=document.getElementById("btn-survey-new");if(e){if(n&&(Sn?n.classList.remove("hidden"):n.classList.add("hidden")),ge.length===0){e.innerHTML="",t&&t.classList.remove("hidden");return}t&&t.classList.add("hidden"),e.innerHTML=ge.map(a=>{const s=ke.filter(l=>l.survey_id===a.id),r=s.length,o=s.reduce((l,c)=>l+(Number(c.total_amount)||0),0);let i="";a.status==="active"?i='<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">🟢 受付中</span>':a.status==="closed"?i='<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">⚪ 締切済み</span>':i='<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">🟡 下書き</span>';const d=[];return a.enable_schedule&&d.push("📅 日程調整"),a.enable_family&&d.push("👨‍👩‍👧 家族一括"),a.enable_orders&&d.push("🛒 注文集計"),`
            <div class="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between gap-2 mb-3">
                        ${i}
                        <span class="text-xs text-gray-400 font-mono">期限: ${a.deadline||"なし"}</span>
                    </div>
                    <h3 class="text-base font-bold text-gray-900 mb-2 leading-snug">
                        ${de(a.title)}
                    </h3>
                    <p class="text-xs text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                        ${de(a.description||"")}
                    </p>
                    <div class="flex flex-wrap gap-1.5 mb-4">
                        ${d.map(l=>`<span class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-gray-100 text-gray-600 border border-gray-200">${l}</span>`).join("")}
                    </div>
                    <!-- 回答統計サマリー -->
                    <div class="bg-gray-50 rounded-xl p-3 border border-gray-100 flex items-center justify-around text-center mb-4">
                        <div>
                            <span class="block text-[11px] text-gray-400 font-bold">回答数</span>
                            <span class="text-base font-extrabold text-teal-600">${r} <span class="text-xs font-normal">件</span></span>
                        </div>
                        ${a.enable_orders?`
                        <div class="border-l border-gray-200 pl-4">
                            <span class="block text-[11px] text-gray-400 font-bold">注文合計額</span>
                            <span class="text-base font-extrabold text-purple-600">¥${o.toLocaleString()}</span>
                        </div>
                        `:""}
                    </div>
                </div>

                <!-- アクションボタン群 -->
                <div class="pt-3 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2">
                    <div class="flex items-center gap-2">
                        <button class="btn-survey-respond px-3 py-1.5 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition shadow-xs flex items-center gap-1 cursor-pointer" data-id="${a.id}">
                            <span>📝</span><span>回答する</span>
                        </button>
                        <button class="btn-survey-share px-2.5 py-1.5 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition border border-gray-200 cursor-pointer" data-id="${a.id}" title="回答用URLをコピー">
                            <span>🔗 共有URL</span>
                        </button>
                    </div>
                    <div class="flex items-center gap-1.5">
                        ${Sn?`
                        <button class="btn-survey-results px-3 py-1.5 text-xs font-bold bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition border border-purple-200 cursor-pointer" data-id="${a.id}">
                            📊 集計・CSV
                        </button>
                        <button class="btn-survey-duplicate text-xs text-gray-400 hover:text-green-600 p-1.5 rounded hover:bg-gray-100 transition cursor-pointer" data-id="${a.id}" title="アンケートを複製">
                            📄
                        </button>
                        <button class="btn-survey-edit text-xs text-gray-400 hover:text-blue-600 p-1.5 rounded hover:bg-gray-100 transition cursor-pointer" data-id="${a.id}" title="編集">
                            ✏️
                        </button>
                        <button class="btn-survey-delete text-xs text-gray-400 hover:text-red-600 p-1.5 rounded hover:bg-gray-100 transition cursor-pointer" data-id="${a.id}" title="削除">
                            🗑️
                        </button>
                        `:`
                        ${a.public_results!==!1?`
                        <button class="btn-survey-results px-3 py-1.5 text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition border border-blue-200 cursor-pointer" data-id="${a.id}">
                            📊 回答状況
                        </button>
                        `:""}
                        `}
                    </div>
                </div>
            </div>
        `}).join(""),e.querySelectorAll(".btn-survey-respond").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id");Gn(s)})}),e.querySelectorAll(".btn-survey-share").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id");Hd(s)})}),e.querySelectorAll(".btn-survey-results").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id");es(s)})}),Sn&&(e.querySelectorAll(".btn-survey-duplicate").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id");await Rd(s)})}),e.querySelectorAll(".btn-survey-edit").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id"),r=ge.find(o=>o.id===s);r&&go(r)})}),e.querySelectorAll(".btn-survey-delete").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id"),r=ge.find(o=>o.id===s);r&&confirm(`アンケート「${r.title}」と、そのすべての回答データを削除しますか？`)&&(await Nd(s),Pn())})}))}}async function Rd(e){const t=ge.find(s=>s.id===e);if(!t)return;const n=`survey_${Date.now()}`,a=JSON.parse(JSON.stringify(t));if(a.id=n,a.title=`(複製) ${t.title}`,a.created_at=new Date().toISOString(),a.status=t.status||"active",a.questions&&Array.isArray(a.questions)){const s={};a.questions.forEach((r,o)=>{const i=r.id,d=`q_${Date.now()}_${o+1}`;s[i]=d,r.id=d}),a.questions.forEach(r=>{r.options&&Array.isArray(r.options)&&r.options.forEach(o=>{o.skip_to&&s[o.skip_to]&&(o.skip_to=s[o.skip_to])})})}a.order_items&&Array.isArray(a.order_items)&&a.order_items.forEach((s,r)=>{s.id=`item_${Date.now()}_${r+1}`}),await fo(a,!0),Pn(),alert(`アンケート「${a.title}」を作成（複製）しました！`)}function Od(e){try{const t={id:e.id,title:e.title,description:e.description,deadline:e.deadline,public_results:e.public_results,enable_schedule:e.enable_schedule,schedule_options:e.schedule_options,enable_family:e.enable_family,enable_orders:e.enable_orders,order_items:e.order_items,questions:e.questions},n=JSON.stringify(t);return btoa(encodeURIComponent(n).replace(/%([0-9A-F]{2})/g,(a,s)=>String.fromCharCode("0x"+s)))}catch(t){return console.warn("Survey encode error:",t),""}}function Fd(e){if(!e)return null;try{let t=decodeURIComponent(e).trim();t=t.replace(/ /g,"+"),t=t.replace(/-/g,"+").replace(/_/g,"/");const n=t.length%4;n===2?t+="==":n===3?t+="=":n===1&&(t+="===");const a=atob(t),s=decodeURIComponent(Array.prototype.map.call(a,r=>"%"+("00"+r.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(s)}catch(t){return console.warn("Survey decode error:",t),null}}function Hd(e){const t=ge.find(a=>a.id===e);let n=`${window.location.origin}${window.location.pathname}#survey-${e}`;if(t){const a=Od(t);a&&(n+=`&d=${a}`)}navigator.clipboard.writeText(n).then(()=>{alert(`アンケート回答用URLをコピーしました！
どの端末・Safari・LINEでも確実に開くURLです。

${n}`)}).catch(()=>{prompt("アンケート回答用URL:",n)})}let jn=null,ne=[],dn=[],Gt=[];function go(e=null){const t=document.getElementById("modal-survey-editor");if(!t)return;jn=e?e.id:null,document.getElementById("survey-editor-modal-title").textContent=e?"アンケートの編集":"新規アンケート作成",document.getElementById("input-survey-title").value=e?e.title:"",document.getElementById("input-survey-desc").value=e&&e.description||"",document.getElementById("select-survey-status").value=e?e.status:"active",document.getElementById("input-survey-deadline").value=e&&e.deadline||"";const n=document.getElementById("chk-survey-enable-schedule"),a=document.getElementById("chk-survey-enable-family"),s=document.getElementById("chk-survey-enable-orders"),r=document.getElementById("chk-survey-public-results");n.checked=e?!!e.enable_schedule:!0,a.checked=e?!!e.enable_family:!0,s.checked=e?!!e.enable_orders:!1,r&&(r.checked=e?e.public_results!==!1:!0),dn=e&&e.schedule_options?[...e.schedule_options]:["7/18(土) 午前","7/18(土) 午後","7/19(日) 終日"],Gt=e&&e.order_items?JSON.parse(JSON.stringify(e.order_items)):[{id:`item_${Date.now()}_1`,name:"選手用お弁当",price:600,max:10},{id:`item_${Date.now()}_2`,name:"保護者用お弁当",price:700,max:10}],ne=e&&e.questions?JSON.parse(JSON.stringify(e.questions)):[],Xa(),sr(),jt(),Ns(),t.classList.remove("hidden")}function Ds(){const e=document.getElementById("modal-survey-editor");e&&e.classList.add("hidden"),jn=null}function Ea(e){const t=e.getFullYear(),n=e.getMonth()+1,a=e.getDate(),s=e.getDay();if(n===1&&a===1)return"元日";if(n===2&&a===11)return"建国記念の日";if(n===2&&a===23)return"天皇誕生日";if(n===4&&a===29)return"昭和の日";if(n===5&&a===3)return"憲法記念日";if(n===5&&a===4)return"みどりの日";if(n===5&&a===5)return"こどもの日";if(n===8&&a===11)return"山の日";if(n===11&&a===3)return"文化の日";if(n===11&&a===23)return"勤労感謝の日";if(s===1){const r=Math.floor((a-1)/7)+1;if(n===1&&r===2)return"成人の日";if(n===7&&r===3)return"海の日";if(n===9&&r===3)return"敬老の日";if(n===10&&r===2)return"スポーツの日"}if(n===3){const r=Math.floor(20.8431+.242194*(t-1980)-Math.floor((t-1980)/4));if(a===r)return"春分の日"}if(n===9){const r=Math.floor(23.2488+.242194*(t-1980)-Math.floor((t-1980)/4));if(a===r)return"秋分の日"}return null}function ar(e){const t=Ea(e);if(t)return{isHoliday:!0,name:t};const n=e.getFullYear(),a=e.getMonth(),s=e.getDate(),r=e.getDay();let o=new Date(n,a,s-1);for(;Ea(o);){if(o.getDay()===0)return{isHoliday:!0,name:"振替休日"};o.setDate(o.getDate()-1)}if(r!==0){const i=new Date(n,a,s-1),d=new Date(n,a,s+1);if(Ea(i)&&Ea(d))return{isHoliday:!0,name:"国民の休日"}}return null}let Ie={targetType:null,targetQIdx:null,viewYear:new Date().getFullYear(),viewMonth:new Date().getMonth(),selectedDates:new Set};function bo(e,t=null){Ie.targetType=e,Ie.targetQIdx=t;const n=new Date;Ie.viewYear=n.getFullYear(),Ie.viewMonth=n.getMonth(),Ie.selectedDates.clear(),En();const a=document.getElementById("modal-survey-date-picker");a&&a.classList.remove("hidden")}function Cs(){const e=document.getElementById("modal-survey-date-picker");e&&e.classList.add("hidden")}function En(){const e=document.getElementById("dp-current-month-label"),t=document.getElementById("dp-calendar-grid"),n=document.getElementById("dp-selected-count-badge"),a=document.getElementById("btn-apply-date-picker");if(!t)return;const{viewYear:s,viewMonth:r,selectedDates:o}=Ie;e&&(e.textContent=`${s}年 ${r+1}月`),n&&(n.textContent=`${o.size} 日選択中`),a&&(a.disabled=o.size===0);const i=new Date(s,r,1).getDay(),d=new Date(s,r+1,0).getDate();let l="";for(let c=0;c<i;c++)l+='<div class="h-11 border border-transparent rounded-lg"></div>';for(let c=1;c<=d;c++){const u=new Date(s,r,c),g=u.getDay(),b=`${s}-${String(r+1).padStart(2,"0")}-${String(c).padStart(2,"0")}`,f=o.has(b),y=ar(u);let p="",m="";f?(p="bg-teal-600 text-white font-bold shadow-xs",y&&(m=`<span class="text-[9px] block leading-tight truncate px-0.5 text-teal-100">${de(y.name)}</span>`)):y?(p="text-red-600 bg-red-50/70 hover:bg-red-100 font-bold border-red-100",m=`<span class="text-[9px] block leading-tight truncate px-0.5 text-red-600 font-bold">${de(y.name)}</span>`):g===0?p="text-red-500 hover:bg-red-50 font-bold":g===6?p="text-blue-600 hover:bg-blue-50 font-bold":p="text-gray-800 hover:bg-gray-100",l+=`
            <button type="button" class="dp-day-cell h-11 p-1 flex flex-col items-center justify-between rounded-lg border border-gray-100 transition cursor-pointer text-xs ${p}" data-date="${b}">
                <span class="text-xs font-bold leading-none">${c}</span>
                ${m}
            </button>
        `}t.innerHTML=l,t.querySelectorAll(".dp-day-cell").forEach(c=>{c.addEventListener("click",()=>{const u=c.getAttribute("data-date");o.has(u)?o.delete(u):o.add(u),En()})})}function qd(){const e=new Date(Ie.viewYear,Ie.viewMonth+1,0).getDate();for(let t=1;t<=e;t++){const n=new Date(Ie.viewYear,Ie.viewMonth,t),a=n.getDay(),s=ar(n);if(a===0||a===6||s){const r=`${Ie.viewYear}-${String(Ie.viewMonth+1).padStart(2,"0")}-${String(t).padStart(2,"0")}`;Ie.selectedDates.add(r)}}En()}function Ud(){var i;const{targetType:e,targetQIdx:t,selectedDates:n}=Ie;if(n.size===0)return;const a=((i=document.querySelector('input[name="dp-format"]:checked'))==null?void 0:i.value)||"simple",s=["日","月","火","水","木","金","土"],r=Array.from(n).sort(),o=[];if(r.forEach(d=>{const[l,c,u]=d.split("-").map(Number),g=new Date(l,c-1,u),b=s[g.getDay()],y=ar(g)?`${b}・祝`:b;a==="time_slots"?(o.push(`${c}/${u}(${y}) 午前`),o.push(`${c}/${u}(${y}) 午後`),o.push(`${c}/${u}(${y}) 終日`)):a==="with_year"?o.push(`${l}/${String(c).padStart(2,"0")}/${String(u).padStart(2,"0")}(${y})`):a==="kanji"?o.push(`${c}月${u}日(${y})`):o.push(`${c}/${u}(${y})`)}),e==="schedule")dn.push(...o),Xa();else if(e==="question"&&t!==null){ne[t].options||(ne[t].options=[]);const d=ne[t].options;d.length===2&&d[0].label==="選択肢 1"&&d[1].label==="選択肢 2"?ne[t].options=o.map(c=>({label:c,skip_to:null})):o.forEach(c=>{ne[t].options.push({label:c,skip_to:null})}),jt()}Cs()}function Ns(){var s,r;const e=(s=document.getElementById("chk-survey-enable-schedule"))==null?void 0:s.checked,t=(r=document.getElementById("chk-survey-enable-orders"))==null?void 0:r.checked,n=document.getElementById("editor-schedule-section"),a=document.getElementById("editor-orders-section");n&&(n.style.display=e?"block":"none"),a&&(a.style.display=t?"block":"none")}function Xa(){const e=document.getElementById("editor-schedule-list");e&&(e.innerHTML=dn.map((t,n)=>`
        <div class="flex items-center gap-2 mb-2">
            <span class="text-xs font-bold text-gray-400 w-5">#${n+1}</span>
            <input type="text" class="input-sched-opt flex-grow border border-gray-300 rounded-lg p-1.5 text-xs focus:ring-2 focus:ring-teal-500" value="${de(t)}" data-index="${n}" placeholder="例: 7/18(土) 午前 (9:00〜12:00)">
            <button class="btn-del-sched-opt text-xs text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded" data-index="${n}">🗑️</button>
        </div>
    `).join(""),e.querySelectorAll(".input-sched-opt").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-index"));dn[a]=n.target.value})}),e.querySelectorAll(".btn-del-sched-opt").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-index"));dn.splice(n,1),Xa()})}))}function sr(){const e=document.getElementById("editor-orders-list");e&&(e.innerHTML=Gt.map((t,n)=>`
        <div class="grid grid-cols-12 gap-2 mb-2 items-center bg-gray-50/70 p-2 rounded-lg border border-gray-200">
            <div class="col-span-6">
                <input type="text" class="input-order-name w-full border border-gray-300 rounded p-1 text-xs" value="${de(t.name)}" data-index="${n}" placeholder="商品・品目名 (例: お弁当)">
            </div>
            <div class="col-span-3 flex items-center gap-1">
                <span class="text-xs text-gray-500">¥</span>
                <input type="number" class="input-order-price w-full border border-gray-300 rounded p-1 text-xs" value="${t.price}" data-index="${n}" placeholder="単価">
            </div>
            <div class="col-span-2">
                <input type="number" class="input-order-max w-full border border-gray-300 rounded p-1 text-xs" value="${t.max||10}" data-index="${n}" placeholder="上限">
            </div>
            <div class="col-span-1 text-right">
                <button class="btn-del-order-item text-xs text-red-500 hover:text-red-700 p-1" data-index="${n}">🗑️</button>
            </div>
        </div>
    `).join(""),e.querySelectorAll(".input-order-name").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-index"));Gt[a].name=n.target.value})}),e.querySelectorAll(".input-order-price").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-index"));Gt[a].price=Number(n.target.value)||0})}),e.querySelectorAll(".input-order-max").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-index"));Gt[a].max=Number(n.target.value)||10})}),e.querySelectorAll(".btn-del-order-item").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-index"));Gt.splice(n,1),sr()})}))}function jt(){const e=document.getElementById("editor-questions-list");if(e){if(ne.length===0){e.innerHTML='<p class="text-xs text-gray-400 py-3 text-center border border-dashed rounded-lg">設問がありません。「＋ 設問を追加」ボタンで追加してください。</p>';return}e.innerHTML=ne.map((t,n)=>{const a=ne.filter((s,r)=>r>n);return`
            <div class="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-4" data-q-index="${n}">
                <div class="flex items-center justify-between gap-2 mb-2">
                    <div class="flex items-center gap-2">
                        <span class="px-2 py-0.5 rounded bg-teal-600 text-white text-xs font-bold">設問 ${n+1}</span>
                        <select class="select-q-type border border-gray-300 rounded p-1 text-xs bg-white font-bold text-gray-700" data-q-index="${n}">
                            <option value="single" ${t.type==="single"?"selected":""}>単一選択 (ラジオボタン)</option>
                            <option value="multiple" ${t.type==="multiple"?"selected":""}>複数選択 (チェックボックス)</option>
                            <option value="text" ${t.type==="text"?"selected":""}>自由記述 (テキスト入力)</option>
                        </select>
                        <label class="flex items-center gap-1 text-xs text-gray-600 font-bold ml-2">
                            <input type="checkbox" class="chk-q-req rounded text-teal-600" data-q-index="${n}" ${t.required?"checked":""}>
                            <span>必須</span>
                        </label>
                    </div>
                    <div class="flex items-center gap-1">
                        ${n>0?`<button class="btn-move-q-up text-xs text-gray-500 hover:text-gray-800 p-1" data-q-index="${n}" title="上に移動">▲</button>`:""}
                        ${n<ne.length-1?`<button class="btn-move-q-down text-xs text-gray-500 hover:text-gray-800 p-1" data-q-index="${n}" title="下に移動">▼</button>`:""}
                        <button class="btn-del-q text-xs text-red-500 hover:text-red-700 p-1 font-bold ml-1" data-q-index="${n}">削除</button>
                    </div>
                </div>

                <div class="mb-3">
                    <input type="text" class="input-q-title w-full border border-gray-300 rounded-lg p-2 text-xs font-bold text-gray-800" value="${de(t.title)}" data-q-index="${n}" placeholder="設問のタイトルを入力してください">
                </div>

                <!-- 選択肢セクション (single または multiple の場合) -->
                ${t.type==="single"||t.type==="multiple"?`
                <div class="pl-3 border-l-2 border-teal-300 mb-2">
                    <label class="block text-[11px] font-bold text-gray-500 mb-1.5">選択肢一覧 &amp; 設問スキップ設定:</label>
                    <div class="space-y-2">
                        ${(t.options||[]).map((s,r)=>`
                            <div class="flex items-center gap-2">
                                <input type="text" class="input-opt-label flex-grow border border-gray-300 rounded p-1.5 text-xs" value="${de(s.label)}" data-q-index="${n}" data-opt-index="${r}" placeholder="選択肢 ${r+1}">
                                ${t.type==="single"?`
                                <div class="flex items-center gap-1 shrink-0 bg-white border border-gray-200 rounded px-2 py-1">
                                    <span class="text-[10px] text-gray-500 font-bold">スキップ先:</span>
                                    <select class="select-opt-skip text-xs border-0 bg-transparent text-teal-700 font-bold focus:ring-0" data-q-index="${n}" data-opt-index="${r}">
                                        <option value="">(通常通り次へ)</option>
                                        <option value="__END__" ${s.skip_to==="__END__"?"selected":""}>🏁 回答を終了（以降すべてスキップ）</option>
                                        ${a.map((o,i)=>`<option value="${o.id}" ${s.skip_to===o.id?"selected":""}>設問 ${n+2+i}へジャンプ</option>`).join("")}
                                    </select>
                                </div>
                                `:""}
                                <button class="btn-del-opt text-xs text-gray-400 hover:text-red-600 p-1" data-q-index="${n}" data-opt-index="${r}">✕</button>
                            </div>
                        `).join("")}
                    </div>
                    <div class="flex items-center gap-2 mt-2">
                        <button class="btn-add-opt text-xs font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1 cursor-pointer" data-q-index="${n}">
                            <span>＋ 選択肢を追加</span>
                        </button>
                        <button class="btn-add-date-opt text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition shadow-2xs" data-q-index="${n}">
                            <span>📅 カレンダーから日程を追加</span>
                        </button>
                    </div>
                </div>
                `:""}

                <div>
                    <input type="text" class="input-q-help w-full border border-gray-200 rounded p-1.5 text-[11px] text-gray-500 bg-white" value="${de(t.help||"")}" data-q-index="${n}" placeholder="補足説明・注釈 (任意)">
                </div>
            </div>
        `}).join(""),e.querySelectorAll(".input-q-title").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-q-index"));ne[a].title=n.target.value})}),e.querySelectorAll(".input-q-help").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-q-index"));ne[a].help=n.target.value})}),e.querySelectorAll(".select-q-type").forEach(t=>{t.addEventListener("change",n=>{const a=Number(n.target.getAttribute("data-q-index"));ne[a].type=n.target.value,(!ne[a].options||ne[a].options.length===0)&&(ne[a].options=[{label:"選択肢 1",skip_to:null},{label:"選択肢 2",skip_to:null}]),jt()})}),e.querySelectorAll(".chk-q-req").forEach(t=>{t.addEventListener("change",n=>{const a=Number(n.target.getAttribute("data-q-index"));ne[a].required=n.target.checked})}),e.querySelectorAll(".btn-del-q").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index"));ne.splice(n,1),jt()})}),e.querySelectorAll(".btn-move-q-up").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index"));if(n>0){const a=ne[n];ne[n]=ne[n-1],ne[n-1]=a,jt()}})}),e.querySelectorAll(".btn-move-q-down").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index"));if(n<ne.length-1){const a=ne[n];ne[n]=ne[n+1],ne[n+1]=a,jt()}})}),e.querySelectorAll(".btn-add-opt").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index"));ne[n].options||(ne[n].options=[]),ne[n].options.push({label:`選択肢 ${ne[n].options.length+1}`,skip_to:null}),jt()})}),e.querySelectorAll(".btn-add-date-opt").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index"));bo("question",n)})}),e.querySelectorAll(".input-opt-label").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-q-index")),s=Number(n.target.getAttribute("data-opt-index"));ne[a].options[s].label=n.target.value})}),e.querySelectorAll(".select-opt-skip").forEach(t=>{t.addEventListener("change",n=>{const a=Number(n.target.getAttribute("data-q-index")),s=Number(n.target.getAttribute("data-opt-index"));ne[a].options[s].skip_to=n.target.value||null})}),e.querySelectorAll(".btn-del-opt").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index")),a=Number(t.getAttribute("data-opt-index"));ne[n].options.splice(a,1),jt()})})}}async function jd(){var u,g,b,f,y,p,m,w,v;const e=(u=document.getElementById("input-survey-title"))==null?void 0:u.value.trim();if(!e){alert("アンケートのタイトルを入力してください");return}const t=((g=document.getElementById("input-survey-desc"))==null?void 0:g.value.trim())||"",n=((b=document.getElementById("select-survey-status"))==null?void 0:b.value)||"active",a=((f=document.getElementById("input-survey-deadline"))==null?void 0:f.value.trim())||"",s=((y=document.getElementById("chk-survey-enable-schedule"))==null?void 0:y.checked)||!1,r=((p=document.getElementById("chk-survey-enable-family"))==null?void 0:p.checked)||!1,o=((m=document.getElementById("chk-survey-enable-orders"))==null?void 0:m.checked)||!1,i=((w=document.getElementById("chk-survey-public-results"))==null?void 0:w.checked)??!0,d=!jn,l=new Date().toISOString().split("T")[0],c={id:jn||`survey_${Date.now()}`,title:e,description:t,status:n,deadline:a,public_results:i,enable_schedule:s,schedule_options:s?dn.filter(x=>x.trim()):[],enable_family:r,enable_orders:o,order_items:o?Gt.filter(x=>x.name.trim()):[],questions:ne,created_by:(on==null?void 0:on.name)||"管理者",created_at:jn&&((v=ge.find(x=>x.id===jn))==null?void 0:v.created_at)||l,updated_at:l};await fo(c,d),Ds(),Pn()}let Jn=null;function es(e,t=!1){const n=document.getElementById("modal-survey-results");if(!n)return;const a=ge.find(i=>i.id===e);if(!a)return;Jn=a;const s=ke.filter(i=>i.survey_id===e),r=t||!Sn;document.getElementById("results-survey-title").textContent=a.title,document.getElementById("results-survey-subtitle").textContent=`回答数: ${s.length}件 | 締切: ${a.deadline||"なし"}${r?" (閲覧モード)":""}`;const o=document.getElementById("btn-export-survey-csv");o&&(r?o.classList.add("hidden"):o.classList.remove("hidden")),Gd(a,s),Wd(a,s),zd(a,s),Jd(a,s),Yd(a,s,r),n.classList.remove("hidden")}function Vd(){const e=document.getElementById("modal-survey-results");e&&e.classList.add("hidden"),Jn=null}function Gd(e,t){const n=t.length;let a=0;t.forEach(o=>{o.family_members&&o.family_members.length>0?a+=o.family_members.length:a+=1});const s=t.reduce((o,i)=>o+(Number(i.total_amount)||0),0),r=document.getElementById("results-summary-cards");r&&(r.innerHTML=`
        <div class="bg-teal-50 border border-teal-200 rounded-xl p-4 text-center">
            <span class="text-xs text-teal-700 font-bold block mb-1">総回答件数</span>
            <span class="text-2xl font-black text-teal-800">${n} <span class="text-xs font-normal">件</span></span>
        </div>
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <span class="text-xs text-blue-700 font-bold block mb-1">参加予定人数 (家族含む)</span>
            <span class="text-2xl font-black text-blue-800">${a} <span class="text-xs font-normal">名</span></span>
        </div>
        ${e.enable_orders?`
        <div class="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
            <span class="text-xs text-purple-700 font-bold block mb-1">注文総額</span>
            <span class="text-2xl font-black text-purple-800">¥${s.toLocaleString()}</span>
        </div>
        `:""}
    `)}function Wd(e,t){const n=document.getElementById("results-schedule-container");if(!n)return;if(!e.enable_schedule||!e.schedule_options||e.schedule_options.length===0){n.classList.add("hidden");return}n.classList.remove("hidden");const a={};e.schedule_options.forEach(r=>{a[r]={ok:[],maybe:[],ng:[]}}),t.forEach(r=>{const o=r.respondent_name||"無名";r.schedules&&Object.entries(r.schedules).forEach(([i,d])=>{a[i]&&(d==="○"||d==="ok"?a[i].ok.push(o):d==="△"||d==="maybe"?a[i].maybe.push(o):(d==="×"||d==="ng")&&a[i].ng.push(o))})});const s=document.getElementById("results-schedule-tbody");s&&(s.innerHTML=e.schedule_options.map(r=>{const o=a[r],i=o.ok.join("、 ");return`
            <tr class="border-b border-gray-100 hover:bg-gray-50/50">
                <td class="px-3 py-2.5 font-bold text-gray-800 whitespace-nowrap">${de(r)}</td>
                <td class="px-3 py-2.5 text-center font-extrabold text-emerald-600 bg-emerald-50/30">
                    ${o.ok.length}
                </td>
                <td class="px-3 py-2.5 text-center font-bold text-amber-600">
                    ${o.maybe.length}
                </td>
                <td class="px-3 py-2.5 text-center font-bold text-gray-400">
                    ${o.ng.length}
                </td>
                <td class="px-3 py-2.5 text-xs text-gray-600 max-w-xs truncate" title="${de(i)}">
                    ${de(i)||'<span class="text-gray-300">なし</span>'}
                </td>
            </tr>
        `}).join(""))}function zd(e,t){const n=document.getElementById("results-orders-container");if(!n)return;if(!e.enable_orders||!e.order_items||e.order_items.length===0){n.classList.add("hidden");return}n.classList.remove("hidden");const a={};e.order_items.forEach(r=>{a[r.id]={name:r.name,price:r.price,count:0}}),t.forEach(r=>{r.orders&&Object.entries(r.orders).forEach(([o,i])=>{a[o]&&(a[o].count+=Number(i)||0)})});const s=document.getElementById("results-orders-tbody");s&&(s.innerHTML=e.order_items.map(r=>{const o=a[r.id]||{count:0},i=o.count*r.price;return`
            <tr class="border-b border-gray-100 hover:bg-gray-50/50">
                <td class="px-3 py-2.5 font-bold text-gray-800">${de(r.name)}</td>
                <td class="px-3 py-2.5 text-right font-mono text-gray-600">¥${r.price.toLocaleString()}</td>
                <td class="px-3 py-2.5 text-center font-extrabold text-purple-600">${o.count} <span class="text-xs font-normal">個</span></td>
                <td class="px-3 py-2.5 text-right font-extrabold text-purple-800 font-mono">¥${i.toLocaleString()}</td>
            </tr>
        `}).join(""))}function Jd(e,t){const n=document.getElementById("results-questions-list");if(n){if(!e.questions||e.questions.length===0){n.innerHTML='<p class="text-xs text-gray-400">設問はありません</p>';return}n.innerHTML=e.questions.map((a,s)=>{const r=t.map(o=>o.answers&&o.answers[a.id]).filter(o=>o!=null&&o!=="");if(a.type==="single"||a.type==="multiple"){const o={};(a.options||[]).forEach(d=>o[d.label]=0),o["(未回答)"]=0,r.forEach(d=>{Array.isArray(d)?d.forEach(l=>{o[l]=(o[l]||0)+1}):o[d]!==void 0?o[d]+=1:o[d]=(o[d]||0)+1});const i=t.length;return`
                <div class="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-3">
                    <h4 class="text-xs font-bold text-gray-800 mb-2">設問 ${s+1}: ${de(a.title)}</h4>
                    <div class="space-y-1.5">
                        ${Object.entries(o).filter(([d,l])=>d!=="(未回答)"||l>0).map(([d,l])=>{const c=i>0?Math.round(l/i*100):0;return`
                                <div>
                                    <div class="flex justify-between text-xs mb-0.5">
                                        <span class="text-gray-700">${de(d)}</span>
                                        <span class="font-bold text-gray-900">${l}票 (${c}%)</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-teal-600 h-2 rounded-full" style="width: ${c}%"></div>
                                    </div>
                                </div>
                            `}).join("")}
                    </div>
                </div>
            `}else return`
                <div class="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-3">
                    <h4 class="text-xs font-bold text-gray-800 mb-2">設問 ${s+1}: ${de(a.title)} (${r.length}件の回答)</h4>
                    <div class="max-h-36 overflow-y-auto space-y-1.5 pr-2 scrollbar-thin">
                        ${r.length>0?r.map(o=>`
                            <div class="bg-white p-2 rounded border border-gray-200 text-xs text-gray-700">
                                ${de(String(o))}
                            </div>
                        `).join(""):'<span class="text-xs text-gray-400">回答がありません</span>'}
                    </div>
                </div>
            `}).join("")}}function Yd(e,t,n=!1){const a=document.getElementById("th-results-actions");a&&(n?a.classList.add("hidden"):a.classList.remove("hidden"));const s=document.getElementById("results-responses-tbody");if(!s)return;const r=n?5:6;if(t.length===0){s.innerHTML=`<tr><td colspan="${r}" class="text-center py-6 text-xs text-gray-400">まだ回答がありません</td></tr>`;return}s.innerHTML=t.map(o=>{const i=(o.family_members||[]).map(l=>l.name).join("、 ")||"-",d=o.orders?Object.entries(o.orders).filter(([l,c])=>c>0).map(([l,c])=>{const u=(e.order_items||[]).find(g=>g.id===l);return`${u?u.name:l} ×${c}`}).join(", "):"-";return`
            <tr class="border-b border-gray-100 hover:bg-gray-50/50 text-xs">
                <td class="px-3 py-2 text-gray-400 whitespace-nowrap">${o.created_at||"-"}</td>
                <td class="px-3 py-2 font-bold text-gray-900 whitespace-nowrap">${de(o.respondent_name)}</td>
                <td class="px-3 py-2 text-gray-600 max-w-xs truncate" title="${de(i)}">${de(i)}</td>
                <td class="px-3 py-2 text-gray-600 max-w-xs truncate" title="${de(d)}">${de(d)}</td>
                <td class="px-3 py-2 text-right font-mono font-bold text-purple-700">¥${(Number(o.total_amount)||0).toLocaleString()}</td>
                ${n?"":`
                <td class="px-3 py-2 text-center whitespace-nowrap">
                    <div class="flex items-center justify-center gap-1.5">
                        <button class="btn-copy-response-edit-url px-2 py-1 text-[11px] font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded transition cursor-pointer" data-id="${o.id}" title="本人用の修正URLを発行してコピー">
                            🔗 修正URL
                        </button>
                        <button class="btn-delete-response px-2 py-1 text-[11px] font-bold text-red-600 hover:bg-red-50 rounded transition cursor-pointer" data-id="${o.id}" data-name="${de(o.respondent_name)}" title="この回答を削除">
                            🗑️
                        </button>
                    </div>
                </td>
                `}
            </tr>
        `}).join(""),n||(s.querySelectorAll(".btn-copy-response-edit-url").forEach(o=>{o.addEventListener("click",()=>{const i=o.getAttribute("data-id"),d=`${window.location.origin}${window.location.pathname}#survey-${e.id}&response=${i}`;navigator.clipboard.writeText(d).then(()=>{alert(`回答修正用URLをコピーしました！
ご本人に案内してください。

${d}`)}).catch(()=>{prompt("以下のURLをコピーしてください:",d)})})}),s.querySelectorAll(".btn-delete-response").forEach(o=>{o.addEventListener("click",async()=>{const i=o.getAttribute("data-id"),d=o.getAttribute("data-name")||"この回答者";confirm(`「${d}」さんの回答データを削除しますか？
（集計や出欠、注文数から除外されます）`)&&await Md(i)})}))}function Kd(){if(!Jn)return;const e=Jn,t=ke.filter(d=>d.survey_id===e.id),n=["回答ID","回答日時","回答者(代表者名)"];e.enable_family&&n.push("家族メンバー一覧"),e.enable_schedule&&e.schedule_options&&e.schedule_options.forEach(d=>{n.push(`日程: ${d}`)}),e.questions&&e.questions.forEach((d,l)=>{n.push(`設問${l+1}: ${d.title}`)}),e.enable_orders&&e.order_items&&(e.order_items.forEach(d=>{n.push(`注文: ${d.name} (${d.price}円)`)}),n.push("注文合計金額(円)"));const a=[n];t.forEach(d=>{const l=[d.id,d.created_at||"",d.respondent_name||""];if(e.enable_family){const c=(d.family_members||[]).map(u=>`${u.name}${u.role?`(${u.role})`:""}`).join(", ");l.push(c)}e.enable_schedule&&e.schedule_options&&e.schedule_options.forEach(c=>{l.push(d.schedules&&d.schedules[c]||"")}),e.questions&&e.questions.forEach(c=>{const u=d.answers?d.answers[c.id]:"";Array.isArray(u)?l.push(u.join("; ")):l.push(u||"")}),e.enable_orders&&e.order_items&&(e.order_items.forEach(c=>{const u=d.orders&&d.orders[c.id]||0;l.push(u)}),l.push(d.total_amount||0)),a.push(l)});const s=a.map(d=>d.map(l=>`"${String(l||"").replace(/"/g,'""')}"`).join(",")).join(`
`),r=new Blob([new Uint8Array([239,187,191]),s],{type:"text/csv;charset=utf-8;"}),o=document.createElement("a");o.href=URL.createObjectURL(r);const i=new Date().toISOString().split("T")[0];o.download=`survey_${e.id}_${i}.csv`,o.click()}let ca=null,zt=[],Ma=null;async function Gn(e,t=null,n=null){var d;(d=document.getElementById("loading-overlay"))==null||d.classList.add("hidden");const a=document.getElementById("loading-detail-text");a&&(a.style.opacity="0"),["auth-view","signup-view","password-reset-view","password-update-view","app-menu-view","app-view","attendance-view","view-users","dashboard-view","dashboard-settings","position-simulator-view","info-view"].forEach(l=>{const c=document.getElementById(l);c&&c.classList.add("hidden")});const s=document.getElementById("survey-respond-view");s&&s.classList.remove("hidden");const r=document.getElementById("survey-respond-form-container"),o=document.getElementById("survey-respond-error-container"),i=document.getElementById("survey-respond-success-container");i&&i.classList.add("hidden");try{if(yo(),(!ge||ge.length===0)&&await Ts(),!n){const y=window.location.hash||"",p=window.location.search||"",m=(y+"&"+p).match(/[?&#]d=([^&]+)/);m&&m[1]&&(n=m[1])}let l=ge.find(y=>y.id===e);if(!l&&n)try{const y=Fd(n);if(y&&(y.id===e||!e)){l=y,ge.unshift(l);try{localStorage.setItem(kn,JSON.stringify(ge))}catch{}}}catch(y){console.warn("Embedded survey restore failed:",y)}if(l||(await Ts(),l=ge.find(y=>y.id===e)),!l&&e)try{const y=decodeURIComponent(e).trim();l=ge.find(p=>p.id===y)}catch{}if(!l){if(r&&r.classList.add("hidden"),o){o.classList.remove("hidden");const y=document.getElementById("survey-respond-error-title"),p=document.getElementById("survey-respond-error-desc");y&&(y.textContent="アンケートが見つかりませんでした"),p&&(p.innerHTML=`指定されたアンケート（ID: <span class="font-mono font-bold">${e||"未指定"}</span>）が存在しないか、URLが正しくない可能性があります。<br>最新のアンケートURLをご確認ください。`)}return}o&&o.classList.add("hidden"),r&&r.classList.remove("hidden"),ca=l,zt=[];let c=null;t&&(c=ke.find(y=>y.id===t));const u=document.getElementById("respond-edit-mode-banner"),g=document.getElementById("btn-submit-survey-response");c?(Ma=c.id,u&&u.classList.remove("hidden"),g&&(g.textContent="回答を更新する")):(Ma=null,u&&u.classList.add("hidden"),g&&(g.textContent="回答を送信する")),document.getElementById("respond-survey-title").textContent=l.title,document.getElementById("respond-survey-desc").innerHTML=l.description?l.description.replace(/\n/g,"<br>"):"",document.getElementById("respond-survey-deadline").textContent=l.deadline?`回答期限: ${l.deadline}`:"";const b=document.getElementById("btn-view-public-results");b&&(l.public_results!==!1?(b.classList.remove("hidden"),b.onclick=()=>es(l.id,!0)):b.classList.add("hidden"));const f=document.getElementById("input-respondent-name");f&&(c?f.value=c.respondent_name||"":f.value=on&&on.name?on.name:""),c&&c.family_members?zt=JSON.parse(JSON.stringify(c.family_members)):zt=[],rr(l),Qd(l,c?c.schedules:null),Zd(l,c?c.answers:null),el(l,c?c.orders:null),window.scrollTo({top:0,behavior:"smooth"})}catch(l){if(console.error("Error in openSurveyResponsePage:",l),r&&r.classList.add("hidden"),o){o.classList.remove("hidden");const c=document.getElementById("survey-respond-error-title"),u=document.getElementById("survey-respond-error-desc");c&&(c.textContent="エラーが発生しました"),u&&(u.innerHTML=`アンケートの読み込み中にエラーが発生しました。<br><span class="text-xs text-red-500 font-mono">${l.message||l}</span>`)}}}function rr(e){const t=document.getElementById("respond-family-section");if(!t)return;if(!e.enable_family){t.classList.add("hidden");return}t.classList.remove("hidden");const n=document.getElementById("respond-family-list");n&&(n.innerHTML=zt.map((a,s)=>`
        <div class="flex items-center gap-2 mb-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
            <input type="text" class="input-fam-name flex-grow border border-gray-300 rounded-lg p-2 text-xs" value="${de(a.name)}" data-index="${s}" placeholder="ご家族・選手のお名前 (例: 翔太)">
            <select class="select-fam-role border border-gray-300 rounded-lg p-2 text-xs bg-white font-bold" data-index="${s}">
                <option value="選手" ${a.role==="選手"?"selected":""}>選手</option>
                <option value="保護者" ${a.role==="保護者"?"selected":""}>保護者</option>
                <option value="兄弟・姉妹" ${a.role==="兄弟・姉妹"?"selected":""}>兄弟・姉妹</option>
                <option value="その他" ${a.role==="その他"?"selected":""}>その他</option>
            </select>
            <button class="btn-del-fam text-xs text-red-500 hover:text-red-700 p-2" data-index="${s}">🗑️</button>
        </div>
    `).join(""),n.querySelectorAll(".input-fam-name").forEach(a=>{a.addEventListener("input",s=>{const r=Number(s.target.getAttribute("data-index"));zt[r].name=s.target.value})}),n.querySelectorAll(".select-fam-role").forEach(a=>{a.addEventListener("change",s=>{const r=Number(s.target.getAttribute("data-index"));zt[r].role=s.target.value})}),n.querySelectorAll(".btn-del-fam").forEach(a=>{a.addEventListener("click",()=>{const s=Number(a.getAttribute("data-index"));zt.splice(s,1),rr(e)})}))}function Qd(e,t=null){const n=document.getElementById("respond-schedule-section");if(!n)return;if(!e.enable_schedule||!e.schedule_options||e.schedule_options.length===0){n.classList.add("hidden");return}n.classList.remove("hidden");const a=document.getElementById("respond-schedule-list");a&&(a.innerHTML=e.schedule_options.map((s,r)=>{const o=t&&t[s]?t[s]:"○";return`
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl border border-gray-200 bg-white mb-2.5">
            <span class="text-xs font-bold text-gray-800">${de(s)}</span>
            <div class="flex items-center gap-4">
                <label class="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-100 transition">
                    <input type="radio" name="respond_sched_${r}" value="○" ${o==="○"?"checked":""} class="text-emerald-600 focus:ring-emerald-500">
                    <span>○ (参加)</span>
                </label>
                <label class="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 hover:bg-amber-100 transition">
                    <input type="radio" name="respond_sched_${r}" value="△" ${o==="△"?"checked":""} class="text-amber-600 focus:ring-amber-500">
                    <span>△ (未定)</span>
                </label>
                <label class="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 transition">
                    <input type="radio" name="respond_sched_${r}" value="×" ${o==="×"?"checked":""} class="text-gray-600 focus:ring-gray-500">
                    <span>× (不参加)</span>
                </label>
            </div>
        </div>
        `}).join(""))}function Zd(e,t=null){const n=document.getElementById("respond-questions-section");if(!n)return;if(!e.questions||e.questions.length===0){n.classList.add("hidden");return}n.classList.remove("hidden");const a=document.getElementById("respond-questions-list");a&&(a.innerHTML=e.questions.map((s,r)=>{const o=t?t[s.id]:void 0;return`
        <div id="respond-q-block-${s.id}" class="respond-q-block p-4 rounded-xl border border-gray-200 bg-white mb-4 transition-all" data-q-id="${s.id}">
            <div class="flex items-start gap-2 mb-2">
                <span class="px-2 py-0.5 rounded bg-teal-100 text-teal-800 text-xs font-bold shrink-0">Q${r+1}</span>
                <div>
                    <h4 class="text-xs font-bold text-gray-900 leading-snug">
                        ${de(s.title)}
                        ${s.required?'<span class="text-red-500 ml-1">*必須</span>':""}
                    </h4>
                    ${s.help?`<p class="text-[11px] text-gray-500 mt-0.5">${de(s.help)}</p>`:""}
                </div>
            </div>

            <div class="mt-3 pl-2">
                ${Xd(s,o)}
            </div>
        </div>
        `}).join(""),a.querySelectorAll('input[type="radio"].q-opt-radio').forEach(s=>{s.addEventListener("change",()=>{Dr(e)})}),Dr(e))}function Xd(e,t=void 0){if(e.type==="single")return(e.options||[]).map((n,a)=>{const s=t!==void 0?t===n.label:a===0;return`
            <label class="flex items-center gap-2 cursor-pointer text-xs text-gray-700 mb-2 hover:text-teal-700">
                <input type="radio" name="respond_ans_${e.id}" value="${de(n.label)}" class="q-opt-radio text-teal-600 focus:ring-teal-500" data-q-id="${e.id}" data-skip-to="${n.skip_to||""}" ${s?"checked":""}>
                <span>${de(n.label)}</span>
            </label>
            `}).join("");if(e.type==="multiple")return(e.options||[]).map(n=>{const a=Array.isArray(t)?t.includes(n.label):!1;return`
            <label class="flex items-center gap-2 cursor-pointer text-xs text-gray-700 mb-2 hover:text-teal-700">
                <input type="checkbox" name="respond_ans_${e.id}" value="${de(n.label)}" ${a?"checked":""} class="rounded text-teal-600 focus:ring-teal-500">
                <span>${de(n.label)}</span>
            </label>
            `}).join("");{const n=t!==void 0?String(t):"";return`
            <textarea name="respond_ans_${e.id}" rows="3" class="w-full border border-gray-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-teal-500 outline-none" placeholder="回答を入力してください...">${de(n)}</textarea>
        `}}function Dr(e){if(!e.questions)return;let t=new Set;e.questions.forEach((n,a)=>{if(n.type==="single"){const s=document.querySelector(`input[name="respond_ans_${n.id}"]:checked`);if(s){const r=s.getAttribute("data-skip-to");if(r==="__END__")for(let o=a+1;o<e.questions.length;o++)t.add(e.questions[o].id);else if(r){const o=e.questions.findIndex(i=>i.id===r);if(o>a)for(let i=a+1;i<o;i++)t.add(e.questions[i].id)}}}}),e.questions.forEach(n=>{var s,r;const a=document.getElementById(`respond-q-block-${n.id}`);if(a)if(t.has(n.id)){if(a.classList.add("opacity-40","bg-gray-100","pointer-events-none"),!a.querySelector(".skip-badge")){const i=document.createElement("span");i.className="skip-badge text-[10px] bg-gray-300 text-gray-700 font-bold px-1.5 py-0.5 rounded ml-2",i.textContent="スキップされました",(s=a.querySelector("h4"))==null||s.appendChild(i)}}else a.classList.remove("opacity-40","bg-gray-100","pointer-events-none"),(r=a.querySelector(".skip-badge"))==null||r.remove()})}function el(e,t=null){const n=document.getElementById("respond-orders-section");if(!n)return;if(!e.enable_orders||!e.order_items||e.order_items.length===0){n.classList.add("hidden");return}n.classList.remove("hidden");const a=document.getElementById("respond-orders-list");a&&(a.innerHTML=e.order_items.map(s=>{const r=t&&t[s.id]!==void 0?Number(t[s.id]):0;return`
        <div class="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-white mb-2.5">
            <div>
                <span class="block text-xs font-bold text-gray-900">${de(s.name)}</span>
                <span class="text-xs text-teal-700 font-mono font-bold">¥${s.price.toLocaleString()}</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-xs text-gray-500">数量:</span>
                <select class="select-order-qty border border-gray-300 rounded-lg p-1.5 text-xs bg-white font-bold" data-item-id="${s.id}" data-price="${s.price}">
                    ${Array.from({length:(s.max||10)+1},(o,i)=>`<option value="${i}" ${i===r?"selected":""}>${i}</option>`).join("")}
                </select>
            </div>
        </div>
        `}).join(""),a.querySelectorAll(".select-order-qty").forEach(s=>{s.addEventListener("change",Cr)}),Cr())}function Cr(){let e=0;document.querySelectorAll(".select-order-qty").forEach(n=>{const a=Number(n.value)||0,s=Number(n.getAttribute("data-price"))||0;e+=a*s});const t=document.getElementById("respond-orders-total-amount");t&&(t.textContent=`¥${e.toLocaleString()}`)}async function tl(){var v,x,k,$;if(!ca)return;const e=ca,t=(v=document.getElementById("input-respondent-name"))==null?void 0:v.value.trim();if(!t){alert("保護者氏名（選手氏名）を入力してください"),(x=document.getElementById("input-respondent-name"))==null||x.focus();return}const n={};e.enable_schedule&&e.schedule_options&&e.schedule_options.forEach((h,E)=>{const _=document.querySelector(`input[name="respond_sched_${E}"]:checked`);_&&(n[h]=_.value)});const a={};let s=!1;if(e.questions&&e.questions.forEach(h=>{var I;const E=document.getElementById(`respond-q-block-${h.id}`);if(!(E&&E.classList.contains("opacity-40")))if(h.type==="single"){const S=document.querySelector(`input[name="respond_ans_${h.id}"]:checked`);S?a[h.id]=S.value:h.required&&(s=!0)}else if(h.type==="multiple"){const S=Array.from(document.querySelectorAll(`input[name="respond_ans_${h.id}"]:checked`)).map(A=>A.value);a[h.id]=S,h.required&&S.length===0&&(s=!0)}else{const S=(I=document.querySelector(`textarea[name="respond_ans_${h.id}"]`))==null?void 0:I.value.trim();a[h.id]=S||"",h.required&&!S&&(s=!0)}}),s){alert("必須の設問に回答してください。");return}const r={};let o=0;e.enable_orders&&e.order_items&&document.querySelectorAll(".select-order-qty").forEach(h=>{const E=h.getAttribute("data-item-id"),_=Number(h.value)||0,I=Number(h.getAttribute("data-price"))||0;r[E]=_,o+=_*I});const i=!!Ma,d=Ma||`resp_${Date.now()}`,l=new Date,c=`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}-${String(l.getDate()).padStart(2,"0")} ${String(l.getHours()).padStart(2,"0")}:${String(l.getMinutes()).padStart(2,"0")}`,u={id:d,survey_id:e.id,respondent_name:t,family_members:zt.filter(h=>h.name.trim()),schedules:n,answers:a,orders:r,total_amount:o,created_at:c};await Pd(u);const g=`${window.location.origin}${window.location.pathname}#survey-${e.id}&response=${u.id}`,b=document.getElementById("input-edit-response-url");b&&(b.value=g);const f=document.getElementById("btn-copy-edit-url");f&&(f.onclick=()=>{navigator.clipboard.writeText(g).then(()=>{alert(`回答修正用URLをコピーしました！
後から回答を変更する場合は、このURLから修正できます。`)}).catch(()=>{prompt("以下のURLをコピーしてください:",g)})});const y=document.getElementById("btn-re-edit-response");y&&(y.onclick=()=>{Gn(e.id,u.id)});const p=document.getElementById("btn-view-results-from-success");p&&(e.public_results!==!1?(p.classList.remove("hidden"),p.onclick=()=>es(e.id,!0)):p.classList.add("hidden"));const m=document.getElementById("survey-respond-success-title"),w=document.getElementById("survey-respond-success-desc");m&&(m.textContent=i?"回答を更新しました！":"回答を受け付けました！"),w&&(w.innerHTML=i?"回答内容の変更が正常に保存されました。<br>内容は役員・担当者へ最新状態で共有されます。":"ご回答いただきありがとうございました。<br>内容は役員・担当者へ共有されます。"),(k=document.getElementById("survey-respond-form-container"))==null||k.classList.add("hidden"),($=document.getElementById("survey-respond-success-container"))==null||$.classList.remove("hidden"),window.scrollTo({top:0,behavior:"smooth"})}function de(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}let Nr=!1;function yo(){var e,t,n,a,s,r,o,i,d,l,c,u,g,b,f,y,p,m,w,v,x,k,$,h,E;Nr||(Nr=!0,(e=document.getElementById("btn-survey-new"))==null||e.addEventListener("click",()=>go()),(t=document.getElementById("chk-survey-enable-schedule"))==null||t.addEventListener("change",Ns),(n=document.getElementById("chk-survey-enable-orders"))==null||n.addEventListener("change",Ns),(a=document.getElementById("btn-add-sched-opt"))==null||a.addEventListener("click",()=>{dn.push(`候補日 ${dn.length+1}`),Xa()}),(s=document.getElementById("btn-open-date-picker-sched"))==null||s.addEventListener("click",()=>{bo("schedule")}),(r=document.getElementById("btn-close-date-picker"))==null||r.addEventListener("click",Cs),(o=document.getElementById("btn-cancel-date-picker"))==null||o.addEventListener("click",Cs),(i=document.getElementById("btn-dp-prev-month"))==null||i.addEventListener("click",()=>{Ie.viewMonth--,Ie.viewMonth<0&&(Ie.viewMonth=11,Ie.viewYear--),En()}),(d=document.getElementById("btn-dp-next-month"))==null||d.addEventListener("click",()=>{Ie.viewMonth++,Ie.viewMonth>11&&(Ie.viewMonth=0,Ie.viewYear++),En()}),(l=document.getElementById("btn-dp-today"))==null||l.addEventListener("click",()=>{const _=new Date;Ie.viewYear=_.getFullYear(),Ie.viewMonth=_.getMonth(),En()}),(c=document.getElementById("btn-dp-select-weekends"))==null||c.addEventListener("click",qd),(u=document.getElementById("btn-dp-clear-all"))==null||u.addEventListener("click",()=>{Ie.selectedDates.clear(),En()}),(g=document.getElementById("btn-apply-date-picker"))==null||g.addEventListener("click",Ud),(b=document.getElementById("btn-add-order-item"))==null||b.addEventListener("click",()=>{Gt.push({id:`item_${Date.now()}`,name:`注文品目 ${Gt.length+1}`,price:500,max:10}),sr()}),(f=document.getElementById("btn-add-question"))==null||f.addEventListener("click",()=>{ne.push({id:`q_${Date.now()}`,type:"single",title:`設問 ${ne.length+1}`,required:!1,options:[{label:"選択肢 1",skip_to:null},{label:"選択肢 2",skip_to:null}],help:""}),jt()}),(y=document.getElementById("btn-save-survey"))==null||y.addEventListener("click",jd),(p=document.getElementById("btn-close-survey-editor"))==null||p.addEventListener("click",Ds),(m=document.getElementById("btn-cancel-survey-editor"))==null||m.addEventListener("click",Ds),(w=document.getElementById("btn-close-survey-results"))==null||w.addEventListener("click",Vd),(v=document.getElementById("btn-export-survey-csv"))==null||v.addEventListener("click",Kd),(x=document.getElementById("btn-respond-add-family"))==null||x.addEventListener("click",()=>{zt.push({name:"",role:"選手"}),ca&&rr(ca)}),(k=document.getElementById("btn-submit-survey-response"))==null||k.addEventListener("click",tl),($=document.getElementById("btn-back-from-survey-respond"))==null||$.addEventListener("click",()=>{if(on){const _=document.getElementById("survey-respond-view");_&&_.classList.add("hidden");const I=document.getElementById("info-view");I&&I.classList.remove("hidden"),Pn()}else{const _=document.getElementById("survey-respond-view");_&&_.classList.add("hidden");const I=document.getElementById("auth-view");I&&I.classList.remove("hidden")}}),(h=document.getElementById("btn-survey-error-reload"))==null||h.addEventListener("click",()=>{window.location.reload()}),(E=document.getElementById("btn-survey-error-home"))==null||E.addEventListener("click",()=>{window.location.href=window.location.pathname}))}let Ke=null,ht=null,Ps="user",en=!1,Pt="docs",Xe=[],Ye=[],Ra="すべて",Oa="すべて",ua="",Ln="";const Fa="ants_info_documents_v1",Ha="ants_info_links_v1",ho="ants_info_top_md_v1",nl=`## 🐜 Arinko Ants チーム情報 &amp; ドキュメントポータル
本ポータルでは、チーム運営に関する**各種マニュアル（配車・当番・緊急対応）**の閲覧、**合宿・イベント出欠アンケート（日程調整・お弁当注文）**の実施、および**グラウンド地図や公式連盟などの便利リンク集**を一元管理しています。

> [!NOTE]
> - **配車調整マニュアル**や**当番業務の手引き**は「ドキュメント」タブよりいつでも閲覧・ダウンロード可能です。
> - 夏季合宿やイベントの日程調整・注文アンケートは「アンケート」タブから回答できます（ゲスト回答も可能）。
`,Pr=[{id:"doc-manual-dispatch",title:"配車調整機能 利用者マニュアル",category:"配車マニュアル",summary:"少年野球チーム「Arinko Ants」の活動におけるイベント配車の自動作成・手動微調整・LINE案内出力までの全体操作マニュアルです。",content:`# 配車調整機能 利用者マニュアル

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
- **別便指定**: 自車直行のメンバーは配車から除外され「◆別便」枠にまとまります。`,files:[],created_by:"管理者",updated_at:"2026-06-01"},{id:"doc-emergency-guide",title:"緊急時対応・熱中症予防ガイドライン",category:"チーム運営・規約",summary:"練習中・試合中の負傷や熱中症発生時の応急手当手順、緊急搬送先リスト、連絡体制に関するガイドラインです。",content:`# 緊急時対応・熱中症予防ガイドライン

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
- **千葉県立東葛飾病院**: 04-7152-8111`,files:[],created_by:"チーム本部",updated_at:"2026-05-10"},{id:"doc-scorer-guide",title:"スコアラー記入の手引き・基本ルール",category:"野球ルール・スコア",summary:"公式戦・練習試合における早稲田式スコアブックの記入方法、凡例記号、打撃・走塁判定のポイント解説です。",content:"# スコアラー記入の手引き・基本ルール\n\n少年野球の試合記録を正確に残すための基本的なスコアブックの付け方です。\n\n---\n\n## 1. 基本記号一覧\n| プレー内容 | 記号 / 記入法 | 備考 |\n| :--- | :--- | :--- |\n| **単打 (ヒット)** | `-` | 1塁方向へ線を引く |\n| **二塁打** | `=` | 2塁方向へ線を引く |\n| **三塁打** | `≡` | 3塁方向へ線を引く |\n| **本塁打** | `HR` | ひし形を一周塗りつぶす |\n| **四球 / 死球** | `B` / `DB` | 1塁へ進塁 |\n| **三振** | `K` (空振り) / 逆さK (見逃し) | アウトカウント |\n| **ゴロ凡打** | `4-3` (セカンドゴロ) | 守備位置番号で記録 |\n| **フライ凡打** | `8` または `F8` (センターフライ) | - |\n| **失策 (エラー)** | `E` (例: `E5` サードエラー) | 打点なし |\n\n---\n\n## 2. 投球数・イニング管理\n- 大会規定による球数制限（1日あたり最大投球数）に注意し、1球ごとにカウントを記録します。\n- 交代時の打者・イニング・カウント・走者状況を明確に記載してください。",files:[],created_by:"スコア担当",updated_at:"2026-04-15"},{id:"doc-ground-rules",title:"ホームグラウンド利用規則 &amp; 当番業務マニュアル",category:"チーム運営・規約",summary:"東小学校グラウンド等の施設利用ルール、鍵の開錠・施錠手順、道具・倉庫の整理整頓、当番保護者の業務一覧です。",content:`# ホームグラウンド利用規則 & 当番業務マニュアル

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
  - [ ] 倉庫施錠および学校鍵の返却`,files:[],created_by:"父母会",updated_at:"2026-04-01"}],Mr=[{id:"link-official-site",title:"Arinko Ants 公式ホームページ",url:"https://arinkoants.sakura.ne.jp/",category:"公式・連盟",description:"チームの公式Webサイト。チーム紹介、選手募集案内、活動予定などが掲載されています。",icon:"🐜",display_order:1},{id:"link-google-calendar",title:"チーム活動予定 Googleカレンダー",url:"https://calendar.google.com/",category:"スケジュール・連絡",description:"練習日、遠征試合、大会スケジュールが登録されているGoogleカレンダーです。",icon:"📅",display_order:2},{id:"link-nagareyama-league",title:"流山市少年野球連盟 公式サイト",url:"http://nagareyama-baseball.jp/",category:"公式・連盟",description:"市内大会の組み合わせトーナメント表、試合日程、グラウンド規程などが確認できます。",icon:"⚾",display_order:3},{id:"link-chiba-league",title:"千葉県少年野球連盟",url:"http://chiba-baseball.jp/",category:"公式・連盟",description:"千葉県大会の要項、大会結果、競技規則の最新情報が掲載されています。",icon:"🏆",display_order:4},{id:"link-ground-map",title:"主な活動グラウンド案内 (Google Maps)",url:"https://maps.google.com/",category:"グラウンド・施設",description:"ホームグラウンド（東小学校）および近隣の流山市内グラウンドへのアクセス地図一覧です。",icon:"📍",display_order:5},{id:"link-weather-forecast",title:"流山市のピンポイント天気予報 (tenki.jp)",url:"https://tenki.jp/forecast/3/15/4510/12220/",category:"便利ツール",description:"当日の雨雲レーダー、1時間ごとの降水確率、風速、WBGT（熱中症指数）を確認できます。",icon:"☀️",display_order:6},{id:"link-baseball-rules",title:"公認野球規則 & 少年野球特別規則",url:"https://japan-baseball.jp/",category:"便利ツール",description:"全日本軟式野球連盟（JSBB）による少年野球特別規程および公認野球規則の解説です。",icon:"📖",display_order:7}],xo=["すべて","配車マニュアル","チーム運営・規約","野球ルール・スコア","その他"],vo=["すべて","公式・連盟","グラウンド・施設","スケジュール・連絡","便利ツール","その他"];async function La({supabaseClient:e,currentUser:t,currentUserRole:n}){Ke=e,ht=t,Ps=n,en=n==="admin"||(t==null?void 0:t.can_edit_info)===!0||n==="leader"&&(t==null?void 0:t.can_edit_info)!==!1,al(),await sl(),await Dd({supabaseClient:Ke,currentUser:ht,currentUserRole:Ps,canManageInfo:en}),El(),_o(),Io()}function al(){document.querySelectorAll(".info-admin-only").forEach(n=>{en?n.classList.remove("hidden"):n.classList.add("hidden")});const t=document.getElementById("info-user-role-badge");t&&(Ps==="admin"?(t.className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-purple-100 text-purple-700 border border-purple-200",t.textContent="管理者 (編集可)"):en?(t.className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-teal-100 text-teal-700 border border-teal-200",t.textContent="編集可"):(t.className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-gray-100 text-gray-700 border border-gray-200",t.textContent="閲覧専用"))}async function sl(){let e=!1,t=!1,n=!1;if(Ke){try{const{data:a,error:s}=await Ke.from("info_documents").select("*").order("updated_at",{ascending:!1});!s&&a&&a.length>0&&(Xe=a,e=!0)}catch(a){console.warn("Supabase info_documents select failed:",a)}try{const{data:a,error:s}=await Ke.from("info_links").select("*").order("display_order",{ascending:!0});!s&&a&&a.length>0&&(Ye=a,t=!0)}catch(a){console.warn("Supabase info_links select failed:",a)}try{const{data:a,error:s}=await Ke.from("info_pages").select("*").eq("id","top_announcement").single();!s&&a&&a.content&&(Ln=a.content,n=!0)}catch(a){console.warn("Supabase info_pages select failed:",a)}}if(!e)try{const a=localStorage.getItem(Fa);a?Xe=JSON.parse(a):(Xe=[...Pr],localStorage.setItem(Fa,JSON.stringify(Xe)))}catch{Xe=[...Pr]}if(!t)try{const a=localStorage.getItem(Ha);a?Ye=JSON.parse(a):(Ye=[...Mr],localStorage.setItem(Ha,JSON.stringify(Ye)))}catch{Ye=[...Mr]}if(!n){const a=localStorage.getItem(ho);Ln=a!==null?a:nl}}async function wo(e,t=!1){const n=Xe.findIndex(a=>a.id===e.id);n>=0?Xe[n]=e:Xe.unshift(e);try{localStorage.setItem(Fa,JSON.stringify(Xe))}catch(a){console.error(a)}if(Ke)try{t?await Ke.from("info_documents").insert([e]):await Ke.from("info_documents").update(e).eq("id",e.id)}catch(a){console.warn("Supabase document save failed:",a)}}async function rl(e){Xe=Xe.filter(t=>t.id!==e);try{localStorage.setItem(Fa,JSON.stringify(Xe))}catch(t){console.error(t)}if(Ke)try{await Ke.from("info_documents").delete().eq("id",e)}catch(t){console.warn("Supabase document delete failed:",t)}}async function Eo(e,t=!1){const n=Ye.findIndex(a=>a.id===e.id);n>=0?Ye[n]=e:Ye.push(e);try{localStorage.setItem(Ha,JSON.stringify(Ye))}catch(a){console.error(a)}if(Ke)try{t?await Ke.from("info_links").insert([e]):await Ke.from("info_links").update(e).eq("id",e.id)}catch(a){console.warn("Supabase link save failed:",a)}}async function ol(e){Ye=Ye.filter(t=>t.id!==e);try{localStorage.setItem(Ha,JSON.stringify(Ye))}catch(t){console.error(t)}if(Ke)try{await Ke.from("info_links").delete().eq("id",e)}catch(t){console.warn("Supabase link delete failed:",t)}}async function il(e){Ln=e;try{localStorage.setItem(ho,e)}catch(t){console.error(t)}if(Ke)try{await Ke.from("info_pages").upsert([{id:"top_announcement",content:e,updated_at:new Date().toISOString(),updated_by:(ht==null?void 0:ht.name)||"管理者"}])}catch(t){console.warn("Supabase top_announcement save failed:",t)}_o()}function _o(){const e=document.getElementById("info-top-announcement-rendered"),t=document.getElementById("info-top-announcement-wrap");!e||!t||(Ln&&Ln.trim()?(t.classList.remove("hidden"),e.innerHTML=ts(Ln)):t.classList.add("hidden"))}function Io(){$o(),Pt==="docs"?na():Pt==="surveys"?Pn():aa()}function $o(){const e=document.getElementById("info-category-filters");if(!e)return;if(Pt==="surveys"){e.classList.add("hidden");return}e.classList.remove("hidden");const t=Pt==="docs"?xo:vo,n=Pt==="docs"?Ra:Oa;e.innerHTML=t.map(a=>`<button class="info-cat-btn px-3.5 py-1.5 text-xs rounded-full transition-all cursor-pointer ${n===a?"bg-teal-600 text-white shadow-sm font-bold":"bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}" data-category="${a}">${a}</button>`).join(""),e.querySelectorAll(".info-cat-btn").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-category");Pt==="docs"?(Ra=s,na()):(Oa=s,aa()),$o()})})}function na(){const e=document.getElementById("info-docs-container"),t=document.getElementById("info-docs-empty");if(!e)return;let n=Xe;if(Ra!=="すべて"&&(n=n.filter(a=>a.category===Ra)),ua.trim()){const a=ua.toLowerCase().trim();n=n.filter(s=>s.title&&s.title.toLowerCase().includes(a)||s.summary&&s.summary.toLowerCase().includes(a)||s.content&&s.content.toLowerCase().includes(a)||s.category&&s.category.toLowerCase().includes(a))}if(n.length===0){e.innerHTML="",t&&t.classList.remove("hidden");return}t&&t.classList.add("hidden"),e.innerHTML=n.map(a=>{const s=or(a.category),r=a.files?a.files.length:0;return`
            <div class="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between group">
                <div>
                    <div class="flex items-center justify-between gap-2 mb-2.5">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${s}">
                            ${a.category||"その他"}
                        </span>
                        <span class="text-[11px] text-gray-400 font-mono">更新: ${a.updated_at||"-"}</span>
                    </div>
                    <h3 class="text-base font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                        ${_t(a.title)}
                    </h3>
                    <p class="text-xs text-gray-600 line-clamp-3 mb-3 leading-relaxed">
                        ${_t(a.summary||a.content.slice(0,100))}
                    </p>
                    ${r>0?`
                    <div class="flex items-center gap-1.5 text-[11px] text-gray-500 mb-3 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-200">
                        <span>📎 添付ファイル:</span>
                        <span class="font-bold text-teal-700">${r} 件</span>
                    </div>
                    `:""}
                </div>
                <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <button class="btn-view-doc inline-flex items-center text-xs font-bold text-teal-600 hover:text-teal-700 transition cursor-pointer" data-id="${a.id}">
                        <span>閲覧する</span>
                        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                    ${en?`
                    <div class="flex items-center space-x-1">
                        <button class="btn-duplicate-doc text-xs text-gray-500 hover:text-green-600 p-1.5 rounded hover:bg-gray-100 transition cursor-pointer" data-id="${a.id}" title="複製">
                            📄
                        </button>
                        <button class="btn-edit-doc text-xs text-gray-500 hover:text-blue-600 p-1.5 rounded hover:bg-gray-100 transition cursor-pointer" data-id="${a.id}" title="編集">
                            ✏️
                        </button>
                        <button class="btn-delete-doc text-xs text-gray-500 hover:text-red-600 p-1.5 rounded hover:bg-gray-100 transition cursor-pointer" data-id="${a.id}" title="削除">
                            🗑️
                        </button>
                    </div>
                    `:""}
                </div>
            </div>
        `}).join(""),e.querySelectorAll(".btn-view-doc").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id"),r=Xe.find(o=>o.id===s);r&&cl(r)})}),en&&(e.querySelectorAll(".btn-duplicate-doc").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id");await dl(s)})}),e.querySelectorAll(".btn-edit-doc").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id"),r=Xe.find(o=>o.id===s);r&&So(r)})}),e.querySelectorAll(".btn-delete-doc").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id"),r=Xe.find(o=>o.id===s);r&&confirm(`ドキュメント「${r.title}」を削除しますか？`)&&(await rl(s),na())})}))}async function dl(e){const t=Xe.find(a=>a.id===e);if(!t)return;const n=JSON.parse(JSON.stringify(t));n.id=`doc_${Date.now()}`,n.title=`(複製) ${t.title}`,n.created_at=new Date().toISOString(),n.updated_at=new Date().toISOString(),n.author_name=(ht==null?void 0:ht.name)||"管理者",await wo(n,!0),na(),alert(`ドキュメント「${n.title}」を作成（複製）しました！`)}function aa(){const e=document.getElementById("info-links-container"),t=document.getElementById("info-links-empty");if(!e)return;let n=Ye;if(Oa!=="すべて"&&(n=n.filter(a=>a.category===Oa)),ua.trim()){const a=ua.toLowerCase().trim();n=n.filter(s=>s.title&&s.title.toLowerCase().includes(a)||s.description&&s.description.toLowerCase().includes(a)||s.url&&s.url.toLowerCase().includes(a)||s.category&&s.category.toLowerCase().includes(a))}if(n.length===0){e.innerHTML="",t&&t.classList.remove("hidden");return}t&&t.classList.add("hidden"),e.innerHTML=n.map(a=>{const s=or(a.category),r=a.icon||"🔗",o=a.url?a.url.replace(/^https?:\/\//,"").replace(/\/$/,""):"";return`
            <div class="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between group">
                <div>
                    <div class="flex items-center justify-between gap-2 mb-3">
                        <div class="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-xl shrink-0 border border-teal-100 shadow-xs">
                            ${r}
                        </div>
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${s}">
                            ${a.category||"その他"}
                        </span>
                    </div>
                    <h3 class="text-base font-bold text-gray-900 mb-1.5 group-hover:text-teal-600 transition-colors">
                        ${_t(a.title)}
                    </h3>
                    <p class="text-xs text-gray-400 font-mono mb-2 truncate" title="${_t(a.url)}">
                        ${_t(o)}
                    </p>
                    <p class="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3">
                        ${_t(a.description||"説明はありません")}
                    </p>
                </div>
                <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <a href="${_t(a.url)}" target="_blank" rel="noopener noreferrer" 
                       class="inline-flex items-center text-xs font-bold bg-teal-50 hover:bg-teal-600 text-teal-700 hover:text-white px-3 py-1.5 rounded-lg transition duration-150 cursor-pointer">
                        <span>サイトを開く</span>
                        <svg class="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                    ${en?`
                    <div class="flex items-center space-x-1">
                        <button class="btn-duplicate-link text-xs text-gray-500 hover:text-green-600 p-1.5 rounded hover:bg-gray-100 transition cursor-pointer" data-id="${a.id}" title="複製">
                            📄
                        </button>
                        <button class="btn-edit-link text-xs text-gray-500 hover:text-blue-600 p-1.5 rounded hover:bg-gray-100 transition cursor-pointer" data-id="${a.id}" title="編集">
                            ✏️
                        </button>
                        <button class="btn-delete-link text-xs text-gray-500 hover:text-red-600 p-1.5 rounded hover:bg-gray-100 transition cursor-pointer" data-id="${a.id}" title="削除">
                            🗑️
                        </button>
                    </div>
                    `:""}
                </div>
            </div>
        `}).join(""),en&&(e.querySelectorAll(".btn-duplicate-link").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id");await ll(s)})}),e.querySelectorAll(".btn-edit-link").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id"),r=Ye.find(o=>o.id===s);r&&ko(r)})}),e.querySelectorAll(".btn-delete-link").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id"),r=Ye.find(o=>o.id===s);r&&confirm(`リンク「${r.title}」を削除しますか？`)&&(await ol(s),aa())})}))}async function ll(e){const t=Ye.find(a=>a.id===e);if(!t)return;const n=JSON.parse(JSON.stringify(t));n.id=`link_${Date.now()}`,n.title=`(複製) ${t.title}`,n.created_at=new Date().toISOString(),n.display_order=(t.display_order||0)+1,await Eo(n,!0),aa(),alert(`リンク「${n.title}」を作成（複製）しました！`)}function or(e){switch(e){case"配車マニュアル":return"bg-blue-100 text-blue-800 border border-blue-200";case"チーム運営・規約":return"bg-amber-100 text-amber-800 border border-amber-200";case"野球ルール・スコア":return"bg-green-100 text-green-800 border border-green-200";case"公式・連盟":return"bg-purple-100 text-purple-800 border border-purple-200";case"グラウンド・施設":return"bg-emerald-100 text-emerald-800 border border-emerald-200";case"スケジュール・連絡":return"bg-sky-100 text-sky-800 border border-sky-200";case"便利ツール":return"bg-indigo-100 text-indigo-800 border border-indigo-200";default:return"bg-gray-100 text-gray-700 border border-gray-200"}}let qa=null;function cl(e){const t=document.getElementById("modal-info-doc-reader");if(!t)return;qa=e,document.getElementById("reader-doc-title").textContent=e.title,document.getElementById("reader-doc-category").textContent=e.category||"その他",document.getElementById("reader-doc-category").className=`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${or(e.category)}`,document.getElementById("reader-doc-updated").textContent=`最終更新: ${e.updated_at||"-"} (作成: ${e.created_by||"チーム"})`;const n=document.getElementById("reader-doc-files-container"),a=document.getElementById("reader-doc-files-list");n&&a&&(e.files&&e.files.length>0?(n.classList.remove("hidden"),a.innerHTML=e.files.map(r=>`
                <a href="${r.dataUrl||"#"}" download="${_t(r.name)}" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-teal-50 text-gray-700 hover:text-teal-700 border border-gray-200 text-xs font-bold transition">
                    <span>📎</span>
                    <span>${_t(r.name)}</span>
                    <span class="text-[10px] text-gray-400 font-normal">(${Math.round((r.size||0)/1024)}KB)</span>
                </a>
            `).join("")):(n.classList.add("hidden"),a.innerHTML=""));const s=document.getElementById("reader-doc-content");s&&(s.innerHTML=ts(e.content||"",!0),dr(s)),t.classList.remove("hidden")}function ul(){const e=document.getElementById("modal-info-doc-reader");e&&e.classList.add("hidden"),qa=null}function ml(){if(!qa)return;const e=qa,t=new Blob([e.content||""],{type:"text/markdown;charset=utf-8;"}),n=document.createElement("a");n.href=URL.createObjectURL(t),n.download=`${e.title||"document"}.md`,n.click()}let Ua=null,Bn=[];function So(e=null){const t=document.getElementById("modal-info-doc-editor");if(!t)return;Ua=e?e.id:null,Bn=e&&e.files?JSON.parse(JSON.stringify(e.files)):[],document.getElementById("doc-editor-modal-title").textContent=e?"ドキュメントの編集":"新規ドキュメント作成",document.getElementById("input-doc-title").value=e?e.title:"",document.getElementById("input-doc-summary").value=e&&e.summary||"",document.getElementById("input-doc-content").value=e?e.content:"";const n=document.getElementById("select-doc-category");n.innerHTML=xo.filter(a=>a!=="すべて").map(a=>`<option value="${a}" ${e&&e.category===a?"selected":""}>${a}</option>`).join(""),ir(),Rs("write"),t.classList.remove("hidden")}function Ms(){const e=document.getElementById("modal-info-doc-editor");e&&e.classList.add("hidden"),Ua=null,Bn=[]}function ir(){const e=document.getElementById("doc-editor-files-list");if(e){if(Bn.length===0){e.innerHTML='<span class="text-xs text-gray-400">添付ファイルはありません</span>';return}e.innerHTML=Bn.map((t,n)=>`
        <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 border border-gray-200 text-xs text-gray-700">
            <span>📎 ${_t(t.name)} (${Math.round((t.size||0)/1024)}KB)</span>
            <button class="btn-del-file text-red-500 hover:text-red-700 font-bold ml-1" data-index="${n}">✕</button>
        </div>
    `).join(""),e.querySelectorAll(".btn-del-file").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-index"));Bn.splice(n,1),ir()})})}}function pl(e){Array.from(e).forEach(t=>{if(t.size>5*1024*1024){alert(`ファイル「${t.name}」が5MBを超えているため添付できません。`);return}const n=new FileReader;n.onload=a=>{Bn.push({name:t.name,size:t.size,type:t.type,dataUrl:a.target.result}),ir()},n.readAsDataURL(t)})}function fl(e){if(!e)return;const t=new FileReader;t.onload=n=>{const a=n.target.result,s=document.getElementById("input-doc-title"),r=document.getElementById("input-doc-content");s&&(!s.value||s.value.trim()==="")&&(s.value=e.name.replace(/\.md$/i,"")),r&&(r.value=a)},t.readAsText(e)}function Rs(e){const t=document.getElementById("btn-doc-tab-write"),n=document.getElementById("btn-doc-tab-preview"),a=document.getElementById("input-doc-content"),s=document.getElementById("doc-preview-content");e==="write"?(t==null||t.classList.add("bg-white","text-teal-700","shadow-xs"),t==null||t.classList.remove("text-gray-500"),n==null||n.classList.remove("bg-white","text-teal-700","shadow-xs"),n==null||n.classList.add("text-gray-500"),a==null||a.classList.remove("hidden"),s==null||s.classList.add("hidden")):(n==null||n.classList.add("bg-white","text-teal-700","shadow-xs"),n==null||n.classList.remove("text-gray-500"),t==null||t.classList.remove("bg-white","text-teal-700","shadow-xs"),t==null||t.classList.add("text-gray-500"),a==null||a.classList.add("hidden"),s==null||s.classList.remove("hidden"),s&&a&&(s.innerHTML=ts(a.value||"*本文が入力されていません*"),dr(s)))}async function gl(){var i,d,l,c;const e=(i=document.getElementById("input-doc-title"))==null?void 0:i.value.trim(),t=(d=document.getElementById("select-doc-category"))==null?void 0:d.value,n=(l=document.getElementById("input-doc-summary"))==null?void 0:l.value.trim(),a=(c=document.getElementById("input-doc-content"))==null?void 0:c.value.trim();if(!e){alert("タイトルを入力してください");return}if(!a){alert("本文を入力してください");return}const s=new Date().toISOString().split("T")[0],r=!Ua,o={id:Ua||`doc_${Date.now()}`,title:e,category:t,summary:n||a.slice(0,100),content:a,files:Bn,created_by:(ht==null?void 0:ht.name)||"管理者",updated_at:s};await wo(o,r),Ms(),na()}function bl(){const e=document.getElementById("modal-info-top-editor");if(!e)return;const t=document.getElementById("input-info-top-content");t&&(t.value=Ln),Fs("write"),e.classList.remove("hidden")}function Os(){const e=document.getElementById("modal-info-top-editor");e&&e.classList.add("hidden")}function Fs(e){const t=document.getElementById("btn-top-tab-write"),n=document.getElementById("btn-top-tab-preview"),a=document.getElementById("input-info-top-content"),s=document.getElementById("top-preview-content");e==="write"?(t==null||t.classList.add("bg-white","text-teal-700","shadow-xs"),t==null||t.classList.remove("text-gray-500"),n==null||n.classList.remove("bg-white","text-teal-700","shadow-xs"),n==null||n.classList.add("text-gray-500"),a==null||a.classList.remove("hidden"),s==null||s.classList.add("hidden")):(n==null||n.classList.add("bg-white","text-teal-700","shadow-xs"),n==null||n.classList.remove("text-gray-500"),t==null||t.classList.remove("bg-white","text-teal-700","shadow-xs"),t==null||t.classList.add("text-gray-500"),a==null||a.classList.add("hidden"),s==null||s.classList.remove("hidden"),s&&a&&(s.innerHTML=ts(a.value||"*内容が入力されていません*"),dr(s)))}async function yl(){var t;const e=(t=document.getElementById("input-info-top-content"))==null?void 0:t.value;await il(e),Os()}let ia=null;function ko(e=null){const t=document.getElementById("modal-info-link-editor");if(!t)return;ia=e?e.id:null,document.getElementById("link-editor-modal-title").textContent=e?"リンクの編集":"新規リンク追加",document.getElementById("input-link-title").value=e?e.title:"",document.getElementById("input-link-url").value=e?e.url:"",document.getElementById("input-link-desc").value=e&&e.description||"",document.getElementById("input-link-icon").value=e&&e.icon||"🔗";const n=document.getElementById("select-link-category");n.innerHTML=vo.filter(a=>a!=="すべて").map(a=>`<option value="${a}" ${e&&e.category===a?"selected":""}>${a}</option>`).join(""),t.classList.remove("hidden")}function Hs(){const e=document.getElementById("modal-info-link-editor");e&&e.classList.add("hidden"),ia=null}async function hl(){var i,d,l,c,u,g;const e=(i=document.getElementById("input-link-title"))==null?void 0:i.value.trim(),t=(d=document.getElementById("input-link-url"))==null?void 0:d.value.trim(),n=(l=document.getElementById("select-link-category"))==null?void 0:l.value,a=(c=document.getElementById("input-link-desc"))==null?void 0:c.value.trim(),s=((u=document.getElementById("input-link-icon"))==null?void 0:u.value.trim())||"🔗";if(!e){alert("タイトルを入力してください");return}if(!t){alert("URLを入力してください");return}if(!t.startsWith("http://")&&!t.startsWith("https://")){alert("URLは http:// または https:// から入力してください");return}const r=!ia,o={id:ia||`link_${Date.now()}`,title:e,url:t,category:n,description:a,icon:s,display_order:r?Ye.length+1:((g=Ye.find(b=>b.id===ia))==null?void 0:g.display_order)||1,created_by:(ht==null?void 0:ht.name)||"管理者",updated_at:new Date().toISOString().split("T")[0]};await Eo(o,r),Hs(),aa()}const Lo=`-- ==========================================
-- Arinko Ants: Info & Surveys テーブル定義
-- Supabase の SQL Editor に貼り付けて実行してください
-- ==========================================

-- 1. app_users に can_use_info, can_edit_info カラムを追加
ALTER TABLE app_users 
ADD COLUMN IF NOT EXISTS can_use_info boolean DEFAULT true;
ALTER TABLE app_users 
ADD COLUMN IF NOT EXISTS can_edit_info boolean DEFAULT false;

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
`;function xl(){const e=document.getElementById("modal-info-sql");if(!e)return;const t=document.getElementById("info-sql-code");t&&(t.textContent=Lo),e.classList.remove("hidden")}function vl(){const e=document.getElementById("modal-info-sql");e&&e.classList.add("hidden")}function wl(){navigator.clipboard.writeText(Lo).then(()=>{alert(`SQL文をクリップボードにコピーしました！
Supabase Dashboardの「SQL Editor」で実行してください。`)}).catch(e=>{console.error("Copy failed:",e)})}let Rr=!1;function El(){var g,b,f,y,p,m,w,v,x,k,$,h,E,_,I,S,A,P,M;if(Rr)return;Rr=!0;const e=document.getElementById("tab-info-docs"),t=document.getElementById("tab-info-surveys"),n=document.getElementById("tab-info-links"),a=document.getElementById("view-info-docs"),s=document.getElementById("view-info-surveys"),r=document.getElementById("view-info-links"),o=document.getElementById("btn-info-new"),i=document.getElementById("btn-survey-new");function d(N){Pt=N,[e,t,n].forEach(G=>{G&&(G.className="px-4 py-2 font-bold text-gray-500 hover:text-gray-700 border-b-2 border-transparent transition-colors flex items-center space-x-2 cursor-pointer")}),[a,s,r].forEach(G=>G==null?void 0:G.classList.add("hidden")),N==="docs"?(e.className="px-4 py-2 font-bold text-teal-600 border-b-2 border-teal-600 transition-colors flex items-center space-x-2 cursor-pointer",a==null||a.classList.remove("hidden"),o&&(o.classList.remove("hidden"),o.textContent="＋ 新規ドキュメント"),i&&i.classList.add("hidden")):N==="surveys"?(t.className="px-4 py-2 font-bold text-teal-600 border-b-2 border-teal-600 transition-colors flex items-center space-x-2 cursor-pointer",s==null||s.classList.remove("hidden"),o&&o.classList.add("hidden"),i&&en&&i.classList.remove("hidden")):(n.className="px-4 py-2 font-bold text-teal-600 border-b-2 border-teal-600 transition-colors flex items-center space-x-2 cursor-pointer",r==null||r.classList.remove("hidden"),o&&(o.classList.remove("hidden"),o.textContent="＋ 新規リンク"),i&&i.classList.add("hidden")),Io()}e==null||e.addEventListener("click",()=>d("docs")),t==null||t.addEventListener("click",()=>d("surveys")),n==null||n.addEventListener("click",()=>d("links"));const l=document.getElementById("input-info-search");l==null||l.addEventListener("input",N=>{ua=N.target.value,Pt==="docs"?na():Pt==="links"&&aa()}),o==null||o.addEventListener("click",()=>{Pt==="docs"?So():Pt==="links"&&ko()}),(g=document.getElementById("btn-edit-top-announcement"))==null||g.addEventListener("click",bl),(b=document.getElementById("btn-close-top-editor"))==null||b.addEventListener("click",Os),(f=document.getElementById("btn-cancel-top-editor"))==null||f.addEventListener("click",Os),(y=document.getElementById("btn-top-tab-write"))==null||y.addEventListener("click",()=>Fs("write")),(p=document.getElementById("btn-top-tab-preview"))==null||p.addEventListener("click",()=>Fs("preview")),(m=document.getElementById("btn-save-top-announcement"))==null||m.addEventListener("click",yl),(w=document.getElementById("btn-close-doc-reader"))==null||w.addEventListener("click",ul),(v=document.getElementById("btn-export-doc-md"))==null||v.addEventListener("click",ml),(x=document.getElementById("btn-close-doc-editor"))==null||x.addEventListener("click",Ms),(k=document.getElementById("btn-cancel-doc-editor"))==null||k.addEventListener("click",Ms),($=document.getElementById("btn-doc-tab-write"))==null||$.addEventListener("click",()=>Rs("write")),(h=document.getElementById("btn-doc-tab-preview"))==null||h.addEventListener("click",()=>Rs("preview")),(E=document.getElementById("btn-save-doc"))==null||E.addEventListener("click",gl);const c=document.getElementById("input-doc-attach-files");c==null||c.addEventListener("change",N=>{N.target.files&&pl(N.target.files)});const u=document.getElementById("input-doc-import-md");u==null||u.addEventListener("change",N=>{N.target.files&&N.target.files[0]&&fl(N.target.files[0])}),(_=document.getElementById("btn-close-link-editor"))==null||_.addEventListener("click",Hs),(I=document.getElementById("btn-cancel-link-editor"))==null||I.addEventListener("click",Hs),(S=document.getElementById("btn-save-link"))==null||S.addEventListener("click",hl),(A=document.getElementById("btn-info-sql-modal"))==null||A.addEventListener("click",xl),(P=document.getElementById("btn-close-info-sql"))==null||P.addEventListener("click",vl),(M=document.getElementById("btn-copy-info-sql"))==null||M.addEventListener("click",wl)}function ts(e,t=!1){if(!e)return"";const n=e.split(`
`);let a="",s=!1,r=!1,o=!1,i="",d=!1,l=[],c=!1,u="",g="";const b=[];function f(){s&&(a+=`</ul>
`,s=!1),r&&(a+=`</ol>
`,r=!1),d&&(a+=Or(l),l=[],d=!1),c&&(a+=_l(u,g),g="",c=!1)}for(let y=0;y<n.length;y++){let p=n[y];if(p.trim().startsWith("```")){o?(a+=`
                    <div class="relative my-3 group">
                        <pre class="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-xs font-mono border border-gray-800 leading-relaxed"><code>${_t(i.trim())}</code></pre>
                        <button class="btn-copy-code absolute top-2 right-2 px-2 py-1 text-[10px] font-bold rounded bg-gray-800 text-gray-300 hover:text-white border border-gray-700 opacity-0 group-hover:opacity-100 transition">コピー</button>
                    </div>
`,i="",o=!1):(f(),o=!0,p.trim().slice(3).trim());continue}if(o){i+=p+`
`;continue}const m=p.trim().match(/^>\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]/i);if(m){f(),c=!0,u=m[1].toUpperCase(),g="";continue}if(c)if(p.startsWith(">")){g+=p.replace(/^>\s?/,"")+`
`;continue}else f();if(p.trim().startsWith("|")&&p.trim().endsWith("|")){d||(f(),d=!0,l=[]),l.push(p.trim());continue}else d&&(a+=Or(l),l=[],d=!1);if(p.trim()===""){f();continue}if(/^(\*{3,}|-{3,}|_{3,})$/.test(p.trim())){f(),a+=`<hr class="my-6 border-t border-gray-200">
`;continue}if(p.startsWith("# ")){f();const x=p.slice(2).trim(),k=`heading-${b.length}`;b.push({level:1,text:x,id:k}),a+=`<h1 id="${k}" class="text-2xl font-bold text-gray-900 mt-6 mb-3 pb-2 border-b border-gray-200">${$t(x)}</h1>
`;continue}if(p.startsWith("## ")){f();const x=p.slice(3).trim(),k=`heading-${b.length}`;b.push({level:2,text:x,id:k}),a+=`<h2 id="${k}" class="text-xl font-bold text-gray-800 mt-5 mb-2.5">${$t(x)}</h2>
`;continue}if(p.startsWith("### ")){f();const x=p.slice(4).trim(),k=`heading-${b.length}`;b.push({level:3,text:x,id:k}),a+=`<h3 id="${k}" class="text-lg font-bold text-gray-800 mt-4 mb-2">${$t(x)}</h3>
`;continue}if(p.startsWith("#### ")){f();const x=p.slice(5).trim();a+=`<h4 class="text-base font-semibold text-gray-700 mt-3 mb-1.5">${$t(x)}</h4>
`;continue}if(p.startsWith("> ")){f(),a+=`<blockquote class="border-l-4 border-teal-500 pl-4 py-1.5 my-3 bg-teal-50/50 text-xs text-gray-700 rounded-r">${$t(p.slice(2))}</blockquote>
`;continue}const w=p.trim().match(/^[-*]\s*\[([ xX])\]\s*(.*)/);if(w){f();const x=w[1].toLowerCase()==="x";a+=`
                <div class="flex items-center gap-2 my-1 text-xs text-gray-700">
                    <input type="checkbox" ${x?"checked":""} disabled class="rounded text-teal-600">
                    <span class="${x?"line-through text-gray-400":""}">${$t(w[2])}</span>
                </div>
`;continue}if(p.trim().startsWith("- ")||p.trim().startsWith("* ")){r&&(a+=`</ol>
`,r=!1),s||(a+=`<ul class="list-disc list-inside my-2 space-y-1 text-xs text-gray-700 leading-relaxed">
`,s=!0);const x=p.trim().slice(2);a+=`  <li>${$t(x)}</li>
`;continue}const v=p.trim().match(/^(\d+)\.\s+(.*)/);if(v){s&&(a+=`</ul>
`,s=!1),r||(a+=`<ol class="list-decimal list-inside my-2 space-y-1 text-xs text-gray-700 leading-relaxed">
`,r=!0),a+=`  <li>${$t(v[2])}</li>
`;continue}f(),a+=`<p class="my-2 text-xs text-gray-700 leading-relaxed">${$t(p)}</p>
`}return f(),t&&b.length>=2&&(a=`
            <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                <span class="text-xs font-bold text-gray-700 block mb-2">📑 目次</span>
                <ul class="space-y-1 text-xs">
                    ${b.map(p=>`
                        <li class="${p.level===2?"pl-3":p.level===3?"pl-6":""}">
                            <a href="#${p.id}" class="text-teal-600 hover:text-teal-800 hover:underline">
                                ${_t(p.text)}
                            </a>
                        </li>
                    `).join("")}
                </ul>
            </div>
        `+a),a}function _l(e,t){let n="border-teal-500",a="bg-teal-50/70",s="text-teal-800",r="ℹ️",o="NOTE";e==="TIP"?(n="border-emerald-500",a="bg-emerald-50/70",s="text-emerald-800",r="💡",o="TIP"):e==="WARNING"||e==="CAUTION"?(n="border-amber-500",a="bg-amber-50/70",s="text-amber-800",r="⚠️",o="WARNING"):e==="IMPORTANT"&&(n="border-blue-500",a="bg-blue-50/70",s="text-blue-800",r="📌",o="IMPORTANT");const i=t.split(`
`).filter(d=>d.trim()).map(d=>`<p class="my-1 text-xs text-gray-700 leading-relaxed">${$t(d)}</p>`).join("");return`
        <div class="border-l-4 ${n} ${a} p-3.5 my-3 rounded-r-xl border border-gray-200/50">
            <div class="flex items-center gap-1.5 font-bold text-xs ${s} mb-1">
                <span>${r}</span>
                <span>${o}</span>
            </div>
            ${i}
        </div>
    `}function Or(e){if(e.length<2)return"";let t='<div class="overflow-x-auto my-4 scrollbar-thin"><table class="min-w-full text-xs border border-gray-200 rounded-xl overflow-hidden">';const n=e[0].split("|").slice(1,-1).map(a=>a.trim());t+='<thead class="bg-gray-50 border-b border-gray-200"><tr>',n.forEach(a=>{t+=`<th class="px-3.5 py-2.5 text-left font-bold text-gray-700 border-r border-gray-200 last:border-r-0">${$t(a)}</th>`}),t+="</tr></thead><tbody>";for(let a=2;a<e.length;a++){const s=e[a].split("|").slice(1,-1).map(r=>r.trim());t+=`<tr class="${a%2===0?"bg-white":"bg-gray-50/40"} border-b border-gray-100 last:border-b-0 hover:bg-teal-50/30">`,s.forEach(r=>{t+=`<td class="px-3.5 py-2.5 text-gray-600 border-r border-gray-100 last:border-r-0">${$t(r)}</td>`}),t+="</tr>"}return t+="</tbody></table></div>",t}function $t(e){if(!e)return"";let t=_t(e);return t=t.replace(/\*\*(.*?)\*\*/g,'<strong class="font-bold text-gray-900">$1</strong>'),t=t.replace(/\*(.*?)\*/g,'<em class="italic">$1</em>'),t=t.replace(/`([^`]+)`/g,'<code class="px-1.5 py-0.5 bg-gray-100 text-teal-700 rounded text-[11px] font-mono border border-gray-200">$1</code>'),t=t.replace(/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer" class="text-teal-600 hover:text-teal-800 underline font-semibold">$1 ↗</a>'),t}function dr(e){e.querySelectorAll(".btn-copy-code").forEach(t=>{t.addEventListener("click",()=>{var a;const n=((a=t.parentElement.querySelector("code"))==null?void 0:a.textContent)||"";navigator.clipboard.writeText(n).then(()=>{const s=t.textContent;t.textContent="コピー完了！",setTimeout(()=>{t.textContent=s},2e3)})})})}function _t(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}const Bo={},Il="https://arcdgbzqfengqyvfbodt.supabase.co",$l="sb_publishable_Ei6ti5lKjAECmi36haftpw_DQsKMp4p",Yn=Bo?"https://arcdgbzqfengqyvfbodt.supabase.co":Il,ja=Bo?"sb_publishable_Ei6ti5lKjAECmi36haftpw_DQsKMp4p":$l;Yn.startsWith("https://")||console.warn("設定警告: VITE_SUPABASE_URL に https:// が含まれていません。値: "+Yn);console.log("Checking Supabase URL:","Exists");if(!window.supabaseClient&&window.supabase&&window.supabase.createClient&&Yn&&ja)try{window.supabaseClient=window.supabase.createClient(Yn,ja)}catch(e){console.error("Supabase初期化エラー:",e)}const L=window.supabaseClient||null;let Y=null,Kn=!1,qe="user";function ns(e){return e=e.trim(),e?e.includes("@")?e:`${e}@ants.local`:""}function Tn(e){return e?e.endsWith("@ants.local")?e.split("@")[0]:e:""}let Wn=0,Ct=null;function Sl(e){const t=document.getElementById("loading-overlay");if(t){const n=t.querySelector("span");n&&(n.textContent=e)}Ct||(Ct=document.createElement("div"),Ct.id="loading-detail-text",Ct.className="fixed bottom-2 right-2 text-xs md:text-sm font-bold text-gray-600 bg-white/90 border border-gray-300 px-3 py-1.5 rounded shadow-lg pointer-events-none z-[9999] transition-opacity duration-300",document.body.appendChild(Ct)),Ct.textContent=e,Ct.style.opacity="1"}function z(e="通信中..."){Wn++;const t=document.getElementById("loading-overlay");t&&Wn===1&&t.classList.remove("hidden"),Sl(e)}function V(){var e;Wn--,Wn<=0&&(Wn=0,(e=document.getElementById("loading-overlay"))==null||e.classList.add("hidden"),Ct&&(Ct.style.opacity="0"))}function at(){var e;Wn=0,(e=document.getElementById("loading-overlay"))==null||e.classList.add("hidden"),Ct&&(Ct.style.opacity="0")}async function Ne(e,t="通信中..."){z(t);try{return await e()}catch(n){throw console.error("Supabase DB Error:",n),at(),n.message==="Load failed"||n.message==="Failed to fetch"?alert(`サーバー通信エラー: 通信に失敗しました。
ネットワーク接続、または環境変数(Supabase URL)の設定が正しいか確認してください。`):alert(`サーバー通信エラー:
`+n.message),n}finally{V()}}async function be(e,t){if(Y&&e!=="NAVIGATE")try{await L.from("action_logs").insert({user_email:Y.email,action_type:e,details:t})}catch(n){console.error("Log error:",n)}}function Fr(){var e,t,n,a,s,r,o,i,d,l,c,u,g,b,f,y,p,m,w,v,x,k,$,h,E,_,I,S,A,P,M,N,G,R,B,C,T,F,X,W,Z,j,Q,H,re,oe;if(!window.isDomInitialized)try{if(window.isDomInitialized=!0,document.title="bb-sys for arinko ants.",document.body){const K=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,!1);let pe;for(;pe=K.nextNode();)pe.nodeValue.includes("配車調整アプリ")&&(pe.nodeValue=pe.nodeValue.replace(/配車調整アプリ/g,"bb-sys for arinko ants.")),pe.nodeValue.includes("少年野球に役立つツール for arinko ants.")&&(pe.nodeValue=pe.nodeValue.replace(/少年野球に役立つツール for arinko ants./g,"bb-sys for arinko ants."))}document.documentElement.style.setProperty("--layout-columns",js),window.addEventListener("resize",qr),qr(),(e=document.getElementById("btn-login"))==null||e.addEventListener("click",Hr),(t=document.getElementById("auth-form"))==null||t.addEventListener("submit",Hr),(n=document.getElementById("btn-logout"))==null||n.addEventListener("click",_a),(a=document.getElementById("btn-logout-menu"))==null||a.addEventListener("click",_a),(s=document.getElementById("btn-clear-cache"))==null||s.addEventListener("click",kl),(r=document.getElementById("link-to-signup"))==null||r.addEventListener("click",K=>{K.preventDefault(),se("signup-view")}),(o=document.getElementById("link-to-reset"))==null||o.addEventListener("click",K=>{K.preventDefault(),se("password-reset-view")}),document.querySelectorAll(".link-back-to-login").forEach(K=>K.addEventListener("click",pe=>{pe.preventDefault(),se("auth-view")})),(i=document.getElementById("btn-submit-signup"))==null||i.addEventListener("click",Ll),(d=document.getElementById("btn-send-reset"))==null||d.addEventListener("click",Bl),(l=document.getElementById("btn-update-password"))==null||l.addEventListener("click",Al),(c=document.getElementById("btn-change-password"))==null||c.addEventListener("click",()=>{var K;(K=document.getElementById("change-password-modal"))==null||K.classList.remove("hidden")}),(u=document.getElementById("btn-close-change-password"))==null||u.addEventListener("click",()=>{var K;(K=document.getElementById("change-password-modal"))==null||K.classList.add("hidden")}),(g=document.getElementById("btn-submit-change-password"))==null||g.addEventListener("click",Tl);const he=document.getElementById("btn-change-password");he&&(he.textContent="パスワード変更"),(b=document.getElementById("nav-users"))==null||b.addEventListener("click",ma),(f=document.getElementById("btn-admin-add-user"))==null||f.addEventListener("click",adminAddUser),(y=document.getElementById("btn-reload-users"))==null||y.addEventListener("click",xe),(p=document.getElementById("btn-save-all-users"))==null||p.addEventListener("click",Dl),(m=document.getElementById("admin-users-sort"))==null||m.addEventListener("change",K=>{localStorage.setItem("admin_users_sort",K.target.value),xe()}),(w=document.getElementById("btn-export-users"))==null||w.addEventListener("click",vc),(v=document.getElementById("btn-import-users"))==null||v.addEventListener("click",()=>document.getElementById("input-import-users-csv").click()),(x=document.getElementById("btn-download-users-sample"))==null||x.addEventListener("click",Ic),(k=document.getElementById("input-import-users-csv"))==null||k.addEventListener("change",wc),($=document.getElementById("btn-close-csv-modal"))==null||$.addEventListener("click",Wa),(h=document.getElementById("btn-close-csv-modal-x"))==null||h.addEventListener("click",Wa),(E=document.getElementById("btn-execute-csv-import"))==null||E.addEventListener("click",Ec);const Te=document.getElementById("btn-admin-add-user");if(Te&&!document.getElementById("btn-admin-add-dummy-user")){const K=document.createElement("button");K.id="btn-admin-add-dummy-user",K.className="ml-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow font-bold text-sm",K.textContent="代行専用メンバー追加",K.onclick=adminAddDummyUser,(_=Te.parentNode)==null||_.appendChild(K)}const tt=document.querySelector("#view-master #btn-load-logs");tt&&tt.remove();const me=document.querySelector("#view-master #log-list");if(me){const K=me.closest(".bg-white");K?K.remove():me.remove()}document.querySelectorAll("#view-master h2").forEach(K=>{K.textContent.includes("操作ログ")&&K.remove()});const ot=document.getElementById("tab-master-admin");if(ot&&!document.getElementById("tab-logs-admin")){const K=ot.parentElement,pe=document.createElement("button");pe.id="tab-logs-admin",pe.className="px-4 py-2 font-bold text-gray-500 hover:text-gray-700 border-b-2 border-transparent transition-colors",pe.textContent="操作ログ",K==null||K.appendChild(pe);const D=document.createElement("div");D.id="tab-content-logs-admin",D.className="hidden",D.innerHTML=`
                <div class="mb-4 flex space-x-2 mt-4">
                    <button id="btn-load-logs" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow font-bold">最新を読み込み</button>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
                    <div id="log-list" class="min-w-[600px] text-sm flex flex-col">
                        <p class="text-gray-500 py-4 text-center">「最新を読み込み」ボタンを押してください</p>
                    </div>
                </div>
            `;const q=document.getElementById("tab-content-master-admin");q&&q.parentElement&&q.parentElement.appendChild(D)}const He=K=>{[{btnId:"tab-users-admin",contentId:"tab-content-users-admin"},{btnId:"tab-master-admin",contentId:"tab-content-master-admin"},{btnId:"tab-logs-admin",contentId:"tab-content-logs-admin"}].forEach(D=>{const q=document.getElementById(D.btnId),fe=document.getElementById(D.contentId);!q||!fe||(D.btnId===K?(q.className="px-4 py-2 font-bold text-blue-600 border-b-2 border-blue-600 transition-colors",fe.classList.remove("hidden"),K==="tab-logs-admin"&&pa()):(q.className="px-4 py-2 font-bold text-gray-500 hover:text-gray-700 border-b-2 border-transparent transition-colors",fe.classList.add("hidden")))})};(I=document.getElementById("tab-users-admin"))==null||I.addEventListener("click",()=>He("tab-users-admin")),(S=document.getElementById("tab-master-admin"))==null||S.addEventListener("click",()=>He("tab-master-admin")),(A=document.getElementById("tab-logs-admin"))==null||A.addEventListener("click",()=>He("tab-logs-admin")),(P=document.getElementById("btn-load-logs"))==null||P.addEventListener("click",pa),(M=document.getElementById("btn-app-dispatch"))==null||M.addEventListener("click",()=>{var K;se("app-view","dispatch"),Kn?(K=document.getElementById("nav-dispatch"))==null||K.click():Us()}),(N=document.getElementById("btn-app-attendance"))==null||N.addEventListener("click",async()=>{se("attendance-view"),await Ne(ws,"出欠管理画面を準備中...")}),(G=document.getElementById("btn-app-dashboard"))==null||G.addEventListener("click",async()=>{await Ne(Is,"ダッシュボードを準備中..."),se("dashboard-view")}),(R=document.getElementById("btn-app-info"))==null||R.addEventListener("click",async()=>{await Ne(async()=>{await La({supabaseClient:L,currentUser:Y,currentUserRole:qe})},"Info画面を準備中..."),se("info-view")}),(B=document.getElementById("btn-back-to-menu-info"))==null||B.addEventListener("click",()=>se("app-menu-view")),(C=document.getElementById("btn-logout-info"))==null||C.addEventListener("click",_a),(T=document.getElementById("btn-back-to-menu"))==null||T.addEventListener("click",()=>{se("app-menu-view")}),(F=document.getElementById("btn-back-to-menu-att"))==null||F.addEventListener("click",()=>se("app-menu-view")),(X=document.getElementById("btn-logout-att"))==null||X.addEventListener("click",_a),(W=document.getElementById("btn-change-password-menu"))==null||W.addEventListener("click",lr);const Ft=(Z=document.getElementById("app-menu-view"))==null?void 0:Z.querySelector(".space-y-4");Ft&&(Ft.className="w-full max-w-xs mx-auto space-y-3 mt-4");const Dt=document.getElementById("btn-app-dispatch");Dt&&(Dt.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-blue-600 hover:bg-blue-700 hover:shadow-lg text-white text-left",Dt.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">🚗</span><span>配車調整</span></div><span class="text-white/60 text-sm font-normal">❯</span>');const xt=document.getElementById("btn-app-attendance");xt&&(xt.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-green-600 hover:bg-green-700 hover:shadow-lg text-white text-left",xt.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">📅</span><span>出欠管理</span></div><span class="text-white/60 text-sm font-normal">❯</span>');const vt=document.getElementById("btn-app-simulator");vt&&(vt.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-amber-600 hover:bg-amber-700 hover:shadow-lg text-white text-left",vt.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">⚾</span><span>ポジション設定</span></div><span class="text-white/60 text-sm font-normal">❯</span>',vt.onclick=()=>{se("position-simulator-view"),ka()});const gt=document.getElementById("btn-app-info");gt&&(gt.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-teal-600 hover:bg-teal-700 hover:shadow-lg text-white text-left",gt.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">ℹ️</span><span>Info</span></div><span class="text-white/60 text-sm font-normal">❯</span>',gt.onclick=async()=>{await Ne(async()=>{await La({supabaseClient:L,currentUser:Y,currentUserRole:qe})},"Info画面を準備中..."),se("info-view")}),(j=document.getElementById("nav-info"))==null||j.addEventListener("click",async()=>{await Ne(async()=>{await La({supabaseClient:L,currentUser:Y,currentUserRole:qe})},"Info画面を準備中..."),se("info-view")}),(Q=document.getElementById("nav-simulator"))==null||Q.addEventListener("click",()=>{se("position-simulator-view"),ka()}),(H=document.getElementById("nav-simulator-att"))==null||H.addEventListener("click",()=>{se("position-simulator-view"),ka()}),(re=document.getElementById("nav-dispatch-sim"))==null||re.addEventListener("click",()=>{var K;se("app-view","dispatch"),Kn?(K=document.getElementById("nav-dispatch"))==null||K.click():Us()}),(oe=document.getElementById("nav-attendance-sim"))==null||oe.addEventListener("click",async()=>{se("attendance-view"),await Ne(ws,"出欠管理画面を準備中...")})}catch(he){console.error("DOM Initialization failed:",he),at(),se("auth-view")}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Fr):setTimeout(Fr,0);let qs=!1;function Va(e,t=null){if(qs)return;const n="#"+e+(t?"-"+t:"");window.location.hash!==n&&history.pushState({screenId:e,subView:t},"",n)}function se(e,t=null){["auth-view","signup-view","password-reset-view","password-update-view","app-menu-view","app-view","attendance-view","view-users","dashboard-view","dashboard-settings","position-simulator-view","info-view","survey-respond-view"].forEach(a=>{const s=document.getElementById(a);s&&s.classList.add("hidden")});const n=document.getElementById(e);n&&n.classList.remove("hidden"),Va(e,t),e!=="auth-view"&&e!=="survey-respond-view"&&Y&&be("NAVIGATE",`画面遷移: ${e}${t?" > "+t:""}`)}function Ba(){let e=null,t=null,n=null;try{const a=new URLSearchParams(window.location.search);e=a.get("survey"),t=a.get("response"),n=a.get("d");let s=window.location.hash||"";if(s.startsWith("#/")&&(s="#"+s.substring(2)),s.includes("?")){const[r,o]=s.split("?");s=r;try{const i=new URLSearchParams(o);e||(e=i.get("survey")),t||(t=i.get("response")),n||(n=i.get("d"))}catch{}}if(s.startsWith("#survey-")||s.startsWith("#survey=")){const o=(s.startsWith("#survey-")?s.replace("#survey-",""):s.replace("#survey=","")).split("&");e||(e=o[0]);for(let i=1;i<o.length;i++){const d=o[i],l=d.indexOf("=");if(l!==-1){const c=d.substring(0,l),u=d.substring(l+1);c==="response"&&u&&!t&&(t=u),c==="d"&&u&&!n&&(n=u)}}}}catch(a){console.warn("parseSurveyUrlParams error:",a)}if(e)try{e=decodeURIComponent(e).trim().replace(/^\/+|\/+$/g,"")}catch{}if(t)try{t=decodeURIComponent(t).trim()}catch{}return{surveyId:e,responseId:t,surveyData:n||null}}window.addEventListener("popstate",async e=>{var t,n;qs=!0;try{const{surveyId:a,responseId:s,surveyData:r}=Ba();if(a){await Gn(a,s,r);return}e.state&&e.state.screenId?(se(e.state.screenId,e.state.subView),e.state.screenId==="app-view"&&(e.state.subView==="users"?await ma():e.state.subView==="master"?(t=document.getElementById("nav-master"))==null||t.click():(n=document.getElementById("nav-dispatch"))==null||n.click())):se(Y?"app-menu-view":"auth-view")}finally{qs=!1}});L&&L.auth.onAuthStateChange(async(e,t)=>{if(e==="PASSWORD_RECOVERY"){se("password-update-view");return}if(t&&Kn&&Y&&(e==="TOKEN_REFRESHED"||e==="USER_UPDATED")){console.log(`Bypassing auth state change handling for event: ${e}`);return}const n=async()=>{var o,i,d,l,c,u,g,b;const{surveyId:a,responseId:s,surveyData:r}=Ba();if(a){if(at(),t){Y={...t.user};try{const{data:f}=await L.from("app_users").select("name, role").eq("email",Y.email).single();f&&(Y.name=f.name,qe=f.role)}catch{}}await Gn(a,s,r);return}if(t){z("ユーザー権限確認中...");try{const f=!Y||Y.id!==t.user.id;Y={...t.user},f&&await be("LOGIN","ログインしました");let y=!0,p=!0,m=!0,w=!0,v=!0,x=!1;try{let{data:H,error:re}=await L.from("app_users").select("role, name, can_use_dispatch, can_use_dashboard, can_use_attendance, can_use_simulator, can_use_info, can_edit_info").eq("email",Y.email).single();if(re){const{data:oe}=await L.from("app_users").select("role, name, can_use_dispatch, can_use_dashboard, can_use_attendance, can_use_simulator, can_use_info").eq("email",Y.email).single();H=oe}H?(qe=H.role,Y.name=H.name,H.can_use_dispatch===!1&&(y=!1),H.can_use_dashboard===!1&&(p=!1),H.can_use_attendance===!1&&(m=!1),H.can_use_simulator===!1&&(w=!1),H.can_use_info===!1&&(v=!1),x=H.can_edit_info===!0):qe="user"}catch{qe="user"}Y.email==="hishinumak@gmail.com"&&(qe="admin"),qe==="admin"?(y=!0,p=!0,m=!0,w=!0,v=!0,x=!0):qe==="leader"&&x===!1&&(x=!0),Y.can_use_info=v,Y.can_edit_info=x;let k=document.getElementById("btn-app-dashboard");if(p)if(k)k.classList.remove("hidden");else{const H=((o=document.getElementById("app-menu-view"))==null?void 0:o.querySelector(".space-y-3"))||((i=document.getElementById("app-menu-view"))==null?void 0:i.querySelector(".space-y-4"))||((d=document.getElementById("app-menu-view"))==null?void 0:d.querySelector(".grid"));H&&(k=document.createElement("button"),k.id="btn-app-dashboard",k.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg text-white text-left",k.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">📊</span><span>分析</span></div><span class="text-white/60 text-sm font-normal">❯</span>',k.onclick=async()=>{await Ne(Is,"ダッシュボードを準備中..."),se("dashboard-view")},H.appendChild(k))}else k&&k.classList.add("hidden");const $=document.getElementById("nav-users"),h=document.getElementById("nav-master"),E=document.getElementById("nav-dispatch"),_=document.getElementById("btn-app-dispatch"),I=document.getElementById("btn-goto-master"),S=document.getElementById("clear-db-button");let A=document.getElementById("btn-app-users-admin");if($==null||$.classList.add("hidden"),qe==="admin"?(E==null||E.classList.remove("hidden"),h==null||h.classList.remove("hidden")):qe==="leader"?(E==null||E.classList.remove("hidden"),h==null||h.classList.add("hidden")):(E==null||E.classList.add("hidden"),h==null||h.classList.add("hidden")),qe==="admin")if(I==null||I.classList.remove("hidden"),S==null||S.classList.remove("hidden"),A)A.classList.remove("hidden");else{const H=((l=document.getElementById("app-menu-view"))==null?void 0:l.querySelector(".space-y-3"))||((c=document.getElementById("app-menu-view"))==null?void 0:c.querySelector(".space-y-4"))||((u=document.getElementById("app-menu-view"))==null?void 0:u.querySelector(".grid"));H&&(A=document.createElement("button"),A.id="btn-app-users-admin",A.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-purple-600 hover:bg-purple-700 hover:shadow-lg text-white text-left order-last",A.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">⚙️</span><span>管理者メニュー</span></div><span class="text-white/60 text-sm font-normal">❯</span>',A.onclick=()=>Ao(),H.appendChild(A))}else I==null||I.classList.add("hidden"),S==null||S.classList.add("hidden"),A&&A.classList.add("hidden");y?_==null||_.classList.remove("hidden"):_==null||_.classList.add("hidden");const P=document.getElementById("btn-app-attendance");m?P==null||P.classList.remove("hidden"):P==null||P.classList.add("hidden");const M=document.getElementById("btn-app-simulator"),N=document.getElementById("nav-simulator"),G=document.getElementById("nav-simulator-att"),R=document.getElementById("nav-dispatch-sim"),B=document.getElementById("nav-attendance-sim");w?(M==null||M.classList.remove("hidden"),N==null||N.classList.remove("hidden"),G==null||G.classList.remove("hidden")):(M==null||M.classList.add("hidden"),N==null||N.classList.add("hidden"),G==null||G.classList.add("hidden")),y?R==null||R.classList.remove("hidden"):R==null||R.classList.add("hidden"),m?B==null||B.classList.remove("hidden"):B==null||B.classList.add("hidden");const C=document.getElementById("btn-app-info"),T=document.getElementById("nav-info");v?(C==null||C.classList.remove("hidden"),T==null||T.classList.remove("hidden")):(C==null||C.classList.add("hidden"),T==null||T.classList.add("hidden"));const F=document.getElementById("user-email-display");F&&(F.textContent=Y.name||Tn(Y.email));const X=document.getElementById("sim-user-email-display");X&&(X.textContent=Y.name||Tn(Y.email));const{surveyId:W,responseId:Z,surveyData:j}=Ba();if(W){await Gn(W,Z,j);return}const Q=window.location.hash;if(Q&&Q!=="#app-menu-view"&&Q!=="#auth-view"){const H=["app-view","attendance-view","dashboard-view","position-simulator-view","info-view"];let re=!1;for(const oe of H)if(Q.startsWith("#"+oe)){const he=Q.length>oe.length+1?Q.substring(oe.length+2):null;oe==="app-view"?(se("app-view",he),Kn?he==="users"?ma():he==="master"?(g=document.getElementById("nav-master"))==null||g.click():(b=document.getElementById("nav-dispatch"))==null||b.click():Us().then(()=>{var Te,tt;he==="users"?ma():he==="master"?(Te=document.getElementById("nav-master"))==null||Te.click():(tt=document.getElementById("nav-dispatch"))==null||tt.click()}).catch(Te=>{console.error("App init error:",Te),at()})):oe==="attendance-view"?(se("attendance-view"),ws().catch(Te=>{console.error("Attendance init error:",Te),at()})):oe==="dashboard-view"?(se("dashboard-view"),Is().catch(Te=>{console.error("Dashboard init error:",Te),at()})):oe==="position-simulator-view"?(se("position-simulator-view"),ka()):oe==="info-view"&&(se("info-view"),La({supabaseClient:L,currentUser:Y,currentUserRole:qe}).catch(Te=>{console.error("Info init error:",Te),at()})),re=!0;break}re||se("app-menu-view")}else se("app-menu-view")}catch(f){console.error("Auth state handling error:",f),at()}finally{V()}}else{Y=null,at();const{surveyId:f,responseId:y,surveyData:p}=Ba();if(f){await Gn(f,y,p);return}const m=document.getElementById("password-update-view");(!m||m.classList.contains("hidden"))&&se("auth-view")}};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{n().catch(console.error)}):setTimeout(()=>{n().catch(console.error)},0)});async function kl(e){if(e&&e.preventDefault&&e.preventDefault(),!!confirm(`ブラウザに保存されているログイン情報（キャッシュ）をクリアして、ページを再読み込みしますか？
（動作がおかしい・ログインできない場合にお試しください）`)){z("キャッシュクリア中...");try{await L.auth.signOut().catch(()=>{});const t=[];for(let n=0;n<localStorage.length;n++){const a=localStorage.key(n);a&&a.startsWith("sb-")&&t.push(a)}t.forEach(n=>localStorage.removeItem(n)),alert("キャッシュをクリアしました。ページを再読み込みします。"),location.reload()}catch{at()}}}let gs=!1;async function Hr(e){var r,o;if(e&&e.preventDefault&&e.preventDefault(),gs)return;const t=((r=document.getElementById("email-address"))==null?void 0:r.value)||"",n=ns(t),a=((o=document.getElementById("password"))==null?void 0:o.value)||"",s=document.getElementById("auth-message");if(s&&s.classList.add("hidden"),!(!n||!a)){gs=!0,z("ログイン認証中...");try{const{error:i}=await L.auth.signInWithPassword({email:n,password:a});i&&(s?(s.textContent="ログイン失敗: "+i.message,s.classList.remove("hidden"),s.classList.add("text-red-500")):alert("ログイン失敗: "+i.message))}catch(i){console.error("Login Error:",i);const d=i.message+`
`+JSON.stringify(i,Object.getOwnPropertyNames(i));s?(s.textContent="通信エラー詳細: "+d,s.classList.remove("hidden"),s.classList.add("text-red-500")):alert(`通信エラー詳細:
`+d)}finally{V(),gs=!1}}}async function Ao(){se("app-view","users"),await ma()}function lr(){const e=document.getElementById("change-password-modal");e&&(document.body.appendChild(e),e.classList.remove("hidden"),e.style.zIndex="9999")}let bs=!1;async function Ll(e){var i,d,l,c;if(e&&e.preventDefault&&e.preventDefault(),bs)return;const t=((i=document.getElementById("signup-parent-name"))==null?void 0:i.value)||"",n=((d=document.getElementById("signup-player-name"))==null?void 0:d.value)||"",a=((l=document.getElementById("signup-email"))==null?void 0:l.value)||"";let s=((c=document.getElementById("signup-password"))==null?void 0:c.value)||"";const r=document.getElementById("signup-message");r&&r.classList.add("hidden");const o=document.getElementById("signup-password")!==null;if(o||(s=Math.random().toString(36).slice(-10)+"A1!"),!t||!n||!a||o&&s.length<6){r&&(r.textContent=o?"すべての項目を正しく入力してください(パスワードは6文字以上)":"すべての項目を正しく入力してください"),r&&r.classList.remove("hidden","text-green-600"),r&&r.classList.add("text-red-500");return}bs=!0,z("利用申請を送信中...");try{const{data:u,error:g}=await L.auth.signUp({email:a,password:s});if(g){r&&(r.textContent="登録エラー: "+g.message),r&&r.classList.remove("hidden","text-green-600"),r&&r.classList.add("text-red-500");return}const{error:b}=await L.from("signup_requests").insert([{parent_name:t,player_name:n,email:a,status:"pending"}]);await L.auth.signOut(),b?(r&&(r.textContent="申請失敗: "+b.message),r&&r.classList.remove("hidden","text-green-600"),r&&r.classList.add("text-red-500")):(r&&(r.textContent=o?"アカウントが作成され、利用申請が送信されました。管理者の承認をお待ちください。":"利用申請が送信されました。管理者の承認後、「パスワードを忘れた場合」からパスワードを再設定してログインしてください。"),r&&r.classList.remove("text-red-500"),r&&r.classList.add("text-green-600"),r&&r.classList.remove("hidden"),document.getElementById("signup-parent-name")&&(document.getElementById("signup-parent-name").value=""),document.getElementById("signup-player-name")&&(document.getElementById("signup-player-name").value=""),document.getElementById("signup-email")&&(document.getElementById("signup-email").value=""),document.getElementById("signup-password")&&(document.getElementById("signup-password").value=""))}catch(u){at(),console.error("Signup Error:",u),r&&(r.textContent="登録処理中にエラーが発生しました。",r.classList.remove("hidden","text-green-600"),r.classList.add("text-red-500"))}finally{V(),bs=!1}}async function Bl(e){var a;e&&e.preventDefault&&e.preventDefault();const t=((a=document.getElementById("reset-email"))==null?void 0:a.value)||"",n=document.getElementById("reset-message");if(n&&n.classList.add("hidden"),!!t){z("パスワード再設定メール送信中...");try{const{error:s}=await L.auth.resetPasswordForEmail(t,{redirectTo:window.location.origin});s?n?(n.textContent="送信失敗: "+s.message,n.classList.remove("hidden","text-green-600"),n.classList.add("text-red-500")):alert("送信失敗: "+s.message):n?(n.textContent="パスワード再設定メールを送信しました。",n.classList.remove("text-red-500"),n.classList.add("text-green-600"),n.classList.remove("hidden")):alert("パスワード再設定メールを送信しました。")}catch(s){console.error("Password reset error:",s)}finally{V()}}}async function Al(e){var a;e&&e.preventDefault&&e.preventDefault();const t=((a=document.getElementById("new-password"))==null?void 0:a.value)||"",n=document.getElementById("update-password-message");if(n&&n.classList.add("hidden"),!t||t.length<6){n?(n.textContent="6文字以上のパスワードを入力してください",n.classList.remove("hidden","text-green-600"),n.classList.add("text-red-500")):alert("6文字以上のパスワードを入力してください");return}z("パスワード更新中...");try{const{error:s}=await L.auth.updateUser({password:t});s?n?(n.textContent="更新失敗: "+s.message,n.classList.remove("hidden","text-green-600"),n.classList.add("text-red-500")):alert("更新失敗: "+s.message):(alert("パスワードが更新されました。再度ログインしてください。"),se("auth-view"))}catch(s){console.error("Password update error:",s)}finally{V()}}async function Tl(e){var n;e&&e.preventDefault&&e.preventDefault();const t=((n=document.getElementById("change-new-password"))==null?void 0:n.value)||"";if(!t||t.length<6)return alert("6文字以上のパスワードを入力してください");z("パスワード変更中...");try{const{error:a}=await L.auth.updateUser({password:t});if(a)alert("更新失敗: "+a.message);else{alert("パスワードが変更されました。");const s=document.getElementById("change-password-modal");s&&s.classList.add("hidden");const r=document.getElementById("change-new-password");r&&(r.value="")}}catch(a){console.error("Password change error:",a)}finally{V()}}async function _a(e){e&&e.preventDefault&&e.preventDefault(),Y&&await be("LOGOUT","ログアウトしました"),z("ログアウト処理中...");try{await L.auth.signOut().catch(()=>{})}finally{V(),Kn=!1,history.pushState(null,"",window.location.pathname)}}function Aa(e){const t=document.getElementById("nav-dispatch"),n=document.getElementById("nav-master"),a=document.getElementById("nav-users");e==="users"?(t==null||t.classList.add("hidden"),n==null||n.classList.add("hidden"),a==null||a.classList.add("hidden")):(a==null||a.classList.add("hidden"),qe==="admin"?(t==null||t.classList.remove("hidden"),n==null||n.classList.remove("hidden")):qe==="leader"?(t==null||t.classList.remove("hidden"),n==null||n.classList.add("hidden")):(t==null||t.classList.add("hidden"),n==null||n.classList.add("hidden")))}let Ee=[],_e=[],lt=[],da=new Set;async function Us(){var e,t,n;Kn=!0,Aa("dispatch"),We==null||We.addEventListener("click",async()=>{var a,s;On==null||On.classList.remove("hidden"),Fn==null||Fn.classList.add("hidden"),(a=document.getElementById("view-users"))==null||a.classList.add("hidden"),Aa("dispatch"),We==null||We.classList.add("text-blue-300"),We==null||We.classList.remove("text-gray-400"),ze==null||ze.classList.remove("text-blue-300"),ze==null||ze.classList.add("text-gray-400"),(s=document.getElementById("nav-users"))==null||s.classList.remove("text-blue-300"),Va("app-view","dispatch"),await Ur()}),ze==null||ze.addEventListener("click",async()=>{var a,s;Fn==null||Fn.classList.remove("hidden"),On==null||On.classList.add("hidden"),(a=document.getElementById("view-users"))==null||a.classList.add("hidden"),Aa("master"),ze==null||ze.classList.add("text-blue-300"),ze==null||ze.classList.remove("text-gray-400"),We==null||We.classList.remove("text-blue-300"),We==null||We.classList.add("text-gray-400"),(s=document.getElementById("nav-users"))==null||s.classList.remove("text-blue-300"),Va("app-view","master"),await Ml(),pa()}),(e=document.getElementById("btn-goto-master"))==null||e.addEventListener("click",()=>{ze==null||ze.click()}),(t=document.getElementById("btn-back-to-dispatch"))==null||t.addEventListener("click",()=>{We==null||We.click()});try{await te.initMasterData(),Ee.length===0&&_e.length===0&&(await te.bulkAddFamilies(Nl),await te.bulkAddCars(Pl),await te.syncMaster(),await te.initMasterData()),await Ur(),Ol(),rc(),(n=document.getElementById("btn-load-logs"))==null||n.addEventListener("click",pa)}catch(a){console.error(a),ft("データの読み込みに失敗しました。","error")}}async function ma(){qe==="admin"&&(document.getElementById("view-users").classList.remove("hidden"),document.getElementById("view-master").classList.add("hidden"),document.getElementById("view-dispatch").classList.add("hidden"),Aa("users"),document.getElementById("nav-users").classList.add("text-blue-300"),document.getElementById("nav-users").classList.remove("text-gray-400"),document.getElementById("nav-dispatch").classList.remove("text-blue-300"),document.getElementById("nav-master").classList.remove("text-blue-300"),Va("app-view","users"),await xe())}async function xe(){z("メンバー・マスタ情報読み込み中...");try{const{data:e}=await L.from("app_users").select("*").order("created_at",{ascending:!1});let t=[],n=[],a=[],s=[],r=[];try{const{data:m}=await L.from("groups").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});m&&(t=m);const{data:w}=await L.from("user_groups").select("*");w&&(n=w);const{data:v}=await L.from("event_categories").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});v&&(a=v);const{data:x}=await L.from("user_attributes").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});x&&(s=x);try{const{data:$}=await L.from("event_locations").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});$&&(r=$)}catch($){console.warn("event_locations table not created yet:",$)}const{data:k}=await L.from("master_data").select("*").eq("key","ATTENDANCE_DELEGATIONS").single();k&&k.data?window.adminDelegations=k.data:window.adminDelegations={}}catch(m){console.error("Groups DB Error:",m)}const o=localStorage.getItem("admin_users_sort")||"created_desc",i=document.getElementById("admin-users-sort");if(i&&(i.value=o),e&&e.length>0){const m=new Map(t.map(x=>[x.id,x.name])),w=new Map(s.map(x=>[x.id,x.name])),v=new Map(n.map(x=>[x.user_email,x.group_id]));if(o==="manual"){let x=[];try{const k=localStorage.getItem("admin_users_manual_order");k&&(x=JSON.parse(k))}catch(k){console.error("Failed to parse manual user order:",k)}e.sort((k,$)=>{let h=x.indexOf(k.email),E=x.indexOf($.email);return h===-1&&(h=999999),E===-1&&(E=999999),h!==E?h-E:new Date($.created_at||0)-new Date(k.created_at||0)})}else if(o==="created_desc")e.sort((x,k)=>new Date(k.created_at||0)-new Date(x.created_at||0));else if(o==="created_asc")e.sort((x,k)=>new Date(x.created_at||0)-new Date(k.created_at||0));else if(o==="name_asc")e.sort((x,k)=>(x.name||"").localeCompare(k.name||"","ja"));else if(o==="name_desc")e.sort((x,k)=>(k.name||"").localeCompare(x.name||"","ja"));else if(o==="email_asc")e.sort((x,k)=>(x.email||"").localeCompare(k.email||"","en"));else if(o==="email_desc")e.sort((x,k)=>(k.email||"").localeCompare(x.email||"","en"));else if(o==="role_desc"){const x={admin:3,leader:2,user:1};e.sort((k,$)=>{const h=x[k.role]||0,E=x[$.role]||0;return h!==E?E-h:new Date($.created_at||0)-new Date(k.created_at||0)})}else o==="group_asc"?e.sort((x,k)=>{const $=m.get(v.get(x.email))||"",h=m.get(v.get(k.email))||"";return!$&&h?1:$&&!h?-1:$.localeCompare(h,"ja")}):o==="attribute_asc"&&e.sort((x,k)=>{const $=w.get(x.attribute_id)||"",h=w.get(k.attribute_id)||"";return!$&&h?1:$&&!h?-1:$.localeCompare(h,"ja")})}const d=document.getElementById("allowed-users-list");let l=`
        <div class="mb-6 p-4 bg-orange-50 border border-orange-200 rounded shadow-sm">
            <h3 class="font-bold text-orange-800 mb-2">ユーザー属性の管理</h3>
            <div id="admin-attribute-list" class="flex flex-wrap gap-2 mb-3">
                ${s.length===0?'<span class="text-sm text-gray-500">属性なし</span>':""}
                ${s.map(m=>`<div data-id="${m.id}" draggable="true" class="bg-white border rounded px-2 py-1 flex items-center text-sm w-fit cursor-move select-none hover:shadow-sm"><span class="mr-2 font-bold">${m.name}</span><button onclick="renameUserAttributeAdmin('${m.id}', '${m.name}')" class="text-blue-500 hover:text-blue-700 mr-2 font-bold" title="名称変更">✎</button><button onclick="deleteUserAttributeAdmin('${m.id}')" class="text-red-500 hover:text-red-700 font-bold" title="削除">×</button></div>`).join("")}
            </div>
            <div class="flex space-x-2 items-center">
                <input type="text" id="admin-new-attribute-name" placeholder="新しい属性名" class="border p-1 rounded text-sm w-48">
                <button onclick="saveNewUserAttributeAdmin()" class="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-sm shadow font-bold">追加</button>
            </div>
        </div>
        `,c=`
        <div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded shadow-sm">
            <h3 class="font-bold text-blue-800 mb-2">イベントカテゴリの管理</h3>
            <div id="admin-category-list" class="flex flex-wrap gap-2 mb-3">
                ${a.length===0?'<span class="text-sm text-gray-500">カテゴリなし</span>':""}
                ${a.map(m=>`<div data-id="${m.id}" draggable="true" class="bg-white border rounded px-2 py-1 flex items-center text-sm w-fit cursor-move select-none hover:shadow-sm"><input type="color" value="${m.color||"#bfdbfe"}" onchange="updateCategoryColorAdmin('${m.id}', this.value)" class="w-6 h-6 mr-2 border-0 p-0 cursor-pointer" title="色を変更"><span class="mr-2 font-bold">${m.name}</span><button onclick="renameCategoryAdmin('${m.id}', '${m.name}')" class="text-blue-500 hover:text-blue-700 mr-2 font-bold" title="名称変更">✎</button><button onclick="deleteCategoryAdmin('${m.id}')" class="text-red-500 hover:text-red-700 font-bold" title="削除">×</button></div>`).join("")}
            </div>
            <div class="flex space-x-2 items-center">
                <input type="color" id="admin-new-category-color" value="#bfdbfe" class="w-8 h-8 border p-0 rounded cursor-pointer" title="カテゴリの色">
                <input type="text" id="admin-new-category-name" placeholder="新しいカテゴリ名" class="border p-1 rounded text-sm w-48">
                <button onclick="saveNewCategoryAdmin()" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm shadow font-bold">追加</button>
            </div>
        </div>
        `,u=`
        <div class="mb-6 p-4 bg-purple-50 border border-purple-200 rounded shadow-sm">
            <h3 class="font-bold text-purple-800 mb-2">出欠グループの管理</h3>
            <div id="admin-group-list" class="flex flex-wrap gap-2 mb-3">
                ${t.length===0?'<span class="text-sm text-gray-500">グループなし</span>':""}
                ${t.map(m=>`<div data-id="${m.id}" draggable="true" class="bg-white border rounded px-2 py-1 flex items-center text-sm w-fit cursor-move select-none hover:shadow-sm"><input type="color" value="${m.color||"#d1fae5"}" onchange="updateGroupColorAdmin('${m.id}', this.value)" class="w-6 h-6 mr-2 border-0 p-0 cursor-pointer" title="色を変更"><span class="mr-2 font-bold">${m.name}</span><button onclick="renameGroupAdmin('${m.id}', '${m.name}')" class="text-blue-500 hover:text-blue-700 mr-2 font-bold" title="名称変更">✎</button><button onclick="deleteGroupAdmin('${m.id}')" class="text-red-500 hover:text-red-700 font-bold" title="削除">×</button></div>`).join("")}
            </div>
            <div class="flex space-x-2 items-center">
                <input type="color" id="admin-new-group-color" value="#d1fae5" class="w-8 h-8 border p-0 rounded cursor-pointer" title="グループの色">
                <input type="text" id="admin-new-group-name" placeholder="新しいグループ名" class="border p-1 rounded text-sm w-48">
                <button onclick="saveNewGroupAdmin()" class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm shadow font-bold">追加</button>
            </div>
        </div>
        `,g=`
        <div class="mb-6 p-4 bg-teal-50 border border-teal-200 rounded shadow-sm">
            <h3 class="font-bold text-teal-800 mb-2">場所マスタの管理</h3>
            <div id="admin-location-list" class="flex flex-wrap gap-2 mb-3">
                ${r.length===0?'<span class="text-sm text-gray-500">登録済みの場所はありません</span>':""}
                ${r.map(m=>`
                    <div data-id="${m.id}" draggable="true" class="bg-white border rounded px-2 py-1 flex items-center text-sm w-fit gap-2 cursor-move select-none hover:shadow-sm">
                        <span class="font-bold text-teal-900">${m.name}</span>
                        ${m.url?`<a href="${m.url}" target="_blank" class="text-blue-500 text-xs hover:underline truncate max-w-xs">${m.url}</a>`:""}
                        <button onclick="renameLocationAdmin('${m.id}')" class="text-blue-500 hover:text-blue-700 font-bold ml-2" title="名称変更">✎</button>
                        <button onclick="deleteLocationAdmin('${m.id}')" class="text-red-500 hover:text-red-700 font-bold" title="削除">×</button>
                    </div>
                `).join("")}
            </div>
            <div class="flex flex-wrap gap-2 items-center">
                <input type="text" id="admin-new-location-name" placeholder="場所の名前" class="border p-1 rounded text-sm w-48">
                <input type="text" id="admin-new-location-url" placeholder="URL (任意)" class="border p-1 rounded text-sm w-64">
                <button onclick="saveNewLocationAdmin()" class="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-sm shadow font-bold">追加</button>
            </div>
        </div>
        `;const b=(e||[]).map((m,w)=>{var I;const v=m.email.endsWith("@local.dummy"),x=((I=n.find(S=>S.user_email===m.email))==null?void 0:I.group_id)||"",k=t.map(S=>`<option value="${S.id}" ${x===S.id?"selected":""}>${S.name}</option>`).join(""),$=`
                <select id="edit-group-${w}" class="border p-1 rounded text-sm w-36 font-semibold text-gray-700 bg-white">
                    <option value="">選択なし</option>
                    ${k}
                </select>
            `,h=(e||[]).filter(S=>S.email!==m.email).map(S=>`
                <label class="inline-flex items-center text-xs mr-3 mb-1 w-32 truncate" title="${S.email}">
                    <input type="checkbox" name="edit-delegation-${w}" value="${S.email}" ${window.adminDelegations[m.email]&&window.adminDelegations[m.email].includes(S.email)?"checked":""} class="mr-1 rounded text-blue-600">
                    <span class="truncate">${S.name||S.email}</span>
                </label>
            `).join(""),_=o==="manual"?`
                <div class="user-drag-handle cursor-grab select-none text-gray-400 hover:text-gray-600 px-2 flex items-center justify-center text-xl font-bold border-r border-gray-100 mr-2" title="ドラッグして並べ替え">
                    ⋮⋮
                </div>
            `:"";return`
            <div class="user-admin-card flex items-stretch p-3 bg-white border rounded shadow-sm mb-2 hover:bg-gray-50 transition" data-email="${m.email}" data-index="${w}" data-old-role="${m.role}">
                ${_}
                <div class="flex-grow flex flex-col">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-gray-100 pb-2 mb-2">
                        <div class="flex-grow flex flex-col md:flex-row md:items-center gap-2">
                        <input type="text" id="edit-name-${w}" value="${m.name||""}" placeholder="氏名" class="border p-1 rounded text-sm w-32 font-bold">
                        <input type="text" id="edit-email-${w}" value="${Tn(m.email)}" class="border p-1 rounded text-sm w-48 font-bold" ${m.email===Y.email||v?"disabled":""}>
                        <select id="edit-attribute-${w}" class="border p-1 rounded text-sm w-28">
                            <option value="">属性なし</option>
                            ${s.map(S=>`<option value="${S.id}" ${m.attribute_id===S.id?"selected":""}>${S.name}</option>`).join("")}
                        </select>
                        <select id="edit-role-${w}" class="border p-1 rounded text-sm" ${m.email===Y.email?"disabled":""}>
                            <option value="user" ${m.role==="user"?"selected":""}>一般ユーザー</option>
                            <option value="leader" ${m.role==="leader"?"selected":""}>リーダー</option>
                            <option value="admin" ${m.role==="admin"?"selected":""}>管理者</option>
                        </select>
                         <div class="flex items-center space-x-3 ml-2 border-l pl-2 flex-wrap gap-y-1">
                            <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-dispatch-${w}" class="rounded text-blue-600" ${m.can_use_dispatch!==!1?"checked":""}><span>配車可</span></label>
                            <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-dashboard-${w}" class="rounded text-blue-600" ${m.can_use_dashboard!==!1?"checked":""}><span>成績可</span></label>
                            <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-attendance-${w}" class="rounded text-blue-600" ${m.can_use_attendance!==!1?"checked":""}><span>出欠可</span></label>
                            <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-simulator-${w}" class="rounded text-blue-600" ${m.can_use_simulator!==!1?"checked":""}><span>シミュレータ可</span></label>
                            <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-info-${w}" class="rounded text-teal-600" ${m.can_use_info!==!1?"checked":""}><span>Info閲覧可</span></label>
                            <label class="flex items-center space-x-1 text-xs font-bold text-teal-800"><input type="checkbox" id="edit-manage-info-${w}" class="rounded text-teal-600 edit-manage-info-chk" data-index="${w}" ${m.can_edit_info===!0||m.role==="admin"||m.role==="leader"&&m.can_edit_info!==!1?"checked":""}><span>Info編集可</span></label>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2 shrink-0">
                        ${v?"":`<button onclick="adminChangeUserPassword('${m.email}')" class="text-xs bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded shadow">パスワード変更</button>`}
                        ${m.email!==Y.email?`<button onclick="deleteAdminUser('${m.email}')" class="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded shadow">削除</button>`:""}
                    </div>
                </div>
                    <div class="flex flex-col md:flex-row md:items-start justify-between gap-2">
                        <div class="flex-grow">
                            <div class="text-xs font-bold text-gray-500 mb-1">所属グループ:</div>
                            <div id="group-container-${w}">${$}</div>
                        </div>
                        <div class="flex-grow mt-2 md:mt-0 border-t md:border-t-0 md:border-l border-gray-200 pt-2 md:pt-0 md:pl-4">
                            <div class="text-xs font-bold text-gray-500 mb-1">代行権限 (他メンバーの出欠を代理で入力できる権限):</div>
                            <details class="text-xs border p-2 bg-gray-50 rounded shadow-inner">
                                <summary class="cursor-pointer text-gray-700 font-bold">代行入力できるメンバーを選択 (複数可)</summary>
                                <div class="flex flex-wrap mt-2 max-h-32 overflow-y-auto border-t border-gray-200 pt-2">${h||'<span class="text-gray-400">他のメンバーがいません</span>'}</div>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
            `}).join("");d.innerHTML=b,Cl(),d.querySelectorAll(".edit-manage-info-chk").forEach(m=>{m.addEventListener("change",w=>{if(w.target.checked){const v=w.target.getAttribute("data-index"),x=document.getElementById(`edit-use-info-${v}`);x&&(x.checked=!0)}})});const f=document.getElementById("admin-master-list");f&&(f.innerHTML=l+c+u+g,Ia("admin-attribute-list","user_attributes",xe),Ia("admin-category-list","event_categories",xe),Ia("admin-group-list","groups",xe),Ia("admin-location-list","event_locations",xe));const{data:y}=await L.from("signup_requests").select("*").eq("status","pending").order("created_at",{ascending:!1}),p=document.getElementById("signup-requests-list");!y||y.length===0?p.innerHTML='<p class="text-gray-500 text-sm">現在、承認待ちの申請はありません。</p>':p.innerHTML=y.map(m=>`
                <div class="p-3 bg-white border rounded shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                        <div class="font-bold">${m.parent_name} <span class="text-sm font-normal text-gray-600">様 (選手: ${m.player_name})</span></div>
                        <div class="text-sm text-gray-500">${m.email}</div>
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="approveRequest('${m.id}', '${m.email}')" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-bold shadow">承認</button>
                        <button onclick="rejectRequest('${m.id}')" class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded text-sm shadow">拒否</button>
                    </div>
                </div>
            `).join("")}finally{V()}}async function Dl(){const e=document.querySelectorAll(".user-admin-card");if(e.length!==0&&confirm("全メンバーの設定を一括保存しますか？")){z("全メンバー設定を保存中...");try{const t=[],n=[],a=[];e.forEach(d=>{const l=d.getAttribute("data-email"),c=d.getAttribute("data-index"),u=d.getAttribute("data-old-role"),g=document.getElementById(`edit-email-${c}`),b=document.getElementById(`edit-name-${c}`),f=document.getElementById(`edit-attribute-${c}`),y=document.getElementById(`edit-role-${c}`),p=document.getElementById(`edit-use-dispatch-${c}`),m=document.getElementById(`edit-use-dashboard-${c}`),w=document.getElementById(`edit-use-attendance-${c}`),v=document.getElementById(`edit-use-simulator-${c}`),x=document.getElementById(`edit-use-info-${c}`),k=document.getElementById(`edit-manage-info-${c}`),$=g.disabled?l:ns(g.value.trim()),h=b.value.trim(),E=f&&f.value||null,_=y.disabled?u:y.value,I=p?p.checked:!0,S=m?m.checked:!0,A=w?w.checked:!0,P=v?v.checked:!0,M=x?x.checked:!0,N=k?k.checked:_==="admin"||_==="leader"&&!0;if(!$)throw new Error("メールアドレスが空のレコードがあります。");a.push(l);const G={email:$,name:h,attribute_id:E,role:_,can_use_dispatch:I,can_use_dashboard:S,can_use_attendance:A,can_use_simulator:P,can_use_info:M,can_edit_info:N};t.push({oldEmail:l,updatePayload:G});const R=document.getElementById(`edit-group-${c}`),B=R?R.value:"";B&&n.push({user_email:$,group_id:B});const C=document.querySelectorAll(`input[name="edit-delegation-${c}"]:checked`),T=Array.from(C).map(F=>F.value);l!==$&&window.adminDelegations[l]&&delete window.adminDelegations[l],window.adminDelegations[$]=T});const s=t.map(async d=>{let l=await L.from("app_users").update(d.updatePayload).eq("email",d.oldEmail);if(l.error&&l.error.message&&l.error.message.includes("can_edit_info")){const c={...d.updatePayload};delete c.can_edit_info,l=await L.from("app_users").update(c).eq("email",d.oldEmail)}return l}),r=await Promise.all(s);for(const d of r)if(d.error)throw d.error;const{error:o}=await L.from("user_groups").delete().in("user_email",a);if(o)throw o;if(n.length>0){const{error:d}=await L.from("user_groups").insert(n);if(d)throw d}const{error:i}=await L.from("master_data").upsert({key:"ATTENDANCE_DELEGATIONS",data:window.adminDelegations});if(i)throw i;await be("UPDATE_USERS_ALL","全メンバーの設定を一括更新しました"),alert("全メンバーの設定を一括保存しました"),await xe()}catch(t){console.error(t),alert("保存中にエラーが発生しました: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{V()}}}window.forceResetPassword=async function(e){if(confirm(`${e} 宛にパスワード再設定メールを送信し、強制的にパスワードをリセットさせますか？`)){z("パスワード再設定メール送信中...");try{const{error:t}=await L.auth.resetPasswordForEmail(e,{redirectTo:window.location.origin});alert(t?"送信失敗: "+t.message:"パスワード再設定メールを送信しました。")}catch(t){console.error(t)}finally{V()}}};window.adminChangeUserPassword=async function(e){const t=Tn(e),n=prompt(`「${t}」の新しいパスワードを入力してください（6文字以上）：`);if(n===null)return;const a=n.trim();if(a.length<6)return alert("パスワードは6文字以上で設定してください。");z("パスワード変更中...");try{const{error:s}=await L.rpc("admin_update_user_password",{user_email:e,new_password:a});if(s)throw new Error(s.message);await be("ADMIN_CHANGE_PASSWORD",`ユーザー「${e}」のパスワードを変更しました`),alert(`「${t}」のパスワードを正常に変更しました。`)}catch(s){console.error(s),alert(`パスワード変更エラー:
`+s.message+`

※この機能を使用するには、あらかじめSupabaseのSQLエディタで専用のデータベース関数（admin_update_user_password）を設定する必要があります。詳細はマニュアルまたはエージェントのメッセージを参照してください。`)}finally{V()}};window.adminAddUser=async function(){var r,o,i,d;const e=((r=document.getElementById("admin-add-email"))==null?void 0:r.value.trim())||"",t=ns(e),n=((o=document.getElementById("admin-add-name"))==null?void 0:o.value.trim())||"",a=((i=document.getElementById("admin-add-password"))==null?void 0:i.value.trim())||"",s=((d=document.getElementById("admin-add-role"))==null?void 0:d.value)||"user";if(!e||!n||!a)return alert("ユーザーID（またはメールアドレス）、氏名、仮パスワードは必須入力項目です。");if(a.length<6)return alert("仮パスワードは6文字以上で設定してください。");z("アカウント払い出し中...");try{const l=window.supabase.createClient(Yn,ja,{auth:{persistSession:!1,autoRefreshToken:!1}}),{data:c,error:u}=await l.auth.signUp({email:t,password:a});if(u)throw new Error(`Authアカウント作成失敗: ${u.message}`);const{error:g}=await L.from("app_users").insert([{email:t,name:n,role:s}]);if(g)throw new Error(`データベース登録失敗: ${g.message}`);await be("ADD_USER_COMPLETED",`アカウント「${t}」を仮パスワード付きで払い出しました`),document.getElementById("admin-add-email").value="",document.getElementById("admin-add-name").value="",document.getElementById("admin-add-password").value="",alert(`アカウントの払い出しが完了しました！

【ユーザー通知内容】
ログインID: ${Tn(t)}
仮パスワード: ${a}

上記情報をLINE等の別手段でユーザーに通知してください。`),await xe()}catch(l){console.error(l),alert(`アカウント払い出しエラー:
`+l.message)}finally{V()}};window.adminAddDummyUser=async function(){const e=prompt(`追加する代行専用メンバーの「氏名」を入力してください。
（※ログインはできず、他のメンバーからの代行入力専用アカウントとなります）`);if(!e||e.trim()==="")return;const t=`dummy_${Date.now()}@local.dummy`;z("代行専用メンバー追加処理中...");try{await L.from("app_users").insert([{email:t,name:e.trim(),role:"user"}]),await be("ADD_DUMMY_USER",`代行専用メンバー「${e.trim()}」を追加しました`),await xe()}catch(n){console.error(n),alert("追加エラー: "+(n.message==="Load failed"||n.message==="Failed to fetch"?"通信に失敗しました。":n.message))}finally{V()}};window.deleteAdminUser=async function(e){if(confirm(`${e} のアクセス許可を取り消しますか？`)){z("ユーザー削除処理中...");try{await L.from("app_users").delete().eq("email",e),await be("DELETE_USER",`ユーザー「${e}」を削除しました`),await xe()}catch(t){console.error(t),alert("削除エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{V()}}};window.saveNewCategoryAdmin=async function(){var n;const e=document.getElementById("admin-new-category-name").value.trim(),t=((n=document.getElementById("admin-new-category-color"))==null?void 0:n.value)||"#bfdbfe";if(!e)return alert("カテゴリ名を入力してください");z("カテゴリ追加中...");try{const{error:a}=await L.from("event_categories").insert([{name:e,color:t}]);if(a)throw a;await xe()}catch(a){alert("追加エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{V()}};window.deleteCategoryAdmin=async function(e){if(confirm(`このカテゴリを削除しますか？
※既存のイベントに設定されているカテゴリ名には影響しませんが、新規作成・編集時に選択できなくなります。`)){z("カテゴリ削除中...");try{const{error:t}=await L.from("event_categories").delete().eq("id",e);if(t)throw t;await xe()}catch(t){alert("削除エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{V()}}};window.renameCategoryAdmin=async function(e,t){const n=prompt("新しいカテゴリ名を入力してください:",t);if(!(!n||n.trim()===""||n===t)){z("カテゴリ名称変更中...");try{const{error:a}=await L.from("event_categories").update({name:n.trim()}).eq("id",e);if(a)throw a;await xe()}catch(a){alert("変更エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{V()}}};window.updateCategoryColorAdmin=async function(e,t){z("カテゴリ色変更中...");try{const{error:n}=await L.from("event_categories").update({color:t}).eq("id",e);if(n)throw n;await xe()}catch(n){alert("変更エラー: "+(n.message==="Load failed"||n.message==="Failed to fetch"?"通信に失敗しました。":n.message))}finally{V()}};window.updateGroupColorAdmin=async function(e,t){z("グループ色変更中...");try{const{error:n}=await L.from("groups").update({color:t}).eq("id",e);if(n)throw n;await xe()}catch(n){alert("色変更エラー: "+(n.message==="Load failed"||n.message==="Failed to fetch"?"通信に失敗しました。":n.message))}finally{V()}};window.saveNewGroupAdmin=async function(){var n;const e=document.getElementById("admin-new-group-name").value.trim(),t=((n=document.getElementById("admin-new-group-color"))==null?void 0:n.value)||"#d1fae5";if(!e)return alert("グループ名を入力してください");z("グループ追加中...");try{const{error:a}=await L.from("groups").insert([{name:e,color:t}]);if(a)throw a;await xe()}catch(a){alert("追加エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{V()}};window.deleteGroupAdmin=async function(e){if(confirm(`このグループを削除しますか？
※関連する出欠データやメンバー設定にも影響が出る可能性があります。`)){z("グループ削除中...");try{const{error:t}=await L.from("groups").delete().eq("id",e);if(t)throw t;await xe()}catch(t){alert("削除エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{V()}}};window.renameGroupAdmin=async function(e,t){const n=prompt("新しいグループ名を入力してください:",t);if(!(!n||n.trim()===""||n===t)){z("グループ名称変更中...");try{const{error:a}=await L.from("groups").update({name:n.trim()}).eq("id",e);if(a)throw a;await xe()}catch(a){alert("変更エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{V()}}};window.saveNewLocationAdmin=async function(){const e=document.getElementById("admin-new-location-name").value.trim(),t=document.getElementById("admin-new-location-url").value.trim();if(!e)return alert("場所名を入力してください");z("場所追加中...");try{const{error:n}=await L.from("event_locations").insert([{name:e,url:t||null}]);if(n)throw n;await xe()}catch(n){alert("追加エラー: "+(n.message==="Load failed"||n.message==="Failed to fetch"?"通信に失敗しました。":n.message))}finally{V()}};window.deleteLocationAdmin=async function(e){if(confirm(`この場所をマスタから削除しますか？
※既存の予定データ内の場所テキスト自体は削除されません。`)){z("場所削除中...");try{const{error:t}=await L.from("event_locations").delete().eq("id",e);if(t)throw t;await xe()}catch(t){alert("削除エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{V()}}};window.renameLocationAdmin=async function(e){z("場所データ読み込み中...");try{const{data:t,error:n}=await L.from("event_locations").select("*").eq("id",e).single();if(n)throw n;const a=document.getElementById("admin-edit-location-modal");a&&a.remove();const s=t.name||"",r=t.url||"",o=`
        <div id="admin-edit-location-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
            <div class="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6 flex flex-col">
                <h3 class="text-lg font-bold text-teal-800 mb-4">場所情報の編集</h3>
                <div class="space-y-4 mb-6">
                    <div>
                        <label class="block text-xs font-bold text-gray-500 mb-1">場所の名前</label>
                        <input type="text" id="edit-location-name" value="${s}" class="w-full border p-2 rounded text-sm focus:ring-teal-500 focus:border-teal-500 text-gray-800">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-500 mb-1">URL (任意)</label>
                        <input type="text" id="edit-location-url" value="${r}" class="w-full border p-2 rounded text-sm focus:ring-teal-500 focus:border-teal-500 text-gray-800">
                    </div>
                </div>
                <div class="flex justify-end gap-2">
                    <button onclick="document.getElementById('admin-edit-location-modal').remove()" class="px-4 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded transition">キャンセル</button>
                    <button onclick="saveLocationEditAdmin('${e}')" class="px-4 py-2 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded shadow transition">保存する</button>
                </div>
            </div>
        </div>
        `;document.body.insertAdjacentHTML("beforeend",o)}catch(t){alert("読み込みエラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{V()}};window.saveLocationEditAdmin=async function(e){const t=document.getElementById("edit-location-name").value.trim(),n=document.getElementById("edit-location-url").value.trim();if(t==="")return alert("場所の名前は必須項目です。");z("場所マスタ更新中...");try{const{error:a}=await L.from("event_locations").update({name:t,url:n||null}).eq("id",e);if(a)throw a;const s=document.getElementById("admin-edit-location-modal");s&&s.remove(),await xe()}catch(a){alert("更新エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{V()}};function Ia(e,t,n){const a=document.getElementById(e);if(!a)return;let s=null;Array.from(a.children).forEach(r=>{r.setAttribute("draggable","true"),r.classList.add("cursor-move","select-none"),r.addEventListener("dragstart",o=>{s=r,o.dataTransfer.effectAllowed="move",r.classList.add("opacity-50")}),r.addEventListener("dragover",o=>{o.preventDefault(),o.dataTransfer.dropEffect="move";const i=o.target.closest('[draggable="true"]');if(i&&i!==s&&i.parentNode===a){const d=i.getBoundingClientRect(),l=(o.clientY-d.top)/(d.bottom-d.top)>.5;a.insertBefore(s,l?i.nextSibling:i)}}),r.addEventListener("dragend",async()=>{r.classList.remove("opacity-50"),s=null;const i=Array.from(a.children).map((d,l)=>{const c=d.dataset.id;return L.from(t).update({sort_order:l}).eq("id",c)});z("順序を保存中...");try{await Promise.all(i),n&&await n()}catch(d){console.error("Sort order save error:",d),alert("順序の保存に失敗しました。")}finally{V()}})})}function Cl(){const e=document.getElementById("allowed-users-list");if(!e)return;if((localStorage.getItem("admin_users_sort")||"created_desc")!=="manual"){Array.from(e.children).forEach(a=>{a.removeAttribute("draggable"),a.classList.remove("cursor-move","select-none");const s=a.querySelector(".user-drag-handle");s&&(s.style.display="none")});return}let n=null;Array.from(e.children).forEach(a=>{const s=a.querySelector(".user-drag-handle");s?(s.style.display="flex",s.addEventListener("mousedown",()=>{a.setAttribute("draggable","true")}),s.addEventListener("mouseup",()=>{a.removeAttribute("draggable")})):a.setAttribute("draggable","true"),a.addEventListener("dragstart",r=>{if(a.getAttribute("draggable")!=="true"){r.preventDefault();return}n=a,r.dataTransfer.effectAllowed="move",a.classList.add("opacity-50")}),a.addEventListener("dragover",r=>{r.preventDefault(),r.dataTransfer.dropEffect="move";const o=r.target.closest(".user-admin-card");if(o&&o!==n&&o.parentNode===e){const i=o.getBoundingClientRect(),d=(r.clientY-i.top)/(i.bottom-i.top)>.5;e.insertBefore(n,d?o.nextSibling:o)}}),a.addEventListener("dragend",()=>{a.classList.remove("opacity-50"),a.removeAttribute("draggable"),n=null;const o=Array.from(e.children).map(i=>i.getAttribute("data-email")).filter(Boolean);localStorage.setItem("admin_users_manual_order",JSON.stringify(o))})})}window.saveNewUserAttributeAdmin=async function(){const e=document.getElementById("admin-new-attribute-name").value.trim();if(!e)return alert("属性名を入力してください");z("属性追加中...");try{const{error:t}=await L.from("user_attributes").insert([{name:e}]);if(t)throw t;await xe()}catch(t){alert("追加エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{V()}};window.deleteUserAttributeAdmin=async function(e){if(confirm(`この属性を削除しますか？
※ユーザーに設定されている属性は解除されます。`)){z("属性削除中...");try{const{error:t}=await L.from("user_attributes").delete().eq("id",e);if(t)throw t;await xe()}catch(t){alert("削除エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{V()}}};window.renameUserAttributeAdmin=async function(e,t){const n=prompt("新しい属性名を入力してください:",t);if(!(!n||n.trim()===""||n===t)){z("属性名称変更中...");try{const{error:a}=await L.from("user_attributes").update({name:n.trim()}).eq("id",e);if(a)throw a;await xe()}catch(a){alert("変更エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{V()}}};window.approveRequest=async function(e,t){z("申請承認中...");try{const{data:n}=await L.from("signup_requests").select("parent_name, player_name").eq("id",e).single(),a=n?`${n.parent_name} (${n.player_name})`:"";await L.from("app_users").insert([{email:t,role:"user",name:a}]),await L.from("signup_requests").update({status:"approved"}).eq("id",e);try{const{error:s}=await L.auth.resetPasswordForEmail(t,{redirectTo:window.location.origin});s&&(console.warn("Auto password reset email failed (rate limit):",s.message),alert(`メンバー承認は完了しました！

※ただし、Supabaseのメール送信制限（レートリミット等）により、パスワード設定案内メールの自動送信に失敗しました（エラー: `+s.message+`）。

お手数ですが、ログイン画面の『パスワードを忘れた場合』からユーザー自身で再設定を行っていただくよう案内するか、時間をおいてメンバーリストの『PWリセット送信』から再送信してください。`))}catch(s){console.error("Auto password reset email exception:",s)}await xe()}catch(n){console.error(n),alert("承認エラー: "+(n.message==="Load failed"||n.message==="Failed to fetch"?"通信に失敗しました。":n.message))}finally{V()}};window.rejectRequest=async function(e){if(confirm("この申請を拒否しますか？")){z("申請拒否中...");try{await L.from("signup_requests").update({status:"rejected"}).eq("id",e),await xe()}catch(t){console.error(t),alert("拒否エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{V()}}};const te={initMasterData:async()=>Ne(async()=>{const{data:e,error:t}=await L.from("master_data").select("*");if(t)throw t;if(Ee=[],_e=[],e){const n=e.find(s=>s.key==="FAMILIES"),a=e.find(s=>s.key==="CARS");n&&(Ee=n.data||[]),a&&(_e=a.data||[])}},"マスターデータ初期化中..."),getAllFamilies:async()=>Ee,getFamily:async e=>Ee.find(t=>t.familyName===e),addFamily:e=>{Ee.push(e)},updateFamily:e=>{const t=Ee.findIndex(n=>n.familyName===e.familyName);t>-1&&(Ee[t]=e)},deleteFamily:e=>{Ee=Ee.filter(t=>t.familyName!==e)},bulkAddFamilies:e=>{Ee=e},getAllCars:async()=>_e,getCar:async e=>_e.find(t=>t.id===e),addCar:e=>{_e.push(e)},updateCar:e=>{const t=_e.findIndex(n=>n.id===e.id);t>-1&&(_e[t]=e)},deleteCar:e=>{_e=_e.filter(t=>t.id!==e)},bulkAddCars:e=>{_e=e},syncMaster:async()=>Ne(async()=>{const{error:e}=await L.from("master_data").upsert([{key:"FAMILIES",data:Ee},{key:"CARS",data:_e}]);if(e)throw e;await be("UPDATE_MASTER","初期データ(または強制)のマスター保存を実行しました")},"マスターデータ同期中..."),saveState:async(e,t)=>Ne(async()=>{const n=Date.now().toString(),{error:a}=await L.from("states").insert({id:n,name:t,created_at:Date.now(),state_data:e});if(a)throw a;return await be("SAVE_DISPATCH",`配車データ「${t}」を保存しました`),!0},"配車状態を保存中..."),getAllSavedStates:async()=>Ne(async()=>{const{data:e,error:t}=await L.from("states").select("*").order("created_at",{ascending:!1});if(t)throw t;return e.map(n=>({id:n.id,name:n.name,timestamp:n.created_at,state:n.state_data}))},"配車状態一覧を取得中..."),getState:async e=>Ne(async()=>{const{data:t,error:n}=await L.from("states").select("*").eq("id",e).single();if(n)throw n;return t?{id:t.id,name:t.name,timestamp:t.created_at,state:t.state_data}:null},"配車状態を取得中..."),deleteState:async e=>Ne(async()=>{const{error:t}=await L.from("states").delete().eq("id",e);if(t)throw t;return await be("DELETE_DISPATCH",`配車データ(ID:${e})を削除しました`),!0},"配車状態を削除中..."),saveParking:async(e,t)=>Ne(async()=>{const n="p"+Date.now()+Math.floor(Math.random()*1e3),{error:a}=await L.from("parkings").insert({id:n,name:t,created_at:Date.now(),parking_data:e});if(a)throw a;return await be("SAVE_PARKING",`駐車場データ「${t}」を保存しました`),!0},"駐車場データを保存中..."),getAllSavedParking:async()=>Ne(async()=>{const{data:e,error:t}=await L.from("parkings").select("*").order("created_at",{ascending:!1});if(t)throw t;return e.map(n=>({id:n.id,name:n.name,timestamp:n.created_at,parking:n.parking_data}))},"駐車場データ一覧を取得中..."),getParking:async e=>Ne(async()=>{const{data:t,error:n}=await L.from("parkings").select("*").eq("id",e).single();if(n)throw n;return t?{id:t.id,name:t.name,timestamp:t.created_at,parking:t.parking_data}:null},"駐車場データを取得中..."),updateParking:async e=>Ne(async()=>{const{error:t}=await L.from("parkings").update({name:e.name,parking_data:e.parking}).eq("id",e.id);if(t)throw t;return!0},"駐車場データを更新中..."),deleteParking:async e=>Ne(async()=>{const{error:t}=await L.from("parkings").delete().eq("id",e);if(t)throw t;return await be("DELETE_PARKING",`駐車場データ(ID:${e})を削除しました`),!0},"駐車場データを削除中..."),addParkingMaster:(e,t)=>{lt.push({id:"p"+Date.now()+Math.floor(Math.random()*1e3),name:t,timestamp:Date.now(),parking:e,isNew:!0})},updateParkingMaster:e=>{const t=lt.findIndex(n=>n.id===e.id);t>-1&&(lt[t]=e,lt[t].isModified=!0)},deleteParkingMaster:e=>{const t=lt.find(n=>n.id===e);t&&!t.isNew&&da.add(e),lt=lt.filter(n=>n.id!==e)},syncAllMaster:async()=>Ne(async()=>{const{error:e}=await L.from("master_data").upsert([{key:"FAMILIES",data:Ee},{key:"CARS",data:_e}]);if(e)throw e;for(const t of da)await L.from("parkings").delete().eq("id",t);da.clear();for(const t of lt)if(t.isNew||t.isModified){const{error:n}=await L.from("parkings").upsert({id:t.id,name:t.name,created_at:t.timestamp,parking_data:t.parking});if(n)throw n;t.isNew=!1,t.isModified=!1}await be("UPDATE_MASTER","マスターデータ(家族・車・駐車場)を一括保存しました")},"マスターデータ一括同期中..."),clearDatabase:async()=>Ne(async()=>{Ee=[],_e=[],await L.from("master_data").delete().neq("key",""),await L.from("states").delete().neq("id",""),await L.from("parkings").delete().neq("id",""),await be("CLEAR_DB","データベースの全リセットを実行しました")},"データベース初期化中...")},Nl=[{familyName:"山田家",order:1,members:[{id:"p1",name:"太郎",type:"選手",isFlagTarget:!0,data:{grade:"5年",school:"A小",other:"",memo:""}},{id:"p2",name:"山田父",type:"保護者",data:{memo:""}}]},{familyName:"佐藤家",order:2,members:[{id:"p3",name:"次郎",type:"選手",isFlagTarget:!0,data:{grade:"5年",school:"B小",other:"",memo:""}},{id:"p4",name:"佐藤母",type:"保護者",data:{memo:""}}]},{familyName:"スタッフ・個人",order:99,members:[{id:"p99",name:"監督",type:"その他",data:{memo:""}}]}],Pl=[{id:"c1",name:"山田カー",familyName:"山田家",baseCapacity:6,order:1},{id:"c2",name:"佐藤カー",familyName:"佐藤家",baseCapacity:5,order:2}];let bn=[],Ga=[],as=[],yn=new Set,hn=new Set,Kt=new Map,ln=new Set,Lt=new Set,At=new Map,Ce={groundName:"",designated:{name:"",limit:0,memo:""},other:{name:"",memo:""}},Je={date:"",name:"",timeline:"",notes:""},ie=[],qt={car:null,seat:null},ys=null,hs=null;const js=3,We=document.getElementById("nav-dispatch"),ze=document.getElementById("nav-master"),On=document.getElementById("view-dispatch"),Fn=document.getElementById("view-master"),yt=document.getElementById("participant-list"),_n=document.getElementById("car-list"),In=document.getElementById("exclusion-list"),xs=document.getElementById("results");document.getElementById("text-output");const St=document.getElementById("family-list"),Vt=document.getElementById("car-list-master"),nn=document.getElementById("parking-list-master");function qr(){const e=document.getElementById("results-section"),t=document.getElementById("main-content");t&&(t.style.display="grid",t.style.gap="1.5rem",window.innerWidth>=768?(t.style.gridTemplateColumns=`repeat(${js}, minmax(0, 1fr))`,e&&(e.style.gridColumn=`span ${js}`)):(t.style.gridTemplateColumns="repeat(1, minmax(0, 1fr))",e&&(e.style.gridColumn="auto")))}async function Ur(){bn=await te.getAllFamilies(),Ga=await te.getAllCars(),as=bn.flatMap(e=>e.members),To(),ss(),rs(),xa(),await cr(),await ur()}async function Ml(){lt=await te.getAllSavedParking()||[],da.clear(),$n(),Qn(),is()}async function pa(){const e=document.getElementById("btn-load-logs");if(e&&!document.getElementById("btn-download-logs-csv")){const s=document.createElement("button");s.id="btn-download-logs-csv",s.className="ml-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-bold shadow",s.textContent="CSVダウンロード",s.onclick=Rl,e.parentNode.insertBefore(s,e.nextSibling)}try{const s=new Date;s.setMonth(s.getMonth()-6),await L.from("action_logs").delete().lt("created_at",s.toISOString())}catch(s){console.error("Log rotation error:",s)}e&&(e.textContent="読込中...");const{data:t,error:n}=await L.from("action_logs").select("*").order("created_at",{ascending:!1}).limit(50);if(e&&(e.textContent="最新を読み込み"),n){console.error("Failed to load logs:",n);return}const a=document.getElementById("log-list");if(a){if(!t||t.length===0){a.innerHTML='<p class="text-gray-500 text-center py-4">ログはありません</p>';return}a.innerHTML=t.map(s=>`
        <div class="border-b border-gray-100 py-2 flex flex-col md:flex-row md:items-center">
            <span class="font-mono text-gray-500 text-xs w-32 shrink-0">${new Date(s.created_at).toLocaleString("ja-JP",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"})}</span>
            <span class="text-blue-600 font-semibold text-xs w-28 shrink-0">${s.action_type}</span>
            <span class="flex-grow text-gray-700 truncate pr-2" title="${s.details}">${s.details}</span>
            <span class="text-gray-400 text-xs text-right w-40 shrink-0 truncate" title="${s.user_email}">${s.user_email}</span>
        </div>
        `).join("")}}async function Rl(){z("ログ取得中...");try{const{data:e,error:t}=await L.from("action_logs").select("*").order("created_at",{ascending:!1}).limit(1e4);if(t)throw t;if(!e||e.length===0)return alert("ログデータがありません");const n=[["日時","アクション","ユーザー","詳細"]];e.forEach(i=>{const d=new Date(i.created_at).toLocaleString("ja-JP"),l=c=>`"${String(c||"").replace(/"/g,'""')}"`;n.push([l(d),l(i.action_type),l(i.user_email),l(i.details)])});const a=new Uint8Array([239,187,191]),s=new Blob([a,n.map(i=>i.join(",")).join(`
`)],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(s),o=document.createElement("a");o.href=r,o.download=`action_logs_${new Date().toISOString().split("T")[0]}.csv`,o.click(),URL.revokeObjectURL(r)}catch(e){console.error(e),alert("CSVの作成に失敗しました: "+e.message)}finally{V()}}function Ol(){var e,t,n,a,s,r,o,i,d,l,c,u,g,b,f;yt==null||yt.addEventListener("change",Hl),yt==null||yt.addEventListener("input",ql),yt==null||yt.addEventListener("click",Fl),_n==null||_n.addEventListener("change",Ul),In==null||In.addEventListener("change",jl),(e=document.getElementById("assign-button"))==null||e.addEventListener("click",Vl),(t=document.getElementById("dispatch-message-close"))==null||t.addEventListener("click",mr),xs==null||xs.addEventListener("change",Wl),(n=document.getElementById("export-state-button"))==null||n.addEventListener("click",Yl),(a=document.getElementById("import-state-input"))==null||a.addEventListener("change",Kl),(s=document.getElementById("show-text-output-button"))==null||s.addEventListener("click",()=>{var y;(y=document.getElementById("text-output-container"))==null||y.classList.toggle("hidden"),va()}),(r=document.getElementById("copy-text-output-button"))==null||r.addEventListener("click",zl),(o=document.getElementById("toggle-details-button"))==null||o.addEventListener("click",Jl),(i=document.getElementById("save-state-db-button"))==null||i.addEventListener("click",Ql),(d=document.getElementById("load-state-db-button"))==null||d.addEventListener("click",Zl),(l=document.getElementById("delete-state-db-button"))==null||l.addEventListener("click",Xl),(c=document.getElementById("save-parking-db-button"))==null||c.addEventListener("click",ec),(u=document.getElementById("load-parking-db-button"))==null||u.addEventListener("click",tc),(g=document.getElementById("delete-parking-db-button"))==null||g.addEventListener("click",nc),(b=document.getElementById("clear-db-button"))==null||b.addEventListener("click",ac),(f=document.getElementById("btn-clear-inputs"))==null||f.addEventListener("click",window.clearCurrentInputs)}function To(){At.clear(),bn.forEach(e=>{e.members.forEach(t=>{const n={grade:"",school:"",other:"",memo:"",...t.data||{}};t.isFlagTarget||(n.grade="",n.school="",n.other=""),At.set(t.id,n)})})}function ss(){if(yt){if(yt.innerHTML="",bn.length===0)return yt.innerHTML='<p class="text-gray-500">データなし</p>';bn.forEach(e=>{const t=document.createElement("details");t.className="bg-gray-50 rounded border",t.open=!0;const n=document.createElement("summary");n.className="p-3 cursor-pointer select-none flex justify-between items-center",n.innerHTML=`<span class="font-semibold">${e.familyName}</span><div class="space-x-1"><button data-family-id="${e.familyName}" data-check-action="check" class="text-xs bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded">全員参加</button><button data-family-id="${e.familyName}" data-check-action="uncheck" class="text-xs bg-gray-400 hover:bg-gray-500 text-white py-1 px-2 rounded">全員不参加</button></div>`;const a=document.createElement("div");a.className="p-3 border-t border-gray-200 space-y-3",e.members.forEach(s=>{const r=yn.has(s.id),o=At.get(s.id)||{grade:"",school:"",other:"",memo:""};let i=s.isFlagTarget?`<input type="text" data-id="${s.id}" data-type="grade" value="${o.grade}" placeholder="学年" class="w-full text-sm p-1 border rounded" ${r?"":"disabled"}>
                 <input type="text" data-id="${s.id}" data-type="school" value="${o.school}" placeholder="学校" class="w-full text-sm p-1 border rounded" ${r?"":"disabled"}>
                 <input type="text" data-id="${s.id}" data-type="other" value="${o.other}" placeholder="その他" class="w-full text-sm p-1 border rounded" ${r?"":"disabled"}>
                 <input type="text" data-id="${s.id}" data-type="memo" value="${o.memo}" placeholder="備考" class="w-full text-sm p-1 border rounded" ${r?"":"disabled"}>`:`<div class="col-span-3"></div><input type="text" data-id="${s.id}" data-type="memo" value="${o.memo}" placeholder="備考" class="w-full text-sm p-1 border rounded" ${r?"":"disabled"}`;a.innerHTML+=`<div class="ml-4"><div class="flex items-center"><input type="checkbox" id="p-${s.id}" data-id="${s.id}" data-action="select-participant" class="mr-3 rounded border-gray-300 text-blue-600" ${r?"checked":""}><label for="p-${s.id}">${s.name} (${s.type})</label></div><div id="data-inputs-${s.id}" class="ml-8 mt-1.5 grid grid-cols-4 gap-2 ${r?"":"opacity-50"}">${i}</div></div>`}),t.appendChild(n),t.appendChild(a),yt.appendChild(t)})}}function Fl(e){const t=e.target.closest("button[data-check-action]");if(!t)return;e.preventDefault();const n=t.dataset.checkAction==="check",a=bn.find(s=>s.familyName===t.dataset.familyId);a&&a.members.forEach(s=>{const r=document.getElementById(`p-${s.id}`);r&&r.checked!==n&&(r.checked=n,r.dispatchEvent(new Event("change",{bubbles:!0})))})}function rs(){if(_n){if(_n.innerHTML="",Ga.length===0)return _n.innerHTML='<p class="text-gray-500">データなし</p>';Ga.forEach(e=>{const t=bn.find(i=>i.familyName===e.familyName),n=(t?t.members:as).filter(i=>i.type!=="選手"&&i.type!=="兄弟"),a=hn.has(e.id);let s="";if(t){const i=n.find(l=>l.type==="保護者"&&(l.name.includes("父")||l.name.includes("監督"))),d=n.find(l=>l.type==="保護者"&&l.name.includes("母"));s=i?i.id:d?d.id:""}const r=Kt.get(e.id)||s;s&&!Kt.has(e.id)&&Kt.set(e.id,s);const o=ln.has(e.id);_n.innerHTML+=`<div class="bg-gray-50 rounded border p-3" data-car-id="${e.id}">
            <div class="flex items-center"><input type="checkbox" id="c-${e.id}" data-id="${e.id}" data-action="select-car" class="mr-3 rounded text-blue-600" ${a?"checked":""}><label for="c-${e.id}" class="font-semibold">${e.name} (定員${e.baseCapacity}名)</label></div>
            <div id="car-options-${e.id}" class="ml-8 mt-3 space-y-3 ${a?"":"hidden"}">
                <select id="driver-${e.id}" data-action="select-driver" class="w-full p-2 border rounded text-sm"><option value="">ドライバー選択...</option>${n.map(i=>`<option value="${i.id}" ${r===i.id?"selected":""}>${i.name}</option>`).join("")}</select>
                <label class="flex items-center"><input type="checkbox" data-action="select-luggage" class="mr-2" ${o?"checked":""}>荷物あり(2名制限)</label>
            </div></div>`})}}function xa(){if(!In)return;In.innerHTML="";const e=as.filter(t=>yn.has(t.id));if(e.length===0)return In.innerHTML='<p class="text-gray-500 text-sm">参加者を選択してください</p>';e.forEach(t=>{In.innerHTML+=`<div class="flex items-center"><input type="checkbox" id="ex-${t.id}" data-id="${t.id}" data-action="exclude-participant" class="mr-3" ${Lt.has(t.id)?"checked":""}><label for="ex-${t.id}">${t.name} (${t.type})</label></div>`})}function Hl(e){const t=e.target;if(t.dataset.action==="select-participant"){const n=t.dataset.id,a=document.getElementById(`data-inputs-${n}`);t.checked?(yn.add(n),a&&(a.classList.remove("opacity-50"),a.querySelectorAll("input").forEach(s=>s.disabled=!1))):(yn.delete(n),Lt.delete(n),a&&(a.classList.add("opacity-50"),a.querySelectorAll("input").forEach(s=>s.disabled=!0))),xa()}}function ql(e){const t=e.target;if(t.dataset.type){const n=At.get(t.dataset.id);n[t.dataset.type]=t.value,At.set(t.dataset.id,n)}}function Ul(e){var a;const t=e.target,n=(a=t.closest("[data-car-id]"))==null?void 0:a.dataset.carId;n&&(t.dataset.action==="select-car"?t.checked?(hn.add(n),document.getElementById(`car-options-${n}`).classList.remove("hidden")):(hn.delete(n),ln.delete(n),document.getElementById(`car-options-${n}`).classList.add("hidden")):t.dataset.action==="select-driver"?t.value?Kt.set(n,t.value):Kt.delete(n):t.dataset.action==="select-luggage"&&(t.checked?ln.add(n):ln.delete(n)))}function jl(e){const t=e.target;t.dataset.action==="exclude-participant"&&(t.checked?Lt.add(t.dataset.id):Lt.delete(t.dataset.id))}function Vl(){var y,p,m,w,v,x,k,$,h,E;if(hn.size===0)return ft("車を選択してください","error");Je={date:((y=document.getElementById("event-date"))==null?void 0:y.value)||"",name:((p=document.getElementById("event-name"))==null?void 0:p.value)||"",timeline:((m=document.getElementById("event-timeline"))==null?void 0:m.value)||"",notes:((w=document.getElementById("event-notes"))==null?void 0:w.value)||""},Ce={groundName:((v=document.getElementById("ground-name"))==null?void 0:v.value)||"",designated:{name:((x=document.getElementById("parking-designated-name"))==null?void 0:x.value)||"指定駐車場",limit:parseInt((k=document.getElementById("parking-designated-limit"))==null?void 0:k.value)||999,memo:(($=document.getElementById("parking-designated-memo"))==null?void 0:$.value)||""},other:{name:((h=document.getElementById("parking-other-name"))==null?void 0:h.value)||"指定以外",memo:((E=document.getElementById("parking-other-memo"))==null?void 0:E.value)||""}};let e=!1;if(ie&&ie.length>0&&ie.some(_=>_.id!=="excluded-car")){if(confirm(`すでに配車結果が存在します。
現在の配車状態を【維持】して、追加・変更分のみを反映しますか？
（「キャンセル」を選ぶと、全てリセットして最初からやり直すか確認します）`))e=!0;else if(!confirm(`現在の状態を【全てリセット】して、最初から割り当てをやり直しますか？
（キャンセルを選ぶと処理を中断します）`))return}let t=[],n=new Map,a=[];const s=as.filter(_=>yn.has(_.id)).map(_=>{const I=bn.find(A=>A.members.some(P=>P.id===_.id)),S=At.get(_.id)||{};return{..._,grade:S.grade,school:S.school,other:S.other,memo:S.memo,familyName:I?I.familyName:null}});if(hn.forEach(_=>{const I=Kt.get(_),S=Ga.find(M=>M.id===_);if(!S)return;if(!I)return t.push(`${S.name}のドライバー未選択`);const A=s.find(M=>M.id===I);if(!A)return t.push(`${S.name}のドライバーが参加者にいません`);n.set(_,A);const P=ln.has(_);a.push({id:_,name:S.name,familyName:S.familyName,baseCapacity:P?2:S.baseCapacity,driverId:I,capacity:P?1:S.baseCapacity-1,hasLuggage:P})}),t.length>0)return ft(t.join("<br>"),"error");const r=new Set(Array.from(n.values()).map(_=>_.id));let o=s.filter(_=>Lt.has(_.id)&&!r.has(_.id)),i=[];e?a.forEach(_=>{let I=ie.find(A=>A.id===_.id),S=[];I&&(S=I.members.filter(A=>{if(!A)return!1;let P=s.some(G=>G.id===A.id),M=Lt.has(A.id),N=r.has(A.id);return P&&!M&&!N}),S.length>_.capacity&&(S=S.slice(0,_.capacity))),i.push({..._,driver:n.get(_.id),members:S})}):i=a.map(_=>({..._,driver:n.get(_.id),members:[]}));let d=new Set(r);i.forEach(_=>_.members.forEach(I=>{I&&d.add(I.id)}));let l=s.filter(_=>!d.has(_.id)&&!Lt.has(_.id));i.reduce((_,I)=>_+I.capacity,0),i.reduce((_,I)=>_+I.members.length,0);let c=[...l];const u={保護者:1,兄弟:2,選手:3,その他:4};i.forEach(_=>{_.driver&&_.familyName&&c.filter(S=>S.familyName===_.familyName).sort((S,A)=>(u[S.type]||9)-(u[A.type]||9)).forEach(S=>{_.members.length<_.capacity&&(_.members.push(S),c=c.filter(A=>A.id!==S.id))})}),c.sort((_,I)=>_.isFlagTarget===I.isFlagTarget?Math.random()-.5:_.isFlagTarget?-1:1).forEach(_=>{let I=[],S=0;if(i.forEach(A=>{if(A.members.length>=A.capacity)return;let P=A.members.filter(M=>M).reduce((M,N)=>M+(N.isFlagTarget&&_.isFlagTarget?(_.grade===N.grade?1:0)+(_.school===N.school?1:0):0),0);P>S?(S=P,I=[A]):P===S&&I.push(A)}),I.length>0)I[Math.floor(Math.random()*I.length)].members.push(_);else{let A=i.filter(P=>P.members.length<P.capacity);A.length>0&&A[0].members.push(_)}}),i.forEach(_=>{for(_.members=_.members.filter(I=>I);_.members.length<_.capacity;)_.members.push(null)}),e?i.sort((_,I)=>{let S=ie.findIndex(P=>P.id===_.id),A=ie.findIndex(P=>P.id===I.id);return S!==-1&&A!==-1?S-A:S!==-1?-1:A!==-1?1:I.members.filter(P=>P&&P.type==="選手").length-_.members.filter(P=>P&&P.type==="選手").length}):i.sort((_,I)=>I.members.filter(S=>S&&S.type==="選手").length-_.members.filter(S=>S&&S.type==="選手").length);let g=0;i.forEach(_=>{if(e){let I=ie.find(S=>S.id===_.id);I?(_.assignedParking=I.assignedParking,_.assignedParking==="designated"&&g++):g<Ce.designated.limit?(_.assignedParking="designated",g++):_.assignedParking="other"}else g<Ce.designated.limit?(_.assignedParking="designated",g++):_.assignedParking="other"});const b=new Set(r);i.forEach(_=>{_.members.forEach(I=>{I&&b.add(I.id)})}),s.filter(_=>!b.has(_.id)&&!Lt.has(_.id)).forEach(_=>{o.some(I=>I.id===_.id)||o.push(_)}),i.push({id:"excluded-car",name:"別便",capacity:999,baseCapacity:999,driver:null,members:o,hasLuggage:!1,assignedParking:"excluded"}),ie=i,os(),va()}function os(){const e=document.getElementById("results");if(!e)return;if(e.innerHTML="",qt={car:null,seat:null},ie.length===0){e.innerHTML='<p class="text-gray-500 bg-white p-4 rounded shadow">結果なし</p>',jr();return}(Je.name||Je.date)&&(e.innerHTML+=`<h2 class="text-2xl font-bold mb-2">${Je.date} ${Je.name} ${Ce.groundName?`@${Ce.groundName}`:""}</h2>`);const t=ie.filter(r=>r.assignedParking==="designated"),n=ie.filter(r=>r.assignedParking==="other"),a=ie.filter(r=>r.id==="excluded-car"),s=(r,o,i)=>`<div class="bg-white rounded shadow p-4"><h3 class="font-bold text-lg mb-2">◆${o.name||"別便"} ${r==="designated"&&o.limit<999?`(${o.limit}台)`:""}</h3><p class="text-sm text-gray-600 mb-4 whitespace-pre-line">${o.memo}</p><div class="grid grid-cols-1 md:grid-cols-3 gap-4">${i.map(Gl).join("")}</div></div>`;e.innerHTML+=s("designated",Ce.designated,t),e.innerHTML+=s("other",Ce.other,n),a[0].members.length>0&&(e.innerHTML+=s("excluded",{name:"別便",memo:""},a)),jr()}function Gl(e){var r,o;`${e.id}`;let t="",n="",a="";const s=`swap-car-${e.id}`;if(e.id==="excluded-car"){t=`<div class="p-4 border-b bg-gray-100 flex-shrink-0"><h4 class="font-bold text-lg text-gray-700">合計: ${e.members.length}名</h4></div>`,a=e.members.map((d,l)=>{var b;if(!d)return"";const c=(((b=At.get(d.id))==null?void 0:b.memo)||"").trim(),u=d.isFlagTarget&&(d.grade||d.school||d.other)?[d.grade,d.school,d.other].filter(Boolean).join(" "):"",g=`seat-${e.id}-${d.id}`;return`<li class="p-2 bg-gray-100 rounded shadow-sm flex items-center justify-between">
                        <div class="flex items-center min-w-0">
                            <input type="checkbox" id="${g}" data-swap-type="seat" data-car-id="${e.id}" data-participant-id="${d.id}" data-is-driver="false" data-slot-index="${l}" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                            <label for="${g}" class="flex flex-col min-w-0">
                                <span class="break-words">${d.name} (${d.type})</span>
                                ${c?`<span class="text-xs text-gray-500 break-words">[${c}]</span>`:""}
                            </label>
                        </div>
                        <span class="text-xs text-gray-400 ml-2 flex-shrink-0">${u}</span>
                    </li>`}).join("");const i="seat-excluded-car-empty";a+=`<li class="p-2 bg-gray-50 rounded shadow-sm flex items-center">
                            <input type="checkbox" id="${i}" data-swap-type="seat" data-car-id="${e.id}" data-participant-id="empty" data-is-driver="false" data-slot-index="-1" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                            <label for="${i}" class="text-gray-400 italic">-- 別便へ移動 --</label>
                        </li>`}else{const i=(e.driver?1:0)+e.members.filter(p=>p!==null).length,d=e.baseCapacity-i,l=e.capacity-e.members.filter(p=>p!==null).length,c=e.hasLuggage?" (荷物あり)":"";t=`
            <div class="p-4 border-b flex-shrink-0 flex items-center car-header">
                <input type="checkbox" id="${s}" data-swap-type="car" data-car-id="${e.id}" class="mr-3 rounded border-gray-400 text-green-600 focus:ring-green-500">
                <div>
                    <h4 class="font-bold text-lg"><label for="${s}">${e.name} ${c}</label></h4>
                    <p class="text-sm font-medium ${l<0?"text-red-600":"text-blue-600"}">
                    総定員 ${e.baseCapacity}名 (空き ${d}名)
                    </p>
                </div>
            </div>`;const u=e.driver,g=u?u.id:"empty",b=u?`[D] ${u.name} (${u.type})`:"ドライバー空席",f=u&&(((r=At.get(u.id))==null?void 0:r.memo)||"").trim(),y=`seat-${e.id}-driver`;n=`
        <div id="driver-dropzone-${e.id}" class="p-4 border-b driver-dropzone flex-shrink-0">
            <li class="p-2 ${u?"bg-blue-100":"bg-red-50"} rounded shadow-sm flex items-center">
                 <input type="checkbox" id="${y}" data-swap-type="seat" data-car-id="${e.id}" data-participant-id="${g}" data-is-driver="true" data-slot-index="-1" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                 <label for="${y}" class="flex flex-col min-w-0 ${u?"text-blue-800":"text-red-700"}">
                    <span class="font-semibold break-words">${b}</span>
                    ${f?`<span class="text-xs ${u?"text-blue-600":"text-red-600"} ml-2 break-words">[${f}]</span>`:""}
                 </label>
            </li>
        </div>`;for(let p=0;p<e.capacity;p++){const m=e.members[p];if(m){const w=(((o=At.get(m.id))==null?void 0:o.memo)||"").trim(),v=m.isFlagTarget&&(m.grade||m.school||m.other)?[m.grade,m.school,m.other].filter(Boolean).join(" "):"",x=`seat-${e.id}-${m.id}`;a+=`<li class="p-2 bg-gray-100 rounded shadow-sm flex items-center justify-between">
                                    <div class="flex items-center min-w-0">
                                        <input type="checkbox" id="${x}" data-swap-type="seat" data-car-id="${e.id}" data-participant-id="${m.id}" data-is-driver="false" data-slot-index="${p}" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                        <label for="${x}" class="flex flex-col min-w-0">
                                            <span class="break-words">${m.name} (${m.type})</span>
                                            ${w?`<span class="text-xs text-gray-500 break-words">[${w}]</span>`:""}
                                        </label>
                                    </div>
                                    <span class="text-xs text-gray-400 ml-2 flex-shrink-0">${v}</span>
                                </li>`}else{const w=`seat-${e.id}-empty-${p}`;a+=`<li class="p-2 bg-gray-50 rounded shadow-sm flex items-center">
                                    <input type="checkbox" id="${w}" data-swap-type="seat" data-car-id="${e.id}" data-participant-id="empty" data-is-driver="false" data-slot-index="${p}" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                    <label for="${w}" class="text-gray-400 italic">-- 空席 --</label>
                                </li>`}}}return`<div class="bg-white border rounded-lg shadow-md car-dropzone flex flex-col">${t}${n}<ul id="members-dropzone-${e.id}" class="p-4 space-y-2 min-h-[50px] members-dropzone flex-grow overflow-y-auto">${a}</ul></div>`}function Wl(e){const t=e.target;if(t.type!=="checkbox"||!t.dataset.swapType)return;const n=t.dataset.swapType;if(qt[n]&&qt[n].el===t){qt[n]=null,t.closest("div").classList.remove("swap-selected");return}const a={carId:t.dataset.carId,pid:t.dataset.participantId,isD:t.dataset.isDriver==="true",idx:parseInt(t.dataset.slotIndex),el:t};if(t.closest("div").classList.add("swap-selected"),n==="car"&&qt.seat||n==="seat"&&qt.car)return t.checked=!1,ft("車と席の混在不可","error");if(!qt[n]){qt[n]=a;return}const s=qt[n],r=a;if(n==="car"){const o=ie.find(d=>d.id===s.carId),i=ie.find(d=>d.id===r.carId);if(o&&i)if(o.assignedParking===i.assignedParking){const d=ie.indexOf(o),l=ie.indexOf(i);d>-1&&l>-1&&([ie[d],ie[l]]=[ie[l],ie[d]])}else{const d=o.assignedParking;o.assignedParking=i.assignedParking,i.assignedParking=d}}else{const o=ie.find(c=>c.id===s.carId),i=ie.find(c=>c.id===r.carId),d=s.pid==="empty"?null:s.isD?o.driver:o.members[s.idx],l=r.pid==="empty"?null:r.isD?i.driver:i.members[r.idx];s.isD?o.driver=l:o.id!=="excluded-car"?o.members[s.idx]=l:(o.members=o.members.filter(c=>c&&c.id!==(d==null?void 0:d.id)),l&&o.members.push(l)),r.isD?i.driver=d:i.id!=="excluded-car"?i.members[r.idx]=d:(i.members=i.members.filter(c=>c&&c.id!==(l==null?void 0:l.id)),d&&i.members.push(d)),[o,i].forEach(c=>{if(c.id!=="excluded-car")for(c.members=c.members.filter(u=>u);c.members.length<c.capacity;)c.members.push(null);else c.members=c.members.filter(u=>u)})}os(),va()}function va(){const e=document.getElementById("text-output");if(!e)return;if(ie.length===0){e.value="";return}const t=Ce.groundName?`@${Ce.groundName}`:"";let n=[`${Je.date} ${Je.name}${t}
`];Je.timeline&&n.push(Je.timeline+`
`);const a=o=>`${o.name.replace(/の車|家の車/g,"カー")} (${o.driver?o.driver.name:"未定"}, ${o.members.filter(i=>i).map(i=>(i.type==="選手"?"★":"")+i.name).join(", ")}${o.hasLuggage?", 荷物":""})`;n.push(`◆${Ce.designated.name}
${Ce.designated.memo}`),ie.filter(o=>o.assignedParking==="designated").forEach(o=>n.push("・"+a(o)));const s=ie.filter(o=>o.assignedParking==="other");s.length>0&&(n.push(`
◆${Ce.other.name}
${Ce.other.memo}`),s.forEach(o=>n.push("・"+a(o))));const r=ie.find(o=>o.id==="excluded-car");r&&r.members.length>0&&(n.push(`
◆別便`),r.members.filter(o=>o).forEach(o=>n.push("・"+(o.type==="選手"?"★":"")+o.name))),Je.notes&&n.push(`
◆その他
`+Je.notes),e.value=n.join(`
`)}function zl(){const e=document.getElementById("text-output");e&&(navigator.clipboard.writeText(e.value),ft("コピーしました","success"))}function Jl(){const e=document.getElementById("toggle-details-button"),t=e.textContent==="すべて開く";yt.querySelectorAll("details").forEach(n=>n.open=t),e.textContent=t?"すべて閉じる":"すべて開く"}function Do(){var e,t,n,a,s,r,o,i,d,l;return Je={date:((e=document.getElementById("event-date"))==null?void 0:e.value)||"",name:((t=document.getElementById("event-name"))==null?void 0:t.value)||"",timeline:((n=document.getElementById("event-timeline"))==null?void 0:n.value)||"",notes:((a=document.getElementById("event-notes"))==null?void 0:a.value)||""},Ce={groundName:((s=document.getElementById("ground-name"))==null?void 0:s.value)||"",designated:{name:((r=document.getElementById("parking-designated-name"))==null?void 0:r.value)||"指定駐車場",limit:parseInt((o=document.getElementById("parking-designated-limit"))==null?void 0:o.value)||999,memo:((i=document.getElementById("parking-designated-memo"))==null?void 0:i.value)||""},other:{name:((d=document.getElementById("parking-other-name"))==null?void 0:d.value)||"指定以外",memo:((l=document.getElementById("parking-other-memo"))==null?void 0:l.value)||""}},{selectedParticipantIds:Array.from(yn),selectedCarIds:Array.from(hn),selectedDrivers:Array.from(Kt.entries()),selectedLuggage:Array.from(ln),excludedParticipantIds:Array.from(Lt),participantData:Array.from(At.entries()),currentAssignments:ie,parkingInfo:Ce,eventInfo:Je}}function Co(e){var t,n,a,s,r;yn=new Set(e.selectedParticipantIds||[]),hn=new Set(e.selectedCarIds||[]),Kt=new Map(e.selectedDrivers||[]),ln=new Set(e.selectedLuggage||[]),Lt=new Set(e.excludedParticipantIds||[]),At=new Map(e.participantData||[]),Ce=e.parkingInfo||{groundName:"",designated:{name:"",limit:0,memo:""},other:{name:"",memo:""}},Je=e.eventInfo||{date:"",name:"",timeline:"",notes:""},document.getElementById("event-date")&&(document.getElementById("event-date").value=Je.date||""),document.getElementById("event-name")&&(document.getElementById("event-name").value=Je.name||""),document.getElementById("event-timeline")&&(document.getElementById("event-timeline").value=Je.timeline||""),document.getElementById("event-notes")&&(document.getElementById("event-notes").value=Je.notes||""),document.getElementById("ground-name")&&(document.getElementById("ground-name").value=Ce.groundName||""),document.getElementById("parking-designated-name")&&(document.getElementById("parking-designated-name").value=((t=Ce.designated)==null?void 0:t.name)||""),document.getElementById("parking-designated-limit")&&(document.getElementById("parking-designated-limit").value=((n=Ce.designated)==null?void 0:n.limit)||""),document.getElementById("parking-designated-memo")&&(document.getElementById("parking-designated-memo").value=((a=Ce.designated)==null?void 0:a.memo)||""),document.getElementById("parking-other-name")&&(document.getElementById("parking-other-name").value=((s=Ce.other)==null?void 0:s.name)||""),document.getElementById("parking-other-memo")&&(document.getElementById("parking-other-memo").value=((r=Ce.other)==null?void 0:r.memo)||""),ie=e.currentAssignments||[],os(),va()}function Yl(){const e=new Blob([JSON.stringify(Do(),null,2)],{type:"application/json"}),t=document.createElement("a");t.href=URL.createObjectURL(e),t.download="state.json",t.click()}function Kl(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=a=>{Co(JSON.parse(a.target.result)),ss(),rs(),xa()},n.readAsText(t)}async function Ql(){const e=document.getElementById("saved-state-select"),t=e.value;let n=`${document.getElementById("event-date").value}_${document.getElementById("event-name").value}`,a=!1,s=null;if(t){const r=e.options[e.selectedIndex];confirm(`現在「${r.text}」が選択されています。
このデータに上書き保存しますか？
（「キャンセル」を選ぶと新規保存になります）`)&&(a=!0,n=r.text,s=t)}if(!a){const r=prompt("保存名",n);if(!r)return;n=r}try{a&&s&&await te.deleteState(s),await te.saveState(Do(),n),await cr();const r=document.getElementById("saved-state-select");for(let o=0;o<r.options.length;o++)if(r.options[o].text===n){r.selectedIndex=o;break}ft(a?"上書き保存しました":"保存しました","success")}catch{ft("保存に失敗しました","error")}}async function Zl(){const e=document.getElementById("saved-state-select").value;if(!e)return;const t=await te.getState(e);t&&(Co(t.state),ss(),rs(),xa(),ft("読込完了","success"))}async function Xl(){const e=document.getElementById("saved-state-select").value;e&&(await te.deleteState(e),await cr(),ft("削除完了","success"))}async function cr(){const e=await te.getAllSavedStates(),t=document.getElementById("saved-state-select");t&&(t.innerHTML='<option value="">作業一覧...</option>'+e.map(n=>`<option value="${n.id}">${n.name}</option>`).join(""))}async function ec(){const e=document.getElementById("saved-parking-select"),t=e.value;let n=document.getElementById("ground-name").value||"新規駐車場",a=!1,s=null;if(t){const o=e.options[e.selectedIndex];confirm(`現在「${o.text}」が選択されています。
このデータに上書き保存しますか？
（「キャンセル」を選ぶと新規保存になります）`)&&(a=!0,n=o.text,s=t)}if(!a){const o=prompt("駐車場保存名",n);if(!o)return;n=o}const r={groundName:document.getElementById("ground-name").value,designated:{name:document.getElementById("parking-designated-name").value,limit:parseInt(document.getElementById("parking-designated-limit").value),memo:document.getElementById("parking-designated-memo").value},other:{name:document.getElementById("parking-other-name").value,memo:document.getElementById("parking-other-memo").value}};try{a&&s&&await te.deleteParking(s),await te.saveParking(r,n),await ur();const o=document.getElementById("saved-parking-select");for(let i=0;i<o.options.length;i++)if(o.options[i].text===n){o.selectedIndex=i;break}ft(a?"駐車場を上書き保存しました":"駐車場を保存しました","success")}catch{ft("保存に失敗しました","error")}}async function tc(){const e=document.getElementById("saved-parking-select").value;if(!e)return;const t=await te.getParking(e);t&&(document.getElementById("ground-name").value=t.parking.groundName,document.getElementById("parking-designated-name").value=t.parking.designated.name,document.getElementById("parking-designated-limit").value=t.parking.designated.limit,document.getElementById("parking-designated-memo").value=t.parking.designated.memo,document.getElementById("parking-other-name").value=t.parking.other.name,document.getElementById("parking-other-memo").value=t.parking.other.memo,ft("駐車場読込完了","success"))}async function nc(){const e=document.getElementById("saved-parking-select").value;e&&(await te.deleteParking(e),await ur(),ft("駐車場削除完了","success"))}async function ur(){const e=await te.getAllSavedParking(),t=document.getElementById("saved-parking-select");t&&(t.innerHTML='<option value="">駐車場一覧...</option>'+e.map(n=>`<option value="${n.id}">${n.name}</option>`).join(""))}async function ac(){confirm("全データをリセットしますか？")&&(await te.clearDatabase(),location.reload())}window.clearCurrentInputs=function(){if(!confirm(`現在の入力内容（イベント情報、選択メンバー、車、駐車場、配車結果など）をすべてクリアして、初期状態に戻しますか？
（※データベースに保存されているマスタデータや過去の保存データは削除されません）`))return;const e=document.getElementById("event-date");e&&(e.value="");const t=document.getElementById("event-name");t&&(t.value="");const n=document.getElementById("event-timeline");n&&(n.value="");const a=document.getElementById("event-remarks");a&&(a.value="");const s=document.getElementById("ground-name");s&&(s.value="");const r=document.getElementById("parking-name");r&&(r.value="");const o=document.getElementById("parking-limit");o&&(o.value="99");const i=document.getElementById("parking-remarks");i&&(i.value="");const d=document.getElementById("other-parking-name");d&&(d.value="");const l=document.getElementById("other-parking-remarks");l&&(l.value=""),yn.clear(),hn.clear(),Kt.clear(),ln.clear(),Lt.clear(),At.clear(),To(),ie=[],ss(),rs(),xa(),os(),va(),window.att_swapSelectedMember=null,window.att_swapSelectedCar=null,ft("画面の入力をクリアしました。","success")};function ft(e,t="info"){const n=document.getElementById("dispatch-message");let a="bg-blue-100 text-blue-700 border-blue-200";t==="error"?a="bg-red-100 text-red-700 border-red-200":t==="success"?a="bg-green-100 text-green-700 border-green-200":t==="warning"&&(a="bg-yellow-100 text-yellow-800 border-yellow-200"),n.className=`p-4 h-full border rounded-lg ${a}`,document.getElementById("dispatch-message-text").innerHTML=e,n.classList.remove("hidden"),ys&&clearTimeout(ys),t!=="warning"&&(ys=setTimeout(mr,5e3))}function mr(){document.getElementById("dispatch-message").classList.add("hidden")}function sc(){if(!ie||ie.length===0)return!1;for(const t of ie){if(t.id==="excluded-car")continue;if((t.driver?1:0)+t.members.filter(a=>a!==null).length>t.baseCapacity)return!0}const e=ie.find(t=>t.id==="excluded-car");return e?e.members.some(t=>t&&!Lt.has(t.id)):!1}function jr(){if(sc())ft("定員オーバーです。車の台数が足りないか、定員を超過している車があります。","warning");else{const e=document.getElementById("dispatch-message"),t=document.getElementById("dispatch-message-text");e&&!e.classList.contains("hidden")&&t&&t.innerHTML.includes("定員オーバー")&&mr()}}function rc(){var t,n,a,s,r,o,i;const e=document.querySelector("#view-master h2");if(e&&!document.getElementById("btn-back-to-dispatch-master")){const d=document.createElement("button");d.id="btn-back-to-dispatch-master",d.className="bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 px-4 py-2 rounded shadow font-bold text-sm mb-4 flex items-center w-fit",d.innerHTML='<span class="mr-1">◀</span> 配車調整に戻る',d.addEventListener("click",()=>{var l;return(l=document.getElementById("nav-dispatch"))==null?void 0:l.click()}),e.parentElement.insertBefore(d,e)}(t=document.getElementById("add-family-button"))==null||t.addEventListener("click",ic),St==null||St.addEventListener("click",dc),St==null||St.addEventListener("input",cc),St==null||St.addEventListener("change",lc),(n=document.getElementById("add-car-button"))==null||n.addEventListener("click",uc),Vt==null||Vt.addEventListener("click",mc),Vt==null||Vt.addEventListener("input",pc),(a=document.getElementById("add-parking-button-master"))==null||a.addEventListener("click",fc),nn==null||nn.addEventListener("click",gc),nn==null||nn.addEventListener("input",bc),(s=document.getElementById("export-master-button"))==null||s.addEventListener("click",yc),(r=document.getElementById("import-master-input"))==null||r.addEventListener("change",hc),(o=document.getElementById("master-message-close"))==null||o.addEventListener("click",No),(i=document.getElementById("save-master-db-button"))==null||i.addEventListener("click",oc)}async function oc(){const e=document.getElementById("save-master-db-button");try{e.textContent="保存中...",await te.syncAllMaster(),Vs("マスターデータをサーバーに保存しました","success"),lt=await te.getAllSavedParking()||[],pa()}catch(t){Vs("保存に失敗しました: "+t.message,"error")}finally{e.textContent="マスターデータを保存 (更新)"}}function $n(){St&&(St.innerHTML="",Ee.sort((e,t)=>(e.order??99)-(t.order??99)).forEach((e,t)=>{const n=e.members.map(a=>`<div class="p-2 border rounded bg-gray-50 member-grid"><input data-id="${a.id}" data-f="name" value="${a.name}" class="col-span-3 md:col-span-1 p-1 border"><select data-id="${a.id}" data-f="type" class="col-span-2 md:col-span-1 p-1 border"><option ${a.type==="選手"?"selected":""}>選手</option><option ${a.type==="保護者"?"selected":""}>保護者</option><option ${a.type==="兄弟"?"selected":""}>兄弟</option><option ${a.type==="その他"?"selected":""}>その他</option></select><input data-id="${a.id}" data-f="data.grade" value="${a.data.grade||""}" placeholder="学年" class="col-span-1 border"><input data-id="${a.id}" data-f="data.school" value="${a.data.school||""}" placeholder="学校" class="col-span-2 md:col-span-1 border"><input data-id="${a.id}" data-f="data.other" value="${a.data.other||""}" placeholder="他" class="col-span-2 md:col-span-1 border"><input data-id="${a.id}" data-f="data.memo" value="${a.data.memo||""}" placeholder="備考" class="col-span-2 md:col-span-1 border"><div class="col-span-3 md:col-span-1 flex items-center justify-between"><label class="text-xs"><input type="checkbox" data-id="${a.id}" data-f="isFlagTarget" ${a.isFlagTarget?"checked":""}>同乗優先</label><button data-action="del-m" data-id="${a.id}" class="bg-red-500 text-white px-2 py-1 rounded text-xs">削</button></div></div>`).join("");St.innerHTML+=`<div class="bg-white border rounded shadow" data-fname="${e.familyName}"><div class="family-header"><input data-action="ren-f" value="${e.familyName}" class="font-bold border p-1"><div class="space-x-2"><button data-action="up" class="bg-gray-400 text-white px-2 rounded text-xs">▲</button><button data-action="down" class="bg-gray-400 text-white px-2 rounded text-xs">▼</button><button data-action="del-f" class="bg-red-500 text-white px-2 py-1 rounded text-xs">家族削除</button></div></div><div class="p-3 space-y-2">${n}</div><button data-action="add-m" class="ml-3 mb-3 bg-blue-500 text-white px-2 py-1 rounded text-xs">＋メンバー</button></div>`}))}function ic(){const e=prompt("家族名");e&&(te.addFamily({familyName:e,order:99,members:[{id:"p"+Date.now(),name:"新規",type:"選手",isFlagTarget:!0,data:{}}]}),$n())}async function dc(e){const t=e.target,n=t.dataset.action,a=t.closest("[data-fname]");if(!a)return;const s=a.dataset.fname;if(n==="del-f"&&confirm("削除?")&&(te.deleteFamily(s),$n()),n==="add-m"){const r=await te.getFamily(s);r.members.push({id:"p"+Date.now(),name:"新規",type:"保護者",isFlagTarget:!1,data:{}}),te.updateFamily(r),$n()}if(n==="del-m"){const r=await te.getFamily(s);r.members=r.members.filter(o=>o.id!==t.dataset.id),te.updateFamily(r),$n()}if(n==="up"||n==="down"){Ee.sort((i,d)=>(i.order??99)-(d.order??99)),Ee.forEach((i,d)=>{i.order=d});const r=Ee.findIndex(i=>i.familyName===s),o=n==="up"?r-1:r+1;if(o>=0&&o<Ee.length){const i=Ee[r].order;Ee[r].order=Ee[o].order,Ee[o].order=i,$n()}}}function lc(e){const t=e.target,n=t.closest("[data-fname]");if(!n)return;const a=n.dataset.fname;if(t.dataset.action==="ren-f"){const s=t.value.trim();if(s&&s!==a){if(Ee.find(i=>i.familyName===s)){alert(`家族名「${s}」は既に存在します。別の名前を入力してください。`),t.value=a;return}const o=Ee.find(i=>i.familyName===a);if(o){o.familyName=s,n.dataset.fname=s;let i=!1;_e.forEach(d=>{d.familyName===a&&(d.familyName=s,i=!0)}),i&&Qn()}}else s||(t.value=a)}}async function cc(e){const t=e.target;if(t.dataset.action==="ren-f")return;const n=t.dataset.id,a=t.dataset.f,s=t.closest("[data-fname]").dataset.fname;if(!n||!a)return;const r=await te.getFamily(s),o=r.members.find(d=>d.id===n),i=t.type==="checkbox"?t.checked:t.value;a.startsWith("data.")?o.data[a.split(".")[1]]=i:o[a]=i,te.updateFamily(r)}function Qn(){Vt&&(Vt.innerHTML="",_e.sort((e,t)=>(e.order??99)-(t.order??99)).forEach(e=>{Vt.innerHTML+=`<div class="p-3 border rounded bg-gray-50 flex flex-wrap gap-2 items-center" data-cid="${e.id}"><button data-act="up" class="bg-gray-400 text-white px-2 py-1 text-xs">▲</button><button data-act="down" class="bg-gray-400 text-white px-2 py-1 text-xs">▼</button><input data-f="name" value="${e.name}" class="p-1 border text-sm w-32"><input data-f="familyName" value="${e.familyName}" class="p-1 border text-sm w-32"><input type="number" data-f="baseCapacity" value="${e.baseCapacity}" class="p-1 border text-sm w-16"><button data-act="del" class="bg-red-500 text-white px-2 py-1 rounded text-xs">削</button></div>`}))}function uc(){te.addCar({id:"c"+Date.now(),name:"新規車",familyName:"",baseCapacity:5,order:99}),Qn()}function mc(e){const t=e.target,n=t.dataset.act,a=t.closest("[data-cid]");if(!a)return;const s=a.dataset.cid;if(n==="del"&&(te.deleteCar(s),Qn()),n==="up"||n==="down"){_e.sort((i,d)=>(i.order??99)-(d.order??99)),_e.forEach((i,d)=>{i.order=d});const r=_e.findIndex(i=>i.id===s),o=n==="up"?r-1:r+1;if(o>=0&&o<_e.length){const i=_e[r].order;_e[r].order=_e[o].order,_e[o].order=i,Qn()}}}async function pc(e){const t=e.target,n=t.dataset.f,a=t.closest("[data-cid]").dataset.cid;if(!n)return;const s=await te.getCar(a);s[n]=t.type==="number"?parseInt(t.value):t.value,te.updateCar(s)}function is(){nn.innerHTML="",lt.forEach(e=>{nn.innerHTML+=`
        <div class="p-4 border rounded bg-gray-50 text-sm shadow-sm" data-pid="${e.id}">
            <div class="flex justify-between items-center mb-3">
                <div class="flex-1 flex items-center space-x-2">
                    <label class="font-bold text-gray-700">保存名:</label>
                    <input data-f="name" value="${e.name}" class="border p-1.5 rounded w-1/2 font-bold bg-white" placeholder="駐車場データの保存名">
                </div>
                <button data-act="del" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow text-xs">削除</button>
            </div>
            <div class="space-y-3">
                <div>
                    <input data-f="parking.groundName" value="${e.parking.groundName||""}" placeholder="グラウンド名 (例: 東谷グラウンド)" class="border p-1.5 rounded w-full bg-white font-semibold">
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div class="border p-3 rounded bg-white shadow-sm">
                        <label class="block text-xs font-bold text-blue-800 mb-2 border-b pb-1">指定駐車場</label>
                        <input data-f="parking.designated.name" value="${e.parking.designated.name||""}" placeholder="名称 (例: SF-A面)" class="border p-1.5 rounded w-full mb-2">
                        <div class="flex items-center space-x-2 mb-2">
                            <span class="text-xs text-gray-600">台数制限:</span>
                            <input type="number" data-f="parking.designated.limit" value="${e.parking.designated.limit||""}" placeholder="台数" class="border p-1.5 rounded w-24">
                        </div>
                        <textarea data-f="parking.designated.memo" placeholder="備考 (地図URLや注意事項など)" rows="2" class="border p-1.5 rounded w-full">${e.parking.designated.memo||""}</textarea>
                    </div>
                    <div class="border p-3 rounded bg-white shadow-sm">
                        <label class="block text-xs font-bold text-green-800 mb-2 border-b pb-1">指定以外の駐車場</label>
                        <input data-f="parking.other.name" value="${e.parking.other.name||""}" placeholder="名称 (例: 丘の上)" class="border p-1.5 rounded w-full mb-2">
                        <textarea data-f="parking.other.memo" placeholder="備考" rows="4" class="border p-1.5 rounded w-full">${e.parking.other.memo||""}</textarea>
                    </div>
                </div>
            </div>
        </div>`})}function fc(){te.addParkingMaster({groundName:"",designated:{name:"",limit:0,memo:""},other:{name:"",memo:""}},"新規P"),is()}function gc(e){e.target.dataset.act==="del"&&(te.deleteParkingMaster(e.target.closest("[data-pid]").dataset.pid),is())}function bc(e){const t=e.target,n=t.dataset.f,a=t.closest("[data-pid]").dataset.pid;if(!n)return;const s=lt.find(o=>o.id===a),r=t.type==="number"?parseInt(t.value):t.value;if(n==="name")s.name=r;else{const o=n.split(".");o.length===2?s[o[0]][o[1]]=r:s[o[0]][o[1]][o[2]]=r}te.updateParkingMaster(s)}async function yc(){const e={families:Ee,cars:_e,parking:await te.getAllSavedParking()},t=document.createElement("a");t.href=URL.createObjectURL(new Blob([JSON.stringify(e)],{type:"application/json"})),t.download="master.json",t.click()}function hc(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=a=>{const s=JSON.parse(a.target.result);if(te.bulkAddFamilies(s.families),te.bulkAddCars(s.cars),s.parking){lt.forEach(r=>da.add(r.id)),lt=[];for(let r of s.parking)lt.push({id:r.id||"p"+Date.now()+Math.floor(Math.random()*1e3),name:r.name,timestamp:r.timestamp||Date.now(),parking:r.parking,isNew:!0})}$n(),Qn(),is(),Vs("読込完了 (※まだ保存されていません。保存ボタンを押してください)","info")},n.readAsText(t)}function Vs(e,t="info"){const n=document.getElementById("master-message");n.className=`p-4 mb-4 border rounded-lg ${t==="error"?"bg-red-100 text-red-700":t==="success"?"bg-green-100 text-green-700":"bg-blue-100 text-blue-700"}`,document.getElementById("master-message-text").innerHTML=e,n.classList.remove("hidden"),hs&&clearTimeout(hs),hs=setTimeout(No,5e3)}function No(){document.getElementById("master-message").classList.add("hidden")}let Qt={type:"",add:[],update:[],delete:[]};function Po(e,t,n,a,s,r=""){Qt={type:e,add:t,update:n,delete:a},document.getElementById("csv-confirm-title").textContent=s,document.getElementById("csv-add-count").textContent=t.length,document.getElementById("csv-update-count").textContent=n.length,document.getElementById("csv-delete-count").textContent=a.length;const o=document.getElementById("csv-confirm-warning");r?(o.innerHTML=r,o.classList.remove("hidden")):o.classList.add("hidden"),document.getElementById("tab-csv-add").onclick=()=>Hn("add"),document.getElementById("tab-csv-update").onclick=()=>Hn("update"),document.getElementById("tab-csv-delete").onclick=()=>Hn("delete"),t.length>0?Hn("add"):n.length>0?Hn("update"):Hn("delete"),document.getElementById("csv-confirm-modal").classList.remove("hidden")}function Wa(){document.getElementById("csv-confirm-modal").classList.add("hidden");const e=document.getElementById("input-import-users-csv");e&&(e.value="");const t=document.getElementById("input-import-events-csv");t&&(t.value="")}function Hn(e){["add","update","delete"].forEach(n=>{const a=document.getElementById(`tab-csv-${n}`);n===e?(a.classList.add("text-blue-600","border-blue-600"),a.classList.remove("text-gray-500","border-transparent")):(a.classList.remove("text-blue-600","border-blue-600"),a.classList.add("text-gray-500","border-transparent"))}),xc(e)}function xc(e){const t=document.getElementById("csv-confirm-content"),n=Qt[e];if(!n||n.length===0){t.innerHTML='<p class="text-gray-500 p-4">対象のデータはありません。</p>';return}let a="";if(Qt.type==="users"){const s=e==="add",r=e==="update";a+=`
        <div class="overflow-x-auto border rounded">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-3 py-2 text-left text-xs font-bold text-gray-500">氏名</th>
                        <th class="px-3 py-2 text-left text-xs font-bold text-gray-500">メールアドレス</th>
                        <th class="px-3 py-2 text-left text-xs font-bold text-gray-500">役割</th>
                        <th class="px-3 py-2 text-left text-xs font-bold text-gray-500">グループ</th>
                        <th class="px-3 py-2 text-left text-xs font-bold text-gray-500">属性</th>
                        <th class="px-3 py-2 text-left text-xs font-bold text-gray-500">代行入力先</th>
                        ${s?'<th class="px-3 py-2 text-left text-xs font-bold text-gray-500">初期パスワード</th>':""}
                        ${r?'<th class="px-3 py-2 text-left text-xs font-bold text-gray-500">パスワード更新</th>':""}
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    ${n.map(o=>`
                        <tr>
                            <td class="px-3 py-2 whitespace-nowrap">${o.name}</td>
                            <td class="px-3 py-2 whitespace-nowrap">${o.email}</td>
                            <td class="px-3 py-2 whitespace-nowrap">${o.role==="admin"?"管理者":o.role==="leader"?"リーダー":"一般"}</td>
                            <td class="px-3 py-2 whitespace-nowrap">${o.group_name||"なし"}</td>
                            <td class="px-3 py-2 whitespace-nowrap">${o.attribute_name||"なし"}</td>
                            <td class="px-3 py-2 whitespace-nowrap">${o.delegations!==null?o.delegations.length>0?o.delegations.join(", "):"なし":"-(変更なし)"}</td>
                            ${s?`<td class="px-3 py-2 whitespace-nowrap font-mono text-blue-600 font-bold">${o.is_dummy?'<span class="text-gray-400 font-normal">不要(代行専用)</span>':o.initial_password}</td>`:""}
                            ${r?`<td class="px-3 py-2 whitespace-nowrap font-mono text-orange-600 font-bold">${o.initial_password?o.initial_password:'<span class="text-gray-400 font-normal">変更なし</span>'}</td>`:""}
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>`}else Qt.type==="events"&&(a+=`
        <div class="overflow-x-auto border rounded">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-3 py-2 text-left text-xs font-bold text-gray-500">タイトル</th>
                        <th class="px-3 py-2 text-left text-xs font-bold text-gray-500">カテゴリ</th>
                        <th class="px-3 py-2 text-left text-xs font-bold text-gray-500">場所</th>
                        <th class="px-3 py-2 text-left text-xs font-bold text-gray-500">開始日時</th>
                        <th class="px-3 py-2 text-left text-xs font-bold text-gray-500">対象グループ</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    ${n.map(s=>`
                        <tr>
                            <td class="px-3 py-2 whitespace-nowrap font-bold text-gray-900">${s.title}</td>
                            <td class="px-3 py-2 whitespace-nowrap">${s.category||""}</td>
                            <td class="px-3 py-2 whitespace-nowrap">${s.location||""}</td>
                            <td class="px-3 py-2 whitespace-nowrap">${s.start_time.replace("T"," ")}</td>
                            <td class="px-3 py-2 whitespace-nowrap">${s.target_group_name||"全体"}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>`);t.innerHTML=a}function Mo(e){const t=[];let n=[],a="",s=!1;for(let r=0;r<e.length;r++){const o=e[r];s?o==='"'?r+1<e.length&&e[r+1]==='"'?(a+='"',r++):s=!1:a+=o:o==='"'?s=!0:o===","?(n.push(a),a=""):o===`
`||o==="\r"?(n.push(a),t.push(n),n=[],a="",o==="\r"&&r+1<e.length&&e[r+1]===`
`&&r++):a+=o}return(a||n.length>0)&&(n.push(a),t.push(n)),t}function pr(e){if(e==null)return"";const t=String(e);return t.includes(",")||t.includes('"')||t.includes(`
`)||t.includes("\r")?'"'+t.replace(/"/g,'""')+'"':t}async function vc(){z("メンバー情報をエクスポート中...");try{const{data:e}=await L.from("app_users").select("*").order("created_at",{ascending:!1}),{data:t}=await L.from("user_groups").select("*"),{data:n}=await L.from("groups").select("*"),{data:a}=await L.from("user_attributes").select("*"),s=new Map(n.map(b=>[b.id,b.name])),r=new Map(a.map(b=>[b.id,b.name])),o=new Map(t.map(b=>[b.user_email,b.group_id]));let i=window.adminDelegations;if(!i){const{data:b}=await L.from("master_data").select("*").eq("key","ATTENDANCE_DELEGATIONS").single();i=b&&b.data?b.data:{},window.adminDelegations=i}const l=[["メールアドレス","氏名","役割","所属グループ名","ユーザー属性名","配車利用可(1/0)","成績利用可(1/0)","出欠利用可(1/0)","シミュレータ利用可(1/0)","Info利用可(1/0)","Info編集可(1/0)","代行入力先(カンマ区切りメールアドレス)","代行専用(1/0)","初期パスワード","削除(1/0)"]];e.forEach(b=>{const f=b.role==="admin"?"管理者":b.role==="leader"?"リーダー":"一般ユーザー",y=o.get(b.email),p=y&&s.get(y)||"",m=b.attribute_id&&r.get(b.attribute_id)||"",w=i[b.email]?i[b.email].join(","):"",v=b.email.endsWith("@local.dummy");l.push([b.email,b.name||"",f,p,m,b.can_use_dispatch!==!1?"1":"0",b.can_use_dashboard!==!1?"1":"0",b.can_use_attendance!==!1?"1":"0",b.can_use_simulator!==!1?"1":"0",b.can_use_info!==!1?"1":"0",b.can_edit_info===!0||b.role==="admin"||b.role==="leader"&&b.can_edit_info!==!1?"1":"0",w,v?"1":"0","","0"])});const c=l.map(b=>b.map(pr).join(",")).join(`
`),u=new Blob([new Uint8Array([239,187,191]),c],{type:"text/csv;charset=utf-8;"}),g=document.createElement("a");g.href=URL.createObjectURL(u),g.download=`members_${new Date().toISOString().split("T")[0]}.csv`,g.click()}catch(e){console.error(e),alert("エクスポートに失敗しました: "+e.message)}finally{V()}}async function wc(e){const t=e.target.files[0];if(!t)return;z("CSVファイルを解析中...");const n=new FileReader;n.onload=async a=>{try{const s=a.target.result,r=Mo(s);if(r.length<2){alert("有効なデータがありません。"),V();return}const o=r[0].map(B=>B.trim()),i=o.indexOf("メールアドレス"),d=o.indexOf("氏名"),l=o.indexOf("役割"),c=o.indexOf("所属グループ名"),u=o.indexOf("ユーザー属性名"),g=o.findIndex(B=>B.includes("配車")),b=o.findIndex(B=>B.includes("成績")),f=o.findIndex(B=>B.includes("出欠")),y=o.findIndex(B=>B.includes("シミュレータ")),p=o.findIndex(B=>(B.includes("Info")||B.includes("インフォ"))&&!B.includes("編集")),m=o.findIndex(B=>(B.includes("Info")||B.includes("インフォ"))&&B.includes("編集")),w=o.findIndex(B=>B.includes("代行入力先")),v=o.findIndex(B=>B.includes("代行専用")),x=o.findIndex(B=>B.includes("初期パスワード")),k=o.findIndex(B=>B.includes("削除"));if(i===-1||d===-1){alert("「メールアドレス」および「氏名」列は必須です。"),V();return}const{data:$}=await L.from("app_users").select("*"),{data:h}=await L.from("user_groups").select("*"),{data:E}=await L.from("groups").select("*"),{data:_}=await L.from("user_attributes").select("*");let I=window.adminDelegations;if(!I){const{data:B}=await L.from("master_data").select("*").eq("key","ATTENDANCE_DELEGATIONS").single();I=B&&B.data?B.data:{},window.adminDelegations=I}const S=new Map(E.map(B=>[B.name,B.id])),A=new Map(_.map(B=>[B.name,B.id])),P=new Map($.map(B=>[B.email,B])),M=new Map(h.map(B=>[B.user_email,B.group_id])),N=[],G=[],R=[];for(let B=1;B<r.length;B++){const C=r[B];if(C.length<2)continue;const T=(C[d]||"").trim();if(!T)continue;let F=(C[i]||"").trim();const X=v!==-1?C[v]==="1"||C[v]==="true"||C[v]==="代行専用":!1,W=F.endsWith("@local.dummy"),Z=X||W;if(F)Z&&!W&&(F.includes("@")?F=F.split("@")[0]+"@local.dummy":F=F+"@local.dummy");else if(Z)F=`dummy_${Date.now()}_${B}@local.dummy`;else continue;F=ns(F);const j=(C[l]||"").trim();let Q="user";j==="管理者"||j==="admin"?Q="admin":(j==="リーダー"||j==="leader")&&(Q="leader");const H=c!==-1?(C[c]||"").trim():"",re=H&&S.get(H)||null,oe=u!==-1?(C[u]||"").trim():"",he=oe&&A.get(oe)||null,Te=g!==-1?!(C[g]==="0"||C[g]==="false"):!0,tt=b!==-1?!(C[b]==="0"||C[b]==="false"):!0,me=f!==-1?!(C[f]==="0"||C[f]==="false"):!0,ot=y!==-1?!(C[y]==="0"||C[y]==="false"):!0,He=p!==-1?!(C[p]==="0"||C[p]==="false"):!0,Ft=m!==-1?C[m]==="1"||C[m]==="true"||C[m]==="可":Q==="admin"||Q==="leader"&&!0,Dt=k!==-1?C[k]==="1"||C[k]==="削除":!1;let xt=null;w!==-1&&(xt=(C[w]||"").split(",").map(q=>q.trim()).filter(Boolean));let vt="",gt=null;if(!Z){const D=x!==-1?(C[x]||"").trim():"";if(P.has(F))D.length>=6&&(gt=D);else if(D.length>=6)vt=D;else{const q="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";let fe="pw-";for(let ve=0;ve<6;ve++)fe+=q.charAt(Math.floor(Math.random()*q.length));vt=fe}}const K={email:F,name:T,role:Q,group_id:re,group_name:H,attribute_id:he,attribute_name:oe,can_use_dispatch:Te,can_use_dashboard:tt,can_use_attendance:me,can_use_simulator:ot,can_use_info:He,can_edit_info:Ft,delegations:xt,is_dummy:Z,initial_password:gt!==null?gt:vt},pe=P.get(F);if(pe)if(Dt)R.push(K);else{const D=M.get(F)!==re,q=pe.role!==Q,fe=pe.name!==T,ve=pe.attribute_id!==he,it=pe.can_use_dispatch!==!1!==Te,Qe=pe.can_use_dashboard!==!1!==tt,Mn=pe.can_use_attendance!==!1!==me,nt=pe.can_use_simulator!==!1!==ot,Se=pe.can_use_info!==!1!==He,ye=pe.can_edit_info===!0!==Ft;let ce=!1;if(xt!==null){const O=I[F]||[],U=[...xt].sort().join(","),J=[...O].sort().join(",");U!==J&&(ce=!0)}let Ze=!1;gt!==null&&(Ze=!0),(D||q||fe||ve||it||Qe||Mn||nt||Se||ye||ce||Ze)&&G.push(K)}else Dt||(K.delegations===null&&(K.delegations=[]),N.push(K))}V(),Po("users",N,G,R,"メンバーCSVインポート確認")}catch(s){console.error(s),alert("CSVの解析に失敗しました: "+s.message),V()}},n.readAsText(t)}async function Ec(){Qt.type==="users"?await _c():Qt.type==="events"&&typeof window.executeEventsImport=="function"&&await window.executeEventsImport()}async function _c(){z("インポートデータを保存中...");try{const{add:e,update:t,delete:n}=Qt;let a=window.adminDelegations;if(!a){const{data:d}=await L.from("master_data").select("*").eq("key","ATTENDANCE_DELEGATIONS").single();a=d&&d.data?d.data:{},window.adminDelegations=a}if(n.length>0){const d=n.map(c=>c.email),{error:l}=await L.from("app_users").delete().in("email",d);if(l)throw l;d.forEach(c=>{delete window.adminDelegations[c]}),Object.keys(window.adminDelegations).forEach(c=>{window.adminDelegations[c]=(window.adminDelegations[c]||[]).filter(u=>!d.includes(u))}),await be("IMPORT_USERS_DELETE",`${n.length}件のユーザーをインポートで削除しました`)}if(e.length>0){const d=[];for(let g of e)if(!g.is_dummy)try{const b=window.supabase.createClient(Yn,ja,{auth:{persistSession:!1,autoRefreshToken:!1}}),{error:f}=await b.auth.signUp({email:g.email,password:g.initial_password});if(f)throw new Error(`Auth作成失敗: ${f.message}`)}catch(b){console.error(`Sign up error for ${g.email}:`,b),d.push(`${g.email}: ${b.message}`)}if(d.length>0&&!confirm(`一部のアカウント払い出し（Auth）に失敗しました。データベース登録を続行しますか？

エラー内容:
${d.join(`
`)}`))throw new Error("インポート処理を中断しました。");const l=e.map(g=>({email:g.email,name:g.name,role:g.role,attribute_id:g.attribute_id,can_use_dispatch:g.can_use_dispatch,can_use_dashboard:g.can_use_dashboard,can_use_attendance:g.can_use_attendance,can_use_simulator:g.can_use_simulator,can_use_info:g.can_use_info,can_edit_info:g.can_edit_info}));let{error:c}=await L.from("app_users").insert(l);if(c&&c.message&&c.message.includes("can_edit_info")){const g=l.map(f=>{const y={...f};return delete y.can_edit_info,y});c=(await L.from("app_users").insert(g)).error}if(c)throw c;const u=e.filter(g=>g.group_id).map(g=>({user_email:g.email,group_id:g.group_id}));if(u.length>0){const{error:g}=await L.from("user_groups").insert(u);if(g)throw g}e.forEach(g=>{g.delegations&&(window.adminDelegations[g.email]=g.delegations)}),await be("IMPORT_USERS_ADD",`${e.length}件のユーザーをインポートで追加しました`)}if(t.length>0){const d=[];for(let l of t){if(l.initial_password)try{const{error:b}=await L.rpc("admin_update_user_password",{user_email:l.email,new_password:l.initial_password});if(b)throw b;await be("ADMIN_CHANGE_PASSWORD",`ユーザー「${l.email}」のパスワードをインポートで変更しました`)}catch(b){console.error(`Failed to update password for ${l.email}:`,b),d.push(`${l.email}: ${b.message}`)}const c={name:l.name,role:l.role,attribute_id:l.attribute_id,can_use_dispatch:l.can_use_dispatch,can_use_dashboard:l.can_use_dashboard,can_use_attendance:l.can_use_attendance,can_use_simulator:l.can_use_simulator,can_use_info:l.can_use_info,can_edit_info:l.can_edit_info};let{error:u}=await L.from("app_users").update(c).eq("email",l.email);if(u&&u.message&&u.message.includes("can_edit_info")){const b={...c};delete b.can_edit_info,u=(await L.from("app_users").update(b).eq("email",l.email)).error}if(u)throw u;const{data:g}=await L.from("user_groups").select("*").eq("user_email",l.email);if(l.group_id)if(g&&g.length>0){const{error:b}=await L.from("user_groups").update({group_id:l.group_id}).eq("user_email",l.email);if(b)throw b}else{const{error:b}=await L.from("user_groups").insert([{user_email:l.email,group_id:l.group_id}]);if(b)throw b}else if(g&&g.length>0){const{error:b}=await L.from("user_groups").delete().eq("user_email",l.email);if(b)throw b}l.delegations!==null&&(window.adminDelegations[l.email]=l.delegations)}d.length>0&&alert(`一部のパスワード更新に失敗しました。詳細は開発者コンソールを確認してください。

失敗したユーザー:
${d.join(`
`)}`),await be("IMPORT_USERS_UPDATE",`${t.length}件のユーザーをインポートで更新しました`)}const{error:s}=await L.from("master_data").upsert({key:"ATTENDANCE_DELEGATIONS",data:window.adminDelegations});if(s)throw s;let r="インポートが完了しました。";const o=e.filter(d=>!d.is_dummy),i=t.filter(d=>d.initial_password);(o.length>0||i.length>0)&&(r+=`

【アカウントのログイン情報・変更内容】`,o.length>0&&(r+=`
[新規アカウントの仮パスワード]`,o.forEach(d=>{r+=`
氏名: ${d.name}
ログインID: ${Tn(d.email)}
仮パスワード: ${d.initial_password}
------------------------`})),i.length>0&&(r+=`
[更新アカウントの新パスワード]`,i.forEach(d=>{r+=`
氏名: ${d.name}
ログインID: ${Tn(d.email)}
新パスワード: ${d.initial_password}
------------------------`})),r+=`

※上記情報をコピーし、対象のユーザーへお伝えください。`),alert(r),Wa(),await xe()}catch(e){console.error(e),alert("保存に失敗しました: "+e.message)}finally{V()}}window.showCSVConfirmModal=Po;window.closeCSVConfirmModal=Wa;window.parseCSV=Mo;window.escapeCSV=pr;function Ic(){const n=[["メールアドレス","氏名","役割","所属グループ名","ユーザー属性名","配車利用可(1/0)","成績利用可(1/0)","出欠利用可(1/0)","代行入力先(カンマ区切りメールアドレス)","代行専用(1/0)","初期パスワード","削除(1/0)"],["sample_parent@example.com","山田 太郎","一般ユーザー","選手・保護者","A軍","1","1","1","sample_child1@example.com,sample_child2@example.com","0","tempPw123","0"],["sample_child1@example.com","山田 一郎","一般ユーザー","選手・保護者","A軍","1","0","1","","0","tempPw123","0"],["sample_child2@example.com","山田 二郎","一般ユーザー","選手・保護者","A軍","1","0","1","","0","tempPw123","0"],["","代行専用の子ども","一般ユーザー","選手・保護者","A軍","0","0","1","","1","","0"]].map(r=>r.map(pr).join(",")).join(`
`),a=new Blob([new Uint8Array([239,187,191]),n],{type:"text/csv;charset=utf-8;"}),s=document.createElement("a");s.href=URL.createObjectURL(a),s.download="members_sample.csv",s.click()}const $c=Object.freeze(Object.defineProperty({__proto__:null,get csvImportState(){return Qt},get currentUser(){return Y},get currentUserRole(){return qe},forceHideLoading:at,goToUsersAdmin:Ao,hideLoading:V,logAction:be,openChangePasswordModal:lr,showLoading:z,supabaseClient:L,switchAuthScreen:se,withLoading:Ne},Symbol.toStringTag,{value:"Module"}));
