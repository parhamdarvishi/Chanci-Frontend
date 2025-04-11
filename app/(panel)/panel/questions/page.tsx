"use client";

import { TableOnRequest } from "@/shared/ui/Table";
import PageHeader from "@/shared/ui/PageHeader/pageHeader";
import { modals } from "@mantine/modals";
import QuestionModal from "@/shared/ui/QuestionModal/questionModal";
import { useState, useRef } from "react";
import {
  QuestionType,
  InputType,
  CategoryType,
} from "@/shared/constants/relative-url/question";
import { Question } from "@/shared/types/questions";
import { questionApiAddresses } from "../../../shared/constants/relative-url/question";
import { TableColumns } from "@/shared/ui/Table/model";

const getQuestionType = (type: number | undefined): string => {
  if (type === undefined) return "NONE";
  return (
    Object.entries(QuestionType)
      .find(([_, value]) => value === type)?.[0]
      ?.replace("_", " ") || "NONE"
  );
};

const getInputType = (type: number | undefined): string => {
  if (type === undefined) return "NONE";
  return (
    Object.entries(InputType)
      .find(([_, value]) => value === type)?.[0]
      ?.replace("_", " ") || "NONE"
  );
};

const getCategoryType = (type: number | undefined): string => {
  if (type === undefined) return "NONE";
  return (
    Object.entries(CategoryType).find(([_, value]) => value === type)?.[0] ||
    "NONE"
  );
};

const columns: TableColumns<Question>[] = [
  { head: "Index", key: "index" },
  {
    head: "Type",
    key: "type",
    render: (value: string | number | undefined) => {
      if (typeof value === "string") return value;
      return getQuestionType(value as number | undefined);
    },
  },
  {
    head: "Input Type",
    key: "inputType",
    render: (value: string | number | undefined) => {
      if (typeof value === "string") return value;
      return getInputType(value as number | undefined);
    },
  },
  {
    head: "Category",
    key: "category",
    render: (value: string | number | undefined) => {
      if (typeof value === "string") return value;
      return getCategoryType(value as number | undefined);
    },
  },
  { head: "Text", key: "text" },
];

const Page = () => {
  const [tableKey, setTableKey] = useState<number>(0);
  const tableRef = useRef<any>(null);

  const openAddQuestionModal = () => {
    modals.open({
      title: "Add New Question",
      size: "lg",
      children: (
        <QuestionModal onSuccess={() => setTableKey((prev) => prev + 1)} />
      ),
    });
  };

  return (
    <div>
      <PageHeader
        title="Questions Management"
        onAddClick={openAddQuestionModal}
      />
      <TableOnRequest<Question>
        key={tableKey}
        rowsPerPage={10}
        url={questionApiAddresses.GetAll}
        columns={columns}
        actionButtons={[
          {
            name: "View Details",
            externalLink: "/panel/questions/",
          },
        ]}
      />
    </div>
  );
};

export default Page;
