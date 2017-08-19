import {
  SET_FORECAST,
  SET_FORECAST_TITLE,
  SET_FORECAST_REGION,
  SET_FORECAST_WIND_DIR,
  SET_FORECAST_MIN_WIND_SPD,
  SET_FORECAST_MAX_WIND_SPD,
  SET_FORECAST_MAX_WAVE_HT,
  SET_FORECAST_MIN_WAVE_PD,
  SET_FORECAST_OWNER
} from '../constants'

import { merge } from 'ramda'

export default (state = {}, action) => {
  switch (action.type) {
    case SET_FORECAST:
      return action.payload
    case SET_FORECAST_TITLE:
      return merge(state, { forecastTitle: action.payload })
    case SET_FORECAST_REGION:
      return merge(state, { forecastRegion: action.payload })
    case SET_FORECAST_WIND_DIR:
      return merge(state, { forecastWindDir: action.payload })
    case SET_FORECAST_MIN_WIND_SPD:
      return merge(state, { forecastMinWindSpd: action.payload })
    case SET_FORECAST_MAX_WIND_SPD:
      return merge(state, { forecastMaxWindSpd: action.payload })
    case SET_FORECAST_MAX_WAVE_HT:
      return merge(state, { forecastMaxWaveHt: action.payload })
    case SET_FORECAST_MIN_WAVE_PD:
      return merge(state, { forecastMinWavePd: action.payload })
    case SET_FORECAST_OWNER:
      return merge(state, { forecastOwner: action.payload })
    default:
      return state
  }
}
