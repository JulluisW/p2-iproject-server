# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /register/phoneValidations`
- `POST /shop/register`
- `GET /shop/:userId`
- `PUT /shop/edit`
- `GET /product`
- `POST /product/add`
- `PUT /product/:productId`
- `DELETE /product/:productId`
- `GET /order`
- `POST /order/add`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Name is required"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. POST /register/phoneValidations

Description:
- Get Phone Validation from third party

Request:

- headers: 

```json
{
  "access_token": "string",
  "userId": "integer"
}
```

- body:

```json
{
  "phone": "string",
}
```

_Response (200 - OK)_

```json
  {
    "phone": "6282218295653",
    "valid": true,
    "format": {
        "international": "+6282218295653",
        "local": "0822-1829-5653"
    },
    "country": {
        "code": "ID",
        "name": "Indonesia",
        "prefix": "+62"
    },
    "location": "Indonesia",
    "type": "mobile",
    "carrier": "Telkomsel"
}
  ...,
```

&nbsp;

## 4. POST /shop/register

Description:
- Add shop to Database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "name": "string",
  "imageUrl": "string",
  "motto": "string",
  "address": "string",
  "category": "string",
}
```

_Response (201 - OK)_

```json
{
    "id": 3,
    "name": " TB Sinar Jaya 2",
    "imageUrl": " https://indobondall.co.id/wp-content/uploads/2018/05/logomitrabangunan.png",
    "motto": " Maju terus maju",
    "address": " Jalan Jambu 15 ",
    "category": " Constructor Material",
    "userId": 5,
    "updatedAt": "2022-01-27T04:41:48.446Z",
    "createdAt": "2022-01-27T04:41:48.446Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Movie not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```