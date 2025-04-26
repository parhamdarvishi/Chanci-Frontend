import { JSX } from "react";

export type ActionButtons = {
  name: string;
  colName?: string;
  externalLink?: string;
  keyForUrl?: string;
  url?: (id:any)=> string;
};
export type ActionModal = {
  title: string;
  name: string;
  component: JSX.Element;
};
export type TableColumns<T> = {
  head: string;
  key: keyof T;
  render?: (value: any) => string;
};
export interface TableOnRequestProps<T> {
  rowsPerPage: number;
  url: string;
  columns: TableColumns<T>[];
  filterColumns?: TableColumns<T>[];
  actionButtons?: ActionButtons[];
  actionModal?: ActionModal;
  filters?: any;
  showFilterBar?: boolean;
}
