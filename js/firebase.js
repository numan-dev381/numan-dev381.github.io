// =========================================
// Firebase Configuration
// =========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCk0GMk8w_xikGGJCgW9lwXLCtkNYqlTko"
    authDomain: "numan-portfolio-9eea5.firebaseapp.com",
    projectId: "numan-portfolio-9eea5",
    storageBucket: "numan-portfolio-9eea5.firebasestorage.app",
    messagingSenderId: "904457810296",
    appId: "1:904457810296:web:f92a45a5b1f86fb2b8188d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Services
const auth = getAuth(app);
const db = getFirestore(app);

// Export Services
export { auth, db };
