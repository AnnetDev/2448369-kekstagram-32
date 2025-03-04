(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const i of c.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(r){if(r.ep)return;r.ep=!0;const c=n(r);fetch(r.href,c)}})();const te=document.querySelector("#picture").content.querySelector(".picture"),ne="https://32.javascript.htmlacademy.pro/kekstagram",oe=e=>e.startsWith("http")?e:`${ne}${e}`,re=({url:e,description:t,likes:n,comments:o,id:r})=>{const c=te.cloneNode(!0);return c.querySelector(".picture__img").src=oe(e),c.querySelector(".picture__img").alt=t,c.querySelector(".picture__likes").textContent=n,c.querySelector(".picture__comments").textContent=o.length,c.dataset.thumbnailId=r,c},v=(e,t)=>{const n=document.createDocumentFragment();e.forEach(o=>{const r=re(o);n.append(r)}),t.append(n)},s=document.querySelector(".big-picture"),w=s.querySelector(".social__comment-count"),N=s.querySelector(".social__comments"),_=s.querySelector(".comments-loader"),ce=w.querySelector(".social__comment-shown-count"),se=w.querySelector(".social__comment-total-count"),ie=s.querySelector(".big-picture__cancel"),I=document.querySelector("body"),le=document.querySelector("#comment").content.querySelector(".social__comment"),ae=5;let m=0,S=[];const ue=e=>e.key==="Escape",me=({avatar:e,name:t,message:n})=>{const o=le.cloneNode(!0);return o.querySelector(".social__picture").src=e,o.querySelector(".social__picture").alt=t,o.querySelector(".social__text").textContent=n,o},de=e=>{m=0,S=e,N.innerHTML="",M()},O=()=>{s.classList.add("hidden"),I.classList.remove("modal-open"),document.removeEventListener("keydown",$)};function $(e){ue(e)&&(e.preventDefault(),O())}const fe=()=>{O()},pe=({url:e,likes:t,description:n})=>{s.querySelector(".big-picture__img img").src=e,s.querySelector(".big-picture__img img").alt=n,s.querySelector(".likes-count").textContent=t,s.querySelector(".social__caption").textContent=n},ge=e=>{s.classList.remove("hidden"),I.classList.add("modal-open"),_.classList.remove("hidden"),w.classList.remove("hidden"),document.addEventListener("keydown",$),pe(e),de(e.comments)};function M(){const e=document.createDocumentFragment(),t=S.slice(m,m+ae);t.forEach(n=>{const o=me(n);e.append(o)}),N.append(e),m+=t.length,ye(),m>=S.length?_.classList.add("hidden"):_.classList.remove("hidden")}function ye(){ce.textContent=m,se.textContent=S.length}ie.addEventListener("click",fe);_.addEventListener("click",M);const q=document.querySelector(".pictures"),he=document.querySelector(".img-filters"),_e=()=>{q.querySelectorAll(".picture").forEach(t=>t.remove())},Se=e=>{q.addEventListener("click",t=>{const n=t.target.closest("[data-thumbnail-id]");if(!n)return;t.preventDefault();const o=e.find(r=>r.id===+n.dataset.thumbnailId);ge(o)}),v(e,q),he.classList.remove("img-filters--inactive")},U=25,Ee=25,ve=100,B=100,Le=document.querySelector(".scale__control--smaller"),qe=document.querySelector(".scale__control--bigger"),be=document.querySelector(".scale__control--value"),G=document.querySelector(".img-upload__preview img");let d=B;const R=()=>{be.value=`${d}%`,G.style.transform=`scale(${d/100})`};Le.addEventListener("click",()=>{d>Ee&&(d-=U,R())});qe.addEventListener("click",()=>{d<ve&&(d+=U,R())});const we=()=>{G.style.transform=`scale(${B/100})`},L={none:{style:"none",step:.1,unit:"",min:0,max:1},chrome:{style:"grayscale",step:.1,unit:"",min:0,max:1},sepia:{style:"sepia",step:.1,unit:"",min:0,max:1},marvin:{style:"invert",step:1,unit:"%",min:0,max:100},phobos:{style:"blur",step:.1,unit:"px",min:0,max:3},heat:{style:"brightness",step:.1,unit:"",min:1,max:3}},y=document.querySelector(".img-upload__form"),E=y.querySelector(".img-upload__preview img"),H=y.querySelector(".effects"),Ce=y.querySelector(".effect-level__value"),K=y.querySelector(".img-upload__effect-level"),u=y.querySelector(".effect-level__slider");let a=L.none;const Te=({min:e,max:t,step:n})=>{u.noUiSlider||(noUiSlider.create(u,{start:t,range:{min:e,max:t},step:n,format:{to:o=>Number(o),from:o=>Number(o)}}),u.noUiSlider.on("update",ke)),j()},Pe=(e,t)=>{e==="none"?E.style.filter="":E.style.filter=`${e.style}(${t}${e.unit})`};function ke(){const e=u.noUiSlider.get();Ce.value=e,Pe(a,e)}const V=e=>{const t=e.target.closest('input[type="radio"]');if(t){const n=t.value;a=L[n],n==="none"?(j(),E.style.filter=""):(De(),u.noUiSlider.updateOptions({range:{min:a.min,max:a.max},start:a.max,step:a.step}))}};function j(){K.classList.add("hidden")}function De(){K.classList.remove("hidden")}const xe=()=>{Te(L.none),H.addEventListener("change",V)},Ae=()=>{u.noUiSlider&&u.noUiSlider.destroy(),E.style.filter="",a=L.none,H.removeEventListener("change",V)},Fe="https://32.javascript.htmlacademy.pro/kekstagram",z={GET_DATA:"/data",SEND_DATA:"/"},W={GET:"GET",POST:"POST"},X=(e,t=W.GET,n=null)=>fetch(`${Fe}${e}`,{method:t,body:n}).then(o=>{if(!o.ok)throw new Error(`Произошла ошибка ${o.status}: ${o.statusText}`);return o.json()}),Ne=()=>X(z.GET_DATA),Ie=e=>X(z.SEND_DATA,W.POST,e),Oe=["jpg","jpeg","png"],Y={IDLE:"Опубликовать",SENDING:"Публикую..."},b=document.querySelector(".img-upload__input[type=file]"),J=document.querySelector(".img-upload__preview img"),C=document.querySelector(".img-upload__overlay"),Q=document.body,$e=C.querySelector(".img-upload__cancel"),p=document.querySelector(".img-upload__form"),T=p.querySelector(".text__hashtags"),P=p.querySelector(".text__description"),f=p.querySelector(".img-upload__submit");b.addEventListener("change",()=>{Me();const e=b.files[0],t=e.name.toLowerCase();if(Oe.some(o=>t.endsWith(o))){const o=URL.createObjectURL(e);J.src=o,document.querySelectorAll(".effects__preview").forEach(c=>{c.style.backgroundImage=`url(${o})`})}});function Me(){C.classList.remove("hidden"),Q.classList.add("modal-open"),document.addEventListener("keydown",Z),xe()}const k=e=>e.key==="Escape";function D(){C.classList.add("hidden"),Q.classList.remove("modal-open"),document.removeEventListener("keydown",Z),Ue(),we(),Ae()}function Z(e){if(k(e)){if(document.activeElement===T||document.activeElement===P){e.stopPropagation();return}const t=document.querySelector(".error");if(t){e.preventDefault(),t.remove(),e.stopPropagation();return}e.preventDefault(),D()}}function Ue(){b.value="",p.reset(),J.src="",document.querySelectorAll(".effects__preview").forEach(t=>{t.style.backgroundImage=""}),x()}$e.addEventListener("click",D);const h=new Pristine(p,{classTo:"img-upload__field-wrapper",errorTextParent:"img-upload__field-wrapper",errorTextClass:"img-upload__field-wrapper__error"});function x(){h.reset(),document.querySelectorAll(".pristine-error").forEach(t=>t.remove())}function Be(e){return e.length<=140}h.addValidator(P,Be);function Ge(e){if(!e)return!0;const t=e.trim().split(/\s+/);if(t.length>5)return!1;const n=/^#[a-za-яё0-9]{1,19}$/i,o=new Set;for(const r of t){if(r.length>20||!n.test(r)||o.has(r.toLowerCase()))return!1;o.add(r.toLowerCase())}return!0}function Re(e){const t=e.trim().split(/\s+/);if(t.length>5)return"Нельзя указать больше пяти хэштегов";const n=/^#[a-za-яё0-9]{1,19}$/i,o=new Set;for(const r of t){if(r.length>20)return"Максимум 20 символов";if(!n.test(r))return"Хэштег должен начинаться с # и содержать только буквы и цифры";if(o.has(r.toLowerCase()))return"Один и тот же хэштег не может быть использован дважды";o.add(r.toLowerCase())}}h.addValidator(T,Ge,Re);const He=()=>{f.disabled=!0,f.textContent=Y.SENDING},Ke=()=>{f.disabled=!1,f.textContent=Y.IDLE},Ve=()=>{const t=document.querySelector("#success").content.cloneNode(!0);document.body.append(t);const n=document.querySelector(".success__button"),o=document.querySelector(".success"),r=()=>{o.remove(),document.removeEventListener("keydown",c),document.removeEventListener("click",i)};function c(l){k(l)&&(l.preventDefault(),r())}function i(l){l.target.closest(".success__inner")||r()}n.addEventListener("click",r),document.addEventListener("keydown",c),document.addEventListener("click",i)},je=()=>{const t=document.querySelector("#error").content.cloneNode(!0);document.body.append(t);const n=document.querySelector(".error__button"),o=document.querySelector(".error"),r=()=>{o.remove(),document.removeEventListener("keydown",c),document.removeEventListener("click",i)};function c(l){k(l)&&(l.preventDefault(),r())}function i(l){l.target.closest(".error__inner")||r()}n.addEventListener("click",r),document.addEventListener("keydown",c),document.addEventListener("click",i)},ze=e=>{p.addEventListener("submit",async t=>{t.preventDefault(),h.validate()&&(He(),await Ie(new FormData(t.target)).then(()=>{e(),Ve()}).catch(()=>{je()}).finally(Ke))})};function ee(){h.validate()?f.removeAttribute("disabled"):f.setAttribute("disabled",!0)}T.addEventListener("input",()=>{x(),ee()});P.addEventListener("input",()=>{x(),ee()});const We=5e3,Xe=()=>{const t=document.querySelector("#data-error").content.cloneNode(!0);document.body.append(t),setTimeout(()=>{document.querySelector(".data-error").remove()},We)};function Ye(e,t=500){let n;return(...o)=>{clearTimeout(n),n=setTimeout(()=>e.apply(this,o),t)}}const Je=10;let g=[];const Qe=document.querySelector(".img-filters__form"),A=document.querySelector(".pictures");let F=document.querySelector(".img-filters__button--active");const Ze=()=>{v(g,A)},et=()=>{const e=[],t=new Set;for(;e.length<Je;){const n=Math.floor(Math.random()*g.length);t.has(n)||(e.push(g[n]),t.add(n))}v(e,A)},tt=()=>{const e=[...g].sort((t,n)=>n.comments.length-t.comments.length);v(e,A)},nt={"filter-default":Ze,"filter-random":et,"filter-discussed":tt};function ot(e){_e();const t=nt[e];t&&t()}const rt=Ye(ot,500);function ct(e){e.target.classList.contains("img-filters__button")&&(F.classList.remove("img-filters__button--active"),e.target.classList.add("img-filters__button--active"),F=e.target,rt(e.target.id))}function st(e){g=e,Qe.addEventListener("click",ct)}Ne().then(e=>{Se(e),st(e)}).catch(()=>{Xe()});ze(D);
