import knex from "../../database/knex";

import { hash } from "bcryptjs";

export async function createFakeUser() {
  const id = Math.floor(Math.random() * 1000000);
  const password = "garibaldinho123";
  const hashedPassword = await hash(password, 8);
  const newUser = {
    name: "Garibaldo",
    email: `vilasesamo-${id}@gmail.com`,
    password: hashedPassword,
  };

  await knex("users").insert(newUser);

  return newUser;
}
