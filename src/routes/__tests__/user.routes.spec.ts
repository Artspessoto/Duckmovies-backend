import { describe, it, expect } from "vitest";
import supertest from "supertest";

import { App } from "../../server.js";

const hash = (): string => {
  return Math.random().toString(36).substring(7);
};

describe("User routes", () => {
  it("should create an user", async () => {
    const user = {
      name: "Garibaldo",
      email: `vilasesamo-${hash()}@gmail.com`,
      password: "garibaldinho123",
    };

    const url = "/users";
    const response = await supertest(App).post(url).send(user);

    expect(response.status).toEqual(201);
  });

  it("should not create an user with an empty email", async () => {
    const user = {
      name: "Garibaldo",
      email: "",
      password: "garibaldinho123",
    };

    const url = "/users";
    const response = await supertest(App).post(url).send(user);
    expect(response.status).toEqual(400);
  });

  it("should not create an user with an empty password", async () => {
    const user = {
      name: "Garibaldo",
      email: `vilasesamo-${hash()}@gmail.com`,
      password: "",
    };

    const url = "/users";
    const response = await supertest(App).post(url).send(user);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      status: "Error",
      message: "Senha muito curta",
    });
  });

  it("should not update an user with an empty token", async () => {
    const user = {
      name: "Garibaldo",
      email: "vilasesamo-663zls@gmail.com",
      password: "garibaldinho123",
      token: "",
    };

    const url = "/users";
    const response = await supertest(App)
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
      name: "Garibaldo",
      email: "vilasesamo-663zls@gmail.com",
      password: "garibaldinho123",
      token: "invalid-token",
    };

    const url = "/users";
    const response = await supertest(App)
      .put(url)
      .set("Authorization", `Bearer ${user.token}`)
      .send(user);

    expect(response.status).toEqual(401);
    expect(response.body).toEqual({
      status: "Error",
      message: "JWT Token inválido",
    });
  });
});
