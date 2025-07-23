"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import type { IEvaluacion } from "@/interfaces/evaluacion.interface"

type EvaluacionColumnsParams = {
  onEdit: (evaluacion: IEvaluacion) => void
  onDelete: (id: number) => void
}

export function getEvaluacionColumns({ onEdit, onDelete }: EvaluacionColumnsParams): ColumnDef<IEvaluacion>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
      enableHiding: true,
    },
    {
      accessorKey: "nombre",
      header: "Nombre",
    },
    {
      accessorKey: "sup_terreno",
      header: "Superficie Terreno [m2]",
    },
    {
      accessorKey: "sup_construida",
      header: "Superficie Construida [m2]",
    },
    {
      accessorKey: "valor_terreno",
      header: "Valor Terreno [UF]",
    },
    {
      header: "Acciones",
      id: "acciones",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            onClick={() => onEdit(row.original)}
            className="bg-yellow-500 text-white px-2 py-1 rounded"
          >
            Editar
          </Button>
          <Button
            onClick={() => onDelete(row.original.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Eliminar
          </Button>
        </div>
      ),
    },
  ]
}