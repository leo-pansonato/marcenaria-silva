import { SmoothScrollProvider } from '../components/providers/SmoothScrollProvider';
import { SiteHeader } from '../components/sections/SiteHeader';
import { Hero } from '../components/sections/Hero';
import { Manifesto } from '../components/sections/Manifesto';
import { ProjectsShowcase } from '../components/sections/ProjectsShowcase';
import { Services } from '../components/sections/Services';
import { ProcessTimeline } from '../components/sections/ProcessTimeline';
import { Testimonials } from '../components/sections/Testimonials';
import { ContactCta } from '../components/sections/ContactCta';
import { SiteFooter } from '../components/sections/SiteFooter';
import { WhatsAppFab } from '../components/sections/WhatsAppFab';

/**
 * One-page da Marcenaria Silva. Cada seção é um componente isolado;
 * conteúdo vive em src/data e configuração em src/lib/site.ts.
 */
export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <div aria-hidden="true" className="grain-overlay" />
      <SiteHeader />
      <main>
        <Hero />
        <Manifesto />
        <ProjectsShowcase />
        <Services />
        <ProcessTimeline />
        <Testimonials />
        <ContactCta />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </SmoothScrollProvider>
  );
}
