import { evaluaciones } from "../mocks/evaluaciones"


export const EvaluacionesService = () => {
    console.log("EvaluacionesService")
}

export const getEvaluaciones = () => {
    const result = evaluaciones.map((evaluacion: any) => {
        return {
            id: evaluacion.id,
            nombre: evaluacion.nombre,
            proceso_id: evaluacion.proceso_id,
            sup_terreno: evaluacion.sup_terreno,
            sup_construida: evaluacion.sup_construida,
            valor_terreno: evaluacion.valor_terreno,
            created_at: evaluacion.created_at,
            updated_at: evaluacion.updated_at,
        }
    })
    return result
}
