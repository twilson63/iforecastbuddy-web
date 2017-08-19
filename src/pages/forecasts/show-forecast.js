import Header from '../containers/header'
import { Button } from 't63'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { find, propEq } from 'ramda'
import { SET_FORECAST, CLEAR_FORECAST, DELETE_FORECAST } from '../constants'

class Show extends React.Component {
  componentDidMount() {
    const foundForecasts = find(
      propEq('id', this.props.match.params.id),
      this.props.forecasts
    )
    console.log('Found Forecasts: ', foundForecasts)
    this.props.dispatch({ type: SET_FORECAST, payload: foundForecasts })
  }
  render() {
    const props = this.props
    return (
      <div>
        <Header />
        <main>
          <div className="mw6 center mt2 tc">
            <MusicCard
              title={props.forecast.forecastTitle}
              image={props.forecast.icon}
              id={props.forecast.id}
              band={props.forecast.high}
            />
          </div>
          <div className="mw6 tc center">
            <a
              className="link ba br2 w4 pa2 center db mb3"
              href={props.forecast.icon_url}
              target="_blank"
            >
              Play Album
            </a>
            <Link to={`/editrank/${props.forecast.id}`}>
              <Button>Edit Rank</Button>
            </Link>
            <Link to="/">
              <Button>Return to Forecast List</Button>
            </Link>
            <Button onClick={props.handleDelete(props.history)}>Remove</Button>
          </div>
        </main>
      </div>
    )
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

function mapStateToProps(state) {
  return {
    forecasts: state.forecasts,
    forecast: state.forecast
  }
}

function mapActionsToProps(dispatch) {
  return {
    dispatch,
    handleDelete: history => e => {
      window.confirm(
        'Are you sure?'
          ? dispatch(deleteForecast(history))
          : console.log('Delete Cancelled by User')
      )
    }
  }
}
const deleteForecast = history => (dispatch, getState) => {
  const forecast = getState().forecast
  const url = process.env.REACT_APP_API + `/forecasts/` + forecast.id
  fetch(url, { method: 'DELETE' })
    .then(res => res.json())
    .then(fav => dispatch({ type: DELETE_FAVORITE, payload: fav }))
  dispatch({ type: CLEAR_FAVORITE })
  history.push('/')
  console.log(url)
}

export default connector(Show)
