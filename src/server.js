import express from 'express';
import schema from './graphql/schema';
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

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
