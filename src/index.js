import style from "./main.scss";

import firebase from 'firebase';
import firebaseConfig from './components/firebase/firebase_config.js';
import chart from 'chart.js';
import chartAnnotation from 'chartjs-plugin-annotation';

import { logIn, createAccount } from './components/firebase/authentication/traditional/auth.js';
import socialMediaLogIn from './components/firebase/authentication/social_media/auth.js';
import { logOut, checkAuth, notifyAuthStateChanged } from './components/firebase/authentication/common_auth.js';
import { addHabit, deleteHabit } from "./components/firebase/appdata/habits_manager";
import { createDoughnutChart, createLineChart } from './components/chart/charts';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// PAGE: LOGOWANIE (STRONA GŁÓWNA)
const userEmail = document.getElementById('email-login');
const userPass = document.getElementById('password-login');
document.querySelector('#btnLogin').addEventListener('click', () => logIn(userEmail.value, userPass.value));
document.querySelector('#btnGoogleLogIn').addEventListener('click', () => socialMediaLogIn('google'));
document.querySelector('#btnGitHubLogIn').addEventListener('click', () => socialMediaLogIn('github'));
document.querySelector('#btnFacebookLogIn').addEventListener('click', () => socialMediaLogIn('facebook'));

// PAGE: REJESTRACJA [OKNO MODALNE]
const userRegisterEmail = document.getElementById('email-register');
const userRegisterPass = document.getElementById('password-register');
const userRegisterPass2 = document.getElementById('password-register-repeat');
document.querySelector('#btnCreateAccount').addEventListener('click', () => createAccount(userRegisterEmail.value, userRegisterPass.value, userRegisterPass2.value));

// Skrypt obsługi podstron
$('a[data-podstrona=true]').each(function () {
    const anchor = $(this);
    anchor.on('tap', function () {
        $.mobile.changePage(anchor.attr('href'), {
            transition: 'none',
            changeHash: false
        });
        return false;
    });
});

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

$('.habit-type').on('tap', function () {
    if ($(this).hasClass('ui-btn-active')) {
        console.log('tab jest już aktywny');
    } else {
        console.log(`zmiana aktywnego tab'a (${this.attributes['data-habit'].textContent})`);
        mhType.value = this.attributes['data-habit'].value;
    }
});

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

// PAGE: STRONA WIDOKU POJEDYNCZEGO ZADANIA
const hdMain = document.getElementById('hdMain');
const begChart = document.getElementById('beginningPreview').getContext('2d');
const l2wChart = document.getElementById('last2weeksPreview').getContext('2d');
const avaChart = document.getElementById('areaPreview').getContext('2d');

let storeHabitDetails = {};

const showDetailsPage = (habit) => {
    storeHabitDetails = habit;
    $.mobile.changePage('#habitDetailsPage', { transition: 'pop' });
}

$(document).on('pagebeforeshow', '#habitDetailsPage', function (event, data) {

    console.log(storeHabitDetails);
    hdMain.textContent = storeHabitDetails.desc ? storeHabitDetails.desc : storeHabitDetails.name;

    createDoughnutChart(begChart, 12, 3, 5);
    createDoughnutChart(l2wChart, 8, 1);

    createLineChart(avaChart, 5, [10, 11, 12, 13, 14, 15, 16 ], [3, 2, 9, 6, 0, 5, 7]);
});

// PAGE: STRONA REALIZACJI ZADANIA [ODPALANA AUTOMATYCZNIE O OKREŚLONEJ PORZE]


notifyAuthStateChanged(function (user) {
    if (user) {
        window.location.hash = 'habitsListPage';
        console.log(`Logged in. Greetings ${user.displayName}!`);

        let lastLogged = new Date();
        firebase.database().ref(`users/${user.uid}`).update({
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
                        `<li>
                            <a href="#">
                                <h2>${el.name}</h2>
                                <p>(${el.type}) ${el.desc} - ${el.date}</p>
                            </a>
                            <a href="#">Delete</a>
                        </li>`
                    );
                    el.type != 2 ? hHabitsList.querySelectorAll('li:last-child a')[0].addEventListener('click', () => showDetailsPage(el)) : null;
                    hHabitsList.querySelectorAll('li:last-child a')[1].addEventListener('click', () => deleteHabit(keys[i]));
                }
                $(hHabitsList).listview('refresh');
            }
            else {
                $(hHabitsList).append('<p class="empty">Brak zwyczajów</p>');
            }
        });

        // pobranie sugerowanych zadań i dodanie do listy na stronie z sugerowanymi zadaniami
        firebase.database().ref('suggestions').once('value').then(function (snapshot) {

            for (let i = 0; i < snapshot.val().length; i++) {
                const sh = snapshot.val()[i];
                $(hSuggestedHabitsList).append(
                    `<li data-type="${sh.type}">
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

            // filtrowanie po typie zadania
            const $suggestedHabits = $('#suggested-habits-list li');
            $('#habit-type-select').change(function () {
                const habitType = this.options[this.selectedIndex].value;
                $suggestedHabits.hide().filter(function () {
                    const t = $(this).data('type');
                    return habitType == -1 || t == habitType;
                }).show();
            });
        });

        firebase.database().ref(`users/${user.uid}/settings`).once('value').then(function (snapshot) {

            const ss = snapshot.val();
            console.log('Settings: ', ss);
            const snExist = ss && typeof ss.showNotifications !== 'undefined';
            const ntExist = ss && typeof ss.notificationsTime !== 'undefined';
            const lnExist = ss && typeof ss.lastNotification !== 'undefined'; //

            hShowNotifications.val(snExist ? 1 : 0);
            hNotificationsTime.val(ntExist ? ss.notificationsTime : '21:00');

            hShowNotifications.on('change', function () {

                hShowNotifications.flipswitch('disable');
                firebase.database().ref(`users/${firebase.auth().currentUser.uid}/settings`).update({ showNotifications: this.value == 1 ? true : false });

                setTimeout(() => { hShowNotifications.flipswitch('enable'); }, 3000);
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
