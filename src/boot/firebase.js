import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdn3_vMdgP9ByaWN-vWTnLbs1b9XxJLkg",
  authDomain: "fir-practice-c0628.firebaseapp.com",
  projectId: "fir-practice-c0628",
  storageBucket: "fir-practice-c0628.appspot.com",
  messagingSenderId: "580623930894",
  appId: "1:580623930894:web:87f84632eb21856d66ce5f",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
