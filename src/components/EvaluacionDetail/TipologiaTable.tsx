"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  filterColumnName: string | undefined
  handleAdd?: () => void
  handleEdit?: (data: TData) => void
  handleDelete?: (id: number) => void  
  pagination?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  handleAdd,
  pagination = false }: DataTableProps<TData, TValue>) {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnVisibility: {
        id: false,
      }
    }
  })

  return (
    <div>      
      <div>
        <Table className="border border-gray-200">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border border-gray-200 sm-bg-gray">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="text-center border border-gray-200"
                  style={{ backgroundColor: index % 2 !== 0 ? "#f5f5f5" : "#fff" }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center border-y border-gray-200">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Lo siento, no pude encontrar lo que buscabas.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
            className="sm-btn-rounded sm-bg-btn-primary text-white"
            size="sm"
            onClick={handleAdd}
          >Agregar</Button>
      </div>
      {pagination && (
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
            className="sm-btn-rounded sm-bg-btn-primary text-white"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
          Anterior
        </Button>
        <Button
            className="sm-btn-rounded sm-bg-btn-primary text-white"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
          Siguiente
        </Button>
      </div>
    )}
    </div>
  )
}