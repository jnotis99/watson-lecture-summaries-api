/**
 * Schema for Lectures stored in MongoDB
 */
import mongoose, { Schema } from 'mongoose';

const LectureSchema = new Schema({
  title: String,
  text: String,
  nluOutput: Object,
},
{
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const LectureModel = mongoose.model('Lecture', LectureSchema);

export default LectureModel;
