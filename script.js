"use strict";

let tasks_list = [
  {
    task_id: 1,
    task_name: "Write unit tests",
    task_desc: "Cover auth and payment modules with tests.",
    task_priority: "medium",
    task_status: "completed",
    date: "2026-03-02",
  },
  {
    task_id: 2,
    task_name: "Update dependencies",
    task_desc: "Bump all packages to latest stable verisons.",
    task_priority: "low",
    task_status: "completed",
    date: "2026-03-03",
  },
  {
    task_id: 3,
    task_name: "Implement dark mode",
    task_desc: "Add theme toggle with CSS custom properties",
    task_priority: "medium",
    task_status: "completed",
    date: "2026-03-04",
  },
  {
    task_id: 4,
    task_name: "Set up CI/CD pipeline",
    task_desc: "Configure Github Actions for auto deploy.",
    task_priority: "medium",
    task_status: "completed",
    date: "2026-03-05",
  },
  {
    task_id: 5,
    task_name: "Create user dashboard",
    task_desc: "Build the analytics dashboard for end users.",
    task_priority: "high",
    task_status: "in-progress",
    date: "2026-03-06",
  },
  {
    task_id: 6,
    task_name: "Performance audit",
    task_desc: "Run Lighthouse and fix critical issues.",
    task_priority: "medium",
    task_status: "in-progress",
    date: "2026-03-07",
  },
  {
    task_id: 7,
    task_name: "Fix login redirect bug",
    task_desc: "Users are redirected to 404 after OAuth login.",
    task_priority: "high",
    task_status: "in-progress",
    date: "2026-03-08",
  },
  {
    task_id: 8,
    task_name: "Database migration",
    task_desc: "Migrate user table to new schema.",
    task_priority: "high",
    task_status: "to-do",
    date: "2026-03-09",
  },
  {
    task_id: 9,
    task_name: "Design homepage wireframe",
    task_desc: "Create low-fi wireframes for the new landing page.",
    task_priority: "high",
    task_status: "in-progress",
    date: "2026-03-10",
  },
  {
    task_id: 10,
    task_name: "Code review: auth module",
    task_desc: "Review PR #42 for security issues.",
    task_priority: "medium",
    task_status: "in-progress",
    date: "2026-03-19",
  },
  {
    task_id: 11,
    task_name: "Onboard new developer",
    task_desc: "Pair programming session + codebase walkthrough.",
    task_priority: "low",
    task_status: "to-do",
    date: "2026-03-20",
  },
  {
    task_id: 12,
    task_name: "Write API documentation",
    task_desc: "Document all REST endpoints with examples.",
    task_priority: "low",
    task_status: "to-do",
    date: "2026-03-28",
  },
];

// ------------------------------------------------------------------element selections

// dark / light mode selections
const dark_mode = document.getElementById("dark-mode-toggle");
const dark_mode_svgs = dark_mode.querySelectorAll("svg");
const light_mode_icon = dark_mode_svgs[0];
const dark_mode_icon = dark_mode_svgs[1];

// task element selections
const task_container = document.getElementById("task-container");
const task_tabs = document.querySelectorAll(".task-tab");

// sort element selections
const btn_sort = document.getElementById("btn-sort");
const sort_menu = document.getElementById("sort-menu");
const sort_date = document.getElementById("sort-by-date");
const sort_priority = document.getElementById("sort-by-priority");
const sort_name = document.getElementById("sort-by-name");

// mobile element selections
const mobile_menu = document.getElementById("mobile-sidebar");
const hamburger_toggle = document.getElementById("sidebar-toggle");
const overlay = document.getElementById("overlay");

// user profile elements selections
const user_profile = document.getElementById("user-profile");
const user_profile_options = document.getElementById("user-profile-options");

