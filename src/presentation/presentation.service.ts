import { Injectable } from '@nestjs/common';

@Injectable()
export class PresentationService {
  message() {
    return `Olá!
    Essa é a API de um sistema de gerenciamento de publicações em redes sociais desenvolvido em Nestjs, por Christaine Miranda.
    Para acessar as rotas dessa API utilize uma plataforma de APIs como Postman ou extensões como Thunder Client no VSCode. Você também pode conectar a um front-end que siga as especificações descritas no README desse projeto.`;
  }
}
