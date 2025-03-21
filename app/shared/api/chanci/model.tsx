export interface ResponseData {
  [key: string]: unknown;
}

export interface OptionsTypes {
  baseURL: string | undefined;
  headers: {
    "Content-Type": string;
    Connection?: string;
    Authorization?: string;
  };
  options?: string;
  responseType?: string;
}

export type GetRequestFunction = <T>(
  url: string,
  params: T,
  authorization?: boolean,
  excel?: boolean
) => Promise<ResponseData>;
export type PostRequestFunction = <T>(
  url: string,
  data: T,
  authorization?: boolean,
  formData?: boolean
) => Promise<ResponseData>;
export type PutRequestFunction = <T>(
  url: string,
  data: T,
  authorization?: boolean
) => Promise<ResponseData>;
export type DeleteRequestFunction = <T>(
  url: string,
  data: T,
  authorization?: boolean
) => Promise<ResponseData>;