// add new task elements selections
const new_task_form = document.getElementById("new-task-form");
const btn_add_task = document.getElementById("btn-add-task");
const btn_mobile_add_task = document.getElementById("btn-mobile-add-task");
const btn_close_form = document.getElementById("close-task-form");
const btn_new_task_submit = document.getElementById("new-task-submit");
const btn_new_task_cancel = document.getElementById("new-task-cancel");
const taskForm = document.querySelector("form");
const success_msg = document.getElementById("success-msg");

//------------------------------------------------------------------ Variable declarations

let to_do_task_list = [];
let in_progress_task_list = [];
let completed_task_list = [];

let total_tasks, in_progress_tasks, completed_tasks;

let status_text_color,
  status_bg_color,
  status_text,
  status_btn = "";

// ---------------------------------------------------------------<<<<<<<<<<<<<<< Functions
// Tab list update function
function tab_lists_update() {
  to_do_task_list = tasks_list.filter((task) => {
    return task.task_status === "to-do";
  });
  in_progress_task_list = tasks_list.filter((task) => {
    return task.task_status === "in-progress";
  });
  completed_task_list = tasks_list.filter((task) => {
    return task.task_status === "completed";
  });
  stats_update();
}

// Statistics Function
function stats_update() {
  total_tasks = document.getElementById("total-tasks");
  total_tasks.textContent = tasks_list.length;

  in_progress_tasks = document.getElementById("in-progress-tasks");
  in_progress_tasks.textContent = in_progress_task_list.length;

  completed_tasks = document.getElementById("completed-tasks");
  completed_tasks.textContent = completed_task_list.length;

  // Calculate amount of dates from last week and due dates
  const today = new Date();
  const lastWeek = new Date();
  const thisWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);
  thisWeek.setDate(today.getDate() + 7);

  const lastWeek_count = tasks_list.filter((task) => {
    const taskDate = new Date(task.date);
    return taskDate >= lastWeek && taskDate <= today;
  }).length;

  const thisWeek_count = tasks_list.filter((task) => {
    const taskDate = new Date(task.date);
    if (task.task_status === "in-progress") return taskDate >= today && taskDate <= thisWeek;
  }).length;

  const overdue = tasks_list.filter((task) => {
    const taskDate = new Date(task.date);
    if (task.task_status === "in-progress") return taskDate <= today;
  }).length;

  const last_week_tasks = document.getElementById("last-week-tasks");
  last_week_tasks.textContent = "+" + lastWeek_count;

  const this_week_tasks = document.getElementById("this-week-tasks");
  this_week_tasks.textContent = thisWeek_count;

  const overdue_tasks = document.getElementById("overdue-tasks");
  overdue_tasks.textContent = overdue;

  // Calculate completion rate
  const completion_rate = (completed_task_list.length / tasks_list.length) * 100;
  const completion = document.getElementById("completion-rate");
  completion.textContent = Math.round(completion_rate);
}

// task card status functions
function set_status_todo() {
  status_text_color = "text-text-500";
  status_bg_color = "bg-background-50";
  status_text = "To Do";
  status_btn = "Mark In Progress";
}

function set_status_inprogress() {
  status_text_color = "text-blue-500";
  status_bg_color = "bg-blue-500/10";
  status_text = "In Progress";
  status_btn = "Mark Completed";
}

function set_status_completed() {
  status_text_color = "text-green-500";
  status_bg_color = "bg-green-500/10";
  status_text = "Completed";
  status_btn = "Undo";
}

