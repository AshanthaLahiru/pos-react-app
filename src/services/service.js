import { host } from "../config/config"
import axios from "axios"

class Service {
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

    confirmOrder(orderId, order) {
        return axios.put(host + `order/${orderId}/`, order, this.header)
            .then(response => {
                return response;
            })
    }

    authenticateUser(email, password) {
        return axios.post(host + "user/login", {
            email,
            password
        })
            .then(response => {
                return response;
            })
    }

    registerUser(user) {
        return axios.post(host + "user/", user)
            .then(response => {
                return response;
            })
    }
}

export const service = new Service();
