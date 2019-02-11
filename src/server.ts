import * as path from "path";
import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import { resolvers } from "./resolvers";
import { createTypeormConnection } from "./utils/createTypeormConnection";

export const server = async () => {
  try {
    const typeDefs = importSchema(path.join(__dirname, "./schema.graphql"));
    const gqlServer = new GraphQLServer({ typeDefs, resolvers });
    await createTypeormConnection();
    const app = await gqlServer.start({
      port: process.env.NODE_ENV === "test" ? 0 : 4000
    });
    return app;
  } catch (error) {
    return error;
  }
};
