export const receive_users = 'receive_users'
export const user_answer = 'user_answer'
export const add_q_to_user = 'add_q_to_user';


export function receiveUsers(users) {
  return {
    users,
    type: receive_users,
    
  }
}

export function saveUserAnswer({ authedUser, qid, answer }) {
  return {
    authedUser,
    type: user_answer,
    qid,
    answer,

  }

}

export function addQuestionToUser({ id, author }) {
  return {
    id,
    author,
    type: add_q_to_user,
    
  };
}