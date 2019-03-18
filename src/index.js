import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from "react-dom";
import Login from "./components/login/login";
import OrderList from "./components/order/order-list"


const element = <h1>Hello World!</h1>;

class App extends React.Component {
  render() {
    return (
      <div>
        <OrderList />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
