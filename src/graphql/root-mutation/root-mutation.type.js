import UserMutation from '../user/user-mutation.type';
import PostMutation from '../post/post-mutation.type';
import AdminMutation from '../admin/admin-mutation.type';

const RootMutation = `
  type RootMutation {
    ${UserMutation}
    ${PostMutation}
    ${AdminMutation}
  }
`;
export default RootMutation;
