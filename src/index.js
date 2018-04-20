import style from "./main.scss";

import firebase from 'firebase';
import firebaseConfig from './components/firebase/firebase_config.js';

import { logIn, createAccount } from './components/firebase/authentication/traditional/auth.js';
import socialMediaLogIn from './components/firebase/authentication/social_media/auth.js';
import { logOut, checkAuth, notifyAuthStateChanged } from './components/firebase/authentication/common_auth.js';
import { addHabit } from "./components/firebase/appdata/habits_manager";

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


// PAGE: LOGOWANIE (STRONA GŁÓWNA)
// PAGE: REJESTRACJA [OKNO MODALNE]
// PAGE: STRONA Z LISTĄ ZADAŃ [PODSTRONA]
// PAGE: STRONA GLOBALNEGO PODSUMOWANIA [PODSTRONA]
// PAGE: STRONA USTAWIEŃ [PODSTRONA]
// PAGE: STRONA Z SUGEROWANYMI ZADANIAMI
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
            const keys = Object.keys(habits);
            console.log('Lista zwyczajów', habits);

            const hHabitsList = document.getElementById('habitsList');
            $(hHabitsList).empty();
            for (let i = 0; i < keys.length; i++) {
                const el = habits[keys[i]];
                console.log(i, el);

                $(hHabitsList).append(
                    `<li class="ui-body-inherit ui-li-static">
                        <p><strong>Data:</strong> ${el.date}</p>
                        <p><strong>Tytuł:</strong> ${el.name}</p>
                        <p><strong>Opis:</strong> ${el.desc}</p>
                        <p><strong>Type:</strong> ${el.type}</p>
                        <div class="controls">
                            <a href="#">Edit</a> | <a href="#">Delete</a>
                        </div>
                    </li>`
                );
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
        window.location.hash = '';
        console.log('Signed off.');
    }
});