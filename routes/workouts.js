const express = require('express');
const workoutController = require('../controllers/workouts');
const { verify } = require("../auth");

const router = express.Router();

// Protected routes (all require authentication)
router.post('/addWorkout', verify, workoutController.addWorkout);
router.get('/getMyWorkouts', verify, workoutController.getMyWorkouts);
router.get('/:workoutId', verify, workoutController.getSpecificWorkout);
router.patch('/updateWorkout/:workoutId', verify, workoutController.updateWorkout);
router.delete('/deleteWorkout/:workoutId', verify, workoutController.deleteWorkout);
router.patch('/completeWorkoutStatus/:workoutId', verify, workoutController.completeWorkoutStatus);

module.exports = router;