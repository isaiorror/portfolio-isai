import type { Metadata } from 'next';
import { MotionLeadPortfolio } from '@/components/motion-lead-portfolio';
import '../capcut/portfolio.css';

export const metadata: Metadata = {
  title: 'Isaí Rodríguez Ortega | Motion graphics y video',
  description: 'Motion graphics, edición y producción audiovisual de Isaí Rodríguez Ortega, con experiencia coordinando equipos y entregas en televisión. Disponible de inmediato en Guadalajara.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/es', languages: { es: '/es', en: '/capcut' } },
  openGraph: { title: 'Isaí Rodríguez Ortega | Motion graphics y video', description: 'Motion graphics, edición y coordinación de equipos con experiencia en televisión.', url: '/es', locale: 'es_MX', images: ['/og.png'] },
};

export default function MotionLeadPortfolioEs() {
  return <MotionLeadPortfolio />;
}
