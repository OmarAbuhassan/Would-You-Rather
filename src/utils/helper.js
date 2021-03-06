export function formatDate(timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatQuestion(question, author, authedUser) {
  const { id, optionOne, optionTwo, timestamp } = question
  const { name, avatarURL } = author

  return {
    name,
    avatar: avatarURL,
    id,
    timestamp,
    optionOneText: optionOne.text,
    optionTwoText: optionTwo.text,
    votOp1: optionOne.votes.length,
    votOp2: optionTwo.votes.length,
    hasAnswered: optionOne.votes.includes(authedUser) ||
      optionTwo.votes.includes(authedUser),
    authedUser: authedUser
  }
}


export function formatUser(user) {

  const { id, name, avatarURL, answers, questions } = user

  return {
    id,
    name,
    avatar: avatarURL,
    numOfAnswers: Object.keys(answers).length,
    numOfQuestions: questions.length,
    score: Object.keys(answers).length + questions.length

  }

}