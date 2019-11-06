// import firebase from '../../firebase';

// //
// // CONFIG
// //

// const db = firebase.firestore();

// //
// // Constants
// //

// export const SET_USER = 'wgt/user/set_user';
// export const LOGOUT = 'wgt/user/logout';

// //
// // Actions
// //

// export const setUser = (dispatch, user) => {
//     console.log('Setting User', user);

//     db.collection('accounts').add({
//         user,
//     });

//     dispatch({
//         type: SET_USER,
//         payload: user,
//     });
// };

// export const logout = dispatch => {
//     dispatch({
//         type: LOGOUT,
//     });
// };

// //
// // Reducer
// //
// export default function reducer(state, action) {
//     //define payload
//     let payload = action.payload;

//     switch (action.type) {
//         case SET_USER:
//             return {
//                 ...state,
//                 ...payload,
//             };

//         case LOGOUT:
//             return {
//                 ...state,
//                 user: null,
//             };
//         default:
//             return {
//                 ...state,
//             };
//     }
// }
