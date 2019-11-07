import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//Components / Scenes
import { Navigation } from '../components';
import Calendar from './Calendar';

//Constants
import { routes } from '../constants/routes';

//State
import { useStateValue } from '../state';

//Firebase
import firebase from '../firebase';
import { auth } from 'firebase';

//
//Config
var storageRef = firebase.storage().ref();
let gapi = window.gapi;

function initGoogleClient() {
    gapi.load('client', () => {
        console.log('loaded client');
        gapi.client.init({
            apiKey: 'AIzaSyCSuD-_FQ3ockPsbQRsbCRgg1-lmcNsA6I',
            clientId:
                '566987245774-abeg79tlatngaaupsmdthc8ikouva2qo.apps.googleusercontent.com',
            discoveryDocs: [
                'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
            ],
            scope: 'https://www.googleapis.com/auth/calendar',
        });
        gapi.client.load('calendar', 'v3', () =>
            console.log('loaded calendar')
        );
    });
}

async function login() {
    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();

    const token = googleUser.getAuthResponse().id_token;

    console.log(googleUser);

    const credential = auth.GoogleAuthProvider.credential(token);

    await firebase.auth().signInWithCredential(credential);
}

function logout() {
    firebase.auth().signOut();
    const googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.signOut();
}

const Auth = () => {
    return (
        <>
            <h1>Auth</h1>{' '}
            <button
                onClick={() => {
                    login();
                }}
            >
                Sign In With Google
            </button>
        </>
    );
};

const Dashboard = () => {
    const [files, setFiles] = useState(null);

    const handleFiles = e => {
        setFiles(e.target.files);
    };

    return (
        <>
            <h1>Dashboard</h1>{' '}
            <label htmlFor="fileInput">Select Files to Upload</label>
            <input
                type="file"
                id="fileInput"
                multiple
                onChange={e => {
                    handleFiles(e);
                }}
            />
            {files !== null && (
                <button
                    onClick={() => {
                        console.log('Clicked!');
                        storageRef
                            .child('images/me')
                            .put(files[0])
                            .then(snapshot => {
                                console.log(snapshot);
                            });
                    }}
                >
                    Upload!
                </button>
            )}
        </>
    );
};

const Me = () => {
    return <h1>Me</h1>;
};

function App() {
    const [{ user }, dispatch] = useStateValue();
    const [files, setFiles] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    //Initiliaze Google API
    useEffect(() => {
        async function initLibrary() {
            await initGoogleClient();
            setIsLoading(false);
        }

        initLibrary();

        firebase.auth().onAuthStateChanged(user => {
            console.log(user);
            if (user) {
                setIsLoading(false);
            }
        });
    }, []);

    // initGoogleClient();
    // firebase.auth().onAuthStateChanged(user => {
    //     console.log(user);
    //     if (user) {
    //         setUser(user);
    //     }
    // });

    console.log(files);

    return (
        <BrowserRouter>
            <Navigation />

            <Route exact path={routes.AUTH} component={Auth} />
            <Route path={routes.HOME} component={Dashboard} />
            <Route path={routes.ME} component={Me} />
            <Route path={routes.CALENDAR} component={Calendar} />
            <button
                onClick={() => {
                    logout();
                }}
            >
                Sign Out
            </button>
        </BrowserRouter>
    );
}

export default App;
