require("express-async-errors");
const AppError = require("./utils/AppError");
const database = require("./database/sqlite");
const uploadConfig = require("./configs/upload");

const express = require("express");
const routes = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger.json");
const { SwaggerTheme, SwaggerThemeNameEnum } = require('swagger-themes');

const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const theme = new SwaggerTheme();

const options = {
  explorer: true,
  customCss: theme.getBuffer(SwaggerThemeNameEnum.FEELING_BLUE)
}

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, options));

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
