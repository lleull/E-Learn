
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCx9-M6gWLZPZDe6QxgDooD4k_Qxu8SE2Q",
    authDomain: "e-learn-1de82.firebaseapp.com",
    projectId: "e-learn-1de82",
    storageBucket: "e-learn-1de82.appspot.com",
    messagingSenderId: "199623523448",
    appId: "1:199623523448:web:999dc0cd3bae39646b018d",
    measurementId: "G-R6TCZQYQFP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const Auth = getAuth(app)
