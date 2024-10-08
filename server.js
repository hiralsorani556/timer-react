const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const timerRoutes = require('./_timer');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/_timer', timerRoutes);

mongoose.connect('mongodb+srv://hiralsorani11:hiral123@cluster0.yiawr.mongodb.net/Timer')
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

app.listen(5010, () => {
    console.log("Server is listening on port 5010");
});


process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('MongoDB disconnected through app termination');
        process.exit(0);
    });
});
