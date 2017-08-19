import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, List, SimpleListItem } from 'jrs-react-components'
// import LinkButton from '../components/link-button'
import { map, sortBy, prop, compose } from 'ramda'
import { listForecasts, getUser } from '../../db'
import CreateForecast from './create-forecast'

const li = props => {
  console.log('forecast works: ', props)
  return (
    <article className="dt w-100 bb b--black-05 pb2 mt2" href="#0">
      <div className="dtc w2 w3-ns v-mid">
        <img
          src="http://mrmrs.github.io/photos/p/2.jpg"
          className="ba b--black-10 db br2 w2 w3-ns h2 h3-ns"
        />
      </div>
      <div className="dtc v-mid pl3">
        <h1 className="f6 f5-ns fw6 lh-title black mv0">
          {props.forecastTitle}
        </h1>
        <h2 className="f6 fw4 mt0 mb0 black-60">
          {props.forecastRegion}
        </h2>
        <h2 className="f6 fw4 mt0 mb0 black-60">
          {props.forecastWindDir}
        </h2>
        <h2 className="f6 fw4 mt0 mb0 black-60">
          {props.forecastMinWindSpd}
        </h2>
        <h2 className="f6 fw4 mt0 mb0 black-60">
          {props.forecastMaxWindSpd}
          <h2 className="f6 fw4 mt0 mb0 black-60">
            {props.forecastOwner}
          </h2>
        </h2>
      </div>
      <div className="dtc v-mid">
        <form className="w-100 tr">
          <Button
            className="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60"
            type="submit"
          >
            + Follow
          </Button>
        </form>
      </div>
    </article>
  )
}

class ForecastsList extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.dispatch(listForecasts(id))
    //this.props.dispatch(getUser(id))
  }
  render() {
    return (
      <div>
        <main>
          <div className="mw6 center mt2 tc">
            <List>
              {map(li, this.props.forecasts)}
            </List>
            <div className="f6 button-reset bg-light-gray ba b--black-60 pointer pv1 hover-white black-60">
              <Link className="no-underline hover-white" to="/createforecast">
                Create New Forecast
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    forecasts: state.forecasts
  }
}

const connector = connect(mapStateToProps)

export default connector(ForecastsList)
