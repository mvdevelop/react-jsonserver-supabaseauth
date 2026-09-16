import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center sm:items-start">
            <img src="/vite.svg" alt="Logo" className="h-10 mb-4" />
            <p className="text-gray-600 text-sm">
              © {currentYear} Religions.com. Todos os direitos reservados.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Navegação</h3>
            <ul className="text-gray-600">
              <li><a href="#" className="hover:text-gray-800">Página Inicial</a></li>
              <li><a href="#" className="hover:text-gray-800">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-gray-800">Serviços</a></li>
              <li><a href="#" className="hover:text-gray-800">Contato</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Contato</h3>
            <p className="text-gray-600">
              Email: contato@religions.com<br />
              Telefone: (XX) XXXX-XXXX
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Siga-nos</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-800" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35C.594 0 0 0.59 0 1.316v21.366C0 23.406.594 24 1.316 24h11.414v-6.776c0-1.71.03-3.896-.332-4.704-.974-.039-2.514-.34-3.341-4.494-.138-.503-.272-1.38-.47-2.86-.027-.19-.11-.818-.334-2.616-.207-1.688-1.228-2.93-2.624-2.93-1.74 0-3.25.96-3.25 3.29v2.35c0 .7.51 1.299 1.19.854.715-.487 1.77-.928 2.69-.992.165-.011.324-.023.479.031.13.049.268.728.25 1.09-.037 3.01-1.595 4.376-3.69.673-.16 1.377-.255 2.07-.255.435 0 .865.027 1.295.084.145.016.261.018.356-.065.077-.072.207-1.14.28-1.788 0 0-.072-.95-1.81-4.288-1.16-1.19-1.16-1.6-1.16-2.5v-.83c0-1.638 1.493-3.016 3.438-3.016 1.213 0 2.56.345 3.882 1.22.3.175 1.25.92 2.36 2.62.96.97 1.65.89 1.76.82 3.09-2.834 4.328-5.036 4.97-5.093v-.003z" />
            </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
