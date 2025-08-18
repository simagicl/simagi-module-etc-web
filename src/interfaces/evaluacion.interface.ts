import { type IEvaluacionTipologia } from "./tipologia.interface";
import { type IEvaluacionItem } from "./item.interface";

export interface IEvaluacion {
    id: number;
    nombre: string;
    procesoId: number;
    supTerreno: number;
    supConstruida: number;
    valorTerreno: number;
    tipologias: IEvaluacionTipologia[];
    items: IEvaluacionItem[];
}

export interface IEvaluacionBasicInfo {
    id: number;
    nombre: string;
    supTerreno: number;
    supConstruida: number;
    valorTerreno: number;
}

