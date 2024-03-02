// src/controllers/orderController.ts
import { Request, Response, Router } from 'express';
import { PharmacyOrderHandler } from './pharmacyOrderHandler';
import axios from 'axios';
import {OrderPayload} from '../interfaces/orderInterfaces';

const BASE_URL           = 'http://pharmacy-mock-service-env.eba-xzj3bbnm.us-east-1.elasticbeanstalk.com/';

// Factory function to create order handlers based on pharmacy type
function createOrderHandler(pharmacy: string) {
    return new PharmacyOrderHandler(pharmacy);
}


// Function to create a  orders of a pharamacy

export const createOrder = async (req: Request, res: Response) => {
    const pharmacy = req.params.pharmacy;
    const data: OrderPayload = req.body;
    // Create order handler based on pharmacy type
    const handler = createOrderHandler(pharmacy);
    const order   = handler.createOrder(data);
    // Create order using the appropriate handler
    const response = await axios.post(BASE_URL +`${pharmacy}/orders`, order);
  // Extract relevant data from the response
    const responseData = {
        status: response.status,
        data: response.data
    };
    // Response
    res.status(201).json(responseData);
};

// Function to get a  orders of a pharamacy

export const getOrder = async (req: Request, res: Response) => {
    try {
        // Sending GET request to retrieve pharmacies
        const pharmacy = req.params.pharmacy;
        const response = await axios.get(BASE_URL +`${pharmacy}/orders`);
        // Extracting data from the response
        const pharmacies = response.data;
        // Sending response with the pharmacies data
        res.status(200).json({ pharmacies });
    } catch (error) {
        // Handling errors
        console.error('Error fetching orders:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to get a  order by its order ID
export const getOrderById = async (req: Request, res: Response) => {
    const pharmacy = req.params.pharmacy;
    const orderId = req.params.orderId;
    try {
        // Sending GET request to retrieve HealthMart order by ID
        const response = await axios.get(BASE_URL+`${pharmacy}/orders/${orderId}`);
        // Extracting data from the response
        const order = response.data;
        // Sending response with the order data
        res.status(200).json({ order });
    } catch (error) {
        // Handling errors
        console.error('Error fetching HealthMart order by ID:', error.message);
        res.status(404).json({ error: 'Order not found' });
    }
};
