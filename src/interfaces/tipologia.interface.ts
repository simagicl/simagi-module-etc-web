export interface IResumenTipologia {
    id: number;
    tipo: string;
    nombre: string;
    cantidad: number;
    superficie: number;
    valor: number;
}

export interface IEvaluacionTipologia {
    id: number;
    tipo: string;
    nombre: string;
    descripcion: string;
    unidad: number;
    superficie: number;
    valor: number;
}