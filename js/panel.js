/*! © AurevixWeb. Todos los derechos reservados. Prohibida la copia o reutilización sin autorización. */
import{CONFIG as M,PLANES as Ea}from"../config.js";import{plantillaPorId as Da,activarPlantilla as ve}from"./plantillas.js";import{ETAPAS as ua,etapaDe as Q,barraEtapas as $e,estadoParaEtapa as Fa,entregasCliente as ge,urlVistaPrevia as he,fechaEntrega as _,diasRestantes as oa,plazoTexto as na,plazoClase as ka,conHistorial as fe,lineaTiempo as ye,lineaTiempoHTML as we,siguientePaso as aa,RECORDATORIOS as Ia,fichaTexto as Ee}from"./proyecto.js";import{contar as ke}from"./efectos.js";import*as y from"./store.js";import{$ as m,$$ as R,esc as l,euros as f,fecha as ba,fechaCorta as Le,haceCuanto as V,icono as u,avatar as F,toast as E,abrir as Ba,cerrar as xe,arrancar as Pe,pedirLogin as Ce,mailLink as ea,refPedido as ia,ESTADOS as U,PAGOS as La,METODOS as Oa,cargandoHTML as Ua,errorCargaHTML as Te,metaHTML as Wa,ocupado as C,campo as J,estrellas as je,etiquetas as xa,TAREAS as _a,progreso as ra,copiar as qa,descargar as Aa,tamano as Pa,datosLegalesPendientes as Se}from"./ui.js";import{montarHilo as Me,montarArchivos as De,abrirRecibo as qe,descargarArchivosCliente as Ae}from"./colabora.js";import{prefsPermitidas as Re}from"./cookies.js";import{prepararArchivos as Ne,crearVersion as ze,abrirVisor as Ve,enlaceVista as He}from"./vistaweb.js";await Pe("panel");const S=m("#pnBody"),Ca=m("#tabs");let P=null,w={pedidos:[],cands:[],usuarios:[],resenas:[],tickets:[],videos:[]},Ta="",da="",B={estado:"todos",q:"",ocultar:!1};const Fe=()=>{try{return localStorage.getItem("tm_vista")}catch{return null}};let la=Fe()||(innerWidth>=1100?"tablero":"lista");const A=e=>e.respuestas?.negocio||e.planNombre,G=()=>w.usuarios.filter(e=>e.role==="worker"),I=e=>!["entregado","cancelado"].includes(e.estado),ma=M.comision??30,W=e=>Math.round((e.total||0)*ma)/100,va=e=>w.pedidos.filter(a=>a.ref===e&&a.estado!=="cancelado"),Ie=e=>e.comisionPagada?["Cobrada","p-done"]:e.pagoEstado==="pagado"?["Lista para cobrar","p-new"]:["Cliente aún no ha pagado","p-pend"],$a=e=>va(e).filter(a=>a.pagoEstado==="pagado"&&!a.comisionPagada),ta=e=>/^AMIGO-[0-9A-F]{8}$/.test(e.cupon||"")?w.usuarios.find(a=>y.codigoAmigo(a.uid)===e.cupon)||{name:"Un cliente",email:""}:null,Ga=e=>!!ta(e)&&["senal","pagado"].includes(e.pagoEstado)&&!e.premioAmigo&&e.estado!=="cancelado",Ra=e=>w.usuarios.find(a=>a.uid===e)?.name||"Vendedor",N=(e,a,o="")=>`<div class="empty"><div class="em">${u(e)}</div><b>${a}</b><p>${o}</p></div>`;y.alCambiarUsuario(async e=>{if(P=e,!e)return Be();if(e.role==="client")return Oe();m("#pnRole").textContent=e.role==="owner"?"Panel de propietario":"Panel de trabajador",m("#pnHello").innerHTML=`Hola, <span class="nw">${l(e.name.split(" ")[0])}&nbsp;<span class="saludo">${u("hand")}</span></span>`,m("#pnRefresh").hidden=!1;const a=e.role==="owner"?[["resumen","Resumen","chart"],["pedidos","Pedidos","bag"],["clientes","Clientes","users"],["soporte","Soporte","help"],["agenda","Agenda","calendar"],["actividad","Actividad","history"],["candidaturas","Candidatos","briefcase"],["videos","Vídeos","video"],["resenas","Reseñas","star"],["equipo","Equipo","award"]]:[["mios","Mis encargos","laptop"],["agenda","Agenda","calendar"],["disponibles","Disponibles","inbox"],["soporte","Soporte","help"],["ventas","Mis ventas","euro"],["videos","Mis vídeos","video"],["ranking","Ranking","trophy"],["historial","Historial","folder"]],o=location.hash.slice(1),n=o.startsWith("pedido-")?o.slice(7):"";da=a.some(s=>s[0]===o)?o:n?e.role==="owner"?"pedidos":"mios":a[0][0],Ca.innerHTML=a.map(([s,t,i])=>`<button role="tab" data-tab="${s}">${u(i)}<span>${t}</span><i class="badge" data-badge="${s}"></i></button>`).join(""),Ca.style.setProperty("--cols",a.length<=5?a.length:Math.ceil(a.length/2)),m("#pnAjustes").hidden=!1,await O(),n&&X(n)}),addEventListener("hashchange",()=>{const e=location.hash.slice(1);e.startsWith("pedido-")?O().then(()=>X(e.slice(7))):m(`[data-tab="${e}"]`)&&ja(e)}),document.addEventListener("aviso",()=>{Z.open||O(!0)});let Na=0;document.addEventListener("pedido-cambiado",async e=>{await O(!0),Z.open&&e.detail&&X(e.detail)}),document.addEventListener("visibilitychange",()=>{if(document.hidden){Na=Date.now();return}P&&P.role!=="client"&&Na&&Date.now()-Na>6e4&&!Z.open&&O(!0)});function Ya(e,a){m("#pnRole").textContent=e,m("#pnHello").textContent=a,m("#pnRefresh").hidden=!0,Ca.innerHTML=""}function Be(){Ya("Panel","Acceso del equipo"),S.innerHTML=`<div class="card gate"><div class="em">${u("lock")}</div><h3>Inicia sesión</h3><p class="muted">Este panel es para el propietario y los trabajadores.</p><button class="btn btn-primary" id="gateLogin"><span>Iniciar sesión</span></button></div>`,m("#gateLogin").addEventListener("click",()=>Ce("Entra con tu cuenta del equipo."))}function Oe(){Ya("Panel","Zona del equipo"),S.innerHTML=`<div class="card gate"><div class="em">${u("briefcase")}</div><h3>Este panel es para el equipo</h3><p class="muted">Tu cuenta es de cliente. Puedes ver tus pedidos o unirte al equipo.</p>
    <div class="gate-btns"><a class="btn btn-primary" href="./#mis-pedidos">Mis proyectos</a><a class="btn btn-ghost" href="trabaja-con-nosotros">Trabaja con nosotros</a></div></div>`}async function O(e=!1){e||(S.innerHTML=Ua("Cargando datos…"));try{const a=P.role==="owner",[o,n,s,t,i]=await Promise.all([y.todosLosPedidos(),y.listarUsuarios().catch(()=>[]),a?y.todasLasCandidaturas():[],a?y.todasLasResenas():[],y.todosLosTickets().catch(()=>[])]);let r=[];try{r=a?await y.todosLosVideos():await y.misVideos()}catch(h){console.warn("Vídeos no disponibles",h.message)}if(w={pedidos:o,usuarios:n,cands:s,resenas:t,tickets:i,videos:r},a)try{Ta=(await y.leerAjustes("trustpilot"))?.cco||""}catch{Ta=""}if(e&&S.querySelector("input:focus, textarea:focus")){Qa();return}ca();const v=a?o.filter(h=>h.estado==="nuevo"||h.pagoEstado==="verificando").length:o.filter(h=>!h.asignado&&h.estado==="nuevo").length;try{v?navigator.setAppBadge?.(v):navigator.clearAppBadge?.()}catch{}}catch(a){if(console.error(a),e&&w)return;S.innerHTML=`<div class="card">${Te(a.message,"No se pudieron cargar los datos")}</div>`,S.querySelector("[data-reintentar]")?.addEventListener("click",()=>O(),{once:!0})}}m("#pnRefresh").addEventListener("click",async e=>{const a=e.currentTarget;C(a,!0),await O(),C(a,!1),E("Actualizado")}),Ca.addEventListener("click",e=>{const a=e.target.closest("[data-tab]");a&&ja(a.dataset.tab)});function ja(e){da=e,history.replaceState(null,"","#"+da),ca()}function Qa(){const e={pedidos:w.pedidos.filter(a=>a.estado==="nuevo"||a.pagoEstado==="verificando").length,candidaturas:w.cands.filter(a=>a.estado==="pendiente").length,resenas:w.resenas.filter(a=>!a.aprobada).length,mios:w.pedidos.filter(a=>a.asignado===P.uid&&I(a)&&aa(a)?.quien==="equipo").length,soporte:w.tickets.filter(a=>a.estado==="abierto").length,clientes:0,agenda:w.pedidos.filter(a=>(P.role==="owner"||a.asignado===P.uid)&&(oa(a)??1)<0).length,ventas:P.role==="worker"?$a(P.uid).length:0,equipo:P.role==="owner"?G().filter(a=>$a(a.uid).length).length:0,disponibles:w.pedidos.filter(a=>!a.asignado&&a.estado==="nuevo").length,videos:P.role==="owner"?w.videos.filter(a=>a.estado==="pendiente").length:0};R("[data-badge]").forEach(a=>{const o=e[a.dataset.badge];a.textContent=o||"",a.hidden=!o}),R("[data-tab]").forEach(a=>a.classList.toggle("on",a.dataset.tab===da))}function ca(){Qa(),({resumen:Ka,pedidos:ga,candidaturas:ot,resenas:rt,equipo:dt,ventas:re,mios:le,disponibles:pt,historial:ut,clientes:ce,soporte:ue,agenda:mt,actividad:vt,ranking:$t,videos:P.role==="owner"?ie:ne}[da]||Ka)(),xa(S),ke(S)}function pa(e,{coger:a=!1}={}){const o=U[e.estado]||U.nuevo,n=Da(e.plantilla),s=aa(e);return`
  <article class="row" data-open="${e.id}" tabindex="0" role="button">
    <div class="row-main">
      <div class="row-t"><b>${l(A(e))}</b><span class="pill ${o.cls}">${o.txt}</span>
        ${e.pagoEstado==="verificando"?'<span class="pill p-pend">Pago por verificar</span>':""}
        ${e.urgente?'<span class="pill p-off">Urgente</span>':""}
        ${e.cancelacion&&e.estado!=="cancelado"?'<span class="pill p-off">Pide cancelar</span>':""}
        ${na(e)?`<span class="pill plazo ${ka(e)}">${u("clock")} ${na(e)}</span>`:""}</div>
      <small>${l(e.planNombre)} · ${n?l(n.nombre):"A medida"} · ${l(e.clienteNombre)} · ${V(e.createdAt)}</small>
      ${s?`<span class="sig-paso ${s.quien}">${u(s.ic)}<span>${l(s.txt)}</span></span>`:""}
      ${e.estado!=="cancelado"?`<div class="row-prog" title="Progreso ${ra(e)} %"><i style="--w:${ra(e)}%"></i></div>`:""}
    </div>
    <div class="row-side">
      <b class="row-price">${f(e.total)}</b>
      ${a?`<button class="btn btn-sm btn-primary" data-coger="${e.id}"><span>Coger</span></button>`:e.asignadoNombre?`<span class="who" title="${l(e.asignadoNombre)}">${F({name:e.asignadoNombre},"sm")}</span>`:'<span class="who none" title="Sin asignar">—</span>'}
    </div>
  </article>`}const za=e=>e.pagoEstado==="pagado"?e.total||0:e.pagoEstado==="senal"?(e.total||0)*M.senal/100:0,Ue=e=>e>=1e3?(e/1e3).toLocaleString("es-ES",{maximumFractionDigits:1})+" k€":f(Math.round(e));function We(e=6){const a=new Date;return Array.from({length:e},(o,n)=>{const s=new Date(a.getFullYear(),a.getMonth()-(e-1-n),1);return{y:s.getFullYear(),m:s.getMonth(),txt:s.toLocaleDateString("es-ES",{month:"short"}).replace(".","")}})}function _e(e){const a=e.filter(I),o=ua.filter(s=>s.id!=="publicada").map(s=>({e:s,n:a.filter(t=>Q(t)===s.id).length})),n=Math.max(1,...o.map(s=>s.n));return a.length?`<div class="embudo">${o.map(({e:s,n:t})=>`<div class="emb ${t?"":"cero"}"><span>${u(s.icono)}${l(s.txt)}</span><div aria-hidden="true"><i style="width:${t?Math.max(6,t/n*100):0}%"></i></div><b>${t}</b></div>`).join("")}</div>`:N("chart","No hay proyectos en marcha")}function Ja(e,a=5){const o=e.filter(n=>I(n)&&oa(n)!==null).sort((n,s)=>_(n)-_(s)).slice(0,a);return o.length?`<div class="entregas">${o.map(n=>{const s=oa(n);return`<button type="button" class="ent ${ka(n)}" data-open="${n.id}">
    <span class="ent-d"><b>${s<0?"−"+-s:s}</b><small>${Math.abs(s)===1?"día":"días"}</small></span>
    <span class="ent-t"><b>${l(A(n))}</b><small>${l(n.planNombre||"")} · ${Le(_(n))}</small></span>${u("arrow")}</button>`}).join("")}</div>`:'<p class="muted" style="font-size:14px">Sin entregas pendientes.</p>'}function Ka(){const e=w.pedidos,a=e.filter(d=>d.estado!=="cancelado"),o=a.reduce((d,x)=>d+(x.total||0),0),n=a.reduce((d,x)=>d+za(x),0),s=a.filter(d=>d.mensual&&d.estado==="entregado").reduce((d,x)=>d+x.mensual,0),t=Ea.map(d=>({n:d.nombre,v:a.filter(x=>x.plan===d.id).length})).filter(d=>d.v),i=Math.max(1,...t.map(d=>d.v)),r=w.resenas.filter(d=>d.aprobada),v=r.length?r.reduce((d,x)=>d+x.estrellas,0)/r.length:0,h=e.filter(d=>(oa(d)??1)<0),b=w.tickets.filter(d=>d.estado==="abierto"),g=e.filter(d=>d.cancelacion&&d.estado!=="cancelado"),k=a.length?o/a.length:0,j=d=>typeof d=="number"?`<em class="num" data-count="${d}">${d}</em>`:d,D=(d,x,q="",z="",me="")=>`<div class="kpi ${me}" ${z?`data-go="${z}" role="button" tabindex="0"`:""}><small>${d}</small><b>${j(x)}</b>${q?`<span>${q}</span>`:""}</div>`,L=We(6).map(d=>{const x=a.filter(q=>{const z=new Date(q.createdAt);return z.getFullYear()===d.y&&z.getMonth()===d.m});return{...d,total:x.reduce((q,z)=>q+(z.total||0),0),cobrado:x.reduce((q,z)=>q+za(z),0),n:x.length}}),p=Math.max(1,...L.map(d=>d.total)),c=[...e.filter(d=>d.pagoEstado==="verificando").map(d=>({ic:"euro",t:`Verificar pago de ${A(d)}`,id:d.id})),...g.map(d=>({ic:"alert",t:`${A(d)} pide cancelar`,id:d.id})),...e.filter(d=>I(d)&&d.revision?.estado==="cambios"&&(d.revision.comentarios||[]).some(x=>!x.hecho)).slice(0,5).map(d=>({ic:"pen",t:`${A(d)}: el cliente pide cambios`,id:d.id})),...h.slice(0,5).map(d=>({ic:"clock",t:`${A(d)}: ${na(d).toLowerCase()}`,id:d.id})),...e.filter(d=>d.estado==="nuevo"&&!d.asignado).slice(0,5).map(d=>({ic:"inbox",t:`Asignar ${A(d)}`,id:d.id})),...b.slice(0,5).map(d=>({ic:"help",t:`Responder: ${d.asunto}`,go:"soporte"})),...e.filter(Ga).slice(0,5).map(d=>({ic:"gift",t:`Premio para ${ta(d).name}: recomendó a ${A(d)}`,id:d.id}))],$=Se();setTimeout(()=>import("./push.js").then(d=>d.montarAvisoPush(m("#pnPush"))).catch(()=>{})),S.innerHTML=`<div id="pnPush"></div>
    ${$.length?`<a class="card aviso-legal" href="ajustes#negocio">
      <span class="aviso-legal-ic">${u("alert")}</span>
      <span><b>Antes de vender, completa tus datos</b><small>Faltan: ${l($.join(", "))}. Son obligatorios en el aviso legal, las condiciones y los recibos, y los clientes los necesitan para pagarte. Se cambian en Ajustes → Negocio.</small></span>
      ${u("arrow")}</a>`:""}
    <div class="kpis">
      ${D("Pedidos nuevos",e.filter(d=>d.estado==="nuevo").length,"sin empezar","pedidos")}
      ${D("Cobrado",f(n),`de ${f(o)} en pedidos`)}
      ${D("Pagos por verificar",e.filter(d=>d.pagoEstado==="verificando").length,"revisa el banco","pedidos")}
      ${D("Retrasados",h.length,"pasada la fecha de entrega","agenda",h.length?"mal":"")}
      ${D("Consultas sin responder",b.length,"soporte y contacto","soporte",b.length?"aviso":"")}
      ${D("Ticket medio",f(k),`${a.length} pedido${a.length===1?"":"s"}`)}
      ${D("Mensualidades",f(s)+"<small>/mes</small>","webs publicadas con mantenimiento")}
      ${D("Valoración",r.length?v.toFixed(1).replace(".",",")+" / 5":"—",`${r.length} publicada${r.length===1?"":"s"}`,"resenas")}
      ${D("Comisiones por pagar",f(G().reduce((d,x)=>d+$a(x.uid).reduce((q,z)=>q+W(z),0),0)),`${G().length} vendedor${G().length===1?"":"es"}`,"equipo")}
    </div>
    <div class="cols">
      <div class="card">
        <div class="card-h"><h3>Ingresos por mes</h3><span class="muted leyenda"><i class="lg-a"></i>Vendido <i class="lg-b"></i>Cobrado</span></div>
        <div class="meses" role="list" aria-label="Ingresos de los últimos 6 meses">${L.map(d=>`<div class="mes" role="listitem" aria-label="${d.txt}: ${f(d.total)} vendido, ${f(d.cobrado)} cobrado, ${d.n} pedido${d.n===1?"":"s"}" title="${d.n} pedido${d.n===1?"":"s"} · ${f(d.total)} vendido · ${f(d.cobrado)} cobrado">
          <div class="mes-barras" aria-hidden="true"><i class="a" style="--h:${d.total/p*100}%"></i><i class="b" style="--h:${d.cobrado/p*100}%"></i></div>
          <b>${d.total?Ue(d.total):"—"}</b><small>${d.txt}</small></div>`).join("")}</div>
        <div class="card-h" style="margin-top:26px"><h3>Proyectos por etapa</h3><span class="muted" style="font-size:13px">${e.filter(I).length} en marcha</span></div>
        ${_e(e)}
        <div class="card-h" style="margin-top:26px"><h3>Últimos pedidos</h3><button class="link-btn" data-go="pedidos">Ver todos</button></div>
        <div class="rows">${e.slice(0,5).map(d=>pa(d)).join("")||N("inbox","Aún no hay pedidos")}</div>
      </div>
      <div class="card">
        <div class="card-h"><h3>Para hoy</h3><span class="muted" style="font-size:13px">${c.length} pendiente${c.length===1?"":"s"}</span></div>
        ${c.length?`<div class="hoy">${c.slice(0,10).map(d=>`<button type="button" class="hoy-it" ${d.id?`data-open="${d.id}"`:`data-go="${d.go}"`}>${u(d.ic)}<span>${l(d.t)}</span>${u("arrow")}</button>`).join("")}</div>`:`<p class="muted" style="font-size:14px">${u("check")} Todo al día.</p>`}
        <div class="card-h" style="margin-top:26px"><h3>Próximas entregas</h3><button class="link-btn" data-go="agenda">Agenda</button></div>
        ${Ja(e)}
        <div class="card-h" style="margin-top:26px"><h3>Pedidos por tipo de web</h3></div>
        ${t.length?`<div class="bars">${t.map(d=>`<div class="bar"><span>${l(d.n)}</span><div aria-hidden="true"><i style="width:${d.v/i*100}%"></i></div><b>${d.v}</b></div>`).join("")}</div>`:N("chart","Sin datos todavía")}
        <div class="card-h" style="margin-top:26px"><h3>Carga del equipo</h3></div>
        ${G().length?`<div class="team-load">${G().map(d=>{const x=e.filter(q=>q.asignado===d.uid&&I(q)).length;return`<div class="tl">${F(d,"sm")}<span>${l(d.name)}${d.datos?.disponible===!1?' <em class="no-disp">no disponible</em>':""}</span><b>${x} activo${x===1?"":"s"}</b></div>`}).join("")}</div>`:'<p class="muted" style="font-size:14px">Aún no hay trabajadores. Acepta candidaturas para formar tu equipo.</p>'}
      </div>
    </div>
    ${Ye()}
    <div class="card vis-card" id="pnVisitas" aria-busy="true"><div class="card-h"><h3>Visitas a la web</h3><span class="muted" style="font-size:13px">últimos 30 días</span></div>${Ua("Cargando visitas…")}</div>`,Ze(),Je()}const Ge={senal:"Señal",resto:"Resto (entrega)",total:"Pago completo"},Za="tm_ultima_copia";function Ye(){if(P.role!=="owner")return"";const e=new Date,a=e.getFullYear(),o=Math.floor(e.getMonth()/3)+1,n=[];for(let r=a;r>=a-2;r--)for(let v=4;v>=1;v--)(r<a||v<=o)&&n.push([`${r}-${v}`,`${v}.º trimestre de ${r}`]);for(let r=a;r>=a-2;r--)n.push([`${r}-0`,`Todo ${r}`]);const s=o>1?`${a}-${o-1}`:`${a-1}-4`;let t=0;try{t=+localStorage.getItem(Za)||0}catch{}const i=t?Math.floor((Date.now()-t)/864e5):null;return`<div class="cols adm-cols">
    <div class="card adm-card">
      <div class="card-h"><h3>Facturas para tu gestor</h3></div>
      <p class="muted">Todas las facturas del periodo en una hoja de cálculo (CSV para Excel o Google Sheets), con base, IVA y total.</p>
      <div class="adm-fila"><label class="fc-select"><span>Periodo</span><select id="admPeriodo">${n.map(([r,v])=>`<option value="${r}"${r===s?" selected":""}>${v}</option>`).join("")}</select></label>
      <button type="button" class="btn btn-sm btn-primary" id="admCsv">${u("download")}<span>Descargar CSV</span></button></div>
      <p class="adm-res" id="admRes" aria-live="polite"></p>
    </div>
    <div class="card adm-card">
      <div class="card-h"><h3>Copia de seguridad</h3>${i===null?'<span class="adm-tag mal">Nunca</span>':i>7?`<span class="adm-tag mal">Hace ${i} días</span>`:`<span class="adm-tag">${i?`Hace ${i} día${i===1?"":"s"}`:"Hoy"}</span>`}</div>
      <p class="muted">Pedidos, facturas, clientes, mensajes, reseñas y ajustes en un archivo que guardas tú. Hazla una vez a la semana y guárdala fuera del ordenador (por ejemplo, en Google Drive). No incluye las fotos y archivos subidos.</p>
      <button type="button" class="btn btn-sm btn-ghost" id="admCopia">${u("download")}<span>Descargar copia de seguridad</span></button>
    </div>
  </div>`}const Xa=e=>{const a=/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(e.datos?.fecha||"");return a?new Date(+a[3],a[2]-1,+a[1]):new Date(e.created_at)};function Qe(e,a,o){const n=e.filter(b=>{const g=Xa(b);return g.getFullYear()===a&&(!o||Math.floor(g.getMonth()/3)+1===o)}),s=b=>(Math.round((+b||0)*100)/100).toFixed(2).replace(".",","),t=b=>`"${String(b??"").replace(/"/g,'""')}"`,i=b=>n.reduce((g,k)=>g+(+k.datos?.[b]||0),0),r=n.map(b=>{const g=b.datos||{},k=g.cliente||{};return[b.numero,Xa(b).toLocaleDateString("es-ES",{day:"2-digit",month:"2-digit",year:"numeric"}),k.nombre,k.nif,[k.direccion,k.cp,k.ciudad].filter(Boolean).join(", "),k.email,(g.lineas||[]).map(j=>j.concepto).filter(Boolean).join(" + ")||Ge[b.fase]||b.fase,g.pedido,s(g.base),s(g.iva),s(g.cuota),s(g.total),g.metodo].map(t).join(";")}),v=["Número","Fecha","Cliente","NIF","Dirección","Correo","Concepto","Pedido","Base imponible","IVA %","Cuota IVA","Total","Forma de pago"].map(t).join(";"),h=[t("TOTAL"),t(""),t(""),t(""),t(""),t(""),t(`${n.length} factura${n.length===1?"":"s"}`),t(""),t(s(i("base"))),t(""),t(s(i("cuota"))),t(s(i("total"))),t("")].join(";");return{csv:"\uFEFF"+[v,...r,h].join(`\r
`),n:n.length,base:i("base"),cuota:i("cuota"),total:i("total")}}function Je(){P.role!=="owner"||!m("#admCsv")||(m("#admCsv").addEventListener("click",async e=>{const a=e.currentTarget;C(a,!0);try{const[o,n]=m("#admPeriodo").value.split("-").map(Number),s=Qe(await y.listarFacturas(),o,n);if(!s.n){m("#admRes").textContent="No hay facturas en ese periodo.";return}Aa(`facturas-${o}${n?`-T${n}`:""}.csv`,new Blob([s.csv],{type:"text/csv;charset=utf-8"})),m("#admRes").innerHTML=`${s.n} factura${s.n===1?"":"s"} · base ${f(s.base)} · IVA ${f(s.cuota)} · <b>total ${f(s.total)}</b>`}catch(o){E(o.message,"err")}finally{C(a,!1)}}),m("#admCopia").addEventListener("click",async e=>{const a=e.currentTarget;C(a,!0);try{const o=await y.copiaDeSeguridad(),n=Object.entries(o.tablas).filter(([,s])=>s&&s.error).map(([s])=>s);Aa(`copia-${M.marca}-${new Date().toISOString().slice(0,10)}.json`,new Blob([JSON.stringify(o,null,1)],{type:"application/json"}));try{localStorage.setItem(Za,String(Date.now()))}catch{}E(n.length?`Copia descargada, pero sin: ${n.join(", ")}`:"Copia de seguridad descargada. Guárdala en un sitio seguro.",n.length?"err":"ok"),O(!0)}catch(o){E(o.message,"err")}finally{C(a,!1)}}))}const Ke={inicio:"Inicio",trabaja:"Trabaja con nosotros",terminos:"Términos y privacidad","revisa-tu-web":"Revisa tu web",mantenimiento:"Mantenimiento",guias:"Guías","webs-para-barberias":"Sector: barberías","webs-para-centros-de-estetica":"Sector: estética","webs-para-restaurantes":"Sector: restaurantes","tiendas-online":"Sector: tiendas online","webs-para-gimnasios":"Sector: gimnasios","webs-para-profesionales":"Sector: profesionales","cuanto-cuesta-una-pagina-web":"Guía: cuánto cuesta","que-necesita-la-web-de-mi-negocio":"Guía: qué necesita","dominio-alojamiento-y-correo":"Guía: dominio y correo","antes-de-lanzar-tu-web":"Guía: antes de lanzar","seo-local-para-negocios":"Guía: SEO local","como-conseguir-resenas-en-google":"Guía: reseñas","web-o-redes-sociales":"Guía: web o redes"};async function Ze(){const e=m("#pnVisitas");if(!e)return;let a;try{a=await y.listarVisitas(30)}catch{a=null}if(!e.isConnected)return;e.removeAttribute("aria-busy");const o='<div class="card-h"><h3>Visitas a la web</h3><span class="muted" style="font-size:13px">últimos 30 días · sin cookies</span></div>';if(!a){e.innerHTML=o+N("chart","Aún no se pueden ver las visitas. Ejecuta supabase/visitas-v65.sql en Supabase.");return}const n=a.filter(c=>c.pagina.startsWith("ev-"));a=a.filter(c=>!c.pagina.startsWith("ev-"));const s=c=>n.filter($=>$.pagina==="ev-"+c).reduce(($,d)=>$+d.visitas,0),t=[["Visitas a la portada",a.filter(c=>c.pagina==="inicio").reduce((c,$)=>c+$.visitas,0)],["Usaron la calculadora",s("calculadora")],["Descargaron el presupuesto",s("presupuesto")],["Empezaron un pedido",s("pedido")],["Hicieron el pedido",s("pedido-hecho")]],i=Math.max(1,t[0][1]),r=`<div class="card-h vis-embudo-h"><h3>Embudo de ventas</h3><span class="muted" style="font-size:13px">de quien entra a quien pide</span></div>
    <ol class="vis-embudo">${t.map(([c,$],d)=>`<li><span>${c}</span><div aria-hidden="true"><i style="width:${Math.max($?2:0,$/i*100)}%"></i></div><b>${$}</b><small>${d&&t[0][1]?`${Math.round($/t[0][1]*1e3)/10} %`:""}</small></li>`).join("")}</ol>`,v=(c,$)=>Object.entries(c.reduce((d,x)=>(d[x[$]]=(d[x[$]]||0)+x.visitas,d),{})).sort((d,x)=>x[1]-d[1]),h=a.reduce((c,$)=>c+$.visitas,0),b=Array.from({length:30},(c,$)=>{const d=new Date(Date.now()-(29-$)*864e5),x=new Date(d.getTime()-d.getTimezoneOffset()*6e4).toISOString().slice(0,10);return{d,n:a.filter(q=>q.dia===x).reduce((q,z)=>q+z.visitas,0)}}),g=Math.max(1,...b.map(c=>c.n)),k=a.filter(c=>c.dispositivo!=="ordenador").reduce((c,$)=>c+$.visitas,0),j=v(a,"origen").map(([c,$])=>[c||"Directo o buscador sin datos",$]),D=v(a,"pagina").map(([c,$])=>[Ke[c]||c,$]),L=c=>c.toLocaleDateString("es-ES",{day:"numeric",month:"short"}),p=(c,$=Math.max(1,...c.map(d=>d[1])))=>c.length?`<div class="bars">${c.slice(0,6).map(([d,x])=>`<div class="bar"><span title="${l(d)}">${l(d)}</span><div aria-hidden="true"><i style="width:${x/$*100}%"></i></div><b>${x}</b></div>`).join("")}</div>`:N("chart","Sin datos todavía");e.innerHTML=`${o}
    <div class="kpis k4">
      <div class="kpi"><small>Visitas</small><b>${h}</b><span>en 30 días</span></div>
      <div class="kpi"><small>Hoy</small><b>${b[29].n}</b><span>${L(b[29].d)}</span></div>
      <div class="kpi"><small>Desde el móvil</small><b>${h?Math.round(k/h*100):0} %</b><span>móvil y tableta</span></div>
      <div class="kpi"><small>En inglés</small><b>${a.filter(c=>c.idioma==="en").reduce((c,$)=>c+$.visitas,0)}</b><span>visitas</span></div>
    </div>
    <div class="vis-dias" role="list" aria-label="Visitas por día, últimos 30 días">${b.map(c=>`<div class="vis-dia" role="listitem" tabindex="0" aria-label="${L(c.d)}: ${c.n} visita${c.n===1?"":"s"}" data-tip="${L(c.d)} · ${c.n}"><i style="--h:${c.n/g*100}%"></i></div>`).join("")}</div>
    <div class="vis-eje" aria-hidden="true"><span>${L(b[0].d)}</span><span>${L(b[29].d)}</span></div>
    <div class="cols vis-cols">
      <div><div class="card-h"><h3>De dónde llegan</h3></div>${p(j)}</div>
      <div><div class="card-h"><h3>Páginas</h3></div>${p(D)}</div>
    </div>
    ${r}`}const Xe={todos:"Todos",pago:"Pago por verificar",tarde:"Retrasados",cancelar:"Piden cancelar",sinasignar:"Sin asignar",...Object.fromEntries(Object.entries(U).map(([e,a])=>[e,a.txt]))};function ae(e,a){return a==="todos"?!0:a==="pago"?e.pagoEstado==="verificando":a==="tarde"?(oa(e)??1)<0:a==="cancelar"?!!e.cancelacion&&e.estado!=="cancelado":a==="sinasignar"?!e.asignado&&I(e):e.estado===a}function ga(){const e=B.ocultar?w.pedidos.filter(I):w.pedidos,a=e.filter(n=>ae(n,B.estado)&&(!B.q||`${A(n)} ${n.clienteNombre} ${n.clienteEmail} ${n.planNombre} ${n.id}`.toLowerCase().includes(B.q.toLowerCase())));S.innerHTML=`
    <div class="toolbar">
      <div class="search-group">
        <svg viewBox="0 0 24 24" aria-hidden="true" class="search-icon"><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"/></svg>
        <input id="q" class="input" type="search" placeholder="Buscar cliente, negocio o ref…" value="${l(B.q)}" aria-label="Buscar pedidos">
      </div>
      <div class="tool-r">
        <label class="switch-inline"><span class="switch"><input type="checkbox" id="ocultar" ${B.ocultar?"checked":""}><span class="slider"></span></span> Ocultar terminados</label>
        <div class="seg vista-seg" role="group" aria-label="Vista">
          <button type="button" data-vista="lista" class="${la==="lista"?"on":""}" aria-label="Lista"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg></button>
          <button type="button" data-vista="tablero" class="${la==="tablero"?"on":""}" aria-label="Tablero"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="5" height="18" rx="1.5"/><rect x="10" y="3" width="5" height="12" rx="1.5"/><rect x="17" y="3" width="4" height="8" rx="1.5"/></svg></button>
        </div>
        <button type="button" class="btn btn-sm btn-ghost" id="csv" title="Descargar en Excel (CSV)">${u("copy")}<span>Exportar</span></button>
      </div>
    </div>
    <div class="opts filters">${Object.entries(Xe).map(([n,s])=>{const t=e.filter(i=>ae(i,n)).length;return`<label class="opt ${!t&&n!=="todos"&&B.estado!==n?"cero":""}"><input type="radio" name="flt" value="${n}" ${B.estado===n?"checked":""}><span><i>${s} · ${t}</i></span></label>`}).join("")}</div>
    ${la==="tablero"?et(a):`<div class="rows card flush">${a.map(n=>pa(n)).join("")||N("search","No hay pedidos aquí")}</div>`}`,R("[data-vista]").forEach(n=>n.addEventListener("click",()=>{if(la=n.dataset.vista,Re())try{localStorage.setItem("tm_vista",la)}catch{}ga()})),m("#csv").addEventListener("click",()=>st(a)),la==="tablero"&&tt(),R("input[name=flt]").forEach(n=>n.addEventListener("change",()=>{B.estado=n.value,ga()})),m("#ocultar").addEventListener("change",n=>{B.ocultar=n.target.checked,ga()});const o=m("#q");o.addEventListener("input",()=>{B.q=o.value;const n=o.selectionStart;ga();const s=m("#q");s.focus(),s.setSelectionRange(n,n)})}const at=["nuevo","en_curso","revision","entregado"];function et(e){return`<div class="board">${at.map(a=>{const o=e.filter(n=>n.estado===a);return`<div class="col" data-col="${a}">
      <div class="col-h"><span class="pill ${U[a].cls}">${U[a].txt}</span><b>${o.length}</b></div>
      <div class="col-body">${o.map(n=>`
        <article class="kcard" draggable="true" data-open="${n.id}" data-id="${n.id}" tabindex="0">
          <div class="kc-t"><b>${l(A(n))}</b><span>${f(n.total)}</span></div>
          <small>${l(n.planNombre)} · ${l(n.clienteNombre)}</small>
          ${(s=>s?`<span class="sig-paso ${s.quien}">${u(s.ic)}<span>${l(s.txt)}</span></span>`:"")(aa(n))}
          <div class="kc-tags">${n.pagoEstado==="verificando"?'<span class="pill p-pend">Verificar pago</span>':""}${n.urgente?'<span class="pill p-off">Urgente</span>':""}</div>
          <div class="kc-f"><div class="row-prog"><i style="--w:${ra(n)}%"></i></div>${n.asignadoNombre?F({name:n.asignadoNombre},"sm"):'<span class="who none">—</span>'}</div>
        </article>`).join("")||'<p class="col-empty">Suelta aquí</p>'}</div>
    </div>`}).join("")}</div>`}function tt(){let e=null;R(".kcard").forEach(a=>{a.addEventListener("dragstart",o=>{e=a.dataset.id,a.classList.add("drag"),o.dataTransfer.effectAllowed="move"}),a.addEventListener("dragend",()=>{a.classList.remove("drag"),R(".col").forEach(o=>o.classList.remove("over"))})}),R(".col").forEach(a=>{a.addEventListener("dragover",o=>{o.preventDefault(),a.classList.add("over")}),a.addEventListener("dragleave",o=>{a.contains(o.relatedTarget)||a.classList.remove("over")}),a.addEventListener("drop",async o=>{o.preventDefault(),a.classList.remove("over");const n=w.pedidos.find(t=>t.id===e),s=a.dataset.col;if(!(!n||n.estado===s)){if(P.role!=="owner"&&n.asignado!==P.uid)return E("Solo puedes mover tus encargos","err");try{await y.actualizarPedido(n.id,{estado:s,...s==="entregado"?{etapa:"publicada"}:{}}),n.estado=s,s==="entregado"&&(n.etapa="publicada"),E(`${A(n)} → ${U[s].txt}`,"ok"),ca()}catch(t){E(t.message,"err")}}})})}function st(e){const a=["Referencia","Fecha","Negocio","Cliente","Email","Teléfono","Tipo de web","Total","Descuento","Mensual","Estado","Etapa","Pago","Asignado","Entrega prevista","Progreso","Vendedor"],o=e.map(t=>[ia(t.id),ba(t.createdAt),A(t),t.clienteNombre,t.clienteEmail,t.respuestas?.telefono||"",t.planNombre,String(t.total).replace(".",","),String(t.descuento||0).replace(".",","),t.mensual||0,U[t.estado]?.txt,ua.find(i=>i.id===Q(t))?.txt||"",La[t.pagoEstado||"pendiente"]?.txt,t.asignadoNombre||"",ba(_(t)),ra(t)+" %",t.ref?Ra(t.ref):""]),n=[a,...o].map(t=>t.map(i=>`"${String(i??"").replace(/"/g,'""')}"`).join(";")).join(`\r
`),s=document.createElement("a");s.href=URL.createObjectURL(new Blob(["\uFEFF"+n],{type:"text/csv;charset=utf-8"})),s.download=`pedidos-${new Date().toISOString().slice(0,10)}.csv`,s.click(),setTimeout(()=>URL.revokeObjectURL(s.href),1e3),E(`${e.length} pedido${e.length===1?"":"s"} exportado${e.length===1?"":"s"}`,"ok")}document.addEventListener("keydown",e=>{e.key==="/"&&!e.target.closest("input, textarea, select")&&m("#q")&&(e.preventDefault(),m("#q").focus())});function ot(){const e=w.cands;S.innerHTML=e.length?`<div class="cands">${e.map(a=>{const o={pendiente:["Pendiente","p-pend"],aceptada:["Aceptada","p-done"],rechazada:["Rechazada","p-off"]}[a.estado]||["—",""],n=a.portfolio?a.portfolio.startsWith("http")?a.portfolio:"https://"+a.portfolio:"";return`
    <article class="card cand">
      <div class="cand-h">${F({name:a.nombre})}<div><b>${l(a.nombre)}</b><small>${l(a.puesto)} · ${l(a.experiencia)}</small></div><span class="pill ${o[1]}">${o[0]}</span></div>
      <p class="cand-msg">“${l(a.mensaje)}”</p>
      ${a.habilidades?.length?`<div class="chips-mini">${a.habilidades.map(s=>`<span>${l(s)}</span>`).join("")}</div>`:""}
      <div class="cand-meta">
        <span>${u("mail")} ${l(a.email)}</span><span>${u("call")} ${l(a.telefono)}</span>
        ${n?`<a href="${l(n)}" target="_blank" rel="noopener">${u("link")} ${l(a.portfolio)}</a>`:""}
        <span>${u("calendar")} ${V(a.createdAt)}</span>
      </div>
      <div class="cand-btns">
        ${a.estado==="pendiente"?`<button class="btn btn-sm btn-primary" data-aceptar="${a.id}">${u("check")}<span>Aceptar</span></button><button class="btn btn-sm btn-ghost" data-rechazar="${a.id}"><span>Rechazar</span></button>`:""}
        <a class="btn btn-sm btn-ghost" href="${ea(`Tu candidatura en ${M.marca}`,`Hola ${a.nombre.split(" ")[0]},

Te escribimos de ${M.marca} por tu candidatura.

`,a.email)}">${u("mail")}<span>Escribir</span></a>
      </div>
    </article>`}).join("")}</div>`:N("inbox","Sin candidaturas","Cuando alguien rellene «Trabaja con nosotros» aparecerá aquí.")}const sa=()=>M.videos||{precio:15,bonus:25,visitas:1e4,maxMes:12},nt={pendiente:["Por revisar","p-pend"],aprobado:["Por cobrar","p-new"],pagado:["Pagado","p-done"],rechazado:["No aprobado","p-off"]},K=e=>e.estado==="aprobado"||e.estado==="pagado"?(+e.importe||sa().precio)+(e.bonus?+e.importeBonus||sa().bonus:0):0,ee=e=>{const a=new Date(e),o=new Date;return a.getMonth()===o.getMonth()&&a.getFullYear()===o.getFullYear()},te=(e,a)=>e.filter(o=>(!a||o.uid===a)&&ee(o.createdAt)&&o.estado!=="rechazado"),se=e=>/tiktok/i.test(e)?"TikTok":/instagram/i.test(e)?"Instagram":/youtu/i.test(e)?"YouTube":/facebook|fb\.watch/i.test(e)?"Facebook":"Otra red",it=e=>/^https?:\/\//i.test(e||"")?e:"",oe=(e,a)=>{const[o,n]=nt[e.estado]||["—",""],s=it(e.url);return`<article class="vid card">
    <div class="vid-h">
      <span class="vid-ic">${u("play")}</span>
      <div class="vid-t"><b>${a?l(e.autor||"Creador")+" · ":""}${l(e.red||se(e.url))}</b><small>${V(e.createdAt)}${e.visitas?` · ${(+e.visitas).toLocaleString("es-ES")} visualizaciones`:""}</small></div>
      <span class="pill ${n}">${o}</span>
    </div>
    ${e.nota?`<p class="vid-nota">${l(e.nota)}</p>`:""}
    <div class="vid-f">
      ${s?`<a class="btn btn-sm btn-ghost" href="${l(s)}" target="_blank" rel="noopener">${u("external")}<span>Ver vídeo</span></a>`:""}
      ${K(e)?`<b class="vid-imp">${f(K(e))}${e.bonus?" <small>con bonus</small>":""}</b>`:""}
      ${a&&e.estado==="pendiente"?`<button class="btn btn-sm btn-primary" data-vid="aprobar" data-id="${e.id}">${u("check")}<span>Aprobar ${f(sa().precio)}</span></button><button class="btn btn-sm btn-ghost" data-vid="rechazar" data-id="${e.id}"><span>Rechazar</span></button>`:""}
      ${a&&e.estado==="aprobado"?`<button class="btn btn-sm btn-ghost" data-vid="bonus" data-id="${e.id}">${u("flame")}<span>${e.bonus?"Quitar bonus":`Bonus +${f(sa().bonus)}`}</span></button><button class="btn btn-sm btn-primary" data-vid="pagar" data-id="${e.id}">${u("euro")}<span>Marcar pagado</span></button>`:""}
      ${a||e.estado==="pendiente"?`<button class="icon-btn sm" data-vid="borrar" data-id="${e.id}" aria-label="Borrar vídeo">${u("trash")}</button>`:""}
    </div>
  </article>`};function ne(){const e=sa(),a=w.videos,o=te(a).length,n=a.filter(r=>r.estado==="aprobado").reduce((r,v)=>r+K(v),0),s=a.filter(r=>r.estado==="pagado").reduce((r,v)=>r+K(v),0),t=new URL(`./?ref=${encodeURIComponent(P.uid)}`,location.href).href,i=[["Antes y después",`Enseña la web antigua (o la ficha de Google) de un negocio y cómo quedaría con un diseño de ${M.marca}.`],["Web en 30 segundos","Graba la pantalla recorriendo uno de nuestros diseños de ejemplo con el nombre de un negocio real de tu zona."],["¿Cuánto cuesta una web?",`Explica los precios cerrados (desde ${f(Math.min(...Ea.map(r=>r.precio)))}) y qué incluye cada tipo de web.`],["Errores de una web","3 fallos que hacen perder clientes (no se ve bien en el móvil, sin botón de contacto, tarda en cargar) y cómo los solucionamos."]];S.innerHTML=`
    <div class="card vid-info">
      <span class="vid-big">${u("video")}</span>
      <div><h3>Cobras ${f(e.precio)} por cada vídeo aprobado</h3>
      <p class="muted">Y <b>+${f(e.bonus)}</b> si supera las <b>${e.visitas.toLocaleString("es-ES")} visualizaciones</b> en 14 días. Hasta ${e.maxMes} vídeos pagados al mes. Si alguien compra desde tu enlace, además te llevas el ${ma} %.</p></div>
    </div>
    <div class="kpis k4">
      <div class="kpi"><small>Este mes</small><b>${o} / ${e.maxMes}</b><span>vídeos enviados</span></div>
      <div class="kpi"><small>Por revisar</small><b>${a.filter(r=>r.estado==="pendiente").length}</b><span>esperando aprobación</span></div>
      <div class="kpi"><small>Por cobrar</small><b>${f(n)}</b><span>vídeos aprobados</span></div>
      <div class="kpi"><small>Ya cobrado</small><b>${f(s)}</b><span>en total</span></div>
    </div>
    <form class="card vid-form" id="vidForm" novalidate>
      <div class="card-h"><h3>Enviar un vídeo publicado</h3></div>
      ${J({id:"vUrl",name:"url",label:"Enlace del vídeo",type:"url",required:!0,attrs:'inputmode="url" autocapitalize="off" placeholder="https://www.tiktok.com/@tu_usuario/video/…"'})}
      ${J({id:"vVisitas",name:"visitas",label:"Visualizaciones ahora (opcional)",type:"number",attrs:'min="0" inputmode="numeric"'})}
      ${J({id:"vNota",name:"nota",label:"Nota para nosotros (opcional)",type:"textarea",attrs:'maxlength="300"'})}
      <p class="muted vid-req">${u("check")} Vídeo propio de 20 a 60 segundos, publicado en tu cuenta, que nombre a ${M.marca} y con tu enlace en la bio o en la descripción.</p>
      <button class="btn btn-primary" type="submit" id="vidSend" ${o>=e.maxMes?"disabled":""}>${u("send")}<span>${o>=e.maxMes?"Ya has llegado al máximo de este mes":"Enviar para revisar"}</span></button>
    </form>
    <div class="vid-lista">${a.map(r=>oe(r,!1)).join("")||N("video","Aún no has enviado vídeos","Publica tu primer vídeo y pega aquí el enlace para que lo revisemos.")}</div>
    <div class="card kit">
      <div class="card-h"><h3>Ideas de vídeos que funcionan</h3><span class="muted" style="font-size:13px">Pon tu enlace en la bio</span></div>
      <div class="enlace-box"><code>${l(t)}</code><button class="btn btn-sm btn-primary" data-copy="${l(t)}"><span>Copiar enlace</span></button></div>
      <div class="kit-grid">${i.map(([r,v])=>`<div class="kit-it"><b>${r}</b><p>${l(v)}</p></div>`).join("")}</div>
    </div>`,xa(S),m("#vidForm").addEventListener("submit",async r=>{r.preventDefault();const v=m("#vUrl").value.trim();if(!/^https?:\/\/\S+\.\S+/i.test(v))return m("#vUrl").closest(".fc").classList.add("error"),E("Pega el enlace completo del vídeo (empieza por https://)","err");if(w.videos.some(b=>b.url===v))return E("Ese vídeo ya lo habías enviado","err");const h=m("#vidSend");C(h,!0);try{const b=await y.enviarVideo({url:v,red:se(v),visitas:Math.max(0,+m("#vVisitas").value||0),nota:m("#vNota").value.trim()});w.videos=[b,...w.videos],E("Vídeo enviado. Te avisamos cuando lo revisemos.","ok"),ne()}catch(b){E(b.message,"err"),C(h,!1)}})}let ha="pendiente";function ie(){const e=sa(),a=w.videos,o=ha==="todos"?a:a.filter(i=>i.estado===ha),n=a.filter(i=>i.estado==="aprobado"),s=Object.values(n.reduce((i,r)=>(i[r.uid]||={uid:r.uid,autor:r.autor,n:0,total:0},i[r.uid].n++,i[r.uid].total+=K(r),i),{})),t=a.filter(i=>i.estado==="pagado"&&ee(i.pagadoEn||i.createdAt)).reduce((i,r)=>i+K(r),0);S.innerHTML=`
    <div class="kpis k4">
      <div class="kpi"><small>Por revisar</small><b>${a.filter(i=>i.estado==="pendiente").length}</b><span>vídeos nuevos</span></div>
      <div class="kpi"><small>Por pagar</small><b>${f(n.reduce((i,r)=>i+K(r),0))}</b><span>${n.length} vídeos aprobados</span></div>
      <div class="kpi"><small>Pagado este mes</small><b>${f(t)}</b><span>en vídeos</span></div>
      <div class="kpi"><small>Tarifa</small><b>${f(e.precio)}</b><span>+${f(e.bonus)} si pasa de ${e.visitas.toLocaleString("es-ES")} vis.</span></div>
    </div>
    ${s.length?`<div class="card vid-pagos"><div class="card-h"><h3>Por pagar a cada creador</h3></div>${s.map(i=>`
      <div class="vid-pago"><span>${F({name:i.autor||"?"})}<b>${l(i.autor||"Creador")}</b><small>${i.n} vídeo${i.n===1?"":"s"}</small></span>
      <b>${f(i.total)}</b><button class="btn btn-sm btn-ghost" data-cobro="${i.uid}">${u("bank")}<span>Cobro</span></button><button class="btn btn-sm btn-primary" data-vid="pagartodo" data-id="${i.uid}">${u("euro")}<span>Pagar todo</span></button></div>`).join("")}</div>`:""}
    <div class="seg vid-seg" role="tablist">${[["pendiente","Por revisar"],["aprobado","Por pagar"],["pagado","Pagados"],["rechazado","Rechazados"],["todos","Todos"]].map(([i,r])=>`<button type="button" data-fvid="${i}" class="${ha===i?"on":""}">${r}</button>`).join("")}</div>
    <div class="vid-lista">${o.map(i=>oe(i,!0)).join("")||N("video",ha==="pendiente"?"No hay vídeos por revisar":"Nada por aquí","Los creadores envían sus vídeos desde su panel, en «Mis vídeos».")}</div>`}S.addEventListener("click",async e=>{const a=e.target.closest("[data-fvid]");if(a)return ha=a.dataset.fvid,ie();const o=e.target.closest("[data-vid]");if(!o)return;const{vid:n,id:s}=o.dataset,t=sa(),i=w.videos.find(v=>v.id===s),r=async(v,h)=>{C(o,!0);try{await v(),E(h,"ok"),await O(!0),ca()}catch(b){E(b.message,"err"),C(o,!1)}};if(n==="aprobar")return te(w.videos,i.uid).filter(v=>v.estado==="aprobado"||v.estado==="pagado").length>=t.maxMes&&!confirm(`${i.autor} ya tiene ${t.maxMes} vídeos aprobados este mes. ¿Aprobar igualmente?`)?void 0:r(()=>y.actualizarVideo(s,{estado:"aprobado",importe:t.precio,aprobadoEn:Date.now()}),`Vídeo aprobado: ${f(t.precio)} por pagar`);if(n==="rechazar")return r(()=>y.actualizarVideo(s,{estado:"rechazado"}),"Vídeo rechazado");if(n==="bonus")return r(()=>y.actualizarVideo(s,{bonus:!i.bonus,importeBonus:t.bonus}),i.bonus?"Bonus quitado":`Bonus de ${f(t.bonus)} añadido`);if(n==="pagar")return r(()=>y.actualizarVideo(s,{estado:"pagado",pagadoEn:Date.now()}),"Vídeo marcado como pagado");if(n==="pagartodo"){const v=w.videos.filter(b=>b.uid===s&&b.estado==="aprobado"),h=v.reduce((b,g)=>b+K(g),0);return confirm(`¿Marcar como pagados ${v.length} vídeos de ${v[0]?.autor||"este creador"} (${f(h)})?`)?r(()=>Promise.all(v.map(b=>y.actualizarVideo(b.id,{estado:"pagado",pagadoEn:Date.now()}))),`${f(h)} marcados como pagados`):void 0}if(n==="borrar")return confirm("¿Borrar este vídeo?")?r(()=>y.borrarVideo(s),"Vídeo borrado"):void 0});function rt(){const e=w.resenas;S.innerHTML=`
    <p class="muted hint">Las reseñas nuevas no se ven en la web hasta que las apruebes.${M.trustpilot?` · <a class="link-btn" href="${l(M.trustpilot)}" target="_blank" rel="noopener">Ver Trustpilot ${u("external")}</a>`:""}</p>
    ${e.length?`<div class="cands">${e.map(a=>`
      <article class="card cand">
        <div class="cand-h">${F({name:a.nombre})}<div><b>${l(a.nombre)}</b><small>${l(a.plan||"")} · ${V(a.createdAt)}</small></div>
          <span class="pill ${a.aprobada?"p-done":"p-pend"}">${a.aprobada?"Publicada":"Pendiente"}</span></div>
        <div style="margin-top:12px">${je(a.estrellas)}</div>
        <p class="cand-msg">“${l(a.texto)}”</p>
        <div class="cand-btns">
          ${a.aprobada?`<button class="btn btn-sm btn-ghost" data-ocultar="${a.id}"><span>Ocultar</span></button>`:`<button class="btn btn-sm btn-primary" data-aprobar="${a.id}">${u("check")}<span>Publicar</span></button>`}
          <button class="btn btn-sm btn-danger" data-borrar-r="${a.id}"><span>Borrar</span></button>
        </div>
      </article>`).join("")}</div>`:N("star","Aún no hay reseñas","Los clientes pueden valorar su web cuando se la entregues.")}`}function dt(){const e=w.usuarios.filter(s=>s.role==="owner"),a=G(),o=s=>w.pedidos.filter(t=>t.asignado===s&&I(t)).length,n=s=>w.pedidos.filter(t=>t.asignado===s&&t.estado==="entregado").length;S.innerHTML=`
    <div class="card">
      <div class="card-h"><h3>Equipo</h3><span class="muted" style="font-size:14px">${a.length} trabajador${a.length===1?"":"es"}</span></div>
      <div class="team">
        ${e.map(s=>`<div class="tm">${F(s)}<div><b>${l(s.name)}</b><small>${l(s.email)}</small></div><span class="role-tag r-owner">Propietario</span></div>`).join("")}
        ${a.map(s=>{const t=va(s.uid),i=$a(s.uid),r=i.reduce((h,b)=>h+W(b),0),v=t.reduce((h,b)=>h+W(b),0);return`<div class="tm tm-w">
            ${F(s)}
            <div class="tm-info">
              <b><span>${l(s.name)}</span>${s.datos?.disponible===!1?'<em class="no-disp">No disponible</em>':'<em class="si-disp">Disponible</em>'}</b>
              <small>${l(s.email)}</small>
              <ul class="tm-stats">
                <li><b>${o(s.uid)}</b> activos</li><li><b>${n(s.uid)}</b> entregados</li><li><b>${t.length}</b> venta${t.length===1?"":"s"}</li><li><b>${f(v)}</b> generados</li>
              </ul>
            </div>
            <div class="tm-acc">
              ${r?`<button class="btn btn-sm btn-primary" data-pagar-com="${s.uid}" title="Marca como pagadas sus comisiones listas">${u("euro")}<span>Pagar ${f(r)}</span></button>`:""}
              <button class="btn btn-sm btn-ghost" data-cobro="${s.uid}" title="Ver sus datos de cobro">${u("bank")}<span>Cobro</span></button>
              <a class="btn btn-sm btn-ghost" href="${ea(`${M.marca}`,"",s.email)}">${u("mail")}<span>Escribir</span></a>
              <button class="btn btn-sm btn-danger" data-quitar="${s.uid}" aria-label="Quitar a ${l(s.name)} del equipo">${u("trash")}<span>Quitar</span></button>
            </div>
          </div>`}).join("")}
        ${a.length?"":'<p class="muted" style="padding:14px 0;font-size:14.5px">Aún no hay trabajadores.</p>'}
      </div>
    </div>
    <div class="card" style="margin-top:16px">
      <div class="card-h"><h3>Añadir trabajador</h3></div>
      <p class="muted" style="font-size:14px">La persona tiene que haber iniciado sesión en la web al menos una vez.</p>
      <form class="add-w" id="addW" novalidate>${J({id:"addEmail",label:"Email del trabajador",type:"email",required:!0})}<button class="btn btn-primary" type="submit"><span>Añadir</span></button></form>
    </div>`,m("#addW").addEventListener("submit",async s=>{s.preventDefault();const t=m("#addEmail").value.trim().toLowerCase(),i=w.usuarios.find(r=>(r.email||"").toLowerCase()===t);if(!i)return m("#addEmail").closest(".fc").classList.add("error"),E("No hay ninguna cuenta con ese email todavía","err");if(i.role!=="client")return E("Esa persona ya está en el equipo");await H(s.submitter,()=>y.cambiarRol(i.uid,"worker"),`${i.name} añadido al equipo`)})}function re(){const e=va(P.uid),a=new URL(`./?ref=${encodeURIComponent(P.uid)}`,location.href).href,o=e.reduce((r,v)=>r+(v.total||0),0),n=e.filter(r=>r.pagoEstado==="pagado"&&!r.comisionPagada).reduce((r,v)=>r+W(v),0),s=e.filter(r=>r.comisionPagada).reduce((r,v)=>r+W(v),0),t=e.filter(r=>r.pagoEstado!=="pagado").reduce((r,v)=>r+W(v),0),i=`¡Hola! Hago páginas web para negocios con ${M.marca}. Mira los diseños y pide la tuya aquí 👉 ${a}`;S.innerHTML=`
    <div class="enlace card">
      <div><span class="eyebrow">Tu enlace de ventas</span><p>Compártelo: cada pedido que entre por aquí es tuyo y te llevas el <b>${ma} %</b>.</p></div>
      <div class="enlace-box"><code>${l(a)}</code>
        <button class="btn btn-sm btn-primary" data-copy="${l(a)}"><span>Copiar</span></button>
        <button class="btn btn-sm btn-ghost" id="compartir">${u("share")}<span>Compartir</span></button>
        <button class="btn btn-sm btn-ghost" id="verQR">${u("qr")}<span>Código QR</span></button></div>
    </div>
    <div class="qr-box card" id="qrBox" hidden></div>
    ${lt(e)}
    <div class="kpis">
      <div class="kpi"><small>Ventas</small><b><em class="num" data-count="${e.length}">${e.length}</em></b><span>pedidos con tu enlace</span></div>
      <div class="kpi"><small>Has generado</small><b>${f(o)}</b><span>en webs vendidas</span></div>
      <div class="kpi"><small>Lista para cobrar</small><b>${f(n)}</b><span>el cliente ya ha pagado</span></div>
      <div class="kpi"><small>Pendiente</small><b>${f(t)}</b><span>esperando el pago del cliente</span></div>
      <div class="kpi"><small>Ya cobrado</small><b>${f(s)}</b><span>pagado por nosotros</span></div>
      <div class="kpi"><small>Tu comisión</small><b>${ma} %</b><span>de cada web</span></div>
    </div>
    <div class="card flush rows">${e.map(r=>{const[v,h]=Ie(r);return`<article class="row" data-open="${r.id}" tabindex="0" role="button">
        <div class="row-main"><div class="row-t"><b>${l(A(r))}</b><span class="pill ${h}">${v}</span></div>
          <small>${l(r.planNombre)} · ${f(r.total)} · ${V(r.createdAt)}</small></div>
        <div class="row-side"><b class="row-price com">+${f(W(r))}</b></div>
      </article>`}).join("")||N("link","Aún no tienes ventas","Comparte tu enlace en redes o en persona para conseguir la primera.")}</div>
    <div class="card kit">
      <div class="card-h"><h3>Kit de ventas</h3><span class="muted" style="font-size:13px">Textos listos para copiar</span></div>
      <div class="kit-grid">${ct(a).map(([r,v])=>`<div class="kit-it"><b>${r}</b><p>${l(v)}</p><button class="btn btn-sm btn-ghost" data-copy="${l(v)}">${u("copy")}<span>Copiar</span></button></div>`).join("")}</div>
    </div>`,m("#compartir").addEventListener("click",async()=>{if(navigator.share)try{await navigator.share({title:M.marca,text:i,url:a})}catch{}else qa(i)}),m("#verQR").addEventListener("click",async r=>{const v=m("#qrBox");if(!v.hidden){v.hidden=!0;return}C(r.currentTarget,!0);try{const{default:h}=await import("./vendor/qrcode.js"),b=h(0,"M");b.addData(a),b.make();const g=b.createDataURL(8,16);v.innerHTML=`<img src="${g}" alt="Código QR de tu enlace" width="220" height="220"><div><b>Tu código QR</b><p class="muted">Imprímelo en tarjetas o enséñalo en el móvil: al escanearlo se abre la web con tu enlace de ventas.</p><a class="btn btn-sm btn-primary" href="${g}" download="qr-${M.marca.toLowerCase()}.gif">${u("download")}<span>Descargar</span></a></div>`,v.hidden=!1}catch{E("No se ha podido crear el código QR.","err")}C(r.currentTarget,!1)}),m("#objForm")?.addEventListener("submit",async r=>{r.preventDefault();const v=Math.max(0,Math.round(+m("#objIn").value||0));try{P=await y.guardarPerfil({datos:{objetivo:v}}),E("Objetivo guardado","ok"),re()}catch(h){E(h.message,"err")}})}const de=(e,a=new Date)=>{const o=new Date(e.createdAt);return o.getMonth()===a.getMonth()&&o.getFullYear()===a.getFullYear()};function lt(e){const a=+(P.datos?.objetivo||0),o=e.filter(t=>de(t)),n=o.reduce((t,i)=>t+W(i),0),s=a?Math.min(100,Math.round(n/a*100)):0;return`<div class="card objetivo">
    <div class="obj-tx"><span class="eyebrow">Objetivo del mes</span>
      <b>${f(n)} <small>de ${a?f(a):"—"} en comisiones</small></b>
      <div class="barra"><i style="--w:${s}%"></i></div>
      <small class="muted">${o.length} venta${o.length===1?"":"s"} este mes${a?` · ${s} % del objetivo`:""}</small></div>
    <form class="obj-form" id="objForm"><label><span>Mi objetivo (€)</span><input id="objIn" type="number" min="0" step="10" value="${a||""}" placeholder="300"></label><button class="btn btn-sm btn-ghost">Guardar</button></form>
  </div>`}const ct=e=>[["Mensaje corto",`Hola, trabajo con ${M.marca}: hacemos páginas web para negocios a precio cerrado, desde ${f(Math.min(...Ea.map(a=>a.precio)))}. Mira los diseños y pide la tuya aquí: ${e}`],["Para Instagram o TikTok",`¿Tu negocio aún no tiene web? Diseñamos la tuya en 1–4 semanas, adaptada al móvil y a precio cerrado. Elige el diseño y sigue el avance desde tu cuenta 👉 ${e}`],["Correo a un negocio",`Hola,

