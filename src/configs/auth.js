const env = process.env.NODE_ENV === "test" ? ".env" : "prod.env";
require("dotenv").config({ path: env })

module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: "1d",
  },
};
