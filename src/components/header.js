import { Link } from 'react-router-dom'
// import Home from '../pages/home'
// import About from '../pages/about'
import React from 'react'

export default () =>
  <div>
    <header className="sans-serif">
      <div className="w-100 mv0 justify-center ph-50 bg-blue navy">
        <a href="/">
          <img
            src={require('./iforecastbuddyorange.gif')}
            className="fl grow flex items-left h4 w4 mt3 pl2 pv2 hover-red"
            alt="info icon"
          />{' '}
        </a>
        <div className="mt4 mr2 f4 grow fw4 white hover-white bg-light-blue ma-1 dib pv2 ph3 ba2 fr">
          <Link className="no-underline hover-white" to="/signup">
            Sign Up
          </Link>
        </div>
        <div className="dtc v-mid tr flex justify-center">
          <span className="lh-0 white pv1 avenir fw4 mb0">
            <h2 className="mt1">iForecastBuddy</h2>
            <span className="white avenir fw1 mb1">
              <h4 className="">Fish More, click refresh less</h4>
            </span>
          </span>
        </div>
      </div>
      <div className="w-100 mv0 justify-center ph-100 bg-white" />
    </header>
  </div>
