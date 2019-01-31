import { GQL, ResolverMap } from "./types";

export const resolvers: ResolverMap = {
  Query: {
    hello: (_, { name }: GQL.IHelloOnQueryArguments) =>
      `Hello ${name || "World"}`
  },
  Mutation: {
    register: (_, { firstName, lastName, email, password }: GQL.IRegisterOnMutationArguments) => {}
  }
};
