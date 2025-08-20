"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button";
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";

interface TipologiaHeader {
  id: number;
  nombre: string;
}

interface BaseRow {
  id: number;
}

interface SubItemTableProps<TData extends BaseRow, TValue> {
  tipologias: TipologiaHeader[];
  data: TData[];
  handleAdd?: () => void;
  handleEdit?: (data: TData) => void;
  handleDelete?: (id: number) => void;
  pagination?: boolean;
}

export function SubItemTable<TData extends BaseRow, TValue>({
  tipologias,
  data,
  handleAdd,
  handleEdit,
  handleDelete,
  pagination = false,
}: SubItemTableProps<TData, TValue>) {
  const dynamicTipologiaColumns = tipologias.map((tipologia) => ({
    accessorKey: `tipologia_${tipologia.id}_${tipologia.nombre}`,
    header: tipologia.nombre,
    cell: ({ row }: { row: any }) => {
      const match = row.original.tipologias?.find(
        (t: any) => t.nombre === tipologia.nombre
      );
      return match?.valor ?? "-";
    },
  }));

  const tableColumns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "orden", header: "Orden" },
    { accessorKey: "nombre", header: "Nombre" },
    { accessorKey: "unidad", header: "Unidades" },
    ...dynamicTipologiaColumns,
    { accessorKey: "itemTotal", header: "Subtotal" },
  ];

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnVisibility: {
        id: false,
      },
    },
  });

  const editRow = (data: any) => {
    handleEdit?.(data);
  };

  const deleteRow = (id: number) => {
    handleDelete?.(id);
  };

  return (
    <div>
      <div>
        <Table className="border border-gray-200">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border border-gray-200 sm-bg-gray"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-center bg-gray-200"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
                <TableHead className="flex items-center justify-center bg-gray-200">
                  <EllipsisVerticalIcon className="w-5 h-5" />
                </TableHead>
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
                  style={{
                    backgroundColor: index % 2 !== 0 ? "#f5f5f5" : "#fff",
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-center border-y border-gray-200"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="text-center border-y border-gray-200">
                    
                    <DropdownMenu >
                      <DropdownMenuTrigger asChild>
                        <Button className="sm-bg-btn-primary text-white" size="sm">
                          <EllipsisVerticalIcon className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent sideOffset={5} className="bg-white border-0 shadow-2xl">
                        <DropdownMenuItem
                          className="flex items-center gap-2 hover:bg-amber-300 hover:text-white"
                          onClick={() => editRow(row.original)}
                        >
                          <PencilIcon className="w-4 h-4" />Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-2 hover:bg-red-300 hover:text-white"
                          onClick={() => deleteRow(row.original.id)}
                        >
                          <TrashIcon className="w-4 h-4" />Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>


                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length}
                  className="h-24 text-center"
                >
                  Lo siento, no hay datos.
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
        >
          Agregar
        </Button>
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
  );
}
