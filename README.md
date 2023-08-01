<h1 align="center">Social-Postify </h1>

Seja bem-vindo ao Social-Postify, uma aplicação Nest.
Esse é um sistema de gerenciamento de publicações em redes sociais, uma ferramenta eficiente que permita agendar, controlar e monitorar as postagens em diversas plataformas de mídia social.

# :hammer: Funcionalidades do projeto

- `Autenticação`: O usuário deve se cadastrar e fazer login na plataforma para acessar suas funcionalidades. As rotas de cadastro e login seguem a forma a seguir
<div style="color: #663300; font-weight: bold;">
Endpoint: /auth/register
Body da requisição:
{
   "name": "Nome do usuário",
	 "email": "usuario@email.com",
   "password": "123456",
	 "avatar": "link_de_uma_imagem"
}
</div>



- `Registrar publicação`: O usuário pode registrar em sua conta publicações que deseja ser lembrado de realizar no futuro, escolhendo o dia da postagem
- 
- `Funcionalidade 2a`: descrição da funcionalidade 2a relacionada à funcionalidade 2
- `Funcionalidade 3`: descrição da funcionalidade 3

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

