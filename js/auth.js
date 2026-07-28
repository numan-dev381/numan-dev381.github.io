import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// =============================
// Login
// =============================
async function login(email, password) {

    try {

        await signInWithEmailAndPassword(auth, email, password);

        window.location.href = "admin.html";

    } catch (error) {

        alert(error.message);

    }

}

// =============================
// Logout
// =============================
async function logout() {

    await signOut(auth);

    window.location.href = "index.html";

}

// =============================
// Check Login Status
// =============================
onAuthStateChanged(auth, (user) => {

    if (user) {

        console.log("Logged in:", user.email);

    } else {

        console.log("Not Logged In");

    }

});

// Export
export { login, logout };
