import { useQuery } from "@tanstack/react-query";
import { getSummaryAction } from "../actions/get-summary.action";


export const useHeroSummary = () => {
    
    // useQuery(), hook de TansTack que gestiona, almacena en caché, sincroniza y actualiza
    // la data obtenida con la queryFn: que hace la petición http.
    // 🚨 Retornamos un objeto con: la data obtenida y toda la info que proporciona en hook useQuery
    
    return useQuery({
        //llaves de los espacios en mem caché donde se almacerará la data obtenida.
        queryKey:['summary-information'],
        //llama a la func. que hace petición http,
        // 🚨 los argumentos que se envien a la func., tienen que estar definidos en la prop queryKey
        queryFn: getSummaryAction,      //reduciendo () => getSummaryAction()
        //indica a tanstack cuanto tiempo (ms) retener en caché, la data obtenida,
        //para servirla desde ahí, sin tener que volver a hacer la misma pet. http.
        staleTime: 1000 * 60 * 5,   // 5 minutos
    });
    
    

}
