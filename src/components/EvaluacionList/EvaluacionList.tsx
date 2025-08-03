import { useEffect, useState } from "react"
import { getEvaluaciones, AddEvaluacion, DeleteEvaluacion } from "@/services/evaluaciones.service"
import { DataTable } from "@/components/EvaluacionList/dataTable"
import { getEvaluacionColumns } from "./EvaluacionTableColumns"
import { EvaluacionModal } from "./EvaluacionModal"
import type { IEvaluacion } from "@/interfaces/evaluacion.interface"
import { Loader } from "../Common/Loader"
import { ComponentMock } from "../Common/ComponentMock"

interface EvaluacionListProps {
    title: string;
    proceso_id: number;
    onEdit: (evaluacionId: number) => void;
    onDelete: (id: number) => void;
}

export const EvaluacionList = ({ title, proceso_id, onEdit, onDelete }: EvaluacionListProps) => {
    const [evaluaciones, setEvaluaciones] = useState<IEvaluacion[]>([])
    const [modalOpen, setModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState("add" as "add" | "edit")
    const [modalData, setModalData] = useState<IEvaluacion | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if(isLoading)
            getEvalAsync()
    }, [isLoading])

    const getEvalAsync = async () => {        
        const result: IEvaluacion[] = await getEvaluaciones()
        setIsLoading(false)
        setEvaluaciones(result)
    }

    const handleAdd = () => {
        setModalMode("add")
        setModalData(null)
        setModalOpen(true)
    }
    const handleEdit = (evaluacionId: number) => {
        onEdit(evaluacionId);
    }
    const handleDelete = async (id: number) => {
        console.log("handleDelete", id)
        setIsLoading(true)
        await DeleteEvaluacion(id)
        setIsLoading(false)
        onDelete(id)
    }

    const handleSubmit = async (formData: FormData) => {
        const newEvaluacion: IEvaluacion = {
            id: 0,
            nombre: formData.get("nombre") as string,
            procesoId: Number(proceso_id),
            supTerreno: Number(formData.get("sup_terreno")),
            supConstruida: Number(formData.get("sup_construida")),
            valorTerreno: Number(formData.get("valor_terreno")),
            items: [],
            tipologias: []
        }
        const result: IEvaluacion = await AddEvaluacion(newEvaluacion)
        setIsLoading(true)
    }
    
    return (
        <div>
            <div className="flex justify-between px-2">
                <h2 className="text-2xl font-bold">{title}</h2>
                {isLoading && <Loader size="small" />}
            </div>
            <EvaluacionModal isOpen={modalOpen} mode={modalMode} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} data={modalData}/>
            {isLoading ? ( <ComponentMock className="min-h-96" />) : (<DataTable
                columns={getEvaluacionColumns({ onEdit: handleEdit, onDelete: handleDelete })}
                data={evaluaciones}
                filterColumnName="nombre"
                handleAdd={handleAdd}
            />)}
        </div>
    )
}   