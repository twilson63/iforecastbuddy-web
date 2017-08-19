import React from 'react'
// import { push } from 'react-router-redux'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import { location } from './location/location'
// import map from './location/map'

// import Header from '../components/header'

const Home = props =>
  <div>
    <img className="w-100" src={require('../images/iforecastBoat.jpg')} />
    <div id="map" />
  </div>

export default Home
