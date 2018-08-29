import Mongoose from 'mongoose';

let { DB_USER, DB_HOST, DB_NAME, DB_PORT, NODE_ENV, DB_PASSWORD } = process.env;

Mongoose.Promise = global.Promise;

export default async () => {
  const connectionString = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

  const db = await Mongoose.connect(connectionString, {
    useNewUrlParser: true
  });
};
