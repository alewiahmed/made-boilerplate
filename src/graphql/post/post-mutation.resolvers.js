import { isAuthenticatedResolver } from '../accessControl/auth';

const postMutationResolvers = {
  // Create post mutation
  addPost: isAuthenticatedResolver.createResolver(
    async (root, { text }, { Post, User, userInfo }) => {
      let user = await User.findOne({ ...userInfo });
      return await Post.create({ text, user: user.id })
        .then(post => post)
        .catch(err => err);
    }
  )
};

export default postMutationResolvers;
