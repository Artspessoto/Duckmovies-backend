const knex = require("../database/knex");

class Movie_tagsController {
  async index(req, res) {
    const user_id = req.user.id;

    const tags = await knex("movie_tags").where({ user_id });

    return res.status(200).json(tags);
  }
}

module.exports = Movie_tagsController;
