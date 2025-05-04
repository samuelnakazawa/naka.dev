import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Samuel Nakazawa | Contact',
  keywords: ['developer', 'portfolio', 'contact', 'projects', 'frontend', 'design'],
  description: 'Get in touch with me',
};

import { ContactForm, Container } from '@/components/layout';
export default function Contact() {
  return (
    <Container>
      <section className="min-h-[calc(100vh-80px)]">
        <div className="max-w-6xl mx-auto">
          <ContactForm />
        </div>
      </section>
    </Container>
  );
}
