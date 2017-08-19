/* global google */
import { default as React, Component } from 'react'
import canUseDOM from 'can-use-dom'

import withGoogleMap from './withGoogleMap.js'
import GoogleMap from './GoogleMap.js'
import { Circle } from './Circle.js'
import { Marker } from './Marker.js'
import { InfoWindow } from './InfoWindow.js'

const SimpleMapExampleGoogleMap = withGoogleMap(props =>
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }} />
)

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class SimpleMapExample extends Component {
  render() {
    return (
      <div className="pa4">
        <SimpleMapExampleGoogleMap
          containerElement={<div style={{ height: 250 }} />}
          mapElement={<div style={{ height: 250 }} />}
        />
      </div>
    )
  }
}
