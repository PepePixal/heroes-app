
import { useMemo } from "react"
import { useSearchParams } from "react-router"
import { useQuery } from "@tanstack/react-query"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.action"
//import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"

export const HomePage = () => {

  // def. hook de react-router para manejar los URL query parameters. Similar al hook useState(),
  // retorna los params actuales de la url y la func. para establecer query parameters en la URL actual 
  const [ searchParams, setSearchParams ] = useSearchParams();

  // obtiene el valor del parámetro ? tab de la url, si no viene nada asigna 'all', a activeTab
  const activeTab = searchParams.get('tab') ?? 'all';

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


  // useQuery(), hook de tanstack que gestiona, almacena en caché, sincroniza y actualiza,
  // la data obtenida con la queryFn: que hace la petición http.
  // ? " data " extrae (desestructuracion) la propiedad data del objeto que devuelve useQuery y 
  // ? " : heroesResponse " cambia el nombre de "data" a "heroesResponse" para que sea más descriptivo en el componente.
  const { data: heroesResponse } = useQuery({
    //llave del espacio en mem caché donde se almacerará la data obtenida.
    queryKey: ['heroes'],
    //llama a la func. que hace petición http.
    queryFn: () => getHeroesByPageAction(),
    //le indica a tanstack cuanto tiempo (ms) retener en caché, la data obtenida,
    //para servirla desde ahí, sin tener que volver a hacer la misma pet. http.
    staleTime: 1000 * 60 * 5,   // 5 minutos
  });

  console.log({heroesResponse});

  // !  NO aconsejado. Otra forma de llamar a la func. que hace la petición http.
  // useEffect(() => {
  //   getHeroesByPageAction().then(()=> {
  //   });
  // }, []);


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
              Todos
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2"
                onClick={ () => setSearchParams( ( prev ) => {
                prev.set('tab', 'favorites');
                return prev;
              })}
            >
              Favoritos
            </TabsTrigger>
            <TabsTrigger value="heroes"
                onClick={ () => setSearchParams( ( prev ) => {
                prev.set('tab', 'heroes');
                return prev;
              })}
              
            >
              Héroes
            </TabsTrigger>
            <TabsTrigger value="villains"
                onClick={ () => setSearchParams( ( prev ) => {
                prev.set('tab', 'villains');
                return prev;
              })}
            >
              Villanos
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
        {/* llama comp., no requiere props */}
        <CustomPagination totalPages={8} />
      </>
    </>
  )

}