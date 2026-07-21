import { RouterProvider } from "react-router"
import { appRotuer } from "./router/app.router"


export const HeroesApp = () => {

    return (
    <>
        {/* componente de react-rotuer, requiere comp. en router= */}
        <RouterProvider router={appRotuer} />
    </>
  )
}
