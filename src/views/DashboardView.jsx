import { useNavigate, useParams } from "react-router-dom";
import React, {useEffect, useState} from "react";
import {auth, db} from "../firebase.js";
import { signOut } from "firebase/auth";
import {collection, addDoc, query, where, getDocs} from "firebase/firestore";

function Dashboard() {
    const navigate = useNavigate();

    const {id} = useParams();

    const dbPath = "short_links"

    const [uid, setUid] = useState('');
    const [longLink, setLongLink] = useState('');
    const [longLinkTitle, setLongLinkTitle] = useState('');
    const [userLinks, setUserLinks] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const baseUrl = () => {
        let base = process.env.REACT_APP_URL
        return base + 'r/'
    };

    const validateURL = (e) => {
        const value = e;
        setLongLink(value);
        try {
            const u = new URL(value);
            if (['https:'].includes(u.protocol)) setErrorMessage('')
            else setErrorMessage('The link is incorrect or insecure');
        } catch {
            setErrorMessage('The link is incorrect or insecure');
        }
    };

    useEffect(() => {
        const currentUser = auth.currentUser;
        if(currentUser) {
            setUid(currentUser.uid)
        }
        if (!currentUser || currentUser.uid !== id ) {
            goToHome()
        }
        return () => {
        };
    }, [goToHome, id, uid]);

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
        if (uid !== "" && uid === id && !userLinks) {
            getAllLinksForUser()
        }
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
                <button className="btn btn-large" onClick={handleSignOut}> Log out</button>
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
                        onChange={(e) => validateURL(e.target.value)}
                    /></label>
            </div>
            <div className="padded center">
                <button onClick={createShortLink} disabled={errorMessage !== ''} className="btn">Create Short Link
                </button>
            </div>

            <div className="center">
                { errorMessage !== '' ?
                    <p style={{ color: 'red' }}> { errorMessage } </p> :
                    <p>Click on the link to copy</p>}
            </div>

            <ListOfLinks/>
        </div>
    );
}

export default Dashboard