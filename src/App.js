import React, { useState, useEffect } from 'react';
//import { Button, SignInForm } from './components';

// import { useStateValue } from './state';
//import { setUser, logout } from './state/reducers/userReducer';

//import firebase from './firebase';
import firebase, { auth } from 'firebase';

var config = {
    apiKey: 'AIzaSyCSuD-_FQ3ockPsbQRsbCRgg1-lmcNsA6I',
    authDomain: 'we-got-this-d3ae2.firebaseapp.com',
    databaseURL: 'https://we-got-this-d3ae2.firebaseio.com',
    projectId: 'we-got-this-d3ae2',
    storageBucket: 'we-got-this-d3ae2.appspot.com',
    messagingSenderId: '566987245774',
    appId: '1:566987245774:web:7c72786ff32c9283a4e89f',
    clientId:
        '566987245774-abeg79tlatngaaupsmdthc8ikouva2qo.apps.googleusercontent.com',
    scopes: ['email', 'profile', 'https://www.googleapis.com/auth/calendar'],
    discoveryDocs: [
        'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
    ],
    measurementId: 'G-2KGS348CCJ',
};

firebase.initializeApp(config);
var storageRef = firebase.storage().ref();

let gapi = window.gapi;

function initClient() {
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

async function getCalendar() {
    const events = await gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime',
    });

    console.log(events);
    console.log(events.result.items);

    const list = await gapi.client.calendar.calendarList.list({
        maxResults: 10,
    });

    console.log(list);
    console.log(list.result.items);
}

async function insertEvent() {
    const insert = await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        start: {
            dateTime: hoursFromNow(2),
            timeZone: 'America/Chicago',
        },
        end: {
            dateTime: hoursFromNow(3),
            timeZone: 'America/Chicago',
        },
        summary: 'Have Fun!!',
        description: 'Enjoy a nice little break :)',
    });

    await getCalendar();
}

function hoursFromNow(n) {
    return new Date(Date.now() + n * 1000 * 60 * 60).toISOString();
}

function App() {
    // const [{ user }, dispatch] = useStateValue();
    const [user, setUser] = useState(null);
    const [files, setFiles] = useState(null);

    useEffect(() => {
        initClient();
        firebase.auth().onAuthStateChanged(user => {
            console.log(user);
            if (user) {
                setUser(user);
            }
        });
    }, []);

    console.log(files);

    const handleFiles = e => {
        setFiles(e.target.files);
    };

    return (
        <>
            <button
                onClick={() => {
                    login();
                }}
            >
                Sign In With Google
            </button>
            <button
                onClick={() => {
                    getCalendar();
                }}
            >
                Get Calendar
            </button>
            <button
                onClick={() => {
                    insertEvent();
                }}
            >
                Insert Event
            </button>
            <button
                onClick={() => {
                    logout();
                }}
            >
                Sign Out
            </button>
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
}

export default App;
