// Componente Estadísticas

import { use } from "react";
import { Heart, Users, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { HeroStatCard } from './HeroStatCard';
import { useHeroSummary } from "../hooks/useHeroSummary";
import { FavoriteHeroContext } from "../context/FavoriteHeroContext";


export const HeroStats = () => {
    
    //llama nuestro custom Hook que obtiene la data de /summary (Resumen de Estadísticas),
    //destructura la prop "data" de lo retornado y la renombra como summary para facilitar su uso
    const { data: summary } = useHeroSummary();

    // invocar el contexto de favorites, con la api use() (a partir de React 19),
    // desestruc la prop favoriteCount del contexto FavoriteHeroContext
    const { favoriteCount } = use(FavoriteHeroContext);

    // validar para que summary nunca sea undefined
    if ( !summary ) {
        return <div>Loading...</div>
    }


    return (
        /* Stats Dashboard - Estadísticas */
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

            {/* Llama al comp. enviando argumentos y children primera card */}
            <HeroStatCard 
                /* enviando argumentos Props al comp HeroStatCard */
                title='Total Personajes' 
                icon={<Users className="h-4 w-4 text-muted-foreground" />} 
            >
                {/* enviando children al comp HeroStatCard */}
                <div className="text-2xl font-bold">{summary?.totalHeroes}</div>
                    <div className="flex gap-1 mt-2">
                        <Badge variant="secondary" className="text-xs">
                            {summary?.heroCount} Héroes
                        </Badge>
                        <Badge variant="destructive" className="text-xs">
                            {summary?.villainCount} Villanos
                        </Badge>
                    </div>
            </HeroStatCard>    

            {/* TODO: calcular favoritos */}
            {/* Llama comps. enviando argumentos y childrens, seg. terc y cuarta, tajetas */}
            <HeroStatCard 
                /* enviando argumentos Props al comp HeroStatCard */
                title='Favoritos' 
                icon={<Heart className="h-4 w-4 text-muted-foreground" />} 
            >
                {/* enviando children al comp HeroStatCard */}
                <div className="text-2xl font-bold text-red-600">{favoriteCount}</div>
                <p className="text-xs text-muted-foreground">
                    {/* calcula el porcentaje de favoritos respecto al total de heroes, tomando (2) decimales */}
                    {((favoriteCount / summary?.totalHeroes)*100).toFixed(2)}% of total
                </p>
            </HeroStatCard>

            <HeroStatCard 
                /* enviando argumentos Props al comp HeroStatCard */
                title='Fuerte' 
                icon={<Zap className="h-4 w-4 text-muted-foreground" />} 
            >
                {/* enviando children al comp HeroStatCard */}
                <div className="text-lg font-bold">{summary?.strongestHero.alias}</div>
                <p className="text-xs text-muted-foreground">Strength: {summary?.strongestHero.strength}/10</p>
            </HeroStatCard>

            <HeroStatCard 
                /* enviando argumentos Props al comp HeroStatCard */
                title='Inteligente' 
                icon={<Heart className="h-4 w-4 text-muted-foreground" />} 
            >
                {/* enviando children al comp HeroStatCard */}
                <div className="text-lg font-bold">{summary?.smartestHero.alias}</div>
                <p className="text-xs text-muted-foreground">Intelligence: {summary?.smartestHero.intelligence}/10</p>
            </HeroStatCard>

        </div>

    )
}

