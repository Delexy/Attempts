!function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/js",r(r.s=0)}([function(e,t){const r=document.querySelector(".video-list");let o="",n=[],l=!1,a={},c=0,i=0,s="";function u(){const e=document.querySelector("#unlogin"),t=document.querySelector(".main"),l=document.querySelector(".favourites"),c=document.querySelector(".input-heart"),s=document.querySelector(".nav__items"),u=document.querySelector(".filter-panel__change-view"),p=document.querySelector(".backdrop"),S=document.querySelector(".modal--save"),q=document.querySelector(".modal--edit");d(),t.classList.add("active"),s.parentElement.classList.add("active"),e.addEventListener("click",()=>{localStorage.removeItem("token"),location.reload()}),s.addEventListener("click",e=>{e.target.classList.contains("active")||"UL"===e.target.tagName||(s.querySelector("li.active").classList.remove("active"),e.target.classList.add("active"),t.classList.toggle("active"),l.classList.toggle("active"))}),u.addEventListener("click",e=>{e.target.classList.contains("active")||(u.querySelector(".active").classList.remove("active"),e.target.classList.add("active"),r.classList.toggle("grid"))}),c.addEventListener("click",e=>{var t;(t=S).querySelector('[type = "range"]').value=12,t.querySelector('[name = "name"]').value="Укажите название",t.querySelector('[name = "sort"]').value="none",t.querySelector("span").textContent=12,""!==o?(a={query:o.searchParams.get("q").replace(/\+/g," ")},""!==a.query.trim()?(p.classList.toggle("active"),S.querySelector('[name = "query"]').value=a.query,S.querySelector('[name = "name"]').value="Укажите название",S.classList.add("active")):m("Пожалуйста, введите запрос.",document.querySelector(".input-heart"))):m('Подвердите запрос, нажав "Найти". После чего вы сможете добавить его в раздел "Избранное".',document.querySelector(".input-heart"))}),p.addEventListener("click",()=>{S.classList.remove("active"),q.classList.remove("active"),p.classList.remove("active")}),S.querySelector('[type = "range"]').addEventListener("input",()=>{S.querySelector(".modal__range-container span").innerHTML=S.querySelector('[type = "range"]').value}),S.querySelector("#save__close-modal").addEventListener("click",()=>{S.classList.remove("active"),p.classList.remove("active")}),S.addEventListener("submit",e=>{e.preventDefault();const t=S.querySelector('[type = "range"]'),r=S.querySelector('[name = "name"]'),o=S.querySelector('[name = "sort"]');""!==r.value&&"Укажите название"!==r.value?(a.name=r.value,a.maxResults=t.value,a.order=o.value,n.push(a),v(),S.classList.remove("active"),p.classList.remove("active"),m('Поиск сохранен в разделе "Избранное". <br><br> <p>Перейти в избранное</p>',document.querySelector(".input-heart"))):(r.value="",r.focus(),m("Пожалуйста, введите имя запроса",document.querySelector(".input-heart")))}),q.querySelector("#edit__close-modal").addEventListener("click",()=>{q.classList.remove("active"),p.classList.remove("active")}),q.querySelector('[type = "range"]').addEventListener("input",()=>{q.querySelector(".modal__range-container span").innerHTML=q.querySelector('[type = "range"]').value}),q.addEventListener("submit",e=>{e.preventDefault();const t=q.querySelector('[type = "range"]'),r=q.querySelector('[name = "name"]'),o=q.querySelector('[name = "query"]'),l=q.querySelector('[name = "sort"]');""!==r.value&&"Укажите название"!==r.value?(""!==o.value&&(n[i].query=o.value),n[i].name=r.value,n[i].maxResults=t.value,n[i].order=l.value,document.getElementById(i).querySelector("p").textContent=r.value,q.classList.remove("active"),p.classList.remove("active"),m("Изменения применены!",document.getElementById(i)),v()):(r.value="",r.focus(),m("Пожалуйста, введите имя запроса",document.querySelector("#unlogin")))}),function(){const e=document.querySelector(".form--search-video");e.addEventListener("submit",t=>{t.preventDefault(),r.innerHTML="";let o=document.querySelector(".search-video__input"),n=document.querySelector(".filter-panel");if(""!==o.value){if(o=o.value.replace(/ /g,"+"),e.getBoundingClientRect().y>150){let t=0,o=0;const l=setInterval(()=>{e.style.top=-o+"px",document.querySelector(".page-title").style.top=-o+"px",r.style.top=-o+"px",n.style.top=-o+"px",e.getBoundingClientRect().y<=150&&(clearInterval(l),r.classList.add("loaded"),n.classList.add("loaded")),t+=.25,o=Math.pow(t,2)},10);o=null,t=null}y(o,12,"date")}else m("Введите пожалуйста запрос.",document.querySelector(".input-heart"))})}()}function d(){if(localStorage[s]){const e=JSON.parse(localStorage[s]);c=e.length,n=[...e],document.querySelector(".fav__items").innerHTML="",n.forEach((e,t)=>{e.id=t,document.querySelector(".fav__items").insertAdjacentHTML("afterbegin",`<li class="fav__item" id = "${t}">\n          <p>${e.name}</p>\n          <div class = "item__control">\n              <span class = "item__change">Изменить</span>\n              <span class = "item__delete">Удалить</span>\n          </div>\n      </li>`),document.querySelector(".fav__items").querySelector("li").addEventListener("click",e=>{if("LI"===e.target.tagName){const t=e.target.closest("li").id;document.querySelector(".nav__item").click(),r.innerHTML="",document.querySelector(".form--search-video").getBoundingClientRect().y>150&&(document.querySelector(".form--search-video").style.top="-150px",document.querySelector(".page-title").style.top="-150px",r.style.top="-150px",document.querySelector(".filter-panel").style.top="-150px",r.classList.add("loaded"),document.querySelector(".filter-panel").classList.add("loaded")),y(n[t].query.replace(/ /g,"+"),n[t].maxResults,"none"===n[t].order?"relevance":n[t].order)}}),document.querySelector(".fav__items").querySelector(".item__change").addEventListener("click",e=>{document.querySelector(".modal--edit").querySelector('[name = "query"]').disabled=!1,i=e.target.closest("li").id,document.querySelector(".modal--edit").querySelector('[type = "range"]').value=n[i].maxResults,document.querySelector(".modal--edit").querySelector('[name = "name"]').value=n[i].name,document.querySelector(".modal--edit").querySelector('[name = "query"]').value=n[i].query,document.querySelector(".modal--edit").querySelector('[name = "sort"]').value=n[i].order,document.querySelector(".modal--edit").querySelector("span").textContent=n[i].maxResults,document.querySelector(".modal--edit").classList.add("active"),document.querySelector(".backdrop").classList.toggle("active")}),document.querySelector(".fav__items").querySelector(".item__delete").addEventListener("click",e=>{let t=e.target.closest("li").id;n.splice(t,1),e.target.closest("li").remove(),v()})})}}function m(e,t){const r=document.querySelector(".nav__items"),o=t.getBoundingClientRect().x,n=t.getBoundingClientRect().y,a=t.scrollTop;if(!1===l){l=!0,document.body.insertAdjacentHTML("beforeend",`\n    <div class = "float-window">\n      ${e}\n    </div>\n  `);const t=setTimeout(()=>{document.querySelectorAll(".float-window").forEach(e=>e.remove()),l=!1},4e3),c=document.querySelector(".float-window");c.style.top=n+25+a+"px",c.style.left=o+"px",c.addEventListener("click",e=>{"P"===e.target.tagName&&r.querySelector("li:last-of-type").click(),c.remove(),clearTimeout(t),l=!1},!1)}}function y(e,t,n){let l=new XMLHttpRequest,a=`https://www.googleapis.com/youtube/v3/search?part=snippet&order=${n}&key=AIzaSyBdAEGL07hs4xeWbnhQ8PJGbTuTwy-PkKk`;a+=`&maxResults=${t}&q=${e}`,o=new URL(a),l.open("GET",a),l.responseType="json",l.send(),l.onload=function(){try{let t=l.response.items;document.querySelector(".filter-panel__queryName").innerHTML=`Видео по запросу "<b>${e.replace(/\+/," ")}</b>"`,document.querySelector(".filter-panel__querysAmount").textContent=`${l.response.pageInfo.totalResults}`;for(let e of t)r.insertAdjacentHTML("beforeend",`\n              <li class = "video__item">\n                <a href = "https://www.youtube.com/watch?v=${e.id.videoId}">\n                <img class = "video__image" src = https://i1.ytimg.com/vi/${e.id.videoId}/sddefault.jpg>\n                <h3 class = "video__title">${e.snippet.title}</h3>\n                <p class = "video__channel">${e.snippet.channelTitle}</p>\n                </a>              \n              </li>\n            \n          `)}catch(e){alert(e)}}}function v(){localStorage[s]=JSON.stringify(n),d()}!function(){const e=document.querySelector(".login-form"),t=document.querySelector("#login"),r=document.querySelector("#password");let o=new XMLHttpRequest;o.open("GET","logins.json"),o.responseType="json",o.send(),o.onload=function(){const n=o.response,l=document.createElement("div");e.appendChild(l),n.find(o=>{localStorage.token&&localStorage.token==o.login+localStorage.getItem("rand")?(e.remove(),s=o.login,u()):e.addEventListener("submit",n=>{if(n.preventDefault(),t.value===o.login&&r.value===o.password){e.remove();const t=Math.random();localStorage.rand=t,localStorage.token=o.login+t,s=o.login,u()}else l.innerHTML="",l.innerHTML='\n              <p style = "color: red; margin-top: 1rem">Неправильный логин или пароль</p>\n            '})})}}()}]);