// task card generate function
function task_card(tasks_list, task_container) {
  task_container.innerHTML = "";
  for (const task of tasks_list) {
    // check task status
    let status_complete_text_color = "text-text-900";
    let status_complete_text_deco = "";

    if (task.task_status.toLowerCase() === "to-do") {
      set_status_todo();
    } else if (task.task_status.toLowerCase() === "in-progress") {
      set_status_inprogress();
    } else {
      set_status_completed();
      status_complete_text_color = "text-text-500";
      status_complete_text_deco = "line-through";
    }

    // check task priority
    let priority_text_color,
      priority_bg_color,
      priority_ring_color,
      priority_text = "";

    if (task.task_priority.toLowerCase() === "low") {
      priority_text_color = "text-green-500";
      priority_bg_color = "bg-green-500/10";
      priority_ring_color = "ring-green-200/80";
      priority_text = "Low";
    } else if (task.task_priority.toLowerCase() === "medium") {
      priority_text_color = "text-amber-500";
      priority_bg_color = "bg-amber-500/10";
      priority_ring_color = "ring-amber-200/80";
      priority_text = "Medium";
    } else {
      priority_text_color = "text-rose-500";
      priority_bg_color = "bg-rose-500/10";
      priority_ring_color = "ring-rose-200/80";
      priority_text = "High";
    }

    //format date
    const date_obj = new Date(task.date);
    const formatted_date = date_obj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    task_container.innerHTML += `
              <!-- Task card -->
              <article id="task-${task.task_id}" class="task-card flex flex-col justify-center items-start border border-background-200/50 rounded-xl p-4 hover:shadow-md transition-all duration-200">
                <div class="flex w-full justify-between items-start">
                  <div class="flex flex-col items-start gap-2">
                    <p id="task-name" class="task-name ${status_complete_text_color} ${status_complete_text_deco} text-sm font-semibold">${task.task_name}</p>
                    <p id="task-description" class="text-text-500 text-xs">${task.task_desc}</p>
                    <div class="flex gap-2 justify-start items-center text-xs mt-1">
                      <!-- Priority badge -->
                      <div class="">
                        <p class="text-[11px] font-medium tracking-wide ${priority_text_color} ${priority_bg_color} ring-1 ${priority_ring_color} py-0.5 px-2 rounded-full">${priority_text}</p>
                      </div>
                      <!-- Progress badge -->
                      <div class="progress-badge">
                        <p class="text-[11px] font-medium ${status_text_color} ${status_bg_color} py-0.5 px-2 rounded-full tracking-wide">${status_text}</p>
                      </div>
                    </div>
                  </div>
                  <div id="delete-${task.task_id}" class="delete-task text-text-500 lg:hover:text-rose-500 lg:hover:bg-rose-500/10 active:text-rose-500 active:bg-rose-500/10 lg:opacity-0 rounded-lg p-1 cursor-pointer transition-opacity duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </div>
                </div>
                <div class="flex justify-between items-center border-t border-background-200/50 w-full pt-4 mt-4">
                  <p id="date" class="text-text-500 text-[11px]">${formatted_date}</p>
                  <button id="btn-${task.task_id}"><span class="text-text-900 text-[11px] font-medium border rounded-lg border-background-200/50 px-2 py-1 hover:bg-background-100/50 dark:hover:bg-background-200 cursor-pointer">${status_btn}</span></button>
                </div>
              </article>
    `;
  }
  task_card_features();
}

