import React from "react";
import Item from "./item"

class ItemList extends React.Component {
    constructor(props) {
        super(props);

        this.renderOrder = this.renderOrder.bind(this);
    }

    renderOrder() {
        return this.props.listItems
            .map((item, index) => {
                item['index'] = index;
                return (<Item key={index} item={item} onUpdateQuantity={this.props.onUpdateQuantity} onDeleteItem={this.props.onDeleteItem} />);
            })
    }


    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Item</th>
                        <th scope="col" className=" text-center">Quantity</th>
                        <th scope="col" className=" text-center">Unit Price</th>
                        <th scope="col" className=" text-center"></th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderOrder()}
                </tbody>
            </table>
        );
    }
}

export default ItemList;
