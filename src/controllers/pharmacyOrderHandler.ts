import { OrderPayload, HealthMartOrderPayload, CarePlusOrderPayload, QuickCareOrderPayload } from '../interfaces/orderInterfaces';

export class PharmacyOrderHandler {

    constructor(private pharmacyName: string) {}

    createOrder(data: OrderPayload) {
        switch (this.pharmacyName.toLowerCase()) {
            case 'healthmart':
                if ('healthMartProduct' in data && 'healthMartQuantity' in data && 'healthMartCustomerInfo' in data) {
                    return this.processHealthMartOrder(data);
                }
                break;
            case 'careplus':
                if ('carePlusProduct' in data && 'carePlusQuantity' in data && 'carePlusClientInfo' in data) {
                    return this.processCarePlusOrder(data);
                }
                break;
            case 'quickcare':
                if ('quickCareProduct' in data && 'quickCareQuantity' in data && 'quickCareUserData' in data) {
                    return this.processQuickCareOrder(data);
                }
                break;
            //can add new pharmacy in case
            default:
                throw new Error(`Unsupported pharmacy: ${this.pharmacyName}`);
        }
    }

    private processHealthMartOrder(data: HealthMartOrderPayload) {
        return {
            pharmacy: this.pharmacyName,
            product: data.healthMartProduct,
            quantity: data.healthMartQuantity,
            customerInfo: {
                name: data.healthMartCustomerInfo.healthMartCustName,
                address: data.healthMartCustomerInfo.healthMartCustAddress,
                city: data.healthMartCustomerInfo.healthMartCustCity,
                state: data.healthMartCustomerInfo.healthMartCustState,
                zipcode: data.healthMartCustomerInfo.healthMartCustZipcode,
                country: data.healthMartCustomerInfo.healthMartCustCountry
            }
        };
    }

    private processCarePlusOrder(data: CarePlusOrderPayload) {
        return {
            pharmacy: this.pharmacyName,
            product: data.carePlusProduct,
            quantity: data.carePlusQuantity,
            customerInfo: {
                name: data.carePlusClientInfo.carePlusClientName,
                address: data.carePlusClientInfo.carePlusClientAddress,
                city: data.carePlusClientInfo.carePlusClientCity,
                state: data.carePlusClientInfo.carePlusClientState,
                zipcode: data.carePlusClientInfo.carePlusClientZipcode,
                country: data.carePlusClientInfo.carePlusClientCountry
            }
        };
    }

    private processQuickCareOrder(data: QuickCareOrderPayload) {
        return {
            pharmacy: this.pharmacyName,
            product: data.quickCareProduct,
            quantity: data.quickCareQuantity,
            customerInfo: {
                name: data.quickCareUserData.quickCareUserName,
                address: data.quickCareUserData.quickCareUserAddress,
                city: data.quickCareUserData.quickCareUserCity,
                state: data.quickCareUserData.quickCareUserState,
                zipcode: data.quickCareUserData.quickCareUserZipcode,
                country: data.quickCareUserData.quickCareUserCountry
            }
        };
    }
}