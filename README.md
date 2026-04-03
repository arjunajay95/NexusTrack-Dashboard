# NexusTrack 📋

A task management dashboard built with vanilla HTML, Tailwind CSS, and JavaScript. No frameworks, no build tools, just clean code doing real work. Try it live 👉 [NexusTrack Demo](https://arjunajay95.github.io/NexusTrack-Dashboard/)

<div align="center">
  <img width="5000" height="2869" alt="desktop_UI_transparent" src="https://github.com/user-attachments/assets/8c1d8269-aa8e-41d9-9b7f-79190d333f40" />
  <sub>NexuTrack: Desktop User Interface</sub>
</div>

<br>

## Technologies

| Technology                                                                                                     | Role                                                                              |
| -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)                      | Semantic structure throughout                                                     |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | Utility-first styling with a fully custom design system via CSS custom properties |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)       | All interactivity, state management, and DOM manipulation, written from scratch   |
| ![Google Fonts](https://img.shields.io/badge/Google_Fonts-4285F4?style=flat&logo=google&logoColor=white)       | Inter and Lexend for clean, readable typography                                   |

> No React. No Vue. No build pipeline. Just the fundamentals, used well.

<br>

## Features

### 🗂 Task Management

- Create, edit, and delete tasks through modal forms
- Each task card shows the name, description, priority badge, status badge, and due date
- A status progression system moves tasks from **To Do** to **In Progress** to **Completed**, with an undo option
- Completed tasks get a strikethrough so the visual hierarchy stays clean

### 📊 Dashboard Statistics

- Four live stat cards: Total Tasks, In Progress, Completed, and Overdue
- Overdue count automatically excludes completed tasks and is calculated against today's date
- The Overdue card pulses 🔴 when there are active overdue tasks and goes grayscale when there aren't
- Completion rate, last week's task count, and in-progress tasks due this week all update in real time

### 🔍 Filtering and Search

- Tab-based filtering across All, To Do, In Progress, and Completed
- Live search filters by task name or description as you type
- Sort dropdown lets you order tasks by date, priority, or name, and toggles back to default on a second click

### 🎨 UX Details

- 🌙 Full dark mode with an inverted custom color palette, toggled with a single button
- 📱 Responsive layout: sidebar on desktop, a hamburger popover on mobile
- ➕ Floating action buttons on mobile for adding tasks and scrolling to the top
- Smooth card entrance animations using `requestAnimationFrame` with staggered delays
- Delete animations shrink the card out before removing it from the DOM
- Forms close on cancel, overlay click, or the Escape key
- Edit and delete icons fade in on hover for desktop, and stay visible on mobile

<div align="center">
  <img width="2505" height="1561" alt="ipad_UI_transparent" src="https://github.com/user-attachments/assets/9e1a8da0-863a-4de6-97a3-cba3ca7b45d1" />
  <sub>NexuTrack: iPad Mini User Interface (Create Task Menu)</sub>
</div>

<br>

## The Process

NexusTrack started as a capstone project with a defined spec. The goal was to build a functional task dashboard without reaching for a framework. The first decisions were structural: one HTML file, one JS file, and a Tailwind setup that runs in the browser so there's no build step to worry about.

The color system came early. I set up four semantic palettes (text, background, primary, accent) as CSS custom properties, then inverted them for dark mode under a `.dark` class on the root element. That made theming a single toggle rather than a scattered set of overrides throughout the stylesheet.

State management is intentionally made simple. One source-of-truth array holds all tasks. Every action, whether adding, editing, deleting, or switching status, mutates that array and then re-renders the relevant part of the UI. It's not fancy, but it's easy to reason about and debug.

The card animations were a small detail worth getting right. Injecting cards via `innerHTML` and then immediately applying a CSS transition doesn't work because the browser skips the initial state. Wrapping the class changes in `requestAnimationFrame` forces the browser to paint the hidden state first, giving the transition something to animate from.

<br>

## What I Learned

This project was a good reminder that constraints produce clarity. Not having a component model meant thinking carefully about where state lives and how the UI stays in sync with it. It forced clean function boundaries rather than leaning on a framework to handle that for you.

I got a much better feel for CSS custom properties used as a real theming system, not just variables sprinkled here and there. Pairing them with Tailwind's `@theme` directive to create semantic color tokens that work across both light and dark modes was something I hadn't done at this scale before.

The `requestAnimationFrame` trick for CSS entrance animations was a genuine discovery. It's one of those things that seems obvious in hindsight but isn't written up anywhere obvious.

Handling multiple overlapping event contexts (sort state, active tab, live search all needing to stay in sync) taught me to think about state flow more deliberately. A few early bugs came from filters and sorts not knowing about each other, and fixing them required stepping back and mapping the data flow properly.

<div align="center">
  <img width="4000" height="2382" alt="Mobile UI transparent" src="https://github.com/user-attachments/assets/9def52fe-3619-47cb-887d-3ad5ab695c54" />
  <sub>NexuTrack: Mobile User Interface (Edit Task Menu)</sub>
</div>

<br>

## How It Could Be Improved

| Area                          | What's missing                                                                                                 |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| 💾 Persistence                | Tasks live in memory and vanish on refresh. `localStorage` would be the most impactful single fix.             |
| 🆔 Task ID generation         | Currently uses `tasks_list.length + 1`, which breaks after deletions. A UUID or proper counter would fix that. |
| 🔍 Search + Sort coordination | Both work well independently, but combining them isn't fully wired up. A straightforward fix.                  |
| 🖱 Drag and drop              | Reordering tasks manually would be a natural addition, one step away from a full kanban view.                  |
| ♿ Accessibility              | Focus trapping in modals, ARIA labels on icon-only buttons, and keyboard nav through the task grid.            |
| 📅 Date validation            | Nothing stops you from setting a due date in the past. A small form validation pass would tighten that up.     |

<br>

## Running the Project

No build step. No dependencies to install.

```bash
git clone https://github.com/arjunajay95/NexusTrack-Dashboard.git
cd NexusTrack-Dashboard
```

Then open `index.html` in your browser. That's it.

If you want a local dev server with live reload:

```bash
# Using VS Code
# Install the "Live Server" extension, right-click index.html, select "Open with Live Server"

# Or with npx
npx serve .
```

> Tailwind loads via CDN so it works out of the box without any config or compilation.

---

<p align="center">Built with HTML, Tailwind CSS & JavaScript &nbsp;·&nbsp; Arjuna Jayasinghe &nbsp;·&nbsp; NexusTrack © 2026</p>
