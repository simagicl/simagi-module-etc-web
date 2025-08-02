"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  type ColumnFiltersState,
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

import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Label } from "@radix-ui/react-label"
import { Button } from "@/components/ui/button"

import emptySearch from "@/assets/search-empty.png";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  filterColumnName: string | undefined
  handleAdd?: () => void
  handleEdit?: (data: any) => void
  handleDelete?: (id: number) => void  
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterColumnName,
  handleAdd,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      columnVisibility: {
        id: false,
      }
    },
  })

  return (
    <div className=" p-4 rounded-md shadow-lg bg-gray-100">
      <div className="flex items-center py-4 gap-2">
        <Label className="mr-2 text-sm" htmlFor={filterColumnName || ""}>Buscar: </Label>
        <Input
          placeholder={`Buscar por ${filterColumnName || "..."}`}
          value={(table.getColumn(filterColumnName || "")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(filterColumnName || "")?.setFilterValue(event.target.value)
          }
          className="max-w-sm border border-gray-200"
        />
        <Button variant="outline" className="sm-bg-btn-primary sm-btn-rounded text-white" onClick={handleAdd}>Nuevo</Button>
      </div>
      <div className="rounded-md border border-gray-200">
        <Table className="border border-gray-200">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border border-gray-200">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center bg-gray-200">
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
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="text-center border border-gray-200"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center">
                        <img className="w-24 h-24" src={emptySearch} alt="No se encontraron resultados" />
                        <p className="text-sm text-gray-500">Lo siento, no pude encontrar lo que buscabas.</p>
                    </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          className="sm-btn-rounded"          
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          className="sm-btn-rounded"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}