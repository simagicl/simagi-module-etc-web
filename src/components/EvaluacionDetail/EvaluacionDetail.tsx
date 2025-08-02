import { useEffect, useState } from "react"
import type { IEvaluacion, IEvaluacionItem, IResumenTipologia } from "@/interfaces/evaluacion.interface"
import { Button } from "@/components/ui/button"
import { CardItem } from "./CardItem"
import { EvaluacionItem } from "./Item"
import { BasicInfoForm } from "../Common/BasicInfoForm"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"

import emptySearch from "@/assets/search-empty.png";
import { Tipologias } from "./Tipologias"
import { Loader } from "../Common/Loader"

interface EvaluacionDetailProps {
    evaluacion: IEvaluacion;
    onExit?: () => void;
}

export const EvaluacionDetail = ({ evaluacion, onExit }: EvaluacionDetailProps) => {
    const [evaluacionData, setEvaluacionData] = useState<IEvaluacion>(evaluacion)
    const [tipologias, setTipologias] = useState<IResumenTipologia[]>(evaluacionData.tipologias)
    const [hasChanged, setHasChanged] = useState(false)
    const [loading, setLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        console.log("Cargando evaluacionData", evaluacionData)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [evaluacionData, tipologias])

    const handleSave = () => {
        console.log("evaluacionData", evaluacionData)
        //onExit?.()
        setIsSaving(true)
        setTimeout(() => {
            setIsSaving(false)
        }, 500)
        setHasChanged(false)
    }

    const handleAddItem = () => {
        const newItem: IEvaluacionItem = {
            id: evaluacionData.items.length + 1,
            orden: evaluacionData.items.length + 1,
            identificador: "",
            centroCosto: "",
            unidad: "",
            subItems: []
        }
        setEvaluacionData({
            ...evaluacionData,
            items: [...evaluacionData.items, newItem]
        })
        setHasChanged(true)
    }

    const handleEditItem = (item: IEvaluacionItem) => {
        console.log("editando item", item)
        setHasChanged(true)
    }

    const handleDeleteItem = (itemId: number) => {

        console.log("borrando item", itemId)

        const itemIndex = evaluacionData.items.findIndex((i) => i.id === itemId)
        console.log("itemIndex", itemIndex)

        if (itemIndex !== -1) {
            const newItems = [...evaluacionData.items]
            newItems.splice(itemIndex, 1)
            setEvaluacionData({
                ...evaluacionData,
                items: newItems
            })
            setHasChanged(true)
        }
    }
    
    return (
        <div>
            {loading && ( <Loader />)}
            {!loading && (
                <div className="flex flex-col gap-4">         
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-bold">{evaluacionData.nombre}</h2>
                    </div>
                    <div className="flex gap-4 justify-between flex-wrap">
                        <div className="border border-gray-200 p-2 rounded-lg px-4 w-1/4">
                            <p className="text-lg font-bold">Resumen:</p>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-bold">Superficie Terreno: {evaluacionData.sup_terreno.toLocaleString()} m2</p>
                                <p className="text-sm font-bold">Superficie Construida: {evaluacionData.sup_construida.toLocaleString()} m2</p>
                                <p className="text-sm font-bold">Valor Terreno: {evaluacionData.valor_terreno.toLocaleString()} UF</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <CardItem title="Costo Producción" value="1.234" unit="UF" className="sm-bg-blue-1 text-white font-bold" />  
                            <CardItem title="Precio Venta" value="2.000" unit="UF" className="sm-bg-orange-1 text-white font-bold" />
                            <CardItem title="Déficit" value="0.766" unit="UF" className="sm-bg-green-1 text-white font-bold" />
                            <CardItem title="Margen" value="0.766" unit="UF" className="sm-bg-cyan text-white font-bold" />               
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 bg-gray-100 p-2 rounded-lg shadow-lg">
                        <Tabs defaultValue="datos-basicos" className="w-full">
                            <div className="flex gap-1 justify-between">
                                <TabsList className="flex gap-2">
                                    <TabsTrigger className="bg-blue-300 sm-btn-rounded shadow-lg" value="datos-basicos">Datos Básicos</TabsTrigger>
                                    <TabsTrigger className="bg-orange-300 sm-btn-rounded shadow-lg" value="tipologias">Tipologías</TabsTrigger>
                                    <TabsTrigger className="bg-amber-300 sm-btn-rounded shadow-lg" value="urbanizacion">Urbanización</TabsTrigger>
                                    <TabsTrigger className="bg-green-300 sm-btn-rounded shadow-lg" value="items">Evaluación</TabsTrigger>
                                </TabsList>
                                <div className="flex gap-1">
                                    <Button className="sm-btn-rounded bg-red-400 text-white" onClick={handleSave} disabled={!hasChanged}>{isSaving ? "Guardando..." : "Guardar Evaluación"}</Button>
                                    <Button className="sm-btn-rounded bg-cyan-800 text-white" onClick={onExit}>Volver</Button>
                                </div>
                            </div>

                            <TabsContent value="datos-basicos" className="min-h-96 border border-gray-200 p-2 rounded-lg flex flex-col gap-2">
                                <h2 className="text-xl font-bold">Datos Básicos</h2>
                                <BasicInfoForm formId="evaluacion-detail-form" data={evaluacionData} onSubmit={(formData) => {
                                    console.log(formData)
                                    setHasChanged(true)
                                    setEvaluacionData({
                                        ...evaluacionData,
                                        nombre: formData.get("nombre") as string,
                                        sup_terreno: Number(formData.get("sup_terreno")),
                                        sup_construida: Number(formData.get("sup_construida")),
                                        valor_terreno: Number(formData.get("valor_terreno")),
                                    })
                                    }} />
                                <Button type="submit" form="evaluacion-detail-form" className="sm-bg-green-1 sm-btn-rounded text-white">Guardar cambios</Button>     

                            </TabsContent>

                            <TabsContent value="tipologias" className="min-h-96 border border-gray-200 p-2 rounded-lg flex flex-col gap-2">
                                <h2 className="text-xl font-bold">Tipologías</h2>
                                <Tipologias tipologias={tipologias} onChange={(tipologias) => setTipologias(tipologias)} hasChanged={(hasChanged) => setHasChanged(hasChanged)}/>
                            </TabsContent>

                            <TabsContent value="items" className="min-h-96 border border-gray-200 p-2 rounded-lg">
                                
                                { evaluacionData.items.length > 0 ? (
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-col gap-1">
                                            { evaluacionData.items.map((item, index) => (
                                                <EvaluacionItem key={index} item={item} tipologias={tipologias} handleEditItem={(item) => handleEditItem(item)} handleDeleteItem={(itemId) => handleDeleteItem(itemId)}/>
                                            ))}
                                        </div>  
                                        <Button className="sm-btn-rounded sm-bg-green-1 text-white" onClick={() => handleAddItem()}>Agregar Item</Button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2 items-center justify-center border-1 border-gray-200 p-4 rounded-lg min-h-96">
                                        <img className="w-24 h-24" src={emptySearch} alt="No se encontraron resultados" />
                                        <p className="text-sm text-gray-500">No hay items, agrega al menos uno</p>
                                        <Button className="sm-btn-rounded sm-bg-green-1 text-white" onClick={() => handleAddItem()}>Agregar Item</Button>
                                    </div>
                                )}
                            </TabsContent>
                            <TabsContent value="urbanizacion" className="min-h-96 border border-gray-200 p-2 rounded-lg">
                                <h2 className="text-xl font-bold">Urbanización</h2>
                            </TabsContent>
                        </Tabs>     
                    </div>
                </div>
            )}
        </div>  
    )   
}