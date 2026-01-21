import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyB8Jp3FKuHgtfUpKDRInje4YKzKBP-jy1o",
    authDomain: "learn-f7dcf.firebaseapp.com",
    projectId: "learn-f7dcf",
    storageBucket: "learn-f7dcf.firebasestorage.app",
    messagingSenderId: "947202033231",
    appId: "1:947202033231:web:aa1a929a4c2a55f7f18c3a",
    measurementId: "G-LR884W58TD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth }