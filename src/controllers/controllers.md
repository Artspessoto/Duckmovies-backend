## SessionsController

**Descrição:** Esse controller é responsável por gerar o token para o usuário. 
**Ações:**
* `POST /sessions (método create)`: Gera um token para um usuário já cadastrado com tempo de expiração de 1 dia e com a chave secreta, que é usada para verificar e assinar o token, garantindo autenticidade da sessão do usuário na aplicação. Para gerar esse token é necessário que o usuário envie no corpo da requisição os dados de email e password. 
> A requisição se for bem sucedida retorna os dados do usuário e o seu token.

### Iniciando uma sessão para o usuário e gerando token de autenticação
![createSession](https://lh3.google.com/u/1/d/1oK-_qMG8KrV0f8i3zaQNKndEhBBAeRCG=w1366-h641-iv1)

## UsersController

**Descrição:** Esse controller gerencia a criação e atualização de usuários dentro da API.
**Ações:**
* `POST /users (método create)`: Cria um novo usuário a partir do campos validados name, email e password, que são necessários ao corpo da requisição, com a senha sendo encriptada de forma segura.
> A requisição retorna o código HTTP 201, caso o usuário for cadastrado com sucesso.

### Cadastrando usuário
![createUser](https://lh3.google.com/u/1/d/1uSigTiK2nzH1ynyrQSxYBN74qxWYT6Ej=w1366-h641-iv1)

### Usuário cadastrado no banco:
![userInDatabase](https://lh3.google.com/u/1/d/17gT24LapACT1aLLOV8Jn3l_MYYs8bBGJ=w1366-h641-iv1)

* `PUT /users (método update)`: Atualiza dados referentes ao usuário, sendo necessário ser um usuário autenticado para realizar as alterações. Para atualizar seus dados é necessário seu name, email, old_password e password.
> A requisição retorna o código HTTP 200, caso a atualização dos dados do usuário for bem sucedida

### Atualizando dados do usuário (senha):
![updateAnUser](https://lh3.google.com/u/1/d/1Es9w8GdZAD86hwv4E7t0iRMEkARHHYZd=w1366-h641-iv1)

## MovieNotesController

**Descrição:** Esse controller é responsável por gerenciar anotações sobre um filme. Todas as ações voltadas a anotações sobre um filme requer um usuário autenticado.
**Ações:**
* `POST /movie_notes (método create)`: Cria anotações relacionadas ao filme a partir da validação de seu título, descrição, classifição e tags (categorias) relacionadas a ele armazenando a anotação no banco de dados na tabela `movie_notes`, além de também associar tags informadas à anotação na tabela `movie_tags`.
> A requisição retorna o código HTTP 201 se for bem sucedida e as tags informadas são cadastradas na tabela movie_tags

### Criando anotação sobre o filme
![createMovieNote](https://lh3.google.com/u/1/d/11YgdSBdp4IymhLWV8v-uW3C7o_n9m7aB=w916-h641-iv1)

### Nota do filme cadastrada no banco:
![movieNoteInDatabase](https://lh3.google.com/u/1/d/1NuCsR-w8yZmVeXlL5UcQRhBby9TzXHx5=w1366-h641-iv1)

### Tags informadas cadastradas na tabela movie_tags:
![movieTagsInDatabase](https://lh3.google.com/u/1/d/15BO8iOFKv-6HDCtllHHfCsGUCLf5P89I=w916-h641-iv1)

* `GET /movie_notes/:id (método show)`: Recupera anotações específicas pelo identificador da anotação do filme passado por parâmetro (Route Params).
> A requisição vai retornar a nota do filme (título, descrição, classificação e as categorias criadas) se for bem sucedida.

### Recuperando anotações pelo ID da nota do filme
![showMovieNote](https://lh3.google.com/u/1/d/1RQV-yk1QvU0i_ZLOGtX4GfRLO11yCxlx=w916-h641-iv1)

* `GET /movie_notes/:id (método delete)`: Deleta a anotação do filme a partir do seu identificador passado como parâmetro, onde ele deleta em cascata na tabela `movie_tags`.
> A requisição de delete vai apagar a nota do filme a partir do ID passado no parâmetro da rota, deletando também o que for vinculado a esse ID na tabela `movie_tags`

### Deletando a nota do filme a partir do ID do próprio
![deleteMovieNote](https://lh3.google.com/u/1/d/1sdDs2K7D11_XUop31R-T5MCD5g-nw1Ar=w1366-h641-iv1)

* `GET /movie_notes (método index)`: Lista anotações com filtros a partir do título e das tags passadas na URL como parâmetros, chamadados de parâmetros de consulta (Query Params).

### Listando as anotações de filmes com filtro de título e tags na consulta
![indexMovienote](https://lh3.google.com/u/1/d/1TvQfqNyVYbdnchO6nsrqZeQq2myoMAru=w916-h641-iv1)

## MovieTagsController

**Descrição:** Esse controller é responsável por recuperar as tags (categorias) de filmes de um usuário.Todas as ações voltadas a recuperar as tags sobre o filme requer um usuário autenticado.
**Ações:**
* `GET /movie_tags (método index)`: Ele faz consulta a tabela `movie_tags` retorna as tags associadas ao usuário que faz a solicitação.

### Listando as tags (categorias) associadas ao usuário solicitante
![indexMovietag](https://lh3.google.com/u/1/d/1mo7yE_PM7_bgWeCI4yWYSG7rWcUxmPOf=w1366-h641-iv1)


**Documentação relacionada:**

* 📖 Documentação da API [Duckmovies](https://www.notion.so/DuckMovies-508dedb0c2be4076be7a69d7386d76dc)
