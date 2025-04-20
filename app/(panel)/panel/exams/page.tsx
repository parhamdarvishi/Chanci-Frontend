"use client";
import { myExamAddress } from "@/shared/constants/relative-url/exam";
import { TableOnRequest } from "@/shared/ui/Table";
import { ActionButtons, TableColumns } from "@/shared/ui/Table/model";
import React from "react";

type TMyExams = {
  id?: number;
  index: number;
  userId?: string;
  createAt: string;
  isDeleted: boolean;
};
const columns: TableColumns<TMyExams>[] = [
  { head: "Index", key: "index" },
  { head: "Date", key: "createAt" },
];
const actionButtons: ActionButtons[] = [
  { name: "Show Detail", url: (id: any) => `/ChanciAI/result/${id}` },
];
const Page = () => {
  return (
    <TableOnRequest<TMyExams>
      rowsPerPage={10}
      url={myExamAddress.myExam}
      columns={columns}
      actionButtons={actionButtons}
    />
  );
};

export default Page;
