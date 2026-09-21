(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();let Yt=new Date,tt=[],Ge=[],je=[],os=[],fa=[],it=[],Se=[],qt=[],Nt=[],ks=!1,Oa=[],Ft=[],ue=[];window.att_multiSelectMode=!1;window.att_selectedDates=new Set;window.att_selectedCategories=new Set;window.att_selectedGroups=new Set;function _n(e){let t=e.target_group_ids||[];if(t.length===0&&e.target_group_id&&(t=[e.target_group_id]),t.length===0)return{ids:[],name:"全体",color:"#e5e7eb"};const n=Ge.filter(a=>t.includes(a.id));return n.length===0?{ids:[],name:"全体",color:"#e5e7eb"}:{ids:t,name:n.map(a=>a.name).join(", "),color:n[0].color||"#e5e7eb",groups:n}}function Zs(e){return e.ids.length===0?'<span class="text-xs border border-gray-300 text-gray-800 px-2 py-0.5 rounded shadow-sm" style="background-color: #e5e7eb">全体</span>':e.groups.map(t=>`<span class="text-xs border border-gray-300 text-gray-800 px-2 py-0.5 rounded shadow-sm" style="background-color: ${t.color||"#e5e7eb"}">${t.name}</span>`).join(" ")}function Xs(e){if(!e)return"-";try{const t=new Date(e);if(isNaN(t.getTime()))return"-";const n=t.getMonth()+1,a=t.getDate(),s=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}/${a} ${s}:${r}`}catch{return"-"}}async function Ra(){try{ks||(Jr(),ks=!0),await rn(),We(),Yr(),Kr()}catch(e){console.error("Attendance App Init Error:",e),typeof Fe=="function"&&Fe()}}function Jr(){var n,a,s,r,o,i,d,l,c,u,m,g,b,y,f,p,v,x,h,k,L,w,I,E,$;const e=document.getElementById("btn-logout-att");if(e&&!document.getElementById("btn-change-password-att")){const _=document.createElement("button");_.id="btn-change-password-att",_.className="text-xs md:text-sm bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 md:px-3 md:py-1 rounded shadow mr-2 font-bold",_.textContent="パスワード変更",_.onclick=()=>xs(),e.parentNode.insertBefore(_,e)}(n=document.getElementById("tab-calendar"))==null||n.addEventListener("click",()=>Ls("calendar")),(a=document.getElementById("tab-list"))==null||a.addEventListener("click",()=>{Ls("list"),Tt()}),(s=document.getElementById("cal-prev-month"))==null||s.addEventListener("click",()=>{Yt.setMonth(Yt.getMonth()-1),We()}),(r=document.getElementById("cal-next-month"))==null||r.addEventListener("click",()=>{Yt.setMonth(Yt.getMonth()+1),We()}),(o=document.getElementById("cal-today"))==null||o.addEventListener("click",()=>{Yt=new Date,We()}),(i=document.getElementById("btn-add-event"))==null||i.addEventListener("click",()=>Mn()),(d=document.getElementById("btn-export-events"))==null||d.addEventListener("click",go),(l=document.getElementById("btn-import-events"))==null||l.addEventListener("click",()=>document.getElementById("input-import-events-csv").click()),(c=document.getElementById("btn-import-ics-events"))==null||c.addEventListener("click",()=>document.getElementById("input-import-events-ics").click()),(u=document.getElementById("btn-download-events-sample"))==null||u.addEventListener("click",ho),(m=document.getElementById("input-import-events-csv"))==null||m.addEventListener("change",bo),(g=document.getElementById("input-import-events-ics"))==null||g.addEventListener("change",vo),(b=document.getElementById("btn-close-ics-modal-x"))==null||b.addEventListener("click",qa),(y=document.getElementById("btn-close-ics-modal"))==null||y.addEventListener("click",qa),(f=document.getElementById("btn-execute-ics-import"))==null||f.addEventListener("click",Eo),(p=document.getElementById("ics-import-list"))==null||p.addEventListener("change",_=>{if(_.target&&_.target.classList.contains("ics-row-location-select")){const C=_.target,O=C.closest(".ics-row").querySelector(".ics-row-location");C.value&&C.value!=="custom"?O.value=C.value:C.value==="custom"&&(O.value="",O.focus())}});const t=document.getElementById("btn-group-manage");t&&(t.style.display="none"),(v=document.getElementById("btn-toggle-multiselect"))==null||v.addEventListener("click",function(){window.att_multiSelectMode=!window.att_multiSelectMode,window.att_multiSelectMode||window.att_selectedDates.clear(),this.classList.toggle("bg-blue-600",window.att_multiSelectMode),this.classList.toggle("text-white",window.att_multiSelectMode),this.classList.toggle("bg-blue-50",!window.att_multiSelectMode),this.classList.toggle("text-blue-600",!window.att_multiSelectMode),We(),window.att_updateMultiselectBar()}),(x=document.getElementById("btn-cal-filter"))==null||x.addEventListener("click",Ss),(h=document.getElementById("btn-cal-filter-clear"))==null||h.addEventListener("click",ka),(k=document.getElementById("btn-list-filter"))==null||k.addEventListener("click",Ss),(L=document.getElementById("btn-list-filter-clear"))==null||L.addEventListener("click",ka),(w=document.getElementById("btn-close-filter-modal-x"))==null||w.addEventListener("click",ea),(I=document.getElementById("btn-close-filter-modal"))==null||I.addEventListener("click",ea),(E=document.getElementById("btn-apply-filter"))==null||E.addEventListener("click",Qr),($=document.getElementById("btn-filter-clear"))==null||$.addEventListener("click",ka)}function Ls(e){const t=document.getElementById("tab-calendar"),n=document.getElementById("tab-list");e==="calendar"?(document.getElementById("calendar-container").classList.remove("hidden"),document.getElementById("list-container").classList.add("hidden"),t.classList.replace("bg-white","bg-green-600"),t.classList.replace("text-green-600","text-white"),n.classList.replace("bg-green-600","bg-white"),n.classList.replace("text-white","text-green-600")):(document.getElementById("calendar-container").classList.add("hidden"),document.getElementById("list-container").classList.remove("hidden"),n.classList.replace("bg-white","bg-green-600"),n.classList.replace("text-green-600","text-white"),t.classList.replace("bg-green-600","bg-white"),t.classList.replace("text-white","text-green-600"))}async function rn(){F("イベント・出欠データ読み込み中...");try{const{data:e}=await S.from("groups").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});e&&(Ge=e);const{data:t}=await S.from("event_categories").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});t&&t.length>0?je=t:je=[{id:"1",name:"練習"},{id:"2",name:"試合"},{id:"3",name:"イベント"}];const n=new Date,a=new Date(n.getFullYear(),n.getMonth()-6,1),s=new Date(n.getFullYear(),n.getMonth()+7,1),{data:r}=await S.from("events").select("*").gte("start_time",a.toISOString()).lt("start_time",s.toISOString()).order("start_time");r&&(tt=r);const{data:o}=await S.from("app_users").select("email, name, attribute_id, can_use_attendance");o&&(qt=o);const{data:i}=await S.from("user_attributes").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});i&&(Nt=i);try{const{data:c}=await S.from("event_locations").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});c&&(Ft=c)}catch(c){console.warn("event_locations table might not exist yet:",c),Ft=[]}const{data:d}=await S.from("user_groups").select("*");d&&(it=d,j&&(os=d.filter(c=>c.user_email===j.email)));let l=[];if(tt&&tt.length>0){const c=tt.map(m=>m.id),{data:u}=await S.from("attendances").select("*").in("event_id",c);u&&(l=u)}Se=l,j&&(fa=l.filter(c=>c.user_email===j.email));try{const{data:c}=await S.from("master_data").select("data").eq("key","ATTENDANCE_DELEGATIONS").single();c&&c.data&&j&&(Oa=c.data[j.email]||[])}catch{Oa=[]}}catch(e){console.error("Attendance DB Error:",e)}finally{typeof Fe=="function"?Fe():q()}}function Yr(){const e=document.getElementById("filter-group");e&&(e.innerHTML='<option value="">すべてのグループ</option>'+Ge.map(t=>`<option value="${t.id}">${t.name}</option>`).join(""))}function Kr(){const e=document.getElementById("filter-category");if(!e)return;const t=e.value;e.innerHTML='<option value="">すべてのカテゴリ</option>'+je.map(n=>`<option value="${n.name}">${n.name}</option>`).join(""),je.some(n=>n.name===t)&&(e.value=t)}function Ss(){const e=document.getElementById("filter-modal-content");if(!e)return;let t="";t+='<div class="mb-5">',t+='<h4 class="text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">カテゴリ（複数選択）</h4>',je.length===0?t+='<p class="text-xs text-gray-400">カテゴリが登録されていません</p>':(t+='<div class="grid grid-cols-2 gap-2">',je.forEach(a=>{const s=window.att_selectedCategories.has(a.name)?"checked":"";t+=`
                <label class="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition">
                    <input type="checkbox" class="filter-cat-checkbox w-4 h-4 rounded text-green-600 focus:ring-green-500 border-gray-300" value="${a.name}" ${s}>
                    <span class="select-none">${a.name}</span>
                </label>
            `}),t+="</div>"),t+="</div>",t+='<div class="mb-2">',t+='<h4 class="text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">対象グループ（複数選択）</h4>',t+='<div class="grid grid-cols-2 gap-2">';const n=window.att_selectedGroups.has("all")?"checked":"";t+=`
        <label class="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition font-medium">
            <input type="checkbox" class="filter-group-checkbox w-4 h-4 rounded text-green-600 focus:ring-green-500 border-gray-300" value="all" ${n}>
            <span class="select-none font-semibold text-gray-900">全体（全員対象）</span>
        </label>
    `,Ge.length>0&&Ge.forEach(a=>{const s=window.att_selectedGroups.has(a.id)?"checked":"";t+=`
                <label class="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition">
                    <input type="checkbox" class="filter-group-checkbox w-4 h-4 rounded text-green-600 focus:ring-green-500 border-gray-300" value="${a.id}" ${s}>
                    <span class="select-none">${a.name}</span>
                </label>
            `}),t+="</div>",t+="</div>",e.innerHTML=t,document.getElementById("filter-modal").classList.remove("hidden")}function ea(){document.getElementById("filter-modal").classList.add("hidden")}function Qr(){const e=document.querySelectorAll(".filter-cat-checkbox"),t=document.querySelectorAll(".filter-group-checkbox");window.att_selectedCategories.clear(),e.forEach(n=>{n.checked&&window.att_selectedCategories.add(n.value)}),window.att_selectedGroups.clear(),t.forEach(n=>{n.checked&&window.att_selectedGroups.add(n.value)}),er(),We(),Tt(),ea()}function ka(){window.att_selectedCategories.clear(),window.att_selectedGroups.clear(),er(),We(),Tt(),ea()}function er(){const e=window.att_selectedCategories.size+window.att_selectedGroups.size,t=document.getElementById("cal-filter-badge"),n=document.getElementById("btn-cal-filter-clear"),a=document.getElementById("btn-cal-filter"),s=document.getElementById("list-filter-badge"),r=document.getElementById("btn-list-filter-clear"),o=document.getElementById("btn-list-filter");e>0?(t&&(t.textContent=e,t.classList.remove("hidden")),n&&n.classList.remove("hidden"),a&&(a.classList.remove("bg-[#e6e5dd]","hover:bg-[#dcdad2]","text-slate-800"),a.classList.add("bg-green-100","hover:bg-green-200","text-green-800","border-green-300")),s&&(s.textContent=e,s.classList.remove("hidden")),r&&r.classList.remove("hidden"),o&&(o.classList.remove("bg-gray-100","hover:bg-gray-200","text-gray-800"),o.classList.add("bg-green-100","hover:bg-green-200","text-green-800","border-green-300"))):(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),a&&(a.classList.remove("bg-green-100","hover:bg-green-200","text-green-800","border-green-300"),a.classList.add("bg-[#e6e5dd]","hover:bg-[#dcdad2]","text-slate-800")),s&&s.classList.add("hidden"),r&&r.classList.add("hidden"),o&&(o.classList.remove("bg-green-100","hover:bg-green-200","text-green-800","border-green-300"),o.classList.add("bg-gray-100","hover:bg-gray-200","text-gray-800")))}function tr(){return tt.filter(e=>{if(window.att_selectedCategories&&window.att_selectedCategories.size>0&&!window.att_selectedCategories.has(e.category))return!1;if(window.att_selectedGroups&&window.att_selectedGroups.size>0){const t=_n(e);if(t.ids.length===0){if(!window.att_selectedGroups.has("all"))return!1}else if(!t.ids.some(a=>window.att_selectedGroups.has(a)))return!1}return!0})}function We(){const e=Yt.getFullYear(),t=Yt.getMonth();document.getElementById("cal-current-month").textContent=`${e}年${t+1}月`;const n=document.getElementById("calendar-grid");n&&n.classList.remove("gap-1","gap-px","gap-2","p-1","p-2","p-4"),Array.from(n.children).forEach((i,d)=>{d>=7&&n.removeChild(i)});const s=new Date(e,t,1).getDay(),r=new Date(e,t,1-s),o=new Date;for(let i=0;i<42;i++){const d=new Date(r);d.setDate(r.getDate()+i);const l=d.getFullYear(),c=d.getMonth(),u=d.getDate(),m=c===t,g=`${l}-${String(c+1).padStart(2,"0")}-${String(u).padStart(2,"0")}`,b=window.att_multiSelectMode&&window.att_selectedDates.has(g),y=d.getDay(),f=fo(d),p=l===o.getFullYear()&&c===o.getMonth()&&u===o.getDate(),v=document.createElement("div");let x="border-r border-b min-h-[100px] flex flex-col p-0 cursor-pointer";m?f||y===0?x+=" bg-sunday-hatch":y===6?x+=" bg-saturday-hatch":x+=" bg-white":x+=" bg-gray-50 opacity-60",b&&(x="border-2 border-blue-500 min-h-[100px] flex flex-col p-0 bg-blue-50/70 cursor-pointer z-10"),p&&!window.att_multiSelectMode&&(x+=" today-cell-border"),v.className=x,v.onclick=()=>{window.att_multiSelectMode?(window.att_selectedDates.has(g)?window.att_selectedDates.delete(g):window.att_selectedDates.add(g),We(),window.att_updateMultiselectBar()):Mn(g)};const h=document.createElement("div");let k="text-gray-700";m&&(f||y===0?k="text-red-600 font-bold":y===6&&(k="text-blue-600 font-bold")),h.className=`text-right text-[11px] ${k} mb-0 pr-1 pt-1 leading-none`,h.textContent=u,v.appendChild(h);const L=document.createElement("div");L.className="flex-1 overflow-hidden flex flex-col gap-0";const I=tr().filter(_=>_.start_time&&_.start_time.startsWith(g)),E=I.slice(0,5),$=I.length>5;if(E.forEach(_=>{const C=document.createElement("div"),O=fa.find(A=>A.event_id===_.id);let N="",P="text-gray-800";if(_.requires_attendance){const A=O?O.status:"未入力";A==="出席"?(N='<span class="inline-block text-[9px] font-bold text-white bg-blue-600 rounded px-0.5 mr-0.5 leading-none shrink-0 align-middle">出</span>',P="text-blue-700 font-bold"):A==="欠席"?(N='<span class="inline-block text-[9px] font-bold text-white bg-gray-400 rounded px-0.5 mr-0.5 leading-none shrink-0 align-middle">欠</span>',P="text-gray-800 opacity-70"):A==="保留"||A==="未定"?(N='<span class="inline-block text-[9px] font-bold text-white bg-amber-500 rounded px-0.5 mr-0.5 leading-none shrink-0 align-middle">保</span>',P="text-gray-800"):(N='<span class="inline-block text-[9px] font-bold text-white bg-red-500 rounded px-0.5 mr-0.5 leading-none shrink-0 align-middle">未</span>',P="text-red-600 font-bold")}const U=je.find(A=>A.name===_.category),M=(U==null?void 0:U.color)||"#bfdbfe",B=(_.title||"").replace(/[\r\n]+/g," ");C.className=`text-[10px] rounded px-0.5 py-px truncate whitespace-nowrap overflow-hidden text-ellipsis w-full text-left cursor-pointer hover:opacity-80 leading-tight mb-0.5 ${P}`,C.style.backgroundColor=M,C.innerHTML=`${N}${B}`,C.title=_.title,C.onclick=A=>{A.stopPropagation(),window.att_openEventDetail(_.id)},L.appendChild(C)}),$){const _=document.createElement("div");_.className="text-[10px] text-gray-500 text-center mt-[1px] cursor-pointer hover:underline",_.textContent=`他 ${I.length-5} 件`,_.onclick=C=>{C.stopPropagation(),alert(`${g} の予定が多すぎます。リストビューで確認してください。`)},L.appendChild(_)}v.appendChild(L),n.appendChild(v)}}const is=["日","月","火","水","木","金","土"];function Zr(e){const t=new Date(e);if(isNaN(t.getTime()))return e;const n=t.getDate(),a=is[t.getDay()];return`${n}日(${a})`}function Xr(e,t,n){const a=new Date(e);if(isNaN(a.getTime()))return"日時未定";const s=a.getMonth()+1,r=a.getDate(),o=is[a.getDay()],i=`${s}/${r}(${o})`;if(n)return`${i} 終日`;const d=e.substring(11,16);let l="";if(t){const c=new Date(t);isNaN(c.getTime())||(l=` - ${t.substring(11,16)}`)}return`${i}${d}${l}`}function eo(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const n=t.getFullYear(),a=t.getMonth()+1,s=t.getDate(),r=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}/${a}/${s} ${r}:${o}`}function Tt(){const e=tr(),t=document.getElementById("event-list-content");if(e.length===0){t.innerHTML='<p class="text-gray-500 p-4">表示するイベントがありません。</p>';return}const n=[...e].sort((i,d)=>i.start_time?d.start_time?i.start_time.localeCompare(d.start_time):-1:1),a={};n.forEach(i=>{const d=i.start_time?i.start_time.split("T")[0]:"未定";a[d]||(a[d]=[]),a[d].push(i)});const s=new Date,r=`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}-${String(s.getDate()).padStart(2,"0")}`;let o="";Object.keys(a).forEach(i=>{const d=a[i];let l="日時未定",c="";i!=="未定"&&(l=Zr(i),i===r&&(c=`<span class="ml-2 bg-green-600 text-white text-xs px-2.5 py-0.5 rounded-full font-bold shadow-sm">${new Date(i).getDate()}日(今日)</span>`)),o+=`
        <div class="space-y-2 mb-4">
            <div class="flex items-center text-sm font-bold text-gray-700 border-b border-gray-200 pb-1 px-1">
                <span>${l}</span>
                ${c}
            </div>
        `,d.forEach(u=>{const m=_n(u);m.name,m.color;const g=je.find(L=>L.name===u.category),b=(g==null?void 0:g.color)||"#bfdbfe",y=fa.find(L=>L.event_id===u.id);let f=y&&y.status?y.status:"未回答";f==="未定"&&(f="保留");const p=Xr(u.start_time,u.end_time,u.is_all_day);let v="不明";if(u.created_by){const L=qt.find(w=>w.email===u.created_by);v=L&&L.name||u.created_by.split("@")[0]}const x=eo(u.created_at),h=u.created_by?`
                <div class="flex items-center text-gray-400 text-[10px] mt-1 space-x-1">
                    <span class="w-4 h-4 rounded-full bg-green-50 flex items-center justify-center text-[10px] text-green-700 font-bold">👤</span>
                    <span>${v} ${x}</span>
                </div>
            `:"";let k="";if(u.requires_attendance){const L=u.attendance_deadline?new Date>new Date(u.attendance_deadline):!1;let w="bg-gray-100 text-gray-600",I="";if(L)I="回答期限切れ",w="bg-gray-200 text-gray-500";else if(u.attendance_deadline){const _=new Date(u.attendance_deadline),C=_.getMonth()+1,O=_.getDate(),N=String(_.getHours()).padStart(2,"0"),P=String(_.getMinutes()).padStart(2,"0");I=`回答期限: ${C}/${O} ${N}:${P}`}const E=I?`<span class="text-[10px] px-1.5 py-0.5 rounded ${w} font-semibold">${I}</span>`:"";let $="";f==="出席"?$='<div class="flex items-center justify-center w-5 h-5 bg-green-600 text-white rounded-full text-[10px] font-bold shadow-sm" title="出席">O</div>':f==="欠席"?$='<div class="flex items-center justify-center w-5 h-5 bg-black text-white rounded text-[10px] font-bold shadow-sm" title="欠席">X</div>':f==="保留"?$='<div class="flex items-center justify-center w-5 h-5 bg-yellow-600 text-white rounded-full text-[10px] font-bold shadow-sm" title="保留">-</div>':$='<div class="flex items-center justify-center w-5 h-5 bg-red-600 text-white rounded-full text-[10px] font-bold shadow-sm animate-pulse" title="未回答">?</div>',k=`
                    <div class="flex items-center space-x-2 shrink-0">
                        ${E}
                        ${$}
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
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold" style="background-color: ${b}; color: #1f2937">${u.category||"イベント"}</span>
                    ${Zs(m)}
                    <span class="flex items-center space-x-1">
                        <span>🕒</span>
                        <span>${p}</span>
                    </span>
                    <span class="flex items-center space-x-0.5">
                        <span>📍</span>
                        <span>${ar(u.location)}</span>
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
            `}),o+="</div>"}),t.innerHTML=o}function Mn(e="",t=null,n=!1,a=null){let s="";t&&(s=t.title.replace(/"/g,"&quot;"),n||(s+=" (コピー)"));const r=!t&&!n;a&&a.length>0?ue=[...a]:t?ue=[t.start_time.split("T")[0]]:e?ue=[e]:ue=[new Date().toISOString().split("T")[0]],window.att_modalSelectedDates=ue,window.att_isEditingModal=n;const o=t&&t.start_time&&!t.is_all_day?t.start_time.split("T")[1].substring(0,5):r?"12:30":"",i=t&&t.end_time&&!t.is_all_day?t.end_time.split("T")[1].substring(0,5):r?"17:00":"",d=t?t.is_all_day:!1,l=t?t.category:"",c=t?(t.location||"").replace(/"/g,"&quot;"):"",u=t?(t.description||"").replace(/</g,"&lt;").replace(/>/g,"&gt;"):"",m=t?t.requires_attendance:!0,g=t?t.require_detailed_attendance:!1,b=o?o.split(":")[0]:"",y=o?o.split(":")[1]:"",f=i?i.split(":")[0]:"",p=i?i.split(":")[1]:"",v=!c||!Ft.some(T=>(T.url?`${T.name} ${T.url}`:T.name)===c);let x="",h="";if(c){const T=c.match(/(https?:\/\/[^\s\<\>\"]+)/);T?(h=T[0],x=c.replace(h,"").trim()):x=c}const k=!!(t&&t.attendance_deadline&&t.attendance_deadline!==It(t.start_time.split("T")[0])),L=It(ue[0])?It(ue[0]).split("T")[0]:"",w=t&&t.attendance_deadline?t.attendance_deadline.split("T")[0]:L,I=t&&t.attendance_deadline?t.attendance_deadline.split("T")[1].substring(0,5):"12:00",E=I?I.split(":")[0]:"12",$=I?I.split(":")[1]:"00",_=T=>'<option value="">--</option>'+Array.from({length:24},(D,G)=>String(G).padStart(2,"0")).map(D=>`<option value="${D}" ${D===T?"selected":""}>${D}</option>`).join(""),C=T=>'<option value="">--</option>'+Array.from({length:60},(D,G)=>String(G).padStart(2,"0")).map(D=>`<option value="${D}" ${D===T?"selected":""}>${D}</option>`).join(""),O=t?t.target_group_ids&&t.target_group_ids.length>0?t.target_group_ids:t.target_group_id?[t.target_group_id]:[]:[],N=n?"イベントを編集":t?"イベントを複製":"新規イベント登録",P=`
        <div class="border p-2 rounded max-h-32 overflow-y-auto space-y-1 bg-white">
            <label class="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" id="ev-group-all" value="all" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" ${O.length===0?"checked":""}>
                <span class="text-xs font-medium">全体</span>
            </label>
            ${Ge.map(T=>`
                <label class="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" name="ev-group-cb" value="${T.id}" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" ${O.includes(T.id)?"checked":""}>
                    <span class="text-xs">${T.name}</span>
                </label>
            `).join("")}
        </div>
    `;let U="";n?U=`
            <div>
                <label class="text-xs font-bold text-gray-600">日付*</label>
                <div id="ev-dates-container" class="mt-1">
                    <input type="date" value="${ue[0]}" class="w-full border p-1.5 rounded text-xs px-1" onchange="window.att_onSingleDateChange(this.value)">
                </div>
            </div>
        `:U=`
            <div>
                <label class="text-xs font-bold text-gray-600">日付*</label>
                <div id="ev-dates-container" class="space-y-1.5 max-h-32 overflow-y-auto border p-2 rounded bg-gray-50 mt-1">
                    <!-- Rendered by renderDateRows() -->
                </div>
                <button type="button" onclick="window.att_addDateRow()" class="mt-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded text-xs font-bold flex items-center space-x-1 transition shadow-sm border border-gray-200">
                    <span>＋ 日付を追加</span>
                </button>
            </div>
        `;const M=`
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
        <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col text-sm text-gray-800">
            <h3 class="text-lg font-bold mb-3 shrink-0">${N}</h3>
            <div class="space-y-3 overflow-y-auto pr-1 flex-1">
                <div>
                    <label class="text-xs font-bold text-gray-600">イベント名*</label>
                    <input type="text" id="ev-title" value="${s}" placeholder="イベント名" class="w-full border p-1.5 rounded text-xs">
                </div>
                
                <!-- Date input block -->
                ${U}
                
                <!-- Time and AllDay Row -->
                <div class="flex space-x-4 items-end">
                    <div id="ev-time-container" class="flex-1 ${d?"opacity-50":""}">
                        <label class="text-xs font-bold text-gray-600">開始時間</label>
                        <div class="flex items-center space-x-1 mt-1">
                            <select id="ev-time-h" class="w-full border py-1.5 px-1.5 rounded text-xs bg-white" ${d?"disabled":""}>${_(b)}</select>
                            <span class="font-bold text-gray-500">:</span>
                            <select id="ev-time-m" class="w-full border py-1.5 px-1.5 rounded text-xs bg-white" ${d?"disabled":""}>${C(y)}</select>
                        </div>
                    </div>
                    <div id="ev-end-time-container" class="flex-1 ${d?"opacity-50":""}">
                        <label class="text-xs font-bold text-gray-600">終了時間</label>
                        <div class="flex items-center space-x-1 mt-1">
                            <select id="ev-end-time-h" class="w-full border py-1.5 px-1.5 rounded text-xs bg-white" ${d?"disabled":""}>${_(f)}</select>
                            <span class="font-bold text-gray-500">:</span>
                            <select id="ev-end-time-m" class="w-full border py-1.5 px-1.5 rounded text-xs bg-white" ${d?"disabled":""}>${C(p)}</select>
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
                            <option value="none" ${m?"":"selected"}>なし</option>
                            <option value="simple" ${m&&!g?"selected":""}>簡易</option>
                            <option value="detailed" ${m&&g?"selected":""}>詳細 (車・同伴者)</option>
                        </select>
                    </div>
                    
                    <div class="w-1/2" id="ev-deadline-container" style="display: ${m?"block":"none"}">
                        <div class="flex items-center justify-between mb-0.5">
                            <label class="text-xs font-bold text-gray-600">回答期限</label>
                            <div class="flex items-center space-x-1">
                                <input type="checkbox" id="ev-deadline-custom-cb" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer" ${k?"checked":""} onchange="window.att_toggleDeadlineCustom(this.checked)">
                                <label for="ev-deadline-custom-cb" class="text-[11px] font-bold text-gray-500 cursor-pointer select-none">個別指定</label>
                            </div>
                        </div>
                        
                        <!-- Custom Deadline Inputs -->
                        <div id="ev-deadline-custom-inputs" class="flex items-center space-x-0.5 ${k?"":"hidden"}">
                            <input type="date" id="ev-deadline-date" value="${w}" class="w-[50%] border p-1.5 rounded text-xs px-1" onchange="this.blur()">
                            <select id="ev-deadline-time-h" class="w-[25%] border py-1.5 px-1 rounded text-xs bg-white">${_(E)}</select>
                            <span class="font-bold text-gray-500">:</span>
                            <select id="ev-deadline-time-m" class="w-[25%] border py-1.5 px-1 rounded text-xs bg-white">${C($)}</select>
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
                            ${je.map(T=>`<option value="${T.name}" ${T.name===l?"selected":""}>${T.name}</option>`).join("")}
                        </select>
                    </div>
                    <div class="w-1/2 flex flex-col">
                        <label class="text-xs font-bold text-gray-600 mb-1">対象グループ</label>
                        ${P}
                    </div>
                </div>
                
                <!-- Place selection using Master Data -->
                <div class="flex flex-col space-y-1.5">
                    <label class="text-xs font-bold text-gray-600">場所</label>
                    <select id="ev-location-select" class="w-full border p-1.5 rounded text-xs font-medium bg-white" onchange="window.att_onLocationSelectChange(this.value)">
                        <option value="custom">-- 直接入力 / 新規マスタ追加 --</option>
                        ${Ft.map(T=>{const D=T.url?`${T.name} ${T.url}`:T.name;return`<option value="${D}" ${c===D?"selected":""}>${T.name}${T.url?" (URLあり)":""}</option>`}).join("")}
                    </select>
                    
                    <!-- Direct Input & Inline Master Register container -->
                    <div id="ev-location-custom-container" class="border p-2.5 rounded bg-gray-50 space-y-2 mt-1 ${v?"":"hidden"}">
                        <div class="flex space-x-2">
                            <div class="flex-1">
                                <label class="text-[10px] font-bold text-gray-500">場所名</label>
                                <input type="text" id="ev-location-custom-name" value="${x}" placeholder="例: 〇〇グラウンド" class="w-full border p-1 rounded text-xs bg-white">
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
                    <textarea id="ev-description" placeholder="説明" class="w-full border p-1.5 rounded text-xs" rows="3">${u}</textarea>
                </div>
            </div>
            <div class="flex justify-end space-x-3 mt-4 pt-4 border-t shrink-0">
                <button onclick="window.att_closeModal()" class="bg-gray-300 hover:bg-gray-400 px-4 py-1.5 rounded font-bold text-xs">キャンセル</button>
                <button onclick="window.att_saveEvent(${n?`'${t.id}'`:"null"})" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded font-bold text-xs shadow">${n?"更新":"保存"}</button>
            </div>
        </div>
    </div>`;document.getElementById("attendance-modals").innerHTML=M,jt(),n||On();const B=document.getElementById("ev-group-all"),A=document.querySelectorAll('input[name="ev-group-cb"]');B.addEventListener("change",function(){this.checked&&A.forEach(T=>T.checked=!1)}),A.forEach(T=>{T.addEventListener("change",function(){this.checked&&(B.checked=!1)})})}async function to(e=null){var C,O,N,P,U,M;const t=document.getElementById("ev-title").value.trim(),n=document.querySelectorAll('#ev-dates-container input[type="date"]'),a=Array.from(n).map(B=>B.value).filter(Boolean);if(!t)return alert("イベント名は必須です");if(a.length===0)return alert("日付を1つ以上指定してください");const s=document.getElementById("ev-time-h").value,r=document.getElementById("ev-time-m").value;let o="";(s||r)&&(o=`${s||"00"}:${r||"00"}`);const i=document.getElementById("ev-end-time-h").value,d=document.getElementById("ev-end-time-m").value;let l="";(i||d)&&(l=`${i||"00"}:${d||"00"}`);const c=document.getElementById("ev-all-day").checked,u=document.getElementById("ev-category").value,m=document.getElementById("ev-description").value,g=document.getElementById("ev-location-select");let b="";if(g)if(g.value==="custom"){const B=((C=document.getElementById("ev-location-custom-name"))==null?void 0:C.value.trim())||"",A=((O=document.getElementById("ev-location-custom-url"))==null?void 0:O.value.trim())||"";b=A?`${B} ${A}`:B}else b=g.value;const y=document.getElementById("ev-attendance-type").value,f=y!=="none",p=y==="detailed",v=((N=document.getElementById("ev-deadline-custom-cb"))==null?void 0:N.checked)||!1,x=(P=document.getElementById("ev-deadline-date"))==null?void 0:P.value,h=(U=document.getElementById("ev-deadline-time-h"))==null?void 0:U.value,k=(M=document.getElementById("ev-deadline-time-m"))==null?void 0:M.value,L=document.getElementById("ev-group-all").checked;let w=[];L||document.querySelectorAll('input[name="ev-group-cb"]:checked').forEach(B=>w.push(B.value));const I=w.length>0?w[0]:null,E=B=>new Promise(A=>setTimeout(A,B)),$=3;let _=0;for(;_<$;){_++,_>1?(F(`通信リトライ中 (${_-1}/${$-1}回目)...`),await E(1500)):F("イベント保存中...");try{if(e){const B=a[0],A=`${B}T${o||"00:00"}:00`;let T=null;l&&(T=`${B}T${l}:00`);let D=null;f&&(v?x&&h&&k&&(D=`${x}T${h}:${k}:00`):D=It(B));const G={title:t,category:u,description:m,location:b,start_time:A,end_time:T,is_all_day:c,requires_attendance:f,require_detailed_attendance:p,attendance_deadline:D,target_group_id:I,target_group_ids:w.length>0?w:null},{error:H}=await S.from("events").update(G).eq("id",e);if(H)throw H;await ae("UPDATE_EVENT",`イベント「${t}」を更新しました`)}else{const B=a.map(T=>{const D=`${T}T${o||"00:00"}:00`;let G=null;l&&(G=`${T}T${l}:00`);let H=null;return f&&(v?x&&h&&k&&(H=`${x}T${h}:${k}:00`):H=It(T)),{title:t,category:u,description:m,location:b,start_time:D,end_time:G,is_all_day:c,requires_attendance:f,require_detailed_attendance:p,attendance_deadline:H,target_group_id:I,target_group_ids:w.length>0?w:null,created_by:j==null?void 0:j.email}}),{error:A}=await S.from("events").insert(B);if(A)throw A;await ae("CREATE_EVENT",`イベント「${t}」を${B.length}件作成しました`)}await rn(),We(),document.getElementById("list-container").classList.contains("hidden")||Tt(),!e&&typeof window.att_clearDateSelection=="function"&&window.att_clearDateSelection(),window.att_closeModal();break}catch(B){console.error(`Save Event Attempt ${_} Error:`,B);const A=B.message==="Load failed"||B.message==="Failed to fetch"||!B.code;if(_<$&&A)continue;{let T=B.message||String(B);B.details&&(T+=`
Details: `+B.details),B.hint&&(T+=`
Hint: `+B.hint),B.code&&(T+=`
Code: `+B.code),alert("保存エラー: "+T+`
（ネットワーク接続をご確認のうえ、再度お試しください）`);break}}}q()}async function no(e){if(confirm("このイベントを削除しますか？")){F("イベント削除中...");try{await S.from("events").delete().eq("id",e),await ae("DELETE_EVENT",`イベント(ID:${e})を削除しました`),await rn(),We(),Tt(),window.att_closeModal()}catch(t){console.error(t)}finally{q()}}}function nr(e,t,n=!1){const a=t.ids.length===0||os.some(l=>t.ids.includes(l.group_id)),s=qt.find(l=>l.email===j.email),r=s?s.can_use_attendance!==!1:!0,o=[];r&&o.push({email:j.email,name:"自分 ( "+((j==null?void 0:j.name)||j.email.split("@")[0])+" )",canAttend:a}),Oa.forEach(l=>{const c=qt.find(u=>u.email===l);if(c&&c.can_use_attendance!==!1){const u=t.ids.length===0||it.some(m=>t.ids.includes(m.group_id)&&m.user_email===l);o.push({email:l,name:c.name||l.split("@")[0],canAttend:u})}});let i=!1;return{formsHtml:o.map((l,c)=>{if(!l.canAttend)return`<div class="p-3 bg-gray-50 border rounded mb-2">
                <h4 class="font-bold text-gray-700 mb-1">${l.name}</h4>
                <p class="text-xs text-red-500">※対象グループに所属していないため入力できません</p>
            </div>`;i=!0;const u=Se.find(y=>y.event_id===e.id&&y.user_email===l.email)||{};let m=u.status||"未回答";m==="未定"&&(m="保留");let g="否",b=u.comment||"";return b.startsWith("[荷物車:可]")?(g="可",b=b.substring(8)):b.startsWith("[荷物車:否]")&&(g="否",b=b.substring(8)),`
        <div class="p-3 bg-blue-50 border border-blue-100 rounded mb-3" data-target-email="${l.email}">
            <h4 class="font-bold text-blue-800 mb-2 border-b border-blue-200 pb-1">${l.name}</h4>
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">ステータス*</label>
                <select id="att-status-${c}" class="w-full border p-1.5 rounded text-sm font-bold" ${n?"disabled":""}>
                    <option value="未回答" ${m==="未回答"?"selected":""}>未回答</option>
                    <option value="出席" ${m==="出席"?"selected":""}>出席</option>
                    <option value="欠席" ${m==="欠席"?"selected":""}>欠席</option>
                    <option value="保留" ${m==="保留"?"selected":""}>保留</option>
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
                            <option value="否" ${g==="否"?"selected":""}>否</option>
                            <option value="可" ${g==="可"?"selected":""}>可</option>
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
                <textarea id="att-comment-${c}" class="w-full border p-1.5 rounded text-sm" rows="1">${b}</textarea>
            </div>
        </div>`}).join(""),hasAnyForm:i}}window.att_openEventDetail=window.openEventDetailModal=function(e,t="basic"){const n=tt.find(M=>M.id===e);if(!n)return;const a=_n(n);a.name,a.color;const s=je.find(M=>M.name===n.category),r=(s==null?void 0:s.color)||"#bfdbfe";let o="日時未定";n.is_all_day&&n.start_time?o=n.start_time.substring(0,10)+" (終日)":n.start_time&&(o=n.start_time.substring(0,16).replace("T"," "),n.end_time&&(o+=" 〜 "+n.end_time.substring(11,16)));const i=fa.find(M=>M.event_id===n.id)||{};let d=i&&i.status?i.status:"未回答";d==="未定"&&(d="保留");const l=n.attendance_deadline?new Date>new Date(n.attendance_deadline):!1;let c=n.attendance_deadline?n.attendance_deadline.replace("T"," ").substring(0,16):"設定なし";a.ids.length===0||os.some(M=>a.ids.includes(M.group_id));let u=[];if(a.ids.length===0)u=qt.filter(M=>M.can_use_attendance!==!1);else{const M=it.filter(T=>a.ids.includes(T.group_id)).map(T=>T.user_email),A=Se.filter(T=>T.event_id===n.id).map(T=>T.user_email);u=qt.filter(T=>T.can_use_attendance!==!1&&(M.includes(T.email)||A.includes(T.email)))}window.att_statusViewType||(window.att_statusViewType="group"),window.att_statusFilter||(window.att_statusFilter="all");const m=window.att_statusViewType==="group";let g=0,b=0,y=0;u.forEach(M=>{const B=Se.find(A=>A.event_id===n.id&&A.user_email===M.email);B&&B.status==="出席"?g++:B&&B.status==="欠席"?b++:y++});const f=[];m?Ge.forEach(M=>{const B=it.filter(W=>W.group_id===M.id).map(W=>W.user_email),A=u.filter(W=>B.includes(W.email));let T=0,D=0,G=0,H=!1;A.forEach(W=>{const R=Se.find(z=>z.event_id===n.id&&z.user_email===W.email);R&&R.status&&R.status!=="未回答"?(H=!0,R.status==="出席"?T++:R.status==="欠席"?D++:G++):G++}),H&&f.push({name:M.name,attending:T,absent:D,pending:G})}):Nt.forEach(M=>{const B=u.filter(H=>H.attribute_id===M.id);let A=0,T=0,D=0,G=!1;B.forEach(H=>{const W=Se.find(R=>R.event_id===n.id&&R.user_email===H.email);W&&W.status&&W.status!=="未回答"?(G=!0,W.status==="出席"?A++:W.status==="欠席"?T++:D++):D++}),G&&f.push({name:M.name,attending:A,absent:T,pending:D})});const p=`
        <div class="flex items-center space-x-1 mb-4 p-1 bg-gray-100/80 rounded-lg w-fit shrink-0">
            <button onclick="window.att_setStatusViewType('${n.id}', 'group')" class="px-4 py-1.5 rounded-md text-xs font-bold transition shadow-sm ${m?"bg-green-600 text-white":"text-gray-600 hover:text-gray-900"}">📂 グループ別</button>
            <button onclick="window.att_setStatusViewType('${n.id}', 'attribute')" class="px-4 py-1.5 rounded-md text-xs font-bold transition shadow-sm ${m?"text-gray-600 hover:text-gray-900":"bg-green-600 text-white"}">👥 属性別</button>
        </div>
    `,v=m?"※出欠の入力があるグループのみ表示しています。":"※出欠の入力がある属性のみ表示しています。";let x=`
        <tr class="bg-gray-50/50 font-bold border-b border-gray-200">
            <td class="px-4 py-2.5 text-gray-800">全体</td>
            <td class="px-4 py-2.5 text-center text-green-600 font-extrabold">${g}</td>
            <td class="px-4 py-2.5 text-center text-red-500 font-extrabold">${b}</td>
            <td class="px-4 py-2.5 text-center text-gray-600">${y}</td>
        </tr>
    `;f.length===0?x+=`
            <tr>
                <td colspan="4" class="px-4 py-6 text-center text-gray-400 text-xs">出欠の入力がある${m?"グループ":"属性"}はありません。</td>
            </tr>
        `:x+=f.map(M=>`
            <tr class="border-b border-gray-100 hover:bg-gray-50/30 transition">
                <td class="px-4 py-2.5 text-gray-700 font-semibold text-xs">${M.name}</td>
                <td class="px-4 py-2.5 text-center text-green-600 font-bold text-xs">${M.attending}</td>
                <td class="px-4 py-2.5 text-center text-red-500 font-bold text-xs">${M.absent}</td>
                <td class="px-4 py-2.5 text-center text-gray-500 text-xs">${M.pending}</td>
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
                    ${x}
                </tbody>
            </table>
        </div>
        <p class="text-[10px] text-gray-400 font-semibold mb-4">${v}</p>
    `,k=u.filter(M=>{const B=Se.find(T=>T.event_id===n.id&&T.user_email===M.email),A=(B==null?void 0:B.status)||"未回答";return window.att_statusFilter==="all"?!0:window.att_statusFilter==="answered"?A==="出席"||A==="欠席"||A==="保留"||A==="未定":window.att_statusFilter==="attending"?A==="出席":window.att_statusFilter==="absent"?A==="欠席":window.att_statusFilter==="pending"?A==="保留"||A==="未定":window.att_statusFilter==="unanswered"?A==="未回答"||!A:!0});window.att_statusSortKey||(window.att_statusSortKey="default"),window.att_statusSortOrder||(window.att_statusSortOrder="asc");const L=window.att_statusSortKey,w=window.att_statusSortOrder;L!=="default"&&k.sort((M,B)=>{var D,G;let A,T;if(L==="name")A=M.name||M.email.split("@")[0],T=B.name||B.email.split("@")[0];else if(L==="group")if(m){const H=it.filter(R=>R.user_email===M.email).map(R=>R.group_id);A=Ge.filter(R=>H.includes(R.id)).map(R=>R.name).join(", ")||"-";const W=it.filter(R=>R.user_email===B.email).map(R=>R.group_id);T=Ge.filter(R=>W.includes(R.id)).map(R=>R.name).join(", ")||"-"}else A=((D=Nt.find(H=>H.id===M.attribute_id))==null?void 0:D.name)||"-",T=((G=Nt.find(H=>H.id===B.attribute_id))==null?void 0:G.name)||"-";else if(L==="status"){const H=W=>{const R=Se.find(J=>J.event_id===n.id&&J.user_email===W.email),z=(R==null?void 0:R.status)||"未回答";return z==="出席"?1:z==="保留"||z==="未定"?2:z==="未回答"?3:z==="欠席"?4:5};A=H(M),T=H(B)}else if(L==="comment"){const H=W=>{const R=Se.find(ne=>ne.event_id===n.id&&ne.user_email===W.email);if(!R||!R.status||R.status==="未回答")return"";let z=R.comment||"",J="否";z.startsWith("[荷物車:可]")?(J="可",z=z.substring(8)):z.startsWith("[荷物車:否]")&&(J="否",z=z.substring(8));let ye=[];return n.require_detailed_attendance&&(R.accompanying_persons&&ye.push(`同伴: ${R.accompanying_persons}`),R.car_capacity&&R.car_capacity>0&&(ye.push(`車出: 可[${R.car_capacity}人]`),ye.push(`荷物車: ${J}`))),z.trim()&&ye.push(`メモ: ${z.trim()}`),ye.join(", ")};A=H(M),T=H(B)}else if(L==="updated_at"){const H=Se.find(R=>R.event_id===n.id&&R.user_email===M.email),W=Se.find(R=>R.event_id===n.id&&R.user_email===B.email);A=H?new Date(H.updated_at).getTime():0,T=W?new Date(W.updated_at).getTime():0}return A<T?w==="asc"?-1:1:A>T?w==="asc"?1:-1:0});const E=[{type:"all",label:"すべて"},{type:"answered",label:"回答済"},{type:"attending",label:"出席"},{type:"absent",label:"欠席"},{type:"pending",label:"保留"},{type:"unanswered",label:"未回答"}].map(M=>{const B=window.att_statusFilter===M.type;return`<button onclick="window.att_setStatusFilter('${n.id}', '${M.type}')" class="px-2.5 py-1 rounded-full text-xs font-bold transition ${B?"bg-blue-600 text-white shadow-sm":"bg-gray-100 text-gray-600 hover:bg-gray-200"}">${M.label}</button>`}).join(" ");let $="";k.length===0?$=`
            <tr>
                <td colspan="5" class="px-4 py-6 text-center text-gray-400 text-xs">該当するメンバーはいません。</td>
            </tr>
        `:$=k.map(M=>{var ye;const B=M.name||M.email.split("@")[0];let A="-";if(m){const ne=it.filter(de=>de.user_email===M.email).map(de=>de.group_id);A=Ge.filter(de=>ne.includes(de.id)).map(de=>de.name).join(", ")||"-"}else A=((ye=Nt.find(ne=>ne.id===M.attribute_id))==null?void 0:ye.name)||"-";const T=Se.find(ne=>ne.event_id===n.id&&ne.user_email===M.email);let D=(T==null?void 0:T.status)||"未回答";D==="未定"&&(D="保留");let G="";D==="出席"?G='<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-green-100 text-green-800 border border-green-200">🟢 参加</span>':D==="欠席"?G='<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-red-100 text-red-800 border border-red-200">❌ 不参加</span>':D==="保留"?G='<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-yellow-100 text-yellow-800 border border-yellow-200">❓ 未定/その他</span>':G='<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-gray-100 text-gray-500 border border-gray-200">❓ 未定/その他</span>';let H=(T==null?void 0:T.comment)||"",W="否";H.startsWith("[荷物車:可]")?(W="可",H=H.substring(8)):H.startsWith("[荷物車:否]")&&(W="否",H=H.substring(8));let R=[];T&&T.status&&T.status!=="未回答"&&(n.require_detailed_attendance&&(T.accompanying_persons&&R.push(`同伴: ${T.accompanying_persons}`),T.car_capacity&&T.car_capacity>0&&(R.push(`車出: 可[${T.car_capacity}人]`),R.push(`荷物車: ${W}`))),H.trim()&&R.push(`メモ: ${H.trim()}`));const z=R.length>0?R.join(", "):"-",J=T?Xs(T.updated_at):"-";return`
                <tr class="hover:bg-gray-50/50 border-b border-gray-100 transition">
                    <td class="px-4 py-2 font-bold text-gray-800 text-[11px]">${B}</td>
                    <td class="px-4 py-2 text-gray-500 text-[11px] font-semibold">${A}</td>
                    <td class="px-4 py-2">${G}</td>
                    <td class="px-4 py-2 text-gray-600 text-[11px] max-w-[180px] truncate" title="${z}">${z}</td>
                    <td class="px-4 py-2 text-gray-400 text-[11px] font-semibold">${J}</td>
                </tr>
            `}).join("");const _=M=>L!==M?'<span class="text-gray-300 ml-1">⇅</span>':w==="asc"?'<span class="text-blue-600 ml-1">▲</span>':'<span class="text-blue-600 ml-1">▼</span>',C=`
        <div class="mt-4 border-t pt-4">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                <h4 class="font-bold text-gray-700 text-xs shrink-0">参加者リスト</h4>
                <div class="flex flex-wrap items-center gap-2">
                    <div class="flex items-center space-x-1">
                        ${E}
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
                            <th onclick="window.att_toggleSort('${n.id}', 'group')" class="px-4 py-2 font-bold text-gray-600 text-left text-xs cursor-pointer hover:bg-gray-100 transition">${m?"グループ":"属性"} ${_("group")}</th>
                            <th onclick="window.att_toggleSort('${n.id}', 'status')" class="px-4 py-2 font-bold text-gray-600 text-left text-xs cursor-pointer hover:bg-gray-100 transition">出欠 ${_("status")}</th>
                            <th onclick="window.att_toggleSort('${n.id}', 'comment')" class="px-4 py-2 font-bold text-gray-600 text-left text-xs cursor-pointer hover:bg-gray-100 transition">出欠メモ ${_("comment")}</th>
                            <th onclick="window.att_toggleSort('${n.id}', 'updated_at')" class="px-4 py-2 font-bold text-gray-600 text-left text-xs cursor-pointer hover:bg-gray-100 transition">更新日時 ${_("updated_at")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${$}
                    </tbody>
                </table>
            </div>
        </div>
    `,O=t==="basic"?"border-b-2 border-blue-500 text-blue-600 font-bold":"text-gray-500 hover:text-gray-700",N=t==="attendance"?"border-b-2 border-blue-500 text-blue-600 font-bold":"text-gray-500 hover:text-gray-700",P=t==="status"?"border-b-2 border-blue-500 text-blue-600 font-bold":"text-gray-500 hover:text-gray-700",U=`
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
                <button onclick="window.att_openEventDetail('${n.id}', 'basic')" class="flex-1 py-2 text-sm font-medium ${O}">基本情報</button>
                ${n.requires_attendance?`
                    <button onclick="window.att_openEventDetail('${n.id}', 'attendance')" class="flex-1 py-2 text-sm font-medium ${N}">出欠登録</button>
                    <button onclick="window.att_openEventDetail('${n.id}', 'status')" class="flex-1 py-2 text-sm font-medium ${P}">出欠状況</button>
                `:""}
            </div>

            <div class="p-4 overflow-y-auto">
                ${t==="basic"?`
                    <div class="text-sm text-gray-600 mb-4 space-y-1">
                        <p><strong>日時:</strong> ${o}</p>
                        <p><strong>場所:</strong> ${ar(n.location)}</p>
                        <p class="flex items-center gap-1 mt-1"><strong>カテゴリ:</strong> <span class="px-2 py-0.5 rounded text-xs text-gray-800 shadow-sm" style="background-color: ${r}">${n.category||"未設定"}</span></p>
                        <p class="flex items-center gap-1 mt-1"><strong>対象:</strong> ${Zs(a)}</p>
                        <p class="mt-2 whitespace-pre-wrap border p-2 bg-gray-50 rounded min-h-[60px] text-gray-800">${n.description||"説明なし"}</p>
                    </div>
                `:t==="attendance"?`
                    <div class="space-y-4">
                        <div class="text-sm border-b pb-2 mb-2">
                            現在のステータス: <span class="font-bold ${d==="出席"?"text-green-600":d==="欠席"?"text-red-500":"text-gray-800"}">${d}</span>
                            <br><span class="text-xs text-gray-500">回答期限: ${c}</span>
                            ${l?'<span class="ml-2 text-red-500 font-bold text-xs bg-red-100 px-2 py-0.5 rounded shadow-sm">期限切れ</span>':""}
                        </div>
                        ${(()=>{const{formsHtml:M,hasAnyForm:B}=nr(n,a,l);return M+(B?`
                                <div class="mt-4 text-right">
                                    <button onclick="window.att_saveAttendance('${n.id}')" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-bold shadow">出欠を一括保存</button>
                                </div>
                            `:"")})()}
                    </div>
                `:`
                    <div class="space-y-4">
                        ${p}
                        ${h}
                        ${C}
                    </div>
                `}
            </div>
        </div>
    </div>`;document.getElementById("attendance-modals").innerHTML=U};function ao(e){const t=tt.find(i=>i.id===e);if(!t)return;const n=_n(t),a=t.attendance_deadline?new Date>new Date(t.attendance_deadline):!1,{formsHtml:s,hasAnyForm:r}=nr(t,n,a),o=`
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
    </div>`;document.getElementById("attendance-modals").innerHTML=o}async function so(e){const t=document.querySelectorAll("[data-target-email]");if(t.length===0)return window.att_closeModal();const n=tt.find(s=>s.id===e);if(!n)return;const a=[];t.forEach(s=>{const r=s.getAttribute("data-target-email"),o=s.querySelector('select[id^="att-status-"]');if(o){const i=s.querySelector('input[id^="att-acc-"]'),d=s.querySelector('select[id^="att-car-flag-"]'),l=s.querySelector('input[id^="att-car-cap-"]'),c=s.querySelector('select[id^="att-luggage-flag-"]'),u=s.querySelector('textarea[id^="att-comment-"]'),m=d?d.value:"否",g=m==="可"&&l&&parseInt(l.value)||0;let b=u?u.value.trim():"";n.require_detailed_attendance&&m==="可"&&(b=`[荷物車:${c?c.value:"否"}]`+b),a.push({event_id:e,user_email:r,status:o.value,accompanying_persons:i?i.value:"",car_capacity:g,separate_action:null,comment:b,updated_at:new Date().toISOString()})}}),F("出欠保存中...");try{const{error:s}=await S.from("attendances").upsert(a,{onConflict:"event_id, user_email"});if(s)throw s;await ae("UPDATE_ATTENDANCE",`イベント(ID:${e})の出欠を ${a.length}件更新しました`),await rn(),We(),Tt(),window.att_openEventDetail(e,"status")}catch(s){console.error("Save Attendance Error:",s),s.message==="Load failed"||s.message==="Failed to fetch"?alert("出欠登録エラー: 通信に失敗しました。ネットワーク接続やデータベースの状態を確認してください。"):alert("出欠登録エラー: "+s.message)}finally{q()}}function ro(){const t=[["タイトル","日付","開始時刻","終了時刻","終日","カテゴリ","対象グループ","場所","出欠管理","詳細出欠","説明","回答期限"].join(",")];tt.forEach(o=>{const i=o.start_time?o.start_time.split("T")[0]:"",d=o.start_time&&!o.is_all_day?o.start_time.split("T")[1].substring(0,5):"",l=o.end_time&&!o.is_all_day?o.end_time.split("T")[1].substring(0,5):"",u=_n(o).name,m=g=>g==null?'""':`"${String(g).replace(/"/g,'""')}"`;t.push([m(o.title),m(i),m(d),m(l),o.is_all_day?"TRUE":"FALSE",m(o.category),m(u),m(o.location),o.requires_attendance?"TRUE":"FALSE",o.require_detailed_attendance?"TRUE":"FALSE",m(o.description),m(o.attendance_deadline)].join(","))});const n=new Uint8Array([239,187,191]),a=new Blob([n,t.join(`
`)],{type:"text/csv;charset=utf-8;"}),s=URL.createObjectURL(a),r=document.createElement("a");r.href=s,r.download=`events_${new Date().toISOString().split("T")[0]}.csv`,r.click(),URL.revokeObjectURL(s)}function oo(e){const t=[];let n=[],a="",s=!1;for(let r=0;r<e.length;r++){const o=e[r];s?o==='"'?r+1<e.length&&e[r+1]==='"'?(a+='"',r++):s=!1:a+=o:o==='"'?s=!0:o===","?(n.push(a),a=""):o===`
`||o==="\r"?(n.push(a),t.push(n),n=[],a="",o==="\r"&&r+1<e.length&&e[r+1]===`
`&&r++):a+=o}return(a||n.length>0)&&(n.push(a),t.push(n)),t}window.att_importCsv=async function(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=async a=>{const s=a.target.result,r=oo(s);if(r.length<2)return alert("インポートするデータがありません。");const o=[];for(let c=1;c<r.length;c++){const u=r[c];if(u.length<2||!u[0]||!u[1])continue;const m=u[0],g=u[1],b=u[2],y=u[3],f=(u[4]||"").toUpperCase()==="TRUE",p=u[5],v=u[6]||"",x=u[7],h=(u[8]||"").toUpperCase()==="TRUE"||(u[8]||"").trim()==="",k=(u[9]||"").toUpperCase()==="TRUE",L=u[10],w=u[11]||null,I=`${g}T${b||"00:00"}:00`;let E=null;y&&(E=`${g}T${y}:00`);const $=v.split(",").map(N=>N.trim()),_=Ge.filter(N=>$.includes(N.name)),C=_.length>0?_.map(N=>N.id):null,O=C?C[0]:null;o.push({title:m,category:p||null,description:L||null,location:x||null,start_time:I,end_time:E,is_all_day:f,requires_attendance:h,require_detailed_attendance:k,attendance_deadline:w,target_group_id:O,target_group_ids:C,created_by:j==null?void 0:j.email})}if(o.length===0)return alert(`インポート可能なイベントがありませんでした。
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
        </div>`,l=document.createElement("div");l.innerHTML=d,document.body.appendChild(l.firstElementChild),document.getElementById("btn-cancel-import").onclick=()=>{document.getElementById("csv-import-confirm-modal").remove(),document.getElementById("file-import-csv").value=""},document.getElementById("btn-exec-import").onclick=async()=>{document.getElementById("csv-import-confirm-modal").remove(),F("インポート実行中...");try{const{error:c}=await S.from("events").insert(o);if(c)throw c;await ae("IMPORT_EVENTS",`イベントデータを${o.length}件インポートしました`),alert(`${o.length}件のインポートが完了しました。`),await rn(),We(),Tt()}catch(c){alert(`インポート中にエラーが発生しました:
`+c.message)}finally{q(),document.getElementById("file-import-csv").value=""}}},n.readAsText(t)};function It(e){if(!e)return null;const t=new Date(e+"T00:00:00");if(isNaN(t.getTime()))return null;const n=new Date(t.getTime()-3*24*60*60*1e3),a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),r=String(n.getDate()).padStart(2,"0");return`${a}-${s}-${r}T12:00:00`}function Bs(e){const t=It(e);if(!t)return"";const n=new Date(t),a=n.getFullYear(),s=n.getMonth()+1,r=n.getDate(),o=is[n.getDay()];return`${a}/${s}/${r}(${o}) 12:00`}function ar(e){if(!e)return"未定";let t=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");const n=/(https?:\/\/[^\s\<\>\"]+)/g;return t.replace(n,a=>`<a href="${a}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="text-blue-600 hover:underline inline-flex items-center space-x-0.5 ml-1 font-semibold">
            <span>地図/リンク</span>
            <svg class="w-3.5 h-3.5 inline ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
        </a>`)}function sr(){const e=document.getElementById("multiselect-bar"),t=document.getElementById("multiselect-count");!e||!t||(window.att_multiSelectMode&&window.att_selectedDates.size>0?(t.textContent=window.att_selectedDates.size,e.classList.remove("hidden")):e.classList.add("hidden"))}function io(){window.att_selectedDates.clear(),We(),sr()}function lo(){if(window.att_selectedDates.size===0){alert("日程が選択されていません。");return}const e=Array.from(window.att_selectedDates).sort();Mn("",null,!1,e)}function On(){const e=document.getElementById("ev-dates-container");if(e){if(e.innerHTML="",ue.length===0){e.innerHTML='<div class="text-xs text-gray-500 py-1.5 text-center">日付が選択されていません</div>';return}ue.forEach((t,n)=>{const a=document.createElement("div");a.className="flex items-center space-x-2 bg-white p-1.5 rounded border shadow-sm";const s=document.createElement("input");if(s.type="date",s.value=t,s.className="border rounded text-xs px-2 py-1 flex-1 min-w-0 font-medium focus:ring-1 focus:ring-blue-500 focus:border-blue-500",s.onchange=r=>{ue[n]=r.target.value,jt()},a.appendChild(s),!window.att_isEditingModal){const r=document.createElement("button");r.type="button",r.className="text-red-500 hover:text-red-700 font-bold p-1 transition rounded hover:bg-red-50",r.innerHTML=`
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            `,r.onclick=()=>{ue.splice(n,1),On(),jt()},a.appendChild(r)}e.appendChild(a)})}}function co(){let e=new Date().toISOString().split("T")[0];if(ue.length>0){const t=new Date(ue[ue.length-1]);isNaN(t.getTime())||(t.setDate(t.getDate()+1),e=t.toISOString().split("T")[0])}ue.push(e),On(),jt()}function uo(e){ue.splice(e,1),On(),jt()}function jt(){const e=document.getElementById("ev-deadline-auto-preview");if(e){if(ue.length===0){e.innerHTML='<span class="text-red-500 font-semibold text-xs">日付を入力してください</span>';return}if(ue.length===1)if(It(ue[0])){const n=Bs(ue[0]);e.innerHTML=`<span class="text-blue-600 font-bold">自動算出:</span> ${n}`}else e.innerHTML='<span class="text-red-500 font-semibold text-xs">日付が不正です</span>';else{const t=Bs(ue[0]);e.innerHTML=`<span class="text-blue-600 font-bold">自動算出:</span> 各日程の3日前の12:00<br><span class="text-[10px] text-gray-400 font-semibold">(例: ${ue[0]}分 → ${t})</span>`}}}function mo(e){const t=document.getElementById("ev-location-custom-container");t&&(e==="custom"?t.classList.remove("hidden"):t.classList.add("hidden"))}async function po(){const e=document.getElementById("ev-location-custom-name"),t=document.getElementById("ev-location-custom-url");if(!e)return;const n=e.value.trim(),a=t?t.value.trim():"";if(!n)return alert("場所名は必須です");F("場所マスタに登録中...");try{const{error:s}=await S.from("event_locations").insert({name:n,url:a||null});if(s)throw s;const{data:r}=await S.from("event_locations").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});r&&(Ft=r);const o=document.getElementById("ev-location-select");if(o){const i=a?`${n} ${a}`:n;o.innerHTML=`
                <option value="custom">-- 直接入力 / 新規マスタ追加 --</option>
                ${Ft.map(l=>{const c=l.url?`${l.name} ${l.url}`:l.name;return`<option value="${c}" ${c===i?"selected":""}>${l.name}${l.url?" (URLあり)":""}</option>`}).join("")}
            `;const d=document.getElementById("ev-location-custom-container");d&&d.classList.add("hidden"),e.value="",t&&(t.value="")}alert("場所マスタに登録しました")}catch(s){console.error("Failed to register location:",s),alert("マスタ登録エラー: "+(s.message||String(s)))}finally{q()}}window.att_closeModal=()=>{const e=document.getElementById("attendance-modals");e&&(e.innerHTML="")};window.att_saveEvent=to;window.att_deleteEvent=no;window.att_openEventDetail=openEventDetailModal;window.att_openAttendanceForm=ao;window.att_saveAttendance=so;window.att_exportCsv=ro;window.att_statusViewType=window.att_statusViewType||"group";window.att_statusFilter=window.att_statusFilter||"all";window.att_setStatusViewType=(e,t)=>{window.att_statusViewType=t,window.att_openEventDetail(e,"status")};window.att_setStatusFilter=(e,t)=>{window.att_statusFilter=t,window.att_openEventDetail(e,"status")};window.att_copyEvent=function(e){const t=tt.find(a=>a.id===e);if(!t)return;const n=window.att_selectedDates&&window.att_selectedDates.size>0?Array.from(window.att_selectedDates).sort():null;Mn("",t,!1,n)};window.att_editEvent=function(e){const t=tt.find(n=>n.id===e);t&&Mn("",t,!0)};window.att_addDateRow=co;window.att_removeDateRow=uo;window.att_renderDateRows=On;window.att_updateDefaultDeadlineLabel=jt;window.att_openBulkAddEvent=lo;window.att_clearDateSelection=io;window.att_onLocationSelectChange=mo;window.att_registerNewLocation=po;window.att_updateMultiselectBar=sr;window.att_onSingleDateChange=e=>{ue=[e],jt();const t=It(e);if(t){const n=t.split("T")[0],a=t.split("T")[1].substring(0,5),s=a.split(":")[0],r=a.split(":")[1],o=document.getElementById("ev-deadline-date"),i=document.getElementById("ev-deadline-time-h"),d=document.getElementById("ev-deadline-time-m");o&&(o.value=n),i&&(i.value=s),d&&(d.value=r)}};window.att_toggleDeadlineCustom=e=>{const t=document.getElementById("ev-deadline-custom-inputs"),n=document.getElementById("ev-deadline-auto-preview");if(!(!t||!n))if(e){t.classList.remove("hidden"),n.classList.add("hidden");const a=ue[0],s=It(a);if(s){const r=s.split("T")[0],o=s.split("T")[1].substring(0,5),i=o.split(":")[0],d=o.split(":")[1],l=document.getElementById("ev-deadline-date"),c=document.getElementById("ev-deadline-time-h"),u=document.getElementById("ev-deadline-time-m");l&&!l.value&&(l.value=r),c&&!c.value&&(c.value=i),u&&!u.value&&(u.value=d)}}else t.classList.add("hidden"),n.classList.remove("hidden"),jt()};function Gn(e){const t=e.getFullYear(),n=e.getMonth()+1,a=e.getDate();if(n===1&&a===1||n===2&&a===11||n===2&&a===23||n===4&&a===29||n===5&&a===3||n===5&&a===4||n===5&&a===5||n===8&&a===11||n===11&&a===3||n===11&&a===23)return!0;if(e.getDay()===1){const r=Math.floor((a-1)/7)+1;if(n===1&&r===2||n===7&&r===3||n===9&&r===3||n===10&&r===2)return!0}if(n===3){const r=Math.floor(20.8431+.242194*(t-1980)-Math.floor((t-1980)/4));if(a===r)return!0}if(n===9){const r=Math.floor(23.2488+.242194*(t-1980)-Math.floor((t-1980)/4));if(a===r)return!0}return!1}function fo(e){if(Gn(e))return!0;const t=e.getFullYear(),n=e.getMonth(),a=e.getDate(),s=e.getDay();if(s===1){const i=new Date(t,n,a-1);if(Gn(i))return!0}const r=new Date(t,n,a-1),o=new Date(t,n,a+1);return!!(Gn(r)&&Gn(o)&&s!==0)}async function go(){F("予定情報をエクスポート中...");try{const{data:e}=await S.from("events").select("*").order("start_time",{ascending:!0}),{data:t}=await S.from("groups").select("*"),n=new Map(t.map(d=>[d.id,d.name])),s=[["ID","タイトル","カテゴリ","場所","開始日時","終了日時","説明","終日(1/0)","出欠回答要(1/0)","詳細回答要(1/0)","回答期限","対象グループ名","削除(1/0)"]];e.forEach(d=>{let l="";d.target_group_ids&&d.target_group_ids.length>0?l=d.target_group_ids.map(g=>n.get(g)||"").filter(g=>g).join(", "):d.target_group_id&&(l=n.get(d.target_group_id)||"");const c=d.start_time?d.start_time.replace("T"," ").substring(0,16):"",u=d.end_time?d.end_time.replace("T"," ").substring(0,16):"",m=d.attendance_deadline?d.attendance_deadline.replace("T"," ").substring(0,16):"";s.push([d.id,d.title||"",d.category||"",d.location||"",c,u,d.description||"",d.is_all_day?"1":"0",d.requires_attendance?"1":"0",d.require_detailed_attendance?"1":"0",m,l,"0"])});const r=s.map(d=>d.map(window.escapeCSV).join(",")).join(`
`),o=new Blob([new Uint8Array([239,187,191]),r],{type:"text/csv;charset=utf-8;"}),i=document.createElement("a");i.href=URL.createObjectURL(o),i.download=`schedule_${new Date().toISOString().split("T")[0]}.csv`,i.click()}catch(e){console.error(e),alert("予定のエクスポートに失敗しました: "+e.message)}finally{q()}}async function bo(e){const t=e.target.files[0];if(!t)return;F("CSVファイルを解析中...");const n=new FileReader;n.onload=async a=>{try{const s=a.target.result,r=window.parseCSV(s);if(r.length<2){alert("有効なデータがありません。"),q();return}const o=r[0].map(N=>N.trim()),i=o.indexOf("ID"),d=o.indexOf("タイトル"),l=o.indexOf("カテゴリ"),c=o.indexOf("場所"),u=o.indexOf("開始日時"),m=o.indexOf("終了日時"),g=o.indexOf("説明"),b=o.findIndex(N=>N.includes("終日")),y=o.findIndex(N=>N.includes("出欠回答要")),f=o.findIndex(N=>N.includes("詳細回答要")),p=o.findIndex(N=>N.includes("回答期限")),v=o.findIndex(N=>N.includes("対象グループ名")),x=o.findIndex(N=>N.includes("削除"));if(d===-1||u===-1){alert("「タイトル」および「開始日時」列は必須です。"),q();return}const{data:h}=await S.from("events").select("*"),{data:k}=await S.from("groups").select("*"),L=new Map(k.map(N=>[N.name,N.id])),w=new Map(h.map(N=>[N.id,N])),I=new Map(h.map(N=>[`${N.title}_${N.start_time?N.start_time.substring(0,16).replace("T"," "):""}`,N])),E=[],$=[],_=[],C=N=>{if(!N)return null;let P=N.trim().replace(/\//g,"-").replace(" ","T");return P.length===10?P+="T00:00:00":P.length===16&&(P+=":00"),P};for(let N=1;N<r.length;N++){const P=r[N];if(P.length<2)continue;const U=(P[d]||"").trim(),M=(P[u]||"").trim();if(!U||!M)continue;const B=C(M),A=i!==-1?(P[i]||"").trim():"",T=l!==-1?(P[l]||"").trim():"",D=c!==-1?(P[c]||"").trim():"",G=m!==-1?C(P[m]):null,H=g!==-1?(P[g]||"").trim():"",W=b!==-1?P[b]==="1"||P[b]==="true":!1,R=y!==-1?!(P[y]==="0"||P[y]==="false"):!0,z=f!==-1?P[f]==="1"||P[f]==="true":!1,J=p!==-1?C(P[p]):null,ye=x!==-1?P[x]==="1"||P[x]==="削除":!1,ne=v!==-1?(P[v]||"").trim():"";let de=[],Le="";if(ne){const Ze=ne.split(",").map(Re=>Re.trim()).filter(Re=>Re);de=Ze.map(Re=>L.get(Re)).filter(Re=>Re),Le=Ze.join(", ")}const Ke={id:A,title:U,category:T,location:D,start_time:B,end_time:G,description:H,is_all_day:W,requires_attendance:R,require_detailed_attendance:z,attendance_deadline:J,target_group_ids:de,target_group_name:Le};let se=null;if(A&&(se=w.get(A)),!se){const Ze=`${U}_${M.substring(0,16).replace(/\//g,"-")}`;se=I.get(Ze)}if(se)if(Ke.id=se.id,ye)_.push(Ke);else{const Ze=se.title!==U,Re=se.category!==T,zt=se.location!==D,At=se.description!==H,mt=(se.start_time?se.start_time.substring(0,16):"")!==(B?B.substring(0,16):""),pt=(se.end_time?se.end_time.substring(0,16):"")!==(G?G.substring(0,16):""),rt=se.is_all_day!==W,V=se.requires_attendance!==R,re=se.require_detailed_attendance!==z,Te=(se.attendance_deadline?se.attendance_deadline.substring(0,16):"")!==(J?J.substring(0,16):""),qe=se.target_group_ids||(se.target_group_id?[se.target_group_id]:[]),ft=JSON.stringify([...qe].sort())!==JSON.stringify([...de].sort());(Ze||Re||zt||At||mt||pt||rt||V||re||Te||ft)&&$.push(Ke)}else ye||E.push(Ke)}q();let O="";_.length>0&&(O=`⚠️ 警告: ${_.length}件の予定が削除されます。予定を削除すると、その予定に紐づいているメンバー全員の出欠データや配車データも自動的に削除されます。`),window.showCSVConfirmModal("events",E,$,_,"予定CSVインポート確認",O)}catch(s){console.error(s),alert("CSVの解析に失敗しました: "+s.message),q()}},n.readAsText(t)}async function yo(){const{add:e,update:t,delete:n}=kt;F("予定データを保存中...");try{if(n.length>0){const a=n.map(r=>r.id),{error:s}=await S.from("events").delete().in("id",a);if(s)throw s;await ae("IMPORT_EVENTS_DELETE",`${n.length}件の予定をインポートで削除しました`)}if(e.length>0){const a=e.map(r=>({title:r.title,category:r.category,location:r.location,start_time:r.start_time,end_time:r.end_time,description:r.description,is_all_day:r.is_all_day,requires_attendance:r.requires_attendance,require_detailed_attendance:r.requires_attendance?r.require_detailed_attendance:!1,attendance_deadline:r.attendance_deadline,target_group_ids:r.target_group_ids.length>0?r.target_group_ids:null,created_by:j==null?void 0:j.email})),{error:s}=await S.from("events").insert(a);if(s)throw s;await ae("IMPORT_EVENTS_ADD",`${e.length}件の予定をインポートで追加しました`)}if(t.length>0){for(let a of t){const{error:s}=await S.from("events").update({title:a.title,category:a.category,location:a.location,start_time:a.start_time,end_time:a.end_time,description:a.description,is_all_day:a.is_all_day,requires_attendance:a.requires_attendance,require_detailed_attendance:a.requires_attendance?a.require_detailed_attendance:!1,attendance_deadline:a.attendance_deadline,target_group_ids:a.target_group_ids.length>0?a.target_group_ids:null}).eq("id",a.id);if(s)throw s}await ae("IMPORT_EVENTS_UPDATE",`${t.length}件の予定をインポートで更新しました`)}alert("予定のインポートが完了しました。"),window.closeCSVConfirmModal(),await rn(),We(),document.getElementById("list-container").classList.contains("hidden")||Tt()}catch(a){console.error(a),alert("予定データの保存に失敗しました: "+a.message)}finally{q()}}window.executeEventsImport=yo;function ho(){const n=[["ID","タイトル","カテゴリ","場所","開始日時","終了日時","説明","終日(1/0)","出欠回答要(1/0)","詳細回答要(1/0)","回答期限","対象グループ名","削除(1/0)"],["","土曜練習","練習","第一グラウンド","2026-06-20 09:00","2026-06-20 12:00","通常練習を行います。","0","1","1","2026-06-19 18:00","選手・保護者","0"],["","練習試合(イーグルス戦)","試合","イーグルス球場","2026-06-21 13:00","2026-06-21 16:00","遠征試合です。車出しをお願いします。","0","1","1","2026-06-20 12:00","選手・保護者","0"]].map(r=>r.map(window.escapeCSV).join(",")).join(`
`),a=new Blob([new Uint8Array([239,187,191]),n],{type:"text/csv;charset=utf-8;"}),s=document.createElement("a");s.href=URL.createObjectURL(a),s.download="schedule_sample.csv",s.click()}window.att_toggleSort=function(e,t){window.att_statusSortKey===t?window.att_statusSortOrder==="asc"?window.att_statusSortOrder="desc":(window.att_statusSortKey="default",window.att_statusSortOrder="asc"):(window.att_statusSortKey=t,window.att_statusSortOrder="asc"),window.att_openEventDetail(e,"status")};window.att_exportParticipantList=function(e){const t=tt.find(b=>b.id===e);if(!t)return;const n=_n(t),a=window.att_statusViewType==="group";let s=[];if(n.ids.length===0)s=qt.filter(b=>b.can_use_attendance!==!1);else{const b=it.filter(p=>n.ids.includes(p.group_id)).map(p=>p.user_email),f=Se.filter(p=>p.event_id===t.id).map(p=>p.user_email);s=qt.filter(p=>p.can_use_attendance!==!1&&(b.includes(p.email)||f.includes(p.email)))}const r=s.filter(b=>{const y=Se.find(p=>p.event_id===t.id&&p.user_email===b.email),f=(y==null?void 0:y.status)||"未回答";return window.att_statusFilter==="all"?!0:window.att_statusFilter==="answered"?f==="出席"||f==="欠席"||f==="保留"||f==="未定":window.att_statusFilter==="attending"?f==="出席":window.att_statusFilter==="absent"?f==="欠席":window.att_statusFilter==="pending"?f==="保留"||f==="未定":window.att_statusFilter==="unanswered"?f==="未回答"||!f:!0}),o=window.att_statusSortKey||"default",i=window.att_statusSortOrder||"asc";o!=="default"&&r.sort((b,y)=>{var v,x;let f,p;if(o==="name")f=b.name||b.email.split("@")[0],p=y.name||y.email.split("@")[0];else if(o==="group")if(a){const h=it.filter(L=>L.user_email===b.email).map(L=>L.group_id);f=Ge.filter(L=>h.includes(L.id)).map(L=>L.name).join(", ")||"-";const k=it.filter(L=>L.user_email===y.email).map(L=>L.group_id);p=Ge.filter(L=>k.includes(L.id)).map(L=>L.name).join(", ")||"-"}else f=((v=Nt.find(h=>h.id===b.attribute_id))==null?void 0:v.name)||"-",p=((x=Nt.find(h=>h.id===y.attribute_id))==null?void 0:x.name)||"-";else if(o==="status"){const h=k=>{const L=Se.find(I=>I.event_id===t.id&&I.user_email===k.email),w=(L==null?void 0:L.status)||"未回答";return w==="出席"?1:w==="保留"||w==="未定"?2:w==="未回答"?3:w==="欠席"?4:5};f=h(b),p=h(y)}else if(o==="comment"){const h=k=>{const L=Se.find($=>$.event_id===t.id&&$.user_email===k.email);if(!L||!L.status||L.status==="未回答")return"";let w=L.comment||"",I="否";w.startsWith("[荷物車:可]")?(I="可",w=w.substring(8)):w.startsWith("[荷物車:否]")&&(I="否",w=w.substring(8));let E=[];return t.require_detailed_attendance&&(L.accompanying_persons&&E.push(`同伴: ${L.accompanying_persons}`),L.car_capacity&&L.car_capacity>0&&(E.push(`車出: 可[${L.car_capacity}人]`),E.push(`荷物車: ${I}`))),w.trim()&&E.push(`メモ: ${w.trim()}`),E.join(", ")};f=h(b),p=h(y)}else if(o==="updated_at"){const h=Se.find(L=>L.event_id===t.id&&L.user_email===b.email),k=Se.find(L=>L.event_id===t.id&&L.user_email===y.email);f=h?new Date(h.updated_at).getTime():0,p=k?new Date(k.updated_at).getTime():0}return f<p?i==="asc"?-1:1:f>p?i==="asc"?1:-1:0});const l=[["名前",a?"グループ":"属性","出欠ステータス","同伴者","車出し可否","乗車人数","荷物車対応","コメント","更新日時"]];r.forEach(b=>{var E;const y=b.name||b.email.split("@")[0];let f="-";if(a){const $=it.filter(_=>_.user_email===b.email).map(_=>_.group_id);f=Ge.filter(_=>$.includes(_.id)).map(_=>_.name).join(", ")||"-"}else f=((E=Nt.find($=>$.id===b.attribute_id))==null?void 0:E.name)||"-";const p=Se.find($=>$.event_id===t.id&&$.user_email===b.email);let v=(p==null?void 0:p.status)||"未回答";v==="未定"&&(v="保留");let x=(p==null?void 0:p.comment)||"",h="否";x.startsWith("[荷物車:可]")?(h="可",x=x.substring(8)):x.startsWith("[荷物車:否]")&&(h="否",x=x.substring(8));const k=(p==null?void 0:p.accompanying_persons)||"",L=(p==null?void 0:p.car_capacity)||0,w=L>0?"可":"否",I=p?Xs(p.updated_at):"-";l.push([y,f,v,k,w,L,h,x,I])});const c=l.map(b=>b.map(window.escapeCSV).join(",")).join(`
`),u=new Blob([new Uint8Array([239,187,191]),c],{type:"text/csv;charset=utf-8;"}),m=document.createElement("a"),g=t.title.replace(/[\/\\?%*:|"<>]/g,"_");m.href=URL.createObjectURL(u),m.setAttribute("download",`参加者リスト_${g}_${window.att_statusFilter}.csv`),document.body.removeChild(m)};function La(e){if(!e||isNaN(e.getTime()))return"";const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0"),s=String(e.getHours()).padStart(2,"0"),r=String(e.getMinutes()).padStart(2,"0");return`${t}-${n}-${a}T${s}:${r}`}function xo(e){const t=e.split(/\r?\n/),n=[];let a=null,s=!1;const r=[];for(let o of t)o.startsWith(" ")||o.startsWith("	")?r.length>0&&(r[r.length-1]+=o.substring(1)):r.push(o);for(let o of r){const i=o.trim();if(i){if(i==="BEGIN:VEVENT")a={title:"",description:"",location:"",start:null,end:null,isAllDay:!1},s=!0;else if(i==="END:VEVENT")a&&n.push(a),s=!1,a=null;else if(s&&a){const d=i.indexOf(":");if(d===-1)continue;const l=i.substring(0,d),c=i.substring(d+1),u=l.split(";")[0],m=l.split(";").slice(1);if(u==="SUMMARY")a.title=Sa(c);else if(u==="DESCRIPTION")a.description=Sa(c);else if(u==="LOCATION")a.location=Sa(c);else if(u==="DTSTART"){const g=m.some(b=>b.toUpperCase()==="VALUE=DATE");a.start=Ts(c,g),g&&(a.isAllDay=!0)}else if(u==="DTEND"){const g=m.some(b=>b.toUpperCase()==="VALUE=DATE");a.end=Ts(c,g)}}}}return n}function Sa(e){return e.replace(/\\n/g,`
`).replace(/\\r/g,"\r").replace(/\\t/g,"	").replace(/\\,/g,",").replace(/\\;/g,";").replace(/\\\\/g,"\\")}function Ts(e,t){if(!e)return null;const n=parseInt(e.substring(0,4)),a=parseInt(e.substring(4,6))-1,s=parseInt(e.substring(6,8));if(t||e.indexOf("T")===-1)return new Date(n,a,s);const r=e.indexOf("T"),o=parseInt(e.substring(r+1,r+3)),i=parseInt(e.substring(r+3,r+5)),d=parseInt(e.substring(r+5,r+7))||0;return e.endsWith("Z")?new Date(Date.UTC(n,a,s,o,i,d)):new Date(n,a,s,o,i,d)}async function vo(e){const t=e.target.files[0];if(!t)return;F("ICSファイルを解析中...");const n=new FileReader;n.onload=async a=>{try{const s=a.target.result,r=xo(s);if(q(),r.length===0){alert("ICSファイルから有効な予定が見つかりませんでした。");return}wo(r)}catch(s){console.error(s),alert("ICSファイルの解析に失敗しました: "+s.message),q()}},n.readAsText(t),e.target.value=""}function wo(e){const t=document.getElementById("ics-import-list");if(!t)return;const n=document.getElementById("ics-import-count");n&&(n.textContent=e.length),t.innerHTML=e.map((r,o)=>{var y,f;const i=r.title||"",d=i.toLowerCase();let l=((y=je[0])==null?void 0:y.name)||"練習";for(let p of je)if(d.includes(p.name)){l=p.name;break}l===((f=je[0])==null?void 0:f.name)&&(d.includes("試合")||d.includes("vs")||d.includes("戦")?je.find(v=>v.name==="試合")&&(l="試合"):(d.includes("イベント")||d.includes("会")||d.includes("式")||d.includes("フェス"))&&je.find(v=>v.name==="イベント")&&(l="イベント"));let c="";if(r.location){const p=Ft.find(v=>v.name===r.location);p?c=p.name:c="custom"}const u=La(r.start),m=La(r.end||(r.start?new Date(r.start.getTime()+2*60*60*1e3):null));let g=r.start?new Date(r.start.getTime()-3*24*60*60*1e3):null;g&&g.setHours(12,0,0,0);const b=La(g);return`
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
                                ${je.map(p=>`<option value="${p.name}" ${p.name===l?"selected":""}>${p.name}</option>`).join("")}
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">場所</label>
                            <div class="flex gap-2">
                                <select class="ics-row-location-select w-1/2 border p-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500">
                                    <option value="">(登録場所から選択...)</option>
                                    ${Ft.map(p=>`<option value="${p.name}" ${p.name===c?"selected":""}>${p.name}</option>`).join("")}
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
                            <input type="datetime-local" class="ics-row-end w-full border p-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500" value="${m}">
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
                            ${Ge.map(p=>`
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
        `}).join("");const a=document.getElementById("ics-select-all");a&&(a.checked=!0,a.onclick=r=>{document.querySelectorAll(".ics-row-select").forEach(o=>o.checked=r.target.checked)});const s=document.getElementById("ics-import-modal");s&&s.classList.remove("hidden")}function qa(){var e;(e=document.getElementById("ics-import-modal"))==null||e.classList.add("hidden")}async function Eo(){const e=document.querySelectorAll(".ics-row"),t=[];if(e.forEach(n=>{var f,p,v,x,h,k,L,w,I,E;const a=n.querySelector(".ics-row-select");if(!a||!a.checked)return;const s=((f=n.querySelector(".ics-row-title"))==null?void 0:f.value)||"";if(!s)return;const r=((p=n.querySelector(".ics-row-category"))==null?void 0:p.value)||"",o=((v=n.querySelector(".ics-row-location"))==null?void 0:v.value)||"",i=((x=n.querySelector(".ics-row-start"))==null?void 0:x.value)||"",d=((h=n.querySelector(".ics-row-end"))==null?void 0:h.value)||"",l=((k=n.querySelector(".ics-row-allday"))==null?void 0:k.checked)||!1,c=[];n.querySelectorAll(".ics-row-group-cb:checked").forEach($=>{c.push($.value)});const u=((L=n.querySelector(".ics-row-req-att"))==null?void 0:L.checked)||!1,m=((w=n.querySelector(".ics-row-req-det"))==null?void 0:w.checked)||!1,g=((I=n.querySelector(".ics-row-deadline"))==null?void 0:I.value)||"",b=((E=n.querySelector(".ics-row-description"))==null?void 0:E.value)||"",y=$=>$?new Date($).toISOString():null;t.push({title:s,category:r,location:o,start_time:y(i),end_time:y(d),is_all_day:l,target_group_ids:c.length>0?c:null,requires_attendance:u,require_detailed_attendance:u?m:!1,attendance_deadline:u?y(g):null,description:b,created_by:j==null?void 0:j.email})}),t.length===0){alert("登録対象の予定が選択されていません。");return}F("予定データを登録中...");try{const{error:n}=await S.from("events").insert(t);if(n)throw n;await ae("IMPORT_ICS_EVENTS",`${t.length}件の予定をICSファイルから一括登録しました`),alert(`${t.length}件の予定を登録しました。`),qa(),await rn(),We(),document.getElementById("list-container").classList.contains("hidden")||Tt()}catch(n){console.error(n),alert("予定の登録に失敗しました: "+n.message)}finally{q()}}const _o="modulepreload",Io=function(e){return"/"+e},As={},$o=function(t,n,a){let s=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),i=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));s=Promise.allSettled(n.map(d=>{if(d=Io(d),d in As)return;As[d]=!0;const l=d.endsWith(".css"),c=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${c}`))return;const u=document.createElement("link");if(u.rel=l?"stylesheet":_o,l||(u.as="script"),u.crossOrigin="",u.href=d,i&&u.setAttribute("nonce",i),document.head.appendChild(u),l)return new Promise((m,g)=>{u.addEventListener("load",m),u.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(o){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=o,window.dispatchEvent(i),!i.defaultPrevented)throw o}return s.then(o=>{for(const i of o||[])i.status==="rejected"&&r(i.reason);return t().catch(r)})};let Cs=!1,rr=[],or=[],ir=[],lt=[],_e={homeTeamNames:["ありんこアントス@A軍"],defaultFilterDate:{from:"",to:"",teamRegex:"",category:"",outcome:"all"}},Ds=!1,Bn={},Pt={},Ba={},Ta={},Fa={batter:[],pitcher:[]},Jt={batter:{key:"ops",order:"desc"},pitcher:{key:"era",order:"asc"}},ln={batter:{key:"ops",order:"desc"},pitcher:{key:"era",order:"asc"}},vt=null,bt={};async function ja(){Cs||(Lo(),Cs=!0);const e=document.querySelector('button[data-tab="import-data"]');e&&(he==="admin"?e.classList.remove("hidden"):e.classList.add("hidden")),await dr()}function ko(e){const t=[];let n=[],a="",s=!1;for(let r=0;r<e.length;r++){const o=e[r];s?o==='"'?r+1<e.length&&e[r+1]==='"'?(a+='"',r++):s=!1:a+=o:o==='"'?s=!0:o===","?(n.push(a),a=""):o===`
`||o==="\r"?(n.push(a),t.push(n),n=[],a="",o==="\r"&&r+1<e.length&&e[r+1]===`
`&&r++):a+=o}return(a||n.length>0)&&(n.push(a),t.push(n)),t}function Lo(){var t,n,a,s,r,o,i,d,l,c,u;let e=document.getElementById("dashboard-view");e||(e=document.createElement("div"),e.id="dashboard-view",e.className="hidden p-4 max-w-4xl mx-auto",e.innerHTML=`
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
        `,(t=document.getElementById("app-view"))==null||t.parentNode.appendChild(e),document.getElementById("btn-back-to-menu-dash").addEventListener("click",()=>{$o(()=>Promise.resolve().then(()=>kl),void 0).then(m=>m.switchAuthScreen("app-menu-view"))}),document.getElementById("btn-exec-csv-import").addEventListener("click",jo),(n=document.getElementById("btn-load-detail-data"))==null||n.addEventListener("click",Ho),document.querySelectorAll("#dashboard-tabs button").forEach(m=>{m.addEventListener("click",g=>{document.querySelectorAll("#dashboard-tabs button").forEach(y=>{y.classList.remove("text-blue-600","border-blue-600"),y.classList.add("text-gray-500","border-transparent")}),["team-summary","personal-summary","ranking","comparison","test-mode","settings","import-data","detail-analysis"].forEach(y=>{var f;return(f=document.getElementById(`tab-content-${y}`))==null?void 0:f.classList.add("hidden")});const b=g.currentTarget;b.classList.remove("text-gray-500","border-transparent"),b.classList.add("text-blue-600","border-blue-600"),document.getElementById(`tab-content-${b.dataset.tab}`).classList.remove("hidden")})}),document.querySelectorAll("button[data-ranking-tab]").forEach(m=>{m.addEventListener("click",g=>{document.querySelectorAll("button[data-ranking-tab]").forEach(y=>{y.classList.remove("text-blue-600","border-blue-600"),y.classList.add("text-gray-500","border-transparent")}),["batter","pitcher"].forEach(y=>document.getElementById(`ranking-content-${y}`).classList.add("hidden"));const b=g.currentTarget;b.classList.remove("text-gray-500","border-transparent"),b.classList.add("text-blue-600","border-blue-600"),document.getElementById(`ranking-content-${b.dataset.rankingTab}`).classList.remove("hidden")})}),document.querySelectorAll("#tab-content-ranking th[data-sort]").forEach(m=>{m.addEventListener("click",g=>{const b=g.currentTarget.dataset.role,y=g.currentTarget.dataset.sort;qo(b,y)})}),document.getElementById("btn-apply-dashboard-filter").addEventListener("click",Dt),(a=document.getElementById("db-filter-outcome"))==null||a.addEventListener("change",Dt),(s=document.getElementById("db-filter-first-score"))==null||s.addEventListener("change",Dt),document.getElementById("btn-clear-dashboard-filter").addEventListener("click",()=>{document.getElementById("db-filter-date-from").value=_e.defaultFilterDate.from||"",document.getElementById("db-filter-date-to").value=_e.defaultFilterDate.to||"",document.getElementById("db-filter-team-regex").value=_e.defaultFilterDate.teamRegex||"",document.getElementById("db-filter-category").value=_e.defaultFilterDate.category||"";const m=document.getElementById("db-filter-outcome");m&&(m.value=_e.defaultFilterDate.outcome||"all");const g=document.getElementById("db-filter-first-score");g&&(g.value=_e.defaultFilterDate.firstScore||"all"),Dt()}),["ps-mode","ps-player","ps-role","ps-limit-games","ps-ma-unit","ps-ma-window"].forEach(m=>{var g;return(g=document.getElementById(m))==null?void 0:g.addEventListener("change",()=>{var p,v,x;const b=(p=document.getElementById("ps-ma-unit"))==null?void 0:p.value,y=document.getElementById("ps-ma-window-label");y&&(y.textContent=b==="ab"?"打数/登板":"試合");const f=((v=document.getElementById("ps-mode"))==null?void 0:v.value)==="single";(x=document.getElementById("ps-player-select-wrap"))==null||x.classList.toggle("hidden",!f),ls()})}),(r=document.getElementById("btn-export-ps-csv"))==null||r.addEventListener("click",Oo),(o=document.getElementById("btn-print-ps"))==null||o.addEventListener("click",()=>window.print()),["tm-role","tm-window"].forEach(m=>{var g;return(g=document.getElementById(m))==null?void 0:g.addEventListener("change",Va)}),(i=document.getElementById("tm-players-list"))==null||i.addEventListener("change",Va),(d=document.getElementById("comp-players-list"))==null||d.addEventListener("change",Ua),(l=document.getElementById("comp-role"))==null||l.addEventListener("change",m=>{Ua()}),(c=document.getElementById("btn-add-home-team"))==null||c.addEventListener("click",Fo),(u=document.getElementById("btn-save-default-date"))==null||u.addEventListener("click",async()=>{const m=document.getElementById("setting-default-date-from").value,g=document.getElementById("setting-default-date-to").value,b=document.getElementById("setting-default-team-regex").value.trim(),y=document.getElementById("setting-default-category").value.trim(),f={from:m,to:g,teamRegex:b,category:y};if(localStorage.setItem("ants_defaultFilterDate",JSON.stringify(f)),he==="admin"){F("デフォルトのフィルタ設定を保存中 (DB同期)...");try{const{error:k}=await S.from("dashboard_settings").upsert({key:"defaultFilterDate",value:f},{onConflict:"key"});if(k)throw k;alert("デフォルトのフィルタ設定を保存し、DBと同期しました。")}catch(k){console.error("Supabase sync failed",k),alert("DBへの同期に失敗しましたが、このブラウザには保存されました: "+k.message)}finally{q()}}else alert("デフォルトのフィルタ設定をこのブラウザに保存しました。");_e.defaultFilterDate=f;const p=document.getElementById("db-filter-date-from"),v=document.getElementById("db-filter-date-to"),x=document.getElementById("db-filter-team-regex"),h=document.getElementById("db-filter-category");p&&(p.value=m),v&&(v.value=g),x&&(x.value=b),h&&(h.value=y),Dt()}))}async function dr(){F("成績データを読み込み中...");try{const[{data:e,error:t},{data:n,error:a},{data:s,error:r},{data:o,error:i},{data:d,error:l}]=await Promise.all([S.from("games").select("*").order("date",{ascending:!0}),S.from("batter_stats").select("*"),S.from("pitcher_stats").select("*"),S.from("players").select("*"),S.from("dashboard_settings").select("*")]);if(t)throw t;if(a)throw a;if(r)throw r;rr=e||[],or=n||[],ir=s||[],lt=o||[];let c=["ありんこアントス@A軍"],u={from:"",to:"",teamRegex:"",category:"",outcome:"all"};if(d){const b=d.find(f=>f.key==="homeTeamNames");b&&b.value!==null&&b.value!==void 0&&(c=b.value);const y=d.find(f=>f.key==="defaultFilterDate");y&&y.value&&(u={from:y.value.from||"",to:y.value.to||"",teamRegex:y.value.teamRegex||"",category:y.value.category||"",outcome:y.value.outcome||"all"})}const m=localStorage.getItem("ants_homeTeamNames");if(m)try{c=JSON.parse(m)}catch(b){console.error("Failed to parse local homeTeamNames",b)}const g=localStorage.getItem("ants_defaultFilterDate");if(g)try{u=JSON.parse(g)}catch(b){console.error("Failed to parse local defaultFilterDate",b)}_e.homeTeamNames=c,_e.defaultFilterDate=u,cs(),document.getElementById("setting-default-date-from").value=_e.defaultFilterDate.from||"",document.getElementById("setting-default-date-to").value=_e.defaultFilterDate.to||"",document.getElementById("setting-default-team-regex").value=_e.defaultFilterDate.teamRegex||"",document.getElementById("setting-default-category").value=_e.defaultFilterDate.category||"",Ds||(document.getElementById("btn-clear-dashboard-filter").click(),Ds=!0),Dt()}catch(e){console.error(e),alert("成績データの取得に失敗しました: "+e.message)}finally{q()}}function gt(e){if(!e)return!1;const t=e.trim();return t==="ありんこ"||t==="アントス"?!1:_e.homeTeamNames.some(n=>{if(!n)return!1;const a=n.replace(/@.*$/,"").trim(),s=e.replace(/@.*$/,"").trim();try{if(new RegExp(n,"i").test(e)||new RegExp(a,"i").test(s))return!0}catch{}return e.includes(n)||n.includes(e)||a&&s&&(s.includes(a)||a.includes(s))})}function ds(e){const t=gt(e.team_first);let n=0,a=0;if(e.score&&typeof e.score=="string"){const o=e.score.match(/\d+/g);if(o&&o.length>=2){const i=parseInt(o[0],10),d=parseInt(o[1],10);return t?(n=i,a=d):(n=d,a=i),{tr:n,or:a,isAntsFirst:t}}}const s=parseInt(e.runs_first??e.score_first??0,10)||0,r=parseInt(e.runs_second??e.score_second??0,10)||0;return t?(n=s,a=r):(n=r,a=s),{tr:n,or:a,isAntsFirst:t}}function So(e){const t=gt(e.team_first);if(e.first_score_team)return gt(e.first_score_team)?"scored":"conceded";if(e.first_scored!==void 0&&e.first_scored!==null){if(e.first_scored==="home"||e.first_scored===!0||e.first_scored===1)return"scored";if(e.first_scored==="opp"||e.first_scored===!1||e.first_scored===0)return"conceded"}const n=e.inning_scores||e.score_detail||e.innings;if(n&&typeof n=="string"&&n.includes("|")){const[r,o]=n.split("|"),i=r.split(/[,-]/).map(c=>parseInt(c.trim(),10)||0),d=o.split(/[,-]/).map(c=>parseInt(c.trim(),10)||0),l=Math.max(i.length,d.length);for(let c=0;c<l;c++){const u=i[c]||0,m=d[c]||0;if(u>0&&m===0)return t?"scored":"conceded";if(m>0&&u===0)return t?"conceded":"scored";if(u>0&&m>0)return t?"scored":"conceded"}}const{tr:a,or:s}=ds(e);return a===0&&s===0?"unknown":a>0&&s===0?"scored":s>0&&a===0?"conceded":t?a>0?"scored":"conceded":s>0?"conceded":"scored"}let In={games:[],bStats:[],pStats:[]};function Dt(){var p,v;const e=document.getElementById("db-filter-date-from").value,t=document.getElementById("db-filter-date-to").value,n=document.getElementById("db-filter-team-regex").value,a=document.getElementById("db-filter-category").value,s=((p=document.getElementById("db-filter-outcome"))==null?void 0:p.value)||"all",r=((v=document.getElementById("db-filter-first-score"))==null?void 0:v.value)||"all";let o=null;if(n)try{o=new RegExp(n,"i")}catch{}const i=a?a.split(",").map(x=>x.trim()).filter(x=>x):[],d=rr.filter(x=>{const h=(x.team_first||"").trim(),k=(x.team_second||"").trim(),L=(x.title||"")+(x.category||"");if(h==="ありんこ"||h==="アントス"||k==="ありんこ"||k==="アントス"||L.includes("紅白")||h.includes("紅白")||k.includes("紅白"))return!1;const w=gt(x.team_first),I=gt(x.team_second);if(w&&I||!w&&!I)return!1;const E=x.date?x.date.split("T")[0]:"";if(e&&E<e||t&&E>t||i.length>0&&!i.includes(x.category))return!1;if(o){const $=o.test(x.team_first),_=o.test(x.team_second);if(!$&&!_)return!1}if(s!=="all"){const{tr:$,or:_}=ds(x);if(s==="win"&&$<=_||s==="loss"&&$>=_||s==="draw"&&$!==_)return!1}if(r!=="all"){const $=So(x);if(r==="scored"&&$!=="scored"||r==="conceded"&&$!=="conceded")return!1}return!0}),l=new Set(d.map(x=>x.id)),c=or.filter(x=>l.has(x.game_id)),u=ir.filter(x=>l.has(x.game_id));In={games:d,bStats:c,pStats:u};const m=new Set;c.forEach(x=>m.add(x.player_id)),u.forEach(x=>m.add(x.player_id));const g=lt.filter(x=>m.has(x.id)).sort((x,h)=>x.name.localeCompare(h.name)),b=document.getElementById("ps-player");if(b){const x=b.value;b.innerHTML=g.map(h=>`<option value="${h.id}">${h.name}</option>`).join(""),x&&m.has(parseInt(x))&&(b.value=x)}const y=document.getElementById("comp-players-list");if(y){const x=new Set(Array.from(document.querySelectorAll(".comp-player-cb:checked")).map(h=>h.value));y.innerHTML=g.map(h=>`<label class="flex items-center space-x-1 cursor-pointer"><input type="checkbox" value="${h.id}" class="comp-player-cb rounded text-blue-600" ${x.has(String(h.id))?"checked":""}><span>${h.name}</span></label>`).join("")}const f=document.getElementById("tm-players-list");if(f){const x=new Set(Array.from(document.querySelectorAll(".tm-player-cb:checked")).map(h=>h.value));f.innerHTML=g.map(h=>`<label class="flex items-center space-x-1 cursor-pointer"><input type="checkbox" value="${h.id}" class="tm-player-cb rounded text-blue-600" ${x.has(String(h.id))?"checked":""}><span>${h.name}</span></label>`).join("")}Bo(d,c,u),Ro(),ls(),Ua(),Va()}function Bo(e,t,n){document.getElementById("summary-games").textContent=e.length;const a=t.reduce((c,u)=>c+(u.at_bats||0),0),s=t.reduce((c,u)=>c+(u.hits||0),0),r=a>0?(s/a).toFixed(3).replace(/^0/,""):".000";document.getElementById("summary-avg").textContent=r;const o=t.reduce((c,u)=>c+(u.runs||0),0);document.getElementById("summary-runs").textContent=o;const i=n.reduce((c,u)=>c+(u.earned_runs||0),0),d=n.reduce((c,u)=>c+(u.outs||0),0),l=d>0?(i*7/(d/3)).toFixed(2):"0.00";document.getElementById("summary-era").textContent=l,To(e,t,n)}let Ns=!1;function Rn(){return Ns||window.Chart?Promise.resolve():new Promise((e,t)=>{const n=document.createElement("script");n.src="https://cdn.jsdelivr.net/npm/chart.js",n.onload=()=>{Ns=!0,e()},n.onerror=t,document.head.appendChild(n)})}async function To(e,t,n){await Rn(),Object.values(Bn).forEach(I=>I.destroy()),Bn={};const a={};e.forEach(I=>{const E=I.date?I.date.split("T")[0]:"";if(!E)return;const $=E.substring(0,7);a[$]||(a[$]={atBats:0,hits:0,runs:0,strikeOuts:0,hitsAllowed:0,walksAllowed:0,strikes:0,pitchCount:0,earnedRuns:0,outs:0})}),t.forEach(I=>{const E=e.find(_=>_.id===I.game_id);if(!E||!E.date)return;const $=E.date.split("T")[0].substring(0,7);a[$]&&(a[$].atBats+=I.at_bats||0,a[$].hits+=I.hits||0,a[$].runs+=I.runs||0)}),n.forEach(I=>{const E=e.find(_=>_.id===I.game_id);if(!E||!E.date)return;const $=E.date.split("T")[0].substring(0,7);a[$]&&(a[$].strikeOuts+=I.strike_outs||0,a[$].hitsAllowed+=I.hits_allowed||0,a[$].walksAllowed+=I.walks_allowed||0,a[$].strikes+=I.strikes||0,a[$].pitchCount+=I.pitch_count||0,a[$].earnedRuns+=I.earned_runs||0,a[$].outs+=I.outs||0)});const s=Object.keys(a).sort();let r=0,o=0,i=0,d=0;const l=[],c=[],u=[],m=[],g=[],b=[],y=[],f=[];s.forEach(I=>{r+=a[I].atBats,o+=a[I].hits,l.push(r>0?o/r:0),c.push(a[I].runs),u.push(a[I].strikeOuts),m.push(a[I].hitsAllowed),g.push(a[I].walksAllowed),b.push(a[I].pitchCount>0?(a[I].strikes/a[I].pitchCount*100).toFixed(1):0);const E=a[I].earnedRuns,_=a[I].outs/3;f.push(_>0?E*7/_:0),i+=a[I].earnedRuns,d+=a[I].outs;const C=d/3;y.push(C>0?i*7/C:0)}),Bn.batting=new window.Chart(document.getElementById("chart-batting-monthly").getContext("2d"),{type:"bar",data:{labels:s,datasets:[{label:"月間得点",type:"bar",data:c,backgroundColor:"rgba(75, 192, 192, 0.6)",yAxisID:"y"},{label:"累積打率",type:"line",data:l,borderColor:"rgba(255, 99, 132, 1)",yAxisID:"y1"}]},options:{responsive:!0,scales:{y:{position:"left",beginAtZero:!0},y1:{position:"right",beginAtZero:!0,min:0,max:1}}}}),Bn.pitching=new window.Chart(document.getElementById("chart-pitching-monthly").getContext("2d"),{type:"bar",data:{labels:s,datasets:[{label:"奪三振",data:u,backgroundColor:"rgba(54, 162, 235, 0.6)"},{label:"被安打",data:m,backgroundColor:"rgba(255, 159, 64, 0.6)"},{label:"与四死球",data:g,backgroundColor:"rgba(255, 205, 86, 0.6)"},{label:"S率(%)",type:"line",data:b,borderColor:"rgba(153, 102, 255, 1)",yAxisID:"y1"},{label:"累積防御率",type:"line",data:y,borderColor:"rgba(255, 99, 132, 1)",yAxisID:"y2"},{label:"月別防御率",type:"line",data:f,borderColor:"rgba(75, 192, 192, 1)",borderDash:[5,5],yAxisID:"y2"}]},options:{responsive:!0,scales:{y:{position:"left",beginAtZero:!0},y1:{position:"right",beginAtZero:!0,min:0,max:100,grid:{drawOnChartArea:!1}},y2:{position:"right",beginAtZero:!0,grid:{drawOnChartArea:!1}}}}});const p=[],v=[],x=[],h=[],k=[];let L=0,w=0;e.forEach((I,E)=>{const $=I.date?I.date.split("T")[0]:"",{tr:_,or:C,isAntsFirst:O}=ds(I),N=O?I.team_first:I.team_second,P=O?I.team_second:I.team_first,U=I.title||I.category||"試合";k.push({date:$,title:U,myTeam:N||"自チーム",oppTeam:P||"相手チーム",tr:_,or:C,isAntsFirst:O}),v.push(_),x.push(-C),_>C&&L++,w++,h.push(w>0?(L/w*100).toFixed(1):0),p.push([$?$.substring(5):`G${E+1}`,P||""])}),Bn.games=new window.Chart(document.getElementById("chart-games-wl").getContext("2d"),{type:"bar",data:{labels:p,datasets:[{label:"得点",data:v,backgroundColor:"rgba(75, 192, 192, 0.8)"},{label:"失点",data:x,backgroundColor:"rgba(255, 99, 132, 0.8)"},{label:"累積勝率(%)",type:"line",data:h,borderColor:"rgba(255, 205, 86, 1)",yAxisID:"y1"}]},options:{responsive:!0,plugins:{tooltip:{callbacks:{title:function(I){if(!I.length)return"";const E=I[0].dataIndex,$=k[E];return $?`${$.date} 【${$.title}】
${$.myTeam} vs ${$.oppTeam}`:""},label:function(I){const E=I.dataIndex,$=k[E],_=I.dataset.label||"";return _==="得点"?`得点 (${($==null?void 0:$.myTeam)||"自チーム"}): ${I.raw} 点`:_==="失点"?`失点 (${($==null?void 0:$.oppTeam)||"相手チーム"}): ${Math.abs(I.raw)} 点`:_==="累積勝率(%)"?`累積勝率: ${I.raw} %`:`${_}: ${I.raw}`}}}},scales:{x:{stacked:!0,ticks:{font:{size:10}}},y:{stacked:!0,position:"left"},y1:{position:"right",beginAtZero:!0,min:0,max:100}}}})}function Lt(e){let t=0,n=0,a=0,s=0,r=0,o=0,i=0,d=0,l=0,c=0,u=0,m=0,g=0,b=0,y=0;e.forEach(w=>{const I=w.plate_appearances||0,E=w.at_bats||0,$=w.hits||0,_=w.doubles||0,C=w.triples||0,O=w.home_runs||0,N=w.walks||0,P=w.hit_by_pitch||0,U=w.strike_outs||w.strikeouts||0,M=w.sacrifice_flies||w.sac_flies||0,B=w.sacrifice_hits||w.sac_bunts||0,A=w.runs_batted_in||0,T=w.runs||0,D=w.stolen_bases||0;t+=I,n+=E,a+=$,m+=_,g+=C,u+=O,d+=N,l+=P,c+=U,b+=M,y+=B,r+=A,o+=T,i+=D;const H=(w.singles!==void 0?w.singles:Math.max(0,$-_-C-O))*1+_*2+C*3+O*4,W=w.total_bases&&w.total_bases>H?w.total_bases:H;s+=W});const f=n>0?a/n:0,p=n+d+l+b,v=p>0?(a+d+l)/p:t>0?(a+d+l)/t:0,x=n>0?s/n:0,h=v+x,k=a+d+l,L=k>0?o/k:0;return{pa:t,ab:n,h:a,doubles:m,triples:g,hr:u,tb:s,sf:b,sh:y,bb:d,hbp:l,rbi:r,r:o,sb:i,so:c,ob:k,avg:f,obp:v,slg:x,ops:h,runRate:L,avgStr:f.toFixed(3).replace(/^0/,""),obpStr:v.toFixed(3).replace(/^0/,""),slgStr:x.toFixed(3).replace(/^0/,""),opsStr:h.toFixed(3),runRateStr:k>0?(L*100).toFixed(1)+"%":"0.0%",bbRate:t>0?(d+l)/t:0,soRate:t>0?c/t:0}}function St(e){let t=0,n=0,a=0,s=0,r=0,o=0,i=0,d=0,l=0,c=0;e.forEach(f=>{t+=f.outs||0,n+=f.earned_runs||0,a+=f.hits_allowed||0,s+=(f.walks_allowed||0)+(f.hit_batters||0),r+=f.strike_outs||0,o+=f.batters_faced||0,i+=f.pitch_count||0,d+=f.strikes||0,l+=f.wins||0,c+=f.losses||0});const u=t/3,m=u>0?n*7/u:0,g=u>0?(a+s)/u:0,b=u>0?r*7/u:0,y=u>0?s*7/u:0;return{outs:t,er:n,h:a,bb:s,so:r,bf:o,pc:i,st:d,wins:l,losses:c,era:m,whip:g,k7:b,bb7:y,eraStr:m.toFixed(2),whipStr:g.toFixed(2),k7Str:b.toFixed(2),bb7Str:y.toFixed(2),kRate:o>0?r/o:0,bbRate:o>0?s/o:0,kbb:s>0?r/s:r>0?99.9:0,sRate:i>0?d/i:0}}async function ls(){var d,l,c,u,m,g;await Rn();const e=((d=document.getElementById("ps-mode"))==null?void 0:d.value)||"single",t=(l=document.getElementById("ps-player"))==null?void 0:l.value,n=((c=document.getElementById("ps-role"))==null?void 0:c.value)||"batter",a=((u=document.getElementById("ps-limit-games"))==null?void 0:u.value)||"5",s=((m=document.getElementById("ps-ma-unit"))==null?void 0:m.value)||"ab",r=parseInt(((g=document.getElementById("ps-ma-window"))==null?void 0:g.value)||"10",10),o=document.getElementById("ps-single-container"),i=document.getElementById("ps-all-container");e==="single"?(o==null||o.classList.remove("hidden"),i==null||i.classList.add("hidden"),t&&Ao(t,n,a,s,r)):(o==null||o.classList.add("hidden"),i==null||i.classList.remove("hidden"),Mo(n,a,s,r))}function Ao(e,t,n,a,s){var y;const{games:r,bStats:o,pStats:i}=In,d=((y=lt.find(f=>f.id==e))==null?void 0:y.name)||"選手",c=(t==="batter"?o:i).filter(f=>f.player_id==e).map(f=>{const p=r.find(v=>v.id===f.game_id);return{date:(p==null?void 0:p.date)||"",game:p,stats:f}}).filter(f=>f.date).sort((f,p)=>f.date.localeCompare(p.date)),u=t==="batter"?Lt(c.map(f=>f.stats)):St(c.map(f=>f.stats));let m=[...c];if(n!=="all"){const f=parseInt(n,10);m.length>f&&(m=m.slice(m.length-f))}const g=t==="batter"?Lt(m.map(f=>f.stats)):St(m.map(f=>f.stats));Co(d,t,g,u,m);const b=lr(m,t,a,s);Do(d,t,m),No(d,t,b,a,s),Po(t,m)}function Co(e,t,n,a,s){const r=document.getElementById("ps-highlight-cards");if(r)if(t==="batter"){const o=n.avg-a.avg,i=(o>=0?"+":"")+o.toFixed(3).replace(/^0/,""),d=o>=.03,l=o<=-.05,c=d?"🔥 好調":l?"❄️ 不調":"⚖️ 安定",u=d?"bg-red-100 text-red-700 border-red-200":l?"bg-blue-100 text-blue-700 border-blue-200":"bg-gray-100 text-gray-700 border-gray-200";let m=0;for(let g=s.length-1;g>=0;g--){const b=s[g].stats.hits||0,y=s[g].stats.at_bats||0;if(b>0)m++;else if(y>0)break}r.innerHTML=`
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
                <div class="text-xl font-black text-gray-800">${m} <span class="text-xs font-normal text-gray-600">試合連続</span> (${n.h}H)</div>
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
        `}}function lr(e,t,n,a){var r,o,i,d,l,c;const s=[];if(e.length===0)return s;if(n==="game")for(let u=0;u<e.length;u++){const m=Math.max(0,u-a+1),g=e.slice(m,u+1),b=g.map(v=>v.stats),y=t==="batter"?Lt(b):St(b),f=e[u],p=gt((r=f.game)==null?void 0:r.team_first)?(o=f.game)==null?void 0:o.team_second:(i=f.game)==null?void 0:i.team_first;s.push({label:`${f.date.substring(5)} vs ${p||""}`,date:f.date,windowSpan:`${m+1}〜${u+1}試合目 (${g.length}試合)`,calc:y,stats:b})}else for(let u=0;u<e.length;u++){let m=0;const g=[];for(let v=u;v>=0;v--){g.unshift(e[v]);const x=t==="batter"?e[v].stats.at_bats||0:1;if(m+=x,m>=a)break}const b=g.map(v=>v.stats),y=t==="batter"?Lt(b):St(b),f=e[u],p=gt((d=f.game)==null?void 0:d.team_first)?(l=f.game)==null?void 0:l.team_second:(c=f.game)==null?void 0:c.team_first;s.push({label:`${f.date.substring(5)} vs ${p||""}`,date:f.date,windowSpan:t==="batter"?`直近 ${y.ab} 打数`:`直近 ${g.length} 登板`,calc:y,stats:b})}return s}function Do(e,t,n){Pt.rawGraph&&Pt.rawGraph.destroy();const a=document.getElementById("chart-ps-raw-stats");if(!a||n.length===0)return;const s=[],r=[];let o=[];n.forEach(i=>{var c,u,m;o.push(i.stats);const d=gt((c=i.game)==null?void 0:c.team_first)?(u=i.game)==null?void 0:u.team_second:(m=i.game)==null?void 0:m.team_first;s.push(`${i.date.substring(5)} vs ${d||""}`);const l=t==="batter"?Lt(o):St(o);r.push(l)}),t==="batter"?Pt.rawGraph=new window.Chart(a.getContext("2d"),{type:"line",data:{labels:s,datasets:[{label:"累積打率",data:r.map(i=>i.avg),borderColor:"#ef4444",backgroundColor:"#ef4444",tension:.2},{label:"累積出塁率",data:r.map(i=>i.obp),borderColor:"#3b82f6",backgroundColor:"#3b82f6",tension:.2},{label:"累積OPS",data:r.map(i=>i.ops),borderColor:"#8b5cf6",backgroundColor:"#8b5cf6",borderDash:[4,4],tension:.2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"}},scales:{y:{min:0,ticks:{font:{size:10}}},x:{ticks:{font:{size:10},maxRotation:45}}}}}):Pt.rawGraph=new window.Chart(a.getContext("2d"),{type:"line",data:{labels:s,datasets:[{label:"累積防御率",data:r.map(i=>i.era),borderColor:"#ef4444",backgroundColor:"#ef4444",tension:.2},{label:"累積WHIP",data:r.map(i=>i.whip),borderColor:"#3b82f6",backgroundColor:"#3b82f6",tension:.2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"}},scales:{y:{min:0,ticks:{font:{size:10}}},x:{ticks:{font:{size:10},maxRotation:45}}}}})}function No(e,t,n,a,s){const r=document.getElementById("ps-ma-graph-subtitle");r&&(r.textContent=`(${e} - 直近${s}${a==="ab"?"打数/登板":"試合"}移動平均)`),Pt.maGraph&&Pt.maGraph.destroy();const o=n.map(d=>d.label),i=document.getElementById("chart-ps-moving-avg");i&&(t==="batter"?Pt.maGraph=new window.Chart(i.getContext("2d"),{type:"line",data:{labels:o,datasets:[{label:"移動平均 打率",data:n.map(d=>d.calc.avg),borderColor:"#ef4444",backgroundColor:"#ef4444",tension:.2},{label:"移動平均 出塁率",data:n.map(d=>d.calc.obp),borderColor:"#3b82f6",backgroundColor:"#3b82f6",tension:.2},{label:"移動平均 OPS",data:n.map(d=>d.calc.ops),borderColor:"#8b5cf6",backgroundColor:"#8b5cf6",borderDash:[4,4],tension:.2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"}},scales:{y:{min:0,ticks:{font:{size:10}}},x:{ticks:{font:{size:10},maxRotation:45}}}}}):Pt.maGraph=new window.Chart(i.getContext("2d"),{type:"line",data:{labels:o,datasets:[{label:"移動平均 防御率",data:n.map(d=>d.calc.era),borderColor:"#ef4444",backgroundColor:"#ef4444",tension:.2},{label:"移動平均 WHIP",data:n.map(d=>d.calc.whip),borderColor:"#3b82f6",backgroundColor:"#3b82f6",tension:.2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"}},scales:{y:{min:0,ticks:{font:{size:10}}},x:{ticks:{font:{size:10},maxRotation:45}}}}}))}function Po(e,t){const n=document.getElementById("ps-game-thead"),a=document.getElementById("ps-game-tbody"),s=document.getElementById("ps-game-count-label");if(!n||!a)return;s&&(s.textContent=`対象全 ${t.length} 試合（最新順）`);const r=[...t].reverse();e==="batter"?(n.innerHTML=`
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
        `,a.innerHTML=r.map(o=>{var U,M,B;const i=o.stats,d=gt((U=o.game)==null?void 0:U.team_first)?(M=o.game)==null?void 0:M.team_second:(B=o.game)==null?void 0:B.team_first,l=i.plate_appearances||0,c=i.at_bats||0,u=i.hits||0,m=i.doubles||0,g=i.triples||0,b=i.home_runs||0,y=i.singles!==void 0?i.singles:Math.max(0,u-m-g-b),f=i.runs_batted_in||0,p=i.runs||0,v=i.walks||0,x=i.hit_by_pitch||0,h=i.strikeouts||i.strike_outs||0,k=i.sacrifice_flies||i.sac_flies||0,L=(i.sacrifice_hits||i.sac_bunts||0)+k,w=i.stolen_bases||0,I=i.errors||0,E=c>0?(u/c).toFixed(3).replace(/^0/,""):".000",$=c+v+x+k,_=$>0?(u+v+x)/$:l>0?(u+v+x)/l:0;_.toFixed(3).replace(/^0/,"");const C=y+m*2+g*3+b*4,O=i.total_bases&&i.total_bases>C?i.total_bases:C,N=c>0?O/c:0;N.toFixed(3).replace(/^0/,"");const P=(_+N).toFixed(3);return`
                <tr class="hover:bg-gray-50">
                    <td class="p-2 border font-bold">${o.date}</td>
                    <td class="p-2 border">${d||"不明"}</td>
                    <td class="p-2 border text-center">${l}</td>
                    <td class="p-2 border text-center font-bold">${c}</td>
                    <td class="p-2 border text-center text-green-600 font-bold ${u>0?"bg-green-50":""}">${u}</td>
                    <td class="p-2 border text-center">${y}</td>
                    <td class="p-2 border text-center">${m}</td>
                    <td class="p-2 border text-center">${g}</td>
                    <td class="p-2 border text-center text-red-600 font-bold ${b>0?"bg-red-50":""}">${b}</td>
                    <td class="p-2 border text-center font-bold">${f}</td>
                    <td class="p-2 border text-center">${p}</td>
                    <td class="p-2 border text-center">${v}</td>
                    <td class="p-2 border text-center">${x}</td>
                    <td class="p-2 border text-center text-gray-500">${h}</td>
                    <td class="p-2 border text-center">${L}</td>
                    <td class="p-2 border text-center">${w}</td>
                    <td class="p-2 border text-center text-gray-500">${I}</td>
                    <td class="p-2 border text-center font-black text-red-600">${E}</td>
                    <td class="p-2 border text-center font-bold text-purple-700 bg-purple-50">${P}</td>
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
        `,a.innerHTML=r.map(o=>{var w,I,E;const i=o.stats,d=gt((w=o.game)==null?void 0:w.team_first)?(I=o.game)==null?void 0:I.team_second:(E=o.game)==null?void 0:E.team_first,l=i.outs||0,c=`${Math.floor(l/3)}${l%3!==0?"."+l%3:""}`,u=i.pitch_count||0,m=i.strikes||0,g=i.hits_allowed||0,b=i.home_runs_allowed||0,y=i.walks_allowed||0,f=i.hit_batters||0,p=i.strike_outs||0,v=i.runs_allowed||0,x=i.earned_runs||0,h=l/3,k=h>0?(x*7/h).toFixed(2):"0.00",L=h>0?((g+y)/h).toFixed(2):"0.00";return`
                <tr class="hover:bg-gray-50">
                    <td class="p-2 border font-bold">${o.date}</td>
                    <td class="p-2 border">${d||"不明"}</td>
                    <td class="p-2 border text-center font-bold">${c}</td>
                    <td class="p-2 border text-center">${u} (${m})</td>
                    <td class="p-2 border text-center">${g}</td>
                    <td class="p-2 border text-center text-red-600">${b}</td>
                    <td class="p-2 border text-center">${y}</td>
                    <td class="p-2 border text-center">${f}</td>
                    <td class="p-2 border text-center text-green-600 font-bold">${p}</td>
                    <td class="p-2 border text-center text-red-600">${v}</td>
                    <td class="p-2 border text-center text-red-600 font-bold">${x}</td>
                    <td class="p-2 border text-center font-black text-red-600">${k}</td>
                    <td class="p-2 border text-center font-bold text-blue-600">${L}</td>
                </tr>
            `}).join(""))}function Mo(e,t,n,a){const s=document.getElementById("ps-all-title"),r=document.getElementById("ps-all-subtitle"),o=document.getElementById("ps-all-thead"),i=document.getElementById("ps-all-tbody");if(!o||!i)return;const{games:d,bStats:l,pStats:c}=In,u=t==="all"?"全試合":`直近 ${t} 試合`;s&&(s.textContent=`👥 全選手成績一覧 (${e==="batter"?"打撃":"投手"})`),r&&(r.textContent=`対象: ${u} / 移動平均: 直近${a}${n==="ab"?"打数/登板":"試合"} (各列クリックでソート)`);const m=new Set;l.forEach(p=>m.add(p.player_id)),c.forEach(p=>m.add(p.player_id));const b=lt.filter(p=>m.has(p.id)).sort((p,v)=>p.name.localeCompare(v.name)).map(p=>{let h=[...(e==="batter"?l:c).filter(I=>I.player_id==p.id).map(I=>{const E=d.find($=>$.id===I.game_id);return{date:(E==null?void 0:E.date)||"",game:E,stats:I}}).filter(I=>I.date).sort((I,E)=>I.date.localeCompare(E.date))];if(t!=="all"){const I=parseInt(t,10);h.length>I&&(h=h.slice(h.length-I))}const k=e==="batter"?Lt(h.map(I=>I.stats)):St(h.map(I=>I.stats)),L=lr(h,e,n,a),w=L.length>0?L[L.length-1].calc:k;return{player:p,name:p.name,gameCount:h.length,calcPeriod:k,latestMa:w,ab:k.ab,h:k.h,hr:k.hr,rbi:k.rbi,r:k.r,bb:k.bb+k.hbp,avg:k.avg,obp:k.obp,slg:k.slg,ops:k.ops,runRate:k.runRate,maAvg:w.avg,maOps:w.ops,outs:k.outs,so:k.so,pBb:k.bb,wins:k.wins,losses:k.losses,era:k.era,whip:k.whip,maEra:w.era,maWhip:w.whip}}),y=ln[e];b.sort((p,v)=>{let x=p[y.key],h=v[y.key];return x===void 0&&(x=0),h===void 0&&(h=0),typeof x=="string"?y.order==="asc"?x.localeCompare(h):h.localeCompare(x):y.order==="asc"?x-h:h-x});const f=p=>y.key===p?y.order==="asc"?" ▲":" ▼":"";e==="batter"?(o.innerHTML=`
            <tr>
                <th class="p-2 border cursor-pointer select-none hover:bg-gray-200" data-ps-sort="name">選手名<span>${f("name")}</span></th>
                <th class="p-2 border text-center cursor-pointer select-none hover:bg-gray-200" data-ps-sort="gameCount">試合数<span>${f("gameCount")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="ab">打数<span>${f("ab")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="h">安打<span>${f("h")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="hr">HR<span>${f("hr")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="rbi">打点<span>${f("rbi")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 text-green-700 font-bold" data-ps-sort="r">得点<span>${f("r")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 text-blue-700 font-bold" data-ps-sort="bb">四死球<span>${f("bb")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-red-600" data-ps-sort="avg">打率 (${u})<span>${f("avg")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-blue-600" data-ps-sort="obp">出塁率 (${u})<span>${f("obp")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-teal-600" data-ps-sort="slg">長打率 (${u})<span>${f("slg")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-purple-600" data-ps-sort="ops">OPS (${u})<span>${f("ops")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-amber-600" data-ps-sort="runRate">生還率 (R/OB)<span>${f("runRate")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-blue-600" data-ps-sort="maAvg">移動平均 打率<span>${f("maAvg")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-indigo-600" data-ps-sort="maOps">移動平均 OPS<span>${f("maOps")}</span></th>
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
                <th class="p-2 border cursor-pointer select-none hover:bg-gray-200" data-ps-sort="name">選手名<span>${f("name")}</span></th>
                <th class="p-2 border text-center cursor-pointer select-none hover:bg-gray-200" data-ps-sort="gameCount">登板数<span>${f("gameCount")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 text-green-700 font-bold" data-ps-sort="wins">勝利<span>${f("wins")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 text-red-600 font-bold" data-ps-sort="losses">敗戦<span>${f("losses")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="outs">投球回<span>${f("outs")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="so">奪三振<span>${f("so")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200" data-ps-sort="pBb">与四死<span>${f("pBb")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-red-600" data-ps-sort="era">防御率 (${u})<span>${f("era")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-blue-600" data-ps-sort="whip">WHIP (${u})<span>${f("whip")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-red-500" data-ps-sort="maEra">移動平均 防御率<span>${f("maEra")}</span></th>
                <th class="p-2 border text-right cursor-pointer select-none hover:bg-gray-200 font-bold text-blue-500" data-ps-sort="maWhip">移動平均 WHIP<span>${f("maWhip")}</span></th>
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
        `).join("")),o.querySelectorAll("th[data-ps-sort]").forEach(p=>{p.addEventListener("click",()=>{const v=p.dataset.psSort;ln[e].key===v?ln[e].order=ln[e].order==="asc"?"desc":"asc":(ln[e].key=v,ln[e].order=v==="era"||v==="whip"||v==="maEra"||v==="maWhip"||v==="name"?"asc":"desc"),ls()})})}function Oo(){var c,u,m,g,b,y;const e=((c=document.getElementById("ps-mode"))==null?void 0:c.value)||"single",t=((u=document.getElementById("ps-role"))==null?void 0:u.value)||"batter",n=(m=document.getElementById("ps-player"))==null?void 0:m.value,a=((g=lt.find(f=>f.id==n))==null?void 0:g.name)||"全選手";let s="\uFEFF",r=`ants_stats_${e}_${t}_${a}_${new Date().toISOString().substring(0,10)}.csv`,o=null;if(e==="single"?o=(b=document.querySelector("#ps-game-tbody"))==null?void 0:b.closest("table"):o=(y=document.querySelector("#ps-all-tbody"))==null?void 0:y.closest("table"),!o){alert("出力対象のテーブルが見つかりません。");return}Array.from(o.querySelectorAll("tr")).forEach(f=>{const v=Array.from(f.querySelectorAll("th, td")).map(x=>`"${x.textContent.trim().replace(/"/g,'""')}"`).join(",");s+=v+`
`});const d=new Blob([s],{type:"text/csv;charset=utf-8;"}),l=document.createElement("a");l.href=URL.createObjectURL(d),l.download=r,l.click(),URL.revokeObjectURL(l.href)}function Ro(){const{bStats:e,pStats:t}=In,n={},a={};e.forEach(s=>{n[s.player_id]||(n[s.player_id]=[]),n[s.player_id].push(s)}),t.forEach(s=>{a[s.player_id]||(a[s.player_id]=[]),a[s.player_id].push(s)}),Fa.batter=Object.keys(n).map(s=>{var r;return{name:((r=lt.find(o=>o.id==s))==null?void 0:r.name)||"不明",...Lt(n[s])}}).filter(s=>s.pa>0),Fa.pitcher=Object.keys(a).map(s=>{var r;return{name:((r=lt.find(o=>o.id==s))==null?void 0:r.name)||"不明",...St(a[s])}}).filter(s=>s.outs>0),Ha("batter"),Ha("pitcher")}function qo(e,t){Jt[e].key===t?Jt[e].order=Jt[e].order==="asc"?"desc":"asc":(Jt[e].key=t,t==="era"||t==="whip"||t==="bb7"||t==="bbRate"||t==="name"?Jt[e].order="asc":Jt[e].order="desc"),Ha(e)}function Ha(e){const t=Jt[e],n=Fa[e];n.sort((s,r)=>{let o=s[t.key],i=r[t.key];return typeof o=="string"?t.order==="asc"?o.localeCompare(i):i.localeCompare(o):t.order==="asc"?o-i:i-o}),e==="batter"?document.getElementById("ranking-batter-tbody").innerHTML=n.map(s=>`<tr class="border-b"><td class="p-2 font-bold">${s.name}</td><td class="p-2">${s.pa}</td><td class="p-2">${s.avgStr}</td><td class="p-2 text-purple-700 font-bold">${s.opsStr}</td><td class="p-2">${s.obpStr}</td><td class="p-2">${s.slgStr}</td><td class="p-2">${s.h}</td><td class="p-2">${s.bb}</td><td class="p-2">${s.hbp}</td><td class="p-2">${s.rbi}</td><td class="p-2">${s.r}</td><td class="p-2">${s.sb}</td><td class="p-2">${s.hr}</td></tr>`).join(""):document.getElementById("ranking-pitcher-tbody").innerHTML=n.map(s=>`<tr class="border-b"><td class="p-2 font-bold">${s.name}</td><td class="p-2 text-green-700 font-bold">${s.wins}</td><td class="p-2 text-red-600 font-bold">${s.losses}</td><td class="p-2">${s.outs}</td><td class="p-2 text-red-600 font-bold">${s.era.toFixed(2)}</td><td class="p-2">${s.whip.toFixed(2)}</td><td class="p-2">${s.k7.toFixed(2)}</td><td class="p-2">${s.bb7.toFixed(2)}</td><td class="p-2">${s.kRate.toFixed(3)}</td><td class="p-2">${s.bbRate.toFixed(3)}</td><td class="p-2">${(s.sRate*100).toFixed(1)}</td><td class="p-2">${s.kbb.toFixed(2)}</td></tr>`).join(""),document.querySelectorAll(`#tab-content-ranking th[data-role="${e}"] span`).forEach(s=>s.textContent="");const a=document.querySelector(`#tab-content-ranking th[data-role="${e}"][data-sort="${t.key}"] span`);a&&(a.textContent=t.order==="asc"?" ▲":" ▼")}async function Ua(){await Rn();const e=document.getElementById("comp-role").value,t=Array.from(document.querySelectorAll(".comp-player-cb:checked")).map(l=>l.value);Object.values(Ba).forEach(l=>l.destroy()),Ba={};const n=document.getElementById("comp-charts-container");if(n&&(n.innerHTML=""),t.length===0)return;const{games:a,bStats:s,pStats:r}=In,o=[...new Set(a.filter(l=>l.date).map(l=>l.date.split("T")[0]))].sort(),i=["#ef4444","#3b82f6","#10b981","#f59e0b","#8b5cf6","#06b6d4","#ec4899"];(e==="batter"?[{key:"avg",name:"打率"},{key:"ops",name:"OPS"},{key:"obp",name:"出塁率"},{key:"slg",name:"長打率"}]:[{key:"era",name:"防御率"},{key:"whip",name:"WHIP"},{key:"k7",name:"K/7"},{key:"bb7",name:"BB/7"},{key:"sRate",name:"S率(%)"}]).forEach((l,c)=>{const u=`chart-comp-${c}`,m=document.createElement("div");m.className="bg-white p-4 rounded shadow-md relative h-[300px] md:h-[400px]",m.innerHTML=`<canvas id="${u}"></canvas>`,n.appendChild(m);const g=t.map((b,y)=>{var L;const p=(e==="batter"?s:r).filter(w=>w.player_id==b).map(w=>{var I;return{date:((I=a.find(E=>E.id===w.game_id))==null?void 0:I.date.split("T")[0])||"",stats:w}}).filter(w=>w.date).sort((w,I)=>w.date.localeCompare(I.date));let v=[],x={};p.forEach(w=>{v.push(w.stats);let E=(e==="batter"?Lt(v):St(v))[l.key];l.key==="sRate"&&(E=E*100),x[w.date]=E});let h=null;const k=o.map(w=>(x[w]!==void 0&&(h=x[w]),h));return{label:((L=lt.find(w=>w.id==b))==null?void 0:L.name)||"不明",data:k,borderColor:i[y%i.length],spanGaps:!0,tension:.1}});Ba[u]=new window.Chart(document.getElementById(u).getContext("2d"),{type:"line",data:{labels:o,datasets:g},options:{responsive:!0,maintainAspectRatio:!1,plugins:{title:{display:!0,text:`選手比較 (${l.name})`}}}})})}async function Va(){await Rn();const e=document.getElementById("tm-role").value,t=parseInt(document.getElementById("tm-window").value)||5,n=Array.from(document.querySelectorAll(".tm-player-cb:checked")).map(c=>c.value);Object.values(Ta).forEach(c=>c.destroy()),Ta={};const a=document.getElementById("tm-charts-container");if(a&&(a.innerHTML=""),n.length===0)return;const{games:s,bStats:r,pStats:o}=In,i=[...new Set(s.filter(c=>c.date).map(c=>c.date.split("T")[0]))].sort(),d=["#ef4444","#3b82f6","#10b981","#f59e0b","#8b5cf6","#06b6d4","#ec4899"];(e==="batter"?[{key:"avg",name:"打率"},{key:"ops",name:"OPS"},{key:"obp",name:"出塁率"},{key:"slg",name:"長打率"}]:[{key:"era",name:"防御率"},{key:"whip",name:"WHIP"},{key:"k7",name:"K/7"},{key:"bb7",name:"BB/7"},{key:"sRate",name:"S率(%)"}]).forEach((c,u)=>{const m=`chart-tm-${u}`,g=document.createElement("div");g.className="bg-white p-4 rounded shadow-md relative h-[300px] md:h-[400px]",g.innerHTML=`<canvas id="${m}"></canvas>`,a.appendChild(g);const b=n.map((y,f)=>{var L;const v=(e==="batter"?r:o).filter(w=>w.player_id==y).map(w=>{var I;return{date:((I=s.find(E=>E.id===w.game_id))==null?void 0:I.date.split("T")[0])||"",stats:w}}).filter(w=>w.date).sort((w,I)=>w.date.localeCompare(I.date));let x={};for(let w=0;w<v.length;w++){const I=v.slice(Math.max(0,w-t+1),w+1).map(_=>_.stats);let $=(e==="batter"?Lt(I):St(I))[c.key];c.key==="sRate"&&($=$*100),x[v[w].date]=$}let h=null;const k=i.map(w=>(x[w]!==void 0&&(h=x[w]),h));return{label:((L=lt.find(w=>w.id==y))==null?void 0:L.name)||"不明",data:k,borderColor:d[f%d.length],spanGaps:!0,tension:.1}});Ta[m]=new window.Chart(document.getElementById(m).getContext("2d"),{type:"line",data:{labels:i,datasets:b},options:{responsive:!0,maintainAspectRatio:!1,plugins:{title:{display:!0,text:`移動平均 (${c.name})`}}}})})}function cs(){const e=document.getElementById("home-team-list");e&&(e.innerHTML=_e.homeTeamNames.map(t=>`<div class="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2">
            <span>${t}</span>
            <button onclick="window.dashboard_removeHomeTeam('${t}')" class="text-red-500 hover:text-red-700 font-bold">&times;</button>
        </div>`).join(""))}async function Fo(){const e=document.getElementById("new-home-team-name"),t=e.value.trim();if(!t||_e.homeTeamNames.includes(t))return;const n=[..._e.homeTeamNames,t];if(localStorage.setItem("ants_homeTeamNames",JSON.stringify(n)),he==="admin"){F("自チーム名を追加中 (DB同期)...");try{const{error:a}=await S.from("dashboard_settings").upsert({key:"homeTeamNames",value:n},{onConflict:"key"});if(a)throw a}catch(a){console.error("Supabase sync failed",a),console.warn("DBへの同期に失敗しましたが、このブラウザには保存されました: "+a.message)}finally{q()}}_e.homeTeamNames=n,cs(),e.value="",Dt()}window.dashboard_removeHomeTeam=async function(e){if(!confirm(`「${e}」を自チームから削除しますか？`))return;const t=_e.homeTeamNames.filter(n=>n!==e);if(localStorage.setItem("ants_homeTeamNames",JSON.stringify(t)),he==="admin"){F("自チーム名を削除中 (DB同期)...");try{const{error:n}=await S.from("dashboard_settings").upsert({key:"homeTeamNames",value:t},{onConflict:"key"});if(n)throw n}catch(n){console.error("Supabase sync failed",n),console.warn("DBへの同期に失敗しましたが、このブラウザからは削除されました: "+n.message)}finally{q()}}_e.homeTeamNames=t,cs(),Dt()};async function jo(){const e=document.getElementById("csv-import-file"),t=document.getElementById("csv-import-type").value,n=document.getElementById("import-result-msg");if(!e.files||e.files.length===0)return alert("CSVファイルを選択してください。");const a=e.files[0],s=new FileReader;s.onload=async r=>{let o=r.target.result;o=o.replace(/^\uFEFF/,""),t==="pitcher"&&(o=o.replace(/([A-Za-z0-9]+)(\d{3},[^0-9,])/g,`$1
$2`));const i=ko(o);if(i.length<2)return alert("データが空かフォーマットが不正です。");F("データベースへ保存中..."),n.classList.add("hidden");try{const d=new Map,l=new Map,c=[];for(let y=1;y<i.length;y++){const f=i[y];if(f.length<30)continue;const p=parseInt(f[0]),v=parseInt(f[3]);if(isNaN(p)||isNaN(v))continue;d.set(p,{id:p,name:f[1]||"不明",uniform_number:f[2]||null});let x=null;if(f[4]&&f[4].trim()){const k=f[4].trim().replace(/\//g,"-"),L=new Date(k);if(isNaN(L.getTime())){const w=k.split("-");if(w.length===3){const I=parseInt(w[0],10),E=parseInt(w[1],10),$=parseInt(w[2],10);!isNaN(I)&&!isNaN(E)&&!isNaN($)&&(x=`${I}-${String(E).padStart(2,"0")}-${String($).padStart(2,"0")}`)}}else{const w=L.getFullYear(),I=String(L.getMonth()+1).padStart(2,"0"),E=String(L.getDate()).padStart(2,"0");x=`${w}-${I}-${E}`}}l.set(v,{id:v,date:x,team_first:f[5]||null,score:f[6]||null,team_second:f[7]||null,title:f[8]||null,category:f[9]||null,stadium:f[10]||null});const h={player_id:p,game_id:v};t==="batter"?["plate_appearances","at_bats","runs","hits","doubles","triples","home_runs","total_bases","runs_batted_in","stolen_bases","caught_stealing","sacrifice_hits","sacrifice_flies","walks","hit_by_pitch","strike_outs","left_on_base","double_plays","scoring_position_at_bats","scoring_position_hits","go","fo"].forEach((L,w)=>h[L]=parseInt(f[11+w])||0):t==="pitcher"&&["is_starter","wins","losses","saves","holds","qs","outs","pitch_count","strikes","batters_faced","at_bats","hits_allowed","home_runs_allowed","walks_allowed","hit_batters","strike_outs","runs_allowed","earned_runs","wild_pitches","balks","sacrifice_hits_allowed","sacrifice_flies_allowed","go","fo"].forEach((L,w)=>h[L]=parseInt(f[11+w])||0),c.push(h)}const{error:u}=await S.from("players").upsert(Array.from(d.values()));if(u)throw u;const{error:m}=await S.from("games").upsert(Array.from(l.values()));if(m)throw m;const g=t==="batter"?"batter_stats":"pitcher_stats",{error:b}=await S.from(g).upsert(c,{onConflict:"player_id, game_id"});if(b)throw b;await ae("IMPORT_CSV",`成績データ(${t==="batter"?"打者":"投手"})を${c.length}件インポートしました`),n.textContent=`成功: ${c.length} 件のデータをインポートしました。`,n.className="mt-4 text-sm font-bold text-green-600",n.classList.remove("hidden"),e.value="",dr()}catch(d){n.textContent=`エラー: ${d.message}`,n.className="mt-4 text-sm font-bold text-red-600",n.classList.remove("hidden")}finally{q()}},s.readAsText(a)}function Ho(){const e=document.getElementById("detail-analysis-file");if(!e||!e.files||e.files.length===0){alert("ファイルを選択してください。");return}const t=e.files[0],n=new FileReader;n.onload=function(a){try{const s=JSON.parse(a.target.result),r=s.cat&&Array.isArray(s.cat)?s.cat.length:0,o=s.sys&&Array.isArray(s.sys)?s.sys.length:0;let i="なし",d=0;if(s.sys){const c=s.sys.find(m=>m.ke==="sysdata23");if(c&&c.va)try{const m=JSON.parse(c.va);m&&m.pcl&&(i=`${m.pcl.length} 件のイベント`)}catch{i="解析失敗"}const u=s.sys.find(m=>m.ke==="sysdata12");u&&u.va&&(d=u.va.split(",").length)}if(vt=Uo(s),!vt){alert("詳細データのパースに失敗しました。sysdata23 が見つかりません。");return}document.getElementById("detail-stats-cat-count").textContent=r,document.getElementById("detail-stats-sys-count").textContent=o,document.getElementById("detail-stats-has-pcl").textContent=i,document.getElementById("detail-stats-ground-count").textContent=d;const l=["<strong>イニング別の詳細スコア分析</strong>: イニングごとの詳細なプレイ記録から得点パターン（何回の攻撃が得点に結びつきやすいか、どのようなアウトの取られ方をしているか）を可視化しました。","<strong>打撃イベント分析（アウトの種類・打球方向）</strong>: プレイログの「サードゴロ」「レフトヒット」などの実況テキストをパースし、各打者の打球方向やアウトの種類の割合を集計しました。","<strong>走塁・盗塁成否分析</strong>: プレイログから「盗塁成功」「盗塁失敗」などのイベントを検出し、選手ごとの走塁成功率やシチュエーションごとの傾向を分析しました。","<strong>エラー発生状況の分析</strong>: 実況テキストに含まれる送球エラーや落球などのキーワードから、守備位置ごとのエラー数やエラーの起こりやすいタイミングを特定しました。","<strong>連続打席・チャンス時の打撃結果</strong>: ランナーがいる場面での打撃内容や、打席ごとの一球単位のボールカウント（ストライク・ボール推移）に応じた結果の相関関係を分析しました。"];document.getElementById("detail-analysis-suggestions").innerHTML=l.map(c=>`<li>${c}</li>`).join(""),document.getElementById("detail-analysis-result").classList.remove("hidden"),document.getElementById("detail-analysis-dashboard").classList.remove("hidden"),Vo()}catch(s){console.error(s),alert("JSONデータのパースに失敗しました。ファイルの形式が正しいか確認してください。")}},n.readAsText(t)}function Uo(e){const t=e.sys?e.sys.find(i=>i.ke==="sysdata23"):null;if(!t||!t.va)return null;let n=[];try{n=JSON.parse(t.va).pcl||[]}catch(i){return console.error("Failed to parse sysdata23.va",i),null}const a={innings:{},batters:{},steals:{},errors:{byInning:{},byPosition:{},byPlayer:{}},counts:{}};let s="1回表",r=null;const o=i=>[2,3,4,5,6,7].includes(i);return n.forEach(i=>{const d=i.rnr,l=i.ball,c=i.strk;i.codes&&i.codes.forEach(u=>{if(!u.pli||!u.pli.sPlay)return;const m=u.pli.sPlay.trim(),g=u.cd||"",b=m.match(/^(\d+回(?:表|ｳﾗ|裏))/);b&&(s=b[1],a.innings[s]||(a.innings[s]={runs:0,outs:{strikeout:0,groundout:0,flyout:0,other:0}}));const y=m.match(/^\d+番(.+?)(?:#\d+)?$/);if(y&&(r=y[1].trim(),a.batters[r]||(a.batters[r]={pa:0,ab:0,hits:0,strikeout:0,walk:0,groundout:0,flyout:0,otherout:0,rbi:0,chances:{pa:0,hits:0,rbi:0},directions:{left:0,center:0,right:0,inner:0,other:0},counts:{}}),a.batters[r].pa++,o(d)&&a.batters[r].chances.pa++),(m.includes("生還")||m.includes("本塁生還")||m.includes("ホームイン"))&&(a.innings[s]&&a.innings[s].runs++,r&&(a.batters[r].rbi++,o(d)&&a.batters[r].chances.rbi++)),m.includes("盗塁")){const f=m.match(/(?:ランナー|打者)(.+?)(?:\d+塁|本塁|$)/);if(f){const p=f[1].replace(/\d+$/,"").trim();p&&p!=="打者"&&(a.steals[p]||(a.steals[p]={attempts:0,success:0,fail:0}),a.steals[p].attempts++,m.includes("失敗")||m.includes("アウト")?a.steals[p].fail++:a.steals[p].success++)}}if(m.includes("エラー")||m.includes("失策")||m.includes("ファンブル")||m.includes("後逸")||m.includes("暴投")||m.includes("捕逸")){a.errors.byInning[s]=(a.errors.byInning[s]||0)+1;const f=m.match(/(ピッチャー|キャッチャー|ファースト|セカンド|サード|ショート|レフト|センター|ライト)/);f?a.errors.byPosition[f[1]]=(a.errors.byPosition[f[1]]||0)+1:a.errors.byPosition.その他=(a.errors.byPosition.その他||0)+1,lt.forEach(p=>{p.name&&m.includes(p.name)&&(a.errors.byPlayer[p.name]||(a.errors.byPlayer[p.name]=[]),a.errors.byPlayer[p.name].push({inning:s,play:m}))})}if(r){const f=a.batters[r];if(g.startsWith("H")||g.startsWith("Go")||g.startsWith("Fo")||g.startsWith("Ko")||g.startsWith("Bb")){const v=`${l}-${c}`;a.counts[v]||(a.counts[v]={pa:0,hits:0}),a.counts[v].pa++,g.startsWith("H")&&a.counts[v].hits++,f.counts[v]||(f.counts[v]={pa:0,hits:0}),f.counts[v].pa++,g.startsWith("H")&&f.counts[v].hits++}m.includes("ヒット")||m.includes("安打")||m.includes("ツーベース")||m.includes("スリーベース")||m.includes("ホームラン")||m.includes("本塁打")?(f.hits++,f.ab++,o(d)&&f.chances.hits++,m.includes("レフト")?f.directions.left++:m.includes("センター")?f.directions.center++:m.includes("ライト")?f.directions.right++:m.includes("内野")?f.directions.inner++:f.directions.other++):m.includes("フォアボール")||m.includes("デッドボール")||m.includes("四球")||m.includes("死球")?f.walk++:m.includes("三振")?(f.strikeout++,f.ab++,a.innings[s]&&a.innings[s].outs.strikeout++):m.includes("ゴロ")?(f.groundout++,f.ab++,a.innings[s]&&a.innings[s].outs.groundout++,m.includes("サード")||m.includes("ショート")?f.directions.left++:m.includes("セカンド")||m.includes("ファースト")?f.directions.right++:f.directions.inner++):m.includes("フライ")||m.includes("ライナー")?(f.flyout++,f.ab++,a.innings[s]&&a.innings[s].outs.flyout++,m.includes("レフト")?f.directions.left++:m.includes("センター")?f.directions.center++:m.includes("ライト")?f.directions.right++:f.directions.inner++):m.includes("アウト")&&(m.includes("打者")||m.includes("バッター"))&&(f.otherout++,f.ab++,a.innings[s]&&a.innings[s].outs.other++)}})}),a}function Vo(){if(!vt)return;const e=document.getElementById("detail-player-select");if(e){const t=lt.map(a=>a.name.trim()),n=Object.keys(vt.batters).filter(a=>t.some(s=>a.includes(s)||s.includes(a))).sort();if(n.length===0){e.innerHTML='<option value="">該当する選手がいません</option>';return}e.innerHTML=n.map(a=>`<option value="${a}">${a}</option>`).join(""),e.onchange=function(a){Ps(a.target.value)},Ps(n[0])}}async function Ps(e){if(!vt||!e)return;await Rn();const t=vt.batters[e]||{pa:0,ab:0,hits:0,strikeout:0,walk:0,groundout:0,flyout:0,otherout:0,rbi:0,chances:{pa:0,hits:0},directions:{left:0,center:0,right:0,inner:0,other:0},counts:{}};document.getElementById("stat-p-hits").textContent=t.hits,document.getElementById("stat-p-strikeouts").textContent=t.strikeout,document.getElementById("stat-p-groundouts").textContent=t.groundout,document.getElementById("stat-p-flyouts").textContent=t.flyout,document.getElementById("stat-p-walks").textContent=t.walk||0,document.getElementById("stat-p-others").textContent=t.otherout;const n=t.ab||t.pa-(t.walk||0),a=n>0?t.hits/n:0;document.getElementById("stat-p-avg").textContent=a===1?"1.000":a.toFixed(3).substring(1),bt.playerBattingResult&&bt.playerBattingResult.destroy();const s=document.getElementById("chart-detail-player-batting-result").getContext("2d");bt.playerBattingResult=new window.Chart(s,{type:"doughnut",data:{labels:["安打","三振","ゴロ","フライ","四死球","他"],datasets:[{data:[t.hits,t.strikeout,t.groundout,t.flyout,t.walk||0,t.otherout],backgroundColor:["#10B981","#EF4444","#FBBF24","#3B82F6","#6366F1","#9CA3AF"]}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}}}}),bt.playerDirection&&bt.playerDirection.destroy();const r=[t.directions.left,t.directions.center,t.directions.right,t.directions.inner,t.directions.other],o=document.getElementById("chart-detail-player-direction").getContext("2d");bt.playerDirection=new window.Chart(o,{type:"doughnut",data:{labels:["レフト","センター","ライト","内野","その他"],datasets:[{data:r,backgroundColor:["#EC4899","#3B82F6","#14B8A6","#F59E0B","#8B5CF6"]}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",labels:{boxWidth:10,font:{size:10}}}}}});const i=t.chances.pa,d=t.chances.hits,l=i>0?d/i:0;document.getElementById("stat-p-chance-avg").textContent=l===1?"1.000":l.toFixed(3).substring(1),document.getElementById("stat-p-chance-detail").textContent=`${i}打席 ${d}安打`,document.getElementById("stat-p-rbi").textContent=t.rbi;let c={attempts:0,success:0};const u=Object.keys(vt.steals).find(h=>e.includes(h)||h.includes(e));u&&(c=vt.steals[u]);const m=c.attempts>0?c.success/c.attempts*100:0;document.getElementById("stat-p-steal-rate").textContent=m.toFixed(1)+"%",document.getElementById("stat-p-steal-detail").textContent=`成功 ${c.success} / 企図 ${c.attempts}`;const g=vt.errors.byPlayer[e]||[];document.getElementById("stat-p-errors-count").textContent=`${g.length} 件`;const b=document.getElementById("stat-p-errors-detail");b&&(g.length===0?b.innerHTML='<div class="text-gray-400 text-center py-2">期間内エラーの記録はありません</div>':b.innerHTML=g.map(h=>`
                <div class="border-b pb-1 last:border-0 mb-1">
                    <span class="font-bold text-blue-600 bg-blue-50 px-1 rounded">${h.inning}</span>
                    <span class="text-gray-700">${h.play}</span>
                </div>
            `).join(""));const y=t.counts||{},f=["0-0","1-0","2-0","3-0","0-1","1-1","2-1","3-1","0-2","1-2","2-2","3-2"],p=f.map(h=>y[h]?y[h].pa:0),v=f.map(h=>y[h]?y[h].hits:0);bt.playerCount&&bt.playerCount.destroy();const x=document.getElementById("chart-detail-player-count").getContext("2d");bt.playerCount=new window.Chart(x,{type:"bar",data:{labels:f.map(h=>h+" count"),datasets:[{label:"打席数",data:p,backgroundColor:"rgba(99, 102, 241, 0.6)"},{label:"安打数",data:v,backgroundColor:"rgba(16, 185, 129, 0.8)"}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{y:{beginAtZero:!0,ticks:{stepSize:1}}}}})}const Go="https://arcdgbzqfengqyvfbodt.supabase.co",Wo="sb_publishable_Ei6ti5lKjAECmi36haftpw_DQsKMp4p";let Be=null;try{!window.supabaseClient&&window.supabase&&window.supabase.createClient&&(window.supabaseClient=window.supabase.createClient(Go,Wo)),Be=window.supabaseClient}catch(e){console.error("Supabase Client initialize error:",e)}let we=[],ke="team_default",at=[],me=[],Ie=[],He="",Yn=null;function on(){return we.find(e=>e.id===ke)||we[0]||{id:"team_default",name:"ありんこアントス (A軍)"}}function qn(){return me.filter(e=>(e.teamId||"team_default")===ke)}function zo(){if(!Yn){const e=on();Yn={id:"",name:"新規配置データ",teamId:ke,mode:ee,basePositions:{},customSubstitutions:[],battingOrder:{},headerInfo:{date:"",tournament:"",teamHome:e.name||"ありんこアントス",teamVisitor:"",manager:"",captain:"",scorer:"",stadium:"",time:""}}}return Yn}function Ee(){return Ie.find(e=>e.id===He)||zo()}let $e=null,be=null,ee=9;const Et={p:"投手",c:"捕手","1b":"一塁手","2b":"二塁手","3b":"三塁手",ss:"遊撃手",lf:"左翼手",cf:"中堅手",rf:"右翼手",dh:"指名打者"},pn={p:"1",c:"2","1b":"3","2b":"4","3b":"5",ss:"6",lf:"7",cf:"8",rf:"9",dh:"DH"},Jo={1:"p",2:"c",3:"1b",4:"2b",5:"3b",6:"ss",7:"lf",8:"cf",9:"rf",10:"dh",d:"dh",dh:"dh",DH:"dh"},ct=["p","c","1b","2b","3b","ss","lf","cf","rf"],ut=["p","c","1b","2b","3b","ss","lf","cf","rf","dh"];async function Kn(){try{if(Ci(),await Ko(),Ht(),ba(),$n(),Ie.length>0){He=Ie[0].id;const e=document.getElementById("sim-pattern-select");e&&(e.value=He);const t=Ee();t&&(ee=t.mode||9,t.teamId&&we.some(n=>n.id===t.teamId)&&(ke=t.teamId,Ht()))}Ut(),na("setup"),Oe(),pe()}catch(e){console.error("Fatal initialization error:",e),alert(`アプリケーションの初期化中にエラーが発生しました。
詳細: `+e.message)}}function Yo(e){return e&&(e.basePositions||(e.basePositions={}),e.customSubstitutions||(e.customSubstitutions=[]),e.battingOrder||(e.battingOrder={}),e.headerInfo||(e.headerInfo={}),e.teamId||(e.teamId=e.headerInfo.teamId||"team_default"),e.mode===void 0&&(e.mode=9),e)}async function Ko(){let e=!1;if(Be)try{const{data:t,error:n}=await Be.from("sim_players").select("*").order("created_at",{ascending:!0}),{data:a,error:s}=await Be.from("sim_patterns").select("*").order("created_at",{ascending:!1}),{data:r}=await Be.from("master_data").select("data").eq("key","SIM_TEAMS").single(),{data:o}=await Be.from("master_data").select("data").eq("key","SIM_TEMPLATES").single(),{data:i}=await Be.from("master_data").select("data").eq("key","SIM_PLAYERS_MAP").single();if(r&&Array.isArray(r.data)&&r.data.length>0?we=r.data:we=[{id:"team_default",name:"ありんこアントス (A軍)"},{id:"team_b",name:"ありんこアントス (B軍・ジュニア)"}],ke=we[0].id,o&&Array.isArray(o.data)?at=o.data:at=[],!n&&!s&&t&&a){const d=i&&typeof i.data=="object"?i.data:{};me=t.map(l=>({id:l.id,name:l.name,number:l.number||"",teamId:l.team_id||d[l.id]||"team_default"})),Ie=a.map(l=>{var c;return Yo({id:l.id,name:l.name,teamId:((c=l.header_info)==null?void 0:c.teamId)||"team_default",mode:l.has_dh?10:9,basePositions:l.base_positions||{},customSubstitutions:l.custom_substitutions||[],battingOrder:l.batting_order||{},headerInfo:l.header_info||{},created_at:l.created_at,updated_at:l.updated_at,isSynced:!0})}),Ie.sort((l,c)=>{const u=new Date(l.updated_at||l.created_at||(l.id.startsWith("pat_")?parseInt(l.id.replace("pat_","")):0)).getTime()||0;return(new Date(c.updated_at||c.created_at||(c.id.startsWith("pat_")?parseInt(c.id.replace("pat_","")):0)).getTime()||0)-u}),e=!0}else n&&console.error("Supabase load players error:",n),s&&console.error("Supabase load patterns error:",s)}catch(t){console.error("Supabase load failed:",t)}e||(we=[{id:"team_default",name:"ありんこアントス (A軍)"},{id:"team_b",name:"ありんこアントス (B軍・ジュニア)"}],ke=we[0].id,at=[],me=[{id:"p1",name:"とあ",number:"2",teamId:"team_default"},{id:"p2",name:"そうま",number:"10",teamId:"team_default"},{id:"p3",name:"あきと",number:"3",teamId:"team_default"},{id:"p4",name:"ゆうき",number:"4",teamId:"team_default"},{id:"p5",name:"あいのすけ",number:"1",teamId:"team_default"},{id:"p6",name:"けんせい",number:"6",teamId:"team_default"},{id:"p7",name:"りゅうと",number:"7",teamId:"team_default"},{id:"p8",name:"ながまさ",number:"8",teamId:"team_default"},{id:"p9",name:"そうすけ",number:"9",teamId:"team_default"},{id:"p10",name:"たいち",number:"5",teamId:"team_default"}],Ie=[])}async function us(){if(!Be)return null;try{const e=await Be.from("master_data").upsert({key:"SIM_TEAMS",data:we});return e?e.error:null}catch(e){return console.error("Supabase teams sync error:",e),e}}async function cr(){if(!Be)return null;try{const e=await Be.from("master_data").upsert({key:"SIM_TEMPLATES",data:at});return e?e.error:null}catch(e){return console.error("Supabase templates sync error:",e),e}}async function Qo(){if(!Be)return null;try{const e={};me.forEach(t=>{e[t.id]=t.teamId||"team_default"}),await Be.from("master_data").upsert({key:"SIM_PLAYERS_MAP",data:e})}catch(e){console.error("Supabase players map sync error:",e)}}async function ga(e,t=!1){if(!Be)return null;try{let n;return t?n=await Be.from("sim_players").delete().eq("id",e.id):n=await Be.from("sim_players").upsert({id:e.id,name:e.name,number:e.number}),await Qo(),n?n.error:null}catch(n){return console.error("Supabase player sync error:",n),n}}async function ta(e,t=!1){if(!Be)return null;try{let n;if(t)n=await Be.from("sim_patterns").delete().eq("id",e.id);else{const a={...e.headerInfo||{},teamId:e.teamId||ke};n=await Be.from("sim_patterns").upsert({id:e.id,name:e.name,has_dh:e.mode===10,base_positions:e.basePositions,custom_substitutions:e.customSubstitutions,batting_order:e.battingOrder||{},header_info:a,updated_at:new Date().toISOString()})}return n?n.error:null}catch(n){return console.error("Supabase pattern sync error:",n),n}}async function Ue(e){e&&(await ta(e),$n())}function Ht(){const e=document.getElementById("sim-team-select"),t=document.getElementById("new-sim-team"),n=document.getElementById("sim-current-team-label"),a=on();n&&(n.textContent=`[${a.name}]`),e&&(e.innerHTML="",we.forEach(s=>{const r=document.createElement("option");r.value=s.id,r.textContent=s.name,e.appendChild(r)}),e.value=ke),t&&(t.innerHTML="",we.forEach(s=>{const r=document.createElement("option");r.value=s.id,r.textContent=s.name,t.appendChild(r)}),t.value=ke)}function ba(){const e=document.getElementById("sim-template-select-inline"),t=document.getElementById("new-sim-template");e&&(e.innerHTML='<option value="">(選択して適用)</option>',at.forEach(n=>{const a=document.createElement("option");a.value=n.id,a.textContent=n.name,e.appendChild(a)})),t&&(t.innerHTML='<option value="">(未配置から開始)</option>',at.forEach(n=>{const a=document.createElement("option");a.value=n.id,a.textContent=n.name,t.appendChild(a)}))}async function Zo(e="",t=null,n=null,a=null){const s="pat_"+Date.now(),r=t||ke,o=we.find(m=>m.id===r)||on();let i={},d={},l=a!==null?a:ee;if(n){const m=at.find(g=>g.id===n);m&&(i=JSON.parse(JSON.stringify(m.basePositions||{})),d=JSON.parse(JSON.stringify(m.battingOrder||{})),l=m.mode||l)}ee=l,ke=r;const c={id:s,name:e||"新規データ",teamId:r,mode:ee,basePositions:i,customSubstitutions:[],battingOrder:d,headerInfo:{date:"",tournament:"",teamHome:o.name||"ありんこアントス",teamVisitor:"",manager:"",captain:"",scorer:"",stadium:"",time:""}};Ie.unshift(c),He=s,await Ue(c),Ht(),Ut(),$n();const u=document.getElementById("sim-pattern-select");u&&(u.value=s)}function $n(){const e=document.getElementById("sim-pattern-select");e&&(e.innerHTML='<option value="">選択してください...</option>',Ie.forEach(t=>{const n=document.createElement("option");n.value=t.id;const a=t.isSynced===!1?" (未同期)":"",s=we.find(o=>o.id===t.teamId),r=s?`[${s.name}] `:"";n.textContent=r+t.name+a,e.appendChild(n)}),He&&(e.value=He))}function Ut(){const e=document.getElementById("btn-sim-mode-9"),t=document.getElementById("btn-sim-mode-10");ee===9?(e.className="px-3 py-1.5 text-xs font-bold bg-amber-600 text-white transition",t.className="px-3 py-1.5 text-xs font-bold bg-white text-gray-700 border-l hover:bg-gray-50 transition"):(e.className="px-3 py-1.5 text-xs font-bold bg-white text-gray-700 transition",t.className="px-3 py-1.5 text-xs font-bold bg-amber-600 text-white border-l hover:bg-gray-50 transition")}function Fn(e){const t={...e.basePositions||{}},n=ee===9?ct:ut;return Object.keys(t).forEach(s=>{n.includes(s)||delete t[s]}),(e.customSubstitutions||[]).filter(s=>s.active).forEach(s=>{if(s.type==="swap"){const{pos1:r,pos2:o}=s.details;if(n.includes(r)&&n.includes(o)){const i=t[r];t[r]=t[o],t[o]=i}}else if(s.type==="sub"){const{outPlayerId:r,inPlayerId:o,pos:i}=s.details;if(r){const d=Object.keys(t).find(l=>t[l]===r);d&&(t[d]=o)}else i&&n.includes(i)&&(t[i]=o)}else if(s.type==="rotation"){const o=s.details.positions.filter(i=>n.includes(i));if(o.length>1){const i=o.map(d=>t[d]);for(let d=0;d<o.length;d++){const l=i[(d-1+o.length)%o.length];t[o[d]]=l}}}}),t}function jn(e){const t=new Set;return(e.customSubstitutions||[]).filter(a=>a.active).forEach(a=>{a.type==="sub"&&a.details.outPlayerId&&t.add(a.details.outPlayerId)}),t}function hn(e){e.battingOrder||(e.battingOrder={});const t=ee===9?ct:ut,n=e.basePositions||{},a=new Set;t.forEach(i=>{n[i]&&a.add(n[i])}),Object.keys(e.battingOrder).forEach(i=>{const d=e.battingOrder[i];a.has(d)||delete e.battingOrder[i]});const s=new Set(Object.values(e.battingOrder)),r=[];a.forEach(i=>{s.has(i)||r.push(i)});const o=t.length;for(let i=1;i<=o&&r.length!==0;i++)if(!e.battingOrder[i]){const d=r.shift();e.battingOrder[i]=d}}function pe(){const e=Ee();if(!e)return;const t=Fn(e),n=jn(e),a=new Set(Object.values(t).filter(Boolean));hn(e),Xo(a,n),ei(a,n),ti(t,e),ni(e),ai(e),si(e)}function Xo(e,t){const n=document.getElementById("sim-players-list"),a=document.getElementById("sim-player-count");if(!n)return;n.innerHTML="";const s=qn();if(a&&(a.textContent=`${s.length} 人`),s.length===0){n.innerHTML='<span class="text-xs text-gray-400 p-2">このチームに登録されている選手がいません。</span>';return}s.forEach(r=>{const o=e.has(r.id),i=t.has(r.id),d=$e===r.id&&be==="players-list",l=document.createElement("div");l.className=`sim-player-badge ${o?"assigned":""} ${i?"retired":""} ${d?"selected":""}`,l.setAttribute("data-player-id",r.id),!o&&!i&&(l.setAttribute("draggable","true"),l.addEventListener("dragstart",ur));const c=r.number?`#${r.number} `:"";l.innerHTML=`
            <span>${c}${ge(r.name)}${i?" (交代済)":""}</span>
            <span class="sim-player-delete-btn" data-player-id="${r.id}">×</span>
        `,l.addEventListener("click",u=>{if(u.target.classList.contains("sim-player-delete-btn")){Ei(r.id);return}o||i||pr(r.id,"players-list")}),n.appendChild(l)})}function ei(e,t){const n=document.getElementById("sim-bench-list");if(!n)return;n.innerHTML="";const s=qn().filter(r=>!e.has(r.id)&&!t.has(r.id));if(s.length===0){n.innerHTML='<span class="text-xs text-gray-400 p-1">控え選手はいません。</span>';return}s.forEach(r=>{const o=$e===r.id&&be==="bench",i=document.createElement("div");i.className=`sim-player-badge sim-bench-badge ${o?"selected":""}`,i.setAttribute("data-player-id",r.id),i.setAttribute("draggable","true");const d=r.number?`#${r.number} `:"";i.innerHTML=`<span>${d}${ge(r.name)}</span>`,i.addEventListener("dragstart",ur),i.addEventListener("click",()=>{pr(r.id,"bench")}),n.appendChild(i)})}function ti(e,t){const n=document.getElementById("sim-field-positions");if(!n)return;n.innerHTML="",(ee===9?ct:ut).forEach(s=>{const r=e[s],o=me.find(u=>u.id===r),i=(t.basePositions||{})[s]!==r&&r,d=$e&&be===s,l=document.createElement("div");l.className=`sim-pos-slot pos-${s} ${d?"swap-selected":""}`,l.setAttribute("data-position",s),l.addEventListener("dragover",di),l.addEventListener("dragleave",li),l.addEventListener("drop",ci),l.addEventListener("click",()=>{ui(s)});const c=o&&o.number?`#${o.number} `:"";l.innerHTML=`
            <div class="sim-pos-title">${Et[s]}</div>
            <div class="sim-pos-player ${i?"player-changed":""}">
                ${o?c+ge(o.name):'<span class="text-gray-300 text-xs font-normal">未配置</span>'}
            </div>
        `,n.appendChild(l)})}function ni(e){const t=document.getElementById("sim-batting-order-list");if(!t)return;t.innerHTML="";const n=ee===9?ct:ut,a=n.length,s=e.basePositions||{},r={};n.forEach(o=>{const i=s[o];i&&(r[i]=o)});for(let o=1;o<=a;o++){const i=e.battingOrder[o],d=i?me.find(f=>f.id===i):null,l=d?r[d.id]:null,c=l?Et[l]:"未配置",u=document.createElement("div");d?u.className="flex items-center justify-between bg-amber-50/50 border border-amber-100 rounded-lg p-2 text-xs transition-colors duration-150":u.className="flex items-center justify-between bg-gray-50/50 border border-dashed border-gray-200 rounded-lg p-2 text-xs text-gray-400 transition-colors duration-150";const m=document.createElement("div");m.className="flex items-center gap-1 shrink-0";const g=document.createElement("button");g.className="px-2 py-1 bg-amber-100 hover:bg-amber-200 disabled:opacity-30 disabled:cursor-not-allowed text-amber-900 font-bold rounded text-[10px] leading-none transition shadow-sm",g.textContent="▲",o===1&&(g.disabled=!0),g.addEventListener("click",()=>Ms(o,"up"));const b=document.createElement("button");b.className="px-2 py-1 bg-amber-100 hover:bg-amber-200 disabled:opacity-30 disabled:cursor-not-allowed text-amber-900 font-bold rounded text-[10px] leading-none transition shadow-sm",b.textContent="▼",o===a&&(b.disabled=!0),b.addEventListener("click",()=>Ms(o,"down")),m.appendChild(g),m.appendChild(b);let y="";if(d){const f=d.number?`#${d.number} `:"";y=`
                <div class="flex items-center gap-2">
                    <span class="bg-amber-600 text-white font-bold rounded-full w-5 h-5 flex items-center justify-center text-[10px]">${o}</span>
                    <span class="font-bold text-gray-800">${f}${ge(d.name)}</span>
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
            `;u.innerHTML=y,u.appendChild(m),t.appendChild(u)}}async function Ms(e,t){const n=Ee();if(!n)return;n.battingOrder||(n.battingOrder={});const a=t==="up"?e-1:e+1,r=(ee===9?ct:ut).length;if(a<1||a>r)return;const o=n.battingOrder[e],i=n.battingOrder[a];o&&i?(n.battingOrder[e]=i,n.battingOrder[a]=o):o?(n.battingOrder[a]=o,delete n.battingOrder[e]):i&&(n.battingOrder[e]=i,delete n.battingOrder[a]),await Ue(n),pe()}function ms(e,t,n){if(!e)return{code:"",desc:"",fullDesc:""};if(e.type==="sub"){const{outPlayerId:a,inPlayerId:s}=e.details,r=me.find(y=>y.id===a),o=me.find(y=>y.id===s),i=r?r.name:"不明",d=o?o.name:"不明",l=Object.keys(t).find(y=>t[y]===a),c=l&&pn[l]||"",u=l?Et[l]||"":"選手",m=c?`交代 (${c})`:"交代",g=n?`<span class="font-bold text-amber-900">${ge(i)}</span>に代わって<span class="font-bold text-amber-900">${ge(d)}</span>`:`${i}に代わって${d}`,b=`${u}の${i}に代わりまして、${d}が入ります。`;return{code:m,desc:g,fullDesc:b}}else if(e.type==="rotation"){const a=e.details.positions||[],r=a.map(l=>pn[l]||l).join("-"),o=[];for(let l=0;l<a.length-1;l++){const c=a[l],u=a[l+1],m=t[c],g=me.find(b=>b.id===m);if(g){const b=n?`<span class="font-bold text-amber-900">${ge(g.name)}</span>`:g.name;o.push(`${b}が${Et[u]}`)}}const i=o.join("、"),d=i?`${i}へ。`:"ポジション交代";return{code:r,desc:i,fullDesc:d}}else if(e.type==="swap"){const{pos1:a,pos2:s}=e.details,r=t[a],o=t[s],i=me.find(v=>v.id===r),d=me.find(v=>v.id===o),l=pn[a]||a,c=pn[s]||s,u=Et[a]||"",m=Et[s]||"",g=i?i.name:"未配置",b=d?d.name:"未配置",y=`${l}⇔${c}`,f=n?`<span class="font-bold text-amber-900">${ge(g)}</span>と<span class="font-bold text-amber-900">${ge(b)}</span>の入れ替え`:`${g}と${b}の入れ替え`,p=`${u}の${g}と${m}の${b}が入れ替わります。`;return{code:y,desc:f,fullDesc:p}}return{code:"",desc:"",fullDesc:""}}function ai(e){const t=document.getElementById("sim-sub-rules-list");if(!t)return;t.innerHTML="";const n=e.customSubstitutions||[];if(n.length===0){t.innerHTML='<p class="text-xs text-gray-400 text-center py-4">登録された交代はありません。</p>';return}const a=ee===9?ct:ut;let s={...e.basePositions||{}};n.forEach(r=>{const o=ms(r,s,!0);if(r.active){if(r.type==="swap"){const{pos1:l,pos2:c}=r.details;if(a.includes(l)&&a.includes(c)){const u=s[l];s[l]=s[c],s[c]=u}}else if(r.type==="sub"){const{outPlayerId:l,inPlayerId:c,pos:u}=r.details;if(l){const m=Object.keys(s).find(g=>s[g]===l);m&&(s[m]=c)}else u&&a.includes(u)&&(s[u]=c)}else if(r.type==="rotation"){const c=r.details.positions.filter(u=>a.includes(u));if(c.length>1){const u=c.map(m=>s[m]);for(let m=0;m<c.length;m++){const g=u[(m-1+c.length)%c.length];s[c[m]]=g}}}}const i=document.createElement("div");i.className=`sub-rule-card ${r.active?"active":""}`;const d=r.name?`<span class="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded leading-none inline-block mb-1 border border-amber-200/50">${ge(r.name)}</span>`:"";i.innerHTML=`
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
        `,i.querySelector('input[type="checkbox"]').addEventListener("change",l=>{ri(r.id,l.target.checked)}),i.querySelector(".btn-delete-rule").addEventListener("click",()=>{ii(r.id)}),t.appendChild(i)})}function si(e){const t=document.getElementById("sim-announcement-logs");if(!t)return;t.innerHTML="";const n=(e.customSubstitutions||[]).filter(r=>r.active);if(n.length===0){t.innerHTML='<p class="text-xs text-gray-400 text-center py-2">適用中の交代はありません（基本配置のままです）。</p>';return}const a=ee===9?ct:ut;let s={...e.basePositions||{}};n.forEach(r=>{const o=ms(r,s,!1);if(r.type==="swap"){const{pos1:l,pos2:c}=r.details;if(a.includes(l)&&a.includes(c)){const u=s[l];s[l]=s[c],s[c]=u}}else if(r.type==="sub"){const{outPlayerId:l,inPlayerId:c,pos:u}=r.details;if(l){const m=Object.keys(s).find(g=>s[g]===l);m&&(s[m]=c)}else u&&a.includes(u)&&(s[u]=c)}else if(r.type==="rotation"){const c=r.details.positions.filter(u=>a.includes(u));if(c.length>1){const u=c.map(m=>s[m]);for(let m=0;m<c.length;m++){const g=u[(m-1+c.length)%c.length];s[c[m]]=g}}}const i=r.name?`【${ge(r.name)}】`:"",d=document.createElement("div");d.className="announcement-item",d.innerHTML=`
            <span class="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0">${o.code}</span>
            <span class="text-xs font-semibold truncate text-amber-900">${i}${o.fullDesc}</span>
        `,t.appendChild(d)})}function Oe(){const e=Ee();if(!e)return;const t=ee===9?ct:ut,n=document.getElementById("sub-player-out"),a=document.getElementById("sub-player-in"),s=Fn(e),r=new Set(Object.values(s).filter(Boolean)),o=jn(e);if(n&&(n.innerHTML="",t.forEach(d=>{var c;const l=s[d];if(l){const u=((c=me.find(g=>g.id===l))==null?void 0:c.name)||"未配置",m=document.createElement("option");m.value=l,m.textContent=`${u} (${Et[d]})`,n.appendChild(m)}})),a){a.innerHTML="";const l=qn().filter(c=>!r.has(c.id)&&!o.has(c.id));l.length===0?a.innerHTML='<option value="">控え選手なし</option>':l.forEach(c=>{const u=document.createElement("option");u.value=c.id,u.textContent=c.name,a.appendChild(u)})}const i=document.getElementById("rot-input-text");i&&(i.value="")}async function ri(e,t){const n=Ee();if(!n)return;const a=n.customSubstitutions.find(s=>s.id===e);a&&(a.active=t,await Ue(n),Oe(),pe())}async function oi(){const e=Ee();if(!e)return;const t=document.getElementById("rule-type-select"),n=t?t.value:"rotation";let a={};if(n==="sub"){const d=document.getElementById("sub-player-out").value,l=document.getElementById("sub-player-in").value;if(!d){alert("退く選手を選択してください。");return}if(!l){alert("入る控え選手を選択してください。");return}a={outPlayerId:d,inPlayerId:l}}else if(n==="rotation"){const d=document.getElementById("rot-input-text"),l=d?d.value.trim():"";if(!l){alert("交代ルートを入力してください（例: 1-3-1）。");return}if(!/^[0-9a-zA-Z]+(-[0-9a-zA-Z]+)*$/.test(l)){alert("入力形式が正しくありません。半角数字・英字とハイフンで入力してください（例: 1-3-1）。");return}const c=l.split("-").filter(Boolean);if(c.length<2){alert("交代には最低2つのポジションが必要です（例: 1-3）。");return}const u=ee===9?ct:ut,m=[];for(const g of c){const b=Jo[g];if(!b){alert(`無効なポジション番号「${g}」が含まれています。1〜9またはDHを指定してください。`);return}if(!u.includes(b)){alert(`ポジション「${g}」(${Et[b]||b})は、現在の守備モード（DH${ee===10?"あり":"なし"}）では使用できません。`);return}m.push(b)}for(let g=0;g<m.length-1;g++)if(m[g]===m[g+1]){alert("隣り合うポジションに同じものを指定することはできません（例: 1-1-3 は不可）。");return}a={positions:m}}const s=document.getElementById("rule-name-input"),r=s?s.value.trim():"",o={id:"rule_"+Date.now(),name:r,type:n,active:!1,details:a};e.customSubstitutions||(e.customSubstitutions=[]),e.customSubstitutions.push(o),await Ue(e),s&&(s.value="");const i=document.getElementById("rot-input-text");i&&(i.value=""),Oe(),pe(),na("subrules")}async function ii(e){const t=Ee();t&&(t.customSubstitutions=t.customSubstitutions.filter(n=>n.id!==e),await Ue(t),Oe(),pe())}function na(e){const t=document.getElementById("tab-btn-setup"),n=document.getElementById("tab-btn-subrules"),a=document.getElementById("panel-setup"),s=document.getElementById("panel-subrules");e==="setup"?(t.className="flex-1 py-2 px-3 text-center text-sm font-bold bg-amber-600 text-white transition",n.className="flex-1 py-2 px-3 text-center text-sm font-bold bg-white text-gray-700 border-l hover:bg-gray-50 transition",a.classList.remove("hidden"),s.classList.add("hidden")):(t.className="flex-1 py-2 px-3 text-center text-sm font-bold bg-white text-gray-700 transition",n.className="flex-1 py-2 px-3 text-center text-sm font-bold bg-amber-600 text-white border-l hover:bg-gray-50 transition font-bold",a.classList.add("hidden"),s.classList.remove("hidden"))}function ur(e){const t=e.currentTarget.getAttribute("data-player-id");e.dataTransfer.setData("text/plain",t);let n="bench";e.currentTarget.parentNode.id==="sim-players-list"&&(n="players-list"),e.dataTransfer.setData("source-pos",n)}function di(e){e.preventDefault(),e.currentTarget.classList.add("drag-over")}function li(e){e.currentTarget.classList.remove("drag-over")}function ci(e){e.preventDefault(),e.currentTarget.classList.remove("drag-over");const t=e.dataTransfer.getData("text/plain"),n=e.currentTarget.getAttribute("data-position");!t||!n||mr(t,n)}async function mr(e,t){const n=Ee();if(!n)return;n.basePositions||(n.basePositions={});let a=null;Object.keys(n.basePositions).forEach(r=>{n.basePositions[r]===e&&(a=r)});const s=n.basePositions[t];a&&(n.basePositions[a]=s),n.basePositions[t]=e,hn(n),await Ue(n),$e=null,be=null,Oe(),pe()}function pr(e,t){$e===e&&be===t?($e=null,be=null):($e=e,be=t),pe()}async function ui(e){const t=Ee();if(!t)return;t.basePositions||(t.basePositions={});const n=t.basePositions[e];if($e)if(be!=="players-list"&&be!=="bench"){const a=t.basePositions[be];t.basePositions[be]=n,t.basePositions[e]=a,hn(t),await Ue(t),$e=null,be=null,Oe(),pe()}else mr($e,e);else n&&($e=n,be=e,pe())}async function mi(e){const t=Ee();t&&(t.basePositions||(t.basePositions={}),t.basePositions[e]=null,hn(t),await Ue(t),$e=null,be=null,Oe(),pe())}async function pi(){const e=prompt(`新しいチーム名を入力してください:
(例: ありんこアントス (B軍), ジュニア選抜など)`);if(!e||!e.trim())return;const t=e.trim();if(we.some(a=>a.name===t)){alert("同じ名前のチームが既に存在します。");return}const n={id:"team_"+Date.now(),name:t};we.push(n),ke=n.id,await us(),Ht(),pe()}async function fi(){const e=on(),t=prompt("チーム名を変更してください:",e.name);if(!t||!t.trim())return;const n=t.trim();if(n!==e.name){if(we.some(a=>a.id!==e.id&&a.name===n)){alert("同じ名前のチームが既に存在します。");return}e.name=n,await us(),Ht(),$n(),pe()}}async function gi(){if(we.length<=1){alert("登録チームが1つのみのため、削除できません。");return}const e=on(),t=qn();let n=`チーム「${e.name}」を削除しますか？`;if(t.length>0&&(n+=`
※このチームに登録されている ${t.length} 名の選手データも削除されます。`),!confirm(n))return;const a=new Set(t.map(s=>s.id));me=me.filter(s=>!a.has(s.id));for(const s of t)await ga(s,!0);we=we.filter(s=>s.id!==e.id),ke=we[0].id,await us(),Ht(),pe()}function bi(e){ke=e.target.value;const t=document.getElementById("sim-current-team-label"),n=on();t&&(t.textContent=`[${n.name}]`),$e=null,be=null,Oe(),pe()}async function yi(){const e=Ee();if(!e)return;const t=e.name?`${e.name}の基本形`:"基本配置パターン",n=prompt(`初期パターン（テンプレート）の登録名を入力してください:
(例: A軍 守備基本形、10人制DH基本配置など)`,t);if(!n||!n.trim())return;const a=n.trim(),s={id:"tmpl_"+Date.now(),name:a,mode:ee,basePositions:JSON.parse(JSON.stringify(e.basePositions||{})),battingOrder:JSON.parse(JSON.stringify(e.battingOrder||{}))};at.push(s),await cr(),ba(),alert(`初期パターン「${a}」を登録しました。
新規作成時や初期パターンセレクタからいつでも適用できます。`)}async function hi(e){if(!e)return;const t=at.find(s=>s.id===e);if(!t)return;if(!confirm(`初期パターン「${t.name}」を現在のグラウンドに適用しますか？
（現在のスタメン配置・打順が上書きされます）`)){const s=document.getElementById("sim-template-select-inline");s&&(s.value="");return}const n=Ee();n&&(n.basePositions=JSON.parse(JSON.stringify(t.basePositions||{})),n.battingOrder=JSON.parse(JSON.stringify(t.battingOrder||{})),t.mode&&(n.mode=t.mode,ee=t.mode,Ut()),await Ue(n));const a=document.getElementById("sim-template-select-inline");a&&(a.value=""),Oe(),pe()}async function xi(){const e=document.getElementById("sim-template-select-inline"),t=e?e.value:"";if(!t){alert("削除したい初期パターンを選択してください。");return}const n=at.find(a=>a.id===t);n&&confirm(`初期パターン「${n.name}」を削除しますか？`)&&(at=at.filter(a=>a.id!==t),await cr(),ba(),alert(`初期パターン「${n.name}」を削除しました。`))}function vi(){const e=document.getElementById("sim-new-modal");if(!e)return;Ht(),ba();const t=document.getElementById("new-sim-name");if(t){const r=new Date,o=`${r.getFullYear()}/${String(r.getMonth()+1).padStart(2,"0")}/${String(r.getDate()).padStart(2,"0")}`;t.value=`${o} 練習試合`}const n=document.getElementById("new-sim-team");n&&(n.value=ke);const a=document.getElementById("new-sim-template");a&&(a.value="");const s=document.querySelector(`input[name="new-sim-dh-mode"][value="${ee}"]`);s&&(s.checked=!0),e.classList.remove("hidden")}function Ga(){const e=document.getElementById("sim-new-modal");e&&e.classList.add("hidden")}async function wi(){const e=document.getElementById("new-sim-name"),t=document.getElementById("new-sim-team"),n=document.getElementById("new-sim-template"),a=document.querySelector('input[name="new-sim-dh-mode"]:checked'),s=e?e.value.trim():"",r=t?t.value:ke,o=n?n.value:null,i=a?parseInt(a.value,10):9;if(!s){alert("シミュレーションデータ名を入力してください。");return}await Zo(s,r,o,i),Ga(),Oe(),pe()}async function Aa(){const e=document.getElementById("sim-new-player-input"),t=document.getElementById("sim-new-player-number");if(!e)return;const n=e.value.trim(),a=t?t.value.trim():"";if(!n)return;if(qn().some(o=>o.name===n)){alert("このチームには同じフルネームの選手が既に登録されています。");return}const r={id:"p_"+Date.now()+"_"+Math.random().toString(36).substr(2,5),name:n,number:a,teamId:ke};me.push(r),await ga(r),e.value="",t&&(t.value=""),Oe(),pe()}async function Ei(e){const t=me.find(n=>n.id===e);if(t&&confirm(`選手「${t.name}」を削除しますか？
（データベースの全データ配置・交代設定からも削除されます）`)){me=me.filter(n=>n.id!==e),await ga(t,!0);for(const n of Ie){let a=!1;if(n.basePositions||(n.basePositions={}),Object.keys(n.basePositions).forEach(s=>{n.basePositions[s]===e&&(n.basePositions[s]=null,a=!0)}),n.battingOrder&&Object.keys(n.battingOrder).forEach(s=>{n.battingOrder[s]===e&&(delete n.battingOrder[s],a=!0)}),n.customSubstitutions){const s=n.customSubstitutions.length;n.customSubstitutions=n.customSubstitutions.filter(r=>r.type==="sub"?r.details.outPlayerId!==e&&r.details.inPlayerId!==e:!0),n.customSubstitutions.length!==s&&(a=!0)}a&&await Ue(n)}$e===e&&($e=null,be=null),Oe(),pe()}}async function _i(){const e=document.getElementById("sim-pattern-select");if(!e)return;const t=e.value;let n=!1,a=null,s="";const r=Ee();if(t){const o=e.options[e.selectedIndex];confirm(`現在「${o.text}」が選択されています。
このデータに上書き保存しますか？
（「キャンセル」を選ぶと新規保存になります）`)&&(n=!0,s=o.text,a=t)}if(!n){const o=r?r.name:"新規配置データ",i=prompt("保存名を入力してください：",o);if(!i)return;if(s=i.trim(),!s){alert("有効な保存名を入力してください。");return}}try{if(n&&a){if(r){r.name=s,r.teamId=ke,r.mode=ee,r.updated_at=new Date().toISOString();const i=await ta(r);if(i)throw i;const d=Ie.findIndex(l=>l.id===r.id);d>0&&(Ie.splice(d,1),Ie.unshift(r)),alert(`データ「${s}」を上書き保存しました。`)}}else{const i="pat_"+Date.now(),d=on(),l=new Date().toISOString(),c={id:i,name:s,teamId:ke,mode:ee,created_at:l,updated_at:l,basePositions:r?{...r.basePositions||{}}:{},customSubstitutions:r?JSON.parse(JSON.stringify(r.customSubstitutions||[])):[],battingOrder:r?{...r.battingOrder||{}}:{},headerInfo:r?JSON.parse(JSON.stringify(r.headerInfo||{})):{date:"",tournament:"",teamHome:d.name||"ありんこアントス",teamVisitor:"",manager:"",captain:"",scorer:"",stadium:"",time:""}};Ie.unshift(c),He=i;const u=await ta(c);if(u)throw u;alert(`データ「${s}」を保存しました。`)}$n();const o=document.getElementById("sim-pattern-select");o&&(o.value=He),pe()}catch(o){console.error("Save pattern error:",o),alert(`保存に失敗しました。
エラー詳細: ${o.message||o}`)}}async function Ii(){const e=Ee();if(!e||!e.id){alert("削除する配置データが選択されていません。");return}if(!confirm(`配置データ「${e.name}」を削除しますか？
（データベースから削除されます）`))return;Ie=Ie.filter(n=>n.id!==He);const t=await ta(e,!0);Ie.length>0?He=Ie[0].id:He="",$n(),alert(t?`データ「${e.name}」のデータベースからの削除に失敗しました。
エラー詳細: ${t.message||t}`:`データ「${e.name}」を削除しました。`),$e=null,be=null,Ut(),Oe(),pe()}async function $i(e){const t=e.target.value;if(!t)He="",Yn=null,$e=null,be=null,pe();else{He=t;const n=Ee();n&&(ee=n.mode||9,n.teamId&&we.some(a=>a.id===n.teamId)&&(ke=n.teamId,Ht())),$e=null,be=null,Ut(),Oe(),pe()}}function ki(){const e=Ee();if(!e)return;const t=Fn(e),n=jn(e),a=e.headerInfo||{};document.getElementById("member-input-date").value=a.date||"",document.getElementById("member-input-tournament").value=a.tournament||"",document.getElementById("member-input-team-home").value=a.teamHome||"ありんこアントス",document.getElementById("member-input-team-visitor").value=a.teamVisitor||"",document.getElementById("member-input-manager").value=a.manager||"",document.getElementById("member-input-captain").value=a.captain||"",document.getElementById("member-input-scorer").value=a.scorer||"",document.getElementById("member-input-stadium").value=a.stadium||"",document.getElementById("member-input-time").value=a.time||"",fr(e,t,n);const s=document.getElementById("sim-member-modal");s&&s.classList.remove("hidden")}function Li(){const e=Ee();if(!e)return;e.headerInfo||(e.headerInfo={}),e.headerInfo.date=document.getElementById("member-input-date").value.trim(),e.headerInfo.tournament=document.getElementById("member-input-tournament").value.trim(),e.headerInfo.teamHome=document.getElementById("member-input-team-home").value.trim(),e.headerInfo.teamVisitor=document.getElementById("member-input-team-visitor").value.trim(),e.headerInfo.manager=document.getElementById("member-input-manager").value.trim(),e.headerInfo.captain=document.getElementById("member-input-captain").value.trim(),e.headerInfo.scorer=document.getElementById("member-input-scorer").value.trim(),e.headerInfo.stadium=document.getElementById("member-input-stadium").value.trim(),e.headerInfo.time=document.getElementById("member-input-time").value.trim(),Ue(e);const t=Fn(e),n=jn(e);fr(e,t,n)}function fr(e,t,n){const a=ee===9?ct:ut,s=e.headerInfo||{};let r=`【 メンバー表 (Ants) 】
`;r+=`日時: ${s.date||"未設定"}  時間: ${s.time||"未設定"}
`,r+=`大会: ${s.tournament||"未設定"}  球場: ${s.stadium||"未設定"}
`,r+=`対戦: ${s.teamHome||"未設定"} vs ${s.teamVisitor||"未設定"}
`,r+=`監督: ${s.manager||"未設定"}  主将: ${s.captain||"未設定"}  スコアラー: ${s.scorer||"未設定"}
`,r+=`------------------------------------

`,r+=`◆ スターティングメンバー (打順順)
`;const o=a.length,i=e.basePositions||{},d={};a.forEach(g=>{const b=i[g];b&&(d[b]=g)});for(let g=1;g<=o;g++){const b=e.battingOrder[g];if(b){const y=me.find(p=>p.id===b),f=d[b];if(y&&f){const p=pn[f],v=y.number?` [#${y.number}]`:"";r+=`${g}. [${p}] ${Et[f]} : ${y.name}${v}
`}}}r+=`
◆ 控え選手 (ベンチ)
`;const l=new Set(Object.values(t).filter(Boolean)),c=me.filter(g=>!l.has(g.id)&&!n.has(g.id));c.length===0?r+=`(なし)
`:c.forEach(g=>{const b=g.number?` [#${g.number}]`:"";r+=`・${g.name}${b}
`}),r+=`
◆ 交代履歴
`;const u=(e.customSubstitutions||[]).filter(g=>g.active);if(u.length===0)r+=`(なし: 基本配置のままです)
`;else{let g={...e.basePositions||{}};u.forEach((b,y)=>{const f=ms(b,g,!1);if(r+=`${y+1}. [${f.code}] ${f.fullDesc}
`,b.type==="swap"){const{pos1:p,pos2:v}=b.details,x=g[p];g[p]=g[v],g[v]=x}else if(b.type==="sub"){const{outPlayerId:p,inPlayerId:v}=b.details,x=Object.keys(g).find(h=>g[h]===p);x&&(g[x]=v)}else if(b.type==="rotation"){const p=b.details.positions,v=p.map(x=>g[x]);for(let x=0;x<p.length;x++){const h=v[(x-1+p.length)%p.length];g[p[x]]=h}}})}const m=document.getElementById("sim-member-text");m&&(m.value=r)}function Si(){const e=document.getElementById("sim-member-text");e&&(e.select(),document.execCommand("copy"),alert("メンバー表をクリップボードにコピーしました！"))}function Os(){const e=document.getElementById("sim-member-modal");e&&e.classList.add("hidden")}function Bi(){const e=Ee();if(!e)return;const t=Fn(e),n=jn(e),a=ee===9?ct:ut,s=e.headerInfo||{},r=e.basePositions||{},o={};a.forEach(b=>{const y=r[b];y&&(o[y]=b)});const i=a.length,d=[];for(let b=1;b<=i;b++){const y=e.battingOrder[b];if(y){const f=me.find(v=>v.id===y),p=o[y];f&&p&&d.push({order:b,posNum:pn[p],name:f.name,number:f.number||""})}}for(;d.length<9;)d.push({order:d.length+1,posNum:"",name:"",number:""});const l=new Set(Object.values(t).filter(Boolean)),c=me.filter(b=>!l.has(b.id)&&!n.has(b.id)),u=[];for(let b=0;b<6;b++){const y=b*2,f=b*2+1,p=c[y],v=c[f];u.push({leftName:p?p.name:"",leftNumber:p&&p.number||"",rightName:v?v.name:"",rightNumber:v&&v.number||""})}let m="";for(let b=1;b<=4;b++){let y="";d.forEach(x=>{y+=`
                <tr>
                    <td class="cell-order">${x.order}</td>
                    <td class="cell-pos">${x.posNum}</td>
                    <td class="cell-name">${ge(x.name)}</td>
                    <td class="cell-number">${x.number}</td>
                </tr>
            `}),ee===10&&d.length<10&&(y+='<tr><td class="cell-order">10</td><td class="cell-pos"></td><td class="cell-name"></td><td class="cell-number"></td></tr>');const f=ee===10?11:10,p=d.length;for(let x=p;x<f;x++)y+='<tr><td class="cell-order"></td><td class="cell-pos"></td><td class="cell-name"></td><td class="cell-number"></td></tr>';let v="";u.forEach(x=>{v+=`
                <tr>
                    <td class="cell-bench-name">${ge(x.leftName)}</td>
                    <td class="cell-bench-num">${x.leftNumber}</td>
                    <td class="cell-bench-name">${ge(x.rightName)}</td>
                    <td class="cell-bench-num">${x.rightNumber}</td>
                </tr>
            `}),m+=`
            <div class="sheet-card">
                <div class="card-page-idx">(${b}/4)</div>
                <div class="card-title">メンバー表</div>
                
                <div class="header-table-wrapper">
                    <!-- 1行目: 日付・大会名 -->
                    <table class="table-header table-header-top">
                        <tr>
                            <td class="cell-date font-variable">${ge(s.date||"")}</td>
                            <td class="cell-tournament font-variable">${ge(s.tournament||"")}</td>
                        </tr>
                    </table>
                    <!-- 2行目: 自チーム・相手チーム -->
                    <table class="table-header table-header-bottom">
                        <tr>
                            <td class="cell-team-label-l cell-label-vertical"><span class="label-v-wrap">チーム</span></td>
                            <td class="cell-team-val font-variable">${ge(s.teamHome||"")}</td>
                            <td class="cell-team-label-r cell-label-vertical"><span class="label-v-wrap">相手チーム</span></td>
                            <td class="cell-team-val font-variable">${ge(s.teamVisitor||"")}</td>
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
                        ${v}
                    </tbody>
                </table>
                
                <table class="table-footer">
                    <tr>
                        <td class="footer-label">監督</td>
                        <td class="footer-val font-variable">${ge(s.manager||"")}</td>
                        <td class="footer-label">主将</td>
                        <td class="footer-val font-variable">${ge(s.captain||"")}</td>
                        <td class="footer-label font-sans leading-none" style="font-size: 6.5px; padding: 0; text-align: center; white-space: nowrap;"><span style="display: inline-block; transform: scaleX(0.75); transform-origin: center;">スコアラー</span></td>
                        <td class="footer-val font-variable">${ge(s.scorer||"")}</td>
                    </tr>
                    <tr>
                        <td class="footer-label">球場</td>
                        <td colspan="3" class="footer-val font-variable">${ge(s.stadium||"")}</td>
                        <td class="footer-label">時間</td>
                        <td class="footer-val font-variable">${ge(s.time||"")}</td>
                    </tr>
                </table>
            </div>
        `}const g=window.open("","_blank");if(!g){alert("ポップアップブロックが有効になっているため、印刷用画面を開けませんでした。許可してください。");return}g.document.write(`
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
                ${m}
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
    `),g.document.close()}function Ti(){const e=Ee();if(!e)return;const t={version:"ants-sim-3.0",players:me,pattern:e},n=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),a=URL.createObjectURL(n),s=document.createElement("a");s.href=a,s.download=`ants_positions_${e.name.replace(/[\s/\\?%*:|"<>\.]/g,"_")}.json`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(a)}function Ai(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=async function(a){try{const s=JSON.parse(a.target.result);if(s.version!=="ants-sim-3.0"&&s.version!=="ants-sim-2.0"&&s.version!=="ants-sim-1.0"){alert("ファイル形式が正しくありません。");return}if(confirm(`インポートを実行しますか？
※既存の選手リストと配置データがマージ/追加されます。`)){for(const r of s.players)me.some(o=>o.id===r.id||o.name===r.name)||(me.push(r),await ga(r));if(s.version==="ants-sim-3.0"){const r=s.pattern;r.id="pat_"+Date.now(),r.name=r.name+" (インポート)",Ie.push(r),He=r.id,ee=r.mode,await Ue(r)}else if(s.version==="ants-sim-2.0"){const r=s.pattern;r.id="pat_"+Date.now(),r.name=r.name+" (インポート)",r.mode=r.mode||9,r.battingOrder={},r.headerInfo={},Ie.push(r),He=r.id,ee=r.mode,await Ue(r)}else{const r=s.pattern,o=r.innings&&r.innings[0]?r.innings[0].positions:{},i={id:"pat_"+Date.now(),name:r.name+" (旧移行)",mode:r.mode||9,basePositions:o,customSubstitutions:[],battingOrder:{},headerInfo:{}};Ie.push(i),He=i.id,ee=i.mode,await Ue(i)}Ut(),Oe(),pe(),alert("インポートが完了しました。")}}catch(s){console.error(s),alert("ファイルの読み込みに失敗しました。")}e.target.value=""},n.readAsText(t)}function Ci(){var s,r,o,i,d,l,c,u,m,g,b,y,f,p,v,x,h,k,L,w,I,E,$,_,C,O,N,P,U,M,B,A,T;const e=document.getElementById("btn-toggle-players-panel"),t=document.getElementById("players-panel-content"),n=document.getElementById("icon-toggle-players");e&&t&&n&&(e.addEventListener("click",()=>{const G=t.classList.toggle("hidden");n.textContent=G?"▼":"▲",localStorage.setItem("ants_sim_players_panel_collapsed",G?"true":"false")}),localStorage.getItem("ants_sim_players_panel_collapsed")==="true"&&(t.classList.add("hidden"),n.textContent="▼")),(s=document.getElementById("tab-btn-setup"))==null||s.addEventListener("click",()=>na("setup")),(r=document.getElementById("tab-btn-subrules"))==null||r.addEventListener("click",()=>na("subrules")),(o=document.getElementById("rule-type-select"))==null||o.addEventListener("change",D=>{const G=D.target.value;document.getElementById("form-sub").classList.add("hidden"),document.getElementById("form-rotation").classList.add("hidden"),G==="sub"?document.getElementById("form-sub").classList.remove("hidden"):G==="rotation"&&document.getElementById("form-rotation").classList.remove("hidden")}),(i=document.getElementById("btn-export-member-table"))==null||i.addEventListener("click",ki),(d=document.getElementById("btn-copy-member-text"))==null||d.addEventListener("click",Si),(l=document.getElementById("btn-close-member-modal"))==null||l.addEventListener("click",Os),(c=document.getElementById("btn-close-member-modal-footer"))==null||c.addEventListener("click",Os),(u=document.getElementById("btn-print-member-table"))==null||u.addEventListener("click",Bi),["member-input-date","member-input-tournament","member-input-team-home","member-input-team-visitor","member-input-manager","member-input-captain","member-input-scorer","member-input-stadium","member-input-time"].forEach(D=>{var G;(G=document.getElementById(D))==null||G.addEventListener("input",Li)}),(m=document.getElementById("btn-create-sub-rule"))==null||m.addEventListener("click",oi),(g=document.getElementById("btn-add-sim-player"))==null||g.addEventListener("click",Aa),(b=document.getElementById("sim-new-player-input"))==null||b.addEventListener("keypress",D=>{D.key==="Enter"&&Aa()}),(y=document.getElementById("sim-new-player-number"))==null||y.addEventListener("keypress",D=>{D.key==="Enter"&&Aa()}),(f=document.getElementById("sim-team-select"))==null||f.addEventListener("change",bi),(p=document.getElementById("btn-add-sim-team"))==null||p.addEventListener("click",pi),(v=document.getElementById("btn-edit-sim-team"))==null||v.addEventListener("click",fi),(x=document.getElementById("btn-delete-sim-team"))==null||x.addEventListener("click",gi),(h=document.getElementById("sim-template-select-inline"))==null||h.addEventListener("change",D=>hi(D.target.value)),(k=document.getElementById("btn-save-as-template"))==null||k.addEventListener("click",yi),(L=document.getElementById("btn-delete-template"))==null||L.addEventListener("click",xi),(w=document.getElementById("btn-open-new-sim-modal"))==null||w.addEventListener("click",vi),(I=document.getElementById("btn-close-new-sim-modal"))==null||I.addEventListener("click",Ga),(E=document.getElementById("btn-close-new-sim-modal-footer"))==null||E.addEventListener("click",Ga),($=document.getElementById("btn-create-new-sim"))==null||$.addEventListener("click",wi),(_=document.getElementById("sim-pattern-select"))==null||_.addEventListener("change",$i),(C=document.getElementById("btn-save-sim-pattern"))==null||C.addEventListener("click",_i),(O=document.getElementById("btn-delete-sim-pattern"))==null||O.addEventListener("click",Ii),(N=document.getElementById("btn-sim-mode-9"))==null||N.addEventListener("click",async()=>{if(ee!==9){ee=9,Ut();const D=Ee();D&&(D.mode=9,hn(D),await Ue(D)),Oe(),pe()}}),(P=document.getElementById("btn-sim-mode-10"))==null||P.addEventListener("click",async()=>{if(ee!==10){ee=10,Ut();const D=Ee();D&&(D.mode=10,hn(D),await Ue(D)),Oe(),pe()}}),(U=document.getElementById("btn-export-sim"))==null||U.addEventListener("click",Ti),(M=document.getElementById("import-sim-input"))==null||M.addEventListener("change",Ai),(B=document.getElementById("btn-back-to-menu-sim"))==null||B.addEventListener("click",()=>{$e=null,be=null,Q("app-menu-view")}),(A=document.getElementById("btn-logout-sim"))==null||A.addEventListener("click",()=>{var D;(D=document.getElementById("btn-logout"))==null||D.click()}),(T=document.getElementById("sim-bench-list"))==null||T.addEventListener("click",D=>{D.target.id==="sim-bench-list"&&$e&&be!=="players-list"&&be!=="bench"&&mi(be)})}function ge(e){return typeof e!="string"?"":e.replace(/[&<>'"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[t]||t)}let gr=null,Mt=null,en=!1;const tn="ants_surveys_v1",gn="ants_survey_responses_v1";let te=[],fe=[];const Rs=[{id:"survey_sample_1",title:"【夏季合宿】参加日程調整 & お弁当・合宿Tシャツ注文とりまとめ",description:`少年野球チーム Arinko Ants 夏季合宿（8月開催）の出欠日程および備品・お弁当の事前注文確認です。
**1回の送信で、保護者様ご本人と選手（兄弟含む）全員分の出欠・注文をまとめてご登録いただけます。**
ご不明な点がありましたら役員までお問い合わせください。`,status:"active",deadline:"2026-07-20 23:59",public_results:!0,enable_schedule:!0,schedule_options:["8/8(土) 午前 (練習・遠征)","8/8(土) 午後 (練習試合・BBQ)","8/8(土) 宿泊","8/9(日) 終日 (紅白戦・グラウンド納め)"],enable_family:!0,enable_orders:!0,order_items:[{id:"item_lunch_sat",name:"8/8(土) 選手・保護者弁当",price:650,max:10},{id:"item_lunch_sun",name:"8/9(日) 選手・保護者弁当",price:650,max:10},{id:"item_tshirt",name:"合宿記念チームTシャツ",price:2200,max:5},{id:"item_cap",name:" Ants オリジナル冷感タオル",price:800,max:5}],questions:[{id:"q_attendance",type:"single",title:"合宿全体の参加可否をお選びください",required:!0,options:[{label:"参加する（部分参加含む）",skip_to:null},{label:"不参加（全日程）",skip_to:"q_remarks"}],help:"不参加を選択された場合、日程詳細およびお弁当等の注文設問はスキップされます。"},{id:"q_transport",type:"single",title:"現地までの移動手段について",required:!1,options:[{label:"配車（チーム車）を利用希望",skip_to:null},{label:"自車で現地直行（他メンバー同乗可）",skip_to:null},{label:"自車で現地直行（家族のみ）",skip_to:null}],help:""},{id:"q_remarks",type:"text",title:"特記事項・アレルギー・連絡事項など",required:!1,options:[],help:"食物アレルギーや遅刻・早退のご予定等があればご記入ください。"}],created_by:"役員会",created_at:"2026-06-01",updated_at:"2026-06-01"}],qs=[{id:"resp_sample_1",survey_id:"survey_sample_1",respondent_name:"菱沼 (保護者)",family_members:[{name:"菱沼 健一 (保護者・指導者)",role:"保護者"},{name:"菱沼 翔太 (6年・主将)",role:"選手"}],schedules:{"8/8(土) 午前 (練習・遠征)":"○","8/8(土) 午後 (練習試合・BBQ)":"○","8/8(土) 宿泊":"○","8/9(日) 終日 (紅白戦・グラウンド納め)":"○"},answers:{q_attendance:"参加する（部分参加含む）",q_transport:"自車で現地直行（他メンバー同乗可）",q_remarks:"車出し可能です。道具車としても利用できます。"},orders:{item_lunch_sat:2,item_lunch_sun:2,item_tshirt:1,item_cap:2},total_amount:6400,created_at:"2026-06-02 10:15"}];async function Di({supabaseClient:e,currentUser:t,currentUserRole:n,canManageInfo:a=null}){gr=e,Mt=t,a!==null?en=a:en=n==="admin"||(t==null?void 0:t.can_edit_info)===!0||n==="leader"&&(t==null?void 0:t.can_edit_info)!==!1,await Wa(),en&&Ni(),xr(),dn()}async function Ni(){const e=kn();if(e)try{const t=localStorage.getItem(tn);if(t){const n=JSON.parse(t);Array.isArray(n)&&n.length>0&&(await e.from("master_data").upsert({key:"ANTS_SURVEYS",data:n}),console.log("Auto-synced surveys to master_data:",n.length))}}catch(t){console.warn("Auto-sync surveys to DB failed:",t)}}function kn(){return gr||window.supabaseClient||null}async function Wa(){let e=!1,t=!1;const n=kn();if(n){try{const{data:a,error:s}=await n.from("surveys").select("*").order("created_at",{ascending:!1});!s&&a&&a.length>0&&(te=a,e=!0)}catch(a){console.warn("Supabase surveys load failed, trying master_data fallback:",a)}if(!e)try{const{data:a,error:s}=await n.from("master_data").select("data").eq("key","ANTS_SURVEYS");!s&&a&&a.length>0&&Array.isArray(a[0].data)&&a[0].data.length>0&&(te=a[0].data,e=!0)}catch(a){console.warn("Supabase master_data ANTS_SURVEYS load skipped:",a)}try{const{data:a,error:s}=await n.from("survey_responses").select("*").order("created_at",{ascending:!1});!s&&a&&a.length>0&&(fe=a,t=!0)}catch(a){console.warn("Supabase survey_responses load failed, trying master_data fallback:",a)}if(!t)try{const{data:a,error:s}=await n.from("master_data").select("data").eq("key","ANTS_SURVEY_RESPONSES");!s&&a&&a.length>0&&Array.isArray(a[0].data)&&(fe=a[0].data,t=!0)}catch(a){console.warn("Supabase master_data ANTS_SURVEY_RESPONSES load skipped:",a)}}if(e)try{localStorage.setItem(tn,JSON.stringify(te))}catch{}else try{const a=localStorage.getItem(tn);a?te=JSON.parse(a):(te=[...Rs],localStorage.setItem(tn,JSON.stringify(te)))}catch{te=[...Rs]}if(t)try{localStorage.setItem(gn,JSON.stringify(fe))}catch{}else try{const a=localStorage.getItem(gn);a?fe=JSON.parse(a):(fe=[...qs],localStorage.setItem(gn,JSON.stringify(fe)))}catch{fe=[...qs]}}async function br(e,t=!1){const n=te.findIndex(s=>s.id===e.id);n>=0?te[n]=e:te.unshift(e);try{localStorage.setItem(tn,JSON.stringify(te))}catch(s){console.error(s)}const a=kn();if(a){try{t?await a.from("surveys").insert([e]):await a.from("surveys").update(e).eq("id",e.id)}catch(s){console.warn("Supabase survey table save skipped:",s)}try{await a.from("master_data").upsert({key:"ANTS_SURVEYS",data:te})}catch(s){console.warn("Supabase master_data ANTS_SURVEYS upsert failed:",s)}}}async function Pi(e){te=te.filter(n=>n.id!==e),fe=fe.filter(n=>n.survey_id!==e);try{localStorage.setItem(tn,JSON.stringify(te)),localStorage.setItem(gn,JSON.stringify(fe))}catch(n){console.error(n)}const t=kn();if(t){try{await t.from("survey_responses").delete().eq("survey_id",e),await t.from("surveys").delete().eq("id",e)}catch{}try{await t.from("master_data").upsert({key:"ANTS_SURVEYS",data:te}),await t.from("master_data").upsert({key:"ANTS_SURVEY_RESPONSES",data:fe})}catch{}}}async function Mi(e){const t=fe.findIndex(s=>s.id===e.id),n=t>=0;n?fe[t]=e:fe.unshift(e);try{localStorage.setItem(gn,JSON.stringify(fe))}catch(s){console.error(s)}const a=kn();if(a){try{n?await a.from("survey_responses").update(e).eq("id",e.id):await a.from("survey_responses").insert([e])}catch(s){console.warn("Supabase survey_responses table save skipped:",s)}try{await a.from("master_data").upsert({key:"ANTS_SURVEY_RESPONSES",data:fe})}catch(s){console.warn("Supabase master_data ANTS_SURVEY_RESPONSES upsert failed:",s)}}}async function Oi(e){fe=fe.filter(n=>n.id!==e);try{localStorage.setItem(gn,JSON.stringify(fe))}catch(n){console.error(n)}const t=kn();if(t){try{await t.from("survey_responses").delete().eq("id",e)}catch{}try{await t.from("master_data").upsert({key:"ANTS_SURVEY_RESPONSES",data:fe})}catch{}}xn&&ha(xn.id),dn()}function dn(){const e=document.getElementById("info-surveys-container"),t=document.getElementById("info-surveys-empty"),n=document.getElementById("btn-survey-new");if(e){if(n&&(en?n.classList.remove("hidden"):n.classList.add("hidden")),te.length===0){e.innerHTML="",t&&t.classList.remove("hidden");return}t&&t.classList.add("hidden"),e.innerHTML=te.map(a=>{const s=fe.filter(l=>l.survey_id===a.id),r=s.length,o=s.reduce((l,c)=>l+(Number(c.total_amount)||0),0);let i="";a.status==="active"?i='<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">🟢 受付中</span>':a.status==="closed"?i='<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">⚪ 締切済み</span>':i='<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">🟡 下書き</span>';const d=[];return a.enable_schedule&&d.push("📅 日程調整"),a.enable_family&&d.push("👨‍👩‍👧 家族一括"),a.enable_orders&&d.push("🛒 注文集計"),`
            <div class="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between gap-2 mb-3">
                        ${i}
                        <span class="text-xs text-gray-400 font-mono">期限: ${a.deadline||"なし"}</span>
                    </div>
                    <h3 class="text-base font-bold text-gray-900 mb-2 leading-snug">
                        ${X(a.title)}
                    </h3>
                    <p class="text-xs text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                        ${X(a.description||"")}
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
                        ${en?`
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
        `}).join(""),e.querySelectorAll(".btn-survey-respond").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id");bn(s)})}),e.querySelectorAll(".btn-survey-share").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id");ji(s)})}),e.querySelectorAll(".btn-survey-results").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id");ha(s)})}),en&&(e.querySelectorAll(".btn-survey-duplicate").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id");await Ri(s)})}),e.querySelectorAll(".btn-survey-edit").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id"),r=te.find(o=>o.id===s);r&&yr(r)})}),e.querySelectorAll(".btn-survey-delete").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id"),r=te.find(o=>o.id===s);r&&confirm(`アンケート「${r.title}」と、そのすべての回答データを削除しますか？`)&&(await Pi(s),dn())})}))}}async function Ri(e){const t=te.find(s=>s.id===e);if(!t)return;const n=`survey_${Date.now()}`,a=JSON.parse(JSON.stringify(t));if(a.id=n,a.title=`(複製) ${t.title}`,a.created_at=new Date().toISOString(),a.status=t.status||"active",a.questions&&Array.isArray(a.questions)){const s={};a.questions.forEach((r,o)=>{const i=r.id,d=`q_${Date.now()}_${o+1}`;s[i]=d,r.id=d}),a.questions.forEach(r=>{r.options&&Array.isArray(r.options)&&r.options.forEach(o=>{o.skip_to&&s[o.skip_to]&&(o.skip_to=s[o.skip_to])})})}a.order_items&&Array.isArray(a.order_items)&&a.order_items.forEach((s,r)=>{s.id=`item_${Date.now()}_${r+1}`}),await br(a,!0),dn(),alert(`アンケート「${a.title}」を作成（複製）しました！`)}function qi(e){try{const t={id:e.id,title:e.title,description:e.description,deadline:e.deadline,public_results:e.public_results,enable_schedule:e.enable_schedule,schedule_options:e.schedule_options,enable_family:e.enable_family,enable_orders:e.enable_orders,order_items:e.order_items,questions:e.questions},n=JSON.stringify(t);return btoa(encodeURIComponent(n).replace(/%([0-9A-F]{2})/g,(a,s)=>String.fromCharCode("0x"+s)))}catch(t){return console.warn("Survey encode error:",t),""}}function Fi(e){if(!e)return null;try{let t=decodeURIComponent(e).trim();t=t.replace(/ /g,"+"),t=t.replace(/-/g,"+").replace(/_/g,"/");const n=t.length%4;n===2?t+="==":n===3?t+="=":n===1&&(t+="===");const a=atob(t),s=decodeURIComponent(Array.prototype.map.call(a,r=>"%"+("00"+r.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(s)}catch(t){return console.warn("Survey decode error:",t),null}}function ji(e){const t=te.find(a=>a.id===e);let n=`${window.location.origin}${window.location.pathname}#survey-${e}`;if(t){const a=qi(t);a&&(n+=`&d=${a}`)}navigator.clipboard.writeText(n).then(()=>{alert(`アンケート回答用URLをコピーしました！
どの端末・Safari・LINEでも確実に開くURLです。

${n}`)}).catch(()=>{prompt("アンケート回答用URL:",n)})}let fn=null,K=[],Ot=[],wt=[];function yr(e=null){const t=document.getElementById("modal-survey-editor");if(!t)return;fn=e?e.id:null,document.getElementById("survey-editor-modal-title").textContent=e?"アンケートの編集":"新規アンケート作成",document.getElementById("input-survey-title").value=e?e.title:"",document.getElementById("input-survey-desc").value=e&&e.description||"",document.getElementById("select-survey-status").value=e?e.status:"active",document.getElementById("input-survey-deadline").value=e&&e.deadline||"";const n=document.getElementById("chk-survey-enable-schedule"),a=document.getElementById("chk-survey-enable-family"),s=document.getElementById("chk-survey-enable-orders"),r=document.getElementById("chk-survey-public-results");n.checked=e?!!e.enable_schedule:!0,a.checked=e?!!e.enable_family:!0,s.checked=e?!!e.enable_orders:!1,r&&(r.checked=e?e.public_results!==!1:!0),Ot=e&&e.schedule_options?[...e.schedule_options]:["7/18(土) 午前","7/18(土) 午後","7/19(日) 終日"],wt=e&&e.order_items?JSON.parse(JSON.stringify(e.order_items)):[{id:`item_${Date.now()}_1`,name:"選手用お弁当",price:600,max:10},{id:`item_${Date.now()}_2`,name:"保護者用お弁当",price:700,max:10}],K=e&&e.questions?JSON.parse(JSON.stringify(e.questions)):[],ya(),fs(),ht(),Ya(),t.classList.remove("hidden")}function za(){const e=document.getElementById("modal-survey-editor");e&&e.classList.add("hidden"),fn=null}function Wn(e){const t=e.getFullYear(),n=e.getMonth()+1,a=e.getDate(),s=e.getDay();if(n===1&&a===1)return"元日";if(n===2&&a===11)return"建国記念の日";if(n===2&&a===23)return"天皇誕生日";if(n===4&&a===29)return"昭和の日";if(n===5&&a===3)return"憲法記念日";if(n===5&&a===4)return"みどりの日";if(n===5&&a===5)return"こどもの日";if(n===8&&a===11)return"山の日";if(n===11&&a===3)return"文化の日";if(n===11&&a===23)return"勤労感謝の日";if(s===1){const r=Math.floor((a-1)/7)+1;if(n===1&&r===2)return"成人の日";if(n===7&&r===3)return"海の日";if(n===9&&r===3)return"敬老の日";if(n===10&&r===2)return"スポーツの日"}if(n===3){const r=Math.floor(20.8431+.242194*(t-1980)-Math.floor((t-1980)/4));if(a===r)return"春分の日"}if(n===9){const r=Math.floor(23.2488+.242194*(t-1980)-Math.floor((t-1980)/4));if(a===r)return"秋分の日"}return null}function ps(e){const t=Wn(e);if(t)return{isHoliday:!0,name:t};const n=e.getFullYear(),a=e.getMonth(),s=e.getDate(),r=e.getDay();let o=new Date(n,a,s-1);for(;Wn(o);){if(o.getDay()===0)return{isHoliday:!0,name:"振替休日"};o.setDate(o.getDate()-1)}if(r!==0){const i=new Date(n,a,s-1),d=new Date(n,a,s+1);if(Wn(i)&&Wn(d))return{isHoliday:!0,name:"国民の休日"}}return null}let ce={targetType:null,targetQIdx:null,viewYear:new Date().getFullYear(),viewMonth:new Date().getMonth(),selectedDates:new Set};function hr(e,t=null){ce.targetType=e,ce.targetQIdx=t;const n=new Date;ce.viewYear=n.getFullYear(),ce.viewMonth=n.getMonth(),ce.selectedDates.clear(),Kt();const a=document.getElementById("modal-survey-date-picker");a&&a.classList.remove("hidden")}function Ja(){const e=document.getElementById("modal-survey-date-picker");e&&e.classList.add("hidden")}function Kt(){const e=document.getElementById("dp-current-month-label"),t=document.getElementById("dp-calendar-grid"),n=document.getElementById("dp-selected-count-badge"),a=document.getElementById("btn-apply-date-picker");if(!t)return;const{viewYear:s,viewMonth:r,selectedDates:o}=ce;e&&(e.textContent=`${s}年 ${r+1}月`),n&&(n.textContent=`${o.size} 日選択中`),a&&(a.disabled=o.size===0);const i=new Date(s,r,1).getDay(),d=new Date(s,r+1,0).getDate();let l="";for(let c=0;c<i;c++)l+='<div class="h-11 border border-transparent rounded-lg"></div>';for(let c=1;c<=d;c++){const u=new Date(s,r,c),m=u.getDay(),g=`${s}-${String(r+1).padStart(2,"0")}-${String(c).padStart(2,"0")}`,b=o.has(g),y=ps(u);let f="",p="";b?(f="bg-teal-600 text-white font-bold shadow-xs",y&&(p=`<span class="text-[9px] block leading-tight truncate px-0.5 text-teal-100">${X(y.name)}</span>`)):y?(f="text-red-600 bg-red-50/70 hover:bg-red-100 font-bold border-red-100",p=`<span class="text-[9px] block leading-tight truncate px-0.5 text-red-600 font-bold">${X(y.name)}</span>`):m===0?f="text-red-500 hover:bg-red-50 font-bold":m===6?f="text-blue-600 hover:bg-blue-50 font-bold":f="text-gray-800 hover:bg-gray-100",l+=`
            <button type="button" class="dp-day-cell h-11 p-1 flex flex-col items-center justify-between rounded-lg border border-gray-100 transition cursor-pointer text-xs ${f}" data-date="${g}">
                <span class="text-xs font-bold leading-none">${c}</span>
                ${p}
            </button>
        `}t.innerHTML=l,t.querySelectorAll(".dp-day-cell").forEach(c=>{c.addEventListener("click",()=>{const u=c.getAttribute("data-date");o.has(u)?o.delete(u):o.add(u),Kt()})})}function Hi(){const e=new Date(ce.viewYear,ce.viewMonth+1,0).getDate();for(let t=1;t<=e;t++){const n=new Date(ce.viewYear,ce.viewMonth,t),a=n.getDay(),s=ps(n);if(a===0||a===6||s){const r=`${ce.viewYear}-${String(ce.viewMonth+1).padStart(2,"0")}-${String(t).padStart(2,"0")}`;ce.selectedDates.add(r)}}Kt()}function Ui(){var i;const{targetType:e,targetQIdx:t,selectedDates:n}=ce;if(n.size===0)return;const a=((i=document.querySelector('input[name="dp-format"]:checked'))==null?void 0:i.value)||"simple",s=["日","月","火","水","木","金","土"],r=Array.from(n).sort(),o=[];if(r.forEach(d=>{const[l,c,u]=d.split("-").map(Number),m=new Date(l,c-1,u),g=s[m.getDay()],y=ps(m)?`${g}・祝`:g;a==="time_slots"?(o.push(`${c}/${u}(${y}) 午前`),o.push(`${c}/${u}(${y}) 午後`),o.push(`${c}/${u}(${y}) 終日`)):a==="with_year"?o.push(`${l}/${String(c).padStart(2,"0")}/${String(u).padStart(2,"0")}(${y})`):a==="kanji"?o.push(`${c}月${u}日(${y})`):o.push(`${c}/${u}(${y})`)}),e==="schedule")Ot.push(...o),ya();else if(e==="question"&&t!==null){K[t].options||(K[t].options=[]);const d=K[t].options;d.length===2&&d[0].label==="選択肢 1"&&d[1].label==="選択肢 2"?K[t].options=o.map(c=>({label:c,skip_to:null})):o.forEach(c=>{K[t].options.push({label:c,skip_to:null})}),ht()}Ja()}function Ya(){var s,r;const e=(s=document.getElementById("chk-survey-enable-schedule"))==null?void 0:s.checked,t=(r=document.getElementById("chk-survey-enable-orders"))==null?void 0:r.checked,n=document.getElementById("editor-schedule-section"),a=document.getElementById("editor-orders-section");n&&(n.style.display=e?"block":"none"),a&&(a.style.display=t?"block":"none")}function ya(){const e=document.getElementById("editor-schedule-list");e&&(e.innerHTML=Ot.map((t,n)=>`
        <div class="flex items-center gap-2 mb-2">
            <span class="text-xs font-bold text-gray-400 w-5">#${n+1}</span>
            <input type="text" class="input-sched-opt flex-grow border border-gray-300 rounded-lg p-1.5 text-xs focus:ring-2 focus:ring-teal-500" value="${X(t)}" data-index="${n}" placeholder="例: 7/18(土) 午前 (9:00〜12:00)">
            <button class="btn-del-sched-opt text-xs text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded" data-index="${n}">🗑️</button>
        </div>
    `).join(""),e.querySelectorAll(".input-sched-opt").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-index"));Ot[a]=n.target.value})}),e.querySelectorAll(".btn-del-sched-opt").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-index"));Ot.splice(n,1),ya()})}))}function fs(){const e=document.getElementById("editor-orders-list");e&&(e.innerHTML=wt.map((t,n)=>`
        <div class="grid grid-cols-12 gap-2 mb-2 items-center bg-gray-50/70 p-2 rounded-lg border border-gray-200">
            <div class="col-span-6">
                <input type="text" class="input-order-name w-full border border-gray-300 rounded p-1 text-xs" value="${X(t.name)}" data-index="${n}" placeholder="商品・品目名 (例: お弁当)">
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
    `).join(""),e.querySelectorAll(".input-order-name").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-index"));wt[a].name=n.target.value})}),e.querySelectorAll(".input-order-price").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-index"));wt[a].price=Number(n.target.value)||0})}),e.querySelectorAll(".input-order-max").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-index"));wt[a].max=Number(n.target.value)||10})}),e.querySelectorAll(".btn-del-order-item").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-index"));wt.splice(n,1),fs()})}))}function ht(){const e=document.getElementById("editor-questions-list");if(e){if(K.length===0){e.innerHTML='<p class="text-xs text-gray-400 py-3 text-center border border-dashed rounded-lg">設問がありません。「＋ 設問を追加」ボタンで追加してください。</p>';return}e.innerHTML=K.map((t,n)=>{const a=K.filter((s,r)=>r>n);return`
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
                        ${n<K.length-1?`<button class="btn-move-q-down text-xs text-gray-500 hover:text-gray-800 p-1" data-q-index="${n}" title="下に移動">▼</button>`:""}
                        <button class="btn-del-q text-xs text-red-500 hover:text-red-700 p-1 font-bold ml-1" data-q-index="${n}">削除</button>
                    </div>
                </div>

                <div class="mb-3">
                    <input type="text" class="input-q-title w-full border border-gray-300 rounded-lg p-2 text-xs font-bold text-gray-800" value="${X(t.title)}" data-q-index="${n}" placeholder="設問のタイトルを入力してください">
                </div>

                <!-- 選択肢セクション (single または multiple の場合) -->
                ${t.type==="single"||t.type==="multiple"?`
                <div class="pl-3 border-l-2 border-teal-300 mb-2">
                    <label class="block text-[11px] font-bold text-gray-500 mb-1.5">選択肢一覧 &amp; 設問スキップ設定:</label>
                    <div class="space-y-2">
                        ${(t.options||[]).map((s,r)=>`
                            <div class="flex items-center gap-2">
                                <input type="text" class="input-opt-label flex-grow border border-gray-300 rounded p-1.5 text-xs" value="${X(s.label)}" data-q-index="${n}" data-opt-index="${r}" placeholder="選択肢 ${r+1}">
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
                    <input type="text" class="input-q-help w-full border border-gray-200 rounded p-1.5 text-[11px] text-gray-500 bg-white" value="${X(t.help||"")}" data-q-index="${n}" placeholder="補足説明・注釈 (任意)">
                </div>
            </div>
        `}).join(""),e.querySelectorAll(".input-q-title").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-q-index"));K[a].title=n.target.value})}),e.querySelectorAll(".input-q-help").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-q-index"));K[a].help=n.target.value})}),e.querySelectorAll(".select-q-type").forEach(t=>{t.addEventListener("change",n=>{const a=Number(n.target.getAttribute("data-q-index"));K[a].type=n.target.value,(!K[a].options||K[a].options.length===0)&&(K[a].options=[{label:"選択肢 1",skip_to:null},{label:"選択肢 2",skip_to:null}]),ht()})}),e.querySelectorAll(".chk-q-req").forEach(t=>{t.addEventListener("change",n=>{const a=Number(n.target.getAttribute("data-q-index"));K[a].required=n.target.checked})}),e.querySelectorAll(".btn-del-q").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index"));K.splice(n,1),ht()})}),e.querySelectorAll(".btn-move-q-up").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index"));if(n>0){const a=K[n];K[n]=K[n-1],K[n-1]=a,ht()}})}),e.querySelectorAll(".btn-move-q-down").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index"));if(n<K.length-1){const a=K[n];K[n]=K[n+1],K[n+1]=a,ht()}})}),e.querySelectorAll(".btn-add-opt").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index"));K[n].options||(K[n].options=[]),K[n].options.push({label:`選択肢 ${K[n].options.length+1}`,skip_to:null}),ht()})}),e.querySelectorAll(".btn-add-date-opt").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index"));hr("question",n)})}),e.querySelectorAll(".input-opt-label").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-q-index")),s=Number(n.target.getAttribute("data-opt-index"));K[a].options[s].label=n.target.value})}),e.querySelectorAll(".select-opt-skip").forEach(t=>{t.addEventListener("change",n=>{const a=Number(n.target.getAttribute("data-q-index")),s=Number(n.target.getAttribute("data-opt-index"));K[a].options[s].skip_to=n.target.value||null})}),e.querySelectorAll(".btn-del-opt").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index")),a=Number(t.getAttribute("data-opt-index"));K[n].options.splice(a,1),ht()})})}}async function Vi(){var u,m,g,b,y,f,p,v,x;const e=(u=document.getElementById("input-survey-title"))==null?void 0:u.value.trim();if(!e){alert("アンケートのタイトルを入力してください");return}const t=((m=document.getElementById("input-survey-desc"))==null?void 0:m.value.trim())||"",n=((g=document.getElementById("select-survey-status"))==null?void 0:g.value)||"active",a=((b=document.getElementById("input-survey-deadline"))==null?void 0:b.value.trim())||"",s=((y=document.getElementById("chk-survey-enable-schedule"))==null?void 0:y.checked)||!1,r=((f=document.getElementById("chk-survey-enable-family"))==null?void 0:f.checked)||!1,o=((p=document.getElementById("chk-survey-enable-orders"))==null?void 0:p.checked)||!1,i=((v=document.getElementById("chk-survey-public-results"))==null?void 0:v.checked)??!0,d=!fn,l=new Date().toISOString().split("T")[0],c={id:fn||`survey_${Date.now()}`,title:e,description:t,status:n,deadline:a,public_results:i,enable_schedule:s,schedule_options:s?Ot.filter(h=>h.trim()):[],enable_family:r,enable_orders:o,order_items:o?wt.filter(h=>h.name.trim()):[],questions:K,created_by:(Mt==null?void 0:Mt.name)||"管理者",created_at:fn&&((x=te.find(h=>h.id===fn))==null?void 0:x.created_at)||l,updated_at:l};await br(c,d),za(),dn()}let xn=null;function ha(e,t=!1){const n=document.getElementById("modal-survey-results");if(!n)return;const a=te.find(i=>i.id===e);if(!a)return;xn=a;const s=fe.filter(i=>i.survey_id===e),r=t||!en;document.getElementById("results-survey-title").textContent=a.title,document.getElementById("results-survey-subtitle").textContent=`回答数: ${s.length}件 | 締切: ${a.deadline||"なし"}${r?" (閲覧モード)":""}`;const o=document.getElementById("btn-export-survey-csv");o&&(r?o.classList.add("hidden"):o.classList.remove("hidden")),Wi(a,s),zi(a,s),Ji(a,s),Yi(a,s),Ki(a,s,r),n.classList.remove("hidden")}function Gi(){const e=document.getElementById("modal-survey-results");e&&e.classList.add("hidden"),xn=null}function Wi(e,t){const n=t.length;let a=0;t.forEach(o=>{o.family_members&&o.family_members.length>0?a+=o.family_members.length:a+=1});const s=t.reduce((o,i)=>o+(Number(i.total_amount)||0),0),r=document.getElementById("results-summary-cards");r&&(r.innerHTML=`
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
    `)}function zi(e,t){const n=document.getElementById("results-schedule-container");if(!n)return;if(!e.enable_schedule||!e.schedule_options||e.schedule_options.length===0){n.classList.add("hidden");return}n.classList.remove("hidden");const a={};e.schedule_options.forEach(r=>{a[r]={ok:[],maybe:[],ng:[]}}),t.forEach(r=>{const o=r.respondent_name||"無名";r.schedules&&Object.entries(r.schedules).forEach(([i,d])=>{a[i]&&(d==="○"||d==="ok"?a[i].ok.push(o):d==="△"||d==="maybe"?a[i].maybe.push(o):(d==="×"||d==="ng")&&a[i].ng.push(o))})});const s=document.getElementById("results-schedule-tbody");s&&(s.innerHTML=e.schedule_options.map(r=>{const o=a[r],i=o.ok.join("、 ");return`
            <tr class="border-b border-gray-100 hover:bg-gray-50/50">
                <td class="px-3 py-2.5 font-bold text-gray-800 whitespace-nowrap">${X(r)}</td>
                <td class="px-3 py-2.5 text-center font-extrabold text-emerald-600 bg-emerald-50/30">
                    ${o.ok.length}
                </td>
                <td class="px-3 py-2.5 text-center font-bold text-amber-600">
                    ${o.maybe.length}
                </td>
                <td class="px-3 py-2.5 text-center font-bold text-gray-400">
                    ${o.ng.length}
                </td>
                <td class="px-3 py-2.5 text-xs text-gray-600 max-w-xs truncate" title="${X(i)}">
                    ${X(i)||'<span class="text-gray-300">なし</span>'}
                </td>
            </tr>
        `}).join(""))}function Ji(e,t){const n=document.getElementById("results-orders-container");if(!n)return;if(!e.enable_orders||!e.order_items||e.order_items.length===0){n.classList.add("hidden");return}n.classList.remove("hidden");const a={};e.order_items.forEach(r=>{a[r.id]={name:r.name,price:r.price,count:0}}),t.forEach(r=>{r.orders&&Object.entries(r.orders).forEach(([o,i])=>{a[o]&&(a[o].count+=Number(i)||0)})});const s=document.getElementById("results-orders-tbody");s&&(s.innerHTML=e.order_items.map(r=>{const o=a[r.id]||{count:0},i=o.count*r.price;return`
            <tr class="border-b border-gray-100 hover:bg-gray-50/50">
                <td class="px-3 py-2.5 font-bold text-gray-800">${X(r.name)}</td>
                <td class="px-3 py-2.5 text-right font-mono text-gray-600">¥${r.price.toLocaleString()}</td>
                <td class="px-3 py-2.5 text-center font-extrabold text-purple-600">${o.count} <span class="text-xs font-normal">個</span></td>
                <td class="px-3 py-2.5 text-right font-extrabold text-purple-800 font-mono">¥${i.toLocaleString()}</td>
            </tr>
        `}).join(""))}function Yi(e,t){const n=document.getElementById("results-questions-list");if(n){if(!e.questions||e.questions.length===0){n.innerHTML='<p class="text-xs text-gray-400">設問はありません</p>';return}n.innerHTML=e.questions.map((a,s)=>{const r=t.map(o=>o.answers&&o.answers[a.id]).filter(o=>o!=null&&o!=="");if(a.type==="single"||a.type==="multiple"){const o={};(a.options||[]).forEach(d=>o[d.label]=0),o["(未回答)"]=0,r.forEach(d=>{Array.isArray(d)?d.forEach(l=>{o[l]=(o[l]||0)+1}):o[d]!==void 0?o[d]+=1:o[d]=(o[d]||0)+1});const i=t.length;return`
                <div class="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-3">
                    <h4 class="text-xs font-bold text-gray-800 mb-2">設問 ${s+1}: ${X(a.title)}</h4>
                    <div class="space-y-1.5">
                        ${Object.entries(o).filter(([d,l])=>d!=="(未回答)"||l>0).map(([d,l])=>{const c=i>0?Math.round(l/i*100):0;return`
                                <div>
                                    <div class="flex justify-between text-xs mb-0.5">
                                        <span class="text-gray-700">${X(d)}</span>
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
                    <h4 class="text-xs font-bold text-gray-800 mb-2">設問 ${s+1}: ${X(a.title)} (${r.length}件の回答)</h4>
                    <div class="max-h-36 overflow-y-auto space-y-1.5 pr-2 scrollbar-thin">
                        ${r.length>0?r.map(o=>`
                            <div class="bg-white p-2 rounded border border-gray-200 text-xs text-gray-700">
                                ${X(String(o))}
                            </div>
                        `).join(""):'<span class="text-xs text-gray-400">回答がありません</span>'}
                    </div>
                </div>
            `}).join("")}}function Ki(e,t,n=!1){const a=document.getElementById("th-results-actions");a&&(n?a.classList.add("hidden"):a.classList.remove("hidden"));const s=document.getElementById("results-responses-tbody");if(!s)return;const r=n?5:6;if(t.length===0){s.innerHTML=`<tr><td colspan="${r}" class="text-center py-6 text-xs text-gray-400">まだ回答がありません</td></tr>`;return}s.innerHTML=t.map(o=>{const i=(o.family_members||[]).map(l=>l.name).join("、 ")||"-",d=o.orders?Object.entries(o.orders).filter(([l,c])=>c>0).map(([l,c])=>{const u=(e.order_items||[]).find(m=>m.id===l);return`${u?u.name:l} ×${c}`}).join(", "):"-";return`
            <tr class="border-b border-gray-100 hover:bg-gray-50/50 text-xs">
                <td class="px-3 py-2 text-gray-400 whitespace-nowrap">${o.created_at||"-"}</td>
                <td class="px-3 py-2 font-bold text-gray-900 whitespace-nowrap">${X(o.respondent_name)}</td>
                <td class="px-3 py-2 text-gray-600 max-w-xs truncate" title="${X(i)}">${X(i)}</td>
                <td class="px-3 py-2 text-gray-600 max-w-xs truncate" title="${X(d)}">${X(d)}</td>
                <td class="px-3 py-2 text-right font-mono font-bold text-purple-700">¥${(Number(o.total_amount)||0).toLocaleString()}</td>
                ${n?"":`
                <td class="px-3 py-2 text-center whitespace-nowrap">
                    <div class="flex items-center justify-center gap-1.5">
                        <button class="btn-copy-response-edit-url px-2 py-1 text-[11px] font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded transition cursor-pointer" data-id="${o.id}" title="本人用の修正URLを発行してコピー">
                            🔗 修正URL
                        </button>
                        <button class="btn-delete-response px-2 py-1 text-[11px] font-bold text-red-600 hover:bg-red-50 rounded transition cursor-pointer" data-id="${o.id}" data-name="${X(o.respondent_name)}" title="この回答を削除">
                            🗑️
                        </button>
                    </div>
                </td>
                `}
            </tr>
        `}).join(""),n||(s.querySelectorAll(".btn-copy-response-edit-url").forEach(o=>{o.addEventListener("click",()=>{const i=o.getAttribute("data-id"),d=`${window.location.origin}${window.location.pathname}#survey-${e.id}&response=${i}`;navigator.clipboard.writeText(d).then(()=>{alert(`回答修正用URLをコピーしました！
ご本人に案内してください。

${d}`)}).catch(()=>{prompt("以下のURLをコピーしてください:",d)})})}),s.querySelectorAll(".btn-delete-response").forEach(o=>{o.addEventListener("click",async()=>{const i=o.getAttribute("data-id"),d=o.getAttribute("data-name")||"この回答者";confirm(`「${d}」さんの回答データを削除しますか？
（集計や出欠、注文数から除外されます）`)&&await Oi(i)})}))}function Qi(){if(!xn)return;const e=xn,t=fe.filter(d=>d.survey_id===e.id),n=["回答ID","回答日時","回答者(代表者名)"];e.enable_family&&n.push("家族メンバー一覧"),e.enable_schedule&&e.schedule_options&&e.schedule_options.forEach(d=>{n.push(`日程: ${d}`)}),e.questions&&e.questions.forEach((d,l)=>{n.push(`設問${l+1}: ${d.title}`)}),e.enable_orders&&e.order_items&&(e.order_items.forEach(d=>{n.push(`注文: ${d.name} (${d.price}円)`)}),n.push("注文合計金額(円)"));const a=[n];t.forEach(d=>{const l=[d.id,d.created_at||"",d.respondent_name||""];if(e.enable_family){const c=(d.family_members||[]).map(u=>`${u.name}${u.role?`(${u.role})`:""}`).join(", ");l.push(c)}e.enable_schedule&&e.schedule_options&&e.schedule_options.forEach(c=>{l.push(d.schedules&&d.schedules[c]||"")}),e.questions&&e.questions.forEach(c=>{const u=d.answers?d.answers[c.id]:"";Array.isArray(u)?l.push(u.join("; ")):l.push(u||"")}),e.enable_orders&&e.order_items&&(e.order_items.forEach(c=>{const u=d.orders&&d.orders[c.id]||0;l.push(u)}),l.push(d.total_amount||0)),a.push(l)});const s=a.map(d=>d.map(l=>`"${String(l||"").replace(/"/g,'""')}"`).join(",")).join(`
`),r=new Blob([new Uint8Array([239,187,191]),s],{type:"text/csv;charset=utf-8;"}),o=document.createElement("a");o.href=URL.createObjectURL(r);const i=new Date().toISOString().split("T")[0];o.download=`survey_${e.id}_${i}.csv`,o.click()}let Cn=null,_t=[],aa=null;async function bn(e,t=null,n=null){var d;(d=document.getElementById("loading-overlay"))==null||d.classList.add("hidden");const a=document.getElementById("loading-detail-text");a&&(a.style.opacity="0"),["auth-view","signup-view","password-reset-view","password-update-view","app-menu-view","app-view","attendance-view","view-users","dashboard-view","dashboard-settings","position-simulator-view","info-view"].forEach(l=>{const c=document.getElementById(l);c&&c.classList.add("hidden")});const s=document.getElementById("survey-respond-view");s&&s.classList.remove("hidden");const r=document.getElementById("survey-respond-form-container"),o=document.getElementById("survey-respond-error-container"),i=document.getElementById("survey-respond-success-container");i&&i.classList.add("hidden");try{if(xr(),(!te||te.length===0)&&await Wa(),!n){const y=window.location.hash||"",f=window.location.search||"",p=(y+"&"+f).match(/[?&#]d=([^&]+)/);p&&p[1]&&(n=p[1])}let l=te.find(y=>y.id===e);if(!l&&n)try{const y=Fi(n);if(y&&(y.id===e||!e)){l=y,te.unshift(l);try{localStorage.setItem(tn,JSON.stringify(te))}catch{}}}catch(y){console.warn("Embedded survey restore failed:",y)}if(l||(await Wa(),l=te.find(y=>y.id===e)),!l&&e)try{const y=decodeURIComponent(e).trim();l=te.find(f=>f.id===y)}catch{}if(!l){if(r&&r.classList.add("hidden"),o){o.classList.remove("hidden");const y=document.getElementById("survey-respond-error-title"),f=document.getElementById("survey-respond-error-desc");y&&(y.textContent="アンケートが見つかりませんでした"),f&&(f.innerHTML=`指定されたアンケート（ID: <span class="font-mono font-bold">${e||"未指定"}</span>）が存在しないか、URLが正しくない可能性があります。<br>最新のアンケートURLをご確認ください。`)}return}o&&o.classList.add("hidden"),r&&r.classList.remove("hidden"),Cn=l,_t=[];let c=null;t&&(c=fe.find(y=>y.id===t));const u=document.getElementById("respond-edit-mode-banner"),m=document.getElementById("btn-submit-survey-response");c?(aa=c.id,u&&u.classList.remove("hidden"),m&&(m.textContent="回答を更新する")):(aa=null,u&&u.classList.add("hidden"),m&&(m.textContent="回答を送信する")),document.getElementById("respond-survey-title").textContent=l.title,document.getElementById("respond-survey-desc").innerHTML=l.description?l.description.replace(/\n/g,"<br>"):"",document.getElementById("respond-survey-deadline").textContent=l.deadline?`回答期限: ${l.deadline}`:"";const g=document.getElementById("btn-view-public-results");g&&(l.public_results!==!1?(g.classList.remove("hidden"),g.onclick=()=>ha(l.id,!0)):g.classList.add("hidden"));const b=document.getElementById("input-respondent-name");b&&(c?b.value=c.respondent_name||"":b.value=Mt&&Mt.name?Mt.name:""),c&&c.family_members?_t=JSON.parse(JSON.stringify(c.family_members)):_t=[],gs(l),Zi(l,c?c.schedules:null),Xi(l,c?c.answers:null),td(l,c?c.orders:null),window.scrollTo({top:0,behavior:"smooth"})}catch(l){if(console.error("Error in openSurveyResponsePage:",l),r&&r.classList.add("hidden"),o){o.classList.remove("hidden");const c=document.getElementById("survey-respond-error-title"),u=document.getElementById("survey-respond-error-desc");c&&(c.textContent="エラーが発生しました"),u&&(u.innerHTML=`アンケートの読み込み中にエラーが発生しました。<br><span class="text-xs text-red-500 font-mono">${l.message||l}</span>`)}}}function gs(e){const t=document.getElementById("respond-family-section");if(!t)return;if(!e.enable_family){t.classList.add("hidden");return}t.classList.remove("hidden");const n=document.getElementById("respond-family-list");n&&(n.innerHTML=_t.map((a,s)=>`
        <div class="flex items-center gap-2 mb-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
            <input type="text" class="input-fam-name flex-grow border border-gray-300 rounded-lg p-2 text-xs" value="${X(a.name)}" data-index="${s}" placeholder="ご家族・選手のお名前 (例: 翔太)">
            <select class="select-fam-role border border-gray-300 rounded-lg p-2 text-xs bg-white font-bold" data-index="${s}">
                <option value="選手" ${a.role==="選手"?"selected":""}>選手</option>
                <option value="保護者" ${a.role==="保護者"?"selected":""}>保護者</option>
                <option value="兄弟・姉妹" ${a.role==="兄弟・姉妹"?"selected":""}>兄弟・姉妹</option>
                <option value="その他" ${a.role==="その他"?"selected":""}>その他</option>
            </select>
            <button class="btn-del-fam text-xs text-red-500 hover:text-red-700 p-2" data-index="${s}">🗑️</button>
        </div>
    `).join(""),n.querySelectorAll(".input-fam-name").forEach(a=>{a.addEventListener("input",s=>{const r=Number(s.target.getAttribute("data-index"));_t[r].name=s.target.value})}),n.querySelectorAll(".select-fam-role").forEach(a=>{a.addEventListener("change",s=>{const r=Number(s.target.getAttribute("data-index"));_t[r].role=s.target.value})}),n.querySelectorAll(".btn-del-fam").forEach(a=>{a.addEventListener("click",()=>{const s=Number(a.getAttribute("data-index"));_t.splice(s,1),gs(e)})}))}function Zi(e,t=null){const n=document.getElementById("respond-schedule-section");if(!n)return;if(!e.enable_schedule||!e.schedule_options||e.schedule_options.length===0){n.classList.add("hidden");return}n.classList.remove("hidden");const a=document.getElementById("respond-schedule-list");a&&(a.innerHTML=e.schedule_options.map((s,r)=>{const o=t&&t[s]?t[s]:"○";return`
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl border border-gray-200 bg-white mb-2.5">
            <span class="text-xs font-bold text-gray-800">${X(s)}</span>
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
        `}).join(""))}function Xi(e,t=null){const n=document.getElementById("respond-questions-section");if(!n)return;if(!e.questions||e.questions.length===0){n.classList.add("hidden");return}n.classList.remove("hidden");const a=document.getElementById("respond-questions-list");a&&(a.innerHTML=e.questions.map((s,r)=>{const o=t?t[s.id]:void 0;return`
        <div id="respond-q-block-${s.id}" class="respond-q-block p-4 rounded-xl border border-gray-200 bg-white mb-4 transition-all" data-q-id="${s.id}">
            <div class="flex items-start gap-2 mb-2">
                <span class="px-2 py-0.5 rounded bg-teal-100 text-teal-800 text-xs font-bold shrink-0">Q${r+1}</span>
                <div>
                    <h4 class="text-xs font-bold text-gray-900 leading-snug">
                        ${X(s.title)}
                        ${s.required?'<span class="text-red-500 ml-1">*必須</span>':""}
                    </h4>
                    ${s.help?`<p class="text-[11px] text-gray-500 mt-0.5">${X(s.help)}</p>`:""}
                </div>
            </div>

            <div class="mt-3 pl-2">
                ${ed(s,o)}
            </div>
        </div>
        `}).join(""),a.querySelectorAll('input[type="radio"].q-opt-radio').forEach(s=>{s.addEventListener("change",()=>{Fs(e)})}),Fs(e))}function ed(e,t=void 0){if(e.type==="single")return(e.options||[]).map((n,a)=>{const s=t!==void 0?t===n.label:a===0;return`
            <label class="flex items-center gap-2 cursor-pointer text-xs text-gray-700 mb-2 hover:text-teal-700">
                <input type="radio" name="respond_ans_${e.id}" value="${X(n.label)}" class="q-opt-radio text-teal-600 focus:ring-teal-500" data-q-id="${e.id}" data-skip-to="${n.skip_to||""}" ${s?"checked":""}>
                <span>${X(n.label)}</span>
            </label>
            `}).join("");if(e.type==="multiple")return(e.options||[]).map(n=>{const a=Array.isArray(t)?t.includes(n.label):!1;return`
            <label class="flex items-center gap-2 cursor-pointer text-xs text-gray-700 mb-2 hover:text-teal-700">
                <input type="checkbox" name="respond_ans_${e.id}" value="${X(n.label)}" ${a?"checked":""} class="rounded text-teal-600 focus:ring-teal-500">
                <span>${X(n.label)}</span>
            </label>
            `}).join("");{const n=t!==void 0?String(t):"";return`
            <textarea name="respond_ans_${e.id}" rows="3" class="w-full border border-gray-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-teal-500 outline-none" placeholder="回答を入力してください...">${X(n)}</textarea>
        `}}function Fs(e){if(!e.questions)return;let t=new Set;e.questions.forEach((n,a)=>{if(n.type==="single"){const s=document.querySelector(`input[name="respond_ans_${n.id}"]:checked`);if(s){const r=s.getAttribute("data-skip-to");if(r==="__END__")for(let o=a+1;o<e.questions.length;o++)t.add(e.questions[o].id);else if(r){const o=e.questions.findIndex(i=>i.id===r);if(o>a)for(let i=a+1;i<o;i++)t.add(e.questions[i].id)}}}}),e.questions.forEach(n=>{var s,r;const a=document.getElementById(`respond-q-block-${n.id}`);if(a)if(t.has(n.id)){if(a.classList.add("opacity-40","bg-gray-100","pointer-events-none"),!a.querySelector(".skip-badge")){const i=document.createElement("span");i.className="skip-badge text-[10px] bg-gray-300 text-gray-700 font-bold px-1.5 py-0.5 rounded ml-2",i.textContent="スキップされました",(s=a.querySelector("h4"))==null||s.appendChild(i)}}else a.classList.remove("opacity-40","bg-gray-100","pointer-events-none"),(r=a.querySelector(".skip-badge"))==null||r.remove()})}function td(e,t=null){const n=document.getElementById("respond-orders-section");if(!n)return;if(!e.enable_orders||!e.order_items||e.order_items.length===0){n.classList.add("hidden");return}n.classList.remove("hidden");const a=document.getElementById("respond-orders-list");a&&(a.innerHTML=e.order_items.map(s=>{const r=t&&t[s.id]!==void 0?Number(t[s.id]):0;return`
        <div class="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-white mb-2.5">
            <div>
                <span class="block text-xs font-bold text-gray-900">${X(s.name)}</span>
                <span class="text-xs text-teal-700 font-mono font-bold">¥${s.price.toLocaleString()}</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-xs text-gray-500">数量:</span>
                <select class="select-order-qty border border-gray-300 rounded-lg p-1.5 text-xs bg-white font-bold" data-item-id="${s.id}" data-price="${s.price}">
                    ${Array.from({length:(s.max||10)+1},(o,i)=>`<option value="${i}" ${i===r?"selected":""}>${i}</option>`).join("")}
                </select>
            </div>
        </div>
        `}).join(""),a.querySelectorAll(".select-order-qty").forEach(s=>{s.addEventListener("change",js)}),js())}function js(){let e=0;document.querySelectorAll(".select-order-qty").forEach(n=>{const a=Number(n.value)||0,s=Number(n.getAttribute("data-price"))||0;e+=a*s});const t=document.getElementById("respond-orders-total-amount");t&&(t.textContent=`¥${e.toLocaleString()}`)}async function nd(){var x,h,k,L;if(!Cn)return;const e=Cn,t=(x=document.getElementById("input-respondent-name"))==null?void 0:x.value.trim();if(!t){alert("保護者氏名（選手氏名）を入力してください"),(h=document.getElementById("input-respondent-name"))==null||h.focus();return}const n={};e.enable_schedule&&e.schedule_options&&e.schedule_options.forEach((w,I)=>{const E=document.querySelector(`input[name="respond_sched_${I}"]:checked`);E&&(n[w]=E.value)});const a={};let s=!1;if(e.questions&&e.questions.forEach(w=>{var $;const I=document.getElementById(`respond-q-block-${w.id}`);if(!(I&&I.classList.contains("opacity-40")))if(w.type==="single"){const _=document.querySelector(`input[name="respond_ans_${w.id}"]:checked`);_?a[w.id]=_.value:w.required&&(s=!0)}else if(w.type==="multiple"){const _=Array.from(document.querySelectorAll(`input[name="respond_ans_${w.id}"]:checked`)).map(C=>C.value);a[w.id]=_,w.required&&_.length===0&&(s=!0)}else{const _=($=document.querySelector(`textarea[name="respond_ans_${w.id}"]`))==null?void 0:$.value.trim();a[w.id]=_||"",w.required&&!_&&(s=!0)}}),s){alert("必須の設問に回答してください。");return}const r={};let o=0;e.enable_orders&&e.order_items&&document.querySelectorAll(".select-order-qty").forEach(w=>{const I=w.getAttribute("data-item-id"),E=Number(w.value)||0,$=Number(w.getAttribute("data-price"))||0;r[I]=E,o+=E*$});const i=!!aa,d=aa||`resp_${Date.now()}`,l=new Date,c=`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}-${String(l.getDate()).padStart(2,"0")} ${String(l.getHours()).padStart(2,"0")}:${String(l.getMinutes()).padStart(2,"0")}`,u={id:d,survey_id:e.id,respondent_name:t,family_members:_t.filter(w=>w.name.trim()),schedules:n,answers:a,orders:r,total_amount:o,created_at:c};await Mi(u);const m=`${window.location.origin}${window.location.pathname}#survey-${e.id}&response=${u.id}`,g=document.getElementById("input-edit-response-url");g&&(g.value=m);const b=document.getElementById("btn-copy-edit-url");b&&(b.onclick=()=>{navigator.clipboard.writeText(m).then(()=>{alert(`回答修正用URLをコピーしました！
後から回答を変更する場合は、このURLから修正できます。`)}).catch(()=>{prompt("以下のURLをコピーしてください:",m)})});const y=document.getElementById("btn-re-edit-response");y&&(y.onclick=()=>{bn(e.id,u.id)});const f=document.getElementById("btn-view-results-from-success");f&&(e.public_results!==!1?(f.classList.remove("hidden"),f.onclick=()=>ha(e.id,!0)):f.classList.add("hidden"));const p=document.getElementById("survey-respond-success-title"),v=document.getElementById("survey-respond-success-desc");p&&(p.textContent=i?"回答を更新しました！":"回答を受け付けました！"),v&&(v.innerHTML=i?"回答内容の変更が正常に保存されました。<br>内容は役員・担当者へ最新状態で共有されます。":"ご回答いただきありがとうございました。<br>内容は役員・担当者へ共有されます。"),(k=document.getElementById("survey-respond-form-container"))==null||k.classList.add("hidden"),(L=document.getElementById("survey-respond-success-container"))==null||L.classList.remove("hidden"),window.scrollTo({top:0,behavior:"smooth"})}function X(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}let Hs=!1;function xr(){var e,t,n,a,s,r,o,i,d,l,c,u,m,g,b,y,f,p,v,x,h,k,L,w,I;Hs||(Hs=!0,(e=document.getElementById("btn-survey-new"))==null||e.addEventListener("click",()=>yr()),(t=document.getElementById("chk-survey-enable-schedule"))==null||t.addEventListener("change",Ya),(n=document.getElementById("chk-survey-enable-orders"))==null||n.addEventListener("change",Ya),(a=document.getElementById("btn-add-sched-opt"))==null||a.addEventListener("click",()=>{Ot.push(`候補日 ${Ot.length+1}`),ya()}),(s=document.getElementById("btn-open-date-picker-sched"))==null||s.addEventListener("click",()=>{hr("schedule")}),(r=document.getElementById("btn-close-date-picker"))==null||r.addEventListener("click",Ja),(o=document.getElementById("btn-cancel-date-picker"))==null||o.addEventListener("click",Ja),(i=document.getElementById("btn-dp-prev-month"))==null||i.addEventListener("click",()=>{ce.viewMonth--,ce.viewMonth<0&&(ce.viewMonth=11,ce.viewYear--),Kt()}),(d=document.getElementById("btn-dp-next-month"))==null||d.addEventListener("click",()=>{ce.viewMonth++,ce.viewMonth>11&&(ce.viewMonth=0,ce.viewYear++),Kt()}),(l=document.getElementById("btn-dp-today"))==null||l.addEventListener("click",()=>{const E=new Date;ce.viewYear=E.getFullYear(),ce.viewMonth=E.getMonth(),Kt()}),(c=document.getElementById("btn-dp-select-weekends"))==null||c.addEventListener("click",Hi),(u=document.getElementById("btn-dp-clear-all"))==null||u.addEventListener("click",()=>{ce.selectedDates.clear(),Kt()}),(m=document.getElementById("btn-apply-date-picker"))==null||m.addEventListener("click",Ui),(g=document.getElementById("btn-add-order-item"))==null||g.addEventListener("click",()=>{wt.push({id:`item_${Date.now()}`,name:`注文品目 ${wt.length+1}`,price:500,max:10}),fs()}),(b=document.getElementById("btn-add-question"))==null||b.addEventListener("click",()=>{K.push({id:`q_${Date.now()}`,type:"single",title:`設問 ${K.length+1}`,required:!1,options:[{label:"選択肢 1",skip_to:null},{label:"選択肢 2",skip_to:null}],help:""}),ht()}),(y=document.getElementById("btn-save-survey"))==null||y.addEventListener("click",Vi),(f=document.getElementById("btn-close-survey-editor"))==null||f.addEventListener("click",za),(p=document.getElementById("btn-cancel-survey-editor"))==null||p.addEventListener("click",za),(v=document.getElementById("btn-close-survey-results"))==null||v.addEventListener("click",Gi),(x=document.getElementById("btn-export-survey-csv"))==null||x.addEventListener("click",Qi),(h=document.getElementById("btn-respond-add-family"))==null||h.addEventListener("click",()=>{_t.push({name:"",role:"選手"}),Cn&&gs(Cn)}),(k=document.getElementById("btn-submit-survey-response"))==null||k.addEventListener("click",nd),(L=document.getElementById("btn-back-from-survey-respond"))==null||L.addEventListener("click",()=>{if(Mt){const E=document.getElementById("survey-respond-view");E&&E.classList.add("hidden");const $=document.getElementById("info-view");$&&$.classList.remove("hidden"),dn()}else{const E=document.getElementById("survey-respond-view");E&&E.classList.add("hidden");const $=document.getElementById("auth-view");$&&$.classList.remove("hidden")}}),(w=document.getElementById("btn-survey-error-reload"))==null||w.addEventListener("click",()=>{window.location.reload()}),(I=document.getElementById("btn-survey-error-home"))==null||I.addEventListener("click",()=>{window.location.href=window.location.pathname}))}let Pe=null,Ye=null,Ka="user",Bt=!1,dt="docs",Me=[],Ne=[],sa="すべて",ra="すべて",Dn="",nn="";const oa="ants_info_documents_v1",ia="ants_info_links_v1",vr="ants_info_top_md_v1",ad=`## 🐜 Arinko Ants チーム情報 &amp; ドキュメントポータル
本ポータルでは、チーム運営に関する**各種マニュアル（配車・当番・緊急対応）**の閲覧、**合宿・イベント出欠アンケート（日程調整・お弁当注文）**の実施、および**グラウンド地図や公式連盟などの便利リンク集**を一元管理しています。

> [!NOTE]
> - **配車調整マニュアル**や**当番業務の手引き**は「ドキュメント」タブよりいつでも閲覧・ダウンロード可能です。
> - 夏季合宿やイベントの日程調整・注文アンケートは「アンケート」タブから回答できます（ゲスト回答も可能）。
`,Us=[{id:"doc-manual-dispatch",title:"配車調整機能 利用者マニュアル",category:"配車マニュアル",summary:"少年野球チーム「Arinko Ants」の活動におけるイベント配車の自動作成・手動微調整・LINE案内出力までの全体操作マニュアルです。",content:`# 配車調整機能 利用者マニュアル

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
  - [ ] 倉庫施錠および学校鍵の返却`,files:[],created_by:"父母会",updated_at:"2026-04-01"}],Vs=[{id:"link-official-site",title:"Arinko Ants 公式ホームページ",url:"https://arinkoants.sakura.ne.jp/",category:"公式・連盟",description:"チームの公式Webサイト。チーム紹介、選手募集案内、活動予定などが掲載されています。",icon:"🐜",display_order:1},{id:"link-google-calendar",title:"チーム活動予定 Googleカレンダー",url:"https://calendar.google.com/",category:"スケジュール・連絡",description:"練習日、遠征試合、大会スケジュールが登録されているGoogleカレンダーです。",icon:"📅",display_order:2},{id:"link-nagareyama-league",title:"流山市少年野球連盟 公式サイト",url:"http://nagareyama-baseball.jp/",category:"公式・連盟",description:"市内大会の組み合わせトーナメント表、試合日程、グラウンド規程などが確認できます。",icon:"⚾",display_order:3},{id:"link-chiba-league",title:"千葉県少年野球連盟",url:"http://chiba-baseball.jp/",category:"公式・連盟",description:"千葉県大会の要項、大会結果、競技規則の最新情報が掲載されています。",icon:"🏆",display_order:4},{id:"link-ground-map",title:"主な活動グラウンド案内 (Google Maps)",url:"https://maps.google.com/",category:"グラウンド・施設",description:"ホームグラウンド（東小学校）および近隣の流山市内グラウンドへのアクセス地図一覧です。",icon:"📍",display_order:5},{id:"link-weather-forecast",title:"流山市のピンポイント天気予報 (tenki.jp)",url:"https://tenki.jp/forecast/3/15/4510/12220/",category:"便利ツール",description:"当日の雨雲レーダー、1時間ごとの降水確率、風速、WBGT（熱中症指数）を確認できます。",icon:"☀️",display_order:6},{id:"link-baseball-rules",title:"公認野球規則 & 少年野球特別規則",url:"https://japan-baseball.jp/",category:"便利ツール",description:"全日本軟式野球連盟（JSBB）による少年野球特別規程および公認野球規則の解説です。",icon:"📖",display_order:7}],wr=["すべて","配車マニュアル","チーム運営・規約","野球ルール・スコア","その他"],Er=["すべて","公式・連盟","グラウンド・施設","スケジュール・連絡","便利ツール","その他"];async function Qn({supabaseClient:e,currentUser:t,currentUserRole:n}){Pe=e,Ye=t,Ka=n,Bt=n==="admin"||(t==null?void 0:t.can_edit_info)===!0||n==="leader"&&(t==null?void 0:t.can_edit_info)!==!1,sd(),await rd(),await Di({supabaseClient:Pe,currentUser:Ye,currentUserRole:Ka,canManageInfo:Bt}),_d(),$r(),kr()}function sd(){document.querySelectorAll(".info-admin-only").forEach(n=>{Bt?n.classList.remove("hidden"):n.classList.add("hidden")});const t=document.getElementById("info-user-role-badge");t&&(Ka==="admin"?(t.className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-purple-100 text-purple-700 border border-purple-200",t.textContent="管理者 (編集可)"):Bt?(t.className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-teal-100 text-teal-700 border border-teal-200",t.textContent="編集可"):(t.className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-gray-100 text-gray-700 border border-gray-200",t.textContent="閲覧専用"))}async function rd(){let e=!1,t=!1,n=!1;if(Pe){try{const{data:a,error:s}=await Pe.from("info_documents").select("*").order("updated_at",{ascending:!1});!s&&a&&a.length>0&&(Me=a,e=!0)}catch(a){console.warn("Supabase info_documents select failed:",a)}try{const{data:a,error:s}=await Pe.from("info_links").select("*").order("display_order",{ascending:!0});!s&&a&&a.length>0&&(Ne=a,t=!0)}catch(a){console.warn("Supabase info_links select failed:",a)}try{const{data:a,error:s}=await Pe.from("info_pages").select("*").eq("id","top_announcement").single();!s&&a&&a.content&&(nn=a.content,n=!0)}catch(a){console.warn("Supabase info_pages select failed:",a)}}if(!e)try{const a=localStorage.getItem(oa);a?Me=JSON.parse(a):(Me=[...Us],localStorage.setItem(oa,JSON.stringify(Me)))}catch{Me=[...Us]}if(!t)try{const a=localStorage.getItem(ia);a?Ne=JSON.parse(a):(Ne=[...Vs],localStorage.setItem(ia,JSON.stringify(Ne)))}catch{Ne=[...Vs]}if(!n){const a=localStorage.getItem(vr);nn=a!==null?a:ad}}async function _r(e,t=!1){const n=Me.findIndex(a=>a.id===e.id);n>=0?Me[n]=e:Me.unshift(e);try{localStorage.setItem(oa,JSON.stringify(Me))}catch(a){console.error(a)}if(Pe)try{t?await Pe.from("info_documents").insert([e]):await Pe.from("info_documents").update(e).eq("id",e.id)}catch(a){console.warn("Supabase document save failed:",a)}}async function od(e){Me=Me.filter(t=>t.id!==e);try{localStorage.setItem(oa,JSON.stringify(Me))}catch(t){console.error(t)}if(Pe)try{await Pe.from("info_documents").delete().eq("id",e)}catch(t){console.warn("Supabase document delete failed:",t)}}async function Ir(e,t=!1){const n=Ne.findIndex(a=>a.id===e.id);n>=0?Ne[n]=e:Ne.push(e);try{localStorage.setItem(ia,JSON.stringify(Ne))}catch(a){console.error(a)}if(Pe)try{t?await Pe.from("info_links").insert([e]):await Pe.from("info_links").update(e).eq("id",e.id)}catch(a){console.warn("Supabase link save failed:",a)}}async function id(e){Ne=Ne.filter(t=>t.id!==e);try{localStorage.setItem(ia,JSON.stringify(Ne))}catch(t){console.error(t)}if(Pe)try{await Pe.from("info_links").delete().eq("id",e)}catch(t){console.warn("Supabase link delete failed:",t)}}async function dd(e){nn=e;try{localStorage.setItem(vr,e)}catch(t){console.error(t)}if(Pe)try{await Pe.from("info_pages").upsert([{id:"top_announcement",content:e,updated_at:new Date().toISOString(),updated_by:(Ye==null?void 0:Ye.name)||"管理者"}])}catch(t){console.warn("Supabase top_announcement save failed:",t)}$r()}function $r(){const e=document.getElementById("info-top-announcement-rendered"),t=document.getElementById("info-top-announcement-wrap");!e||!t||(nn&&nn.trim()?(t.classList.remove("hidden"),e.innerHTML=xa(nn)):t.classList.add("hidden"))}function kr(){Lr(),dt==="docs"?Ln():dt==="surveys"?dn():Sn()}function Lr(){const e=document.getElementById("info-category-filters");if(!e)return;if(dt==="surveys"){e.classList.add("hidden");return}e.classList.remove("hidden");const t=dt==="docs"?wr:Er,n=dt==="docs"?sa:ra;e.innerHTML=t.map(a=>`<button class="info-cat-btn px-3.5 py-1.5 text-xs rounded-full transition-all cursor-pointer ${n===a?"bg-teal-600 text-white shadow-sm font-bold":"bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}" data-category="${a}">${a}</button>`).join(""),e.querySelectorAll(".info-cat-btn").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-category");dt==="docs"?(sa=s,Ln()):(ra=s,Sn()),Lr()})})}function Ln(){const e=document.getElementById("info-docs-container"),t=document.getElementById("info-docs-empty");if(!e)return;let n=Me;if(sa!=="すべて"&&(n=n.filter(a=>a.category===sa)),Dn.trim()){const a=Dn.toLowerCase().trim();n=n.filter(s=>s.title&&s.title.toLowerCase().includes(a)||s.summary&&s.summary.toLowerCase().includes(a)||s.content&&s.content.toLowerCase().includes(a)||s.category&&s.category.toLowerCase().includes(a))}if(n.length===0){e.innerHTML="",t&&t.classList.remove("hidden");return}t&&t.classList.add("hidden"),e.innerHTML=n.map(a=>{const s=bs(a.category),r=a.files?a.files.length:0;return`
            <div class="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between group">
                <div>
                    <div class="flex items-center justify-between gap-2 mb-2.5">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${s}">
                            ${a.category||"その他"}
                        </span>
                        <span class="text-[11px] text-gray-400 font-mono">更新: ${a.updated_at||"-"}</span>
                    </div>
                    <h3 class="text-base font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                        ${Qe(a.title)}
                    </h3>
                    <p class="text-xs text-gray-600 line-clamp-3 mb-3 leading-relaxed">
                        ${Qe(a.summary||a.content.slice(0,100))}
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
                    ${Bt?`
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
        `}).join(""),e.querySelectorAll(".btn-view-doc").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id"),r=Me.find(o=>o.id===s);r&&ud(r)})}),Bt&&(e.querySelectorAll(".btn-duplicate-doc").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id");await ld(s)})}),e.querySelectorAll(".btn-edit-doc").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id"),r=Me.find(o=>o.id===s);r&&Sr(r)})}),e.querySelectorAll(".btn-delete-doc").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id"),r=Me.find(o=>o.id===s);r&&confirm(`ドキュメント「${r.title}」を削除しますか？`)&&(await od(s),Ln())})}))}async function ld(e){const t=Me.find(a=>a.id===e);if(!t)return;const n=JSON.parse(JSON.stringify(t));n.id=`doc_${Date.now()}`,n.title=`(複製) ${t.title}`,n.created_at=new Date().toISOString(),n.updated_at=new Date().toISOString(),n.author_name=(Ye==null?void 0:Ye.name)||"管理者",await _r(n,!0),Ln(),alert(`ドキュメント「${n.title}」を作成（複製）しました！`)}function Sn(){const e=document.getElementById("info-links-container"),t=document.getElementById("info-links-empty");if(!e)return;let n=Ne;if(ra!=="すべて"&&(n=n.filter(a=>a.category===ra)),Dn.trim()){const a=Dn.toLowerCase().trim();n=n.filter(s=>s.title&&s.title.toLowerCase().includes(a)||s.description&&s.description.toLowerCase().includes(a)||s.url&&s.url.toLowerCase().includes(a)||s.category&&s.category.toLowerCase().includes(a))}if(n.length===0){e.innerHTML="",t&&t.classList.remove("hidden");return}t&&t.classList.add("hidden"),e.innerHTML=n.map(a=>{const s=bs(a.category),r=a.icon||"🔗",o=a.url?a.url.replace(/^https?:\/\//,"").replace(/\/$/,""):"";return`
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
                        ${Qe(a.title)}
                    </h3>
                    <p class="text-xs text-gray-400 font-mono mb-2 truncate" title="${Qe(a.url)}">
                        ${Qe(o)}
                    </p>
                    <p class="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3">
                        ${Qe(a.description||"説明はありません")}
                    </p>
                </div>
                <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <a href="${Qe(a.url)}" target="_blank" rel="noopener noreferrer" 
                       class="inline-flex items-center text-xs font-bold bg-teal-50 hover:bg-teal-600 text-teal-700 hover:text-white px-3 py-1.5 rounded-lg transition duration-150 cursor-pointer">
                        <span>サイトを開く</span>
                        <svg class="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                    ${Bt?`
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
        `}).join(""),Bt&&(e.querySelectorAll(".btn-duplicate-link").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id");await cd(s)})}),e.querySelectorAll(".btn-edit-link").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id"),r=Ne.find(o=>o.id===s);r&&Br(r)})}),e.querySelectorAll(".btn-delete-link").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id"),r=Ne.find(o=>o.id===s);r&&confirm(`リンク「${r.title}」を削除しますか？`)&&(await id(s),Sn())})}))}async function cd(e){const t=Ne.find(a=>a.id===e);if(!t)return;const n=JSON.parse(JSON.stringify(t));n.id=`link_${Date.now()}`,n.title=`(複製) ${t.title}`,n.created_at=new Date().toISOString(),n.display_order=(t.display_order||0)+1,await Ir(n,!0),Sn(),alert(`リンク「${n.title}」を作成（複製）しました！`)}function bs(e){switch(e){case"配車マニュアル":return"bg-blue-100 text-blue-800 border border-blue-200";case"チーム運営・規約":return"bg-amber-100 text-amber-800 border border-amber-200";case"野球ルール・スコア":return"bg-green-100 text-green-800 border border-green-200";case"公式・連盟":return"bg-purple-100 text-purple-800 border border-purple-200";case"グラウンド・施設":return"bg-emerald-100 text-emerald-800 border border-emerald-200";case"スケジュール・連絡":return"bg-sky-100 text-sky-800 border border-sky-200";case"便利ツール":return"bg-indigo-100 text-indigo-800 border border-indigo-200";default:return"bg-gray-100 text-gray-700 border border-gray-200"}}let da=null;function ud(e){const t=document.getElementById("modal-info-doc-reader");if(!t)return;da=e,document.getElementById("reader-doc-title").textContent=e.title,document.getElementById("reader-doc-category").textContent=e.category||"その他",document.getElementById("reader-doc-category").className=`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${bs(e.category)}`,document.getElementById("reader-doc-updated").textContent=`最終更新: ${e.updated_at||"-"} (作成: ${e.created_by||"チーム"})`;const n=document.getElementById("reader-doc-files-container"),a=document.getElementById("reader-doc-files-list");n&&a&&(e.files&&e.files.length>0?(n.classList.remove("hidden"),a.innerHTML=e.files.map(r=>`
                <a href="${r.dataUrl||"#"}" download="${Qe(r.name)}" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-teal-50 text-gray-700 hover:text-teal-700 border border-gray-200 text-xs font-bold transition">
                    <span>📎</span>
                    <span>${Qe(r.name)}</span>
                    <span class="text-[10px] text-gray-400 font-normal">(${Math.round((r.size||0)/1024)}KB)</span>
                </a>
            `).join("")):(n.classList.add("hidden"),a.innerHTML=""));const s=document.getElementById("reader-doc-content");s&&(s.innerHTML=xa(e.content||"",!0),hs(s)),t.classList.remove("hidden")}function md(){const e=document.getElementById("modal-info-doc-reader");e&&e.classList.add("hidden"),da=null}function pd(){if(!da)return;const e=da,t=new Blob([e.content||""],{type:"text/markdown;charset=utf-8;"}),n=document.createElement("a");n.href=URL.createObjectURL(t),n.download=`${e.title||"document"}.md`,n.click()}let la=null,an=[];function Sr(e=null){const t=document.getElementById("modal-info-doc-editor");if(!t)return;la=e?e.id:null,an=e&&e.files?JSON.parse(JSON.stringify(e.files)):[],document.getElementById("doc-editor-modal-title").textContent=e?"ドキュメントの編集":"新規ドキュメント作成",document.getElementById("input-doc-title").value=e?e.title:"",document.getElementById("input-doc-summary").value=e&&e.summary||"",document.getElementById("input-doc-content").value=e?e.content:"";const n=document.getElementById("select-doc-category");n.innerHTML=wr.filter(a=>a!=="すべて").map(a=>`<option value="${a}" ${e&&e.category===a?"selected":""}>${a}</option>`).join(""),ys(),Za("write"),t.classList.remove("hidden")}function Qa(){const e=document.getElementById("modal-info-doc-editor");e&&e.classList.add("hidden"),la=null,an=[]}function ys(){const e=document.getElementById("doc-editor-files-list");if(e){if(an.length===0){e.innerHTML='<span class="text-xs text-gray-400">添付ファイルはありません</span>';return}e.innerHTML=an.map((t,n)=>`
        <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 border border-gray-200 text-xs text-gray-700">
            <span>📎 ${Qe(t.name)} (${Math.round((t.size||0)/1024)}KB)</span>
            <button class="btn-del-file text-red-500 hover:text-red-700 font-bold ml-1" data-index="${n}">✕</button>
        </div>
    `).join(""),e.querySelectorAll(".btn-del-file").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-index"));an.splice(n,1),ys()})})}}function fd(e){Array.from(e).forEach(t=>{if(t.size>5*1024*1024){alert(`ファイル「${t.name}」が5MBを超えているため添付できません。`);return}const n=new FileReader;n.onload=a=>{an.push({name:t.name,size:t.size,type:t.type,dataUrl:a.target.result}),ys()},n.readAsDataURL(t)})}function gd(e){if(!e)return;const t=new FileReader;t.onload=n=>{const a=n.target.result,s=document.getElementById("input-doc-title"),r=document.getElementById("input-doc-content");s&&(!s.value||s.value.trim()==="")&&(s.value=e.name.replace(/\.md$/i,"")),r&&(r.value=a)},t.readAsText(e)}function Za(e){const t=document.getElementById("btn-doc-tab-write"),n=document.getElementById("btn-doc-tab-preview"),a=document.getElementById("input-doc-content"),s=document.getElementById("doc-preview-content");e==="write"?(t==null||t.classList.add("bg-white","text-teal-700","shadow-xs"),t==null||t.classList.remove("text-gray-500"),n==null||n.classList.remove("bg-white","text-teal-700","shadow-xs"),n==null||n.classList.add("text-gray-500"),a==null||a.classList.remove("hidden"),s==null||s.classList.add("hidden")):(n==null||n.classList.add("bg-white","text-teal-700","shadow-xs"),n==null||n.classList.remove("text-gray-500"),t==null||t.classList.remove("bg-white","text-teal-700","shadow-xs"),t==null||t.classList.add("text-gray-500"),a==null||a.classList.add("hidden"),s==null||s.classList.remove("hidden"),s&&a&&(s.innerHTML=xa(a.value||"*本文が入力されていません*"),hs(s)))}async function bd(){var i,d,l,c;const e=(i=document.getElementById("input-doc-title"))==null?void 0:i.value.trim(),t=(d=document.getElementById("select-doc-category"))==null?void 0:d.value,n=(l=document.getElementById("input-doc-summary"))==null?void 0:l.value.trim(),a=(c=document.getElementById("input-doc-content"))==null?void 0:c.value.trim();if(!e){alert("タイトルを入力してください");return}if(!a){alert("本文を入力してください");return}const s=new Date().toISOString().split("T")[0],r=!la,o={id:la||`doc_${Date.now()}`,title:e,category:t,summary:n||a.slice(0,100),content:a,files:an,created_by:(Ye==null?void 0:Ye.name)||"管理者",updated_at:s};await _r(o,r),Qa(),Ln()}function yd(){const e=document.getElementById("modal-info-top-editor");if(!e)return;const t=document.getElementById("input-info-top-content");t&&(t.value=nn),es("write"),e.classList.remove("hidden")}function Xa(){const e=document.getElementById("modal-info-top-editor");e&&e.classList.add("hidden")}function es(e){const t=document.getElementById("btn-top-tab-write"),n=document.getElementById("btn-top-tab-preview"),a=document.getElementById("input-info-top-content"),s=document.getElementById("top-preview-content");e==="write"?(t==null||t.classList.add("bg-white","text-teal-700","shadow-xs"),t==null||t.classList.remove("text-gray-500"),n==null||n.classList.remove("bg-white","text-teal-700","shadow-xs"),n==null||n.classList.add("text-gray-500"),a==null||a.classList.remove("hidden"),s==null||s.classList.add("hidden")):(n==null||n.classList.add("bg-white","text-teal-700","shadow-xs"),n==null||n.classList.remove("text-gray-500"),t==null||t.classList.remove("bg-white","text-teal-700","shadow-xs"),t==null||t.classList.add("text-gray-500"),a==null||a.classList.add("hidden"),s==null||s.classList.remove("hidden"),s&&a&&(s.innerHTML=xa(a.value||"*内容が入力されていません*"),hs(s)))}async function hd(){var t;const e=(t=document.getElementById("input-info-top-content"))==null?void 0:t.value;await dd(e),Xa()}let Tn=null;function Br(e=null){const t=document.getElementById("modal-info-link-editor");if(!t)return;Tn=e?e.id:null,document.getElementById("link-editor-modal-title").textContent=e?"リンクの編集":"新規リンク追加",document.getElementById("input-link-title").value=e?e.title:"",document.getElementById("input-link-url").value=e?e.url:"",document.getElementById("input-link-desc").value=e&&e.description||"",document.getElementById("input-link-icon").value=e&&e.icon||"🔗";const n=document.getElementById("select-link-category");n.innerHTML=Er.filter(a=>a!=="すべて").map(a=>`<option value="${a}" ${e&&e.category===a?"selected":""}>${a}</option>`).join(""),t.classList.remove("hidden")}function ts(){const e=document.getElementById("modal-info-link-editor");e&&e.classList.add("hidden"),Tn=null}async function xd(){var i,d,l,c,u,m;const e=(i=document.getElementById("input-link-title"))==null?void 0:i.value.trim(),t=(d=document.getElementById("input-link-url"))==null?void 0:d.value.trim(),n=(l=document.getElementById("select-link-category"))==null?void 0:l.value,a=(c=document.getElementById("input-link-desc"))==null?void 0:c.value.trim(),s=((u=document.getElementById("input-link-icon"))==null?void 0:u.value.trim())||"🔗";if(!e){alert("タイトルを入力してください");return}if(!t){alert("URLを入力してください");return}if(!t.startsWith("http://")&&!t.startsWith("https://")){alert("URLは http:// または https:// から入力してください");return}const r=!Tn,o={id:Tn||`link_${Date.now()}`,title:e,url:t,category:n,description:a,icon:s,display_order:r?Ne.length+1:((m=Ne.find(g=>g.id===Tn))==null?void 0:m.display_order)||1,created_by:(Ye==null?void 0:Ye.name)||"管理者",updated_at:new Date().toISOString().split("T")[0]};await Ir(o,r),ts(),Sn()}const Tr=`-- ==========================================
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
`;function vd(){const e=document.getElementById("modal-info-sql");if(!e)return;const t=document.getElementById("info-sql-code");t&&(t.textContent=Tr),e.classList.remove("hidden")}function wd(){const e=document.getElementById("modal-info-sql");e&&e.classList.add("hidden")}function Ed(){navigator.clipboard.writeText(Tr).then(()=>{alert(`SQL文をクリップボードにコピーしました！
Supabase Dashboardの「SQL Editor」で実行してください。`)}).catch(e=>{console.error("Copy failed:",e)})}let Gs=!1;function _d(){var m,g,b,y,f,p,v,x,h,k,L,w,I,E,$,_,C,O,N;if(Gs)return;Gs=!0;const e=document.getElementById("tab-info-docs"),t=document.getElementById("tab-info-surveys"),n=document.getElementById("tab-info-links"),a=document.getElementById("view-info-docs"),s=document.getElementById("view-info-surveys"),r=document.getElementById("view-info-links"),o=document.getElementById("btn-info-new"),i=document.getElementById("btn-survey-new");function d(P){dt=P,[e,t,n].forEach(U=>{U&&(U.className="px-4 py-2 font-bold text-gray-500 hover:text-gray-700 border-b-2 border-transparent transition-colors flex items-center space-x-2 cursor-pointer")}),[a,s,r].forEach(U=>U==null?void 0:U.classList.add("hidden")),P==="docs"?(e.className="px-4 py-2 font-bold text-teal-600 border-b-2 border-teal-600 transition-colors flex items-center space-x-2 cursor-pointer",a==null||a.classList.remove("hidden"),o&&(o.classList.remove("hidden"),o.textContent="＋ 新規ドキュメント"),i&&i.classList.add("hidden")):P==="surveys"?(t.className="px-4 py-2 font-bold text-teal-600 border-b-2 border-teal-600 transition-colors flex items-center space-x-2 cursor-pointer",s==null||s.classList.remove("hidden"),o&&o.classList.add("hidden"),i&&Bt&&i.classList.remove("hidden")):(n.className="px-4 py-2 font-bold text-teal-600 border-b-2 border-teal-600 transition-colors flex items-center space-x-2 cursor-pointer",r==null||r.classList.remove("hidden"),o&&(o.classList.remove("hidden"),o.textContent="＋ 新規リンク"),i&&i.classList.add("hidden")),kr()}e==null||e.addEventListener("click",()=>d("docs")),t==null||t.addEventListener("click",()=>d("surveys")),n==null||n.addEventListener("click",()=>d("links"));const l=document.getElementById("input-info-search");l==null||l.addEventListener("input",P=>{Dn=P.target.value,dt==="docs"?Ln():dt==="links"&&Sn()}),o==null||o.addEventListener("click",()=>{dt==="docs"?Sr():dt==="links"&&Br()}),(m=document.getElementById("btn-edit-top-announcement"))==null||m.addEventListener("click",yd),(g=document.getElementById("btn-close-top-editor"))==null||g.addEventListener("click",Xa),(b=document.getElementById("btn-cancel-top-editor"))==null||b.addEventListener("click",Xa),(y=document.getElementById("btn-top-tab-write"))==null||y.addEventListener("click",()=>es("write")),(f=document.getElementById("btn-top-tab-preview"))==null||f.addEventListener("click",()=>es("preview")),(p=document.getElementById("btn-save-top-announcement"))==null||p.addEventListener("click",hd),(v=document.getElementById("btn-close-doc-reader"))==null||v.addEventListener("click",md),(x=document.getElementById("btn-export-doc-md"))==null||x.addEventListener("click",pd),(h=document.getElementById("btn-close-doc-editor"))==null||h.addEventListener("click",Qa),(k=document.getElementById("btn-cancel-doc-editor"))==null||k.addEventListener("click",Qa),(L=document.getElementById("btn-doc-tab-write"))==null||L.addEventListener("click",()=>Za("write")),(w=document.getElementById("btn-doc-tab-preview"))==null||w.addEventListener("click",()=>Za("preview")),(I=document.getElementById("btn-save-doc"))==null||I.addEventListener("click",bd);const c=document.getElementById("input-doc-attach-files");c==null||c.addEventListener("change",P=>{P.target.files&&fd(P.target.files)});const u=document.getElementById("input-doc-import-md");u==null||u.addEventListener("change",P=>{P.target.files&&P.target.files[0]&&gd(P.target.files[0])}),(E=document.getElementById("btn-close-link-editor"))==null||E.addEventListener("click",ts),($=document.getElementById("btn-cancel-link-editor"))==null||$.addEventListener("click",ts),(_=document.getElementById("btn-save-link"))==null||_.addEventListener("click",xd),(C=document.getElementById("btn-info-sql-modal"))==null||C.addEventListener("click",vd),(O=document.getElementById("btn-close-info-sql"))==null||O.addEventListener("click",wd),(N=document.getElementById("btn-copy-info-sql"))==null||N.addEventListener("click",Ed)}function xa(e,t=!1){if(!e)return"";const n=e.split(`
`);let a="",s=!1,r=!1,o=!1,i="",d=!1,l=[],c=!1,u="",m="";const g=[];function b(){s&&(a+=`</ul>
`,s=!1),r&&(a+=`</ol>
`,r=!1),d&&(a+=Ws(l),l=[],d=!1),c&&(a+=Id(u,m),m="",c=!1)}for(let y=0;y<n.length;y++){let f=n[y];if(f.trim().startsWith("```")){o?(a+=`
                    <div class="relative my-3 group">
                        <pre class="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-xs font-mono border border-gray-800 leading-relaxed"><code>${Qe(i.trim())}</code></pre>
                        <button class="btn-copy-code absolute top-2 right-2 px-2 py-1 text-[10px] font-bold rounded bg-gray-800 text-gray-300 hover:text-white border border-gray-700 opacity-0 group-hover:opacity-100 transition">コピー</button>
                    </div>
`,i="",o=!1):(b(),o=!0,f.trim().slice(3).trim());continue}if(o){i+=f+`
`;continue}const p=f.trim().match(/^>\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]/i);if(p){b(),c=!0,u=p[1].toUpperCase(),m="";continue}if(c)if(f.startsWith(">")){m+=f.replace(/^>\s?/,"")+`
`;continue}else b();if(f.trim().startsWith("|")&&f.trim().endsWith("|")){d||(b(),d=!0,l=[]),l.push(f.trim());continue}else d&&(a+=Ws(l),l=[],d=!1);if(f.trim()===""){b();continue}if(/^(\*{3,}|-{3,}|_{3,})$/.test(f.trim())){b(),a+=`<hr class="my-6 border-t border-gray-200">
`;continue}if(f.startsWith("# ")){b();const h=f.slice(2).trim(),k=`heading-${g.length}`;g.push({level:1,text:h,id:k}),a+=`<h1 id="${k}" class="text-2xl font-bold text-gray-900 mt-6 mb-3 pb-2 border-b border-gray-200">${Xe(h)}</h1>
`;continue}if(f.startsWith("## ")){b();const h=f.slice(3).trim(),k=`heading-${g.length}`;g.push({level:2,text:h,id:k}),a+=`<h2 id="${k}" class="text-xl font-bold text-gray-800 mt-5 mb-2.5">${Xe(h)}</h2>
`;continue}if(f.startsWith("### ")){b();const h=f.slice(4).trim(),k=`heading-${g.length}`;g.push({level:3,text:h,id:k}),a+=`<h3 id="${k}" class="text-lg font-bold text-gray-800 mt-4 mb-2">${Xe(h)}</h3>
`;continue}if(f.startsWith("#### ")){b();const h=f.slice(5).trim();a+=`<h4 class="text-base font-semibold text-gray-700 mt-3 mb-1.5">${Xe(h)}</h4>
`;continue}if(f.startsWith("> ")){b(),a+=`<blockquote class="border-l-4 border-teal-500 pl-4 py-1.5 my-3 bg-teal-50/50 text-xs text-gray-700 rounded-r">${Xe(f.slice(2))}</blockquote>
`;continue}const v=f.trim().match(/^[-*]\s*\[([ xX])\]\s*(.*)/);if(v){b();const h=v[1].toLowerCase()==="x";a+=`
                <div class="flex items-center gap-2 my-1 text-xs text-gray-700">
                    <input type="checkbox" ${h?"checked":""} disabled class="rounded text-teal-600">
                    <span class="${h?"line-through text-gray-400":""}">${Xe(v[2])}</span>
                </div>
`;continue}if(f.trim().startsWith("- ")||f.trim().startsWith("* ")){r&&(a+=`</ol>
`,r=!1),s||(a+=`<ul class="list-disc list-inside my-2 space-y-1 text-xs text-gray-700 leading-relaxed">
`,s=!0);const h=f.trim().slice(2);a+=`  <li>${Xe(h)}</li>
`;continue}const x=f.trim().match(/^(\d+)\.\s+(.*)/);if(x){s&&(a+=`</ul>
`,s=!1),r||(a+=`<ol class="list-decimal list-inside my-2 space-y-1 text-xs text-gray-700 leading-relaxed">
`,r=!0),a+=`  <li>${Xe(x[2])}</li>
`;continue}b(),a+=`<p class="my-2 text-xs text-gray-700 leading-relaxed">${Xe(f)}</p>
`}return b(),t&&g.length>=2&&(a=`
            <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                <span class="text-xs font-bold text-gray-700 block mb-2">📑 目次</span>
                <ul class="space-y-1 text-xs">
                    ${g.map(f=>`
                        <li class="${f.level===2?"pl-3":f.level===3?"pl-6":""}">
                            <a href="#${f.id}" class="text-teal-600 hover:text-teal-800 hover:underline">
                                ${Qe(f.text)}
                            </a>
                        </li>
                    `).join("")}
                </ul>
            </div>
        `+a),a}function Id(e,t){let n="border-teal-500",a="bg-teal-50/70",s="text-teal-800",r="ℹ️",o="NOTE";e==="TIP"?(n="border-emerald-500",a="bg-emerald-50/70",s="text-emerald-800",r="💡",o="TIP"):e==="WARNING"||e==="CAUTION"?(n="border-amber-500",a="bg-amber-50/70",s="text-amber-800",r="⚠️",o="WARNING"):e==="IMPORTANT"&&(n="border-blue-500",a="bg-blue-50/70",s="text-blue-800",r="📌",o="IMPORTANT");const i=t.split(`
`).filter(d=>d.trim()).map(d=>`<p class="my-1 text-xs text-gray-700 leading-relaxed">${Xe(d)}</p>`).join("");return`
        <div class="border-l-4 ${n} ${a} p-3.5 my-3 rounded-r-xl border border-gray-200/50">
            <div class="flex items-center gap-1.5 font-bold text-xs ${s} mb-1">
                <span>${r}</span>
                <span>${o}</span>
            </div>
            ${i}
        </div>
    `}function Ws(e){if(e.length<2)return"";let t='<div class="overflow-x-auto my-4 scrollbar-thin"><table class="min-w-full text-xs border border-gray-200 rounded-xl overflow-hidden">';const n=e[0].split("|").slice(1,-1).map(a=>a.trim());t+='<thead class="bg-gray-50 border-b border-gray-200"><tr>',n.forEach(a=>{t+=`<th class="px-3.5 py-2.5 text-left font-bold text-gray-700 border-r border-gray-200 last:border-r-0">${Xe(a)}</th>`}),t+="</tr></thead><tbody>";for(let a=2;a<e.length;a++){const s=e[a].split("|").slice(1,-1).map(r=>r.trim());t+=`<tr class="${a%2===0?"bg-white":"bg-gray-50/40"} border-b border-gray-100 last:border-b-0 hover:bg-teal-50/30">`,s.forEach(r=>{t+=`<td class="px-3.5 py-2.5 text-gray-600 border-r border-gray-100 last:border-r-0">${Xe(r)}</td>`}),t+="</tr>"}return t+="</tbody></table></div>",t}function Xe(e){if(!e)return"";let t=Qe(e);return t=t.replace(/\*\*(.*?)\*\*/g,'<strong class="font-bold text-gray-900">$1</strong>'),t=t.replace(/\*(.*?)\*/g,'<em class="italic">$1</em>'),t=t.replace(/`([^`]+)`/g,'<code class="px-1.5 py-0.5 bg-gray-100 text-teal-700 rounded text-[11px] font-mono border border-gray-200">$1</code>'),t=t.replace(/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer" class="text-teal-600 hover:text-teal-800 underline font-semibold">$1 ↗</a>'),t}function hs(e){e.querySelectorAll(".btn-copy-code").forEach(t=>{t.addEventListener("click",()=>{var a;const n=((a=t.parentElement.querySelector("code"))==null?void 0:a.textContent)||"";navigator.clipboard.writeText(n).then(()=>{const s=t.textContent;t.textContent="コピー完了！",setTimeout(()=>{t.textContent=s},2e3)})})})}function Qe(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}const Ar={},$d="https://arcdgbzqfengqyvfbodt.supabase.co",kd="sb_publishable_Ei6ti5lKjAECmi36haftpw_DQsKMp4p",vn=Ar?"https://arcdgbzqfengqyvfbodt.supabase.co":$d,ca=Ar?"sb_publishable_Ei6ti5lKjAECmi36haftpw_DQsKMp4p":kd;vn.startsWith("https://")||console.warn("設定警告: VITE_SUPABASE_URL に https:// が含まれていません。値: "+vn);console.log("Checking Supabase URL:","Exists");if(!window.supabaseClient&&window.supabase&&window.supabase.createClient&&vn&&ca)try{window.supabaseClient=window.supabase.createClient(vn,ca)}catch(e){console.error("Supabase初期化エラー:",e)}const S=window.supabaseClient||null;let j=null,wn=!1,he="user";function va(e){return e=e.trim(),e?e.includes("@")?e:`${e}@ants.local`:""}function sn(e){return e?e.endsWith("@ants.local")?e.split("@")[0]:e:""}let yn=0,ot=null;function Ld(e){const t=document.getElementById("loading-overlay");if(t){const n=t.querySelector("span");n&&(n.textContent=e)}ot||(ot=document.createElement("div"),ot.id="loading-detail-text",ot.className="fixed bottom-2 right-2 text-xs md:text-sm font-bold text-gray-600 bg-white/90 border border-gray-300 px-3 py-1.5 rounded shadow-lg pointer-events-none z-[9999] transition-opacity duration-300",document.body.appendChild(ot)),ot.textContent=e,ot.style.opacity="1"}function F(e="通信中..."){yn++;const t=document.getElementById("loading-overlay");t&&yn===1&&t.classList.remove("hidden"),Ld(e)}function q(){var e;yn--,yn<=0&&(yn=0,(e=document.getElementById("loading-overlay"))==null||e.classList.add("hidden"),ot&&(ot.style.opacity="0"))}function Fe(){var e;yn=0,(e=document.getElementById("loading-overlay"))==null||e.classList.add("hidden"),ot&&(ot.style.opacity="0")}async function ve(e,t="通信中..."){F(t);try{return await e()}catch(n){throw console.error("Supabase DB Error:",n),Fe(),n.message==="Load failed"||n.message==="Failed to fetch"?alert(`サーバー通信エラー: 通信に失敗しました。
ネットワーク接続、または環境変数(Supabase URL)の設定が正しいか確認してください。`):alert(`サーバー通信エラー:
`+n.message),n}finally{q()}}async function ae(e,t){if(j&&e!=="NAVIGATE")try{await S.from("action_logs").insert({user_email:j.email,action_type:e,details:t})}catch(n){console.error("Log error:",n)}}function zs(){var e,t,n,a,s,r,o,i,d,l,c,u,m,g,b,y,f,p,v,x,h,k,L,w,I,E,$,_,C,O,N,P,U,M,B,A,T,D,G,H,W,R,z,J,ye,ne;if(!window.isDomInitialized)try{if(window.isDomInitialized=!0,document.title="bb-sys for arinko ants.",document.body){const V=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,!1);let re;for(;re=V.nextNode();)re.nodeValue.includes("配車調整アプリ")&&(re.nodeValue=re.nodeValue.replace(/配車調整アプリ/g,"bb-sys for arinko ants.")),re.nodeValue.includes("少年野球に役立つツール for arinko ants.")&&(re.nodeValue=re.nodeValue.replace(/少年野球に役立つツール for arinko ants./g,"bb-sys for arinko ants."))}document.documentElement.style.setProperty("--layout-columns",ss),window.addEventListener("resize",Ys),Ys(),(e=document.getElementById("btn-login"))==null||e.addEventListener("click",Js),(t=document.getElementById("auth-form"))==null||t.addEventListener("submit",Js),(n=document.getElementById("btn-logout"))==null||n.addEventListener("click",zn),(a=document.getElementById("btn-logout-menu"))==null||a.addEventListener("click",zn),(s=document.getElementById("btn-clear-cache"))==null||s.addEventListener("click",Sd),(r=document.getElementById("link-to-signup"))==null||r.addEventListener("click",V=>{V.preventDefault(),Q("signup-view")}),(o=document.getElementById("link-to-reset"))==null||o.addEventListener("click",V=>{V.preventDefault(),Q("password-reset-view")}),document.querySelectorAll(".link-back-to-login").forEach(V=>V.addEventListener("click",re=>{re.preventDefault(),Q("auth-view")})),(i=document.getElementById("btn-submit-signup"))==null||i.addEventListener("click",Bd),(d=document.getElementById("btn-send-reset"))==null||d.addEventListener("click",Td),(l=document.getElementById("btn-update-password"))==null||l.addEventListener("click",Ad),(c=document.getElementById("btn-change-password"))==null||c.addEventListener("click",()=>{var V;(V=document.getElementById("change-password-modal"))==null||V.classList.remove("hidden")}),(u=document.getElementById("btn-close-change-password"))==null||u.addEventListener("click",()=>{var V;(V=document.getElementById("change-password-modal"))==null||V.classList.add("hidden")}),(m=document.getElementById("btn-submit-change-password"))==null||m.addEventListener("click",Cd);const de=document.getElementById("btn-change-password");de&&(de.textContent="パスワード変更"),(g=document.getElementById("nav-users"))==null||g.addEventListener("click",Nn),(b=document.getElementById("btn-admin-add-user"))==null||b.addEventListener("click",adminAddUser),(y=document.getElementById("btn-reload-users"))==null||y.addEventListener("click",oe),(f=document.getElementById("btn-save-all-users"))==null||f.addEventListener("click",Dd),(p=document.getElementById("admin-users-sort"))==null||p.addEventListener("change",V=>{localStorage.setItem("admin_users_sort",V.target.value),oe()}),(v=document.getElementById("btn-export-users"))==null||v.addEventListener("click",wl),(x=document.getElementById("btn-import-users"))==null||x.addEventListener("click",()=>document.getElementById("input-import-users-csv").click()),(h=document.getElementById("btn-download-users-sample"))==null||h.addEventListener("click",$l),(k=document.getElementById("input-import-users-csv"))==null||k.addEventListener("change",El),(L=document.getElementById("btn-close-csv-modal"))==null||L.addEventListener("click",pa),(w=document.getElementById("btn-close-csv-modal-x"))==null||w.addEventListener("click",pa),(I=document.getElementById("btn-execute-csv-import"))==null||I.addEventListener("click",_l);const Le=document.getElementById("btn-admin-add-user");if(Le&&!document.getElementById("btn-admin-add-dummy-user")){const V=document.createElement("button");V.id="btn-admin-add-dummy-user",V.className="ml-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow font-bold text-sm",V.textContent="代行専用メンバー追加",V.onclick=adminAddDummyUser,(E=Le.parentNode)==null||E.appendChild(V)}const Ke=document.querySelector("#view-master #btn-load-logs");Ke&&Ke.remove();const se=document.querySelector("#view-master #log-list");if(se){const V=se.closest(".bg-white");V?V.remove():se.remove()}document.querySelectorAll("#view-master h2").forEach(V=>{V.textContent.includes("操作ログ")&&V.remove()});const Ze=document.getElementById("tab-master-admin");if(Ze&&!document.getElementById("tab-logs-admin")){const V=Ze.parentElement,re=document.createElement("button");re.id="tab-logs-admin",re.className="px-4 py-2 font-bold text-gray-500 hover:text-gray-700 border-b-2 border-transparent transition-colors",re.textContent="操作ログ",V==null||V.appendChild(re);const Te=document.createElement("div");Te.id="tab-content-logs-admin",Te.className="hidden",Te.innerHTML=`
                <div class="mb-4 flex space-x-2 mt-4">
                    <button id="btn-load-logs" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow font-bold">最新を読み込み</button>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
                    <div id="log-list" class="min-w-[600px] text-sm flex flex-col">
                        <p class="text-gray-500 py-4 text-center">「最新を読み込み」ボタンを押してください</p>
                    </div>
                </div>
            `;const qe=document.getElementById("tab-content-master-admin");qe&&qe.parentElement&&qe.parentElement.appendChild(Te)}const Re=V=>{[{btnId:"tab-users-admin",contentId:"tab-content-users-admin"},{btnId:"tab-master-admin",contentId:"tab-content-master-admin"},{btnId:"tab-logs-admin",contentId:"tab-content-logs-admin"}].forEach(Te=>{const qe=document.getElementById(Te.btnId),ft=document.getElementById(Te.contentId);!qe||!ft||(Te.btnId===V?(qe.className="px-4 py-2 font-bold text-blue-600 border-b-2 border-blue-600 transition-colors",ft.classList.remove("hidden"),V==="tab-logs-admin"&&Pn()):(qe.className="px-4 py-2 font-bold text-gray-500 hover:text-gray-700 border-b-2 border-transparent transition-colors",ft.classList.add("hidden")))})};($=document.getElementById("tab-users-admin"))==null||$.addEventListener("click",()=>Re("tab-users-admin")),(_=document.getElementById("tab-master-admin"))==null||_.addEventListener("click",()=>Re("tab-master-admin")),(C=document.getElementById("tab-logs-admin"))==null||C.addEventListener("click",()=>Re("tab-logs-admin")),(O=document.getElementById("btn-load-logs"))==null||O.addEventListener("click",Pn),(N=document.getElementById("btn-app-dispatch"))==null||N.addEventListener("click",()=>{var V;Q("app-view","dispatch"),wn?(V=document.getElementById("nav-dispatch"))==null||V.click():as()}),(P=document.getElementById("btn-app-attendance"))==null||P.addEventListener("click",async()=>{Q("attendance-view"),await ve(Ra,"出欠管理画面を準備中...")}),(U=document.getElementById("btn-app-dashboard"))==null||U.addEventListener("click",async()=>{await ve(ja,"ダッシュボードを準備中..."),Q("dashboard-view")}),(M=document.getElementById("btn-app-info"))==null||M.addEventListener("click",async()=>{await ve(async()=>{await Qn({supabaseClient:S,currentUser:j,currentUserRole:he})},"Info画面を準備中..."),Q("info-view")}),(B=document.getElementById("btn-back-to-menu-info"))==null||B.addEventListener("click",()=>Q("app-menu-view")),(A=document.getElementById("btn-logout-info"))==null||A.addEventListener("click",zn),(T=document.getElementById("btn-back-to-menu"))==null||T.addEventListener("click",()=>{Q("app-menu-view")}),(D=document.getElementById("btn-back-to-menu-att"))==null||D.addEventListener("click",()=>Q("app-menu-view")),(G=document.getElementById("btn-logout-att"))==null||G.addEventListener("click",zn),(H=document.getElementById("btn-change-password-menu"))==null||H.addEventListener("click",xs);const zt=(W=document.getElementById("app-menu-view"))==null?void 0:W.querySelector(".space-y-4");zt&&(zt.className="w-full max-w-xs mx-auto space-y-3 mt-4");const At=document.getElementById("btn-app-dispatch");At&&(At.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-blue-600 hover:bg-blue-700 hover:shadow-lg text-white text-left",At.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">🚗</span><span>配車調整</span></div><span class="text-white/60 text-sm font-normal">❯</span>');const mt=document.getElementById("btn-app-attendance");mt&&(mt.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-green-600 hover:bg-green-700 hover:shadow-lg text-white text-left",mt.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">📅</span><span>出欠管理</span></div><span class="text-white/60 text-sm font-normal">❯</span>');const pt=document.getElementById("btn-app-simulator");pt&&(pt.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-amber-600 hover:bg-amber-700 hover:shadow-lg text-white text-left",pt.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">⚾</span><span>ポジション設定</span></div><span class="text-white/60 text-sm font-normal">❯</span>',pt.onclick=()=>{Q("position-simulator-view"),Kn()});const rt=document.getElementById("btn-app-info");rt&&(rt.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-teal-600 hover:bg-teal-700 hover:shadow-lg text-white text-left",rt.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">ℹ️</span><span>Info</span></div><span class="text-white/60 text-sm font-normal">❯</span>',rt.onclick=async()=>{await ve(async()=>{await Qn({supabaseClient:S,currentUser:j,currentUserRole:he})},"Info画面を準備中..."),Q("info-view")}),(R=document.getElementById("nav-info"))==null||R.addEventListener("click",async()=>{await ve(async()=>{await Qn({supabaseClient:S,currentUser:j,currentUserRole:he})},"Info画面を準備中..."),Q("info-view")}),(z=document.getElementById("nav-simulator"))==null||z.addEventListener("click",()=>{Q("position-simulator-view"),Kn()}),(J=document.getElementById("nav-simulator-att"))==null||J.addEventListener("click",()=>{Q("position-simulator-view"),Kn()}),(ye=document.getElementById("nav-dispatch-sim"))==null||ye.addEventListener("click",()=>{var V;Q("app-view","dispatch"),wn?(V=document.getElementById("nav-dispatch"))==null||V.click():as()}),(ne=document.getElementById("nav-attendance-sim"))==null||ne.addEventListener("click",async()=>{Q("attendance-view"),await ve(Ra,"出欠管理画面を準備中...")})}catch(de){console.error("DOM Initialization failed:",de),Fe(),Q("auth-view")}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",zs):setTimeout(zs,0);let ns=!1;function ua(e,t=null){if(ns)return;const n="#"+e+(t?"-"+t:"");window.location.hash!==n&&history.pushState({screenId:e,subView:t},"",n)}function Q(e,t=null){["auth-view","signup-view","password-reset-view","password-update-view","app-menu-view","app-view","attendance-view","view-users","dashboard-view","dashboard-settings","position-simulator-view","info-view","survey-respond-view"].forEach(a=>{const s=document.getElementById(a);s&&s.classList.add("hidden")});const n=document.getElementById(e);n&&n.classList.remove("hidden"),ua(e,t),e!=="auth-view"&&e!=="survey-respond-view"&&j&&ae("NAVIGATE",`画面遷移: ${e}${t?" > "+t:""}`)}function Zn(){let e=null,t=null,n=null;try{const a=new URLSearchParams(window.location.search);e=a.get("survey"),t=a.get("response"),n=a.get("d");let s=window.location.hash||"";if(s.startsWith("#/")&&(s="#"+s.substring(2)),s.includes("?")){const[r,o]=s.split("?");s=r;try{const i=new URLSearchParams(o);e||(e=i.get("survey")),t||(t=i.get("response")),n||(n=i.get("d"))}catch{}}if(s.startsWith("#survey-")||s.startsWith("#survey=")){const o=(s.startsWith("#survey-")?s.replace("#survey-",""):s.replace("#survey=","")).split("&");e||(e=o[0]);for(let i=1;i<o.length;i++){const d=o[i],l=d.indexOf("=");if(l!==-1){const c=d.substring(0,l),u=d.substring(l+1);c==="response"&&u&&!t&&(t=u),c==="d"&&u&&!n&&(n=u)}}}}catch(a){console.warn("parseSurveyUrlParams error:",a)}if(e)try{e=decodeURIComponent(e).trim().replace(/^\/+|\/+$/g,"")}catch{}if(t)try{t=decodeURIComponent(t).trim()}catch{}return{surveyId:e,responseId:t,surveyData:n||null}}window.addEventListener("popstate",async e=>{var t,n;ns=!0;try{const{surveyId:a,responseId:s,surveyData:r}=Zn();if(a){await bn(a,s,r);return}e.state&&e.state.screenId?(Q(e.state.screenId,e.state.subView),e.state.screenId==="app-view"&&(e.state.subView==="users"?await Nn():e.state.subView==="master"?(t=document.getElementById("nav-master"))==null||t.click():(n=document.getElementById("nav-dispatch"))==null||n.click())):Q(j?"app-menu-view":"auth-view")}finally{ns=!1}});S&&S.auth.onAuthStateChange(async(e,t)=>{if(e==="PASSWORD_RECOVERY"){Q("password-update-view");return}if(t&&wn&&j&&(e==="TOKEN_REFRESHED"||e==="USER_UPDATED")){console.log(`Bypassing auth state change handling for event: ${e}`);return}const n=async()=>{var o,i,d,l,c,u,m,g;const{surveyId:a,responseId:s,surveyData:r}=Zn();if(a){if(Fe(),t){j={...t.user};try{const{data:b}=await S.from("app_users").select("name, role").eq("email",j.email).single();b&&(j.name=b.name,he=b.role)}catch{}}await bn(a,s,r);return}if(t){F("ユーザー権限確認中...");try{const b=!j||j.id!==t.user.id;j={...t.user},b&&await ae("LOGIN","ログインしました");let y=!0,f=!0,p=!0,v=!0,x=!0,h=!1;try{let{data:J,error:ye}=await S.from("app_users").select("role, name, can_use_dispatch, can_use_dashboard, can_use_attendance, can_use_simulator, can_use_info, can_edit_info").eq("email",j.email).single();if(ye){const{data:ne}=await S.from("app_users").select("role, name, can_use_dispatch, can_use_dashboard, can_use_attendance, can_use_simulator, can_use_info").eq("email",j.email).single();J=ne}J?(he=J.role,j.name=J.name,J.can_use_dispatch===!1&&(y=!1),J.can_use_dashboard===!1&&(f=!1),J.can_use_attendance===!1&&(p=!1),J.can_use_simulator===!1&&(v=!1),J.can_use_info===!1&&(x=!1),h=J.can_edit_info===!0):he="user"}catch{he="user"}j.email==="hishinumak@gmail.com"&&(he="admin"),he==="admin"?(y=!0,f=!0,p=!0,v=!0,x=!0,h=!0):he==="leader"&&h===!1&&(h=!0),j.can_use_info=x,j.can_edit_info=h;let k=document.getElementById("btn-app-dashboard");if(f)if(k)k.classList.remove("hidden");else{const J=((o=document.getElementById("app-menu-view"))==null?void 0:o.querySelector(".space-y-3"))||((i=document.getElementById("app-menu-view"))==null?void 0:i.querySelector(".space-y-4"))||((d=document.getElementById("app-menu-view"))==null?void 0:d.querySelector(".grid"));J&&(k=document.createElement("button"),k.id="btn-app-dashboard",k.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg text-white text-left",k.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">📊</span><span>分析</span></div><span class="text-white/60 text-sm font-normal">❯</span>',k.onclick=async()=>{await ve(ja,"ダッシュボードを準備中..."),Q("dashboard-view")},J.appendChild(k))}else k&&k.classList.add("hidden");const L=document.getElementById("nav-users"),w=document.getElementById("nav-master"),I=document.getElementById("nav-dispatch"),E=document.getElementById("btn-app-dispatch"),$=document.getElementById("btn-goto-master"),_=document.getElementById("clear-db-button");let C=document.getElementById("btn-app-users-admin");if(L==null||L.classList.add("hidden"),he==="admin"?(I==null||I.classList.remove("hidden"),w==null||w.classList.remove("hidden")):he==="leader"?(I==null||I.classList.remove("hidden"),w==null||w.classList.add("hidden")):(I==null||I.classList.add("hidden"),w==null||w.classList.add("hidden")),he==="admin")if($==null||$.classList.remove("hidden"),_==null||_.classList.remove("hidden"),C)C.classList.remove("hidden");else{const J=((l=document.getElementById("app-menu-view"))==null?void 0:l.querySelector(".space-y-3"))||((c=document.getElementById("app-menu-view"))==null?void 0:c.querySelector(".space-y-4"))||((u=document.getElementById("app-menu-view"))==null?void 0:u.querySelector(".grid"));J&&(C=document.createElement("button"),C.id="btn-app-users-admin",C.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-purple-600 hover:bg-purple-700 hover:shadow-lg text-white text-left order-last",C.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">⚙️</span><span>管理者メニュー</span></div><span class="text-white/60 text-sm font-normal">❯</span>',C.onclick=()=>Cr(),J.appendChild(C))}else $==null||$.classList.add("hidden"),_==null||_.classList.add("hidden"),C&&C.classList.add("hidden");y?E==null||E.classList.remove("hidden"):E==null||E.classList.add("hidden");const O=document.getElementById("btn-app-attendance");p?O==null||O.classList.remove("hidden"):O==null||O.classList.add("hidden");const N=document.getElementById("btn-app-simulator"),P=document.getElementById("nav-simulator"),U=document.getElementById("nav-simulator-att"),M=document.getElementById("nav-dispatch-sim"),B=document.getElementById("nav-attendance-sim");v?(N==null||N.classList.remove("hidden"),P==null||P.classList.remove("hidden"),U==null||U.classList.remove("hidden")):(N==null||N.classList.add("hidden"),P==null||P.classList.add("hidden"),U==null||U.classList.add("hidden")),y?M==null||M.classList.remove("hidden"):M==null||M.classList.add("hidden"),p?B==null||B.classList.remove("hidden"):B==null||B.classList.add("hidden");const A=document.getElementById("btn-app-info"),T=document.getElementById("nav-info");x?(A==null||A.classList.remove("hidden"),T==null||T.classList.remove("hidden")):(A==null||A.classList.add("hidden"),T==null||T.classList.add("hidden"));const D=document.getElementById("user-email-display");D&&(D.textContent=j.name||sn(j.email));const G=document.getElementById("sim-user-email-display");G&&(G.textContent=j.name||sn(j.email));const{surveyId:H,responseId:W,surveyData:R}=Zn();if(H){await bn(H,W,R);return}const z=window.location.hash;if(z&&z!=="#app-menu-view"&&z!=="#auth-view"){const J=["app-view","attendance-view","dashboard-view","position-simulator-view","info-view"];let ye=!1;for(const ne of J)if(z.startsWith("#"+ne)){const de=z.length>ne.length+1?z.substring(ne.length+2):null;ne==="app-view"?(Q("app-view",de),wn?de==="users"?Nn():de==="master"?(m=document.getElementById("nav-master"))==null||m.click():(g=document.getElementById("nav-dispatch"))==null||g.click():as().then(()=>{var Le,Ke;de==="users"?Nn():de==="master"?(Le=document.getElementById("nav-master"))==null||Le.click():(Ke=document.getElementById("nav-dispatch"))==null||Ke.click()}).catch(Le=>{console.error("App init error:",Le),Fe()})):ne==="attendance-view"?(Q("attendance-view"),Ra().catch(Le=>{console.error("Attendance init error:",Le),Fe()})):ne==="dashboard-view"?(Q("dashboard-view"),ja().catch(Le=>{console.error("Dashboard init error:",Le),Fe()})):ne==="position-simulator-view"?(Q("position-simulator-view"),Kn()):ne==="info-view"&&(Q("info-view"),Qn({supabaseClient:S,currentUser:j,currentUserRole:he}).catch(Le=>{console.error("Info init error:",Le),Fe()})),ye=!0;break}ye||Q("app-menu-view")}else Q("app-menu-view")}catch(b){console.error("Auth state handling error:",b),Fe()}finally{q()}}else{j=null,Fe();const{surveyId:b,responseId:y,surveyData:f}=Zn();if(b){await bn(b,y,f);return}const p=document.getElementById("password-update-view");(!p||p.classList.contains("hidden"))&&Q("auth-view")}};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{n().catch(console.error)}):setTimeout(()=>{n().catch(console.error)},0)});async function Sd(e){if(e&&e.preventDefault&&e.preventDefault(),!!confirm(`ブラウザに保存されているログイン情報（キャッシュ）をクリアして、ページを再読み込みしますか？
（動作がおかしい・ログインできない場合にお試しください）`)){F("キャッシュクリア中...");try{await S.auth.signOut().catch(()=>{});const t=[];for(let n=0;n<localStorage.length;n++){const a=localStorage.key(n);a&&a.startsWith("sb-")&&t.push(a)}t.forEach(n=>localStorage.removeItem(n)),alert("キャッシュをクリアしました。ページを再読み込みします。"),location.reload()}catch{Fe()}}}let Ca=!1;async function Js(e){var r,o;if(e&&e.preventDefault&&e.preventDefault(),Ca)return;const t=((r=document.getElementById("email-address"))==null?void 0:r.value)||"",n=va(t),a=((o=document.getElementById("password"))==null?void 0:o.value)||"",s=document.getElementById("auth-message");if(s&&s.classList.add("hidden"),!(!n||!a)){Ca=!0,F("ログイン認証中...");try{const{error:i}=await S.auth.signInWithPassword({email:n,password:a});i&&(s?(s.textContent="ログイン失敗: "+i.message,s.classList.remove("hidden"),s.classList.add("text-red-500")):alert("ログイン失敗: "+i.message))}catch(i){console.error("Login Error:",i);const d=i.message+`
`+JSON.stringify(i,Object.getOwnPropertyNames(i));s?(s.textContent="通信エラー詳細: "+d,s.classList.remove("hidden"),s.classList.add("text-red-500")):alert(`通信エラー詳細:
`+d)}finally{q(),Ca=!1}}}async function Cr(){Q("app-view","users"),await Nn()}function xs(){const e=document.getElementById("change-password-modal");e&&(document.body.appendChild(e),e.classList.remove("hidden"),e.style.zIndex="9999")}let Da=!1;async function Bd(e){var i,d,l,c;if(e&&e.preventDefault&&e.preventDefault(),Da)return;const t=((i=document.getElementById("signup-parent-name"))==null?void 0:i.value)||"",n=((d=document.getElementById("signup-player-name"))==null?void 0:d.value)||"",a=((l=document.getElementById("signup-email"))==null?void 0:l.value)||"";let s=((c=document.getElementById("signup-password"))==null?void 0:c.value)||"";const r=document.getElementById("signup-message");r&&r.classList.add("hidden");const o=document.getElementById("signup-password")!==null;if(o||(s=Math.random().toString(36).slice(-10)+"A1!"),!t||!n||!a||o&&s.length<6){r&&(r.textContent=o?"すべての項目を正しく入力してください(パスワードは6文字以上)":"すべての項目を正しく入力してください"),r&&r.classList.remove("hidden","text-green-600"),r&&r.classList.add("text-red-500");return}Da=!0,F("利用申請を送信中...");try{const{data:u,error:m}=await S.auth.signUp({email:a,password:s});if(m){r&&(r.textContent="登録エラー: "+m.message),r&&r.classList.remove("hidden","text-green-600"),r&&r.classList.add("text-red-500");return}const{error:g}=await S.from("signup_requests").insert([{parent_name:t,player_name:n,email:a,status:"pending"}]);await S.auth.signOut(),g?(r&&(r.textContent="申請失敗: "+g.message),r&&r.classList.remove("hidden","text-green-600"),r&&r.classList.add("text-red-500")):(r&&(r.textContent=o?"アカウントが作成され、利用申請が送信されました。管理者の承認をお待ちください。":"利用申請が送信されました。管理者の承認後、「パスワードを忘れた場合」からパスワードを再設定してログインしてください。"),r&&r.classList.remove("text-red-500"),r&&r.classList.add("text-green-600"),r&&r.classList.remove("hidden"),document.getElementById("signup-parent-name")&&(document.getElementById("signup-parent-name").value=""),document.getElementById("signup-player-name")&&(document.getElementById("signup-player-name").value=""),document.getElementById("signup-email")&&(document.getElementById("signup-email").value=""),document.getElementById("signup-password")&&(document.getElementById("signup-password").value=""))}catch(u){Fe(),console.error("Signup Error:",u),r&&(r.textContent="登録処理中にエラーが発生しました。",r.classList.remove("hidden","text-green-600"),r.classList.add("text-red-500"))}finally{q(),Da=!1}}async function Td(e){var a;e&&e.preventDefault&&e.preventDefault();const t=((a=document.getElementById("reset-email"))==null?void 0:a.value)||"",n=document.getElementById("reset-message");if(n&&n.classList.add("hidden"),!!t){F("パスワード再設定メール送信中...");try{const{error:s}=await S.auth.resetPasswordForEmail(t,{redirectTo:window.location.origin});s?n?(n.textContent="送信失敗: "+s.message,n.classList.remove("hidden","text-green-600"),n.classList.add("text-red-500")):alert("送信失敗: "+s.message):n?(n.textContent="パスワード再設定メールを送信しました。",n.classList.remove("text-red-500"),n.classList.add("text-green-600"),n.classList.remove("hidden")):alert("パスワード再設定メールを送信しました。")}catch(s){console.error("Password reset error:",s)}finally{q()}}}async function Ad(e){var a;e&&e.preventDefault&&e.preventDefault();const t=((a=document.getElementById("new-password"))==null?void 0:a.value)||"",n=document.getElementById("update-password-message");if(n&&n.classList.add("hidden"),!t||t.length<6){n?(n.textContent="6文字以上のパスワードを入力してください",n.classList.remove("hidden","text-green-600"),n.classList.add("text-red-500")):alert("6文字以上のパスワードを入力してください");return}F("パスワード更新中...");try{const{error:s}=await S.auth.updateUser({password:t});s?n?(n.textContent="更新失敗: "+s.message,n.classList.remove("hidden","text-green-600"),n.classList.add("text-red-500")):alert("更新失敗: "+s.message):(alert("パスワードが更新されました。再度ログインしてください。"),Q("auth-view"))}catch(s){console.error("Password update error:",s)}finally{q()}}async function Cd(e){var n;e&&e.preventDefault&&e.preventDefault();const t=((n=document.getElementById("change-new-password"))==null?void 0:n.value)||"";if(!t||t.length<6)return alert("6文字以上のパスワードを入力してください");F("パスワード変更中...");try{const{error:a}=await S.auth.updateUser({password:t});if(a)alert("更新失敗: "+a.message);else{alert("パスワードが変更されました。");const s=document.getElementById("change-password-modal");s&&s.classList.add("hidden");const r=document.getElementById("change-new-password");r&&(r.value="")}}catch(a){console.error("Password change error:",a)}finally{q()}}async function zn(e){e&&e.preventDefault&&e.preventDefault(),j&&await ae("LOGOUT","ログアウトしました"),F("ログアウト処理中...");try{await S.auth.signOut().catch(()=>{})}finally{q(),wn=!1,history.pushState(null,"",window.location.pathname)}}function Xn(e){const t=document.getElementById("nav-dispatch"),n=document.getElementById("nav-master"),a=document.getElementById("nav-users");e==="users"?(t==null||t.classList.add("hidden"),n==null||n.classList.add("hidden"),a==null||a.classList.add("hidden")):(a==null||a.classList.add("hidden"),he==="admin"?(t==null||t.classList.remove("hidden"),n==null||n.classList.remove("hidden")):he==="leader"?(t==null||t.classList.remove("hidden"),n==null||n.classList.add("hidden")):(t==null||t.classList.add("hidden"),n==null||n.classList.add("hidden")))}let ie=[],le=[],Ve=[],An=new Set;async function as(){var e,t,n;wn=!0,Xn("dispatch"),Ae==null||Ae.addEventListener("click",async()=>{var a,s;cn==null||cn.classList.remove("hidden"),un==null||un.classList.add("hidden"),(a=document.getElementById("view-users"))==null||a.classList.add("hidden"),Xn("dispatch"),Ae==null||Ae.classList.add("text-blue-300"),Ae==null||Ae.classList.remove("text-gray-400"),Ce==null||Ce.classList.remove("text-blue-300"),Ce==null||Ce.classList.add("text-gray-400"),(s=document.getElementById("nav-users"))==null||s.classList.remove("text-blue-300"),ua("app-view","dispatch"),await Ks()}),Ce==null||Ce.addEventListener("click",async()=>{var a,s;un==null||un.classList.remove("hidden"),cn==null||cn.classList.add("hidden"),(a=document.getElementById("view-users"))==null||a.classList.add("hidden"),Xn("master"),Ce==null||Ce.classList.add("text-blue-300"),Ce==null||Ce.classList.remove("text-gray-400"),Ae==null||Ae.classList.remove("text-blue-300"),Ae==null||Ae.classList.add("text-gray-400"),(s=document.getElementById("nav-users"))==null||s.classList.remove("text-blue-300"),ua("app-view","master"),await Od(),Pn()}),(e=document.getElementById("btn-goto-master"))==null||e.addEventListener("click",()=>{Ce==null||Ce.click()}),(t=document.getElementById("btn-back-to-dispatch"))==null||t.addEventListener("click",()=>{Ae==null||Ae.click()});try{await Y.initMasterData(),ie.length===0&&le.length===0&&(await Y.bulkAddFamilies(Pd),await Y.bulkAddCars(Md),await Y.syncMaster(),await Y.initMasterData()),await Ks(),qd(),ol(),(n=document.getElementById("btn-load-logs"))==null||n.addEventListener("click",Pn)}catch(a){console.error(a),ze("データの読み込みに失敗しました。","error")}}async function Nn(){he==="admin"&&(document.getElementById("view-users").classList.remove("hidden"),document.getElementById("view-master").classList.add("hidden"),document.getElementById("view-dispatch").classList.add("hidden"),Xn("users"),document.getElementById("nav-users").classList.add("text-blue-300"),document.getElementById("nav-users").classList.remove("text-gray-400"),document.getElementById("nav-dispatch").classList.remove("text-blue-300"),document.getElementById("nav-master").classList.remove("text-blue-300"),ua("app-view","users"),await oe())}async function oe(){F("メンバー・マスタ情報読み込み中...");try{const{data:e}=await S.from("app_users").select("*").order("created_at",{ascending:!1});let t=[],n=[],a=[],s=[],r=[];try{const{data:p}=await S.from("groups").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});p&&(t=p);const{data:v}=await S.from("user_groups").select("*");v&&(n=v);const{data:x}=await S.from("event_categories").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});x&&(a=x);const{data:h}=await S.from("user_attributes").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});h&&(s=h);try{const{data:L}=await S.from("event_locations").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});L&&(r=L)}catch(L){console.warn("event_locations table not created yet:",L)}const{data:k}=await S.from("master_data").select("*").eq("key","ATTENDANCE_DELEGATIONS").single();k&&k.data?window.adminDelegations=k.data:window.adminDelegations={}}catch(p){console.error("Groups DB Error:",p)}const o=localStorage.getItem("admin_users_sort")||"created_desc",i=document.getElementById("admin-users-sort");if(i&&(i.value=o),e&&e.length>0){const p=new Map(t.map(h=>[h.id,h.name])),v=new Map(s.map(h=>[h.id,h.name])),x=new Map(n.map(h=>[h.user_email,h.group_id]));if(o==="manual"){let h=[];try{const k=localStorage.getItem("admin_users_manual_order");k&&(h=JSON.parse(k))}catch(k){console.error("Failed to parse manual user order:",k)}e.sort((k,L)=>{let w=h.indexOf(k.email),I=h.indexOf(L.email);return w===-1&&(w=999999),I===-1&&(I=999999),w!==I?w-I:new Date(L.created_at||0)-new Date(k.created_at||0)})}else if(o==="created_desc")e.sort((h,k)=>new Date(k.created_at||0)-new Date(h.created_at||0));else if(o==="created_asc")e.sort((h,k)=>new Date(h.created_at||0)-new Date(k.created_at||0));else if(o==="name_asc")e.sort((h,k)=>(h.name||"").localeCompare(k.name||"","ja"));else if(o==="name_desc")e.sort((h,k)=>(k.name||"").localeCompare(h.name||"","ja"));else if(o==="email_asc")e.sort((h,k)=>(h.email||"").localeCompare(k.email||"","en"));else if(o==="email_desc")e.sort((h,k)=>(k.email||"").localeCompare(h.email||"","en"));else if(o==="role_desc"){const h={admin:3,leader:2,user:1};e.sort((k,L)=>{const w=h[k.role]||0,I=h[L.role]||0;return w!==I?I-w:new Date(L.created_at||0)-new Date(k.created_at||0)})}else o==="group_asc"?e.sort((h,k)=>{const L=p.get(x.get(h.email))||"",w=p.get(x.get(k.email))||"";return!L&&w?1:L&&!w?-1:L.localeCompare(w,"ja")}):o==="attribute_asc"&&e.sort((h,k)=>{const L=v.get(h.attribute_id)||"",w=v.get(k.attribute_id)||"";return!L&&w?1:L&&!w?-1:L.localeCompare(w,"ja")})}const d=document.getElementById("allowed-users-list");let l=`
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
        `,u=`
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
        `,m=`
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
        `;const g=(e||[]).map((p,v)=>{var $;const x=p.email.endsWith("@local.dummy"),h=(($=n.find(_=>_.user_email===p.email))==null?void 0:$.group_id)||"",k=t.map(_=>`<option value="${_.id}" ${h===_.id?"selected":""}>${_.name}</option>`).join(""),L=`
                <select id="edit-group-${v}" class="border p-1 rounded text-sm w-36 font-semibold text-gray-700 bg-white">
                    <option value="">選択なし</option>
                    ${k}
                </select>
            `,w=(e||[]).filter(_=>_.email!==p.email).map(_=>`
                <label class="inline-flex items-center text-xs mr-3 mb-1 w-32 truncate" title="${_.email}">
                    <input type="checkbox" name="edit-delegation-${v}" value="${_.email}" ${window.adminDelegations[p.email]&&window.adminDelegations[p.email].includes(_.email)?"checked":""} class="mr-1 rounded text-blue-600">
                    <span class="truncate">${_.name||_.email}</span>
                </label>
            `).join(""),E=o==="manual"?`
                <div class="user-drag-handle cursor-grab select-none text-gray-400 hover:text-gray-600 px-2 flex items-center justify-center text-xl font-bold border-r border-gray-100 mr-2" title="ドラッグして並べ替え">
                    ⋮⋮
                </div>
            `:"";return`
            <div class="user-admin-card flex items-stretch p-3 bg-white border rounded shadow-sm mb-2 hover:bg-gray-50 transition" data-email="${p.email}" data-index="${v}" data-old-role="${p.role}">
                ${E}
                <div class="flex-grow flex flex-col">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-gray-100 pb-2 mb-2">
                        <div class="flex-grow flex flex-col md:flex-row md:items-center gap-2">
                        <input type="text" id="edit-name-${v}" value="${p.name||""}" placeholder="氏名" class="border p-1 rounded text-sm w-32 font-bold">
                        <input type="text" id="edit-email-${v}" value="${sn(p.email)}" class="border p-1 rounded text-sm w-48 font-bold" ${p.email===j.email||x?"disabled":""}>
                        <select id="edit-attribute-${v}" class="border p-1 rounded text-sm w-28">
                            <option value="">属性なし</option>
                            ${s.map(_=>`<option value="${_.id}" ${p.attribute_id===_.id?"selected":""}>${_.name}</option>`).join("")}
                        </select>
                        <select id="edit-role-${v}" class="border p-1 rounded text-sm" ${p.email===j.email?"disabled":""}>
                            <option value="user" ${p.role==="user"?"selected":""}>一般ユーザー</option>
                            <option value="leader" ${p.role==="leader"?"selected":""}>リーダー</option>
                            <option value="admin" ${p.role==="admin"?"selected":""}>管理者</option>
                        </select>
                         <div class="flex items-center space-x-3 ml-2 border-l pl-2 flex-wrap gap-y-1">
                            <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-dispatch-${v}" class="rounded text-blue-600" ${p.can_use_dispatch!==!1?"checked":""}><span>配車可</span></label>
                            <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-dashboard-${v}" class="rounded text-blue-600" ${p.can_use_dashboard!==!1?"checked":""}><span>成績可</span></label>
                            <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-attendance-${v}" class="rounded text-blue-600" ${p.can_use_attendance!==!1?"checked":""}><span>出欠可</span></label>
                            <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-simulator-${v}" class="rounded text-blue-600" ${p.can_use_simulator!==!1?"checked":""}><span>シミュレータ可</span></label>
                            <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-info-${v}" class="rounded text-teal-600" ${p.can_use_info!==!1?"checked":""}><span>Info閲覧可</span></label>
                            <label class="flex items-center space-x-1 text-xs font-bold text-teal-800"><input type="checkbox" id="edit-manage-info-${v}" class="rounded text-teal-600 edit-manage-info-chk" data-index="${v}" ${p.can_edit_info===!0||p.role==="admin"||p.role==="leader"&&p.can_edit_info!==!1?"checked":""}><span>Info編集可</span></label>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2 shrink-0">
                        ${x?"":`<button onclick="adminChangeUserPassword('${p.email}')" class="text-xs bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded shadow">パスワード変更</button>`}
                        ${p.email!==j.email?`<button onclick="deleteAdminUser('${p.email}')" class="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded shadow">削除</button>`:""}
                    </div>
                </div>
                    <div class="flex flex-col md:flex-row md:items-start justify-between gap-2">
                        <div class="flex-grow">
                            <div class="text-xs font-bold text-gray-500 mb-1">所属グループ:</div>
                            <div id="group-container-${v}">${L}</div>
                        </div>
                        <div class="flex-grow mt-2 md:mt-0 border-t md:border-t-0 md:border-l border-gray-200 pt-2 md:pt-0 md:pl-4">
                            <div class="text-xs font-bold text-gray-500 mb-1">代行権限 (他メンバーの出欠を代理で入力できる権限):</div>
                            <details class="text-xs border p-2 bg-gray-50 rounded shadow-inner">
                                <summary class="cursor-pointer text-gray-700 font-bold">代行入力できるメンバーを選択 (複数可)</summary>
                                <div class="flex flex-wrap mt-2 max-h-32 overflow-y-auto border-t border-gray-200 pt-2">${w||'<span class="text-gray-400">他のメンバーがいません</span>'}</div>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
            `}).join("");d.innerHTML=g,Nd(),d.querySelectorAll(".edit-manage-info-chk").forEach(p=>{p.addEventListener("change",v=>{if(v.target.checked){const x=v.target.getAttribute("data-index"),h=document.getElementById(`edit-use-info-${x}`);h&&(h.checked=!0)}})});const b=document.getElementById("admin-master-list");b&&(b.innerHTML=l+c+u+m,Jn("admin-attribute-list","user_attributes",oe),Jn("admin-category-list","event_categories",oe),Jn("admin-group-list","groups",oe),Jn("admin-location-list","event_locations",oe));const{data:y}=await S.from("signup_requests").select("*").eq("status","pending").order("created_at",{ascending:!1}),f=document.getElementById("signup-requests-list");!y||y.length===0?f.innerHTML='<p class="text-gray-500 text-sm">現在、承認待ちの申請はありません。</p>':f.innerHTML=y.map(p=>`
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
            `).join("")}finally{q()}}async function Dd(){const e=document.querySelectorAll(".user-admin-card");if(e.length!==0&&confirm("全メンバーの設定を一括保存しますか？")){F("全メンバー設定を保存中...");try{const t=[],n=[],a=[];e.forEach(d=>{const l=d.getAttribute("data-email"),c=d.getAttribute("data-index"),u=d.getAttribute("data-old-role"),m=document.getElementById(`edit-email-${c}`),g=document.getElementById(`edit-name-${c}`),b=document.getElementById(`edit-attribute-${c}`),y=document.getElementById(`edit-role-${c}`),f=document.getElementById(`edit-use-dispatch-${c}`),p=document.getElementById(`edit-use-dashboard-${c}`),v=document.getElementById(`edit-use-attendance-${c}`),x=document.getElementById(`edit-use-simulator-${c}`),h=document.getElementById(`edit-use-info-${c}`),k=document.getElementById(`edit-manage-info-${c}`),L=m.disabled?l:va(m.value.trim()),w=g.value.trim(),I=b&&b.value||null,E=y.disabled?u:y.value,$=f?f.checked:!0,_=p?p.checked:!0,C=v?v.checked:!0,O=x?x.checked:!0,N=h?h.checked:!0,P=k?k.checked:E==="admin"||E==="leader"&&!0;if(!L)throw new Error("メールアドレスが空のレコードがあります。");a.push(l);const U={email:L,name:w,attribute_id:I,role:E,can_use_dispatch:$,can_use_dashboard:_,can_use_attendance:C,can_use_simulator:O,can_use_info:N,can_edit_info:P};t.push({oldEmail:l,updatePayload:U});const M=document.getElementById(`edit-group-${c}`),B=M?M.value:"";B&&n.push({user_email:L,group_id:B});const A=document.querySelectorAll(`input[name="edit-delegation-${c}"]:checked`),T=Array.from(A).map(D=>D.value);l!==L&&window.adminDelegations[l]&&delete window.adminDelegations[l],window.adminDelegations[L]=T});const s=t.map(async d=>{let l=await S.from("app_users").update(d.updatePayload).eq("email",d.oldEmail);if(l.error&&l.error.message&&l.error.message.includes("can_edit_info")){const c={...d.updatePayload};delete c.can_edit_info,l=await S.from("app_users").update(c).eq("email",d.oldEmail)}return l}),r=await Promise.all(s);for(const d of r)if(d.error)throw d.error;const{error:o}=await S.from("user_groups").delete().in("user_email",a);if(o)throw o;if(n.length>0){const{error:d}=await S.from("user_groups").insert(n);if(d)throw d}const{error:i}=await S.from("master_data").upsert({key:"ATTENDANCE_DELEGATIONS",data:window.adminDelegations});if(i)throw i;await ae("UPDATE_USERS_ALL","全メンバーの設定を一括更新しました"),alert("全メンバーの設定を一括保存しました"),await oe()}catch(t){console.error(t),alert("保存中にエラーが発生しました: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{q()}}}window.forceResetPassword=async function(e){if(confirm(`${e} 宛にパスワード再設定メールを送信し、強制的にパスワードをリセットさせますか？`)){F("パスワード再設定メール送信中...");try{const{error:t}=await S.auth.resetPasswordForEmail(e,{redirectTo:window.location.origin});alert(t?"送信失敗: "+t.message:"パスワード再設定メールを送信しました。")}catch(t){console.error(t)}finally{q()}}};window.adminChangeUserPassword=async function(e){const t=sn(e),n=prompt(`「${t}」の新しいパスワードを入力してください（6文字以上）：`);if(n===null)return;const a=n.trim();if(a.length<6)return alert("パスワードは6文字以上で設定してください。");F("パスワード変更中...");try{const{error:s}=await S.rpc("admin_update_user_password",{user_email:e,new_password:a});if(s)throw new Error(s.message);await ae("ADMIN_CHANGE_PASSWORD",`ユーザー「${e}」のパスワードを変更しました`),alert(`「${t}」のパスワードを正常に変更しました。`)}catch(s){console.error(s),alert(`パスワード変更エラー:
`+s.message+`

※この機能を使用するには、あらかじめSupabaseのSQLエディタで専用のデータベース関数（admin_update_user_password）を設定する必要があります。詳細はマニュアルまたはエージェントのメッセージを参照してください。`)}finally{q()}};window.adminAddUser=async function(){var r,o,i,d;const e=((r=document.getElementById("admin-add-email"))==null?void 0:r.value.trim())||"",t=va(e),n=((o=document.getElementById("admin-add-name"))==null?void 0:o.value.trim())||"",a=((i=document.getElementById("admin-add-password"))==null?void 0:i.value.trim())||"",s=((d=document.getElementById("admin-add-role"))==null?void 0:d.value)||"user";if(!e||!n||!a)return alert("ユーザーID（またはメールアドレス）、氏名、仮パスワードは必須入力項目です。");if(a.length<6)return alert("仮パスワードは6文字以上で設定してください。");F("アカウント払い出し中...");try{const l=window.supabase.createClient(vn,ca,{auth:{persistSession:!1,autoRefreshToken:!1}}),{data:c,error:u}=await l.auth.signUp({email:t,password:a});if(u)throw new Error(`Authアカウント作成失敗: ${u.message}`);const{error:m}=await S.from("app_users").insert([{email:t,name:n,role:s}]);if(m)throw new Error(`データベース登録失敗: ${m.message}`);await ae("ADD_USER_COMPLETED",`アカウント「${t}」を仮パスワード付きで払い出しました`),document.getElementById("admin-add-email").value="",document.getElementById("admin-add-name").value="",document.getElementById("admin-add-password").value="",alert(`アカウントの払い出しが完了しました！

【ユーザー通知内容】
ログインID: ${sn(t)}
仮パスワード: ${a}

上記情報をLINE等の別手段でユーザーに通知してください。`),await oe()}catch(l){console.error(l),alert(`アカウント払い出しエラー:
`+l.message)}finally{q()}};window.adminAddDummyUser=async function(){const e=prompt(`追加する代行専用メンバーの「氏名」を入力してください。
（※ログインはできず、他のメンバーからの代行入力専用アカウントとなります）`);if(!e||e.trim()==="")return;const t=`dummy_${Date.now()}@local.dummy`;F("代行専用メンバー追加処理中...");try{await S.from("app_users").insert([{email:t,name:e.trim(),role:"user"}]),await ae("ADD_DUMMY_USER",`代行専用メンバー「${e.trim()}」を追加しました`),await oe()}catch(n){console.error(n),alert("追加エラー: "+(n.message==="Load failed"||n.message==="Failed to fetch"?"通信に失敗しました。":n.message))}finally{q()}};window.deleteAdminUser=async function(e){if(confirm(`${e} のアクセス許可を取り消しますか？`)){F("ユーザー削除処理中...");try{await S.from("app_users").delete().eq("email",e),await ae("DELETE_USER",`ユーザー「${e}」を削除しました`),await oe()}catch(t){console.error(t),alert("削除エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{q()}}};window.saveNewCategoryAdmin=async function(){var n;const e=document.getElementById("admin-new-category-name").value.trim(),t=((n=document.getElementById("admin-new-category-color"))==null?void 0:n.value)||"#bfdbfe";if(!e)return alert("カテゴリ名を入力してください");F("カテゴリ追加中...");try{const{error:a}=await S.from("event_categories").insert([{name:e,color:t}]);if(a)throw a;await oe()}catch(a){alert("追加エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{q()}};window.deleteCategoryAdmin=async function(e){if(confirm(`このカテゴリを削除しますか？
※既存のイベントに設定されているカテゴリ名には影響しませんが、新規作成・編集時に選択できなくなります。`)){F("カテゴリ削除中...");try{const{error:t}=await S.from("event_categories").delete().eq("id",e);if(t)throw t;await oe()}catch(t){alert("削除エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{q()}}};window.renameCategoryAdmin=async function(e,t){const n=prompt("新しいカテゴリ名を入力してください:",t);if(!(!n||n.trim()===""||n===t)){F("カテゴリ名称変更中...");try{const{error:a}=await S.from("event_categories").update({name:n.trim()}).eq("id",e);if(a)throw a;await oe()}catch(a){alert("変更エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{q()}}};window.updateCategoryColorAdmin=async function(e,t){F("カテゴリ色変更中...");try{const{error:n}=await S.from("event_categories").update({color:t}).eq("id",e);if(n)throw n;await oe()}catch(n){alert("変更エラー: "+(n.message==="Load failed"||n.message==="Failed to fetch"?"通信に失敗しました。":n.message))}finally{q()}};window.updateGroupColorAdmin=async function(e,t){F("グループ色変更中...");try{const{error:n}=await S.from("groups").update({color:t}).eq("id",e);if(n)throw n;await oe()}catch(n){alert("色変更エラー: "+(n.message==="Load failed"||n.message==="Failed to fetch"?"通信に失敗しました。":n.message))}finally{q()}};window.saveNewGroupAdmin=async function(){var n;const e=document.getElementById("admin-new-group-name").value.trim(),t=((n=document.getElementById("admin-new-group-color"))==null?void 0:n.value)||"#d1fae5";if(!e)return alert("グループ名を入力してください");F("グループ追加中...");try{const{error:a}=await S.from("groups").insert([{name:e,color:t}]);if(a)throw a;await oe()}catch(a){alert("追加エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{q()}};window.deleteGroupAdmin=async function(e){if(confirm(`このグループを削除しますか？
※関連する出欠データやメンバー設定にも影響が出る可能性があります。`)){F("グループ削除中...");try{const{error:t}=await S.from("groups").delete().eq("id",e);if(t)throw t;await oe()}catch(t){alert("削除エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{q()}}};window.renameGroupAdmin=async function(e,t){const n=prompt("新しいグループ名を入力してください:",t);if(!(!n||n.trim()===""||n===t)){F("グループ名称変更中...");try{const{error:a}=await S.from("groups").update({name:n.trim()}).eq("id",e);if(a)throw a;await oe()}catch(a){alert("変更エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{q()}}};window.saveNewLocationAdmin=async function(){const e=document.getElementById("admin-new-location-name").value.trim(),t=document.getElementById("admin-new-location-url").value.trim();if(!e)return alert("場所名を入力してください");F("場所追加中...");try{const{error:n}=await S.from("event_locations").insert([{name:e,url:t||null}]);if(n)throw n;await oe()}catch(n){alert("追加エラー: "+(n.message==="Load failed"||n.message==="Failed to fetch"?"通信に失敗しました。":n.message))}finally{q()}};window.deleteLocationAdmin=async function(e){if(confirm(`この場所をマスタから削除しますか？
※既存の予定データ内の場所テキスト自体は削除されません。`)){F("場所削除中...");try{const{error:t}=await S.from("event_locations").delete().eq("id",e);if(t)throw t;await oe()}catch(t){alert("削除エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{q()}}};window.renameLocationAdmin=async function(e){F("場所データ読み込み中...");try{const{data:t,error:n}=await S.from("event_locations").select("*").eq("id",e).single();if(n)throw n;const a=document.getElementById("admin-edit-location-modal");a&&a.remove();const s=t.name||"",r=t.url||"",o=`
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
        `;document.body.insertAdjacentHTML("beforeend",o)}catch(t){alert("読み込みエラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{q()}};window.saveLocationEditAdmin=async function(e){const t=document.getElementById("edit-location-name").value.trim(),n=document.getElementById("edit-location-url").value.trim();if(t==="")return alert("場所の名前は必須項目です。");F("場所マスタ更新中...");try{const{error:a}=await S.from("event_locations").update({name:t,url:n||null}).eq("id",e);if(a)throw a;const s=document.getElementById("admin-edit-location-modal");s&&s.remove(),await oe()}catch(a){alert("更新エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{q()}};function Jn(e,t,n){const a=document.getElementById(e);if(!a)return;let s=null;Array.from(a.children).forEach(r=>{r.setAttribute("draggable","true"),r.classList.add("cursor-move","select-none"),r.addEventListener("dragstart",o=>{s=r,o.dataTransfer.effectAllowed="move",r.classList.add("opacity-50")}),r.addEventListener("dragover",o=>{o.preventDefault(),o.dataTransfer.dropEffect="move";const i=o.target.closest('[draggable="true"]');if(i&&i!==s&&i.parentNode===a){const d=i.getBoundingClientRect(),l=(o.clientY-d.top)/(d.bottom-d.top)>.5;a.insertBefore(s,l?i.nextSibling:i)}}),r.addEventListener("dragend",async()=>{r.classList.remove("opacity-50"),s=null;const i=Array.from(a.children).map((d,l)=>{const c=d.dataset.id;return S.from(t).update({sort_order:l}).eq("id",c)});F("順序を保存中...");try{await Promise.all(i),n&&await n()}catch(d){console.error("Sort order save error:",d),alert("順序の保存に失敗しました。")}finally{q()}})})}function Nd(){const e=document.getElementById("allowed-users-list");if(!e)return;if((localStorage.getItem("admin_users_sort")||"created_desc")!=="manual"){Array.from(e.children).forEach(a=>{a.removeAttribute("draggable"),a.classList.remove("cursor-move","select-none");const s=a.querySelector(".user-drag-handle");s&&(s.style.display="none")});return}let n=null;Array.from(e.children).forEach(a=>{const s=a.querySelector(".user-drag-handle");s?(s.style.display="flex",s.addEventListener("mousedown",()=>{a.setAttribute("draggable","true")}),s.addEventListener("mouseup",()=>{a.removeAttribute("draggable")})):a.setAttribute("draggable","true"),a.addEventListener("dragstart",r=>{if(a.getAttribute("draggable")!=="true"){r.preventDefault();return}n=a,r.dataTransfer.effectAllowed="move",a.classList.add("opacity-50")}),a.addEventListener("dragover",r=>{r.preventDefault(),r.dataTransfer.dropEffect="move";const o=r.target.closest(".user-admin-card");if(o&&o!==n&&o.parentNode===e){const i=o.getBoundingClientRect(),d=(r.clientY-i.top)/(i.bottom-i.top)>.5;e.insertBefore(n,d?o.nextSibling:o)}}),a.addEventListener("dragend",()=>{a.classList.remove("opacity-50"),a.removeAttribute("draggable"),n=null;const o=Array.from(e.children).map(i=>i.getAttribute("data-email")).filter(Boolean);localStorage.setItem("admin_users_manual_order",JSON.stringify(o))})})}window.saveNewUserAttributeAdmin=async function(){const e=document.getElementById("admin-new-attribute-name").value.trim();if(!e)return alert("属性名を入力してください");F("属性追加中...");try{const{error:t}=await S.from("user_attributes").insert([{name:e}]);if(t)throw t;await oe()}catch(t){alert("追加エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{q()}};window.deleteUserAttributeAdmin=async function(e){if(confirm(`この属性を削除しますか？
※ユーザーに設定されている属性は解除されます。`)){F("属性削除中...");try{const{error:t}=await S.from("user_attributes").delete().eq("id",e);if(t)throw t;await oe()}catch(t){alert("削除エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{q()}}};window.renameUserAttributeAdmin=async function(e,t){const n=prompt("新しい属性名を入力してください:",t);if(!(!n||n.trim()===""||n===t)){F("属性名称変更中...");try{const{error:a}=await S.from("user_attributes").update({name:n.trim()}).eq("id",e);if(a)throw a;await oe()}catch(a){alert("変更エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{q()}}};window.approveRequest=async function(e,t){F("申請承認中...");try{const{data:n}=await S.from("signup_requests").select("parent_name, player_name").eq("id",e).single(),a=n?`${n.parent_name} (${n.player_name})`:"";await S.from("app_users").insert([{email:t,role:"user",name:a}]),await S.from("signup_requests").update({status:"approved"}).eq("id",e);try{const{error:s}=await S.auth.resetPasswordForEmail(t,{redirectTo:window.location.origin});s&&(console.warn("Auto password reset email failed (rate limit):",s.message),alert(`メンバー承認は完了しました！

※ただし、Supabaseのメール送信制限（レートリミット等）により、パスワード設定案内メールの自動送信に失敗しました（エラー: `+s.message+`）。

お手数ですが、ログイン画面の『パスワードを忘れた場合』からユーザー自身で再設定を行っていただくよう案内するか、時間をおいてメンバーリストの『PWリセット送信』から再送信してください。`))}catch(s){console.error("Auto password reset email exception:",s)}await oe()}catch(n){console.error(n),alert("承認エラー: "+(n.message==="Load failed"||n.message==="Failed to fetch"?"通信に失敗しました。":n.message))}finally{q()}};window.rejectRequest=async function(e){if(confirm("この申請を拒否しますか？")){F("申請拒否中...");try{await S.from("signup_requests").update({status:"rejected"}).eq("id",e),await oe()}catch(t){console.error(t),alert("拒否エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{q()}}};const Y={initMasterData:async()=>ve(async()=>{const{data:e,error:t}=await S.from("master_data").select("*");if(t)throw t;if(ie=[],le=[],e){const n=e.find(s=>s.key==="FAMILIES"),a=e.find(s=>s.key==="CARS");n&&(ie=n.data||[]),a&&(le=a.data||[])}},"マスターデータ初期化中..."),getAllFamilies:async()=>ie,getFamily:async e=>ie.find(t=>t.familyName===e),addFamily:e=>{ie.push(e)},updateFamily:e=>{const t=ie.findIndex(n=>n.familyName===e.familyName);t>-1&&(ie[t]=e)},deleteFamily:e=>{ie=ie.filter(t=>t.familyName!==e)},bulkAddFamilies:e=>{ie=e},getAllCars:async()=>le,getCar:async e=>le.find(t=>t.id===e),addCar:e=>{le.push(e)},updateCar:e=>{const t=le.findIndex(n=>n.id===e.id);t>-1&&(le[t]=e)},deleteCar:e=>{le=le.filter(t=>t.id!==e)},bulkAddCars:e=>{le=e},syncMaster:async()=>ve(async()=>{const{error:e}=await S.from("master_data").upsert([{key:"FAMILIES",data:ie},{key:"CARS",data:le}]);if(e)throw e;await ae("UPDATE_MASTER","初期データ(または強制)のマスター保存を実行しました")},"マスターデータ同期中..."),saveState:async(e,t)=>ve(async()=>{const n=Date.now().toString(),{error:a}=await S.from("states").insert({id:n,name:t,created_at:Date.now(),state_data:e});if(a)throw a;return await ae("SAVE_DISPATCH",`配車データ「${t}」を保存しました`),!0},"配車状態を保存中..."),getAllSavedStates:async()=>ve(async()=>{const{data:e,error:t}=await S.from("states").select("*").order("created_at",{ascending:!1});if(t)throw t;return e.map(n=>({id:n.id,name:n.name,timestamp:n.created_at,state:n.state_data}))},"配車状態一覧を取得中..."),getState:async e=>ve(async()=>{const{data:t,error:n}=await S.from("states").select("*").eq("id",e).single();if(n)throw n;return t?{id:t.id,name:t.name,timestamp:t.created_at,state:t.state_data}:null},"配車状態を取得中..."),deleteState:async e=>ve(async()=>{const{error:t}=await S.from("states").delete().eq("id",e);if(t)throw t;return await ae("DELETE_DISPATCH",`配車データ(ID:${e})を削除しました`),!0},"配車状態を削除中..."),saveParking:async(e,t)=>ve(async()=>{const n="p"+Date.now()+Math.floor(Math.random()*1e3),{error:a}=await S.from("parkings").insert({id:n,name:t,created_at:Date.now(),parking_data:e});if(a)throw a;return await ae("SAVE_PARKING",`駐車場データ「${t}」を保存しました`),!0},"駐車場データを保存中..."),getAllSavedParking:async()=>ve(async()=>{const{data:e,error:t}=await S.from("parkings").select("*").order("created_at",{ascending:!1});if(t)throw t;return e.map(n=>({id:n.id,name:n.name,timestamp:n.created_at,parking:n.parking_data}))},"駐車場データ一覧を取得中..."),getParking:async e=>ve(async()=>{const{data:t,error:n}=await S.from("parkings").select("*").eq("id",e).single();if(n)throw n;return t?{id:t.id,name:t.name,timestamp:t.created_at,parking:t.parking_data}:null},"駐車場データを取得中..."),updateParking:async e=>ve(async()=>{const{error:t}=await S.from("parkings").update({name:e.name,parking_data:e.parking}).eq("id",e.id);if(t)throw t;return!0},"駐車場データを更新中..."),deleteParking:async e=>ve(async()=>{const{error:t}=await S.from("parkings").delete().eq("id",e);if(t)throw t;return await ae("DELETE_PARKING",`駐車場データ(ID:${e})を削除しました`),!0},"駐車場データを削除中..."),addParkingMaster:(e,t)=>{Ve.push({id:"p"+Date.now()+Math.floor(Math.random()*1e3),name:t,timestamp:Date.now(),parking:e,isNew:!0})},updateParkingMaster:e=>{const t=Ve.findIndex(n=>n.id===e.id);t>-1&&(Ve[t]=e,Ve[t].isModified=!0)},deleteParkingMaster:e=>{const t=Ve.find(n=>n.id===e);t&&!t.isNew&&An.add(e),Ve=Ve.filter(n=>n.id!==e)},syncAllMaster:async()=>ve(async()=>{const{error:e}=await S.from("master_data").upsert([{key:"FAMILIES",data:ie},{key:"CARS",data:le}]);if(e)throw e;for(const t of An)await S.from("parkings").delete().eq("id",t);An.clear();for(const t of Ve)if(t.isNew||t.isModified){const{error:n}=await S.from("parkings").upsert({id:t.id,name:t.name,created_at:t.timestamp,parking_data:t.parking});if(n)throw n;t.isNew=!1,t.isModified=!1}await ae("UPDATE_MASTER","マスターデータ(家族・車・駐車場)を一括保存しました")},"マスターデータ一括同期中..."),clearDatabase:async()=>ve(async()=>{ie=[],le=[],await S.from("master_data").delete().neq("key",""),await S.from("states").delete().neq("id",""),await S.from("parkings").delete().neq("id",""),await ae("CLEAR_DB","データベースの全リセットを実行しました")},"データベース初期化中...")},Pd=[{familyName:"山田家",order:1,members:[{id:"p1",name:"太郎",type:"選手",isFlagTarget:!0,data:{grade:"5年",school:"A小",other:"",memo:""}},{id:"p2",name:"山田父",type:"保護者",data:{memo:""}}]},{familyName:"佐藤家",order:2,members:[{id:"p3",name:"次郎",type:"選手",isFlagTarget:!0,data:{grade:"5年",school:"B小",other:"",memo:""}},{id:"p4",name:"佐藤母",type:"保護者",data:{memo:""}}]},{familyName:"スタッフ・個人",order:99,members:[{id:"p99",name:"監督",type:"その他",data:{memo:""}}]}],Md=[{id:"c1",name:"山田カー",familyName:"山田家",baseCapacity:6,order:1},{id:"c2",name:"佐藤カー",familyName:"佐藤家",baseCapacity:5,order:2}];let Vt=[],ma=[],wa=[],Gt=new Set,Wt=new Set,$t=new Map,Rt=new Set,nt=new Set,st=new Map,xe={groundName:"",designated:{name:"",limit:0,memo:""},other:{name:"",memo:""}},De={date:"",name:"",timeline:"",notes:""},Z=[],yt={car:null,seat:null},Na=null,Pa=null;const ss=3,Ae=document.getElementById("nav-dispatch"),Ce=document.getElementById("nav-master"),cn=document.getElementById("view-dispatch"),un=document.getElementById("view-master"),Je=document.getElementById("participant-list"),Qt=document.getElementById("car-list"),Zt=document.getElementById("exclusion-list"),Ma=document.getElementById("results");document.getElementById("text-output");const et=document.getElementById("family-list"),xt=document.getElementById("car-list-master"),Ct=document.getElementById("parking-list-master");function Ys(){const e=document.getElementById("results-section"),t=document.getElementById("main-content");t&&(t.style.display="grid",t.style.gap="1.5rem",window.innerWidth>=768?(t.style.gridTemplateColumns=`repeat(${ss}, minmax(0, 1fr))`,e&&(e.style.gridColumn=`span ${ss}`)):(t.style.gridTemplateColumns="repeat(1, minmax(0, 1fr))",e&&(e.style.gridColumn="auto")))}async function Ks(){Vt=await Y.getAllFamilies(),ma=await Y.getAllCars(),wa=Vt.flatMap(e=>e.members),Dr(),Ea(),_a(),Hn(),await vs(),await ws()}async function Od(){Ve=await Y.getAllSavedParking()||[],An.clear(),Xt(),En(),$a()}async function Pn(){const e=document.getElementById("btn-load-logs");if(e&&!document.getElementById("btn-download-logs-csv")){const s=document.createElement("button");s.id="btn-download-logs-csv",s.className="ml-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-bold shadow",s.textContent="CSVダウンロード",s.onclick=Rd,e.parentNode.insertBefore(s,e.nextSibling)}try{const s=new Date;s.setMonth(s.getMonth()-6),await S.from("action_logs").delete().lt("created_at",s.toISOString())}catch(s){console.error("Log rotation error:",s)}e&&(e.textContent="読込中...");const{data:t,error:n}=await S.from("action_logs").select("*").order("created_at",{ascending:!1}).limit(50);if(e&&(e.textContent="最新を読み込み"),n){console.error("Failed to load logs:",n);return}const a=document.getElementById("log-list");if(a){if(!t||t.length===0){a.innerHTML='<p class="text-gray-500 text-center py-4">ログはありません</p>';return}a.innerHTML=t.map(s=>`
        <div class="border-b border-gray-100 py-2 flex flex-col md:flex-row md:items-center">
            <span class="font-mono text-gray-500 text-xs w-32 shrink-0">${new Date(s.created_at).toLocaleString("ja-JP",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"})}</span>
            <span class="text-blue-600 font-semibold text-xs w-28 shrink-0">${s.action_type}</span>
            <span class="flex-grow text-gray-700 truncate pr-2" title="${s.details}">${s.details}</span>
            <span class="text-gray-400 text-xs text-right w-40 shrink-0 truncate" title="${s.user_email}">${s.user_email}</span>
        </div>
        `).join("")}}async function Rd(){F("ログ取得中...");try{const{data:e,error:t}=await S.from("action_logs").select("*").order("created_at",{ascending:!1}).limit(1e4);if(t)throw t;if(!e||e.length===0)return alert("ログデータがありません");const n=[["日時","アクション","ユーザー","詳細"]];e.forEach(i=>{const d=new Date(i.created_at).toLocaleString("ja-JP"),l=c=>`"${String(c||"").replace(/"/g,'""')}"`;n.push([l(d),l(i.action_type),l(i.user_email),l(i.details)])});const a=new Uint8Array([239,187,191]),s=new Blob([a,n.map(i=>i.join(",")).join(`
`)],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(s),o=document.createElement("a");o.href=r,o.download=`action_logs_${new Date().toISOString().split("T")[0]}.csv`,o.click(),URL.revokeObjectURL(r)}catch(e){console.error(e),alert("CSVの作成に失敗しました: "+e.message)}finally{q()}}function qd(){var e,t,n,a,s,r,o,i,d,l,c,u,m,g,b;Je==null||Je.addEventListener("change",jd),Je==null||Je.addEventListener("input",Hd),Je==null||Je.addEventListener("click",Fd),Qt==null||Qt.addEventListener("change",Ud),Zt==null||Zt.addEventListener("change",Vd),(e=document.getElementById("assign-button"))==null||e.addEventListener("click",Gd),(t=document.getElementById("dispatch-message-close"))==null||t.addEventListener("click",Es),Ma==null||Ma.addEventListener("change",zd),(n=document.getElementById("export-state-button"))==null||n.addEventListener("click",Kd),(a=document.getElementById("import-state-input"))==null||a.addEventListener("change",Qd),(s=document.getElementById("show-text-output-button"))==null||s.addEventListener("click",()=>{var y;(y=document.getElementById("text-output-container"))==null||y.classList.toggle("hidden"),Un()}),(r=document.getElementById("copy-text-output-button"))==null||r.addEventListener("click",Jd),(o=document.getElementById("toggle-details-button"))==null||o.addEventListener("click",Yd),(i=document.getElementById("save-state-db-button"))==null||i.addEventListener("click",Zd),(d=document.getElementById("load-state-db-button"))==null||d.addEventListener("click",Xd),(l=document.getElementById("delete-state-db-button"))==null||l.addEventListener("click",el),(c=document.getElementById("save-parking-db-button"))==null||c.addEventListener("click",tl),(u=document.getElementById("load-parking-db-button"))==null||u.addEventListener("click",nl),(m=document.getElementById("delete-parking-db-button"))==null||m.addEventListener("click",al),(g=document.getElementById("clear-db-button"))==null||g.addEventListener("click",sl),(b=document.getElementById("btn-clear-inputs"))==null||b.addEventListener("click",window.clearCurrentInputs)}function Dr(){st.clear(),Vt.forEach(e=>{e.members.forEach(t=>{const n={grade:"",school:"",other:"",memo:"",...t.data||{}};t.isFlagTarget||(n.grade="",n.school="",n.other=""),st.set(t.id,n)})})}function Ea(){if(Je){if(Je.innerHTML="",Vt.length===0)return Je.innerHTML='<p class="text-gray-500">データなし</p>';Vt.forEach(e=>{const t=document.createElement("details");t.className="bg-gray-50 rounded border",t.open=!0;const n=document.createElement("summary");n.className="p-3 cursor-pointer select-none flex justify-between items-center",n.innerHTML=`<span class="font-semibold">${e.familyName}</span><div class="space-x-1"><button data-family-id="${e.familyName}" data-check-action="check" class="text-xs bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded">全員参加</button><button data-family-id="${e.familyName}" data-check-action="uncheck" class="text-xs bg-gray-400 hover:bg-gray-500 text-white py-1 px-2 rounded">全員不参加</button></div>`;const a=document.createElement("div");a.className="p-3 border-t border-gray-200 space-y-3",e.members.forEach(s=>{const r=Gt.has(s.id),o=st.get(s.id)||{grade:"",school:"",other:"",memo:""};let i=s.isFlagTarget?`<input type="text" data-id="${s.id}" data-type="grade" value="${o.grade}" placeholder="学年" class="w-full text-sm p-1 border rounded" ${r?"":"disabled"}>
                 <input type="text" data-id="${s.id}" data-type="school" value="${o.school}" placeholder="学校" class="w-full text-sm p-1 border rounded" ${r?"":"disabled"}>
                 <input type="text" data-id="${s.id}" data-type="other" value="${o.other}" placeholder="その他" class="w-full text-sm p-1 border rounded" ${r?"":"disabled"}>
                 <input type="text" data-id="${s.id}" data-type="memo" value="${o.memo}" placeholder="備考" class="w-full text-sm p-1 border rounded" ${r?"":"disabled"}>`:`<div class="col-span-3"></div><input type="text" data-id="${s.id}" data-type="memo" value="${o.memo}" placeholder="備考" class="w-full text-sm p-1 border rounded" ${r?"":"disabled"}`;a.innerHTML+=`<div class="ml-4"><div class="flex items-center"><input type="checkbox" id="p-${s.id}" data-id="${s.id}" data-action="select-participant" class="mr-3 rounded border-gray-300 text-blue-600" ${r?"checked":""}><label for="p-${s.id}">${s.name} (${s.type})</label></div><div id="data-inputs-${s.id}" class="ml-8 mt-1.5 grid grid-cols-4 gap-2 ${r?"":"opacity-50"}">${i}</div></div>`}),t.appendChild(n),t.appendChild(a),Je.appendChild(t)})}}function Fd(e){const t=e.target.closest("button[data-check-action]");if(!t)return;e.preventDefault();const n=t.dataset.checkAction==="check",a=Vt.find(s=>s.familyName===t.dataset.familyId);a&&a.members.forEach(s=>{const r=document.getElementById(`p-${s.id}`);r&&r.checked!==n&&(r.checked=n,r.dispatchEvent(new Event("change",{bubbles:!0})))})}function _a(){if(Qt){if(Qt.innerHTML="",ma.length===0)return Qt.innerHTML='<p class="text-gray-500">データなし</p>';ma.forEach(e=>{const t=Vt.find(i=>i.familyName===e.familyName),n=(t?t.members:wa).filter(i=>i.type!=="選手"&&i.type!=="兄弟"),a=Wt.has(e.id);let s="";if(t){const i=n.find(l=>l.type==="保護者"&&(l.name.includes("父")||l.name.includes("監督"))),d=n.find(l=>l.type==="保護者"&&l.name.includes("母"));s=i?i.id:d?d.id:""}const r=$t.get(e.id)||s;s&&!$t.has(e.id)&&$t.set(e.id,s);const o=Rt.has(e.id);Qt.innerHTML+=`<div class="bg-gray-50 rounded border p-3" data-car-id="${e.id}">
            <div class="flex items-center"><input type="checkbox" id="c-${e.id}" data-id="${e.id}" data-action="select-car" class="mr-3 rounded text-blue-600" ${a?"checked":""}><label for="c-${e.id}" class="font-semibold">${e.name} (定員${e.baseCapacity}名)</label></div>
            <div id="car-options-${e.id}" class="ml-8 mt-3 space-y-3 ${a?"":"hidden"}">
                <select id="driver-${e.id}" data-action="select-driver" class="w-full p-2 border rounded text-sm"><option value="">ドライバー選択...</option>${n.map(i=>`<option value="${i.id}" ${r===i.id?"selected":""}>${i.name}</option>`).join("")}</select>
                <label class="flex items-center"><input type="checkbox" data-action="select-luggage" class="mr-2" ${o?"checked":""}>荷物あり(2名制限)</label>
            </div></div>`})}}function Hn(){if(!Zt)return;Zt.innerHTML="";const e=wa.filter(t=>Gt.has(t.id));if(e.length===0)return Zt.innerHTML='<p class="text-gray-500 text-sm">参加者を選択してください</p>';e.forEach(t=>{Zt.innerHTML+=`<div class="flex items-center"><input type="checkbox" id="ex-${t.id}" data-id="${t.id}" data-action="exclude-participant" class="mr-3" ${nt.has(t.id)?"checked":""}><label for="ex-${t.id}">${t.name} (${t.type})</label></div>`})}function jd(e){const t=e.target;if(t.dataset.action==="select-participant"){const n=t.dataset.id,a=document.getElementById(`data-inputs-${n}`);t.checked?(Gt.add(n),a&&(a.classList.remove("opacity-50"),a.querySelectorAll("input").forEach(s=>s.disabled=!1))):(Gt.delete(n),nt.delete(n),a&&(a.classList.add("opacity-50"),a.querySelectorAll("input").forEach(s=>s.disabled=!0))),Hn()}}function Hd(e){const t=e.target;if(t.dataset.type){const n=st.get(t.dataset.id);n[t.dataset.type]=t.value,st.set(t.dataset.id,n)}}function Ud(e){var a;const t=e.target,n=(a=t.closest("[data-car-id]"))==null?void 0:a.dataset.carId;n&&(t.dataset.action==="select-car"?t.checked?(Wt.add(n),document.getElementById(`car-options-${n}`).classList.remove("hidden")):(Wt.delete(n),Rt.delete(n),document.getElementById(`car-options-${n}`).classList.add("hidden")):t.dataset.action==="select-driver"?t.value?$t.set(n,t.value):$t.delete(n):t.dataset.action==="select-luggage"&&(t.checked?Rt.add(n):Rt.delete(n)))}function Vd(e){const t=e.target;t.dataset.action==="exclude-participant"&&(t.checked?nt.add(t.dataset.id):nt.delete(t.dataset.id))}function Gd(){var y,f,p,v,x,h,k,L,w,I;if(Wt.size===0)return ze("車を選択してください","error");De={date:((y=document.getElementById("event-date"))==null?void 0:y.value)||"",name:((f=document.getElementById("event-name"))==null?void 0:f.value)||"",timeline:((p=document.getElementById("event-timeline"))==null?void 0:p.value)||"",notes:((v=document.getElementById("event-notes"))==null?void 0:v.value)||""},xe={groundName:((x=document.getElementById("ground-name"))==null?void 0:x.value)||"",designated:{name:((h=document.getElementById("parking-designated-name"))==null?void 0:h.value)||"指定駐車場",limit:parseInt((k=document.getElementById("parking-designated-limit"))==null?void 0:k.value)||999,memo:((L=document.getElementById("parking-designated-memo"))==null?void 0:L.value)||""},other:{name:((w=document.getElementById("parking-other-name"))==null?void 0:w.value)||"指定以外",memo:((I=document.getElementById("parking-other-memo"))==null?void 0:I.value)||""}};let e=!1;if(Z&&Z.length>0&&Z.some(E=>E.id!=="excluded-car")){if(confirm(`すでに配車結果が存在します。
現在の配車状態を【維持】して、追加・変更分のみを反映しますか？
（「キャンセル」を選ぶと、全てリセットして最初からやり直すか確認します）`))e=!0;else if(!confirm(`現在の状態を【全てリセット】して、最初から割り当てをやり直しますか？
（キャンセルを選ぶと処理を中断します）`))return}let t=[],n=new Map,a=[];const s=wa.filter(E=>Gt.has(E.id)).map(E=>{const $=Vt.find(C=>C.members.some(O=>O.id===E.id)),_=st.get(E.id)||{};return{...E,grade:_.grade,school:_.school,other:_.other,memo:_.memo,familyName:$?$.familyName:null}});if(Wt.forEach(E=>{const $=$t.get(E),_=ma.find(N=>N.id===E);if(!_)return;if(!$)return t.push(`${_.name}のドライバー未選択`);const C=s.find(N=>N.id===$);if(!C)return t.push(`${_.name}のドライバーが参加者にいません`);n.set(E,C);const O=Rt.has(E);a.push({id:E,name:_.name,familyName:_.familyName,baseCapacity:O?2:_.baseCapacity,driverId:$,capacity:O?1:_.baseCapacity-1,hasLuggage:O})}),t.length>0)return ze(t.join("<br>"),"error");const r=new Set(Array.from(n.values()).map(E=>E.id));let o=s.filter(E=>nt.has(E.id)&&!r.has(E.id)),i=[];e?a.forEach(E=>{let $=Z.find(C=>C.id===E.id),_=[];$&&(_=$.members.filter(C=>{if(!C)return!1;let O=s.some(U=>U.id===C.id),N=nt.has(C.id),P=r.has(C.id);return O&&!N&&!P}),_.length>E.capacity&&(_=_.slice(0,E.capacity))),i.push({...E,driver:n.get(E.id),members:_})}):i=a.map(E=>({...E,driver:n.get(E.id),members:[]}));let d=new Set(r);i.forEach(E=>E.members.forEach($=>{$&&d.add($.id)}));let l=s.filter(E=>!d.has(E.id)&&!nt.has(E.id));i.reduce((E,$)=>E+$.capacity,0),i.reduce((E,$)=>E+$.members.length,0);let c=[...l];const u={保護者:1,兄弟:2,選手:3,その他:4};i.forEach(E=>{E.driver&&E.familyName&&c.filter(_=>_.familyName===E.familyName).sort((_,C)=>(u[_.type]||9)-(u[C.type]||9)).forEach(_=>{E.members.length<E.capacity&&(E.members.push(_),c=c.filter(C=>C.id!==_.id))})}),c.sort((E,$)=>E.isFlagTarget===$.isFlagTarget?Math.random()-.5:E.isFlagTarget?-1:1).forEach(E=>{let $=[],_=0;if(i.forEach(C=>{if(C.members.length>=C.capacity)return;let O=C.members.filter(N=>N).reduce((N,P)=>N+(P.isFlagTarget&&E.isFlagTarget?(E.grade===P.grade?1:0)+(E.school===P.school?1:0):0),0);O>_?(_=O,$=[C]):O===_&&$.push(C)}),$.length>0)$[Math.floor(Math.random()*$.length)].members.push(E);else{let C=i.filter(O=>O.members.length<O.capacity);C.length>0&&C[0].members.push(E)}}),i.forEach(E=>{for(E.members=E.members.filter($=>$);E.members.length<E.capacity;)E.members.push(null)}),e?i.sort((E,$)=>{let _=Z.findIndex(O=>O.id===E.id),C=Z.findIndex(O=>O.id===$.id);return _!==-1&&C!==-1?_-C:_!==-1?-1:C!==-1?1:$.members.filter(O=>O&&O.type==="選手").length-E.members.filter(O=>O&&O.type==="選手").length}):i.sort((E,$)=>$.members.filter(_=>_&&_.type==="選手").length-E.members.filter(_=>_&&_.type==="選手").length);let m=0;i.forEach(E=>{if(e){let $=Z.find(_=>_.id===E.id);$?(E.assignedParking=$.assignedParking,E.assignedParking==="designated"&&m++):m<xe.designated.limit?(E.assignedParking="designated",m++):E.assignedParking="other"}else m<xe.designated.limit?(E.assignedParking="designated",m++):E.assignedParking="other"});const g=new Set(r);i.forEach(E=>{E.members.forEach($=>{$&&g.add($.id)})}),s.filter(E=>!g.has(E.id)&&!nt.has(E.id)).forEach(E=>{o.some($=>$.id===E.id)||o.push(E)}),i.push({id:"excluded-car",name:"別便",capacity:999,baseCapacity:999,driver:null,members:o,hasLuggage:!1,assignedParking:"excluded"}),Z=i,Ia(),Un()}function Ia(){const e=document.getElementById("results");if(!e)return;if(e.innerHTML="",yt={car:null,seat:null},Z.length===0){e.innerHTML='<p class="text-gray-500 bg-white p-4 rounded shadow">結果なし</p>',Qs();return}(De.name||De.date)&&(e.innerHTML+=`<h2 class="text-2xl font-bold mb-2">${De.date} ${De.name} ${xe.groundName?`@${xe.groundName}`:""}</h2>`);const t=Z.filter(r=>r.assignedParking==="designated"),n=Z.filter(r=>r.assignedParking==="other"),a=Z.filter(r=>r.id==="excluded-car"),s=(r,o,i)=>`<div class="bg-white rounded shadow p-4"><h3 class="font-bold text-lg mb-2">◆${o.name||"別便"} ${r==="designated"&&o.limit<999?`(${o.limit}台)`:""}</h3><p class="text-sm text-gray-600 mb-4 whitespace-pre-line">${o.memo}</p><div class="grid grid-cols-1 md:grid-cols-3 gap-4">${i.map(Wd).join("")}</div></div>`;e.innerHTML+=s("designated",xe.designated,t),e.innerHTML+=s("other",xe.other,n),a[0].members.length>0&&(e.innerHTML+=s("excluded",{name:"別便",memo:""},a)),Qs()}function Wd(e){var r,o;`${e.id}`;let t="",n="",a="";const s=`swap-car-${e.id}`;if(e.id==="excluded-car"){t=`<div class="p-4 border-b bg-gray-100 flex-shrink-0"><h4 class="font-bold text-lg text-gray-700">合計: ${e.members.length}名</h4></div>`,a=e.members.map((d,l)=>{var g;if(!d)return"";const c=(((g=st.get(d.id))==null?void 0:g.memo)||"").trim(),u=d.isFlagTarget&&(d.grade||d.school||d.other)?[d.grade,d.school,d.other].filter(Boolean).join(" "):"",m=`seat-${e.id}-${d.id}`;return`<li class="p-2 bg-gray-100 rounded shadow-sm flex items-center justify-between">
                        <div class="flex items-center min-w-0">
                            <input type="checkbox" id="${m}" data-swap-type="seat" data-car-id="${e.id}" data-participant-id="${d.id}" data-is-driver="false" data-slot-index="${l}" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                            <label for="${m}" class="flex flex-col min-w-0">
                                <span class="break-words">${d.name} (${d.type})</span>
                                ${c?`<span class="text-xs text-gray-500 break-words">[${c}]</span>`:""}
                            </label>
                        </div>
                        <span class="text-xs text-gray-400 ml-2 flex-shrink-0">${u}</span>
                    </li>`}).join("");const i="seat-excluded-car-empty";a+=`<li class="p-2 bg-gray-50 rounded shadow-sm flex items-center">
                            <input type="checkbox" id="${i}" data-swap-type="seat" data-car-id="${e.id}" data-participant-id="empty" data-is-driver="false" data-slot-index="-1" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                            <label for="${i}" class="text-gray-400 italic">-- 別便へ移動 --</label>
                        </li>`}else{const i=(e.driver?1:0)+e.members.filter(f=>f!==null).length,d=e.baseCapacity-i,l=e.capacity-e.members.filter(f=>f!==null).length,c=e.hasLuggage?" (荷物あり)":"";t=`
            <div class="p-4 border-b flex-shrink-0 flex items-center car-header">
                <input type="checkbox" id="${s}" data-swap-type="car" data-car-id="${e.id}" class="mr-3 rounded border-gray-400 text-green-600 focus:ring-green-500">
                <div>
                    <h4 class="font-bold text-lg"><label for="${s}">${e.name} ${c}</label></h4>
                    <p class="text-sm font-medium ${l<0?"text-red-600":"text-blue-600"}">
                    総定員 ${e.baseCapacity}名 (空き ${d}名)
                    </p>
                </div>
            </div>`;const u=e.driver,m=u?u.id:"empty",g=u?`[D] ${u.name} (${u.type})`:"ドライバー空席",b=u&&(((r=st.get(u.id))==null?void 0:r.memo)||"").trim(),y=`seat-${e.id}-driver`;n=`
        <div id="driver-dropzone-${e.id}" class="p-4 border-b driver-dropzone flex-shrink-0">
            <li class="p-2 ${u?"bg-blue-100":"bg-red-50"} rounded shadow-sm flex items-center">
                 <input type="checkbox" id="${y}" data-swap-type="seat" data-car-id="${e.id}" data-participant-id="${m}" data-is-driver="true" data-slot-index="-1" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                 <label for="${y}" class="flex flex-col min-w-0 ${u?"text-blue-800":"text-red-700"}">
                    <span class="font-semibold break-words">${g}</span>
                    ${b?`<span class="text-xs ${u?"text-blue-600":"text-red-600"} ml-2 break-words">[${b}]</span>`:""}
                 </label>
            </li>
        </div>`;for(let f=0;f<e.capacity;f++){const p=e.members[f];if(p){const v=(((o=st.get(p.id))==null?void 0:o.memo)||"").trim(),x=p.isFlagTarget&&(p.grade||p.school||p.other)?[p.grade,p.school,p.other].filter(Boolean).join(" "):"",h=`seat-${e.id}-${p.id}`;a+=`<li class="p-2 bg-gray-100 rounded shadow-sm flex items-center justify-between">
                                    <div class="flex items-center min-w-0">
                                        <input type="checkbox" id="${h}" data-swap-type="seat" data-car-id="${e.id}" data-participant-id="${p.id}" data-is-driver="false" data-slot-index="${f}" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                        <label for="${h}" class="flex flex-col min-w-0">
                                            <span class="break-words">${p.name} (${p.type})</span>
                                            ${v?`<span class="text-xs text-gray-500 break-words">[${v}]</span>`:""}
                                        </label>
                                    </div>
                                    <span class="text-xs text-gray-400 ml-2 flex-shrink-0">${x}</span>
                                </li>`}else{const v=`seat-${e.id}-empty-${f}`;a+=`<li class="p-2 bg-gray-50 rounded shadow-sm flex items-center">
                                    <input type="checkbox" id="${v}" data-swap-type="seat" data-car-id="${e.id}" data-participant-id="empty" data-is-driver="false" data-slot-index="${f}" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                    <label for="${v}" class="text-gray-400 italic">-- 空席 --</label>
                                </li>`}}}return`<div class="bg-white border rounded-lg shadow-md car-dropzone flex flex-col">${t}${n}<ul id="members-dropzone-${e.id}" class="p-4 space-y-2 min-h-[50px] members-dropzone flex-grow overflow-y-auto">${a}</ul></div>`}function zd(e){const t=e.target;if(t.type!=="checkbox"||!t.dataset.swapType)return;const n=t.dataset.swapType;if(yt[n]&&yt[n].el===t){yt[n]=null,t.closest("div").classList.remove("swap-selected");return}const a={carId:t.dataset.carId,pid:t.dataset.participantId,isD:t.dataset.isDriver==="true",idx:parseInt(t.dataset.slotIndex),el:t};if(t.closest("div").classList.add("swap-selected"),n==="car"&&yt.seat||n==="seat"&&yt.car)return t.checked=!1,ze("車と席の混在不可","error");if(!yt[n]){yt[n]=a;return}const s=yt[n],r=a;if(n==="car"){const o=Z.find(d=>d.id===s.carId),i=Z.find(d=>d.id===r.carId);if(o&&i)if(o.assignedParking===i.assignedParking){const d=Z.indexOf(o),l=Z.indexOf(i);d>-1&&l>-1&&([Z[d],Z[l]]=[Z[l],Z[d]])}else{const d=o.assignedParking;o.assignedParking=i.assignedParking,i.assignedParking=d}}else{const o=Z.find(c=>c.id===s.carId),i=Z.find(c=>c.id===r.carId),d=s.pid==="empty"?null:s.isD?o.driver:o.members[s.idx],l=r.pid==="empty"?null:r.isD?i.driver:i.members[r.idx];s.isD?o.driver=l:o.id!=="excluded-car"?o.members[s.idx]=l:(o.members=o.members.filter(c=>c&&c.id!==(d==null?void 0:d.id)),l&&o.members.push(l)),r.isD?i.driver=d:i.id!=="excluded-car"?i.members[r.idx]=d:(i.members=i.members.filter(c=>c&&c.id!==(l==null?void 0:l.id)),d&&i.members.push(d)),[o,i].forEach(c=>{if(c.id!=="excluded-car")for(c.members=c.members.filter(u=>u);c.members.length<c.capacity;)c.members.push(null);else c.members=c.members.filter(u=>u)})}Ia(),Un()}function Un(){const e=document.getElementById("text-output");if(!e)return;if(Z.length===0){e.value="";return}const t=xe.groundName?`@${xe.groundName}`:"";let n=[`${De.date} ${De.name}${t}
`];De.timeline&&n.push(De.timeline+`
`);const a=o=>`${o.name.replace(/の車|家の車/g,"カー")} (${o.driver?o.driver.name:"未定"}, ${o.members.filter(i=>i).map(i=>(i.type==="選手"?"★":"")+i.name).join(", ")}${o.hasLuggage?", 荷物":""})`;n.push(`◆${xe.designated.name}
${xe.designated.memo}`),Z.filter(o=>o.assignedParking==="designated").forEach(o=>n.push("・"+a(o)));const s=Z.filter(o=>o.assignedParking==="other");s.length>0&&(n.push(`
◆${xe.other.name}
${xe.other.memo}`),s.forEach(o=>n.push("・"+a(o))));const r=Z.find(o=>o.id==="excluded-car");r&&r.members.length>0&&(n.push(`
◆別便`),r.members.filter(o=>o).forEach(o=>n.push("・"+(o.type==="選手"?"★":"")+o.name))),De.notes&&n.push(`
◆その他
`+De.notes),e.value=n.join(`
`)}function Jd(){const e=document.getElementById("text-output");e&&(navigator.clipboard.writeText(e.value),ze("コピーしました","success"))}function Yd(){const e=document.getElementById("toggle-details-button"),t=e.textContent==="すべて開く";Je.querySelectorAll("details").forEach(n=>n.open=t),e.textContent=t?"すべて閉じる":"すべて開く"}function Nr(){var e,t,n,a,s,r,o,i,d,l;return De={date:((e=document.getElementById("event-date"))==null?void 0:e.value)||"",name:((t=document.getElementById("event-name"))==null?void 0:t.value)||"",timeline:((n=document.getElementById("event-timeline"))==null?void 0:n.value)||"",notes:((a=document.getElementById("event-notes"))==null?void 0:a.value)||""},xe={groundName:((s=document.getElementById("ground-name"))==null?void 0:s.value)||"",designated:{name:((r=document.getElementById("parking-designated-name"))==null?void 0:r.value)||"指定駐車場",limit:parseInt((o=document.getElementById("parking-designated-limit"))==null?void 0:o.value)||999,memo:((i=document.getElementById("parking-designated-memo"))==null?void 0:i.value)||""},other:{name:((d=document.getElementById("parking-other-name"))==null?void 0:d.value)||"指定以外",memo:((l=document.getElementById("parking-other-memo"))==null?void 0:l.value)||""}},{selectedParticipantIds:Array.from(Gt),selectedCarIds:Array.from(Wt),selectedDrivers:Array.from($t.entries()),selectedLuggage:Array.from(Rt),excludedParticipantIds:Array.from(nt),participantData:Array.from(st.entries()),currentAssignments:Z,parkingInfo:xe,eventInfo:De}}function Pr(e){var t,n,a,s,r;Gt=new Set(e.selectedParticipantIds||[]),Wt=new Set(e.selectedCarIds||[]),$t=new Map(e.selectedDrivers||[]),Rt=new Set(e.selectedLuggage||[]),nt=new Set(e.excludedParticipantIds||[]),st=new Map(e.participantData||[]),xe=e.parkingInfo||{groundName:"",designated:{name:"",limit:0,memo:""},other:{name:"",memo:""}},De=e.eventInfo||{date:"",name:"",timeline:"",notes:""},document.getElementById("event-date")&&(document.getElementById("event-date").value=De.date||""),document.getElementById("event-name")&&(document.getElementById("event-name").value=De.name||""),document.getElementById("event-timeline")&&(document.getElementById("event-timeline").value=De.timeline||""),document.getElementById("event-notes")&&(document.getElementById("event-notes").value=De.notes||""),document.getElementById("ground-name")&&(document.getElementById("ground-name").value=xe.groundName||""),document.getElementById("parking-designated-name")&&(document.getElementById("parking-designated-name").value=((t=xe.designated)==null?void 0:t.name)||""),document.getElementById("parking-designated-limit")&&(document.getElementById("parking-designated-limit").value=((n=xe.designated)==null?void 0:n.limit)||""),document.getElementById("parking-designated-memo")&&(document.getElementById("parking-designated-memo").value=((a=xe.designated)==null?void 0:a.memo)||""),document.getElementById("parking-other-name")&&(document.getElementById("parking-other-name").value=((s=xe.other)==null?void 0:s.name)||""),document.getElementById("parking-other-memo")&&(document.getElementById("parking-other-memo").value=((r=xe.other)==null?void 0:r.memo)||""),Z=e.currentAssignments||[],Ia(),Un()}function Kd(){const e=new Blob([JSON.stringify(Nr(),null,2)],{type:"application/json"}),t=document.createElement("a");t.href=URL.createObjectURL(e),t.download="state.json",t.click()}function Qd(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=a=>{Pr(JSON.parse(a.target.result)),Ea(),_a(),Hn()},n.readAsText(t)}async function Zd(){const e=document.getElementById("saved-state-select"),t=e.value;let n=`${document.getElementById("event-date").value}_${document.getElementById("event-name").value}`,a=!1,s=null;if(t){const r=e.options[e.selectedIndex];confirm(`現在「${r.text}」が選択されています。
このデータに上書き保存しますか？
（「キャンセル」を選ぶと新規保存になります）`)&&(a=!0,n=r.text,s=t)}if(!a){const r=prompt("保存名",n);if(!r)return;n=r}try{a&&s&&await Y.deleteState(s),await Y.saveState(Nr(),n),await vs();const r=document.getElementById("saved-state-select");for(let o=0;o<r.options.length;o++)if(r.options[o].text===n){r.selectedIndex=o;break}ze(a?"上書き保存しました":"保存しました","success")}catch{ze("保存に失敗しました","error")}}async function Xd(){const e=document.getElementById("saved-state-select").value;if(!e)return;const t=await Y.getState(e);t&&(Pr(t.state),Ea(),_a(),Hn(),ze("読込完了","success"))}async function el(){const e=document.getElementById("saved-state-select").value;e&&(await Y.deleteState(e),await vs(),ze("削除完了","success"))}async function vs(){const e=await Y.getAllSavedStates(),t=document.getElementById("saved-state-select");t&&(t.innerHTML='<option value="">作業一覧...</option>'+e.map(n=>`<option value="${n.id}">${n.name}</option>`).join(""))}async function tl(){const e=document.getElementById("saved-parking-select"),t=e.value;let n=document.getElementById("ground-name").value||"新規駐車場",a=!1,s=null;if(t){const o=e.options[e.selectedIndex];confirm(`現在「${o.text}」が選択されています。
このデータに上書き保存しますか？
（「キャンセル」を選ぶと新規保存になります）`)&&(a=!0,n=o.text,s=t)}if(!a){const o=prompt("駐車場保存名",n);if(!o)return;n=o}const r={groundName:document.getElementById("ground-name").value,designated:{name:document.getElementById("parking-designated-name").value,limit:parseInt(document.getElementById("parking-designated-limit").value),memo:document.getElementById("parking-designated-memo").value},other:{name:document.getElementById("parking-other-name").value,memo:document.getElementById("parking-other-memo").value}};try{a&&s&&await Y.deleteParking(s),await Y.saveParking(r,n),await ws();const o=document.getElementById("saved-parking-select");for(let i=0;i<o.options.length;i++)if(o.options[i].text===n){o.selectedIndex=i;break}ze(a?"駐車場を上書き保存しました":"駐車場を保存しました","success")}catch{ze("保存に失敗しました","error")}}async function nl(){const e=document.getElementById("saved-parking-select").value;if(!e)return;const t=await Y.getParking(e);t&&(document.getElementById("ground-name").value=t.parking.groundName,document.getElementById("parking-designated-name").value=t.parking.designated.name,document.getElementById("parking-designated-limit").value=t.parking.designated.limit,document.getElementById("parking-designated-memo").value=t.parking.designated.memo,document.getElementById("parking-other-name").value=t.parking.other.name,document.getElementById("parking-other-memo").value=t.parking.other.memo,ze("駐車場読込完了","success"))}async function al(){const e=document.getElementById("saved-parking-select").value;e&&(await Y.deleteParking(e),await ws(),ze("駐車場削除完了","success"))}async function ws(){const e=await Y.getAllSavedParking(),t=document.getElementById("saved-parking-select");t&&(t.innerHTML='<option value="">駐車場一覧...</option>'+e.map(n=>`<option value="${n.id}">${n.name}</option>`).join(""))}async function sl(){confirm("全データをリセットしますか？")&&(await Y.clearDatabase(),location.reload())}window.clearCurrentInputs=function(){if(!confirm(`現在の入力内容（イベント情報、選択メンバー、車、駐車場、配車結果など）をすべてクリアして、初期状態に戻しますか？
（※データベースに保存されているマスタデータや過去の保存データは削除されません）`))return;const e=document.getElementById("event-date");e&&(e.value="");const t=document.getElementById("event-name");t&&(t.value="");const n=document.getElementById("event-timeline");n&&(n.value="");const a=document.getElementById("event-remarks");a&&(a.value="");const s=document.getElementById("ground-name");s&&(s.value="");const r=document.getElementById("parking-name");r&&(r.value="");const o=document.getElementById("parking-limit");o&&(o.value="99");const i=document.getElementById("parking-remarks");i&&(i.value="");const d=document.getElementById("other-parking-name");d&&(d.value="");const l=document.getElementById("other-parking-remarks");l&&(l.value=""),Gt.clear(),Wt.clear(),$t.clear(),Rt.clear(),nt.clear(),st.clear(),Dr(),Z=[],Ea(),_a(),Hn(),Ia(),Un(),window.att_swapSelectedMember=null,window.att_swapSelectedCar=null,ze("画面の入力をクリアしました。","success")};function ze(e,t="info"){const n=document.getElementById("dispatch-message");let a="bg-blue-100 text-blue-700 border-blue-200";t==="error"?a="bg-red-100 text-red-700 border-red-200":t==="success"?a="bg-green-100 text-green-700 border-green-200":t==="warning"&&(a="bg-yellow-100 text-yellow-800 border-yellow-200"),n.className=`p-4 h-full border rounded-lg ${a}`,document.getElementById("dispatch-message-text").innerHTML=e,n.classList.remove("hidden"),Na&&clearTimeout(Na),t!=="warning"&&(Na=setTimeout(Es,5e3))}function Es(){document.getElementById("dispatch-message").classList.add("hidden")}function rl(){if(!Z||Z.length===0)return!1;for(const t of Z){if(t.id==="excluded-car")continue;if((t.driver?1:0)+t.members.filter(a=>a!==null).length>t.baseCapacity)return!0}const e=Z.find(t=>t.id==="excluded-car");return e?e.members.some(t=>t&&!nt.has(t.id)):!1}function Qs(){if(rl())ze("定員オーバーです。車の台数が足りないか、定員を超過している車があります。","warning");else{const e=document.getElementById("dispatch-message"),t=document.getElementById("dispatch-message-text");e&&!e.classList.contains("hidden")&&t&&t.innerHTML.includes("定員オーバー")&&Es()}}function ol(){var t,n,a,s,r,o,i;const e=document.querySelector("#view-master h2");if(e&&!document.getElementById("btn-back-to-dispatch-master")){const d=document.createElement("button");d.id="btn-back-to-dispatch-master",d.className="bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 px-4 py-2 rounded shadow font-bold text-sm mb-4 flex items-center w-fit",d.innerHTML='<span class="mr-1">◀</span> 配車調整に戻る',d.addEventListener("click",()=>{var l;return(l=document.getElementById("nav-dispatch"))==null?void 0:l.click()}),e.parentElement.insertBefore(d,e)}(t=document.getElementById("add-family-button"))==null||t.addEventListener("click",dl),et==null||et.addEventListener("click",ll),et==null||et.addEventListener("input",ul),et==null||et.addEventListener("change",cl),(n=document.getElementById("add-car-button"))==null||n.addEventListener("click",ml),xt==null||xt.addEventListener("click",pl),xt==null||xt.addEventListener("input",fl),(a=document.getElementById("add-parking-button-master"))==null||a.addEventListener("click",gl),Ct==null||Ct.addEventListener("click",bl),Ct==null||Ct.addEventListener("input",yl),(s=document.getElementById("export-master-button"))==null||s.addEventListener("click",hl),(r=document.getElementById("import-master-input"))==null||r.addEventListener("change",xl),(o=document.getElementById("master-message-close"))==null||o.addEventListener("click",Mr),(i=document.getElementById("save-master-db-button"))==null||i.addEventListener("click",il)}async function il(){const e=document.getElementById("save-master-db-button");try{e.textContent="保存中...",await Y.syncAllMaster(),rs("マスターデータをサーバーに保存しました","success"),Ve=await Y.getAllSavedParking()||[],Pn()}catch(t){rs("保存に失敗しました: "+t.message,"error")}finally{e.textContent="マスターデータを保存 (更新)"}}function Xt(){et&&(et.innerHTML="",ie.sort((e,t)=>(e.order??99)-(t.order??99)).forEach((e,t)=>{const n=e.members.map(a=>`<div class="p-2 border rounded bg-gray-50 member-grid"><input data-id="${a.id}" data-f="name" value="${a.name}" class="col-span-3 md:col-span-1 p-1 border"><select data-id="${a.id}" data-f="type" class="col-span-2 md:col-span-1 p-1 border"><option ${a.type==="選手"?"selected":""}>選手</option><option ${a.type==="保護者"?"selected":""}>保護者</option><option ${a.type==="兄弟"?"selected":""}>兄弟</option><option ${a.type==="その他"?"selected":""}>その他</option></select><input data-id="${a.id}" data-f="data.grade" value="${a.data.grade||""}" placeholder="学年" class="col-span-1 border"><input data-id="${a.id}" data-f="data.school" value="${a.data.school||""}" placeholder="学校" class="col-span-2 md:col-span-1 border"><input data-id="${a.id}" data-f="data.other" value="${a.data.other||""}" placeholder="他" class="col-span-2 md:col-span-1 border"><input data-id="${a.id}" data-f="data.memo" value="${a.data.memo||""}" placeholder="備考" class="col-span-2 md:col-span-1 border"><div class="col-span-3 md:col-span-1 flex items-center justify-between"><label class="text-xs"><input type="checkbox" data-id="${a.id}" data-f="isFlagTarget" ${a.isFlagTarget?"checked":""}>同乗優先</label><button data-action="del-m" data-id="${a.id}" class="bg-red-500 text-white px-2 py-1 rounded text-xs">削</button></div></div>`).join("");et.innerHTML+=`<div class="bg-white border rounded shadow" data-fname="${e.familyName}"><div class="family-header"><input data-action="ren-f" value="${e.familyName}" class="font-bold border p-1"><div class="space-x-2"><button data-action="up" class="bg-gray-400 text-white px-2 rounded text-xs">▲</button><button data-action="down" class="bg-gray-400 text-white px-2 rounded text-xs">▼</button><button data-action="del-f" class="bg-red-500 text-white px-2 py-1 rounded text-xs">家族削除</button></div></div><div class="p-3 space-y-2">${n}</div><button data-action="add-m" class="ml-3 mb-3 bg-blue-500 text-white px-2 py-1 rounded text-xs">＋メンバー</button></div>`}))}function dl(){const e=prompt("家族名");e&&(Y.addFamily({familyName:e,order:99,members:[{id:"p"+Date.now(),name:"新規",type:"選手",isFlagTarget:!0,data:{}}]}),Xt())}async function ll(e){const t=e.target,n=t.dataset.action,a=t.closest("[data-fname]");if(!a)return;const s=a.dataset.fname;if(n==="del-f"&&confirm("削除?")&&(Y.deleteFamily(s),Xt()),n==="add-m"){const r=await Y.getFamily(s);r.members.push({id:"p"+Date.now(),name:"新規",type:"保護者",isFlagTarget:!1,data:{}}),Y.updateFamily(r),Xt()}if(n==="del-m"){const r=await Y.getFamily(s);r.members=r.members.filter(o=>o.id!==t.dataset.id),Y.updateFamily(r),Xt()}if(n==="up"||n==="down"){ie.sort((i,d)=>(i.order??99)-(d.order??99)),ie.forEach((i,d)=>{i.order=d});const r=ie.findIndex(i=>i.familyName===s),o=n==="up"?r-1:r+1;if(o>=0&&o<ie.length){const i=ie[r].order;ie[r].order=ie[o].order,ie[o].order=i,Xt()}}}function cl(e){const t=e.target,n=t.closest("[data-fname]");if(!n)return;const a=n.dataset.fname;if(t.dataset.action==="ren-f"){const s=t.value.trim();if(s&&s!==a){if(ie.find(i=>i.familyName===s)){alert(`家族名「${s}」は既に存在します。別の名前を入力してください。`),t.value=a;return}const o=ie.find(i=>i.familyName===a);if(o){o.familyName=s,n.dataset.fname=s;let i=!1;le.forEach(d=>{d.familyName===a&&(d.familyName=s,i=!0)}),i&&En()}}else s||(t.value=a)}}async function ul(e){const t=e.target;if(t.dataset.action==="ren-f")return;const n=t.dataset.id,a=t.dataset.f,s=t.closest("[data-fname]").dataset.fname;if(!n||!a)return;const r=await Y.getFamily(s),o=r.members.find(d=>d.id===n),i=t.type==="checkbox"?t.checked:t.value;a.startsWith("data.")?o.data[a.split(".")[1]]=i:o[a]=i,Y.updateFamily(r)}function En(){xt&&(xt.innerHTML="",le.sort((e,t)=>(e.order??99)-(t.order??99)).forEach(e=>{xt.innerHTML+=`<div class="p-3 border rounded bg-gray-50 flex flex-wrap gap-2 items-center" data-cid="${e.id}"><button data-act="up" class="bg-gray-400 text-white px-2 py-1 text-xs">▲</button><button data-act="down" class="bg-gray-400 text-white px-2 py-1 text-xs">▼</button><input data-f="name" value="${e.name}" class="p-1 border text-sm w-32"><input data-f="familyName" value="${e.familyName}" class="p-1 border text-sm w-32"><input type="number" data-f="baseCapacity" value="${e.baseCapacity}" class="p-1 border text-sm w-16"><button data-act="del" class="bg-red-500 text-white px-2 py-1 rounded text-xs">削</button></div>`}))}function ml(){Y.addCar({id:"c"+Date.now(),name:"新規車",familyName:"",baseCapacity:5,order:99}),En()}function pl(e){const t=e.target,n=t.dataset.act,a=t.closest("[data-cid]");if(!a)return;const s=a.dataset.cid;if(n==="del"&&(Y.deleteCar(s),En()),n==="up"||n==="down"){le.sort((i,d)=>(i.order??99)-(d.order??99)),le.forEach((i,d)=>{i.order=d});const r=le.findIndex(i=>i.id===s),o=n==="up"?r-1:r+1;if(o>=0&&o<le.length){const i=le[r].order;le[r].order=le[o].order,le[o].order=i,En()}}}async function fl(e){const t=e.target,n=t.dataset.f,a=t.closest("[data-cid]").dataset.cid;if(!n)return;const s=await Y.getCar(a);s[n]=t.type==="number"?parseInt(t.value):t.value,Y.updateCar(s)}function $a(){Ct.innerHTML="",Ve.forEach(e=>{Ct.innerHTML+=`
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
        </div>`})}function gl(){Y.addParkingMaster({groundName:"",designated:{name:"",limit:0,memo:""},other:{name:"",memo:""}},"新規P"),$a()}function bl(e){e.target.dataset.act==="del"&&(Y.deleteParkingMaster(e.target.closest("[data-pid]").dataset.pid),$a())}function yl(e){const t=e.target,n=t.dataset.f,a=t.closest("[data-pid]").dataset.pid;if(!n)return;const s=Ve.find(o=>o.id===a),r=t.type==="number"?parseInt(t.value):t.value;if(n==="name")s.name=r;else{const o=n.split(".");o.length===2?s[o[0]][o[1]]=r:s[o[0]][o[1]][o[2]]=r}Y.updateParkingMaster(s)}async function hl(){const e={families:ie,cars:le,parking:await Y.getAllSavedParking()},t=document.createElement("a");t.href=URL.createObjectURL(new Blob([JSON.stringify(e)],{type:"application/json"})),t.download="master.json",t.click()}function xl(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=a=>{const s=JSON.parse(a.target.result);if(Y.bulkAddFamilies(s.families),Y.bulkAddCars(s.cars),s.parking){Ve.forEach(r=>An.add(r.id)),Ve=[];for(let r of s.parking)Ve.push({id:r.id||"p"+Date.now()+Math.floor(Math.random()*1e3),name:r.name,timestamp:r.timestamp||Date.now(),parking:r.parking,isNew:!0})}Xt(),En(),$a(),rs("読込完了 (※まだ保存されていません。保存ボタンを押してください)","info")},n.readAsText(t)}function rs(e,t="info"){const n=document.getElementById("master-message");n.className=`p-4 mb-4 border rounded-lg ${t==="error"?"bg-red-100 text-red-700":t==="success"?"bg-green-100 text-green-700":"bg-blue-100 text-blue-700"}`,document.getElementById("master-message-text").innerHTML=e,n.classList.remove("hidden"),Pa&&clearTimeout(Pa),Pa=setTimeout(Mr,5e3)}function Mr(){document.getElementById("master-message").classList.add("hidden")}let kt={type:"",add:[],update:[],delete:[]};function Or(e,t,n,a,s,r=""){kt={type:e,add:t,update:n,delete:a},document.getElementById("csv-confirm-title").textContent=s,document.getElementById("csv-add-count").textContent=t.length,document.getElementById("csv-update-count").textContent=n.length,document.getElementById("csv-delete-count").textContent=a.length;const o=document.getElementById("csv-confirm-warning");r?(o.innerHTML=r,o.classList.remove("hidden")):o.classList.add("hidden"),document.getElementById("tab-csv-add").onclick=()=>mn("add"),document.getElementById("tab-csv-update").onclick=()=>mn("update"),document.getElementById("tab-csv-delete").onclick=()=>mn("delete"),t.length>0?mn("add"):n.length>0?mn("update"):mn("delete"),document.getElementById("csv-confirm-modal").classList.remove("hidden")}function pa(){document.getElementById("csv-confirm-modal").classList.add("hidden");const e=document.getElementById("input-import-users-csv");e&&(e.value="");const t=document.getElementById("input-import-events-csv");t&&(t.value="")}function mn(e){["add","update","delete"].forEach(n=>{const a=document.getElementById(`tab-csv-${n}`);n===e?(a.classList.add("text-blue-600","border-blue-600"),a.classList.remove("text-gray-500","border-transparent")):(a.classList.remove("text-blue-600","border-blue-600"),a.classList.add("text-gray-500","border-transparent"))}),vl(e)}function vl(e){const t=document.getElementById("csv-confirm-content"),n=kt[e];if(!n||n.length===0){t.innerHTML='<p class="text-gray-500 p-4">対象のデータはありません。</p>';return}let a="";if(kt.type==="users"){const s=e==="add",r=e==="update";a+=`
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
        </div>`}else kt.type==="events"&&(a+=`
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
        </div>`);t.innerHTML=a}function Rr(e){const t=[];let n=[],a="",s=!1;for(let r=0;r<e.length;r++){const o=e[r];s?o==='"'?r+1<e.length&&e[r+1]==='"'?(a+='"',r++):s=!1:a+=o:o==='"'?s=!0:o===","?(n.push(a),a=""):o===`
`||o==="\r"?(n.push(a),t.push(n),n=[],a="",o==="\r"&&r+1<e.length&&e[r+1]===`
`&&r++):a+=o}return(a||n.length>0)&&(n.push(a),t.push(n)),t}function _s(e){if(e==null)return"";const t=String(e);return t.includes(",")||t.includes('"')||t.includes(`
`)||t.includes("\r")?'"'+t.replace(/"/g,'""')+'"':t}async function wl(){F("メンバー情報をエクスポート中...");try{const{data:e}=await S.from("app_users").select("*").order("created_at",{ascending:!1}),{data:t}=await S.from("user_groups").select("*"),{data:n}=await S.from("groups").select("*"),{data:a}=await S.from("user_attributes").select("*"),s=new Map(n.map(g=>[g.id,g.name])),r=new Map(a.map(g=>[g.id,g.name])),o=new Map(t.map(g=>[g.user_email,g.group_id]));let i=window.adminDelegations;if(!i){const{data:g}=await S.from("master_data").select("*").eq("key","ATTENDANCE_DELEGATIONS").single();i=g&&g.data?g.data:{},window.adminDelegations=i}const l=[["メールアドレス","氏名","役割","所属グループ名","ユーザー属性名","配車利用可(1/0)","成績利用可(1/0)","出欠利用可(1/0)","シミュレータ利用可(1/0)","Info利用可(1/0)","Info編集可(1/0)","代行入力先(カンマ区切りメールアドレス)","代行専用(1/0)","初期パスワード","削除(1/0)"]];e.forEach(g=>{const b=g.role==="admin"?"管理者":g.role==="leader"?"リーダー":"一般ユーザー",y=o.get(g.email),f=y&&s.get(y)||"",p=g.attribute_id&&r.get(g.attribute_id)||"",v=i[g.email]?i[g.email].join(","):"",x=g.email.endsWith("@local.dummy");l.push([g.email,g.name||"",b,f,p,g.can_use_dispatch!==!1?"1":"0",g.can_use_dashboard!==!1?"1":"0",g.can_use_attendance!==!1?"1":"0",g.can_use_simulator!==!1?"1":"0",g.can_use_info!==!1?"1":"0",g.can_edit_info===!0||g.role==="admin"||g.role==="leader"&&g.can_edit_info!==!1?"1":"0",v,x?"1":"0","","0"])});const c=l.map(g=>g.map(_s).join(",")).join(`
`),u=new Blob([new Uint8Array([239,187,191]),c],{type:"text/csv;charset=utf-8;"}),m=document.createElement("a");m.href=URL.createObjectURL(u),m.download=`members_${new Date().toISOString().split("T")[0]}.csv`,m.click()}catch(e){console.error(e),alert("エクスポートに失敗しました: "+e.message)}finally{q()}}async function El(e){const t=e.target.files[0];if(!t)return;F("CSVファイルを解析中...");const n=new FileReader;n.onload=async a=>{try{const s=a.target.result,r=Rr(s);if(r.length<2){alert("有効なデータがありません。"),q();return}const o=r[0].map(B=>B.trim()),i=o.indexOf("メールアドレス"),d=o.indexOf("氏名"),l=o.indexOf("役割"),c=o.indexOf("所属グループ名"),u=o.indexOf("ユーザー属性名"),m=o.findIndex(B=>B.includes("配車")),g=o.findIndex(B=>B.includes("成績")),b=o.findIndex(B=>B.includes("出欠")),y=o.findIndex(B=>B.includes("シミュレータ")),f=o.findIndex(B=>(B.includes("Info")||B.includes("インフォ"))&&!B.includes("編集")),p=o.findIndex(B=>(B.includes("Info")||B.includes("インフォ"))&&B.includes("編集")),v=o.findIndex(B=>B.includes("代行入力先")),x=o.findIndex(B=>B.includes("代行専用")),h=o.findIndex(B=>B.includes("初期パスワード")),k=o.findIndex(B=>B.includes("削除"));if(i===-1||d===-1){alert("「メールアドレス」および「氏名」列は必須です。"),q();return}const{data:L}=await S.from("app_users").select("*"),{data:w}=await S.from("user_groups").select("*"),{data:I}=await S.from("groups").select("*"),{data:E}=await S.from("user_attributes").select("*");let $=window.adminDelegations;if(!$){const{data:B}=await S.from("master_data").select("*").eq("key","ATTENDANCE_DELEGATIONS").single();$=B&&B.data?B.data:{},window.adminDelegations=$}const _=new Map(I.map(B=>[B.name,B.id])),C=new Map(E.map(B=>[B.name,B.id])),O=new Map(L.map(B=>[B.email,B])),N=new Map(w.map(B=>[B.user_email,B.group_id])),P=[],U=[],M=[];for(let B=1;B<r.length;B++){const A=r[B];if(A.length<2)continue;const T=(A[d]||"").trim();if(!T)continue;let D=(A[i]||"").trim();const G=x!==-1?A[x]==="1"||A[x]==="true"||A[x]==="代行専用":!1,H=D.endsWith("@local.dummy"),W=G||H;if(D)W&&!H&&(D.includes("@")?D=D.split("@")[0]+"@local.dummy":D=D+"@local.dummy");else if(W)D=`dummy_${Date.now()}_${B}@local.dummy`;else continue;D=va(D);const R=(A[l]||"").trim();let z="user";R==="管理者"||R==="admin"?z="admin":(R==="リーダー"||R==="leader")&&(z="leader");const J=c!==-1?(A[c]||"").trim():"",ye=J&&_.get(J)||null,ne=u!==-1?(A[u]||"").trim():"",de=ne&&C.get(ne)||null,Le=m!==-1?!(A[m]==="0"||A[m]==="false"):!0,Ke=g!==-1?!(A[g]==="0"||A[g]==="false"):!0,se=b!==-1?!(A[b]==="0"||A[b]==="false"):!0,Ze=y!==-1?!(A[y]==="0"||A[y]==="false"):!0,Re=f!==-1?!(A[f]==="0"||A[f]==="false"):!0,zt=p!==-1?A[p]==="1"||A[p]==="true"||A[p]==="可":z==="admin"||z==="leader"&&!0,At=k!==-1?A[k]==="1"||A[k]==="削除":!1;let mt=null;v!==-1&&(mt=(A[v]||"").split(",").map(qe=>qe.trim()).filter(Boolean));let pt="",rt=null;if(!W){const Te=h!==-1?(A[h]||"").trim():"";if(O.has(D))Te.length>=6&&(rt=Te);else if(Te.length>=6)pt=Te;else{const qe="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";let ft="pw-";for(let Vn=0;Vn<6;Vn++)ft+=qe.charAt(Math.floor(Math.random()*qe.length));pt=ft}}const V={email:D,name:T,role:z,group_id:ye,group_name:J,attribute_id:de,attribute_name:ne,can_use_dispatch:Le,can_use_dashboard:Ke,can_use_attendance:se,can_use_simulator:Ze,can_use_info:Re,can_edit_info:zt,delegations:mt,is_dummy:W,initial_password:rt!==null?rt:pt},re=O.get(D);if(re)if(At)M.push(V);else{const Te=N.get(D)!==ye,qe=re.role!==z,ft=re.name!==T,Vn=re.attribute_id!==de,qr=re.can_use_dispatch!==!1!==Le,Fr=re.can_use_dashboard!==!1!==Ke,jr=re.can_use_attendance!==!1!==se,Hr=re.can_use_simulator!==!1!==Ze,Ur=re.can_use_info!==!1!==Re,Vr=re.can_edit_info===!0!==zt;let Is=!1;if(mt!==null){const Gr=$[D]||[],Wr=[...mt].sort().join(","),zr=[...Gr].sort().join(",");Wr!==zr&&(Is=!0)}let $s=!1;rt!==null&&($s=!0),(Te||qe||ft||Vn||qr||Fr||jr||Hr||Ur||Vr||Is||$s)&&U.push(V)}else At||(V.delegations===null&&(V.delegations=[]),P.push(V))}q(),Or("users",P,U,M,"メンバーCSVインポート確認")}catch(s){console.error(s),alert("CSVの解析に失敗しました: "+s.message),q()}},n.readAsText(t)}async function _l(){kt.type==="users"?await Il():kt.type==="events"&&typeof window.executeEventsImport=="function"&&await window.executeEventsImport()}async function Il(){F("インポートデータを保存中...");try{const{add:e,update:t,delete:n}=kt;let a=window.adminDelegations;if(!a){const{data:d}=await S.from("master_data").select("*").eq("key","ATTENDANCE_DELEGATIONS").single();a=d&&d.data?d.data:{},window.adminDelegations=a}if(n.length>0){const d=n.map(c=>c.email),{error:l}=await S.from("app_users").delete().in("email",d);if(l)throw l;d.forEach(c=>{delete window.adminDelegations[c]}),Object.keys(window.adminDelegations).forEach(c=>{window.adminDelegations[c]=(window.adminDelegations[c]||[]).filter(u=>!d.includes(u))}),await ae("IMPORT_USERS_DELETE",`${n.length}件のユーザーをインポートで削除しました`)}if(e.length>0){const d=[];for(let m of e)if(!m.is_dummy)try{const g=window.supabase.createClient(vn,ca,{auth:{persistSession:!1,autoRefreshToken:!1}}),{error:b}=await g.auth.signUp({email:m.email,password:m.initial_password});if(b)throw new Error(`Auth作成失敗: ${b.message}`)}catch(g){console.error(`Sign up error for ${m.email}:`,g),d.push(`${m.email}: ${g.message}`)}if(d.length>0&&!confirm(`一部のアカウント払い出し（Auth）に失敗しました。データベース登録を続行しますか？

エラー内容:
${d.join(`
`)}`))throw new Error("インポート処理を中断しました。");const l=e.map(m=>({email:m.email,name:m.name,role:m.role,attribute_id:m.attribute_id,can_use_dispatch:m.can_use_dispatch,can_use_dashboard:m.can_use_dashboard,can_use_attendance:m.can_use_attendance,can_use_simulator:m.can_use_simulator,can_use_info:m.can_use_info,can_edit_info:m.can_edit_info}));let{error:c}=await S.from("app_users").insert(l);if(c&&c.message&&c.message.includes("can_edit_info")){const m=l.map(b=>{const y={...b};return delete y.can_edit_info,y});c=(await S.from("app_users").insert(m)).error}if(c)throw c;const u=e.filter(m=>m.group_id).map(m=>({user_email:m.email,group_id:m.group_id}));if(u.length>0){const{error:m}=await S.from("user_groups").insert(u);if(m)throw m}e.forEach(m=>{m.delegations&&(window.adminDelegations[m.email]=m.delegations)}),await ae("IMPORT_USERS_ADD",`${e.length}件のユーザーをインポートで追加しました`)}if(t.length>0){const d=[];for(let l of t){if(l.initial_password)try{const{error:g}=await S.rpc("admin_update_user_password",{user_email:l.email,new_password:l.initial_password});if(g)throw g;await ae("ADMIN_CHANGE_PASSWORD",`ユーザー「${l.email}」のパスワードをインポートで変更しました`)}catch(g){console.error(`Failed to update password for ${l.email}:`,g),d.push(`${l.email}: ${g.message}`)}const c={name:l.name,role:l.role,attribute_id:l.attribute_id,can_use_dispatch:l.can_use_dispatch,can_use_dashboard:l.can_use_dashboard,can_use_attendance:l.can_use_attendance,can_use_simulator:l.can_use_simulator,can_use_info:l.can_use_info,can_edit_info:l.can_edit_info};let{error:u}=await S.from("app_users").update(c).eq("email",l.email);if(u&&u.message&&u.message.includes("can_edit_info")){const g={...c};delete g.can_edit_info,u=(await S.from("app_users").update(g).eq("email",l.email)).error}if(u)throw u;const{data:m}=await S.from("user_groups").select("*").eq("user_email",l.email);if(l.group_id)if(m&&m.length>0){const{error:g}=await S.from("user_groups").update({group_id:l.group_id}).eq("user_email",l.email);if(g)throw g}else{const{error:g}=await S.from("user_groups").insert([{user_email:l.email,group_id:l.group_id}]);if(g)throw g}else if(m&&m.length>0){const{error:g}=await S.from("user_groups").delete().eq("user_email",l.email);if(g)throw g}l.delegations!==null&&(window.adminDelegations[l.email]=l.delegations)}d.length>0&&alert(`一部のパスワード更新に失敗しました。詳細は開発者コンソールを確認してください。

失敗したユーザー:
${d.join(`
`)}`),await ae("IMPORT_USERS_UPDATE",`${t.length}件のユーザーをインポートで更新しました`)}const{error:s}=await S.from("master_data").upsert({key:"ATTENDANCE_DELEGATIONS",data:window.adminDelegations});if(s)throw s;let r="インポートが完了しました。";const o=e.filter(d=>!d.is_dummy),i=t.filter(d=>d.initial_password);(o.length>0||i.length>0)&&(r+=`

【アカウントのログイン情報・変更内容】`,o.length>0&&(r+=`
[新規アカウントの仮パスワード]`,o.forEach(d=>{r+=`
氏名: ${d.name}
ログインID: ${sn(d.email)}
仮パスワード: ${d.initial_password}
------------------------`})),i.length>0&&(r+=`
[更新アカウントの新パスワード]`,i.forEach(d=>{r+=`
氏名: ${d.name}
ログインID: ${sn(d.email)}
新パスワード: ${d.initial_password}
------------------------`})),r+=`

※上記情報をコピーし、対象のユーザーへお伝えください。`),alert(r),pa(),await oe()}catch(e){console.error(e),alert("保存に失敗しました: "+e.message)}finally{q()}}window.showCSVConfirmModal=Or;window.closeCSVConfirmModal=pa;window.parseCSV=Rr;window.escapeCSV=_s;function $l(){const n=[["メールアドレス","氏名","役割","所属グループ名","ユーザー属性名","配車利用可(1/0)","成績利用可(1/0)","出欠利用可(1/0)","代行入力先(カンマ区切りメールアドレス)","代行専用(1/0)","初期パスワード","削除(1/0)"],["sample_parent@example.com","山田 太郎","一般ユーザー","選手・保護者","A軍","1","1","1","sample_child1@example.com,sample_child2@example.com","0","tempPw123","0"],["sample_child1@example.com","山田 一郎","一般ユーザー","選手・保護者","A軍","1","0","1","","0","tempPw123","0"],["sample_child2@example.com","山田 二郎","一般ユーザー","選手・保護者","A軍","1","0","1","","0","tempPw123","0"],["","代行専用の子ども","一般ユーザー","選手・保護者","A軍","0","0","1","","1","","0"]].map(r=>r.map(_s).join(",")).join(`
`),a=new Blob([new Uint8Array([239,187,191]),n],{type:"text/csv;charset=utf-8;"}),s=document.createElement("a");s.href=URL.createObjectURL(a),s.download="members_sample.csv",s.click()}const kl=Object.freeze(Object.defineProperty({__proto__:null,get csvImportState(){return kt},get currentUser(){return j},get currentUserRole(){return he},forceHideLoading:Fe,goToUsersAdmin:Cr,hideLoading:q,logAction:ae,openChangePasswordModal:xs,showLoading:F,supabaseClient:S,switchAuthScreen:Q,withLoading:ve},Symbol.toStringTag,{value:"Module"}));
