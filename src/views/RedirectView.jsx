import React from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import {auth, db} from "../firebase.js";
import {doc, getDoc} from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";

function Redirect() {
    const navigate = useNavigate();
    const {id} = useParams();

    function goToHome() {
        navigate('/')
    }

    const handleLogin = async () => {
        if (!auth.currentUser) {
            try {
                await signInAnonymously(auth)
                    .then(async () => {
                        await fetchAndOpen()
                    })
                    // eslint-disable-next-line no-unused-vars
                    .catch((_) => {
                        goToHome();
                    });
                // eslint-disable-next-line no-unused-vars
            } catch (_) {
                goToHome();
            }
        } else if (auth.currentUser) {
            await fetchAndOpen()
        } else {
            goToHome();
        }
    };


    const fetchAndOpen = async () => {
        const docRef = doc(db, "short_links", id);
        await getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.data().url !== "") {
                    window.location.href = docSnap.data().url
                } else {
                    console.log("unknown source");
                }
            });
    }

    return (
        <div>
            <h5>Redirecting...</h5>
            <div className="center">
                <button onClick={handleLogin} className="btn">I'm human
                </button>
            </div>
        </div>
    );
}

export default Redirect