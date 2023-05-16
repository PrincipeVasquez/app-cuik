// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA85JEaPi_OGNLA-JPIFFes8GCI73IXg8c",
  authDomain: "curso-react-app-lista-ga-ac951.firebaseapp.com",
  projectId: "curso-react-app-lista-ga-ac951",
  storageBucket: "curso-react-app-lista-ga-ac951.appspot.com",
  messagingSenderId: "451607696951",
  appId: "1:451607696951:web:8745a24cf91cbacba311b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export {db, auth};