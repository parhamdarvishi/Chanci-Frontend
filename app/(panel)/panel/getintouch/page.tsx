"use client";
import { getInTouchAddress } from "@/shared/constants/relative-url/getIntouch";
import { TableOnRequest } from "@/shared/ui/Table";
import { TableColumns } from "@/shared/ui/Table/model";

type GetInTouch = {
  id?: number;
  index: number;
  inquirySubject: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
};
const columns: TableColumns<GetInTouch>[] = [
  { head: "Index", key: "index" },
  { head: "Subject", key: "inquirySubject" },
  { head: "Full Name", key: "fullName" },
  { head: "Email", key: "email" },
  { head: "Phone Number", key: "phoneNumber" },
  { head: "Message", key: "message" },
];

const Page = () => {
  return (
    <TableOnRequest<GetInTouch>
      rowsPerPage={10}
      url={getInTouchAddress.GetAll}
      columns={columns}
    />
  );
};

export default Page;
