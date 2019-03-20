import React from "react";
import { Spinner, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Collapse, Card, CardBody } from 'reactstrap';
import { host } from "../../config/config"
import axios from "axios"
import SelectItem from "../item/item-select"
import ItemList from "../item/item-list";
import { orderService } from "../../services/service"



class Order extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            order: [
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
                },
                {
                    itemId: "id3",
                    name: "Soda",
                    price: "10",
                    quantity: 2
                }
            ]
            ,
            onList: [
                {
                    itemId: "id4",
                    name: "CocaCola",
                    price: "13",
                },
                {
                    itemId: "id5",
                    name: "Peps",
                    price: "12",
                }
            ],
            isOrderShowing: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleAdd.bind(this);
        this.showOrder = this.showOrder.bind(this);
        this.handleUpdateQuantityItem = this.handleUpdateQuantityItem.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
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

    handleUpdateQuantityItem(id, value) {
        const order = this.state.order.slice()
        order.find((item) => item.itemId == id).quantity = value;

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

        let indexOfItemId = order.findIndex((item) => item.itemId == itemId);
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
        this.props.onOrderUpdate(this.calculateTotatl(this.state.order));
        Promise.all([
            orderService.getAllItems(),
            orderService.getItemsByOrderId(this.props.orderId)
        ])
            .then(result => {
                this.setState({
                    onList: result[0].data,
                    order: result[1].data.items,
                    isOrderShowing: true,
                })
            })
    }

    render() {
        return (
            <Collapse isOpen={this.state.isOrderShowing}>
                <Card>
                    <CardBody>
                        <SelectItem listItems={this.state.onList} onAdd={(item) => this.handleAdd(item)} />
                        <br />
                        <ItemList listItems={this.state.order} onUpdateQuantity={(id, value) => this.handleUpdateQuantityItem(id, value)} onDeleteItem={(item) => this.handleDeleteItem(item)} />
                    </CardBody>
                </Card>
            </Collapse>
        );
    }
}

export default Order;
