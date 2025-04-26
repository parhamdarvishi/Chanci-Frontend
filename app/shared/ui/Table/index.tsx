import { getRequest } from "@/shared/api";
import { Button, Center, Flex, Group, Loader, Pagination, Table, Text, TextInput, Box } from "@mantine/core";
import React, { JSX, useEffect, useState } from "react";
import style from "./style.module.scss";
import { TableOnRequestProps } from "./model";
import { modals } from "@mantine/modals";
import { formatDateString } from "@/shared/helpers";

export const TableOnRequest = <T extends Record<string, unknown>>({
  rowsPerPage,
  url,
  columns,
  actionButtons,
  actionModal,
  filters = {},
  filterColumns = [],
  showFilterBar = false
}: TableOnRequestProps<T>): JSX.Element => {
  const [data, setData] = useState<T[]>();
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setPage] = useState(1);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string | number | boolean>>(filters);
  /* const getDataCount = async () => {
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
  }; //Commented out because the beloew function if Taken as 10 or 1, but returns the total Count data, so no need for this extra api call. 
  
  */

  const getData = async () => {
    const query = {
      ...filters,
      ...appliedFilters,
      "Sorts[0].PropertyName": "id",
      "Sorts[0].isAscending": false,
      Skip: (activePage - 1) * rowsPerPage,
      Take: rowsPerPage,
    };
    try {
      const res = await getRequest(url, query, true);

      const { items, totalCount } = res?.data as any;
      //const items = res?.data as T[];
      setTotalPages(totalCount);
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
                : column.key === "createdAt" || column.key === "createAt"
                  ? formatDateString(ttd[key])
                  : ttd[key] ? String(ttd[key]) : "-"
              : index + 1}
          </Table.Td>
        );
      })}
      {actionButtons &&
        actionButtons.length > 0 &&
        actionButtons.map((btn, i: number) => {
          const keyForUrl = btn?.keyForUrl? btn.keyForUrl : "id";
          return (
            <Table.Td key={i} style={{ fontSize: "15px" }}>
              <a
                style={{ cursor: "pointer" }}
                href={btn.externalLink? `${btn.externalLink + ttd?.id}/detail`: btn.url ? btn.url(ttd[keyForUrl] as string): '#'}
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
    getData();
  }, [activePage, appliedFilters]);
  
  const handleFilterChange = (key: string, value: string) => {
    setFilterValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyFilters = () => {
    const newFilters: any = {};
    
    // Only add non-empty filter values
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value.trim() && value !== '') {
        newFilters["Filters[0].PropertyName"] = key;
        newFilters["Filters[0].operation"] = 0;
        newFilters["Filters[0].value"] = value;
      }
    });
    setAppliedFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };
  
  const resetFilters = () => {
    setFilterValues({});
    setAppliedFilters({});
  };

  const total = Math.ceil(totalPages / rowsPerPage); // Ensure integer
  return (
    <div className={style.tableContainer}>
      {/* Filter Bar - Only show if showFilterBar is true */}
      {showFilterBar && (
        <Box mb="xs" p="xs" style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
          <Flex align="center" wrap="nowrap" gap="xs">
            <Text fw={500} size="xs" c="dimmed" style={{ whiteSpace: "nowrap", fontSize: "11px" }}>Filter Data</Text>
            <Flex flex={1} direction={'row'} gap="sm" justify={'flex-start'}>
              {filterColumns.map((column, idx) => (
                <TextInput
                  key={String(column.key)}
                  placeholder={`Filter by ${column.head}`}
                  value={filterValues[String(column.key)] || ""}
                  onChange={(e) => handleFilterChange(String(column.key), e.target.value)}
                  size="xs"
                  style={{  
                    height: "100%!important", 
                    fontSize: "12px"
                  }}
                />
              ))}
            </Flex>
            <Group gap="xs" style={{ whiteSpace: "nowrap" }}>
              <Button variant="outline" color="gray" onClick={resetFilters} size="xs" style={{ height: "24px", fontSize: "11px" }}>Reset</Button>
              <Button color="blue" onClick={applyFilters} size="xs" style={{ height: "24px", fontSize: "11px" }}>Apply Filters</Button>
            </Group>
          </Flex>
        </Box>
      )}
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
                          {btn?.colName || btn?.name || "Details"}
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
