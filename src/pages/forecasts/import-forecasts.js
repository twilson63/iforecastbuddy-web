import React from 'react'
import { connect } from 'react-redux'
import fetch from 'isomorphic-fetch'
import { IMPORT_FORECASTS } from '../../constants'
import { map, compose, pick, take, pathOr, head } from 'ramda'
import { importWeather } from '../../db'

//const url = process.env.WU_API_URL + '/forecast10day/q/SC/Charleston.json'
const url =
  'http://api.wunderground.com/api/10ede871f4876ba8/forecast10day/q/SC/Charleston.json'

class ImportWeather extends React.Component {
  render() {
    const props = this.props
    //const ImportWeather = props => {
    return (
      <div className="pa4">
        <h2>Import Forecasts</h2>
        <form onSubmit={props.handleSubmit(props.history)}>
          <button>Import</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    iresults: state.iresults
  }
  console.log('mapped State to Props', state)
}

function mapActionsToProps(dispatch) {
  return {
    handleSubmit: history => event => {
      event.preventDefault()
      // dispatch(importWeather(history))
      fetch(url)
        .then(res => res.json())
        .then(data =>
          // console.log('fired fetch: ', res)
          head(
            compose(
              map(wo =>
                pick(
                  [
                    'date',
                    'high',
                    'low',
                    'icon_url',
                    'maxwind',
                    'avewind',
                    'epoch'
                  ],
                  wo
                )
              ),
              take(1),
              pathOr([], ['forecast', 'simpleforecast', 'forecastday'])
            )(data)
          )
        )
        .then(function(importResults) {
          // if (importResults.Response === 'False') {
          //   return alert(importResults.Error)
          // }
          dispatch({
            type: IMPORT_FORECASTS,
            payload: importResults
          })
          dispatch(importWeather(history))
          console.log('dispatched history', history)
        })
        .catch(function(err) {
          console.log('Promise error', err)
        })
    }
  }
}
const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(ImportWeather)
