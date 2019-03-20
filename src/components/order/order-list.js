import React from "react";
import { Spinner, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Collapse, Card, CardBody } from 'reactstrap';
import Order from "./order"
import OrderCreate from "./order-create"
import { orderService } from "../../services/service"

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
        console.log(orderName)
        this.setState({
            creatOrderModalShow: !this.state.creatOrderModalShow
        })

        let order = {
            id: orderName,
            email: 'ashantha.lahiru@gmail.com',
            items: []
        }

        orderService.createOrder(order)
            .then((result) => {
                console.log(result)
                this.updateOrderList()
            })
    }

    updateOrderList() {
        let userId = 'ashantha.lahiru@gmail.com'
        orderService.getAllOrdersByUser(userId)
            .then((response) => {
                this.setState({
                    orderList: response.data
                })

                console.log(response)
            })
    }

    renderOrderList() {
        return (
            this.state.orderList.map((order, index) =>
                <div key={index}>
                    <ListGroupItem active={this.state.orderVisibility[order.id]}>
                        <ListGroupItemHeading>{order.id}<button onClick={(event) => this.showOrder(order.id)} className="btn btn-outline-secondary float-right">Show Order</button></ListGroupItemHeading>
                        <ListGroupItemText>
                            Total: $ {this.state.orderTots[order.id]}
                        </ListGroupItemText>
                    </ListGroupItem>
                    {this.state.orderVisibility[order.id] ? (<Order orderId={order.id} onOrderUpdate={(total) => this.handleOrderTotal(order.id, total)} />) : (<div></div>)}
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
                    <button onClick={() => this.handleToggleShowOrder()} className="btn btn-outline-light float-right">Create New Order</button>
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
