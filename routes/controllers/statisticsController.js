import * as statisticsService from "../../services/statisticsService.js";

const showStatistics = async ({ render, user }) => {
  if (!user){
    response.redirect("/auth/login");
  }
  const data = {
    user: user,
    numAnswers: await statisticsService.numAnswersUserMade(user.id),
    numCorrect: await statisticsService.numCorrectAnswersUserMade(user.id),
    numAnswersToUsers: await statisticsService.numAnswersMadeToUserQuestions(user.id),
    topFiveUsers: await statisticsService.findFiveUsersWithMostAnsweredQuestions(),
  }
  render("statistics.eta", data);
};


export { showStatistics };

