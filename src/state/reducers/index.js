//
//Import in individual reducers here
import userReducer from './userReducer';

//
//Destructure state object here
export const mainReducer = ({ user }, action) => ({
    //
    //Middleware goes here, i.e. calling analytic, etc...

    //
    //Destructure state object and define with reducer here
    user: userReducer(user, action),
});

export const initialState = {
    user: null,
};
