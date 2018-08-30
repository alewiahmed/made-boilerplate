import { tokenize } from '../../lib';
import baseResolver from '../baseResolver';
import { NoPostFoundError } from '../errors';
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
  ),

  /**
   * returns a single Post
   */
  post: baseResolver.createResolver(async (root, { id }, { Post }) => {
    return await Post.findOne({ _id: id }).catch(err => new NoPostFoundError());
  })
};

export default resolvers;
