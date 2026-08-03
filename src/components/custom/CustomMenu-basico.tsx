
import { NavigationMenuItem, NavigationMenuLink  } from "@radix-ui/react-navigation-menu";
import { Link, useLocation } from "react-router";
import {  NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import { cn } from "@/lib/utils";

export const CustomMenu = () => {

    // hook de react-router que retorna un objeto con información de la URL actual:
    // - pathname (/home) - search (?parámetros) - hash (#Pagina01) - state (para enviar datos ocultos) 
    const { pathname } = useLocation();

    // func. que recibe un path y lo compara con el path de la URL actual (pathname), retorna true o false
    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
         <NavigationMenu className="mb-3">
             <NavigationMenuList>
                 {/* Home */}
                 <NavigationMenuItem>
                     <NavigationMenuLink
                        asChild
                        // Para agregar clases (de Tailwind) dinamicas, se aconseja usar la func. helper cn().
                        // Si el path enviado a isActive() es el path actual, isActive retorna (true),
	                    // entoces && agrega la clase "bg-slate-200"
                        className={cn(isActive('/') && 'bg-slate-300', 'rounded-md p-2 mr-3')}
                     >
                        <Link to="/">Inicio</Link>
                     </NavigationMenuLink>
                 </NavigationMenuItem>

                 {/* Search */}
                 <NavigationMenuItem>
                    <NavigationMenuLink
                        asChild
                        className={cn(isActive('/search') && 'bg-slate-300', 'rounded-md p-2 mr-3')}
                    >
                        <Link to="/search">Buscar SuperHéroes</Link>
                    </NavigationMenuLink>
                 </NavigationMenuItem>

             </NavigationMenuList>
         </NavigationMenu>
        
    );

};
