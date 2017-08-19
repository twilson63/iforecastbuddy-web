import React from 'react'
import axios from 'axios'

// Ensure you include the OpenLayers package (see relevant html above)
// Define Projections
var OpenLayers = ''
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
class FetchDemo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios
      //      .get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
      .get(
        `http://www.srh.noaa.gov/ridge2/ajax/radar_paths.php?callback=?&rid=NAT&pid=N0Q`
      )
      .then(function(data) {
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
      })
  }

  render() {
    return (
      <div>
        <h1>Map Test</h1>
        <ul>
          <div
            id="map"
            style="width: 600px; height: 300px; border: 1px solid black"
          />
          )}
        </ul>
      </div>
    )
  }
}

// ReactDOM.render(
//   <FetchDemo subreddit="reactjs" />,
//   document.getElementById('root')
// )
export default FetchDemo
