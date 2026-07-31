// Componente Estadísticas

import { Heart, Users, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { HeroStatCard } from './HeroStatCard';
import { useHeroSummary } from "../hooks/useHeroSummary";


export const HeroStats = () => {
    
    //llama nuestro custom Hook que obtiene la data de /summary (Resumen de Estadísticas),
    //destructura la prop "data" de lo retornado y la renombra como summary para facilitar su uso
    const { data: summary } = useHeroSummary();

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
                <div className="text-2xl font-bold text-red-600">3</div>
                <p className="text-xs text-muted-foreground">18.8% of total</p>
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

