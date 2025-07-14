// Dependencies
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')

// Requiring Routes
const userRoutes = require('./routes/users');
const workoutsRoutes = require('./routes/workouts');

//Server setup
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// Database Connection
mongoose.connect('mongodb+srv://admin123:admin123@b546.xi9dchs.mongodb.net/FitnessTrackerAPI?retryWrites=true&w=majority&appName=b546')
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/users', userRoutes);
app.use('/workouts', workoutsRoutes);

// Server


if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`API is now online on port ${PORT}`);
    });
}

module.exports = { app, mongoose };