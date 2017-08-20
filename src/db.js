import fetch from 'isomorphic-fetch'
import {
  SET_USER,
  SET_SESSION,
  SET_FORECAST,
  SET_USERS,
  SET_FORECASTS,
  SET_FORECAST_OWNER,
  IMPORT_FORECASTS
} from './constants'

//const apiURL = 'https://healthy-io-api.glitch.me/'
// const apiURL =
//   'https://dlyiessidedifferessistry:b56cf85c92bdab69ba920b54042c223e8d862930@e9001737-a209-47cc-9c94-02166194f227-bluemix.cloudant.com/testiforecastbuddy'

const apiURL = 'http://localhost:5000'

const getOptions = (token, method = 'GET', body = null) => {
  return {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: body && JSON.stringify(body)
  }
  // {
  //   method,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: 'Bearer ' + token
  //   },
  //   body: body && JSON.stringify(body)
  // }
}

/*
export const getForecast = forecastId => (dispatch, getState) => {
  const authProfileSubId = getState().session.profile.sub
  console.log('Get Forecast Fired')
  fetch(
    apiURL + '/users/' + authProfileSubId + '/forecasts/' + forecastId,
    getOptions(getState().session.id_token)
  )
    .then(res => res.json())
    .then(data => dispatch({ type: SET_FORECAST, payload: data }))
}
*/

export const getUser = id => (dispatch, getState) => {
  const id = getState().session.profile._id
  console.log('ID', id)
  fetch(apiURL + 'users/' + id, getOptions(getState().session.id_token))
    .then(res => res.json())
    .then(data => dispatch({ type: SET_USER, payload: data }))
}

export const getOrCreateUser = authResult => (dispatch, getState) => {
  console.log(authResult)
  fetch(
    apiURL + 'users?filter=authId:' + authResult.authId,
    getOptions(authResult.id_token)
  )
    .then(res => res.json())
    .then(user => {
      if (user) {
        dispatch({
          type: SET_SESSION,
          payload: {
            userId: user._id,
            profile: authResult.profile,
            access_token: authResult.access_token,
            id_token: authResult.id_token,
            expires_at: authResult.expires_at
          }
        })
      } else {
        fetch(
          apiURL + 'users',
          getOptions(authResult.id_token, 'POST', {
            firstName: 'Unknown',
            lastName: 'Unknown',
            primaryEmail: 'unknown@email.com',
            primaryPhone: '843-555-1234',
            isAdmin: true,
            authId: authResult.profile.sub
          })
        )
          .then(res => res.json())
          .then(user => {
            dispatch({
              type: SET_SESSION,
              payload: {
                userId: user.id,
                profile: authResult.profile,
                access_token: authResult.access_token,
                id_token: authResult.id_token,
                expires_at: authResult.expires_at
              }
            })
          })
      }
    })
}
export const listUsers = (dispatch, getState) => {
  fetch(apiURL + 'users?limit=20', getOptions(getState().session.id_token))
    .then(res => res.json())
    .then(data => dispatch({ type: SET_USERS, payload: data }))
}

export const createUser = history => (dispatch, getState) => {
  fetch(
    apiURL + '/users',
    // getOptions(getState().session.id_token, 'POST', getState().user)
    getOptions(getState(), 'POST', getState().user)
  )
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: SET_USER,
        payload: {
          firstName: '',
          lastName: '',
          userPhone: '',
          userEmail: '',
          userHomePort: '',
          userPass: '',
          photo: ''
        }
      })
    )
    .then(() => history.push('/'))
    .catch(err => console.log('error', err))
}

export const updateUser = history => (dispatch, getState) => {
  const user = getState().user
  fetch(
    apiURL + '/users/' + user._id,
    getOptions(getState().session.id_token, 'PUT', user)
  )
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: SET_USER,
        payload: {
          firstName: '',
          lastName: '',
          userPhone: '',
          isAdmin: '',
          userEmail: '',
          photo: ''
        }
      })
    )
    .then(() => history.push('/'))
}

export const removeUser = history => (dispatch, getState) => {
  const user = getState().user
  fetch(
    apiURL + 'users/' + user._id,
    getOptions(getState().session.id_token, 'DELETE')
  )
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: SET_USER,
        payload: {
          firstName: '',
          lastName: '',
          primaryPhone: '',
          isAdmin: '',
          primaryEmail: '',
          photo: '',
          profiles: []
        }
      })
    )
    .then(() => history.push('/users'))
}

export const getForecast = forecastId => (dispatch, getState) => {
  const authProfileSubId = getState().session.profile.sub
  console.log('Get Forecast Fired')
  fetch(
    apiURL + '/users/' + authProfileSubId + '/forecasts/' + forecastId,
    getOptions(getState().session.id_token)
  )
    .then(res => res.json())
    .then(data => dispatch({ type: SET_FORECAST, payload: data }))
}
/*
export const listUsers = (dispatch, getState) => {
  fetch(apiURL + 'users?limit=20', getOptions(getState().session.id_token))
    .then(res => res.json())
    .then(data => dispatch({ type: SET_USERS, payload: data }))
}
*/
export const listForecasts = history => (dispatch, getState) => {
  const authProfileSubId = getState().session.profile.sub
  console.log('List Forecasts Fired')
  fetch(
    apiURL + '/users/' + authProfileSubId + '/forecasts',
    getOptions(getState().session.id_token)
  )
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: SET_FORECASTS,
        payload: data
      })
    )
  // .then(() => history.push('/forecasts'))
  // .catch(err => console.log('error', err))
}

export const createForecast = history => (dispatch, getState) => {
  const authProfileSubId = getState().session.profile.sub
  ///users/:userid/forecasts
  fetch(
    apiURL + '/users/' + authProfileSubId + '/forecasts',
    getOptions(getState().session.id_token, 'POST', getState().forecast)
  )
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: SET_FORECAST,
        payload: {
          forecastTitle: '',
          forecastRegion: '',
          forecastWindDir: '',
          forecastMinWindSpd: 0,
          forecastMaxWindSpd: 0,
          forecastOwner: '',
          authProfileSubId: ''
        }
      })
    )
    .then(() => history.push('/'))
    .catch(err => console.log('error', err))
}
//Import forecast10day
const url =
  'http://api.wunderground.com/api/10ede871f4876ba8/forecast10day/q/SC/Charleston.json'

export const importWeather = history => (dispatch, getState) => {
  console.log('db IMPORT_FORECASTS', getState().iresults)
  fetch(
    apiURL + '/imports',
    getOptions(getState().session.id_token, 'POST', getState().iresults)
  )
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: IMPORT_FORECASTS,
        payload: {}
      })
    )
    .then(() => history.push('/'))
    .then(console.log('pushed history'))
    .catch(err => console.log('error', err))
}
