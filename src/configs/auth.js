const env = process.env.NODE_ENV === "production" ? "prod.env" : ".env.example" ;
require("dotenv").config({ path: env })
module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: "1d",
  },
};
