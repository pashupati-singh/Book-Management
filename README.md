# Book-Management

## Book Management Server
This server-side application provides endpoints for managing books and user authentication/authorization.

## Deploy

deployed link : https://book-management-2.onrender.com/ (On Render)

## Authentication and Authorization
Users can register and login to access the book management functionalities. JWT tokens are used for authentication, and bcrypt is employed to hash passwords before storing them in the database.

## User Routes

Base Route: /users

POST /register: Register a new user.

POST /login: Login a user.


## Book Management Routes
Base Route: /books

GET /: Get a list of all books.

POST /add: Add a new book. Requires authorization.

DELETE /:id: Delete a book by ID. Requires authorization.

PUT /:id: Update a book by ID. Requires authentication and authorization.

## Endpoints

Register a New User

POST /users/register

Register a new user by providing a name, email, and password in the request body.


Login User

POST /users/login

Login a registered user by providing their email and password in the request body.


Get All Books

GET /books

Retrieve a list of all books.

Add a New Book

POST /books/add

Add a new book by providing the book details in the request body. Authentication is required.

Delete a Book

DELETE /books/delete/:id

Delete a book by its ID. Requires authentication and authorization. Only the user who added the book can perform this action.

Update a Book

PATCH /books/update/:id

Update a book by its ID. Requires authentication and authorization. Only the user who added the book can perform this action.

## Documentation with Swagger
Swagger documentation is available for the API. Follow these steps to run the server and access the documentation:

## Clone this repository.
https://github.com/pashupati-singh/Book-Management.git
Install dependencies using npm install.

Set up your environment variables in a .env file.

Start the server using npm run server.

Access Swagger documentation at http://localhost:8080/docs.


## Technologies Used

Node.js

Express.js

MongoDB (or any database of your choice)

JSON Web Tokens (JWT) for authentication

Bcrypt for password hashing
