import React from 'react'

class TopBar extends React.Component {
    constructor(props) {
        super(props);


    }


    renderOptions() {
        return (
            <div>
                <button onClick={this.props.onToggleShowOrder} className="btn btn-outline-light m-2">Create New Order</button>
                <button onClick={this.props.onClickLogout} className="btn btn-outline-light">Logout</button>
            </div>
        )
    }

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark round-edge-navbar mt-10">
                <span className="navbar-brand p-3 mb-2 h1">POS System</span>
                {localStorage.getItem('email') != undefined ? this.renderOptions() : ''}
            </nav>
        );
    }
}

export default TopBar;