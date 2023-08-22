import { executeQuery } from "../database/database.js";

const numAnswersUserMade = async(userId) => {
  const res = await executeQuery(
    "SELECT * FROM question_answers WHERE user_id = $1;", userId
  )
  return res.rows.length;
}

const numCorrectAnswersUserMade = async(userId) => {
  const res = await executeQuery(
    "SELECT * FROM question_answers WHERE user_id = $1 AND correct = true;", userId
  )
  return res.rows.length;
}

const numAnswersMadeToUserQuestions = async(userId) => {
  const res = await executeQuery(
    "SELECT * FROM question_answers WHERE question_id IN (SELECT id FROM questions where user_id = $1);", userId
  )
  return res.rows.length;
}

const findFiveUsersWithMostAnsweredQuestions = async () => {
  const res = await executeQuery(
    `select Y.email as email, count(*) as count 
    from (select * from users as C join 
      (select B.user_id from question_answers as A join questions as B on B.id = A.question_id) 
      as X on C.id =  X.user_id) as Y 
      group by Y.email 
      order by count 
      desc limit 5`
  );

  return res.rows;
};

export { numAnswersUserMade, 
         numCorrectAnswersUserMade, 
         numAnswersMadeToUserQuestions,
         findFiveUsersWithMostAnsweredQuestions,
        };