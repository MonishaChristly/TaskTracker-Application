const baseUrl = "http://localhost:8888/api/tasks";
const username = sessionStorage.getItem("username");

// Check if username is stored, if not redirect to login
if (!username) {
  window.location.href = "login.html";
}

// Load tasks for the logged-in user
function loadTasks() {
  fetch(`${baseUrl}/${username}`)
    .then(res => res.json())
    .then(tasks => {
      const list = document.getElementById("taskList");
      list.innerHTML = "";

      tasks.forEach(task => {
        const item = document.createElement("li");
        item.innerHTML = `
          <div>
            <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleComplete(${task.id})" />
            <strong class="${task.completed ? 'text-decoration-line-through' : ''}">${task.title}</strong><br>
            <small>${task.description}<br>Due: ${task.dueDate || "N/A"} | Priority: ${task.priority || "None"}</small>
          </div>
          <div>
           <button class="edit-btn" onclick="editTask(...">Edit</button>
           <button class="delete-btn" onclick="deleteTask(...">Delete</button>

          </div>
        `;
        list.appendChild(item);
      });
    })
    .catch(error => console.error("Error loading tasks:", error));
}

document.getElementById("taskForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const dueDate = document.getElementById("dueDate").value;
  const priority = document.getElementById("priority").value;

  fetch(`${baseUrl}/${username}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, dueDate, priority })
  })
    .then(() => {
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
      document.getElementById("dueDate").value = "";
      document.getElementById("priority").value = "";
      loadTasks();
    })
    .catch(error => console.error("Error adding task:", error));
});

function deleteTask(id) {
  fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  }).then(() => loadTasks());
}

function toggleComplete(id) {
  fetch(`${baseUrl}/${id}/toggle`, {
    method: "PUT",
  }).then(() => loadTasks());
}

function editTask(id, title, description, dueDate, priority) {
  const newTitle = prompt("Edit Title", title);
  const newDescription = prompt("Edit Description", description);
  const newDueDate = prompt("Edit Due Date", dueDate);
  const newPriority = prompt("Edit Priority", priority);

  if (newTitle !== null) {
    fetch(`${baseUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
        dueDate: newDueDate,
        priority: newPriority
      })
    }).then(() => loadTasks());
  }
}

function logout() {
  sessionStorage.removeItem("username");
  window.location.href = "login.html";
}

function renderTask(task) {
  const li = document.createElement("li");
  li.className = "task-card list-group-item";
  const editBtn = document.createElement('button');
  editBtn.className = 'edit-btn';
  editBtn.textContent = 'Edit';

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Delete';

  li.innerHTML = `
    <div>
      <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleTask(${task.id})" />
      <strong class="${task.completed ? "text-decoration-line-through" : ""}">
        ${task.title}
      </strong>
      <p>${task.description}</p>
      <small>Due: ${task.dueDate || "N/A"} | Priority: ${task.priority || "N/A"}</small><br />
      <button class="edit-btn" onclick="editTask(...">Edit</button>
      <button class="delete-btn" onclick="deleteTask(...">Delete</button>

    </div>
  `;

  document.getElementById("taskList").appendChild(li);
}




// Load tasks when the page loads
loadTasks();
