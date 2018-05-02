import style from "./main.scss";
import firebase from 'firebase';
import firebaseConfig from './components/firebase/firebase_config.js';
import chart from 'chart.js';
import chartAnnotation from 'chartjs-plugin-annotation';

import { logIn, createAccount } from './components/firebase/authentication/traditional/auth.js';
import socialMediaLogIn from './components/firebase/authentication/social_media/auth.js';
import { logOut, checkAuth, notifyAuthStateChanged } from './components/firebase/authentication/common_auth.js';
import { addHabit, deleteHabit } from "./components/firebase/appdata/habits_manager";
import { unixDateWithoutTime, getRelativeDaysBetween } from "./components/notifications/time_manager";
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

// PAGE: STRONA Z LISTĄ ZADAŃ [PODSTRONA]
const hHabitsList = document.getElementById('habitsList');

// PAGE: STRONA GLOBALNEGO PODSUMOWANIA [PODSTRONA]

// PAGE: STRONA USTAWIEŃ [PODSTRONA]
document.querySelector('#btnLogOut').addEventListener('click', logOut);
const hShowNotifications = $('#show-notifications');
const hNotificationsTime = $('#notifications-time');

// skrypt obsługi podstron
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

// PAGE: STRONA Z SUGEROWANYMI ZADANIAMI
const hSuggestedHabitsList = document.getElementById('suggested-habits-list');

