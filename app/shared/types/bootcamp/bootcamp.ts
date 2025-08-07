export type bootcamp = {
    id: number,
    title: string;
    instructorFullname: string;
    instructorLinkedinAddress: string;
    price: number;
    discount: number;
    description: string;
    shortDescription: string;
    bannerImagePath: string;
    cardImagePath: string;
    mobileImagePath: string;
    instructorImagePath: string;
    currency: string;
    isActive: boolean;
    isDeleted: boolean;
    bootcampPaymentTypes?: BootcampPaymentTypes[];
}

export type BootcampPaymentTypes = {
    id: number,
    title: string;
    amount: number,
    currency: string;
    bootcampId: number,
    isDeleted: boolean;
}

export interface BootcampPaymentTypesResponse {
    isSuccess?: boolean;
    message?: string;
    data?: {
        items?: BootcampPaymentTypes[];
    };
}

export interface BootcampResponse {
    isSuccess?: boolean;
    message?: string;
    data?: {
        items?: bootcamp[];
    };
}