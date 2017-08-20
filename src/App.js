import React from 'react'

import { Route, BrowserRouter, Switch } from 'react-router-dom'
//import { ConnectedRouter } from 'react-router-redux'

// import PageWithIframeEntry from './pages/async/PageWithIframeEntry.js'

// Attempting to Fix links
import history from './history'

// components
import Header from './components/header'
import Footer from './components/footer'

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
      <div>
        <Header />
        <main>
          <BrowserRouter history={history}>
            <div>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about-us" component={About} />
                <Route path="/signup" component={CreateUser} />
                <Route path="/user" componenet={ShowUser} />
                <Route path="/location" component={geolocated} />
                <Route path="/forecasts" component={ForecastsList} />
                <Route path="/login" component={Login} />
                <Route path="/import" component={ImportWeather} />
                <Route path="/createforecast" component={CreateForecast} />
                <Route path="/simpleMap" component={SimpleMapExample} />
                <Route path="/geoMap" component={GeolocationExample} />
                <Route path="/boatramps" component={KmlLayerExample} />
                <Route path="/footer/boatramps" component={FooterBoatRamps} />
                <Route path="/markermap" component={MarkerMapExampleGoog} />
                <Route path="/iframe" component={PageWidget} />
              </Switch>
            </div>
          </BrowserRouter>
        </main>
        <Footer />
      </div>
    )
  }
}
