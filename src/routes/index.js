const { Router } = require("express");

const usersRouter = require("./users.routes");
const movie_tagsRouter = require("./movie_tags.routes");
const movie_notesRouter = require("./movie_notes.routes");
const sessionsRouter = require("./sessions.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/movie_tags", movie_tagsRouter);
routes.use("/movie_notes", movie_notesRouter);

module.exports = routes;
