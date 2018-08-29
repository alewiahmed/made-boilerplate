import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

var Schema = mongoose.Schema;

const postSchema = new Schema({
  text: { type: String, required: false },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

postSchema.plugin(timestamps);

export default mongoose.model('Post', postSchema);
