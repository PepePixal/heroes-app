
import { useSearchParams } from "react-router";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { SearchControls } from "./ui/SearchControls"
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useQuery } from "@tanstack/react-query";
import { searchHeroesAction } from "@/heroes/actions/search-heros.action";
// import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"

// def. del componente funcinal
export const SearchPage = () => {

  //* Obtener los params de la url para enviar a la func. de busqueda de heroe:
  // - useSearchParams retorna obj. con todos los parametros de la url activa a searchParams 
  // y la func setSearchParams para modificarlos, func. que aquí no necesitamos.
  const [ searchParams ] = useSearchParams();
  // - .get() obtener solo el valor del param 'name', si no existe, asigna undefined.
  const name = searchParams.get('name') ?? undefined;
  // - .get() obtener solo el valor del param strength, si no existe, asigna undefined.
  const strength = searchParams.get('strength') ?? undefined;

  //* hook de Tanstak useQuery, gestión de la data obtenida con searchHeroesAction():
  // destrurc. del objeto data: renombrado a heroes, inicializado con []
  const { data: heroes = [] } = useQuery({
    // almacena en cache con la key única 'search',
    // si el valor name o strength cambian, se ejecuta nueva búsqueda automáticamente
    queryKey: ['search', { name, strength }],
    // especifica la func que hace la busqueda de los heroes por su name
    queryFn: () => searchHeroesAction({ name, strength }),
    // mantiene la info fresca en cache, 5 min
    staleTime: 1000 * 60 * 5,
  });


  return (
    <>
      {/*Header - llama al comp, enviando props*/}
      <CustomJumbotron
        title="Búsqueda Superhéroes"
        description="Descubre y administra Superhéroes y Villanos"
      />

      {/* Breadcrumbs - migas de pan */}
      {/* <CustomBreadcrumbs currentPage="Buscar Superhéroes" /> */}

      {/* Stats Dashboard */}
      <HeroStats />   

      {/* Search and actions */}
      <SearchControls />

      {/* Heros finds Grid */}
      <HeroGrid heroes={heroes} />

    </>
  );

};
