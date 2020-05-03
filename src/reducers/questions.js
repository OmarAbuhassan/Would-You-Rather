import { receeive_Questions, add_answer , add_question } from '../actions/Questions'

export default function questions(state = {}, action) {
  switch (action.type) {
    
    case receeive_Questions:
      return {
        ...state,
        ...action.questions
      }

      case add_question:
        return {
          ...state,
          [action.question.id]: action.question
        }

    case add_answer:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([action.authedUser])
          }
        },
      }

    default:
      return state
  }
} 