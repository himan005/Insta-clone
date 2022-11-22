// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5xGn3mQAX-Elb12nkwj9d9cCoAxVbLOw",
  authDomain: "instaclone-73fa8.firebaseapp.com",
  projectId: "instaclone-73fa8",
  storageBucket: "instaclone-73fa8.appspot.com",
  messagingSenderId: "579901725941",
  appId: "1:579901725941:web:b4f88ee19a59c732a839bc"
};

// Initialize Firebase
const app =  !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();


export {app, db, storage} ;