import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimerForm from './TimerForm';
import TimerList from './TimerList';

const App = () => {
    const [timers, setTimers] = useState([]);
    const [activeTimer, setActiveTimer] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isStudying, setIsStudying] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchTimers = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:5010/api/_timer'); 
            setTimers(response.data);
        } catch (error) {
            console.error('Error fetching timers:', error);
            setError('Could not fetch timers. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTimers();
    }, []);

    useEffect(() => {
        let timerId;

        if (isStudying && timeLeft > 0) {
            timerId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0 && activeTimer) {
            alert(isStudying ? 'Time for a break!' : 'Back to studying!');
            setIsStudying(!isStudying);
            setTimeLeft(isStudying ? activeTimer.breakTime * 60 : activeTimer.studyTime * 60);
        }

        return () => clearInterval(timerId);
    }, [isStudying, timeLeft, activeTimer]);

    const startTimer = (timer) => {
        setActiveTimer(timer);
        setTimeLeft(timer.studyTime * 60);
        setIsStudying(true);
    };

    const stopTimer = () => {
        setIsStudying(false);
        setTimeLeft(0);
        setActiveTimer(null); // Reset active timer
    };

    return (
        <div className="container">
            <h1>Study Timer & Pomodoro Tracker</h1>
            {loading && <div>Loading timers...</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            {activeTimer && (
                <div className="alert alert-info">
                    Time Left: {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}
                    <button className="btn btn-warning" onClick={stopTimer}>Stop Timer</button>
                </div>
            )}
            <TimerForm fetchTimers={fetchTimers} />
            <TimerList timers={timers} fetchTimers={fetchTimers} startTimer={startTimer} />
        </div>
    );
};

export default App;
