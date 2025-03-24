import React from 'react';
import {useNavigate} from 'react-router-dom'

function About() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">About Page</h1>
            <button onClick={() => navigate('/')} className="px-4 py-2 bg-green-500 text-white rounded-lg">Back to Home</button>
        </div>
    );
}

export default About