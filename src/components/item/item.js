import React from "react";

class Item extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.item.index + 1}</th>
                <td>{this.props.item.name}</td>
                <td className=" text-center"><input onChange={(event) => this.props.onUpdateQuantity(this.props.item.id, event.target.value)} type="number" min="1" max="500" value={this.props.item.quantity} /></td>
                <td className=" text-center">$ {this.props.item.price}</td>
                <td className=" text-center"><button onClick={() => this.props.onDeleteItem(this.props.item.id)} className="btn btn-sm btn-outline-danger">Delete</button></td>
            </tr>
        )
    }
}

export default Item;