import { baseResolver } from '../baseResolver';

const postResolvers = {
  id: root => root._id || root.id
};

export default postResolvers;
