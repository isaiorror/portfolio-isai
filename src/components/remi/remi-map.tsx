import { useId } from 'react';
import { edges, nodes, type Layout, type Locale, type Point } from './workflow';
import styles from './remi.module.css';

// Rounded orthogonal connectors keep precise ports while avoiding hard elbows.
function rounded(points: Point[]) {
  let d = `M ${points[0].join(' ')}`;
  for (let i=1;i<points.length-1;i++) {
    const p=points[i], a=points[i-1], b=points[i+1];
    const before=Math.hypot(p[0]-a[0],p[1]-a[1]), after=Math.hypot(b[0]-p[0],b[1]-p[1]);
    const r=Math.min(14,before/2,after/2);
    const entry=[p[0]-(p[0]-a[0])*r/before,p[1]-(p[1]-a[1])*r/before];
    const exit=[p[0]+(b[0]-p[0])*r/after,p[1]+(b[1]-p[1])*r/after];
    d+=` L ${entry.join(' ')} Q ${p.join(' ')} ${exit.join(' ')}`;
  }
  return d+` L ${points.at(-1)!.join(' ')}`;
}

function Icon({kind}:{kind:string}) {
  const paths:Record<string,string>={
    cloud:'M6 17a4 4 0 0 1-1-8 6 6 0 0 1 11-2 5 5 0 0 1 1 10H6',
    editorial:'M4 7h11v12H4z M15 11l5-3v10l-5-3 M7 4h5',
    rundown:'M5 3h14v18H5z M8 7h1m3 0h4M8 12h1m3 0h4M8 17h1m3 0h4',
    talent:'M8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0 M4 21v-2a8 8 0 0 1 16 0v2',
    editing:'M3 5h18M3 12h18M3 19h18 M7 3v4m10 3v4M9 17v4',
    qc:'M12 3l8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6z M8 12l3 3 5-6',
    iso:'M4 5h16v14H4z M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0',
    air:'M12 12v9 M9 9a4 4 0 0 1 6 0M6 6a8 8 0 0 1 12 0M3 3a12 12 0 0 1 18 0',
  };
  const key=kind==='delivery'?'cloud':kind==='live'||kind==='master'?'air':kind;
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[key]??'M3 4h18v16H3z M7 9h10M7 14h4m4 0h2'} /></svg>;
}

export function WorkflowMap({layout,locale}:{layout:Layout;locale:Locale}) {
  const {width,height}=layout;
  const id=useId().replaceAll(":", "");
  return <div className={styles.scroller} tabIndex={0} role="region" aria-label={`${layout.title}. ${locale==='en'?'Scrollable workflow map':'Mapa desplazable del workflow'}`}>
    <div className={styles.map} style={{width,height}}>
      {layout.zones.map((z,i)=><div key={i} className={`${styles.zone} ${z.hub?styles.hub:''}`} style={{left:z.x,top:z.y,width:z.w,height:z.h}}><h3>{z.title[locale]}</h3><p>{z.sub[locale]}</p></div>)}
      <svg className={styles.connections} width={width} height={height} aria-hidden="true">
        <defs>{['content','signal','editorial'].map(flow=><marker key={flow} id={`${id}-${flow}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M1 1 L7 4 L1 7" fill="none" stroke={flow==='signal'?'#92aaa9':flow==='content'?'#bfc4c9':'#7e8793'} strokeWidth="1.1" /></marker>)}</defs>
        {edges.map((edge,i)=>{
          const points=layout.routes[i];
          const segments=points.slice(1).map((p,j)=>({a:points[j],b:p,length:Math.hypot(p[0]-points[j][0],p[1]-points[j][1])}));
          const segment=segments.filter(s=>s.a[1]===s.b[1]).sort((a,b)=>b.length-a.length)[0];
          return <g key={`${edge.from}-${edge.to}`} data-from={edge.from} data-to={edge.to} data-flow={edge.flow}>
            <path d={rounded(points)} className={styles[edge.flow]} markerEnd={`url(#${id}-${edge.flow})`} />
            {edge.label&&segment&&segment.length>175&&<g transform={`translate(${(segment.a[0]+segment.b[0])/2},${segment.a[1]-9})`}><text className={styles.edgeLabel} textAnchor="middle">{edge.label[locale]}</text></g>}
          </g>;
        })}
      </svg>
      {nodes.map(node=>{
        const [x,y]=layout.positions[node.id];
        return <article key={node.id} data-node={node.id} className={`${styles.node} ${node.role?styles.role:''} ${node.signal?styles.signalNode:''} ${node.id==='air'?styles.onAir:''}`} style={{left:x,top:y,height:node.height}}>
          <div className={styles.nodeTop}><Icon kind={node.id}/><span>{node.kicker[locale]}</span>{node.role&&<i aria-label={locale==='en'?'My responsibilities':'Mis responsabilidades'} />}</div>
          <h4>{node.title[locale]}</h4>
          <div className={node.id==='editorial'?styles.editorialSteps:undefined}>{node.lines.map((line,i)=><p key={i}>{line[locale]}</p>)}</div>
          {node.loop&&<div className={styles.feedback}><svg width="24" height="16" viewBox="0 0 24 16" fill="none" stroke="currentColor" aria-hidden="true"><path d="M5 4h12a5 5 0 0 1 0 10H5a4 4 0 0 1 0-8 M8 1 4 4l4 3"/></svg>{node.loop[locale]}</div>}
        </article>;
      })}
      <div className={styles.convergence} style={{left:layout.positions.assembly[0],top:layout.positions.assembly[1]-29}}>{locale==='en'?'PACKAGES + RUNDOWN + ISO':'NOTAS + ESCALETA + ISO'}</div>
    </div>
  </div>;
}


export function WorkflowLegend({locale}:{locale:Locale}) { return (<div className={styles.legend}><span><i className={styles.contentSample}/>{locale==='en'?'CONTENT FLOW':'FLUJO DE CONTENIDO'}</span><span><i className={styles.signalSample}/>{locale==='en'?'SIGNAL FLOW':'FLUJO DE SEÑAL'}</span><span><i className={styles.editorialSample}/>{locale==='en'?'EDITORIAL / COORDINATION':'EDITORIAL / COORDINACIÓN'}</span><span><i className={styles.roleSample}/>{locale==='en'?'MY RESPONSIBILITIES':'MIS RESPONSABILIDADES'}</span></div>); }

export function WorkflowResponsibilities({locale}:{locale:Locale}) { return (<footer className={styles.footer}><div><p className={styles.eyebrow}>{locale==='en'?'MY RESPONSIBILITIES':'MIS RESPONSABILIDADES'}</p><p>{locale==='en'?'Recording, editing, review and live production within a multidisciplinary team.':'Grabación, edición, revisión y producción en vivo dentro de un equipo multidisciplinario.'}</p></div><div><strong>4 / 6</strong><span>{locale==='en'?'Newscasts with direct supervision / approval':'Noticieros con supervisión / aprobación directa'}</span></div><div><strong>6 / 6</strong><span>{locale==='en'?'Operations with material coordination':'Operaciones con coordinación de materiales'}</span></div></footer>); }
