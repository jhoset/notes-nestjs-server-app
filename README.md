<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## Ensolver App (Server ) - Descripción


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

More info at [Prisma Migrate DOCS](https://www.prisma.io/docs/orm/prisma-migrate)
