import { IMPORT_FORECASTS } from '../constants'
import { merge } from 'ramda'

export default (state = [], action) => {
  switch (action.type) {
    case IMPORT_FORECASTS:
      //  return merge(state, action.payload)
      return action.payload
    default:
      return state
  }
}
