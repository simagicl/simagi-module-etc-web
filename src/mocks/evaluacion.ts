import type { IEvaluacion } from "@/interfaces/evaluacion.interface"

export const evaluacionMock: IEvaluacion = {
    id: 1,
    nombre: "Evaluacion 1",
    proceso_id: 1,
    sup_terreno: 100,
    sup_construida: 50,
    valor_terreno: 100000,
    tipologias: [
        {
            id: 1,
            nombre: "Tipologia 1",
            cantidad: 1,
            superficie: 1,
            valor: 1,
        },
        {
            id: 2,
            nombre: "Tipologia 2",
            cantidad: 2,
            superficie: 2,
            valor: 2,
        },
    ], 
    items: [
        {
            id: 1,
            orden: 1,
            identificador: "A",
            centroCosto: "Centro Costo 1",
            unidad: "m2",            
            subItems: [
                {
                    id: 1,
                    orden: 1,
                    nombre: "Sub Item 1",
                    unidad: "Sub Item 1",
                    tipologias: [
                        {
                            id: 1,
                            nombre: "Tipologia 1",
                            descripcion: "Tipologia 1",     
                            unidades: 1,
                            superficie: 1,
                            valor: 1,
                        },
                        {
                            id: 2,
                            nombre: "Tipologia 2",
                            descripcion: "Tipologia 2",
                            unidades: 2,
                            superficie: 2,
                            valor: 2,
                        },
                    ],
                },
                {
                    id: 2,
                    orden: 2,
                    nombre: "Sub Item 2",
                    unidad: "Sub Item 2",
                    tipologias: [
                        {
                            id: 1,
                            nombre: "Tipologia 1",
                            descripcion: "Tipologia 1",     
                            unidades: 1,
                            superficie: 1,
                            valor: 1,
                        },
                        {
                            id: 2,
                            nombre: "Tipologia 2",
                            descripcion: "Tipologia 2",
                            unidades: 2,
                            superficie: 2,
                            valor: 2,
                        },
                    ],
                },
            ]
        },
        {
            id: 2,
            orden: 2,
            identificador: "B",
            centroCosto: "Centro Costo 2",
            unidad: "m2",
            subItems: [
                {
                    id: 1,
                    orden: 1,
                    nombre: "Sub Item 1",
                    unidad: "Sub Item 1",
                    tipologias: [
                        {
                            id: 1,
                            nombre: "Tipologia 1",
                            descripcion: "Tipologia 1",     
                            unidades: 1,
                            superficie: 1,
                            valor: 1,
                        },
                        {
                            id: 2,
                            nombre: "Tipologia 2",
                            descripcion: "Tipologia 2",
                            unidades: 2,
                            superficie: 2,
                            valor: 2,
                        },
                    ],
                },
                {
                    id: 2,
                    orden: 2,
                    nombre: "Sub Item 2",
                    unidad: "Sub Item 2",
                    tipologias: [
                        {
                            id: 1,
                            nombre: "Tipologia 1",
                            descripcion: "Tipologia 1",     
                            unidades: 1,
                            superficie: 1,
                            valor: 1,
                        },
                        {
                            id: 2,
                            nombre: "Tipologia 2",
                            descripcion: "Tipologia 2",
                            unidades: 2,
                            superficie: 2,
                            valor: 2,
                        },
                    ],
                },
            ]
        }
    ]
}