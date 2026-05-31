import { TipoCategoria } from "../enums";

export interface CategoryResponse {
    id: number;
    nombre: string;
    icono: string;
    colorHex: string;
    tipo: TipoCategoria;
}

