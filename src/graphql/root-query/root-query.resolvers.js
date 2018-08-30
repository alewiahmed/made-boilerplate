import baseResolver from '../baseResolver';
import { NoPostFoundError } from '../errors';
import { isAuthenticatedResolver } from '../accessControl/auth';
import {
  tokenize,
  applyPagination,
  limitQueryWithId,
  getStartEndCursor
} from '../../lib';

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
  }),

  /**
   * returns an array of Posts
   */
  posts: baseResolver.createResolver(
    async (root, { first, last, before, after }, { Post }) => {
      let query = Post.find({});
      query = limitQueryWithId(query, { before, after });
      let pageInfo = await applyPagination(query, { first, last });
      return await query.find({}).then(posts => {
        const startEndCursor = getStartEndCursor(posts);
        pageInfo = {
          ...pageInfo,
          ...startEndCursor
        };
        return {
          posts,
          pageInfo
        };
      });
    }
  ),

  /**
   * returns an array of Users
   */
  users: baseResolver.createResolver(
    async (root, { first, last, before, after }, { User }) => {
      let query = User.find({});
      query = limitQueryWithId(query, { before, after });
      let pageInfo = await applyPagination(query, { first, last });
      return await query.find({}).then(users => {
        const startEndCursor = getStartEndCursor(users);
        pageInfo = {
          ...pageInfo,
          ...startEndCursor
        };
        return {
          users,
          pageInfo
        };
      });
    }
  )
};

export default resolvers;
