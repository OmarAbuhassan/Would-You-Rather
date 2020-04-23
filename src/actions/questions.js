import { saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { addQuestionToUser } from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_ANSWER = 'ADD_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleSaveQuestion(question1, question2) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      optionOneText: question1,
      optionTwoText: question2,
      author: authedUser,

    })
      .then((question) => {
        dispatch(addQuestion(question))
        dispatch(addQuestionToUser(question))


      })
      .then(() => dispatch(hideLoading()))
  }
}


export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function saveAnswer({ authedUser, qid, answer }) {

  return {
    type: ADD_ANSWER,
    qid,
    authedUser,
    answer,
  }
}

