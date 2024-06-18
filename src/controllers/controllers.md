## UsersController

**Descrição:** Esse controller gerencia a criação e atualização de usuários dentro da API.
**Ações:**
* `POST /users`: Cria um novo usuário a partir do name, email e password, que são necessários ao corpo da requisição, com a senha sendo encriptada de forma segura.
* `PUT /users`: Atualiza dados referentes ao usuário, sendo necessário ser um usuário autenticado para realizar as alterações. Para atualizar seus dados é necessário seu name, email, old_password e password.

## Movie_notesController

**Descrição:** Esse controller é responsável por criar anotações sobre um filme.
**Ações:**
* `POST /movie`