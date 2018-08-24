// The GraphQL schema
import RootQuery from './root-query/root-query.type';

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

export default [RootQuery, SchemaDefinition];
