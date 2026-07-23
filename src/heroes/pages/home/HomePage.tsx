
import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"

export const HomePage = () => {

  // hook useState temporal para manejar el state del Tab activo. Iniciado con 'all' y
  // que puede tener cualquier de los estados: 'all', 'favorites', 'heroes', 'villains' 
  const [ activeTab, setActiveTab] = useState<'all' | 'favorites' | 'heroes' | 'villains'>('all');

  return (
    <>
        {/* Header */}
        {/* llama comp. enviando propiedades requeridas */}
        <CustomJumbotron
          title="Universo de Super-Héroes"
          description="Descubre y administra SuperHéroes y Villanos"
        />

        {/* Stats Dashboard (estadísticas) */}
        {/* llama comp., no requiere props */}
        <HeroStats />

        {/* Tabs (etiquetas o pestañas) */}
        <Tabs value={activeTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all"
              onClick={ () => setActiveTab('all') }>Todos
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2"
              onClick={ () => setActiveTab('favorites') }>Favoritos
            </TabsTrigger>
            <TabsTrigger value="heroes"
              onClick={ () => setActiveTab('heroes') }>Héroes
            </TabsTrigger>
            <TabsTrigger value="villains"
              onClick={ () => setActiveTab('villains')}>Villanos
            </TabsTrigger>
          </TabsList>

          <TabsContent value='all'>
            {/* Mostrar grid de tarjetas, de los Personajes */}
            <h1>Todos los Personajes</h1>
            <HeroGrid />
          </TabsContent>
          <TabsContent value='favorites'>
            <h1>Los Favoritos</h1>
            <HeroGrid />
          </TabsContent>
          <TabsContent value='heroes'>
            <h1>Los Héroes</h1>
            <HeroGrid />
          </TabsContent>
          <TabsContent value='villains'>
            {/* Mostrar grid de tarjetas, de los Villanos */}
            <h1>Los Villanos</h1>
            <HeroGrid />
          </TabsContent>
        </Tabs>

       
        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <Button variant="default" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="ghost" size="sm" disabled>
            <MoreHorizontal className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="sm">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
    </>
  )
}