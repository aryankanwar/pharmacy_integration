import { OrderPayload, HealthMartOrderPayload, CarePlusOrderPayload, QuickCareOrderPayload } from '../interfaces/orderInterfaces';

export class PharmacyOrderHandler {

    constructor(private pharmacyName: string) {}

    createOrder(data: OrderPayload) {
        switch (true) {
            case this.isHealthMartOrder(data):
                return this.processOrder(data, 'healthMartProduct', 'healthMartQuantity', 'healthMartCustomerInfo');
            case this.isCarePlusOrder(data):
                return this.processOrder(data, 'carePlusProduct', 'carePlusQuantity', 'carePlusClientInfo');
            case this.isQuickCareOrder(data):
                return this.processOrder(data, 'quickCareProduct', 'quickCareQuantity', 'quickCareUserData');
            default:
                throw new Error(`Unsupported pharmacy: ${this.pharmacyName}`);
        }
    }
    //validation method to test data coming from request
    private isHealthMartOrder(data: OrderPayload): data is HealthMartOrderPayload {
        return 'healthMartProduct' in data && 'healthMartQuantity' in data && 'healthMartCustomerInfo' in data;
    }

    private isCarePlusOrder(data: OrderPayload): data is CarePlusOrderPayload {
        return 'carePlusProduct' in data && 'carePlusQuantity' in data && 'carePlusClientInfo' in data;
    }

    private isQuickCareOrder(data: OrderPayload): data is QuickCareOrderPayload {
        return 'quickCareProduct' in data && 'quickCareQuantity' in data && 'quickCareUserData' in data;
    }

    private processOrder(data: any, productKey: string, quantityKey: string, customerInfoKey: string) {
        return {
            pharmacy: this.pharmacyName,
            product: data[productKey],
            quantity: data[quantityKey],
            customerInfo: data[customerInfoKey]
        }
    }
}
