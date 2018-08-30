import bcrypt from 'bcrypt';

import { tokenize } from '../../lib';
import baseResolver from '../baseResolver';

import {
  LoginError,
  RegistrationError,
  EmailDoesNotExistError,
  IncorrectPasswordError
} from '../errors';

import {
  emailNotTakenResolver,
  isAuthenticatedResolver,
  isNotAuthenticatedResolver
} from '../accessControl/auth';

const userMutationResolvers = {
  // Login user mutation
  login: isNotAuthenticatedResolver.createResolver(
    async (root, { email, password }, { User, userInfo }) => {
      let user = await User.findOne({ email });
      if (!user) {
        throw new LoginError();
      }

      // validate password
      return bcrypt.compare(password, user.password).then(res => {
        if (res) {
          // create jwt
          user = tokenize(user);
          userInfo = { _id: user.id, email: user.email };
          return user;
        }
        throw new LoginError();
      });
    }
  ),
  // Register user mutation
  register: emailNotTakenResolver.createResolver(
    async (root, { name, email, password }, { User, userInfo }) => {
      let hash = await bcrypt.hash(password, 8);
      return await User.create({ firstName: name, email, password: hash })
        .then(user => {
          user = tokenize(user);
          userInfo = { _id: user.id, email: user.email };
          return user;
        })
        .catch(err => {
          throw new RegistrationError();
        });
    }
  ),
  changePassword: isAuthenticatedResolver.createResolver(
    async (root, { oldPassword, newPassword }, { User, userInfo }) => {
      let user = await User.findOne({ ...userInfo });
      if (!user) {
        throw new EmailDoesNotExistError();
      }
      let passwordCheck = await bcrypt.compare(oldPassword, user.password);
      if (!passwordCheck) {
        throw new IncorrectPasswordError();
      }
      user.password = await bcrypt.hash(newPassword, 8);
      try {
        user = await user.save();
        user = tokenize(user);
        return user;
      } catch (error) {
        return error;
      }
    }
  )
};

export default userMutationResolvers;
