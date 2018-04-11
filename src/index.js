import style from "./main.scss";
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import authentication from './components/authentication/authentication'

import { logIn, logOut, checkAuth as checkGoogleAuth, notifyAuthStateChanged } from './components/firebase/authentication/social_media/google_firebase_auth';

// components can be called from the imported UIkit reference
// loads the Icon plugin
UIkit.use(Icons);

const hLogInfo = document.querySelector('#logInfo');
const checkAuth = () => {
    UIkit.notification(checkGoogleAuth() ? 'Logged in' : 'Signed off');
}

document.querySelector('#googleLogIn').addEventListener('click', logIn);
document.querySelector('#googleLogOut').addEventListener('click', logOut);
document.querySelector('#googleCheck').addEventListener('click', checkAuth);

notifyAuthStateChanged(function (user) {
    if (user) {
        UIkit.notification(`Logged in. Greetings ${user.displayName}!`);
    } else {
        UIkit.notification('Signed off.');
    }
})