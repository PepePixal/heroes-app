import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero.interface";

//obtiene la base de la url, desde las vars de entorno
const BASE_URL = import.meta.env.VITE_API_URL;

// interface con los posibles terminos, para la bússqueda de héroes
interface Options {
    name?: string;
    team?: string;
    category?: string;
    universe?: string;
    status?: string;
    strength?: string;
}

// func. recibe obj. options inicializado a {}, por si no viene nada
// y retorna arreglo de heroes encontrados segun las options
export const searchHeroesAction = async( options: Options = {} ) => {

    // desestruc. props del obj. recibido en options
    const { name, team, category, universe, status, strength } = options;

    // valida si no viene nada en ninguna de las props, retorna un [], para que no falla la app
    if ( !name && !team && !category && !universe && !status && !strength ) {
        return [];
    };

    // petición HTTP GET usando la instancia de Axios llamada heroApi, hacia la ruta /search,
    // enviando obj. con los params. de consulta,
    // destructura solo la prop data de la info recibida
    const { data } = await heroApi.get<Hero[]>('/search', {
        params: {
            name,
            team, 
            category,
            universe,
            status,
            strength
        },
    });


    // retorna un nuevo arreglo resultado de:
    // recorrer el arreglo data y por cada elemento hero, propagar sus props y
    // a la prop image le reasigna la url del archivo real de la image,
    // cuyo nombre obtiene de la prop hero.image
    return data.map((hero) => ({
        ... hero,
        image: `${BASE_URL}/images/${hero.image}`,
    }));

}