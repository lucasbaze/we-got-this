import React from 'react';

import { useStateValue } from '../state';
import { setUser } from '../state/reducers/userReducer';

import firebase from '../firebase';

const Button = () => {
    const [{ user }, dispatch] = useStateValue();

    return (
        <button
            onClick={() => {
                var provider = new firebase.auth.GoogleAuthProvider();

                firebase
                    .auth()
                    .signInWithRedirect(provider)
                    .then(result => console.log(result));
            }}
        >
            <p>{user && user.displayName ? user.displayName : 'No one'}</p>
        </button>
    );
};

export default Button;
