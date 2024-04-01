// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
// 	apiKey: 'AIzaSyC-53ocRgxcqhL6WrlSbPVgyhSQ5SLv8ZE',
// 	authDomain: 'stocklevels-194b1.firebaseapp.com',
// 	databaseURL: 'https://stocklevels-194b1-default-rtdb.europe-west1.firebasedatabase.app',
// 	projectId: 'stocklevels-194b1',
// 	storageBucket: 'stocklevels-194b1.appspot.com',
// 	messagingSenderId: '456185762823',
// 	appId: '1:456185762823:web:51757206a8f9ed13cec6a2',
// 	measurementId: 'G-LQ84EHC5Y6',
// }

const firebaseConfig = {
  apiKey: "AIzaSyDTRisuhx6-9bWH0_GLIS09b-5jju7cPIw",
  authDomain: "stocklevels-9f490.firebaseapp.com",
  databaseURL:
    "https://stocklevels-9f490-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "stocklevels-9f490",
  storageBucket: "stocklevels-9f490.appspot.com",
  messagingSenderId: "835038662459",
  appId: "1:835038662459:web:080052f28177e0a2f6b11e",
  measurementId: "G-N1WMBDEMV0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firebaseApp = getApp();
export const storage = getStorage(
  firebaseApp,
  "gs://stocklevels-9f490.appspot.com"
);
export const database = getDatabase(app);
export const dbRef = ref(getDatabase());
