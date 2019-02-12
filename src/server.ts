import * as path from "path";
import * as fs from "fs";
import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";

import { createTypeormConnection } from "./utils/createTypeormConnection";
import { GraphQLSchema } from "graphql";

export const server = async () => {
  try {
    const schemas: GraphQLSchema[] = [];
    const folders = fs.readdirSync(path.join(__dirname, "./features"));
    folders.forEach(folder => {
      const { resolvers } = require(`./features/${folder}/resolvers`);
      const typeDefs = importSchema(
        path.join(__dirname, `./features/${folder}/schema.graphql`)
      );
      schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
    });
    const gqlServer = new GraphQLServer({ schema: mergeSchemas({ schemas }) });
    await createTypeormConnection();
    const app = await gqlServer.start({
      port: process.env.NODE_ENV === "test" ? 0 : 4000
    });
    console.log("Application is running on http://localhost:4000",)
    return app;
  } catch (error) {
    console.log(error)
    return error;
  }
};
