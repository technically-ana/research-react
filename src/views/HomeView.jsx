import React, {useEffect, useState} from 'react';
import Login from "./LoginView";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase.js";
import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        return () => {
            onAuthStateChanged(auth, function (user) {
                setIsLoggedIn(!!user)
                if (isLoggedIn) navigate(`/dashboard/${user.uid}`)
            });
        };
    }, [isLoggedIn, navigate]);

    return (
        <div>
            {!isLoggedIn ? <Login/> :
                <div></div>}

        </div>
    );
}

export default Home