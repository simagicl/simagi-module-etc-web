import { useEffect, useState } from "react"
import { getEvaluaciones } from "@/services/evaluaciones.service"
import { DataTable } from "@/components/ui/dataTable"
import { getEvaluacionColumns } from "./EvaluacionTableColumns"
interface EvaluacionListProps {
    title: string;
}

export const EvaluacionList = ({ title }: EvaluacionListProps) => {
    const [evaluaciones, setEvaluaciones] = useState([])

    useEffect(() => {
        const result: any = getEvaluaciones()
        setEvaluaciones(result)
    }, [])

    const handleAdd = () => {
        console.log("handleAdd")
    }
    const handleEdit = (evaluacion: any) => {
        console.log("handleEdit", evaluacion)
    }
    const handleDelete = (id: number) => {
        console.log("handleDelete", id)
    }
    return (
        <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            
            <DataTable
                columns={getEvaluacionColumns({ onEdit: handleEdit, onDelete: handleDelete })}
                data={evaluaciones}
                filterColumnName="nombre"
                handleAdd={handleAdd}
            />
        </div>
    )
}   