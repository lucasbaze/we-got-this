import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: 'AIzaSyCSuD-_FQ3ockPsbQRsbCRgg1-lmcNsA6I',
    authDomain: 'we-got-this-d3ae2.firebaseapp.com',
    databaseURL: 'https://we-got-this-d3ae2.firebaseio.com',
    projectId: 'we-got-this-d3ae2',
    storageBucket: 'we-got-this-d3ae2.appspot.com',
    messagingSenderId: '566987245774',
    appId: '1:566987245774:web:7c72786ff32c9283a4e89f',
    measurementId: 'G-2KGS348CCJ',
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
