import * as quizService from "../../services/quizService.js";

const randomQuestion = async ({ response }) => {
  const questionRow = await quizService.chooseRandomQuiz();
  // return 1 row
  if (questionRow.length !== 0) {
    const question = questionRow[0];
    const answers = await quizService.getAnswerOptionsOfQuestion(question.id);
    const answerOptions = [];
    for (let i = 0; i < answers.length; i++) {
      answerOptions.push({
        optionId: answers[i].id,
        optionText: answers[i].option_text,
      });
    }
    const data = {
      questionId: question.id,
      questionTitle: question.title,
      questionText: question.question_text,
      answerOptions: answerOptions,
    };

    response.body = data;
    return;
  }

  response.body = {};
};

const sendAnswer = async ({ request, response}) => {
  const body = request.body({ type: "json" });
  const content = await body.value;
  const answerId = content.optionId;
  const answer = await quizService.getAnswer(answerId);
  if (answer.length !== 0) {
    response.body = { correct: answer[0].is_correct };
    return;
  }
  response.body = {};
  /*
  {
  "questionId": 1,
  "optionId": 3,
}
*/
};

export { randomQuestion, sendAnswer };
