import {Job} from "@shared/types/chanci/job";

export type bootcamp = {
    id: number,
    title: string;
    instructorFullname: string;
    instructorLinkedinAddress: string;
    price: number;
    discount: number;
    description: string;
    bannerImagePath: string;
    cardImagePath: string;
    mobileImagePath:string;
    instructorImagePath: string;
    currency: string;
    isActive: boolean;
    isDeleted: boolean;
}

export interface BootcampResponse {
    isSuccess?: boolean;
    message?: string;
    data?: {
        items ?: bootcamp[];
    };
}