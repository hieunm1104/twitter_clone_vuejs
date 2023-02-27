import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
require("firebase/auth");
const firebaseConfig = {
  apiKey: "AIzaSyAJZRAfuit7DGFtIZW8SVA2TWl0oVVjuHA",
  authDomain: "twitter-clone-vuejs.firebaseapp.com",
  projectId: "twitter-clone-vuejs",
  storageBucket: "twitter-clone-vuejs.appspot.com",
  messagingSenderId: "1098565378975",
  appId: "1:1098565378975:web:9b0b67b945f286087193aa",
  measurementId: "G-8Z25Y77YBT",
};
firebase.initializeApp(firebaseConfig);
export default firebase;
