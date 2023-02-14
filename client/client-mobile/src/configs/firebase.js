import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyCVVWasvqI_muG_92Mdo63Ik14SZ6bLlCo",
  authDomain: "local-volt-370213.firebaseapp.com",
  projectId: "local-volt-370213",
  storageBucket: "local-volt-370213.appspot.com",
  messagingSenderId: "996832661200",
  appId: "1:996832661200:web:8fd8bd12921d4df06e58d5",
  measurementId: "G-KY3FC45JG9",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
