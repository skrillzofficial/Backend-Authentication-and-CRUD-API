Backend API Documentation & CRUD operations API.
Project description - I worked on a simple e-commerce platform with user and product management.
Installations & Set-up instructions:
A- Requirements :Node.js, MongoDB and Postman (for testing as front-End)
B- Installation Instruction:
    -Create a new folder 
    -Open with Vscode
    -Open terminal
    -Run the following packages:
        - npm init-y
        - npm i nodemon --save-dev : Help with keeping the server running
        - npm i express
        - npm i mongoose
        - npm i dotenv --save
        - npm i bcrypt
        - npm i validator
        - npm i jsonwebtoken
        - npm i mongodb
        - npm i cors
    Now go and create a MongoDB database and get the Url into the .env 
    Also get the Jwt-token also into the .env.
    [Note to cut all this: Just clone the project and run- npm install in your terminal on Bash] / start the server with npm run dev.

Concept  Framework:
1- Users register with email/password.
2- Admins have special privileges.
3- All sensitive routes are protected.

User Types and the permission they get
Role	Permissions
User	Basic access
Admin	Manage users/products


API endpoint list with request/response examples.
A. Authentication
    1- Register User
        - POST /api/v1/register 
            Example - {
                "fullName": "Ada Chimobi",
                "email": "Adachimobi@gmail.com",
                "password": "Adanne1234"
                }
    2- Login
        POST /api/v1/login
            Example - {
                "email": "Adachimobi@gmail.com",
                "password": "Adanne1234"
                }
    Response includes a token for protected routes which is set to last  for 2days.

B. User Management (Admin Only)
    1- Get All Users
            GET /api/v1/users    // Requires Bearer '-' admin token in header as authorization.
    2- Delete User
            DELETE /api/v1/users/:id     // Requires Bearer '-' admin token in header as authorization.
C. Product Management
    1- Create Product
            POST /api/v1/create
    2- Get All Products
            GET /api/v1/all
    3- Get Single Product
            Get/api/v1/single/:id
    4- Update Product
            Patch/api/v1/update/:id
    5- Delete Product
            DELETE /api/v1/products/:id  // Requires Bearer '-' admin token in header as authorization.

Security Flow
    1- User logs in → gets token
    2- Token sent in headers for protected routes(Admin):
        // Authorization: Bearer '-' token
    3- Server checks:
        - Check for Valid token
        - Check for Admin role


Testing on Postman.

        


