// Task Class
class Task {

  constructor(
    id,
    name,
    description,
    assignedTo,
    dueDate,
    status,
    priority
  ) {

    this.id = id;

    this.name = name;

    this.description = description;

    this.assignedTo = assignedTo;

    this.dueDate = dueDate;

    this.status = status;

    this.priority = priority;

  }

}

// TaskManager Class
class TaskManager {

  constructor() {

    // Task array
    this.tasks = [];

    // Current ID
    this.currentId = 1;

  }

  // Add task
  addTask(
    name,
    description,
    assignedTo,
    dueDate,
    status,
    priority
  ) {

    const task = new Task(
      this.currentId,
      name,
      description,
      assignedTo,
      dueDate,
      status,
      priority
    );

    // Store task in array
    this.tasks.push(task);

    // Increase ID
    this.currentId++;

    // Display tasks
    this.render();

  }

  // Delete task
  deleteTask(id) {

    // Remove task from array
    this.tasks =
      this.tasks.filter(
        (task) => task.id !== id
      );

    // Render again
    this.render();

  }

  // Change status
  changeStatus(id) {

    const task =
      this.tasks.find(
        (task) => task.id === id
      );

    if (task.status === "TODO") {

      task.status =
        "IN PROGRESS";

    }

    else if (
      task.status ===
      "IN PROGRESS"
    ) {

      task.status =
        "REVIEW";

    }

    else if (
      task.status === "REVIEW"
    ) {

      task.status = "DONE";

    }

    else {

      task.status = "TODO";

    }

    this.render();

  }

  // Render tasks
  render() {

    const taskList =
      document.getElementById(
        "taskList"
      );

    taskList.innerHTML = "";

    this.tasks.forEach((task) => {

      let badgeClass =
        "bg-primary";

      if (
        task.status ===
        "IN PROGRESS"
      ) {

        badgeClass =
          "bg-warning text-dark";

      }

      else if (
        task.status === "REVIEW"
      ) {

        badgeClass =
          "bg-info";

      }

      else if (
        task.status === "DONE"
      ) {

        badgeClass =
          "bg-success";

      }

      // Urgent background
      let cardColor = "";

      if (
        task.priority ===
        "URGENT"
      ) {

        cardColor =
          "#ffb3b3";

      }

      // Create card
      const card = `

      <div class="col-md-4 mb-4">

        <div
          class="card h-100 shadow-sm"
          style="background-color:${cardColor}"
        >

          <div class="card-body">

            <h5 class="card-title">
              ${task.name}
            </h5>

            <p class="card-text">
              ${task.description}
            </p>

            <p>
              <strong>Assigned To:</strong>
              ${task.assignedTo}
            </p>

            <p>
              <strong>Due Date:</strong>
              ${task.dueDate}
            </p>

            <span
              class="badge ${badgeClass}"
            >
              ${task.status}
            </span>

            <p class="mt-3">
              <strong>Priority:</strong>
              ${task.priority}
            </p>

            <!-- Status Button -->
            <button
              class="btn btn-sm btn-outline-dark mt-2"
              onclick="taskManager.changeStatus(${task.id})"
            >
              Change Status
            </button>

            <!-- Delete Button -->
            <button
              class="btn btn-sm btn-danger mt-2 ms-2"
              onclick="taskManager.deleteTask(${task.id})"
            >
              Delete
            </button>

          </div>

        </div>

      </div>

      `;

      taskList.innerHTML += card;

    });

  }

}

// Create TaskManager Object
const taskManager =
  new TaskManager();

// Form Submit
const taskForm =
  document.getElementById(
    "taskForm"
  );

taskForm.addEventListener(
  "submit",
  function (event) {

    event.preventDefault();

    // Inputs
    const taskName =
      document.getElementById(
        "taskName"
      ).value.trim();

    const description =
      document.getElementById(
        "description"
      ).value.trim();

    const assignedTo =
      document.getElementById(
        "assignedTo"
      ).value.trim();

    const dueDate =
      document.getElementById(
        "dueDate"
      ).value;

    const status =
      document.getElementById(
        "status"
      ).value;

    const priority =
      document.getElementById(
        "priority"
      ).value;

    // Errors
    const nameError =
      document.getElementById(
        "nameError"
      );

    const descriptionError =
      document.getElementById(
        "descriptionError"
      );

    const assignedError =
      document.getElementById(
        "assignedError"
      );

    const dateError =
      document.getElementById(
        "dateError"
      );

    const statusError =
      document.getElementById(
        "statusError"
      );

    const priorityError =
      document.getElementById(
        "priorityError"
      );

    // Clear errors
    nameError.textContent = "";

    descriptionError.textContent =
      "";

    assignedError.textContent = "";

    dateError.textContent = "";

    statusError.textContent = "";

    priorityError.textContent = "";

    let isValid = true;

    // Validation
    if (taskName === "") {

      nameError.textContent =
        "Task name is required";

      isValid = false;

    }

    if (description === "") {

      descriptionError.textContent =
        "Description is required";

      isValid = false;

    }

    if (assignedTo === "") {

      assignedError.textContent =
        "Assigned person is required";

      isValid = false;

    }

    if (dueDate === "") {

      dateError.textContent =
        "Due date is required";

      isValid = false;

    }

    if (status === "") {

      statusError.textContent =
        "Select status";

      isValid = false;

    }

    if (priority === "") {

      priorityError.textContent =
        "Select priority";

      isValid = false;

    }

    // Add Task
    if (isValid) {

      taskManager.addTask(
        taskName,
        description,
        assignedTo,
        dueDate,
        status,
        priority
      );

      // Reset form
      taskForm.reset();

    }

  }
);

// Sample Tasks
taskManager.addTask(
  "Frontend UI",
  "Create Bootstrap wireframe",
  "Arun",
  "2026-05-20",
  "TODO",
  "LOW"
);

taskManager.addTask(
  "Validation",
  "Add JavaScript validation",
  "Kumar",
  "2026-05-21",
  "IN PROGRESS",
  "MEDIUM"
);

taskManager.addTask(
  "Testing",
  "Test all features",
  "Rahul",
  "2026-05-22",
  "REVIEW",
  "URGENT"
);