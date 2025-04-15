Task Manager Tutorial Project

Overview

This repository contains a full MEAN Stack Task Manager application built for the COMP2106 tutorial on unit testing. The app is split into two parts:
	•	Backend: A Node.js/Express API with MongoDB (using Mongoose) for data storage.
	•	It exposes a RESTful API for CRUD operations on tasks.
	•	Unit tests for models, controllers, and routes are written using Mocha and Chai.
	•	Frontend: An Angular application built using standalone components (no NgModule).
	•	It includes components for displaying tasks (TaskListComponent) and adding new tasks (TaskFormComponent).
	•	A TaskService uses HttpClient to interact with the backend.
	•	Unit tests are written using Jasmine and run via Karma.

This demo application (Task Manager) allows users to add, list, update (mark as complete), and delete tasks. It is designed to provide a clear and realistic example of unit testing at both frontend and backend layers.

⸻

Repository Structure

task-manager-tutorial/
├─ backend/
│  ├─ app.js                    # Entry point for the Express server
│  ├─ .env.example              # Environment variable example for backend
│  ├─ package.json              # Backend dependencies and scripts
│  ├─ models/
│  │  └─ Task.js                # Mongoose Task model
│  ├─ controllers/
│  │  └─ taskController.js      # Controller functions for task operations
│  ├─ routes/
│  │  └─ tasks.js               # Express routes for tasks
│  └─ test/
│     └─ task.model.test.js     # Sample unit tests for the Task model
└─ frontend/
   ├─ package.json              # Angular dependencies and scripts
   ├─ angular.json              # Angular CLI configuration
   ├─ src/
   │  ├─ index.html             # Main HTML page for Angular app
   │  ├─ main.ts                # Bootstraps the Angular app
   │  └─ app/
   │     ├─ app.config.ts       # Application configuration (providers)
   │     ├─ app.component.ts    # Root component
   │     ├─ app.component.html  # Root component template
   │     ├─ app.component.css   # Root component styles
   │     ├─ models/
   │     │  └─ task.model.ts    # Task model interface
   │     ├─ services/
   │     │  ├─ task.service.ts  # Service to interact with backend API
   │     │  └─ task.service.spec.ts # Unit tests for TaskService
   │     └─ tasks/
   │        ├─ task-list.component.ts       # Component to list tasks
   │        ├─ task-list.component.html     # Template for task list
   │        ├─ task-list.component.css      # Styles for task list
   │        ├─ task-list.component.spec.ts  # Unit tests for TaskListComponent
   │        ├─ task-form.component.ts       # Component to add tasks
   │        ├─ task-form.component.html     # Template for task form
   │        └─ task-form.component.css      # Styles for task form
   └─ ... (other Angular configuration files)



⸻

Local Setup Instructions

Prerequisites
	•	Node.js (v14 or later is recommended; note that odd-numbered versions are non‑LTS)
	•	npm (comes with Node.js)
	•	Angular CLI (for frontend): Install globally using npm install -g @angular/cli
	•	MongoDB: A local MongoDB instance or a connection string for a remote MongoDB (such as MongoDB Atlas)

Backend Setup
	1.	Open a terminal and navigate to the backend folder:

cd backend


	2.	Create a .env file for environment variables. Use the provided .env.example as a template. For example:
.env.example

MONGODB_URI=mongodb://localhost:27017/taskmanager //your mongodb cluster connection string
PORT=3000

Copy the file:

cp .env.example .env

Edit .env if necessary with your MongoDB connection string and desired port.

	3.	Install backend dependencies:

npm install


	4.	Start the backend server:

npm start


	5.	To run the backend unit tests (using Mocha/Chai):

npm test



Frontend Setup
	1.	Open another terminal window and navigate to the frontend folder:

cd frontend


	2.	Install frontend dependencies:

npm install


	3.	Start the Angular development server:

ng serve --open 

	4.	To run the frontend unit tests (using Jasmine/Karma):

ng test

