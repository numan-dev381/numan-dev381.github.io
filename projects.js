// ======================================
// Projects Page UI
// ======================================

const addProjectBtn = document.getElementById("addProjectBtn");
const projectModal = document.getElementById("projectModal");
const closeModal = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");
const projectForm = document.getElementById("projectForm");

// Open Modal
function openModal() {

    projectModal.style.display = "flex";
    document.body.style.overflow = "hidden";

}

// Close Modal
function closeProjectModal() {

    projectModal.style.display = "none";
    document.body.style.overflow = "auto";

    if (projectForm) {
        projectForm.reset();
    }

}

// Open Button
if (addProjectBtn) {

    addProjectBtn.addEventListener("click", openModal);

}

// Close (X)
if (closeModal) {

    closeModal.addEventListener("click", closeProjectModal);

}

// Cancel Button
if (cancelBtn) {

    cancelBtn.addEventListener("click", closeProjectModal);

}

// Click Outside
window.addEventListener("click", function (e) {

    if (e.target === projectModal) {

        closeProjectModal();

    }

});

// ESC Key
document.addEventListener("keydown", function (e) {

    if (e.key === "Escape" && projectModal.style.display === "flex") {

        closeProjectModal();

    }

});
