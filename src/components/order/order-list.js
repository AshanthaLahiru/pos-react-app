import React from "react";
import { Spinner, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Collapse, Card, CardBody } from 'reactstrap';
import Order from "./order"
import OrderCreate from "./order-create"
import { service } from "../../services/service"

class OrderList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // isLoading: false,
            // isOrderShowing: true,
            orderTots: {},
            orderVisibility: {},
            creatOrderModalShow: false,

            orderList: []
        };

        this.renderOrderList = this.renderOrderList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showOrder = this.showOrder.bind(this);
        this.handleOrderTotal = this.handleOrderTotal.bind(this);
        this.handleToggleShowOrder = this.handleToggleShowOrder.bind(this);
        this.handleCreateOrder = this.handleCreateOrder.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    componentDidMount() {
        this.updateOrderList();
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

    handleToggleShowOrder() {
        this.setState({
            creatOrderModalShow: !this.state.creatOrderModalShow
        })
    }

    handleCreateOrder(orderName) {
        this.setState({
            creatOrderModalShow: !this.state.creatOrderModalShow
        })

        let order = {
            id: orderName,
            email: localStorage.getItem("email"),
            items: []
        }

        service.createOrder(order)
            .then((result) => {
                this.updateOrderList()
            })
    }

    updateOrderList() {
        let userId = localStorage.getItem("email");
        service.getAllOrdersByUser(userId)
            .then((response) => {
                this.setState({
                    orderList: response.data
                })
            })
    }

    renderTotalOnList(tot) {
        return (
            <h3 className="pt-2" style={{ color: "red" }}>Total: $ {tot}</h3>
        );
    }

    // active={this.state.orderVisibility[order.id]}
    // backgroundColor: "#E5E8E8"
    renderOrderList() {
        return (
            this.state.orderList.map((order, index) =>
                <div key={index}>
                    <a style={{ cursor: 'pointer' }} onClick={(event) => this.showOrder(order.id)}>
                        <ListGroupItem>
                            <ListGroupItemHeading>{order.id}</ListGroupItemHeading>
                            {(this.state.orderVisibility[order.id] && this.state.orderTots[order.id]) ? this.renderTotalOnList(this.state.orderTots[order.id]) : ""}
                        </ListGroupItem>
                    </a>
                    {this.state.orderVisibility[order.id] ? (<Order orderId={order.id} onOrderUpdate={(total) => this.handleOrderTotal(order.id, total)} />) : ("")}
                    <br />
                </div>
            )
        )
    }

    render() {
        return (
            <div className="container-fluid">
                <br />
                <nav className="navbar navbar-dark bg-dark" style={{ backgroundColor: '#3766FF', borderRadius: '5px' }}>
                    <span className="navbar-brand p-3 mb-2 h1">POS System</span>
                    <div>
                        <button onClick={() => this.handleToggleShowOrder()} className="btn btn-outline-light m-2">Create New Order</button>
                        <button onClick={() => this.props.onClickLogout()} className="btn btn-outline-light">Logout</button>
                    </div>
                </nav>
                <OrderCreate visibility={this.state.creatOrderModalShow} onClickCreateShow={() => this.handleToggleShowOrder()} orderName={"Order-" + Date.now()} onCreateOrder={(orderName) => this.handleCreateOrder(orderName)} />
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
