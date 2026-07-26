// =========================================
// File Upload UI
// =========================================

function formatFileSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function resetPreview(display) {
    display.innerHTML = `
        <span class="empty-file">
            No file selected
        </span>
    `;
}

function setupFileUpload(inputId, displayId) {

    const input = document.getElementById(inputId);
    const display = document.getElementById(displayId);

    if (!input || !display) return;

    resetPreview(display);

    input.addEventListener("change", () => {

        if (!input.files.length) {
            resetPreview(display);
            return;
        }

        const file = input.files[0];

        display.innerHTML = `
            <div class="file-preview">

                <div class="file-details">

                    <div class="file-name" title="${file.name}">
                        ${file.name}
                    </div>

                    <div class="file-size">
                        ${formatFileSize(file.size)}
                    </div>

                </div>

                <button
                    type="button"
                    class="remove-file"
                    aria-label="Remove file"
                    title="Remove File">

                    ×

                </button>

            </div>
        `;

        display.querySelector(".remove-file").addEventListener("click", () => {

            input.value = "";

            resetPreview(display);

        });

    });

}

// ===============================
// Initialize Uploads
// ===============================

setupFileUpload("projectImage", "imageFileName");
setupFileUpload("pdfFile", "pdfFileName");
setupFileUpload("pptFile", "pptFileName");
setupFileUpload("zipFile", "zipFileName");
