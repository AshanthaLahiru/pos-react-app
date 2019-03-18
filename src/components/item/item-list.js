import React from "react";

class ItemList extends React.Component {
    constructor(props) {
        super(props);

        this.renderOrder = this.renderOrder.bind(this);
    }

    renderOrder() {
        return this.props.listItems
            .map((item) => <li key={item.name} className="list-group-item" style={{ color: '#000000' }}>{item.name}</li>)
    }


    render() {
        return (
            <ul className="list-group" >
                {this.renderOrder()}
            </ul>
        );
    }
}

export default ItemList;
