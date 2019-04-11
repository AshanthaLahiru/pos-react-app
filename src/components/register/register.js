import React from "react";
import { Spinner } from 'reactstrap';
import { service } from "../../services/service";
import { NotificationManager } from 'react-notifications';
import TopBar from "../utill/top-bar";
import RegisterForm from "./register-form"

class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid">
                <TopBar />
                <RegisterForm onClickLogin={this.props.onClickLogin} />
            </div>
        );
    }
}

export default Register;
