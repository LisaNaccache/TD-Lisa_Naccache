# Frontend - Angular Application

![Node.js](https://img.shields.io/badge/Node.js-v16%2B-green)
![Angular](https://img.shields.io/badge/Angular-18.2.0-red)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.2-orange)

## Description

This project serves as the frontend part of the application. It is built with Angular and includes several components to manage Todos and dynamic number manipulations. It interacts with the backend API for data exchange.

---

## Installation

### Prerequisites
- **Node.js**: v16 or higher
- **Angular CLI**: v18.2.10
  - Install it globally using:
    ```bash
    npm install -g @angular/cli@18.2.10
    ```
- **NPM**: Installed automatically with Node.js
- **TypeScript**: v5.5.2

### Install dependencies
- npm install

---

## Run scripts

### Start the application
ng serve

Default address: http://localhost:4200

### Build the application
ng build

---

## Database Requirements
The frontend application interacts with a backend API that relies on a PostgreSQL database. Ensure that the backend is set up and running before starting the frontend:

1. Install and configure PostgreSQL.
2. Run the backend server to make the API available.
3. Update the proxy.conf.json file if the backend runs on a custom port.

## Project Structure

### Key Files and Folders :

> ***Components***
>- **`todos`** : Loads the list of Todos from the backend API and displays them.
>- **`lesson-edit-form`** : Displays a form to edit lesson details.
>- **`test-page1`** : A dynamic component to manipulate and display a number `(numberValue)`.
>- **`navbar`** : Implements the navigation bar for the application.

> ***Services***
>- **`todo.service.ts`** : Handles API interactions for Todo-related operations.
>- **`user-settings.service.ts`** : Manages user settings in the application.

> ***Routes***
>- **`app.routes.ts`** : Defines the application's routes for navigation between components.

> ***Data Models and Interfaces***
>- **`interfaces/todo-dto.ts`** : Data Transfer Object interface for the Todo component.
>- **`models/todo.model.ts`** : Defines the Todo model structure.

> ***Generated API Client***
>- **`generated/`** : Contains files automatically generated using Swagger Codegen to simplify interaction with the backend API.
>- These files were generated using: 
> ```java -jar swagger-codegen-cli-3.0.63.jar generate -h```

> ***Configuration Files***
>- **`proxy.conf.json`** : Used for configuring a proxy to route API calls to the backend during development.
>- **`package.json`**: Defines project metadata, dependencies, and scripts.
>- **`package-lock.json`**: Ensures consistent dependency versions.
>- **`tsconfig.json`**: Global TypeScript configuration for the project.
>- **`tsconfig.app.json`**: TypeScript configuration for application code.
>- **`tsconfig.spec.json`**: TypeScript configuration for test files.

---

## Features
- Dynamic manipulation of numbers in `test-page1` using multiple input methods and buttons.
- Integration with backend `APIs` for Todos and Lessons.
- `Generated API client` for easier backend interaction. 
- Modular structure for easy scalability.

---

## Testing Files

The following files are exclusively used for testing purposes:

- test-page1.component.spec.ts
- todo-list-page.component.spec.ts

---
