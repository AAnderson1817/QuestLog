import mongoose from 'mongoose';
import LandMark from './landmark';
let Schema = mongoose.Schema;

let QuestSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  landmark: {
    type: Schema.Types.ObjectId,
    ref: 'Landmark',
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Quest', QuestSchema);
