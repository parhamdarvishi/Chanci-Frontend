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

const base = (
  authorization: boolean = false,
  excel?: boolean,
  upload?: boolean
): AxiosInstance => {
  // Choose the appropriate instance based on authorization
  const currentInstance = authorization
    ? authorizedInstance
    : unauthorizedInstance;
  if (currentInstance) return currentInstance;

  const headers = {
    "Content-Type": upload
      ? ("multipart/form-data" as const)
      : ("application/json" as const),
    Connection: "keep-alive",
  };

  const options: OptionsTypes = {
    baseURL: API_BASE_URL,
    headers: headers,
  };

  if (excel) {
    options["responseType"] = "blob";
  }

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
      // Refresh authorization header on each request if needed
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
          // Handle unauthorized access
          cookie.deleteCookie(USER_TOKEN);
          // Reset the authorized instance
          authorizedInstance = null;
          // Redirect to login page
          window.location.href = "/ChanciAI/login";
          return Promise.reject(error);
        }

        // Server errors (500-599)
        if (error.response.status >= 500 && error.response.status < 600) {
          if (error.response.headers.expires !== "-1") {
            toastAlert(
              error.response.data?.message ?? error.response.statusText,
              "error"
            );
          }
        }

        // Client errors (400-499)
        if (error.response.status >= 400 && error.response.status < 500) {
          toastAlert(
            error.response.data?.Errors?.[0]?.Message ??
              error.response.statusText,
            "error"
          );
        }

        // Redirect responses (300-399)
        if (error.response.status >= 300 && error.response.status < 400) {
          toastAlert(
            error.response.data?.message ?? error.response.statusText,
            "info"
          );
        }

        // Log error details
        log({ errorResponse: error.response });
        log({ errorData: error.response.data });
        log(error.response.status);
        log(error.response.statusText);
        log(error.response.headers);
      } else {
        // Network errors or other issues
        toastAlert(error.message, "error");
        log("Error:", error.message);
      }
      return Promise.reject(error);
    }
  );

  // Store the instance in the appropriate cache
  if (authorization) {
    authorizedInstance = instance;
  } else {
    unauthorizedInstance = instance;
  }

  return instance;
};

export default base;
