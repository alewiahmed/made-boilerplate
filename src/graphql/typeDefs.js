// The GraphQL schema
import RootQuery from './root-query/root-query.type';
import UserType from './user/user.type';
import DateType from './date/date.type';

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

export default [UserType, DateType, RootQuery, SchemaDefinition];
