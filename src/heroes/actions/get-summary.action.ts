import { heroApi } from "../api/hero.api";
import type { SummaryInformationResponse } from "../types/summary-information.response";


//func. asíncrona que hace la llamada http Get, a través de heroApi,
// recibe params. y retorna promesa y resolución tipo .
export const getSummaryAction = async () => {

    // petición http con la instancia de axios (heroApi.get), a ${BASE_URL}/api/summary
    // que retornará data tipo SummaryInformationResponse
    const { data } = await heroApi.get<SummaryInformationResponse>('/summary');

    return data;

}