import knex from "knex";

import {hash} from "bcryptjs";

export async function createFakeUser() {
    const id = Math.floor(Math.random() * 1000000);
    const password = "garibaldinho123";
    const hashedPassword = await hash(password, 8);
    const newUser = {
        name: "Garibaldo",
        email: `vilasesamo-${id}@gmail.com`,
        password: hashedPassword,
        avatar: null
    };


    try {

        await knex("users").insert(newUser);
    } catch (
        error
        ) {
        console.log(error);
    }

    return newUser;
}
