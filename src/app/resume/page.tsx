'use client';
import { PdfViewer } from './pdf-viewer';

export default function Resume() {
  return (
    <section className="min-h-screen py-32 md:py-40 px-6 ">
      <div className="max-w-6xl mx-auto">
        <PdfViewer />
      </div>
    </section>
  );
}
