'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { AiOutlineDownload, AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import { useLanguageStore } from '@/stores/language';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const pdfFile = '/documents/samuel-nakazawa-resume.pdf';

const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export function PdfViewer() {
  const [containerWidth, setContainerWidth] = useState(0);
  const [scale, setScale] = useState(0.8);
  const { t } = useLanguageStore();

  const updateWidth = useCallback(() => {
    const container = document.querySelector('.pdf-container');
    if (container) {
      setContainerWidth(container.clientWidth);
    }
  }, []);

  useEffect(() => {
    const debouncedUpdateWidth = debounce(updateWidth, 100);
    updateWidth();
    window.addEventListener('resize', debouncedUpdateWidth);
    return () => window.removeEventListener('resize', debouncedUpdateWidth);
  }, [updateWidth]);

  return (
    <div className="flex flex-col items-center py-8 px-4 w-full pdf-container">
      <div className="flex flex-wrap justify-center gap-4 mb-6 w-full max-w-4xl">
        <a
          href={pdfFile}
          download="Samuel-Nakazawa-Curriculo.pdf"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c95bf5] to-[#9a4dff] text-white rounded-lg hover:from-[#b142e8] hover:to-[#8a3df5] transition-all shadow-lg flex-1 sm:flex-none justify-center"
        >
          <AiOutlineDownload size={18} /> {t.resume['cv-button']}
        </a>

        <div className="flex items-center gap-1 bg-[#1a0a2a] border border-[#3a2a5a] rounded-lg overflow-hidden">
          <button
            onClick={() => setScale((prev) => Math.max(prev - 0.1, 0.5))}
            className="text-[#e2d9f3] hover:bg-[#2d1b4a] px-4 py-3 transition-colors flex items-center cursor-pointer"
            aria-label={t.resume.zoomOut}
          >
            <AiOutlineZoomOut size={18} />
          </button>

          <span className="text-sm text-[#e2d9f3] px-3 min-w-[60px] text-center">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={() => setScale((prev) => Math.min(prev + 0.1, 1.5))}
            className="text-[#e2d9f3] hover:bg-[#2d1b4a] px-4 py-3 transition-colors flex items-center cursor-pointer"
            aria-label={t.resume.zoomIn}
          >
            <AiOutlineZoomIn size={18} />
          </button>
        </div>
      </div>

      <div className="w-full max-w-4xl border border-[#3a2a5a] rounded-lg overflow-auto shadow-lg bg-[#1a0a2a] h-[70vh]">
        <div className="min-h-full min-w-full flex justify-center p-4">
          <Document
            file={pdfFile}
            loading={<div className="p-8 text-[#e2d9f3]">{t.resume.loading}</div>}
            error={<div className="p-8 text-[#ff6b6b]">{t.resume.error}</div>}
            className="flex justify-center"
          >
            <Page
              pageNumber={1}
              width={containerWidth * scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      </div>
    </div>
  );
}
