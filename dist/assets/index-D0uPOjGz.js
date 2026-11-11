(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();let In=new Date,Tt=[],bt=[],dt=[],Js=[],ts=[],Ot=[],ze=[],pn=[],on=[],hr=!1,$s=[],fn=[],$e=[];window.att_multiSelectMode=!1;window.att_selectedDates=new Set;window.att_selectedCategories=new Set;window.att_selectedGroups=new Set;function ra(e){let t=e.target_group_ids||[];if(t.length===0&&e.target_group_id&&(t=[e.target_group_id]),t.length===0)return{ids:[],name:"全体",color:"#e5e7eb"};const n=bt.filter(a=>t.includes(a.id));return n.length===0?{ids:[],name:"全体",color:"#e5e7eb"}:{ids:t,name:n.map(a=>a.name).join(", "),color:n[0].color||"#e5e7eb",groups:n}}function Wr(e){return e.ids.length===0?'<span class="text-xs border border-gray-300 text-gray-800 px-2 py-0.5 rounded shadow-sm" style="background-color: #e5e7eb">全体</span>':e.groups.map(t=>`<span class="text-xs border border-gray-300 text-gray-800 px-2 py-0.5 rounded shadow-sm" style="background-color: ${t.color||"#e5e7eb"}">${t.name}</span>`).join(" ")}function Jr(e){if(!e)return"-";try{const t=new Date(e);if(isNaN(t.getTime()))return"-";const n=t.getMonth()+1,a=t.getDate(),s=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}/${a} ${s}:${r}`}catch{return"-"}}async function Ss(){try{hr||(Ho(),hr=!0),await Fn(),yt(),qo(),Uo()}catch(e){console.error("Attendance App Init Error:",e),typeof it=="function"&&it()}}function Ho(){var n,a,s,r,o,i,d,l,c,u,f,g,y,b,p,m,h,_,I,k,S,$,E,w,x;const e=document.getElementById("btn-logout-att");if(e&&!document.getElementById("btn-change-password-att")){const v=document.createElement("button");v.id="btn-change-password-att",v.className="text-xs md:text-sm bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 md:px-3 md:py-1 rounded shadow mr-2 font-bold",v.textContent="パスワード変更",v.onclick=()=>mr(),e.parentNode.insertBefore(v,e)}(n=document.getElementById("tab-calendar"))==null||n.addEventListener("click",()=>xr("calendar")),(a=document.getElementById("tab-list"))==null||a.addEventListener("click",()=>{xr("list"),sn()}),(s=document.getElementById("cal-prev-month"))==null||s.addEventListener("click",()=>{In.setMonth(In.getMonth()-1),yt()}),(r=document.getElementById("cal-next-month"))==null||r.addEventListener("click",()=>{In.setMonth(In.getMonth()+1),yt()}),(o=document.getElementById("cal-today"))==null||o.addEventListener("click",()=>{In=new Date,yt()}),(i=document.getElementById("btn-add-event"))==null||i.addEventListener("click",()=>va()),(d=document.getElementById("btn-export-events"))==null||d.addEventListener("click",oi),(l=document.getElementById("btn-import-events"))==null||l.addEventListener("click",()=>document.getElementById("input-import-events-csv").click()),(c=document.getElementById("btn-import-ics-events"))==null||c.addEventListener("click",()=>document.getElementById("input-import-events-ics").click()),(u=document.getElementById("btn-download-events-sample"))==null||u.addEventListener("click",li),(f=document.getElementById("input-import-events-csv"))==null||f.addEventListener("change",ii),(g=document.getElementById("input-import-events-ics"))==null||g.addEventListener("change",ui),(y=document.getElementById("btn-close-ics-modal-x"))==null||y.addEventListener("click",ks),(b=document.getElementById("btn-close-ics-modal"))==null||b.addEventListener("click",ks),(p=document.getElementById("btn-execute-ics-import"))==null||p.addEventListener("click",pi),(m=document.getElementById("ics-import-list"))==null||m.addEventListener("change",v=>{if(v.target&&v.target.classList.contains("ics-row-location-select")){const A=v.target,P=A.closest(".ics-row").querySelector(".ics-row-location");A.value&&A.value!=="custom"?P.value=A.value:A.value==="custom"&&(P.value="",P.focus())}});const t=document.getElementById("btn-group-manage");t&&(t.style.display="none"),(h=document.getElementById("btn-toggle-multiselect"))==null||h.addEventListener("click",function(){window.att_multiSelectMode=!window.att_multiSelectMode,window.att_multiSelectMode||window.att_selectedDates.clear(),this.classList.toggle("bg-blue-600",window.att_multiSelectMode),this.classList.toggle("text-white",window.att_multiSelectMode),this.classList.toggle("bg-blue-50",!window.att_multiSelectMode),this.classList.toggle("text-blue-600",!window.att_multiSelectMode),yt(),window.att_updateMultiselectBar()}),(_=document.getElementById("btn-cal-filter"))==null||_.addEventListener("click",vr),(I=document.getElementById("btn-cal-filter-clear"))==null||I.addEventListener("click",fs),(k=document.getElementById("btn-list-filter"))==null||k.addEventListener("click",vr),(S=document.getElementById("btn-list-filter-clear"))==null||S.addEventListener("click",fs),($=document.getElementById("btn-close-filter-modal-x"))==null||$.addEventListener("click",Fa),(E=document.getElementById("btn-close-filter-modal"))==null||E.addEventListener("click",Fa),(w=document.getElementById("btn-apply-filter"))==null||w.addEventListener("click",jo),(x=document.getElementById("btn-filter-clear"))==null||x.addEventListener("click",fs)}function xr(e){const t=document.getElementById("tab-calendar"),n=document.getElementById("tab-list");e==="calendar"?(document.getElementById("calendar-container").classList.remove("hidden"),document.getElementById("list-container").classList.add("hidden"),t.classList.replace("bg-white","bg-green-600"),t.classList.replace("text-green-600","text-white"),n.classList.replace("bg-green-600","bg-white"),n.classList.replace("text-white","text-green-600")):(document.getElementById("calendar-container").classList.add("hidden"),document.getElementById("list-container").classList.remove("hidden"),n.classList.replace("bg-white","bg-green-600"),n.classList.replace("text-green-600","text-white"),t.classList.replace("bg-green-600","bg-white"),t.classList.replace("text-white","text-green-600"))}async function Fn(){W("イベント・出欠データ読み込み中...");try{const{data:e}=await B.from("groups").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});e&&(bt=e);const{data:t}=await B.from("event_categories").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});t&&t.length>0?dt=t:dt=[{id:"1",name:"練習"},{id:"2",name:"試合"},{id:"3",name:"イベント"}];const n=new Date,a=new Date(n.getFullYear(),n.getMonth()-6,1),s=new Date(n.getFullYear(),n.getMonth()+7,1),{data:r}=await B.from("events").select("*").gte("start_time",a.toISOString()).lt("start_time",s.toISOString()).order("start_time");r&&(Tt=r);const{data:o}=await B.from("app_users").select("email, name, attribute_id, can_use_attendance");o&&(pn=o);const{data:i}=await B.from("user_attributes").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});i&&(on=i);try{const{data:c}=await B.from("event_locations").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});c&&(fn=c)}catch(c){console.warn("event_locations table might not exist yet:",c),fn=[]}const{data:d}=await B.from("user_groups").select("*");d&&(Ot=d,J&&(Js=d.filter(c=>c.user_email===J.email)));let l=[];if(Tt&&Tt.length>0){const c=Tt.map(f=>f.id),{data:u}=await B.from("attendances").select("*").in("event_id",c);u&&(l=u)}ze=l,J&&(ts=l.filter(c=>c.user_email===J.email));try{const{data:c}=await B.from("master_data").select("data").eq("key","ATTENDANCE_DELEGATIONS").single();c&&c.data&&J&&($s=c.data[J.email]||[])}catch{$s=[]}}catch(e){console.error("Attendance DB Error:",e)}finally{typeof it=="function"?it():G()}}function qo(){const e=document.getElementById("filter-group");e&&(e.innerHTML='<option value="">すべてのグループ</option>'+bt.map(t=>`<option value="${t.id}">${t.name}</option>`).join(""))}function Uo(){const e=document.getElementById("filter-category");if(!e)return;const t=e.value;e.innerHTML='<option value="">すべてのカテゴリ</option>'+dt.map(n=>`<option value="${n.name}">${n.name}</option>`).join(""),dt.some(n=>n.name===t)&&(e.value=t)}function vr(){const e=document.getElementById("filter-modal-content");if(!e)return;let t="";t+='<div class="mb-5">',t+='<h4 class="text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">カテゴリ（複数選択）</h4>',dt.length===0?t+='<p class="text-xs text-gray-400">カテゴリが登録されていません</p>':(t+='<div class="grid grid-cols-2 gap-2">',dt.forEach(a=>{const s=window.att_selectedCategories.has(a.name)?"checked":"";t+=`
                <label class="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition">
                    <input type="checkbox" class="filter-cat-checkbox w-4 h-4 rounded text-green-600 focus:ring-green-500 border-gray-300" value="${a.name}" ${s}>
                    <span class="select-none">${a.name}</span>
                </label>
            `}),t+="</div>"),t+="</div>",t+='<div class="mb-2">',t+='<h4 class="text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">対象グループ（複数選択）</h4>',t+='<div class="grid grid-cols-2 gap-2">';const n=window.att_selectedGroups.has("all")?"checked":"";t+=`
        <label class="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition font-medium">
            <input type="checkbox" class="filter-group-checkbox w-4 h-4 rounded text-green-600 focus:ring-green-500 border-gray-300" value="all" ${n}>
            <span class="select-none font-semibold text-gray-900">全体（全員対象）</span>
        </label>
    `,bt.length>0&&bt.forEach(a=>{const s=window.att_selectedGroups.has(a.id)?"checked":"";t+=`
                <label class="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition">
                    <input type="checkbox" class="filter-group-checkbox w-4 h-4 rounded text-green-600 focus:ring-green-500 border-gray-300" value="${a.id}" ${s}>
                    <span class="select-none">${a.name}</span>
                </label>
            `}),t+="</div>",t+="</div>",e.innerHTML=t,document.getElementById("filter-modal").classList.remove("hidden")}function Fa(){document.getElementById("filter-modal").classList.add("hidden")}function jo(){const e=document.querySelectorAll(".filter-cat-checkbox"),t=document.querySelectorAll(".filter-group-checkbox");window.att_selectedCategories.clear(),e.forEach(n=>{n.checked&&window.att_selectedCategories.add(n.value)}),window.att_selectedGroups.clear(),t.forEach(n=>{n.checked&&window.att_selectedGroups.add(n.value)}),Yr(),yt(),sn(),Fa()}function fs(){window.att_selectedCategories.clear(),window.att_selectedGroups.clear(),Yr(),yt(),sn(),Fa()}function Yr(){const e=window.att_selectedCategories.size+window.att_selectedGroups.size,t=document.getElementById("cal-filter-badge"),n=document.getElementById("btn-cal-filter-clear"),a=document.getElementById("btn-cal-filter"),s=document.getElementById("list-filter-badge"),r=document.getElementById("btn-list-filter-clear"),o=document.getElementById("btn-list-filter");e>0?(t&&(t.textContent=e,t.classList.remove("hidden")),n&&n.classList.remove("hidden"),a&&(a.classList.remove("bg-[#e6e5dd]","hover:bg-[#dcdad2]","text-slate-800"),a.classList.add("bg-green-100","hover:bg-green-200","text-green-800","border-green-300")),s&&(s.textContent=e,s.classList.remove("hidden")),r&&r.classList.remove("hidden"),o&&(o.classList.remove("bg-gray-100","hover:bg-gray-200","text-gray-800"),o.classList.add("bg-green-100","hover:bg-green-200","text-green-800","border-green-300"))):(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),a&&(a.classList.remove("bg-green-100","hover:bg-green-200","text-green-800","border-green-300"),a.classList.add("bg-[#e6e5dd]","hover:bg-[#dcdad2]","text-slate-800")),s&&s.classList.add("hidden"),r&&r.classList.add("hidden"),o&&(o.classList.remove("bg-green-100","hover:bg-green-200","text-green-800","border-green-300"),o.classList.add("bg-gray-100","hover:bg-gray-200","text-gray-800")))}function Kr(){return Tt.filter(e=>{if(window.att_selectedCategories&&window.att_selectedCategories.size>0&&!window.att_selectedCategories.has(e.category))return!1;if(window.att_selectedGroups&&window.att_selectedGroups.size>0){const t=ra(e);if(t.ids.length===0){if(!window.att_selectedGroups.has("all"))return!1}else if(!t.ids.some(a=>window.att_selectedGroups.has(a)))return!1}return!0})}function yt(){const e=In.getFullYear(),t=In.getMonth();document.getElementById("cal-current-month").textContent=`${e}年${t+1}月`;const n=document.getElementById("calendar-grid");n&&n.classList.remove("gap-1","gap-px","gap-2","p-1","p-2","p-4"),Array.from(n.children).forEach((i,d)=>{d>=7&&n.removeChild(i)});const s=new Date(e,t,1).getDay(),r=new Date(e,t,1-s),o=new Date;for(let i=0;i<42;i++){const d=new Date(r);d.setDate(r.getDate()+i);const l=d.getFullYear(),c=d.getMonth(),u=d.getDate(),f=c===t,g=`${l}-${String(c+1).padStart(2,"0")}-${String(u).padStart(2,"0")}`,y=window.att_multiSelectMode&&window.att_selectedDates.has(g),b=d.getDay(),p=ri(d),m=l===o.getFullYear()&&c===o.getMonth()&&u===o.getDate(),h=document.createElement("div");let _="border-r border-b min-h-[100px] flex flex-col p-0 cursor-pointer";f?p||b===0?_+=" bg-sunday-hatch":b===6?_+=" bg-saturday-hatch":_+=" bg-white":_+=" bg-gray-50 opacity-60",y&&(_="border-2 border-blue-500 min-h-[100px] flex flex-col p-0 bg-blue-50/70 cursor-pointer z-10"),m&&!window.att_multiSelectMode&&(_+=" today-cell-border"),h.className=_,h.onclick=()=>{window.att_multiSelectMode?(window.att_selectedDates.has(g)?window.att_selectedDates.delete(g):window.att_selectedDates.add(g),yt(),window.att_updateMultiselectBar()):va(g)};const I=document.createElement("div");let k="text-gray-700";f&&(p||b===0?k="text-red-600 font-bold":b===6&&(k="text-blue-600 font-bold")),I.className=`text-right text-[11px] ${k} mb-0 pr-1 pt-1 leading-none`,I.textContent=u,h.appendChild(I);const S=document.createElement("div");S.className="flex-1 overflow-hidden flex flex-col gap-0";const E=Kr().filter(v=>v.start_time&&v.start_time.startsWith(g)),w=E.slice(0,5),x=E.length>5;if(w.forEach(v=>{const A=document.createElement("div"),P=ts.find(T=>T.event_id===v.id);let N="",D="text-gray-800";if(v.requires_attendance){const T=P?P.status:"未入力";T==="出席"?(N='<span class="inline-block text-[9px] font-bold text-white bg-blue-600 rounded px-0.5 mr-0.5 leading-none shrink-0 align-middle">出</span>',D="text-blue-700 font-bold"):T==="欠席"?(N='<span class="inline-block text-[9px] font-bold text-white bg-gray-400 rounded px-0.5 mr-0.5 leading-none shrink-0 align-middle">欠</span>',D="text-gray-800 opacity-70"):T==="保留"||T==="未定"?(N='<span class="inline-block text-[9px] font-bold text-white bg-amber-500 rounded px-0.5 mr-0.5 leading-none shrink-0 align-middle">保</span>',D="text-gray-800"):(N='<span class="inline-block text-[9px] font-bold text-white bg-red-500 rounded px-0.5 mr-0.5 leading-none shrink-0 align-middle">未</span>',D="text-red-600 font-bold")}const F=dt.find(T=>T.name===v.category),R=(F==null?void 0:F.color)||"#bfdbfe",L=(v.title||"").replace(/[\r\n]+/g," ");A.className=`text-[10px] rounded px-0.5 py-px truncate whitespace-nowrap overflow-hidden text-ellipsis w-full text-left cursor-pointer hover:opacity-80 leading-tight mb-0.5 ${D}`,A.style.backgroundColor=R,A.innerHTML=`${N}${L}`,A.title=v.title,A.onclick=T=>{T.stopPropagation(),window.att_openEventDetail(v.id)},S.appendChild(A)}),x){const v=document.createElement("div");v.className="text-[10px] text-gray-500 text-center mt-[1px] cursor-pointer hover:underline",v.textContent=`他 ${E.length-5} 件`,v.onclick=A=>{A.stopPropagation(),alert(`${g} の予定が多すぎます。リストビューで確認してください。`)},S.appendChild(v)}h.appendChild(S),n.appendChild(h)}}const Ys=["日","月","火","水","木","金","土"];function Vo(e){const t=new Date(e);if(isNaN(t.getTime()))return e;const n=t.getDate(),a=Ys[t.getDay()];return`${n}日(${a})`}function Go(e,t,n){const a=new Date(e);if(isNaN(a.getTime()))return"日時未定";const s=a.getMonth()+1,r=a.getDate(),o=Ys[a.getDay()],i=`${s}/${r}(${o})`;if(n)return`${i} 終日`;const d=e.substring(11,16);let l="";if(t){const c=new Date(t);isNaN(c.getTime())||(l=` - ${t.substring(11,16)}`)}return`${i}${d}${l}`}function zo(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const n=t.getFullYear(),a=t.getMonth()+1,s=t.getDate(),r=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}/${a}/${s} ${r}:${o}`}function sn(){const e=Kr(),t=document.getElementById("event-list-content");if(e.length===0){t.innerHTML='<p class="text-gray-500 p-4">表示するイベントがありません。</p>';return}const n=[...e].sort((i,d)=>i.start_time?d.start_time?i.start_time.localeCompare(d.start_time):-1:1),a={};n.forEach(i=>{const d=i.start_time?i.start_time.split("T")[0]:"未定";a[d]||(a[d]=[]),a[d].push(i)});const s=new Date,r=`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}-${String(s.getDate()).padStart(2,"0")}`;let o="";Object.keys(a).forEach(i=>{const d=a[i];let l="日時未定",c="";i!=="未定"&&(l=Vo(i),i===r&&(c=`<span class="ml-2 bg-green-600 text-white text-xs px-2.5 py-0.5 rounded-full font-bold shadow-sm">${new Date(i).getDate()}日(今日)</span>`)),o+=`
        <div class="space-y-2 mb-4">
            <div class="flex items-center text-sm font-bold text-gray-700 border-b border-gray-200 pb-1 px-1">
                <span>${l}</span>
                ${c}
            </div>
        `,d.forEach(u=>{const f=ra(u);f.name,f.color;const g=dt.find(S=>S.name===u.category),y=(g==null?void 0:g.color)||"#bfdbfe",b=ts.find(S=>S.event_id===u.id);let p=b&&b.status?b.status:"未回答";p==="未定"&&(p="保留");const m=Go(u.start_time,u.end_time,u.is_all_day);let h="不明";if(u.created_by){const S=pn.find($=>$.email===u.created_by);h=S&&S.name||u.created_by.split("@")[0]}const _=zo(u.created_at),I=u.created_by?`
                <div class="flex items-center text-gray-400 text-[10px] mt-1 space-x-1">
                    <span class="w-4 h-4 rounded-full bg-green-50 flex items-center justify-center text-[10px] text-green-700 font-bold">👤</span>
                    <span>${h} ${_}</span>
                </div>
            `:"";let k="";if(u.requires_attendance){const S=u.attendance_deadline?new Date>new Date(u.attendance_deadline):!1;let $="bg-gray-100 text-gray-600",E="";if(S)E="回答期限切れ",$="bg-gray-200 text-gray-500";else if(u.attendance_deadline){const v=new Date(u.attendance_deadline),A=v.getMonth()+1,P=v.getDate(),N=String(v.getHours()).padStart(2,"0"),D=String(v.getMinutes()).padStart(2,"0");E=`回答期限: ${A}/${P} ${N}:${D}`}const w=E?`<span class="text-[10px] px-1.5 py-0.5 rounded ${$} font-semibold">${E}</span>`:"";let x="";p==="出席"?x='<div class="flex items-center justify-center w-5 h-5 bg-green-600 text-white rounded-full text-[10px] font-bold shadow-sm" title="出席">O</div>':p==="欠席"?x='<div class="flex items-center justify-center w-5 h-5 bg-black text-white rounded text-[10px] font-bold shadow-sm" title="欠席">X</div>':p==="保留"?x='<div class="flex items-center justify-center w-5 h-5 bg-yellow-600 text-white rounded-full text-[10px] font-bold shadow-sm" title="保留">-</div>':x='<div class="flex items-center justify-center w-5 h-5 bg-red-600 text-white rounded-full text-[10px] font-bold shadow-sm animate-pulse" title="未回答">?</div>',k=`
                    <div class="flex items-center space-x-2 shrink-0">
                        ${w}
                        ${x}
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
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold" style="background-color: ${y}; color: #1f2937">${u.category||"イベント"}</span>
                    ${Wr(f)}
                    <span class="flex items-center space-x-1">
                        <span>🕒</span>
                        <span>${m}</span>
                    </span>
                    <span class="flex items-center space-x-0.5">
                        <span>📍</span>
                        <span>${Zr(u.location)}</span>
                    </span>
                </div>

                <!-- カード下部（登録者と詳細矢印） -->
                <div class="flex justify-between items-end mt-1">
                    ${I}
                    <!-- 詳細矢印 (緑の右向き) -->
                    <div class="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition absolute right-2 bottom-2">
                        <span class="text-green-700 text-[10px] font-bold leading-none">&#10095;</span>
                    </div>
                </div>

            </div>
            `}),o+="</div>"}),t.innerHTML=o}function va(e="",t=null,n=!1,a=null){let s="";t&&(s=t.title.replace(/"/g,"&quot;"),n||(s+=" (コピー)"));const r=!t&&!n;a&&a.length>0?$e=[...a]:t?$e=[t.start_time.split("T")[0]]:e?$e=[e]:$e=[new Date().toISOString().split("T")[0]],window.att_modalSelectedDates=$e,window.att_isEditingModal=n;const o=t&&t.start_time&&!t.is_all_day?t.start_time.split("T")[1].substring(0,5):r?"12:30":"",i=t&&t.end_time&&!t.is_all_day?t.end_time.split("T")[1].substring(0,5):r?"17:00":"",d=t?t.is_all_day:!1,l=t?t.category:"",c=t?(t.location||"").replace(/"/g,"&quot;"):"",u=t?(t.description||"").replace(/</g,"&lt;").replace(/>/g,"&gt;"):"",f=t?t.requires_attendance:!0,g=t?t.require_detailed_attendance:!1,y=o?o.split(":")[0]:"",b=o?o.split(":")[1]:"",p=i?i.split(":")[0]:"",m=i?i.split(":")[1]:"",h=!c||!fn.some(C=>(C.url?`${C.name} ${C.url}`:C.name)===c);let _="",I="";if(c){const C=c.match(/(https?:\/\/[^\s\<\>\"]+)/);C?(I=C[0],_=c.replace(I,"").trim()):_=c}const k=!!(t&&t.attendance_deadline&&t.attendance_deadline!==Zt(t.start_time.split("T")[0])),S=Zt($e[0])?Zt($e[0]).split("T")[0]:"",$=t&&t.attendance_deadline?t.attendance_deadline.split("T")[0]:S,E=t&&t.attendance_deadline?t.attendance_deadline.split("T")[1].substring(0,5):"12:00",w=E?E.split(":")[0]:"12",x=E?E.split(":")[1]:"00",v=C=>'<option value="">--</option>'+Array.from({length:24},(U,ee)=>String(ee).padStart(2,"0")).map(U=>`<option value="${U}" ${U===C?"selected":""}>${U}</option>`).join(""),A=C=>'<option value="">--</option>'+Array.from({length:60},(U,ee)=>String(ee).padStart(2,"0")).map(U=>`<option value="${U}" ${U===C?"selected":""}>${U}</option>`).join(""),P=t?t.target_group_ids&&t.target_group_ids.length>0?t.target_group_ids:t.target_group_id?[t.target_group_id]:[]:[],N=n?"イベントを編集":t?"イベントを複製":"新規イベント登録",D=`
        <div class="border p-2 rounded max-h-32 overflow-y-auto space-y-1 bg-white">
            <label class="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" id="ev-group-all" value="all" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" ${P.length===0?"checked":""}>
                <span class="text-xs font-medium">全体</span>
            </label>
            ${bt.map(C=>`
                <label class="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" name="ev-group-cb" value="${C.id}" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" ${P.includes(C.id)?"checked":""}>
                    <span class="text-xs">${C.name}</span>
                </label>
            `).join("")}
        </div>
    `;let F="";n?F=`
            <div>
                <label class="text-xs font-bold text-gray-600">日付*</label>
                <div id="ev-dates-container" class="mt-1">
                    <input type="date" value="${$e[0]}" class="w-full border p-1.5 rounded text-xs px-1" onchange="window.att_onSingleDateChange(this.value)">
                </div>
            </div>
        `:F=`
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
            <h3 class="text-lg font-bold mb-3 shrink-0">${N}</h3>
            <div class="space-y-3 overflow-y-auto pr-1 flex-1">
                <div>
                    <label class="text-xs font-bold text-gray-600">イベント名*</label>
                    <input type="text" id="ev-title" value="${s}" placeholder="イベント名" class="w-full border p-1.5 rounded text-xs">
                </div>
                
                <!-- Date input block -->
                ${F}
                
                <!-- Time and AllDay Row -->
                <div class="flex space-x-4 items-end">
                    <div id="ev-time-container" class="flex-1 ${d?"opacity-50":""}">
                        <label class="text-xs font-bold text-gray-600">開始時間</label>
                        <div class="flex items-center space-x-1 mt-1">
                            <select id="ev-time-h" class="w-full border py-1.5 px-1.5 rounded text-xs bg-white" ${d?"disabled":""}>${v(y)}</select>
                            <span class="font-bold text-gray-500">:</span>
                            <select id="ev-time-m" class="w-full border py-1.5 px-1.5 rounded text-xs bg-white" ${d?"disabled":""}>${A(b)}</select>
                        </div>
                    </div>
                    <div id="ev-end-time-container" class="flex-1 ${d?"opacity-50":""}">
                        <label class="text-xs font-bold text-gray-600">終了時間</label>
                        <div class="flex items-center space-x-1 mt-1">
                            <select id="ev-end-time-h" class="w-full border py-1.5 px-1.5 rounded text-xs bg-white" ${d?"disabled":""}>${v(p)}</select>
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
                            <option value="simple" ${f&&!g?"selected":""}>簡易</option>
                            <option value="detailed" ${f&&g?"selected":""}>詳細 (車・同伴者)</option>
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
                            <input type="date" id="ev-deadline-date" value="${$}" class="w-[50%] border p-1.5 rounded text-xs px-1" onchange="this.blur()">
                            <select id="ev-deadline-time-h" class="w-[25%] border py-1.5 px-1 rounded text-xs bg-white">${v(w)}</select>
                            <span class="font-bold text-gray-500">:</span>
                            <select id="ev-deadline-time-m" class="w-[25%] border py-1.5 px-1 rounded text-xs bg-white">${A(x)}</select>
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
                            ${dt.map(C=>`<option value="${C.name}" ${C.name===l?"selected":""}>${C.name}</option>`).join("")}
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
                        ${fn.map(C=>{const U=C.url?`${C.name} ${C.url}`:C.name;return`<option value="${U}" ${c===U?"selected":""}>${C.name}${C.url?" (URLあり)":""}</option>`}).join("")}
                    </select>
                    
                    <!-- Direct Input & Inline Master Register container -->
                    <div id="ev-location-custom-container" class="border p-2.5 rounded bg-gray-50 space-y-2 mt-1 ${h?"":"hidden"}">
                        <div class="flex space-x-2">
                            <div class="flex-1">
                                <label class="text-[10px] font-bold text-gray-500">場所名</label>
                                <input type="text" id="ev-location-custom-name" value="${_}" placeholder="例: 〇〇グラウンド" class="w-full border p-1 rounded text-xs bg-white">
                            </div>
                            <div class="flex-1">
                                <label class="text-[10px] font-bold text-gray-500">URL (Google Map 等、任意)</label>
                                <input type="text" id="ev-location-custom-url" value="${I}" placeholder="https://..." class="w-full border p-1 rounded text-xs bg-white">
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
    </div>`;document.getElementById("attendance-modals").innerHTML=R,gn(),n||wa();const L=document.getElementById("ev-group-all"),T=document.querySelectorAll('input[name="ev-group-cb"]');L.addEventListener("change",function(){this.checked&&T.forEach(C=>C.checked=!1)}),T.forEach(C=>{C.addEventListener("change",function(){this.checked&&(L.checked=!1)})})}async function Wo(e=null){var A,P,N,D,F,R;const t=document.getElementById("ev-title").value.trim(),n=document.querySelectorAll('#ev-dates-container input[type="date"]'),a=Array.from(n).map(L=>L.value).filter(Boolean);if(!t)return alert("イベント名は必須です");if(a.length===0)return alert("日付を1つ以上指定してください");const s=document.getElementById("ev-time-h").value,r=document.getElementById("ev-time-m").value;let o="";(s||r)&&(o=`${s||"00"}:${r||"00"}`);const i=document.getElementById("ev-end-time-h").value,d=document.getElementById("ev-end-time-m").value;let l="";(i||d)&&(l=`${i||"00"}:${d||"00"}`);const c=document.getElementById("ev-all-day").checked,u=document.getElementById("ev-category").value,f=document.getElementById("ev-description").value,g=document.getElementById("ev-location-select");let y="";if(g)if(g.value==="custom"){const L=((A=document.getElementById("ev-location-custom-name"))==null?void 0:A.value.trim())||"",T=((P=document.getElementById("ev-location-custom-url"))==null?void 0:P.value.trim())||"";y=T?`${L} ${T}`:L}else y=g.value;const b=document.getElementById("ev-attendance-type").value,p=b!=="none",m=b==="detailed",h=((N=document.getElementById("ev-deadline-custom-cb"))==null?void 0:N.checked)||!1,_=(D=document.getElementById("ev-deadline-date"))==null?void 0:D.value,I=(F=document.getElementById("ev-deadline-time-h"))==null?void 0:F.value,k=(R=document.getElementById("ev-deadline-time-m"))==null?void 0:R.value,S=document.getElementById("ev-group-all").checked;let $=[];S||document.querySelectorAll('input[name="ev-group-cb"]:checked').forEach(L=>$.push(L.value));const E=$.length>0?$[0]:null,w=L=>new Promise(T=>setTimeout(T,L)),x=3;let v=0;for(;v<x;){v++,v>1?(W(`通信リトライ中 (${v-1}/${x-1}回目)...`),await w(1500)):W("イベント保存中...");try{if(e){const L=a[0],T=`${L}T${o||"00:00"}:00`;let C=null;l&&(C=`${L}T${l}:00`);let U=null;p&&(h?_&&I&&k&&(U=`${_}T${I}:${k}:00`):U=Zt(L));const ee={title:t,category:u,description:f,location:y,start_time:T,end_time:C,is_all_day:c,requires_attendance:p,require_detailed_attendance:m,attendance_deadline:U,target_group_id:E,target_group_ids:$.length>0?$:null},{error:z}=await B.from("events").update(ee).eq("id",e);if(z)throw z;await fe("UPDATE_EVENT",`イベント「${t}」を更新しました`)}else{const L=a.map(C=>{const U=`${C}T${o||"00:00"}:00`;let ee=null;l&&(ee=`${C}T${l}:00`);let z=null;return p&&(h?_&&I&&k&&(z=`${_}T${I}:${k}:00`):z=Zt(C)),{title:t,category:u,description:f,location:y,start_time:U,end_time:ee,is_all_day:c,requires_attendance:p,require_detailed_attendance:m,attendance_deadline:z,target_group_id:E,target_group_ids:$.length>0?$:null,created_by:J==null?void 0:J.email}}),{error:T}=await B.from("events").insert(L);if(T)throw T;await fe("CREATE_EVENT",`イベント「${t}」を${L.length}件作成しました`)}await Fn(),yt(),document.getElementById("list-container").classList.contains("hidden")||sn(),!e&&typeof window.att_clearDateSelection=="function"&&window.att_clearDateSelection(),window.att_closeModal();break}catch(L){console.error(`Save Event Attempt ${v} Error:`,L);const T=L.message==="Load failed"||L.message==="Failed to fetch"||!L.code;if(v<x&&T)continue;{let C=L.message||String(L);L.details&&(C+=`
Details: `+L.details),L.hint&&(C+=`
Hint: `+L.hint),L.code&&(C+=`
Code: `+L.code),alert("保存エラー: "+C+`
（ネットワーク接続をご確認のうえ、再度お試しください）`);break}}}G()}async function Jo(e){if(confirm("このイベントを削除しますか？")){W("イベント削除中...");try{await B.from("events").delete().eq("id",e),await fe("DELETE_EVENT",`イベント(ID:${e})を削除しました`),await Fn(),yt(),sn(),window.att_closeModal()}catch(t){console.error(t)}finally{G()}}}function Qr(e,t,n=!1){const a=t.ids.length===0||Js.some(l=>t.ids.includes(l.group_id)),s=pn.find(l=>l.email===J.email),r=s?s.can_use_attendance!==!1:!0,o=[];r&&o.push({email:J.email,name:"自分 ( "+((J==null?void 0:J.name)||J.email.split("@")[0])+" )",canAttend:a}),$s.forEach(l=>{const c=pn.find(u=>u.email===l);if(c&&c.can_use_attendance!==!1){const u=t.ids.length===0||Ot.some(f=>t.ids.includes(f.group_id)&&f.user_email===l);o.push({email:l,name:c.name||l.split("@")[0],canAttend:u})}});let i=!1;return{formsHtml:o.map((l,c)=>{if(!l.canAttend)return`<div class="p-3 bg-gray-50 border rounded mb-2">
                <h4 class="font-bold text-gray-700 mb-1">${l.name}</h4>
                <p class="text-xs text-red-500">※対象グループに所属していないため入力できません</p>
            </div>`;i=!0;const u=ze.find(b=>b.event_id===e.id&&b.user_email===l.email)||{};let f=u.status||"未回答";f==="未定"&&(f="保留");let g="否",y=u.comment||"";return y.startsWith("[荷物車:可]")?(g="可",y=y.substring(8)):y.startsWith("[荷物車:否]")&&(g="否",y=y.substring(8)),`
        <div class="p-3 bg-blue-50 border border-blue-100 rounded mb-3" data-target-email="${l.email}">
            <h4 class="font-bold text-blue-800 mb-2 border-b border-blue-200 pb-1">${l.name}</h4>
            <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">ステータス*</label>
                <select id="att-status-${c}" class="w-full border p-1.5 rounded text-sm font-bold" ${n?"disabled":""}>
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
                <textarea id="att-comment-${c}" class="w-full border p-1.5 rounded text-sm" rows="1">${y}</textarea>
            </div>
        </div>`}).join(""),hasAnyForm:i}}window.att_openEventDetail=window.openEventDetailModal=function(e,t="basic"){const n=Tt.find(R=>R.id===e);if(!n)return;const a=ra(n);a.name,a.color;const s=dt.find(R=>R.name===n.category),r=(s==null?void 0:s.color)||"#bfdbfe";let o="日時未定";n.is_all_day&&n.start_time?o=n.start_time.substring(0,10)+" (終日)":n.start_time&&(o=n.start_time.substring(0,16).replace("T"," "),n.end_time&&(o+=" 〜 "+n.end_time.substring(11,16)));const i=ts.find(R=>R.event_id===n.id)||{};let d=i&&i.status?i.status:"未回答";d==="未定"&&(d="保留");const l=n.attendance_deadline?new Date>new Date(n.attendance_deadline):!1;let c=n.attendance_deadline?n.attendance_deadline.replace("T"," ").substring(0,16):"設定なし";a.ids.length===0||Js.some(R=>a.ids.includes(R.group_id));let u=[];if(a.ids.length===0)u=pn.filter(R=>R.can_use_attendance!==!1);else{const R=Ot.filter(C=>a.ids.includes(C.group_id)).map(C=>C.user_email),T=ze.filter(C=>C.event_id===n.id).map(C=>C.user_email);u=pn.filter(C=>C.can_use_attendance!==!1&&(R.includes(C.email)||T.includes(C.email)))}window.att_statusViewType||(window.att_statusViewType="group"),window.att_statusFilter||(window.att_statusFilter="all");const f=window.att_statusViewType==="group";let g=0,y=0,b=0;u.forEach(R=>{const L=ze.find(T=>T.event_id===n.id&&T.user_email===R.email);L&&L.status==="出席"?g++:L&&L.status==="欠席"?y++:b++});const p=[];f?bt.forEach(R=>{const L=Ot.filter(K=>K.group_id===R.id).map(K=>K.user_email),T=u.filter(K=>L.includes(K.email));let C=0,U=0,ee=0,z=!1;T.forEach(K=>{const H=ze.find(Z=>Z.event_id===n.id&&Z.user_email===K.email);H&&H.status&&H.status!=="未回答"?(z=!0,H.status==="出席"?C++:H.status==="欠席"?U++:ee++):ee++}),z&&p.push({name:R.name,attending:C,absent:U,pending:ee})}):on.forEach(R=>{const L=u.filter(z=>z.attribute_id===R.id);let T=0,C=0,U=0,ee=!1;L.forEach(z=>{const K=ze.find(H=>H.event_id===n.id&&H.user_email===z.email);K&&K.status&&K.status!=="未回答"?(ee=!0,K.status==="出席"?T++:K.status==="欠席"?C++:U++):U++}),ee&&p.push({name:R.name,attending:T,absent:C,pending:U})});const m=`
        <div class="flex items-center space-x-1 mb-4 p-1 bg-gray-100/80 rounded-lg w-fit shrink-0">
            <button onclick="window.att_setStatusViewType('${n.id}', 'group')" class="px-4 py-1.5 rounded-md text-xs font-bold transition shadow-sm ${f?"bg-green-600 text-white":"text-gray-600 hover:text-gray-900"}">📂 グループ別</button>
            <button onclick="window.att_setStatusViewType('${n.id}', 'attribute')" class="px-4 py-1.5 rounded-md text-xs font-bold transition shadow-sm ${f?"text-gray-600 hover:text-gray-900":"bg-green-600 text-white"}">👥 属性別</button>
        </div>
    `,h=f?"※出欠の入力があるグループのみ表示しています。":"※出欠の入力がある属性のみ表示しています。";let _=`
        <tr class="bg-gray-50/50 font-bold border-b border-gray-200">
            <td class="px-4 py-2.5 text-gray-800">全体</td>
            <td class="px-4 py-2.5 text-center text-green-600 font-extrabold">${g}</td>
            <td class="px-4 py-2.5 text-center text-red-500 font-extrabold">${y}</td>
            <td class="px-4 py-2.5 text-center text-gray-600">${b}</td>
        </tr>
    `;p.length===0?_+=`
            <tr>
                <td colspan="4" class="px-4 py-6 text-center text-gray-400 text-xs">出欠の入力がある${f?"グループ":"属性"}はありません。</td>
            </tr>
        `:_+=p.map(R=>`
            <tr class="border-b border-gray-100 hover:bg-gray-50/30 transition">
                <td class="px-4 py-2.5 text-gray-700 font-semibold text-xs">${R.name}</td>
                <td class="px-4 py-2.5 text-center text-green-600 font-bold text-xs">${R.attending}</td>
                <td class="px-4 py-2.5 text-center text-red-500 font-bold text-xs">${R.absent}</td>
                <td class="px-4 py-2.5 text-center text-gray-500 text-xs">${R.pending}</td>
            </tr>
        `).join("");const I=`
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
                    ${_}
                </tbody>
            </table>
        </div>
        <p class="text-[10px] text-gray-400 font-semibold mb-4">${h}</p>
    `,k=u.filter(R=>{const L=ze.find(C=>C.event_id===n.id&&C.user_email===R.email),T=(L==null?void 0:L.status)||"未回答";return window.att_statusFilter==="all"?!0:window.att_statusFilter==="answered"?T==="出席"||T==="欠席"||T==="保留"||T==="未定":window.att_statusFilter==="attending"?T==="出席":window.att_statusFilter==="absent"?T==="欠席":window.att_statusFilter==="pending"?T==="保留"||T==="未定":window.att_statusFilter==="unanswered"?T==="未回答"||!T:!0});window.att_statusSortKey||(window.att_statusSortKey="default"),window.att_statusSortOrder||(window.att_statusSortOrder="asc");const S=window.att_statusSortKey,$=window.att_statusSortOrder;S!=="default"&&k.sort((R,L)=>{var U,ee;let T,C;if(S==="name")T=R.name||R.email.split("@")[0],C=L.name||L.email.split("@")[0];else if(S==="group")if(f){const z=Ot.filter(H=>H.user_email===R.email).map(H=>H.group_id);T=bt.filter(H=>z.includes(H.id)).map(H=>H.name).join(", ")||"-";const K=Ot.filter(H=>H.user_email===L.email).map(H=>H.group_id);C=bt.filter(H=>K.includes(H.id)).map(H=>H.name).join(", ")||"-"}else T=((U=on.find(z=>z.id===R.attribute_id))==null?void 0:U.name)||"-",C=((ee=on.find(z=>z.id===L.attribute_id))==null?void 0:ee.name)||"-";else if(S==="status"){const z=K=>{const H=ze.find(q=>q.event_id===n.id&&q.user_email===K.email),Z=(H==null?void 0:H.status)||"未回答";return Z==="出席"?1:Z==="保留"||Z==="未定"?2:Z==="未回答"?3:Z==="欠席"?4:5};T=z(R),C=z(L)}else if(S==="comment"){const z=K=>{const H=ze.find(oe=>oe.event_id===n.id&&oe.user_email===K.email);if(!H||!H.status||H.status==="未回答")return"";let Z=H.comment||"",q="否";Z.startsWith("[荷物車:可]")?(q="可",Z=Z.substring(8)):Z.startsWith("[荷物車:否]")&&(q="否",Z=Z.substring(8));let re=[];return n.require_detailed_attendance&&(H.accompanying_persons&&re.push(`同伴: ${H.accompanying_persons}`),H.car_capacity&&H.car_capacity>0&&(re.push(`車出: 可[${H.car_capacity}人]`),re.push(`荷物車: ${q}`))),Z.trim()&&re.push(`メモ: ${Z.trim()}`),re.join(", ")};T=z(R),C=z(L)}else if(S==="updated_at"){const z=ze.find(H=>H.event_id===n.id&&H.user_email===R.email),K=ze.find(H=>H.event_id===n.id&&H.user_email===L.email);T=z?new Date(z.updated_at).getTime():0,C=K?new Date(K.updated_at).getTime():0}return T<C?$==="asc"?-1:1:T>C?$==="asc"?1:-1:0});const w=[{type:"all",label:"すべて"},{type:"answered",label:"回答済"},{type:"attending",label:"出席"},{type:"absent",label:"欠席"},{type:"pending",label:"保留"},{type:"unanswered",label:"未回答"}].map(R=>{const L=window.att_statusFilter===R.type;return`<button onclick="window.att_setStatusFilter('${n.id}', '${R.type}')" class="px-2.5 py-1 rounded-full text-xs font-bold transition ${L?"bg-blue-600 text-white shadow-sm":"bg-gray-100 text-gray-600 hover:bg-gray-200"}">${R.label}</button>`}).join(" ");let x="";k.length===0?x=`
            <tr>
                <td colspan="5" class="px-4 py-6 text-center text-gray-400 text-xs">該当するメンバーはいません。</td>
            </tr>
        `:x=k.map(R=>{var re;const L=R.name||R.email.split("@")[0];let T="-";if(f){const oe=Ot.filter(ge=>ge.user_email===R.email).map(ge=>ge.group_id);T=bt.filter(ge=>oe.includes(ge.id)).map(ge=>ge.name).join(", ")||"-"}else T=((re=on.find(oe=>oe.id===R.attribute_id))==null?void 0:re.name)||"-";const C=ze.find(oe=>oe.event_id===n.id&&oe.user_email===R.email);let U=(C==null?void 0:C.status)||"未回答";U==="未定"&&(U="保留");let ee="";U==="出席"?ee='<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-green-100 text-green-800 border border-green-200">🟢 参加</span>':U==="欠席"?ee='<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-red-100 text-red-800 border border-red-200">❌ 不参加</span>':U==="保留"?ee='<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-yellow-100 text-yellow-800 border border-yellow-200">❓ 未定/その他</span>':ee='<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-gray-100 text-gray-500 border border-gray-200">❓ 未定/その他</span>';let z=(C==null?void 0:C.comment)||"",K="否";z.startsWith("[荷物車:可]")?(K="可",z=z.substring(8)):z.startsWith("[荷物車:否]")&&(K="否",z=z.substring(8));let H=[];C&&C.status&&C.status!=="未回答"&&(n.require_detailed_attendance&&(C.accompanying_persons&&H.push(`同伴: ${C.accompanying_persons}`),C.car_capacity&&C.car_capacity>0&&(H.push(`車出: 可[${C.car_capacity}人]`),H.push(`荷物車: ${K}`))),z.trim()&&H.push(`メモ: ${z.trim()}`));const Z=H.length>0?H.join(", "):"-",q=C?Jr(C.updated_at):"-";return`
                <tr class="hover:bg-gray-50/50 border-b border-gray-100 transition">
                    <td class="px-4 py-2 font-bold text-gray-800 text-[11px]">${L}</td>
                    <td class="px-4 py-2 text-gray-500 text-[11px] font-semibold">${T}</td>
                    <td class="px-4 py-2">${ee}</td>
                    <td class="px-4 py-2 text-gray-600 text-[11px] max-w-[180px] truncate" title="${Z}">${Z}</td>
                    <td class="px-4 py-2 text-gray-400 text-[11px] font-semibold">${q}</td>
                </tr>
            `}).join("");const v=R=>S!==R?'<span class="text-gray-300 ml-1">⇅</span>':$==="asc"?'<span class="text-blue-600 ml-1">▲</span>':'<span class="text-blue-600 ml-1">▼</span>',A=`
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
                            <th onclick="window.att_toggleSort('${n.id}', 'name')" class="px-4 py-2 font-bold text-gray-600 text-left text-xs cursor-pointer hover:bg-gray-100 transition">名前 ${v("name")}</th>
                            <th onclick="window.att_toggleSort('${n.id}', 'group')" class="px-4 py-2 font-bold text-gray-600 text-left text-xs cursor-pointer hover:bg-gray-100 transition">${f?"グループ":"属性"} ${v("group")}</th>
                            <th onclick="window.att_toggleSort('${n.id}', 'status')" class="px-4 py-2 font-bold text-gray-600 text-left text-xs cursor-pointer hover:bg-gray-100 transition">出欠 ${v("status")}</th>
                            <th onclick="window.att_toggleSort('${n.id}', 'comment')" class="px-4 py-2 font-bold text-gray-600 text-left text-xs cursor-pointer hover:bg-gray-100 transition">出欠メモ ${v("comment")}</th>
                            <th onclick="window.att_toggleSort('${n.id}', 'updated_at')" class="px-4 py-2 font-bold text-gray-600 text-left text-xs cursor-pointer hover:bg-gray-100 transition">更新日時 ${v("updated_at")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${x}
                    </tbody>
                </table>
            </div>
        </div>
    `,P=t==="basic"?"border-b-2 border-blue-500 text-blue-600 font-bold":"text-gray-500 hover:text-gray-700",N=t==="attendance"?"border-b-2 border-blue-500 text-blue-600 font-bold":"text-gray-500 hover:text-gray-700",D=t==="status"?"border-b-2 border-blue-500 text-blue-600 font-bold":"text-gray-500 hover:text-gray-700",F=`
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
                    <button onclick="window.att_openEventDetail('${n.id}', 'attendance')" class="flex-1 py-2 text-sm font-medium ${N}">出欠登録</button>
                    <button onclick="window.att_openEventDetail('${n.id}', 'status')" class="flex-1 py-2 text-sm font-medium ${D}">出欠状況</button>
                `:""}
            </div>

            <div class="p-4 overflow-y-auto">
                ${t==="basic"?`
                    <div class="text-sm text-gray-600 mb-4 space-y-1">
                        <p><strong>日時:</strong> ${o}</p>
                        <p><strong>場所:</strong> ${Zr(n.location)}</p>
                        <p class="flex items-center gap-1 mt-1"><strong>カテゴリ:</strong> <span class="px-2 py-0.5 rounded text-xs text-gray-800 shadow-sm" style="background-color: ${r}">${n.category||"未設定"}</span></p>
                        <p class="flex items-center gap-1 mt-1"><strong>対象:</strong> ${Wr(a)}</p>
                        <p class="mt-2 whitespace-pre-wrap border p-2 bg-gray-50 rounded min-h-[60px] text-gray-800">${n.description||"説明なし"}</p>
                    </div>
                `:t==="attendance"?`
                    <div class="space-y-4">
                        <div class="text-sm border-b pb-2 mb-2">
                            現在のステータス: <span class="font-bold ${d==="出席"?"text-green-600":d==="欠席"?"text-red-500":"text-gray-800"}">${d}</span>
                            <br><span class="text-xs text-gray-500">回答期限: ${c}</span>
                            ${l?'<span class="ml-2 text-red-500 font-bold text-xs bg-red-100 px-2 py-0.5 rounded shadow-sm">期限切れ</span>':""}
                        </div>
                        ${(()=>{const{formsHtml:R,hasAnyForm:L}=Qr(n,a,l);return R+(L?`
                                <div class="mt-4 text-right">
                                    <button onclick="window.att_saveAttendance('${n.id}')" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-bold shadow">出欠を一括保存</button>
                                </div>
                            `:"")})()}
                    </div>
                `:`
                    <div class="space-y-4">
                        ${m}
                        ${I}
                        ${A}
                    </div>
                `}
            </div>
        </div>
    </div>`;document.getElementById("attendance-modals").innerHTML=F};function Yo(e){const t=Tt.find(i=>i.id===e);if(!t)return;const n=ra(t),a=t.attendance_deadline?new Date>new Date(t.attendance_deadline):!1,{formsHtml:s,hasAnyForm:r}=Qr(t,n,a),o=`
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
    </div>`;document.getElementById("attendance-modals").innerHTML=o}async function Ko(e){const t=document.querySelectorAll("[data-target-email]");if(t.length===0)return window.att_closeModal();const n=Tt.find(s=>s.id===e);if(!n)return;const a=[];t.forEach(s=>{const r=s.getAttribute("data-target-email"),o=s.querySelector('select[id^="att-status-"]');if(o){const i=s.querySelector('input[id^="att-acc-"]'),d=s.querySelector('select[id^="att-car-flag-"]'),l=s.querySelector('input[id^="att-car-cap-"]'),c=s.querySelector('select[id^="att-luggage-flag-"]'),u=s.querySelector('textarea[id^="att-comment-"]'),f=d?d.value:"否",g=f==="可"&&l&&parseInt(l.value)||0;let y=u?u.value.trim():"";n.require_detailed_attendance&&f==="可"&&(y=`[荷物車:${c?c.value:"否"}]`+y),a.push({event_id:e,user_email:r,status:o.value,accompanying_persons:i?i.value:"",car_capacity:g,separate_action:null,comment:y,updated_at:new Date().toISOString()})}}),W("出欠保存中...");try{const{error:s}=await B.from("attendances").upsert(a,{onConflict:"event_id, user_email"});if(s)throw s;await fe("UPDATE_ATTENDANCE",`イベント(ID:${e})の出欠を ${a.length}件更新しました`),await Fn(),yt(),sn(),window.att_openEventDetail(e,"status")}catch(s){console.error("Save Attendance Error:",s),s.message==="Load failed"||s.message==="Failed to fetch"?alert("出欠登録エラー: 通信に失敗しました。ネットワーク接続やデータベースの状態を確認してください。"):alert("出欠登録エラー: "+s.message)}finally{G()}}function Qo(){const t=[["タイトル","日付","開始時刻","終了時刻","終日","カテゴリ","対象グループ","場所","出欠管理","詳細出欠","説明","回答期限"].join(",")];Tt.forEach(o=>{const i=o.start_time?o.start_time.split("T")[0]:"",d=o.start_time&&!o.is_all_day?o.start_time.split("T")[1].substring(0,5):"",l=o.end_time&&!o.is_all_day?o.end_time.split("T")[1].substring(0,5):"",u=ra(o).name,f=g=>g==null?'""':`"${String(g).replace(/"/g,'""')}"`;t.push([f(o.title),f(i),f(d),f(l),o.is_all_day?"TRUE":"FALSE",f(o.category),f(u),f(o.location),o.requires_attendance?"TRUE":"FALSE",o.require_detailed_attendance?"TRUE":"FALSE",f(o.description),f(o.attendance_deadline)].join(","))});const n=new Uint8Array([239,187,191]),a=new Blob([n,t.join(`
`)],{type:"text/csv;charset=utf-8;"}),s=URL.createObjectURL(a),r=document.createElement("a");r.href=s,r.download=`events_${new Date().toISOString().split("T")[0]}.csv`,r.click(),URL.revokeObjectURL(s)}function Zo(e){const t=[];let n=[],a="",s=!1;for(let r=0;r<e.length;r++){const o=e[r];s?o==='"'?r+1<e.length&&e[r+1]==='"'?(a+='"',r++):s=!1:a+=o:o==='"'?s=!0:o===","?(n.push(a),a=""):o===`
`||o==="\r"?(n.push(a),t.push(n),n=[],a="",o==="\r"&&r+1<e.length&&e[r+1]===`
`&&r++):a+=o}return(a||n.length>0)&&(n.push(a),t.push(n)),t}window.att_importCsv=async function(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=async a=>{const s=a.target.result,r=Zo(s);if(r.length<2)return alert("インポートするデータがありません。");const o=[];for(let c=1;c<r.length;c++){const u=r[c];if(u.length<2||!u[0]||!u[1])continue;const f=u[0],g=u[1],y=u[2],b=u[3],p=(u[4]||"").toUpperCase()==="TRUE",m=u[5],h=u[6]||"",_=u[7],I=(u[8]||"").toUpperCase()==="TRUE"||(u[8]||"").trim()==="",k=(u[9]||"").toUpperCase()==="TRUE",S=u[10],$=u[11]||null,E=`${g}T${y||"00:00"}:00`;let w=null;b&&(w=`${g}T${b}:00`);const x=h.split(",").map(N=>N.trim()),v=bt.filter(N=>x.includes(N.name)),A=v.length>0?v.map(N=>N.id):null,P=A?A[0]:null;o.push({title:f,category:m||null,description:S||null,location:_||null,start_time:E,end_time:w,is_all_day:p,requires_attendance:I,require_detailed_attendance:k,attendance_deadline:$,target_group_id:P,target_group_ids:A,created_by:J==null?void 0:J.email})}if(o.length===0)return alert(`インポート可能なイベントがありませんでした。
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
        </div>`,l=document.createElement("div");l.innerHTML=d,document.body.appendChild(l.firstElementChild),document.getElementById("btn-cancel-import").onclick=()=>{document.getElementById("csv-import-confirm-modal").remove(),document.getElementById("file-import-csv").value=""},document.getElementById("btn-exec-import").onclick=async()=>{document.getElementById("csv-import-confirm-modal").remove(),W("インポート実行中...");try{const{error:c}=await B.from("events").insert(o);if(c)throw c;await fe("IMPORT_EVENTS",`イベントデータを${o.length}件インポートしました`),alert(`${o.length}件のインポートが完了しました。`),await Fn(),yt(),sn()}catch(c){alert(`インポート中にエラーが発生しました:
`+c.message)}finally{G(),document.getElementById("file-import-csv").value=""}}},n.readAsText(t)};function Zt(e){if(!e)return null;const t=new Date(e+"T00:00:00");if(isNaN(t.getTime()))return null;const n=new Date(t.getTime()-3*24*60*60*1e3),a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),r=String(n.getDate()).padStart(2,"0");return`${a}-${s}-${r}T12:00:00`}function wr(e){const t=Zt(e);if(!t)return"";const n=new Date(t),a=n.getFullYear(),s=n.getMonth()+1,r=n.getDate(),o=Ys[n.getDay()];return`${a}/${s}/${r}(${o}) 12:00`}function Zr(e){if(!e)return"未定";let t=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");const n=/(https?:\/\/[^\s\<\>\"]+)/g;return t.replace(n,a=>`<a href="${a}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="text-blue-600 hover:underline inline-flex items-center space-x-0.5 ml-1 font-semibold">
            <span>地図/リンク</span>
            <svg class="w-3.5 h-3.5 inline ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
        </a>`)}function Xr(){const e=document.getElementById("multiselect-bar"),t=document.getElementById("multiselect-count");!e||!t||(window.att_multiSelectMode&&window.att_selectedDates.size>0?(t.textContent=window.att_selectedDates.size,e.classList.remove("hidden")):e.classList.add("hidden"))}function Xo(){window.att_selectedDates.clear(),yt(),Xr()}function ei(){if(window.att_selectedDates.size===0){alert("日程が選択されていません。");return}const e=Array.from(window.att_selectedDates).sort();va("",null,!1,e)}function wa(){const e=document.getElementById("ev-dates-container");if(e){if(e.innerHTML="",$e.length===0){e.innerHTML='<div class="text-xs text-gray-500 py-1.5 text-center">日付が選択されていません</div>';return}$e.forEach((t,n)=>{const a=document.createElement("div");a.className="flex items-center space-x-2 bg-white p-1.5 rounded border shadow-sm";const s=document.createElement("input");if(s.type="date",s.value=t,s.className="border rounded text-xs px-2 py-1 flex-1 min-w-0 font-medium focus:ring-1 focus:ring-blue-500 focus:border-blue-500",s.onchange=r=>{$e[n]=r.target.value,gn()},a.appendChild(s),!window.att_isEditingModal){const r=document.createElement("button");r.type="button",r.className="text-red-500 hover:text-red-700 font-bold p-1 transition rounded hover:bg-red-50",r.innerHTML=`
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            `,r.onclick=()=>{$e.splice(n,1),wa(),gn()},a.appendChild(r)}e.appendChild(a)})}}function ti(){let e=new Date().toISOString().split("T")[0];if($e.length>0){const t=new Date($e[$e.length-1]);isNaN(t.getTime())||(t.setDate(t.getDate()+1),e=t.toISOString().split("T")[0])}$e.push(e),wa(),gn()}function ni(e){$e.splice(e,1),wa(),gn()}function gn(){const e=document.getElementById("ev-deadline-auto-preview");if(e){if($e.length===0){e.innerHTML='<span class="text-red-500 font-semibold text-xs">日付を入力してください</span>';return}if($e.length===1)if(Zt($e[0])){const n=wr($e[0]);e.innerHTML=`<span class="text-blue-600 font-bold">自動算出:</span> ${n}`}else e.innerHTML='<span class="text-red-500 font-semibold text-xs">日付が不正です</span>';else{const t=wr($e[0]);e.innerHTML=`<span class="text-blue-600 font-bold">自動算出:</span> 各日程の3日前の12:00<br><span class="text-[10px] text-gray-400 font-semibold">(例: ${$e[0]}分 → ${t})</span>`}}}function ai(e){const t=document.getElementById("ev-location-custom-container");t&&(e==="custom"?t.classList.remove("hidden"):t.classList.add("hidden"))}async function si(){const e=document.getElementById("ev-location-custom-name"),t=document.getElementById("ev-location-custom-url");if(!e)return;const n=e.value.trim(),a=t?t.value.trim():"";if(!n)return alert("場所名は必須です");W("場所マスタに登録中...");try{const{error:s}=await B.from("event_locations").insert({name:n,url:a||null});if(s)throw s;const{data:r}=await B.from("event_locations").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});r&&(fn=r);const o=document.getElementById("ev-location-select");if(o){const i=a?`${n} ${a}`:n;o.innerHTML=`
                <option value="custom">-- 直接入力 / 新規マスタ追加 --</option>
                ${fn.map(l=>{const c=l.url?`${l.name} ${l.url}`:l.name;return`<option value="${c}" ${c===i?"selected":""}>${l.name}${l.url?" (URLあり)":""}</option>`}).join("")}
            `;const d=document.getElementById("ev-location-custom-container");d&&d.classList.add("hidden"),e.value="",t&&(t.value="")}alert("場所マスタに登録しました")}catch(s){console.error("Failed to register location:",s),alert("マスタ登録エラー: "+(s.message||String(s)))}finally{G()}}window.att_closeModal=()=>{const e=document.getElementById("attendance-modals");e&&(e.innerHTML="")};window.att_saveEvent=Wo;window.att_deleteEvent=Jo;window.att_openEventDetail=openEventDetailModal;window.att_openAttendanceForm=Yo;window.att_saveAttendance=Ko;window.att_exportCsv=Qo;window.att_statusViewType=window.att_statusViewType||"group";window.att_statusFilter=window.att_statusFilter||"all";window.att_setStatusViewType=(e,t)=>{window.att_statusViewType=t,window.att_openEventDetail(e,"status")};window.att_setStatusFilter=(e,t)=>{window.att_statusFilter=t,window.att_openEventDetail(e,"status")};window.att_copyEvent=function(e){const t=Tt.find(a=>a.id===e);if(!t)return;const n=window.att_selectedDates&&window.att_selectedDates.size>0?Array.from(window.att_selectedDates).sort():null;va("",t,!1,n)};window.att_editEvent=function(e){const t=Tt.find(n=>n.id===e);t&&va("",t,!0)};window.att_addDateRow=ti;window.att_removeDateRow=ni;window.att_renderDateRows=wa;window.att_updateDefaultDeadlineLabel=gn;window.att_openBulkAddEvent=ei;window.att_clearDateSelection=Xo;window.att_onLocationSelectChange=ai;window.att_registerNewLocation=si;window.att_updateMultiselectBar=Xr;window.att_onSingleDateChange=e=>{$e=[e],gn();const t=Zt(e);if(t){const n=t.split("T")[0],a=t.split("T")[1].substring(0,5),s=a.split(":")[0],r=a.split(":")[1],o=document.getElementById("ev-deadline-date"),i=document.getElementById("ev-deadline-time-h"),d=document.getElementById("ev-deadline-time-m");o&&(o.value=n),i&&(i.value=s),d&&(d.value=r)}};window.att_toggleDeadlineCustom=e=>{const t=document.getElementById("ev-deadline-custom-inputs"),n=document.getElementById("ev-deadline-auto-preview");if(!(!t||!n))if(e){t.classList.remove("hidden"),n.classList.add("hidden");const a=$e[0],s=Zt(a);if(s){const r=s.split("T")[0],o=s.split("T")[1].substring(0,5),i=o.split(":")[0],d=o.split(":")[1],l=document.getElementById("ev-deadline-date"),c=document.getElementById("ev-deadline-time-h"),u=document.getElementById("ev-deadline-time-m");l&&!l.value&&(l.value=r),c&&!c.value&&(c.value=i),u&&!u.value&&(u.value=d)}}else t.classList.add("hidden"),n.classList.remove("hidden"),gn()};function Ba(e){const t=e.getFullYear(),n=e.getMonth()+1,a=e.getDate();if(n===1&&a===1||n===2&&a===11||n===2&&a===23||n===4&&a===29||n===5&&a===3||n===5&&a===4||n===5&&a===5||n===8&&a===11||n===11&&a===3||n===11&&a===23)return!0;if(e.getDay()===1){const r=Math.floor((a-1)/7)+1;if(n===1&&r===2||n===7&&r===3||n===9&&r===3||n===10&&r===2)return!0}if(n===3){const r=Math.floor(20.8431+.242194*(t-1980)-Math.floor((t-1980)/4));if(a===r)return!0}if(n===9){const r=Math.floor(23.2488+.242194*(t-1980)-Math.floor((t-1980)/4));if(a===r)return!0}return!1}function ri(e){if(Ba(e))return!0;const t=e.getFullYear(),n=e.getMonth(),a=e.getDate(),s=e.getDay();if(s===1){const i=new Date(t,n,a-1);if(Ba(i))return!0}const r=new Date(t,n,a-1),o=new Date(t,n,a+1);return!!(Ba(r)&&Ba(o)&&s!==0)}async function oi(){W("予定情報をエクスポート中...");try{const{data:e}=await B.from("events").select("*").order("start_time",{ascending:!0}),{data:t}=await B.from("groups").select("*"),n=new Map(t.map(d=>[d.id,d.name])),s=[["ID","タイトル","カテゴリ","場所","開始日時","終了日時","説明","終日(1/0)","出欠回答要(1/0)","詳細回答要(1/0)","回答期限","対象グループ名","削除(1/0)"]];e.forEach(d=>{let l="";d.target_group_ids&&d.target_group_ids.length>0?l=d.target_group_ids.map(g=>n.get(g)||"").filter(g=>g).join(", "):d.target_group_id&&(l=n.get(d.target_group_id)||"");const c=d.start_time?d.start_time.replace("T"," ").substring(0,16):"",u=d.end_time?d.end_time.replace("T"," ").substring(0,16):"",f=d.attendance_deadline?d.attendance_deadline.replace("T"," ").substring(0,16):"";s.push([d.id,d.title||"",d.category||"",d.location||"",c,u,d.description||"",d.is_all_day?"1":"0",d.requires_attendance?"1":"0",d.require_detailed_attendance?"1":"0",f,l,"0"])});const r=s.map(d=>d.map(window.escapeCSV).join(",")).join(`
`),o=new Blob([new Uint8Array([239,187,191]),r],{type:"text/csv;charset=utf-8;"}),i=document.createElement("a");i.href=URL.createObjectURL(o),i.download=`schedule_${new Date().toISOString().split("T")[0]}.csv`,i.click()}catch(e){console.error(e),alert("予定のエクスポートに失敗しました: "+e.message)}finally{G()}}async function ii(e){const t=e.target.files[0];if(!t)return;W("CSVファイルを解析中...");const n=new FileReader;n.onload=async a=>{try{const s=a.target.result,r=window.parseCSV(s);if(r.length<2){alert("有効なデータがありません。"),G();return}const o=r[0].map(N=>N.trim()),i=o.indexOf("ID"),d=o.indexOf("タイトル"),l=o.indexOf("カテゴリ"),c=o.indexOf("場所"),u=o.indexOf("開始日時"),f=o.indexOf("終了日時"),g=o.indexOf("説明"),y=o.findIndex(N=>N.includes("終日")),b=o.findIndex(N=>N.includes("出欠回答要")),p=o.findIndex(N=>N.includes("詳細回答要")),m=o.findIndex(N=>N.includes("回答期限")),h=o.findIndex(N=>N.includes("対象グループ名")),_=o.findIndex(N=>N.includes("削除"));if(d===-1||u===-1){alert("「タイトル」および「開始日時」列は必須です。"),G();return}const{data:I}=await B.from("events").select("*"),{data:k}=await B.from("groups").select("*"),S=new Map(k.map(N=>[N.name,N.id])),$=new Map(I.map(N=>[N.id,N])),E=new Map(I.map(N=>[`${N.title}_${N.start_time?N.start_time.substring(0,16).replace("T"," "):""}`,N])),w=[],x=[],v=[],A=N=>{if(!N)return null;let D=N.trim().replace(/\//g,"-").replace(" ","T");return D.length===10?D+="T00:00:00":D.length===16&&(D+=":00"),D};for(let N=1;N<r.length;N++){const D=r[N];if(D.length<2)continue;const F=(D[d]||"").trim(),R=(D[u]||"").trim();if(!F||!R)continue;const L=A(R),T=i!==-1?(D[i]||"").trim():"",C=l!==-1?(D[l]||"").trim():"",U=c!==-1?(D[c]||"").trim():"",ee=f!==-1?A(D[f]):null,z=g!==-1?(D[g]||"").trim():"",K=y!==-1?D[y]==="1"||D[y]==="true":!1,H=b!==-1?!(D[b]==="0"||D[b]==="false"):!0,Z=p!==-1?D[p]==="1"||D[p]==="true":!1,q=m!==-1?A(D[m]):null,re=_!==-1?D[_]==="1"||D[_]==="削除":!1,oe=h!==-1?(D[h]||"").trim():"";let ge=[],Te="";if(oe){const ct=oe.split(",").map(Ue=>Ue.trim()).filter(Ue=>Ue);ge=ct.map(Ue=>S.get(Ue)).filter(Ue=>Ue),Te=ct.join(", ")}const st={id:T,title:F,category:C,location:U,start_time:L,end_time:ee,description:z,is_all_day:K,requires_attendance:H,require_detailed_attendance:Z,attendance_deadline:q,target_group_ids:ge,target_group_name:Te};let ue=null;if(T&&(ue=$.get(T)),!ue){const ct=`${F}_${R.substring(0,16).replace(/\//g,"-")}`;ue=E.get(ct)}if(ue)if(st.id=ue.id,re)v.push(st);else{const ct=ue.title!==F,Ue=ue.category!==C,Ut=ue.location!==U,Mt=ue.description!==z,Et=(ue.start_time?ue.start_time.substring(0,16):"")!==(L?L.substring(0,16):""),_t=(ue.end_time?ue.end_time.substring(0,16):"")!==(ee?ee.substring(0,16):""),xt=ue.is_all_day!==K,Y=ue.requires_attendance!==H,me=ue.require_detailed_attendance!==Z,Ne=(ue.attendance_deadline?ue.attendance_deadline.substring(0,16):"")!==(q?q.substring(0,16):""),je=ue.target_group_ids||(ue.target_group_id?[ue.target_group_id]:[]),It=JSON.stringify([...je].sort())!==JSON.stringify([...ge].sort());(ct||Ue||Ut||Mt||Et||_t||xt||Y||me||Ne||It)&&x.push(st)}else re||w.push(st)}G();let P="";v.length>0&&(P=`⚠️ 警告: ${v.length}件の予定が削除されます。予定を削除すると、その予定に紐づいているメンバー全員の出欠データや配車データも自動的に削除されます。`),window.showCSVConfirmModal("events",w,x,v,"予定CSVインポート確認",P)}catch(s){console.error(s),alert("CSVの解析に失敗しました: "+s.message),G()}},n.readAsText(t)}async function di(){const{add:e,update:t,delete:n}=en;W("予定データを保存中...");try{if(n.length>0){const a=n.map(r=>r.id),{error:s}=await B.from("events").delete().in("id",a);if(s)throw s;await fe("IMPORT_EVENTS_DELETE",`${n.length}件の予定をインポートで削除しました`)}if(e.length>0){const a=e.map(r=>({title:r.title,category:r.category,location:r.location,start_time:r.start_time,end_time:r.end_time,description:r.description,is_all_day:r.is_all_day,requires_attendance:r.requires_attendance,require_detailed_attendance:r.requires_attendance?r.require_detailed_attendance:!1,attendance_deadline:r.attendance_deadline,target_group_ids:r.target_group_ids.length>0?r.target_group_ids:null,created_by:J==null?void 0:J.email})),{error:s}=await B.from("events").insert(a);if(s)throw s;await fe("IMPORT_EVENTS_ADD",`${e.length}件の予定をインポートで追加しました`)}if(t.length>0){for(let a of t){const{error:s}=await B.from("events").update({title:a.title,category:a.category,location:a.location,start_time:a.start_time,end_time:a.end_time,description:a.description,is_all_day:a.is_all_day,requires_attendance:a.requires_attendance,require_detailed_attendance:a.requires_attendance?a.require_detailed_attendance:!1,attendance_deadline:a.attendance_deadline,target_group_ids:a.target_group_ids.length>0?a.target_group_ids:null}).eq("id",a.id);if(s)throw s}await fe("IMPORT_EVENTS_UPDATE",`${t.length}件の予定をインポートで更新しました`)}alert("予定のインポートが完了しました。"),window.closeCSVConfirmModal(),await Fn(),yt(),document.getElementById("list-container").classList.contains("hidden")||sn()}catch(a){console.error(a),alert("予定データの保存に失敗しました: "+a.message)}finally{G()}}window.executeEventsImport=di;function li(){const n=[["ID","タイトル","カテゴリ","場所","開始日時","終了日時","説明","終日(1/0)","出欠回答要(1/0)","詳細回答要(1/0)","回答期限","対象グループ名","削除(1/0)"],["","土曜練習","練習","第一グラウンド","2026-06-20 09:00","2026-06-20 12:00","通常練習を行います。","0","1","1","2026-06-19 18:00","選手・保護者","0"],["","練習試合(イーグルス戦)","試合","イーグルス球場","2026-06-21 13:00","2026-06-21 16:00","遠征試合です。車出しをお願いします。","0","1","1","2026-06-20 12:00","選手・保護者","0"]].map(r=>r.map(window.escapeCSV).join(",")).join(`
`),a=new Blob([new Uint8Array([239,187,191]),n],{type:"text/csv;charset=utf-8;"}),s=document.createElement("a");s.href=URL.createObjectURL(a),s.download="schedule_sample.csv",s.click()}window.att_toggleSort=function(e,t){window.att_statusSortKey===t?window.att_statusSortOrder==="asc"?window.att_statusSortOrder="desc":(window.att_statusSortKey="default",window.att_statusSortOrder="asc"):(window.att_statusSortKey=t,window.att_statusSortOrder="asc"),window.att_openEventDetail(e,"status")};window.att_exportParticipantList=function(e){const t=Tt.find(y=>y.id===e);if(!t)return;const n=ra(t),a=window.att_statusViewType==="group";let s=[];if(n.ids.length===0)s=pn.filter(y=>y.can_use_attendance!==!1);else{const y=Ot.filter(m=>n.ids.includes(m.group_id)).map(m=>m.user_email),p=ze.filter(m=>m.event_id===t.id).map(m=>m.user_email);s=pn.filter(m=>m.can_use_attendance!==!1&&(y.includes(m.email)||p.includes(m.email)))}const r=s.filter(y=>{const b=ze.find(m=>m.event_id===t.id&&m.user_email===y.email),p=(b==null?void 0:b.status)||"未回答";return window.att_statusFilter==="all"?!0:window.att_statusFilter==="answered"?p==="出席"||p==="欠席"||p==="保留"||p==="未定":window.att_statusFilter==="attending"?p==="出席":window.att_statusFilter==="absent"?p==="欠席":window.att_statusFilter==="pending"?p==="保留"||p==="未定":window.att_statusFilter==="unanswered"?p==="未回答"||!p:!0}),o=window.att_statusSortKey||"default",i=window.att_statusSortOrder||"asc";o!=="default"&&r.sort((y,b)=>{var h,_;let p,m;if(o==="name")p=y.name||y.email.split("@")[0],m=b.name||b.email.split("@")[0];else if(o==="group")if(a){const I=Ot.filter(S=>S.user_email===y.email).map(S=>S.group_id);p=bt.filter(S=>I.includes(S.id)).map(S=>S.name).join(", ")||"-";const k=Ot.filter(S=>S.user_email===b.email).map(S=>S.group_id);m=bt.filter(S=>k.includes(S.id)).map(S=>S.name).join(", ")||"-"}else p=((h=on.find(I=>I.id===y.attribute_id))==null?void 0:h.name)||"-",m=((_=on.find(I=>I.id===b.attribute_id))==null?void 0:_.name)||"-";else if(o==="status"){const I=k=>{const S=ze.find(E=>E.event_id===t.id&&E.user_email===k.email),$=(S==null?void 0:S.status)||"未回答";return $==="出席"?1:$==="保留"||$==="未定"?2:$==="未回答"?3:$==="欠席"?4:5};p=I(y),m=I(b)}else if(o==="comment"){const I=k=>{const S=ze.find(x=>x.event_id===t.id&&x.user_email===k.email);if(!S||!S.status||S.status==="未回答")return"";let $=S.comment||"",E="否";$.startsWith("[荷物車:可]")?(E="可",$=$.substring(8)):$.startsWith("[荷物車:否]")&&(E="否",$=$.substring(8));let w=[];return t.require_detailed_attendance&&(S.accompanying_persons&&w.push(`同伴: ${S.accompanying_persons}`),S.car_capacity&&S.car_capacity>0&&(w.push(`車出: 可[${S.car_capacity}人]`),w.push(`荷物車: ${E}`))),$.trim()&&w.push(`メモ: ${$.trim()}`),w.join(", ")};p=I(y),m=I(b)}else if(o==="updated_at"){const I=ze.find(S=>S.event_id===t.id&&S.user_email===y.email),k=ze.find(S=>S.event_id===t.id&&S.user_email===b.email);p=I?new Date(I.updated_at).getTime():0,m=k?new Date(k.updated_at).getTime():0}return p<m?i==="asc"?-1:1:p>m?i==="asc"?1:-1:0});const l=[["名前",a?"グループ":"属性","出欠ステータス","同伴者","車出し可否","乗車人数","荷物車対応","コメント","更新日時"]];r.forEach(y=>{var w;const b=y.name||y.email.split("@")[0];let p="-";if(a){const x=Ot.filter(v=>v.user_email===y.email).map(v=>v.group_id);p=bt.filter(v=>x.includes(v.id)).map(v=>v.name).join(", ")||"-"}else p=((w=on.find(x=>x.id===y.attribute_id))==null?void 0:w.name)||"-";const m=ze.find(x=>x.event_id===t.id&&x.user_email===y.email);let h=(m==null?void 0:m.status)||"未回答";h==="未定"&&(h="保留");let _=(m==null?void 0:m.comment)||"",I="否";_.startsWith("[荷物車:可]")?(I="可",_=_.substring(8)):_.startsWith("[荷物車:否]")&&(I="否",_=_.substring(8));const k=(m==null?void 0:m.accompanying_persons)||"",S=(m==null?void 0:m.car_capacity)||0,$=S>0?"可":"否",E=m?Jr(m.updated_at):"-";l.push([b,p,h,k,$,S,I,_,E])});const c=l.map(y=>y.map(window.escapeCSV).join(",")).join(`
`),u=new Blob([new Uint8Array([239,187,191]),c],{type:"text/csv;charset=utf-8;"}),f=document.createElement("a"),g=t.title.replace(/[\/\\?%*:|"<>]/g,"_");f.href=URL.createObjectURL(u),f.setAttribute("download",`参加者リスト_${g}_${window.att_statusFilter}.csv`),document.body.removeChild(f)};function gs(e){if(!e||isNaN(e.getTime()))return"";const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0"),s=String(e.getHours()).padStart(2,"0"),r=String(e.getMinutes()).padStart(2,"0");return`${t}-${n}-${a}T${s}:${r}`}function ci(e){const t=e.split(/\r?\n/),n=[];let a=null,s=!1;const r=[];for(let o of t)o.startsWith(" ")||o.startsWith("	")?r.length>0&&(r[r.length-1]+=o.substring(1)):r.push(o);for(let o of r){const i=o.trim();if(i){if(i==="BEGIN:VEVENT")a={title:"",description:"",location:"",start:null,end:null,isAllDay:!1},s=!0;else if(i==="END:VEVENT")a&&n.push(a),s=!1,a=null;else if(s&&a){const d=i.indexOf(":");if(d===-1)continue;const l=i.substring(0,d),c=i.substring(d+1),u=l.split(";")[0],f=l.split(";").slice(1);if(u==="SUMMARY")a.title=bs(c);else if(u==="DESCRIPTION")a.description=bs(c);else if(u==="LOCATION")a.location=bs(c);else if(u==="DTSTART"){const g=f.some(y=>y.toUpperCase()==="VALUE=DATE");a.start=Er(c,g),g&&(a.isAllDay=!0)}else if(u==="DTEND"){const g=f.some(y=>y.toUpperCase()==="VALUE=DATE");a.end=Er(c,g)}}}}return n}function bs(e){return e.replace(/\\n/g,`
`).replace(/\\r/g,"\r").replace(/\\t/g,"	").replace(/\\,/g,",").replace(/\\;/g,";").replace(/\\\\/g,"\\")}function Er(e,t){if(!e)return null;const n=parseInt(e.substring(0,4)),a=parseInt(e.substring(4,6))-1,s=parseInt(e.substring(6,8));if(t||e.indexOf("T")===-1)return new Date(n,a,s);const r=e.indexOf("T"),o=parseInt(e.substring(r+1,r+3)),i=parseInt(e.substring(r+3,r+5)),d=parseInt(e.substring(r+5,r+7))||0;return e.endsWith("Z")?new Date(Date.UTC(n,a,s,o,i,d)):new Date(n,a,s,o,i,d)}async function ui(e){const t=e.target.files[0];if(!t)return;W("ICSファイルを解析中...");const n=new FileReader;n.onload=async a=>{try{const s=a.target.result,r=ci(s);if(G(),r.length===0){alert("ICSファイルから有効な予定が見つかりませんでした。");return}mi(r)}catch(s){console.error(s),alert("ICSファイルの解析に失敗しました: "+s.message),G()}},n.readAsText(t),e.target.value=""}function mi(e){const t=document.getElementById("ics-import-list");if(!t)return;const n=document.getElementById("ics-import-count");n&&(n.textContent=e.length),t.innerHTML=e.map((r,o)=>{var b,p;const i=r.title||"",d=i.toLowerCase();let l=((b=dt[0])==null?void 0:b.name)||"練習";for(let m of dt)if(d.includes(m.name)){l=m.name;break}l===((p=dt[0])==null?void 0:p.name)&&(d.includes("試合")||d.includes("vs")||d.includes("戦")?dt.find(h=>h.name==="試合")&&(l="試合"):(d.includes("イベント")||d.includes("会")||d.includes("式")||d.includes("フェス"))&&dt.find(h=>h.name==="イベント")&&(l="イベント"));let c="";if(r.location){const m=fn.find(h=>h.name===r.location);m?c=m.name:c="custom"}const u=gs(r.start),f=gs(r.end||(r.start?new Date(r.start.getTime()+2*60*60*1e3):null));let g=r.start?new Date(r.start.getTime()-3*24*60*60*1e3):null;g&&g.setHours(12,0,0,0);const y=gs(g);return`
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
                                ${dt.map(m=>`<option value="${m.name}" ${m.name===l?"selected":""}>${m.name}</option>`).join("")}
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">場所</label>
                            <div class="flex gap-2">
                                <select class="ics-row-location-select w-1/2 border p-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500">
                                    <option value="">(登録場所から選択...)</option>
                                    ${fn.map(m=>`<option value="${m.name}" ${m.name===c?"selected":""}>${m.name}</option>`).join("")}
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
                            <input type="datetime-local" class="ics-row-deadline w-full border p-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500" value="${y}">
                        </div>
                    </div>

                    <!-- 4行目: 対象グループ (横並び) -->
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">対象グループ</label>
                        <div class="flex flex-wrap gap-3 p-2.5 bg-white border rounded-lg max-h-28 overflow-y-auto">
                            ${bt.map(m=>`
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
        `}).join("");const a=document.getElementById("ics-select-all");a&&(a.checked=!0,a.onclick=r=>{document.querySelectorAll(".ics-row-select").forEach(o=>o.checked=r.target.checked)});const s=document.getElementById("ics-import-modal");s&&s.classList.remove("hidden")}function ks(){var e;(e=document.getElementById("ics-import-modal"))==null||e.classList.add("hidden")}async function pi(){const e=document.querySelectorAll(".ics-row"),t=[];if(e.forEach(n=>{var p,m,h,_,I,k,S,$,E,w;const a=n.querySelector(".ics-row-select");if(!a||!a.checked)return;const s=((p=n.querySelector(".ics-row-title"))==null?void 0:p.value)||"";if(!s)return;const r=((m=n.querySelector(".ics-row-category"))==null?void 0:m.value)||"",o=((h=n.querySelector(".ics-row-location"))==null?void 0:h.value)||"",i=((_=n.querySelector(".ics-row-start"))==null?void 0:_.value)||"",d=((I=n.querySelector(".ics-row-end"))==null?void 0:I.value)||"",l=((k=n.querySelector(".ics-row-allday"))==null?void 0:k.checked)||!1,c=[];n.querySelectorAll(".ics-row-group-cb:checked").forEach(x=>{c.push(x.value)});const u=((S=n.querySelector(".ics-row-req-att"))==null?void 0:S.checked)||!1,f=(($=n.querySelector(".ics-row-req-det"))==null?void 0:$.checked)||!1,g=((E=n.querySelector(".ics-row-deadline"))==null?void 0:E.value)||"",y=((w=n.querySelector(".ics-row-description"))==null?void 0:w.value)||"",b=x=>x?new Date(x).toISOString():null;t.push({title:s,category:r,location:o,start_time:b(i),end_time:b(d),is_all_day:l,target_group_ids:c.length>0?c:null,requires_attendance:u,require_detailed_attendance:u?f:!1,attendance_deadline:u?b(g):null,description:y,created_by:J==null?void 0:J.email})}),t.length===0){alert("登録対象の予定が選択されていません。");return}W("予定データを登録中...");try{const{error:n}=await B.from("events").insert(t);if(n)throw n;await fe("IMPORT_ICS_EVENTS",`${t.length}件の予定をICSファイルから一括登録しました`),alert(`${t.length}件の予定を登録しました。`),ks(),await Fn(),yt(),document.getElementById("list-container").classList.contains("hidden")||sn()}catch(n){console.error(n),alert("予定の登録に失敗しました: "+n.message)}finally{G()}}const fi="modulepreload",gi=function(e){return"/"+e},_r={},bi=function(t,n,a){let s=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),i=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));s=Promise.allSettled(n.map(d=>{if(d=gi(d),d in _r)return;_r[d]=!0;const l=d.endsWith(".css"),c=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${c}`))return;const u=document.createElement("link");if(u.rel=l?"stylesheet":fi,l||(u.as="script"),u.crossOrigin="",u.href=d,i&&u.setAttribute("nonce",i),document.head.appendChild(u),l)return new Promise((f,g)=>{u.addEventListener("load",f),u.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(o){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=o,window.dispatchEvent(i),!i.defaultPrevented)throw o}return s.then(o=>{for(const i of o||[])i.status==="rejected"&&r(i.reason);return t().catch(r)})};let Ir=!1,Ha=[],eo=[],to=[],Vt=[],Ks=[],jt=[],De={homeTeamNames:["ありんこアントス@A軍"],defaultFilterDate:{from:"",to:"",teamRegex:"",category:"",outcome:"all",firstScore:"all"}},$r=!1,qa=!0,ga=!1,$n="all",ca={},dn={},ys={},Ls={batter:[],pitcher:[]},_n={batter:{key:"ops",order:"desc"},pitcher:{key:"era",order:"asc"}},jn={batter:{key:"ops",order:"desc"},pitcher:{key:"era",order:"asc"}},ft=null,Lt={};async function Bs(){Ir||(hi(),Ir=!0);const e=document.querySelector('button[data-tab="import-data"]');e&&(Ge==="admin"?e.classList.remove("hidden"):e.classList.add("hidden")),await Zs()}function yi(e){const t=[];let n=[],a="",s=!1;for(let r=0;r<e.length;r++){const o=e[r];s?o==='"'?r+1<e.length&&e[r+1]==='"'?(a+='"',r++):s=!1:a+=o:o==='"'?s=!0:o===","?(n.push(a),a=""):o===`
`||o==="\r"?(n.push(a),t.push(n),n=[],a="",o==="\r"&&r+1<e.length&&e[r+1]===`
`&&r++):a+=o}return(a||n.length>0)&&(n.push(a),t.push(n)),t}function hi(){var t,n,a,s,r,o,i,d,l,c,u,f,g,y,b,p,m,h,_,I,k,S,$,E,w;let e=document.getElementById("dashboard-view");e||(e=document.createElement("div"),e.id="dashboard-view",e.className="hidden p-4 max-w-4xl mx-auto",e.innerHTML=`
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
        `,(t=document.getElementById("app-view"))==null||t.parentNode.appendChild(e),document.getElementById("btn-back-to-menu-dash").addEventListener("click",()=>{bi(()=>Promise.resolve().then(()=>Lc),void 0).then(x=>x.switchAuthScreen("app-menu-view"))}),document.getElementById("btn-exec-csv-import").addEventListener("click",Ti),(n=document.getElementById("backup-extract-file"))==null||n.addEventListener("change",Ni),(a=document.getElementById("btn-backup-import-db"))==null||a.addEventListener("click",Pi),(s=document.getElementById("btn-extract-raw-b"))==null||s.addEventListener("click",()=>Lr("batter")),(r=document.getElementById("btn-extract-raw-p"))==null||r.addEventListener("click",()=>Lr("pitcher")),(o=document.getElementById("btn-extract-single-game"))==null||o.addEventListener("click",Mi),(i=document.getElementById("btn-extract-game-transcript"))==null||i.addEventListener("click",Ri),(d=document.getElementById("btn-preview-backup-detail"))==null||d.addEventListener("click",Oi),(l=document.getElementById("btn-load-detail-data"))==null||l.addEventListener("click",Ui),(c=document.getElementById("detail-scope-select"))==null||c.addEventListener("change",x=>An(!0,x.target.value)),(u=document.getElementById("btn-detail-back-to-all"))==null||u.addEventListener("click",()=>An(!0,"all")),(f=document.getElementById("btn-detail-exit-preview"))==null||f.addEventListener("click",()=>{jt=[],An(!1,"all")}),(g=document.getElementById("detail-transcript-show-pitches"))==null||g.addEventListener("change",x=>{ga=x.target.checked,ar()}),(y=document.getElementById("btn-detail-copy-transcript"))==null||y.addEventListener("click",Hi),(b=document.getElementById("btn-detail-download-transcript"))==null||b.addEventListener("click",qi),(p=document.getElementById("btn-jump-to-transcript"))==null||p.addEventListener("click",()=>{var x;(x=document.getElementById("detail-transcript-panel"))==null||x.scrollIntoView({behavior:"smooth",block:"start"})}),(m=document.getElementById("btn-jump-to-detail-top"))==null||m.addEventListener("click",()=>{var x;(x=document.getElementById("tab-content-detail-analysis"))==null||x.scrollIntoView({behavior:"smooth",block:"start"})}),document.querySelectorAll("#dashboard-tabs button").forEach(x=>{x.addEventListener("click",v=>{no(v.currentTarget.dataset.tab)})}),document.querySelectorAll("button[data-ranking-tab]").forEach(x=>{x.addEventListener("click",v=>{document.querySelectorAll("button[data-ranking-tab]").forEach(P=>{P.classList.remove("text-blue-600","border-blue-600"),P.classList.add("text-gray-500","border-transparent")}),["batter","pitcher"].forEach(P=>document.getElementById(`ranking-content-${P}`).classList.add("hidden"));const A=v.currentTarget;A.classList.remove("text-gray-500","border-transparent"),A.classList.add("text-blue-600","border-blue-600"),document.getElementById(`ranking-content-${A.dataset.rankingTab}`).classList.remove("hidden")})}),(h=document.getElementById("ranking-regulation-cb"))==null||h.addEventListener("change",x=>{qa=x.target.checked,so()}),document.querySelectorAll("#tab-content-ranking th[data-sort]").forEach(x=>{x.addEventListener("click",v=>{const A=v.currentTarget.dataset.role,P=v.currentTarget.dataset.sort;Bi(A,P)})}),document.getElementById("btn-apply-dashboard-filter").addEventListener("click",zt),["db-filter-date-from","db-filter-date-to","db-filter-outcome","db-filter-first-score"].forEach(x=>{var v;(v=document.getElementById(x))==null||v.addEventListener("change",zt)}),["db-filter-team-regex","db-filter-category"].forEach(x=>{var v,A;(v=document.getElementById(x))==null||v.addEventListener("change",zt),(A=document.getElementById(x))==null||A.addEventListener("input",zt)}),document.getElementById("btn-clear-dashboard-filter").addEventListener("click",()=>{document.getElementById("db-filter-date-from").value=De.defaultFilterDate.from||"",document.getElementById("db-filter-date-to").value=De.defaultFilterDate.to||"",document.getElementById("db-filter-team-regex").value=De.defaultFilterDate.teamRegex||"",document.getElementById("db-filter-category").value=De.defaultFilterDate.category||"";const x=document.getElementById("db-filter-outcome");x&&(x.value=De.defaultFilterDate.outcome||"all");const v=document.getElementById("db-filter-first-score");v&&(v.value=De.defaultFilterDate.firstScore||"all"),zt()}),["ps-mode","ps-player","ps-role","ps-limit-games","ps-ma-unit","ps-ma-window"].forEach(x=>{var v;return(v=document.getElementById(x))==null?void 0:v.addEventListener("change",()=>{var D,F,R;const A=(D=document.getElementById("ps-ma-unit"))==null?void 0:D.value,P=document.getElementById("ps-ma-window-label");P&&(P.textContent=A==="ab"?"打数/登板":"試合");const N=((F=document.getElementById("ps-mode"))==null?void 0:F.value)==="single";(R=document.getElementById("ps-player-select-wrap"))==null||R.classList.toggle("hidden",!N),er()})}),(_=document.getElementById("btn-export-ps-csv"))==null||_.addEventListener("click",Li),(I=document.getElementById("btn-print-ps"))==null||I.addEventListener("click",()=>window.print()),(k=document.getElementById("comp-players-list"))==null||k.addEventListener("change",ma),["comp-role","comp-calc-mode"].forEach(x=>{var v;(v=document.getElementById(x))==null||v.addEventListener("change",ma)}),(S=document.getElementById("comp-ma-window"))==null||S.addEventListener("change",ma),($=document.getElementById("comp-ma-window"))==null||$.addEventListener("input",ma),(E=document.getElementById("btn-add-home-team"))==null||E.addEventListener("click",Ai),(w=document.getElementById("btn-save-default-date"))==null||w.addEventListener("click",async()=>{var z,K;const x=document.getElementById("setting-default-date-from").value,v=document.getElementById("setting-default-date-to").value,A=document.getElementById("setting-default-team-regex").value.trim(),P=document.getElementById("setting-default-category").value.trim(),N=((z=document.getElementById("setting-default-outcome"))==null?void 0:z.value)||"all",D=((K=document.getElementById("setting-default-first-score"))==null?void 0:K.value)||"all",F={from:x,to:v,teamRegex:A,category:P,outcome:N,firstScore:D,_updatedAt:Date.now()};localStorage.setItem("ants_defaultFilterDate",JSON.stringify(F)),W("デフォルトのフィルタ設定を保存中 (DB同期)...");try{await Qs("defaultFilterDate",F,"DASHBOARD_DEFAULT_FILTER",F),Pn(!0,"デフォルト設定をSupabase DBへ保存・同期しました"),alert("デフォルトのフィルタ設定をDBに保存し、同期しました。")}catch(H){console.error("Supabase sync failed",H),Pn(!1,`DB同期に失敗 (このブラウザのみ保存): ${H.message}`),alert("DBへの同期に失敗しましたが、このブラウザには保存されました: "+H.message)}finally{G()}De.defaultFilterDate=F;const R=document.getElementById("db-filter-date-from"),L=document.getElementById("db-filter-date-to"),T=document.getElementById("db-filter-team-regex"),C=document.getElementById("db-filter-category"),U=document.getElementById("db-filter-outcome"),ee=document.getElementById("db-filter-first-score");R&&(R.value=x),L&&(L.value=v),T&&(T.value=A),C&&(C.value=P),U&&(U.value=N),ee&&(ee.value=D),zt()}))}function no(e){var s;const t=new Set(["team-summary","personal-summary","ranking","comparison","detail-analysis"]);document.querySelectorAll("#dashboard-tabs button").forEach(r=>{r.classList.remove("text-blue-600","border-blue-600"),r.classList.add("text-gray-500","border-transparent")}),["team-summary","personal-summary","ranking","comparison","settings","import-data","detail-analysis"].forEach(r=>{var o;(o=document.getElementById(`tab-content-${r}`))==null||o.classList.add("hidden")});const n=document.querySelector(`#dashboard-tabs button[data-tab="${e}"]`);n&&(n.classList.remove("text-gray-500","border-transparent"),n.classList.add("text-blue-600","border-blue-600")),(s=document.getElementById(`tab-content-${e}`))==null||s.classList.remove("hidden");const a=document.getElementById("dashboard-common-filter");a&&a.classList.toggle("hidden",!t.has(e))}async function Qs(e,t,n,a){const[s,r]=await Promise.all([B.from("master_data").upsert({key:n,data:a},{onConflict:"key"}),B.from("dashboard_settings").upsert({key:e,value:t},{onConflict:"key"})]);if(s.error&&r.error)throw s.error;s.error&&console.warn("master_data upsert warning:",s.error),r.error&&console.warn("dashboard_settings upsert warning:",r.error)}function Pn(e,t=""){const n=document.getElementById("settings-db-sync-status");n&&(e?(n.textContent=`✅ ${t||"DB (Supabase) と同期済みです（LocalStorageによる上書きは無効化）"}`,n.className="text-xs font-bold mb-3 text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded"):(n.textContent=`⚠️ ${t||"DBに設定が未登録のため初期値・ローカルキャッシュを表示中（「設定を保存」でDB同期できます）"}`,n.className="text-xs font-bold mb-3 text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded"))}async function Zs(){W("成績データを読み込み中...");try{const[{data:e,error:t},{data:n,error:a},{data:s,error:r},{data:o},{data:i},{data:d},{data:l}]=await Promise.all([B.from("games").select("*").order("date",{ascending:!0}),B.from("batter_stats").select("*"),B.from("pitcher_stats").select("*"),B.from("players").select("*"),B.from("dashboard_settings").select("*"),B.from("master_data").select("key, data").in("key",["DASHBOARD_DEFAULT_FILTER","DASHBOARD_HOME_TEAMS"]),B.from("master_data").select("key, data").like("key","SCORER_GAME_DETAIL_%")]);if(t)throw t;if(a)throw a;if(r)throw r;Ha=e||[],eo=n||[],to=s||[],Vt=o||[],Ks=(l||[]).map($=>$==null?void 0:$.data).filter($=>$&&($.gid!==void 0||$.cd)).sort(($,E)=>String(E.date||"").localeCompare(String($.date||""))||(E.gid||0)-($.gid||0));let c=["ありんこアントス@A軍"],u={from:"",to:"",teamRegex:"",category:"",outcome:"all",firstScore:"all"},f=!1,g=!1,y=-1,b=-1;const p=$=>{if(typeof $=="string")try{return JSON.parse($)}catch{return null}return $};if(Array.isArray(i)){const $=i.find(v=>v.key==="homeTeamNames"),E=p($==null?void 0:$.value);Array.isArray(E)&&E.length>0&&(c=E,f=!0,y=0);const w=i.find(v=>v.key==="defaultFilterDate"),x=p(w==null?void 0:w.value);x&&typeof x=="object"&&(u={from:x.from||"",to:x.to||"",teamRegex:x.teamRegex||"",category:x.category||"",outcome:x.outcome||"all",firstScore:x.firstScore||"all"},g=!0,b=Number(x._updatedAt||0))}if(Array.isArray(d)){const $=d.find(v=>v.key==="DASHBOARD_HOME_TEAMS"),E=p($==null?void 0:$.data);if(E){const v=Array.isArray(E)?E:Array.isArray(E.teams)?E.teams:null,A=Number(E._updatedAt||1);v&&v.length>0&&(!f||A>=y)&&(c=v,f=!0,y=A)}const w=d.find(v=>v.key==="DASHBOARD_DEFAULT_FILTER"),x=p(w==null?void 0:w.data);if(x&&typeof x=="object"){const v=Number(x._updatedAt||1);(!g||v>=b)&&(u={from:x.from||"",to:x.to||"",teamRegex:x.teamRegex||"",category:x.category||"",outcome:x.outcome||"all",firstScore:x.firstScore||"all"},g=!0,b=v)}}if(f)localStorage.setItem("ants_homeTeamNames",JSON.stringify(c));else{const $=localStorage.getItem("ants_homeTeamNames");if($)try{const E=JSON.parse($);Array.isArray(E)&&E.length>0&&(c=E)}catch{}}if(g)localStorage.setItem("ants_defaultFilterDate",JSON.stringify(u));else{const $=localStorage.getItem("ants_defaultFilterDate");if($)try{const E=JSON.parse($);u={from:E.from||"",to:E.to||"",teamRegex:E.teamRegex||"",category:E.category||"",outcome:E.outcome||"all",firstScore:E.firstScore||"all"}}catch{}}Pn(g||f),De.homeTeamNames=c,De.defaultFilterDate=u,tr();const m=document.getElementById("setting-default-date-from"),h=document.getElementById("setting-default-date-to"),_=document.getElementById("setting-default-team-regex"),I=document.getElementById("setting-default-category"),k=document.getElementById("setting-default-outcome"),S=document.getElementById("setting-default-first-score");m&&(m.value=De.defaultFilterDate.from||""),h&&(h.value=De.defaultFilterDate.to||""),_&&(_.value=De.defaultFilterDate.teamRegex||""),I&&(I.value=De.defaultFilterDate.category||""),k&&(k.value=De.defaultFilterDate.outcome||"all"),S&&(S.value=De.defaultFilterDate.firstScore||"all"),$r?zt():(document.getElementById("btn-clear-dashboard-filter").click(),$r=!0)}catch(e){console.error(e),alert("成績データの取得に失敗しました: "+e.message)}finally{G()}}function Pt(e){if(!e)return!1;const t=e.trim();return t==="ありんこ"||t==="アントス"?!1:De.homeTeamNames.some(n=>{if(!n)return!1;const a=n.replace(/@.*$/,"").trim(),s=e.replace(/@.*$/,"").trim();try{if(new RegExp(n,"i").test(e)||new RegExp(a,"i").test(s))return!0}catch{}return e.includes(n)||n.includes(e)||a&&s&&(s.includes(a)||a.includes(s))})}function Xs(e){const t=Pt(e.team_first);let n=0,a=0;if(e.score&&typeof e.score=="string"){const o=e.score.match(/\d+/g);if(o&&o.length>=2){const i=parseInt(o[0],10),d=parseInt(o[1],10);return t?(n=i,a=d):(n=d,a=i),{tr:n,or:a,isAntsFirst:t}}}const s=parseInt(e.runs_first??e.score_first??0,10)||0,r=parseInt(e.runs_second??e.score_second??0,10)||0;return t?(n=s,a=r):(n=r,a=s),{tr:n,or:a,isAntsFirst:t}}function xi(e){const t=Pt(e.team_first);if(e.first_score_team)return Pt(e.first_score_team)?"scored":"conceded";if(e.first_scored!==void 0&&e.first_scored!==null){if(e.first_scored==="home"||e.first_scored===!0||e.first_scored===1)return"scored";if(e.first_scored==="opp"||e.first_scored===!1||e.first_scored===0)return"conceded"}const n=e.inning_scores||e.score_detail||e.innings;if(n&&typeof n=="string"&&n.includes("|")){const[r,o]=n.split("|"),i=r.split(/[,-]/).map(c=>parseInt(c.trim(),10)||0),d=o.split(/[,-]/).map(c=>parseInt(c.trim(),10)||0),l=Math.max(i.length,d.length);for(let c=0;c<l;c++){const u=i[c]||0,f=d[c]||0;if(u>0&&f===0)return t?"scored":"conceded";if(f>0&&u===0)return t?"conceded":"scored";if(u>0&&f>0)return t?"scored":"conceded"}}const{tr:a,or:s}=Xs(e);return a===0&&s===0?"unknown":a>0&&s===0?"scored":s>0&&a===0?"conceded":t?a>0?"scored":"conceded":s>0?"conceded":"scored"}function Mn(e){if(!e)return"";const t=String(e).split("T")[0].replace(/\//g,"-").split("-");if(t.length===3){const n=parseInt(t[0],10),a=parseInt(t[1],10),s=parseInt(t[2],10);if(!isNaN(n)&&!isNaN(a)&&!isNaN(s))return`${n}-${String(a).padStart(2,"0")}-${String(s).padStart(2,"0")}`}return""}function Wn(e){return String(e||"").replace(/髙/g,"高").replace(/[\s　]+/g,"").trim()}let Rn={games:[],bStats:[],pStats:[]};function zt(){var p,m;const e=document.getElementById("db-filter-date-from").value,t=document.getElementById("db-filter-date-to").value,n=document.getElementById("db-filter-team-regex").value,a=document.getElementById("db-filter-category").value,s=((p=document.getElementById("db-filter-outcome"))==null?void 0:p.value)||"all",r=((m=document.getElementById("db-filter-first-score"))==null?void 0:m.value)||"all";let o=null;if(n)try{o=new RegExp(n,"i")}catch{}const i=a?a.split(",").map(h=>h.trim()).filter(h=>h):[],d=Ha.filter(h=>{const _=(h.team_first||"").trim(),I=(h.team_second||"").trim(),k=(h.title||"")+(h.category||"");if(_==="ありんこ"||_==="アントス"||I==="ありんこ"||I==="アントス"||k.includes("紅白")||_.includes("紅白")||I.includes("紅白"))return!1;const S=Pt(h.team_first),$=Pt(h.team_second);if(S&&$||!S&&!$)return!1;const E=Mn(h.date);if(e&&E<e||t&&E>t||i.length>0&&!i.some(w=>(h.title||"").includes(w)||(h.category||"").includes(w)))return!1;if(o){const w=S?I:_;if(!o.test(w))return!1}if(s!=="all"){const{tr:w,or:x}=Xs(h);if(s==="win"&&w<=x||s==="loss"&&w>=x||s==="draw"&&w!==x)return!1}if(r!=="all"){const w=xi(h);if(r==="scored"&&w!=="scored"||r==="conceded"&&w!=="conceded")return!1}return!0}),l=new Set(d.map(h=>h.id)),c=eo.filter(h=>l.has(h.game_id)),u=to.filter(h=>l.has(h.game_id));Rn={games:d,bStats:c,pStats:u};const f=new Set;c.forEach(h=>f.add(h.player_id)),u.forEach(h=>f.add(h.player_id));const g=Vt.filter(h=>f.has(h.id)).sort((h,_)=>h.name.localeCompare(_.name)),y=document.getElementById("ps-player");if(y){const h=y.value;y.innerHTML=g.map(_=>`<option value="${_.id}">${_.name}</option>`).join(""),h&&f.has(parseInt(h))&&(y.value=h)}const b=document.getElementById("comp-players-list");if(b){const h=new Set(Array.from(document.querySelectorAll(".comp-player-cb:checked")).map(_=>_.value));b.innerHTML=g.map(_=>`<label class="flex items-center space-x-1 cursor-pointer"><input type="checkbox" value="${_.id}" class="comp-player-cb rounded text-blue-600" ${h.has(String(_.id))?"checked":""}><span>${te(_.name)}</span></label>`).join("")}vi(d,c,u),so(),er(),ma(),An(!0)}function vi(e,t,n){document.getElementById("summary-games").textContent=e.length;const a=t.reduce((c,u)=>c+(u.at_bats||0),0),s=t.reduce((c,u)=>c+(u.hits||0),0),r=a>0?(s/a).toFixed(3).replace(/^0/,""):".000";document.getElementById("summary-avg").textContent=r;const o=t.reduce((c,u)=>c+(u.runs||0),0);document.getElementById("summary-runs").textContent=o;const i=n.reduce((c,u)=>c+(u.earned_runs||0),0),d=n.reduce((c,u)=>c+(u.outs||0),0),l=d>0?(i*7/(d/3)).toFixed(2):"0.00";document.getElementById("summary-era").textContent=l,wi(e,t,n)}let Sr=!1;function Ea(){return Sr||window.Chart?Promise.resolve():new Promise((e,t)=>{const n=document.createElement("script");n.src="https://cdn.jsdelivr.net/npm/chart.js",n.onload=()=>{Sr=!0,e()},n.onerror=t,document.head.appendChild(n)})}async function wi(e,t,n){await Ea(),Object.values(ca).forEach(E=>E.destroy()),ca={};const a={};e.forEach(E=>{const w=E.date?E.date.split("T")[0]:"";if(!w)return;const x=w.substring(0,7);a[x]||(a[x]={atBats:0,hits:0,runs:0,strikeOuts:0,hitsAllowed:0,walksAllowed:0,strikes:0,pitchCount:0,earnedRuns:0,outs:0})}),t.forEach(E=>{const w=e.find(v=>v.id===E.game_id);if(!w||!w.date)return;const x=w.date.split("T")[0].substring(0,7);a[x]&&(a[x].atBats+=E.at_bats||0,a[x].hits+=E.hits||0,a[x].runs+=E.runs||0)}),n.forEach(E=>{const w=e.find(v=>v.id===E.game_id);if(!w||!w.date)return;const x=w.date.split("T")[0].substring(0,7);a[x]&&(a[x].strikeOuts+=E.strike_outs||0,a[x].hitsAllowed+=E.hits_allowed||0,a[x].walksAllowed+=E.walks_allowed||0,a[x].strikes+=E.strikes||0,a[x].pitchCount+=E.pitch_count||0,a[x].earnedRuns+=E.earned_runs||0,a[x].outs+=E.outs||0)});const s=Object.keys(a).sort();let r=0,o=0,i=0,d=0;const l=[],c=[],u=[],f=[],g=[],y=[],b=[],p=[];s.forEach(E=>{r+=a[E].atBats,o+=a[E].hits,l.push(r>0?o/r:0),c.push(a[E].runs),u.push(a[E].strikeOuts),f.push(a[E].hitsAllowed),g.push(a[E].walksAllowed),y.push(a[E].pitchCount>0?(a[E].strikes/a[E].pitchCount*100).toFixed(1):0);const w=a[E].earnedRuns,v=a[E].outs/3;p.push(v>0?w*7/v:0),i+=a[E].earnedRuns,d+=a[E].outs;const A=d/3;b.push(A>0?i*7/A:0)}),ca.batting=new window.Chart(document.getElementById("chart-batting-monthly").getContext("2d"),{type:"bar",data:{labels:s,datasets:[{label:"月間得点",type:"bar",data:c,backgroundColor:"rgba(75, 192, 192, 0.6)",yAxisID:"y"},{label:"累積打率",type:"line",data:l,borderColor:"rgba(255, 99, 132, 1)",yAxisID:"y1"}]},options:{responsive:!0,scales:{y:{position:"left",beginAtZero:!0},y1:{position:"right",beginAtZero:!0,min:0,max:1}}}}),ca.pitching=new window.Chart(document.getElementById("chart-pitching-monthly").getContext("2d"),{type:"bar",data:{labels:s,datasets:[{label:"奪三振",data:u,backgroundColor:"rgba(54, 162, 235, 0.6)"},{label:"被安打",data:f,backgroundColor:"rgba(255, 159, 64, 0.6)"},{label:"与四死球",data:g,backgroundColor:"rgba(255, 205, 86, 0.6)"},{label:"S率(%)",type:"line",data:y,borderColor:"rgba(153, 102, 255, 1)",yAxisID:"y1"},{label:"累積防御率",type:"line",data:b,borderColor:"rgba(255, 99, 132, 1)",yAxisID:"y2"},{label:"月別防御率",type:"line",data:p,borderColor:"rgba(75, 192, 192, 1)",borderDash:[5,5],yAxisID:"y2"}]},options:{responsive:!0,scales:{y:{position:"left",beginAtZero:!0},y1:{position:"right",beginAtZero:!0,min:0,max:100,grid:{drawOnChartArea:!1}},y2:{position:"right",beginAtZero:!0,grid:{drawOnChartArea:!1}}}}});const m=[],h=[],_=[],I=[],k=[];let S=0,$=0;e.forEach((E,w)=>{const x=E.date?E.date.split("T")[0]:"",{tr:v,or:A,isAntsFirst:P}=Xs(E),N=P?E.team_first:E.team_second,D=P?E.team_second:E.team_first,F=E.title||E.category||"試合";k.push({date:x,title:F,myTeam:N||"自チーム",oppTeam:D||"相手チーム",tr:v,or:A,isAntsFirst:P}),h.push(v),_.push(-A),v>A&&S++,$++,I.push($>0?(S/$*100).toFixed(1):0),m.push([x?x.substring(5):`G${w+1}`,D||""])}),ca.games=new window.Chart(document.getElementById("chart-games-wl").getContext("2d"),{type:"bar",data:{labels:m,datasets:[{label:"得点",data:h,backgroundColor:"rgba(75, 192, 192, 0.8)"},{label:"失点",data:_,backgroundColor:"rgba(255, 99, 132, 0.8)"},{label:"累積勝率(%)",type:"line",data:I,borderColor:"rgba(255, 205, 86, 1)",yAxisID:"y1"}]},options:{responsive:!0,plugins:{tooltip:{callbacks:{title:function(E){if(!E.length)return"";const w=E[0].dataIndex,x=k[w];return x?`${x.date} 【${x.title}】
${x.myTeam} vs ${x.oppTeam}`:""},label:function(E){const w=E.dataIndex,x=k[w],v=E.dataset.label||"";return v==="得点"?`得点 (${(x==null?void 0:x.myTeam)||"自チーム"}): ${E.raw} 点`:v==="失点"?`失点 (${(x==null?void 0:x.oppTeam)||"相手チーム"}): ${Math.abs(E.raw)} 点`:v==="累積勝率(%)"?`累積勝率: ${E.raw} %`:`${v}: ${E.raw}`}}}},scales:{x:{stacked:!0,ticks:{font:{size:10}}},y:{stacked:!0,position:"left"},y1:{position:"right",beginAtZero:!0,min:0,max:100}}}})}function tn(e){let t=0,n=0,a=0,s=0,r=0,o=0,i=0,d=0,l=0,c=0,u=0,f=0,g=0,y=0,b=0;e.forEach(x=>{const v=x.plate_appearances||0,A=x.at_bats||0,P=x.hits||0,N=x.doubles||0,D=x.triples||0,F=x.home_runs||0,R=x.walks||0,L=x.hit_by_pitch||0,T=x.strike_outs||x.strikeouts||0,C=x.sacrifice_flies||x.sac_flies||0,U=x.sacrifice_hits||x.sac_bunts||0,ee=x.runs_batted_in||0,z=x.runs||0,K=x.stolen_bases||0;t+=v,n+=A,a+=P,f+=N,g+=D,u+=F,d+=R,l+=L,c+=T,y+=C,b+=U,r+=ee,o+=z,i+=K;const Z=(x.singles!==void 0?x.singles:Math.max(0,P-N-D-F))*1+N*2+D*3+F*4,q=Z>0?Z:x.total_bases||0;s+=q});const p=n>0?a/n:0,m=Math.round(p*1e3)/1e3,h=n+d+l+y,_=h>0?(a+d+l)/h:t>0?(a+d+l)/t:0,I=Math.round(_*1e3)/1e3,k=n>0?s/n:0,S=Math.round(k*1e3)/1e3,$=Math.round((I+S)*1e3)/1e3,E=a+d+l,w=E>0?o/E:0;return{pa:t,ab:n,h:a,doubles:f,triples:g,hr:u,tb:s,sf:y,sh:b,bb:d,hbp:l,rbi:r,r:o,sb:i,so:c,ob:E,avg:m,obp:I,slg:S,ops:$,runRate:w,avgStr:m.toFixed(3).replace(/^0/,""),obpStr:I.toFixed(3).replace(/^0/,""),slgStr:S.toFixed(3).replace(/^0/,""),opsStr:$.toFixed(3),runRateStr:E>0?(w*100).toFixed(1)+"%":"0.0%",bbRate:t>0?(d+l)/t:0,soRate:t>0?c/t:0}}function nn(e){let t=0,n=0,a=0,s=0,r=0,o=0,i=0,d=0,l=0,c=0;e.forEach(p=>{t+=p.outs||0,n+=p.earned_runs||0,a+=p.hits_allowed||0,s+=(p.walks_allowed||0)+(p.hit_batters||0),r+=p.strike_outs||0,o+=p.batters_faced||0,i+=p.pitch_count||0,d+=p.strikes||0,l+=p.wins||0,c+=p.losses||0});const u=t/3,f=u>0?n*7/u:0,g=u>0?(a+s)/u:0,y=u>0?r*7/u:0,b=u>0?s*7/u:0;return{outs:t,er:n,h:a,bb:s,so:r,bf:o,pc:i,st:d,wins:l,losses:c,era:f,whip:g,k7:y,bb7:b,eraStr:f.toFixed(2),whipStr:g.toFixed(2),k7Str:y.toFixed(2),bb7Str:b.toFixed(2),kRate:o>0?r/o:0,bbRate:o>0?s/o:0,kbb:s>0?r/s:r>0?99.9:0,sRate:i>0?d/i:0}}async function er(){var d,l,c,u,f,g;await Ea();const e=((d=document.getElementById("ps-mode"))==null?void 0:d.value)||"single",t=(l=document.getElementById("ps-player"))==null?void 0:l.value,n=((c=document.getElementById("ps-role"))==null?void 0:c.value)||"batter",a=((u=document.getElementById("ps-limit-games"))==null?void 0:u.value)||"5",s=((f=document.getElementById("ps-ma-unit"))==null?void 0:f.value)||"ab",r=parseInt(((g=document.getElementById("ps-ma-window"))==null?void 0:g.value)||"10",10),o=document.getElementById("ps-single-container"),i=document.getElementById("ps-all-container");e==="single"?(o==null||o.classList.remove("hidden"),i==null||i.classList.add("hidden"),t&&Ei(t,n,a,s,r)):(o==null||o.classList.add("hidden"),i==null||i.classList.remove("hidden"),ki(n,a,s,r))}function Ei(e,t,n,a,s){var b;const{games:r,bStats:o,pStats:i}=Rn,d=((b=Vt.find(p=>p.id==e))==null?void 0:b.name)||"選手",c=(t==="batter"?o:i).filter(p=>p.player_id==e).map(p=>{const m=r.find(h=>h.id===p.game_id);return{date:(m==null?void 0:m.date)||"",game:m,stats:p}}).filter(p=>p.date).sort((p,m)=>p.date.localeCompare(m.date)),u=t==="batter"?tn(c.map(p=>p.stats)):nn(c.map(p=>p.stats));let f=[...c];if(n!=="all"){const p=parseInt(n,10);f.length>p&&(f=f.slice(f.length-p))}const g=t==="batter"?tn(f.map(p=>p.stats)):nn(f.map(p=>p.stats));_i(d,t,g,u,f);const y=ao(f,t,a,s);Ii(d,t,f),$i(d,t,y,a,s),Si(t,f)}function _i(e,t,n,a,s){const r=document.getElementById("ps-highlight-cards");if(r)if(t==="batter"){const o=n.avg-a.avg,i=(o>=0?"+":"")+o.toFixed(3).replace(/^0/,""),d=o>=.03,l=o<=-.05,c=d?"🔥 好調":l?"❄️ 不調":"⚖️ 安定",u=d?"bg-red-100 text-red-700 border-red-200":l?"bg-blue-100 text-blue-700 border-blue-200":"bg-gray-100 text-gray-700 border-gray-200";let f=0;for(let g=s.length-1;g>=0;g--){const y=s[g].stats.hits||0,b=s[g].stats.at_bats||0;if(y>0)f++;else if(b>0)break}r.innerHTML=`
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
        `}}function ao(e,t,n,a){var r,o,i,d,l,c;const s=[];if(e.length===0)return s;if(n==="game")for(let u=0;u<e.length;u++){const f=Math.max(0,u-a+1),g=e.slice(f,u+1),y=g.map(h=>h.stats),b=t==="batter"?tn(y):nn(y),p=e[u],m=Pt((r=p.game)==null?void 0:r.team_first)?(o=p.game)==null?void 0:o.team_second:(i=p.game)==null?void 0:i.team_first;s.push({label:`${p.date.substring(5)} vs ${m||""}`,date:p.date,windowSpan:`${f+1}〜${u+1}試合目 (${g.length}試合)`,calc:b,stats:y})}else for(let u=0;u<e.length;u++){let f=0;const g=[];for(let h=u;h>=0;h--){g.unshift(e[h]);const _=t==="batter"?e[h].stats.at_bats||0:1;if(f+=_,f>=a)break}const y=g.map(h=>h.stats),b=t==="batter"?tn(y):nn(y),p=e[u],m=Pt((d=p.game)==null?void 0:d.team_first)?(l=p.game)==null?void 0:l.team_second:(c=p.game)==null?void 0:c.team_first;s.push({label:`${p.date.substring(5)} vs ${m||""}`,date:p.date,windowSpan:t==="batter"?`直近 ${b.ab} 打数`:`直近 ${g.length} 登板`,calc:b,stats:y})}return s}function Ii(e,t,n){dn.rawGraph&&dn.rawGraph.destroy();const a=document.getElementById("chart-ps-raw-stats");if(!a||n.length===0)return;const s=[],r=[];let o=[];n.forEach(i=>{var c,u,f;o.push(i.stats);const d=Pt((c=i.game)==null?void 0:c.team_first)?(u=i.game)==null?void 0:u.team_second:(f=i.game)==null?void 0:f.team_first;s.push(`${i.date.substring(5)} vs ${d||""}`);const l=t==="batter"?tn(o):nn(o);r.push(l)}),t==="batter"?dn.rawGraph=new window.Chart(a.getContext("2d"),{type:"line",data:{labels:s,datasets:[{label:"累積打率",data:r.map(i=>i.avg),borderColor:"#ef4444",backgroundColor:"#ef4444",tension:.2},{label:"累積出塁率",data:r.map(i=>i.obp),borderColor:"#3b82f6",backgroundColor:"#3b82f6",tension:.2},{label:"累積OPS",data:r.map(i=>i.ops),borderColor:"#8b5cf6",backgroundColor:"#8b5cf6",borderDash:[4,4],tension:.2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"}},scales:{y:{min:0,ticks:{font:{size:10}}},x:{ticks:{font:{size:10},maxRotation:45}}}}}):dn.rawGraph=new window.Chart(a.getContext("2d"),{type:"line",data:{labels:s,datasets:[{label:"累積防御率",data:r.map(i=>i.era),borderColor:"#ef4444",backgroundColor:"#ef4444",tension:.2},{label:"累積WHIP",data:r.map(i=>i.whip),borderColor:"#3b82f6",backgroundColor:"#3b82f6",tension:.2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"}},scales:{y:{min:0,ticks:{font:{size:10}}},x:{ticks:{font:{size:10},maxRotation:45}}}}})}function $i(e,t,n,a,s){const r=document.getElementById("ps-ma-graph-subtitle");r&&(r.textContent=`(${e} - 直近${s}${a==="ab"?"打数/登板":"試合"}移動平均)`),dn.maGraph&&dn.maGraph.destroy();const o=n.map(d=>d.label),i=document.getElementById("chart-ps-moving-avg");i&&(t==="batter"?dn.maGraph=new window.Chart(i.getContext("2d"),{type:"line",data:{labels:o,datasets:[{label:"移動平均 打率",data:n.map(d=>d.calc.avg),borderColor:"#ef4444",backgroundColor:"#ef4444",tension:.2},{label:"移動平均 出塁率",data:n.map(d=>d.calc.obp),borderColor:"#3b82f6",backgroundColor:"#3b82f6",tension:.2},{label:"移動平均 OPS",data:n.map(d=>d.calc.ops),borderColor:"#8b5cf6",backgroundColor:"#8b5cf6",borderDash:[4,4],tension:.2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"}},scales:{y:{min:0,ticks:{font:{size:10}}},x:{ticks:{font:{size:10},maxRotation:45}}}}}):dn.maGraph=new window.Chart(i.getContext("2d"),{type:"line",data:{labels:o,datasets:[{label:"移動平均 防御率",data:n.map(d=>d.calc.era),borderColor:"#ef4444",backgroundColor:"#ef4444",tension:.2},{label:"移動平均 WHIP",data:n.map(d=>d.calc.whip),borderColor:"#3b82f6",backgroundColor:"#3b82f6",tension:.2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"}},scales:{y:{min:0,ticks:{font:{size:10}}},x:{ticks:{font:{size:10},maxRotation:45}}}}}))}function Si(e,t){const n=document.getElementById("ps-game-thead"),a=document.getElementById("ps-game-tbody"),s=document.getElementById("ps-game-count-label");if(!n||!a)return;s&&(s.textContent=`対象全 ${t.length} 試合（最新順）`);const r=[...t].reverse();e==="batter"?(n.innerHTML=`
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
        `,a.innerHTML=r.map(o=>{var L,T,C;const i=o.stats,d=Pt((L=o.game)==null?void 0:L.team_first)?(T=o.game)==null?void 0:T.team_second:(C=o.game)==null?void 0:C.team_first,l=i.plate_appearances||0,c=i.at_bats||0,u=i.hits||0,f=i.doubles||0,g=i.triples||0,y=i.home_runs||0,b=i.singles!==void 0?i.singles:Math.max(0,u-f-g-y),p=i.runs_batted_in||0,m=i.runs||0,h=i.walks||0,_=i.hit_by_pitch||0,I=i.strikeouts||i.strike_outs||0,k=i.sacrifice_flies||i.sac_flies||0,S=(i.sacrifice_hits||i.sac_bunts||0)+k,$=i.stolen_bases||0,E=i.errors||0,w=c>0?(u/c).toFixed(3).replace(/^0/,""):".000",x=c+h+_+k,v=x>0?(u+h+_)/x:l>0?(u+h+_)/l:0,A=Math.round(v*1e3)/1e3;A.toFixed(3).replace(/^0/,"");const P=b+f*2+g*3+y*4,N=P>0?P:i.total_bases||0,D=c>0?N/c:0,F=Math.round(D*1e3)/1e3;F.toFixed(3).replace(/^0/,"");const R=(Math.round((A+F)*1e3)/1e3).toFixed(3);return`
                <tr class="hover:bg-gray-50">
                    <td class="p-2 border font-bold">${o.date}</td>
                    <td class="p-2 border">${d||"不明"}</td>
                    <td class="p-2 border text-center">${l}</td>
                    <td class="p-2 border text-center font-bold">${c}</td>
                    <td class="p-2 border text-center text-green-600 font-bold ${u>0?"bg-green-50":""}">${u}</td>
                    <td class="p-2 border text-center">${b}</td>
                    <td class="p-2 border text-center">${f}</td>
                    <td class="p-2 border text-center">${g}</td>
                    <td class="p-2 border text-center text-red-600 font-bold ${y>0?"bg-red-50":""}">${y}</td>
                    <td class="p-2 border text-center font-bold">${p}</td>
                    <td class="p-2 border text-center">${m}</td>
                    <td class="p-2 border text-center">${h}</td>
                    <td class="p-2 border text-center">${_}</td>
                    <td class="p-2 border text-center text-gray-500">${I}</td>
                    <td class="p-2 border text-center">${S}</td>
                    <td class="p-2 border text-center">${$}</td>
                    <td class="p-2 border text-center text-gray-500">${E}</td>
                    <td class="p-2 border text-center font-black text-red-600">${w}</td>
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
        `,a.innerHTML=r.map(o=>{var $,E,w;const i=o.stats,d=Pt(($=o.game)==null?void 0:$.team_first)?(E=o.game)==null?void 0:E.team_second:(w=o.game)==null?void 0:w.team_first,l=i.outs||0,c=`${Math.floor(l/3)}${l%3!==0?"."+l%3:""}`,u=i.pitch_count||0,f=i.strikes||0,g=i.hits_allowed||0,y=i.home_runs_allowed||0,b=i.walks_allowed||0,p=i.hit_batters||0,m=i.strike_outs||0,h=i.runs_allowed||0,_=i.earned_runs||0,I=l/3,k=I>0?(_*7/I).toFixed(2):"0.00",S=I>0?((g+b)/I).toFixed(2):"0.00";return`
                <tr class="hover:bg-gray-50">
                    <td class="p-2 border font-bold">${o.date}</td>
                    <td class="p-2 border">${d||"不明"}</td>
                    <td class="p-2 border text-center font-bold">${c}</td>
                    <td class="p-2 border text-center">${u} (${f})</td>
                    <td class="p-2 border text-center">${g}</td>
                    <td class="p-2 border text-center text-red-600">${y}</td>
                    <td class="p-2 border text-center">${b}</td>
                    <td class="p-2 border text-center">${p}</td>
                    <td class="p-2 border text-center text-green-600 font-bold">${m}</td>
                    <td class="p-2 border text-center text-red-600">${h}</td>
                    <td class="p-2 border text-center text-red-600 font-bold">${_}</td>
                    <td class="p-2 border text-center font-black text-red-600">${k}</td>
                    <td class="p-2 border text-center font-bold text-blue-600">${S}</td>
                </tr>
            `}).join(""))}function ki(e,t,n,a){const s=document.getElementById("ps-all-title"),r=document.getElementById("ps-all-subtitle"),o=document.getElementById("ps-all-thead"),i=document.getElementById("ps-all-tbody");if(!o||!i)return;const{games:d,bStats:l,pStats:c}=Rn,u=t==="all"?"全試合":`直近 ${t} 試合`;s&&(s.textContent=`👥 全選手成績一覧 (${e==="batter"?"打撃":"投手"})`),r&&(r.textContent=`対象: ${u} / 移動平均: 直近${a}${n==="ab"?"打数/登板":"試合"} (各列クリックでソート)`);const f=new Set;l.forEach(m=>f.add(m.player_id)),c.forEach(m=>f.add(m.player_id));const y=Vt.filter(m=>f.has(m.id)).sort((m,h)=>m.name.localeCompare(h.name)).map(m=>{let I=[...(e==="batter"?l:c).filter(E=>E.player_id==m.id).map(E=>{const w=d.find(x=>x.id===E.game_id);return{date:(w==null?void 0:w.date)||"",game:w,stats:E}}).filter(E=>E.date).sort((E,w)=>E.date.localeCompare(w.date))];if(t!=="all"){const E=parseInt(t,10);I.length>E&&(I=I.slice(I.length-E))}const k=e==="batter"?tn(I.map(E=>E.stats)):nn(I.map(E=>E.stats)),S=ao(I,e,n,a),$=S.length>0?S[S.length-1].calc:k;return{player:m,name:m.name,gameCount:I.length,calcPeriod:k,latestMa:$,ab:k.ab,h:k.h,hr:k.hr,rbi:k.rbi,r:k.r,bb:k.bb+k.hbp,avg:k.avg,obp:k.obp,slg:k.slg,ops:k.ops,runRate:k.runRate,maAvg:$.avg,maOps:$.ops,outs:k.outs,so:k.so,pBb:k.bb,wins:k.wins,losses:k.losses,era:k.era,whip:k.whip,maEra:$.era,maWhip:$.whip}}),b=jn[e];y.sort((m,h)=>{let _=m[b.key],I=h[b.key];return _===void 0&&(_=0),I===void 0&&(I=0),typeof _=="string"?b.order==="asc"?_.localeCompare(I):I.localeCompare(_):b.order==="asc"?_-I:I-_});const p=m=>b.key===m?b.order==="asc"?" ▲":" ▼":"";e==="batter"?(o.innerHTML=`
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
        `,i.innerHTML=y.map(m=>`
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
        `,i.innerHTML=y.map(m=>`
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
        `).join("")),o.querySelectorAll("th[data-ps-sort]").forEach(m=>{m.addEventListener("click",()=>{const h=m.dataset.psSort;jn[e].key===h?jn[e].order=jn[e].order==="asc"?"desc":"asc":(jn[e].key=h,jn[e].order=h==="era"||h==="whip"||h==="maEra"||h==="maWhip"||h==="name"?"asc":"desc"),er()})})}function Li(){var c,u,f,g,y,b;const e=((c=document.getElementById("ps-mode"))==null?void 0:c.value)||"single",t=((u=document.getElementById("ps-role"))==null?void 0:u.value)||"batter",n=(f=document.getElementById("ps-player"))==null?void 0:f.value,a=((g=Vt.find(p=>p.id==n))==null?void 0:g.name)||"全選手";let s="\uFEFF",r=`ants_stats_${e}_${t}_${a}_${new Date().toISOString().substring(0,10)}.csv`,o=null;if(e==="single"?o=(y=document.querySelector("#ps-game-tbody"))==null?void 0:y.closest("table"):o=(b=document.querySelector("#ps-all-tbody"))==null?void 0:b.closest("table"),!o){alert("出力対象のテーブルが見つかりません。");return}Array.from(o.querySelectorAll("tr")).forEach(p=>{const h=Array.from(p.querySelectorAll("th, td")).map(_=>`"${_.textContent.trim().replace(/"/g,'""')}"`).join(",");s+=h+`
`});const d=new Blob([s],{type:"text/csv;charset=utf-8;"}),l=document.createElement("a");l.href=URL.createObjectURL(d),l.download=r,l.click(),URL.revokeObjectURL(l.href)}function so(){const{games:e,bStats:t,pStats:n}=Rn,a=e?e.length:0,s=a*2,r=document.getElementById("ranking-summary-info");r&&(r.textContent=`対象試合: ${a}試合 / 規定打席: ${s}打席 (試合数×2)`);const o=document.getElementById("ranking-mode-note");o&&(o.textContent=qa?"※規定打席＝対象試合数×2打席（規定到達者を上位、規定未満を薄グレー網掛けで下段に表示）":"※規定打席を考慮せず全打者を合算順位で表示中（規定打席＝対象試合数×2打席）");const i={},d={};t.forEach(l=>{i[l.player_id]||(i[l.player_id]=[]),i[l.player_id].push(l)}),n.forEach(l=>{d[l.player_id]||(d[l.player_id]=[]),d[l.player_id].push(l)}),Ls.batter=Object.keys(i).map(l=>{var u;const c=tn(i[l]);return{name:((u=Vt.find(f=>f.id==l))==null?void 0:u.name)||"不明",...c,meetsRegulation:c.pa>=s}}).filter(l=>l.pa>0),Ls.pitcher=Object.keys(d).map(l=>{var c;return{name:((c=Vt.find(u=>u.id==l))==null?void 0:c.name)||"不明",...nn(d[l])}}).filter(l=>l.outs>0),As("batter"),As("pitcher")}function Bi(e,t){_n[e].key===t?_n[e].order=_n[e].order==="asc"?"desc":"asc":(_n[e].key=t,t==="era"||t==="whip"||t==="bb7"||t==="bbRate"||t==="name"?_n[e].order="asc":_n[e].order="desc"),As(e)}function As(e){const t=_n[e],n=Ls[e];if(n.sort((s,r)=>{if(e==="batter"&&qa&&s.meetsRegulation!==r.meetsRegulation)return s.meetsRegulation?-1:1;let o=s[t.key],i=r[t.key];return typeof o=="string"?t.order==="asc"?o.localeCompare(i):i.localeCompare(o):t.order==="asc"?o-i:i-o}),e==="batter"){const s=document.getElementById("ranking-batter-tbody");if(s)if(n.length===0)s.innerHTML='<tr><td colspan="15" class="p-4 text-center text-gray-500">該当する選手データがありません</td></tr>';else{const r="background-image: repeating-linear-gradient(135deg, #f3f4f6 0px, #f3f4f6 6px, #e5e7eb 6px, #e5e7eb 12px);";let o=!1;s.innerHTML=n.map(i=>{const d=qa&&!i.meetsRegulation,l=d&&!o;d&&(o=!0);const c=d?`border-b text-gray-500 ${l?"border-t-2 border-t-gray-300":""}`:"border-b hover:bg-gray-50",u=d?`style="${r}"`:"",f=d?'<span class="ml-1 text-[10px] font-normal px-1 py-0.5 rounded bg-gray-300/80 text-gray-700">規定未満</span>':"",g=d?"font-bold text-gray-600":"font-bold text-red-600",y=d?"font-bold text-gray-600":"text-purple-700 font-bold bg-purple-50",b=d?"text-gray-600":"text-blue-600",p=d?"text-gray-600":"text-teal-600";return`<tr class="${c}" ${u}><td class="p-2 font-bold">${te(i.name)}${f}</td><td class="p-2">${i.pa}</td><td class="p-2">${i.ab}</td><td class="p-2 ${g}">${i.avgStr}</td><td class="p-2 ${y}">${i.opsStr}</td><td class="p-2 ${b}">${i.obpStr}</td><td class="p-2 ${p}">${i.slgStr}</td><td class="p-2">${i.h}</td><td class="p-2">${i.tb}</td><td class="p-2">${i.bb}</td><td class="p-2">${i.hbp}</td><td class="p-2">${i.rbi}</td><td class="p-2">${i.r}</td><td class="p-2">${i.sb}</td><td class="p-2">${i.hr}</td></tr>`}).join("")}}else document.getElementById("ranking-pitcher-tbody").innerHTML=n.map(s=>`<tr class="border-b hover:bg-gray-50"><td class="p-2 font-bold">${te(s.name)}</td><td class="p-2 text-green-700 font-bold">${s.wins}</td><td class="p-2 text-red-600 font-bold">${s.losses}</td><td class="p-2">${s.outs}</td><td class="p-2 text-red-600 font-bold">${s.era.toFixed(2)}</td><td class="p-2">${s.whip.toFixed(2)}</td><td class="p-2">${s.k7.toFixed(2)}</td><td class="p-2">${s.bb7.toFixed(2)}</td><td class="p-2">${s.kRate.toFixed(3)}</td><td class="p-2">${s.bbRate.toFixed(3)}</td><td class="p-2">${(s.sRate*100).toFixed(1)}</td><td class="p-2">${s.kbb.toFixed(2)}</td></tr>`).join("");document.querySelectorAll(`#tab-content-ranking th[data-role="${e}"] span`).forEach(s=>s.textContent="");const a=document.querySelector(`#tab-content-ranking th[data-role="${e}"][data-sort="${t.key}"] span`);a&&(a.textContent=t.order==="asc"?" ▲":" ▼")}async function ma(){var f,g,y,b,p;await Ea();const e=((f=document.getElementById("comp-role"))==null?void 0:f.value)||"batter",n=(((g=document.getElementById("comp-calc-mode"))==null?void 0:g.value)||"cumulative")==="moving_avg",a=Math.max(1,parseInt((y=document.getElementById("comp-ma-window"))==null?void 0:y.value,10)||5),s=Array.from(document.querySelectorAll(".comp-player-cb:checked")).map(m=>m.value);(b=document.getElementById("comp-window-wrap"))==null||b.classList.toggle("hidden",!n),(p=document.getElementById("comp-ma-note"))==null||p.classList.toggle("hidden",!n),Object.values(ys).forEach(m=>m.destroy()),ys={};const r=document.getElementById("comp-charts-container");if(r&&(r.innerHTML=""),s.length===0)return;const{games:o,bStats:i,pStats:d}=Rn,l=[...new Set(o.map(m=>Mn(m.date)).filter(Boolean))].sort(),c=["#ef4444","#3b82f6","#10b981","#f59e0b","#8b5cf6","#06b6d4","#ec4899"];(e==="batter"?[{key:"avg",name:"打率"},{key:"ops",name:"OPS"},{key:"obp",name:"出塁率"},{key:"slg",name:"長打率"}]:[{key:"era",name:"防御率"},{key:"whip",name:"WHIP"},{key:"k7",name:"K/7"},{key:"bb7",name:"BB/7"},{key:"sRate",name:"S率(%)"}]).forEach((m,h)=>{const _=`chart-comp-${h}`,I=document.createElement("div");I.className="bg-white p-4 rounded shadow-md relative h-[300px] md:h-[400px]",I.innerHTML=`<canvas id="${_}"></canvas>`,r.appendChild(I);const k=s.map(($,E)=>{var N;const x=(e==="batter"?i:d).filter(D=>D.player_id==$).map(D=>{var F;return{date:Mn((F=o.find(R=>R.id===D.game_id))==null?void 0:F.date),stats:D}}).filter(D=>D.date).sort((D,F)=>D.date.localeCompare(F.date)),v={};if(n)for(let D=0;D<x.length;D++){const F=x.slice(Math.max(0,D-a+1),D+1).map(T=>T.stats);let L=(e==="batter"?tn(F):nn(F))[m.key];m.key==="sRate"&&(L=L*100),v[x[D].date]=L}else{const D=[];x.forEach(F=>{D.push(F.stats);let L=(e==="batter"?tn(D):nn(D))[m.key];m.key==="sRate"&&(L=L*100),v[F.date]=L})}let A=null;const P=l.map(D=>(v[D]!==void 0&&(A=v[D]),A));return{label:((N=Vt.find(D=>D.id==$))==null?void 0:N.name)||"不明",data:P,borderColor:c[E%c.length],spanGaps:!0,tension:.1}}),S=n?`選手比較・直近${a}試合 移動平均 (${m.name})`:`選手比較・累積 (${m.name})`;ys[_]=new window.Chart(document.getElementById(_).getContext("2d"),{type:"line",data:{labels:l,datasets:k},options:{responsive:!0,maintainAspectRatio:!1,plugins:{title:{display:!0,text:S}}}})})}function tr(){const e=document.getElementById("home-team-list");e&&(e.innerHTML=De.homeTeamNames.map(t=>`<div class="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2">
            <span>${t}</span>
            <button onclick="window.dashboard_removeHomeTeam('${t}')" class="text-red-500 hover:text-red-700 font-bold">&times;</button>
        </div>`).join(""))}async function Ai(){const e=document.getElementById("new-home-team-name"),t=e.value.trim();if(!t||De.homeTeamNames.includes(t))return;const n=[...De.homeTeamNames,t];localStorage.setItem("ants_homeTeamNames",JSON.stringify(n)),W("自チーム名を追加中 (DB同期)...");try{await Qs("homeTeamNames",n,"DASHBOARD_HOME_TEAMS",{teams:n,_updatedAt:Date.now()}),Pn(!0,"自チーム名をSupabase DBへ保存・同期しました")}catch(a){console.error("Supabase sync failed",a),Pn(!1,`DB同期に失敗 (このブラウザのみ保存): ${a.message}`)}finally{G()}De.homeTeamNames=n,tr(),e.value="",zt()}window.dashboard_removeHomeTeam=async function(e){if(!confirm(`「${e}」を自チームから削除しますか？`))return;const t=De.homeTeamNames.filter(n=>n!==e);localStorage.setItem("ants_homeTeamNames",JSON.stringify(t)),W("自チーム名を削除中 (DB同期)...");try{await Qs("homeTeamNames",t,"DASHBOARD_HOME_TEAMS",{teams:t,_updatedAt:Date.now()}),Pn(!0,"自チーム名をSupabase DBから更新・同期しました")}catch(n){console.error("Supabase sync failed",n),Pn(!1,`DB同期に失敗 (このブラウザのみ保存): ${n.message}`)}finally{G()}De.homeTeamNames=t,tr(),zt()};async function Ti(){const e=document.getElementById("csv-import-file"),t=document.getElementById("csv-import-type").value,n=document.getElementById("import-result-msg");if(!e.files||e.files.length===0)return alert("CSVファイルを選択してください。");const a=e.files[0],s=new FileReader;s.onload=async r=>{let o=r.target.result;o=o.replace(/^\uFEFF/,""),o=o.replace(/([A-Za-z0-9]+)(\d{3},[^0-9,])/g,`$1
$2`);const i=yi(o);if(i.length<2)return alert("データが空かフォーマットが不正です。");W("データベースへ保存中..."),n.classList.add("hidden");try{const d=new Map,l=new Map,c=[];for(let b=1;b<i.length;b++){const p=i[b];if(p.length<30)continue;const m=parseInt(p[0]),h=parseInt(p[3]);if(isNaN(m)||isNaN(h))continue;d.set(m,{id:m,name:p[1]||"不明",uniform_number:p[2]||null});let _=null;if(p[4]&&p[4].trim()){const k=p[4].trim().replace(/\//g,"-"),S=new Date(k);if(isNaN(S.getTime())){const $=k.split("-");if($.length===3){const E=parseInt($[0],10),w=parseInt($[1],10),x=parseInt($[2],10);!isNaN(E)&&!isNaN(w)&&!isNaN(x)&&(_=`${E}-${String(w).padStart(2,"0")}-${String(x).padStart(2,"0")}`)}}else{const $=S.getFullYear(),E=String(S.getMonth()+1).padStart(2,"0"),w=String(S.getDate()).padStart(2,"0");_=`${$}-${E}-${w}`}}l.set(h,{id:h,date:_,team_first:p[5]||null,score:p[6]||null,team_second:p[7]||null,title:p[8]||null,category:p[9]||null,stadium:p[10]||null});const I={player_id:m,game_id:h};t==="batter"?["plate_appearances","at_bats","runs","hits","doubles","triples","home_runs","total_bases","runs_batted_in","stolen_bases","caught_stealing","sacrifice_hits","sacrifice_flies","walks","hit_by_pitch","strike_outs","left_on_base","double_plays","scoring_position_at_bats","scoring_position_hits","go","fo"].forEach((S,$)=>I[S]=parseInt(p[11+$])||0):t==="pitcher"&&["is_starter","wins","losses","saves","holds","qs","outs","pitch_count","strikes","batters_faced","at_bats","hits_allowed","home_runs_allowed","walks_allowed","hit_batters","strike_outs","runs_allowed","earned_runs","wild_pitches","balks","sacrifice_hits_allowed","sacrifice_flies_allowed","go","fo"].forEach((S,$)=>I[S]=parseInt(p[11+$])||0),c.push(I)}const{error:u}=await B.from("players").upsert(Array.from(d.values()));if(u)throw u;const{error:f}=await B.from("games").upsert(Array.from(l.values()));if(f)throw f;const g=t==="batter"?"batter_stats":"pitcher_stats",{error:y}=await B.from(g).upsert(c,{onConflict:"player_id, game_id"});if(y)throw y;await fe("IMPORT_CSV",`成績データ(${t==="batter"?"打者":"投手"})を${c.length}件インポートしました`),n.textContent=`成功: ${c.length} 件のデータをインポートしました。`,n.className="mt-4 text-sm font-bold text-green-600",n.classList.remove("hidden"),e.value="",Zs()}catch(d){n.textContent=`エラー: ${d.message}`,n.className="mt-4 text-sm font-bold text-red-600",n.classList.remove("hidden")}finally{G()}},s.readAsText(a)}let mt=null,Oe=null,ln=null;const tt={0:"ピッチャー",1:"キャッチャー",2:"ファースト",3:"セカンド",4:"サード",5:"ショート",6:"レフト",7:"センター",8:"ライト",9:"指名打者"},Di={0:"ピッチャー",1:"キャッチャー",2:"ファースト",3:"セカンド",4:"サード",5:"ショート",6:"外野"};function te(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function gt(e,t=null){if(e==null||e==="")return t;if(typeof e!="string")return e;try{return JSON.parse(e)}catch{return t}}function Ci(e){if(!e||isNaN(Number(e)))return"";const t=new Date(Number(e));return isNaN(t.getTime())?"":`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}function Ca(e,t=null){const n=t||gt(e==null?void 0:e.cf,{});return(n==null?void 0:n.date)||(e==null?void 0:e.da)||Ci(e==null?void 0:e.tm)||""}function kr(e){if(!e)return"";const t=String(e).split("T")[0].replace(/\//g,"-").split("-");if(t.length===3){const n=parseInt(t[0],10),a=parseInt(t[1],10),s=parseInt(t[2],10);if(!isNaN(n)&&!isNaN(a)&&!isNaN(s))return`${n}-${a}-${s}`}return e}function Kn(e){if(!e||!e.sc)return"";const t=gt(e.sc,null);return Array.isArray(t)&&t[1]&&Array.isArray(t[1])&&t[1][0]&&t[1][1]?`${t[1][0][0]}-${t[1][1][0]}`:""}function Ts(e){return e&&(e.disp||e.di||((e.la||e.last||"")+(e.fi||e.first?" "+(e.fi||e.first):"")).trim()||e.na)||"不明"}function ro(e){const t=new Map,n=new Map,a=new Map,s=[],r=[],o=[["選手ID","選手名","背番号","試合ID","日付","先攻チーム","得点","後攻チーム","タイトル","カテゴリ","球場","打席","打数","得点","安打","二塁打","三塁打","本塁打","塁打","打点","盗塁","盗塁死","犠打","犠飛","四球","死球","三振","残塁","併殺打","得点圏打数","得点圏安打","GO","FO"]],i=[["選手ID","選手名","背番号","試合ID","日付","先攻チーム","得点","後攻チーム","タイトル","カテゴリ","球場","先発","勝数","負数","セーブ","ホールド","QS","アウト数","球数","S数","打者","打数","安打","本塁打","四球","死球","三振","失点","自責点","暴投","ボーク","犠打","犠飛","GO","FO"]],d=new Map;Array.isArray(e.fld)&&e.fld.forEach(b=>{const p=parseInt(b.gid,10),m=parseInt(b.pid,10);isNaN(p)||isNaN(m)||m<=0||(d.has(p)||d.set(p,[]),d.get(p).push(b))});const l=new Map;(Array.isArray(e.game)?e.game:e.game?[e.game]:e.cd&&e.cf?[e]:[]).forEach(b=>{const p=parseInt(b.gid??b._id,10);if(isNaN(p))return;l.set(p,b);const m=gt(b.cf,{}),h=Ca(b,m),_=Mn(h)||null,I=Kn(b),k=b.tt||(m==null?void 0:m.title)||null,S=b.pa||(m==null?void 0:m.stadi)||null;n.set(p,{id:p,date:_,team_first:b.tn||null,score:I||null,team_second:b.bn||null,title:k,category:b.ca||null,stadium:S}),a.set(p,{gid:p,date:_||"",rawDate:h,tn:b.tn||"",bn:b.bn||"",tt:k||"",ca:b.ca||"",pa:S||"",ti:b.ti||"",bi:b.bi||"",sc:b.sc||"",cf:b.cf||"",cd:b.cd||"",pl:b.pl||"",te:b.te||"",fld:d.get(p)||[],updatedAt:Date.now()});const $=gt(b.pl,[]);Array.isArray($)&&$.forEach(E=>{const w=parseInt(E.id??E.pid,10);isNaN(w)||w<=0||t.has(w)||t.set(w,{id:w,name:Ts(E),uniform_number:E.num!==void 0&&E.num!==null&&E.num!==""?String(E.num):null})})}),Array.isArray(e.player)&&e.player.forEach(b=>{const p=parseInt(b.pid??b._id,10);if(isNaN(p)||p<=0)return;const m=Ts(b),h=b.nu!==void 0&&b.nu!==null&&String(b.nu)!==""?String(b.nu):"";t.set(p,{id:p,name:m,uniform_number:h||null})});const u=(b,p,m)=>{if(isNaN(b)||b<=0||isNaN(p)||!Array.isArray(m)||m.length<22)return;const h=l.get(p),_=h?gt(h.cf,{}):null,I=h?Kn(h):"",k=h?kr(Ca(h,_)):"",S=t.get(b)||{name:"不明",uniform_number:null},$=m.length>=23?m[21]??0:m[20]??0,E=m.length>=23?m[22]??0:m[21]??0,w=[m[0]??0,m[1]??0,m[2]??0,m[3]??0,m[4]??0,m[5]??0,m[6]??0,m[7]??0,m[8]??0,m[9]??0,m[10]??0,m[11]??0,m[12]??0,m[13]??0,m[14]??0,m[15]??0,m[16]??0,m[17]??0,m[18]??0,m[19]??0,$,E];o.push([b,S.name,S.uniform_number||"",p,k,(h==null?void 0:h.tn)||"",I,(h==null?void 0:h.bn)||"",(h==null?void 0:h.tt)||(_==null?void 0:_.title)||"",(h==null?void 0:h.ca)||"",(h==null?void 0:h.pa)||(_==null?void 0:_.stadi)||"",...w]);const x=["plate_appearances","at_bats","runs","hits","doubles","triples","home_runs","total_bases","runs_batted_in","stolen_bases","caught_stealing","sacrifice_hits","sacrifice_flies","walks","hit_by_pitch","strike_outs","left_on_base","double_plays","scoring_position_at_bats","scoring_position_hits","go","fo"],v={player_id:b,game_id:p};x.forEach((A,P)=>{v[A]=parseInt(w[P],10)||0}),s.push(v)},f=(b,p,m)=>{if(isNaN(b)||b<=0||isNaN(p)||!Array.isArray(m)||m.length<24)return;const h=l.get(p),_=h?gt(h.cf,{}):null,I=h?Kn(h):"",k=h?kr(Ca(h,_)):"",S=t.get(b)||{name:"不明",uniform_number:null},$=parseInt(m[5],10)||0,E=parseInt(m[19],10)||0,w=Math.max(0,$-E),x=[m[0]??0,m[1]??0,m[2]??0,m[3]??0,m[21]??0,m[20]??0,m[4]??0,$,w,m[6]??0,m[7]??0,m[8]??0,m[9]??0,m[10]??0,m[11]??0,m[12]??0,m[13]??0,m[14]??0,m[15]??0,m[16]??0,m[17]??0,m[18]??0,m[22]??0,m[23]??0];i.push([b,S.name,S.uniform_number||"",p,k,(h==null?void 0:h.tn)||"",I,(h==null?void 0:h.bn)||"",(h==null?void 0:h.tt)||(_==null?void 0:_.title)||"",(h==null?void 0:h.ca)||"",(h==null?void 0:h.pa)||(_==null?void 0:_.stadi)||"",...x]);const v=["is_starter","wins","losses","saves","holds","qs","outs","pitch_count","strikes","batters_faced","at_bats","hits_allowed","home_runs_allowed","walks_allowed","hit_batters","strike_outs","runs_allowed","earned_runs","wild_pitches","balks","sacrifice_hits_allowed","sacrifice_flies_allowed","go","fo"],A={player_id:b,game_id:p};v.forEach((P,N)=>{A[P]=parseInt(x[N],10)||0}),r.push(A)};Array.isArray(e.bat)&&e.bat.forEach(b=>{u(parseInt(b.pid,10),parseInt(b.gid,10),b.st)}),Array.isArray(e.pit)&&e.pit.forEach(b=>{f(parseInt(b.pid,10),parseInt(b.gid,10),b.st)}),s.length===0&&r.length===0&&Array.isArray(e.player)&&e.player.forEach(b=>{const p=parseInt(b.pid??b._id,10);if(isNaN(p)||p<=0||!b.st)return;const m=gt(b.st,null);m&&(Array.isArray(m.bat)&&m.bat.forEach(h=>u(p,parseInt(h.id??h.gid,10),h.st)),Array.isArray(m.pit)&&m.pit.forEach(h=>f(p,parseInt(h.id??h.gid,10),h.st)))});const g=new Set;return s.forEach(b=>g.add(b.player_id)),r.forEach(b=>g.add(b.player_id)),g.size===0&&t.forEach((b,p)=>g.add(p)),{players:Array.from(t.values()).filter(b=>g.has(b.id)),allPlayersMap:t,games:Array.from(n.values()),gameDetails:Array.from(a.values()),batterStats:s,pitcherStats:r,rawBRows:o,rawPRows:i,rawGamesById:l}}function Ni(e){var o;const t=(o=e.target.files)==null?void 0:o[0],n=document.getElementById("backup-extract-msg"),a=document.getElementById("backup-game-select"),s=document.getElementById("backup-game-extract-area");if(!t)return;const r=new FileReader;r.onload=i=>{try{const d=String(i.target.result||"").replace(/^\uFEFF/,""),l=JSON.parse(d);if(!(Array.isArray(l.game)?l.game.length>0:!!(l.game||l.cd&&l.cf)))throw new Error("Scorerのバックアップ／試合データ (gameデータを含むJSON) ではありません。");if(mt=l,Oe=ro(l),a){const u=[...Oe.gameDetails].sort((f,g)=>String(g.date||"").localeCompare(String(f.date||""))||(g.gid||0)-(f.gid||0));a.innerHTML=u.map(f=>{const g=Kn(f);return`<option value="${f.gid}">${te(f.date||"日付不明")} | ${te(f.tn)} ${te(g)} ${te(f.bn)} (${te(f.tt||"試合")}) [ID:${f.gid}]</option>`}).join("")}s&&s.classList.toggle("hidden",Oe.gameDetails.length===0),n&&(n.textContent=`読み込み完了: 試合 ${Oe.games.length}件 / 詳細プレイログ ${Oe.gameDetails.filter(u=>u.cd).length}件 / 打者成績 ${Oe.batterStats.length}件 / 投手成績 ${Oe.pitcherStats.length}件`,n.className="mt-3 text-sm font-bold text-indigo-700",n.classList.remove("hidden"))}catch(d){mt=null,Oe=null,s==null||s.classList.add("hidden"),n&&(n.textContent=`読み込みエラー: ${d.message}`,n.className="mt-3 text-sm font-bold text-red-600",n.classList.remove("hidden"))}},r.readAsText(t)}async function ua(e,t,n,a=void 0){for(let s=0;s<t.length;s+=n){const r=t.slice(s,s+n),{error:o}=a?await B.from(e).upsert(r,a):await B.from(e).upsert(r);if(o)throw o}}async function Pi(){const e=document.getElementById("backup-extract-msg");if(!Oe)return alert("先に scorer_data*.txt または scorer_game*.txt を選択してください。");W("バックアップデータから成績・詳細分析データをDBへ一括インポート中...");try{const{players:t,games:n,gameDetails:a,batterStats:s,pitcherStats:r}=Oe;t.length>0&&await ua("players",t,200),n.length>0&&await ua("games",n,100),s.length>0&&await ua("batter_stats",s,200,{onConflict:"player_id, game_id"}),r.length>0&&await ua("pitcher_stats",r,200,{onConflict:"player_id, game_id"});const o=a.map(i=>({key:`SCORER_GAME_DETAIL_${i.gid}`,data:i}));o.length>0&&await ua("master_data",o,15,{onConflict:"key"}),await fe("IMPORT_BACKUP",`Scorerデータ一括インポート: 試合=${n.length}件, 詳細ログ=${o.length}件, 打者=${s.length}件, 投手=${r.length}件`),e&&(e.textContent=`DBインポート完了: 試合 ${n.length}件 / 詳細プレイ ${o.length}件 / 打者成績 ${s.length}件 / 投手成績 ${r.length}件を保存しました（「詳細分析・文字起こし」タブから即座に参照できます）。`,e.className="mt-3 text-sm font-bold text-green-600",e.classList.remove("hidden")),jt=[],await Zs()}catch(t){console.error(t),e&&(e.textContent=`DBインポートエラー: ${t.message}`,e.className="mt-3 text-sm font-bold text-red-600",e.classList.remove("hidden"))}finally{G()}}function ns(e,t,n){const a=new Blob([e],{type:t}),s=document.createElement("a");s.href=URL.createObjectURL(a),s.download=n,s.click(),URL.revokeObjectURL(s.href)}function Lr(e){if(!Oe)return alert("先に scorer_data*.txt ファイルを選択してください。");const t=e==="batter"?Oe.rawBRows:Oe.rawPRows;if(t.length<=1)return alert("このファイルには該当する集計成績レコード（bat/pit配列）が含まれていません。");const n=e==="batter"?"scorer_stats_raw_b.csv":"scorer_stats_raw_p.csv",a="\uFEFF"+t.map(s=>s.map(r=>{const o=r==null?"":String(r);return o.includes(",")||o.includes('"')||o.includes(`
`)?`"${o.replace(/"/g,'""')}"`:o}).join(",")).join(`
`)+`
`;ns(a,"text/csv;charset=utf-8;",n)}function Mi(){var l;if(!mt||!Oe)return alert("先に scorer_data*.txt ファイルを選択してください。");const e=parseInt((l=document.getElementById("backup-game-select"))==null?void 0:l.value,10);if(isNaN(e))return alert("抽出する試合を選択してください。");const t=Oe.rawGamesById.get(e);if(!t)return alert("選択された試合データが見つかりません。");const n=gt(t.cf,{}),a=gt(t.te,[]),s=gt(t.pl,[]),r=new Set(a.map(c=>c.id).filter(Boolean)),o=new Set(s.map(c=>c.id).filter(Boolean)),i={kind:"GD",team:Array.isArray(mt.team)?mt.team.filter(c=>r.has(c.tid??c.id)):[],player:Array.isArray(mt.player)?mt.player.filter(c=>o.has(c.pid??c.id)):[],game:[t],bat:Array.isArray(mt.bat)?mt.bat.filter(c=>parseInt(c.gid,10)===e):[],pit:Array.isArray(mt.pit)?mt.pit.filter(c=>parseInt(c.gid,10)===e):[],fld:Array.isArray(mt.fld)?mt.fld.filter(c=>parseInt(c.gid,10)===e):[],cat:Array.isArray(mt.cat)?mt.cat.filter(c=>parseInt(c.gid,10)===e):[]},d=Mn(Ca(t,n)).replace(/[^0-9]/g,"")||String(e);ns(JSON.stringify(i),"text/plain;charset=utf-8;",`scorer_game${d}.txt`)}function Ri(){var o;if(!Oe)return alert("先にバックアップ／試合ファイルを選択してください。");const e=parseInt((o=document.getElementById("backup-game-select"))==null?void 0:o.value,10);if(isNaN(e))return alert("抽出する試合を選択してください。");const t=Oe.gameDetails.find(i=>i.gid===e);if(!t)return alert("選択された試合データが見つかりません。");const n=io(t),a=confirm(`1球ごとの投球カウント（[1]ボール等）もテキストに含めますか？
（「キャンセル」を押すと打席結果・重要イベントのみのすっきりした戦績表を保存します）`),s=nr(n,a),r=(t.date||"").replace(/[^0-9]/g,"")||String(e);ns("\uFEFF"+s,"text/plain;charset=utf-8;",`戦績文字起こし_${r}_${t.tn}_vs_${t.bn}.txt`)}function Oi(){var t;if(!Oe||Oe.gameDetails.length===0)return alert("先にバックアップ／試合ファイルを選択してください。");const e=(t=document.getElementById("backup-game-select"))==null?void 0:t.value;jt=Oe.gameDetails,no("detail-analysis"),An(!0,e?String(e):"all")}function Br(e){const t=[];return e&1&&t.push("1"),e&2&&t.push("2"),e&4&&t.push("3"),t.length?t.join("･")+"塁":""}function oo(e){const t=[];return e&1&&t.push("1"),e&2&&t.push("2"),e&4&&t.push("3"),t.length?`◆(${t.join(",")}塁)`:"◇"}function io(e){var U,ee,z,K,H,Z,q,re,oe,ge,Te,st,ue,ct,Ue,Ut,Mt,Et,_t,xt,Y,me,Ne,je,It,wn,La;const t=gt(e==null?void 0:e.cf,{}),n=gt(e==null?void 0:e.te,[]),a=gt(e==null?void 0:e.pl,[]),s=gt(e==null?void 0:e.sc,[[[],[]],[[0,0,0,0],[0,0,0,0]]]),r=new Map;Array.isArray(a)&&a.forEach(M=>{const V=parseInt(M.id??M.pid,10);isNaN(V)||r.set(V,{id:V,name:Ts(M),num:String(M.num??M.nu??"")})});const o=M=>r.get(parseInt(M,10))||{id:parseInt(M,10),name:`選手${M}`,num:""},i=Array.isArray(t==null?void 0:t.gteams)?t.gteams:[],d=[[],[]];[0,1].forEach(M=>{const V=i[M];V&&Array.isArray(V.players)&&(d[M]=V.players.filter(ve=>ve.ord>=0).sort((ve,ye)=>ve.ord-ye.ord).map(ve=>{const ye=o(ve.id);return{ord:ve.ord,pos:ve.pos,id:ve.id,name:ye.name,num:ye.num}}))});const l=(e==null?void 0:e.tn)||((U=n[0])==null?void 0:U.disp)||((ee=n[0])==null?void 0:ee.name)||"先攻",c=(e==null?void 0:e.bn)||((z=n[1])==null?void 0:z.disp)||((K=n[1])==null?void 0:K.name)||"後攻",u=Pt(l),f=Pt(c),g=[0,0];let y=0,b=0,p=0,m=0,h=0,_=0,I={1:null,2:null,3:null},k=[0,0],S=!1,$="1回表";const E=[],w=[],x=[],v=()=>(I[1]?1:0)+(I[2]?2:0)+(I[3]?4:0),A=(M,V)=>d[M].find(ve=>ve&&String(ve.pos)===String(V)),P=(M,V,ve)=>{const ye=d[M].findIndex(rt=>rt&&rt.ord===V);ye>=0?d[M][ye]=ve:d[M].push(ve)};function N(M,V,ve=null){const ye=[],rt=[];let Ve=ve!=null?String(ve):null;const En=/(J)(\d)([1-4a-g])|([OT])(\d)(\d)|(Th|Tb|Es|Ek|Ec|Ej|Eu)(\d+)|(Cb|Ch|Cf)/g;for(const ot of M.matchAll(En))if(ot[1]==="J"){const Se=parseInt(ot[2],10),Ee=ot[3],he=/[1-4]/.test(Ee)?parseInt(Ee,10):{a:1,b:2,c:3,d:4,e:2,f:3,g:4}[Ee]||1,kt=Se===0?V:I[Se],O=kt?kt.name:V.name,j=Se===0?`打者${O}`:`${Se}塁ランナー${O}`;Se>0&&Se!==he&&(I[Se]=null),he===4?(k[y]++,ye.push(`${j}生還`)):Se!==he&&(he>=1&&he<=3&&(I[he]=kt),ye.push(`${j}${he}塁へ`))}else if(ot[4]==="O"||ot[4]==="T"){const Se=ot[4],Ee=parseInt(ot[5],10),he=parseInt(ot[6],10);if(h++,Ee===0&&he===0)ye.push(Se==="T"?"タッチアウト":"アウト");else{const kt=Ee===0?V:I[Ee],O=kt?kt.name:V.name,j=Ee===0?`打者${O}`:`${Ee}塁ランナー${O}`,X=he===4?"本塁":he>0?`${he}塁`:"";ye.push(`${j}${X}${Se==="T"?"タッチアウト":"アウト"}`),Ee>0&&(I[Ee]=null)}}else if(ot[7]){const Se=ot[7],he=ot[8].slice(-1),kt=j=>j==="9"?"その他":tt[j]||"その他",O=Ve!=null&&Ve!=="9"?Ve:he!=="9"?he:null;Se==="Th"?(ye.push(`${tt[he]||""}に送球`),Ve=he):Se==="Tb"?(ye.push(`${tt[he]||""}`),Ve=he):Se==="Es"?(ye.push(`${tt[he]||""}に送球エラー`),rt.push({pos:O||void 0,posName:O?kt(O):"送球エラー"})):Se==="Ek"||Se==="Ej"?(ye.push(O&&tt[O]?`${tt[O]}エラー`:"エラー"),rt.push({pos:O||void 0,posName:O?kt(O):"その他"})):Se==="Ec"?ye.push(he!=="9"&&tt[he]?`${tt[he]}送球(野選)`:"送球選択(野選)"):Se==="Eu"&&ye.push("送球間の進塁")}return{msgs:ye,errDetails:rt}}const D=String((e==null?void 0:e.cd)||"").split("=").filter(Boolean);for(const M of D){let V="",ve="play",ye=!1,rt=[];const Ve=1-y,En=y===0?l:c,ot=y===0?u:f,Se=y===0?f:u,Ee=d[y][g[y]]||{name:"",num:"",id:null};if(/^I([tb])(\d+)$/.test(M)){const O=M.match(/^I([tb])(\d+)$/);y=O[1]==="t"?0:1;const j=parseInt(O[2],10);b=(j-1)*2+y,$=`${j}回${y===0?"表":"ｳﾗ"}`,h=0,p=0,m=0,_=0,I={1:null,2:null,3:null},S=!1,V=`${$} `,ve="inning_header"}else if(/^A([tb])(\d+)(?:Lb(\d+))?$/.test(M)){const O=M.match(/^A([tb])(\d+)(?:Lb(\d+))?$/),j=parseInt(O[2],10),X=O[1]==="t"?"表":"ｳﾗ",Q=O[3]?` ${Br(parseInt(O[3],10))}ランナー残塁`:"";V=`${j}回${X}終了${Q} `,ve="inning_end",S&&d[y].length>0&&(g[y]=(g[y]+1)%d[y].length,S=!1)}else if(M==="Ah")V="試合終了 ",ve="game_end";else if(/^(Am|Ag|Ap|Odp|Sc|Sw|Qw|Qx)/.test(M))V="";else if(M==="Nb")d[y].length>0&&(g[y]=(g[y]+1)%d[y].length),p=0,m=0,_=0,S=!1;else if(M==="Na"){p=0,m=0,_=0,S=!1;const O=g[y]+1,j=d[y][g[y]];V=j?`${O}番${j.name}${j.num?"#"+j.num:""}`:`${O}番`,ve="batter"}else if(/^Iz/.test(M)){const O=d[y].length||9;I[1]=d[y][(g[y]-1+O)%O],I[2]=d[y][(g[y]-2+O)%O],V="タイブレーク (1･2塁ランナー設定) "}else if(/^P([bslf])$/.test(M)||M==="Px"||M==="Pt")_++,ye=!0,M==="Pb"?(p<4&&p++,V=`[${_}]ボール `):M==="Ps"?(m<3&&m++,V=`[${_}]空振りストライク `):M==="Pl"?(m<3&&m++,V=`[${_}]見逃しストライク `):M==="Pf"?(m<2&&m++,V=`[${_}]ファウル `):M==="Pt"?(m<3&&m++,V=`[${_}]ファウルチップ `):(m<3&&m++,V=`[${_}]バント/カット `);else if(M==="Ko")h++,S=!0,V=`[${Math.max(1,_)}]三振アウト `;else if(/^(Bb|Db|Dn|Dk)/.test(M)){const O=M.slice(0,2);O==="Db"&&_++,O!=="Dk"&&(S=!0);const j={Bb:"フォアボール",Db:`[${_}]デッドボール`,Dn:"打撃妨害",Dk:"ボーク"}[O],X=N(M.slice(2),Ee,O==="Dn"?"1":null);rt=O==="Dn"?[{pos:"1",posName:tt[1]},...X.errDetails]:X.errDetails,V=[j,...X.msgs].join(" ")+" "}else if(/^E([wp])/.test(M)){const O=M[1]==="w"?"ワイルドピッチ":"パスボール",j=N(M.slice(2),Ee,"1");rt=j.errDetails,V=[O,...j.msgs].join(" ")+" "}else if(M==="Kr")V="";else if(/^K([wpt])/.test(M)){S=!0;const O=M[1],j=O==="t"?"振り逃げ失敗":`振り逃げ (${O==="w"?"暴投":"捕逸"})`,X=N(M.slice(2),Ee,"1");rt=X.errDetails,V=[j,...X.msgs].join(" ")+" "}else if(/^H([1-4])([a-z-])([a-z-])(\d)(.*)/.test(M)){const O=M.match(/^H([1-4])([a-z-])([a-z-])(\d)(.*)/);_++,S=!0;const j=parseInt(O[1],10),X=O[2],Q=O[3],ie=O[4],Pe=O[5];let ut=["","ヒット","ツーベース","スリーベース","ホームラン"][j];j===1&&X==="b"&&Q==="i"?ut="バント内野安打":j===1&&X==="h"&&Q==="i"?ut="強襲ヒット":j===1&&X==="i"?ut="内野安打":j===4&&X==="r"&&(ut="ランニングホームラン");const yr=N(Pe,Ee,ie);rt=yr.errDetails,V=[`[${_}]${tt[ie]||""}${ut}`,...yr.msgs].join(" ")+" "}else if(/^(Gob|Go|Fob|Fof|Fol|Fo)[-]*(\d)?\d?(.*)/.test(M)){const O=M.match(/^(Gob|Go|Fob|Fof|Fol|Fo)[-]*(\d)?\d?(.*)/);_++,S=!0;const j={Go:"ゴロ",Gob:"バントゴロ",Fo:"フライ",Fol:"ライナー",Fof:"ファウルフライ",Fob:"バントフライ"}[O[1]]||"アウト",X=N(O[3]||"",Ee,O[2]);rt=X.errDetails,V=[`[${_}]${O[2]!==void 0&&tt[O[2]]||""}${j}`,...X.msgs].join(" ")+" "}else if(/^Rq(\d)(\d)/.test(M)){const O=M.match(/^Rq(\d)(\d)/);V=`${O[1]==="1"?"キャッチャー":"ピッチャー"}${{1:"1塁",2:"2塁",4:"3塁"}[O[2]]||"塁"}牽制 `,ye=!0}else if(/^Ru(\d+)/.test(M))V=`${Br(parseInt(M.slice(2),10))}ランナースタート `,ye=!0;else if(/^(Rs|Rd|Rc|Rf|Rg|Rr|Rz)(.*)/.test(M)){const O=M.slice(0,2),j={Rs:"盗塁",Rd:"ダブルスチール",Rc:"守備無関心",Rf:"盗塁失敗",Rg:"牽制アウト",Rr:"走塁アウト",Rz:""}[O],X=(O==="Rr"||O==="Rg")&&/^[01]$/.test(M[2])?M[2]:"1",Q=N(M.slice(2),Ee,X);rt=Q.errDetails,V=(j?[j,...Q.msgs]:Q.msgs).join(" ")+" "}else if(/^Sh([0-9a-z])#(\d+):/.test(M)){const[,O,j]=M.match(/^Sh([0-9a-z])#(\d+):/),X=parseInt(O,36),Q=o(j),ie=d[y].find(Pe=>Pe&&Pe.ord===X);V=`${X+1}番${(ie==null?void 0:ie.name)||""}に代打${Q.name}${Q.num?"#"+Q.num:""}`,P(y,X,{...ie,ord:X,id:parseInt(j,10),name:Q.name,num:Q.num})}else if(/^Sha#(\d+):/.test(M)){const[,O]=M.match(/^Sha#(\d+):/),j=o(O),X=g[y],Q=d[y][X];V=`${X+1}番${(Q==null?void 0:Q.name)||""}に代打${j.name}${j.num?"#"+j.num:""}`,P(y,(Q==null?void 0:Q.ord)??X,{...Q,ord:(Q==null?void 0:Q.ord)??X,id:parseInt(O,10),name:j.name,num:j.num})}else if(/^Sr([0-9a-z])#(\d+):/.test(M)){const[,O,j]=M.match(/^Sr([0-9a-z])#(\d+):/),X=parseInt(O,36),Q=o(j),ie=d[y].find(ut=>ut&&ut.ord===X);let Pe="";for(const ut of[1,2,3])((H=I[ut])==null?void 0:H.id)===(ie==null?void 0:ie.id)&&(Pe=`${ut}塁ランナー`,I[ut]={id:parseInt(j,10),name:Q.name,num:Q.num});V=`${Pe}${(ie==null?void 0:ie.name)||""}に代走${Q.name}${Q.num?"#"+Q.num:""}`,P(y,X,{...ie,ord:X,id:parseInt(j,10),name:Q.name,num:Q.num})}else if(/^S(ih|ir)(\d)#(\d+):/.test(M)){const[,O,j,X]=M.match(/^S(ih|ir)(\d)#(\d+):/),Q=o(X),ie=d[Ve].find(Pe=>Pe&&Pe.id===parseInt(X,10));ie&&(ie.pos=parseInt(j,10)),V=`${O==="ih"?"代打":"代走"}${Q.name}が${tt[j]||""}へ`}else if(/^Sk(\d)(\d)#(\d+):/.test(M)){const[,O,j,X]=M.match(/^Sk(\d)(\d)#(\d+):/),Q=o(X),ie=d[Ve].find(Pe=>Pe&&Pe.id===parseInt(X,10));ie&&(ie.pos=parseInt(j,10)),V=`${tt[O]||""}${Q.name}が${tt[j]||""}へ`}else if(/^Skh(\d)#(\d+):/.test(M)){const[,O,j]=M.match(/^Skh(\d)#(\d+):/),X=o(j),Q=d[Ve].find(ie=>ie&&ie.id===parseInt(j,10));Q&&(Q.pos=parseInt(O,10)),V=`${X.name}が${tt[O]||""}へ`}else if(/^Sd([0-9a-z])(\d)#(\d+):/.test(M)){const[,O,j,X]=M.match(/^Sd([0-9a-z])(\d)#(\d+):/),Q=parseInt(O,36),ie=o(X),Pe=d[Ve].find(ut=>ut&&ut.ord===Q);V=`${Q+1}番${(Pe==null?void 0:Pe.name)||""}に代わり${ie.name}が${tt[j]||""}へ`,P(Ve,Q,{...Pe,ord:Q,pos:parseInt(j,10),id:parseInt(X,10),name:ie.name,num:ie.num})}else if(/^Sda(\d)#(\d+):/.test(M)){const[,O,j]=M.match(/^Sda(\d)#(\d+):/),X=o(j),Q=10,ie=d[Ve].find(Pe=>Pe&&Pe.ord===Q);V=`${Q+1}番${(ie==null?void 0:ie.name)||""}に代わり${X.name}が${tt[O]||""}へ`,P(Ve,Q,{...ie,ord:Q,pos:parseInt(O,10),id:parseInt(j,10),name:X.name,num:X.num})}else if(/^W/.test(M)){if(ye=!0,M==="Wtf")V=`${En}：チーム初安打 `;else if(/^Wtc(\d+)/.test(M))V=`${En}：チーム${M.slice(3)}者連続安打 `;else if(/^Whm(\d+)/.test(M))V=`バッター${Ee.name}：${M.slice(3)}安打 `;else if(/^Wh(\d+)/.test(M))V=`バッター${Ee.name}：猛打賞 `;else if(/^Wkb(\d+)/.test(M))V=`バッター${Ee.name}：三振${M.slice(3)}個目 `;else if(/^Wkc(\d+)/.test(M)){const O=A(Ve,"0");V=`ピッチャー${(O==null?void 0:O.name)||""}：${M.slice(3)}者連続三振 `}}rt.forEach(O=>{const j=O.pos!==void 0?A(Ve,O.pos):null;x.push({inning:$,posName:O.posName,fielderName:(j==null?void 0:j.name)||"",play:V.trim(),isHomeFielding:Se})});const he=v();E.push({inn:b,ball:p,strk:m,out:h,rnr:he,trun:k[0],brun:k[1],isHomeBatting:ot,isHomeFielding:Se,currentBatterName:Ee.name,codes:[{cd:M,pli:{sPlay:V}}]});const kt=V.trim();kt&&w.push({type:ve,cd:M,inningLabel:$,half:y===0?"top":"bot",isHomeBatting:ot,text:kt,scoreTop:k[0],scoreBot:k[1],topTeam:l,botTeam:c,ball:p,strk:m,out:h,rnr:he,basesText:oo(he),isPitchOnly:ye})}const F=Array.isArray((Z=s==null?void 0:s[0])==null?void 0:Z[0])?s[0][0]:[],R=Array.isArray((q=s==null?void 0:s[0])==null?void 0:q[1])?s[0][1]:[];let L=7;for(let M=Math.max(F.length,R.length)-1;M>=0;M--)if(F[M]!==void 0&&F[M]!==-1||R[M]!==void 0&&R[M]!==-1){L=Math.max(7,M+1);break}const T=M=>M==null||M===-1?"":M===300?"x":M>=200?`${M-200}x`:String(M);return{meta:{gid:e==null?void 0:e.gid,date:(e==null?void 0:e.date)||"",title:(e==null?void 0:e.tt)||(t==null?void 0:t.title)||"",stadium:(e==null?void 0:e.pa)||(t==null?void 0:t.stadi)||"",start:(t==null?void 0:t.start)||"",end:(t==null?void 0:t.end)||"",weather:(t==null?void 0:t.weath)||"",topTeam:l,botTeam:c,isHomeTop:u,isHomeBot:f,homeTid:u&&!f?((re=n[0])==null?void 0:re.id)??((oe=i[0])==null?void 0:oe.id)??null:f&&!u?((ge=n[1])==null?void 0:ge.id)??((Te=i[1])==null?void 0:Te.id)??null:null,ti:(e==null?void 0:e.ti)||"",bi:(e==null?void 0:e.bi)||"",maxInnings:L,topInnings:Array.from({length:L},(M,V)=>T(F[V])),botInnings:Array.from({length:L},(M,V)=>T(R[V])),topSum:{r:((ue=(st=s==null?void 0:s[1])==null?void 0:st[0])==null?void 0:ue[0])??k[0],h:((Ue=(ct=s==null?void 0:s[1])==null?void 0:ct[0])==null?void 0:Ue[1])??0,b:((Mt=(Ut=s==null?void 0:s[1])==null?void 0:Ut[0])==null?void 0:Mt[2])??0,e:((_t=(Et=s==null?void 0:s[1])==null?void 0:Et[0])==null?void 0:_t[3])??0},botSum:{r:((Y=(xt=s==null?void 0:s[1])==null?void 0:xt[1])==null?void 0:Y[0])??k[1],h:((Ne=(me=s==null?void 0:s[1])==null?void 0:me[1])==null?void 0:Ne[1])??0,b:((It=(je=s==null?void 0:s[1])==null?void 0:je[1])==null?void 0:It[2])??0,e:((La=(wn=s==null?void 0:s[1])==null?void 0:wn[1])==null?void 0:La[3])??0}},timeline:w,pcl:E,errorEvents:x,fld:(e==null?void 0:e.fld)||[],playerMap:r}}function nr(e,t=!1,n="all"){const{meta:a,timeline:s}=e,r=[];r.push("=================================================="),r.push(`試合戦績文字起こし: ${a.topTeam} vs ${a.botTeam}`),r.push(`日時: ${a.date||"不明"}${a.start?` (${a.start}〜${a.end||""})`:""} / 球場: ${a.stadium||"不明"} / 大会: ${a.title||"記録"}`),r.push("=================================================="),r.push("");const o=Array.from({length:a.maxInnings},(d,l)=>String(l+1));r.push(["チーム",...o,"R","H","B","E"].join(" | ")),r.push([a.topTeam,...a.topInnings.map(d=>d||"-"),a.topSum.r,a.topSum.h,a.topSum.b,a.topSum.e].join(" | ")),r.push([a.botTeam,...a.botInnings.map(d=>d||"-"),a.botSum.r,a.botSum.h,a.botSum.b,a.botSum.e].join(" | ")),a.ti&&r.push(a.ti),a.bi&&r.push(a.bi),r.push("");const i=(d,l)=>{const c=Math.max(0,Math.min(l,d||0));return"●".repeat(c)+"○".repeat(l-c)};return s.forEach(d=>{if(!(n!=="all"&&d.inningLabel!==n)&&!(!t&&d.isPitchOnly))if(d.type==="inning_header")r.push(`
--- ${d.text} ---`);else if(d.type==="batter")r.push(`■ ${d.text}`);else if(d.type==="inning_end"||d.type==="game_end")r.push(`  ▶ ${d.text} (${a.topTeam} ${d.scoreTop}-${d.scoreBot} ${a.botTeam})`);else{const l=t?`[B:${i(d.ball,4)} S:${i(d.strk,3)} O:${i(d.out,3)}]`:`[O:${i(d.out,3)}]`,c=`${a.topTeam} ${d.scoreTop}-${d.scoreBot} ${a.botTeam} ${l} ${d.basesText}`;r.push(`  ${d.text}`),r.push(`    ${c}`)}}),r.join(`
`)}function Fi(){const e=jt.length>0?jt:Ks;if(jt.length>0)return e;const t=new Set((Rn.games||[]).map(a=>a.id)),n=new Set((Rn.games||[]).map(a=>`${Mn(a.date)}_${(a.team_first||"").trim()}_${(a.team_second||"").trim()}`));return t.size===0&&Ha.length>0?[]:e.filter(a=>{if(Ha.length===0||t.has(a.gid))return!0;const s=`${Mn(a.date)}_${(a.tn||"").trim()}_${(a.bn||"").trim()}`;return n.has(s)})}function An(e=!0,t=null){const n=document.getElementById("detail-db-status-badge"),a=document.getElementById("btn-detail-exit-preview"),s=document.getElementById("detail-empty-notice"),r=document.getElementById("detail-scope-select"),o=document.getElementById("detail-games-quicklist"),i=document.getElementById("detail-jump-transcript-bar"),d=document.getElementById("detail-team-overview"),l=document.getElementById("detail-analysis-dashboard"),c=document.getElementById("detail-transcript-panel");if(!r)return;const u=Fi(),f=jt.length>0;if(n&&(n.textContent=f?`一時プレビュー表示中 (${u.length}試合)`:`DB保存詳細データ: 全${Ks.length}試合（フィルタ一致: ${u.length}試合）`),a==null||a.classList.toggle("hidden",!f),u.length===0){s==null||s.classList.remove("hidden"),o==null||o.classList.add("hidden"),i==null||i.classList.add("hidden"),d==null||d.classList.add("hidden"),l==null||l.classList.add("hidden"),c==null||c.classList.add("hidden"),r.innerHTML='<option value="">表示できる詳細データがありません</option>';return}s==null||s.classList.add("hidden");const g=t||(e?r.value:"all")||"all",y=[`<option value="all">📊 フィルタ一致 全試合合算 (${u.length}試合) ※選手打撃・打球方向・エラー傾向</option>`,...u.map(h=>{const _=Kn(h);return`<option value="${h.gid}">📋 ${te(h.date||"日付不明")} | ${te(h.tn)} ${te(_)} ${te(h.bn)} (${te(h.tt||"試合")})</option>`})].join("");r.innerHTML=y,g==="all"||u.some(h=>String(h.gid)===String(g))?r.value=g:r.value="all";const b=r.value,m=(b==="all"?u:u.filter(h=>String(h.gid)===String(b))).map(h=>io(h));b!=="all"&&m.length===1?(ln=m[0],$n="all",ar(),c==null||c.classList.remove("hidden"),i==null||i.classList.remove("hidden"),o==null||o.classList.add("hidden")):(ln=null,c==null||c.classList.add("hidden"),i==null||i.classList.add("hidden"),o&&(o.innerHTML=`
                <div class="text-xs font-bold text-gray-700 mb-2">📝 試合ごとのスコアボード＆戦績文字起こしを見る（クリックで切り替え）:</div>
                <div class="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                    ${u.map(h=>{const _=Kn(h);return`<button type="button" data-quick-gid="${h.gid}" class="text-xs px-2.5 py-1 rounded-lg border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-indigo-900 font-semibold transition-colors">${te(h.date||"")} ${te(h.tn)} ${te(_)} ${te(h.bn)}</button>`}).join("")}
                </div>
            `,o.classList.remove("hidden"),o.querySelectorAll("button[data-quick-gid]").forEach(h=>{h.addEventListener("click",()=>{var _;An(!0,h.dataset.quickGid),(_=document.getElementById("detail-transcript-panel"))==null||_.scrollIntoView({behavior:"smooth",block:"start"})})}))),ft=lo(m),d==null||d.classList.remove("hidden"),l==null||l.classList.remove("hidden"),Vi(ft),co()}function ar(){const e=ln;if(!e)return;const{meta:t,timeline:n}=e;document.getElementById("detail-transcript-title").textContent=`📋 ${t.topTeam} ${t.topSum.r} - ${t.botSum.r} ${t.botTeam}`,document.getElementById("detail-transcript-meta").textContent=`${t.date||""}${t.start?` (${t.start}〜${t.end||""})`:""} | ${t.title||"記録"} | 球場: ${t.stadium||"不明"}${t.weather?` | 天候: ${t.weather}`:""}`;const a=document.getElementById("detail-scoreboard-table");if(a){const u=Array.from({length:t.maxInnings},(y,b)=>`<th class="p-1.5 border bg-gray-100 w-7">${b+1}</th>`).join(""),f=t.topInnings.map(y=>`<td class="p-1.5 border">${te(y)}</td>`).join(""),g=t.botInnings.map(y=>`<td class="p-1.5 border">${te(y)}</td>`).join("");a.innerHTML=`
            <thead>
                <tr>
                    <th class="p-1.5 border bg-gray-100 text-left min-w-[120px]">チーム</th>
                    ${u}
                    <th class="p-1.5 border bg-gray-200 font-black w-8">R</th>
                    <th class="p-1.5 border bg-gray-200 font-bold w-8">H</th>
                    <th class="p-1.5 border bg-gray-200 font-bold w-8">B</th>
                    <th class="p-1.5 border bg-gray-200 font-bold w-8">E</th>
                </tr>
            </thead>
            <tbody>
                <tr class="${t.isHomeTop?"bg-purple-50/60 font-bold":"bg-white"}">
                    <td class="p-1.5 border text-left ${t.isHomeTop?"text-purple-800 font-black":"text-green-800 font-bold"}">${te(t.topTeam)}</td>
                    ${f}
                    <td class="p-1.5 border font-black bg-gray-50">${t.topSum.r}</td>
                    <td class="p-1.5 border bg-gray-50">${t.topSum.h}</td>
                    <td class="p-1.5 border bg-gray-50">${t.topSum.b}</td>
                    <td class="p-1.5 border bg-gray-50">${t.topSum.e}</td>
                </tr>
                <tr class="${t.isHomeBot?"bg-purple-50/60 font-bold":"bg-white"}">
                    <td class="p-1.5 border text-left ${t.isHomeBot?"text-purple-800 font-black":"text-green-800 font-bold"}">${te(t.botTeam)}</td>
                    ${g}
                    <td class="p-1.5 border font-black bg-gray-50">${t.botSum.r}</td>
                    <td class="p-1.5 border bg-gray-50">${t.botSum.h}</td>
                    <td class="p-1.5 border bg-gray-50">${t.botSum.b}</td>
                    <td class="p-1.5 border bg-gray-50">${t.botSum.e}</td>
                </tr>
            </tbody>
        `}const s=document.getElementById("detail-battery-hr-info");if(s){const u=[];t.ti&&u.push(`<div>${te(t.ti)}</div>`),t.bi&&u.push(`<div>${te(t.bi)}</div>`),s.innerHTML=u.join(""),s.classList.toggle("hidden",u.length===0)}const r=document.getElementById("detail-transcript-half-tabs");if(r){const u=[];n.forEach(g=>{g.type==="inning_header"&&!u.includes(g.inningLabel)&&u.push(g.inningLabel)});const f=(g,y)=>{const b=$n===g;return`<button type="button" data-half-filter="${te(g)}" class="px-2.5 py-1 rounded-full text-xs font-bold border transition-colors ${b?"bg-emerald-700 text-white border-emerald-700":"bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}">${te(y)}</button>`};r.innerHTML=f("all","試合全体")+u.map(g=>f(g,g)).join(""),r.querySelectorAll("button[data-half-filter]").forEach(g=>{g.addEventListener("click",()=>{$n=g.dataset.halfFilter,ar()})})}const o=document.getElementById("detail-transcript-timeline");if(!o)return;const i=n.filter(u=>!($n!=="all"&&u.inningLabel!==$n||!ga&&u.isPitchOnly)),d=u=>{const f=u&1?"#f59e0b":"#ffffff",g=u&2?"#f59e0b":"#ffffff",y=u&4?"#f59e0b":"#ffffff";return`<svg viewBox="0 0 36 24" class="w-8 h-5 inline-block align-middle ml-1" aria-label="${te(oo(u))}">
            <polygon points="18,2 23,7 18,12 13,7" fill="${g}" stroke="#9ca3af" stroke-width="1.2"/>
            <polygon points="25,9 30,14 25,19 20,14" fill="${f}" stroke="#9ca3af" stroke-width="1.2"/>
            <polygon points="11,9 16,14 11,19 6,14" fill="${y}" stroke="#9ca3af" stroke-width="1.2"/>
        </svg>`},l=(u,f,g,y,b)=>{const p=Math.max(0,Math.min(y,g||0)),m=Array.from({length:y},(h,_)=>`<span class="inline-block w-2.5 h-2.5 rounded-full border ${_<p?b:"bg-white border-gray-300"}"></span>`).join("");return`<span class="inline-flex items-center gap-0.5" data-count-type="${u}"><span class="font-black text-[11px] leading-none mr-0.5 ${f}">${u}</span>${m}</span>`},c=u=>{if(!ga)return`<span class="inline-flex items-center ml-1" title="O:${u.out||0}">${l("O","text-red-600",u.out,3,"bg-red-500 border-red-600")}</span>`;const f=Math.max(0,Math.min(4,u.ball||0)),g=Math.max(0,Math.min(3,u.strk||0)),y=Math.max(0,Math.min(3,u.out||0));return`<span class="inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 ml-1" title="B:${f} S:${g} O:${y}">${l("B","text-green-700",f,4,"bg-green-500 border-green-600")}${l("S","text-amber-600",g,3,"bg-amber-400 border-amber-500")}${l("O","text-red-600",y,3,"bg-red-500 border-red-600")}</span>`};o.innerHTML=i.map(u=>u.type==="inning_header"?`<div class="bg-amber-50 border border-amber-200 text-amber-950 font-black px-3 py-1.5 rounded text-sm mt-2">${te(u.text)}</div>`:u.type==="batter"?`<div class="bg-emerald-900 text-white font-bold px-3 py-1.5 rounded text-xs tracking-wide">${te(u.text)}</div>`:u.type==="inning_end"||u.type==="game_end"?`<div class="bg-gray-200 text-gray-800 font-bold px-3 py-1 rounded text-xs flex justify-between items-center">
                <span>${te(u.text)}</span>
                <span class="text-[11px] text-gray-600">${te(u.topTeam)} ${u.scoreTop}-${u.scoreBot} ${te(u.botTeam)}</span>
            </div>`:`<div class="border px-3 py-2 rounded shadow-2xs ${u.isPitchOnly?"bg-gray-50 border-gray-200 text-gray-600":"bg-white border-emerald-200 text-emerald-950"}">
            <div class="text-xs font-bold">${te(u.text)}</div>
            <div class="text-[11px] text-gray-600 mt-1 flex flex-wrap items-center justify-between gap-1">
                <span>${te(u.topTeam)} <strong class="text-gray-900">${u.scoreTop}-${u.scoreBot}</strong> ${te(u.botTeam)}</span>
                <span class="flex flex-wrap items-center gap-1">${c(u)} ${d(u.rnr)} <span class="ml-1 text-[10px] text-gray-500">${te(u.basesText)}</span></span>
            </div>
        </div>`).join("")}async function Hi(){if(!ln)return;const e=nr(ln,ga,$n);try{await navigator.clipboard.writeText(e),alert("試合経過のテキストをクリップボードにコピーしました。")}catch{alert("クリップボードへのコピーに失敗しました。ダウンロードボタンをご利用ください。")}}function qi(){if(!ln)return;const{meta:e}=ln,t=nr(ln,ga,$n),n=(e.date||"").replace(/[^0-9]/g,"")||String(e.gid||"game");ns("\uFEFF"+t,"text/plain;charset=utf-8;",`戦績文字起こし_${n}_${e.topTeam}_vs_${e.botTeam}.txt`)}function Ui(){const e=document.getElementById("detail-analysis-file");if(!e||!e.files||e.files.length===0)return alert("ファイルを選択してください。");const t=e.files[0],n=new FileReader;n.onload=function(a){var s;try{const r=String(a.target.result||"").replace(/^\uFEFF/,""),o=JSON.parse(r);if(Array.isArray(o.game)&&o.game.length>0){jt=ro(o).gameDetails,An(!1,jt.length===1?String(jt[0].gid):"all");return}const i=ji(o);if(!i)return alert("詳細データのパースに失敗しました (game配列またはsysdata23が見つかりません)。");ft=i,(s=document.getElementById("detail-analysis-dashboard"))==null||s.classList.remove("hidden"),co()}catch(r){console.error(r),alert("JSONデータのパースに失敗しました。ファイル形式を確認してください。")}},n.readAsText(t)}function lo(e){const t={innings:{},batters:{},batterDisplayNames:{},steals:{},errors:{byInning:{},byPosition:{},byPlayer:{}},counts:{}},n=r=>{const o=String(r).match(/^(\d+回)/),i=o?o[1]:r;return t.innings[i]||(t.innings[i]={ourRuns:0,oppRuns:0,outs:{strikeout:0,groundout:0,flyout:0,other:0}}),t.innings[i]},a=r=>{const o=Wn(r);return o?(t.batters[o]||(t.batterDisplayNames[o]=r,t.batters[o]={pa:0,ab:0,hits:0,strikeout:0,walk:0,groundout:0,flyout:0,otherout:0,rbi:0,chances:{pa:0,hits:0,rbi:0},directions:{left:0,center:0,right:0,inner:0,other:0},counts:{}}),t.batters[o]):null},s=r=>[2,3,4,5,6,7].includes(r);return e.forEach(r=>{var I,k;const{meta:o,pcl:i,errorEvents:d,fld:l,playerMap:c}=r,u=o.isHomeTop&&!o.isHomeBot||!o.isHomeTop&&o.isHomeBot;if(e.length>1){const S=(o.topTeam||"").trim(),$=(o.botTeam||"").trim();if(S==="ありんこ"||S==="アントス"||$==="ありんこ"||$==="アントス"||o.isHomeTop&&o.isHomeBot||(o.title||"").includes("紅白"))return}for(let S=0;S<o.maxInnings;S++){const $=o.topInnings[S],E=o.botInnings[S];if(!$&&!E)continue;const w=n(`${S+1}回`),x=$&&$!=="x"&&parseInt($,10)||0,v=E&&E!=="x"&&parseInt(E,10)||0;o.isHomeTop?(w.ourRuns+=x,w.oppRuns+=v):o.isHomeBot?(w.ourRuns+=v,w.oppRuns+=x):w.ourRuns+=x+v}const f=new Map;let g=0;d.forEach(S=>{if(u&&!S.isHomeFielding)return;g++,t.errors.byInning[S.inning]=(t.errors.byInning[S.inning]||0)+1;const $=S.posName||"その他";if(t.errors.byPosition[$]=(t.errors.byPosition[$]||0)+1,S.fielderName){const E=Wn(S.fielderName);f.set(E,(f.get(E)||0)+1),t.errors.byPlayer[E]||(t.errors.byPlayer[E]=[]),t.errors.byPlayer[E].push({inning:`${o.date?o.date+" ":""}${S.inning}`,play:`[${$}] ${S.play}`})}});const y=o.isHomeTop?((I=o.topSum)==null?void 0:I.e)||0:o.isHomeBot&&((k=o.botSum)==null?void 0:k.e)||0;if(Array.isArray(l)&&(g===0||y>0&&g<y)){const S=new Map;l.forEach($=>{var P,N;if(o.homeTid!=null&&$.tid!=null&&String($.tid)!==String(o.homeTid))return;const E=Array.isArray($.st)&&parseInt($.st[4],10)||0;if(E<=0)return;const w=((P=c.get(parseInt($.pid,10)))==null?void 0:P.name)||((N=Vt.find(D=>D.id==$.pid))==null?void 0:N.name);if(!w)return;const x=Wn(w),v=Di[$.st[0]]||"守備";S.has(x)||S.set(x,{total:0,items:[]});const A=S.get(x);A.total+=E,A.items.push({posLabel:v,cnt:E})}),S.forEach(($,E)=>{let w=$.total-(f.get(E)||0);w<=0||(t.errors.byPlayer[E]||(t.errors.byPlayer[E]=[]),$.items.forEach(({posLabel:x,cnt:v})=>{const A=Math.min(w,v);for(let P=0;P<A;P++)t.errors.byPosition[x]=(t.errors.byPosition[x]||0)+1,t.errors.byInning.記録集計=(t.errors.byInning.記録集計||0)+1,t.errors.byPlayer[E].push({inning:o.date||"試合内",play:`記録失策 (${x})`});w-=A}))})}let b="1回表",p=null,m=null,h=0,_=0;i.forEach(S=>{const $=S.rnr,E=!u||S.isHomeBatting;(S.codes||[]).forEach(w=>{var D;const x=w.cd||"",v=(((D=w.pli)==null?void 0:D.sPlay)||"").trim();if(!v){h=S.ball,_=S.strk;return}const A=v.match(/^(\d+回(?:表|ｳﾗ|裏))/);A&&(b=A[1]);const P=v.match(/^\d+番(.+?)(?:#\d+)?$/);if(P){E?(p=P[1].trim(),m=a(p),m&&(m.pa++,s($)&&m.chances.pa++)):(p=null,m=null),h=0,_=0;return}const N=v.match(/^\d+番.+?に代打(.+?)(?:#\d+)?$/);if(N&&E&&(p=N[1].trim(),m=a(p)),E&&(x.startsWith("Rs")||x.startsWith("Rf")||x.startsWith("Rd")||v.includes("盗塁"))){const F=v.match(/(?:ランナー|打者)([^0-9\s]+(?:\s[^0-9\s]+)?)(?:\d+塁|本塁|$)/);if(F){const R=Wn(F[1]);R&&R!=="打者"&&(t.steals[R]||(t.steals[R]={attempts:0,success:0,fail:0}),t.steals[R].attempts++,v.includes("失敗")||v.includes("アウト")?t.steals[R].fail++:t.steals[R].success++)}}if(E&&m){const F=v.match(/生還/g);if(F&&!x.startsWith("Ew")&&!x.startsWith("Ep")&&!x.startsWith("Dk")&&!x.startsWith("Rs")&&(m.rbi+=F.length,s($)&&(m.chances.rbi+=F.length)),/^(H[1-4]|Go|Gob|Fo|Fob|Fof|Fol|Ko|Bb|Db|K[wpt])/.test(x)){const T=`${Math.min(3,h)}-${Math.min(2,_)}`;t.counts[T]||(t.counts[T]={pa:0,hits:0}),t.counts[T].pa++,/^H[1-4]/.test(x)&&t.counts[T].hits++,m.counts[T]||(m.counts[T]={pa:0,hits:0}),m.counts[T].pa++,/^H[1-4]/.test(x)&&m.counts[T].hits++}const L=n(b);/^H[1-4]/.test(x)?(m.hits++,m.ab++,s($)&&m.chances.hits++,v.includes("レフト")?m.directions.left++:v.includes("センター")?m.directions.center++:v.includes("ライト")?m.directions.right++:v.includes("内野")||/ピッチャー|キャッチャー|ファースト|セカンド|サード|ショート/.test(v)?m.directions.inner++:m.directions.other++):/^(Bb|Db)/.test(x)?m.walk++:x==="Ko"||/^K[wpt]/.test(x)?(m.strikeout++,m.ab++,L.outs.strikeout++):/^Gob?/.test(x)?(x.includes("Cb")||m.ab++,m.groundout++,L.outs.groundout++,v.includes("サード")||v.includes("ショート")?m.directions.left++:v.includes("セカンド")||v.includes("ファースト")?m.directions.right++:m.directions.inner++):/^Fo/.test(x)&&(m.flyout++,x.includes("Cf")||m.ab++,L.outs.flyout++,v.includes("レフト")?m.directions.left++:v.includes("センター")?m.directions.center++:v.includes("ライト")?m.directions.right++:m.directions.inner++)}h=S.ball,_=S.strk})})}),t}function ji(e){const t=e!=null&&e.sys?e.sys.find(a=>a.ke==="sysdata23"):null;if(!t||!t.va)return null;const n=gt(t.va,null);return!n||!Array.isArray(n.pcl)?null:lo([{meta:{date:"",isHomeTop:!1,isHomeBot:!1,maxInnings:0,topInnings:[],botInnings:[]},pcl:n.pcl,errorEvents:[],fld:[],playerMap:new Map}])}async function Vi(e){if(!e)return;await Ea();const t=Object.keys(e.innings).sort((o,i)=>(parseInt(o,10)||99)-(parseInt(i,10)||99)),n=t.map(o=>e.innings[o].ourRuns),a=t.map(o=>e.innings[o].oppRuns);Lt.innings&&Lt.innings.destroy();const s=document.getElementById("chart-detail-innings");s&&(Lt.innings=new window.Chart(s.getContext("2d"),{type:"bar",data:{labels:t,datasets:[{label:"自チーム得点",data:n,backgroundColor:"rgba(16, 185, 129, 0.75)"},{label:"失点",data:a,backgroundColor:"rgba(239, 68, 68, 0.75)"}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{y:{beginAtZero:!0,ticks:{stepSize:1}}}}}));const r=document.getElementById("detail-team-errors-summary");if(r){const o=Object.entries(e.errors.byPosition).sort((c,u)=>u[1]-c[1]),i=c=>{const u=String(c).match(/^(\d+)回(表|ｳﾗ|裏)?/);return u?parseInt(u[1],10)*10+(u[2]==="表"?0:1):9999},d=Object.entries(e.errors.byInning).sort((c,u)=>i(c[0])-i(u[0])||c[0].localeCompare(u[0])),l=o.reduce((c,[,u])=>c+u,0);o.length===0?r.innerHTML='<div class="text-gray-400 text-center py-6">対象試合で記録されたエラーはありません</div>':r.innerHTML=`
                <div class="flex items-center justify-between text-[11px] font-bold text-yellow-900 bg-yellow-100/70 border border-yellow-200 rounded px-2.5 py-1 mb-2">
                    <span>総記録エラー数</span>
                    <span class="text-sm font-black">${l} 件</span>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                    ${o.map(([c,u])=>`
                        <div class="bg-yellow-50 border border-yellow-200 rounded p-2 text-center">
                            <div class="text-[11px] font-bold text-yellow-800">${te(c)}</div>
                            <div class="text-lg font-black text-yellow-700">${u} 件</div>
                        </div>
                    `).join("")}
                </div>
                <div class="text-[11px] text-gray-600 border-t pt-2">
                    <strong>発生イニング別:</strong> ${d.map(([c,u])=>`${te(c)}(${u})`).join(" / ")}
                </div>
            `}}function co(){if(!ft)return;const e=document.getElementById("detail-player-select");if(!e)return;const t=Vt.map(o=>Wn(o.name)),n=Object.keys(ft.batters),a=n.filter(o=>t.length===0?!0:t.some(i=>i&&(o.includes(i)||i.includes(o)))),s=(a.length>0?a:n).sort((o,i)=>(ft.batterDisplayNames[o]||o).localeCompare(ft.batterDisplayNames[i]||i));if(s.length===0){e.innerHTML='<option value="">該当する選手がいません</option>';return}const r=e.value;e.innerHTML=s.map(o=>`<option value="${te(o)}">${te(ft.batterDisplayNames[o]||o)}</option>`).join(""),r&&s.includes(r)&&(e.value=r),e.onchange=function(o){Ar(o.target.value)},Ar(e.value||s[0])}async function Ar(e){if(!ft||!e)return;await Ea();const t=Wn(e),n=ft.batters[t]||ft.batters[e]||{pa:0,ab:0,hits:0,strikeout:0,walk:0,groundout:0,flyout:0,otherout:0,rbi:0,chances:{pa:0,hits:0},directions:{left:0,center:0,right:0,inner:0,other:0},counts:{}};document.getElementById("stat-p-hits").textContent=n.hits,document.getElementById("stat-p-strikeouts").textContent=n.strikeout,document.getElementById("stat-p-groundouts").textContent=n.groundout,document.getElementById("stat-p-flyouts").textContent=n.flyout,document.getElementById("stat-p-walks").textContent=n.walk||0,document.getElementById("stat-p-others").textContent=n.otherout;const a=n.ab||Math.max(0,n.pa-(n.walk||0)),s=a>0?n.hits/a:0;document.getElementById("stat-p-avg").textContent=s.toFixed(3).replace(/^0/,""),Lt.playerBattingResult&&Lt.playerBattingResult.destroy();const r=document.getElementById("chart-detail-player-batting-result").getContext("2d");Lt.playerBattingResult=new window.Chart(r,{type:"doughnut",data:{labels:["安打","三振","ゴロ","フライ","四死球","他"],datasets:[{data:[n.hits,n.strikeout,n.groundout,n.flyout,n.walk||0,n.otherout],backgroundColor:["#10B981","#EF4444","#FBBF24","#3B82F6","#6366F1","#9CA3AF"]}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}}}}),Lt.playerDirection&&Lt.playerDirection.destroy();const o=[n.directions.left,n.directions.center,n.directions.right,n.directions.inner,n.directions.other],i=document.getElementById("chart-detail-player-direction").getContext("2d");Lt.playerDirection=new window.Chart(i,{type:"doughnut",data:{labels:["レフト方向","センター方向","ライト方向","内野・投捕","その他"],datasets:[{data:o,backgroundColor:["#EC4899","#3B82F6","#14B8A6","#F59E0B","#8B5CF6"]}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",labels:{boxWidth:10,font:{size:10}}}}}});const d=n.chances.pa,l=n.chances.hits,c=d>0?l/d:0;document.getElementById("stat-p-chance-avg").textContent=c.toFixed(3).replace(/^0/,""),document.getElementById("stat-p-chance-detail").textContent=`${d}打席 ${l}安打`,document.getElementById("stat-p-rbi").textContent=n.rbi;let u=ft.steals[t]||{attempts:0,success:0};if(u.attempts===0){const I=Object.keys(ft.steals).find(k=>t.includes(k)||k.includes(t));I&&(u=ft.steals[I])}const f=u.attempts>0?u.success/u.attempts*100:0;document.getElementById("stat-p-steal-rate").textContent=f.toFixed(1)+"%",document.getElementById("stat-p-steal-detail").textContent=`成功 ${u.success} / 企図 ${u.attempts}`;const g=ft.errors.byPlayer[t]||[];document.getElementById("stat-p-errors-count").textContent=`${g.length} 件`;const y=document.getElementById("stat-p-errors-detail");y&&(g.length===0?y.innerHTML='<div class="text-gray-400 text-center py-2">対象期間・試合でエラーの記録はありません</div>':y.innerHTML=g.map(I=>`
                <div class="border-b pb-1 last:border-0 mb-1">
                    <span class="font-bold text-blue-600 bg-blue-50 px-1 rounded">${te(I.inning)}</span>
                    <span class="text-gray-700">${te(I.play)}</span>
                </div>
            `).join(""));const b=n.counts||{},p=["0-0","1-0","2-0","3-0","0-1","1-1","2-1","3-1","0-2","1-2","2-2","3-2"],m=p.map(I=>b[I]?b[I].pa:0),h=p.map(I=>b[I]?b[I].hits:0);Lt.playerCount&&Lt.playerCount.destroy();const _=document.getElementById("chart-detail-player-count").getContext("2d");Lt.playerCount=new window.Chart(_,{type:"bar",data:{labels:p.map(I=>I+" count"),datasets:[{label:"打席数",data:m,backgroundColor:"rgba(99, 102, 241, 0.6)"},{label:"安打数",data:h,backgroundColor:"rgba(16, 185, 129, 0.8)"}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{y:{beginAtZero:!0,ticks:{stepSize:1}}}}})}const Gi="https://arcdgbzqfengqyvfbodt.supabase.co",zi="sb_publishable_Ei6ti5lKjAECmi36haftpw_DQsKMp4p";let We=null;try{!window.supabaseClient&&window.supabase&&window.supabase.createClient&&(window.supabaseClient=window.supabase.createClient(Gi,zi)),We=window.supabaseClient}catch(e){console.error("Supabase Client initialize error:",e)}let Re=[],qe="team_default",Ct=[],Je=[],Fe=[],lt="",Na=null;function Hn(){return Re.find(e=>e.id===qe)||Re[0]||{id:"team_default",name:"ありんこアントス (A軍)"}}function qn(){return Je.filter(e=>(e.teamId||"team_default")===qe)}function Wi(){if(!Na){const e=Hn();Na={id:"",name:"新規配置データ",teamId:qe,mode:ce,basePositions:{},customSubstitutions:[],battingOrder:{},playerSnapshots:{},headerInfo:{date:"",tournament:"",teamHome:e.name||"ありんこアントス",teamVisitor:"",manager:"",captain:"",scorer:"",stadium:"",time:""}}}return Na}function Le(){return Fe.find(e=>e.id===lt)||Wi()}let He=null,Ae=null,ce=9;const Kt={p:"投手",c:"捕手","1b":"一塁手","2b":"二塁手","3b":"三塁手",ss:"遊撃手",lf:"左翼手",cf:"中堅手",rf:"右翼手",dh:"指名打者"},Jn={p:"1",c:"2","1b":"3","2b":"4","3b":"5",ss:"6",lf:"7",cf:"8",rf:"9",dh:"DH"},Ji={1:"p",2:"c",3:"1b",4:"2b",5:"3b",6:"ss",7:"lf",8:"cf",9:"rf",10:"dh",d:"dh",dh:"dh",DH:"dh"},Ht=["p","c","1b","2b","3b","ss","lf","cf","rf"],qt=["p","c","1b","2b","3b","ss","lf","cf","rf","dh"];async function Pa(){try{if(Nd(),await Ki(),bn(),ss(),oa(),Fe.length>0){lt=Fe[0].id;const e=document.getElementById("sim-pattern-select");e&&(e.value=lt);const t=Le();t&&(ce=t.mode||9,t.teamId&&Re.some(n=>n.id===t.teamId)&&(qe=t.teamId,bn()))}yn(),ja("setup"),Ye(),xe()}catch(e){console.error("Fatal initialization error:",e),alert(`アプリケーションの初期化中にエラーが発生しました。
詳細: `+e.message)}}function Yi(e){return e&&(e.basePositions||(e.basePositions={}),e.customSubstitutions||(e.customSubstitutions=[]),e.battingOrder||(e.battingOrder={}),e.headerInfo||(e.headerInfo={}),e.teamId||(e.teamId=e.headerInfo.teamId||"team_default"),e.mode===void 0&&(e.mode=9),e.playerSnapshots||(e.playerSnapshots=e.headerInfo.playerSnapshots||{}),e)}function as(e,t=!1){const n=e&&!t&&e.playerSnapshots?{...e.playerSnapshots}:{},a=new Set;return e&&(e.basePositions&&Object.values(e.basePositions).forEach(r=>r&&a.add(r)),e.battingOrder&&Object.values(e.battingOrder).forEach(r=>r&&a.add(r)),e.customSubstitutions&&e.customSubstitutions.forEach(r=>{var o,i;r.type==="sub"&&((o=r.details)!=null&&o.outPlayerId&&a.add(r.details.outPlayerId),(i=r.details)!=null&&i.inPlayerId&&a.add(r.details.inPlayerId))})),qn().forEach(r=>a.add(r.id)),a.forEach(r=>{if(t||!n[r]){const o=Je.find(i=>i.id===r);o&&(n[r]={id:o.id,name:o.name,number:o.number||""})}}),n}function $t(e,t=null){if(!e)return null;const n=t||Le();if(n&&n.playerSnapshots&&n.playerSnapshots[e])return n.playerSnapshots[e];const a=Je.find(s=>s.id===e);return a||{id:e,name:"未配置選手",number:""}}async function Ki(){let e=!1;if(We)try{const{data:t,error:n}=await We.from("sim_players").select("*").order("created_at",{ascending:!0}),{data:a,error:s}=await We.from("sim_patterns").select("*").order("created_at",{ascending:!1}),{data:r}=await We.from("master_data").select("data").eq("key","SIM_TEAMS").single(),{data:o}=await We.from("master_data").select("data").eq("key","SIM_TEMPLATES").single(),{data:i}=await We.from("master_data").select("data").eq("key","SIM_PLAYERS_MAP").single();if(r&&Array.isArray(r.data)&&r.data.length>0?Re=r.data:Re=[{id:"team_default",name:"ありんこアントス (A軍)"},{id:"team_b",name:"ありんこアントス (B軍・ジュニア)"}],qe=Re[0].id,o&&Array.isArray(o.data)?Ct=o.data:Ct=[],!n&&!s&&t&&a){const d=i&&typeof i.data=="object"?i.data:{};Je=t.map(l=>({id:l.id,name:l.name,number:l.number||"",teamId:l.team_id||d[l.id]||"team_default"})),Fe=a.map(l=>{var c,u;return Yi({id:l.id,name:l.name,teamId:((c=l.header_info)==null?void 0:c.teamId)||"team_default",mode:l.has_dh?10:9,basePositions:l.base_positions||{},customSubstitutions:l.custom_substitutions||[],battingOrder:l.batting_order||{},playerSnapshots:((u=l.header_info)==null?void 0:u.playerSnapshots)||{},headerInfo:l.header_info||{},created_at:l.created_at,updated_at:l.updated_at,isSynced:!0})}),Fe.sort((l,c)=>{const u=new Date(l.updated_at||l.created_at||(l.id.startsWith("pat_")?parseInt(l.id.replace("pat_","")):0)).getTime()||0;return(new Date(c.updated_at||c.created_at||(c.id.startsWith("pat_")?parseInt(c.id.replace("pat_","")):0)).getTime()||0)-u}),e=!0}else n&&console.error("Supabase load players error:",n),s&&console.error("Supabase load patterns error:",s)}catch(t){console.error("Supabase load failed:",t)}e||(Re=[{id:"team_default",name:"ありんこアントス (A軍)"},{id:"team_b",name:"ありんこアントス (B軍・ジュニア)"}],qe=Re[0].id,Ct=[],Je=[{id:"p1",name:"とあ",number:"2",teamId:"team_default"},{id:"p2",name:"そうま",number:"10",teamId:"team_default"},{id:"p3",name:"あきと",number:"3",teamId:"team_default"},{id:"p4",name:"ゆうき",number:"4",teamId:"team_default"},{id:"p5",name:"あいのすけ",number:"1",teamId:"team_default"},{id:"p6",name:"けんせい",number:"6",teamId:"team_default"},{id:"p7",name:"りゅうと",number:"7",teamId:"team_default"},{id:"p8",name:"ながまさ",number:"8",teamId:"team_default"},{id:"p9",name:"そうすけ",number:"9",teamId:"team_default"},{id:"p10",name:"たいち",number:"5",teamId:"team_default"}],Fe=[])}async function sr(){if(!We)return null;try{const e=await We.from("master_data").upsert({key:"SIM_TEAMS",data:Re});return e?e.error:null}catch(e){return console.error("Supabase teams sync error:",e),e}}async function uo(){if(!We)return null;try{const e=await We.from("master_data").upsert({key:"SIM_TEMPLATES",data:Ct});return e?e.error:null}catch(e){return console.error("Supabase templates sync error:",e),e}}async function Qi(){if(!We)return null;try{const e={};Je.forEach(t=>{e[t.id]=t.teamId||"team_default"}),await We.from("master_data").upsert({key:"SIM_PLAYERS_MAP",data:e})}catch(e){console.error("Supabase players map sync error:",e)}}async function _a(e,t=!1){if(!We)return null;try{let n;return t?n=await We.from("sim_players").delete().eq("id",e.id):n=await We.from("sim_players").upsert({id:e.id,name:e.name,number:e.number}),await Qi(),n?n.error:null}catch(n){return console.error("Supabase player sync error:",n),n}}async function Ua(e,t=!1){if(!We)return null;try{let n;if(t)n=await We.from("sim_patterns").delete().eq("id",e.id);else{const a=as(e);e.playerSnapshots=a;const s={...e.headerInfo||{},teamId:e.teamId||qe,playerSnapshots:a};n=await We.from("sim_patterns").upsert({id:e.id,name:e.name,has_dh:e.mode===10,base_positions:e.basePositions,custom_substitutions:e.customSubstitutions,batting_order:e.battingOrder||{},header_info:s,updated_at:new Date().toISOString()})}return n?n.error:null}catch(n){return console.error("Supabase pattern sync error:",n),n}}async function at(e){e&&(await Ua(e),oa())}function bn(){const e=document.getElementById("sim-team-select"),t=document.getElementById("new-sim-team"),n=document.getElementById("sim-current-team-label"),a=Hn();n&&(n.textContent=`[${a.name}]`),e&&(e.innerHTML="",Re.forEach(s=>{const r=document.createElement("option");r.value=s.id,r.textContent=s.name,e.appendChild(r)}),e.value=qe),t&&(t.innerHTML="",Re.forEach(s=>{const r=document.createElement("option");r.value=s.id,r.textContent=s.name,t.appendChild(r)}),t.value=qe)}function ss(){const e=document.getElementById("sim-template-select-inline"),t=document.getElementById("new-sim-template");e&&(e.innerHTML='<option value="">(選択して適用)</option>',Ct.forEach(n=>{const a=document.createElement("option");a.value=n.id,a.textContent=n.name,e.appendChild(a)})),t&&(t.innerHTML='<option value="">(未配置から開始)</option>',Ct.forEach(n=>{const a=document.createElement("option");a.value=n.id,a.textContent=n.name,t.appendChild(a)}))}async function Zi(e="",t=null,n=null,a=null){const s="pat_"+Date.now(),r=t||qe,o=Re.find(f=>f.id===r)||Hn();let i={},d={},l=a!==null?a:ce;if(n){const f=Ct.find(g=>g.id===n);f&&(i=JSON.parse(JSON.stringify(f.basePositions||{})),d=JSON.parse(JSON.stringify(f.battingOrder||{})),l=f.mode||l)}ce=l,qe=r;const c={id:s,name:e||"新規データ",teamId:r,mode:ce,basePositions:i,customSubstitutions:[],battingOrder:d,playerSnapshots:as({basePositions:i,battingOrder:d}),headerInfo:{date:"",tournament:"",teamHome:o.name||"ありんこアントス",teamVisitor:"",manager:"",captain:"",scorer:"",stadium:"",time:""}};Fe.unshift(c),lt=s,await at(c),bn(),yn(),oa();const u=document.getElementById("sim-pattern-select");u&&(u.value=s)}function oa(){const e=document.getElementById("sim-pattern-select");e&&(e.innerHTML='<option value="">選択してください...</option>',Fe.forEach(t=>{const n=document.createElement("option");n.value=t.id;const a=t.isSynced===!1?" (未同期)":"",s=Re.find(o=>o.id===t.teamId),r=s?`[${s.name}] `:"";n.textContent=r+t.name+a,e.appendChild(n)}),lt&&(e.value=lt))}function yn(){const e=document.getElementById("btn-sim-mode-9"),t=document.getElementById("btn-sim-mode-10");ce===9?(e.className="px-3 py-1.5 text-xs font-bold bg-amber-600 text-white transition",t.className="px-3 py-1.5 text-xs font-bold bg-white text-gray-700 border-l hover:bg-gray-50 transition"):(e.className="px-3 py-1.5 text-xs font-bold bg-white text-gray-700 transition",t.className="px-3 py-1.5 text-xs font-bold bg-amber-600 text-white border-l hover:bg-gray-50 transition")}function Ia(e){const t={...e.basePositions||{}},n=ce===9?Ht:qt;return Object.keys(t).forEach(s=>{n.includes(s)||delete t[s]}),(e.customSubstitutions||[]).filter(s=>s.active).forEach(s=>{if(s.type==="swap"){const{pos1:r,pos2:o}=s.details;if(n.includes(r)&&n.includes(o)){const i=t[r];t[r]=t[o],t[o]=i}}else if(s.type==="sub"){const{outPlayerId:r,inPlayerId:o,pos:i}=s.details;if(r){const d=Object.keys(t).find(l=>t[l]===r);d&&(t[d]=o)}else i&&n.includes(i)&&(t[i]=o)}else if(s.type==="rotation"){const o=s.details.positions.filter(i=>n.includes(i));if(o.length>1){const i=o.map(d=>t[d]);for(let d=0;d<o.length;d++){const l=i[(d-1+o.length)%o.length];t[o[d]]=l}}}}),t}function $a(e){const t=new Set;return(e.customSubstitutions||[]).filter(a=>a.active).forEach(a=>{a.type==="sub"&&a.details.outPlayerId&&t.add(a.details.outPlayerId)}),t}function ea(e){e.battingOrder||(e.battingOrder={});const t=ce===9?Ht:qt,n=e.basePositions||{},a=new Set;t.forEach(i=>{n[i]&&a.add(n[i])}),Object.keys(e.battingOrder).forEach(i=>{const d=e.battingOrder[i];a.has(d)||delete e.battingOrder[i]});const s=new Set(Object.values(e.battingOrder)),r=[];a.forEach(i=>{s.has(i)||r.push(i)});const o=t.length;for(let i=1;i<=o&&r.length!==0;i++)if(!e.battingOrder[i]){const d=r.shift();e.battingOrder[i]=d}}function xe(){const e=Le();if(!e)return;const t=Ia(e),n=$a(e),a=new Set(Object.values(t).filter(Boolean));ea(e),Xi(a,n),ed(a,n),td(t,e),nd(e),ad(e),sd(e)}function Xi(e,t){const n=document.getElementById("sim-players-list"),a=document.getElementById("sim-player-count");if(!n)return;n.innerHTML="";const s=qn();if(a&&(a.textContent=`${s.length} 人`),s.length===0){n.innerHTML='<span class="text-xs text-gray-400 p-2">このチームに登録されている選手がいません。</span>';return}s.forEach(r=>{const o=e.has(r.id),i=t.has(r.id),d=He===r.id&&Ae==="players-list",l=document.createElement("div");l.className=`sim-player-badge ${o?"assigned":""} ${i?"retired":""} ${d?"selected":""}`,l.setAttribute("data-player-id",r.id),!o&&!i&&(l.setAttribute("draggable","true"),l.addEventListener("dragstart",mo));const c=r.number?`#${r.number} `:"";l.innerHTML=`
            <span>${c}${Be(r.name)}${i?" (交代済)":""}</span>
            <span class="sim-player-edit-btn" data-player-id="${r.id}" title="選手名・背番号を編集">✏️</span>
            <span class="sim-player-delete-btn" data-player-id="${r.id}" title="削除">×</span>
        `,l.addEventListener("click",u=>{if(u.target.classList.contains("sim-player-edit-btn")){u.stopPropagation(),Ed(r.id);return}if(u.target.classList.contains("sim-player-delete-btn")){u.stopPropagation(),Id(r.id);return}o||i||fo(r.id,"players-list")}),n.appendChild(l)})}function ed(e,t){const n=document.getElementById("sim-bench-list");if(!n)return;n.innerHTML="";const s=qn().filter(r=>!e.has(r.id)&&!t.has(r.id));if(s.length===0){n.innerHTML='<span class="text-xs text-gray-400 p-1">控え選手はいません。</span>';return}s.forEach(r=>{const o=He===r.id&&Ae==="bench",i=document.createElement("div");i.className=`sim-player-badge sim-bench-badge ${o?"selected":""}`,i.setAttribute("data-player-id",r.id),i.setAttribute("draggable","true");const d=r.number?`#${r.number} `:"";i.innerHTML=`<span>${d}${Be(r.name)}</span>`,i.addEventListener("dragstart",mo),i.addEventListener("click",()=>{fo(r.id,"bench")}),n.appendChild(i)})}function td(e,t){const n=document.getElementById("sim-field-positions");if(!n)return;n.innerHTML="",(ce===9?Ht:qt).forEach(s=>{const r=e[s],o=$t(r,t),i=(t.basePositions||{})[s]!==r&&r,d=He&&Ae===s,l=document.createElement("div");l.className=`sim-pos-slot pos-${s} ${d?"swap-selected":""}`,l.setAttribute("data-position",s),l.addEventListener("dragover",dd),l.addEventListener("dragleave",ld),l.addEventListener("drop",cd),l.addEventListener("click",()=>{ud(s)});const c=o&&o.number?`#${o.number} `:"";l.innerHTML=`
            <div class="sim-pos-title">${Kt[s]}</div>
            <div class="sim-pos-player ${i?"player-changed":""}">
                ${o?c+Be(o.name):'<span class="text-gray-300 text-xs font-normal">未配置</span>'}
            </div>
        `,n.appendChild(l)})}function nd(e){const t=document.getElementById("sim-batting-order-list");if(!t)return;t.innerHTML="";const n=ce===9?Ht:qt,a=n.length,s=e.basePositions||{},r={};n.forEach(o=>{const i=s[o];i&&(r[i]=o)});for(let o=1;o<=a;o++){const i=e.battingOrder[o],d=i?$t(i,e):null,l=d?r[d.id]:null,c=l?Kt[l]:"未配置",u=document.createElement("div");d?u.className="flex items-center justify-between bg-amber-50/50 border border-amber-100 rounded-lg p-2 text-xs transition-colors duration-150":u.className="flex items-center justify-between bg-gray-50/50 border border-dashed border-gray-200 rounded-lg p-2 text-xs text-gray-400 transition-colors duration-150";const f=document.createElement("div");f.className="flex items-center gap-1 shrink-0";const g=document.createElement("button");g.className="px-2 py-1 bg-amber-100 hover:bg-amber-200 disabled:opacity-30 disabled:cursor-not-allowed text-amber-900 font-bold rounded text-[10px] leading-none transition shadow-sm",g.textContent="▲",o===1&&(g.disabled=!0),g.addEventListener("click",()=>Tr(o,"up"));const y=document.createElement("button");y.className="px-2 py-1 bg-amber-100 hover:bg-amber-200 disabled:opacity-30 disabled:cursor-not-allowed text-amber-900 font-bold rounded text-[10px] leading-none transition shadow-sm",y.textContent="▼",o===a&&(y.disabled=!0),y.addEventListener("click",()=>Tr(o,"down")),f.appendChild(g),f.appendChild(y);let b="";if(d){const p=d.number?`#${d.number} `:"";b=`
                <div class="flex items-center gap-2">
                    <span class="bg-amber-600 text-white font-bold rounded-full w-5 h-5 flex items-center justify-center text-[10px]">${o}</span>
                    <span class="font-bold text-gray-800">${p}${Be(d.name)}</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">${c}</span>
                </div>
            `}else b=`
                <div class="flex items-center gap-2">
                    <span class="bg-gray-400 text-white font-bold rounded-full w-5 h-5 flex items-center justify-center text-[10px]">${o}</span>
                    <span class="italic text-gray-400">（未設定）</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-[10px] bg-gray-100 text-gray-400 font-bold px-1.5 py-0.5 rounded">${c}</span>
                </div>
            `;u.innerHTML=b,u.appendChild(f),t.appendChild(u)}}async function Tr(e,t){const n=Le();if(!n)return;n.battingOrder||(n.battingOrder={});const a=t==="up"?e-1:e+1,r=(ce===9?Ht:qt).length;if(a<1||a>r)return;const o=n.battingOrder[e],i=n.battingOrder[a];o&&i?(n.battingOrder[e]=i,n.battingOrder[a]=o):o?(n.battingOrder[a]=o,delete n.battingOrder[e]):i&&(n.battingOrder[e]=i,delete n.battingOrder[a]),await at(n),xe()}function rr(e,t,n,a=null){if(!e)return{code:"",desc:"",fullDesc:""};const s=a||Le();if(e.type==="sub"){const{outPlayerId:r,inPlayerId:o}=e.details,i=$t(r,s),d=$t(o,s),l=i?i.name:"不明",c=d?d.name:"不明",u=Object.keys(t).find(m=>t[m]===r),f=u&&Jn[u]||"",g=u?Kt[u]||"":"選手",y=f?`交代 (${f})`:"交代",b=n?`<span class="font-bold text-amber-900">${Be(l)}</span>に代わって<span class="font-bold text-amber-900">${Be(c)}</span>`:`${l}に代わって${c}`,p=`${g}の${l}に代わりまして、${c}が入ります。`;return{code:y,desc:b,fullDesc:p}}else if(e.type==="rotation"){const r=e.details.positions||[],i=r.map(u=>Jn[u]||u).join("-"),d=[];for(let u=0;u<r.length-1;u++){const f=r[u],g=r[u+1],y=t[f],b=$t(y,s);if(b){const p=n?`<span class="font-bold text-amber-900">${Be(b.name)}</span>`:b.name;d.push(`${p}が${Kt[g]}`)}}const l=d.join("、"),c=l?`${l}へ。`:"ポジション交代";return{code:i,desc:l,fullDesc:c}}else if(e.type==="swap"){const{pos1:r,pos2:o}=e.details,i=t[r],d=t[o],l=$t(i,s),c=$t(d,s),u=Jn[r]||r,f=Jn[o]||o,g=Kt[r]||"",y=Kt[o]||"",b=l?l.name:"未配置",p=c?c.name:"未配置",m=`${u}⇔${f}`,h=n?`<span class="font-bold text-amber-900">${Be(b)}</span>と<span class="font-bold text-amber-900">${Be(p)}</span>の入れ替え`:`${b}と${p}の入れ替え`,_=`${g}の${b}と${y}の${p}が入れ替わります。`;return{code:m,desc:h,fullDesc:_}}return{code:"",desc:"",fullDesc:""}}function ad(e){const t=document.getElementById("sim-sub-rules-list");if(!t)return;t.innerHTML="";const n=e.customSubstitutions||[];if(n.length===0){t.innerHTML='<p class="text-xs text-gray-400 text-center py-4">登録された交代はありません。</p>';return}const a=ce===9?Ht:qt;let s={...e.basePositions||{}};n.forEach(r=>{const o=rr(r,s,!0);if(r.active){if(r.type==="swap"){const{pos1:l,pos2:c}=r.details;if(a.includes(l)&&a.includes(c)){const u=s[l];s[l]=s[c],s[c]=u}}else if(r.type==="sub"){const{outPlayerId:l,inPlayerId:c,pos:u}=r.details;if(l){const f=Object.keys(s).find(g=>s[g]===l);f&&(s[f]=c)}else u&&a.includes(u)&&(s[u]=c)}else if(r.type==="rotation"){const c=r.details.positions.filter(u=>a.includes(u));if(c.length>1){const u=c.map(f=>s[f]);for(let f=0;f<c.length;f++){const g=u[(f-1+c.length)%c.length];s[c[f]]=g}}}}const i=document.createElement("div");i.className=`sub-rule-card ${r.active?"active":""}`;const d=r.name?`<span class="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded leading-none inline-block mb-1 border border-amber-200/50">${Be(r.name)}</span>`:"";i.innerHTML=`
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
        `,i.querySelector('input[type="checkbox"]').addEventListener("change",l=>{rd(r.id,l.target.checked)}),i.querySelector(".btn-delete-rule").addEventListener("click",()=>{id(r.id)}),t.appendChild(i)})}function sd(e){const t=document.getElementById("sim-announcement-logs");if(!t)return;t.innerHTML="";const n=(e.customSubstitutions||[]).filter(r=>r.active);if(n.length===0){t.innerHTML='<p class="text-xs text-gray-400 text-center py-2">適用中の交代はありません（基本配置のままです）。</p>';return}const a=ce===9?Ht:qt;let s={...e.basePositions||{}};n.forEach(r=>{const o=rr(r,s,!1);if(r.type==="swap"){const{pos1:l,pos2:c}=r.details;if(a.includes(l)&&a.includes(c)){const u=s[l];s[l]=s[c],s[c]=u}}else if(r.type==="sub"){const{outPlayerId:l,inPlayerId:c,pos:u}=r.details;if(l){const f=Object.keys(s).find(g=>s[g]===l);f&&(s[f]=c)}else u&&a.includes(u)&&(s[u]=c)}else if(r.type==="rotation"){const c=r.details.positions.filter(u=>a.includes(u));if(c.length>1){const u=c.map(f=>s[f]);for(let f=0;f<c.length;f++){const g=u[(f-1+c.length)%c.length];s[c[f]]=g}}}const i=r.name?`【${Be(r.name)}】`:"",d=document.createElement("div");d.className="announcement-item",d.innerHTML=`
            <span class="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0">${o.code}</span>
            <span class="text-xs font-semibold truncate text-amber-900">${i}${o.fullDesc}</span>
        `,t.appendChild(d)})}function Ye(){const e=Le();if(!e)return;const t=ce===9?Ht:qt,n=document.getElementById("sub-player-out"),a=document.getElementById("sub-player-in"),s=Ia(e),r=new Set(Object.values(s).filter(Boolean)),o=$a(e);if(n&&(n.innerHTML="",t.forEach(d=>{var c;const l=s[d];if(l){const u=((c=$t(l,e))==null?void 0:c.name)||"未配置",f=document.createElement("option");f.value=l,f.textContent=`${u} (${Kt[d]})`,n.appendChild(f)}})),a){a.innerHTML="";const l=qn().filter(c=>!r.has(c.id)&&!o.has(c.id));l.length===0?a.innerHTML='<option value="">控え選手なし</option>':l.forEach(c=>{const u=document.createElement("option");u.value=c.id,u.textContent=c.name,a.appendChild(u)})}const i=document.getElementById("rot-input-text");i&&(i.value="")}async function rd(e,t){const n=Le();if(!n)return;const a=n.customSubstitutions.find(s=>s.id===e);a&&(a.active=t,await at(n),Ye(),xe())}async function od(){const e=Le();if(!e)return;const t=document.getElementById("rule-type-select"),n=t?t.value:"rotation";let a={};if(n==="sub"){const d=document.getElementById("sub-player-out").value,l=document.getElementById("sub-player-in").value;if(!d){alert("退く選手を選択してください。");return}if(!l){alert("入る控え選手を選択してください。");return}a={outPlayerId:d,inPlayerId:l}}else if(n==="rotation"){const d=document.getElementById("rot-input-text"),l=d?d.value.trim():"";if(!l){alert("交代ルートを入力してください（例: 1-3-1）。");return}if(!/^[0-9a-zA-Z]+(-[0-9a-zA-Z]+)*$/.test(l)){alert("入力形式が正しくありません。半角数字・英字とハイフンで入力してください（例: 1-3-1）。");return}const c=l.split("-").filter(Boolean);if(c.length<2){alert("交代には最低2つのポジションが必要です（例: 1-3）。");return}const u=ce===9?Ht:qt,f=[];for(const g of c){const y=Ji[g];if(!y){alert(`無効なポジション番号「${g}」が含まれています。1〜9またはDHを指定してください。`);return}if(!u.includes(y)){alert(`ポジション「${g}」(${Kt[y]||y})は、現在の守備モード（DH${ce===10?"あり":"なし"}）では使用できません。`);return}f.push(y)}for(let g=0;g<f.length-1;g++)if(f[g]===f[g+1]){alert("隣り合うポジションに同じものを指定することはできません（例: 1-1-3 は不可）。");return}a={positions:f}}const s=document.getElementById("rule-name-input"),r=s?s.value.trim():"",o={id:"rule_"+Date.now(),name:r,type:n,active:!1,details:a};e.customSubstitutions||(e.customSubstitutions=[]),e.customSubstitutions.push(o),await at(e),s&&(s.value="");const i=document.getElementById("rot-input-text");i&&(i.value=""),Ye(),xe(),ja("subrules")}async function id(e){const t=Le();t&&(t.customSubstitutions=t.customSubstitutions.filter(n=>n.id!==e),await at(t),Ye(),xe())}function ja(e){const t=document.getElementById("tab-btn-setup"),n=document.getElementById("tab-btn-subrules"),a=document.getElementById("panel-setup"),s=document.getElementById("panel-subrules");e==="setup"?(t.className="flex-1 py-2 px-3 text-center text-sm font-bold bg-amber-600 text-white transition",n.className="flex-1 py-2 px-3 text-center text-sm font-bold bg-white text-gray-700 border-l hover:bg-gray-50 transition",a.classList.remove("hidden"),s.classList.add("hidden")):(t.className="flex-1 py-2 px-3 text-center text-sm font-bold bg-white text-gray-700 transition",n.className="flex-1 py-2 px-3 text-center text-sm font-bold bg-amber-600 text-white border-l hover:bg-gray-50 transition font-bold",a.classList.add("hidden"),s.classList.remove("hidden"))}function mo(e){const t=e.currentTarget.getAttribute("data-player-id");e.dataTransfer.setData("text/plain",t);let n="bench";e.currentTarget.parentNode.id==="sim-players-list"&&(n="players-list"),e.dataTransfer.setData("source-pos",n)}function dd(e){e.preventDefault(),e.currentTarget.classList.add("drag-over")}function ld(e){e.currentTarget.classList.remove("drag-over")}function cd(e){e.preventDefault(),e.currentTarget.classList.remove("drag-over");const t=e.dataTransfer.getData("text/plain"),n=e.currentTarget.getAttribute("data-position");!t||!n||po(t,n)}async function po(e,t){const n=Le();if(!n)return;n.basePositions||(n.basePositions={});let a=null;Object.keys(n.basePositions).forEach(r=>{n.basePositions[r]===e&&(a=r)});const s=n.basePositions[t];a&&(n.basePositions[a]=s),n.basePositions[t]=e,ea(n),await at(n),He=null,Ae=null,Ye(),xe()}function fo(e,t){He===e&&Ae===t?(He=null,Ae=null):(He=e,Ae=t),xe()}async function ud(e){const t=Le();if(!t)return;t.basePositions||(t.basePositions={});const n=t.basePositions[e];if(He)if(Ae!=="players-list"&&Ae!=="bench"){const a=t.basePositions[Ae];t.basePositions[Ae]=n,t.basePositions[e]=a,ea(t),await at(t),He=null,Ae=null,Ye(),xe()}else po(He,e);else n&&(He=n,Ae=e,xe())}async function md(e){const t=Le();t&&(t.basePositions||(t.basePositions={}),t.basePositions[e]=null,ea(t),await at(t),He=null,Ae=null,Ye(),xe())}async function pd(){const e=prompt(`新しいチーム名を入力してください:
(例: ありんこアントス (B軍), ジュニア選抜など)`);if(!e||!e.trim())return;const t=e.trim();if(Re.some(a=>a.name===t)){alert("同じ名前のチームが既に存在します。");return}const n={id:"team_"+Date.now(),name:t};Re.push(n),qe=n.id,await sr(),bn(),xe()}async function fd(){const e=Hn(),t=prompt("チーム名を変更してください:",e.name);if(!t||!t.trim())return;const n=t.trim();if(n!==e.name){if(Re.some(a=>a.id!==e.id&&a.name===n)){alert("同じ名前のチームが既に存在します。");return}e.name=n,await sr(),bn(),oa(),xe()}}async function gd(){if(Re.length<=1){alert("登録チームが1つのみのため、削除できません。");return}const e=Hn(),t=qn();let n=`チーム「${e.name}」を削除しますか？`;if(t.length>0&&(n+=`
※このチームに登録されている ${t.length} 名の選手データも削除されます。`),!confirm(n))return;const a=new Set(t.map(s=>s.id));Je=Je.filter(s=>!a.has(s.id));for(const s of t)await _a(s,!0);Re=Re.filter(s=>s.id!==e.id),qe=Re[0].id,await sr(),bn(),xe()}function bd(e){qe=e.target.value;const t=document.getElementById("sim-current-team-label"),n=Hn();t&&(t.textContent=`[${n.name}]`),He=null,Ae=null,Ye(),xe()}async function yd(){const e=Le();if(!e)return;const t=e.name?`${e.name}の基本形`:"基本配置パターン",n=prompt(`初期パターン（テンプレート）の登録名を入力してください:
(例: A軍 守備基本形、10人制DH基本配置など)`,t);if(!n||!n.trim())return;const a=n.trim(),s={id:"tmpl_"+Date.now(),name:a,mode:ce,basePositions:JSON.parse(JSON.stringify(e.basePositions||{})),battingOrder:JSON.parse(JSON.stringify(e.battingOrder||{}))};Ct.push(s),await uo(),ss(),alert(`初期パターン「${a}」を登録しました。
新規作成時や初期パターンセレクタからいつでも適用できます。`)}async function hd(e){if(!e)return;const t=Ct.find(s=>s.id===e);if(!t)return;if(!confirm(`初期パターン「${t.name}」を現在のグラウンドに適用しますか？
（現在のスタメン配置・打順が上書きされます）`)){const s=document.getElementById("sim-template-select-inline");s&&(s.value="");return}const n=Le();n&&(n.basePositions=JSON.parse(JSON.stringify(t.basePositions||{})),n.battingOrder=JSON.parse(JSON.stringify(t.battingOrder||{})),t.mode&&(n.mode=t.mode,ce=t.mode,yn()),await at(n));const a=document.getElementById("sim-template-select-inline");a&&(a.value=""),Ye(),xe()}async function xd(){const e=document.getElementById("sim-template-select-inline"),t=e?e.value:"";if(!t){alert("削除したい初期パターンを選択してください。");return}const n=Ct.find(a=>a.id===t);n&&confirm(`初期パターン「${n.name}」を削除しますか？`)&&(Ct=Ct.filter(a=>a.id!==t),await uo(),ss(),alert(`初期パターン「${n.name}」を削除しました。`))}function vd(){const e=document.getElementById("sim-new-modal");if(!e)return;bn(),ss();const t=document.getElementById("new-sim-name");if(t){const r=new Date,o=`${r.getFullYear()}/${String(r.getMonth()+1).padStart(2,"0")}/${String(r.getDate()).padStart(2,"0")}`;t.value=`${o} 練習試合`}const n=document.getElementById("new-sim-team");n&&(n.value=qe);const a=document.getElementById("new-sim-template");a&&(a.value="");const s=document.querySelector(`input[name="new-sim-dh-mode"][value="${ce}"]`);s&&(s.checked=!0),e.classList.remove("hidden")}function Ds(){const e=document.getElementById("sim-new-modal");e&&e.classList.add("hidden")}async function wd(){const e=document.getElementById("new-sim-name"),t=document.getElementById("new-sim-team"),n=document.getElementById("new-sim-template"),a=document.querySelector('input[name="new-sim-dh-mode"]:checked'),s=e?e.value.trim():"",r=t?t.value:qe,o=n?n.value:null,i=a?parseInt(a.value,10):9;if(!s){alert("シミュレーションデータ名を入力してください。");return}await Zi(s,r,o,i),Ds(),Ye(),xe()}async function hs(){const e=document.getElementById("sim-new-player-input"),t=document.getElementById("sim-new-player-number");if(!e)return;const n=e.value.trim(),a=t?t.value.trim():"";if(!n)return;if(qn().some(o=>o.name===n)){alert("このチームには同じフルネームの選手が既に登録されています。");return}const r={id:"p_"+Date.now()+"_"+Math.random().toString(36).substr(2,5),name:n,number:a,teamId:qe};Je.push(r),await _a(r),e.value="",t&&(t.value=""),Ye(),xe()}function Ed(e){const t=Je.find(o=>o.id===e);if(!t)return;const n=document.getElementById("sim-edit-player-modal"),a=document.getElementById("edit-player-id"),s=document.getElementById("edit-player-name"),r=document.getElementById("edit-player-number");a&&(a.value=t.id),s&&(s.value=t.name),r&&(r.value=t.number||""),n&&n.classList.remove("hidden"),s&&(s.focus(),s.select())}function Cs(){const e=document.getElementById("sim-edit-player-modal");e&&e.classList.add("hidden")}async function xs(){const e=document.getElementById("edit-player-id"),t=document.getElementById("edit-player-name"),n=document.getElementById("edit-player-number"),a=e?e.value:"",s=t?t.value.trim():"",r=n?n.value.trim():"";if(!a)return;if(!s){alert("選手フルネームを入力してください。");return}const o=Je.find(d=>d.id===a);if(!o)return;if(qn().some(d=>d.id!==a&&d.name===s)){alert("このチームには同じフルネームの別の選手が既に登録されています。");return}o.name=s,o.number=r,await _a(o),Cs(),Ye(),xe()}async function _d(){const e=Le();if(!e){alert("配置データが選択されていません。");return}e.playerSnapshots=as(e,!0),e.headerInfo||(e.headerInfo={}),e.headerInfo.playerSnapshots=e.playerSnapshots,await at(e),Ye(),xe(),alert(`配置データ「${e.name||"現在のデータ"}」の選手情報（氏名・背番号）をマスターの最新データで上書き更新しました。`)}async function Id(e){const t=Je.find(n=>n.id===e);if(t&&confirm(`選手「${t.name}」を削除しますか？
（データベースの全データ配置・交代設定からも削除されます）`)){Je=Je.filter(n=>n.id!==e),await _a(t,!0);for(const n of Fe){let a=!1;if(n.basePositions||(n.basePositions={}),Object.keys(n.basePositions).forEach(s=>{n.basePositions[s]===e&&(n.basePositions[s]=null,a=!0)}),n.battingOrder&&Object.keys(n.battingOrder).forEach(s=>{n.battingOrder[s]===e&&(delete n.battingOrder[s],a=!0)}),n.customSubstitutions){const s=n.customSubstitutions.length;n.customSubstitutions=n.customSubstitutions.filter(r=>r.type==="sub"?r.details.outPlayerId!==e&&r.details.inPlayerId!==e:!0),n.customSubstitutions.length!==s&&(a=!0)}a&&await at(n)}He===e&&(He=null,Ae=null),Ye(),xe()}}async function $d(){const e=document.getElementById("sim-pattern-select");if(!e)return;const t=e.value;let n=!1,a=null,s="";const r=Le();if(t){const o=e.options[e.selectedIndex];confirm(`現在「${o.text}」が選択されています。
このデータに上書き保存しますか？
（「キャンセル」を選ぶと新規保存になります）`)&&(n=!0,s=o.text,a=t)}if(!n){const o=r?r.name:"新規配置データ",i=prompt("保存名を入力してください：",o);if(!i)return;if(s=i.trim(),!s){alert("有効な保存名を入力してください。");return}}try{if(n&&a){if(r){r.name=s,r.teamId=qe,r.mode=ce,r.updated_at=new Date().toISOString();const i=await Ua(r);if(i)throw i;const d=Fe.findIndex(l=>l.id===r.id);d>0&&(Fe.splice(d,1),Fe.unshift(r)),alert(`データ「${s}」を上書き保存しました。`)}}else{const i="pat_"+Date.now(),d=Hn(),l=new Date().toISOString(),c={id:i,name:s,teamId:qe,mode:ce,created_at:l,updated_at:l,basePositions:r?{...r.basePositions||{}}:{},customSubstitutions:r?JSON.parse(JSON.stringify(r.customSubstitutions||[])):[],battingOrder:r?{...r.battingOrder||{}}:{},playerSnapshots:r&&r.playerSnapshots?{...r.playerSnapshots}:as(r),headerInfo:r?JSON.parse(JSON.stringify(r.headerInfo||{})):{date:"",tournament:"",teamHome:d.name||"ありんこアントス",teamVisitor:"",manager:"",captain:"",scorer:"",stadium:"",time:""}};Fe.unshift(c),lt=i;const u=await Ua(c);if(u)throw u;alert(`データ「${s}」を保存しました。`)}oa();const o=document.getElementById("sim-pattern-select");o&&(o.value=lt),xe()}catch(o){console.error("Save pattern error:",o),alert(`保存に失敗しました。
エラー詳細: ${o.message||o}`)}}async function Sd(){const e=Le();if(!e||!e.id){alert("削除する配置データが選択されていません。");return}if(!confirm(`配置データ「${e.name}」を削除しますか？
（データベースから削除されます）`))return;Fe=Fe.filter(n=>n.id!==lt);const t=await Ua(e,!0);Fe.length>0?lt=Fe[0].id:lt="",oa(),alert(t?`データ「${e.name}」のデータベースからの削除に失敗しました。
エラー詳細: ${t.message||t}`:`データ「${e.name}」を削除しました。`),He=null,Ae=null,yn(),Ye(),xe()}async function kd(e){const t=e.target.value;if(!t)lt="",Na=null,He=null,Ae=null,xe();else{lt=t;const n=Le();n&&(ce=n.mode||9,n.teamId&&Re.some(a=>a.id===n.teamId)&&(qe=n.teamId,bn())),He=null,Ae=null,yn(),Ye(),xe()}}function Ld(){const e=Le();if(!e)return;const t=Ia(e),n=$a(e),a=e.headerInfo||{};document.getElementById("member-input-date").value=a.date||"",document.getElementById("member-input-tournament").value=a.tournament||"",document.getElementById("member-input-team-home").value=a.teamHome||"ありんこアントス",document.getElementById("member-input-team-visitor").value=a.teamVisitor||"",document.getElementById("member-input-manager").value=a.manager||"",document.getElementById("member-input-captain").value=a.captain||"",document.getElementById("member-input-scorer").value=a.scorer||"",document.getElementById("member-input-stadium").value=a.stadium||"",document.getElementById("member-input-time").value=a.time||"",go(e,t,n);const s=document.getElementById("sim-member-modal");s&&s.classList.remove("hidden")}function Bd(){const e=Le();if(!e)return;e.headerInfo||(e.headerInfo={}),e.headerInfo.date=document.getElementById("member-input-date").value.trim(),e.headerInfo.tournament=document.getElementById("member-input-tournament").value.trim(),e.headerInfo.teamHome=document.getElementById("member-input-team-home").value.trim(),e.headerInfo.teamVisitor=document.getElementById("member-input-team-visitor").value.trim(),e.headerInfo.manager=document.getElementById("member-input-manager").value.trim(),e.headerInfo.captain=document.getElementById("member-input-captain").value.trim(),e.headerInfo.scorer=document.getElementById("member-input-scorer").value.trim(),e.headerInfo.stadium=document.getElementById("member-input-stadium").value.trim(),e.headerInfo.time=document.getElementById("member-input-time").value.trim(),at(e);const t=Ia(e),n=$a(e);go(e,t,n)}function go(e,t,n){const a=ce===9?Ht:qt,s=e.headerInfo||{};let r=`【 メンバー表 (Ants) 】
`;r+=`日時: ${s.date||"未設定"}  時間: ${s.time||"未設定"}
`,r+=`大会: ${s.tournament||"未設定"}  球場: ${s.stadium||"未設定"}
`,r+=`対戦: ${s.teamHome||"未設定"} vs ${s.teamVisitor||"未設定"}
`,r+=`監督: ${s.manager||"未設定"}  主将: ${s.captain||"未設定"}  スコアラー: ${s.scorer||"未設定"}
`,r+=`------------------------------------

`,r+=`◆ スターティングメンバー (打順順)
`;const o=a.length,i=e.basePositions||{},d={};a.forEach(g=>{const y=i[g];y&&(d[y]=g)});for(let g=1;g<=o;g++){const y=e.battingOrder[g];if(y){const b=$t(y,e),p=d[y];if(b&&p){const m=Jn[p],h=b.number?` [#${b.number}]`:"";r+=`${g}. [${m}] ${Kt[p]} : ${b.name}${h}
`}}}r+=`
◆ 控え選手 (ベンチ)
`;const l=new Set(Object.values(t).filter(Boolean)),c=Je.filter(g=>!l.has(g.id)&&!n.has(g.id));c.length===0?r+=`(なし)
`:c.forEach(g=>{const y=$t(g.id,e),b=y.number?` [#${y.number}]`:"";r+=`・${y.name}${b}
`}),r+=`
◆ 交代履歴
`;const u=(e.customSubstitutions||[]).filter(g=>g.active);if(u.length===0)r+=`(なし: 基本配置のままです)
`;else{let g={...e.basePositions||{}};u.forEach((y,b)=>{const p=rr(y,g,!1,e);if(r+=`${b+1}. [${p.code}] ${p.fullDesc}
`,y.type==="swap"){const{pos1:m,pos2:h}=y.details,_=g[m];g[m]=g[h],g[h]=_}else if(y.type==="sub"){const{outPlayerId:m,inPlayerId:h}=y.details,_=Object.keys(g).find(I=>g[I]===m);_&&(g[_]=h)}else if(y.type==="rotation"){const m=y.details.positions,h=m.map(_=>g[_]);for(let _=0;_<m.length;_++){const I=h[(_-1+m.length)%m.length];g[m[_]]=I}}})}const f=document.getElementById("sim-member-text");f&&(f.value=r)}function Ad(){const e=document.getElementById("sim-member-text");e&&(e.select(),document.execCommand("copy"),alert("メンバー表をクリップボードにコピーしました！"))}function Dr(){const e=document.getElementById("sim-member-modal");e&&e.classList.add("hidden")}function Td(){const e=Le();if(!e)return;const t=Ia(e),n=$a(e),a=ce===9?Ht:qt,s=e.headerInfo||{},r=e.basePositions||{},o={};a.forEach(y=>{const b=r[y];b&&(o[b]=y)});const i=a.length,d=[];for(let y=1;y<=i;y++){const b=e.battingOrder[y];if(b){const p=$t(b,e),m=o[b];p&&m&&d.push({order:y,posNum:Jn[m],name:p.name,number:p.number||""})}}for(;d.length<9;)d.push({order:d.length+1,posNum:"",name:"",number:""});const l=new Set(Object.values(t).filter(Boolean)),c=Je.filter(y=>!l.has(y.id)&&!n.has(y.id)),u=[];for(let y=0;y<6;y++){const b=y*2,p=y*2+1,m=c[b],h=c[p],_=m?$t(m.id,e):null,I=h?$t(h.id,e):null;u.push({leftName:_?_.name:"",leftNumber:_&&_.number||"",rightName:I?I.name:"",rightNumber:I&&I.number||""})}let f="";for(let y=1;y<=4;y++){let b="";d.forEach(_=>{b+=`
                <tr>
                    <td class="cell-order">${_.order}</td>
                    <td class="cell-pos">${_.posNum}</td>
                    <td class="cell-name">${Be(_.name)}</td>
                    <td class="cell-number">${_.number}</td>
                </tr>
            `}),ce===10&&d.length<10&&(b+='<tr><td class="cell-order">10</td><td class="cell-pos"></td><td class="cell-name"></td><td class="cell-number"></td></tr>');const p=ce===10?11:10,m=d.length;for(let _=m;_<p;_++)b+='<tr><td class="cell-order"></td><td class="cell-pos"></td><td class="cell-name"></td><td class="cell-number"></td></tr>';let h="";u.forEach(_=>{h+=`
                <tr>
                    <td class="cell-bench-name">${Be(_.leftName)}</td>
                    <td class="cell-bench-num">${_.leftNumber}</td>
                    <td class="cell-bench-name">${Be(_.rightName)}</td>
                    <td class="cell-bench-num">${_.rightNumber}</td>
                </tr>
            `}),f+=`
            <div class="sheet-card">
                <div class="card-page-idx">(${y}/4)</div>
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
                        ${b}
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
                        ${h}
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
    `),g.document.close()}function Dd(){const e=Le();if(!e)return;const t={version:"ants-sim-3.0",players:Je,pattern:e},n=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),a=URL.createObjectURL(n),s=document.createElement("a");s.href=a,s.download=`ants_positions_${e.name.replace(/[\s/\\?%*:|"<>\.]/g,"_")}.json`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(a)}function Cd(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=async function(a){try{const s=JSON.parse(a.target.result);if(s.version!=="ants-sim-3.0"&&s.version!=="ants-sim-2.0"&&s.version!=="ants-sim-1.0"){alert("ファイル形式が正しくありません。");return}if(confirm(`インポートを実行しますか？
※既存の選手リストと配置データがマージ/追加されます。`)){for(const r of s.players)Je.some(o=>o.id===r.id||o.name===r.name)||(Je.push(r),await _a(r));if(s.version==="ants-sim-3.0"){const r=s.pattern;r.id="pat_"+Date.now(),r.name=r.name+" (インポート)",Fe.push(r),lt=r.id,ce=r.mode,await at(r)}else if(s.version==="ants-sim-2.0"){const r=s.pattern;r.id="pat_"+Date.now(),r.name=r.name+" (インポート)",r.mode=r.mode||9,r.battingOrder={},r.headerInfo={},Fe.push(r),lt=r.id,ce=r.mode,await at(r)}else{const r=s.pattern,o=r.innings&&r.innings[0]?r.innings[0].positions:{},i={id:"pat_"+Date.now(),name:r.name+" (旧移行)",mode:r.mode||9,basePositions:o,customSubstitutions:[],battingOrder:{},headerInfo:{}};Fe.push(i),lt=i.id,ce=i.mode,await at(i)}yn(),Ye(),xe(),alert("インポートが完了しました。")}}catch(s){console.error(s),alert("ファイルの読み込みに失敗しました。")}e.target.value=""},n.readAsText(t)}function Nd(){var s,r,o,i,d,l,c,u,f,g,y,b,p,m,h,_,I,k,S,$,E,w,x,v,A,P,N,D,F,R,L,T,C,U,ee,z,K,H,Z;const e=document.getElementById("btn-toggle-players-panel"),t=document.getElementById("players-panel-content"),n=document.getElementById("icon-toggle-players");e&&t&&n&&(e.addEventListener("click",()=>{const re=t.classList.toggle("hidden");n.textContent=re?"▼":"▲",localStorage.setItem("ants_sim_players_panel_collapsed",re?"true":"false")}),localStorage.getItem("ants_sim_players_panel_collapsed")==="true"&&(t.classList.add("hidden"),n.textContent="▼")),(s=document.getElementById("tab-btn-setup"))==null||s.addEventListener("click",()=>ja("setup")),(r=document.getElementById("tab-btn-subrules"))==null||r.addEventListener("click",()=>ja("subrules")),(o=document.getElementById("rule-type-select"))==null||o.addEventListener("change",q=>{const re=q.target.value;document.getElementById("form-sub").classList.add("hidden"),document.getElementById("form-rotation").classList.add("hidden"),re==="sub"?document.getElementById("form-sub").classList.remove("hidden"):re==="rotation"&&document.getElementById("form-rotation").classList.remove("hidden")}),(i=document.getElementById("btn-export-member-table"))==null||i.addEventListener("click",Ld),(d=document.getElementById("btn-copy-member-text"))==null||d.addEventListener("click",Ad),(l=document.getElementById("btn-close-member-modal"))==null||l.addEventListener("click",Dr),(c=document.getElementById("btn-close-member-modal-footer"))==null||c.addEventListener("click",Dr),(u=document.getElementById("btn-print-member-table"))==null||u.addEventListener("click",Td),["member-input-date","member-input-tournament","member-input-team-home","member-input-team-visitor","member-input-manager","member-input-captain","member-input-scorer","member-input-stadium","member-input-time"].forEach(q=>{var re;(re=document.getElementById(q))==null||re.addEventListener("input",Bd)}),(f=document.getElementById("btn-create-sub-rule"))==null||f.addEventListener("click",od),(g=document.getElementById("btn-add-sim-player"))==null||g.addEventListener("click",hs),(y=document.getElementById("sim-new-player-input"))==null||y.addEventListener("keypress",q=>{q.key==="Enter"&&hs()}),(b=document.getElementById("sim-new-player-number"))==null||b.addEventListener("keypress",q=>{q.key==="Enter"&&hs()}),(p=document.getElementById("sim-team-select"))==null||p.addEventListener("change",bd),(m=document.getElementById("btn-add-sim-team"))==null||m.addEventListener("click",pd),(h=document.getElementById("btn-edit-sim-team"))==null||h.addEventListener("click",fd),(_=document.getElementById("btn-delete-sim-team"))==null||_.addEventListener("click",gd),(I=document.getElementById("sim-template-select-inline"))==null||I.addEventListener("change",q=>hd(q.target.value)),(k=document.getElementById("btn-save-as-template"))==null||k.addEventListener("click",yd),(S=document.getElementById("btn-delete-template"))==null||S.addEventListener("click",xd),($=document.getElementById("btn-open-new-sim-modal"))==null||$.addEventListener("click",vd),(E=document.getElementById("btn-close-new-sim-modal"))==null||E.addEventListener("click",Ds),(w=document.getElementById("btn-close-new-sim-modal-footer"))==null||w.addEventListener("click",Ds),(x=document.getElementById("btn-create-new-sim"))==null||x.addEventListener("click",wd),(v=document.getElementById("sim-pattern-select"))==null||v.addEventListener("change",kd),(A=document.getElementById("btn-save-sim-pattern"))==null||A.addEventListener("click",$d),(P=document.getElementById("btn-delete-sim-pattern"))==null||P.addEventListener("click",Sd),(N=document.getElementById("btn-refresh-sim-pattern"))==null||N.addEventListener("click",_d),(D=document.getElementById("btn-close-edit-player-modal"))==null||D.addEventListener("click",Cs),(F=document.getElementById("btn-close-edit-player-modal-footer"))==null||F.addEventListener("click",Cs),(R=document.getElementById("btn-save-edit-player"))==null||R.addEventListener("click",xs),(L=document.getElementById("edit-player-name"))==null||L.addEventListener("keypress",q=>{q.key==="Enter"&&xs()}),(T=document.getElementById("edit-player-number"))==null||T.addEventListener("keypress",q=>{q.key==="Enter"&&xs()}),(C=document.getElementById("btn-sim-mode-9"))==null||C.addEventListener("click",async()=>{if(ce!==9){ce=9,yn();const q=Le();q&&(q.mode=9,ea(q),await at(q)),Ye(),xe()}}),(U=document.getElementById("btn-sim-mode-10"))==null||U.addEventListener("click",async()=>{if(ce!==10){ce=10,yn();const q=Le();q&&(q.mode=10,ea(q),await at(q)),Ye(),xe()}}),(ee=document.getElementById("btn-export-sim"))==null||ee.addEventListener("click",Dd),(z=document.getElementById("import-sim-input"))==null||z.addEventListener("change",Cd),(K=document.getElementById("btn-back-to-menu-sim"))==null||K.addEventListener("click",()=>{He=null,Ae=null,se("app-menu-view")}),(H=document.getElementById("btn-logout-sim"))==null||H.addEventListener("click",()=>{var q;(q=document.getElementById("btn-logout"))==null||q.click()}),(Z=document.getElementById("sim-bench-list"))==null||Z.addEventListener("click",q=>{q.target.id==="sim-bench-list"&&He&&Ae!=="players-list"&&Ae!=="bench"&&md(Ae)})}function Be(e){return typeof e!="string"?"":e.replace(/[&<>'"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[t]||t)}let bo=null,cn=null,Tn=!1;const Dn="ants_surveys_v1",Qn="ants_survey_responses_v1";let pe=[],ke=[];const Cr=[{id:"survey_sample_1",title:"【夏季合宿】参加日程調整 & お弁当・合宿Tシャツ注文とりまとめ",description:`少年野球チーム Arinko Ants 夏季合宿（8月開催）の出欠日程および備品・お弁当の事前注文確認です。
**1回の送信で、保護者様ご本人と選手（兄弟含む）全員分の出欠・注文をまとめてご登録いただけます。**
ご不明な点がありましたら役員までお問い合わせください。`,status:"active",deadline:"2026-07-20 23:59",public_results:!0,enable_schedule:!0,schedule_options:["8/8(土) 午前 (練習・遠征)","8/8(土) 午後 (練習試合・BBQ)","8/8(土) 宿泊","8/9(日) 終日 (紅白戦・グラウンド納め)"],enable_family:!0,enable_orders:!0,order_items:[{id:"item_lunch_sat",name:"8/8(土) 選手・保護者弁当",price:650,max:10},{id:"item_lunch_sun",name:"8/9(日) 選手・保護者弁当",price:650,max:10},{id:"item_tshirt",name:"合宿記念チームTシャツ",price:2200,max:5},{id:"item_cap",name:" Ants オリジナル冷感タオル",price:800,max:5}],questions:[{id:"q_attendance",type:"single",title:"合宿全体の参加可否をお選びください",required:!0,options:[{label:"参加する（部分参加含む）",skip_to:null},{label:"不参加（全日程）",skip_to:"q_remarks"}],help:"不参加を選択された場合、日程詳細およびお弁当等の注文設問はスキップされます。"},{id:"q_transport",type:"single",title:"現地までの移動手段について",required:!1,options:[{label:"配車（チーム車）を利用希望",skip_to:null},{label:"自車で現地直行（他メンバー同乗可）",skip_to:null},{label:"自車で現地直行（家族のみ）",skip_to:null}],help:""},{id:"q_remarks",type:"text",title:"特記事項・アレルギー・連絡事項など",required:!1,options:[],help:"食物アレルギーや遅刻・早退のご予定等があればご記入ください。"}],created_by:"役員会",created_at:"2026-06-01",updated_at:"2026-06-01"}],Nr=[{id:"resp_sample_1",survey_id:"survey_sample_1",respondent_name:"菱沼 (保護者)",family_members:[{name:"菱沼 健一 (保護者・指導者)",role:"保護者"},{name:"菱沼 翔太 (6年・主将)",role:"選手"}],schedules:{"8/8(土) 午前 (練習・遠征)":"○","8/8(土) 午後 (練習試合・BBQ)":"○","8/8(土) 宿泊":"○","8/9(日) 終日 (紅白戦・グラウンド納め)":"○"},answers:{q_attendance:"参加する（部分参加含む）",q_transport:"自車で現地直行（他メンバー同乗可）",q_remarks:"車出し可能です。道具車としても利用できます。"},orders:{item_lunch_sat:2,item_lunch_sun:2,item_tshirt:1,item_cap:2},total_amount:6400,created_at:"2026-06-02 10:15"}];async function Pd({supabaseClient:e,currentUser:t,currentUserRole:n,canManageInfo:a=null}){bo=e,cn=t,a!==null?Tn=a:Tn=n==="admin"||(t==null?void 0:t.can_edit_info)===!0||n==="leader"&&(t==null?void 0:t.can_edit_info)!==!1,await Ns(),Tn&&Md(),vo(),Un()}async function Md(){const e=ia();if(e)try{const t=localStorage.getItem(Dn);if(t){const n=JSON.parse(t);Array.isArray(n)&&n.length>0&&(await e.from("master_data").upsert({key:"ANTS_SURVEYS",data:n}),console.log("Auto-synced surveys to master_data:",n.length))}}catch(t){console.warn("Auto-sync surveys to DB failed:",t)}}function ia(){return bo||window.supabaseClient||null}async function Ns(){let e=!1,t=!1;const n=ia();if(n){try{const{data:a,error:s}=await n.from("surveys").select("*").order("created_at",{ascending:!1});!s&&a&&a.length>0&&(pe=a,e=!0)}catch(a){console.warn("Supabase surveys load failed, trying master_data fallback:",a)}if(!e)try{const{data:a,error:s}=await n.from("master_data").select("data").eq("key","ANTS_SURVEYS");!s&&a&&a.length>0&&Array.isArray(a[0].data)&&a[0].data.length>0&&(pe=a[0].data,e=!0)}catch(a){console.warn("Supabase master_data ANTS_SURVEYS load skipped:",a)}try{const{data:a,error:s}=await n.from("survey_responses").select("*").order("created_at",{ascending:!1});!s&&a&&a.length>0&&(ke=a,t=!0)}catch(a){console.warn("Supabase survey_responses load failed, trying master_data fallback:",a)}if(!t)try{const{data:a,error:s}=await n.from("master_data").select("data").eq("key","ANTS_SURVEY_RESPONSES");!s&&a&&a.length>0&&Array.isArray(a[0].data)&&(ke=a[0].data,t=!0)}catch(a){console.warn("Supabase master_data ANTS_SURVEY_RESPONSES load skipped:",a)}}if(e)try{localStorage.setItem(Dn,JSON.stringify(pe))}catch{}else try{const a=localStorage.getItem(Dn);a?pe=JSON.parse(a):(pe=[...Cr],localStorage.setItem(Dn,JSON.stringify(pe)))}catch{pe=[...Cr]}if(t)try{localStorage.setItem(Qn,JSON.stringify(ke))}catch{}else try{const a=localStorage.getItem(Qn);a?ke=JSON.parse(a):(ke=[...Nr],localStorage.setItem(Qn,JSON.stringify(ke)))}catch{ke=[...Nr]}}async function yo(e,t=!1){const n=pe.findIndex(s=>s.id===e.id);n>=0?pe[n]=e:pe.unshift(e);try{localStorage.setItem(Dn,JSON.stringify(pe))}catch(s){console.error(s)}const a=ia();if(a){try{t?await a.from("surveys").insert([e]):await a.from("surveys").update(e).eq("id",e.id)}catch(s){console.warn("Supabase survey table save skipped:",s)}try{await a.from("master_data").upsert({key:"ANTS_SURVEYS",data:pe})}catch(s){console.warn("Supabase master_data ANTS_SURVEYS upsert failed:",s)}}}async function Rd(e){pe=pe.filter(n=>n.id!==e),ke=ke.filter(n=>n.survey_id!==e);try{localStorage.setItem(Dn,JSON.stringify(pe)),localStorage.setItem(Qn,JSON.stringify(ke))}catch(n){console.error(n)}const t=ia();if(t){try{await t.from("survey_responses").delete().eq("survey_id",e),await t.from("surveys").delete().eq("id",e)}catch{}try{await t.from("master_data").upsert({key:"ANTS_SURVEYS",data:pe}),await t.from("master_data").upsert({key:"ANTS_SURVEY_RESPONSES",data:ke})}catch{}}}async function Od(e){const t=ke.findIndex(s=>s.id===e.id),n=t>=0;n?ke[t]=e:ke.unshift(e);try{localStorage.setItem(Qn,JSON.stringify(ke))}catch(s){console.error(s)}const a=ia();if(a){try{n?await a.from("survey_responses").update(e).eq("id",e.id):await a.from("survey_responses").insert([e])}catch(s){console.warn("Supabase survey_responses table save skipped:",s)}try{await a.from("master_data").upsert({key:"ANTS_SURVEY_RESPONSES",data:ke})}catch(s){console.warn("Supabase master_data ANTS_SURVEY_RESPONSES upsert failed:",s)}}}async function Fd(e){ke=ke.filter(n=>n.id!==e);try{localStorage.setItem(Qn,JSON.stringify(ke))}catch(n){console.error(n)}const t=ia();if(t){try{await t.from("survey_responses").delete().eq("id",e)}catch{}try{await t.from("master_data").upsert({key:"ANTS_SURVEY_RESPONSES",data:ke})}catch{}}ta&&os(ta.id),Un()}function Un(){const e=document.getElementById("info-surveys-container"),t=document.getElementById("info-surveys-empty"),n=document.getElementById("btn-survey-new");if(e){if(n&&(Tn?n.classList.remove("hidden"):n.classList.add("hidden")),pe.length===0){e.innerHTML="",t&&t.classList.remove("hidden");return}t&&t.classList.add("hidden"),e.innerHTML=pe.map(a=>{const s=ke.filter(l=>l.survey_id===a.id),r=s.length,o=s.reduce((l,c)=>l+(Number(c.total_amount)||0),0);let i="";a.status==="active"?i='<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">🟢 受付中</span>':a.status==="closed"?i='<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">⚪ 締切済み</span>':i='<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">🟡 下書き</span>';const d=[];return a.enable_schedule&&d.push("📅 日程調整"),a.enable_family&&d.push("👨‍👩‍👧 家族一括"),a.enable_orders&&d.push("🛒 注文集計"),`
            <div class="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between gap-2 mb-3">
                        ${i}
                        <span class="text-xs text-gray-400 font-mono">期限: ${a.deadline||"なし"}</span>
                    </div>
                    <h3 class="text-base font-bold text-gray-900 mb-2 leading-snug">
                        ${le(a.title)}
                    </h3>
                    <p class="text-xs text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                        ${le(a.description||"")}
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
                        ${Tn?`
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
        `}).join(""),e.querySelectorAll(".btn-survey-respond").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id");Zn(s)})}),e.querySelectorAll(".btn-survey-share").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id");jd(s)})}),e.querySelectorAll(".btn-survey-results").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id");os(s)})}),Tn&&(e.querySelectorAll(".btn-survey-duplicate").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id");await Hd(s)})}),e.querySelectorAll(".btn-survey-edit").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id"),r=pe.find(o=>o.id===s);r&&ho(r)})}),e.querySelectorAll(".btn-survey-delete").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id"),r=pe.find(o=>o.id===s);r&&confirm(`アンケート「${r.title}」と、そのすべての回答データを削除しますか？`)&&(await Rd(s),Un())})}))}}async function Hd(e){const t=pe.find(s=>s.id===e);if(!t)return;const n=`survey_${Date.now()}`,a=JSON.parse(JSON.stringify(t));if(a.id=n,a.title=`(複製) ${t.title}`,a.created_at=new Date().toISOString(),a.status=t.status||"active",a.questions&&Array.isArray(a.questions)){const s={};a.questions.forEach((r,o)=>{const i=r.id,d=`q_${Date.now()}_${o+1}`;s[i]=d,r.id=d}),a.questions.forEach(r=>{r.options&&Array.isArray(r.options)&&r.options.forEach(o=>{o.skip_to&&s[o.skip_to]&&(o.skip_to=s[o.skip_to])})})}a.order_items&&Array.isArray(a.order_items)&&a.order_items.forEach((s,r)=>{s.id=`item_${Date.now()}_${r+1}`}),await yo(a,!0),Un(),alert(`アンケート「${a.title}」を作成（複製）しました！`)}function qd(e){try{const t={id:e.id,title:e.title,description:e.description,deadline:e.deadline,public_results:e.public_results,enable_schedule:e.enable_schedule,schedule_options:e.schedule_options,enable_family:e.enable_family,enable_orders:e.enable_orders,order_items:e.order_items,questions:e.questions},n=JSON.stringify(t);return btoa(encodeURIComponent(n).replace(/%([0-9A-F]{2})/g,(a,s)=>String.fromCharCode("0x"+s)))}catch(t){return console.warn("Survey encode error:",t),""}}function Ud(e){if(!e)return null;try{let t=decodeURIComponent(e).trim();t=t.replace(/ /g,"+"),t=t.replace(/-/g,"+").replace(/_/g,"/");const n=t.length%4;n===2?t+="==":n===3?t+="=":n===1&&(t+="===");const a=atob(t),s=decodeURIComponent(Array.prototype.map.call(a,r=>"%"+("00"+r.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(s)}catch(t){return console.warn("Survey decode error:",t),null}}function jd(e){const t=pe.find(a=>a.id===e);let n=`${window.location.origin}${window.location.pathname}#survey-${e}`;if(t){const a=qd(t);a&&(n+=`&d=${a}`)}navigator.clipboard.writeText(n).then(()=>{alert(`アンケート回答用URLをコピーしました！
どの端末・Safari・LINEでも確実に開くURLです。

${n}`)}).catch(()=>{prompt("アンケート回答用URL:",n)})}let Yn=null,ae=[],un=[],Yt=[];function ho(e=null){const t=document.getElementById("modal-survey-editor");if(!t)return;Yn=e?e.id:null,document.getElementById("survey-editor-modal-title").textContent=e?"アンケートの編集":"新規アンケート作成",document.getElementById("input-survey-title").value=e?e.title:"",document.getElementById("input-survey-desc").value=e&&e.description||"",document.getElementById("select-survey-status").value=e?e.status:"active",document.getElementById("input-survey-deadline").value=e&&e.deadline||"";const n=document.getElementById("chk-survey-enable-schedule"),a=document.getElementById("chk-survey-enable-family"),s=document.getElementById("chk-survey-enable-orders"),r=document.getElementById("chk-survey-public-results");n.checked=e?!!e.enable_schedule:!0,a.checked=e?!!e.enable_family:!0,s.checked=e?!!e.enable_orders:!1,r&&(r.checked=e?e.public_results!==!1:!0),un=e&&e.schedule_options?[...e.schedule_options]:["7/18(土) 午前","7/18(土) 午後","7/19(日) 終日"],Yt=e&&e.order_items?JSON.parse(JSON.stringify(e.order_items)):[{id:`item_${Date.now()}_1`,name:"選手用お弁当",price:600,max:10},{id:`item_${Date.now()}_2`,name:"保護者用お弁当",price:700,max:10}],ae=e&&e.questions?JSON.parse(JSON.stringify(e.questions)):[],rs(),ir(),Wt(),Rs(),t.classList.remove("hidden")}function Ps(){const e=document.getElementById("modal-survey-editor");e&&e.classList.add("hidden"),Yn=null}function Aa(e){const t=e.getFullYear(),n=e.getMonth()+1,a=e.getDate(),s=e.getDay();if(n===1&&a===1)return"元日";if(n===2&&a===11)return"建国記念の日";if(n===2&&a===23)return"天皇誕生日";if(n===4&&a===29)return"昭和の日";if(n===5&&a===3)return"憲法記念日";if(n===5&&a===4)return"みどりの日";if(n===5&&a===5)return"こどもの日";if(n===8&&a===11)return"山の日";if(n===11&&a===3)return"文化の日";if(n===11&&a===23)return"勤労感謝の日";if(s===1){const r=Math.floor((a-1)/7)+1;if(n===1&&r===2)return"成人の日";if(n===7&&r===3)return"海の日";if(n===9&&r===3)return"敬老の日";if(n===10&&r===2)return"スポーツの日"}if(n===3){const r=Math.floor(20.8431+.242194*(t-1980)-Math.floor((t-1980)/4));if(a===r)return"春分の日"}if(n===9){const r=Math.floor(23.2488+.242194*(t-1980)-Math.floor((t-1980)/4));if(a===r)return"秋分の日"}return null}function or(e){const t=Aa(e);if(t)return{isHoliday:!0,name:t};const n=e.getFullYear(),a=e.getMonth(),s=e.getDate(),r=e.getDay();let o=new Date(n,a,s-1);for(;Aa(o);){if(o.getDay()===0)return{isHoliday:!0,name:"振替休日"};o.setDate(o.getDate()-1)}if(r!==0){const i=new Date(n,a,s-1),d=new Date(n,a,s+1);if(Aa(i)&&Aa(d))return{isHoliday:!0,name:"国民の休日"}}return null}let Ie={targetType:null,targetQIdx:null,viewYear:new Date().getFullYear(),viewMonth:new Date().getMonth(),selectedDates:new Set};function xo(e,t=null){Ie.targetType=e,Ie.targetQIdx=t;const n=new Date;Ie.viewYear=n.getFullYear(),Ie.viewMonth=n.getMonth(),Ie.selectedDates.clear(),Sn();const a=document.getElementById("modal-survey-date-picker");a&&a.classList.remove("hidden")}function Ms(){const e=document.getElementById("modal-survey-date-picker");e&&e.classList.add("hidden")}function Sn(){const e=document.getElementById("dp-current-month-label"),t=document.getElementById("dp-calendar-grid"),n=document.getElementById("dp-selected-count-badge"),a=document.getElementById("btn-apply-date-picker");if(!t)return;const{viewYear:s,viewMonth:r,selectedDates:o}=Ie;e&&(e.textContent=`${s}年 ${r+1}月`),n&&(n.textContent=`${o.size} 日選択中`),a&&(a.disabled=o.size===0);const i=new Date(s,r,1).getDay(),d=new Date(s,r+1,0).getDate();let l="";for(let c=0;c<i;c++)l+='<div class="h-11 border border-transparent rounded-lg"></div>';for(let c=1;c<=d;c++){const u=new Date(s,r,c),f=u.getDay(),g=`${s}-${String(r+1).padStart(2,"0")}-${String(c).padStart(2,"0")}`,y=o.has(g),b=or(u);let p="",m="";y?(p="bg-teal-600 text-white font-bold shadow-xs",b&&(m=`<span class="text-[9px] block leading-tight truncate px-0.5 text-teal-100">${le(b.name)}</span>`)):b?(p="text-red-600 bg-red-50/70 hover:bg-red-100 font-bold border-red-100",m=`<span class="text-[9px] block leading-tight truncate px-0.5 text-red-600 font-bold">${le(b.name)}</span>`):f===0?p="text-red-500 hover:bg-red-50 font-bold":f===6?p="text-blue-600 hover:bg-blue-50 font-bold":p="text-gray-800 hover:bg-gray-100",l+=`
            <button type="button" class="dp-day-cell h-11 p-1 flex flex-col items-center justify-between rounded-lg border border-gray-100 transition cursor-pointer text-xs ${p}" data-date="${g}">
                <span class="text-xs font-bold leading-none">${c}</span>
                ${m}
            </button>
        `}t.innerHTML=l,t.querySelectorAll(".dp-day-cell").forEach(c=>{c.addEventListener("click",()=>{const u=c.getAttribute("data-date");o.has(u)?o.delete(u):o.add(u),Sn()})})}function Vd(){const e=new Date(Ie.viewYear,Ie.viewMonth+1,0).getDate();for(let t=1;t<=e;t++){const n=new Date(Ie.viewYear,Ie.viewMonth,t),a=n.getDay(),s=or(n);if(a===0||a===6||s){const r=`${Ie.viewYear}-${String(Ie.viewMonth+1).padStart(2,"0")}-${String(t).padStart(2,"0")}`;Ie.selectedDates.add(r)}}Sn()}function Gd(){var i;const{targetType:e,targetQIdx:t,selectedDates:n}=Ie;if(n.size===0)return;const a=((i=document.querySelector('input[name="dp-format"]:checked'))==null?void 0:i.value)||"simple",s=["日","月","火","水","木","金","土"],r=Array.from(n).sort(),o=[];if(r.forEach(d=>{const[l,c,u]=d.split("-").map(Number),f=new Date(l,c-1,u),g=s[f.getDay()],b=or(f)?`${g}・祝`:g;a==="time_slots"?(o.push(`${c}/${u}(${b}) 午前`),o.push(`${c}/${u}(${b}) 午後`),o.push(`${c}/${u}(${b}) 終日`)):a==="with_year"?o.push(`${l}/${String(c).padStart(2,"0")}/${String(u).padStart(2,"0")}(${b})`):a==="kanji"?o.push(`${c}月${u}日(${b})`):o.push(`${c}/${u}(${b})`)}),e==="schedule")un.push(...o),rs();else if(e==="question"&&t!==null){ae[t].options||(ae[t].options=[]);const d=ae[t].options;d.length===2&&d[0].label==="選択肢 1"&&d[1].label==="選択肢 2"?ae[t].options=o.map(c=>({label:c,skip_to:null})):o.forEach(c=>{ae[t].options.push({label:c,skip_to:null})}),Wt()}Ms()}function Rs(){var s,r;const e=(s=document.getElementById("chk-survey-enable-schedule"))==null?void 0:s.checked,t=(r=document.getElementById("chk-survey-enable-orders"))==null?void 0:r.checked,n=document.getElementById("editor-schedule-section"),a=document.getElementById("editor-orders-section");n&&(n.style.display=e?"block":"none"),a&&(a.style.display=t?"block":"none")}function rs(){const e=document.getElementById("editor-schedule-list");e&&(e.innerHTML=un.map((t,n)=>`
        <div class="flex items-center gap-2 mb-2">
            <span class="text-xs font-bold text-gray-400 w-5">#${n+1}</span>
            <input type="text" class="input-sched-opt flex-grow border border-gray-300 rounded-lg p-1.5 text-xs focus:ring-2 focus:ring-teal-500" value="${le(t)}" data-index="${n}" placeholder="例: 7/18(土) 午前 (9:00〜12:00)">
            <button class="btn-del-sched-opt text-xs text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded" data-index="${n}">🗑️</button>
        </div>
    `).join(""),e.querySelectorAll(".input-sched-opt").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-index"));un[a]=n.target.value})}),e.querySelectorAll(".btn-del-sched-opt").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-index"));un.splice(n,1),rs()})}))}function ir(){const e=document.getElementById("editor-orders-list");e&&(e.innerHTML=Yt.map((t,n)=>`
        <div class="grid grid-cols-12 gap-2 mb-2 items-center bg-gray-50/70 p-2 rounded-lg border border-gray-200">
            <div class="col-span-6">
                <input type="text" class="input-order-name w-full border border-gray-300 rounded p-1 text-xs" value="${le(t.name)}" data-index="${n}" placeholder="商品・品目名 (例: お弁当)">
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
    `).join(""),e.querySelectorAll(".input-order-name").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-index"));Yt[a].name=n.target.value})}),e.querySelectorAll(".input-order-price").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-index"));Yt[a].price=Number(n.target.value)||0})}),e.querySelectorAll(".input-order-max").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-index"));Yt[a].max=Number(n.target.value)||10})}),e.querySelectorAll(".btn-del-order-item").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-index"));Yt.splice(n,1),ir()})}))}function Wt(){const e=document.getElementById("editor-questions-list");if(e){if(ae.length===0){e.innerHTML='<p class="text-xs text-gray-400 py-3 text-center border border-dashed rounded-lg">設問がありません。「＋ 設問を追加」ボタンで追加してください。</p>';return}e.innerHTML=ae.map((t,n)=>{const a=ae.filter((s,r)=>r>n);return`
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
                        ${n<ae.length-1?`<button class="btn-move-q-down text-xs text-gray-500 hover:text-gray-800 p-1" data-q-index="${n}" title="下に移動">▼</button>`:""}
                        <button class="btn-del-q text-xs text-red-500 hover:text-red-700 p-1 font-bold ml-1" data-q-index="${n}">削除</button>
                    </div>
                </div>

                <div class="mb-3">
                    <input type="text" class="input-q-title w-full border border-gray-300 rounded-lg p-2 text-xs font-bold text-gray-800" value="${le(t.title)}" data-q-index="${n}" placeholder="設問のタイトルを入力してください">
                </div>

                <!-- 選択肢セクション (single または multiple の場合) -->
                ${t.type==="single"||t.type==="multiple"?`
                <div class="pl-3 border-l-2 border-teal-300 mb-2">
                    <label class="block text-[11px] font-bold text-gray-500 mb-1.5">選択肢一覧 &amp; 設問スキップ設定:</label>
                    <div class="space-y-2">
                        ${(t.options||[]).map((s,r)=>`
                            <div class="flex items-center gap-2">
                                <input type="text" class="input-opt-label flex-grow border border-gray-300 rounded p-1.5 text-xs" value="${le(s.label)}" data-q-index="${n}" data-opt-index="${r}" placeholder="選択肢 ${r+1}">
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
                    <input type="text" class="input-q-help w-full border border-gray-200 rounded p-1.5 text-[11px] text-gray-500 bg-white" value="${le(t.help||"")}" data-q-index="${n}" placeholder="補足説明・注釈 (任意)">
                </div>
            </div>
        `}).join(""),e.querySelectorAll(".input-q-title").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-q-index"));ae[a].title=n.target.value})}),e.querySelectorAll(".input-q-help").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-q-index"));ae[a].help=n.target.value})}),e.querySelectorAll(".select-q-type").forEach(t=>{t.addEventListener("change",n=>{const a=Number(n.target.getAttribute("data-q-index"));ae[a].type=n.target.value,(!ae[a].options||ae[a].options.length===0)&&(ae[a].options=[{label:"選択肢 1",skip_to:null},{label:"選択肢 2",skip_to:null}]),Wt()})}),e.querySelectorAll(".chk-q-req").forEach(t=>{t.addEventListener("change",n=>{const a=Number(n.target.getAttribute("data-q-index"));ae[a].required=n.target.checked})}),e.querySelectorAll(".btn-del-q").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index"));ae.splice(n,1),Wt()})}),e.querySelectorAll(".btn-move-q-up").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index"));if(n>0){const a=ae[n];ae[n]=ae[n-1],ae[n-1]=a,Wt()}})}),e.querySelectorAll(".btn-move-q-down").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index"));if(n<ae.length-1){const a=ae[n];ae[n]=ae[n+1],ae[n+1]=a,Wt()}})}),e.querySelectorAll(".btn-add-opt").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index"));ae[n].options||(ae[n].options=[]),ae[n].options.push({label:`選択肢 ${ae[n].options.length+1}`,skip_to:null}),Wt()})}),e.querySelectorAll(".btn-add-date-opt").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index"));xo("question",n)})}),e.querySelectorAll(".input-opt-label").forEach(t=>{t.addEventListener("input",n=>{const a=Number(n.target.getAttribute("data-q-index")),s=Number(n.target.getAttribute("data-opt-index"));ae[a].options[s].label=n.target.value})}),e.querySelectorAll(".select-opt-skip").forEach(t=>{t.addEventListener("change",n=>{const a=Number(n.target.getAttribute("data-q-index")),s=Number(n.target.getAttribute("data-opt-index"));ae[a].options[s].skip_to=n.target.value||null})}),e.querySelectorAll(".btn-del-opt").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-q-index")),a=Number(t.getAttribute("data-opt-index"));ae[n].options.splice(a,1),Wt()})})}}async function zd(){var u,f,g,y,b,p,m,h,_;const e=(u=document.getElementById("input-survey-title"))==null?void 0:u.value.trim();if(!e){alert("アンケートのタイトルを入力してください");return}const t=((f=document.getElementById("input-survey-desc"))==null?void 0:f.value.trim())||"",n=((g=document.getElementById("select-survey-status"))==null?void 0:g.value)||"active",a=((y=document.getElementById("input-survey-deadline"))==null?void 0:y.value.trim())||"",s=((b=document.getElementById("chk-survey-enable-schedule"))==null?void 0:b.checked)||!1,r=((p=document.getElementById("chk-survey-enable-family"))==null?void 0:p.checked)||!1,o=((m=document.getElementById("chk-survey-enable-orders"))==null?void 0:m.checked)||!1,i=((h=document.getElementById("chk-survey-public-results"))==null?void 0:h.checked)??!0,d=!Yn,l=new Date().toISOString().split("T")[0],c={id:Yn||`survey_${Date.now()}`,title:e,description:t,status:n,deadline:a,public_results:i,enable_schedule:s,schedule_options:s?un.filter(I=>I.trim()):[],enable_family:r,enable_orders:o,order_items:o?Yt.filter(I=>I.name.trim()):[],questions:ae,created_by:(cn==null?void 0:cn.name)||"管理者",created_at:Yn&&((_=pe.find(I=>I.id===Yn))==null?void 0:_.created_at)||l,updated_at:l};await yo(c,d),Ps(),Un()}let ta=null;function os(e,t=!1){const n=document.getElementById("modal-survey-results");if(!n)return;const a=pe.find(i=>i.id===e);if(!a)return;ta=a;const s=ke.filter(i=>i.survey_id===e),r=t||!Tn;document.getElementById("results-survey-title").textContent=a.title,document.getElementById("results-survey-subtitle").textContent=`回答数: ${s.length}件 | 締切: ${a.deadline||"なし"}${r?" (閲覧モード)":""}`;const o=document.getElementById("btn-export-survey-csv");o&&(r?o.classList.add("hidden"):o.classList.remove("hidden")),Jd(a,s),Yd(a,s),Kd(a,s),Qd(a,s),Zd(a,s,r),n.classList.remove("hidden")}function Wd(){const e=document.getElementById("modal-survey-results");e&&e.classList.add("hidden"),ta=null}function Jd(e,t){const n=t.length;let a=0;t.forEach(o=>{o.family_members&&o.family_members.length>0?a+=o.family_members.length:a+=1});const s=t.reduce((o,i)=>o+(Number(i.total_amount)||0),0),r=document.getElementById("results-summary-cards");r&&(r.innerHTML=`
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
    `)}function Yd(e,t){const n=document.getElementById("results-schedule-container");if(!n)return;if(!e.enable_schedule||!e.schedule_options||e.schedule_options.length===0){n.classList.add("hidden");return}n.classList.remove("hidden");const a={};e.schedule_options.forEach(r=>{a[r]={ok:[],maybe:[],ng:[]}}),t.forEach(r=>{const o=r.respondent_name||"無名";r.schedules&&Object.entries(r.schedules).forEach(([i,d])=>{a[i]&&(d==="○"||d==="ok"?a[i].ok.push(o):d==="△"||d==="maybe"?a[i].maybe.push(o):(d==="×"||d==="ng")&&a[i].ng.push(o))})});const s=document.getElementById("results-schedule-tbody");s&&(s.innerHTML=e.schedule_options.map(r=>{const o=a[r],i=o.ok.join("、 ");return`
            <tr class="border-b border-gray-100 hover:bg-gray-50/50">
                <td class="px-3 py-2.5 font-bold text-gray-800 whitespace-nowrap">${le(r)}</td>
                <td class="px-3 py-2.5 text-center font-extrabold text-emerald-600 bg-emerald-50/30">
                    ${o.ok.length}
                </td>
                <td class="px-3 py-2.5 text-center font-bold text-amber-600">
                    ${o.maybe.length}
                </td>
                <td class="px-3 py-2.5 text-center font-bold text-gray-400">
                    ${o.ng.length}
                </td>
                <td class="px-3 py-2.5 text-xs text-gray-600 max-w-xs truncate" title="${le(i)}">
                    ${le(i)||'<span class="text-gray-300">なし</span>'}
                </td>
            </tr>
        `}).join(""))}function Kd(e,t){const n=document.getElementById("results-orders-container");if(!n)return;if(!e.enable_orders||!e.order_items||e.order_items.length===0){n.classList.add("hidden");return}n.classList.remove("hidden");const a={};e.order_items.forEach(r=>{a[r.id]={name:r.name,price:r.price,count:0}}),t.forEach(r=>{r.orders&&Object.entries(r.orders).forEach(([o,i])=>{a[o]&&(a[o].count+=Number(i)||0)})});const s=document.getElementById("results-orders-tbody");s&&(s.innerHTML=e.order_items.map(r=>{const o=a[r.id]||{count:0},i=o.count*r.price;return`
            <tr class="border-b border-gray-100 hover:bg-gray-50/50">
                <td class="px-3 py-2.5 font-bold text-gray-800">${le(r.name)}</td>
                <td class="px-3 py-2.5 text-right font-mono text-gray-600">¥${r.price.toLocaleString()}</td>
                <td class="px-3 py-2.5 text-center font-extrabold text-purple-600">${o.count} <span class="text-xs font-normal">個</span></td>
                <td class="px-3 py-2.5 text-right font-extrabold text-purple-800 font-mono">¥${i.toLocaleString()}</td>
            </tr>
        `}).join(""))}function Qd(e,t){const n=document.getElementById("results-questions-list");if(n){if(!e.questions||e.questions.length===0){n.innerHTML='<p class="text-xs text-gray-400">設問はありません</p>';return}n.innerHTML=e.questions.map((a,s)=>{const r=t.map(o=>o.answers&&o.answers[a.id]).filter(o=>o!=null&&o!=="");if(a.type==="single"||a.type==="multiple"){const o={};(a.options||[]).forEach(d=>o[d.label]=0),o["(未回答)"]=0,r.forEach(d=>{Array.isArray(d)?d.forEach(l=>{o[l]=(o[l]||0)+1}):o[d]!==void 0?o[d]+=1:o[d]=(o[d]||0)+1});const i=t.length;return`
                <div class="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-3">
                    <h4 class="text-xs font-bold text-gray-800 mb-2">設問 ${s+1}: ${le(a.title)}</h4>
                    <div class="space-y-1.5">
                        ${Object.entries(o).filter(([d,l])=>d!=="(未回答)"||l>0).map(([d,l])=>{const c=i>0?Math.round(l/i*100):0;return`
                                <div>
                                    <div class="flex justify-between text-xs mb-0.5">
                                        <span class="text-gray-700">${le(d)}</span>
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
                    <h4 class="text-xs font-bold text-gray-800 mb-2">設問 ${s+1}: ${le(a.title)} (${r.length}件の回答)</h4>
                    <div class="max-h-36 overflow-y-auto space-y-1.5 pr-2 scrollbar-thin">
                        ${r.length>0?r.map(o=>`
                            <div class="bg-white p-2 rounded border border-gray-200 text-xs text-gray-700">
                                ${le(String(o))}
                            </div>
                        `).join(""):'<span class="text-xs text-gray-400">回答がありません</span>'}
                    </div>
                </div>
            `}).join("")}}function Zd(e,t,n=!1){const a=document.getElementById("th-results-actions");a&&(n?a.classList.add("hidden"):a.classList.remove("hidden"));const s=document.getElementById("results-responses-tbody");if(!s)return;const r=n?5:6;if(t.length===0){s.innerHTML=`<tr><td colspan="${r}" class="text-center py-6 text-xs text-gray-400">まだ回答がありません</td></tr>`;return}s.innerHTML=t.map(o=>{const i=(o.family_members||[]).map(l=>l.name).join("、 ")||"-",d=o.orders?Object.entries(o.orders).filter(([l,c])=>c>0).map(([l,c])=>{const u=(e.order_items||[]).find(f=>f.id===l);return`${u?u.name:l} ×${c}`}).join(", "):"-";return`
            <tr class="border-b border-gray-100 hover:bg-gray-50/50 text-xs">
                <td class="px-3 py-2 text-gray-400 whitespace-nowrap">${o.created_at||"-"}</td>
                <td class="px-3 py-2 font-bold text-gray-900 whitespace-nowrap">${le(o.respondent_name)}</td>
                <td class="px-3 py-2 text-gray-600 max-w-xs truncate" title="${le(i)}">${le(i)}</td>
                <td class="px-3 py-2 text-gray-600 max-w-xs truncate" title="${le(d)}">${le(d)}</td>
                <td class="px-3 py-2 text-right font-mono font-bold text-purple-700">¥${(Number(o.total_amount)||0).toLocaleString()}</td>
                ${n?"":`
                <td class="px-3 py-2 text-center whitespace-nowrap">
                    <div class="flex items-center justify-center gap-1.5">
                        <button class="btn-copy-response-edit-url px-2 py-1 text-[11px] font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded transition cursor-pointer" data-id="${o.id}" title="本人用の修正URLを発行してコピー">
                            🔗 修正URL
                        </button>
                        <button class="btn-delete-response px-2 py-1 text-[11px] font-bold text-red-600 hover:bg-red-50 rounded transition cursor-pointer" data-id="${o.id}" data-name="${le(o.respondent_name)}" title="この回答を削除">
                            🗑️
                        </button>
                    </div>
                </td>
                `}
            </tr>
        `}).join(""),n||(s.querySelectorAll(".btn-copy-response-edit-url").forEach(o=>{o.addEventListener("click",()=>{const i=o.getAttribute("data-id"),d=`${window.location.origin}${window.location.pathname}#survey-${e.id}&response=${i}`;navigator.clipboard.writeText(d).then(()=>{alert(`回答修正用URLをコピーしました！
ご本人に案内してください。

${d}`)}).catch(()=>{prompt("以下のURLをコピーしてください:",d)})})}),s.querySelectorAll(".btn-delete-response").forEach(o=>{o.addEventListener("click",async()=>{const i=o.getAttribute("data-id"),d=o.getAttribute("data-name")||"この回答者";confirm(`「${d}」さんの回答データを削除しますか？
（集計や出欠、注文数から除外されます）`)&&await Fd(i)})}))}function Xd(){if(!ta)return;const e=ta,t=ke.filter(d=>d.survey_id===e.id),n=["回答ID","回答日時","回答者(代表者名)"];e.enable_family&&n.push("家族メンバー一覧"),e.enable_schedule&&e.schedule_options&&e.schedule_options.forEach(d=>{n.push(`日程: ${d}`)}),e.questions&&e.questions.forEach((d,l)=>{n.push(`設問${l+1}: ${d.title}`)}),e.enable_orders&&e.order_items&&(e.order_items.forEach(d=>{n.push(`注文: ${d.name} (${d.price}円)`)}),n.push("注文合計金額(円)"));const a=[n];t.forEach(d=>{const l=[d.id,d.created_at||"",d.respondent_name||""];if(e.enable_family){const c=(d.family_members||[]).map(u=>`${u.name}${u.role?`(${u.role})`:""}`).join(", ");l.push(c)}e.enable_schedule&&e.schedule_options&&e.schedule_options.forEach(c=>{l.push(d.schedules&&d.schedules[c]||"")}),e.questions&&e.questions.forEach(c=>{const u=d.answers?d.answers[c.id]:"";Array.isArray(u)?l.push(u.join("; ")):l.push(u||"")}),e.enable_orders&&e.order_items&&(e.order_items.forEach(c=>{const u=d.orders&&d.orders[c.id]||0;l.push(u)}),l.push(d.total_amount||0)),a.push(l)});const s=a.map(d=>d.map(l=>`"${String(l||"").replace(/"/g,'""')}"`).join(",")).join(`
`),r=new Blob([new Uint8Array([239,187,191]),s],{type:"text/csv;charset=utf-8;"}),o=document.createElement("a");o.href=URL.createObjectURL(r);const i=new Date().toISOString().split("T")[0];o.download=`survey_${e.id}_${i}.csv`,o.click()}let ba=null,Qt=[],Va=null;async function Zn(e,t=null,n=null){var d;(d=document.getElementById("loading-overlay"))==null||d.classList.add("hidden");const a=document.getElementById("loading-detail-text");a&&(a.style.opacity="0"),["auth-view","signup-view","password-reset-view","password-update-view","app-menu-view","app-view","attendance-view","view-users","dashboard-view","dashboard-settings","position-simulator-view","info-view"].forEach(l=>{const c=document.getElementById(l);c&&c.classList.add("hidden")});const s=document.getElementById("survey-respond-view");s&&s.classList.remove("hidden");const r=document.getElementById("survey-respond-form-container"),o=document.getElementById("survey-respond-error-container"),i=document.getElementById("survey-respond-success-container");i&&i.classList.add("hidden");try{if(vo(),(!pe||pe.length===0)&&await Ns(),!n){const b=window.location.hash||"",p=window.location.search||"",m=(b+"&"+p).match(/[?&#]d=([^&]+)/);m&&m[1]&&(n=m[1])}let l=pe.find(b=>b.id===e);if(!l&&n)try{const b=Ud(n);if(b&&(b.id===e||!e)){l=b,pe.unshift(l);try{localStorage.setItem(Dn,JSON.stringify(pe))}catch{}}}catch(b){console.warn("Embedded survey restore failed:",b)}if(l||(await Ns(),l=pe.find(b=>b.id===e)),!l&&e)try{const b=decodeURIComponent(e).trim();l=pe.find(p=>p.id===b)}catch{}if(!l){if(r&&r.classList.add("hidden"),o){o.classList.remove("hidden");const b=document.getElementById("survey-respond-error-title"),p=document.getElementById("survey-respond-error-desc");b&&(b.textContent="アンケートが見つかりませんでした"),p&&(p.innerHTML=`指定されたアンケート（ID: <span class="font-mono font-bold">${e||"未指定"}</span>）が存在しないか、URLが正しくない可能性があります。<br>最新のアンケートURLをご確認ください。`)}return}o&&o.classList.add("hidden"),r&&r.classList.remove("hidden"),ba=l,Qt=[];let c=null;t&&(c=ke.find(b=>b.id===t));const u=document.getElementById("respond-edit-mode-banner"),f=document.getElementById("btn-submit-survey-response");c?(Va=c.id,u&&u.classList.remove("hidden"),f&&(f.textContent="回答を更新する")):(Va=null,u&&u.classList.add("hidden"),f&&(f.textContent="回答を送信する")),document.getElementById("respond-survey-title").textContent=l.title,document.getElementById("respond-survey-desc").innerHTML=l.description?l.description.replace(/\n/g,"<br>"):"",document.getElementById("respond-survey-deadline").textContent=l.deadline?`回答期限: ${l.deadline}`:"";const g=document.getElementById("btn-view-public-results");g&&(l.public_results!==!1?(g.classList.remove("hidden"),g.onclick=()=>os(l.id,!0)):g.classList.add("hidden"));const y=document.getElementById("input-respondent-name");y&&(c?y.value=c.respondent_name||"":y.value=cn&&cn.name?cn.name:""),c&&c.family_members?Qt=JSON.parse(JSON.stringify(c.family_members)):Qt=[],dr(l),el(l,c?c.schedules:null),tl(l,c?c.answers:null),al(l,c?c.orders:null),window.scrollTo({top:0,behavior:"smooth"})}catch(l){if(console.error("Error in openSurveyResponsePage:",l),r&&r.classList.add("hidden"),o){o.classList.remove("hidden");const c=document.getElementById("survey-respond-error-title"),u=document.getElementById("survey-respond-error-desc");c&&(c.textContent="エラーが発生しました"),u&&(u.innerHTML=`アンケートの読み込み中にエラーが発生しました。<br><span class="text-xs text-red-500 font-mono">${l.message||l}</span>`)}}}function dr(e){const t=document.getElementById("respond-family-section");if(!t)return;if(!e.enable_family){t.classList.add("hidden");return}t.classList.remove("hidden");const n=document.getElementById("respond-family-list");n&&(n.innerHTML=Qt.map((a,s)=>`
        <div class="flex items-center gap-2 mb-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
            <input type="text" class="input-fam-name flex-grow border border-gray-300 rounded-lg p-2 text-xs" value="${le(a.name)}" data-index="${s}" placeholder="ご家族・選手のお名前 (例: 翔太)">
            <select class="select-fam-role border border-gray-300 rounded-lg p-2 text-xs bg-white font-bold" data-index="${s}">
                <option value="選手" ${a.role==="選手"?"selected":""}>選手</option>
                <option value="保護者" ${a.role==="保護者"?"selected":""}>保護者</option>
                <option value="兄弟・姉妹" ${a.role==="兄弟・姉妹"?"selected":""}>兄弟・姉妹</option>
                <option value="その他" ${a.role==="その他"?"selected":""}>その他</option>
            </select>
            <button class="btn-del-fam text-xs text-red-500 hover:text-red-700 p-2" data-index="${s}">🗑️</button>
        </div>
    `).join(""),n.querySelectorAll(".input-fam-name").forEach(a=>{a.addEventListener("input",s=>{const r=Number(s.target.getAttribute("data-index"));Qt[r].name=s.target.value})}),n.querySelectorAll(".select-fam-role").forEach(a=>{a.addEventListener("change",s=>{const r=Number(s.target.getAttribute("data-index"));Qt[r].role=s.target.value})}),n.querySelectorAll(".btn-del-fam").forEach(a=>{a.addEventListener("click",()=>{const s=Number(a.getAttribute("data-index"));Qt.splice(s,1),dr(e)})}))}function el(e,t=null){const n=document.getElementById("respond-schedule-section");if(!n)return;if(!e.enable_schedule||!e.schedule_options||e.schedule_options.length===0){n.classList.add("hidden");return}n.classList.remove("hidden");const a=document.getElementById("respond-schedule-list");a&&(a.innerHTML=e.schedule_options.map((s,r)=>{const o=t&&t[s]?t[s]:"○";return`
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl border border-gray-200 bg-white mb-2.5">
            <span class="text-xs font-bold text-gray-800">${le(s)}</span>
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
        `}).join(""))}function tl(e,t=null){const n=document.getElementById("respond-questions-section");if(!n)return;if(!e.questions||e.questions.length===0){n.classList.add("hidden");return}n.classList.remove("hidden");const a=document.getElementById("respond-questions-list");a&&(a.innerHTML=e.questions.map((s,r)=>{const o=t?t[s.id]:void 0;return`
        <div id="respond-q-block-${s.id}" class="respond-q-block p-4 rounded-xl border border-gray-200 bg-white mb-4 transition-all" data-q-id="${s.id}">
            <div class="flex items-start gap-2 mb-2">
                <span class="px-2 py-0.5 rounded bg-teal-100 text-teal-800 text-xs font-bold shrink-0">Q${r+1}</span>
                <div>
                    <h4 class="text-xs font-bold text-gray-900 leading-snug">
                        ${le(s.title)}
                        ${s.required?'<span class="text-red-500 ml-1">*必須</span>':""}
                    </h4>
                    ${s.help?`<p class="text-[11px] text-gray-500 mt-0.5">${le(s.help)}</p>`:""}
                </div>
            </div>

            <div class="mt-3 pl-2">
                ${nl(s,o)}
            </div>
        </div>
        `}).join(""),a.querySelectorAll('input[type="radio"].q-opt-radio').forEach(s=>{s.addEventListener("change",()=>{Pr(e)})}),Pr(e))}function nl(e,t=void 0){if(e.type==="single")return(e.options||[]).map((n,a)=>{const s=t!==void 0?t===n.label:a===0;return`
            <label class="flex items-center gap-2 cursor-pointer text-xs text-gray-700 mb-2 hover:text-teal-700">
                <input type="radio" name="respond_ans_${e.id}" value="${le(n.label)}" class="q-opt-radio text-teal-600 focus:ring-teal-500" data-q-id="${e.id}" data-skip-to="${n.skip_to||""}" ${s?"checked":""}>
                <span>${le(n.label)}</span>
            </label>
            `}).join("");if(e.type==="multiple")return(e.options||[]).map(n=>{const a=Array.isArray(t)?t.includes(n.label):!1;return`
            <label class="flex items-center gap-2 cursor-pointer text-xs text-gray-700 mb-2 hover:text-teal-700">
                <input type="checkbox" name="respond_ans_${e.id}" value="${le(n.label)}" ${a?"checked":""} class="rounded text-teal-600 focus:ring-teal-500">
                <span>${le(n.label)}</span>
            </label>
            `}).join("");{const n=t!==void 0?String(t):"";return`
            <textarea name="respond_ans_${e.id}" rows="3" class="w-full border border-gray-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-teal-500 outline-none" placeholder="回答を入力してください...">${le(n)}</textarea>
        `}}function Pr(e){if(!e.questions)return;let t=new Set;e.questions.forEach((n,a)=>{if(n.type==="single"){const s=document.querySelector(`input[name="respond_ans_${n.id}"]:checked`);if(s){const r=s.getAttribute("data-skip-to");if(r==="__END__")for(let o=a+1;o<e.questions.length;o++)t.add(e.questions[o].id);else if(r){const o=e.questions.findIndex(i=>i.id===r);if(o>a)for(let i=a+1;i<o;i++)t.add(e.questions[i].id)}}}}),e.questions.forEach(n=>{var s,r;const a=document.getElementById(`respond-q-block-${n.id}`);if(a)if(t.has(n.id)){if(a.classList.add("opacity-40","bg-gray-100","pointer-events-none"),!a.querySelector(".skip-badge")){const i=document.createElement("span");i.className="skip-badge text-[10px] bg-gray-300 text-gray-700 font-bold px-1.5 py-0.5 rounded ml-2",i.textContent="スキップされました",(s=a.querySelector("h4"))==null||s.appendChild(i)}}else a.classList.remove("opacity-40","bg-gray-100","pointer-events-none"),(r=a.querySelector(".skip-badge"))==null||r.remove()})}function al(e,t=null){const n=document.getElementById("respond-orders-section");if(!n)return;if(!e.enable_orders||!e.order_items||e.order_items.length===0){n.classList.add("hidden");return}n.classList.remove("hidden");const a=document.getElementById("respond-orders-list");a&&(a.innerHTML=e.order_items.map(s=>{const r=t&&t[s.id]!==void 0?Number(t[s.id]):0;return`
        <div class="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-white mb-2.5">
            <div>
                <span class="block text-xs font-bold text-gray-900">${le(s.name)}</span>
                <span class="text-xs text-teal-700 font-mono font-bold">¥${s.price.toLocaleString()}</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-xs text-gray-500">数量:</span>
                <select class="select-order-qty border border-gray-300 rounded-lg p-1.5 text-xs bg-white font-bold" data-item-id="${s.id}" data-price="${s.price}">
                    ${Array.from({length:(s.max||10)+1},(o,i)=>`<option value="${i}" ${i===r?"selected":""}>${i}</option>`).join("")}
                </select>
            </div>
        </div>
        `}).join(""),a.querySelectorAll(".select-order-qty").forEach(s=>{s.addEventListener("change",Mr)}),Mr())}function Mr(){let e=0;document.querySelectorAll(".select-order-qty").forEach(n=>{const a=Number(n.value)||0,s=Number(n.getAttribute("data-price"))||0;e+=a*s});const t=document.getElementById("respond-orders-total-amount");t&&(t.textContent=`¥${e.toLocaleString()}`)}async function sl(){var _,I,k,S;if(!ba)return;const e=ba,t=(_=document.getElementById("input-respondent-name"))==null?void 0:_.value.trim();if(!t){alert("保護者氏名（選手氏名）を入力してください"),(I=document.getElementById("input-respondent-name"))==null||I.focus();return}const n={};e.enable_schedule&&e.schedule_options&&e.schedule_options.forEach(($,E)=>{const w=document.querySelector(`input[name="respond_sched_${E}"]:checked`);w&&(n[$]=w.value)});const a={};let s=!1;if(e.questions&&e.questions.forEach($=>{var x;const E=document.getElementById(`respond-q-block-${$.id}`);if(!(E&&E.classList.contains("opacity-40")))if($.type==="single"){const v=document.querySelector(`input[name="respond_ans_${$.id}"]:checked`);v?a[$.id]=v.value:$.required&&(s=!0)}else if($.type==="multiple"){const v=Array.from(document.querySelectorAll(`input[name="respond_ans_${$.id}"]:checked`)).map(A=>A.value);a[$.id]=v,$.required&&v.length===0&&(s=!0)}else{const v=(x=document.querySelector(`textarea[name="respond_ans_${$.id}"]`))==null?void 0:x.value.trim();a[$.id]=v||"",$.required&&!v&&(s=!0)}}),s){alert("必須の設問に回答してください。");return}const r={};let o=0;e.enable_orders&&e.order_items&&document.querySelectorAll(".select-order-qty").forEach($=>{const E=$.getAttribute("data-item-id"),w=Number($.value)||0,x=Number($.getAttribute("data-price"))||0;r[E]=w,o+=w*x});const i=!!Va,d=Va||`resp_${Date.now()}`,l=new Date,c=`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}-${String(l.getDate()).padStart(2,"0")} ${String(l.getHours()).padStart(2,"0")}:${String(l.getMinutes()).padStart(2,"0")}`,u={id:d,survey_id:e.id,respondent_name:t,family_members:Qt.filter($=>$.name.trim()),schedules:n,answers:a,orders:r,total_amount:o,created_at:c};await Od(u);const f=`${window.location.origin}${window.location.pathname}#survey-${e.id}&response=${u.id}`,g=document.getElementById("input-edit-response-url");g&&(g.value=f);const y=document.getElementById("btn-copy-edit-url");y&&(y.onclick=()=>{navigator.clipboard.writeText(f).then(()=>{alert(`回答修正用URLをコピーしました！
後から回答を変更する場合は、このURLから修正できます。`)}).catch(()=>{prompt("以下のURLをコピーしてください:",f)})});const b=document.getElementById("btn-re-edit-response");b&&(b.onclick=()=>{Zn(e.id,u.id)});const p=document.getElementById("btn-view-results-from-success");p&&(e.public_results!==!1?(p.classList.remove("hidden"),p.onclick=()=>os(e.id,!0)):p.classList.add("hidden"));const m=document.getElementById("survey-respond-success-title"),h=document.getElementById("survey-respond-success-desc");m&&(m.textContent=i?"回答を更新しました！":"回答を受け付けました！"),h&&(h.innerHTML=i?"回答内容の変更が正常に保存されました。<br>内容は役員・担当者へ最新状態で共有されます。":"ご回答いただきありがとうございました。<br>内容は役員・担当者へ共有されます。"),(k=document.getElementById("survey-respond-form-container"))==null||k.classList.add("hidden"),(S=document.getElementById("survey-respond-success-container"))==null||S.classList.remove("hidden"),window.scrollTo({top:0,behavior:"smooth"})}function le(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}let Rr=!1;function vo(){var e,t,n,a,s,r,o,i,d,l,c,u,f,g,y,b,p,m,h,_,I,k,S,$,E;Rr||(Rr=!0,(e=document.getElementById("btn-survey-new"))==null||e.addEventListener("click",()=>ho()),(t=document.getElementById("chk-survey-enable-schedule"))==null||t.addEventListener("change",Rs),(n=document.getElementById("chk-survey-enable-orders"))==null||n.addEventListener("change",Rs),(a=document.getElementById("btn-add-sched-opt"))==null||a.addEventListener("click",()=>{un.push(`候補日 ${un.length+1}`),rs()}),(s=document.getElementById("btn-open-date-picker-sched"))==null||s.addEventListener("click",()=>{xo("schedule")}),(r=document.getElementById("btn-close-date-picker"))==null||r.addEventListener("click",Ms),(o=document.getElementById("btn-cancel-date-picker"))==null||o.addEventListener("click",Ms),(i=document.getElementById("btn-dp-prev-month"))==null||i.addEventListener("click",()=>{Ie.viewMonth--,Ie.viewMonth<0&&(Ie.viewMonth=11,Ie.viewYear--),Sn()}),(d=document.getElementById("btn-dp-next-month"))==null||d.addEventListener("click",()=>{Ie.viewMonth++,Ie.viewMonth>11&&(Ie.viewMonth=0,Ie.viewYear++),Sn()}),(l=document.getElementById("btn-dp-today"))==null||l.addEventListener("click",()=>{const w=new Date;Ie.viewYear=w.getFullYear(),Ie.viewMonth=w.getMonth(),Sn()}),(c=document.getElementById("btn-dp-select-weekends"))==null||c.addEventListener("click",Vd),(u=document.getElementById("btn-dp-clear-all"))==null||u.addEventListener("click",()=>{Ie.selectedDates.clear(),Sn()}),(f=document.getElementById("btn-apply-date-picker"))==null||f.addEventListener("click",Gd),(g=document.getElementById("btn-add-order-item"))==null||g.addEventListener("click",()=>{Yt.push({id:`item_${Date.now()}`,name:`注文品目 ${Yt.length+1}`,price:500,max:10}),ir()}),(y=document.getElementById("btn-add-question"))==null||y.addEventListener("click",()=>{ae.push({id:`q_${Date.now()}`,type:"single",title:`設問 ${ae.length+1}`,required:!1,options:[{label:"選択肢 1",skip_to:null},{label:"選択肢 2",skip_to:null}],help:""}),Wt()}),(b=document.getElementById("btn-save-survey"))==null||b.addEventListener("click",zd),(p=document.getElementById("btn-close-survey-editor"))==null||p.addEventListener("click",Ps),(m=document.getElementById("btn-cancel-survey-editor"))==null||m.addEventListener("click",Ps),(h=document.getElementById("btn-close-survey-results"))==null||h.addEventListener("click",Wd),(_=document.getElementById("btn-export-survey-csv"))==null||_.addEventListener("click",Xd),(I=document.getElementById("btn-respond-add-family"))==null||I.addEventListener("click",()=>{Qt.push({name:"",role:"選手"}),ba&&dr(ba)}),(k=document.getElementById("btn-submit-survey-response"))==null||k.addEventListener("click",sl),(S=document.getElementById("btn-back-from-survey-respond"))==null||S.addEventListener("click",()=>{if(cn){const w=document.getElementById("survey-respond-view");w&&w.classList.add("hidden");const x=document.getElementById("info-view");x&&x.classList.remove("hidden"),Un()}else{const w=document.getElementById("survey-respond-view");w&&w.classList.add("hidden");const x=document.getElementById("auth-view");x&&x.classList.remove("hidden")}}),($=document.getElementById("btn-survey-error-reload"))==null||$.addEventListener("click",()=>{window.location.reload()}),(E=document.getElementById("btn-survey-error-home"))==null||E.addEventListener("click",()=>{window.location.href=window.location.pathname}))}let et=null,wt=null,Os="user",an=!1,Ft="docs",nt=[],Xe=[],Ga="すべて",za="すべて",ya="",Cn="";const Wa="ants_info_documents_v1",Ja="ants_info_links_v1",wo="ants_info_top_md_v1",rl=`## 🐜 Arinko Ants チーム情報 &amp; ドキュメントポータル
本ポータルでは、チーム運営に関する**各種マニュアル（配車・当番・緊急対応）**の閲覧、**合宿・イベント出欠アンケート（日程調整・お弁当注文）**の実施、および**グラウンド地図や公式連盟などの便利リンク集**を一元管理しています。

> [!NOTE]
> - **配車調整マニュアル**や**当番業務の手引き**は「ドキュメント」タブよりいつでも閲覧・ダウンロード可能です。
> - 夏季合宿やイベントの日程調整・注文アンケートは「アンケート」タブから回答できます（ゲスト回答も可能）。
`,Or=[{id:"doc-manual-dispatch",title:"配車調整機能 利用者マニュアル",category:"配車マニュアル",summary:"少年野球チーム「Arinko Ants」の活動におけるイベント配車の自動作成・手動微調整・LINE案内出力までの全体操作マニュアルです。",content:`# 配車調整機能 利用者マニュアル

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
  - [ ] 倉庫施錠および学校鍵の返却`,files:[],created_by:"父母会",updated_at:"2026-04-01"}],Fr=[{id:"link-official-site",title:"Arinko Ants 公式ホームページ",url:"https://arinkoants.sakura.ne.jp/",category:"公式・連盟",description:"チームの公式Webサイト。チーム紹介、選手募集案内、活動予定などが掲載されています。",icon:"🐜",display_order:1},{id:"link-google-calendar",title:"チーム活動予定 Googleカレンダー",url:"https://calendar.google.com/",category:"スケジュール・連絡",description:"練習日、遠征試合、大会スケジュールが登録されているGoogleカレンダーです。",icon:"📅",display_order:2},{id:"link-nagareyama-league",title:"流山市少年野球連盟 公式サイト",url:"http://nagareyama-baseball.jp/",category:"公式・連盟",description:"市内大会の組み合わせトーナメント表、試合日程、グラウンド規程などが確認できます。",icon:"⚾",display_order:3},{id:"link-chiba-league",title:"千葉県少年野球連盟",url:"http://chiba-baseball.jp/",category:"公式・連盟",description:"千葉県大会の要項、大会結果、競技規則の最新情報が掲載されています。",icon:"🏆",display_order:4},{id:"link-ground-map",title:"主な活動グラウンド案内 (Google Maps)",url:"https://maps.google.com/",category:"グラウンド・施設",description:"ホームグラウンド（東小学校）および近隣の流山市内グラウンドへのアクセス地図一覧です。",icon:"📍",display_order:5},{id:"link-weather-forecast",title:"流山市のピンポイント天気予報 (tenki.jp)",url:"https://tenki.jp/forecast/3/15/4510/12220/",category:"便利ツール",description:"当日の雨雲レーダー、1時間ごとの降水確率、風速、WBGT（熱中症指数）を確認できます。",icon:"☀️",display_order:6},{id:"link-baseball-rules",title:"公認野球規則 & 少年野球特別規則",url:"https://japan-baseball.jp/",category:"便利ツール",description:"全日本軟式野球連盟（JSBB）による少年野球特別規程および公認野球規則の解説です。",icon:"📖",display_order:7}],Eo=["すべて","配車マニュアル","チーム運営・規約","野球ルール・スコア","その他"],_o=["すべて","公式・連盟","グラウンド・施設","スケジュール・連絡","便利ツール","その他"];async function Ma({supabaseClient:e,currentUser:t,currentUserRole:n}){et=e,wt=t,Os=n,an=n==="admin"||(t==null?void 0:t.can_edit_info)===!0||n==="leader"&&(t==null?void 0:t.can_edit_info)!==!1,ol(),await il(),await Pd({supabaseClient:et,currentUser:wt,currentUserRole:Os,canManageInfo:an}),$l(),So(),ko()}function ol(){document.querySelectorAll(".info-admin-only").forEach(n=>{an?n.classList.remove("hidden"):n.classList.add("hidden")});const t=document.getElementById("info-user-role-badge");t&&(Os==="admin"?(t.className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-purple-100 text-purple-700 border border-purple-200",t.textContent="管理者 (編集可)"):an?(t.className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-teal-100 text-teal-700 border border-teal-200",t.textContent="編集可"):(t.className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-gray-100 text-gray-700 border border-gray-200",t.textContent="閲覧専用"))}async function il(){let e=!1,t=!1,n=!1;if(et){try{const{data:a,error:s}=await et.from("info_documents").select("*").order("updated_at",{ascending:!1});!s&&a&&a.length>0&&(nt=a,e=!0)}catch(a){console.warn("Supabase info_documents select failed:",a)}try{const{data:a,error:s}=await et.from("info_links").select("*").order("display_order",{ascending:!0});!s&&a&&a.length>0&&(Xe=a,t=!0)}catch(a){console.warn("Supabase info_links select failed:",a)}try{const{data:a,error:s}=await et.from("info_pages").select("*").eq("id","top_announcement").single();!s&&a&&a.content&&(Cn=a.content,n=!0)}catch(a){console.warn("Supabase info_pages select failed:",a)}}if(!e)try{const a=localStorage.getItem(Wa);a?nt=JSON.parse(a):(nt=[...Or],localStorage.setItem(Wa,JSON.stringify(nt)))}catch{nt=[...Or]}if(!t)try{const a=localStorage.getItem(Ja);a?Xe=JSON.parse(a):(Xe=[...Fr],localStorage.setItem(Ja,JSON.stringify(Xe)))}catch{Xe=[...Fr]}if(!n){const a=localStorage.getItem(wo);Cn=a!==null?a:rl}}async function Io(e,t=!1){const n=nt.findIndex(a=>a.id===e.id);n>=0?nt[n]=e:nt.unshift(e);try{localStorage.setItem(Wa,JSON.stringify(nt))}catch(a){console.error(a)}if(et)try{t?await et.from("info_documents").insert([e]):await et.from("info_documents").update(e).eq("id",e.id)}catch(a){console.warn("Supabase document save failed:",a)}}async function dl(e){nt=nt.filter(t=>t.id!==e);try{localStorage.setItem(Wa,JSON.stringify(nt))}catch(t){console.error(t)}if(et)try{await et.from("info_documents").delete().eq("id",e)}catch(t){console.warn("Supabase document delete failed:",t)}}async function $o(e,t=!1){const n=Xe.findIndex(a=>a.id===e.id);n>=0?Xe[n]=e:Xe.push(e);try{localStorage.setItem(Ja,JSON.stringify(Xe))}catch(a){console.error(a)}if(et)try{t?await et.from("info_links").insert([e]):await et.from("info_links").update(e).eq("id",e.id)}catch(a){console.warn("Supabase link save failed:",a)}}async function ll(e){Xe=Xe.filter(t=>t.id!==e);try{localStorage.setItem(Ja,JSON.stringify(Xe))}catch(t){console.error(t)}if(et)try{await et.from("info_links").delete().eq("id",e)}catch(t){console.warn("Supabase link delete failed:",t)}}async function cl(e){Cn=e;try{localStorage.setItem(wo,e)}catch(t){console.error(t)}if(et)try{await et.from("info_pages").upsert([{id:"top_announcement",content:e,updated_at:new Date().toISOString(),updated_by:(wt==null?void 0:wt.name)||"管理者"}])}catch(t){console.warn("Supabase top_announcement save failed:",t)}So()}function So(){const e=document.getElementById("info-top-announcement-rendered"),t=document.getElementById("info-top-announcement-wrap");!e||!t||(Cn&&Cn.trim()?(t.classList.remove("hidden"),e.innerHTML=is(Cn)):t.classList.add("hidden"))}function ko(){Lo(),Ft==="docs"?da():Ft==="surveys"?Un():la()}function Lo(){const e=document.getElementById("info-category-filters");if(!e)return;if(Ft==="surveys"){e.classList.add("hidden");return}e.classList.remove("hidden");const t=Ft==="docs"?Eo:_o,n=Ft==="docs"?Ga:za;e.innerHTML=t.map(a=>`<button class="info-cat-btn px-3.5 py-1.5 text-xs rounded-full transition-all cursor-pointer ${n===a?"bg-teal-600 text-white shadow-sm font-bold":"bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}" data-category="${a}">${a}</button>`).join(""),e.querySelectorAll(".info-cat-btn").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-category");Ft==="docs"?(Ga=s,da()):(za=s,la()),Lo()})})}function da(){const e=document.getElementById("info-docs-container"),t=document.getElementById("info-docs-empty");if(!e)return;let n=nt;if(Ga!=="すべて"&&(n=n.filter(a=>a.category===Ga)),ya.trim()){const a=ya.toLowerCase().trim();n=n.filter(s=>s.title&&s.title.toLowerCase().includes(a)||s.summary&&s.summary.toLowerCase().includes(a)||s.content&&s.content.toLowerCase().includes(a)||s.category&&s.category.toLowerCase().includes(a))}if(n.length===0){e.innerHTML="",t&&t.classList.remove("hidden");return}t&&t.classList.add("hidden"),e.innerHTML=n.map(a=>{const s=lr(a.category),r=a.files?a.files.length:0;return`
            <div class="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between group">
                <div>
                    <div class="flex items-center justify-between gap-2 mb-2.5">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${s}">
                            ${a.category||"その他"}
                        </span>
                        <span class="text-[11px] text-gray-400 font-mono">更新: ${a.updated_at||"-"}</span>
                    </div>
                    <h3 class="text-base font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                        ${St(a.title)}
                    </h3>
                    <p class="text-xs text-gray-600 line-clamp-3 mb-3 leading-relaxed">
                        ${St(a.summary||a.content.slice(0,100))}
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
                    ${an?`
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
        `}).join(""),e.querySelectorAll(".btn-view-doc").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id"),r=nt.find(o=>o.id===s);r&&pl(r)})}),an&&(e.querySelectorAll(".btn-duplicate-doc").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id");await ul(s)})}),e.querySelectorAll(".btn-edit-doc").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id"),r=nt.find(o=>o.id===s);r&&Bo(r)})}),e.querySelectorAll(".btn-delete-doc").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id"),r=nt.find(o=>o.id===s);r&&confirm(`ドキュメント「${r.title}」を削除しますか？`)&&(await dl(s),da())})}))}async function ul(e){const t=nt.find(a=>a.id===e);if(!t)return;const n=JSON.parse(JSON.stringify(t));n.id=`doc_${Date.now()}`,n.title=`(複製) ${t.title}`,n.created_at=new Date().toISOString(),n.updated_at=new Date().toISOString(),n.author_name=(wt==null?void 0:wt.name)||"管理者",await Io(n,!0),da(),alert(`ドキュメント「${n.title}」を作成（複製）しました！`)}function la(){const e=document.getElementById("info-links-container"),t=document.getElementById("info-links-empty");if(!e)return;let n=Xe;if(za!=="すべて"&&(n=n.filter(a=>a.category===za)),ya.trim()){const a=ya.toLowerCase().trim();n=n.filter(s=>s.title&&s.title.toLowerCase().includes(a)||s.description&&s.description.toLowerCase().includes(a)||s.url&&s.url.toLowerCase().includes(a)||s.category&&s.category.toLowerCase().includes(a))}if(n.length===0){e.innerHTML="",t&&t.classList.remove("hidden");return}t&&t.classList.add("hidden"),e.innerHTML=n.map(a=>{const s=lr(a.category),r=a.icon||"🔗",o=a.url?a.url.replace(/^https?:\/\//,"").replace(/\/$/,""):"";return`
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
                        ${St(a.title)}
                    </h3>
                    <p class="text-xs text-gray-400 font-mono mb-2 truncate" title="${St(a.url)}">
                        ${St(o)}
                    </p>
                    <p class="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3">
                        ${St(a.description||"説明はありません")}
                    </p>
                </div>
                <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <a href="${St(a.url)}" target="_blank" rel="noopener noreferrer" 
                       class="inline-flex items-center text-xs font-bold bg-teal-50 hover:bg-teal-600 text-teal-700 hover:text-white px-3 py-1.5 rounded-lg transition duration-150 cursor-pointer">
                        <span>サイトを開く</span>
                        <svg class="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                    ${an?`
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
        `}).join(""),an&&(e.querySelectorAll(".btn-duplicate-link").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id");await ml(s)})}),e.querySelectorAll(".btn-edit-link").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id"),r=Xe.find(o=>o.id===s);r&&Ao(r)})}),e.querySelectorAll(".btn-delete-link").forEach(a=>{a.addEventListener("click",async()=>{const s=a.getAttribute("data-id"),r=Xe.find(o=>o.id===s);r&&confirm(`リンク「${r.title}」を削除しますか？`)&&(await ll(s),la())})}))}async function ml(e){const t=Xe.find(a=>a.id===e);if(!t)return;const n=JSON.parse(JSON.stringify(t));n.id=`link_${Date.now()}`,n.title=`(複製) ${t.title}`,n.created_at=new Date().toISOString(),n.display_order=(t.display_order||0)+1,await $o(n,!0),la(),alert(`リンク「${n.title}」を作成（複製）しました！`)}function lr(e){switch(e){case"配車マニュアル":return"bg-blue-100 text-blue-800 border border-blue-200";case"チーム運営・規約":return"bg-amber-100 text-amber-800 border border-amber-200";case"野球ルール・スコア":return"bg-green-100 text-green-800 border border-green-200";case"公式・連盟":return"bg-purple-100 text-purple-800 border border-purple-200";case"グラウンド・施設":return"bg-emerald-100 text-emerald-800 border border-emerald-200";case"スケジュール・連絡":return"bg-sky-100 text-sky-800 border border-sky-200";case"便利ツール":return"bg-indigo-100 text-indigo-800 border border-indigo-200";default:return"bg-gray-100 text-gray-700 border border-gray-200"}}let Ya=null;function pl(e){const t=document.getElementById("modal-info-doc-reader");if(!t)return;Ya=e,document.getElementById("reader-doc-title").textContent=e.title,document.getElementById("reader-doc-category").textContent=e.category||"その他",document.getElementById("reader-doc-category").className=`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${lr(e.category)}`,document.getElementById("reader-doc-updated").textContent=`最終更新: ${e.updated_at||"-"} (作成: ${e.created_by||"チーム"})`;const n=document.getElementById("reader-doc-files-container"),a=document.getElementById("reader-doc-files-list");n&&a&&(e.files&&e.files.length>0?(n.classList.remove("hidden"),a.innerHTML=e.files.map(r=>`
                <a href="${r.dataUrl||"#"}" download="${St(r.name)}" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-teal-50 text-gray-700 hover:text-teal-700 border border-gray-200 text-xs font-bold transition">
                    <span>📎</span>
                    <span>${St(r.name)}</span>
                    <span class="text-[10px] text-gray-400 font-normal">(${Math.round((r.size||0)/1024)}KB)</span>
                </a>
            `).join("")):(n.classList.add("hidden"),a.innerHTML=""));const s=document.getElementById("reader-doc-content");s&&(s.innerHTML=is(e.content||"",!0),ur(s)),t.classList.remove("hidden")}function fl(){const e=document.getElementById("modal-info-doc-reader");e&&e.classList.add("hidden"),Ya=null}function gl(){if(!Ya)return;const e=Ya,t=new Blob([e.content||""],{type:"text/markdown;charset=utf-8;"}),n=document.createElement("a");n.href=URL.createObjectURL(t),n.download=`${e.title||"document"}.md`,n.click()}let Ka=null,Nn=[];function Bo(e=null){const t=document.getElementById("modal-info-doc-editor");if(!t)return;Ka=e?e.id:null,Nn=e&&e.files?JSON.parse(JSON.stringify(e.files)):[],document.getElementById("doc-editor-modal-title").textContent=e?"ドキュメントの編集":"新規ドキュメント作成",document.getElementById("input-doc-title").value=e?e.title:"",document.getElementById("input-doc-summary").value=e&&e.summary||"",document.getElementById("input-doc-content").value=e?e.content:"";const n=document.getElementById("select-doc-category");n.innerHTML=Eo.filter(a=>a!=="すべて").map(a=>`<option value="${a}" ${e&&e.category===a?"selected":""}>${a}</option>`).join(""),cr(),Hs("write"),t.classList.remove("hidden")}function Fs(){const e=document.getElementById("modal-info-doc-editor");e&&e.classList.add("hidden"),Ka=null,Nn=[]}function cr(){const e=document.getElementById("doc-editor-files-list");if(e){if(Nn.length===0){e.innerHTML='<span class="text-xs text-gray-400">添付ファイルはありません</span>';return}e.innerHTML=Nn.map((t,n)=>`
        <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 border border-gray-200 text-xs text-gray-700">
            <span>📎 ${St(t.name)} (${Math.round((t.size||0)/1024)}KB)</span>
            <button class="btn-del-file text-red-500 hover:text-red-700 font-bold ml-1" data-index="${n}">✕</button>
        </div>
    `).join(""),e.querySelectorAll(".btn-del-file").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-index"));Nn.splice(n,1),cr()})})}}function bl(e){Array.from(e).forEach(t=>{if(t.size>5*1024*1024){alert(`ファイル「${t.name}」が5MBを超えているため添付できません。`);return}const n=new FileReader;n.onload=a=>{Nn.push({name:t.name,size:t.size,type:t.type,dataUrl:a.target.result}),cr()},n.readAsDataURL(t)})}function yl(e){if(!e)return;const t=new FileReader;t.onload=n=>{const a=n.target.result,s=document.getElementById("input-doc-title"),r=document.getElementById("input-doc-content");s&&(!s.value||s.value.trim()==="")&&(s.value=e.name.replace(/\.md$/i,"")),r&&(r.value=a)},t.readAsText(e)}function Hs(e){const t=document.getElementById("btn-doc-tab-write"),n=document.getElementById("btn-doc-tab-preview"),a=document.getElementById("input-doc-content"),s=document.getElementById("doc-preview-content");e==="write"?(t==null||t.classList.add("bg-white","text-teal-700","shadow-xs"),t==null||t.classList.remove("text-gray-500"),n==null||n.classList.remove("bg-white","text-teal-700","shadow-xs"),n==null||n.classList.add("text-gray-500"),a==null||a.classList.remove("hidden"),s==null||s.classList.add("hidden")):(n==null||n.classList.add("bg-white","text-teal-700","shadow-xs"),n==null||n.classList.remove("text-gray-500"),t==null||t.classList.remove("bg-white","text-teal-700","shadow-xs"),t==null||t.classList.add("text-gray-500"),a==null||a.classList.add("hidden"),s==null||s.classList.remove("hidden"),s&&a&&(s.innerHTML=is(a.value||"*本文が入力されていません*"),ur(s)))}async function hl(){var i,d,l,c;const e=(i=document.getElementById("input-doc-title"))==null?void 0:i.value.trim(),t=(d=document.getElementById("select-doc-category"))==null?void 0:d.value,n=(l=document.getElementById("input-doc-summary"))==null?void 0:l.value.trim(),a=(c=document.getElementById("input-doc-content"))==null?void 0:c.value.trim();if(!e){alert("タイトルを入力してください");return}if(!a){alert("本文を入力してください");return}const s=new Date().toISOString().split("T")[0],r=!Ka,o={id:Ka||`doc_${Date.now()}`,title:e,category:t,summary:n||a.slice(0,100),content:a,files:Nn,created_by:(wt==null?void 0:wt.name)||"管理者",updated_at:s};await Io(o,r),Fs(),da()}function xl(){const e=document.getElementById("modal-info-top-editor");if(!e)return;const t=document.getElementById("input-info-top-content");t&&(t.value=Cn),Us("write"),e.classList.remove("hidden")}function qs(){const e=document.getElementById("modal-info-top-editor");e&&e.classList.add("hidden")}function Us(e){const t=document.getElementById("btn-top-tab-write"),n=document.getElementById("btn-top-tab-preview"),a=document.getElementById("input-info-top-content"),s=document.getElementById("top-preview-content");e==="write"?(t==null||t.classList.add("bg-white","text-teal-700","shadow-xs"),t==null||t.classList.remove("text-gray-500"),n==null||n.classList.remove("bg-white","text-teal-700","shadow-xs"),n==null||n.classList.add("text-gray-500"),a==null||a.classList.remove("hidden"),s==null||s.classList.add("hidden")):(n==null||n.classList.add("bg-white","text-teal-700","shadow-xs"),n==null||n.classList.remove("text-gray-500"),t==null||t.classList.remove("bg-white","text-teal-700","shadow-xs"),t==null||t.classList.add("text-gray-500"),a==null||a.classList.add("hidden"),s==null||s.classList.remove("hidden"),s&&a&&(s.innerHTML=is(a.value||"*内容が入力されていません*"),ur(s)))}async function vl(){var t;const e=(t=document.getElementById("input-info-top-content"))==null?void 0:t.value;await cl(e),qs()}let pa=null;function Ao(e=null){const t=document.getElementById("modal-info-link-editor");if(!t)return;pa=e?e.id:null,document.getElementById("link-editor-modal-title").textContent=e?"リンクの編集":"新規リンク追加",document.getElementById("input-link-title").value=e?e.title:"",document.getElementById("input-link-url").value=e?e.url:"",document.getElementById("input-link-desc").value=e&&e.description||"",document.getElementById("input-link-icon").value=e&&e.icon||"🔗";const n=document.getElementById("select-link-category");n.innerHTML=_o.filter(a=>a!=="すべて").map(a=>`<option value="${a}" ${e&&e.category===a?"selected":""}>${a}</option>`).join(""),t.classList.remove("hidden")}function js(){const e=document.getElementById("modal-info-link-editor");e&&e.classList.add("hidden"),pa=null}async function wl(){var i,d,l,c,u,f;const e=(i=document.getElementById("input-link-title"))==null?void 0:i.value.trim(),t=(d=document.getElementById("input-link-url"))==null?void 0:d.value.trim(),n=(l=document.getElementById("select-link-category"))==null?void 0:l.value,a=(c=document.getElementById("input-link-desc"))==null?void 0:c.value.trim(),s=((u=document.getElementById("input-link-icon"))==null?void 0:u.value.trim())||"🔗";if(!e){alert("タイトルを入力してください");return}if(!t){alert("URLを入力してください");return}if(!t.startsWith("http://")&&!t.startsWith("https://")){alert("URLは http:// または https:// から入力してください");return}const r=!pa,o={id:pa||`link_${Date.now()}`,title:e,url:t,category:n,description:a,icon:s,display_order:r?Xe.length+1:((f=Xe.find(g=>g.id===pa))==null?void 0:f.display_order)||1,created_by:(wt==null?void 0:wt.name)||"管理者",updated_at:new Date().toISOString().split("T")[0]};await $o(o,r),js(),la()}const To=`-- ==========================================
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
`;function El(){const e=document.getElementById("modal-info-sql");if(!e)return;const t=document.getElementById("info-sql-code");t&&(t.textContent=To),e.classList.remove("hidden")}function _l(){const e=document.getElementById("modal-info-sql");e&&e.classList.add("hidden")}function Il(){navigator.clipboard.writeText(To).then(()=>{alert(`SQL文をクリップボードにコピーしました！
Supabase Dashboardの「SQL Editor」で実行してください。`)}).catch(e=>{console.error("Copy failed:",e)})}let Hr=!1;function $l(){var f,g,y,b,p,m,h,_,I,k,S,$,E,w,x,v,A,P,N;if(Hr)return;Hr=!0;const e=document.getElementById("tab-info-docs"),t=document.getElementById("tab-info-surveys"),n=document.getElementById("tab-info-links"),a=document.getElementById("view-info-docs"),s=document.getElementById("view-info-surveys"),r=document.getElementById("view-info-links"),o=document.getElementById("btn-info-new"),i=document.getElementById("btn-survey-new");function d(D){Ft=D,[e,t,n].forEach(F=>{F&&(F.className="px-4 py-2 font-bold text-gray-500 hover:text-gray-700 border-b-2 border-transparent transition-colors flex items-center space-x-2 cursor-pointer")}),[a,s,r].forEach(F=>F==null?void 0:F.classList.add("hidden")),D==="docs"?(e.className="px-4 py-2 font-bold text-teal-600 border-b-2 border-teal-600 transition-colors flex items-center space-x-2 cursor-pointer",a==null||a.classList.remove("hidden"),o&&(o.classList.remove("hidden"),o.textContent="＋ 新規ドキュメント"),i&&i.classList.add("hidden")):D==="surveys"?(t.className="px-4 py-2 font-bold text-teal-600 border-b-2 border-teal-600 transition-colors flex items-center space-x-2 cursor-pointer",s==null||s.classList.remove("hidden"),o&&o.classList.add("hidden"),i&&an&&i.classList.remove("hidden")):(n.className="px-4 py-2 font-bold text-teal-600 border-b-2 border-teal-600 transition-colors flex items-center space-x-2 cursor-pointer",r==null||r.classList.remove("hidden"),o&&(o.classList.remove("hidden"),o.textContent="＋ 新規リンク"),i&&i.classList.add("hidden")),ko()}e==null||e.addEventListener("click",()=>d("docs")),t==null||t.addEventListener("click",()=>d("surveys")),n==null||n.addEventListener("click",()=>d("links"));const l=document.getElementById("input-info-search");l==null||l.addEventListener("input",D=>{ya=D.target.value,Ft==="docs"?da():Ft==="links"&&la()}),o==null||o.addEventListener("click",()=>{Ft==="docs"?Bo():Ft==="links"&&Ao()}),(f=document.getElementById("btn-edit-top-announcement"))==null||f.addEventListener("click",xl),(g=document.getElementById("btn-close-top-editor"))==null||g.addEventListener("click",qs),(y=document.getElementById("btn-cancel-top-editor"))==null||y.addEventListener("click",qs),(b=document.getElementById("btn-top-tab-write"))==null||b.addEventListener("click",()=>Us("write")),(p=document.getElementById("btn-top-tab-preview"))==null||p.addEventListener("click",()=>Us("preview")),(m=document.getElementById("btn-save-top-announcement"))==null||m.addEventListener("click",vl),(h=document.getElementById("btn-close-doc-reader"))==null||h.addEventListener("click",fl),(_=document.getElementById("btn-export-doc-md"))==null||_.addEventListener("click",gl),(I=document.getElementById("btn-close-doc-editor"))==null||I.addEventListener("click",Fs),(k=document.getElementById("btn-cancel-doc-editor"))==null||k.addEventListener("click",Fs),(S=document.getElementById("btn-doc-tab-write"))==null||S.addEventListener("click",()=>Hs("write")),($=document.getElementById("btn-doc-tab-preview"))==null||$.addEventListener("click",()=>Hs("preview")),(E=document.getElementById("btn-save-doc"))==null||E.addEventListener("click",hl);const c=document.getElementById("input-doc-attach-files");c==null||c.addEventListener("change",D=>{D.target.files&&bl(D.target.files)});const u=document.getElementById("input-doc-import-md");u==null||u.addEventListener("change",D=>{D.target.files&&D.target.files[0]&&yl(D.target.files[0])}),(w=document.getElementById("btn-close-link-editor"))==null||w.addEventListener("click",js),(x=document.getElementById("btn-cancel-link-editor"))==null||x.addEventListener("click",js),(v=document.getElementById("btn-save-link"))==null||v.addEventListener("click",wl),(A=document.getElementById("btn-info-sql-modal"))==null||A.addEventListener("click",El),(P=document.getElementById("btn-close-info-sql"))==null||P.addEventListener("click",_l),(N=document.getElementById("btn-copy-info-sql"))==null||N.addEventListener("click",Il)}function is(e,t=!1){if(!e)return"";const n=e.split(`
`);let a="",s=!1,r=!1,o=!1,i="",d=!1,l=[],c=!1,u="",f="";const g=[];function y(){s&&(a+=`</ul>
`,s=!1),r&&(a+=`</ol>
`,r=!1),d&&(a+=qr(l),l=[],d=!1),c&&(a+=Sl(u,f),f="",c=!1)}for(let b=0;b<n.length;b++){let p=n[b];if(p.trim().startsWith("```")){o?(a+=`
                    <div class="relative my-3 group">
                        <pre class="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-xs font-mono border border-gray-800 leading-relaxed"><code>${St(i.trim())}</code></pre>
                        <button class="btn-copy-code absolute top-2 right-2 px-2 py-1 text-[10px] font-bold rounded bg-gray-800 text-gray-300 hover:text-white border border-gray-700 opacity-0 group-hover:opacity-100 transition">コピー</button>
                    </div>
`,i="",o=!1):(y(),o=!0,p.trim().slice(3).trim());continue}if(o){i+=p+`
`;continue}const m=p.trim().match(/^>\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]/i);if(m){y(),c=!0,u=m[1].toUpperCase(),f="";continue}if(c)if(p.startsWith(">")){f+=p.replace(/^>\s?/,"")+`
`;continue}else y();if(p.trim().startsWith("|")&&p.trim().endsWith("|")){d||(y(),d=!0,l=[]),l.push(p.trim());continue}else d&&(a+=qr(l),l=[],d=!1);if(p.trim()===""){y();continue}if(/^(\*{3,}|-{3,}|_{3,})$/.test(p.trim())){y(),a+=`<hr class="my-6 border-t border-gray-200">
`;continue}if(p.startsWith("# ")){y();const I=p.slice(2).trim(),k=`heading-${g.length}`;g.push({level:1,text:I,id:k}),a+=`<h1 id="${k}" class="text-2xl font-bold text-gray-900 mt-6 mb-3 pb-2 border-b border-gray-200">${Bt(I)}</h1>
`;continue}if(p.startsWith("## ")){y();const I=p.slice(3).trim(),k=`heading-${g.length}`;g.push({level:2,text:I,id:k}),a+=`<h2 id="${k}" class="text-xl font-bold text-gray-800 mt-5 mb-2.5">${Bt(I)}</h2>
`;continue}if(p.startsWith("### ")){y();const I=p.slice(4).trim(),k=`heading-${g.length}`;g.push({level:3,text:I,id:k}),a+=`<h3 id="${k}" class="text-lg font-bold text-gray-800 mt-4 mb-2">${Bt(I)}</h3>
`;continue}if(p.startsWith("#### ")){y();const I=p.slice(5).trim();a+=`<h4 class="text-base font-semibold text-gray-700 mt-3 mb-1.5">${Bt(I)}</h4>
`;continue}if(p.startsWith("> ")){y(),a+=`<blockquote class="border-l-4 border-teal-500 pl-4 py-1.5 my-3 bg-teal-50/50 text-xs text-gray-700 rounded-r">${Bt(p.slice(2))}</blockquote>
`;continue}const h=p.trim().match(/^[-*]\s*\[([ xX])\]\s*(.*)/);if(h){y();const I=h[1].toLowerCase()==="x";a+=`
                <div class="flex items-center gap-2 my-1 text-xs text-gray-700">
                    <input type="checkbox" ${I?"checked":""} disabled class="rounded text-teal-600">
                    <span class="${I?"line-through text-gray-400":""}">${Bt(h[2])}</span>
                </div>
`;continue}if(p.trim().startsWith("- ")||p.trim().startsWith("* ")){r&&(a+=`</ol>
`,r=!1),s||(a+=`<ul class="list-disc list-inside my-2 space-y-1 text-xs text-gray-700 leading-relaxed">
`,s=!0);const I=p.trim().slice(2);a+=`  <li>${Bt(I)}</li>
`;continue}const _=p.trim().match(/^(\d+)\.\s+(.*)/);if(_){s&&(a+=`</ul>
`,s=!1),r||(a+=`<ol class="list-decimal list-inside my-2 space-y-1 text-xs text-gray-700 leading-relaxed">
`,r=!0),a+=`  <li>${Bt(_[2])}</li>
`;continue}y(),a+=`<p class="my-2 text-xs text-gray-700 leading-relaxed">${Bt(p)}</p>
`}return y(),t&&g.length>=2&&(a=`
            <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                <span class="text-xs font-bold text-gray-700 block mb-2">📑 目次</span>
                <ul class="space-y-1 text-xs">
                    ${g.map(p=>`
                        <li class="${p.level===2?"pl-3":p.level===3?"pl-6":""}">
                            <a href="#${p.id}" class="text-teal-600 hover:text-teal-800 hover:underline">
                                ${St(p.text)}
                            </a>
                        </li>
                    `).join("")}
                </ul>
            </div>
        `+a),a}function Sl(e,t){let n="border-teal-500",a="bg-teal-50/70",s="text-teal-800",r="ℹ️",o="NOTE";e==="TIP"?(n="border-emerald-500",a="bg-emerald-50/70",s="text-emerald-800",r="💡",o="TIP"):e==="WARNING"||e==="CAUTION"?(n="border-amber-500",a="bg-amber-50/70",s="text-amber-800",r="⚠️",o="WARNING"):e==="IMPORTANT"&&(n="border-blue-500",a="bg-blue-50/70",s="text-blue-800",r="📌",o="IMPORTANT");const i=t.split(`
`).filter(d=>d.trim()).map(d=>`<p class="my-1 text-xs text-gray-700 leading-relaxed">${Bt(d)}</p>`).join("");return`
        <div class="border-l-4 ${n} ${a} p-3.5 my-3 rounded-r-xl border border-gray-200/50">
            <div class="flex items-center gap-1.5 font-bold text-xs ${s} mb-1">
                <span>${r}</span>
                <span>${o}</span>
            </div>
            ${i}
        </div>
    `}function qr(e){if(e.length<2)return"";let t='<div class="overflow-x-auto my-4 scrollbar-thin"><table class="min-w-full text-xs border border-gray-200 rounded-xl overflow-hidden">';const n=e[0].split("|").slice(1,-1).map(a=>a.trim());t+='<thead class="bg-gray-50 border-b border-gray-200"><tr>',n.forEach(a=>{t+=`<th class="px-3.5 py-2.5 text-left font-bold text-gray-700 border-r border-gray-200 last:border-r-0">${Bt(a)}</th>`}),t+="</tr></thead><tbody>";for(let a=2;a<e.length;a++){const s=e[a].split("|").slice(1,-1).map(r=>r.trim());t+=`<tr class="${a%2===0?"bg-white":"bg-gray-50/40"} border-b border-gray-100 last:border-b-0 hover:bg-teal-50/30">`,s.forEach(r=>{t+=`<td class="px-3.5 py-2.5 text-gray-600 border-r border-gray-100 last:border-r-0">${Bt(r)}</td>`}),t+="</tr>"}return t+="</tbody></table></div>",t}function Bt(e){if(!e)return"";let t=St(e);return t=t.replace(/\*\*(.*?)\*\*/g,'<strong class="font-bold text-gray-900">$1</strong>'),t=t.replace(/\*(.*?)\*/g,'<em class="italic">$1</em>'),t=t.replace(/`([^`]+)`/g,'<code class="px-1.5 py-0.5 bg-gray-100 text-teal-700 rounded text-[11px] font-mono border border-gray-200">$1</code>'),t=t.replace(/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer" class="text-teal-600 hover:text-teal-800 underline font-semibold">$1 ↗</a>'),t}function ur(e){e.querySelectorAll(".btn-copy-code").forEach(t=>{t.addEventListener("click",()=>{var a;const n=((a=t.parentElement.querySelector("code"))==null?void 0:a.textContent)||"";navigator.clipboard.writeText(n).then(()=>{const s=t.textContent;t.textContent="コピー完了！",setTimeout(()=>{t.textContent=s},2e3)})})})}function St(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}const Do={},kl="https://arcdgbzqfengqyvfbodt.supabase.co",Ll="sb_publishable_Ei6ti5lKjAECmi36haftpw_DQsKMp4p",na=Do?"https://arcdgbzqfengqyvfbodt.supabase.co":kl,Qa=Do?"sb_publishable_Ei6ti5lKjAECmi36haftpw_DQsKMp4p":Ll;na.startsWith("https://")||console.warn("設定警告: VITE_SUPABASE_URL に https:// が含まれていません。値: "+na);console.log("Checking Supabase URL:","Exists");if(!window.supabaseClient&&window.supabase&&window.supabase.createClient&&na&&Qa)try{window.supabaseClient=window.supabase.createClient(na,Qa)}catch(e){console.error("Supabase初期化エラー:",e)}const B=window.supabaseClient||null;let J=null,aa=!1,Ge="user";function ds(e){return e=e.trim(),e?e.includes("@")?e:`${e}@ants.local`:""}function On(e){return e?e.endsWith("@ants.local")?e.split("@")[0]:e:""}let Xn=0,Rt=null;function Bl(e){const t=document.getElementById("loading-overlay");if(t){const n=t.querySelector("span");n&&(n.textContent=e)}Rt||(Rt=document.createElement("div"),Rt.id="loading-detail-text",Rt.className="fixed bottom-2 right-2 text-xs md:text-sm font-bold text-gray-600 bg-white/90 border border-gray-300 px-3 py-1.5 rounded shadow-lg pointer-events-none z-[9999] transition-opacity duration-300",document.body.appendChild(Rt)),Rt.textContent=e,Rt.style.opacity="1"}function W(e="通信中..."){Xn++;const t=document.getElementById("loading-overlay");t&&Xn===1&&t.classList.remove("hidden"),Bl(e)}function G(){var e;Xn--,Xn<=0&&(Xn=0,(e=document.getElementById("loading-overlay"))==null||e.classList.add("hidden"),Rt&&(Rt.style.opacity="0"))}function it(){var e;Xn=0,(e=document.getElementById("loading-overlay"))==null||e.classList.add("hidden"),Rt&&(Rt.style.opacity="0")}async function Me(e,t="通信中..."){W(t);try{return await e()}catch(n){throw console.error("Supabase DB Error:",n),it(),n.message==="Load failed"||n.message==="Failed to fetch"?alert(`サーバー通信エラー: 通信に失敗しました。
ネットワーク接続、または環境変数(Supabase URL)の設定が正しいか確認してください。`):alert(`サーバー通信エラー:
`+n.message),n}finally{G()}}async function fe(e,t){if(J&&e!=="NAVIGATE")try{await B.from("action_logs").insert({user_email:J.email,action_type:e,details:t})}catch(n){console.error("Log error:",n)}}function Ur(){var e,t,n,a,s,r,o,i,d,l,c,u,f,g,y,b,p,m,h,_,I,k,S,$,E,w,x,v,A,P,N,D,F,R,L,T,C,U,ee,z,K,H,Z,q,re,oe;if(!window.isDomInitialized)try{if(window.isDomInitialized=!0,document.title="bb-sys for arinko ants.",document.body){const Y=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,!1);let me;for(;me=Y.nextNode();)me.nodeValue.includes("配車調整アプリ")&&(me.nodeValue=me.nodeValue.replace(/配車調整アプリ/g,"bb-sys for arinko ants.")),me.nodeValue.includes("少年野球に役立つツール for arinko ants.")&&(me.nodeValue=me.nodeValue.replace(/少年野球に役立つツール for arinko ants./g,"bb-sys for arinko ants."))}document.documentElement.style.setProperty("--layout-columns",zs),window.addEventListener("resize",Vr),Vr(),(e=document.getElementById("btn-login"))==null||e.addEventListener("click",jr),(t=document.getElementById("auth-form"))==null||t.addEventListener("submit",jr),(n=document.getElementById("btn-logout"))==null||n.addEventListener("click",Ta),(a=document.getElementById("btn-logout-menu"))==null||a.addEventListener("click",Ta),(s=document.getElementById("btn-clear-cache"))==null||s.addEventListener("click",Al),(r=document.getElementById("link-to-signup"))==null||r.addEventListener("click",Y=>{Y.preventDefault(),se("signup-view")}),(o=document.getElementById("link-to-reset"))==null||o.addEventListener("click",Y=>{Y.preventDefault(),se("password-reset-view")}),document.querySelectorAll(".link-back-to-login").forEach(Y=>Y.addEventListener("click",me=>{me.preventDefault(),se("auth-view")})),(i=document.getElementById("btn-submit-signup"))==null||i.addEventListener("click",Tl),(d=document.getElementById("btn-send-reset"))==null||d.addEventListener("click",Dl),(l=document.getElementById("btn-update-password"))==null||l.addEventListener("click",Cl),(c=document.getElementById("btn-change-password"))==null||c.addEventListener("click",()=>{var Y;(Y=document.getElementById("change-password-modal"))==null||Y.classList.remove("hidden")}),(u=document.getElementById("btn-close-change-password"))==null||u.addEventListener("click",()=>{var Y;(Y=document.getElementById("change-password-modal"))==null||Y.classList.add("hidden")}),(f=document.getElementById("btn-submit-change-password"))==null||f.addEventListener("click",Nl);const ge=document.getElementById("btn-change-password");ge&&(ge.textContent="パスワード変更"),(g=document.getElementById("nav-users"))==null||g.addEventListener("click",ha),(y=document.getElementById("btn-admin-add-user"))==null||y.addEventListener("click",adminAddUser),(b=document.getElementById("btn-reload-users"))==null||b.addEventListener("click",be),(p=document.getElementById("btn-save-all-users"))==null||p.addEventListener("click",Pl),(m=document.getElementById("admin-users-sort"))==null||m.addEventListener("change",Y=>{localStorage.setItem("admin_users_sort",Y.target.value),be()}),(h=document.getElementById("btn-export-users"))==null||h.addEventListener("click",_c),(_=document.getElementById("btn-import-users"))==null||_.addEventListener("click",()=>document.getElementById("input-import-users-csv").click()),(I=document.getElementById("btn-download-users-sample"))==null||I.addEventListener("click",kc),(k=document.getElementById("input-import-users-csv"))==null||k.addEventListener("change",Ic),(S=document.getElementById("btn-close-csv-modal"))==null||S.addEventListener("click",es),($=document.getElementById("btn-close-csv-modal-x"))==null||$.addEventListener("click",es),(E=document.getElementById("btn-execute-csv-import"))==null||E.addEventListener("click",$c);const Te=document.getElementById("btn-admin-add-user");if(Te&&!document.getElementById("btn-admin-add-dummy-user")){const Y=document.createElement("button");Y.id="btn-admin-add-dummy-user",Y.className="ml-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow font-bold text-sm",Y.textContent="代行専用メンバー追加",Y.onclick=adminAddDummyUser,(w=Te.parentNode)==null||w.appendChild(Y)}const st=document.querySelector("#view-master #btn-load-logs");st&&st.remove();const ue=document.querySelector("#view-master #log-list");if(ue){const Y=ue.closest(".bg-white");Y?Y.remove():ue.remove()}document.querySelectorAll("#view-master h2").forEach(Y=>{Y.textContent.includes("操作ログ")&&Y.remove()});const ct=document.getElementById("tab-master-admin");if(ct&&!document.getElementById("tab-logs-admin")){const Y=ct.parentElement,me=document.createElement("button");me.id="tab-logs-admin",me.className="px-4 py-2 font-bold text-gray-500 hover:text-gray-700 border-b-2 border-transparent transition-colors",me.textContent="操作ログ",Y==null||Y.appendChild(me);const Ne=document.createElement("div");Ne.id="tab-content-logs-admin",Ne.className="hidden",Ne.innerHTML=`
                <div class="mb-4 flex space-x-2 mt-4">
                    <button id="btn-load-logs" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow font-bold">最新を読み込み</button>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
                    <div id="log-list" class="min-w-[600px] text-sm flex flex-col">
                        <p class="text-gray-500 py-4 text-center">「最新を読み込み」ボタンを押してください</p>
                    </div>
                </div>
            `;const je=document.getElementById("tab-content-master-admin");je&&je.parentElement&&je.parentElement.appendChild(Ne)}const Ue=Y=>{[{btnId:"tab-users-admin",contentId:"tab-content-users-admin"},{btnId:"tab-master-admin",contentId:"tab-content-master-admin"},{btnId:"tab-logs-admin",contentId:"tab-content-logs-admin"}].forEach(Ne=>{const je=document.getElementById(Ne.btnId),It=document.getElementById(Ne.contentId);!je||!It||(Ne.btnId===Y?(je.className="px-4 py-2 font-bold text-blue-600 border-b-2 border-blue-600 transition-colors",It.classList.remove("hidden"),Y==="tab-logs-admin"&&xa()):(je.className="px-4 py-2 font-bold text-gray-500 hover:text-gray-700 border-b-2 border-transparent transition-colors",It.classList.add("hidden")))})};(x=document.getElementById("tab-users-admin"))==null||x.addEventListener("click",()=>Ue("tab-users-admin")),(v=document.getElementById("tab-master-admin"))==null||v.addEventListener("click",()=>Ue("tab-master-admin")),(A=document.getElementById("tab-logs-admin"))==null||A.addEventListener("click",()=>Ue("tab-logs-admin")),(P=document.getElementById("btn-load-logs"))==null||P.addEventListener("click",xa),(N=document.getElementById("btn-app-dispatch"))==null||N.addEventListener("click",()=>{var Y;se("app-view","dispatch"),aa?(Y=document.getElementById("nav-dispatch"))==null||Y.click():Gs()}),(D=document.getElementById("btn-app-attendance"))==null||D.addEventListener("click",async()=>{se("attendance-view"),await Me(Ss,"出欠管理画面を準備中...")}),(F=document.getElementById("btn-app-dashboard"))==null||F.addEventListener("click",async()=>{await Me(Bs,"ダッシュボードを準備中..."),se("dashboard-view")}),(R=document.getElementById("btn-app-info"))==null||R.addEventListener("click",async()=>{await Me(async()=>{await Ma({supabaseClient:B,currentUser:J,currentUserRole:Ge})},"Info画面を準備中..."),se("info-view")}),(L=document.getElementById("btn-back-to-menu-info"))==null||L.addEventListener("click",()=>se("app-menu-view")),(T=document.getElementById("btn-logout-info"))==null||T.addEventListener("click",Ta),(C=document.getElementById("btn-back-to-menu"))==null||C.addEventListener("click",()=>{se("app-menu-view")}),(U=document.getElementById("btn-back-to-menu-att"))==null||U.addEventListener("click",()=>se("app-menu-view")),(ee=document.getElementById("btn-logout-att"))==null||ee.addEventListener("click",Ta),(z=document.getElementById("btn-change-password-menu"))==null||z.addEventListener("click",mr);const Ut=(K=document.getElementById("app-menu-view"))==null?void 0:K.querySelector(".space-y-4");Ut&&(Ut.className="w-full max-w-xs mx-auto space-y-3 mt-4");const Mt=document.getElementById("btn-app-dispatch");Mt&&(Mt.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-blue-600 hover:bg-blue-700 hover:shadow-lg text-white text-left",Mt.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">🚗</span><span>配車調整</span></div><span class="text-white/60 text-sm font-normal">❯</span>');const Et=document.getElementById("btn-app-attendance");Et&&(Et.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-green-600 hover:bg-green-700 hover:shadow-lg text-white text-left",Et.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">📅</span><span>出欠管理</span></div><span class="text-white/60 text-sm font-normal">❯</span>');const _t=document.getElementById("btn-app-simulator");_t&&(_t.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-amber-600 hover:bg-amber-700 hover:shadow-lg text-white text-left",_t.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">⚾</span><span>ポジション設定</span></div><span class="text-white/60 text-sm font-normal">❯</span>',_t.onclick=()=>{se("position-simulator-view"),Pa()});const xt=document.getElementById("btn-app-info");xt&&(xt.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-teal-600 hover:bg-teal-700 hover:shadow-lg text-white text-left",xt.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">ℹ️</span><span>Info</span></div><span class="text-white/60 text-sm font-normal">❯</span>',xt.onclick=async()=>{await Me(async()=>{await Ma({supabaseClient:B,currentUser:J,currentUserRole:Ge})},"Info画面を準備中..."),se("info-view")}),(H=document.getElementById("nav-info"))==null||H.addEventListener("click",async()=>{await Me(async()=>{await Ma({supabaseClient:B,currentUser:J,currentUserRole:Ge})},"Info画面を準備中..."),se("info-view")}),(Z=document.getElementById("nav-simulator"))==null||Z.addEventListener("click",()=>{se("position-simulator-view"),Pa()}),(q=document.getElementById("nav-simulator-att"))==null||q.addEventListener("click",()=>{se("position-simulator-view"),Pa()}),(re=document.getElementById("nav-dispatch-sim"))==null||re.addEventListener("click",()=>{var Y;se("app-view","dispatch"),aa?(Y=document.getElementById("nav-dispatch"))==null||Y.click():Gs()}),(oe=document.getElementById("nav-attendance-sim"))==null||oe.addEventListener("click",async()=>{se("attendance-view"),await Me(Ss,"出欠管理画面を準備中...")})}catch(ge){console.error("DOM Initialization failed:",ge),it(),se("auth-view")}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ur):setTimeout(Ur,0);let Vs=!1;function Za(e,t=null){if(Vs)return;const n="#"+e+(t?"-"+t:"");window.location.hash!==n&&history.pushState({screenId:e,subView:t},"",n)}function se(e,t=null){["auth-view","signup-view","password-reset-view","password-update-view","app-menu-view","app-view","attendance-view","view-users","dashboard-view","dashboard-settings","position-simulator-view","info-view","survey-respond-view"].forEach(a=>{const s=document.getElementById(a);s&&s.classList.add("hidden")});const n=document.getElementById(e);n&&n.classList.remove("hidden"),Za(e,t),e!=="auth-view"&&e!=="survey-respond-view"&&J&&fe("NAVIGATE",`画面遷移: ${e}${t?" > "+t:""}`)}function Ra(){let e=null,t=null,n=null;try{const a=new URLSearchParams(window.location.search);e=a.get("survey"),t=a.get("response"),n=a.get("d");let s=window.location.hash||"";if(s.startsWith("#/")&&(s="#"+s.substring(2)),s.includes("?")){const[r,o]=s.split("?");s=r;try{const i=new URLSearchParams(o);e||(e=i.get("survey")),t||(t=i.get("response")),n||(n=i.get("d"))}catch{}}if(s.startsWith("#survey-")||s.startsWith("#survey=")){const o=(s.startsWith("#survey-")?s.replace("#survey-",""):s.replace("#survey=","")).split("&");e||(e=o[0]);for(let i=1;i<o.length;i++){const d=o[i],l=d.indexOf("=");if(l!==-1){const c=d.substring(0,l),u=d.substring(l+1);c==="response"&&u&&!t&&(t=u),c==="d"&&u&&!n&&(n=u)}}}}catch(a){console.warn("parseSurveyUrlParams error:",a)}if(e)try{e=decodeURIComponent(e).trim().replace(/^\/+|\/+$/g,"")}catch{}if(t)try{t=decodeURIComponent(t).trim()}catch{}return{surveyId:e,responseId:t,surveyData:n||null}}window.addEventListener("popstate",async e=>{var t,n;Vs=!0;try{const{surveyId:a,responseId:s,surveyData:r}=Ra();if(a){await Zn(a,s,r);return}e.state&&e.state.screenId?(se(e.state.screenId,e.state.subView),e.state.screenId==="app-view"&&(e.state.subView==="users"?await ha():e.state.subView==="master"?(t=document.getElementById("nav-master"))==null||t.click():(n=document.getElementById("nav-dispatch"))==null||n.click())):se(J?"app-menu-view":"auth-view")}finally{Vs=!1}});B&&B.auth.onAuthStateChange(async(e,t)=>{if(e==="PASSWORD_RECOVERY"){se("password-update-view");return}if(t&&aa&&J&&(e==="TOKEN_REFRESHED"||e==="USER_UPDATED")){console.log(`Bypassing auth state change handling for event: ${e}`);return}const n=async()=>{var o,i,d,l,c,u,f,g;const{surveyId:a,responseId:s,surveyData:r}=Ra();if(a){if(it(),t){J={...t.user};try{const{data:y}=await B.from("app_users").select("name, role").eq("email",J.email).single();y&&(J.name=y.name,Ge=y.role)}catch{}}await Zn(a,s,r);return}if(t){W("ユーザー権限確認中...");try{const y=!J||J.id!==t.user.id;J={...t.user},y&&await fe("LOGIN","ログインしました");let b=!0,p=!0,m=!0,h=!0,_=!0,I=!1;try{let{data:q,error:re}=await B.from("app_users").select("role, name, can_use_dispatch, can_use_dashboard, can_use_attendance, can_use_simulator, can_use_info, can_edit_info").eq("email",J.email).single();if(re){const{data:oe}=await B.from("app_users").select("role, name, can_use_dispatch, can_use_dashboard, can_use_attendance, can_use_simulator, can_use_info").eq("email",J.email).single();q=oe}q?(Ge=q.role,J.name=q.name,q.can_use_dispatch===!1&&(b=!1),q.can_use_dashboard===!1&&(p=!1),q.can_use_attendance===!1&&(m=!1),q.can_use_simulator===!1&&(h=!1),q.can_use_info===!1&&(_=!1),I=q.can_edit_info===!0):Ge="user"}catch{Ge="user"}J.email==="hishinumak@gmail.com"&&(Ge="admin"),Ge==="admin"?(b=!0,p=!0,m=!0,h=!0,_=!0,I=!0):Ge==="leader"&&I===!1&&(I=!0),J.can_use_info=_,J.can_edit_info=I;let k=document.getElementById("btn-app-dashboard");if(p)if(k)k.classList.remove("hidden");else{const q=((o=document.getElementById("app-menu-view"))==null?void 0:o.querySelector(".space-y-3"))||((i=document.getElementById("app-menu-view"))==null?void 0:i.querySelector(".space-y-4"))||((d=document.getElementById("app-menu-view"))==null?void 0:d.querySelector(".grid"));q&&(k=document.createElement("button"),k.id="btn-app-dashboard",k.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg text-white text-left",k.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">📊</span><span>分析</span></div><span class="text-white/60 text-sm font-normal">❯</span>',k.onclick=async()=>{await Me(Bs,"ダッシュボードを準備中..."),se("dashboard-view")},q.appendChild(k))}else k&&k.classList.add("hidden");const S=document.getElementById("nav-users"),$=document.getElementById("nav-master"),E=document.getElementById("nav-dispatch"),w=document.getElementById("btn-app-dispatch"),x=document.getElementById("btn-goto-master"),v=document.getElementById("clear-db-button");let A=document.getElementById("btn-app-users-admin");if(S==null||S.classList.add("hidden"),Ge==="admin"?(E==null||E.classList.remove("hidden"),$==null||$.classList.remove("hidden")):Ge==="leader"?(E==null||E.classList.remove("hidden"),$==null||$.classList.add("hidden")):(E==null||E.classList.add("hidden"),$==null||$.classList.add("hidden")),Ge==="admin")if(x==null||x.classList.remove("hidden"),v==null||v.classList.remove("hidden"),A)A.classList.remove("hidden");else{const q=((l=document.getElementById("app-menu-view"))==null?void 0:l.querySelector(".space-y-3"))||((c=document.getElementById("app-menu-view"))==null?void 0:c.querySelector(".space-y-4"))||((u=document.getElementById("app-menu-view"))==null?void 0:u.querySelector(".grid"));q&&(A=document.createElement("button"),A.id="btn-app-users-admin",A.className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl shadow-md transition duration-200 font-bold bg-purple-600 hover:bg-purple-700 hover:shadow-lg text-white text-left order-last",A.innerHTML='<div class="flex items-center space-x-3 text-base sm:text-lg"><span class="text-2xl">⚙️</span><span>管理者メニュー</span></div><span class="text-white/60 text-sm font-normal">❯</span>',A.onclick=()=>Co(),q.appendChild(A))}else x==null||x.classList.add("hidden"),v==null||v.classList.add("hidden"),A&&A.classList.add("hidden");b?w==null||w.classList.remove("hidden"):w==null||w.classList.add("hidden");const P=document.getElementById("btn-app-attendance");m?P==null||P.classList.remove("hidden"):P==null||P.classList.add("hidden");const N=document.getElementById("btn-app-simulator"),D=document.getElementById("nav-simulator"),F=document.getElementById("nav-simulator-att"),R=document.getElementById("nav-dispatch-sim"),L=document.getElementById("nav-attendance-sim");h?(N==null||N.classList.remove("hidden"),D==null||D.classList.remove("hidden"),F==null||F.classList.remove("hidden")):(N==null||N.classList.add("hidden"),D==null||D.classList.add("hidden"),F==null||F.classList.add("hidden")),b?R==null||R.classList.remove("hidden"):R==null||R.classList.add("hidden"),m?L==null||L.classList.remove("hidden"):L==null||L.classList.add("hidden");const T=document.getElementById("btn-app-info"),C=document.getElementById("nav-info");_?(T==null||T.classList.remove("hidden"),C==null||C.classList.remove("hidden")):(T==null||T.classList.add("hidden"),C==null||C.classList.add("hidden"));const U=document.getElementById("user-email-display");U&&(U.textContent=J.name||On(J.email));const ee=document.getElementById("sim-user-email-display");ee&&(ee.textContent=J.name||On(J.email));const{surveyId:z,responseId:K,surveyData:H}=Ra();if(z){await Zn(z,K,H);return}const Z=window.location.hash;if(Z&&Z!=="#app-menu-view"&&Z!=="#auth-view"){const q=["app-view","attendance-view","dashboard-view","position-simulator-view","info-view"];let re=!1;for(const oe of q)if(Z.startsWith("#"+oe)){const ge=Z.length>oe.length+1?Z.substring(oe.length+2):null;oe==="app-view"?(se("app-view",ge),aa?ge==="users"?ha():ge==="master"?(f=document.getElementById("nav-master"))==null||f.click():(g=document.getElementById("nav-dispatch"))==null||g.click():Gs().then(()=>{var Te,st;ge==="users"?ha():ge==="master"?(Te=document.getElementById("nav-master"))==null||Te.click():(st=document.getElementById("nav-dispatch"))==null||st.click()}).catch(Te=>{console.error("App init error:",Te),it()})):oe==="attendance-view"?(se("attendance-view"),Ss().catch(Te=>{console.error("Attendance init error:",Te),it()})):oe==="dashboard-view"?(se("dashboard-view"),Bs().catch(Te=>{console.error("Dashboard init error:",Te),it()})):oe==="position-simulator-view"?(se("position-simulator-view"),Pa()):oe==="info-view"&&(se("info-view"),Ma({supabaseClient:B,currentUser:J,currentUserRole:Ge}).catch(Te=>{console.error("Info init error:",Te),it()})),re=!0;break}re||se("app-menu-view")}else se("app-menu-view")}catch(y){console.error("Auth state handling error:",y),it()}finally{G()}}else{J=null,it();const{surveyId:y,responseId:b,surveyData:p}=Ra();if(y){await Zn(y,b,p);return}const m=document.getElementById("password-update-view");(!m||m.classList.contains("hidden"))&&se("auth-view")}};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{n().catch(console.error)}):setTimeout(()=>{n().catch(console.error)},0)});async function Al(e){if(e&&e.preventDefault&&e.preventDefault(),!!confirm(`ブラウザに保存されているログイン情報（キャッシュ）をクリアして、ページを再読み込みしますか？
（動作がおかしい・ログインできない場合にお試しください）`)){W("キャッシュクリア中...");try{await B.auth.signOut().catch(()=>{});const t=[];for(let n=0;n<localStorage.length;n++){const a=localStorage.key(n);a&&a.startsWith("sb-")&&t.push(a)}t.forEach(n=>localStorage.removeItem(n)),alert("キャッシュをクリアしました。ページを再読み込みします。"),location.reload()}catch{it()}}}let vs=!1;async function jr(e){var r,o;if(e&&e.preventDefault&&e.preventDefault(),vs)return;const t=((r=document.getElementById("email-address"))==null?void 0:r.value)||"",n=ds(t),a=((o=document.getElementById("password"))==null?void 0:o.value)||"",s=document.getElementById("auth-message");if(s&&s.classList.add("hidden"),!(!n||!a)){vs=!0,W("ログイン認証中...");try{const{error:i}=await B.auth.signInWithPassword({email:n,password:a});i&&(s?(s.textContent="ログイン失敗: "+i.message,s.classList.remove("hidden"),s.classList.add("text-red-500")):alert("ログイン失敗: "+i.message))}catch(i){console.error("Login Error:",i);const d=i.message+`
`+JSON.stringify(i,Object.getOwnPropertyNames(i));s?(s.textContent="通信エラー詳細: "+d,s.classList.remove("hidden"),s.classList.add("text-red-500")):alert(`通信エラー詳細:
`+d)}finally{G(),vs=!1}}}async function Co(){se("app-view","users"),await ha()}function mr(){const e=document.getElementById("change-password-modal");e&&(document.body.appendChild(e),e.classList.remove("hidden"),e.style.zIndex="9999")}let ws=!1;async function Tl(e){var i,d,l,c;if(e&&e.preventDefault&&e.preventDefault(),ws)return;const t=((i=document.getElementById("signup-parent-name"))==null?void 0:i.value)||"",n=((d=document.getElementById("signup-player-name"))==null?void 0:d.value)||"",a=((l=document.getElementById("signup-email"))==null?void 0:l.value)||"";let s=((c=document.getElementById("signup-password"))==null?void 0:c.value)||"";const r=document.getElementById("signup-message");r&&r.classList.add("hidden");const o=document.getElementById("signup-password")!==null;if(o||(s=Math.random().toString(36).slice(-10)+"A1!"),!t||!n||!a||o&&s.length<6){r&&(r.textContent=o?"すべての項目を正しく入力してください(パスワードは6文字以上)":"すべての項目を正しく入力してください"),r&&r.classList.remove("hidden","text-green-600"),r&&r.classList.add("text-red-500");return}ws=!0,W("利用申請を送信中...");try{const{data:u,error:f}=await B.auth.signUp({email:a,password:s});if(f){r&&(r.textContent="登録エラー: "+f.message),r&&r.classList.remove("hidden","text-green-600"),r&&r.classList.add("text-red-500");return}const{error:g}=await B.from("signup_requests").insert([{parent_name:t,player_name:n,email:a,status:"pending"}]);await B.auth.signOut(),g?(r&&(r.textContent="申請失敗: "+g.message),r&&r.classList.remove("hidden","text-green-600"),r&&r.classList.add("text-red-500")):(r&&(r.textContent=o?"アカウントが作成され、利用申請が送信されました。管理者の承認をお待ちください。":"利用申請が送信されました。管理者の承認後、「パスワードを忘れた場合」からパスワードを再設定してログインしてください。"),r&&r.classList.remove("text-red-500"),r&&r.classList.add("text-green-600"),r&&r.classList.remove("hidden"),document.getElementById("signup-parent-name")&&(document.getElementById("signup-parent-name").value=""),document.getElementById("signup-player-name")&&(document.getElementById("signup-player-name").value=""),document.getElementById("signup-email")&&(document.getElementById("signup-email").value=""),document.getElementById("signup-password")&&(document.getElementById("signup-password").value=""))}catch(u){it(),console.error("Signup Error:",u),r&&(r.textContent="登録処理中にエラーが発生しました。",r.classList.remove("hidden","text-green-600"),r.classList.add("text-red-500"))}finally{G(),ws=!1}}async function Dl(e){var a;e&&e.preventDefault&&e.preventDefault();const t=((a=document.getElementById("reset-email"))==null?void 0:a.value)||"",n=document.getElementById("reset-message");if(n&&n.classList.add("hidden"),!!t){W("パスワード再設定メール送信中...");try{const{error:s}=await B.auth.resetPasswordForEmail(t,{redirectTo:window.location.origin});s?n?(n.textContent="送信失敗: "+s.message,n.classList.remove("hidden","text-green-600"),n.classList.add("text-red-500")):alert("送信失敗: "+s.message):n?(n.textContent="パスワード再設定メールを送信しました。",n.classList.remove("text-red-500"),n.classList.add("text-green-600"),n.classList.remove("hidden")):alert("パスワード再設定メールを送信しました。")}catch(s){console.error("Password reset error:",s)}finally{G()}}}async function Cl(e){var a;e&&e.preventDefault&&e.preventDefault();const t=((a=document.getElementById("new-password"))==null?void 0:a.value)||"",n=document.getElementById("update-password-message");if(n&&n.classList.add("hidden"),!t||t.length<6){n?(n.textContent="6文字以上のパスワードを入力してください",n.classList.remove("hidden","text-green-600"),n.classList.add("text-red-500")):alert("6文字以上のパスワードを入力してください");return}W("パスワード更新中...");try{const{error:s}=await B.auth.updateUser({password:t});s?n?(n.textContent="更新失敗: "+s.message,n.classList.remove("hidden","text-green-600"),n.classList.add("text-red-500")):alert("更新失敗: "+s.message):(alert("パスワードが更新されました。再度ログインしてください。"),se("auth-view"))}catch(s){console.error("Password update error:",s)}finally{G()}}async function Nl(e){var n;e&&e.preventDefault&&e.preventDefault();const t=((n=document.getElementById("change-new-password"))==null?void 0:n.value)||"";if(!t||t.length<6)return alert("6文字以上のパスワードを入力してください");W("パスワード変更中...");try{const{error:a}=await B.auth.updateUser({password:t});if(a)alert("更新失敗: "+a.message);else{alert("パスワードが変更されました。");const s=document.getElementById("change-password-modal");s&&s.classList.add("hidden");const r=document.getElementById("change-new-password");r&&(r.value="")}}catch(a){console.error("Password change error:",a)}finally{G()}}async function Ta(e){e&&e.preventDefault&&e.preventDefault(),J&&await fe("LOGOUT","ログアウトしました"),W("ログアウト処理中...");try{await B.auth.signOut().catch(()=>{})}finally{G(),aa=!1,history.pushState(null,"",window.location.pathname)}}function Oa(e){const t=document.getElementById("nav-dispatch"),n=document.getElementById("nav-master"),a=document.getElementById("nav-users");e==="users"?(t==null||t.classList.add("hidden"),n==null||n.classList.add("hidden"),a==null||a.classList.add("hidden")):(a==null||a.classList.add("hidden"),Ge==="admin"?(t==null||t.classList.remove("hidden"),n==null||n.classList.remove("hidden")):Ge==="leader"?(t==null||t.classList.remove("hidden"),n==null||n.classList.add("hidden")):(t==null||t.classList.add("hidden"),n==null||n.classList.add("hidden")))}let we=[],_e=[],pt=[],fa=new Set;async function Gs(){var e,t,n;aa=!0,Oa("dispatch"),Ke==null||Ke.addEventListener("click",async()=>{var a,s;Vn==null||Vn.classList.remove("hidden"),Gn==null||Gn.classList.add("hidden"),(a=document.getElementById("view-users"))==null||a.classList.add("hidden"),Oa("dispatch"),Ke==null||Ke.classList.add("text-blue-300"),Ke==null||Ke.classList.remove("text-gray-400"),Qe==null||Qe.classList.remove("text-blue-300"),Qe==null||Qe.classList.add("text-gray-400"),(s=document.getElementById("nav-users"))==null||s.classList.remove("text-blue-300"),Za("app-view","dispatch"),await Gr()}),Qe==null||Qe.addEventListener("click",async()=>{var a,s;Gn==null||Gn.classList.remove("hidden"),Vn==null||Vn.classList.add("hidden"),(a=document.getElementById("view-users"))==null||a.classList.add("hidden"),Oa("master"),Qe==null||Qe.classList.add("text-blue-300"),Qe==null||Qe.classList.remove("text-gray-400"),Ke==null||Ke.classList.remove("text-blue-300"),Ke==null||Ke.classList.add("text-gray-400"),(s=document.getElementById("nav-users"))==null||s.classList.remove("text-blue-300"),Za("app-view","master"),await Fl(),xa()}),(e=document.getElementById("btn-goto-master"))==null||e.addEventListener("click",()=>{Qe==null||Qe.click()}),(t=document.getElementById("btn-back-to-dispatch"))==null||t.addEventListener("click",()=>{Ke==null||Ke.click()});try{await ne.initMasterData(),we.length===0&&_e.length===0&&(await ne.bulkAddFamilies(Rl),await ne.bulkAddCars(Ol),await ne.syncMaster(),await ne.initMasterData()),await Gr(),ql(),dc(),(n=document.getElementById("btn-load-logs"))==null||n.addEventListener("click",xa)}catch(a){console.error(a),ht("データの読み込みに失敗しました。","error")}}async function ha(){Ge==="admin"&&(document.getElementById("view-users").classList.remove("hidden"),document.getElementById("view-master").classList.add("hidden"),document.getElementById("view-dispatch").classList.add("hidden"),Oa("users"),document.getElementById("nav-users").classList.add("text-blue-300"),document.getElementById("nav-users").classList.remove("text-gray-400"),document.getElementById("nav-dispatch").classList.remove("text-blue-300"),document.getElementById("nav-master").classList.remove("text-blue-300"),Za("app-view","users"),await be())}async function be(){W("メンバー・マスタ情報読み込み中...");try{const{data:e}=await B.from("app_users").select("*").order("created_at",{ascending:!1});let t=[],n=[],a=[],s=[],r=[];try{const{data:m}=await B.from("groups").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});m&&(t=m);const{data:h}=await B.from("user_groups").select("*");h&&(n=h);const{data:_}=await B.from("event_categories").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});_&&(a=_);const{data:I}=await B.from("user_attributes").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});I&&(s=I);try{const{data:S}=await B.from("event_locations").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});S&&(r=S)}catch(S){console.warn("event_locations table not created yet:",S)}const{data:k}=await B.from("master_data").select("*").eq("key","ATTENDANCE_DELEGATIONS").single();k&&k.data?window.adminDelegations=k.data:window.adminDelegations={}}catch(m){console.error("Groups DB Error:",m)}const o=localStorage.getItem("admin_users_sort")||"created_desc",i=document.getElementById("admin-users-sort");if(i&&(i.value=o),e&&e.length>0){const m=new Map(t.map(I=>[I.id,I.name])),h=new Map(s.map(I=>[I.id,I.name])),_=new Map(n.map(I=>[I.user_email,I.group_id]));if(o==="manual"){let I=[];try{const k=localStorage.getItem("admin_users_manual_order");k&&(I=JSON.parse(k))}catch(k){console.error("Failed to parse manual user order:",k)}e.sort((k,S)=>{let $=I.indexOf(k.email),E=I.indexOf(S.email);return $===-1&&($=999999),E===-1&&(E=999999),$!==E?$-E:new Date(S.created_at||0)-new Date(k.created_at||0)})}else if(o==="created_desc")e.sort((I,k)=>new Date(k.created_at||0)-new Date(I.created_at||0));else if(o==="created_asc")e.sort((I,k)=>new Date(I.created_at||0)-new Date(k.created_at||0));else if(o==="name_asc")e.sort((I,k)=>(I.name||"").localeCompare(k.name||"","ja"));else if(o==="name_desc")e.sort((I,k)=>(k.name||"").localeCompare(I.name||"","ja"));else if(o==="email_asc")e.sort((I,k)=>(I.email||"").localeCompare(k.email||"","en"));else if(o==="email_desc")e.sort((I,k)=>(k.email||"").localeCompare(I.email||"","en"));else if(o==="role_desc"){const I={admin:3,leader:2,user:1};e.sort((k,S)=>{const $=I[k.role]||0,E=I[S.role]||0;return $!==E?E-$:new Date(S.created_at||0)-new Date(k.created_at||0)})}else o==="group_asc"?e.sort((I,k)=>{const S=m.get(_.get(I.email))||"",$=m.get(_.get(k.email))||"";return!S&&$?1:S&&!$?-1:S.localeCompare($,"ja")}):o==="attribute_asc"&&e.sort((I,k)=>{const S=h.get(I.attribute_id)||"",$=h.get(k.attribute_id)||"";return!S&&$?1:S&&!$?-1:S.localeCompare($,"ja")})}const d=document.getElementById("allowed-users-list");let l=`
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
        `;const g=(e||[]).map((m,h)=>{var x;const _=m.email.endsWith("@local.dummy"),I=((x=n.find(v=>v.user_email===m.email))==null?void 0:x.group_id)||"",k=t.map(v=>`<option value="${v.id}" ${I===v.id?"selected":""}>${v.name}</option>`).join(""),S=`
                <select id="edit-group-${h}" class="border p-1 rounded text-sm w-36 font-semibold text-gray-700 bg-white">
                    <option value="">選択なし</option>
                    ${k}
                </select>
            `,$=(e||[]).filter(v=>v.email!==m.email).map(v=>`
                <label class="inline-flex items-center text-xs mr-3 mb-1 w-32 truncate" title="${v.email}">
                    <input type="checkbox" name="edit-delegation-${h}" value="${v.email}" ${window.adminDelegations[m.email]&&window.adminDelegations[m.email].includes(v.email)?"checked":""} class="mr-1 rounded text-blue-600">
                    <span class="truncate">${v.name||v.email}</span>
                </label>
            `).join(""),w=o==="manual"?`
                <div class="user-drag-handle cursor-grab select-none text-gray-400 hover:text-gray-600 px-2 flex items-center justify-center text-xl font-bold border-r border-gray-100 mr-2" title="ドラッグして並べ替え">
                    ⋮⋮
                </div>
            `:"";return`
            <div class="user-admin-card flex items-stretch p-3 bg-white border rounded shadow-sm mb-2 hover:bg-gray-50 transition" data-email="${m.email}" data-index="${h}" data-old-role="${m.role}">
                ${w}
                <div class="flex-grow flex flex-col">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-gray-100 pb-2 mb-2">
                        <div class="flex-grow flex flex-col md:flex-row md:items-center gap-2">
                        <input type="text" id="edit-name-${h}" value="${m.name||""}" placeholder="氏名" class="border p-1 rounded text-sm w-32 font-bold">
                        <input type="text" id="edit-email-${h}" value="${On(m.email)}" class="border p-1 rounded text-sm w-48 font-bold" ${m.email===J.email||_?"disabled":""}>
                        <select id="edit-attribute-${h}" class="border p-1 rounded text-sm w-28">
                            <option value="">属性なし</option>
                            ${s.map(v=>`<option value="${v.id}" ${m.attribute_id===v.id?"selected":""}>${v.name}</option>`).join("")}
                        </select>
                        <select id="edit-role-${h}" class="border p-1 rounded text-sm" ${m.email===J.email?"disabled":""}>
                            <option value="user" ${m.role==="user"?"selected":""}>一般ユーザー</option>
                            <option value="leader" ${m.role==="leader"?"selected":""}>リーダー</option>
                            <option value="admin" ${m.role==="admin"?"selected":""}>管理者</option>
                        </select>
                         <div class="flex items-center space-x-3 ml-2 border-l pl-2 flex-wrap gap-y-1">
                            <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-dispatch-${h}" class="rounded text-blue-600" ${m.can_use_dispatch!==!1?"checked":""}><span>配車可</span></label>
                            <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-dashboard-${h}" class="rounded text-blue-600" ${m.can_use_dashboard!==!1?"checked":""}><span>成績可</span></label>
                            <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-attendance-${h}" class="rounded text-blue-600" ${m.can_use_attendance!==!1?"checked":""}><span>出欠可</span></label>
                            <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-simulator-${h}" class="rounded text-blue-600" ${m.can_use_simulator!==!1?"checked":""}><span>シミュレータ可</span></label>
                            <label class="flex items-center space-x-1 text-xs font-bold text-gray-600"><input type="checkbox" id="edit-use-info-${h}" class="rounded text-teal-600" ${m.can_use_info!==!1?"checked":""}><span>Info閲覧可</span></label>
                            <label class="flex items-center space-x-1 text-xs font-bold text-teal-800"><input type="checkbox" id="edit-manage-info-${h}" class="rounded text-teal-600 edit-manage-info-chk" data-index="${h}" ${m.can_edit_info===!0||m.role==="admin"||m.role==="leader"&&m.can_edit_info!==!1?"checked":""}><span>Info編集可</span></label>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2 shrink-0">
                        ${_?"":`<button onclick="adminChangeUserPassword('${m.email}')" class="text-xs bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded shadow">パスワード変更</button>`}
                        ${m.email!==J.email?`<button onclick="deleteAdminUser('${m.email}')" class="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded shadow">削除</button>`:""}
                    </div>
                </div>
                    <div class="flex flex-col md:flex-row md:items-start justify-between gap-2">
                        <div class="flex-grow">
                            <div class="text-xs font-bold text-gray-500 mb-1">所属グループ:</div>
                            <div id="group-container-${h}">${S}</div>
                        </div>
                        <div class="flex-grow mt-2 md:mt-0 border-t md:border-t-0 md:border-l border-gray-200 pt-2 md:pt-0 md:pl-4">
                            <div class="text-xs font-bold text-gray-500 mb-1">代行権限 (他メンバーの出欠を代理で入力できる権限):</div>
                            <details class="text-xs border p-2 bg-gray-50 rounded shadow-inner">
                                <summary class="cursor-pointer text-gray-700 font-bold">代行入力できるメンバーを選択 (複数可)</summary>
                                <div class="flex flex-wrap mt-2 max-h-32 overflow-y-auto border-t border-gray-200 pt-2">${$||'<span class="text-gray-400">他のメンバーがいません</span>'}</div>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
            `}).join("");d.innerHTML=g,Ml(),d.querySelectorAll(".edit-manage-info-chk").forEach(m=>{m.addEventListener("change",h=>{if(h.target.checked){const _=h.target.getAttribute("data-index"),I=document.getElementById(`edit-use-info-${_}`);I&&(I.checked=!0)}})});const y=document.getElementById("admin-master-list");y&&(y.innerHTML=l+c+u+f,Da("admin-attribute-list","user_attributes",be),Da("admin-category-list","event_categories",be),Da("admin-group-list","groups",be),Da("admin-location-list","event_locations",be));const{data:b}=await B.from("signup_requests").select("*").eq("status","pending").order("created_at",{ascending:!1}),p=document.getElementById("signup-requests-list");!b||b.length===0?p.innerHTML='<p class="text-gray-500 text-sm">現在、承認待ちの申請はありません。</p>':p.innerHTML=b.map(m=>`
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
            `).join("")}finally{G()}}async function Pl(){const e=document.querySelectorAll(".user-admin-card");if(e.length!==0&&confirm("全メンバーの設定を一括保存しますか？")){W("全メンバー設定を保存中...");try{const t=[],n=[],a=[];e.forEach(d=>{const l=d.getAttribute("data-email"),c=d.getAttribute("data-index"),u=d.getAttribute("data-old-role"),f=document.getElementById(`edit-email-${c}`),g=document.getElementById(`edit-name-${c}`),y=document.getElementById(`edit-attribute-${c}`),b=document.getElementById(`edit-role-${c}`),p=document.getElementById(`edit-use-dispatch-${c}`),m=document.getElementById(`edit-use-dashboard-${c}`),h=document.getElementById(`edit-use-attendance-${c}`),_=document.getElementById(`edit-use-simulator-${c}`),I=document.getElementById(`edit-use-info-${c}`),k=document.getElementById(`edit-manage-info-${c}`),S=f.disabled?l:ds(f.value.trim()),$=g.value.trim(),E=y&&y.value||null,w=b.disabled?u:b.value,x=p?p.checked:!0,v=m?m.checked:!0,A=h?h.checked:!0,P=_?_.checked:!0,N=I?I.checked:!0,D=k?k.checked:w==="admin"||w==="leader"&&!0;if(!S)throw new Error("メールアドレスが空のレコードがあります。");a.push(l);const F={email:S,name:$,attribute_id:E,role:w,can_use_dispatch:x,can_use_dashboard:v,can_use_attendance:A,can_use_simulator:P,can_use_info:N,can_edit_info:D};t.push({oldEmail:l,updatePayload:F});const R=document.getElementById(`edit-group-${c}`),L=R?R.value:"";L&&n.push({user_email:S,group_id:L});const T=document.querySelectorAll(`input[name="edit-delegation-${c}"]:checked`),C=Array.from(T).map(U=>U.value);l!==S&&window.adminDelegations[l]&&delete window.adminDelegations[l],window.adminDelegations[S]=C});const s=t.map(async d=>{let l=await B.from("app_users").update(d.updatePayload).eq("email",d.oldEmail);if(l.error&&l.error.message&&l.error.message.includes("can_edit_info")){const c={...d.updatePayload};delete c.can_edit_info,l=await B.from("app_users").update(c).eq("email",d.oldEmail)}return l}),r=await Promise.all(s);for(const d of r)if(d.error)throw d.error;const{error:o}=await B.from("user_groups").delete().in("user_email",a);if(o)throw o;if(n.length>0){const{error:d}=await B.from("user_groups").insert(n);if(d)throw d}const{error:i}=await B.from("master_data").upsert({key:"ATTENDANCE_DELEGATIONS",data:window.adminDelegations});if(i)throw i;await fe("UPDATE_USERS_ALL","全メンバーの設定を一括更新しました"),alert("全メンバーの設定を一括保存しました"),await be()}catch(t){console.error(t),alert("保存中にエラーが発生しました: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{G()}}}window.forceResetPassword=async function(e){if(confirm(`${e} 宛にパスワード再設定メールを送信し、強制的にパスワードをリセットさせますか？`)){W("パスワード再設定メール送信中...");try{const{error:t}=await B.auth.resetPasswordForEmail(e,{redirectTo:window.location.origin});alert(t?"送信失敗: "+t.message:"パスワード再設定メールを送信しました。")}catch(t){console.error(t)}finally{G()}}};window.adminChangeUserPassword=async function(e){const t=On(e),n=prompt(`「${t}」の新しいパスワードを入力してください（6文字以上）：`);if(n===null)return;const a=n.trim();if(a.length<6)return alert("パスワードは6文字以上で設定してください。");W("パスワード変更中...");try{const{error:s}=await B.rpc("admin_update_user_password",{user_email:e,new_password:a});if(s)throw new Error(s.message);await fe("ADMIN_CHANGE_PASSWORD",`ユーザー「${e}」のパスワードを変更しました`),alert(`「${t}」のパスワードを正常に変更しました。`)}catch(s){console.error(s),alert(`パスワード変更エラー:
`+s.message+`

※この機能を使用するには、あらかじめSupabaseのSQLエディタで専用のデータベース関数（admin_update_user_password）を設定する必要があります。詳細はマニュアルまたはエージェントのメッセージを参照してください。`)}finally{G()}};window.adminAddUser=async function(){var r,o,i,d;const e=((r=document.getElementById("admin-add-email"))==null?void 0:r.value.trim())||"",t=ds(e),n=((o=document.getElementById("admin-add-name"))==null?void 0:o.value.trim())||"",a=((i=document.getElementById("admin-add-password"))==null?void 0:i.value.trim())||"",s=((d=document.getElementById("admin-add-role"))==null?void 0:d.value)||"user";if(!e||!n||!a)return alert("ユーザーID（またはメールアドレス）、氏名、仮パスワードは必須入力項目です。");if(a.length<6)return alert("仮パスワードは6文字以上で設定してください。");W("アカウント払い出し中...");try{const l=window.supabase.createClient(na,Qa,{auth:{persistSession:!1,autoRefreshToken:!1}}),{data:c,error:u}=await l.auth.signUp({email:t,password:a});if(u)throw new Error(`Authアカウント作成失敗: ${u.message}`);const{error:f}=await B.from("app_users").insert([{email:t,name:n,role:s}]);if(f)throw new Error(`データベース登録失敗: ${f.message}`);await fe("ADD_USER_COMPLETED",`アカウント「${t}」を仮パスワード付きで払い出しました`),document.getElementById("admin-add-email").value="",document.getElementById("admin-add-name").value="",document.getElementById("admin-add-password").value="",alert(`アカウントの払い出しが完了しました！

【ユーザー通知内容】
ログインID: ${On(t)}
仮パスワード: ${a}

上記情報をLINE等の別手段でユーザーに通知してください。`),await be()}catch(l){console.error(l),alert(`アカウント払い出しエラー:
`+l.message)}finally{G()}};window.adminAddDummyUser=async function(){const e=prompt(`追加する代行専用メンバーの「氏名」を入力してください。
（※ログインはできず、他のメンバーからの代行入力専用アカウントとなります）`);if(!e||e.trim()==="")return;const t=`dummy_${Date.now()}@local.dummy`;W("代行専用メンバー追加処理中...");try{await B.from("app_users").insert([{email:t,name:e.trim(),role:"user"}]),await fe("ADD_DUMMY_USER",`代行専用メンバー「${e.trim()}」を追加しました`),await be()}catch(n){console.error(n),alert("追加エラー: "+(n.message==="Load failed"||n.message==="Failed to fetch"?"通信に失敗しました。":n.message))}finally{G()}};window.deleteAdminUser=async function(e){if(confirm(`${e} のアクセス許可を取り消しますか？`)){W("ユーザー削除処理中...");try{await B.from("app_users").delete().eq("email",e),await fe("DELETE_USER",`ユーザー「${e}」を削除しました`),await be()}catch(t){console.error(t),alert("削除エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{G()}}};window.saveNewCategoryAdmin=async function(){var n;const e=document.getElementById("admin-new-category-name").value.trim(),t=((n=document.getElementById("admin-new-category-color"))==null?void 0:n.value)||"#bfdbfe";if(!e)return alert("カテゴリ名を入力してください");W("カテゴリ追加中...");try{const{error:a}=await B.from("event_categories").insert([{name:e,color:t}]);if(a)throw a;await be()}catch(a){alert("追加エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{G()}};window.deleteCategoryAdmin=async function(e){if(confirm(`このカテゴリを削除しますか？
※既存のイベントに設定されているカテゴリ名には影響しませんが、新規作成・編集時に選択できなくなります。`)){W("カテゴリ削除中...");try{const{error:t}=await B.from("event_categories").delete().eq("id",e);if(t)throw t;await be()}catch(t){alert("削除エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{G()}}};window.renameCategoryAdmin=async function(e,t){const n=prompt("新しいカテゴリ名を入力してください:",t);if(!(!n||n.trim()===""||n===t)){W("カテゴリ名称変更中...");try{const{error:a}=await B.from("event_categories").update({name:n.trim()}).eq("id",e);if(a)throw a;await be()}catch(a){alert("変更エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{G()}}};window.updateCategoryColorAdmin=async function(e,t){W("カテゴリ色変更中...");try{const{error:n}=await B.from("event_categories").update({color:t}).eq("id",e);if(n)throw n;await be()}catch(n){alert("変更エラー: "+(n.message==="Load failed"||n.message==="Failed to fetch"?"通信に失敗しました。":n.message))}finally{G()}};window.updateGroupColorAdmin=async function(e,t){W("グループ色変更中...");try{const{error:n}=await B.from("groups").update({color:t}).eq("id",e);if(n)throw n;await be()}catch(n){alert("色変更エラー: "+(n.message==="Load failed"||n.message==="Failed to fetch"?"通信に失敗しました。":n.message))}finally{G()}};window.saveNewGroupAdmin=async function(){var n;const e=document.getElementById("admin-new-group-name").value.trim(),t=((n=document.getElementById("admin-new-group-color"))==null?void 0:n.value)||"#d1fae5";if(!e)return alert("グループ名を入力してください");W("グループ追加中...");try{const{error:a}=await B.from("groups").insert([{name:e,color:t}]);if(a)throw a;await be()}catch(a){alert("追加エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{G()}};window.deleteGroupAdmin=async function(e){if(confirm(`このグループを削除しますか？
※関連する出欠データやメンバー設定にも影響が出る可能性があります。`)){W("グループ削除中...");try{const{error:t}=await B.from("groups").delete().eq("id",e);if(t)throw t;await be()}catch(t){alert("削除エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{G()}}};window.renameGroupAdmin=async function(e,t){const n=prompt("新しいグループ名を入力してください:",t);if(!(!n||n.trim()===""||n===t)){W("グループ名称変更中...");try{const{error:a}=await B.from("groups").update({name:n.trim()}).eq("id",e);if(a)throw a;await be()}catch(a){alert("変更エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{G()}}};window.saveNewLocationAdmin=async function(){const e=document.getElementById("admin-new-location-name").value.trim(),t=document.getElementById("admin-new-location-url").value.trim();if(!e)return alert("場所名を入力してください");W("場所追加中...");try{const{error:n}=await B.from("event_locations").insert([{name:e,url:t||null}]);if(n)throw n;await be()}catch(n){alert("追加エラー: "+(n.message==="Load failed"||n.message==="Failed to fetch"?"通信に失敗しました。":n.message))}finally{G()}};window.deleteLocationAdmin=async function(e){if(confirm(`この場所をマスタから削除しますか？
※既存の予定データ内の場所テキスト自体は削除されません。`)){W("場所削除中...");try{const{error:t}=await B.from("event_locations").delete().eq("id",e);if(t)throw t;await be()}catch(t){alert("削除エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{G()}}};window.renameLocationAdmin=async function(e){W("場所データ読み込み中...");try{const{data:t,error:n}=await B.from("event_locations").select("*").eq("id",e).single();if(n)throw n;const a=document.getElementById("admin-edit-location-modal");a&&a.remove();const s=t.name||"",r=t.url||"",o=`
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
        `;document.body.insertAdjacentHTML("beforeend",o)}catch(t){alert("読み込みエラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{G()}};window.saveLocationEditAdmin=async function(e){const t=document.getElementById("edit-location-name").value.trim(),n=document.getElementById("edit-location-url").value.trim();if(t==="")return alert("場所の名前は必須項目です。");W("場所マスタ更新中...");try{const{error:a}=await B.from("event_locations").update({name:t,url:n||null}).eq("id",e);if(a)throw a;const s=document.getElementById("admin-edit-location-modal");s&&s.remove(),await be()}catch(a){alert("更新エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{G()}};function Da(e,t,n){const a=document.getElementById(e);if(!a)return;let s=null;Array.from(a.children).forEach(r=>{r.setAttribute("draggable","true"),r.classList.add("cursor-move","select-none"),r.addEventListener("dragstart",o=>{s=r,o.dataTransfer.effectAllowed="move",r.classList.add("opacity-50")}),r.addEventListener("dragover",o=>{o.preventDefault(),o.dataTransfer.dropEffect="move";const i=o.target.closest('[draggable="true"]');if(i&&i!==s&&i.parentNode===a){const d=i.getBoundingClientRect(),l=(o.clientY-d.top)/(d.bottom-d.top)>.5;a.insertBefore(s,l?i.nextSibling:i)}}),r.addEventListener("dragend",async()=>{r.classList.remove("opacity-50"),s=null;const i=Array.from(a.children).map((d,l)=>{const c=d.dataset.id;return B.from(t).update({sort_order:l}).eq("id",c)});W("順序を保存中...");try{await Promise.all(i),n&&await n()}catch(d){console.error("Sort order save error:",d),alert("順序の保存に失敗しました。")}finally{G()}})})}function Ml(){const e=document.getElementById("allowed-users-list");if(!e)return;if((localStorage.getItem("admin_users_sort")||"created_desc")!=="manual"){Array.from(e.children).forEach(a=>{a.removeAttribute("draggable"),a.classList.remove("cursor-move","select-none");const s=a.querySelector(".user-drag-handle");s&&(s.style.display="none")});return}let n=null;Array.from(e.children).forEach(a=>{const s=a.querySelector(".user-drag-handle");s?(s.style.display="flex",s.addEventListener("mousedown",()=>{a.setAttribute("draggable","true")}),s.addEventListener("mouseup",()=>{a.removeAttribute("draggable")})):a.setAttribute("draggable","true"),a.addEventListener("dragstart",r=>{if(a.getAttribute("draggable")!=="true"){r.preventDefault();return}n=a,r.dataTransfer.effectAllowed="move",a.classList.add("opacity-50")}),a.addEventListener("dragover",r=>{r.preventDefault(),r.dataTransfer.dropEffect="move";const o=r.target.closest(".user-admin-card");if(o&&o!==n&&o.parentNode===e){const i=o.getBoundingClientRect(),d=(r.clientY-i.top)/(i.bottom-i.top)>.5;e.insertBefore(n,d?o.nextSibling:o)}}),a.addEventListener("dragend",()=>{a.classList.remove("opacity-50"),a.removeAttribute("draggable"),n=null;const o=Array.from(e.children).map(i=>i.getAttribute("data-email")).filter(Boolean);localStorage.setItem("admin_users_manual_order",JSON.stringify(o))})})}window.saveNewUserAttributeAdmin=async function(){const e=document.getElementById("admin-new-attribute-name").value.trim();if(!e)return alert("属性名を入力してください");W("属性追加中...");try{const{error:t}=await B.from("user_attributes").insert([{name:e}]);if(t)throw t;await be()}catch(t){alert("追加エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{G()}};window.deleteUserAttributeAdmin=async function(e){if(confirm(`この属性を削除しますか？
※ユーザーに設定されている属性は解除されます。`)){W("属性削除中...");try{const{error:t}=await B.from("user_attributes").delete().eq("id",e);if(t)throw t;await be()}catch(t){alert("削除エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{G()}}};window.renameUserAttributeAdmin=async function(e,t){const n=prompt("新しい属性名を入力してください:",t);if(!(!n||n.trim()===""||n===t)){W("属性名称変更中...");try{const{error:a}=await B.from("user_attributes").update({name:n.trim()}).eq("id",e);if(a)throw a;await be()}catch(a){alert("変更エラー: "+(a.message==="Load failed"||a.message==="Failed to fetch"?"通信に失敗しました。":a.message))}finally{G()}}};window.approveRequest=async function(e,t){W("申請承認中...");try{const{data:n}=await B.from("signup_requests").select("parent_name, player_name").eq("id",e).single(),a=n?`${n.parent_name} (${n.player_name})`:"";await B.from("app_users").insert([{email:t,role:"user",name:a}]),await B.from("signup_requests").update({status:"approved"}).eq("id",e);try{const{error:s}=await B.auth.resetPasswordForEmail(t,{redirectTo:window.location.origin});s&&(console.warn("Auto password reset email failed (rate limit):",s.message),alert(`メンバー承認は完了しました！

※ただし、Supabaseのメール送信制限（レートリミット等）により、パスワード設定案内メールの自動送信に失敗しました（エラー: `+s.message+`）。

お手数ですが、ログイン画面の『パスワードを忘れた場合』からユーザー自身で再設定を行っていただくよう案内するか、時間をおいてメンバーリストの『PWリセット送信』から再送信してください。`))}catch(s){console.error("Auto password reset email exception:",s)}await be()}catch(n){console.error(n),alert("承認エラー: "+(n.message==="Load failed"||n.message==="Failed to fetch"?"通信に失敗しました。":n.message))}finally{G()}};window.rejectRequest=async function(e){if(confirm("この申請を拒否しますか？")){W("申請拒否中...");try{await B.from("signup_requests").update({status:"rejected"}).eq("id",e),await be()}catch(t){console.error(t),alert("拒否エラー: "+(t.message==="Load failed"||t.message==="Failed to fetch"?"通信に失敗しました。":t.message))}finally{G()}}};const ne={initMasterData:async()=>Me(async()=>{const{data:e,error:t}=await B.from("master_data").select("*");if(t)throw t;if(we=[],_e=[],e){const n=e.find(s=>s.key==="FAMILIES"),a=e.find(s=>s.key==="CARS");n&&(we=n.data||[]),a&&(_e=a.data||[])}},"マスターデータ初期化中..."),getAllFamilies:async()=>we,getFamily:async e=>we.find(t=>t.familyName===e),addFamily:e=>{we.push(e)},updateFamily:e=>{const t=we.findIndex(n=>n.familyName===e.familyName);t>-1&&(we[t]=e)},deleteFamily:e=>{we=we.filter(t=>t.familyName!==e)},bulkAddFamilies:e=>{we=e},getAllCars:async()=>_e,getCar:async e=>_e.find(t=>t.id===e),addCar:e=>{_e.push(e)},updateCar:e=>{const t=_e.findIndex(n=>n.id===e.id);t>-1&&(_e[t]=e)},deleteCar:e=>{_e=_e.filter(t=>t.id!==e)},bulkAddCars:e=>{_e=e},syncMaster:async()=>Me(async()=>{const{error:e}=await B.from("master_data").upsert([{key:"FAMILIES",data:we},{key:"CARS",data:_e}]);if(e)throw e;await fe("UPDATE_MASTER","初期データ(または強制)のマスター保存を実行しました")},"マスターデータ同期中..."),saveState:async(e,t)=>Me(async()=>{const n=Date.now().toString(),{error:a}=await B.from("states").insert({id:n,name:t,created_at:Date.now(),state_data:e});if(a)throw a;return await fe("SAVE_DISPATCH",`配車データ「${t}」を保存しました`),!0},"配車状態を保存中..."),getAllSavedStates:async()=>Me(async()=>{const{data:e,error:t}=await B.from("states").select("*").order("created_at",{ascending:!1});if(t)throw t;return e.map(n=>({id:n.id,name:n.name,timestamp:n.created_at,state:n.state_data}))},"配車状態一覧を取得中..."),getState:async e=>Me(async()=>{const{data:t,error:n}=await B.from("states").select("*").eq("id",e).single();if(n)throw n;return t?{id:t.id,name:t.name,timestamp:t.created_at,state:t.state_data}:null},"配車状態を取得中..."),deleteState:async e=>Me(async()=>{const{error:t}=await B.from("states").delete().eq("id",e);if(t)throw t;return await fe("DELETE_DISPATCH",`配車データ(ID:${e})を削除しました`),!0},"配車状態を削除中..."),saveParking:async(e,t)=>Me(async()=>{const n="p"+Date.now()+Math.floor(Math.random()*1e3),{error:a}=await B.from("parkings").insert({id:n,name:t,created_at:Date.now(),parking_data:e});if(a)throw a;return await fe("SAVE_PARKING",`駐車場データ「${t}」を保存しました`),!0},"駐車場データを保存中..."),getAllSavedParking:async()=>Me(async()=>{const{data:e,error:t}=await B.from("parkings").select("*").order("created_at",{ascending:!1});if(t)throw t;return e.map(n=>({id:n.id,name:n.name,timestamp:n.created_at,parking:n.parking_data}))},"駐車場データ一覧を取得中..."),getParking:async e=>Me(async()=>{const{data:t,error:n}=await B.from("parkings").select("*").eq("id",e).single();if(n)throw n;return t?{id:t.id,name:t.name,timestamp:t.created_at,parking:t.parking_data}:null},"駐車場データを取得中..."),updateParking:async e=>Me(async()=>{const{error:t}=await B.from("parkings").update({name:e.name,parking_data:e.parking}).eq("id",e.id);if(t)throw t;return!0},"駐車場データを更新中..."),deleteParking:async e=>Me(async()=>{const{error:t}=await B.from("parkings").delete().eq("id",e);if(t)throw t;return await fe("DELETE_PARKING",`駐車場データ(ID:${e})を削除しました`),!0},"駐車場データを削除中..."),addParkingMaster:(e,t)=>{pt.push({id:"p"+Date.now()+Math.floor(Math.random()*1e3),name:t,timestamp:Date.now(),parking:e,isNew:!0})},updateParkingMaster:e=>{const t=pt.findIndex(n=>n.id===e.id);t>-1&&(pt[t]=e,pt[t].isModified=!0)},deleteParkingMaster:e=>{const t=pt.find(n=>n.id===e);t&&!t.isNew&&fa.add(e),pt=pt.filter(n=>n.id!==e)},syncAllMaster:async()=>Me(async()=>{const{error:e}=await B.from("master_data").upsert([{key:"FAMILIES",data:we},{key:"CARS",data:_e}]);if(e)throw e;for(const t of fa)await B.from("parkings").delete().eq("id",t);fa.clear();for(const t of pt)if(t.isNew||t.isModified){const{error:n}=await B.from("parkings").upsert({id:t.id,name:t.name,created_at:t.timestamp,parking_data:t.parking});if(n)throw n;t.isNew=!1,t.isModified=!1}await fe("UPDATE_MASTER","マスターデータ(家族・車・駐車場)を一括保存しました")},"マスターデータ一括同期中..."),clearDatabase:async()=>Me(async()=>{we=[],_e=[],await B.from("master_data").delete().neq("key",""),await B.from("states").delete().neq("id",""),await B.from("parkings").delete().neq("id",""),await fe("CLEAR_DB","データベースの全リセットを実行しました")},"データベース初期化中...")},Rl=[{familyName:"山田家",order:1,members:[{id:"p1",name:"太郎",type:"選手",isFlagTarget:!0,data:{grade:"5年",school:"A小",other:"",memo:""}},{id:"p2",name:"山田父",type:"保護者",data:{memo:""}}]},{familyName:"佐藤家",order:2,members:[{id:"p3",name:"次郎",type:"選手",isFlagTarget:!0,data:{grade:"5年",school:"B小",other:"",memo:""}},{id:"p4",name:"佐藤母",type:"保護者",data:{memo:""}}]},{familyName:"スタッフ・個人",order:99,members:[{id:"p99",name:"監督",type:"その他",data:{memo:""}}]}],Ol=[{id:"c1",name:"山田カー",familyName:"山田家",baseCapacity:6,order:1},{id:"c2",name:"佐藤カー",familyName:"佐藤家",baseCapacity:5,order:2}];let hn=[],Xa=[],ls=[],xn=new Set,vn=new Set,Xt=new Map,mn=new Set,Dt=new Set,Nt=new Map,Ce={groundName:"",designated:{name:"",limit:0,memo:""},other:{name:"",memo:""}},Ze={date:"",name:"",timeline:"",notes:""},de=[],Gt={car:null,seat:null},Es=null,_s=null;const zs=3,Ke=document.getElementById("nav-dispatch"),Qe=document.getElementById("nav-master"),Vn=document.getElementById("view-dispatch"),Gn=document.getElementById("view-master"),vt=document.getElementById("participant-list"),kn=document.getElementById("car-list"),Ln=document.getElementById("exclusion-list"),Is=document.getElementById("results");document.getElementById("text-output");const At=document.getElementById("family-list"),Jt=document.getElementById("car-list-master"),rn=document.getElementById("parking-list-master");function Vr(){const e=document.getElementById("results-section"),t=document.getElementById("main-content");t&&(t.style.display="grid",t.style.gap="1.5rem",window.innerWidth>=768?(t.style.gridTemplateColumns=`repeat(${zs}, minmax(0, 1fr))`,e&&(e.style.gridColumn=`span ${zs}`)):(t.style.gridTemplateColumns="repeat(1, minmax(0, 1fr))",e&&(e.style.gridColumn="auto")))}async function Gr(){hn=await ne.getAllFamilies(),Xa=await ne.getAllCars(),ls=hn.flatMap(e=>e.members),No(),cs(),us(),Sa(),await pr(),await fr()}async function Fl(){pt=await ne.getAllSavedParking()||[],fa.clear(),Bn(),sa(),ps()}async function xa(){const e=document.getElementById("btn-load-logs");if(e&&!document.getElementById("btn-download-logs-csv")){const s=document.createElement("button");s.id="btn-download-logs-csv",s.className="ml-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-bold shadow",s.textContent="CSVダウンロード",s.onclick=Hl,e.parentNode.insertBefore(s,e.nextSibling)}try{const s=new Date;s.setMonth(s.getMonth()-6),await B.from("action_logs").delete().lt("created_at",s.toISOString())}catch(s){console.error("Log rotation error:",s)}e&&(e.textContent="読込中...");const{data:t,error:n}=await B.from("action_logs").select("*").order("created_at",{ascending:!1}).limit(50);if(e&&(e.textContent="最新を読み込み"),n){console.error("Failed to load logs:",n);return}const a=document.getElementById("log-list");if(a){if(!t||t.length===0){a.innerHTML='<p class="text-gray-500 text-center py-4">ログはありません</p>';return}a.innerHTML=t.map(s=>`
        <div class="border-b border-gray-100 py-2 flex flex-col md:flex-row md:items-center">
            <span class="font-mono text-gray-500 text-xs w-32 shrink-0">${new Date(s.created_at).toLocaleString("ja-JP",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"})}</span>
            <span class="text-blue-600 font-semibold text-xs w-28 shrink-0">${s.action_type}</span>
            <span class="flex-grow text-gray-700 truncate pr-2" title="${s.details}">${s.details}</span>
            <span class="text-gray-400 text-xs text-right w-40 shrink-0 truncate" title="${s.user_email}">${s.user_email}</span>
        </div>
        `).join("")}}async function Hl(){W("ログ取得中...");try{const{data:e,error:t}=await B.from("action_logs").select("*").order("created_at",{ascending:!1}).limit(1e4);if(t)throw t;if(!e||e.length===0)return alert("ログデータがありません");const n=[["日時","アクション","ユーザー","詳細"]];e.forEach(i=>{const d=new Date(i.created_at).toLocaleString("ja-JP"),l=c=>`"${String(c||"").replace(/"/g,'""')}"`;n.push([l(d),l(i.action_type),l(i.user_email),l(i.details)])});const a=new Uint8Array([239,187,191]),s=new Blob([a,n.map(i=>i.join(",")).join(`
`)],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(s),o=document.createElement("a");o.href=r,o.download=`action_logs_${new Date().toISOString().split("T")[0]}.csv`,o.click(),URL.revokeObjectURL(r)}catch(e){console.error(e),alert("CSVの作成に失敗しました: "+e.message)}finally{G()}}function ql(){var e,t,n,a,s,r,o,i,d,l,c,u,f,g,y;vt==null||vt.addEventListener("change",jl),vt==null||vt.addEventListener("input",Vl),vt==null||vt.addEventListener("click",Ul),kn==null||kn.addEventListener("change",Gl),Ln==null||Ln.addEventListener("change",zl),(e=document.getElementById("assign-button"))==null||e.addEventListener("click",Wl),(t=document.getElementById("dispatch-message-close"))==null||t.addEventListener("click",gr),Is==null||Is.addEventListener("change",Yl),(n=document.getElementById("export-state-button"))==null||n.addEventListener("click",Zl),(a=document.getElementById("import-state-input"))==null||a.addEventListener("change",Xl),(s=document.getElementById("show-text-output-button"))==null||s.addEventListener("click",()=>{var b;(b=document.getElementById("text-output-container"))==null||b.classList.toggle("hidden"),ka()}),(r=document.getElementById("copy-text-output-button"))==null||r.addEventListener("click",Kl),(o=document.getElementById("toggle-details-button"))==null||o.addEventListener("click",Ql),(i=document.getElementById("save-state-db-button"))==null||i.addEventListener("click",ec),(d=document.getElementById("load-state-db-button"))==null||d.addEventListener("click",tc),(l=document.getElementById("delete-state-db-button"))==null||l.addEventListener("click",nc),(c=document.getElementById("save-parking-db-button"))==null||c.addEventListener("click",ac),(u=document.getElementById("load-parking-db-button"))==null||u.addEventListener("click",sc),(f=document.getElementById("delete-parking-db-button"))==null||f.addEventListener("click",rc),(g=document.getElementById("clear-db-button"))==null||g.addEventListener("click",oc),(y=document.getElementById("btn-clear-inputs"))==null||y.addEventListener("click",window.clearCurrentInputs)}function No(){Nt.clear(),hn.forEach(e=>{e.members.forEach(t=>{const n={grade:"",school:"",other:"",memo:"",...t.data||{}};t.isFlagTarget||(n.grade="",n.school="",n.other=""),Nt.set(t.id,n)})})}function cs(){if(vt){if(vt.innerHTML="",hn.length===0)return vt.innerHTML='<p class="text-gray-500">データなし</p>';hn.forEach(e=>{const t=document.createElement("details");t.className="bg-gray-50 rounded border",t.open=!0;const n=document.createElement("summary");n.className="p-3 cursor-pointer select-none flex justify-between items-center",n.innerHTML=`<span class="font-semibold">${e.familyName}</span><div class="space-x-1"><button data-family-id="${e.familyName}" data-check-action="check" class="text-xs bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded">全員参加</button><button data-family-id="${e.familyName}" data-check-action="uncheck" class="text-xs bg-gray-400 hover:bg-gray-500 text-white py-1 px-2 rounded">全員不参加</button></div>`;const a=document.createElement("div");a.className="p-3 border-t border-gray-200 space-y-3",e.members.forEach(s=>{const r=xn.has(s.id),o=Nt.get(s.id)||{grade:"",school:"",other:"",memo:""};let i=s.isFlagTarget?`<input type="text" data-id="${s.id}" data-type="grade" value="${o.grade}" placeholder="学年" class="w-full text-sm p-1 border rounded" ${r?"":"disabled"}>
                 <input type="text" data-id="${s.id}" data-type="school" value="${o.school}" placeholder="学校" class="w-full text-sm p-1 border rounded" ${r?"":"disabled"}>
                 <input type="text" data-id="${s.id}" data-type="other" value="${o.other}" placeholder="その他" class="w-full text-sm p-1 border rounded" ${r?"":"disabled"}>
                 <input type="text" data-id="${s.id}" data-type="memo" value="${o.memo}" placeholder="備考" class="w-full text-sm p-1 border rounded" ${r?"":"disabled"}>`:`<div class="col-span-3"></div><input type="text" data-id="${s.id}" data-type="memo" value="${o.memo}" placeholder="備考" class="w-full text-sm p-1 border rounded" ${r?"":"disabled"}`;a.innerHTML+=`<div class="ml-4"><div class="flex items-center"><input type="checkbox" id="p-${s.id}" data-id="${s.id}" data-action="select-participant" class="mr-3 rounded border-gray-300 text-blue-600" ${r?"checked":""}><label for="p-${s.id}">${s.name} (${s.type})</label></div><div id="data-inputs-${s.id}" class="ml-8 mt-1.5 grid grid-cols-4 gap-2 ${r?"":"opacity-50"}">${i}</div></div>`}),t.appendChild(n),t.appendChild(a),vt.appendChild(t)})}}function Ul(e){const t=e.target.closest("button[data-check-action]");if(!t)return;e.preventDefault();const n=t.dataset.checkAction==="check",a=hn.find(s=>s.familyName===t.dataset.familyId);a&&a.members.forEach(s=>{const r=document.getElementById(`p-${s.id}`);r&&r.checked!==n&&(r.checked=n,r.dispatchEvent(new Event("change",{bubbles:!0})))})}function us(){if(kn){if(kn.innerHTML="",Xa.length===0)return kn.innerHTML='<p class="text-gray-500">データなし</p>';Xa.forEach(e=>{const t=hn.find(i=>i.familyName===e.familyName),n=(t?t.members:ls).filter(i=>i.type!=="選手"&&i.type!=="兄弟"),a=vn.has(e.id);let s="";if(t){const i=n.find(l=>l.type==="保護者"&&(l.name.includes("父")||l.name.includes("監督"))),d=n.find(l=>l.type==="保護者"&&l.name.includes("母"));s=i?i.id:d?d.id:""}const r=Xt.get(e.id)||s;s&&!Xt.has(e.id)&&Xt.set(e.id,s);const o=mn.has(e.id);kn.innerHTML+=`<div class="bg-gray-50 rounded border p-3" data-car-id="${e.id}">
            <div class="flex items-center"><input type="checkbox" id="c-${e.id}" data-id="${e.id}" data-action="select-car" class="mr-3 rounded text-blue-600" ${a?"checked":""}><label for="c-${e.id}" class="font-semibold">${e.name} (定員${e.baseCapacity}名)</label></div>
            <div id="car-options-${e.id}" class="ml-8 mt-3 space-y-3 ${a?"":"hidden"}">
                <select id="driver-${e.id}" data-action="select-driver" class="w-full p-2 border rounded text-sm"><option value="">ドライバー選択...</option>${n.map(i=>`<option value="${i.id}" ${r===i.id?"selected":""}>${i.name}</option>`).join("")}</select>
                <label class="flex items-center"><input type="checkbox" data-action="select-luggage" class="mr-2" ${o?"checked":""}>荷物あり(2名制限)</label>
            </div></div>`})}}function Sa(){if(!Ln)return;Ln.innerHTML="";const e=ls.filter(t=>xn.has(t.id));if(e.length===0)return Ln.innerHTML='<p class="text-gray-500 text-sm">参加者を選択してください</p>';e.forEach(t=>{Ln.innerHTML+=`<div class="flex items-center"><input type="checkbox" id="ex-${t.id}" data-id="${t.id}" data-action="exclude-participant" class="mr-3" ${Dt.has(t.id)?"checked":""}><label for="ex-${t.id}">${t.name} (${t.type})</label></div>`})}function jl(e){const t=e.target;if(t.dataset.action==="select-participant"){const n=t.dataset.id,a=document.getElementById(`data-inputs-${n}`);t.checked?(xn.add(n),a&&(a.classList.remove("opacity-50"),a.querySelectorAll("input").forEach(s=>s.disabled=!1))):(xn.delete(n),Dt.delete(n),a&&(a.classList.add("opacity-50"),a.querySelectorAll("input").forEach(s=>s.disabled=!0))),Sa()}}function Vl(e){const t=e.target;if(t.dataset.type){const n=Nt.get(t.dataset.id);n[t.dataset.type]=t.value,Nt.set(t.dataset.id,n)}}function Gl(e){var a;const t=e.target,n=(a=t.closest("[data-car-id]"))==null?void 0:a.dataset.carId;n&&(t.dataset.action==="select-car"?t.checked?(vn.add(n),document.getElementById(`car-options-${n}`).classList.remove("hidden")):(vn.delete(n),mn.delete(n),document.getElementById(`car-options-${n}`).classList.add("hidden")):t.dataset.action==="select-driver"?t.value?Xt.set(n,t.value):Xt.delete(n):t.dataset.action==="select-luggage"&&(t.checked?mn.add(n):mn.delete(n)))}function zl(e){const t=e.target;t.dataset.action==="exclude-participant"&&(t.checked?Dt.add(t.dataset.id):Dt.delete(t.dataset.id))}function Wl(){var b,p,m,h,_,I,k,S,$,E;if(vn.size===0)return ht("車を選択してください","error");Ze={date:((b=document.getElementById("event-date"))==null?void 0:b.value)||"",name:((p=document.getElementById("event-name"))==null?void 0:p.value)||"",timeline:((m=document.getElementById("event-timeline"))==null?void 0:m.value)||"",notes:((h=document.getElementById("event-notes"))==null?void 0:h.value)||""},Ce={groundName:((_=document.getElementById("ground-name"))==null?void 0:_.value)||"",designated:{name:((I=document.getElementById("parking-designated-name"))==null?void 0:I.value)||"指定駐車場",limit:parseInt((k=document.getElementById("parking-designated-limit"))==null?void 0:k.value)||999,memo:((S=document.getElementById("parking-designated-memo"))==null?void 0:S.value)||""},other:{name:(($=document.getElementById("parking-other-name"))==null?void 0:$.value)||"指定以外",memo:((E=document.getElementById("parking-other-memo"))==null?void 0:E.value)||""}};let e=!1;if(de&&de.length>0&&de.some(w=>w.id!=="excluded-car")){if(confirm(`すでに配車結果が存在します。
現在の配車状態を【維持】して、追加・変更分のみを反映しますか？
（「キャンセル」を選ぶと、全てリセットして最初からやり直すか確認します）`))e=!0;else if(!confirm(`現在の状態を【全てリセット】して、最初から割り当てをやり直しますか？
（キャンセルを選ぶと処理を中断します）`))return}let t=[],n=new Map,a=[];const s=ls.filter(w=>xn.has(w.id)).map(w=>{const x=hn.find(A=>A.members.some(P=>P.id===w.id)),v=Nt.get(w.id)||{};return{...w,grade:v.grade,school:v.school,other:v.other,memo:v.memo,familyName:x?x.familyName:null}});if(vn.forEach(w=>{const x=Xt.get(w),v=Xa.find(N=>N.id===w);if(!v)return;if(!x)return t.push(`${v.name}のドライバー未選択`);const A=s.find(N=>N.id===x);if(!A)return t.push(`${v.name}のドライバーが参加者にいません`);n.set(w,A);const P=mn.has(w);a.push({id:w,name:v.name,familyName:v.familyName,baseCapacity:P?2:v.baseCapacity,driverId:x,capacity:P?1:v.baseCapacity-1,hasLuggage:P})}),t.length>0)return ht(t.join("<br>"),"error");const r=new Set(Array.from(n.values()).map(w=>w.id));let o=s.filter(w=>Dt.has(w.id)&&!r.has(w.id)),i=[];e?a.forEach(w=>{let x=de.find(A=>A.id===w.id),v=[];x&&(v=x.members.filter(A=>{if(!A)return!1;let P=s.some(F=>F.id===A.id),N=Dt.has(A.id),D=r.has(A.id);return P&&!N&&!D}),v.length>w.capacity&&(v=v.slice(0,w.capacity))),i.push({...w,driver:n.get(w.id),members:v})}):i=a.map(w=>({...w,driver:n.get(w.id),members:[]}));let d=new Set(r);i.forEach(w=>w.members.forEach(x=>{x&&d.add(x.id)}));let l=s.filter(w=>!d.has(w.id)&&!Dt.has(w.id));i.reduce((w,x)=>w+x.capacity,0),i.reduce((w,x)=>w+x.members.length,0);let c=[...l];const u={保護者:1,兄弟:2,選手:3,その他:4};i.forEach(w=>{w.driver&&w.familyName&&c.filter(v=>v.familyName===w.familyName).sort((v,A)=>(u[v.type]||9)-(u[A.type]||9)).forEach(v=>{w.members.length<w.capacity&&(w.members.push(v),c=c.filter(A=>A.id!==v.id))})}),c.sort((w,x)=>w.isFlagTarget===x.isFlagTarget?Math.random()-.5:w.isFlagTarget?-1:1).forEach(w=>{let x=[],v=0;if(i.forEach(A=>{if(A.members.length>=A.capacity)return;let P=A.members.filter(N=>N).reduce((N,D)=>N+(D.isFlagTarget&&w.isFlagTarget?(w.grade===D.grade?1:0)+(w.school===D.school?1:0):0),0);P>v?(v=P,x=[A]):P===v&&x.push(A)}),x.length>0)x[Math.floor(Math.random()*x.length)].members.push(w);else{let A=i.filter(P=>P.members.length<P.capacity);A.length>0&&A[0].members.push(w)}}),i.forEach(w=>{for(w.members=w.members.filter(x=>x);w.members.length<w.capacity;)w.members.push(null)}),e?i.sort((w,x)=>{let v=de.findIndex(P=>P.id===w.id),A=de.findIndex(P=>P.id===x.id);return v!==-1&&A!==-1?v-A:v!==-1?-1:A!==-1?1:x.members.filter(P=>P&&P.type==="選手").length-w.members.filter(P=>P&&P.type==="選手").length}):i.sort((w,x)=>x.members.filter(v=>v&&v.type==="選手").length-w.members.filter(v=>v&&v.type==="選手").length);let f=0;i.forEach(w=>{if(e){let x=de.find(v=>v.id===w.id);x?(w.assignedParking=x.assignedParking,w.assignedParking==="designated"&&f++):f<Ce.designated.limit?(w.assignedParking="designated",f++):w.assignedParking="other"}else f<Ce.designated.limit?(w.assignedParking="designated",f++):w.assignedParking="other"});const g=new Set(r);i.forEach(w=>{w.members.forEach(x=>{x&&g.add(x.id)})}),s.filter(w=>!g.has(w.id)&&!Dt.has(w.id)).forEach(w=>{o.some(x=>x.id===w.id)||o.push(w)}),i.push({id:"excluded-car",name:"別便",capacity:999,baseCapacity:999,driver:null,members:o,hasLuggage:!1,assignedParking:"excluded"}),de=i,ms(),ka()}function ms(){const e=document.getElementById("results");if(!e)return;if(e.innerHTML="",Gt={car:null,seat:null},de.length===0){e.innerHTML='<p class="text-gray-500 bg-white p-4 rounded shadow">結果なし</p>',zr();return}(Ze.name||Ze.date)&&(e.innerHTML+=`<h2 class="text-2xl font-bold mb-2">${Ze.date} ${Ze.name} ${Ce.groundName?`@${Ce.groundName}`:""}</h2>`);const t=de.filter(r=>r.assignedParking==="designated"),n=de.filter(r=>r.assignedParking==="other"),a=de.filter(r=>r.id==="excluded-car"),s=(r,o,i)=>`<div class="bg-white rounded shadow p-4"><h3 class="font-bold text-lg mb-2">◆${o.name||"別便"} ${r==="designated"&&o.limit<999?`(${o.limit}台)`:""}</h3><p class="text-sm text-gray-600 mb-4 whitespace-pre-line">${o.memo}</p><div class="grid grid-cols-1 md:grid-cols-3 gap-4">${i.map(Jl).join("")}</div></div>`;e.innerHTML+=s("designated",Ce.designated,t),e.innerHTML+=s("other",Ce.other,n),a[0].members.length>0&&(e.innerHTML+=s("excluded",{name:"別便",memo:""},a)),zr()}function Jl(e){var r,o;`${e.id}`;let t="",n="",a="";const s=`swap-car-${e.id}`;if(e.id==="excluded-car"){t=`<div class="p-4 border-b bg-gray-100 flex-shrink-0"><h4 class="font-bold text-lg text-gray-700">合計: ${e.members.length}名</h4></div>`,a=e.members.map((d,l)=>{var g;if(!d)return"";const c=(((g=Nt.get(d.id))==null?void 0:g.memo)||"").trim(),u=d.isFlagTarget&&(d.grade||d.school||d.other)?[d.grade,d.school,d.other].filter(Boolean).join(" "):"",f=`seat-${e.id}-${d.id}`;return`<li class="p-2 bg-gray-100 rounded shadow-sm flex items-center justify-between">
                        <div class="flex items-center min-w-0">
                            <input type="checkbox" id="${f}" data-swap-type="seat" data-car-id="${e.id}" data-participant-id="${d.id}" data-is-driver="false" data-slot-index="${l}" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                            <label for="${f}" class="flex flex-col min-w-0">
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
            </div>`;const u=e.driver,f=u?u.id:"empty",g=u?`[D] ${u.name} (${u.type})`:"ドライバー空席",y=u&&(((r=Nt.get(u.id))==null?void 0:r.memo)||"").trim(),b=`seat-${e.id}-driver`;n=`
        <div id="driver-dropzone-${e.id}" class="p-4 border-b driver-dropzone flex-shrink-0">
            <li class="p-2 ${u?"bg-blue-100":"bg-red-50"} rounded shadow-sm flex items-center">
                 <input type="checkbox" id="${b}" data-swap-type="seat" data-car-id="${e.id}" data-participant-id="${f}" data-is-driver="true" data-slot-index="-1" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                 <label for="${b}" class="flex flex-col min-w-0 ${u?"text-blue-800":"text-red-700"}">
                    <span class="font-semibold break-words">${g}</span>
                    ${y?`<span class="text-xs ${u?"text-blue-600":"text-red-600"} ml-2 break-words">[${y}]</span>`:""}
                 </label>
            </li>
        </div>`;for(let p=0;p<e.capacity;p++){const m=e.members[p];if(m){const h=(((o=Nt.get(m.id))==null?void 0:o.memo)||"").trim(),_=m.isFlagTarget&&(m.grade||m.school||m.other)?[m.grade,m.school,m.other].filter(Boolean).join(" "):"",I=`seat-${e.id}-${m.id}`;a+=`<li class="p-2 bg-gray-100 rounded shadow-sm flex items-center justify-between">
                                    <div class="flex items-center min-w-0">
                                        <input type="checkbox" id="${I}" data-swap-type="seat" data-car-id="${e.id}" data-participant-id="${m.id}" data-is-driver="false" data-slot-index="${p}" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                        <label for="${I}" class="flex flex-col min-w-0">
                                            <span class="break-words">${m.name} (${m.type})</span>
                                            ${h?`<span class="text-xs text-gray-500 break-words">[${h}]</span>`:""}
                                        </label>
                                    </div>
                                    <span class="text-xs text-gray-400 ml-2 flex-shrink-0">${_}</span>
                                </li>`}else{const h=`seat-${e.id}-empty-${p}`;a+=`<li class="p-2 bg-gray-50 rounded shadow-sm flex items-center">
                                    <input type="checkbox" id="${h}" data-swap-type="seat" data-car-id="${e.id}" data-participant-id="empty" data-is-driver="false" data-slot-index="${p}" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                    <label for="${h}" class="text-gray-400 italic">-- 空席 --</label>
                                </li>`}}}return`<div class="bg-white border rounded-lg shadow-md car-dropzone flex flex-col">${t}${n}<ul id="members-dropzone-${e.id}" class="p-4 space-y-2 min-h-[50px] members-dropzone flex-grow overflow-y-auto">${a}</ul></div>`}function Yl(e){const t=e.target;if(t.type!=="checkbox"||!t.dataset.swapType)return;const n=t.dataset.swapType;if(Gt[n]&&Gt[n].el===t){Gt[n]=null,t.closest("div").classList.remove("swap-selected");return}const a={carId:t.dataset.carId,pid:t.dataset.participantId,isD:t.dataset.isDriver==="true",idx:parseInt(t.dataset.slotIndex),el:t};if(t.closest("div").classList.add("swap-selected"),n==="car"&&Gt.seat||n==="seat"&&Gt.car)return t.checked=!1,ht("車と席の混在不可","error");if(!Gt[n]){Gt[n]=a;return}const s=Gt[n],r=a;if(n==="car"){const o=de.find(d=>d.id===s.carId),i=de.find(d=>d.id===r.carId);if(o&&i)if(o.assignedParking===i.assignedParking){const d=de.indexOf(o),l=de.indexOf(i);d>-1&&l>-1&&([de[d],de[l]]=[de[l],de[d]])}else{const d=o.assignedParking;o.assignedParking=i.assignedParking,i.assignedParking=d}}else{const o=de.find(c=>c.id===s.carId),i=de.find(c=>c.id===r.carId),d=s.pid==="empty"?null:s.isD?o.driver:o.members[s.idx],l=r.pid==="empty"?null:r.isD?i.driver:i.members[r.idx];s.isD?o.driver=l:o.id!=="excluded-car"?o.members[s.idx]=l:(o.members=o.members.filter(c=>c&&c.id!==(d==null?void 0:d.id)),l&&o.members.push(l)),r.isD?i.driver=d:i.id!=="excluded-car"?i.members[r.idx]=d:(i.members=i.members.filter(c=>c&&c.id!==(l==null?void 0:l.id)),d&&i.members.push(d)),[o,i].forEach(c=>{if(c.id!=="excluded-car")for(c.members=c.members.filter(u=>u);c.members.length<c.capacity;)c.members.push(null);else c.members=c.members.filter(u=>u)})}ms(),ka()}function ka(){const e=document.getElementById("text-output");if(!e)return;if(de.length===0){e.value="";return}const t=Ce.groundName?`@${Ce.groundName}`:"";let n=[`${Ze.date} ${Ze.name}${t}
`];Ze.timeline&&n.push(Ze.timeline+`
`);const a=o=>`${o.name.replace(/の車|家の車/g,"カー")} (${o.driver?o.driver.name:"未定"}, ${o.members.filter(i=>i).map(i=>(i.type==="選手"?"★":"")+i.name).join(", ")}${o.hasLuggage?", 荷物":""})`;n.push(`◆${Ce.designated.name}
${Ce.designated.memo}`),de.filter(o=>o.assignedParking==="designated").forEach(o=>n.push("・"+a(o)));const s=de.filter(o=>o.assignedParking==="other");s.length>0&&(n.push(`
◆${Ce.other.name}
${Ce.other.memo}`),s.forEach(o=>n.push("・"+a(o))));const r=de.find(o=>o.id==="excluded-car");r&&r.members.length>0&&(n.push(`
◆別便`),r.members.filter(o=>o).forEach(o=>n.push("・"+(o.type==="選手"?"★":"")+o.name))),Ze.notes&&n.push(`
◆その他
`+Ze.notes),e.value=n.join(`
`)}function Kl(){const e=document.getElementById("text-output");e&&(navigator.clipboard.writeText(e.value),ht("コピーしました","success"))}function Ql(){const e=document.getElementById("toggle-details-button"),t=e.textContent==="すべて開く";vt.querySelectorAll("details").forEach(n=>n.open=t),e.textContent=t?"すべて閉じる":"すべて開く"}function Po(){var e,t,n,a,s,r,o,i,d,l;return Ze={date:((e=document.getElementById("event-date"))==null?void 0:e.value)||"",name:((t=document.getElementById("event-name"))==null?void 0:t.value)||"",timeline:((n=document.getElementById("event-timeline"))==null?void 0:n.value)||"",notes:((a=document.getElementById("event-notes"))==null?void 0:a.value)||""},Ce={groundName:((s=document.getElementById("ground-name"))==null?void 0:s.value)||"",designated:{name:((r=document.getElementById("parking-designated-name"))==null?void 0:r.value)||"指定駐車場",limit:parseInt((o=document.getElementById("parking-designated-limit"))==null?void 0:o.value)||999,memo:((i=document.getElementById("parking-designated-memo"))==null?void 0:i.value)||""},other:{name:((d=document.getElementById("parking-other-name"))==null?void 0:d.value)||"指定以外",memo:((l=document.getElementById("parking-other-memo"))==null?void 0:l.value)||""}},{selectedParticipantIds:Array.from(xn),selectedCarIds:Array.from(vn),selectedDrivers:Array.from(Xt.entries()),selectedLuggage:Array.from(mn),excludedParticipantIds:Array.from(Dt),participantData:Array.from(Nt.entries()),currentAssignments:de,parkingInfo:Ce,eventInfo:Ze}}function Mo(e){var t,n,a,s,r;xn=new Set(e.selectedParticipantIds||[]),vn=new Set(e.selectedCarIds||[]),Xt=new Map(e.selectedDrivers||[]),mn=new Set(e.selectedLuggage||[]),Dt=new Set(e.excludedParticipantIds||[]),Nt=new Map(e.participantData||[]),Ce=e.parkingInfo||{groundName:"",designated:{name:"",limit:0,memo:""},other:{name:"",memo:""}},Ze=e.eventInfo||{date:"",name:"",timeline:"",notes:""},document.getElementById("event-date")&&(document.getElementById("event-date").value=Ze.date||""),document.getElementById("event-name")&&(document.getElementById("event-name").value=Ze.name||""),document.getElementById("event-timeline")&&(document.getElementById("event-timeline").value=Ze.timeline||""),document.getElementById("event-notes")&&(document.getElementById("event-notes").value=Ze.notes||""),document.getElementById("ground-name")&&(document.getElementById("ground-name").value=Ce.groundName||""),document.getElementById("parking-designated-name")&&(document.getElementById("parking-designated-name").value=((t=Ce.designated)==null?void 0:t.name)||""),document.getElementById("parking-designated-limit")&&(document.getElementById("parking-designated-limit").value=((n=Ce.designated)==null?void 0:n.limit)||""),document.getElementById("parking-designated-memo")&&(document.getElementById("parking-designated-memo").value=((a=Ce.designated)==null?void 0:a.memo)||""),document.getElementById("parking-other-name")&&(document.getElementById("parking-other-name").value=((s=Ce.other)==null?void 0:s.name)||""),document.getElementById("parking-other-memo")&&(document.getElementById("parking-other-memo").value=((r=Ce.other)==null?void 0:r.memo)||""),de=e.currentAssignments||[],ms(),ka()}function Zl(){const e=new Blob([JSON.stringify(Po(),null,2)],{type:"application/json"}),t=document.createElement("a");t.href=URL.createObjectURL(e),t.download="state.json",t.click()}function Xl(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=a=>{Mo(JSON.parse(a.target.result)),cs(),us(),Sa()},n.readAsText(t)}async function ec(){const e=document.getElementById("saved-state-select"),t=e.value;let n=`${document.getElementById("event-date").value}_${document.getElementById("event-name").value}`,a=!1,s=null;if(t){const r=e.options[e.selectedIndex];confirm(`現在「${r.text}」が選択されています。
このデータに上書き保存しますか？
（「キャンセル」を選ぶと新規保存になります）`)&&(a=!0,n=r.text,s=t)}if(!a){const r=prompt("保存名",n);if(!r)return;n=r}try{a&&s&&await ne.deleteState(s),await ne.saveState(Po(),n),await pr();const r=document.getElementById("saved-state-select");for(let o=0;o<r.options.length;o++)if(r.options[o].text===n){r.selectedIndex=o;break}ht(a?"上書き保存しました":"保存しました","success")}catch{ht("保存に失敗しました","error")}}async function tc(){const e=document.getElementById("saved-state-select").value;if(!e)return;const t=await ne.getState(e);t&&(Mo(t.state),cs(),us(),Sa(),ht("読込完了","success"))}async function nc(){const e=document.getElementById("saved-state-select").value;e&&(await ne.deleteState(e),await pr(),ht("削除完了","success"))}async function pr(){const e=await ne.getAllSavedStates(),t=document.getElementById("saved-state-select");t&&(t.innerHTML='<option value="">作業一覧...</option>'+e.map(n=>`<option value="${n.id}">${n.name}</option>`).join(""))}async function ac(){const e=document.getElementById("saved-parking-select"),t=e.value;let n=document.getElementById("ground-name").value||"新規駐車場",a=!1,s=null;if(t){const o=e.options[e.selectedIndex];confirm(`現在「${o.text}」が選択されています。
このデータに上書き保存しますか？
（「キャンセル」を選ぶと新規保存になります）`)&&(a=!0,n=o.text,s=t)}if(!a){const o=prompt("駐車場保存名",n);if(!o)return;n=o}const r={groundName:document.getElementById("ground-name").value,designated:{name:document.getElementById("parking-designated-name").value,limit:parseInt(document.getElementById("parking-designated-limit").value),memo:document.getElementById("parking-designated-memo").value},other:{name:document.getElementById("parking-other-name").value,memo:document.getElementById("parking-other-memo").value}};try{a&&s&&await ne.deleteParking(s),await ne.saveParking(r,n),await fr();const o=document.getElementById("saved-parking-select");for(let i=0;i<o.options.length;i++)if(o.options[i].text===n){o.selectedIndex=i;break}ht(a?"駐車場を上書き保存しました":"駐車場を保存しました","success")}catch{ht("保存に失敗しました","error")}}async function sc(){const e=document.getElementById("saved-parking-select").value;if(!e)return;const t=await ne.getParking(e);t&&(document.getElementById("ground-name").value=t.parking.groundName,document.getElementById("parking-designated-name").value=t.parking.designated.name,document.getElementById("parking-designated-limit").value=t.parking.designated.limit,document.getElementById("parking-designated-memo").value=t.parking.designated.memo,document.getElementById("parking-other-name").value=t.parking.other.name,document.getElementById("parking-other-memo").value=t.parking.other.memo,ht("駐車場読込完了","success"))}async function rc(){const e=document.getElementById("saved-parking-select").value;e&&(await ne.deleteParking(e),await fr(),ht("駐車場削除完了","success"))}async function fr(){const e=await ne.getAllSavedParking(),t=document.getElementById("saved-parking-select");t&&(t.innerHTML='<option value="">駐車場一覧...</option>'+e.map(n=>`<option value="${n.id}">${n.name}</option>`).join(""))}async function oc(){confirm("全データをリセットしますか？")&&(await ne.clearDatabase(),location.reload())}window.clearCurrentInputs=function(){if(!confirm(`現在の入力内容（イベント情報、選択メンバー、車、駐車場、配車結果など）をすべてクリアして、初期状態に戻しますか？
（※データベースに保存されているマスタデータや過去の保存データは削除されません）`))return;const e=document.getElementById("event-date");e&&(e.value="");const t=document.getElementById("event-name");t&&(t.value="");const n=document.getElementById("event-timeline");n&&(n.value="");const a=document.getElementById("event-remarks");a&&(a.value="");const s=document.getElementById("ground-name");s&&(s.value="");const r=document.getElementById("parking-name");r&&(r.value="");const o=document.getElementById("parking-limit");o&&(o.value="99");const i=document.getElementById("parking-remarks");i&&(i.value="");const d=document.getElementById("other-parking-name");d&&(d.value="");const l=document.getElementById("other-parking-remarks");l&&(l.value=""),xn.clear(),vn.clear(),Xt.clear(),mn.clear(),Dt.clear(),Nt.clear(),No(),de=[],cs(),us(),Sa(),ms(),ka(),window.att_swapSelectedMember=null,window.att_swapSelectedCar=null,ht("画面の入力をクリアしました。","success")};function ht(e,t="info"){const n=document.getElementById("dispatch-message");let a="bg-blue-100 text-blue-700 border-blue-200";t==="error"?a="bg-red-100 text-red-700 border-red-200":t==="success"?a="bg-green-100 text-green-700 border-green-200":t==="warning"&&(a="bg-yellow-100 text-yellow-800 border-yellow-200"),n.className=`p-4 h-full border rounded-lg ${a}`,document.getElementById("dispatch-message-text").innerHTML=e,n.classList.remove("hidden"),Es&&clearTimeout(Es),t!=="warning"&&(Es=setTimeout(gr,5e3))}function gr(){document.getElementById("dispatch-message").classList.add("hidden")}function ic(){if(!de||de.length===0)return!1;for(const t of de){if(t.id==="excluded-car")continue;if((t.driver?1:0)+t.members.filter(a=>a!==null).length>t.baseCapacity)return!0}const e=de.find(t=>t.id==="excluded-car");return e?e.members.some(t=>t&&!Dt.has(t.id)):!1}function zr(){if(ic())ht("定員オーバーです。車の台数が足りないか、定員を超過している車があります。","warning");else{const e=document.getElementById("dispatch-message"),t=document.getElementById("dispatch-message-text");e&&!e.classList.contains("hidden")&&t&&t.innerHTML.includes("定員オーバー")&&gr()}}function dc(){var t,n,a,s,r,o,i;const e=document.querySelector("#view-master h2");if(e&&!document.getElementById("btn-back-to-dispatch-master")){const d=document.createElement("button");d.id="btn-back-to-dispatch-master",d.className="bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 px-4 py-2 rounded shadow font-bold text-sm mb-4 flex items-center w-fit",d.innerHTML='<span class="mr-1">◀</span> 配車調整に戻る',d.addEventListener("click",()=>{var l;return(l=document.getElementById("nav-dispatch"))==null?void 0:l.click()}),e.parentElement.insertBefore(d,e)}(t=document.getElementById("add-family-button"))==null||t.addEventListener("click",cc),At==null||At.addEventListener("click",uc),At==null||At.addEventListener("input",pc),At==null||At.addEventListener("change",mc),(n=document.getElementById("add-car-button"))==null||n.addEventListener("click",fc),Jt==null||Jt.addEventListener("click",gc),Jt==null||Jt.addEventListener("input",bc),(a=document.getElementById("add-parking-button-master"))==null||a.addEventListener("click",yc),rn==null||rn.addEventListener("click",hc),rn==null||rn.addEventListener("input",xc),(s=document.getElementById("export-master-button"))==null||s.addEventListener("click",vc),(r=document.getElementById("import-master-input"))==null||r.addEventListener("change",wc),(o=document.getElementById("master-message-close"))==null||o.addEventListener("click",Ro),(i=document.getElementById("save-master-db-button"))==null||i.addEventListener("click",lc)}async function lc(){const e=document.getElementById("save-master-db-button");try{e.textContent="保存中...",await ne.syncAllMaster(),Ws("マスターデータをサーバーに保存しました","success"),pt=await ne.getAllSavedParking()||[],xa()}catch(t){Ws("保存に失敗しました: "+t.message,"error")}finally{e.textContent="マスターデータを保存 (更新)"}}function Bn(){At&&(At.innerHTML="",we.sort((e,t)=>(e.order??99)-(t.order??99)).forEach((e,t)=>{const n=e.members.map(a=>`<div class="p-2 border rounded bg-gray-50 member-grid"><input data-id="${a.id}" data-f="name" value="${a.name}" class="col-span-3 md:col-span-1 p-1 border"><select data-id="${a.id}" data-f="type" class="col-span-2 md:col-span-1 p-1 border"><option ${a.type==="選手"?"selected":""}>選手</option><option ${a.type==="保護者"?"selected":""}>保護者</option><option ${a.type==="兄弟"?"selected":""}>兄弟</option><option ${a.type==="その他"?"selected":""}>その他</option></select><input data-id="${a.id}" data-f="data.grade" value="${a.data.grade||""}" placeholder="学年" class="col-span-1 border"><input data-id="${a.id}" data-f="data.school" value="${a.data.school||""}" placeholder="学校" class="col-span-2 md:col-span-1 border"><input data-id="${a.id}" data-f="data.other" value="${a.data.other||""}" placeholder="他" class="col-span-2 md:col-span-1 border"><input data-id="${a.id}" data-f="data.memo" value="${a.data.memo||""}" placeholder="備考" class="col-span-2 md:col-span-1 border"><div class="col-span-3 md:col-span-1 flex items-center justify-between"><label class="text-xs"><input type="checkbox" data-id="${a.id}" data-f="isFlagTarget" ${a.isFlagTarget?"checked":""}>同乗優先</label><button data-action="del-m" data-id="${a.id}" class="bg-red-500 text-white px-2 py-1 rounded text-xs">削</button></div></div>`).join("");At.innerHTML+=`<div class="bg-white border rounded shadow" data-fname="${e.familyName}"><div class="family-header"><input data-action="ren-f" value="${e.familyName}" class="font-bold border p-1"><div class="space-x-2"><button data-action="up" class="bg-gray-400 text-white px-2 rounded text-xs">▲</button><button data-action="down" class="bg-gray-400 text-white px-2 rounded text-xs">▼</button><button data-action="del-f" class="bg-red-500 text-white px-2 py-1 rounded text-xs">家族削除</button></div></div><div class="p-3 space-y-2">${n}</div><button data-action="add-m" class="ml-3 mb-3 bg-blue-500 text-white px-2 py-1 rounded text-xs">＋メンバー</button></div>`}))}function cc(){const e=prompt("家族名");e&&(ne.addFamily({familyName:e,order:99,members:[{id:"p"+Date.now(),name:"新規",type:"選手",isFlagTarget:!0,data:{}}]}),Bn())}async function uc(e){const t=e.target,n=t.dataset.action,a=t.closest("[data-fname]");if(!a)return;const s=a.dataset.fname;if(n==="del-f"&&confirm("削除?")&&(ne.deleteFamily(s),Bn()),n==="add-m"){const r=await ne.getFamily(s);r.members.push({id:"p"+Date.now(),name:"新規",type:"保護者",isFlagTarget:!1,data:{}}),ne.updateFamily(r),Bn()}if(n==="del-m"){const r=await ne.getFamily(s);r.members=r.members.filter(o=>o.id!==t.dataset.id),ne.updateFamily(r),Bn()}if(n==="up"||n==="down"){we.sort((i,d)=>(i.order??99)-(d.order??99)),we.forEach((i,d)=>{i.order=d});const r=we.findIndex(i=>i.familyName===s),o=n==="up"?r-1:r+1;if(o>=0&&o<we.length){const i=we[r].order;we[r].order=we[o].order,we[o].order=i,Bn()}}}function mc(e){const t=e.target,n=t.closest("[data-fname]");if(!n)return;const a=n.dataset.fname;if(t.dataset.action==="ren-f"){const s=t.value.trim();if(s&&s!==a){if(we.find(i=>i.familyName===s)){alert(`家族名「${s}」は既に存在します。別の名前を入力してください。`),t.value=a;return}const o=we.find(i=>i.familyName===a);if(o){o.familyName=s,n.dataset.fname=s;let i=!1;_e.forEach(d=>{d.familyName===a&&(d.familyName=s,i=!0)}),i&&sa()}}else s||(t.value=a)}}async function pc(e){const t=e.target;if(t.dataset.action==="ren-f")return;const n=t.dataset.id,a=t.dataset.f,s=t.closest("[data-fname]").dataset.fname;if(!n||!a)return;const r=await ne.getFamily(s),o=r.members.find(d=>d.id===n),i=t.type==="checkbox"?t.checked:t.value;a.startsWith("data.")?o.data[a.split(".")[1]]=i:o[a]=i,ne.updateFamily(r)}function sa(){Jt&&(Jt.innerHTML="",_e.sort((e,t)=>(e.order??99)-(t.order??99)).forEach(e=>{Jt.innerHTML+=`<div class="p-3 border rounded bg-gray-50 flex flex-wrap gap-2 items-center" data-cid="${e.id}"><button data-act="up" class="bg-gray-400 text-white px-2 py-1 text-xs">▲</button><button data-act="down" class="bg-gray-400 text-white px-2 py-1 text-xs">▼</button><input data-f="name" value="${e.name}" class="p-1 border text-sm w-32"><input data-f="familyName" value="${e.familyName}" class="p-1 border text-sm w-32"><input type="number" data-f="baseCapacity" value="${e.baseCapacity}" class="p-1 border text-sm w-16"><button data-act="del" class="bg-red-500 text-white px-2 py-1 rounded text-xs">削</button></div>`}))}function fc(){ne.addCar({id:"c"+Date.now(),name:"新規車",familyName:"",baseCapacity:5,order:99}),sa()}function gc(e){const t=e.target,n=t.dataset.act,a=t.closest("[data-cid]");if(!a)return;const s=a.dataset.cid;if(n==="del"&&(ne.deleteCar(s),sa()),n==="up"||n==="down"){_e.sort((i,d)=>(i.order??99)-(d.order??99)),_e.forEach((i,d)=>{i.order=d});const r=_e.findIndex(i=>i.id===s),o=n==="up"?r-1:r+1;if(o>=0&&o<_e.length){const i=_e[r].order;_e[r].order=_e[o].order,_e[o].order=i,sa()}}}async function bc(e){const t=e.target,n=t.dataset.f,a=t.closest("[data-cid]").dataset.cid;if(!n)return;const s=await ne.getCar(a);s[n]=t.type==="number"?parseInt(t.value):t.value,ne.updateCar(s)}function ps(){rn.innerHTML="",pt.forEach(e=>{rn.innerHTML+=`
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
        </div>`})}function yc(){ne.addParkingMaster({groundName:"",designated:{name:"",limit:0,memo:""},other:{name:"",memo:""}},"新規P"),ps()}function hc(e){e.target.dataset.act==="del"&&(ne.deleteParkingMaster(e.target.closest("[data-pid]").dataset.pid),ps())}function xc(e){const t=e.target,n=t.dataset.f,a=t.closest("[data-pid]").dataset.pid;if(!n)return;const s=pt.find(o=>o.id===a),r=t.type==="number"?parseInt(t.value):t.value;if(n==="name")s.name=r;else{const o=n.split(".");o.length===2?s[o[0]][o[1]]=r:s[o[0]][o[1]][o[2]]=r}ne.updateParkingMaster(s)}async function vc(){const e={families:we,cars:_e,parking:await ne.getAllSavedParking()},t=document.createElement("a");t.href=URL.createObjectURL(new Blob([JSON.stringify(e)],{type:"application/json"})),t.download="master.json",t.click()}function wc(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=a=>{const s=JSON.parse(a.target.result);if(ne.bulkAddFamilies(s.families),ne.bulkAddCars(s.cars),s.parking){pt.forEach(r=>fa.add(r.id)),pt=[];for(let r of s.parking)pt.push({id:r.id||"p"+Date.now()+Math.floor(Math.random()*1e3),name:r.name,timestamp:r.timestamp||Date.now(),parking:r.parking,isNew:!0})}Bn(),sa(),ps(),Ws("読込完了 (※まだ保存されていません。保存ボタンを押してください)","info")},n.readAsText(t)}function Ws(e,t="info"){const n=document.getElementById("master-message");n.className=`p-4 mb-4 border rounded-lg ${t==="error"?"bg-red-100 text-red-700":t==="success"?"bg-green-100 text-green-700":"bg-blue-100 text-blue-700"}`,document.getElementById("master-message-text").innerHTML=e,n.classList.remove("hidden"),_s&&clearTimeout(_s),_s=setTimeout(Ro,5e3)}function Ro(){document.getElementById("master-message").classList.add("hidden")}let en={type:"",add:[],update:[],delete:[]};function Oo(e,t,n,a,s,r=""){en={type:e,add:t,update:n,delete:a},document.getElementById("csv-confirm-title").textContent=s,document.getElementById("csv-add-count").textContent=t.length,document.getElementById("csv-update-count").textContent=n.length,document.getElementById("csv-delete-count").textContent=a.length;const o=document.getElementById("csv-confirm-warning");r?(o.innerHTML=r,o.classList.remove("hidden")):o.classList.add("hidden"),document.getElementById("tab-csv-add").onclick=()=>zn("add"),document.getElementById("tab-csv-update").onclick=()=>zn("update"),document.getElementById("tab-csv-delete").onclick=()=>zn("delete"),t.length>0?zn("add"):n.length>0?zn("update"):zn("delete"),document.getElementById("csv-confirm-modal").classList.remove("hidden")}function es(){document.getElementById("csv-confirm-modal").classList.add("hidden");const e=document.getElementById("input-import-users-csv");e&&(e.value="");const t=document.getElementById("input-import-events-csv");t&&(t.value="")}function zn(e){["add","update","delete"].forEach(n=>{const a=document.getElementById(`tab-csv-${n}`);n===e?(a.classList.add("text-blue-600","border-blue-600"),a.classList.remove("text-gray-500","border-transparent")):(a.classList.remove("text-blue-600","border-blue-600"),a.classList.add("text-gray-500","border-transparent"))}),Ec(e)}function Ec(e){const t=document.getElementById("csv-confirm-content"),n=en[e];if(!n||n.length===0){t.innerHTML='<p class="text-gray-500 p-4">対象のデータはありません。</p>';return}let a="";if(en.type==="users"){const s=e==="add",r=e==="update";a+=`
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
        </div>`}else en.type==="events"&&(a+=`
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
        </div>`);t.innerHTML=a}function Fo(e){const t=[];let n=[],a="",s=!1;for(let r=0;r<e.length;r++){const o=e[r];s?o==='"'?r+1<e.length&&e[r+1]==='"'?(a+='"',r++):s=!1:a+=o:o==='"'?s=!0:o===","?(n.push(a),a=""):o===`
`||o==="\r"?(n.push(a),t.push(n),n=[],a="",o==="\r"&&r+1<e.length&&e[r+1]===`
`&&r++):a+=o}return(a||n.length>0)&&(n.push(a),t.push(n)),t}function br(e){if(e==null)return"";const t=String(e);return t.includes(",")||t.includes('"')||t.includes(`
`)||t.includes("\r")?'"'+t.replace(/"/g,'""')+'"':t}async function _c(){W("メンバー情報をエクスポート中...");try{const{data:e}=await B.from("app_users").select("*").order("created_at",{ascending:!1}),{data:t}=await B.from("user_groups").select("*"),{data:n}=await B.from("groups").select("*"),{data:a}=await B.from("user_attributes").select("*"),s=new Map(n.map(g=>[g.id,g.name])),r=new Map(a.map(g=>[g.id,g.name])),o=new Map(t.map(g=>[g.user_email,g.group_id]));let i=window.adminDelegations;if(!i){const{data:g}=await B.from("master_data").select("*").eq("key","ATTENDANCE_DELEGATIONS").single();i=g&&g.data?g.data:{},window.adminDelegations=i}const l=[["メールアドレス","氏名","役割","所属グループ名","ユーザー属性名","配車利用可(1/0)","成績利用可(1/0)","出欠利用可(1/0)","シミュレータ利用可(1/0)","Info利用可(1/0)","Info編集可(1/0)","代行入力先(カンマ区切りメールアドレス)","代行専用(1/0)","初期パスワード","削除(1/0)"]];e.forEach(g=>{const y=g.role==="admin"?"管理者":g.role==="leader"?"リーダー":"一般ユーザー",b=o.get(g.email),p=b&&s.get(b)||"",m=g.attribute_id&&r.get(g.attribute_id)||"",h=i[g.email]?i[g.email].join(","):"",_=g.email.endsWith("@local.dummy");l.push([g.email,g.name||"",y,p,m,g.can_use_dispatch!==!1?"1":"0",g.can_use_dashboard!==!1?"1":"0",g.can_use_attendance!==!1?"1":"0",g.can_use_simulator!==!1?"1":"0",g.can_use_info!==!1?"1":"0",g.can_edit_info===!0||g.role==="admin"||g.role==="leader"&&g.can_edit_info!==!1?"1":"0",h,_?"1":"0","","0"])});const c=l.map(g=>g.map(br).join(",")).join(`
`),u=new Blob([new Uint8Array([239,187,191]),c],{type:"text/csv;charset=utf-8;"}),f=document.createElement("a");f.href=URL.createObjectURL(u),f.download=`members_${new Date().toISOString().split("T")[0]}.csv`,f.click()}catch(e){console.error(e),alert("エクスポートに失敗しました: "+e.message)}finally{G()}}async function Ic(e){const t=e.target.files[0];if(!t)return;W("CSVファイルを解析中...");const n=new FileReader;n.onload=async a=>{try{const s=a.target.result,r=Fo(s);if(r.length<2){alert("有効なデータがありません。"),G();return}const o=r[0].map(L=>L.trim()),i=o.indexOf("メールアドレス"),d=o.indexOf("氏名"),l=o.indexOf("役割"),c=o.indexOf("所属グループ名"),u=o.indexOf("ユーザー属性名"),f=o.findIndex(L=>L.includes("配車")),g=o.findIndex(L=>L.includes("成績")),y=o.findIndex(L=>L.includes("出欠")),b=o.findIndex(L=>L.includes("シミュレータ")),p=o.findIndex(L=>(L.includes("Info")||L.includes("インフォ"))&&!L.includes("編集")),m=o.findIndex(L=>(L.includes("Info")||L.includes("インフォ"))&&L.includes("編集")),h=o.findIndex(L=>L.includes("代行入力先")),_=o.findIndex(L=>L.includes("代行専用")),I=o.findIndex(L=>L.includes("初期パスワード")),k=o.findIndex(L=>L.includes("削除"));if(i===-1||d===-1){alert("「メールアドレス」および「氏名」列は必須です。"),G();return}const{data:S}=await B.from("app_users").select("*"),{data:$}=await B.from("user_groups").select("*"),{data:E}=await B.from("groups").select("*"),{data:w}=await B.from("user_attributes").select("*");let x=window.adminDelegations;if(!x){const{data:L}=await B.from("master_data").select("*").eq("key","ATTENDANCE_DELEGATIONS").single();x=L&&L.data?L.data:{},window.adminDelegations=x}const v=new Map(E.map(L=>[L.name,L.id])),A=new Map(w.map(L=>[L.name,L.id])),P=new Map(S.map(L=>[L.email,L])),N=new Map($.map(L=>[L.user_email,L.group_id])),D=[],F=[],R=[];for(let L=1;L<r.length;L++){const T=r[L];if(T.length<2)continue;const C=(T[d]||"").trim();if(!C)continue;let U=(T[i]||"").trim();const ee=_!==-1?T[_]==="1"||T[_]==="true"||T[_]==="代行専用":!1,z=U.endsWith("@local.dummy"),K=ee||z;if(U)K&&!z&&(U.includes("@")?U=U.split("@")[0]+"@local.dummy":U=U+"@local.dummy");else if(K)U=`dummy_${Date.now()}_${L}@local.dummy`;else continue;U=ds(U);const H=(T[l]||"").trim();let Z="user";H==="管理者"||H==="admin"?Z="admin":(H==="リーダー"||H==="leader")&&(Z="leader");const q=c!==-1?(T[c]||"").trim():"",re=q&&v.get(q)||null,oe=u!==-1?(T[u]||"").trim():"",ge=oe&&A.get(oe)||null,Te=f!==-1?!(T[f]==="0"||T[f]==="false"):!0,st=g!==-1?!(T[g]==="0"||T[g]==="false"):!0,ue=y!==-1?!(T[y]==="0"||T[y]==="false"):!0,ct=b!==-1?!(T[b]==="0"||T[b]==="false"):!0,Ue=p!==-1?!(T[p]==="0"||T[p]==="false"):!0,Ut=m!==-1?T[m]==="1"||T[m]==="true"||T[m]==="可":Z==="admin"||Z==="leader"&&!0,Mt=k!==-1?T[k]==="1"||T[k]==="削除":!1;let Et=null;h!==-1&&(Et=(T[h]||"").split(",").map(je=>je.trim()).filter(Boolean));let _t="",xt=null;if(!K){const Ne=I!==-1?(T[I]||"").trim():"";if(P.has(U))Ne.length>=6&&(xt=Ne);else if(Ne.length>=6)_t=Ne;else{const je="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";let It="pw-";for(let wn=0;wn<6;wn++)It+=je.charAt(Math.floor(Math.random()*je.length));_t=It}}const Y={email:U,name:C,role:Z,group_id:re,group_name:q,attribute_id:ge,attribute_name:oe,can_use_dispatch:Te,can_use_dashboard:st,can_use_attendance:ue,can_use_simulator:ct,can_use_info:Ue,can_edit_info:Ut,delegations:Et,is_dummy:K,initial_password:xt!==null?xt:_t},me=P.get(U);if(me)if(Mt)R.push(Y);else{const Ne=N.get(U)!==re,je=me.role!==Z,It=me.name!==C,wn=me.attribute_id!==ge,La=me.can_use_dispatch!==!1!==Te,M=me.can_use_dashboard!==!1!==st,V=me.can_use_attendance!==!1!==ue,ve=me.can_use_simulator!==!1!==ct,ye=me.can_use_info!==!1!==Ue,rt=me.can_edit_info===!0!==Ut;let Ve=!1;if(Et!==null){const ot=x[U]||[],Se=[...Et].sort().join(","),Ee=[...ot].sort().join(",");Se!==Ee&&(Ve=!0)}let En=!1;xt!==null&&(En=!0),(Ne||je||It||wn||La||M||V||ve||ye||rt||Ve||En)&&F.push(Y)}else Mt||(Y.delegations===null&&(Y.delegations=[]),D.push(Y))}G(),Oo("users",D,F,R,"メンバーCSVインポート確認")}catch(s){console.error(s),alert("CSVの解析に失敗しました: "+s.message),G()}},n.readAsText(t)}async function $c(){en.type==="users"?await Sc():en.type==="events"&&typeof window.executeEventsImport=="function"&&await window.executeEventsImport()}async function Sc(){W("インポートデータを保存中...");try{const{add:e,update:t,delete:n}=en;let a=window.adminDelegations;if(!a){const{data:d}=await B.from("master_data").select("*").eq("key","ATTENDANCE_DELEGATIONS").single();a=d&&d.data?d.data:{},window.adminDelegations=a}if(n.length>0){const d=n.map(c=>c.email),{error:l}=await B.from("app_users").delete().in("email",d);if(l)throw l;d.forEach(c=>{delete window.adminDelegations[c]}),Object.keys(window.adminDelegations).forEach(c=>{window.adminDelegations[c]=(window.adminDelegations[c]||[]).filter(u=>!d.includes(u))}),await fe("IMPORT_USERS_DELETE",`${n.length}件のユーザーをインポートで削除しました`)}if(e.length>0){const d=[];for(let f of e)if(!f.is_dummy)try{const g=window.supabase.createClient(na,Qa,{auth:{persistSession:!1,autoRefreshToken:!1}}),{error:y}=await g.auth.signUp({email:f.email,password:f.initial_password});if(y)throw new Error(`Auth作成失敗: ${y.message}`)}catch(g){console.error(`Sign up error for ${f.email}:`,g),d.push(`${f.email}: ${g.message}`)}if(d.length>0&&!confirm(`一部のアカウント払い出し（Auth）に失敗しました。データベース登録を続行しますか？

エラー内容:
${d.join(`
`)}`))throw new Error("インポート処理を中断しました。");const l=e.map(f=>({email:f.email,name:f.name,role:f.role,attribute_id:f.attribute_id,can_use_dispatch:f.can_use_dispatch,can_use_dashboard:f.can_use_dashboard,can_use_attendance:f.can_use_attendance,can_use_simulator:f.can_use_simulator,can_use_info:f.can_use_info,can_edit_info:f.can_edit_info}));let{error:c}=await B.from("app_users").insert(l);if(c&&c.message&&c.message.includes("can_edit_info")){const f=l.map(y=>{const b={...y};return delete b.can_edit_info,b});c=(await B.from("app_users").insert(f)).error}if(c)throw c;const u=e.filter(f=>f.group_id).map(f=>({user_email:f.email,group_id:f.group_id}));if(u.length>0){const{error:f}=await B.from("user_groups").insert(u);if(f)throw f}e.forEach(f=>{f.delegations&&(window.adminDelegations[f.email]=f.delegations)}),await fe("IMPORT_USERS_ADD",`${e.length}件のユーザーをインポートで追加しました`)}if(t.length>0){const d=[];for(let l of t){if(l.initial_password)try{const{error:g}=await B.rpc("admin_update_user_password",{user_email:l.email,new_password:l.initial_password});if(g)throw g;await fe("ADMIN_CHANGE_PASSWORD",`ユーザー「${l.email}」のパスワードをインポートで変更しました`)}catch(g){console.error(`Failed to update password for ${l.email}:`,g),d.push(`${l.email}: ${g.message}`)}const c={name:l.name,role:l.role,attribute_id:l.attribute_id,can_use_dispatch:l.can_use_dispatch,can_use_dashboard:l.can_use_dashboard,can_use_attendance:l.can_use_attendance,can_use_simulator:l.can_use_simulator,can_use_info:l.can_use_info,can_edit_info:l.can_edit_info};let{error:u}=await B.from("app_users").update(c).eq("email",l.email);if(u&&u.message&&u.message.includes("can_edit_info")){const g={...c};delete g.can_edit_info,u=(await B.from("app_users").update(g).eq("email",l.email)).error}if(u)throw u;const{data:f}=await B.from("user_groups").select("*").eq("user_email",l.email);if(l.group_id)if(f&&f.length>0){const{error:g}=await B.from("user_groups").update({group_id:l.group_id}).eq("user_email",l.email);if(g)throw g}else{const{error:g}=await B.from("user_groups").insert([{user_email:l.email,group_id:l.group_id}]);if(g)throw g}else if(f&&f.length>0){const{error:g}=await B.from("user_groups").delete().eq("user_email",l.email);if(g)throw g}l.delegations!==null&&(window.adminDelegations[l.email]=l.delegations)}d.length>0&&alert(`一部のパスワード更新に失敗しました。詳細は開発者コンソールを確認してください。

失敗したユーザー:
${d.join(`
`)}`),await fe("IMPORT_USERS_UPDATE",`${t.length}件のユーザーをインポートで更新しました`)}const{error:s}=await B.from("master_data").upsert({key:"ATTENDANCE_DELEGATIONS",data:window.adminDelegations});if(s)throw s;let r="インポートが完了しました。";const o=e.filter(d=>!d.is_dummy),i=t.filter(d=>d.initial_password);(o.length>0||i.length>0)&&(r+=`

【アカウントのログイン情報・変更内容】`,o.length>0&&(r+=`
[新規アカウントの仮パスワード]`,o.forEach(d=>{r+=`
氏名: ${d.name}
ログインID: ${On(d.email)}
仮パスワード: ${d.initial_password}
------------------------`})),i.length>0&&(r+=`
[更新アカウントの新パスワード]`,i.forEach(d=>{r+=`
氏名: ${d.name}
ログインID: ${On(d.email)}
新パスワード: ${d.initial_password}
------------------------`})),r+=`

※上記情報をコピーし、対象のユーザーへお伝えください。`),alert(r),es(),await be()}catch(e){console.error(e),alert("保存に失敗しました: "+e.message)}finally{G()}}window.showCSVConfirmModal=Oo;window.closeCSVConfirmModal=es;window.parseCSV=Fo;window.escapeCSV=br;function kc(){const n=[["メールアドレス","氏名","役割","所属グループ名","ユーザー属性名","配車利用可(1/0)","成績利用可(1/0)","出欠利用可(1/0)","代行入力先(カンマ区切りメールアドレス)","代行専用(1/0)","初期パスワード","削除(1/0)"],["sample_parent@example.com","山田 太郎","一般ユーザー","選手・保護者","A軍","1","1","1","sample_child1@example.com,sample_child2@example.com","0","tempPw123","0"],["sample_child1@example.com","山田 一郎","一般ユーザー","選手・保護者","A軍","1","0","1","","0","tempPw123","0"],["sample_child2@example.com","山田 二郎","一般ユーザー","選手・保護者","A軍","1","0","1","","0","tempPw123","0"],["","代行専用の子ども","一般ユーザー","選手・保護者","A軍","0","0","1","","1","","0"]].map(r=>r.map(br).join(",")).join(`
`),a=new Blob([new Uint8Array([239,187,191]),n],{type:"text/csv;charset=utf-8;"}),s=document.createElement("a");s.href=URL.createObjectURL(a),s.download="members_sample.csv",s.click()}const Lc=Object.freeze(Object.defineProperty({__proto__:null,get csvImportState(){return en},get currentUser(){return J},get currentUserRole(){return Ge},forceHideLoading:it,goToUsersAdmin:Co,hideLoading:G,logAction:fe,openChangePasswordModal:mr,showLoading:W,supabaseClient:B,switchAuthScreen:se,withLoading:Me},Symbol.toStringTag,{value:"Module"}));
