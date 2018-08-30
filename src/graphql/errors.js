import { createError } from 'apollo-errors';

export const UnknownError = createError('UnknownError', {
  message: 'An unknown error has occured'
});

// user should be logged in but isn't
export const AuthenticationRequiredError = createError('UnauthorizedError', {
  message: 'You must login to do that'
});

// email/password is incorrect when loging in
export const LoginError = createError('LoginError', {
  message: 'Incorrect email or password'
});

// user is already logged in
export const AlreadyAuthenticatedError = createError(
  'AlreadyAuthenticatedError',
  {
    message: 'You are already authenticated'
  }
);
