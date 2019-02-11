import { request } from "graphql-request";

import { userName, email, passsword } from "./constants";
import { User } from "../src/entity/User";
import { server } from "./../src/server";

let getHost = () => "";

beforeAll(async () => {
  const app = await server();
  const { port } = app.address();
  getHost = () => `http://127.0.0.1:${port}`;
});

const mutation = `
  mutation {
    register(userName: "${userName}", email: "${email}", password: "${passsword}")
  }
`;

describe("registers a user", async () => {
  test("mutation response", async () => {
    const response = await request(getHost(), mutation);
    expect(response).toEqual({ register: true });
  });

  test("stored user", async () => {
    const users = await User.find({ where: { email } });
    const user = users[0];
    expect(user.email).toEqual(email);
  });

  test("password hashing", async () => {
    const users = await User.find({ where: { email } });
    const user = users[0];
    expect(user.password).not.toEqual(passsword);
  });
});
