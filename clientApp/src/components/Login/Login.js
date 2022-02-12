import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import classNames from 'classnames';
import { login } from '../../actions/securityActions';

class Login extends Component {
  constructor() {
      super();

      this.state = {
        "username":"",
        "password":"",
        "errors":{}
      }

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
      if (this.props.auth.validToken) {
        this.props.history.push("/dashboard")
      }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
        this.setState({errors: nextProps.errors})
    }
    if (nextProps.auth.validToken) {
        this.props.history.push("/dashboard");
    }
  }

  onChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
        "username":this.state.username,
        "password":this.state.password
    }

    this.props.login(user);
  }

  render() {
    const {errors} = this.state;
    return (
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center font-weight-bold">Log In</h1>
                        <form className="mt-4" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="email" className={classNames("form-control form-control-lg",{"is-invalid": errors.username})} 
                                placeholder="Email Address" name="username" value={this.state.username} onChange={this.onChange}/>
                                {errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
                            </div>
                            <div className="form-group">
                                <input type="password" className={classNames("form-control form-control-lg",{"is-invalid": errors.password})} 
                                placeholder="Password" name="password" value={this.state.password} onChange={this.onChange}/>
                                {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                            </div>
                            <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
})


export default connect(mapStateToProps, {login})(Login);