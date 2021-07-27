# Food Stock Manager API

You can use docker compose to spin up backend and database as containers. That way you do not need to prepare Postgres and Node environment. You may have to try running "docker-compose up" a couple of times if backend tries to connect to Postgres before it has initialized its data and is ready to accept connections.

Backend will synchornize schema with database on startup.

DB can be configured in API with following environment variables:
- POSTGRES_DB
- POSTGRES_USER
- POSTGRES_PASSWORD
- POSTGRES_HOST

The backend creates users on startup. By default it creates user with username "test" and password "test". You can change users to create with FOOD_STOCK_MANAGER_USERS env variable (by default it is set to '[{"id":"test","password":"test"}]')

## API tests

You can run integration tests with "npm testApi" command if you have api running with docker-compose and installed dev dependencies with npm ("npm install --only=dev").

To view the tests import FoodStockManager.postman_collection.json into Postman.
