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

import { Button } from "@/components/ui/button";
import { EllipsisVerticalIcon, TrashIcon } from "lucide-react";
import { EditableInput } from "../Common/EditableInput";

interface UrbaTableProps<TData, TValue> {
  data: TData[];
  onCellUpdate: (id: number, key: keyof TData, value: string) => void;
  handleAdd?: () => void;
  handleEdit?: (data: TData) => void;
  handleDelete?: (id: number) => void;
  pagination?: boolean;
}

const styles = {
  container: "my-2",
  table: "border border-gray-200",
  headRow: "border border-gray-200 sm-bg-gray",
  headText: "text-center bg-gray-200",
  tableCell: "text-center border-y border-gray-200 w-1/5",
  tableRow: "border border-gray-200 sm-bg-gray",
};

export function UrbaTable<TData, TValue>({
  data,
  onCellUpdate,
  handleAdd,
  handleDelete,
  pagination = false,
}: UrbaTableProps<TData, TValue>) {
  const tableColumns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "orden", header: "Orden" },
    {
      accessorKey: "nombre",
      header: "Descripción",
      cell: ({ row, table }: { row: any; table: any }) => (
        <EditableInput
          value={row.original.nombre ?? 0}
          onSave={(value) =>
            table.options.meta?.onCellUpdate(row.original.id, "nombre", value)
          }
        />
      ),
    },
    {
      accessorKey: "referencia",
      header: "Referencia",
      cell: ({ row, table }: { row: any; table: any }) => (
        <EditableInput
          value={row.original.referencia ?? 0}
          onSave={(value) =>
            table.options.meta?.onCellUpdate(
              row.original.id,
              "referencia",
              value
            )
          }
        />
      ),
    },
    {
      accessorKey: "cubicacion",
      header: "Cubicación",
      cell: ({ row, table }: { row: any; table: any }) => (
        <EditableInput
          value={row.original.cubicacion ?? 0}
          type="number"
          onSave={(value) =>
            table.options.meta?.onCellUpdate(
              row.original.id,
              "cubicacion",
              value
            )
          }
        />
      ),
    },
    {
      accessorKey: "costoUnitario",
      header: "Costo Unitario",
      cell: ({ row, table }: { row: any; table: any }) => (
        <EditableInput
          value={row.original.costoUnitario.toString() ?? 0}
          type="number"
          onSave={(value) =>
            table.options.meta?.onCellUpdate(
              row.original.id,
              "costoUnitario",
              value
            )
          }
        />
      ),
    },
    {
      id: "total",
      header: "Subtotal",
      cell: ({ row }: { row: any }) =>
        (row.original.total =
          (row.original.costoUnitario ?? 0) * (row.original.cubicacion ?? 0)),
    },
  ];

  const table = useReactTable({
    data,
    columns: tableColumns,
    meta: { onCellUpdate },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnVisibility: {
        id: false,
        orden: false,
      },
    },
  });

  const deleteRow = (id: number) => {
    console.log("deleteRow", id);
    handleDelete?.(id);
  };

  return (
    <div className="sm-text">
      <div>
        <Table className={styles.table}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className={styles.headRow}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className={styles.headText}>
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
                  className={styles.tableRow}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={styles.tableCell}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell className={styles.tableCell}>
                    <Button
                      onClick={() => deleteRow(index)}
                      className="sm-bg-btn-primary text-white"
                      size="sm">
                      <TrashIcon className="w-5 h-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length}
                  className="h-24 text-center">
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
          onClick={handleAdd}>
          Agregar
        </Button>
      </div>
      {pagination && (
        <div className="flex items-center justify-center space-x-2 py-4">
          <Button
            className="sm-btn-rounded sm-bg-btn-primary text-white"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Anterior
          </Button>
          <Button
            className="sm-btn-rounded sm-bg-btn-primary text-white"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Siguiente
          </Button>
        </div>
      )}
    </div>
  );
}
