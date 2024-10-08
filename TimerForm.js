import React, { useState } from 'react';
import axios from 'axios';

const TimerForm = ({ fetchTimers }) => {
    const [title, setTitle] = useState('');
    const [studyTime, setStudyTime] = useState('');
    const [breakTime, setBreakTime] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!title || studyTime <= 0 || breakTime <= 0) {
            setError('Please enter valid timer details.');
            return;
        }

        try {
            await axios.post('http://localhost:5010/api/_timer', { 
                title,
                studyTime: parseInt(studyTime), 
                breakTime: parseInt(breakTime)
            });
            fetchTimers(); // Refresh the timer list
            setTitle('');
            setStudyTime('');
            setBreakTime('');
        } catch (error) {
            console.error('Error adding timer:', error);
            setError('Could not add timer. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-group">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Timer Title"
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="number"
                    value={studyTime}
                    onChange={(e) => setStudyTime(e.target.value)}
                    placeholder="Study Time (minutes)"
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="number"
                    value={breakTime}
                    onChange={(e) => setBreakTime(e.target.value)}
                    placeholder="Break Time (minutes)"
                    className="form-control"
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Add Timer</button>
        </form>
    );
};

export default TimerForm;
