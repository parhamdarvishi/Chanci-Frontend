"use client";
import { userAddresses } from "@/shared/constants/relative-url/user";
import { TableColumns, TableOnRequest } from "@/shared/ui/Table";
import React from "react";

type TUsers = {
  id?: string;
  index: number;
  userName?: string;
  email: string
}
const columns: TableColumns<TUsers>[] = [
  { head: "Index", key: "index"},
  { head: 'Email', key: 'email' }
];
const Page = () => {
    return (
      <TableOnRequest<TUsers>
        rowsPerPage={10}
        url={userAddresses.GetAll}
        columns={columns}
      />);
};

export default Page;
