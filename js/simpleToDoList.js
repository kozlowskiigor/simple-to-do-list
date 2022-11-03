{
    let tasks = []
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.splice(0, index),
            ...tasks.splice(index + 1),
        ];
        render();
    };

    const toggleTaskDone = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            {
                ...tasks[index],
                done: !tasks[index].done,
            },
            ...tasks.slice(index + 1),
        ];
        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener(".click", () => {
                toggleTaskDone(index)
            });
        });
    };

    const clearInput = () => {
        const formInput = document.querySelector(".js-newTask");

        formInput.value = "";
        formInput.focus();
    };

    const renderTasks = () => {
        const taskToHTML = task => `
                <li class="list__item${task.done && hideDoneTasks ? " list__item--hidden" : ""} js-tasks">

                    <button class="list__button list__button--done js-toggleDone">
                        ${task.done ? "✔" : ""}
                    </button>

                    <span class="list__item--margined ${task.done ? "list__item--done" : ""}">
                        ${task.content}
                    </span>

                    <button class="list__button list__button--remove js-remove">
                    🗑
                    </button>

                </li>
            `;
        const tasksElement = document.querySelector(".js-tasks");
        tasksElement.innerHTML = tasks.map(taskToHTML).join("");
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
            <button 
                class="buttons__button js-toggleHideDoneTasks">
                    ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button
                class="buttons__button js-markAllDone"
                    ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                Ukończ wszystkie
            </button>
        `;
    };

    const bindButtonsEvents = () => {
        const markAllDoneButton = document.querySelector(".js-markAllDone");

        if (markAllDoneButton) {
            markAllDoneButton.addEventListener("click", markAllTasksDone);
        }

        const toggleHideDoneTaskButton = document.querySelector(".js-toggleHideDoneTasks");

        if (toggleHideDoneTaskButton) {
            toggleHideDoneTaskButton.addEventListener("click", toggleHideDoneTasks)
        }
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindToggleDoneEvents();
        bindEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}