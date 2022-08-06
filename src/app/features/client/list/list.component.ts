import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { Client } from '../models/clientmodel.model';
import { ClientserviceService } from '../services/clientservice.service';
import { config } from '../../../../environments/environment';
import { AddComponent } from '../add/add.component';
import { AlertService } from '../../../core/_services/alert.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  filter: any = {};
  data: Client[] = [];
  page: number = 1;
  itemsPerPage: any;
  totalItems: any;

  constructor(
    private modalService: NgbModal,
    private service: ClientserviceService,
    private loading: NgxSpinnerService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getAll(false)
  }


  getAll(resetPage: boolean, page?: any) {
    if (!this.filter.keyword) this.filter.keyword = "";
    if (page)
      this.page = page;

    this.filter.aproved = false; 
    this.filter.pageSize = 10;
    this.loading.show();
    this.service.getPaged(this.page, this.filter).subscribe(
      (response) => {
        this.data = response.result;
        this.itemsPerPage = response.pageSize;
        this.totalItems = response.totalCount;
        this.loading.hide();
      },
      (error) => {
        Swal.fire(
          error.error,
          '',
          'info'
        )
        this.loading.hide();
      }
    );
  }

  createClient() {
    var modal = this.modalService.open(AddComponent, config.modalConfig);
    modal.componentInstance.notifyParent.subscribe(() => {
      this.getAll(false);
    });
  }

  
  inactivateClient(id: number) {
    // const inactivate = () => {
    //   this.service
    //     .inactivateTruck(id, false)
    //     .subscribe((resp: any) => {
    //       this.alertService.success("El camion ha sido inactivado");
    //       this.getAll(false);
    //     });
    // };
    // this.alertService.question(
    //   inactivate,
    //   "¿Esta seguro que desea inactivar este camión?",
    //   ""
    // );
  }


  
  pageChanged(event: any) {
    this.page = event;
    this.getAll(false);
  }

}
