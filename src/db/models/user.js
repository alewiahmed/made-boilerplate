import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

var Schema = mongoose.Schema;

const userSchema = new Schema({
  role: { type: String, default: 'user' },
  password: { type: String, required: true },
  avatar: { type: String, default: '' },
  email: { type: String, lowercase: true, trim: true, required: true },
  lastName: {
    type: String,
    lowercase: true,
    trim: true,
    required: false,
    default: ''
  },
  firstName: {
    type: String,
    lowercase: true,
    trim: true,
    required: false,
    default: ''
  }
});

userSchema.plugin(timestamps);

export default mongoose.model('User', userSchema);
