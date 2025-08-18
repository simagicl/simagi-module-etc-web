import {type IEvaluacionTipologia } from "./tipologia.interface";
export interface IEvaluacionItem {
    id: number;
    orden: number;
    identificador: string;
    centroCosto: string;
    unidad: string;
    itemTotal: number;
    subItems: IEvaluacionSubItem[];
}

export interface IEvaluacionSubItem {
    id: number;
    orden: number;
    nombre: string;
    unidad: string;
    tipologias: IEvaluacionTipologia[];
}

export interface IEvaluacionUpdateItemsRequest {
    evaluacionId: number;
    items: IEvaluacionItem[];
}