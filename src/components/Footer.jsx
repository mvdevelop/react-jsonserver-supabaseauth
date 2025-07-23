
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Coluna 1: Logo e Informações */}
          <div className="flex flex-col items-center sm:items-start">
            <img src="/logo.svg" alt="Logo da Empresa" className="h-10 mb-4" />
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Sua Empresa. Todos os direitos reservados.
            </p>
          </div>

          {/* Coluna 2: Links de Navegação */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Navegação</h3>
            <ul className="text-gray-600">
              <li><a href="#" className="hover:text-gray-800">Página Inicial</a></li>
              <li><a href="#" className="hover:text-gray-800">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-gray-800">Serviços</a></li>
              <li><a href="#" className="hover:text-gray-800">Contato</a></li>
            </ul>
          </div>

          {/* Coluna 3: Informações de Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contato</h3>
            <p className="text-gray-600">
              Email: contato@suaempresa.com<br />
              Telefone: (XX) XXXX-XXXX
            </p>
          </div>

          {/* Coluna 4: Ícones de Redes Sociais */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Siga-nos</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
