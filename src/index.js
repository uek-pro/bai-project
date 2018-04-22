import style from "./main.scss";

import firebase from 'firebase';
import firebaseConfig from './components/firebase/firebase_config.js';

import { logIn, createAccount } from './components/firebase/authentication/traditional/auth.js';
import socialMediaLogIn from './components/firebase/authentication/social_media/auth.js';
import { logOut, checkAuth, notifyAuthStateChanged } from './components/firebase/authentication/common_auth.js';
import { addHabit, deleteHabit } from "./components/firebase/appdata/habits_manager";

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
const hShowNotifications = $('#show-notifications');
const hNotificationsTime = $('#notifications-time');

// PAGE: STRONA Z SUGEROWANYMI ZADANIAMI
const hSuggestedHabitsList = document.getElementById('suggested-habits-list');

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

        let lastLogged = new Date();
        firebase.database().ref(`users/${user.uid}`).update({ // firebase.auth().currentUser.uid;
            lastLogged: +lastLogged
        });

        // nasłuchiwanie na zmiany w liście zwyczajów
        firebase.database().ref(`users/${user.uid}/practices`).on('value', function (snapshot) {

            const habits = snapshot.val();
            $(hHabitsList).empty();
            if (habits != null) {
                const keys = Object.keys(habits);
                // console.log('Lista zwyczajów', habits);

                for (let i = 0; i < keys.length; i++) {
                    const el = habits[keys[i]];
                    // console.log(i, el);

                    $(hHabitsList).append(
                        `<li><a href="#">
                            <h2>${el.name}</h2>
                            <p>(${el.type}) ${el.desc} - ${el.date}</p>
                            </a><a href="#">Delete</a></li>`
                    );
                    hHabitsList.querySelectorAll('li:last-child a')[1].addEventListener('click', () => deleteHabit(keys[i]));
                }


                $(hHabitsList).listview('refresh');
            }
            else {
                $(hHabitsList).append(
                    `<p class="emptyList">Aktualnie nie posiadasz nic na swojej liście</p>`
                );
            }
        });

        // pobranie sugerowanych zadań i dodanie do listy na stronie z sugerowanymi zadaniami
        firebase.database().ref('suggestions').once('value').then(function (snapshot) {

            for (let i = 0; i < snapshot.val().length; i++) {
                const sh = snapshot.val()[i];
                $(hSuggestedHabitsList).append(
                    `<li>
                        <a href="#">
                            <h2>${sh.name}</h2>
                            <p>${sh.desc}</strong></p>
                            <p><strong>(${sh.type})</strong> ${sh.category}</p>
                        </a>
                        <a href="#">Add</a>
                    </li>`
                );
                hSuggestedHabitsList.querySelectorAll('li:last-child a')[1].addEventListener('click', () => addHabit(sh));
            };

            $(hSuggestedHabitsList).hasClass('ui-listview') ? $(hSuggestedHabitsList).listview('refresh') : $(hSuggestedHabitsList).trigger('create');
        });

        firebase.database().ref(`users/${user.uid}/settings`).once('value').then(function (snapshot) {

            console.log('Settings: ', snapshot.val());

            const ss = snapshot.val();

            const snExist = ss && typeof ss.showNotifications !== 'undefined';
            const ntExist = ss && typeof ss.notificationsTime !== 'undefined';
            const lnExist = ss && typeof ss.lastNotification !== 'undefined'; //

            hShowNotifications.val(snExist ? 1 : 0);
            hNotificationsTime.val(ntExist ? ss.notificationsTime : '21:00');

            hShowNotifications.on('change', function () {

                hShowNotifications.flipswitch('disable');
                firebase.database().ref(`users/${firebase.auth().currentUser.uid}/settings`).update({ showNotifications: this.value == 1 ? true : false });

                setTimeout(() => {
                    hShowNotifications.flipswitch('enable');
                }, 3000);
            });

            hNotificationsTime.on('blur', function () {

                firebase.database().ref(`users/${firebase.auth().currentUser.uid}/settings`).update({ notificationsTime: this.value != null ? this.value : '00:00' });
            });

            if (snExist && ss.showNotifications == true && ntExist && ss.notificationsTime <= lastLogged.toLocaleString('pl-PL', { hour: '2-digit', minute: '2-digit' })) {
                
                const d1 = new Date(+lastLogged).getDate();
                const d2 = lnExist ? new Date(ss.lastNotification).getDate() : -1;
                console.log(d1, d2);
                
                if (d1 != d2) {
                    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/settings`).update({ lastNotification: +lastLogged });

                    console.log('Powiadomienie!!11oneone');
                    // TODO: realizacja zapisanych zadań
                } else {
                    console.log('Dziś już było powiadomienie');
                }
            }
        });

    } else {
        $(hHabitsList).empty();
        $(hSuggestedHabitsList).empty();
        window.location.hash = '';
        console.log('Signed off.');
    }
});