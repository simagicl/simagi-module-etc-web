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


interface UrbaTableProps<TData, TValue> {
  data: TData[];
  handleAdd?: () => void;
  handleEdit?: (data: TData) => void;
  handleDelete?: (id: number) => void;
  pagination?: boolean;
}

const styles = {
    container: "my-2",
    table: "border border-gray-200",
    headRow: "border border-gray-200 sm-bg-gray",
    headText:"text-center bg-gray-200",
    tableCell: "text-center border-y border-gray-200",
    tableRow: "border border-gray-200 sm-bg-gray",
}

export function UrbaTable<TData, TValue>({
  data,
  handleAdd, 
  handleEdit,
  handleDelete,
  pagination = false,
}: UrbaTableProps<TData, TValue>) {

  const tableColumns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "orden", header: "Orden" },
    { accessorKey: "nombre", header: "Descripción" },
    { accessorKey: "referencia", header: "Referencia" },
    { accessorKey: "cubicacion", header: "Cubicación" },
    { accessorKey: "costoUnitario", header: "Costo Unitario" },
    { accessorKey: "total", header: "Costo Total" }
  ];

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnVisibility: {
        id: false,
        orden: false
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
    <div className="sm-text">
      <div>
        <Table className={styles.table}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={styles.headRow}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={styles.headText}
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
                  className={styles.tableRow}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={styles.tableCell}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell className={styles.tableCell}>
                    
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
                          onClick={() => deleteRow(1)}
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