He visto vuestro negocio y creo que una web propia os ayudaría a conseguir más clientes. En ${M.marca} diseñamos webs profesionales a precio cerrado y con entrega de una semana a un mes.

Podéis ver diseños y precios aquí: ${e}

Un saludo.`],["Si te preguntan el precio",`Depende del tipo de web: ${Ea.slice(0,4).map(a=>`${a.nombre.toLowerCase()} desde ${f(a.precio)}`).join(", ")}. Se paga el ${M.senal} % al empezar y el resto cuando la web está lista. Todo aquí: ${e}`]];let Sa="todos";function le(){const e=w.pedidos.filter(t=>t.asignado===P.uid&&I(t)),a=t=>aa(t)?.quien==="equipo"?0:1;e.sort((t,i)=>a(t)-a(i)||_(t)-_(i));const o=e.filter(t=>aa(t)?.quien==="equipo"),n=e.filter(t=>aa(t)?.quien==="cliente"),s=Sa==="tuyos"?o:Sa==="cliente"?n:e;S.innerHTML=`
    <div class="kpis small">
      <div class="kpi ${o.length?"aviso":""}"><small>Te toca a ti</small><b>${o.length}</b></div>
      <div class="kpi"><small>Esperando al cliente</small><b>${n.length}</b></div>
      <div class="kpi"><small>Entregados</small><b>${w.pedidos.filter(t=>t.asignado===P.uid&&t.estado==="entregado").length}</b></div>
    </div>
    ${e.length?`<div class="card mios-ent"><div class="card-h"><h3>Tus próximas entregas</h3></div>${Ja(e,3)}</div>`:""}
    ${e.length?`<div class="opts filters">${[["todos","Todos",e.length],["tuyos","Te toca",o.length],["cliente","Esperando al cliente",n.length]].map(([t,i,r])=>`<label class="opt ${!r&&t!=="todos"?"cero":""}"><input type="radio" name="fmios" value="${t}" ${Sa===t?"checked":""}><span><i>${i} · ${r}</i></span></label>`).join("")}</div>`:""}
    <div class="rows card flush">${s.map(t=>pa(t)).join("")||(e.length?N("check","Nada por aquí","Prueba con otro filtro."):N("coffee","No tienes encargos activos","Mira en «Disponibles» para coger uno."))}</div>`,R("input[name=fmios]").forEach(t=>t.addEventListener("change",()=>{Sa=t.value,le()}))}function pt(){const e=w.pedidos.filter(a=>!a.asignado&&a.estado==="nuevo");S.innerHTML=`<p class="muted hint">Pedidos nuevos sin asignar. Cógelo para que te aparezca en «Mis encargos».</p>
    <div class="rows card flush">${e.map(a=>pa(a,{coger:!0})).join("")||N("party","No hay pedidos libres","Vuelve más tarde.")}</div>`}function ut(){const e=w.pedidos.filter(a=>a.asignado===P.uid&&!I(a));S.innerHTML=`<div class="rows card flush">${e.map(a=>pa(a)).join("")||N("folder","Aún no has terminado ningún encargo")}</div>`}let fa="";function ce(){const e=new Map;w.pedidos.forEach(t=>{const i=e.get(t.uid)||{uid:t.uid,nombre:t.clienteNombre,email:t.clienteEmail,tel:"",pedidos:[],total:0,pagado:0};i.pedidos.push(t),t.estado!=="cancelado"&&(i.total+=t.total||0,i.pagado+=za(t)),i.tel||=t.respuestas?.telefono||"",e.set(t.uid,i)});const a=[...e.values()].sort((t,i)=>i.total-t.total),o=a.filter(t=>!fa||`${t.nombre} ${t.email} ${t.pedidos.map(A).join(" ")}`.toLowerCase().includes(fa.toLowerCase())),n=a.filter(t=>t.pedidos.length>1).length;S.innerHTML=`
    <div class="kpis small">
      <div class="kpi"><small>Clientes</small><b>${a.length}</b><span>con al menos un pedido</span></div>
      <div class="kpi"><small>Repiten</small><b>${n}</b><span>más de un proyecto</span></div>
      <div class="kpi"><small>Pendiente de cobro</small><b>${f(a.reduce((t,i)=>t+i.total-i.pagado,0))}</b><span>entre todos</span></div>
    </div>
    <div class="toolbar"><div class="search-group">
      <svg viewBox="0 0 24 24" aria-hidden="true" class="search-icon"><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"/></svg>
      <input id="qc" class="input" type="search" placeholder="Buscar cliente o negocio…" value="${l(fa)}" aria-label="Buscar clientes"></div>
      <button type="button" class="btn btn-sm btn-ghost" id="csvCli">${u("download")}<span>Exportar</span></button></div>
    <div class="clis">${o.map(t=>`
      <details class="card cli">
        <summary>${F({name:t.nombre})}<div><b>${l(t.nombre)}</b><small>${l(t.email)}${t.tel?" · "+l(t.tel):""}</small></div>
          <div class="cli-n"><b>${f(t.total)}</b><small>${t.pedidos.length} proyecto${t.pedidos.length===1?"":"s"}${t.total-t.pagado>0?` · ${f(t.total-t.pagado)} pendiente`:""}</small></div></summary>
        <div class="rows">${t.pedidos.map(i=>pa(i)).join("")}</div>
        <div class="cli-btns"><a class="btn btn-sm btn-ghost" href="${ea(`${M.marca}`,`Hola ${t.nombre.split(" ")[0]},

`,t.email)}">${u("mail")}<span>Escribir</span></a>
          <button class="btn btn-sm btn-ghost" data-copy="${l(t.email)}">${u("copy")}<span>Copiar correo</span></button></div>
      </details>`).join("")||N("users","No hay clientes",fa?"Prueba con otra búsqueda.":"Cuando entre el primer pedido aparecerá aquí.")}</div>`;const s=m("#qc");s.addEventListener("input",()=>{fa=s.value;const t=s.selectionStart;ce();const i=m("#qc");i.focus(),i.setSelectionRange(t,t)}),m("#csvCli").addEventListener("click",()=>{const t=[["Nombre","Email","Teléfono","Proyectos","Total","Cobrado"],...a.map(i=>[i.nombre,i.email,i.tel,i.pedidos.length,String(i.total).replace(".",","),String(i.pagado).replace(".",",")])];Aa(`clientes-${new Date().toISOString().slice(0,10)}.csv`,"\uFEFF"+t.map(i=>i.map(r=>`"${String(r??"").replace(/"/g,'""')}"`).join(";")).join(`\r
