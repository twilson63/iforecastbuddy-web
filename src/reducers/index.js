import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './user'
import forecast from './forecast'
import forecasts from './forecasts'
import session from './session'
import iresults from './import'
export default combineReducers({
  user,
  forecast,
  forecasts,
  iresults,
  session,
  router: routerReducer
})
