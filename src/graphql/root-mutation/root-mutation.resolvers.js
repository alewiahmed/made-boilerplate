import PostMutation from '../post/post-mutation.resolvers';
import UserMutation from '../user/user-mutation.resolvers';

export default {
  ...UserMutation,
  ...PostMutation
};
