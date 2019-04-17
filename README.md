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

## Deployment <a name="deployment"></a>

- [Backend Deployment](https://essentialism.herokuapp.com/)

## Tech Stack <a name="techStack"></a>

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

## Project Summary <a name="projectSummary"></a>

In a world with everything shouting for you attention, the disciplined pursuit of less has never been more needed. Enter Essentialism. The Way of the Essentialist involves doing less, but better, so you can make the highest possible contribution. It’s not about getting more done in less time or getting less done. It’s about getting only the right things done. It’s about regaining control of our own choices about where to spend our time and energies instead of giving others implicit permission to choose for us. The first step to essentialism is identifying your values.

## Endpoints (for frontend usage) <a name="frontEnd"></a>

### Global CRUD Rules

- Authentication: **All** endpoints **except** api/auth/register and api/auth/login require a valid token to be passed in the request header.

- Responses: **All** endpoints **except** api/auth/ endpoints return an array of the associated objects (or an empty array if there are no associate objects).
  Examples:
  A PUT request to api/createdvalues will return an array of the user's created values after the requested update.
  A DELETE request to api/projects will return an array of the user's projects after the requested deletion. If the deleted project were the user's only project, then the returned array will be empty.

## Table Schema <a name="tableSchema"></a>

### users

| Field      | Data Type | Modifiers                                  |
| ---------- | --------- | ------------------------------------------ |
| id         | integer   | PK, auto-increment                         |
| username   | string    | required, unique, limited to 32 characters |
| password   | string    | required, limited to 64 characters         |
| created_at | date      | auto-generated                             |
| email      | string    | optional, limited to 32 characters         |
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

| Field         | Data Type                                      |
| ------------- | ---------------------------------------------- |
| id            | Int (auto increment)                           |
| articles_id   | Foreign Key (points to id of articles table)   |
| categories_id | Foreign Key (points to id of categories table) |
