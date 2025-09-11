import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SaveIcon } from "lucide-react";

type ModalData = {
  id: number;
  nombre: string;
};

interface UrbanizacionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (formData: FormData) => void;
  data?: ModalData | null;
}

export function UrbanizacionModal({
  isOpen,
  onClose,
  onSubmit,
  data,
}: UrbanizacionModalProps) {
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
          <DialogTitle>"Editar Urbanización"</DialogTitle>
          <DialogDescription>
            Ingrese los datos de la Urbanización
          </DialogDescription>
        </DialogHeader>

        <form id="tipologia-modal-form" onSubmit={handleSubmit}>
          <Input type="hidden" name="id" value={data?.id || 0} />
          <div className="grid gap-4 mt-4">
            <div className="grid gap-3">
              <Label htmlFor="nombre-1">Nombre</Label>
              <Input
                id="nombre-1"
                name="nombre"
                className="border border-gray-300"
                placeholder="Evaluación 1"
                required
                defaultValue={data?.nombre || ""}
              />
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
            form="tipologia-modal-form"
            className="sm-bg-green-1 sm-btn-rounded text-white">
            <SaveIcon className="mr-2 h-4 w-4" />
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
