(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();let An=new Date,Mt=[],ht=[],lt=[],ar=[],us=[],Gt=[],ze=[],xn=[],pn=[],Sr=!1,Ms=[],vn=[],Se=[];window.att_multiSelectMode=!1;window.att_selectedDates=new Set;window.att_selectedCategories=new Set;window.att_selectedGroups=new Set;function ca(e){let t=e.target_group_ids||[];if(t.length===0&&e.target_group_id&&(t=[e.target_group_id]),t.length===0)return{ids:[],name:"全体",color:"#e5e7eb"};const n=ht.filter(a=>t.includes(a.id));return n.length===0?{ids:[],name:"全体",color:"#e5e7eb"}:{ids:t,name:n.map(a=>a.name).join(", "),color:n[0].color||"#e5e7eb",groups:n}}function to(e){return e.ids.length===0?'<span class="text-xs border border-gray-300 text-gray-800 px-2 py-0.5 rounded shadow-sm" style="background-color: #e5e7eb">全体</span>':e.groups.map(t=>`<span class="text-xs border border-gray-300 text-gray-800 px-2 py-0.5 rounded shadow-sm" style="background-color: ${t.color||"#e5e7eb"}">${t.name}</span>`).join(" ")}function no(e){if(!e)return"-";try{const t=new Date(e);if(isNaN(t.getTime()))return"-";const n=t.getMonth()+1,a=t.getDate(),s=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}/${a} ${s}:${r}`}catch{return"-"}}async function Ps(){try{Sr||(Zo(),Sr=!0),await Gn(),yt(),Xo(),ei()}catch(e){console.error("Attendance App Init Error:",e),typeof dt=="function"&&dt()}}function Zo(){var n,a,s,r,o,i,d,l,u,c,f,p,b,h,g,m,y,x,E,k,_,S,I,v,w;const e=document.getElementById("btn-logout-att");if(e&&!document.getElementById("btn-change-password-att")){const $=document.createElement("button");$.id="btn-change-password-att",$.className="text-xs md:text-sm bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 md:px-3 md:py-1 rounded shadow mr-2 font-bold",$.textContent="パスワード変更",$.onclick=()=>vr(),e.parentNode.insertBefore($,e)}(n=document.getElementById("tab-calendar"))==null||n.addEventListener("click",()=>kr("calendar")),(a=document.getElementById("tab-list"))==null||a.addEventListener("click",()=>{kr("list"),un()}),(s=document.getElementById("cal-prev-month"))==null||s.addEventListener("click",()=>{An.setMonth(An.getMonth()-1),yt()}),(r=document.getElementById("cal-next-month"))==null||r.addEventListener("click",()=>{An.setMonth(An.getMonth()+1),yt()}),(o=document.getElementById("cal-today"))==null||o.addEventListener("click",()=>{An=new Date,yt()}),(i=document.getElementById("btn-add-event"))==null||i.addEventListener("click",()=>Ia()),(d=document.getElementById("btn-export-events"))==null||d.addEventListener("click",yi),(l=document.getElementById("btn-import-events"))==null||l.addEventListener("click",()=>document.getElementById("input-import-events-csv").click()),(u=document.getElementById("btn-import-ics-events"))==null||u.addEventListener("click",()=>document.getElementById("input-import-events-ics").click()),(c=document.getElementById("btn-download-events-sample"))==null||c.addEventListener("click",wi),(f=document.getElementById("input-import-events-csv"))==null||f.addEventListener("change",xi),(p=document.getElementById("input-import-events-ics"))==null||p.addEventListener("change",_i),(b=document.getElementById("btn-close-ics-modal-x"))==null||b.addEventListener("click",Rs),(h=document.getElementById("btn-close-ics-modal"))==null||h.addEventListener("click",Rs),(g=document.getElementById("btn-execute-ics-import"))==null||g.addEventListener("click",Ii),(m=document.getElementById("ics-import-list"))==null||m.addEventListener("change",$=>{if($.target&&$.target.classList.contains("ics-row-location-select")){const A=$.target,P=A.closest(".ics-row").querySelector(".ics-row-location");A.value&&A.value!=="custom"?P.value=A.value:A.value==="custom"&&(P.value="",P.focus())}});const t=document.getElementById("btn-group-manage");t&&(t.style.display="none"),(y=document.getElementById("btn-toggle-multiselect"))==null||y.addEventListener("click",function(){window.att_multiSelectMode=!window.att_multiSelectMode,window.att_multiSelectMode||window.att_selectedDates.clear(),this.classList.toggle("bg-blue-600",window.att_multiSelectMode),this.classList.toggle("text-white",window.att_multiSelectMode),this.classList.toggle("bg-blue-50",!window.att_multiSelectMode),this.classList.toggle("text-blue-600",!window.att_multiSelectMode),yt(),window.att_updateMultiselectBar()}),(x=document.getElementById("btn-cal-filter"))==null||x.addEventListener("click",Lr),(E=document.getElementById("btn-cal-filter-clear"))==null||E.addEventListener("click",$s),(k=document.getElementById("btn-list-filter"))==null||k.addEventListener("click",Lr),(_=document.getElementById("btn-list-filter-clear"))==null||_.addEventListener("click",$s),(S=document.getElementById("btn-close-filter-modal-x"))==null||S.addEventListener("click",Wa),(I=document.getElementById("btn-close-filter-modal"))==null||I.addEventListener("click",Wa),(v=document.getElementById("btn-apply-filter"))==null||v.addEventListener("click",ti),(w=document.getElementById("btn-filter-clear"))==null||w.addEventListener("click",$s)}function kr(e){const t=document.getElementById("tab-calendar"),n=document.getElementById("tab-list");e==="calendar"?(document.getElementById("calendar-container").classList.remove("hidden"),document.getElementById("list-container").classList.add("hidden"),t.classList.replace("bg-white","bg-green-600"),t.classList.replace("text-green-600","text-white"),n.classList.replace("bg-green-600","bg-white"),n.classList.replace("text-white","text-green-600")):(document.getElementById("calendar-container").classList.add("hidden"),document.getElementById("list-container").classList.remove("hidden"),n.classList.replace("bg-white","bg-green-600"),n.classList.replace("text-green-600","text-white"),t.classList.replace("bg-green-600","bg-white"),t.classList.replace("text-white","text-green-600"))}async function Gn(){W("イベント・出欠データ読み込み中...");try{const{data:e}=await B.from("groups").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});e&&(ht=e);const{data:t}=await B.from("event_categories").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});t&&t.length>0?lt=t:lt=[{id:"1",name:"練習"},{id:"2",name:"試合"},{id:"3",name:"イベント"}];const n=new Date,a=new Date(n.getFullYear(),n.getMonth()-6,1),s=new Date(n.getFullYear(),n.getMonth()+7,1),{data:r}=await B.from("events").select("*").gte("start_time",a.toISOString()).lt("start_time",s.toISOString()).order("start_time");r&&(Mt=r);const{data:o}=await B.from("app_users").select("email, name, attribute_id, can_use_attendance");o&&(xn=o);const{data:i}=await B.from("user_attributes").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});i&&(pn=i);try{const{data:u}=await B.from("event_locations").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});u&&(vn=u)}catch(u){console.warn("event_locations table might not exist yet:",u),vn=[]}const{data:d}=await B.from("user_groups").select("*");d&&(Gt=d,Y&&(ar=d.filter(u=>u.user_email===Y.email)));let l=[];if(Mt&&Mt.length>0){const u=Mt.map(f=>f.id),{data:c}=await B.from("attendances").select("*").in("event_id",u);c&&(l=c)}ze=l,Y&&(us=l.filter(u=>u.user_email===Y.email));try{const{data:u}=await B.from("master_data").select("data").eq("key","ATTENDANCE_DELEGATIONS").single();u&&u.data&&Y&&(Ms=u.data[Y.email]||[])}catch{Ms=[]}}catch(e){console.error("Attendance DB Error:",e)}finally{typeof dt=="function"?dt():V()}}function Xo(){const e=document.getElementById("filter-group");e&&(e.innerHTML='<option value="">すべてのグループ</option>'+ht.map(t=>`<option value="${t.id}">${t.name}</option>`).join(""))}function ei(){const e=document.getElementById("filter-category");if(!e)return;const t=e.value;e.innerHTML='<option value="">すべてのカテゴリ</option>'+lt.map(n=>`<option value="${n.name}">${n.name}</option>`).join(""),lt.some(n=>n.name===t)&&(e.value=t)}function Lr(){const e=document.getElementById("filter-modal-content");if(!e)return;let t="";t+='<div class="mb-5">',t+='<h4 class="text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">カテゴリ（複数選択）</h4>',lt.length===0?t+='<p class="text-xs text-gray-400">カテゴリが登録されていません</p>':(t+='<div class="grid grid-cols-2 gap-2">',lt.forEach(a=>{const s=window.att_selectedCategories.has(a.name)?"checked":"";t+=`
                <label class="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition">
                    <input type="checkbox" class="filter-cat-checkbox w-4 h-4 rounded text-green-600 focus:ring-green-500 border-gray-300" value="${a.name}" ${s}>
                    <span class="select-none">${a.name}</span>
                </label>
            `}),t+="</div>"),t+="</div>",t+='<div class="mb-2">',t+='<h4 class="text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">対象グループ（複数選択）</h4>',t+='<div class="grid grid-cols-2 gap-2">';const n=window.att_selectedGroups.has("all")?"checked":"";t+=`
        <label class="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition font-medium">
            <input type="checkbox" class="filter-group-checkbox w-4 h-4 rounded text-green-600 focus:ring-green-500 border-gray-300" value="all" ${n}>
            <span class="select-none font-semibold text-gray-900">全体（全員対象）</span>
        </label>
    `,ht.length>0&&ht.forEach(a=>{const s=window.att_selectedGroups.has(a.id)?"checked":"";t+=`
                <label class="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition">
                    <input type="checkbox" class="filter-group-checkbox w-4 h-4 rounded text-green-600 focus:ring-green-500 border-gray-300" value="${a.id}" ${s}>
                    <span class="select-none">${a.name}</span>
                </label>
            `}),t+="</div>",t+="</div>",e.innerHTML=t,document.getElementById("filter-modal").classList.remove("hidden")}function Wa(){document.getElementById("filter-modal").classList.add("hidden")}function ti(){const e=document.querySelectorAll(".filter-cat-checkbox"),t=document.querySelectorAll(".filter-group-checkbox");window.att_selectedCategories.clear(),e.forEach(n=>{n.checked&&window.att_selectedCategories.add(n.value)}),window.att_selectedGroups.clear(),t.forEach(n=>{n.checked&&window.att_selectedGroups.add(n.value)}),ao(),yt(),un(),Wa()}function $s(){window.att_selectedCategories.clear(),window.att_selectedGroups.clear(),ao(),yt(),un(),Wa()}function ao(){const e=window.att_selectedCategories.size+window.att_selectedGroups.size,t=document.getElementById("cal-filter-badge"),n=document.getElementById("btn-cal-filter-clear"),a=document.getElementById("btn-cal-filter"),s=document.getElementById("list-filter-badge"),r=document.getElementById("btn-list-filter-clear"),o=document.getElementById("btn-list-filter");e>0?(t&&(t.textContent=e,t.classList.remove("hidden")),n&&n.classList.remove("hidden"),a&&(a.classList.remove("bg-[#e6e5dd]","hover:bg-[#dcdad2]","text-slate-800"),a.classList.add("bg-green-100","hover:bg-green-200","text-green-800","border-green-300")),s&&(s.textContent=e,s.classList.remove("hidden")),r&&r.classList.remove("hidden"),o&&(o.classList.remove("bg-gray-100","hover:bg-gray-200","text-gray-800"),o.classList.add("bg-green-100","hover:bg-green-200","text-green-800","border-green-300"))):(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),a&&(a.classList.remove("bg-green-100","hover:bg-green-200","text-green-800","border-green-300"),a.classList.add("bg-[#e6e5dd]","hover:bg-[#dcdad2]","text-slate-800")),s&&s.classList.add("hidden"),r&&r.classList.add("hidden"),o&&(o.classList.remove("bg-green-100","hover:bg-green-200","text-green-800","border-green-300"),o.classList.add("bg-gray-100","hover:bg-gray-200","text-gray-800")))}function so(){return Mt.filter(e=>{if(window.att_selectedCategories&&window.att_selectedCategories.size>0&&!window.att_selectedCategories.has(e.category))return!1;if(window.att_selectedGroups&&window.att_selectedGroups.size>0){const t=ca(e);if(t.ids.length===0){if(!window.att_selectedGroups.has("all"))return!1}else if(!t.ids.some(a=>window.att_selectedGroups.has(a)))return!1}return!0})}function yt(){const e=An.getFullYear(),t=An.getMonth();document.getElementById("cal-current-month").textContent=`${e}年${t+1}月`;const n=document.getElementById("calendar-grid");n&&n.classList.remove("gap-1","gap-px","gap-2","p-1","p-2","p-4"),Array.from(n.children).forEach((i,d)=>{d>=7&&n.removeChild(i)});const s=new Date(e,t,1).getDay(),r=new Date(e,t,1-s),o=new Date;for(let i=0;i<42;i++){const d=new Date(r);d.setDate(r.getDate()+i);const l=d.getFullYear(),u=d.getMonth(),c=d.getDate(),f=u===t,p=`${l}-${String(u+1).padStart(2,"0")}-${String(c).padStart(2,"0")}`,b=window.att_multiSelectMode&&window.att_selectedDates.has(p),h=d.getDay(),g=hi(d),m=l===o.getFullYear()&&u===o.getMonth()&&c===o.getDate(),y=document.createElement("div");let x="border-r border-b min-h-[100px] flex flex-col p-0 cursor-pointer";f?g||h===0?x+=" bg-sunday-hatch":h===6?x+=" bg-saturday-hatch":x+=" bg-white":x+=" bg-gray-50 opacity-60",b&&(x="border-2 border-blue-500 min-h-[100px] flex flex-col p-0 bg-blue-50/70 cursor-pointer z-10"),m&&!window.att_multiSelectMode&&(x+=" today-cell-border"),y.className=x,y.onclick=()=>{window.att_multiSelectMode?(window.att_selectedDates.has(p)?window.att_selectedDates.delete(p):window.att_selectedDates.add(p),yt(),window.att_updateMultiselectBar()):Ia(p)};const E=document.createElement("div");let k="text-gray-700";f&&(g||h===0?k="text-red-600 font-bold":h===6&&(k="text-blue-600 font-bold")),E.className=`text-right text-[11px] ${k} mb-0 pr-1 pt-1 leading-none`,E.textContent=c,y.appendChild(E);const _=document.createElement("div");_.className="flex-1 overflow-hidden flex flex-col gap-0";const I=so().filter($=>$.start_time&&$.start_time.startsWith(p)),v=I.slice(0,5),w=I.length>5;if(v.forEach($=>{const A=document.createElement("div"),P=us.find(T=>T.event_id===$.id);let R="",D="text-gray-800";if($.requires_attendance){const T=P?P.status:"未入力";T==="出席"?(R='<span class="inline-block text-[9px] font-bold text-white bg-blue-600 rounded px-0.5 mr-0.5 leading-none shrink-0 align-middle">出</span>',D="text-blue-700 font-bold"):T==="欠席"?(R='<span class="inline-block text-[9px] font-bold text-white bg-gray-400 rounded px-0.5 mr-0.5 leading-none shrink-0 align-middle">欠</span>',D="text-gray-800 opacity-70"):T==="保留"||T==="未定"?(R='<span class="inline-block text-[9px] font-bold text-white bg-amber-500 rounded px-0.5 mr-0.5 leading-none shrink-0 align-middle">保</span>',D="text-gray-800"):(R='<span class="inline-block text-[9px] font-bold text-white bg-red-500 rounded px-0.5 mr-0.5 leading-none shrink-0 align-middle">未</span>',D="text-red-600 font-bold")}const M=lt.find(T=>T.name===$.category),C=(M==null?void 0:M.color)||"#bfdbfe",L=($.title||"").replace(/[\r\n]+/g," ");A.className=`text-[10px] rounded px-0.5 py-px truncate whitespace-nowrap overflow-hidden text-ellipsis w-full text-left cursor-pointer hover:opacity-80 leading-tight mb-0.5 ${D}`,A.style.backgroundColor=C,A.innerHTML=`${R}${L}`,A.title=$.title,A.onclick=T=>{T.stopPropagation(),window.att_openEventDetail($.id)},_.appendChild(A)}),w){const $=document.createElement("div");$.className="text-[10px] text-gray-500 text-center mt-[1px] cursor-pointer hover:underline",$.textContent=`他 ${I.length-5} 件`,$.onclick=A=>{A.stopPropagation(),alert(`${p} の予定が多すぎます。リストビューで確認してください。`)},_.appendChild($)}y.appendChild(_),n.appendChild(y)}}const sr=["日","月","火","水","木","金","土"];function ni(e){const t=new Date(e);if(isNaN(t.getTime()))return e;const n=t.getDate(),a=sr[t.getDay()];return`${n}日(${a})`}function ai(e,t,n){const a=new Date(e);if(isNaN(a.getTime()))return"日時未定";const s=a.getMonth()+1,r=a.getDate(),o=sr[a.getDay()],i=`${s}/${r}(${o})`;if(n)return`${i} 終日`;const d=e.substring(11,16);let l="";if(t){const u=new Date(t);isNaN(u.getTime())||(l=` - ${t.substring(11,16)}`)}return`${i}${d}${l}`}function si(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const n=t.getFullYear(),a=t.getMonth()+1,s=t.getDate(),r=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}/${a}/${s} ${r}:${o}`}function un(){const e=so(),t=document.getElementById("event-list-content");if(e.length===0){t.innerHTML='<p class="text-gray-500 p-4">表示するイベントがありません。</p>';return}const n=[...e].sort((i,d)=>i.start_time?d.start_time?i.start_time.localeCompare(d.start_time):-1:1),a={};n.forEach(i=>{const d=i.start_time?i.start_time.split("T")[0]:"未定";a[d]||(a[d]=[]),a[d].push(i)});const s=new Date,r=`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}-${String(s.getDate()).padStart(2,"0")}`;let o="";Object.keys(a).forEach(i=>{const d=a[i];let l="日時未定",u="";i!=="未定"&&(l=ni(i),i===r&&(u=`<span class="ml-2 bg-green-600 text-white text-xs px-2.5 py-0.5 rounded-full font-bold shadow-sm">${new Date(i).getDate()}日(今日)</span>`)),o+=`
        <div class="space-y-2 mb-4">
            <div class="flex items-center text-sm font-bold text-gray-700 border-b border-gray-200 pb-1 px-1">
                <span>${l}</span>
                ${u}
            </div>
        `,d.forEach(c=>{const f=ca(c);f.name,f.color;const p=lt.find(_=>_.name===c.category),b=(p==null?void 0:p.color)||"#bfdbfe",h=us.find(_=>_.event_id===c.id);let g=h&&h.status?h.status:"未回答";g==="未定"&&(g="保留");const m=ai(c.start_time,c.end_time,c.is_all_day);let y="不明";if(c.created_by){const _=xn.find(S=>S.email===c.created_by);y=_&&_.name||c.created_by.split("@")[0]}const x=si(c.created_at),E=c.created_by?`
                <div class="flex items-center text-gray-400 text-[10px] mt-1 space-x-1">
                    <span class="w-4 h-4 rounded-full bg-green-50 flex items-center justify-center text-[10px] text-green-700 font-bold">👤</span>
                    <span>${y} ${x}</span>
                </div>
            `:"";let k="";if(c.requires_attendance){const _=c.attendance_deadline?new Date>new Date(c.attendance_deadline):!1;let S="bg-gray-100 text-gray-600",I="";if(_)I="回答期限切れ",S="bg-gray-200 text-gray-500";else if(c.attendance_deadline){const $=new Date(c.attendance_deadline),A=$.getMonth()+1,P=$.getDate(),R=String($.getHours()).padStart(2,"0"),D=String($.getMinutes()).padStart(2,"0");I=`回答期限: ${A}/${P} ${R}:${D}`}const v=I?`<span class="text-[10px] px-1.5 py-0.5 rounded ${S} font-semibold">${I}</span>`:"";let w="";g==="出席"?w='<div class="flex items-center justify-center w-5 h-5 bg-green-600 text-white rounded-full text-[10px] font-bold shadow-sm" title="出席">O</div>':g==="欠席"?w='<div class="flex items-center justify-center w-5 h-5 bg-black text-white rounded text-[10px] font-bold shadow-sm" title="欠席">X</div>':g==="保留"?w='<div class="flex items-center justify-center w-5 h-5 bg-yellow-600 text-white rounded-full text-[10px] font-bold shadow-sm" title="保留">-</div>':w='<div class="flex items-center justify-center w-5 h-5 bg-red-600 text-white rounded-full text-[10px] font-bold shadow-sm animate-pulse" title="未回答">?</div>',k=`
                    <div class="flex items-center space-x-2 shrink-0">
                        ${v}
                        ${w}
                    </div>
                `}o+=`
            <div class="p-2 px-3 border border-gray-200/60 rounded-lg hover:shadow-md transition bg-white flex flex-col justify-between cursor-pointer relative shadow-sm" onclick="window.att_openEventDetail('${c.id}')">
                
                <!-- カード上部（タイトルと右上バッジ） -->
                <div class="flex justify-between items-start mb-1 gap-2">
                    <h3 class="font-bold text-sm md:text-base text-gray-800 flex items-center pr-2">
                        <span class="mr-1 text-base">📅</span>
                        <span>${c.title}</span>
                    </h3>
                    ${k}
                </div>

                <!-- カード中部（カテゴリと詳細） -->
                <div class="flex flex-wrap items-center gap-2 text-[11px] md:text-xs text-gray-600">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold" style="background-color: ${b}; color: #1f2937">${c.category||"イベント"}</span>
                    ${to(f)}
                    <span class="flex items-center space-x-1">
                        <span>🕒</span>
                        <span>${m}</span>
                    </span>
                    <span class="flex items-center space-x-0.5">
                        <span>📍</span>
                        <span>${oo(c.location)}</span>
                    </span>
                </div>

                <!-- カード下部（登録者と詳細矢印） -->
                <div class="flex justify-between items-end mt-1">
                    ${E}
                    <!-- 詳細矢印 (緑の右向き) -->
                    <div class="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition absolute right-2 bottom-2">
                        <span class="text-green-700 text-[10px] font-bold leading-none">&#10095;</span>
                    </div>
                </div>

            </div>
            `}),o+="</div>"}),t.innerHTML=o}function Ia(e="",t=null,n=!1,a=null){let s="";t&&(s=t.title.replace(/"/g,"&quot;"),n||(s+=" (コピー)"));const r=!t&&!n;a&&a.length>0?Se=[...a]:t?Se=[t.start_time.split("T")[0]]:e?Se=[e]:Se=[new Date().toISOString().split("T")[0]],window.att_modalSelectedDates=Se,window.att_isEditingModal=n;const o=t&&t.start_time&&!t.is_all_day?t.start_time.split("T")[1].substring(0,5):r?"12:30":"",i=t&&t.end_time&&!t.is_all_day?t.end_time.split("T")[1].substring(0,5):r?"17:00":"",d=t?t.is_all_day:!1,l=t?t.category:"",u=t?(t.location||"").replace(/"/g,"&quot;"):"",c=t?(t.description||"").replace(/</g,"&lt;").replace(/>/g,"&gt;"):"",f=t?t.requires_attendance:!0,p=t?t.require_detailed_attendance:!1,b=o?o.split(":")[0]:"",h=o?o.split(":")[1]:"",g=i?i.split(":")[0]:"",m=i?i.split(":")[1]:"",y=!u||!vn.some(N=>(N.url?`${N.name} ${N.url}`:N.name)===u);let x="",E="";if(u){const N=u.match(/(https?:\/\/[^\s\<\>\"]+)/);N?(E=N[0],x=u.replace(E,"").trim()):x=u}const k=!!(t&&t.attendance_deadline&&t.attendance_deadline!==rn(t.start_time.split("T")[0])),_=rn(Se[0])?rn(Se[0]).split("T")[0]:"",S=t&&t.attendance_deadline?t.attendance_deadline.split("T")[0]:_,I=t&&t.attendance_deadline?t.attendance_deadline.split("T")[1].substring(0,5):"12:00",v=I?I.split(":")[0]:"12",w=I?I.split(":")[1]:"00",$=N=>'<option value="">--</option>'+Array.from({length:24},(H,J)=>String(J).padStart(2,"0")).map(H=>`<option value="${H}" ${H===N?"selected":""}>${H}</option>`).join(""),A=N=>'<option value="">--</option>'+Array.from({length:60},(H,J)=>String(J).padStart(2,"0")).map(H=>`<option value="${H}" ${H===N?"selected":""}>${H}</option>`).join(""),P=t?t.target_group_ids&&t.target_group_ids.length>0?t.target_group_ids:t.target_group_id?[t.target_group_id]:[]:[],R=n?"イベントを編集":t?"イベントを複製":"新規イベント登録",D=`
        <div class="border p-2 rounded max-h-32 overflow-y-auto space-y-1 bg-white">
            <label class="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" id="ev-group-all" value="all" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" ${P.length===0?"checked":""}>
                <span class="text-xs font-medium">全体</span>
            </label>
            ${ht.map(N=>`
                <label class="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" name="ev-group-cb" value="${N.id}" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" ${P.includes(N.id)?"checked":""}>
                    <span class="text-xs">${N.name}</span>
                </label>
            `).join("")}
        </div>
    `;let M="";n?M=`
            <div>
                <label class="text-xs font-bold text-gray-600">日付*</label>
                <div id="ev-dates-container" class="mt-1">
                    <input type="date" value="${Se[0]}" class="w-full border p-1.5 rounded text-xs px-1" onchange="window.att_onSingleDateChange(this.value)">
                </div>
            </div>
        `:M=`
            <div>
                <label class="text-xs font-bold text-gray-600">日付*</label>
                <div id="ev-dates-container" class="space-y-1.5 max-h-32 overflow-y-auto border p-2 rounded bg-gray-50 mt-1">
                    <!-- Rendered by renderDateRows() -->
                </div>
                <button type="button" onclick="window.att_addDateRow()" class="mt-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded text-xs font-bold flex items-center space-x-1 transition shadow-sm border border-gray-200">
                    <span>＋ 日付を追加</span>
                </button>
            </div>
        `;const C=`
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
        <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col text-sm text-gray-800">
            <h3 class="text-lg font-bold mb-3 shrink-0">${R}</h3>
            <div class="space-y-3 overflow-y-auto pr-1 flex-1">
                <div>
                    <label class="text-xs font-bold text-gray-600">イベント名*</label>
                    <input type="text" id="ev-title" value="${s}" placeholder="イベント名" class="w-full border p-1.5 rounded text-xs">
                </div>
                
                <!-- Date input block -->
                ${M}
                
                <!-- Time and AllDay Row -->
                <div class="flex space-x-4 items-end">
                    <div id="ev-time-container" class="flex-1 ${d?"opacity-50":""}">
                        <label class="text-xs font-bold text-gray-600">開始時間</label>
                        <div class="flex items-center space-x-1 mt-1">
                            <select id="ev-time-h" class="w-full border py-1.5 px-1.5 rounded text-xs bg-white" ${d?"disabled":""}>${$(b)}</select>
                            <span class="font-bold text-gray-500">:</span>
                            <select id="ev-time-m" class="w-full border py-1.5 px-1.5 rounded text-xs bg-white" ${d?"disabled":""}>${A(h)}</select>
                        </div>
                    </div>
                    <div id="ev-end-time-container" class="flex-1 ${d?"opacity-50":""}">
                        <label class="text-xs font-bold text-gray-600">終了時間</label>
                        <div class="flex items-center space-x-1 mt-1">
                            <select id="ev-end-time-h" class="w-full border py-1.5 px-1.5 rounded text-xs bg-white" ${d?"disabled":""}>${$(g)}</select>
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
                            <option value="none" ${f?"":"selected"}>なし</option>
                            <option value="simple" ${f&&!p?"selected":""}>簡易</option>
                            <option value="detailed" ${f&&p?"selected":""}>詳細 (車・同伴者)</option>
                        </select>
                    </div>
                    
                    <div class="w-1/2" id="ev-deadline-container" style="display: ${f?"block":"none"}">
                        <div class="flex items-center justify-between mb-0.5">
                            <label class="text-xs font-bold text-gray-600">回答期限</label>
                            <div class="flex items-center space-x-1">
                                <input type="checkbox" id="ev-deadline-custom-cb" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer" ${k?"checked":""} onchange="window.att_toggleDeadlineCustom(this.checked)">
                                <label for="ev-deadline-custom-cb" class="text-[11px] font-bold text-gray-500 cursor-pointer select-none">個別指定</label>
                            </div>
                        </div>
                        
                        <!-- Custom Deadline Inputs -->
                        <div id="ev-deadline-custom-inputs" class="flex items-center space-x-0.5 ${k?"":"hidden"}">
                            <input type="date" id="ev-deadline-date" value="${S}" class="w-[50%] border p-1.5 rounded text-xs px-1" onchange="this.blur()">
                            <select id="ev-deadline-time-h" class="w-[25%] border py-1.5 px-1 rounded text-xs bg-white">${$(v)}</select>
                            <span class="font-bold text-gray-500">:</span>
                            <select id="ev-deadline-time-m" class="w-[25%] border py-1.5 px-1 rounded text-xs bg-white">${A(w)}</select>
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
                            ${lt.map(N=>`<option value="${N.name}" ${N.name===l?"selected":""}>${N.name}</option>`).join("")}
                        </select>
                    </div>
                    <div class="w-1/2 flex flex-col">
                        <label class="text-xs font-bold text-gray-600 mb-1">対象グループ</label>
                        ${D}
                    </div>
                </div>
                
                <!-- Place selection using Master Data -->
                <div class="flex flex-col space-y-1.5">
                    <label class="text-xs font-bold text-gray-600">場所</label>
                    <select id="ev-location-select" class="w-full border p-1.5 rounded text-xs font-medium bg-white" onchange="window.att_onLocationSelectChange(this.value)">
                        <option value="custom">-- 直接入力 / 新規マスタ追加 --</option>
                        ${vn.map(N=>{const H=N.url?`${N.name} ${N.url}`:N.name;return`<option value="${H}" ${u===H?"selected":""}>${N.name}${N.url?" (URLあり)":""}</option>`}).join("")}
                    </select>
                    
                    <!-- Direct Input & Inline Master Register container -->
                    <div id="ev-location-custom-container" class="border p-2.5 rounded bg-gray-50 space-y-2 mt-1 ${y?"":"hidden"}">
                        <div class="flex space-x-2">
                            <div class="flex-1">
                                <label class="text-[10px] font-bold text-gray-500">場所名</label>
                                <input type="text" id="ev-location-custom-name" value="${x}" placeholder="例: 〇〇グラウンド" class="w-full border p-1 rounded text-xs bg-white">
                            </div>
                            <div class="flex-1">
                                <label class="text-[10px] font-bold text-gray-500">URL (Google Map 等、任意)</label>
                                <input type="text" id="ev-location-custom-url" value="${E}" placeholder="https://..." class="w-full border p-1 rounded text-xs bg-white">
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
                    <textarea id="ev-description" placeholder="説明" class="w-full border p-1.5 rounded text-xs" rows="3">${c}</textarea>
                </div>
            </div>
            <div class="flex justify-end space-x-3 mt-4 pt-4 border-t shrink-0">
                <button onclick="window.att_closeModal()" class="bg-gray-300 hover:bg-gray-400 px-4 py-1.5 rounded font-bold text-xs">キャンセル</button>
                <button onclick="window.att_saveEvent(${n?`'${t.id}'`:"null"})" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded font-bold text-xs shadow">${n?"更新":"保存"}</button>
            </div>
        </div>
    </div>`;document.getElementById("attendance-modals").innerHTML=C,wn(),n||Sa();const L=document.getElementById("ev-group-all"),T=document.querySelectorAll('input[name="ev-group-cb"]');L.addEventListener("change",function(){this.checked&&T.forEach(N=>N.checked=!1)}),T.forEach(N=>{N.addEventListener("change",function(){this.checked&&(L.checked=!1)})})}async function ri(e=null){var A,P,R,D,M,C;const t=document.getElementById("ev-title").value.trim(),n=document.querySelectorAll('#ev-dates-container input[type="date"]'),a=Array.from(n).map(L=>L.value).filter(Boolean);if(!t)return alert("イベント名は必須です");if(a.length===0)return alert("日付を1つ以上指定してください");const s=document.getElementById("ev-time-h").value,r=document.getElementById("ev-time-m").value;let o="";(s||r)&&(o=`${s||"00"}:${r||"00"}`);const i=document.getElementById("ev-end-time-h").value,d=document.getElementById("ev-end-time-m").value;let l="";(i||d)&&(l=`${i||"00"}:${d||"00"}`);const u=document.getElementById("ev-all-day").checked,c=document.getElementById("ev-category").value,f=document.getElementById("ev-description").value,p=document.getElementById("ev-location-select");let b="";if(p)if(p.value==="custom"){const L=((A=document.getElementById("ev-location-custom-name"))==null?void 0:A.value.trim())||"",T=((P=document.getElementById("ev-location-custom-url"))==null?void 0:P.value.trim())||"";b=T?`${L} ${T}`:L}else b=p.value;const h=document.getElementById("ev-attendance-type").value,g=h!=="none",m=h==="detailed",y=((R=document.getElementById("ev-deadline-custom-cb"))==null?void 0:R.checked)||!1,x=(D=document.getElementById("ev-deadline-date"))==null?void 0:D.value,E=(M=document.getElementById("ev-deadline-time-h"))==null?void 0:M.value,k=(C=document.getElementById("ev-deadline-time-m"))==null?void 0:C.value,_=document.getElementById("ev-group-all").checked;let S=[];_||document.querySelectorAll('input[name="ev-group-cb"]:checked').forEach(L=>S.push(L.value));const I=S.length>0?S[0]:null,v=L=>new Promise(T=>setTimeout(T,L)),w=3;let $=0;for(;$<w;){$++,$>1?(W(`通信リトライ中 (${$-1}/${w-1}回目)...`),await v(1500)):W("イベント保存中...");try{if(e){const L=a[0],T=`${L}T${o||"00:00"}:00`;let N=null;l&&(N=`${L}T${l}:00`);let H=null;g&&(y?x&&E&&k&&(H=`${x}T${E}:${k}:00`):H=rn(L));const J={title:t,category:c,description:f,location:b,start_time:T,end_time:N,is_all_day:u,requires_attendance:g,require_detailed_attendance:m,attendance_deadline:H,target_group_id:I,target_group_ids:S.length>0?S:null},{error:G}=await B.from("events").update(J).eq("id",e);if(G)throw G;await le("UPDATE_EVENT",`イベント「${t}」を更新しました`)}else{const L=a.map(N=>{const H=`${N}T${o||"00:00"}:00`;let J=null;l&&(J=`${N}T${l}:00`);let G=null;return g&&(y?x&&E&&k&&(G=`${x}T${E}:${k}:00`):G=rn(N)),{title:t,category:c,description:f,location:b,start_time:H,end_time:J,is_all_day:u,requires_attendance:g,require_detailed_attendance:m,attendance_deadline:G,target_group_id:I,target_group_ids:S.length>0?S:null,created_by:Y==null?void 0:Y.email}}),{error:T}=await B.from("events").insert(L);if(T)throw T;await le("CREATE_EVENT",`イベント「${t}」を${L.length}件作成しました`)}await Gn(),yt(),document.getElementById("list-container").classList.contains("hidden")||un(),!e&&typeof window.att_clearDateSelection=="function"&&window.att_clearDateSelection(),window.att_closeModal();break}catch(L){console.error(`Save Event Attempt ${$} Error:`,L);const T=L.message==="Load failed"||L.message==="Failed to fetch"||!L.code;if($<w&&T)continue;{let N=L.message||String(L);L.details&&(N+=`
Details: `+L.details),L.hint&&(N+=`
Hint: `+L.hint),L.code&&(N+=`
Code: `+L.code),alert("保存エラー: "+N+`
（ネットワーク接続をご確認のうえ、再度お試しください）`);break}}}V()}async function oi(e){if(confirm("このイベントを削除しますか？")){W("イベント削除中...");try{await B.from("events").delete().eq("id",e),await le("DELETE_EVENT",`イベント(ID:${e})を削除しました`),await Gn(),yt(),un(),window.att_closeModal()}catch(t){console.error(t)}finally{V()}}}function ro(e,t,n=!1){const a=t.ids.length===0||ar.some(l=>t.ids.includes(l.group_id)),s=xn.find(l=>l.email===Y.email),r=s?s.can_use_attendance!==!1:!0,o=[];r&&o.push({email:Y.email,name:"自分 ( "+((Y==null?void 0:Y.name)||Y.email.split("@")[0])+" )",canAttend:a}),Ms.forEach(l=>{const u=xn.find(c=>c.email===l);if(u&&u.can_use_attendance!==!1){const c=t.ids.length===0||Gt.some(f=>t.ids.includes(f.group_id)&&f.user_email===l);o.push({email:l,name:u.name||l.split("@")[0],canAttend:c})}});let i=!1;return{formsHtml:o.map((l,u)=>{if(!l.canAttend)return`<div class="p-3 bg-gray-50 border rounded mb-2">
                <h4 class="font-bold text-gray-700 mb-1">${l.name}</h4>
                <p class="text-xs text-red-500">※対象グループに所属していないため入力できません</p>
            </div>`;i=!0;const c=ze.find(h=>h.event_id===e.id&&h.user_email===l.email)||{};let f=c.status||"未回答";f==="未定"&&(f="保留");let p="否",b=c.comment||"";return b.startsWith("[荷物車:可]")?(p="可",b=b.substring(8)):b.startsWith("[荷物車:否]")&&(p="否",b=b.substring(8)),`
        <div class="p-3 bg-blue-50 border border-blue-100 rounded mb-3" data-target-email="${l.email}">
            <h4 class="font-bold text-blue-800 mb-2 border-b border-blue-200 pb-1">${l.name}</h4>
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">ステータス*</label>
                <select id="att-status-${u}" class="w-full border p-1.5 rounded text-sm font-bold" ${n?"disabled":""}>
                    <option value="未回答" ${f==="未回答"?"selected":""}>未回答</option>
                    <option value="出席" ${f==="出席"?"selected":""}>出席</option>
                    <option value="欠席" ${f==="欠席"?"selected":""}>欠席</option>
                    <option value="保留" ${f==="保留"?"selected":""}>保留</option>
                </select>
            </div>
            ${e.require_detailed_attendance?`
                <div class="flex items-center space-x-2 mt-2">
                    <div class="w-1/3">
                        <label class="block text-xs font-bold text-gray-700 mb-1">車出し可否</label>
                        <select id="att-car-flag-${u}" class="w-full border p-1.5 rounded text-sm font-bold" onchange="const isCar = this.value === '可'; document.getElementById('att-car-cap-${u}').disabled = !isCar; document.getElementById('att-luggage-flag-${u}').disabled = !isCar; if(isCar && document.getElementById('att-car-cap-${u}').value == 0) document.getElementById('att-car-cap-${u}').value = 1;" ${n?"disabled":""}>
                            <option value="否" ${!c.car_capacity||c.car_capacity===0?"selected":""}>否</option>
                            <option value="可" ${c.car_capacity>0?"selected":""}>可</option>
                        </select>
                    </div>
                    <div class="w-1/3">
                        <label class="block text-xs font-bold text-gray-700 mb-1">乗車可能人数</label>
                        <input type="number" id="att-car-cap-${u}" value="${c.car_capacity||0}" min="0" class="w-full border p-1.5 rounded text-sm" ${n||!c.car_capacity||c.car_capacity===0?"disabled":""}>
                    </div>
                    <div class="w-1/3">
                        <label class="block text-xs font-bold text-gray-700 mb-1">荷物車対応</label>
                        <select id="att-luggage-flag-${u}" class="w-full border p-1.5 rounded text-sm font-bold" ${n||!c.car_capacity||c.car_capacity===0?"disabled":""}>
                            <option value="否" ${p==="否"?"selected":""}>否</option>
                            <option value="可" ${p==="可"?"selected":""}>可</option>
                        </select>
                    </div>
                </div>
                <div class="mt-2">
                    <label class="block text-xs font-bold text-gray-700 mb-1">同伴者 (例: 父、母、弟)</label>
                    <input type="text" id="att-acc-${u}" value="${c.accompanying_persons||""}" class="w-full border p-1.5 rounded text-sm" ${n?"disabled":""}>
                </div>
            `:""}
            <div class="mt-2">
                <label class="block text-xs font-bold text-gray-700 mb-1">コメント ${n?'<span class="text-red-500 font-normal">(期限後も修正可)</span>':""}</label>
                <textarea id="att-comment-${u}" class="w-full border p-1.5 rounded text-sm" rows="1">${b}</textarea>
            </div>
        </div>`}).join(""),hasAnyForm:i}}window.att_openEventDetail=window.openEventDetailModal=function(e,t="basic"){const n=Mt.find(C=>C.id===e);if(!n)return;const a=ca(n);a.name,a.color;const s=lt.find(C=>C.name===n.category),r=(s==null?void 0:s.color)||"#bfdbfe";let o="日時未定";n.is_all_day&&n.start_time?o=n.start_time.substring(0,10)+" (終日)":n.start_time&&(o=n.start_time.substring(0,16).replace("T"," "),n.end_time&&(o+=" 〜 "+n.end_time.substring(11,16)));const i=us.find(C=>C.event_id===n.id)||{};let d=i&&i.status?i.status:"未回答";d==="未定"&&(d="保留");const l=n.attendance_deadline?new Date>new Date(n.attendance_deadline):!1;let u=n.attendance_deadline?n.attendance_deadline.replace("T"," ").substring(0,16):"設定なし";a.ids.length===0||ar.some(C=>a.ids.includes(C.group_id));let c=[];if(a.ids.length===0)c=xn.filter(C=>C.can_use_attendance!==!1);else{const C=Gt.filter(N=>a.ids.includes(N.group_id)).map(N=>N.user_email),T=ze.filter(N=>N.event_id===n.id).map(N=>N.user_email);c=xn.filter(N=>N.can_use_attendance!==!1&&(C.includes(N.email)||T.includes(N.email)))}window.att_statusViewType||(window.att_statusViewType="group"),window.att_statusFilter||(window.att_statusFilter="all");const f=window.att_statusViewType==="group";let p=0,b=0,h=0;c.forEach(C=>{const L=ze.find(T=>T.event_id===n.id&&T.user_email===C.email);L&&L.status==="出席"?p++:L&&L.status==="欠席"?b++:h++});const g=[];f?ht.forEach(C=>{const L=Gt.filter(Q=>Q.group_id===C.id).map(Q=>Q.user_email),T=c.filter(Q=>L.includes(Q.email));let N=0,H=0,J=0,G=!1;T.forEach(Q=>{const q=ze.find(Z=>Z.event_id===n.id&&Z.user_email===Q.email);q&&q.status&&q.status!=="未回答"?(G=!0,q.status==="出席"?N++:q.status==="欠席"?H++:J++):J++}),G&&g.push({name:C.name,attending:N,absent:H,pending:J})}):pn.forEach(C=>{const L=c.filter(G=>G.attribute_id===C.id);let T=0,N=0,H=0,J=!1;L.forEach(G=>{const Q=ze.find(q=>q.event_id===n.id&&q.user_email===G.email);Q&&Q.status&&Q.status!=="未回答"?(J=!0,Q.status==="出席"?T++:Q.status==="欠席"?N++:H++):H++}),J&&g.push({name:C.name,attending:T,absent:N,pending:H})});const m=`
        <div class="flex items-center space-x-1 mb-4 p-1 bg-gray-100/80 rounded-lg w-fit shrink-0">
            <button onclick="window.att_setStatusViewType('${n.id}', 'group')" class="px-4 py-1.5 rounded-md text-xs font-bold transition shadow-sm ${f?"bg-green-600 text-white":"text-gray-600 hover:text-gray-900"}">📂 グループ別</button>
            <button onclick="window.att_setStatusViewType('${n.id}', 'attribute')" class="px-4 py-1.5 rounded-md text-xs font-bold transition shadow-sm ${f?"text-gray-600 hover:text-gray-900":"bg-green-600 text-white"}">👥 属性別</button>
        </div>
    `,y=f?"※出欠の入力があるグループのみ表示しています。":"※出欠の入力がある属性のみ表示しています。";let x=`
        <tr class="bg-gray-50/50 font-bold border-b border-gray-200">
            <td class="px-4 py-2.5 text-gray-800">全体</td>
            <td class="px-4 py-2.5 text-center text-green-600 font-extrabold">${p}</td>
            <td class="px-4 py-2.5 text-center text-red-500 font-extrabold">${b}</td>
            <td class="px-4 py-2.5 text-center text-gray-600">${h}</td>
        </tr>
    `;g.length===0?x+=`
            <tr>
                <td colspan="4" class="px-4 py-6 text-center text-gray-400 text-xs">出欠の入力がある${f?"グループ":"属性"}はありません。</td>
            </tr>
        `:x+=g.map(C=>`
            <tr class="border-b border-gray-100 hover:bg-gray-50/30 transition">
                <td class="px-4 py-2.5 text-gray-700 font-semibold text-xs">${C.name}</td>
                <td class="px-4 py-2.5 text-center text-green-600 font-bold text-xs">${C.attending}</td>
                <td class="px-4 py-2.5 text-center text-red-500 font-bold text-xs">${C.absent}</td>
                <td class="px-4 py-2.5 text-center text-gray-500 text-xs">${C.pending}</td>
            </tr>
        `).join("");const E=`
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
                    ${x}
                </tbody>
            </table>
        </div>
        <p class="text-[10px] text-gray-400 font-semibold mb-4">${y}</p>
    `,k=c.filter(C=>{const L=ze.find(N=>N.event_id===n.id&&N.user_email===C.email),T=(L==null?void 0:L.status)||"未回答";return window.att_statusFilter==="all"?!0:window.att_statusFilter==="answered"?T==="出席"||T==="欠席"||T==="保留"||T==="未定":window.att_statusFilter==="attending"?T==="出席":window.att_statusFilter==="absent"?T==="欠席":window.att_statusFilter==="pending"?T==="保留"||T==="未定":window.att_statusFilter==="unanswered"?T==="未回答"||!T:!0});window.att_statusSortKey||(window.att_statusSortKey="default"),window.att_statusSortOrder||(window.att_statusSortOrder="asc");const _=window.att_statusSortKey,S=window.att_statusSortOrder;_!=="default"&&k.sort((C,L)=>{var H,J;let T,N;if(_==="name")T=C.name||C.email.split("@")[0],N=L.name||L.email.split("@")[0];else if(_==="group")if(f){const G=Gt.filter(q=>q.user_email===C.email).map(q=>q.group_id);T=ht.filter(q=>G.includes(q.id)).map(q=>q.name).join(", ")||"-";const Q=Gt.filter(q=>q.user_email===L.email).map(q=>q.group_id);N=ht.filter(q=>Q.includes(q.id)).map(q=>q.name).join(", ")||"-"}else T=((H=pn.find(G=>G.id===C.attribute_id))==null?void 0:H.name)||"-",N=((J=pn.find(G=>G.id===L.attribute_id))==null?void 0:J.name)||"-";else if(_==="status"){const G=Q=>{const q=ze.find(U=>U.event_id===n.id&&U.user_email===Q.email),Z=(q==null?void 0:q.status)||"未回答";return Z==="出席"?1:Z==="保留"||Z==="未定"?2:Z==="未回答"?3:Z==="欠席"?4:5};T=G(C),N=G(L)}else if(_==="comment"){const G=Q=>{const q=ze.find(re=>re.event_id===n.id&&re.user_email===Q.email);if(!q||!q.status||q.status==="未回答")return"";let Z=q.comment||"",U="否";Z.startsWith("[荷物車:可]")?(U="可",Z=Z.substring(8)):Z.startsWith("[荷物車:否]")&&(U="否",Z=Z.substring(8));let ae=[];return n.require_detailed_attendance&&(q.accompanying_persons&&ae.push(`同伴: ${q.accompanying_persons}`),q.car_capacity&&q.car_capacity>0&&(ae.push(`車出: 可[${q.car_capacity}人]`),ae.push(`荷物車: ${U}`))),Z.trim()&&ae.push(`メモ: ${Z.trim()}`),ae.join(", ")};T=G(C),N=G(L)}else if(_==="updated_at"){const G=ze.find(q=>q.event_id===n.id&&q.user_email===C.email),Q=ze.find(q=>q.event_id===n.id&&q.user_email===L.email);T=G?new Date(G.updated_at).getTime():0,N=Q?new Date(Q.updated_at).getTime():0}return T<N?S==="asc"?-1:1:T>N?S==="asc"?1:-1:0});const v=[{type:"all",label:"すべて"},{type:"answered",label:"回答済"},{type:"attending",label:"出席"},{type:"absent",label:"欠席"},{type:"pending",label:"保留"},{type:"unanswered",label:"未回答"}].map(C=>{const L=window.att_statusFilter===C.type;return`<button onclick="window.att_setStatusFilter('${n.id}', '${C.type}')" class="px-2.5 py-1 rounded-full text-xs font-bold transition ${L?"bg-blue-600 text-white shadow-sm":"bg-gray-100 text-gray-600 hover:bg-gray-200"}">${C.label}</button>`}).join(" ");let w="";k.length===0?w=`
            <tr>
                <td colspan="5" class="px-4 py-6 text-center text-gray-400 text-xs">該当するメンバーはいません。</td>
            </tr>
        `:w=k.map(C=>{var ae;const L=C.name||C.email.split("@")[0];let T="-";if(f){const re=Gt.filter(me=>me.user_email===C.email).map(me=>me.group_id);T=ht.filter(me=>re.includes(me.id)).map(me=>me.name).join(", ")||"-"}else T=((ae=pn.find(re=>re.id===C.attribute_id))==null?void 0:ae.name)||"-";const N=ze.find(re=>re.event_id===n.id&&re.user_email===C.email);let H=(N==null?void 0:N.status)||"未回答";H==="未定"&&(H="保留");let J="";H==="出席"?J='<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-green-100 text-green-800 border border-green-200">🟢 参加</span>':H==="欠席"?J='<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-red-100 text-red-800 border border-red-200">❌ 不参加</span>':H==="保留"?J='<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-yellow-100 text-yellow-800 border border-yellow-200">❓ 未定/その他</span>':J='<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-gray-100 text-gray-500 border border-gray-200">❓ 未定/その他</span>';let G=(N==null?void 0:N.comment)||"",Q="否";G.startsWith("[荷物車:可]")?(Q="可",G=G.substring(8)):G.startsWith("[荷物車:否]")&&(Q="否",G=G.substring(8));let q=[];N&&N.status&&N.status!=="未回答"&&(n.require_detailed_attendance&&(N.accompanying_persons&&q.push(`同伴: ${N.accompanying_persons}`),N.car_capacity&&N.car_capacity>0&&(q.push(`車出: 可[${N.car_capacity}人]`),q.push(`荷物車: ${Q}`))),G.trim()&&q.push(`メモ: ${G.trim()}`));const Z=q.length>0?q.join(", "):"-",U=N?no(N.updated_at):"-";return`
                <tr class="hover:bg-gray-50/50 border-b border-gray-100 transition">
                    <td class="px-4 py-2 font-bold text-gray-800 text-[11px]">${L}</td>
                    <td class="px-4 py-2 text-gray-500 text-[11px] font-semibold">${T}</td>
                    <td class="px-4 py-2">${J}</td>
                    <td class="px-4 py-2 text-gray-600 text-[11px] max-w-[180px] truncate" title="${Z}">${Z}</td>
                    <td class="px-4 py-2 text-gray-400 text-[11px] font-semibold">${U}</td>
                </tr>
            `}).join("");const $=C=>_!==C?'<span class="text-gray-300 ml-1">⇅</span>':S==="asc"?'<span class="text-blue-600 ml-1">▲</span>':'<span class="text-blue-600 ml-1">▼</span>',A=`
        <div class="mt-4 border-t pt-4">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                <h4 class="font-bold text-gray-700 text-xs shrink-0">参加者リスト</h4>
                <div class="flex flex-wrap items-center gap-2">
                    <div class="flex items-center space-x-1">
                        ${v}
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
                            <th onclick="window.att_toggleSort('${n.id}', 'name')" class="px-4 py-2 font-bold text-gray-600 text-left text-xs cursor-pointer hover:bg-gray-100 transition">名前 ${$("name")}</th>
                            <th onclick="window.att_toggleSort('${n.id}', 'group')" class="px-4 py-2 font-bold text-gray-600 text-left text-xs cursor-pointer hover:bg-gray-100 transition">${f?"グループ":"属性"} ${$("group")}</th>
                            <th onclick="window.att_toggleSort('${n.id}', 'status')" class="px-4 py-2 font-bold text-gray-600 text-left text-xs cursor-pointer hover:bg-gray-100 transition">出欠 ${$("status")}</th>
                            <th onclick="window.att_toggleSort('${n.id}', 'comment')" class="px-4 py-2 font-bold text-gray-600 text-left text-xs cursor-pointer hover:bg-gray-100 transition">出欠メモ ${$("comment")}</th>
                            <th onclick="window.att_toggleSort('${n.id}', 'updated_at')" class="px-4 py-2 font-bold text-gray-600 text-left text-xs cursor-pointer hover:bg-gray-100 transition">更新日時 ${$("updated_at")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${w}
                    </tbody>
                </table>
            </div>
        </div>
    `,P=t==="basic"?"border-b-2 border-blue-500 text-blue-600 font-bold":"text-gray-500 hover:text-gray-700",R=t==="attendance"?"border-b-2 border-blue-500 text-blue-600 font-bold":"text-gray-500 hover:text-gray-700",D=t==="status"?"border-b-2 border-blue-500 text-blue-600 font-bold":"text-gray-500 hover:text-gray-700",M=`
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
                    <button onclick="window.att_openEventDetail('${n.id}', 'attendance')" class="flex-1 py-2 text-sm font-medium ${R}">出欠登録</button>
                    <button onclick="window.att_openEventDetail('${n.id}', 'status')" class="flex-1 py-2 text-sm font-medium ${D}">出欠状況</button>
                `:""}
            </div>

            <div class="p-4 overflow-y-auto">
                ${t==="basic"?`
                    <div class="text-sm text-gray-600 mb-4 space-y-1">
                        <p><strong>日時:</strong> ${o}</p>
                        <p><strong>場所:</strong> ${oo(n.location)}</p>
                        <p class="flex items-center gap-1 mt-1"><strong>カテゴリ:</strong> <span class="px-2 py-0.5 rounded text-xs text-gray-800 shadow-sm" style="background-color: ${r}">${n.category||"未設定"}</span></p>
                        <p class="flex items-center gap-1 mt-1"><strong>対象:</strong> ${to(a)}</p>
                        <p class="mt-2 whitespace-pre-wrap border p-2 bg-gray-50 rounded min-h-[60px] text-gray-800">${n.description||"説明なし"}</p>
                    </div>
                `:t==="attendance"?`
                    <div class="space-y-4">
                        <div class="text-sm border-b pb-2 mb-2">
                            現在のステータス: <span class="font-bold ${d==="出席"?"text-green-600":d==="欠席"?"text-red-500":"text-gray-800"}">${d}</span>
                            <br><span class="text-xs text-gray-500">回答期限: ${u}</span>
                            ${l?'<span class="ml-2 text-red-500 font-bold text-xs bg-red-100 px-2 py-0.5 rounded shadow-sm">期限切れ</span>':""}
                        </div>
                        ${(()=>{const{formsHtml:C,hasAnyForm:L}=ro(n,a,l);return C+(L?`
                                <div class="mt-4 text-right">
                                    <button onclick="window.att_saveAttendance('${n.id}')" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-bold shadow">出欠を一括保存</button>
                                </div>
                            `:"")})()}
                    </div>
                `:`
                    <div class="space-y-4">
                        ${m}
                        ${E}
                        ${A}
                    </div>
                `}
            </div>
        </div>
    </div>`;document.getElementById("attendance-modals").innerHTML=M};function ii(e){const t=Mt.find(i=>i.id===e);if(!t)return;const n=ca(t),a=t.attendance_deadline?new Date>new Date(t.attendance_deadline):!1,{formsHtml:s,hasAnyForm:r}=ro(t,n,a),o=`
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
    </div>`;document.getElementById("attendance-modals").innerHTML=o}async function di(e){const t=document.querySelectorAll("[data-target-email]");if(t.length===0)return window.att_closeModal();const n=Mt.find(s=>s.id===e);if(!n)return;const a=[];t.forEach(s=>{const r=s.getAttribute("data-target-email"),o=s.querySelector('select[id^="att-status-"]');if(o){const i=s.querySelector('input[id^="att-acc-"]'),d=s.querySelector('select[id^="att-car-flag-"]'),l=s.querySelector('input[id^="att-car-cap-"]'),u=s.querySelector('select[id^="att-luggage-flag-"]'),c=s.querySelector('textarea[id^="att-comment-"]'),f=d?d.value:"否",p=f==="可"&&l&&parseInt(l.value)||0;let b=c?c.value.trim():"";n.require_detailed_attendance&&f==="可"&&(b=`[荷物車:${u?u.value:"否"}]`+b),a.push({event_id:e,user_email:r,status:o.value,accompanying_persons:i?i.value:"",car_capacity:p,separate_action:null,comment:b,updated_at:new Date().toISOString()})}}),W("出欠保存中...");try{const{error:s}=await B.from("attendances").upsert(a,{onConflict:"event_id, user_email"});if(s)throw s;await le("UPDATE_ATTENDANCE",`イベント(ID:${e})の出欠を ${a.length}件更新しました`),await Gn(),yt(),un(),window.att_openEventDetail(e,"status")}catch(s){console.error("Save Attendance Error:",s),s.message==="Load failed"||s.message==="Failed to fetch"?alert("出欠登録エラー: 通信に失敗しました。ネットワーク接続やデータベースの状態を確認してください。"):alert("出欠登録エラー: "+s.message)}finally{V()}}function li(){const t=[["タイトル","日付","開始時刻","終了時刻","終日","カテゴリ","対象グループ","場所","出欠管理","詳細出欠","説明","回答期限"].join(",")];Mt.forEach(o=>{const i=o.start_time?o.start_time.split("T")[0]:"",d=o.start_time&&!o.is_all_day?o.start_time.split("T")[1].substring(0,5):"",l=o.end_time&&!o.is_all_day?o.end_time.split("T")[1].substring(0,5):"",c=ca(o).name,f=p=>p==null?'""':`"${String(p).replace(/"/g,'""')}"`;t.push([f(o.title),f(i),f(d),f(l),o.is_all_day?"TRUE":"FALSE",f(o.category),f(c),f(o.location),o.requires_attendance?"TRUE":"FALSE",o.require_detailed_attendance?"TRUE":"FALSE",f(o.description),f(o.attendance_deadline)].join(","))});const n=new Uint8Array([239,187,191]),a=new Blob([n,t.join(`
`)],{type:"text/csv;charset=utf-8;"}),s=URL.createObjectURL(a),r=document.createElement("a");r.href=s,r.download=`events_${new Date().toISOString().split("T")[0]}.csv`,r.click(),URL.revokeObjectURL(s)}function ci(e){const t=[];let n=[],a="",s=!1;for(let r=0;r<e.length;r++){const o=e[r];s?o==='"'?r+1<e.length&&e[r+1]==='"'?(a+='"',r++):s=!1:a+=o:o==='"'?s=!0:o===","?(n.push(a),a=""):o===`
`||o==="\r"?(n.push(a),t.push(n),n=[],a="",o==="\r"&&r+1<e.length&&e[r+1]===`
`&&r++):a+=o}return(a||n.length>0)&&(n.push(a),t.push(n)),t}window.att_importCsv=async function(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=async a=>{const s=a.target.result,r=ci(s);if(r.length<2)return alert("インポートするデータがありません。");const o=[];for(let u=1;u<r.length;u++){const c=r[u];if(c.length<2||!c[0]||!c[1])continue;const f=c[0],p=c[1],b=c[2],h=c[3],g=(c[4]||"").toUpperCase()==="TRUE",m=c[5],y=c[6]||"",x=c[7],E=(c[8]||"").toUpperCase()==="TRUE"||(c[8]||"").trim()==="",k=(c[9]||"").toUpperCase()==="TRUE",_=c[10],S=c[11]||null,I=`${p}T${b||"00:00"}:00`;let v=null;h&&(v=`${p}T${h}:00`);const w=y.split(",").map(R=>R.trim()),$=ht.filter(R=>w.includes(R.name)),A=$.length>0?$.map(R=>R.id):null,P=A?A[0]:null;o.push({title:f,category:m||null,description:_||null,location:x||null,start_time:I,end_time:v,is_all_day:g,requires_attendance:E,require_detailed_attendance:k,attendance_deadline:S,target_group_id:P,target_group_ids:A,created_by:Y==null?void 0:Y.email})}if(o.length===0)return alert(`インポート可能なイベントがありませんでした。
タイトルと日付は必須です。`);const i=o.map(u=>{const c=u.is_all_day?u.start_time.split("T")[0]+" (終日)":u.start_time.replace("T"," ").substring(0,16);return`<div class="text-sm border-b py-2 border-gray-200">
                <div class="font-bold text-gray-800">${u.title}</div>
                <div class="text-gray-600 text-xs">${c}</div>
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
        </div>`,l=document.createElement("div");l.innerHTML=d,document.body.appendChild(l.firstElementChild),document.getElementById("btn-cancel-import").onclick=()=>{document.getElementById("csv-import-confirm-modal").remove(),document.getElementById("file-import-csv").value=""},document.getElementById("btn-exec-import").onclick=async()=>{document.getElementById("csv-import-confirm-modal").remove(),W("インポート実行中...");try{const{error:u}=await B.from("events").insert(o);if(u)throw u;await le("IMPORT_EVENTS",`イベントデータを${o.length}件インポートしました`),alert(`${o.length}件のインポートが完了しました。`),await Gn(),yt(),un()}catch(u){alert(`インポート中にエラーが発生しました:
`+u.message)}finally{V(),document.getElementById("file-import-csv").value=""}}},n.readAsText(t)};function rn(e){if(!e)return null;const t=new Date(e+"T00:00:00");if(isNaN(t.getTime()))return null;const n=new Date(t.getTime()-3*24*60*60*1e3),a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),r=String(n.getDate()).padStart(2,"0");return`${a}-${s}-${r}T12:00:00`}function Br(e){const t=rn(e);if(!t)return"";const n=new Date(t),a=n.getFullYear(),s=n.getMonth()+1,r=n.getDate(),o=sr[n.getDay()];return`${a}/${s}/${r}(${o}) 12:00`}function oo(e){if(!e)return"未定";let t=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");const n=/(https?:\/\/[^\s\<\>\"]+)/g;return t.replace(n,a=>`<a href="${a}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="text-blue-600 hover:underline inline-flex items-center space-x-0.5 ml-1 font-semibold">
            <span>地図/リンク</span>
            <svg class="w-3.5 h-3.5 inline ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
        </a>`)}function io(){const e=document.getElementById("multiselect-bar"),t=document.getElementById("multiselect-count");!e||!t||(window.att_multiSelectMode&&window.att_selectedDates.size>0?(t.textContent=window.att_selectedDates.size,e.classList.remove("hidden")):e.classList.add("hidden"))}function ui(){window.att_selectedDates.clear(),yt(),io()}function mi(){if(window.att_selectedDates.size===0){alert("日程が選択されていません。");return}const e=Array.from(window.att_selectedDates).sort();Ia("",null,!1,e)}function Sa(){const e=document.getElementById("ev-dates-container");if(e){if(e.innerHTML="",Se.length===0){e.innerHTML='<div class="text-xs text-gray-500 py-1.5 text-center">日付が選択されていません</div>';return}Se.forEach((t,n)=>{const a=document.createElement("div");a.className="flex items-center space-x-2 bg-white p-1.5 rounded border shadow-sm";const s=document.createElement("input");if(s.type="date",s.value=t,s.className="border rounded text-xs px-2 py-1 flex-1 min-w-0 font-medium focus:ring-1 focus:ring-blue-500 focus:border-blue-500",s.onchange=r=>{Se[n]=r.target.value,wn()},a.appendChild(s),!window.att_isEditingModal){const r=document.createElement("button");r.type="button",r.className="text-red-500 hover:text-red-700 font-bold p-1 transition rounded hover:bg-red-50",r.innerHTML=`
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            `,r.onclick=()=>{Se.splice(n,1),Sa(),wn()},a.appendChild(r)}e.appendChild(a)})}}function pi(){let e=new Date().toISOString().split("T")[0];if(Se.length>0){const t=new Date(Se[Se.length-1]);isNaN(t.getTime())||(t.setDate(t.getDate()+1),e=t.toISOString().split("T")[0])}Se.push(e),Sa(),wn()}function fi(e){Se.splice(e,1),Sa(),wn()}function wn(){const e=document.getElementById("ev-deadline-auto-preview");if(e){if(Se.length===0){e.innerHTML='<span class="text-red-500 font-semibold text-xs">日付を入力してください</span>';return}if(Se.length===1)if(rn(Se[0])){const n=Br(Se[0]);e.innerHTML=`<span class="text-blue-600 font-bold">自動算出:</span> ${n}`}else e.innerHTML='<span class="text-red-500 font-semibold text-xs">日付が不正です</span>';else{const t=Br(Se[0]);e.innerHTML=`<span class="text-blue-600 font-bold">自動算出:</span> 各日程の3日前の12:00<br><span class="text-[10px] text-gray-400 font-semibold">(例: ${Se[0]}分 → ${t})</span>`}}}function gi(e){const t=document.getElementById("ev-location-custom-container");t&&(e==="custom"?t.classList.remove("hidden"):t.classList.add("hidden"))}async function bi(){const e=document.getElementById("ev-location-custom-name"),t=document.getElementById("ev-location-custom-url");if(!e)return;const n=e.value.trim(),a=t?t.value.trim():"";if(!n)return alert("場所名は必須です");W("場所マスタに登録中...");try{const{error:s}=await B.from("event_locations").insert({name:n,url:a||null});if(s)throw s;const{data:r}=await B.from("event_locations").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});r&&(vn=r);const o=document.getElementById("ev-location-select");if(o){const i=a?`${n} ${a}`:n;o.innerHTML=`
                <option value="custom">-- 直接入力 / 新規マスタ追加 --</option>
                ${vn.map(l=>{const u=l.url?`${l.name} ${l.url}`:l.name;return`<option value="${u}" ${u===i?"selected":""}>${l.name}${l.url?" (URLあり)":""}</option>`}).join("")}
            `;const d=document.getElementById("ev-location-custom-container");d&&d.classList.add("hidden"),e.value="",t&&(t.value="")}alert("場所マスタに登録しました")}catch(s){console.error("Failed to register location:",s),alert("マスタ登録エラー: "+(s.message||String(s)))}finally{V()}}window.att_closeModal=()=>{const e=document.getElementById("attendance-modals");e&&(e.innerHTML="")};window.att_saveEvent=ri;window.att_deleteEvent=oi;window.att_openEventDetail=openEventDetailModal;window.att_openAttendanceForm=ii;window.att_saveAttendance=di;window.att_exportCsv=li;window.att_statusViewType=window.att_statusViewType||"group";window.att_statusFilter=window.att_statusFilter||"all";window.att_setStatusViewType=(e,t)=>{window.att_statusViewType=t,window.att_openEventDetail(e,"status")};window.att_setStatusFilter=(e,t)=>{window.att_statusFilter=t,window.att_openEventDetail(e,"status")};window.att_copyEvent=function(e){const t=Mt.find(a=>a.id===e);if(!t)return;const n=window.att_selectedDates&&window.att_selectedDates.size>0?Array.from(window.att_selectedDates).sort():null;Ia("",t,!1,n)};window.att_editEvent=function(e){const t=Mt.find(n=>n.id===e);t&&Ia("",t,!0)};window.att_addDateRow=pi;window.att_removeDateRow=fi;window.att_renderDateRows=Sa;window.att_updateDefaultDeadlineLabel=wn;window.att_openBulkAddEvent=mi;window.att_clearDateSelection=ui;window.att_onLocationSelectChange=gi;window.att_registerNewLocation=bi;window.att_updateMultiselectBar=io;window.att_onSingleDateChange=e=>{Se=[e],wn();const t=rn(e);if(t){const n=t.split("T")[0],a=t.split("T")[1].substring(0,5),s=a.split(":")[0],r=a.split(":")[1],o=document.getElementById("ev-deadline-date"),i=document.getElementById("ev-deadline-time-h"),d=document.getElementById("ev-deadline-time-m");o&&(o.value=n),i&&(i.value=s),d&&(d.value=r)}};window.att_toggleDeadlineCustom=e=>{const t=document.getElementById("ev-deadline-custom-inputs"),n=document.getElementById("ev-deadline-auto-preview");if(!(!t||!n))if(e){t.classList.remove("hidden"),n.classList.add("hidden");const a=Se[0],s=rn(a);if(s){const r=s.split("T")[0],o=s.split("T")[1].substring(0,5),i=o.split(":")[0],d=o.split(":")[1],l=document.getElementById("ev-deadline-date"),u=document.getElementById("ev-deadline-time-h"),c=document.getElementById("ev-deadline-time-m");l&&!l.value&&(l.value=r),u&&!u.value&&(u.value=i),c&&!c.value&&(c.value=d)}}else t.classList.add("hidden"),n.classList.remove("hidden"),wn()};function Ma(e){const t=e.getFullYear(),n=e.getMonth()+1,a=e.getDate();if(n===1&&a===1||n===2&&a===11||n===2&&a===23||n===4&&a===29||n===5&&a===3||n===5&&a===4||n===5&&a===5||n===8&&a===11||n===11&&a===3||n===11&&a===23)return!0;if(e.getDay()===1){const r=Math.floor((a-1)/7)+1;if(n===1&&r===2||n===7&&r===3||n===9&&r===3||n===10&&r===2)return!0}if(n===3){const r=Math.floor(20.8431+.242194*(t-1980)-Math.floor((t-1980)/4));if(a===r)return!0}if(n===9){const r=Math.floor(23.2488+.242194*(t-1980)-Math.floor((t-1980)/4));if(a===r)return!0}return!1}function hi(e){if(Ma(e))return!0;const t=e.getFullYear(),n=e.getMonth(),a=e.getDate(),s=e.getDay();if(s===1){const i=new Date(t,n,a-1);if(Ma(i))return!0}const r=new Date(t,n,a-1),o=new Date(t,n,a+1);return!!(Ma(r)&&Ma(o)&&s!==0)}async function yi(){W("予定情報をエクスポート中...");try{const{data:e}=await B.from("events").select("*").order("start_time",{ascending:!0}),{data:t}=await B.from("groups").select("*"),n=new Map(t.map(d=>[d.id,d.name])),s=[["ID","タイトル","カテゴリ","場所","開始日時","終了日時","説明","終日(1/0)","出欠回答要(1/0)","詳細回答要(1/0)","回答期限","対象グループ名","削除(1/0)"]];e.forEach(d=>{let l="";d.target_group_ids&&d.target_group_ids.length>0?l=d.target_group_ids.map(p=>n.get(p)||"").filter(p=>p).join(", "):d.target_group_id&&(l=n.get(d.target_group_id)||"");const u=d.start_time?d.start_time.replace("T"," ").substring(0,16):"",c=d.end_time?d.end_time.replace("T"," ").substring(0,16):"",f=d.attendance_deadline?d.attendance_deadline.replace("T"," ").substring(0,16):"";s.push([d.id,d.title||"",d.category||"",d.location||"",u,c,d.description||"",d.is_all_day?"1":"0",d.requires_attendance?"1":"0",d.require_detailed_attendance?"1":"0",f,l,"0"])});const r=s.map(d=>d.map(window.escapeCSV).join(",")).join(`
`),o=new Blob([new Uint8Array([239,187,191]),r],{type:"text/csv;charset=utf-8;"}),i=document.createElement("a");i.href=URL.createObjectURL(o),i.download=`schedule_${new Date().toISOString().split("T")[0]}.csv`,i.click()}catch(e){console.error(e),alert("予定のエクスポートに失敗しました: "+e.message)}finally{V()}}async function xi(e){const t=e.target.files[0];if(!t)return;W("CSVファイルを解析中...");const n=new FileReader;n.onload=async a=>{try{const s=a.target.result,r=window.parseCSV(s);if(r.length<2){alert("有効なデータがありません。"),V();return}const o=r[0].map(R=>R.trim()),i=o.indexOf("ID"),d=o.indexOf("タイトル"),l=o.indexOf("カテゴリ"),u=o.indexOf("場所"),c=o.indexOf("開始日時"),f=o.indexOf("終了日時"),p=o.indexOf("説明"),b=o.findIndex(R=>R.includes("終日")),h=o.findIndex(R=>R.includes("出欠回答要")),g=o.findIndex(R=>R.includes("詳細回答要")),m=o.findIndex(R=>R.includes("回答期限")),y=o.findIndex(R=>R.includes("対象グループ名")),x=o.findIndex(R=>R.includes("削除"));if(d===-1||c===-1){alert("「タイトル」および「開始日時」列は必須です。"),V();return}const{data:E}=await B.from("events").select("*"),{data:k}=await B.from("groups").select("*"),_=new Map(k.map(R=>[R.name,R.id])),S=new Map(E.map(R=>[R.id,R])),I=new Map(E.map(R=>[`${R.title}_${R.start_time?R.start_time.substring(0,16).replace("T"," "):""}`,R])),v=[],w=[],$=[],A=R=>{if(!R)return null;let D=R.trim().replace(/\//g,"-").replace(" ","T");return D.length===10?D+="T00:00:00":D.length===16&&(D+=":00"),D};for(let R=1;R<r.length;R++){const D=r[R];if(D.length<2)continue;const M=(D[d]||"").trim(),C=(D[c]||"").trim();if(!M||!C)continue;const L=A(C),T=i!==-1?(D[i]||"").trim():"",N=l!==-1?(D[l]||"").trim():"",H=u!==-1?(D[u]||"").trim():"",J=f!==-1?A(D[f]):null,G=p!==-1?(D[p]||"").trim():"",Q=b!==-1?D[b]==="1"||D[b]==="true":!1,q=h!==-1?!(D[h]==="0"||D[h]==="false"):!0,Z=g!==-1?D[g]==="1"||D[g]==="true":!1,U=m!==-1?A(D[m]):null,ae=x!==-1?D[x]==="1"||D[x]==="削除":!1,re=y!==-1?(D[y]||"").trim():"";let me=[],ve="";if(re){const mt=re.split(",").map(Ue=>Ue.trim()).filter(Ue=>Ue);me=mt.map(Ue=>_.get(Ue)).filter(Ue=>Ue),ve=mt.join(", ")}const rt={id:T,title:M,category:N,location:H,start_time:L,end_time:J,description:G,is_all_day:Q,requires_attendance:q,require_detailed_attendance:Z,attendance_deadline:U,target_group_ids:me,target_group_name:ve};let pe=null;if(T&&(pe=S.get(T)),!pe){const mt=`${M}_${C.substring(0,16).replace(/\//g,"-")}`;pe=I.get(mt)}if(pe)if(rt.id=pe.id,ae)$.push(rt);else{const mt=pe.title!==M,Ue=pe.category!==N,Yt=pe.location!==H,Ut=pe.description!==G,St=(pe.start_time?pe.start_time.substring(0,16):"")!==(L?L.substring(0,16):""),kt=(pe.end_time?pe.end_time.substring(0,16):"")!==(J?J.substring(0,16):""),Et=pe.is_all_day!==Q,X=pe.requires_attendance!==q,fe=pe.require_detailed_attendance!==Z,Ne=(pe.attendance_deadline?pe.attendance_deadline.substring(0,16):"")!==(U?U.substring(0,16):""),je=pe.target_group_ids||(pe.target_group_id?[pe.target_group_id]:[]),Lt=JSON.stringify([...je].sort())!==JSON.stringify([...me].sort());(mt||Ue||Yt||Ut||St||kt||Et||X||fe||Ne||Lt)&&w.push(rt)}else ae||v.push(rt)}V();let P="";$.length>0&&(P=`⚠️ 警告: ${$.length}件の予定が削除されます。予定を削除すると、その予定に紐づいているメンバー全員の出欠データや配車データも自動的に削除されます。`),window.showCSVConfirmModal("events",v,w,$,"予定CSVインポート確認",P)}catch(s){console.error(s),alert("CSVの解析に失敗しました: "+s.message),V()}},n.readAsText(t)}async function vi(){const{add:e,update:t,delete:n}=ln;W("予定データを保存中...");try{if(n.length>0){const a=n.map(r=>r.id),{error:s}=await B.from("events").delete().in("id",a);if(s)throw s;await le("IMPORT_EVENTS_DELETE",`${n.length}件の予定をインポートで削除しました`)}if(e.length>0){const a=e.map(r=>({title:r.title,category:r.category,location:r.location,start_time:r.start_time,end_time:r.end_time,description:r.description,is_all_day:r.is_all_day,requires_attendance:r.requires_attendance,require_detailed_attendance:r.requires_attendance?r.require_detailed_attendance:!1,attendance_deadline:r.attendance_deadline,target_group_ids:r.target_group_ids.length>0?r.target_group_ids:null,created_by:Y==null?void 0:Y.email})),{error:s}=await B.from("events").insert(a);if(s)throw s;await le("IMPORT_EVENTS_ADD",`${e.length}件の予定をインポートで追加しました`)}if(t.length>0){for(let a of t){const{error:s}=await B.from("events").update({title:a.title,category:a.category,location:a.location,start_time:a.start_time,end_time:a.end_time,description:a.description,is_all_day:a.is_all_day,requires_attendance:a.requires_attendance,require_detailed_attendance:a.requires_attendance?a.require_detailed_attendance:!1,attendance_deadline:a.attendance_deadline,target_group_ids:a.target_group_ids.length>0?a.target_group_ids:null}).eq("id",a.id);if(s)throw s}await le("IMPORT_EVENTS_UPDATE",`${t.length}件の予定をインポートで更新しました`)}alert("予定のインポートが完了しました。"),window.closeCSVConfirmModal(),await Gn(),yt(),document.getElementById("list-container").classList.contains("hidden")||un()}catch(a){console.error(a),alert("予定データの保存に失敗しました: "+a.message)}finally{V()}}window.executeEventsImport=vi;function wi(){const n=[["ID","タイトル","カテゴリ","場所","開始日時","終了日時","説明","終日(1/0)","出欠回答要(1/0)","詳細回答要(1/0)","回答期限","対象グループ名","削除(1/0)"],["","土曜練習","練習","第一グラウンド","2026-06-20 09:00","2026-06-20 12:00","通常練習を行います。","0","1","1","2026-06-19 18:00","選手・保護者","0"],["","練習試合(イーグルス戦)","試合","イーグルス球場","2026-06-21 13:00","2026-06-21 16:00","遠征試合です。車出しをお願いします。","0","1","1","2026-06-20 12:00","選手・保護者","0"]].map(r=>r.map(window.escapeCSV).join(",")).join(`
`),a=new Blob([new Uint8Array([239,187,191]),n],{type:"text/csv;charset=utf-8;"}),s=document.createElement("a");s.href=URL.createObjectURL(a),s.download="schedule_sample.csv",s.click()}window.att_toggleSort=function(e,t){window.att_statusSortKey===t?window.att_statusSortOrder==="asc"?window.att_statusSortOrder="desc":(window.att_statusSortKey="default",window.att_statusSortOrder="asc"):(window.att_statusSortKey=t,window.att_statusSortOrder="asc"),window.att_openEventDetail(e,"status")};window.att_exportParticipantList=function(e){const t=Mt.find(b=>b.id===e);if(!t)return;const n=ca(t),a=window.att_statusViewType==="group";let s=[];if(n.ids.length===0)s=xn.filter(b=>b.can_use_attendance!==!1);else{const b=Gt.filter(m=>n.ids.includes(m.group_id)).map(m=>m.user_email),g=ze.filter(m=>m.event_id===t.id).map(m=>m.user_email);s=xn.filter(m=>m.can_use_attendance!==!1&&(b.includes(m.email)||g.includes(m.email)))}const r=s.filter(b=>{const h=ze.find(m=>m.event_id===t.id&&m.user_email===b.email),g=(h==null?void 0:h.status)||"未回答";return window.att_statusFilter==="all"?!0:window.att_statusFilter==="answered"?g==="出席"||g==="欠席"||g==="保留"||g==="未定":window.att_statusFilter==="attending"?g==="出席":window.att_statusFilter==="absent"?g==="欠席":window.att_statusFilter==="pending"?g==="保留"||g==="未定":window.att_statusFilter==="unanswered"?g==="未回答"||!g:!0}),o=window.att_statusSortKey||"default",i=window.att_statusSortOrder||"asc";o!=="default"&&r.sort((b,h)=>{var y,x;let g,m;if(o==="name")g=b.name||b.email.split("@")[0],m=h.name||h.email.split("@")[0];else if(o==="group")if(a){const E=Gt.filter(_=>_.user_email===b.email).map(_=>_.group_id);g=ht.filter(_=>E.includes(_.id)).map(_=>_.name).join(", ")||"-";const k=Gt.filter(_=>_.user_email===h.email).map(_=>_.group_id);m=ht.filter(_=>k.includes(_.id)).map(_=>_.name).join(", ")||"-"}else g=((y=pn.find(E=>E.id===b.attribute_id))==null?void 0:y.name)||"-",m=((x=pn.find(E=>E.id===h.attribute_id))==null?void 0:x.name)||"-";else if(o==="status"){const E=k=>{const _=ze.find(I=>I.event_id===t.id&&I.user_email===k.email),S=(_==null?void 0:_.status)||"未回答";return S==="出席"?1:S==="保留"||S==="未定"?2:S==="未回答"?3:S==="欠席"?4:5};g=E(b),m=E(h)}else if(o==="comment"){const E=k=>{const _=ze.find(w=>w.event_id===t.id&&w.user_email===k.email);if(!_||!_.status||_.status==="未回答")return"";let S=_.comment||"",I="否";S.startsWith("[荷物車:可]")?(I="可",S=S.substring(8)):S.startsWith("[荷物車:否]")&&(I="否",S=S.substring(8));let v=[];return t.require_detailed_attendance&&(_.accompanying_persons&&v.push(`同伴: ${_.accompanying_persons}`),_.car_capacity&&_.car_capacity>0&&(v.push(`車出: 可[${_.car_capacity}人]`),v.push(`荷物車: ${I}`))),S.trim()&&v.push(`メモ: ${S.trim()}`),v.join(", ")};g=E(b),m=E(h)}else if(o==="updated_at"){const E=ze.find(_=>_.event_id===t.id&&_.user_email===b.email),k=ze.find(_=>_.event_id===t.id&&_.user_email===h.email);g=E?new Date(E.updated_at).getTime():0,m=k?new Date(k.updated_at).getTime():0}return g<m?i==="asc"?-1:1:g>m?i==="asc"?1:-1:0});const l=[["名前",a?"グループ":"属性","出欠ステータス","同伴者","車出し可否","乗車人数","荷物車対応","コメント","更新日時"]];r.forEach(b=>{var v;const h=b.name||b.email.split("@")[0];let g="-";if(a){const w=Gt.filter($=>$.user_email===b.email).map($=>$.group_id);g=ht.filter($=>w.includes($.id)).map($=>$.name).join(", ")||"-"}else g=((v=pn.find(w=>w.id===b.attribute_id))==null?void 0:v.name)||"-";const m=ze.find(w=>w.event_id===t.id&&w.user_email===b.email);let y=(m==null?void 0:m.status)||"未回答";y==="未定"&&(y="保留");let x=(m==null?void 0:m.comment)||"",E="否";x.startsWith("[荷物車:可]")?(E="可",x=x.substring(8)):x.startsWith("[荷物車:否]")&&(E="否",x=x.substring(8));const k=(m==null?void 0:m.accompanying_persons)||"",_=(m==null?void 0:m.car_capacity)||0,S=_>0?"可":"否",I=m?no(m.updated_at):"-";l.push([h,g,y,k,S,_,E,x,I])});const u=l.map(b=>b.map(window.escapeCSV).join(",")).join(`
`),c=new Blob([new Uint8Array([239,187,191]),u],{type:"text/csv;charset=utf-8;"}),f=document.createElement("a"),p=t.title.replace(/[\/\\?%*:|"<>]/g,"_");f.href=URL.createObjectURL(c),f.setAttribute("download",`参加者リスト_${p}_${window.att_statusFilter}.csv`),document.body.removeChild(f)};function Is(e){if(!e||isNaN(e.getTime()))return"";const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0"),s=String(e.getHours()).padStart(2,"0"),r=String(e.getMinutes()).padStart(2,"0");return`${t}-${n}-${a}T${s}:${r}`}function Ei(e){const t=e.split(/\r?\n/),n=[];let a=null,s=!1;const r=[];for(let o of t)o.startsWith(" ")||o.startsWith("	")?r.length>0&&(r[r.length-1]+=o.substring(1)):r.push(o);for(let o of r){const i=o.trim();if(i){if(i==="BEGIN:VEVENT")a={title:"",description:"",location:"",start:null,end:null,isAllDay:!1},s=!0;else if(i==="END:VEVENT")a&&n.push(a),s=!1,a=null;else if(s&&a){const d=i.indexOf(":");if(d===-1)continue;const l=i.substring(0,d),u=i.substring(d+1),c=l.split(";")[0],f=l.split(";").slice(1);if(c==="SUMMARY")a.title=Ss(u);else if(c==="DESCRIPTION")a.description=Ss(u);else if(c==="LOCATION")a.location=Ss(u);else if(c==="DTSTART"){const p=f.some(b=>b.toUpperCase()==="VALUE=DATE");a.start=Ar(u,p),p&&(a.isAllDay=!0)}else if(c==="DTEND"){const p=f.some(b=>b.toUpperCase()==="VALUE=DATE");a.end=Ar(u,p)}}}}return n}function Ss(e){return e.replace(/\\n/g,`
`).replace(/\\r/g,"\r").replace(/\\t/g,"	").replace(/\\,/g,",").replace(/\\;/g,";").replace(/\\\\/g,"\\")}function Ar(e,t){if(!e)return null;const n=parseInt(e.substring(0,4)),a=parseInt(e.substring(4,6))-1,s=parseInt(e.substring(6,8));if(t||e.indexOf("T")===-1)return new Date(n,a,s);const r=e.indexOf("T"),o=parseInt(e.substring(r+1,r+3)),i=parseInt(e.substring(r+3,r+5)),d=parseInt(e.substring(r+5,r+7))||0;return e.endsWith("Z")?new Date(Date.UTC(n,a,s,o,i,d)):new Date(n,a,s,o,i,d)}async function _i(e){const t=e.target.files[0];if(!t)return;W("ICSファイルを解析中...");const n=new FileReader;n.onload=async a=>{try{const s=a.target.result,r=Ei(s);if(V(),r.length===0){alert("ICSファイルから有効な予定が見つかりませんでした。");return}$i(r)}catch(s){console.error(s),alert("ICSファイルの解析に失敗しました: "+s.message),V()}},n.readAsText(t),e.target.value=""}function $i(e){const t=document.getElementById("ics-import-list");if(!t)return;const n=document.getElementById("ics-import-count");n&&(n.textContent=e.length),t.innerHTML=e.map((r,o)=>{var h,g;const i=r.title||"",d=i.toLowerCase();let l=((h=lt[0])==null?void 0:h.name)||"練習";for(let m of lt)if(d.includes(m.name)){l=m.name;break}l===((g=lt[0])==null?void 0:g.name)&&(d.includes("試合")||d.includes("vs")||d.includes("戦")?lt.find(y=>y.name==="試合")&&(l="試合"):(d.includes("イベント")||d.includes("会")||d.includes("式")||d.includes("フェス"))&&lt.find(y=>y.name==="イベント")&&(l="イベント"));let u="";if(r.location){const m=vn.find(y=>y.name===r.location);m?u=m.name:u="custom"}const c=Is(r.start),f=Is(r.end||(r.start?new Date(r.start.getTime()+2*60*60*1e3):null));let p=r.start?new Date(r.start.getTime()-3*24*60*60*1e3):null;p&&p.setHours(12,0,0,0);const b=Is(p);return`
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
                                ${lt.map(m=>`<option value="${m.name}" ${m.name===l?"selected":""}>${m.name}</option>`).join("")}
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">場所</label>
                            <div class="flex gap-2">
                                <select class="ics-row-location-select w-1/2 border p-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500">
                                    <option value="">(登録場所から選択...)</option>
                                    ${vn.map(m=>`<option value="${m.name}" ${m.name===u?"selected":""}>${m.name}</option>`).join("")}
                                    <option value="custom" ${u==="custom"?"selected":""}>直接入力...</option>
                                </select>
                                <input type="text" class="ics-row-location w-1/2 border p-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500" placeholder="直接入力" value="${r.location||""}">
                            </div>
                        </div>
                    </div>

                    <!-- 2行目: 日時 (開始, 終了, 終日) -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">開始日時</label>
                            <input type="datetime-local" class="ics-row-start w-full border p-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500" value="${c}">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">終了日時</label>
                            <input type="datetime-local" class="ics-row-end w-full border p-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500" value="${f}">
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
                            <input type="datetime-local" class="ics-row-deadline w-full border p-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500" value="${b}">
                        </div>
                    </div>

                    <!-- 4行目: 対象グループ (横並び) -->
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">対象グループ</label>
                        <div class="flex flex-wrap gap-3 p-2.5 bg-white border rounded-lg max-h-28 overflow-y-auto">
                            ${ht.map(m=>`
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
        `}).join("");const a=document.getElementById("ics-select-all");a&&(a.checked=!0,a.onclick=r=>{document.querySelectorAll(".ics-row-select").forEach(o=>o.checked=r.target.checked)});const s=document.getElementById("ics-import-modal");s&&s.classList.remove("hidden")}function Rs(){var e;(e=document.getElementById("ics-import-modal"))==null||e.classList.add("hidden")}async function Ii(){const e=document.querySelectorAll(".ics-row"),t=[];if(e.forEach(n=>{var g,m,y,x,E,k,_,S,I,v;const a=n.querySelector(".ics-row-select");if(!a||!a.checked)return;const s=((g=n.querySelector(".ics-row-title"))==null?void 0:g.value)||"";if(!s)return;const r=((m=n.querySelector(".ics-row-category"))==null?void 0:m.value)||"",o=((y=n.querySelector(".ics-row-location"))==null?void 0:y.value)||"",i=((x=n.querySelector(".ics-row-start"))==null?void 0:x.value)||"",d=((E=n.querySelector(".ics-row-end"))==null?void 0:E.value)||"",l=((k=n.querySelector(".ics-row-allday"))==null?void 0:k.checked)||!1,u=[];n.querySelectorAll(".ics-row-group-cb:checked").forEach(w=>{u.push(w.value)});const c=((_=n.querySelector(".ics-row-req-att"))==null?void 0:_.checked)||!1,f=((S=n.querySelector(".ics-row-req-det"))==null?void 0:S.checked)||!1,p=((I=n.querySelector(".ics-row-deadline"))==null?void 0:I.value)||"",b=((v=n.querySelector(".ics-row-description"))==null?void 0:v.value)||"",h=w=>w?new Date(w).toISOString():null;t.push({title:s,category:r,location:o,start_time:h(i),end_time:h(d),is_all_day:l,target_group_ids:u.length>0?u:null,requires_attendance:c,require_detailed_attendance:c?f:!1,attendance_deadline:c?h(p):null,description:b,created_by:Y==null?void 0:Y.email})}),t.length===0){alert("登録対象の予定が選択されていません。");return}W("予定データを登録中...");try{const{error:n}=await B.from("events").insert(t);if(n)throw n;await le("IMPORT_ICS_EVENTS",`${t.length}件の予定をICSファイルから一括登録しました`),alert(`${t.length}件の予定を登録しました。`),Rs(),await Gn(),yt(),document.getElementById("list-container").classList.contains("hidden")||un()}catch(n){console.error(n),alert("予定の登録に失敗しました: "+n.message)}finally{V()}}const Si="modulepreload",ki=function(e){return"/"+e},Tr={},Li=function(t,n,a){let s=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),i=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));s=Promise.allSettled(n.map(d=>{if(d=ki(d),d in Tr)return;Tr[d]=!0;const l=d.endsWith(".css"),u=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${u}`))return;const c=document.createElement("link");if(c.rel=l?"stylesheet":Si,l||(c.as="script"),c.crossOrigin="",c.href=d,i&&c.setAttribute("nonce",i),document.head.appendChild(c),l)return new Promise((f,p)=>{c.addEventListener("load",f),c.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(o){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=o,window.dispatchEvent(i),!i.defaultPrevented)throw o}return s.then(o=>{for(const i of o||[])i.status==="rejected"&&r(i.reason);return t().catch(r)})};let Dr=!1,Rt=[],Kt=[],on=[],xt=[],zt=[],Ot=[],De={homeTeamNames:["ありんこアントス@A軍"],defaultFilterDate:{from:"",to:"",teamRegex:"",category:"",outcome:"all",firstScore:"all"}},Cr=!1,Ja=!0,va=!1,Tn="all",ga={},ct={},ks={},Fa={batter:[],pitcher:[],fielder:[]},Bn={batter:{key:"ops",order:"desc"},pitcher:{key:"era",order:"asc"},fielder:{key:"fpct",order:"desc"}},Jn={batter:{key:"ops",order:"desc"},pitcher:{key:"era",order:"asc"},fielder:{key:"fpct",order:"desc"}},bt=null,Dt={};async function Os(){Dr||(Ai(),Dr=!0);const e=document.querySelector('button[data-tab="import-data"]');e&&(Ve==="admin"?e.classList.remove("hidden"):e.classList.add("hidden")),await ka()}function Bi(e){const t=[];let n=[],a="",s=!1;for(let r=0;r<e.length;r++){const o=e[r];s?o==='"'?r+1<e.length&&e[r+1]==='"'?(a+='"',r++):s=!1:a+=o:o==='"'?s=!0:o===","?(n.push(a),a=""):o===`
`||o==="\r"?(n.push(a),t.push(n),n=[],a="",o==="\r"&&r+1<e.length&&e[r+1]===`
`&&r++):a+=o}return(a||n.length>0)&&(n.push(a),t.push(n)),t}function Ai(){var t,n,a,s,r,o,i,d,l,u,c,f,p,b,h,g,m,y,x,E,k,_,S,I,v,w,$,A,P,R,D;let e=document.getElementById("dashboard-view");e||(e=document.createElement("div"),e.id="dashboard-view",e.className="hidden p-4 max-w-4xl mx-auto",e.innerHTML=`
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
                                <option value="fielder">🛡️ 守備</option>
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
                        <button data-ranking-tab="fielder" class="px-4 py-2 font-bold text-gray-500 border-b-2 border-transparent hover:text-gray-700 whitespace-nowrap transition-colors">守備ランキング</button>
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
                <div id="ranking-content-fielder" class="bg-white p-4 rounded-lg shadow-md space-y-2 hidden">
                    <div class="text-[11px] text-gray-500 flex flex-wrap justify-between gap-2 pb-1">
                        <span>※守備率＝(刺殺＋捕殺)÷(刺殺＋捕殺＋失策) ／ 捕逸＝捕手記録(cat)または1捕手試合のパスボール記録から算出</span>
                        <span class="text-amber-700">※UZR・DRSは打球速度・詳細ゾーン別リーグ平均等がないため算出対象外</span>
                    </div>
                    <div class="overflow-x-auto"><table class="w-full text-sm text-left border">
                        <thead class="bg-gray-100">
                            <tr>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="name" data-role="fielder">選手<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="games" data-role="fielder">試合<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="chances" data-role="fielder">守備機会<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none font-bold text-indigo-700" data-sort="fpct" data-role="fielder">守備率<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="po" data-role="fielder">刺殺<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="a" data-role="fielder">捕殺<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none text-red-600" data-sort="e" data-role="fielder">失策<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none text-amber-700" data-sort="pb" data-role="fielder">捕逸<span></span></th>
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="dp" data-role="fielder">併殺<span></span></th>
                            </tr>
                        </thead>
                        <tbody id="ranking-fielder-tbody"></tbody>
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

                <div class="bg-white p-6 rounded-lg shadow-md border border-amber-200">
                    <h3 class="text-lg font-bold mb-2 border-b pb-2">③ DB内の重複試合データの確認・統合整理</h3>
                    <p class="text-xs text-gray-600 mb-3">
                        別ファイル・別端末からの再取り込みなどで「同じ日付・対戦カード・スコア」のまま試合ID違いで重複登録された試合を検出し、成績・詳細分析（文字起こし）データを1試合に統合して余分な重複行を削除します。
                    </p>
                    <div class="flex flex-wrap gap-2 mb-3">
                        <button type="button" id="btn-scan-dup-games" class="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded shadow font-bold text-xs">
                            🔍 重複試合を再チェック
                        </button>
                        <button type="button" id="btn-cleanup-dup-games" class="hidden bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow font-bold text-xs">
                            🧹 重複試合を1件に統合・整理する
                        </button>
                    </div>
                    <div id="dup-games-status" class="text-xs text-gray-600">DB読み込み後に自動判定されます</div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-md border border-red-200">
                    <h3 class="text-lg font-bold mb-2 border-b pb-2 text-red-700">④ 成績データの全削除（リセット＆読み込み直し用）</h3>
                    <p class="text-xs text-gray-600 mb-3">
                        重複や過去の不整合をゼロからやり直したい場合に使用します。試合・打撃成績・投手成績・選手マスタ・詳細分析（文字起こし）データをすべて削除します。<br>
                        <span class="text-emerald-700 font-bold">※ ダッシュボード設定（初期フィルタ・自チーム登録）や、出欠・配車・アンケート・ポジションシミュレーター等の他機能データは削除されません。</span>
                    </p>
                    <div id="reset-db-counts" class="mb-3 p-3 bg-red-50 border border-red-200 rounded text-xs text-gray-700">
                        DB読み込み後に件数が表示されます
                    </div>
                    <label class="flex items-center gap-2 text-xs font-bold text-red-800 mb-3 cursor-pointer select-none">
                        <input type="checkbox" id="confirm-reset-dashboard-db" class="rounded border-red-400 text-red-600">
                        <span>上記の成績・選手・詳細ログデータをすべて削除することを確認しました（元に戻せません）</span>
                    </label>
                    <div class="flex flex-wrap items-center gap-3">
                        <button type="button" id="btn-reset-dashboard-db" disabled class="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded shadow font-bold text-xs transition-colors">
                            🗑️ 成績データを全削除する
                        </button>
                        <span id="reset-db-result-msg" class="text-xs text-gray-600"></span>
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
        `,(t=document.getElementById("app-view"))==null||t.parentNode.appendChild(e),document.getElementById("btn-back-to-menu-dash").addEventListener("click",()=>{Li(()=>Promise.resolve().then(()=>Vc),void 0).then(M=>M.switchAuthScreen("app-menu-view"))}),document.getElementById("btn-exec-csv-import").addEventListener("click",Vi),(n=document.getElementById("backup-extract-file"))==null||n.addEventListener("change",Wi),(a=document.getElementById("btn-backup-import-db"))==null||a.addEventListener("click",Zi),(s=document.getElementById("btn-extract-raw-b"))==null||s.addEventListener("click",()=>Pr("batter")),(r=document.getElementById("btn-extract-raw-p"))==null||r.addEventListener("click",()=>Pr("pitcher")),(o=document.getElementById("btn-extract-single-game"))==null||o.addEventListener("click",Xi),(i=document.getElementById("btn-extract-game-transcript"))==null||i.addEventListener("click",ed),(d=document.getElementById("btn-preview-backup-detail"))==null||d.addEventListener("click",td),(l=document.getElementById("btn-scan-dup-games"))==null||l.addEventListener("click",yo),(u=document.getElementById("btn-cleanup-dup-games"))==null||u.addEventListener("click",Yi),(c=document.getElementById("confirm-reset-dashboard-db"))==null||c.addEventListener("change",M=>{const C=document.getElementById("btn-reset-dashboard-db");C&&(C.disabled=!M.target.checked)}),(f=document.getElementById("btn-reset-dashboard-db"))==null||f.addEventListener("click",Qi),(p=document.getElementById("btn-load-detail-data"))==null||p.addEventListener("click",rd),(b=document.getElementById("detail-scope-select"))==null||b.addEventListener("change",M=>Rn(!0,M.target.value)),(h=document.getElementById("btn-detail-back-to-all"))==null||h.addEventListener("click",()=>Rn(!0,"all")),(g=document.getElementById("btn-detail-exit-preview"))==null||g.addEventListener("click",()=>{Ot=[],Rn(!1,"all")}),(m=document.getElementById("detail-transcript-show-pitches"))==null||m.addEventListener("change",M=>{va=M.target.checked,ur()}),(y=document.getElementById("btn-detail-copy-transcript"))==null||y.addEventListener("click",ad),(x=document.getElementById("btn-detail-download-transcript"))==null||x.addEventListener("click",sd),(E=document.getElementById("btn-jump-to-transcript"))==null||E.addEventListener("click",()=>{var M;(M=document.getElementById("detail-transcript-panel"))==null||M.scrollIntoView({behavior:"smooth",block:"start"})}),(k=document.getElementById("btn-jump-to-detail-top"))==null||k.addEventListener("click",()=>{var M;(M=document.getElementById("tab-content-detail-analysis"))==null||M.scrollIntoView({behavior:"smooth",block:"start"})}),document.querySelectorAll("#dashboard-tabs button").forEach(M=>{M.addEventListener("click",C=>{lo(C.currentTarget.dataset.tab)})}),document.querySelectorAll("button[data-ranking-tab]").forEach(M=>{M.addEventListener("click",C=>{var T;document.querySelectorAll("button[data-ranking-tab]").forEach(N=>{N.classList.remove("text-blue-600","border-blue-600"),N.classList.add("text-gray-500","border-transparent")}),["batter","pitcher","fielder"].forEach(N=>{var H;return(H=document.getElementById(`ranking-content-${N}`))==null?void 0:H.classList.add("hidden")});const L=C.currentTarget;L.classList.remove("text-gray-500","border-transparent"),L.classList.add("text-blue-600","border-blue-600"),(T=document.getElementById(`ranking-content-${L.dataset.rankingTab}`))==null||T.classList.remove("hidden")})}),(_=document.getElementById("ranking-regulation-cb"))==null||_.addEventListener("change",M=>{Ja=M.target.checked,po()}),document.querySelectorAll("#tab-content-ranking th[data-sort]").forEach(M=>{M.addEventListener("click",C=>{const L=C.currentTarget.dataset.role,T=C.currentTarget.dataset.sort;ji(L,T)})}),document.getElementById("btn-apply-dashboard-filter").addEventListener("click",Zt),["db-filter-date-from","db-filter-date-to","db-filter-outcome","db-filter-first-score"].forEach(M=>{var C;(C=document.getElementById(M))==null||C.addEventListener("change",Zt)}),["db-filter-team-regex","db-filter-category"].forEach(M=>{var C,L;(C=document.getElementById(M))==null||C.addEventListener("change",Zt),(L=document.getElementById(M))==null||L.addEventListener("input",Zt)}),document.getElementById("btn-clear-dashboard-filter").addEventListener("click",()=>{document.getElementById("db-filter-date-from").value=De.defaultFilterDate.from||"",document.getElementById("db-filter-date-to").value=De.defaultFilterDate.to||"",document.getElementById("db-filter-team-regex").value=De.defaultFilterDate.teamRegex||"",document.getElementById("db-filter-category").value=De.defaultFilterDate.category||"";const M=document.getElementById("db-filter-outcome");M&&(M.value=De.defaultFilterDate.outcome||"all");const C=document.getElementById("db-filter-first-score");C&&(C.value=De.defaultFilterDate.firstScore||"all"),Zt()}),["ps-mode","ps-player","ps-role","ps-limit-games","ps-ma-unit","ps-ma-window"].forEach(M=>{var C;return(C=document.getElementById(M))==null?void 0:C.addEventListener("change",()=>{var J,G,Q,q;M==="ps-role"&&Hs("ps");const L=(J=document.getElementById("ps-ma-unit"))==null?void 0:J.value,T=((G=document.getElementById("ps-role"))==null?void 0:G.value)||"batter",N=document.getElementById("ps-ma-window-label");N&&(N.textContent=L==="ab"?T==="fielder"?"機会":"打数/登板":"試合");const H=((Q=document.getElementById("ps-mode"))==null?void 0:Q.value)==="single";(q=document.getElementById("ps-player-select-wrap"))==null||q.classList.toggle("hidden",!H),dr()})}),(S=document.getElementById("btn-export-ps-csv"))==null||S.addEventListener("click",Ui),(I=document.getElementById("btn-print-ps"))==null||I.addEventListener("click",()=>window.print()),(v=document.getElementById("comp-players-list"))==null||v.addEventListener("change",Zn),(w=document.getElementById("comp-role"))==null||w.addEventListener("change",()=>{Hs("comp"),Zn()}),($=document.getElementById("comp-calc-mode"))==null||$.addEventListener("change",Zn),(A=document.getElementById("comp-ma-window"))==null||A.addEventListener("change",Zn),(P=document.getElementById("comp-ma-window"))==null||P.addEventListener("input",Zn),(R=document.getElementById("btn-add-home-team"))==null||R.addEventListener("click",Gi),(D=document.getElementById("btn-save-default-date"))==null||D.addEventListener("click",async()=>{var re,me;const M=document.getElementById("setting-default-date-from").value,C=document.getElementById("setting-default-date-to").value,L=document.getElementById("setting-default-team-regex").value.trim(),T=document.getElementById("setting-default-category").value.trim(),N=((re=document.getElementById("setting-default-outcome"))==null?void 0:re.value)||"all",H=((me=document.getElementById("setting-default-first-score"))==null?void 0:me.value)||"all",J={from:M,to:C,teamRegex:L,category:T,outcome:N,firstScore:H,_updatedAt:Date.now()};localStorage.setItem("ants_defaultFilterDate",JSON.stringify(J)),W("デフォルトのフィルタ設定を保存中 (DB同期)...");try{await rr("defaultFilterDate",J,"DASHBOARD_DEFAULT_FILTER",J),Un(!0,"デフォルト設定をSupabase DBへ保存・同期しました"),alert("デフォルトのフィルタ設定をDBに保存し、同期しました。")}catch(ve){console.error("Supabase sync failed",ve),Un(!1,`DB同期に失敗 (このブラウザのみ保存): ${ve.message}`),alert("DBへの同期に失敗しましたが、このブラウザには保存されました: "+ve.message)}finally{V()}De.defaultFilterDate=J;const G=document.getElementById("db-filter-date-from"),Q=document.getElementById("db-filter-date-to"),q=document.getElementById("db-filter-team-regex"),Z=document.getElementById("db-filter-category"),U=document.getElementById("db-filter-outcome"),ae=document.getElementById("db-filter-first-score");G&&(G.value=M),Q&&(Q.value=C),q&&(q.value=L),Z&&(Z.value=T),U&&(U.value=N),ae&&(ae.value=H),Zt()}))}function lo(e){var s;const t=new Set(["team-summary","personal-summary","ranking","comparison","detail-analysis"]);document.querySelectorAll("#dashboard-tabs button").forEach(r=>{r.classList.remove("text-blue-600","border-blue-600"),r.classList.add("text-gray-500","border-transparent")}),["team-summary","personal-summary","ranking","comparison","settings","import-data","detail-analysis"].forEach(r=>{var o;(o=document.getElementById(`tab-content-${r}`))==null||o.classList.add("hidden")});const n=document.querySelector(`#dashboard-tabs button[data-tab="${e}"]`);n&&(n.classList.remove("text-gray-500","border-transparent"),n.classList.add("text-blue-600","border-blue-600")),(s=document.getElementById(`tab-content-${e}`))==null||s.classList.remove("hidden");const a=document.getElementById("dashboard-common-filter");a&&a.classList.toggle("hidden",!t.has(e))}async function rr(e,t,n,a){const[s,r]=await Promise.all([B.from("master_data").upsert({key:n,data:a},{onConflict:"key"}),B.from("dashboard_settings").upsert({key:e,value:t},{onConflict:"key"})]);if(s.error&&r.error)throw s.error;s.error&&console.warn("master_data upsert warning:",s.error),r.error&&console.warn("dashboard_settings upsert warning:",r.error)}function Un(e,t=""){const n=document.getElementById("settings-db-sync-status");n&&(e?(n.textContent=`✅ ${t||"DB (Supabase) と同期済みです（LocalStorageによる上書きは無効化）"}`,n.className="text-xs font-bold mb-3 text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded"):(n.textContent=`⚠️ ${t||"DBに設定が未登録のため初期値・ローカルキャッシュを表示中（「設定を保存」でDB同期できます）"}`,n.className="text-xs font-bold mb-3 text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded"))}async function ba(e,t=1e3){const n=e();if(typeof(n==null?void 0:n.range)!="function")return await n;const a=[];let s=0;for(;;){const{data:r,error:o}=await e().range(s,s+t-1);if(o)return{data:null,error:o};const i=Array.isArray(r)?r:[];if(a.push(...i),i.length<t)break;s+=t}return{data:a,error:null}}async function ka(){W("成績データを読み込み中...");try{const[{data:e,error:t},{data:n,error:a},{data:s,error:r},{data:o,error:i},{data:d},{data:l},{data:u,error:c}]=await Promise.all([ba(()=>B.from("games").select("*").order("date",{ascending:!0}).order("id",{ascending:!0})),ba(()=>B.from("batter_stats").select("*").order("game_id",{ascending:!0}).order("player_id",{ascending:!0})),ba(()=>B.from("pitcher_stats").select("*").order("game_id",{ascending:!0}).order("player_id",{ascending:!0})),ba(()=>B.from("players").select("*").order("id",{ascending:!0})),B.from("dashboard_settings").select("*"),B.from("master_data").select("key, data").in("key",["DASHBOARD_DEFAULT_FILTER","DASHBOARD_HOME_TEAMS"]),ba(()=>B.from("master_data").select("key, data").like("key","SCORER_GAME_DETAIL_%").order("key",{ascending:!0}))]);if(t)throw t;if(a)throw a;if(r)throw r;if(i)throw i;c&&console.warn("detailRowsData fetch warning:",c),Rt=e||[],Kt=n||[],on=s||[],xt=o||[],zt=(u||[]).map(v=>v==null?void 0:v.data).filter(v=>v&&(v.gid!==void 0||v.cd)).sort((v,w)=>String(w.date||"").localeCompare(String(v.date||""))||(w.gid||0)-(v.gid||0));let f=["ありんこアントス@A軍"],p={from:"",to:"",teamRegex:"",category:"",outcome:"all",firstScore:"all"},b=!1,h=!1,g=-1,m=-1;const y=v=>{if(typeof v=="string")try{return JSON.parse(v)}catch{return null}return v};if(Array.isArray(d)){const v=d.find(P=>P.key==="homeTeamNames"),w=y(v==null?void 0:v.value);Array.isArray(w)&&w.length>0&&(f=w,b=!0,g=0);const $=d.find(P=>P.key==="defaultFilterDate"),A=y($==null?void 0:$.value);A&&typeof A=="object"&&(p={from:A.from||"",to:A.to||"",teamRegex:A.teamRegex||"",category:A.category||"",outcome:A.outcome||"all",firstScore:A.firstScore||"all"},h=!0,m=Number(A._updatedAt||0))}if(Array.isArray(l)){const v=l.find(P=>P.key==="DASHBOARD_HOME_TEAMS"),w=y(v==null?void 0:v.data);if(w){const P=Array.isArray(w)?w:Array.isArray(w.teams)?w.teams:null,R=Number(w._updatedAt||1);P&&P.length>0&&(!b||R>=g)&&(f=P,b=!0,g=R)}const $=l.find(P=>P.key==="DASHBOARD_DEFAULT_FILTER"),A=y($==null?void 0:$.data);if(A&&typeof A=="object"){const P=Number(A._updatedAt||1);(!h||P>=m)&&(p={from:A.from||"",to:A.to||"",teamRegex:A.teamRegex||"",category:A.category||"",outcome:A.outcome||"all",firstScore:A.firstScore||"all"},h=!0,m=P)}}if(b)localStorage.setItem("ants_homeTeamNames",JSON.stringify(f));else{const v=localStorage.getItem("ants_homeTeamNames");if(v)try{const w=JSON.parse(v);Array.isArray(w)&&w.length>0&&(f=w)}catch{}}if(h)localStorage.setItem("ants_defaultFilterDate",JSON.stringify(p));else{const v=localStorage.getItem("ants_defaultFilterDate");if(v)try{const w=JSON.parse(v);p={from:w.from||"",to:w.to||"",teamRegex:w.teamRegex||"",category:w.category||"",outcome:w.outcome||"all",firstScore:w.firstScore||"all"}}catch{}}Un(h||b),De.homeTeamNames=f,De.defaultFilterDate=p,lr();const x=document.getElementById("setting-default-date-from"),E=document.getElementById("setting-default-date-to"),k=document.getElementById("setting-default-team-regex"),_=document.getElementById("setting-default-category"),S=document.getElementById("setting-default-outcome"),I=document.getElementById("setting-default-first-score");x&&(x.value=De.defaultFilterDate.from||""),E&&(E.value=De.defaultFilterDate.to||""),k&&(k.value=De.defaultFilterDate.teamRegex||""),_&&(_.value=De.defaultFilterDate.category||""),S&&(S.value=De.defaultFilterDate.outcome||"all"),I&&(I.value=De.defaultFilterDate.firstScore||"all"),Cr?Zt():(document.getElementById("btn-clear-dashboard-filter").click(),Cr=!0),yo(),Ki()}catch(e){console.error(e),alert("成績データの取得に失敗しました: "+e.message)}finally{V()}}function vt(e){if(!e)return!1;const t=e.trim();if(t==="ありんこ"||t==="アントス")return!1;const n=r=>{const o=String(r||"").replace(/\[([^\]]+)\]/g,"@$1").trim(),i=o.indexOf("@");return i===-1?{base:o,squad:""}:{base:o.slice(0,i).trim(),squad:o.slice(i+1).trim()}},a=n(t),s=De.homeTeamNames.map(r=>r?{raw:r.trim(),...n(r)}:null).filter(Boolean);return s.some(r=>{if(t===r.raw)return!0;try{if(new RegExp(`^${r.raw}$`,"i").test(t))return!0}catch{}return!r.base||!a.base||!(a.base.toLowerCase()===r.base.toLowerCase()||a.base.includes(r.base)||r.base.includes(a.base))?!1:r.squad?a.squad.toLowerCase()===r.squad.toLowerCase():s.some(d=>d.squad&&d.base.toLowerCase()===r.base.toLowerCase())?!a.squad:!0})}function or(e){const t=vt(e.team_first);let n=0,a=0;if(e.score&&typeof e.score=="string"){const o=e.score.match(/\d+/g);if(o&&o.length>=2){const i=parseInt(o[0],10),d=parseInt(o[1],10);return t?(n=i,a=d):(n=d,a=i),{tr:n,or:a,isAntsFirst:t}}}const s=parseInt(e.runs_first??e.score_first??0,10)||0,r=parseInt(e.runs_second??e.score_second??0,10)||0;return t?(n=s,a=r):(n=r,a=s),{tr:n,or:a,isAntsFirst:t}}function Ti(e){const t=vt(e.team_first);if(e.first_score_team)return vt(e.first_score_team)?"scored":"conceded";if(e.first_scored!==void 0&&e.first_scored!==null){if(e.first_scored==="home"||e.first_scored===!0||e.first_scored===1)return"scored";if(e.first_scored==="opp"||e.first_scored===!1||e.first_scored===0)return"conceded"}const n=e.inning_scores||e.score_detail||e.innings;if(n&&typeof n=="string"&&n.includes("|")){const[r,o]=n.split("|"),i=r.split(/[,-]/).map(u=>parseInt(u.trim(),10)||0),d=o.split(/[,-]/).map(u=>parseInt(u.trim(),10)||0),l=Math.max(i.length,d.length);for(let u=0;u<l;u++){const c=i[u]||0,f=d[u]||0;if(c>0&&f===0)return t?"scored":"conceded";if(f>0&&c===0)return t?"conceded":"scored";if(c>0&&f>0)return t?"scored":"conceded"}}const{tr:a,or:s}=or(e);return a===0&&s===0?"unknown":a>0&&s===0?"scored":s>0&&a===0?"conceded":t?a>0?"scored":"conceded":s>0?"conceded":"scored"}function It(e){if(!e)return"";const t=String(e).split("T")[0].replace(/\//g,"-").split("-");if(t.length===3){const n=parseInt(t[0],10),a=parseInt(t[1],10),s=parseInt(t[2],10);if(!isNaN(n)&&!isNaN(a)&&!isNaN(s))return`${n}-${String(a).padStart(2,"0")}-${String(s).padStart(2,"0")}`}return""}function fn(e){return String(e||"").replace(/髙/g,"高").replace(/[\s　]+/g,"").trim()}let Ft={games:[],bStats:[],pStats:[]};function Zt(){var p,b;const e=document.getElementById("db-filter-date-from").value,t=document.getElementById("db-filter-date-to").value,n=document.getElementById("db-filter-team-regex").value,a=document.getElementById("db-filter-category").value,s=((p=document.getElementById("db-filter-outcome"))==null?void 0:p.value)||"all",r=((b=document.getElementById("db-filter-first-score"))==null?void 0:b.value)||"all";let o=null;if(n)try{o=new RegExp(n,"i")}catch{}const i=a?a.split(/[,、]/).map(h=>h.trim()).filter(h=>h):[],d=Rt.filter(h=>{const g=(h.team_first||"").trim(),m=(h.team_second||"").trim(),y=(h.title||"")+(h.category||"");if(g==="ありんこ"||g==="アントス"||m==="ありんこ"||m==="アントス"||y.includes("紅白")||g.includes("紅白")||m.includes("紅白"))return!1;const x=vt(h.team_first),E=vt(h.team_second);if(x&&E||!x&&!E)return!1;const k=It(h.date);if((e||t)&&!k||e&&k<e||t&&k>t||i.length>0&&!i.some(_=>(h.title||"").includes(_)||(h.category||"").includes(_)))return!1;if(o){const _=x?m:g;if(!o.test(_))return!1}if(s!=="all"){const{tr:_,or:S}=or(h);if(s==="win"&&_<=S||s==="loss"&&_>=S||s==="draw"&&_!==S)return!1}if(r!=="all"){const _=Ti(h);if(r==="scored"&&_!=="scored"||r==="conceded"&&_!=="conceded")return!1}return!0}),l=new Set(d.map(h=>h.id)),u=Kt.filter(h=>l.has(h.game_id)),c=on.filter(h=>l.has(h.game_id)),f=Ci(d);Ft={games:d,bStats:u,pStats:c,fStats:f},Hs("all"),Ni(d,u,c),po(),dr(),Zn(),Rn(!0)}function Di(e,t,n){const a=String((e==null?void 0:e.cd)||"").split("=");let s=0,r=0;for(const o of a)/^I([tb])(\d+)$/.test(o)?s=o[1]==="t"?0:1:/^(Ep|Kp)/.test(o)&&(s===0?n:t)&&r++;return r}function Ci(e){const t=zt.length>0?zt:Ot;if(!Array.isArray(t)||t.length===0||!Array.isArray(e)||e.length===0)return[];const n=new Map,a=new Map;t.forEach(i=>{if(!i)return;i.gid!==void 0&&i.gid!==null&&n.set(String(i.gid),i);const d=`${It(i.date)}__${(i.tn||"").trim()}__${(i.bn||"").trim()}`;a.has(d)||a.set(d,i)});const s=new Map,r=new Map;(xt||[]).forEach(i=>{s.set(String(i.id),i);const d=fn(i.name);d&&!r.has(d)&&r.set(d,i)});const o=[];return e.forEach(i=>{const d=`${It(i.date)}__${(i.team_first||"").trim()}__${(i.team_second||"").trim()}`,l=n.get(String(i.id))||a.get(d);if(!l)return;const u=Array.isArray(l.fld)?l.fld:[],c=Array.isArray(l.cat)?l.cat:[];if(u.length===0&&c.length===0)return;const f=vt(l.tn||i.team_first),p=vt(l.bn||i.team_second);let b=null;const h=nt(l.te,[]);(f&&!p||!f&&p)&&Array.isArray(h)&&h.length>=2&&(b=f?h[0].id:h[1].id);const g=nt(l.pl,[]),m=new Map;Array.isArray(g)&&g.forEach(_=>{const S=parseInt(_.id??_.pid,10);!isNaN(S)&&S>0&&m.set(S,Qa(_))});const y=_=>{const S=parseInt(_,10),I=s.get(String(S));if(I)return{id:I.id,name:I.name};const v=m.get(S)||"",w=v?r.get(fn(v)):null;return w?{id:w.id,name:w.name}:{id:S,name:v||"不明"}},x=new Map,E=_=>{const S=y(_),I=String(S.id);return x.has(I)||x.set(I,{player_id:S.id,player_name:S.name,game_id:i.id,po:0,assists:0,errors:0,chances:0,dp:0,pb:0,positions:new Set}),x.get(I)},k=new Set;if(u.forEach(_=>{if(b!=null&&_.tid!=null&&String(_.tid)!==String(b))return;const S=parseInt(_.pid,10);if(isNaN(S)||S<=0||!Array.isArray(_.st))return;const I=E(S),v=parseInt(_.st[0],10),w=fo[v]||"";w&&I.positions.add(w),v===1&&k.add(String(I.player_id)),I.po+=parseInt(_.st[2],10)||0,I.assists+=parseInt(_.st[3],10)||0,I.errors+=parseInt(_.st[4],10)||0,I.dp+=parseInt(_.st[5],10)||0}),c.length>0)c.forEach(_=>{if(b!=null&&_.tid!=null&&String(_.tid)!==String(b))return;const S=parseInt(_.pid,10);if(isNaN(S)||S<=0||!Array.isArray(_.st))return;const I=E(S);I.positions.add("キャッチャー"),I.pb+=parseInt(_.st[0],10)||0});else if(k.size===1&&l.cd){const _=Array.from(k)[0],S=x.get(_);S&&(S.pb+=Di(l,f,p))}x.forEach(_=>{_.chances=_.po+_.assists+_.errors,_.positions=Array.from(_.positions),o.push(_)})}),o}function co(e,t){return e?t==="pitcher"?(e.outs||0)>0||(e.batters_faced||0)>0:t==="fielder"?(e.chances||0)>0||(e.pb||0)>0||(e.dp||0)>0||Array.isArray(e.positions)&&e.positions.length>0:(e.plate_appearances||0)>0||(e.at_bats||0)>0:!1}function Fs(e){const t=e==="pitcher"?Ft.pStats:e==="fielder"?Ft.fStats:Ft.bStats,n=new Set,a=new Map;(t||[]).forEach(o=>{co(o,e)&&(n.add(String(o.player_id)),o.player_name&&a.set(String(o.player_id),o.player_name))});const s=new Map((xt||[]).map(o=>[String(o.id),o])),r=Array.from(n).map(o=>s.get(o)||{id:o,name:a.get(o)||"不明"}).sort((o,i)=>o.name.localeCompare(i.name));return{activeIds:n,players:r}}function Hs(e="all"){var t,n;if(e==="all"||e==="ps"){const a=document.getElementById("ps-player");if(a){const s=((t=document.getElementById("ps-role"))==null?void 0:t.value)||"batter",{activeIds:r,players:o}=Fs(s),i=a.value;a.innerHTML=o.map(d=>`<option value="${d.id}">${K(d.name)}</option>`).join(""),i&&r.has(String(i))&&(a.value=i)}}if(e==="all"||e==="comp"){const a=document.getElementById("comp-players-list");if(a){const s=((n=document.getElementById("comp-role"))==null?void 0:n.value)||"batter",{players:r}=Fs(s),o=new Set(Array.from(document.querySelectorAll(".comp-player-cb:checked")).map(i=>i.value));a.innerHTML=r.length===0?'<div class="col-span-full text-xs text-gray-400">対象条件に出場した選手データがありません</div>':r.map(i=>`<label class="flex items-center space-x-1 cursor-pointer"><input type="checkbox" value="${i.id}" class="comp-player-cb rounded text-blue-600" ${o.has(String(i.id))?"checked":""}><span>${K(i.name)}</span></label>`).join("")}}}function Ni(e,t,n){document.getElementById("summary-games").textContent=e.length;const a=t.reduce((u,c)=>u+(c.at_bats||0),0),s=t.reduce((u,c)=>u+(c.hits||0),0),r=a>0?(s/a).toFixed(3).replace(/^0/,""):".000";document.getElementById("summary-avg").textContent=r;const o=t.reduce((u,c)=>u+(c.runs||0),0);document.getElementById("summary-runs").textContent=o;const i=n.reduce((u,c)=>u+(c.earned_runs||0),0),d=n.reduce((u,c)=>u+(c.outs||0),0),l=d>0?(i*7/(d/3)).toFixed(2):"0.00";document.getElementById("summary-era").textContent=l,Mi(e,t,n)}let Nr=!1;function La(){return Nr||window.Chart?Promise.resolve():new Promise((e,t)=>{const n=document.createElement("script");n.src="https://cdn.jsdelivr.net/npm/chart.js",n.onload=()=>{Nr=!0,e()},n.onerror=t,document.head.appendChild(n)})}async function Mi(e,t,n){await La(),Object.values(ga).forEach(I=>I.destroy()),ga={};const a={};e.forEach(I=>{const v=I.date?I.date.split("T")[0]:"";if(!v)return;const w=v.substring(0,7);a[w]||(a[w]={atBats:0,hits:0,runs:0,strikeOuts:0,hitsAllowed:0,walksAllowed:0,strikes:0,pitchCount:0,earnedRuns:0,outs:0})}),t.forEach(I=>{const v=e.find($=>$.id===I.game_id);if(!v||!v.date)return;const w=v.date.split("T")[0].substring(0,7);a[w]&&(a[w].atBats+=I.at_bats||0,a[w].hits+=I.hits||0,a[w].runs+=I.runs||0)}),n.forEach(I=>{const v=e.find($=>$.id===I.game_id);if(!v||!v.date)return;const w=v.date.split("T")[0].substring(0,7);a[w]&&(a[w].strikeOuts+=I.strike_outs||0,a[w].hitsAllowed+=I.hits_allowed||0,a[w].walksAllowed+=I.walks_allowed||0,a[w].strikes+=I.strikes||0,a[w].pitchCount+=I.pitch_count||0,a[w].earnedRuns+=I.earned_runs||0,a[w].outs+=I.outs||0)});const s=Object.keys(a).sort();let r=0,o=0,i=0,d=0;const l=[],u=[],c=[],f=[],p=[],b=[],h=[],g=[];s.forEach(I=>{r+=a[I].atBats,o+=a[I].hits,l.push(r>0?o/r:0),u.push(a[I].runs),c.push(a[I].strikeOuts),f.push(a[I].hitsAllowed),p.push(a[I].walksAllowed),b.push(a[I].pitchCount>0?(a[I].strikes/a[I].pitchCount*100).toFixed(1):0);const v=a[I].earnedRuns,$=a[I].outs/3;g.push($>0?v*7/$:0),i+=a[I].earnedRuns,d+=a[I].outs;const A=d/3;h.push(A>0?i*7/A:0)}),ga.batting=new window.Chart(document.getElementById("chart-batting-monthly").getContext("2d"),{type:"bar",data:{labels:s,datasets:[{label:"月間得点",type:"bar",data:u,backgroundColor:"rgba(75, 192, 192, 0.6)",yAxisID:"y"},{label:"累積打率",type:"line",data:l,borderColor:"rgba(255, 99, 132, 1)",yAxisID:"y1"}]},options:{responsive:!0,scales:{y:{position:"left",beginAtZero:!0},y1:{position:"right",beginAtZero:!0,min:0,max:1}}}}),ga.pitching=new window.Chart(document.getElementById("chart-pitching-monthly").getContext("2d"),{type:"bar",data:{labels:s,datasets:[{label:"奪三振",data:c,backgroundColor:"rgba(54, 162, 235, 0.6)"},{label:"被安打",data:f,backgroundColor:"rgba(255, 159, 64, 0.6)"},{label:"与四死球",data:p,backgroundColor:"rgba(255, 205, 86, 0.6)"},{label:"S率(%)",type:"line",data:b,borderColor:"rgba(153, 102, 255, 1)",yAxisID:"y1"},{label:"累積防御率",type:"line",data:h,borderColor:"rgba(255, 99, 132, 1)",yAxisID:"y2"},{label:"月別防御率",type:"line",data:g,borderColor:"rgba(75, 192, 192, 1)",borderDash:[5,5],yAxisID:"y2"}]},options:{responsive:!0,scales:{y:{position:"left",beginAtZero:!0},y1:{position:"right",beginAtZero:!0,min:0,max:100,grid:{drawOnChartArea:!1}},y2:{position:"right",beginAtZero:!0,grid:{drawOnChartArea:!1}}}}});const m=[],y=[],x=[],E=[],k=[];let _=0,S=0;e.forEach((I,v)=>{const w=I.date?I.date.split("T")[0]:"",{tr:$,or:A,isAntsFirst:P}=or(I),R=P?I.team_first:I.team_second,D=P?I.team_second:I.team_first,M=I.title||I.category||"試合";k.push({date:w,title:M,myTeam:R||"自チーム",oppTeam:D||"相手チーム",tr:$,or:A,isAntsFirst:P}),y.push($),x.push(-A),$>A&&_++,S++,E.push(S>0?(_/S*100).toFixed(1):0),m.push([w?w.substring(5):`G${v+1}`,D||""])}),ga.games=new window.Chart(document.getElementById("chart-games-wl").getContext("2d"),{type:"bar",data:{labels:m,datasets:[{label:"得点",data:y,backgroundColor:"rgba(75, 192, 192, 0.8)"},{label:"失点",data:x,backgroundColor:"rgba(255, 99, 132, 0.8)"},{label:"累積勝率(%)",type:"line",data:E,borderColor:"rgba(255, 205, 86, 1)",yAxisID:"y1"}]},options:{responsive:!0,plugins:{tooltip:{callbacks:{title:function(I){if(!I.length)return"";const v=I[0].dataIndex,w=k[v];return w?`${w.date} 【${w.title}】
${w.myTeam} vs ${w.oppTeam}`:""},label:function(I){const v=I.dataIndex,w=k[v],$=I.dataset.label||"";return $==="得点"?`得点 (${(w==null?void 0:w.myTeam)||"自チーム"}): ${I.raw} 点`:$==="失点"?`失点 (${(w==null?void 0:w.oppTeam)||"相手チーム"}): ${Math.abs(I.raw)} 点`:$==="累積勝率(%)"?`累積勝率: ${I.raw} %`:`${$}: ${I.raw}`}}}},scales:{x:{stacked:!0,ticks:{font:{size:10}}},y:{stacked:!0,position:"left"},y1:{position:"right",beginAtZero:!0,min:0,max:100}}}})}function Ya(e){let t=0,n=0,a=0,s=0,r=0,o=0,i=0,d=0,l=0,u=0,c=0,f=0,p=0,b=0,h=0;e.forEach(w=>{const $=w.plate_appearances||0,A=w.at_bats||0,P=w.hits||0,R=w.doubles||0,D=w.triples||0,M=w.home_runs||0,C=w.walks||0,L=w.hit_by_pitch||0,T=w.strike_outs||w.strikeouts||0,N=w.sacrifice_flies||w.sac_flies||0,H=w.sacrifice_hits||w.sac_bunts||0,J=w.runs_batted_in||0,G=w.runs||0,Q=w.stolen_bases||0;t+=$,n+=A,a+=P,f+=R,p+=D,c+=M,d+=C,l+=L,u+=T,b+=N,h+=H,r+=J,o+=G,i+=Q;const Z=(w.singles!==void 0?w.singles:Math.max(0,P-R-D-M))*1+R*2+D*3+M*4,U=Z>0?Z:w.total_bases||0;s+=U});const g=n>0?a/n:0,m=Math.round(g*1e3)/1e3,y=n+d+l+b,x=y>0?(a+d+l)/y:t>0?(a+d+l)/t:0,E=Math.round(x*1e3)/1e3,k=n>0?s/n:0,_=Math.round(k*1e3)/1e3,S=Math.round((E+_)*1e3)/1e3,I=a+d+l,v=I>0?o/I:0;return{pa:t,ab:n,h:a,doubles:f,triples:p,hr:c,tb:s,sf:b,sh:h,bb:d,hbp:l,rbi:r,r:o,sb:i,so:u,ob:I,avg:m,obp:E,slg:_,ops:S,runRate:v,avgStr:m.toFixed(3).replace(/^0/,""),obpStr:E.toFixed(3).replace(/^0/,""),slgStr:_.toFixed(3).replace(/^0/,""),opsStr:S.toFixed(3),runRateStr:I>0?(v*100).toFixed(1)+"%":"0.0%",bbRate:t>0?(d+l)/t:0,soRate:t>0?u/t:0}}function Ka(e){let t=0,n=0,a=0,s=0,r=0,o=0,i=0,d=0,l=0,u=0;e.forEach(g=>{t+=g.outs||0,n+=g.earned_runs||0,a+=g.hits_allowed||0,s+=(g.walks_allowed||0)+(g.hit_batters||0),r+=g.strike_outs||0,o+=g.batters_faced||0,i+=g.pitch_count||0,d+=g.strikes||0,l+=g.wins||0,u+=g.losses||0});const c=t/3,f=c>0?n*7/c:0,p=c>0?(a+s)/c:0,b=c>0?r*7/c:0,h=c>0?s*7/c:0;return{outs:t,er:n,h:a,bb:s,so:r,bf:o,pc:i,st:d,wins:l,losses:u,era:f,whip:p,k7:b,bb7:h,eraStr:f.toFixed(2),whipStr:p.toFixed(2),k7Str:b.toFixed(2),bb7Str:h.toFixed(2),kRate:o>0?r/o:0,bbRate:o>0?s/o:0,kbb:s>0?r/s:r>0?99.9:0,sRate:i>0?d/i:0}}function ir(e){let t=0,n=0,a=0,s=0,r=0,o=0;const i=new Set;(e||[]).forEach(p=>{o++,t+=p.po||0,n+=p.assists||0,a+=p.errors||0,s+=p.pb||0,r+=p.dp||0,Array.isArray(p.positions)&&p.positions.forEach(b=>i.add(b))});const d=t+n+a,l=d>0?(t+n)/d:0,u=d>0?Math.round(l*1e3)/1e3:-1,c=d>0?Math.round(l*1e3)/1e3:0,f=d>0?c.toFixed(3).replace(/^0/,""):"-";return{games:o,chances:d,po:t,a:n,e:a,pb:s,dp:r,positionsText:Array.from(i).join("・")||"-",fpct:u,fpctVal:c,fpctStr:f}}function sa(e,t){return e==="pitcher"?Ka(t):e==="fielder"?ir(t):Ya(t)}async function dr(){var d,l,u,c,f,p;await La();const e=((d=document.getElementById("ps-mode"))==null?void 0:d.value)||"single",t=(l=document.getElementById("ps-player"))==null?void 0:l.value,n=((u=document.getElementById("ps-role"))==null?void 0:u.value)||"batter",a=((c=document.getElementById("ps-limit-games"))==null?void 0:c.value)||"5",s=((f=document.getElementById("ps-ma-unit"))==null?void 0:f.value)||"ab",r=parseInt(((p=document.getElementById("ps-ma-window"))==null?void 0:p.value)||"10",10),o=document.getElementById("ps-single-container"),i=document.getElementById("ps-all-container");if(e==="single")if(o==null||o.classList.remove("hidden"),i==null||i.classList.add("hidden"),t)Pi(t,n,a,s,r);else{const b=document.getElementById("ps-highlight-cards");b&&(b.innerHTML=""),ct.rawGraph&&(ct.rawGraph.destroy(),ct.rawGraph=null),ct.maGraph&&(ct.maGraph.destroy(),ct.maGraph=null);const h=document.getElementById("ps-game-count-label");h&&(h.textContent="対象全 0 試合");const g=document.getElementById("ps-game-tbody");g&&(g.innerHTML='<tr><td colspan="19" class="p-4 text-center text-gray-500">対象条件に出場した選手データがありません</td></tr>')}else o==null||o.classList.add("hidden"),i==null||i.classList.remove("hidden"),qi(n,a,s,r)}function uo(e,t){const{games:n,bStats:a,pStats:s,fStats:r}=Ft;return(t==="batter"?a:t==="pitcher"?s:r||[]).filter(d=>d.player_id==e&&co(d,t)).map(d=>{const l=n.find(u=>u.id===d.game_id);return{date:It(l==null?void 0:l.date)||(l==null?void 0:l.date)||"",game:l,stats:d}}).filter(d=>d.date).sort((d,l)=>{var u,c;return d.date.localeCompare(l.date)||(((u=d.game)==null?void 0:u.id)||0)-(((c=l.game)==null?void 0:c.id)||0)})}function Pi(e,t,n,a,s){var c,f;const r=((c=xt.find(p=>p.id==e))==null?void 0:c.name)||((f=(Ft.fStats||[]).find(p=>p.player_id==e))==null?void 0:f.player_name)||"選手",o=uo(e,t),i=sa(t,o.map(p=>p.stats));let d=[...o];if(n!=="all"){const p=parseInt(n,10);d.length>p&&(d=d.slice(d.length-p))}const l=sa(t,d.map(p=>p.stats));Ri(r,t,l,i,d);const u=mo(d,t,a,s);Oi(r,t,d),Fi(r,t,u,a,s),Hi(t,d)}function Ri(e,t,n,a,s){const r=document.getElementById("ps-highlight-cards");if(r){if(t==="batter"){const o=n.avg-a.avg,i=(o>=0?"+":"")+o.toFixed(3).replace(/^0/,""),d=o>=.03,l=o<=-.05,u=d?"🔥 好調":l?"❄️ 不調":"⚖️ 安定",c=d?"bg-red-100 text-red-700 border-red-200":l?"bg-blue-100 text-blue-700 border-blue-200":"bg-gray-100 text-gray-700 border-gray-200";let f=0;for(let p=s.length-1;p>=0;p--){const b=s[p].stats.hits||0,h=s[p].stats.at_bats||0;if(b>0)f++;else if(h>0)break}r.innerHTML=`
            <div class="bg-white p-3 rounded-lg shadow border border-gray-100">
                <div class="text-xs text-gray-500 font-bold mb-1 flex justify-between items-center">
                    <span>直近打率 vs 通算</span>
                    <span class="text-[10px] px-1.5 py-0.5 rounded border ${c}">${u}</span>
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
                <div class="text-xl font-black text-gray-800">${f} <span class="text-xs font-normal text-gray-600">試合連続</span> (${n.h}H)</div>
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
        `}if(t==="fielder"){const o=n.chances>0&&a.chances>0,i=o?n.fpctVal-a.fpctVal:0,d=o?(i>=0?"+":"")+i.toFixed(3).replace(/^0/,""):"-";r.innerHTML=`
            <div class="bg-white p-3 rounded-lg shadow border border-gray-100">
                <div class="text-xs text-gray-500 font-bold mb-1">直近 守備率 vs 通算</div>
                <div class="text-2xl font-black text-indigo-700">${n.fpctStr}</div>
                <div class="text-xs ${i>=0?"text-green-600":"text-red-500"} font-bold mt-0.5">
                    通算 (${a.fpctStr}) 比: ${d}
                </div>
            </div>
            <div class="bg-white p-3 rounded-lg shadow border border-gray-100">
                <div class="text-xs text-gray-500 font-bold mb-1">守備機会 / 刺殺・捕殺</div>
                <div class="text-2xl font-black text-gray-800">${n.chances} <span class="text-xs font-normal text-gray-500">機会</span></div>
                <div class="text-xs text-gray-500 mt-0.5">刺殺: <span class="font-bold text-gray-800">${n.po}</span> / 捕殺: <span class="font-bold text-gray-800">${n.a}</span></div>
            </div>
            <div class="bg-white p-3 rounded-lg shadow border border-gray-100">
                <div class="text-xs text-gray-500 font-bold mb-1">失策 / 捕逸</div>
                <div class="text-2xl font-black text-red-600">${n.e} <span class="text-xs font-normal text-gray-500">E</span> / <span class="text-amber-600">${n.pb}</span> <span class="text-xs font-normal text-gray-500">PB</span></div>
                <div class="text-xs text-gray-500 mt-0.5">併殺: <span class="font-bold text-gray-800">${n.dp}</span></div>
            </div>
            <div class="bg-white p-3 rounded-lg shadow border border-gray-100">
                <div class="text-xs text-gray-500 font-bold mb-1">守備試合 / 守備位置</div>
                <div class="text-2xl font-black text-blue-600">${n.games} <span class="text-xs font-normal text-gray-500">試合</span></div>
                <div class="text-xs text-gray-500 mt-0.5 truncate" title="${K(n.positionsText)}">${K(n.positionsText)}</div>
            </div>
        `}}}function mo(e,t,n,a){var r,o,i,d,l,u;const s=[];if(e.length===0)return s;if(n==="game")for(let c=0;c<e.length;c++){const f=Math.max(0,c-a+1),p=e.slice(f,c+1),b=p.map(y=>y.stats),h=sa(t,b),g=e[c],m=vt((r=g.game)==null?void 0:r.team_first)?(o=g.game)==null?void 0:o.team_second:(i=g.game)==null?void 0:i.team_first;s.push({label:`${g.date.substring(5)} vs ${m||""}`,date:g.date,windowSpan:`${f+1}〜${c+1}試合目 (${p.length}試合)`,calc:h,stats:b})}else for(let c=0;c<e.length;c++){let f=0;const p=[];for(let y=c;y>=0;y--){p.unshift(e[y]);const x=t==="batter"?e[y].stats.at_bats||0:t==="fielder"?e[y].stats.chances||0:1;if(f+=x,f>=a)break}const b=p.map(y=>y.stats),h=sa(t,b),g=e[c],m=vt((d=g.game)==null?void 0:d.team_first)?(l=g.game)==null?void 0:l.team_second:(u=g.game)==null?void 0:u.team_first;s.push({label:`${g.date.substring(5)} vs ${m||""}`,date:g.date,windowSpan:t==="batter"?`直近 ${h.ab} 打数`:t==="fielder"?`直近 ${h.chances} 機会`:`直近 ${p.length} 登板`,calc:h,stats:b})}return s}function Oi(e,t,n){ct.rawGraph&&ct.rawGraph.destroy();const a=document.getElementById("chart-ps-raw-stats");if(!a||n.length===0)return;const s=[],r=[];let o=[];n.forEach(i=>{var u,c,f;o.push(i.stats);const d=vt((u=i.game)==null?void 0:u.team_first)?(c=i.game)==null?void 0:c.team_second:(f=i.game)==null?void 0:f.team_first;s.push(`${i.date.substring(5)} vs ${d||""}`);const l=sa(t,o);r.push(l)}),t==="batter"?ct.rawGraph=new window.Chart(a.getContext("2d"),{type:"line",data:{labels:s,datasets:[{label:"累積打率",data:r.map(i=>i.avg),borderColor:"#ef4444",backgroundColor:"#ef4444",tension:.2},{label:"累積出塁率",data:r.map(i=>i.obp),borderColor:"#3b82f6",backgroundColor:"#3b82f6",tension:.2},{label:"累積OPS",data:r.map(i=>i.ops),borderColor:"#8b5cf6",backgroundColor:"#8b5cf6",borderDash:[4,4],tension:.2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"}},scales:{y:{min:0,ticks:{font:{size:10}}},x:{ticks:{font:{size:10},maxRotation:45}}}}}):t==="pitcher"?ct.rawGraph=new window.Chart(a.getContext("2d"),{type:"line",data:{labels:s,datasets:[{label:"累積防御率",data:r.map(i=>i.era),borderColor:"#ef4444",backgroundColor:"#ef4444",tension:.2},{label:"累積WHIP",data:r.map(i=>i.whip),borderColor:"#3b82f6",backgroundColor:"#3b82f6",tension:.2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"}},scales:{y:{min:0,ticks:{font:{size:10}}},x:{ticks:{font:{size:10},maxRotation:45}}}}}):ct.rawGraph=new window.Chart(a.getContext("2d"),{type:"line",data:{labels:s,datasets:[{label:"累積守備率",data:r.map(i=>i.fpctVal),borderColor:"#4f46e5",backgroundColor:"#4f46e5",tension:.2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"}},scales:{y:{min:0,max:1,ticks:{font:{size:10}}},x:{ticks:{font:{size:10},maxRotation:45}}}}})}function Fi(e,t,n,a,s){const r=document.getElementById("ps-ma-graph-subtitle");if(r){const d=a==="ab"?t==="fielder"?"守備機会":"打数/登板":"試合";r.textContent=`(${e} - 直近${s}${d}移動平均)`}ct.maGraph&&ct.maGraph.destroy();const o=n.map(d=>d.label),i=document.getElementById("chart-ps-moving-avg");i&&(t==="batter"?ct.maGraph=new window.Chart(i.getContext("2d"),{type:"line",data:{labels:o,datasets:[{label:"移動平均 打率",data:n.map(d=>d.calc.avg),borderColor:"#ef4444",backgroundColor:"#ef4444",tension:.2},{label:"移動平均 出塁率",data:n.map(d=>d.calc.obp),borderColor:"#3b82f6",backgroundColor:"#3b82f6",tension:.2},{label:"移動平均 OPS",data:n.map(d=>d.calc.ops),borderColor:"#8b5cf6",backgroundColor:"#8b5cf6",borderDash:[4,4],tension:.2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"}},scales:{y:{min:0,ticks:{font:{size:10}}},x:{ticks:{font:{size:10},maxRotation:45}}}}}):t==="pitcher"?ct.maGraph=new window.Chart(i.getContext("2d"),{type:"line",data:{labels:o,datasets:[{label:"移動平均 防御率",data:n.map(d=>d.calc.era),borderColor:"#ef4444",backgroundColor:"#ef4444",tension:.2},{label:"移動平均 WHIP",data:n.map(d=>d.calc.whip),borderColor:"#3b82f6",backgroundColor:"#3b82f6",tension:.2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"}},scales:{y:{min:0,ticks:{font:{size:10}}},x:{ticks:{font:{size:10},maxRotation:45}}}}}):ct.maGraph=new window.Chart(i.getContext("2d"),{type:"line",data:{labels:o,datasets:[{label:"移動平均 守備率",data:n.map(d=>d.calc.fpctVal),borderColor:"#4f46e5",backgroundColor:"#4f46e5",tension:.2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"}},scales:{y:{min:0,max:1,ticks:{font:{size:10}}},x:{ticks:{font:{size:10},maxRotation:45}}}}}))}function Hi(e,t){const n=document.getElementById("ps-game-thead"),a=document.getElementById("ps-game-tbody"),s=document.getElementById("ps-game-count-label");if(!n||!a)return;s&&(s.textContent=`対象全 ${t.length} 試合（最新順）`);const r=[...t].reverse();e==="batter"?(n.innerHTML=`
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
        `,a.innerHTML=r.map(o=>{var L,T,N,H,J;const i=o.stats,d=vt((L=o.game)==null?void 0:L.team_first)?(T=o.game)==null?void 0:T.team_second:(N=o.game)==null?void 0:N.team_first,l=i.plate_appearances||0,u=i.at_bats||0,c=i.hits||0,f=i.doubles||0,p=i.triples||0,b=i.home_runs||0,h=i.singles!==void 0?i.singles:Math.max(0,c-f-p-b),g=i.runs_batted_in||0,m=i.runs||0,y=i.walks||0,x=i.hit_by_pitch||0,E=i.strikeouts||i.strike_outs||0,k=i.sacrifice_flies||i.sac_flies||0,_=(i.sacrifice_hits||i.sac_bunts||0)+k,S=i.stolen_bases||0,I=i.errors??(((J=(H=Ft.fStats)==null?void 0:H.find(G=>G.player_id==i.player_id&&G.game_id==i.game_id))==null?void 0:J.errors)||0),v=u>0?(c/u).toFixed(3).replace(/^0/,""):".000",w=u+y+x+k,$=w>0?(c+y+x)/w:l>0?(c+y+x)/l:0,A=Math.round($*1e3)/1e3;A.toFixed(3).replace(/^0/,"");const P=h+f*2+p*3+b*4,R=P>0?P:i.total_bases||0,D=u>0?R/u:0,M=Math.round(D*1e3)/1e3;M.toFixed(3).replace(/^0/,"");const C=(Math.round((A+M)*1e3)/1e3).toFixed(3);return`
                <tr class="hover:bg-gray-50">
                    <td class="p-2 border font-bold">${o.date}</td>
                    <td class="p-2 border">${d||"不明"}</td>
                    <td class="p-2 border text-center">${l}</td>
                    <td class="p-2 border text-center font-bold">${u}</td>
                    <td class="p-2 border text-center text-green-600 font-bold ${c>0?"bg-green-50":""}">${c}</td>
                    <td class="p-2 border text-center">${h}</td>
                    <td class="p-2 border text-center">${f}</td>
                    <td class="p-2 border text-center">${p}</td>
                    <td class="p-2 border text-center text-red-600 font-bold ${b>0?"bg-red-50":""}">${b}</td>
                    <td class="p-2 border text-center font-bold">${g}</td>
                    <td class="p-2 border text-center">${m}</td>
                    <td class="p-2 border text-center">${y}</td>
                    <td class="p-2 border text-center">${x}</td>
                    <td class="p-2 border text-center text-gray-500">${E}</td>
                    <td class="p-2 border text-center">${_}</td>
                    <td class="p-2 border text-center">${S}</td>
                    <td class="p-2 border text-center text-gray-500">${I}</td>
                    <td class="p-2 border text-center font-black text-red-600">${v}</td>
                    <td class="p-2 border text-center font-bold text-purple-700 bg-purple-50">${C}</td>
                </tr>
            `}).join("")):e==="pitcher"?(n.innerHTML=`
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
        `,a.innerHTML=r.map(o=>{var S,I,v;const i=o.stats,d=vt((S=o.game)==null?void 0:S.team_first)?(I=o.game)==null?void 0:I.team_second:(v=o.game)==null?void 0:v.team_first,l=i.outs||0,u=`${Math.floor(l/3)}${l%3!==0?"."+l%3:""}`,c=i.pitch_count||0,f=i.strikes||0,p=i.hits_allowed||0,b=i.home_runs_allowed||0,h=i.walks_allowed||0,g=i.hit_batters||0,m=i.strike_outs||0,y=i.runs_allowed||0,x=i.earned_runs||0,E=l/3,k=E>0?(x*7/E).toFixed(2):"0.00",_=E>0?((p+h)/E).toFixed(2):"0.00";return`
                <tr class="hover:bg-gray-50">
                    <td class="p-2 border font-bold">${o.date}</td>
                    <td class="p-2 border">${d||"不明"}</td>
                    <td class="p-2 border text-center font-bold">${u}</td>
                    <td class="p-2 border text-center">${c} (${f})</td>
                    <td class="p-2 border text-center">${p}</td>
                    <td class="p-2 border text-center text-red-600">${b}</td>
                    <td class="p-2 border text-center">${h}</td>
                    <td class="p-2 border text-center">${g}</td>
                    <td class="p-2 border text-center text-green-600 font-bold">${m}</td>
                    <td class="p-2 border text-center text-red-600">${y}</td>
                    <td class="p-2 border text-center text-red-600 font-bold">${x}</td>
                    <td class="p-2 border text-center font-black text-red-600">${k}</td>
                    <td class="p-2 border text-center font-bold text-blue-600">${_}</td>
                </tr>
            `}).join("")):(n.innerHTML=`
            <tr>
                <th class="p-2 border">日付</th>
                <th class="p-2 border">相手チーム</th>
                <th class="p-2 border">守備位置</th>
                <th class="p-2 border text-center">守備機会</th>
                <th class="p-2 border text-center">刺殺</th>
                <th class="p-2 border text-center">捕殺</th>
                <th class="p-2 border text-center text-red-600">失策</th>
                <th class="p-2 border text-center text-amber-700">捕逸</th>
                <th class="p-2 border text-center">併殺</th>
                <th class="p-2 border text-center font-bold text-indigo-700">守備率</th>
            </tr>
        `,a.innerHTML=r.map(o=>{var u,c,f;const i=o.stats,d=vt((u=o.game)==null?void 0:u.team_first)?(c=o.game)==null?void 0:c.team_second:(f=o.game)==null?void 0:f.team_first,l=ir([i]);return`
                <tr class="hover:bg-gray-50">
                    <td class="p-2 border font-bold">${o.date}</td>
                    <td class="p-2 border">${K(d||"不明")}</td>
                    <td class="p-2 border text-xs">${K(l.positionsText)}</td>
                    <td class="p-2 border text-center font-bold">${l.chances}</td>
                    <td class="p-2 border text-center">${l.po}</td>
                    <td class="p-2 border text-center">${l.a}</td>
                    <td class="p-2 border text-center ${l.e>0?"text-red-600 font-bold bg-red-50":""}">${l.e}</td>
                    <td class="p-2 border text-center ${l.pb>0?"text-amber-700 font-bold bg-amber-50":""}">${l.pb}</td>
                    <td class="p-2 border text-center">${l.dp}</td>
                    <td class="p-2 border text-center font-black text-indigo-700 bg-indigo-50">${l.fpctStr}</td>
                </tr>
            `}).join(""))}function qi(e,t,n,a){const s=document.getElementById("ps-all-title"),r=document.getElementById("ps-all-subtitle"),o=document.getElementById("ps-all-thead"),i=document.getElementById("ps-all-tbody");if(!o||!i)return;const d=t==="all"?"全試合":`直近 ${t} 試合`,l=e==="batter"?"打撃":e==="pitcher"?"投手":"守備",u=n==="ab"?e==="fielder"?"守備機会":"打数/登板":"試合";s&&(s.textContent=`👥 全選手成績一覧 (${l})`),r&&(r.textContent=`対象: ${d} / 移動平均: 直近${a}${u} (各列クリックでソート)`);const{players:c}=Fs(e),f=c.map(h=>{const g=uo(h.id,e);if(g.length===0)return null;let m=[...g];if(t!=="all"){const k=parseInt(t,10);m.length>k&&(m=m.slice(m.length-k))}const y=sa(e,m.map(k=>k.stats)),x=mo(m,e,n,a),E=x.length>0?x[x.length-1].calc:y;return{player:h,name:h.name,gameCount:m.length,calcPeriod:y,latestMa:E,ab:y.ab,h:y.h,hr:y.hr,rbi:y.rbi,r:y.r,bb:(y.bb||0)+(y.hbp||0),avg:y.avg,obp:y.obp,slg:y.slg,ops:y.ops,runRate:y.runRate,maAvg:E.avg,maOps:E.ops,outs:y.outs,so:y.so,pBb:y.bb,wins:y.wins,losses:y.losses,era:y.era,whip:y.whip,maEra:E.era,maWhip:E.whip,chances:y.chances,po:y.po,a:y.a,e:y.e,pb:y.pb,dp:y.dp,fpct:y.fpct,maFpct:E.fpct}}).filter(Boolean),p=Jn[e];f.sort((h,g)=>{let m=h[p.key],y=g[p.key];return m===void 0&&(m=0),y===void 0&&(y=0),typeof m=="string"?p.order==="asc"?m.localeCompare(y):y.localeCompare(m):p.order==="asc"?m-y:y-m});const b=h=>p.key===h?p.order==="asc"?" ▲":" ▼":"";e==="batter"?(o.innerHTML=`
            <tr>
                <th class="p-2 border cursor-pointer select-none hover:bg-gray-200" data-ps-sort="name">選手名<span>${b("name")}</span></th>
                <th class="p-2 border text-center cursor-pointer select-none hover:bg-gray-200" data-ps-sort="gameCount">試合数<span>${b("gameCount")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="ab">打数<span>${b("ab")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="h">安打<span>${b("h")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="hr">HR<span>${b("hr")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="rbi">打点<span>${b("rbi")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 text-green-700 font-bold" data-ps-sort="r">得点<span>${b("r")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 text-blue-700 font-bold" data-ps-sort="bb">四死球<span>${b("bb")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-red-600" data-ps-sort="avg">打率 (${d})<span>${b("avg")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-blue-600" data-ps-sort="obp">出塁率 (${d})<span>${b("obp")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-teal-600" data-ps-sort="slg">長打率 (${d})<span>${b("slg")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-purple-600" data-ps-sort="ops">OPS (${d})<span>${b("ops")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-amber-600" data-ps-sort="runRate">生還率 (R/OB)<span>${b("runRate")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-blue-600" data-ps-sort="maAvg">移動平均 打率<span>${b("maAvg")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-indigo-600" data-ps-sort="maOps">移動平均 OPS<span>${b("maOps")}</span></th>
            </tr>
        `,i.innerHTML=f.length===0?'<tr><td colspan="15" class="p-4 text-center text-gray-500">該当する選手データがありません</td></tr>':f.map(h=>`
            <tr class="hover:bg-gray-50">
                <td class="p-2 border font-bold text-gray-800">${K(h.player.name)}</td>
                <td class="p-2 border text-center">${h.gameCount}</td>
                <td class="p-2 border text-right font-semibold">${h.calcPeriod.ab}</td>
                <td class="p-2 border text-right text-green-600 font-bold">${h.calcPeriod.h}</td>
                <td class="p-2 border text-right">${h.calcPeriod.hr}</td>
                <td class="p-2 border text-right">${h.calcPeriod.rbi}</td>
                <td class="p-2 border text-right font-bold text-green-700">${h.calcPeriod.r}</td>
                <td class="p-2 border text-right font-bold text-blue-700">${h.calcPeriod.bb+h.calcPeriod.hbp}</td>
                <td class="p-2 border text-right font-black text-red-600">${h.calcPeriod.avgStr}</td>
                <td class="p-2 border text-right font-bold text-blue-600">${h.calcPeriod.obpStr}</td>
                <td class="p-2 border text-right font-bold text-teal-600">${h.calcPeriod.slgStr}</td>
                <td class="p-2 border text-right font-black text-purple-700 bg-purple-50">${h.calcPeriod.opsStr}</td>
                <td class="p-2 border text-right font-bold text-amber-600 bg-amber-50">${h.calcPeriod.runRateStr}</td>
                <td class="p-2 border text-right font-bold text-blue-600">${h.latestMa.avgStr}</td>
                <td class="p-2 border text-right font-bold text-indigo-600">${h.latestMa.opsStr}</td>
            </tr>
        `).join("")):e==="pitcher"?(o.innerHTML=`
            <tr>
                <th class="p-2 border cursor-pointer select-none hover:bg-gray-200" data-ps-sort="name">選手名<span>${b("name")}</span></th>
                <th class="p-2 border text-center cursor-pointer select-none hover:bg-gray-200" data-ps-sort="gameCount">登板数<span>${b("gameCount")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 text-green-700 font-bold" data-ps-sort="wins">勝利<span>${b("wins")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 text-red-600 font-bold" data-ps-sort="losses">敗戦<span>${b("losses")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="outs">投球回<span>${b("outs")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="so">奪三振<span>${b("so")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="pBb">与四死<span>${b("pBb")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-red-600" data-ps-sort="era">防御率 (${d})<span>${b("era")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-blue-600" data-ps-sort="whip">WHIP (${d})<span>${b("whip")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-red-500" data-ps-sort="maEra">移動平均 防御率<span>${b("maEra")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-blue-500" data-ps-sort="maWhip">移動平均 WHIP<span>${b("maWhip")}</span></th>
            </tr>
        `,i.innerHTML=f.length===0?'<tr><td colspan="11" class="p-4 text-center text-gray-500">該当する選手データがありません</td></tr>':f.map(h=>`
            <tr class="hover:bg-gray-50">
                <td class="p-2 border font-bold text-gray-800">${K(h.player.name)}</td>
                <td class="p-2 border text-center">${h.gameCount}</td>
                <td class="p-2 border text-right font-bold text-green-700">${h.calcPeriod.wins}</td>
                <td class="p-2 border text-right font-bold text-red-600">${h.calcPeriod.losses}</td>
                <td class="p-2 border text-right font-semibold">${(h.calcPeriod.outs/3).toFixed(1)}</td>
                <td class="p-2 border text-right text-green-600 font-bold">${h.calcPeriod.so}</td>
                <td class="p-2 border text-right">${h.calcPeriod.bb}</td>
                <td class="p-2 border text-right font-black text-red-600">${h.calcPeriod.eraStr}</td>
                <td class="p-2 border text-right font-black text-blue-600 bg-blue-50">${h.calcPeriod.whipStr}</td>
                <td class="p-2 border text-right font-bold text-red-500">${h.latestMa.eraStr}</td>
                <td class="p-2 border text-right font-bold text-blue-500">${h.latestMa.whipStr}</td>
            </tr>
        `).join("")):(o.innerHTML=`
            <tr>
                <th class="p-2 border cursor-pointer select-none hover:bg-gray-200" data-ps-sort="name">選手名<span>${b("name")}</span></th>
                <th class="p-2 border text-center cursor-pointer select-none hover:bg-gray-200" data-ps-sort="gameCount">試合数<span>${b("gameCount")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="chances">守備機会<span>${b("chances")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="po">刺殺<span>${b("po")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="a">捕殺<span>${b("a")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 text-red-600" data-ps-sort="e">失策<span>${b("e")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 text-amber-700" data-ps-sort="pb">捕逸<span>${b("pb")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="dp">併殺<span>${b("dp")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-indigo-700" data-ps-sort="fpct">守備率 (${d})<span>${b("fpct")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-indigo-500" data-ps-sort="maFpct">移動平均 守備率<span>${b("maFpct")}</span></th>
            </tr>
        `,i.innerHTML=f.length===0?'<tr><td colspan="10" class="p-4 text-center text-gray-500">該当する守備データがありません</td></tr>':f.map(h=>`
            <tr class="hover:bg-gray-50">
                <td class="p-2 border font-bold text-gray-800">${K(h.player.name)}</td>
                <td class="p-2 border text-center">${h.gameCount}</td>
                <td class="p-2 border text-right font-semibold">${h.calcPeriod.chances}</td>
                <td class="p-2 border text-right">${h.calcPeriod.po}</td>
                <td class="p-2 border text-right">${h.calcPeriod.a}</td>
                <td class="p-2 border text-right ${h.calcPeriod.e>0?"text-red-600 font-bold":""}">${h.calcPeriod.e}</td>
                <td class="p-2 border text-right ${h.calcPeriod.pb>0?"text-amber-700 font-bold":""}">${h.calcPeriod.pb}</td>
                <td class="p-2 border text-right">${h.calcPeriod.dp}</td>
                <td class="p-2 border text-right font-black text-indigo-700 bg-indigo-50">${h.calcPeriod.fpctStr}</td>
                <td class="p-2 border text-right font-bold text-indigo-500">${h.latestMa.fpctStr}</td>
            </tr>
        `).join("")),o.querySelectorAll("th[data-ps-sort]").forEach(h=>{h.addEventListener("click",()=>{const g=h.dataset.psSort;Jn[e].key===g?Jn[e].order=Jn[e].order==="asc"?"desc":"asc":(Jn[e].key=g,Jn[e].order=g==="era"||g==="whip"||g==="maEra"||g==="maWhip"||g==="e"||g==="pb"||g==="name"?"asc":"desc"),dr()})})}function Ui(){var u,c,f,p,b,h;const e=((u=document.getElementById("ps-mode"))==null?void 0:u.value)||"single",t=((c=document.getElementById("ps-role"))==null?void 0:c.value)||"batter",n=(f=document.getElementById("ps-player"))==null?void 0:f.value,a=((p=xt.find(g=>g.id==n))==null?void 0:p.name)||"全選手";let s="\uFEFF",r=`ants_stats_${e}_${t}_${a}_${new Date().toISOString().substring(0,10)}.csv`,o=null;if(e==="single"?o=(b=document.querySelector("#ps-game-tbody"))==null?void 0:b.closest("table"):o=(h=document.querySelector("#ps-all-tbody"))==null?void 0:h.closest("table"),!o){alert("出力対象のテーブルが見つかりません。");return}Array.from(o.querySelectorAll("tr")).forEach(g=>{const y=Array.from(g.querySelectorAll("th, td")).map(x=>`"${x.textContent.trim().replace(/"/g,'""')}"`).join(",");s+=y+`
`});const d=new Blob([s],{type:"text/csv;charset=utf-8;"}),l=document.createElement("a");l.href=URL.createObjectURL(d),l.download=r,l.click(),URL.revokeObjectURL(l.href)}function po(){const{games:e,bStats:t,pStats:n,fStats:a}=Ft,s=e?e.length:0,r=s*2,o=document.getElementById("ranking-summary-info");o&&(o.textContent=`対象試合: ${s}試合 / 規定打席: ${r}打席 (試合数×2)`);const i=document.getElementById("ranking-mode-note");i&&(i.textContent=Ja?"※規定打席＝対象試合数×2打席（規定到達者を上位、規定未満を薄グレー網掛けで下段に表示）":"※規定打席を考慮せず全打者を合算順位で表示中（規定打席＝対象試合数×2打席）");const d={},l={},u={};t.forEach(c=>{d[c.player_id]||(d[c.player_id]=[]),d[c.player_id].push(c)}),n.forEach(c=>{l[c.player_id]||(l[c.player_id]=[]),l[c.player_id].push(c)}),(a||[]).forEach(c=>{u[c.player_id]||(u[c.player_id]=[]),u[c.player_id].push(c)}),Fa.batter=Object.keys(d).map(c=>{var p;const f=Ya(d[c]);return{name:((p=xt.find(b=>b.id==c))==null?void 0:p.name)||"不明",...f,meetsRegulation:f.pa>=r}}).filter(c=>c.pa>0),Fa.pitcher=Object.keys(l).map(c=>{var f;return{name:((f=xt.find(p=>p.id==c))==null?void 0:f.name)||"不明",...Ka(l[c])}}).filter(c=>c.outs>0),Fa.fielder=Object.keys(u).map(c=>{var h,g;const f=u[c],p=ir(f);return{name:((h=xt.find(m=>m.id==c))==null?void 0:h.name)||((g=f[0])==null?void 0:g.player_name)||"不明",...p}}).filter(c=>c.chances>0||c.pb>0||c.dp>0),Ha("batter"),Ha("pitcher"),Ha("fielder")}function ji(e,t){Bn[e].key===t?Bn[e].order=Bn[e].order==="asc"?"desc":"asc":(Bn[e].key=t,t==="era"||t==="whip"||t==="bb7"||t==="bbRate"||t==="e"||t==="pb"||t==="name"?Bn[e].order="asc":Bn[e].order="desc"),Ha(e)}function Ha(e){const t=Bn[e],n=Fa[e];if(n.sort((s,r)=>{if(e==="batter"&&Ja&&s.meetsRegulation!==r.meetsRegulation)return s.meetsRegulation?-1:1;let o=s[t.key],i=r[t.key];if(typeof o=="string")return t.order==="asc"?o.localeCompare(i):i.localeCompare(o);const d=t.order==="asc"?o-i:i-o;return d!==0?d:e==="fielder"&&t.key==="fpct"?(r.chances||0)-(s.chances||0):0}),e==="batter"){const s=document.getElementById("ranking-batter-tbody");if(s)if(n.length===0)s.innerHTML='<tr><td colspan="15" class="p-4 text-center text-gray-500">該当する選手データがありません</td></tr>';else{const r="background-image: repeating-linear-gradient(135deg, #f3f4f6 0px, #f3f4f6 6px, #e5e7eb 6px, #e5e7eb 12px);";let o=!1;s.innerHTML=n.map(i=>{const d=Ja&&!i.meetsRegulation,l=d&&!o;d&&(o=!0);const u=d?`border-b text-gray-500 ${l?"border-t-2 border-t-gray-300":""}`:"border-b hover:bg-gray-50",c=d?`style="${r}"`:"",f=d?'<span class="ml-1 text-[10px] font-normal px-1 py-0.5 rounded bg-gray-300/80 text-gray-700">規定未満</span>':"",p=d?"font-bold text-gray-600":"font-bold text-red-600",b=d?"font-bold text-gray-600":"text-purple-700 font-bold bg-purple-50",h=d?"text-gray-600":"text-blue-600",g=d?"text-gray-600":"text-teal-600";return`<tr class="${u}" ${c}><td class="p-2 font-bold">${K(i.name)}${f}</td><td class="p-2">${i.pa}</td><td class="p-2">${i.ab}</td><td class="p-2 ${p}">${i.avgStr}</td><td class="p-2 ${b}">${i.opsStr}</td><td class="p-2 ${h}">${i.obpStr}</td><td class="p-2 ${g}">${i.slgStr}</td><td class="p-2">${i.h}</td><td class="p-2">${i.tb}</td><td class="p-2">${i.bb}</td><td class="p-2">${i.hbp}</td><td class="p-2">${i.rbi}</td><td class="p-2">${i.r}</td><td class="p-2">${i.sb}</td><td class="p-2">${i.hr}</td></tr>`}).join("")}}else if(e==="pitcher"){const s=document.getElementById("ranking-pitcher-tbody");s&&(s.innerHTML=n.length===0?'<tr><td colspan="12" class="p-4 text-center text-gray-500">該当する選手データがありません</td></tr>':n.map(r=>`<tr class="border-b hover:bg-gray-50"><td class="p-2 font-bold">${K(r.name)}</td><td class="p-2 text-green-700 font-bold">${r.wins}</td><td class="p-2 text-red-600 font-bold">${r.losses}</td><td class="p-2">${r.outs}</td><td class="p-2 text-red-600 font-bold">${r.era.toFixed(2)}</td><td class="p-2">${r.whip.toFixed(2)}</td><td class="p-2">${r.k7.toFixed(2)}</td><td class="p-2">${r.bb7.toFixed(2)}</td><td class="p-2">${r.kRate.toFixed(3)}</td><td class="p-2">${r.bbRate.toFixed(3)}</td><td class="p-2">${(r.sRate*100).toFixed(1)}</td><td class="p-2">${r.kbb.toFixed(2)}</td></tr>`).join(""))}else{const s=document.getElementById("ranking-fielder-tbody");s&&(s.innerHTML=n.length===0?'<tr><td colspan="9" class="p-4 text-center text-gray-500">該当する守備データがありません</td></tr>':n.map(r=>`<tr class="border-b hover:bg-gray-50"><td class="p-2 font-bold">${K(r.name)}</td><td class="p-2">${r.games}</td><td class="p-2 font-semibold">${r.chances}</td><td class="p-2 font-bold text-indigo-700 bg-indigo-50">${r.fpctStr}</td><td class="p-2">${r.po}</td><td class="p-2">${r.a}</td><td class="p-2 ${r.e>0?"text-red-600 font-bold":""}">${r.e}</td><td class="p-2 ${r.pb>0?"text-amber-700 font-bold":""}">${r.pb}</td><td class="p-2">${r.dp}</td></tr>`).join(""))}document.querySelectorAll(`#tab-content-ranking th[data-role="${e}"] span`).forEach(s=>s.textContent="");const a=document.querySelector(`#tab-content-ranking th[data-role="${e}"][data-sort="${t.key}"] span`);a&&(a.textContent=t.order==="asc"?" ▲":" ▼")}async function Zn(){var f,p,b,h,g;await La();const e=((f=document.getElementById("comp-role"))==null?void 0:f.value)||"batter",n=(((p=document.getElementById("comp-calc-mode"))==null?void 0:p.value)||"cumulative")==="moving_avg",a=Math.max(1,parseInt((b=document.getElementById("comp-ma-window"))==null?void 0:b.value,10)||5),s=Array.from(document.querySelectorAll(".comp-player-cb:checked")).map(m=>m.value);(h=document.getElementById("comp-window-wrap"))==null||h.classList.toggle("hidden",!n),(g=document.getElementById("comp-ma-note"))==null||g.classList.toggle("hidden",!n),Object.values(ks).forEach(m=>m.destroy()),ks={};const r=document.getElementById("comp-charts-container");if(r&&(r.innerHTML=""),s.length===0)return;const{games:o,bStats:i,pStats:d}=Ft,l=[...new Set(o.map(m=>It(m.date)).filter(Boolean))].sort(),u=["#ef4444","#3b82f6","#10b981","#f59e0b","#8b5cf6","#06b6d4","#ec4899"];(e==="batter"?[{key:"avg",name:"打率"},{key:"ops",name:"OPS"},{key:"obp",name:"出塁率"},{key:"slg",name:"長打率"}]:[{key:"era",name:"防御率"},{key:"whip",name:"WHIP"},{key:"k7",name:"K/7"},{key:"bb7",name:"BB/7"},{key:"sRate",name:"S率(%)"}]).forEach((m,y)=>{const x=`chart-comp-${y}`,E=document.createElement("div");E.className="bg-white p-4 rounded shadow-md relative h-[300px] md:h-[400px]",E.innerHTML=`<canvas id="${x}"></canvas>`,r.appendChild(E);const k=s.map((S,I)=>{var R;const w=(e==="batter"?i:d).filter(D=>D.player_id==S).map(D=>{var M;return{date:It((M=o.find(C=>C.id===D.game_id))==null?void 0:M.date),stats:D}}).filter(D=>D.date).sort((D,M)=>D.date.localeCompare(M.date)),$={};if(n)for(let D=0;D<w.length;D++){const M=w.slice(Math.max(0,D-a+1),D+1).map(T=>T.stats);let L=(e==="batter"?Ya(M):Ka(M))[m.key];m.key==="sRate"&&(L=L*100),$[w[D].date]=L}else{const D=[];w.forEach(M=>{D.push(M.stats);let L=(e==="batter"?Ya(D):Ka(D))[m.key];m.key==="sRate"&&(L=L*100),$[M.date]=L})}let A=null;const P=l.map(D=>($[D]!==void 0&&(A=$[D]),A));return{label:((R=xt.find(D=>D.id==S))==null?void 0:R.name)||"不明",data:P,borderColor:u[I%u.length],spanGaps:!0,tension:.1}}),_=n?`選手比較・直近${a}試合 移動平均 (${m.name})`:`選手比較・累積 (${m.name})`;ks[x]=new window.Chart(document.getElementById(x).getContext("2d"),{type:"line",data:{labels:l,datasets:k},options:{responsive:!0,maintainAspectRatio:!1,plugins:{title:{display:!0,text:_}}}})})}function lr(){const e=document.getElementById("home-team-list");e&&(e.innerHTML=De.homeTeamNames.map(t=>`<div class="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2">
            <span>${t}</span>
            <button onclick="window.dashboard_removeHomeTeam('${t}')" class="text-red-500 hover:text-red-700 font-bold">&times;</button>
        </div>`).join(""))}async function Gi(){const e=document.getElementById("new-home-team-name"),t=e.value.trim();if(!t||De.homeTeamNames.includes(t))return;const n=[...De.homeTeamNames,t];localStorage.setItem("ants_homeTeamNames",JSON.stringify(n)),W("自チーム名を追加中 (DB同期)...");try{await rr("homeTeamNames",n,"DASHBOARD_HOME_TEAMS",{teams:n,_updatedAt:Date.now()}),Un(!0,"自チーム名をSupabase DBへ保存・同期しました")}catch(a){console.error("Supabase sync failed",a),Un(!1,`DB同期に失敗 (このブラウザのみ保存): ${a.message}`)}finally{V()}De.homeTeamNames=n,lr(),e.value="",Zt()}window.dashboard_removeHomeTeam=async function(e){if(!confirm(`「${e}」を自チームから削除しますか？`))return;const t=De.homeTeamNames.filter(n=>n!==e);localStorage.setItem("ants_homeTeamNames",JSON.stringify(t)),W("自チーム名を削除中 (DB同期)...");try{await rr("homeTeamNames",t,"DASHBOARD_HOME_TEAMS",{teams:t,_updatedAt:Date.now()}),Un(!0,"自チーム名をSupabase DBから更新・同期しました")}catch(n){console.error("Supabase sync failed",n),Un(!1,`DB同期に失敗 (このブラウザのみ保存): ${n.message}`)}finally{V()}De.homeTeamNames=t,lr(),Zt()};async function Vi(){const e=document.getElementById("csv-import-file"),t=document.getElementById("csv-import-type").value,n=document.getElementById("import-result-msg");if(!e.files||e.files.length===0)return alert("CSVファイルを選択してください。");const a=e.files[0],s=new FileReader;s.onload=async r=>{let o=r.target.result;o=o.replace(/^\uFEFF/,""),o=o.replace(/([A-Za-z0-9]+)(\d{3},[^0-9,])/g,`$1
$2`);const i=Bi(o);if(i.length<2)return alert("データが空かフォーマットが不正です。");W("データベースへ保存中..."),n.classList.add("hidden");try{const d=new Map,l=new Map,u=[];for(let I=1;I<i.length;I++){const v=i[I];if(v.length<30)continue;const w=parseInt(v[0]),$=parseInt(v[3]);if(isNaN(w)||isNaN($))continue;d.set(w,{id:w,name:v[1]||"不明",uniform_number:v[2]||null});let A=null;if(v[4]&&v[4].trim()){const R=v[4].trim().replace(/\//g,"-"),D=new Date(R);if(isNaN(D.getTime())){const M=R.split("-");if(M.length===3){const C=parseInt(M[0],10),L=parseInt(M[1],10),T=parseInt(M[2],10);!isNaN(C)&&!isNaN(L)&&!isNaN(T)&&(A=`${C}-${String(L).padStart(2,"0")}-${String(T).padStart(2,"0")}`)}}else{const M=D.getFullYear(),C=String(D.getMonth()+1).padStart(2,"0"),L=String(D.getDate()).padStart(2,"0");A=`${M}-${C}-${L}`}}l.set($,{id:$,date:A,team_first:v[5]||null,score:v[6]||null,team_second:v[7]||null,title:v[8]||null,category:v[9]||null,stadium:v[10]||null});const P={player_id:w,game_id:$};t==="batter"?["plate_appearances","at_bats","runs","hits","doubles","triples","home_runs","total_bases","runs_batted_in","stolen_bases","caught_stealing","sacrifice_hits","sacrifice_flies","walks","hit_by_pitch","strike_outs","left_on_base","double_plays","scoring_position_at_bats","scoring_position_hits","go","fo"].forEach((D,M)=>P[D]=parseInt(v[11+M])||0):t==="pitcher"&&["is_starter","wins","losses","saves","holds","qs","outs","pitch_count","strikes","batters_faced","at_bats","hits_allowed","home_runs_allowed","walks_allowed","hit_batters","strike_outs","runs_allowed","earned_runs","wild_pitches","balks","sacrifice_hits_allowed","sacrifice_flies_allowed","go","fo"].forEach((D,M)=>P[D]=parseInt(v[11+M])||0),u.push(P)}const c=Array.from(l.values()),{idMap:f,remappedCount:p,collisionReassignedCount:b}=bo(c),h=new Map;c.forEach(I=>{const v=f.get(I.id)??I.id;h.set(v,{...I,id:v})});const g=new Map;u.forEach(I=>{const v=f.get(I.game_id)??I.game_id;g.set(`${I.player_id}_${v}`,{...I,game_id:v})});const m=Array.from(g.values()),{error:y}=await B.from("players").upsert(Array.from(d.values()));if(y)throw y;const{error:x}=await B.from("games").upsert(Array.from(h.values()));if(x)throw x;const E=t==="batter"?"batter_stats":"pitcher_stats",{error:k}=await B.from(E).upsert(m,{onConflict:"player_id, game_id"});if(k)throw k;const _=[];p>0&&_.push(`既存試合統合: ${p}件`),b>0&&_.push(`別試合ID衝突を新規採番で保護: ${b}件`);const S=_.length>0?` (${_.join(" / ")})`:"";await le("IMPORT_CSV",`成績データ(${t==="batter"?"打者":"投手"})を${m.length}件インポートしました${S}`),n.textContent=`成功: ${m.length} 件のデータをインポートしました${S}。`,n.className="mt-4 text-sm font-bold text-green-600",n.classList.remove("hidden"),e.value="",ka()}catch(d){n.textContent=`エラー: ${d.message}`,n.className="mt-4 text-sm font-bold text-red-600",n.classList.remove("hidden")}finally{V()}},s.readAsText(a)}let ft=null,Oe=null,gn=null;const tt={0:"ピッチャー",1:"キャッチャー",2:"ファースト",3:"セカンド",4:"サード",5:"ショート",6:"レフト",7:"センター",8:"ライト",9:"指名打者"},fo={0:"ピッチャー",1:"キャッチャー",2:"ファースト",3:"セカンド",4:"サード",5:"ショート",6:"外野"};function K(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function nt(e,t=null){if(e==null||e==="")return t;if(typeof e!="string")return e;try{return JSON.parse(e)}catch{return t}}function zi(e){if(!e||isNaN(Number(e)))return"";const t=new Date(Number(e));return isNaN(t.getTime())?"":`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}function qa(e,t=null){const n=t||nt(e==null?void 0:e.cf,{});return(n==null?void 0:n.date)||(e==null?void 0:e.da)||zi(e==null?void 0:e.tm)||""}function Mr(e){if(!e)return"";const t=String(e).split("T")[0].replace(/\//g,"-").split("-");if(t.length===3){const n=parseInt(t[0],10),a=parseInt(t[1],10),s=parseInt(t[2],10);if(!isNaN(n)&&!isNaN(a)&&!isNaN(s))return`${n}-${a}-${s}`}return e}function Pn(e){if(!e||!e.sc)return"";const t=nt(e.sc,null);return Array.isArray(t)&&t[1]&&Array.isArray(t[1])&&t[1][0]&&t[1][1]?`${t[1][0][0]}-${t[1][1][0]}`:""}function Qa(e){return e&&(e.disp||e.di||((e.la||e.last||"")+(e.fi||e.first?" "+(e.fi||e.first):"")).trim()||e.na)||"不明"}function go(e){const t=new Map,n=new Map,a=new Map,s=[],r=[],o=[["選手ID","選手名","背番号","試合ID","日付","先攻チーム","得点","後攻チーム","タイトル","カテゴリ","球場","打席","打数","得点","安打","二塁打","三塁打","本塁打","塁打","打点","盗塁","盗塁死","犠打","犠飛","四球","死球","三振","残塁","併殺打","得点圏打数","得点圏安打","GO","FO"]],i=[["選手ID","選手名","背番号","試合ID","日付","先攻チーム","得点","後攻チーム","タイトル","カテゴリ","球場","先発","勝数","負数","セーブ","ホールド","QS","アウト数","球数","S数","打者","打数","安打","本塁打","四球","死球","三振","失点","自責点","暴投","ボーク","犠打","犠飛","GO","FO"]],d=new Map;Array.isArray(e.fld)&&e.fld.forEach(g=>{const m=parseInt(g.gid,10),y=parseInt(g.pid,10);isNaN(m)||isNaN(y)||y<=0||(d.has(m)||d.set(m,[]),d.get(m).push(g))});const l=new Map;Array.isArray(e.cat)&&e.cat.forEach(g=>{const m=parseInt(g.gid,10),y=parseInt(g.pid,10);isNaN(m)||isNaN(y)||y<=0||(l.has(m)||l.set(m,[]),l.get(m).push(g))});const u=new Map;(Array.isArray(e.game)?e.game:e.game?[e.game]:e.cd&&e.cf?[e]:[]).forEach(g=>{const m=parseInt(g.gid??g._id,10);if(isNaN(m))return;u.set(m,g);const y=nt(g.cf,{}),x=qa(g,y),E=It(x)||null,k=Pn(g),_=g.tt||(y==null?void 0:y.title)||null,S=g.pa||(y==null?void 0:y.stadi)||null;n.set(m,{id:m,date:E,team_first:g.tn||null,score:k||null,team_second:g.bn||null,title:_,category:g.ca||null,stadium:S}),a.set(m,{gid:m,date:E||"",rawDate:x,tn:g.tn||"",bn:g.bn||"",tt:_||"",ca:g.ca||"",pa:S||"",ti:g.ti||"",bi:g.bi||"",sc:g.sc||"",cf:g.cf||"",cd:g.cd||"",pl:g.pl||"",te:g.te||"",fld:d.get(m)||[],cat:l.get(m)||[],updatedAt:Date.now()});const I=nt(g.pl,[]);Array.isArray(I)&&I.forEach(v=>{const w=parseInt(v.id??v.pid,10);isNaN(w)||w<=0||t.has(w)||t.set(w,{id:w,name:Qa(v),uniform_number:v.num!==void 0&&v.num!==null&&v.num!==""?String(v.num):null})})}),Array.isArray(e.player)&&e.player.forEach(g=>{const m=parseInt(g.pid??g._id,10);if(isNaN(m)||m<=0)return;const y=Qa(g),x=g.nu!==void 0&&g.nu!==null&&String(g.nu)!==""?String(g.nu):"";t.set(m,{id:m,name:y,uniform_number:x||null})});const f=(g,m,y)=>{if(isNaN(g)||g<=0||isNaN(m)||!Array.isArray(y)||y.length<22)return;const x=u.get(m),E=x?nt(x.cf,{}):null,k=x?Pn(x):"",_=x?Mr(qa(x,E)):"",S=t.get(g)||{name:"不明",uniform_number:null},I=y.length>=23?y[21]??0:y[20]??0,v=y.length>=23?y[22]??0:y[21]??0,w=[y[0]??0,y[1]??0,y[2]??0,y[3]??0,y[4]??0,y[5]??0,y[6]??0,y[7]??0,y[8]??0,y[9]??0,y[10]??0,y[11]??0,y[12]??0,y[13]??0,y[14]??0,y[15]??0,y[16]??0,y[17]??0,y[18]??0,y[19]??0,I,v];o.push([g,S.name,S.uniform_number||"",m,_,(x==null?void 0:x.tn)||"",k,(x==null?void 0:x.bn)||"",(x==null?void 0:x.tt)||(E==null?void 0:E.title)||"",(x==null?void 0:x.ca)||"",(x==null?void 0:x.pa)||(E==null?void 0:E.stadi)||"",...w]);const $=["plate_appearances","at_bats","runs","hits","doubles","triples","home_runs","total_bases","runs_batted_in","stolen_bases","caught_stealing","sacrifice_hits","sacrifice_flies","walks","hit_by_pitch","strike_outs","left_on_base","double_plays","scoring_position_at_bats","scoring_position_hits","go","fo"],A={player_id:g,game_id:m};$.forEach((P,R)=>{A[P]=parseInt(w[R],10)||0}),s.push(A)},p=(g,m,y)=>{if(isNaN(g)||g<=0||isNaN(m)||!Array.isArray(y)||y.length<24)return;const x=u.get(m),E=x?nt(x.cf,{}):null,k=x?Pn(x):"",_=x?Mr(qa(x,E)):"",S=t.get(g)||{name:"不明",uniform_number:null},I=parseInt(y[5],10)||0,v=parseInt(y[19],10)||0,w=Math.max(0,I-v),$=[y[0]??0,y[1]??0,y[2]??0,y[3]??0,y[21]??0,y[20]??0,y[4]??0,I,w,y[6]??0,y[7]??0,y[8]??0,y[9]??0,y[10]??0,y[11]??0,y[12]??0,y[13]??0,y[14]??0,y[15]??0,y[16]??0,y[17]??0,y[18]??0,y[22]??0,y[23]??0];i.push([g,S.name,S.uniform_number||"",m,_,(x==null?void 0:x.tn)||"",k,(x==null?void 0:x.bn)||"",(x==null?void 0:x.tt)||(E==null?void 0:E.title)||"",(x==null?void 0:x.ca)||"",(x==null?void 0:x.pa)||(E==null?void 0:E.stadi)||"",...$]);const A=["is_starter","wins","losses","saves","holds","qs","outs","pitch_count","strikes","batters_faced","at_bats","hits_allowed","home_runs_allowed","walks_allowed","hit_batters","strike_outs","runs_allowed","earned_runs","wild_pitches","balks","sacrifice_hits_allowed","sacrifice_flies_allowed","go","fo"],P={player_id:g,game_id:m};A.forEach((R,D)=>{P[R]=parseInt($[D],10)||0}),r.push(P)};Array.isArray(e.bat)&&e.bat.forEach(g=>{f(parseInt(g.pid,10),parseInt(g.gid,10),g.st)}),Array.isArray(e.pit)&&e.pit.forEach(g=>{p(parseInt(g.pid,10),parseInt(g.gid,10),g.st)}),s.length===0&&r.length===0&&Array.isArray(e.player)&&e.player.forEach(g=>{const m=parseInt(g.pid??g._id,10);if(isNaN(m)||m<=0||!g.st)return;const y=nt(g.st,null);y&&(Array.isArray(y.bat)&&y.bat.forEach(x=>f(m,parseInt(x.id??x.gid,10),x.st)),Array.isArray(y.pit)&&y.pit.forEach(x=>p(m,parseInt(x.id??x.gid,10),x.st)))});const b=new Set;return s.forEach(g=>b.add(g.player_id)),r.forEach(g=>b.add(g.player_id)),b.size===0&&t.forEach((g,m)=>b.add(m)),{players:Array.from(t.values()).filter(g=>b.has(g.id)),allPlayersMap:t,games:Array.from(n.values()),gameDetails:Array.from(a.values()),batterStats:s,pitcherStats:r,rawBRows:o,rawPRows:i,rawGamesById:u}}function Wi(e){var o;const t=(o=e.target.files)==null?void 0:o[0],n=document.getElementById("backup-extract-msg"),a=document.getElementById("backup-game-select"),s=document.getElementById("backup-game-extract-area");if(!t)return;const r=new FileReader;r.onload=i=>{try{const d=String(i.target.result||"").replace(/^\uFEFF/,""),l=JSON.parse(d);if(!(Array.isArray(l.game)?l.game.length>0:!!(l.game||l.cd&&l.cf)))throw new Error("Scorerのバックアップ／試合データ (gameデータを含むJSON) ではありません。");if(ft=l,Oe=go(l),a){const c=[...Oe.gameDetails].sort((f,p)=>String(p.date||"").localeCompare(String(f.date||""))||(p.gid||0)-(f.gid||0));a.innerHTML=c.map(f=>{const p=Pn(f);return`<option value="${f.gid}">${K(f.date||"日付不明")} | ${K(f.tn)} ${K(p)} ${K(f.bn)} (${K(f.tt||"試合")}) [ID:${f.gid}]</option>`}).join("")}s&&s.classList.toggle("hidden",Oe.gameDetails.length===0),n&&(n.textContent=`読み込み完了: 試合 ${Oe.games.length}件 / 詳細プレイログ ${Oe.gameDetails.filter(c=>c.cd).length}件 / 打者成績 ${Oe.batterStats.length}件 / 投手成績 ${Oe.pitcherStats.length}件`,n.className="mt-3 text-sm font-bold text-indigo-700",n.classList.remove("hidden"))}catch(d){ft=null,Oe=null,s==null||s.classList.add("hidden"),n&&(n.textContent=`読み込みエラー: ${d.message}`,n.className="mt-3 text-sm font-bold text-red-600",n.classList.remove("hidden"))}},r.readAsText(t)}async function tn(e,t,n,a=void 0){for(let s=0;s<t.length;s+=n){const r=t.slice(s,s+n),{error:o}=a?await B.from(e).upsert(r,a):await B.from(e).upsert(r);if(o)throw o}}function Ji(e){const t=String(e||"").match(/(\d+)\s*[-－〜~]\s*(\d+)/);return t?`${parseInt(t[1],10)}-${parseInt(t[2],10)}`:String(e||"").replace(/\s+/g,"").trim()}function ha(e){const t=It(e==null?void 0:e.date),n=((e==null?void 0:e.team_first)??(e==null?void 0:e.tn)??"").trim(),a=((e==null?void 0:e.team_second)??(e==null?void 0:e.bn)??"").trim(),s=Ji((e==null?void 0:e.score)||Pn(e));return{date:t,t1:n,t2:a,score:s,baseKey:t&&n&&a?`${t}__${n}__${a}`:""}}function bo(e){const t=new Map,n=Array.isArray(Rt)?Rt:[],a=new Map,s=new Set;let r=0;n.forEach(c=>{const f=Number(c.id);isNaN(f)||(a.set(f,c),s.add(f),f>r&&(r=f))}),e.forEach(c=>{const f=Number(c.id);isNaN(f)||(s.add(f),f>r&&(r=f))});const o=(c,f)=>{const p=ha(c),b=ha(f);return p.baseKey&&b.baseKey?p.baseKey!==b.baseKey?!1:!p.score||!b.score||p.score===b.score:!0},i=new Set;e.forEach(c=>{const f=Number(c.id);if(isNaN(f))return;const p=a.get(f);p&&o(p,c)&&(t.set(f,f),i.add(f))});const d=()=>{let c=Math.max(r+1,1);for(;s.has(c);)c++;return r=c,s.add(c),c};let l=0,u=0;return e.forEach(c=>{const f=Number(c.id);if(isNaN(f)||t.has(f))return;const p=ha(c);if(p.baseKey){const b=n.find(h=>{const g=Number(h.id);if(isNaN(g)||i.has(g))return!1;const m=ha(h);return m.baseKey!==p.baseKey?!1:!m.score||!p.score||m.score===p.score});if(b){const h=Number(b.id);t.set(f,h),i.add(h),l++;return}}a.has(f)&&(t.set(f,d()),u++)}),{idMap:t,remappedCount:l,collisionReassignedCount:u}}function ho(){const e=new Map;return(Rt||[]).forEach(t=>{const n=ha(t);if(!n.baseKey)return;const a=`${n.baseKey}__${n.score||"NOSCORE"}`;e.has(a)||e.set(a,[]),e.get(a).push(t)}),Array.from(e.values()).filter(t=>t.length>=2).map(t=>[...t].sort((n,a)=>Number(n.id)-Number(a.id))).sort((t,n)=>String(It(n[0].date)).localeCompare(String(It(t[0].date))))}function yo(){const e=document.getElementById("dup-games-status"),t=document.getElementById("btn-cleanup-dup-games");if(!e)return;const n=ho();if(n.length===0){e.className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 rounded p-2.5",e.textContent="✅ DB内に重複している試合はありません。",t==null||t.classList.add("hidden");return}const a=new Set((zt||[]).map(r=>Number(r.gid))),s=new Map;(Kt||[]).forEach(r=>s.set(Number(r.game_id),(s.get(Number(r.game_id))||0)+1)),e.className="text-xs bg-amber-50 border border-amber-200 rounded p-3 space-y-2 text-amber-950",e.innerHTML=`
        <div class="font-bold text-red-700">⚠️ 同じ日付・対戦カード・スコアの重複試合が ${n.length} 組見つかりました（「重複試合を1件に統合・整理する」で解消できます）：</div>
        <ul class="space-y-1 pl-4 list-disc">
            ${n.map(r=>{const o=r[0],i=r.map(d=>{const l=Number(d.id),u=s.get(l)||0,c=a.has(l)?"・詳細あり":"";return`ID:${l} (打者${u}件${c})`}).join(" / ");return`<li><span class="font-bold">${K(It(o.date)||o.date||"")}</span> | ${K(o.team_first||"")} ${K(o.score||"")} ${K(o.team_second||"")} → <span class="text-gray-700">${K(i)}</span></li>`}).join("")}
        </ul>
    `,t==null||t.classList.remove("hidden")}async function Yi(){const e=ho();if(e.length===0)return alert("現在、DB内に重複している試合はありません。");if(confirm(`重複している ${e.length} 組の試合データを1件ずつに統合し、余分な重複行をDBから削除します。よろしいですか？`)){W("重複試合データを1件に統合・整理中...");try{const t=new Map((zt||[]).map(i=>[Number(i.gid),i])),n=[],a=[],s=[],r=[],o=[];if(e.forEach(i=>{const d=g=>(Kt||[]).filter(m=>Number(m.game_id)===Number(g)).length,l=g=>(on||[]).filter(m=>Number(m.game_id)===Number(g)).length,u=[...i].sort((g,m)=>{const y=d(g.id)+l(g.id)>0?1:0,x=d(m.id)+l(m.id)>0?1:0;return y!==x?x-y:Number(g.id)-Number(m.id)}),c={...u[0]},f=Number(c.id),p=new Set((Kt||[]).filter(g=>Number(g.game_id)===f).map(g=>Number(g.player_id))),b=new Set((on||[]).filter(g=>Number(g.game_id)===f).map(g=>Number(g.player_id)));let h=t.get(f)||null;u.slice(1).forEach(g=>{const m=Number(g.id);o.push(m),!c.title&&g.title&&(c.title=g.title),!c.category&&g.category&&(c.category=g.category),!c.stadium&&g.stadium&&(c.stadium=g.stadium),!c.score&&g.score&&(c.score=g.score);const y=t.get(m);!h&&y&&(h={...y,gid:f},a.push({key:`SCORER_GAME_DETAIL_${f}`,data:h})),(Kt||[]).filter(x=>Number(x.game_id)===m).forEach(x=>{const E=Number(x.player_id);if(!p.has(E)){p.add(E);const k={...x,game_id:f};delete k.id,s.push(k)}}),(on||[]).filter(x=>Number(x.game_id)===m).forEach(x=>{const E=Number(x.player_id);if(!b.has(E)){b.add(E);const k={...x,game_id:f};delete k.id,r.push(k)}})}),n.push(c)}),n.length>0&&await tn("games",n,100),s.length>0&&await tn("batter_stats",s,200,{onConflict:"player_id, game_id"}),r.length>0&&await tn("pitcher_stats",r,200,{onConflict:"player_id, game_id"}),a.length>0&&await tn("master_data",a,15,{onConflict:"key"}),o.length>0){const{error:i}=await B.from("batter_stats").delete().in("game_id",o);if(i)throw i;const{error:d}=await B.from("pitcher_stats").delete().in("game_id",o);if(d)throw d;const{error:l}=await B.from("games").delete().in("id",o);if(l)throw l;const u=o.map(f=>`SCORER_GAME_DETAIL_${f}`),{error:c}=await B.from("master_data").delete().in("key",u);c&&console.warn("master_data cleanup warning:",c)}await le("CLEANUP_DUPLICATE_GAMES",`重複試合を整理: ${e.length}組統合 / 重複行 ${o.length}件削除`),await ka(),alert(`重複していた ${e.length} 組の試合を統合し、余分な ${o.length} 件を削除しました。`)}catch(t){console.error(t),alert(`重複試合の整理に失敗しました: ${t.message}`)}finally{V()}}}function Ki(){const e=document.getElementById("reset-db-counts");e&&(e.innerHTML=`現在の削除対象: <span class="font-bold">試合 ${Rt.length}件</span> / <span class="font-bold">打撃 ${Kt.length}件</span> / <span class="font-bold">投手 ${on.length}件</span> / <span class="font-bold">詳細分析 ${zt.length}件</span> / <span class="font-bold">選手 ${xt.length}名</span>`);const t=document.getElementById("confirm-reset-dashboard-db"),n=document.getElementById("btn-reset-dashboard-db");t&&(t.checked=!1),n&&(n.disabled=!0)}async function Qi(){const e=document.getElementById("confirm-reset-dashboard-db");if(!(e!=null&&e.checked)){alert("先に確認チェックボックスにチェックを入れてください。");return}const t=`試合 ${Rt.length}件 / 打撃 ${Kt.length}件 / 投手 ${on.length}件 / 詳細分析 ${zt.length}件 / 選手 ${xt.length}名`;if(!confirm(`本当にダッシュボードの成績データを全削除しますか？
対象: ${t}

※ この操作は元に戻せません。設定や他機能（出欠・配車等）は保持されます。`))return;const n=document.getElementById("reset-db-result-msg");W();try{const{error:s}=await B.from("batter_stats").delete().gte("game_id",-2147483648);if(s)throw s;const{error:r}=await B.from("pitcher_stats").delete().gte("game_id",-2147483648);if(r)throw r;const{error:o}=await B.from("games").delete().gte("id",-2147483648);if(o)throw o;const{error:i}=await B.from("players").delete().gte("id",-2147483648);if(i)throw i;const{error:d}=await B.from("master_data").delete().like("key","SCORER_GAME_DETAIL_%");if(d)throw d;if(Ot=[],await le("RESET_DASHBOARD_DATA",`成績データ全削除: ${t}`),await ka(),Rt.length+Kt.length+on.length+xt.length+zt.length>0){const u=`⚠️ 削除を実行しましたが一部データが残っています（試合 ${Rt.length}件 / 打撃 ${Kt.length}件 / 投手 ${on.length}件 / 詳細 ${zt.length}件 / 選手 ${xt.length}名）。Supabase の DELETE 権限 (RLSポリシー) をご確認ください。`;n&&(n.textContent=u,n.className="text-xs font-bold text-amber-700"),alert(u)}else n&&(n.textContent="✅ 全削除が完了しました。上の①または②からデータを再読み込みしてください。",n.className="text-xs font-bold text-emerald-700"),alert(`成績・選手・詳細分析データをすべて削除しました。
上の①（CSV）または②（scorer_data*.txt）から読み込み直してください。`)}catch(a){console.error(a),n&&(n.textContent=`❌ 削除に失敗しました: ${a.message}`,n.className="text-xs font-bold text-red-700"),alert(`成績データの全削除に失敗しました: ${a.message}`)}finally{V()}}async function Zi(){const e=document.getElementById("backup-extract-msg");if(!Oe)return alert("先に scorer_data*.txt または scorer_game*.txt を選択してください。");W("バックアップデータから成績・詳細分析データをDBへ一括インポート中...");try{const{players:t,games:n,gameDetails:a,batterStats:s,pitcherStats:r}=Oe,{idMap:o,remappedCount:i,collisionReassignedCount:d}=bo(n),l=new Map;n.forEach(x=>{const E=o.get(x.id)??x.id;l.set(E,{...x,id:E})});const u=Array.from(l.values()),c=x=>{const E=new Map;return x.forEach(k=>{const _=o.get(k.game_id)??k.game_id;E.set(`${k.player_id}_${_}`,{...k,game_id:_})}),Array.from(E.values())},f=c(s),p=c(r),b=new Map;a.forEach(x=>{const E=o.get(x.gid)??x.gid;b.set(E,{...x,gid:E})});const h=Array.from(b.values());t.length>0&&await tn("players",t,200),u.length>0&&await tn("games",u,100),f.length>0&&await tn("batter_stats",f,200,{onConflict:"player_id, game_id"}),p.length>0&&await tn("pitcher_stats",p,200,{onConflict:"player_id, game_id"});const g=h.map(x=>({key:`SCORER_GAME_DETAIL_${x.gid}`,data:x}));g.length>0&&await tn("master_data",g,15,{onConflict:"key"});const m=[];i>0&&m.push(`既存試合統合: ${i}件`),d>0&&m.push(`別試合ID衝突を新規採番で保護: ${d}件`);const y=m.length>0?` (${m.join(" / ")})`:"";await le("IMPORT_BACKUP",`Scorerデータ一括インポート: 試合=${u.length}件, 詳細ログ=${g.length}件, 打者=${f.length}件, 投手=${p.length}件${y}`),e&&(e.textContent=`DBインポート完了: 試合 ${u.length}件 / 詳細プレイ ${g.length}件 / 打者成績 ${f.length}件 / 投手成績 ${p.length}件を保存しました${y}（「詳細分析・文字起こし」タブから即座に参照できます）。`,e.className="mt-3 text-sm font-bold text-green-600",e.classList.remove("hidden")),Ot=[],await ka()}catch(t){console.error(t),e&&(e.textContent=`DBインポートエラー: ${t.message}`,e.className="mt-3 text-sm font-bold text-red-600",e.classList.remove("hidden"))}finally{V()}}function ms(e,t,n){const a=new Blob([e],{type:t}),s=document.createElement("a");s.href=URL.createObjectURL(a),s.download=n,s.click(),URL.revokeObjectURL(s.href)}function Pr(e){if(!Oe)return alert("先に scorer_data*.txt ファイルを選択してください。");const t=e==="batter"?Oe.rawBRows:Oe.rawPRows;if(t.length<=1)return alert("このファイルには該当する集計成績レコード（bat/pit配列）が含まれていません。");const n=e==="batter"?"scorer_stats_raw_b.csv":"scorer_stats_raw_p.csv",a="\uFEFF"+t.map(s=>s.map(r=>{const o=r==null?"":String(r);return o.includes(",")||o.includes('"')||o.includes(`
`)?`"${o.replace(/"/g,'""')}"`:o}).join(",")).join(`
`)+`
`;ms(a,"text/csv;charset=utf-8;",n)}function Xi(){var l;if(!ft||!Oe)return alert("先に scorer_data*.txt ファイルを選択してください。");const e=parseInt((l=document.getElementById("backup-game-select"))==null?void 0:l.value,10);if(isNaN(e))return alert("抽出する試合を選択してください。");const t=Oe.rawGamesById.get(e);if(!t)return alert("選択された試合データが見つかりません。");const n=nt(t.cf,{}),a=nt(t.te,[]),s=nt(t.pl,[]),r=new Set(a.map(u=>u.id).filter(Boolean)),o=new Set(s.map(u=>u.id).filter(Boolean)),i={kind:"GD",team:Array.isArray(ft.team)?ft.team.filter(u=>r.has(u.tid??u.id)):[],player:Array.isArray(ft.player)?ft.player.filter(u=>o.has(u.pid??u.id)):[],game:[t],bat:Array.isArray(ft.bat)?ft.bat.filter(u=>parseInt(u.gid,10)===e):[],pit:Array.isArray(ft.pit)?ft.pit.filter(u=>parseInt(u.gid,10)===e):[],fld:Array.isArray(ft.fld)?ft.fld.filter(u=>parseInt(u.gid,10)===e):[],cat:Array.isArray(ft.cat)?ft.cat.filter(u=>parseInt(u.gid,10)===e):[]},d=It(qa(t,n)).replace(/[^0-9]/g,"")||String(e);ms(JSON.stringify(i),"text/plain;charset=utf-8;",`scorer_game${d}.txt`)}function ed(){var o;if(!Oe)return alert("先にバックアップ／試合ファイルを選択してください。");const e=parseInt((o=document.getElementById("backup-game-select"))==null?void 0:o.value,10);if(isNaN(e))return alert("抽出する試合を選択してください。");const t=Oe.gameDetails.find(i=>i.gid===e);if(!t)return alert("選択された試合データが見つかりません。");const n=vo(t),a=confirm(`1球ごとの投球カウント（[1]ボール等）もテキストに含めますか？
（「キャンセル」を押すと打席結果・重要イベントのみのすっきりした戦績表を保存します）`),s=cr(n,a),r=(t.date||"").replace(/[^0-9]/g,"")||String(e);ms("\uFEFF"+s,"text/plain;charset=utf-8;",`戦績文字起こし_${r}_${t.tn}_vs_${t.bn}.txt`)}function td(){var t;if(!Oe||Oe.gameDetails.length===0)return alert("先にバックアップ／試合ファイルを選択してください。");const e=(t=document.getElementById("backup-game-select"))==null?void 0:t.value;Ot=Oe.gameDetails,lo("detail-analysis"),Rn(!0,e?String(e):"all")}function Rr(e){const t=[];return e&1&&t.push("1"),e&2&&t.push("2"),e&4&&t.push("3"),t.length?t.join("･")+"塁":""}function xo(e){const t=[];return e&1&&t.push("1"),e&2&&t.push("2"),e&4&&t.push("3"),t.length?`◆(${t.join(",")}塁)`:"◇"}function vo(e){var H,J,G,Q,q,Z,U,ae,re,me,ve,rt,pe,mt,Ue,Yt,Ut,St,kt,Et,X,fe,Ne,je,Lt,kn,Na;const t=nt(e==null?void 0:e.cf,{}),n=nt(e==null?void 0:e.te,[]),a=nt(e==null?void 0:e.pl,[]),s=nt(e==null?void 0:e.sc,[[[],[]],[[0,0,0,0],[0,0,0,0]]]),r=new Map;Array.isArray(a)&&a.forEach(O=>{const z=parseInt(O.id??O.pid,10);isNaN(z)||r.set(z,{id:z,name:Qa(O),num:String(O.num??O.nu??"")})});const o=O=>r.get(parseInt(O,10))||{id:parseInt(O,10),name:`選手${O}`,num:""},i=Array.isArray(t==null?void 0:t.gteams)?t.gteams:[],d=[[],[]];[0,1].forEach(O=>{const z=i[O];z&&Array.isArray(z.players)&&(d[O]=z.players.filter(we=>we.ord>=0).sort((we,he)=>we.ord-he.ord).map(we=>{const he=o(we.id);return{ord:we.ord,pos:we.pos,id:we.id,name:he.name,num:he.num}}))});const l=(e==null?void 0:e.tn)||((H=n[0])==null?void 0:H.disp)||((J=n[0])==null?void 0:J.name)||"先攻",u=(e==null?void 0:e.bn)||((G=n[1])==null?void 0:G.disp)||((Q=n[1])==null?void 0:Q.name)||"後攻",c=vt(l),f=vt(u),p=[0,0];let b=0,h=0,g=0,m=0,y=0,x=0,E={1:null,2:null,3:null},k=[0,0],_=!1,S="1回表";const I=[],v=[],w=[],$=()=>(E[1]?1:0)+(E[2]?2:0)+(E[3]?4:0),A=(O,z)=>d[O].find(we=>we&&String(we.pos)===String(z)),P=(O,z,we)=>{const he=d[O].findIndex(ot=>ot&&ot.ord===z);he>=0?d[O][he]=we:d[O].push(we)};function R(O,z,we=null){const he=[],ot=[];let Ge=we!=null?String(we):null;const Ln=/(J)(\d)([1-4a-g])|([OT])(\d)(\d)|(Th|Tb|Es|Ek|Ec|Ej|Eu)(\d+)|(Cb|Ch|Cf)/g;for(const it of O.matchAll(Ln))if(it[1]==="J"){const ke=parseInt(it[2],10),_e=it[3],ye=/[1-4]/.test(_e)?parseInt(_e,10):{a:1,b:2,c:3,d:4,e:2,f:3,g:4}[_e]||1,Tt=ke===0?z:E[ke],F=Tt?Tt.name:z.name,j=ke===0?`打者${F}`:`${ke}塁ランナー${F}`;ke>0&&ke!==ye&&(E[ke]=null),ye===4?(k[b]++,he.push(`${j}生還`)):ke!==ye&&(ye>=1&&ye<=3&&(E[ye]=Tt),he.push(`${j}${ye}塁へ`))}else if(it[4]==="O"||it[4]==="T"){const ke=it[4],_e=parseInt(it[5],10),ye=parseInt(it[6],10);if(y++,_e===0&&ye===0)he.push(ke==="T"?"タッチアウト":"アウト");else{const Tt=_e===0?z:E[_e],F=Tt?Tt.name:z.name,j=_e===0?`打者${F}`:`${_e}塁ランナー${F}`,te=ye===4?"本塁":ye>0?`${ye}塁`:"";he.push(`${j}${te}${ke==="T"?"タッチアウト":"アウト"}`),_e>0&&(E[_e]=null)}}else if(it[7]){const ke=it[7],ye=it[8].slice(-1),Tt=j=>j==="9"?"その他":tt[j]||"その他",F=Ge!=null&&Ge!=="9"?Ge:ye!=="9"?ye:null;ke==="Th"?(he.push(`${tt[ye]||""}に送球`),Ge=ye):ke==="Tb"?(he.push(`${tt[ye]||""}`),Ge=ye):ke==="Es"?(he.push(`${tt[ye]||""}に送球エラー`),ot.push({pos:F||void 0,posName:F?Tt(F):"送球エラー"})):ke==="Ek"||ke==="Ej"?(he.push(F&&tt[F]?`${tt[F]}エラー`:"エラー"),ot.push({pos:F||void 0,posName:F?Tt(F):"その他"})):ke==="Ec"?he.push(ye!=="9"&&tt[ye]?`${tt[ye]}送球(野選)`:"送球選択(野選)"):ke==="Eu"&&he.push("送球間の進塁")}return{msgs:he,errDetails:ot}}const D=String((e==null?void 0:e.cd)||"").split("=").filter(Boolean);for(const O of D){let z="",we="play",he=!1,ot=[];const Ge=1-b,Ln=b===0?l:u,it=b===0?c:f,ke=b===0?f:c,_e=d[b][p[b]]||{name:"",num:"",id:null};if(/^I([tb])(\d+)$/.test(O)){const F=O.match(/^I([tb])(\d+)$/);b=F[1]==="t"?0:1;const j=parseInt(F[2],10);h=(j-1)*2+b,S=`${j}回${b===0?"表":"ｳﾗ"}`,y=0,g=0,m=0,x=0,E={1:null,2:null,3:null},_=!1,z=`${S} `,we="inning_header"}else if(/^A([tb])(\d+)(?:Lb(\d+))?$/.test(O)){const F=O.match(/^A([tb])(\d+)(?:Lb(\d+))?$/),j=parseInt(F[2],10),te=F[1]==="t"?"表":"ｳﾗ",ee=F[3]?` ${Rr(parseInt(F[3],10))}ランナー残塁`:"";z=`${j}回${te}終了${ee} `,we="inning_end",_&&d[b].length>0&&(p[b]=(p[b]+1)%d[b].length,_=!1)}else if(O==="Ah")z="試合終了 ",we="game_end";else if(/^(Am|Ag|Ap|Odp|Sc|Sw|Qw|Qx)/.test(O))z="";else if(O==="Nb")d[b].length>0&&(p[b]=(p[b]+1)%d[b].length),g=0,m=0,x=0,_=!1;else if(O==="Na"){g=0,m=0,x=0,_=!1;const F=p[b]+1,j=d[b][p[b]];z=j?`${F}番${j.name}${j.num?"#"+j.num:""}`:`${F}番`,we="batter"}else if(/^Iz/.test(O)){const F=d[b].length||9;E[1]=d[b][(p[b]-1+F)%F],E[2]=d[b][(p[b]-2+F)%F],z="タイブレーク (1･2塁ランナー設定) "}else if(/^P([bslf])$/.test(O)||O==="Px"||O==="Pt")x++,he=!0,O==="Pb"?(g<4&&g++,z=`[${x}]ボール `):O==="Ps"?(m<3&&m++,z=`[${x}]空振りストライク `):O==="Pl"?(m<3&&m++,z=`[${x}]見逃しストライク `):O==="Pf"?(m<2&&m++,z=`[${x}]ファウル `):O==="Pt"?(m<3&&m++,z=`[${x}]ファウルチップ `):(m<3&&m++,z=`[${x}]バント/カット `);else if(O==="Ko")y++,_=!0,z=`[${Math.max(1,x)}]三振アウト `;else if(/^(Bb|Db|Dn|Dk)/.test(O)){const F=O.slice(0,2);F==="Db"&&x++,F!=="Dk"&&(_=!0);const j={Bb:"フォアボール",Db:`[${x}]デッドボール`,Dn:"打撃妨害",Dk:"ボーク"}[F],te=R(O.slice(2),_e,F==="Dn"?"1":null);ot=F==="Dn"?[{pos:"1",posName:tt[1]},...te.errDetails]:te.errDetails,z=[j,...te.msgs].join(" ")+" "}else if(/^E([wp])/.test(O)){const F=O[1]==="w"?"ワイルドピッチ":"パスボール",j=R(O.slice(2),_e,"1");ot=j.errDetails,z=[F,...j.msgs].join(" ")+" "}else if(O==="Kr")z="";else if(/^K([wpt])/.test(O)){_=!0;const F=O[1],j=F==="t"?"振り逃げ失敗":`振り逃げ (${F==="w"?"暴投":"捕逸"})`,te=R(O.slice(2),_e,"1");ot=te.errDetails,z=[j,...te.msgs].join(" ")+" "}else if(/^H([1-4])([a-z-])([a-z-])(\d)(.*)/.test(O)){const F=O.match(/^H([1-4])([a-z-])([a-z-])(\d)(.*)/);x++,_=!0;const j=parseInt(F[1],10),te=F[2],ee=F[3],ie=F[4],Me=F[5];let pt=["","ヒット","ツーベース","スリーベース","ホームラン"][j];j===1&&te==="b"&&ee==="i"?pt="バント内野安打":j===1&&te==="h"&&ee==="i"?pt="強襲ヒット":j===1&&te==="i"?pt="内野安打":j===4&&te==="r"&&(pt="ランニングホームラン");const Ir=R(Me,_e,ie);ot=Ir.errDetails,z=[`[${x}]${tt[ie]||""}${pt}`,...Ir.msgs].join(" ")+" "}else if(/^(Gob|Go|Fob|Fof|Fol|Fo)[-]*(\d)?\d?(.*)/.test(O)){const F=O.match(/^(Gob|Go|Fob|Fof|Fol|Fo)[-]*(\d)?\d?(.*)/);x++,_=!0;const j={Go:"ゴロ",Gob:"バントゴロ",Fo:"フライ",Fol:"ライナー",Fof:"ファウルフライ",Fob:"バントフライ"}[F[1]]||"アウト",te=R(F[3]||"",_e,F[2]);ot=te.errDetails,z=[`[${x}]${F[2]!==void 0&&tt[F[2]]||""}${j}`,...te.msgs].join(" ")+" "}else if(/^Rq(\d)(\d)/.test(O)){const F=O.match(/^Rq(\d)(\d)/);z=`${F[1]==="1"?"キャッチャー":"ピッチャー"}${{1:"1塁",2:"2塁",4:"3塁"}[F[2]]||"塁"}牽制 `,he=!0}else if(/^Ru(\d+)/.test(O))z=`${Rr(parseInt(O.slice(2),10))}ランナースタート `,he=!0;else if(/^(Rs|Rd|Rc|Rf|Rg|Rr|Rz)(.*)/.test(O)){const F=O.slice(0,2),j={Rs:"盗塁",Rd:"ダブルスチール",Rc:"守備無関心",Rf:"盗塁失敗",Rg:"牽制アウト",Rr:"走塁アウト",Rz:""}[F],te=(F==="Rr"||F==="Rg")&&/^[01]$/.test(O[2])?O[2]:"1",ee=R(O.slice(2),_e,te);ot=ee.errDetails,z=(j?[j,...ee.msgs]:ee.msgs).join(" ")+" "}else if(/^Sh([0-9a-z])#(\d+):/.test(O)){const[,F,j]=O.match(/^Sh([0-9a-z])#(\d+):/),te=parseInt(F,36),ee=o(j),ie=d[b].find(Me=>Me&&Me.ord===te);z=`${te+1}番${(ie==null?void 0:ie.name)||""}に代打${ee.name}${ee.num?"#"+ee.num:""}`,P(b,te,{...ie,ord:te,id:parseInt(j,10),name:ee.name,num:ee.num})}else if(/^Sha#(\d+):/.test(O)){const[,F]=O.match(/^Sha#(\d+):/),j=o(F),te=p[b],ee=d[b][te];z=`${te+1}番${(ee==null?void 0:ee.name)||""}に代打${j.name}${j.num?"#"+j.num:""}`,P(b,(ee==null?void 0:ee.ord)??te,{...ee,ord:(ee==null?void 0:ee.ord)??te,id:parseInt(F,10),name:j.name,num:j.num})}else if(/^Sr([0-9a-z])#(\d+):/.test(O)){const[,F,j]=O.match(/^Sr([0-9a-z])#(\d+):/),te=parseInt(F,36),ee=o(j),ie=d[b].find(pt=>pt&&pt.ord===te);let Me="";for(const pt of[1,2,3])((q=E[pt])==null?void 0:q.id)===(ie==null?void 0:ie.id)&&(Me=`${pt}塁ランナー`,E[pt]={id:parseInt(j,10),name:ee.name,num:ee.num});z=`${Me}${(ie==null?void 0:ie.name)||""}に代走${ee.name}${ee.num?"#"+ee.num:""}`,P(b,te,{...ie,ord:te,id:parseInt(j,10),name:ee.name,num:ee.num})}else if(/^S(ih|ir)(\d)#(\d+):/.test(O)){const[,F,j,te]=O.match(/^S(ih|ir)(\d)#(\d+):/),ee=o(te),ie=d[Ge].find(Me=>Me&&Me.id===parseInt(te,10));ie&&(ie.pos=parseInt(j,10)),z=`${F==="ih"?"代打":"代走"}${ee.name}が${tt[j]||""}へ`}else if(/^Sk(\d)(\d)#(\d+):/.test(O)){const[,F,j,te]=O.match(/^Sk(\d)(\d)#(\d+):/),ee=o(te),ie=d[Ge].find(Me=>Me&&Me.id===parseInt(te,10));ie&&(ie.pos=parseInt(j,10)),z=`${tt[F]||""}${ee.name}が${tt[j]||""}へ`}else if(/^Skh(\d)#(\d+):/.test(O)){const[,F,j]=O.match(/^Skh(\d)#(\d+):/),te=o(j),ee=d[Ge].find(ie=>ie&&ie.id===parseInt(j,10));ee&&(ee.pos=parseInt(F,10)),z=`${te.name}が${tt[F]||""}へ`}else if(/^Sd([0-9a-z])(\d)#(\d+):/.test(O)){const[,F,j,te]=O.match(/^Sd([0-9a-z])(\d)#(\d+):/),ee=parseInt(F,36),ie=o(te),Me=d[Ge].find(pt=>pt&&pt.ord===ee);z=`${ee+1}番${(Me==null?void 0:Me.name)||""}に代わり${ie.name}が${tt[j]||""}へ`,P(Ge,ee,{...Me,ord:ee,pos:parseInt(j,10),id:parseInt(te,10),name:ie.name,num:ie.num})}else if(/^Sda(\d)#(\d+):/.test(O)){const[,F,j]=O.match(/^Sda(\d)#(\d+):/),te=o(j),ee=10,ie=d[Ge].find(Me=>Me&&Me.ord===ee);z=`${ee+1}番${(ie==null?void 0:ie.name)||""}に代わり${te.name}が${tt[F]||""}へ`,P(Ge,ee,{...ie,ord:ee,pos:parseInt(F,10),id:parseInt(j,10),name:te.name,num:te.num})}else if(/^W/.test(O)){if(he=!0,O==="Wtf")z=`${Ln}：チーム初安打 `;else if(/^Wtc(\d+)/.test(O))z=`${Ln}：チーム${O.slice(3)}者連続安打 `;else if(/^Whm(\d+)/.test(O))z=`バッター${_e.name}：${O.slice(3)}安打 `;else if(/^Wh(\d+)/.test(O))z=`バッター${_e.name}：猛打賞 `;else if(/^Wkb(\d+)/.test(O))z=`バッター${_e.name}：三振${O.slice(3)}個目 `;else if(/^Wkc(\d+)/.test(O)){const F=A(Ge,"0");z=`ピッチャー${(F==null?void 0:F.name)||""}：${O.slice(3)}者連続三振 `}}ot.forEach(F=>{const j=F.pos!==void 0?A(Ge,F.pos):null;w.push({inning:S,posName:F.posName,fielderName:(j==null?void 0:j.name)||"",play:z.trim(),isHomeFielding:ke})});const ye=$();I.push({inn:h,ball:g,strk:m,out:y,rnr:ye,trun:k[0],brun:k[1],isHomeBatting:it,isHomeFielding:ke,currentBatterName:_e.name,codes:[{cd:O,pli:{sPlay:z}}]});const Tt=z.trim();Tt&&v.push({type:we,cd:O,inningLabel:S,half:b===0?"top":"bot",isHomeBatting:it,text:Tt,scoreTop:k[0],scoreBot:k[1],topTeam:l,botTeam:u,ball:g,strk:m,out:y,rnr:ye,basesText:xo(ye),isPitchOnly:he})}const M=Array.isArray((Z=s==null?void 0:s[0])==null?void 0:Z[0])?s[0][0]:[],C=Array.isArray((U=s==null?void 0:s[0])==null?void 0:U[1])?s[0][1]:[];let L=7;for(let O=Math.max(M.length,C.length)-1;O>=0;O--)if(M[O]!==void 0&&M[O]!==-1||C[O]!==void 0&&C[O]!==-1){L=Math.max(7,O+1);break}const T=O=>O==null||O===-1?"":O===300?"x":O>=200?`${O-200}x`:String(O);return{meta:{gid:e==null?void 0:e.gid,date:(e==null?void 0:e.date)||"",title:(e==null?void 0:e.tt)||(t==null?void 0:t.title)||"",stadium:(e==null?void 0:e.pa)||(t==null?void 0:t.stadi)||"",start:(t==null?void 0:t.start)||"",end:(t==null?void 0:t.end)||"",weather:(t==null?void 0:t.weath)||"",topTeam:l,botTeam:u,isHomeTop:c,isHomeBot:f,homeTid:c&&!f?((ae=n[0])==null?void 0:ae.id)??((re=i[0])==null?void 0:re.id)??null:f&&!c?((me=n[1])==null?void 0:me.id)??((ve=i[1])==null?void 0:ve.id)??null:null,ti:(e==null?void 0:e.ti)||"",bi:(e==null?void 0:e.bi)||"",maxInnings:L,topInnings:Array.from({length:L},(O,z)=>T(M[z])),botInnings:Array.from({length:L},(O,z)=>T(C[z])),topSum:{r:((pe=(rt=s==null?void 0:s[1])==null?void 0:rt[0])==null?void 0:pe[0])??k[0],h:((Ue=(mt=s==null?void 0:s[1])==null?void 0:mt[0])==null?void 0:Ue[1])??0,b:((Ut=(Yt=s==null?void 0:s[1])==null?void 0:Yt[0])==null?void 0:Ut[2])??0,e:((kt=(St=s==null?void 0:s[1])==null?void 0:St[0])==null?void 0:kt[3])??0},botSum:{r:((X=(Et=s==null?void 0:s[1])==null?void 0:Et[1])==null?void 0:X[0])??k[1],h:((Ne=(fe=s==null?void 0:s[1])==null?void 0:fe[1])==null?void 0:Ne[1])??0,b:((Lt=(je=s==null?void 0:s[1])==null?void 0:je[1])==null?void 0:Lt[2])??0,e:((Na=(kn=s==null?void 0:s[1])==null?void 0:kn[1])==null?void 0:Na[3])??0}},timeline:v,pcl:I,errorEvents:w,fld:(e==null?void 0:e.fld)||[],playerMap:r}}function cr(e,t=!1,n="all"){const{meta:a,timeline:s}=e,r=[];r.push("=================================================="),r.push(`試合戦績文字起こし: ${a.topTeam} vs ${a.botTeam}`),r.push(`日時: ${a.date||"不明"}${a.start?` (${a.start}〜${a.end||""})`:""} / 球場: ${a.stadium||"不明"} / 大会: ${a.title||"記録"}`),r.push("=================================================="),r.push("");const o=Array.from({length:a.maxInnings},(d,l)=>String(l+1));r.push(["チーム",...o,"R","H","B","E"].join(" | ")),r.push([a.topTeam,...a.topInnings.map(d=>d||"-"),a.topSum.r,a.topSum.h,a.topSum.b,a.topSum.e].join(" | ")),r.push([a.botTeam,...a.botInnings.map(d=>d||"-"),a.botSum.r,a.botSum.h,a.botSum.b,a.botSum.e].join(" | ")),a.ti&&r.push(a.ti),a.bi&&r.push(a.bi),r.push("");const i=(d,l)=>{const u=Math.max(0,Math.min(l,d||0));return"●".repeat(u)+"○".repeat(l-u)};return s.forEach(d=>{if(!(n!=="all"&&d.inningLabel!==n)&&!(!t&&d.isPitchOnly))if(d.type==="inning_header")r.push(`
--- ${d.text} ---`);else if(d.type==="batter")r.push(`■ ${d.text}`);else if(d.type==="inning_end"||d.type==="game_end")r.push(`  ▶ ${d.text} (${a.topTeam} ${d.scoreTop}-${d.scoreBot} ${a.botTeam})`);else{const l=t?`[B:${i(d.ball,4)} S:${i(d.strk,3)} O:${i(d.out,3)}]`:`[O:${i(d.out,3)}]`,u=`${a.topTeam} ${d.scoreTop}-${d.scoreBot} ${a.botTeam} ${l} ${d.basesText}`;r.push(`  ${d.text}`),r.push(`    ${u}`)}}),r.join(`
`)}function nd(){const e=Ot.length>0?Ot:zt;if(Ot.length>0)return e;const t=new Set((Rt||[]).map(s=>String(s.id))),n=new Set((Ft.games||[]).map(s=>String(s.id))),a=new Set((Ft.games||[]).map(s=>`${It(s.date)}_${(s.team_first||"").trim()}_${(s.team_second||"").trim()}`));return n.size===0&&Rt.length>0?[]:e.filter(s=>{if(Rt.length===0)return!0;const r=s.gid!==void 0&&s.gid!==null?String(s.gid):"";if(r&&t.has(r))return n.has(r);const o=`${It(s.date)}_${(s.tn||"").trim()}_${(s.bn||"").trim()}`;return a.has(o)})}function Rn(e=!0,t=null){const n=document.getElementById("detail-db-status-badge"),a=document.getElementById("btn-detail-exit-preview"),s=document.getElementById("detail-empty-notice"),r=document.getElementById("detail-scope-select"),o=document.getElementById("detail-games-quicklist"),i=document.getElementById("detail-jump-transcript-bar"),d=document.getElementById("detail-team-overview"),l=document.getElementById("detail-analysis-dashboard"),u=document.getElementById("detail-transcript-panel");if(!r)return;const c=nd(),f=Ot.length>0;if(n&&(n.textContent=f?`一時プレビュー表示中 (${c.length}試合)`:`DB保存詳細データ: 全${zt.length}試合（フィルタ一致: ${c.length}試合 / 集計対象: ${(Ft.games||[]).length}試合）`),a==null||a.classList.toggle("hidden",!f),c.length===0){s==null||s.classList.remove("hidden"),o==null||o.classList.add("hidden"),i==null||i.classList.add("hidden"),d==null||d.classList.add("hidden"),l==null||l.classList.add("hidden"),u==null||u.classList.add("hidden"),r.innerHTML='<option value="">表示できる詳細データがありません</option>';return}s==null||s.classList.add("hidden");const p=t||(e?r.value:"all")||"all",b=[`<option value="all">📊 フィルタ一致 全試合合算 (${c.length}試合) ※選手打撃・打球方向・エラー傾向</option>`,...c.map(y=>{const x=Pn(y);return`<option value="${y.gid}">📋 ${K(y.date||"日付不明")} | ${K(y.tn)} ${K(x)} ${K(y.bn)} (${K(y.tt||"試合")})</option>`})].join("");r.innerHTML=b,p==="all"||c.some(y=>String(y.gid)===String(p))?r.value=p:r.value="all";const h=r.value,m=(h==="all"?c:c.filter(y=>String(y.gid)===String(h))).map(y=>vo(y));h!=="all"&&m.length===1?(gn=m[0],Tn="all",ur(),u==null||u.classList.remove("hidden"),i==null||i.classList.remove("hidden"),o==null||o.classList.add("hidden")):(gn=null,u==null||u.classList.add("hidden"),i==null||i.classList.add("hidden"),o&&(o.innerHTML=`
                <div class="text-xs font-bold text-gray-700 mb-2">📝 試合ごとのスコアボード＆戦績文字起こしを見る（クリックで切り替え）:</div>
                <div class="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                    ${c.map(y=>{const x=Pn(y);return`<button type="button" data-quick-gid="${y.gid}" class="text-xs px-2.5 py-1 rounded-lg border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-indigo-900 font-semibold transition-colors">${K(y.date||"")} ${K(y.tn)} ${K(x)} ${K(y.bn)}</button>`}).join("")}
                </div>
            `,o.classList.remove("hidden"),o.querySelectorAll("button[data-quick-gid]").forEach(y=>{y.addEventListener("click",()=>{var x;Rn(!0,y.dataset.quickGid),(x=document.getElementById("detail-transcript-panel"))==null||x.scrollIntoView({behavior:"smooth",block:"start"})})}))),bt=wo(m),d==null||d.classList.remove("hidden"),l==null||l.classList.remove("hidden"),id(bt),Eo()}function ur(){const e=gn;if(!e)return;const{meta:t,timeline:n}=e;document.getElementById("detail-transcript-title").textContent=`📋 ${t.topTeam} ${t.topSum.r} - ${t.botSum.r} ${t.botTeam}`,document.getElementById("detail-transcript-meta").textContent=`${t.date||""}${t.start?` (${t.start}〜${t.end||""})`:""} | ${t.title||"記録"} | 球場: ${t.stadium||"不明"}${t.weather?` | 天候: ${t.weather}`:""}`;const a=document.getElementById("detail-scoreboard-table");if(a){const c=Array.from({length:t.maxInnings},(b,h)=>`<th class="p-1.5 border bg-gray-100 w-7">${h+1}</th>`).join(""),f=t.topInnings.map(b=>`<td class="p-1.5 border">${K(b)}</td>`).join(""),p=t.botInnings.map(b=>`<td class="p-1.5 border">${K(b)}</td>`).join("");a.innerHTML=`
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
                    <td class="p-1.5 border text-left ${t.isHomeTop?"text-purple-800 font-black":"text-green-800 font-bold"}">${K(t.topTeam)}</td>
                    ${f}
                    <td class="p-1.5 border font-black bg-gray-50">${t.topSum.r}</td>
                    <td class="p-1.5 border bg-gray-50">${t.topSum.h}</td>
                    <td class="p-1.5 border bg-gray-50">${t.topSum.b}</td>
                    <td class="p-1.5 border bg-gray-50">${t.topSum.e}</td>
                </tr>
                <tr class="${t.isHomeBot?"bg-purple-50/60 font-bold":"bg-white"}">
                    <td class="p-1.5 border text-left ${t.isHomeBot?"text-purple-800 font-black":"text-green-800 font-bold"}">${K(t.botTeam)}</td>
                    ${p}
                    <td class="p-1.5 border font-black bg-gray-50">${t.botSum.r}</td>
                    <td class="p-1.5 border bg-gray-50">${t.botSum.h}</td>
                    <td class="p-1.5 border bg-gray-50">${t.botSum.b}</td>
                    <td class="p-1.5 border bg-gray-50">${t.botSum.e}</td>
                </tr>
            </tbody>
        `}const s=document.getElementById("detail-battery-hr-info");if(s){const c=[];t.ti&&c.push(`<div>${K(t.ti)}</div>`),t.bi&&c.push(`<div>${K(t.bi)}</div>`),s.innerHTML=c.join(""),s.classList.toggle("hidden",c.length===0)}const r=document.getElementById("detail-transcript-half-tabs");if(r){const c=[];n.forEach(p=>{p.type==="inning_header"&&!c.includes(p.inningLabel)&&c.push(p.inningLabel)});const f=(p,b)=>{const h=Tn===p;return`<button type="button" data-half-filter="${K(p)}" class="px-2.5 py-1 rounded-full text-xs font-bold border transition-colors ${h?"bg-emerald-700 text-white border-emerald-700":"bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}">${K(b)}</button>`};r.innerHTML=f("all","試合全体")+c.map(p=>f(p,p)).join(""),r.querySelectorAll("button[data-half-filter]").forEach(p=>{p.addEventListener("click",()=>{Tn=p.dataset.halfFilter,ur()})})}const o=document.getElementById("detail-transcript-timeline");if(!o)return;const i=n.filter(c=>!(Tn!=="all"&&c.inningLabel!==Tn||!va&&c.isPitchOnly)),d=c=>{const f=c&1?"#f59e0b":"#ffffff",p=c&2?"#f59e0b":"#ffffff",b=c&4?"#f59e0b":"#ffffff";return`<svg viewBox="0 0 36 24" class="w-8 h-5 inline-block align-middle shrink-0" aria-label="${K(xo(c))}">
            <polygon points="18,2 23,7 18,12 13,7" fill="${p}" stroke="#9ca3af" stroke-width="1.2"/>
            <polygon points="25,9 30,14 25,19 20,14" fill="${f}" stroke="#9ca3af" stroke-width="1.2"/>
            <polygon points="11,9 16,14 11,19 6,14" fill="${b}" stroke="#9ca3af" stroke-width="1.2"/>
        </svg>`},l=(c,f,p,b,h)=>{const g=Math.max(0,Math.min(b,p||0)),m=Array.from({length:b},(y,x)=>`<span class="inline-block w-2.5 h-2.5 rounded-full border ${x<g?h:"bg-white border-gray-300"}"></span>`).join("");return`<span class="inline-flex items-center gap-0.5 shrink-0" data-count-type="${c}"><span class="inline-block w-2.5 text-center font-black text-[11px] leading-none mr-0.5 ${f}">${c}</span>${m}</span>`},u=c=>{if(!va)return`<span class="inline-flex items-center shrink-0" title="O:${c.out||0}">${l("O","text-red-600",c.out,3,"bg-red-500 border-red-600")}</span>`;const f=Math.max(0,Math.min(4,c.ball||0)),p=Math.max(0,Math.min(3,c.strk||0)),b=Math.max(0,Math.min(3,c.out||0));return`<span class="inline-flex items-center gap-x-2 shrink-0" title="B:${f} S:${p} O:${b}">${l("B","text-green-700",f,4,"bg-green-500 border-green-600")}${l("S","text-amber-600",p,3,"bg-amber-400 border-amber-500")}${l("O","text-red-600",b,3,"bg-red-500 border-red-600")}</span>`};o.innerHTML=i.map(c=>c.type==="inning_header"?`<div class="bg-amber-50 border border-amber-200 text-amber-950 font-black px-3 py-1.5 rounded text-sm mt-2">${K(c.text)}</div>`:c.type==="batter"?`<div class="bg-emerald-900 text-white font-bold px-3 py-1.5 rounded text-xs tracking-wide">${K(c.text)}</div>`:c.type==="inning_end"||c.type==="game_end"?`<div class="bg-gray-200 text-gray-800 font-bold px-3 py-1 rounded text-xs flex justify-between items-center">
                <span>${K(c.text)}</span>
                <span class="text-[11px] text-gray-600">${K(c.topTeam)} ${c.scoreTop}-${c.scoreBot} ${K(c.botTeam)}</span>
            </div>`:`<div class="border px-3 py-2 rounded shadow-2xs ${c.isPitchOnly?"bg-gray-50 border-gray-200 text-gray-600":"bg-white border-emerald-200 text-emerald-950"}">
            <div class="text-xs font-bold">${K(c.text)}</div>
            <div class="text-[11px] text-gray-600 mt-1 flex flex-wrap items-center justify-between gap-2">
                <span>${K(c.topTeam)} <strong class="text-gray-900">${c.scoreTop}-${c.scoreBot}</strong> ${K(c.botTeam)}</span>
                <span class="ml-auto flex flex-wrap items-center justify-end gap-2 shrink-0">${u(c)}<span class="inline-flex items-center gap-1 w-[104px] shrink-0" data-runner-slot="fixed">${d(c.rnr)}<span class="text-[10px] text-gray-500 whitespace-nowrap">${K(c.basesText)}</span></span></span>
            </div>
        </div>`).join("")}async function ad(){if(!gn)return;const e=cr(gn,va,Tn);try{await navigator.clipboard.writeText(e),alert("試合経過のテキストをクリップボードにコピーしました。")}catch{alert("クリップボードへのコピーに失敗しました。ダウンロードボタンをご利用ください。")}}function sd(){if(!gn)return;const{meta:e}=gn,t=cr(gn,va,Tn),n=(e.date||"").replace(/[^0-9]/g,"")||String(e.gid||"game");ms("\uFEFF"+t,"text/plain;charset=utf-8;",`戦績文字起こし_${n}_${e.topTeam}_vs_${e.botTeam}.txt`)}function rd(){const e=document.getElementById("detail-analysis-file");if(!e||!e.files||e.files.length===0)return alert("ファイルを選択してください。");const t=e.files[0],n=new FileReader;n.onload=function(a){var s;try{const r=String(a.target.result||"").replace(/^\uFEFF/,""),o=JSON.parse(r);if(Array.isArray(o.game)?o.game.length>0:!!(o.game||o.cd&&o.cf)){Ot=go(o).gameDetails,Rn(!1,Ot.length===1?String(Ot[0].gid):"all");return}const d=od(o);if(!d)return alert("詳細データのパースに失敗しました (game配列またはsysdata23が見つかりません)。");bt=d,(s=document.getElementById("detail-analysis-dashboard"))==null||s.classList.remove("hidden"),Eo()}catch(r){console.error(r),alert("JSONデータのパースに失敗しました。ファイル形式を確認してください。")}},n.readAsText(t)}function wo(e){const t={innings:{},batters:{},batterDisplayNames:{},steals:{},errors:{byInning:{},byPosition:{},byPlayer:{}},counts:{}},n=r=>{const o=String(r).match(/^(\d+回)/),i=o?o[1]:r;return t.innings[i]||(t.innings[i]={ourRuns:0,oppRuns:0,outs:{strikeout:0,groundout:0,flyout:0,other:0}}),t.innings[i]},a=r=>{const o=fn(r);return o?(t.batters[o]||(t.batterDisplayNames[o]=r,t.batters[o]={pa:0,ab:0,hits:0,strikeout:0,walk:0,groundout:0,flyout:0,otherout:0,rbi:0,chances:{pa:0,hits:0,rbi:0},directions:{left:0,center:0,right:0,inner:0,other:0},counts:{}}),t.batters[o]):null},s=r=>[2,3,4,5,6,7].includes(r);return e.forEach(r=>{var E,k;const{meta:o,pcl:i,errorEvents:d,fld:l,playerMap:u}=r,c=o.isHomeTop&&!o.isHomeBot||!o.isHomeTop&&o.isHomeBot;if(e.length>1){const _=(o.topTeam||"").trim(),S=(o.botTeam||"").trim();if(_==="ありんこ"||_==="アントス"||S==="ありんこ"||S==="アントス"||o.isHomeTop&&o.isHomeBot||(o.title||"").includes("紅白"))return}for(let _=0;_<o.maxInnings;_++){const S=o.topInnings[_],I=o.botInnings[_];if(!S&&!I)continue;const v=n(`${_+1}回`),w=S&&S!=="x"&&parseInt(S,10)||0,$=I&&I!=="x"&&parseInt(I,10)||0;o.isHomeTop?(v.ourRuns+=w,v.oppRuns+=$):o.isHomeBot?(v.ourRuns+=$,v.oppRuns+=w):v.ourRuns+=w+$}const f=new Map;let p=0;d.forEach(_=>{if(c&&!_.isHomeFielding)return;p++,t.errors.byInning[_.inning]=(t.errors.byInning[_.inning]||0)+1;const S=_.posName||"その他";if(t.errors.byPosition[S]=(t.errors.byPosition[S]||0)+1,_.fielderName){const I=fn(_.fielderName);f.set(I,(f.get(I)||0)+1),t.errors.byPlayer[I]||(t.errors.byPlayer[I]=[]),t.errors.byPlayer[I].push({inning:`${o.date?o.date+" ":""}${_.inning}`,play:`[${S}] ${_.play}`})}});const b=o.isHomeTop?((E=o.topSum)==null?void 0:E.e)||0:o.isHomeBot&&((k=o.botSum)==null?void 0:k.e)||0;if(Array.isArray(l)&&(p===0||b>0&&p<b)){const _=new Map;l.forEach(S=>{var P,R;if(o.homeTid!=null&&S.tid!=null&&String(S.tid)!==String(o.homeTid))return;const I=Array.isArray(S.st)&&parseInt(S.st[4],10)||0;if(I<=0)return;const v=((P=u.get(parseInt(S.pid,10)))==null?void 0:P.name)||((R=xt.find(D=>D.id==S.pid))==null?void 0:R.name);if(!v)return;const w=fn(v),$=fo[S.st[0]]||"守備";_.has(w)||_.set(w,{total:0,items:[]});const A=_.get(w);A.total+=I,A.items.push({posLabel:$,cnt:I})}),_.forEach((S,I)=>{let v=S.total-(f.get(I)||0);v<=0||(t.errors.byPlayer[I]||(t.errors.byPlayer[I]=[]),S.items.forEach(({posLabel:w,cnt:$})=>{const A=Math.min(v,$);for(let P=0;P<A;P++)t.errors.byPosition[w]=(t.errors.byPosition[w]||0)+1,t.errors.byInning.記録集計=(t.errors.byInning.記録集計||0)+1,t.errors.byPlayer[I].push({inning:o.date||"試合内",play:`記録失策 (${w})`});v-=A}))})}let h="1回表",g=null,m=null,y=0,x=0;i.forEach(_=>{const S=_.rnr,I=!c||_.isHomeBatting;(_.codes||[]).forEach(v=>{var D;const w=v.cd||"",$=(((D=v.pli)==null?void 0:D.sPlay)||"").trim();if(!$){y=_.ball,x=_.strk;return}const A=$.match(/^(\d+回(?:表|ｳﾗ|裏))/);A&&(h=A[1]);const P=$.match(/^\d+番(.+?)(?:#\d+)?$/);if(P){I?(g=P[1].trim(),m=a(g),m&&(m.pa++,s(S)&&m.chances.pa++)):(g=null,m=null),y=0,x=0;return}const R=$.match(/^\d+番.+?に代打(.+?)(?:#\d+)?$/);if(R&&I&&(g=R[1].trim(),m=a(g)),I&&(w.startsWith("Rs")||w.startsWith("Rf")||w.startsWith("Rd")||$.includes("盗塁"))){const M=$.match(/(?:ランナー|打者)([^0-9\s]+(?:\s[^0-9\s]+)?)(?:\d+塁|本塁|$)/);if(M){const C=fn(M[1]);C&&C!=="打者"&&(t.steals[C]||(t.steals[C]={attempts:0,success:0,fail:0}),t.steals[C].attempts++,$.includes("失敗")||$.includes("アウト")?t.steals[C].fail++:t.steals[C].success++)}}if(I&&m){const M=$.match(/生還/g);if(M&&!w.startsWith("Ew")&&!w.startsWith("Ep")&&!w.startsWith("Dk")&&!w.startsWith("Rs")&&(m.rbi+=M.length,s(S)&&(m.chances.rbi+=M.length)),/^(H[1-4]|Go|Gob|Fo|Fob|Fof|Fol|Ko|Bb|Db|K[wpt])/.test(w)){const T=`${Math.min(3,y)}-${Math.min(2,x)}`;t.counts[T]||(t.counts[T]={pa:0,hits:0}),t.counts[T].pa++,/^H[1-4]/.test(w)&&t.counts[T].hits++,m.counts[T]||(m.counts[T]={pa:0,hits:0}),m.counts[T].pa++,/^H[1-4]/.test(w)&&m.counts[T].hits++}const L=n(h);/^H[1-4]/.test(w)?(m.hits++,m.ab++,s(S)&&m.chances.hits++,$.includes("レフト")?m.directions.left++:$.includes("センター")?m.directions.center++:$.includes("ライト")?m.directions.right++:$.includes("内野")||/ピッチャー|キャッチャー|ファースト|セカンド|サード|ショート/.test($)?m.directions.inner++:m.directions.other++):/^(Bb|Db)/.test(w)?m.walk++:w==="Ko"||/^K[wpt]/.test(w)?(m.strikeout++,m.ab++,L.outs.strikeout++):/^Gob?/.test(w)?(w.includes("Cb")||m.ab++,m.groundout++,L.outs.groundout++,$.includes("サード")||$.includes("ショート")?m.directions.left++:$.includes("セカンド")||$.includes("ファースト")?m.directions.right++:m.directions.inner++):/^Fo/.test(w)&&(m.flyout++,w.includes("Cf")||m.ab++,L.outs.flyout++,$.includes("レフト")?m.directions.left++:$.includes("センター")?m.directions.center++:$.includes("ライト")?m.directions.right++:m.directions.inner++)}y=_.ball,x=_.strk})})}),t}function od(e){const t=e!=null&&e.sys?e.sys.find(a=>a.ke==="sysdata23"):null;if(!t||!t.va)return null;const n=nt(t.va,null);return!n||!Array.isArray(n.pcl)?null:wo([{meta:{date:"",isHomeTop:!1,isHomeBot:!1,maxInnings:0,topInnings:[],botInnings:[]},pcl:n.pcl,errorEvents:[],fld:[],playerMap:new Map}])}async function id(e){if(!e)return;await La();const t=Object.keys(e.innings).sort((o,i)=>(parseInt(o,10)||99)-(parseInt(i,10)||99)),n=t.map(o=>e.innings[o].ourRuns),a=t.map(o=>e.innings[o].oppRuns);Dt.innings&&Dt.innings.destroy();const s=document.getElementById("chart-detail-innings");s&&(Dt.innings=new window.Chart(s.getContext("2d"),{type:"bar",data:{labels:t,datasets:[{label:"自チーム得点",data:n,backgroundColor:"rgba(16, 185, 129, 0.75)"},{label:"失点",data:a,backgroundColor:"rgba(239, 68, 68, 0.75)"}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{y:{beginAtZero:!0,ticks:{stepSize:1}}}}}));const r=document.getElementById("detail-team-errors-summary");if(r){const o=Object.entries(e.errors.byPosition).sort((u,c)=>c[1]-u[1]),i=u=>{const c=String(u).match(/^(\d+)回(表|ｳﾗ|裏)?/);return c?parseInt(c[1],10)*10+(c[2]==="表"?0:1):9999},d=Object.entries(e.errors.byInning).sort((u,c)=>i(u[0])-i(c[0])||u[0].localeCompare(c[0])),l=o.reduce((u,[,c])=>u+c,0);o.length===0?r.innerHTML='<div class="text-gray-400 text-center py-6">対象試合で記録されたエラーはありません</div>':r.innerHTML=`
                <div class="flex items-center justify-between text-[11px] font-bold text-yellow-900 bg-yellow-100/70 border border-yellow-200 rounded px-2.5 py-1 mb-2">
                    <span>総記録エラー数</span>
                    <span class="text-sm font-black">${l} 件</span>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                    ${o.map(([u,c])=>`
                        <div class="bg-yellow-50 border border-yellow-200 rounded p-2 text-center">
                            <div class="text-[11px] font-bold text-yellow-800">${K(u)}</div>
                            <div class="text-lg font-black text-yellow-700">${c} 件</div>
                        </div>
                    `).join("")}
                </div>
                <div class="text-[11px] text-gray-600 border-t pt-2">
                    <strong>発生イニング別:</strong> ${d.map(([u,c])=>`${K(u)}(${c})`).join(" / ")}
                </div>
            `}}function Eo(){if(!bt)return;const e=document.getElementById("detail-player-select");if(!e)return;const t=xt.map(o=>fn(o.name)),n=Object.keys(bt.batters),a=n.filter(o=>t.length===0?!0:t.some(i=>i&&(o.includes(i)||i.includes(o)))),s=(a.length>0?a:n).sort((o,i)=>(bt.batterDisplayNames[o]||o).localeCompare(bt.batterDisplayNames[i]||i));if(s.length===0){e.innerHTML='<option value="">該当する選手がいません</option>';return}const r=e.value;e.innerHTML=s.map(o=>`<option value="${K(o)}">${K(bt.batterDisplayNames[o]||o)}</option>`).join(""),r&&s.includes(r)&&(e.value=r),e.onchange=function(o){Or(o.target.value)},Or(e.value||s[0])}async function Or(e){if(!bt||!e)return;await La();const t=fn(e),n=bt.batters[t]||bt.batters[e]||{pa:0,ab:0,hits:0,strikeout:0,walk:0,groundout:0,flyout:0,otherout:0,rbi:0,chances:{pa:0,hits:0},directions:{left:0,center:0,right:0,inner:0,other:0},counts:{}};document.getElementById("stat-p-hits").textContent=n.hits,document.getElementById("stat-p-strikeouts").textContent=n.strikeout,document.getElementById("stat-p-groundouts").textContent=n.groundout,document.getElementById("stat-p-flyouts").textContent=n.flyout,document.getElementById("stat-p-walks").textContent=n.walk||0,document.getElementById("stat-p-others").textContent=n.otherout;const a=n.ab||Math.max(0,n.pa-(n.walk||0)),s=a>0?n.hits/a:0;document.getElementById("stat-p-avg").textContent=s.toFixed(3).replace(/^0/,""),Dt.playerBattingResult&&Dt.playerBattingResult.destroy();const r=document.getElementById("chart-detail-player-batting-result").getContext("2d");Dt.playerBattingResult=new window.Chart(r,{type:"doughnut",data:{labels:["安打","三振","ゴロ","フライ","四死球","他"],datasets:[{data:[n.hits,n.strikeout,n.groundout,n.flyout,n.walk||0,n.otherout],backgroundColor:["#10B981","#EF4444","#FBBF24","#3B82F6","#6366F1","#9CA3AF"]}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}}}}),Dt.playerDirection&&Dt.playerDirection.destroy();const o=[n.directions.left,n.directions.center,n.directions.right,n.directions.inner,n.directions.other],i=document.getElementById("chart-detail-player-direction").getContext("2d");Dt.playerDirection=new window.Chart(i,{type:"doughnut",data:{labels:["レフト方向","センター方向","ライト方向","内野・投捕","その他"],datasets:[{data:o,backgroundColor:["#EC4899","#3B82F6","#14B8A6","#F59E0B","#8B5CF6"]}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",labels:{boxWidth:10,font:{size:10}}}}}});const d=n.chances.pa,l=n.chances.hits,u=d>0?l/d:0;document.getElementById("stat-p-chance-avg").textContent=u.toFixed(3).replace(/^0/,""),document.getElementById("stat-p-chance-detail").textContent=`${d}打席 ${l}安打`,document.getElementById("stat-p-rbi").textContent=n.rbi;let c=bt.steals[t]||{attempts:0,success:0};if(c.attempts===0){const E=Object.keys(bt.steals).find(k=>t.includes(k)||k.includes(t));E&&(c=bt.steals[E])}const f=c.attempts>0?c.success/c.attempts*100:0;document.getElementById("stat-p-steal-rate").textContent=f.toFixed(1)+"%",document.getElementById("stat-p-steal-detail").textContent=`成功 ${c.success} / 企図 ${c.attempts}`;const p=bt.errors.byPlayer[t]||[];document.getElementById("stat-p-errors-count").textContent=`${p.length} 件`;const b=document.getElementById("stat-p-errors-detail");b&&(p.length===0?b.innerHTML='<div class="text-gray-400 text-center py-2">対象期間・試合でエラーの記録はありません</div>':b.innerHTML=p.map(E=>`
                <div class="border-b pb-1 last:border-0 mb-1">
                    <span class="font-bold text-blue-600 bg-blue-50 px-1 rounded">${K(E.inning)}</span>
                    <span class="text-gray-700">${K(E.play)}</span>
                </div>
            `).join(""));const h=n.counts||{},g=["0-0","1-0","2-0","3-0","0-1","1-1","2-1","3-1","0-2","1-2","2-2","3-2"],m=g.map(E=>h[E]?h[E].pa:0),y=g.map(E=>h[E]?h[E].hits:0);Dt.playerCount&&Dt.playerCount.destroy();const x=document.getElementById("chart-detail-player-count").getContext("2d");Dt.playerCount=new window.Chart(x,{type:"bar",data:{labels:g.map(E=>E+" count"),datasets:[{label:"打席数",data:m,backgroundColor:"rgba(99, 102, 241, 0.6)"},{label:"安打数",data:y,backgroundColor:"rgba(16, 185, 129, 0.8)"}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{y:{beginAtZero:!0,ticks:{stepSize:1}}}}})}const dd="https://arcdgbzqfengqyvfbodt.supabase.co",ld="sb_publishable_Ei6ti5lKjAECmi36haftpw_DQsKMp4p";let We=null;try{!window.supabaseClient&&window.supabase&&window.supabase.createClient&&(window.supabaseClient=window.supabase.createClient(dd,ld)),We=window.supabaseClient}catch(e){console.error("Supabase Client initialize error:",e)}let Re=[],qe="team_default",Ht=[],Je=[],Fe=[],ut="",Ua=null;function Vn(){return Re.find(e=>e.id===qe)||Re[0]||{id:"team_default",name:"ありんこアントス (A軍)"}}function zn(){return Je.filter(e=>(e.teamId||"team_default")===qe)}function cd(){if(!Ua){const e=Vn();Ua={id:"",name:"新規配置データ",teamId:qe,mode:ue,basePositions:{},customSubstitutions:[],battingOrder:{},playerSnapshots:{},headerInfo:{date:"",tournament:"",teamHome:e.name||"ありんこアントス",teamVisitor:"",manager:"",captain:"",scorer:"",stadium:"",time:""}}}return Ua}function Be(){return Fe.find(e=>e.id===ut)||cd()}let He=null,Te=null,ue=9;const an={p:"投手",c:"捕手","1b":"一塁手","2b":"二塁手","3b":"三塁手",ss:"遊撃手",lf:"左翼手",cf:"中堅手",rf:"右翼手",dh:"指名打者"},Xn={p:"1",c:"2","1b":"3","2b":"4","3b":"5",ss:"6",lf:"7",cf:"8",rf:"9",dh:"DH"},ud={1:"p",2:"c",3:"1b",4:"2b",5:"3b",6:"ss",7:"lf",8:"cf",9:"rf",10:"dh",d:"dh",dh:"dh",DH:"dh"},Wt=["p","c","1b","2b","3b","ss","lf","cf","rf"],Jt=["p","c","1b","2b","3b","ss","lf","cf","rf","dh"];async function ja(){try{if(Qd(),await pd(),En(),fs(),ua(),Fe.length>0){ut=Fe[0].id;const e=document.getElementById("sim-pattern-select");e&&(e.value=ut);const t=Be();t&&(ue=t.mode||9,t.teamId&&Re.some(n=>n.id===t.teamId)&&(qe=t.teamId,En()))}_n(),Xa("setup"),Ye(),xe()}catch(e){console.error("Fatal initialization error:",e),alert(`アプリケーションの初期化中にエラーが発生しました。
詳細: `+e.message)}}function md(e){return e&&(e.basePositions||(e.basePositions={}),e.customSubstitutions||(e.customSubstitutions=[]),e.battingOrder||(e.battingOrder={}),e.headerInfo||(e.headerInfo={}),e.teamId||(e.teamId=e.headerInfo.teamId||"team_default"),e.mode===void 0&&(e.mode=9),e.playerSnapshots||(e.playerSnapshots=e.headerInfo.playerSnapshots||{}),e)}function ps(e,t=!1){const n=e&&!t&&e.playerSnapshots?{...e.playerSnapshots}:{},a=new Set;return e&&(e.basePositions&&Object.values(e.basePositions).forEach(r=>r&&a.add(r)),e.battingOrder&&Object.values(e.battingOrder).forEach(r=>r&&a.add(r)),e.customSubstitutions&&e.customSubstitutions.forEach(r=>{var o,i;r.type==="sub"&&((o=r.details)!=null&&o.outPlayerId&&a.add(r.details.outPlayerId),(i=r.details)!=null&&i.inPlayerId&&a.add(r.details.inPlayerId))})),zn().forEach(r=>a.add(r.id)),a.forEach(r=>{if(t||!n[r]){const o=Je.find(i=>i.id===r);o&&(n[r]={id:o.id,name:o.name,number:o.number||""})}}),n}function Bt(e,t=null){if(!e)return null;const n=t||Be();if(n&&n.playerSnapshots&&n.playerSnapshots[e])return n.playerSnapshots[e];const a=Je.find(s=>s.id===e);return a||{id:e,name:"未配置選手",number:""}}async function pd(){let e=!1;if(We)try{const{data:t,error:n}=await We.from("sim_players").select("*").order("created_at",{ascending:!0}),{data:a,error:s}=await We.from("sim_patterns").select("*").order("created_at",{ascending:!1}),{data:r}=await We.from("master_data").select("data").eq("key","SIM_TEAMS").single(),{data:o}=await We.from("master_data").select("data").eq("key","SIM_TEMPLATES").single(),{data:i}=await We.from("master_data").select("data").eq("key","SIM_PLAYERS_MAP").single();if(r&&Array.isArray(r.data)&&r.data.length>0?Re=r.data:Re=[{id:"team_default",name:"ありんこアントス (A軍)"},{id:"team_b",name:"ありんこアントス (B軍・ジュニア)"}],qe=Re[0].id,o&&Array.isArray(o.data)?Ht=o.data:Ht=[],!n&&!s&&t&&a){const d=i&&typeof i.data=="object"?i.data:{};Je=t.map(l=>({id:l.id,name:l.name,number:l.number||"",teamId:l.team_id||d[l.id]||"team_default"})),Fe=a.map(l=>{var u,c;return md({id:l.id,name:l.name,teamId:((u=l.header_info)==null?void 0:u.teamId)||"team_default",mode:l.has_dh?10:9,basePositions:l.base_positions||{},customSubstitutions:l.custom_substitutions||[],battingOrder:l.batting_order||{},playerSnapshots:((c=l.header_info)==null?void 0:c.playerSnapshots)||{},headerInfo:l.header_info||{},created_at:l.created_at,updated_at:l.updated_at,isSynced:!0})}),Fe.sort((l,u)=>{const c=new Date(l.updated_at||l.created_at||(l.id.startsWith("pat_")?parseInt(l.id.replace("pat_","")):0)).getTime()||0;return(new Date(u.updated_at||u.created_at||(u.id.startsWith("pat_")?parseInt(u.id.replace("pat_","")):0)).getTime()||0)-c}),e=!0}else n&&console.error("Supabase load players error:",n),s&&console.error("Supabase load patterns error:",s)}catch(t){console.error("Supabase load failed:",t)}e||(Re=[{id:"team_default",name:"ありんこアントス (A軍)"},{id:"team_b",name:"ありんこアントス (B軍・ジュニア)"}],qe=Re[0].id,Ht=[],Je=[{id:"p1",name:"とあ",number:"2",teamId:"team_default"},{id:"p2",name:"そうま",number:"10",teamId:"team_default"},{id:"p3",name:"あきと",number:"3",teamId:"team_default"},{id:"p4",name:"ゆうき",number:"4",teamId:"team_default"},{id:"p5",name:"あいのすけ",number:"1",teamId:"team_default"},{id:"p6",name:"けんせい",number:"6",teamId:"team_default"},{id:"p7",name:"りゅうと",number:"7",teamId:"team_default"},{id:"p8",name:"ながまさ",number:"8",teamId:"team_default"},{id:"p9",name:"そうすけ",number:"9",teamId:"team_default"},{id:"p10",name:"たいち",number:"5",teamId:"team_default"}],Fe=[])}async function mr(){if(!We)return null;try{const e=await We.from("master_data").upsert({key:"SIM_TEAMS",data:Re});return e?e.error:null}catch(e){return console.error("Supabase teams sync error:",e),e}}async function _o(){if(!We)return null;try{const e=await We.from("master_data").upsert({key:"SIM_TEMPLATES",data:Ht});return e?e.error:null}catch(e){return console.error("Supabase templates sync error:",e),e}}async function fd(){if(!We)return null;try{const e={};Je.forEach(t=>{e[t.id]=t.teamId||"team_default"}),await We.from("master_data").upsert({key:"SIM_PLAYERS_MAP",data:e})}catch(e){console.error("Supabase players map sync error:",e)}}async function Ba(e,t=!1){if(!We)return null;try{let n;return t?n=await We.from("sim_players").delete().eq("id",e.id):n=await We.from("sim_players").upsert({id:e.id,name:e.name,number:e.number}),await fd(),n?n.error:null}catch(n){return console.error("Supabase player sync error:",n),n}}async function Za(e,t=!1){if(!We)return null;try{let n;if(t)n=await We.from("sim_patterns").delete().eq("id",e.id);else{const a=ps(e);e.playerSnapshots=a;const s={...e.headerInfo||{},teamId:e.teamId||qe,playerSnapshots:a};n=await We.from("sim_patterns").upsert({id:e.id,name:e.name,has_dh:e.mode===10,base_positions:e.basePositions,custom_substitutions:e.customSubstitutions,batting_order:e.battingOrder||{},header_info:s,updated_at:new Date().toISOString()})}return n?n.error:null}catch(n){return console.error("Supabase pattern sync error:",n),n}}async function st(e){e&&(await Za(e),ua())}function En(){const e=document.getElementById("sim-team-select"),t=document.getElementById("new-sim-team"),n=document.getElementById("sim-current-team-label"),a=Vn();n&&(n.textContent=`[${a.name}]`),e&&(e.innerHTML="",Re.forEach(s=>{const r=document.createElement("option");r.value=s.id,r.textContent=s.name,e.appendChild(r)}),e.value=qe),t&&(t.innerHTML="",Re.forEach(s=>{const r=document.createElement("option");r.value=s.id,r.textContent=s.name,t.appendChild(r)}),t.value=qe)}function fs(){const e=document.getElementById("sim-template-select-inline"),t=document.getElementById("new-sim-template");e&&(e.innerHTML='<option value="">(選択して適用)</option>',Ht.forEach(n=>{const a=document.createElement("option");a.value=n.id,a.textContent=n.name,e.appendChild(a)})),t&&(t.innerHTML='<option value="">(未配置から開始)</option>',Ht.forEach(n=>{const a=document.createElement("option");a.value=n.id,a.textContent=n.name,t.appendChild(a)}))}async function gd(e="",t=null,n=null,a=null){const s="pat_"+Date.now(),r=t||qe,o=Re.find(f=>f.id===r)||Vn();let i={},d={},l=a!==null?a:ue;if(n){const f=Ht.find(p=>p.id===n);f&&(i=JSON.parse(JSON.stringify(f.basePositions||{})),d=JSON.parse(JSON.stringify(f.battingOrder||{})),l=f.mode||l)}ue=l,qe=r;const u={id:s,name:e||"新規データ",teamId:r,mode:ue,basePositions:i,customSubstitutions:[],battingOrder:d,playerSnapshots:ps({basePositions:i,battingOrder:d}),headerInfo:{date:"",tournament:"",teamHome:o.name||"ありんこアントス",teamVisitor:"",manager:"",captain:"",scorer:"",stadium:"",time:""}};Fe.unshift(u),ut=s,await st(u),En(),_n(),ua();const c=document.getElementById("sim-pattern-select");c&&(c.value=s)}function ua(){const e=document.getElementById("sim-pattern-select");e&&(e.innerHTML='<option value="">選択してください...</option>',Fe.forEach(t=>{const n=document.createElement("option");n.value=t.id;const a=t.isSynced===!1?" (未同期)":"",s=Re.find(o=>o.id===t.teamId),r=s?`[${s.name}] `:"";n.textContent=r+t.name+a,e.appendChild(n)}),ut&&(e.value=ut))}function _n(){const e=document.getElementById("btn-sim-mode-9"),t=document.getElementById("btn-sim-mode-10");ue===9?(e.className="px-3 py-1.5 text-xs font-bold bg-amber-600 text-white transition",t.className="px-3 py-1.5 text-xs font-bold bg-white text-gray-700 border-l hover:bg-gray-50 transition"):(e.className="px-3 py-1.5 text-xs font-bold bg-white text-gray-700 transition",t.className="px-3 py-1.5 text-xs font-bold bg-amber-600 text-white border-l hover:bg-gray-50 transition")}function Aa(e){const t={...e.basePositions||{}},n=ue===9?Wt:Jt;return Object.keys(t).forEach(s=>{n.includes(s)||delete t[s]}),(e.customSubstitutions||[]).filter(s=>s.active).forEach(s=>{if(s.type==="swap"){const{pos1:r,pos2:o}=s.details;if(n.includes(r)&&n.includes(o)){const i=t[r];t[r]=t[o],t[o]=i}}else if(s.type==="sub"){const{outPlayerId:r,inPlayerId:o,pos:i}=s.details;if(r){const d=Object.keys(t).find(l=>t[l]===r);d&&(t[d]=o)}else i&&n.includes(i)&&(t[i]=o)}else if(s.type==="rotation"){const o=s.details.positions.filter(i=>n.includes(i));if(o.length>1){const i=o.map(d=>t[d]);for(let d=0;d<o.length;d++){const l=i[(d-1+o.length)%o.length];t[o[d]]=l}}}}),t}function Ta(e){const t=new Set;return(e.customSubstitutions||[]).filter(a=>a.active).forEach(a=>{a.type==="sub"&&a.details.outPlayerId&&t.add(a.details.outPlayerId)}),t}function ra(e){e.battingOrder||(e.battingOrder={});const t=ue===9?Wt:Jt,n=e.basePositions||{},a=new Set;t.forEach(i=>{n[i]&&a.add(n[i])}),Object.keys(e.battingOrder).forEach(i=>{const d=e.battingOrder[i];a.has(d)||delete e.battingOrder[i]});const s=new Set(Object.values(e.battingOrder)),r=[];a.forEach(i=>{s.has(i)||r.push(i)});const o=t.length;for(let i=1;i<=o&&r.length!==0;i++)if(!e.battingOrder[i]){const d=r.shift();e.battingOrder[i]=d}}function xe(){const e=Be();if(!e)return;const t=Aa(e),n=Ta(e),a=new Set(Object.values(t).filter(Boolean));ra(e),bd(a,n),hd(a,n),yd(t,e),xd(e),vd(e),wd(e)}function bd(e,t){const n=document.getElementById("sim-players-list"),a=document.getElementById("sim-player-count");if(!n)return;n.innerHTML="";const s=zn();if(a&&(a.textContent=`${s.length} 人`),s.length===0){n.innerHTML='<span class="text-xs text-gray-400 p-2">このチームに登録されている選手がいません。</span>';return}s.forEach(r=>{const o=e.has(r.id),i=t.has(r.id),d=He===r.id&&Te==="players-list",l=document.createElement("div");l.className=`sim-player-badge ${o?"assigned":""} ${i?"retired":""} ${d?"selected":""}`,l.setAttribute("data-player-id",r.id),!o&&!i&&(l.setAttribute("draggable","true"),l.addEventListener("dragstart",$o));const u=r.number?`#${r.number} `:"";l.innerHTML=`
            <span>${u}${Ae(r.name)}${i?" (交代済)":""}</span>
            <span class="sim-player-edit-btn" data-player-id="${r.id}" title="選手名・背番号を編集">✏️</span>
            <span class="sim-player-delete-btn" data-player-id="${r.id}" title="削除">×</span>
        `,l.addEventListener("click",c=>{if(c.target.classList.contains("sim-player-edit-btn")){c.stopPropagation(),Fd(r.id);return}if(c.target.classList.contains("sim-player-delete-btn")){c.stopPropagation(),qd(r.id);return}o||i||So(r.id,"players-list")}),n.appendChild(l)})}function hd(e,t){const n=document.getElementById("sim-bench-list");if(!n)return;n.innerHTML="";const s=zn().filter(r=>!e.has(r.id)&&!t.has(r.id));if(s.length===0){n.innerHTML='<span class="text-xs text-gray-400 p-1">控え選手はいません。</span>';return}s.forEach(r=>{const o=He===r.id&&Te==="bench",i=document.createElement("div");i.className=`sim-player-badge sim-bench-badge ${o?"selected":""}`,i.setAttribute("data-player-id",r.id),i.setAttribute("draggable","true");const d=r.number?`#${r.number} `:"";i.innerHTML=`<span>${d}${Ae(r.name)}</span>`,i.addEventListener("dragstart",$o),i.addEventListener("click",()=>{So(r.id,"bench")}),n.appendChild(i)})}function yd(e,t){const n=document.getElementById("sim-field-positions");if(!n)return;n.innerHTML="",(ue===9?Wt:Jt).forEach(s=>{const r=e[s],o=Bt(r,t),i=(t.basePositions||{})[s]!==r&&r,d=He&&Te===s,l=document.createElement("div");l.className=`sim-pos-slot pos-${s} ${d?"swap-selected":""}`,l.setAttribute("data-position",s),l.addEventListener("dragover",Id),l.addEventListener("dragleave",Sd),l.addEventListener("drop",kd),l.addEventListener("click",()=>{Ld(s)});const u=o&&o.number?`#${o.number} `:"";l.innerHTML=`
            <div class="sim-pos-title">${an[s]}</div>
            <div class="sim-pos-player ${i?"player-changed":""}">
                ${o?u+Ae(o.name):'<span class="text-gray-300 text-xs font-normal">未配置</span>'}
            </div>
        `,n.appendChild(l)})}function xd(e){const t=document.getElementById("sim-batting-order-list");if(!t)return;t.innerHTML="";const n=ue===9?Wt:Jt,a=n.length,s=e.basePositions||{},r={};n.forEach(o=>{const i=s[o];i&&(r[i]=o)});for(let o=1;o<=a;o++){const i=e.battingOrder[o],d=i?Bt(i,e):null,l=d?r[d.id]:null,u=l?an[l]:"未配置",c=document.createElement("div");d?c.className="flex items-center justify-between bg-amber-50/50 border border-amber-100 rounded-lg p-2 text-xs transition-colors duration-150":c.className="flex items-center justify-between bg-gray-50/50 border border-dashed border-gray-200 rounded-lg p-2 text-xs text-gray-400 transition-colors duration-150";const f=document.createElement("div");f.className="flex items-center gap-1 shrink-0";const p=document.createElement("button");p.className="px-2 py-1 bg-amber-100 hover:bg-amber-200 disabled:opacity-30 disabled:cursor-not-allowed text-amber-900 font-bold rounded text-[10px] leading-none transition shadow-sm",p.textContent="▲",o===1&&(p.disabled=!0),p.addEventListener("click",()=>Fr(o,"up"));const b=document.createElement("button");b.className="px-2 py-1 bg-amber-100 hover:bg-amber-200 disabled:opacity-30 disabled:cursor-not-allowed text-amber-900 font-bold rounded text-[10px] leading-none transition shadow-sm",b.textContent="▼",o===a&&(b.disabled=!0),b.addEventListener("click",()=>Fr(o,"down")),f.appendChild(p),f.appendChild(b);let h="";if(d){const g=d.number?`#${d.number} `:"";h=`
                <div class="flex items-center gap-2">
                    <span class="bg-amber-600 text-white font-bold rounded-full w-5 h-5 flex items-center justify-center text-[10px]">${o}</span>
                    <span class="font-bold text-gray-800">${g}${Ae(d.name)}</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">${u}</span>
                </div>
            `}else h=`
                <div class="flex items-center gap-2">
                    <span class="bg-gray-400 text-white font-bold rounded-full w-5 h-5 flex items-center justify-center text-[10px]">${o}</span>
                    <span class="italic text-gray-400">（未設定）</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-[10px] bg-gray-100 text-gray-400 font-bold px-1.5 py-0.5 rounded">${u}</span>
                </div>
            `;c.innerHTML=h,c.appendChild(f),t.appendChild(c)}}async function Fr(e,t){const n=Be();if(!n)return;n.battingOrder||(n.battingOrder={});const a=t==="up"?e-1:e+1,r=(ue===9?Wt:Jt).length;if(a<1||a>r)return;const o=n.battingOrder[e],i=n.battingOrder[a];o&&i?(n.battingOrder[e]=i,n.battingOrder[a]=o):o?(n.battingOrder[a]=o,delete n.battingOrder[e]):i&&(n.battingOrder[e]=i,delete n.battingOrder[a]),await st(n),xe()}function pr(e,t,n,a=null){if(!e)return{code:"",desc:"",fullDesc:""};const s=a||Be();if(e.type==="sub"){const{outPlayerId:r,inPlayerId:o}=e.details,i=Bt(r,s),d=Bt(o,s),l=i?i.name:"不明",u=d?d.name:"不明",c=Object.keys(t).find(m=>t[m]===r),f=c&&Xn[c]||"",p=c?an[c]||"":"選手",b=f?`交代 (${f})`:"交代",h=n?`<span class="font-bold text-amber-900">${Ae(l)}</span>に代わって<span class="font-bold text-amber-900">${Ae(u)}</span>`:`${l}に代わって${u}`,g=`${p}の${l}に代わりまして、${u}が入ります。`;return{code:b,desc:h,fullDesc:g}}else if(e.type==="rotation"){const r=e.details.positions||[],i=r.map(c=>Xn[c]||c).join("-"),d=[];for(let c=0;c<r.length-1;c++){const f=r[c],p=r[c+1],b=t[f],h=Bt(b,s);if(h){const g=n?`<span class="font-bold text-amber-900">${Ae(h.name)}</span>`:h.name;d.push(`${g}が${an[p]}`)}}const l=d.join("、"),u=l?`${l}へ。`:"ポジション交代";return{code:i,desc:l,fullDesc:u}}else if(e.type==="swap"){const{pos1:r,pos2:o}=e.details,i=t[r],d=t[o],l=Bt(i,s),u=Bt(d,s),c=Xn[r]||r,f=Xn[o]||o,p=an[r]||"",b=an[o]||"",h=l?l.name:"未配置",g=u?u.name:"未配置",m=`${c}⇔${f}`,y=n?`<span class="font-bold text-amber-900">${Ae(h)}</span>と<span class="font-bold text-amber-900">${Ae(g)}</span>の入れ替え`:`${h}と${g}の入れ替え`,x=`${p}の${h}と${b}の${g}が入れ替わります。`;return{code:m,desc:y,fullDesc:x}}return{code:"",desc:"",fullDesc:""}}function vd(e){const t=document.getElementById("sim-sub-rules-list");if(!t)return;t.innerHTML="";const n=e.customSubstitutions||[];if(n.length===0){t.innerHTML='<p class="text-xs text-gray-400 text-center py-4">登録された交代はありません。</p>';return}const a=ue===9?Wt:Jt;let s={...e.basePositions||{}};n.forEach(r=>{const o=pr(r,s,!0);if(r.active){if(r.type==="swap"){const{pos1:l,pos2:u}=r.details;if(a.includes(l)&&a.includes(u)){const c=s[l];s[l]=s[u],s[u]=c}}else if(r.type==="sub"){const{outPlayerId:l,inPlayerId:u,pos:c}=r.details;if(l){const f=Object.keys(s).find(p=>s[p]===l);f&&(s[f]=u)}else c&&a.includes(c)&&(s[c]=u)}else if(r.type==="rotation"){const u=r.details.positions.filter(c=>a.includes(c));if(u.length>1){const c=u.map(f=>s[f]);for(let f=0;f<u.length;f++){const p=c[(f-1+u.length)%u.length];s[u[f]]=p}}}}const i=document.createElement("div");i.className=`sub-rule-card ${r.active?"active":""}`;const d=r.name?`<span class="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded leading-none inline-block mb-1 border border-amber-200/50">${Ae(r.name)}</span>`:"";i.innerHTML=`
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
        `,i.querySelector('input[type="checkbox"]').addEventListener("change",l=>{Ed(r.id,l.target.checked)}),i.querySelector(".btn-delete-rule").addEventListener("click",()=>{$d(r.id)}),t.appendChild(i)})}function wd(e){const t=document.getElementById("sim-announcement-logs");if(!t)return;t.innerHTML="";const n=(e.customSubstitutions||[]).filter(r=>r.active);if(n.length===0){t.innerHTML='<p class="text-xs text-gray-400 text-center py-2">適用中の交代はありません（基本配置のままです）。</p>';return}const a=ue===9?Wt:Jt;let s={...e.basePositions||{}};n.forEach(r=>{const o=pr(r,s,!1);if(r.type==="swap"){const{pos1:l,pos2:u}=r.details;if(a.includes(l)&&a.includes(u)){const c=s[l];s[l]=s[u],s[u]=c}}else if(r.type==="sub"){const{outPlayerId:l,inPlayerId:u,pos:c}=r.details;if(l){const f=Object.keys(s).find(p=>s[p]===l);f&&(s[f]=u)}else c&&a.includes(c)&&(s[c]=u)}else if(r.type==="rotation"){const u=r.details.positions.filter(c=>a.includes(c));if(u.length>1){const c=u.map(f=>s[f]);for(let f=0;f<u.length;f++){const p=c[(f-1+u.length)%u.length];s[u[f]]=p}}}const i=r.name?`【${Ae(r.name)}】`:"",d=document.createElement("div");d.className="announcement-item",d.innerHTML=`
            <span class="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0">${o.code}</span>
            <span class="text-xs font-semibold truncate text-amber-900">${i}${o.fullDesc}</span>
        `,t.appendChild(d)})}function Ye(){const e=Be();if(!e)return;const t=ue===9?Wt:Jt,n=document.getElementById("sub-player-out"),a=document.getElementById("sub-player-in"),s=Aa(e),r=new Set(Object.values(s).filter(Boolean)),o=Ta(e);if(n&&(n.innerHTML="",t.forEach(d=>{var u;const l=s[d];if(l){const c=((u=Bt(l,e))==null?void 0:u.name)||"未配置",f=document.createElement("option");f.value=l,f.textContent=`${c} (${an[d]})`,n.appendChild(f)}})),a){a.innerHTML="";const l=zn().filter(u=>!r.has(u.id)&&!o.has(u.id));l.length===0?a.innerHTML='<option value="">控え選手なし</option>':l.forEach(u=>{const c=document.createElement("option");c.value=u.id,c.textContent=u.name,a.appendChild(c)})}const i=document.getElementById("rot-input-text");i&&(i.value="")}async function Ed(e,t){const n=Be();if(!n)return;const a=n.customSubstitutions.find(s=>s.id===e);a&&(a.active=t,await st(n),Ye(),xe())}async function _d(){const e=Be();if(!e)return;const t=document.getElementById("rule-type-select"),n=t?t.value:"rotation";let a={};if(n==="sub"){const d=document.getElementById("sub-player-out").value,l=document.getElementById("sub-player-in").value;if(!d){alert("退く選手を選択してください。");return}if(!l){alert("入る控え選手を選択してください。");return}a={outPlayerId:d,inPlayerId:l}}else if(n==="rotation"){const d=document.getElementById("rot-input-text"),l=d?d.value.trim():"";if(!l){alert("交代ルートを入力してください（例: 1-3-1）。");return}if(!/^[0-9a-zA-Z]+(-[0-9a-zA-Z]+)*$/.test(l)){alert("入力形式が正しくありません。半角数字・英字とハイフンで入力してください（例: 1-3-1）。");return}const u=l.split("-").filter(Boolean);if(u.length<2){alert("交代には最低2つのポジションが必要です（例: 1-3）。");return}const c=ue===9?Wt:Jt,f=[];for(const p of u){const b=ud[p];if(!b){alert(`無効なポジション番号「${p}」が含まれています。1〜9またはDHを指定してください。`);return}if(!c.includes(b)){alert(`ポジション「${p}」(${an[b]||b})は、現在の守備モード（DH${ue===10?"あり":"なし"}）では使用できません。`);return}f.push(b)}for(let p=0;p<f.length-1;p++)if(f[p]===f[p+1]){alert("隣り合うポジションに同じものを指定することはできません（例: 1-1-3 は不可）。");return}a={positions:f}}const s=document.getElementById("rule-name-input"),r=s?s.value.trim():"",o={id:"rule_"+Date.now(),name:r,type:n,active:!1,details:a};e.customSubstitutions||(e.customSubstitutions=[]),e.customSubstitutions.push(o),await st(e),s&&(s.value="");const i=document.getElementById("rot-input-text");i&&(i.value=""),Ye(),xe(),Xa("subrules")}async function $d(e){const t=Be();t&&(t.customSubstitutions=t.customSubstitutions.filter(n=>n.id!==e),await st(t),Ye(),xe())}function Xa(e){const t=document.getElementById("tab-btn-setup"),n=document.getElementById("tab-btn-subrules"),a=document.getElementById("panel-setup"),s=document.getElementById("panel-subrules");e==="setup"?(t.className="flex-1 py-2 px-3 text-center text-sm font-bold bg-amber-600 text-white transition",n.className="flex-1 py-2 px-3 text-center text-sm font-bold bg-white text-gray-700 border-l hover:bg-gray-50 transition",a.classList.remove("hidden"),s.classList.add("hidden")):(t.className="flex-1 py-2 px-3 text-center text-sm font-bold bg-white text-gray-700 transition",n.className="flex-1 py-2 px-3 text-center text-sm font-bold bg-amber-600 text-white border-l hover:bg-gray-50 transition font-bold",a.classList.add("hidden"),s.classList.remove("hidden"))}function $o(e){const t=e.currentTarget.getAttribute("data-player-id");e.dataTransfer.setData("text/plain",t);let n="bench";e.currentTarget.parentNode.id==="sim-players-list"&&(n="players-list"),e.dataTransfer.setData("source-pos",n)}function Id(e){e.preventDefault(),e.currentTarget.classList.add("drag-over")}function Sd(e){e.currentTarget.classList.remove("drag-over")}function kd(e){e.preventDefault(),e.currentTarget.classList.remove("drag-over");const t=e.dataTransfer.getData("text/plain"),n=e.currentTarget.getAttribute("data-position");!t||!n||Io(t,n)}async function Io(e,t){const n=Be();if(!n)return;n.basePositions||(n.basePositions={});let a=null;Object.keys(n.basePositions).forEach(r=>{n.basePositions[r]===e&&(a=r)});const s=n.basePositions[t];a&&(n.basePositions[a]=s),n.basePositions[t]=e,ra(n),await st(n),He=null,Te=null,Ye(),xe()}function So(e,t){He===e&&Te===t?(He=null,Te=null):(He=e,Te=t),xe()}async function Ld(e){const t=Be();if(!t)return;t.basePositions||(t.basePositions={});const n=t.basePositions[e];if(He)if(Te!=="players-list"&&Te!=="bench"){const a=t.basePositions[Te];t.basePositions[Te]=n,t.basePositions[e]=a,ra(t),await st(t),He=null,Te=null,Ye(),xe()}else Io(He,e);else n&&(He=n,Te=e,xe())}async function Bd(e){const t=Be();t&&(t.basePositions||(t.basePositions={}),t.basePositions[e]=null,ra(t),await st(t),He=null,Te=null,Ye(),xe())}async function Ad(){const e=prompt(`新しいチーム名を入力してください:
(例: ありんこアントス (B軍), ジュニア選抜など)`);if(!e||!e.trim())return;const t=e.trim();if(Re.some(a=>a.name===t)){alert("同じ名前のチームが既に存在します。");return}const n={id:"team_"+Date.now(),name:t};Re.push(n),qe=n.id,await mr(),En(),xe()}async function Td(){const e=Vn(),t=prompt("チーム名を変更してください:",e.name);if(!t||!t.trim())return;const n=t.trim();if(n!==e.name){if(Re.some(a=>a.id!==e.id&&a.name===n)){alert("同じ名前のチームが既に存在します。");return}e.name=n,await mr(),En(),ua(),xe()}}async function Dd(){if(Re.length<=1){alert("登録チームが1つのみのため、削除できません。");return}const e=Vn(),t=zn();let n=`チーム「${e.name}」を削除しますか？`;if(t.length>0&&(n+=`
※このチームに登録されている ${t.length} 名の選手データも削除されます。`),!confirm(n))return;const a=new Set(t.map(s=>s.id));Je=Je.filter(s=>!a.has(s.id));for(const s of t)await Ba(s,!0);Re=Re.filter(s=>s.id!==e.id),qe=Re[0].id,await mr(),En(),xe()}function Cd(e){qe=e.target.value;const t=document.getElementById("sim-current-team-label"),n=Vn();t&&(t.textContent=`[${n.name}]`),He=null,Te=null,Ye(),xe()}async function Nd(){const e=Be();if(!e)return;const t=e.name?`${e.name}の基本形`:"基本配置パターン",n=prompt(`初期パターン（テンプレート）の登録名を入力してください:
(例: A軍 守備基本形、10人制DH基本配置など)`,t);if(!n||!n.trim())return;const a=n.trim(),s={id:"tmpl_"+Date.now(),name:a,mode:ue,basePositions:JSON.parse(JSON.stringify(e.basePositions||{})),battingOrder:JSON.parse(JSON.stringify(e.battingOrder||{}))};Ht.push(s),await _o(),fs(),alert(`初期パターン「${a}」を登録しました。
新規作成時や初期パターンセレクタからいつでも適用できます。`)}async function Md(e){if(!e)return;const t=Ht.find(s=>s.id===e);if(!t)return;if(!confirm(`初期パターン「${t.name}」を現在のグラウンドに適用しますか？
（現在のスタメン配置・打順が上書きされます）`)){const s=document.getElementById("sim-template-select-inline");s&&(s.value="");return}const n=Be();n&&(n.basePositions=JSON.parse(JSON.stringify(t.basePositions||{})),n.battingOrder=JSON.parse(JSON.stringify(t.battingOrder||{})),t.mode&&(n.mode=t.mode,ue=t.mode,_n()),await st(n));const a=document.getElementById("sim-template-select-inline");a&&(a.value=""),Ye(),xe()}async function Pd(){const e=document.getElementById("sim-template-select-inline"),t=e?e.value:"";if(!t){alert("削除したい初期パターンを選択してください。");return}const n=Ht.find(a=>a.id===t);n&&confirm(`初期パターン「${n.name}」を削除しますか？`)&&(Ht=Ht.filter(a=>a.id!==t),await _o(),fs(),alert(`初期パターン「${n.name}」を削除しました。`))}function Rd(){const e=document.getElementById("sim-new-modal");if(!e)return;En(),fs();const t=document.getElementById("new-sim-name");if(t){const r=new Date,o=`${r.getFullYear()}/${String(r.getMonth()+1).padStart(2,"0")}/${String(r.getDate()).padStart(2,"0")}`;t.value=`${o} 練習試合`}const n=document.getElementById("new-sim-team");n&&(n.value=qe);const a=document.getElementById("new-sim-template");a&&(a.value="");const s=document.querySelector(`input[name="new-sim-dh-mode"][value="${ue}"]`);s&&(s.checked=!0),e.classList.remove("hidden")}function qs(){const e=document.getElementById("sim-new-modal");e&&e.classList.add("hidden")}async function Od(){const e=document.getElementById("new-sim-name"),t=document.getElementById("new-sim-team"),n=document.getElementById("new-sim-template"),a=document.querySelector('input[name="new-sim-dh-mode"]:checked'),s=e?e.value.trim():"",r=t?t.value:qe,o=n?n.value:null,i=a?parseInt(a.value,10):9;if(!s){alert("シミュレーションデータ名を入力してください。");return}await gd(s,r,o,i),qs(),Ye(),xe()}async function Ls(){const e=document.getElementById("sim-new-player-input"),t=document.getElementById("sim-new-player-number");if(!e)return;const n=e.value.trim(),a=t?t.value.trim():"";if(!n)return;if(zn().some(o=>o.name===n)){alert("このチームには同じフルネームの選手が既に登録されています。");return}const r={id:"p_"+Date.now()+"_"+Math.random().toString(36).substr(2,5),name:n,number:a,teamId:qe};Je.push(r),await Ba(r),e.value="",t&&(t.value=""),Ye(),xe()}function Fd(e){const t=Je.find(o=>o.id===e);if(!t)return;const n=document.getElementById("sim-edit-player-modal"),a=document.getElementById("edit-player-id"),s=document.getElementById("edit-player-name"),r=document.getElementById("edit-player-number");a&&(a.value=t.id),s&&(s.value=t.name),r&&(r.value=t.number||""),n&&n.classList.remove("hidden"),s&&(s.focus(),s.select())}function Us(){const e=document.getElementById("sim-edit-player-modal");e&&e.classList.add("hidden")}async function Bs(){const e=document.getElementById("edit-player-id"),t=document.getElementById("edit-player-name"),n=document.getElementById("edit-player-number"),a=e?e.value:"",s=t?t.value.trim():"",r=n?n.value.trim():"";if(!a)return;if(!s){alert("選手フルネームを入力してください。");return}const o=Je.find(d=>d.id===a);if(!o)return;if(zn().some(d=>d.id!==a&&d.name===s)){alert("このチームには同じフルネームの別の選手が既に登録されています。");return}o.name=s,o.number=r,await Ba(o),Us(),Ye(),xe()}async function Hd(){const e=Be();if(!e){alert("配置データが選択されていません。");return}e.playerSnapshots=ps(e,!0),e.headerInfo||(e.headerInfo={}),e.headerInfo.playerSnapshots=e.playerSnapshots,await st(e),Ye(),xe(),alert(`配置データ「${e.name||"現在のデータ"}」の選手情報（氏名・背番号）をマスターの最新データで上書き更新しました。`)}async function qd(e){const t=Je.find(n=>n.id===e);if(t&&confirm(`選手「${t.name}」を削除しますか？
（データベースの全データ配置・交代設定からも削除されます）`)){Je=Je.filter(n=>n.id!==e),await Ba(t,!0);for(const n of Fe){let a=!1;if(n.basePositions||(n.basePositions={}),Object.keys(n.basePositions).forEach(s=>{n.basePositions[s]===e&&(n.basePositions[s]=null,a=!0)}),n.battingOrder&&Object.keys(n.battingOrder).forEach(s=>{n.battingOrder[s]===e&&(delete n.battingOrder[s],a=!0)}),n.customSubstitutions){const s=n.customSubstitutions.length;n.customSubstitutions=n.customSubstitutions.filter(r=>r.type==="sub"?r.details.outPlayerId!==e&&r.details.inPlayerId!==e:!0),n.customSubstitutions.length!==s&&(a=!0)}a&&await st(n)}He===e&&(He=null,Te=null),Ye(),xe()}}async function Ud(){const e=document.getElementById("sim-pattern-select");if(!e)return;const t=e.value;let n=!1,a=null,s="";const r=Be();if(t){const o=e.options[e.selectedIndex];confirm(`現在「${o.text}」が選択されています。
このデータに上書き保存しますか？
（「キャンセル」を選ぶと新規保存になります）`)&&(n=!0,s=o.text,a=t)}if(!n){const o=r?r.name:"新規配置データ",i=prompt("保存名を入力してください：",o);if(!i)return;if(s=i.trim(),!s){alert("有効な保存名を入力してください。");return}}try{if(n&&a){if(r){r.name=s,r.teamId=qe,r.mode=ue,r.updated_at=new Date().toISOString();const i=await Za(r);if(i)throw i;const d=Fe.findIndex(l=>l.id===r.id);d>0&&(Fe.splice(d,1),Fe.unshift(r)),alert(`データ「${s}」を上書き保存しました。`)}}else{const i="pat_"+Date.now(),d=Vn(),l=new Date().toISOString(),u={id:i,name:s,teamId:qe,mode:ue,created_at:l,updated_at:l,basePositions:r?{...r.basePositions||{}}:{},customSubstitutions:r?JSON.parse(JSON.stringify(r.customSubstitutions||[])):[],battingOrder:r?{...r.battingOrder||{}}:{},playerSnapshots:r&&r.playerSnapshots?{...r.playerSnapshots}:ps(r),headerInfo:r?JSON.parse(JSON.stringify(r.headerInfo||{})):{date:"",tournament:"",teamHome:d.name||"ありんこアントス",teamVisitor:"",manager:"",captain:"",scorer:"",stadium:"",time:""}};Fe.unshift(u),ut=i;const c=await Za(u);if(c)throw c;alert(`データ「${s}」を保存しました。`)}ua();const o=document.getElementById("sim-pattern-select");o&&(o.value=ut),xe()}catch(o){console.error("Save pattern error:",o),alert(`保存に失敗しました。
エラー詳細: ${o.message||o}`)}}async function jd(){const e=Be();if(!e||!e.id){alert("削除する配置データが選択されていません。");return}if(!confirm(`配置データ「${e.name}」を削除しますか？
（データベースから削除されます）`))return;Fe=Fe.filter(n=>n.id!==ut);const t=await Za(e,!0);Fe.length>0?ut=Fe[0].id:ut="",ua(),alert(t?`データ「${e.name}」のデータベースからの削除に失敗しました。
エラー詳細: ${t.message||t}`:`データ「${e.name}」を削除しました。`),He=null,Te=null,_n(),Ye(),xe()}async function Gd(e){const t=e.target.value;if(!t)ut="",Ua=null,He=null,Te=null,xe();else{ut=t;const n=Be();n&&(ue=n.mode||9,n.teamId&&Re.some(a=>a.id===n.teamId)&&(qe=n.teamId,En())),He=null,Te=null,_n(),Ye(),xe()}}function Vd(){const e=Be();if(!e)return;const t=Aa(e),n=Ta(e),a=e.headerInfo||{};document.getElementById("member-input-date").value=a.date||"",document.getElementById("member-input-tournament").value=a.tournament||"",document.getElementById("member-input-team-home").value=a.teamHome||"ありんこアントス",document.getElementById("member-input-team-visitor").value=a.teamVisitor||"",document.getElementById("member-input-manager").value=a.manager||"",document.getElementById("member-input-captain").value=a.captain||"",document.getElementById("member-input-scorer").value=a.scorer||"",document.getElementById("member-input-stadium").value=a.stadium||"",document.getElementById("member-input-time").value=a.time||"",ko(e,t,n);const s=document.getElementById("sim-member-modal");s&&s.classList.remove("hidden")}function zd(){const e=Be();if(!e)return;e.headerInfo||(e.headerInfo={}),e.headerInfo.date=document.getElementById("member-input-date").value.trim(),e.headerInfo.tournament=document.getElementById("member-input-tournament").value.trim(),e.headerInfo.teamHome=document.getElementById("member-input-team-home").value.trim(),e.headerInfo.teamVisitor=document.getElementById("member-input-team-visitor").value.trim(),e.headerInfo.manager=document.getElementById("member-input-manager").value.trim(),e.headerInfo.captain=document.getElementById("member-input-captain").value.trim(),e.headerInfo.scorer=document.getElementById("member-input-scorer").value.trim(),e.headerInfo.stadium=document.getElementById("member-input-stadium").value.trim(),e.headerInfo.time=document.getElementById("member-input-time").value.trim(),st(e);const t=Aa(e),n=Ta(e);ko(e,t,n)}function ko(e,t,n){const a=ue===9?Wt:Jt,s=e.headerInfo||{};let r=`【 メンバー表 (Ants) 】
`;r+=`日時: ${s.date||"未設定"}  時間: ${s.time||"未設定"}
`,r+=`大会: ${s.tournament||"未設定"}  球場: ${s.stadium||"未設定"}
`,r+=`対戦: ${s.teamHome||"未設定"} vs ${s.teamVisitor||"未設定"}
`,r+=`監督: ${s.manager||"未設定"}  主将: ${s.captain||"未設定"}  スコアラー: ${s.scorer||"未設定"}
`,r+=`------------------------------------

`,r+=`◆ スターティングメンバー (打順順)
`;const o=a.length,i=e.basePositions||{},d={};a.forEach(p=>{const b=i[p];b&&(d[b]=p)});for(let p=1;p<=o;p++){const b=e.battingOrder[p];if(b){const h=Bt(b,e),g=d[b];if(h&&g){const m=Xn[g],y=h.number?` [#${h.number}]`:"";r+=`${p}. [${m}] ${an[g]} : ${h.name}${y}
`}}}r+=`
◆ 控え選手 (ベンチ)
`;const l=new Set(Object.values(t).filter(Boolean)),u=Je.filter(p=>!l.has(p.id)&&!n.has(p.id));u.length===0?r+=`(なし)
`:u.forEach(p=>{const b=Bt(p.id,e),h=b.number?` [#${b.number}]`:"";r+=`・${b.name}${h}
`}),r+=`
◆ 交代履歴
`;const c=(e.customSubstitutions||[]).filter(p=>p.active);if(c.length===0)r+=`(なし: 基本配置のままです)
`;else{let p={...e.basePositions||{}};c.forEach((b,h)=>{const g=pr(b,p,!1,e);if(r+=`${h+1}. [${g.code}] ${g.fullDesc}
`,b.type==="swap"){const{pos1:m,pos2:y}=b.details,x=p[m];p[m]=p[y],p[y]=x}else if(b.type==="sub"){const{outPlayerId:m,inPlayerId:y}=b.details,x=Object.keys(p).find(E=>p[E]===m);x&&(p[x]=y)}else if(b.type==="rotation"){const m=b.details.positions,y=m.map(x=>p[x]);for(let x=0;x<m.length;x++){const E=y[(x-1+m.length)%m.length];p[m[x]]=E}}})}const f=document.getElementById("sim-member-text");f&&(f.value=r)}function Wd(){const e=document.getElementById("sim-member-text");e&&(e.select(),document.execCommand("copy"),alert("メンバー表をクリップボードにコピーしました！"))}function Hr(){const e=document.getElementById("sim-member-modal");e&&e.classList.add("hidden")}function Jd(){const e=Be();if(!e)return;const t=Aa(e),n=Ta(e),a=ue===9?Wt:Jt,s=e.headerInfo||{},r=e.basePositions||{},o={};a.forEach(b=>{const h=r[b];h&&(o[h]=b)});const i=a.length,d=[];for(let b=1;b<=i;b++){const h=e.battingOrder[b];if(h){const g=Bt(h,e),m=o[h];g&&m&&d.push({order:b,posNum:Xn[m],name:g.name,number:g.number||""})}}for(;d.length<9;)d.push({order:d.length+1,posNum:"",name:"",number:""});const l=new Set(Object.values(t).filter(Boolean)),u=Je.filter(b=>!l.has(b.id)&&!n.has(b.id)),c=[];for(let b=0;b<6;b++){const h=b*2,g=b*2+1,m=u[h],y=u[g],x=m?Bt(m.id,e):null,E=y?Bt(y.id,e):null;c.push({leftName:x?x.name:"",leftNumber:x&&x.number||"",rightName:E?E.name:"",rightNumber:E&&E.number||""})}let f="";for(let b=1;b<=4;b++){let h="";d.forEach(x=>{h+=`
                <tr>
                    <td class="cell-order">${x.order}</td>
                    <td class="cell-pos">${x.posNum}</td>
                    <td class="cell-name">${Ae(x.name)}</td>
                    <td class="cell-number">${x.number}</td>
                </tr>
            `}),ue===10&&d.length<10&&(h+='<tr><td class="cell-order">10</td><td class="cell-pos"></td><td class="cell-name"></td><td class="cell-number"></td></tr>');const g=ue===10?11:10,m=d.length;for(let x=m;x<g;x++)h+='<tr><td class="cell-order"></td><td class="cell-pos"></td><td class="cell-name"></td><td class="cell-number"></td></tr>';let y="";c.forEach(x=>{y+=`
                <tr>
                    <td class="cell-bench-name">${Ae(x.leftName)}</td>
                    <td class="cell-bench-num">${x.leftNumber}</td>
                    <td class="cell-bench-name">${Ae(x.rightName)}</td>
                    <td class="cell-bench-num">${x.rightNumber}</td>
                </tr>
            `}),f+=`
            <div class="sheet-card">
                <div class="card-page-idx">(${b}/4)</div>
                <div class="card-title">メンバー表</div>
                
                <div class="header-table-wrapper">
                    <!-- 1行目: 日付・大会名 -->
                    <table class="table-header table-header-top">
                        <tr>
                            <td class="cell-date font-variable">${Ae(s.date||"")}</td>
                            <td class="cell-tournament font-variable">${Ae(s.tournament||"")}</td>
                        </tr>
                    </table>
                    <!-- 2行目: 自チーム・相手チーム -->
                    <table class="table-header table-header-bottom">
                        <tr>
                            <td class="cell-team-label-l cell-label-vertical"><span class="label-v-wrap">チーム</span></td>
                            <td class="cell-team-val font-variable">${Ae(s.teamHome||"")}</td>
                            <td class="cell-team-label-r cell-label-vertical"><span class="label-v-wrap">相手チーム</span></td>
                            <td class="cell-team-val font-variable">${Ae(s.teamVisitor||"")}</td>
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
                        ${h}
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
                        ${y}
                    </tbody>
                </table>
                
                <table class="table-footer">
                    <tr>
                        <td class="footer-label">監督</td>
                        <td class="footer-val font-variable">${Ae(s.manager||"")}</td>
                        <td class="footer-label">主将</td>
                        <td class="footer-val font-variable">${Ae(s.captain||"")}</td>
                        <td class="footer-label font-sans leading-none" style="font-size: 6.5px; padding: 0; text-align: center; white-space: nowrap;"><span style="display: inline-block; transform: scaleX(0.75); transform-origin: center;">スコアラー</span></td>
                        <td class="footer-val font-variable">${Ae(s.scorer||"")}</td>
                    </tr>
                    <tr>
                        <td class="footer-label">球場</td>
                        <td colspan="3" class="footer-val font-variable">${Ae(s.stadium||"")}</td>
                        <td class="footer-label">時間</td>
                        <td class="footer-val font-variable">${Ae(s.time||"")}</td>
                    </tr>
                </table>
            </div>
        `}const p=window.open("","_blank");if(!p){alert("ポップアップブロックが有効になっているため、印刷用画面を開けませんでした。許可してください。");return}p.document.write(`
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
                ${f}
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
    `),p.document.close()}function Yd(){const e=Be();if(!e)return;const t={version:"ants-sim-3.0",players:Je,pattern:e},n=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),a=URL.createObjectURL(n),s=document.createElement("a");s.href=a,s.download=`ants_positions_${e.name.replace(/[\s/\\?%*:|"<>\.]/g,"_")}.json`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(a)}function Kd(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=async function(a){try{const s=JSON.parse(a.target.result);if(s.version!=="ants-sim-3.0"&&s.version!=="ants-sim-2.0"&&s.version!=="ants-sim-1.0"){alert("ファイル形式が正しくありません。");return}if(confirm(`インポートを実行しますか？
※既存の選手リストと配置データがマージ/追加されます。`)){for(const r of s.players)Je.some(o=>o.id===r.id||o.name===r.name)||(Je.push(r),await Ba(r));if(s.version==="ants-sim-3.0"){const r=s.pattern;r.id="pat_"+Date.now(),r.name=r.name+" (インポート)",Fe.push(r),ut=r.id,ue=r.mode,await st(r)}else if(s.version==="ants-sim-2.0"){const r=s.pattern;r.id="pat_"+Date.now(),r.name=r.name+" (インポート)",r.mode=r.mode||9,r.battingOrder={},r.headerInfo={},Fe.push(r),ut=r.id,ue=r.mode,await st(r)}else{const r=s.pattern,o=r.innings&&r.innings[0]?r.innings[0].positions:{},i={id:"pat_"+Date.now(),name:r.name+" (旧移行)",mode:r.mode||9,basePositions:o,customSubstitutions:[],battingOrder:{},headerInfo:{}};Fe.push(i),ut=i.id,ue=i.mode,await st(i)}_n(),Ye(),xe(),alert("インポートが完了しました。")}}catch(s){console.error(s),alert("ファイルの読み込みに失敗しました。")}e.target.value=""},n.readAsText(t)}function Qd(){var s,r,o,i,d,l,u,c,f,p,b,h,g,m,y,x,E,k,_,S,I,v,w,$,A,P,R,D,M,C,L,T,N,H,J,G,Q,q,Z;const e=document.getElementById("btn-toggle-players-panel"),t=document.getElementById("players-panel-content"),n=document.getElementById("icon-toggle-players");e&&t&&n&&(e.addEventListener("click",()=>{const ae=t.classList.toggle("hidden");n.textContent=ae?"▼":"▲",localStorage.setItem("ants_sim_players_panel_collapsed",ae?"true":"false")}),localStorage.getItem("ants_sim_players_panel_collapsed")==="true"&&(t.classList.add("hidden"),n.textContent="▼")),(s=document.getElementById("tab-btn-setup"))==null||s.addEventListener("click",()=>Xa("setup")),(r=document.getElementById("tab-btn-subrules"))==null||r.addEventListener("click",()=>Xa("subrules")),(o=document.getElementById("rule-type-select"))==null||o.addEventListener("change",U=>{const ae=U.target.value;document.getElementById("form-sub").classList.add("hidden"),document.getElementById("form-rotation").classList.add("hidden"),ae==="sub"?document.getElementById("form-sub").classList.remove("hidden"):ae==="rotation"&&document.getElementById("form-rotation").classList.remove("hidden")}),(i=document.getElementById("btn-export-member-table"))==null||i.addEventListener("click",Vd),(d=document.getElementById("btn-copy-member-text"))==null||d.addEventListener("click",Wd),(l=document.getElementById("btn-close-member-modal"))==null||l.addEventListener("click",Hr),(u=document.getElementById("btn-close-member-modal-footer"))==null||u.addEventListener("click",Hr),(c=document.getElementById("btn-print-member-table"))==null||c.addEventListener("click",Jd),["member-input-date","member-input-tournament","member-input-team-home","member-input-team-visitor","member-input-manager","member-input-captain","member-input-scorer","member-input-stadium","member-input-time"].forEach(U=>{var ae;(ae=document.getElementById(U))==null||ae.addEventListener("input",zd)}),(f=document.getElementById("btn-create-sub-rule"))==null||f.addEventListener("click",_d),(p=document.getElementById("btn-add-sim-player"))==null||p.addEventListener("click",Ls),(b=document.getElementById("sim-new-player-input"))==null||b.addEventListener("keypress",U=>{U.key==="Enter"&&Ls()}),(h=document.getElementById("sim-new-player-number"))==null||h.addEventListener("keypress",U=>{U.key==="Enter"&&Ls()}),(g=document.getElementById("sim-team-select"))==null||g.addEventListener("change",Cd),(m=document.getElementById("btn-add-sim-team"))==null||m.addEventListener("click",Ad),(y=document.getElementById("btn-edit-sim-team"))==null||y.addEventListener("click",Td),(x=document.getElementById("btn-delete-sim-team"))==null||x.addEventListener("click",Dd),(E=document.getElementById("sim-template-select-inline"))==null||E.addEventListener("change",U=>Md(U.target.value)),(k=document.getElementById("btn-save-as-template"))==null||k.addEventListener("click",Nd),(_=document.getElementById("btn-delete-template"))==null||_.addEventListener("click",Pd),(S=document.getElementById("btn-open-new-sim-modal"))==null||S.addEventListener("click",Rd),(I=document.getElementById("btn-close-new-sim-modal"))==null||I.addEventListener("click",qs),(v=document.getElementById("btn-close-new-sim-modal-footer"))==null||v.addEventListener("click",qs),(w=document.getElementById("btn-create-new-sim"))==null||w.addEventListener("click",Od),($=document.getElementById("sim-pattern-select"))==null||$.addEventListener("change",Gd),(A=document.getElementById("btn-save-sim-pattern"))==null||A.addEventListener("click",Ud),(P=document.getElementById("btn-delete-sim-pattern"))==null||P.addEventListener("click",jd),(R=document.getElementById("btn-refresh-sim-pattern"))==null||R.addEventListener("click",Hd),(D=document.getElementById("btn-close-edit-player-modal"))==null||D.addEventListener("click",Us),(M=document.getElementById("btn-close-edit-player-modal-footer"))==null||M.addEventListener("click",Us),(C=document.getElementById("btn-save-edit-player"))==null||C.addEventListener("click",Bs),(L=document.getElementById("edit-player-name"))==null||L.addEventListener("keypress",U=>{U.key==="Enter"&&Bs()}),(T=document.getElementById("edit-player-number"))==null||T.addEventListener("keypress",U=>{U.key==="Enter"&&Bs()}),(N=document.getElementById("btn-sim-mode-9"))==null||N.addEventListener("click",async()=>{if(ue!==9){ue=9,_n();const U=Be();U&&(U.mode=9,ra(U),await st(U)),Ye(),xe()}}),(H=document.getElementById("btn-sim-mode-10"))==null||H.addEventListener("click",async()=>{if(ue!==10){ue=10,_n();const U=Be();U&&(U.mode=10,ra(U),await st(U)),Ye(),xe()}}),(J=document.getElementById("btn-export-sim"))==null||J.addEventListener("click",Yd),(G=document.getElementById("import-sim-input"))==null||G.addEventListener("change",Kd),(Q=document.getElementById("btn-back-to-menu-sim"))==null||Q.addEventListener("click",()=>{He=null,Te=null,oe("app-menu-view")}),(q=document.getElementById("btn-logout-sim"))==null||q.addEventListener("click",()=>{var U;(U=document.getElementById("btn-logout"))==null||U.click()}),(Z=document.getElementById("sim-bench-list"))==null||Z.addEventListener("click",U=>{U.target.id==="sim-bench-list"&&He&&Te!=="players-list"&&Te!=="bench"&&Bd(Te)})}function Ae(e){return typeof e!="string"?"":e.replace(/[&<>'"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[t]||t)}let Lo=null,bn=null,On=!1;const Fn="ants_surveys_v1",ta="ants_survey_responses_v1";let ge=[],Le=[];const qr=[{id:"survey_sample_1",title:"【夏季合宿】参加日程調整 & お弁当・合宿Tシャツ注文とりまとめ",description:`少年野球チーム Arinko Ants 夏季合宿（8月開催）の出欠日程および備品・お弁当の事前注文確認です。
**1回の送信で、保護者様ご本人と選手（兄弟含む）全員分の出欠・注文をまとめてご登録いただけます。**
ご不明な点がありましたら役員までお問い合わせください。`,status:"active",deadline:"2026-07-20 23:59",public_results:!0,enable_schedule:!0,schedule_options:["8/8(土) 午前 (練習・遠征)","8/8(土) 午後 (練習試合・BBQ)","8/8(土) 宿泊","8/9(日) 終日 (紅白戦・グラウンド納め)"],enable_family:!0,enable_orders:!0,order_items:[{id:"item_lunch_sat",name:"8/8(土) 選手・保護者弁当",price:650,max:10},{id:"item_lunch_sun",name:"8/9(日) 選手・保護者弁当",price:650,max:10},{id:"item_tshirt",name:"合宿記念チームTシャツ",price:2200,max:5},{id:"item_cap",name:" Ants オリジナル冷感タオル",price:800,max:5}],questions:[{id:"q_attendance",type:"single",title:"合宿全体の参加可否をお選びください",required:!0,options:[{label:"参加する（部分参加含む）",skip_to:null},{label:"不参加（全日程）",skip_to:"q_remarks"}],help:"不参加を選択された場合、日程詳細およびお弁当等の注文設問はスキップされます。"},{id:"q_transport",type:"single",title:"現地までの移動手段について",required:!1,options:[{label:"配車（チーム車）を利用希望",skip_to:null},{label:"自車で現地直行（他メンバー同乗可）",skip_to:null},{label:"自車で現地直行（家族のみ）",skip_to:null}],help:""},{id:"q_remarks",type:"text",title:"特記事項・アレルギー・連絡事項など",required:!1,options:[],help:"食物アレルギーや遅刻・早退のご予定等があればご記入ください。"}],created_by:"役員会",created_at:"2026-06-01",updated_at:"2026-06-01"}],Ur=[{id:"resp_sample_1",survey_id:"survey_sample_1",respondent_name:"菱沼 (保護者)",family_members:[{name:"菱沼 健一 (保護者・指導者)",role:"保護者"},{name:"菱沼 翔太 (6年・主将)",role:"選手"}],schedules:{"8/8(土) 午前 (練習・遠征)":"○","8/8(土) 午後 (練習試合・BBQ)":"○","8/8(土) 宿泊":"○","8/9(日) 終日 (紅白戦・グラウンド納め)":"○"},answers:{q_attendance:"参加する（部分参加含む）",q_transport:"自車で現地直行（他メンバー同乗可）",q_remarks:"車出し可能です。道具車としても利用できます。"},orders:{item_lunch_sat:2,item_lunch_sun:2,item_tshirt:1,item_cap:2},total_amount:6400,created_at:"2026-06-02 10:15"}];async function Zd({supabaseClient:e,currentUser:t,currentUserRole:n,canManageInfo:a=null}){Lo=e,bn=t,a!==null?On=a:On=n==="admin"||(t==null?void 0:t.can_edit_info)===!0||n==="leader"&&(t==null?void 0:t.can_edit_info)!==!1,await js(),On&&Xd(),Do(),Wn()}async function Xd(){const e=ma();if(e)try{const t=localStorage.getItem(Fn);if(t){const n=JSON.parse(t);Array.isArray(n)&&n.length>0&&(await e.from("master_data").upsert({key:"ANTS_SURVEYS",data:n}),console.log("Auto-synced surveys to master_data:",n.length))}}catch(t){console.warn("Auto-sync surveys to DB failed:",t)}}function ma(){return Lo||window.supabaseClient||null}async function js(){let e=!1,t=!1;const n=ma();if(n){try{const{data:a,error:s}=await n.from("surveys").select("*").order("created_at",{ascending:!1});!s&&a&&a.length>0&&(ge=a,e=!0)}catch(a){console.warn("Supabase surveys load failed, trying master_data fallback:",a)}if(!e)try{const{data:a,error:s}=await n.from("master_data").select("data").eq("key","ANTS_SURVEYS");!s&&a&&a.length>0&&Array.isArray(a[0].data)&&a[0].data.length>0&&(ge=a[0].data,e=!0)}catch(a){console.warn("Supabase master_data ANTS_SURVEYS load skipped:",a)}try{const{data:a,error:s}=await n.from("survey_responses").select("*").order("created_at",{ascending:!1});!s&&a&&a.length>0&&(Le=a,t=!0)}catch(a){console.warn("Supabase survey_responses load failed, trying master_data fallback:",a)}if(!t)try{const{data:a,error:s}=await n.from("master_data").select("data").eq("key","ANTS_SURVEY_RESPONSES");!s&&a&&a.length>0&&Array.isArray(a[0].data)&&(Le=a[0].data,t=!0)}catch(a){console.warn("Supabase master_data ANTS_SURVEY_RESPONSES load skipped:",a)}}if(e)try{localStorage.setItem(Fn,JSON.stringify(ge))}catch{}else try{const a=localStorage.getItem(Fn);a?ge=JSON.parse(a):(ge=[...qr],localStorage.setItem(Fn,JSON.stringify(ge)))}catch{ge=[...qr]}if(t)try{localStorage.setItem(ta,JSON.stringify(Le))}catch{}else try{const a=localStorage.getItem(ta);a?Le=JSON.parse(a):(Le=[...Ur],localStorage.setItem(ta,JSON.stringify(Le)))}catch{Le=[...Ur]}}async function Bo(e,t=!1){const n=ge.findIndex(s=>s.id===e.id);n>=0?ge[n]=e:ge.unshift(e);try{localStorage.setItem(Fn,JSON.stringify(ge))}catch(s){console.error(s)}const a=ma();if(a){try{t?await a.from("surveys").insert([e]):await a.from("surveys").update(e).eq("id",e.id)}catch(s){console.warn("Supabase survey table save skipped:",s)}try{await a.from("master_data").upsert({key:"ANTS_SURVEYS",data:ge})}catch(s){console.warn("Supabase master_data ANTS_SURVEYS upsert failed:",s)}}}async function el(e){ge=ge.filter(n=>n.id!==e),Le=Le.filter(n=>n.survey_id!==e);try{localStorage.setItem(Fn,JSON.stringify(ge)),localStorage.setItem(ta,JSON.stringify(Le))}catch(n){console.error(n)}const t=ma();if(t){try{await t.from("survey_responses").delete().eq("survey_id",e),await t.from("surveys").delete().eq("id",e)}catch{}try{await t.from("master_data").upsert({key:"ANTS_SURVEYS",data:ge}),await t.from("master_data").upsert({key:"ANTS_SURVEY_RESPONSES",data:Le})}catch{}}}async function tl(e){const t=Le.findIndex(s=>s.id===e.id),n=t>=0;n?Le[t]=e:Le.unshift(e);try{localStorage.setItem(ta,JSON.stringify(Le))}catch(s){console.error(s)}const a=ma();if(a){try{n?await a.from("survey_responses").update(e).eq("id",e.id):await a.from("survey_responses").insert([e])}catch(s){console.warn("Supabase survey_responses table save skipped:",s)}try{await a.from("master_data").upsert({key:"ANTS_SURVEY_RESPONSES",data:Le})}catch(s){console.warn("Supabase master_data ANTS_SURVEY_RESPONSES upsert failed:",s)}}}async function nl(e){Le=Le.filter(n=>n.id!==e);try{localStorage.setItem(ta,JSON.stringify(Le))}catch(n){console.error(n)}const t=ma();if(t){try{await t.from("survey_responses").delete().eq("id",e)}catch{}try{await t.from("master_data").upsert({key:"ANTS_SURVEY_RESPONSES",data:Le})}catch{}}oa&&bs(oa.id),Wn()}function Wn(){const e=document.getElementById("info-surveys-container"),t=document.getElementById("info-surveys-empty"),n=document.getElementById("btn-survey-new");if(e){if(n&&(On?n.classList.remove("hidden"):n.classList.add("hidden")),ge.length===0){e.innerHTML="",t&&t.classList.remove("hidden");return}t&&t.classList.add("hidden"),e.innerHTML=ge.map(a=>{const s=Le.filter(l=>l.survey_id===a.id),r=s.length,o=s.reduce((l,u)=>l+(Number(u.total_amount)||0),0);let i="";a.status==="active"?i='<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">🟢 受付中</span>':a.status==="closed"?i='<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">⚪ 締切済み</span>':i='<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">🟡 下書き</span>';const d=[];return a.enable_schedule&&d.push("📅 日程調整"),a.enable_family&&d.push("👨‍👩‍👧 家族一括"),a.enable_orders&&d.push("🛒 注文集計"),`
            <div class="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between gap-2 mb-3">
                        ${i}
                        <span class="text-xs text-gray-400 font-mono">期限: ${a.deadline||"なし"}</span>
                    </div>
                    <h3 class="text-base font-bold text-gray-900 mb-2 leading-snug">
                        ${ce(a.title)}
                    </h3>
                    <p class="text-xs text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                        ${ce(a.description||"")}
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
                        ${On?`
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
        `}).join(""),e.querySelectorAll(".btn-survey-respond").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id");na(s)})}),e.querySelectorAll(".btn-survey-share").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id");ol(s)})}),e.querySelectorAll(".btn-survey-results").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id");bs(s)})}),On&&(e.querySelectorAll(".btn-survey-duplicate").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id");await al(s)})}),e.querySelectorAll(".btn-survey-edit").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id"),r=ge.find(o=>o.id===s);r&&Ao(r)})}),e.querySelectorAll(".btn-survey-delete").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id"),r=ge.find(o=>o.id===s);r&&confirm(`アンケート「${r.title}」と、そのすべての回答データを削除しますか？`)&&(await el(s),Wn())})}))}}async function al(e){const t=ge.find(s=>s.id===e);if(!t)return;const n=`survey_${Date.now()}`,a=JSON.parse(JSON.stringify(t));if(a.id=n,a.title=`(複製) ${t.title}`,a.created_at=new Date().toISOString(),a.status=t.status||"active",a.questions&&Array.isArray(a.questions)){const s={};a.questions.forEach((r,o)=>{const i=r.id,d=`q_${Date.now()}_${o+1}`;s[i]=d,r.id=d}),a.questions.forEach(r=>{r.options&&Array.isArray(r.options)&&r.options.forEach(o=>{o.skip_to&&s[o.skip_to]&&(o.skip_to=s[o.skip_to])})})}a.order_items&&Array.isArray(a.order_items)&&a.order_items.forEach((s,r)=>{s.id=`item_${Date.now()}_${r+1}`}),await Bo(a,!0),Wn(),alert(`アンケート「${a.title}」を作成（複製）しました！`)}function sl(e){try{const t={id:e.id,title:e.title,description:e.description,deadline:e.deadline,public_results:e.public_results,enable_schedule:e.enable_schedule,schedule_options:e.schedule_options,enable_family:e.enable_family,enable_orders:e.enable_orders,order_items:e.order_items,questions:e.questions},n=JSON.stringify(t);return btoa(encodeURIComponent(n).replace(/%([0-9A-F]{2})/g,(a,s)=>String.fromCharCode("0x"+s)))}catch(t){return console.warn("Survey encode error:",t),""}}function rl(e){if(!e)return null;try{let t=decodeURIComponent(e).trim();t=t.replace(/ /g,"+"),t=t.replace(/-/g,"+").replace(/_/g,"/");const n=t.length%4;n===2?t+="==":n===3?t+="=":n===1&&(t+="===");const a=atob(t),s=decodeURIComponent(Array.prototype.map.call(a,r=>"%"+("00"+r.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(s)}catch(t){return console.warn("Survey decode error:",t),null}}function ol(e){const t=ge.find(a=>a.id===e);let n=`${window.location.origin}${window.location.pathname}#survey-${e}`;if(t){const a=sl(t);a&&(n+=`&d=${a}`)}navigator.clipboard.writeText(n).then(()=>{alert(`アンケート回答用URLをコピーしました！
どの端末・Safari・LINEでも確実に開くURLです。

${n}`)}).catch(()=>{prompt("アンケート回答用URL:",n)})}let ea=null,se=[],hn=[],nn=[];function Ao(e=null){const t=document.getElementById("modal-survey-editor");if(!t)return;ea=e?e.id:null,document.getElementById("survey-editor-modal-title").textContent=e?"アンケートの編集":"新規アンケート作成",document.getElementById("input-survey-title").value=e?e.title:"",document.getElementById("input-survey-desc").value=e&&e.description||"",document.getElementById("select-survey-status").value=e?e.status:"active",document.getElementById("input-survey-deadline").value=e&&e.deadline||"";const n=document.getElementById("chk-survey-enable-schedule"),a=document.getElementById("chk-survey-enable-family"),s=document.getElementById("chk-survey-enable-orders"),r=document.getElementById("chk-survey-public-results");n.checked=e?!!e.enable_schedule:!0,a.checked=e?!!e.enable_family:!0,s.checked=e?!!e.enable_orders:!1,r&&(r.checked=e?e.public_results!==!1:!0),hn=e&&e.schedule_options?[...e.schedule_options]:["7/18(土) 午前","7/18(土) 午後","7/19(日) 終日"],nn=e&&e.order_items?JSON.parse(JSON.stringify(e.order_items)):[{id:`item_${Date.now()}_1`,name:"選手用お弁当",price:600,max:10},{id:`item_${Date.now()}_2`,name:"保護者用お弁当",price:700,max:10}],se=e&&e.questions?JSON.parse(JSON.stringify(e.questions)):[],gs(),gr(),Xt(),zs(),t.classList.remove("hidden")}function Gs(){const e=document.getElementById("modal-survey-editor");e&&e.classList.add("hidden"),ea=null}function Pa(e){const t=e.getFullYear(),n=e.getMonth()+1,a=e.getDate(),s=e.getDay();if(n===1&&a===1)return"元日";if(n===2&&a===11)return"建国記念の日";if(n===2&&a===23)return"天皇誕生日";if(n===4&&a===29)return"昭和の日";if(n===5&&a===3)return"憲法記念日";if(n===5&&a===4)return"みどりの日";if(n===5&&a===5)return"こどもの日";if(n===8&&a===11)return"山の日";if(n===11&&a===3)return"文化の日";if(n===11&&a===23)return"勤労感謝の日";if(s===1){const r=Math.floor((a-1)/7)+1;if(n===1&&r===2)return"成人の日";if(n===7&&r===3)return"海の日";if(n===9&&r===3)return"敬老の日";if(n===10&&r===2)return"スポーツの日"}if(n===3){const r=Math.floor(20.8431+.242194*(t-1980)-Math.floor((t-1980)/4));if(a===r)return"春分の日"}if(n===9){const r=Math.floor(23.2488+.242194*(t-1980)-Math.floor((t-1980)/4));if(a===r)return"秋分の日"}return null}function fr(e){const t=Pa(e);if(t)return{isHoliday:!0,name:t};const n=e.getFullYear(),a=e.getMonth(),s=e.getDate(),r=e.getDay();let o=new Date(n,a,s-1);for(;Pa(o);){if(o.getDay()===0)return{isHoliday:!0,name:"振替休日"};o.setDate(o.getDate()-1)}if(r!==0){const i=new Date(n,a,s-1),d=new Date(n,a,s+1);if(Pa(i)&&Pa(d))return{isHoliday:!0,name:"国民の休日"}}return null}let Ie={targetType:null,targetQIdx:null,viewYear:new Date().getFullYear(),viewMonth:new Date().getMonth(),selectedDates:new Set};function To(e,t=null){Ie.targetType=e,Ie.targetQIdx=t;const n=new Date;Ie.viewYear=n.getFullYear(),Ie.viewMonth=n.getMonth(),Ie.selectedDates.clear(),Dn();const a=document.getElementById("modal-survey-date-picker");a&&a.classList.remove("hidden")}function Vs(){const e=document.getElementById("modal-survey-date-picker");e&&e.classList.add("hidden")}function Dn(){const e=document.getElementById("dp-current-month-label"),t=document.getElementById("dp-calendar-grid"),n=document.getElementById("dp-selected-count-badge"),a=document.getElementById("btn-apply-date-picker");if(!t)return;const{viewYear:s,viewMonth:r,selectedDates:o}=Ie;e&&(e.textContent=`${s}年 ${r+1}月`),n&&(n.textContent=`${o.size} 日選択中`),a&&(a.disabled=o.size===0);const i=new Date(s,r,1).getDay(),d=new Date(s,r+1,0).getDate();let l="";for(let u=0;u<i;u++)l+='<div class="h-11 border border-transparent rounded-lg"></div>';for(let u=1;u<=d;u++){const c=new Date(s,r,u),f=c.getDay(),p=`${s}-${String(r+1).padStart(2,"0")}-${String(u).padStart(2,"0")}`,b=o.has(p),h=fr(c);let g="",m="";b?(g="bg-teal-600 text-white font-bold shadow-xs",h&&(m=`<span class="text-[9px] block leading-tight truncate px-0.5 text-teal-100">${ce(h.name)}</span>`)):h?(g="text-red-600 bg-red-50/70 hover:bg-red-100 font-bold border-red-100",m=`<span class="text-[9px] block leading-tight truncate px-0.5 text-red-600 font-bold">${ce(h.name)}</span>`):f===0?g="text-red-500 hover:bg-red-50 font-bold":f===6?g="text-blue-600 hover:bg-blue-50 font-bold":g="text-gray-800 hover:bg-gray-100",l+=`
            <button type="button" class="dp-day-cell h-11 p-1 flex flex-col items-center justify-between rounded-lg border border-gray-100 transition cursor-pointer text-xs ${g}" data-date="${p}">
                <span class="text-xs font-bold leading-none">${u}</span>
                ${m}
            </button>
        `}t.innerHTML=l,t.querySelectorAll(".dp-day-cell").forEach(u=>{u.addEventListener("click",()=>{const c=u.getAttribute("data-date");o.has(c)?o.delete(c):o.add(c),Dn()})})}function il(){const e=new Date(Ie.viewYear,Ie.viewMonth+1,0).getDate();for(let t=1;t<=e;t++){const n=new Date(Ie.viewYear,Ie.viewMonth,t),a=n.getDay(),s=fr(n);if(a===0||a===6||s){const r=`${Ie.viewYear}-${String(Ie.viewMonth+1).padStart(2,"0")}-${String(t).padStart(2,"0")}`;Ie.selectedDates.add(r)}}Dn()}function dl(){var i;const{targetType:e,targetQIdx:t,selectedDates:n}=Ie;if(n.size===0)return;const a=((i=document.querySelector('input[name="dp-format"]:checked'))==null?void 0:i.value)||"simple",s=["日","月","火","水","木","金","土"],r=Array.from(n).sort(),o=[];if(r.forEach(d=>{const[l,u,c]=d.split("-").map(Number),f=new Date(l,u-1,c),p=s[f.getDay()],h=fr(f)?`${p}・祝`:p;a==="time_slots"?(o.push(`${u}/${c}(${h}) 午前`),o.push(`${u}/${c}(${h}) 午後`),o.push(`${u}/${c}(${h}) 終日`)):a==="with_year"?o.push(`${l}/${String(u).padStart(2,"0")}/${String(c).padStart(2,"0")}(${h})`):a==="kanji"?o.push(`${u}月${c}日(${h})`):o.push(`${u}/${c}(${h})`)}),e==="schedule")hn.push(...o),gs();else if(e==="question"&&t!==null){se[t].options||(se[t].options=[]);const d=se[t].options;d.length===2&&d[0].label==="選択肢 1"&&d[1].label==="選択肢 2"?se[t].options=o.map(u=>({label:u,skip_to:null})):o.forEach(u=>{se[t].options.push({label:u,skip_to:null})}),Xt()}Vs()}function zs(){var s,r;const e=(s=document.getElementById("chk-survey-enable-schedule"))==null?void 0:s.checked,t=(r=document.getElementById("chk-survey-enable-orders"))==null?void 0:r.checked,n=document.getElementById("editor-schedule-section"),a=document.getElementById("editor-orders-section");n&&(n.style.display=e?"block":"none"),a&&(a.style.display=t?"block":"none")}function gs(){const e=document.getElementById("editor-schedule-list");e&&(e.innerHTML=hn.map((t,n)=>`
        <div class="flex items-center gap-2 mb-2">
            <span class="text-xs font-bold text-gray-400 w-5">#${n+1}</span>
            <input type="text" class="input-sched-opt flex-grow border border-gray-300 rounded-lg p-1.5 text-xs focus:ring-2 focus:ring-teal-500" value="${ce(t)}" data-index="${n}" placeholder="例: 7/18(土) 午前 (9:00〜12:00)">
            <button class="btn-del-sched-opt text-xs text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded" data-index="${n}">🗑️</button>
        </div>
    `).join(""),e.querySelectorAll(".input-sched-opt").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-index"));hn[a]=n.target.value})}),e.querySelectorAll(".btn-del-sched-opt").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-index"));hn.splice(n,1),gs()})}))}function gr(){const e=document.getElementById("editor-orders-list");e&&(e.innerHTML=nn.map((t,n)=>`
        <div class="grid grid-cols-12 gap-2 mb-2 items-center bg-gray-50/70 p-2 rounded-lg border border-gray-200">
            <div class="col-span-6">
                <input type="text" class="input-order-name w-full border border-gray-300 rounded p-1 text-xs" value="${ce(t.name)}" data-index="${n}" placeholder="商品・品目名 (例: お弁当)">
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
    `).join(""),e.querySelectorAll(".input-order-name").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-index"));nn[a].name=n.target.value})}),e.querySelectorAll(".input-order-price").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-index"));nn[a].price=Number(n.target.value)||0})}),e.querySelectorAll(".input-order-max").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-index"));nn[a].max=Number(n.target.value)||10})}),e.querySelectorAll(".btn-del-order-item").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-index"));nn.splice(n,1),gr()})}))}function Xt(){const e=document.getElementById("editor-questions-list");if(e){if(se.length===0){e.innerHTML='<p class="text-xs text-gray-400 py-3 text-center border border-dashed rounded-lg">設問がありません。「＋ 設問を追加」ボタンで追加してください。</p>';return}e.innerHTML=se.map((t,n)=>{const a=se.filter((s,r)=>r>n);return`
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
                        ${n<se.length-1?`<button class="btn-move-q-down text-xs text-gray-500 hover:text-gray-800 p-1" data-q-index="${n}" title="下に移動">▼</button>`:""}
                        <button class="btn-del-q text-xs text-red-500 hover:text-red-700 p-1 font-bold ml-1" data-q-index="${n}">削除</button>
                    </div>
                </div>

                <div class="mb-3">
                    <input type="text" class="input-q-title w-full border border-gray-300 rounded-lg p-2 text-xs font-bold text-gray-800" value="${ce(t.title)}" data-q-index="${n}" placeholder="設問のタイトルを入力してください">
                </div>

                <!-- 選択肢セクション (single または multiple の場合) -->
                ${t.type==="single"||t.type==="multiple"?`
                <div class="pl-3 border-l-2 border-teal-300 mb-2">
                    <label class="block text-[11px] font-bold text-gray-500 mb-1.5">選択肢一覧 &amp; 設問スキップ設定:</label>
                    <div class="space-y-2">
                        ${(t.options||[]).map((s,r)=>`
                            <div class="flex items-center gap-2">
                                <input type="text" class="input-opt-label flex-grow border border-gray-300 rounded p-1.5 text-xs" value="${ce(s.label)}" data-q-index="${n}" data-opt-index="${r}" placeholder="選択肢 ${r+1}">
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
                    <input type="text" class="input-q-help w-full border border-gray-200 rounded p-1.5 text-[11px] text-gray-500 bg-white" value="${ce(t.help||"")}" data-q-index="${n}" placeholder="補足説明・注釈 (任意)">
                </div>
            </div>
        `}).join(""),e.querySelectorAll(".input-q-title").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-q-index"));se[a].title=n.target.value})}),e.querySelectorAll(".input-q-help").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-q-index"));se[a].help=n.target.value})}),e.querySelectorAll(".select-q-type").forEach(t=>{t.addEventListener("change",n=>{const a=Number(n.target.getAttribute("data-q-index"));se[a].type=n.target.value,(!se[a].options||se[a].options.length===0)&&(se[a].options=[{label:"選択肢 1",skip_to:null},{label:"選択肢 2",skip_to:null}]),Xt()})}),e.querySelectorAll(".chk-q-req").forEach(t=>{t.addEventListener("change",n=>{const a=Number(n.target.getAttribute("data-q-index"));se[a].required=n.target.checked})}),e.querySelectorAll(".btn-del-q").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index"));se.splice(n,1),Xt()})}),e.querySelectorAll(".btn-move-q-up").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index"));if(n>0){const a=se[n];se[n]=se[n-1],se[n-1]=a,Xt()}})}),e.querySelectorAll(".btn-move-q-down").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index"));if(n<se.length-1){const a=se[n];se[n]=se[n+1],se[n+1]=a,Xt()}})}),e.querySelectorAll(".btn-add-opt").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index"));se[n].options||(se[n].options=[]),se[n].options.push({label:`選択肢 ${se[n].options.length+1}`,skip_to:null}),Xt()})}),e.querySelectorAll(".btn-add-date-opt").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index"));To("question",n)})}),e.querySelectorAll(".input-opt-label").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-q-index")),s=Number(n.target.getAttribute("data-opt-index"));se[a].options[s].label=n.target.value})}),e.querySelectorAll(".select-opt-skip").forEach(t=>{t.addEventListener("change",n=>{const a=Number(n.target.getAttribute("data-q-index")),s=Number(n.target.getAttribute("data-opt-index"));se[a].options[s].skip_to=n.target.value||null})}),e.querySelectorAll(".btn-del-opt").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index")),a=Number(t.getAttribute("data-opt-index"));se[n].options.splice(a,1),Xt()})})}}async function ll(){var c,f,p,b,h,g,m,y,x;const e=(c=document.getElementById("input-survey-title"))==null?void 0:c.value.trim();if(!e){alert("アンケートのタイトルを入力してください");return}const t=((f=document.getElementById("input-survey-desc"))==null?void 0:f.value.trim())||"",n=((p=document.getElementById("select-survey-status"))==null?void 0:p.value)||"active",a=((b=document.getElementById("input-survey-deadline"))==null?void 0:b.value.trim())||"",s=((h=document.getElementById("chk-survey-enable-schedule"))==null?void 0:h.checked)||!1,r=((g=document.getElementById("chk-survey-enable-family"))==null?void 0:g.checked)||!1,o=((m=document.getElementById("chk-survey-enable-orders"))==null?void 0:m.checked)||!1,i=((y=document.getElementById("chk-survey-public-results"))==null?void 0:y.checked)??!0,d=!ea,l=new Date().toISOString().split("T")[0],u={id:ea||`survey_${Date.now()}`,title:e,description:t,status:n,deadline:a,public_results:i,enable_schedule:s,schedule_options:s?hn.filter(E=>E.trim()):[],enable_family:r,enable_orders:o,order_items:o?nn.filter(E=>E.name.trim()):[],questions:se,created_by:(bn==null?void 0:bn.name)||"管理者",created_at:ea&&((x=ge.find(E=>E.id===ea))==null?void 0:x.created_at)||l,updated_at:l};await Bo(u,d),Gs(),Wn()}let oa=null;function bs(e,t=!1){const n=document.getElementById("modal-survey-results");if(!n)return;const a=ge.find(i=>i.id===e);if(!a)return;oa=a;const s=Le.filter(i=>i.survey_id===e),r=t||!On;document.getElementById("results-survey-title").textContent=a.title,document.getElementById("results-survey-subtitle").textContent=`回答数: ${s.length}件 | 締切: ${a.deadline||"なし"}${r?" (閲覧モード)":""}`;const o=document.getElementById("btn-export-survey-csv");o&&(r?o.classList.add("hidden"):o.classList.remove("hidden")),ul(a,s),ml(a,s),pl(a,s),fl(a,s),gl(a,s,r),n.classList.remove("hidden")}function cl(){const e=document.getElementById("modal-survey-results");e&&e.classList.add("hidden"),oa=null}function ul(e,t){const n=t.length;let a=0;t.forEach(o=>{o.family_members&&o.family_members.length>0?a+=o.family_members.length:a+=1});const s=t.reduce((o,i)=>o+(Number(i.total_amount)||0),0),r=document.getElementById("results-summary-cards");r&&(r.innerHTML=`
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
    `)}function ml(e,t){const n=document.getElementById("results-schedule-container");if(!n)return;if(!e.enable_schedule||!e.schedule_options||e.schedule_options.length===0){n.classList.add("hidden");return}n.classList.remove("hidden");const a={};e.schedule_options.forEach(r=>{a[r]={ok:[],maybe:[],ng:[]}}),t.forEach(r=>{const o=r.respondent_name||"無名";r.schedules&&Object.entries(r.schedules).forEach(([i,d])=>{a[i]&&(d==="○"||d==="ok"?a[i].ok.push(o):d==="△"||d==="maybe"?a[i].maybe.push(o):(d==="×"||d==="ng")&&a[i].ng.push(o))})});const s=document.getElementById("results-schedule-tbody");s&&(s.innerHTML=e.schedule_options.map(r=>{const o=a[r],i=o.ok.join("、 ");return`
            <tr class="border-b border-gray-100 hover:bg-gray-50/50">
                <td class="px-3 py-2.5 font-bold text-gray-800 whitespace-nowrap">${ce(r)}</td>
                <td class="px-3 py-2.5 text-center font-extrabold text-emerald-600 bg-emerald-50/30">
                    ${o.ok.length}
                </td>
                <td class="px-3 py-2.5 text-center font-bold text-amber-600">
                    ${o.maybe.length}
                </td>
                <td class="px-3 py-2.5 text-center font-bold text-gray-400">
                    ${o.ng.length}
                </td>
                <td class="px-3 py-2.5 text-xs text-gray-600 max-w-xs truncate" title="${ce(i)}">
                    ${ce(i)||'<span class="text-gray-300">なし</span>'}
                </td>
            </tr>
        `}).join(""))}function pl(e,t){const n=document.getElementById("results-orders-container");if(!n)return;if(!e.enable_orders||!e.order_items||e.order_items.length===0){n.classList.add("hidden");return}n.classList.remove("hidden");const a={};e.order_items.forEach(r=>{a[r.id]={name:r.name,price:r.price,count:0}}),t.forEach(r=>{r.orders&&Object.entries(r.orders).forEach(([o,i])=>{a[o]&&(a[o].count+=Number(i)||0)})});const s=document.getElementById("results-orders-tbody");s&&(s.innerHTML=e.order_items.map(r=>{const o=a[r.id]||{count:0},i=o.count*r.price;return`
            <tr class="border-b border-gray-100 hover:bg-gray-50/50">
                <td class="px-3 py-2.5 font-bold text-gray-800">${ce(r.name)}</td>
                <td class="px-3 py-2.5 text-right font-mono text-gray-600">¥${r.price.toLocaleString()}</td>
                <td class="px-3 py-2.5 text-center font-extrabold text-purple-600">${o.count} <span class="text-xs font-normal">個</span></td>
                <td class="px-3 py-2.5 text-right font-extrabold text-purple-800 font-mono">¥${i.toLocaleString()}</td>
            </tr>
        `}).join(""))}function fl(e,t){const n=document.getElementById("results-questions-list");if(n){if(!e.questions||e.questions.length===0){n.innerHTML='<p class="text-xs text-gray-400">設問はありません</p>';return}n.innerHTML=e.questions.map((a,s)=>{const r=t.map(o=>o.answers&&o.answers[a.id]).filter(o=>o!=null&&o!=="");if(a.type==="single"||a.type==="multiple"){const o={};(a.options||[]).forEach(d=>o[d.label]=0),o["(未回答)"]=0,r.forEach(d=>{Array.isArray(d)?d.forEach(l=>{o[l]=(o[l]||0)+1}):o[d]!==void 0?o[d]+=1:o[d]=(o[d]||0)+1});const i=t.length;return`
                <div class="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-3">
                    <h4 class="text-xs font-bold text-gray-800 mb-2">設問 ${s+1}: ${ce(a.title)}</h4>
                    <div class="space-y-1.5">
                        ${Object.entries(o).filter(([d,l])=>d!=="(未回答)"||l>0).map(([d,l])=>{const u=i>0?Math.round(l/i*100):0;return`
                                <div>
                                    <div class="flex justify-between text-xs mb-0.5">
                                        <span class="text-gray-700">${ce(d)}</span>
                                        <span class="font-bold text-gray-900">${l}票 (${u}%)</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-teal-600 h-2 rounded-full" style="width: ${u}%"></div>
                                    </div>
                                </div>
                            `}).join("")}
                    </div>
                </div>
            `}else return`
                <div class="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-3">
                    <h4 class="text-xs font-bold text-gray-800 mb-2">設問 ${s+1}: ${ce(a.title)} (${r.length}件の回答)</h4>
                    <div class="max-h-36 overflow-y-auto space-y-1.5 pr-2 scrollbar-thin">
                        ${r.length>0?r.map(o=>`
                            <div class="bg-white p-2 rounded border border-gray-200 text-xs text-gray-700">
                                ${ce(String(o))}
                            </div>
                        `).join(""):'<span class="text-xs text-gray-400">回答がありません</span>'}
                    </div>
                </div>
            `}).join("")}}function gl(e,t,n=!1){const a=document.getElementById("th-results-actions");a&&(n?a.classList.add("hidden"):a.classList.remove("hidden"));const s=document.getElementById("results-responses-tbody");if(!s)return;const r=n?5:6;if(t.length===0){s.innerHTML=`<tr><td colspan="${r}" class="text-center py-6 text-xs text-gray-400">まだ回答がありません</td></tr>`;return}s.innerHTML=t.map(o=>{const i=(o.family_members||[]).map(l=>l.name).join("、 ")||"-",d=o.orders?Object.entries(o.orders).filter(([l,u])=>u>0).map(([l,u])=>{const c=(e.order_items||[]).find(f=>f.id===l);return`${c?c.name:l} ×${u}`}).join(", "):"-";return`
            <tr class="border-b border-gray-100 hover:bg-gray-50/50 text-xs">
                <td class="px-3 py-2 text-gray-400 whitespace-nowrap">${o.created_at||"-"}</td>
                <td class="px-3 py-2 font-bold text-gray-900 whitespace-nowrap">${ce(o.respondent_name)}</td>
                <td class="px-3 py-2 text-gray-600 max-w-xs truncate" title="${ce(i)}">${ce(i)}</td>
                <td class="px-3 py-2 text-gray-600 max-w-xs truncate" title="${ce(d)}">${ce(d)}</td>
                <td class="px-3 py-2 text-right font-mono font-bold text-purple-700">¥${(Number(o.total_amount)||0).toLocaleString()}</td>
                ${n?"":`
                <td class="px-3 py-2 text-center whitespace-nowrap">
                    <div class="flex items-center justify-center gap-1.5">
                        <button class="btn-copy-response-edit-url px-2 py-1 text-[11px] font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded transition cursor-pointer" data-id="${o.id}" title="本人用の修正URLを発行してコピー">
                            🔗 修正URL
                        </button>
                        <button class="btn-delete-response px-2 py-1 text-[11px] font-bold text-red-600 hover:bg-red-50 rounded transition cursor-pointer" data-id="${o.id}" data-name="${ce(o.respondent_name)}" title="この回答を削除">
                            🗑️
                        </button>
                    </div>
                </td>
                `}
            </tr>
        `}).join(""),n||(s.querySelectorAll(".btn-copy-response-edit-url").forEach(o=>{o.addEventListener("click",()=>{const i=o.getAttribute("data-id"),d=`${window.location.origin}${window.location.pathname}#survey-${e.id}&response=${i}`;navigator.clipboard.writeText(d).then(()=>{alert(`回答修正用URLをコピーしました！
ご本人に案内してください。

${d}`)}).catch(()=>{prompt("以下のURLをコピーしてください:",d)})})}),s.querySelectorAll(".btn-delete-response").forEach(o=>{o.addEventListener("click",async()=>{const i=o.getAttribute("data-id"),d=o.getAttribute("data-name")||"この回答者";confirm(`「${d}」さんの回答データを削除しますか？
（集計や出欠、注文数から除外されます）`)&&await nl(i)})}))}function bl(){if(!oa)return;const e=oa,t=Le.filter(d=>d.survey_id===e.id),n=["回答ID","回答日時","回答者(代表者名)"];e.enable_family&&n.push("家族メンバー一覧"),e.enable_schedule&&e.schedule_options&&e.schedule_options.forEach(d=>{n.push(`日程: ${d}`)}),e.questions&&e.questions.forEach((d,l)=>{n.push(`設問${l+1}: ${d.title}`)}),e.enable_orders&&e.order_items&&(e.order_items.forEach(d=>{n.push(`注文: ${d.name} (${d.price}円)`)}),n.push("注文合計金額(円)"));const a=[n];t.forEach(d=>{const l=[d.id,d.created_at||"",d.respondent_name||""];if(e.enable_family){const u=(d.family_members||[]).map(c=>`${c.name}${c.role?`(${c.role})`:""}`).join(", ");l.push(u)}e.enable_schedule&&e.schedule_options&&e.schedule_options.forEach(u=>{l.push(d.schedules&&d.schedules[u]||"")}),e.questions&&e.questions.forEach(u=>{const c=d.answers?d.answers[u.id]:"";Array.isArray(c)?l.push(c.join("; ")):l.push(c||"")}),e.enable_orders&&e.order_items&&(e.order_items.forEach(u=>{const c=d.orders&&d.orders[u.id]||0;l.push(c)}),l.push(d.total_amount||0)),a.push(l)});const s=a.map(d=>d.map(l=>`"${String(l||"").replace(/"/g,'""')}"`).join(",")).join(`
`),r=new Blob([new Uint8Array([239,187,191]),s],{type:"text/csv;charset=utf-8;"}),o=document.createElement("a");o.href=URL.createObjectURL(r);const i=new Date().toISOString().split("T")[0];o.download=`survey_${e.id}_${i}.csv`,o.click()}let wa=null,sn=[],es=null;async function na(e,t=null,n=null){var d;(d=document.getElementById("loading-overlay"))==null||d.classList.add("hidden");const a=document.getElementById("loading-detail-text");a&&(a.style.opacity="0"),["auth-view","signup-view","password-reset-view","password-update-view","app-menu-view","app-view","attendance-view","view-users","dashboard-view","dashboard-settings","position-simulator-view","info-view"].forEach(l=>{const u=document.getElementById(l);u&&u.classList.add("hidden")});const s=document.getElementById("survey-respond-view");s&&s.classList.remove("hidden");const r=document.getElementById("survey-respond-form-container"),o=document.getElementById("survey-respond-error-container"),i=document.getElementById("survey-respond-success-container");i&&i.classList.add("hidden");try{if(Do(),(!ge||ge.length===0)&&await js(),!n){const h=window.location.hash||"",g=window.location.search||"",m=(h+"&"+g).match(/[?&#]d=([^&]+)/);m&&m[1]&&(n=m[1])}let l=ge.find(h=>h.id===e);if(!l&&n)try{const h=rl(n);if(h&&(h.id===e||!e)){l=h,ge.unshift(l);try{localStorage.setItem(Fn,JSON.stringify(ge))}catch{}}}catch(h){console.warn("Embedded survey restore failed:",h)}if(l||(await js(),l=ge.find(h=>h.id===e)),!l&&e)try{const h=decodeURIComponent(e).trim();l=ge.find(g=>g.id===h)}catch{}if(!l){if(r&&r.classList.add("hidden"),o){o.classList.remove("hidden");const h=document.getElementById("survey-respond-error-title"),g=document.getElementById("survey-respond-error-desc");h&&(h.textContent="アンケートが見つかりませんでした"),g&&(g.innerHTML=`指定されたアンケート（ID: <span class="font-mono font-bold">${e||"未指定"}</span>）が存在しないか、URLが正しくない可能性があります。<br>最新のアンケートURLをご確認ください。`)}return}o&&o.classList.add("hidden"),r&&r.classList.remove("hidden"),wa=l,sn=[];let u=null;t&&(u=Le.find(h=>h.id===t));const c=document.getElementById("respond-edit-mode-banner"),f=document.getElementById("btn-submit-survey-response");u?(es=u.id,c&&c.classList.remove("hidden"),f&&(f.textContent="回答を更新する")):(es=null,c&&c.classList.add("hidden"),f&&(f.textContent="回答を送信する")),document.getElementById("respond-survey-title").textContent=l.title,document.getElementById("respond-survey-desc").innerHTML=l.description?l.description.replace(/\n/g,"<br>"):"",document.getElementById("respond-survey-deadline").textContent=l.deadline?`回答期限: ${l.deadline}`:"";const p=document.getElementById("btn-view-public-results");p&&(l.public_results!==!1?(p.classList.remove("hidden"),p.onclick=()=>bs(l.id,!0)):p.classList.add("hidden"));const b=document.getElementById("input-respondent-name");b&&(u?b.value=u.respondent_name||"":b.value=bn&&bn.name?bn.name:""),u&&u.family_members?sn=JSON.parse(JSON.stringify(u.family_members)):sn=[],br(l),hl(l,u?u.schedules:null),yl(l,u?u.answers:null),vl(l,u?u.orders:null),window.scrollTo({top:0,behavior:"smooth"})}catch(l){if(console.error("Error in openSurveyResponsePage:",l),r&&r.classList.add("hidden"),o){o.classList.remove("hidden");const u=document.getElementById("survey-respond-error-title"),c=document.getElementById("survey-respond-error-desc");u&&(u.textContent="エラーが発生しました"),c&&(c.innerHTML=`アンケートの読み込み中にエラーが発生しました。<br><span class="text-xs text-red-500 font-mono">${l.message||l}</span>`)}}}function br(e){const t=document.getElementById("respond-family-section");if(!t)return;if(!e.enable_family){t.classList.add("hidden");return}t.classList.remove("hidden");const n=document.getElementById("respond-family-list");n&&(n.innerHTML=sn.map((a,s)=>`
        <div class="flex items-center gap-2 mb-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
            <input type="text" class="input-fam-name flex-grow border border-gray-300 rounded-lg p-2 text-xs" value="${ce(a.name)}" data-index="${s}" placeholder="ご家族・選手のお名前 (例: 翔太)">
            <select class="select-fam-role border border-gray-300 rounded-lg p-2 text-xs bg-white font-bold" data-index="${s}">
                <option value="選手" ${a.role==="選手"?"selected":""}>選手</option>
                <option value="保護者" ${a.role==="保護者"?"selected":""}>保護者</option>
                <option value="兄弟・姉妹" ${a.role==="兄弟・姉妹"?"selected":""}>兄弟・姉妹</option>
                <option value="その他" ${a.role==="その他"?"selected":""}>その他</option>
            </select>
            <button class="btn-del-fam text-xs text-red-500 hover:text-red-700 p-2" data-index="${s}">🗑️</button>
        </div>
    `).join(""),n.querySelectorAll(".input-fam-name").forEach(a=>{a.addEventListener("input",s=>{const r=Number(s.target.getAttribute("data-index"));sn[r].name=s.target.value})}),n.querySelectorAll(".select-fam-role").forEach(a=>{a.addEventListener("change",s=>{const r=Number(s.target.getAttribute("data-index"));sn[r].role=s.target.value})}),n.querySelectorAll(".btn-del-fam").forEach(a=>{a.addEventListener("click",()=>{const s=Number(a.getAttribute("data-index"));sn.splice(s,1),br(e)})}))}function hl(e,t=null){const n=document.getElementById("respond-schedule-section");if(!n)return;if(!e.enable_schedule||!e.schedule_options||e.schedule_options.length===0){n.classList.add("hidden");return}n.classList.remove("hidden");const a=document.getElementById("respond-schedule-list");a&&(a.innerHTML=e.schedule_options.map((s,r)=>{const o=t&&t[s]?t[s]:"○";return`
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl border border-gray-200 bg-white mb-2.5">
            <span class="text-xs font-bold text-gray-800">${ce(s)}</span>
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
        `}).join(""))}function yl(e,t=null){const n=document.getElementById("respond-questions-section");if(!n)return;if(!e.questions||e.questions.length===0){n.classList.add("hidden");return}n.classList.remove("hidden");const a=document.getElementById("respond-questions-list");a&&(a.innerHTML=e.questions.map((s,r)=>{const o=t?t[s.id]:void 0;return`
        <div id="respond-q-block-${s.id}" class="respond-q-block p-4 rounded-xl border border-gray-200 bg-white mb-4 transition-all" data-q-id="${s.id}">
            <div class="flex items-start gap-2 mb-2">
                <span class="px-2 py-0.5 rounded bg-teal-100 text-teal-800 text-xs font-bold shrink-0">Q${r+1}</span>
                <div>
                    <h4 class="text-xs font-bold text-gray-900 leading-snug">
                        ${ce(s.title)}
                        ${s.required?'<span class="text-red-500 ml-1">*必須</span>':""}
                    </h4>
                    ${s.help?`<p class="text-[11px] text-gray-500 mt-0.5">${ce(s.help)}</p>`:""}
                </div>
            </div>

            <div class="mt-3 pl-2">
                ${xl(s,o)}
            </div>
        </div>
        `}).join(""),a.querySelectorAll('input[type="radio"].q-opt-radio').forEach(s=>{s.addEventListener("change",()=>{jr(e)})}),jr(e))}function xl(e,t=void 0){if(e.type==="single")return(e.options||[]).map((n,a)=>{const s=t!==void 0?t===n.label:a===0;return`
            <label class="flex items-center gap-2 cursor-pointer text-xs text-gray-700 mb-2 hover:text-teal-700">
                <input type="radio" name="respond_ans_${e.id}" value="${ce(n.label)}" class="q-opt-radio text-teal-600 focus:ring-teal-500" data-q-id="${e.id}" data-skip-to="${n.skip_to||""}" ${s?"checked":""}>
                <span>${ce(n.label)}</span>
            </label>
            `}).join("");if(e.type==="multiple")return(e.options||[]).map(n=>{const a=Array.isArray(t)?t.includes(n.label):!1;return`
            <label class="flex items-center gap-2 cursor-pointer text-xs text-gray-700 mb-2 hover:text-teal-700">
                <input type="checkbox" name="respond_ans_${e.id}" value="${ce(n.label)}" ${a?"checked":""} class="rounded text-teal-600 focus:ring-teal-500">
                <span>${ce(n.label)}</span>
            </label>
            `}).join("");{const n=t!==void 0?String(t):"";return`
            <textarea name="respond_ans_${e.id}" rows="3" class="w-full border border-gray-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-teal-500 outline-none" placeholder="回答を入力してください...">${ce(n)}</textarea>
        `}}function jr(e){if(!e.questions)return;let t=new Set;e.questions.forEach((n,a)=>{if(n.type==="single"){const s=document.querySelector(`input[name="respond_ans_${n.id}"]:checked`);if(s){const r=s.getAttribute("data-skip-to");if(r==="__END__")for(let o=a+1;o<e.questions.length;o++)t.add(e.questions[o].id);else if(r){const o=e.questions.findIndex(i=>i.id===r);if(o>a)for(let i=a+1;i<o;i++)t.add(e.questions[i].id)}}}}),e.questions.forEach(n=>{var s,r;const a=document.getElementById(`respond-q-block-${n.id}`);if(a)if(t.has(n.id)){if(a.classList.add("opacity-40","bg-gray-100","pointer-events-none"),!a.querySelector(".skip-badge")){const i=document.createElement("span");i.className="skip-badge text-[10px] bg-gray-300 text-gray-700 font-bold px-1.5 py-0.5 rounded ml-2",i.textContent="スキップされました",(s=a.querySelector("h4"))==null||s.appendChild(i)}}else a.classList.remove("opacity-40","bg-gray-100","pointer-events-none"),(r=a.querySelector(".skip-badge"))==null||r.remove()})}function vl(e,t=null){const n=document.getElementById("respond-orders-section");if(!n)return;if(!e.enable_orders||!e.order_items||e.order_items.length===0){n.classList.add("hidden");return}n.classList.remove("hidden");const a=document.getElementById("respond-orders-list");a&&(a.innerHTML=e.order_items.map(s=>{const r=t&&t[s.id]!==void 0?Number(t[s.id]):0;return`
        <div class="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-white mb-2.5">
            <div>
                <span class="block text-xs font-bold text-gray-900">${ce(s.name)}</span>
                <span class="text-xs text-teal-700 font-mono font-bold">¥${s.price.toLocaleString()}</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-xs text-gray-500">数量:</span>
                <select class="select-order-qty border border-gray-300 rounded-lg p-1.5 text-xs bg-white font-bold" data-item-id="${s.id}" data-price="${s.price}">
                    ${Array.from({length:(s.max||10)+1},(o,i)=>`<option value="${i}" ${i===r?"selected":""}>${i}</option>`).join("")}
                </select>
            </div>
        </div>
        `}).join(""),a.querySelectorAll(".select-order-qty").forEach(s=>{s.addEventListener("change",Gr)}),Gr())}function Gr(){let e=0;document.querySelectorAll(".select-order-qty").forEach(n=>{const a=Number(n.value)||0,s=Number(n.getAttribute("data-price"))||0;e+=a*s});const t=document.getElementById("respond-orders-total-amount");t&&(t.textContent=`¥${e.toLocaleString()}`)}async function wl(){var x,E,k,_;if(!wa)return;const e=wa,t=(x=document.getElementById("input-respondent-name"))==null?void 0:x.value.trim();if(!t){alert("保護者氏名（選手氏名）を入力してください"),(E=document.getElementById("input-respondent-name"))==null||E.focus();return}const n={};e.enable_schedule&&e.schedule_options&&e.schedule_options.forEach((S,I)=>{const v=document.querySelector(`input[name="respond_sched_${I}"]:checked`);v&&(n[S]=v.value)});const a={};let s=!1;if(e.questions&&e.questions.forEach(S=>{var w;const I=document.getElementById(`respond-q-block-${S.id}`);if(!(I&&I.classList.contains("opacity-40")))if(S.type==="single"){const $=document.querySelector(`input[name="respond_ans_${S.id}"]:checked`);$?a[S.id]=$.value:S.required&&(s=!0)}else if(S.type==="multiple"){const $=Array.from(document.querySelectorAll(`input[name="respond_ans_${S.id}"]:checked`)).map(A=>A.value);a[S.id]=$,S.required&&$.length===0&&(s=!0)}else{const $=(w=document.querySelector(`textarea[name="respond_ans_${S.id}"]`))==null?void 0:w.value.trim();a[S.id]=$||"",S.required&&!$&&(s=!0)}}),s){alert("必須の設問に回答してください。");return}const r={};let o=0;e.enable_orders&&e.order_items&&document.querySelectorAll(".select-order-qty").forEach(S=>{const I=S.getAttribute("data-item-id"),v=Number(S.value)||0,w=Number(S.getAttribute("data-price"))||0;r[I]=v,o+=v*w});const i=!!es,d=es||`resp_${Date.now()}`,l=new Date,u=`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}-${String(l.getDate()).padStart(2,"0")} ${String(l.getHours()).padStart(2,"0")}:${String(l.getMinutes()).padStart(2,"0")}`,c={id:d,survey_id:e.id,respondent_name:t,family_members:sn.filter(S=>S.name.trim()),schedules:n,answers:a,orders:r,total_amount:o,created_at:u};await tl(c);const f=`${window.location.origin}${window.location.pathname}#survey-${e.id}&response=${c.id}`,p=document.getElementById("input-edit-response-url");p&&(p.value=f);const b=document.getElementById("btn-copy-edit-url");b&&(b.onclick=()=>{navigator.clipboard.writeText(f).then(()=>{alert(`回答修正用URLをコピーしました！
後から回答を変更する場合は、このURLから修正できます。`)}).catch(()=>{prompt("以下のURLをコピーしてください:",f)})});const h=document.getElementById("btn-re-edit-response");h&&(h.onclick=()=>{na(e.id,c.id)});const g=document.getElementById("btn-view-results-from-success");g&&(e.public_results!==!1?(g.classList.remove("hidden"),g.onclick=()=>bs(e.id,!0)):g.classList.add("hidden"));const m=document.getElementById("survey-respond-success-title"),y=document.getElementById("survey-respond-success-desc");m&&(m.textContent=i?"回答を更新しました！":"回答を受け付けました！"),y&&(y.innerHTML=i?"回答内容の変更が正常に保存されました。<br>内容は役員・担当者へ最新状態で共有されます。":"ご回答いただきありがとうございました。<br>内容は役員・担当者へ共有されます。"),(k=document.getElementById("survey-respond-form-container"))==null||k.classList.add("hidden"),(_=document.getElementById("survey-respond-success-container"))==null||_.classList.remove("hidden"),window.scrollTo({top:0,behavior:"smooth"})}function ce(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}let Vr=!1;function Do(){var e,t,n,a,s,r,o,i,d,l,u,c,f,p,b,h,g,m,y,x,E,k,_,S,I;Vr||(Vr=!0,(e=document.getElementById("btn-survey-new"))==null||e.addEventListener("click",()=>Ao()),(t=document.getElementById("chk-survey-enable-schedule"))==null||t.addEventListener("change",zs),(n=document.getElementById("chk-survey-enable-orders"))==null||n.addEventListener("change",zs),(a=document.getElementById("btn-add-sched-opt"))==null||a.addEventListener("click",()=>{hn.push(`候補日 ${hn.length+1}`),gs()}),(s=document.getElementById("btn-open-date-picker-sched"))==null||s.addEventListener("click",()=>{To("schedule")}),(r=document.getElementById("btn-close-date-picker"))==null||r.addEventListener("click",Vs),(o=document.getElementById("btn-cancel-date-picker"))==null||o.addEventListener("click",Vs),(i=document.getElementById("btn-dp-prev-month"))==null||i.addEventListener("click",()=>{Ie.viewMonth--,Ie.viewMonth<0&&(Ie.viewMonth=11,Ie.viewYear--),Dn()}),(d=document.getElementById("btn-dp-next-month"))==null||d.addEventListener("click",()=>{Ie.viewMonth++,Ie.viewMonth>11&&(Ie.viewMonth=0,Ie.viewYear++),Dn()}),(l=document.getElementById("btn-dp-today"))==null||l.addEventListener("click",()=>{const v=new Date;Ie.viewYear=v.getFullYear(),Ie.viewMonth=v.getMonth(),Dn()}),(u=document.getElementById("btn-dp-select-weekends"))==null||u.addEventListener("click",il),(c=document.getElementById("btn-dp-clear-all"))==null||c.addEventListener("click",()=>{Ie.selectedDates.clear(),Dn()}),(f=document.getElementById("btn-apply-date-picker"))==null||f.addEventListener("click",dl),(p=document.getElementById("btn-add-order-item"))==null||p.addEventListener("click",()=>{nn.push({id:`item_${Date.now()}`,name:`注文品目 ${nn.length+1}`,price:500,max:10}),gr()}),(b=document.getElementById("btn-add-question"))==null||b.addEventListener("click",()=>{se.push({id:`q_${Date.now()}`,type:"single",title:`設問 ${se.length+1}`,required:!1,options:[{label:"選択肢 1",skip_to:null},{label:"選択肢 2",skip_to:null}],help:""}),Xt()}),(h=document.getElementById("btn-save-survey"))==null||h.addEventListener("click",ll),(g=document.getElementById("btn-close-survey-editor"))==null||g.addEventListener("click",Gs),(m=document.getElementById("btn-cancel-survey-editor"))==null||m.addEventListener("click",Gs),(y=document.getElementById("btn-close-survey-results"))==null||y.addEventListener("click",cl),(x=document.getElementById("btn-export-survey-csv"))==null||x.addEventListener("click",bl),(E=document.getElementById("btn-respond-add-family"))==null||E.addEventListener("click",()=>{sn.push({name:"",role:"選手"}),wa&&br(wa)}),(k=document.getElementById("btn-submit-survey-response"))==null||k.addEventListener("click",wl),(_=document.getElementById("btn-back-from-survey-respond"))==null||_.addEventListener("click",()=>{if(bn){const v=document.getElementById("survey-respond-view");v&&v.classList.add("hidden");const w=document.getElementById("info-view");w&&w.classList.remove("hidden"),Wn()}else{const v=document.getElementById("survey-respond-view");v&&v.classList.add("hidden");const w=document.getElementById("auth-view");w&&w.classList.remove("hidden")}}),(S=document.getElementById("btn-survey-error-reload"))==null||S.addEventListener("click",()=>{window.location.reload()}),(I=document.getElementById("btn-survey-error-home"))==null||I.addEventListener("click",()=>{window.location.href=window.location.pathname}))}let et=null,$t=null,Ws="user",cn=!1,Vt="docs",at=[],Xe=[],ts="すべて",ns="すべて",Ea="",Hn="";const as="ants_info_documents_v1",ss="ants_info_links_v1",Co="ants_info_top_md_v1",El=`## 🐜 Arinko Ants チーム情報 &amp; ドキュメントポータル
本ポータルでは、チーム運営に関する**各種マニュアル（配車・当番・緊急対応）**の閲覧、**合宿・イベント出欠アンケート（日程調整・お弁当注文）**の実施、および**グラウンド地図や公式連盟などの便利リンク集**を一元管理しています。

> [!NOTE]
> - **配車調整マニュアル**や**当番業務の手引き**は「ドキュメント」タブよりいつでも閲覧・ダウンロード可能です。
> - 夏季合宿やイベントの日程調整・注文アンケートは「アンケート」タブから回答できます（ゲスト回答も可能）。
`,zr=[{id:"doc-manual-dispatch",title:"配車調整機能 利用者マニュアル",category:"配車マニュアル",summary:"少年野球チーム「Arinko Ants」の活動におけるイベント配車の自動作成・手動微調整・LINE案内出力までの全体操作マニュアルです。",content:`# 配車調整機能 利用者マニュアル

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
  - [ ] 倉庫施錠および学校鍵の返却`,files:[],created_by:"父母会",updated_at:"2026-04-01"}],Wr=[{id:"link-official-site",title:"Arinko Ants 公式ホームページ",url:"https://arinkoants.sakura.ne.jp/",category:"公式・連盟",description:"チームの公式Webサイト。チーム紹介、選手募集案内、活動予定などが掲載されています。",icon:"🐜",display_order:1},{id:"link-google-calendar",title:"チーム活動予定 Googleカレンダー",url:"https://calendar.google.com/",category:"スケジュール・連絡",description:"練習日、遠征試合、大会スケジュールが登録されているGoogleカレンダーです。",icon:"📅",display_order:2},{id:"link-nagareyama-league",title:"流山市少年野球連盟 公式サイト",url:"http://nagareyama-baseball.jp/",category:"公式・連盟",description:"市内大会の組み合わせトーナメント表、試合日程、グラウンド規程などが確認できます。",icon:"⚾",display_order:3},{id:"link-chiba-league",title:"千葉県少年野球連盟",url:"http://chiba-baseball.jp/",category:"公式・連盟",description:"千葉県大会の要項、大会結果、競技規則の最新情報が掲載されています。",icon:"🏆",display_order:4},{id:"link-ground-map",title:"主な活動グラウンド案内 (Google Maps)",url:"https://maps.google.com/",category:"グラウンド・施設",description:"ホームグラウンド（東小学校）および近隣の流山市内グラウンドへのアクセス地図一覧です。",icon:"📍",display_order:5},{id:"link-weather-forecast",title:"流山市のピンポイント天気予報 (tenki.jp)",url:"https://tenki.jp/forecast/3/15/4510/12220/",category:"便利ツール",description:"当日の雨雲レーダー、1時間ごとの降水確率、風速、WBGT（熱中症指数）を確認できます。",icon:"☀️",display_order:6},{id:"link-baseball-rules",title:"公認野球規則 & 少年野球特別規則",url:"https://japan-baseball.jp/",category:"便利ツール",description:"全日本軟式野球連盟（JSBB）による少年野球特別規程および公認野球規則の解説です。",icon:"📖",display_order:7}],No=["すべて","配車マニュアル","チーム運営・規約","野球ルール・スコア","その他"],Mo=["すべて","公式・連盟","グラウンド・施設","スケジュール・連絡","便利ツール","その他"];async function Ga({supabaseClient:e,currentUser:t,currentUserRole:n}){et=e,$t=t,Ws=n,cn=n==="admin"||(t==null?void 0:t.can_edit_info)===!0||n==="leader"&&(t==null?void 0:t.can_edit_info)!==!1,_l(),await $l(),await Zd({supabaseClient:et,currentUser:$t,currentUserRole:Ws,canManageInfo:cn}),Ul(),Oo(),Fo()}function _l(){document.querySelectorAll(".info-admin-only").forEach(n=>{cn?n.classList.remove("hidden"):n.classList.add("hidden")});const t=document.getElementById("info-user-role-badge");t&&(Ws==="admin"?(t.className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-purple-100 text-purple-700 border border-purple-200",t.textContent="管理者 (編集可)"):cn?(t.className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-teal-100 text-teal-700 border border-teal-200",t.textContent="編集可"):(t.className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-gray-100 text-gray-700 border border-gray-200",t.textContent="閲覧専用"))}async function $l(){let e=!1,t=!1,n=!1;if(et){try{const{data:a,error:s}=await et.from("info_documents").select("*").order("updated_at",{ascending:!1});!s&&a&&a.length>0&&(at=a,e=!0)}catch(a){console.warn("Supabase info_documents select failed:",a)}try{const{data:a,error:s}=await et.from("info_links").select("*").order("display_order",{ascending:!0});!s&&a&&a.length>0&&(Xe=a,t=!0)}catch(a){console.warn("Supabase info_links select failed:",a)}try{const{data:a,error:s}=await et.from("info_pages").select("*").eq("id","top_announcement").single();!s&&a&&a.content&&(Hn=a.content,n=!0)}catch(a){console.warn("Supabase info_pages select failed:",a)}}if(!e)try{const a=localStorage.getItem(as);a?at=JSON.parse(a):(at=[...zr],localStorage.setItem(as,JSON.stringify(at)))}catch{at=[...zr]}if(!t)try{const a=localStorage.getItem(ss);a?Xe=JSON.parse(a):(Xe=[...Wr],localStorage.setItem(ss,JSON.stringify(Xe)))}catch{Xe=[...Wr]}if(!n){const a=localStorage.getItem(Co);Hn=a!==null?a:El}}async function Po(e,t=!1){const n=at.findIndex(a=>a.id===e.id);n>=0?at[n]=e:at.unshift(e);try{localStorage.setItem(as,JSON.stringify(at))}catch(a){console.error(a)}if(et)try{t?await et.from("info_documents").insert([e]):await et.from("info_documents").update(e).eq("id",e.id)}catch(a){console.warn("Supabase document save failed:",a)}}async function Il(e){at=at.filter(t=>t.id!==e);try{localStorage.setItem(as,JSON.stringify(at))}catch(t){console.error(t)}if(et)try{await et.from("info_documents").delete().eq("id",e)}catch(t){console.warn("Supabase document delete failed:",t)}}async function Ro(e,t=!1){const n=Xe.findIndex(a=>a.id===e.id);n>=0?Xe[n]=e:Xe.push(e);try{localStorage.setItem(ss,JSON.stringify(Xe))}catch(a){console.error(a)}if(et)try{t?await et.from("info_links").insert([e]):await et.from("info_links").update(e).eq("id",e.id)}catch(a){console.warn("Supabase link save failed:",a)}}async function Sl(e){Xe=Xe.filter(t=>t.id!==e);try{localStorage.setItem(ss,JSON.stringify(Xe))}catch(t){console.error(t)}if(et)try{await et.from("info_links").delete().eq("id",e)}catch(t){console.warn("Supabase link delete failed:",t)}}async function kl(e){Hn=e;try{localStorage.setItem(Co,e)}catch(t){console.error(t)}if(et)try{await et.from("info_pages").upsert([{id:"top_announcement",content:e,updated_at:new Date().toISOString(),updated_by:($t==null?void 0:$t.name)||"管理者"}])}catch(t){console.warn("Supabase top_announcement save failed:",t)}Oo()}function Oo(){const e=document.getElementById("info-top-announcement-rendered"),t=document.getElementById("info-top-announcement-wrap");!e||!t||(Hn&&Hn.trim()?(t.classList.remove("hidden"),e.innerHTML=hs(Hn)):t.classList.add("hidden"))}function Fo(){Ho(),Vt==="docs"?pa():Vt==="surveys"?Wn():fa()}function Ho(){const e=document.getElementById("info-category-filters");if(!e)return;if(Vt==="surveys"){e.classList.add("hidden");return}e.classList.remove("hidden");const t=Vt==="docs"?No:Mo,n=Vt==="docs"?ts:ns;e.innerHTML=t.map(a=>`<button class="info-cat-btn px-3.5 py-1.5 text-xs rounded-full transition-all cursor-pointer ${n===a?"bg-teal-600 text-white shadow-sm font-bold":"bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}" data-category="${a}">${a}</button>`).join(""),e.querySelectorAll(".info-cat-btn").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-category");Vt==="docs"?(ts=s,pa()):(ns=s,fa()),Ho()})})}function pa(){const e=document.getElementById("info-docs-container"),t=document.getElementById("info-docs-empty");if(!e)return;let n=at;if(ts!=="すべて"&&(n=n.filter(a=>a.category===ts)),Ea.trim()){const a=Ea.toLowerCase().trim();n=n.filter(s=>s.title&&s.title.toLowerCase().includes(a)||s.summary&&s.summary.toLowerCase().includes(a)||s.content&&s.content.toLowerCase().includes(a)||s.category&&s.category.toLowerCase().includes(a))}if(n.length===0){e.innerHTML="",t&&t.classList.remove("hidden");return}t&&t.classList.add("hidden"),e.innerHTML=n.map(a=>{const s=hr(a.category),r=a.files?a.files.length:0;return`
            <div class="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between group">
                <div>
                    <div class="flex items-center justify-between gap-2 mb-2.5">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${s}">
                            ${a.category||"その他"}
                        </span>
                        <span class="text-[11px] text-gray-400 font-mono">更新: ${a.updated_at||"-"}</span>
                    </div>
                    <h3 class="text-base font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                        ${At(a.title)}
                    </h3>
                    <p class="text-xs text-gray-600 line-clamp-3 mb-3 leading-relaxed">
                        ${At(a.summary||a.content.slice(0,100))}
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
                    ${cn?`
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
        `}).join(""),e.querySelectorAll(".btn-view-doc").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id"),r=at.find(o=>o.id===s);r&&Al(r)})}),cn&&(e.querySelectorAll(".btn-duplicate-doc").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id");await Ll(s)})}),e.querySelectorAll(".btn-edit-doc").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id"),r=at.find(o=>o.id===s);r&&qo(r)})}),e.querySelectorAll(".btn-delete-doc").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id"),r=at.find(o=>o.id===s);r&&confirm(`ドキュメント「${r.title}」を削除しますか？`)&&(await Il(s),pa())})}))}async function Ll(e){const t=at.find(a=>a.id===e);if(!t)return;const n=JSON.parse(JSON.stringify(t));n.id=`doc_${Date.now()}`,n.title=`(複製) ${t.title}`,n.created_at=new Date().toISOString(),n.updated_at=new Date().toISOString(),n.author_name=($t==null?void 0:$t.name)||"管理者",await Po(n,!0),pa(),alert(`ドキュメント「${n.title}」を作成（複製）しました！`)}function fa(){const e=document.getElementById("info-links-container"),t=document.getElementById("info-links-empty");if(!e)return;let n=Xe;if(ns!=="すべて"&&(n=n.filter(a=>a.category===ns)),Ea.trim()){const a=Ea.toLowerCase().trim();n=n.filter(s=>s.title&&s.title.toLowerCase().includes(a)||s.description&&s.description.toLowerCase().includes(a)||s.url&&s.url.toLowerCase().includes(a)||s.category&&s.category.toLowerCase().includes(a))}if(n.length===0){e.innerHTML="",t&&t.classList.remove("hidden");return}t&&t.classList.add("hidden"),e.innerHTML=n.map(a=>{const s=hr(a.category),r=a.icon||"🔗",o=a.url?a.url.replace(/^https?:\/\//,"").replace(/\/$/,""):"";return`
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
                        ${At(a.title)}
                    </h3>
                    <p class="text-xs text-gray-400 font-mono mb-2 truncate" title="${At(a.url)}">
                        ${At(o)}
                    </p>
                    <p class="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3">
                        ${At(a.description||"説明はありません")}
                    </p>
                </div>
                <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <a href="${At(a.url)}" target="_blank" rel="noopener noreferrer" 
                       class="inline-flex items-center text-xs font-bold bg-teal-50 hover:bg-teal-600 text-teal-700 hover:text-white px-3 py-1.5 rounded-lg transition duration-150 cursor-pointer">
                        <span>サイトを開く</span>
                        <svg class="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                    ${cn?`
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
        `}).join(""),cn&&(e.querySelectorAll(".btn-duplicate-link").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id");await Bl(s)})}),e.querySelectorAll(".btn-edit-link").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id"),r=Xe.find(o=>o.id===s);r&&Uo(r)})}),e.querySelectorAll(".btn-delete-link").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id"),r=Xe.find(o=>o.id===s);r&&confirm(`リンク「${r.title}」を削除しますか？`)&&(await Sl(s),fa())})}))}async function Bl(e){const t=Xe.find(a=>a.id===e);if(!t)return;const n=JSON.parse(JSON.stringify(t));n.id=`link_${Date.now()}`,n.title=`(複製) ${t.title}`,n.created_at=new Date().toISOString(),n.display_order=(t.display_order||0)+1,await Ro(n,!0),fa(),alert(`リンク「${n.title}」を作成（複製）しました！`)}function hr(e){switch(e){case"配車マニュアル":return"bg-blue-100 text-blue-800 border border-blue-200";case"チーム運営・規約":return"bg-amber-100 text-amber-800 border border-amber-200";case"野球ルール・スコア":return"bg-green-100 text-green-800 border border-green-200";case"公式・連盟":return"bg-purple-100 text-purple-800 border border-purple-200";case"グラウンド・施設":return"bg-emerald-100 text-emerald-800 border border-emerald-200";case"スケジュール・連絡":return"bg-sky-100 text-sky-800 border border-sky-200";case"便利ツール":return"bg-indigo-100 text-indigo-800 border border-indigo-200";default:return"bg-gray-100 text-gray-700 border border-gray-200"}}let rs=null;function Al(e){const t=document.getElementById("modal-info-doc-reader");if(!t)return;rs=e,document.getElementById("reader-doc-title").textContent=e.title,document.getElementById("reader-doc-category").textContent=e.category||"その他",document.getElementById("reader-doc-category").className=`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${hr(e.category)}`,document.getElementById("reader-doc-updated").textContent=`最終更新: ${e.updated_at||"-"} (作成: ${e.created_by||"チーム"})`;const n=document.getElementById("reader-doc-files-container"),a=document.getElementById("reader-doc-files-list");n&&a&&(e.files&&e.files.length>0?(n.classList.remove("hidden"),a.innerHTML=e.files.map(r=>`
                <a href="${r.dataUrl||"#"}" download="${At(r.name)}" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-teal-50 text-gray-700 hover:text-teal-700 border border-gray-200 text-xs font-bold transition">
                    <span>📎</span>
                    <span>${At(r.name)}</span>
                    <span class="text-[10px] text-gray-400 font-normal">(${Math.round((r.size||0)/1024)}KB)</span>
                </a>
            `).join("")):(n.classList.add("hidden"),a.innerHTML=""));const s=document.getElementById("reader-doc-content");s&&(s.innerHTML=hs(e.content||"",!0),xr(s)),t.classList.remove("hidden")}function Tl(){const e=document.getElementById("modal-info-doc-reader");e&&e.classList.add("hidden"),rs=null}function Dl(){if(!rs)return;const e=rs,t=new Blob([e.content||""],{type:"text/markdown;charset=utf-8;"}),n=document.createElement("a");n.href=URL.createObjectURL(t),n.download=`${e.title||"document"}.md`,n.click()}let os=null,qn=[];function qo(e=null){const t=document.getElementById("modal-info-doc-editor");if(!t)return;os=e?e.id:null,qn=e&&e.files?JSON.parse(JSON.stringify(e.files)):[],document.getElementById("doc-editor-modal-title").textContent=e?"ドキュメントの編集":"新規ドキュメント作成",document.getElementById("input-doc-title").value=e?e.title:"",document.getElementById("input-doc-summary").value=e&&e.summary||"",document.getElementById("input-doc-content").value=e?e.content:"";const n=document.getElementById("select-doc-category");n.innerHTML=No.filter(a=>a!=="すべて").map(a=>`<option value="${a}" ${e&&e.category===a?"selected":""}>${a}</option>`).join(""),yr(),Ys("write"),t.classList.remove("hidden")}function Js(){const e=document.getElementById("modal-info-doc-editor");e&&e.classList.add("hidden"),os=null,qn=[]}function yr(){const e=document.getElementById("doc-editor-files-list");if(e){if(qn.length===0){e.innerHTML='<span class="text-xs text-gray-400">添付ファイルはありません</span>';return}e.innerHTML=qn.map((t,n)=>`
        <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 border border-gray-200 text-xs text-gray-700">
            <span>📎 ${At(t.name)} (${Math.round((t.size||0)/1024)}KB)</span>
            <button class="btn-del-file text-red-500 hover:text-red-700 font-bold ml-1" data-index="${n}">✕</button>
        </div>
    `).join(""),e.querySelectorAll(".btn-del-file").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-index"));qn.splice(n,1),yr()})})}}function Cl(e){Array.from(e).forEach(t=>{if(t.size>5*1024*1024){alert(`ファイル「${t.name}」が5MBを超えているため添付できません。`);return}const n=new FileReader;n.onload=a=>{qn.push({name:t.name,size:t.size,type:t.type,dataUrl:a.target.result}),yr()},n.readAsDataURL(t)})}function Nl(e){if(!e)return;const t=new FileReader;t.onload=n=>{const a=n.target.result,s=document.getElementById("input-doc-title"),r=document.getElementById("input-doc-content");s&&(!s.value||s.value.trim()==="")&&(s.value=e.name.replace(/\.md$/i,"")),r&&(r.value=a)},t.readAsText(e)}function Ys(e){const t=document.getElementById("btn-doc-tab-write"),n=document.getElementById("btn-doc-tab-preview"),a=document.getElementById("input-doc-content"),s=document.getElementById("doc-preview-content");e==="write"?(t==null||t.classList.add("bg-white","text-teal-700","shadow-xs"),t==null||t.classList.remove("text-gray-500"),n==null||n.classList.remove("bg-white","text-teal-700","shadow-xs"),n==null||n.classList.add("text-gray-500"),a==null||a.classList.remove("hidden"),s==null||s.classList.add("hidden")):(n==null||n.classList.add("bg-white","text-teal-700","shadow-xs"),n==null||n.classList.remove("text-gray-500"),t==null||t.classList.remove("bg-white","text-teal-700","shadow-xs"),t==null||t.classList.add("text-gray-500"),a==null||a.classList.add("hidden"),s==null||s.classList.remove("hidden"),s&&a&&(s.innerHTML=hs(a.value||"*本文が入力されていません*"),xr(s)))}async function Ml(){var i,d,l,u;const e=(i=document.getElementById("input-doc-title"))==null?void 0:i.value.trim(),t=(d=document.getElementById("select-doc-category"))==null?void 0:d.value,n=(l=document.getElementById("input-doc-summary"))==null?void 0:l.value.trim(),a=(u=document.getElementById("input-doc-content"))==null?void 0:u.value.trim();if(!e){alert("タイトルを入力してください");return}if(!a){alert("本文を入力してください");return}const s=new Date().toISOString().split("T")[0],r=!os,o={id:os||`doc_${Date.now()}`,title:e,category:t,summary:n||a.slice(0,100),content:a,files:qn,created_by:($t==null?void 0:$t.name)||"管理者",updated_at:s};await Po(o,r),Js(),pa()}function Pl(){const e=document.getElementById("modal-info-top-editor");if(!e)return;const t=document.getElementById("input-info-top-content");t&&(t.value=Hn),Qs("write"),e.classList.remove("hidden")}function Ks(){const e=document.getElementById("modal-info-top-editor");e&&e.classList.add("hidden")}function Qs(e){const t=document.getElementById("btn-top-tab-write"),n=document.getElementById("btn-top-tab-preview"),a=document.getElementById("input-info-top-content"),s=document.getElementById("top-preview-content");e==="write"?(t==null||t.classList.add("bg-white","text-teal-700","shadow-xs"),t==null||t.classList.remove("text-gray-500"),n==null||n.classList.remove("bg-white","text-teal-700","shadow-xs"),n==null||n.classList.add("text-gray-500"),a==null||a.classList.remove("hidden"),s==null||s.classList.add("hidden")):(n==null||n.classList.add("bg-white","text-teal-700","shadow-xs"),n==null||n.classList.remove("text-gray-500"),t==null||t.classList.remove("bg-white","text-teal-700","shadow-xs"),t==null||t.classList.add("text-gray-500"),a==null||a.classList.add("hidden"),s==null||s.classList.remove("hidden"),s&&a&&(s.innerHTML=hs(a.value||"*内容が入力されていません*"),xr(s)))}async function Rl(){var t;const e=(t=document.getElementById("input-info-top-content"))==null?void 0:t.value;await kl(e),Ks()}let ya=null;function Uo(e=null){const t=document.getElementById("modal-info-link-editor");if(!t)return;ya=e?e.id:null,document.getElementById("link-editor-modal-title").textContent=e?"リンクの編集":"新規リンク追加",document.getElementById("input-link-title").value=e?e.title:"",document.getElementById("input-link-url").value=e?e.url:"",document.getElementById("input-link-desc").value=e&&e.description||"",document.getElementById("input-link-icon").value=e&&e.icon||"🔗";const n=document.getElementById("select-link-category");n.innerHTML=Mo.filter(a=>a!=="すべて").map(a=>`<option value="${a}" ${e&&e.category===a?"selected":""}>${a}</option>`).join(""),t.classList.remove("hidden")}function Zs(){const e=document.getElementById("modal-info-link-editor");e&&e.classList.add("hidden"),ya=null}async function Ol(){var i,d,l,u,c,f;const e=(i=document.getElementById("input-link-title"))==null?void 0:i.value.trim(),t=(d=document.getElementById("input-link-url"))==null?void 0:d.value.trim(),n=(l=document.getElementById("select-link-category"))==null?void 0:l.value,a=(u=document.getElementById("input-link-desc"))==null?void 0:u.value.trim(),s=((c=document.getElementById("input-link-icon"))==null?void 0:c.value.trim())||"🔗";if(!e){alert("タイトルを入力してください");return}if(!t){alert("URLを入力してください");return}if(!t.startsWith("http://")&&!t.startsWith("https://")){alert("URLは http:// または https:// から入力してください");return}const r=!ya,o={id:ya||`link_${Date.now()}`,title:e,url:t,category:n,description:a,icon:s,display_order:r?Xe.length+1:((f=Xe.find(p=>p.id===ya))==null?void 0:f.display_order)||1,created_by:($t==null?void 0:$t.name)||"管理者",updated_at:new Date().toISOString().split("T")[0]};await Ro(o,r),Zs(),fa()}const jo=`-- ==========================================
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
`;function Fl(){const e=document.getElementById("modal-info-sql");if(!e)return;const t=document.getElementById("info-sql-code");t&&(t.textContent=jo),e.classList.remove("hidden")}function Hl(){const e=document.getElementById("modal-info-sql");e&&e.classList.add("hidden")}function ql(){navigator.clipboard.writeText(jo).then(()=>{alert(`SQL文をクリップボードにコピーしました！
Supabase Dashboardの「SQL Editor」で実行してください。`)}).catch(e=>{console.error("Copy failed:",e)})}let Jr=!1;function Ul(){var f,p,b,h,g,m,y,x,E,k,_,S,I,v,w,$,A,P,R;if(Jr)return;Jr=!0;const e=document.getElementById("tab-info-docs"),t=document.getElementById("tab-info-surveys"),n=document.getElementById("tab-info-links"),a=document.getElementById("view-info-docs"),s=document.getElementById("view-info-surveys"),r=document.getElementById("view-info-links"),o=document.getElementById("btn-info-new"),i=document.getElementById("btn-survey-new");function d(D){Vt=D,[e,t,n].forEach(M=>{M&&(M.className="px-4 py-2 font-bold text-gray-500 hover:text-gray-700 border-b-2 border-transparent transition-colors flex items-center space-x-2 cursor-pointer")}),[a,s,r].forEach(M=>M==null?void 0:M.classList.add("hidden")),D==="docs"?(e.className="px-4 py-2 font-bold text-teal-600 border-b-2 border-teal-600 transition-colors flex items-center space-x-2 cursor-pointer",a==null||a.classList.remove("hidden"),o&&(o.classList.remove("hidden"),o.textContent="＋ 新規ドキュメント"),i&&i.classList.add("hidden")):D==="surveys"?(t.className="px-4 py-2 font-bold text-teal-600 border-b-2 border-teal-600 transition-colors flex items-center space-x-2 cursor-pointer",s==null||s.classList.remove("hidden"),o&&o.classList.add("hidden"),i&&cn&&i.classList.remove("hidden")):(n.className="px-4 py-2 font-bold text-teal-600 border-b-2 border-teal-600 transition-colors flex items-center space-x-2 cursor-pointer",r==null||r.classList.remove("hidden"),o&&(o.classList.remove("hidden"),o.textContent="＋ 新規リンク"),i&&i.classList.add("hidden")),Fo()}e==null||e.addEventListener("click",()=>d("docs")),t==null||t.addEventListener("click",()=>d("surveys")),n==null||n.addEventListener("click",()=>d("links"));const l=document.getElementById("input-info-search");l==null||l.addEventListener("input",D=>{Ea=D.target.value,Vt==="docs"?pa():Vt==="links"&&fa()}),o==null||o.addEventListener("click",()=>{Vt==="docs"?qo():Vt==="links"&&Uo()}),(f=document.getElementById("btn-edit-top-announcement"))==null||f.addEventListener("click",Pl),(p=document.getElementById("btn-close-top-editor"))==null||p.addEventListener("click",Ks),(b=document.getElementById("btn-cancel-top-editor"))==null||b.addEventListener("click",Ks),(h=document.getElementById("btn-top-tab-write"))==null||h.addEventListener("click",()=>Qs("write")),(g=document.getElementById("btn-top-tab-preview"))==null||g.addEventListener("click",()=>Qs("preview")),(m=document.getElementById("btn-save-top-announcement"))==null||m.addEventListener("click",Rl),(y=document.getElementById("btn-close-doc-reader"))==null||y.addEventListener("click",Tl),(x=document.getElementById("btn-export-doc-md"))==null||x.addEventListener("click",Dl),(E=document.getElementById("btn-close-doc-editor"))==null||E.addEventListener("click",Js),(k=document.getElementById("btn-cancel-doc-editor"))==null||k.addEventListener("click",Js),(_=document.getElementById("btn-doc-tab-write"))==null||_.addEventListener("click",()=>Ys("write")),(S=document.getElementById("btn-doc-tab-preview"))==null||S.addEventListener("click",()=>Ys("preview")),(I=document.getElementById("btn-save-doc"))==null||I.addEventListener("click",Ml);const u=document.getElementById("input-doc-attach-files");u==null||u.addEventListener("change",D=>{D.target.files&&Cl(D.target.files)});const c=document.getElementById("input-doc-import-md");c==null||c.addEventListener("change",D=>{D.target.files&&D.target.files[0]&&Nl(D.target.files[0])}),(v=document.getElementById("btn-close-link-editor"))==null||v.addEventListener("click",Zs),(w=document.getElementById("btn-cancel-link-editor"))==null||w.addEventListener("click",Zs),($=document.getElementById("btn-save-link"))==null||$.addEventListener("click",Ol),(A=document.getElementById("btn-info-sql-modal"))==null||A.addEventListener("click",Fl),(P=document.getElementById("btn-close-info-sql"))==null||P.addEventListener("click",Hl),(R=document.getElementById("btn-copy-info-sql"))==null||R.addEventListener("click",ql)}function hs(e,t=!1){if(!e)return"";const n=e.split(`
`);let a="",s=!1,r=!1,o=!1,i="",d=!1,l=[],u=!1,c="",f="";const p=[];function b(){s&&(a+=`</ul>
`,s=!1),r&&(a+=`</ol>
`,r=!1),d&&(a+=Yr(l),l=[],d=!1),u&&(a+=jl(c,f),f="",u=!1)}for(let h=0;h<n.length;h++){let g=n[h];if(g.trim().startsWith("```")){o?(a+=`
                    <div class="relative my-3 group">
                        <pre class="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-xs font-mono border border-gray-800 leading-relaxed"><code>${At(i.trim())}</code></pre>
                        <button class="btn-copy-code absolute top-2 right-2 px-2 py-1 text-[10px] font-bold rounded bg-gray-800 text-gray-300 hover:text-white border border-gray-700 opacity-0 group-hover:opacity-100 transition">コピー</button>
                    </div>
`,i="",o=!1):(b(),o=!0,g.trim().slice(3).trim());continue}if(o){i+=g+`
`;continue}const m=g.trim().match(/^>\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]/i);if(m){b(),u=!0,c=m[1].toUpperCase(),f="";continue}if(u)if(g.startsWith(">")){f+=g.replace(/^>\s?/,"")+`
`;continue}else b();if(g.trim().startsWith("|")&&g.trim().endsWith("|")){d||(b(),d=!0,l=[]),l.push(g.trim());continue}else d&&(a+=Yr(l),l=[],d=!1);if(g.trim()===""){b();continue}if(/^(\*{3,}|-{3,}|_{3,})$/.test(g.trim())){b(),a+=`<hr class="my-6 border-t border-gray-200">
`;continue}if(g.startsWith("# ")){b();const E=g.slice(2).trim(),k=`heading-${p.length}`;p.push({level:1,text:E,id:k}),a+=`<h1 id="${k}" class="text-2xl font-bold text-gray-900 mt-6 mb-3 pb-2 border-b border-gray-200">${Ct(E)}</h1>
`;continue}if(g.startsWith("## ")){b();const E=g.slice(3).trim(),k=`heading-${p.length}`;p.push({level:2,text:E,id:k}),a+=`<h2 id="${k}" class="text-xl font-bold text-gray-800 mt-5 mb-2.5">${Ct(E)}</h2>
`;continue}if(g.startsWith("### ")){b();const E=g.slice(4).trim(),k=`heading-${p.length}`;p.push({level:3,text:E,id:k}),a+=`<h3 id="${k}" class="text-lg font-bold text-gray-800 mt-4 mb-2">${Ct(E)}</h3>
`;continue}if(g.startsWith("#### ")){b();const E=g.slice(5).trim();a+=`<h4 class="text-base font-semibold text-gray-700 mt-3 mb-1.5">${Ct(E)}</h4>
`;continue}if(g.startsWith("> ")){b(),a+=`<blockquote class="border-l-4 border-teal-500 pl-4 py-1.5 my-3 bg-teal-50/50 text-xs text-gray-700 rounded-r">${Ct(g.slice(2))}</blockquote>
`;continue}const y=g.trim().match(/^[-*]\s*\[([ xX])\]\s*(.*)/);if(y){b();const E=y[1].toLowerCase()==="x";a+=`
                <div class="flex items-center gap-2 my-1 text-xs text-gray-700">
                    <input type="checkbox" ${E?"checked":""} disabled class="rounded text-teal-600">
                    <span class="${E?"line-through text-gray-400":""}">${Ct(y[2])}</span>
                </div>
`;continue}if(g.trim().startsWith("- ")||g.trim().startsWith("* ")){r&&(a+=`</ol>
`,r=!1),s||(a+=`<ul class="list-disc list-inside my-2 space-y-1 text-xs text-gray-700 leading-relaxed">
`,s=!0);const E=g.trim().slice(2);a+=`  <li>${Ct(E)}</li>
`;continue}const x=g.trim().match(/^(\d+)\.\s+(.*)/);if(x){s&&(a+=`</ul>
`,s=!1),r||(a+=`<ol class="list-decimal list-inside my-2 space-y-1 text-xs text-gray-700 leading-relaxed">
`,r=!0),a+=`  <li>${Ct(x[2])}</li>
`;continue}b(),a+=`<p class="my-2 text-xs text-gray-700 leading-relaxed">${Ct(g)}</p>
`}return b(),t&&p.length>=2&&(a=`
            <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                <span class="text-xs font-bold text-gray-700 block mb-2">📑 目次</span>
                <ul class="space-y-1 text-xs">
                    ${p.map(g=>`
                        <li class="${g.level===2?"pl-3":g.level===3?"pl-6":""}">
                            <a href="#${g.id}" class="text-teal-600 hover:text-teal-800 hover:underline">
                                ${At(g.text)}
                            </a>
                        </li>
                    `).join("")}
                </ul>
            </div>
        `+a),a}function jl(e,t){let n="border-teal-500",a="bg-teal-50/70",s="text-teal-800",r="ℹ️",o="NOTE";e==="TIP"?(n="border-emerald-500",a="bg-emerald-50/70",s="text-emerald-800",r="💡",o="TIP"):e==="WARNING"||e==="CAUTION"?(n="border-amber-500",a="bg-amber-50/70",s="text-amber-800",r="⚠️",o="WARNING"):e==="IMPORTANT"&&(n="border-blue-500",a="bg-blue-50/70",s="text-blue-800",r="📌",o="IMPORTANT");const i=t.split(`
`).filter(d=>d.trim()).map(d=>`<p class="my-1 text-xs text-gray-700 leading-relaxed">${Ct(d)}</p>`).join("");return`
        <div class="border-l-4 ${n} ${a} p-3.5 my-3 rounded-r-xl border border-gray-200/50">
            <div class="flex items-center gap-1.5 font-bold text-xs ${s} mb-1">
                <span>${r}</span>
                <span>${o}</span>
            </div>
            ${i}
        </div>
    `}function Yr(e){if(e.length<2)return"";let t='<div class="overflow-x-auto my-4 scrollbar-thin"><table class="min-w-full text-xs border border-gray-200 rounded-xl overflow-hidden">';const n=e[0].split("|").slice(1,-1).map(a=>a.trim());t+='<thead class="bg-gray-50 border-b border-gray-200"><tr>',n.forEach(a=>{t+=`<th class="px-3.5 py-2.5 text-left font-bold text-gray-700 border-r border-gray-200 last:border-r-0">${Ct(a)}</th>`}),t+="</tr></thead><tbody>";for(let a=2;a<e.length;a++){const s=e[a].split("|").slice(1,-1).map(r=>r.trim());t+=`<tr class="${a%2===0?"bg-white":"bg-gray-50/40"} border-b border-gray-100 last:border-b-0 hover:bg-teal-50/30">`,s.forEach(r=>{t+=`<td class="px-3.5 py-2.5 text-gray-600 border-r border-gray-100 last:border-r-0">${Ct(r)}</td>`}),t+="</tr>"}return t+="</tbody></table></div>",t}function Ct(e){if(!e)return"";let t=At(e);return t=t.replace(/\*\*(.*?)\*\*/g,'<strong class="font-bold text-gray-900">$1</strong>'),t=t.replace(/\*(.*?)\*/g,'<em class="italic">$1</em>'),t=t.replace(/`([^`]+)`/g,'<code class="px-1.5 py-0.5 bg-gray-100 text-teal-700 rounded text-[11px] font-mono border border-gray-200">$1</code>'),t=t.replace(/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer" class="text-teal-600 hover:text-teal-800 underline font-semibold">$1 ↗</a>'),t}function xr(e){e.querySelectorAll(".btn-copy-code").forEach(t=>{t.addEventListener("click",()=>{var a;const n=((a=t.parentElement.querySelector("code"))==null?void 0:a.textContent)||"";navigator.clipboard.writeText(n).then(()=>{const s=t.textContent;t.textContent="コピー完了！",setTimeout(()=>{t.textContent=s},2e3)})})})}function At(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}const Go={},Gl="https://arcdgbzqfengqyvfbodt.supabase.co",Vl="sb_publishable_Ei6ti5lKjAECmi36haftpw_DQsKMp4p",ia=Go?"https://arcdgbzqfengqyvfbodt.supabase.co":Gl,is=Go?"sb_publishable_Ei6ti5lKjAECmi36haftpw_DQsKMp4p":Vl;ia.startsWith("https://")||console.warn("設定警告: VITE_SUPABASE_URL に https:// が含まれていません。値: "+ia);console.log("Checking Supabase URL:","Exists");if(!window.supabaseClient&&window.supabase&&window.supabase.createClient&&ia&&is)try{window.supabaseClient=window.supabase.createClient(ia,is)}catch(e){console.error("Supabase初期化エラー:",e)}const B=window.supabaseClient||null;let Y=null,da=!1,Ve="user";function ys(e){return e=e.trim(),e?e.includes("@")?e:`${e}@ants.local`:""}function jn(e){return e?e.endsWith("@ants.local")?e.split("@")[0]:e:""}let aa=0,jt=null;function zl(e){const t=document.getElementById("loading-overlay");if(t){const n=t.querySelector("span");n&&(n.textContent=e)}jt||(jt=document.createElement("div"),jt.id="loading-detail-text",jt.className="fixed bottom-2 right-2 text-xs md:text-sm font-bold text-gray-600 bg-white/90 border border-gray-300 px-3 py-1.5 rounded shadow-lg pointer-events-none z-[9999] transition-opacity duration-300",document.body.appendChild(jt)),jt.textContent=e,jt.style.opacity="1"}function W(e="通信中..."){aa++;const t=document.getElementById("loading-overlay");t&&aa===1&&t.classList.remove("hidden"),zl(e)}function V(){var e;aa--,aa<=0&&(aa=0,(e=document.getElementById("loading-overlay"))==null||e.classList.add("hidden"),jt&&(jt.style.opacity="0"))}function dt(){var e;aa=0,(e=document.getElementById("loading-overlay"))==null||e.classList.add("hidden"),jt&&(jt.style.opacity="0")}async function Pe(e,t="通信中..."){W(t);try{return await e()}catch(n){throw console.error("Supabase DB Error:",n),dt(),n.message==="Load failed"||n.message==="Failed to fetch"?alert(`サーバー通信エラー: 通信に失敗しました。
ネットワーク接続、または環境変数(Supabase URL)の設定が正しいか確認してください。`):alert(`サーバー通信エラー:
`+n.message),n}finally{V()}}async function le(e,t){if(Y&&e!=="NAVIGATE")try{await B.from("action_logs").insert({user_email:Y.email,action_type:e,details:t})}catch(n){console.error("Log error:",n)}}function Kr(){var e,t,n,a,s,r,o,i,d,l,u,c,f,p,b,h,g,m,y,x,E,k,_,S,I,v,w,$,A,P,R,D,M,C,L,T,N,H,J,G,Q,q,Z,U,ae,re;if(!window.isDomInitialized)try{if(window.isDomInitialized=!0,document.title="bb-sys for arinko ants.",document.body){const X=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,!1);let fe;for(;fe=X.nextNode();)fe.nodeValue.includes("配車調整アプリ")&&(fe.nodeValue=fe.nodeValue.replace(/配車調整アプリ/g,"bb-sys for arinko ants.")),fe.nodeValue.includes("少年野球に役立つツール for arinko ants.")&&(fe.nodeValue=fe.nodeValue.replace(/少年野球に役立つツール for arinko ants./g,"bb-sys for arinko ants."))}document.documentElement.style.setProperty("--layout-columns",tr),window.addEventListener("resize",Zr),Zr(),(e=document.getElementById("btn-login"))==null||e.addEventListener("click",Qr),(t=document.getElementById("auth-form"))==null||t.addEventListener("submit",Qr),(n=document.getElementById("btn-logout"))==null||n.addEventListener("click",Ra),(a=document.getElementById("btn-logout-menu"))==null||a.addEventListener("click",Ra),(s=document.getElementById("btn-clear-cache"))==null||s.addEventListener("click",Wl),(r=document.getElementById("link-to-signup"))==null||r.addEventListener("click",X=>{X.preventDefault(),oe("signup-view")}),(o=document.getElementById("link-to-reset"))==null||o.addEventListener("click",X=>{X.preventDefault(),oe("password-reset-view")}),document.querySelectorAll(".link-back-to-login").forEach(X=>X.addEventListener("click",fe=>{fe.preventDefault(),oe("auth-view")})),(i=document.getElementById("btn-submit-signup"))==null||i.addEventListener("click",Jl),(d=document.getElementById("btn-send-reset"))==null||d.addEventListener("click",Yl),(l=document.getElementById("btn-update-password"))==null||l.addEventListener("click",Kl),(u=document.getElementById("btn-change-password"))==null||u.addEventListener("click",()=>{var X;(X=document.getElementById("change-password-modal"))==null||X.classList.remove("hidden")}),(c=document.getElementById("btn-close-change-password"))==null||c.addEventListener("click",()=>{var X;(X=document.getElementById("change-password-modal"))==null||X.classList.add("hidden")}),(f=document.getElementById("btn-submit-change-password"))==null||f.addEventListener("click",Ql);const me=document.getElementById("btn-change-password");me&&(me.textContent="パスワード変更"),(p=document.getElementById("nav-users"))==null||p.addEventListener("click",_a),(b=document.getElementById("btn-admin-add-user"))==null||b.addEventListener("click",adminAddUser),(h=document.getElementById("btn-reload-users"))==null||h.addEventListener("click",be),(g=document.getElementById("btn-save-all-users"))==null||g.addEventListener("click",Zl),(m=document.getElementById("admin-users-sort"))==null||m.addEventListener("change",X=>{localStorage.setItem("admin_users_sort",X.target.value),be()}),(y=document.getElementById("btn-export-users"))==null||y.addEventListener("click",Hc),(x=document.getElementById("btn-import-users"))==null||x.addEventListener("click",()=>document.getElementById("input-import-users-csv").click()),(E=document.getElementById("btn-download-users-sample"))==null||E.addEventListener("click",Gc),(k=document.getElementById("input-import-users-csv"))==null||k.addEventListener("change",qc),(_=document.getElementById("btn-close-csv-modal"))==null||_.addEventListener("click",cs),(S=document.getElementById("btn-close-csv-modal-x"))==null||S.addEventListener("click",cs),(I=document.getElementById("btn-execute-csv-import"))==null||I.addEventListener("click",Uc);const ve=document.getElementById("btn-admin-add-user");if(ve&&!document.getElementById("btn-admin-add-dummy-user")){const X=document.createElement("button");X.id="btn-admin-add-dummy-user",X.className="ml-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow font-bold text-sm",X.textContent="代行専用メンバー追加",X.onclick=adminAddDummyUser,(v=ve.parentNode)==null||v.appendChild(X)}const rt=document.querySelector("#view-master #btn-load-logs");rt&&rt.remove();const pe=document.querySelector("#view-master #log-list");if(pe){const X=pe.closest(".bg-white");X?X.remove():pe.remove()}document.querySelectorAll("#view-master h2").forEach(X=>{X.textContent.includes("操作ログ")&&X.remove()});const mt=document.getElementById("tab-master-admin");if(mt&&!document.getElementById("tab-logs-admin")){const X=mt.parentElement,fe=document.createElement("button");fe.id="tab-logs-admin",fe.className="px-4 py-2 font-bold text-gray-500 hover:text-gray-700 border-b-2 border-transparent transition-colors",fe.textContent="操作ログ",X==null||X.appendChild(fe);const Ne=document.createElement("div");Ne.id="tab-content-logs-admin",Ne.className="hidden",Ne.innerHTML=`
                <div class="mb-4 flex space-x-2 mt-4">
                    <button id="btn-load-logs" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow font-bold">最新を読み込み</button>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
                    <div id="log-list" class="min-w-[600px] text-sm flex flex-col">
                        <p class="text-gray-500 py-4 text-center">「最新を読み込み」ボタンを押してください</p>
                    </div>
                </div>
            `;const je=document.getElementById("tab-content-master-admin");je&&je.parentElement&&je.parentElement.appendChild(Ne)}const Ue=X=>{[{btnId:"tab-users-admin",contentId:"tab-content-users-admin"},{btnId:"tab-master-admin",contentId:"tab-content-master-admin"},{btnId:"tab-logs-admin",contentId:"tab-content-logs-admin"}].forEach(Ne=>{const je=document.getElementById(Ne.btnId),Lt=document.getElementById(Ne.contentId);!je||!Lt||(Ne.btnId===X?(je.className="px-4 py-2 font-bold text-blue-600 border-b-2 border-blue-600 transition-colors",Lt.classList.remove("hidden"),X==="tab-logs-admin"&&$a()):(je.className="px-4 py-2 font-bold text-gray-500 hover:text-gray-700 border-b-2 border-transparent transition-colors",Lt.classList.add("hidden")))})};(w=document.getElementById("tab-users-admin"))==null||w.addEventListener("click",()=>Ue("tab-users-admin")),($=document.getElementById("tab-master-admin"))==null||$.addEventListener("click",()=>Ue("tab-master-admin")),(A=document.getElementById("tab-logs-admin"))==null||A.addEventListener("click",()=>Ue("tab-logs-admin")),(P=document.getElementById("btn-load-logs"))==null||P.addEventListener("click",$a),(R=document.getElementById("btn-app-dispatch"))==null||R.addEventListener("click",()=>{var X;oe("app-view","dispatch"),da?(X=document.getElementById("nav-dispatch"))==null||X.click():er()}),(D=document.getElementById("btn-app-attendance"))==null||D.addEventListener("click",async()=>{oe("attendance-view"),await Pe(Ps,"出欠管理画面を準備中...")}),(M=document.getElementById("btn-app-dashboard"))==null||M.addEventListener("click",async()=>{await Pe(Os,"ダッシュボードを準備中..."),oe("dashboard-view")}),(C=document.getElementById("btn-app-info"))==null||C.addEventListener("click",async()=>{await Pe(async()=>{await Ga({supabaseClient:B,currentUser:Y,currentUserRole:Ve})},"Info画面を準備中..."),oe("info-view")}),(L=document.getElementById("btn-back-to-menu-info"))==null||L.addEventListener("click",()=>oe("app-menu-view")),(T=document.getElementById("btn-logout-info"))==null||T.addEventListener("click",Ra),(N=document.getElementById("btn-back-to-menu"))==null||N.addEventListener("click",()=>{oe("app-menu-view")}),(H=document.getElementById("btn-back-to-menu-att"))==null||H.addEventListener("click",()=>oe("app-menu-view")),(J=document.getElementById("btn-logout-att"))==null||J.addEventListener("click",Ra),(G=document.getElementById("btn-change-password-menu"))==null||G.addEventListener("click",vr);const Yt=(Q=document.getElementById("app-menu-view"))==null?void 0:Q.querySelector(".space-y-4");Yt&&(Yt.className="w-full max-w-xs mx-auto space-y-3 mt-4");const Ut=document.getElementById("btn-app-dispatch");Ut&&(Ut.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-blue-600 hover:bg-blue-700 hover:shadow-lg text-white text-left",Ut.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">🚗</span><span>配車調整</span></div><span class="text-white/60 text-sm font-normal">❯</span>');const St=document.getElementById("btn-app-attendance");St&&(St.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-green-600 hover:bg-green-700 hover:shadow-lg text-white text-left",St.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">📅</span><span>出欠管理</span></div><span class="text-white/60 text-sm font-normal">❯</span>');const kt=document.getElementById("btn-app-simulator");kt&&(kt.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-amber-600 hover:bg-amber-700 hover:shadow-lg text-white text-left",kt.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">⚾</span><span>ポジション設定</span></div><span class="text-white/60 text-sm font-normal">❯</span>',kt.onclick=()=>{oe("position-simulator-view"),ja()});const Et=document.getElementById("btn-app-info");Et&&(Et.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-teal-600 hover:bg-teal-700 hover:shadow-lg text-white text-left",Et.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">ℹ️</span><span>Info</span></div><span class="text-white/60 text-sm font-normal">❯</span>',Et.onclick=async()=>{await Pe(async()=>{await Ga({supabaseClient:B,currentUser:Y,currentUserRole:Ve})},"Info画面を準備中..."),oe("info-view")}),(q=document.getElementById("nav-info"))==null||q.addEventListener("click",async()=>{await Pe(async()=>{await Ga({supabaseClient:B,currentUser:Y,currentUserRole:Ve})},"Info画面を準備中..."),oe("info-view")}),(Z=document.getElementById("nav-simulator"))==null||Z.addEventListener("click",()=>{oe("position-simulator-view"),ja()}),(U=document.getElementById("nav-simulator-att"))==null||U.addEventListener("click",()=>{oe("position-simulator-view"),ja()}),(ae=document.getElementById("nav-dispatch-sim"))==null||ae.addEventListener("click",()=>{var X;oe("app-view","dispatch"),da?(X=document.getElementById("nav-dispatch"))==null||X.click():er()}),(re=document.getElementById("nav-attendance-sim"))==null||re.addEventListener("click",async()=>{oe("attendance-view"),await Pe(Ps,"出欠管理画面を準備中...")})}catch(me){console.error("DOM Initialization failed:",me),dt(),oe("auth-view")}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Kr):setTimeout(Kr,0);let Xs=!1;function ds(e,t=null){if(Xs)return;const n="#"+e+(t?"-"+t:"");window.location.hash!==n&&history.pushState({screenId:e,subView:t},"",n)}function oe(e,t=null){["auth-view","signup-view","password-reset-view","password-update-view","app-menu-view","app-view","attendance-view","view-users","dashboard-view","dashboard-settings","position-simulator-view","info-view","survey-respond-view"].forEach(a=>{const s=document.getElementById(a);s&&s.classList.add("hidden")});const n=document.getElementById(e);n&&n.classList.remove("hidden"),ds(e,t),e!=="auth-view"&&e!=="survey-respond-view"&&Y&&le("NAVIGATE",`画面遷移: ${e}${t?" > "+t:""}`)}function Va(){let e=null,t=null,n=null;try{const a=new URLSearchParams(window.location.search);e=a.get("survey"),t=a.get("response"),n=a.get("d");let s=window.location.hash||"";if(s.startsWith("#/")&&(s="#"+s.substring(2)),s.includes("?")){const[r,o]=s.split("?");s=r;try{const i=new URLSearchParams(o);e||(e=i.get("survey")),t||(t=i.get("response")),n||(n=i.get("d"))}catch{}}if(s.startsWith("#survey-")||s.startsWith("#survey=")){const o=(s.startsWith("#survey-")?s.replace("#survey-",""):s.replace("#survey=","")).split("&");e||(e=o[0]);for(let i=1;i<o.length;i++){const d=o[i],l=d.indexOf("=");if(l!==-1){const u=d.substring(0,l),c=d.substring(l+1);u==="response"&&c&&!t&&(t=c),u==="d"&&c&&!n&&(n=c)}}}}catch(a){console.warn("parseSurveyUrlParams error:",a)}if(e)try{e=decodeURIComponent(e).trim().replace(/^\/+|\/+$/g,"")}catch{}if(t)try{t=decodeURIComponent(t).trim()}catch{}return{surveyId:e,responseId:t,surveyData:n||null}}window.addEventListener("popstate",async e=>{var t,n;Xs=!0;try{const{surveyId:a,responseId:s,surveyData:r}=Va();if(a){await na(a,s,r);return}e.state&&e.state.screenId?(oe(e.state.screenId,e.state.subView),e.state.screenId==="app-view"&&(e.state.subView==="users"?await _a():e.state.subView==="master"?(t=document.getElementById("nav-master"))==null||t.click():(n=document.getElementById("nav-dispatch"))==null||n.click())):oe(Y?"app-menu-view":"auth-view")}finally{Xs=!1}});B&&B.auth.onAuthStateChange(async(e,t)=>{if(e==="PASSWORD_RECOVERY"){oe("password-update-view");return}if(t&&da&&Y&&(e==="TOKEN_REFRESHED"||e==="USER_UPDATED")){console.log(`Bypassing auth state change handling for event: ${e}`);return}const n=async()=>{var o,i,d,l,u,c,f,p;const{surveyId:a,responseId:s,surveyData:r}=Va();if(a){if(dt(),t){Y={...t.user};try{const{data:b}=await B.from("app_users").select("name, role").eq("email",Y.email).single();b&&(Y.name=b.name,Ve=b.role)}catch{}}await na(a,s,r);return}if(t){W("ユーザー権限確認中...");try{const b=!Y||Y.id!==t.user.id;Y={...t.user},b&&await le("LOGIN","ログインしました");let h=!0,g=!0,m=!0,y=!0,x=!0,E=!1;try{let{data:U,error:ae}=await B.from("app_users").select("role, name, can_use_dispatch, can_use_dashboard, can_use_attendance, can_use_simulator, can_use_info, can_edit_info").eq("email",Y.email).single();if(ae){const{data:re}=await B.from("app_users").select("role, name, can_use_dispatch, can_use_dashboard, can_use_attendance, can_use_simulator, can_use_info").eq("email",Y.email).single();U=re}U?(Ve=U.role,Y.name=U.name,U.can_use_dispatch===!1&&(h=!1),U.can_use_dashboard===!1&&(g=!1),U.can_use_attendance===!1&&(m=!1),U.can_use_simulator===!1&&(y=!1),U.can_use_info===!1&&(x=!1),E=U.can_edit_info===!0):Ve="user"}catch{Ve="user"}Y.email==="hishinumak@gmail.com"&&(Ve="admin"),Ve==="admin"?(h=!0,g=!0,m=!0,y=!0,x=!0,E=!0):Ve==="leader"&&E===!1&&(E=!0),Y.can_use_info=x,Y.can_edit_info=E;let k=document.getElementById("btn-app-dashboard");if(g)if(k)k.classList.remove("hidden");else{const U=((o=document.getElementById("app-menu-view"))==null?void 0:o.querySelector(".space-y-3"))||((i=document.getElementById("app-menu-view"))==null?void 0:i.querySelector(".space-y-4"))||((d=document.getElementById("app-menu-view"))==null?void 0:d.querySelector(".grid"));U&&(k=document.createElement("button"),k.id="btn-app-dashboard",k.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg text-white text-left",k.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">📊</span><span>分析</span></div><span class="text-white/60 text-sm font-normal">❯</span>',k.onclick=async()=>{await Pe(Os,"ダッシュボードを準備中..."),oe("dashboard-view")},U.appendChild(k))}else k&&k.classList.add("hidden");const _=document.getElementById("nav-users"),S=document.getElementById("nav-master"),I=document.getElementById("nav-dispatch"),v=document.getElementById("btn-app-dispatch"),w=document.getElementById("btn-goto-master"),$=document.getElementById("clear-db-button");let A=document.getElementById("btn-app-users-admin");if(_==null||_.classList.add("hidden"),Ve==="admin"?(I==null||I.classList.remove("hidden"),S==null||S.classList.remove("hidden")):Ve==="leader"?(I==null||I.classList.remove("hidden"),S==null||S.classList.add("hidden")):(I==null||I.classList.add("hidden"),S==null||S.classList.add("hidden")),Ve==="admin")if(w==null||w.classList.remove("hidden"),$==null||$.classList.remove("hidden"),A)A.classList.remove("hidden");else{const U=((l=document.getElementById("app-menu-view"))==null?void 0:l.querySelector(".space-y-3"))||((u=document.getElementById("app-menu-view"))==null?void 0:u.querySelector(".space-y-4"))||((c=document.getElementById("app-menu-view"))==null?void 0:c.querySelector(".grid"));U&&(A=document.createElement("button"),A.id="btn-app-users-admin",A.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-purple-600 hover:bg-purple-700 hover:shadow-lg text-white text-left order-last",A.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">⚙️</span><span>管理者メニュー</span></div><span class="text-white/60 text-sm font-normal">❯</span>',A.onclick=()=>Vo(),U.appendChild(A))}else w==null||w.classList.add("hidden"),$==null||$.classList.add("hidden"),A&&A.classList.add("hidden");h?v==null||v.classList.remove("hidden"):v==null||v.classList.add("hidden");const P=document.getElementById("btn-app-attendance");m?P==null||P.classList.remove("hidden"):P==null||P.classList.add("hidden");const R=document.getElementById("btn-app-simulator"),D=document.getElementById("nav-simulator"),M=document.getElementById("nav-simulator-att"),C=document.getElementById("nav-dispatch-sim"),L=document.getElementById("nav-attendance-sim");y?(R==null||R.classList.remove("hidden"),D==null||D.classList.remove("hidden"),M==null||M.classList.remove("hidden")):(R==null||R.classList.add("hidden"),D==null||D.classList.add("hidden"),M==null||M.classList.add("hidden")),h?C==null||C.classList.remove("hidden"):C==null||C.classList.add("hidden"),m?L==null||L.classList.remove("hidden"):L==null||L.classList.add("hidden");const T=document.getElementById("btn-app-info"),N=document.getElementById("nav-info");x?(T==null||T.classList.remove("hidden"),N==null||N.classList.remove("hidden")):(T==null||T.classList.add("hidden"),N==null||N.classList.add("hidden"));const H=document.getElementById("user-email-display");H&&(H.textContent=Y.name||jn(Y.email));const J=document.getElementById("sim-user-email-display");J&&(J.textContent=Y.name||jn(Y.email));const{surveyId:G,responseId:Q,surveyData:q}=Va();if(G){await na(G,Q,q);return}const Z=window.location.hash;if(Z&&Z!=="#app-menu-view"&&Z!=="#auth-view"){const U=["app-view","attendance-view","dashboard-view","position-simulator-view","info-view"];let ae=!1;for(const re of U)if(Z.startsWith("#"+re)){const me=Z.length>re.length+1?Z.substring(re.length+2):null;re==="app-view"?(oe("app-view",me),da?me==="users"?_a():me==="master"?(f=document.getElementById("nav-master"))==null||f.click():(p=document.getElementById("nav-dispatch"))==null||p.click():er().then(()=>{var ve,rt;me==="users"?_a():me==="master"?(ve=document.getElementById("nav-master"))==null||ve.click():(rt=document.getElementById("nav-dispatch"))==null||rt.click()}).catch(ve=>{console.error("App init error:",ve),dt()})):re==="attendance-view"?(oe("attendance-view"),Ps().catch(ve=>{console.error("Attendance init error:",ve),dt()})):re==="dashboard-view"?(oe("dashboard-view"),Os().catch(ve=>{console.error("Dashboard init error:",ve),dt()})):re==="position-simulator-view"?(oe("position-simulator-view"),ja()):re==="info-view"&&(oe("info-view"),Ga({supabaseClient:B,currentUser:Y,currentUserRole:Ve}).catch(ve=>{console.error("Info init error:",ve),dt()})),ae=!0;break}ae||oe("app-menu-view")}else oe("app-menu-view")}catch(b){console.error("Auth state handling error:",b),dt()}finally{V()}}else{Y=null,dt();const{surveyId:b,responseId:h,surveyData:g}=Va();if(b){await na(b,h,g);return}const m=document.getElementById("password-update-view");(!m||m.classList.contains("hidden"))&&oe("auth-view")}};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{n().catch(console.error)}):setTimeout(()=>{n().catch(console.error)},0)});async function Wl(e){if(e&&e.preventDefault&&e.preventDefault(),!!confirm(`ブラウザに保存されているログイン情報（キャッシュ）をクリアして、ページを再読み込みしますか？
（動作がおかしい・ログインできない場合にお試しください）`)){W("キャッシュクリア中...");try{await B.auth.signOut().catch(()=>{});const t=[];for(let n=0;n<localStorage.length;n++){const a=localStorage.key(n);a&&a.startsWith("sb-")&&t.push(a)}t.forEach(n=>localStorage.removeItem(n)),alert("キャッシュをクリアしました。ページを再読み込みします。"),location.reload()}catch{dt()}}}let As=!1;async function Qr(e){var r,o;if(e&&e.preventDefault&&e.preventDefault(),As)return;const t=((r=document.getElementById("email-address"))==null?void 0:r.value)||"",n=ys(t),a=((o=document.getElementById("password"))==null?void 0:o.value)||"",s=document.getElementById("auth-message");if(s&&s.classList.add("hidden"),!(!n||!a)){As=!0,W("ログイン認証中...");try{const{error:i}=await B.auth.signInWithPassword({email:n,password:a});i&&(s?(s.textContent="ログイン失敗: "+i.message,s.classList.remove("hidden"),s.classList.add("text-red-500")):alert("ログイン失敗: "+i.message))}catch(i){console.error("Login Error:",i);const d=i.message+`
`+JSON.stringify(i,Object.getOwnPropertyNames(i));s?(s.textContent="通信エラー詳細: "+d,s.classList.remove("hidden"),s.classList.add("text-red-500")):alert(`通信エラー詳細:
`+d)}finally{V(),As=!1}}}async function Vo(){oe("app-view","users"),await _a()}function vr(){const e=document.getElementById("change-password-modal");e&&(document.body.appendChild(e),e.classList.remove("hidden"),e.style.zIndex="9999")}let Ts=!1;async function Jl(e){var i,d,l,u;if(e&&e.preventDefault&&e.preventDefault(),Ts)return;const t=((i=document.getElementById("signup-parent-name"))==null?void 0:i.value)||"",n=((d=document.getElementById("signup-player-name"))==null?void 0:d.value)||"",a=((l=document.getElementById("signup-email"))==null?void 0:l.value)||"";let s=((u=document.getElementById("signup-password"))==null?void 0:u.value)||"";const r=document.getElementById("signup-message");r&&r.classList.add("hidden");const o=document.getElementById("signup-password")!==null;if(o||(s=Math.random().toString(36).slice(-10)+"A1!"),!t||!n||!a||o&&s.length<6){r&&(r.textContent=o?"すべての項目を正しく入力してください(パスワードは6文字以上)":"すべての項目を正しく入力してください"),r&&r.classList.remove("hidden","text-green-600"),r&&r.classList.add("text-red-500");return}Ts=!0,W("利用申請を送信中...");try{const{data:c,error:f}=await B.auth.signUp({email:a,password:s});if(f){r&&(r.textContent="登録エラー: "+f.message),r&&r.classList.remove("hidden","text-green-600"),r&&r.classList.add("text-red-500");return}const{error:p}=await B.from("signup_requests").insert([{parent_name:t,player_name:n,email:a,status:"pending"}]);await B.auth.signOut(),p?(r&&(r.textContent="申請失敗: "+p.message),r&&r.classList.remove("hidden","text-green-600"),r&&r.classList.add("text-red-500")):(r&&(r.textContent=o?"アカウントが作成され、利用申請が送信されました。管理者の承認をお待ちください。":"利用申請が送信されました。管理者の承認後、「パスワードを忘れた場合」からパスワードを再設定してログインしてください。"),r&&r.classList.remove("text-red-500"),r&&r.classList.add("text-green-600"),r&&r.classList.remove("hidden"),document.getElementById("signup-parent-name")&&(document.getElementById("signup-parent-name").value=""),document.getElementById("signup-player-name")&&(document.getElementById("signup-player-name").value=""),document.getElementById("signup-email")&&(document.getElementById("signup-email").value=""),document.getElementById("signup-password")&&(document.getElementById("signup-password").value=""))}catch(c){dt(),console.error("Signup Error:",c),r&&(r.textContent="登録処理中にエラーが発生しました。",r.classList.remove("hidden","text-green-600"),r.classList.add("text-red-500"))}finally{V(),Ts=!1}}async function Yl(e){var a;e&&e.preventDefault&&e.preventDefault();const t=((a=document.getElementById("reset-email"))==null?void 0:a.value)||"",n=document.getElementById("reset-message");if(n&&n.classList.add("hidden"),!!t){W("パスワード再設定メール送信中...");try{const{error:s}=await B.auth.resetPasswordForEmail(t,{redirectTo:window.location.origin});s?n?(n.textContent="送信失敗: "+s.message,n.classList.remove("hidden","text-green-600"),n.classList.add("text-red-500")):alert("送信失敗: "+s.message):n?(n.textContent="パスワード再設定メールを送信しました。",n.classList.remove("text-red-500"),n.classList.add("text-green-600"),n.classList.remove("hidden")):alert("パスワード再設定メールを送信しました。")}catch(s){console.error("Password reset error:",s)}finally{V()}}}async function Kl(e){var a;e&&e.preventDefault&&e.preventDefault();const t=((a=document.getElementById("new-password"))==null?void 0:a.value)||"",n=document.getElementById("update-password-message");if(n&&n.classList.add("hidden"),!t||t.length<6){n?(n.textContent="6文字以上のパスワードを入力してください",n.classList.remove("hidden","text-green-600"),n.classList.add("text-red-500")):alert("6文字以上のパスワードを入力してください");return}W("パスワード更新中...");try{const{error:s}=await B.auth.updateUser({password:t});s?n?(n.textContent="更新失敗: "+s.message,n.classList.remove("hidden","text-green-600"),n.classList.add("text-red-500")):alert("更新失敗: "+s.message):(alert("パスワードが更新されました。再度ログインしてください。"),oe("auth-view"))}catch(s){console.error("Password update error:",s)}finally{V()}}async function Ql(e){var n;e&&e.preventDefault&&e.preventDefault();const t=((n=document.getElementById("change-new-password"))==null?void 0:n.value)||"";if(!t||t.length<6)return alert("6文字以上のパスワードを入力してください");W("パスワード変更中...");try{const{error:a}=await B.auth.updateUser({password:t});if(a)alert("更新失敗: "+a.message);else{alert("パスワードが変更されました。");const s=document.getElementById("change-password-modal");s&&s.classList.add("hidden");const r=document.getElementById("change-new-password");r&&(r.value="")}}catch(a){console.error("Password change error:",a)}finally{V()}}async function Ra(e){e&&e.preventDefault&&e.preventDefault(),Y&&await le("LOGOUT","ログアウトしました"),W("ログアウト処理中...");try{await B.auth.signOut().catch(()=>{})}finally{V(),da=!1,history.pushState(null,"",window.location.pathname)}}function za(e){const t=document.getElementById("nav-dispatch"),n=document.getElementById("nav-master"),a=document.getElementById("nav-users");e==="users"?(t==null||t.classList.add("hidden"),n==null||n.classList.add("hidden"),a==null||a.classList.add("hidden")):(a==null||a.classList.add("hidden"),Ve==="admin"?(t==null||t.classList.remove("hidden"),n==null||n.classList.remove("hidden")):Ve==="leader"?(t==null||t.classList.remove("hidden"),n==null||n.classList.add("hidden")):(t==null||t.classList.add("hidden"),n==null||n.classList.add("hidden")))}let Ee=[],$e=[],gt=[],xa=new Set;async function er(){var e,t,n;da=!0,za("dispatch"),Ke==null||Ke.addEventListener("click",async()=>{var a,s;Yn==null||Yn.classList.remove("hidden"),Kn==null||Kn.classList.add("hidden"),(a=document.getElementById("view-users"))==null||a.classList.add("hidden"),za("dispatch"),Ke==null||Ke.classList.add("text-blue-300"),Ke==null||Ke.classList.remove("text-gray-400"),Qe==null||Qe.classList.remove("text-blue-300"),Qe==null||Qe.classList.add("text-gray-400"),(s=document.getElementById("nav-users"))==null||s.classList.remove("text-blue-300"),ds("app-view","dispatch"),await Xr()}),Qe==null||Qe.addEventListener("click",async()=>{var a,s;Kn==null||Kn.classList.remove("hidden"),Yn==null||Yn.classList.add("hidden"),(a=document.getElementById("view-users"))==null||a.classList.add("hidden"),za("master"),Qe==null||Qe.classList.add("text-blue-300"),Qe==null||Qe.classList.remove("text-gray-400"),Ke==null||Ke.classList.remove("text-blue-300"),Ke==null||Ke.classList.add("text-gray-400"),(s=document.getElementById("nav-users"))==null||s.classList.remove("text-blue-300"),ds("app-view","master"),await nc(),$a()}),(e=document.getElementById("btn-goto-master"))==null||e.addEventListener("click",()=>{Qe==null||Qe.click()}),(t=document.getElementById("btn-back-to-dispatch"))==null||t.addEventListener("click",()=>{Ke==null||Ke.click()});try{await ne.initMasterData(),Ee.length===0&&$e.length===0&&(await ne.bulkAddFamilies(ec),await ne.bulkAddCars(tc),await ne.syncMaster(),await ne.initMasterData()),await Xr(),sc(),Ic(),(n=document.getElementById("btn-load-logs"))==null||n.addEventListener("click",$a)}catch(a){console.error(a),wt("データの読み込みに失敗しました。","error")}}async function _a(){Ve==="admin"&&(document.getElementById("view-users").classList.remove("hidden"),document.getElementById("view-master").classList.add("hidden"),document.getElementById("view-dispatch").classList.add("hidden"),za("users"),document.getElementById("nav-users").classList.add("text-blue-300"),document.getElementById("nav-users").classList.remove("text-gray-400"),document.getElementById("nav-dispatch").classList.remove("text-blue-300"),document.getElementById("nav-master").classList.remove("text-blue-300"),ds("app-view","users"),await be())}async function be(){W("メンバー・マスタ情報読み込み中...");try{const{data:e}=await B.from("app_users").select("*").order("created_at",{ascending:!1});let t=[],n=[],a=[],s=[],r=[];try{const{data:m}=await B.from("groups").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});m&&(t=m);const{data:y}=await B.from("user_groups").select("*");y&&(n=y);const{data:x}=await B.from("event_categories").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});x&&(a=x);const{data:E}=await B.from("user_attributes").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});E&&(s=E);try{const{data:_}=await B.from("event_locations").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});_&&(r=_)}catch(_){console.warn("event_locations table not created yet:",_)}const{data:k}=await B.from("master_data").select("*").eq("key","ATTENDANCE_DELEGATIONS").single();k&&k.data?window.adminDelegations=k.data:window.adminDelegations={}}catch(m){console.error("Groups DB Error:",m)}const o=localStorage.getItem("admin_users_sort")||"created_desc",i=document.getElementById("admin-users-sort");if(i&&(i.value=o),e&&e.length>0){const m=new Map(t.map(E=>[E.id,E.name])),y=new Map(s.map(E=>[E.id,E.name])),x=new Map(n.map(E=>[E.user_email,E.group_id]));if(o==="manual"){let E=[];try{const k=localStorage.getItem("admin_users_manual_order");k&&(E=JSON.parse(k))}catch(k){console.error("Failed to parse manual user order:",k)}e.sort((k,_)=>{let S=E.indexOf(k.email),I=E.indexOf(_.email);return S===-1&&(S=999999),I===-1&&(I=999999),S!==I?S-I:new Date(_.created_at||0)-new Date(k.created_at||0)})}else if(o==="created_desc")e.sort((E,k)=>new Date(k.created_at||0)-new Date(E.created_at||0));else if(o==="created_asc")e.sort((E,k)=>new Date(E.created_at||0)-new Date(k.created_at||0));else if(o==="name_asc")e.sort((E,k)=>(E.name||"").localeCompare(k.name||"","ja"));else if(o==="name_desc")e.sort((E,k)=>(k.name||"").localeCompare(E.name||"","ja"));else if(o==="email_asc")e.sort((E,k)=>(E.email||"").localeCompare(k.email||"","en"));else if(o==="email_desc")e.sort((E,k)=>(k.email||"").localeCompare(E.email||"","en"));else if(o==="role_desc"){const E={admin:3,leader:2,user:1};e.sort((k,_)=>{const S=E[k.role]||0,I=E[_.role]||0;return S!==I?I-S:new Date(_.created_at||0)-new Date(k.created_at||0)})}else o==="group_asc"?e.sort((E,k)=>{const _=m.get(x.get(E.email))||"",S=m.get(x.get(k.email))||"";return!_&&S?1:_&&!S?-1:_.localeCompare(S,"ja")}):o==="attribute_asc"&&e.sort((E,k)=>{const _=y.get(E.attribute_id)||"",S=y.get(k.attribute_id)||"";return!_&&S?1:_&&!S?-1:_.localeCompare(S,"ja")})}const d=document.getElementById("allowed-users-list");let l=`
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
        `,u=`
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
        `,c=`
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
        `,f=`
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
        `;const p=(e||[]).map((m,y)=>{var w;const x=m.email.endsWith("@local.dummy"),E=((w=n.find($=>$.user_email===m.email))==null?void 0:w.group_id)||"",k=t.map($=>`<option value="${$.id}" ${E===$.id?"selected":""}>${$.name}</option>`).join(""),_=`
                <select id="edit-group-${y}" class="border p-1 rounded text-sm w-36 font-semibold text-gray-700 bg-white">
                    <option value="">選択なし</option>
                    ${k}
                </select>
            `,S=(e||[]).filter($=>$.email!==m.email).map($=>`
                <label class="inline-flex items-center text-xs mr-3 mb-1 w-32 truncate" title="${$.email}">
                    <input type="checkbox" name="edit-delegation-${y}" value="${$.email}" ${window.adminDelegations[m.email]&&window.adminDelegations[m.email].includes($.email)?"checked":""} class="mr-1 rounded text-blue-600">
                    <span class="truncate">${$.name||$.email}</span>
                </label>
            `).join(""),v=o==="manual"?`
                <div class="user-drag-handle cursor-grab select-none text-gray-400 hover:text-gray-600 px-2 flex items-center justify-center text-xl font-bold border-r border-gray-100 mr-2" title="ドラッグして並べ替え">
                    ⋮⋮
                </div>
            `:"";return`
            <div class="user-admin-card flex items-stretch p-3 bg-white border rounded shadow-sm mb-2 hover:bg-gray-50 transition" data-email="${m.email}" data-index="${y}" data-old-role="${m.role}">
                ${v}
                <div class="flex-grow flex flex-col">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-gray-100 pb-2 mb-2">
                        <div class="flex-grow flex flex-col md:flex-row md:items-center gap-2">
                        <input type="text" id="edit-name-${y}" value="${m.name||""}" placeholder="氏名" class="border p-1 rounded text-sm w-32 font-bold">
                        <input type="text" id="edit-email-${y}" value="${jn(m.email)}" class="border p-1 rounded text-sm w-48 font-bold" ${m.email===Y.email||x?"disabled":""}>
                        <select id="edit-attribute-${y}" class="border p-1 rounded text-sm w-28">
                            <option value="">属性なし</option>
                            ${s.map($=>`<option value="${$.id}" ${m.attribute_id===$.id?"selected":""}>${$.name}</option>`).join("")}
                        </select>
                        <select id="edit-role-${y}" class="border p-1 rounded text-sm" ${m.email===Y.email?"disabled":""}>
                            <option value="user" ${m.role==="user"?"selected":""}>一般ユーザー</option>
                            <option value="leader" ${m.role==="leader"?"selected":""}>リーダー</option>
                            <option value="admin" ${m.role==="admin"?"selected":""}>管理者</option>
                        </select>
                         <div class="flex items-center space-x-3 ml-2 border-l pl-2 flex-wrap gap-y-1">
                            <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-dispatch-${y}" class="rounded text-blue-600" ${m.can_use_dispatch!==!1?"checked":""}><span>配車可</span></label>
                            <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-dashboard-${y}" class="rounded text-blue-600" ${m.can_use_dashboard!==!1?"checked":""}><span>成績可</span></label>
                            <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-attendance-${y}" class="rounded text-blue-600" ${m.can_use_attendance!==!1?"checked":""}><span>出欠可</span></label>
                            <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-simulator-${y}" class="rounded text-blue-600" ${m.can_use_simulator!==!1?"checked":""}><span>シミュレータ可</span></label>
                            <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-info-${y}" class="rounded text-teal-600" ${m.can_use_info!==!1?"checked":""}><span>Info閲覧可</span></label>
                            <label class="flex items-center space-x-1 text-xs font-bold text-teal-800"><input type="checkbox" id="edit-manage-info-${y}" class="rounded text-teal-600 edit-manage-info-chk" data-index="${y}" ${m.can_edit_info===!0||m.role==="admin"||m.role==="leader"&&m.can_edit_info!==!1?"checked":""}><span>Info編集可</span></label>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2 shrink-0">
                        ${x?"":`<button onclick="adminChangeUserPassword('${m.email}')" class="text-xs bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded shadow">パスワード変更</button>`}
                        ${m.email!==Y.email?`<button onclick="deleteAdminUser('${m.email}')" class="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded shadow">削除</button>`:""}
                    </div>
                </div>
                    <div class="flex flex-col md:flex-row md:items-start justify-between gap-2">
                        <div class="flex-grow">
                            <div class="text-xs font-bold text-gray-500 mb-1">所属グループ:</div>
                            <div id="group-container-${y}">${_}</div>
                        </div>
                        <div class="flex-grow mt-2 md:mt-0 border-t md:border-t-0 md:border-l border-gray-200 pt-2 md:pt-0 md:pl-4">
                            <div class="text-xs font-bold text-gray-500 mb-1">代行権限 (他メンバーの出欠を代理で入力できる権限):</div>
                            <details class="text-xs border p-2 bg-gray-50 rounded shadow-inner">
                                <summary class="cursor-pointer text-gray-700 font-bold">代行入力できるメンバーを選択 (複数可)</summary>
                                <div class="flex flex-wrap mt-2 max-h-32 overflow-y-auto border-t border-gray-200 pt-2">${S||'<span class="text-gray-400">他のメンバーがいません</span>'}</div>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
            `}).join("");d.innerHTML=p,Xl(),d.querySelectorAll(".edit-manage-info-chk").forEach(m=>{m.addEventListener("change",y=>{if(y.target.checked){const x=y.target.getAttribute("data-index"),E=document.getElementById(`edit-use-info-${x}`);E&&(E.checked=!0)}})});const b=document.getElementById("admin-master-list");b&&(b.innerHTML=l+u+c+f,Oa("admin-attribute-list","user_attributes",be),Oa("admin-category-list","event_categories",be),Oa("admin-group-list","groups",be),Oa("admin-location-list","event_locations",be));const{data:h}=await B.from("signup_requests").select("*").eq("status","pending").order("created_at",{ascending:!1}),g=document.getElementById("signup-requests-list");!h||h.length===0?g.innerHTML='<p class="text-gray-500 text-sm">現在、承認待ちの申請はありません。</p>':g.innerHTML=h.map(m=>`
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
            `).join("")}finally{V()}}async function Zl(){const e=document.querySelectorAll(".user-admin-card");if(e.length!==0&&confirm("全メンバーの設定を一括保存しますか？")){W("全メンバー設定を保存中...");try{const t=[],n=[],a=[];e.forEach(d=>{const l=d.getAttribute("data-email"),u=d.getAttribute("data-index"),c=d.getAttribute("data-old-role"),f=document.getElementById(`edit-email-${u}`),p=document.getElementById(`edit-name-${u}`),b=document.getElementById(`edit-attribute-${u}`),h=document.getElementById(`edit-role-${u}`),g=document.getElementById(`edit-use-dispatch-${u}`),m=document.getElementById(`edit-use-dashboard-${u}`),y=document.getElementById(`edit-use-attendance-${u}`),x=document.getElementById(`edit-use-simulator-${u}`),E=document.getElementById(`edit-use-info-${u}`),k=document.getElementById(`edit-manage-info-${u}`),_=f.disabled?l:ys(f.value.trim()),S=p.value.trim(),I=b&&b.value||null,v=h.disabled?c:h.value,w=g?g.checked:!0,$=m?m.checked:!0,A=y?y.checked:!0,P=x?x.checked:!0,R=E?E.checked:!0,D=k?k.checked:v==="admin"||v==="leader"&&!0;if(!_)throw new Error("メールアドレスが空のレコードがあります。");a.push(l);const M={email:_,name:S,attribute_id:I,role:v,can_use_dispatch:w,can_use_dashboard:$,can_use_attendance:A,can_use_simulator:P,can_use_info:R,can_edit_info:D};t.push({oldEmail:l,updatePayload:M});const C=document.getElementById(`edit-group-${u}`),L=C?C.value:"";L&&n.push({user_email:_,group_id:L});const T=document.querySelectorAll(`input[name="edit-delegation-${u}"]:checked`),N=Array.from(T).map(H=>H.value);l!==_&&window.adminDelegations[l]&&delete window.adminDelegations[l],window.adminDelegations[_]=N});const s=t.map(async d=>{let l=await B.from("app_users").update(d.updatePayload).eq("email",d.oldEmail);if(l.error&&l.error.message&&l.error.message.includes("can_edit_info")){const u={...d.updatePayload};delete u.can_edit_info,l=await B.from("app_users").update(u).eq("email",d.oldEmail)}return l}),r=await Promise.all(s);for(const d of r)if(d.error)throw d.error;const{error:o}=await B.from("user_groups").delete().in("user_email",a);if(o)throw o;if(n.length>0){const{error:d}=await B.from("user_groups").insert(n);if(d)throw d}const{error:i}=await B.from("master_data").upsert({key:"ATTENDANCE_DELEGATIONS",data:window.adminDelegations});if(i)throw i;await le("UPDATE_USERS_ALL","全メンバーの設定を一括更新しました"),alert("全メンバーの設定を一括保存しました"),await be()}catch(t){console.error(t),alert("保存中にエラーが発生しました: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{V()}}}window.forceResetPassword=async function(e){if(confirm(`${e} 宛にパスワード再設定メールを送信し、強制的にパスワードをリセットさせますか？`)){W("パスワード再設定メール送信中...");try{const{error:t}=await B.auth.resetPasswordForEmail(e,{redirectTo:window.location.origin});alert(t?"送信失敗: "+t.message:"パスワード再設定メールを送信しました。")}catch(t){console.error(t)}finally{V()}}};window.adminChangeUserPassword=async function(e){const t=jn(e),n=prompt(`「${t}」の新しいパスワードを入力してください（6文字以上）：`);if(n===null)return;const a=n.trim();if(a.length<6)return alert("パスワードは6文字以上で設定してください。");W("パスワード変更中...");try{const{error:s}=await B.rpc("admin_update_user_password",{user_email:e,new_password:a});if(s)throw new Error(s.message);await le("ADMIN_CHANGE_PASSWORD",`ユーザー「${e}」のパスワードを変更しました`),alert(`「${t}」のパスワードを正常に変更しました。`)}catch(s){console.error(s),alert(`パスワード変更エラー:
`+s.message+`

※この機能を使用するには、あらかじめSupabaseのSQLエディタで専用のデータベース関数（admin_update_user_password）を設定する必要があります。詳細はマニュアルまたはエージェントのメッセージを参照してください。`)}finally{V()}};window.adminAddUser=async function(){var r,o,i,d;const e=((r=document.getElementById("admin-add-email"))==null?void 0:r.value.trim())||"",t=ys(e),n=((o=document.getElementById("admin-add-name"))==null?void 0:o.value.trim())||"",a=((i=document.getElementById("admin-add-password"))==null?void 0:i.value.trim())||"",s=((d=document.getElementById("admin-add-role"))==null?void 0:d.value)||"user";if(!e||!n||!a)return alert("ユーザーID（またはメールアドレス）、氏名、仮パスワードは必須入力項目です。");if(a.length<6)return alert("仮パスワードは6文字以上で設定してください。");W("アカウント払い出し中...");try{const l=window.supabase.createClient(ia,is,{auth:{persistSession:!1,autoRefreshToken:!1}}),{data:u,error:c}=await l.auth.signUp({email:t,password:a});if(c)throw new Error(`Authアカウント作成失敗: ${c.message}`);const{error:f}=await B.from("app_users").insert([{email:t,name:n,role:s}]);if(f)throw new Error(`データベース登録失敗: ${f.message}`);await le("ADD_USER_COMPLETED",`アカウント「${t}」を仮パスワード付きで払い出しました`),document.getElementById("admin-add-email").value="",document.getElementById("admin-add-name").value="",document.getElementById("admin-add-password").value="",alert(`アカウントの払い出しが完了しました！

【ユーザー通知内容】
ログインID: ${jn(t)}
仮パスワード: ${a}

上記情報をLINE等の別手段でユーザーに通知してください。`),await be()}catch(l){console.error(l),alert(`アカウント払い出しエラー:
`+l.message)}finally{V()}};window.adminAddDummyUser=async function(){const e=prompt(`追加する代行専用メンバーの「氏名」を入力してください。
（※ログインはできず、他のメンバーからの代行入力専用アカウントとなります）`);if(!e||e.trim()==="")return;const t=`dummy_${Date.now()}@local.dummy`;W("代行専用メンバー追加処理中...");try{await B.from("app_users").insert([{email:t,name:e.trim(),role:"user"}]),await le("ADD_DUMMY_USER",`代行専用メンバー「${e.trim()}」を追加しました`),await be()}catch(n){console.error(n),alert("追加エラー: "+(n.message==="Load failed"||n.message==="Failed to fetch"?"通信に失敗しました。":n.message))}finally{V()}};window.deleteAdminUser=async function(e){if(confirm(`${e} のアクセス許可を取り消しますか？`)){W("ユーザー削除処理中...");try{await B.from("app_users").delete().eq("email",e),await le("DELETE_USER",`ユーザー「${e}」を削除しました`),await be()}catch(t){console.error(t),alert("削除エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{V()}}};window.saveNewCategoryAdmin=async function(){var n;const e=document.getElementById("admin-new-category-name").value.trim(),t=((n=document.getElementById("admin-new-category-color"))==null?void 0:n.value)||"#bfdbfe";if(!e)return alert("カテゴリ名を入力してください");W("カテゴリ追加中...");try{const{error:a}=await B.from("event_categories").insert([{name:e,color:t}]);if(a)throw a;await be()}catch(a){alert("追加エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{V()}};window.deleteCategoryAdmin=async function(e){if(confirm(`このカテゴリを削除しますか？
※既存のイベントに設定されているカテゴリ名には影響しませんが、新規作成・編集時に選択できなくなります。`)){W("カテゴリ削除中...");try{const{error:t}=await B.from("event_categories").delete().eq("id",e);if(t)throw t;await be()}catch(t){alert("削除エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{V()}}};window.renameCategoryAdmin=async function(e,t){const n=prompt("新しいカテゴリ名を入力してください:",t);if(!(!n||n.trim()===""||n===t)){W("カテゴリ名称変更中...");try{const{error:a}=await B.from("event_categories").update({name:n.trim()}).eq("id",e);if(a)throw a;await be()}catch(a){alert("変更エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{V()}}};window.updateCategoryColorAdmin=async function(e,t){W("カテゴリ色変更中...");try{const{error:n}=await B.from("event_categories").update({color:t}).eq("id",e);if(n)throw n;await be()}catch(n){alert("変更エラー: "+(n.message==="Load failed"||n.message==="Failed to fetch"?"通信に失敗しました。":n.message))}finally{V()}};window.updateGroupColorAdmin=async function(e,t){W("グループ色変更中...");try{const{error:n}=await B.from("groups").update({color:t}).eq("id",e);if(n)throw n;await be()}catch(n){alert("色変更エラー: "+(n.message==="Load failed"||n.message==="Failed to fetch"?"通信に失敗しました。":n.message))}finally{V()}};window.saveNewGroupAdmin=async function(){var n;const e=document.getElementById("admin-new-group-name").value.trim(),t=((n=document.getElementById("admin-new-group-color"))==null?void 0:n.value)||"#d1fae5";if(!e)return alert("グループ名を入力してください");W("グループ追加中...");try{const{error:a}=await B.from("groups").insert([{name:e,color:t}]);if(a)throw a;await be()}catch(a){alert("追加エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{V()}};window.deleteGroupAdmin=async function(e){if(confirm(`このグループを削除しますか？
※関連する出欠データやメンバー設定にも影響が出る可能性があります。`)){W("グループ削除中...");try{const{error:t}=await B.from("groups").delete().eq("id",e);if(t)throw t;await be()}catch(t){alert("削除エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{V()}}};window.renameGroupAdmin=async function(e,t){const n=prompt("新しいグループ名を入力してください:",t);if(!(!n||n.trim()===""||n===t)){W("グループ名称変更中...");try{const{error:a}=await B.from("groups").update({name:n.trim()}).eq("id",e);if(a)throw a;await be()}catch(a){alert("変更エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{V()}}};window.saveNewLocationAdmin=async function(){const e=document.getElementById("admin-new-location-name").value.trim(),t=document.getElementById("admin-new-location-url").value.trim();if(!e)return alert("場所名を入力してください");W("場所追加中...");try{const{error:n}=await B.from("event_locations").insert([{name:e,url:t||null}]);if(n)throw n;await be()}catch(n){alert("追加エラー: "+(n.message==="Load failed"||n.message==="Failed to fetch"?"通信に失敗しました。":n.message))}finally{V()}};window.deleteLocationAdmin=async function(e){if(confirm(`この場所をマスタから削除しますか？
※既存の予定データ内の場所テキスト自体は削除されません。`)){W("場所削除中...");try{const{error:t}=await B.from("event_locations").delete().eq("id",e);if(t)throw t;await be()}catch(t){alert("削除エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{V()}}};window.renameLocationAdmin=async function(e){W("場所データ読み込み中...");try{const{data:t,error:n}=await B.from("event_locations").select("*").eq("id",e).single();if(n)throw n;const a=document.getElementById("admin-edit-location-modal");a&&a.remove();const s=t.name||"",r=t.url||"",o=`
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
        `;document.body.insertAdjacentHTML("beforeend",o)}catch(t){alert("読み込みエラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{V()}};window.saveLocationEditAdmin=async function(e){const t=document.getElementById("edit-location-name").value.trim(),n=document.getElementById("edit-location-url").value.trim();if(t==="")return alert("場所の名前は必須項目です。");W("場所マスタ更新中...");try{const{error:a}=await B.from("event_locations").update({name:t,url:n||null}).eq("id",e);if(a)throw a;const s=document.getElementById("admin-edit-location-modal");s&&s.remove(),await be()}catch(a){alert("更新エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{V()}};function Oa(e,t,n){const a=document.getElementById(e);if(!a)return;let s=null;Array.from(a.children).forEach(r=>{r.setAttribute("draggable","true"),r.classList.add("cursor-move","select-none"),r.addEventListener("dragstart",o=>{s=r,o.dataTransfer.effectAllowed="move",r.classList.add("opacity-50")}),r.addEventListener("dragover",o=>{o.preventDefault(),o.dataTransfer.dropEffect="move";const i=o.target.closest('[draggable="true"]');if(i&&i!==s&&i.parentNode===a){const d=i.getBoundingClientRect(),l=(o.clientY-d.top)/(d.bottom-d.top)>.5;a.insertBefore(s,l?i.nextSibling:i)}}),r.addEventListener("dragend",async()=>{r.classList.remove("opacity-50"),s=null;const i=Array.from(a.children).map((d,l)=>{const u=d.dataset.id;return B.from(t).update({sort_order:l}).eq("id",u)});W("順序を保存中...");try{await Promise.all(i),n&&await n()}catch(d){console.error("Sort order save error:",d),alert("順序の保存に失敗しました。")}finally{V()}})})}function Xl(){const e=document.getElementById("allowed-users-list");if(!e)return;if((localStorage.getItem("admin_users_sort")||"created_desc")!=="manual"){Array.from(e.children).forEach(a=>{a.removeAttribute("draggable"),a.classList.remove("cursor-move","select-none");const s=a.querySelector(".user-drag-handle");s&&(s.style.display="none")});return}let n=null;Array.from(e.children).forEach(a=>{const s=a.querySelector(".user-drag-handle");s?(s.style.display="flex",s.addEventListener("mousedown",()=>{a.setAttribute("draggable","true")}),s.addEventListener("mouseup",()=>{a.removeAttribute("draggable")})):a.setAttribute("draggable","true"),a.addEventListener("dragstart",r=>{if(a.getAttribute("draggable")!=="true"){r.preventDefault();return}n=a,r.dataTransfer.effectAllowed="move",a.classList.add("opacity-50")}),a.addEventListener("dragover",r=>{r.preventDefault(),r.dataTransfer.dropEffect="move";const o=r.target.closest(".user-admin-card");if(o&&o!==n&&o.parentNode===e){const i=o.getBoundingClientRect(),d=(r.clientY-i.top)/(i.bottom-i.top)>.5;e.insertBefore(n,d?o.nextSibling:o)}}),a.addEventListener("dragend",()=>{a.classList.remove("opacity-50"),a.removeAttribute("draggable"),n=null;const o=Array.from(e.children).map(i=>i.getAttribute("data-email")).filter(Boolean);localStorage.setItem("admin_users_manual_order",JSON.stringify(o))})})}window.saveNewUserAttributeAdmin=async function(){const e=document.getElementById("admin-new-attribute-name").value.trim();if(!e)return alert("属性名を入力してください");W("属性追加中...");try{const{error:t}=await B.from("user_attributes").insert([{name:e}]);if(t)throw t;await be()}catch(t){alert("追加エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{V()}};window.deleteUserAttributeAdmin=async function(e){if(confirm(`この属性を削除しますか？
※ユーザーに設定されている属性は解除されます。`)){W("属性削除中...");try{const{error:t}=await B.from("user_attributes").delete().eq("id",e);if(t)throw t;await be()}catch(t){alert("削除エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{V()}}};window.renameUserAttributeAdmin=async function(e,t){const n=prompt("新しい属性名を入力してください:",t);if(!(!n||n.trim()===""||n===t)){W("属性名称変更中...");try{const{error:a}=await B.from("user_attributes").update({name:n.trim()}).eq("id",e);if(a)throw a;await be()}catch(a){alert("変更エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{V()}}};window.approveRequest=async function(e,t){W("申請承認中...");try{const{data:n}=await B.from("signup_requests").select("parent_name, player_name").eq("id",e).single(),a=n?`${n.parent_name} (${n.player_name})`:"";await B.from("app_users").insert([{email:t,role:"user",name:a}]),await B.from("signup_requests").update({status:"approved"}).eq("id",e);try{const{error:s}=await B.auth.resetPasswordForEmail(t,{redirectTo:window.location.origin});s&&(console.warn("Auto password reset email failed (rate limit):",s.message),alert(`メンバー承認は完了しました！

※ただし、Supabaseのメール送信制限（レートリミット等）により、パスワード設定案内メールの自動送信に失敗しました（エラー: `+s.message+`）。

お手数ですが、ログイン画面の『パスワードを忘れた場合』からユーザー自身で再設定を行っていただくよう案内するか、時間をおいてメンバーリストの『PWリセット送信』から再送信してください。`))}catch(s){console.error("Auto password reset email exception:",s)}await be()}catch(n){console.error(n),alert("承認エラー: "+(n.message==="Load failed"||n.message==="Failed to fetch"?"通信に失敗しました。":n.message))}finally{V()}};window.rejectRequest=async function(e){if(confirm("この申請を拒否しますか？")){W("申請拒否中...");try{await B.from("signup_requests").update({status:"rejected"}).eq("id",e),await be()}catch(t){console.error(t),alert("拒否エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{V()}}};const ne={initMasterData:async()=>Pe(async()=>{const{data:e,error:t}=await B.from("master_data").select("*");if(t)throw t;if(Ee=[],$e=[],e){const n=e.find(s=>s.key==="FAMILIES"),a=e.find(s=>s.key==="CARS");n&&(Ee=n.data||[]),a&&($e=a.data||[])}},"マスターデータ初期化中..."),getAllFamilies:async()=>Ee,getFamily:async e=>Ee.find(t=>t.familyName===e),addFamily:e=>{Ee.push(e)},updateFamily:e=>{const t=Ee.findIndex(n=>n.familyName===e.familyName);t>-1&&(Ee[t]=e)},deleteFamily:e=>{Ee=Ee.filter(t=>t.familyName!==e)},bulkAddFamilies:e=>{Ee=e},getAllCars:async()=>$e,getCar:async e=>$e.find(t=>t.id===e),addCar:e=>{$e.push(e)},updateCar:e=>{const t=$e.findIndex(n=>n.id===e.id);t>-1&&($e[t]=e)},deleteCar:e=>{$e=$e.filter(t=>t.id!==e)},bulkAddCars:e=>{$e=e},syncMaster:async()=>Pe(async()=>{const{error:e}=await B.from("master_data").upsert([{key:"FAMILIES",data:Ee},{key:"CARS",data:$e}]);if(e)throw e;await le("UPDATE_MASTER","初期データ(または強制)のマスター保存を実行しました")},"マスターデータ同期中..."),saveState:async(e,t)=>Pe(async()=>{const n=Date.now().toString(),{error:a}=await B.from("states").insert({id:n,name:t,created_at:Date.now(),state_data:e});if(a)throw a;return await le("SAVE_DISPATCH",`配車データ「${t}」を保存しました`),!0},"配車状態を保存中..."),getAllSavedStates:async()=>Pe(async()=>{const{data:e,error:t}=await B.from("states").select("*").order("created_at",{ascending:!1});if(t)throw t;return e.map(n=>({id:n.id,name:n.name,timestamp:n.created_at,state:n.state_data}))},"配車状態一覧を取得中..."),getState:async e=>Pe(async()=>{const{data:t,error:n}=await B.from("states").select("*").eq("id",e).single();if(n)throw n;return t?{id:t.id,name:t.name,timestamp:t.created_at,state:t.state_data}:null},"配車状態を取得中..."),deleteState:async e=>Pe(async()=>{const{error:t}=await B.from("states").delete().eq("id",e);if(t)throw t;return await le("DELETE_DISPATCH",`配車データ(ID:${e})を削除しました`),!0},"配車状態を削除中..."),saveParking:async(e,t)=>Pe(async()=>{const n="p"+Date.now()+Math.floor(Math.random()*1e3),{error:a}=await B.from("parkings").insert({id:n,name:t,created_at:Date.now(),parking_data:e});if(a)throw a;return await le("SAVE_PARKING",`駐車場データ「${t}」を保存しました`),!0},"駐車場データを保存中..."),getAllSavedParking:async()=>Pe(async()=>{const{data:e,error:t}=await B.from("parkings").select("*").order("created_at",{ascending:!1});if(t)throw t;return e.map(n=>({id:n.id,name:n.name,timestamp:n.created_at,parking:n.parking_data}))},"駐車場データ一覧を取得中..."),getParking:async e=>Pe(async()=>{const{data:t,error:n}=await B.from("parkings").select("*").eq("id",e).single();if(n)throw n;return t?{id:t.id,name:t.name,timestamp:t.created_at,parking:t.parking_data}:null},"駐車場データを取得中..."),updateParking:async e=>Pe(async()=>{const{error:t}=await B.from("parkings").update({name:e.name,parking_data:e.parking}).eq("id",e.id);if(t)throw t;return!0},"駐車場データを更新中..."),deleteParking:async e=>Pe(async()=>{const{error:t}=await B.from("parkings").delete().eq("id",e);if(t)throw t;return await le("DELETE_PARKING",`駐車場データ(ID:${e})を削除しました`),!0},"駐車場データを削除中..."),addParkingMaster:(e,t)=>{gt.push({id:"p"+Date.now()+Math.floor(Math.random()*1e3),name:t,timestamp:Date.now(),parking:e,isNew:!0})},updateParkingMaster:e=>{const t=gt.findIndex(n=>n.id===e.id);t>-1&&(gt[t]=e,gt[t].isModified=!0)},deleteParkingMaster:e=>{const t=gt.find(n=>n.id===e);t&&!t.isNew&&xa.add(e),gt=gt.filter(n=>n.id!==e)},syncAllMaster:async()=>Pe(async()=>{const{error:e}=await B.from("master_data").upsert([{key:"FAMILIES",data:Ee},{key:"CARS",data:$e}]);if(e)throw e;for(const t of xa)await B.from("parkings").delete().eq("id",t);xa.clear();for(const t of gt)if(t.isNew||t.isModified){const{error:n}=await B.from("parkings").upsert({id:t.id,name:t.name,created_at:t.timestamp,parking_data:t.parking});if(n)throw n;t.isNew=!1,t.isModified=!1}await le("UPDATE_MASTER","マスターデータ(家族・車・駐車場)を一括保存しました")},"マスターデータ一括同期中..."),clearDatabase:async()=>Pe(async()=>{Ee=[],$e=[],await B.from("master_data").delete().neq("key",""),await B.from("states").delete().neq("id",""),await B.from("parkings").delete().neq("id",""),await le("CLEAR_DB","データベースの全リセットを実行しました")},"データベース初期化中...")},ec=[{familyName:"山田家",order:1,members:[{id:"p1",name:"太郎",type:"選手",isFlagTarget:!0,data:{grade:"5年",school:"A小",other:"",memo:""}},{id:"p2",name:"山田父",type:"保護者",data:{memo:""}}]},{familyName:"佐藤家",order:2,members:[{id:"p3",name:"次郎",type:"選手",isFlagTarget:!0,data:{grade:"5年",school:"B小",other:"",memo:""}},{id:"p4",name:"佐藤母",type:"保護者",data:{memo:""}}]},{familyName:"スタッフ・個人",order:99,members:[{id:"p99",name:"監督",type:"その他",data:{memo:""}}]}],tc=[{id:"c1",name:"山田カー",familyName:"山田家",baseCapacity:6,order:1},{id:"c2",name:"佐藤カー",familyName:"佐藤家",baseCapacity:5,order:2}];let $n=[],ls=[],xs=[],In=new Set,Sn=new Set,dn=new Map,yn=new Set,Pt=new Set,qt=new Map,Ce={groundName:"",designated:{name:"",limit:0,memo:""},other:{name:"",memo:""}},Ze={date:"",name:"",timeline:"",notes:""},de=[],Qt={car:null,seat:null},Ds=null,Cs=null;const tr=3,Ke=document.getElementById("nav-dispatch"),Qe=document.getElementById("nav-master"),Yn=document.getElementById("view-dispatch"),Kn=document.getElementById("view-master"),_t=document.getElementById("participant-list"),Cn=document.getElementById("car-list"),Nn=document.getElementById("exclusion-list"),Ns=document.getElementById("results");document.getElementById("text-output");const Nt=document.getElementById("family-list"),en=document.getElementById("car-list-master"),mn=document.getElementById("parking-list-master");function Zr(){const e=document.getElementById("results-section"),t=document.getElementById("main-content");t&&(t.style.display="grid",t.style.gap="1.5rem",window.innerWidth>=768?(t.style.gridTemplateColumns=`repeat(${tr}, minmax(0, 1fr))`,e&&(e.style.gridColumn=`span ${tr}`)):(t.style.gridTemplateColumns="repeat(1, minmax(0, 1fr))",e&&(e.style.gridColumn="auto")))}async function Xr(){$n=await ne.getAllFamilies(),ls=await ne.getAllCars(),xs=$n.flatMap(e=>e.members),zo(),vs(),ws(),Da(),await wr(),await Er()}async function nc(){gt=await ne.getAllSavedParking()||[],xa.clear(),Mn(),la(),_s()}async function $a(){const e=document.getElementById("btn-load-logs");if(e&&!document.getElementById("btn-download-logs-csv")){const s=document.createElement("button");s.id="btn-download-logs-csv",s.className="ml-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-bold shadow",s.textContent="CSVダウンロード",s.onclick=ac,e.parentNode.insertBefore(s,e.nextSibling)}try{const s=new Date;s.setMonth(s.getMonth()-6),await B.from("action_logs").delete().lt("created_at",s.toISOString())}catch(s){console.error("Log rotation error:",s)}e&&(e.textContent="読込中...");const{data:t,error:n}=await B.from("action_logs").select("*").order("created_at",{ascending:!1}).limit(50);if(e&&(e.textContent="最新を読み込み"),n){console.error("Failed to load logs:",n);return}const a=document.getElementById("log-list");if(a){if(!t||t.length===0){a.innerHTML='<p class="text-gray-500 text-center py-4">ログはありません</p>';return}a.innerHTML=t.map(s=>`
        <div class="border-b border-gray-100 py-2 flex flex-col md:flex-row md:items-center">
            <span class="font-mono text-gray-500 text-xs w-32 shrink-0">${new Date(s.created_at).toLocaleString("ja-JP",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"})}</span>
            <span class="text-blue-600 font-semibold text-xs w-28 shrink-0">${s.action_type}</span>
            <span class="flex-grow text-gray-700 truncate pr-2" title="${s.details}">${s.details}</span>
            <span class="text-gray-400 text-xs text-right w-40 shrink-0 truncate" title="${s.user_email}">${s.user_email}</span>
        </div>
        `).join("")}}async function ac(){W("ログ取得中...");try{const{data:e,error:t}=await B.from("action_logs").select("*").order("created_at",{ascending:!1}).limit(1e4);if(t)throw t;if(!e||e.length===0)return alert("ログデータがありません");const n=[["日時","アクション","ユーザー","詳細"]];e.forEach(i=>{const d=new Date(i.created_at).toLocaleString("ja-JP"),l=u=>`"${String(u||"").replace(/"/g,'""')}"`;n.push([l(d),l(i.action_type),l(i.user_email),l(i.details)])});const a=new Uint8Array([239,187,191]),s=new Blob([a,n.map(i=>i.join(",")).join(`
`)],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(s),o=document.createElement("a");o.href=r,o.download=`action_logs_${new Date().toISOString().split("T")[0]}.csv`,o.click(),URL.revokeObjectURL(r)}catch(e){console.error(e),alert("CSVの作成に失敗しました: "+e.message)}finally{V()}}function sc(){var e,t,n,a,s,r,o,i,d,l,u,c,f,p,b;_t==null||_t.addEventListener("change",oc),_t==null||_t.addEventListener("input",ic),_t==null||_t.addEventListener("click",rc),Cn==null||Cn.addEventListener("change",dc),Nn==null||Nn.addEventListener("change",lc),(e=document.getElementById("assign-button"))==null||e.addEventListener("click",cc),(t=document.getElementById("dispatch-message-close"))==null||t.addEventListener("click",_r),Ns==null||Ns.addEventListener("change",mc),(n=document.getElementById("export-state-button"))==null||n.addEventListener("click",gc),(a=document.getElementById("import-state-input"))==null||a.addEventListener("change",bc),(s=document.getElementById("show-text-output-button"))==null||s.addEventListener("click",()=>{var h;(h=document.getElementById("text-output-container"))==null||h.classList.toggle("hidden"),Ca()}),(r=document.getElementById("copy-text-output-button"))==null||r.addEventListener("click",pc),(o=document.getElementById("toggle-details-button"))==null||o.addEventListener("click",fc),(i=document.getElementById("save-state-db-button"))==null||i.addEventListener("click",hc),(d=document.getElementById("load-state-db-button"))==null||d.addEventListener("click",yc),(l=document.getElementById("delete-state-db-button"))==null||l.addEventListener("click",xc),(u=document.getElementById("save-parking-db-button"))==null||u.addEventListener("click",vc),(c=document.getElementById("load-parking-db-button"))==null||c.addEventListener("click",wc),(f=document.getElementById("delete-parking-db-button"))==null||f.addEventListener("click",Ec),(p=document.getElementById("clear-db-button"))==null||p.addEventListener("click",_c),(b=document.getElementById("btn-clear-inputs"))==null||b.addEventListener("click",window.clearCurrentInputs)}function zo(){qt.clear(),$n.forEach(e=>{e.members.forEach(t=>{const n={grade:"",school:"",other:"",memo:"",...t.data||{}};t.isFlagTarget||(n.grade="",n.school="",n.other=""),qt.set(t.id,n)})})}function vs(){if(_t){if(_t.innerHTML="",$n.length===0)return _t.innerHTML='<p class="text-gray-500">データなし</p>';$n.forEach(e=>{const t=document.createElement("details");t.className="bg-gray-50 rounded border",t.open=!0;const n=document.createElement("summary");n.className="p-3 cursor-pointer select-none flex justify-between items-center",n.innerHTML=`<span class="font-semibold">${e.familyName}</span><div class="space-x-1"><button data-family-id="${e.familyName}" data-check-action="check" class="text-xs bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded">全員参加</button><button data-family-id="${e.familyName}" data-check-action="uncheck" class="text-xs bg-gray-400 hover:bg-gray-500 text-white py-1 px-2 rounded">全員不参加</button></div>`;const a=document.createElement("div");a.className="p-3 border-t border-gray-200 space-y-3",e.members.forEach(s=>{const r=In.has(s.id),o=qt.get(s.id)||{grade:"",school:"",other:"",memo:""};let i=s.isFlagTarget?`<input type="text" data-id="${s.id}" data-type="grade" value="${o.grade}" placeholder="学年" class="w-full text-sm p-1 border rounded" ${r?"":"disabled"}>
                 <input type="text" data-id="${s.id}" data-type="school" value="${o.school}" placeholder="学校" class="w-full text-sm p-1 border rounded" ${r?"":"disabled"}>
                 <input type="text" data-id="${s.id}" data-type="other" value="${o.other}" placeholder="その他" class="w-full text-sm p-1 border rounded" ${r?"":"disabled"}>
                 <input type="text" data-id="${s.id}" data-type="memo" value="${o.memo}" placeholder="備考" class="w-full text-sm p-1 border rounded" ${r?"":"disabled"}>`:`<div class="col-span-3"></div><input type="text" data-id="${s.id}" data-type="memo" value="${o.memo}" placeholder="備考" class="w-full text-sm p-1 border rounded" ${r?"":"disabled"}`;a.innerHTML+=`<div class="ml-4"><div class="flex items-center"><input type="checkbox" id="p-${s.id}" data-id="${s.id}" data-action="select-participant" class="mr-3 rounded border-gray-300 text-blue-600" ${r?"checked":""}><label for="p-${s.id}">${s.name} (${s.type})</label></div><div id="data-inputs-${s.id}" class="ml-8 mt-1.5 grid grid-cols-4 gap-2 ${r?"":"opacity-50"}">${i}</div></div>`}),t.appendChild(n),t.appendChild(a),_t.appendChild(t)})}}function rc(e){const t=e.target.closest("button[data-check-action]");if(!t)return;e.preventDefault();const n=t.dataset.checkAction==="check",a=$n.find(s=>s.familyName===t.dataset.familyId);a&&a.members.forEach(s=>{const r=document.getElementById(`p-${s.id}`);r&&r.checked!==n&&(r.checked=n,r.dispatchEvent(new Event("change",{bubbles:!0})))})}function ws(){if(Cn){if(Cn.innerHTML="",ls.length===0)return Cn.innerHTML='<p class="text-gray-500">データなし</p>';ls.forEach(e=>{const t=$n.find(i=>i.familyName===e.familyName),n=(t?t.members:xs).filter(i=>i.type!=="選手"&&i.type!=="兄弟"),a=Sn.has(e.id);let s="";if(t){const i=n.find(l=>l.type==="保護者"&&(l.name.includes("父")||l.name.includes("監督"))),d=n.find(l=>l.type==="保護者"&&l.name.includes("母"));s=i?i.id:d?d.id:""}const r=dn.get(e.id)||s;s&&!dn.has(e.id)&&dn.set(e.id,s);const o=yn.has(e.id);Cn.innerHTML+=`<div class="bg-gray-50 rounded border p-3" data-car-id="${e.id}">
            <div class="flex items-center"><input type="checkbox" id="c-${e.id}" data-id="${e.id}" data-action="select-car" class="mr-3 rounded text-blue-600" ${a?"checked":""}><label for="c-${e.id}" class="font-semibold">${e.name} (定員${e.baseCapacity}名)</label></div>
            <div id="car-options-${e.id}" class="ml-8 mt-3 space-y-3 ${a?"":"hidden"}">
                <select id="driver-${e.id}" data-action="select-driver" class="w-full p-2 border rounded text-sm"><option value="">ドライバー選択...</option>${n.map(i=>`<option value="${i.id}" ${r===i.id?"selected":""}>${i.name}</option>`).join("")}</select>
                <label class="flex items-center"><input type="checkbox" data-action="select-luggage" class="mr-2" ${o?"checked":""}>荷物あり(2名制限)</label>
            </div></div>`})}}function Da(){if(!Nn)return;Nn.innerHTML="";const e=xs.filter(t=>In.has(t.id));if(e.length===0)return Nn.innerHTML='<p class="text-gray-500 text-sm">参加者を選択してください</p>';e.forEach(t=>{Nn.innerHTML+=`<div class="flex items-center"><input type="checkbox" id="ex-${t.id}" data-id="${t.id}" data-action="exclude-participant" class="mr-3" ${Pt.has(t.id)?"checked":""}><label for="ex-${t.id}">${t.name} (${t.type})</label></div>`})}function oc(e){const t=e.target;if(t.dataset.action==="select-participant"){const n=t.dataset.id,a=document.getElementById(`data-inputs-${n}`);t.checked?(In.add(n),a&&(a.classList.remove("opacity-50"),a.querySelectorAll("input").forEach(s=>s.disabled=!1))):(In.delete(n),Pt.delete(n),a&&(a.classList.add("opacity-50"),a.querySelectorAll("input").forEach(s=>s.disabled=!0))),Da()}}function ic(e){const t=e.target;if(t.dataset.type){const n=qt.get(t.dataset.id);n[t.dataset.type]=t.value,qt.set(t.dataset.id,n)}}function dc(e){var a;const t=e.target,n=(a=t.closest("[data-car-id]"))==null?void 0:a.dataset.carId;n&&(t.dataset.action==="select-car"?t.checked?(Sn.add(n),document.getElementById(`car-options-${n}`).classList.remove("hidden")):(Sn.delete(n),yn.delete(n),document.getElementById(`car-options-${n}`).classList.add("hidden")):t.dataset.action==="select-driver"?t.value?dn.set(n,t.value):dn.delete(n):t.dataset.action==="select-luggage"&&(t.checked?yn.add(n):yn.delete(n)))}function lc(e){const t=e.target;t.dataset.action==="exclude-participant"&&(t.checked?Pt.add(t.dataset.id):Pt.delete(t.dataset.id))}function cc(){var h,g,m,y,x,E,k,_,S,I;if(Sn.size===0)return wt("車を選択してください","error");Ze={date:((h=document.getElementById("event-date"))==null?void 0:h.value)||"",name:((g=document.getElementById("event-name"))==null?void 0:g.value)||"",timeline:((m=document.getElementById("event-timeline"))==null?void 0:m.value)||"",notes:((y=document.getElementById("event-notes"))==null?void 0:y.value)||""},Ce={groundName:((x=document.getElementById("ground-name"))==null?void 0:x.value)||"",designated:{name:((E=document.getElementById("parking-designated-name"))==null?void 0:E.value)||"指定駐車場",limit:parseInt((k=document.getElementById("parking-designated-limit"))==null?void 0:k.value)||999,memo:((_=document.getElementById("parking-designated-memo"))==null?void 0:_.value)||""},other:{name:((S=document.getElementById("parking-other-name"))==null?void 0:S.value)||"指定以外",memo:((I=document.getElementById("parking-other-memo"))==null?void 0:I.value)||""}};let e=!1;if(de&&de.length>0&&de.some(v=>v.id!=="excluded-car")){if(confirm(`すでに配車結果が存在します。
現在の配車状態を【維持】して、追加・変更分のみを反映しますか？
（「キャンセル」を選ぶと、全てリセットして最初からやり直すか確認します）`))e=!0;else if(!confirm(`現在の状態を【全てリセット】して、最初から割り当てをやり直しますか？
（キャンセルを選ぶと処理を中断します）`))return}let t=[],n=new Map,a=[];const s=xs.filter(v=>In.has(v.id)).map(v=>{const w=$n.find(A=>A.members.some(P=>P.id===v.id)),$=qt.get(v.id)||{};return{...v,grade:$.grade,school:$.school,other:$.other,memo:$.memo,familyName:w?w.familyName:null}});if(Sn.forEach(v=>{const w=dn.get(v),$=ls.find(R=>R.id===v);if(!$)return;if(!w)return t.push(`${$.name}のドライバー未選択`);const A=s.find(R=>R.id===w);if(!A)return t.push(`${$.name}のドライバーが参加者にいません`);n.set(v,A);const P=yn.has(v);a.push({id:v,name:$.name,familyName:$.familyName,baseCapacity:P?2:$.baseCapacity,driverId:w,capacity:P?1:$.baseCapacity-1,hasLuggage:P})}),t.length>0)return wt(t.join("<br>"),"error");const r=new Set(Array.from(n.values()).map(v=>v.id));let o=s.filter(v=>Pt.has(v.id)&&!r.has(v.id)),i=[];e?a.forEach(v=>{let w=de.find(A=>A.id===v.id),$=[];w&&($=w.members.filter(A=>{if(!A)return!1;let P=s.some(M=>M.id===A.id),R=Pt.has(A.id),D=r.has(A.id);return P&&!R&&!D}),$.length>v.capacity&&($=$.slice(0,v.capacity))),i.push({...v,driver:n.get(v.id),members:$})}):i=a.map(v=>({...v,driver:n.get(v.id),members:[]}));let d=new Set(r);i.forEach(v=>v.members.forEach(w=>{w&&d.add(w.id)}));let l=s.filter(v=>!d.has(v.id)&&!Pt.has(v.id));i.reduce((v,w)=>v+w.capacity,0),i.reduce((v,w)=>v+w.members.length,0);let u=[...l];const c={保護者:1,兄弟:2,選手:3,その他:4};i.forEach(v=>{v.driver&&v.familyName&&u.filter($=>$.familyName===v.familyName).sort(($,A)=>(c[$.type]||9)-(c[A.type]||9)).forEach($=>{v.members.length<v.capacity&&(v.members.push($),u=u.filter(A=>A.id!==$.id))})}),u.sort((v,w)=>v.isFlagTarget===w.isFlagTarget?Math.random()-.5:v.isFlagTarget?-1:1).forEach(v=>{let w=[],$=0;if(i.forEach(A=>{if(A.members.length>=A.capacity)return;let P=A.members.filter(R=>R).reduce((R,D)=>R+(D.isFlagTarget&&v.isFlagTarget?(v.grade===D.grade?1:0)+(v.school===D.school?1:0):0),0);P>$?($=P,w=[A]):P===$&&w.push(A)}),w.length>0)w[Math.floor(Math.random()*w.length)].members.push(v);else{let A=i.filter(P=>P.members.length<P.capacity);A.length>0&&A[0].members.push(v)}}),i.forEach(v=>{for(v.members=v.members.filter(w=>w);v.members.length<v.capacity;)v.members.push(null)}),e?i.sort((v,w)=>{let $=de.findIndex(P=>P.id===v.id),A=de.findIndex(P=>P.id===w.id);return $!==-1&&A!==-1?$-A:$!==-1?-1:A!==-1?1:w.members.filter(P=>P&&P.type==="選手").length-v.members.filter(P=>P&&P.type==="選手").length}):i.sort((v,w)=>w.members.filter($=>$&&$.type==="選手").length-v.members.filter($=>$&&$.type==="選手").length);let f=0;i.forEach(v=>{if(e){let w=de.find($=>$.id===v.id);w?(v.assignedParking=w.assignedParking,v.assignedParking==="designated"&&f++):f<Ce.designated.limit?(v.assignedParking="designated",f++):v.assignedParking="other"}else f<Ce.designated.limit?(v.assignedParking="designated",f++):v.assignedParking="other"});const p=new Set(r);i.forEach(v=>{v.members.forEach(w=>{w&&p.add(w.id)})}),s.filter(v=>!p.has(v.id)&&!Pt.has(v.id)).forEach(v=>{o.some(w=>w.id===v.id)||o.push(v)}),i.push({id:"excluded-car",name:"別便",capacity:999,baseCapacity:999,driver:null,members:o,hasLuggage:!1,assignedParking:"excluded"}),de=i,Es(),Ca()}function Es(){const e=document.getElementById("results");if(!e)return;if(e.innerHTML="",Qt={car:null,seat:null},de.length===0){e.innerHTML='<p class="text-gray-500 bg-white p-4 rounded shadow">結果なし</p>',eo();return}(Ze.name||Ze.date)&&(e.innerHTML+=`<h2 class="text-2xl font-bold mb-2">${Ze.date} ${Ze.name} ${Ce.groundName?`@${Ce.groundName}`:""}</h2>`);const t=de.filter(r=>r.assignedParking==="designated"),n=de.filter(r=>r.assignedParking==="other"),a=de.filter(r=>r.id==="excluded-car"),s=(r,o,i)=>`<div class="bg-white rounded shadow p-4"><h3 class="font-bold text-lg mb-2">◆${o.name||"別便"} ${r==="designated"&&o.limit<999?`(${o.limit}台)`:""}</h3><p class="text-sm text-gray-600 mb-4 whitespace-pre-line">${o.memo}</p><div class="grid grid-cols-1 md:grid-cols-3 gap-4">${i.map(uc).join("")}</div></div>`;e.innerHTML+=s("designated",Ce.designated,t),e.innerHTML+=s("other",Ce.other,n),a[0].members.length>0&&(e.innerHTML+=s("excluded",{name:"別便",memo:""},a)),eo()}function uc(e){var r,o;`${e.id}`;let t="",n="",a="";const s=`swap-car-${e.id}`;if(e.id==="excluded-car"){t=`<div class="p-4 border-b bg-gray-100 flex-shrink-0"><h4 class="font-bold text-lg text-gray-700">合計: ${e.members.length}名</h4></div>`,a=e.members.map((d,l)=>{var p;if(!d)return"";const u=(((p=qt.get(d.id))==null?void 0:p.memo)||"").trim(),c=d.isFlagTarget&&(d.grade||d.school||d.other)?[d.grade,d.school,d.other].filter(Boolean).join(" "):"",f=`seat-${e.id}-${d.id}`;return`<li class="p-2 bg-gray-100 rounded shadow-sm flex items-center justify-between">
                        <div class="flex items-center min-w-0">
                            <input type="checkbox" id="${f}" data-swap-type="seat" data-car-id="${e.id}" data-participant-id="${d.id}" data-is-driver="false" data-slot-index="${l}" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                            <label for="${f}" class="flex flex-col min-w-0">
                                <span class="break-words">${d.name} (${d.type})</span>
                                ${u?`<span class="text-xs text-gray-500 break-words">[${u}]</span>`:""}
                            </label>
                        </div>
                        <span class="text-xs text-gray-400 ml-2 flex-shrink-0">${c}</span>
                    </li>`}).join("");const i="seat-excluded-car-empty";a+=`<li class="p-2 bg-gray-50 rounded shadow-sm flex items-center">
                            <input type="checkbox" id="${i}" data-swap-type="seat" data-car-id="${e.id}" data-participant-id="empty" data-is-driver="false" data-slot-index="-1" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                            <label for="${i}" class="text-gray-400 italic">-- 別便へ移動 --</label>
                        </li>`}else{const i=(e.driver?1:0)+e.members.filter(g=>g!==null).length,d=e.baseCapacity-i,l=e.capacity-e.members.filter(g=>g!==null).length,u=e.hasLuggage?" (荷物あり)":"";t=`
            <div class="p-4 border-b flex-shrink-0 flex items-center car-header">
                <input type="checkbox" id="${s}" data-swap-type="car" data-car-id="${e.id}" class="mr-3 rounded border-gray-400 text-green-600 focus:ring-green-500">
                <div>
                    <h4 class="font-bold text-lg"><label for="${s}">${e.name} ${u}</label></h4>
                    <p class="text-sm font-medium ${l<0?"text-red-600":"text-blue-600"}">
                    総定員 ${e.baseCapacity}名 (空き ${d}名)
                    </p>
                </div>
            </div>`;const c=e.driver,f=c?c.id:"empty",p=c?`[D] ${c.name} (${c.type})`:"ドライバー空席",b=c&&(((r=qt.get(c.id))==null?void 0:r.memo)||"").trim(),h=`seat-${e.id}-driver`;n=`
        <div id="driver-dropzone-${e.id}" class="p-4 border-b driver-dropzone flex-shrink-0">
            <li class="p-2 ${c?"bg-blue-100":"bg-red-50"} rounded shadow-sm flex items-center">
                 <input type="checkbox" id="${h}" data-swap-type="seat" data-car-id="${e.id}" data-participant-id="${f}" data-is-driver="true" data-slot-index="-1" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                 <label for="${h}" class="flex flex-col min-w-0 ${c?"text-blue-800":"text-red-700"}">
                    <span class="font-semibold break-words">${p}</span>
                    ${b?`<span class="text-xs ${c?"text-blue-600":"text-red-600"} ml-2 break-words">[${b}]</span>`:""}
                 </label>
            </li>
        </div>`;for(let g=0;g<e.capacity;g++){const m=e.members[g];if(m){const y=(((o=qt.get(m.id))==null?void 0:o.memo)||"").trim(),x=m.isFlagTarget&&(m.grade||m.school||m.other)?[m.grade,m.school,m.other].filter(Boolean).join(" "):"",E=`seat-${e.id}-${m.id}`;a+=`<li class="p-2 bg-gray-100 rounded shadow-sm flex items-center justify-between">
                                    <div class="flex items-center min-w-0">
                                        <input type="checkbox" id="${E}" data-swap-type="seat" data-car-id="${e.id}" data-participant-id="${m.id}" data-is-driver="false" data-slot-index="${g}" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                        <label for="${E}" class="flex flex-col min-w-0">
                                            <span class="break-words">${m.name} (${m.type})</span>
                                            ${y?`<span class="text-xs text-gray-500 break-words">[${y}]</span>`:""}
                                        </label>
                                    </div>
                                    <span class="text-xs text-gray-400 ml-2 flex-shrink-0">${x}</span>
                                </li>`}else{const y=`seat-${e.id}-empty-${g}`;a+=`<li class="p-2 bg-gray-50 rounded shadow-sm flex items-center">
                                    <input type="checkbox" id="${y}" data-swap-type="seat" data-car-id="${e.id}" data-participant-id="empty" data-is-driver="false" data-slot-index="${g}" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                    <label for="${y}" class="text-gray-400 italic">-- 空席 --</label>
                                </li>`}}}return`<div class="bg-white border rounded-lg shadow-md car-dropzone flex flex-col">${t}${n}<ul id="members-dropzone-${e.id}" class="p-4 space-y-2 min-h-[50px] members-dropzone flex-grow overflow-y-auto">${a}</ul></div>`}function mc(e){const t=e.target;if(t.type!=="checkbox"||!t.dataset.swapType)return;const n=t.dataset.swapType;if(Qt[n]&&Qt[n].el===t){Qt[n]=null,t.closest("div").classList.remove("swap-selected");return}const a={carId:t.dataset.carId,pid:t.dataset.participantId,isD:t.dataset.isDriver==="true",idx:parseInt(t.dataset.slotIndex),el:t};if(t.closest("div").classList.add("swap-selected"),n==="car"&&Qt.seat||n==="seat"&&Qt.car)return t.checked=!1,wt("車と席の混在不可","error");if(!Qt[n]){Qt[n]=a;return}const s=Qt[n],r=a;if(n==="car"){const o=de.find(d=>d.id===s.carId),i=de.find(d=>d.id===r.carId);if(o&&i)if(o.assignedParking===i.assignedParking){const d=de.indexOf(o),l=de.indexOf(i);d>-1&&l>-1&&([de[d],de[l]]=[de[l],de[d]])}else{const d=o.assignedParking;o.assignedParking=i.assignedParking,i.assignedParking=d}}else{const o=de.find(u=>u.id===s.carId),i=de.find(u=>u.id===r.carId),d=s.pid==="empty"?null:s.isD?o.driver:o.members[s.idx],l=r.pid==="empty"?null:r.isD?i.driver:i.members[r.idx];s.isD?o.driver=l:o.id!=="excluded-car"?o.members[s.idx]=l:(o.members=o.members.filter(u=>u&&u.id!==(d==null?void 0:d.id)),l&&o.members.push(l)),r.isD?i.driver=d:i.id!=="excluded-car"?i.members[r.idx]=d:(i.members=i.members.filter(u=>u&&u.id!==(l==null?void 0:l.id)),d&&i.members.push(d)),[o,i].forEach(u=>{if(u.id!=="excluded-car")for(u.members=u.members.filter(c=>c);u.members.length<u.capacity;)u.members.push(null);else u.members=u.members.filter(c=>c)})}Es(),Ca()}function Ca(){const e=document.getElementById("text-output");if(!e)return;if(de.length===0){e.value="";return}const t=Ce.groundName?`@${Ce.groundName}`:"";let n=[`${Ze.date} ${Ze.name}${t}
`];Ze.timeline&&n.push(Ze.timeline+`
`);const a=o=>`${o.name.replace(/の車|家の車/g,"カー")} (${o.driver?o.driver.name:"未定"}, ${o.members.filter(i=>i).map(i=>(i.type==="選手"?"★":"")+i.name).join(", ")}${o.hasLuggage?", 荷物":""})`;n.push(`◆${Ce.designated.name}
${Ce.designated.memo}`),de.filter(o=>o.assignedParking==="designated").forEach(o=>n.push("・"+a(o)));const s=de.filter(o=>o.assignedParking==="other");s.length>0&&(n.push(`
◆${Ce.other.name}
${Ce.other.memo}`),s.forEach(o=>n.push("・"+a(o))));const r=de.find(o=>o.id==="excluded-car");r&&r.members.length>0&&(n.push(`
◆別便`),r.members.filter(o=>o).forEach(o=>n.push("・"+(o.type==="選手"?"★":"")+o.name))),Ze.notes&&n.push(`
◆その他
`+Ze.notes),e.value=n.join(`
`)}function pc(){const e=document.getElementById("text-output");e&&(navigator.clipboard.writeText(e.value),wt("コピーしました","success"))}function fc(){const e=document.getElementById("toggle-details-button"),t=e.textContent==="すべて開く";_t.querySelectorAll("details").forEach(n=>n.open=t),e.textContent=t?"すべて閉じる":"すべて開く"}function Wo(){var e,t,n,a,s,r,o,i,d,l;return Ze={date:((e=document.getElementById("event-date"))==null?void 0:e.value)||"",name:((t=document.getElementById("event-name"))==null?void 0:t.value)||"",timeline:((n=document.getElementById("event-timeline"))==null?void 0:n.value)||"",notes:((a=document.getElementById("event-notes"))==null?void 0:a.value)||""},Ce={groundName:((s=document.getElementById("ground-name"))==null?void 0:s.value)||"",designated:{name:((r=document.getElementById("parking-designated-name"))==null?void 0:r.value)||"指定駐車場",limit:parseInt((o=document.getElementById("parking-designated-limit"))==null?void 0:o.value)||999,memo:((i=document.getElementById("parking-designated-memo"))==null?void 0:i.value)||""},other:{name:((d=document.getElementById("parking-other-name"))==null?void 0:d.value)||"指定以外",memo:((l=document.getElementById("parking-other-memo"))==null?void 0:l.value)||""}},{selectedParticipantIds:Array.from(In),selectedCarIds:Array.from(Sn),selectedDrivers:Array.from(dn.entries()),selectedLuggage:Array.from(yn),excludedParticipantIds:Array.from(Pt),participantData:Array.from(qt.entries()),currentAssignments:de,parkingInfo:Ce,eventInfo:Ze}}function Jo(e){var t,n,a,s,r;In=new Set(e.selectedParticipantIds||[]),Sn=new Set(e.selectedCarIds||[]),dn=new Map(e.selectedDrivers||[]),yn=new Set(e.selectedLuggage||[]),Pt=new Set(e.excludedParticipantIds||[]),qt=new Map(e.participantData||[]),Ce=e.parkingInfo||{groundName:"",designated:{name:"",limit:0,memo:""},other:{name:"",memo:""}},Ze=e.eventInfo||{date:"",name:"",timeline:"",notes:""},document.getElementById("event-date")&&(document.getElementById("event-date").value=Ze.date||""),document.getElementById("event-name")&&(document.getElementById("event-name").value=Ze.name||""),document.getElementById("event-timeline")&&(document.getElementById("event-timeline").value=Ze.timeline||""),document.getElementById("event-notes")&&(document.getElementById("event-notes").value=Ze.notes||""),document.getElementById("ground-name")&&(document.getElementById("ground-name").value=Ce.groundName||""),document.getElementById("parking-designated-name")&&(document.getElementById("parking-designated-name").value=((t=Ce.designated)==null?void 0:t.name)||""),document.getElementById("parking-designated-limit")&&(document.getElementById("parking-designated-limit").value=((n=Ce.designated)==null?void 0:n.limit)||""),document.getElementById("parking-designated-memo")&&(document.getElementById("parking-designated-memo").value=((a=Ce.designated)==null?void 0:a.memo)||""),document.getElementById("parking-other-name")&&(document.getElementById("parking-other-name").value=((s=Ce.other)==null?void 0:s.name)||""),document.getElementById("parking-other-memo")&&(document.getElementById("parking-other-memo").value=((r=Ce.other)==null?void 0:r.memo)||""),de=e.currentAssignments||[],Es(),Ca()}function gc(){const e=new Blob([JSON.stringify(Wo(),null,2)],{type:"application/json"}),t=document.createElement("a");t.href=URL.createObjectURL(e),t.download="state.json",t.click()}function bc(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=a=>{Jo(JSON.parse(a.target.result)),vs(),ws(),Da()},n.readAsText(t)}async function hc(){const e=document.getElementById("saved-state-select"),t=e.value;let n=`${document.getElementById("event-date").value}_${document.getElementById("event-name").value}`,a=!1,s=null;if(t){const r=e.options[e.selectedIndex];confirm(`現在「${r.text}」が選択されています。
このデータに上書き保存しますか？
（「キャンセル」を選ぶと新規保存になります）`)&&(a=!0,n=r.text,s=t)}if(!a){const r=prompt("保存名",n);if(!r)return;n=r}try{a&&s&&await ne.deleteState(s),await ne.saveState(Wo(),n),await wr();const r=document.getElementById("saved-state-select");for(let o=0;o<r.options.length;o++)if(r.options[o].text===n){r.selectedIndex=o;break}wt(a?"上書き保存しました":"保存しました","success")}catch{wt("保存に失敗しました","error")}}async function yc(){const e=document.getElementById("saved-state-select").value;if(!e)return;const t=await ne.getState(e);t&&(Jo(t.state),vs(),ws(),Da(),wt("読込完了","success"))}async function xc(){const e=document.getElementById("saved-state-select").value;e&&(await ne.deleteState(e),await wr(),wt("削除完了","success"))}async function wr(){const e=await ne.getAllSavedStates(),t=document.getElementById("saved-state-select");t&&(t.innerHTML='<option value="">作業一覧...</option>'+e.map(n=>`<option value="${n.id}">${n.name}</option>`).join(""))}async function vc(){const e=document.getElementById("saved-parking-select"),t=e.value;let n=document.getElementById("ground-name").value||"新規駐車場",a=!1,s=null;if(t){const o=e.options[e.selectedIndex];confirm(`現在「${o.text}」が選択されています。
このデータに上書き保存しますか？
（「キャンセル」を選ぶと新規保存になります）`)&&(a=!0,n=o.text,s=t)}if(!a){const o=prompt("駐車場保存名",n);if(!o)return;n=o}const r={groundName:document.getElementById("ground-name").value,designated:{name:document.getElementById("parking-designated-name").value,limit:parseInt(document.getElementById("parking-designated-limit").value),memo:document.getElementById("parking-designated-memo").value},other:{name:document.getElementById("parking-other-name").value,memo:document.getElementById("parking-other-memo").value}};try{a&&s&&await ne.deleteParking(s),await ne.saveParking(r,n),await Er();const o=document.getElementById("saved-parking-select");for(let i=0;i<o.options.length;i++)if(o.options[i].text===n){o.selectedIndex=i;break}wt(a?"駐車場を上書き保存しました":"駐車場を保存しました","success")}catch{wt("保存に失敗しました","error")}}async function wc(){const e=document.getElementById("saved-parking-select").value;if(!e)return;const t=await ne.getParking(e);t&&(document.getElementById("ground-name").value=t.parking.groundName,document.getElementById("parking-designated-name").value=t.parking.designated.name,document.getElementById("parking-designated-limit").value=t.parking.designated.limit,document.getElementById("parking-designated-memo").value=t.parking.designated.memo,document.getElementById("parking-other-name").value=t.parking.other.name,document.getElementById("parking-other-memo").value=t.parking.other.memo,wt("駐車場読込完了","success"))}async function Ec(){const e=document.getElementById("saved-parking-select").value;e&&(await ne.deleteParking(e),await Er(),wt("駐車場削除完了","success"))}async function Er(){const e=await ne.getAllSavedParking(),t=document.getElementById("saved-parking-select");t&&(t.innerHTML='<option value="">駐車場一覧...</option>'+e.map(n=>`<option value="${n.id}">${n.name}</option>`).join(""))}async function _c(){confirm("全データをリセットしますか？")&&(await ne.clearDatabase(),location.reload())}window.clearCurrentInputs=function(){if(!confirm(`現在の入力内容（イベント情報、選択メンバー、車、駐車場、配車結果など）をすべてクリアして、初期状態に戻しますか？
（※データベースに保存されているマスタデータや過去の保存データは削除されません）`))return;const e=document.getElementById("event-date");e&&(e.value="");const t=document.getElementById("event-name");t&&(t.value="");const n=document.getElementById("event-timeline");n&&(n.value="");const a=document.getElementById("event-remarks");a&&(a.value="");const s=document.getElementById("ground-name");s&&(s.value="");const r=document.getElementById("parking-name");r&&(r.value="");const o=document.getElementById("parking-limit");o&&(o.value="99");const i=document.getElementById("parking-remarks");i&&(i.value="");const d=document.getElementById("other-parking-name");d&&(d.value="");const l=document.getElementById("other-parking-remarks");l&&(l.value=""),In.clear(),Sn.clear(),dn.clear(),yn.clear(),Pt.clear(),qt.clear(),zo(),de=[],vs(),ws(),Da(),Es(),Ca(),window.att_swapSelectedMember=null,window.att_swapSelectedCar=null,wt("画面の入力をクリアしました。","success")};function wt(e,t="info"){const n=document.getElementById("dispatch-message");let a="bg-blue-100 text-blue-700 border-blue-200";t==="error"?a="bg-red-100 text-red-700 border-red-200":t==="success"?a="bg-green-100 text-green-700 border-green-200":t==="warning"&&(a="bg-yellow-100 text-yellow-800 border-yellow-200"),n.className=`p-4 h-full border rounded-lg ${a}`,document.getElementById("dispatch-message-text").innerHTML=e,n.classList.remove("hidden"),Ds&&clearTimeout(Ds),t!=="warning"&&(Ds=setTimeout(_r,5e3))}function _r(){document.getElementById("dispatch-message").classList.add("hidden")}function $c(){if(!de||de.length===0)return!1;for(const t of de){if(t.id==="excluded-car")continue;if((t.driver?1:0)+t.members.filter(a=>a!==null).length>t.baseCapacity)return!0}const e=de.find(t=>t.id==="excluded-car");return e?e.members.some(t=>t&&!Pt.has(t.id)):!1}function eo(){if($c())wt("定員オーバーです。車の台数が足りないか、定員を超過している車があります。","warning");else{const e=document.getElementById("dispatch-message"),t=document.getElementById("dispatch-message-text");e&&!e.classList.contains("hidden")&&t&&t.innerHTML.includes("定員オーバー")&&_r()}}function Ic(){var t,n,a,s,r,o,i;const e=document.querySelector("#view-master h2");if(e&&!document.getElementById("btn-back-to-dispatch-master")){const d=document.createElement("button");d.id="btn-back-to-dispatch-master",d.className="bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 px-4 py-2 rounded shadow font-bold text-sm mb-4 flex items-center w-fit",d.innerHTML='<span class="mr-1">◀</span> 配車調整に戻る',d.addEventListener("click",()=>{var l;return(l=document.getElementById("nav-dispatch"))==null?void 0:l.click()}),e.parentElement.insertBefore(d,e)}(t=document.getElementById("add-family-button"))==null||t.addEventListener("click",kc),Nt==null||Nt.addEventListener("click",Lc),Nt==null||Nt.addEventListener("input",Ac),Nt==null||Nt.addEventListener("change",Bc),(n=document.getElementById("add-car-button"))==null||n.addEventListener("click",Tc),en==null||en.addEventListener("click",Dc),en==null||en.addEventListener("input",Cc),(a=document.getElementById("add-parking-button-master"))==null||a.addEventListener("click",Nc),mn==null||mn.addEventListener("click",Mc),mn==null||mn.addEventListener("input",Pc),(s=document.getElementById("export-master-button"))==null||s.addEventListener("click",Rc),(r=document.getElementById("import-master-input"))==null||r.addEventListener("change",Oc),(o=document.getElementById("master-message-close"))==null||o.addEventListener("click",Yo),(i=document.getElementById("save-master-db-button"))==null||i.addEventListener("click",Sc)}async function Sc(){const e=document.getElementById("save-master-db-button");try{e.textContent="保存中...",await ne.syncAllMaster(),nr("マスターデータをサーバーに保存しました","success"),gt=await ne.getAllSavedParking()||[],$a()}catch(t){nr("保存に失敗しました: "+t.message,"error")}finally{e.textContent="マスターデータを保存 (更新)"}}function Mn(){Nt&&(Nt.innerHTML="",Ee.sort((e,t)=>(e.order??99)-(t.order??99)).forEach((e,t)=>{const n=e.members.map(a=>`<div class="p-2 border rounded bg-gray-50 member-grid"><input data-id="${a.id}" data-f="name" value="${a.name}" class="col-span-3 md:col-span-1 p-1 border"><select data-id="${a.id}" data-f="type" class="col-span-2 md:col-span-1 p-1 border"><option ${a.type==="選手"?"selected":""}>選手</option><option ${a.type==="保護者"?"selected":""}>保護者</option><option ${a.type==="兄弟"?"selected":""}>兄弟</option><option ${a.type==="その他"?"selected":""}>その他</option></select><input data-id="${a.id}" data-f="data.grade" value="${a.data.grade||""}" placeholder="学年" class="col-span-1 border"><input data-id="${a.id}" data-f="data.school" value="${a.data.school||""}" placeholder="学校" class="col-span-2 md:col-span-1 border"><input data-id="${a.id}" data-f="data.other" value="${a.data.other||""}" placeholder="他" class="col-span-2 md:col-span-1 border"><input data-id="${a.id}" data-f="data.memo" value="${a.data.memo||""}" placeholder="備考" class="col-span-2 md:col-span-1 border"><div class="col-span-3 md:col-span-1 flex items-center justify-between"><label class="text-xs"><input type="checkbox" data-id="${a.id}" data-f="isFlagTarget" ${a.isFlagTarget?"checked":""}>同乗優先</label><button data-action="del-m" data-id="${a.id}" class="bg-red-500 text-white px-2 py-1 rounded text-xs">削</button></div></div>`).join("");Nt.innerHTML+=`<div class="bg-white border rounded shadow" data-fname="${e.familyName}"><div class="family-header"><input data-action="ren-f" value="${e.familyName}" class="font-bold border p-1"><div class="space-x-2"><button data-action="up" class="bg-gray-400 text-white px-2 rounded text-xs">▲</button><button data-action="down" class="bg-gray-400 text-white px-2 rounded text-xs">▼</button><button data-action="del-f" class="bg-red-500 text-white px-2 py-1 rounded text-xs">家族削除</button></div></div><div class="p-3 space-y-2">${n}</div><button data-action="add-m" class="ml-3 mb-3 bg-blue-500 text-white px-2 py-1 rounded text-xs">＋メンバー</button></div>`}))}function kc(){const e=prompt("家族名");e&&(ne.addFamily({familyName:e,order:99,members:[{id:"p"+Date.now(),name:"新規",type:"選手",isFlagTarget:!0,data:{}}]}),Mn())}async function Lc(e){const t=e.target,n=t.dataset.action,a=t.closest("[data-fname]");if(!a)return;const s=a.dataset.fname;if(n==="del-f"&&confirm("削除?")&&(ne.deleteFamily(s),Mn()),n==="add-m"){const r=await ne.getFamily(s);r.members.push({id:"p"+Date.now(),name:"新規",type:"保護者",isFlagTarget:!1,data:{}}),ne.updateFamily(r),Mn()}if(n==="del-m"){const r=await ne.getFamily(s);r.members=r.members.filter(o=>o.id!==t.dataset.id),ne.updateFamily(r),Mn()}if(n==="up"||n==="down"){Ee.sort((i,d)=>(i.order??99)-(d.order??99)),Ee.forEach((i,d)=>{i.order=d});const r=Ee.findIndex(i=>i.familyName===s),o=n==="up"?r-1:r+1;if(o>=0&&o<Ee.length){const i=Ee[r].order;Ee[r].order=Ee[o].order,Ee[o].order=i,Mn()}}}function Bc(e){const t=e.target,n=t.closest("[data-fname]");if(!n)return;const a=n.dataset.fname;if(t.dataset.action==="ren-f"){const s=t.value.trim();if(s&&s!==a){if(Ee.find(i=>i.familyName===s)){alert(`家族名「${s}」は既に存在します。別の名前を入力してください。`),t.value=a;return}const o=Ee.find(i=>i.familyName===a);if(o){o.familyName=s,n.dataset.fname=s;let i=!1;$e.forEach(d=>{d.familyName===a&&(d.familyName=s,i=!0)}),i&&la()}}else s||(t.value=a)}}async function Ac(e){const t=e.target;if(t.dataset.action==="ren-f")return;const n=t.dataset.id,a=t.dataset.f,s=t.closest("[data-fname]").dataset.fname;if(!n||!a)return;const r=await ne.getFamily(s),o=r.members.find(d=>d.id===n),i=t.type==="checkbox"?t.checked:t.value;a.startsWith("data.")?o.data[a.split(".")[1]]=i:o[a]=i,ne.updateFamily(r)}function la(){en&&(en.innerHTML="",$e.sort((e,t)=>(e.order??99)-(t.order??99)).forEach(e=>{en.innerHTML+=`<div class="p-3 border rounded bg-gray-50 flex flex-wrap gap-2 items-center" data-cid="${e.id}"><button data-act="up" class="bg-gray-400 text-white px-2 py-1 text-xs">▲</button><button data-act="down" class="bg-gray-400 text-white px-2 py-1 text-xs">▼</button><input data-f="name" value="${e.name}" class="p-1 border text-sm w-32"><input data-f="familyName" value="${e.familyName}" class="p-1 border text-sm w-32"><input type="number" data-f="baseCapacity" value="${e.baseCapacity}" class="p-1 border text-sm w-16"><button data-act="del" class="bg-red-500 text-white px-2 py-1 rounded text-xs">削</button></div>`}))}function Tc(){ne.addCar({id:"c"+Date.now(),name:"新規車",familyName:"",baseCapacity:5,order:99}),la()}function Dc(e){const t=e.target,n=t.dataset.act,a=t.closest("[data-cid]");if(!a)return;const s=a.dataset.cid;if(n==="del"&&(ne.deleteCar(s),la()),n==="up"||n==="down"){$e.sort((i,d)=>(i.order??99)-(d.order??99)),$e.forEach((i,d)=>{i.order=d});const r=$e.findIndex(i=>i.id===s),o=n==="up"?r-1:r+1;if(o>=0&&o<$e.length){const i=$e[r].order;$e[r].order=$e[o].order,$e[o].order=i,la()}}}async function Cc(e){const t=e.target,n=t.dataset.f,a=t.closest("[data-cid]").dataset.cid;if(!n)return;const s=await ne.getCar(a);s[n]=t.type==="number"?parseInt(t.value):t.value,ne.updateCar(s)}function _s(){mn.innerHTML="",gt.forEach(e=>{mn.innerHTML+=`
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
        </div>`})}function Nc(){ne.addParkingMaster({groundName:"",designated:{name:"",limit:0,memo:""},other:{name:"",memo:""}},"新規P"),_s()}function Mc(e){e.target.dataset.act==="del"&&(ne.deleteParkingMaster(e.target.closest("[data-pid]").dataset.pid),_s())}function Pc(e){const t=e.target,n=t.dataset.f,a=t.closest("[data-pid]").dataset.pid;if(!n)return;const s=gt.find(o=>o.id===a),r=t.type==="number"?parseInt(t.value):t.value;if(n==="name")s.name=r;else{const o=n.split(".");o.length===2?s[o[0]][o[1]]=r:s[o[0]][o[1]][o[2]]=r}ne.updateParkingMaster(s)}async function Rc(){const e={families:Ee,cars:$e,parking:await ne.getAllSavedParking()},t=document.createElement("a");t.href=URL.createObjectURL(new Blob([JSON.stringify(e)],{type:"application/json"})),t.download="master.json",t.click()}function Oc(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=a=>{const s=JSON.parse(a.target.result);if(ne.bulkAddFamilies(s.families),ne.bulkAddCars(s.cars),s.parking){gt.forEach(r=>xa.add(r.id)),gt=[];for(let r of s.parking)gt.push({id:r.id||"p"+Date.now()+Math.floor(Math.random()*1e3),name:r.name,timestamp:r.timestamp||Date.now(),parking:r.parking,isNew:!0})}Mn(),la(),_s(),nr("読込完了 (※まだ保存されていません。保存ボタンを押してください)","info")},n.readAsText(t)}function nr(e,t="info"){const n=document.getElementById("master-message");n.className=`p-4 mb-4 border rounded-lg ${t==="error"?"bg-red-100 text-red-700":t==="success"?"bg-green-100 text-green-700":"bg-blue-100 text-blue-700"}`,document.getElementById("master-message-text").innerHTML=e,n.classList.remove("hidden"),Cs&&clearTimeout(Cs),Cs=setTimeout(Yo,5e3)}function Yo(){document.getElementById("master-message").classList.add("hidden")}let ln={type:"",add:[],update:[],delete:[]};function Ko(e,t,n,a,s,r=""){ln={type:e,add:t,update:n,delete:a},document.getElementById("csv-confirm-title").textContent=s,document.getElementById("csv-add-count").textContent=t.length,document.getElementById("csv-update-count").textContent=n.length,document.getElementById("csv-delete-count").textContent=a.length;const o=document.getElementById("csv-confirm-warning");r?(o.innerHTML=r,o.classList.remove("hidden")):o.classList.add("hidden"),document.getElementById("tab-csv-add").onclick=()=>Qn("add"),document.getElementById("tab-csv-update").onclick=()=>Qn("update"),document.getElementById("tab-csv-delete").onclick=()=>Qn("delete"),t.length>0?Qn("add"):n.length>0?Qn("update"):Qn("delete"),document.getElementById("csv-confirm-modal").classList.remove("hidden")}function cs(){document.getElementById("csv-confirm-modal").classList.add("hidden");const e=document.getElementById("input-import-users-csv");e&&(e.value="");const t=document.getElementById("input-import-events-csv");t&&(t.value="")}function Qn(e){["add","update","delete"].forEach(n=>{const a=document.getElementById(`tab-csv-${n}`);n===e?(a.classList.add("text-blue-600","border-blue-600"),a.classList.remove("text-gray-500","border-transparent")):(a.classList.remove("text-blue-600","border-blue-600"),a.classList.add("text-gray-500","border-transparent"))}),Fc(e)}function Fc(e){const t=document.getElementById("csv-confirm-content"),n=ln[e];if(!n||n.length===0){t.innerHTML='<p class="text-gray-500 p-4">対象のデータはありません。</p>';return}let a="";if(ln.type==="users"){const s=e==="add",r=e==="update";a+=`
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
        </div>`}else ln.type==="events"&&(a+=`
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
        </div>`);t.innerHTML=a}function Qo(e){const t=[];let n=[],a="",s=!1;for(let r=0;r<e.length;r++){const o=e[r];s?o==='"'?r+1<e.length&&e[r+1]==='"'?(a+='"',r++):s=!1:a+=o:o==='"'?s=!0:o===","?(n.push(a),a=""):o===`
`||o==="\r"?(n.push(a),t.push(n),n=[],a="",o==="\r"&&r+1<e.length&&e[r+1]===`
`&&r++):a+=o}return(a||n.length>0)&&(n.push(a),t.push(n)),t}function $r(e){if(e==null)return"";const t=String(e);return t.includes(",")||t.includes('"')||t.includes(`
`)||t.includes("\r")?'"'+t.replace(/"/g,'""')+'"':t}async function Hc(){W("メンバー情報をエクスポート中...");try{const{data:e}=await B.from("app_users").select("*").order("created_at",{ascending:!1}),{data:t}=await B.from("user_groups").select("*"),{data:n}=await B.from("groups").select("*"),{data:a}=await B.from("user_attributes").select("*"),s=new Map(n.map(p=>[p.id,p.name])),r=new Map(a.map(p=>[p.id,p.name])),o=new Map(t.map(p=>[p.user_email,p.group_id]));let i=window.adminDelegations;if(!i){const{data:p}=await B.from("master_data").select("*").eq("key","ATTENDANCE_DELEGATIONS").single();i=p&&p.data?p.data:{},window.adminDelegations=i}const l=[["メールアドレス","氏名","役割","所属グループ名","ユーザー属性名","配車利用可(1/0)","成績利用可(1/0)","出欠利用可(1/0)","シミュレータ利用可(1/0)","Info利用可(1/0)","Info編集可(1/0)","代行入力先(カンマ区切りメールアドレス)","代行専用(1/0)","初期パスワード","削除(1/0)"]];e.forEach(p=>{const b=p.role==="admin"?"管理者":p.role==="leader"?"リーダー":"一般ユーザー",h=o.get(p.email),g=h&&s.get(h)||"",m=p.attribute_id&&r.get(p.attribute_id)||"",y=i[p.email]?i[p.email].join(","):"",x=p.email.endsWith("@local.dummy");l.push([p.email,p.name||"",b,g,m,p.can_use_dispatch!==!1?"1":"0",p.can_use_dashboard!==!1?"1":"0",p.can_use_attendance!==!1?"1":"0",p.can_use_simulator!==!1?"1":"0",p.can_use_info!==!1?"1":"0",p.can_edit_info===!0||p.role==="admin"||p.role==="leader"&&p.can_edit_info!==!1?"1":"0",y,x?"1":"0","","0"])});const u=l.map(p=>p.map($r).join(",")).join(`
`),c=new Blob([new Uint8Array([239,187,191]),u],{type:"text/csv;charset=utf-8;"}),f=document.createElement("a");f.href=URL.createObjectURL(c),f.download=`members_${new Date().toISOString().split("T")[0]}.csv`,f.click()}catch(e){console.error(e),alert("エクスポートに失敗しました: "+e.message)}finally{V()}}async function qc(e){const t=e.target.files[0];if(!t)return;W("CSVファイルを解析中...");const n=new FileReader;n.onload=async a=>{try{const s=a.target.result,r=Qo(s);if(r.length<2){alert("有効なデータがありません。"),V();return}const o=r[0].map(L=>L.trim()),i=o.indexOf("メールアドレス"),d=o.indexOf("氏名"),l=o.indexOf("役割"),u=o.indexOf("所属グループ名"),c=o.indexOf("ユーザー属性名"),f=o.findIndex(L=>L.includes("配車")),p=o.findIndex(L=>L.includes("成績")),b=o.findIndex(L=>L.includes("出欠")),h=o.findIndex(L=>L.includes("シミュレータ")),g=o.findIndex(L=>(L.includes("Info")||L.includes("インフォ"))&&!L.includes("編集")),m=o.findIndex(L=>(L.includes("Info")||L.includes("インフォ"))&&L.includes("編集")),y=o.findIndex(L=>L.includes("代行入力先")),x=o.findIndex(L=>L.includes("代行専用")),E=o.findIndex(L=>L.includes("初期パスワード")),k=o.findIndex(L=>L.includes("削除"));if(i===-1||d===-1){alert("「メールアドレス」および「氏名」列は必須です。"),V();return}const{data:_}=await B.from("app_users").select("*"),{data:S}=await B.from("user_groups").select("*"),{data:I}=await B.from("groups").select("*"),{data:v}=await B.from("user_attributes").select("*");let w=window.adminDelegations;if(!w){const{data:L}=await B.from("master_data").select("*").eq("key","ATTENDANCE_DELEGATIONS").single();w=L&&L.data?L.data:{},window.adminDelegations=w}const $=new Map(I.map(L=>[L.name,L.id])),A=new Map(v.map(L=>[L.name,L.id])),P=new Map(_.map(L=>[L.email,L])),R=new Map(S.map(L=>[L.user_email,L.group_id])),D=[],M=[],C=[];for(let L=1;L<r.length;L++){const T=r[L];if(T.length<2)continue;const N=(T[d]||"").trim();if(!N)continue;let H=(T[i]||"").trim();const J=x!==-1?T[x]==="1"||T[x]==="true"||T[x]==="代行専用":!1,G=H.endsWith("@local.dummy"),Q=J||G;if(H)Q&&!G&&(H.includes("@")?H=H.split("@")[0]+"@local.dummy":H=H+"@local.dummy");else if(Q)H=`dummy_${Date.now()}_${L}@local.dummy`;else continue;H=ys(H);const q=(T[l]||"").trim();let Z="user";q==="管理者"||q==="admin"?Z="admin":(q==="リーダー"||q==="leader")&&(Z="leader");const U=u!==-1?(T[u]||"").trim():"",ae=U&&$.get(U)||null,re=c!==-1?(T[c]||"").trim():"",me=re&&A.get(re)||null,ve=f!==-1?!(T[f]==="0"||T[f]==="false"):!0,rt=p!==-1?!(T[p]==="0"||T[p]==="false"):!0,pe=b!==-1?!(T[b]==="0"||T[b]==="false"):!0,mt=h!==-1?!(T[h]==="0"||T[h]==="false"):!0,Ue=g!==-1?!(T[g]==="0"||T[g]==="false"):!0,Yt=m!==-1?T[m]==="1"||T[m]==="true"||T[m]==="可":Z==="admin"||Z==="leader"&&!0,Ut=k!==-1?T[k]==="1"||T[k]==="削除":!1;let St=null;y!==-1&&(St=(T[y]||"").split(",").map(je=>je.trim()).filter(Boolean));let kt="",Et=null;if(!Q){const Ne=E!==-1?(T[E]||"").trim():"";if(P.has(H))Ne.length>=6&&(Et=Ne);else if(Ne.length>=6)kt=Ne;else{const je="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";let Lt="pw-";for(let kn=0;kn<6;kn++)Lt+=je.charAt(Math.floor(Math.random()*je.length));kt=Lt}}const X={email:H,name:N,role:Z,group_id:ae,group_name:U,attribute_id:me,attribute_name:re,can_use_dispatch:ve,can_use_dashboard:rt,can_use_attendance:pe,can_use_simulator:mt,can_use_info:Ue,can_edit_info:Yt,delegations:St,is_dummy:Q,initial_password:Et!==null?Et:kt},fe=P.get(H);if(fe)if(Ut)C.push(X);else{const Ne=R.get(H)!==ae,je=fe.role!==Z,Lt=fe.name!==N,kn=fe.attribute_id!==me,Na=fe.can_use_dispatch!==!1!==ve,O=fe.can_use_dashboard!==!1!==rt,z=fe.can_use_attendance!==!1!==pe,we=fe.can_use_simulator!==!1!==mt,he=fe.can_use_info!==!1!==Ue,ot=fe.can_edit_info===!0!==Yt;let Ge=!1;if(St!==null){const it=w[H]||[],ke=[...St].sort().join(","),_e=[...it].sort().join(",");ke!==_e&&(Ge=!0)}let Ln=!1;Et!==null&&(Ln=!0),(Ne||je||Lt||kn||Na||O||z||we||he||ot||Ge||Ln)&&M.push(X)}else Ut||(X.delegations===null&&(X.delegations=[]),D.push(X))}V(),Ko("users",D,M,C,"メンバーCSVインポート確認")}catch(s){console.error(s),alert("CSVの解析に失敗しました: "+s.message),V()}},n.readAsText(t)}async function Uc(){ln.type==="users"?await jc():ln.type==="events"&&typeof window.executeEventsImport=="function"&&await window.executeEventsImport()}async function jc(){W("インポートデータを保存中...");try{const{add:e,update:t,delete:n}=ln;let a=window.adminDelegations;if(!a){const{data:d}=await B.from("master_data").select("*").eq("key","ATTENDANCE_DELEGATIONS").single();a=d&&d.data?d.data:{},window.adminDelegations=a}if(n.length>0){const d=n.map(u=>u.email),{error:l}=await B.from("app_users").delete().in("email",d);if(l)throw l;d.forEach(u=>{delete window.adminDelegations[u]}),Object.keys(window.adminDelegations).forEach(u=>{window.adminDelegations[u]=(window.adminDelegations[u]||[]).filter(c=>!d.includes(c))}),await le("IMPORT_USERS_DELETE",`${n.length}件のユーザーをインポートで削除しました`)}if(e.length>0){const d=[];for(let f of e)if(!f.is_dummy)try{const p=window.supabase.createClient(ia,is,{auth:{persistSession:!1,autoRefreshToken:!1}}),{error:b}=await p.auth.signUp({email:f.email,password:f.initial_password});if(b)throw new Error(`Auth作成失敗: ${b.message}`)}catch(p){console.error(`Sign up error for ${f.email}:`,p),d.push(`${f.email}: ${p.message}`)}if(d.length>0&&!confirm(`一部のアカウント払い出し（Auth）に失敗しました。データベース登録を続行しますか？

エラー内容:
${d.join(`
`)}`))throw new Error("インポート処理を中断しました。");const l=e.map(f=>({email:f.email,name:f.name,role:f.role,attribute_id:f.attribute_id,can_use_dispatch:f.can_use_dispatch,can_use_dashboard:f.can_use_dashboard,can_use_attendance:f.can_use_attendance,can_use_simulator:f.can_use_simulator,can_use_info:f.can_use_info,can_edit_info:f.can_edit_info}));let{error:u}=await B.from("app_users").insert(l);if(u&&u.message&&u.message.includes("can_edit_info")){const f=l.map(b=>{const h={...b};return delete h.can_edit_info,h});u=(await B.from("app_users").insert(f)).error}if(u)throw u;const c=e.filter(f=>f.group_id).map(f=>({user_email:f.email,group_id:f.group_id}));if(c.length>0){const{error:f}=await B.from("user_groups").insert(c);if(f)throw f}e.forEach(f=>{f.delegations&&(window.adminDelegations[f.email]=f.delegations)}),await le("IMPORT_USERS_ADD",`${e.length}件のユーザーをインポートで追加しました`)}if(t.length>0){const d=[];for(let l of t){if(l.initial_password)try{const{error:p}=await B.rpc("admin_update_user_password",{user_email:l.email,new_password:l.initial_password});if(p)throw p;await le("ADMIN_CHANGE_PASSWORD",`ユーザー「${l.email}」のパスワードをインポートで変更しました`)}catch(p){console.error(`Failed to update password for ${l.email}:`,p),d.push(`${l.email}: ${p.message}`)}const u={name:l.name,role:l.role,attribute_id:l.attribute_id,can_use_dispatch:l.can_use_dispatch,can_use_dashboard:l.can_use_dashboard,can_use_attendance:l.can_use_attendance,can_use_simulator:l.can_use_simulator,can_use_info:l.can_use_info,can_edit_info:l.can_edit_info};let{error:c}=await B.from("app_users").update(u).eq("email",l.email);if(c&&c.message&&c.message.includes("can_edit_info")){const p={...u};delete p.can_edit_info,c=(await B.from("app_users").update(p).eq("email",l.email)).error}if(c)throw c;const{data:f}=await B.from("user_groups").select("*").eq("user_email",l.email);if(l.group_id)if(f&&f.length>0){const{error:p}=await B.from("user_groups").update({group_id:l.group_id}).eq("user_email",l.email);if(p)throw p}else{const{error:p}=await B.from("user_groups").insert([{user_email:l.email,group_id:l.group_id}]);if(p)throw p}else if(f&&f.length>0){const{error:p}=await B.from("user_groups").delete().eq("user_email",l.email);if(p)throw p}l.delegations!==null&&(window.adminDelegations[l.email]=l.delegations)}d.length>0&&alert(`一部のパスワード更新に失敗しました。詳細は開発者コンソールを確認してください。

失敗したユーザー:
${d.join(`
`)}`),await le("IMPORT_USERS_UPDATE",`${t.length}件のユーザーをインポートで更新しました`)}const{error:s}=await B.from("master_data").upsert({key:"ATTENDANCE_DELEGATIONS",data:window.adminDelegations});if(s)throw s;let r="インポートが完了しました。";const o=e.filter(d=>!d.is_dummy),i=t.filter(d=>d.initial_password);(o.length>0||i.length>0)&&(r+=`

【アカウントのログイン情報・変更内容】`,o.length>0&&(r+=`
[新規アカウントの仮パスワード]`,o.forEach(d=>{r+=`
氏名: ${d.name}
ログインID: ${jn(d.email)}
仮パスワード: ${d.initial_password}
------------------------`})),i.length>0&&(r+=`
[更新アカウントの新パスワード]`,i.forEach(d=>{r+=`
氏名: ${d.name}
ログインID: ${jn(d.email)}
新パスワード: ${d.initial_password}
------------------------`})),r+=`

※上記情報をコピーし、対象のユーザーへお伝えください。`),alert(r),cs(),await be()}catch(e){console.error(e),alert("保存に失敗しました: "+e.message)}finally{V()}}window.showCSVConfirmModal=Ko;window.closeCSVConfirmModal=cs;window.parseCSV=Qo;window.escapeCSV=$r;function Gc(){const n=[["メールアドレス","氏名","役割","所属グループ名","ユーザー属性名","配車利用可(1/0)","成績利用可(1/0)","出欠利用可(1/0)","代行入力先(カンマ区切りメールアドレス)","代行専用(1/0)","初期パスワード","削除(1/0)"],["sample_parent@example.com","山田 太郎","一般ユーザー","選手・保護者","A軍","1","1","1","sample_child1@example.com,sample_child2@example.com","0","tempPw123","0"],["sample_child1@example.com","山田 一郎","一般ユーザー","選手・保護者","A軍","1","0","1","","0","tempPw123","0"],["sample_child2@example.com","山田 二郎","一般ユーザー","選手・保護者","A軍","1","0","1","","0","tempPw123","0"],["","代行専用の子ども","一般ユーザー","選手・保護者","A軍","0","0","1","","1","","0"]].map(r=>r.map($r).join(",")).join(`
`),a=new Blob([new Uint8Array([239,187,191]),n],{type:"text/csv;charset=utf-8;"}),s=document.createElement("a");s.href=URL.createObjectURL(a),s.download="members_sample.csv",s.click()}const Vc=Object.freeze(Object.defineProperty({__proto__:null,get csvImportState(){return ln},get currentUser(){return Y},get currentUserRole(){return Ve},forceHideLoading:dt,goToUsersAdmin:Vo,hideLoading:V,logAction:le,openChangePasswordModal:vr,showLoading:W,supabaseClient:B,switchAuthScreen:oe,withLoading:Pe},Symbol.toStringTag,{value:"Module"}));
