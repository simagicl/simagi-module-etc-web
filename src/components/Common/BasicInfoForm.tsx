import { Input } from "../ui/input"
import { Label } from "../ui/label"
import type { IEvaluacion } from "@/interfaces/evaluacion.interface"

interface BasicInfoFormProps {
    formId?: string;
    data?: IEvaluacion | null;
    onSubmit?: (formData: FormData) => void;
}

export const BasicInfoForm = ({ formId = "basic-info-form", data, onSubmit }: BasicInfoFormProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (!onSubmit) return;
        onSubmit(formData); 
    };
    return (
        <form id={formId} onSubmit={handleSubmit}>
            <Input type="hidden" name="id" value={data?.id || 0 }/>
            <div className="grid gap-4 mt-4">
                <div className="grid gap-3">
                    <Label htmlFor="nombre-1">Nombre</Label>
                    <Input id="nombre-1" name="nombre" className="border border-gray-300" placeholder="Evaluación 1" required defaultValue={data?.nombre}/>
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="sup_terreno-1">Superficie Terreno [m2]</Label>
                    <Input id="sup_terreno-1" name="sup_terreno" type="number" className="border border-gray-300" placeholder="100.0" required defaultValue={data?.sup_terreno}/>
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="sup_construida-1">Superficie Construida [m2]</Label>
                    <Input id="sup_construida-1" name="sup_construida" type="number" className="border border-gray-300" placeholder="50.0" required defaultValue={data?.sup_construida}/>
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="valor_terreno-1">Valor Terreno [UF]</Label>
                    <Input id="valor_terreno-1" name="valor_terreno" type="number" className="border border-gray-300" placeholder="100000" required defaultValue={data?.valor_terreno}/>
                </div>
            </div>
        </form>
    )
}