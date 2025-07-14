const Workout = require('../models/Workout');
const auth = require('../auth');

// Add a new workout
module.exports.addWorkout = (req, res) => {
    const newWorkout = new Workout({
        userId: req.user.id,
        name: req.body.name,
        duration: req.body.duration
    });

    newWorkout.save()
        .then(workout => {
            res.status(201).send(workout);
        })
        .catch(error => auth.errorHandler(error, req, res));
};

// Get all workouts for the logged-in user
module.exports.getMyWorkouts = (req, res) => {
    Workout.find({ userId: req.user.id })
        .sort({ dateAdded: -1 })
        .then(workouts => {
            if (!workouts || workouts.length === 0) {
                return res.status(200).send({ workouts: [] });
            }
            res.status(200).send({ workouts: workouts });
        })
        .catch(error => auth.errorHandler(error, req, res));
};

// Get a specific workout
module.exports.getSpecificWorkout = (req, res) => {
    Workout.findOne({ 
        _id: req.params.workoutId,
        userId: req.user.id
    })
    .then(workout => {
        if (!workout) {
            return res.status(404).send({ message: 'Workout not found' });
        }
        res.status(200).send(workout);
    })
    .catch(error => auth.errorHandler(error, req, res));
};

// Update a workout
module.exports.updateWorkout = (req, res) => {
    const workoutId = req.params.workoutId;
    const { name, duration } = req.body;

    // Only allow the user to update their own workouts
    Workout.findOneAndUpdate(
        { _id: workoutId, userId: req.user.id },
        { name, duration },
        { new: true }
    )
    .then(updatedWorkout => {
        if (!updatedWorkout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        return res.status(200).json({
            message: 'Workout updated successfully',
            updatedWorkout: {
                _id: updatedWorkout._id,
                userId: updatedWorkout.userId,
                name: updatedWorkout.name,
                duration: updatedWorkout.duration,
                status: updatedWorkout.status,
                dateAdded: updatedWorkout.dateAdded,
                __v: updatedWorkout.__v
            }
        });
    })
    .catch(error => auth.errorHandler(error, req, res));
};

// Delete a workout
module.exports.deleteWorkout = (req, res) => {
    const workoutId = req.params.workoutId;

    //
    Workout.findOneAndDelete({ _id: workoutId, userId: req.user.id })
    .then(deletedWorkout => {
        if (!deletedWorkout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.status(200).json({ message: 'Workout deleted successfully' });
    })
    .catch(error => auth.errorHandler(error, req, res));
};

// Mark workout as completed
module.exports.completeWorkoutStatus = (req, res) => {
    const workoutId = req.params.workoutId;

    // Only allow the user to update their own workouts
    Workout.findOneAndUpdate(
        { _id: workoutId, userId: req.user.id },
        { status: 'completed' }, 
        { new: true }
    )
    .then(updatedWorkout => {
        if (!updatedWorkout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        return res.status(200).json({
            message: 'Workout status updated successfully',
            updatedWorkout: {
                _id: updatedWorkout._id,
                userId: updatedWorkout.userId,
                name: updatedWorkout.name,
                duration: updatedWorkout.duration,
                status: updatedWorkout.status,
                dateAdded: updatedWorkout.dateAdded,
                __v: updatedWorkout.__v
            }
        });
    })
    .catch(error => auth.errorHandler(error, req, res));
};