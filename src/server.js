import express from 'express';
import jwt from 'express-jwt';
import { ApolloServer, gql } from 'apollo-server-express';

import config from '../config';
import connectMongo from './db';
import schema from './graphql/schema';

let { SERVER_PORT, JWT_SECRET } = process.env;

const playground = {
  settings: {
    'editor.cursorShape': 'line'
  }
};

const start = async () => {
  const app = express();
  let models = await connectMongo();

  const server = new ApolloServer({
    playground,
    mocks: true,
    mockEntireSchema: false,
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers,
    context: ({ req }) => {
      return {
        ...models,
        userInfo: req.user ? { _id: req.user.id, email: req.user.email } : null
      };
    }
  });

  app.use(
    server.graphqlPath,
    jwt({
      secret: JWT_SECRET,
      credentialsRequired: false
    })
  );

  server.applyMiddleware({ app });

  app.listen({ port: SERVER_PORT }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${SERVER_PORT}${server.graphqlPath}`
    )
  );
};

start();
