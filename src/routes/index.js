const { Router } = require("express");

const usersRouter = require("./users.routes");
const movieTagsRouter = require("./movieTags.routes");
const movieNotesRouter = require("./movieNotes.routes");
const sessionsRouter = require("./sessions.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/movie_tags", movieTagsRouter);
routes.use("/movie_notes", movieNotesRouter);

module.exports = routes;
