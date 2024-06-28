# Inicio

Foi feito um Swagger com todas as rotas funcionando perfeitamente para testes, recomendo ultilizar o Swagger para realização dos testes dessa aplicação, ela fornece tudo que é possivel fazer no app. Porfavor olhar as Observações Importantes desse README.

# Backend-challenge

Desafio para uma vaga de backend Node, a função é desenvolver um CRUD de um banco, onde deve ser possivel criar uma conta, registrar pagamentos, gerar relatorio de pagamentos e fazer upload de imagens relacionados com o pagamento. Todos os endpoints dessa CRUD são consumidos por um usuário autenticado.

# Sobre o Projeto

Realizei todos os requisitos solicitados, mas adicionei algumas coisinhas que não necessariamente foram pedidos, achei que seria interessante colocar, como por exemplo fiz relacionamentos one to many com a tabela de BankAccount e Payments, onde basicamente uma conta pode possuir varios pagamentos, mas cada pagamento só pode ser relacionado a uma conta, ainda falando de relacionamentos fiz um relacionaento One to One entre Payments e PaymentImage, a logica é simples cada pagamento só pode possuir uma imagem relacionada, aproveitando também para falar sobre tratativas de erro, todos os erros dessa aplicação foram tratados e são esperados pelo app.
Para fazer o Upload utilizei uma pasta tmp, que foi corretamente configurado para armazenar temporariamente as imagens, e logo em seguida ser apagada. Todas as rotas estão autenticadas com exceção da propria rota de Login e a de criação do usuario.

# Observações Importantes

- Requisição de Relatório
  A requisição do Relatório foi feito em formato de link da requisição e a Data esperada pela aplicação é o formato YYYY-MM-DD.

- Rota de Upload de Image
  A requisição dessa rota foi feita para o formato multipart/form-data.

- GetAll em todas os moluler
  Adicionei os getAll apenas para facilitar a visualização das informações para a pessoa que for testar a aplicação.

# Bibliotecas

Nesse projeto ultilizei o auxílio de varias bibliotecas, algumas do proprio nest outras fora no nest. Segue abaixo a lista de algumas das lib ultilizadas.

- passport-jwt
- passport
- swagger
- prisma
- bcryptjs
- multer
- dotenv

# Database

Estou Ultilizando um banco de dados externo PostgreSQL do Neon

# Considerações finais

Em geral achei muito divertido esse projeto, e como da pra notar tenho bastante experiencia com projetos assim, ultilizo essas ferramentas a mais de um ano e já realizei diversos tipos de desafios diferentes. Obrigada pela oportunidade de mostrar minhas habilidades, foi realmente muito divertido! Com certeza aprendi muito com esse projeto.
