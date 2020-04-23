import { RECEIVE_USERS,USERS_ANSWER,ADD_QUESTION_TO_USER } from '../actions/users'
 
export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case USERS_ANSWER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer
          }
        }


      }
      case ADD_QUESTION_TO_USER:
      const { id, author } = action;
      console.log("add q to u")
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat(id)
        }
      };

    default:
      return state
  }
} 