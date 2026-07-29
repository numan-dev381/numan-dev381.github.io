// ======================================================
// Imports
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
// Authentication
// ======================================================

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";

    }

});


// ======================================================
// Elements
// ======================================================

const logoutBtn = document.getElementById("logoutBtn");
const addProjectBtn = document.getElementById("addProjectBtn");
const projectModal = document.getElementById("projectModal");
const closeModal = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");

const projectForm = document.getElementById("projectForm");

const projectsContainer =
    document.getElementById("projectsContainer");

const searchProject =
    document.getElementById("searchProject");


// ======================================================
// File Inputs
// ======================================================

const projectImage =
    document.getElementById("projectImage");

const pdfFile =
    document.getElementById("pdfFile");

const pptFile =
    document.getElementById("pptFile");

const zipFile =
    document.getElementById("zipFile");

const imageFileName =
    document.getElementById("imageFileName");

const pdfFileName =
    document.getElementById("pdfFileName");

const pptFileName =
    document.getElementById("pptFileName");

const zipFileName =
    document.getElementById("zipFileName");


// ======================================================
// Logout
// ======================================================

logoutBtn.addEventListener("click", logout);


// ======================================================
// Modal
// ======================================================

addProjectBtn.addEventListener("click", () => {

    projectModal.style.display = "flex";

});

closeModal.addEventListener("click", () => {

    projectModal.style.display = "none";

});

cancelBtn.addEventListener("click", () => {

    projectModal.style.display = "none";

});

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

async function uploadFile(file, folder) {

    if (!file) return "";

    const fileName =
        Date.now() + "_" +
        file.name.replace(/\s+/g, "_");

    const filePath =
        `${folder}/${fileName}`;

    const { error } =
        await supabase.storage
            .from("portfolio-files")
            .upload(filePath, file);

    if (error) {

        throw error;

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

    try {

        const imageUrl =
            await uploadFile(
                projectImage.files[0],
                "images"
            );

        const pdfUrl =
            await uploadFile(
                pdfFile.files[0],
                "pdf"
            );

        const pptUrl =
            await uploadFile(
                pptFile.files[0],
                "ppt"
            );

        const zipUrl =
            await uploadFile(
                zipFile.files[0],
                "zip"
            );

        await addDoc(collection(db, "projects"), {

            title:
                document.getElementById("projectTitle").value,

            description:
                document.getElementById("projectDescription").value,

            category:
                document.getElementById("projectCategory").value,

            semester:
                document.getElementById("projectSemester").value,

            technologies:
                document.getElementById("projectTech").value,

            github:
                document.getElementById("githubLink").value,

            live:
                document.getElementById("liveLink").value,

            video:
                document.getElementById("videoLink").value,

            image: imageUrl,
            pdf: pdfUrl,
            ppt: pptUrl,
            zip: zipUrl,

            createdAt: Date.now()

        });

        alert("Project added successfully!");

        projectForm.reset();

        imageFileName.textContent =
            "No file selected";

        pdfFileName.textContent =
            "No file selected";

        pptFileName.textContent =
            "No file selected";

        zipFileName.textContent =
            "No file selected";

        projectModal.style.display = "none";

    }

    catch (error) {

        alert(error.message);

    }

});
// ======================================================
// Load Projects
// ======================================================

async function loadProjects() {

    projectsContainer.innerHTML = "";

    const snapshot = await getDocs(collection(db, "projects"));

    if (snapshot.empty) {

        projectsContainer.innerHTML = `
            <div class="empty-state">
                <h2>No Projects Added</h2>
                <p>Click the Add Project button to publish your first project.</p>
            </div>
        `;

        return;

    }

    snapshot.forEach((docSnap) => {

        const project = docSnap.data();

        projectsContainer.innerHTML += `

        <div class="project-card">

            <img
                src="${project.image || "https://placehold.co/600x350?text=No+Image"}"
                class="project-image">

            <div class="project-content">

                <h3>${project.title}</h3>

                <p>${project.description}</p>

                <p><strong>Category:</strong> ${project.category}</p>

                <p><strong>Semester:</strong> ${project.semester}</p>

                <p><strong>Technologies:</strong> ${project.technologies}</p>

                <div class="project-links">

                    ${
                        project.github
                        ? `<a href="${project.github}" target="_blank">GitHub</a>`
                        : ""
                    }

                    ${
                        project.live
                        ? `<a href="${project.live}" target="_blank">Live</a>`
                        : ""
                    }

                    ${
                        project.video
                        ? `<a href="${project.video}" target="_blank">Video</a>`
                        : ""
                    }

                    ${
                        project.pdf
                        ? `<a href="${project.pdf}" target="_blank">PDF</a>`
                        : ""
                    }

                    ${
                        project.ppt
                        ? `<a href="${project.ppt}" target="_blank">Presentation</a>`
                        : ""
                    }

                    ${
                        project.zip
                        ? `<a href="${project.zip}" target="_blank">Source Code</a>`
                        : ""
                    }

                </div>

            </div>

        </div>

        `;

    });

}


// ======================================================
// Search Projects
// ======================================================

searchProject.addEventListener("keyup", () => {

    const value =
        searchProject.value.toLowerCase();

    const cards =
        document.querySelectorAll(".project-card");

    cards.forEach(card => {

        card.style.display =
            card.innerText.toLowerCase().includes(value)
                ? "block"
                : "none";

    });

});


// ======================================================
// Initial Load
// ======================================================

loadProjects();
