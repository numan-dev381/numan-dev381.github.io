// =========================================
// Hidden Admin Login
// Ctrl + Shift + A
// =========================================

import { login } from "./auth.js";

const loginModal = document.getElementById("loginModal");
const closeLogin = document.getElementById("closeLogin");
const loginForm = document.getElementById("loginForm");

// =========================================
// Open Modal
// =========================================

document.addEventListener("keydown", (e) => {

    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {

        e.preventDefault();

        loginModal.style.display = "flex";

        document.getElementById("email").focus();

    }

});

// =========================================
// Close Button
// =========================================

closeLogin.addEventListener("click", () => {

    loginModal.style.display = "none";

});

// =========================================
// Click Outside
// =========================================

window.addEventListener("click", (e) => {

    if (e.target === loginModal) {

        loginModal.style.display = "none";

    }

});

// =========================================
// ESC Key
// =========================================

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        loginModal.style.display = "none";

    }

});

// =========================================
// Login
// =========================================

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    await login(email, password);

});
