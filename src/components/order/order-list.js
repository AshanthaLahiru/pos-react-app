import React from "react";
import { Spinner, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Collapse, Card, CardBody } from 'reactstrap';
import { host } from "../../config/config"
import axios from "axios"
import Order from "./order"

class OrderList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // isLoading: false,
            // isOrderShowing: true,
            orderTots: {},
            orderVisibility: {},

            orderList: [{
                id: "order-id-1",
                items: [
                    {
                        itemId: "id1",
                        name: "Soap",
                        price: "1",
                        quantity: 3
                    },
                    {
                        itemId: "id2",
                        name: "Cream",
                        price: "15",
                        quantity: 1
                    }]
            },
            {
                id: "order-id-2",
                items: [
                    {
                        itemId: "id1",
                        name: "Soap",
                        price: "1",
                        quantity: 3
                    },
                    {
                        itemId: "id2",
                        name: "Cream",
                        price: "15",
                        quantity: 1
                    }]
            }
            ]
        };

        this.renderOrderList = this.renderOrderList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showOrder = this.showOrder.bind(this);
        this.handleOrderTotal = this.handleOrderTotal.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    handleOrderTotal(orderId, total) {
        let order = this.state.orderTots;
        order[orderId] = total;
        this.setState({
            orderTots: order
        })
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

    showOrder(orderId) {
        let order = {};
        this.state.orderList.forEach((item) => {
            if (orderId == item.id)
                order[item.id] = true;
            else
                order[item.id] = false;
        })

        this.setState({
            orderVisibility: order
        })
    }


    renderOrderList() {
        return (
            this.state.orderList.map((order, index) =>
                <div key={index}>
                    <ListGroupItem active={this.state.orderVisibility[order.id]}>
                        <ListGroupItemHeading>{order.id}<button onClick={(event) => this.showOrder(order.id)} className="btn btn-outline-success float-right">Show Order</button></ListGroupItemHeading>
                        <ListGroupItemText>
                            Total: $ {this.state.orderTots[order.id]}
                        </ListGroupItemText>
                        {this.state.orderVisibility[order.id] ? (<Order onOrderUpdate={(total) => this.handleOrderTotal(order.id, total)} />) : (<div></div>)}
                    </ListGroupItem>
                    <br />
                </div>
            )
        )
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
                        {this.renderOrderList()}
                    </ListGroup>
                </div>
            </div>
        );
    }
}

export default OrderList;
