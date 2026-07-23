
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
    totalPages: number;     //total páginas necesarias según la paginación
}


export const CustomPagination = ({ totalPages }: Props ) => {
    
    // pagina actual para pruebas
    var page =8;

    return (
        // Pagination
        <div className="flex items-center justify-center space-x-2">

            <Button 
                size="sm"
                variant="outline"
                //si la pagina actual es = 1, deshabilita el btn < Anterior
                disabled={page === 1 ? true : false}
            >
                <ChevronLeft className="h-4 w-4" />
                Anterior
            </Button>

            {
                // Generación dinámica de una lista de botones con los números de paginación.
                // Crea un arreglo cuya cantidad de elementos e indices [0-7], es igual al total de Paginas,
                // mapea el arreglo y por cada elemento del arreglo (descartando el valor _)
                // crea el botón cuyo número será igual al index del arreglo + 1 (descartando el 0)
                Array.from({ length: totalPages }).map(( _, index ) => (
                    <Button
                        // map() requiere una key única (no es aconsejable usar el index) 
                        key={index}
                        size="sm"
                        // el botón estara activo ('default') si la page actual es = al número del botón
                        variant={ page === index + 1 ? 'default' : 'outline'} 
                    >
                        {index + 1}
                    </Button>
                ))
            }

            <Button 
                size="sm"
                variant='outline'
                // si la pagina actual es = al total de pags, deshabilita el btn Siguiente >
                disabled={page === totalPages ? true : false }
            >
                Siguiente
                <ChevronRight className="h-4 w-4" />
            </Button>

        </div>

  )
}
