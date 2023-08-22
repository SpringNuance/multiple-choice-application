import { app } from "../../app.js"
import { superoak } from "../../deps.js";


Deno.test("Test 1: Going to main page", async () => {
  const testClient = await superoak(app);
  await testClient.get("/")
  .expect(200);
});

Deno.test("Test 2: Going to login page", async () => {
  const testClient = await superoak(app);
  await testClient.get("/auth/login")
  .expect(200);
});

Deno.test("Test 3: Going to register page", async () => {
  const testClient = await superoak(app);
  await testClient.get("/auth/register")
  .expect(200);
});

Deno.test("Test 4: Access questions, redirected to auth/login", async () => {
  let testClient = await superoak(app);
  await testClient.get("/questions")
  .expect(302);
});

Deno.test("Test 5: Access quizzes, redirected to auth/login", async () => {
  let testClient = await superoak(app);
  await testClient.get("/quiz")
  .expect(302);
});

Deno.test("Test 6: Access statistics, rediected to auth/login", async () => {
  let testClient = await superoak(app);
  await testClient.get("/statistics")
  .expect(302);
});

// Insert your credentials here in send(...)
Deno.test({
  name: "Test 7: Logging in",
  async fn() {
    let testClient = await superoak(app);
    await testClient.post("/auth/login")
    .send("email=value1@gmail.com&password=value2")
    .expect(302)
  },
  sanitizeOps: true,
});

Deno.test("Test 8: Logging out (Logging out is not a function required in this project)", async () => {
  const testClient = await superoak(app);
  await testClient.get("/auth/logout")
  .expect(302)
});

Deno.test("Test 8: Get a random API, should respond with a json file", async () => {
  const testClient = await superoak(app);
  await testClient.get("/api/questions/random")
  .expect("Content-Type", new RegExp("application/json"))
  .expect(200)
});

// Only change questionId and optionId in send(...) from your databases so that these 3 tests pass. 

Deno.test("Test 9: post answer API, should respond with an empty json", async () => {
  const testClient = await superoak(app);
  await testClient.post("/api/questions/answer")
  .send({ "questionId": 0, "optionId": 0 })
  .expect(200)
  .expect("Content-Type", new RegExp("application/json"))
  .expect({})
});

Deno.test("Test 10: post answer API, should respond with { correct: true }", async () => {
  const testClient = await superoak(app);
  await testClient.post("/api/questions/answer")
  .send({ "questionId": 0, "optionId": 0 })
  .expect(200)
  .expect("Content-Type", new RegExp("application/json"))
  .expect({ correct: true })
});

Deno.test("Test 10: post answer API, should respond with { correct: false }", async () => {
  const testClient = await superoak(app);
  await testClient.post("/api/questions/answer")
  .send({ "questionId": 0, "optionId": 0 })
  .expect(200)
  .expect("Content-Type", new RegExp("application/json"))
  .expect({ correct: true })
});