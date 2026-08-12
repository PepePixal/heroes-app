
import { useRef } from "react";
import { useSearchParams } from "react-router";

import { Filter, Grid, Plus, Search, SortAsc } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion"

export const SearchControls = () => {

  // def. hook de react-router para manejar los URL query parameters. Similar al hook useState(),
  // retorna los params actuales de la url y la func. para establecer query parameters en la URL actual 
  const [ searchParams, setSearchParams ] = useSearchParams();

  // Reacat hook useRef, para almacenar la info del input sin renderizar.
  // Retorna un objeto plano de JS con una única prop. llamada current.
  const inputRef = useRef<HTMLInputElement>(null); 

  // Func. manejadora del Enter en el input
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // si la tecla pulsada es Enter, actualizar la url
    if (event.key === 'Enter') {
      //obtiene el valor del input en inputRef (de useRef)
      // si no viene nada ?? asigna '', para evitar que sea undefined
      const value = inputRef.current?.value ?? '';

      // modifica el valor de searchParams (url activa),
      // insertando los el parámetro ?name=valor_de_value, en la url activa,
      // conservando los posibles parámetros prviso (prev), posteriores al símbolo & 
      setSearchParams( ( prev ) => {
        //agrega al contenido de prev, el param '?name=' con el valor_de_value
        prev.set('name', value);
        // retorna todo el contenido de prev a searchParams (url activa)
        return prev;
      });

    }
  }

  return (
 
    <>
        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input
                  // Toma el elemento HTML del <Input/> y lo guarda dentro de la prop. .current de la constante inputRef
                  ref={inputRef} 
                  placeholder="Buscar héroes, villanos, poderes, teams..."
                  className="bg-white pl-12 h-12 text-lg placeholder:text-gray-400"
                  // cuando se pulse una tecla, llamar la func. handleKeyDown que recibe el event
                  onKeyDown={handleKeyDown}
                  // valor por defecto modificable, obtenido del param name de la url activa, si no viene, asigna ''
                  // con esto no desaparece lo tecleado en el input, cuando se pulsa en Enter
                  defaultValue={ searchParams.get('name') ?? ''}
                />
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
                <Button variant="outline" className="h-12 bg-transparent">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                </Button>

                <Button variant="outline" className="h-12 bg-transparent">
                    <SortAsc className="h-4 w-4 mr-2" />
                    Orden por nombre
                </Button>

                <Button variant="outline" className="h-12 bg-transparent">
                    <Grid className="h-4 w-4" />
                </Button>

                <Button className="h-12">
                    <Plus className="h-4 w-4 mr-2" />
                    Agrega Personaje
                </Button>
            </div>
        </div>

        {/* Advanced Filters */}
        <Accordion type="single" collapsible value="item-1">
          <AccordionItem value="item-1">
            {/* <AccordionTrigger className="text-lg font-semibold">Filtros avanzados</AccordionTrigger> */}
              <AccordionContent>
                <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Filtros Avanzados</h3>
                    <Button variant="ghost">Borrar Todo</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Equipo</label>
                      <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        Todos los equipos
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Categoría</label>
                      <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        Todas las categorías
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Universo</label>
                      <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        Todos los universos
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Estatus</label>
                      <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        Todos los estatus
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="text-sm font-medium">Fuerza máxima: 0/10</label>
                    {/* slider de shadcn.com */}
                    <Slider defaultValue={[5]} max={10} step={1} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
        </Accordion>

    </>

  );
};
