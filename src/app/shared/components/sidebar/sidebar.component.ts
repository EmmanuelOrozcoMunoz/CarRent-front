
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    roles?: string[];
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
    { path: '/cliente', title: 'Cliente',  icon:'shopping_basket', class: '', },
    { path: '/usuarios', title: 'Usuarios',  icon:'users_single-02', class: '',},
    { path: '/productos', title: 'Productos',  icon:'shopping_box', class: '' },
    { path: '/notifications', title: 'Notificaciones',  icon:'ui-1_bell-53', class: '',},
    { path: '/upgrade', title: 'Configuración',  icon:'objects_spaceship', class: 'active active-pro', }
];




