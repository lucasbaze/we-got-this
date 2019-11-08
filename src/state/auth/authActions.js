import Firebase from '../../config/firebase';
import { auth } from 'firebase';
import { service } from './authService';

let gapi = window.gapi;

export const types = {
    AUTH_START: 'AUTH_START',
    AUTH_SUCCESS: 'AUTH_SUCCESS',
    AUTH_ERROR: 'AUTH_ERROR',

    AUTH_LOGOUT: 'AUTH_LOGOUT',
};

export const actions = {
    async login(dispatch) {
        try {
            dispatch({ type: types.AUTH_START });
            const googleAuth = gapi.auth2.getAuthInstance();
            const googleUser = await googleAuth.signIn();

            const token = googleUser.getAuthResponse().id_token;
            const credential = auth.GoogleAuthProvider.credential(token);

            await Firebase.signInWithCredential(credential);
        } catch (error) {
            dispatch({ type: types.AUTH_ERROR });
        }
    },

    async getOrCreateCurrentUser(dispatch, user) {
        try {
            dispatch({ type: types.AUTH_START });

            let data = await service.getOrCreateCurrentUser(user);
            console.log(data);

            dispatch({
                type: types.AUTH_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({ type: types.AUTH_ERROR });
        }
    },

    setCurrentUser(dispatch, user) {
        let { displayName, email, photoURL } = user;
        dispatch({
            type: types.AUTH_SUCCESS,
            payload: {
                displayName,
                email,
                photoURL,
            },
        });
    },

    logout(dispatch) {
        Firebase.signOut();
        const googleAuth = gapi.auth2.getAuthInstance();
        googleAuth.signOut();
        dispatch({ type: types.AUTH_LOGOUT });
    },
};
