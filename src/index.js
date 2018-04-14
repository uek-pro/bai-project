import style from "./main.scss";
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import { login, logout, create_account, send_verification } from './components/firebase/authentication/authentication';
import { logIn as socialMediaLogIn, logOut as socialMediaLogOut, checkAuth, notifyAuthStateChanged } from './components/firebase/authentication/social_media/common_auth';

// components can be called from the imported UIkit reference
// loads the Icon plugin
UIkit.use(Icons);

document.querySelector('#googleLogIn').addEventListener('click', () => socialMediaLogIn('google'));
document.querySelector('#githubLogIn').addEventListener('click', () => socialMediaLogIn('github'));
document.querySelector('#facebookLogIn').addEventListener('click', () => socialMediaLogIn('facebook'));

document.querySelector('#logOut').addEventListener('click', socialMediaLogOut);
document.querySelector('#checkAuth').addEventListener('click', () => {
    UIkit.notification(checkAuth() ? 'Logged in' : 'Signed off');
});

notifyAuthStateChanged(function (user) {
    if (user) {
        console.log(user);
        UIkit.notification(`Logged in. Greetings ${user.displayName}!`);
    } else {
        UIkit.notification('Signed off.');
    }
})

document.querySelector('#login_field').addEventListener('click', login);
document.querySelector('#logout_field').addEventListener('click', logout);
document.querySelector('#signUp').addEventListener('click', create_account);
document.querySelector('#verification_field').addEventListener('click', send_verification);