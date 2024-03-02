export interface  PharmacyOrderPayload {
    product: string;
    quantity: number;
    customerInfo: {
        name: string;
        address: string;
        city: string;
        state: string;
        zipcode: string;
        country: string;
    };
}

export interface HealthMartOrderPayload {
    healthMartProduct: string;
    healthMartQuantity: number;
    healthMartCustomerInfo: {
        healthMartCustName: string;
        healthMartCustAddress: string;
        healthMartCustCity: string;
        healthMartCustState: string;
        healthMartCustZipcode: string;
        healthMartCustCountry: string;
    };
}

export interface CarePlusOrderPayload {
    carePlusProduct: string;
    carePlusQuantity: number;
    carePlusClientInfo: {
        carePlusClientName: string;
        carePlusClientAddress: string;
        carePlusClientCity: string;
        carePlusClientState: string;
        carePlusClientZipcode: string;
        carePlusClientCountry: string;
    };
}

export interface QuickCareOrderPayload {
    quickCareProduct: string;
    quickCareQuantity: number;
    quickCareUserData: {
        quickCareUserName: string;
        quickCareUserAddress: string;
        quickCareUserCity: string;
        quickCareUserState: string;
        quickCareUserZipcode: string;
        quickCareUserCountry: string;
    };
}

export type OrderPayload = PharmacyOrderPayload | HealthMartOrderPayload | CarePlusOrderPayload | QuickCareOrderPayload;

