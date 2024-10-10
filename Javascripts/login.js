  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCKlOVDVwgjVDJtKp0WOcYAZjSlC_cO8kE",
    authDomain: "spotifyjsi04.firebaseapp.com",
    projectId: "spotifyjsi04",
    storageBucket: "spotifyjsi04.appspot.com",
    messagingSenderId: "354435733991",
    appId: "1:354435733991:web:7a2f28dadfbf9c30fbc542"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);



  // import {app} from "./app";

var login = document.getElementById('button');

// login.addEventListener('click', (e) => {
//     e.preventDefault();
// })

import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
// import { getDatabase , ref, set } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const auth = getAuth();
// const db = getDatabase();
login.addEventListener('click', (e) => {
  e.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var uname = document.getElementById("username").value;
  signInWithEmailAndPassword(auth, email, password ,uname)
  .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("Sign in successfully")
      localStorage.setItem("Session", email)
      window.location = "/index.html"
  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
  });
})

