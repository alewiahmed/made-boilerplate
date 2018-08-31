import emailRegex from 'email-regex';

import baseResolver from '../baseResolver';
import {
  ForbiddenError,
  EmailAlreadyTakenError,
  AlreadyAuthenticatedError,
  IncorrectEmailFormatError,
  AuthenticationRequiredError
} from '../errors';

// Check whether the request is authenticated or not
export const isAuthenticatedResolver = baseResolver.createResolver(
  // Extract the user from context (undefined if non-existent)
  async (root, args, context) => {
    let { User, userInfo } = context;
    if (!userInfo) throw new AuthenticationRequiredError();
    let user = await User.findOne({ ...userInfo });
    if (!user) throw new AuthenticationRequiredError();

    // Add if user is Admin to the context
    context.isAdmin = user.role == 'admin' ? true : false;
  }
);

// Check whether the user is an Admin user
export const isAdminResolver = isAuthenticatedResolver.createResolver(
  // Extract the user and make sure they are an admin
  (root, args, { isAdmin }) => {
    if (!isAdmin) throw new ForbiddenError();
  }
);

// Check if not authenticated request
export const isNotAuthenticatedResolver = baseResolver.createResolver(
  async (root, args, { User, userInfo }) => {
    if (userInfo) {
      let user = await User.findOne(userInfo);
      if (user) throw new AlreadyAuthenticatedError();
    }
  }
);

// Check if the email given is correct
export const isCorrectEmailResolver = isNotAuthenticatedResolver.createResolver(
  async (root, { email }) => {
    let check = emailRegex({ exact: true }).test(email);
    if (!check) throw new IncorrectEmailFormatError();
  }
);

// Check whether the given email is not taken
export const emailNotTakenResolver = isCorrectEmailResolver.createResolver(
  async (root, { email }, { User }) => {
    let user = await User.findOne({ email });
    if (user) throw new EmailAlreadyTakenError();
  }
);
