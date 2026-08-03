
import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";

// custom hook
export const usePaginatedHero = ( page: number, limit: number, category = 'all') => {

  // useQuery(), hook de tanstack que gestiona, almacena en caché, sincroniza y actualiza,
  // la data obtenida con la queryFn: que hace la petición http.
  // 🚨 Retornamos un objeto con: la data obtenida y toda la info que proporciona en hook useQuery

  return useQuery({
    //llaves de los espacios en mem caché donde se almacerará la data obtenida.
    //Como las props page y limit (no son posicionales) pueden variar su posición en la url, 
    //se aconseja enviarlas en un objeto { page: +page, limit: +limit } abreviando {page, limit}
    queryKey: ['heroes', {page, limit, category}],
    //llama a la func. que hace petición http,
    //enviando argumentos, page (obligatorio) y limit (opcional), transf a numbers.
    // 🚨 los argumentos que se envian a la func., tienen que estar definidos en la prop queryKey
    queryFn: () => getHeroesByPageAction(+page, +limit, category),
    //le indica a tanstack cuanto tiempo (ms) retener en caché, la data obtenida,
    //para servirla desde ahí, sin tener que volver a hacer la misma pet. http.
    staleTime: 1000 * 60 * 5,   // 5 minutos
  });

}