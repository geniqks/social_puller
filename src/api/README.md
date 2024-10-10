# API Folder Structure

## Overview

The API is organized into three main folders:

| Folder      | Description                                                                    |
|-------------|--------------------------------------------------------------------------------|
| controllers | Contains all the logic for communicating with external APIs                    |
| routers     | Utilizes controller endpoints and formats them for user responses              |
| server      | Houses the Fastify server configuration                                        |

## Detailed Description

### Controllers
This folder contains modules that handle the core logic for interacting with external APIs. Each controller is responsible for a specific set of related operations.

### Routers
Router modules use the endpoints defined in controllers and format the data for appropriate user responses. They act as an intermediary between the raw API data and the client-facing interface.

### Server
The server folder includes configuration files for the Fastify server, ensuring optimal performance and security for the API.