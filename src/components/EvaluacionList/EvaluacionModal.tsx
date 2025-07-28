import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import type { IEvaluacion } from "@/interfaces/evaluacion.interface"
import { BasicInfoForm } from "../Common/BasicInfoForm"
import { Button } from "@/components/ui/button"

interface EvaluacionModalProps {
    isOpen: boolean;
    mode: "add" | "edit";
    onClose: () => void;
    onSubmit?: (formData: FormData) => void;
    data?: IEvaluacion | null;
  }

export interface EvaluacionModalMode {
    isOpen: boolean;
    mode: "add" | "edit";
    data?: IEvaluacion;
}
  
  export function EvaluacionModal({ isOpen, mode, onClose, onSubmit, data }: EvaluacionModalProps) {
    const handleSubmit = (formData: FormData) => {
      onSubmit?.(formData); 
      onClose();
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
              <DialogTitle>{mode === "edit" ? "Editar evaluación" : "Agregar evaluación"}</DialogTitle>
              <DialogDescription>
                  Ingrese los datos de la evaluación
              </DialogDescription>
            </DialogHeader>
            <BasicInfoForm formId="evaluacion-modal-form" data={data} onSubmit={handleSubmit} />
            <DialogFooter>
              <DialogClose asChild>
                <Button className="sm-btn-rounded sm-bg-red-1 text-white">Cancelar</Button>
              </DialogClose>
              <Button type="submit" form="evaluacion-modal-form" className="sm-bg-green-1 sm-btn-rounded text-white">{mode === "edit" ? "Actualizar" : "Guardar"}</Button>     
            </DialogFooter>
          </DialogContent>  
      </Dialog>
    );
  }
