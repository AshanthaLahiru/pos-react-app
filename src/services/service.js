import { host } from "../config/config"
import axios from "axios"

class Service {
    constructor() {
        let header = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    }

    createOrder(order) {
        let header = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }

        return axios.post(host + 'order/', order, header)
            .then((response) => {
                return response;
            })
    }

    getAllOrdersByUser(userEmail) {
        let header = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }

        return axios.get(host + `order/user/${userEmail}`, header)
            .then((response) => {
                return response;
            })
    }

    getAllItems() {
        let header = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }

        return axios.get(host + `item/`, header)
            .then(response => {
                return response;
            })
    }

    getItemsByOrderId(orderId) {
        let header = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }

        return axios.get(host + `order/${orderId}/items`, header)
            .then(response => {
                return response;
            })
    }

    confirmOrder(orderId, order) {
        let header = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }

        return axios.put(host + `order/${orderId}/`, order, header)
            .then(response => {
                return response;
            })
    }

    authenticateUser(email, password) {
        let header = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }

        return axios.post(host + "user/login", {
            email,
            password
        })
            .then(response => {
                return response;
            })
    }

    registerUser(user) {
        let header = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }

        return axios.post(host + "user/", user)
            .then(response => {
                return response;
            })
    }
}

export const service = new Service();
