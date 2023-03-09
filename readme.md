## Please Use following steps for setting up the frontend and backend servers: ##

### For Backend: ###
- Go inside `/backend` folder.
- In the .env file, I have added a few parameters for the database and server configuration. So please modify the values accordingly. [Please first create the database and after then add same database name in the env file]
- After updating the .env file, Check the node version. It should be greater than or equal to `16.15.1`.
- After then, please install all the dependencies using `npm i`.
- Now, for starting the server, please use command `npm run start:dev`
- This command will internally verify whether or not migrations have previously been run. If not, it will run all migrations.
- After running the migrations, It would insert the dummy test data on the both tables i.e users and images. So inititially, we are inserting 1 user whose username is `test` and `35 images data`. This process would run only once.

### For Frontend: ###
- Go inside `/frontend` folder.
- Update the .env file, as per the PORT of backend server. Current value of the env parameter `REACT_APP_API_BASE_PATH` is `http://localhost:3000/api/v1/`. Here, `http://localhost:3000` is the backend origin. 
- Check the node version as mentioned above.
- For installing all the dependencies, please use `npm i`.
- To start the server, please use `npm start`.

## Main Libraries used on both frontend and backend sides: ##
### Backend side: ###
- ExpressJS
- TypeORM 
- Typescript
### Frontend side: ###
- Redux
- Redux-saga
- @reduxjs/toolkit
- Formik
- Axios
- Typescript

### Note:
- We already know that the pushing the env on the repository is not considered as the best practices. Here we are doing it only assuming it's a test task :) 
