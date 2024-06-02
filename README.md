<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="160" alt="Nest Logo" /></a>
  <a href="https://www.prisma.io/?via=start&gad_source=1&gclid=Cj0KCQjwpNuyBhCuARIsANJqL9Nr11I1zY5oBZqfszLm3LfAOoEZ0meIv2oMYlz0LVunwVOxSVNzgtQaApUFEALw_wcB" target="blank"><img src="https://cdn.worldvectorlogo.com/logos/prisma-4.svg" width="130" alt="PrismaORM Logo" /></a>
<a href="https://www.postgresql.org/" target="blank"><img src="https://static-00.iconduck.com/assets.00/postgresql-icon-993x1024-slytewbi.png" width="150" alt="Postgres Logo" /></a>
</p>


<h1> <p align="center"> Ensolvers App ( SERVER ) </p></h1> 
<p align="center"> The backend of the Notes App is built with NestJS, leveraging its powerful framework to create a scalable and maintainable application. It follows design patterns and a modular architecture to ensure clean code and easy extension. </p>
  <p align="center"> The backend uses JWT (JSON Web Token) strategy for secure authentication, allowing users to log in and manage their notes securely. It provides robust API endpoints for CRUD operations, notes filtering, and archiving functionality. This well-structured backend infrastructure supports a seamless and secure user experience.
  </p>

## Live Demo

The deployed version of this application can be accessed [here](https://notes-nestjs-server-app.onrender.com/api-docs). 

## Local Setup
1. Get & Setup PostgresSQL Database in order to get String DB connection
2. Setup .env variables (clone .env-template file)
3. Install Dependencies
```bash
$ npm install
```
4. Run migrations
```bash
$ npx prisma migrate dev
```
## Default User Credentials

```bash
user:       admin@ensolvers.com
password:   ensolvers123
```

## Run Application

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
