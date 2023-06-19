# TASK MANAGEMENT BACKEND

It is a backend for task management, build in Nodejs and Express js, Database used in MySQL
Here, user can register, login, create his task, view task and delete his task


## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file and the file must be at root directory

`PORT` = Port Number

`DB_NAME` = MySQL database name

`DB_USERNAME` = MySQL username

`DB_PASSWORD` = MySQL password

`JWT_SECRET` = A string

`JWT_EXPIRE` = an Intezer with 'd' at the end

`COOKIE_EXPIRE` = an Intezer


## Installation

Steps to start the project, after cloning add `.env` file then start the server

```bash
  git clone https://github.com/Saurabh9678/Task_Management_Backend.git
  cd Task_Management_Backend
  npm install 
  npm start
```
    
    
## API Reference
Refer to 
[API Documentation](https://documenter.getpostman.com/view/22900446/2s93sgVVD2) for better understanding of the API endpoints and the responses on different scenarios


#### REGISTER USER

```http
  POST /api/v1/user/register
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. username to identify the user |
| `password`      | `string` | **Required**. password for authentication |

#### LOGIN USER

```http
  POST /api/v1/user/login
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. username to identify the user |
| `password`      | `string` | **Required**. password for authentication |


#### CREATE TASK 

```http
  POST /api/v1/user/createTask
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required** |
| `description`      | `string` | **Required** |

#### GET USER ALL TASK 

```http
  GET /api/v1/user/tasks
```

#### DELETE USER SINGLE TASK

```http
  DELETE /api/v1/user/task/${taskId}
```

| PARAMETER | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `taskId`      | `string` | **Required**, To identify the task and delete that particular task  |







