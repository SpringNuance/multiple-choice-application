import * as quizService from "../../services/quizService.js";

const showQuiz = async ({ render, user, params }) => {
  if (!user) {
    response.redirect("/auth/login");
  }
  const quiz = await quizService.showQuiz(params.id);
  const question = quiz.question;
  const answers = quiz.answers;
  const data = {
    question: question,
    title: question[0].title,
    question_text: question[0].question_text,
    question_id: question[0].id,
    answers: answers,
    user: user,
  };
  render("quiz.eta", data);
};

const redirectQuiz = async ({ render, response, user }) => {
  if (!user) {
    response.redirect("/auth/login");
  }
  const question = await quizService.chooseRandomQuiz();
  if (question.length > 0) {
    const id = question[0].id;
    response.redirect(`/quiz/${id}`);
    return;
  }
  const data = {
    user: user,
    question: question,
  };
  render("quiz.eta", data);
};

const postAnswer = async ({ response, user, params }) => {
  if (!user) {
    response.redirect("/auth/login");
  }
  const questionId = params.id;
  const answerId = params.optionId;
  const answer = await quizService.getAnswer(answerId);
  const is_correct = answer[0].is_correct;
  if (is_correct) {
    await quizService.addAnswerUserRecord(user.id, questionId, answerId, true);
    response.redirect(`/quiz/${questionId}/correct`);
  } else {
    await quizService.addAnswerUserRecord(user.id, questionId, answerId, false);
    response.redirect(`/quiz/${questionId}/incorrect`);
  }
};

const redirectCorrect = async ({ render, response, user }) => {
  if (!user) {
    response.redirect("/auth/login");
  }
  const data = {
    user: user,
  };
  render("correct.eta", data);
};

const redirectIncorrect = async ({ render, response, user, params }) => {
  if (!user) {
    response.redirect("/auth/login");
  }
  const correctAnswer = await quizService.getCorrectAnswer(params.id);
  if (correctAnswer) {
    const data = {
      user: user,
      answer: correctAnswer,
      option_text: correctAnswer[0].option_text,
    };
    render("incorrect.eta", data);
  } else {
    const data = {
      user: user,
      answer: getCorrectAnswer,
    };
    render("incorrect.eta", data);
  }
};

export {
  postAnswer,
  redirectCorrect,
  redirectIncorrect,
  redirectQuiz,
  showQuiz,
};
