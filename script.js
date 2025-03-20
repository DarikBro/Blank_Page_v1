// Script Vanila Part

const toggle = document.getElementById("toggle-theme");
const saveBtn = document.getElementById("save");
const exportBtn = document.getElementById("export");
const body = document.body;
const editor = document.getElementById("editor");
const wordCount = document.getElementById("wordCount");

// Toggle between light and dark mode
toggle.addEventListener("click", () => {
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    body.style.background = "white";
    body.style.color = "black";
    editor.style.color = "black";
  } else {
    body.classList.add("dark");
    body.style.background = "black";
    body.style.color = "white";
    editor.style.color = "white";
  }
});

// Load saved content from localStorage on page load
editor.value = localStorage.getItem("autosave") || "";

// Auto-save content to localStorage on every input
editor.addEventListener("input", () => {
  localStorage.setItem("autosave", editor.value);
  updateWordCount();
});

// Manual save button to save content to localStorage
saveBtn.addEventListener("click", () => {
  localStorage.setItem("autosave", editor.value);
  alert("Draft saved!");
});

// Export text content as a .txt file
exportBtn.addEventListener("click", () => {
  const blob = new Blob([editor.value], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "document.txt";
  a.click();
  URL.revokeObjectURL(url);
});

// Update word count live
function updateWordCount() {
  const text = editor.value.trim();
  const words = text === "" ? 0 : text.split(/\s+/).length;
  wordCount.textContent = `Words: ${words}`;
}

// Initialize word count on page load
updateWordCount();
