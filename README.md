# Geo App Backend

## Overview

The Geo App Backend is a RESTful API built using Node.js (Express) that allows users to log in, retrieve their geolocation information based on their IP address, and maintain a history of IP lookups. The app connects to a MySQL database to store user data and history records.

## Features

- User authentication using JWT (JSON Web Tokens)
- Fetch geolocation information based on IP address
- Store and retrieve search history in a relational database (MySQL)
- Secure API endpoints using middleware for authentication
- Basic error handling and input validation

## Requirements

- Node.js (for Express version)
- MySQL
- npm (Node Package Manager)
- Git (optional)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/devbpaltezo/geo-app-server.git
cd geo-app-server

### Run Install

```bash
npm install
```
#### Install MySQL on your operating system if not yet installed
 - [https://www.mysql.com/]

### Run the User Seed

```bash
npm run seed
```

### Finally run the app

```bash
npm start
```
