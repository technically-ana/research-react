import React, {useEffect, useState} from 'react';
import Login from "./LoginView";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase.js";

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const listen = onAuthStateChanged(auth, (firebaseUser) => updateValues(firebaseUser))

    function updateValues(firebaseUser) {
        setIsLoggedIn(!!firebaseUser);
    }

    useEffect(() => {
        return () => {
        };
    }, [listen]);

    return (
        <div>
            {!isLoggedIn ? <Login/> :
                <div></div>}

        </div>
    );
}

export default Home