## SessionsController

**Descrição:** Esse controller é responsável por gerar o token para o usuário. 
**Ações:**
* `POST /sessions (método create)`: Gera um token para um usuário já cadastrado com tempo de expiração de 1 dia e com a chave secreta, que é usada para verificar e assinar o token, garantindo autenticidade da sessão do usuário na aplicação. Para gerar esse token é necessário que o usuário envie no corpo da requisição os dados de email e password. 
> A requisição se for bem sucedida retorna os dados do usuário e o seu token.

![Iniciando uma sessão para o usuário e gerando token de autenticação](https://imgur.com/PstWP2x)

## UsersController

**Descrição:** Esse controller gerencia a criação e atualização de usuários dentro da API.
**Ações:**
* `POST /users (método create)`: Cria um novo usuário a partir do campos validados name, email e password, que são necessários ao corpo da requisição, com a senha sendo encriptada de forma segura.
> A requisição retorna o código HTTP 201, caso o usuário for cadastrado com sucesso.

![Cadastrando usuário](https://imgur.com/TFpGdtb)

* `PUT /users (método update)`: Atualiza dados referentes ao usuário, sendo necessário ser um usuário autenticado para realizar as alterações. Para atualizar seus dados é necessário seu name, email, old_password e password.
> A requisição retorna o código HTTP 200, caso a atualização dos dados do usuário for bem sucedida

![Atualizando senha do usuário](https://imgur.com/zyP9YOQ)

## MovieNotesController

**Descrição:** Esse controller é responsável por gerenciar anotações sobre um filme. Todas as ações voltadas a anotações sobre um filme requer um usuário autenticado.
**Ações:**
* `POST /movie_notes (método create)`: Cria anotações relacionadas ao filme a partir da validação de seu título, descrição, classifição e tags (categorias) relacionadas a ele armazenando a anotação no banco de dados na tabela `movie_notes`, além de também associar tags informadas à anotação na tabela `movie_tags`.
> A requisição retorna o código HTTP 201 se for bem sucedida e as tags informadas são cadastradas na tabela movie_tags

![Criando anotação sobre o filme](https://imgur.com/f1nwXaz)

* `GET /movie_notes/:id (método show)`: Recupera anotações específicas pelo identificador da anotação do filme passado por parâmetro (Route Params).
* `GET /movie_notes/:id (método delete)`: Deleta a anotação do filme a partir do seu identificador passado como parâmetro, onde ele deleta em cascata na tabela `movie_tags`.
* `GET /movie_notes (método index)`: Lista anotações com filtros a partir do título e das tags passadas na URL como parâmetros, chamadados de parâmetros de consulta (Query Params).

## MovieTagsController

**Descrição:** Esse controller é responsável por recuperar as tags (categorias) de filmes de um usuário.Todas as ações voltadas a recuperar as tags sobre o filme requer um usuário autenticado.
**Ações:**
* `GET /movie_tags (método index)`: Ele faz consulta a tabela `movie_tags` retorna as tags associadas ao usuário que faz a solicitação.

**Documentação relacionada:**

* Documentação da API [Duckmovies](https://www.notion.so/DuckMovies-508dedb0c2be4076be7a69d7386d76dc)
