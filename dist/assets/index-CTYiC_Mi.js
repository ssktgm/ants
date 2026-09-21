(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();let Gt=new Date,Ze=[],Fe=[],De=[],za=[],oa=[],at=[],Ee=[],Pt=[],Ct=[],fs=!1,La=[],Ot=[],oe=[];window.att_multiSelectMode=!1;window.att_selectedDates=new Set;window.att_selectedCategories=new Set;window.att_selectedGroups=new Set;function gn(e){let t=e.target_group_ids||[];if(t.length===0&&e.target_group_id&&(t=[e.target_group_id]),t.length===0)return{ids:[],name:"全体",color:"#e5e7eb"};const n=Fe.filter(a=>t.includes(a.id));return n.length===0?{ids:[],name:"全体",color:"#e5e7eb"}:{ids:t,name:n.map(a=>a.name).join(", "),color:n[0].color||"#e5e7eb",groups:n}}function Hs(e){return e.ids.length===0?'<span class="text-xs border border-gray-300 text-gray-800 px-2 py-0.5 rounded shadow-sm" style="background-color: #e5e7eb">全体</span>':e.groups.map(t=>`<span class="text-xs border border-gray-300 text-gray-800 px-2 py-0.5 rounded shadow-sm" style="background-color: ${t.color||"#e5e7eb"}">${t.name}</span>`).join(" ")}function Us(e){if(!e)return"-";try{const t=new Date(e);if(isNaN(t.getTime()))return"-";const n=t.getMonth()+1,a=t.getDate(),s=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}/${a} ${s}:${r}`}catch{return"-"}}async function Ba(){try{fs||(Cr(),fs=!0),await tn(),qe(),Ar(),Dr()}catch(e){console.error("Attendance App Init Error:",e),typeof Ge=="function"&&Ge()}}function Cr(){var n,a,s,r,o,i,d,l,c,m,u,f,b,y,g,p,x,v,h,$,L,E,I,w,k;const e=document.getElementById("btn-logout-att");if(e&&!document.getElementById("btn-change-password-att")){const _=document.createElement("button");_.id="btn-change-password-att",_.className="text-xs md:text-sm bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 md:px-3 md:py-1 rounded shadow mr-2 font-bold",_.textContent="パスワード変更",_.onclick=()=>ds(),e.parentNode.insertBefore(_,e)}(n=document.getElementById("tab-calendar"))==null||n.addEventListener("click",()=>bs("calendar")),(a=document.getElementById("tab-list"))==null||a.addEventListener("click",()=>{bs("list"),kt()}),(s=document.getElementById("cal-prev-month"))==null||s.addEventListener("click",()=>{Gt.setMonth(Gt.getMonth()-1),qe()}),(r=document.getElementById("cal-next-month"))==null||r.addEventListener("click",()=>{Gt.setMonth(Gt.getMonth()+1),qe()}),(o=document.getElementById("cal-today"))==null||o.addEventListener("click",()=>{Gt=new Date,qe()}),(i=document.getElementById("btn-add-event"))==null||i.addEventListener("click",()=>In()),(d=document.getElementById("btn-export-events"))==null||d.addEventListener("click",Qr),(l=document.getElementById("btn-import-events"))==null||l.addEventListener("click",()=>document.getElementById("input-import-events-csv").click()),(c=document.getElementById("btn-import-ics-events"))==null||c.addEventListener("click",()=>document.getElementById("input-import-events-ics").click()),(m=document.getElementById("btn-download-events-sample"))==null||m.addEventListener("click",eo),(u=document.getElementById("input-import-events-csv"))==null||u.addEventListener("change",Zr),(f=document.getElementById("input-import-events-ics"))==null||f.addEventListener("change",no),(b=document.getElementById("btn-close-ics-modal-x"))==null||b.addEventListener("click",Sa),(y=document.getElementById("btn-close-ics-modal"))==null||y.addEventListener("click",Sa),(g=document.getElementById("btn-execute-ics-import"))==null||g.addEventListener("click",so),(p=document.getElementById("ics-import-list"))==null||p.addEventListener("change",_=>{if(_.target&&_.target.classList.contains("ics-row-location-select")){const A=_.target,P=A.closest(".ics-row").querySelector(".ics-row-location");A.value&&A.value!=="custom"?P.value=A.value:A.value==="custom"&&(P.value="",P.focus())}});const t=document.getElementById("btn-group-manage");t&&(t.style.display="none"),(x=document.getElementById("btn-toggle-multiselect"))==null||x.addEventListener("click",function(){window.att_multiSelectMode=!window.att_multiSelectMode,window.att_multiSelectMode||window.att_selectedDates.clear(),this.classList.toggle("bg-blue-600",window.att_multiSelectMode),this.classList.toggle("text-white",window.att_multiSelectMode),this.classList.toggle("bg-blue-50",!window.att_multiSelectMode),this.classList.toggle("text-blue-600",!window.att_multiSelectMode),qe(),window.att_updateMultiselectBar()}),(v=document.getElementById("btn-cal-filter"))==null||v.addEventListener("click",ys),(h=document.getElementById("btn-cal-filter-clear"))==null||h.addEventListener("click",ba),($=document.getElementById("btn-list-filter"))==null||$.addEventListener("click",ys),(L=document.getElementById("btn-list-filter-clear"))==null||L.addEventListener("click",ba),(E=document.getElementById("btn-close-filter-modal-x"))==null||E.addEventListener("click",Un),(I=document.getElementById("btn-close-filter-modal"))==null||I.addEventListener("click",Un),(w=document.getElementById("btn-apply-filter"))==null||w.addEventListener("click",Nr),(k=document.getElementById("btn-filter-clear"))==null||k.addEventListener("click",ba)}function bs(e){const t=document.getElementById("tab-calendar"),n=document.getElementById("tab-list");e==="calendar"?(document.getElementById("calendar-container").classList.remove("hidden"),document.getElementById("list-container").classList.add("hidden"),t.classList.replace("bg-white","bg-green-600"),t.classList.replace("text-green-600","text-white"),n.classList.replace("bg-green-600","bg-white"),n.classList.replace("text-white","text-green-600")):(document.getElementById("calendar-container").classList.add("hidden"),document.getElementById("list-container").classList.remove("hidden"),n.classList.replace("bg-white","bg-green-600"),n.classList.replace("text-green-600","text-white"),t.classList.replace("bg-green-600","bg-white"),t.classList.replace("text-white","text-green-600"))}async function tn(){U("イベント・出欠データ読み込み中...");try{const{data:e}=await B.from("groups").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});e&&(Fe=e);const{data:t}=await B.from("event_categories").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});t&&t.length>0?De=t:De=[{id:"1",name:"練習"},{id:"2",name:"試合"},{id:"3",name:"イベント"}];const n=new Date,a=new Date(n.getFullYear(),n.getMonth()-6,1),s=new Date(n.getFullYear(),n.getMonth()+7,1),{data:r}=await B.from("events").select("*").gte("start_time",a.toISOString()).lt("start_time",s.toISOString()).order("start_time");r&&(Ze=r);const{data:o}=await B.from("app_users").select("email, name, attribute_id, can_use_attendance");o&&(Pt=o);const{data:i}=await B.from("user_attributes").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});i&&(Ct=i);try{const{data:c}=await B.from("event_locations").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});c&&(Ot=c)}catch(c){console.warn("event_locations table might not exist yet:",c),Ot=[]}const{data:d}=await B.from("user_groups").select("*");d&&(at=d,G&&(za=d.filter(c=>c.user_email===G.email)));let l=[];if(Ze&&Ze.length>0){const c=Ze.map(u=>u.id),{data:m}=await B.from("attendances").select("*").in("event_id",c);m&&(l=m)}Ee=l,G&&(oa=l.filter(c=>c.user_email===G.email));try{const{data:c}=await B.from("master_data").select("data").eq("key","ATTENDANCE_DELEGATIONS").single();c&&c.data&&G&&(La=c.data[G.email]||[])}catch{La=[]}}catch(e){console.error("Attendance DB Error:",e)}finally{typeof Ge=="function"?Ge():F()}}function Ar(){const e=document.getElementById("filter-group");e&&(e.innerHTML='<option value="">すべてのグループ</option>'+Fe.map(t=>`<option value="${t.id}">${t.name}</option>`).join(""))}function Dr(){const e=document.getElementById("filter-category");if(!e)return;const t=e.value;e.innerHTML='<option value="">すべてのカテゴリ</option>'+De.map(n=>`<option value="${n.name}">${n.name}</option>`).join(""),De.some(n=>n.name===t)&&(e.value=t)}function ys(){const e=document.getElementById("filter-modal-content");if(!e)return;let t="";t+='<div class="mb-5">',t+='<h4 class="text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">カテゴリ（複数選択）</h4>',De.length===0?t+='<p class="text-xs text-gray-400">カテゴリが登録されていません</p>':(t+='<div class="grid grid-cols-2 gap-2">',De.forEach(a=>{const s=window.att_selectedCategories.has(a.name)?"checked":"";t+=`
                <label class="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition">
                    <input type="checkbox" class="filter-cat-checkbox w-4 h-4 rounded text-green-600 focus:ring-green-500 border-gray-300" value="${a.name}" ${s}>
                    <span class="select-none">${a.name}</span>
                </label>
            `}),t+="</div>"),t+="</div>",t+='<div class="mb-2">',t+='<h4 class="text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">対象グループ（複数選択）</h4>',t+='<div class="grid grid-cols-2 gap-2">';const n=window.att_selectedGroups.has("all")?"checked":"";t+=`
        <label class="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition font-medium">
            <input type="checkbox" class="filter-group-checkbox w-4 h-4 rounded text-green-600 focus:ring-green-500 border-gray-300" value="all" ${n}>
            <span class="select-none font-semibold text-gray-900">全体（全員対象）</span>
        </label>
    `,Fe.length>0&&Fe.forEach(a=>{const s=window.att_selectedGroups.has(a.id)?"checked":"";t+=`
                <label class="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition">
                    <input type="checkbox" class="filter-group-checkbox w-4 h-4 rounded text-green-600 focus:ring-green-500 border-gray-300" value="${a.id}" ${s}>
                    <span class="select-none">${a.name}</span>
                </label>
            `}),t+="</div>",t+="</div>",e.innerHTML=t,document.getElementById("filter-modal").classList.remove("hidden")}function Un(){document.getElementById("filter-modal").classList.add("hidden")}function Nr(){const e=document.querySelectorAll(".filter-cat-checkbox"),t=document.querySelectorAll(".filter-group-checkbox");window.att_selectedCategories.clear(),e.forEach(n=>{n.checked&&window.att_selectedCategories.add(n.value)}),window.att_selectedGroups.clear(),t.forEach(n=>{n.checked&&window.att_selectedGroups.add(n.value)}),Vs(),qe(),kt(),Un()}function ba(){window.att_selectedCategories.clear(),window.att_selectedGroups.clear(),Vs(),qe(),kt(),Un()}function Vs(){const e=window.att_selectedCategories.size+window.att_selectedGroups.size,t=document.getElementById("cal-filter-badge"),n=document.getElementById("btn-cal-filter-clear"),a=document.getElementById("btn-cal-filter"),s=document.getElementById("list-filter-badge"),r=document.getElementById("btn-list-filter-clear"),o=document.getElementById("btn-list-filter");e>0?(t&&(t.textContent=e,t.classList.remove("hidden")),n&&n.classList.remove("hidden"),a&&(a.classList.remove("bg-[#e6e5dd]","hover:bg-[#dcdad2]","text-slate-800"),a.classList.add("bg-green-100","hover:bg-green-200","text-green-800","border-green-300")),s&&(s.textContent=e,s.classList.remove("hidden")),r&&r.classList.remove("hidden"),o&&(o.classList.remove("bg-gray-100","hover:bg-gray-200","text-gray-800"),o.classList.add("bg-green-100","hover:bg-green-200","text-green-800","border-green-300"))):(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),a&&(a.classList.remove("bg-green-100","hover:bg-green-200","text-green-800","border-green-300"),a.classList.add("bg-[#e6e5dd]","hover:bg-[#dcdad2]","text-slate-800")),s&&s.classList.add("hidden"),r&&r.classList.add("hidden"),o&&(o.classList.remove("bg-green-100","hover:bg-green-200","text-green-800","border-green-300"),o.classList.add("bg-gray-100","hover:bg-gray-200","text-gray-800")))}function Gs(){return Ze.filter(e=>{if(window.att_selectedCategories&&window.att_selectedCategories.size>0&&!window.att_selectedCategories.has(e.category))return!1;if(window.att_selectedGroups&&window.att_selectedGroups.size>0){const t=gn(e);if(t.ids.length===0){if(!window.att_selectedGroups.has("all"))return!1}else if(!t.ids.some(a=>window.att_selectedGroups.has(a)))return!1}return!0})}function qe(){const e=Gt.getFullYear(),t=Gt.getMonth();document.getElementById("cal-current-month").textContent=`${e}年${t+1}月`;const n=document.getElementById("calendar-grid");n&&n.classList.remove("gap-1","gap-px","gap-2","p-1","p-2","p-4"),Array.from(n.children).forEach((i,d)=>{d>=7&&n.removeChild(i)});const s=new Date(e,t,1).getDay(),r=new Date(e,t,1-s),o=new Date;for(let i=0;i<42;i++){const d=new Date(r);d.setDate(r.getDate()+i);const l=d.getFullYear(),c=d.getMonth(),m=d.getDate(),u=c===t,f=`${l}-${String(c+1).padStart(2,"0")}-${String(m).padStart(2,"0")}`,b=window.att_multiSelectMode&&window.att_selectedDates.has(f),y=d.getDay(),g=Yr(d),p=l===o.getFullYear()&&c===o.getMonth()&&m===o.getDate(),x=document.createElement("div");let v="border-r border-b min-h-[100px] flex flex-col p-0 cursor-pointer";u?g||y===0?v+=" bg-sunday-hatch":y===6?v+=" bg-saturday-hatch":v+=" bg-white":v+=" bg-gray-50 opacity-60",b&&(v="border-2 border-blue-500 min-h-[100px] flex flex-col p-0 bg-blue-50/70 cursor-pointer z-10"),p&&!window.att_multiSelectMode&&(v+=" today-cell-border"),x.className=v,x.onclick=()=>{window.att_multiSelectMode?(window.att_selectedDates.has(f)?window.att_selectedDates.delete(f):window.att_selectedDates.add(f),qe(),window.att_updateMultiselectBar()):In(f)};const h=document.createElement("div");let $="text-gray-700";u&&(g||y===0?$="text-red-600 font-bold":y===6&&($="text-blue-600 font-bold")),h.className=`text-right text-[11px] ${$} mb-0 pr-1 pt-1 leading-none`,h.textContent=m,x.appendChild(h);const L=document.createElement("div");L.className="flex-1 overflow-hidden flex flex-col gap-0";const I=Gs().filter(_=>_.start_time&&_.start_time.startsWith(f)),w=I.slice(0,5),k=I.length>5;if(w.forEach(_=>{const A=document.createElement("div"),P=oa.find(N=>N.event_id===_.id);let D="",O="text-gray-800";if(_.requires_attendance){const N=P?P.status:"未入力";N==="出席"?(D='<span class="inline-block text-[9px] font-bold text-white bg-blue-600 rounded px-0.5 mr-0.5 leading-none shrink-0 align-middle">出</span>',O="text-blue-700 font-bold"):N==="欠席"?(D='<span class="inline-block text-[9px] font-bold text-white bg-gray-400 rounded px-0.5 mr-0.5 leading-none shrink-0 align-middle">欠</span>',O="text-gray-800 opacity-70"):N==="保留"||N==="未定"?(D='<span class="inline-block text-[9px] font-bold text-white bg-amber-500 rounded px-0.5 mr-0.5 leading-none shrink-0 align-middle">保</span>',O="text-gray-800"):(D='<span class="inline-block text-[9px] font-bold text-white bg-red-500 rounded px-0.5 mr-0.5 leading-none shrink-0 align-middle">未</span>',O="text-red-600 font-bold")}const q=De.find(N=>N.name===_.category),S=(q==null?void 0:q.color)||"#bfdbfe",C=(_.title||"").replace(/[\r\n]+/g," ");A.className=`text-[10px] rounded px-0.5 py-px truncate whitespace-nowrap overflow-hidden text-ellipsis w-full text-left cursor-pointer hover:opacity-80 leading-tight mb-0.5 ${O}`,A.style.backgroundColor=S,A.innerHTML=`${D}${C}`,A.title=_.title,A.onclick=N=>{N.stopPropagation(),window.att_openEventDetail(_.id)},L.appendChild(A)}),k){const _=document.createElement("div");_.className="text-[10px] text-gray-500 text-center mt-[1px] cursor-pointer hover:underline",_.textContent=`他 ${I.length-5} 件`,_.onclick=A=>{A.stopPropagation(),alert(`${f} の予定が多すぎます。リストビューで確認してください。`)},L.appendChild(_)}x.appendChild(L),n.appendChild(x)}}const Ja=["日","月","火","水","木","金","土"];function Pr(e){const t=new Date(e);if(isNaN(t.getTime()))return e;const n=t.getDate(),a=Ja[t.getDay()];return`${n}日(${a})`}function Or(e,t,n){const a=new Date(e);if(isNaN(a.getTime()))return"日時未定";const s=a.getMonth()+1,r=a.getDate(),o=Ja[a.getDay()],i=`${s}/${r}(${o})`;if(n)return`${i} 終日`;const d=e.substring(11,16);let l="";if(t){const c=new Date(t);isNaN(c.getTime())||(l=` - ${t.substring(11,16)}`)}return`${i}${d}${l}`}function Mr(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const n=t.getFullYear(),a=t.getMonth()+1,s=t.getDate(),r=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}/${a}/${s} ${r}:${o}`}function kt(){const e=Gs(),t=document.getElementById("event-list-content");if(e.length===0){t.innerHTML='<p class="text-gray-500 p-4">表示するイベントがありません。</p>';return}const n=[...e].sort((i,d)=>i.start_time?d.start_time?i.start_time.localeCompare(d.start_time):-1:1),a={};n.forEach(i=>{const d=i.start_time?i.start_time.split("T")[0]:"未定";a[d]||(a[d]=[]),a[d].push(i)});const s=new Date,r=`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}-${String(s.getDate()).padStart(2,"0")}`;let o="";Object.keys(a).forEach(i=>{const d=a[i];let l="日時未定",c="";i!=="未定"&&(l=Pr(i),i===r&&(c=`<span class="ml-2 bg-green-600 text-white text-xs px-2.5 py-0.5 rounded-full font-bold shadow-sm">${new Date(i).getDate()}日(今日)</span>`)),o+=`
        <div class="space-y-2 mb-4">
            <div class="flex items-center text-sm font-bold text-gray-700 border-b border-gray-200 pb-1 px-1">
                <span>${l}</span>
                ${c}
            </div>
        `,d.forEach(m=>{const u=gn(m);u.name,u.color;const f=De.find(L=>L.name===m.category),b=(f==null?void 0:f.color)||"#bfdbfe",y=oa.find(L=>L.event_id===m.id);let g=y&&y.status?y.status:"未回答";g==="未定"&&(g="保留");const p=Or(m.start_time,m.end_time,m.is_all_day);let x="不明";if(m.created_by){const L=Pt.find(E=>E.email===m.created_by);x=L&&L.name||m.created_by.split("@")[0]}const v=Mr(m.created_at),h=m.created_by?`
                <div class="flex items-center text-gray-400 text-[10px] mt-1 space-x-1">
                    <span class="w-4 h-4 rounded-full bg-green-50 flex items-center justify-center text-[10px] text-green-700 font-bold">👤</span>
                    <span>${x} ${v}</span>
                </div>
            `:"";let $="";if(m.requires_attendance){const L=m.attendance_deadline?new Date>new Date(m.attendance_deadline):!1;let E="bg-gray-100 text-gray-600",I="";if(L)I="回答期限切れ",E="bg-gray-200 text-gray-500";else if(m.attendance_deadline){const _=new Date(m.attendance_deadline),A=_.getMonth()+1,P=_.getDate(),D=String(_.getHours()).padStart(2,"0"),O=String(_.getMinutes()).padStart(2,"0");I=`回答期限: ${A}/${P} ${D}:${O}`}const w=I?`<span class="text-[10px] px-1.5 py-0.5 rounded ${E} font-semibold">${I}</span>`:"";let k="";g==="出席"?k='<div class="flex items-center justify-center w-5 h-5 bg-green-600 text-white rounded-full text-[10px] font-bold shadow-sm" title="出席">O</div>':g==="欠席"?k='<div class="flex items-center justify-center w-5 h-5 bg-black text-white rounded text-[10px] font-bold shadow-sm" title="欠席">X</div>':g==="保留"?k='<div class="flex items-center justify-center w-5 h-5 bg-yellow-600 text-white rounded-full text-[10px] font-bold shadow-sm" title="保留">-</div>':k='<div class="flex items-center justify-center w-5 h-5 bg-red-600 text-white rounded-full text-[10px] font-bold shadow-sm animate-pulse" title="未回答">?</div>',$=`
                    <div class="flex items-center space-x-2 shrink-0">
                        ${w}
                        ${k}
                    </div>
                `}o+=`
            <div class="p-2 px-3 border border-gray-200/60 rounded-lg hover:shadow-md transition bg-white flex flex-col justify-between cursor-pointer relative shadow-sm" onclick="window.att_openEventDetail('${m.id}')">
                
                <!-- カード上部（タイトルと右上バッジ） -->
                <div class="flex justify-between items-start mb-1 gap-2">
                    <h3 class="font-bold text-sm md:text-base text-gray-800 flex items-center pr-2">
                        <span class="mr-1 text-base">📅</span>
                        <span>${m.title}</span>
                    </h3>
                    ${$}
                </div>

                <!-- カード中部（カテゴリと詳細） -->
                <div class="flex flex-wrap items-center gap-2 text-[11px] md:text-xs text-gray-600">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold" style="background-color: ${b}; color: #1f2937">${m.category||"イベント"}</span>
                    ${Hs(u)}
                    <span class="flex items-center space-x-1">
                        <span>🕒</span>
                        <span>${p}</span>
                    </span>
                    <span class="flex items-center space-x-0.5">
                        <span>📍</span>
                        <span>${zs(m.location)}</span>
                    </span>
                </div>

                <!-- カード下部（登録者と詳細矢印） -->
                <div class="flex justify-between items-end mt-1">
                    ${h}
                    <!-- 詳細矢印 (緑の右向き) -->
                    <div class="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition absolute right-2 bottom-2">
                        <span class="text-green-700 text-[10px] font-bold leading-none">&#10095;</span>
                    </div>
                </div>

            </div>
            `}),o+="</div>"}),t.innerHTML=o}function In(e="",t=null,n=!1,a=null){let s="";t&&(s=t.title.replace(/"/g,"&quot;"),n||(s+=" (コピー)"));const r=!t&&!n;a&&a.length>0?oe=[...a]:t?oe=[t.start_time.split("T")[0]]:e?oe=[e]:oe=[new Date().toISOString().split("T")[0]],window.att_modalSelectedDates=oe,window.att_isEditingModal=n;const o=t&&t.start_time&&!t.is_all_day?t.start_time.split("T")[1].substring(0,5):r?"12:30":"",i=t&&t.end_time&&!t.is_all_day?t.end_time.split("T")[1].substring(0,5):r?"17:00":"",d=t?t.is_all_day:!1,l=t?t.category:"",c=t?(t.location||"").replace(/"/g,"&quot;"):"",m=t?(t.description||"").replace(/</g,"&lt;").replace(/>/g,"&gt;"):"",u=t?t.requires_attendance:!0,f=t?t.require_detailed_attendance:!1,b=o?o.split(":")[0]:"",y=o?o.split(":")[1]:"",g=i?i.split(":")[0]:"",p=i?i.split(":")[1]:"",x=!c||!Ot.some(T=>(T.url?`${T.name} ${T.url}`:T.name)===c);let v="",h="";if(c){const T=c.match(/(https?:\/\/[^\s\<\>\"]+)/);T?(h=T[0],v=c.replace(h,"").trim()):v=c}const $=!!(t&&t.attendance_deadline&&t.attendance_deadline!==vt(t.start_time.split("T")[0])),L=vt(oe[0])?vt(oe[0]).split("T")[0]:"",E=t&&t.attendance_deadline?t.attendance_deadline.split("T")[0]:L,I=t&&t.attendance_deadline?t.attendance_deadline.split("T")[1].substring(0,5):"12:00",w=I?I.split(":")[0]:"12",k=I?I.split(":")[1]:"00",_=T=>'<option value="">--</option>'+Array.from({length:24},(M,W)=>String(W).padStart(2,"0")).map(M=>`<option value="${M}" ${M===T?"selected":""}>${M}</option>`).join(""),A=T=>'<option value="">--</option>'+Array.from({length:60},(M,W)=>String(W).padStart(2,"0")).map(M=>`<option value="${M}" ${M===T?"selected":""}>${M}</option>`).join(""),P=t?t.target_group_ids&&t.target_group_ids.length>0?t.target_group_ids:t.target_group_id?[t.target_group_id]:[]:[],D=n?"イベントを編集":t?"イベントを複製":"新規イベント登録",O=`
        <div class="border p-2 rounded max-h-32 overflow-y-auto space-y-1 bg-white">
            <label class="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" id="ev-group-all" value="all" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" ${P.length===0?"checked":""}>
                <span class="text-xs font-medium">全体</span>
            </label>
            ${Fe.map(T=>`
                <label class="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" name="ev-group-cb" value="${T.id}" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" ${P.includes(T.id)?"checked":""}>
                    <span class="text-xs">${T.name}</span>
                </label>
            `).join("")}
        </div>
    `;let q="";n?q=`
            <div>
                <label class="text-xs font-bold text-gray-600">日付*</label>
                <div id="ev-dates-container" class="mt-1">
                    <input type="date" value="${oe[0]}" class="w-full border p-1.5 rounded text-xs px-1" onchange="window.att_onSingleDateChange(this.value)">
                </div>
            </div>
        `:q=`
            <div>
                <label class="text-xs font-bold text-gray-600">日付*</label>
                <div id="ev-dates-container" class="space-y-1.5 max-h-32 overflow-y-auto border p-2 rounded bg-gray-50 mt-1">
                    <!-- Rendered by renderDateRows() -->
                </div>
                <button type="button" onclick="window.att_addDateRow()" class="mt-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded text-xs font-bold flex items-center space-x-1 transition shadow-sm border border-gray-200">
                    <span>＋ 日付を追加</span>
                </button>
            </div>
        `;const S=`
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
        <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col text-sm text-gray-800">
            <h3 class="text-lg font-bold mb-3 shrink-0">${D}</h3>
            <div class="space-y-3 overflow-y-auto pr-1 flex-1">
                <div>
                    <label class="text-xs font-bold text-gray-600">イベント名*</label>
                    <input type="text" id="ev-title" value="${s}" placeholder="イベント名" class="w-full border p-1.5 rounded text-xs">
                </div>
                
                <!-- Date input block -->
                ${q}
                
                <!-- Time and AllDay Row -->
                <div class="flex space-x-4 items-end">
                    <div id="ev-time-container" class="flex-1 ${d?"opacity-50":""}">
                        <label class="text-xs font-bold text-gray-600">開始時間</label>
                        <div class="flex items-center space-x-1 mt-1">
                            <select id="ev-time-h" class="w-full border py-1.5 px-1.5 rounded text-xs bg-white" ${d?"disabled":""}>${_(b)}</select>
                            <span class="font-bold text-gray-500">:</span>
                            <select id="ev-time-m" class="w-full border py-1.5 px-1.5 rounded text-xs bg-white" ${d?"disabled":""}>${A(y)}</select>
                        </div>
                    </div>
                    <div id="ev-end-time-container" class="flex-1 ${d?"opacity-50":""}">
                        <label class="text-xs font-bold text-gray-600">終了時間</label>
                        <div class="flex items-center space-x-1 mt-1">
                            <select id="ev-end-time-h" class="w-full border py-1.5 px-1.5 rounded text-xs bg-white" ${d?"disabled":""}>${_(g)}</select>
                            <span class="font-bold text-gray-500">:</span>
                            <select id="ev-end-time-m" class="w-full border py-1.5 px-1.5 rounded text-xs bg-white" ${d?"disabled":""}>${A(p)}</select>
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
                            <option value="none" ${u?"":"selected"}>なし</option>
                            <option value="simple" ${u&&!f?"selected":""}>簡易</option>
                            <option value="detailed" ${u&&f?"selected":""}>詳細 (車・同伴者)</option>
                        </select>
                    </div>
                    
                    <div class="w-1/2" id="ev-deadline-container" style="display: ${u?"block":"none"}">
                        <div class="flex items-center justify-between mb-0.5">
                            <label class="text-xs font-bold text-gray-600">回答期限</label>
                            <div class="flex items-center space-x-1">
                                <input type="checkbox" id="ev-deadline-custom-cb" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer" ${$?"checked":""} onchange="window.att_toggleDeadlineCustom(this.checked)">
                                <label for="ev-deadline-custom-cb" class="text-[11px] font-bold text-gray-500 cursor-pointer select-none">個別指定</label>
                            </div>
                        </div>
                        
                        <!-- Custom Deadline Inputs -->
                        <div id="ev-deadline-custom-inputs" class="flex items-center space-x-0.5 ${$?"":"hidden"}">
                            <input type="date" id="ev-deadline-date" value="${E}" class="w-[50%] border p-1.5 rounded text-xs px-1" onchange="this.blur()">
                            <select id="ev-deadline-time-h" class="w-[25%] border py-1.5 px-1 rounded text-xs bg-white">${_(w)}</select>
                            <span class="font-bold text-gray-500">:</span>
                            <select id="ev-deadline-time-m" class="w-[25%] border py-1.5 px-1 rounded text-xs bg-white">${A(k)}</select>
                        </div>
                        
                        <!-- Default Deadline Auto Label -->
                        <div id="ev-deadline-auto-preview" class="text-[11px] text-gray-600 bg-gray-50 border border-dashed border-gray-200 rounded p-1.5 font-medium leading-normal ${$?"hidden":""}">
                        </div>
                    </div>
                </div>

                <div class="flex space-x-2">
                    <div class="w-1/2">
                        <label class="text-xs font-bold text-gray-600">カテゴリ</label>
                        <select id="ev-category" class="w-full border p-1.5 rounded text-xs bg-white">
                            ${De.map(T=>`<option value="${T.name}" ${T.name===l?"selected":""}>${T.name}</option>`).join("")}
                        </select>
                    </div>
                    <div class="w-1/2 flex flex-col">
                        <label class="text-xs font-bold text-gray-600 mb-1">対象グループ</label>
                        ${O}
                    </div>
                </div>
                
                <!-- Place selection using Master Data -->
                <div class="flex flex-col space-y-1.5">
                    <label class="text-xs font-bold text-gray-600">場所</label>
                    <select id="ev-location-select" class="w-full border p-1.5 rounded text-xs font-medium bg-white" onchange="window.att_onLocationSelectChange(this.value)">
                        <option value="custom">-- 直接入力 / 新規マスタ追加 --</option>
                        ${Ot.map(T=>{const M=T.url?`${T.name} ${T.url}`:T.name;return`<option value="${M}" ${c===M?"selected":""}>${T.name}${T.url?" (URLあり)":""}</option>`}).join("")}
                    </select>
                    
                    <!-- Direct Input & Inline Master Register container -->
                    <div id="ev-location-custom-container" class="border p-2.5 rounded bg-gray-50 space-y-2 mt-1 ${x?"":"hidden"}">
                        <div class="flex space-x-2">
                            <div class="flex-1">
                                <label class="text-[10px] font-bold text-gray-500">場所名</label>
                                <input type="text" id="ev-location-custom-name" value="${v}" placeholder="例: 〇〇グラウンド" class="w-full border p-1 rounded text-xs bg-white">
                            </div>
                            <div class="flex-1">
                                <label class="text-[10px] font-bold text-gray-500">URL (Google Map 等、任意)</label>
                                <input type="text" id="ev-location-custom-url" value="${h}" placeholder="https://..." class="w-full border p-1 rounded text-xs bg-white">
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
                    <textarea id="ev-description" placeholder="説明" class="w-full border p-1.5 rounded text-xs" rows="3">${m}</textarea>
                </div>
            </div>
            <div class="flex justify-end space-x-3 mt-4 pt-4 border-t shrink-0">
                <button onclick="window.att_closeModal()" class="bg-gray-300 hover:bg-gray-400 px-4 py-1.5 rounded font-bold text-xs">キャンセル</button>
                <button onclick="window.att_saveEvent(${n?`'${t.id}'`:"null"})" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded font-bold text-xs shadow">${n?"更新":"保存"}</button>
            </div>
        </div>
    </div>`;document.getElementById("attendance-modals").innerHTML=S,Mt(),n||$n();const C=document.getElementById("ev-group-all"),N=document.querySelectorAll('input[name="ev-group-cb"]');C.addEventListener("change",function(){this.checked&&N.forEach(T=>T.checked=!1)}),N.forEach(T=>{T.addEventListener("change",function(){this.checked&&(C.checked=!1)})})}async function Rr(e=null){var A,P,D,O,q,S;const t=document.getElementById("ev-title").value.trim(),n=document.querySelectorAll('#ev-dates-container input[type="date"]'),a=Array.from(n).map(C=>C.value).filter(Boolean);if(!t)return alert("イベント名は必須です");if(a.length===0)return alert("日付を1つ以上指定してください");const s=document.getElementById("ev-time-h").value,r=document.getElementById("ev-time-m").value;let o="";(s||r)&&(o=`${s||"00"}:${r||"00"}`);const i=document.getElementById("ev-end-time-h").value,d=document.getElementById("ev-end-time-m").value;let l="";(i||d)&&(l=`${i||"00"}:${d||"00"}`);const c=document.getElementById("ev-all-day").checked,m=document.getElementById("ev-category").value,u=document.getElementById("ev-description").value,f=document.getElementById("ev-location-select");let b="";if(f)if(f.value==="custom"){const C=((A=document.getElementById("ev-location-custom-name"))==null?void 0:A.value.trim())||"",N=((P=document.getElementById("ev-location-custom-url"))==null?void 0:P.value.trim())||"";b=N?`${C} ${N}`:C}else b=f.value;const y=document.getElementById("ev-attendance-type").value,g=y!=="none",p=y==="detailed",x=((D=document.getElementById("ev-deadline-custom-cb"))==null?void 0:D.checked)||!1,v=(O=document.getElementById("ev-deadline-date"))==null?void 0:O.value,h=(q=document.getElementById("ev-deadline-time-h"))==null?void 0:q.value,$=(S=document.getElementById("ev-deadline-time-m"))==null?void 0:S.value,L=document.getElementById("ev-group-all").checked;let E=[];L||document.querySelectorAll('input[name="ev-group-cb"]:checked').forEach(C=>E.push(C.value));const I=E.length>0?E[0]:null,w=C=>new Promise(N=>setTimeout(N,C)),k=3;let _=0;for(;_<k;){_++,_>1?(U(`通信リトライ中 (${_-1}/${k-1}回目)...`),await w(1500)):U("イベント保存中...");try{if(e){const C=a[0],N=`${C}T${o||"00:00"}:00`;let T=null;l&&(T=`${C}T${l}:00`);let M=null;g&&(x?v&&h&&$&&(M=`${v}T${h}:${$}:00`):M=vt(C));const W={title:t,category:m,description:u,location:b,start_time:N,end_time:T,is_all_day:c,requires_attendance:g,require_detailed_attendance:p,attendance_deadline:M,target_group_id:I,target_group_ids:E.length>0?E:null},{error:j}=await B.from("events").update(W).eq("id",e);if(j)throw j;await X("UPDATE_EVENT",`イベント「${t}」を更新しました`)}else{const C=a.map(T=>{const M=`${T}T${o||"00:00"}:00`;let W=null;l&&(W=`${T}T${l}:00`);let j=null;return g&&(x?v&&h&&$&&(j=`${v}T${h}:${$}:00`):j=vt(T)),{title:t,category:m,description:u,location:b,start_time:M,end_time:W,is_all_day:c,requires_attendance:g,require_detailed_attendance:p,attendance_deadline:j,target_group_id:I,target_group_ids:E.length>0?E:null,created_by:G==null?void 0:G.email}}),{error:N}=await B.from("events").insert(C);if(N)throw N;await X("CREATE_EVENT",`イベント「${t}」を${C.length}件作成しました`)}await tn(),qe(),document.getElementById("list-container").classList.contains("hidden")||kt(),!e&&typeof window.att_clearDateSelection=="function"&&window.att_clearDateSelection(),window.att_closeModal();break}catch(C){console.error(`Save Event Attempt ${_} Error:`,C);const N=C.message==="Load failed"||C.message==="Failed to fetch"||!C.code;if(_<k&&N)continue;{let T=C.message||String(C);C.details&&(T+=`
Details: `+C.details),C.hint&&(T+=`
Hint: `+C.hint),C.code&&(T+=`
Code: `+C.code),alert("保存エラー: "+T+`
（ネットワーク接続をご確認のうえ、再度お試しください）`);break}}}F()}async function Fr(e){if(confirm("このイベントを削除しますか？")){U("イベント削除中...");try{await B.from("events").delete().eq("id",e),await X("DELETE_EVENT",`イベント(ID:${e})を削除しました`),await tn(),qe(),kt(),window.att_closeModal()}catch(t){console.error(t)}finally{F()}}}function Ws(e,t,n=!1){const a=t.ids.length===0||za.some(l=>t.ids.includes(l.group_id)),s=Pt.find(l=>l.email===G.email),r=s?s.can_use_attendance!==!1:!0,o=[];r&&o.push({email:G.email,name:"自分 ( "+((G==null?void 0:G.name)||G.email.split("@")[0])+" )",canAttend:a}),La.forEach(l=>{const c=Pt.find(m=>m.email===l);if(c&&c.can_use_attendance!==!1){const m=t.ids.length===0||at.some(u=>t.ids.includes(u.group_id)&&u.user_email===l);o.push({email:l,name:c.name||l.split("@")[0],canAttend:m})}});let i=!1;return{formsHtml:o.map((l,c)=>{if(!l.canAttend)return`<div class="p-3 bg-gray-50 border rounded mb-2">
                <h4 class="font-bold text-gray-700 mb-1">${l.name}</h4>
                <p class="text-xs text-red-500">※対象グループに所属していないため入力できません</p>
            </div>`;i=!0;const m=Ee.find(y=>y.event_id===e.id&&y.user_email===l.email)||{};let u=m.status||"未回答";u==="未定"&&(u="保留");let f="否",b=m.comment||"";return b.startsWith("[荷物車:可]")?(f="可",b=b.substring(8)):b.startsWith("[荷物車:否]")&&(f="否",b=b.substring(8)),`
        <div class="p-3 bg-blue-50 border border-blue-100 rounded mb-3" data-target-email="${l.email}">
            <h4 class="font-bold text-blue-800 mb-2 border-b border-blue-200 pb-1">${l.name}</h4>
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">ステータス*</label>
                <select id="att-status-${c}" class="w-full border p-1.5 rounded text-sm font-bold" ${n?"disabled":""}>
                    <option value="未回答" ${u==="未回答"?"selected":""}>未回答</option>
                    <option value="出席" ${u==="出席"?"selected":""}>出席</option>
                    <option value="欠席" ${u==="欠席"?"selected":""}>欠席</option>
                    <option value="保留" ${u==="保留"?"selected":""}>保留</option>
                </select>
            </div>
            ${e.require_detailed_attendance?`
                <div class="flex items-center space-x-2 mt-2">
                    <div class="w-1/3">
                        <label class="block text-xs font-bold text-gray-700 mb-1">車出し可否</label>
                        <select id="att-car-flag-${c}" class="w-full border p-1.5 rounded text-sm font-bold" onchange="const isCar = this.value === '可'; document.getElementById('att-car-cap-${c}').disabled = !isCar; document.getElementById('att-luggage-flag-${c}').disabled = !isCar; if(isCar && document.getElementById('att-car-cap-${c}').value == 0) document.getElementById('att-car-cap-${c}').value = 1;" ${n?"disabled":""}>
                            <option value="否" ${!m.car_capacity||m.car_capacity===0?"selected":""}>否</option>
                            <option value="可" ${m.car_capacity>0?"selected":""}>可</option>
                        </select>
                    </div>
                    <div class="w-1/3">
                        <label class="block text-xs font-bold text-gray-700 mb-1">乗車可能人数</label>
                        <input type="number" id="att-car-cap-${c}" value="${m.car_capacity||0}" min="0" class="w-full border p-1.5 rounded text-sm" ${n||!m.car_capacity||m.car_capacity===0?"disabled":""}>
                    </div>
                    <div class="w-1/3">
                        <label class="block text-xs font-bold text-gray-700 mb-1">荷物車対応</label>
                        <select id="att-luggage-flag-${c}" class="w-full border p-1.5 rounded text-sm font-bold" ${n||!m.car_capacity||m.car_capacity===0?"disabled":""}>
                            <option value="否" ${f==="否"?"selected":""}>否</option>
                            <option value="可" ${f==="可"?"selected":""}>可</option>
                        </select>
                    </div>
                </div>
                <div class="mt-2">
                    <label class="block text-xs font-bold text-gray-700 mb-1">同伴者 (例: 父、母、弟)</label>
                    <input type="text" id="att-acc-${c}" value="${m.accompanying_persons||""}" class="w-full border p-1.5 rounded text-sm" ${n?"disabled":""}>
                </div>
            `:""}
            <div class="mt-2">
                <label class="block text-xs font-bold text-gray-700 mb-1">コメント ${n?'<span class="text-red-500 font-normal">(期限後も修正可)</span>':""}</label>
                <textarea id="att-comment-${c}" class="w-full border p-1.5 rounded text-sm" rows="1">${b}</textarea>
            </div>
        </div>`}).join(""),hasAnyForm:i}}window.att_openEventDetail=window.openEventDetailModal=function(e,t="basic"){const n=Ze.find(S=>S.id===e);if(!n)return;const a=gn(n);a.name,a.color;const s=De.find(S=>S.name===n.category),r=(s==null?void 0:s.color)||"#bfdbfe";let o="日時未定";n.is_all_day&&n.start_time?o=n.start_time.substring(0,10)+" (終日)":n.start_time&&(o=n.start_time.substring(0,16).replace("T"," "),n.end_time&&(o+=" 〜 "+n.end_time.substring(11,16)));const i=oa.find(S=>S.event_id===n.id)||{};let d=i&&i.status?i.status:"未回答";d==="未定"&&(d="保留");const l=n.attendance_deadline?new Date>new Date(n.attendance_deadline):!1;let c=n.attendance_deadline?n.attendance_deadline.replace("T"," ").substring(0,16):"設定なし";a.ids.length===0||za.some(S=>a.ids.includes(S.group_id));let m=[];if(a.ids.length===0)m=Pt.filter(S=>S.can_use_attendance!==!1);else{const S=at.filter(T=>a.ids.includes(T.group_id)).map(T=>T.user_email),N=Ee.filter(T=>T.event_id===n.id).map(T=>T.user_email);m=Pt.filter(T=>T.can_use_attendance!==!1&&(S.includes(T.email)||N.includes(T.email)))}window.att_statusViewType||(window.att_statusViewType="group"),window.att_statusFilter||(window.att_statusFilter="all");const u=window.att_statusViewType==="group";let f=0,b=0,y=0;m.forEach(S=>{const C=Ee.find(N=>N.event_id===n.id&&N.user_email===S.email);C&&C.status==="出席"?f++:C&&C.status==="欠席"?b++:y++});const g=[];u?Fe.forEach(S=>{const C=at.filter(H=>H.group_id===S.id).map(H=>H.user_email),N=m.filter(H=>C.includes(H.email));let T=0,M=0,W=0,j=!1;N.forEach(H=>{const R=Ee.find(z=>z.event_id===n.id&&z.user_email===H.email);R&&R.status&&R.status!=="未回答"?(j=!0,R.status==="出席"?T++:R.status==="欠席"?M++:W++):W++}),j&&g.push({name:S.name,attending:T,absent:M,pending:W})}):Ct.forEach(S=>{const C=m.filter(j=>j.attribute_id===S.id);let N=0,T=0,M=0,W=!1;C.forEach(j=>{const H=Ee.find(R=>R.event_id===n.id&&R.user_email===j.email);H&&H.status&&H.status!=="未回答"?(W=!0,H.status==="出席"?N++:H.status==="欠席"?T++:M++):M++}),W&&g.push({name:S.name,attending:N,absent:T,pending:M})});const p=`
        <div class="flex items-center space-x-1 mb-4 p-1 bg-gray-100/80 rounded-lg w-fit shrink-0">
            <button onclick="window.att_setStatusViewType('${n.id}', 'group')" class="px-4 py-1.5 rounded-md text-xs font-bold transition shadow-sm ${u?"bg-green-600 text-white":"text-gray-600 hover:text-gray-900"}">📂 グループ別</button>
            <button onclick="window.att_setStatusViewType('${n.id}', 'attribute')" class="px-4 py-1.5 rounded-md text-xs font-bold transition shadow-sm ${u?"text-gray-600 hover:text-gray-900":"bg-green-600 text-white"}">👥 属性別</button>
        </div>
    `,x=u?"※出欠の入力があるグループのみ表示しています。":"※出欠の入力がある属性のみ表示しています。";let v=`
        <tr class="bg-gray-50/50 font-bold border-b border-gray-200">
            <td class="px-4 py-2.5 text-gray-800">全体</td>
            <td class="px-4 py-2.5 text-center text-green-600 font-extrabold">${f}</td>
            <td class="px-4 py-2.5 text-center text-red-500 font-extrabold">${b}</td>
            <td class="px-4 py-2.5 text-center text-gray-600">${y}</td>
        </tr>
    `;g.length===0?v+=`
            <tr>
                <td colspan="4" class="px-4 py-6 text-center text-gray-400 text-xs">出欠の入力がある${u?"グループ":"属性"}はありません。</td>
            </tr>
        `:v+=g.map(S=>`
            <tr class="border-b border-gray-100 hover:bg-gray-50/30 transition">
                <td class="px-4 py-2.5 text-gray-700 font-semibold text-xs">${S.name}</td>
                <td class="px-4 py-2.5 text-center text-green-600 font-bold text-xs">${S.attending}</td>
                <td class="px-4 py-2.5 text-center text-red-500 font-bold text-xs">${S.absent}</td>
                <td class="px-4 py-2.5 text-center text-gray-500 text-xs">${S.pending}</td>
            </tr>
        `).join("");const h=`
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
        <p class="text-[10px] text-gray-400 font-semibold mb-4">${x}</p>
    `,$=m.filter(S=>{const C=Ee.find(T=>T.event_id===n.id&&T.user_email===S.email),N=(C==null?void 0:C.status)||"未回答";return window.att_statusFilter==="all"?!0:window.att_statusFilter==="answered"?N==="出席"||N==="欠席"||N==="保留"||N==="未定":window.att_statusFilter==="attending"?N==="出席":window.att_statusFilter==="absent"?N==="欠席":window.att_statusFilter==="pending"?N==="保留"||N==="未定":window.att_statusFilter==="unanswered"?N==="未回答"||!N:!0});window.att_statusSortKey||(window.att_statusSortKey="default"),window.att_statusSortOrder||(window.att_statusSortOrder="asc");const L=window.att_statusSortKey,E=window.att_statusSortOrder;L!=="default"&&$.sort((S,C)=>{var M,W;let N,T;if(L==="name")N=S.name||S.email.split("@")[0],T=C.name||C.email.split("@")[0];else if(L==="group")if(u){const j=at.filter(R=>R.user_email===S.email).map(R=>R.group_id);N=Fe.filter(R=>j.includes(R.id)).map(R=>R.name).join(", ")||"-";const H=at.filter(R=>R.user_email===C.email).map(R=>R.group_id);T=Fe.filter(R=>H.includes(R.id)).map(R=>R.name).join(", ")||"-"}else N=((M=Ct.find(j=>j.id===S.attribute_id))==null?void 0:M.name)||"-",T=((W=Ct.find(j=>j.id===C.attribute_id))==null?void 0:W.name)||"-";else if(L==="status"){const j=H=>{const R=Ee.find(de=>de.event_id===n.id&&de.user_email===H.email),z=(R==null?void 0:R.status)||"未回答";return z==="出席"?1:z==="保留"||z==="未定"?2:z==="未回答"?3:z==="欠席"?4:5};N=j(S),T=j(C)}else if(L==="comment"){const j=H=>{const R=Ee.find(ge=>ge.event_id===n.id&&ge.user_email===H.email);if(!R||!R.status||R.status==="未回答")return"";let z=R.comment||"",de="否";z.startsWith("[荷物車:可]")?(de="可",z=z.substring(8)):z.startsWith("[荷物車:否]")&&(de="否",z=z.substring(8));let ee=[];return n.require_detailed_attendance&&(R.accompanying_persons&&ee.push(`同伴: ${R.accompanying_persons}`),R.car_capacity&&R.car_capacity>0&&(ee.push(`車出: 可[${R.car_capacity}人]`),ee.push(`荷物車: ${de}`))),z.trim()&&ee.push(`メモ: ${z.trim()}`),ee.join(", ")};N=j(S),T=j(C)}else if(L==="updated_at"){const j=Ee.find(R=>R.event_id===n.id&&R.user_email===S.email),H=Ee.find(R=>R.event_id===n.id&&R.user_email===C.email);N=j?new Date(j.updated_at).getTime():0,T=H?new Date(H.updated_at).getTime():0}return N<T?E==="asc"?-1:1:N>T?E==="asc"?1:-1:0});const w=[{type:"all",label:"すべて"},{type:"answered",label:"回答済"},{type:"attending",label:"出席"},{type:"absent",label:"欠席"},{type:"pending",label:"保留"},{type:"unanswered",label:"未回答"}].map(S=>{const C=window.att_statusFilter===S.type;return`<button onclick="window.att_setStatusFilter('${n.id}', '${S.type}')" class="px-2.5 py-1 rounded-full text-xs font-bold transition ${C?"bg-blue-600 text-white shadow-sm":"bg-gray-100 text-gray-600 hover:bg-gray-200"}">${S.label}</button>`}).join(" ");let k="";$.length===0?k=`
            <tr>
                <td colspan="5" class="px-4 py-6 text-center text-gray-400 text-xs">該当するメンバーはいません。</td>
            </tr>
        `:k=$.map(S=>{var ee;const C=S.name||S.email.split("@")[0];let N="-";if(u){const ge=at.filter(we=>we.user_email===S.email).map(we=>we.group_id);N=Fe.filter(we=>ge.includes(we.id)).map(we=>we.name).join(", ")||"-"}else N=((ee=Ct.find(ge=>ge.id===S.attribute_id))==null?void 0:ee.name)||"-";const T=Ee.find(ge=>ge.event_id===n.id&&ge.user_email===S.email);let M=(T==null?void 0:T.status)||"未回答";M==="未定"&&(M="保留");let W="";M==="出席"?W='<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-green-100 text-green-800 border border-green-200">🟢 参加</span>':M==="欠席"?W='<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-red-100 text-red-800 border border-red-200">❌ 不参加</span>':M==="保留"?W='<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-yellow-100 text-yellow-800 border border-yellow-200">❓ 未定/その他</span>':W='<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-gray-100 text-gray-500 border border-gray-200">❓ 未定/その他</span>';let j=(T==null?void 0:T.comment)||"",H="否";j.startsWith("[荷物車:可]")?(H="可",j=j.substring(8)):j.startsWith("[荷物車:否]")&&(H="否",j=j.substring(8));let R=[];T&&T.status&&T.status!=="未回答"&&(n.require_detailed_attendance&&(T.accompanying_persons&&R.push(`同伴: ${T.accompanying_persons}`),T.car_capacity&&T.car_capacity>0&&(R.push(`車出: 可[${T.car_capacity}人]`),R.push(`荷物車: ${H}`))),j.trim()&&R.push(`メモ: ${j.trim()}`));const z=R.length>0?R.join(", "):"-",de=T?Us(T.updated_at):"-";return`
                <tr class="hover:bg-gray-50/50 border-b border-gray-100 transition">
                    <td class="px-4 py-2 font-bold text-gray-800 text-[11px]">${C}</td>
                    <td class="px-4 py-2 text-gray-500 text-[11px] font-semibold">${N}</td>
                    <td class="px-4 py-2">${W}</td>
                    <td class="px-4 py-2 text-gray-600 text-[11px] max-w-[180px] truncate" title="${z}">${z}</td>
                    <td class="px-4 py-2 text-gray-400 text-[11px] font-semibold">${de}</td>
                </tr>
            `}).join("");const _=S=>L!==S?'<span class="text-gray-300 ml-1">⇅</span>':E==="asc"?'<span class="text-blue-600 ml-1">▲</span>':'<span class="text-blue-600 ml-1">▼</span>',A=`
        <div class="mt-4 border-t pt-4">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                <h4 class="font-bold text-gray-700 text-xs shrink-0">参加者リスト</h4>
                <div class="flex flex-wrap items-center gap-2">
                    <div class="flex items-center space-x-1">
                        ${w}
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
                            <th onclick="window.att_toggleSort('${n.id}', 'name')" class="px-4 py-2 font-bold text-gray-600 text-left text-xs cursor-pointer hover:bg-gray-100 transition">名前 ${_("name")}</th>
                            <th onclick="window.att_toggleSort('${n.id}', 'group')" class="px-4 py-2 font-bold text-gray-600 text-left text-xs cursor-pointer hover:bg-gray-100 transition">${u?"グループ":"属性"} ${_("group")}</th>
                            <th onclick="window.att_toggleSort('${n.id}', 'status')" class="px-4 py-2 font-bold text-gray-600 text-left text-xs cursor-pointer hover:bg-gray-100 transition">出欠 ${_("status")}</th>
                            <th onclick="window.att_toggleSort('${n.id}', 'comment')" class="px-4 py-2 font-bold text-gray-600 text-left text-xs cursor-pointer hover:bg-gray-100 transition">出欠メモ ${_("comment")}</th>
                            <th onclick="window.att_toggleSort('${n.id}', 'updated_at')" class="px-4 py-2 font-bold text-gray-600 text-left text-xs cursor-pointer hover:bg-gray-100 transition">更新日時 ${_("updated_at")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${k}
                    </tbody>
                </table>
            </div>
        </div>
    `,P=t==="basic"?"border-b-2 border-blue-500 text-blue-600 font-bold":"text-gray-500 hover:text-gray-700",D=t==="attendance"?"border-b-2 border-blue-500 text-blue-600 font-bold":"text-gray-500 hover:text-gray-700",O=t==="status"?"border-b-2 border-blue-500 text-blue-600 font-bold":"text-gray-500 hover:text-gray-700",q=`
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
                    <button onclick="window.att_openEventDetail('${n.id}', 'attendance')" class="flex-1 py-2 text-sm font-medium ${D}">出欠登録</button>
                    <button onclick="window.att_openEventDetail('${n.id}', 'status')" class="flex-1 py-2 text-sm font-medium ${O}">出欠状況</button>
                `:""}
            </div>

            <div class="p-4 overflow-y-auto">
                ${t==="basic"?`
                    <div class="text-sm text-gray-600 mb-4 space-y-1">
                        <p><strong>日時:</strong> ${o}</p>
                        <p><strong>場所:</strong> ${zs(n.location)}</p>
                        <p class="flex items-center gap-1 mt-1"><strong>カテゴリ:</strong> <span class="px-2 py-0.5 rounded text-xs text-gray-800 shadow-sm" style="background-color: ${r}">${n.category||"未設定"}</span></p>
                        <p class="flex items-center gap-1 mt-1"><strong>対象:</strong> ${Hs(a)}</p>
                        <p class="mt-2 whitespace-pre-wrap border p-2 bg-gray-50 rounded min-h-[60px] text-gray-800">${n.description||"説明なし"}</p>
                    </div>
                `:t==="attendance"?`
                    <div class="space-y-4">
                        <div class="text-sm border-b pb-2 mb-2">
                            現在のステータス: <span class="font-bold ${d==="出席"?"text-green-600":d==="欠席"?"text-red-500":"text-gray-800"}">${d}</span>
                            <br><span class="text-xs text-gray-500">回答期限: ${c}</span>
                            ${l?'<span class="ml-2 text-red-500 font-bold text-xs bg-red-100 px-2 py-0.5 rounded shadow-sm">期限切れ</span>':""}
                        </div>
                        ${(()=>{const{formsHtml:S,hasAnyForm:C}=Ws(n,a,l);return S+(C?`
                                <div class="mt-4 text-right">
                                    <button onclick="window.att_saveAttendance('${n.id}')" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-bold shadow">出欠を一括保存</button>
                                </div>
                            `:"")})()}
                    </div>
                `:`
                    <div class="space-y-4">
                        ${p}
                        ${h}
                        ${A}
                    </div>
                `}
            </div>
        </div>
    </div>`;document.getElementById("attendance-modals").innerHTML=q};function qr(e){const t=Ze.find(i=>i.id===e);if(!t)return;const n=gn(t),a=t.attendance_deadline?new Date>new Date(t.attendance_deadline):!1,{formsHtml:s,hasAnyForm:r}=Ws(t,n,a),o=`
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
    </div>`;document.getElementById("attendance-modals").innerHTML=o}async function jr(e){const t=document.querySelectorAll("[data-target-email]");if(t.length===0)return window.att_closeModal();const n=Ze.find(s=>s.id===e);if(!n)return;const a=[];t.forEach(s=>{const r=s.getAttribute("data-target-email"),o=s.querySelector('select[id^="att-status-"]');if(o){const i=s.querySelector('input[id^="att-acc-"]'),d=s.querySelector('select[id^="att-car-flag-"]'),l=s.querySelector('input[id^="att-car-cap-"]'),c=s.querySelector('select[id^="att-luggage-flag-"]'),m=s.querySelector('textarea[id^="att-comment-"]'),u=d?d.value:"否",f=u==="可"&&l&&parseInt(l.value)||0;let b=m?m.value.trim():"";n.require_detailed_attendance&&u==="可"&&(b=`[荷物車:${c?c.value:"否"}]`+b),a.push({event_id:e,user_email:r,status:o.value,accompanying_persons:i?i.value:"",car_capacity:f,separate_action:null,comment:b,updated_at:new Date().toISOString()})}}),U("出欠保存中...");try{const{error:s}=await B.from("attendances").upsert(a,{onConflict:"event_id, user_email"});if(s)throw s;await X("UPDATE_ATTENDANCE",`イベント(ID:${e})の出欠を ${a.length}件更新しました`),await tn(),qe(),kt(),window.att_openEventDetail(e,"status")}catch(s){console.error("Save Attendance Error:",s),s.message==="Load failed"||s.message==="Failed to fetch"?alert("出欠登録エラー: 通信に失敗しました。ネットワーク接続やデータベースの状態を確認してください。"):alert("出欠登録エラー: "+s.message)}finally{F()}}function Hr(){const t=[["タイトル","日付","開始時刻","終了時刻","終日","カテゴリ","対象グループ","場所","出欠管理","詳細出欠","説明","回答期限"].join(",")];Ze.forEach(o=>{const i=o.start_time?o.start_time.split("T")[0]:"",d=o.start_time&&!o.is_all_day?o.start_time.split("T")[1].substring(0,5):"",l=o.end_time&&!o.is_all_day?o.end_time.split("T")[1].substring(0,5):"",m=gn(o).name,u=f=>f==null?'""':`"${String(f).replace(/"/g,'""')}"`;t.push([u(o.title),u(i),u(d),u(l),o.is_all_day?"TRUE":"FALSE",u(o.category),u(m),u(o.location),o.requires_attendance?"TRUE":"FALSE",o.require_detailed_attendance?"TRUE":"FALSE",u(o.description),u(o.attendance_deadline)].join(","))});const n=new Uint8Array([239,187,191]),a=new Blob([n,t.join(`
`)],{type:"text/csv;charset=utf-8;"}),s=URL.createObjectURL(a),r=document.createElement("a");r.href=s,r.download=`events_${new Date().toISOString().split("T")[0]}.csv`,r.click(),URL.revokeObjectURL(s)}function Ur(e){const t=[];let n=[],a="",s=!1;for(let r=0;r<e.length;r++){const o=e[r];s?o==='"'?r+1<e.length&&e[r+1]==='"'?(a+='"',r++):s=!1:a+=o:o==='"'?s=!0:o===","?(n.push(a),a=""):o===`
`||o==="\r"?(n.push(a),t.push(n),n=[],a="",o==="\r"&&r+1<e.length&&e[r+1]===`
`&&r++):a+=o}return(a||n.length>0)&&(n.push(a),t.push(n)),t}window.att_importCsv=async function(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=async a=>{const s=a.target.result,r=Ur(s);if(r.length<2)return alert("インポートするデータがありません。");const o=[];for(let c=1;c<r.length;c++){const m=r[c];if(m.length<2||!m[0]||!m[1])continue;const u=m[0],f=m[1],b=m[2],y=m[3],g=(m[4]||"").toUpperCase()==="TRUE",p=m[5],x=m[6]||"",v=m[7],h=(m[8]||"").toUpperCase()==="TRUE"||(m[8]||"").trim()==="",$=(m[9]||"").toUpperCase()==="TRUE",L=m[10],E=m[11]||null,I=`${f}T${b||"00:00"}:00`;let w=null;y&&(w=`${f}T${y}:00`);const k=x.split(",").map(D=>D.trim()),_=Fe.filter(D=>k.includes(D.name)),A=_.length>0?_.map(D=>D.id):null,P=A?A[0]:null;o.push({title:u,category:p||null,description:L||null,location:v||null,start_time:I,end_time:w,is_all_day:g,requires_attendance:h,require_detailed_attendance:$,attendance_deadline:E,target_group_id:P,target_group_ids:A,created_by:G==null?void 0:G.email})}if(o.length===0)return alert(`インポート可能なイベントがありませんでした。
タイトルと日付は必須です。`);const i=o.map(c=>{const m=c.is_all_day?c.start_time.split("T")[0]+" (終日)":c.start_time.replace("T"," ").substring(0,16);return`<div class="text-sm border-b py-2 border-gray-200">
                <div class="font-bold text-gray-800">${c.title}</div>
                <div class="text-gray-600 text-xs">${m}</div>
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
        </div>`,l=document.createElement("div");l.innerHTML=d,document.body.appendChild(l.firstElementChild),document.getElementById("btn-cancel-import").onclick=()=>{document.getElementById("csv-import-confirm-modal").remove(),document.getElementById("file-import-csv").value=""},document.getElementById("btn-exec-import").onclick=async()=>{document.getElementById("csv-import-confirm-modal").remove(),U("インポート実行中...");try{const{error:c}=await B.from("events").insert(o);if(c)throw c;await X("IMPORT_EVENTS",`イベントデータを${o.length}件インポートしました`),alert(`${o.length}件のインポートが完了しました。`),await tn(),qe(),kt()}catch(c){alert(`インポート中にエラーが発生しました:
`+c.message)}finally{F(),document.getElementById("file-import-csv").value=""}}},n.readAsText(t)};function vt(e){if(!e)return null;const t=new Date(e+"T00:00:00");if(isNaN(t.getTime()))return null;const n=new Date(t.getTime()-3*24*60*60*1e3),a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),r=String(n.getDate()).padStart(2,"0");return`${a}-${s}-${r}T12:00:00`}function hs(e){const t=vt(e);if(!t)return"";const n=new Date(t),a=n.getFullYear(),s=n.getMonth()+1,r=n.getDate(),o=Ja[n.getDay()];return`${a}/${s}/${r}(${o}) 12:00`}function zs(e){if(!e)return"未定";let t=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");const n=/(https?:\/\/[^\s\<\>\"]+)/g;return t.replace(n,a=>`<a href="${a}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="text-blue-600 hover:underline inline-flex items-center space-x-0.5 ml-1 font-semibold">
            <span>地図/リンク</span>
            <svg class="w-3.5 h-3.5 inline ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
        </a>`)}function Js(){const e=document.getElementById("multiselect-bar"),t=document.getElementById("multiselect-count");!e||!t||(window.att_multiSelectMode&&window.att_selectedDates.size>0?(t.textContent=window.att_selectedDates.size,e.classList.remove("hidden")):e.classList.add("hidden"))}function Vr(){window.att_selectedDates.clear(),qe(),Js()}function Gr(){if(window.att_selectedDates.size===0){alert("日程が選択されていません。");return}const e=Array.from(window.att_selectedDates).sort();In("",null,!1,e)}function $n(){const e=document.getElementById("ev-dates-container");if(e){if(e.innerHTML="",oe.length===0){e.innerHTML='<div class="text-xs text-gray-500 py-1.5 text-center">日付が選択されていません</div>';return}oe.forEach((t,n)=>{const a=document.createElement("div");a.className="flex items-center space-x-2 bg-white p-1.5 rounded border shadow-sm";const s=document.createElement("input");if(s.type="date",s.value=t,s.className="border rounded text-xs px-2 py-1 flex-1 min-w-0 font-medium focus:ring-1 focus:ring-blue-500 focus:border-blue-500",s.onchange=r=>{oe[n]=r.target.value,Mt()},a.appendChild(s),!window.att_isEditingModal){const r=document.createElement("button");r.type="button",r.className="text-red-500 hover:text-red-700 font-bold p-1 transition rounded hover:bg-red-50",r.innerHTML=`
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            `,r.onclick=()=>{oe.splice(n,1),$n(),Mt()},a.appendChild(r)}e.appendChild(a)})}}function Wr(){let e=new Date().toISOString().split("T")[0];if(oe.length>0){const t=new Date(oe[oe.length-1]);isNaN(t.getTime())||(t.setDate(t.getDate()+1),e=t.toISOString().split("T")[0])}oe.push(e),$n(),Mt()}function zr(e){oe.splice(e,1),$n(),Mt()}function Mt(){const e=document.getElementById("ev-deadline-auto-preview");if(e){if(oe.length===0){e.innerHTML='<span class="text-red-500 font-semibold text-xs">日付を入力してください</span>';return}if(oe.length===1)if(vt(oe[0])){const n=hs(oe[0]);e.innerHTML=`<span class="text-blue-600 font-bold">自動算出:</span> ${n}`}else e.innerHTML='<span class="text-red-500 font-semibold text-xs">日付が不正です</span>';else{const t=hs(oe[0]);e.innerHTML=`<span class="text-blue-600 font-bold">自動算出:</span> 各日程の3日前の12:00<br><span class="text-[10px] text-gray-400 font-semibold">(例: ${oe[0]}分 → ${t})</span>`}}}function Jr(e){const t=document.getElementById("ev-location-custom-container");t&&(e==="custom"?t.classList.remove("hidden"):t.classList.add("hidden"))}async function Kr(){const e=document.getElementById("ev-location-custom-name"),t=document.getElementById("ev-location-custom-url");if(!e)return;const n=e.value.trim(),a=t?t.value.trim():"";if(!n)return alert("場所名は必須です");U("場所マスタに登録中...");try{const{error:s}=await B.from("event_locations").insert({name:n,url:a||null});if(s)throw s;const{data:r}=await B.from("event_locations").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});r&&(Ot=r);const o=document.getElementById("ev-location-select");if(o){const i=a?`${n} ${a}`:n;o.innerHTML=`
                <option value="custom">-- 直接入力 / 新規マスタ追加 --</option>
                ${Ot.map(l=>{const c=l.url?`${l.name} ${l.url}`:l.name;return`<option value="${c}" ${c===i?"selected":""}>${l.name}${l.url?" (URLあり)":""}</option>`}).join("")}
            `;const d=document.getElementById("ev-location-custom-container");d&&d.classList.add("hidden"),e.value="",t&&(t.value="")}alert("場所マスタに登録しました")}catch(s){console.error("Failed to register location:",s),alert("マスタ登録エラー: "+(s.message||String(s)))}finally{F()}}window.att_closeModal=()=>{const e=document.getElementById("attendance-modals");e&&(e.innerHTML="")};window.att_saveEvent=Rr;window.att_deleteEvent=Fr;window.att_openEventDetail=openEventDetailModal;window.att_openAttendanceForm=qr;window.att_saveAttendance=jr;window.att_exportCsv=Hr;window.att_statusViewType=window.att_statusViewType||"group";window.att_statusFilter=window.att_statusFilter||"all";window.att_setStatusViewType=(e,t)=>{window.att_statusViewType=t,window.att_openEventDetail(e,"status")};window.att_setStatusFilter=(e,t)=>{window.att_statusFilter=t,window.att_openEventDetail(e,"status")};window.att_copyEvent=function(e){const t=Ze.find(a=>a.id===e);if(!t)return;const n=window.att_selectedDates&&window.att_selectedDates.size>0?Array.from(window.att_selectedDates).sort():null;In("",t,!1,n)};window.att_editEvent=function(e){const t=Ze.find(n=>n.id===e);t&&In("",t,!0)};window.att_addDateRow=Wr;window.att_removeDateRow=zr;window.att_renderDateRows=$n;window.att_updateDefaultDeadlineLabel=Mt;window.att_openBulkAddEvent=Gr;window.att_clearDateSelection=Vr;window.att_onLocationSelectChange=Jr;window.att_registerNewLocation=Kr;window.att_updateMultiselectBar=Js;window.att_onSingleDateChange=e=>{oe=[e],Mt();const t=vt(e);if(t){const n=t.split("T")[0],a=t.split("T")[1].substring(0,5),s=a.split(":")[0],r=a.split(":")[1],o=document.getElementById("ev-deadline-date"),i=document.getElementById("ev-deadline-time-h"),d=document.getElementById("ev-deadline-time-m");o&&(o.value=n),i&&(i.value=s),d&&(d.value=r)}};window.att_toggleDeadlineCustom=e=>{const t=document.getElementById("ev-deadline-custom-inputs"),n=document.getElementById("ev-deadline-auto-preview");if(!(!t||!n))if(e){t.classList.remove("hidden"),n.classList.add("hidden");const a=oe[0],s=vt(a);if(s){const r=s.split("T")[0],o=s.split("T")[1].substring(0,5),i=o.split(":")[0],d=o.split(":")[1],l=document.getElementById("ev-deadline-date"),c=document.getElementById("ev-deadline-time-h"),m=document.getElementById("ev-deadline-time-m");l&&!l.value&&(l.value=r),c&&!c.value&&(c.value=i),m&&!m.value&&(m.value=d)}}else t.classList.add("hidden"),n.classList.remove("hidden"),Mt()};function Pn(e){const t=e.getFullYear(),n=e.getMonth()+1,a=e.getDate();if(n===1&&a===1||n===2&&a===11||n===2&&a===23||n===4&&a===29||n===5&&a===3||n===5&&a===4||n===5&&a===5||n===8&&a===11||n===11&&a===3||n===11&&a===23)return!0;if(e.getDay()===1){const r=Math.floor((a-1)/7)+1;if(n===1&&r===2||n===7&&r===3||n===9&&r===3||n===10&&r===2)return!0}if(n===3){const r=Math.floor(20.8431+.242194*(t-1980)-Math.floor((t-1980)/4));if(a===r)return!0}if(n===9){const r=Math.floor(23.2488+.242194*(t-1980)-Math.floor((t-1980)/4));if(a===r)return!0}return!1}function Yr(e){if(Pn(e))return!0;const t=e.getFullYear(),n=e.getMonth(),a=e.getDate(),s=e.getDay();if(s===1){const i=new Date(t,n,a-1);if(Pn(i))return!0}const r=new Date(t,n,a-1),o=new Date(t,n,a+1);return!!(Pn(r)&&Pn(o)&&s!==0)}async function Qr(){U("予定情報をエクスポート中...");try{const{data:e}=await B.from("events").select("*").order("start_time",{ascending:!0}),{data:t}=await B.from("groups").select("*"),n=new Map(t.map(d=>[d.id,d.name])),s=[["ID","タイトル","カテゴリ","場所","開始日時","終了日時","説明","終日(1/0)","出欠回答要(1/0)","詳細回答要(1/0)","回答期限","対象グループ名","削除(1/0)"]];e.forEach(d=>{let l="";d.target_group_ids&&d.target_group_ids.length>0?l=d.target_group_ids.map(f=>n.get(f)||"").filter(f=>f).join(", "):d.target_group_id&&(l=n.get(d.target_group_id)||"");const c=d.start_time?d.start_time.replace("T"," ").substring(0,16):"",m=d.end_time?d.end_time.replace("T"," ").substring(0,16):"",u=d.attendance_deadline?d.attendance_deadline.replace("T"," ").substring(0,16):"";s.push([d.id,d.title||"",d.category||"",d.location||"",c,m,d.description||"",d.is_all_day?"1":"0",d.requires_attendance?"1":"0",d.require_detailed_attendance?"1":"0",u,l,"0"])});const r=s.map(d=>d.map(window.escapeCSV).join(",")).join(`
`),o=new Blob([new Uint8Array([239,187,191]),r],{type:"text/csv;charset=utf-8;"}),i=document.createElement("a");i.href=URL.createObjectURL(o),i.download=`schedule_${new Date().toISOString().split("T")[0]}.csv`,i.click()}catch(e){console.error(e),alert("予定のエクスポートに失敗しました: "+e.message)}finally{F()}}async function Zr(e){const t=e.target.files[0];if(!t)return;U("CSVファイルを解析中...");const n=new FileReader;n.onload=async a=>{try{const s=a.target.result,r=window.parseCSV(s);if(r.length<2){alert("有効なデータがありません。"),F();return}const o=r[0].map(D=>D.trim()),i=o.indexOf("ID"),d=o.indexOf("タイトル"),l=o.indexOf("カテゴリ"),c=o.indexOf("場所"),m=o.indexOf("開始日時"),u=o.indexOf("終了日時"),f=o.indexOf("説明"),b=o.findIndex(D=>D.includes("終日")),y=o.findIndex(D=>D.includes("出欠回答要")),g=o.findIndex(D=>D.includes("詳細回答要")),p=o.findIndex(D=>D.includes("回答期限")),x=o.findIndex(D=>D.includes("対象グループ名")),v=o.findIndex(D=>D.includes("削除"));if(d===-1||m===-1){alert("「タイトル」および「開始日時」列は必須です。"),F();return}const{data:h}=await B.from("events").select("*"),{data:$}=await B.from("groups").select("*"),L=new Map($.map(D=>[D.name,D.id])),E=new Map(h.map(D=>[D.id,D])),I=new Map(h.map(D=>[`${D.title}_${D.start_time?D.start_time.substring(0,16).replace("T"," "):""}`,D])),w=[],k=[],_=[],A=D=>{if(!D)return null;let O=D.trim().replace(/\//g,"-").replace(" ","T");return O.length===10?O+="T00:00:00":O.length===16&&(O+=":00"),O};for(let D=1;D<r.length;D++){const O=r[D];if(O.length<2)continue;const q=(O[d]||"").trim(),S=(O[m]||"").trim();if(!q||!S)continue;const C=A(S),N=i!==-1?(O[i]||"").trim():"",T=l!==-1?(O[l]||"").trim():"",M=c!==-1?(O[c]||"").trim():"",W=u!==-1?A(O[u]):null,j=f!==-1?(O[f]||"").trim():"",H=b!==-1?O[b]==="1"||O[b]==="true":!1,R=y!==-1?!(O[y]==="0"||O[y]==="false"):!0,z=g!==-1?O[g]==="1"||O[g]==="true":!1,de=p!==-1?A(O[p]):null,ee=v!==-1?O[v]==="1"||O[v]==="削除":!1,ge=x!==-1?(O[x]||"").trim():"";let we=[],Lt="";if(ge){const Je=ge.split(",").map(Ce=>Ce.trim()).filter(Ce=>Ce);we=Je.map(Ce=>L.get(Ce)).filter(Ce=>Ce),Lt=Je.join(", ")}const lt={id:N,title:q,category:T,location:M,start_time:C,end_time:W,description:j,is_all_day:H,requires_attendance:R,require_detailed_attendance:z,attendance_deadline:de,target_group_ids:we,target_group_name:Lt};let ne=null;if(N&&(ne=E.get(N)),!ne){const Je=`${q}_${S.substring(0,16).replace(/\//g,"-")}`;ne=I.get(Je)}if(ne)if(lt.id=ne.id,ee)_.push(lt);else{const Je=ne.title!==q,Ce=ne.category!==T,mt=ne.location!==M,pt=ne.description!==j,ct=(ne.start_time?ne.start_time.substring(0,16):"")!==(C?C.substring(0,16):""),Ke=(ne.end_time?ne.end_time.substring(0,16):"")!==(W?W.substring(0,16):""),Ae=ne.is_all_day!==H,V=ne.requires_attendance!==R,le=ne.require_detailed_attendance!==z,Me=(ne.attendance_deadline?ne.attendance_deadline.substring(0,16):"")!==(de?de.substring(0,16):""),Ue=ne.target_group_ids||(ne.target_group_id?[ne.target_group_id]:[]),Ut=JSON.stringify([...Ue].sort())!==JSON.stringify([...we].sort());(Je||Ce||mt||pt||ct||Ke||Ae||V||le||Me||Ut)&&k.push(lt)}else ee||w.push(lt)}F();let P="";_.length>0&&(P=`⚠️ 警告: ${_.length}件の予定が削除されます。予定を削除すると、その予定に紐づいているメンバー全員の出欠データや配車データも自動的に削除されます。`),window.showCSVConfirmModal("events",w,k,_,"予定CSVインポート確認",P)}catch(s){console.error(s),alert("CSVの解析に失敗しました: "+s.message),F()}},n.readAsText(t)}async function Xr(){const{add:e,update:t,delete:n}=_t;U("予定データを保存中...");try{if(n.length>0){const a=n.map(r=>r.id),{error:s}=await B.from("events").delete().in("id",a);if(s)throw s;await X("IMPORT_EVENTS_DELETE",`${n.length}件の予定をインポートで削除しました`)}if(e.length>0){const a=e.map(r=>({title:r.title,category:r.category,location:r.location,start_time:r.start_time,end_time:r.end_time,description:r.description,is_all_day:r.is_all_day,requires_attendance:r.requires_attendance,require_detailed_attendance:r.requires_attendance?r.require_detailed_attendance:!1,attendance_deadline:r.attendance_deadline,target_group_ids:r.target_group_ids.length>0?r.target_group_ids:null,created_by:G==null?void 0:G.email})),{error:s}=await B.from("events").insert(a);if(s)throw s;await X("IMPORT_EVENTS_ADD",`${e.length}件の予定をインポートで追加しました`)}if(t.length>0){for(let a of t){const{error:s}=await B.from("events").update({title:a.title,category:a.category,location:a.location,start_time:a.start_time,end_time:a.end_time,description:a.description,is_all_day:a.is_all_day,requires_attendance:a.requires_attendance,require_detailed_attendance:a.requires_attendance?a.require_detailed_attendance:!1,attendance_deadline:a.attendance_deadline,target_group_ids:a.target_group_ids.length>0?a.target_group_ids:null}).eq("id",a.id);if(s)throw s}await X("IMPORT_EVENTS_UPDATE",`${t.length}件の予定をインポートで更新しました`)}alert("予定のインポートが完了しました。"),window.closeCSVConfirmModal(),await tn(),qe(),document.getElementById("list-container").classList.contains("hidden")||kt()}catch(a){console.error(a),alert("予定データの保存に失敗しました: "+a.message)}finally{F()}}window.executeEventsImport=Xr;function eo(){const n=[["ID","タイトル","カテゴリ","場所","開始日時","終了日時","説明","終日(1/0)","出欠回答要(1/0)","詳細回答要(1/0)","回答期限","対象グループ名","削除(1/0)"],["","土曜練習","練習","第一グラウンド","2026-06-20 09:00","2026-06-20 12:00","通常練習を行います。","0","1","1","2026-06-19 18:00","選手・保護者","0"],["","練習試合(イーグルス戦)","試合","イーグルス球場","2026-06-21 13:00","2026-06-21 16:00","遠征試合です。車出しをお願いします。","0","1","1","2026-06-20 12:00","選手・保護者","0"]].map(r=>r.map(window.escapeCSV).join(",")).join(`
`),a=new Blob([new Uint8Array([239,187,191]),n],{type:"text/csv;charset=utf-8;"}),s=document.createElement("a");s.href=URL.createObjectURL(a),s.download="schedule_sample.csv",s.click()}window.att_toggleSort=function(e,t){window.att_statusSortKey===t?window.att_statusSortOrder==="asc"?window.att_statusSortOrder="desc":(window.att_statusSortKey="default",window.att_statusSortOrder="asc"):(window.att_statusSortKey=t,window.att_statusSortOrder="asc"),window.att_openEventDetail(e,"status")};window.att_exportParticipantList=function(e){const t=Ze.find(b=>b.id===e);if(!t)return;const n=gn(t),a=window.att_statusViewType==="group";let s=[];if(n.ids.length===0)s=Pt.filter(b=>b.can_use_attendance!==!1);else{const b=at.filter(p=>n.ids.includes(p.group_id)).map(p=>p.user_email),g=Ee.filter(p=>p.event_id===t.id).map(p=>p.user_email);s=Pt.filter(p=>p.can_use_attendance!==!1&&(b.includes(p.email)||g.includes(p.email)))}const r=s.filter(b=>{const y=Ee.find(p=>p.event_id===t.id&&p.user_email===b.email),g=(y==null?void 0:y.status)||"未回答";return window.att_statusFilter==="all"?!0:window.att_statusFilter==="answered"?g==="出席"||g==="欠席"||g==="保留"||g==="未定":window.att_statusFilter==="attending"?g==="出席":window.att_statusFilter==="absent"?g==="欠席":window.att_statusFilter==="pending"?g==="保留"||g==="未定":window.att_statusFilter==="unanswered"?g==="未回答"||!g:!0}),o=window.att_statusSortKey||"default",i=window.att_statusSortOrder||"asc";o!=="default"&&r.sort((b,y)=>{var x,v;let g,p;if(o==="name")g=b.name||b.email.split("@")[0],p=y.name||y.email.split("@")[0];else if(o==="group")if(a){const h=at.filter(L=>L.user_email===b.email).map(L=>L.group_id);g=Fe.filter(L=>h.includes(L.id)).map(L=>L.name).join(", ")||"-";const $=at.filter(L=>L.user_email===y.email).map(L=>L.group_id);p=Fe.filter(L=>$.includes(L.id)).map(L=>L.name).join(", ")||"-"}else g=((x=Ct.find(h=>h.id===b.attribute_id))==null?void 0:x.name)||"-",p=((v=Ct.find(h=>h.id===y.attribute_id))==null?void 0:v.name)||"-";else if(o==="status"){const h=$=>{const L=Ee.find(I=>I.event_id===t.id&&I.user_email===$.email),E=(L==null?void 0:L.status)||"未回答";return E==="出席"?1:E==="保留"||E==="未定"?2:E==="未回答"?3:E==="欠席"?4:5};g=h(b),p=h(y)}else if(o==="comment"){const h=$=>{const L=Ee.find(k=>k.event_id===t.id&&k.user_email===$.email);if(!L||!L.status||L.status==="未回答")return"";let E=L.comment||"",I="否";E.startsWith("[荷物車:可]")?(I="可",E=E.substring(8)):E.startsWith("[荷物車:否]")&&(I="否",E=E.substring(8));let w=[];return t.require_detailed_attendance&&(L.accompanying_persons&&w.push(`同伴: ${L.accompanying_persons}`),L.car_capacity&&L.car_capacity>0&&(w.push(`車出: 可[${L.car_capacity}人]`),w.push(`荷物車: ${I}`))),E.trim()&&w.push(`メモ: ${E.trim()}`),w.join(", ")};g=h(b),p=h(y)}else if(o==="updated_at"){const h=Ee.find(L=>L.event_id===t.id&&L.user_email===b.email),$=Ee.find(L=>L.event_id===t.id&&L.user_email===y.email);g=h?new Date(h.updated_at).getTime():0,p=$?new Date($.updated_at).getTime():0}return g<p?i==="asc"?-1:1:g>p?i==="asc"?1:-1:0});const l=[["名前",a?"グループ":"属性","出欠ステータス","同伴者","車出し可否","乗車人数","荷物車対応","コメント","更新日時"]];r.forEach(b=>{var w;const y=b.name||b.email.split("@")[0];let g="-";if(a){const k=at.filter(_=>_.user_email===b.email).map(_=>_.group_id);g=Fe.filter(_=>k.includes(_.id)).map(_=>_.name).join(", ")||"-"}else g=((w=Ct.find(k=>k.id===b.attribute_id))==null?void 0:w.name)||"-";const p=Ee.find(k=>k.event_id===t.id&&k.user_email===b.email);let x=(p==null?void 0:p.status)||"未回答";x==="未定"&&(x="保留");let v=(p==null?void 0:p.comment)||"",h="否";v.startsWith("[荷物車:可]")?(h="可",v=v.substring(8)):v.startsWith("[荷物車:否]")&&(h="否",v=v.substring(8));const $=(p==null?void 0:p.accompanying_persons)||"",L=(p==null?void 0:p.car_capacity)||0,E=L>0?"可":"否",I=p?Us(p.updated_at):"-";l.push([y,g,x,$,E,L,h,v,I])});const c=l.map(b=>b.map(window.escapeCSV).join(",")).join(`
`),m=new Blob([new Uint8Array([239,187,191]),c],{type:"text/csv;charset=utf-8;"}),u=document.createElement("a"),f=t.title.replace(/[\/\\?%*:|"<>]/g,"_");u.href=URL.createObjectURL(m),u.setAttribute("download",`参加者リスト_${f}_${window.att_statusFilter}.csv`),document.body.removeChild(u)};function ya(e){if(!e||isNaN(e.getTime()))return"";const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0"),s=String(e.getHours()).padStart(2,"0"),r=String(e.getMinutes()).padStart(2,"0");return`${t}-${n}-${a}T${s}:${r}`}function to(e){const t=e.split(/\r?\n/),n=[];let a=null,s=!1;const r=[];for(let o of t)o.startsWith(" ")||o.startsWith("	")?r.length>0&&(r[r.length-1]+=o.substring(1)):r.push(o);for(let o of r){const i=o.trim();if(i){if(i==="BEGIN:VEVENT")a={title:"",description:"",location:"",start:null,end:null,isAllDay:!1},s=!0;else if(i==="END:VEVENT")a&&n.push(a),s=!1,a=null;else if(s&&a){const d=i.indexOf(":");if(d===-1)continue;const l=i.substring(0,d),c=i.substring(d+1),m=l.split(";")[0],u=l.split(";").slice(1);if(m==="SUMMARY")a.title=ha(c);else if(m==="DESCRIPTION")a.description=ha(c);else if(m==="LOCATION")a.location=ha(c);else if(m==="DTSTART"){const f=u.some(b=>b.toUpperCase()==="VALUE=DATE");a.start=xs(c,f),f&&(a.isAllDay=!0)}else if(m==="DTEND"){const f=u.some(b=>b.toUpperCase()==="VALUE=DATE");a.end=xs(c,f)}}}}return n}function ha(e){return e.replace(/\\n/g,`
`).replace(/\\r/g,"\r").replace(/\\t/g,"	").replace(/\\,/g,",").replace(/\\;/g,";").replace(/\\\\/g,"\\")}function xs(e,t){if(!e)return null;const n=parseInt(e.substring(0,4)),a=parseInt(e.substring(4,6))-1,s=parseInt(e.substring(6,8));if(t||e.indexOf("T")===-1)return new Date(n,a,s);const r=e.indexOf("T"),o=parseInt(e.substring(r+1,r+3)),i=parseInt(e.substring(r+3,r+5)),d=parseInt(e.substring(r+5,r+7))||0;return e.endsWith("Z")?new Date(Date.UTC(n,a,s,o,i,d)):new Date(n,a,s,o,i,d)}async function no(e){const t=e.target.files[0];if(!t)return;U("ICSファイルを解析中...");const n=new FileReader;n.onload=async a=>{try{const s=a.target.result,r=to(s);if(F(),r.length===0){alert("ICSファイルから有効な予定が見つかりませんでした。");return}ao(r)}catch(s){console.error(s),alert("ICSファイルの解析に失敗しました: "+s.message),F()}},n.readAsText(t),e.target.value=""}function ao(e){const t=document.getElementById("ics-import-list");if(!t)return;const n=document.getElementById("ics-import-count");n&&(n.textContent=e.length),t.innerHTML=e.map((r,o)=>{var y,g;const i=r.title||"",d=i.toLowerCase();let l=((y=De[0])==null?void 0:y.name)||"練習";for(let p of De)if(d.includes(p.name)){l=p.name;break}l===((g=De[0])==null?void 0:g.name)&&(d.includes("試合")||d.includes("vs")||d.includes("戦")?De.find(x=>x.name==="試合")&&(l="試合"):(d.includes("イベント")||d.includes("会")||d.includes("式")||d.includes("フェス"))&&De.find(x=>x.name==="イベント")&&(l="イベント"));let c="";if(r.location){const p=Ot.find(x=>x.name===r.location);p?c=p.name:c="custom"}const m=ya(r.start),u=ya(r.end||(r.start?new Date(r.start.getTime()+2*60*60*1e3):null));let f=r.start?new Date(r.start.getTime()-3*24*60*60*1e3):null;f&&f.setHours(12,0,0,0);const b=ya(f);return`
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
                                ${De.map(p=>`<option value="${p.name}" ${p.name===l?"selected":""}>${p.name}</option>`).join("")}
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">場所</label>
                            <div class="flex gap-2">
                                <select class="ics-row-location-select w-1/2 border p-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500">
                                    <option value="">(登録場所から選択...)</option>
                                    ${Ot.map(p=>`<option value="${p.name}" ${p.name===c?"selected":""}>${p.name}</option>`).join("")}
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
                            <input type="datetime-local" class="ics-row-start w-full border p-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500" value="${m}">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">終了日時</label>
                            <input type="datetime-local" class="ics-row-end w-full border p-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500" value="${u}">
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
                            ${Fe.map(p=>`
                                <label class="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 cursor-pointer select-none mr-2">
                                    <input type="checkbox" class="ics-row-group-cb h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" value="${p.id}">
                                    <span>${p.name}</span>
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
        `}).join("");const a=document.getElementById("ics-select-all");a&&(a.checked=!0,a.onclick=r=>{document.querySelectorAll(".ics-row-select").forEach(o=>o.checked=r.target.checked)});const s=document.getElementById("ics-import-modal");s&&s.classList.remove("hidden")}function Sa(){var e;(e=document.getElementById("ics-import-modal"))==null||e.classList.add("hidden")}async function so(){const e=document.querySelectorAll(".ics-row"),t=[];if(e.forEach(n=>{var g,p,x,v,h,$,L,E,I,w;const a=n.querySelector(".ics-row-select");if(!a||!a.checked)return;const s=((g=n.querySelector(".ics-row-title"))==null?void 0:g.value)||"";if(!s)return;const r=((p=n.querySelector(".ics-row-category"))==null?void 0:p.value)||"",o=((x=n.querySelector(".ics-row-location"))==null?void 0:x.value)||"",i=((v=n.querySelector(".ics-row-start"))==null?void 0:v.value)||"",d=((h=n.querySelector(".ics-row-end"))==null?void 0:h.value)||"",l=(($=n.querySelector(".ics-row-allday"))==null?void 0:$.checked)||!1,c=[];n.querySelectorAll(".ics-row-group-cb:checked").forEach(k=>{c.push(k.value)});const m=((L=n.querySelector(".ics-row-req-att"))==null?void 0:L.checked)||!1,u=((E=n.querySelector(".ics-row-req-det"))==null?void 0:E.checked)||!1,f=((I=n.querySelector(".ics-row-deadline"))==null?void 0:I.value)||"",b=((w=n.querySelector(".ics-row-description"))==null?void 0:w.value)||"",y=k=>k?new Date(k).toISOString():null;t.push({title:s,category:r,location:o,start_time:y(i),end_time:y(d),is_all_day:l,target_group_ids:c.length>0?c:null,requires_attendance:m,require_detailed_attendance:m?u:!1,attendance_deadline:m?y(f):null,description:b,created_by:G==null?void 0:G.email})}),t.length===0){alert("登録対象の予定が選択されていません。");return}U("予定データを登録中...");try{const{error:n}=await B.from("events").insert(t);if(n)throw n;await X("IMPORT_ICS_EVENTS",`${t.length}件の予定をICSファイルから一括登録しました`),alert(`${t.length}件の予定を登録しました。`),Sa(),await tn(),qe(),document.getElementById("list-container").classList.contains("hidden")||kt()}catch(n){console.error(n),alert("予定の登録に失敗しました: "+n.message)}finally{F()}}const ro="modulepreload",oo=function(e){return"/"+e},vs={},io=function(t,n,a){let s=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),i=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));s=Promise.allSettled(n.map(d=>{if(d=oo(d),d in vs)return;vs[d]=!0;const l=d.endsWith(".css"),c=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${c}`))return;const m=document.createElement("link");if(m.rel=l?"stylesheet":ro,l||(m.as="script"),m.crossOrigin="",m.href=d,i&&m.setAttribute("nonce",i),document.head.appendChild(m),l)return new Promise((u,f)=>{m.addEventListener("load",u),m.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(o){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=o,window.dispatchEvent(i),!i.defaultPrevented)throw o}return s.then(o=>{for(const i of o||[])i.status==="rejected"&&r(i.reason);return t().catch(r)})};let ws=!1,Ks=[],Ys=[],Qs=[],ot=[],xe={homeTeamNames:["ありんこアントス@A軍"],defaultFilterDate:{from:"",to:"",teamRegex:"",category:"",outcome:"all"}},Es=!1,yn={},At={},xa={},va={},Ta={batter:[],pitcher:[]},Vt={batter:{key:"ops",order:"desc"},pitcher:{key:"era",order:"asc"}},an={batter:{key:"ops",order:"desc"},pitcher:{key:"era",order:"asc"}},yt=null,gt={};async function Ca(){ws||(co(),ws=!0);const e=document.querySelector('button[data-tab="import-data"]');e&&(he==="admin"?e.classList.remove("hidden"):e.classList.add("hidden")),await Zs()}function lo(e){const t=[];let n=[],a="",s=!1;for(let r=0;r<e.length;r++){const o=e[r];s?o==='"'?r+1<e.length&&e[r+1]==='"'?(a+='"',r++):s=!1:a+=o:o==='"'?s=!0:o===","?(n.push(a),a=""):o===`
`||o==="\r"?(n.push(a),t.push(n),n=[],a="",o==="\r"&&r+1<e.length&&e[r+1]===`
`&&r++):a+=o}return(a||n.length>0)&&(n.push(a),t.push(n)),t}function co(){var t,n,a,s,r,o,i,d,l,c,m;let e=document.getElementById("dashboard-view");e||(e=document.createElement("div"),e.id="dashboard-view",e.className="hidden p-4 max-w-4xl mx-auto",e.innerHTML=`
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
                <button data-tab="detail-analysis" class="px-4 py-2 font-bold text-gray-500 border-b-2 border-transparent hover:text-gray-700 whitespace-nowrap transition-colors">詳細分析（工事中）</button>
            </div>
            
            <div id="tab-content-team-summary">
                <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-6 text-sm">
                    <div class="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                        <div class="flex items-center space-x-2">
                            <span class="p-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-black">🔍</span>
                            <h3 class="font-bold text-gray-800 text-sm">チーム成績 絞り込みフィルタ</h3>
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
                                リセット
                            </button>
                        </div>
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
                                <th class="p-2 cursor-pointer hover:bg-gray-200 select-none" data-sort="slg" data-role="batter">長打率<span></span></th>
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

            <div id="tab-content-detail-analysis" class="hidden bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 class="text-lg font-bold mb-4 border-b pb-2">詳細分析</h3>
                <p class="text-sm text-gray-600 mb-4">
                    scorer_data.txt などの詳細なスコアデータを読み込んで、より細かい打席結果や投球・守備イベントの分析を行います。
                </p>
                <div class="space-y-4 border p-4 rounded bg-gray-50">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">scorer_data.txt ファイルを選択</label>
                        <input type="file" id="detail-analysis-file" accept=".txt,.json" class="w-full border p-1.5 rounded bg-white">
                    </div>
                    <button id="btn-load-detail-data" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow font-bold disabled:bg-gray-400">
                        データを読み込む
                    </button>
                </div>
                
                <div id="detail-analysis-result" class="mt-6 space-y-4 hidden">
                    <div class="bg-green-50 border border-green-200 text-green-800 p-4 rounded font-bold text-sm">
                        ✅ データの読み込みに成功しました！
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="bg-gray-100 p-3 rounded text-center">
                            <div class="text-gray-500 text-xs font-bold">成績記録(cat)数</div>
                            <div class="text-xl font-bold text-gray-800" id="detail-stats-cat-count">0</div>
                        </div>
                        <div class="bg-gray-100 p-3 rounded text-center">
                            <div class="text-gray-500 text-xs font-bold">システム設定(sys)数</div>
                            <div class="text-xl font-bold text-gray-800" id="detail-stats-sys-count">0</div>
                        </div>
                        <div class="bg-gray-100 p-3 rounded text-center">
                            <div class="text-gray-500 text-xs font-bold">試合詳細ログ(sysdata23)</div>
                            <div class="text-xl font-bold text-gray-800" id="detail-stats-has-pcl">-</div>
                        </div>
                        <div class="bg-gray-100 p-3 rounded text-center">
                            <div class="text-gray-500 text-xs font-bold">グラウンド数</div>
                            <div class="text-xl font-bold text-gray-800" id="detail-stats-ground-count">0</div>
                        </div>
                    </div>
                    
                    <div class="bg-blue-50 border border-blue-200 p-4 rounded text-sm text-blue-900">
                        <h4 class="font-bold mb-2 text-base">📊 詳細データから分析可能な項目</h4>
                        <ul class="list-disc pl-5 space-y-1" id="detail-analysis-suggestions">
                            <!-- 提案事項がここに表示される -->
                        </ul>
                    </div>
                </div>

                <div id="detail-analysis-dashboard" class="mt-8 space-y-6 hidden">
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
        `,(t=document.getElementById("app-view"))==null||t.parentNode.appendChild(e),document.getElementById("btn-back-to-menu-dash").addEventListener("click",()=>{io(()=>Promise.resolve().then(()=>Qd),void 0).then(u=>u.switchAuthScreen("app-menu-view"))}),document.getElementById("btn-exec-csv-import").addEventListener("click",Io),(n=document.getElementById("btn-load-detail-data"))==null||n.addEventListener("click",$o),document.querySelectorAll("#dashboard-tabs button").forEach(u=>{u.addEventListener("click",f=>{document.querySelectorAll("#dashboard-tabs button").forEach(y=>{y.classList.remove("text-blue-600","border-blue-600"),y.classList.add("text-gray-500","border-transparent")}),["team-summary","personal-summary","ranking","comparison","test-mode","settings","import-data","detail-analysis"].forEach(y=>{var g;return(g=document.getElementById(`tab-content-${y}`))==null?void 0:g.classList.add("hidden")});const b=f.currentTarget;b.classList.remove("text-gray-500","border-transparent"),b.classList.add("text-blue-600","border-blue-600"),document.getElementById(`tab-content-${b.dataset.tab}`).classList.remove("hidden")})}),document.querySelectorAll("button[data-ranking-tab]").forEach(u=>{u.addEventListener("click",f=>{document.querySelectorAll("button[data-ranking-tab]").forEach(y=>{y.classList.remove("text-blue-600","border-blue-600"),y.classList.add("text-gray-500","border-transparent")}),["batter","pitcher"].forEach(y=>document.getElementById(`ranking-content-${y}`).classList.add("hidden"));const b=f.currentTarget;b.classList.remove("text-gray-500","border-transparent"),b.classList.add("text-blue-600","border-blue-600"),document.getElementById(`ranking-content-${b.dataset.rankingTab}`).classList.remove("hidden")})}),document.querySelectorAll("#tab-content-ranking th[data-sort]").forEach(u=>{u.addEventListener("click",f=>{const b=f.currentTarget.dataset.role,y=f.currentTarget.dataset.sort;Eo(b,y)})}),document.getElementById("btn-apply-dashboard-filter").addEventListener("click",Tt),(a=document.getElementById("db-filter-outcome"))==null||a.addEventListener("change",Tt),(s=document.getElementById("db-filter-first-score"))==null||s.addEventListener("change",Tt),document.getElementById("btn-clear-dashboard-filter").addEventListener("click",()=>{document.getElementById("db-filter-date-from").value=xe.defaultFilterDate.from||"",document.getElementById("db-filter-date-to").value=xe.defaultFilterDate.to||"",document.getElementById("db-filter-team-regex").value=xe.defaultFilterDate.teamRegex||"",document.getElementById("db-filter-category").value=xe.defaultFilterDate.category||"";const u=document.getElementById("db-filter-outcome");u&&(u.value=xe.defaultFilterDate.outcome||"all");const f=document.getElementById("db-filter-first-score");f&&(f.value=xe.defaultFilterDate.firstScore||"all"),Tt()}),["ps-mode","ps-player","ps-role","ps-limit-games","ps-ma-unit","ps-ma-window"].forEach(u=>{var f;return(f=document.getElementById(u))==null?void 0:f.addEventListener("change",()=>{var p,x,v;const b=(p=document.getElementById("ps-ma-unit"))==null?void 0:p.value,y=document.getElementById("ps-ma-window-label");y&&(y.textContent=b==="ab"?"打数/登板":"試合");const g=((x=document.getElementById("ps-mode"))==null?void 0:x.value)==="single";(v=document.getElementById("ps-player-select-wrap"))==null||v.classList.toggle("hidden",!g),Ya()})}),(r=document.getElementById("btn-export-ps-csv"))==null||r.addEventListener("click",vo),(o=document.getElementById("btn-print-ps"))==null||o.addEventListener("click",()=>window.print()),["tm-role","tm-window"].forEach(u=>{var f;return(f=document.getElementById(u))==null?void 0:f.addEventListener("change",Na)}),(i=document.getElementById("tm-players-list"))==null||i.addEventListener("change",Na),(d=document.getElementById("comp-players-list"))==null||d.addEventListener("change",Da),(l=document.getElementById("comp-role"))==null||l.addEventListener("change",u=>{Da()}),(c=document.getElementById("btn-add-home-team"))==null||c.addEventListener("click",_o),(m=document.getElementById("btn-save-default-date"))==null||m.addEventListener("click",async()=>{const u=document.getElementById("setting-default-date-from").value,f=document.getElementById("setting-default-date-to").value,b=document.getElementById("setting-default-team-regex").value.trim(),y=document.getElementById("setting-default-category").value.trim(),g={from:u,to:f,teamRegex:b,category:y};if(localStorage.setItem("ants_defaultFilterDate",JSON.stringify(g)),he==="admin"){U("デフォルトのフィルタ設定を保存中 (DB同期)...");try{const{error:$}=await B.from("dashboard_settings").upsert({key:"defaultFilterDate",value:g},{onConflict:"key"});if($)throw $;alert("デフォルトのフィルタ設定を保存し、DBと同期しました。")}catch($){console.error("Supabase sync failed",$),alert("DBへの同期に失敗しましたが、このブラウザには保存されました: "+$.message)}finally{F()}}else alert("デフォルトのフィルタ設定をこのブラウザに保存しました。");xe.defaultFilterDate=g;const p=document.getElementById("db-filter-date-from"),x=document.getElementById("db-filter-date-to"),v=document.getElementById("db-filter-team-regex"),h=document.getElementById("db-filter-category");p&&(p.value=u),x&&(x.value=f),v&&(v.value=b),h&&(h.value=y),Tt()}))}async function Zs(){U("成績データを読み込み中...");try{const[{data:e,error:t},{data:n,error:a},{data:s,error:r},{data:o,error:i},{data:d,error:l}]=await Promise.all([B.from("games").select("*").order("date",{ascending:!0}),B.from("batter_stats").select("*"),B.from("pitcher_stats").select("*"),B.from("players").select("*"),B.from("dashboard_settings").select("*")]);if(t)throw t;if(a)throw a;if(r)throw r;Ks=e||[],Ys=n||[],Qs=s||[],ot=o||[];let c=["ありんこアントス@A軍"],m={from:"",to:"",teamRegex:"",category:"",outcome:"all"};if(d){const b=d.find(g=>g.key==="homeTeamNames");b&&b.value!==null&&b.value!==void 0&&(c=b.value);const y=d.find(g=>g.key==="defaultFilterDate");y&&y.value&&(m={from:y.value.from||"",to:y.value.to||"",teamRegex:y.value.teamRegex||"",category:y.value.category||"",outcome:y.value.outcome||"all"})}const u=localStorage.getItem("ants_homeTeamNames");if(u)try{c=JSON.parse(u)}catch(b){console.error("Failed to parse local homeTeamNames",b)}const f=localStorage.getItem("ants_defaultFilterDate");if(f)try{m=JSON.parse(f)}catch(b){console.error("Failed to parse local defaultFilterDate",b)}xe.homeTeamNames=c,xe.defaultFilterDate=m,Qa(),document.getElementById("setting-default-date-from").value=xe.defaultFilterDate.from||"",document.getElementById("setting-default-date-to").value=xe.defaultFilterDate.to||"",document.getElementById("setting-default-team-regex").value=xe.defaultFilterDate.teamRegex||"",document.getElementById("setting-default-category").value=xe.defaultFilterDate.category||"",Es||(document.getElementById("btn-clear-dashboard-filter").click(),Es=!0),Tt()}catch(e){console.error(e),alert("成績データの取得に失敗しました: "+e.message)}finally{F()}}function ut(e){if(!e)return!1;const t=e.trim();return t==="ありんこ"||t==="アントス"?!1:xe.homeTeamNames.some(n=>{if(!n)return!1;const a=n.replace(/@.*$/,"").trim(),s=e.replace(/@.*$/,"").trim();try{if(new RegExp(n,"i").test(e)||new RegExp(a,"i").test(s))return!0}catch{}return e.includes(n)||n.includes(e)||a&&s&&(s.includes(a)||a.includes(s))})}function Ka(e){const t=ut(e.team_first);let n=0,a=0;if(e.score&&typeof e.score=="string"){const o=e.score.match(/\d+/g);if(o&&o.length>=2){const i=parseInt(o[0],10),d=parseInt(o[1],10);return t?(n=i,a=d):(n=d,a=i),{tr:n,or:a,isAntsFirst:t}}}const s=parseInt(e.runs_first??e.score_first??0,10)||0,r=parseInt(e.runs_second??e.score_second??0,10)||0;return t?(n=s,a=r):(n=r,a=s),{tr:n,or:a,isAntsFirst:t}}function uo(e){const t=ut(e.team_first);if(e.first_score_team)return ut(e.first_score_team)?"scored":"conceded";if(e.first_scored!==void 0&&e.first_scored!==null){if(e.first_scored==="home"||e.first_scored===!0||e.first_scored===1)return"scored";if(e.first_scored==="opp"||e.first_scored===!1||e.first_scored===0)return"conceded"}const n=e.inning_scores||e.score_detail||e.innings;if(n&&typeof n=="string"&&n.includes("|")){const[r,o]=n.split("|"),i=r.split(/[,-]/).map(c=>parseInt(c.trim(),10)||0),d=o.split(/[,-]/).map(c=>parseInt(c.trim(),10)||0),l=Math.max(i.length,d.length);for(let c=0;c<l;c++){const m=i[c]||0,u=d[c]||0;if(m>0&&u===0)return t?"scored":"conceded";if(u>0&&m===0)return t?"conceded":"scored";if(m>0&&u>0)return t?"scored":"conceded"}}const{tr:a,or:s}=Ka(e);return a===0&&s===0?"unknown":a>0&&s===0?"scored":s>0&&a===0?"conceded":t?a>0?"scored":"conceded":s>0?"conceded":"scored"}let fn={games:[],bStats:[],pStats:[]};function Tt(){var p,x;const e=document.getElementById("db-filter-date-from").value,t=document.getElementById("db-filter-date-to").value,n=document.getElementById("db-filter-team-regex").value,a=document.getElementById("db-filter-category").value,s=((p=document.getElementById("db-filter-outcome"))==null?void 0:p.value)||"all",r=((x=document.getElementById("db-filter-first-score"))==null?void 0:x.value)||"all";let o=null;if(n)try{o=new RegExp(n,"i")}catch{}const i=a?a.split(",").map(v=>v.trim()).filter(v=>v):[],d=Ks.filter(v=>{const h=(v.team_first||"").trim(),$=(v.team_second||"").trim(),L=(v.title||"")+(v.category||"");if(h==="ありんこ"||h==="アントス"||$==="ありんこ"||$==="アントス"||L.includes("紅白")||h.includes("紅白")||$.includes("紅白"))return!1;const E=ut(v.team_first),I=ut(v.team_second);if(E&&I||!E&&!I)return!1;const w=v.date?v.date.split("T")[0]:"";if(e&&w<e||t&&w>t||i.length>0&&!i.includes(v.category))return!1;if(o){const k=o.test(v.team_first),_=o.test(v.team_second);if(!k&&!_)return!1}if(s!=="all"){const{tr:k,or:_}=Ka(v);if(s==="win"&&k<=_||s==="loss"&&k>=_||s==="draw"&&k!==_)return!1}if(r!=="all"){const k=uo(v);if(r==="scored"&&k!=="scored"||r==="conceded"&&k!=="conceded")return!1}return!0}),l=new Set(d.map(v=>v.id)),c=Ys.filter(v=>l.has(v.game_id)),m=Qs.filter(v=>l.has(v.game_id));fn={games:d,bStats:c,pStats:m};const u=new Set;c.forEach(v=>u.add(v.player_id)),m.forEach(v=>u.add(v.player_id));const f=ot.filter(v=>u.has(v.id)).sort((v,h)=>v.name.localeCompare(h.name)),b=document.getElementById("ps-player");if(b){const v=b.value;b.innerHTML=f.map(h=>`<option value="${h.id}">${h.name}</option>`).join(""),v&&u.has(parseInt(v))&&(b.value=v)}const y=document.getElementById("comp-players-list");if(y){const v=new Set(Array.from(document.querySelectorAll(".comp-player-cb:checked")).map(h=>h.value));y.innerHTML=f.map(h=>`<label class="flex items-center space-x-1 cursor-pointer"><input type="checkbox" value="${h.id}" class="comp-player-cb rounded text-blue-600" ${v.has(String(h.id))?"checked":""}><span>${h.name}</span></label>`).join("")}const g=document.getElementById("tm-players-list");if(g){const v=new Set(Array.from(document.querySelectorAll(".tm-player-cb:checked")).map(h=>h.value));g.innerHTML=f.map(h=>`<label class="flex items-center space-x-1 cursor-pointer"><input type="checkbox" value="${h.id}" class="tm-player-cb rounded text-blue-600" ${v.has(String(h.id))?"checked":""}><span>${h.name}</span></label>`).join("")}mo(d,c,m),wo(),Ya(),Da(),Na()}function mo(e,t,n){document.getElementById("summary-games").textContent=e.length;const a=t.reduce((c,m)=>c+(m.at_bats||0),0),s=t.reduce((c,m)=>c+(m.hits||0),0),r=a>0?(s/a).toFixed(3).replace(/^0/,""):".000";document.getElementById("summary-avg").textContent=r;const o=t.reduce((c,m)=>c+(m.runs||0),0);document.getElementById("summary-runs").textContent=o;const i=n.reduce((c,m)=>c+(m.earned_runs||0),0),d=n.reduce((c,m)=>c+(m.outs||0),0),l=d>0?(i*7/(d/3)).toFixed(2):"0.00";document.getElementById("summary-era").textContent=l,po(e,t,n)}let _s=!1;function kn(){return _s||window.Chart?Promise.resolve():new Promise((e,t)=>{const n=document.createElement("script");n.src="https://cdn.jsdelivr.net/npm/chart.js",n.onload=()=>{_s=!0,e()},n.onerror=t,document.head.appendChild(n)})}async function po(e,t,n){await kn(),Object.values(yn).forEach(I=>I.destroy()),yn={};const a={};e.forEach(I=>{const w=I.date?I.date.split("T")[0]:"";if(!w)return;const k=w.substring(0,7);a[k]||(a[k]={atBats:0,hits:0,runs:0,strikeOuts:0,hitsAllowed:0,walksAllowed:0,strikes:0,pitchCount:0,earnedRuns:0,outs:0})}),t.forEach(I=>{const w=e.find(_=>_.id===I.game_id);if(!w||!w.date)return;const k=w.date.split("T")[0].substring(0,7);a[k]&&(a[k].atBats+=I.at_bats||0,a[k].hits+=I.hits||0,a[k].runs+=I.runs||0)}),n.forEach(I=>{const w=e.find(_=>_.id===I.game_id);if(!w||!w.date)return;const k=w.date.split("T")[0].substring(0,7);a[k]&&(a[k].strikeOuts+=I.strike_outs||0,a[k].hitsAllowed+=I.hits_allowed||0,a[k].walksAllowed+=I.walks_allowed||0,a[k].strikes+=I.strikes||0,a[k].pitchCount+=I.pitch_count||0,a[k].earnedRuns+=I.earned_runs||0,a[k].outs+=I.outs||0)});const s=Object.keys(a).sort();let r=0,o=0,i=0,d=0;const l=[],c=[],m=[],u=[],f=[],b=[],y=[],g=[];s.forEach(I=>{r+=a[I].atBats,o+=a[I].hits,l.push(r>0?o/r:0),c.push(a[I].runs),m.push(a[I].strikeOuts),u.push(a[I].hitsAllowed),f.push(a[I].walksAllowed),b.push(a[I].pitchCount>0?(a[I].strikes/a[I].pitchCount*100).toFixed(1):0);const w=a[I].earnedRuns,_=a[I].outs/3;g.push(_>0?w*7/_:0),i+=a[I].earnedRuns,d+=a[I].outs;const A=d/3;y.push(A>0?i*7/A:0)}),yn.batting=new window.Chart(document.getElementById("chart-batting-monthly").getContext("2d"),{type:"bar",data:{labels:s,datasets:[{label:"月間得点",type:"bar",data:c,backgroundColor:"rgba(75, 192, 192, 0.6)",yAxisID:"y"},{label:"累積打率",type:"line",data:l,borderColor:"rgba(255, 99, 132, 1)",yAxisID:"y1"}]},options:{responsive:!0,scales:{y:{position:"left",beginAtZero:!0},y1:{position:"right",beginAtZero:!0,min:0,max:1}}}}),yn.pitching=new window.Chart(document.getElementById("chart-pitching-monthly").getContext("2d"),{type:"bar",data:{labels:s,datasets:[{label:"奪三振",data:m,backgroundColor:"rgba(54, 162, 235, 0.6)"},{label:"被安打",data:u,backgroundColor:"rgba(255, 159, 64, 0.6)"},{label:"与四死球",data:f,backgroundColor:"rgba(255, 205, 86, 0.6)"},{label:"S率(%)",type:"line",data:b,borderColor:"rgba(153, 102, 255, 1)",yAxisID:"y1"},{label:"累積防御率",type:"line",data:y,borderColor:"rgba(255, 99, 132, 1)",yAxisID:"y2"},{label:"月別防御率",type:"line",data:g,borderColor:"rgba(75, 192, 192, 1)",borderDash:[5,5],yAxisID:"y2"}]},options:{responsive:!0,scales:{y:{position:"left",beginAtZero:!0},y1:{position:"right",beginAtZero:!0,min:0,max:100,grid:{drawOnChartArea:!1}},y2:{position:"right",beginAtZero:!0,grid:{drawOnChartArea:!1}}}}});const p=[],x=[],v=[],h=[],$=[];let L=0,E=0;e.forEach((I,w)=>{const k=I.date?I.date.split("T")[0]:"",{tr:_,or:A,isAntsFirst:P}=Ka(I),D=P?I.team_first:I.team_second,O=P?I.team_second:I.team_first,q=I.title||I.category||"試合";$.push({date:k,title:q,myTeam:D||"自チーム",oppTeam:O||"相手チーム",tr:_,or:A,isAntsFirst:P}),x.push(_),v.push(-A),_>A&&L++,E++,h.push(E>0?(L/E*100).toFixed(1):0),p.push([k?k.substring(5):`G${w+1}`,O||""])}),yn.games=new window.Chart(document.getElementById("chart-games-wl").getContext("2d"),{type:"bar",data:{labels:p,datasets:[{label:"得点",data:x,backgroundColor:"rgba(75, 192, 192, 0.8)"},{label:"失点",data:v,backgroundColor:"rgba(255, 99, 132, 0.8)"},{label:"累積勝率(%)",type:"line",data:h,borderColor:"rgba(255, 205, 86, 1)",yAxisID:"y1"}]},options:{responsive:!0,plugins:{tooltip:{callbacks:{title:function(I){if(!I.length)return"";const w=I[0].dataIndex,k=$[w];return k?`${k.date} 【${k.title}】
${k.myTeam} vs ${k.oppTeam}`:""},label:function(I){const w=I.dataIndex,k=$[w],_=I.dataset.label||"";return _==="得点"?`得点 (${(k==null?void 0:k.myTeam)||"自チーム"}): ${I.raw} 点`:_==="失点"?`失点 (${(k==null?void 0:k.oppTeam)||"相手チーム"}): ${Math.abs(I.raw)} 点`:_==="累積勝率(%)"?`累積勝率: ${I.raw} %`:`${_}: ${I.raw}`}}}},scales:{x:{stacked:!0,ticks:{font:{size:10}}},y:{stacked:!0,position:"left"},y1:{position:"right",beginAtZero:!0,min:0,max:100}}}})}function It(e){let t=0,n=0,a=0,s=0,r=0,o=0,i=0,d=0,l=0,c=0,m=0,u=0,f=0,b=0,y=0;e.forEach(E=>{const I=E.plate_appearances||0,w=E.at_bats||0,k=E.hits||0,_=E.doubles||0,A=E.triples||0,P=E.home_runs||0,D=E.walks||0,O=E.hit_by_pitch||0,q=E.strike_outs||E.strikeouts||0,S=E.sacrifice_flies||E.sac_flies||0,C=E.sacrifice_hits||E.sac_bunts||0,N=E.runs_batted_in||0,T=E.runs||0,M=E.stolen_bases||0;t+=I,n+=w,a+=k,u+=_,f+=A,m+=P,d+=D,l+=O,c+=q,b+=S,y+=C,r+=N,o+=T,i+=M;const j=(E.singles!==void 0?E.singles:Math.max(0,k-_-A-P))*1+_*2+A*3+P*4,H=E.total_bases&&E.total_bases>j?E.total_bases:j;s+=H});const g=n>0?a/n:0,p=n+d+l+b,x=p>0?(a+d+l)/p:t>0?(a+d+l)/t:0,v=n>0?s/n:0,h=x+v,$=a+d+l,L=$>0?o/$:0;return{pa:t,ab:n,h:a,doubles:u,triples:f,hr:m,tb:s,sf:b,sh:y,bb:d,hbp:l,rbi:r,r:o,sb:i,so:c,ob:$,avg:g,obp:x,slg:v,ops:h,runRate:L,avgStr:g.toFixed(3).replace(/^0/,""),obpStr:x.toFixed(3).replace(/^0/,""),slgStr:v.toFixed(3).replace(/^0/,""),opsStr:h.toFixed(3),runRateStr:$>0?(L*100).toFixed(1)+"%":"0.0%",bbRate:t>0?(d+l)/t:0,soRate:t>0?c/t:0}}function $t(e){let t=0,n=0,a=0,s=0,r=0,o=0,i=0,d=0,l=0,c=0;e.forEach(g=>{t+=g.outs||0,n+=g.earned_runs||0,a+=g.hits_allowed||0,s+=(g.walks_allowed||0)+(g.hit_batters||0),r+=g.strike_outs||0,o+=g.batters_faced||0,i+=g.pitch_count||0,d+=g.strikes||0,l+=g.wins||0,c+=g.losses||0});const m=t/3,u=m>0?n*7/m:0,f=m>0?(a+s)/m:0,b=m>0?r*7/m:0,y=m>0?s*7/m:0;return{outs:t,er:n,h:a,bb:s,so:r,bf:o,pc:i,st:d,wins:l,losses:c,era:u,whip:f,k7:b,bb7:y,eraStr:u.toFixed(2),whipStr:f.toFixed(2),k7Str:b.toFixed(2),bb7Str:y.toFixed(2),kRate:o>0?r/o:0,bbRate:o>0?s/o:0,kbb:s>0?r/s:r>0?99.9:0,sRate:i>0?d/i:0}}async function Ya(){var d,l,c,m,u,f;await kn();const e=((d=document.getElementById("ps-mode"))==null?void 0:d.value)||"single",t=(l=document.getElementById("ps-player"))==null?void 0:l.value,n=((c=document.getElementById("ps-role"))==null?void 0:c.value)||"batter",a=((m=document.getElementById("ps-limit-games"))==null?void 0:m.value)||"5",s=((u=document.getElementById("ps-ma-unit"))==null?void 0:u.value)||"ab",r=parseInt(((f=document.getElementById("ps-ma-window"))==null?void 0:f.value)||"10",10),o=document.getElementById("ps-single-container"),i=document.getElementById("ps-all-container");e==="single"?(o==null||o.classList.remove("hidden"),i==null||i.classList.add("hidden"),t&&go(t,n,a,s,r)):(o==null||o.classList.add("hidden"),i==null||i.classList.remove("hidden"),xo(n,a,s,r))}function go(e,t,n,a,s){var y;const{games:r,bStats:o,pStats:i}=fn,d=((y=ot.find(g=>g.id==e))==null?void 0:y.name)||"選手",c=(t==="batter"?o:i).filter(g=>g.player_id==e).map(g=>{const p=r.find(x=>x.id===g.game_id);return{date:(p==null?void 0:p.date)||"",game:p,stats:g}}).filter(g=>g.date).sort((g,p)=>g.date.localeCompare(p.date)),m=t==="batter"?It(c.map(g=>g.stats)):$t(c.map(g=>g.stats));let u=[...c];if(n!=="all"){const g=parseInt(n,10);u.length>g&&(u=u.slice(u.length-g))}const f=t==="batter"?It(u.map(g=>g.stats)):$t(u.map(g=>g.stats));fo(d,t,f,m,u);const b=Xs(u,t,a,s);bo(d,t,u),yo(d,t,b,a,s),ho(t,u)}function fo(e,t,n,a,s){const r=document.getElementById("ps-highlight-cards");if(r)if(t==="batter"){const o=n.avg-a.avg,i=(o>=0?"+":"")+o.toFixed(3).replace(/^0/,""),d=o>=.03,l=o<=-.05,c=d?"🔥 好調":l?"❄️ 不調":"⚖️ 安定",m=d?"bg-red-100 text-red-700 border-red-200":l?"bg-blue-100 text-blue-700 border-blue-200":"bg-gray-100 text-gray-700 border-gray-200";let u=0;for(let f=s.length-1;f>=0;f--){const b=s[f].stats.hits||0,y=s[f].stats.at_bats||0;if(b>0)u++;else if(y>0)break}r.innerHTML=`
            <div class="bg-white p-3 rounded-lg shadow border border-gray-100">
                <div class="text-xs text-gray-500 font-bold mb-1 flex justify-between items-center">
                    <span>直近打率 vs 通算</span>
                    <span class="text-[10px] px-1.5 py-0.5 rounded border ${m}">${c}</span>
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
                <div class="text-xl font-black text-gray-800">${u} <span class="text-xs font-normal text-gray-600">試合連続</span> (${n.h}H)</div>
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
        `}}function Xs(e,t,n,a){var r,o,i,d,l,c;const s=[];if(e.length===0)return s;if(n==="game")for(let m=0;m<e.length;m++){const u=Math.max(0,m-a+1),f=e.slice(u,m+1),b=f.map(x=>x.stats),y=t==="batter"?It(b):$t(b),g=e[m],p=ut((r=g.game)==null?void 0:r.team_first)?(o=g.game)==null?void 0:o.team_second:(i=g.game)==null?void 0:i.team_first;s.push({label:`${g.date.substring(5)} vs ${p||""}`,date:g.date,windowSpan:`${u+1}〜${m+1}試合目 (${f.length}試合)`,calc:y,stats:b})}else for(let m=0;m<e.length;m++){let u=0;const f=[];for(let x=m;x>=0;x--){f.unshift(e[x]);const v=t==="batter"?e[x].stats.at_bats||0:1;if(u+=v,u>=a)break}const b=f.map(x=>x.stats),y=t==="batter"?It(b):$t(b),g=e[m],p=ut((d=g.game)==null?void 0:d.team_first)?(l=g.game)==null?void 0:l.team_second:(c=g.game)==null?void 0:c.team_first;s.push({label:`${g.date.substring(5)} vs ${p||""}`,date:g.date,windowSpan:t==="batter"?`直近 ${y.ab} 打数`:`直近 ${f.length} 登板`,calc:y,stats:b})}return s}function bo(e,t,n){At.rawGraph&&At.rawGraph.destroy();const a=document.getElementById("chart-ps-raw-stats");if(!a||n.length===0)return;const s=[],r=[];let o=[];n.forEach(i=>{var c,m,u;o.push(i.stats);const d=ut((c=i.game)==null?void 0:c.team_first)?(m=i.game)==null?void 0:m.team_second:(u=i.game)==null?void 0:u.team_first;s.push(`${i.date.substring(5)} vs ${d||""}`);const l=t==="batter"?It(o):$t(o);r.push(l)}),t==="batter"?At.rawGraph=new window.Chart(a.getContext("2d"),{type:"line",data:{labels:s,datasets:[{label:"累積打率",data:r.map(i=>i.avg),borderColor:"#ef4444",backgroundColor:"#ef4444",tension:.2},{label:"累積出塁率",data:r.map(i=>i.obp),borderColor:"#3b82f6",backgroundColor:"#3b82f6",tension:.2},{label:"累積OPS",data:r.map(i=>i.ops),borderColor:"#8b5cf6",backgroundColor:"#8b5cf6",borderDash:[4,4],tension:.2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"}},scales:{y:{min:0,ticks:{font:{size:10}}},x:{ticks:{font:{size:10},maxRotation:45}}}}}):At.rawGraph=new window.Chart(a.getContext("2d"),{type:"line",data:{labels:s,datasets:[{label:"累積防御率",data:r.map(i=>i.era),borderColor:"#ef4444",backgroundColor:"#ef4444",tension:.2},{label:"累積WHIP",data:r.map(i=>i.whip),borderColor:"#3b82f6",backgroundColor:"#3b82f6",tension:.2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"}},scales:{y:{min:0,ticks:{font:{size:10}}},x:{ticks:{font:{size:10},maxRotation:45}}}}})}function yo(e,t,n,a,s){const r=document.getElementById("ps-ma-graph-subtitle");r&&(r.textContent=`(${e} - 直近${s}${a==="ab"?"打数/登板":"試合"}移動平均)`),At.maGraph&&At.maGraph.destroy();const o=n.map(d=>d.label),i=document.getElementById("chart-ps-moving-avg");i&&(t==="batter"?At.maGraph=new window.Chart(i.getContext("2d"),{type:"line",data:{labels:o,datasets:[{label:"移動平均 打率",data:n.map(d=>d.calc.avg),borderColor:"#ef4444",backgroundColor:"#ef4444",tension:.2},{label:"移動平均 出塁率",data:n.map(d=>d.calc.obp),borderColor:"#3b82f6",backgroundColor:"#3b82f6",tension:.2},{label:"移動平均 OPS",data:n.map(d=>d.calc.ops),borderColor:"#8b5cf6",backgroundColor:"#8b5cf6",borderDash:[4,4],tension:.2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"}},scales:{y:{min:0,ticks:{font:{size:10}}},x:{ticks:{font:{size:10},maxRotation:45}}}}}):At.maGraph=new window.Chart(i.getContext("2d"),{type:"line",data:{labels:o,datasets:[{label:"移動平均 防御率",data:n.map(d=>d.calc.era),borderColor:"#ef4444",backgroundColor:"#ef4444",tension:.2},{label:"移動平均 WHIP",data:n.map(d=>d.calc.whip),borderColor:"#3b82f6",backgroundColor:"#3b82f6",tension:.2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"}},scales:{y:{min:0,ticks:{font:{size:10}}},x:{ticks:{font:{size:10},maxRotation:45}}}}}))}function ho(e,t){const n=document.getElementById("ps-game-thead"),a=document.getElementById("ps-game-tbody"),s=document.getElementById("ps-game-count-label");if(!n||!a)return;s&&(s.textContent=`対象全 ${t.length} 試合（最新順）`);const r=[...t].reverse();e==="batter"?(n.innerHTML=`
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
        `,a.innerHTML=r.map(o=>{var q,S,C;const i=o.stats,d=ut((q=o.game)==null?void 0:q.team_first)?(S=o.game)==null?void 0:S.team_second:(C=o.game)==null?void 0:C.team_first,l=i.plate_appearances||0,c=i.at_bats||0,m=i.hits||0,u=i.doubles||0,f=i.triples||0,b=i.home_runs||0,y=i.singles!==void 0?i.singles:Math.max(0,m-u-f-b),g=i.runs_batted_in||0,p=i.runs||0,x=i.walks||0,v=i.hit_by_pitch||0,h=i.strikeouts||i.strike_outs||0,$=i.sacrifice_flies||i.sac_flies||0,L=(i.sacrifice_hits||i.sac_bunts||0)+$,E=i.stolen_bases||0,I=i.errors||0,w=c>0?(m/c).toFixed(3).replace(/^0/,""):".000",k=c+x+v+$,_=k>0?(m+x+v)/k:l>0?(m+x+v)/l:0;_.toFixed(3).replace(/^0/,"");const A=y+u*2+f*3+b*4,P=i.total_bases&&i.total_bases>A?i.total_bases:A,D=c>0?P/c:0;D.toFixed(3).replace(/^0/,"");const O=(_+D).toFixed(3);return`
                <tr class="hover:bg-gray-50">
                    <td class="p-2 border font-bold">${o.date}</td>
                    <td class="p-2 border">${d||"不明"}</td>
                    <td class="p-2 border text-center">${l}</td>
                    <td class="p-2 border text-center font-bold">${c}</td>
                    <td class="p-2 border text-center text-green-600 font-bold ${m>0?"bg-green-50":""}">${m}</td>
                    <td class="p-2 border text-center">${y}</td>
                    <td class="p-2 border text-center">${u}</td>
                    <td class="p-2 border text-center">${f}</td>
                    <td class="p-2 border text-center text-red-600 font-bold ${b>0?"bg-red-50":""}">${b}</td>
                    <td class="p-2 border text-center font-bold">${g}</td>
                    <td class="p-2 border text-center">${p}</td>
                    <td class="p-2 border text-center">${x}</td>
                    <td class="p-2 border text-center">${v}</td>
                    <td class="p-2 border text-center text-gray-500">${h}</td>
                    <td class="p-2 border text-center">${L}</td>
                    <td class="p-2 border text-center">${E}</td>
                    <td class="p-2 border text-center text-gray-500">${I}</td>
                    <td class="p-2 border text-center font-black text-red-600">${w}</td>
                    <td class="p-2 border text-center font-bold text-purple-700 bg-purple-50">${O}</td>
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
        `,a.innerHTML=r.map(o=>{var E,I,w;const i=o.stats,d=ut((E=o.game)==null?void 0:E.team_first)?(I=o.game)==null?void 0:I.team_second:(w=o.game)==null?void 0:w.team_first,l=i.outs||0,c=`${Math.floor(l/3)}${l%3!==0?"."+l%3:""}`,m=i.pitch_count||0,u=i.strikes||0,f=i.hits_allowed||0,b=i.home_runs_allowed||0,y=i.walks_allowed||0,g=i.hit_batters||0,p=i.strike_outs||0,x=i.runs_allowed||0,v=i.earned_runs||0,h=l/3,$=h>0?(v*7/h).toFixed(2):"0.00",L=h>0?((f+y)/h).toFixed(2):"0.00";return`
                <tr class="hover:bg-gray-50">
                    <td class="p-2 border font-bold">${o.date}</td>
                    <td class="p-2 border">${d||"不明"}</td>
                    <td class="p-2 border text-center font-bold">${c}</td>
                    <td class="p-2 border text-center">${m} (${u})</td>
                    <td class="p-2 border text-center">${f}</td>
                    <td class="p-2 border text-center text-red-600">${b}</td>
                    <td class="p-2 border text-center">${y}</td>
                    <td class="p-2 border text-center">${g}</td>
                    <td class="p-2 border text-center text-green-600 font-bold">${p}</td>
                    <td class="p-2 border text-center text-red-600">${x}</td>
                    <td class="p-2 border text-center text-red-600 font-bold">${v}</td>
                    <td class="p-2 border text-center font-black text-red-600">${$}</td>
                    <td class="p-2 border text-center font-bold text-blue-600">${L}</td>
                </tr>
            `}).join(""))}function xo(e,t,n,a){const s=document.getElementById("ps-all-title"),r=document.getElementById("ps-all-subtitle"),o=document.getElementById("ps-all-thead"),i=document.getElementById("ps-all-tbody");if(!o||!i)return;const{games:d,bStats:l,pStats:c}=fn,m=t==="all"?"全試合":`直近 ${t} 試合`;s&&(s.textContent=`👥 全選手成績一覧 (${e==="batter"?"打撃":"投手"})`),r&&(r.textContent=`対象: ${m} / 移動平均: 直近${a}${n==="ab"?"打数/登板":"試合"} (各列クリックでソート)`);const u=new Set;l.forEach(p=>u.add(p.player_id)),c.forEach(p=>u.add(p.player_id));const b=ot.filter(p=>u.has(p.id)).sort((p,x)=>p.name.localeCompare(x.name)).map(p=>{let h=[...(e==="batter"?l:c).filter(I=>I.player_id==p.id).map(I=>{const w=d.find(k=>k.id===I.game_id);return{date:(w==null?void 0:w.date)||"",game:w,stats:I}}).filter(I=>I.date).sort((I,w)=>I.date.localeCompare(w.date))];if(t!=="all"){const I=parseInt(t,10);h.length>I&&(h=h.slice(h.length-I))}const $=e==="batter"?It(h.map(I=>I.stats)):$t(h.map(I=>I.stats)),L=Xs(h,e,n,a),E=L.length>0?L[L.length-1].calc:$;return{player:p,name:p.name,gameCount:h.length,calcPeriod:$,latestMa:E,ab:$.ab,h:$.h,hr:$.hr,rbi:$.rbi,r:$.r,bb:$.bb+$.hbp,avg:$.avg,obp:$.obp,slg:$.slg,ops:$.ops,runRate:$.runRate,maAvg:E.avg,maOps:E.ops,outs:$.outs,so:$.so,pBb:$.bb,wins:$.wins,losses:$.losses,era:$.era,whip:$.whip,maEra:E.era,maWhip:E.whip}}),y=an[e];b.sort((p,x)=>{let v=p[y.key],h=x[y.key];return v===void 0&&(v=0),h===void 0&&(h=0),typeof v=="string"?y.order==="asc"?v.localeCompare(h):h.localeCompare(v):y.order==="asc"?v-h:h-v});const g=p=>y.key===p?y.order==="asc"?" ▲":" ▼":"";e==="batter"?(o.innerHTML=`
            <tr>
                <th class="p-2 border cursor-pointer select-none hover:bg-gray-200" data-ps-sort="name">選手名<span>${g("name")}</span></th>
                <th class="p-2 border text-center cursor-pointer select-none hover:bg-gray-200" data-ps-sort="gameCount">試合数<span>${g("gameCount")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="ab">打数<span>${g("ab")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="h">安打<span>${g("h")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="hr">HR<span>${g("hr")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="rbi">打点<span>${g("rbi")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 text-green-700 font-bold" data-ps-sort="r">得点<span>${g("r")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 text-blue-700 font-bold" data-ps-sort="bb">四死球<span>${g("bb")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-red-600" data-ps-sort="avg">打率 (${m})<span>${g("avg")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-blue-600" data-ps-sort="obp">出塁率 (${m})<span>${g("obp")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-teal-600" data-ps-sort="slg">長打率 (${m})<span>${g("slg")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-purple-600" data-ps-sort="ops">OPS (${m})<span>${g("ops")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-amber-600" data-ps-sort="runRate">生還率 (R/OB)<span>${g("runRate")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-blue-600" data-ps-sort="maAvg">移動平均 打率<span>${g("maAvg")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-indigo-600" data-ps-sort="maOps">移動平均 OPS<span>${g("maOps")}</span></th>
            </tr>
        `,i.innerHTML=b.map(p=>`
            <tr class="hover:bg-gray-50">
                <td class="p-2 border font-bold text-gray-800">${p.player.name}</td>
                <td class="p-2 border text-center">${p.gameCount}</td>
                <td class="p-2 border text-right font-semibold">${p.calcPeriod.ab}</td>
                <td class="p-2 border text-right text-green-600 font-bold">${p.calcPeriod.h}</td>
                <td class="p-2 border text-right">${p.calcPeriod.hr}</td>
                <td class="p-2 border text-right">${p.calcPeriod.rbi}</td>
                <td class="p-2 border text-right font-bold text-green-700">${p.calcPeriod.r}</td>
                <td class="p-2 border text-right font-bold text-blue-700">${p.calcPeriod.bb+p.calcPeriod.hbp}</td>
                <td class="p-2 border text-right font-black text-red-600">${p.calcPeriod.avgStr}</td>
                <td class="p-2 border text-right font-bold text-blue-600">${p.calcPeriod.obpStr}</td>
                <td class="p-2 border text-right font-bold text-teal-600">${p.calcPeriod.slgStr}</td>
                <td class="p-2 border text-right font-black text-purple-700 bg-purple-50">${p.calcPeriod.opsStr}</td>
                <td class="p-2 border text-right font-bold text-amber-600 bg-amber-50">${p.calcPeriod.runRateStr}</td>
                <td class="p-2 border text-right font-bold text-blue-600">${p.latestMa.avgStr}</td>
                <td class="p-2 border text-right font-bold text-indigo-600">${p.latestMa.opsStr}</td>
            </tr>
        `).join("")):(o.innerHTML=`
            <tr>
                <th class="p-2 border cursor-pointer select-none hover:bg-gray-200" data-ps-sort="name">選手名<span>${g("name")}</span></th>
                <th class="p-2 border text-center cursor-pointer select-none hover:bg-gray-200" data-ps-sort="gameCount">登板数<span>${g("gameCount")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 text-green-700 font-bold" data-ps-sort="wins">勝利<span>${g("wins")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 text-red-600 font-bold" data-ps-sort="losses">敗戦<span>${g("losses")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="outs">投球回<span>${g("outs")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="so">奪三振<span>${g("so")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="pBb">与四死<span>${g("pBb")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-red-600" data-ps-sort="era">防御率 (${m})<span>${g("era")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-blue-600" data-ps-sort="whip">WHIP (${m})<span>${g("whip")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-red-500" data-ps-sort="maEra">移動平均 防御率<span>${g("maEra")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-blue-500" data-ps-sort="maWhip">移動平均 WHIP<span>${g("maWhip")}</span></th>
            </tr>
        `,i.innerHTML=b.map(p=>`
            <tr class="hover:bg-gray-50">
                <td class="p-2 border font-bold text-gray-800">${p.player.name}</td>
                <td class="p-2 border text-center">${p.gameCount}</td>
                <td class="p-2 border text-right font-bold text-green-700">${p.calcPeriod.wins}</td>
                <td class="p-2 border text-right font-bold text-red-600">${p.calcPeriod.losses}</td>
                <td class="p-2 border text-right font-semibold">${(p.calcPeriod.outs/3).toFixed(1)}</td>
                <td class="p-2 border text-right text-green-600 font-bold">${p.calcPeriod.so}</td>
                <td class="p-2 border text-right">${p.calcPeriod.bb}</td>
                <td class="p-2 border text-right font-black text-red-600">${p.calcPeriod.eraStr}</td>
                <td class="p-2 border text-right font-black text-blue-600 bg-blue-50">${p.calcPeriod.whipStr}</td>
                <td class="p-2 border text-right font-bold text-red-500">${p.latestMa.eraStr}</td>
                <td class="p-2 border text-right font-bold text-blue-500">${p.latestMa.whipStr}</td>
            </tr>
        `).join("")),o.querySelectorAll("th[data-ps-sort]").forEach(p=>{p.addEventListener("click",()=>{const x=p.dataset.psSort;an[e].key===x?an[e].order=an[e].order==="asc"?"desc":"asc":(an[e].key=x,an[e].order=x==="era"||x==="whip"||x==="maEra"||x==="maWhip"||x==="name"?"asc":"desc"),Ya()})})}function vo(){var c,m,u,f,b,y;const e=((c=document.getElementById("ps-mode"))==null?void 0:c.value)||"single",t=((m=document.getElementById("ps-role"))==null?void 0:m.value)||"batter",n=(u=document.getElementById("ps-player"))==null?void 0:u.value,a=((f=ot.find(g=>g.id==n))==null?void 0:f.name)||"全選手";let s="\uFEFF",r=`ants_stats_${e}_${t}_${a}_${new Date().toISOString().substring(0,10)}.csv`,o=null;if(e==="single"?o=(b=document.querySelector("#ps-game-tbody"))==null?void 0:b.closest("table"):o=(y=document.querySelector("#ps-all-tbody"))==null?void 0:y.closest("table"),!o){alert("出力対象のテーブルが見つかりません。");return}Array.from(o.querySelectorAll("tr")).forEach(g=>{const x=Array.from(g.querySelectorAll("th, td")).map(v=>`"${v.textContent.trim().replace(/"/g,'""')}"`).join(",");s+=x+`
`});const d=new Blob([s],{type:"text/csv;charset=utf-8;"}),l=document.createElement("a");l.href=URL.createObjectURL(d),l.download=r,l.click(),URL.revokeObjectURL(l.href)}function wo(){const{bStats:e,pStats:t}=fn,n={},a={};e.forEach(s=>{n[s.player_id]||(n[s.player_id]=[]),n[s.player_id].push(s)}),t.forEach(s=>{a[s.player_id]||(a[s.player_id]=[]),a[s.player_id].push(s)}),Ta.batter=Object.keys(n).map(s=>{var r;return{name:((r=ot.find(o=>o.id==s))==null?void 0:r.name)||"不明",...It(n[s])}}).filter(s=>s.pa>0),Ta.pitcher=Object.keys(a).map(s=>{var r;return{name:((r=ot.find(o=>o.id==s))==null?void 0:r.name)||"不明",...$t(a[s])}}).filter(s=>s.outs>0),Aa("batter"),Aa("pitcher")}function Eo(e,t){Vt[e].key===t?Vt[e].order=Vt[e].order==="asc"?"desc":"asc":(Vt[e].key=t,t==="era"||t==="whip"||t==="bb7"||t==="bbRate"||t==="name"?Vt[e].order="asc":Vt[e].order="desc"),Aa(e)}function Aa(e){const t=Vt[e],n=Ta[e];n.sort((s,r)=>{let o=s[t.key],i=r[t.key];return typeof o=="string"?t.order==="asc"?o.localeCompare(i):i.localeCompare(o):t.order==="asc"?o-i:i-o}),e==="batter"?document.getElementById("ranking-batter-tbody").innerHTML=n.map(s=>`<tr class="border-b"><td class="p-2 font-bold">${s.name}</td><td class="p-2">${s.pa}</td><td class="p-2">${s.avgStr}</td><td class="p-2 text-purple-700 font-bold">${s.opsStr}</td><td class="p-2">${s.obpStr}</td><td class="p-2">${s.slgStr}</td><td class="p-2">${s.h}</td><td class="p-2">${s.bb}</td><td class="p-2">${s.hbp}</td><td class="p-2">${s.rbi}</td><td class="p-2">${s.r}</td><td class="p-2">${s.sb}</td><td class="p-2">${s.hr}</td></tr>`).join(""):document.getElementById("ranking-pitcher-tbody").innerHTML=n.map(s=>`<tr class="border-b"><td class="p-2 font-bold">${s.name}</td><td class="p-2 text-green-700 font-bold">${s.wins}</td><td class="p-2 text-red-600 font-bold">${s.losses}</td><td class="p-2">${s.outs}</td><td class="p-2 text-red-600 font-bold">${s.era.toFixed(2)}</td><td class="p-2">${s.whip.toFixed(2)}</td><td class="p-2">${s.k7.toFixed(2)}</td><td class="p-2">${s.bb7.toFixed(2)}</td><td class="p-2">${s.kRate.toFixed(3)}</td><td class="p-2">${s.bbRate.toFixed(3)}</td><td class="p-2">${(s.sRate*100).toFixed(1)}</td><td class="p-2">${s.kbb.toFixed(2)}</td></tr>`).join(""),document.querySelectorAll(`#tab-content-ranking th[data-role="${e}"] span`).forEach(s=>s.textContent="");const a=document.querySelector(`#tab-content-ranking th[data-role="${e}"][data-sort="${t.key}"] span`);a&&(a.textContent=t.order==="asc"?" ▲":" ▼")}async function Da(){await kn();const e=document.getElementById("comp-role").value,t=Array.from(document.querySelectorAll(".comp-player-cb:checked")).map(l=>l.value);Object.values(xa).forEach(l=>l.destroy()),xa={};const n=document.getElementById("comp-charts-container");if(n&&(n.innerHTML=""),t.length===0)return;const{games:a,bStats:s,pStats:r}=fn,o=[...new Set(a.filter(l=>l.date).map(l=>l.date.split("T")[0]))].sort(),i=["#ef4444","#3b82f6","#10b981","#f59e0b","#8b5cf6","#06b6d4","#ec4899"];(e==="batter"?[{key:"avg",name:"打率"},{key:"ops",name:"OPS"},{key:"obp",name:"出塁率"},{key:"slg",name:"長打率"}]:[{key:"era",name:"防御率"},{key:"whip",name:"WHIP"},{key:"k7",name:"K/7"},{key:"bb7",name:"BB/7"},{key:"sRate",name:"S率(%)"}]).forEach((l,c)=>{const m=`chart-comp-${c}`,u=document.createElement("div");u.className="bg-white p-4 rounded shadow-md relative h-[300px] md:h-[400px]",u.innerHTML=`<canvas id="${m}"></canvas>`,n.appendChild(u);const f=t.map((b,y)=>{var L;const p=(e==="batter"?s:r).filter(E=>E.player_id==b).map(E=>{var I;return{date:((I=a.find(w=>w.id===E.game_id))==null?void 0:I.date.split("T")[0])||"",stats:E}}).filter(E=>E.date).sort((E,I)=>E.date.localeCompare(I.date));let x=[],v={};p.forEach(E=>{x.push(E.stats);let w=(e==="batter"?It(x):$t(x))[l.key];l.key==="sRate"&&(w=w*100),v[E.date]=w});let h=null;const $=o.map(E=>(v[E]!==void 0&&(h=v[E]),h));return{label:((L=ot.find(E=>E.id==b))==null?void 0:L.name)||"不明",data:$,borderColor:i[y%i.length],spanGaps:!0,tension:.1}});xa[m]=new window.Chart(document.getElementById(m).getContext("2d"),{type:"line",data:{labels:o,datasets:f},options:{responsive:!0,maintainAspectRatio:!1,plugins:{title:{display:!0,text:`選手比較 (${l.name})`}}}})})}async function Na(){await kn();const e=document.getElementById("tm-role").value,t=parseInt(document.getElementById("tm-window").value)||5,n=Array.from(document.querySelectorAll(".tm-player-cb:checked")).map(c=>c.value);Object.values(va).forEach(c=>c.destroy()),va={};const a=document.getElementById("tm-charts-container");if(a&&(a.innerHTML=""),n.length===0)return;const{games:s,bStats:r,pStats:o}=fn,i=[...new Set(s.filter(c=>c.date).map(c=>c.date.split("T")[0]))].sort(),d=["#ef4444","#3b82f6","#10b981","#f59e0b","#8b5cf6","#06b6d4","#ec4899"];(e==="batter"?[{key:"avg",name:"打率"},{key:"ops",name:"OPS"},{key:"obp",name:"出塁率"},{key:"slg",name:"長打率"}]:[{key:"era",name:"防御率"},{key:"whip",name:"WHIP"},{key:"k7",name:"K/7"},{key:"bb7",name:"BB/7"},{key:"sRate",name:"S率(%)"}]).forEach((c,m)=>{const u=`chart-tm-${m}`,f=document.createElement("div");f.className="bg-white p-4 rounded shadow-md relative h-[300px] md:h-[400px]",f.innerHTML=`<canvas id="${u}"></canvas>`,a.appendChild(f);const b=n.map((y,g)=>{var L;const x=(e==="batter"?r:o).filter(E=>E.player_id==y).map(E=>{var I;return{date:((I=s.find(w=>w.id===E.game_id))==null?void 0:I.date.split("T")[0])||"",stats:E}}).filter(E=>E.date).sort((E,I)=>E.date.localeCompare(I.date));let v={};for(let E=0;E<x.length;E++){const I=x.slice(Math.max(0,E-t+1),E+1).map(_=>_.stats);let k=(e==="batter"?It(I):$t(I))[c.key];c.key==="sRate"&&(k=k*100),v[x[E].date]=k}let h=null;const $=i.map(E=>(v[E]!==void 0&&(h=v[E]),h));return{label:((L=ot.find(E=>E.id==y))==null?void 0:L.name)||"不明",data:$,borderColor:d[g%d.length],spanGaps:!0,tension:.1}});va[u]=new window.Chart(document.getElementById(u).getContext("2d"),{type:"line",data:{labels:i,datasets:b},options:{responsive:!0,maintainAspectRatio:!1,plugins:{title:{display:!0,text:`移動平均 (${c.name})`}}}})})}function Qa(){const e=document.getElementById("home-team-list");e&&(e.innerHTML=xe.homeTeamNames.map(t=>`<div class="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2">
            <span>${t}</span>
            <button onclick="window.dashboard_removeHomeTeam('${t}')" class="text-red-500 hover:text-red-700 font-bold">&times;</button>
        </div>`).join(""))}async function _o(){const e=document.getElementById("new-home-team-name"),t=e.value.trim();if(!t||xe.homeTeamNames.includes(t))return;const n=[...xe.homeTeamNames,t];if(localStorage.setItem("ants_homeTeamNames",JSON.stringify(n)),he==="admin"){U("自チーム名を追加中 (DB同期)...");try{const{error:a}=await B.from("dashboard_settings").upsert({key:"homeTeamNames",value:n},{onConflict:"key"});if(a)throw a}catch(a){console.error("Supabase sync failed",a),console.warn("DBへの同期に失敗しましたが、このブラウザには保存されました: "+a.message)}finally{F()}}xe.homeTeamNames=n,Qa(),e.value="",Tt()}window.dashboard_removeHomeTeam=async function(e){if(!confirm(`「${e}」を自チームから削除しますか？`))return;const t=xe.homeTeamNames.filter(n=>n!==e);if(localStorage.setItem("ants_homeTeamNames",JSON.stringify(t)),he==="admin"){U("自チーム名を削除中 (DB同期)...");try{const{error:n}=await B.from("dashboard_settings").upsert({key:"homeTeamNames",value:t},{onConflict:"key"});if(n)throw n}catch(n){console.error("Supabase sync failed",n),console.warn("DBへの同期に失敗しましたが、このブラウザからは削除されました: "+n.message)}finally{F()}}xe.homeTeamNames=t,Qa(),Tt()};async function Io(){const e=document.getElementById("csv-import-file"),t=document.getElementById("csv-import-type").value,n=document.getElementById("import-result-msg");if(!e.files||e.files.length===0)return alert("CSVファイルを選択してください。");const a=e.files[0],s=new FileReader;s.onload=async r=>{let o=r.target.result;o=o.replace(/^\uFEFF/,""),t==="pitcher"&&(o=o.replace(/([A-Za-z0-9]+)(\d{3},[^0-9,])/g,`$1
$2`));const i=lo(o);if(i.length<2)return alert("データが空かフォーマットが不正です。");U("データベースへ保存中..."),n.classList.add("hidden");try{const d=new Map,l=new Map,c=[];for(let y=1;y<i.length;y++){const g=i[y];if(g.length<30)continue;const p=parseInt(g[0]),x=parseInt(g[3]);if(isNaN(p)||isNaN(x))continue;d.set(p,{id:p,name:g[1]||"不明",uniform_number:g[2]||null});let v=null;if(g[4]&&g[4].trim()){const $=g[4].trim().replace(/\//g,"-"),L=new Date($);if(isNaN(L.getTime())){const E=$.split("-");if(E.length===3){const I=parseInt(E[0],10),w=parseInt(E[1],10),k=parseInt(E[2],10);!isNaN(I)&&!isNaN(w)&&!isNaN(k)&&(v=`${I}-${String(w).padStart(2,"0")}-${String(k).padStart(2,"0")}`)}}else{const E=L.getFullYear(),I=String(L.getMonth()+1).padStart(2,"0"),w=String(L.getDate()).padStart(2,"0");v=`${E}-${I}-${w}`}}l.set(x,{id:x,date:v,team_first:g[5]||null,score:g[6]||null,team_second:g[7]||null,title:g[8]||null,category:g[9]||null,stadium:g[10]||null});const h={player_id:p,game_id:x};t==="batter"?["plate_appearances","at_bats","runs","hits","doubles","triples","home_runs","total_bases","runs_batted_in","stolen_bases","caught_stealing","sacrifice_hits","sacrifice_flies","walks","hit_by_pitch","strike_outs","left_on_base","double_plays","scoring_position_at_bats","scoring_position_hits","go","fo"].forEach((L,E)=>h[L]=parseInt(g[11+E])||0):t==="pitcher"&&["is_starter","wins","losses","saves","holds","qs","outs","pitch_count","strikes","batters_faced","at_bats","hits_allowed","home_runs_allowed","walks_allowed","hit_batters","strike_outs","runs_allowed","earned_runs","wild_pitches","balks","sacrifice_hits_allowed","sacrifice_flies_allowed","go","fo"].forEach((L,E)=>h[L]=parseInt(g[11+E])||0),c.push(h)}const{error:m}=await B.from("players").upsert(Array.from(d.values()));if(m)throw m;const{error:u}=await B.from("games").upsert(Array.from(l.values()));if(u)throw u;const f=t==="batter"?"batter_stats":"pitcher_stats",{error:b}=await B.from(f).upsert(c,{onConflict:"player_id, game_id"});if(b)throw b;await X("IMPORT_CSV",`成績データ(${t==="batter"?"打者":"投手"})を${c.length}件インポートしました`),n.textContent=`成功: ${c.length} 件のデータをインポートしました。`,n.className="mt-4 text-sm font-bold text-green-600",n.classList.remove("hidden"),e.value="",Zs()}catch(d){n.textContent=`エラー: ${d.message}`,n.className="mt-4 text-sm font-bold text-red-600",n.classList.remove("hidden")}finally{F()}},s.readAsText(a)}function $o(){const e=document.getElementById("detail-analysis-file");if(!e||!e.files||e.files.length===0){alert("ファイルを選択してください。");return}const t=e.files[0],n=new FileReader;n.onload=function(a){try{const s=JSON.parse(a.target.result),r=s.cat&&Array.isArray(s.cat)?s.cat.length:0,o=s.sys&&Array.isArray(s.sys)?s.sys.length:0;let i="なし",d=0;if(s.sys){const c=s.sys.find(u=>u.ke==="sysdata23");if(c&&c.va)try{const u=JSON.parse(c.va);u&&u.pcl&&(i=`${u.pcl.length} 件のイベント`)}catch{i="解析失敗"}const m=s.sys.find(u=>u.ke==="sysdata12");m&&m.va&&(d=m.va.split(",").length)}if(yt=ko(s),!yt){alert("詳細データのパースに失敗しました。sysdata23 が見つかりません。");return}document.getElementById("detail-stats-cat-count").textContent=r,document.getElementById("detail-stats-sys-count").textContent=o,document.getElementById("detail-stats-has-pcl").textContent=i,document.getElementById("detail-stats-ground-count").textContent=d;const l=["<strong>イニング別の詳細スコア分析</strong>: イニングごとの詳細なプレイ記録から得点パターン（何回の攻撃が得点に結びつきやすいか、どのようなアウトの取られ方をしているか）を可視化しました。","<strong>打撃イベント分析（アウトの種類・打球方向）</strong>: プレイログの「サードゴロ」「レフトヒット」などの実況テキストをパースし、各打者の打球方向やアウトの種類の割合を集計しました。","<strong>走塁・盗塁成否分析</strong>: プレイログから「盗塁成功」「盗塁失敗」などのイベントを検出し、選手ごとの走塁成功率やシチュエーションごとの傾向を分析しました。","<strong>エラー発生状況の分析</strong>: 実況テキストに含まれる送球エラーや落球などのキーワードから、守備位置ごとのエラー数やエラーの起こりやすいタイミングを特定しました。","<strong>連続打席・チャンス時の打撃結果</strong>: ランナーがいる場面での打撃内容や、打席ごとの一球単位のボールカウント（ストライク・ボール推移）に応じた結果の相関関係を分析しました。"];document.getElementById("detail-analysis-suggestions").innerHTML=l.map(c=>`<li>${c}</li>`).join(""),document.getElementById("detail-analysis-result").classList.remove("hidden"),document.getElementById("detail-analysis-dashboard").classList.remove("hidden"),Lo()}catch(s){console.error(s),alert("JSONデータのパースに失敗しました。ファイルの形式が正しいか確認してください。")}},n.readAsText(t)}function ko(e){const t=e.sys?e.sys.find(i=>i.ke==="sysdata23"):null;if(!t||!t.va)return null;let n=[];try{n=JSON.parse(t.va).pcl||[]}catch(i){return console.error("Failed to parse sysdata23.va",i),null}const a={innings:{},batters:{},steals:{},errors:{byInning:{},byPosition:{},byPlayer:{}},counts:{}};let s="1回表",r=null;const o=i=>[2,3,4,5,6,7].includes(i);return n.forEach(i=>{const d=i.rnr,l=i.ball,c=i.strk;i.codes&&i.codes.forEach(m=>{if(!m.pli||!m.pli.sPlay)return;const u=m.pli.sPlay.trim(),f=m.cd||"",b=u.match(/^(\d+回(?:表|ｳﾗ|裏))/);b&&(s=b[1],a.innings[s]||(a.innings[s]={runs:0,outs:{strikeout:0,groundout:0,flyout:0,other:0}}));const y=u.match(/^\d+番(.+?)(?:#\d+)?$/);if(y&&(r=y[1].trim(),a.batters[r]||(a.batters[r]={pa:0,ab:0,hits:0,strikeout:0,walk:0,groundout:0,flyout:0,otherout:0,rbi:0,chances:{pa:0,hits:0,rbi:0},directions:{left:0,center:0,right:0,inner:0,other:0},counts:{}}),a.batters[r].pa++,o(d)&&a.batters[r].chances.pa++),(u.includes("生還")||u.includes("本塁生還")||u.includes("ホームイン"))&&(a.innings[s]&&a.innings[s].runs++,r&&(a.batters[r].rbi++,o(d)&&a.batters[r].chances.rbi++)),u.includes("盗塁")){const g=u.match(/(?:ランナー|打者)(.+?)(?:\d+塁|本塁|$)/);if(g){const p=g[1].replace(/\d+$/,"").trim();p&&p!=="打者"&&(a.steals[p]||(a.steals[p]={attempts:0,success:0,fail:0}),a.steals[p].attempts++,u.includes("失敗")||u.includes("アウト")?a.steals[p].fail++:a.steals[p].success++)}}if(u.includes("エラー")||u.includes("失策")||u.includes("ファンブル")||u.includes("後逸")||u.includes("暴投")||u.includes("捕逸")){a.errors.byInning[s]=(a.errors.byInning[s]||0)+1;const g=u.match(/(ピッチャー|キャッチャー|ファースト|セカンド|サード|ショート|レフト|センター|ライト)/);g?a.errors.byPosition[g[1]]=(a.errors.byPosition[g[1]]||0)+1:a.errors.byPosition.その他=(a.errors.byPosition.その他||0)+1,ot.forEach(p=>{p.name&&u.includes(p.name)&&(a.errors.byPlayer[p.name]||(a.errors.byPlayer[p.name]=[]),a.errors.byPlayer[p.name].push({inning:s,play:u}))})}if(r){const g=a.batters[r];if(f.startsWith("H")||f.startsWith("Go")||f.startsWith("Fo")||f.startsWith("Ko")||f.startsWith("Bb")){const x=`${l}-${c}`;a.counts[x]||(a.counts[x]={pa:0,hits:0}),a.counts[x].pa++,f.startsWith("H")&&a.counts[x].hits++,g.counts[x]||(g.counts[x]={pa:0,hits:0}),g.counts[x].pa++,f.startsWith("H")&&g.counts[x].hits++}u.includes("ヒット")||u.includes("安打")||u.includes("ツーベース")||u.includes("スリーベース")||u.includes("ホームラン")||u.includes("本塁打")?(g.hits++,g.ab++,o(d)&&g.chances.hits++,u.includes("レフト")?g.directions.left++:u.includes("センター")?g.directions.center++:u.includes("ライト")?g.directions.right++:u.includes("内野")?g.directions.inner++:g.directions.other++):u.includes("フォアボール")||u.includes("デッドボール")||u.includes("四球")||u.includes("死球")?g.walk++:u.includes("三振")?(g.strikeout++,g.ab++,a.innings[s]&&a.innings[s].outs.strikeout++):u.includes("ゴロ")?(g.groundout++,g.ab++,a.innings[s]&&a.innings[s].outs.groundout++,u.includes("サード")||u.includes("ショート")?g.directions.left++:u.includes("セカンド")||u.includes("ファースト")?g.directions.right++:g.directions.inner++):u.includes("フライ")||u.includes("ライナー")?(g.flyout++,g.ab++,a.innings[s]&&a.innings[s].outs.flyout++,u.includes("レフト")?g.directions.left++:u.includes("センター")?g.directions.center++:u.includes("ライト")?g.directions.right++:g.directions.inner++):u.includes("アウト")&&(u.includes("打者")||u.includes("バッター"))&&(g.otherout++,g.ab++,a.innings[s]&&a.innings[s].outs.other++)}})}),a}function Lo(){if(!yt)return;const e=document.getElementById("detail-player-select");if(e){const t=ot.map(a=>a.name.trim()),n=Object.keys(yt.batters).filter(a=>t.some(s=>a.includes(s)||s.includes(a))).sort();if(n.length===0){e.innerHTML='<option value="">該当する選手がいません</option>';return}e.innerHTML=n.map(a=>`<option value="${a}">${a}</option>`).join(""),e.onchange=function(a){Is(a.target.value)},Is(n[0])}}async function Is(e){if(!yt||!e)return;await kn();const t=yt.batters[e]||{pa:0,ab:0,hits:0,strikeout:0,walk:0,groundout:0,flyout:0,otherout:0,rbi:0,chances:{pa:0,hits:0},directions:{left:0,center:0,right:0,inner:0,other:0},counts:{}};document.getElementById("stat-p-hits").textContent=t.hits,document.getElementById("stat-p-strikeouts").textContent=t.strikeout,document.getElementById("stat-p-groundouts").textContent=t.groundout,document.getElementById("stat-p-flyouts").textContent=t.flyout,document.getElementById("stat-p-walks").textContent=t.walk||0,document.getElementById("stat-p-others").textContent=t.otherout;const n=t.ab||t.pa-(t.walk||0),a=n>0?t.hits/n:0;document.getElementById("stat-p-avg").textContent=a===1?"1.000":a.toFixed(3).substring(1),gt.playerBattingResult&&gt.playerBattingResult.destroy();const s=document.getElementById("chart-detail-player-batting-result").getContext("2d");gt.playerBattingResult=new window.Chart(s,{type:"doughnut",data:{labels:["安打","三振","ゴロ","フライ","四死球","他"],datasets:[{data:[t.hits,t.strikeout,t.groundout,t.flyout,t.walk||0,t.otherout],backgroundColor:["#10B981","#EF4444","#FBBF24","#3B82F6","#6366F1","#9CA3AF"]}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}}}}),gt.playerDirection&&gt.playerDirection.destroy();const r=[t.directions.left,t.directions.center,t.directions.right,t.directions.inner,t.directions.other],o=document.getElementById("chart-detail-player-direction").getContext("2d");gt.playerDirection=new window.Chart(o,{type:"doughnut",data:{labels:["レフト","センター","ライト","内野","その他"],datasets:[{data:r,backgroundColor:["#EC4899","#3B82F6","#14B8A6","#F59E0B","#8B5CF6"]}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",labels:{boxWidth:10,font:{size:10}}}}}});const i=t.chances.pa,d=t.chances.hits,l=i>0?d/i:0;document.getElementById("stat-p-chance-avg").textContent=l===1?"1.000":l.toFixed(3).substring(1),document.getElementById("stat-p-chance-detail").textContent=`${i}打席 ${d}安打`,document.getElementById("stat-p-rbi").textContent=t.rbi;let c={attempts:0,success:0};const m=Object.keys(yt.steals).find(h=>e.includes(h)||h.includes(e));m&&(c=yt.steals[m]);const u=c.attempts>0?c.success/c.attempts*100:0;document.getElementById("stat-p-steal-rate").textContent=u.toFixed(1)+"%",document.getElementById("stat-p-steal-detail").textContent=`成功 ${c.success} / 企図 ${c.attempts}`;const f=yt.errors.byPlayer[e]||[];document.getElementById("stat-p-errors-count").textContent=`${f.length} 件`;const b=document.getElementById("stat-p-errors-detail");b&&(f.length===0?b.innerHTML='<div class="text-gray-400 text-center py-2">期間内エラーの記録はありません</div>':b.innerHTML=f.map(h=>`
                <div class="border-b pb-1 last:border-0 mb-1">
                    <span class="font-bold text-blue-600 bg-blue-50 px-1 rounded">${h.inning}</span>
                    <span class="text-gray-700">${h.play}</span>
                </div>
            `).join(""));const y=t.counts||{},g=["0-0","1-0","2-0","3-0","0-1","1-1","2-1","3-1","0-2","1-2","2-2","3-2"],p=g.map(h=>y[h]?y[h].pa:0),x=g.map(h=>y[h]?y[h].hits:0);gt.playerCount&&gt.playerCount.destroy();const v=document.getElementById("chart-detail-player-count").getContext("2d");gt.playerCount=new window.Chart(v,{type:"bar",data:{labels:g.map(h=>h+" count"),datasets:[{label:"打席数",data:p,backgroundColor:"rgba(99, 102, 241, 0.6)"},{label:"安打数",data:x,backgroundColor:"rgba(16, 185, 129, 0.8)"}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{y:{beginAtZero:!0,ticks:{stepSize:1}}}}})}let Se=[],Le="team_default",wt=[],me=[],je=[],Pe="",Rn=null;function nn(){return Se.find(e=>e.id===Le)||Se[0]||{id:"team_default",name:"ありんこアントス (A軍)"}}function Ln(){return me.filter(e=>(e.teamId||"team_default")===Le)}function Bo(){if(!Rn){const e=nn();Rn={id:"",name:"新規配置データ",teamId:Le,mode:Q,basePositions:{},customSubstitutions:[],battingOrder:{},headerInfo:{date:"",tournament:"",teamHome:e.name||"ありんこアントス",teamVisitor:"",manager:"",captain:"",scorer:"",stadium:"",time:""}}}return Rn}function ye(){return je.find(e=>e.id===Pe)||Bo()}let ve=null,ue=null,Q=9;const xt={p:"投手",c:"捕手","1b":"一塁手","2b":"二塁手","3b":"三塁手",ss:"遊撃手",lf:"左翼手",cf:"中堅手",rf:"右翼手",dh:"指名打者"},dn={p:"1",c:"2","1b":"3","2b":"4","3b":"5",ss:"6",lf:"7",cf:"8",rf:"9",dh:"DH"},So={1:"p",2:"c",3:"1b",4:"2b",5:"3b",6:"ss",7:"lf",8:"cf",9:"rf",10:"dh",d:"dh",dh:"dh",DH:"dh"},it=["p","c","1b","2b","3b","ss","lf","cf","rf"],dt=["p","c","1b","2b","3b","ss","lf","cf","rf","dh"];async function Fn(){try{if(ui(),await To(),Rt(),da(),bn(),je.length>0){Pe=je[0].id;const e=document.getElementById("sim-pattern-select");e&&(e.value=Pe);const t=ye();t&&(Q=t.mode||9,t.teamId&&Se.some(n=>n.id===t.teamId)&&(Le=t.teamId,Rt()))}Ft(),Gn("setup"),Te(),ie()}catch(e){console.error("Fatal initialization error:",e),alert(`アプリケーションの初期化中にエラーが発生しました。
詳細: `+e.message)}}async function To(){Se=[{id:"team_default",name:"ありんこアントス (A軍)"},{id:"team_b",name:"ありんこアントス (B軍・ジュニア)"}],Le=Se[0].id,wt=[],me=[{id:"p1",name:"とあ",number:"2",teamId:"team_default"},{id:"p2",name:"そうま",number:"10",teamId:"team_default"},{id:"p3",name:"あきと",number:"3",teamId:"team_default"},{id:"p4",name:"ゆうき",number:"4",teamId:"team_default"},{id:"p5",name:"あいのすけ",number:"1",teamId:"team_default"},{id:"p6",name:"けんせい",number:"6",teamId:"team_default"},{id:"p7",name:"りゅうと",number:"7",teamId:"team_default"},{id:"p8",name:"ながまさ",number:"8",teamId:"team_default"},{id:"p9",name:"そうすけ",number:"9",teamId:"team_default"},{id:"p10",name:"たいち",number:"5",teamId:"team_default"}],je=[]}async function Za(){return null}async function er(){return null}async function ia(e,t=!1){return null}async function Vn(e,t=!1){return null}async function Oe(e){e&&(await Vn(),bn())}function Rt(){const e=document.getElementById("sim-team-select"),t=document.getElementById("new-sim-team"),n=document.getElementById("sim-current-team-label"),a=nn();n&&(n.textContent=`[${a.name}]`),e&&(e.innerHTML="",Se.forEach(s=>{const r=document.createElement("option");r.value=s.id,r.textContent=s.name,e.appendChild(r)}),e.value=Le),t&&(t.innerHTML="",Se.forEach(s=>{const r=document.createElement("option");r.value=s.id,r.textContent=s.name,t.appendChild(r)}),t.value=Le)}function da(){const e=document.getElementById("sim-template-select-inline"),t=document.getElementById("new-sim-template");e&&(e.innerHTML='<option value="">(選択して適用)</option>',wt.forEach(n=>{const a=document.createElement("option");a.value=n.id,a.textContent=n.name,e.appendChild(a)})),t&&(t.innerHTML='<option value="">(未配置から開始)</option>',wt.forEach(n=>{const a=document.createElement("option");a.value=n.id,a.textContent=n.name,t.appendChild(a)}))}async function Co(e="",t=null,n=null,a=null){const s="pat_"+Date.now(),r=t||Le,o=Se.find(u=>u.id===r)||nn();let i={},d={},l=a!==null?a:Q;if(n){const u=wt.find(f=>f.id===n);u&&(i=JSON.parse(JSON.stringify(u.basePositions||{})),d=JSON.parse(JSON.stringify(u.battingOrder||{})),l=u.mode||l)}Q=l,Le=r;const c={id:s,name:e||"新規データ",teamId:r,mode:Q,basePositions:i,customSubstitutions:[],battingOrder:d,headerInfo:{date:"",tournament:"",teamHome:o.name||"ありんこアントス",teamVisitor:"",manager:"",captain:"",scorer:"",stadium:"",time:""}};je.push(c),Pe=s,await Oe(c),Rt(),Ft(),bn();const m=document.getElementById("sim-pattern-select");m&&(m.value=s)}function bn(){const e=document.getElementById("sim-pattern-select");e&&(e.innerHTML='<option value="">選択してください...</option>',je.forEach(t=>{const n=document.createElement("option");n.value=t.id;const a=t.isSynced===!1?" (未同期)":"",s=Se.find(o=>o.id===t.teamId),r=s?`[${s.name}] `:"";n.textContent=r+t.name+a,e.appendChild(n)}),Pe&&(e.value=Pe))}function Ft(){const e=document.getElementById("btn-sim-mode-9"),t=document.getElementById("btn-sim-mode-10");Q===9?(e.className="px-3 py-1.5 text-xs font-bold bg-amber-600 text-white transition",t.className="px-3 py-1.5 text-xs font-bold bg-white text-gray-700 border-l hover:bg-gray-50 transition"):(e.className="px-3 py-1.5 text-xs font-bold bg-white text-gray-700 transition",t.className="px-3 py-1.5 text-xs font-bold bg-amber-600 text-white border-l hover:bg-gray-50 transition")}function Bn(e){const t={...e.basePositions||{}},n=Q===9?it:dt;return Object.keys(t).forEach(s=>{n.includes(s)||delete t[s]}),(e.customSubstitutions||[]).filter(s=>s.active).forEach(s=>{if(s.type==="swap"){const{pos1:r,pos2:o}=s.details;if(n.includes(r)&&n.includes(o)){const i=t[r];t[r]=t[o],t[o]=i}}else if(s.type==="sub"){const{outPlayerId:r,inPlayerId:o,pos:i}=s.details;if(r){const d=Object.keys(t).find(l=>t[l]===r);d&&(t[d]=o)}else i&&n.includes(i)&&(t[i]=o)}else if(s.type==="rotation"){const o=s.details.positions.filter(i=>n.includes(i));if(o.length>1){const i=o.map(d=>t[d]);for(let d=0;d<o.length;d++){const l=i[(d-1+o.length)%o.length];t[o[d]]=l}}}}),t}function Sn(e){const t=new Set;return(e.customSubstitutions||[]).filter(a=>a.active).forEach(a=>{a.type==="sub"&&a.details.outPlayerId&&t.add(a.details.outPlayerId)}),t}function un(e){e.battingOrder||(e.battingOrder={});const t=Q===9?it:dt,n=e.basePositions||{},a=new Set;t.forEach(i=>{n[i]&&a.add(n[i])}),Object.keys(e.battingOrder).forEach(i=>{const d=e.battingOrder[i];a.has(d)||delete e.battingOrder[i]});const s=new Set(Object.values(e.battingOrder)),r=[];a.forEach(i=>{s.has(i)||r.push(i)});const o=t.length;for(let i=1;i<=o&&r.length!==0;i++)if(!e.battingOrder[i]){const d=r.shift();e.battingOrder[i]=d}}function ie(){const e=ye();if(!e)return;const t=Bn(e),n=Sn(e),a=new Set(Object.values(t).filter(Boolean));un(e),Ao(a,n),Do(a,n),No(t,e),Po(e),Oo(e),Mo(e)}function Ao(e,t){const n=document.getElementById("sim-players-list"),a=document.getElementById("sim-player-count");if(!n)return;n.innerHTML="";const s=Ln();if(a&&(a.textContent=`${s.length} 人`),s.length===0){n.innerHTML='<span class="text-xs text-gray-400 p-2">このチームに登録されている選手がいません。</span>';return}s.forEach(r=>{const o=e.has(r.id),i=t.has(r.id),d=ve===r.id&&ue==="players-list",l=document.createElement("div");l.className=`sim-player-badge ${o?"assigned":""} ${i?"retired":""} ${d?"selected":""}`,l.setAttribute("data-player-id",r.id),!o&&!i&&(l.setAttribute("draggable","true"),l.addEventListener("dragstart",tr));const c=r.number?`#${r.number} `:"";l.innerHTML=`
            <span>${c}${ce(r.name)}${i?" (交代済)":""}</span>
            <span class="sim-player-delete-btn" data-player-id="${r.id}">×</span>
        `,l.addEventListener("click",m=>{if(m.target.classList.contains("sim-player-delete-btn")){ti(r.id);return}o||i||ar(r.id,"players-list")}),n.appendChild(l)})}function Do(e,t){const n=document.getElementById("sim-bench-list");if(!n)return;n.innerHTML="";const s=Ln().filter(r=>!e.has(r.id)&&!t.has(r.id));if(s.length===0){n.innerHTML='<span class="text-xs text-gray-400 p-1">控え選手はいません。</span>';return}s.forEach(r=>{const o=ve===r.id&&ue==="bench",i=document.createElement("div");i.className=`sim-player-badge sim-bench-badge ${o?"selected":""}`,i.setAttribute("data-player-id",r.id),i.setAttribute("draggable","true");const d=r.number?`#${r.number} `:"";i.innerHTML=`<span>${d}${ce(r.name)}</span>`,i.addEventListener("dragstart",tr),i.addEventListener("click",()=>{ar(r.id,"bench")}),n.appendChild(i)})}function No(e,t){const n=document.getElementById("sim-field-positions");if(!n)return;n.innerHTML="",(Q===9?it:dt).forEach(s=>{const r=e[s],o=me.find(m=>m.id===r),i=(t.basePositions||{})[s]!==r&&r,d=ve&&ue===s,l=document.createElement("div");l.className=`sim-pos-slot pos-${s} ${d?"swap-selected":""}`,l.setAttribute("data-position",s),l.addEventListener("dragover",jo),l.addEventListener("dragleave",Ho),l.addEventListener("drop",Uo),l.addEventListener("click",()=>{Vo(s)});const c=o&&o.number?`#${o.number} `:"";l.innerHTML=`
            <div class="sim-pos-title">${xt[s]}</div>
            <div class="sim-pos-player ${i?"player-changed":""}">
                ${o?c+ce(o.name):'<span class="text-gray-300 text-xs font-normal">未配置</span>'}
            </div>
        `,n.appendChild(l)})}function Po(e){const t=document.getElementById("sim-batting-order-list");if(!t)return;t.innerHTML="";const n=Q===9?it:dt,a=n.length,s=e.basePositions||{},r={};n.forEach(o=>{const i=s[o];i&&(r[i]=o)});for(let o=1;o<=a;o++){const i=e.battingOrder[o],d=i?me.find(g=>g.id===i):null,l=d?r[d.id]:null,c=l?xt[l]:"未配置",m=document.createElement("div");d?m.className="flex items-center justify-between bg-amber-50/50 border border-amber-100 rounded-lg p-2 text-xs transition-colors duration-150":m.className="flex items-center justify-between bg-gray-50/50 border border-dashed border-gray-200 rounded-lg p-2 text-xs text-gray-400 transition-colors duration-150";const u=document.createElement("div");u.className="flex items-center gap-1 shrink-0";const f=document.createElement("button");f.className="px-2 py-1 bg-amber-100 hover:bg-amber-200 disabled:opacity-30 disabled:cursor-not-allowed text-amber-900 font-bold rounded text-[10px] leading-none transition shadow-sm",f.textContent="▲",o===1&&(f.disabled=!0),f.addEventListener("click",()=>$s(o,"up"));const b=document.createElement("button");b.className="px-2 py-1 bg-amber-100 hover:bg-amber-200 disabled:opacity-30 disabled:cursor-not-allowed text-amber-900 font-bold rounded text-[10px] leading-none transition shadow-sm",b.textContent="▼",o===a&&(b.disabled=!0),b.addEventListener("click",()=>$s(o,"down")),u.appendChild(f),u.appendChild(b);let y="";if(d){const g=d.number?`#${d.number} `:"";y=`
                <div class="flex items-center gap-2">
                    <span class="bg-amber-600 text-white font-bold rounded-full w-5 h-5 flex items-center justify-center text-[10px]">${o}</span>
                    <span class="font-bold text-gray-800">${g}${ce(d.name)}</span>
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
            `;m.innerHTML=y,m.appendChild(u),t.appendChild(m)}}async function $s(e,t){const n=ye();if(!n)return;n.battingOrder||(n.battingOrder={});const a=t==="up"?e-1:e+1,r=(Q===9?it:dt).length;if(a<1||a>r)return;const o=n.battingOrder[e],i=n.battingOrder[a];o&&i?(n.battingOrder[e]=i,n.battingOrder[a]=o):o?(n.battingOrder[a]=o,delete n.battingOrder[e]):i&&(n.battingOrder[e]=i,delete n.battingOrder[a]),await Oe(n),ie()}function Xa(e,t,n){if(!e)return{code:"",desc:"",fullDesc:""};if(e.type==="sub"){const{outPlayerId:a,inPlayerId:s}=e.details,r=me.find(y=>y.id===a),o=me.find(y=>y.id===s),i=r?r.name:"不明",d=o?o.name:"不明",l=Object.keys(t).find(y=>t[y]===a),c=l&&dn[l]||"",m=l?xt[l]||"":"選手",u=c?`交代 (${c})`:"交代",f=n?`<span class="font-bold text-amber-900">${ce(i)}</span>に代わって<span class="font-bold text-amber-900">${ce(d)}</span>`:`${i}に代わって${d}`,b=`${m}の${i}に代わりまして、${d}が入ります。`;return{code:u,desc:f,fullDesc:b}}else if(e.type==="rotation"){const a=e.details.positions||[],r=a.map(l=>dn[l]||l).join("-"),o=[];for(let l=0;l<a.length-1;l++){const c=a[l],m=a[l+1],u=t[c],f=me.find(b=>b.id===u);if(f){const b=n?`<span class="font-bold text-amber-900">${ce(f.name)}</span>`:f.name;o.push(`${b}が${xt[m]}`)}}const i=o.join("、"),d=i?`${i}へ。`:"ポジション交代";return{code:r,desc:i,fullDesc:d}}else if(e.type==="swap"){const{pos1:a,pos2:s}=e.details,r=t[a],o=t[s],i=me.find(x=>x.id===r),d=me.find(x=>x.id===o),l=dn[a]||a,c=dn[s]||s,m=xt[a]||"",u=xt[s]||"",f=i?i.name:"未配置",b=d?d.name:"未配置",y=`${l}⇔${c}`,g=n?`<span class="font-bold text-amber-900">${ce(f)}</span>と<span class="font-bold text-amber-900">${ce(b)}</span>の入れ替え`:`${f}と${b}の入れ替え`,p=`${m}の${f}と${u}の${b}が入れ替わります。`;return{code:y,desc:g,fullDesc:p}}return{code:"",desc:"",fullDesc:""}}function Oo(e){const t=document.getElementById("sim-sub-rules-list");if(!t)return;t.innerHTML="";const n=e.customSubstitutions||[];if(n.length===0){t.innerHTML='<p class="text-xs text-gray-400 text-center py-4">登録された交代はありません。</p>';return}const a=Q===9?it:dt;let s={...e.basePositions||{}};n.forEach(r=>{const o=Xa(r,s,!0);if(r.active){if(r.type==="swap"){const{pos1:l,pos2:c}=r.details;if(a.includes(l)&&a.includes(c)){const m=s[l];s[l]=s[c],s[c]=m}}else if(r.type==="sub"){const{outPlayerId:l,inPlayerId:c,pos:m}=r.details;if(l){const u=Object.keys(s).find(f=>s[f]===l);u&&(s[u]=c)}else m&&a.includes(m)&&(s[m]=c)}else if(r.type==="rotation"){const c=r.details.positions.filter(m=>a.includes(m));if(c.length>1){const m=c.map(u=>s[u]);for(let u=0;u<c.length;u++){const f=m[(u-1+c.length)%c.length];s[c[u]]=f}}}}const i=document.createElement("div");i.className=`sub-rule-card ${r.active?"active":""}`;const d=r.name?`<span class="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded leading-none inline-block mb-1 border border-amber-200/50">${ce(r.name)}</span>`:"";i.innerHTML=`
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
        `,i.querySelector('input[type="checkbox"]').addEventListener("change",l=>{Ro(r.id,l.target.checked)}),i.querySelector(".btn-delete-rule").addEventListener("click",()=>{qo(r.id)}),t.appendChild(i)})}function Mo(e){const t=document.getElementById("sim-announcement-logs");if(!t)return;t.innerHTML="";const n=(e.customSubstitutions||[]).filter(r=>r.active);if(n.length===0){t.innerHTML='<p class="text-xs text-gray-400 text-center py-2">適用中の交代はありません（基本配置のままです）。</p>';return}const a=Q===9?it:dt;let s={...e.basePositions||{}};n.forEach(r=>{const o=Xa(r,s,!1);if(r.type==="swap"){const{pos1:l,pos2:c}=r.details;if(a.includes(l)&&a.includes(c)){const m=s[l];s[l]=s[c],s[c]=m}}else if(r.type==="sub"){const{outPlayerId:l,inPlayerId:c,pos:m}=r.details;if(l){const u=Object.keys(s).find(f=>s[f]===l);u&&(s[u]=c)}else m&&a.includes(m)&&(s[m]=c)}else if(r.type==="rotation"){const c=r.details.positions.filter(m=>a.includes(m));if(c.length>1){const m=c.map(u=>s[u]);for(let u=0;u<c.length;u++){const f=m[(u-1+c.length)%c.length];s[c[u]]=f}}}const i=r.name?`【${ce(r.name)}】`:"",d=document.createElement("div");d.className="announcement-item",d.innerHTML=`
            <span class="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0">${o.code}</span>
            <span class="text-xs font-semibold truncate text-amber-900">${i}${o.fullDesc}</span>
        `,t.appendChild(d)})}function Te(){const e=ye();if(!e)return;const t=Q===9?it:dt,n=document.getElementById("sub-player-out"),a=document.getElementById("sub-player-in"),s=Bn(e),r=new Set(Object.values(s).filter(Boolean)),o=Sn(e);if(n&&(n.innerHTML="",t.forEach(d=>{var c;const l=s[d];if(l){const m=((c=me.find(f=>f.id===l))==null?void 0:c.name)||"未配置",u=document.createElement("option");u.value=l,u.textContent=`${m} (${xt[d]})`,n.appendChild(u)}})),a){a.innerHTML="";const l=Ln().filter(c=>!r.has(c.id)&&!o.has(c.id));l.length===0?a.innerHTML='<option value="">控え選手なし</option>':l.forEach(c=>{const m=document.createElement("option");m.value=c.id,m.textContent=c.name,a.appendChild(m)})}const i=document.getElementById("rot-input-text");i&&(i.value="")}async function Ro(e,t){const n=ye();if(!n)return;const a=n.customSubstitutions.find(s=>s.id===e);a&&(a.active=t,await Oe(n),Te(),ie())}async function Fo(){const e=ye();if(!e)return;const t=document.getElementById("rule-type-select"),n=t?t.value:"rotation";let a={};if(n==="sub"){const d=document.getElementById("sub-player-out").value,l=document.getElementById("sub-player-in").value;if(!d){alert("退く選手を選択してください。");return}if(!l){alert("入る控え選手を選択してください。");return}a={outPlayerId:d,inPlayerId:l}}else if(n==="rotation"){const d=document.getElementById("rot-input-text"),l=d?d.value.trim():"";if(!l){alert("交代ルートを入力してください（例: 1-3-1）。");return}if(!/^[0-9a-zA-Z]+(-[0-9a-zA-Z]+)*$/.test(l)){alert("入力形式が正しくありません。半角数字・英字とハイフンで入力してください（例: 1-3-1）。");return}const c=l.split("-").filter(Boolean);if(c.length<2){alert("交代には最低2つのポジションが必要です（例: 1-3）。");return}const m=Q===9?it:dt,u=[];for(const f of c){const b=So[f];if(!b){alert(`無効なポジション番号「${f}」が含まれています。1〜9またはDHを指定してください。`);return}if(!m.includes(b)){alert(`ポジション「${f}」(${xt[b]||b})は、現在の守備モード（DH${Q===10?"あり":"なし"}）では使用できません。`);return}u.push(b)}for(let f=0;f<u.length-1;f++)if(u[f]===u[f+1]){alert("隣り合うポジションに同じものを指定することはできません（例: 1-1-3 は不可）。");return}a={positions:u}}const s=document.getElementById("rule-name-input"),r=s?s.value.trim():"",o={id:"rule_"+Date.now(),name:r,type:n,active:!1,details:a};e.customSubstitutions||(e.customSubstitutions=[]),e.customSubstitutions.push(o),await Oe(e),s&&(s.value="");const i=document.getElementById("rot-input-text");i&&(i.value=""),Te(),ie(),Gn("subrules")}async function qo(e){const t=ye();t&&(t.customSubstitutions=t.customSubstitutions.filter(n=>n.id!==e),await Oe(t),Te(),ie())}function Gn(e){const t=document.getElementById("tab-btn-setup"),n=document.getElementById("tab-btn-subrules"),a=document.getElementById("panel-setup"),s=document.getElementById("panel-subrules");e==="setup"?(t.className="flex-1 py-2 px-3 text-center text-sm font-bold bg-amber-600 text-white transition",n.className="flex-1 py-2 px-3 text-center text-sm font-bold bg-white text-gray-700 border-l hover:bg-gray-50 transition",a.classList.remove("hidden"),s.classList.add("hidden")):(t.className="flex-1 py-2 px-3 text-center text-sm font-bold bg-white text-gray-700 transition",n.className="flex-1 py-2 px-3 text-center text-sm font-bold bg-amber-600 text-white border-l hover:bg-gray-50 transition font-bold",a.classList.add("hidden"),s.classList.remove("hidden"))}function tr(e){const t=e.currentTarget.getAttribute("data-player-id");e.dataTransfer.setData("text/plain",t);let n="bench";e.currentTarget.parentNode.id==="sim-players-list"&&(n="players-list"),e.dataTransfer.setData("source-pos",n)}function jo(e){e.preventDefault(),e.currentTarget.classList.add("drag-over")}function Ho(e){e.currentTarget.classList.remove("drag-over")}function Uo(e){e.preventDefault(),e.currentTarget.classList.remove("drag-over");const t=e.dataTransfer.getData("text/plain"),n=e.currentTarget.getAttribute("data-position");!t||!n||nr(t,n)}async function nr(e,t){const n=ye();if(!n)return;n.basePositions||(n.basePositions={});let a=null;Object.keys(n.basePositions).forEach(r=>{n.basePositions[r]===e&&(a=r)});const s=n.basePositions[t];a&&(n.basePositions[a]=s),n.basePositions[t]=e,un(n),await Oe(n),ve=null,ue=null,Te(),ie()}function ar(e,t){ve===e&&ue===t?(ve=null,ue=null):(ve=e,ue=t),ie()}async function Vo(e){const t=ye();if(!t)return;t.basePositions||(t.basePositions={});const n=t.basePositions[e];if(ve)if(ue!=="players-list"&&ue!=="bench"){const a=t.basePositions[ue];t.basePositions[ue]=n,t.basePositions[e]=a,un(t),await Oe(t),ve=null,ue=null,Te(),ie()}else nr(ve,e);else n&&(ve=n,ue=e,ie())}async function Go(e){const t=ye();t&&(t.basePositions||(t.basePositions={}),t.basePositions[e]=null,un(t),await Oe(t),ve=null,ue=null,Te(),ie())}async function Wo(){const e=prompt(`新しいチーム名を入力してください:
(例: ありんこアントス (B軍), ジュニア選抜など)`);if(!e||!e.trim())return;const t=e.trim();if(Se.some(a=>a.name===t)){alert("同じ名前のチームが既に存在します。");return}const n={id:"team_"+Date.now(),name:t};Se.push(n),Le=n.id,await Za(),Rt(),ie()}async function zo(){const e=nn(),t=prompt("チーム名を変更してください:",e.name);if(!t||!t.trim())return;const n=t.trim();if(n!==e.name){if(Se.some(a=>a.id!==e.id&&a.name===n)){alert("同じ名前のチームが既に存在します。");return}e.name=n,await Za(),Rt(),bn(),ie()}}async function Jo(){if(Se.length<=1){alert("登録チームが1つのみのため、削除できません。");return}const e=nn(),t=Ln();let n=`チーム「${e.name}」を削除しますか？`;if(t.length>0&&(n+=`
※このチームに登録されている ${t.length} 名の選手データも削除されます。`),!confirm(n))return;const a=new Set(t.map(s=>s.id));me=me.filter(s=>!a.has(s.id));for(const s of t)await ia(s,!0);Se=Se.filter(s=>s.id!==e.id),Le=Se[0].id,await Za(),Rt(),ie()}function Ko(e){Le=e.target.value;const t=document.getElementById("sim-current-team-label"),n=nn();t&&(t.textContent=`[${n.name}]`),ve=null,ue=null,Te(),ie()}async function Yo(){const e=ye();if(!e)return;const t=e.name?`${e.name}の基本形`:"基本配置パターン",n=prompt(`初期パターン（テンプレート）の登録名を入力してください:
(例: A軍 守備基本形、10人制DH基本配置など)`,t);if(!n||!n.trim())return;const a=n.trim(),s={id:"tmpl_"+Date.now(),name:a,mode:Q,basePositions:JSON.parse(JSON.stringify(e.basePositions||{})),battingOrder:JSON.parse(JSON.stringify(e.battingOrder||{}))};wt.push(s),await er(),da(),alert(`初期パターン「${a}」を登録しました。
新規作成時や初期パターンセレクタからいつでも適用できます。`)}async function Qo(e){if(!e)return;const t=wt.find(s=>s.id===e);if(!t)return;if(!confirm(`初期パターン「${t.name}」を現在のグラウンドに適用しますか？
（現在のスタメン配置・打順が上書きされます）`)){const s=document.getElementById("sim-template-select-inline");s&&(s.value="");return}const n=ye();n&&(n.basePositions=JSON.parse(JSON.stringify(t.basePositions||{})),n.battingOrder=JSON.parse(JSON.stringify(t.battingOrder||{})),t.mode&&(n.mode=t.mode,Q=t.mode,Ft()),await Oe(n));const a=document.getElementById("sim-template-select-inline");a&&(a.value=""),Te(),ie()}async function Zo(){const e=document.getElementById("sim-template-select-inline"),t=e?e.value:"";if(!t){alert("削除したい初期パターンを選択してください。");return}const n=wt.find(a=>a.id===t);n&&confirm(`初期パターン「${n.name}」を削除しますか？`)&&(wt=wt.filter(a=>a.id!==t),await er(),da(),alert(`初期パターン「${n.name}」を削除しました。`))}function Xo(){const e=document.getElementById("sim-new-modal");if(!e)return;Rt(),da();const t=document.getElementById("new-sim-name");if(t){const r=new Date,o=`${r.getFullYear()}/${String(r.getMonth()+1).padStart(2,"0")}/${String(r.getDate()).padStart(2,"0")}`;t.value=`${o} 練習試合`}const n=document.getElementById("new-sim-team");n&&(n.value=Le);const a=document.getElementById("new-sim-template");a&&(a.value="");const s=document.querySelector(`input[name="new-sim-dh-mode"][value="${Q}"]`);s&&(s.checked=!0),e.classList.remove("hidden")}function Pa(){const e=document.getElementById("sim-new-modal");e&&e.classList.add("hidden")}async function ei(){const e=document.getElementById("new-sim-name"),t=document.getElementById("new-sim-team"),n=document.getElementById("new-sim-template"),a=document.querySelector('input[name="new-sim-dh-mode"]:checked'),s=e?e.value.trim():"",r=t?t.value:Le,o=n?n.value:null,i=a?parseInt(a.value,10):9;if(!s){alert("シミュレーションデータ名を入力してください。");return}await Co(s,r,o,i),Pa(),Te(),ie()}async function wa(){const e=document.getElementById("sim-new-player-input"),t=document.getElementById("sim-new-player-number");if(!e)return;const n=e.value.trim(),a=t?t.value.trim():"";if(!n)return;if(Ln().some(o=>o.name===n)){alert("このチームには同じフルネームの選手が既に登録されています。");return}const r={id:"p_"+Date.now()+"_"+Math.random().toString(36).substr(2,5),name:n,number:a,teamId:Le};me.push(r),await ia(),e.value="",t&&(t.value=""),Te(),ie()}async function ti(e){const t=me.find(n=>n.id===e);if(t&&confirm(`選手「${t.name}」を削除しますか？
（データベースの全データ配置・交代設定からも削除されます）`)){me=me.filter(n=>n.id!==e),await ia(t,!0);for(const n of je){let a=!1;if(n.basePositions||(n.basePositions={}),Object.keys(n.basePositions).forEach(s=>{n.basePositions[s]===e&&(n.basePositions[s]=null,a=!0)}),n.battingOrder&&Object.keys(n.battingOrder).forEach(s=>{n.battingOrder[s]===e&&(delete n.battingOrder[s],a=!0)}),n.customSubstitutions){const s=n.customSubstitutions.length;n.customSubstitutions=n.customSubstitutions.filter(r=>r.type==="sub"?r.details.outPlayerId!==e&&r.details.inPlayerId!==e:!0),n.customSubstitutions.length!==s&&(a=!0)}a&&await Oe(n)}ve===e&&(ve=null,ue=null),Te(),ie()}}async function ni(){const e=document.getElementById("sim-pattern-select");if(!e)return;const t=e.value;let n=!1,a=null,s="";const r=ye();if(t){const o=e.options[e.selectedIndex];confirm(`現在「${o.text}」が選択されています。
このデータに上書き保存しますか？
（「キャンセル」を選ぶと新規保存になります）`)&&(n=!0,s=o.text,a=t)}if(!n){const o=r?r.name:"新規配置データ",i=prompt("保存名を入力してください：",o);if(!i)return;if(s=i.trim(),!s){alert("有効な保存名を入力してください。");return}}try{if(n&&a){if(r){r.name=s,r.teamId=Le,r.mode=Q;const i=await Vn(r);if(i)throw i;alert(`データ「${s}」を上書き保存しました。`)}}else{const i="pat_"+Date.now(),d=nn(),l={id:i,name:s,teamId:Le,mode:Q,basePositions:r?{...r.basePositions||{}}:{},customSubstitutions:r?JSON.parse(JSON.stringify(r.customSubstitutions||[])):[],battingOrder:r?{...r.battingOrder||{}}:{},headerInfo:r?JSON.parse(JSON.stringify(r.headerInfo||{})):{date:"",tournament:"",teamHome:d.name||"ありんこアントス",teamVisitor:"",manager:"",captain:"",scorer:"",stadium:"",time:""}};je.push(l),Pe=i;const c=await Vn(l);if(c)throw c;alert(`データ「${s}」を保存しました。`)}bn();const o=document.getElementById("sim-pattern-select");o&&(o.value=Pe),ie()}catch(o){console.error("Save pattern error:",o),alert(`保存に失敗しました。
エラー詳細: ${o.message||o}`)}}async function ai(){const e=ye();if(!e||!e.id){alert("削除する配置データが選択されていません。");return}if(!confirm(`配置データ「${e.name}」を削除しますか？
（データベースから削除されます）`))return;je=je.filter(n=>n.id!==Pe);const t=await Vn(e,!0);je.length>0?Pe=je[0].id:Pe="",bn(),alert(t?`データ「${e.name}」のデータベースからの削除に失敗しました。
エラー詳細: ${t.message||t}`:`データ「${e.name}」を削除しました。`),ve=null,ue=null,Ft(),Te(),ie()}async function si(e){const t=e.target.value;if(!t)Pe="",Rn=null,ve=null,ue=null,ie();else{Pe=t;const n=ye();n&&(Q=n.mode||9,n.teamId&&Se.some(a=>a.id===n.teamId)&&(Le=n.teamId,Rt())),ve=null,ue=null,Ft(),Te(),ie()}}function ri(){const e=ye();if(!e)return;const t=Bn(e),n=Sn(e),a=e.headerInfo||{};document.getElementById("member-input-date").value=a.date||"",document.getElementById("member-input-tournament").value=a.tournament||"",document.getElementById("member-input-team-home").value=a.teamHome||"ありんこアントス",document.getElementById("member-input-team-visitor").value=a.teamVisitor||"",document.getElementById("member-input-manager").value=a.manager||"",document.getElementById("member-input-captain").value=a.captain||"",document.getElementById("member-input-scorer").value=a.scorer||"",document.getElementById("member-input-stadium").value=a.stadium||"",document.getElementById("member-input-time").value=a.time||"",sr(e,t,n);const s=document.getElementById("sim-member-modal");s&&s.classList.remove("hidden")}function oi(){const e=ye();if(!e)return;e.headerInfo||(e.headerInfo={}),e.headerInfo.date=document.getElementById("member-input-date").value.trim(),e.headerInfo.tournament=document.getElementById("member-input-tournament").value.trim(),e.headerInfo.teamHome=document.getElementById("member-input-team-home").value.trim(),e.headerInfo.teamVisitor=document.getElementById("member-input-team-visitor").value.trim(),e.headerInfo.manager=document.getElementById("member-input-manager").value.trim(),e.headerInfo.captain=document.getElementById("member-input-captain").value.trim(),e.headerInfo.scorer=document.getElementById("member-input-scorer").value.trim(),e.headerInfo.stadium=document.getElementById("member-input-stadium").value.trim(),e.headerInfo.time=document.getElementById("member-input-time").value.trim(),Oe(e);const t=Bn(e),n=Sn(e);sr(e,t,n)}function sr(e,t,n){const a=Q===9?it:dt,s=e.headerInfo||{};let r=`【 メンバー表 (Ants) 】
`;r+=`日時: ${s.date||"未設定"}  時間: ${s.time||"未設定"}
`,r+=`大会: ${s.tournament||"未設定"}  球場: ${s.stadium||"未設定"}
`,r+=`対戦: ${s.teamHome||"未設定"} vs ${s.teamVisitor||"未設定"}
`,r+=`監督: ${s.manager||"未設定"}  主将: ${s.captain||"未設定"}  スコアラー: ${s.scorer||"未設定"}
`,r+=`------------------------------------

`,r+=`◆ スターティングメンバー (打順順)
`;const o=a.length,i=e.basePositions||{},d={};a.forEach(f=>{const b=i[f];b&&(d[b]=f)});for(let f=1;f<=o;f++){const b=e.battingOrder[f];if(b){const y=me.find(p=>p.id===b),g=d[b];if(y&&g){const p=dn[g],x=y.number?` [#${y.number}]`:"";r+=`${f}. [${p}] ${xt[g]} : ${y.name}${x}
`}}}r+=`
◆ 控え選手 (ベンチ)
`;const l=new Set(Object.values(t).filter(Boolean)),c=me.filter(f=>!l.has(f.id)&&!n.has(f.id));c.length===0?r+=`(なし)
`:c.forEach(f=>{const b=f.number?` [#${f.number}]`:"";r+=`・${f.name}${b}
`}),r+=`
◆ 交代履歴
`;const m=(e.customSubstitutions||[]).filter(f=>f.active);if(m.length===0)r+=`(なし: 基本配置のままです)
`;else{let f={...e.basePositions||{}};m.forEach((b,y)=>{const g=Xa(b,f,!1);if(r+=`${y+1}. [${g.code}] ${g.fullDesc}
`,b.type==="swap"){const{pos1:p,pos2:x}=b.details,v=f[p];f[p]=f[x],f[x]=v}else if(b.type==="sub"){const{outPlayerId:p,inPlayerId:x}=b.details,v=Object.keys(f).find(h=>f[h]===p);v&&(f[v]=x)}else if(b.type==="rotation"){const p=b.details.positions,x=p.map(v=>f[v]);for(let v=0;v<p.length;v++){const h=x[(v-1+p.length)%p.length];f[p[v]]=h}}})}const u=document.getElementById("sim-member-text");u&&(u.value=r)}function ii(){const e=document.getElementById("sim-member-text");e&&(e.select(),document.execCommand("copy"),alert("メンバー表をクリップボードにコピーしました！"))}function ks(){const e=document.getElementById("sim-member-modal");e&&e.classList.add("hidden")}function di(){const e=ye();if(!e)return;const t=Bn(e),n=Sn(e),a=Q===9?it:dt,s=e.headerInfo||{},r=e.basePositions||{},o={};a.forEach(b=>{const y=r[b];y&&(o[y]=b)});const i=a.length,d=[];for(let b=1;b<=i;b++){const y=e.battingOrder[b];if(y){const g=me.find(x=>x.id===y),p=o[y];g&&p&&d.push({order:b,posNum:dn[p],name:g.name,number:g.number||""})}}for(;d.length<9;)d.push({order:d.length+1,posNum:"",name:"",number:""});const l=new Set(Object.values(t).filter(Boolean)),c=me.filter(b=>!l.has(b.id)&&!n.has(b.id)),m=[];for(let b=0;b<6;b++){const y=b*2,g=b*2+1,p=c[y],x=c[g];m.push({leftName:p?p.name:"",leftNumber:p&&p.number||"",rightName:x?x.name:"",rightNumber:x&&x.number||""})}let u="";for(let b=1;b<=4;b++){let y="";d.forEach(v=>{y+=`
                <tr>
                    <td class="cell-order">${v.order}</td>
                    <td class="cell-pos">${v.posNum}</td>
                    <td class="cell-name">${ce(v.name)}</td>
                    <td class="cell-number">${v.number}</td>
                </tr>
            `}),Q===10&&d.length<10&&(y+='<tr><td class="cell-order">10</td><td class="cell-pos"></td><td class="cell-name"></td><td class="cell-number"></td></tr>');const g=Q===10?11:10,p=d.length;for(let v=p;v<g;v++)y+='<tr><td class="cell-order"></td><td class="cell-pos"></td><td class="cell-name"></td><td class="cell-number"></td></tr>';let x="";m.forEach(v=>{x+=`
                <tr>
                    <td class="cell-bench-name">${ce(v.leftName)}</td>
                    <td class="cell-bench-num">${v.leftNumber}</td>
                    <td class="cell-bench-name">${ce(v.rightName)}</td>
                    <td class="cell-bench-num">${v.rightNumber}</td>
                </tr>
            `}),u+=`
            <div class="sheet-card">
                <div class="card-page-idx">(${b}/4)</div>
                <div class="card-title">メンバー表</div>
                
                <div class="header-table-wrapper">
                    <!-- 1行目: 日付・大会名 -->
                    <table class="table-header table-header-top">
                        <tr>
                            <td class="cell-date font-variable">${ce(s.date||"")}</td>
                            <td class="cell-tournament font-variable">${ce(s.tournament||"")}</td>
                        </tr>
                    </table>
                    <!-- 2行目: 自チーム・相手チーム -->
                    <table class="table-header table-header-bottom">
                        <tr>
                            <td class="cell-team-label-l cell-label-vertical"><span class="label-v-wrap">チーム</span></td>
                            <td class="cell-team-val font-variable">${ce(s.teamHome||"")}</td>
                            <td class="cell-team-label-r cell-label-vertical"><span class="label-v-wrap">相手チーム</span></td>
                            <td class="cell-team-val font-variable">${ce(s.teamVisitor||"")}</td>
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
                        ${x}
                    </tbody>
                </table>
                
                <table class="table-footer">
                    <tr>
                        <td class="footer-label">監督</td>
                        <td class="footer-val font-variable">${ce(s.manager||"")}</td>
                        <td class="footer-label">主将</td>
                        <td class="footer-val font-variable">${ce(s.captain||"")}</td>
                        <td class="footer-label font-sans leading-none" style="font-size: 6.5px; padding: 0; text-align: center; white-space: nowrap;"><span style="display: inline-block; transform: scaleX(0.75); transform-origin: center;">スコアラー</span></td>
                        <td class="footer-val font-variable">${ce(s.scorer||"")}</td>
                    </tr>
                    <tr>
                        <td class="footer-label">球場</td>
                        <td colspan="3" class="footer-val font-variable">${ce(s.stadium||"")}</td>
                        <td class="footer-label">時間</td>
                        <td class="footer-val font-variable">${ce(s.time||"")}</td>
                    </tr>
                </table>
            </div>
        `}const f=window.open("","_blank");if(!f){alert("ポップアップブロックが有効になっているため、印刷用画面を開けませんでした。許可してください。");return}f.document.write(`
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
                ${u}
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
    `),f.document.close()}function li(){const e=ye();if(!e)return;const t={version:"ants-sim-3.0",players:me,pattern:e},n=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),a=URL.createObjectURL(n),s=document.createElement("a");s.href=a,s.download=`ants_positions_${e.name.replace(/[\s/\\?%*:|"<>\.]/g,"_")}.json`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(a)}function ci(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=async function(a){try{const s=JSON.parse(a.target.result);if(s.version!=="ants-sim-3.0"&&s.version!=="ants-sim-2.0"&&s.version!=="ants-sim-1.0"){alert("ファイル形式が正しくありません。");return}if(confirm(`インポートを実行しますか？
※既存の選手リストと配置データがマージ/追加されます。`)){for(const r of s.players)me.some(o=>o.id===r.id||o.name===r.name)||(me.push(r),await ia(r));if(s.version==="ants-sim-3.0"){const r=s.pattern;r.id="pat_"+Date.now(),r.name=r.name+" (インポート)",je.push(r),Pe=r.id,Q=r.mode,await Oe(r)}else if(s.version==="ants-sim-2.0"){const r=s.pattern;r.id="pat_"+Date.now(),r.name=r.name+" (インポート)",r.mode=r.mode||9,r.battingOrder={},r.headerInfo={},je.push(r),Pe=r.id,Q=r.mode,await Oe(r)}else{const r=s.pattern,o=r.innings&&r.innings[0]?r.innings[0].positions:{},i={id:"pat_"+Date.now(),name:r.name+" (旧移行)",mode:r.mode||9,basePositions:o,customSubstitutions:[],battingOrder:{},headerInfo:{}};je.push(i),Pe=i.id,Q=i.mode,await Oe(i)}Ft(),Te(),ie(),alert("インポートが完了しました。")}}catch(s){console.error(s),alert("ファイルの読み込みに失敗しました。")}e.target.value=""},n.readAsText(t)}function ui(){var s,r,o,i,d,l,c,m,u,f,b,y,g,p,x,v,h,$,L,E,I,w,k,_,A,P,D,O,q,S,C,N,T;const e=document.getElementById("btn-toggle-players-panel"),t=document.getElementById("players-panel-content"),n=document.getElementById("icon-toggle-players");e&&t&&n&&(e.addEventListener("click",()=>{const W=t.classList.toggle("hidden");n.textContent=W?"▼":"▲",localStorage.setItem("ants_sim_players_panel_collapsed",W?"true":"false")}),localStorage.getItem("ants_sim_players_panel_collapsed")==="true"&&(t.classList.add("hidden"),n.textContent="▼")),(s=document.getElementById("tab-btn-setup"))==null||s.addEventListener("click",()=>Gn("setup")),(r=document.getElementById("tab-btn-subrules"))==null||r.addEventListener("click",()=>Gn("subrules")),(o=document.getElementById("rule-type-select"))==null||o.addEventListener("change",M=>{const W=M.target.value;document.getElementById("form-sub").classList.add("hidden"),document.getElementById("form-rotation").classList.add("hidden"),W==="sub"?document.getElementById("form-sub").classList.remove("hidden"):W==="rotation"&&document.getElementById("form-rotation").classList.remove("hidden")}),(i=document.getElementById("btn-export-member-table"))==null||i.addEventListener("click",ri),(d=document.getElementById("btn-copy-member-text"))==null||d.addEventListener("click",ii),(l=document.getElementById("btn-close-member-modal"))==null||l.addEventListener("click",ks),(c=document.getElementById("btn-close-member-modal-footer"))==null||c.addEventListener("click",ks),(m=document.getElementById("btn-print-member-table"))==null||m.addEventListener("click",di),["member-input-date","member-input-tournament","member-input-team-home","member-input-team-visitor","member-input-manager","member-input-captain","member-input-scorer","member-input-stadium","member-input-time"].forEach(M=>{var W;(W=document.getElementById(M))==null||W.addEventListener("input",oi)}),(u=document.getElementById("btn-create-sub-rule"))==null||u.addEventListener("click",Fo),(f=document.getElementById("btn-add-sim-player"))==null||f.addEventListener("click",wa),(b=document.getElementById("sim-new-player-input"))==null||b.addEventListener("keypress",M=>{M.key==="Enter"&&wa()}),(y=document.getElementById("sim-new-player-number"))==null||y.addEventListener("keypress",M=>{M.key==="Enter"&&wa()}),(g=document.getElementById("sim-team-select"))==null||g.addEventListener("change",Ko),(p=document.getElementById("btn-add-sim-team"))==null||p.addEventListener("click",Wo),(x=document.getElementById("btn-edit-sim-team"))==null||x.addEventListener("click",zo),(v=document.getElementById("btn-delete-sim-team"))==null||v.addEventListener("click",Jo),(h=document.getElementById("sim-template-select-inline"))==null||h.addEventListener("change",M=>Qo(M.target.value)),($=document.getElementById("btn-save-as-template"))==null||$.addEventListener("click",Yo),(L=document.getElementById("btn-delete-template"))==null||L.addEventListener("click",Zo),(E=document.getElementById("btn-open-new-sim-modal"))==null||E.addEventListener("click",Xo),(I=document.getElementById("btn-close-new-sim-modal"))==null||I.addEventListener("click",Pa),(w=document.getElementById("btn-close-new-sim-modal-footer"))==null||w.addEventListener("click",Pa),(k=document.getElementById("btn-create-new-sim"))==null||k.addEventListener("click",ei),(_=document.getElementById("sim-pattern-select"))==null||_.addEventListener("change",si),(A=document.getElementById("btn-save-sim-pattern"))==null||A.addEventListener("click",ni),(P=document.getElementById("btn-delete-sim-pattern"))==null||P.addEventListener("click",ai),(D=document.getElementById("btn-sim-mode-9"))==null||D.addEventListener("click",async()=>{if(Q!==9){Q=9,Ft();const M=ye();M&&(M.mode=9,un(M),await Oe(M)),Te(),ie()}}),(O=document.getElementById("btn-sim-mode-10"))==null||O.addEventListener("click",async()=>{if(Q!==10){Q=10,Ft();const M=ye();M&&(M.mode=10,un(M),await Oe(M)),Te(),ie()}}),(q=document.getElementById("btn-export-sim"))==null||q.addEventListener("click",li),(S=document.getElementById("import-sim-input"))==null||S.addEventListener("change",ci),(C=document.getElementById("btn-back-to-menu-sim"))==null||C.addEventListener("click",()=>{ve=null,ue=null,K("app-menu-view")}),(N=document.getElementById("btn-logout-sim"))==null||N.addEventListener("click",()=>{var M;(M=document.getElementById("btn-logout"))==null||M.click()}),(T=document.getElementById("sim-bench-list"))==null||T.addEventListener("click",M=>{M.target.id==="sim-bench-list"&&ve&&ue!=="players-list"&&ue!=="bench"&&Go(ue)})}function ce(e){return typeof e!="string"?"":e.replace(/[&<>'"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[t]||t)}let et=null,Dt=null,qn=!1;const Wn="ants_surveys_v1",zn="ants_survey_responses_v1";let be=[],We=[];const Ls=[{id:"survey_sample_1",title:"【夏季合宿】参加日程調整 & お弁当・合宿Tシャツ注文とりまとめ",description:`少年野球チーム Arinko Ants 夏季合宿（8月開催）の出欠日程および備品・お弁当の事前注文確認です。
**1回の送信で、保護者様ご本人と選手（兄弟含む）全員分の出欠・注文をまとめてご登録いただけます。**
ご不明な点がありましたら役員までお問い合わせください。`,status:"active",deadline:"2026-07-20 23:59",enable_schedule:!0,schedule_options:["8/8(土) 午前 (練習・遠征)","8/8(土) 午後 (練習試合・BBQ)","8/8(土) 宿泊","8/9(日) 終日 (紅白戦・グラウンド納め)"],enable_family:!0,enable_orders:!0,order_items:[{id:"item_lunch_sat",name:"8/8(土) 選手・保護者弁当",price:650,max:10},{id:"item_lunch_sun",name:"8/9(日) 選手・保護者弁当",price:650,max:10},{id:"item_tshirt",name:"合宿記念チームTシャツ",price:2200,max:5},{id:"item_cap",name:" Ants オリジナル冷感タオル",price:800,max:5}],questions:[{id:"q_attendance",type:"single",title:"合宿全体の参加可否をお選びください",required:!0,options:[{label:"参加する（部分参加含む）",skip_to:null},{label:"不参加（全日程）",skip_to:"q_remarks"}],help:"不参加を選択された場合、日程詳細およびお弁当等の注文設問はスキップされます。"},{id:"q_transport",type:"single",title:"現地までの移動手段について",required:!1,options:[{label:"配車（チーム車）を利用希望",skip_to:null},{label:"自車で現地直行（他メンバー同乗可）",skip_to:null},{label:"自車で現地直行（家族のみ）",skip_to:null}],help:""},{id:"q_remarks",type:"text",title:"特記事項・アレルギー・連絡事項など",required:!1,options:[],help:"食物アレルギーや遅刻・早退のご予定等があればご記入ください。"}],created_by:"役員会",created_at:"2026-06-01",updated_at:"2026-06-01"}],Bs=[{id:"resp_sample_1",survey_id:"survey_sample_1",respondent_name:"菱沼 (保護者)",family_members:[{name:"菱沼 健一 (保護者・指導者)",role:"保護者"},{name:"菱沼 翔太 (6年・主将)",role:"選手"}],schedules:{"8/8(土) 午前 (練習・遠征)":"○","8/8(土) 午後 (練習試合・BBQ)":"○","8/8(土) 宿泊":"○","8/9(日) 終日 (紅白戦・グラウンド納め)":"○"},answers:{q_attendance:"参加する（部分参加含む）",q_transport:"自車で現地直行（他メンバー同乗可）",q_remarks:"車出し可能です。道具車としても利用できます。"},orders:{item_lunch_sat:2,item_lunch_sun:2,item_tshirt:1,item_cap:2},total_amount:6400,created_at:"2026-06-02 10:15"}];async function mi({supabaseClient:e,currentUser:t,currentUserRole:n}){et=e,Dt=t,qn=n==="admin"||n==="leader",await rr(),ir(),Tn()}async function rr(){let e=!1,t=!1;if(et){try{const{data:n,error:a}=await et.from("surveys").select("*").order("created_at",{ascending:!1});!a&&n&&n.length>0&&(be=n,e=!0)}catch(n){console.warn("Supabase surveys load failed, using local:",n)}try{const{data:n,error:a}=await et.from("survey_responses").select("*").order("created_at",{ascending:!1});!a&&n&&(We=n,t=!0)}catch(n){console.warn("Supabase survey_responses load failed, using local:",n)}}if(!e)try{const n=localStorage.getItem(Wn);n?be=JSON.parse(n):(be=[...Ls],localStorage.setItem(Wn,JSON.stringify(be)))}catch{be=[...Ls]}if(!t)try{const n=localStorage.getItem(zn);n?We=JSON.parse(n):(We=[...Bs],localStorage.setItem(zn,JSON.stringify(We)))}catch{We=[...Bs]}}async function pi(e,t=!1){const n=be.findIndex(a=>a.id===e.id);n>=0?be[n]=e:be.unshift(e);try{localStorage.setItem(Wn,JSON.stringify(be))}catch(a){console.error(a)}if(et)try{t?await et.from("surveys").insert([e]):await et.from("surveys").update(e).eq("id",e.id)}catch(a){console.warn("Supabase survey save failed:",a)}}async function gi(e){be=be.filter(t=>t.id!==e),We=We.filter(t=>t.survey_id!==e);try{localStorage.setItem(Wn,JSON.stringify(be)),localStorage.setItem(zn,JSON.stringify(We))}catch(t){console.error(t)}if(et)try{await et.from("survey_responses").delete().eq("survey_id",e),await et.from("surveys").delete().eq("id",e)}catch(t){console.warn("Supabase survey delete failed:",t)}}async function fi(e){We.unshift(e);try{localStorage.setItem(zn,JSON.stringify(We))}catch(t){console.error(t)}if(et)try{await et.from("survey_responses").insert([e])}catch(t){console.warn("Supabase response insert failed:",t)}}function Tn(){const e=document.getElementById("info-surveys-container"),t=document.getElementById("info-surveys-empty"),n=document.getElementById("btn-survey-new");if(e){if(n&&(qn?n.classList.remove("hidden"):n.classList.add("hidden")),be.length===0){e.innerHTML="",t&&t.classList.remove("hidden");return}t&&t.classList.add("hidden"),e.innerHTML=be.map(a=>{const s=We.filter(l=>l.survey_id===a.id),r=s.length,o=s.reduce((l,c)=>l+(Number(c.total_amount)||0),0);let i="";a.status==="active"?i='<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">🟢 受付中</span>':a.status==="closed"?i='<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">⚪ 締切済み</span>':i='<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">🟡 下書き</span>';const d=[];return a.enable_schedule&&d.push("📅 日程調整"),a.enable_family&&d.push("👨‍👩‍👧 家族一括"),a.enable_orders&&d.push("🛒 注文集計"),`
            <div class="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between gap-2 mb-3">
                        ${i}
                        <span class="text-xs text-gray-400 font-mono">期限: ${a.deadline||"なし"}</span>
                    </div>
                    <h3 class="text-base font-bold text-gray-900 mb-2 leading-snug">
                        ${te(a.title)}
                    </h3>
                    <p class="text-xs text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                        ${te(a.description||"")}
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
                        <button class="btn-survey-results px-3 py-1.5 text-xs font-bold bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition border border-purple-200 cursor-pointer" data-id="${a.id}">
                            📊 集計・CSV
                        </button>
                        ${qn?`
                        <button class="btn-survey-edit text-xs text-gray-400 hover:text-blue-600 p-1.5 rounded hover:bg-gray-100 transition cursor-pointer" data-id="${a.id}" title="編集">
                            ✏️
                        </button>
                        <button class="btn-survey-delete text-xs text-gray-400 hover:text-red-600 p-1.5 rounded hover:bg-gray-100 transition cursor-pointer" data-id="${a.id}" title="削除">
                            🗑️
                        </button>
                        `:""}
                    </div>
                </div>
            </div>
        `}).join(""),e.querySelectorAll(".btn-survey-respond").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id");Kn(s)})}),e.querySelectorAll(".btn-survey-share").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id");bi(s)})}),e.querySelectorAll(".btn-survey-results").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id");hi(s)})}),qn&&(e.querySelectorAll(".btn-survey-edit").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id"),r=be.find(o=>o.id===s);r&&or(r)})}),e.querySelectorAll(".btn-survey-delete").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id"),r=be.find(o=>o.id===s);r&&confirm(`アンケート「${r.title}」と、そのすべての回答データを削除しますか？`)&&(await gi(s),Tn())})}))}}function bi(e){const t=`${window.location.origin}${window.location.pathname}#survey-${e}`;navigator.clipboard.writeText(t).then(()=>{alert(`アンケート回答用URLをコピーしました！
LINEやメール等に貼り付けてご案内いただけます。

${t}`)}).catch(()=>{prompt("アンケート回答用URL:",t)})}let ln=null,Z=[],Yt=[],ht=[];function or(e=null){const t=document.getElementById("modal-survey-editor");if(!t)return;ln=e?e.id:null,document.getElementById("survey-editor-modal-title").textContent=e?"アンケートの編集":"新規アンケート作成",document.getElementById("input-survey-title").value=e?e.title:"",document.getElementById("input-survey-desc").value=e&&e.description||"",document.getElementById("select-survey-status").value=e?e.status:"active",document.getElementById("input-survey-deadline").value=e&&e.deadline||"";const n=document.getElementById("chk-survey-enable-schedule"),a=document.getElementById("chk-survey-enable-family"),s=document.getElementById("chk-survey-enable-orders");n.checked=e?!!e.enable_schedule:!0,a.checked=e?!!e.enable_family:!0,s.checked=e?!!e.enable_orders:!1,Yt=e&&e.schedule_options?[...e.schedule_options]:["7/18(土) 午前","7/18(土) 午後","7/19(日) 終日"],ht=e&&e.order_items?JSON.parse(JSON.stringify(e.order_items)):[{id:`item_${Date.now()}_1`,name:"選手用お弁当",price:600,max:10},{id:`item_${Date.now()}_2`,name:"保護者用お弁当",price:700,max:10}],Z=e&&e.questions?JSON.parse(JSON.stringify(e.questions)):[],es(),ts(),Bt(),Ma(),t.classList.remove("hidden")}function Oa(){const e=document.getElementById("modal-survey-editor");e&&e.classList.add("hidden"),ln=null}function Ma(){var s,r;const e=(s=document.getElementById("chk-survey-enable-schedule"))==null?void 0:s.checked,t=(r=document.getElementById("chk-survey-enable-orders"))==null?void 0:r.checked,n=document.getElementById("editor-schedule-section"),a=document.getElementById("editor-orders-section");n&&(n.style.display=e?"block":"none"),a&&(a.style.display=t?"block":"none")}function es(){const e=document.getElementById("editor-schedule-list");e&&(e.innerHTML=Yt.map((t,n)=>`
        <div class="flex items-center gap-2 mb-2">
            <span class="text-xs font-bold text-gray-400 w-5">#${n+1}</span>
            <input type="text" class="input-sched-opt flex-grow border border-gray-300 rounded-lg p-1.5 text-xs focus:ring-2 focus:ring-teal-500" value="${te(t)}" data-index="${n}" placeholder="例: 7/18(土) 午前 (9:00〜12:00)">
            <button class="btn-del-sched-opt text-xs text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded" data-index="${n}">🗑️</button>
        </div>
    `).join(""),e.querySelectorAll(".input-sched-opt").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-index"));Yt[a]=n.target.value})}),e.querySelectorAll(".btn-del-sched-opt").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-index"));Yt.splice(n,1),es()})}))}function ts(){const e=document.getElementById("editor-orders-list");e&&(e.innerHTML=ht.map((t,n)=>`
        <div class="grid grid-cols-12 gap-2 mb-2 items-center bg-gray-50/70 p-2 rounded-lg border border-gray-200">
            <div class="col-span-6">
                <input type="text" class="input-order-name w-full border border-gray-300 rounded p-1 text-xs" value="${te(t.name)}" data-index="${n}" placeholder="商品・品目名 (例: お弁当)">
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
    `).join(""),e.querySelectorAll(".input-order-name").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-index"));ht[a].name=n.target.value})}),e.querySelectorAll(".input-order-price").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-index"));ht[a].price=Number(n.target.value)||0})}),e.querySelectorAll(".input-order-max").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-index"));ht[a].max=Number(n.target.value)||10})}),e.querySelectorAll(".btn-del-order-item").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-index"));ht.splice(n,1),ts()})}))}function Bt(){const e=document.getElementById("editor-questions-list");if(e){if(Z.length===0){e.innerHTML='<p class="text-xs text-gray-400 py-3 text-center border border-dashed rounded-lg">設問がありません。「＋ 設問を追加」ボタンで追加してください。</p>';return}e.innerHTML=Z.map((t,n)=>{const a=Z.filter((s,r)=>r>n);return`
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
                        ${n<Z.length-1?`<button class="btn-move-q-down text-xs text-gray-500 hover:text-gray-800 p-1" data-q-index="${n}" title="下に移動">▼</button>`:""}
                        <button class="btn-del-q text-xs text-red-500 hover:text-red-700 p-1 font-bold ml-1" data-q-index="${n}">削除</button>
                    </div>
                </div>

                <div class="mb-3">
                    <input type="text" class="input-q-title w-full border border-gray-300 rounded-lg p-2 text-xs font-bold text-gray-800" value="${te(t.title)}" data-q-index="${n}" placeholder="設問のタイトルを入力してください">
                </div>

                <!-- 選択肢セクション (single または multiple の場合) -->
                ${t.type==="single"||t.type==="multiple"?`
                <div class="pl-3 border-l-2 border-teal-300 mb-2">
                    <label class="block text-[11px] font-bold text-gray-500 mb-1.5">選択肢一覧 &amp; 設問スキップ設定:</label>
                    <div class="space-y-2">
                        ${(t.options||[]).map((s,r)=>`
                            <div class="flex items-center gap-2">
                                <input type="text" class="input-opt-label flex-grow border border-gray-300 rounded p-1.5 text-xs" value="${te(s.label)}" data-q-index="${n}" data-opt-index="${r}" placeholder="選択肢 ${r+1}">
                                ${t.type==="single"?`
                                <div class="flex items-center gap-1 shrink-0 bg-white border border-gray-200 rounded px-2 py-1">
                                    <span class="text-[10px] text-gray-500 font-bold">スキップ先:</span>
                                    <select class="select-opt-skip text-xs border-0 bg-transparent text-teal-700 font-bold focus:ring-0" data-q-index="${n}" data-opt-index="${r}">
                                        <option value="">(通常通り次へ)</option>
                                        ${a.map((o,i)=>`<option value="${o.id}" ${s.skip_to===o.id?"selected":""}>設問 ${n+2+i}へジャンプ</option>`).join("")}
                                    </select>
                                </div>
                                `:""}
                                <button class="btn-del-opt text-xs text-gray-400 hover:text-red-600 p-1" data-q-index="${n}" data-opt-index="${r}">✕</button>
                            </div>
                        `).join("")}
                    </div>
                    <button class="btn-add-opt mt-2 text-xs font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1 cursor-pointer" data-q-index="${n}">
                        <span>＋ 選択肢を追加</span>
                    </button>
                </div>
                `:""}

                <div>
                    <input type="text" class="input-q-help w-full border border-gray-200 rounded p-1.5 text-[11px] text-gray-500 bg-white" value="${te(t.help||"")}" data-q-index="${n}" placeholder="補足説明・注釈 (任意)">
                </div>
            </div>
        `}).join(""),e.querySelectorAll(".input-q-title").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-q-index"));Z[a].title=n.target.value})}),e.querySelectorAll(".input-q-help").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-q-index"));Z[a].help=n.target.value})}),e.querySelectorAll(".select-q-type").forEach(t=>{t.addEventListener("change",n=>{const a=Number(n.target.getAttribute("data-q-index"));Z[a].type=n.target.value,(!Z[a].options||Z[a].options.length===0)&&(Z[a].options=[{label:"選択肢 1",skip_to:null},{label:"選択肢 2",skip_to:null}]),Bt()})}),e.querySelectorAll(".chk-q-req").forEach(t=>{t.addEventListener("change",n=>{const a=Number(n.target.getAttribute("data-q-index"));Z[a].required=n.target.checked})}),e.querySelectorAll(".btn-del-q").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index"));Z.splice(n,1),Bt()})}),e.querySelectorAll(".btn-move-q-up").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index"));if(n>0){const a=Z[n];Z[n]=Z[n-1],Z[n-1]=a,Bt()}})}),e.querySelectorAll(".btn-move-q-down").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index"));if(n<Z.length-1){const a=Z[n];Z[n]=Z[n+1],Z[n+1]=a,Bt()}})}),e.querySelectorAll(".btn-add-opt").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index"));Z[n].options||(Z[n].options=[]),Z[n].options.push({label:`選択肢 ${Z[n].options.length+1}`,skip_to:null}),Bt()})}),e.querySelectorAll(".input-opt-label").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-q-index")),s=Number(n.target.getAttribute("data-opt-index"));Z[a].options[s].label=n.target.value})}),e.querySelectorAll(".select-opt-skip").forEach(t=>{t.addEventListener("change",n=>{const a=Number(n.target.getAttribute("data-q-index")),s=Number(n.target.getAttribute("data-opt-index"));Z[a].options[s].skip_to=n.target.value||null})}),e.querySelectorAll(".btn-del-opt").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index")),a=Number(t.getAttribute("data-opt-index"));Z[n].options.splice(a,1),Bt()})})}}async function yi(){var c,m,u,f,b,y,g,p;const e=(c=document.getElementById("input-survey-title"))==null?void 0:c.value.trim();if(!e){alert("アンケートのタイトルを入力してください");return}const t=((m=document.getElementById("input-survey-desc"))==null?void 0:m.value.trim())||"",n=((u=document.getElementById("select-survey-status"))==null?void 0:u.value)||"active",a=((f=document.getElementById("input-survey-deadline"))==null?void 0:f.value.trim())||"",s=((b=document.getElementById("chk-survey-enable-schedule"))==null?void 0:b.checked)||!1,r=((y=document.getElementById("chk-survey-enable-family"))==null?void 0:y.checked)||!1,o=((g=document.getElementById("chk-survey-enable-orders"))==null?void 0:g.checked)||!1,i=!ln,d=new Date().toISOString().split("T")[0],l={id:ln||`survey_${Date.now()}`,title:e,description:t,status:n,deadline:a,enable_schedule:s,schedule_options:s?Yt.filter(x=>x.trim()):[],enable_family:r,enable_orders:o,order_items:o?ht.filter(x=>x.name.trim()):[],questions:Z,created_by:(Dt==null?void 0:Dt.name)||"管理者",created_at:ln&&((p=be.find(x=>x.id===ln))==null?void 0:p.created_at)||d,updated_at:d};await pi(l,i),Oa(),Tn()}let Jn=null;function hi(e){const t=document.getElementById("modal-survey-results");if(!t)return;const n=be.find(s=>s.id===e);if(!n)return;Jn=n;const a=We.filter(s=>s.survey_id===e);document.getElementById("results-survey-title").textContent=n.title,document.getElementById("results-survey-subtitle").textContent=`回答数: ${a.length}件 | 締切: ${n.deadline||"なし"}`,vi(n,a),wi(n,a),Ei(n,a),_i(n,a),Ii(n,a),t.classList.remove("hidden")}function xi(){const e=document.getElementById("modal-survey-results");e&&e.classList.add("hidden"),Jn=null}function vi(e,t){const n=t.length;let a=0;t.forEach(o=>{o.family_members&&o.family_members.length>0?a+=o.family_members.length:a+=1});const s=t.reduce((o,i)=>o+(Number(i.total_amount)||0),0),r=document.getElementById("results-summary-cards");r&&(r.innerHTML=`
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
    `)}function wi(e,t){const n=document.getElementById("results-schedule-container");if(!n)return;if(!e.enable_schedule||!e.schedule_options||e.schedule_options.length===0){n.classList.add("hidden");return}n.classList.remove("hidden");const a={};e.schedule_options.forEach(r=>{a[r]={ok:[],maybe:[],ng:[]}}),t.forEach(r=>{const o=r.respondent_name||"無名";r.schedules&&Object.entries(r.schedules).forEach(([i,d])=>{a[i]&&(d==="○"||d==="ok"?a[i].ok.push(o):d==="△"||d==="maybe"?a[i].maybe.push(o):(d==="×"||d==="ng")&&a[i].ng.push(o))})});const s=document.getElementById("results-schedule-tbody");s&&(s.innerHTML=e.schedule_options.map(r=>{const o=a[r],i=o.ok.join("、 ");return`
            <tr class="border-b border-gray-100 hover:bg-gray-50/50">
                <td class="px-3 py-2.5 font-bold text-gray-800 whitespace-nowrap">${te(r)}</td>
                <td class="px-3 py-2.5 text-center font-extrabold text-emerald-600 bg-emerald-50/30">
                    ${o.ok.length}
                </td>
                <td class="px-3 py-2.5 text-center font-bold text-amber-600">
                    ${o.maybe.length}
                </td>
                <td class="px-3 py-2.5 text-center font-bold text-gray-400">
                    ${o.ng.length}
                </td>
                <td class="px-3 py-2.5 text-xs text-gray-600 max-w-xs truncate" title="${te(i)}">
                    ${te(i)||'<span class="text-gray-300">なし</span>'}
                </td>
            </tr>
        `}).join(""))}function Ei(e,t){const n=document.getElementById("results-orders-container");if(!n)return;if(!e.enable_orders||!e.order_items||e.order_items.length===0){n.classList.add("hidden");return}n.classList.remove("hidden");const a={};e.order_items.forEach(r=>{a[r.id]={name:r.name,price:r.price,count:0}}),t.forEach(r=>{r.orders&&Object.entries(r.orders).forEach(([o,i])=>{a[o]&&(a[o].count+=Number(i)||0)})});const s=document.getElementById("results-orders-tbody");s&&(s.innerHTML=e.order_items.map(r=>{const o=a[r.id]||{count:0},i=o.count*r.price;return`
            <tr class="border-b border-gray-100 hover:bg-gray-50/50">
                <td class="px-3 py-2.5 font-bold text-gray-800">${te(r.name)}</td>
                <td class="px-3 py-2.5 text-right font-mono text-gray-600">¥${r.price.toLocaleString()}</td>
                <td class="px-3 py-2.5 text-center font-extrabold text-purple-600">${o.count} <span class="text-xs font-normal">個</span></td>
                <td class="px-3 py-2.5 text-right font-extrabold text-purple-800 font-mono">¥${i.toLocaleString()}</td>
            </tr>
        `}).join(""))}function _i(e,t){const n=document.getElementById("results-questions-list");if(n){if(!e.questions||e.questions.length===0){n.innerHTML='<p class="text-xs text-gray-400">設問はありません</p>';return}n.innerHTML=e.questions.map((a,s)=>{const r=t.map(o=>o.answers&&o.answers[a.id]).filter(o=>o!=null&&o!=="");if(a.type==="single"||a.type==="multiple"){const o={};(a.options||[]).forEach(d=>o[d.label]=0),o["(未回答)"]=0,r.forEach(d=>{Array.isArray(d)?d.forEach(l=>{o[l]=(o[l]||0)+1}):o[d]!==void 0?o[d]+=1:o[d]=(o[d]||0)+1});const i=t.length;return`
                <div class="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-3">
                    <h4 class="text-xs font-bold text-gray-800 mb-2">設問 ${s+1}: ${te(a.title)}</h4>
                    <div class="space-y-1.5">
                        ${Object.entries(o).filter(([d,l])=>d!=="(未回答)"||l>0).map(([d,l])=>{const c=i>0?Math.round(l/i*100):0;return`
                                <div>
                                    <div class="flex justify-between text-xs mb-0.5">
                                        <span class="text-gray-700">${te(d)}</span>
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
                    <h4 class="text-xs font-bold text-gray-800 mb-2">設問 ${s+1}: ${te(a.title)} (${r.length}件の回答)</h4>
                    <div class="max-h-36 overflow-y-auto space-y-1.5 pr-2 scrollbar-thin">
                        ${r.length>0?r.map(o=>`
                            <div class="bg-white p-2 rounded border border-gray-200 text-xs text-gray-700">
                                ${te(String(o))}
                            </div>
                        `).join(""):'<span class="text-xs text-gray-400">回答がありません</span>'}
                    </div>
                </div>
            `}).join("")}}function Ii(e,t){const n=document.getElementById("results-responses-tbody");if(n){if(t.length===0){n.innerHTML='<tr><td colspan="6" class="text-center py-6 text-xs text-gray-400">まだ回答がありません</td></tr>';return}n.innerHTML=t.map(a=>{const s=(a.family_members||[]).map(o=>o.name).join("、 ")||"-",r=a.orders?Object.entries(a.orders).filter(([o,i])=>i>0).map(([o,i])=>{const d=(e.order_items||[]).find(l=>l.id===o);return`${d?d.name:o} ×${i}`}).join(", "):"-";return`
            <tr class="border-b border-gray-100 hover:bg-gray-50/50 text-xs">
                <td class="px-3 py-2 text-gray-400 whitespace-nowrap">${a.created_at||"-"}</td>
                <td class="px-3 py-2 font-bold text-gray-900 whitespace-nowrap">${te(a.respondent_name)}</td>
                <td class="px-3 py-2 text-gray-600 max-w-xs truncate" title="${te(s)}">${te(s)}</td>
                <td class="px-3 py-2 text-gray-600 max-w-xs truncate" title="${te(r)}">${te(r)}</td>
                <td class="px-3 py-2 text-right font-mono font-bold text-purple-700">¥${(Number(a.total_amount)||0).toLocaleString()}</td>
            </tr>
        `}).join("")}}function $i(){if(!Jn)return;const e=Jn,t=We.filter(d=>d.survey_id===e.id),n=["回答ID","回答日時","回答者(代表者名)"];e.enable_family&&n.push("家族メンバー一覧"),e.enable_schedule&&e.schedule_options&&e.schedule_options.forEach(d=>{n.push(`日程: ${d}`)}),e.questions&&e.questions.forEach((d,l)=>{n.push(`設問${l+1}: ${d.title}`)}),e.enable_orders&&e.order_items&&(e.order_items.forEach(d=>{n.push(`注文: ${d.name} (${d.price}円)`)}),n.push("注文合計金額(円)"));const a=[n];t.forEach(d=>{const l=[d.id,d.created_at||"",d.respondent_name||""];if(e.enable_family){const c=(d.family_members||[]).map(m=>`${m.name}${m.role?`(${m.role})`:""}`).join(", ");l.push(c)}e.enable_schedule&&e.schedule_options&&e.schedule_options.forEach(c=>{l.push(d.schedules&&d.schedules[c]||"")}),e.questions&&e.questions.forEach(c=>{const m=d.answers?d.answers[c.id]:"";Array.isArray(m)?l.push(m.join("; ")):l.push(m||"")}),e.enable_orders&&e.order_items&&(e.order_items.forEach(c=>{const m=d.orders&&d.orders[c.id]||0;l.push(m)}),l.push(d.total_amount||0)),a.push(l)});const s=a.map(d=>d.map(l=>`"${String(l||"").replace(/"/g,'""')}"`).join(",")).join(`
`),r=new Blob([new Uint8Array([239,187,191]),s],{type:"text/csv;charset=utf-8;"}),o=document.createElement("a");o.href=URL.createObjectURL(r);const i=new Date().toISOString().split("T")[0];o.download=`survey_${e.id}_${i}.csv`,o.click()}let vn=null,Wt=[];async function Kn(e){var s,r;ir(),(!be||be.length===0)&&await rr();const t=be.find(o=>o.id===e);if(!t){alert("指定されたアンケートが見つかりませんでした。");return}vn=t,Wt=[],["auth-view","signup-view","password-reset-view","password-update-view","app-menu-view","app-view","attendance-view","view-users","dashboard-view","dashboard-settings","position-simulator-view","info-view"].forEach(o=>{const i=document.getElementById(o);i&&i.classList.add("hidden")});const n=document.getElementById("survey-respond-view");n&&n.classList.remove("hidden"),document.getElementById("respond-survey-title").textContent=t.title,document.getElementById("respond-survey-desc").innerHTML=t.description?t.description.replace(/\n/g,"<br>"):"",document.getElementById("respond-survey-deadline").textContent=t.deadline?`回答期限: ${t.deadline}`:"";const a=document.getElementById("input-respondent-name");a&&(a.value=Dt&&Dt.name?Dt.name:""),ns(t),ki(t),Li(t),Si(t),(s=document.getElementById("survey-respond-form-container"))==null||s.classList.remove("hidden"),(r=document.getElementById("survey-respond-success-container"))==null||r.classList.add("hidden"),window.scrollTo({top:0,behavior:"smooth"})}function ns(e){const t=document.getElementById("respond-family-section");if(!t)return;if(!e.enable_family){t.classList.add("hidden");return}t.classList.remove("hidden");const n=document.getElementById("respond-family-list");n&&(n.innerHTML=Wt.map((a,s)=>`
        <div class="flex items-center gap-2 mb-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
            <input type="text" class="input-fam-name flex-grow border border-gray-300 rounded-lg p-2 text-xs" value="${te(a.name)}" data-index="${s}" placeholder="ご家族・選手のお名前 (例: 翔太)">
            <select class="select-fam-role border border-gray-300 rounded-lg p-2 text-xs bg-white font-bold" data-index="${s}">
                <option value="選手" ${a.role==="選手"?"selected":""}>選手</option>
                <option value="保護者" ${a.role==="保護者"?"selected":""}>保護者</option>
                <option value="兄弟・姉妹" ${a.role==="兄弟・姉妹"?"selected":""}>兄弟・姉妹</option>
                <option value="その他" ${a.role==="その他"?"selected":""}>その他</option>
            </select>
            <button class="btn-del-fam text-xs text-red-500 hover:text-red-700 p-2" data-index="${s}">🗑️</button>
        </div>
    `).join(""),n.querySelectorAll(".input-fam-name").forEach(a=>{a.addEventListener("input",s=>{const r=Number(s.target.getAttribute("data-index"));Wt[r].name=s.target.value})}),n.querySelectorAll(".select-fam-role").forEach(a=>{a.addEventListener("change",s=>{const r=Number(s.target.getAttribute("data-index"));Wt[r].role=s.target.value})}),n.querySelectorAll(".btn-del-fam").forEach(a=>{a.addEventListener("click",()=>{const s=Number(a.getAttribute("data-index"));Wt.splice(s,1),ns(e)})}))}function ki(e){const t=document.getElementById("respond-schedule-section");if(!t)return;if(!e.enable_schedule||!e.schedule_options||e.schedule_options.length===0){t.classList.add("hidden");return}t.classList.remove("hidden");const n=document.getElementById("respond-schedule-list");n&&(n.innerHTML=e.schedule_options.map((a,s)=>`
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl border border-gray-200 bg-white mb-2.5">
            <span class="text-xs font-bold text-gray-800">${te(a)}</span>
            <div class="flex items-center gap-4">
                <label class="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-100 transition">
                    <input type="radio" name="respond_sched_${s}" value="○" checked class="text-emerald-600 focus:ring-emerald-500">
                    <span>○ (参加)</span>
                </label>
                <label class="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 hover:bg-amber-100 transition">
                    <input type="radio" name="respond_sched_${s}" value="△" class="text-amber-600 focus:ring-amber-500">
                    <span>△ (未定)</span>
                </label>
                <label class="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 transition">
                    <input type="radio" name="respond_sched_${s}" value="×" class="text-gray-600 focus:ring-gray-500">
                    <span>× (不参加)</span>
                </label>
            </div>
        </div>
    `).join(""))}function Li(e){const t=document.getElementById("respond-questions-section");if(!t)return;if(!e.questions||e.questions.length===0){t.classList.add("hidden");return}t.classList.remove("hidden");const n=document.getElementById("respond-questions-list");n&&(n.innerHTML=e.questions.map((a,s)=>`
        <div id="respond-q-block-${a.id}" class="respond-q-block p-4 rounded-xl border border-gray-200 bg-white mb-4 transition-all" data-q-id="${a.id}">
            <div class="flex items-start gap-2 mb-2">
                <span class="px-2 py-0.5 rounded bg-teal-100 text-teal-800 text-xs font-bold shrink-0">Q${s+1}</span>
                <div>
                    <h4 class="text-xs font-bold text-gray-900 leading-snug">
                        ${te(a.title)}
                        ${a.required?'<span class="text-red-500 ml-1">*必須</span>':""}
                    </h4>
                    ${a.help?`<p class="text-[11px] text-gray-500 mt-0.5">${te(a.help)}</p>`:""}
                </div>
            </div>

            <div class="mt-3 pl-2">
                ${Bi(a)}
            </div>
        </div>
    `).join(""),n.querySelectorAll('input[type="radio"].q-opt-radio').forEach(a=>{a.addEventListener("change",()=>{Ss(e)})}),Ss(e))}function Bi(e){return e.type==="single"?(e.options||[]).map((t,n)=>`
            <label class="flex items-center gap-2 cursor-pointer text-xs text-gray-700 mb-2 hover:text-teal-700">
                <input type="radio" name="respond_ans_${e.id}" value="${te(t.label)}" class="q-opt-radio text-teal-600 focus:ring-teal-500" data-q-id="${e.id}" data-skip-to="${t.skip_to||""}" ${n===0?"checked":""}>
                <span>${te(t.label)}</span>
            </label>
        `).join(""):e.type==="multiple"?(e.options||[]).map(t=>`
            <label class="flex items-center gap-2 cursor-pointer text-xs text-gray-700 mb-2 hover:text-teal-700">
                <input type="checkbox" name="respond_ans_${e.id}" value="${te(t.label)}" class="rounded text-teal-600 focus:ring-teal-500">
                <span>${te(t.label)}</span>
            </label>
        `).join(""):`
            <textarea name="respond_ans_${e.id}" rows="3" class="w-full border border-gray-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-teal-500 outline-none" placeholder="回答を入力してください..."></textarea>
        `}function Ss(e){if(!e.questions)return;let t=new Set;e.questions.forEach((n,a)=>{if(n.type==="single"){const s=document.querySelector(`input[name="respond_ans_${n.id}"]:checked`);if(s){const r=s.getAttribute("data-skip-to");if(r){const o=e.questions.findIndex(i=>i.id===r);if(o>a)for(let i=a+1;i<o;i++)t.add(e.questions[i].id)}}}}),e.questions.forEach(n=>{var s,r;const a=document.getElementById(`respond-q-block-${n.id}`);if(a)if(t.has(n.id)){if(a.classList.add("opacity-40","bg-gray-100","pointer-events-none"),!a.querySelector(".skip-badge")){const i=document.createElement("span");i.className="skip-badge text-[10px] bg-gray-300 text-gray-700 font-bold px-1.5 py-0.5 rounded ml-2",i.textContent="スキップされました",(s=a.querySelector("h4"))==null||s.appendChild(i)}}else a.classList.remove("opacity-40","bg-gray-100","pointer-events-none"),(r=a.querySelector(".skip-badge"))==null||r.remove()})}function Si(e){const t=document.getElementById("respond-orders-section");if(!t)return;if(!e.enable_orders||!e.order_items||e.order_items.length===0){t.classList.add("hidden");return}t.classList.remove("hidden");const n=document.getElementById("respond-orders-list");n&&(n.innerHTML=e.order_items.map(a=>`
        <div class="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-white mb-2.5">
            <div>
                <span class="block text-xs font-bold text-gray-900">${te(a.name)}</span>
                <span class="text-xs text-teal-700 font-mono font-bold">¥${a.price.toLocaleString()}</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-xs text-gray-500">数量:</span>
                <select class="select-order-qty border border-gray-300 rounded-lg p-1.5 text-xs bg-white font-bold" data-item-id="${a.id}" data-price="${a.price}">
                    ${Array.from({length:(a.max||10)+1},(s,r)=>`<option value="${r}">${r}</option>`).join("")}
                </select>
            </div>
        </div>
    `).join(""),n.querySelectorAll(".select-order-qty").forEach(a=>{a.addEventListener("change",Ts)}),Ts())}function Ts(){let e=0;document.querySelectorAll(".select-order-qty").forEach(n=>{const a=Number(n.value)||0,s=Number(n.getAttribute("data-price"))||0;e+=a*s});const t=document.getElementById("respond-orders-total-amount");t&&(t.textContent=`¥${e.toLocaleString()}`)}async function Ti(){var c,m,u,f;if(!vn)return;const e=vn,t=(c=document.getElementById("input-respondent-name"))==null?void 0:c.value.trim();if(!t){alert("回答者（代表者名）を入力してください"),(m=document.getElementById("input-respondent-name"))==null||m.focus();return}const n={};e.enable_schedule&&e.schedule_options&&e.schedule_options.forEach((b,y)=>{const g=document.querySelector(`input[name="respond_sched_${y}"]:checked`);g&&(n[b]=g.value)});const a={};let s=!1;if(e.questions&&e.questions.forEach(b=>{var p;const y=document.getElementById(`respond-q-block-${b.id}`);if(!(y&&y.classList.contains("opacity-40")))if(b.type==="single"){const x=document.querySelector(`input[name="respond_ans_${b.id}"]:checked`);x?a[b.id]=x.value:b.required&&(s=!0)}else if(b.type==="multiple"){const x=Array.from(document.querySelectorAll(`input[name="respond_ans_${b.id}"]:checked`)).map(v=>v.value);a[b.id]=x,b.required&&x.length===0&&(s=!0)}else{const x=(p=document.querySelector(`textarea[name="respond_ans_${b.id}"]`))==null?void 0:p.value.trim();a[b.id]=x||"",b.required&&!x&&(s=!0)}}),s){alert("必須の設問に回答してください。");return}const r={};let o=0;e.enable_orders&&e.order_items&&document.querySelectorAll(".select-order-qty").forEach(b=>{const y=b.getAttribute("data-item-id"),g=Number(b.value)||0,p=Number(b.getAttribute("data-price"))||0;r[y]=g,o+=g*p});const i=new Date,d=`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}-${String(i.getDate()).padStart(2,"0")} ${String(i.getHours()).padStart(2,"0")}:${String(i.getMinutes()).padStart(2,"0")}`,l={id:`resp_${Date.now()}`,survey_id:e.id,respondent_name:t,family_members:Wt.filter(b=>b.name.trim()),schedules:n,answers:a,orders:r,total_amount:o,created_at:d};await fi(l),(u=document.getElementById("survey-respond-form-container"))==null||u.classList.add("hidden"),(f=document.getElementById("survey-respond-success-container"))==null||f.classList.remove("hidden"),window.scrollTo({top:0,behavior:"smooth"})}function te(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}let Cs=!1;function ir(){var e,t,n,a,s,r,o,i,d,l,c,m,u,f;Cs||(Cs=!0,(e=document.getElementById("btn-survey-new"))==null||e.addEventListener("click",()=>or()),(t=document.getElementById("chk-survey-enable-schedule"))==null||t.addEventListener("change",Ma),(n=document.getElementById("chk-survey-enable-orders"))==null||n.addEventListener("change",Ma),(a=document.getElementById("btn-add-sched-opt"))==null||a.addEventListener("click",()=>{Yt.push(`候補日 ${Yt.length+1}`),es()}),(s=document.getElementById("btn-add-order-item"))==null||s.addEventListener("click",()=>{ht.push({id:`item_${Date.now()}`,name:`注文品目 ${ht.length+1}`,price:500,max:10}),ts()}),(r=document.getElementById("btn-add-question"))==null||r.addEventListener("click",()=>{Z.push({id:`q_${Date.now()}`,type:"single",title:`設問 ${Z.length+1}`,required:!1,options:[{label:"選択肢 1",skip_to:null},{label:"選択肢 2",skip_to:null}],help:""}),Bt()}),(o=document.getElementById("btn-save-survey"))==null||o.addEventListener("click",yi),(i=document.getElementById("btn-close-survey-editor"))==null||i.addEventListener("click",Oa),(d=document.getElementById("btn-cancel-survey-editor"))==null||d.addEventListener("click",Oa),(l=document.getElementById("btn-close-survey-results"))==null||l.addEventListener("click",xi),(c=document.getElementById("btn-export-survey-csv"))==null||c.addEventListener("click",$i),(m=document.getElementById("btn-respond-add-family"))==null||m.addEventListener("click",()=>{Wt.push({name:"",role:"選手"}),vn&&ns(vn)}),(u=document.getElementById("btn-submit-survey-response"))==null||u.addEventListener("click",Ti),(f=document.getElementById("btn-back-from-survey-respond"))==null||f.addEventListener("click",()=>{if(Dt){const b=document.getElementById("survey-respond-view");b&&b.classList.add("hidden");const y=document.getElementById("info-view");y&&y.classList.remove("hidden"),Tn()}else{const b=document.getElementById("survey-respond-view");b&&b.classList.add("hidden");const y=document.getElementById("auth-view");y&&y.classList.remove("hidden")}}))}let ke=null,rt=null,Yn="user",Xt=!1,st="docs",Ne=[],Be=[],Qn="すべて",Zn="すべて",wn="",Qt="";const Xn="ants_info_documents_v1",ea="ants_info_links_v1",dr="ants_info_top_md_v1",Ci=`## 🐜 Arinko Ants チーム情報 &amp; ドキュメントポータル
本ポータルでは、チーム運営に関する**各種マニュアル（配車・当番・緊急対応）**の閲覧、**合宿・イベント出欠アンケート（日程調整・お弁当注文）**の実施、および**グラウンド地図や公式連盟などの便利リンク集**を一元管理しています。

> [!NOTE]
> - **配車調整マニュアル**や**当番業務の手引き**は「ドキュメント」タブよりいつでも閲覧・ダウンロード可能です。
> - 夏季合宿やイベントの日程調整・注文アンケートは「アンケート」タブから回答できます（ゲスト回答も可能）。
`,As=[{id:"doc-manual-dispatch",title:"配車調整機能 利用者マニュアル",category:"配車マニュアル",summary:"少年野球チーム「Arinko Ants」の活動におけるイベント配車の自動作成・手動微調整・LINE案内出力までの全体操作マニュアルです。",content:`# 配車調整機能 利用者マニュアル

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
  - [ ] 倉庫施錠および学校鍵の返却`,files:[],created_by:"父母会",updated_at:"2026-04-01"}],Ds=[{id:"link-official-site",title:"Arinko Ants 公式ホームページ",url:"https://arinkoants.sakura.ne.jp/",category:"公式・連盟",description:"チームの公式Webサイト。チーム紹介、選手募集案内、活動予定などが掲載されています。",icon:"🐜",display_order:1},{id:"link-google-calendar",title:"チーム活動予定 Googleカレンダー",url:"https://calendar.google.com/",category:"スケジュール・連絡",description:"練習日、遠征試合、大会スケジュールが登録されているGoogleカレンダーです。",icon:"📅",display_order:2},{id:"link-nagareyama-league",title:"流山市少年野球連盟 公式サイト",url:"http://nagareyama-baseball.jp/",category:"公式・連盟",description:"市内大会の組み合わせトーナメント表、試合日程、グラウンド規程などが確認できます。",icon:"⚾",display_order:3},{id:"link-chiba-league",title:"千葉県少年野球連盟",url:"http://chiba-baseball.jp/",category:"公式・連盟",description:"千葉県大会の要項、大会結果、競技規則の最新情報が掲載されています。",icon:"🏆",display_order:4},{id:"link-ground-map",title:"主な活動グラウンド案内 (Google Maps)",url:"https://maps.google.com/",category:"グラウンド・施設",description:"ホームグラウンド（東小学校）および近隣の流山市内グラウンドへのアクセス地図一覧です。",icon:"📍",display_order:5},{id:"link-weather-forecast",title:"流山市のピンポイント天気予報 (tenki.jp)",url:"https://tenki.jp/forecast/3/15/4510/12220/",category:"便利ツール",description:"当日の雨雲レーダー、1時間ごとの降水確率、風速、WBGT（熱中症指数）を確認できます。",icon:"☀️",display_order:6},{id:"link-baseball-rules",title:"公認野球規則 & 少年野球特別規則",url:"https://japan-baseball.jp/",category:"便利ツール",description:"全日本軟式野球連盟（JSBB）による少年野球特別規程および公認野球規則の解説です。",icon:"📖",display_order:7}],lr=["すべて","配車マニュアル","チーム運営・規約","野球ルール・スコア","その他"],cr=["すべて","公式・連盟","グラウンド・施設","スケジュール・連絡","便利ツール","その他"];async function jn({supabaseClient:e,currentUser:t,currentUserRole:n}){ke=e,rt=t,Yn=n,Xt=n==="admin"||n==="leader",Ai(),await Di(),await mi({supabaseClient:ke,currentUser:rt,currentUserRole:Yn}),Yi(),ur(),mr()}function Ai(){document.querySelectorAll(".info-admin-only").forEach(n=>{Xt?n.classList.remove("hidden"):n.classList.add("hidden")});const t=document.getElementById("info-user-role-badge");t&&(Yn==="admin"?(t.className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-purple-100 text-purple-700 border border-purple-200",t.textContent="管理者 (編集可)"):Yn==="leader"?(t.className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-100 text-blue-700 border border-blue-200",t.textContent="リーダー (編集可)"):(t.className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-gray-100 text-gray-700 border border-gray-200",t.textContent="閲覧専用"))}async function Di(){let e=!1,t=!1,n=!1;if(ke){try{const{data:a,error:s}=await ke.from("info_documents").select("*").order("updated_at",{ascending:!1});!s&&a&&a.length>0&&(Ne=a,e=!0)}catch(a){console.warn("Supabase info_documents select failed:",a)}try{const{data:a,error:s}=await ke.from("info_links").select("*").order("display_order",{ascending:!0});!s&&a&&a.length>0&&(Be=a,t=!0)}catch(a){console.warn("Supabase info_links select failed:",a)}try{const{data:a,error:s}=await ke.from("info_pages").select("*").eq("id","top_announcement").single();!s&&a&&a.content&&(Qt=a.content,n=!0)}catch(a){console.warn("Supabase info_pages select failed:",a)}}if(!e)try{const a=localStorage.getItem(Xn);a?Ne=JSON.parse(a):(Ne=[...As],localStorage.setItem(Xn,JSON.stringify(Ne)))}catch{Ne=[...As]}if(!t)try{const a=localStorage.getItem(ea);a?Be=JSON.parse(a):(Be=[...Ds],localStorage.setItem(ea,JSON.stringify(Be)))}catch{Be=[...Ds]}if(!n){const a=localStorage.getItem(dr);Qt=a!==null?a:Ci}}async function Ni(e,t=!1){const n=Ne.findIndex(a=>a.id===e.id);n>=0?Ne[n]=e:Ne.unshift(e);try{localStorage.setItem(Xn,JSON.stringify(Ne))}catch(a){console.error(a)}if(ke)try{t?await ke.from("info_documents").insert([e]):await ke.from("info_documents").update(e).eq("id",e.id)}catch(a){console.warn("Supabase document save failed:",a)}}async function Pi(e){Ne=Ne.filter(t=>t.id!==e);try{localStorage.setItem(Xn,JSON.stringify(Ne))}catch(t){console.error(t)}if(ke)try{await ke.from("info_documents").delete().eq("id",e)}catch(t){console.warn("Supabase document delete failed:",t)}}async function Oi(e,t=!1){const n=Be.findIndex(a=>a.id===e.id);n>=0?Be[n]=e:Be.push(e);try{localStorage.setItem(ea,JSON.stringify(Be))}catch(a){console.error(a)}if(ke)try{t?await ke.from("info_links").insert([e]):await ke.from("info_links").update(e).eq("id",e.id)}catch(a){console.warn("Supabase link save failed:",a)}}async function Mi(e){Be=Be.filter(t=>t.id!==e);try{localStorage.setItem(ea,JSON.stringify(Be))}catch(t){console.error(t)}if(ke)try{await ke.from("info_links").delete().eq("id",e)}catch(t){console.warn("Supabase link delete failed:",t)}}async function Ri(e){Qt=e;try{localStorage.setItem(dr,e)}catch(t){console.error(t)}if(ke)try{await ke.from("info_pages").upsert([{id:"top_announcement",content:e,updated_at:new Date().toISOString(),updated_by:(rt==null?void 0:rt.name)||"管理者"}])}catch(t){console.warn("Supabase top_announcement save failed:",t)}ur()}function ur(){const e=document.getElementById("info-top-announcement-rendered"),t=document.getElementById("info-top-announcement-wrap");!e||!t||(Qt&&Qt.trim()?(t.classList.remove("hidden"),e.innerHTML=la(Qt)):t.classList.add("hidden"))}function mr(){pr(),st==="docs"?Cn():st==="surveys"?Tn():An()}function pr(){const e=document.getElementById("info-category-filters");if(!e)return;if(st==="surveys"){e.classList.add("hidden");return}e.classList.remove("hidden");const t=st==="docs"?lr:cr,n=st==="docs"?Qn:Zn;e.innerHTML=t.map(a=>`<button class="info-cat-btn px-3.5 py-1.5 text-xs rounded-full transition-all cursor-pointer ${n===a?"bg-teal-600 text-white shadow-sm font-bold":"bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}" data-category="${a}">${a}</button>`).join(""),e.querySelectorAll(".info-cat-btn").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-category");st==="docs"?(Qn=s,Cn()):(Zn=s,An()),pr()})})}function Cn(){const e=document.getElementById("info-docs-container"),t=document.getElementById("info-docs-empty");if(!e)return;let n=Ne;if(Qn!=="すべて"&&(n=n.filter(a=>a.category===Qn)),wn.trim()){const a=wn.toLowerCase().trim();n=n.filter(s=>s.title&&s.title.toLowerCase().includes(a)||s.summary&&s.summary.toLowerCase().includes(a)||s.content&&s.content.toLowerCase().includes(a)||s.category&&s.category.toLowerCase().includes(a))}if(n.length===0){e.innerHTML="",t&&t.classList.remove("hidden");return}t&&t.classList.add("hidden"),e.innerHTML=n.map(a=>{const s=as(a.category),r=a.files?a.files.length:0;return`
            <div class="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between group">
                <div>
                    <div class="flex items-center justify-between gap-2 mb-2.5">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${s}">
                            ${a.category||"その他"}
                        </span>
                        <span class="text-[11px] text-gray-400 font-mono">更新: ${a.updated_at||"-"}</span>
                    </div>
                    <h3 class="text-base font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                        ${ze(a.title)}
                    </h3>
                    <p class="text-xs text-gray-600 line-clamp-3 mb-3 leading-relaxed">
                        ${ze(a.summary||a.content.slice(0,100))}
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
                    ${Xt?`
                    <div class="flex items-center space-x-2">
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
        `}).join(""),e.querySelectorAll(".btn-view-doc").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id"),r=Ne.find(o=>o.id===s);r&&Fi(r)})}),Xt&&(e.querySelectorAll(".btn-edit-doc").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id"),r=Ne.find(o=>o.id===s);r&&gr(r)})}),e.querySelectorAll(".btn-delete-doc").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id"),r=Ne.find(o=>o.id===s);r&&confirm(`ドキュメント「${r.title}」を削除しますか？`)&&(await Pi(s),Cn())})}))}function An(){const e=document.getElementById("info-links-container"),t=document.getElementById("info-links-empty");if(!e)return;let n=Be;if(Zn!=="すべて"&&(n=n.filter(a=>a.category===Zn)),wn.trim()){const a=wn.toLowerCase().trim();n=n.filter(s=>s.title&&s.title.toLowerCase().includes(a)||s.description&&s.description.toLowerCase().includes(a)||s.url&&s.url.toLowerCase().includes(a)||s.category&&s.category.toLowerCase().includes(a))}if(n.length===0){e.innerHTML="",t&&t.classList.remove("hidden");return}t&&t.classList.add("hidden"),e.innerHTML=n.map(a=>{const s=as(a.category),r=a.icon||"🔗",o=a.url?a.url.replace(/^https?:\/\//,"").replace(/\/$/,""):"";return`
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
                        ${ze(a.title)}
                    </h3>
                    <p class="text-xs text-gray-400 font-mono mb-2 truncate" title="${ze(a.url)}">
                        ${ze(o)}
                    </p>
                    <p class="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3">
                        ${ze(a.description||"説明はありません")}
                    </p>
                </div>
                <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <a href="${ze(a.url)}" target="_blank" rel="noopener noreferrer" 
                       class="inline-flex items-center text-xs font-bold bg-teal-50 hover:bg-teal-600 text-teal-700 hover:text-white px-3 py-1.5 rounded-lg transition duration-150 cursor-pointer">
                        <span>サイトを開く</span>
                        <svg class="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                    ${Xt?`
                    <div class="flex items-center space-x-2">
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
        `}).join(""),Xt&&(e.querySelectorAll(".btn-edit-link").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id"),r=Be.find(o=>o.id===s);r&&fr(r)})}),e.querySelectorAll(".btn-delete-link").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id"),r=Be.find(o=>o.id===s);r&&confirm(`リンク「${r.title}」を削除しますか？`)&&(await Mi(s),An())})}))}function as(e){switch(e){case"配車マニュアル":return"bg-blue-100 text-blue-800 border border-blue-200";case"チーム運営・規約":return"bg-amber-100 text-amber-800 border border-amber-200";case"野球ルール・スコア":return"bg-green-100 text-green-800 border border-green-200";case"公式・連盟":return"bg-purple-100 text-purple-800 border border-purple-200";case"グラウンド・施設":return"bg-emerald-100 text-emerald-800 border border-emerald-200";case"スケジュール・連絡":return"bg-sky-100 text-sky-800 border border-sky-200";case"便利ツール":return"bg-indigo-100 text-indigo-800 border border-indigo-200";default:return"bg-gray-100 text-gray-700 border border-gray-200"}}let ta=null;function Fi(e){const t=document.getElementById("modal-info-doc-reader");if(!t)return;ta=e,document.getElementById("reader-doc-title").textContent=e.title,document.getElementById("reader-doc-category").textContent=e.category||"その他",document.getElementById("reader-doc-category").className=`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${as(e.category)}`,document.getElementById("reader-doc-updated").textContent=`最終更新: ${e.updated_at||"-"} (作成: ${e.created_by||"チーム"})`;const n=document.getElementById("reader-doc-files-container"),a=document.getElementById("reader-doc-files-list");n&&a&&(e.files&&e.files.length>0?(n.classList.remove("hidden"),a.innerHTML=e.files.map(r=>`
                <a href="${r.dataUrl||"#"}" download="${ze(r.name)}" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-teal-50 text-gray-700 hover:text-teal-700 border border-gray-200 text-xs font-bold transition">
                    <span>📎</span>
                    <span>${ze(r.name)}</span>
                    <span class="text-[10px] text-gray-400 font-normal">(${Math.round((r.size||0)/1024)}KB)</span>
                </a>
            `).join("")):(n.classList.add("hidden"),a.innerHTML=""));const s=document.getElementById("reader-doc-content");s&&(s.innerHTML=la(e.content||"",!0),rs(s)),t.classList.remove("hidden")}function Ns(){const e=document.getElementById("modal-info-doc-reader");e&&e.classList.add("hidden"),ta=null}function qi(){if(!ta)return;const e=ta,t=new Blob([e.content||""],{type:"text/markdown;charset=utf-8;"}),n=document.createElement("a");n.href=URL.createObjectURL(t),n.download=`${e.title||"document"}.md`,n.click()}let na=null,Zt=[];function gr(e=null){const t=document.getElementById("modal-info-doc-editor");if(!t)return;na=e?e.id:null,Zt=e&&e.files?JSON.parse(JSON.stringify(e.files)):[],document.getElementById("doc-editor-modal-title").textContent=e?"ドキュメントの編集":"新規ドキュメント作成",document.getElementById("input-doc-title").value=e?e.title:"",document.getElementById("input-doc-summary").value=e&&e.summary||"",document.getElementById("input-doc-content").value=e?e.content:"";const n=document.getElementById("select-doc-category");n.innerHTML=lr.filter(a=>a!=="すべて").map(a=>`<option value="${a}" ${e&&e.category===a?"selected":""}>${a}</option>`).join(""),ss(),Fa("write"),t.classList.remove("hidden")}function Ra(){const e=document.getElementById("modal-info-doc-editor");e&&e.classList.add("hidden"),na=null,Zt=[]}function ss(){const e=document.getElementById("doc-editor-files-list");if(e){if(Zt.length===0){e.innerHTML='<span class="text-xs text-gray-400">添付ファイルはありません</span>';return}e.innerHTML=Zt.map((t,n)=>`
        <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 border border-gray-200 text-xs text-gray-700">
            <span>📎 ${ze(t.name)} (${Math.round((t.size||0)/1024)}KB)</span>
            <button class="btn-del-file text-red-500 hover:text-red-700 font-bold ml-1" data-index="${n}">✕</button>
        </div>
    `).join(""),e.querySelectorAll(".btn-del-file").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-index"));Zt.splice(n,1),ss()})})}}function ji(e){Array.from(e).forEach(t=>{if(t.size>5*1024*1024){alert(`ファイル「${t.name}」が5MBを超えているため添付できません。`);return}const n=new FileReader;n.onload=a=>{Zt.push({name:t.name,size:t.size,type:t.type,dataUrl:a.target.result}),ss()},n.readAsDataURL(t)})}function Hi(e){if(!e)return;const t=new FileReader;t.onload=n=>{const a=n.target.result,s=document.getElementById("input-doc-title"),r=document.getElementById("input-doc-content");s&&(!s.value||s.value.trim()==="")&&(s.value=e.name.replace(/\.md$/i,"")),r&&(r.value=a)},t.readAsText(e)}function Fa(e){const t=document.getElementById("btn-doc-tab-write"),n=document.getElementById("btn-doc-tab-preview"),a=document.getElementById("input-doc-content"),s=document.getElementById("doc-preview-content");e==="write"?(t==null||t.classList.add("bg-white","text-teal-700","shadow-xs"),t==null||t.classList.remove("text-gray-500"),n==null||n.classList.remove("bg-white","text-teal-700","shadow-xs"),n==null||n.classList.add("text-gray-500"),a==null||a.classList.remove("hidden"),s==null||s.classList.add("hidden")):(n==null||n.classList.add("bg-white","text-teal-700","shadow-xs"),n==null||n.classList.remove("text-gray-500"),t==null||t.classList.remove("bg-white","text-teal-700","shadow-xs"),t==null||t.classList.add("text-gray-500"),a==null||a.classList.add("hidden"),s==null||s.classList.remove("hidden"),s&&a&&(s.innerHTML=la(a.value||"*本文が入力されていません*"),rs(s)))}async function Ui(){var i,d,l,c;const e=(i=document.getElementById("input-doc-title"))==null?void 0:i.value.trim(),t=(d=document.getElementById("select-doc-category"))==null?void 0:d.value,n=(l=document.getElementById("input-doc-summary"))==null?void 0:l.value.trim(),a=(c=document.getElementById("input-doc-content"))==null?void 0:c.value.trim();if(!e){alert("タイトルを入力してください");return}if(!a){alert("本文を入力してください");return}const s=new Date().toISOString().split("T")[0],r=!na,o={id:na||`doc_${Date.now()}`,title:e,category:t,summary:n||a.slice(0,100),content:a,files:Zt,created_by:(rt==null?void 0:rt.name)||"管理者",updated_at:s};await Ni(o,r),Ra(),Cn()}function Vi(){const e=document.getElementById("modal-info-top-editor");if(!e)return;const t=document.getElementById("input-info-top-content");t&&(t.value=Qt),ja("write"),e.classList.remove("hidden")}function qa(){const e=document.getElementById("modal-info-top-editor");e&&e.classList.add("hidden")}function ja(e){const t=document.getElementById("btn-top-tab-write"),n=document.getElementById("btn-top-tab-preview"),a=document.getElementById("input-info-top-content"),s=document.getElementById("top-preview-content");e==="write"?(t==null||t.classList.add("bg-white","text-teal-700","shadow-xs"),t==null||t.classList.remove("text-gray-500"),n==null||n.classList.remove("bg-white","text-teal-700","shadow-xs"),n==null||n.classList.add("text-gray-500"),a==null||a.classList.remove("hidden"),s==null||s.classList.add("hidden")):(n==null||n.classList.add("bg-white","text-teal-700","shadow-xs"),n==null||n.classList.remove("text-gray-500"),t==null||t.classList.remove("bg-white","text-teal-700","shadow-xs"),t==null||t.classList.add("text-gray-500"),a==null||a.classList.add("hidden"),s==null||s.classList.remove("hidden"),s&&a&&(s.innerHTML=la(a.value||"*内容が入力されていません*"),rs(s)))}async function Gi(){var t;const e=(t=document.getElementById("input-info-top-content"))==null?void 0:t.value;await Ri(e),qa()}let hn=null;function fr(e=null){const t=document.getElementById("modal-info-link-editor");if(!t)return;hn=e?e.id:null,document.getElementById("link-editor-modal-title").textContent=e?"リンクの編集":"新規リンク追加",document.getElementById("input-link-title").value=e?e.title:"",document.getElementById("input-link-url").value=e?e.url:"",document.getElementById("input-link-desc").value=e&&e.description||"",document.getElementById("input-link-icon").value=e&&e.icon||"🔗";const n=document.getElementById("select-link-category");n.innerHTML=cr.filter(a=>a!=="すべて").map(a=>`<option value="${a}" ${e&&e.category===a?"selected":""}>${a}</option>`).join(""),t.classList.remove("hidden")}function Ha(){const e=document.getElementById("modal-info-link-editor");e&&e.classList.add("hidden"),hn=null}async function Wi(){var i,d,l,c,m,u;const e=(i=document.getElementById("input-link-title"))==null?void 0:i.value.trim(),t=(d=document.getElementById("input-link-url"))==null?void 0:d.value.trim(),n=(l=document.getElementById("select-link-category"))==null?void 0:l.value,a=(c=document.getElementById("input-link-desc"))==null?void 0:c.value.trim(),s=((m=document.getElementById("input-link-icon"))==null?void 0:m.value.trim())||"🔗";if(!e){alert("タイトルを入力してください");return}if(!t){alert("URLを入力してください");return}if(!t.startsWith("http://")&&!t.startsWith("https://")){alert("URLは http:// または https:// から入力してください");return}const r=!hn,o={id:hn||`link_${Date.now()}`,title:e,url:t,category:n,description:a,icon:s,display_order:r?Be.length+1:((u=Be.find(f=>f.id===hn))==null?void 0:u.display_order)||1,created_by:(rt==null?void 0:rt.name)||"管理者",updated_at:new Date().toISOString().split("T")[0]};await Oi(o,r),Ha(),An()}const br=`-- ==========================================
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
`;function zi(){const e=document.getElementById("modal-info-sql");if(!e)return;const t=document.getElementById("info-sql-code");t&&(t.textContent=br),e.classList.remove("hidden")}function Ji(){const e=document.getElementById("modal-info-sql");e&&e.classList.add("hidden")}function Ki(){navigator.clipboard.writeText(br).then(()=>{alert(`SQL文をクリップボードにコピーしました！
Supabase Dashboardの「SQL Editor」で実行してください。`)}).catch(e=>{console.error("Copy failed:",e)})}let Ps=!1;function Yi(){var u,f,b,y,g,p,x,v,h,$,L,E,I,w,k,_,A,P,D,O;if(Ps)return;Ps=!0;const e=document.getElementById("tab-info-docs"),t=document.getElementById("tab-info-surveys"),n=document.getElementById("tab-info-links"),a=document.getElementById("view-info-docs"),s=document.getElementById("view-info-surveys"),r=document.getElementById("view-info-links"),o=document.getElementById("btn-info-new"),i=document.getElementById("btn-survey-new");function d(q){st=q,[e,t,n].forEach(S=>{S&&(S.className="px-4 py-2 font-bold text-gray-500 hover:text-gray-700 border-b-2 border-transparent transition-colors flex items-center space-x-2 cursor-pointer")}),[a,s,r].forEach(S=>S==null?void 0:S.classList.add("hidden")),q==="docs"?(e.className="px-4 py-2 font-bold text-teal-600 border-b-2 border-teal-600 transition-colors flex items-center space-x-2 cursor-pointer",a==null||a.classList.remove("hidden"),o&&(o.classList.remove("hidden"),o.textContent="＋ 新規ドキュメント"),i&&i.classList.add("hidden")):q==="surveys"?(t.className="px-4 py-2 font-bold text-teal-600 border-b-2 border-teal-600 transition-colors flex items-center space-x-2 cursor-pointer",s==null||s.classList.remove("hidden"),o&&o.classList.add("hidden"),i&&Xt&&i.classList.remove("hidden")):(n.className="px-4 py-2 font-bold text-teal-600 border-b-2 border-teal-600 transition-colors flex items-center space-x-2 cursor-pointer",r==null||r.classList.remove("hidden"),o&&(o.classList.remove("hidden"),o.textContent="＋ 新規リンク"),i&&i.classList.add("hidden")),mr()}e==null||e.addEventListener("click",()=>d("docs")),t==null||t.addEventListener("click",()=>d("surveys")),n==null||n.addEventListener("click",()=>d("links"));const l=document.getElementById("input-info-search");l==null||l.addEventListener("input",q=>{wn=q.target.value,st==="docs"?Cn():st==="links"&&An()}),o==null||o.addEventListener("click",()=>{st==="docs"?gr():st==="links"&&fr()}),(u=document.getElementById("btn-edit-top-announcement"))==null||u.addEventListener("click",Vi),(f=document.getElementById("btn-close-top-editor"))==null||f.addEventListener("click",qa),(b=document.getElementById("btn-cancel-top-editor"))==null||b.addEventListener("click",qa),(y=document.getElementById("btn-top-tab-write"))==null||y.addEventListener("click",()=>ja("write")),(g=document.getElementById("btn-top-tab-preview"))==null||g.addEventListener("click",()=>ja("preview")),(p=document.getElementById("btn-save-top-announcement"))==null||p.addEventListener("click",Gi),(x=document.getElementById("btn-close-doc-reader"))==null||x.addEventListener("click",Ns),(v=document.getElementById("btn-close-doc-reader-bg"))==null||v.addEventListener("click",Ns),(h=document.getElementById("btn-export-doc-md"))==null||h.addEventListener("click",qi),($=document.getElementById("btn-close-doc-editor"))==null||$.addEventListener("click",Ra),(L=document.getElementById("btn-cancel-doc-editor"))==null||L.addEventListener("click",Ra),(E=document.getElementById("btn-doc-tab-write"))==null||E.addEventListener("click",()=>Fa("write")),(I=document.getElementById("btn-doc-tab-preview"))==null||I.addEventListener("click",()=>Fa("preview")),(w=document.getElementById("btn-save-doc"))==null||w.addEventListener("click",Ui);const c=document.getElementById("input-doc-attach-files");c==null||c.addEventListener("change",q=>{q.target.files&&ji(q.target.files)});const m=document.getElementById("input-doc-import-md");m==null||m.addEventListener("change",q=>{q.target.files&&q.target.files[0]&&Hi(q.target.files[0])}),(k=document.getElementById("btn-close-link-editor"))==null||k.addEventListener("click",Ha),(_=document.getElementById("btn-cancel-link-editor"))==null||_.addEventListener("click",Ha),(A=document.getElementById("btn-save-link"))==null||A.addEventListener("click",Wi),(P=document.getElementById("btn-info-sql-modal"))==null||P.addEventListener("click",zi),(D=document.getElementById("btn-close-info-sql"))==null||D.addEventListener("click",Ji),(O=document.getElementById("btn-copy-info-sql"))==null||O.addEventListener("click",Ki)}function la(e,t=!1){if(!e)return"";const n=e.split(`
`);let a="",s=!1,r=!1,o=!1,i="",d=!1,l=[],c=!1,m="",u="";const f=[];function b(){s&&(a+=`</ul>
`,s=!1),r&&(a+=`</ol>
`,r=!1),d&&(a+=Os(l),l=[],d=!1),c&&(a+=Qi(m,u),u="",c=!1)}for(let y=0;y<n.length;y++){let g=n[y];if(g.trim().startsWith("```")){o?(a+=`
                    <div class="relative my-3 group">
                        <pre class="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-xs font-mono border border-gray-800 leading-relaxed"><code>${ze(i.trim())}</code></pre>
                        <button class="btn-copy-code absolute top-2 right-2 px-2 py-1 text-[10px] font-bold rounded bg-gray-800 text-gray-300 hover:text-white border border-gray-700 opacity-0 group-hover:opacity-100 transition">コピー</button>
                    </div>
`,i="",o=!1):(b(),o=!0,g.trim().slice(3).trim());continue}if(o){i+=g+`
`;continue}const p=g.trim().match(/^>\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]/i);if(p){b(),c=!0,m=p[1].toUpperCase(),u="";continue}if(c)if(g.startsWith(">")){u+=g.replace(/^>\s?/,"")+`
`;continue}else b();if(g.trim().startsWith("|")&&g.trim().endsWith("|")){d||(b(),d=!0,l=[]),l.push(g.trim());continue}else d&&(a+=Os(l),l=[],d=!1);if(g.trim()===""){b();continue}if(/^(\*{3,}|-{3,}|_{3,})$/.test(g.trim())){b(),a+=`<hr class="my-6 border-t border-gray-200">
`;continue}if(g.startsWith("# ")){b();const h=g.slice(2).trim(),$=`heading-${f.length}`;f.push({level:1,text:h,id:$}),a+=`<h1 id="${$}" class="text-2xl font-bold text-gray-900 mt-6 mb-3 pb-2 border-b border-gray-200">${Ye(h)}</h1>
`;continue}if(g.startsWith("## ")){b();const h=g.slice(3).trim(),$=`heading-${f.length}`;f.push({level:2,text:h,id:$}),a+=`<h2 id="${$}" class="text-xl font-bold text-gray-800 mt-5 mb-2.5">${Ye(h)}</h2>
`;continue}if(g.startsWith("### ")){b();const h=g.slice(4).trim(),$=`heading-${f.length}`;f.push({level:3,text:h,id:$}),a+=`<h3 id="${$}" class="text-lg font-bold text-gray-800 mt-4 mb-2">${Ye(h)}</h3>
`;continue}if(g.startsWith("#### ")){b();const h=g.slice(5).trim();a+=`<h4 class="text-base font-semibold text-gray-700 mt-3 mb-1.5">${Ye(h)}</h4>
`;continue}if(g.startsWith("> ")){b(),a+=`<blockquote class="border-l-4 border-teal-500 pl-4 py-1.5 my-3 bg-teal-50/50 text-xs text-gray-700 rounded-r">${Ye(g.slice(2))}</blockquote>
`;continue}const x=g.trim().match(/^[-*]\s*\[([ xX])\]\s*(.*)/);if(x){b();const h=x[1].toLowerCase()==="x";a+=`
                <div class="flex items-center gap-2 my-1 text-xs text-gray-700">
                    <input type="checkbox" ${h?"checked":""} disabled class="rounded text-teal-600">
                    <span class="${h?"line-through text-gray-400":""}">${Ye(x[2])}</span>
                </div>
`;continue}if(g.trim().startsWith("- ")||g.trim().startsWith("* ")){r&&(a+=`</ol>
`,r=!1),s||(a+=`<ul class="list-disc list-inside my-2 space-y-1 text-xs text-gray-700 leading-relaxed">
`,s=!0);const h=g.trim().slice(2);a+=`  <li>${Ye(h)}</li>
`;continue}const v=g.trim().match(/^(\d+)\.\s+(.*)/);if(v){s&&(a+=`</ul>
`,s=!1),r||(a+=`<ol class="list-decimal list-inside my-2 space-y-1 text-xs text-gray-700 leading-relaxed">
`,r=!0),a+=`  <li>${Ye(v[2])}</li>
`;continue}b(),a+=`<p class="my-2 text-xs text-gray-700 leading-relaxed">${Ye(g)}</p>
`}return b(),t&&f.length>=2&&(a=`
            <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                <span class="text-xs font-bold text-gray-700 block mb-2">📑 目次</span>
                <ul class="space-y-1 text-xs">
                    ${f.map(g=>`
                        <li class="${g.level===2?"pl-3":g.level===3?"pl-6":""}">
                            <a href="#${g.id}" class="text-teal-600 hover:text-teal-800 hover:underline">
                                ${ze(g.text)}
                            </a>
                        </li>
                    `).join("")}
                </ul>
            </div>
        `+a),a}function Qi(e,t){let n="border-teal-500",a="bg-teal-50/70",s="text-teal-800",r="ℹ️",o="NOTE";e==="TIP"?(n="border-emerald-500",a="bg-emerald-50/70",s="text-emerald-800",r="💡",o="TIP"):e==="WARNING"||e==="CAUTION"?(n="border-amber-500",a="bg-amber-50/70",s="text-amber-800",r="⚠️",o="WARNING"):e==="IMPORTANT"&&(n="border-blue-500",a="bg-blue-50/70",s="text-blue-800",r="📌",o="IMPORTANT");const i=t.split(`
`).filter(d=>d.trim()).map(d=>`<p class="my-1 text-xs text-gray-700 leading-relaxed">${Ye(d)}</p>`).join("");return`
        <div class="border-l-4 ${n} ${a} p-3.5 my-3 rounded-r-xl border border-gray-200/50">
            <div class="flex items-center gap-1.5 font-bold text-xs ${s} mb-1">
                <span>${r}</span>
                <span>${o}</span>
            </div>
            ${i}
        </div>
    `}function Os(e){if(e.length<2)return"";let t='<div class="overflow-x-auto my-4 scrollbar-thin"><table class="min-w-full text-xs border border-gray-200 rounded-xl overflow-hidden">';const n=e[0].split("|").slice(1,-1).map(a=>a.trim());t+='<thead class="bg-gray-50 border-b border-gray-200"><tr>',n.forEach(a=>{t+=`<th class="px-3.5 py-2.5 text-left font-bold text-gray-700 border-r border-gray-200 last:border-r-0">${Ye(a)}</th>`}),t+="</tr></thead><tbody>";for(let a=2;a<e.length;a++){const s=e[a].split("|").slice(1,-1).map(r=>r.trim());t+=`<tr class="${a%2===0?"bg-white":"bg-gray-50/40"} border-b border-gray-100 last:border-b-0 hover:bg-teal-50/30">`,s.forEach(r=>{t+=`<td class="px-3.5 py-2.5 text-gray-600 border-r border-gray-100 last:border-r-0">${Ye(r)}</td>`}),t+="</tr>"}return t+="</tbody></table></div>",t}function Ye(e){if(!e)return"";let t=ze(e);return t=t.replace(/\*\*(.*?)\*\*/g,'<strong class="font-bold text-gray-900">$1</strong>'),t=t.replace(/\*(.*?)\*/g,'<em class="italic">$1</em>'),t=t.replace(/`([^`]+)`/g,'<code class="px-1.5 py-0.5 bg-gray-100 text-teal-700 rounded text-[11px] font-mono border border-gray-200">$1</code>'),t=t.replace(/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer" class="text-teal-600 hover:text-teal-800 underline font-semibold">$1 ↗</a>'),t}function rs(e){e.querySelectorAll(".btn-copy-code").forEach(t=>{t.addEventListener("click",()=>{var a;const n=((a=t.parentElement.querySelector("code"))==null?void 0:a.textContent)||"";navigator.clipboard.writeText(n).then(()=>{const s=t.textContent;t.textContent="コピー完了！",setTimeout(()=>{t.textContent=s},2e3)})})})}function ze(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}const os=void 0,is=void 0;alert(`Supabaseの接続情報（環境変数）が正しく読み込めていません。
Vercel等の設定を確認してください。`),console.error("Missing SUPABASE_URL or SUPABASE_ANON_KEY");console.log("Checking Supabase URL:","Empty");!window.supabaseClient&&window.supabase&&window.supabase.createClient&&(window.supabaseClient=window.supabase.createClient(os,is));const B=window.supabaseClient;let G=null,mn=!1,he="user";function ca(e){return e=e.trim(),e?e.includes("@")?e:`${e}@ants.local`:""}function en(e){return e?e.endsWith("@ants.local")?e.split("@")[0]:e:""}let cn=0,nt=null;function Zi(e){const t=document.getElementById("loading-overlay");if(t){const n=t.querySelector("span");n&&(n.textContent=e)}nt||(nt=document.createElement("div"),nt.id="loading-detail-text",nt.className="fixed bottom-2 right-2 text-xs md:text-sm font-bold text-gray-600 bg-white/90 border border-gray-300 px-3 py-1.5 rounded shadow-lg pointer-events-none z-[9999] transition-opacity duration-300",document.body.appendChild(nt)),nt.textContent=e,nt.style.opacity="1"}function U(e="通信中..."){cn++;const t=document.getElementById("loading-overlay");t&&cn===1&&t.classList.remove("hidden"),Zi(e)}function F(){var e;cn--,cn<=0&&(cn=0,(e=document.getElementById("loading-overlay"))==null||e.classList.add("hidden"),nt&&(nt.style.opacity="0"))}function Ge(){var e;cn=0,(e=document.getElementById("loading-overlay"))==null||e.classList.add("hidden"),nt&&(nt.style.opacity="0")}async function fe(e,t="通信中..."){{alert("環境変数 (VITE_SUPABASE_URL) が設定されていません。Vercelの設定を確認してください。");return}}async function X(e,t){if(G&&e!=="NAVIGATE")try{await B.from("action_logs").insert({user_email:G.email,action_type:e,details:t})}catch(n){console.error("Log error:",n)}}function Ms(){var e,t,n,a,s,r,o,i,d,l,c,m,u,f,b,y,g,p,x,v,h,$,L,E,I,w,k,_,A,P,D,O,q,S,C,N,T,M,W,j,H,R,z,de,ee,ge;if(!window.isDomInitialized)try{if(window.isDomInitialized=!0,document.title="bb-sys for arinko ants.",document.body){const V=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,!1);let le;for(;le=V.nextNode();)le.nodeValue.includes("配車調整アプリ")&&(le.nodeValue=le.nodeValue.replace(/配車調整アプリ/g,"bb-sys for arinko ants.")),le.nodeValue.includes("少年野球に役立つツール for arinko ants.")&&(le.nodeValue=le.nodeValue.replace(/少年野球に役立つツール for arinko ants./g,"bb-sys for arinko ants."))}document.documentElement.style.setProperty("--layout-columns",Ga),window.addEventListener("resize",Fs),Fs(),(e=document.getElementById("btn-login"))==null||e.addEventListener("click",Rs),(t=document.getElementById("auth-form"))==null||t.addEventListener("submit",Rs),(n=document.getElementById("btn-logout"))==null||n.addEventListener("click",On),(a=document.getElementById("btn-logout-menu"))==null||a.addEventListener("click",On),(s=document.getElementById("btn-clear-cache"))==null||s.addEventListener("click",Xi),(r=document.getElementById("link-to-signup"))==null||r.addEventListener("click",V=>{V.preventDefault(),K("signup-view")}),(o=document.getElementById("link-to-reset"))==null||o.addEventListener("click",V=>{V.preventDefault(),K("password-reset-view")}),document.querySelectorAll(".link-back-to-login").forEach(V=>V.addEventListener("click",le=>{le.preventDefault(),K("auth-view")})),(i=document.getElementById("btn-submit-signup"))==null||i.addEventListener("click",ed),(d=document.getElementById("btn-send-reset"))==null||d.addEventListener("click",td),(l=document.getElementById("btn-update-password"))==null||l.addEventListener("click",nd),(c=document.getElementById("btn-change-password"))==null||c.addEventListener("click",()=>{var V;(V=document.getElementById("change-password-modal"))==null||V.classList.remove("hidden")}),(m=document.getElementById("btn-close-change-password"))==null||m.addEventListener("click",()=>{var V;(V=document.getElementById("change-password-modal"))==null||V.classList.add("hidden")}),(u=document.getElementById("btn-submit-change-password"))==null||u.addEventListener("click",ad);const we=document.getElementById("btn-change-password");we&&(we.textContent="パスワード変更"),(f=document.getElementById("nav-users"))==null||f.addEventListener("click",En),(b=document.getElementById("btn-admin-add-user"))==null||b.addEventListener("click",adminAddUser),(y=document.getElementById("btn-reload-users"))==null||y.addEventListener("click",ae),(g=document.getElementById("btn-save-all-users"))==null||g.addEventListener("click",sd),(p=document.getElementById("admin-users-sort"))==null||p.addEventListener("change",V=>{localStorage.setItem("admin_users_sort",V.target.value),ae()}),(x=document.getElementById("btn-export-users"))==null||x.addEventListener("click",Wd),(v=document.getElementById("btn-import-users"))==null||v.addEventListener("click",()=>document.getElementById("input-import-users-csv").click()),(h=document.getElementById("btn-download-users-sample"))==null||h.addEventListener("click",Yd),($=document.getElementById("input-import-users-csv"))==null||$.addEventListener("change",zd),(L=document.getElementById("btn-close-csv-modal"))==null||L.addEventListener("click",ra),(E=document.getElementById("btn-close-csv-modal-x"))==null||E.addEventListener("click",ra),(I=document.getElementById("btn-execute-csv-import"))==null||I.addEventListener("click",Jd);const Lt=document.getElementById("btn-admin-add-user");if(Lt&&!document.getElementById("btn-admin-add-dummy-user")){const V=document.createElement("button");V.id="btn-admin-add-dummy-user",V.className="ml-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow font-bold text-sm",V.textContent="代行専用メンバー追加",V.onclick=adminAddDummyUser,(w=Lt.parentNode)==null||w.appendChild(V)}const lt=document.querySelector("#view-master #btn-load-logs");lt&&lt.remove();const ne=document.querySelector("#view-master #log-list");if(ne){const V=ne.closest(".bg-white");V?V.remove():ne.remove()}document.querySelectorAll("#view-master h2").forEach(V=>{V.textContent.includes("操作ログ")&&V.remove()});const Je=document.getElementById("tab-master-admin");if(Je&&!document.getElementById("tab-logs-admin")){const V=Je.parentElement,le=document.createElement("button");le.id="tab-logs-admin",le.className="px-4 py-2 font-bold text-gray-500 hover:text-gray-700 border-b-2 border-transparent transition-colors",le.textContent="操作ログ",V==null||V.appendChild(le);const Me=document.createElement("div");Me.id="tab-content-logs-admin",Me.className="hidden",Me.innerHTML=`
                <div class="mb-4 flex space-x-2 mt-4">
                    <button id="btn-load-logs" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow font-bold">最新を読み込み</button>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
                    <div id="log-list" class="min-w-[600px] text-sm flex flex-col">
                        <p class="text-gray-500 py-4 text-center">「最新を読み込み」ボタンを押してください</p>
                    </div>
                </div>
            `;const Ue=document.getElementById("tab-content-master-admin");Ue&&Ue.parentElement&&Ue.parentElement.appendChild(Me)}const Ce=V=>{[{btnId:"tab-users-admin",contentId:"tab-content-users-admin"},{btnId:"tab-master-admin",contentId:"tab-content-master-admin"},{btnId:"tab-logs-admin",contentId:"tab-content-logs-admin"}].forEach(Me=>{const Ue=document.getElementById(Me.btnId),Ut=document.getElementById(Me.contentId);!Ue||!Ut||(Me.btnId===V?(Ue.className="px-4 py-2 font-bold text-blue-600 border-b-2 border-blue-600 transition-colors",Ut.classList.remove("hidden"),V==="tab-logs-admin"&&_n()):(Ue.className="px-4 py-2 font-bold text-gray-500 hover:text-gray-700 border-b-2 border-transparent transition-colors",Ut.classList.add("hidden")))})};(k=document.getElementById("tab-users-admin"))==null||k.addEventListener("click",()=>Ce("tab-users-admin")),(_=document.getElementById("tab-master-admin"))==null||_.addEventListener("click",()=>Ce("tab-master-admin")),(A=document.getElementById("tab-logs-admin"))==null||A.addEventListener("click",()=>Ce("tab-logs-admin")),(P=document.getElementById("btn-load-logs"))==null||P.addEventListener("click",_n),(D=document.getElementById("btn-app-dispatch"))==null||D.addEventListener("click",()=>{var V;K("app-view","dispatch"),mn?(V=document.getElementById("nav-dispatch"))==null||V.click():Va()}),(O=document.getElementById("btn-app-attendance"))==null||O.addEventListener("click",async()=>{K("attendance-view"),await fe(Ba,"出欠管理画面を準備中...")}),(q=document.getElementById("btn-app-dashboard"))==null||q.addEventListener("click",async()=>{await fe(Ca,"ダッシュボードを準備中..."),K("dashboard-view")}),(S=document.getElementById("btn-app-info"))==null||S.addEventListener("click",async()=>{await fe(async()=>{await jn({supabaseClient:B,currentUser:G,currentUserRole:he})},"Info画面を準備中..."),K("info-view")}),(C=document.getElementById("btn-back-to-menu-info"))==null||C.addEventListener("click",()=>K("app-menu-view")),(N=document.getElementById("btn-logout-info"))==null||N.addEventListener("click",On),(T=document.getElementById("btn-back-to-menu"))==null||T.addEventListener("click",()=>{K("app-menu-view")}),(M=document.getElementById("btn-back-to-menu-att"))==null||M.addEventListener("click",()=>K("app-menu-view")),(W=document.getElementById("btn-logout-att"))==null||W.addEventListener("click",On),(j=document.getElementById("btn-change-password-menu"))==null||j.addEventListener("click",ds);const mt=(H=document.getElementById("app-menu-view"))==null?void 0:H.querySelector(".space-y-4");mt&&(mt.className="w-full max-w-xs mx-auto space-y-3 mt-4");const pt=document.getElementById("btn-app-dispatch");pt&&(pt.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-blue-600 hover:bg-blue-700 hover:shadow-lg text-white text-left",pt.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">🚗</span><span>配車調整</span></div><span class="text-white/60 text-sm font-normal">❯</span>');const ct=document.getElementById("btn-app-attendance");ct&&(ct.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-green-600 hover:bg-green-700 hover:shadow-lg text-white text-left",ct.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">📅</span><span>出欠管理</span></div><span class="text-white/60 text-sm font-normal">❯</span>');const Ke=document.getElementById("btn-app-simulator");Ke&&(Ke.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-amber-600 hover:bg-amber-700 hover:shadow-lg text-white text-left",Ke.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">⚾</span><span>ポジション設定</span></div><span class="text-white/60 text-sm font-normal">❯</span>',Ke.onclick=()=>{K("position-simulator-view"),Fn()});const Ae=document.getElementById("btn-app-info");Ae&&(Ae.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-teal-600 hover:bg-teal-700 hover:shadow-lg text-white text-left",Ae.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">ℹ️</span><span>Info</span></div><span class="text-white/60 text-sm font-normal">❯</span>',Ae.onclick=async()=>{await fe(async()=>{await jn({supabaseClient:B,currentUser:G,currentUserRole:he})},"Info画面を準備中..."),K("info-view")}),(R=document.getElementById("nav-info"))==null||R.addEventListener("click",async()=>{await fe(async()=>{await jn({supabaseClient:B,currentUser:G,currentUserRole:he})},"Info画面を準備中..."),K("info-view")}),(z=document.getElementById("nav-simulator"))==null||z.addEventListener("click",()=>{K("position-simulator-view"),Fn()}),(de=document.getElementById("nav-simulator-att"))==null||de.addEventListener("click",()=>{K("position-simulator-view"),Fn()}),(ee=document.getElementById("nav-dispatch-sim"))==null||ee.addEventListener("click",()=>{var V;K("app-view","dispatch"),mn?(V=document.getElementById("nav-dispatch"))==null||V.click():Va()}),(ge=document.getElementById("nav-attendance-sim"))==null||ge.addEventListener("click",async()=>{K("attendance-view"),await fe(Ba,"出欠管理画面を準備中...")})}catch(we){console.error("DOM Initialization failed:",we),Ge(),K("auth-view")}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ms):setTimeout(Ms,0);let Ua=!1;function aa(e,t=null){if(Ua)return;const n="#"+e+(t?"-"+t:"");window.location.hash!==n&&history.pushState({screenId:e,subView:t},"",n)}function K(e,t=null){["auth-view","signup-view","password-reset-view","password-update-view","app-menu-view","app-view","attendance-view","view-users","dashboard-view","dashboard-settings","position-simulator-view","info-view","survey-respond-view"].forEach(a=>{const s=document.getElementById(a);s&&s.classList.add("hidden")});const n=document.getElementById(e);n&&n.classList.remove("hidden"),aa(e,t),e!=="auth-view"&&e!=="survey-respond-view"&&G&&X("NAVIGATE",`画面遷移: ${e}${t?" > "+t:""}`)}window.addEventListener("popstate",async e=>{var t,n;Ua=!0;try{const a=window.location.hash;if(a.startsWith("#survey-")){await Kn(a.replace("#survey-",""));return}e.state&&e.state.screenId?(K(e.state.screenId,e.state.subView),e.state.screenId==="app-view"&&(e.state.subView==="users"?await En():e.state.subView==="master"?(t=document.getElementById("nav-master"))==null||t.click():(n=document.getElementById("nav-dispatch"))==null||n.click())):K(G?"app-menu-view":"auth-view")}finally{Ua=!1}});B&&B.auth.onAuthStateChange(async(e,t)=>{if(e==="PASSWORD_RECOVERY"){K("password-update-view");return}if(t&&mn&&G&&(e==="TOKEN_REFRESHED"||e==="USER_UPDATED")){console.log(`Bypassing auth state change handling for event: ${e}`);return}const n=async()=>{var a,s,r,o,i,d,l,c;if(t){U("ユーザー権限確認中...");try{const m=!G||G.id!==t.user.id;G={...t.user},m&&await X("LOGIN","ログインしました");let u=!0,f=!0,b=!0,y=!0,g=!0;try{const{data:H}=await B.from("app_users").select("role, name, can_use_dispatch, can_use_dashboard, can_use_attendance, can_use_simulator, can_use_info").eq("email",G.email).single();H?(he=H.role,G.name=H.name,H.can_use_dispatch===!1&&(u=!1),H.can_use_dashboard===!1&&(f=!1),H.can_use_attendance===!1&&(b=!1),H.can_use_simulator===!1&&(y=!1),H.can_use_info===!1&&(g=!1)):he="user"}catch{he="user"}G.email==="hishinumak@gmail.com"&&(he="admin"),he==="admin"&&(u=!0,f=!0,b=!0,y=!0,g=!0);let p=document.getElementById("btn-app-dashboard");if(f)if(p)p.classList.remove("hidden");else{const H=((a=document.getElementById("app-menu-view"))==null?void 0:a.querySelector(".space-y-3"))||((s=document.getElementById("app-menu-view"))==null?void 0:s.querySelector(".space-y-4"))||((r=document.getElementById("app-menu-view"))==null?void 0:r.querySelector(".grid"));H&&(p=document.createElement("button"),p.id="btn-app-dashboard",p.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg text-white text-left",p.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">📊</span><span>分析</span></div><span class="text-white/60 text-sm font-normal">❯</span>',p.onclick=async()=>{await fe(Ca,"ダッシュボードを準備中..."),K("dashboard-view")},H.appendChild(p))}else p&&p.classList.add("hidden");const x=document.getElementById("nav-users"),v=document.getElementById("nav-master"),h=document.getElementById("nav-dispatch"),$=document.getElementById("btn-app-dispatch"),L=document.getElementById("btn-goto-master"),E=document.getElementById("clear-db-button");let I=document.getElementById("btn-app-users-admin");if(x==null||x.classList.add("hidden"),he==="admin"?(h==null||h.classList.remove("hidden"),v==null||v.classList.remove("hidden")):he==="leader"?(h==null||h.classList.remove("hidden"),v==null||v.classList.add("hidden")):(h==null||h.classList.add("hidden"),v==null||v.classList.add("hidden")),he==="admin")if(L==null||L.classList.remove("hidden"),E==null||E.classList.remove("hidden"),I)I.classList.remove("hidden");else{const H=((o=document.getElementById("app-menu-view"))==null?void 0:o.querySelector(".space-y-3"))||((i=document.getElementById("app-menu-view"))==null?void 0:i.querySelector(".space-y-4"))||((d=document.getElementById("app-menu-view"))==null?void 0:d.querySelector(".grid"));H&&(I=document.createElement("button"),I.id="btn-app-users-admin",I.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-purple-600 hover:bg-purple-700 hover:shadow-lg text-white text-left order-last",I.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">⚙️</span><span>管理者メニュー</span></div><span class="text-white/60 text-sm font-normal">❯</span>',I.onclick=()=>yr(),H.appendChild(I))}else L==null||L.classList.add("hidden"),E==null||E.classList.add("hidden"),I&&I.classList.add("hidden");u?$==null||$.classList.remove("hidden"):$==null||$.classList.add("hidden");const w=document.getElementById("btn-app-attendance");b?w==null||w.classList.remove("hidden"):w==null||w.classList.add("hidden");const k=document.getElementById("btn-app-simulator"),_=document.getElementById("nav-simulator"),A=document.getElementById("nav-simulator-att"),P=document.getElementById("nav-dispatch-sim"),D=document.getElementById("nav-attendance-sim");y?(k==null||k.classList.remove("hidden"),_==null||_.classList.remove("hidden"),A==null||A.classList.remove("hidden")):(k==null||k.classList.add("hidden"),_==null||_.classList.add("hidden"),A==null||A.classList.add("hidden")),u?P==null||P.classList.remove("hidden"):P==null||P.classList.add("hidden"),b?D==null||D.classList.remove("hidden"):D==null||D.classList.add("hidden");const O=document.getElementById("btn-app-info"),q=document.getElementById("nav-info");g?(O==null||O.classList.remove("hidden"),q==null||q.classList.remove("hidden")):(O==null||O.classList.add("hidden"),q==null||q.classList.add("hidden"));const S=document.getElementById("user-email-display");S&&(S.textContent=G.name||en(G.email));const C=document.getElementById("sim-user-email-display");C&&(C.textContent=G.name||en(G.email));const T=new URLSearchParams(window.location.search).get("survey"),M=window.location.hash.startsWith("#survey-")?window.location.hash.replace("#survey-",""):null,W=T||M;if(W){await Kn(W);return}const j=window.location.hash;if(j&&j!=="#app-menu-view"&&j!=="#auth-view"){const H=["app-view","attendance-view","dashboard-view","position-simulator-view","info-view"];let R=!1;for(const z of H)if(j.startsWith("#"+z)){const de=j.length>z.length+1?j.substring(z.length+2):null;z==="app-view"?(K("app-view",de),mn?de==="users"?En():de==="master"?(l=document.getElementById("nav-master"))==null||l.click():(c=document.getElementById("nav-dispatch"))==null||c.click():Va().then(()=>{var ee,ge;de==="users"?En():de==="master"?(ee=document.getElementById("nav-master"))==null||ee.click():(ge=document.getElementById("nav-dispatch"))==null||ge.click()}).catch(ee=>{console.error("App init error:",ee),Ge()})):z==="attendance-view"?(K("attendance-view"),Ba().catch(ee=>{console.error("Attendance init error:",ee),Ge()})):z==="dashboard-view"?(K("dashboard-view"),Ca().catch(ee=>{console.error("Dashboard init error:",ee),Ge()})):z==="position-simulator-view"?(K("position-simulator-view"),Fn()):z==="info-view"&&(K("info-view"),jn({supabaseClient:B,currentUser:G,currentUserRole:he}).catch(ee=>{console.error("Info init error:",ee),Ge()})),R=!0;break}R||K("app-menu-view")}else K("app-menu-view")}catch(m){console.error("Auth state handling error:",m),Ge()}finally{F()}}else{G=null,Ge();const u=new URLSearchParams(window.location.search).get("survey"),f=window.location.hash.startsWith("#survey-")?window.location.hash.replace("#survey-",""):null,b=u||f;if(b){await Kn(b);return}const y=document.getElementById("password-update-view");(!y||y.classList.contains("hidden"))&&K("auth-view")}};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{n().catch(console.error)}):setTimeout(()=>{n().catch(console.error)},0)});async function Xi(e){if(e&&e.preventDefault&&e.preventDefault(),!!confirm(`ブラウザに保存されているログイン情報（キャッシュ）をクリアして、ページを再読み込みしますか？
（動作がおかしい・ログインできない場合にお試しください）`)){U("キャッシュクリア中...");try{await B.auth.signOut().catch(()=>{});const t=[];for(let n=0;n<localStorage.length;n++){const a=localStorage.key(n);a&&a.startsWith("sb-")&&t.push(a)}t.forEach(n=>localStorage.removeItem(n)),alert("キャッシュをクリアしました。ページを再読み込みします。"),location.reload()}catch{Ge()}}}let Ea=!1;async function Rs(e){var r,o;if(e&&e.preventDefault&&e.preventDefault(),Ea)return;const t=((r=document.getElementById("email-address"))==null?void 0:r.value)||"",n=ca(t),a=((o=document.getElementById("password"))==null?void 0:o.value)||"",s=document.getElementById("auth-message");if(s&&s.classList.add("hidden"),!(!n||!a)){Ea=!0,U("ログイン認証中...");try{const{error:i}=await B.auth.signInWithPassword({email:n,password:a});i&&(s?(s.textContent="ログイン失敗: "+i.message,s.classList.remove("hidden"),s.classList.add("text-red-500")):alert("ログイン失敗: "+i.message))}catch(i){console.error("Login Error:",i);const d=i.message+`
`+JSON.stringify(i,Object.getOwnPropertyNames(i));s?(s.textContent="通信エラー詳細: "+d,s.classList.remove("hidden"),s.classList.add("text-red-500")):alert(`通信エラー詳細:
`+d)}finally{F(),Ea=!1}}}async function yr(){K("app-view","users"),await En()}function ds(){const e=document.getElementById("change-password-modal");e&&(document.body.appendChild(e),e.classList.remove("hidden"),e.style.zIndex="9999")}let _a=!1;async function ed(e){var i,d,l,c;if(e&&e.preventDefault&&e.preventDefault(),_a)return;const t=((i=document.getElementById("signup-parent-name"))==null?void 0:i.value)||"",n=((d=document.getElementById("signup-player-name"))==null?void 0:d.value)||"",a=((l=document.getElementById("signup-email"))==null?void 0:l.value)||"";let s=((c=document.getElementById("signup-password"))==null?void 0:c.value)||"";const r=document.getElementById("signup-message");r&&r.classList.add("hidden");const o=document.getElementById("signup-password")!==null;if(o||(s=Math.random().toString(36).slice(-10)+"A1!"),!t||!n||!a||o&&s.length<6){r&&(r.textContent=o?"すべての項目を正しく入力してください(パスワードは6文字以上)":"すべての項目を正しく入力してください"),r&&r.classList.remove("hidden","text-green-600"),r&&r.classList.add("text-red-500");return}_a=!0,U("利用申請を送信中...");try{const{data:m,error:u}=await B.auth.signUp({email:a,password:s});if(u){r&&(r.textContent="登録エラー: "+u.message),r&&r.classList.remove("hidden","text-green-600"),r&&r.classList.add("text-red-500");return}const{error:f}=await B.from("signup_requests").insert([{parent_name:t,player_name:n,email:a,status:"pending"}]);await B.auth.signOut(),f?(r&&(r.textContent="申請失敗: "+f.message),r&&r.classList.remove("hidden","text-green-600"),r&&r.classList.add("text-red-500")):(r&&(r.textContent=o?"アカウントが作成され、利用申請が送信されました。管理者の承認をお待ちください。":"利用申請が送信されました。管理者の承認後、「パスワードを忘れた場合」からパスワードを再設定してログインしてください。"),r&&r.classList.remove("text-red-500"),r&&r.classList.add("text-green-600"),r&&r.classList.remove("hidden"),document.getElementById("signup-parent-name")&&(document.getElementById("signup-parent-name").value=""),document.getElementById("signup-player-name")&&(document.getElementById("signup-player-name").value=""),document.getElementById("signup-email")&&(document.getElementById("signup-email").value=""),document.getElementById("signup-password")&&(document.getElementById("signup-password").value=""))}catch(m){Ge(),console.error("Signup Error:",m),r&&(r.textContent="登録処理中にエラーが発生しました。",r.classList.remove("hidden","text-green-600"),r.classList.add("text-red-500"))}finally{F(),_a=!1}}async function td(e){var a;e&&e.preventDefault&&e.preventDefault();const t=((a=document.getElementById("reset-email"))==null?void 0:a.value)||"",n=document.getElementById("reset-message");if(n&&n.classList.add("hidden"),!!t){U("パスワード再設定メール送信中...");try{const{error:s}=await B.auth.resetPasswordForEmail(t,{redirectTo:window.location.origin});s?n?(n.textContent="送信失敗: "+s.message,n.classList.remove("hidden","text-green-600"),n.classList.add("text-red-500")):alert("送信失敗: "+s.message):n?(n.textContent="パスワード再設定メールを送信しました。",n.classList.remove("text-red-500"),n.classList.add("text-green-600"),n.classList.remove("hidden")):alert("パスワード再設定メールを送信しました。")}catch(s){console.error("Password reset error:",s)}finally{F()}}}async function nd(e){var a;e&&e.preventDefault&&e.preventDefault();const t=((a=document.getElementById("new-password"))==null?void 0:a.value)||"",n=document.getElementById("update-password-message");if(n&&n.classList.add("hidden"),!t||t.length<6){n?(n.textContent="6文字以上のパスワードを入力してください",n.classList.remove("hidden","text-green-600"),n.classList.add("text-red-500")):alert("6文字以上のパスワードを入力してください");return}U("パスワード更新中...");try{const{error:s}=await B.auth.updateUser({password:t});s?n?(n.textContent="更新失敗: "+s.message,n.classList.remove("hidden","text-green-600"),n.classList.add("text-red-500")):alert("更新失敗: "+s.message):(alert("パスワードが更新されました。再度ログインしてください。"),K("auth-view"))}catch(s){console.error("Password update error:",s)}finally{F()}}async function ad(e){var n;e&&e.preventDefault&&e.preventDefault();const t=((n=document.getElementById("change-new-password"))==null?void 0:n.value)||"";if(!t||t.length<6)return alert("6文字以上のパスワードを入力してください");U("パスワード変更中...");try{const{error:a}=await B.auth.updateUser({password:t});if(a)alert("更新失敗: "+a.message);else{alert("パスワードが変更されました。");const s=document.getElementById("change-password-modal");s&&s.classList.add("hidden");const r=document.getElementById("change-new-password");r&&(r.value="")}}catch(a){console.error("Password change error:",a)}finally{F()}}async function On(e){e&&e.preventDefault&&e.preventDefault(),G&&await X("LOGOUT","ログアウトしました"),U("ログアウト処理中...");try{await B.auth.signOut().catch(()=>{})}finally{F(),mn=!1,history.pushState(null,"",window.location.pathname)}}function Hn(e){const t=document.getElementById("nav-dispatch"),n=document.getElementById("nav-master"),a=document.getElementById("nav-users");e==="users"?(t==null||t.classList.add("hidden"),n==null||n.classList.add("hidden"),a==null||a.classList.add("hidden")):(a==null||a.classList.add("hidden"),he==="admin"?(t==null||t.classList.remove("hidden"),n==null||n.classList.remove("hidden")):he==="leader"?(t==null||t.classList.remove("hidden"),n==null||n.classList.add("hidden")):(t==null||t.classList.add("hidden"),n==null||n.classList.add("hidden")))}let se=[],re=[],Re=[],xn=new Set;async function Va(){var e,t,n;mn=!0,Hn("dispatch"),_e==null||_e.addEventListener("click",async()=>{var a,s;sn==null||sn.classList.remove("hidden"),rn==null||rn.classList.add("hidden"),(a=document.getElementById("view-users"))==null||a.classList.add("hidden"),Hn("dispatch"),_e==null||_e.classList.add("text-blue-300"),_e==null||_e.classList.remove("text-gray-400"),Ie==null||Ie.classList.remove("text-blue-300"),Ie==null||Ie.classList.add("text-gray-400"),(s=document.getElementById("nav-users"))==null||s.classList.remove("text-blue-300"),aa("app-view","dispatch"),await qs()}),Ie==null||Ie.addEventListener("click",async()=>{var a,s;rn==null||rn.classList.remove("hidden"),sn==null||sn.classList.add("hidden"),(a=document.getElementById("view-users"))==null||a.classList.add("hidden"),Hn("master"),Ie==null||Ie.classList.add("text-blue-300"),Ie==null||Ie.classList.remove("text-gray-400"),_e==null||_e.classList.remove("text-blue-300"),_e==null||_e.classList.add("text-gray-400"),(s=document.getElementById("nav-users"))==null||s.classList.remove("text-blue-300"),aa("app-view","master"),await dd(),_n()}),(e=document.getElementById("btn-goto-master"))==null||e.addEventListener("click",()=>{Ie==null||Ie.click()}),(t=document.getElementById("btn-back-to-dispatch"))==null||t.addEventListener("click",()=>{_e==null||_e.click()});try{await J.initMasterData(),se.length===0&&re.length===0&&(await J.bulkAddFamilies(od),await J.bulkAddCars(id),await J.syncMaster(),await J.initMasterData()),await qs(),cd(),Cd(),(n=document.getElementById("btn-load-logs"))==null||n.addEventListener("click",_n)}catch(a){console.error(a),He("データの読み込みに失敗しました。","error")}}async function En(){he==="admin"&&(document.getElementById("view-users").classList.remove("hidden"),document.getElementById("view-master").classList.add("hidden"),document.getElementById("view-dispatch").classList.add("hidden"),Hn("users"),document.getElementById("nav-users").classList.add("text-blue-300"),document.getElementById("nav-users").classList.remove("text-gray-400"),document.getElementById("nav-dispatch").classList.remove("text-blue-300"),document.getElementById("nav-master").classList.remove("text-blue-300"),aa("app-view","users"),await ae())}async function ae(){U("メンバー・マスタ情報読み込み中...");try{const{data:e}=await B.from("app_users").select("*").order("created_at",{ascending:!1});let t=[],n=[],a=[],s=[],r=[];try{const{data:p}=await B.from("groups").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});p&&(t=p);const{data:x}=await B.from("user_groups").select("*");x&&(n=x);const{data:v}=await B.from("event_categories").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});v&&(a=v);const{data:h}=await B.from("user_attributes").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});h&&(s=h);try{const{data:L}=await B.from("event_locations").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});L&&(r=L)}catch(L){console.warn("event_locations table not created yet:",L)}const{data:$}=await B.from("master_data").select("*").eq("key","ATTENDANCE_DELEGATIONS").single();$&&$.data?window.adminDelegations=$.data:window.adminDelegations={}}catch(p){console.error("Groups DB Error:",p)}const o=localStorage.getItem("admin_users_sort")||"created_desc",i=document.getElementById("admin-users-sort");if(i&&(i.value=o),e&&e.length>0){const p=new Map(t.map(h=>[h.id,h.name])),x=new Map(s.map(h=>[h.id,h.name])),v=new Map(n.map(h=>[h.user_email,h.group_id]));if(o==="manual"){let h=[];try{const $=localStorage.getItem("admin_users_manual_order");$&&(h=JSON.parse($))}catch($){console.error("Failed to parse manual user order:",$)}e.sort(($,L)=>{let E=h.indexOf($.email),I=h.indexOf(L.email);return E===-1&&(E=999999),I===-1&&(I=999999),E!==I?E-I:new Date(L.created_at||0)-new Date($.created_at||0)})}else if(o==="created_desc")e.sort((h,$)=>new Date($.created_at||0)-new Date(h.created_at||0));else if(o==="created_asc")e.sort((h,$)=>new Date(h.created_at||0)-new Date($.created_at||0));else if(o==="name_asc")e.sort((h,$)=>(h.name||"").localeCompare($.name||"","ja"));else if(o==="name_desc")e.sort((h,$)=>($.name||"").localeCompare(h.name||"","ja"));else if(o==="email_asc")e.sort((h,$)=>(h.email||"").localeCompare($.email||"","en"));else if(o==="email_desc")e.sort((h,$)=>($.email||"").localeCompare(h.email||"","en"));else if(o==="role_desc"){const h={admin:3,leader:2,user:1};e.sort(($,L)=>{const E=h[$.role]||0,I=h[L.role]||0;return E!==I?I-E:new Date(L.created_at||0)-new Date($.created_at||0)})}else o==="group_asc"?e.sort((h,$)=>{const L=p.get(v.get(h.email))||"",E=p.get(v.get($.email))||"";return!L&&E?1:L&&!E?-1:L.localeCompare(E,"ja")}):o==="attribute_asc"&&e.sort((h,$)=>{const L=x.get(h.attribute_id)||"",E=x.get($.attribute_id)||"";return!L&&E?1:L&&!E?-1:L.localeCompare(E,"ja")})}const d=document.getElementById("allowed-users-list");let l=`
        <div class="mb-6 p-4 bg-orange-50 border border-orange-200 rounded shadow-sm">
            <h3 class="font-bold text-orange-800 mb-2">ユーザー属性の管理</h3>
            <div id="admin-attribute-list" class="flex flex-wrap gap-2 mb-3">
                ${s.length===0?'<span class="text-sm text-gray-500">属性なし</span>':""}
                ${s.map(p=>`<div data-id="${p.id}" draggable="true" class="bg-white border rounded px-2 py-1 flex items-center text-sm w-fit cursor-move select-none hover:shadow-sm"><span class="mr-2 font-bold">${p.name}</span><button onclick="renameUserAttributeAdmin('${p.id}', '${p.name}')" class="text-blue-500 hover:text-blue-700 mr-2 font-bold" title="名称変更">✎</button><button onclick="deleteUserAttributeAdmin('${p.id}')" class="text-red-500 hover:text-red-700 font-bold" title="削除">×</button></div>`).join("")}
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
                ${a.map(p=>`<div data-id="${p.id}" draggable="true" class="bg-white border rounded px-2 py-1 flex items-center text-sm w-fit cursor-move select-none hover:shadow-sm"><input type="color" value="${p.color||"#bfdbfe"}" onchange="updateCategoryColorAdmin('${p.id}', this.value)" class="w-6 h-6 mr-2 border-0 p-0 cursor-pointer" title="色を変更"><span class="mr-2 font-bold">${p.name}</span><button onclick="renameCategoryAdmin('${p.id}', '${p.name}')" class="text-blue-500 hover:text-blue-700 mr-2 font-bold" title="名称変更">✎</button><button onclick="deleteCategoryAdmin('${p.id}')" class="text-red-500 hover:text-red-700 font-bold" title="削除">×</button></div>`).join("")}
            </div>
            <div class="flex space-x-2 items-center">
                <input type="color" id="admin-new-category-color" value="#bfdbfe" class="w-8 h-8 border p-0 rounded cursor-pointer" title="カテゴリの色">
                <input type="text" id="admin-new-category-name" placeholder="新しいカテゴリ名" class="border p-1 rounded text-sm w-48">
                <button onclick="saveNewCategoryAdmin()" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm shadow font-bold">追加</button>
            </div>
        </div>
        `,m=`
        <div class="mb-6 p-4 bg-purple-50 border border-purple-200 rounded shadow-sm">
            <h3 class="font-bold text-purple-800 mb-2">出欠グループの管理</h3>
            <div id="admin-group-list" class="flex flex-wrap gap-2 mb-3">
                ${t.length===0?'<span class="text-sm text-gray-500">グループなし</span>':""}
                ${t.map(p=>`<div data-id="${p.id}" draggable="true" class="bg-white border rounded px-2 py-1 flex items-center text-sm w-fit cursor-move select-none hover:shadow-sm"><input type="color" value="${p.color||"#d1fae5"}" onchange="updateGroupColorAdmin('${p.id}', this.value)" class="w-6 h-6 mr-2 border-0 p-0 cursor-pointer" title="色を変更"><span class="mr-2 font-bold">${p.name}</span><button onclick="renameGroupAdmin('${p.id}', '${p.name}')" class="text-blue-500 hover:text-blue-700 mr-2 font-bold" title="名称変更">✎</button><button onclick="deleteGroupAdmin('${p.id}')" class="text-red-500 hover:text-red-700 font-bold" title="削除">×</button></div>`).join("")}
            </div>
            <div class="flex space-x-2 items-center">
                <input type="color" id="admin-new-group-color" value="#d1fae5" class="w-8 h-8 border p-0 rounded cursor-pointer" title="グループの色">
                <input type="text" id="admin-new-group-name" placeholder="新しいグループ名" class="border p-1 rounded text-sm w-48">
                <button onclick="saveNewGroupAdmin()" class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm shadow font-bold">追加</button>
            </div>
        </div>
        `,u=`
        <div class="mb-6 p-4 bg-teal-50 border border-teal-200 rounded shadow-sm">
            <h3 class="font-bold text-teal-800 mb-2">場所マスタの管理</h3>
            <div id="admin-location-list" class="flex flex-wrap gap-2 mb-3">
                ${r.length===0?'<span class="text-sm text-gray-500">登録済みの場所はありません</span>':""}
                ${r.map(p=>`
                    <div data-id="${p.id}" draggable="true" class="bg-white border rounded px-2 py-1 flex items-center text-sm w-fit gap-2 cursor-move select-none hover:shadow-sm">
                        <span class="font-bold text-teal-900">${p.name}</span>
                        ${p.url?`<a href="${p.url}" target="_blank" class="text-blue-500 text-xs hover:underline truncate max-w-xs">${p.url}</a>`:""}
                        <button onclick="renameLocationAdmin('${p.id}')" class="text-blue-500 hover:text-blue-700 font-bold ml-2" title="名称変更">✎</button>
                        <button onclick="deleteLocationAdmin('${p.id}')" class="text-red-500 hover:text-red-700 font-bold" title="削除">×</button>
                    </div>
                `).join("")}
            </div>
            <div class="flex flex-wrap gap-2 items-center">
                <input type="text" id="admin-new-location-name" placeholder="場所の名前" class="border p-1 rounded text-sm w-48">
                <input type="text" id="admin-new-location-url" placeholder="URL (任意)" class="border p-1 rounded text-sm w-64">
                <button onclick="saveNewLocationAdmin()" class="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-sm shadow font-bold">追加</button>
            </div>
        </div>
        `;const f=(e||[]).map((p,x)=>{var k;const v=p.email.endsWith("@local.dummy"),h=((k=n.find(_=>_.user_email===p.email))==null?void 0:k.group_id)||"",$=t.map(_=>`<option value="${_.id}" ${h===_.id?"selected":""}>${_.name}</option>`).join(""),L=`
                <select id="edit-group-${x}" class="border p-1 rounded text-sm w-36 font-semibold text-gray-700 bg-white">
                    <option value="">選択なし</option>
                    ${$}
                </select>
            `,E=(e||[]).filter(_=>_.email!==p.email).map(_=>`
                <label class="inline-flex items-center text-xs mr-3 mb-1 w-32 truncate" title="${_.email}">
                    <input type="checkbox" name="edit-delegation-${x}" value="${_.email}" ${window.adminDelegations[p.email]&&window.adminDelegations[p.email].includes(_.email)?"checked":""} class="mr-1 rounded text-blue-600">
                    <span class="truncate">${_.name||_.email}</span>
                </label>
            `).join(""),w=o==="manual"?`
                <div class="user-drag-handle cursor-grab select-none text-gray-400 hover:text-gray-600 px-2 flex items-center justify-center text-xl font-bold border-r border-gray-100 mr-2" title="ドラッグして並べ替え">
                    ⋮⋮
                </div>
            `:"";return`
            <div class="user-admin-card flex items-stretch p-3 bg-white border rounded shadow-sm mb-2 hover:bg-gray-50 transition" data-email="${p.email}" data-index="${x}" data-old-role="${p.role}">
                ${w}
                <div class="flex-grow flex flex-col">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-gray-100 pb-2 mb-2">
                        <div class="flex-grow flex flex-col md:flex-row md:items-center gap-2">
                        <input type="text" id="edit-name-${x}" value="${p.name||""}" placeholder="氏名" class="border p-1 rounded text-sm w-32 font-bold">
                        <input type="text" id="edit-email-${x}" value="${en(p.email)}" class="border p-1 rounded text-sm w-48 font-bold" ${p.email===G.email||v?"disabled":""}>
                        <select id="edit-attribute-${x}" class="border p-1 rounded text-sm w-28">
                            <option value="">属性なし</option>
                            ${s.map(_=>`<option value="${_.id}" ${p.attribute_id===_.id?"selected":""}>${_.name}</option>`).join("")}
                        </select>
                        <select id="edit-role-${x}" class="border p-1 rounded text-sm" ${p.email===G.email?"disabled":""}>
                            <option value="user" ${p.role==="user"?"selected":""}>一般ユーザー</option>
                            <option value="leader" ${p.role==="leader"?"selected":""}>リーダー</option>
                            <option value="admin" ${p.role==="admin"?"selected":""}>管理者</option>
                        </select>
                         <div class="flex items-center space-x-3 ml-2 border-l pl-2 flex-wrap gap-y-1">
                            <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-dispatch-${x}" class="rounded text-blue-600" ${p.can_use_dispatch!==!1?"checked":""}><span>配車可</span></label>
                            <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-dashboard-${x}" class="rounded text-blue-600" ${p.can_use_dashboard!==!1?"checked":""}><span>成績可</span></label>
                            <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-attendance-${x}" class="rounded text-blue-600" ${p.can_use_attendance!==!1?"checked":""}><span>出欠可</span></label>
                            <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-simulator-${x}" class="rounded text-blue-600" ${p.can_use_simulator!==!1?"checked":""}><span>シミュレータ可</span></label>
                            <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-info-${x}" class="rounded text-teal-600" ${p.can_use_info!==!1?"checked":""}><span>Info可</span></label>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2 shrink-0">
                        ${v?"":`<button onclick="adminChangeUserPassword('${p.email}')" class="text-xs bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded shadow">パスワード変更</button>`}
                        ${p.email!==G.email?`<button onclick="deleteAdminUser('${p.email}')" class="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded shadow">削除</button>`:""}
                    </div>
                </div>
                    <div class="flex flex-col md:flex-row md:items-start justify-between gap-2">
                        <div class="flex-grow">
                            <div class="text-xs font-bold text-gray-500 mb-1">所属グループ:</div>
                            <div id="group-container-${x}">${L}</div>
                        </div>
                        <div class="flex-grow mt-2 md:mt-0 border-t md:border-t-0 md:border-l border-gray-200 pt-2 md:pt-0 md:pl-4">
                            <div class="text-xs font-bold text-gray-500 mb-1">代行権限 (他メンバーの出欠を代理で入力できる権限):</div>
                            <details class="text-xs border p-2 bg-gray-50 rounded shadow-inner">
                                <summary class="cursor-pointer text-gray-700 font-bold">代行入力できるメンバーを選択 (複数可)</summary>
                                <div class="flex flex-wrap mt-2 max-h-32 overflow-y-auto border-t border-gray-200 pt-2">${E||'<span class="text-gray-400">他のメンバーがいません</span>'}</div>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
            `}).join("");d.innerHTML=f,rd();const b=document.getElementById("admin-master-list");b&&(b.innerHTML=l+c+m+u,Mn("admin-attribute-list","user_attributes",ae),Mn("admin-category-list","event_categories",ae),Mn("admin-group-list","groups",ae),Mn("admin-location-list","event_locations",ae));const{data:y}=await B.from("signup_requests").select("*").eq("status","pending").order("created_at",{ascending:!1}),g=document.getElementById("signup-requests-list");!y||y.length===0?g.innerHTML='<p class="text-gray-500 text-sm">現在、承認待ちの申請はありません。</p>':g.innerHTML=y.map(p=>`
                <div class="p-3 bg-white border rounded shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                        <div class="font-bold">${p.parent_name} <span class="text-sm font-normal text-gray-600">様 (選手: ${p.player_name})</span></div>
                        <div class="text-sm text-gray-500">${p.email}</div>
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="approveRequest('${p.id}', '${p.email}')" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-bold shadow">承認</button>
                        <button onclick="rejectRequest('${p.id}')" class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded text-sm shadow">拒否</button>
                    </div>
                </div>
            `).join("")}finally{F()}}async function sd(){const e=document.querySelectorAll(".user-admin-card");if(e.length!==0&&confirm("全メンバーの設定を一括保存しますか？")){U("全メンバー設定を保存中...");try{const t=[],n=[],a=[];e.forEach(d=>{const l=d.getAttribute("data-email"),c=d.getAttribute("data-index"),m=d.getAttribute("data-old-role"),u=document.getElementById(`edit-email-${c}`),f=document.getElementById(`edit-name-${c}`),b=document.getElementById(`edit-attribute-${c}`),y=document.getElementById(`edit-role-${c}`),g=document.getElementById(`edit-use-dispatch-${c}`),p=document.getElementById(`edit-use-dashboard-${c}`),x=document.getElementById(`edit-use-attendance-${c}`),v=document.getElementById(`edit-use-simulator-${c}`),h=document.getElementById(`edit-use-info-${c}`),$=u.disabled?l:ca(u.value.trim()),L=f.value.trim(),E=b&&b.value||null,I=y.disabled?m:y.value,w=g?g.checked:!0,k=p?p.checked:!0,_=x?x.checked:!0,A=v?v.checked:!0,P=h?h.checked:!0;if(!$)throw new Error("メールアドレスが空のレコードがあります。");a.push(l);const D={email:$,name:L,attribute_id:E,role:I,can_use_dispatch:w,can_use_dashboard:k,can_use_attendance:_,can_use_simulator:A,can_use_info:P};t.push({oldEmail:l,updatePayload:D});const O=document.getElementById(`edit-group-${c}`),q=O?O.value:"";q&&n.push({user_email:$,group_id:q});const S=document.querySelectorAll(`input[name="edit-delegation-${c}"]:checked`),C=Array.from(S).map(N=>N.value);l!==$&&window.adminDelegations[l]&&delete window.adminDelegations[l],window.adminDelegations[$]=C});const s=t.map(d=>B.from("app_users").update(d.updatePayload).eq("email",d.oldEmail)),r=await Promise.all(s);for(const d of r)if(d.error)throw d.error;const{error:o}=await B.from("user_groups").delete().in("user_email",a);if(o)throw o;if(n.length>0){const{error:d}=await B.from("user_groups").insert(n);if(d)throw d}const{error:i}=await B.from("master_data").upsert({key:"ATTENDANCE_DELEGATIONS",data:window.adminDelegations});if(i)throw i;await X("UPDATE_USERS_ALL","全メンバーの設定を一括更新しました"),alert("全メンバーの設定を一括保存しました"),await ae()}catch(t){console.error(t),alert("保存中にエラーが発生しました: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{F()}}}window.forceResetPassword=async function(e){if(confirm(`${e} 宛にパスワード再設定メールを送信し、強制的にパスワードをリセットさせますか？`)){U("パスワード再設定メール送信中...");try{const{error:t}=await B.auth.resetPasswordForEmail(e,{redirectTo:window.location.origin});alert(t?"送信失敗: "+t.message:"パスワード再設定メールを送信しました。")}catch(t){console.error(t)}finally{F()}}};window.adminChangeUserPassword=async function(e){const t=en(e),n=prompt(`「${t}」の新しいパスワードを入力してください（6文字以上）：`);if(n===null)return;const a=n.trim();if(a.length<6)return alert("パスワードは6文字以上で設定してください。");U("パスワード変更中...");try{const{error:s}=await B.rpc("admin_update_user_password",{user_email:e,new_password:a});if(s)throw new Error(s.message);await X("ADMIN_CHANGE_PASSWORD",`ユーザー「${e}」のパスワードを変更しました`),alert(`「${t}」のパスワードを正常に変更しました。`)}catch(s){console.error(s),alert(`パスワード変更エラー:
`+s.message+`

※この機能を使用するには、あらかじめSupabaseのSQLエディタで専用のデータベース関数（admin_update_user_password）を設定する必要があります。詳細はマニュアルまたはエージェントのメッセージを参照してください。`)}finally{F()}};window.adminAddUser=async function(){var r,o,i,d;const e=((r=document.getElementById("admin-add-email"))==null?void 0:r.value.trim())||"",t=ca(e),n=((o=document.getElementById("admin-add-name"))==null?void 0:o.value.trim())||"",a=((i=document.getElementById("admin-add-password"))==null?void 0:i.value.trim())||"",s=((d=document.getElementById("admin-add-role"))==null?void 0:d.value)||"user";if(!e||!n||!a)return alert("ユーザーID（またはメールアドレス）、氏名、仮パスワードは必須入力項目です。");if(a.length<6)return alert("仮パスワードは6文字以上で設定してください。");U("アカウント払い出し中...");try{const l=window.supabase.createClient(os,is,{auth:{persistSession:!1,autoRefreshToken:!1}}),{data:c,error:m}=await l.auth.signUp({email:t,password:a});if(m)throw new Error(`Authアカウント作成失敗: ${m.message}`);const{error:u}=await B.from("app_users").insert([{email:t,name:n,role:s}]);if(u)throw new Error(`データベース登録失敗: ${u.message}`);await X("ADD_USER_COMPLETED",`アカウント「${t}」を仮パスワード付きで払い出しました`),document.getElementById("admin-add-email").value="",document.getElementById("admin-add-name").value="",document.getElementById("admin-add-password").value="",alert(`アカウントの払い出しが完了しました！

【ユーザー通知内容】
ログインID: ${en(t)}
仮パスワード: ${a}

上記情報をLINE等の別手段でユーザーに通知してください。`),await ae()}catch(l){console.error(l),alert(`アカウント払い出しエラー:
`+l.message)}finally{F()}};window.adminAddDummyUser=async function(){const e=prompt(`追加する代行専用メンバーの「氏名」を入力してください。
（※ログインはできず、他のメンバーからの代行入力専用アカウントとなります）`);if(!e||e.trim()==="")return;const t=`dummy_${Date.now()}@local.dummy`;U("代行専用メンバー追加処理中...");try{await B.from("app_users").insert([{email:t,name:e.trim(),role:"user"}]),await X("ADD_DUMMY_USER",`代行専用メンバー「${e.trim()}」を追加しました`),await ae()}catch(n){console.error(n),alert("追加エラー: "+(n.message==="Load failed"||n.message==="Failed to fetch"?"通信に失敗しました。":n.message))}finally{F()}};window.deleteAdminUser=async function(e){if(confirm(`${e} のアクセス許可を取り消しますか？`)){U("ユーザー削除処理中...");try{await B.from("app_users").delete().eq("email",e),await X("DELETE_USER",`ユーザー「${e}」を削除しました`),await ae()}catch(t){console.error(t),alert("削除エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{F()}}};window.saveNewCategoryAdmin=async function(){var n;const e=document.getElementById("admin-new-category-name").value.trim(),t=((n=document.getElementById("admin-new-category-color"))==null?void 0:n.value)||"#bfdbfe";if(!e)return alert("カテゴリ名を入力してください");U("カテゴリ追加中...");try{const{error:a}=await B.from("event_categories").insert([{name:e,color:t}]);if(a)throw a;await ae()}catch(a){alert("追加エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{F()}};window.deleteCategoryAdmin=async function(e){if(confirm(`このカテゴリを削除しますか？
※既存のイベントに設定されているカテゴリ名には影響しませんが、新規作成・編集時に選択できなくなります。`)){U("カテゴリ削除中...");try{const{error:t}=await B.from("event_categories").delete().eq("id",e);if(t)throw t;await ae()}catch(t){alert("削除エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{F()}}};window.renameCategoryAdmin=async function(e,t){const n=prompt("新しいカテゴリ名を入力してください:",t);if(!(!n||n.trim()===""||n===t)){U("カテゴリ名称変更中...");try{const{error:a}=await B.from("event_categories").update({name:n.trim()}).eq("id",e);if(a)throw a;await ae()}catch(a){alert("変更エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{F()}}};window.updateCategoryColorAdmin=async function(e,t){U("カテゴリ色変更中...");try{const{error:n}=await B.from("event_categories").update({color:t}).eq("id",e);if(n)throw n;await ae()}catch(n){alert("変更エラー: "+(n.message==="Load failed"||n.message==="Failed to fetch"?"通信に失敗しました。":n.message))}finally{F()}};window.updateGroupColorAdmin=async function(e,t){U("グループ色変更中...");try{const{error:n}=await B.from("groups").update({color:t}).eq("id",e);if(n)throw n;await ae()}catch(n){alert("色変更エラー: "+(n.message==="Load failed"||n.message==="Failed to fetch"?"通信に失敗しました。":n.message))}finally{F()}};window.saveNewGroupAdmin=async function(){var n;const e=document.getElementById("admin-new-group-name").value.trim(),t=((n=document.getElementById("admin-new-group-color"))==null?void 0:n.value)||"#d1fae5";if(!e)return alert("グループ名を入力してください");U("グループ追加中...");try{const{error:a}=await B.from("groups").insert([{name:e,color:t}]);if(a)throw a;await ae()}catch(a){alert("追加エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{F()}};window.deleteGroupAdmin=async function(e){if(confirm(`このグループを削除しますか？
※関連する出欠データやメンバー設定にも影響が出る可能性があります。`)){U("グループ削除中...");try{const{error:t}=await B.from("groups").delete().eq("id",e);if(t)throw t;await ae()}catch(t){alert("削除エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{F()}}};window.renameGroupAdmin=async function(e,t){const n=prompt("新しいグループ名を入力してください:",t);if(!(!n||n.trim()===""||n===t)){U("グループ名称変更中...");try{const{error:a}=await B.from("groups").update({name:n.trim()}).eq("id",e);if(a)throw a;await ae()}catch(a){alert("変更エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{F()}}};window.saveNewLocationAdmin=async function(){const e=document.getElementById("admin-new-location-name").value.trim(),t=document.getElementById("admin-new-location-url").value.trim();if(!e)return alert("場所名を入力してください");U("場所追加中...");try{const{error:n}=await B.from("event_locations").insert([{name:e,url:t||null}]);if(n)throw n;await ae()}catch(n){alert("追加エラー: "+(n.message==="Load failed"||n.message==="Failed to fetch"?"通信に失敗しました。":n.message))}finally{F()}};window.deleteLocationAdmin=async function(e){if(confirm(`この場所をマスタから削除しますか？
※既存の予定データ内の場所テキスト自体は削除されません。`)){U("場所削除中...");try{const{error:t}=await B.from("event_locations").delete().eq("id",e);if(t)throw t;await ae()}catch(t){alert("削除エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{F()}}};window.renameLocationAdmin=async function(e){U("場所データ読み込み中...");try{const{data:t,error:n}=await B.from("event_locations").select("*").eq("id",e).single();if(n)throw n;const a=document.getElementById("admin-edit-location-modal");a&&a.remove();const s=t.name||"",r=t.url||"",o=`
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
        `;document.body.insertAdjacentHTML("beforeend",o)}catch(t){alert("読み込みエラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{F()}};window.saveLocationEditAdmin=async function(e){const t=document.getElementById("edit-location-name").value.trim(),n=document.getElementById("edit-location-url").value.trim();if(t==="")return alert("場所の名前は必須項目です。");U("場所マスタ更新中...");try{const{error:a}=await B.from("event_locations").update({name:t,url:n||null}).eq("id",e);if(a)throw a;const s=document.getElementById("admin-edit-location-modal");s&&s.remove(),await ae()}catch(a){alert("更新エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{F()}};function Mn(e,t,n){const a=document.getElementById(e);if(!a)return;let s=null;Array.from(a.children).forEach(r=>{r.setAttribute("draggable","true"),r.classList.add("cursor-move","select-none"),r.addEventListener("dragstart",o=>{s=r,o.dataTransfer.effectAllowed="move",r.classList.add("opacity-50")}),r.addEventListener("dragover",o=>{o.preventDefault(),o.dataTransfer.dropEffect="move";const i=o.target.closest('[draggable="true"]');if(i&&i!==s&&i.parentNode===a){const d=i.getBoundingClientRect(),l=(o.clientY-d.top)/(d.bottom-d.top)>.5;a.insertBefore(s,l?i.nextSibling:i)}}),r.addEventListener("dragend",async()=>{r.classList.remove("opacity-50"),s=null;const i=Array.from(a.children).map((d,l)=>{const c=d.dataset.id;return B.from(t).update({sort_order:l}).eq("id",c)});U("順序を保存中...");try{await Promise.all(i),n&&await n()}catch(d){console.error("Sort order save error:",d),alert("順序の保存に失敗しました。")}finally{F()}})})}function rd(){const e=document.getElementById("allowed-users-list");if(!e)return;if((localStorage.getItem("admin_users_sort")||"created_desc")!=="manual"){Array.from(e.children).forEach(a=>{a.removeAttribute("draggable"),a.classList.remove("cursor-move","select-none");const s=a.querySelector(".user-drag-handle");s&&(s.style.display="none")});return}let n=null;Array.from(e.children).forEach(a=>{const s=a.querySelector(".user-drag-handle");s?(s.style.display="flex",s.addEventListener("mousedown",()=>{a.setAttribute("draggable","true")}),s.addEventListener("mouseup",()=>{a.removeAttribute("draggable")})):a.setAttribute("draggable","true"),a.addEventListener("dragstart",r=>{if(a.getAttribute("draggable")!=="true"){r.preventDefault();return}n=a,r.dataTransfer.effectAllowed="move",a.classList.add("opacity-50")}),a.addEventListener("dragover",r=>{r.preventDefault(),r.dataTransfer.dropEffect="move";const o=r.target.closest(".user-admin-card");if(o&&o!==n&&o.parentNode===e){const i=o.getBoundingClientRect(),d=(r.clientY-i.top)/(i.bottom-i.top)>.5;e.insertBefore(n,d?o.nextSibling:o)}}),a.addEventListener("dragend",()=>{a.classList.remove("opacity-50"),a.removeAttribute("draggable"),n=null;const o=Array.from(e.children).map(i=>i.getAttribute("data-email")).filter(Boolean);localStorage.setItem("admin_users_manual_order",JSON.stringify(o))})})}window.saveNewUserAttributeAdmin=async function(){const e=document.getElementById("admin-new-attribute-name").value.trim();if(!e)return alert("属性名を入力してください");U("属性追加中...");try{const{error:t}=await B.from("user_attributes").insert([{name:e}]);if(t)throw t;await ae()}catch(t){alert("追加エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{F()}};window.deleteUserAttributeAdmin=async function(e){if(confirm(`この属性を削除しますか？
※ユーザーに設定されている属性は解除されます。`)){U("属性削除中...");try{const{error:t}=await B.from("user_attributes").delete().eq("id",e);if(t)throw t;await ae()}catch(t){alert("削除エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{F()}}};window.renameUserAttributeAdmin=async function(e,t){const n=prompt("新しい属性名を入力してください:",t);if(!(!n||n.trim()===""||n===t)){U("属性名称変更中...");try{const{error:a}=await B.from("user_attributes").update({name:n.trim()}).eq("id",e);if(a)throw a;await ae()}catch(a){alert("変更エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{F()}}};window.approveRequest=async function(e,t){U("申請承認中...");try{const{data:n}=await B.from("signup_requests").select("parent_name, player_name").eq("id",e).single(),a=n?`${n.parent_name} (${n.player_name})`:"";await B.from("app_users").insert([{email:t,role:"user",name:a}]),await B.from("signup_requests").update({status:"approved"}).eq("id",e);try{const{error:s}=await B.auth.resetPasswordForEmail(t,{redirectTo:window.location.origin});s&&(console.warn("Auto password reset email failed (rate limit):",s.message),alert(`メンバー承認は完了しました！

※ただし、Supabaseのメール送信制限（レートリミット等）により、パスワード設定案内メールの自動送信に失敗しました（エラー: `+s.message+`）。

お手数ですが、ログイン画面の『パスワードを忘れた場合』からユーザー自身で再設定を行っていただくよう案内するか、時間をおいてメンバーリストの『PWリセット送信』から再送信してください。`))}catch(s){console.error("Auto password reset email exception:",s)}await ae()}catch(n){console.error(n),alert("承認エラー: "+(n.message==="Load failed"||n.message==="Failed to fetch"?"通信に失敗しました。":n.message))}finally{F()}};window.rejectRequest=async function(e){if(confirm("この申請を拒否しますか？")){U("申請拒否中...");try{await B.from("signup_requests").update({status:"rejected"}).eq("id",e),await ae()}catch(t){console.error(t),alert("拒否エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{F()}}};const J={initMasterData:async()=>fe(async()=>{const{data:e,error:t}=await B.from("master_data").select("*");if(t)throw t;if(se=[],re=[],e){const n=e.find(s=>s.key==="FAMILIES"),a=e.find(s=>s.key==="CARS");n&&(se=n.data||[]),a&&(re=a.data||[])}},"マスターデータ初期化中..."),getAllFamilies:async()=>se,getFamily:async e=>se.find(t=>t.familyName===e),addFamily:e=>{se.push(e)},updateFamily:e=>{const t=se.findIndex(n=>n.familyName===e.familyName);t>-1&&(se[t]=e)},deleteFamily:e=>{se=se.filter(t=>t.familyName!==e)},bulkAddFamilies:e=>{se=e},getAllCars:async()=>re,getCar:async e=>re.find(t=>t.id===e),addCar:e=>{re.push(e)},updateCar:e=>{const t=re.findIndex(n=>n.id===e.id);t>-1&&(re[t]=e)},deleteCar:e=>{re=re.filter(t=>t.id!==e)},bulkAddCars:e=>{re=e},syncMaster:async()=>fe(async()=>{const{error:e}=await B.from("master_data").upsert([{key:"FAMILIES",data:se},{key:"CARS",data:re}]);if(e)throw e;await X("UPDATE_MASTER","初期データ(または強制)のマスター保存を実行しました")},"マスターデータ同期中..."),saveState:async(e,t)=>fe(async()=>{const n=Date.now().toString(),{error:a}=await B.from("states").insert({id:n,name:t,created_at:Date.now(),state_data:e});if(a)throw a;return await X("SAVE_DISPATCH",`配車データ「${t}」を保存しました`),!0},"配車状態を保存中..."),getAllSavedStates:async()=>fe(async()=>{const{data:e,error:t}=await B.from("states").select("*").order("created_at",{ascending:!1});if(t)throw t;return e.map(n=>({id:n.id,name:n.name,timestamp:n.created_at,state:n.state_data}))},"配車状態一覧を取得中..."),getState:async e=>fe(async()=>{const{data:t,error:n}=await B.from("states").select("*").eq("id",e).single();if(n)throw n;return t?{id:t.id,name:t.name,timestamp:t.created_at,state:t.state_data}:null},"配車状態を取得中..."),deleteState:async e=>fe(async()=>{const{error:t}=await B.from("states").delete().eq("id",e);if(t)throw t;return await X("DELETE_DISPATCH",`配車データ(ID:${e})を削除しました`),!0},"配車状態を削除中..."),saveParking:async(e,t)=>fe(async()=>{const n="p"+Date.now()+Math.floor(Math.random()*1e3),{error:a}=await B.from("parkings").insert({id:n,name:t,created_at:Date.now(),parking_data:e});if(a)throw a;return await X("SAVE_PARKING",`駐車場データ「${t}」を保存しました`),!0},"駐車場データを保存中..."),getAllSavedParking:async()=>fe(async()=>{const{data:e,error:t}=await B.from("parkings").select("*").order("created_at",{ascending:!1});if(t)throw t;return e.map(n=>({id:n.id,name:n.name,timestamp:n.created_at,parking:n.parking_data}))},"駐車場データ一覧を取得中..."),getParking:async e=>fe(async()=>{const{data:t,error:n}=await B.from("parkings").select("*").eq("id",e).single();if(n)throw n;return t?{id:t.id,name:t.name,timestamp:t.created_at,parking:t.parking_data}:null},"駐車場データを取得中..."),updateParking:async e=>fe(async()=>{const{error:t}=await B.from("parkings").update({name:e.name,parking_data:e.parking}).eq("id",e.id);if(t)throw t;return!0},"駐車場データを更新中..."),deleteParking:async e=>fe(async()=>{const{error:t}=await B.from("parkings").delete().eq("id",e);if(t)throw t;return await X("DELETE_PARKING",`駐車場データ(ID:${e})を削除しました`),!0},"駐車場データを削除中..."),addParkingMaster:(e,t)=>{Re.push({id:"p"+Date.now()+Math.floor(Math.random()*1e3),name:t,timestamp:Date.now(),parking:e,isNew:!0})},updateParkingMaster:e=>{const t=Re.findIndex(n=>n.id===e.id);t>-1&&(Re[t]=e,Re[t].isModified=!0)},deleteParkingMaster:e=>{const t=Re.find(n=>n.id===e);t&&!t.isNew&&xn.add(e),Re=Re.filter(n=>n.id!==e)},syncAllMaster:async()=>fe(async()=>{const{error:e}=await B.from("master_data").upsert([{key:"FAMILIES",data:se},{key:"CARS",data:re}]);if(e)throw e;for(const t of xn)await B.from("parkings").delete().eq("id",t);xn.clear();for(const t of Re)if(t.isNew||t.isModified){const{error:n}=await B.from("parkings").upsert({id:t.id,name:t.name,created_at:t.timestamp,parking_data:t.parking});if(n)throw n;t.isNew=!1,t.isModified=!1}await X("UPDATE_MASTER","マスターデータ(家族・車・駐車場)を一括保存しました")},"マスターデータ一括同期中..."),clearDatabase:async()=>fe(async()=>{se=[],re=[],await B.from("master_data").delete().neq("key",""),await B.from("states").delete().neq("id",""),await B.from("parkings").delete().neq("id",""),await X("CLEAR_DB","データベースの全リセットを実行しました")},"データベース初期化中...")},od=[{familyName:"山田家",order:1,members:[{id:"p1",name:"太郎",type:"選手",isFlagTarget:!0,data:{grade:"5年",school:"A小",other:"",memo:""}},{id:"p2",name:"山田父",type:"保護者",data:{memo:""}}]},{familyName:"佐藤家",order:2,members:[{id:"p3",name:"次郎",type:"選手",isFlagTarget:!0,data:{grade:"5年",school:"B小",other:"",memo:""}},{id:"p4",name:"佐藤母",type:"保護者",data:{memo:""}}]},{familyName:"スタッフ・個人",order:99,members:[{id:"p99",name:"監督",type:"その他",data:{memo:""}}]}],id=[{id:"c1",name:"山田カー",familyName:"山田家",baseCapacity:6,order:1},{id:"c2",name:"佐藤カー",familyName:"佐藤家",baseCapacity:5,order:2}];let qt=[],sa=[],ua=[],jt=new Set,Ht=new Set,Et=new Map,Nt=new Set,Xe=new Set,tt=new Map,pe={groundName:"",designated:{name:"",limit:0,memo:""},other:{name:"",memo:""}},$e={date:"",name:"",timeline:"",notes:""},Y=[],ft={car:null,seat:null},Ia=null,$a=null;const Ga=3,_e=document.getElementById("nav-dispatch"),Ie=document.getElementById("nav-master"),sn=document.getElementById("view-dispatch"),rn=document.getElementById("view-master"),Ve=document.getElementById("participant-list"),zt=document.getElementById("car-list"),Jt=document.getElementById("exclusion-list"),ka=document.getElementById("results");document.getElementById("text-output");const Qe=document.getElementById("family-list"),bt=document.getElementById("car-list-master"),St=document.getElementById("parking-list-master");function Fs(){const e=document.getElementById("results-section"),t=document.getElementById("main-content");t&&(t.style.display="grid",t.style.gap="1.5rem",window.innerWidth>=768?(t.style.gridTemplateColumns=`repeat(${Ga}, minmax(0, 1fr))`,e&&(e.style.gridColumn=`span ${Ga}`)):(t.style.gridTemplateColumns="repeat(1, minmax(0, 1fr))",e&&(e.style.gridColumn="auto")))}async function qs(){qt=await J.getAllFamilies(),sa=await J.getAllCars(),ua=qt.flatMap(e=>e.members),hr(),ma(),pa(),Dn(),await ls(),await cs()}async function dd(){Re=await J.getAllSavedParking()||[],xn.clear(),Kt(),pn(),fa()}async function _n(){const e=document.getElementById("btn-load-logs");if(e&&!document.getElementById("btn-download-logs-csv")){const s=document.createElement("button");s.id="btn-download-logs-csv",s.className="ml-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-bold shadow",s.textContent="CSVダウンロード",s.onclick=ld,e.parentNode.insertBefore(s,e.nextSibling)}try{const s=new Date;s.setMonth(s.getMonth()-6),await B.from("action_logs").delete().lt("created_at",s.toISOString())}catch(s){console.error("Log rotation error:",s)}e&&(e.textContent="読込中...");const{data:t,error:n}=await B.from("action_logs").select("*").order("created_at",{ascending:!1}).limit(50);if(e&&(e.textContent="最新を読み込み"),n){console.error("Failed to load logs:",n);return}const a=document.getElementById("log-list");if(a){if(!t||t.length===0){a.innerHTML='<p class="text-gray-500 text-center py-4">ログはありません</p>';return}a.innerHTML=t.map(s=>`
        <div class="border-b border-gray-100 py-2 flex flex-col md:flex-row md:items-center">
            <span class="font-mono text-gray-500 text-xs w-32 shrink-0">${new Date(s.created_at).toLocaleString("ja-JP",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"})}</span>
            <span class="text-blue-600 font-semibold text-xs w-28 shrink-0">${s.action_type}</span>
            <span class="flex-grow text-gray-700 truncate pr-2" title="${s.details}">${s.details}</span>
            <span class="text-gray-400 text-xs text-right w-40 shrink-0 truncate" title="${s.user_email}">${s.user_email}</span>
        </div>
        `).join("")}}async function ld(){U("ログ取得中...");try{const{data:e,error:t}=await B.from("action_logs").select("*").order("created_at",{ascending:!1}).limit(1e4);if(t)throw t;if(!e||e.length===0)return alert("ログデータがありません");const n=[["日時","アクション","ユーザー","詳細"]];e.forEach(i=>{const d=new Date(i.created_at).toLocaleString("ja-JP"),l=c=>`"${String(c||"").replace(/"/g,'""')}"`;n.push([l(d),l(i.action_type),l(i.user_email),l(i.details)])});const a=new Uint8Array([239,187,191]),s=new Blob([a,n.map(i=>i.join(",")).join(`
`)],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(s),o=document.createElement("a");o.href=r,o.download=`action_logs_${new Date().toISOString().split("T")[0]}.csv`,o.click(),URL.revokeObjectURL(r)}catch(e){console.error(e),alert("CSVの作成に失敗しました: "+e.message)}finally{F()}}function cd(){var e,t,n,a,s,r,o,i,d,l,c,m,u,f,b;Ve==null||Ve.addEventListener("change",md),Ve==null||Ve.addEventListener("input",pd),Ve==null||Ve.addEventListener("click",ud),zt==null||zt.addEventListener("change",gd),Jt==null||Jt.addEventListener("change",fd),(e=document.getElementById("assign-button"))==null||e.addEventListener("click",bd),(t=document.getElementById("dispatch-message-close"))==null||t.addEventListener("click",us),ka==null||ka.addEventListener("change",hd),(n=document.getElementById("export-state-button"))==null||n.addEventListener("click",wd),(a=document.getElementById("import-state-input"))==null||a.addEventListener("change",Ed),(s=document.getElementById("show-text-output-button"))==null||s.addEventListener("click",()=>{var y;(y=document.getElementById("text-output-container"))==null||y.classList.toggle("hidden"),Nn()}),(r=document.getElementById("copy-text-output-button"))==null||r.addEventListener("click",xd),(o=document.getElementById("toggle-details-button"))==null||o.addEventListener("click",vd),(i=document.getElementById("save-state-db-button"))==null||i.addEventListener("click",_d),(d=document.getElementById("load-state-db-button"))==null||d.addEventListener("click",Id),(l=document.getElementById("delete-state-db-button"))==null||l.addEventListener("click",$d),(c=document.getElementById("save-parking-db-button"))==null||c.addEventListener("click",kd),(m=document.getElementById("load-parking-db-button"))==null||m.addEventListener("click",Ld),(u=document.getElementById("delete-parking-db-button"))==null||u.addEventListener("click",Bd),(f=document.getElementById("clear-db-button"))==null||f.addEventListener("click",Sd),(b=document.getElementById("btn-clear-inputs"))==null||b.addEventListener("click",window.clearCurrentInputs)}function hr(){tt.clear(),qt.forEach(e=>{e.members.forEach(t=>{const n={grade:"",school:"",other:"",memo:"",...t.data||{}};t.isFlagTarget||(n.grade="",n.school="",n.other=""),tt.set(t.id,n)})})}function ma(){if(Ve){if(Ve.innerHTML="",qt.length===0)return Ve.innerHTML='<p class="text-gray-500">データなし</p>';qt.forEach(e=>{const t=document.createElement("details");t.className="bg-gray-50 rounded border",t.open=!0;const n=document.createElement("summary");n.className="p-3 cursor-pointer select-none flex justify-between items-center",n.innerHTML=`<span class="font-semibold">${e.familyName}</span><div class="space-x-1"><button data-family-id="${e.familyName}" data-check-action="check" class="text-xs bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded">全員参加</button><button data-family-id="${e.familyName}" data-check-action="uncheck" class="text-xs bg-gray-400 hover:bg-gray-500 text-white py-1 px-2 rounded">全員不参加</button></div>`;const a=document.createElement("div");a.className="p-3 border-t border-gray-200 space-y-3",e.members.forEach(s=>{const r=jt.has(s.id),o=tt.get(s.id)||{grade:"",school:"",other:"",memo:""};let i=s.isFlagTarget?`<input type="text" data-id="${s.id}" data-type="grade" value="${o.grade}" placeholder="学年" class="w-full text-sm p-1 border rounded" ${r?"":"disabled"}>
                 <input type="text" data-id="${s.id}" data-type="school" value="${o.school}" placeholder="学校" class="w-full text-sm p-1 border rounded" ${r?"":"disabled"}>
                 <input type="text" data-id="${s.id}" data-type="other" value="${o.other}" placeholder="その他" class="w-full text-sm p-1 border rounded" ${r?"":"disabled"}>
                 <input type="text" data-id="${s.id}" data-type="memo" value="${o.memo}" placeholder="備考" class="w-full text-sm p-1 border rounded" ${r?"":"disabled"}>`:`<div class="col-span-3"></div><input type="text" data-id="${s.id}" data-type="memo" value="${o.memo}" placeholder="備考" class="w-full text-sm p-1 border rounded" ${r?"":"disabled"}`;a.innerHTML+=`<div class="ml-4"><div class="flex items-center"><input type="checkbox" id="p-${s.id}" data-id="${s.id}" data-action="select-participant" class="mr-3 rounded border-gray-300 text-blue-600" ${r?"checked":""}><label for="p-${s.id}">${s.name} (${s.type})</label></div><div id="data-inputs-${s.id}" class="ml-8 mt-1.5 grid grid-cols-4 gap-2 ${r?"":"opacity-50"}">${i}</div></div>`}),t.appendChild(n),t.appendChild(a),Ve.appendChild(t)})}}function ud(e){const t=e.target.closest("button[data-check-action]");if(!t)return;e.preventDefault();const n=t.dataset.checkAction==="check",a=qt.find(s=>s.familyName===t.dataset.familyId);a&&a.members.forEach(s=>{const r=document.getElementById(`p-${s.id}`);r&&r.checked!==n&&(r.checked=n,r.dispatchEvent(new Event("change",{bubbles:!0})))})}function pa(){if(zt){if(zt.innerHTML="",sa.length===0)return zt.innerHTML='<p class="text-gray-500">データなし</p>';sa.forEach(e=>{const t=qt.find(i=>i.familyName===e.familyName),n=(t?t.members:ua).filter(i=>i.type!=="選手"&&i.type!=="兄弟"),a=Ht.has(e.id);let s="";if(t){const i=n.find(l=>l.type==="保護者"&&(l.name.includes("父")||l.name.includes("監督"))),d=n.find(l=>l.type==="保護者"&&l.name.includes("母"));s=i?i.id:d?d.id:""}const r=Et.get(e.id)||s;s&&!Et.has(e.id)&&Et.set(e.id,s);const o=Nt.has(e.id);zt.innerHTML+=`<div class="bg-gray-50 rounded border p-3" data-car-id="${e.id}">
            <div class="flex items-center"><input type="checkbox" id="c-${e.id}" data-id="${e.id}" data-action="select-car" class="mr-3 rounded text-blue-600" ${a?"checked":""}><label for="c-${e.id}" class="font-semibold">${e.name} (定員${e.baseCapacity}名)</label></div>
            <div id="car-options-${e.id}" class="ml-8 mt-3 space-y-3 ${a?"":"hidden"}">
                <select id="driver-${e.id}" data-action="select-driver" class="w-full p-2 border rounded text-sm"><option value="">ドライバー選択...</option>${n.map(i=>`<option value="${i.id}" ${r===i.id?"selected":""}>${i.name}</option>`).join("")}</select>
                <label class="flex items-center"><input type="checkbox" data-action="select-luggage" class="mr-2" ${o?"checked":""}>荷物あり(2名制限)</label>
            </div></div>`})}}function Dn(){if(!Jt)return;Jt.innerHTML="";const e=ua.filter(t=>jt.has(t.id));if(e.length===0)return Jt.innerHTML='<p class="text-gray-500 text-sm">参加者を選択してください</p>';e.forEach(t=>{Jt.innerHTML+=`<div class="flex items-center"><input type="checkbox" id="ex-${t.id}" data-id="${t.id}" data-action="exclude-participant" class="mr-3" ${Xe.has(t.id)?"checked":""}><label for="ex-${t.id}">${t.name} (${t.type})</label></div>`})}function md(e){const t=e.target;if(t.dataset.action==="select-participant"){const n=t.dataset.id,a=document.getElementById(`data-inputs-${n}`);t.checked?(jt.add(n),a&&(a.classList.remove("opacity-50"),a.querySelectorAll("input").forEach(s=>s.disabled=!1))):(jt.delete(n),Xe.delete(n),a&&(a.classList.add("opacity-50"),a.querySelectorAll("input").forEach(s=>s.disabled=!0))),Dn()}}function pd(e){const t=e.target;if(t.dataset.type){const n=tt.get(t.dataset.id);n[t.dataset.type]=t.value,tt.set(t.dataset.id,n)}}function gd(e){var a;const t=e.target,n=(a=t.closest("[data-car-id]"))==null?void 0:a.dataset.carId;n&&(t.dataset.action==="select-car"?t.checked?(Ht.add(n),document.getElementById(`car-options-${n}`).classList.remove("hidden")):(Ht.delete(n),Nt.delete(n),document.getElementById(`car-options-${n}`).classList.add("hidden")):t.dataset.action==="select-driver"?t.value?Et.set(n,t.value):Et.delete(n):t.dataset.action==="select-luggage"&&(t.checked?Nt.add(n):Nt.delete(n)))}function fd(e){const t=e.target;t.dataset.action==="exclude-participant"&&(t.checked?Xe.add(t.dataset.id):Xe.delete(t.dataset.id))}function bd(){var y,g,p,x,v,h,$,L,E,I;if(Ht.size===0)return He("車を選択してください","error");$e={date:((y=document.getElementById("event-date"))==null?void 0:y.value)||"",name:((g=document.getElementById("event-name"))==null?void 0:g.value)||"",timeline:((p=document.getElementById("event-timeline"))==null?void 0:p.value)||"",notes:((x=document.getElementById("event-notes"))==null?void 0:x.value)||""},pe={groundName:((v=document.getElementById("ground-name"))==null?void 0:v.value)||"",designated:{name:((h=document.getElementById("parking-designated-name"))==null?void 0:h.value)||"指定駐車場",limit:parseInt(($=document.getElementById("parking-designated-limit"))==null?void 0:$.value)||999,memo:((L=document.getElementById("parking-designated-memo"))==null?void 0:L.value)||""},other:{name:((E=document.getElementById("parking-other-name"))==null?void 0:E.value)||"指定以外",memo:((I=document.getElementById("parking-other-memo"))==null?void 0:I.value)||""}};let e=!1;if(Y&&Y.length>0&&Y.some(w=>w.id!=="excluded-car")){if(confirm(`すでに配車結果が存在します。
現在の配車状態を【維持】して、追加・変更分のみを反映しますか？
（「キャンセル」を選ぶと、全てリセットして最初からやり直すか確認します）`))e=!0;else if(!confirm(`現在の状態を【全てリセット】して、最初から割り当てをやり直しますか？
（キャンセルを選ぶと処理を中断します）`))return}let t=[],n=new Map,a=[];const s=ua.filter(w=>jt.has(w.id)).map(w=>{const k=qt.find(A=>A.members.some(P=>P.id===w.id)),_=tt.get(w.id)||{};return{...w,grade:_.grade,school:_.school,other:_.other,memo:_.memo,familyName:k?k.familyName:null}});if(Ht.forEach(w=>{const k=Et.get(w),_=sa.find(D=>D.id===w);if(!_)return;if(!k)return t.push(`${_.name}のドライバー未選択`);const A=s.find(D=>D.id===k);if(!A)return t.push(`${_.name}のドライバーが参加者にいません`);n.set(w,A);const P=Nt.has(w);a.push({id:w,name:_.name,familyName:_.familyName,baseCapacity:P?2:_.baseCapacity,driverId:k,capacity:P?1:_.baseCapacity-1,hasLuggage:P})}),t.length>0)return He(t.join("<br>"),"error");const r=new Set(Array.from(n.values()).map(w=>w.id));let o=s.filter(w=>Xe.has(w.id)&&!r.has(w.id)),i=[];e?a.forEach(w=>{let k=Y.find(A=>A.id===w.id),_=[];k&&(_=k.members.filter(A=>{if(!A)return!1;let P=s.some(q=>q.id===A.id),D=Xe.has(A.id),O=r.has(A.id);return P&&!D&&!O}),_.length>w.capacity&&(_=_.slice(0,w.capacity))),i.push({...w,driver:n.get(w.id),members:_})}):i=a.map(w=>({...w,driver:n.get(w.id),members:[]}));let d=new Set(r);i.forEach(w=>w.members.forEach(k=>{k&&d.add(k.id)}));let l=s.filter(w=>!d.has(w.id)&&!Xe.has(w.id));i.reduce((w,k)=>w+k.capacity,0),i.reduce((w,k)=>w+k.members.length,0);let c=[...l];const m={保護者:1,兄弟:2,選手:3,その他:4};i.forEach(w=>{w.driver&&w.familyName&&c.filter(_=>_.familyName===w.familyName).sort((_,A)=>(m[_.type]||9)-(m[A.type]||9)).forEach(_=>{w.members.length<w.capacity&&(w.members.push(_),c=c.filter(A=>A.id!==_.id))})}),c.sort((w,k)=>w.isFlagTarget===k.isFlagTarget?Math.random()-.5:w.isFlagTarget?-1:1).forEach(w=>{let k=[],_=0;if(i.forEach(A=>{if(A.members.length>=A.capacity)return;let P=A.members.filter(D=>D).reduce((D,O)=>D+(O.isFlagTarget&&w.isFlagTarget?(w.grade===O.grade?1:0)+(w.school===O.school?1:0):0),0);P>_?(_=P,k=[A]):P===_&&k.push(A)}),k.length>0)k[Math.floor(Math.random()*k.length)].members.push(w);else{let A=i.filter(P=>P.members.length<P.capacity);A.length>0&&A[0].members.push(w)}}),i.forEach(w=>{for(w.members=w.members.filter(k=>k);w.members.length<w.capacity;)w.members.push(null)}),e?i.sort((w,k)=>{let _=Y.findIndex(P=>P.id===w.id),A=Y.findIndex(P=>P.id===k.id);return _!==-1&&A!==-1?_-A:_!==-1?-1:A!==-1?1:k.members.filter(P=>P&&P.type==="選手").length-w.members.filter(P=>P&&P.type==="選手").length}):i.sort((w,k)=>k.members.filter(_=>_&&_.type==="選手").length-w.members.filter(_=>_&&_.type==="選手").length);let u=0;i.forEach(w=>{if(e){let k=Y.find(_=>_.id===w.id);k?(w.assignedParking=k.assignedParking,w.assignedParking==="designated"&&u++):u<pe.designated.limit?(w.assignedParking="designated",u++):w.assignedParking="other"}else u<pe.designated.limit?(w.assignedParking="designated",u++):w.assignedParking="other"});const f=new Set(r);i.forEach(w=>{w.members.forEach(k=>{k&&f.add(k.id)})}),s.filter(w=>!f.has(w.id)&&!Xe.has(w.id)).forEach(w=>{o.some(k=>k.id===w.id)||o.push(w)}),i.push({id:"excluded-car",name:"別便",capacity:999,baseCapacity:999,driver:null,members:o,hasLuggage:!1,assignedParking:"excluded"}),Y=i,ga(),Nn()}function ga(){const e=document.getElementById("results");if(!e)return;if(e.innerHTML="",ft={car:null,seat:null},Y.length===0){e.innerHTML='<p class="text-gray-500 bg-white p-4 rounded shadow">結果なし</p>',js();return}($e.name||$e.date)&&(e.innerHTML+=`<h2 class="text-2xl font-bold mb-2">${$e.date} ${$e.name} ${pe.groundName?`@${pe.groundName}`:""}</h2>`);const t=Y.filter(r=>r.assignedParking==="designated"),n=Y.filter(r=>r.assignedParking==="other"),a=Y.filter(r=>r.id==="excluded-car"),s=(r,o,i)=>`<div class="bg-white rounded shadow p-4"><h3 class="font-bold text-lg mb-2">◆${o.name||"別便"} ${r==="designated"&&o.limit<999?`(${o.limit}台)`:""}</h3><p class="text-sm text-gray-600 mb-4 whitespace-pre-line">${o.memo}</p><div class="grid grid-cols-1 md:grid-cols-3 gap-4">${i.map(yd).join("")}</div></div>`;e.innerHTML+=s("designated",pe.designated,t),e.innerHTML+=s("other",pe.other,n),a[0].members.length>0&&(e.innerHTML+=s("excluded",{name:"別便",memo:""},a)),js()}function yd(e){var r,o;`${e.id}`;let t="",n="",a="";const s=`swap-car-${e.id}`;if(e.id==="excluded-car"){t=`<div class="p-4 border-b bg-gray-100 flex-shrink-0"><h4 class="font-bold text-lg text-gray-700">合計: ${e.members.length}名</h4></div>`,a=e.members.map((d,l)=>{var f;if(!d)return"";const c=(((f=tt.get(d.id))==null?void 0:f.memo)||"").trim(),m=d.isFlagTarget&&(d.grade||d.school||d.other)?[d.grade,d.school,d.other].filter(Boolean).join(" "):"",u=`seat-${e.id}-${d.id}`;return`<li class="p-2 bg-gray-100 rounded shadow-sm flex items-center justify-between">
                        <div class="flex items-center min-w-0">
                            <input type="checkbox" id="${u}" data-swap-type="seat" data-car-id="${e.id}" data-participant-id="${d.id}" data-is-driver="false" data-slot-index="${l}" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                            <label for="${u}" class="flex flex-col min-w-0">
                                <span class="break-words">${d.name} (${d.type})</span>
                                ${c?`<span class="text-xs text-gray-500 break-words">[${c}]</span>`:""}
                            </label>
                        </div>
                        <span class="text-xs text-gray-400 ml-2 flex-shrink-0">${m}</span>
                    </li>`}).join("");const i="seat-excluded-car-empty";a+=`<li class="p-2 bg-gray-50 rounded shadow-sm flex items-center">
                            <input type="checkbox" id="${i}" data-swap-type="seat" data-car-id="${e.id}" data-participant-id="empty" data-is-driver="false" data-slot-index="-1" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                            <label for="${i}" class="text-gray-400 italic">-- 別便へ移動 --</label>
                        </li>`}else{const i=(e.driver?1:0)+e.members.filter(g=>g!==null).length,d=e.baseCapacity-i,l=e.capacity-e.members.filter(g=>g!==null).length,c=e.hasLuggage?" (荷物あり)":"";t=`
            <div class="p-4 border-b flex-shrink-0 flex items-center car-header">
                <input type="checkbox" id="${s}" data-swap-type="car" data-car-id="${e.id}" class="mr-3 rounded border-gray-400 text-green-600 focus:ring-green-500">
                <div>
                    <h4 class="font-bold text-lg"><label for="${s}">${e.name} ${c}</label></h4>
                    <p class="text-sm font-medium ${l<0?"text-red-600":"text-blue-600"}">
                    総定員 ${e.baseCapacity}名 (空き ${d}名)
                    </p>
                </div>
            </div>`;const m=e.driver,u=m?m.id:"empty",f=m?`[D] ${m.name} (${m.type})`:"ドライバー空席",b=m&&(((r=tt.get(m.id))==null?void 0:r.memo)||"").trim(),y=`seat-${e.id}-driver`;n=`
        <div id="driver-dropzone-${e.id}" class="p-4 border-b driver-dropzone flex-shrink-0">
            <li class="p-2 ${m?"bg-blue-100":"bg-red-50"} rounded shadow-sm flex items-center">
                 <input type="checkbox" id="${y}" data-swap-type="seat" data-car-id="${e.id}" data-participant-id="${u}" data-is-driver="true" data-slot-index="-1" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                 <label for="${y}" class="flex flex-col min-w-0 ${m?"text-blue-800":"text-red-700"}">
                    <span class="font-semibold break-words">${f}</span>
                    ${b?`<span class="text-xs ${m?"text-blue-600":"text-red-600"} ml-2 break-words">[${b}]</span>`:""}
                 </label>
            </li>
        </div>`;for(let g=0;g<e.capacity;g++){const p=e.members[g];if(p){const x=(((o=tt.get(p.id))==null?void 0:o.memo)||"").trim(),v=p.isFlagTarget&&(p.grade||p.school||p.other)?[p.grade,p.school,p.other].filter(Boolean).join(" "):"",h=`seat-${e.id}-${p.id}`;a+=`<li class="p-2 bg-gray-100 rounded shadow-sm flex items-center justify-between">
                                    <div class="flex items-center min-w-0">
                                        <input type="checkbox" id="${h}" data-swap-type="seat" data-car-id="${e.id}" data-participant-id="${p.id}" data-is-driver="false" data-slot-index="${g}" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                        <label for="${h}" class="flex flex-col min-w-0">
                                            <span class="break-words">${p.name} (${p.type})</span>
                                            ${x?`<span class="text-xs text-gray-500 break-words">[${x}]</span>`:""}
                                        </label>
                                    </div>
                                    <span class="text-xs text-gray-400 ml-2 flex-shrink-0">${v}</span>
                                </li>`}else{const x=`seat-${e.id}-empty-${g}`;a+=`<li class="p-2 bg-gray-50 rounded shadow-sm flex items-center">
                                    <input type="checkbox" id="${x}" data-swap-type="seat" data-car-id="${e.id}" data-participant-id="empty" data-is-driver="false" data-slot-index="${g}" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                    <label for="${x}" class="text-gray-400 italic">-- 空席 --</label>
                                </li>`}}}return`<div class="bg-white border rounded-lg shadow-md car-dropzone flex flex-col">${t}${n}<ul id="members-dropzone-${e.id}" class="p-4 space-y-2 min-h-[50px] members-dropzone flex-grow overflow-y-auto">${a}</ul></div>`}function hd(e){const t=e.target;if(t.type!=="checkbox"||!t.dataset.swapType)return;const n=t.dataset.swapType;if(ft[n]&&ft[n].el===t){ft[n]=null,t.closest("div").classList.remove("swap-selected");return}const a={carId:t.dataset.carId,pid:t.dataset.participantId,isD:t.dataset.isDriver==="true",idx:parseInt(t.dataset.slotIndex),el:t};if(t.closest("div").classList.add("swap-selected"),n==="car"&&ft.seat||n==="seat"&&ft.car)return t.checked=!1,He("車と席の混在不可","error");if(!ft[n]){ft[n]=a;return}const s=ft[n],r=a;if(n==="car"){const o=Y.find(d=>d.id===s.carId),i=Y.find(d=>d.id===r.carId);if(o&&i)if(o.assignedParking===i.assignedParking){const d=Y.indexOf(o),l=Y.indexOf(i);d>-1&&l>-1&&([Y[d],Y[l]]=[Y[l],Y[d]])}else{const d=o.assignedParking;o.assignedParking=i.assignedParking,i.assignedParking=d}}else{const o=Y.find(c=>c.id===s.carId),i=Y.find(c=>c.id===r.carId),d=s.pid==="empty"?null:s.isD?o.driver:o.members[s.idx],l=r.pid==="empty"?null:r.isD?i.driver:i.members[r.idx];s.isD?o.driver=l:o.id!=="excluded-car"?o.members[s.idx]=l:(o.members=o.members.filter(c=>c&&c.id!==(d==null?void 0:d.id)),l&&o.members.push(l)),r.isD?i.driver=d:i.id!=="excluded-car"?i.members[r.idx]=d:(i.members=i.members.filter(c=>c&&c.id!==(l==null?void 0:l.id)),d&&i.members.push(d)),[o,i].forEach(c=>{if(c.id!=="excluded-car")for(c.members=c.members.filter(m=>m);c.members.length<c.capacity;)c.members.push(null);else c.members=c.members.filter(m=>m)})}ga(),Nn()}function Nn(){const e=document.getElementById("text-output");if(!e)return;if(Y.length===0){e.value="";return}const t=pe.groundName?`@${pe.groundName}`:"";let n=[`${$e.date} ${$e.name}${t}
`];$e.timeline&&n.push($e.timeline+`
`);const a=o=>`${o.name.replace(/の車|家の車/g,"カー")} (${o.driver?o.driver.name:"未定"}, ${o.members.filter(i=>i).map(i=>(i.type==="選手"?"★":"")+i.name).join(", ")}${o.hasLuggage?", 荷物":""})`;n.push(`◆${pe.designated.name}
${pe.designated.memo}`),Y.filter(o=>o.assignedParking==="designated").forEach(o=>n.push("・"+a(o)));const s=Y.filter(o=>o.assignedParking==="other");s.length>0&&(n.push(`
◆${pe.other.name}
${pe.other.memo}`),s.forEach(o=>n.push("・"+a(o))));const r=Y.find(o=>o.id==="excluded-car");r&&r.members.length>0&&(n.push(`
◆別便`),r.members.filter(o=>o).forEach(o=>n.push("・"+(o.type==="選手"?"★":"")+o.name))),$e.notes&&n.push(`
◆その他
`+$e.notes),e.value=n.join(`
`)}function xd(){const e=document.getElementById("text-output");e&&(navigator.clipboard.writeText(e.value),He("コピーしました","success"))}function vd(){const e=document.getElementById("toggle-details-button"),t=e.textContent==="すべて開く";Ve.querySelectorAll("details").forEach(n=>n.open=t),e.textContent=t?"すべて閉じる":"すべて開く"}function xr(){var e,t,n,a,s,r,o,i,d,l;return $e={date:((e=document.getElementById("event-date"))==null?void 0:e.value)||"",name:((t=document.getElementById("event-name"))==null?void 0:t.value)||"",timeline:((n=document.getElementById("event-timeline"))==null?void 0:n.value)||"",notes:((a=document.getElementById("event-notes"))==null?void 0:a.value)||""},pe={groundName:((s=document.getElementById("ground-name"))==null?void 0:s.value)||"",designated:{name:((r=document.getElementById("parking-designated-name"))==null?void 0:r.value)||"指定駐車場",limit:parseInt((o=document.getElementById("parking-designated-limit"))==null?void 0:o.value)||999,memo:((i=document.getElementById("parking-designated-memo"))==null?void 0:i.value)||""},other:{name:((d=document.getElementById("parking-other-name"))==null?void 0:d.value)||"指定以外",memo:((l=document.getElementById("parking-other-memo"))==null?void 0:l.value)||""}},{selectedParticipantIds:Array.from(jt),selectedCarIds:Array.from(Ht),selectedDrivers:Array.from(Et.entries()),selectedLuggage:Array.from(Nt),excludedParticipantIds:Array.from(Xe),participantData:Array.from(tt.entries()),currentAssignments:Y,parkingInfo:pe,eventInfo:$e}}function vr(e){var t,n,a,s,r;jt=new Set(e.selectedParticipantIds||[]),Ht=new Set(e.selectedCarIds||[]),Et=new Map(e.selectedDrivers||[]),Nt=new Set(e.selectedLuggage||[]),Xe=new Set(e.excludedParticipantIds||[]),tt=new Map(e.participantData||[]),pe=e.parkingInfo||{groundName:"",designated:{name:"",limit:0,memo:""},other:{name:"",memo:""}},$e=e.eventInfo||{date:"",name:"",timeline:"",notes:""},document.getElementById("event-date")&&(document.getElementById("event-date").value=$e.date||""),document.getElementById("event-name")&&(document.getElementById("event-name").value=$e.name||""),document.getElementById("event-timeline")&&(document.getElementById("event-timeline").value=$e.timeline||""),document.getElementById("event-notes")&&(document.getElementById("event-notes").value=$e.notes||""),document.getElementById("ground-name")&&(document.getElementById("ground-name").value=pe.groundName||""),document.getElementById("parking-designated-name")&&(document.getElementById("parking-designated-name").value=((t=pe.designated)==null?void 0:t.name)||""),document.getElementById("parking-designated-limit")&&(document.getElementById("parking-designated-limit").value=((n=pe.designated)==null?void 0:n.limit)||""),document.getElementById("parking-designated-memo")&&(document.getElementById("parking-designated-memo").value=((a=pe.designated)==null?void 0:a.memo)||""),document.getElementById("parking-other-name")&&(document.getElementById("parking-other-name").value=((s=pe.other)==null?void 0:s.name)||""),document.getElementById("parking-other-memo")&&(document.getElementById("parking-other-memo").value=((r=pe.other)==null?void 0:r.memo)||""),Y=e.currentAssignments||[],ga(),Nn()}function wd(){const e=new Blob([JSON.stringify(xr(),null,2)],{type:"application/json"}),t=document.createElement("a");t.href=URL.createObjectURL(e),t.download="state.json",t.click()}function Ed(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=a=>{vr(JSON.parse(a.target.result)),ma(),pa(),Dn()},n.readAsText(t)}async function _d(){const e=document.getElementById("saved-state-select"),t=e.value;let n=`${document.getElementById("event-date").value}_${document.getElementById("event-name").value}`,a=!1,s=null;if(t){const r=e.options[e.selectedIndex];confirm(`現在「${r.text}」が選択されています。
このデータに上書き保存しますか？
（「キャンセル」を選ぶと新規保存になります）`)&&(a=!0,n=r.text,s=t)}if(!a){const r=prompt("保存名",n);if(!r)return;n=r}try{a&&s&&await J.deleteState(s),await J.saveState(xr(),n),await ls();const r=document.getElementById("saved-state-select");for(let o=0;o<r.options.length;o++)if(r.options[o].text===n){r.selectedIndex=o;break}He(a?"上書き保存しました":"保存しました","success")}catch{He("保存に失敗しました","error")}}async function Id(){const e=document.getElementById("saved-state-select").value;if(!e)return;const t=await J.getState(e);t&&(vr(t.state),ma(),pa(),Dn(),He("読込完了","success"))}async function $d(){const e=document.getElementById("saved-state-select").value;e&&(await J.deleteState(e),await ls(),He("削除完了","success"))}async function ls(){const e=await J.getAllSavedStates(),t=document.getElementById("saved-state-select");t&&(t.innerHTML='<option value="">作業一覧...</option>'+e.map(n=>`<option value="${n.id}">${n.name}</option>`).join(""))}async function kd(){const e=document.getElementById("saved-parking-select"),t=e.value;let n=document.getElementById("ground-name").value||"新規駐車場",a=!1,s=null;if(t){const o=e.options[e.selectedIndex];confirm(`現在「${o.text}」が選択されています。
このデータに上書き保存しますか？
（「キャンセル」を選ぶと新規保存になります）`)&&(a=!0,n=o.text,s=t)}if(!a){const o=prompt("駐車場保存名",n);if(!o)return;n=o}const r={groundName:document.getElementById("ground-name").value,designated:{name:document.getElementById("parking-designated-name").value,limit:parseInt(document.getElementById("parking-designated-limit").value),memo:document.getElementById("parking-designated-memo").value},other:{name:document.getElementById("parking-other-name").value,memo:document.getElementById("parking-other-memo").value}};try{a&&s&&await J.deleteParking(s),await J.saveParking(r,n),await cs();const o=document.getElementById("saved-parking-select");for(let i=0;i<o.options.length;i++)if(o.options[i].text===n){o.selectedIndex=i;break}He(a?"駐車場を上書き保存しました":"駐車場を保存しました","success")}catch{He("保存に失敗しました","error")}}async function Ld(){const e=document.getElementById("saved-parking-select").value;if(!e)return;const t=await J.getParking(e);t&&(document.getElementById("ground-name").value=t.parking.groundName,document.getElementById("parking-designated-name").value=t.parking.designated.name,document.getElementById("parking-designated-limit").value=t.parking.designated.limit,document.getElementById("parking-designated-memo").value=t.parking.designated.memo,document.getElementById("parking-other-name").value=t.parking.other.name,document.getElementById("parking-other-memo").value=t.parking.other.memo,He("駐車場読込完了","success"))}async function Bd(){const e=document.getElementById("saved-parking-select").value;e&&(await J.deleteParking(e),await cs(),He("駐車場削除完了","success"))}async function cs(){const e=await J.getAllSavedParking(),t=document.getElementById("saved-parking-select");t&&(t.innerHTML='<option value="">駐車場一覧...</option>'+e.map(n=>`<option value="${n.id}">${n.name}</option>`).join(""))}async function Sd(){confirm("全データをリセットしますか？")&&(await J.clearDatabase(),location.reload())}window.clearCurrentInputs=function(){if(!confirm(`現在の入力内容（イベント情報、選択メンバー、車、駐車場、配車結果など）をすべてクリアして、初期状態に戻しますか？
（※データベースに保存されているマスタデータや過去の保存データは削除されません）`))return;const e=document.getElementById("event-date");e&&(e.value="");const t=document.getElementById("event-name");t&&(t.value="");const n=document.getElementById("event-timeline");n&&(n.value="");const a=document.getElementById("event-remarks");a&&(a.value="");const s=document.getElementById("ground-name");s&&(s.value="");const r=document.getElementById("parking-name");r&&(r.value="");const o=document.getElementById("parking-limit");o&&(o.value="99");const i=document.getElementById("parking-remarks");i&&(i.value="");const d=document.getElementById("other-parking-name");d&&(d.value="");const l=document.getElementById("other-parking-remarks");l&&(l.value=""),jt.clear(),Ht.clear(),Et.clear(),Nt.clear(),Xe.clear(),tt.clear(),hr(),Y=[],ma(),pa(),Dn(),ga(),Nn(),window.att_swapSelectedMember=null,window.att_swapSelectedCar=null,He("画面の入力をクリアしました。","success")};function He(e,t="info"){const n=document.getElementById("dispatch-message");let a="bg-blue-100 text-blue-700 border-blue-200";t==="error"?a="bg-red-100 text-red-700 border-red-200":t==="success"?a="bg-green-100 text-green-700 border-green-200":t==="warning"&&(a="bg-yellow-100 text-yellow-800 border-yellow-200"),n.className=`p-4 h-full border rounded-lg ${a}`,document.getElementById("dispatch-message-text").innerHTML=e,n.classList.remove("hidden"),Ia&&clearTimeout(Ia),t!=="warning"&&(Ia=setTimeout(us,5e3))}function us(){document.getElementById("dispatch-message").classList.add("hidden")}function Td(){if(!Y||Y.length===0)return!1;for(const t of Y){if(t.id==="excluded-car")continue;if((t.driver?1:0)+t.members.filter(a=>a!==null).length>t.baseCapacity)return!0}const e=Y.find(t=>t.id==="excluded-car");return e?e.members.some(t=>t&&!Xe.has(t.id)):!1}function js(){if(Td())He("定員オーバーです。車の台数が足りないか、定員を超過している車があります。","warning");else{const e=document.getElementById("dispatch-message"),t=document.getElementById("dispatch-message-text");e&&!e.classList.contains("hidden")&&t&&t.innerHTML.includes("定員オーバー")&&us()}}function Cd(){var t,n,a,s,r,o,i;const e=document.querySelector("#view-master h2");if(e&&!document.getElementById("btn-back-to-dispatch-master")){const d=document.createElement("button");d.id="btn-back-to-dispatch-master",d.className="bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 px-4 py-2 rounded shadow font-bold text-sm mb-4 flex items-center w-fit",d.innerHTML='<span class="mr-1">◀</span> 配車調整に戻る',d.addEventListener("click",()=>{var l;return(l=document.getElementById("nav-dispatch"))==null?void 0:l.click()}),e.parentElement.insertBefore(d,e)}(t=document.getElementById("add-family-button"))==null||t.addEventListener("click",Dd),Qe==null||Qe.addEventListener("click",Nd),Qe==null||Qe.addEventListener("input",Od),Qe==null||Qe.addEventListener("change",Pd),(n=document.getElementById("add-car-button"))==null||n.addEventListener("click",Md),bt==null||bt.addEventListener("click",Rd),bt==null||bt.addEventListener("input",Fd),(a=document.getElementById("add-parking-button-master"))==null||a.addEventListener("click",qd),St==null||St.addEventListener("click",jd),St==null||St.addEventListener("input",Hd),(s=document.getElementById("export-master-button"))==null||s.addEventListener("click",Ud),(r=document.getElementById("import-master-input"))==null||r.addEventListener("change",Vd),(o=document.getElementById("master-message-close"))==null||o.addEventListener("click",wr),(i=document.getElementById("save-master-db-button"))==null||i.addEventListener("click",Ad)}async function Ad(){const e=document.getElementById("save-master-db-button");try{e.textContent="保存中...",await J.syncAllMaster(),Wa("マスターデータをサーバーに保存しました","success"),Re=await J.getAllSavedParking()||[],_n()}catch(t){Wa("保存に失敗しました: "+t.message,"error")}finally{e.textContent="マスターデータを保存 (更新)"}}function Kt(){Qe&&(Qe.innerHTML="",se.sort((e,t)=>(e.order??99)-(t.order??99)).forEach((e,t)=>{const n=e.members.map(a=>`<div class="p-2 border rounded bg-gray-50 member-grid"><input data-id="${a.id}" data-f="name" value="${a.name}" class="col-span-3 md:col-span-1 p-1 border"><select data-id="${a.id}" data-f="type" class="col-span-2 md:col-span-1 p-1 border"><option ${a.type==="選手"?"selected":""}>選手</option><option ${a.type==="保護者"?"selected":""}>保護者</option><option ${a.type==="兄弟"?"selected":""}>兄弟</option><option ${a.type==="その他"?"selected":""}>その他</option></select><input data-id="${a.id}" data-f="data.grade" value="${a.data.grade||""}" placeholder="学年" class="col-span-1 border"><input data-id="${a.id}" data-f="data.school" value="${a.data.school||""}" placeholder="学校" class="col-span-2 md:col-span-1 border"><input data-id="${a.id}" data-f="data.other" value="${a.data.other||""}" placeholder="他" class="col-span-2 md:col-span-1 border"><input data-id="${a.id}" data-f="data.memo" value="${a.data.memo||""}" placeholder="備考" class="col-span-2 md:col-span-1 border"><div class="col-span-3 md:col-span-1 flex items-center justify-between"><label class="text-xs"><input type="checkbox" data-id="${a.id}" data-f="isFlagTarget" ${a.isFlagTarget?"checked":""}>同乗優先</label><button data-action="del-m" data-id="${a.id}" class="bg-red-500 text-white px-2 py-1 rounded text-xs">削</button></div></div>`).join("");Qe.innerHTML+=`<div class="bg-white border rounded shadow" data-fname="${e.familyName}"><div class="family-header"><input data-action="ren-f" value="${e.familyName}" class="font-bold border p-1"><div class="space-x-2"><button data-action="up" class="bg-gray-400 text-white px-2 rounded text-xs">▲</button><button data-action="down" class="bg-gray-400 text-white px-2 rounded text-xs">▼</button><button data-action="del-f" class="bg-red-500 text-white px-2 py-1 rounded text-xs">家族削除</button></div></div><div class="p-3 space-y-2">${n}</div><button data-action="add-m" class="ml-3 mb-3 bg-blue-500 text-white px-2 py-1 rounded text-xs">＋メンバー</button></div>`}))}function Dd(){const e=prompt("家族名");e&&(J.addFamily({familyName:e,order:99,members:[{id:"p"+Date.now(),name:"新規",type:"選手",isFlagTarget:!0,data:{}}]}),Kt())}async function Nd(e){const t=e.target,n=t.dataset.action,a=t.closest("[data-fname]");if(!a)return;const s=a.dataset.fname;if(n==="del-f"&&confirm("削除?")&&(J.deleteFamily(s),Kt()),n==="add-m"){const r=await J.getFamily(s);r.members.push({id:"p"+Date.now(),name:"新規",type:"保護者",isFlagTarget:!1,data:{}}),J.updateFamily(r),Kt()}if(n==="del-m"){const r=await J.getFamily(s);r.members=r.members.filter(o=>o.id!==t.dataset.id),J.updateFamily(r),Kt()}if(n==="up"||n==="down"){se.sort((i,d)=>(i.order??99)-(d.order??99)),se.forEach((i,d)=>{i.order=d});const r=se.findIndex(i=>i.familyName===s),o=n==="up"?r-1:r+1;if(o>=0&&o<se.length){const i=se[r].order;se[r].order=se[o].order,se[o].order=i,Kt()}}}function Pd(e){const t=e.target,n=t.closest("[data-fname]");if(!n)return;const a=n.dataset.fname;if(t.dataset.action==="ren-f"){const s=t.value.trim();if(s&&s!==a){if(se.find(i=>i.familyName===s)){alert(`家族名「${s}」は既に存在します。別の名前を入力してください。`),t.value=a;return}const o=se.find(i=>i.familyName===a);if(o){o.familyName=s,n.dataset.fname=s;let i=!1;re.forEach(d=>{d.familyName===a&&(d.familyName=s,i=!0)}),i&&pn()}}else s||(t.value=a)}}async function Od(e){const t=e.target;if(t.dataset.action==="ren-f")return;const n=t.dataset.id,a=t.dataset.f,s=t.closest("[data-fname]").dataset.fname;if(!n||!a)return;const r=await J.getFamily(s),o=r.members.find(d=>d.id===n),i=t.type==="checkbox"?t.checked:t.value;a.startsWith("data.")?o.data[a.split(".")[1]]=i:o[a]=i,J.updateFamily(r)}function pn(){bt&&(bt.innerHTML="",re.sort((e,t)=>(e.order??99)-(t.order??99)).forEach(e=>{bt.innerHTML+=`<div class="p-3 border rounded bg-gray-50 flex flex-wrap gap-2 items-center" data-cid="${e.id}"><button data-act="up" class="bg-gray-400 text-white px-2 py-1 text-xs">▲</button><button data-act="down" class="bg-gray-400 text-white px-2 py-1 text-xs">▼</button><input data-f="name" value="${e.name}" class="p-1 border text-sm w-32"><input data-f="familyName" value="${e.familyName}" class="p-1 border text-sm w-32"><input type="number" data-f="baseCapacity" value="${e.baseCapacity}" class="p-1 border text-sm w-16"><button data-act="del" class="bg-red-500 text-white px-2 py-1 rounded text-xs">削</button></div>`}))}function Md(){J.addCar({id:"c"+Date.now(),name:"新規車",familyName:"",baseCapacity:5,order:99}),pn()}function Rd(e){const t=e.target,n=t.dataset.act,a=t.closest("[data-cid]");if(!a)return;const s=a.dataset.cid;if(n==="del"&&(J.deleteCar(s),pn()),n==="up"||n==="down"){re.sort((i,d)=>(i.order??99)-(d.order??99)),re.forEach((i,d)=>{i.order=d});const r=re.findIndex(i=>i.id===s),o=n==="up"?r-1:r+1;if(o>=0&&o<re.length){const i=re[r].order;re[r].order=re[o].order,re[o].order=i,pn()}}}async function Fd(e){const t=e.target,n=t.dataset.f,a=t.closest("[data-cid]").dataset.cid;if(!n)return;const s=await J.getCar(a);s[n]=t.type==="number"?parseInt(t.value):t.value,J.updateCar(s)}function fa(){St.innerHTML="",Re.forEach(e=>{St.innerHTML+=`
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
        </div>`})}function qd(){J.addParkingMaster({groundName:"",designated:{name:"",limit:0,memo:""},other:{name:"",memo:""}},"新規P"),fa()}function jd(e){e.target.dataset.act==="del"&&(J.deleteParkingMaster(e.target.closest("[data-pid]").dataset.pid),fa())}function Hd(e){const t=e.target,n=t.dataset.f,a=t.closest("[data-pid]").dataset.pid;if(!n)return;const s=Re.find(o=>o.id===a),r=t.type==="number"?parseInt(t.value):t.value;if(n==="name")s.name=r;else{const o=n.split(".");o.length===2?s[o[0]][o[1]]=r:s[o[0]][o[1]][o[2]]=r}J.updateParkingMaster(s)}async function Ud(){const e={families:se,cars:re,parking:await J.getAllSavedParking()},t=document.createElement("a");t.href=URL.createObjectURL(new Blob([JSON.stringify(e)],{type:"application/json"})),t.download="master.json",t.click()}function Vd(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=a=>{const s=JSON.parse(a.target.result);if(J.bulkAddFamilies(s.families),J.bulkAddCars(s.cars),s.parking){Re.forEach(r=>xn.add(r.id)),Re=[];for(let r of s.parking)Re.push({id:r.id||"p"+Date.now()+Math.floor(Math.random()*1e3),name:r.name,timestamp:r.timestamp||Date.now(),parking:r.parking,isNew:!0})}Kt(),pn(),fa(),Wa("読込完了 (※まだ保存されていません。保存ボタンを押してください)","info")},n.readAsText(t)}function Wa(e,t="info"){const n=document.getElementById("master-message");n.className=`p-4 mb-4 border rounded-lg ${t==="error"?"bg-red-100 text-red-700":t==="success"?"bg-green-100 text-green-700":"bg-blue-100 text-blue-700"}`,document.getElementById("master-message-text").innerHTML=e,n.classList.remove("hidden"),$a&&clearTimeout($a),$a=setTimeout(wr,5e3)}function wr(){document.getElementById("master-message").classList.add("hidden")}let _t={type:"",add:[],update:[],delete:[]};function Er(e,t,n,a,s,r=""){_t={type:e,add:t,update:n,delete:a},document.getElementById("csv-confirm-title").textContent=s,document.getElementById("csv-add-count").textContent=t.length,document.getElementById("csv-update-count").textContent=n.length,document.getElementById("csv-delete-count").textContent=a.length;const o=document.getElementById("csv-confirm-warning");r?(o.innerHTML=r,o.classList.remove("hidden")):o.classList.add("hidden"),document.getElementById("tab-csv-add").onclick=()=>on("add"),document.getElementById("tab-csv-update").onclick=()=>on("update"),document.getElementById("tab-csv-delete").onclick=()=>on("delete"),t.length>0?on("add"):n.length>0?on("update"):on("delete"),document.getElementById("csv-confirm-modal").classList.remove("hidden")}function ra(){document.getElementById("csv-confirm-modal").classList.add("hidden");const e=document.getElementById("input-import-users-csv");e&&(e.value="");const t=document.getElementById("input-import-events-csv");t&&(t.value="")}function on(e){["add","update","delete"].forEach(n=>{const a=document.getElementById(`tab-csv-${n}`);n===e?(a.classList.add("text-blue-600","border-blue-600"),a.classList.remove("text-gray-500","border-transparent")):(a.classList.remove("text-blue-600","border-blue-600"),a.classList.add("text-gray-500","border-transparent"))}),Gd(e)}function Gd(e){const t=document.getElementById("csv-confirm-content"),n=_t[e];if(!n||n.length===0){t.innerHTML='<p class="text-gray-500 p-4">対象のデータはありません。</p>';return}let a="";if(_t.type==="users"){const s=e==="add",r=e==="update";a+=`
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
        </div>`}else _t.type==="events"&&(a+=`
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
        </div>`);t.innerHTML=a}function _r(e){const t=[];let n=[],a="",s=!1;for(let r=0;r<e.length;r++){const o=e[r];s?o==='"'?r+1<e.length&&e[r+1]==='"'?(a+='"',r++):s=!1:a+=o:o==='"'?s=!0:o===","?(n.push(a),a=""):o===`
`||o==="\r"?(n.push(a),t.push(n),n=[],a="",o==="\r"&&r+1<e.length&&e[r+1]===`
`&&r++):a+=o}return(a||n.length>0)&&(n.push(a),t.push(n)),t}function ms(e){if(e==null)return"";const t=String(e);return t.includes(",")||t.includes('"')||t.includes(`
`)||t.includes("\r")?'"'+t.replace(/"/g,'""')+'"':t}async function Wd(){U("メンバー情報をエクスポート中...");try{const{data:e}=await B.from("app_users").select("*").order("created_at",{ascending:!1}),{data:t}=await B.from("user_groups").select("*"),{data:n}=await B.from("groups").select("*"),{data:a}=await B.from("user_attributes").select("*"),s=new Map(n.map(f=>[f.id,f.name])),r=new Map(a.map(f=>[f.id,f.name])),o=new Map(t.map(f=>[f.user_email,f.group_id]));let i=window.adminDelegations;if(!i){const{data:f}=await B.from("master_data").select("*").eq("key","ATTENDANCE_DELEGATIONS").single();i=f&&f.data?f.data:{},window.adminDelegations=i}const l=[["メールアドレス","氏名","役割","所属グループ名","ユーザー属性名","配車利用可(1/0)","成績利用可(1/0)","出欠利用可(1/0)","シミュレータ利用可(1/0)","Info利用可(1/0)","代行入力先(カンマ区切りメールアドレス)","代行専用(1/0)","初期パスワード","削除(1/0)"]];e.forEach(f=>{const b=f.role==="admin"?"管理者":f.role==="leader"?"リーダー":"一般ユーザー",y=o.get(f.email),g=y&&s.get(y)||"",p=f.attribute_id&&r.get(f.attribute_id)||"",x=i[f.email]?i[f.email].join(","):"",v=f.email.endsWith("@local.dummy");l.push([f.email,f.name||"",b,g,p,f.can_use_dispatch!==!1?"1":"0",f.can_use_dashboard!==!1?"1":"0",f.can_use_attendance!==!1?"1":"0",f.can_use_simulator!==!1?"1":"0",f.can_use_info!==!1?"1":"0",x,v?"1":"0","","0"])});const c=l.map(f=>f.map(ms).join(",")).join(`
`),m=new Blob([new Uint8Array([239,187,191]),c],{type:"text/csv;charset=utf-8;"}),u=document.createElement("a");u.href=URL.createObjectURL(m),u.download=`members_${new Date().toISOString().split("T")[0]}.csv`,u.click()}catch(e){console.error(e),alert("エクスポートに失敗しました: "+e.message)}finally{F()}}async function zd(e){const t=e.target.files[0];if(!t)return;U("CSVファイルを解析中...");const n=new FileReader;n.onload=async a=>{try{const s=a.target.result,r=_r(s);if(r.length<2){alert("有効なデータがありません。"),F();return}const o=r[0].map(S=>S.trim()),i=o.indexOf("メールアドレス"),d=o.indexOf("氏名"),l=o.indexOf("役割"),c=o.indexOf("所属グループ名"),m=o.indexOf("ユーザー属性名"),u=o.findIndex(S=>S.includes("配車")),f=o.findIndex(S=>S.includes("成績")),b=o.findIndex(S=>S.includes("出欠")),y=o.findIndex(S=>S.includes("シミュレータ")),g=o.findIndex(S=>S.includes("Info")||S.includes("インフォ")),p=o.findIndex(S=>S.includes("代行入力先")),x=o.findIndex(S=>S.includes("代行専用")),v=o.findIndex(S=>S.includes("初期パスワード")),h=o.findIndex(S=>S.includes("削除"));if(i===-1||d===-1){alert("「メールアドレス」および「氏名」列は必須です。"),F();return}const{data:$}=await B.from("app_users").select("*"),{data:L}=await B.from("user_groups").select("*"),{data:E}=await B.from("groups").select("*"),{data:I}=await B.from("user_attributes").select("*");let w=window.adminDelegations;if(!w){const{data:S}=await B.from("master_data").select("*").eq("key","ATTENDANCE_DELEGATIONS").single();w=S&&S.data?S.data:{},window.adminDelegations=w}const k=new Map(E.map(S=>[S.name,S.id])),_=new Map(I.map(S=>[S.name,S.id])),A=new Map($.map(S=>[S.email,S])),P=new Map(L.map(S=>[S.user_email,S.group_id])),D=[],O=[],q=[];for(let S=1;S<r.length;S++){const C=r[S];if(C.length<2)continue;const N=(C[d]||"").trim();if(!N)continue;let T=(C[i]||"").trim();const M=x!==-1?C[x]==="1"||C[x]==="true"||C[x]==="代行専用":!1,W=T.endsWith("@local.dummy"),j=M||W;if(T)j&&!W&&(T.includes("@")?T=T.split("@")[0]+"@local.dummy":T=T+"@local.dummy");else if(j)T=`dummy_${Date.now()}_${S}@local.dummy`;else continue;T=ca(T);const H=(C[l]||"").trim();let R="user";H==="管理者"||H==="admin"?R="admin":(H==="リーダー"||H==="leader")&&(R="leader");const z=c!==-1?(C[c]||"").trim():"",de=z&&k.get(z)||null,ee=m!==-1?(C[m]||"").trim():"",ge=ee&&_.get(ee)||null,we=u!==-1?!(C[u]==="0"||C[u]==="false"):!0,Lt=f!==-1?!(C[f]==="0"||C[f]==="false"):!0,lt=b!==-1?!(C[b]==="0"||C[b]==="false"):!0,ne=y!==-1?!(C[y]==="0"||C[y]==="false"):!0,Je=g!==-1?!(C[g]==="0"||C[g]==="false"):!0,Ce=h!==-1?C[h]==="1"||C[h]==="削除":!1;let mt=null;p!==-1&&(mt=(C[p]||"").split(",").map(le=>le.trim()).filter(Boolean));let pt="",ct=null;if(!j){const V=v!==-1?(C[v]||"").trim():"";if(A.has(T))V.length>=6&&(ct=V);else if(V.length>=6)pt=V;else{const le="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";let Me="pw-";for(let Ue=0;Ue<6;Ue++)Me+=le.charAt(Math.floor(Math.random()*le.length));pt=Me}}const Ke={email:T,name:N,role:R,group_id:de,group_name:z,attribute_id:ge,attribute_name:ee,can_use_dispatch:we,can_use_dashboard:Lt,can_use_attendance:lt,can_use_simulator:ne,can_use_info:Je,delegations:mt,is_dummy:j,initial_password:ct!==null?ct:pt},Ae=A.get(T);if(Ae)if(Ce)q.push(Ke);else{const V=P.get(T)!==de,le=Ae.role!==R,Me=Ae.name!==N,Ue=Ae.attribute_id!==ge,Ut=Ae.can_use_dispatch!==!1!==we,Ir=Ae.can_use_dashboard!==!1!==Lt,$r=Ae.can_use_attendance!==!1!==lt,kr=Ae.can_use_simulator!==!1!==ne,Lr=Ae.can_use_info!==!1!==Je;let ps=!1;if(mt!==null){const Br=w[T]||[],Sr=[...mt].sort().join(","),Tr=[...Br].sort().join(",");Sr!==Tr&&(ps=!0)}let gs=!1;ct!==null&&(gs=!0),(V||le||Me||Ue||Ut||Ir||$r||kr||Lr||ps||gs)&&O.push(Ke)}else Ce||(Ke.delegations===null&&(Ke.delegations=[]),D.push(Ke))}F(),Er("users",D,O,q,"メンバーCSVインポート確認")}catch(s){console.error(s),alert("CSVの解析に失敗しました: "+s.message),F()}},n.readAsText(t)}async function Jd(){_t.type==="users"?await Kd():_t.type==="events"&&typeof window.executeEventsImport=="function"&&await window.executeEventsImport()}async function Kd(){U("インポートデータを保存中...");try{const{add:e,update:t,delete:n}=_t;let a=window.adminDelegations;if(!a){const{data:d}=await B.from("master_data").select("*").eq("key","ATTENDANCE_DELEGATIONS").single();a=d&&d.data?d.data:{},window.adminDelegations=a}if(n.length>0){const d=n.map(c=>c.email),{error:l}=await B.from("app_users").delete().in("email",d);if(l)throw l;d.forEach(c=>{delete window.adminDelegations[c]}),Object.keys(window.adminDelegations).forEach(c=>{window.adminDelegations[c]=(window.adminDelegations[c]||[]).filter(m=>!d.includes(m))}),await X("IMPORT_USERS_DELETE",`${n.length}件のユーザーをインポートで削除しました`)}if(e.length>0){const d=[];for(let u of e)if(!u.is_dummy)try{const f=window.supabase.createClient(os,is,{auth:{persistSession:!1,autoRefreshToken:!1}}),{error:b}=await f.auth.signUp({email:u.email,password:u.initial_password});if(b)throw new Error(`Auth作成失敗: ${b.message}`)}catch(f){console.error(`Sign up error for ${u.email}:`,f),d.push(`${u.email}: ${f.message}`)}if(d.length>0&&!confirm(`一部のアカウント払い出し（Auth）に失敗しました。データベース登録を続行しますか？

エラー内容:
${d.join(`
`)}`))throw new Error("インポート処理を中断しました。");const l=e.map(u=>({email:u.email,name:u.name,role:u.role,attribute_id:u.attribute_id,can_use_dispatch:u.can_use_dispatch,can_use_dashboard:u.can_use_dashboard,can_use_attendance:u.can_use_attendance,can_use_simulator:u.can_use_simulator,can_use_info:u.can_use_info})),{error:c}=await B.from("app_users").insert(l);if(c)throw c;const m=e.filter(u=>u.group_id).map(u=>({user_email:u.email,group_id:u.group_id}));if(m.length>0){const{error:u}=await B.from("user_groups").insert(m);if(u)throw u}e.forEach(u=>{u.delegations&&(window.adminDelegations[u.email]=u.delegations)}),await X("IMPORT_USERS_ADD",`${e.length}件のユーザーをインポートで追加しました`)}if(t.length>0){const d=[];for(let l of t){if(l.initial_password)try{const{error:u}=await B.rpc("admin_update_user_password",{user_email:l.email,new_password:l.initial_password});if(u)throw u;await X("ADMIN_CHANGE_PASSWORD",`ユーザー「${l.email}」のパスワードをインポートで変更しました`)}catch(u){console.error(`Failed to update password for ${l.email}:`,u),d.push(`${l.email}: ${u.message}`)}const{error:c}=await B.from("app_users").update({name:l.name,role:l.role,attribute_id:l.attribute_id,can_use_dispatch:l.can_use_dispatch,can_use_dashboard:l.can_use_dashboard,can_use_attendance:l.can_use_attendance,can_use_simulator:l.can_use_simulator,can_use_info:l.can_use_info}).eq("email",l.email);if(c)throw c;const{data:m}=await B.from("user_groups").select("*").eq("user_email",l.email);if(l.group_id)if(m&&m.length>0){const{error:u}=await B.from("user_groups").update({group_id:l.group_id}).eq("user_email",l.email);if(u)throw u}else{const{error:u}=await B.from("user_groups").insert([{user_email:l.email,group_id:l.group_id}]);if(u)throw u}else if(m&&m.length>0){const{error:u}=await B.from("user_groups").delete().eq("user_email",l.email);if(u)throw u}l.delegations!==null&&(window.adminDelegations[l.email]=l.delegations)}d.length>0&&alert(`一部のパスワード更新に失敗しました。詳細は開発者コンソールを確認してください。

失敗したユーザー:
${d.join(`
`)}`),await X("IMPORT_USERS_UPDATE",`${t.length}件のユーザーをインポートで更新しました`)}const{error:s}=await B.from("master_data").upsert({key:"ATTENDANCE_DELEGATIONS",data:window.adminDelegations});if(s)throw s;let r="インポートが完了しました。";const o=e.filter(d=>!d.is_dummy),i=t.filter(d=>d.initial_password);(o.length>0||i.length>0)&&(r+=`

【アカウントのログイン情報・変更内容】`,o.length>0&&(r+=`
[新規アカウントの仮パスワード]`,o.forEach(d=>{r+=`
氏名: ${d.name}
ログインID: ${en(d.email)}
仮パスワード: ${d.initial_password}
------------------------`})),i.length>0&&(r+=`
[更新アカウントの新パスワード]`,i.forEach(d=>{r+=`
氏名: ${d.name}
ログインID: ${en(d.email)}
新パスワード: ${d.initial_password}
------------------------`})),r+=`

※上記情報をコピーし、対象のユーザーへお伝えください。`),alert(r),ra(),await ae()}catch(e){console.error(e),alert("保存に失敗しました: "+e.message)}finally{F()}}window.showCSVConfirmModal=Er;window.closeCSVConfirmModal=ra;window.parseCSV=_r;window.escapeCSV=ms;function Yd(){const n=[["メールアドレス","氏名","役割","所属グループ名","ユーザー属性名","配車利用可(1/0)","成績利用可(1/0)","出欠利用可(1/0)","代行入力先(カンマ区切りメールアドレス)","代行専用(1/0)","初期パスワード","削除(1/0)"],["sample_parent@example.com","山田 太郎","一般ユーザー","選手・保護者","A軍","1","1","1","sample_child1@example.com,sample_child2@example.com","0","tempPw123","0"],["sample_child1@example.com","山田 一郎","一般ユーザー","選手・保護者","A軍","1","0","1","","0","tempPw123","0"],["sample_child2@example.com","山田 二郎","一般ユーザー","選手・保護者","A軍","1","0","1","","0","tempPw123","0"],["","代行専用の子ども","一般ユーザー","選手・保護者","A軍","0","0","1","","1","","0"]].map(r=>r.map(ms).join(",")).join(`
`),a=new Blob([new Uint8Array([239,187,191]),n],{type:"text/csv;charset=utf-8;"}),s=document.createElement("a");s.href=URL.createObjectURL(a),s.download="members_sample.csv",s.click()}const Qd=Object.freeze(Object.defineProperty({__proto__:null,get csvImportState(){return _t},get currentUser(){return G},get currentUserRole(){return he},forceHideLoading:Ge,goToUsersAdmin:yr,hideLoading:F,logAction:X,openChangePasswordModal:ds,showLoading:U,supabaseClient:B,switchAuthScreen:K,withLoading:fe},Symbol.toStringTag,{value:"Module"}));
