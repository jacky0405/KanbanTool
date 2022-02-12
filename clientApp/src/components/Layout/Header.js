import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { logout } from '../../actions/securityActions';

class Header extends Component {

  logout() {
      this.props.logout();
      window.location.href = "/";
  }

  render() {
    const {validToken, user} = this.props.auth;

    const userAuthenticated = (
        <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <a className="nav-link" href="/dashboard">
                        Dashboard
                    </a>
                </li>
            </ul>

            <ul className="navbar-nav ml-auto float-right">
                <li className="nav-item">
                    <Link className="nav-link " to="/dashboard">
                        <i className="fas fa-user-circle mr-1">
                            {user.fullname}
                        </i>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/logout" onClick={this.logout.bind(this)}>
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    )

    const userIsNotAuthenticated = (
        <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav ml-auto float-right">
                <li className="nav-item">
                    <Link className="nav-link " to="/register">
                        Sign Up
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
            </ul>
        </div>
    )
    
    let headerLinks;
    if(validToken && user) {
        headerLinks = userAuthenticated
    } else {
        headerLinks = userIsNotAuthenticated
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Jacky's Kanban Tool
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon" />
                </button>

                {headerLinks}
                
            </div>
        </nav>
    );
  }
}

Header.propTypes = {
    logout : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth 
});

export default connect(mapStateToProps, {logout})(Header);
