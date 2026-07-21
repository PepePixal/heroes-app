
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router'
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
export const appRotuer = createBrowserRouter([

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
                path:'heros/1',
                element: <HeroPage />
            },
            {
                path:'search',
                element: <SearchPage />
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