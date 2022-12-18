**About this Application:**

-   This is a MongoDB auto CRUD API generator
-   All you need to do is to provide some information about your database and the application will generate the API for you
-   Each API will have the following methods:
    -   File `router.js` will have the following methods:
        -   GET: Get all the data
        -   GET: Get a single data
        -   POST: Create a new data
        -   PUT: Update a data
        -   DELETE: Delete a data

**How to use this application:**

-   Clone the project
-   We are using PNPM here so you can install it using `npm install -g pnpm`
-   Run `pnpm install` to install all the dependencies
-   Update `sample.env` file and rename it to `.env`
    -   `MONGO_DB_URL` is the URL of your MongoDB database
    -   `MONGO_DB_USER` is the username of your MongoDB database
    -   `MONGO_DB_PASSWORD` is the password of your MongoDB database

**How to add data to your database:**

-   `DB` Folder contains `test.ts` file
-   You can add your data to the database using this file and delete `test.ts` after you are done

**Routes that will be generated from filename `test.ts`:**

-   `GET /api/v1/test` will get all the data from the database
-   `GET /api/v1/test/:id` will get a single data from the database
-   `POST /api/v1/test` will create a new data in the database
-   `PUT /api/v1/test/:id` will update a data in the database
-   `DELETE /api/v1/test/:id` will delete a data from the database

**How to Run the application:**

-   Run `pnpm start` to start the application using `nodemon`
-   Run `pnpm build` to build the application and run it using `node`
-   Run `pnpm test` to run the tests

**Use Postman for Testing**

-   Import `Auto CRUD sample.postman_collection.json` file to your postman from `postman` folder

Enjoy! :smile:
