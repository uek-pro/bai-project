
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAfkPmfrZkSVTCdoZ-iDViyk1jf1x1tEAI",
    authDomain: "habittracker-8387b.firebaseapp.com",
    databaseURL: "https://habittracker-8387b.firebaseio.com",
    projectId: "habittracker-8387b",
    storageBucket: "",
    messagingSenderId: "1038038755358"
  };
  firebase.initializeApp(config);


 
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      document.getElementById("user_div").style.display = 'block';
      document.getElementById("login_form").style.display = 'none';


      //dodanie informacji o zalogowanym uzytkowniku taki check przyda sie mysle
      let user = firebase.auth().currentUser;

      if(user !=null){
          let email_id = user.email;
          document.getElementById('user_para').innerHTML = "Welcome User: " + email_id;
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


  export { login, logout } ;


