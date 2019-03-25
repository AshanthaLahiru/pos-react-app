import React from "react";
import ReactDOM from "react-dom";
import Login from "./login/login";
import OrderList from "./order/order-list"
import Register from "./register/register"
import { NotificationContainer } from 'react-notifications';


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

    handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        this.setState({
            path: "login"
        })
    }

    renderLogin() {
        return (
            <div>
                <NotificationContainer />
                <Login onClickRegister={() => this.setState({ path: "register" })} onLoginClick={(status) => { this.handleLogin(status) }} />
            </div>
        )
    }

    renderRegister() {
        return (
            <div>
                <NotificationContainer />
                <Register onClickLogin={(path) => this.setState({ path: "login" })} />
            </div>
        )
    }

    renderHome() {
        return (
            <div>
                <NotificationContainer />
                <OrderList onClickLogout={(status) => { this.handleLogout(status) }} />
            </div>
        )
    }
}

export default App;