import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBG65s0wO3MqgkaNowOqPmKLqk-1Zsnrlc",
  authDomain: "disney-clone-4fb0f.firebaseapp.com",
  projectId: "disney-clone-4fb0f",
  storageBucket: "disney-clone-4fb0f.appspot.com",
  messagingSenderId: "859105131279",
  appId: "1:859105131279:web:34c5d96696a5b0b1059c7a",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
