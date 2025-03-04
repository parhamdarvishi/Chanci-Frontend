import process from "process";

/** API Base URL */
// export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// export const API_BASE_URL =
//   "http://ngnapi-dev.eba-gzkrmdrt.eu-west-2.elasticbeanstalk.com";
export const API_BASE_URL = "https://api10.ukngn.com/"; //"https://nice-ride.185-55-224-196.plesk.page";
/** Is Development */
export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
