import style from "./main.scss";
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import { login, logout } from './components/firebase/authentication/authentication'
import firebase_config from './components/firebase/firebase_config';
import * as firebase from "firebase";



document.querySelector('#login_field').addEventListener('click', login);
document.querySelector('#logout_field').addEventListener('click', logout)



// loads the Icon plugin
UIkit.use(Icons);
