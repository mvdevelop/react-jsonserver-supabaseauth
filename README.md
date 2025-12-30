
📊 Dashboard App
Uma aplicação de dashboard moderna desenvolvida com React e Vite, projetada para oferecer uma experiência de gerenciamento de dados fluida e segura. O projeto utiliza uma arquitetura híbrida: json-server para prototipagem rápida e testes locais, e Supabase para persistência de dados em nuvem e autenticação.

🚀 Funcionalidades
Autenticação Segura: Login e gestão de usuários via Supabase Auth.

Gestão de Dados (CRUD): Visualização, criação, edição e exclusão de registros.

Gráficos Interativos: Visualização de métricas e KPIs em tempo real.

Interface Responsiva: Adaptável para dispositivos móveis, tablets e desktops.

Modo de Desenvolvimento: Backend local rápido com json-server.

🛠️ Tecnologias Utilizadas
Frontend
React: Biblioteca principal para a interface.

Vite: Tooling ultra-rápido para o desenvolvimento.

Tailwind CSS / Styled Components: (Ajuste conforme sua escolha) para estilização.

Recharts / Chart.js: Para a renderização dos gráficos.

Backend & Database
Supabase: Banco de dados PostgreSQL, Autenticação e Storage.

JSON Server: Mock API para simulação de dados localmente.

📋 Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina:

Node.js (versão 18 ou superior)

NPM ou Yarn

Uma conta no Supabase

🔧 Instalação e Configuração
Clone o repositório:

Bash

git clone https://github.com/mvdevelop/react-jsonserver-supabaseauth.git
cd dashboard-app
Instale as dependências:

Bash

npm install
Configure as Variáveis de Ambiente: Crie um arquivo .env na raiz do projeto e adicione suas chaves do Supabase:

Snippet de código

VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
Prepare o Banco de Dados Local (JSON Server): Certifique-se de que o arquivo db.json existe na raiz. Ele será usado para os dados simulados.

🚀 Rodando a Aplicação
Para rodar o projeto completo, você precisará iniciar o servidor mock e o servidor de desenvolvimento do React.

1. Iniciar o JSON Server (Backend Local)
Em um terminal separado, execute:

Bash

npx json-server --watch db.json --port 3001
2. Iniciar o React (Vite)
No terminal principal, execute:

Bash

npm run dev
Acesse: http://localhost:5173

📁 Estrutura de Pastas
Plaintext

src/
├── assets/        # Imagens e ícones
├── components/    # Componentes reutilizáveis (Botões, Cards, etc)
├── hooks/         # Custom Hooks para Supabase e Fetching
├── pages/         # Páginas principais (Dashboard, Login, Settings)
├── services/      # Configuração de API e Supabase Client
├── utils/         # Funções utilitárias e formatadores
└── App.jsx        # Componente raiz e rotas
📝 Scripts Disponíveis
npm run dev: Inicia o servidor de desenvolvimento do Vite.

npm run build: Cria a versão de produção na pasta dist.

npm run preview: Pré-visualiza localmente o build de produção.

npm run server: (Opcional) Script customizado para rodar o json-server se configurado no package.json.

🤝 Contribuição
Faça um Fork do projeto.

Crie uma Branch para sua feature (git checkout -b feature/nova-feature).

Comite suas mudanças (git commit -m 'Adicionando nova feature').

Push para a Branch (git push origin feature/nova-feature).

Abra um Pull Request.

📄 Licença
Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.
