import type { Metadata } from 'next';
import { MotionLeadPortfolio } from '@/components/motion-lead-portfolio';
import { mlEn } from '@/lib/motion-lead-content';
import '../capcut/portfolio.css';

export const metadata: Metadata = {
  title: 'Isaí Rodríguez Ortega | Motion graphics & video',
  description: 'Motion graphics, editing and audiovisual production by Isaí Rodríguez Ortega, with experience leading teams and on-air deliveries in television. Available immediately in Guadalajara.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/en', languages: { es: '/es', en: '/en' } },
  openGraph: { title: 'Isaí Rodríguez Ortega | Motion graphics & video', description: 'Motion graphics, editing and team coordination backed by television experience.', url: '/en', locale: 'en_US', images: ['/og.png'] },
};

export default function MotionLeadPortfolioEn() {
  return <MotionLeadPortfolio c={mlEn} />;
}
