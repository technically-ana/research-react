import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import {db} from "../firebase.js";
import {doc, getDoc} from "firebase/firestore";

function Redirect() {
    const navigate = useNavigate();
    const {id} = useParams();

    const [targetUrl, setTargetUrl] = useState('')

    const docRef = doc(db, "short_links", id);

    useEffect(() => {
        async function fetchData() {
            await getDoc(docRef)
                .then((docSnap) => {
                    setTargetUrl(docSnap.data().url)
                });
        }

        fetchData();
        if (targetUrl !== undefined && targetUrl !== "") window.location.href = targetUrl
    }, [docRef, targetUrl]);

    return (
        <div>
            <h5>Redirecting...</h5>
            <button onClick={() => navigate('/')} className="px-4 py-2 bg-green-500 text-white rounded-lg">Back to
                Home
            </button>
        </div>
    );
}

export default Redirect