import firebase_config from '../../firebase_config';
import firebase from 'firebase';

// Initialize Firebase
firebase.initializeApp(firebase_config);

const provider = new firebase.auth.GoogleAuthProvider();

const logIn = () => {
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

const logOut = () => {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
}

const checkAuth = () => {
    var user = firebase.auth().currentUser;
    return user ? true : false;
    // return user || false;
}

const notifyAuthStateChanged = (callback) => firebase.auth().onAuthStateChanged(callback);
// firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//         console.log('Google - Zalogowany');
//     } else {
//         console.log('Google - Nie zalogowany');
//     }
// });

export { logIn, logOut, checkAuth, notifyAuthStateChanged };