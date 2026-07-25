// ================================
// Project Image Upload
// ================================

const projectImage = document.getElementById("projectImage");
const imageFileName = document.getElementById("imageFileName");

if (projectImage) {

    projectImage.addEventListener("change", function () {

        if (this.files.length > 0) {

            imageFileName.innerHTML = `
                📄 ${this.files[0].name}
                <button id="removeImage" class="remove-file">
                    Remove
                </button>
            `;

            document
                .getElementById("removeImage")
                .addEventListener("click", function () {

                    projectImage.value = "";

                    imageFileName.textContent = "No file selected";

                });

        }

    });

}
