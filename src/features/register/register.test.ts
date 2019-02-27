import { request } from "graphql-request";

import { User } from "../../entity/User";
import { server } from "../../server";

const userName = "testuser";
const email = "test@email.com";
const passsword = "testpass";

let getHost = () => "";

const mutation = (userName: string, email: string, password: string) => `
  mutation {
    register(userName: "${userName}", email: "${email}", password: "${password}")
  }
`;

describe("Registering a user", async () => {
  beforeAll(async () => {
    const app = await server();
    const { port } = app.address();
    getHost = () => `http://127.0.0.1:${port}`;
  });

  test("returns mutation response", async () => {
    const response = await request(getHost(), mutation(userName, email, passsword));
    expect(response).toEqual({ register: true });
  });

  test("stores a user", async () => {
    const users = await User.find({ where: { email } });
    const user = users[0];
    expect(user.email).toEqual(email);
  });

  test("hashes the password", async () => {
    const users = await User.find({ where: { email } });
    const user = users[0];
    expect(user.password).not.toEqual(passsword);
  });

  test("doesn't duplicate used emails", async () => {
    try {
      await request(getHost(), mutation(userName, email, passsword));
    } catch (object) {
      expect(object.message).toContain("Email has already been used");
    }
  });

  test("doesn't accept invalid emails", async () => {
    try {
      await request(getHost(), mutation(userName, "bad email", passsword));
    } catch (object) {
      expect(object.message).toContain("email must be a valid email");
    }
  });

  test("doesn't accept short passwords", async () => {
    try {
      await request(getHost(), mutation(userName,email, "pass"));
    } catch (object) {
      expect(object.message).toContain("password must be at least 8 characters");
    }
  });
});