`),"text/csv;charset=utf-8"),E(`${a.length} cliente${a.length===1?"":"s"} exportado${a.length===1?"":"s"}`,"ok")})}let ya="abierto";const bt={duda:"Duda",cambio:"Cambio en su web",incidencia:"Incidencia",factura:"Facturación",presupuesto:"Presupuesto",espera:"Lista de espera",trabajo:"Quiere trabajar",contacto:"Contacto",otro:"Otro"},pe={abierto:["Sin responder","p-pend"],respondido:["Respondido","p-new"],cerrado:["Resuelto","p-done"]};function ue(){const e=w.tickets,a=e.filter(o=>ya==="todos"||o.estado===ya);S.innerHTML=`
    <div class="opts filters">${[["abierto","Sin responder"],["respondido","Respondidos"],["cerrado","Resueltos"],["todos","Todos"]].map(([o,n])=>`<label class="opt"><input type="radio" name="fsop" value="${o}" ${ya===o?"checked":""}><span><i>${n} · ${o==="todos"?e.length:e.filter(s=>s.estado===o).length}</i></span></label>`).join("")}</div>
    <div class="tks">${a.map(o=>{const[n,s]=pe[o.estado]||pe.abierto,t=o.pedido?w.pedidos.find(i=>i.id===o.pedido):null;return`<article class="card tkc" data-tk="${o.id}">
        <div class="cand-h">${F({name:o.nombre||"?"})}<div><b>${l(o.asunto)}</b><small>${l(o.nombre||"Sin nombre")} · ${l(o.email||"")} · ${bt[o.tipo]||"Consulta"} · ${V(o.createdAt)}</small></div><span class="pill ${s}">${n}</span></div>
        ${t?`<button type="button" class="link-btn tk-ped" data-open="${t.id}">${u("bag")} ${l(A(t))} · ${ia(t.id)}</button>`:""}
        <div class="tk-hilo">
          <div class="tk-m el"><small>${l(o.nombre||"Cliente")} · ${ba(o.createdAt)}</small><p>${l(o.mensaje)}</p></div>
          ${(o.respuestas||[]).map(i=>`<div class="tk-m ${i.rol==="client"?"el":"yo"}"><small>${l(i.autor)} · ${V(i.t)}</small><p>${l(i.texto)}</p></div>`).join("")}
        </div>
        ${o.estado!=="cerrado"?`<form class="tk-resp" data-resp="${o.id}"><textarea name="texto" rows="2" placeholder="${o.uid?"Respuesta (el cliente la verá en su cuenta)…":"Nota de respuesta (este contacto no tiene cuenta: contéstale por correo)"}" maxlength="3000"></textarea><button class="btn btn-sm btn-primary">${u("send")}<span>${o.uid?"Responder":"Guardar"}</span></button></form>`:""}
        <div class="cand-btns">
          <a class="btn btn-sm btn-ghost" href="${ea(`Re: ${o.asunto}`,`Hola ${(o.nombre||"").split(" ")[0]},

`,o.email)}">${u("mail")}<span>Responder por correo</span></a>
          ${o.estado!=="cerrado"?`<button class="btn btn-sm btn-ghost" data-tk-cerrar="${o.id}">${u("check")}<span>Marcar resuelto</span></button>`:`<button class="btn btn-sm btn-ghost" data-tk-abrir="${o.id}"><span>Reabrir</span></button>`}
          ${P.role==="owner"?`<button class="btn btn-sm btn-danger" data-tk-borrar="${o.id}"><span>Borrar</span></button>`:""}
        </div>
      </article>`}).join("")||N("help",ya==="abierto"?"No hay consultas sin responder":"No hay consultas aquí","Las consultas del formulario de contacto y de «Ayuda y soporte» aparecen aquí.")}</div>`,R("input[name=fsop]").forEach(o=>o.addEventListener("change",()=>{ya=o.value,ue()})),R("[data-resp]").forEach(o=>o.addEventListener("submit",async n=>{n.preventDefault();const s=o.texto.value.trim();if(!s)return;const t=w.tickets.find(i=>i.id===o.dataset.resp);await H(o.querySelector("button"),()=>y.responderTicket(t,s),t.uid?"Respuesta enviada. El cliente recibe un aviso.":"Respuesta guardada")}))}function mt(){const a=w.pedidos.filter(n=>I(n)&&(P.role==="owner"||n.asignado===P.uid)).map(n=>({p:n,d:oa(n)})).filter(n=>n.d!==null).sort((n,s)=>n.d-s.d),o=[["Retrasados",a.filter(n=>n.d<0),"tarde"],["Esta semana",a.filter(n=>n.d>=0&&n.d<=7),"pronto"],["Próximas dos semanas",a.filter(n=>n.d>7&&n.d<=21),""],["Más adelante",a.filter(n=>n.d>21),""]];S.innerHTML=`<p class="muted hint">${u("calendar")} Fecha prevista de entrega de cada proyecto activo${P.role==="owner"?"":" que tienes asignado"}. Se calcula con el plazo del plan; puedes cambiarla en la ficha del pedido.</p>
    <div class="agenda">${o.map(([n,s,t])=>`
      <section class="ag-g ${t}"><h3>${n} <span>${s.length}</span></h3>
        ${s.length?s.map(({p:i,d:r})=>`<button type="button" class="ag-it" data-open="${i.id}">
          <span class="ag-f"><b>${new Date(_(i)).getDate()}</b><small>${new Date(_(i)).toLocaleDateString("es-ES",{month:"short"}).replace(".","")}</small></span>
          <span class="ag-tx"><b>${l(A(i))}</b><small>${l(i.planNombre)} · ${l(ua.find(v=>v.id===Q(i))?.txt||"")}${i.asignadoNombre?" · "+l(i.asignadoNombre):" · sin asignar"}</small></span>
          <span class="pill plazo ${ka(i)}">${na(i)}</span></button>`).join(""):'<p class="ag-vacio">Nada por aquí.</p>'}
      </section>`).join("")}</div>`}function vt(){const e=[...w.pedidos.flatMap(a=>ye(a).map(o=>({...o,id:a.id,quien:A(a)}))),...w.tickets.map(a=>({t:a.createdAt,texto:`Consulta: ${a.asunto}`,autor:a.nombre,go:"soporte"})),...w.cands.map(a=>({t:a.createdAt,texto:`Candidatura de ${a.nombre}`,autor:a.puesto,go:"candidaturas"})),...w.resenas.map(a=>({t:a.createdAt,texto:`Reseña de ${a.estrellas} estrellas`,autor:a.nombre,go:"resenas"}))].filter(a=>a.t).sort((a,o)=>o.t-a.t).slice(0,80);S.innerHTML=`<div class="card"><ol class="tl-list act">${e.map(a=>`<li ${a.id?`data-open="${a.id}"`:`data-go="${a.go}"`} role="button" tabindex="0"><span class="tl-dot"></span><div><b>${l(a.texto)}${a.quien?` <em>· ${l(a.quien)}</em>`:""}</b><small>${V(a.t)}${a.autor?" · "+l(a.autor):""}</small></div></li>`).join("")||"<li>Sin actividad todavía.</li>"}</ol></div>`}function $t(){const e=[...G(),...w.usuarios.filter(t=>t.role==="owner")],a=(t,i)=>({u:t,n:i.length,total:i.reduce((r,v)=>r+(v.total||0),0)}),o=e.map(t=>a(t,va(t.uid).filter(i=>de(i)))).sort((t,i)=>i.total-t.total||i.n-t.n),n=e.map(t=>a(t,va(t.uid))).sort((t,i)=>i.total-t.total||i.n-t.n),s=(t,i)=>`<div class="card"><div class="card-h"><h3>${i}</h3></div><ol class="rank">${t.filter(r=>r.n).map((r,v)=>`<li class="${r.u.uid===P.uid?"yo":""}"><span class="rk-n">${v<3?u(v===0?"trophy":"award"):v+1}</span>${F(r.u,"sm")}<span class="rk-t"><b>${l(r.u.name)}${r.u.uid===P.uid?" (tú)":""}</b><small>${r.n} venta${r.n===1?"":"s"}</small></span><b>${f(r.total)}</b></li>`).join("")||'<li class="rk-vacio">Aún no hay ventas.</li>'}</ol></div>`;S.innerHTML=`<div class="cols">${s(o,`Este mes · ${new Date().toLocaleDateString("es-ES",{month:"long"})}`)}${s(n,"Desde el principio")}</div>`}async function H(e,a,o){C(e,!0);try{await a(),o&&E(o),await O()}catch(n){E(n.message,"err"),C(e,!1)}}const be=e=>y.actualizarPedido(e,{asignado:P.uid,asignadoNombre:P.name,estado:"en_curso"});S.addEventListener("click",async e=>{const a=e.target.closest("[data-coger],[data-aceptar],[data-rechazar],[data-quitar],[data-aprobar],[data-ocultar],[data-borrar-r],[data-pagar-com],[data-cobro],[data-tk-cerrar],[data-tk-abrir],[data-tk-borrar]");if(a){e.stopPropagation();const s=a.dataset;if(s.tkCerrar)return H(a,()=>y.actualizarTicket(s.tkCerrar,{estado:"cerrado",cerrado:Date.now()}),"Consulta marcada como resuelta");if(s.tkAbrir)return H(a,()=>y.actualizarTicket(s.tkAbrir,{estado:"abierto"}),"Consulta reabierta");if(s.tkBorrar)return confirm("¿Borrar esta consulta?")?H(a,()=>y.borrarTicket(s.tkBorrar),"Consulta borrada"):void 0;if(s.cobro){C(a,!0);try{const t=await y.leerPrivado(s.cobro),i=w.usuarios.find(r=>r.uid===s.cobro);alert(`Datos de cobro de ${i?.name||"vendedor"}

