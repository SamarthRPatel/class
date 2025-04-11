import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBowgieHiJRnWQKhT78SUj1xzOSkWRfLGE",
    authDomain: "real-estate-716f5.firebaseapp.com",
    projectId: "real-estate-716f5",
    storageBucket: "real-estate-716f5.appspot.com",
    messagingSenderId: "20078260385",
    appId: "1:20078260385:web:a27679227f763ce66cc0e0",
    measurementId: "G-3378ED1K58",
    databaseURL: "https://real-estate-716f5-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Register User and Save to Database
function registerUser(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get form values
    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;
    const phone = document.getElementById("phone").value;
    const role = document.getElementById("role").value;

    // Password Match Validation
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Create User with Firebase Authentication
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userId = user.uid; // Get unique user ID

            // Save user details to Firebase Realtime Database
            return set(ref(database, "users/" + userId), {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                role: role
            });
        })
        .then(() => {
            alert("Registration successful! Redirecting to login...");

            // ✅ **Wait 1 second before redirecting**
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1000);
        })
        .catch((error) => {
            console.error("Error: ", error.message);
            alert("Registration failed: " + error.message);
        });
}

// Attach function to window so it works in HTML
window.registerUser = registerUser;
