import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();

let queryType = `
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

// The GraphQL schema
const typeDefs = [queryType];

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world'
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
