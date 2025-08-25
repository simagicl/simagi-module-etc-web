import type { IUrbanizacionItem } from "@/interfaces/urbanizacion.interface"


export const urbanizacionMock: IUrbanizacionItem[] = [
    {
        id: 1,
        evaluacion_id: 1,
        color: "red",
        nombre: "Urbanización",
        items: [
            {
                id: 1,
                urbanizacion_id: 1,
                nombre: "Pavimentación",
                referencia: "1,5 a 2,5UF/m2",
                cubicacion: 100,
                costoUnitario: 100,
                total: 10000
            },
            {
                id: 2,
                urbanizacion_id: 1,
                nombre: "Aguas lluvias",
                referencia: "1,5 a 2,5UF/m2",
                cubicacion: 200,
                costoUnitario: 100,
                total: 20000
            }
        ]
    },
    {
        id: 2,
        evaluacion_id: 1,
        color: "blue",
        nombre: "Habilitación",
        items: [
            {
                id: 1,
                urbanizacion_id: 1,
                nombre: "Excavación",
                referencia: "1,5 a 2,5UF/m2",
                cubicacion: 100,
                costoUnitario: 100,
                total: 10000
            },
            {
                id: 2,
                urbanizacion_id: 1,
                nombre: "Relleno",
                referencia: "1,5 a 2,5UF/m2",
                cubicacion: 200,
                costoUnitario: 100,
                total: 20000
            }
        ]
    }
]