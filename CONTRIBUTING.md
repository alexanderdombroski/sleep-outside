## Tasks

See the [trello](https://trello.com/b/tRyabDhC/sleep-outside)

## Environment setup

You must have Node installed. Visit [https://byui-cit.github.io/learning-modules/modules/general/node-installation/](https://byui-cit.github.io/learning-modules/modules/general/node-installation/) and skip to the Node section for instructions

npm install will install dependecies for both the frontend and the backend

## Frontend

### Frontend .env example

These environment variables are injected at build time (don't include anything sensitive)

```
PUBLIC_SERVER_URL=http://localhost:3000/api/v1/
```

## Backend API

### Backend .env example

These environment variables are used during server runtime

```env
PORT=3000
NODE_ENV=development
MONGO_URI=<mongo_URI>
MONGO_USER=<username>
MONGO_PASSWORD=<password>
MONGO_DATABASE=sleepoutside
JWT_SECRET=<secret_key>
JWT_EXPIRES_IN=<duration>
```
