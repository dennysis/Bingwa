# CRM System

## Overview
Modern CRM system built with Vue.js and NestJS, providing robust customer relationship management capabilities.

## Tech Stack
- **Frontend:** Vue.js 3 with Composition API
- **Backend:** NestJS 
- **Database:** MySQL
- **Authentication:** JWT

# CRM System

## Overview
Modern CRM system built with Vue.js and NestJS, providing robust customer relationship management capabilities.

## Tech Stack
- **Frontend:** Vue.js 3 with Composition API
- **Backend:** NestJS 
- **Database:** MySQL
- **Authentication:** JWT

## Quick Start

### Backend Setup

cd backend
npm install
npm run start:dev


### Frontend Setup

cd frontend
npm install
npm run serve


## Environment Variables

### Backend .env

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=crm
JWT_SECRET=your-secret-key


### Frontend .env

VUE_APP_API_URL=http://localhost:3000


## Project Structure

project-directory/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.vue
│   │   │   ├── CustomerList.vue 
│   │   │   ├── CustomerForm.vue
│   │   │   ├── UserList.vue
│   │   │   ├── UserForm.vue
│   │   │   ├── UserLogin.vue
│   │   │   └── UserSignup.vue
│   │   ├── router/
│   │   ├── store/
│   │   └── api.js
└── backend/
    ├── src/
    │   ├── auth/
    │   ├── user/
    │   ├── customer/
    │   └── lead/


## API Endpoints

### Auth
- POST /auth/login
- POST /auth/register
- POST /auth/change-password

### Users
- GET /users
- POST /users
- PATCH /users/:id
- DELETE /users/:id

### Customers
- GET /customers
- POST /customers
- PATCH /customers/:id
- DELETE /customers/:id

## Features

### Current
- User authentication & authorization
- Role-based access control
- Customer management
- User management
- Dashboard analytics

### Upcoming
- Lead management
- Reporting & analytics
- Email integration
- Task management
- Mobile app

## Development

### Running Tests

#### Backend

cd backend
npm run test


#### Frontend

cd frontend
npm run test:unit


### Building for Production

#### Backend

cd backend
npm run build


#### Frontend

cd frontend
npm run build


## User Roles

enum Role {
  Admin = 'admin',
  ProjectManager = 'project_manager', 
  Engineer = 'engineer'
}


## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Create a Pull Request



## Support
Contact the development team through repository issues.