
import { Outlet } from "react-router"

export const AdminLayout = () => {

  return (
    
    <div className="bg-blue-300">
        <h1>Admin Layoutayout</h1>

        {/* Renderiza los comps de las rutas hijas de AdminLayout */}
        <Outlet />

    </div>
  )
};

// Para el lazy load de AdminLayout en app.router.tsx
export default AdminLayout;