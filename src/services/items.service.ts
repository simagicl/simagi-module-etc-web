import axios from "axios";
import { API_URL, EP_EVALUACIONES, EP_TIPOLOGIAS } from "@/services/consts.service";
import type { IEvaluacionItem } from "@/interfaces/item.interface";

export const UpdateEvaluacionItems = async (evaluacionId: number, items: IEvaluacionItem[]) => {
    try {
        const response = await axios.put(EP_EVALUACIONES + "/" + evaluacionId + "/items", {
            evaluacionId: evaluacionId,
            items: items
        })
        console.log("UpdateEvaluacionItemsService - Response", response)
        return response.data.items
    }
    catch (error) {
        console.log("UpdateEvaluacionItemsService - Error", error)
        return null
    }
}