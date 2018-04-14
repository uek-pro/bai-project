import style from "./main.scss";

import firebase from 'firebase';
import firebaseConfig from './components/firebase/firebase_config.js';

import { logIn, createAccount, sendVerification } from './components/firebase/authentication/traditional/auth.js';
import socialMediaLogIn from './components/firebase/authentication/social_media/auth.js';
import { logOut, checkAuth, notifyAuthStateChanged } from './components/firebase/authentication/common_auth.js';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// document.querySelector('#googleLogIn').addEventListener('click', () => socialMediaLogIn('google'));
// document.querySelector('#githubLogIn').addEventListener('click', () => socialMediaLogIn('github'));
// document.querySelector('#facebookLogIn').addEventListener('click', () => socialMediaLogIn('facebook'));

// document.querySelector('#logOut').addEventListener('click', logOut);
// document.querySelector('#checkAuth').addEventListener('click', () => {
//     console.log(checkAuth() ? 'Logged in' : 'Signed off');
// });

/*
    TODO: implement
    logIn(userEmail, userPass)
    createAccount(userEmail, userPass)
    sendVerification()
*/


let userEmail = document.getElementById('email-login-1');
let userPass = document.getElementById('password-login-1');

let userRegisterEmail = document.getElementById('email-register');
let userRegisterPass = document.getElementById('password-register1');

document.querySelector('#login_field').addEventListener('click', () => logIn(userEmail.value, userPass.value));

document.querySelector('#createAccountBtn').addEventListener('click', () => createAccount(userRegisterEmail.value, userRegisterPass.value));

// document.querySelector('#logout_field').addEventListener('click', logOut);
// document.querySelector('#verification_field').addEventListener('click', sendVerification);

notifyAuthStateChanged(function (user) {
    if (user) {
        console.log(user);
        console.log(`Logged in. Greetings ${user.displayName}!`);
    } else {
        console.log('Signed off.');
    }
});