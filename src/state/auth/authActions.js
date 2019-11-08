import Firebase from '../../config/firebase';
import { auth } from 'firebase';
let gapi = window.gapi;

const db = Firebase.getFirestore();

export const types = {
    AUTH_START: 'AUTH_START',
    AUTH_SUCCESS: 'AUTH_SUCCESS',
    AUTH_ERROR: 'AUTH_ERROR',
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
        let { email, displayName, photoURL } = user;
        try {
            await db
                .collection('users')
                .where('email', '==', 'lucas@lucas.com')
                .get()
                .then(querySnapShot => {
                    if (!querySnapShot.empty) {
                        //Set the user data to global State
                        querySnapShot.forEach(doc => {
                            console.log('Got User. Setting to State');
                            dispatch({
                                type: types.AUTH_SUCCESS,
                                payload: doc.data(),
                            });
                        });
                    } else {
                        //Create a new user
                        db.collection('users')
                            .add({
                                email,
                                displayName,
                                photoURL,
                            })
                            .then(docRef => {
                                //Get that user and set to global state.
                                docRef.get().then(doc => {
                                    dispatch({
                                        type: types.AUTH_SUCCESS,
                                        payload: doc.data(),
                                    });
                                });
                            });
                    }
                    console.log(querySnapShot.empty);
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

    logout() {
        Firebase.signOut();
        const googleAuth = gapi.auth2.getAuthInstance();
        googleAuth.signOut();
    },
};
