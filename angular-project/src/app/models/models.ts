export interface NavLink {
    label: string;
    link: string;
}

export interface Options {
    id: string;
    value: string;
    img_source?: string;
}

export interface Measurements {
    latimea: number;
    inaltimea: number;
    numarHornuri: number;
}

export interface Accesorii {
    name: string;
    cantitate: number;
}
export interface Price {
    name: string;
    cantitate: number;
    pret: number;
    total: number;
}

export interface TableColumn {
    key: string;
    label: string;
    template?: boolean;
}