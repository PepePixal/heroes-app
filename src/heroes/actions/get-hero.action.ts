import { heroApi } from "../api/hero.api"
import type { Hero } from "../types/hero.interface"

// http://localhost:3000
const BASE_URL = import.meta.env.VITE_API_URL;

//comp. recibe el idSlug y retorna copia de data modificada
export const getHeroAction = async(idSlug: String ) => {

    // obtiene el hero por su idSlug, con axios en heroApi,
    // al endpoint ${BASE_URL}/api/heroes/${idSlug}
    const {data} = await heroApi.get<Hero>(`/${idSlug}`);

    return {
        // crea nuevo obj. copia de data en mem, por propagación
        ... data,
        // aisgna la url del archivo imagen, a la prop image del nuevo objeto.
        // http://localhost:3000/images/
        image: `${BASE_URL}/images/${data.image}`
    }

}
