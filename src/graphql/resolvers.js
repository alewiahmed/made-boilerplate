import Post from './post/post.resolvers';
import RootQuery from './root-query/root-query.resolvers';
import RootMutation from './root-mutation/root-mutation.resolvers';
import PostConnection from './postConnection/postConnection.resolvers';
import UserConnection from './userConnection/userConnection.resolvers';

export default {
  Post,
  RootQuery,
  RootMutation,
  PostConnection,
  UserConnection
};
