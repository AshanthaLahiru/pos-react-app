import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from "react-dom";
import Login from "./components/login/login";
import OrderList from "./components/order/order-list"


const element = <h1>Hello World!</h1>;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      path: "login"
    }
  }

  render() {
    if (this.state.path == "login" && !localStorage.getItem('token')) {
      return this.renderLogin();
    } else if (this.state.path == "register") {
      return this.renderRegister();
    } else if (this.state.path == "home" || localStorage.getItem('token')) {
      return this.renderHome();
    }
  }

  handleLogin(status) {
    if (status == 200) {
      this.setState({
        path: "home"
      })
    }
  }

  renderLogin() {
    return <Login onLoginClick={(status) => { this.handleLogin(status) }} />
  }

  renderRegister() { }

  renderHome() {
    return <OrderList />
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
