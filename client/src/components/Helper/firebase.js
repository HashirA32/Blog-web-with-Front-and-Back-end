// Import the functions you need from the SDKs you need
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getEnv } from "./getenv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API'),
  authDomain: "mern-blog-32.firebaseapp.com",
  projectId: "mern-blog-32",
  storageBucket: "mern-blog-32.firebasestorage.app",
  messagingSenderId: "352333315523",
  appId: "1:352333315523:web:c1f9d9012d0361f4f69176"
};


const app = initializeApp(firebaseConfig);
const provider= new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
const auth = getAuth(app);


export {auth, provider}