export const set_authed_user = 'set_authed_user'

export function setAuthedUser(id) {
  return {
    id,
    type: set_authed_user,
    
  }
} 
