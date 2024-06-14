import {describe, it, expect} from "vitest";
import supertest from "supertest"

import {App} from "../../server.js"

const hash = (): string => {
    return Math.random().toString(36).substring(7);
}

describe("User routes", () => {
    it("should create an user", async () => {
        const user = {
            name: "Garibaldo",
            email: `vilasesamo-${hash()}@gmail.com`,
            password: "garibaldinho123"
        }

        const url = "/users"
        const response = await supertest(App).post(url).send(user)
        console.log(response.body)
        expect(response.status).toEqual(201);
    });
})
