import React, { useEffect, useState } from 'react';
import Login from "./LoginView";
import {onAuthStateChanged, signOut} from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function goToHome() {
        navigate('/')
    }

    const handleSignOut = () => {
        signOut(auth).then(() => goToHome())
    }

    useEffect(() => {
        onAuthStateChanged(auth, function (user) {
            setIsLoggedIn(!!user)
        });
        return () => {};
    }, [isLoggedIn, navigate]);

    return (
        <div>
            {!isLoggedIn ? <Login/> :
                <div>
                    <button className="btn btn-large" onClick={handleSignOut}>To Login</button>
                </div>}
        </div>
    );
}

export default Home