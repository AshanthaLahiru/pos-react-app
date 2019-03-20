import { host } from "../config/config"
import axios from "axios"

class OrderService {
    constructor() {
        this.header = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    }

    createOrder(order) {
        return axios.post(host + 'order/', order, this.header)
            .then((response) => {
                return response;
            })
    }

    getAllOrdersByUser(userEmail) {
        return axios.get(host + `order/user/${userEmail}`, this.header)
            .then((response) => {
                return response;
            })
    }

    getAllItems() {
        return axios.get(host + `item/`, this.header)
            .then(response => {
                return response;
            })
    }

    getItemsByOrderId(orderId) {
        return axios.get(host + `order/${orderId}/items`, this.header)
            .then(response => {
                return response;
            })
    }
}

export const orderService = new OrderService();
