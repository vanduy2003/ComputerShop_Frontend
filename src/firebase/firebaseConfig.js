// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDHiI6zYHStd9d78XGmIlHs9ttjQNObmdk",
    authDomain: "computer-shop-7ee75.firebaseapp.com",
    projectId: "computer-shop-7ee75",
    storageBucket: "computer-shop-7ee75.appspot.com", // Sửa lại đúng format
    messagingSenderId: "817455285746",
    appId: "1:817455285746:web:6ec972c07019b00f4c176b",
    measurementId: "G-F82HWE7MSE",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
