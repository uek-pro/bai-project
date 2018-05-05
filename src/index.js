import style from "./main.scss";
import defaultAccountPhotoURL from "./img/account-icon.png";

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
import { getDatasetForDoughnutChartsType0, getDatasetForDoughnutChartsType1, getDatasetForLineChart } from "./components/chart/datasets";
import { generateDictTable, generateDictHTML } from "./components/dict/dict";

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
const summHabitsCount = document.getElementById('summHabitsCount');

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
const mhDict = document.getElementById('dict');

document.getElementById('manageHabit-add-btn').addEventListener('click', () => {

    const habitType = +mhType.value;
    if (habitType >= 0 && habitType < 4) {

        const habit = {
            name: mhTitle.value,
            desc: mhDescription.value,
            type: habitType
        };

        if (habitType == 1) {
            habit.optimal = +mhOptimalValue.value;
        } else if (habitType == 2) {
            habit.author = mhAuthor.value;
        } else if (habitType == 3) {

            habit.dict = [];

            const inputs = mhDict.querySelectorAll('tr input');
            for (let i = 0; i < inputs.length; i += 2) {

                const o = inputs[i].value;
                const t = inputs[i + 1].value;
                o != '' && t != '' ? habit.dict.push([o, t]) : null;
            };
            
            // nie dodawaj zwyczaju, jeżeli brak słówek
            if (habit.dict.length == 0) {
                console.log('Dodaj przynajmniej jedno słówko');
                return;
            }

            // $(mhDict).empty();
        }
        addHabit(habit);
    }
});

const addNewWord = function (table) {

    $(table).append(
        `<tr>
            <td>
                <input type="text" />
            </td>
            <td>
                <input type="text" />
            </td>
        </tr>`
    ).trigger('create');
};

const delLastWord = function (table) {
    $(table).find('tr:last-child').remove();
}

document.getElementById('new-word').addEventListener('click', () => addNewWord(mhDict));
document.getElementById('del-word').addEventListener('click', () => delLastWord(mhDict));

// PAGE: STRONA WIDOKU POJEDYNCZEGO ZADANIA
const hdMain = document.getElementById('hdMain');
const hdDoughnutCharts = document.getElementById('hdDoughnutCharts');
const hdChartOnly1 = document.getElementById('hdChartOnly1');
const hdDict = document.getElementById('hdDict');

const hdChartAllAlong = document.getElementById('beginning-preview').getContext('2d');
const hdChartTwoWeeks = document.getElementById('last-2-weeks-preview').getContext('2d');
const hdChartArea = document.getElementById('area-preview').getContext('2d');

let storeHabit = {};

const showDetailsPage = (habit) => {
    storeHabit = habit;
    $.mobile.changePage('#habitDetailsPage', { transition: 'pop' });
}

let allAlongChart, twoWeeksChart, areaChart;
$(document).on('pagebeforeshow', '#habitDetailsPage', function (event, data) {

    hdDoughnutCharts.classList.add('hide');
    hdChartOnly1.classList.add('hide');
    hdDict.classList.add('hide');
    $(hdDict).empty();

    allAlongChart ? allAlongChart.destroy() : null;
    twoWeeksChart ? twoWeeksChart.destroy() : null;
    areaChart ? areaChart.destroy() : null;

    console.log(storeHabit);
    hdMain.textContent = storeHabit.desc ? storeHabit.desc : storeHabit.name;

    const relativeDaysCount = getRelativeDaysBetween(+storeHabit.date, unixDateWithoutTime());
    if (storeHabit.type == 0) {
        hdDoughnutCharts.classList.remove('hide');
        const dataset = getDatasetForDoughnutChartsType0(storeHabit.days, relativeDaysCount);
        allAlongChart = createDoughnutChart(hdChartAllAlong, dataset.allAlong.success, dataset.allAlong.failed);
        twoWeeksChart = createDoughnutChart(hdChartTwoWeeks, dataset.last2Weeks.success, dataset.last2Weeks.failed);
    } else if (storeHabit.type == 1) {
        hdDoughnutCharts.classList.remove('hide');
        hdChartOnly1.classList.remove('hide');
        const dataset = getDatasetForDoughnutChartsType1(storeHabit.days, relativeDaysCount, storeHabit.optimal);
        allAlongChart = createDoughnutChart(hdChartAllAlong, dataset.allAlong.aboveOrEqualOptimal, dataset.allAlong.failed, dataset.allAlong.belowOptimal);
        twoWeeksChart = createDoughnutChart(hdChartTwoWeeks, dataset.last2Weeks.aboveOrEqualOptimal, dataset.last2Weeks.failed, dataset.last2Weeks.belowOptimal);

        const lineChartDataset = getDatasetForLineChart(storeHabit.days, relativeDaysCount);
        console.log(lineChartDataset);

        areaChart = createLineChart(hdChartArea, storeHabit.optimal, lineChartDataset[0], lineChartDataset[1]);
    } else if (storeHabit.type == 3) {
        generateDictTable(storeHabit.dict, hdDict);
        hdDict.classList.remove('hide');
    }
});

