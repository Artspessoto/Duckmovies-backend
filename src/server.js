require("express-async-errors");
const AppError = require("./utils/AppError");
const database = require('./database/sqlite');

const express = require("express");
const routes = require("./routes");

const app = express();
app.use(express.json());

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

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));


export default app;
