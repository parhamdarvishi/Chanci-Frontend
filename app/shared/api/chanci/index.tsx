import {AxiosResponse} from "axios";
import api from "@shared/api/chanci/base";
import apiUpload from "@shared/api/chanci/baseUpload";
import {
    DeleteRequestFunction,
    GetRequestFunction,
    PostRequestFunction,
    PutRequestFunction,
    ResponseData,
    ResponseError,
} from "@shared/api/chanci/model";

export const getRequest: GetRequestFunction = async (
    url,
    params,
    authorization
): Promise<ResponseData> => {
    const response: AxiosResponse<ResponseData> = await api(authorization).get(
        url,
        {params}
    );
    return (
        response?.data ?? {
            isSuccess: false,
            message: "خطا ناشناخته",
        }
    );
};
export const postRequest: PostRequestFunction = async (
    url,
    data,
    authorization,
    isFormData = false
): Promise<ResponseData> => {
    const config = {
        headers: {} as Record<string, string>,
    };
    
    if (!isFormData) {
        config.headers['Content-Type'] = 'application/json';
    }
    if (isFormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    }

    try {
        const response: AxiosResponse<ResponseData> = await api(authorization).post(
            url,
            data,
            config
        );
        return (
            response?.data ?? {
                isSuccess: false,
                message: "خطا ناشناخته",
            }
        );
    } catch (error) {
        console.error("Post request error:", error);
        return {
            isSuccess: false,
            message: "خطا در ارسال درخواست",
        };
    }
    
};
export const postUploadRequest: PostRequestFunction = async (
    url,
    data,
    authorization
): Promise<ResponseData> => {
    const response: AxiosResponse<ResponseData> = await apiUpload(
        authorization
    ).post(url, data);
    return (
        response?.data ?? {
            isSuccess: false,
            message: "خطا ناشناخته",
        }
    );
};

export const putRequest: PutRequestFunction = async (
    url,
    data,
    authorization
): Promise<ResponseData> => {
    const response: AxiosResponse<ResponseData> = await api(authorization).put(
        url,
        data
    );
    return (
        response?.data ?? {
            isSuccess: false,
            message: "خطا ناشناخته",
        }
    );
};

export const deleteRequest: DeleteRequestFunction = async (
    url,
    data,
    authorization
): Promise<ResponseError> => {
    const response: AxiosResponse<ResponseError> = await api(authorization).delete(
        url,
        {data}
    );
    return (
        response?.data ?? {
            isSuccess: false,
            message: "خطا ناشناخته",
        }
    );
};
