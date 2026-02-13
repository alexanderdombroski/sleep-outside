Codes (200, 400, 401, 403, 404, 500)

Code 200: OK

Code

## Endpoints

We're using a mix of REST & RPC

### Users should be able to search and filter products to find what they are looking for.

GET /products

### Users should be able to see details about selected products including what other users thought about the product (reviews).

GET /products/:id
GET /products/categories/:id
GET /reviews

POST /reviews
PUT /reviews/:id
DELETE /reviews/:id

### Users should be able to add products to a shopping cart and then check out. The cart should persist across sessions.

- Use Local Storage instead of endpoints

### Users should be able to see their order history.

GET /orders
GET /orders/:id

### Users should be able to log in and log out.

POST /login
POST /logout

### Users should be able to see their account information.

GET /users/:id

### Developers should be able to read (search) products.

GET /products

### Developers should be able to create, read, update, and delete orders.

GET /orders
GET /orders/:id
POST /orders
PUT /orders/:id
DELETE /orders/:id

### Developers should be able to create, read, update, and delete users.

GET /users
GET /users/:id
POST /users
PUT /users/:id
DELETE /users/:id

### Developers should be able to read, create, update, and delete alerts that will show under certain conditions to users.

GET /alerts
GET /alerts/:id
POST /alerts
PUT /alerts/:id
DELETE /alerts/:id