// task card btn features function
function task_card_features() {
  const task_card_list = document.querySelectorAll(".task-card");

  // implement status switch btn
  task_card_list.forEach((card, i) => {
    const btn_status_switch = card.querySelector("button");
    const progress_badge = card.querySelector(".progress-badge");
    const delete_task = card.querySelector(".delete-task");

    // Delete btn toggle over mouse pointer hover
    card.addEventListener("mouseover", () => {
      delete_task.classList.replace("lg:opacity-0", "lg:opacity-100");
    });
    card.addEventListener("mouseout", () => {
      delete_task.classList.replace("lg:opacity-100", "lg:opacity-0");
    });

    // Change status with btn click event
    btn_status_switch.addEventListener("click", (e) => {
      // Extract the unique task id of the clicked task
      const btn_Id = e.currentTarget.id;
      const task_Id = Number(btn_Id.split("-")[1]);
      const task = tasks_list.find((t) => t.task_id === task_Id);

      if (btn_status_switch.textContent.toLowerCase() === "undo") {
        set_status_todo();
        task.task_status = "to-do";
        card.querySelector(".task-name").classList.remove("line-through");
        card.querySelector(".task-name").classList.replace("text-text-500", "text-text-900");
      } else if (btn_status_switch.textContent.toLowerCase() === "mark in progress") {
        set_status_inprogress();
        task.task_status = "in-progress";
        card.querySelector(".task-name").classList.remove("line-through");
        card.querySelector(".task-name").classList.replace("text-text-500", "text-text-900");
      } else {
        set_status_completed();
        task.task_status = "completed";
        card.querySelector(".task-name").classList.add("line-through");
        card.querySelector(".task-name").classList.replace("text-text-900", "text-text-500");
      }

      progress_badge.innerHTML = `<p class="text-[11px] font-medium ${status_text_color} ${status_bg_color} py-0.5 px-2 rounded-full tracking-wide">${status_text}</p>`;
      btn_status_switch.innerHTML = `<span class="text-text-900 text-[11px] font-medium border rounded-lg border-background-200/50 px-2 py-1 hover:bg-background-100/50 dark:hover:bg-background-200 cursor-pointer">${status_btn}</span>`;

      tab_lists_update();
      if (!task_tabs[0]?.classList.contains("tab-active")) {
        card.remove();
      }
    });

    // Delete task with btn click event
    delete_task.addEventListener("click", (e) => {
      const btn_Id = e.currentTarget.id;
      const task_Id = Number(btn_Id.split("-")[1]);

      tasks_list = tasks_list.filter((task) => task.task_id != task_Id);
      tab_lists_update();
      card.remove();
    });
  });
}

// generate tasks for all tabs function
function filter_tasks() {
  task_card(tasks_list, task_container);
  tab_lists_update();

  const active_tab_classes = ["tab-active"];
  const inactive_tab_classes = ["tab-inactive"];

  task_tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tab_lists_update();
      // Remove active classes for every tab
      task_tabs.forEach((t) => {
        t.classList.remove(...active_tab_classes);
        t.classList.add(...inactive_tab_classes);
      });

      // Add active classes to the clicked tab
      tab.classList.add(...active_tab_classes);
      tab.classList.remove(...inactive_tab_classes);

      if (tab.textContent === "Completed") {
        task_card(completed_task_list, task_container);
      } else if (tab.textContent === "To Do") {
        task_card(to_do_task_list, task_container);
      } else if (tab.textContent === "In Progress") {
        task_card(in_progress_task_list, task_container);
      } else {
        task_card(tasks_list, task_container);
      }
    });
  });
}

// Search function
function search_tasks() {
  const search_val = document.getElementById("search-tasks");

  // Search values for each tab, real-time, when the user types
  search_val.addEventListener("input", (e) => {
    let search_item = e.target.value.toLowerCase();

    if (task_tabs[0]?.classList.contains("tab-active")) {
      const result_arr = tasks_list.filter((task) => {
        const t_name = task.task_name.toLowerCase();
        return t_name.includes(search_item);
      });
      task_card(result_arr, task_container);
    } else if (task_tabs[1]?.classList.contains("tab-active")) {
      tab_lists_update();
      const result_arr = to_do_task_list.filter((task) => {
        const t_name = task.task_name.toLowerCase();
        return t_name.includes(search_item);
      });
      task_card(result_arr, task_container);
    } else if (task_tabs[2]?.classList.contains("tab-active")) {
      tab_lists_update();
      const result_arr = in_progress_task_list.filter((task) => {
        const t_name = task.task_name.toLowerCase();
        return t_name.includes(search_item);
      });
      task_card(result_arr, task_container);
    } else {
      tab_lists_update();
      const result_arr = completed_task_list.filter((task) => {
        const t_name = task.task_name.toLowerCase();
        return t_name.includes(search_item);
      });
      task_card(result_arr, task_container);
    }
  });
}

