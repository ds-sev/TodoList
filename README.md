# TodoList

[GitHub-pages Deploy](https://ds-sev.github.io/TodoList/)

## Project description

This project is a task list application with extended functionality. Upon first entry, the user is directed to the registration page where they can create an account to store their data. The authentication forms have validation to prevent input errors and disable the submit button when the data is invalid. If there are input errors, the user sees a message indicating the mistake. After successful registration, the user is redirected to the login page where they need to enter the email and password for the previously created account. After logging in, the user is redirected to the main page of the application. Here, they have access to tools such as creating task and categories, editing it, and marking them as complete. Features such as visual display of tasks with approaching deadlines, priority, deadline's date, and deletion are available. A confirmation popup is provided to prevent accidental deletion of tasks and categories. All data is stored in local storage without a separate backend server using.
<p align="center"><img src="https://github.com/ds-sev/TodoList/assets/99210830/623652a6-4e01-4ad2-b3a4-83d9088202d9" width="700px"></p>

## Tech's:

 - Angular 17
 - TypeScript
 - Standalone Components
 - Reactive Typed Forms
 - Angular Signals
 - RxJS
 - PrimeNg v17
 - SCSS
 - Local Storage
 - BEM-naming


## Features:

- Validation for input fields
- Editing for tasks and categories
- Confirmation request before delete task or category
- Sorting tasks in table by name, category, deadline-date, readiness and priority
- Quick search by task name. A list of matches appears as user enter a search-query
- Filter tasks by name, category, priority, range of dates and other. Displaying the number of found tasks.
- Minimalistic design
- Adaptive page-view for different devices
- Convenient use on small-diagonal mobile devices (advanced functionality is available in landscape screen orientation)

## Project setup:

  1. Clone this repository to your local folder:
```
git clone https://github.com/ds-sev/TodoList.git
```
  2. Navigate to the project directory:
```
cd TodoList
```
  3. Install project dependencies:
```
npm install
```
  4. Start the development server:
```
ng serve
```
  5. Open browser and go to:
```
http://localhost:4200
```
