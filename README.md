# [React](https://reactjs.org/) &middot; [Express](https://expressjs.com/)

## Background

We often find server-client project with a pattern where client is implemented inside server code, with its own separated package.json file.
Obviously this has its own benefits as the dependencies are separated out and there are no conflicts. Recently there have been some examples
over internet where express as server is implemented inside client and used as a static server for rendering React SPA over Heroku or similar
hosting solutions. So adding on to that logic in this project, we are trying to implement a fullstack solution of React SPA with Express Backend.
We have a single dependency file and at the end will be using webpack to bundle everything and dockerize the application without node_modules over a
single port 8080. We are also using Sequelize is a promise-based Node.js ORM with migration and seeder features.

## Running Project

### Step 1: Package Install

Install node dependency packages:

```bash
npm ci
```

### Step 2: Define the environment variables

These varibles are required for database connectivity:

```bash
export DB_NAME="testDb"
export DB_HOST="postgres"
export DB_USER="testName"
export DB_PASSWORD="testPass"
```

### Step 3: Building Application

Simple. Nothing complicated here (ignore the warnings in the build step).

```bash
npm run build
```

### Step 4: Starting Application with Postgres Instance using Docker-Compose

This will start a dockerized postgres instance without having to do any setup along with the application:

```bash
docker-compose up --build
```

### Step 5: Open browser

Navigate to [http://localhost:8080](http://localhost:8080)

## NPM Scripts

| NPM                       | Description                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------- |
| npm run react:dev         | Create-React-App script to run react application in development mode                    |
| npm run react:build       | Create-React-App script to build react application in production mode                   |
| npm run express:dev       | Run Express in development mode (will fail if react is not bundled first)               |
| npm run express:build     | Bundle Express application in production mode (will fail if react is not bundled first) |
| npm run sequelize:migrate | Run sequelize migrations                                                                |
| npm run sequelize:seed    | Run sequelize seeder                                                                    |
| npm run sequelize:setup   | Run migration and seeder one after the other                                            |
| npm run build             | Build the entire application in production mode                                         |
| npm run start             | Build and run the entire application in production mode                                 |
