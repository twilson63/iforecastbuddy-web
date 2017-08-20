import React from 'react'

import { Route, BrowserRouter, Switch } from 'react-router-dom'
//import { ConnectedRouter } from 'react-router-redux'

// import PageWithIframeEntry from './pages/async/PageWithIframeEntry.js'

// Attempting to Fix links
import history from './history'

// pages/layout
import Layout from './pages/layout'

// pages/root
import Home from './pages/home'
import About from './pages/about'
import FooterBoatRamps from './pages/boatramps.js'
import PageWidget from './pages/iframeGoogleexample.js'

// Pages/users
import Login from './pages/users/login'
import CreateUser from './pages/users/createuser'
import ShowUser from './pages/users/show.js'

// pages/basics
import SimpleMapExample from './pages/basics/SimpleMapExample'
import GeolocationExample from './pages/basics/GeoLocationExample.js'
import KmlLayerExample from './pages/basics/KMLBoatRamps.js'
import MarkerMapExampleGoog from './pages/basics/MarkerMap.js'

// pages/forecasts
import ImportWeather from './pages/forecasts/import-forecasts'
import ForecastsList from './pages/forecasts/forecastlist'
import './pages/location/map'
import CreateForecast from './pages/forecasts/create-forecast'

import geolocated from './pages/location/location'

// import MarkerClustererExample from './pages/addons/MarkerClustererExample.js'

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={Layout(Home)} />
            <Route path="/about-us" component={Layout(About)} />
            <Route path="/signup" component={Layout(CreateUser)} />
            <Route path="/user" componenet={Layout(ShowUser)} />
            <Route path="/location" component={Layout(geolocated)} />
            <Route path="/forecasts" component={Layout(ForecastsList)} />
            <Route path="/login" component={Layout(Login)} />
            <Route path="/import" component={Layout(ImportWeather)} />
            <Route path="/createforecast" component={Layout(CreateForecast)} />
            <Route path="/simpleMap" component={Layout(SimpleMapExample)} />
            <Route path="/geoMap" component={Layout(GeolocationExample)} />
            <Route path="/boatramps" component={Layout(KmlLayerExample)} />
            <Route
              path="/footer/boatramps"
              component={Layout(FooterBoatRamps)}
            />
            <Route path="/markermap" component={Layout(MarkerMapExampleGoog)} />
            <Route path="/iframe" component={Layout(PageWidget)} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
