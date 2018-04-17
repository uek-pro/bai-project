import style from "./main.scss";

import firebase from 'firebase';
import firebaseConfig from './components/firebase/firebase_config.js';

import { logIn, createAccount } from './components/firebase/authentication/traditional/auth.js';
import socialMediaLogIn from './components/firebase/authentication/social_media/auth.js';
import { logOut, checkAuth, notifyAuthStateChanged } from './components/firebase/authentication/common_auth.js';
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


let userEmail = document.getElementById('email-login-1');
let userPass = document.getElementById('password-login-1');

let userRegisterEmail = document.getElementById('email-register');
let userRegisterPass = document.getElementById('password-register1');

const hSuggestedHabits = document.getElementById('suggested-habits');

document.querySelector('#login_field').addEventListener('click', () => logIn(userEmail.value, userPass.value));
document.querySelector('#createAccountBtn').addEventListener('click', () => createAccount(userRegisterEmail.value, userRegisterPass.value));

document.querySelector('#btnLogOut').addEventListener('click', logOut);
document.querySelector('#btnGoogleLogIn').addEventListener('click', () => socialMediaLogIn('google'));
document.querySelector('#btnGitHubLogIn').addEventListener('click', () => socialMediaLogIn('github'));
document.querySelector('#btnFacebookLogIn').addEventListener('click', () => socialMediaLogIn('facebook'));

notifyAuthStateChanged(function (user) {
    if (user) {
        window.location.hash = 'habitsListPage';
        console.log(`Logged in. Greetings ${user.displayName}!`);

        // firebase.database().ref(`users/${user.uid}`).set({ // firebase.auth().currentUser.uid;
        //     test: true
        // });

        firebase.database().ref('suggestions').once('value').then(function (snapshot) {

            for (let i = 0; i < snapshot.val().length; i++) {
                const sh = snapshot.val()[i];
                $(hSuggestedHabits).append(
                    `<p>T${sh.type} - <strong>${sh.name}</strong> ${sh.desc}, ${sh.category}</p>`
                );
            };
        });

    } else {
        window.location.hash = '';
        console.log('Signed off.');
    }
});