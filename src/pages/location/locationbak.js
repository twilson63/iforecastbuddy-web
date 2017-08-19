import React from 'react'
import { geolocated } from 'react-geolocated'

var OpenLayers = ''

// Ensure you include the OpenLayers package (see relevant html above)
// Define Projections
var Geographic = new OpenLayers.Projection('EPSG:4326')
var Mercator = new OpenLayers.Projection('EPSG:900913')

// Initialize your map and place it in the map div.
var map = new OpenLayers.Map({
  div: 'map',
  maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
  maxResolution: 156543.0339,
  projection: Mercator,
  displayProjection: Geographic,
  numZoomLevels: 20
})

map.addControl(new OpenLayers.Control.LayerSwitcher())
var layerOSM = new OpenLayers.Layer.OSM()
map.addLayer(layerOSM)
var center = new OpenLayers.LonLat(-98, 40.5).transform(Geographic, Mercator)
map.setCenter(center, 3)

/**
 * You don't need to touch this function (except if it can't find the this.map in which case point it to your map object). It is
 * used by Openlayers to assign a grid (x,y,z) to the radar data TMS request below. Function that transforms data into the
 * spherical mercator projection
 */

var radar_url = function(bounds) {
  var res = this.map.getResolution()
  var x = Math.round(
    (bounds.left - this.maxExtent.left) / (res * this.tileSize.w)
  )
  var y = Math.round(
    (this.maxExtent.top - bounds.top) / (res * this.tileSize.h)
  )
  var z = this.map.getZoom()
  var path = '/' + z + '/' + x + '/' + y + '.' + this.type
  var url = this.url + this.layername
  if (url instanceof Array) {
    url = this.selectUrl(path, url)
  }
  return url + path
}

/**
 * For NEXRAD from the NWS - uses jQuery for asynchronous ajax call to retrieve jsonp.
 * Typically you would make the map calls outside of the callback function, but for simplicity
 * I put them in the function.
 */

$.ajax({
  url:
    'http://www.srh.noaa.gov/ridge2/ajax/radar_paths.php?callback=?&rid=NAT&pid=N0Q',
  async: false,
  dataType: 'json',
  success: function(data) {
    var radarTime = data.radarinfo[0].path // <-- the most current time with the path to the images
    var radarLayer = 'ridge::NAT-N0Q-' + radarTime.match(/\d{12}/)[0] // <--Pull out the current time

    /**
         * Radar server tilecache url
         */
    var tilecache = ['http://ridgewms.srh.noaa.gov/tc/tc.py/1.0.0/']

    /**
         * The Radar layer
         * rid = NAT = National
         * pid = N0Q = Base Reflectivity
         */
    var radarLayer = new OpenLayers.Layer.TMS('NWS Radar', tilecache, {
      layername: radarLayer, // <-- *** this comes from the ajax call. Use the path part: "path": "/srweb/ridge2/tiff/NAT_N0Q_201303191025.tif" so strip out everything except: NAT_N0Q_201303191025 and then prepend the ridge:: so you end up with ridge::NAT-N0Q-201303191045
      type: 'png',
      isBaseLayer: false,
      getURL: radar_url,
      mapType: 'radar',
      rid: 'NAT',
      pid: 'N0Q',
      displayInLayerSwitcher: false,
      opacity: 1,
      buffer: 0,
      visibility: true
    })
    map.addLayer(radarLayer)
  }
})

class CurrentLocation extends React.Component {
  render() {
    ;<div
      id="map"
      style="width: 600px; height: 300px; border: 1px solid black"
    />
    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : (console.log('coords', this.props.coords), this.props.coords)
          ? <table>
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
          : <div>Getting the location data&hellip; </div>
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(CurrentLocation)
