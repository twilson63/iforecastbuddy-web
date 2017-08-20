import { Link } from 'react-router-dom'
// import Home from '../pages/home'
// import About from '../pages/about'
import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import store from '../store'

const Header = props => {
  const handleLink = to => e => {
    props.history.push(to)
  }
  return (
    <div>
      <header className="sans-serif">
        <div className="w-1 00 mv0 justify-center ph-50 bg-blue navy">
          <a href="/">
            <img
              src={require('./iforecastbuddyorange.gif')}
              className="fl grow flex items-left h4 w4 mt0 pl2 pv2 hover-red"
              alt="info icon"
            />{' '}
          </a>
          {
            (store.getState().session.profile.sub = ''
              ? <div className="mt4 mr2 f4 grow fw4 white hover-white bg-light-blue ma-1 dib pv2 ph3 ba2 fr">
                  <Link className="no-underline hover-white" to="/signup">
                    Sign Up
                  </Link>
                </div>
              : <div className="mt4 mr2 f4 grow fw4 white hover-white bg-light-blue ma-1 dib pv2 ph3 ba2 fr flex-wrap-m">
                  {`Logged in as
                    ${store.getState().session.profile
                      .firstName} ${store.getState().session.profile.lastName}`}
                </div>)
          }

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
      <header />
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/forecasts">My Forecasts</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}>
              <Link to="/user">My Profile</Link>
            </NavItem>
            <NavItem eventKey={2}>
              <Link to="/boatramps">My Boat Ramps</Link>
            </NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1} onClick={handleLink('/about-us')}>
                About
              </MenuItem>
              <MenuItem eventKey={3.2} onClick={handleLink('/createforecast')}>
                Add a Forecast
              </MenuItem>
              <MenuItem eventKey={3.3} onClick={handleLink('/location')}>
                My location
              </MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              Link Right
            </NavItem>
            <NavItem eventKey={2} href="#">
              Link Right
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
export default Header
