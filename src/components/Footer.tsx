import { profileLinks } from './constants';

export const Footer = () => {
  return (
    <footer className="w-full text-white pt-16 pb-6 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-[#251240] via-[#1a0a2a] to-[#050209]">
      <div className="max-w-6xl mx-auto">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c95bf5]/30 to-transparent mb-8"></div>

        <div className="flex flex-col md:flex-row justify-between text-center md:text-left">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} Samuel Nakazawa. Todos os direitos reservados.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0 justify-center md:justify-end">
            <a
              href={profileLinks['github']}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#c95bf5] transition duration-300 flex items-center gap-1"
            >
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href={profileLinks['linkedin']}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#c95bf5] transition duration-300 flex items-center gap-1"
            >
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
            <a
              href="mailto:samuelnakazawa895@gmail.com"
              className="text-gray-300 hover:text-[#c95bf5] transition duration-300 flex items-center gap-1"
            >
              <span className="hidden sm:inline">E-mail</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
