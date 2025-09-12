import { useEffect, useState } from "react";
import type { IEvaluacion } from "@/interfaces/evaluacion.interface";
import type { IEvaluacionItem } from "@/interfaces/item.interface";
import type { IEvaluacionTipologia } from "@/interfaces/tipologia.interface";
import { Button } from "@/components/ui/button";
import { CardItem } from "./CardItem";
import { EvaluacionItem } from "./Item";
import { BasicInfoForm } from "../Common/BasicInfoForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import emptySearch from "@/assets/search-empty.png";
import { Tipologias } from "./Tipologias";
import { Loader } from "../Common/Loader";
import { ComponentMock } from "../Common/ComponentMock";
import { SaveIcon, TriangleAlertIcon } from "lucide-react";
import {
  getEvaluacionById,
  UpdateEvaluacionBasicInfo,
  UpdateEvaluacionTipologias,
} from "@/services/evaluaciones.service";

import { UpdateEvaluacionItems } from "@/services/items.service";
import { calcSuperficieConstruida } from "./utils";
import { UrbanizacionDetail } from "./Urbanizacion";
import type { IUrbanizacionItem } from "@/interfaces/urbanizacion.interface";

interface EvaluacionDetailProps {
  evaluacionId: number;
  onExit?: () => void;
}

