console.log("App.js Loaded");
import { login } from "./auth.js";

const loginOverlay = document.getElementById("loginOverlay");
const loginForm = document.getElementById("loginForm");

const closeBtn = document.getElementById("closeLogin");
const cancelBtn = document.getElementById("cancelLogin");

// ==============================
// Open Login (Ctrl + Shift + L)
// ==============================

document.addEventListener("keydown", (e) => {

    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "l") {

        e.preventDefault();

        loginOverlay.classList.add("active");

        document.getElementById("email").focus();

    }

});

// ==============================
// Close Login
// ==============================

closeBtn.addEventListener("click", () => {

    loginOverlay.classList.remove("active");

});

cancelBtn.addEventListener("click", () => {

    loginOverlay.classList.remove("active");

});

// Close when clicking outside

loginOverlay.addEventListener("click", (e) => {

    if (e.target === loginOverlay) {

        loginOverlay.classList.remove("active");

    }

});

// Close with ESC

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        loginOverlay.classList.remove("active");

    }

});

// ==============================
// Login
// ==============================

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    await login(email, password);

});
