
import { heroApi } from "../api/hero.api";
import type { HeroesResponse } from "../types/get-heroes.response";

//obtiene la base de la url, desde las vars de entorno
const BASE_URL = import.meta.env.VITE_API_URL;

//func. asíncrona que hace la llamada http Get, a través de heroApi,
// recibe params. y retorna promesa y resolución tipo HeroesResponse.
export const getHeroesByPageAction = async( 
    //parámetros a recibir, para la paginación, page obligatorio y limit opcional
    page: number,
    limit: number = 6 

): Promise<HeroesResponse> => {

    //validar si la page y el limit recibidos no son un número, asigna 1 y 6.
    //Para evitar que la app se rompa si el usuario pone algo raro en la url.
    if (isNaN(page)) {
        page = 1;
    };
    
    if (isNaN(limit)) {
        limit = 6;
    };

    // obtiene la data con la petición heroApi.get a /,
    // que retornará data tipo <HeroesResonse> (page, total, heroes[])
    const {data} = await heroApi.get<HeroesResponse>(`/`, {
        // envio de parámetros a la api, para la paginación
        params: {
            limit: limit,               // registros por pagina
            offset: (page -1) * limit,  // registros saltados, calculados según page y limit, recibidos
        }
    });

    // Como la prop image de la data de heroes solo contiene el número de la imagen,
    // y que las imagenes reales están en la carpeta /images/ del serv localhost,
    // mapea la lista data.héroes y por cada hero construye la ruta completa a su imágen,
    // con la variable de entorno, /images/ y el nombre de la imagen.
    const heroes = data.heroes.map( hero => ({
        // copia todas las propiedades existentes del objeto hero original 
        // (como id, name, superpower, etc.) en el nuevo objeto.
        ... hero, 
        // sobreescribe la prop image, con la url a la imagen, generada
        image: `${BASE_URL}/images/${hero.image}`
    })) 


    return {
        //propaga la data, reasigna el nuevo arreglo heroes al heroes original
        // y retorna el nuevo heroes (con la url de la imagen en image)
        ... data,
        heroes: heroes,
    }
};