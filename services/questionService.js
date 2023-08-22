import { executeQuery } from "../database/database.js";

const addQuestion = async (userId, title, question_text) => {
  await executeQuery(
    `INSERT INTO questions
      (user_id, title, question_text)
        VALUES ($1, $2, $3)`,
    userId,
    title,
    question_text,
  );
};

const showQuestions = async (userId) => {
  const res = await executeQuery(
    "SELECT * FROM questions WHERE user_id = $1;", userId,
  );

  return res.rows;
};

const showIndividualQuestion = async (id) => {
  let res = await executeQuery(
    "SELECT * FROM questions WHERE id = $1;", id,
  );
  if (res.rows && res.rows.length > 0) {
    return res.rows[0];
  }
  
  return { id: 0, user_id: 0, title: "", question_text: "" };
};

const deleteQuestion = async (id) => {
  await executeQuery(
    "DELETE FROM question_answers WHERE question_id = $1;", 
     id,
  );

  await executeQuery(
    "DELETE FROM questions WHERE id = $1;", 
     id,
  );


};

export { addQuestion, showQuestions, showIndividualQuestion, deleteQuestion };
