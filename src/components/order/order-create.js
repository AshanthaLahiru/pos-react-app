import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"

class OrderCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isToggle: false,
            orderName: null
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            orderName: event.target.value
        })
    }

    componentWillReceiveProps() {
        this.setState({
            orderName: this.props.orderName
        })
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.visibility}>
                    <ModalHeader>Create Order</ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-md-12">
                                <input type="name" className="form-control" value={this.state.orderName} onChange={this.handleInputChange} />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.props.onCreateOrder(this.state.orderName || this.props.orderName)}>Create</Button>
                        <Button color="secondary" onClick={this.props.onClickCreateShow}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default OrderCreate;
