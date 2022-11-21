// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBl6me69EY-QkcPSOmqrz17ZNc7MzOywTo",
  authDomain: "random-chatter-client.firebaseapp.com",
  projectId: "random-chatter-client",
  storageBucket: "random-chatter-client.appspot.com",
  messagingSenderId: "483631073843",
  appId: "1:483631073843:web:22a5051d365488f1653146",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
