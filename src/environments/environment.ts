// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

export const environment: any = {
  production: false,
};

export const config: any = {
  apiUrl: "http://localhost:34972/api/",
  diferenciaMinima: 100,
  modalConfig: <NgbModalOptions>{
    size: "lg",
    backdrop: "static",
    keyboard: true,
  },
};
export const endpoint: any = {
  client: config.apiUrl +"Client",
  clientAdress: config.apiUrl +"ClientAdress",
  service: config.apiUrl + "Service",
  typeService: config.apiUrl + "TypeService",
  status: config.apiUrl + "Status",
};

export const key ={
  nameKey : 'C6070305D2C84F81B48D36782282B3C6',
  key: 'EADF81F867A3462FB8DC5F1FBF55DD29',
}
