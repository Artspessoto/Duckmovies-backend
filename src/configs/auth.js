require("dotenv").config({ path: "prod.env" });

module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: "1d",
  },
};
