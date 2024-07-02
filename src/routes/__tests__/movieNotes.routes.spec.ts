import {describe, expect, it} from "vitest";
import supertest from "supertest";

import {App} from "../../server.js";
import {getTestJwt} from "../../utils/test-utils/getTestJwt";
import {createFakeUser} from "../../utils/test-utils/createFakeUser";

describe("MovieNotes routes", () => {
    it("should create an movie_note", async () => {
        const userData = await createFakeUser();

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
            .set("Authorization", `Bearer ${getTestJwt(userData)}`)
            .send(movieNote);

        expect(response.status).toEqual(201);
    });
});
