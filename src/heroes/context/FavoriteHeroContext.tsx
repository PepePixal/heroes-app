
import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/hero.interface";

// interface con elementos de estado y métodos
interface FavoriteHeroContext {
    // States:
    // heroes favoritos, tipo Hero[]
    favorites: Hero[];
    // cant. de heroes favoritos, tipo number
    favoriteCount: number;

    // Methods:
    // para saber is esta marcado o no, como favorito
    isFavorite: (hero: Hero) => boolean;
    // alterndor del icono de favorito (corazoncito)
    toggleFavorite: (hero: Hero) => void;
}

// Creación de un contexto global, que podrán usar todos los componentes hijos,
// rertorna obj. de contexto con: comp. Provider (con value:) y comp. Consumer (useContext).
// Tipado "as" (type assertion) - le dicemoas a TypeScript,
// que confie en que esto {}, va a ser tipo FavoriteHeroContext
export const FavoriteHeroContext = createContext( {} as FavoriteHeroContext );

// obtener los heroes favorites del localStorage, si ya los hay,
// con una func. que retorna algo tipo arreglo de heoroes (Hero[])
const getFavoritesFromLocalStorage = (): Hero[] => {
    // obtiene los favoritos del localSorate, si los hay
    const favorites = localStorage.getItem('favorites');
    // si favorites existe los retorna parsados, de lo contrario : retorna []
    return favorites ? JSON.parse(favorites) : [];
}


// def. de HOC (Hight-Order Component) comp. que envuelve a otros componentes children.
// func. que recibe componente hijo (children) y
// retorna un nuevo componente mejorado con lógica adicional y el comp recibido en children
export const FavoriteHeroProvider = ({children}: PropsWithChildren) => {

    // def. estado del arreglo de heroes favoritos, estado inicial obtenido del localStorage
    const [ favorites, setFavorites ] = useState<Hero[]>(getFavoritesFromLocalStorage);

    // método recibe hero y retorna true o false
    const isFavorite = (hero: Hero) => {
        // .some retorna true o false , segun si encuentra 
        // algún hero (h) en favorites[], cuyo id sea = al id del hero recibido
        return favorites.some( (h) => h.id === hero.id) ;
    };

    //método intercambiador de heroes favoritos, recibe hero, modifica estado de favorites
    const toggleFavorite = (hero: Hero) => {
        // encontrar en el arreglo favorites,
        // el primer hero (h) cuyo id sea igual a id del hero recibido  
        const heroExist = favorites.find( h => h.id === hero.id );
        // si el hero se ha encontrado en favorites, eliminarlo del arreglo favorites
        if( heroExist ) {
            // cambiar el estado de favorites con setFavorites, filtrando los favoritos para
            // obtener nuevo [] solo los heroes (h) cuyo id sea diferente del hero recibido
            setFavorites( favorites.filter( h => h.id !== hero.id) );
            //parar y salir
            return;
        } 
        // si el hero recibido, NO se encuntra ya entre los favorites, agregarlo con setHeroes,
        // exparcir los heroes favorites y agra e hero recibido, al arreglo
        setFavorites([... favorites, hero]);
    }

    // hook de React
    //efecto que se diapara cuando cambia el estado del arreglo favorites
    useEffect(() => {
        //almacena con la key 'favorites' en localSotrage, los favorites parseados a JSON.string previamente
        localStorage.setItem( 'favorites', JSON.stringify(favorites) );
    }, [favorites]);

    
    /*
    Renderiza el contexto haciendo uso de su propiedad value para exponer los datos (la cantidad de favoritos y el arreglo) y
    las funciones (verificar y alternar favoritos) a toda la aplicación.
    Renderiza {children} dentro del contexto para que cualquier componente hijo envuelto tenga acceso a esta información global.
    */

    return (

        <FavoriteHeroContext        //en versiones 18 o anterior de React, faltarila .Provider
            // valores enviados o proveidos para hijos
            value={{
                // State
                //cant. de favoritos = cant. elementos del arreglo favorites
                favoriteCount: favorites.length,
                favorites: favorites,
                // Methods
                isFavorite: isFavorite,
                // asigna la func a la prop:
                toggleFavorite: toggleFavorite,
            }}
        >
            {/* children recibido, reenviado */}
            {children}
        </FavoriteHeroContext>
    )
}
