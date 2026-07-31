
import { useMemo } from "react"
import { useSearchParams } from "react-router"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"
//import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"

export const HomePage = () => {

  // def. hook de react-router para manejar los URL query parameters. Similar al hook useState(),
  // retorna los params actuales de la url y la func. para establecer query parameters en la URL actual 
  const [ searchParams, setSearchParams ] = useSearchParams();

  // obtiene el valor del parámetro ? tab de la url, si no viene nada, asigna 'all', a activeTab
  const activeTab = searchParams.get('tab') ?? 'all';

  // obtiene el valor del param. page de la url, si no viene nada, asigna '1' (string)
  const page = searchParams.get('page') ?? '1';
  // obtiene valor del param. limit de la url, si no viene, le asigna '6' por defecto. 
  const limit = searchParams.get('limit') ?? '6';
  
  // Para evitar que la app se rompa si un usuario teclea una url desconocida:
  // con el hook useMemo(), caundo cambia el valor de [activeTab],
  // valida si la url contiene alguno de los tabs perimitidos de la lista validTabs y 
  // si no le asigna 'all'.
  const selectedTab = useMemo(() => {
    //def. lista de los parametros pemitidos en la url
    const validTabs = ['all', 'favorites', 'heroes', 'villains']
    // si validTabs incluye el valor del parametro activeTab, obtenido de la url,
    // retorna el activeTab a selectedTab, : de lo contrario, retorna 'all' a selectedTab
    return validTabs.includes(activeTab) ? activeTab : 'all';
  },[activeTab]);

  //llama nuestro custom Hook que obtiene la data de /heroes/ (Heroes),
  //destructura la prop "data" de lo retornado y la renombra como heroesResponse para facilitar su uso
  const { data: heroesResponse} = usePaginatedHero(+page, +limit)

  //llama nuestro custom Hook que obtiene la data de /summary (Resumen de Estadísticas),
  //destructura la prop "data" de lo retornado y la renombra como summary para facilitar su uso
  const { data: summary } = useHeroSummary();


  return (
    <>
      <>
        {/* Header */}
        {/* llama comp. enviando propiedades requeridas */}
        <CustomJumbotron
          title="TEST Universo Superhéroes"
          description="Descubre y administra SuperHéroes y Villanos"
        />

        {/* Breadcrumbs - migas de pan */}
        {/* <CustomBreadcrumbs currentPage="Super Héroes" /> */}

        {/* Stats Dashboard (estadísticas) */}
        {/* llama comp., no requiere props */}
        <HeroStats />

        {/* Tabs (etiquetas o pestañas) */}
        {/* El value del tab seleccionado será siempre el valor que tenga la const selectedTab */}
        <Tabs value={selectedTab} className="mb-8">

          {/* listado de Tabs - etiquetas o pestañas */}

          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all"
              // al pulsar sobre el tab Todos, se inserta el parámetro ?tab=all en la url activa,
              // conservando los posibles parámetros posteriores al símbolo & 
              onClick={ () => setSearchParams( ( prev ) => {
                prev.set('tab', 'all');
                return prev;
              })}
            >
              Todos ({summary?.totalHeroes})
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2"
                onClick={ () => setSearchParams( ( prev ) => {
                prev.set('tab', 'favorites');
                return prev;
              })}
            >
              Favoritos (3)
            </TabsTrigger>
            <TabsTrigger value="heroes"
                onClick={ () => setSearchParams( ( prev ) => {
                prev.set('tab', 'heroes');
                return prev;
              })}
              
            >
              Héroes ({summary?.heroCount})
            </TabsTrigger>
            <TabsTrigger value="villains"
                onClick={ () => setSearchParams( ( prev ) => {
                prev.set('tab', 'villains');
                return prev;
              })}
            >
              Villanos ({summary?.villainCount})
            </TabsTrigger>
          </TabsList>

          {/* Contenido a mostrar,
           según el value obtenido del param ?tab= de la url y asignado a activeTab */}

          <TabsContent value='all'>
            <h1>Todos los Personajes</h1>
            {/* llama comp HeroGrid enviando porp heroes,
              si heroesResponse.heroes viene vacia, envia [] */}
            <HeroGrid heroes={ heroesResponse?.heroes ?? [] } />
          </TabsContent>

          <TabsContent value='favorites'>
            <h1>Los Favoritos</h1>
            <HeroGrid heroes={[]} />
          </TabsContent>

          <TabsContent value='heroes'>
            <h1>Los Héroes</h1>
            <HeroGrid heroes={[]} />
          </TabsContent>

          <TabsContent value='villains'>
            <h1>Los Villanos</h1>
            {/* Mostrar grid de tarjetas, de los Villanos */}
            <HeroGrid heroes={[]} />
          </TabsContent>

        </Tabs>

        {/* Pagination */}
        {/* llama comp., enviando la prop totalPages, obtenidas de la petición http */}
        <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
      </>
    </>
  )

}