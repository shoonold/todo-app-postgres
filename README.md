## todo-app-postgres

## Tech Stack
- Postgres
- Express
- Node
- React and Material UI
- Restful API
- Sequelize (ORM)

### Setup

Clone the api-test repository
```
https://github.com/shoonold/todo-app-postgres.git
```
Open client and server directory in terminal and install the dependencies. To install dependencies,
```
npm install
```
Create a database using pgadmin and set the db configuration in .env file. In server directory, create .env file and set the database configurations for below parameters
```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_DIALECT=

```
In above `DB_DIALECT` is actually a type of database(PostgreSQL/MongoDB) and it will be `postgres` in case of `PostgreSQL` database.

Set the `baseUrl` at client side in, `client\src\config.js` file

Run `npm start` in both terminal (client and server) to start the application. This will execute all db command for migrations. You just need to add the user entries in `users` table.
