import { AxiosResponse } from "axios";
import api from "@shared/api/chanci/base";
import apiUpload from "@shared/api/chanci/baseUpload";
import {
  DeleteRequestFunction,
  GetRequestFunction,
  PostRequestFunction,
  PutRequestFunction,
  ResponseData,
} from "@shared/api/chanci/model";

export const getRequest: GetRequestFunction = async (
  url,
  params,
  authorization
): Promise<ResponseData> => {
  const response: AxiosResponse<ResponseData> = await api(authorization).get(
    url,
    { params }
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
  authorization
): Promise<ResponseData> => {
  const response: AxiosResponse<ResponseData> = await api(authorization).post(
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
): Promise<ResponseData> => {
  const response: AxiosResponse<ResponseData> = await api(authorization).delete(
    url,
    { data }
  );
  return (
    response?.data ?? {
      isSuccess: false,
      message: "خطا ناشناخته",
    }
  );
};
