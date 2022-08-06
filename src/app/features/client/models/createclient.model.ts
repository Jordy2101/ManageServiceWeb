import { ClientAdress } from "./clientadress.model";
import { Client } from "./clientmodel.model";

export class CreateClient {
    clientDto: Client;
    listAdress: ClientAdress[] = [];
}