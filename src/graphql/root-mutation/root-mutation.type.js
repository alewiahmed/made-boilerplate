import UserMutation from '../user/user-mutation.type';

const RootMutation = `
  type RootMutation {
    ${UserMutation}
  }
`;
export default RootMutation;
