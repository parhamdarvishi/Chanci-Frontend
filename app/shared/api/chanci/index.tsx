import { AxiosResponse } from "axios";
import api from "@shared/api/chanci/base";
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
  authorization,
  excel?
): Promise<ResponseData> => {
  const response: AxiosResponse<ResponseData> = await api(
    authorization,
    excel
  ).get(url, { params });
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
  upload?
): Promise<ResponseData> => {
  const response: AxiosResponse<ResponseData> = await api(
    authorization,
    false,
    upload
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
