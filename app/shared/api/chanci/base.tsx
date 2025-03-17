import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import toastAlert from "@shared/helpers/toast";
import { log } from "@shared/helpers";
import cookie from "@shared/helpers/cookie";
import { USER_TOKEN } from "@shared/helpers/cookie/types";
import { OptionsTypes } from "@shared/api/chanci/model";
import { API_BASE_URL } from "@/shared/config/env";
let instance: AxiosInstance | null = null;
const base = (
  authorization: boolean = false,
  excel?: boolean,
  upload?: boolean
): AxiosInstance => {
  if (instance) return instance;
  const headers = {
    "Content-Type": upload
      ? ("multipart/form-data" as const)
      : ("application/json" as const),
    Connection: "keep-alive",
  };
  //const router = useRouter();
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
      options.headers["Authorization"] = "Bearer " + JSON.parse(userToken);
    }
  }
  instance = axios.create(options as CreateAxiosDefaults<OptionsTypes>);
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

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response) {
        if (error.response.status === 401) {
          // todo: delete user from storage - Update: User token deleted from cookie
          cookie.deleteCookie(USER_TOKEN); // Clear token
          window.location.href = "/ChanciAI/login";
          //router.push('/login')
          //return;
        }
        if (error.response.status >= 500 && error.response.status < 600) {
          if (error.response.headers.expires == "-1") {
            //return;
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

      } else {
        toastAlert(error.message, "error");
        log("Error:", error.message);
      }
      return Promise.reject(error); // Always reject
    }
  );
  //instance.interceptors.response.eject(responseInterceptor); // I commented this line because it terminated the instance and used new one
  return instance;
};

export default base;
