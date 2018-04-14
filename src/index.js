import style from "./main.scss";
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import firebase from 'firebase';
import firebaseConfig from './components/firebase/firebase_config.js';

import { logIn, createAccount, sendVerification } from './components/firebase/authentication/traditional/auth.js';
import socialMediaLogIn from './components/firebase/authentication/social_media/auth.js';
import { logOut, checkAuth, notifyAuthStateChanged} from './components/firebase/authentication/common_auth.js';

// components can be called from the imported UIkit reference
// loads the Icon plugin
UIkit.use(Icons);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


document.querySelector('#googleLogIn').addEventListener('click', () => socialMediaLogIn('google'));
document.querySelector('#githubLogIn').addEventListener('click', () => socialMediaLogIn('github'));
document.querySelector('#facebookLogIn').addEventListener('click', () => socialMediaLogIn('facebook'));

document.querySelector('#logOut').addEventListener('click', logOut);
document.querySelector('#checkAuth').addEventListener('click', () => {
    UIkit.notification(checkAuth() ? 'Logged in' : 'Signed off');
});

/*
    TODO: implement
    logIn(userEmail, userPass)
    createAccount(userEmail, userPass)
    sendVerification()
*/

// document.querySelector('#login_field').addEventListener('click', logIn);
// document.querySelector('#logout_field').addEventListener('click', logOut);
// document.querySelector('#signUp').addEventListener('click', createAccount);
// document.querySelector('#verification_field').addEventListener('click', sendVerification);

notifyAuthStateChanged(function (user) {
    if (user) {
        console.log(user);
        UIkit.notification(`Logged in. Greetings ${user.displayName}!`);
    } else {
        UIkit.notification('Signed off.');
    }
});