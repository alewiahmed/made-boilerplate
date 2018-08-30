import UserMutation from '../user/user-mutation.type';
import PostMutation from '../post/post-mutation.type';

const RootMutation = `
  type RootMutation {
    ${UserMutation}
    ${PostMutation}
  }
`;
export default RootMutation;
