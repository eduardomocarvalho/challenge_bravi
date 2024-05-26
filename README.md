# Bravi Contact List Management System

This project is a Contact List Management System developed by Bravi. It consists of a back-end API built with Laravel and a front-end web application built with Angular. The system allows managing people and their contacts, which can be phone numbers, emails, or WhatsApp contacts.

## Table of Contents

1. [Back-end API](#back-end-api)
2. [Front-end Application](#front-end-application)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the Application](#running-the-application)
4. [Conclusion](#conclusion)

## Back-end API

The back-end API is built with Laravel and provides the following features:

- Create, update, retrieve, and delete people and their contacts.
- Each person can have multiple contacts of different types (phone, email, WhatsApp).

### Endpoints

- **GET /persons**: Retrieve all persons with their contacts.
- **POST /persons**: Create a new person with contacts.
- **GET /persons/{id}**: Retrieve a person by ID with their contacts.
- **PUT /persons/{id}**: Update a person and their contacts.
- **DELETE /persons/{id}**: Delete a person by ID.

## Front-end Application

The front-end application is built with Angular and provides a user interface for interacting with the back-end API. The UI design is flexible and leverages the capabilities of Angular to offer a dynamic and responsive user experience.

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your local machine.

### Installation

1. Clone the repository to your local machine.
   ```bash
   git clone https://github.com/your-repo/contact-list-management.git
   cd contact-list-management
   
2. Rename the .env.example file in the back-end directory to .env.
   ```bash
   mv backend/.env.example backend/.env

### Running the Application

1. Build and start the application using Docker Compose.
   ```bash
   docker-compose up -d --build
   
2. The application should now be running locally. You can access the front-end application in your browser and use it to interact with the back-end API.

The back-end API will be available at http://localhost:8000.
The front-end application will be available at http://localhost:4200.

### Conclusion
This project provides a complete solution for managing a contact list with a robust back-end API and an intuitive front-end interface. It leverages the power of Laravel and Angular to deliver a seamless user experience. If you encounter any issues or have any questions, please feel free to reach out to the Bravi team for assistance.



