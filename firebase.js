import firebase from 'Firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCWfvuP8s4jP8VUlsJJnZJdJR51gjZUd1M",
    authDomain: "bug-fix-18579.firebaseapp.com",
    projectId: "bug-fix-18579",
    storageBucket: "bug-fix-18579.appspot.com",
    messagingSenderId: "367399483892",
    appId: "1:367399483892:web:be5c68636cbb6d4ef4a1a1"
  };
  // Initialize Firebase
 if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
 }

 export {firebase}