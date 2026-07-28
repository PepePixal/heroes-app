

import type { Hero } from "../types/hero.interface";
import { HeroGridCard } from "./HeroGridCard"

interface Props {
  heroes: Hero[]
}

export const HeroGrid = ( { heroes }: Props ) => {

  return (
  
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
      
      {
        //mapea el arreglo heroes recibido y por cada heroe,
        //llama al comp <HeroGridCard enviando key del map y el comp hero
        heroes.map( hero => (
          <HeroGridCard 
            key={hero.id}
            hero={hero}
          />     
        ))  
      }

    </div>

  );

};
