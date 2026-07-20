# Summit Supply Co ⛰️

An inventory management application built with **Express**, **TypeScript**, **PostgreSQL**, and **EJS**.

Summit Supply Co is an outdoor gear inventory application where users can manage hiking equipment categories and inventory items. Users can create, view, update, and delete categories and products.
<img width="1251" height="1023" alt="image" src="https://github.com/user-attachments/assets/a2781e02-9a8c-4d74-9115-ec7bcafbe6ab" />

## Live Demo

https://hiking-inventory-app-production.up.railway.app/

# Features

- View all inventory categories
- View all items within a category
- View individual item details
- Create new categories
- Update existing categories
- Delete categories
- Create new inventory items
- Update existing inventory items
- Delete inventory items
- PostgreSQL database integration
- Server-side form validation
- Responsive design
- Default images when no image URL is provided

---

# Technologies Used

## Backend

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- node-postgres (`pg`)

## Frontend

- EJS Templates
- CSS
- Google Fonts
- Font Awesome

## Deployment

- Railway
- Railway PostgreSQL Database

---

# Database Design

The application uses two related PostgreSQL tables:

## Categories Table

| Column      | Type    | Description          |
| ----------- | ------- | -------------------- |
| id          | Integer | Primary key          |
| name        | VARCHAR | Category name        |
| description | TEXT    | Category description |
| image_url   | VARCHAR | Category image       |

## Items Table

| Column      | Type    | Description        |
| ----------- | ------- | ------------------ |
| id          | Integer | Primary key        |
| name        | VARCHAR | Item name          |
| description | TEXT    | Item description   |
| price       | DECIMAL | Item price         |
| quantity    | INTEGER | Inventory quantity |
| category_id | INTEGER | Foreign key        |
| image_url   | VARCHAR | Item image         |

---

# Database Relationship

Each category can contain multiple inventory items.

```
Categories
     |
     |
 One-to-Many
     |
     |
Items
```

The `category_id` field in the items table references the categories table.

Deleting a category will also delete all associated items using:

```sql
ON DELETE CASCADE
```

---

# Project Structure

```
src
│
├── controllers
│   ├── categoriesController.ts
│   └── itemsController.ts
│
├── db
│   ├── pool.ts
│   ├── categoriesQueries.ts
│   ├── itemsQueries.ts
│   └── populatedb.ts
│
├── models
│   ├── category.ts
│   └── item.ts
│
├── routes
│   └── index.ts
│
└── app.ts


views
│
├── partials
├── index.ejs
├── categoryDetails.ejs
├── itemDetails.ejs
├── categoryForm.ejs
├── itemForm.ejs
├── updateCategory.ejs
└── updateItem.ejs


public
└── css
    └── styles.css
```

---

# Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DATABASE_URL=your_postgresql_connection_string
```

Start the application:

```bash
npm start
```

The application will run at:

```
http://localhost:3000
```

---

# Database Setup

The database can be populated using the seed script:

```bash
node populatedb.js
```

The script creates:

- Categories table
- Items table
- Sample categories
- Sample inventory items

---

# Validation

Forms use **express-validator** for server-side validation.

Validation includes:

- Required fields
- Character limits
- Valid image URLs
- Positive prices
- Positive quantities

---

# Design

The application uses an outdoor hiking theme featuring:

- Dark green primary colors
- Gold accent colors
- Responsive inventory cards
- Custom forms and buttons
- Hover animations

---

# Future Improvements

Possible future features:

- User authentication
- Search functionality
- Inventory stock alerts
- Image uploads
- Pagination
- Admin dashboard

---

# Author

Built by **Nedim Mulahusic**
