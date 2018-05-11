import firebase from 'firebase';
import notify from '../../../notifications/notification';

const logIn = (userEmail, userPass) => {

    
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        
        var errorCode = error.code;
        var errorMessage = error.message;
        notify('E-mail lub hasło niepoprawne');
    });
}

// create new account via email password
const createAccount = (userEmail, userPass, userPass2) => {

    if (userPass !== userPass2) {
        notify('Hasła nie zgadzają się');
        return false;
    }

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        notify("Error: " + errorMessage);
        return false;
    });
    // sendVerification(); NOTE: zakomentowane, żeby nie spamować ;)
}

// wysylanie maila potwierdzajacego
const sendVerification = () => {
    console.log("wyslano");
    let user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function () {
        console.log("Verification sent");
    }).catch(function (error) {
        let emailError = error.message;
        console.log("Error" + emailError);
    });
}

export { logIn, createAccount };