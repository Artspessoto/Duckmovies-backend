const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class Movie_notesController {
  async create(req, res) {
    const { title, description, rating, tags } = req.body;
    const user_id = req.user.id;
    const isNotInteger = !Number.isInteger(rating) || rating < 1 || rating > 5;

    if (!title) throw new AppError("Insira um título para o filme");
    if (title.length > 255)
      throw new AppError("Título do filme não pode ultrapassar 255 caracteres");

    if (typeof rating !== "number" || isNotInteger) {
      throw new AppError(
        "A avaliação do filme deve ser um número inteiro entre 1 e 5"
      );
    }

    if (!rating) throw new AppError("Avaliação do filme é obrigatória");

    const [movieNotes_id] = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id,
    });

    const movie_tagsInsert = tags.map((name) => {
      return {
        note_id: movieNotes_id,
        name,
        user_id,
      };
    });

    await knex("movie_tags").insert(movie_tagsInsert);

    return res.status(201).json();
  }

  async show(req, res) {
    const { id } = req.params;

    const movie_note = await knex("movie_notes").where({ id }).first();
    const movie_tags = await knex("movie_tags")
      .where({ note_id: id })
      .orderBy("name");
    return res.status(200).json({ ...movie_note, movie_tags });
  }
  async delete(req, res) {
    const { id } = req.params;

    await knex("movie_notes").where({ id }).delete();

    return res.json();
  }
  async index(req, res) {
    const { title, tags } = req.query;
    const user_id = req.user.id;

    let movie_notes;

    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim());

      movie_notes = await knex("movie_tags")
        .select(["movie_notes.id", "movie_notes.title", "movie_notes.user_id"])
        .where("movie_notes.user_id", user_id)
        .whereLike("movie_notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id")
        .orderBy("movie_notes.title");
    } else {
      movie_notes = await knex("movie_notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .whereIn("tags.name")
        .orderBy("title");
    }

    const userTags = await knex("movie_tags").where({ user_id });
    const movie_notesWithTags = movie_notes.map((movie_note) => {
      const movieTags = userTags.filter((tag) => tag.note_id === movie_note.id);

      return {
        ...movie_note,
        tags: movieTags,
      };
    });

    return res.status(200).json(movie_notesWithTags);
  }
}

module.exports = Movie_notesController;
