import { heading, layouts, subtitle, type Locale } from './workflow';
import { WorkflowMap, WorkflowLegend, WorkflowResponsibilities } from './remi-map';
import styles from './remi.module.css';

export function RemiWorkflow({locale='en', headingLevel='h3'}:{locale?:Locale;headingLevel?:'h1'|'h3'}) {
 const Heading = headingLevel;
 return <section id="remi-workflow" className={styles.integrated} lang={locale} aria-labelledby="remi-workflow-title">
  <header className={styles.integratedHeading}>
   <p className={styles.eyebrow}>{locale === 'es' ? 'OPERACIONES DE TELEVISIÓN / REMI' : 'BROADCAST OPERATIONS / REMI'}</p>
   <Heading id="remi-workflow-title">{heading[locale]}</Heading>
   <p className={styles.subtitle}>{subtitle[locale]}</p>
  </header>
  <div className={styles.toolbar}><WorkflowLegend locale={locale}/></div>
  <p className={styles.navigationHint}>{locale==='en'?'Explore the map horizontally. Node sizes stay readable on smaller screens.':'Desplaza el mapa horizontalmente. Los nodos conservan un tamaño legible en pantallas pequeñas.'}</p>
  <div className={styles.proposal}><WorkflowMap layout={layouts[0]} locale={locale}/></div>
  <WorkflowResponsibilities locale={locale}/>
 </section>;
}
