# Notes App

## Description
This project is a simple Notes App built using Express.js as the backend and React.js for the frontend. It allows users to create, update, delete, and view notes. The backend is designed with a REST API architecture, interacting with a database using Prisma ORM. The frontend provides an intuitive user interface for interacting with the notes.

## Features
- **Create Notes**: Add new notes with a title and content.
- **View Notes**: Display all notes in a grid layout.
- **Update Notes**: Edit the content of existing notes.
- **Delete Notes**: Remove notes that are no longer needed.

## Tech Stack
- **Backend**: Express.js, Prisma ORM, Node.js
- **Frontend**: React.js, HTML, CSS
- **Database**: postgreSQL - a single table with "id", "title" and "content" columns

## Installation

### Prerequisites
- Node.js
- npm or Yarn
- Git (for cloning the repository)
- .env file to be placed at the root of the server folder with database credentials eg. DATABASE_URL="your_database_connection_string"

### Steps

1. **Clone the repository**
    ```
    git clone [repository-url]
    ```

2. **Navigate to the project directory**
    ```
    cd [project-directory]
    ```

3. **Install Backend Dependencies**
    ```
    cd backend
    npm install
    ```

4. **Start the Backend Server**
    ```
    npm start
    ```

5. **Install Frontend Dependencies**
    ```
    cd frontend
    npm install
    ```

6. **Start the Frontend Application**
    ```
    npm start
    ```

## Usage

After starting both the backend and frontend, navigate to `http://localhost:3000` in your web browser to use the app.

- To **add a note**, fill in the title and content in the form and click 'Save Note'.
- To **edit a note**, click on any note from the grid to load it into the form, modify as needed, and then click 'Save Edit'.
- To **delete a note**, click the 'x' button on the top right corner of the note in the grid.

## API Endpoints

The backend supports several routes:

- `GET /api/notes`: Fetches all notes.
- `POST /api/notes`: Creates a new note.
- `PUT /api/notes/:id`: Updates an existing note.
- `DELETE /api/notes/:id`: Deletes a note.

