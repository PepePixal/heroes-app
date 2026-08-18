
import { lazy } from 'react';
import { createHashRouter, Navigate } from 'react-router'
import { HomePage } from '../heroes/pages/home/HomePage';
import { HeroPage } from '@/heroes/pages/hero/HeroPage';
import { SearchPage } from '@/heroes/pages/search/SearchPage';
import { HeroesLayout } from '@/heroes/layouts/HeroesLayout';
// import { AdminPage } from '@/admin/pages/AdminPage';
// import { AdminLayout } from '@/admin/pages/layouts/AdminLayout';

// Cargará el AdminLayout y AdminPage, de forma lazy, perezosa
const AdminLayout = lazy(() => import('@/admin/pages/layouts/AdminLayout'));
const AdminPage = lazy(() => import('@/admin/pages/AdminPage'));

//Def. rutas - func de react-router
// export const appRotuer = createBrowserRouter([
export const appRotuer = createHashRouter([

    // Def. router con layout e hijos
    { 
        path: '/',
        element: <HeroesLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                //path dinámico, recibiendo : el slug del hero en idSlug
                path:'heros/:idSlug',
                element: <HeroPage />
            },
            {
                path:'search',
                element: <SearchPage />
            },
            {
                //cuaquier path que no esté definido, reenvia a la página de incio /
                path:'*',
                element: <Navigate to='/' />
                //element: <h1>404</h1>
            },

        ]
    },

    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminPage />
            },
        ]
    }

])