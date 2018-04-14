import style from "./main.scss";

import firebase from 'firebase';
import firebaseConfig from './components/firebase/firebase_config.js';

import {
    logIn,
    createAccount,
    sendVerification
} from './components/firebase/authentication/traditional/auth.js';
import socialMediaLogIn from './components/firebase/authentication/social_media/auth.js';
import {
    logOut,
    checkAuth,
    notifyAuthStateChanged
} from './components/firebase/authentication/common_auth.js';

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
document.querySelector('#sendVerificationMail').addEventListener('click', sendVerification);



//Kiedy uzytkownik kliknie w przycisk zaloguj przeniesie go na stronke, dodatkowo kiedy jest zalogowany?? ale chyba bedzie przekierowywalo
// za kazdym razem na kazdej podstronie 
$('#login_field').click(function () {
    notifyAuthStateChanged(function (user) {
        if (user) {
            window.location.href = "#mainPage";
            console.log(user);
            console.log(`Logged in. Greetings ${user.displayName}!`);
        } else {
            console.log('Signed off.');
        }
    });
});

//do rejestracji propozycja podzielilem to zeby bylo czytelne, w jednej metodzie to wszystko lepiej zapisac o ile pomysl dobry
notifyAuthStateChanged(function (user) {
    if (user) {
        document.getElementById("sendVerificationMail").style.display = 'block';
        document.getElementById("createAccountBtn").style.display = 'none';
    } else {

        document.getElementById("sendVerificationMail").style.display = 'none'
        document.getElementById("createAccountBtn").style.display = 'block';;

        console.log('Signed off.');
    }
});