import { executeQuery } from "../database/database.js";

const chooseRandomQuiz = async () => {
  const res = await executeQuery(
    "SELECT * FROM questions ORDER BY RANDOM() LIMIT 1;"
  );
    return res.rows;
};

const showQuiz = async (id) => {
  let question = await executeQuery(
    "SELECT * FROM questions WHERE id = $1;", id,
  );

  let answers = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_id = $1;", id,
  );

    return {
      question: question.rows,
      answers: answers.rows,
    }
};

const getAnswerOptionsOfQuestion = async (question_id) => {
  let answers = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_id = $1;", question_id,
  );

    return answers.rows;
};


const getAnswer = async (id) => {
  const res = await executeQuery(
    "SELECT * FROM question_answer_options WHERE id = $1;", id
  );
    return res.rows;
};

const getCorrectAnswer = async(id) => {
  const res = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_id = $1 AND is_correct = true;", id
  );
  return res.rows;
}

const addAnswerUserRecord = async(user_id, question_id, answer_id, correct) => {
  await executeQuery(
    `INSERT INTO question_answers
      (user_id, question_id, question_answer_option_id, correct)
        VALUES ($1, $2, $3, $4)`,
    user_id,
    question_id,
    answer_id,
    correct
  );
}


export { chooseRandomQuiz, showQuiz, getAnswer, getCorrectAnswer, addAnswerUserRecord, getAnswerOptionsOfQuestion };
