/*! © AurevixWeb. Todos los derechos reservados. Prohibida la copia o reutilización sin autorización. */
import{CONFIG as b}from"../config.js";import*as m from"./store.js";import{$ as g,$$ as T,esc as n,euros as x,fecha as A,haceCuanto as z,icono as f,toast as $,ocupado as E,tamano as C,refPedido as L,avatar as I,PAGOS as k,METODOS as D,errorCarga as M,desgloseIVA as H}from"./ui.js";const R=["Hola, ¿cómo estás? Te escribo para ponerte al día de tu web.","Ya hemos recibido el contenido. Empezamos con el diseño.","La vista previa está lista. Ábrela en «Mis proyectos» y dinos qué te parece.","¿Me confirmas el horario y la dirección exactos para ponerlos en la web?","Hemos aplicado los cambios que nos pediste.","Nos falta el logotipo en buena calidad. ¿Puedes subirlo en «Archivos»?","Tu web ya está publicada. ¡Gracias por confiar en nosotros!"],q=e=>n(e).replace(/(https?:\/\/[^\s<]+)/g,'<a href="$1" target="_blank" rel="noopener">$1</a>').replace(/\n/g,"<br>");function N(e,d){const c=e.uid===d;return`<div class="hm ${c?"yo":"el"} ${e.rol==="client"?"cli":"eq"}" data-mid="${n(e.id)}">
    ${c?"":I({name:e.autor||"?"},"sm")}
    <div class="hm-b"><small>${c?"Tú":n(e.autor||"")}${e.rol&&e.rol!=="client"&&!c?" · Equipo":""} · ${z(e.createdAt)}</small><p>${q(e.texto)}</p></div>
  </div>`}export function montarHilo(e,d,{equipo:c=!1}={}){const v=m.usuarioActual();e.innerHTML=`
    <div class="hilo">
      <div class="hilo-msgs" aria-live="polite"><div class="hilo-carga">${f("message")} Cargando mensajes…</div></div>
      ${c?`<details class="hilo-rapidas"><summary>${f("reply")} Respuestas rápidas</summary><div>${R.map(o=>`<button type="button">${n(o)}</button>`).join("")}</div></details>`:""}
      <form class="hilo-form" autocomplete="off">
        <textarea rows="1" maxlength="2000" placeholder="${c?"Escribe al cliente…":"Escribe al equipo…"}" aria-label="Mensaje"></textarea>
        <button class="chat-send" aria-label="Enviar">${f("send")}</button>
      </form>
      <p class="hilo-nota">${c?"El cliente recibe un aviso con cada mensaje.":`El equipo recibe un aviso con cada mensaje. ${n(b.respuesta)}.`}</p>
    </div>`;const u=g(".hilo-msgs",e),r=g(".hilo-form",e),s=g("textarea",r);let l=[];const h=()=>{u.innerHTML=l.length?l.map(o=>N(o,v.uid)).join(""):`<div class="hilo-vacio">${f("message")}<b>Aún no hay mensajes</b><small>${c?"Escribe al cliente para ponerle al día.":"Escríbenos cualquier duda sobre tu web. Te contestamos aquí mismo."}</small></div>`,u.scrollTop=u.scrollHeight},i=()=>{u.innerHTML=`<div class="hilo-carga">${f("message")} Cargando mensajes…</div>`,m.mensajesDe(d.id).then(o=>{l=o,h()}).catch(o=>M(u,o,i,"No se han podido cargar los mensajes"))};i();const t=m.escucharMensajes(d.id,o=>{l.some(p=>p.id===o.id)||(l.push(o),h())}),a=m.modoDemo?setInterval(async()=>{if(!e.isConnected)return clearInterval(a);const o=await m.mensajesDe(d.id).catch(()=>l);o.length!==l.length&&(l=o,h())},5e3):0;return s.addEventListener("input",()=>{s.style.height="auto",s.style.height=Math.min(s.scrollHeight,160)+"px"}),s.addEventListener("keydown",o=>{o.key==="Enter"&&!o.shiftKey&&matchMedia("(hover: hover)").matches&&(o.preventDefault(),r.requestSubmit())}),r.addEventListener("submit",async o=>{o.preventDefault();const p=s.value.trim();if(!p)return;const y=g("button",r);E(y,!0);try{const w=await m.enviarMensaje(d.id,p);l.some(j=>j.id===w.id)||l.push(w),s.value="",s.style.height="",h()}catch(w){$(w.message,"err")}E(y,!1)}),g(".hilo-rapidas",e)?.addEventListener("click",o=>{const p=o.target.closest("button");p&&(s.value=p.textContent,s.focus(),s.dispatchEvent(new Event("input")),g(".hilo-rapidas",e).open=!1)}),()=>{t(),clearInterval(a)}}const P=e=>/^image\//.test(e.tipo)||/\.(png|jpe?g|webp|gif|avif|svg)$/i.test(e.nombre);export function montarArchivos(e,d,{equipo:c=!1}={}){e.innerHTML=`
    <div class="arch">
      <label class="arch-drop">
        <input type="file" multiple hidden>
        <span class="arch-ic">${f("upload")}</span>
        <b>Sube fotos, logotipo o documentos</b>
        <small>Pulsa o arrastra aquí los archivos · hasta 25 MB cada uno</small>
      </label>
      <div class="arch-prog" hidden><i></i><span></span></div>
      <div class="arch-list"><div class="hilo-carga">${f("folder")} Cargando archivos…</div></div>
    </div>`;const v=g(".arch-list",e),u=g("input",e),r=g(".arch-drop",e),s=g(".arch-prog",e);async function l(){let i=[];try{i=await m.listarArchivos(d.id)}catch(t){M(v,t,()=>{v.innerHTML=`<div class="hilo-carga">${f("folder")} Cargando archivos…</div>`,l()},"No se han podido cargar los archivos");return}if(!i.length){v.innerHTML=`<div class="hilo-vacio">${f("image")}<b>No hay archivos todavía</b><small>${c?"Cuando el cliente suba archivos aparecerán aquí.":"Sube aquí las fotos de tu negocio, tu logotipo o cualquier documento que necesitemos."}</small></div>`;return}v.innerHTML=`<div class="arch-grid">${i.map((t,a)=>`
      <div class="arch-it" data-i="${a}">
        <div class="arch-th">${P(t)?`<img alt="" loading="lazy" data-src-i="${a}">`:f("file")}</div>
        <div class="arch-tx"><b title="${n(t.nombre)}">${n(t.nombre)}</b><small>${C(t.tam)} · ${A(t.t)}</small></div>
        <div class="arch-btns">
          <button type="button" class="icon-btn sm" data-abrir="${a}" aria-label="Abrir">${f("external")}</button>
          <button type="button" class="icon-btn sm" data-borrar="${a}" aria-label="Borrar">${f("trash")}</button>
        </div>
      </div>`).join("")}</div>`,T("img[data-src-i]",v).forEach(async t=>{try{t.src=await m.urlArchivo(i[+t.dataset.srcI])}catch{}}),v.onclick=async t=>{const a=t.target.closest("[data-abrir]"),o=t.target.closest("[data-borrar]");if(a)try{const p=await m.urlArchivo(i[+a.dataset.abrir]);window.open(p,"_blank","noopener")}catch(p){$(p.message,"err")}if(o){const p=i[+o.dataset.borrar];if(!confirm(`¿Borrar «${p.nombre}»?`))return;try{await m.borrarArchivo(p),$("Archivo borrado"),l()}catch(y){$(y.message,"err")}}}}async function h(i){if(i=[...i],!i.length)return;s.hidden=!1;let t=0,a=0;for(const o of i){g("span",s).textContent=`Subiendo ${t+1} de ${i.length}: ${o.name}`,g("i",s).style.width=`${t/i.length*100}%`;try{await m.subirArchivo(d.id,o)}catch(p){a++,$(p.message,"err")}t++}g("i",s).style.width="100%",setTimeout(()=>s.hidden=!0,600),t-a&&($(`${t-a} archivo${t-a===1?"":"s"} subido${t-a===1?"":"s"}`,"ok"),m.enviarMensaje(d.id,`${c?"Hemos subido":"He subido"} ${t-a} archivo${t-a===1?"":"s"} en «Archivos».`).catch(()=>{})),u.value="",l()}u.addEventListener("change",()=>h(u.files)),["dragenter","dragover"].forEach(i=>r.addEventListener(i,t=>{t.preventDefault(),r.classList.add("over")})),["dragleave","drop"].forEach(i=>r.addEventListener(i,t=>{t.preventDefault(),r.classList.remove("over")})),r.addEventListener("drop",i=>h(i.dataTransfer.files)),l()}export async function descargarArchivosCliente(e,d){E(d,!0);try{const c=await m.listarArchivos(e.id);if(!c.length){$("El cliente todavía no ha subido archivos");return}const{crearZip:v}=await import("./zip.js"),u=new Set,r=[];for(const h of c){let i=h.nombre,t=1;for(;u.has(i);)i=h.nombre.replace(/(\.[^.]+)?$/,o=>`-${++t}${o}`);u.add(i);const a=await fetch(await m.urlArchivo(h));if(!a.ok)throw new Error(`No se ha podido descargar «${h.nombre}»`);r.push({nombre:i,datos:await a.arrayBuffer()})}const s=URL.createObjectURL(new Blob([v(r)],{type:"application/zip"})),l=Object.assign(document.createElement("a"),{href:s,download:`archivos-${L(e.id).slice(1)}.zip`});document.body.appendChild(l),l.click(),l.remove(),setTimeout(()=>URL.revokeObjectURL(s),4e3),$(`${r.length} archivo${r.length===1?"":"s"} descargado${r.length===1?"":"s"}`,"ok")}catch(c){$(c.message,"err")}finally{E(d,!1)}}export async function abrirRecibo(e,d){const c=Math.round((e.total||0)*b.senal)/100,v=d==="senal"?c:d==="resto"?(e.total||0)-c:e.total||0,u=d==="senal"?`Señal (${b.senal} %)`:d==="resto"?"Pago final":"Total del proyecto";let r={};try{m.usuarioActual()?.uid===e.uid&&(r=await m.leerPrivado())}catch{}const s=b.legal||{},l=`${new Date(e.createdAt).getFullYear()}-${L(e.id).slice(1)}${d==="resto"?"-2":d==="senal"?"-1":""}`,h=[[e.planNombre,e.precioBase],...(e.extras||[]).map(a=>[a.nombre+(a.mensual?" (cuota mensual, aparte)":""),a.mensual?0:a.precio]),...e.urgente?[["Entrega urgente",(e.total||0)-(e.precioBase||0)-(e.extras||[]).filter(a=>!a.mensual).reduce((a,o)=>a+o.precio,0)+(e.descuento||0)]]:[],...e.descuento?[[`Descuento ${e.cupon?"("+e.cupon+")":""}`,-e.descuento]]:[]],i=`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Recibo ${l} · ${n(b.marca)}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    *{box-sizing:border-box;margin:0;padding:0}body{font:15px/1.5 system-ui,-apple-system,Segoe UI,sans-serif;color:#16161b;background:#f3f2ee;padding:24px}
    .doc{max-width:760px;margin:0 auto;background:#fff;border-radius:16px;padding:44px;box-shadow:0 10px 40px rgba(0,0,0,.08)}
    header{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;border-bottom:2px solid #16161b;padding-bottom:20px;margin-bottom:26px}
    header img{height:22px;margin-top:8px}.logo{display:flex;align-items:center;gap:10px}.logo img:first-child{height:44px;margin:0}
    h1{font-size:26px;letter-spacing:-.02em}.meta{text-align:right;font-size:13.5px;color:#55534c}
    .cols{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:26px;font-size:14px}.cols small{display:block;text-transform:uppercase;letter-spacing:.08em;font-size:11px;color:#86837c;margin-bottom:4px}
    table{width:100%;border-collapse:collapse;font-size:14.5px}th{text-align:left;font-size:11.5px;text-transform:uppercase;letter-spacing:.08em;color:#86837c;border-bottom:1px solid #ddd;padding:8px 0}
    td{padding:10px 0;border-bottom:1px solid #eee}td:last-child,th:last-child{text-align:right}
    .tot{margin-top:18px;display:grid;gap:6px;justify-content:end;font-size:14.5px}.tot div{display:flex;gap:40px;justify-content:space-between}
    .tot .big{font-size:20px;font-weight:700;border-top:2px solid #16161b;padding-top:8px;margin-top:4px}
    .estado{display:inline-block;margin-top:6px;padding:3px 10px;border-radius:99px;background:#eaf7d2;color:#3d6a0a;font-weight:700;font-size:12px}
    .estado.no{background:#fdf0d5;color:#8a5a00}
    footer{margin-top:34px;padding-top:16px;border-top:1px solid #eee;font-size:12px;color:#86837c}
    .acc{max-width:760px;margin:0 auto 16px;display:flex;gap:10px;justify-content:flex-end}
    .acc button{font:600 14px system-ui;padding:10px 18px;border-radius:99px;border:0;background:#16161b;color:#fff;cursor:pointer}
    @media print{body{background:#fff;padding:0}.doc{box-shadow:none;padding:0}.acc{display:none}}
    @media (max-width:600px){.doc{padding:24px}.cols{grid-template-columns:1fr}header{flex-direction:column}.meta{text-align:left}}
  </style></head><body>
  <div class="acc"><button onclick="print()">Imprimir o guardar en PDF</button></div>
  <div class="doc">
    <header>
      <div class="logo"><img src="${new URL("icons/logo-a.png",location.href)}" alt=""><img src="${new URL("icons/nombre-oscuro.png",location.href)}" alt="${n(b.marca)}"></div>
      <div class="meta"><h1>Recibo</h1>Nº ${n(l)}<br>Pedido ${L(e.id)}<br>${A(Date.now())}</div>
    </header>
    <div class="cols">
      <div><small>Emitido por</small><b>${n(s.titular||b.marca)}</b><br>${n(s.nif?"NIF "+s.nif:"")}<br>${n(s.domicilio||"")}<br>${n(b.email)}</div>
      <div><small>Cliente</small><b>${n(r.razon||e.clienteNombre)}</b><br>${n(r.nif?"NIF "+r.nif:"")}<br>${n([r.direccion,r.cp,r.ciudad].filter(Boolean).join(", "))}<br>${n(r.emailFact||e.clienteEmail||"")}</div>
    </div>
    <table><thead><tr><th>Concepto</th><th>Importe</th></tr></thead><tbody>
      ${h.map(([a,o])=>`<tr><td>${n(a)}</td><td>${x(o||0)}</td></tr>`).join("")}
    </tbody></table>
    <div class="tot">
      ${e.iva??b.iva?(a=>`<div><span>Base imponible</span><span>${x(a.base)}</span></div><div><span>IVA (${a.pct} %)</span><span>${x(a.cuota)}</span></div>`)(H(e.total||0)):""}
      <div><span>Total del proyecto${e.iva??b.iva?" (IVA incluido)":""}</span><b>${x(e.total||0)}</b></div>
      ${d?`<div class="big"><span>${u}</span><span>${x(v)}</span></div>`:""}
      <div><span>Estado</span><span class="estado ${e.pagoEstado==="pagado"||d==="senal"&&e.pagoEstado==="senal"?"":"no"}">${n((k[e.pagoEstado||"pendiente"]||k.pendiente).txt)}</span></div>
      ${e.pagoMetodo?`<div><span>Forma de pago</span><span>${n(D[e.pagoMetodo]||e.pagoMetodo)}</span></div>`:""}
    </div>
    <footer>Este documento es un justificante del pago de tu proyecto «${n(e.respuestas?.negocio||e.planNombre)}» y <b>no sustituye a la factura</b>, que te enviamos por cada pago. Para que salga a nombre de tu empresa, revisa tus datos en «Ajustes → Facturación». Condiciones de contratación, derecho de desistimiento (14 días) y política de privacidad: ${n(location.origin)}/terminos-y-privacidad. Consultas: ${n(b.legal?.email||b.email)}.<br>© ${new Date().getFullYear()} ${n(b.marca)}. Todos los derechos reservados.</footer>
  </div></body></html>`,t=window.open("","_blank");if(!t){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([i],{type:"text/html"})),a.download=`recibo-${l}.html`,a.click();return}t.document.open(),t.document.write(i),t.document.close()}
