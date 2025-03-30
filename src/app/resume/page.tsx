'use-client';
import { PdfViewer } from '@/components/ui';

export default function Resume() {
  return (
    <>
      <section className="min-h-screen py-20 px-6 bg-gradient-to-b from-[#050209] via-[#0a0512] to-[#120a1f]">
        <div className="max-w-6xl mx-auto">
          <PdfViewer />
        </div>
      </section>
    </>
  );
}
