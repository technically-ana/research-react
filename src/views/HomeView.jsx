import React, { useEffect, useState } from 'react';
import Login from "./LoginView";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, function (user) {
            setIsLoggedIn(!!user)
        });
        return () => {};
    }, [isLoggedIn, navigate]);

    return (
        <div>
            {!isLoggedIn ? <Login/> :
                <div></div>}

        </div>
    );
}

export default Home