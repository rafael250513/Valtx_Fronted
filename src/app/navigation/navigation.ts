import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'ACTIVIDADES',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [

            {
                id       : 'actividades',
                title    : '🧑‍💻 ACTIVIDADES',
                // translate: 'NAV.MANTENIMIENTO.TITLE',
                type     : 'collapsable',
                children : [
                    {
                        id        : 'listado-actividades',
                        title     : '📄 Listado',
                        type      : 'item',
                        url       : '/listado-actividades',
                        exactMatch: true
                    }
                ]
            },
            {
                id       : 'marcacion',
                title    : '⏰🖊 MARCACION',
                // translate: 'NAV.MANTENIMIENTO.TITLE',
                type     : 'collapsable',
                children : [
                    {
                        id        : 'listado-marcaciones',
                        title     : '📄 Listado ',
                        type      : 'item',
                        url       : '/listado-marcaciones',
                        exactMatch: true
                    }
                ]
            },
            {
                id       : 'usuarios',
                title    : '👥 USUARIOS',
                // translate: 'NAV.MANTENIMIENTO.TITLE',
                type     : 'collapsable',
                children : [
                    {
                        id        : 'listado-usuarios',
                        title     : '📄 Listado ',
                        type      : 'item',
                        url       : '/listado-usuarios',
                        exactMatch: true
                    }
                ]
            }

        ]
    }
];
