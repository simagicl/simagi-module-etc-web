import { DataTable } from "./dataTable"
import type { IResumenTipologia } from "@/interfaces/evaluacion.interface"
import { useState } from "react"  
import { Button } from "@/components/ui/button"
import { TipologiaModal } from "./TipologiaModal";


interface TipologiasProps {
    tipologias?: IResumenTipologia[];
    hasChanged?: (hasChanged: boolean) => void;
    onChange?: (tipologias: IResumenTipologia[]) => void;
}

export const Tipologias = ({ tipologias, hasChanged, onChange }: TipologiasProps) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedTipologia, setSelectedTipologia] = useState<IResumenTipologia | null>(null)
    
    const columns = [
        {
            accessorKey: "nombre",
            header: "Nombre",
        },
        {
            accessorKey: "cantidad",
            header: "Cantidad",
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
        console.log("addTipologia")
        const newTipologias = [...tipologias ?? []]
        newTipologias.push({
            id: 0,
            nombre: "nueva tipologia", 
            cantidad: 0,
            superficie: 0,
            valor: 0,
        })
        onChange?.(newTipologias)
        hasChanged?.(true)
    }

    const editTipologia = (tipologia: IResumenTipologia) => {
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
            nombre: formData.get("nombre") as string,
            cantidad: Number(formData.get("cantidad")),
            superficie: Number(formData.get("superficie")),
            valor: Number(formData.get("valor")),
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
        onChange?.(newTipologias)
        hasChanged?.(true)
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