import { describe, it, expect, beforeEach } from "vitest";
import supertest, { Test } from "supertest";
import { getTestJwt } from "../../utils/test-utils/getTestJwt.js";

// import { App } from "../../server.js";
const App = require("../../server.js");
import TestAgent from "supertest/lib/agent.js";

let server: TestAgent<Test>;

beforeEach(() => {
  server = supertest(App);
});

describe("User Avatar", () => {
  // @todo: Implement test
  it.fails("should upload avatar for an user", async () => {
    const user = {
      email: "teste-4u6ajyj@gmail.com",
      password: "1234567",
    };

    const filePath = "./no-name.png";

    const token = await getTestJwt(user);

    const url = "/users/avatar";

    const response = await server
      .patch(url)
      .set("Authorization", `Bearer ${token}`)
      .attach("avatar", filePath);

    expect(response.status).toEqual(200);
  });
});
