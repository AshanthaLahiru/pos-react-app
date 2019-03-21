import React from "react";
import { Fade } from "reactstrap"

class ItemList extends React.Component {
    constructor(props) {
        super(props);

        this.renderOrder = this.renderOrder.bind(this);
    }

    renderOrder() {
        return this.props.listItems
            .map((item, index) =>
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td className=" text-center"><input onChange={(event) => this.props.onUpdateQuantity(item.id, event.target.value)} type="number" min="1" max="500" value={item.quantity} /></td>
                    <td className=" text-center">$ {item.price}</td>
                    <td className=" text-center"><button onClick={() => this.props.onDeleteItem(item.id)} className="btn btn-sm btn-outline-danger">Delete</button></td>
                </tr>
            )
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
