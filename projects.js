// ======================================
// Projects Modal Controller
// ======================================

const modal = document.getElementById("projectModal");
const form = document.getElementById("projectForm");

const openBtn = document.getElementById("addProjectBtn");
const closeBtn = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");

// ----------------------
// Open Modal
// ----------------------

function openModal() {

    if (!modal) return;

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

}

// ----------------------
// Close Modal
// ----------------------

function closeModal() {

    if (!modal) return;

    modal.style.display = "none";
    document.body.style.overflow = "auto";

    if (form) form.reset();

}

// ----------------------
// Button Events
// ----------------------

openBtn?.addEventListener("click", openModal);

closeBtn?.addEventListener("click", closeModal);

cancelBtn?.addEventListener("click", closeModal);

// ----------------------
// Close on Background Click
// ----------------------

modal?.addEventListener("click", (e) => {

    if (e.target === modal) {

        closeModal();

    }

});

// ----------------------
// Close on ESC
// ----------------------

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape" && modal.style.display === "flex") {

        closeModal();

    }

});
