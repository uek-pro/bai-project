import firebase from 'firebase';
import notify from '../../../notifications/notification';

const chooseSocialMediaProvider = (media) => {

    switch (media) {
        case 'google': return new firebase.auth.GoogleAuthProvider();
        case 'github': return new firebase.auth.GithubAuthProvider();
        case 'facebook': return new firebase.auth.FacebookAuthProvider();
        default:
            break;
    }
    return null;
};

const logIn = (media) => {
    const provider = chooseSocialMediaProvider(media);
    if (provider === null) return false;
    
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // var token = result.credential.accessToken;
        // var user = result.user;
    }).catch(function (error) {
        notify('Rejestracja za pomocą konta społecznościowego niemożliwa.');
        var errorCode = error.code;
        var errorMessage = error.message;
        // var email = error.email;
        // var credential = error.credential;
        notify(
`Kod błędu: ${errorCode}
Treść błędu: ${errorMessage}`
        );
    });
};

export default logIn;