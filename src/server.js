import express from 'express';
import schema from './graphql/schema';
import { SERVER_PORT } from '../config';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();

const playground = {
  settings: {
    'editor.cursorShape': 'line'
  }
};

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
