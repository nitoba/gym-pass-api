# APP

Gym pass style app api

## (RFs) Requisitos funcionais - Funcionalidades da aplicação - O que vai ser possível fazer na aplicação

- [ ] Deve ser possível se cadastrar
- [ ] Deve ser possível se autenticar
- [ ] Deve ser possível obter o perfil de um usuário logado
- [ ] Deve ser possível obter o números de check-ins realizado pelo usuário
      logado
- [ ] Deve ser possível o usuário seu histórico de check-ins
- [ ] Deve ser possível o usuário buscar academias próximas
- [ ] Deve ser possível o usuário buscar academias pelo nome
- [ ] Deve ser possível o usuário realizar check-in em uma academia
- [ ] Deve ser possível validar um check-in de um usuário
- [ ] Deve ser possível cadastrar um academia

## (RNs) Regras de negócio - Caminhos que cada requisito pode tomar

- [ ] O usuário não pode se cadastrar com um email duplicado
- [ ] O usuário não pode fazer dois check-ins no mesmo dia
- [ ] O usuário não pode fazer check-in se não estiver a dois metros da academia
- [ ] O check-in só pode ser validado em até 20 minutos após criado
- [ ] O check-in só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores

## (RNFs) Requisitos não funcionais - Requisitos que não partem do cliente, requisitos técnicos (ferramentas eg.)

- [ ] A senha do usuário precisa está criptografada
- [ ] Os dados da aplicação devem está persistidos em um banco PostgreSQL
- [ ] Todas as listas de dados devem estar paginados com 20 items por página
- [ ] O usuário deve ser identificado por um Json Web Token
