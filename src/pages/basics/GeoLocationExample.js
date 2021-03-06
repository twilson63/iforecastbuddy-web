/* global google */

import canUseDOM from 'can-use-dom'
import raf from 'raf'
import { connect } from 'react-redux'
import { default as React, Component } from 'react'
import { geolocated } from 'react-geolocated'
import withGoogleMap from './withGoogleMap.js'
import GoogleMap from './GoogleMap.js'
import Circle from './Circle.js'
import Marker from './Marker.js'
import InfoWindow from './InfoWindow.js'
import { SET_USER_LATITUDE, SET_USER_LONGITUDE } from '../../constants.js'

const geolocation =
  canUseDOM && navigator.geolocation
    ? navigator.geolocation
    : {
        getCurrentPosition(success, failure) {
          failure(`Your browser doesn't support geolocation.`)
        }
      }

const GeolocationExampleGoogleMap = withGoogleMap(props =>
  <GoogleMap defaultZoom={12} center={props.center}>
    {props.center &&
      <InfoWindow position={props.center}>
        <div>
          {props.content}
        </div>
      </InfoWindow>}
    {props.center &&
      <Circle
        center={props.center}
        radius={props.radius}
        options={{
          fillColor: `red`,
          fillOpacity: 0.2,
          strokeColor: `red`,
          strokeOpacity: 1,
          strokeWeight: 1
        }}
      />}
  </GoogleMap>
)

class GeolocationExample extends Component {
  state = {
    center: null,
    content: null,
    radius: 6000
  }

  isUnmounted = false

  componentDidMount() {
    const tick = () => {
      if (this.isUnmounted) {
        return
      }
      this.setState({ radius: Math.max(this.state.radius - 20, 0) })

      if (this.state.radius > 200) {
        raf(tick)
      }
    }
    geolocation.getCurrentPosition(
      position => {
        if (this.isUnmounted) {
          return
        }
        this.setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          content: `Location found using HTML5.`
        })

        raf(tick)
      },
      reason => {
        if (this.isUnmounted) {
          return
        }
        this.setState({
          center: {
            lat: 60,
            lng: 105
          },
          content: `Error: The Geolocation service failed (${reason}).`
        })
      }
    )
  }

  componentWillUnmount() {
    this.isUnmounted = true
  }

  render() {
    return (
      <GeolocationExampleGoogleMap
        containerElement={<div style={{ height: 300 }} />}
        mapElement={<div style={{ height: 300 }} />}
        center={this.state.center}
        content={this.state.content}
        radius={this.state.radius}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    coordinateLocation: state.coordinateLocation
  }
}
//
// function mapActionsToProps(dispatch) {
//   return {
//     setUserLatitude: event => {
//       dispatch({
//         type: SET_USER_LATITUDE,
//         payload: props.position.coords.latitude
//       })
//     },
//     setUserLatitude: event => {
//       dispatch({
//         type: SET_USER_LONGITUDE,
//         payload: props.position.coords.latitude
//       })
//     }
//   }
// }
//
const connector = connect(mapStateToProps)

export default connector(GeolocationExample)
