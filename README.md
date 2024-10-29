# PT Serasi Autoraya Coding Test
This project is a coding test for PT Serasi Autoraya, implemented with Node.js and ExpressJS.
**Disclaimer:** this is a test branch to test converting codebase to typescript. Changes with the help of AI.

## Project Setup
Follow these steps to set up the project on your local machine: 
1. Install all dependencies: ```bash npm install ``` 
2. Copy the example environment file and adjust the contents: ```bash cp .example.env .env ``` 
3. Copy config.example.json to config.json and Set up the database configuration at `config/config.json`. 
4. Run the script to create the database: ```bash node createDb.js ``` 
5. Run the command to execute migrations: ```bash npx sequelize-cli db:migrate ``` 
6. Start the application: ```bash npx nodemon app ```


## API Documentation
API documentation is available via Swagger. You can access it at: `` http://localhost:<PORT>/api-docs `` Replace `<PORT>` with the configured port from your `.env` file.

## Dependencies
This project uses the following dependencies: - Express.js - Sequelize - Swagger-jsdoc - Swagger-ui-express - dotenv - Mocha - nyc