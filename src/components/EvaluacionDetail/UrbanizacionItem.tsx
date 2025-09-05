import { UrbaTable } from "./UrbanizacionTable"
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CollapseBtn } from "@/components/Common/CollapseBtn";
import type { IUrbanizacionItem } from "@/interfaces/urbanizacion.interface";


const styles = {
    container: "mx-0 my-2",
    ItemHeader: "flex gap-2 items-center bg-amber-500 p-2",
    title: "sm-text-md sm-bold text-white",  
    collapseBtn: "text-white",
    duration: 0.25 
}

export type UrbanizacionItemProps = {
    data: IUrbanizacionItem
}

export const UrbanizacionItem = (props: UrbanizacionItemProps) => {
    const [open, setOpen] = useState(false);
    console.log("UrbanizacionItem -> Subitems", props.data.subItems);
    return (
        <div className={styles.container}>
            <div className={styles.ItemHeader}>
                <CollapseBtn className={styles.collapseBtn} open={open} onClick={() => setOpen(!open)}/>
                <h2 className={styles.title}>
                    {props.data.nombre}
                </h2>            
            </div>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        id="scale-content"
                        key="content"
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        exit={{ scaleY: 0, opacity: 0 }}
                        transition={{ duration: styles.duration, ease: "easeInOut" }}
                        className="origin-top overflow-hidden"
                    >
                        <UrbaTable data={props.data.subItems}/>
                    </motion.div>
                )}
            </AnimatePresence>        
        </div>
    )
}
