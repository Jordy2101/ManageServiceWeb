import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../../../core/_services/alert.service';
import { ClientAdress } from '../models/clientadress.model';
import { Client } from '../models/clientmodel.model';
import { CreateClient } from '../models/createclient.model';
import { ClientserviceService } from '../services/clientservice.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  data: Client = new Client();
  createClient: CreateClient = new CreateClient();
  list: string[] = [];
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  items: any[] = [];
  count: any;
  adress: string[] = [];

  constructor(
    private modalService: NgbModal,
    private service: ClientserviceService,
    private loading: NgxSpinnerService,
    private alertService: AlertService,
    public activeModal: NgbActiveModal
  ) { }


  ngOnInit() {
  }


  duplicatedDiv(event: any) {
    this.items = [];
    this.count = event.target.value;
    for (let i = 0; i < this.count; i++) {
      this.items.push(i);
    }
  }

  save() {
    if (
      !this.data.name ||
      !this.data.age
    ) {
      return this.alertService.info(
        'Todos los campos son obligatorios',
        'Informacion'
      );
    }

    for (let i = 0; i < this.adress.length; i++) {
      let adress = this.adress[i];
      const AdressClient: ClientAdress = {
        id: 0,
        idCliente: 0,
        isActive: true,
        adress: adress,
        client: null
      }
      this.createClient.listAdress.push(AdressClient);
    }

    this.createClient.clientDto = this.data;

    const createClient = () => {
      this.loading.show();
      this.service.createClient(this.createClient).subscribe(
        () => {
          this.alertService.success("Cliente Creado exitosamente");
          this.notifyParent.emit();
          this.activeModal.close();
          this.loading.hide();
        },
        (error) => {
          this.alertService.error(error);
          this.loading.hide();
        }
      );
    };
    this.alertService.question(createClient, "¿Desea guardar?", "");
  }


  addAdress(event: any) {
    this.adress.push(event.target.value);
  }

  closeModal() {
    this.activeModal.close();
  }
}
