/**
 * lectureController.js - handle all operations for the Lecture Schema
 *
 * Louis Murerwa and Joseph Notis, Spring 2021
 */
import Lecture from '../models/lectureModel';
import watsonNLU from '../utils/nlu';

// Whereas most files we handle req, res in the router, we handle it in the controller for this function
// This helps us nest async calls for getting NLU output, then saving the data to MongoDB
export const createLecture = (req, res) => {
  const lectureInfo = req.body;
  const lecture = new Lecture();
  lecture.title = lectureInfo.title;
  lecture.text = lectureInfo.text;

  // Get NLU output here
  // NLU Params defining the objective of the NLU call
  // in this instance semantic_roles, summarization (experimental), and concepts
  const analyzeParams = {
    text: lecture.text,
    features: {
      summarization: {
        limit: 4,
      },
      concepts: {},
      semantic_roles: {},
    },
  };

  // NLU call
  watsonNLU.naturalLanguageUnderstanding.analyze(analyzeParams)
    .then((analysisResults) => {
      // Assign summarization results to the lecture result
      lecture.nluOutput = analysisResults.result;
      // Save to Mongo DB
      lecture.save().then((result) => {
        res.json(result);
      }).catch((error) => {
        res.status(500).error(error);
      });
    })
    .catch((err) => {
      console.log('error:', err);
      res.status(500).error(err);
    });
};

export const getLectures = async () => {
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
