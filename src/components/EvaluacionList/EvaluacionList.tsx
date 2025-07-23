import { useEffect, useState } from "react"
import { getEvaluaciones } from "@/services/evaluaciones.service"
import { DataTable } from "@/components/ui/dataTable"
import { getEvaluacionColumns } from "./EvaluacionTableColumns"
import { EvaluacionModal } from "./EvaluacionModal"

interface EvaluacionListProps {
    title: string;
}

export const EvaluacionList = ({ title }: EvaluacionListProps) => {
    const [evaluaciones, setEvaluaciones] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState("add" as "add" | "edit")
    const [modalData, setModalData] = useState<any>(null)

    useEffect(() => {
        const result: any = getEvaluaciones()
        setEvaluaciones(result)
    }, [])

    const handleAdd = () => {
        setModalMode("add")
        setModalData(null)
        setModalOpen(true)
    }
    const handleEdit = (evaluacion: any) => {
        setModalMode("edit")
        setModalData(evaluacion)
        setModalOpen(true)
    }
    const handleDelete = (id: number) => {
        console.log("handleDelete", id)
    }

    const handleSubmit = (formData: FormData) => {
        console.log("handleSubmit", formData)
    }
    
    return (
        <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <EvaluacionModal isOpen={modalOpen} mode={modalMode} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} data={modalData}/>
            <DataTable
                columns={getEvaluacionColumns({ onEdit: handleEdit, onDelete: handleDelete })}
                data={evaluaciones}
                filterColumnName="nombre"
                handleAdd={handleAdd}
            />
        </div>
    )
}   