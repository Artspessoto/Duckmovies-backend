import { beforeEach, describe, expect, it } from "vitest";
import supertest from "supertest";

const App = require("../../server.js");
import { getTestJwt } from "../../utils/test-utils/getTestJwt";

describe("MovieNotes routes", () => {
  it("should create an movie_note", async () => {
    const user = {
      name: "Teste 2p6buk",
      email: "teste-ceia6d@gmail.com",
      old_password: "1234567",
      password: "1234567",
    };

    const token = await getTestJwt(user);

    const movieNote = {
      title: "Pânico",
      description: `Um grupo de jovens enfrenta um assassino mascarado 
            que testa seus conhecimentos sobre filmes de terror. 
            A pequena cidade de Woodsboro nunca mais será a mesma.`,
      rating: 4,
      tags: ["Terror", "Mistério"],
    };

    const url = "/movie_notes";

    const response = await supertest(App)
      .post(url)
      .set("Authorization", `Bearer ${token}`)
      .send(movieNote);

    expect(response.status).toEqual(201);
  });
});
