# APP

Gym pass style app api

## (RFs) Requisitos funcionais - Funcionalidades da aplicação - O que vai ser possível fazer na aplicação

- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil de um usuário logado
- [x] Deve ser possível obter o números de check-ins realizado pelo usuário
      logado
- [x] Deve ser possível o usuário seu histórico de check-ins
- [x] Deve ser possível o usuário buscar academias próximas até 10km
- [x] Deve ser possível o usuário buscar academias pelo nome
- [x] Deve ser possível o usuário realizar check-in em uma academia
- [x] Deve ser possível validar um check-in de um usuário
- [x] Deve ser possível cadastrar um academia

## (RNs) Regras de negócio - Caminhos que cada requisito pode tomar

- [x] O usuário não pode se cadastrar com um email duplicado
- [x] O usuário não pode fazer dois check-ins no mesmo dia
- [x] O usuário não pode fazer check-in se não estiver a 100 metros da academia
- [x] O check-in só pode ser validado em até 20 minutos após criado
- [x] O check-in só pode ser validado por administradores
- [x] A academia só pode ser cadastrada por administradores

## (RNFs) Requisitos não funcionais - Requisitos que não partem do cliente, requisitos técnicos (ferramentas eg.)

- [x] A senha do usuário precisa está criptografada
- [x] Os dados da aplicação devem está persistidos em um banco PostgreSQL
- [x] Todas as listas de dados devem estar paginados com 20 items por página
- [x] O usuário deve ser identificado por um Json Web Token
