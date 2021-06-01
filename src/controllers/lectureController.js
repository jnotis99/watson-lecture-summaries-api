import Lecture from '../models/lectureModel';
import naturalLanguageUnderstanding from '../nluutil/nlu';

export const createLecture = (req, res) => {
  const lectureInfo = req.body;
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
  naturalLanguageUnderstanding.analyze(analyzeParams)
    .then((analysisResults) => {
      // Assign summarization results to the lecture result
      // console.log(JSON.stringify(analysisResults, null, 2));
      lecture.nluOutput = analysisResults.result;
      lecture.save().then((result) => { res.json(result); });
    })
    .catch((err) => {
      console.log('error:', err);
      res.status(500).error(err);
    });
};

export const getLectures = async () => {
  // const lectures = await Lecture.find({ sort: { created_at: -1 } });
  const lectures = await Lecture.find();
  return lectures;
};

export const getLecture = async (id) => {
  const lecture = await Lecture.findById(id);
  return lecture;
};

export const deleteLecture = async (id) => {
  const result = await Lecture.deleteOne({ _id: id });
  return result;
};
