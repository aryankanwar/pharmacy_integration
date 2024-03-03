// src/controllers/orderController.ts
import { Request, Response, Router } from 'express';
import { PharmacyOrderHandler } from './pharmacyOrderHandler';
import axios from 'axios';
import {OrderPayload} from '../interfaces/orderInterfaces';

const BASE_URL           = 'http://pharmacy-mock-service-env.eba-xzj3bbnm.us-east-1.elasticbeanstalk.com/';
import logger from '../utilities/logging'; // Import logger from logger.ts

// Factory function to create order handlers based on pharmacy type
function createOrderHandler(pharmacy: string) {
    return new PharmacyOrderHandler(pharmacy);
}


// Function to create a  orders of a pharamacy

export const createOrder = async (req: Request, res: Response) => {
    try {
        logger.info('Creating order...');
        const pharmacy = req.params.pharmacy;
        const data: OrderPayload = req.body;
        const handler = createOrderHandler(pharmacy);
        const order = handler.createOrder(data);
        const response = await axios.post(BASE_URL + `${pharmacy}/orders`, order);
        const responseData = {
            status: response.status,
            data: response.data
        };
        res.status(201).json(responseData);
    } catch (error) {
        logger.error('Error creating order:', error);
        res.status(500).json({ error: `Error creating ${req.params.pharmacy} order` });
    }
};

// Function to get a  orders of a pharamacy

export const getOrder = async (req: Request, res: Response) => {
    try {
        // Sending GET request to retrieve pharmacies
        logger.info('Getting orders...');
        const pharmacy = req.params.pharmacy;
        const response = await axios.get(BASE_URL +`${pharmacy}/orders`);
        // Extracting data from the response
        const pharmacies = response.data;
        // Sending response with the pharmacies data
        res.status(200).json({ pharmacies });
    } catch (error) {
        // Handling errors
        logger.error('Error fetching orders:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to get a  order by its order ID
export const getOrderById = async (req: Request, res: Response) => {
    const pharmacy = req.params.pharmacy;
    const orderId = req.params.orderId;
    try {
        logger.info('Getting order by ID...');
        // Sending GET request to retrieve HealthMart order by ID
        const response = await axios.get(BASE_URL+`${pharmacy}/orders/${orderId}`);
        // Extracting data from the response
        const order = response.data;
        // Sending response with the order data
        res.status(200).json({ order });
    } catch (error) {
        // Handling errors
        logger.error('Error fetching order by ID:', error.message);
        res.status(404).json({ error: 'Order not found' });
    }
};
