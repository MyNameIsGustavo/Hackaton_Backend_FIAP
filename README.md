# Hackaton FIAP - Projeto

## Sumário
1. Membro do Grupo 25 
2. Definição do Projeto  
3. Requisitos Técnicos 
4. Requisitos Funcionais 
5. Fluxograma  
6. Prova de conceito
7. Configuração de ambiente
8. Estrutura da aplicação 
9. Processo de Desenvolvimento  
10. Relatos dos Desafios Superados  
11. Entregas  
14. Conclusão

## Membros do grupo 25 
- Carlos Adriano - RM366258
- Cristhian Mendes - Rm365590
- ⁠Gisele Cidral - RM366463
- ⁠Gustavo Rocha - RM365401

## Definição do projeto

O projeto visa a criação de uma ferramenta web voltada para professores, com o propósito de auxiliar na elaboração de planos de aula para o ambiente acadêmico. A ferramenta será estruturada com base nos pilares da Base Nacional Comum Curricular (BNCC), conforme as diretrizes nacionais do MEC.

## Requisitos técnicos

O projeto de desenvolvimento no segmento de back-end foi idealizado utilizando as seguintes tecnologias e ferramentas:

1. Node.js (TypeScript) para o desenvolvimento do back-end.
2. APIs REST desenvolvidas com o framework Express.
3. Banco de dados relacional PostgreSQL para persistência de dados.
4. Docker para gerenciamento de múltiplos ambientes de execução.
5. Swagger para documentação dos endpoints da API.
6. Prisma ORM para comunicação e gerenciamento do banco de dados.

## Requisitos funcionais

1. Entidade Professor
    - Login: Permitir que o professor acesse o sistema através de autenticação com email e senha.
    - Cadastro: Possibilitar que novos professores se registrem no sistema, fornecendo informações como nome, email, senha e disciplina(s) associada(s).
    - Buscar por ID: Recuperar os dados completos de um professor a partir do seu identificador único.
    - Deletar: Remover um professor do sistema, garantindo que todos os dados associados sejam tratados de acordo com regras de integridade.
    - Buscar por Email: Localizar um professor com base no seu endereço de email.
    - Buscar informações do usuário logado: Retornar os dados do professor atualmente autenticado, permitindo personalização da experiência.

2. Entidade Período
    - Buscar todos: Listar todos os períodos existentes no sistema, como manhã, tarde e noite, ou por semestre/ano letivo.
    - Cadastro: Criar um novo período, definindo informações como nome e datas de início e fim.
    - Buscar por ID: Recuperar detalhes de um período específico através do seu identificador único.
    - Deletar: Remover um período existente, garantindo integridade das turmas e aulas associadas.
    - Editar: Alterar informações de um período já cadastrado, como nome ou datas.

3. Entidade Turmas
    - Buscar todos: Listar todas as turmas registradas no sistema, incluindo informações de período e professores responsáveis.
    - Cadastro: Criar uma nova turma, informando período, disciplina e professor responsável.
    - Buscar por ID: Recuperar informações detalhadas de uma turma específica.
    - Deletar: Remover uma turma do sistema, cuidando para manter integridade dos dados relacionados às aulas e alunos.
    - Editar: Atualizar dados de uma turma existente, como nome, período ou professor responsável.

4. Entidade Matérias
    - Buscar todos: Listar todas as matérias disponíveis no sistema.
    - Cadastro: Cadastrar uma nova matéria, incluindo informações como nome, código e área de conhecimento.
    - Buscar por ID: Recuperar detalhes de uma matéria específica.
    - Deletar: Remover uma matéria do sistema, considerando impactos nas turmas e aulas associadas.
    - Editar: Atualizar informações de uma matéria existente.

5. Entidade Aulas
    - Buscar todos: Listar todas as aulas cadastradas no sistema, incluindo informações de turma, matéria, professor e período.
    - Cadastro: Criar uma nova aula, associando-a a uma turma, matéria, professor e período específicos, e incluindo data, horário e plano de aula.
    - Buscar por ID: Recuperar informações completas de uma aula específica.
    - Deletar: Remover uma aula do sistema, garantindo que não haja inconsistências nos dados de turmas e professores.
    - Editar: Alterar informações de uma aula já cadastrada, como data, horário, plano de aula ou professor responsável.

## Configuração de ambiente

Recomenda-se que os pré-requisitos de instalação de tecnologia em seu ambiente de execução sejam os seguintes, listados abaixo. Após verificar as tecnologicas instaladas, siga o procedimento em seguida para inicializar o projeto.

- Node.js: v18.19.1
- Docker: 28.3.2
- Git: 2.43.0

1. Clonar o repositório disponível no GitHub através do link: https://github.com/MyNameIsGustavo/Hackaton_Backend_FIAP

2. Criar um arquivo ".env" e um ".env.dev" na raiz do projeto e preencher as chaves conforme ".envExemplo" já disponibilizado originalmente no projeto. Por se tratar de um projeto acadêmico, portanto, as variáveis do arquivo ".env.local" serão compartilhadas para fins explicativos e didaticos.

3. Criar um arquivo ".gitignore" na raiz do projeto, incluindo: .env, .env.dev, .env.*, node_modules, dist e /src/generated/prisma

4. Instalar o docker desktop em seu ambiente local através da URL: https://docs.docker.com/desktop/setup/install/windows-install/

5. Para replicação completa do ambiente no qual foi desenvolvido o projeto, instale o WSL com a distribuição Ubuntu. Para mais instruções siga está documentação oficial distribuida pela Microsoft: https://learn.microsoft.com/pt-br/windows/wsl/install

6. Com o Docker configurado em seu ambiente e localizado dentro do diretório do projeto, forneça o seguinte comando para iniciar a aplicação Docker localmente, este comando deve instalar todas dependências do projeto conforme a instrução no arquivo dockerfile: docker compose -f docker-compose.dev.yaml --env-file .env.dev up

## Fluxograma  
## Prova de conceito
## Estrutura da aplicação 
## Processo de Desenvolvimento  
## Relatos dos Desafios Superados  
## Entregas  
## Conclusão