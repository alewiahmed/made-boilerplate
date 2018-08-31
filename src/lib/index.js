import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import emailRegex from 'email-regex';

import {
  EmailAlreadyTakenError,
  IncorrectEmailFormatError
} from '../graphql/errors';

let { JWT_SECRET } = process.env;

export function tokenize(user) {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    JWT_SECRET
  );

  user.token = token;
  return user;
}

export async function checkEmail(User, email) {
  let check = emailRegex({ exact: true }).test(email);
  if (!check) throw new IncorrectEmailFormatError();

  let user = await User.findOne({ email });
  if (user) throw new EmailAlreadyTakenError();
}

export function limitQueryWithId(query, { before, after }) {
  let ObjectId = mongoose.Types.ObjectId;
  const filter = {};

  if (before) {
    let minimumObjectId = new ObjectId(
      Buffer.from(before, 'base64').toString()
    );
    filter._id = { $lt: minimumObjectId };
  }

  if (after) {
    let maximumObjectId = new ObjectId(Buffer.from(after, 'base64').toString());
    filter._id = { $gt: maximumObjectId };
  }
  return query.find(filter);
}

export async function applyPagination(query, { first, last }) {
  let count, limit, skip;
  if (first || last) {
    count = await query.countDocuments();

    if (first && count > first) {
      limit = first;
    } else if (last) {
      if (limit && limit > last) {
        skip = limit - last;
      } else if (!limit && count > last) {
        skip = count - last;
      }
      limit = last;
    }

    if (skip) query.skip(skip);
    if (limit) query.limit(limit);
  }
  return {
    hasNextPage: Boolean(first && count > first),
    hasPreviousPage: Boolean(last && count > last)
  };
}

export function getStartEndCursor(posts) {
  if (!posts.length) {
    return {
      startCursor: null,
      endCursor: null
    };
  }

  return {
    startCursor: Buffer.from(posts[0].id.toString()).toString('base64'),
    endCursor: Buffer.from(posts[posts.length - 1].id.toString()).toString(
      'base64'
    )
  };
}
