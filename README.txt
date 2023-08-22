
** This is a multiple choice application, a primitive app similar to Quizlet. 

The project application can be launched at this online address: https://multiple-choice-app-nuance.herokuapp.com

** To run the project locally, you should have a database on elephantsql.com

Step 1: Go to database/database.js and place your database credentials into 

const connectionPool = new Pool({
  ....
}, CONCURRENT_CONNECTIONS);

where your database credentials may look like as follows
  hostname: "host name",
  database: "database name",
  user: "user name", probably the same name as your database
  password: "password",
  port: port gate, such as 5432

Go to your online databse and insert this query to create the tables

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password CHAR(60)
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(256) NOT NULL,
  question_text TEXT NOT NULL
);

CREATE TABLE question_answer_options (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false
);

CREATE TABLE question_answers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  question_id INTEGER REFERENCES questions(id),
  question_answer_option_id INTEGER REFERENCES question_answer_options(id),
  correct BOOLEAN DEFAULT false
);

CREATE UNIQUE INDEX ON users((lower(email)));

Step 2: open terminal and type 
deno run --unstable --allow-all --watch run-locally.js

Step 3: open another terminal and type 
curl http://localhost:7777

Step 4: Go to your browser and type 
http://localhost:7777/

You should be able to run the application locally on this address. Feel free to do any testing of your own.

** For testing, go to tests/services/test.js and directly modify the tests so they can pass with the data in your database. 
You can test the codes right away with typing this into terminal
deno test --allow-run --allow-net --allow-read --unstable --coverage=cov

Or you can paste the test code directly from tests/services/test into run-locally.js and type in the terminal
deno test --allow-run --allow-net --allow-read --unstable run-locally.js

For more details of changing test data so it can pass, you can read the comment in the file test.js

** Additional feature: I have implemented log out function so you can log out more easily without having to refresh the page ot refresh the terminal

** For static files, you can go to path /static/index.html to see a static file

** To login using terminal, type this
curl -v -X POST -d "email=email&password=password" http://localhost:7777/auth/login

** To send API in terminal, type this
curl --header "Content-Type: application/json" --request POST --data '{"questionId": 0, "optionId": 0 }' http://localhost:7777/api/questions/answer


