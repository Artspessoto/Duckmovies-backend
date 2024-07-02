require("dotenv").config()


module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: "1d",
  },
};
