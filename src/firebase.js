// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIA06iuOORZs6GXZU-Z532_DXb833CmzQ",
  authDomain: "certificate360-8bbd8.firebaseapp.com",
  projectId: "certificate360-8bbd8",
  databaseURL:"https://certificate360-8bbd8-default-rtdb.firebaseio.com",
  storageBucket: "certificate360-8bbd8.firebasestorage.app",
  messagingSenderId: "629356591192",
  appId: "1:629356591192:web:c9382ee4167f5ea6d2722d",
  measurementId: "G-FQWPRRLT4X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
