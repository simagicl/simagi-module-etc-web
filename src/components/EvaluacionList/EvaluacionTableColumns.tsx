"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import type { IEvaluacion } from "@/interfaces/evaluacion.interface"
import { PencilIcon, TrashIcon } from "lucide-react";

type EvaluacionColumnsParams = {
  onEdit: (evaluacionId: number) => void
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
      accessorKey: "supTerreno",
      header: "Superficie Terreno [m2]",
      cell: ({ row }) => (
        <div className="text-end px-2">
          {row.original.supTerreno.toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: "supConstruida",
      header: "Superficie Construida [m2]",
      cell: ({ row }) => (
        <div className="text-end px-2">
          {row.original.supConstruida.toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: "valorTerreno",
      header: "Valor Terreno [UF]",
      cell: ({ row }) => (
        <div className="text-end px-2">
          {row.original.valorTerreno.toLocaleString()}
        </div>
      ),
    },
    {
      header: "Acciones",
      id: "acciones",
      cell: ({ row }) => (
        <div className="flex gap-2 px-2 justify-center">
          <Button
            onClick={() => onEdit(row.original.id)}
            className=" bg-yellow-500 text-white px-2 py-2 "
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => onDelete(row.original.id)}
            className=" bg-red-500 text-white px-2 py-2 "
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]
}