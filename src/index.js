import style from "./main.scss";

import firebase from 'firebase';
import firebaseConfig from './components/firebase/firebase_config.js';

import { logIn, createAccount } from './components/firebase/authentication/traditional/auth.js';
import socialMediaLogIn from './components/firebase/authentication/social_media/auth.js';
import { logOut, checkAuth, notifyAuthStateChanged } from './components/firebase/authentication/common_auth.js';
import { addHabit } from "./components/firebase/appdata/habits_manager";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// PAGE: LOGOWANIE (STRONA GŁÓWNA)
let userEmail = document.getElementById('email-login-1');
let userPass = document.getElementById('password-login-1');
document.querySelector('#login_field').addEventListener('click', () => logIn(userEmail.value, userPass.value));

document.querySelector('#btnGoogleLogIn').addEventListener('click', () => socialMediaLogIn('google'));
document.querySelector('#btnGitHubLogIn').addEventListener('click', () => socialMediaLogIn('github'));
document.querySelector('#btnFacebookLogIn').addEventListener('click', () => socialMediaLogIn('facebook'));

// PAGE: REJESTRACJA [OKNO MODALNE]
let userRegisterEmail = document.getElementById('email-register');
let userRegisterPass = document.getElementById('password-register1');
document.querySelector('#createAccountBtn').addEventListener('click', () => createAccount(userRegisterEmail.value, userRegisterPass.value));

// PAGE: STRONA Z LISTĄ ZADAŃ [PODSTRONA]
const hHabitsList = document.getElementById('habitsList');

// PAGE: STRONA GLOBALNEGO PODSUMOWANIA [PODSTRONA]

// PAGE: STRONA USTAWIEŃ [PODSTRONA]
document.querySelector('#btnLogOut').addEventListener('click', logOut);

// PAGE: STRONA Z SUGEROWANYMI ZADANIAMI
const hSuggestedHabits = document.getElementById('suggested-habits');

// PAGE: STRONA DODAWANIA ZADANIA
const mhTitle = document.getElementById('manageHabit-title');
const mhDescription = document.getElementById('manageHabit-description');
const mhType = document.getElementById('manageHabit-type');

const mhOptimalValue = document.getElementById('manageHabit-optimal-value');
const mhAuthor = document.getElementById('manageHabit-author');
// TODO: + słowniczek

document.getElementById('manageHabit-add-btn').addEventListener('click', () => {

    const habitType = +mhType.value;
    if (habitType >= 0 && habitType < 4) {

        const habit = {
            name: mhTitle.value,
            desc: mhDescription.value,
            type: habitType
        }

        if (habitType == 1) {
            habit.optimal = +mhOptimalValue.value;
        } else if (habitType == 2) {
            habit.author = mhAuthor.value
        } else {
            // TODO: słowniczek
        }

        addHabit(habit);
    }
});

// PAGE: ? STRONA EDYCJI ZADANIA ?
// PAGE: TODO: STRONA WIDOKU POJEDYNCZEGO ZADANIA
// PAGE: STRONA REALIZACJI ZADANIA [ODPALANA AUTOMATYCZNIE O OKREŚLONEJ PORZE]


notifyAuthStateChanged(function (user) {
    if (user) {
        window.location.hash = 'habitsListPage';
        console.log(`Logged in. Greetings ${user.displayName}!`);

        firebase.database().ref(`users/${user.uid}`).update({ // firebase.auth().currentUser.uid;
            lastLogged: +new Date()
        });

        // nasłuchiwanie na zmiany w liście zwyczajów
        firebase.database().ref(`users/${user.uid}/practices`).on('value', function (snapshot) {

            const habits = snapshot.val();
            if (habits != null) {
                const keys = Object.keys(habits);
                console.log('Lista zwyczajów', habits);

                $(hHabitsList).empty();
                for (let i = 0; i < keys.length; i++) {
                    const el = habits[keys[i]];
                    console.log(i, el);

                    $(hHabitsList).append(
                        `<li><a href="#">
                            <h2>${el.name}</h2>
                            <p>(${el.type}) ${el.desc} - ${el.date}</p>
                        </a><a href="#">Delete</a></li>`
                    );
                }
                $(hHabitsList).listview('refresh');
            }
        });

        // pobranie sugerowanych zadań i dodanie do listy na stronie z sugerowanymi zadaniami
        firebase.database().ref('suggestions').once('value').then(function (snapshot) {

            for (let i = 0; i < snapshot.val().length; i++) {
                const sh = snapshot.val()[i];
                $(hSuggestedHabits).append(
                    `<p>T${sh.type} - <strong>${sh.name}</strong> ${sh.desc}, ${sh.category}</p>`
                );
            };
        });

    } else {
        $(hHabitsList).empty();
        $(hSuggestedHabits).empty();
        window.location.hash = '';
        console.log('Signed off.');
    }
});