// Sort Tasks function
function sort_tasks(arr, criteria) {
  let sorted_arr;

  if (criteria === "date") {
    if (!sort_date.classList.contains("sort-active")) {
      sorted_arr = [...arr].sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      sorted_arr = [...arr];
    }
  } else if (criteria === "priority") {
    // mapping object for priorities
    const priority_order = { high: 1, medium: 2, low: 3 };
    if (!sort_priority.classList.contains("sort-active")) {
      sorted_arr = [...arr].sort((a, b) => priority_order[a.task_priority] - priority_order[b.task_priority]);
    } else {
      sorted_arr = [...arr];
    }
  } else if (criteria === "name") {
    if (!sort_name.classList.contains("sort-active")) {
      sorted_arr = [...arr].sort((a, b) => a.task_name.localeCompare(b.task_name));
    } else {
      sorted_arr = [...arr];
    }
  }

  return sorted_arr;
}

// Toggle Add-New-Task form upon button click function
function toggle_new_task_form(button) {
  button.addEventListener("click", () => {
    const isHidden = new_task_form.classList.contains("opacity-0");

    if (!isHidden) {
      new_task_form.classList.replace("opacity-100", "opacity-0");
      new_task_form.classList.replace("pointer-events-auto", "pointer-events-none");
      taskForm.classList.replace("pointer-events-auto", "pointer-events-none");
    } else {
      new_task_form.classList.replace("opacity-0", "opacity-100");
      new_task_form.classList.replace("pointer-events-none", "pointer-events-auto");
      taskForm.classList.replace("pointer-events-none", "pointer-events-auto");
    }
  });
}

// Close add new task form function
function close_form() {
  new_task_form.classList.replace("opacity-100", "opacity-0");
  new_task_form.classList.replace("pointer-events-auto", "pointer-events-none");
  taskForm.classList.replace("pointer-events-auto", "pointer-events-none");

  // Reset success message state for next time
  success_msg.classList.add("max-h-0", "opacity-0");
  success_msg.classList.remove("max-h-20", "opacity-100", "mt-2");

  // Reset form for the next time
  taskForm.reset();
}

// ------------------------------------------------------------------- Initialize

// Initialize task container - important for filtering for tabs
filter_tasks();
search_tasks();

// ------------------------------------------------------------ dark mode toggle
dark_mode.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  [light_mode_icon, dark_mode_icon].forEach((svg) => {
    svg.classList.toggle("hidden");
  });
});

// ------------------------------------------------------------ Mobile Menu toggle

hamburger_toggle.addEventListener("click", () => {
  Array.from(hamburger_toggle.children).forEach((child) => {
    child.classList.toggle("hidden");
  });
  if (!hamburger_toggle.children[0].classList.contains("hidden")) {
    overlay.classList.replace("opacity-100", "opacity-0");
    overlay.classList.replace("pointer-events-auto", "pointer-events-none");
  } else {
    overlay.classList.replace("opacity-0", "opacity-100");
    overlay.classList.replace("pointer-events-none", "pointer-events-auto");
  }
  mobile_menu.classList.toggle("hidden");
});

// ------------------------------------------------------------ User Profile Sidebar Menu toggle

user_profile.addEventListener("click", () => {
  user_profile_options.classList.toggle("hidden");
});

// ------------------------------------------------------------ Add New Task Menu toggle

toggle_new_task_form(btn_add_task);
toggle_new_task_form(btn_mobile_add_task);

// Close new task form on button press
[btn_new_task_cancel, btn_close_form].forEach((btn) => {
  btn.addEventListener("click", close_form);
});

// ------------------------------------------------------------ Sort function

// Toggle sort menu with click event
btn_sort.addEventListener("click", () => {
  sort_menu.classList.toggle("hidden");
});

// sort by date
sort_date.addEventListener("click", () => {
  [sort_priority, sort_name].forEach((btn) => {
    btn.classList.remove("sort-active");
  });
  tab_lists_update();
  if (task_tabs[0]?.classList.contains("tab-active")) {
    task_card(sort_tasks(tasks_list, "date"), task_container);
  } else if (task_tabs[1]?.classList.contains("tab-active")) {
    task_card(sort_tasks(to_do_task_list, "date"), task_container);
  } else if (task_tabs[2]?.classList.contains("tab-active")) {
    task_card(sort_tasks(in_progress_task_list, "date"), task_container);
  } else if (task_tabs[3]?.classList.contains("tab-active")) {
    task_card(sort_tasks(completed_task_list, "date"), task_container);
  }
  sort_date.classList.toggle("sort-active");
});

