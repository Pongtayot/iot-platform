
# IoT Platform Backend

Built using:
-   Node.js
-   Express
-   Sequelize CLI

## Features

- Device registration: Register new IoT devices to the platform.
- Device management: Update device information and status.
- Data storage: Store and retrieve data generated by IoT devices.
- User management: Register and authenticate users for accessing the platform.
- API authentication: Secure APIs using JSON Web Tokens (JWT).

## Documentation

To explore and interact with the API using Swagger, you can access the Swagger UI at `http://localhost:8085/swagger-ui`

## Installation

To install and run the IoT Platform Backend locally, follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/Pongtayot/iot-platform-backend.git
   ```

2. Install the dependencies:

   ```bash
   cd iot-platform-backend
   yarn
   ```

3. Set up the environment variables:
   
   - Create a `.env` file in the project's root directory.
   - Copy the contents of `.env.example` to `.env`.
   - Update the values of the environment variables in `.env` to match your configuration.

4. Start the server:

   ```bash
   npm start
   ```

   The server will start running on `http://localhost:8085`.
