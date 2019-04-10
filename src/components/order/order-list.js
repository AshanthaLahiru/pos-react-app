import React from "react";
import { Spinner, ListGroup, ListGroupItem, ListGroupItemHeading, Alert, Collapse, Card, CardBody } from 'reactstrap';
import Order from "./order"
import OrderCreate from "./order-create"
import { service } from "../../services/service"
import { NotificationManager } from 'react-notifications';
import TopBar from '../utill/top-bar'

class OrderList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            orderTots: {},
            orderVisibility: {},
            creatOrderModalShow: false,
            orderList: [],
        };

        this.renderOrderList = this.renderOrderList.bind(this);
        this.showOrder = this.showOrder.bind(this);
        this.handleOrderTotal = this.handleOrderTotal.bind(this);
        this.handleToggleShowOrder = this.handleToggleShowOrder.bind(this);
        this.handleCreateOrder = this.handleCreateOrder.bind(this);
        this.handleOrderLoadingStatus = this.handleOrderLoadingStatus.bind(this);
        this.updateOrderList = this.updateOrderList.bind(this);
    }

    componentDidMount() {
        this.updateOrderList();
    }

    handleOrderTotal(orderId, total) {
        let order = this.state.orderTots;
        order[orderId] = total;
        this.setState({
            orderTots: order,
        })
    }

    handleOrderLoadingStatus() {
        this.setState({
            isOrderLoading: false
        })
    }

    showOrder(orderId) {
        let order = {};
        let tempLoading = true;

        this.state.orderList.forEach((item) => {
            if (orderId == item.id) {
                if (this.state.orderVisibility[item.id]) {
                    tempLoading = false;
                }
                order[item.id] = true;
            }
            else
                order[item.id] = false;
        })

        this.setState({
            orderVisibility: order,
            isOrderLoading: tempLoading
        })
    }

    handleToggleShowOrder() {
        this.setState({
            creatOrderModalShow: !this.state.creatOrderModalShow
        })
    }

    handleCreateOrder(orderId) {
        let visbility = this.setPropertyValues(this.state.orderList);
        this.setState({
            orderVisibility: visbility
        })

        this.setState({
            creatOrderModalShow: !this.state.creatOrderModalShow
        })

        let order = {
            id: orderId,
            email: localStorage.getItem("email"),
            items: [],
            status: "pending"
        }

        service.createOrder(order)
            .then((result) => {
                return this.updateOrderList();
            })
            .then(() => {
                let visbility = this.setPropertyValues(this.state.orderList, orderId);
                this.setState({
                    orderVisibility: visbility
                })
            })
        NotificationManager.success('Order Creation Successful', 'Success');
    }

    setPropertyValues(array, orderId = null) {
        let tempVisibility = {};

        if (orderId) {
            array.forEach((item) => {
                if (orderId == item.id)
                    tempVisibility[item.id] = true;
                else
                    tempVisibility[item.id] = false;
            })
        }
        else {
            array.forEach((item) => {
                tempVisibility[item.id] = false;
            })
        }
        return tempVisibility;
    }

    updateOrderList() {
        let userId = localStorage.getItem("email");
        return service.getAllOrdersByUser(userId)
            .then((response) => {
                if (response) {
                    this.setState({
                        orderList: response.data,
                    })
                }
                return;
            })
    }

    renderTotalOnList(tot) {
        return (
            <h3 className="pt-2" style={{ color: "red" }}>Total: $ {tot}</h3>
        );
    }

    checkOrderStatus(status) {
        if (status == "served") {
            return <span className="float-right text-success">SERVED</span>;
        }
        else {
            return <span className="float-right text-warning">PENDING</span>;
        }
    }

    renderOrderDetails(id, status) {
        return (<Order orderStatus={status} orderId={id} onOrderUpdate={(total) => this.handleOrderTotal(id, total)} updateOrderList={this.updateOrderList} onLoadingStatusToggle={this.handleOrderLoadingStatus} />);
    }

    // active={this.state.orderVisibility[order.id]}
    // backgroundColor: "#E5E8E8"
    renderOrderList() {
        return (
            this.state.orderList.map((order, index) =>
                <div key={index}>
                    <a className="mock-button" onClick={() => this.showOrder(order.id)}>
                        <ListGroupItem>
                            <ListGroupItemHeading>{order.id} {(this.state.isOrderLoading && this.state.orderVisibility[order.id]) ? (<Spinner type="grow" color="danger" className="float-right" />) : this.checkOrderStatus(order.status)}</ListGroupItemHeading>
                            {(this.state.orderVisibility[order.id] && this.state.orderTots[order.id]) ? this.renderTotalOnList(this.state.orderTots[order.id]) : ""}
                        </ListGroupItem>
                    </a>
                    {this.state.orderVisibility[order.id] ? this.renderOrderDetails(order.id, order.status) : ("")}
                    <br />
                </div>
            )
        )
    }

    renderEmptyOrderView() {
        return (
            <div className="alert alert-secondary text-center" role="alert">
                <h5>Hey, There are no orders. Please create an order.!</h5>
            </div>
        )
    }

    render() {
        return (
            <div className="container-fluid">
                <TopBar onToggleShowOrder={() => this.handleToggleShowOrder()} onClickLogout={() => this.props.onClickLogout()} />
                <OrderCreate visibility={this.state.creatOrderModalShow} onClickCreateShow={() => this.handleToggleShowOrder()} orderName={"Order-" + Date.now()} onCreateOrder={(orderName) => this.handleCreateOrder(orderName)} />
                <br />
                <div className="row col-md-6 offset-md-3">
                    <ListGroup className="btn-block">
                        {this.state.orderList.length != 0 ? this.renderOrderList() : this.renderEmptyOrderView()}
                    </ListGroup>
                </div>
            </div>
        );
    }
}

export default OrderList;
