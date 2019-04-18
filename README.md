# essentialism-backend

## Table of Contents

- [Deployment](#deployment)
- [Tech Stack](#techStack)
- [Project Summary](#projectSummary)
- [Endpoints (for frontend usage)](#frontEnd)
  - [api/auth](#authEndpoints)
  - [api/createdvalues](#createdValuesEndpoints)
  - [api/defaultvalues](#defaultValuesEndpoints)
  - [api/projects](#projectsEndpoints)
  - [api/uservalues](#uservaluesEndpoints)
- [Table Schema](#tableSchema)

# Deployment <a name="deployment"></a>

- [Backend Deployment](https://essentialism.herokuapp.com/)

# Tech Stack <a name="techStack"></a>

- git - Command line tool used for version control.
- github - Webhosting site for containing repositories and supporting git commands.
- JavaScript - Language/Files used.
- Node - Shorthand for NodeJS,
- Nodemon - Used for Development: Identifies changes made to your code upon saving, and restarts the server.
- Express - Sets up your index/server, middleware, routes, and endpoints.
- Helmet - Hides your techstack in the header front end.
- Cors - allows multiple outside connections to get access via different url/ports.
- knex - Handles Migration Tables, Seeds, Creates database file through client, provides query methods for server endpoints.
- knex-cleaner - Removes data from databases before re-seeding.
- sqlite3 - Generates Local Database File.
- bcryptjs - Handles password hashing.
- dotenv - Handles environment variables.
- jsonwebtoken - Handles tokening for authentication/authorization.
- cross-env - Allows for different env variables for testing / development.
- jest - Test-runner for model and endpoint testing.
- supertest - Additional testing methods for endpoints.

# Project Summary <a name="projectSummary"></a>

In a world with everything shouting for you attention, the disciplined pursuit of less has never been more needed. Enter Essentialism. The Way of the Essentialist involves doing less, but better, so you can make the highest possible contribution. It’s not about getting more done in less time or getting less done. It’s about getting only the right things done. It’s about regaining control of our own choices about where to spend our time and energies instead of giving others implicit permission to choose for us. The first step to essentialism is identifying your values.

# Endpoints (for frontend usage) <a name="frontEnd"></a>

### Global CRUD Rules

- Authentication: **All** endpoints **except** api/auth/register and api/auth/login require a valid token to be passed in the request header.

- Responses: **All** endpoints **except** api/auth/ endpoints return an array of the associated objects (or an empty array if there are no associate objects).
  Examples:
  A PUT request to api/createdvalues will return an array of the user's created values after the requested update.
  A DELETE request to api/projects will return an array of the user's projects after the requested deletion. If the deleted project were the user's only project, then the returned array will be empty.

---

# api/auth <a name="AuthEnd"></a>

---

#### POST `api/auth/login`

##### Required (unless marked optional):

**Header**: default
**URL Params**: none
**Body**:
username: string
password: string

##### Example Request:

```
Header: default
URL Params: none
Body:
{
    username: 'billie',
    password: '123'
}
```

##### Example Response:

```
Body:
{
    "message": "Welcome billie!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "id": 1,
        "username": "billie",
        "password": "$2a$08$WEnTr1tMP06.N762rn74rOl.ZHV1o7Sm04.fj5mxdInZJ.R0QH7Sy",
        "created_at": "2019-04-18 03:43:33",
        "email": "billieeilish@gmail.com",
        "firstName": "Billie",
        "lastName": "Eilish"
    }
}
```

---

#### POST `api/auth/register`

##### Required (unless marked optional):

**Header**: default
**URL Params**: none
**Body**:
username: string, up to 64 characters
password: string, up to 64 characters

##### Example Request:

```
Header: default
URL Params: none
Body:
{
    username: 'tandy',
    password: '123'
}
```

##### Example Response:

```
Body:
{
    "id": 4,
    "username": "tandy",
    "password": "$2a$08$MftZBbjKm1w/w/C8YaoZgeqGf0Lnc2rdiVNa3LZDDXQ6X2xNyjleS",
    "created_at": "2019-04-18 17:32:58",
    "email": null,
    "firstName": null,
    "lastName": null
}
```

---

#### PUT `api/auth/:id`

##### Required (unless marked optional):

**Header**: JWT token
**URL Params**: user id (PK of users table)
**Body**:
(at least one of the five is required)
username: string, up to 64 characters, optional
password: string, up to 64 characters, optional
email: string, up to 64 characters, optional
firstName: string, up to 64 characters, optional
lastName: string, up to 64 characters, optional

##### Example Request:

```
Header: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
URL Params: 1
Body:
{
    "email": "newEmailAddress@gmail.com",
    "firstName": "Willie",
    "lastName": "Standish"
}
```

##### Example Response:

```
Body:
{
    "id": 1,
    "username": "billie",
    "password": "$2a$08$WEnTr1tMP06.N762rn74rOl.ZHV1o7Sm04.fj5mxdInZJ.R0QH7Sy",
    "created_at": "2019-04-18 03:43:33",
    "email": "newEmailAddress@gmail.com",
    "firstName": "Willie",
    "lastName": "Standish"
}
```

---

#### DELETE `api/auth/:id`

##### Required (unless marked optional):

**Header**: JWT token
**URL Params**: user id (PK of users table)
**Body**: none

##### Example Request:

```
Header: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
URL Params: 1
Body: none
```

##### Example Response:

```
Body:
{
    "message": "User with ID of 1 successfully deleted"
}
```

---

# Table Schema <a name="tableSchema"></a>

### users

| Field      | Data Type | Modifiers                                  |
| ---------- | --------- | ------------------------------------------ |
| id         | integer   | PK, auto-increment                         |
| username   | string    | required, unique, limited to 64 characters |
| password   | string    | required, limited to 64 characters         |
| created_at | date      | auto-generated                             |
| email      | string    | optional, limited to 64 characters         |
| firstName  | string    | optional, limited to 64 characters         |
| lastName   | string    | optional, limited to 64 characters         |

### created-values

| Field              | Data Type | Modifiers                                                      |
| ------------------ | --------- | -------------------------------------------------------------- |
| id                 | integer   | PK, auto-increment                                             |
| user_id            | integer   | required, FK of users PK, onDelete: cascade, onUpdate: cascade |
| created_value_name | string    | required, limited to 64 characters                             |

### default-values

| Field              | Data Type | Modifiers                                  |
| ------------------ | --------- | ------------------------------------------ |
| id                 | integer   | PK, auto-increment                         |
| default_value_name | string    | required, unique, limited to 64 characters |

### projects

| Field          | Data Type | Modifiers                                                      |
| -------------- | --------- | -------------------------------------------------------------- |
| id             | integer   | PK, auto-increment                                             |
| user_id        | integer   | required, FK of users PK, onDelete: cascade, onUpdate: cascade |
| project_name   | string    | required, limited to 64 characters                             |
| project_active | boolean   | required, defaults to true                                     |
| proj_val_align | integer   | required, defaults to 0                                        |

### user-values

| Field             | Data Type | Modifiers                                                                 |
| ----------------- | --------- | ------------------------------------------------------------------------- |
| id                | integer   | PK, auto-increment                                                        |
| user_id           | integer   | required, FK of users PK, onDelete: cascade, onUpdate: cascade            |
| default_value_id  | integer   | required, FK of default-values PK, onDelete: restrict, onUpdate: restrict |
| created_values_id | integer   | required, FK of created-values PK, onDelete: cascade, onUpdate: cascade   |
| value_rank        | integer   | optional                                                                  |
| value_importance  | string    | optional, limited to 256 characters                                       |
