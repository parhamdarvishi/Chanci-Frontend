"use client";
import { myExamAddress } from "@/shared/constants/relative-url/exam";
import { ActionButtons, TableColumns, TableOnRequest } from "@/shared/ui/Table";
import React from "react";

type TMyExams = {
  id?: number;
  index: number;
  userId?: string;
  createAt: string;
  isDeleted: boolean;
}
const columns: TableColumns<TMyExams>[] = [
  { head: "Index", key: "index"},
  { head: 'Date', key: 'createAt' }
];
const actionButtons: ActionButtons[] = [
  { name: "Show Detail", externalLink: '/ChanciAI/result/'}
];
const Page = () => {
    return (
      <TableOnRequest<TMyExams>
        rowsPerPage={10}
        url={myExamAddress.myExam}
        columns={columns}
        actionButtons={actionButtons}
      />);
};

export default Page;