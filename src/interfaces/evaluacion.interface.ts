import { type IEvaluacionItem } from "./item.interface";
import { type IEvaluacionTipologia } from "./tipologia.interface";
import { type IUrbanizacionItem } from "./urbanizacion.interface";

export interface IEvaluacion {
    id: number;
    nombre: string;
    procesoId: number;
    supTerreno: number;
    supConstruida: number;
    valorTerreno: number;
    tipologias: IEvaluacionTipologia[];
    urbanizacionItems: IUrbanizacionItem[];
    items: IEvaluacionItem[];
}

export interface IEvaluacionBasicInfo {
    id: number;
    nombre: string;
    supTerreno: number;
    supConstruida: number;
    valorTerreno: number;
}

