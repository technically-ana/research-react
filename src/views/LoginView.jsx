import React from 'react';
import {Link, useNavigate} from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Login Page</h1>
            <button onClick={() => navigate('/about')} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Go to About</button>
            <button onClick={() => navigate('/dashboard')} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Go to Dashboard</button>
        </div>
    );
}

export default Login