import request from 'supertest';
import app from '../src/index';

describe('Create Order CarePlusProduct API', () => {
    it('should create an order carePlusProduct successfully', async () => {
        const reqBody = {
            "carePlusProduct": "Antibiotics",
            "carePlusQuantity": 2,
            "carePlusClientInfo": {
                "carePlusClientName": "Jane Smith",
                "carePlusClientAddress": "456 Elm Street",
                "carePlusClientCity": "Townville",
                "carePlusClientState": "State",
                "carePlusClientZipcode": "54321",
                "carePlusClientCountry": "Country"
            }
        };

        // Making request to the Express app
        const response = await request(app)
            .post('/careplus/createOrder')
            .send(reqBody)
            .set('Accept', 'application/json');
        
        // Asserting the response
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('carePlusId');
    });
});

describe('Get All Orders careplus API', () => {
    it('should fetch all orders successfully', async () => {
        // Making request to the Express app
        const response = await request(app)
            .get('/careplus/orders')
            .set('Accept', 'application/json');
        
        // Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('pharmacies');
        expect(response.body.pharmacies.length).toBeGreaterThan(0); // Assuming there are orders present
    });
});

describe('Get All order by orderid using careplus API', () => {
    it('should fetch orderid corresponding to  careplus order successfully', async () => {
        // Making request to the Express app
        const response = await request(app)
            .get('/careplus/orders/1692005683088')
            .set('Accept', 'application/json');
        
        // Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('order');
        expect(response.body.order).toHaveProperty('carePlusId');

    });
});


describe('Get list of All pharmacy API', () => {
    it('should fetch all pharmacy successfully', async () => {
        // Making request to the Express app
        const response = await request(app)
            .get('/getPharamcy')
            .set('Accept', 'application/json');
        
        // Asserting the response
        expect(response.status).toBe(200);
        expect(response).toHaveProperty('text');

    });
});

//INTEGRATION TEST 
describe('Create and Get Order Details', () => {
    let orderId;

    it('should create an order and retrieve its details successfully', async () => {
        // Create an order
        const createOrderBody = {
            "healthMartProduct": "Painkiller",
            "healthMartQuantity": 3,
            "healthMartCustomerInfo": {
                "healthMartCustName": "John Doe",
                "healthMartCustAddress": "123 Main Street",
                "healthMartCustCity": "Cityville",
                "healthMartCustState": "State",
                "healthMartCustZipcode": "12345",
                "healthMartCustCountry": "Country"
            }
        };

        // Make request to create the order
        const createOrderResponse = await request(app)
            .post('/healthmart/createOrder')
            .send(createOrderBody)
            .set('Accept', 'application/json');

        // Assert creation was successful
        expect(createOrderResponse.status).toBe(201);
        expect(createOrderResponse.body).toHaveProperty('data');
        expect(createOrderResponse.body.data).toHaveProperty('healthMartId');
        
        // Store the order ID for further testing
        orderId = createOrderResponse.body.data.healthMartId;

        // Retrieve order details using the order ID
        const getOrderResponse = await request(app)
            .get(`/healthmart/orders/${orderId}`)
            .set('Accept', 'application/json');
        
        // Asserting the response
        expect(getOrderResponse.status).toBe(200);
        expect(getOrderResponse.body).toHaveProperty('order');
        expect(getOrderResponse.body.order).toHaveProperty('healthMartId');
        expect(getOrderResponse.body.order.healthMartId).toBe(orderId);
    });
});
