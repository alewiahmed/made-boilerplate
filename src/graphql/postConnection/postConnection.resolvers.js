import baseResolver from '../baseResolver';

const postConnectionResolvers = {
  edges: baseResolver.createResolver(async ({ posts }, data) => {
    return await posts.map(post => {
      return {
        post: post,
        cursor: Buffer.from(post.id).toString('base64')
      };
    });
  }),
  pageInfo: baseResolver.createResolver(({ pageInfo }, data) => {
    return pageInfo;
  })
};

export default postConnectionResolvers;
