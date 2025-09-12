export type IUrbanizacionItem = {
    id: number,
    evaluacion_id: number,
    color: string,
    nombre: string,
    costoItem: number,
    subItems: IUrbanizacionDetail[]
}

export interface BaseRow {
  id: number;
}

export type IUrbanizacionDetail = {
    id: number,
    urbanizacion_id: number,
    nombre: string,
    referencia: string,
    cubicacion:  number,
    costoUnitario: number,
    total: number    
}