import React from "react";
import { Spinner } from 'reactstrap';
import { service } from "../../services/service";
import { NotificationManager } from 'react-notifications';


class LoginForm extends React.Component {
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
                this.props.onClickLogin(200);
                NotificationManager.success('Welcome', '');
            })
            .catch(e => {
                console.log(e)
                this.setState({
                    isLoading: false
                })
                this.props.onClickLogin(401);
                NotificationManager.error('Authentication Failed', 'Invalid Credentials');
            })

    }

    render() {
        return (
            <div className="row h-75">
                <div className="col-sm-12 col-md-6 offset-md-3 my-auto">
                    <div className="card border-info text-center">
                        <div className="card-header">
                            <h5>Sign In</h5>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <input className="form-control" type="email" name="user_name" id="user_name" placeholder="Email" onChange={this.handleChange} required={true} />
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="password" name="user_password" id="user_password" placeholder="Password" onChange={this.handleChange} required={true} />
                            </div>
                            <br />
                            <div className="text-center">
                                {this.state.isLoading ? (<Spinner type="grow" color="success" />) : (<button onClick={this.handleSubmit} className="btn btn-success btn-block" name="Login">Sign In</button>)}
                                <br />
                                <a className="mock-button" onClick={() => this.props.onClickRegister()}>New User?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginForm;
