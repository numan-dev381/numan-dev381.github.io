import { auth } from "./firebase.js";

import {

    signInWithEmailAndPassword,

    signOut,

    onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


// ======================================
// LOGIN
// ======================================

async function login(email,password){

    try{

        await signInWithEmailAndPassword(auth,email,password);

    }

    catch(error){

        alert("Login Failed\n\n" + error.message);

    }

}


// ======================================
// LOGOUT
// ======================================

async function logout(){

    try{

        await signOut(auth);

        window.location.href="index.html";

    }

    catch(error){

        console.error(error);

    }

}


// ======================================
// AUTH STATE LISTENER
// ======================================

onAuthStateChanged(auth,(user)=>{

    const currentPage =
        window.location.pathname.split("/").pop();

    // Already logged in and on login page
    if(user && currentPage==="login.html"){

        window.location.href="admin.html";

    }

    // Not logged in but trying to access admin
    if(!user && currentPage==="admin.html"){

        window.location.href="login.html";

    }

});


// ======================================
// EXPORTS
// ======================================

export{

    login,

    logout

};
