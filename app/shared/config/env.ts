import process from "process";

/** API Base URL */
// export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const API_BASE_URL =
  "http://ngnapi-dev.eba-gzkrmdrt.eu-west-2.elasticbeanstalk.com";
/** Is Development */
export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
