import firebase from "firebase";
  var firebaseConfig = {
    apiKey: "AIzaSyBBDfI2aQki1oRhqlVv613HPO4dLP810PA",
    authDomain: "iss-tracker-paul.firebaseapp.com",
    databaseURL: "https://iss-tracker-paul-default-rtdb.firebaseio.com",
    projectId: "iss-tracker-paul",
    storageBucket: "iss-tracker-paul.appspot.com",
    messagingSenderId: "1075698295870",
    appId: "1:1075698295870:web:402d693dd510da67695d6f"
  };
 
  if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  }
  export default firebaseConfig 