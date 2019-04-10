import React from "react";
import { Spinner } from 'reactstrap';
import { service } from "../../services/service";
import { NotificationManager } from 'react-notifications';
import TopBar from '../utill/top-bar'
import LoginForm from '../login/login-form'

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid">
        <TopBar />
        <LoginForm onClickRegister={this.props.onClickRegister} onClickLogin={this.props.onClickLogin} />
      </div>
    );
  }
}

export default Login;
