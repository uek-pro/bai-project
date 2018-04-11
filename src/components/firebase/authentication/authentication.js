
import firebase_config from '../firebase_config'
  
  firebase.initializeApp(firebase_config);


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      document.getElementById("user_div").style.display = 'block';
      document.getElementById("login_form").style.display = 'none';


      //dodanie informacji o zalogowanym uzytkowniku taki check przyda sie mysle
      let user = firebase.auth().currentUser;

      if(user !=null){
          let email_id = user.email;
          let email_verified = user.emailVerified;
          document.getElementById('user_para').innerHTML = `Welcome ${email_id} <br> Verified? ${email_verified}`
      }
    } else {
        document.getElementById("user_div").style.display = 'none';
        document.getElementById("login_form").style.display = 'block';
    }
  });

  const login = () => {
      let userEmail = document.getElementById('email_field').value;
      let userPass = document.getElementById('password_field').value
    
      firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: " + errorMessage)
      });

  }

  const logout = () => {
    firebase.auth().signOut()
  }


  //create new account via email password
const create_account = () =>{
  //dodam tu modal i pobiore pola z modala w formularzu
  let userEmail = document.getElementById('email_field').value;
  let userPass = document.getElementById('password_field').value

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error: " + errorMessage)
  });

}

  export { login, logout, create_account } ;


