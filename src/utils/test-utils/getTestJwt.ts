import authConfig from "../../configs/auth.js";
import { sign } from "jsonwebtoken";
import knex from "../../database/knex";

export const getTestJwt = async (user): Promise<string> => {
  const { secret, expiresIn } = authConfig.jwt;

  const userData = await knex("users").where({ email: user.email }).first();

  return sign({}, secret, {
    subject: String(userData.id),
    expiresIn,
  });
};
