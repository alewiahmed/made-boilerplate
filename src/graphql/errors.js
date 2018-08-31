import { createError } from 'apollo-errors';

export const UnknownError = createError('UnknownError', {
  message: 'An unknown error has occured'
});

// When a normal user accesses something that requires an admin privilage
export const ForbiddenError = createError('ForbiddenError', {
  message: 'You are not allowed to do that'
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

// Error while registering
export const RegistrationError = createError('RegistrationError', {
  message: 'Error Registering'
});

// Given Email already exists Error
export const EmailAlreadyTakenError = createError('EmailAlreadyTakenError', {
  message: 'User with such email exists'
});

// incorrect Emamil format Error
export const IncorrectEmailFormatError = createError(
  'IncorrectEmailFormatError',
  {
    message: 'Incorrect email format'
  }
);

// The Email does not exist Error
export const EmailDoesNotExistError = createError('EmailDoesNotExistError', {
  message: 'The email does not exist'
});

// The given currentPassword is not correct error.
export const IncorrectPasswordError = createError('IncorrectPasswordError', {
  message: 'Incorrect old password'
});

// Thrown when there is no post with the give id
export const NoPostFoundError = createError('NoPostFoundError', {
  message: 'No post found with the given id'
});

// Thrown when a user doesn't exist
export const TheUserDoesNotExistError = createError(
  'TheUserDoesNotExistError',
  {
    message: 'The given user does not exist'
  }
);
