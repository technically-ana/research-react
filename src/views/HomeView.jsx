import React from 'react';
import Login from "./LoginView";

function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-6">Welcome to Home</h1>
            <Login />
        </div>
    );
}

export default Home