// sort by priority
sort_priority.addEventListener("click", () => {
  [sort_date, sort_name].forEach((btn) => {
    btn.classList.remove("sort-active");
  });
  tab_lists_update();
  if (task_tabs[0]?.classList.contains("tab-active")) {
    task_card(sort_tasks(tasks_list, "priority"), task_container);
  } else if (task_tabs[1]?.classList.contains("tab-active")) {
    task_card(sort_tasks(to_do_task_list, "priority"), task_container);
  } else if (task_tabs[2]?.classList.contains("tab-active")) {
    task_card(sort_tasks(in_progress_task_list, "priority"), task_container);
  } else if (task_tabs[3]?.classList.contains("tab-active")) {
    task_card(sort_tasks(completed_task_list, "priority"), task_container);
  }
  sort_priority.classList.toggle("sort-active");
});

// sort by name
sort_name.addEventListener("click", () => {
  [sort_priority, sort_date].forEach((btn) => {
    btn.classList.remove("sort-active");
  });
  tab_lists_update();
  if (task_tabs[0]?.classList.contains("tab-active")) {
    task_card(sort_tasks(tasks_list, "name"), task_container);
  } else if (task_tabs[1]?.classList.contains("tab-active")) {
    task_card(sort_tasks(to_do_task_list, "name"), task_container);
  } else if (task_tabs[2]?.classList.contains("tab-active")) {
    task_card(sort_tasks(in_progress_task_list, "name"), task_container);
  } else if (task_tabs[3]?.classList.contains("tab-active")) {
    task_card(sort_tasks(completed_task_list, "name"), task_container);
  }
  sort_name.classList.toggle("sort-active");
});

// ------------------------------------- Add new task

// Add New Task submission on button click or enter
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const new_task_name = document.getElementById("new-task-name").value;
  const new_task_desc = document.getElementById("new-task-desc").value;
  const new_task_priority = document.getElementById("new-task-priority").value;
  const new_task_status = document.getElementById("new-task-status").value;
  const new_task_date = document.getElementById("new-task-date").value;

  // Add new task dictionary entry
  const new_task = {
    task_id: tasks_list.length + 1,
    task_name: new_task_name,
    task_desc: new_task_desc,
    task_priority: new_task_priority,
    task_status: new_task_status,
    date: new_task_date,
  };

  // Append the new task to the list
  // Update task containers
  tasks_list.push(new_task);
  tab_lists_update();
  filter_tasks();
  search_tasks();

  // Show the success message (this triggers the downward expansion)
  success_msg.classList.remove("max-h-0", "opacity-0");
  success_msg.classList.add("max-h-20", "opacity-100", "mt-2"); // mt-2 adds a little gap

  // Wait 2 seconds, then close the form
  setTimeout(() => {
    close_form();
  }, 2000);
});

// ---------------------------------------FAQ toggles

const faq_blocks = document.querySelectorAll(".faq-block");

faq_blocks.forEach((block) => {
  const answer = block.querySelector("p");

  block.addEventListener("click", () => {
    const isHidden = answer.classList.contains("opacity-0");
    const icon = block.querySelector(".accordion-chevron");

    if (isHidden) {
      answer.classList.replace("max-h-0", "max-h-20");
      answer.classList.replace("opacity-0", "opacity-100");
      answer.classList.add("mx-3", "mb-3");
      icon.style.transform = "rotate(0deg)";
    } else {
      answer.classList.replace("max-h-20", "max-h-0");
      answer.classList.replace("opacity-100", "opacity-0");
      answer.classList.remove("mx-3", "mb-3");
      icon.style.transform = "rotate(180deg)";
    }
  });
});
