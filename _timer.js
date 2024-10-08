// timerRouter.js
const express = require('express');
const Timer = require('./Timer'); 

const router = express.Router();

router.post('/', async (req, res) => {
    const { title, studyTime, breakTime } = req.body;
    const timer = new Timer({ title, studyTime, breakTime });

    try {
        await timer.save();
        res.status(201).send(timer);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const timers = await Timer.find();
        res.status(200).send(timers);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const timer = await Timer.findById(id);
        if (!timer) {
            return res.status(404).send('Timer not found');
        }
        res.status(200).send(timer);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const timer = await Timer.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!timer) {
            return res.status(404).send('Timer not found');
        }
        res.status(200).send(timer);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const timer = await Timer.findByIdAndDelete(id);
        if (!timer) {
            return res.status(404).send('Timer not found');
        }
        res.status(200).send(timer);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
