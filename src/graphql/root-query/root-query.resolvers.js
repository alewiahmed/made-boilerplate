import { tokenize } from '../../lib';
import baseResolver from '../baseResolver';
import { isAuthenticatedResolver } from '../accessControl/auth';

const resolvers = {
  /**
   * would return the current user
   */
  me: isAuthenticatedResolver.createResolver(
    async (root, args, { User, userInfo }) => {
      let user = await User.findOne({ ...userInfo });
      return tokenize(user);
    }
  )
};

export default resolvers;
