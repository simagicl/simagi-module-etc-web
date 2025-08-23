import { type IEvaluacionTipologia } from "@/interfaces/tipologia.interface"



export function calcSuperficieConstruida(tipologias: IEvaluacionTipologia[]) {
    let sup_construida = 0;
    tipologias.forEach((tipologia) => {
        sup_construida += tipologia.unidad * tipologia.superficie;
    });
    return sup_construida;
}