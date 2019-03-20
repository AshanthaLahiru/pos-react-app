import React from "react";

class SelectItem extends React.Component {
    constructor(props) {
        super(props);

        this.selectedValue = 0;
        this.handleChange = this.handleChange.bind(this);
        this.renderSelectItem = this.renderSelectItem.bind(this);
    }

    handleChange(event) {
        this.selectedValue = event.target.value;
    }

    renderSelectItem() {
        return this.props.listItems.map((item, index) => <option key={index} value={index}>{item.name}</option>)
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <select onChange={this.handleChange} className="form-control" id="itemlist" name="itemlist">
                        {this.renderSelectItem()}
                    </select>
                </div>
                <div className="col-md-6">
                    <button onClick={() => this.props.onAdd(this.selectedValue)} className="btn btn-outline-success btn-block">Add</button>
                </div>
            </div>
        );
    }
}

export default SelectItem;
