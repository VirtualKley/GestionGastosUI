import { TipoCategoria } from "../enums";

export interface CategoryRequest {
    nombre: string;
    icono: string;
    colorHex: string;
    tipo: TipoCategoria;
}

