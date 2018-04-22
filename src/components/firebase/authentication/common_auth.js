import firebase from 'firebase';

const logOut = () => {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
};

const checkAuth = () => {
    var user = firebase.auth().currentUser;
    return user ? true : false;
    // return user || false;
};

const notifyAuthStateChanged = (callback) => firebase.auth().onAuthStateChanged(callback);
// firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//         console.log('Google - Zalogowany');
//     } else {
//         console.log('Google - Nie zalogowany');
//     }
// });

export { checkAuth, notifyAuthStateChanged, logOut };