// PAGE: STRONA REALIZACJI ZADANIA [ODPALANA AUTOMATYCZNIE O OKREŚLONEJ PORZE]
const btnSuccess = document.getElementById('success');
const btnFailure = document.getElementById('failure');
const answerValue = document.getElementById('realization-answer-value');

notifyAuthStateChanged(function (user) {
    if (user) {
        console.log(`Logged in. Greetings ${user.email}!`, user);
        setAccountInfo(user.displayName, user.email, user.photoURL);

        $(document).on('pagebeforeshow', '#habitsListPage', function (event, data) {
            // nasłuchiwanie na zmiany w liście zwyczajów
            firebase.database().ref(`users/${firebase.auth().currentUser.uid}/practices`).on('value', function (snapshot) {

                const habits = snapshot.val();
                $(hHabitsList).empty();
                if (habits != null) {
                    const keys = Object.keys(habits);
                    summHabitsCount.textContent = keys.length;
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

            if (snExist && ss.showNotifications == true && ntExist && ss.notificationsTime <= lastLogged.toLocaleString('pl-PL', { hour: '2-digit', minute: '2-digit' })) {

                const unixLastLoggedDay = unixDateWithoutTime(lastLogged);
                if (!lnExist || unixLastLoggedDay != unixDateWithoutTime(ss.lastNotification)) {

                    const $hr = $('#habit-realization');
                    firebase.database().ref(`users/${user.uid}/practices`).once('value').then(function (snapshot) {

                        const habits = snapshot.val();
                        if (habits != null) {

                            firebase.database().ref(`users/${firebase.auth().currentUser.uid}/settings`).update({ lastNotification: unixLastLoggedDay });

                            console.log('Powiadomienie!!11oneone');
                            $.mobile.changePage('#habitRealizationPage');

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

                                console.log([
                                    unixLastLoggedDay,
                                    +habits[keys[i]].date
                                ]);

                                //console.log(+answerValue.value);

                                if (isSucceed && +answerValue.value != 0 && (habits[keys[i]].type == 0 || habits[keys[i]].type == 1)) {

                                    const relativeDayNumber = getRelativeDaysBetween(+habits[keys[i]].date, unixLastLoggedDay);

                                    if (relativeDayNumber > 0) {

                                        firebase.database().ref(`users/${firebase.auth().currentUser.uid}/practices/${keys[i]}/days/${relativeDayNumber}`).set(
                                            habits[keys[i]].type == 0 ? true : +answerValue.value
                                        );
                                    }
                                }

                                answerValue.value = '';
                                i++;

                                if (i >= keys.length) {
                                    $.mobile.changePage('#habitsListPage');
                                    return;
                                }

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

                        } else {
                            $.mobile.changePage('#habitsListPage');
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
        setAccountInfo();
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
            specific = generateDictHTML(habit.dict);
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

function setAccountInfo(displayName = null, email = null, photoURL = null) {
    
    const Ai = document.getElementById('account-info');
    Ai.children[0].children[0].textContent = displayName;
    Ai.children[0].children[1].textContent = email;
    Ai.children[1].children[0].src = photoURL != null ? photoURL : defaultAccountPhotoURL;
}