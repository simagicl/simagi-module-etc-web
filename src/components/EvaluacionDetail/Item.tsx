import type { IEvaluacionItem, IResumenTipologia } from "@/interfaces/evaluacion.interface";
import { DataTable } from "./dataTable";
import { Button } from "../ui/button";
import { useState, useMemo } from "react";
import { PlusIcon, MinusIcon } from "lucide-react";

interface EvaluacionItemProps {
    item: IEvaluacionItem;
    tipologias: IResumenTipologia[] | undefined;
}

export function EvaluacionItem({ item, tipologias }: EvaluacionItemProps) {
    const [open, setOpen] = useState(false)

    const tipologiaHeaders = useMemo(() => {
        const allTipologias = item.subItems.flatMap((item) => item.tipologias ?? []);
        const unique = Array.from(new Set(allTipologias.map((t) => t.nombre)));
        return unique;
      }, [item]);

      const dynamicTipologiaColumns = tipologiaHeaders.map((nombre: string) => ({
        accessorKey: `tipologia_${nombre}`,
        header: nombre,
        cell: ({ row }: { row: any }) => {
          const match = row.original.tipologias?.find((t: any) => t.nombre === nombre);
          return match?.valor ?? "-";
        },
      }));

      const columns = useMemo(() => [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "orden", header: "Orden" },
        { accessorKey: "nombre", header: "Nombre" },
        { accessorKey: "unidad", header: "Unidad" },
        ...dynamicTipologiaColumns,
        {
          accessorKey: "actions",
          header: "Acciones",
          cell: ({ row }: { row: any }) => (
            <div className="flex gap-2 justify-center">
              <Button
                onClick={() => console.log(row.original)}
                className="sm-btn-rounded bg-amber-400 text-white px-2 py-1 "
              >
                Editar
              </Button>
              <Button
                onClick={() => console.log(row.original.id)}
                className="sm-btn-rounded bg-red-400 text-white px-2 py-1 "
              >
                Eliminar
              </Button>
            </div>
          ),
        },
      ], [dynamicTipologiaColumns]);
    
    return (
        <div className="flex flex-col gap-0 p-0 ">
            <div className="flex justify-between sm-bg-cyan py-1 px-4 rounded-t-lg text-white">
                <Button className="sm-btn-rounded sm-bg-btn-primary" onClick={() => setOpen(!open)}>
                    {open ? <MinusIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
                </Button>
                <div>
                    <p className="text-sm font-bold text-center py-0">Identificador</p>
                    <p className="text-sm text-center py-0">{item.identificador}</p>
                </div>
                
                <div>
                    <p className="text-sm font-bold text-center py-0">Centro de Costo</p>
                    <p   className="text-sm text-center py-0">{item.centroCosto}</p>
                </div>

                <div>
                    <p className="text-sm font-bold text-center py-0">Unidad</p>
                    <p className="text-sm text-center py-0">{item.unidad}</p>
                </div>
                <div>
                    <p className="text-sm font-bold text-center py-0">Tipologías</p>
                    <div className="flex gap-1">
                        {tipologias?.map((tipologia) => (
                            <div key={tipologia.id} className="flex flex-col gap-1">
                                <p className="text-sm text-center py-0">{tipologia.nombre}</p>
                                <p className="text-sm text-center py-0">{tipologia.valor}</p>
                            </div>
                        ))}     
                    </div>
                </div>
                    <div>
                    <p className="text-sm font-bold text-center py-0">Subtotal</p>
                    <p className="text-sm text-center py-0">{item.subItems.reduce((total, subItem) => total + subItem.tipologias.reduce((totalTipologia, tipologia) => totalTipologia + tipologia.valor, 0), 0)} {item.unidad}</p>                
                </div>
            </div>
            <div className="rounded-b-lg border border-gray-200 p-2" style={{ display: open ? "block" : "none" }}>
                <DataTable columns={columns} data={item.subItems} pagination={false} />
            </div>
        </div>
    )
}