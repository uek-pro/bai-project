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

    console.log('click');
    
    firebase.auth().signInWithRedirect(provider).then(function () {

        return firebase.auth().getRedirectResult();

    }).then(function(result) {

        var user = result.user; 
        console.log('Ok.', user);
    }).catch(function (error) {

        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('Błąd', errorCode, errorMessage);
    });

    // firebase.auth().signInWithPopup(provider).then(function (result) {
    //     // var token = result.credential.accessToken;
    //     // var user = result.user;
    // }).catch(function (error) {
    //     // var errorCode = error.code;
    //     // var errorMessage = error.message;
    //     // var email = error.email;
    //     // var credential = error.credential;
    // });
};

export default logIn;