export const RECEIVE_USERS = 'RECEIVE_USERS'
export const USERS_ANSWER = 'USERS_ANSWER'
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';


export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function saveUserAnswer({ authedUser, qid, answer }) {
  return {
    type: USERS_ANSWER,
    authedUser,
    qid,
    answer

  }

}

export function addQuestionToUser({ id, author }) {
  return {
    type: ADD_QUESTION_TO_USER,
    id,
    author
  };
}