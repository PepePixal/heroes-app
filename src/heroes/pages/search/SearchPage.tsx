import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { SearchControls } from "./ui/SearchControls"


export const SearchPage = () => {
    
  return (

    <>
      
      {/*Header - llama al comp, enviando props*/}
      <CustomJumbotron
        title="Búsqueda de SuperHéroes"
        description="Descubre y administra SuperHéroes y Villanos"
      />

      {/* Stats Dashboard */}
      <HeroStats />   

      {/* Search and actions */}
      <SearchControls />

    </>


  )
}
