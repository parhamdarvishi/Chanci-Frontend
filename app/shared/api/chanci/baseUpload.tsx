import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import toastAlert from "@shared/helpers/toast";
import { log } from "@shared/helpers";
import cookie from "@shared/helpers/cookie";
import { USER_TOKEN } from "@shared/helpers/cookie/types";
import { OptionsTypes } from "@shared/api/chanci/model";
import { API_BASE_URL } from "@/shared/config/env";

// Separate instances for authorized and unauthorized requests
let authorizedInstance: AxiosInstance | null = null;
let unauthorizedInstance: AxiosInstance | null = null;

const baseUpload = (authorization: boolean = false): AxiosInstance => {
  // Choose the appropriate instance based on authorization
  const currentInstance = authorization
    ? authorizedInstance
    : unauthorizedInstance;
  if (currentInstance) return currentInstance;

  const headers = {
    "Content-Type": "multipart/form-data",
  };

  const options: OptionsTypes = {
    baseURL: API_BASE_URL,
    headers: headers,
  };

  if (authorization) {
    const userToken = cookie?.getCookie(USER_TOKEN);
    if (userToken) {
      try {
        const parsedToken = JSON.parse(userToken);
        options.headers["Authorization"] = `Bearer ${parsedToken}`;
      } catch (e) {
        console.error("Error parsing user token:", e);
      }
    }
  }

  const instance = axios.create(options as CreateAxiosDefaults<OptionsTypes>);

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      if (authorization) {
        const userToken = cookie?.getCookie(USER_TOKEN);
        if (userToken) {
          try {
            const parsedToken = JSON.parse(userToken);
            config.headers["Authorization"] = `Bearer ${parsedToken}`;
          } catch (e) {
            console.error("Error parsing user token in interceptor:", e);
          }
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          cookie.deleteCookie(USER_TOKEN);
          authorizedInstance = null;
          window.location.href = "/ChanciAI/login";
          return Promise.reject(error);
        }

        if (error.response.status >= 500 && error.response.status < 600) {
          if (error.response.headers.expires !== "-1") {
            toastAlert(
              error.response.data?.message ?? error.response.statusText,
              "error"
            );
          }
        }

        if (error.response.status >= 400 && error.response.status < 500) {
          toastAlert(
            error.response.data?.Errors?.[0]?.Message ??
              error.response.statusText,
            "error"
          );
        }

        if (error.response.status >= 300 && error.response.status < 400) {
          toastAlert(
            error.response.data?.message ?? error.response.statusText,
            "info"
          );
        }

        log({ errorResponse: error.response });
        log({ errorData: error.response.data });
        log(error.response.status);
        log(error.response.statusText);
        log(error.response.headers);
      } else {
        toastAlert(error.message, "error");
        log("Error:", error.message);
      }
      return Promise.reject(error);
    }
  );

  if (authorization) {
    authorizedInstance = instance;
  } else {
    unauthorizedInstance = instance;
  }

  return instance;
};

export default baseUpload;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postRequest = async (url: string, data: any, auth: boolean) => {
  const instance = baseUpload(auth);
  return await instance.post(url, data);
};
