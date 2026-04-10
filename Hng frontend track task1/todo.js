const toggle = document.getElementById("toggle");
const status = document.getElementById("status");
const title = document.getElementById("todo-title");

const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");

toggle.addEventListener("change", function () {
  if (this.checked) {
    status.textContent = "Done";
    title.style.textDecoration = "line-through";
  } else {
    status.textContent = "Pending";
    title.style.textDecoration = "none";
  }
});

editBtn.addEventListener("click", function () {
  alert("Edit clicked");
});

deleteBtn.addEventListener("click", function () {
  alert("Delete clicked");
});