$(document).on('pagebeforeshow', '#suggestPage', function (event, data) {
    // pobranie sugerowanych zadań i dodanie do listy na stronie z sugerowanymi zadaniami
    firebase.database().ref('suggestions').once('value').then(function (snapshot) {

        $(hSuggestedHabitsList).empty();
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
});

// PAGE: STRONA DODAWANIA ZADANIA
const mhTitle = document.getElementById('manageHabit-title');
const mhDescription = document.getElementById('manageHabit-description');
const mhType = document.getElementById('manageHabit-type');

$('.habit-type').on('tap', function () {
    if (!$(this).hasClass('ui-btn-active')) {
        console.log(this.attributes['data-habit'].textContent);
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
const hdChartAllAlong = document.getElementById('beginning-preview').getContext('2d');
const hdChartTwoWeeks = document.getElementById('last-2-weeks-preview').getContext('2d');
const hdChartArea = document.getElementById('area-preview').getContext('2d');

let storeHabit = {};

const showDetailsPage = (habit) => {
    storeHabit = habit;
    $.mobile.changePage('#habitDetailsPage', { transition: 'pop' });
}

let allAlongChart, twoWeeksChart;
$(document).on('pagebeforeshow', '#habitDetailsPage', function (event, data) {

    console.log(storeHabit);
    hdMain.textContent = storeHabit.desc ? storeHabit.desc : storeHabit.name;

    // NOTE: dla zadań typu: tak/nie
    const daysCount = getRelativeDaysBetween(+storeHabit.date, unixDateWithoutTime());
    const daysCount2Weeks = daysCount > 14 ? 14 : daysCount;
    const limit = daysCount - daysCount2Weeks;

    let successDays = 0, successDays2Weeks = 0;
    for (let k in storeHabit.days) {
        if (storeHabit.days.hasOwnProperty(k)) {
           ++successDays;
           if (+k > limit) ++successDays2Weeks;
        }
    }

    const failedDays = daysCount - successDays;
    const failedDays2Weeks = daysCount2Weeks - successDays2Weeks;

    // https://github.com/chartjs/Chart.js/issues/559
    allAlongChart ? allAlongChart.destroy() : null;
    twoWeeksChart ? twoWeeksChart.destroy() : null;

    allAlongChart = createDoughnutChart(hdChartAllAlong, successDays, failedDays);
    twoWeeksChart = createDoughnutChart(hdChartTwoWeeks, successDays2Weeks, failedDays2Weeks);

    createLineChart(hdChartArea, 5, [10, 11, 12, 13, 14, 15, 16 ], [3, 2, 9, 6, 0, 5, 7]);
});

// PAGE: STRONA REALIZACJI ZADANIA [ODPALANA AUTOMATYCZNIE O OKREŚLONEJ PORZE]
const btnSuccess = document.getElementById('success');
const btnFailure = document.getElementById('failure');
const answerValue = document.getElementById('realization-answer-value');

notifyAuthStateChanged(function (user) {
    if (user) {
        console.log(`Logged in. Greetings ${user.email}!`, user);

        $(document).on('pagebeforeshow', '#habitsListPage', function (event, data) {
            // nasłuchiwanie na zmiany w liście zwyczajów
            firebase.database().ref(`users/${firebase.auth().currentUser.uid}/practices`).on('value', function (snapshot) {

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
        });

        const lastLogged = new Date();
        firebase.database().ref(`users/${user.uid}`).update({
            lastLogged: unixDateWithoutTime(lastLogged)
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

            console.log(ss.notificationsTime, lastLogged.toLocaleString('pl-PL', { hour: '2-digit', minute: '2-digit' })); // tmp

            if (snExist && ss.showNotifications == true && ntExist && ss.notificationsTime <= lastLogged.toLocaleString('pl-PL', { hour: '2-digit', minute: '2-digit' })) {

                const unixLastLoggedDay = unixDateWithoutTime(lastLogged);
                if (!lnExist || unixLastLoggedDay != unixDateWithoutTime(ss.lastNotification)) {

                    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/settings`).update({ lastNotification: unixLastLoggedDay });

                    console.log('Powiadomienie!!11oneone');
                    $.mobile.changePage('#habitRealizationPage');

                    const $hr = $('#habit-realization');
                    firebase.database().ref(`users/${user.uid}/practices`).once('value').then(function (snapshot) {

                        const habits = snapshot.val();
                        if (habits != null) {
                            const keys = Object.keys(habits);
                            let i = 0;
                            // renderHabitsRealizationForm($hr, habits, keys[i], i, keys.length);
                            renderHabitsRealizationForm(
                                $hr,
                                habits[keys[i]],
                                btnSuccess,
                                i,
                                keys.length
                            );

                            const doHabitRealization = function (isSucceed) {
                                if (i >= keys.length - 1) {
                                    $.mobile.changePage('#habitsListPage');
                                    return;
                                }

                                console.log([
                                    unixLastLoggedDay,
                                    +habits[keys[i]].date
                                ]);

                                if (isSucceed && (habits[keys[i]].type == 0 || habits[keys[i]].type == 1)) {

                                    const relativeDayNumber = getRelativeDaysBetween(+habits[keys[i]].date, unixLastLoggedDay);
                                    // console.log(relativeDayNumber);

                                    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/practices/${keys[i]}/days/${relativeDayNumber}`).set(
                                        habits[keys[i]].type == 0 ? true : +answerValue.value
                                    );
                                }

                                i++;

                                // ładowanie kolejnego zwyczaju
                                renderHabitsRealizationForm(
                                    $hr,
                                    habits[keys[i]],
                                    btnSuccess,
                                    i,
                                    keys.length
                                );
                            }

                            btnSuccess.addEventListener('click', () => doHabitRealization(true));
                            btnFailure.addEventListener('click', () => doHabitRealization(false));
                        }
                    });

                } else {
                    console.log('Dziś już było powiadomienie');
                    $.mobile.changePage('#habitsListPage');
                }

            } else {
                $.mobile.changePage('#habitsListPage');
            }
        });

    } else {
        $(hHabitsList).empty();
        $(hSuggestedHabitsList).empty();
        window.location.hash = '';
        console.log('Signed off.');
    }
});

function renderHabitsRealizationForm(el, habit, btnSuccess, index, count) {

    btnFailure.classList.add('hide');
    answerValue.parentElement.classList.add('hide');

    let specific = '';
    switch (habit.type) {
        case 0:
            btnSuccess.text = 'Udało się';
            btnFailure.classList.remove('hide');
            break;
        case 1:
            btnSuccess.text = 'Zastosuj';
            answerValue.parentElement.classList.remove('hide');
            break;
        case 2:
            btnSuccess.text = 'Ok';
            specific = habit.author != null ? `<p class="quote">~ ${habit.author}</p>` : '';
            break;
        case 3:
            btnSuccess.text = 'Ok';
            specific = '<p>TODO: table with words</p>'
            break;
        default:
            break;
    }

    el.html(
        `<p>${index + 1} / ${count}</p>
        ${habit.desc != null ? `<h2>${habit.name}</h2>` : null}
        <h1>${habit.desc != null ? habit.desc : habit.name}</h1>
        
        ${specific}`
    ).trigger('refresh');
};
