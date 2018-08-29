import { createError } from 'apollo-errors';

export const UnknownError = createError('UnknownError', {
  message: 'An unknown error has occured'
});

// user should be logged in but isn't
export const AuthenticationRequiredError = createError('UnauthorizedError', {
  message: 'You must login to do that'
});
