import firebase from 'firebase';

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
        var token = result.credential.accessToken;
        var user = result.user;
        // console.log('user: ', user);
        console.log('token: ', token);
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
    });
};

export default logIn;