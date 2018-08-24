import { baseResolver } from '../baseResolver';

const resolvers = {
  id: root => root._id || root.id
};

export default resolvers;
