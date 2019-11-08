//
//Import in individual reducers here
import authReducer, { authState } from '../auth/authReducer';

//
//Destructure state object here
export const mainReducer = ({ auth }, action) => {
    console.log('Auth state', auth, 'Auth Action', action);
    return {
        //
        //Middleware goes here, i.e. calling analytic, etc...

        //
        //Destructure state object and define with reducer here
        auth: authReducer(auth, action),
    };
};

export const initialState = {
    auth: authState,
};
