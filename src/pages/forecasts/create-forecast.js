import React from 'react'
import { connect } from 'react-redux'
import { TextField, Button } from 't63'
import {
  SET_FORECAST_TITLE,
  SET_FORECAST_REGION,
  SET_FORECAST_WIND_DIR,
  SET_FORECAST_MIN_WIND_SPD,
  SET_FORECAST_MAX_WIND_SPD,
  SET_FORECAST_OWNER
} from '../../constants'
import { createForecast } from '../../db.js'
// import { pathOr } from 'ramda'

class CreateForecast extends React.Component {
  // componentDidMount() {
  //   const id = pathOr(null, ['props', 'match', 'params', 'id'], this)
  //   if (id) {
  //     this.props.dispatch(getForecast(id))
  //   }
  // }
  render() {
    const props = this.props
    return (
      <div className="flex flex-column justify-start w-100 pl4">
        <main className="overflow-scroll">
          <h2 className="pl2 f4 f2-ns">
            {props._id ? 'Edit ' : 'New '} Forecast
          </h2>
          <form className="ph2" onSubmit={props.handleSubmit(props.history)}>
            <TextField
              name="Forecast Name"
              value={props.forecastTitle}
              onChange={props.setForecastTitle}
            />
            <TextField
              name="Forecast Region"
              value={props.forecastRegion}
              onChange={props.setForecastRegion}
            />
            <TextField
              name="Wind Direction"
              value={props.forecastWindDir}
              onChange={props.setForecastWindDir}
            />
            <TextField
              name="Minimum Wind Speed"
              value={props.forecastMinWindSpd}
              onChange={props.setForecastMinWindSpd}
            />
            <TextField
              name="Maximum Wind Speed"
              value={props.forecastMaxWindSpd}
              onChange={props.setforecastMaxWindSpd}
            />
            <TextField name="Maximum Wave Height" value="TBD" />
            <TextField name="Shortest Wave Period" value="TBD" />
            <ion-icon name="thermometer" />
            <TextField
              name="Forecast Owner"
              value={props.forecastOwner}
              onChange={props.setforecastOwner}
            />
            <div className="">
              <Button className="w-50 bg-blue ba br2 b--light-blue">
                Create Forecast
              </Button>{' '}
              <Button className="pl-10 w-20 bg-red ba br2 b--light-blue">
                Cancel
              </Button>
            </div>
          </form>
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    forecast: state.forecast
    // _id: state.forecast._id,
    // forecastTitle: state.forecast.forecastTitle,
    // forecastRegion: state.forecast.forecastRegion,
    // forecastWindDir: state.forecastWindDir,
    // forecastMaxWindSpd: state.forecastMaxWindSpd,
    // forecastOwner: state.forecastOwner
  }
}

function mapActionsToProps(dispatch) {
  return {
    handleSubmit: history => event => {
      event.preventDefault()
      dispatch(createForecast(history))
    },
    setForecastTitle: event => {
      dispatch({ type: SET_FORECAST_TITLE, payload: event.target.value })
    },
    setForecastRegion: event => {
      dispatch({ type: SET_FORECAST_REGION, payload: event.target.value })
    },
    setForecastWindDir: event => {
      dispatch({ type: SET_FORECAST_WIND_DIR, payload: event.target.value })
    },
    setForecastMinWindSpd: event => {
      dispatch({ type: SET_FORECAST_MIN_WIND_SPD, payload: event.target.value })
    },
    setforecastMaxWindSpd: event => {
      dispatch({ type: SET_FORECAST_MAX_WIND_SPD, payload: event.target.value })
    },
    setforecastOwner: event => {
      dispatch({ type: SET_FORECAST_OWNER, payload: event.target.value })
    }
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(CreateForecast)
