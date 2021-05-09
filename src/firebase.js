// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDmQgy_xGyb5xQFVKrv0szCLddmtAtxW1Y",
    authDomain: "clone-983ae.firebaseapp.com",
    projectId: "clone-983ae",
    storageBucket: "clone-983ae.appspot.com",
    messagingSenderId: "965106728850",
    appId: "1:965106728850:web:3d59aa0b0847e59a1b8b4b",
    measurementId: "G-V9HVPJPH17"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth= firebase.auth();

export {db, auth};