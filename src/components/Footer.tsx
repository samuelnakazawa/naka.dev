export const Footer = () => {
  return (
    <footer className="w-full text-white py-6 px-4 md:px-8 lg:px-16 bg-gradient-to-t from-neutral-900 via-black to-neutral-900">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between text-center md:text-left">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Samuel Nakazawa. Todos os direitos reservados.
        </p>

        <div className="flex gap-4 mt-4 md:mt-0 justify-center md:justify-end">
          <a
            href="https://github.com/samuelnakazawa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#c95bf5] transition duration-300"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/samuel-nakazawa-960301141/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#c95bf5] transition duration-300"
          >
            LinkedIn
          </a>
          <a
            href="mailto:samuelnakazawa895@gmail.com"
            className="text-gray-400 hover:text-[#c95bf5] transition duration-300"
          >
            E-mail
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
