import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { SearchControls } from "./ui/SearchControls"
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"


export const SearchPage = () => {
    
  return (

    <>
      
      {/*Header - llama al comp, enviando props*/}
      <CustomJumbotron
        title="TEST Búsqueda Superhéroes"
        description="Descubre y administra SuperHéroes y Villanos"
      />

      {/* Breadcrumbs - migas de pan */}
      {/* <CustomBreadcrumbs currentPage="Buscar Superhéroes" /> */}

      {/* Stats Dashboard */}
      <HeroStats />   

      {/* Search and actions */}
      <SearchControls />

    </>


  )
}
