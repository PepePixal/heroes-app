
import { NavigationMenuItem, NavigationMenuLink  } from "@radix-ui/react-navigation-menu";
import { Link, useLocation } from "react-router";
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import { cn } from "@/lib/utils";

//Modelo de props para los elementos (items) del menú
interface MenuItem {
    title: string;
    routeName: string;
}

export const CustomMenu = () => {

    //Arreglo con elementos (items) del menú, tipo MenuItem
    const menuItems: MenuItem[] = [
        { title: 'Inicio', routeName: '/' },
        { title: 'Burcar Superhéroes', routeName: '/search' },
        { title: 'Heroes', routeName: '/heros/1' },
    ];

    // hook de react-router que retorna un objeto con información de la URL actual:
    // - pathname (/home) - search (?parámetros) - hash (#Pagina01) - state (para enviar datos ocultos) 
    const { pathname } = useLocation();

    // func. que recibe un path y lo compara con el path de la URL actual (pathname), retorna true o false
    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <>
         <NavigationMenu className="mb-3">
             <NavigationMenuList>
                    {
                        // mapea el arreglo de elementos del menú y por cada elemento,
                        // llama al comp <NavigationMenuItem>, al <NavigationMenuLink> con sus atributos dinámicos
                        // y al comp. <Link> con su enlace.
                        menuItems.map( (item) => ( 
                            <NavigationMenuItem key={item.routeName}>
                                <NavigationMenuLink
                                    asChild
                                    // Para agregar clases (de Tailwind) dinamicas, se aconseja usar la func. helper cn().
                                    // Si el path enviado a isActive() es el path actual, isActive retorna (true),
                                    // entoces && agrega la clase "bg-slate-200"
                                    className={cn(isActive(item.routeName) && 'bg-slate-300', 'rounded-md p-2 mr-3')}
                                >
                                    <Link to={item.routeName}>{item.title}</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>  
                        ))
                    }
             </NavigationMenuList>
         </NavigationMenu>
        </>
    );

};
