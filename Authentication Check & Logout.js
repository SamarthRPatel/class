// Import Firebase Auth Functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBowgieHiJRnWQKhT78SUj1xzOSkWRfLGE",
    authDomain: "real-estate-716f5.firebaseapp.com",
    projectId: "real-estate-716f5",
    storageBucket: "real-estate-716f5.appspot.com",
    messagingSenderId: "20078260385",
    appId: "1:20078260385:web:a27679227f763ce66cc0e0",
    measurementId: "G-3378ED1K58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Check if User is Logged In
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // If No User Logged In, Redirect to Login Page
        window.location.href = "login.html";
    }
});

// Logout Function
document.getElementById("logout-btn").addEventListener("click", () => {
    signOut(auth).then(() => {
        alert("Logged out successfully!");
        window.location.href = "login.html"; // Redirect to login page
    }).catch((error) => {
        console.error("Logout Error:", error);
    });
});
