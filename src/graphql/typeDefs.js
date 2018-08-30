// The GraphQL schema
import UserType from './user/user.type';
import DateType from './date/date.type';
import PostType from './post/post.type';
import RootQuery from './root-query/root-query.type';
import RootMutation from './root-mutation/root-mutation.type';
import PostConnectionType from './postConnection/postConnection.type';

const SchemaDefinition = `
  schema {
    query: RootQuery,
    mutation: RootMutation
  }
`;

export default [
  UserType,
  PostType,
  DateType,
  RootQuery,
  RootMutation,
  SchemaDefinition,
  PostConnectionType
];
