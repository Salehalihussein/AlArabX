// Replace these demo entries with videos you own or are explicitly authorized to embed.
// Use only provider-approved embed URLs. Never scrape or bypass third-party restrictions.
const videos = [
  {id:1,title:"Sample video listing one",category:"featured",views:"12.4K",duration:"08:24",provider:"External provider",embedUrl:"",sourceUrl:""},
  {id:2,title:"Sample video listing two",category:"popular",views:"9.8K",duration:"12:10",provider:"External provider",embedUrl:"",sourceUrl:""},
  {id:3,title:"Sample video listing three",category:"new",views:"2.1K",duration:"06:45",provider:"External provider",embedUrl:"",sourceUrl:""},
  {id:4,title:"Sample video listing four",category:"featured",views:"7.6K",duration:"10:02",provider:"External provider",embedUrl:"",sourceUrl:""},
  {id:5,title:"Sample video listing five",category:"popular",views:"18.2K",duration:"14:18",provider:"External provider",embedUrl:"",sourceUrl:""},
  {id:6,title:"Sample video listing six",category:"new",views:"860",duration:"05:31",provider:"External provider",embedUrl:"",sourceUrl:""}
];

const translations = {
  en:{gateTitle:"Are you 18 or older?",gateCopy:"This demo is intended for adults only. By continuing, you confirm that you are at least 18 and that viewing this type of content is legal where you live.",enter:"I am 18+ — Enter",leave:"Leave",gateNote:"Age gate only — it is not identity or age verification.",searchLabel:"Search videos",searchPlaceholder:"Search videos...",heroEyebrow:"CURATED VIDEO CATALOG",heroTitle:'Discover your next <span class="accent">favorite</span>.',heroCopy:"A clean, searchable catalog for links and embeds you are authorized to share.",adultsOnly:"18+ ADULTS ONLY",all:"All",featured:"Featured",popular:"Popular",new:"Recently added",libraryEyebrow:"THE LIBRARY",libraryTitle:"Explore videos",noticeTitle:"Content and rights notice",noticeCopy:"Only add lawful material featuring consenting adults, and only use videos you own or are explicitly permitted to embed. Do not download, scrape, rehost, or bypass restrictions on third-party services. Remove reported or unauthorized material promptly.",footerText:"Adults-only demo catalog · External embeds only",empty:"No matching videos found.",watch:"Open video",source:"Visit source",embedUnavailable:"No authorized embed has been configured for this demo item."},
  ar:{gateTitle:"هل عمرك 18 عاماً أو أكثر؟",gateCopy:"هذا النموذج مخصص للبالغين فقط. بالمتابعة، تؤكد أن عمرك 18 عاماً على الأقل وأن مشاهدة هذا النوع من المحتوى قانونية في مكان إقامتك.",enter:"عمري 18+ — دخول",leave:"خروج",gateNote:"هذه بوابة عمر فقط وليست تحققاً من الهوية أو العمر.",searchLabel:"ابحث عن فيديوهات",searchPlaceholder:"ابحث عن فيديوهات...",heroEyebrow:"كتالوج فيديوهات منسّق",heroTitle:'اكتشف <span class="accent">مفضّلتك</span> القادمة.',heroCopy:"كتالوج واضح وقابل للبحث للروابط والتضمينات المصرّح لك بمشاركتها.",adultsOnly:"للبالغين +18 فقط",all:"الكل",featured:"مختارة",popular:"الأكثر شعبية",new:"أضيفت حديثاً",libraryEyebrow:"المكتبة",libraryTitle:"استكشف الفيديوهات",noticeTitle:"تنبيه المحتوى والحقوق",noticeCopy:"أضف فقط محتوى قانونياً يظهر فيه بالغون موافقون، واستخدم فقط الفيديوهات التي تملكها أو لديك إذن صريح بتضمينها. لا تنزّل محتوى خدمات الطرف الثالث أو تجمعه آلياً أو تعيد استضافته أو تتجاوز قيوده. أزل المحتوى المبلّغ عنه أو غير المصرّح به فوراً.",footerText:"كتالوج تجريبي للبالغين · تضمينات خارجية فقط",empty:"لم يتم العثور على فيديوهات مطابقة.",watch:"فتح الفيديو",source:"زيارة المصدر",embedUnavailable:"لم تتم إضافة رابط تضمين مصرح به لهذا العنصر التجريبي."}
};
let language="en", activeCategory="all";
const $=s=>document.querySelector(s);
function t(key){return translations[language][key]||key}
function applyLanguage(){
  document.documentElement.lang=language;document.documentElement.dir=language==="ar"?"rtl":"ltr";
  document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;el.innerHTML=t(k)});
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>el.placeholder=t(el.dataset.i18nPlaceholder));
  $("#languageBtn").textContent=language==="en"?"العربية":"English";
  render();
}
function render(){
  const q=$("#searchInput").value.trim().toLowerCase();
  const shown=videos.filter(v=>(activeCategory==="all"||v.category===activeCategory)&&v.title.toLowerCase().includes(q));
  $("#resultCount").textContent=shown.length;
  $("#videoGrid").innerHTML=shown.length?shown.map(v=>`
    <article class="video-card">
      <div class="thumb"><span class="play-icon">▶</span><span class="duration">${v.duration}</span></div>
      <div class="card-body"><h3>${escapeHtml(v.title)}</h3><div class="meta"><span>${escapeHtml(v.provider)} · ${v.views} views</span><span class="tag">${t(v.category)}</span></div>
      <button class="button primary watch-button" style="margin-top:13px;width:100%" data-id="${v.id}">${t("watch")}</button></div>
    </article>`).join(""):`<div class="empty">${t("empty")}</div>`;
  document.querySelectorAll(".watch-button").forEach(b=>b.addEventListener("click",()=>openVideo(Number(b.dataset.id))));
}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function openVideo(id){
  const v=videos.find(x=>x.id===id);if(!v)return;
  $("#playerTitle").textContent=v.title;$("#playerFrame").innerHTML="";
  $("#playerFallback").textContent="";
  if(v.embedUrl){
    // Only use embed URLs explicitly permitted by the source provider.
    const frame=document.createElement("iframe");frame.src=v.embedUrl;frame.title=v.title;frame.loading="lazy";
    frame.allow="fullscreen; picture-in-picture";frame.referrerPolicy="strict-origin-when-cross-origin";$("#playerFrame").appendChild(frame);
  }else{
    $("#playerFallback").textContent=t("embedUnavailable");
    if(v.sourceUrl){const a=document.createElement("a");a.href=v.sourceUrl;a.target="_blank";a.rel="noopener noreferrer";a.textContent=t("source");$("#playerFallback").append(" ");$("#playerFallback").appendChild(a)}
  }
  $("#playerModal").classList.add("open");$("#playerModal").setAttribute("aria-hidden","false");
}
function closeVideo(){$("#playerModal").classList.remove("open");$("#playerModal").setAttribute("aria-hidden","true");$("#playerFrame").innerHTML=""}
$("#languageBtn").addEventListener("click",()=>{language=language==="en"?"ar":"en";applyLanguage()});
$("#searchInput").addEventListener("input",render);
document.querySelectorAll(".chip").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".chip").forEach(x=>x.classList.remove("active"));b.classList.add("active");activeCategory=b.dataset.category;render()}));
$("#closeModal").addEventListener("click",closeVideo);$("#modalBackdrop").addEventListener("click",closeVideo);
$("#enterBtn").addEventListener("click",()=>{sessionStorage.setItem("ageConfirmed","yes");$("#ageGate").hidden=true});
$("#leaveBtn").addEventListener("click",()=>{document.body.innerHTML='<main style="padding:12vh 8vw;text-align:center"><h1>Access denied</h1><p>This site is for adults only.</p></main>'});
if(sessionStorage.getItem("ageConfirmed")==="yes")$("#ageGate").hidden=true;
$("#year").textContent=new Date().getFullYear();
applyLanguage();
