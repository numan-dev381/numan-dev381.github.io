// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcPnYtLxbvWEE4XaqCpgA95cl4yW-LXDg",
  authDomain: "numan-portfolio-ccaf7.firebaseapp.com",
  projectId: "numan-portfolio-ccaf7",
  storageBucket: "numan-portfolio-ccaf7.firebasestorage.app",
  messagingSenderId: "587725901836",
  appId: "1:587725901836:web:0d04e5dc0ec147b6255e29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log("Firebase Connected Successfully!");
import { login } from "./auth.js";

const loginOverlay = document.getElementById("loginOverlay");
const loginForm = document.getElementById("loginForm");

document.addEventListener("keydown", (e) => {

    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "l") {

        loginOverlay.classList.add("active");

    }

});

document.getElementById("closeLogin").onclick = () => {

    loginOverlay.classList.remove("active");

};

document.getElementById("cancelLogin").onclick = () => {

    loginOverlay.classList.remove("active");

};

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    await login(email, password);

});
