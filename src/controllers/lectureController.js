import Lecture from '../models/lectureModel';
// eslint-disable-next-line import/no-duplicates
import naturalLanguageUnderstanding from '../nluutil/nlu';
// eslint-disable-next-line import/no-duplicates

export const createLecture = async (lectureInfo) => {
  const lecture = new Lecture();
  lecture.title = lectureInfo.title;
  lecture.text = lectureInfo.text;

  // GET NLU OUTPUT HERE
  // NLU Params defining the objective of the NLU call - in this instance semantic_roles
  const analyzeParams = {
    text: lecture.text,
    features: {
      semantic_roles: {},
    },
  };

  // NLU call
  lecture.nluOutput = await naturalLanguageUnderstanding.analyze(analyzeParams)
    .then((analysisResults) => {
      // Assign summarization results to the lecture result
      console.log(JSON.stringify(analysisResults, null, 2));
      return analysisResults.result;
    })
    .catch((err) => {
      console.log('error:', err);
      throw new Error(err);
    });

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
