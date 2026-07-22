import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"


export const SearchPage = () => {
    
  return (

    <>
      {/*Header - llama al comp, enviando props*/}
      <CustomJumbotron
        title="Búsqueda de SuperHéroes"
        description="Decubre y administra SuperHéroes y Villanos"
      />

      {/* Stats Dashboard */}
      <HeroStats />   
    </>
    
  )
}
