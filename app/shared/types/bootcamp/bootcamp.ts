
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
    mobileImagePath:string;
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
        bootcamp: null,
        isDeleted: boolean;
}

export interface BootcampResponse {
    isSuccess?: boolean;
    message?: string;
    data?: {
        items ?: bootcamp[];
    };
}