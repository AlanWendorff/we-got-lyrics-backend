const firebase = require("firebase/app");
require("firebase/database");

const firebaseConfig = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESS,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUR_ID
};

// Initialize Firebase 
firebase.initializeApp(firebaseConfig);

const FirebaseConfig = () =>{
    const database = firebase.database();
    return(database);
}

module.exports = FirebaseConfig;
  

