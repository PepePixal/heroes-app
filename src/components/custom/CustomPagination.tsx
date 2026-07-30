
import { useSearchParams } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
    totalPages: number;     //total páginas necesarias según la paginación
}


export const CustomPagination = ({ totalPages }: Props ) => {
    
    // hook (react-roter), retorna obj. con los query parameters actuales de la url 
    // y func para modificar el objeto
    const [ searchParams, setSearchParams ] = useSearchParams();

    // obtiene pag actual de searchParams (de la url), pero si no viene asigna '1'
    const queryPage = searchParams.get('page') ?? 1;

    // valida si queryPage no es un número, le asigna 1, de lo contrario
    // le asigna el valor de queryPage pasado a número. Para evitar urls raras.
    const page = isNaN(+queryPage) ? 1 : +queryPage;

    // manejo de botones para cambio de página, recibe pag actual
    const handlePageChange = (page: number) => {
        //valida y si se cumple, sale
        if ( page < 1 || page > totalPages) return;

        // asigna al param 'page' de searchParams,
        // el valor de page recibido (enviado por el botón)
        searchParams.set('page', page.toString());

        // actualiza el valor del param searchParams
        setSearchParams(searchParams);



    };

    return (
        // Pagination
        <div className="flex items-center justify-center space-x-2">

            <Button 
                size="sm"
                variant="outline"
                //si la pagina actual es = 1, true, deshabilita el btn. <Anterior
                disabled={ page === 1 }
                // el click en el boton <Anterior envía a la página anterior a la actual page
                onClick={ () => handlePageChange(page - 1) }
            >
                <ChevronLeft className="h-4 w-4" />
                Anterior
            </Button>

            {
                // Generación dinámica de una lista de botones con los números de paginación.
                // Crea un arreglo cuya cantidad de elementos e indices [0,...], es igual al total de Paginas,
                // mapea el arreglo y por cada elemento del arreglo ( descartando el valor '_' )
                // crea el botón cuyo número será igual al index del arreglo + 1 (descartando el 0)
                Array.from({ length: totalPages }).map(( _, index ) => (
                    <Button
                        // map() requiere una key única (no es aconsejable usar el index) 
                        key={index}
                        size="sm"
                        // el botón estara activo ('default') si la page actual es = al número del botón
                        variant={ page === index + 1 ? 'default' : 'outline'}
                        // llama func manejadora de botones, enviando el número de pag, segun el index
                        onClick={ () => handlePageChange( index + 1 ) } 
                    >
                        {/* renderiza el número correspondiente, en el botón */}
                        {index + 1}
                    </Button>
                ))
            }

            <Button 
                size="sm"
                variant='outline'
                // si la pagina actual es = al total de pags, true, deshabilita el btn Siguiente>
                disabled= {page === totalPages }
                // el click en boton Siguiente> envía a la página siguiente a la actual page
                onClick={ () => handlePageChange(page + 1) }
            >
                Siguiente
                <ChevronRight className="h-4 w-4" />
            </Button>

        </div>

  )
}
