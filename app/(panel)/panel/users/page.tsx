"use client";
import { getRequest } from "@/shared/api";
import { userAddresses } from "@/shared/constants/relative-url/user";
import { Table } from "@mantine/core";
import React, { useEffect, useState } from "react";

type usersType = {
  email: string;
};

const Page = () => {
  const [users, setUsers] = useState<usersType[]>();
  const getUsers = async () => {
    const query = {
      Skip: 0,
      Take: 1000,
    };
    const res = await getRequest(userAddresses.GetAll, query, false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { items } = res?.data as any;
    setUsers(items);
  };
  const rows = users?.map((element, index: number) => (
    <Table.Tr key={index}>
      <Table.Td style={{ fontSize: "15px" }}>{index + 1}</Table.Td>
      <Table.Td style={{ fontSize: "15px" }}>{element.email}</Table.Td>
    </Table.Tr>
  ));
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {" "}
      <Table highlightOnHover verticalSpacing="md" withRowBorders={false}>
        <Table.Thead>
          <Table.Tr style={{ backgroundColor: "#02063a12" }}>
            <Table.Th style={{ color: "#151e98" }}>index</Table.Th>
            <Table.Th style={{ color: "#151e98" }}>Email</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};

export default Page;
