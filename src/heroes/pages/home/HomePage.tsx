
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.action"
//import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"

export const HomePage = () => {

  // hook useState temporal para manejar el state del Tab activo. Iniciado con 'all' y
  // que puede tener cualquier de los estados: 'all', 'favorites', 'heroes', 'villains' 
  const [ activeTab, setActiveTab] = useState<'all' | 'favorites' | 'heroes' | 'villains'>('all');


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