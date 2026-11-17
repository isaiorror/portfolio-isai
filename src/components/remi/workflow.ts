export type Locale = 'en' | 'es';
export type Copy = Record<Locale, string>;
const copy = (en: string, es: string): Copy => ({ en, es });
export const heading = copy('REMI Broadcast Workflow', 'Flujo de Producción REMI');
export const subtitle = copy('From field acquisition to live broadcast across 6 local operations', 'De la cobertura en campo a la transmisión en vivo de 6 noticieros locales');
export type NodeId = 'editorial'|'assets'|'rundown'|'talent'|'cloud'|'ingest'|'editing'|'tricaster'|'iso'|'assembly'|'qc'|'delivery'|'live'|'master'|'break'|'return'|'air';
export type Node = { id: NodeId; title: Copy; kicker: Copy; lines: Copy[]; role?: boolean; loop?: Copy; signal?: boolean; height: number };
export const nodes: Node[] = [
  {id:'editorial',title:copy('Field → editorial','Campo → editorial'),kicker:copy('CONTENT PRODUCTION','PRODUCCIÓN DE CONTENIDO'),lines:[copy('Field Acquisition · Local team','Cobertura en campo · Equipo local'),copy('Story Writing · Reporter','Redacción · Reportero'),copy('Editorial Approval · News chief','Aprobación · Jefe de Información')],loop:copy('Revisions → Story Writing','Cambios → Redacción'),height:218},
  {id:'assets',title:copy('Story assets','Materiales de la nota'),kicker:copy('READY FOR EXCHANGE','LISTOS PARA INTERCAMBIO'),lines:[copy('iNews script · Voice-over','Guion iNews · Voz en off'),copy('Media assets','Material audiovisual')],height:130},
  {id:'rundown',title:copy('iNEWS RUNDOWN','ESCALETA iNEWS'),kicker:copy('LOCAL NEWSROOM','REDACCIÓN LOCAL'),lines:[copy('Prepared by the News chief','Preparada por Jefe de Información'),copy('Editorial / operational information','Información editorial / operativa')],height:130},
  {id:'talent',title:copy('Local studio / talent','Estudio local / talento'),kicker:copy('REMOTE CONNECTION','CONEXIÓN REMOTA'),lines:[copy('Remote talent feed','Señal remota de talento')],signal:true,height:112},
  {id:'cloud',title:copy('CLOUD','NUBE'),kicker:copy('CONTENT EXCHANGE','INTERCAMBIO DE CONTENIDO'),lines:[],height:86},
  {id:'ingest',title:copy('Asset download','Descarga de materiales'),kicker:copy('CONTENT INGEST','INGESTA DE CONTENIDO'),lines:[copy('Material coordination','Coordinación de materiales')],role:true,height:112},
  {id:'editing',title:copy('News Package Editing','Edición de notas'),kicker:copy('EDITORIAL / POST','EDITORIAL / POST'),lines:[copy('Editors · QC / Approval','Editores · QC / Aprobación'),copy('Approved packages','Notas aprobadas')],role:true,loop:copy('QC revisions → Editing','Cambios de QC → Edición'),height:172},
  {id:'tricaster',title:copy('TriCaster','TriCaster'),kicker:copy('TALENT PRODUCTION','PRODUCCIÓN DE TALENTO'),lines:[copy('Remote feed reception','Recepción de señal remota')],signal:true,height:112},
  {id:'iso',title:copy('ISO Recording','Grabación ISO'),kicker:copy('RECORDINGS → EDITORS','GRABACIONES → EDITORES'),lines:[copy('Composited talent','Talento con composición'),copy('Clean / green-screen ISO','ISO limpio / green screen')],role:true,height:130},
  {id:'assembly',title:copy('Newscast Assembly','Armado de noticiero'),kicker:copy('NEWSCAST BUILD','CONSTRUCCIÓN DEL NOTICIERO'),lines:[copy('Packages · Talent · Graphics','Notas · Talento · Gráficos'),copy('In-program commercial integrations','Comerciales dentro del programa'),copy('Broadcast elements','Elementos de transmisión')],role:true,height:156},
  {id:'qc',title:copy('Block QC / Approval','QC / Aprobación final'),kicker:copy('CNP / FINAL QUALITY CONTROL','CNP / CONTROL DE CALIDAD FINAL'),lines:[copy('Approved blocks','Bloques aprobados')],role:true,height:112},
  {id:'delivery',title:copy('CLOUD DELIVERY','ENTREGA POR NUBE'),kicker:copy('A / PREPRODUCED CONTENT','A / CONTENIDO PREPRODUCIDO'),lines:[copy('Approved blocks → Local master','Bloques aprobados → Master local')],height:112},
  {id:'live',title:copy('Live REMI Production','Producción REMI en vivo'),kicker:copy('B / LIVE PROGRAM SIGNAL','B / SEÑAL PROGRAM EN VIVO'),lines:[copy('TriCaster · Assets + live feeds','TriCaster · Materiales + señales'),copy('CNP generates PROGRAM','CNP genera PROGRAM')],role:true,signal:true,height:130},
  {id:'master',title:copy('LOCAL MASTER CONTROL','MASTER CONTROL LOCAL'),kicker:copy('PLAYOUT & SIGNAL RECEPTION','PLAYOUT Y RECEPCIÓN DE SEÑAL'),lines:[copy('Receives blocks + PROGRAM','Recibe bloques + PROGRAM'),copy('Confirms PROGRAM reception','Confirma recepción de PROGRAM')],signal:true,height:140},
  {id:'break',title:copy('Commercial Break','Corte comercial'),kicker:copy('MASTER CONTROL PLAYOUT','MASTER CONTROL PLAYOUT'),lines:[],signal:true,height:86},
  {id:'return',title:copy('PROGRAM RETURN','RETORNO A PROGRAM'),kicker:copy('BACK TO THE LIVE NEWSCAST','REGRESO AL NOTICIERO EN VIVO'),lines:[],signal:true,height:86},
  {id:'air',title:copy('ON AIR','AL AIRE'),kicker:copy('LIVE BROADCAST','TRANSMISIÓN EN VIVO'),lines:[],signal:true,height:100},
];
export type Flow = 'content'|'signal'|'editorial';
export type Edge = {from:NodeId;to:NodeId;flow:Flow;label?:Copy};
export const edges: Edge[] = [
 {from:'editorial',to:'assets',flow:'content'}, {from:'assets',to:'cloud',flow:'content'},
 {from:'cloud',to:'ingest',flow:'content'}, {from:'ingest',to:'editing',flow:'content'},
 {from:'editing',to:'assembly',flow:'content',label:copy('APPROVED PACKAGES','NOTAS APROBADAS')},
 {from:'rundown',to:'assembly',flow:'editorial'}, {from:'talent',to:'tricaster',flow:'signal'},
 {from:'tricaster',to:'iso',flow:'content'}, {from:'iso',to:'editing',flow:'content'},
 {from:'iso',to:'assembly',flow:'content'}, {from:'assembly',to:'qc',flow:'content'},
 {from:'qc',to:'assembly',flow:'editorial',label:copy('REVISIONS','CAMBIOS')},
 {from:'qc',to:'delivery',flow:'content'}, {from:'delivery',to:'master',flow:'content'},
 {from:'tricaster',to:'live',flow:'signal'}, {from:'editing',to:'live',flow:'content'},
 {from:'live',to:'master',flow:'signal',label:copy('PROGRAM','PROGRAM')},
 {from:'master',to:'live',flow:'editorial',label:copy('RECEPTION CONFIRMED','RECEPCIÓN CONFIRMADA')},
 {from:'master',to:'air',flow:'signal'}, {from:'master',to:'break',flow:'signal'},
 {from:'break',to:'return',flow:'signal'}, {from:'return',to:'live',flow:'signal'},
 {from:'tricaster',to:'talent',flow:'editorial',label:copy('LIVE COORDINATION','COORDINACIÓN EN VIVO')},
];
export type Point = [number, number];
export type Placement = Record<NodeId, Point>;
export type Zone = {x:number;y:number;w:number;h:number;title:Copy;sub:Copy;hub?:boolean};
export type Layout = {id:'A'|'B'|'C';title:string;description:Copy;width:number;height:number;positions:Placement;zones:Zone[];routes:Point[][]};
const local = copy('6 LOCAL OPERATIONS','6 OPERACIONES LOCALES');
const hub = copy('CNP JALISCO','CNP JALISCO');
export const layouts: Layout[] = [
 {id:'A',title:'Broadcast System Map',description:copy('Operational zones. Multiple inputs. One production hub.','Zonas operativas. Múltiples entradas. Un hub de producción.'),width:1440,height:1770,
 positions:{editorial:[40,115],assets:[400,115],rundown:[760,115],talent:[1120,115],cloud:[400,375],ingest:[400,575],editing:[400,760],tricaster:[1120,575],iso:[1120,760],assembly:[760,990],qc:[400,1035],delivery:[400,1240],live:[40,760],master:[760,1380],break:[760,1590],return:[400,1590],air:[1120,1380]},
 zones:[{x:20,y:20,w:1380,h:330,title:local,sub:copy('CONTENT / EDITORIAL / TALENT','CONTENIDO / EDITORIAL / TALENTO')},{x:20,y:490,w:1380,h:700,title:hub,sub:copy('REMI PRODUCTION HUB','HUB DE PRODUCCIÓN REMI'),hub:true}],
 routes:[[[280,180],[400,180]],[[520,245],[520,375]],[[520,461],[520,575]],[[520,687],[520,760]],[[640,850],[700,850],[700,955],[820,955],[820,990]],[[880,245],[880,315],[1030,315],[1030,950],[880,950],[880,990]],[[1240,227],[1240,575]],[[1240,687],[1240,760]],[[1120,820],[1070,820],[1070,715],[675,715],[675,800],[640,800]],[[1240,890],[1240,960],[940,960],[940,990]],[[760,1080],[640,1080]],[[640,1115],[700,1115],[700,1170],[880,1170],[880,1146]],[[520,1147],[520,1240]],[[640,1300],[700,1300],[700,1420],[760,1420]],[[1120,630],[1080,630],[1080,705],[160,705],[160,760]],[[400,830],[280,830]],[[160,890],[160,1440],[760,1440]],[[760,1480],[210,1480],[210,890]],[[1000,1450],[1120,1450]],[[880,1520],[880,1590]],[[760,1633],[640,1633]],[[400,1633],[100,1633],[100,890]],[[1300,575],[1300,227]]]},
 {id:'B',title:'Signal + Content Architecture',description:copy('File delivery above. Live signal below. Editorial information stays independent.','Entrega de archivos arriba. Señal en vivo abajo. Información editorial independiente.'),width:1780,height:1550,
 positions:{editorial:[40,120],assets:[40,390],rundown:[40,720],talent:[40,1110],cloud:[370,390],ingest:[700,390],editing:[1030,390],tricaster:[370,1110],iso:[700,720],assembly:[1030,720],qc:[1430,720],delivery:[1430,980],live:[1030,1110],master:[1430,1200],break:[1030,1390],return:[700,1390],air:[1430,1400]},
 zones:[{x:20,y:20,w:280,h:1270,title:local,sub:copy('LOCAL ORIGINS','ORIGEN LOCAL')},{x:340,y:20,w:1040,h:1270,title:hub,sub:copy('CONTENT ABOVE / SIGNAL BELOW','CONTENIDO ARRIBA / SEÑAL ABAJO'),hub:true}],
 routes:[[[160,338],[160,390]],[[280,455],[370,455]],[[610,455],[700,455]],[[940,455],[1030,455]],[[1150,562],[1150,720]],[[280,780],[650,780],[650,685],[1090,685],[1090,720]],[[280,1165],[370,1165]],[[490,1110],[490,800],[700,800]],[[820,720],[820,630],[1090,630],[1090,562]],[[940,785],[1030,785]],[[1270,780],[1430,780]],[[1430,820],[1360,820],[1360,915],[1150,915],[1150,876]],[[1550,832],[1550,980]],[[1550,1092],[1550,1200]],[[610,1175],[1030,1175]],[[1270,475],[1320,475],[1320,1045],[1150,1045],[1150,1110]],[[1270,1175],[1365,1175],[1365,1235],[1430,1235]],[[1430,1300],[1365,1300],[1365,1220],[1270,1220]],[[1550,1340],[1550,1400]],[[1430,1320],[1320,1320],[1320,1433],[1270,1433]],[[1030,1433],[940,1433]],[[820,1390],[820,1260],[1150,1260],[1150,1240]],[[370,1200],[280,1200]]]},
 {id:'C',title:'REMI Operations Map',description:copy('Live coordination at the centre. Editorial and postproduction support the operation.','Coordinación en vivo al centro. Editorial y postproducción sostienen la operación.'),width:1780,height:1580,
 positions:{editorial:[40,590],assets:[40,880],rundown:[40,1210],talent:[40,130],cloud:[370,880],ingest:[700,880],editing:[1030,880],tricaster:[700,130],iso:[700,590],assembly:[1030,1210],qc:[1430,1210],delivery:[1430,970],live:[1030,130],master:[1430,230],break:[1430,470],return:[1030,470],air:[1430,70]},
 zones:[{x:20,y:20,w:280,h:1360,title:local,sub:copy('LOCAL TEAMS','EQUIPOS LOCALES')},{x:665,y:20,w:715,h:1370,title:hub,sub:copy('REMI PRODUCTION HUB','HUB DE PRODUCCIÓN REMI'),hub:true},{x:690,y:800,w:670,h:585,title:copy('EDITORIAL / POST','EDITORIAL / POST'),sub:copy('CONTENT PRODUCTION SUBSYSTEM','SUBSISTEMA DE PRODUCCIÓN DE CONTENIDO')}],
 routes:[[[160,808],[160,880]],[[280,945],[370,945]],[[610,945],[700,945]],[[940,945],[1030,945]],[[1150,1052],[1150,1210]],[[280,1275],[640,1275],[640,1450],[1090,1450],[1090,1366]],[[280,180],[700,180]],[[820,242],[820,590]],[[940,655],[980,655],[980,830],[1090,830],[1090,880]],[[820,720],[820,775],[990,775],[990,1155],[1090,1155],[1090,1210]],[[1270,1265],[1430,1265]],[[1430,1300],[1375,1300],[1375,1420],[1150,1420],[1150,1366]],[[1550,1210],[1550,1082]],[[1550,970],[1730,970],[1730,325],[1670,325]],[[940,186],[1030,186]],[[1150,880],[1150,780],[1010,780],[1010,300],[1090,300],[1090,260]],[[1270,190],[1330,190],[1330,275],[1430,275]],[[1430,340],[1330,340],[1330,235],[1270,235]],[[1550,230],[1550,170]],[[1550,370],[1550,470]],[[1430,513],[1270,513]],[[1150,470],[1150,260]],[[700,220],[280,220]]]},
];
