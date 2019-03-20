import React from "react";
import { Col, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { service } from "../../services/service";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: "",
            user_email: "",
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
            })
            .catch(e => {
                this.setState({
                    isLoading: false
                })
                // this.props.onLoginClick(401);
            })


    }

    render() {
        return (

            <div className="row h-100">
                <div className="col-sm-12 my-auto">
                    <Col sm="12" md={{ size: 4, offset: 4 }}>
                        <div className="card border-info text-center">
                            <div className="card-header">
                                Sign Up
                            </div>
                            <div className="card-body">
                                <FormGroup>
                                    <Input type="text" name="user_name" id="user_name" placeholder="Name" onChange={this.handleChange} required={true} />
                                </FormGroup>
                                <FormGroup>
                                    <Input type="email" name="user_email" id="user_email" placeholder="Email" onChange={this.handleChange} required={true} />
                                </FormGroup>
                                <FormGroup>
                                    <Input type="password" name="user_password" id="user_password" placeholder="Password" onChange={this.handleChange} required={true} />
                                </FormGroup>
                                <br />
                                <div className="text-center">
                                    {this.state.isLoading ? (<Spinner type="grow" color="success" />) : (<button onClick={this.handleSubmit} className="btn btn-success btn-block" name="Login">Sign Up</button>)}
                                </div>
                                <br />
                                <a style={{ cursor: 'pointer' }} onClick={() => this.props.onClickLogin()}>Back to Login!</a>
                            </div>
                        </div>
                    </Col>
                </div>
            </div >
        );
    }
}

export default Register;
