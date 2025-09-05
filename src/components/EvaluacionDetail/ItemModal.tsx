import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import type { IEvaluacionItem } from "@/interfaces/item.interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (formData: IEvaluacionItem) => void;
  data?: IEvaluacionItem | null;
}

export function ItemModal({ isOpen, onClose, onSubmit, data }: ItemModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.currentTarget))
    const item: IEvaluacionItem = {
      ...form,
      id: Number(form.id),
      orden: Number(form.orden),
      identificador: form.identificador as string,
      centroCosto: form.centroCosto as string,
      unidad: form.unidad as string,
      subItems: data?.subItems || [],
      itemTotal: data?.itemTotal || 0
    };
    if (!onSubmit) return;
    onSubmit(item);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>{"Editar item"}</DialogTitle>
          <DialogDescription>Ingrese los datos del item</DialogDescription>
        </DialogHeader>

        <form id="item-modal-form" onSubmit={handleSubmit}>
          <Input type="hidden" name="id" value={data?.id || 0} />
          <div className="grid gap-4 mt-4">
            <div className="grid gap-3">
              <Label htmlFor="identificador-1">Identificador</Label>
              <Input
                id="identificador-1"
                name="identificador"
                className="border border-gray-300"
                placeholder="Identificador"
                required
                defaultValue={data?.identificador}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="centroCosto-1">Centro de costo</Label>
              <Input
                id="centroCosto-1"
                name="centroCosto"
                type="text"
                className="border border-gray-300"
                placeholder="Centro de costo"
                required
                defaultValue={data?.centroCosto}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="unidad-1">Unidad</Label>
              <Input
                id="unidad-1"
                name="unidad"
                type="text"
                className="border border-gray-300"
                placeholder="Unidad"
                required
                defaultValue={data?.unidad}
              />
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button
            type="submit"
            form="item-modal-form"
            className="sm-bg-green-1 sm-btn-rounded text-white"
          >
            Actualizar
          </Button>
          <DialogClose asChild>
            <Button className="sm-btn-rounded bg-red-400 text-white">
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
