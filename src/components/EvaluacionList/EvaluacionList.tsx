import { useEffect, useState } from "react"
import { getEvaluaciones } from "@/services/evaluaciones.service"
import { DataTable } from "@/components/ui/dataTable"
import { getEvaluacionColumns } from "./EvaluacionTableColumns"
import { EvaluacionModal } from "./EvaluacionModal"
import type { IEvaluacion } from "@/interfaces/evaluacion.interface"

interface EvaluacionListProps {
    title: string;
    onEdit: (evaluacion: IEvaluacion) => void;
    onDelete: (id: number) => void;
}

export const EvaluacionList = ({ title, onEdit, onDelete }: EvaluacionListProps) => {
    const [evaluaciones, setEvaluaciones] = useState<IEvaluacion[]>([])
    const [modalOpen, setModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState("add" as "add" | "edit")
    const [modalData, setModalData] = useState<IEvaluacion | null>(null)

    useEffect(() => {
        const result: IEvaluacion[] = getEvaluaciones()
        console.log("GetEvaluaciones: ", result)
        setEvaluaciones(result)
    }, [])

    const handleAdd = () => {
        setModalMode("add")
        setModalData(null)
        setModalOpen(true)
    }
    const handleEdit = (evaluacion: IEvaluacion) => {
        onEdit(evaluacion);
    }
    const handleDelete = (id: number) => {
        onDelete(id)
    }

    const handleSubmit = (formData: FormData) => {
        console.log("handleSubmit", formData)
    }
    
    return (
        <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <EvaluacionModal isOpen={modalOpen} mode={modalMode} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} data={modalData}/>
            {evaluaciones.length > 0 ? (
                <DataTable
                    columns={getEvaluacionColumns({ onEdit: handleEdit, onDelete: handleDelete })}
                    data={evaluaciones}
                    filterColumnName="nombre"
                    handleAdd={handleAdd}
                />
            ) : (
                <p>No hay evaluaciones</p>
            )}
        </div>
    )
}   