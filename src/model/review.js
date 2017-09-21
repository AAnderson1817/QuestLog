import mongoose from 'mongoose';
import LandMark from './landmark';
let Schema = mongoose.Schema;

let ReviewSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  landmark: {
    type: Schema.Types.ObjectId,
    ref: 'Landmark',
    required: true
  }
});

module.exports = mongoose.model('Review', ReviewSchema);
