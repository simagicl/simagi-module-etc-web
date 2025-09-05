import axios from "axios"
import type { IEvaluacion, IEvaluacionBasicInfo } from "@/interfaces/evaluacion.interface"
import type { IEvaluacionTipologia } from "@/interfaces/tipologia.interface"
import { EP_EVALUACIONES, EP_TIPOLOGIAS } from "@/services/consts.service";


export const EvaluacionesService = () => {
    console.log("EvaluacionesService")
}

export const getEvaluaciones = async () => {
    try {
        const response = await axios.get(EP_EVALUACIONES)
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
        tipologias: [],
        urbanizacionItems: []
    }
    return newEvaluacion
}

export const UpdateEvaluacion = async (evaluacion: IEvaluacion) => {
    console.log("UpdateEvaluacionService", evaluacion)
}

export const UpdateEvaluacionBasicInfo = async (evaluacion: IEvaluacionBasicInfo) => {
    try {
        const response = await axios.put(EP_EVALUACIONES + "/" + evaluacion.id + "/basic-info", evaluacion)
        const evaluacionUpdated: IEvaluacion = {
            id: response.data.evaluacion.id,
            nombre: response.data.evaluacion.nombre,
            procesoId: response.data.evaluacion.procesoid,
            supTerreno: response.data.evaluacion.supTerreno,
            supConstruida: response.data.evaluacion.supConstruida,
            valorTerreno: response.data.evaluacion.valorTerreno,
            items: response.data.evaluacion.items,
            tipologias: response.data.evaluacion.tipologias,
            urbanizacionItems: response.data.evaluacion.urbanizacionItems
        }
        return evaluacionUpdated
    } catch (error) {
        console.log("UpdateEvaluacionBasicInfoService - Error", error)
        return null
    }
}

export const UpdateEvaluacionTipologias = async (evaluacionId: number, tipologias: IEvaluacionTipologia[]) => {
    console.log("UpdateEvaluacionTipologiasService", evaluacionId, tipologias)
    try {
        const response = await axios.put(EP_EVALUACIONES + "/" + evaluacionId + "/tipologias", {
            evaluacionId: evaluacionId,
            tipologias: tipologias
        })
        console.log("UpdateEvaluacionTipologiasService - Response", response)
        return response.data.tipologias
    }
    catch (error) {
        console.log("UpdateEvaluacionTipologiasService - Error", error)
        return null
    }
}

export const DeleteEvaluacionTipologia = async (tipologiaId: number) => {
    try {
        const response = await axios.delete(EP_TIPOLOGIAS + "/" + tipologiaId)
        console.log("DeleteEvaluacionTipologiaService - Response", response)
        return response.data
    }
    catch (error) {
        console.log("DeleteEvaluacionTipologiaService - Error", error)
        return null
    }
}

export const UpdateEvaluacionUrbanizacion = async (evaluacion: IEvaluacion) => {
    console.log("UpdateEvaluacionUrbanizacionService", evaluacion)
}

export const DeleteEvaluacion = async (id: number) => {
    try {
        await axios.delete(EP_EVALUACIONES + "/" + id)
    } catch (error) {
        console.log("DeleteEvaluacionService - Error", error)
    }
}

export const getEvaluacionById = async (id: number) => {
    try {
        const response = await axios.get(EP_EVALUACIONES + "/" + id)
        const evaluacion: IEvaluacion = {
            id: response.data.evaluacion.id,
            nombre: response.data.evaluacion.nombre,
            procesoId: response.data.evaluacion.procesoid,
            supTerreno: response.data.evaluacion.supTerreno,
            supConstruida: response.data.evaluacion.supConstruida,
            valorTerreno: response.data.evaluacion.valorTerreno,
            items: response.data.evaluacion.items,
            tipologias: response.data.evaluacion.tipologias,
            urbanizacionItems: response.data.evaluacion.urbanizacionItems
        }
        console.log("GetEvaluacionByIdService - Response", response)           
        return evaluacion
    } catch (error) {
        console.log("GetEvaluacionByIdService - Error", error)
        const resp: IEvaluacion = {
            id: -1,
            nombre: "",
            procesoId: 0,
            supTerreno: 0,
            supConstruida: 0,
            valorTerreno: 0,
            items: [],
            tipologias: [],
            urbanizacionItems: []
        } as IEvaluacion
        return resp
    }
}
