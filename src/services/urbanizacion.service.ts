import axios from "axios";
import { EP_URBANIZACIONES } from "@/services/consts.service";

export type UrbanizacionSubItem = {
    id: number,
    orden: number,
    urbanizacionItemId: number,
    nombre: string,
    unidad: string,
    cubicacion: number
    costoUnitario: number
    costo: number
}

export type UrbanizaciónItem = {
    id: number,
    evaluacionId: number,
    orden: number,
    nombre: string,
    costoItem: number,
    subItems: UrbanizacionSubItem[]
}

export const getUrbanizaciones = async () => {
    try {
        const response = await axios.get(EP_URBANIZACIONES)
        if (response.data.evaluaciones) {
            return response.data.evaluacion
        }
        throw new Error("No se encontraron evaluaciones")

    } catch (error) {
        console.log("GetEvaluacionesService - Error", error)
        return []   
    }
}

