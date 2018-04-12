import style from "./main.scss";
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import { login, logout, create_account, send_verification } from './components/firebase/authentication/authentication'
import firebase_config from './components/firebase/firebase_config';
import * as firebase from "firebase";




document.querySelector('#login_field').addEventListener('click', login);
document.querySelector('#logout_field').addEventListener('click', logout)
document.querySelector('#signUp').addEventListener('click', create_account)
document.querySelector('#verification_field').addEventListener('click', send_verification)



// loads the Icon plugin
UIkit.use(Icons);
