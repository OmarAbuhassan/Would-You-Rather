
import { saveQuestionAnswer, getInitialData } from '../utils/api'
import { receiveUsers } from './Users'
import { receiveQuestions,saveAnswer } from './Questions'
import { showLoading, hideLoading } from 'react-redux-loading'
import { saveUserAnswer } from './Users'
 
 
export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(hideLoading())

      })

  }
}

export function handleSaveAnswer({ authedUser, qid, answer }) {
  return (dispatch) => {
    dispatch(showLoading())

 
    return saveQuestionAnswer({ authedUser, qid, answer })
      .then(() => {
        dispatch(saveAnswer({ authedUser, qid, answer }))
        dispatch(saveUserAnswer({ authedUser, qid, answer }))
        dispatch(hideLoading())

      })
  }
} 
