import React, { useEffect } from 'react';
import { Button, SignInForm } from './components';

import { useStateValue } from './state';
import { setUser, logout } from './state/reducers/userReducer';

import firebase from './firebase';

function App() {
    const [{ user }, dispatch] = useStateValue();

    console.log(user);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            console.log(user);
            // let { displayName, email, photoURL } = user;
            // setUser(dispatch, {
            //     displayName,
            //     email,
            //     photoURL,
            // });
        });
    }, [dispatch]);

    return (
        <>
            <Button />
            <SignInForm />
            <button
                onClick={() => {
                    firebase.auth().signOut();
                    logout(dispatch);
                }}
            >
                Sign Out
            </button>
        </>
    );
}

export default App;
