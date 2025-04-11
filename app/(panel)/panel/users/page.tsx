"use client";
import { userAddresses } from "@/shared/constants/relative-url/user";
import { TableOnRequest } from "@/shared/ui/Table";
import { ActionModal, TableColumns } from "@/shared/ui/Table/model";
import RoleManagement from "@/widget/Actions/RoleManagement";
import React from "react";

type TUsers = {
  id?: string;
  index: number;
  userName?: string;
  email: string;
};
const columns: TableColumns<TUsers>[] = [
  { head: "Index", key: "index" },
  { head: "Email", key: "email" },
];

const actionModal: ActionModal = {
  title: "Role Management",
  name: "Role",
  component: <RoleManagement />,
};

const Page = () => {
  return (
    <TableOnRequest<TUsers>
      rowsPerPage={10}
      url={userAddresses.GetAll}
      columns={columns}
      actionModal={actionModal}
    />
  );
};

export default Page;
