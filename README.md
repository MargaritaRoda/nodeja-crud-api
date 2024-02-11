# nodeja-crud-api

# How to run app
1. Clone the repo.

```bash
   git clone https://github.com/MargaritaRoda/nodeja-crud-api.git
   cd nodeja-crud-api
   git checkout ffweewffwefwe
```
3. Navigate into the repo and install the dependencies.

```bash
npm install
```
3. Start server
```
npm run start:prod
```
App will run on localhost and 8080 port

# App API endpoints

GET /api/users

POST /api/users
Example call
```bash

curl -H "Content-type: application/json" -XPOST http://localhost:8080/api/users \
-d '{"id": "1", "username": "test", "age": 1, "hobbies": []}'

```


GET /api/users/:id
PUT /api/users/:id
DELETE /api/users/:id