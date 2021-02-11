const firebase = require("firebase/app");
require("firebase/database");

const firebaseConfig = {
    apiKey: "AIzaSyBLHT3M8Z3BUTJD6X7de7NmPI678cyR8_I",
    authDomain: "argmatchez.firebaseapp.com",
    databaseURL: "https://argmatchez.firebaseio.com",
    projectId: "argmatchez",
    storageBucket: "argmatchez.appspot.com",
    messagingSenderId: "286887476808",
    appId: "1:286887476808:web:a221c3f93d02c3efb2a27d",
    measurementId: "G-Z154VL1G5T"
};

// Initialize Firebase 
firebase.initializeApp(firebaseConfig);

const FirebaseConfig = () =>{
    const database = firebase.database();
    return(database);
}

module.exports = FirebaseConfig;
  

