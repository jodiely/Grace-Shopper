import React from 'react'
import {connect} from 'react-redux'

const App = ({ children, user }) => {

  return (
    <div>
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar">{/*Shopping Cart*/}</span>
                        <span className="icon-bar">{/*Log In / Sign Up*/}</span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="/">Space Shopper</a>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="/cart"><span className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>  Cart</a></li>
                        { user ? <li><a href="#"> My Account </a></li> : <li><a href="#">Log In / Sign Up</a></li>}
                    </ul>
                </div>
            </div>
        </nav>
        <div>
            <div id='home'>
                {children}
            </div>
        </div>
    </div>
  )
}


export default connect(
  ({ auth }) => ({ user: auth })
)(App)
