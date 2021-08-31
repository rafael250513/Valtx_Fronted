import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'ACTIVIDADES',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [

            {
                id       : 'usuarios',
                title    : '🧑‍💻 USUARIOS',
                type     : 'collapsable',
                children : [
                    {
                        id        : 'principal-usuarios',
                        title     : '📄 Mantenimiento ',
                        type      : 'item',
                        url       : '/principal-usuarios',
                        exactMatch: true
                    }
                ]
            },
            {
                id       : 'sucursales',
                title    : '🏣 SUCURSALES',
                type     : 'collapsable',
                children : [
                    {
                        id        : 'principal-sucursales',
                        title     : '📄 Mantenimiento ',
                        type      : 'item',
                        url       : '/principal-sucursales',
                        exactMatch: true
                    }
                ]
            },
            {
                id       : 'productos',
                title    : '🥦 PRODUCTOS',
                type     : 'collapsable',
                children : [
                    {
                        id        : 'principal-productos',
                        title     : '📄 Mantenimiento ',
                        type      : 'item',
                        url       : '/principal-productos',
                        exactMatch: true
                    }
                ]
            }


        ]
    }
];
