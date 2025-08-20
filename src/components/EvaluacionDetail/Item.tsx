import type {
  IEvaluacionItem,
  IEvaluacionSubItem,
} from "@/interfaces/item.interface";
import type { IEvaluacionTipologia } from "@/interfaces/tipologia.interface";
import { DataTable } from "./dataTable";
import { Button } from "../ui/button";
import { useState, useMemo } from "react";
import {
  PlusIcon,
  MinusIcon,
  PencilIcon,
  TrashIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ItemModal } from "./ItemModal";
import { Input } from "../ui/input";
import { SubItemTable } from "./SubItemTable";

interface EvaluacionItemProps {
  item: IEvaluacionItem;
  tipologias: IEvaluacionTipologia[] | undefined;
  handleEditItem?: (item: IEvaluacionItem) => void;
  handleDeleteItem?: (itemId: number) => void;
}

export function EvaluacionItem({
  item,
  tipologias,
  handleEditItem,
  handleDeleteItem,
}: EvaluacionItemProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [tableOpen, setTableOpen] = useState(false);
  const [itemData, setItemData] = useState(item);
  const [subItems, setSubItems] = useState(item.subItems ?? []);
  const [subItemId, setSubItemId] = useState(0);

  const onEditItem = (item: IEvaluacionItem) => {
    setModalOpen(true);
    handleEditItem?.(item);
  };

  const onDeleteItem = (itemId: number) => {
    handleDeleteItem?.(itemId);
  };

  const tipologiaHeaders = useMemo(() => {
    const result =
      tipologias?.map((tipologia) => {
        return { id: tipologia.id, nombre: tipologia.nombre };
      }) ?? [];
    return result;
  }, [item]);

    const handleAddSubItem = () => {
    const newSubItems = [
      ...subItems,
      {
        id: subItemId - 1,
        orden: subItems.length + 1,
        nombre: "",
        unidad: "",
        tipologias: [],
      },
    ];
    setSubItemId(subItemId - 1);
    setSubItems(newSubItems);
  };
  const handleEditSubItem = (data: any) => {
    console.log("handleEditSubItem", data);
  };

  const handleDeleteSubItem = (id: number) => {
    console.log("handleDeleteSubItem", id);
  };

  return (
    <div className="flex flex-col gap-0 p-0 ">
      <ItemModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(formData) => {
          setItemData(formData);
          handleEditItem?.(formData);
          setModalOpen(false);
        }}
        data={itemData}
      />
      <div
        className={`flex justify-between sm-bg-blue py-1 px-4 text-gray-100 ${
          tableOpen ? "rounded-t-lg" : "rounded-lg"
        }`}
      >
        <div className="flex items-center">
          <Button
            className="sm-bg-blue-2"
            onClick={() => setTableOpen(!tableOpen)}
          >
            {tableOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div>
          <p className="text-sm font-bold text-center py-0">Identificador</p>
          <p className="text-sm text-center py-0">{itemData.identificador}</p>
        </div>

        <div>
          <p className="text-sm font-bold text-center py-0">Centro de Costo</p>
          <p className="text-sm text-center py-0">{itemData.centroCosto}</p>
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
          <p className="text-sm text-center py-0">
            {itemData.itemTotal} {itemData.unidad}
          </p>
        </div>
        <div className="flex items-center flex-row gap-1">
          <Button className="bg-amber-400" onClick={() => setModalOpen(true)}>
            <PencilIcon className="h-4 w-4" />
          </Button>
          <Button
            className="bg-red-400"
            onClick={() => onDeleteItem(itemData.id)}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div
        className="rounded-b-lg border border-gray-200 p-2"
        style={{ display: tableOpen ? "block" : "none" }}
      >
        <SubItemTable
          tipologias={tipologiaHeaders}
          data={subItems}
          handleAdd={handleAddSubItem}
          handleEdit={handleEditSubItem}
          handleDelete={handleDeleteSubItem}
        />
      </div>
    </div>
  );
}
