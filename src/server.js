require("express-async-errors");
const AppError = require("./utils/AppError");
const database = require("./database/sqlite");
const uploadConfig = require("./configs/upload");

const express = require("express");
const routes = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger.json");

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

database();

app.use(routes);

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "Error",
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "Error",
    message: "Internal Server Error",
  });
});

app.use("/files", (req, res, next) => {
  res.status(404).json({
    status: "Error",
    message: "Imagem não encontrada",
  });
});

module.exports = app;
