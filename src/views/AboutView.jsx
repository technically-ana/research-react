import React from 'react';
import {useNavigate} from 'react-router-dom'

function About() {
    const navigate = useNavigate();
    return (

        <div className="parent">
            <div className="center">
                <div className="column is-6">
                    <div>
                        <h1 className="title has-text-centered">About the App</h1>

                        <div className="content">
                            <div className="center">
                                <p>This application is for educational purpose.</p>
                            </div>
                            <div className="center">
                                <p className="has-text-centered is-size-4 has-text-weight-bold my-5">
                                    {(new Date()).toISOString()}
                                </p>
                            </div>

                            <div className="has-text-centered mt-5 center">
                                <button onClick={() => navigate('/')} className="btn btn-container">
                                    <span>Back</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About