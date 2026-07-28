// ======================================================
// Firebase Imports
// ======================================================

import { auth, db } from "./firebase.js";

import { logout } from "./auth.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ======================================================
// Authentication Check
// ======================================================

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";

    }

});


// ======================================================
// HTML Elements
// ======================================================

const logoutBtn = document.getElementById("logoutBtn");

const addProjectBtn = document.getElementById("addProjectBtn");

const projectModal = document.getElementById("projectModal");

const closeModal = document.getElementById("closeModal");

const cancelBtn = document.getElementById("cancelBtn");

const projectForm = document.getElementById("projectForm");

const projectsContainer = document.getElementById("projectsContainer");

const searchProject = document.getElementById("searchProject");


// ======================================================
// Logout
// ======================================================

logoutBtn.addEventListener("click", logout);


// ======================================================
// Open Modal
// ======================================================

addProjectBtn.addEventListener("click", () => {

    projectModal.style.display = "flex";

});


// ======================================================
// Close Modal
// ======================================================

closeModal.addEventListener("click", () => {

    projectModal.style.display = "none";

});

cancelBtn.addEventListener("click", () => {

    projectModal.style.display = "none";

});


// ======================================================
// Close Modal When Clicking Outside
// ======================================================

window.addEventListener("click", (e) => {

    if (e.target === projectModal) {

        projectModal.style.display = "none";

    }

});
