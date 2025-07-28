import type { IEvaluacion, IEvaluacionItem, IResumenTipologia } from "@/interfaces/evaluacion.interface"
import { evaluacionMock } from "./evaluacion"
export const evaluaciones: IEvaluacion[] = [
    {
        id: 1,
        nombre: "Evaluacion 1",
        proceso_id: 1,
        sup_terreno: 100,
        sup_construida: 50,
        valor_terreno: 100000,
        tipologias: evaluacionMock.tipologias as IResumenTipologia[],
        items: [],
    },
    {
        id: 2,
        nombre: "Evaluacion 2",
        proceso_id: 1,
        sup_terreno: 100,
        sup_construida: 50,
        valor_terreno: 100000,
        tipologias: evaluacionMock.tipologias as IResumenTipologia[],
        items: evaluacionMock.items as IEvaluacionItem[],
    },
    {
        id: 3,
        nombre: "Evaluacion 3",
        proceso_id: 1,
        sup_terreno: 100,
        sup_construida: 50,
        valor_terreno: 100000,
        tipologias: evaluacionMock.tipologias as IResumenTipologia[], 
        items: evaluacionMock.items as IEvaluacionItem[],
    },
]   