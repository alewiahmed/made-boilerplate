import { TheUserDoesNotExistError } from '../errors';
import { isAdminResolver } from '../accessControl/auth';

const adminMutationResolvers = {
  deletePost: isAdminResolver.createResolver(
    async (root, { postIds }, { Post }) => {
      let deleteResult = [];
      await Promise.all(
        postIds.map(async postId => {
          try {
            await Post.findOneAndDelete({ _id: postId }).then(post => {
              if (post) deleteResult.push(post);
            });
          } catch (err) {
            return err;
          }
        })
      );
      return deleteResult;
    }
  ),
  changeUserRole: isAdminResolver.createResolver(
    async (root, { userId, role }, { User }) => {
      let user;
      try {
        user = await User.findOne({ _id: userId });
      } catch (err) {
        throw new TheUserDoesNotExistError();
      }

      return await User.findOneAndUpdate(
        { _id: userId },
        { role },
        { new: true }
      );
    }
  )
};

export default adminMutationResolvers;
