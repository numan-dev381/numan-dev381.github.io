import { auth } from "./firebase.js";

import { logout } from "./auth.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", logout);

onAuthStateChanged(auth,(user)=>{

    if(!user){

        window.location.href="login.html";

    }

});
