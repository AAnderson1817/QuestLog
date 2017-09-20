import mongoose from 'mongoose';
import Review from './review';

let Schema = mongoose.Schema;

let landMarkSchema = new Schema ({
  name: {
    type: String,
    required:true
},

  avgcost: Number,

  geometry: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },

  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review'}],

  quests: [{ type: Schema.Types.ObjectId, ref: "Quest"}],
  
});

module.exports = mongoose.model('Landmark', landMarkSchema);
