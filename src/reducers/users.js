import { receive_users,user_answer,add_q_to_user } from '../actions/Users'
 
export default function users(state = {}, action) {
  switch (action.type) {
    
    case receive_users:
      return {
        ...state,
        ...action.users
      }
   
      case add_q_to_user:
      const { id, author } = action;
       return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat(id)
        }
      };
      
      case user_answer:
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

    default:
      return state
  }
} 