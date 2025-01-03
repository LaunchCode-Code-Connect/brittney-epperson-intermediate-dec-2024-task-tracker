# Task Tracker

**Note:** This project is still in development and is not yet ready for sharing.

## Overview

This project is a task tracking application developed per requirements from the LaunchCode Connect organization. The application allows users to manage tasks, collaborate with team members, and receive notifications about task updates. The project uses a React front end with Next.js, a Java Spring Boot back end, and a MySQL database.

## Technologies Used

- **Front-End:**
  - React
  - Next.js

- **Back-End:**
  - Java Spring Boot

- **Database:**
  - MySQL

## Features Implemented

### Front-End

- **User Interface (UI):**

  - **Authentication Pages:**
    - User login functionality.
    - Password reset functionality.
  - **Dashboard:**
    - Overview of assigned tasks and notifications.
  - **Task Management:**
    - Create, edit, and delete tasks.
    - Assign tasks to oneself or team members.
    - Set task priorities and due dates.
    - Mark tasks as complete or in-progress.
  - **Notifications:**
    - In-app notifications for task assignments and updates.

### Back-End

- **APIs and Endpoints:**
  - **Authentication API:**
    - Secure user authentication (login).
    - Token-based authentication (JWT).
    - Email verification for new user registration.
    - Password reset functionality.
  - **Task Management API:**
    - CRUD operations for tasks.
    - Assigning and reassigning tasks.
    - Updating task status and progress.
  - **Notification API:**
    - Generate and retrieve notifications.

- **Database:**
  - **Entities:**
    - Users
    - Tasks
    - Notifications
    - Teams
    - Comments
  - **Relationships:**
    - Users can have multiple tasks.
    - Tasks are assigned to users.
    - Notifications are associated with tasks and users.
    - Users can belong to multiple teams.
    - Tasks can have multiple comments.
  - **Security:**
    - Input validation and sanitization to prevent SQL injection and XSS attacks.
    - Secure password storage (e.g., hashing with salt).
  - **Scalability:**
    - Implementing pagination for lists of users.


## Project Setup

### Prerequisites

- Node.js
- Java Development Kit (JDK)
- MySQL

### Front-End Setup

1. Clone the repository:
   ```
   git clone https://github.com/LaunchCode-Code-Connect/brittney-epperson-intermediate-dec-2024-task-tracker.git
   cd task-tracker/frontend/task-tracker
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```
### Back-End Setup

1. Clone the repository (if not already done):
    ```
    git clone https://github.com/LaunchCode-Code-Connect/brittney-epperson-intermediate-dec-2024-task-tracker.git
    cd task-tracker/backend/task-tracker
    ```

2. Configure the MySQL database:
    - Create a database named task_tracker.
    - Update the application.properties file with your MySQL database credentials.

3. Build and run the Spring Boot application using Gradle:
    ```
    ./gradlew bootRun
    ```
## Usage
Open your browser and navigate to http://localhost:3000 to access the front-end application.
Log in with your credentials to access the dashboard and manage tasks.

## Next Steps
The following features and enhancements are planned:

### Team Collaboration:
- Create and manage teams.
- Invite users to join teams via email.
- Real-time chat or comment section for each task.
### Additional Features:
- Email notifications for critical updates.
- Real-time updates using WebSockets.
- Analytics dashboard for task progress and team productivity.
### Security Enhancements:
- Complete input validation and sanitization to prevent SQL injection and XSS attacks.
### Scalability:
- Structuring the application to handle an increasing number of users and tasks.
- Implementing pagination for lists of tasks.

## Conclusion
This project demonstrates the implementation of a full-stack task tracking application using modern web development technologies. While the project is not yet complete, it includes core features such as task management, user authentication, and notifications. Future enhancements will focus on team collaboration and additional functionalities.

One of the key learning experiences in this project was implementing email verification for user authentication. This was my first time setting up email verification, and it provided valuable insights into enhancing security and user experience in web applications.

By completing this project, I have gained hands-on experience in developing a full-stack application that addresses real-world collaboration needs. The project showcases my ability to integrate front-end and back-end technologies, manage complex data relationships in a database, and implement robust authentication mechanisms.
