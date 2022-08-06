import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../../../core/_services/alert.service';
import { ClientAdress } from '../../client/models/clientadress.model';
import { Client } from '../../client/models/clientmodel.model';
import { ClientserviceService } from '../../client/services/clientservice.service';
import { Service } from '../models/manageservice.model';
import { Status } from '../models/status.model';
import { TypeService } from '../models/typeservice.mode';
import { ManageservicesService } from '../service/manageservices.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  data = new Service();
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  typeService: TypeService[];
  status: Status[];
  clientAdress: ClientAdress[];
  client : Client[];

  constructor(
    private modalService: NgbModal,
    private service: ManageservicesService,
    private serviceClient: ClientserviceService,
    private loading: NgxSpinnerService,
    private alertService: AlertService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.onload();
  }

  onload() {
    this.service.getTypeService().subscribe((res) => this.typeService = res);
    this.service.getStatus().subscribe((res) => this.status = res);
    this.serviceClient.getAll().subscribe((res) => this.client = res);
  }

  getAdressByClient() {
    this.service.getAdress(this.data.idcliente).subscribe((res) => this.clientAdress = res.result );
  }

  create(){
    const createClient = () => {
      this.loading.show();
      this.service.createService(this.data).subscribe(
        () => {
          this.alertService.success("Servicio creado exitosamente");
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


  closeModal() {
    this.activeModal.close();
  }
}
