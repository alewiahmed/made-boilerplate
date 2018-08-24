// The GraphQL schema
import UserType from './user/user.type';
import DateType from './date/date.type';
import PostType from './post/post.type';
import RootQuery from './root-query/root-query.type';

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

export default [UserType, PostType, DateType, RootQuery, SchemaDefinition];
