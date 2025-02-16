import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import config from "@shared/config";
import toastAlert from "@shared/helpers/toast";
import { log } from "@shared/helpers";
import cookie from "@shared/helpers/cookie";
import { USER_TOKEN } from "@shared/helpers/cookie/types";
import { OptionsTypes } from "@shared/api/chanci/model";

const base = (
  authorization: boolean = false,
  excel?: boolean,
  upload?: boolean
): AxiosInstance => {
  const headers = {
    "Content-Type": upload
      ? ("multipart/form-data" as const)
      : ("application/json" as const),
    Connection: "keep-alive",
  };
  const options: OptionsTypes = {
    baseURL: config.ApiBaseUrl,
    headers: headers,
  };

  if (excel) {
    options["responseType"] = "blob";
  }

  if (authorization) {
    options.headers["Authorization"] =
      "Bearer " + cookie?.getCookie(USER_TOKEN);
  }

  const instance = axios.create(options as CreateAxiosDefaults<OptionsTypes>);

  instance.interceptors.request.use(
    function (config) {
      // Do something before the request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  const responseInterceptor = instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response) {
        if (error.response.status === 401) {
          // todo: delete user from storage
          window.location.href = "/login";
          return;
        }
        if (error.response.status >= 500 && error.response.status < 600) {
          if (error.response.headers.expires == "-1") {
            return;
          }
          toastAlert(
            error.response.data?.message ?? error.response.statusText,
            "error"
          );
        }

        if (error.response.status >= 400 && error.response.status < 500)
          toastAlert(
            error.response.data?.Errors[0].Message ?? error.response.statusText,
            "error"
          );
        if (error.response.status >= 300 && error.response.status < 400)
          toastAlert(
            error.response.data?.message ?? error.response.statusText,
            "info"
          );
        log({ errorResponse: error.response });
        log({ errorData: error.response.data });
        log(error.response.status);
        log(error.response.statusText);
        log(error.response.headers);
      } /*else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
 
  }*/ else {
        toastAlert(error.message, "error");
        log("Error:", error.message);
      }
    }
  );
  instance.interceptors.response.eject(responseInterceptor);
  return instance;
};

export default base;
