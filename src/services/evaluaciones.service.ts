import axios from "axios"
import type { IEvaluacion, IEvaluacionItem } from "@/interfaces/evaluacion.interface"

const API_URL = "http://localhost:3000/api/v1/"
const EP_EVALUACIONES = API_URL + "evaluacion"

export const EvaluacionesService = () => {
    console.log("EvaluacionesService")
}

export const getEvaluaciones = async () => {
    try {
        const response = await axios.get(EP_EVALUACIONES)
        console.log("GetEvaluacionesService - GetEvaluaciones", response.data)
        if (response.data.evaluaciones) {
            return response.data.evaluaciones
        }
        throw new Error("No se encontraron evaluaciones")

    } catch (error) {
        console.log("GetEvaluacionesService - Error", error)
        return []
    }
}

export const AddEvaluacion = async (evaluacion: IEvaluacion) => {
    console.log("AddEvaluacionService", evaluacion)

    const response = await axios.post(EP_EVALUACIONES, 
        {
            nombre: evaluacion.nombre,
            procesoId: evaluacion.procesoId,
            supTerreno: evaluacion.supTerreno,
            supConstruida: evaluacion.supConstruida,
            valorTerreno: evaluacion.valorTerreno,
        })

    const newEvaluacion: IEvaluacion = {
        id: response.data.id,
        nombre: response.data.nombre,
        procesoId: response.data.procesoId,
        supTerreno: response.data.supTerreno,
        supConstruida: response.data.supConstruida,
        valorTerreno: response.data.valorTerreno,
        items: [],
        tipologias: []
    }
    return newEvaluacion
}

export const UpdateEvaluacion = (evaluacion: IEvaluacion) => {
    console.log("UpdateEvaluacionService", evaluacion)
}

export const DeleteEvaluacion = async (id: number) => {
    try {
        await axios.delete(EP_EVALUACIONES + "/" + id)
    } catch (error) {
        console.log("DeleteEvaluacionService - Error", error)
    }
}


export const getEvaluacionById = (id: number) => {
    console.log("GetEvaluacionByIdService", id)
    return null
}
