import { saveQuestion } from '../utils/api'
import { addQuestionToUser } from './Users'
import { showLoading, hideLoading } from 'react-redux-loading'

export const receeive_Questions = 'receeive_Questions'
export const add_answer = 'add_answer'
export const add_question = 'add_question'





export function receiveQuestions(questions) {
  return {
    type: receeive_Questions,
    questions,
  }
}

function addQuestion(question) {
  return {
    question,
    type: add_question,
    
  }
}

export function handleSaveQuestion(question1, question2) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      author: authedUser,
      optionOneText: question1,
      optionTwoText: question2,
     

    })
      .then((question) => {
        dispatch(addQuestionToUser(question))
        dispatch(addQuestion(question))
      })
      .then(() => dispatch(hideLoading()))
  }
}

export function saveAnswer({ authedUser, qid, answer }) {

  return {
    qid,
    type: add_answer,
    authedUser,
    answer,
  }
}

