import React from "react";
import { Spinner, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Collapse, Card, CardBody } from 'reactstrap';
import { host } from "../../config/config"
import axios from "axios"
import SelectItem from "../item/select-item"
import ItemList from "../item/item-list";


class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: [
                {
                    name: "Soap",
                    price: "1$"
                },
                {
                    name: "Cream",
                    price: "15$"
                },
                {
                    name: "Soda",
                    price: "10$"
                }
            ]
            ,
            onList: [
                {
                    name: "CocaCola",
                    price: "13$"
                },
                {
                    name: "Peps",
                    price: "12$"
                }
            ],
            isOrderShowing: true
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleAdd.bind(this);
        this.showOrder = this.showOrder.bind(this);
    }

    handleAdd(itemIndex) {
        let order = this.state.order.slice();
        let onList = this.state.onList.slice();

        order.push(onList[itemIndex])
        onList.splice(itemIndex, 1);

        this.setState({
            order: order,
            onList: onList
        });
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
            <Collapse isOpen={this.state.isOrderShowing}>
                <Card>
                    <CardBody>
                        <SelectItem listItems={this.state.onList} onAdd={(item) => this.handleAdd(item)} />
                        <br />
                        <ItemList listItems={this.state.order} />
                    </CardBody>
                </Card>
            </Collapse>
        );
    }
}

export default Order;
