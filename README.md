## Description

A Restful API to manipulate todo list.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Available Endpoints 

- `POST /todo-list` - Add item into a todo list

Payload:

```json
{ "title": "go shopping" }
```

Successful response:

```json
[
  {
    "id": "979e6d7c-4728-47a1-ab7c-0a613b279c68",
    "title": "go shopping",
    "status": "OPEN"
  }
]
```

- `GET /todo-list` - Get all todo list

Successful response: : 

```json
[
  {
    "id": "979e6d7c-4728-47a1-ab7c-0a613b279c68",
    "title": "go shopping",
    "status": "OPEN"
  }
]
```
- `GET /todo-list/:id` - Get a todo item from ID

Successful response:

```json
  {
    "id": "979e6d7c-4728-47a1-ab7c-0a613b279c68",
    "title": "go shopping",
    "status": "OPEN"
  }
```
- `PATCH /todo-list/:id` - Update todo

Payload: 
```json
{
  "title": "New title", // optional
  "status": "DONE" // optional
}
```
Successful response:

```json
  {
    "id": "979e6d7c-4728-47a1-ab7c-0a613b279c68",
    "title": "New title",
    "status": "DONE"
  }
```

- `DELETE /todo-list/:id` - Delete todo item 

Successful response: 

```json
{
  "deletedId": "979e6d7c-4728-47a1-ab7c-0a613b279c68"
}
```

`GET /docs` - Swagger for API document 

