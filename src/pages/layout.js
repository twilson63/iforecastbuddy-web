import React from 'react'

import Header from '../components/header'
import Footer from '../components/footer'

const Layout = Component => props => {
  return (
    <div>
      <Header history={props.history} />
      <main>
        <Component {...props} />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
