import React from "react";
import { Spinner } from 'reactstrap';
import { service } from "../../services/service";
import { NotificationManager } from 'react-notifications';


class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: "",
            user_email: "",
            user_password: "",
            confirm_user_password: "",
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

        if (this.state.user_name == "" && this.state.user_email == "" && this.state.user_password == "") {
            NotificationManager.error('Please fill all the fields');
        }
        else if (this.state.user_password == this.state.confirm_user_password) {
            this.setState({
                isLoading: true
            })

            let user = {
                name: this.state.user_name,
                email: this.state.user_email,
                password: this.state.user_password
            }


            service.registerUser(user)
                .then((response) => {
                    this.setState({
                        isLoading: false
                    })
                    NotificationManager.success('Registration is completed successfully. Please Sign In', 'Success');
                    this.props.onClickLogin();
                })
                .catch(e => {
                    this.setState({
                        isLoading: false
                    })
                    NotificationManager.error('Registration failed. Please contact the service provider', 'Invalid Registration');
                })
        } else {
            NotificationManager.error('Password doesn\'t match', 'Invalid Registration');
        }
    }

    render() {
        return (
            <div className="row h-75">
                <div className="col-sm-12 col-md-4 offset-md-4 my-auto">
                    <div className="card border-info text-center">
                        <div className="card-header">
                            <h4> Sign Up</h4>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <input className="form-control" type="text" name="user_name" id="user_name" placeholder="Name" onChange={this.handleChange} required={true} />
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="email" name="user_email" id="user_email" placeholder="Email" onChange={this.handleChange} required={true} />
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="password" name="user_password" id="user_password" placeholder="Password" onChange={this.handleChange} required={true} />
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="password" name="confirm_user_password" id="confirm_user_password" placeholder="Confirm Password" onChange={this.handleChange} required={true} />
                            </div>
                            <br />
                            <div className="text-center">
                                {this.state.isLoading ? (<Spinner type="grow" color="success" />) : (<button onClick={this.handleSubmit} className="btn btn-success btn-block" name="Login">Sign Up</button>)}
                            </div>
                            <br />
                            <a className="mock-button" onClick={this.props.onClickLogin}>Back to Login</a>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default RegisterForm;
