'use client';

import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { AiOutlineDownload, AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const pdfFile = '/documents/samuel-nakazawa-resume.pdf';

export function PdfViewer() {
  const [pdfWidth, setPdfWidth] = useState(800);

  return (
    <div className="flex flex-col items-center py-8 px-4 min-h-screen">
      <h1 className="text-4xl font-bold text-[#c95bf5] mb-8">Resume</h1>

      <div className="flex gap-2 mb-4 flex-wrap justify-center">
        <a
          href={pdfFile}
          download="Samuel-Nakazawa-Curriculo.pdf"
          className="flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded hover:bg-[#c95bf5]  transition"
        >
          <AiOutlineDownload /> Download CV
        </a>
      </div>

      <div className="border border-gray-700 rounded-lg overflow-hidden shadow-lg mb-4">
        <Document
          file={pdfFile}
          loading={<div className="p-8">Carregando PDF...</div>}
          error={<div className="p-8 text-red-500">Erro ao carregar o PDF</div>}
        >
          <Page
            pageNumber={1}
            scale={1.0}
            width={pdfWidth}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </div>
  );
}
