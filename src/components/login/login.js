import React from "react";
import { Jumbotron, Button, Container, Col, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { service } from "../../services/service";

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

    service.authenticateUser(this.state.user_name, this.state.user_password)
      .then((response) => {
        localStorage.setItem('token', response.data['auth-token']);
        localStorage.setItem('email', response.data['email']);
        this.setState({
          isLoading: false
        })
        this.props.onLoginClick(200);
      })
      .catch(e => {
        console.log(e)
        this.setState({
          isLoading: false
        })
        this.props.onLoginClick(401);
      })

  }

  render() {
    return (

      <div className="row h-100">
        <div className="col-sm-12 my-auto">
          <Col sm="12" md={{ size: 4, offset: 4 }}>
            <div className="card border-info text-center">
              <div className="card-header">
                Sign In
              </div>
              <div className="card-body">
                <FormGroup>
                  <Input type="email" name="user_name" id="user_name" placeholder="Email" onChange={this.handleChange} required={true} />
                </FormGroup>
                <FormGroup>
                  <Input type="password" name="user_password" id="user_password" placeholder="Password" onChange={this.handleChange} required={true} />
                </FormGroup>
                <br />
                <div className="text-center">
                  {this.state.isLoading ? (<Spinner type="grow" color="success" />) : (<button onClick={this.handleSubmit} className="btn btn-success btn-block" name="Login">Sign In</button>)}
                  <br />
                  <a style={{ cursor: 'pointer' }} onClick={() => this.props.onClickRegister()}>New User?</a>
                </div>
              </div>
            </div>
          </Col>
        </div>
      </div >
    );
  }
}

export default Login;
