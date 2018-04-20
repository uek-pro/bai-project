import style from "./main.scss";

import firebase from 'firebase';
import firebaseConfig from './components/firebase/firebase_config.js';
import chart from 'chart.js';

import { logIn, createAccount } from './components/firebase/authentication/traditional/auth.js';
import socialMediaLogIn from './components/firebase/authentication/social_media/auth.js';
import { logOut, checkAuth, notifyAuthStateChanged } from './components/firebase/authentication/common_auth.js';


// Initialize Firebase
firebase.initializeApp(firebaseConfig);


let userEmail = document.getElementById('email-login-1');
let userPass = document.getElementById('password-login-1');

let userRegisterEmail = document.getElementById('email-register');
let userRegisterPass = document.getElementById('password-register1');

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
    } else {
        window.location.hash = '';
        console.log('Signed off.');
    }
});


var data1 = {
    datasets: [
        {
            data: [23, 4],
            backgroundColor: ['green', 'red']
        }
    ],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Wykonano',
        'Nie wykonano'
    ]
};

var ctx1 = document.getElementById('myChart1').getContext('2d');
var myDoughnutChart = new Chart(ctx1, {
    type: 'doughnut',
    data: data1,
    options: {
        title: {
            display: true,
            fontSize: 16,
            text: '% skuteczności'
        },
        legend: false,
        events: null
    }
});


var data2 = {
    labels: [10, 11, 12, 13, 14, 15, 16, 17, 18],
    datasets: [{
        fill: 'start',
        backgroundColor: 'green',
        data: [3, 0, 2, 6, 1, 9, 0, 5, 7]
    }]
};

var ctx2 = document.getElementById('myChart2').getContext('2d');
var myLineChart = new Chart(ctx2, {
    type: 'line',
    data: data2,
    options: {
        title: {
            display: true,
            fontSize: 16,
            text: 'Wykres'
        },
        legend: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        elements: {
            line: {
                tension: 0
            }
        }
    }
});


var data3 = {
    datasets: [
        {
            data: [12, 8, 3],
            backgroundColor: ['green', 'orange', 'red']
        }
    ]
};

var ctx3 = document.getElementById('myChart3').getContext('2d');
var myDoughnutChart3 = new Chart(ctx3, {
    type: 'doughnut',
    data: data3,
    options: {
        title: {
            display: true,
            fontSize: 16,
            text: '% skuteczności'
        },
        legend: false,
        events: null
    }
});