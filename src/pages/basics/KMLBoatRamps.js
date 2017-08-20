/* global google */
import { default as React, Component } from 'react'

import withGoogleMap from './withGoogleMap.js'
import GoogleMap from './GoogleMap.js'
import Circle from './Circle.js'
import Marker from './Marker.js'
import InfoWindow from './InfoWindow.js'
import KmlLayer from './KmlLayer.js'

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
const KmlLayerExampleGoogleMap = withGoogleMap(props =>
  <GoogleMap defaultZoom={10} defaultCenter={{ lat: 32.855, lng: -79.948 }}>
    <KmlLayer
      url="https://serene-sierra-27226.herokuapp.com/LocationBoatRamps.kml"
      //  url="http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml"
      options={{ preserveViewport: false }}
    />
  </GoogleMap>
)

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class KmlLayerExample extends Component {
  render() {
    return (
      <div className="pa4 b--black-10">
        <KmlLayerExampleGoogleMap
          containerElement={<div style={{ height: `350` }} />}
          mapElement={<div style={{ height: `350` }} />}
        />
      </div>
    )
  }
}

/*
map.addListener('click', function(e) {
    placeMarker(e.latLng, map);
});

function placeMarker(position, map) {
    var marker = new google.maps.Marker({
        position: position,
        map: map
    });
    map.panTo(position);
}
*/
