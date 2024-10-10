// let Music_gen = ["Pop","Rock","Rap","Jazz","Blues","Folk","Metal","Country","Classical","Reggae","Punk","Techno","Trance","EDM","Dubstep","Drum and Bass","R&B","Indie","Trap","Instrumental"]

// var card = document.getElementById("genres");
// var count = 0
// for (i = 0 ; i < Music_gen.length ; i++) {
//     count += 1;
//     if (count == 6) {
//         count = 0
//         card.innerHTML += '<br>';
    
//     }
//     card.innerHTML +=
//      `<input type="checkbox" value="${Music_gen[i]}" name="${Music_gen[i]}">
//      <label for="${Music_gen[i]}">${Music_gen[i]}</label>`
// }

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

function upload() {
    var heading = document.getElementById("title").value;
    var des = document.getElementById("Description").value;
    var name_post = document.getElementById("Author").value;
    // var post = document.getElementById("wish").value;

    //object image
    var image = document.getElementById("image").files[0];
    // var date_post = document.getElementById("date").value;
    
    //Music file
    var music = document.getElementById("Music").files[0];
    //get image name
    var imageName = image.name;
    var MusicName = music.name;
    console.log(imageName);
    //firebase storage reference
    //it is the path where your image will be stored
    var storageRef = firebase.storage().ref('images/' + imageName);
    var storageRef = firebase.storage().ref('music/' + MusicName)
    //upload image to selected storage reference
    //make sure you pass image here
    var uploadTask = storageRef.put(image);
    //to get the state of image uploading....
    uploadTask.on('state_changed', function (snapshot) {
      //get task progress by following code
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("upload is " + progress + " done");
    }, function (error) {
      //handle error here
      console.log(error.message);
    }, function () {
      //handle successfull upload here..
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        //get your image download url here and upload it to databse
        //our path where data is stored ...push is used so that every post have unique id
        firebase.database().ref('blogs/').push().set({
          heading: heading,
          description: des,
          name_post: name_post,
          post: post,
          date: date_post,
          imageURL: downloadURL
        }, function (error) {
          if (error) {
            alert("Error while uploading");
          } else {
            alert("Successfully uploaded");
            //now reset your form
            document.getElementById('post-form').reset();
            getdata();
          }
        });
      });
    });
  
  }
  window.onload = function () {
    this.getdata();
  }
  
  // post on html
  function getdata() {
    firebase.database().ref('blogs/').once('value').then(function (snapshot) {
      //get your posts div
      var posts_div = document.getElementById('posts');
      //remove all remaining data in that div
      // posts_div.innerHTML = "";
      //get data from firebase
      var data = snapshot.val();
      console.log(data);
      //now pass this data to our posts div
      //we have to pass our data to for loop to get one by one
      //we are passing the key of that post to delete it from database
      for (let [key ,value] of Object.entries(data)) {
        posts_div.innerHTML = "<div class='w3-container w3-white w3-margin w3-padding-large'>" +
          "<div class='w3-center'>" +
          "<h3>" + value.heading + "</h3>" +
          "<h5>" + value.description + ", <span class'w3-opacity'>" + value.date + "</span></h5>" + "</div>" +
          "<div class='w3-justify'>" +
          "<img src='" + value.imageURL + "' alt='error Image' style='width:100%; height: 60%;  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);' class='w3-padding-16'>" +
          "<p><strong>" + value.name_post + "</strong> " + value.post + "</p>"+
          "<p class='w3-left'><button class='w3-button w3-white w3-border' onclick='likeFunction(this)'><b> Like</b></button></p>"+
          "<p class='w3-clear'></p>"+
          "</div></div><hr>"+posts_div.innerHTML;
      }
    });
  } 

  let Music_gen = ["Pop","Rock","Rap","Jazz","Blues","Folk","Metal","Country","Classical","Reggae","Punk","Techno","Trance","EDM","Dubstep","Drum and Bass","R&B","Indie","Trap","Instrumental"]

var card = document.getElementById("genres");
var count = 0
for (i = 0 ; i < Music_gen.length ; i++) {
    count += 1;
    if (count == 6) {
        count = 0
        card.innerHTML += '<br>';
    
    }
    card.innerHTML +=
     `<input type="checkbox" value="${Music_gen[i]}" name="${Music_gen[i]}">
     <label for="${Music_gen[i]}">${Music_gen[i]}</label>`
}