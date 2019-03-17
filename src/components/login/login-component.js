import React from "react";
import { Jumbotron, Button, Container, Col, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { host } from "../../config/config"
import axios from "axios"

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      user_password: "",
      isLoading: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    this.setState({
      isLoading: true
    })

    axios.post(host + "user/login", {
      email: this.state.user_name,
      password: this.state.user_password
    })
      .then(response => {
        localStorage.setItem('token', response.data['auth-token']);
        this.setState({
          isLoading: false
        })
      })
      .catch(e => {
        this.setState({
          isLoading: false
        })
      })
  }

  render() {
    return (
      <div className="row h-100">
        <div className="col-sm-12 my-auto">
          <Col sm="12" md={{ size: 4, offset: 4 }}>
            <FormGroup>
              <Input type="email" name="user_name" id="user_name" placeholder="Email" onChange={this.handleChange} required={true} />
            </FormGroup>
            <FormGroup>
              <Input type="password" name="user_password" id="user_password" placeholder="Password" onChange={this.handleChange} required={true} />
            </FormGroup>
            <br />
            <div className="text-center">
              {this.state.isLoading ? (<Spinner type="grow" color="success" />) : (<button onClick={this.handleSubmit} className="btn btn-success btn-block" name="Login">Sign In</button>)}
            </div>
          </Col>
        </div>
      </div >
    );
  }
}

export default Login;
