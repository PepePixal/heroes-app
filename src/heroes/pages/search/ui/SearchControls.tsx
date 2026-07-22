import { Filter, Grid, Plus, Search, SortAsc } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const SearchControls = () => {

  return (
 
    <>
        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input placeholder="Buscar héroes, villanos, poderes, teams..." className="bg-white pl-12 h-12 text-lg placeholder:text-gray-400" />
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
            <div className="relative flex w-full touch-none select-none items-center mt-2">
              <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
                <div className="absolute h-full bg-primary" style={{ width: "0%" }} />
              </div>
              <div className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors" />
            </div>
          </div>
        </div>
    </>
  )
}
