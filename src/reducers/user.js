import { SET_USER_X, SET_USER } from '../constants'

import { merge } from 'ramda'

export default (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload
    case SET_USER_X + 'FIRSTNAME':
      return merge(state, { firstName: action.payload })
    case SET_USER_X + 'LASTNAME':
      return merge(state, { lastName: action.payload })
    case SET_USER_X + 'USEREMAIL':
      return merge(state, { userEmail: action.payload })
    case SET_USER_X + 'USERPHONE':
      return merge(state, { userPhone: action.payload })
    case SET_USER_X + 'PASSWORD':
      return merge(state, { userPass: action.payload })
    case SET_USER_X + 'PASSWORDCONFIRM':
      return merge(state, { userPassConfirm: action.payload })
    case SET_USER_X + 'PHOTO':
      return merge(state, { userPassConfirm: action.payload })
    default:
      return state
  }
}
