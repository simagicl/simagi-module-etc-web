import { useEffect, useState } from "react"
import { getEvaluaciones, AddEvaluacion } from "@/services/evaluaciones.service"
import { DataTable } from "@/components/EvaluacionList/dataTable"
import { getEvaluacionColumns } from "./EvaluacionTableColumns"
import { EvaluacionModal } from "./EvaluacionModal"
import type { IEvaluacion } from "@/interfaces/evaluacion.interface"
import { Loader } from "../Common/Loader"

interface EvaluacionListProps {
    title: string;
    proceso_id: number;
    onEdit: (evaluacion: IEvaluacion) => void;
    onDelete: (id: number) => void;
}

export const EvaluacionList = ({ title, proceso_id, onEdit, onDelete }: EvaluacionListProps) => {
    const [evaluaciones, setEvaluaciones] = useState<IEvaluacion[]>([])
    const [modalOpen, setModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState("add" as "add" | "edit")
    const [modalData, setModalData] = useState<IEvaluacion | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getEvalAsync()
    }, [])

    const getEvalAsync = async () => {
        setIsLoading(true)
        const result: IEvaluacion[] = await getEvaluaciones()
        setIsLoading(false)
        setEvaluaciones(result)
    }


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

    const handleSubmit = async (formData: FormData) => {
        const newEvaluacion: IEvaluacion = {
            id: 0,
            nombre: formData.get("nombre") as string,
            proceso_id: Number(proceso_id),
            sup_terreno: Number(formData.get("sup_terreno")),
            sup_construida: Number(formData.get("sup_construida")),
            valor_terreno: Number(formData.get("valor_terreno")),
            items: [],
            tipologias: []
        }
        console.log("Nueva evaluacion:", newEvaluacion)

        setIsLoading(true)
        const result: IEvaluacion[] = await AddEvaluacion(newEvaluacion)
        console.log("AddEvaluacion: ", result)
        setIsLoading(false)
        setEvaluaciones(result)
    }
    
    return (
        <div>
            <div className="flex justify-between px-2">
                <h2 className="text-2xl font-bold">{title}</h2>
                {isLoading && <Loader size="small" />}
            </div>
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