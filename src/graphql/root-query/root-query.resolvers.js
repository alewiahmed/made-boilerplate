import baseResolver from '../baseResolver';
import { Context } from 'apollo-resolvers/dist/context';

const resolvers = {
  hello: baseResolver.createResolver(() => {
    return 'Hello';
  })
};

export default resolvers;
