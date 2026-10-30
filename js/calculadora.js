/*! © AurevixWeb. Todos los derechos reservados. Prohibida la copia o reutilización sin autorización. */
import{CONFIG as o}from"../config.js";import{planesActivos as N,extrasActivos as O}from"./sitio.js";import{esc as d,euros as i,desgloseIVA as U,ivaTexto as S,icono as y,toast as V,contarEvento as q}from"./ui.js";import{IDIOMA as j}from"./idioma.js";const f=()=>matchMedia("(prefers-reduced-motion: reduce)").matches||document.documentElement.dataset.movimiento==="reducido",G=j==="en"?"en-GB":"es-ES",D=p=>p.toLocaleDateString(G,{day:"numeric",month:"long"}),E=p=>{const h=new Date;return h.setDate(h.getDate()+p),h};export function montarCalculadora(p,{bienvenida:h=!1}={}){const m=N(),$=O();if(!m.length){p.closest("section")?.remove();return}const l={plan:(m.find(e=>e.popular)||m[0]).id,extras:new Set,urgente:!1,bv:!1},M=Math.round(o.urgente*100),R=o.pagos?.bizum?"Bizum o transferencia":"Transferencia bancaria";p.innerHTML=`
    <div class="calc-form">
      <fieldset class="calc-g"><legend><span class="calc-n">1</span>Tipo de web</legend>
        <div class="calc-planes" role="radiogroup" aria-label="Tipo de web">${m.map(e=>`
          <label class="calc-plan"><input type="radio" name="calcPlan" value="${d(e.id)}"${e.id===l.plan?" checked":""}>
            <span class="cp-in"><span class="cp-ic">${y(e.icono||"laptop")}</span><b>${d(e.nombre)}</b><span class="cp-pr">${i(e.precio)}</span><small>${d(e.entrega||"")}</small></span>
          </label>`).join("")}
        </div>
        <div class="calc-detalle" id="calcDetalle" aria-live="polite"></div>
      </fieldset>
      ${$.length?`<fieldset class="calc-g"><legend><span class="calc-n">2</span>Extras <small>opcionales</small></legend>
        <div class="calc-extras">${$.map(e=>`
          <label class="calc-sw"><input type="checkbox" role="switch" name="calcExtra" value="${d(e.id)}">
            <span class="sw-tx"><b>${d(e.nombre)}</b>${e.desc?`<small>${d(e.desc)}</small>`:""}</span>
            <span class="sw-pr">${e.mensual?`${i(e.precio)}/mes`:`+${i(e.precio)}`}</span>
            <span class="sw-ui" aria-hidden="true"><i></i></span>
          </label>`).join("")}
        </div></fieldset>`:""}
      <fieldset class="calc-g"><legend><span class="calc-n">${$.length?3:2}</span>¿Para cuándo la necesitas?</legend>
        <div class="calc-plazo" role="radiogroup" aria-label="Plazo de entrega">
          <i class="cpz-pastilla" aria-hidden="true"></i>
          <label><input type="radio" name="calcPlazo" value="normal" checked><span><b>Plazo normal</b><small id="calcFechaN"></small></span></label>
          <label><input type="radio" name="calcPlazo" value="urgente"><span><b>Urgente <em>+${M} %</em></b><small id="calcFechaU"></small></span></label>
        </div>
        ${h?`<label class="calc-sw calc-bv"><input type="checkbox" role="switch" id="calcBv">
          <span class="sw-tx"><b>Es mi primera web con vosotros</b><small>Descuento de bienvenida en tu primer pedido</small></span>
          <span class="sw-pr">−${o.bienvenida.pct} %</span>
          <span class="sw-ui" aria-hidden="true"><i></i></span>
        </label>`:""}
      </fieldset>
      <div class="calc-barra" id="calcBarra">
        <span><small>Total</small><b id="calcBarraTotal"></b></span>
        <a href="#calcRes" class="btn btn-primary btn-sm">Ver presupuesto</a>
      </div>
    </div>
    <aside class="calc-res" id="calcRes" aria-labelledby="calcResT">
      <div class="calc-ticket">
        <p class="calc-etq" id="calcResT">Tu presupuesto</p>
        <ul class="calc-lineas" id="calcLineas"></ul>
        <div class="calc-total">
          <span>Total</span>
          <b id="calcTotal" aria-live="polite"></b>
        </div>
        <p class="calc-mes" id="calcMes"></p>
        <p class="calc-iva" id="calcIva"></p>
      </div>
      <div class="calc-pago">
        <div class="cpg-barra" aria-hidden="true"><i id="calcBarSenal"></i></div>
        <div class="cpg-filas">
          <div><small>Hoy, para empezar (${o.senal} %)</small><b id="calcSenal"></b></div>
          <div><small>Al entregarte la web</small><b id="calcResto"></b></div>
        </div>
        <p class="cpg-fecha">${y("calendar")}<span>Entrega estimada: <b id="calcFecha"></b></span></p>
      </div>
      <button type="button" class="btn btn-primary w100" id="calcBtn"><span>${o.aceptarPedidos?"Pedir esta web":"Apuntarme a la lista de espera"}</span></button>
      <button type="button" class="btn btn-ghost w100 calc-pdf" id="calcPdf">${y("download")}<span>Descargar presupuesto (PDF)</span></button>
      <p class="calc-nota">Precio final. ${R}. 14 días para desistir.</p>
    </aside>`;const c=e=>p.querySelector(e),F=c("#calcLineas"),H=e=>{const a=new Map([...F.children].filter(t=>!t.classList.contains("sale")).map(t=>[t.dataset.k,t]));let n=null;for(const t of e){let s=a.get(t.k);s?(a.delete(t.k),s.querySelector("span").textContent=t.t,s.querySelector("b").textContent=t.v):(s=document.createElement("li"),s.dataset.k=t.k,t.cls&&(s.className=t.cls),s.innerHTML=`<span>${d(t.t)}</span><b>${d(t.v)}</b>`,f()||s.classList.add("entra"),n?n.after(s):F.prepend(s),f()||requestAnimationFrame(()=>requestAnimationFrame(()=>s.classList.remove("entra")))),n=s}a.forEach(t=>{if(f())return t.remove();t.classList.add("sale"),t.addEventListener("transitionend",()=>t.remove(),{once:!0}),setTimeout(()=>t.remove(),400)})};let v=null,k=0;const z=(e,a)=>{if(cancelAnimationFrame(k),v===null||f()){v=a,e.textContent=i(a);return}const n=v,t=performance.now(),s=380,g=w=>{const b=Math.min(1,(w-t)/s),u=1-Math.pow(1-b,4);v=n+(a-n)*u,e.textContent=i(b<1?Math.round(v):a),b<1?k=requestAnimationFrame(g):v=a};k=requestAnimationFrame(g)};let A=null;const B=()=>{const e=m.find(r=>r.id===l.plan)||m[0],a=$.filter(r=>l.extras.has(r.id)),n=e.precio,t=l.urgente?n*o.urgente:0,s=a.filter(r=>!r.mensual).reduce((r,P)=>r+P.precio,0),g=a.filter(r=>r.mensual).reduce((r,P)=>r+P.precio,0),w=n+t+s,b=l.bv?Math.round(w*o.bienvenida.pct)/100:0,u=Math.round((w-b)*100)/100,x=Math.round(u*o.senal)/100,L=e.dias||14,T=Math.round(L*.6);A={plan:e,extras:a,urgente:l.urgente,pctUrgente:M,recargo:t,descuento:b,pctDescuento:o.bienvenida?.pct,total:u,senal:x,resto:Math.round((u-x)*100)/100,mensual:g,entrega:E(l.urgente?T:L)},H([{k:"plan",t:e.nombre,v:i(n)},...a.filter(r=>!r.mensual).map(r=>({k:"x-"+r.id,t:r.nombre,v:"+"+i(r.precio)})),...t?[{k:"urg",t:`Entrega urgente (+${M} %)`,v:"+"+i(t)}]:[],...b?[{k:"bv",t:`Bienvenida (−${o.bienvenida.pct} %)`,v:"−"+i(b),cls:"dto"}]:[]]),z(c("#calcTotal"),u),c("#calcBarraTotal").textContent=i(u),c("#calcMes").textContent=g?`+ ${i(g)}/mes de cuotas`:"";const C=U(u);c("#calcIva").textContent=o.iva?`${S()} · base ${i(C.base)} + IVA ${C.pct} % ${i(C.cuota)}`:S(),c("#calcSenal").textContent=i(x),c("#calcResto").textContent=i(Math.round((u-x)*100)/100),c("#calcBarSenal").style.setProperty("--p",`${o.senal}%`),c("#calcFechaN").textContent=`Hacia el ${D(E(L))}`,c("#calcFechaU").textContent=`Hacia el ${D(E(T))}`,c("#calcFecha").textContent=D(E(l.urgente?T:L)),p.querySelector(".calc-plazo").dataset.v=l.urgente?"urgente":"normal"},I=()=>{const e=m.find(t=>t.id===l.plan)||m[0],a=c("#calcDetalle"),n=`<p>${d(e.desc||"")}</p>${e.incluye?.length?`<ul>${e.incluye.map(t=>`<li>${y("check")}<span>${d(t)}</span></li>`).join("")}</ul>`:""}`;if(f()||!a.innerHTML){a.innerHTML=n;return}a.classList.add("cambia"),setTimeout(()=>{a.innerHTML=n,a.classList.remove("cambia")},140)};if(p.addEventListener("change",e=>{q("calculadora");const a=e.target;a.name==="calcPlan"?(l.plan=a.value,I()):a.name==="calcExtra"?a.checked?l.extras.add(a.value):l.extras.delete(a.value):a.name==="calcPlazo"?l.urgente=a.value==="urgente":a.id==="calcBv"&&(l.bv=a.checked),B()}),c("#calcBtn").addEventListener("click",()=>{document.dispatchEvent(new CustomEvent("aurevix:pedir",{detail:{plan:l.plan,urgente:l.urgente,extras:[...l.extras]}}))}),c("#calcPdf").addEventListener("click",async e=>{const a=e.currentTarget,n=a.querySelector("span"),t=n.textContent;a.disabled=!0,n.textContent="Preparando el PDF…";try{await(await import("./presupuesto.js")).descargarPresupuesto(A),q("presupuesto")}catch(s){V(s.message||"No se ha podido crear el PDF","err")}a.disabled=!1,n.textContent=t}),c(".calc-barra a").addEventListener("click",e=>{e.preventDefault(),c("#calcRes").scrollIntoView({behavior:f()?"auto":"smooth",block:"start"})}),"IntersectionObserver"in window){const e=c("#calcBarra"),a={form:!1,res:!1},n=()=>{const t=a.form&&!a.res;e.classList.toggle("oculta",!t),document.documentElement.classList.toggle("con-calc",t&&matchMedia("(max-width:960px)").matches)};new IntersectionObserver(t=>{t.forEach(s=>{a[s.target===c("#calcRes")?"res":"form"]=s.isIntersecting}),n()},{rootMargin:"0px 0px -30% 0px"}).observe(c("#calcRes")),new IntersectionObserver(t=>{a.form=t[0].isIntersecting,n()}).observe(c(".calc-form"))}I(),B()}
