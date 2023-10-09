// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdUTVX6fFHRUCUp9PVCFdV3SGer1LKk9o",
  authDomain: "improvised-store.firebaseapp.com",
  projectId: "improvised-store",
  storageBucket: "improvised-store.appspot.com",
  messagingSenderId: "632370129931",
  appId: "1:632370129931:web:48cab8514d409acd63eb0e"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();