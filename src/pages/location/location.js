import React from 'react'
import { geolocated } from 'react-geolocated'

const src =
  'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap'

const mapStyle = {
  width: 400,
  height: 400,
  'background-color': 'grey'
}

class CurrentLocation extends React.Component {
  render() {
    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : (console.log('coords', this.props.coords), this.props.coords)
          ? <table className="pv4 w-25 justify-center">
              <h3>Current Location:</h3>
              <div style={mapStyle} id="map" />
              <tbody className="w-100 mv0 justify-center ph-50 bg-blue pa 4 navy">
                {this.props.coords.latitude != null
                  ? <tr>
                      <td className="fw4 white hover-white bg-light-blue no-underline ma-1 pa2 ba2 justify-center">
                        {' '}latitude:{' '}
                      </td>
                      <td className="fw4 white hover-white bg-light-blue no-underline ma-1 pa2 ba2 justify-center">
                        {this.props.coords.latitude}
                      </td>
                    </tr>
                  : <div />}
                {this.props.coords.longitude != null
                  ? <tr>
                      <td className="fw3 white hover-white bg-light-blue no-underline ma-1 pa2 ba2 justify-center">
                        {' '}longitude:{' '}
                      </td>
                      <td className="fw3 white hover-white bg-light-blue no-underline ma-1 pa2 ba2 justify-center">
                        {this.props.coords.longitude}
                      </td>
                    </tr>
                  : <div />}
                {this.props.coords.altitude != null
                  ? <tr>
                      <td className="fw4 white hover-white bg-light-blue no-underline ma-1 pa2 ba2 justify-center">
                        {' '}latitude:{' '}
                      </td>
                      <td className="fw4 white hover-white bg-light-blue no-underline ma-1 pa2 ba2 justify-center">
                        {this.props.coords.altitude}
                      </td>
                    </tr>
                  : <div />}
                {this.props.coords.heading != null
                  ? <tr>
                      <td className="fw4 white hover-white bg-light-blue no-underline ma-1 pa2 ba2 justify-center">
                        {' '}latitude:{' '}
                      </td>
                      <td className="fw4 white hover-white bg-light-blue no-underline ma-1 pa2 ba2 justify-center">
                        {this.props.coords.heading}
                      </td>
                    </tr>
                  : <div />}
                {this.props.coords.speed != null
                  ? <tr>
                      <td className="fw4 white hover-white bg-light-blue no-underline ma-1 pa2 ba2 justify-center">
                        {' '}latitude:{' '}
                      </td>
                      <td className="fw4 white hover-white bg-light-blue no-underline ma-1 pa2 ba2 justify-center">
                        {this.props.coords.speed}
                      </td>
                    </tr>
                  : <div />}
              </tbody>
            </table>
          : <div className="pa6 w-100 justify-center fw10 ">
              Calculating your location &hellip;
            </div>
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(CurrentLocation)
