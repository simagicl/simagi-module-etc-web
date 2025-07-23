import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { IEvaluacion } from "@/interfaces/evaluacion.interface"

interface EvaluacionModalProps {
    isOpen: boolean;
    mode: "add" | "edit";
    onClose: () => void;
    onSubmit: (formData: FormData) => void;
    data?: IEvaluacion;
  }

export interface EvaluacionModalMode {
    isOpen: boolean;
    mode: "add" | "edit";
    data?: IEvaluacion;
}
  
  export function EvaluacionModal({ isOpen, mode, onClose, onSubmit, data }: EvaluacionModalProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      onSubmit(formData); 
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[425px] bg-white">
            <form id="evaluacion-form" onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>{mode === "edit" ? "Editar evaluación" : "Agregar evaluación"}</DialogTitle>
                    <DialogDescription>
                        Ingrese los datos de la evaluación
                    </DialogDescription>
                </DialogHeader>
                <Input type="hidden" name="id" value={data?.id || 0 }/>
                <div className="grid gap-4 mt-4">
                  <div className="grid gap-3">
                      <Label htmlFor="nombre-1">Nombre</Label>
                      <Input id="nombre-1" name="nombre" placeholder="Evaluación 1" required defaultValue={data?.nombre}/>
                  </div>
                  <div className="grid gap-3">
                      <Label htmlFor="sup_terreno-1">Superficie Terreno [m2]</Label>
                      <Input id="sup_terreno-1" name="sup_terreno" type="number" placeholder="100.0" required defaultValue={data?.sup_terreno}/>
                  </div>
                  <div className="grid gap-3">
                      <Label htmlFor="sup_construida-1">Superficie Construida [m2]</Label>
                      <Input id="sup_construida-1" name="sup_construida" type="number" placeholder="50.0" required defaultValue={data?.sup_construida}/>
                  </div>
                  <div className="grid gap-3">
                      <Label htmlFor="valor_terreno-1">Valor Terreno [UF]</Label>
                      <Input id="valor_terreno-1" name="valor_terreno" type="number" placeholder="100000" required defaultValue={data?.valor_terreno}/>
                  </div>
                </div>
                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <Button variant="outline">Cancelar</Button>
                  </DialogClose>
                  <Button type="submit" form="evaluacion-form">Guardar</Button>     
                </DialogFooter>
            </form>
          </DialogContent>  
      </Dialog>
    );
  }
