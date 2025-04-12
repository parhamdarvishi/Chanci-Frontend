 
import { getRequest } from "@/shared/api";
import { Center, Loader, Pagination, Table, Text } from "@mantine/core";
import React, { JSX, useEffect, useState } from "react";
import style from "./style.module.scss";
import { TableOnRequestProps } from "./model";
import { modals } from "@mantine/modals";

export const TableOnRequest = <T extends Record<string, unknown>>({
  rowsPerPage,
  url,
  columns,
  actionButtons,
  actionModal,
  filters = {}
}: TableOnRequestProps<T>): JSX.Element => {
  const [data, setData] = useState<T[]>();
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setPage] = useState(1);
  const getDataCount = async () => {
    try {
      const res = await getRequest(
        url,
        {
          ...filters,
          "Sorts[0].PropertyName": "id",
          "Sorts[0].isAscending": false,
          Skip: 0,
          Take: 1000,
        },
        true
      );

      const { totalCount } = res?.data as any;
      //const items = res?.data as T[];
      setTotalPages(totalCount);
    } catch (error) {
      console.error(error);
    }
  };

  const getData = async () => {
    const query = {
      ...filters,
      "Sorts[0].PropertyName": "id",
      "Sorts[0].isAscending": false,
      Skip: (activePage - 1) * rowsPerPage,
      Take: rowsPerPage,
    };
    try {
      const res = await getRequest(url, query, true);

      const { items } = res?.data as any;
      //const items = res?.data as T[];
      setData(items);
    } catch (error) {
      console.error(error);
    }
  };

  const handleActionModal = (id: string): void => {
    modals.open({
      title: (
        <p style={{ color: "#151e98", fontSize: "22px" }}>
          {actionModal?.title}
        </p>
      ),
      radius: "lg",
      size: "lg",
      centered: true,
      // children: actionModal?.component,
      children: React.cloneElement(
        actionModal?.component as React.ReactElement<{ userId: string }>,
        { userId: id }
      ),
    });
  };

  const rows = data?.map((ttd: T, index: number) => (
    <Table.Tr key={index}>
      {columns.map((column, i: number) => {
        const key = column.key as keyof T;
        return (
          <Table.Td key={i} style={{ fontSize: "15px" }}>
            {column.key !== "index"
              ? column.render
                ? column.render(ttd[key])
                : String(ttd[key])
              : index + 1}
          </Table.Td>
        );
      })}
      {actionButtons &&
        actionButtons.length > 0 &&
        actionButtons.map((btn, i: number) => {
          return (
            <Table.Td key={i} style={{ fontSize: "15px" }}>
              <a
                style={{ cursor: "pointer" }}
                href={btn.externalLink? `${btn.externalLink + ttd?.id}/detail`: btn.url ? btn.url(ttd?.id as string): '#'}
              >
                {btn.name}
              </a>
            </Table.Td>
          );
        })}
      {actionModal && (
        <Table.Td
          style={{ fontSize: "15px", color: "#151e98", cursor: "pointer" }}
          onClick={() => handleActionModal(ttd?.id as string)}
        >
          {actionModal?.name}
        </Table.Td>
      )}
    </Table.Tr>
  ));

  useEffect(() => {
    getDataCount();
  }, []);
  useEffect(() => {
    getData();
  }, [activePage]);

  const total = Math.ceil(totalPages / rowsPerPage); // Ensure integer
  return (
    <div className={style.tableContainer}>
      {data ? (
        data.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <Table
              highlightOnHover
              striped
              verticalSpacing="md"
              withRowBorders={false}
            >
              <Table.Thead>
                <Table.Tr style={{ backgroundColor: "#02063a12" }}>
                  {columns.map((column, i: number) => {
                    return (
                      <Table.Th key={i} style={{ color: "#151e98" }}>
                        {column.head}
                      </Table.Th>
                    );
                  })}
                  {actionButtons &&
                    actionButtons.length > 0 &&
                    actionButtons.map((btn, i: number) => {
                      return (
                        <Table.Th key={i} style={{ color: "#151e98" }}>
                          Details
                        </Table.Th>
                      );
                    })}
                  {actionModal && (
                    <Table.Th style={{ color: "#151e98" }}>Action</Table.Th>
                  )}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </div>
        ) : (
          <Center style={{ padding: "30px" }}>
            <Text size="lg" fw={500} c="dimmed">
              No records found
            </Text>
          </Center>
        )
      ) : (
        <Center style={{}}>
          {" "}
          <Loader color="blue" />{" "}
        </Center>
      )}
      {totalPages > 0 && (
        <Pagination
          className={style.tablePagination}
          value={activePage}
          onChange={setPage}
          total={total}
        />
      )}
    </div>
  );
};
