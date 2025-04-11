import { JSX } from "react";

export type ActionButtons = {
  name: string;
  externalLink: string;
};
export type ActionModal = {
  title: string;
  name: string;
  component: JSX.Element;
};
export type TableColumns<T> = {
  head: string;
  key: keyof T;
  render?: (value: T[keyof T]) => string;
};
export interface TableOnRequestProps<T> {
  rowsPerPage: number;
  url: string;
  columns: TableColumns<T>[];
  actionButtons?: ActionButtons[];
  actionModal?: ActionModal;
}
