import { UrbanizacionItem } from "./UrbanizacionItem";
import { useState } from "react";
import { Button } from "../ui/button";
import type { IUrbanizacionItem } from "@/interfaces/urbanizacion.interface";

interface UrbanizacionProps {
  urbanizacion: IUrbanizacionItem[];
  onUrbanizacionUpdate?: (data: IUrbanizacionItem[]) => void;
}

const styles = {
  container: "m-0",
  footer: "flex gap-2 justify-center",
  ItemHeader: "flex gap-2 items-center bg-amber-500 p-2",
  title: "sm-text-md sm-bold text-white",
  collapseBtn: "text-white",
};
export const UrbanizacionDetail = ({ urbanizacion, onUrbanizacionUpdate  }: UrbanizacionProps) => {
  const [data, setData] = useState(urbanizacion);

  const handleAddItem = () => {
    const newItem: IUrbanizacionItem = {
      id: -1 - data.length,
      evaluacion_id: -1,
      color: "",
      nombre: "",
      costoItem: 0,
      subItems: [],
    };
    setData([...data, newItem]);
  };

  const handleItemUpdate = (item: IUrbanizacionItem) => {
    const newData = data.map((i) => (i.id === item.id ? item : i));
    setData(newData);
    onUrbanizacionUpdate?.(newData);
  };

  return (
    <div className={styles.container}>
      {data &&
        data.map((item) => (
          <UrbanizacionItem
            key={item.id}
            data={item}
            onItemUpdate={handleItemUpdate}
          />
        ))}
      <div className={styles.footer}>
        <Button
          onClick={handleAddItem}
          className="sm-btn-rounded bg-blue-500 text-white">
          Agregar Urbanizacion
        </Button>
      </div>
    </div>
  );
};
