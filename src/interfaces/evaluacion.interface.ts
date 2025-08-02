export interface IEvaluacion {
    id: number;
    nombre: string;
    procesoId: number;
    supTerreno: number;
    supConstruida: number;
    valorTerreno: number;
    tipologias: IResumenTipologia[];
    items: IEvaluacionItem[];
}

export interface IEvaluacionItem {
    id: number;
    orden: number;
    identificador: string;
    centroCosto: string;
    unidad: string;
    subItems: IEvaluacionSubItem[];
}

export interface IResumenTipologia {
    id: number;
    nombre: string;
    cantidad: number;
    superficie: number;
    valor: number;
}

export interface IEvaluacionSubItem {
    id: number;
    orden: number;
    nombre: string;
    unidad: string;
    tipologias: IEvaluacionTipologia[];
}

export interface IEvaluacionTipologia {
    id: number;
    nombre: string;
    descripcion: string;
    unidades: number;
    superficie: number;
    valor: number;
}