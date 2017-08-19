/* global google */
import { default as React, Component } from 'react'
import canUseDOM from 'can-use-dom'

import withGoogleMap from './withGoogleMap.js'
import GoogleMap from './GoogleMap.js'
import Circle from './Circle.js'
//import Marker from './Marker.js'
import InfoWindow from './InfoWindow.js'

export default class MarkerMapExampleGoog extends Component {
  render() {
    return (
      <div className="pa4">
        <MarkerMapExampleGoog
          containerElement={<div style={{ height: 250 }} />}
          mapElement={<div style={{ height: 250 }} />}
        />
      </div>
    )
  }
}
// const markermapexamplegoog = function initMap() {
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 4,
//     center: { lat: -25.363882, lng: 131.044922 }
//   })
//
// const markermapexamplegoog = withGoogleMap(
//   props =>
//     <GoogleMap
//       defaultZoom={8}
//       defaultCenter={{ lat: -34.397, lng: 150.644 }}
//       conClick={this.onMapClicked}
//     />
//   // map.addListener('click', function(e) {
//   //   placeMarkerAndPanTo(e.latLng, map)
//   // })
// )
// // }
//
// React.createClass({
//   placeMarkerAndPanTo: function(mapProps, map) {}
// })
// function (latLng, map) {
//   var marker = new google.maps.Marker({
//     position: latLng,
//     map: map
//   })
//   map.panTo(latLng)
// }

// export default class markermapexamplegoog extends Component {
//   render() {
//     return (
//       <div className="pa4">
//         <markermapexamplegoog
//           containerElement={<div style={{ height: 250 }} />}
//           mapElement={<div style={{ height: 250 }} />}
//         />
//       </div>
//     )
//   }
// }
