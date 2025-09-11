import { UrbaTable } from "./UrbanizacionTable";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CollapseBtn } from "@/components/Common/CollapseBtn";
import type {
    IUrbanizacionDetail,
    IUrbanizacionItem,
} from "@/interfaces/urbanizacion.interface";
import { Button } from "../ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { UrbanizacionModal } from "./UrbanizacionModal";

const styles = {
    container: "mx-0 my-2",
    ItemHeader:
        "flex gap-2 bg-sm-blue p-2 justify-between items-center [&>div>Button]:text-white",
    headerTitle: "flex items-center gap-2",
    title: "sm-text-md sm-bold text-white",
    itemTotal: "bg-blue-400 p-1 rounded-sm text-sm text-white",
    collapseBtn: "text-white bg-transparent hover:bg-blue-400",
    duration: 0.2,
};

export type UrbanizacionItemProps = {
    data: IUrbanizacionItem;
    onItemUpdate?: (data: IUrbanizacionItem) => void;
};

export const UrbanizacionItem = (props: UrbanizacionItemProps) => {
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [totalItem, setTotalItem] = useState(0);
    const [itemData, setItemData] = useState<IUrbanizacionItem>(props.data);

    useEffect(() => {
        const total = itemData.subItems.reduce(
            (acc, subItem) => acc + subItem.total,
            0
        );
        setTotalItem(total || 0);
    }, [itemData.subItems]);

    const handleEditItem = (data: FormData) => {
        const updated = {
            ...itemData,
            nombre: data.get("nombre") as string,
        };
        setItemData(updated);
        props.onItemUpdate?.(updated);
    };

    const handleAddSubitem = () => {
        const newSubItem: IUrbanizacionDetail = {
            id: -1 - itemData.subItems.length,
            urbanizacion_id: itemData.id,
            nombre: "Nuevo Subitem",
            referencia: "",
            cubicacion: 0,
            costoUnitario: 0,
            total: 0,
        };
        const newData = {
            ...itemData,
            subItems: [...itemData.subItems, newSubItem],
        };
        setItemData(newData);
        props.onItemUpdate?.(newData);
    };

    const onCellUpdate = (
        id: number,
        key: keyof IUrbanizacionDetail,
        value: string
    ) => {
        const updatedSubItems = itemData.subItems.map((subItem) => {
            if (subItem.id === id) {
                return {
                    ...subItem,
                    [key]: value,
                };
            }
            return subItem;
        });
        const newData = {
            ...itemData,
            subItems: updatedSubItems,
        };
        setItemData(newData);
        props.onItemUpdate?.(newData);
        setTotalItem(totalItem);
    };

    return (
        <div className={styles.container}>
            <UrbanizacionModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                data={itemData}
                onSubmit={handleEditItem}
            />

            <div className={styles.ItemHeader}>
                <div className={styles.headerTitle}>
                    <CollapseBtn
                        className={styles.collapseBtn}
                        open={open}
                        onClick={() => setOpen(!open)}
                    />
                    <h2 className={styles.title}>{itemData.nombre}</h2>
                </div>
                <div className="flex gap-4 items-center">
                    <div>
                        <h2 className={styles.itemTotal}>
                            UF$: {totalItem.toLocaleString()}
                        </h2>
                    </div>
                    <div>
                        <Button
                            className="bg-transparent"
                            onClick={() => setModalOpen(true)}>
                            <PencilIcon className="h-2 w-2" />
                        </Button>
                        <Button
                            className="bg-transparent"
                            onClick={() => setModalOpen(true)}>
                            <TrashIcon className="h-2 w-2" />
                        </Button>
                    </div>
                </div>
            </div>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        id="scale-content"
                        key="content"
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        exit={{ scaleY: 0, opacity: 0 }}
                        transition={{
                            duration: styles.duration,
                            ease: "easeInOut",
                        }}
                        className="origin-top overflow-hidden">
                        <UrbaTable
                            data={itemData.subItems}
                            onCellUpdate={onCellUpdate}
                            handleAdd={handleAddSubitem}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
