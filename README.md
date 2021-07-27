# Food Stock Manager

Application that helps you manage your food stocks. You can add more food to your stock and stock depletion will be calculated based on recipes used.

The project is composed of a Node backend with Postgres and a React Redux web app.

Easiest way to get it running locally is by spinning up database and backend with docker compose file in backend folder. The web app can then be started with "npm start" and it is configured to listen to backend at localhost:3000 (as in the compose file).

Infrastructure provisioning with Terraform to AWS and Ansible deployment scripts are in ops directory.
