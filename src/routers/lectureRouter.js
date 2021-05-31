import * as Lectures from '../controllers/lectureController';

const express = require('express');

const router = express.Router();

// /api/lectures route: create a new lecture (post), get all lectures (get)
router.route('/')
  .post(async (req, res) => {
    try {
      const newLecture = await Lectures.createLecture(req.body);
      res.json(newLecture);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  })
  .get(async (_req, res) => {
    try {
      const lectures = await Lectures.getLectures();
      res.json(lectures);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  });

router.route('/:id')
  .get(async (req, res) => {
    try {
      const lecture = await Lectures.getLecture(req.params.id);
      res.json(lecture);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  });

module.exports = router;
// export default router;
