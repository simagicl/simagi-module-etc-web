import type { IEvaluacion } from "@/interfaces/evaluacion.interface"

// Mocks
import { evaluaciones } from "../mocks/evaluaciones"



export const EvaluacionesService = () => {
    console.log("EvaluacionesService")
}

export const getEvaluaciones = () => {
    const result = evaluaciones.map((evaluacion: IEvaluacion) => {
        return {
            id: evaluacion.id,
            nombre: evaluacion.nombre,
            proceso_id: evaluacion.proceso_id,
            sup_terreno: evaluacion.sup_terreno,
            sup_construida: evaluacion.sup_construida,
            valor_terreno: evaluacion.valor_terreno,
            items: evaluacion.items,
            tipologias: evaluacion.tipologias
        }
    })
    return result
}

export const getEvaluacionById = (id: number) => {
    const result = evaluaciones.find((evaluacion: IEvaluacion) => evaluacion.id === id)
    return result
}
