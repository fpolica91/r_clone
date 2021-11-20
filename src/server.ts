import "reflect-metadata";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { __prod__ } from "./constants";
import express from "express";

import { connection } from "./createConnection";

const main = async () => {
  connection();
  const app = express();

  const schema = await buildSchema({
    resolvers: [path.join(__dirname, "./resolvers/*.ts")],
    validate: false,
    emitSchemaFile: true,
  });
  const server = new ApolloServer({
    schema: schema,
    context: ({ req, res }) => ({ req, res }),
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen({ port: process.env.PORT || 3000 }, () =>
    console.log("🚀 Server ready at: http://localhost:3000")
  );
};

main();
