import { getRequest } from "@/shared/api";
import { Center, Loader, Pagination, Table } from "@mantine/core";
import { JSX, useEffect, useState } from "react";
import style from "./style.module.scss"

export type ActionButtons = {
    key: number;
    name: string;
    externalLink: string;
}
export type TableColumns<T> = {
    head: string;
    key: keyof T;
}
export interface TableOnRequestProps<T> {
    rowsPerPage: number;
    url: string;
    columns: TableColumns<T>[];
    actionButtons?: ActionButtons[]
}
export const TableOnRequest = <T extends Record<string, unknown>>({
    rowsPerPage,
    url,
    columns,
    actionButtons
}: TableOnRequestProps<T>): JSX.Element => {
    const [data, setData] = useState<T[]>();
    const [totalPages, setTotalPages] = useState(0);
    const [activePage, setPage] = useState(1);
    const getDataCount = async () => {
        try {
            debugger;
            const res = await getRequest(url, {
                Skip: 0,
                Take: 1000
            }, true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { totalCount } = res?.data as any;
            debugger;
            //const items = res?.data as T[];
            setTotalPages(totalCount);

        } catch (error) {
            console.error(error);
        }
    }
    const getData = async () => {
        const query = {
            Skip: activePage - 1,
            Take: rowsPerPage,
        };
        try {
            const res = await getRequest(url, query, true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { items } = res?.data as any;
            debugger;
            //const items = res?.data as T[];
            setData(items);

        } catch (error) {
            console.error(error);
        }
    };
    const rows = data?.map((ttd: T, index: number) => (
        <Table.Tr key={index}>
            {columns.map((column, i: number) => {
                const key = column.key as keyof T;
                return (<Table.Td key={i} style={{ fontSize: "15px" }}>{column.key !== 'index'? String(ttd[key]) : index + 1}</Table.Td>)
            })}
            {
                actionButtons && actionButtons.length > 0 && actionButtons.map((btn, i: number) => {
                    const key = btn.key as keyof T;
                    return (<Table.Td key={i} style={{ fontSize: "15px" }}>
                        <a style={{ cursor: 'pointer' }} href={btn.externalLink + ttd.id}>{btn.name}</a>
                    </Table.Td>)
                })
            }
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
            {data ?                 <div style={{overflowX: 'auto'}}>
                    <Table highlightOnHover striped verticalSpacing="md" withRowBorders={false}>
                        <Table.Thead>
                            <Table.Tr style={{ backgroundColor: "#02063a12" }}>
                                {columns.map((column, i: number) => {
                                    return (<Table.Th key={i} style={{ color: "#151e98" }}>{column.head}</Table.Th>)
                                })}
                                {
                                    actionButtons && actionButtons.length > 0 && actionButtons.map((btn, i: number) => {
                                        const key = btn.key as keyof T;
                                        return (<Table.Th key={i} style={{ color: "#151e98" }}>Actions</Table.Th>)
                                    })
                                }
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </div> : <Center style={{}}> <Loader color="blue" /> </Center>}
            {totalPages > 0 && <Pagination className={style.tablePagination} value={activePage} onChange={setPage} total={total} />}
        </div>)
}