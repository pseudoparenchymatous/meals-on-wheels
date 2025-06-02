# Meals on Wheels Laravel Application

This is a Laravel-based web application. This guide will help you set up the project for local development.

## ­🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install PHP Dependencies
```
composer install
```

### 3. Install JavaScript Dependencies
```bash
npm install
npm run build
```

### 4. Set Up Environment Variables
```
cp .env.example .env
```

### 5. Generate Application Key
```
php artisan key:generate
```

### 6. Set Up the Database
```
php artisan migrate
```

### 7. Start Development Server
```
composer run dev
```
