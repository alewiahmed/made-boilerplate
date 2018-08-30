import baseResolver from '../baseResolver';
import {
  AlreadyAuthenticatedError,
  AuthenticationRequiredError
} from '../errors';

export const isAuthenticatedResolver = baseResolver.createResolver(
  // Extract the user from context (undefined if non-existent)
  async (root, args, { userInfo, User }) => {
    if (!userInfo) throw new AuthenticationRequiredError();
    let user = await User.findOne({ email: userInfo.email });
    if (!user) throw new AuthenticationRequiredError();
  }
);

export const isNotAuthenticatedResolver = baseResolver.createResolver(
  async (root, args, { userInfo }) => {
    if (userInfo) {
      let user = await User.findOne(userInfo);
      if (user) throw new AlreadyAuthenticatedError();
    }
  }
);
