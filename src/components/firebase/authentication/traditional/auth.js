import firebase from 'firebase';

const logIn = (userEmail, userPass) => {

    
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        
        var errorCode = error.code;
        var errorMessage = error.message;

        if(errorMessage){      
            $.mobile.document.on( "click", "#btnLogin", function( evt ) {
                $( "#popupArrow" ).popup( "open", { x: evt.pageX, y: evt.pageY } );
          });            
        }           
    });
}

// create new account via email password
const createAccount = (userEmail, userPass, userPass2) => {
    if (userPass !== userPass2) {
        console.log('Hasła nie zgadzają się');
    }

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        if(errorMessage){
            $.mobile.document.on( "click", "#btnCreateAccount", function( evt ) {
                $( "#popupArrowRegister" ).popup( "open", { x: evt.pageX, y: evt.pageY } );
          }); 
        }
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