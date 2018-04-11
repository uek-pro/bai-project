import firebase_config from '../../firebase_config';
import firebase from 'firebase';

// Initialize Firebase
firebase.initializeApp(firebase_config);

const chooseSocialMediaProvider = (media) => {

    switch (media) {
        case 'google': return new firebase.auth.GoogleAuthProvider();
        case 'github': return new firebase.auth.GithubAuthProvider();
        case 'twitter':
        case 'facebook':
        default:
            break;
        return null;
    }
};

const logIn = (media) => {
    const provider = chooseSocialMediaProvider(media);
    if (provider === null) return false;
    
    firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        // console.log('user: ', user);
        console.log('token: ', token);
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
    });
};

const logOut = () => {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
};

const checkAuth = () => {
    var user = firebase.auth().currentUser;
    return user ? true : false;
    // return user || false;
};

const notifyAuthStateChanged = (callback) => firebase.auth().onAuthStateChanged(callback);
// firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//         console.log('Google - Zalogowany');
//     } else {
//         console.log('Google - Nie zalogowany');
//     }
// });

export { logIn, logOut, checkAuth, notifyAuthStateChanged };