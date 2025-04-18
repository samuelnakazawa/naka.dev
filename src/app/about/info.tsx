import { AiOutlineDownload } from 'react-icons/ai';
import { useLanguageStore } from '@/stores/language';

export function InfoSection() {
  const { t } = useLanguageStore();

  const pdfFile = '/documents/samuel-nakazawa-resume.pdf';

  return (
    <div className="flex flex-col gap-4 justify-center items-center py-24 mb:py-12">
      <p className="text-3xl md:text-4xl font-bold mb-8 text-[#e2d9f3]"> For more informations </p>
      <div className="flex flex-row justify-center gap-16 w-full">
        <div className="w-full max-w-xs">
          <a
            href={pdfFile}
            download="Samuel-Nakazawa-Curriculo.pdf"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c95bf5] to-[#9a4dff] text-white rounded-lg hover:from-[#b142e8] hover:to-[#8a3df5] transition-all shadow-lg w-full text-center"
          >
            <AiOutlineDownload size={18} /> {t.resume['cv-button']}
          </a>
        </div>
        <div className="w-full max-w-xs">
          <a
            href="/contact"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c95bf5] to-[#9a4dff] text-white rounded-lg hover:from-[#b142e8] hover:to-[#8a3df5] transition-all shadow-lg w-full text-center"
          >
            Let's chat :)
          </a>
        </div>
      </div>
    </div>
  );
}
