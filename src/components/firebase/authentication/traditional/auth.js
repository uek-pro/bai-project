import firebase from 'firebase';

const logIn = (userEmail, userPass) => {
   
    
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        let userEmail = document.getElementById('email-login-1').value;
        let userPass = document.getElementById('password-login-1').value
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error: " + errorMessage);
    });
}

// create new account via email password
const createAccount = (userEmail, userPass) => {

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        let userEmail = document.getElementById('email-register').value;
        let userPass = document.getElementById('password-register1').value
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log("Error: " + errorMessage);
    });

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

export { logIn, createAccount, sendVerification };