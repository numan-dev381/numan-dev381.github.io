import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// ======================================
// LOGIN
// ======================================

async function login(email, password) {

    try {

        await signInWithEmailAndPassword(auth, email, password);

    } catch (error) {

        alert("Login Failed\n\n" + error.message);

    }

}

// ======================================
// LOGOUT
// ======================================

async function logout() {

    try {

        await signOut(auth);

        window.location.href = "index.html";

    } catch (error) {

        console.error(error);

    }

}

// ======================================
// AUTH STATE
// ======================================

onAuthStateChanged(auth, (user) => {

    // If user is on login page and already logged in
    if (user && window.location.pathname.includes("login.html")) {

        window.location.href = "admin.html";

    }

});

// ======================================
// EXPORT
// ======================================

export { login, logout };
