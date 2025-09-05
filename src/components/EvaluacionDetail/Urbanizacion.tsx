import { urbanizacionMock } from "@/mocks/urbanizacion.mock";
import { UrbanizacionItem } from "./UrbanizacionItem";
import { useState } from "react";
import { Button } from "../ui/button";
import type { IUrbanizacionItem } from "@/interfaces/urbanizacion.interface";

interface UrbanizacionProps {
  urbanizacion: IUrbanizacionItem[];
}

const styles = {
  container: "m-0",
  footer: "flex gap-2 justify-center",
  ItemHeader: "flex gap-2 items-center bg-amber-500 p-2",
  title: "sm-text-md sm-bold text-white",
  collapseBtn: "text-white",
};
export const UrbanizacionDetail = ({urbanizacion}: UrbanizacionProps) => {
  const [data, setData] = useState(urbanizacion);

  console.log("UrbanizacionDetail", data);

  const handleAddItem = () => {
    console.log("handleAddItem");
  };

  return (
    <div className={styles.container}>
      {data && data.map((item) => (
        <UrbanizacionItem key={item.id} data={item} />
      ))}
      <div className={styles.footer}>
        <Button
          onClick={handleAddItem}
          className="sm-btn-rounded sm-bg-green-1 text-white"
        >
          Agregar Urbanizacion
        </Button>
      </div>
    </div>
  );
};
