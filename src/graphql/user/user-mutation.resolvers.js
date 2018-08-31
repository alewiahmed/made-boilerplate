import bcrypt from 'bcrypt';

import baseResolver from '../baseResolver';
import { tokenize, checkEmail } from '../../lib';

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
  ),
  updateProfile: isAuthenticatedResolver.createResolver(
    async (root, { firstName, lastName, email }, { User, userInfo }) => {
      let updateFields = {};
      if (firstName) {
        updateFields.firstName = firstName;
      }
      if (lastName) {
        updateFields.lastName = lastName;
      }
      if (email) {
        await checkEmail(User, email);
        updateFields.email = email;
      }

      await User.updateOne(userInfo, updateFields);

      let user = await User.findById(userInfo._id);

      user = tokenize(user);
      userInfo = { _id: user.id, email: user.email };
      return user;
    }
  )
};

export default userMutationResolvers;
