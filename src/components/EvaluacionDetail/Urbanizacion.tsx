import { urbanizacionMock } from "@/mocks/urbanizacion.mock"
import { UrbanizacionItem } from "./UrbanizacionItem";
import { useState } from "react";
import { Button } from "../ui/button";

const styles = {
    container: "m-0",
    footer: "flex gap-2 justify-center",
    ItemHeader: "flex gap-2 items-center bg-amber-500 p-2",
    title: "sm-text-md sm-bold text-white",  
    collapseBtn: "text-white", 
}
export const UrbanizacionDetail = () => {
    const [data, setData] = useState(urbanizacionMock)
    
    return (
        <div className={styles.container}>
            {data.map((urbanizacion) => (
                <UrbanizacionItem 
                key={urbanizacion.id} 
                data={urbanizacion}
                />
            ))}
            <div className={styles.footer}>
                <Button className="sm-btn-rounded sm-bg-green-1 text-white">Agregar Urbanizacion</Button>
            </div>
        </div>
    )
}
