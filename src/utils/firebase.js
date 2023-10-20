// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiKIJT57Vqdh32shwL8MmoPoi2NX6v1aQ",
  authDomain: "netflix-gpt-d9a3d.firebaseapp.com",
  projectId: "netflix-gpt-d9a3d",
  storageBucket: "netflix-gpt-d9a3d.appspot.com",
  messagingSenderId: "332980981053",
  appId: "1:332980981053:web:935ecef17efc5f3f730954",
  measurementId: "G-NGNF4V9CPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();