import type { IEvaluacion, IEvaluacionItem } from "@/interfaces/evaluacion.interface"

// Mocks
//import { evaluaciones } from "../mocks/evaluaciones"

let evaluacionesData: IEvaluacion[] =  [
    {
        id: 1,
        nombre: "Evaluacion 1",
        proceso_id: 1,
        sup_terreno: 100,
        sup_construida: 50,
        valor_terreno: 100000,
        items: [],
        tipologias: []
    }
];

export const EvaluacionesService = () => {
    console.log("EvaluacionesService")
}

export const getEvaluaciones = async () => {
    const result = evaluacionesData.map((evaluacion: IEvaluacion) => {
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
    setTimeout(() => {
        console.log("GetEvaluacionesService - GetEvaluaciones", result)
    }, 1000)
    return result
}

export const AddEvaluacion = async (evaluacion: IEvaluacion) => {
    console.log("AddEvaluacionService", evaluacion)
    
    const newId = evaluacionesData.length + 1;
    evaluacion.id = newId;
    
    setTimeout(() => {
        console.log("AddEvaluacionService - Sim store", evaluacionesData)
    }, 1000)
    
    evaluacionesData.push(evaluacion)
    return evaluacionesData;
}

export const UpdateEvaluacion = (evaluacion: IEvaluacion) => {
    const index = evaluacionesData.findIndex((evaluacion: IEvaluacion) => evaluacion.id === evaluacion.id)
    if (index !== -1) {
        evaluacionesData[index] = evaluacion
    }
}

export const DeleteEvaluacion = (id: number) => {
    const index = evaluacionesData.findIndex((evaluacion: IEvaluacion) => evaluacion.id === id)
    if (index !== -1) {
        evaluacionesData.splice(index, 1)
    }
}


export const getEvaluacionById = (id: number) => {
    const result = evaluacionesData.find((evaluacion: IEvaluacion) => evaluacion.id === id)
    return result
}
