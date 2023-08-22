import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
  title: [validasaur.required, validasaur.minLength(1)],
  question_text: [validasaur.required, validasaur.minLength(1)],
};

const getQuestionData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    title: params.get("title"),
    question_text: params.get("question_text"),
  };
};

const addQuestion = async ({ request, response, render, user }) => {
  if (!user){
    response.redirect("/auth/login");
  }
  const questionData = await getQuestionData(request);
  const title = questionData.title;
  const question_text = questionData.question_text;
  const [passes, errors] = await validasaur.validate(
    questionData,
    questionValidationRules,
  );

  if (!passes) {
    const data = {
      validationErrors: errors,
      title: title,
      question_text: question_text,
      user: user,
      questions: await questionService.showQuestions(user.id),
    };
    render("questions.eta", data);
  } else {
    await questionService.addQuestion(
      user.id,
      questionData.title,
      questionData.question_text,
    );

    response.redirect("/questions");
  }
};

const showQuestions = async ({ render, user }) => {
  if (!user){
    response.redirect("/auth/login");
  }
  const data = {
    validationErrors: null,
    title: "",
    question_text: "",
    user: user,
    questions: await questionService.showQuestions(user.id),
  }
  render("questions.eta", data);
};

const deleteQuestion = async ({ params, response, user }) => {
  if (!user){
    response.redirect("/auth/login");
  }
  await questionService.deleteQuestion(params.id);
  response.redirect("/questions");
};

export { addQuestion, showQuestions , deleteQuestion };
