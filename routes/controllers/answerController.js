import * as answerService from "../../services/answerService.js";
import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const answerValidationRules = {
  option_text: [validasaur.required, validasaur.minLength(1)],
};

const addAnswer = async ({ request, response, render, params , user}) => {
  if (!user){
    response.redirect("/auth/login");
  }
  const body = request.body({ type: "form" });
  const paramsRequest = await body.value;
  const option_text = paramsRequest.get("option_text");
  const is_correct = paramsRequest.get("is_correct");

  const questionData = await questionService.showIndividualQuestion(params.id);
  const title = questionData.title;
  const question_text = questionData.question_text;
  const userId = questionData.user_id
  
  if (userId !== user.id) {
    response.status = 401;
    return;
  }
  
  const answerData = {
    option_text: option_text,
  };
  const [passes, errors] = await validasaur.validate(
    answerData,
    answerValidationRules,
  );

 

  if (!passes) {
    const data = {
      validationErrors: errors,
      question_id: params.id,
      title: title,
      question_text: question_text,
      option_text: option_text,
      user: user,
      answers: await answerService.showAnswers(params.id),
    };
    render("answers.eta", data);
  } else {
    if (is_correct) {
      await answerService.addAnswer(
        params.id,
        option_text,
        true,
      );
      response.redirect(`/questions/${params.id}`);
    } else {
      await answerService.addAnswer(
        params.id,
        option_text,
        false,
      );
      response.redirect(`/questions/${params.id}`);
    }
  }
};

const showIndividualQA = async ({ params, render, user }) => {
  if (!user){
    response.redirect("/auth/login");
  }
  const questionData = await questionService.showIndividualQuestion(params.id);
  const title = questionData.title;
  const question_text = questionData.question_text;
  const data = {
    validationErrors: null,
    question_id: params.id,
    title: title,
    question_text: question_text,
    option_text: "",
    user: user,
    answers: await answerService.showAnswers(params.id),
  };
  render("answers.eta", data);
};

const deleteAnswer = async ({ params, response, user }) => {
  if (!user){
    response.redirect("/auth/login");
  }
  await answerService.deleteAnswer(params.optionId);
  response.redirect(`/questions/${params.questionId}`);
};

export { addAnswer, showIndividualQA , deleteAnswer };
