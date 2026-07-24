
import { useState } from "react"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"

export const HomePage = () => {

  // hook useState temporal para manejar el state del Tab activo. Iniciado con 'all' y
  // que puede tener cualquier de los estados: 'all', 'favorites', 'heroes', 'villains' 
  const [ activeTab, setActiveTab] = useState<'all' | 'favorites' | 'heroes' | 'villains'>('all');

  return (
    <>
        {/* Header */}
        {/* llama comp. enviando propiedades requeridas */}
        <CustomJumbotron
          title="TEST Universo Superhéroes"
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
            <h1>Todos los Personajes</h1>
            {/* Mostrar grid de tarjetas, de los Personajes */}
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
            <h1>Los Villanos</h1>
            {/* Mostrar grid de tarjetas, de los Villanos */}
            <HeroGrid />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {/* llama comp., no requiere props */}
        <CustomPagination totalPages={8} />
    </>
  )

}