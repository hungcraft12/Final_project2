// Nơi đăng ký
// var usernameinput = document.getElementById("username");
// var passwordinput = document.getElementById("password");
// var emailinput = document.getElementById("email");
// var repasswordinput = document.getElementById("repassword");
// var signupbutton = document.getElementById("button");

// let form = document.getElementById("registerForm")
// form.addEventListener("submit", function SignUp(e) {
//     e.preventDefault() 
//         var username = usernameinput.value;
//         var password = passwordinput.value;
//         var repassword = repasswordinput.value;
//         var email = emailinput.value ;

//         if ( username == "" || password == "" || email == "" ) {
//             alert("thử lại đi em")
//         }
//         else if(password === repassword) {
//             var newObj = {
//                 name: username,
//                 password: password, 
//                 email: email,  
//             }
//             var newJson = JSON.stringify(newObj);
//             localStorage.setItem("tk_"+username, newJson);
//             alert("đăng ký thành công rồi amazing goodjob em");
//             window.location = "./login.html";
//         }
//         else {
//             alert("Đăng ký thất bại xin hãy thử lại")
//         }
// }
// )


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKlOVDVwgjVDJtKp0WOcYAZjSlC_cO8kE",
  authDomain: "spotifyjsi04.firebaseapp.com",
  databaseURL: "https://spotifyjsi04-default-rtdb.firebaseio.com",
  projectId: "spotifyjsi04",
  storageBucket: "spotifyjsi04.appspot.com",
  messagingSenderId: "354435733991",
  appId: "1:354435733991:web:7a2f28dadfbf9c30fbc542"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


  //create user
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
  import { getDatabase , ref, set } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const auth = getAuth();
const db = getDatabase()
var sign_up = document.getElementById("button");
sign_up.addEventListener("click" , (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const cpwd = document.getElementById("repassword").value
  const uname = document.getElementById("username").value
  
  if (password !== cpwd) {
    alert("Passwords dont match");
    return;
  } 
    else if(password === "") {
      alert("Please fill in your password")
      return;
    }
  else {
    //logic sign up
      //login sign up
createUserWithEmailAndPassword(auth, email, password, uname)
.then((userCredential) => {
  // Signed up 
  const user = userCredential.user;
  const uid = user.uid
  // ...
  const userRef = ref(db, "user/" + uid);
  set(userRef, { email: email , password: password , username: uname}).then(()=>{
    console.log("Create user: " + user + "successfully")
    window.location = "/Html/login.html";
  });
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  alert(errorMessage);
  // ..
  });
}


});

