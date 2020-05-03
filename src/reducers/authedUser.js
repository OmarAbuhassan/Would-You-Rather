import { set_authed_user } from '../actions/AuthedUser'

export default function authedUser (state = null, action) {
  switch (action.type) {
    case set_authed_user :
      return action.id
    default :
      return state
  }
} 