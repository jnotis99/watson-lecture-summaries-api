import Lecture from '../models/lectureModel';

export const createLecture = async (lectureInfo) => {
  const lecture = new Lecture();

  lecture.title = lectureInfo.title;
  lecture.text = lectureInfo.text;
  // GET NLU OUTPUT HERE

  // do the next two lines in the .then() of the NLU output
  const newLecture = await lecture.save();
  return newLecture;
};

export const getLectures = async () => {
  const lectures = await Lecture.find({ sort: { created_at: -1 } });
  return lectures;
};

export const getLecture = async (id) => {
  const lecture = await Lecture.findById(id);
  return lecture;
};

export const deleteLecture = async (id) => {
  await Lecture.deleteOne({ _id: id });
};
