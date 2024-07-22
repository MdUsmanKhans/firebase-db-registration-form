 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
 import { getDatabase, get, ref, set, child, update, remove } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyDLIJfEHUM4Z_bDGQ5_dWA0Uj-DBOWGdEc",
   authDomain: "crud-app-cef40.firebaseapp.com",
   databaseURL: "https://crud-app-cef40-default-rtdb.firebaseio.com",
   projectId: "crud-app-cef40",
   storageBucket: "crud-app-cef40.appspot.com",
   messagingSenderId: "188392855592",
   appId: "1:188392855592:web:9d5e1a58ac2c16776e3d1d",
   measurementId: "G-B3TPCYQ22D"
 };

 const app = initializeApp(firebaseConfig);

 const db = getDatabase();

// const submit = document.querySelector('button')
// submit.onclick = () => sendData()


// Function for data sending
let nameBox = document.getElementById("nameBox");
let emailBox = document.getElementById("emailBox");
let secBox = document.getElementById("secBox");
let courseBox = document.getElementById("courseBox");
let genBox = document.getElementById("genBox");


// button
const submit = document.querySelector('button')
submit.onclick = () => sendData()

// Insert Data function

function sendData() {
    const uniqueId = Date.now().toString();
    set(ref(db, "The students/" + uniqueId),{
       Name:nameBox.value,
       email: emailBox.value,
       Section: secBox.value,
       Course: courseBox.value,
       Gender: genBox.value,
    })
    .then(()=>{
        alert("Thank you! Your form has been submitted successfully. 😊")
    })
    .catch((error)=>{
        alert("Data stored unsuccessful"+error)
    });
};

