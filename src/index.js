import style from "./main.scss";
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import authentication from './components/authentication/authentication'

import { logIn, logOut, checkAuth as checkGoogleAuth} from './components/firebase/authentication/social_media/google_firebase_auth';

const hLogInfo = document.querySelector('#logInfo');
const checkAuth = () => {
    hLogInfo.textContent = checkGoogleAuth() ? 'Logged in' : 'Signed off';
}

document.querySelector('#googleLogIn').addEventListener('click', logIn);
document.querySelector('#googleLogOut').addEventListener('click', logOut);
document.querySelector('#googleCheck').addEventListener('click', checkAuth);

// loads the Icon plugin
UIkit.use(Icons);