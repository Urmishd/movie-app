
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDb1r76u791dJhc-Ud1mhtluOMEx6LDEzo",
  authDomain: "filmyverse-ebccc.firebaseapp.com",
  projectId: "filmyverse-ebccc",
  storageBucket: "filmyverse-ebccc.appspot.com",
  messagingSenderId: "2106715972",
  appId: "1:2106715972:web:1496724aa6014cdd0cf111"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");

export default app;