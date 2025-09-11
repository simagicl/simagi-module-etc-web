import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SaveIcon } from "lucide-react";
import type { IUrbanizacionDetail } from "@/interfaces/urbanizacion.interface";

interface UrbSubitemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (formData: FormData) => void;
    data?: IUrbanizacionDetail | null;
}

export function UrbsubitemModal({
    isOpen,
    onClose,
    onSubmit,
    data,
}: UrbSubitemModalProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (!onSubmit) return;
        onSubmit(formData);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>"Editar Subitem"</DialogTitle>
                    <DialogDescription>
                        Ingrese los datos de la Urbanización
                    </DialogDescription>
                </DialogHeader>

                <form id="subitem-modal-form" onSubmit={handleSubmit}>
                    <Input type="hidden" name="id" value={data?.id || 0} />
                    <div className="grid gap-4 mt-4">
                        <div className="grid gap-3">
                            <Label htmlFor="nombre-subitem">Descripción</Label>
                            <Input
                                id="nombre-subitem"
                                name="nombre"
                                className="border border-gray-300"
                                placeholder="Evaluación 1"
                                required
                                defaultValue={data?.nombre || ""}
                            />
                        </div>
                        <div>
                            <Label htmlFor="referencia">Referencia</Label>
                            <Select name="referencia">
                                <SelectTrigger className="w-[180px] border border-gray-300">
                                    <SelectValue placeholder="Seleccione" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-50 border-gray-300">
                                    <SelectItem value="light">
                                        0,2 - 0,3
                                    </SelectItem>
                                    <SelectItem value="dark">
                                        0,5 - 1,0
                                    </SelectItem>
                                    <SelectItem value="system">
                                        1,0 - 1,5
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="cubicacion">Cubicación</Label>
                            <Input
                                id="cubicacion"
                                name="cubicacion"
                                type="number"
                                className="border border-gray-300"></Input>
                        </div>
                        <div>
                            <Label htmlFor="costounit">Costo Unitario</Label>
                            <Input
                                id="costounit"
                                name="costounit"
                                type="number"
                                className="border border-gray-300"></Input>
                        </div>
                    </div>
                </form>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="sm-btn-rounded sm-bg-red-1 text-white">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button
                        type="submit"
                        form="subitem-modal-form"
                        className="sm-bg-green-1 sm-btn-rounded text-white">
                        <SaveIcon className="mr-2 h-4 w-4" />
                        Guardar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
