import React from "react";
import { Spinner, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Collapse, Card, CardBody } from 'reactstrap';
import { host } from "../../config/config"
import axios from "axios"
import Order from "./order"

class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isOrderShowing: true
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showOrder = this.showOrder.bind(this);
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

        // axios.post(host + "user/login", {
        //   email: this.state.user_name,
        //   password: this.state.user_password
        // })
        //   .then(response => {
        //     localStorage.setItem('token', response.data['auth-token']);
        //     this.setState({
        //       isLoading: false
        //     })
        //   })
        //   .catch(e => {
        //     this.setState({
        //       isLoading: false
        //     })
        //   })
    }

    showOrder() {
        this.setState({
            isOrderShowing: !this.state.isOrderShowing
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <nav className="navbar navbar-light" style={{ backgroundColor: '#1E90FF', borderRadius: '5px' }}>
                    <span className="navbar-brand mb-0 h1">POS System</span>
                </nav>
                <br />
                <div className="row col-md-6 offset-md-3">
                    <ListGroup className="btn-block">
                        <ListGroupItem active>
                            <ListGroupItemHeading> Order 1 <button onClick={this.showOrder} className="btn btn-outline-success float-right">Show Order</button></ListGroupItemHeading>
                            <ListGroupItemText>
                                Test Order Details
                            </ListGroupItemText>
                            <Order />
                        </ListGroupItem>
                    </ListGroup>
                </div>
            </div>
        );
    }
}

export default OrderList;
