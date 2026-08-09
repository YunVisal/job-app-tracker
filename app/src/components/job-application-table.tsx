'use client'
import { useState, useMemo, FC } from "react";
import { Box, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Typography } from "@mui/material"
import { format } from 'date-fns';
import JobApplicationStatusChip from "./job-application-status-chip";
import type { JobApplication } from "../types/job-application";

interface HeadCell {
    disablePadding: boolean;
    id: string;
    label: string;
    numeric: boolean;
    sortable: boolean;
}

const headCells: HeadCell[] = [
    {
        id: 'company',
        label: 'Company',
        disablePadding: false,
        numeric: false,
        sortable: false,
    },
    {
        id: 'role',
        label: 'Role',
        disablePadding: false,
        numeric: false,
        sortable: false,
    },
    {
        id: 'status',
        label: 'Status',
        disablePadding: false,
        numeric: false,
        sortable: false,
    },
    {
        id: 'applied_date',
        label: 'Applied Date',
        disablePadding: false,
        numeric: false,
        sortable: true,
    },
    {
        id: 'viewMore',
        label: '',
        disablePadding: false,
        numeric: false,
        sortable: false,
    }
]

type Order = 'asc' | 'desc';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

interface JobApplicationTableProps {
    applications: JobApplication[];
}

const JobApplicationTable: FC<JobApplicationTableProps> = ({ applications }) => {
    // TODO: add pagination
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<string>('appliedDate');

    const handleRequestSort = (
        property: string,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const visibleRows = useMemo(
        () =>
            [...applications]
                .sort(getComparator(order, orderBy)),
        [order, orderBy],
    );

    return <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        {headCells.map(headCell => (
                            <TableCell
                                key={headCell.id}
                                align={headCell.numeric ? 'right' : 'left'}
                                padding="normal"
                                sortDirection={headCell.sortable && orderBy === headCell.id ? order : false}
                            >
                                {headCell.sortable ? <TableSortLabel
                                    active={orderBy == headCell.id}
                                    direction={orderBy == headCell.id ? order : 'asc'}
                                    onClick={() => handleRequestSort(headCell.id)}
                                >
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{headCell.label}</Typography>
                                </TableSortLabel> : <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{headCell.label}</Typography>}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {visibleRows.map((row, index) => {
                        return <TableRow
                            key={row.id}
                            hover
                            sx={{ cursor: 'pointer' }}
                        >
                            <TableCell>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                    {row.company}
                                </Typography>
                            </TableCell>
                            <TableCell>{row.role}</TableCell>
                            <TableCell>
                                <JobApplicationStatusChip status={row.status} />
                            </TableCell>
                            <TableCell>{format(new Date(row.applied_date), 'yyyy-MM-dd')}</TableCell>
                            <TableCell><Button>View Detail</Button></TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </Paper>
    </Box>
}

export default JobApplicationTable;