import * as bcrypt from "bcryptjs";
import { GQL, ResolverMap } from "./types";
import { User } from "./entity/User";

export const resolvers: ResolverMap = {
  Query: {
    hello: (_, { name }: GQL.IHelloOnQueryArguments) =>
      `Hello ${name || "World"}`
  },
  Mutation: {
    register: async (
      _,
      { firstName, lastName, email, password }: GQL.IRegisterOnMutationArguments
    ) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
      });

      await user.save();
      return true;
    }
  }
};
