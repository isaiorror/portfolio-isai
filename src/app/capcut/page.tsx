import type { Metadata } from 'next';
import { EditingPortfolio } from '@/components/editing-portfolio';
import { en } from '@/lib/capcut-content';
import './portfolio.css';

export const metadata: Metadata = {
  title: 'Isaí Rodríguez Ortega | Video Editor - CapCut Pro & Short-form Content',
  description: 'Selected CapCut Pro edits, social video and production work by Isaí Rodríguez Ortega. Available for full-time remote work.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/capcut', languages: { es: '/es', en: '/capcut' } },
  openGraph: { title: 'Isaí Rodríguez Ortega | Video Editor', description: 'Short-form editing, brand consistency and broadcast-trained quality control.', url: '/capcut', locale: 'en_US', images: ['/og.png'] },
};

export default function EditingPortfolioEn() {
  return <EditingPortfolio t={en} />;
}
