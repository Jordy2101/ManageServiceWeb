import { Client } from "./clientmodel.model";

export class ClientAdress   {
    id: number;
    adress: string;
    idCliente: number;
    isActive: boolean;
    client: Client | null;
}