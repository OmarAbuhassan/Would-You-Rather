import { saveQuestionAnswer } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_ANSWER = 'ADD_ANSWER'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function saveAnswer({ authedUser, id, answer }) {
  return {
    type: ADD_ANSWER,
    id,
    authedUser,
    answer,
  }
}

export function handleSaveAnswer(info) {
  return (dispatch) => {
    dispatch(saveAnswer(info))

    return saveQuestionAnswer(info)
      .catch((e) => {
        console.warn('Error in handleSaveAnswer: ', e)
        dispatch(saveQuestionAnswer(info))
        alert('The was an error saving an answer. Try again.')
      })
  }
} 