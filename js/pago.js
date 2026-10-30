/*! © AurevixWeb. Todos los derechos reservados. Prohibida la copia o reutilización sin autorización. */
import{CONFIG as l}from"../config.js";import*as E from"./store.js";import{etapaDe as P}from"./proyecto.js";import{$ as d,esc as r,euros as u,icono as i,abrir as z,toast as y,ocupado as h,campo as C,selectorEstrellas as k,mailLink as B,refPedido as H,PAGOS as N}from"./ui.js";const g=l.pagos||{};export const importeSenal=a=>Math.round((a.total||0)*l.senal)/100,importeResto=a=>Math.round(((a.total||0)-importeSenal(a))*100)/100;export function faseDePago(a){const e=a.pagoEstado||"pendiente";return a.estado==="cancelado"?null:e==="pendiente"?"senal":e==="senal"&&(a.estado==="entregado"||["pago","publicada"].includes(P(a)))?"resto":null}export function botonPago(a){const e=faseDePago(a);if(!e){const t=N[a.pagoEstado||"pendiente"];return`<span class="pill ${t.cls}">${t.txt}</span>`}const s=e==="senal"?importeSenal(a):importeResto(a);return`
  <button type="button" class="pay-cta" data-pagar="${r(a.id)}" data-fase="${e}" aria-label="Pagar ${e==="senal"?"señal":"resto"} de ${u(s)}">
    <span class="left-side">
      <span class="pc-card"><span class="pc-card-line"></span><span class="pc-buttons"></span></span>
      <span class="pc-post"><span class="pc-post-line"></span><span class="pc-screen"><span class="pc-euro">€</span></span><span class="pc-numbers"></span><span class="pc-numbers2"></span></span>
    </span>
    <span class="right-side">
      <span><small>${e==="senal"?`Pagar señal · ${l.senal} %`:"Pagar el resto"}</small><b>${u(s)}</b></span>
      <svg viewBox="0 0 451.846 451.847" class="arrow" aria-hidden="true"><path d="M345.441 248.292L151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373z"/></svg>
    </span>
  </button>`}function A(){const a=[];return g.bizum&&a.push({id:"bizum",nombre:"Bizum",icono:"phone",sub:"Al momento"}),g.iban&&a.push({id:"transferencia",nombre:"Transferencia",icono:"bank",sub:"En 1 día hábil"}),a}const $=(a,e,s=e)=>`<div class="pay-row"><span>${r(a)}</span><b>${r(e)}</b>${s?`<button type="button" class="icon-btn sm" data-copy="${r(s)}" aria-label="Copiar ${r(a)}">${i("copy")}</button>`:""}</div>`;let c;function D(){c=document.createElement("dialog"),c.className="dlg",c.id="pagoDlg",c.setAttribute("aria-labelledby","pagoTit"),c.innerHTML=`<div class="dlg-box pago"><button class="dlg-x" data-close aria-label="Cerrar">${i("x")}</button><div id="pagoBody"></div></div>`,document.body.appendChild(c)}export function abrirPago(a,e=faseDePago(a),s=()=>{}){if(!e)return;c||D();const t=e==="senal"?importeSenal(a):importeResto(a),m=H(a.id),v=`${m} ${a.respuestas?.negocio||""}`.trim().slice(0,35),f=A(),p=document.createElement("div");d("#pagoBody",c).replaceChildren(p),p.innerHTML=`
    <h2 class="dlg-h" id="pagoTit">${e==="senal"?"Pagar la señal":"Pagar el resto"}</h2>
    <p class="muted pago-sub">${r(a.planNombre)} · ${r(a.respuestas?.negocio||"")} · ${m}</p>
    <div class="pago-total">
      <small>${e==="senal"?`Señal (${l.senal} % del total)`:"Pago final"}</small>
      <b>${u(t)}</b>
      <span>IVA incluido · total del proyecto ${u(a.total||0)}</span>
    </div>
    ${f.length>1?`<div class="pay-metodos" role="radiogroup" aria-label="Forma de pago">${f.map((o,n)=>`
      <label class="pay-met"><input type="radio" name="metodo" value="${o.id}" ${n?"":"checked"}><span>${i(o.icono)}<b>${o.nombre}</b><small>${o.sub}</small></span></label>`).join("")}</div>`:""}
    <div id="pagoDetalle"></div>`;const T=o=>{const n=d("#pagoDetalle",p);o==="bizum"?n.innerHTML=`
      <p class="pay-how">${i("phone")}<span>Abre la app de tu banco → <b>Bizum</b> → <b>Enviar dinero</b> y usa estos datos. Toca el botón de cada uno para copiarlo.</span></p>
      <div class="pay-detail">${$("Teléfono",g.bizum,g.bizum.replace(/\s/g,""))}${$("Importe",u(t),String(t).replace(".",","))}${$("Concepto",v)}</div>
      <p class="muted pago-nota">Escribe el concepto tal cual: así sabemos de quién es el pago. Bizum llega al momento y no tiene comisiones.</p>
      <button class="btn btn-primary w100" id="pagoOk" type="button" data-metodo="bizum"><span>Ya he hecho el Bizum</span></button>`:o==="transferencia"?n.innerHTML=`
      <p class="pay-how">${i("bank")}<span>Haz una <b>transferencia bancaria</b> desde la app o la web de tu banco con estos datos. Toca el botón de cada uno para copiarlo.</span></p>
      <div class="pay-detail">${$("IBAN",g.iban,g.iban.replace(/\s/g,""))}${$("Titular",g.titular,"")}${$("Importe",u(t),String(t).replace(".",","))}${$("Concepto",v)}</div>
      <p class="muted pago-nota">Escribe el concepto tal cual: así sabemos de quién es el pago. Entre bancos españoles suele llegar en un día hábil (al momento si haces una transferencia inmediata). Sin comisiones por nuestra parte.</p>
      <button class="btn btn-primary w100" id="pagoOk" type="button" data-metodo="transferencia"><span>Ya he hecho la transferencia</span></button>`:n.innerHTML='<div class="empty"><b>Aún no tenemos los datos de pago configurados</b><p>Escríbenos y te los enviamos.</p></div>'};T(f[0]?.id),p.addEventListener("change",o=>{o.target.name==="metodo"&&T(o.target.value)}),p.addEventListener("click",async o=>{const n=o.target.closest("#pagoOk");if(!n)return;const L=n.dataset.metodo;h(n,!0);try{const x=await E.avisarPago(a.id,{metodo:L,fase:e});Object.assign(a,x);const w=L==="bizum"?"el Bizum":"la transferencia",M=`Hola, acabo de hacer ${w} de ${e==="senal"?"la señal":"el resto"} (${u(t)}) del pedido ${m}. Adjunto el justificante.`;p.innerHTML=`
        <div class="exito">
          <div class="ok-ic">${i("check")}</div>
          <h3>Aviso de pago recibido</h3>
          <p class="muted">Gracias. En cuanto nos llegue ${w} de <b>${u(t)}</b> lo confirmamos, lo verás en «Mis proyectos» y te llegará el recibo por correo.</p>
          <a class="btn btn-ghost w100" href="${B(`Justificante de pago ${m}`,M)}">${i("mail")} Enviar justificante por correo</a>
          <p class="muted" style="font-size:13px;margin:-4px 0 12px">También puedes subir el justificante en la pestaña «Archivos» de tu proyecto.</p>
          <button class="btn btn-ghost w100" data-close type="button">Cerrar</button>
        </div>`,s(a)}catch(x){y(x.message||"No se pudo avisar del pago","err"),h(n,!1)}}),z(c)}let b;export function abrirResena(a,e=()=>{}){b||(b=document.createElement("dialog"),b.className="dlg dlg-sm",b.id="resenaDlg",b.innerHTML=`<div class="dlg-box"><button class="dlg-x" data-close aria-label="Cerrar">${i("x")}</button><div id="resenaBody"></div></div>`,document.body.appendChild(b));const s=d("#resenaBody",b);s.innerHTML=`
    <h2 class="dlg-h">¿Qué tal tu web?</h2>
    <p class="muted" style="margin:-10px 0 18px;font-size:14.5px">${r(a.respuestas?.negocio||a.planNombre)} · tu opinión ayuda a otros clientes.</p>
    <form id="resenaForm" novalidate>
      <div class="rating-wrap">${k("estrellas")}</div>
      ${C({id:"resTexto",name:"texto",label:"Cuéntanos tu experiencia",type:"textarea",required:!0,attrs:'maxlength="400"'})}
      <button class="btn btn-primary w100" type="submit"><span>Publicar opinión</span></button>
      <p class="muted" style="font-size:12.5px;text-align:center;margin-top:10px">Se publicará en la web cuando la revisemos.</p>
    </form>`,z(b),d("#resenaForm",s).addEventListener("submit",async t=>{t.preventDefault();const m=Number(d("input[name=estrellas]:checked",s)?.value||0),v=d("#resTexto",s).value.trim();if(!m)return y("Elige de 1 a 5 estrellas","err");if(v.length<5)return d("#resTexto",s).closest(".fc").classList.add("error"),y("Escribe unas palabras","err");const f=d("button[type=submit]",s);h(f,!0);try{await E.crearResena({estrellas:m,texto:v,plan:a.planNombre,pedidoId:a.id}),a.resenada=!0,s.innerHTML=`
        <div class="exito">
          <div class="ok-ic">${i("star")}</div>
          <h3>Gracias por tu valoración</h3>
          <p class="muted">La publicaremos en la web después de revisarla.</p>
          ${l.trustpilot||l.dominio?`<p class="muted" style="margin-bottom:14px">¿Nos ayudas un poco más? Copia tu opinión y pégala también en Trustpilot: es lo que miran otros clientes antes de decidirse.</p>
          <a class="btn btn-primary w100" href="${r(l.dominio?`https://es.trustpilot.com/evaluate/${l.dominio}`:l.trustpilot)}" target="_blank" rel="noopener" data-copy="${r(v)}">${i("star")}<span>Opinar también en Trustpilot</span></a>`:""}
          <button class="btn btn-ghost w100" data-close type="button">Cerrar</button>
        </div>`,e(a)}catch(p){y(p.message||"No se pudo enviar","err"),h(f,!1)}})}export function animarYPagar(a,e){if(a.classList.contains("play"))return;a.classList.add("play");const s=matchMedia("(prefers-reduced-motion: reduce)").matches;setTimeout(()=>{a.classList.remove("play"),e()},s?0:1300)}
