// =========================================
// File Upload UI
// =========================================

function formatFileSize(bytes) {

    if (bytes < 1024) return bytes + " B";

    if (bytes < 1024 * 1024)
        return (bytes / 1024).toFixed(1) + " KB";

    return (bytes / (1024 * 1024)).toFixed(1) + " MB";

}

function setupFileUpload(inputId, displayId) {

    const input = document.getElementById(inputId);
    const display = document.getElementById(displayId);

    if (!input || !display) return;

    input.addEventListener("change", function () {

        if (!this.files.length) {

            display.innerHTML = "No file selected";
            return;

        }

        const file = this.files[0];

        display.innerHTML = `
            <div class="file-preview">

                <div class="file-details">

                    <div class="file-name">${file.name}</div>

                    <div class="file-size">${formatFileSize(file.size)}</div>

                </div>

                <button
                    type="button"
                    class="remove-file"
                    title="Remove File">

                    ×

                </button>

            </div>
        `;

        display
            .querySelector(".remove-file")
            .addEventListener("click", function () {

                input.value = "";
                display.innerHTML = "No file selected";

            });

    });

}

// Image
setupFileUpload("projectImage", "imageFileName");

// PDF
setupFileUpload("pdfFile", "pdfFileName");

// PowerPoint
setupFileUpload("pptFile", "pptFileName");

// ZIP
setupFileUpload("zipFile", "zipFileName");
