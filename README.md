# Wendigo

Wendigo is an online used car dealership in the making.

# Live Link

https://wendigo.onrender.com/

## Tech Stack

![Static Badge](https://img.shields.io/badge/PYTHON-%233776AB?style=for-the-badge&logo=python&labelColor=black)
![Static Badge](https://img.shields.io/badge/FLASK-%23000000?style=for-the-badge&logo=FLASK&labelColor=black)
![Static Badge](https://img.shields.io/badge/JAVASCRIPT-%23F7DF1E?style=for-the-badge&logo=javascript&labelColor=black)
![Static Badge](https://img.shields.io/badge/REACT-%2361DAFB?style=for-the-badge&logo=react&labelColor=black)
![Static Badge](https://img.shields.io/badge/REDUX-%23764ABC?style=for-the-badge&logo=REDUX&labelColor=black)
![Static Badge](https://img.shields.io/badge/CSS-%231572B6?style=for-the-badge&logo=CSS3&labelColor=black)
![Static Badge](https://img.shields.io/badge/POSTGRES-%234169E1?style=for-the-badge&logo=POSTGRESQL&labelColor=black)
![Static Badge](https://img.shields.io/badge/SQLALCHEMY-%23D71F00?style=for-the-badge&logo=sqlalchemy&labelColor=black)

# Index

[Features List](https://github.com/jeramief/wendigo/wiki/Feature-List) | [Database Schema](https://github.com/jeramief/wendigo/wiki/Database-Schema) | [User Stories](https://github.com/jeramief/wendigo/wiki/User-Stories) | [Wireframes](https://github.com/jeramief/wendigo/wiki/User-Stories)

# Landing Page

![Screenshot 2024-06-27 214411](https://github.com/jeramief/wendigo/assets/109633173/77a1e86c-cffa-4f3b-bd54-3ee99e451a3e)

# Vehicles For Sell

![Screenshot 2024-06-27 221629](https://github.com/jeramief/wendigo/assets/109633173/35a4442e-32b7-48aa-aa8e-6a557c76314e)

# Vehicle Details

![Screenshot 2024-06-27 221805](https://github.com/jeramief/wendigo/assets/109633173/92853935-e834-4174-a838-46d7933203e5)

# Endpoints

## Auth Routes

### Current User

- Purpose: This fetch is sent upon initial app load and on subsequent refreshes and navigations. It returns an object representing the current user, if user is logged in.
- Method: `POST`
- URL: `/api/auth/`
- Successful Response: HTTP Status Code 200

```json
{
  "cart": "ARRAY_OF_PRODUCT_OBJECTS",
  "createdat": "STRING",
  "email": "STRING",
  "id": "INT",
  "updatedat": "STRING",
  "username": "STRING"
}
```

- Error Response: HTTP Status Code 401

```json
{
  "errors": "Unauthorized"
}
```

### Unauthorized (from @login_required)

- Purpose: This endpoint will be routed to in the case that a protected route does not pass validations for the current user.
- Method: `POST`
- URL:`/api/auth/unauthorized`
- Successful Response: NA
- Error Response: HTTP Status Code 401

```json
{
  "errors": "Unauthorized"
}
```

### Sign Up

- Purpose: This fetch sends the signup form data to the backend to process the creation of a new user.
- Method: `POST`
- URL: `/api/auth/signup`
- Successful Response: HTTP Status 201

```json
{
  "id": "INT",
  "username": "STRING",
  "email": "STRING"
}
```

- Error Response: HTTP Status 400

```json
{
  "errors": "ARRAY_OF_STRINGS"
}
```

### Login

- Purpose: This fetch attempts to login a user with the provided credentials.
- Method: `POST`
- URL: `/api/auth/login`
- Successful Response: HTTP Status 200

```json
{
  "id": "INT",
  "username": "STRING",
  "email": "STRING"
}
```

- Error Response: HTTP Status 400

```json
{
  "errors": "ARRAY_OF_STRINGS"
}
```

### Logout

- Purpose: This fetch will logout the current user.
- Method: `POST`
- URL: `/api/auth/logout`
- Successful Response: HTTP Status 200

```json
{
  "message": "User logged Out"
}
```

- Error Response: HTTP Status 404

```json
{
  "errors": "No session"
}
```

# Feature List

1. Purchase Vehicle
2. Reviews
3. Search

# Future Implementation Goals

1. Sell Vehicle
2. Wishlist
3. Filters
4. Payments

# Connect

https://www.linkedin.com/in/jeramieforbes/
