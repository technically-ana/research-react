import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {auth} from "../firebase.js";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification} from "firebase/auth";

function Login() {
    const navigate = useNavigate();

    const [newUser, setNewUser] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    function goToDashboard(uidString) {
        navigate('/dashboard')
    }

    function sendEmailAndGoToDashboard(userCredentials) {
        sendEmailVerification(userCredentials.user);
        goToDashboard(userCredentials.user.uid);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        setError('');
        try {
            if (newUser) {
                await createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredentials) =>
                        sendEmailAndGoToDashboard(userCredentials)
                    )
            } else {
                await signInWithEmailAndPassword(auth, email, password)
                    .then((userCredentials) =>
                        goToDashboard(userCredentials.user.uid)
                    )
            }
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    };

    const parseError = () => {
        return error.split('/').pop()
            .replaceAll('-', ' ')
            .replaceAll('.', '')
            .replace(')', '')
    }

    return (
        <div className="parent">
            <div className="columns is-centered">
                <div className="column is-4">
                    <div>
                        <h1 className="center">Login</h1>

                        {newUser ?
                            <div className="center">
                                <a href="#" onClick={() => setNewUser(false)}>Returning User?</a>
                            </div> :
                            <div className="center">
                                <a href="#" onClick={() => setNewUser(true)}>New User?</a>
                            </div>
                        }

                        <form onSubmit={handleLogin}>
                            <div>
                                <div className="center">

                                    <div className="padded">
                                        <label className="label">Email
                                            <input
                                                value={email}
                                                type="email"
                                                placeholder="youremail@example.com"
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                size="42"
                                            /></label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="center">
                                    <div className="padded-bot">
                                        <label className="label">
                                            Password
                                            <input
                                                value={password}
                                                className="input"
                                                type="password"
                                                placeholder="********"
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                size="42"
                                            /></label>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-container center">
                                <button
                                    className="btn btn-large"
                                    type="submit">
                                    {newUser ? 'Sign Up' : 'Login'}
                                </button>
                            </div>

                        </form>
                        <div className="center">
                            <button onClick={() => navigate('/about')} className="btn">About
                            </button>
                        </div>
                        {error ? <div className="center"><p className="error-text">{parseError()}</p></div> :
                            <div className="center">{' '}</div>}
                        {isLoading ? <div className="center"><p>Loading ...</p></div> : <div></div>}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login
