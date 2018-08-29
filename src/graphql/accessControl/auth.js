import baseResolver from '../baseResolver';
import { AuthenticationRequiredError } from '../errors';

export const isAuthenticatedResolver = baseResolver.createResolver(
  // Extract the user from context (undefined if non-existent)
  async (root, args, { userInfo, User }) => {
    if (!userInfo) throw new AuthenticationRequiredError();
    let user = await User.findOne({ email: userInfo.email });
    if (!user) throw new AuthenticationRequiredError();
  }
);
