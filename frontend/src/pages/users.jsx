import { useEffect, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Fetch data from API
const fetchData = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/users`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data.user; // Adjust based on your API response
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const columns = [
  {
    header: 'Name',
    accessorFn: row => `${row.firstname} ${row.lastname}`, // Combine first and last name
    cell: ({ getValue }) => {
      const fullName = getValue();
      // Capitalize both names
      return fullName
        .split(' ')
        .map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
        .join(' ');
    },
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Transaction',
    cell: ({ row }) => (
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => handleCTA(row)}
      >
        Send Money
      </button>
    ),
  },
];

const handleCTA = (row) => {
  console.log('CTA clicked for row:', row);
};

function GetUsers() {
const [data, setData] = useState([]);
const [globalFilter, setGlobalFilter] = useState("");


// Fetch data when component mounts
useEffect(() => {
    fetchData().then(fetchedData => setData(fetchedData));
}, []);
const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
});
const table = useReactTable({
  data,
  columns,
  state: {
    globalFilter,
    pagination, // ✅ controlled pagination
  },
  onGlobalFilterChange: setGlobalFilter,
  onPaginationChange: setPagination, // ✅ listen for changes
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});

return (
    <div className="p-4">
    {/* Search Box */}
    <div className="flex justify-between items-center mb-4">
        <Input
        placeholder="Search..."
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="w-64"
        />
    </div>

    {/* Table */}
    <Table>
        <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
            ))}
            </TableRow>
        ))}
        </TableHeader>
        <TableBody>
        {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
                ))}
            </TableRow>
            ))
        ) : (
            <TableRow>
            <TableCell colSpan={columns.length} className="text-center">
                No results found.
            </TableCell>
            </TableRow>
        )}
        </TableBody>
    </Table>

    {/* Pagination Controls */}
    <div className="flex items-center justify-between mt-4">
        <div className="text-sm">
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="flex gap-2">
        <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>

        </Button>
        <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>

        </Button>
        </div>
    </div>
    </div>
);
}

export default GetUsers;