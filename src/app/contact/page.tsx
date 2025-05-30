import { ContactForm, Container } from '@/components/layout';
export default function Contact() {
  return (
    <Container>
      <section className="min-h-screen px-6 md:px-4">
        <div className="max-w-6xl mx-auto">
          <ContactForm />
        </div>
      </section>
    </Container>
  );
}
