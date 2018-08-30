import baseResolver from '../baseResolver';

const userConnectionResolvers = {
  edges: baseResolver.createResolver(({ users }, data) => {
    return users.map(user => {
      return {
        user: user,
        cursor: Buffer.from(user.id.toString()).toString('base64')
      };
    });
  }),
  pageInfo: baseResolver.createResolver(({ pageInfo }, data) => {
    return pageInfo;
  })
};

export default userConnectionResolvers;
