// ELEMENTS
const toggle = document.getElementById("toggle");
const status = document.getElementById("status");
const statusControl = document.getElementById("statusControl");
const title = document.getElementById("todo-title");

const desc = document.getElementById("todo-desc");
const priority = document.getElementById("todo-priority");
const date = document.getElementById("todo-date");

const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");

const editForm = document.getElementById("editForm");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

const editTitle = document.getElementById("editTitle");
const editDescription = document.getElementById("editDescription");
const editPriority = document.getElementById("editPriority");
const editDate = document.getElementById("editDate");

const card = document.querySelector(".todo-card");

// ALL MAIN CONTENT (except form)
const mainContent = Array.from(card.children).filter(
  el => el.id !== "editForm"
);


// ✅ STATUS SYNC
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    status.textContent = "Done";
    statusControl.value = "Done";
    title.style.textDecoration = "line-through";
    title.style.opacity = "0.6";
  } else {
    status.textContent = "Pending";
    statusControl.value = "Pending";
    title.style.textDecoration = "none";
    title.style.opacity = "1";
  }
});

statusControl.addEventListener("change", () => {
  const value = statusControl.value;

  status.textContent = value;

  if (value === "Done") {
    toggle.checked = true;
    title.style.textDecoration = "line-through";
    title.style.opacity = "0.6";
  } else {
    toggle.checked = false;
    title.style.textDecoration = "none";
    title.style.opacity = "1";
  }
});


// ✏️ EDIT BUTTON
editBtn.addEventListener("click", () => {
  editTitle.value = title.textContent;
  editDescription.value = desc.textContent;
  editPriority.value = priority.textContent;

  // safe date parsing
  editDate.value = date.getAttribute("datetime").split("T")[0];

  mainContent.forEach(el => el.style.display = "none");
  editForm.style.display = "block";
});


// 💾 SAVE BUTTON
saveBtn.addEventListener("click", () => {
  title.textContent = editTitle.value;
  desc.textContent = editDescription.value;
  priority.textContent = editPriority.value;

  const selectedDate = editDate.value;

  // FIXED: stable datetime format (NO Date object, NO ISO conversion)
  const newDate = selectedDate + "T23:59:59";

  date.setAttribute("datetime", newDate);
  date.textContent = selectedDate;

  updatePriorityUI(editPriority.value);

  editForm.style.display = "none";
  mainContent.forEach(el => el.style.display = "");

  updateTimeLeft();
});


// ❌ CANCEL BUTTON
cancelBtn.addEventListener("click", () => {
  editForm.style.display = "none";
  mainContent.forEach(el => el.style.display = "");
});


// 🗑️ DELETE (dummy)
deleteBtn.addEventListener("click", () => {
  alert("Delete clicked");
});


// EXPAND / COLLAPSE
const toggleDesc = document.getElementById("toggleDesc");

toggleDesc.addEventListener("click", () => {
  desc.classList.toggle("expanded");

  toggleDesc.textContent =
    desc.classList.contains("expanded") ? "Collapse" : "Expand";
});


// ⏳ TIME LEFT (FIXED)
const timeLeftEl = document.querySelector('[data-testid="test-todo-time-remaining"]');
const dueDateEl = document.getElementById("todo-date");

function updateTimeLeft() {
  const datetime = dueDateEl.getAttribute("datetime");

  const due = new Date(datetime);
  const now = new Date();

  const diff = due.getTime() - now.getTime();

  if (isNaN(diff)) {
    timeLeftEl.textContent = "Invalid date";
    return;
  }

  if (diff <= 0) {
    timeLeftEl.textContent = "Overdue";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  if (days > 0) {
    timeLeftEl.textContent = `Due in ${days}d ${hours}h`;
  } else if (hours > 0) {
    timeLeftEl.textContent = `Due in ${hours}h ${minutes}m`;
  } else {
    timeLeftEl.textContent = `Due in ${minutes}m`;
  }
}

updateTimeLeft();
setInterval(updateTimeLeft, 60000);


// 🎯 PRIORITY DOT
const priorityIndicator = document.getElementById("priorityIndicator");

function updatePriorityUI(value) {
  priorityIndicator.classList.remove("low", "medium", "high");

  if (value === "Low") {
    priorityIndicator.classList.add("low");
  } else if (value === "Medium") {
    priorityIndicator.classList.add("medium");
  } else {
    priorityIndicator.classList.add("high");
  }
}

updatePriorityUI(priority.textContent);