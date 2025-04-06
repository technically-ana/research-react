import React from 'react';
import {useNavigate} from 'react-router-dom'

function About() {
    const navigate = useNavigate();
    return (

        <div className="parent">
            <div className="center">
                <div className="column is-6">
                    <div>
                        <h1 className="title has-text-centered">Application SecuReVue</h1>

                        <div className="content">
                            <div className="center">
                                <p>This application was created on 7th of April, 2025. For educational purpose.</p>
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