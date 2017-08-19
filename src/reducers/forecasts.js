import { SET_FORECASTS } from '../constants'
// import { append, reject } from 'ramda'

export default (state = [], action) => {
  switch (action.type) {
    case SET_FORECASTS:
      return action.payload
    default:
      return state
  }
}
