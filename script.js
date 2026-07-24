const addProjectBtn = document.getElementById("addProjectBtn");
const projectModal = document.getElementById("projectModal");
const closeModal = document.getElementById("closeModal");

// Open popup
if (addProjectBtn) {

    addProjectBtn.addEventListener("click", function () {

        projectModal.style.display = "flex";

    });

}

// Close popup using ×
if (closeModal) {

    closeModal.addEventListener("click", function () {

        projectModal.style.display = "none";

    });

}

// Close popup when clicking outside
window.addEventListener("click", function (event) {

    if (event.target === projectModal) {

        projectModal.style.display = "none";

    }

});
