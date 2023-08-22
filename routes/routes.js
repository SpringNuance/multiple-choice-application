import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as questionController from "./controllers/questionController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as answerController from "./controllers/answerController.js";
import * as quizController from "./controllers/quizController.js";
import * as questionApi from "./apis/questionApi.js";
import * as statisticsController from "./controllers/statisticsController.js";


const router = new Router();

// Part 1 Show and add questions
router.get("/", mainController.showMain); 
router.get("/questions", questionController.showQuestions);
router.post("/questions", questionController.addQuestion);

// Part 2 Add answers
router.get("/questions/:id", answerController.showIndividualQA);
router.post("/questions/:id/options", answerController.addAnswer);

// Part 3 Delete questions and answers
router.post("/questions/:questionId/options/:optionId/delete", answerController.deleteAnswer);
router.post("/questions/:id/delete", questionController.deleteQuestion);

// Part 4 Register
router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

// Part 5 Login
router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);
router.get("/auth/logout", loginController.logout);

// Part 6 Quiz
router.get("/quiz", quizController.redirectQuiz);
router.get("/quiz/:id", quizController.showQuiz);
router.post("/quiz/:id/options/:optionId", quizController.postAnswer);
router.get("/quiz/:id/correct", quizController.redirectCorrect);
router.get("/quiz/:id/incorrect", quizController.redirectIncorrect);

//Part 7 Statistics
router.get("/statistics", statisticsController.showStatistics);

// Part 8 API
router.get("/api/questions/random", questionApi.randomQuestion);
router.post("/api/questions/answer", questionApi.sendAnswer);

export { router };
