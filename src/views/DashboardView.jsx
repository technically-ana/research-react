import { useNavigate, useParams } from "react-router-dom";
import React, {useEffect, useState} from "react";
import {auth, db} from "../firebase.js";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {collection, addDoc, query, where, getDocs} from "firebase/firestore";

function Dashboard() {
    const navigate = useNavigate();

    const {id} = useParams();

    const dbPath = "short_links"

    const [uid, setUid] = useState('');
    const [longLink, setLongLink] = useState('');
    const [longLinkTitle, setLongLinkTitle] = useState('');
    const [userLinks, setUserLinks] = useState(null);
    // const [errorMessage, setErrorMessage] = useState('');

    const baseUrl = () => {
        let base = process.env.REACT_APP_URL
        return base + 'r/'
    };

    const listen = onAuthStateChanged(auth, function (user) {
        console.log('[25] Listening... ')
        if(user) {
            console.log('[27] Listening... user. uid ' + user.uid)
            setUid(user.uid)
            console.log('[29] Listening... uid ' + uid)
        }
        console.log('[31] Listening...  uid !== ""' + (uid !== ""))
        console.log('[32] Listening...  uid !== id' + (uid !== id))
        console.log('[33] Listening...  !userLinks' + (!userLinks))
        console.log('[35] Listening...  uid !== id ' + (uid !== id))
        console.log('[36] Listening...  id ' + (id))
        console.log('[36] Listening...  !user ' + (!user))

        if (!user || uid !== id ) {
            goToHome()
        }
        if (uid !== "" && uid === id && !userLinks) {
            getAllLinksForUser()
        }
    });

    useEffect(() => {
        // listen()
        console.log('Listening effect... ')
        // if (uid === "" || uid === undefined) {
        //     goToHome()
        // }

        return () => {
            listen()
        };
    }, [listen]);

    const getAllLinksForUser = async () => {
        const q = query(collection(db, dbPath), where("owner", "==", uid));
        const querySnapshot = await getDocs(q);
        let userLinksList = []
        querySnapshot.forEach((doc) => {
            let link = {}
            link['id'] = doc.id
            link['data'] = doc.data()
            userLinksList.push(link)
        });
        setUserLinks(userLinksList);
    }

    async function createShortLink() {
        await addDoc(collection(db, dbPath), {
            owner: uid,
            link_title: longLinkTitle,
            url: longLink,
        });
        setLongLink('');
        await getAllLinksForUser()
    }

    function ListOfLinks() {
        return (
            <div>
                {userLinks &&
                    userLinks.map(({id, data}) => {
                        return (
                            <div>
                                <div className="center">
                                    <h5>{data.link_title}</h5>
                                </div>
                                <div className="center">
                                    <button
                                        className="btn-link"
                                        onClick={() => {
                                            navigator.clipboard.writeText(baseUrl() + id)
                                        }}>
                                        {baseUrl() + id}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </div>
        );
    }


    const handleSignOut = () => {
        signOut(auth).then(() => goToHome())
    }

    function goToHome() {
        navigate('/')
    }

    return (
        <div className="parent">
            <div className="center padded-bot">
                <button className="btn btn-large" onClick={handleSignOut}> Logout</button>
            </div>

            <div className="padded center">
                <label className="label">Name your link
                    <input
                        value={longLinkTitle}
                        placeholder="Title"
                        onChange={(e) => setLongLinkTitle(e.target.value)}
                        size="42"
                    /></label>
            </div>

            <div className="padded-bot center">
                <label className="label">
                    Paste your link here
                    <textarea
                        rows="7"
                        value={longLink}
                        className="input"
                        onChange={(e) => setLongLink(e.target.value)}
                    /></label>
            </div>
            <div className="padded center">
                <button onClick={createShortLink} className="btn">Create Short Link</button>
            </div>

            <ListOfLinks/>
        </div>
    );
}

export default Dashboard