import { Request, Response } from 'express';
import axios from 'axios';

// Base URL for the Pharmacy Mock APIs
const BASE_URL = 'http://pharmacy-mock-service-env.eba-xzj3bbnm.us-east-1.elasticbeanstalk.com';

// Function to get a list of available pharmacies
export const getPharamacy = async (req: Request, res: Response) => {
    try {
        // Sending GET request to retrieve pharmacies
        const response = await axios.get(`${BASE_URL}/pharmacy`);
        // Extracting data from the response
        const pharmacies = response.data;
        // Sending response with the pharmacies data
        res.status(200).json({ pharmacies });
    } catch (error) {
        // Handling errors
        console.error('Error fetching pharmacies:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};