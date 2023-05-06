export interface NavLink {
    label: string;
    link: string;
}

export interface Options {
    id: string | { _id: string, _meta: string };
    value: string;
    img_source?: string;
}

export interface Measurements {
    latimea: number;
    inaltimea: number;
    numarHornuri: number;
}

export interface Accesorii {
    id: number;
    label: string;
    price: string;
    qty: number;
    _key: string;
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

export class ModelTabla {
    brand: number;
    culoare: number;
    finisaj: number;
    grosime :{_id: number, _meta: string};
    model: number
}

export class ModelDimensiuniAcoperis1A {
    inaltimea_1 : number;
    latimea_3: number;
    lungimea_2: number;
    numar_hornuri: number;
    diametru: number;
}

export class ModelDimensiuniAcoperis2A {
    inaltimea_1 : number;
    latimea_2: number;
    latimea_4: number;
    lungimea_3: number;
    numar_hornuri: number;
}

export class ModelDimensiuniAcoperis4A {
    adancimea_6:number;
    adancimea_7:number;
    cateta_5:number;
    inaltimea_1:number;
    latimea_3:number;
    linia_4:number;
    lungimea_2:number;
    numarHornuri:number;
}
