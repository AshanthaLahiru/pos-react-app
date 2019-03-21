import React from "react";
import { Spinner, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Collapse, Card, CardBody } from 'reactstrap';
import { host } from "../../config/config"
import axios from "axios"
import SelectItem from "../item/item-select"
import ItemList from "../item/item-list";
import { service } from "../../services/service"



class Order extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            order: [],
            onList: [],
            isOrderShowing: false,
            isConfirmLoading: false
        };

        this.showOrder = this.showOrder.bind(this);
        this.handleUpdateQuantityItem = this.handleUpdateQuantityItem.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.confirmOrder = this.confirmOrder.bind(this);
    }

    handleAdd(itemIndex) {
        let order = this.state.order.slice();
        let onList = this.state.onList.slice();

        onList[itemIndex]["quantity"] = 1;
        order.push(onList[itemIndex])
        onList.splice(itemIndex, 1);

        this.setState({
            order: order,
            onList: onList
        });
        this.props.onOrderUpdate(this.calculateTotatl(order));
    }

    showOrder() {
        this.setState({
            isOrderShowing: !this.state.isOrderShowing
        })
    }

    handleUpdateQuantityItem(id, value) {
        const order = this.state.order.slice()
        order.find((item) => item.id == id).quantity = value;

        this.setState({
            order: order
        })

        this.props.onOrderUpdate(this.calculateTotatl(order));
    }

    calculateTotatl(order) {
        let tot = 0;
        order.forEach(item => {
            tot += Number(item.price) * Number(item.quantity);
        })

        return tot;
    }

    handleDeleteItem(itemId) {
        const order = this.state.order.slice();
        const onList = this.state.onList.slice();

        let indexOfItemId = order.findIndex((item) => item.id == itemId);
        const item = Object.assign({}, order[indexOfItemId]);

        delete item.quantity;

        onList.push(item);
        order.splice(indexOfItemId, 1);

        this.setState({
            order: order,
            onList: onList
        })
        this.props.onOrderUpdate(this.calculateTotatl(order));
    }

    componentDidMount() {
        this.props.onOrderUpdate(null);
        Promise.all([
            service.getAllItems(),
            service.getItemsByOrderId(this.props.orderId)
        ])
            .then(result => {
                if (result) {
                    result[1].data.items.forEach((item) => {
                        let index = result[0].data.findIndex((listItem) => listItem.id == item.id);

                        if (index) {
                            result[0].data.splice(index, 1);
                        }
                    })
                    this.setState({
                        orderDoc: result[1].data,
                        onList: result[0].data,
                        order: result[1].data.items,
                        isOrderShowing: true,
                    })
                    this.props.onOrderUpdate(this.calculateTotatl(this.state.order));
                }
            })
    }

    componentWillUnmount() {
        this.setState({
            isOrderShowing: false
        })
        let orderDoc = Object.assign({}, this.state.orderDoc)
        orderDoc.items = this.state.order.slice();

        orderDoc.items.find((item) => {
            delete item.name;
            delete item.price;
            delete item.description;
        })

        service.confirmOrder(this.props.orderId, orderDoc)
            .catch((e) => {
                console.log("Auto Saving Failed");
            })
    }

    confirmOrder() {
        this.setState({
            isConfirmLoading: true
        })

        let orderDoc = JSON.parse(JSON.stringify(this.state.orderDoc));
        orderDoc.items = JSON.parse(JSON.stringify(this.state.order));

        orderDoc.items.find((item) => {
            delete item.name;
            delete item.price;
            delete item.description;
        })

        orderDoc.status = "served";

        service.confirmOrder(this.props.orderId, orderDoc)
            .then(result => {
                this.props.updateOrderList()
                    .then(() => {
                        this.setState({
                            isConfirmLoading: false
                        })
                    });
            })
    }

    renderItemList() {
        return (
            <div>
                <ItemList listItems={this.state.order} onUpdateQuantity={(id, value) => this.handleUpdateQuantityItem(id, value)} onDeleteItem={(item) => this.handleDeleteItem(item)} />
                <div className="text-center">
                    {this.state.isConfirmLoading ? (<Spinner type="grow" color="danger" />) : (<button onClick={this.confirmOrder} className="btn btn-outline-danger">Confirm Order</button>)}
                </div>
            </div>
        );
    }

    render() {
        return (
            <Collapse isOpen={this.state.isOrderShowing}>
                <Card className={this.props.orderStatus == "served" ? "disable-element" : ""}>
                    <CardBody>
                        <SelectItem listItems={this.state.onList} onAdd={(item) => this.handleAdd(item)} />
                        <br />
                        {this.state.order.length != 0 ? this.renderItemList() : ("")}
                    </CardBody>
                </Card>
            </Collapse>
        );
    }
}

export default Order;
