import { describe, it, expect } from "vitest";
import supertest from "supertest";

import { App } from "../../server.js";

describe("MovieNotes routes", () => {
  it("should create an movie_note", async () => {
    const userData = {
      email: "vilasesamo-663zls@gmail.com",
      password: "garibaldinho123",
    };

    const movieNote = {
      title: "Pânico",
      description: `Um grupo de jovens enfrenta um assassino mascarado 
            que testa seus conhecimentos sobre filmes de terror. 
            A pequena cidade de Woodsboro nunca mais será a mesma.`,
      rating: 4,
      tags: ["Terror", "Mistério"],
    };

    const urlToken = "/sessions";
    const authResponse = await supertest(App)
      .post(urlToken)
      .send({ email: userData.email, password: userData.password });

    const userToken = authResponse.body.token;
    const url = "/movie_notes";

    const response = await supertest(App)
      .post(url)
      .set("Authorization", `Bearer ${userToken}`)
      .send(movieNote);

    expect(response.status).toEqual(201);
  });
});
