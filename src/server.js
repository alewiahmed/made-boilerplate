import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import config from '../config';
import connectMongo from './db';
import schema from './graphql/schema';

let { SERVER_PORT } = process.env;

const playground = {
  settings: {
    'editor.cursorShape': 'line'
  }
};

const start = async () => {
  const app = express();
  await connectMongo();

  const server = new ApolloServer({
    playground,
    mocks: true,
    mockEntireSchema: false,
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers
  });

  server.applyMiddleware({ app });

  app.listen({ port: SERVER_PORT }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${SERVER_PORT}${server.graphqlPath}`
    )
  );
};

start();
