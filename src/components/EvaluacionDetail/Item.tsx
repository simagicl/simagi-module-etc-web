import type { IEvaluacionItem, IResumenTipologia } from "@/interfaces/evaluacion.interface";
import { DataTable } from "./dataTable";
import { Button } from "../ui/button";
import { useState, useMemo } from "react";
import { PlusIcon, MinusIcon, PencilIcon, TrashIcon } from "lucide-react";
import { ItemModal } from "./ItemModal";

interface EvaluacionItemProps {
    item: IEvaluacionItem;
    tipologias: IResumenTipologia[] | undefined;
    handleEditItem?: (item: IEvaluacionItem) => void;
    handleDeleteItem?: (itemId: number) => void;
}

export function EvaluacionItem({ item, tipologias, handleEditItem, handleDeleteItem }: EvaluacionItemProps) {
  const [modalOpen, setModalOpen] = useState(false);
    const [tableOpen, setTableOpen] = useState(false);
    const [itemData, setItemData] = useState(item);

    const onEditItem = (item: IEvaluacionItem) => {
        setModalOpen(true);
        handleEditItem?.(item);
    };

    const onDeleteItem = (itemId: number) => {
        handleDeleteItem?.(itemId);
    };

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
      ], [dynamicTipologiaColumns]);
    
    return (
        <div className="flex flex-col gap-0 p-0 ">
          <ItemModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={(formData) => {
            setItemData(formData);
            handleEditItem?.(formData);
            setModalOpen(false);
          }} data={itemData} />
            <div className={`flex justify-between sm-bg-cyan py-1 px-4 text-gray-800 ${tableOpen ? "rounded-t-lg" : "rounded-lg"}`}>
                <div className="flex items-center">
                <Button className="bg-teal-500" onClick={() => setTableOpen(!tableOpen)}>
                    {tableOpen ? <MinusIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
                </Button>
                </div>
                <div>
                    <p className="text-sm font-bold text-center py-0">Identificador</p>
                    <p className="text-sm text-center py-0">{itemData.identificador}</p>
                </div>
                
                <div>
                    <p className="text-sm font-bold text-center py-0">Centro de Costo</p>
                    <p   className="text-sm text-center py-0">{itemData.centroCosto}</p>
                </div>

                <div>
                    <p className="text-sm font-bold text-center py-0">Unidad</p>
                    <p className="text-sm text-center py-0">{itemData.unidad}</p>
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
                    <p className="text-sm text-center py-0">{itemData.subItems.reduce((total, subItem) => total + subItem.tipologias.reduce((totalTipologia, tipologia) => totalTipologia + tipologia.valor, 0), 0)} {itemData.unidad}</p>                
                </div>
                <div className="flex items-center flex-row gap-1">
                  <Button className="bg-amber-400" onClick={() => setModalOpen(true)}>
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button className="bg-red-400" onClick={() => onDeleteItem(itemData.id)}>
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
            </div>
            <div className="rounded-b-lg border border-gray-200 p-2" style={{ display: tableOpen ? "block" : "none" }}>
                <DataTable columns={columns} data={itemData.subItems} pagination={false} />
            </div>
        </div>
    )
}