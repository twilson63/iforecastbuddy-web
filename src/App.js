import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import PageWithIframeEntry from './pages/async/PageWithIframeEntry.js'
import history from './history'
import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/home'
import About from './pages/about'
import Login from './pages/users/login'
import CreateUser from './pages/users/createuser'
import SimpleMapExample from './pages/basics/SimpleMapExample'
import ImportWeather from './pages/forecasts/import-forecasts'
import ForecastsList from './pages/forecasts/forecastlist'
import './pages/location/map'
import CreateForecast from './pages/forecasts/create-forecast'
import geolocated from './pages/location/location'
import GeolocationExample from './pages/basics/GeoLocationExample.js'
import KmlLayerExample from './pages/basics/KMLBoatRamps.js'
import MarkerClustererExample from './pages/addons/MarkerClustererExample.js'
import MarkerMapExampleGoog from './pages/basics/MarkerMap.js'

class App extends React.Component {
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
                <Route path="/location" component={geolocated} />
                <Route path="/forecasts" component={ForecastsList} />
                <Route path="/login" component={Login} />

                <Route path="/import" component={ImportWeather} />
                <Route path="/createforecast" component={CreateForecast} />
                <Route path="/simpleMap" component={SimpleMapExample} />
                <Route path="/geoMap" component={GeolocationExample} />
                <Route path="/boatramps" component={KmlLayerExample} />
                <Route path="/markermap" component={MarkerMapExampleGoog} />
              </Switch>
            </div>
          </BrowserRouter>
        </main>
        <Footer />
      </div>
    )
  }
}

export default App
