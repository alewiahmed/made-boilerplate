import jwt from 'jsonwebtoken';

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
