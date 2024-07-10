import { describe, it, expect, beforeEach } from "vitest";
import supertest, { Test } from "supertest";

import { App } from "../../server.js";
import TestAgent from "supertest/lib/agent";
import { getTestJwt } from "../../utils/test-utils/getTestJwt";

const hash = (): string => {
  return Math.random().toString(36).substring(7);
};

let server: TestAgent<Test>;

beforeEach(() => {
  server = supertest(App);
});

describe("User routes", () => {
  it("should create an user", async () => {
    const user = {
      name: `Teste ${hash()}`,
      email: `teste-${hash()}@gmail.com`,
      password: "1234567",
    };

    const url = "/users";
    const response = await server.post(url).send(user);

    expect(response.status).toEqual(201);
  });

  it("should not create an user with an empty email", async () => {
    const user = {
      name: "Teste",
      email: "",
      password: "1234567",
    };

    const url = "/users";
    const response = await server.post(url).send(user);
    expect(response.status).toEqual(400);
  });

  it("should not create an user with an empty password", async () => {
    const user = {
      name: "Teste",
      email: `teste-${hash()}@gmail.com`,
      password: "",
    };

    const url = "/users";
    const response = await server.post(url).send(user);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      status: "Error",
      message: "Senha muito curta",
    });
  });

  it("should not update an user with an empty token", async () => {
    const user = {
      name: "Teste",
      email: `vilasesamo-${hash()}@gmail.com`,
      password: "1234567",
      token: "",
    };

    const url = "/users";
    const response = await server
      .put(url)
      .set("Authorization", `Bearer ${user.token}`)
      .send(user);

    expect(response.status).toEqual(401);
    expect(response.body).toEqual({
      status: "Error",
      message: "JWT Token inválido",
    });
  });

  it("should not update and user with an invalid token", async () => {
    const user = {
      name: "Teste",
      email: `teste-${hash()}@gmail.com`,
      password: "1234567",
      token: "invalid-token",
    };

    const url = "/users";
    const response = await server
      .put(url)
      .set("Authorization", `Bearer ${user.token}`)
      .send(user);

    expect(response.status).toEqual(401);
    expect(response.body).toEqual({
      status: "Error",
      message: "JWT Token inválido",
    });
  });

  it("should update an user name", async () => {
    const user = {
      name: "User1 Teste",
      email: "user1@gmail.com",
      old_password: "1234567",
      password: "1234567",
    };

    const token = await getTestJwt(user);

    const url = "/users";

    const response = await server
      .put(url)
      .set("Authorization", `Bearer ${token}`)
      .send(user);

    expect(response.status).toEqual(200);
  });
});
