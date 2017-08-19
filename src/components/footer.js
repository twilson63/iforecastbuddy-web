import { Link } from 'react-router-dom'
//import Home from '../pages/home'
//import About from '../pages/about'
import React from 'react'

export default () =>
  <div>
    <footer className="flex-shrink:0 pv4 mb5 ph3 ph5-m ph6-l mid-gray">
      <small className="f6 db tc">
        © 2017 <b className="ttu">iforecastbuddy LLC</b>., All Rights Reserved
      </small>
      <div className="tc mt3">
        <Link className="f6 dib ph2 link mid-gray dim" to="/language">
          Language
        </Link>
        <Link className="f6 dib ph2 link mid-gray dim" to="/terms">
          Terms of use
        </Link>
        <Link className="f6 dib ph2 link mid-gray dim" to="/privacy">
          Privacy Policy
        </Link>
      </div>
    </footer>
  </div>
