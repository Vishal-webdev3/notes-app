let folders = JSON.parse(localStorage.getItem("folders")) || {};

function saveFolders() {
  localStorage.setItem("folders", JSON.stringify(folders));
  renderFolders();
}

function createFolder() {
  const name = document.getElementById("folderName").value.trim();
  if (name && !folders[name]) {
    folders[name] = [];
    document.getElementById("folderName").value = "";
    saveFolders();
  }
}

function addNote(folder) {
  const noteText = prompt("Enter your note:");
  if (noteText) {
    folders[folder].push(noteText);
    saveFolders();
  }
}

function editNote(folder, index) {
  const newText = prompt("Edit your note:", folders[folder][index]);
  if (newText !== null) {
    folders[folder][index] = newText;
    saveFolders();
  }
}

function deleteNote(folder, index) {
  if (confirm("Delete this note?")) {
    folders[folder].splice(index, 1);
    saveFolders();
  }
}

// 🆕 DELETE WHOLE FOLDER FUNCTION
function deleteFolder(folderName) {
  if (confirm(`Are you sure you want to delete the entire folder: ${folderName}?`)) {
    delete folders[folderName];
    saveFolders();
  }
}

// 🆕 DELETE ALL FUNCTION
function deleteAll() {
  if (confirm("Are you absolutely sure you want to delete ALL folders and notes? This cannot be undone.")) {
    folders = {};
    saveFolders();
  }
}

// 🎨 RENDER FOLDERS + Notes + Delete Buttons
function renderFolders() {
  const foldersDiv = document.getElementById("folders");
  foldersDiv.innerHTML = "";

  for (const folder in folders) {
    const folderDiv = document.createElement("div");
    folderDiv.className = "folder";

    const title = document.createElement("h2");
    title.textContent = folder;
    folderDiv.appendChild(title);

    // 🆕 Delete Folder Button
    const deleteFolderBtn = document.createElement("button");
    deleteFolderBtn.textContent = "🗑️ Delete Folder";
    deleteFolderBtn.style.marginLeft = "10px";
    deleteFolderBtn.onclick = () => deleteFolder(folder);
    folderDiv.appendChild(deleteFolderBtn);

    const addBtn = document.createElement("button");
    addBtn.textContent = "➕ Add Note";
    addBtn.onclick = () => addNote(folder);
    folderDiv.appendChild(addBtn);

    folders[folder].forEach((note, index) => {
      const noteDiv = document.createElement("div");
      noteDiv.className = "note";

      const textarea = document.createElement("textarea");
      textarea.value = note;
      textarea.readOnly = true;
      noteDiv.appendChild(textarea);

      const btns = document.createElement("div");
      btns.className = "note-buttons";

      const editBtn = document.createElement("button");
      editBtn.textContent = "✏️ Edit";
      editBtn.onclick = () => editNote(folder, index);
      btns.appendChild(editBtn);

      const delBtn = document.createElement("button");
      delBtn.textContent = "🗑️ Delete";
      delBtn.onclick = () => deleteNote(folder, index);
      btns.appendChild(delBtn);

      noteDiv.appendChild(btns);
      folderDiv.appendChild(noteDiv);
    });

    foldersDiv.appendChild(folderDiv);
  }
}

// 🟢 Initial render
renderFolders();
