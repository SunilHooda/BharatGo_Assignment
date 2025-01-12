// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcwHF_HtfiWqm3BSRpMpkc4X94CQcyYi4",
  authDomain: "mini-ecommbharatgo.firebaseapp.com",
  projectId: "mini-ecommbharatgo",
  storageBucket: "mini-ecommbharatgo.firebasestorage.app",
  messagingSenderId: "431677064574",
  appId: "1:431677064574:web:d374e73c5ae618369edf2f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export default app;
