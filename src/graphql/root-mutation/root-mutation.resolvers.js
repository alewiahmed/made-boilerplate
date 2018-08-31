import PostMutation from '../post/post-mutation.resolvers';
import UserMutation from '../user/user-mutation.resolvers';
import AdminMutation from '../admin/admin-mutation.resolvers';

export default {
  ...UserMutation,
  ...PostMutation,
  ...AdminMutation
};
