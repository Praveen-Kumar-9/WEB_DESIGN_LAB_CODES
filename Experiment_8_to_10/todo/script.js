// Data and element references
var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
var filter = "all";

var form = document.getElementById("taskForm");
var input = document.getElementById("taskInput");
var priority = document.getElementById("priority");
var list = document.getElementById("taskList");
var counter = document.getElementById("counter");

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Draw the task list on the page
function render() {
  list.innerHTML = "";
  var left = 0;

  tasks.forEach(function (task, index) {
    if (!task.done) left++;
    if (filter === "active" && task.done) return;
    if (filter === "done" && !task.done) return;

    var li = document.createElement("li");
    li.className = (task.done ? "done " : "") + task.priority.toLowerCase();

    var span = document.createElement("span");
    span.textContent = task.text + " (" + task.priority + ")";
    span.onclick = function () {          // click on text = done / not done
      task.done = !task.done;
      save();
      render();
    };

    var del = document.createElement("button");
    del.textContent = "Delete";
    del.onclick = function () {
      tasks.splice(index, 1);
      save();
      render();
    };

    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  });

  counter.textContent = left + (left === 1 ? " task left" : " tasks left");
}

// Add a new task
form.addEventListener("submit", function (e) {
  e.preventDefault();
  var text = input.value.trim();
  if (text === "") return;
  tasks.push({ text: text, priority: priority.value, done: false });
  input.value = "";
  save();
  render();
});

// Filter buttons: All / Active / Completed
document.querySelectorAll(".filters button").forEach(function (btn) {
  btn.onclick = function () {
    document.querySelector(".filters .active").classList.remove("active");
    btn.classList.add("active");
    filter = btn.getAttribute("data-filter");
    render();
  };
});

// Remove all completed tasks
document.getElementById("clearDone").onclick = function () {
  tasks = tasks.filter(function (t) { return !t.done; });
  save();
  render();
};

render();