Titular: ${t.cobroTitular||"—"}
IBAN: ${t.cobroIban||"—"}
NIF: ${t.nif||"—"}`)}catch(t){E(t.message,"err")}return C(a,!1)}if(s.coger)return H(a,()=>be(s.coger),"Encargo asignado. Lo tienes en «Mis encargos».");if(s.aceptar){const t=w.cands.find(i=>i.id===s.aceptar);return H(a,async()=>{await y.cambiarRol(t.uid,"worker"),await y.actualizarCandidatura(t.id,{estado:"aceptada"})},`${t.nombre.split(" ")[0]} ya forma parte del equipo`)}if(s.rechazar)return H(a,()=>y.actualizarCandidatura(s.rechazar,{estado:"rechazada"}),"Candidatura rechazada");if(s.quitar){const t=w.usuarios.find(i=>i.uid===s.quitar);return confirm(`¿Quitar a ${t.name} del equipo? Ya no podrá entrar al panel.`)?H(a,()=>y.cambiarRol(t.uid,"client"),`${t.name} ya no está en el equipo`):void 0}if(s.pagarCom){const t=$a(s.pagarCom),i=t.reduce((r,v)=>r+W(v),0);return confirm(`¿Has pagado ${f(i)} de comisiones a ${Ra(s.pagarCom)}? Se marcarán como cobradas.`)?H(a,()=>Promise.all(t.map(r=>y.actualizarPedido(r.id,{comisionPagada:Date.now()}))),"Comisiones marcadas como pagadas"):void 0}if(s.aprobar)return H(a,()=>y.actualizarResena(s.aprobar,{aprobada:!0}),"Reseña publicada en la web");if(s.ocultar)return H(a,()=>y.actualizarResena(s.ocultar,{aprobada:!1}),"Reseña ocultada");if(s.borrarR)return confirm("¿Borrar esta reseña?")?H(a,()=>y.borrarResena(s.borrarR),"Reseña borrada"):void 0}if(e.target.closest("a,button.btn,input,label"))return;const o=e.target.closest("[data-go]");if(o)return ja(o.dataset.go);const n=e.target.closest("[data-open]");n&&X(n.dataset.open)}),S.addEventListener("keydown",e=>{if(e.key!=="Enter")return;const a=e.target.closest("[data-open]");if(a)return X(a.dataset.open);const o=e.target.closest("[data-go]");o&&ja(o.dataset.go)});const Z=m("#orderDlg"),T=m("#orderBox");let Ma="mensajes",wa=()=>{};Z.addEventListener("close",()=>{wa(),wa=()=>{},location.hash.startsWith("#pedido-")&&history.replaceState(null,"","#"+da)});const gt=[["mensajes","Mensajes","message"],["archivos","Archivos","folder"],["enviado","Del cliente","inbox"],["historial","Historial","history"],["notas","Notas","pen"]],ht=e=>{const a=new Date(e);return`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`};function X(e){const a=w.pedidos.find(p=>p.id===e);if(!a)return;const o=a.respuestas||{},n=Da(a.plantilla),s=P.role==="owner",t=s||a.asignado===P.uid,i=(p,c)=>c?`<div class="kv"><span>${l(p)}</span><b>${l(c)}</b></div>`:"",r=he({...a,urlVista:""}),v=(a.total||0)*M.senal/100,h=a.pagoEstado||"pendiente",b=ua.find(p=>p.id===Q(a)),g=aa(a),k=g?.quien==="cliente"&&t&&Ia[Q(a)];T.innerHTML=`
    <div class="od-head">
      <div class="od-head-t">${Wa([ia(a.id),ba(a.createdAt)])}<h2 id="odTitle">${l(A(a))}</h2>${Wa([a.planNombre,n?"Diseño "+n.nombre:"Diseño a medida"])}</div>
      <div class="od-head-r">
        <button class="btn btn-sm btn-ghost od-brief-btn" id="odBrief" title="La IA ordena todo lo del cliente en un prompt y un PDF"><span>Brief con IA</span>${u("sparkle")}</button>
        <button class="btn btn-sm btn-ghost" id="odFicha" title="Copia en un texto todo lo que ha pedido y enviado el cliente"><span>Copiar ficha</span>${u("copy")}</button>
        <button class="btn btn-sm btn-ghost" id="odRecibo" title="Resumen imprimible del pedido"><span>Recibo</span>${u("printer")}</button>
        ${n?`<button class="btn btn-sm btn-ghost" id="odExport" title="Descarga el diseño con el nombre y color del cliente"><span>Exportar HTML</span>${u("download")}</button>`:""}
        <button class="icon-btn" data-close aria-label="Cerrar">${u("x")}</button>
      </div>
    </div>
    <div class="od-etapas">
      <div class="od-etapas-h"><span>Etapa del proyecto</span><b>${l(b.txt)}</b>${t?"<small>Pulsa una etapa para cambiarla. El cliente la ve en «Mis proyectos».</small>":""}</div>
      ${$e(a,{editable:t})}
    </div>
    ${a.cancelacion&&a.estado!=="cancelado"?`<div class="od-alerta">${u("alert")}<div><b>${a.cancelacion.desistimiento?"El cliente ha ejercido su derecho de desistimiento":"El cliente pide cancelar el pedido"}</b><small>${new Date(a.cancelacion.t).toLocaleString("es-ES")}${a.cancelacion.motivo?" · «"+l(a.cancelacion.motivo)+"»":""}${a.cancelacion.desistimiento?` · Confírmaselo por correo y devuélvele lo pagado por transferencia en 14 días como máximo${a.inicioAnticipado?" (puedes descontar la parte proporcional del trabajo hecho: pidió empezar antes)":""}.`:""}</small>
        ${a.cancelacion.desistimiento?`<a class="link-btn" href="${ea(`Confirmación de tu desistimiento ${ia(a.id)}`,`Hola ${a.clienteNombre.split(" ")[0]},

Confirmamos que hemos recibido tu desistimiento del pedido ${ia(a.id)} (${a.planNombre}) el ${new Date(a.cancelacion.t).toLocaleString("es-ES")}. Te devolveremos lo pagado por transferencia en un plazo máximo de 14 días.

Un saludo,
${M.marca}`,a.clienteEmail)}">${u("mail")} Enviar la confirmación por correo</a>`:""}</div>
      ${s?'<button class="btn btn-sm btn-danger" id="odCancelSi"><span>Cancelar pedido</span></button><button class="btn btn-sm btn-ghost" id="odCancelNo"><span>Descartar</span></button>':""}</div>`:""}
    <div class="od-body od-cols">
      <section class="od-col">
        <h4 class="od-h">Gestión</h4>
        ${g?`<div class="od-paso ${g.quien}">
          <span class="od-paso-ic">${u(g.ic)}</span>
          <div><b>${l(g.txt)}</b>
            ${k?`<small>${a.recordado?`Último recordatorio ${V(a.recordado)}`:"Aún no se le ha recordado"}</small>`:g.ayuda?`<small>${l(g.ayuda)}</small>`:""}</div>
          ${k?`<button class="btn btn-sm btn-ghost" id="odRecordar" title="Le escribe un mensaje amable en su proyecto">${u("bell")}<span>Recordárselo</span></button>`:""}
        </div>`:""}
        <div class="od-fecha">
          <label><span>Entrega prevista</span><input type="date" id="odFecha" value="${ht(_(a))}" ${t?"":"disabled"}></label>
          ${na(a)?`<span class="pill plazo ${ka(a)}">${u("clock")} ${na(a)}</span>`:""}
        </div>
        <div class="od-actions">
          <label class="fc-select"><span>Estado</span>
            <select id="odEstado" ${t?"":"disabled"}>${Object.entries(U).map(([p,c])=>`<option value="${p}" ${a.estado===p?"selected":""}>${c.txt}</option>`).join("")}</select></label>
          ${s?`<label class="fc-select"><span>Asignado a</span><select id="odAsig"><option value="">Sin asignar</option>${G().map(p=>`<option value="${p.uid}" ${a.asignado===p.uid?"selected":""}>${l(p.name)}</option>`).join("")}<option value="${P.uid}" ${a.asignado===P.uid?"selected":""}>Yo (${l(P.name)})</option></select></label>`:a.asignado?`<label class="fc-select"><span>Asignado a</span><select disabled><option>${l(a.asignadoNombre)}</option></select></label>`:'<button class="btn btn-primary" id="odCoger"><span>Coger encargo</span></button>'}
        </div>
        <div class="od-pay ${h==="verificando"?"alert":""}">
          <label class="fc-select"><span>Pago</span>
            <select id="odPago" ${t?"":"disabled"}>${Object.entries(La).map(([p,c])=>`<option value="${p}" ${h===p?"selected":""}>${c.txt}</option>`).join("")}</select></label>
          <p class="od-pay-info">${h==="verificando"?`${u("euro")}<span>El cliente indica que ha pagado ${a.pagoFase==="resto"?"el resto":"la señal"} (<b class="nw">${f(a.pagoFase==="resto"?a.total-v:v)}</b>) por <b>${Oa[a.pagoMetodo]||a.pagoMetodo}</b> ${a.pagoAviso?V(a.pagoAviso):""}. Compruébalo en tu banco y márcalo como <b>Pagado</b> (o «Señal pagada»).</span>`:a.pagoMetodo?`Último pago por ${Oa[a.pagoMetodo]||a.pagoMetodo}.`:`Señal: ${f(v)} · Resto: ${f((a.total||0)-v)}`}</p>
          ${["senal","pagado"].includes(h)&&t?`<div class="od-correo">${(p=>p?`<small>${u("check")} Factura enviada por correo ${V(p)}${a.facturas?` · ${l(Object.values(a.facturas).join(", "))}`:""}</small>`:"<small>El cliente aún no ha recibido la factura por correo</small>")(Math.max(a.correos?.senal||0,a.correos?.resto||0,a.correos?.total||0))}<button type="button" class="btn btn-sm btn-ghost" id="odCorreo">${u("mail")}<span>${a.correos?"Reenviar factura":"Enviar factura"}</span></button></div>`:""}
        </div>
        ${yt(a,t)}
        <form class="od-urls" id="odUrls" novalidate>
          ${J({id:"odVista",name:"urlVista",label:"Enlace externo de la vista previa (opcional)",type:"url",value:a.urlVista||"",attrs:t?"":"disabled"})}
          ${J({id:"odWeb",name:"urlWeb",label:"Dirección de la web publicada",type:"url",value:a.urlWeb||"",attrs:t?"":"disabled"})}
          ${t?'<button class="btn btn-sm btn-ghost" type="submit"><span>Guardar enlaces</span></button>':""}
        </form>
        <div class="od-tareas">
          <div class="od-tareas-h"><span>Tareas internas</span><b>${ra(a)} %</b></div>
          <div class="barra"><i style="--w:${ra(a)}%"></i></div>
          <div class="tareas">${_a.map(([p,c])=>`
            <label class="tarea ${t?"":"off"}"><input type="checkbox" data-tarea="${p}" ${a.tareas?.[p]?"checked":""} ${t?"":"disabled"}><span class="ck-mark"></span><span>${c}</span></label>`).join("")}</div>
        </div>
        ${s?'<button class="btn btn-sm btn-danger" id="odDel"><span>Borrar pedido</span></button>':""}
      </section>

      <section class="od-col">
        <h4 class="od-h">Cliente</h4>
        <div class="od-client">
          ${F({name:a.clienteNombre})}
          <div><b>${l(a.clienteNombre)}</b><small>${l(a.clienteEmail)}${o.telefono?" · "+l(o.telefono):""}</small></div>
          <div class="od-cbtn">
            <a class="icon-btn" href="${ea(`Tu web ${A(a)} ${ia(a.id)}`,`Hola ${a.clienteNombre.split(" ")[0]},

