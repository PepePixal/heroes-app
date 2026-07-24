
import { cn } from "@/lib/utils";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, /*navigationMenuTriggerStyle*/} from "../ui/navigation-menu"
import { Link, useLocation } from "react-router"

export const CustomMenu = () => {

    // hook de react-router que retorna un objeto con información de la URL actual:
    // - pathname (/home) - search (?parámetros) - hash (#Pagina01) - state (para enviar datos ocultos) 
    const { pathname } = useLocation();

    // func. que recibe un path y lo compara con el path de la URL actual (pathname), retorna true o false
    const isActive = (path: string) => {
        return pathname === path;
    }

    return (

        <NavigationMenu>
            <NavigationMenuList>
                {/* Home */}
                <NavigationMenuItem>
                    <NavigationMenuLink
                        render={<Link to="/" />}
                        // Para agregar clases (de Tailwind) dinamicas usar la func. helper cn().
                        // Si el path enviado a isActive() es el path actual (true), agrega las clases
                        className={ cn( isActive('/') && "bg-slate-200", "rounded-md p-2 mr-3") }
                        //className={navigationMenuTriggerStyle()}
                    >
                        Inicio
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Search */}
                <NavigationMenuItem>
                    <NavigationMenuLink
                        render={<Link to="/search" />}
                        className={ cn( isActive('/search') && "bg-slate-200", "rounded-md p-2 ml-3") }
                        //className={navigationMenuTriggerStyle()}
                    >
                        Buscar Superhéroes
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>


        // Menú
        //  <NavigationMenu>
        //      <NavigationMenuList>
        //          {/* Home */}
        //          <NavigationMenuItem>
        //              <NavigationMenuLink className="bg-slate-200 rounded-md p-2 mr-3">
        //                  <Link to="/">Inicio</Link>
        //              </NavigationMenuLink>
        //          </NavigationMenuItem>
        //          {/* Search */}
        //          <NavigationMenuItem>
        //              <NavigationMenuLink className="bg-slate-200 rounded-md p-2 mr-3">
        //                  <Link to="/search">Buscar SuperHéroes</Link>
        //              </NavigationMenuLink>
        //          </NavigationMenuItem>
        //      </NavigationMenuList>
        //  </NavigationMenu>
        
    );

};
