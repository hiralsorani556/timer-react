const mongoose = require('mongoose');

const timerSchema = new mongoose.Schema({
   title: { type: String, required: true },
   studyTime: { type: Number, required: true }, // Time in minutes
   breakTime: { type: Number, required: true }, // Time in minutes
   completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Timer', timerSchema);
