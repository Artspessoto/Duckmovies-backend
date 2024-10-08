const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const z = require("zod");

const title = "Título (2-255)";
const description = "Descrição do filme não pode exceder 1500 caracteres";
const rating = "Avaliação do filme deve ser entre 1 e 5";
const tags = "A inclusão de uma categoria é obrigatória para a criação de uma nota de filme.";

const CreateMovieNotePayload = z.object({
  title: z.string().min(2, title).max(255, title),
  description: z.string().max(1500, description).optional(),
  rating: z.number().min(1, rating).max(5, rating),
  tags: z.array(z.string()).min(1, tags),
});

class Movie_notesController {
  async create(req, res) {
    const { title, description, rating, tags } = req.body;
    const user_id = req.user.id;

    const { success, error } = CreateMovieNotePayload.safeParse({
      title,
      description,
      rating,
      tags,
    });

    if (!success) throw new AppError(error.errors.map((err) => err.message));

    const [movieNote] = await knex("movie_notes")
      .insert({
        title,
        description,
        rating,
        user_id,
      })
      .returning("*");

    const movie_tagsInsert = tags.map((name) => {
      return {
        note_id: movieNote.id,
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
