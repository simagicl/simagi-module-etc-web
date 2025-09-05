import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
  } from "@/components/ui/dialog"
  import type { IEvaluacionTipologia } from "@/interfaces/tipologia.interface"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  
  interface TipologiaModalProps {
      isOpen: boolean;
      mode: "add" | "edit";
      onClose: () => void;
      onSubmit?: (formData: FormData) => void;
      data?: IEvaluacionTipologia | null;
    }
  
  export interface TipologiaModalMode {
      isOpen: boolean;
      mode: "add" | "edit";
      data?: IEvaluacionTipologia;
  }
    
    export function TipologiaModal({ isOpen, mode, onClose, onSubmit, data }: TipologiaModalProps) {
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
                <DialogTitle>{mode === "edit" ? "Editar tipología" : "Agregar tipología"}</DialogTitle>
                <DialogDescription>
                    Ingrese los datos de la tipología
                </DialogDescription>
                </DialogHeader>

                <form id="tipologia-modal-form" onSubmit={handleSubmit}>
                    <Input type="hidden" name="id" value={data?.id || 0 }/>
                    <div className="grid gap-4 mt-4">
                        <div className="grid gap-3">
                            <Label htmlFor="nombre-1">Nombre</Label>
                            <Input id="nombre-1" name="nombre" className="border border-gray-300" placeholder="Evaluación 1" required defaultValue={data?.nombre}/>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="cantidad-1">Cantidad</Label>
                            <Input id="cantidad-1" name="unidad" type="number" className="border border-gray-300" placeholder="100.0" required defaultValue={data?.unidad}/>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="superficie-1">Superficie [m2]</Label>
                            <Input id="superficie-1" name="superficie" type="number" className="border border-gray-300" placeholder="50.0" required defaultValue={data?.superficie}/>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="valor-1">Valor [UF]</Label>
                            <Input id="valor-1" name="valor" type="number" className="border border-gray-300" placeholder="100000" required defaultValue={data?.valor}/>
                        </div>
                    </div>
                </form>
              
                <DialogFooter>
                <DialogClose asChild>
                    <Button className="sm-btn-rounded sm-bg-red-1 text-white">Cancelar</Button>
                </DialogClose>
                <Button type="submit" form="tipologia-modal-form" className="sm-bg-green-1 sm-btn-rounded text-white">{mode === "edit" ? "Actualizar" : "Guardar"}</Button>     
                </DialogFooter>
            </DialogContent>    
        </Dialog>
      );
    }
  