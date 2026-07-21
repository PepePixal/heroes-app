
import { Outlet } from "react-router"


export const HeroesLayout = () => {

  return (
    
    <div className="bg-red-300">
        <h1>Heroes Layout</h1>

        <section className="mt-10">
        {/* renderiza los comps de las rutas hijas de HeroesLyout */}
        <Outlet />
        </section>

    </div>
  )
}
