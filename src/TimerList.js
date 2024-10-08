import React, { useState } from 'react';
import axios from 'axios';

const TimerList = ({ timers, fetchTimers, startTimer }) => {
    const [loadingId, setLoadingId] = useState(null);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this timer?')) {
            setLoadingId(id);
            try {
                await axios.delete(`http://localhost:5010/api/_timer/${id}`);
                fetchTimers(); 
            } catch (error) {
                console.error('Error deleting timer:', error);
                alert('An error occurred while deleting the timer.'); 
            } finally {
                setLoadingId(null); 
            }
        }
    };

    return (
        <ul className="list-group">
            {timers.map(timer => (
                <li key={timer._id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <h5>{timer.title}</h5>
                        <p>Study: {timer.studyTime} min | Break: {timer.breakTime} min</p>
                    </div>
                    <div>
                        <button className="btn btn-success" onClick={() => startTimer(timer)}>Start</button>
                        <button className="btn btn-danger" onClick={() => handleDelete(timer._id)} disabled={loadingId === timer._id}>
                            {loadingId === timer._id ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TimerList;