`,a.clienteEmail)}" aria-label="Escribir correo">${u("mail")}</a>
            ${Ta&&(a.estado==="entregado"||a.etapa==="publicada")?`<a class="icon-btn" href="${ea(`¿Qué tal tu nueva web, ${a.clienteNombre.split(" ")[0]}?`,`Hola ${a.clienteNombre.split(" ")[0]},

Ya tienes tu web ${A(a)} publicada. Ha sido un placer trabajar contigo.

Si estás contento con el resultado, me ayudarías mucho dejando tu opinión: recibirás un correo de Trustpilot con un enlace y te lleva un minuto.

Gracias,
${M.marca}
`,a.clienteEmail,Ta)}" aria-label="Pedir reseña en Trustpilot" title="Pedir reseña en Trustpilot">${u("star")}</a>`:""}
            <button class="icon-btn" data-copy="${l(a.clienteEmail)}" aria-label="Copiar correo">${u("copy")}</button>
          </div>
        </div>
        <h4 class="od-h">Pedido</h4>
        <div class="kvs">
          ${a.ref?`<div class="kv"><span>Vendido por</span><b>${l(Ra(a.ref))} · ${ma} % = ${f(W(a))} ${a.comisionPagada?"(pagada)":""}</b></div>`:""}
          ${i("Tipo de web",a.planNombre)}
          <div class="kv"><span>Empezar</span><b>${a.inicioAnticipado?"Ya (lo pidió el cliente)":a.aceptaTerminos&&Date.now()<(a.createdAt||0)+14*864e5?`A partir del ${ba((a.createdAt||0)+14*864e5)}`:"Ya"}</b></div>
          <div class="kv"><span>Diseño</span><b>${n?`${l(n.nombre)} <a class="link-btn" href="${r}" target="_blank" rel="noopener">ver ${u("external")}</a>`:"Desde cero"}</b></div>
          ${i("Precio base",f(a.precioBase||0))}
          ${(a.extras||[]).map(p=>i(p.nombre,"+"+f(p.precio)+(p.mensual?"/mes":""))).join("")}
          ${a.urgente?i("Urgente","Sí"):""}
          ${a.descuento?i(`Cupón ${a.cupon||""}`,"−"+f(a.descuento)):""}
          ${ta(a)?`<div class="kv"><span>Recomendado por</span><b>${l(ta(a).name)}${ta(a).email?` · ${l(ta(a).email)}`:""} · ${a.premioAmigo?"premio dado":Ga(a)?`<button type="button" class="link-btn" id="odPremio">Marcar premio dado (${l(M.referidos?.premio||"premio")})</button>`:"premio cuando pague"}</b></div>`:""}
          <div class="kv total"><span>Total</span><b>${f(a.total||0)}${a.mensual?` + ${f(a.mensual)}/mes`:""}</b></div>
          ${i(`Señal (${M.senal} %)`,f(v))}
        </div>
        ${t?`<h4 class="od-h">Acceso al correo del cliente</h4>
        <div class="od-acceso">
          <p class="muted">Cuando hayas creado su correo (Gmail o con su dominio), pon aquí el usuario y una contraseña temporal: el cliente los ve en su proyecto y se le pide que la cambie.</p>
          <div class="row-2"><input id="odAccUsuario" type="email" autocomplete="off" placeholder="tunegocio@gmail.com" value="${l(a.accesos?.correo?.usuario||a.dominio?.correo||"")}" aria-label="Usuario del correo"><input id="odAccClave" type="text" autocomplete="off" spellcheck="false" placeholder="Contraseña temporal" value="${l(a.accesos?.correo?.clave||"")}" aria-label="Contraseña temporal"></div>
          <button type="button" class="btn btn-sm btn-ghost" id="odAccGuardar">${u("key")}<span>${a.accesos?.correo?.usuario?"Actualizar acceso":"Dar acceso al cliente"}</span></button>
        </div>`:""}
        <h4 class="od-h">Cuestionario</h4>
        <div class="kvs">
          ${i("Sector",o.sector)}${i("Objetivo",o.objetivo)}${i("Web actual",o.webActual)}${i("Estilo",o.estilo)}
          ${o.color?`<div class="kv"><span>Color</span><b><i class="dotc" style="background:${l(o.color)}"></i>${l(o.color)}</b></div>`:""}
          ${i("Logotipo",o.logo)}${i("Textos y fotos",o.contenido)}${i("Plazo",o.plazo)}
        </div>
        ${o.comentarios?`<div class="od-note">${u("message")} ${l(o.comentarios)}</div>`:""}
      </section>

      <section class="od-col od-col-tabs">
        <nav class="mp-tabs od-tabs" role="tablist">${gt.map(([p,c,$])=>`<button type="button" role="tab" data-odp="${p}" class="${Ma===p?"on":""}">${u($)}<span>${c}</span></button>`).join("")}</nav>
        <div class="od-pest" id="odPest">
          <div data-odv="enviado" hidden>${ge(a,{editable:t})}</div>
          <div data-odv="historial" hidden>${we(a)}</div>
          <div data-odv="notas" hidden>
            <p class="muted" style="font-size:13px;margin:6px 0 10px">Solo las ve el equipo.</p>
            <div class="notes">${(a.notas||[]).map(p=>`<div class="note"><div><b>${l(p.autor)}</b><small>${V(p.t)}</small></div><p>${l(p.texto)}</p></div>`).join("")||'<p class="muted" style="font-size:14px">Sin notas todavía.</p>'}</div>
            ${t||!a.asignado?`<form class="note-form" id="odNoteForm" novalidate>${J({id:"odNote",label:"Nota para el equipo",type:"textarea"})}<button class="btn btn-sm btn-primary" type="submit"><span>Añadir nota</span></button></form>`:""}
          </div>
          <div data-odv="mensajes" hidden></div>
          <div data-odv="archivos" hidden></div>
        </div>
      </section>
    </div>`,xa(T),wa(),wa=()=>{};const j=p=>{Ma=p,R("[data-odp]",T).forEach($=>$.classList.toggle("on",$.dataset.odp===p)),R("[data-odv]",T).forEach($=>$.hidden=$.dataset.odv!==p);const c=m(`[data-odv="${p}"]`,T);p==="mensajes"&&!c.dataset.ok&&(c.dataset.ok=1,wa=Me(c,a,{equipo:!0})),p==="archivos"&&!c.dataset.ok&&(c.dataset.ok=1,De(c,a,{equipo:!0}))};R("[data-odp]",T).forEach(p=>p.addEventListener("click",()=>j(p.dataset.odp))),j(Ma),history.replaceState(null,"","#pedido-"+a.id);let D=!1;const L=async(p,c,$="")=>{if(D)return E("Espera un momento, se está guardando el cambio anterior");D=!0,T.classList.add("od-guardando");const d=m(".od-body",T)?.scrollTop||0;let x=!1;try{$&&(p=fe(a,p,$,P.name)),await y.actualizarPedido(a.id,p),Object.assign(a,p),x=!0,c&&E(c,"ok"),ca()}catch(q){E(`No se ha guardado: ${q.message}`,"err")}finally{if(D=!1,T.classList.remove("od-guardando"),Z.open){X(a.id);const q=m(".od-body",T);q&&(q.scrollTop=d)}}return x};R("[data-etapa]",T).forEach(p=>p.addEventListener("click",()=>{const c=p.dataset.etapa;if(c===Q(a))return;const $=ua.find(d=>d.id===c);L({etapa:c,estado:Fa(c,a.estado)},`Etapa: ${$.txt}. El cliente recibe un aviso.`,`Etapa: ${$.txt}`)})),R("[data-tarea]",T).forEach(p=>p.addEventListener("change",()=>{const c={...a.tareas||{},[p.dataset.tarea]:p.checked},$=_a.every(([d])=>c[d]);L({tareas:c},$?"Todas las tareas hechas. Ya puedes pasarla a «Publicada».":"Tarea actualizada")})),m("#odEstado",T)?.addEventListener("change",p=>L({estado:p.target.value,...p.target.value==="entregado"?{etapa:"publicada"}:{}},`Estado: ${U[p.target.value].txt}`,`Estado: ${U[p.target.value].txt}`)),m("#odPago",T)?.addEventListener("change",async p=>{const c=p.target.value,$=h;await L({pagoEstado:c},`Pago: ${La[c].txt}`,`Pago: ${La[c].txt}`)&&(c==="senal"?Ha(a,"senal"):c==="pagado"&&Ha(a,$==="senal"||a.pagoFase==="resto"||a.correos?.senal?"resto":"total"))}),m("#odCorreo",T)?.addEventListener("click",p=>{const c=a.pagoEstado==="senal"?"senal":a.correos?.senal||a.pagoFase==="resto"?"resto":"total";Ha(a,c,{reenviar:!0,btn:p.currentTarget})}),m("#odFecha",T)?.addEventListener("change",p=>{if(!p.target.value)return;const[c,$,d]=p.target.value.split("-").map(Number);L({fechaEntrega:new Date(c,$-1,d,18).getTime()},"Fecha de entrega actualizada",`Nueva fecha de entrega: ${d}/${$}/${c}`)}),m("#odRecibo",T)?.addEventListener("click",()=>qe(a,"")),m("#odAccGuardar",T)?.addEventListener("click",()=>{const p=m("#odAccUsuario",T).value.trim(),c=m("#odAccClave",T).value.trim();if(!/^\S+@\S+\.\S+$/.test(p))return E("Escribe el correo completo del cliente","err");if(c.length<8)return E("La contraseña temporal debe tener al menos 8 caracteres","err");L({accesos:{...a.accesos||{},correo:{usuario:p,clave:c,fecha:Date.now()}}},"Acceso guardado: el cliente ya lo ve en su proyecto",`Acceso al correo entregado (${p})`)}),m("#odPremio",T)?.addEventListener("click",()=>L({premioAmigo:Date.now()},"Premio marcado como dado",`Premio por recomendación dado a ${ta(a)?.name||"quien recomendó"}`)),m("#odCancelSi",T)?.addEventListener("click",()=>{confirm("¿Cancelar este pedido? El cliente lo verá como cancelado.")&&L({estado:"cancelado",cancelacion:{...a.cancelacion,aceptada:Date.now()}},"Pedido cancelado","Pedido cancelado a petición del cliente")}),m("#odCancelNo",T)?.addEventListener("click",()=>L({cancelacion:null},"Solicitud descartada","Solicitud de cancelación descartada")),m("#odAsig",T)?.addEventListener("change",p=>{const c=p.target.value,$=c===P.uid?P:w.usuarios.find(x=>x.uid===c),d={asignado:c,asignadoNombre:$?$.name:""};c&&a.estado==="nuevo"&&(d.estado="en_curso"),L(d,c?`Asignado a ${$.name}`:"Sin asignar",c?`Asignado a ${$.name}`:"Sin asignar")}),m("#odUrls",T)?.addEventListener("submit",p=>{p.preventDefault();const c=new FormData(p.target),$=d=>(d=String(d||"").trim(),d&&!/^https?:\/\//.test(d)?"https://"+d:d);L({urlVista:$(c.get("urlVista")),urlWeb:$(c.get("urlWeb"))},"Enlaces guardados","Enlaces actualizados")}),m("#odExport",T)?.addEventListener("click",p=>Pt(a,p.currentTarget)),m("#odFicha",T)?.addEventListener("click",()=>qa(Ee(a))),m("#odBrief",T)?.addEventListener("click",()=>xt(a)),m("#odRecordar",T)?.addEventListener("click",async p=>{const c=p.currentTarget;if(!(a.recordado&&Date.now()-a.recordado<864e5&&!confirm("Ya se le recordó hace menos de un día. ¿Enviar otro recordatorio?"))){C(c,!0);try{await y.enviarMensaje(a.id,Ia[Q(a)](a)),await L({recordado:Date.now()},"Recordatorio enviado. El cliente recibe un aviso.","Recordatorio enviado al cliente")}catch($){E($.message,"err"),C(c,!1)}}}),R("[data-hecho]",T).forEach(p=>p.addEventListener("change",()=>{const c=a.revision||{},$=(c.comentarios||[]).map((x,q)=>q===+p.dataset.hecho?{...x,hecho:p.checked?Date.now():0}:x),d=$.filter(x=>!x.hecho).length;Ma="enviado",L({revision:{...c,comentarios:$}},d?`Quedan ${d} cambio${d===1?"":"s"} por hacer`:"Todos los cambios hechos. Sube la versión nueva y envíasela.")})),kt(a,t,L),m("#odCoger",T)?.addEventListener("click",async p=>{const c=p.currentTarget;C(c,!0);try{await be(a.id),Object.assign(a,{asignado:P.uid,asignadoNombre:P.name,estado:"en_curso"}),E("Encargo asignado a ti","ok"),ca(),X(a.id)}catch($){E($.message,"err"),C(c,!1)}}),m("#odNoteForm",T)?.addEventListener("submit",p=>{p.preventDefault();const c=m("#odNote",T).value.trim();c&&L({notas:[...a.notas||[],{autor:P.name,texto:c,t:Date.now()}]},"Nota añadida")}),m("#odDel",T)?.addEventListener("click",async()=>{if(confirm("¿Borrar este pedido para siempre?"))try{await y.borrarPedido(a.id),xe(Z),E("Pedido borrado"),await O()}catch(p){E(p.message,"err")}}),Z.open||Ba(Z)}const ft=e=>(e.webs||[]).slice().sort((a,o)=>o.n-a.n);function yt(e,a){const o=ft(e),n=(e.revision?.comentarios||[]).filter(s=>!s.hecho).length;return`<section class="od-web" aria-labelledby="odWebT">
    <div class="od-web-h"><b id="odWebT">Web del cliente</b>${o.length?`<small>${o.length} versi${o.length===1?"ón":"ones"}</small>`:""}
      <button type="button" class="link-btn" id="odBajarCli" title="Fotos, logotipo y documentos que ha subido el cliente, en un .zip">${u("download")} Archivos del cliente</button></div>
    ${e.revision?.estado==="cambios"&&n?`<p class="od-web-aviso">${u("alert")}<span>El cliente ha pedido ${n} cambio${n===1?"":"s"}. Márcalos como hechos en «Del cliente» y sube la versión nueva.</span></p>`:""}
    ${a?`
    <div class="od-drop" id="odDrop" role="group" aria-label="Subir una versión de la web">
      <span class="od-drop-ic">${u("upload")}</span>
      <span class="od-drop-t"><b>Subir una versión</b><small>Arrastra aquí el .zip, la carpeta o el index.html con sus archivos</small></span>
      <span class="od-drop-btns">
        <label class="btn btn-sm btn-primary"><input type="file" id="odWebIn" multiple hidden accept=".zip,.html,.htm,.css,.js,.mjs,.json,.svg,.webmanifest,image/*,video/*,audio/*,.woff,.woff2,.ttf,.otf">${u("file")}<span>Archivos o .zip</span></label>
        <label class="btn btn-sm btn-ghost"><input type="file" id="odWebDir" hidden webkitdirectory directory multiple>${u("folder")}<span>Carpeta</span></label>
      </span>
    </div>
    <div class="od-prep" id="odPrep" hidden></div>`:""}
    ${o.length?`<ul class="od-vers">${o.map(s=>{const t=e.webCliente===s.id;return`<li class="${t?"cli":""}">
        <button type="button" class="od-ver" data-ver-v="${l(s.id)}" title="Ver la versión ${s.n}">
          <span class="od-ver-n">v${s.n}</span>
          <span class="od-ver-t"><b>${t?"La ve el cliente":`Versión ${s.n}`}</b><small>${V(s.t)}${s.autor?` · ${l(s.autor)}`:""} · ${Pa(s.bytes||0)}${s.paginas?.length>1?` · ${s.paginas.length} páginas`:""}</small>${s.nota?`<small class="od-ver-nota">${l(s.nota)}</small>`:""}</span>
          ${u("eye")}
        </button>
        ${a?`<span class="od-ver-acc">
          ${t?"":`<button type="button" class="btn btn-sm btn-ghost" data-enviar-v="${l(s.id)}">${u("send")}<span>Enviar</span></button>`}
          <button type="button" class="icon-btn sm" data-borrar-v="${l(s.id)}" aria-label="Borrar la versión ${s.n}" title="Borrar">${u("trash")}</button>
        </span>`:""}
      </li>`}).join("")}</ul>${a?wt(e,o):e.publica?.slug?`<p class="od-pub-ok">${u("globe")} <a href="${l(Y(e.publica.slug))}" target="_blank" rel="noopener">${l(Y(e.publica.slug).replace(/^https?:\/\//,""))}</a></p>`:""}`:`<p class="od-web-vacio">${a?"Todavía no hay ninguna versión. Cuando subas la primera, podrás verla en móvil, tableta y ordenador y enviársela al cliente para que la apruebe.":"Todavía no hay ninguna versión subida."}</p>`}
  </section>`}const Y=e=>`${M.dominio?"https://"+M.dominio.replace(/^https?:\/\//,"").replace(/\/$/,""):location.origin}/${e}`;function wt(e,a){const o=e.publica?.slug?e.publica:null,n=o&&a.find(r=>r.id===o.version),s=o&&n?n.id:e.webCliente||a[0].id,t=a.map(r=>`<option value="${l(r.id)}"${r.id===s?" selected":""}>Versión ${r.n}${e.webCliente===r.id?" (la ve el cliente)":""}</option>`).join(""),i=o?.slug||y.aSlug(e.respuestas?.negocio||A(e));return`<div class="od-pub" id="odPub">
    <div class="od-pub-h">${u("globe")}<b>Enlace público</b>${o?'<span class="pill p-done">Publicada</span>':""}</div>
    ${o?`<p class="od-pub-link"><a href="${l(Y(o.slug))}" target="_blank" rel="noopener">${l(Y(o.slug).replace(/^https?:\/\//,""))}</a>
      <button type="button" class="icon-btn sm" data-copy="${l(Y(o.slug))}" aria-label="Copiar enlace">${u("copy")}</button></p>
      <small class="od-pub-nota">Cualquiera con el enlace ve ${n?`la versión ${n.n}`:"la web"}. El resto de versiones y archivos siguen siendo privados.</small>`:'<small class="od-pub-nota">Publica una versión en vuestro dominio para que el cliente la enseñe o la pruebe en cualquier móvil, sin iniciar sesión.</small>'}
    <div class="od-pub-f">
      <label class="od-pub-slug"><span>${l(Y("").replace(/^https?:\/\//,""))}</span><input id="odSlug" value="${l(i)}" maxlength="48" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Nombre del enlace"></label>
      <select id="odPubV" aria-label="Versión que se publica">${t}</select>
    </div>
    <div class="od-pub-btns">
      ${o?`<button type="button" class="btn btn-sm btn-ghost" id="odDespub">${u("ban")}<span>Despublicar</span></button>`:""}
      <button type="button" class="btn btn-sm btn-primary" id="odPublicar">${u("globe")}<span>${o?"Guardar cambios":"Publicar"}</span></button>
    </div>
  </div>`}function Et(e,a){const o=m("#odPub",T);if(!o)return;const n=m("#odSlug",o);n.addEventListener("input",()=>{const s=y.aSlug(n.value)+(/[-\s]$/.test(n.value)?"-":"");s!==n.value&&(n.value=s)}),m("#odPublicar",o).addEventListener("click",async s=>{const t=s.currentTarget,i=y.aSlug(n.value),r=(e.webs||[]).find(h=>h.id===m("#odPubV",o).value),v=y.motivoSlug(i);if(v)return E(v,"err");if(r){C(t,!0);try{const h=!e.publica?.slug||e.publica.slug!==i,b=await y.publicarWeb(e,r,i);await a({publica:b},`Publicada en ${Y(i).replace(/^https?:\/\//,"")}`,`Web publicada en ${Y(i)} (versión ${r.n})`)&&h&&y.enviarMensaje(e.id,`Tu web ya se puede ver en ${Y(i)}

Puedes abrir el enlace en cualquier móvil u ordenador y compartirlo.`).catch(()=>{})}catch(h){E(h.message,"err"),C(t,!1)}}}),m("#odDespub",o)?.addEventListener("click",async s=>{if(!confirm("¿Quitar la web del enlace público? Dejará de verse en ese enlace."))return;const t=s.currentTarget;C(t,!0);try{await y.despublicarWeb(e),await a({publica:null},"Enlace público desactivado","Web despublicada")}catch(i){E(i.message,"err"),C(t,!1)}})}async function Va(e,a,o){const n={webCliente:a.id,revision:{...e.revision||{},estado:"pendiente",t:Date.now()}};if(Q(e)!=="revision"&&Object.assign(n,{etapa:"revision",estado:Fa("revision",e.estado)}),!await o(n,`Versión ${a.n} enviada. El cliente ya puede verla y aprobarla.`,`Versión ${a.n} enviada al cliente`))throw new Error("No se ha podido enviar la versión");y.enviarMensaje(e.id,`Ya puedes ver la versión ${a.n} de tu web en «Mis proyectos». Recórrela en el móvil y en el ordenador y, desde la misma vista previa, apruébala o dinos qué cambiarías.${a.nota?`

En esta versión: ${a.nota}`:""}`).catch(()=>{})}function kt(e,a,o){const n=m(".od-web",T);if(!n)return;const s=(b,g)=>He(e,b,g);if(a&&Et(e,o),n.addEventListener("click",async b=>{const g=b.target.closest("[data-ver-v]");if(g){const L=(e.webs||[]).find(p=>p.id===g.dataset.verV);return L&&Ve({p:e,version:L,modo:"equipo",enlace:s,alEnviar:a?p=>Va(e,p,o):null})}const k=b.target.closest("[data-enviar-v]");if(k){const L=(e.webs||[]).find(p=>p.id===k.dataset.enviarV);if(!L)return;C(k,!0);try{await Va(e,L,o)}catch(p){E(p.message,"err"),C(k,!1)}return}const j=b.target.closest("[data-borrar-v]");if(j){const L=(e.webs||[]).find(p=>p.id===j.dataset.borrarV);if(!L||!confirm(`¿Borrar la versión ${L.n}?${e.webCliente===L.id?" El cliente dejará de verla.":""} No se puede deshacer.`))return;C(j,!0);try{e.publica?.version===L.id&&(await y.despublicarWeb(e),await o({publica:null},"","")),await y.borrarWeb(L),await o({webs:(e.webs||[]).filter(p=>p.id!==L.id),...e.webCliente===L.id?{webCliente:""}:{}},`Versión ${L.n} borrada`,`Versión ${L.n} borrada`)}catch(p){E(p.message,"err"),C(j,!1)}return}const D=b.target.closest("#odBajarCli");D&&Ae(e,D)}),!a)return;const t=m("#odDrop",n),i=m("#odPrep",n);let r=null;async function v(b){if(b=[...b],!b.length)return;i.hidden=!1,i.innerHTML=`<p class="od-prep-c">${u("refresh")} Revisando los archivos…</p>`;try{r=await Ne(b)}catch(k){r=null,i.innerHTML=`<p class="od-prep-err">${u("alert")}<span>${l(k.message)}</span></p>`;return}const g=Math.max(0,...(e.webs||[]).map(k=>k.n||0))+1;i.innerHTML=`
      <div class="od-prep-r">${u("check")}<span><b>Versión ${g}</b> · ${l(r.entrada)}${r.paginas.length>1?` y ${r.paginas.length-1} página${r.paginas.length===2?"":"s"} más`:""} · ${r.archivos.length} archivo${r.archivos.length===1?"":"s"} · ${Pa(r.bytes)}</span></div>
      ${r.avisos.map(k=>`<p class="od-prep-av">${u("alert")}<span>${l(k)}</span></p>`).join("")}
      ${J({id:"odNotaV",label:"Qué cambia en esta versión (opcional, lo ve el cliente)",type:"textarea",attrs:'maxlength="500" rows="2"'})}
      <div class="arch-prog" id="odWebProg" hidden><i></i><span></span></div>
      <div class="od-prep-btns">
        <button type="button" class="btn btn-sm btn-ghost" id="odPrepNo">Cancelar</button>
        <button type="button" class="btn btn-sm btn-ghost" id="odPrepSubir">${u("upload")}<span>Subir</span></button>
        <button type="button" class="btn btn-sm btn-primary" id="odPrepEnviar">${u("send")}<span>Subir y enviar al cliente</span></button>
      </div>`,xa(i),m("#odPrepNo",i).addEventListener("click",()=>{r=null,i.hidden=!0,i.innerHTML=""}),m("#odPrepSubir",i).addEventListener("click",k=>h(k.currentTarget,!1)),m("#odPrepEnviar",i).addEventListener("click",k=>h(k.currentTarget,!0))}async function h(b,g){if(!r)return;const k=m("#odWebProg",i);R(".od-prep-btns .btn",i).forEach(j=>j.disabled=!0),C(b,!0),k.hidden=!1;try{const j=await ze(e,r,{nota:m("#odNotaV",i)?.value,alProgreso:(p,c,$)=>{m("i",k).style.width=`${Math.round(p/c*100)}%`,m("span",k).textContent=`Subiendo ${Pa(p)} de ${Pa(c)} · ${$}`}}),D=[...e.webs||[],j];if(!await o({webs:D},g?"":`Versión ${j.n} subida. Ábrela para revisarla antes de enviarla.`,`Versión ${j.n} subida`)){await y.borrarWeb(j).catch(()=>{});return}g&&await Va(e,j,o)}catch(j){E(j.message,"err"),R(".od-prep-btns .btn",i).forEach(D=>D.disabled=!1),C(b,!1),k.hidden=!0}}m("#odWebIn",n).addEventListener("change",b=>{v(b.target.files),b.target.value=""}),m("#odWebDir",n).addEventListener("change",b=>{v(b.target.files),b.target.value=""}),["dragenter","dragover"].forEach(b=>t.addEventListener(b,g=>{g.preventDefault(),t.classList.add("over")})),["dragleave","drop"].forEach(b=>t.addEventListener(b,g=>{g.preventDefault(),(b==="drop"||!t.contains(g.relatedTarget))&&t.classList.remove("over")})),t.addEventListener("drop",async b=>v(await Lt(b.dataTransfer)))}async function Lt(e){const a=[...e.items||[]].map(s=>s.webkitGetAsEntry?.()).filter(Boolean);if(!a.length||a.every(s=>s.isFile))return[...e.files];const o=[],n=(s,t)=>new Promise(i=>{if(s.isFile)return s.file(b=>{const g=new File([b],b.name,{type:b.type});Object.defineProperty(g,"webkitRelativePath",{value:t+b.name}),o.push(g),i()},()=>i());const r=s.createReader(),v=[],h=()=>r.readEntries(async b=>{if(!b.length){for(const g of v)await n(g,t+s.name+"/");return i()}v.push(...b),h()},()=>i());h()});for(const s of a)await n(s,"");return o}async function Ha(e,a,{reenviar:o=!1,btn:n=null}={}){C(n,!0);try{const s=await y.enviarCorreoPago(e.id,a,{reenviar:o});if(s?.demo)E("Modo demo: con Brevo conectado, el cliente recibiría ahora la factura en PDF por correo","ok");else if(s?.enviado){const t={...e.correos||{},[a]:Date.now()},i=s.factura?{...e.facturas||{},[a]:s.factura}:e.facturas;await y.actualizarPedido(e.id,{correos:t,...i?{facturas:i}:{}}),e.correos=t,i&&(e.facturas=i),E(s.factura?`Factura ${s.factura} enviada a ${s.para}`:`Recibo enviado por correo a ${s.para}`,"ok"),m("#orderDlg")?.open&&X(e.id)}}catch(s){E(`El pago está guardado, pero el correo no se ha enviado: ${s.message}`,"err")}finally{C(n,!1)}}async function xt(e){let a=m("#briefDlg");a||(a=document.createElement("dialog"),a.className="dlg brief-dlg",a.id="briefDlg",a.setAttribute("aria-labelledby","briefT"),document.body.appendChild(a)),a.innerHTML=`<div class="dlg-box brief-box">
    <div class="brief-head">
      <div><h2 id="briefT">${l(A(e))}</h2><p class="brief-sub">${u("sparkle")} Prompt y PDF con todo lo del cliente</p></div>
      <button class="icon-btn" data-close aria-label="Cerrar">${u("x")}</button>
    </div>
    <div class="brief-cuerpo" aria-live="polite">
      <div class="brief-carga"><span class="brief-orbe" aria-hidden="true"></span><p id="briefEstado">Reuniendo lo que ha enviado el cliente…</p></div>
    </div></div>`,Ba(a);const o=n=>{const s=m("#briefEstado",a);s&&(s.textContent=n)};try{const n=await import("./brief.js"),s=await y.listarArchivos(e.id).catch(()=>[]),t=n.datosBrief(e,s);o(y.iaDisponible()?"La IA está escribiendo el prompt…":"Preparando el prompt…");const i=await n.promptIA(t);if(!a.open)return;const r=t.secciones.reduce((v,h)=>v+h.filas.length,0);m(".brief-cuerpo",a).innerHTML=`
      <div class="brief-resumen">
        <span><b>${t.secciones.length}</b> secciones</span><span><b>${r}</b> datos</span><span><b>${s.length}</b> archivos</span>
        <span class="brief-origen ${i.ia?"ia":""}">${i.ia?"Escrito por la IA":"Automático, sin IA"}</span>
      </div>
      <label class="brief-label" for="briefTxt">Prompt para crear la web</label>
      <textarea id="briefTxt" class="brief-txt" spellcheck="false">${l(i.texto)}</textarea>
      <p class="brief-nota">Puedes retocarlo aquí: el PDF lleva el texto tal y como lo dejes.</p>
      <div class="brief-acc">
        <button class="btn btn-ghost" id="briefCopiar" type="button">${u("copy")}<span>Copiar prompt</span></button>
        <button class="btn btn-primary" id="briefPdf" type="button">${u("download")}<span>Descargar PDF</span></button>
      </div>`,m("#briefCopiar",a).addEventListener("click",()=>qa(m("#briefTxt",a).value)),m("#briefPdf",a).addEventListener("click",async v=>{const h=v.currentTarget,b=m("span",h),g=b.textContent;C(h,!0);try{const k=await n.pdfBrief(e,t,{...i,texto:m("#briefTxt",a).value},s,{alProgreso:j=>{b.textContent=j}});E(`PDF descargado: ${k}`)}catch(k){E(k.message||"No se ha podido crear el PDF","err")}b.textContent=g,C(h,!1)})}catch(n){m(".brief-cuerpo",a).innerHTML=`<p class="brief-error">${l(n.message||"No se ha podido preparar el brief")}</p>`}}async function Pt(e,a){const o=e.respuestas||{};C(a,!0);const n=document.createElement("iframe");n.style.cssText="position:fixed;left:-9999px;top:0;width:1280px;height:800px;opacity:0;pointer-events:none",n.src=`diseno?t=${encodeURIComponent(e.plantilla)}&n=${encodeURIComponent(o.negocio||"")}&c=${encodeURIComponent(o.color||"")}&x=1`,document.body.appendChild(n);try{await new Promise((g,k)=>{n.onload=g,setTimeout(()=>k(new Error("El diseño ha tardado demasiado en cargar")),15e3)});const s=n.contentDocument;for(let g=0;g<40&&!s.querySelector("#site nav");g++)await new Promise(k=>setTimeout(k,100));const t=s.documentElement.cloneNode(!0),i=t.querySelector("link[data-fuentes]");if(i)try{let g=await(await fetch(i.href)).text();const k=new URL(".",i.href);for(const[D,L]of[...g.matchAll(/url\(([^)]+\.woff2)\)/g)]){const p=await(await fetch(new URL(L,k))).blob(),c=await new Promise($=>{const d=new FileReader;d.onload=()=>$(d.result),d.readAsDataURL(p)});g=g.replace(D,`url(${c})`)}const j=s.createElement("style");j.textContent=g,i.replaceWith(j)}catch{}t.querySelectorAll("script, .ribbon").forEach(g=>g.remove()),t.querySelector("meta[name=robots]")?.remove(),t.querySelectorAll("img").forEach(g=>g.classList.remove("ok")),t.classList.remove("mini","anim","sin-anim");const r=s.createElement("script");r.textContent=`(${ve.toString()})(${JSON.stringify({check:u("check"),plus:u("plus")})});`,t.querySelector("body").appendChild(r);const v=`<!doctype html>
`+t.outerHTML,h=(o.negocio||Ct(e)).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"web",b=document.createElement("a");b.href=URL.createObjectURL(new Blob([v],{type:"text/html"})),b.download=`${h}.html`,document.body.appendChild(b),b.click(),b.remove(),setTimeout(()=>URL.revokeObjectURL(b.href),4e3),E("HTML descargado. Ábrelo en el navegador para comprobarlo.")}catch(s){E(s.message,"err")}finally{n.remove(),C(a,!1)}}const Ct=e=>Da(e.plantilla)?.nombre||"web";
