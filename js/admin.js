// ======================================================
// Firebase Imports
// ======================================================

import { auth, db } from "./firebase.js";
import { logout } from "./auth.js";
import { supabase } from "./supabase.js";

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

// Files
const projectImage = document.getElementById("projectImage");
const pdfFile = document.getElementById("pdfFile");
const pptFile = document.getElementById("pptFile");
const zipFile = document.getElementById("zipFile");

const imageFileName = document.getElementById("imageFileName");
const pdfFileName = document.getElementById("pdfFileName");
const pptFileName = document.getElementById("pptFileName");
const zipFileName = document.getElementById("zipFileName");


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


// ======================================================
// Show Selected File Names
// ======================================================

projectImage.addEventListener("change", () => {

    imageFileName.textContent =
        projectImage.files.length
            ? projectImage.files[0].name
            : "No file selected";

});

pdfFile.addEventListener("change", () => {

    pdfFileName.textContent =
        pdfFile.files.length
            ? pdfFile.files[0].name
            : "No file selected";

});

pptFile.addEventListener("change", () => {

    pptFileName.textContent =
        pptFile.files.length
            ? pptFile.files[0].name
            : "No file selected";

});

zipFile.addEventListener("change", () => {

    zipFileName.textContent =
        zipFile.files.length
            ? zipFile.files[0].name
            : "No file selected";

});


// ======================================================
// Upload File To Supabase
// ======================================================

async function uploadFile(file) {

    if (!file) return "";

    const fileName = Date.now() + "_" + file.name;

    const { error } = await supabase.storage
        .from("portfolio-files")
        .upload(fileName, file);

    if (error) {

        alert(error.message);

        return "";

    }

    const { data } = supabase.storage
        .from("portfolio-files")
        .getPublicUrl(fileName);

    return data.publicUrl;

}


// ======================================================
// Save Project
// ======================================================

projectForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        const imageUrl = await uploadFile(projectImage.files[0]);
        const pdfUrl = await uploadFile(pdfFile.files[0]);
        const pptUrl = await uploadFile(pptFile.files[0]);
        const zipUrl = await uploadFile(zipFile.files[0]);

        await addDoc(collection(db, "projects"), {

            title: document.getElementById("projectTitle").value,
            description: document.getElementById("projectDescription").value,
            category: document.getElementById("projectCategory").value,
            semester: document.getElementById("projectSemester").value,
            technologies: document.getElementById("projectTech").value,

            github: document.getElementById("githubLink").value,
            live: document.getElementById("liveLink").value,
            video: document.getElementById("videoLink").value,

            image: imageUrl,
            pdf: pdfUrl,
            ppt: pptUrl,
            zip: zipUrl,

            createdAt: Date.now()

        });

        alert("Project Added Successfully.");

        projectForm.reset();

        imageFileName.textContent = "No file selected";
        pdfFileName.textContent = "No file selected";
        pptFileName.textContent = "No file selected";
        zipFileName.textContent = "No file selected";

        projectModal.style.display = "none";

    }

    catch (err) {

        alert(err.message);

    }

});
window.addEventListener("click", (e) => {

    if (e.target === projectModal) {

        projectModal.style.display = "none";

    }

});
// ======================================================
// Supabase Storage
// ======================================================

import { supabase } from "./supabase.js";

async function uploadFile(file, folder) {

    if (!file) return "";

    const fileName =
        Date.now() + "_" + file.name.replace(/\s+/g, "_");

    const filePath =
        `${folder}/${fileName}`;

    const { error } =
        await supabase.storage
        .from("portfolio-files")
        .upload(filePath, file);

    if (error) {

        alert(error.message);

        return "";

    }

    const { data } =
        supabase.storage
        .from("portfolio-files")
        .getPublicUrl(filePath);

    return data.publicUrl;

}
// ======================================================
// Save Project
// ======================================================

projectForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const image =
        document.getElementById("projectImage").files[0];

    const pdf =
        document.getElementById("pdfFile").files[0];

    const ppt =
        document.getElementById("pptFile").files[0];

    const zip =
        document.getElementById("zipFile").files[0];

    alert("Uploading files...");

    const imageUrl =
        await uploadFile(image, "images");

    const pdfUrl =
        await uploadFile(pdf, "pdf");

    const pptUrl =
        await uploadFile(ppt, "ppt");

    const zipUrl =
        await uploadFile(zip, "zip");

    console.log(imageUrl);
    console.log(pdfUrl);
    console.log(pptUrl);
    console.log(zipUrl);

    alert("Files uploaded successfully!");

});
