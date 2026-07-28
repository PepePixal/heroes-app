import { RouterProvider } from "react-router";
import { appRotuer } from "./router/app.router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

//Def. QueryClient de la librería tanstack query, para getion de pet. http
const queryClient = new QueryClient()

export const HeroesApp = () => {

  return (
    //Envolver todo lo retornado en un comp. <QueryClientProvider></...> de tanstack,
    //enviandole nuestro queryClient
    <QueryClientProvider client={queryClient}>

        {/* componente de react-rotuer, requiere comp. en router={} */}
        <RouterProvider router={appRotuer} />

        {/* llmama comp de tanstack (genera icono tanstack en la ventana*/}
        <ReactQueryDevtools initialIsOpen={false} /> 

    </QueryClientProvider>
  )

}
