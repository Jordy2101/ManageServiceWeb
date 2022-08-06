import { ClientAdress } from "../../client/models/clientadress.model";
import { Client } from "../../client/models/clientmodel.model";
import { Status } from "./status.model";
import { TypeService } from "./typeservice.mode";

export class Service   {
    id: number;
    name: string;
    description: string;
    idcliente: number;
    idstatus: number;
    idtypeService: number;
    idadress: number;
    client: Client;
    status: Status;
    typeService: TypeService;
    clientAdress: ClientAdress;
}