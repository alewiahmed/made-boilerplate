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
  )
};

export default adminMutationResolvers;
