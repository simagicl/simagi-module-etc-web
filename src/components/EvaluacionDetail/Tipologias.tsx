import { DataTable } from "./dataTable"
import type { IEvaluacionTipologia } from "@/interfaces/evaluacion.interface"
import { useState } from "react"  
import { Button } from "@/components/ui/button"
import { TipologiaModal } from "./TipologiaModal";


interface TipologiasProps {
    tipologias?: IEvaluacionTipologia[];
    toDelete?: number[];
    hasChanged?: (hasChanged: boolean) => void;
    onChange?: (tipologias: IEvaluacionTipologia[]) => void;
}

export const Tipologias = ({ tipologias, toDelete, hasChanged, onChange }: TipologiasProps) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedTipologia, setSelectedTipologia] = useState<IEvaluacionTipologia | null>(null)
    const [newTipologiaIdx, setNewTipologiaIdx] = useState(-1)
    const [tipologiaToDelete, setTipologiaToDelete] = useState<number[]>([])
    
    const columns = [
        {
            accessorKey: "nombre",
            header: "Nombre",
            cell: ({ row }: any) => (
                <div className="flex gap-2 justify-left px-2">
                    <p>{row.original.nombre}</p>
                </div>
            ),
        },
        {
            accessorKey: "unidad",
            header: "Unidades",
        },
        {
            accessorKey: "superficie",
            header: "Superficie [m2]",
        },
        {
            accessorKey: "valor",
            header: "Valor [UF]/Unidad",
        },
        {
            id: "actions",
            header: "Acciones",
            cell: ({ row }: any) => (
                <div className="flex gap-2 justify-center">
                    <Button
                        className="sm-btn-rounded bg-amber-400 text-white"
                        size="sm"
                        onClick={() => editTipologia(row.original)}
                    >
                        Editar
                    </Button>
                    <Button
                        className="sm-btn-rounded bg-red-400 text-white"
                        size="sm"
                        onClick={() => deleteTipologia(row.original.id)}
                    >
                        Eliminar
                    </Button>
                </div>
            ),
        },
    ]

    const addTipologia = () => {
        console.log("addTipologia IDX: ", newTipologiaIdx)
        const newTipologias = [...tipologias ?? []]
        newTipologias.push({
            id: newTipologiaIdx,
            tipo: "principal",
            nombre: "Nueva Tipología", 
            unidad: 0,
            superficie: 0,
            valor: 0,
            descripcion: "",
        })
        onChange?.(newTipologias)
        hasChanged?.(true)
        setNewTipologiaIdx(newTipologiaIdx - 1)
    }

    const editTipologia = (tipologia: IEvaluacionTipologia) => {
        console.log("editTipologia", tipologia)
        setSelectedTipologia(tipologia)
        setModalOpen(true)
    }

    const handleModalSubmit = (formData: FormData) => {
        console.log("handleModalSubmit", formData)
        const newTipologias = [...tipologias ?? []]
        const index = newTipologias.findIndex((tipologia) => tipologia.id === selectedTipologia?.id)
        
        if (index === -1) return

        newTipologias[index || 0] = {
            ...selectedTipologia,
            id: selectedTipologia?.id || 0,
            tipo: formData.get("tipo") as string || "principal",
            nombre: formData.get("nombre") as string,
            unidad: Number(formData.get("unidad")),
            superficie: Number(formData.get("superficie")),
            valor: Number(formData.get("valor")),
            descripcion: formData.get("descripcion") as string || "",
        }

        onChange?.(newTipologias)
        hasChanged?.(true)
        setModalOpen(false)
    }

    const deleteTipologia = (id: number) => {
        const newTipologias = [...tipologias ?? []]
        const index = newTipologias.findIndex((tipologia) => tipologia.id === id)
        if (index === -1) return
        newTipologias.splice(index, 1)
        tipologiaToDelete.push(id)   
        setTipologiaToDelete(tipologiaToDelete)
        onChange?.(newTipologias)
        hasChanged?.(true)
        console.log("tipologiaToDelete", tipologiaToDelete)
    }

    return (
        <div>
            <TipologiaModal
                isOpen={modalOpen}
                mode="edit"
                onClose={() => setModalOpen(false)}
                onSubmit={(formData) => handleModalSubmit(formData)}
                data={selectedTipologia}
            />
            <DataTable 
                columns={columns} 
                data={tipologias ?? []} 
                handleAdd={addTipologia}
                handleEdit={editTipologia}
                handleDelete={deleteTipologia}
            />
        </div>
    )
}