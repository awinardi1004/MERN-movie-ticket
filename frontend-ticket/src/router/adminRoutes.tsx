import type { RouteObject } from 'react-router-dom';
import AdminLoginPage from '../pages/AdminLoginPage';
import AdminOverview from '@/pages/AdminOverview';
import AdminLayout from '@/components/adminLayout';

const adminRoutes: RouteObject[] = [
    {
        path: "/admin/login",
        element: <AdminLoginPage/>
    },
    {
        path: "/admin",
        element: <AdminLayout/>,
        children: [
            { index: true, element: <AdminOverview /> },
            { path: "/admin/genres", element: "Admin Genres Page" },
        ]
    }
];

export default adminRoutes;
