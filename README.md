:alarm_clock: <h1 align="center">Social-Postify </h1>

Seja bem-vindo ao Social-Postify, uma aplicação Nest.
Esse é um sistema de gerenciamento de publicações em redes sociais, uma ferramenta eficiente que permita agendar, controlar e monitorar as postagens em diversas plataformas de mídia social.

## :hammer: Funcionalidades do projeto

### Autenticação

- **Registro**: O usuário deve se cadastrar e fazer login na plataforma para acessar suas funcionalidades. As rotas de cadastro e login seguem a forma a seguir
  
   `Método POST - Cadastro - endpoint: /auth/register`
  
   <p>Body da requisição:</p>
  {
   "name": "Nome do usuário",   
   "email": "usuario@email.com",   
   "password": "123456",   
   "avatar": "link_de_uma_imagem"   
  }

**Login:**

`Método POST - endpoint: /auth/login`

<p>Body da requisição:</p>
{ "email": "usuario@email.com",   "password": "123456"}

Em ambos a aplicação devolverá como resposta o token de autenticação JWT para que o front-end inicialize a sessão e seja possível acessar as demais rotas, que são autenticadas

`Response:`

{
  "accessToken": 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY2hyaXN0YWluZSIsImVtYWlsIjoiY2hyaXN0YWluZS5taXJhbmRhQGdtYWlsLmNvbSIsImlhdCI6MTY5MDkwMzAzOCwiZXhwIjoxNjkxNTA3ODM4LCJhdWQiOiJ1c2VycyIsImlzcyI6IkRyaXZlbiIsInN1YiI6IjcifQ.FXwJxMUB8_BVapOIT5EdobR4Jgdb5ZOfYeUz9ap4a28"
}



### Gerenciamento de postagens

- **Registrar publicação**: O usuário pode registrar em sua conta publicações que deseja ser lembrado de realizar no futuro, escolhendo o dia da postagem.

  `Método POST - Endpoint: /publication`

  <p>Body da requisição:</p>
  
  {
  "image": "link_da_imagem",
  "title": "Titulo da postagem",
  "text": "Texto da postagem",
  "dateToPublish": "2023-10-14",
  "socialMedia": "Linkedin"
  }

  Por padrão todas as postagens são armazenadas com status inicial published:false, que pode ser alterado posteriormente.
 
- **Visualizar lista de postagens do usuário**: O usuário pode visualizar todas as postagens cadatradas, já realizadas ou não
  
  `Método GET - Endpoint: /publication`
  
  <p>[
  {
    "id": 12,
    "image": "imagem_da_postagem",
    "title": "Titulo da postagem",
    "text": "Texto da postagem",
    "dateToPublish": "2023-10-14",
    "published": false,
    "socialMedia": "Linkedin",
    "userId": 7,
    "createdAt": "2023-08-01T01:25:52.706Z"
  }
]</p>

 
- **Alterar postagem específicada pelo ID**: O id da publicação deve ser enviado como parâmetro da requisição. O usuário pode alterar somente os campos desejados, enviando somente eles.
  
  `Método PATCH - Endpoint: /publication/id`
  <p>Body da requisição:</p>
  <p>
  {
    "image": "nova_imagem_da_postagem",
    "published": true    
  }
</p>

- **Apagar postagem específicada pelo ID**: O id da publicação deve ser enviado como parâmetro da requisição.
  
  `Método DELETE - Endpoint: /publication/id`
  
- **Filtrar postagens pelo status de publicação**: O status em relação a efetivação da publicação deve ser enviado como parâmetro da requisição - **true** ou **false**.
-   
  `Método GET - Endpoint: /publication/booleano`
  
  Se o parâmetro passado for "true" serão exibidas as publicações marcadas como **postadas**. Se o parâmetro for "false" são exibidas as marcadas como **não postadas**.
  
**``Envio automático de email de lembrete no dia da postagem cadastrada``: A cada dia, às 7:00 do horário de Brasília, a aplicação varre o banco de dados e ao encontrar publicações agendadas para o dia vigente, encontra seus autores e envia um email para o endereço cadastrado na plataforma com as principais informações sobre a publicação.**


## Deploy da Aplicação com Render: :dash: 
### Instalação

```bash
$ npm install
```

### Para rodar o APP

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Testes

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