export const EvaluacionDetail = ({
  evaluacionId,
  onExit,
}: EvaluacionDetailProps) => {
  const [evaluacionData, setEvaluacionData] = useState<IEvaluacion>(
    {} as IEvaluacion
  );
  const [tipologias, setTipologias] = useState<IEvaluacionTipologia[]>([]);
  const [hasChanged, setHasChanged] = useState(false);
  const [unsaved, setUnsaved] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getEvaluacionDataAsync();
  }, []);

  const getEvaluacionDataAsync = async () => {
    const evaluacion = await getEvaluacionById(evaluacionId);
    if (evaluacion) {
      setEvaluacionData(evaluacion);
      setTipologias(evaluacion.tipologias);
      setLoading(false);
      console.log("EVALUACION LOAD: ", evaluacion);
    }
  };

  const handleSaveBasicInfo = async (formData: FormData) => {
    setIsSaving(true);
    const evaluacion = {
      id: evaluacionId,
      nombre: formData.get("nombre") as string,
      supTerreno: Number(formData.get("sup_terreno")),
      supConstruida: Number(formData.get("sup_construida")),
      valorTerreno: Number(formData.get("valor_terreno")),
    };
    const evaluacionUpdated = await UpdateEvaluacionBasicInfo(evaluacion);
    if (evaluacionUpdated) {
      setEvaluacionData(evaluacionUpdated);
      setIsSaving(false);
      popPendingChanges("basic-info");
    }
  };

  const handleSaveTipologias = async (tipologias: IEvaluacionTipologia[]) => {
    setIsSaving(true);
    let tipologiasUpdated = await UpdateEvaluacionTipologias(
      evaluacionId,
      tipologias
    );
    if (tipologiasUpdated) {
      setTipologias(tipologiasUpdated);
      setEvaluacionData({
        ...evaluacionData,
        tipologias: tipologiasUpdated,
        supConstruida: calcSuperficieConstruida(tipologiasUpdated),
      })
      setIsSaving(false);
      popPendingChanges("tipologias");
    }
  };

  const handleSaveEvaluacionItems = async (items: IEvaluacionItem[]) => {
    console.log("Saving Items: ", items);
    setIsSaving(true);
    let savedItems = await UpdateEvaluacionItems(evaluacionId, items);
    console.log("Saved Items: ", savedItems);
    if (savedItems) {
      setEvaluacionData({
        ...evaluacionData,
        items: savedItems,
      });
      setIsSaving(false);
      popPendingChanges("items");
      console.log("Saved Items: ", savedItems);
    }
  };

  const handleSaveUrbanizacion = () => {
    setIsSaving(true);
    popPendingChanges("urbanizacion");
    setTimeout(() => {
      setIsSaving(false);
    }, 500);
    setHasChanged(false);
  };

  const handleUpdateUrbanizacion = ( data: IUrbanizacionItem[]) => {
    setEvaluacionData({
      ...evaluacionData,
      urbanizacionItems: data  
    })
    pushPendingChanges("urbanizacion");
  };

  const handleAddItem = () => {
    const newItem: IEvaluacionItem = {
      id: -1 - evaluacionData.items.length,
      orden: evaluacionData.items.length + 1,
      identificador: "",
      centroCosto: "",
      unidad: "",
      itemTotal: 0,
      subItems: [],
    };
    setEvaluacionData({
      ...evaluacionData,
      items: [...evaluacionData.items, newItem],
    });
    pushPendingChanges("items");
  };

  const handleEditItem = (item: IEvaluacionItem) => {
    console.log("editando item", item);
    pushPendingChanges("items");
  };

  const handleDeleteItem = (itemId: number) => {
    console.log("borrando item", itemId);

    const itemIndex = evaluacionData.items.findIndex((i) => i.id === itemId);
    console.log("itemIndex", itemIndex);

    if (itemIndex !== -1) {
      const newItems = [...evaluacionData.items];
      newItems.splice(itemIndex, 1);
      setEvaluacionData({
        ...evaluacionData,
        items: newItems,
      });
      pushPendingChanges("items");
    }
  };

  const pushPendingChanges = (name: string) => {
    setHasChanged(true);
    if (unsaved.includes(name)) return;
    const newUnsaved = [...unsaved, name];
    setUnsaved(newUnsaved);
    console.log("PendingChanges", newUnsaved);
  };

  const popPendingChanges = (name: string) => {
    let pending = unsaved.filter((item) => item !== name);
    setUnsaved(pending);
    if (pending.length === 0) setHasChanged(false);
    console.log("PendingChanges", pending);
  };

  const hasPendingChanges = (name: string) => {
    return unsaved.includes(name);
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          {loading ? (
            <ComponentMock className="w-1/8 min-h-4" />
          ) : (
            <h2 className="text-2xl font-bold">{evaluacionData.nombre}</h2>
          )}
          <div className="flex gap-2 items-center">
            {hasChanged && (
              <>
                <TriangleAlertIcon className="h-6 w-6 text-yellow-500" />
                <p className="text-xs text-center w-24 text-yellow-500">
                  Hay cambios sin guardar
                </p>
              </>
            )}
            {loading ? (
              <Loader />
            ) : (
              <Button
                className="sm-btn-rounded bg-cyan-800 text-white"
                onClick={onExit}
              >
                Volver
              </Button>
            )}
          </div>
        </div>
        <div className="flex gap-4 justify-between flex-wrap">
          {loading ? (
            <ComponentMock className="w-1/4 min-h-32" />
          ) : (
            <div className="border border-gray-200 p-2 rounded-lg px-4 w-1/4">
              <p className="text-lg font-bold">Resumen:</p>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-bold">
                  Superficie Terreno:{" "}
                  {evaluacionData.supTerreno
                    ? evaluacionData.supTerreno.toLocaleString()
                    : 0}{" "}
                  m2
                </p>
                <p className="text-sm font-bold">
                  Superficie Construida:{" "}
                  {evaluacionData.supConstruida
                    ? evaluacionData.supConstruida.toLocaleString()
                    : 0}{" "}
                  m2
                </p>
                <p className="text-sm font-bold">
                  Valor Terreno:{" "}
                  {evaluacionData.valorTerreno
                    ? evaluacionData.valorTerreno.toLocaleString()
                    : 0}{" "}
                  UF
                </p>
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-4">
            {loading ? (
              <ComponentMock className="w-32  min-h-16" />
            ) : (
              <CardItem
                title="Costo Producción"
                value="1.234"
                unit="UF"
                className="sm-bg-blue-1 text-white font-bold"
              />
            )}
            {loading ? (
              <ComponentMock className="w-32 min-h-16" />
            ) : (
              <CardItem
                title="Precio Venta"
                value="2.000"
                unit="UF"
                className="sm-bg-orange-1 text-white font-bold"
              />
            )}
            {loading ? (
              <ComponentMock className="w-32 min-h-16" />
            ) : (
              <CardItem
                title="Déficit"
                value="0.766"
                unit="UF"
                className="sm-bg-green-1 text-white font-bold"
              />
            )}
            {loading ? (
              <ComponentMock className="w-32 min-h-16" />
            ) : (
              <CardItem
                title="Margen"
                value="0.766"
                unit="UF"
                className="sm-bg-cyan text-white font-bold"
              />
            )}
          </div>
        </div>

        {loading ? (
          <ComponentMock className="min-h-96" />
        ) : (
          <div className="flex flex-col gap-1 bg-gray-100 p-2 rounded-lg shadow-lg">
            <Tabs defaultValue="datos-basicos" className="w-full">
              <div className="flex gap-1 justify-between">
                <TabsList className="flex gap-2">
                  <TabsTrigger
                    className="bg-blue-300 sm-btn-rounded shadow-lg"
                    value="datos-basicos"
                  >
                    Datos Básicos
                  </TabsTrigger>
                  <TabsTrigger
                    className="bg-orange-300 sm-btn-rounded shadow-lg"
                    value="tipologias"
                  >
                    Tipologías
                  </TabsTrigger>
                  <TabsTrigger
                    className="bg-amber-300 sm-btn-rounded shadow-lg"
                    value="urbanizacion"
                  >
                    Urbanización
                  </TabsTrigger>
                  <TabsTrigger
                    className="bg-green-300 sm-btn-rounded shadow-lg"
                    value="items"
                  >
                    Evaluación
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent
                value="datos-basicos"
                className="min-h-96 border border-gray-200 p-2 rounded-lg flex flex-col gap-2"
              >
                <div className="flex justify-between">
                  <h2 className="text-xl font-bold">Datos Básicos</h2>
                  <Button
                    className="sm-btn-rounded bg-red-400 text-white"
                    disabled={!hasPendingChanges("basic-info")}
                    type="submit"
                    form="evaluacion-detail-form"
                  >
                    <SaveIcon className="h-4 w-4" />
                    {isSaving ? (
                      <Loader size="sm" color="white" noText />
                    ) : (
                      "Guardar"
                    )}
                  </Button>
                </div>
                <BasicInfoForm
                  formId="evaluacion-detail-form"
                  data={evaluacionData}
                  onSubmit={handleSaveBasicInfo}
                  onChange={() => pushPendingChanges("basic-info")}
                />
              </TabsContent>

              <TabsContent
                value="tipologias"
                className="min-h-96 border border-gray-200 p-2 rounded-lg flex flex-col gap-2"
              >
                <div className="flex justify-between">
                  <h2 className="text-xl font-bold">Tipologías</h2>
                  <Button
                    className="sm-btn-rounded bg-red-400 text-white"
                    disabled={!hasPendingChanges("tipologias")}
                    onClick={() => handleSaveTipologias(tipologias)}
                  >
                    <SaveIcon className="h-4 w-4" />
                    {isSaving ? (
                      <Loader size="sm" color="white" noText />
                    ) : (
                      "Guardar"
                    )}
                  </Button>
                </div>
                <Tipologias
                  tipologias={tipologias}
                  onChange={(tipologias) => setTipologias(tipologias)}
                  hasChanged={(hasChanged) => pushPendingChanges("tipologias")}
                />
              </TabsContent>

              <TabsContent
                value="items"
                className="min-h-96 border border-gray-200 p-2 rounded-lg flex flex-col gap-2"
              >
                <div className="flex justify-between">
                  <h2 className="text-xl font-bold">Evaluación</h2>
                  <Button
                    className="sm-btn-rounded bg-red-400 text-white"
                    disabled={!hasPendingChanges("items")}
                    onClick={() =>
                      handleSaveEvaluacionItems(evaluacionData.items)
                    }
                  >
                    <SaveIcon className="h-4 w-4" />
                    {isSaving ? (
                      <Loader size="sm" color="white" noText />
                    ) : (
                      "Guardar"
                    )}
                  </Button>
                </div>
                {evaluacionData.items?.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      {evaluacionData.items?.map((item, index) => (
                        <EvaluacionItem
                          key={index}
                          item={item}
                          tipologias={tipologias}
                          handleEditItem={(item) => handleEditItem(item)}
                          handleDeleteItem={(itemId) =>
                            handleDeleteItem(itemId)
                          }
                        />
                      ))}
                    </div>
                    <Button
                      className="sm-btn-rounded sm-bg-green-1 text-white"
                      onClick={() => handleAddItem()}
                    >
                      Agregar Item
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 items-center justify-center border-1 border-gray-200 p-4 rounded-lg min-h-96">
                    <img
                      className="w-24 h-24"
                      src={emptySearch}
                      alt="No se encontraron resultados"
                    />
                    <p className="text-sm text-gray-500">
                      No hay items, agrega al menos uno
                    </p>
                    <Button
                      className="sm-btn-rounded sm-bg-green-1 text-white"
                      onClick={() => handleAddItem()}
                    >
                      Agregar Item
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent
                value="urbanizacion"
                className="min-h-96 border border-gray-200 p-2 rounded-lg"
              >
                <div className="flex justify-between">
                  <h2 className="text-xl font-bold">Urbanización</h2>
                  <Button
                    className="sm-btn-rounded bg-red-400 text-white"
                    disabled={!hasPendingChanges("urbanizacion")}
                    onClick={() => handleSaveUrbanizacion()}
                  >
                    <SaveIcon className="h-4 w-4" />
                    {isSaving ? (
                      <Loader size="sm" color="white" noText />
                    ) : (
                      "Guardar"
                    )}
                  </Button>
                </div>
                <UrbanizacionDetail 
                urbanizacion={evaluacionData.urbanizacionItems} 
                onUrbanizacionUpdate={handleUpdateUrbanizacion} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};
