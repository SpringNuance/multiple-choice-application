import { executeQuery } from "../database/database.js";

const addAnswer = async (question_id, option_text, is_correct) => {
  await executeQuery(
    `INSERT INTO question_answer_options (question_id, option_text, is_correct)
        VALUES ($1, $2, $3)`,
    question_id,
    option_text,
    is_correct,
  );
};

const showAnswers = async (questionId) => {
  const res = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_id = $1;", 
      questionId,
  );

  return res.rows;
};

const deleteAnswer = async (optionId) => {
  await executeQuery(
    "DELETE FROM question_answers WHERE question_answer_option_id = $1;", 
     optionId,
  );

  await executeQuery(
    "DELETE FROM question_answer_options WHERE id = $1;", 
      optionId,
  );
};

export { addAnswer, showAnswers , deleteAnswer };
