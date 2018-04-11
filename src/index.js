import style from "./main.scss";
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import { logIn, logOut, checkAuth, notifyAuthStateChanged } from './components/firebase/authentication/social_media/common_auth';

// components can be called from the imported UIkit reference
// loads the Icon plugin
UIkit.use(Icons);

document.querySelector('#googleLogIn').addEventListener('click', () => logIn('google'));
document.querySelector('#githubLogIn').addEventListener('click', () => logIn('github'));
document.querySelector('#facebookLogIn').addEventListener('click', () => logIn('facebook'));

document.querySelector('#logOut').addEventListener('click', logOut);
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