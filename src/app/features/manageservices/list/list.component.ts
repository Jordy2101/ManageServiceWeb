import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { AlertService } from '../../../core/auth/_services';
import { Service } from '../models/manageservice.model';
import { ManageservicesService } from '../service/manageservices.service';
import { config } from '../../../../environments/environment';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  filter: any = {};
  data: Service[] = [];
  page: number = 1;
  itemsPerPage: any;
  totalItems: any;
  getPermission: any;

  constructor(
    private modalService: NgbModal,
    private service: ManageservicesService,
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

  CreateService() {
    var modal = this.modalService.open(AddComponent, config.modalConfig);
    modal.componentInstance.notifyParent.subscribe(() => {
      this.getAll(false);
    });
  }


  // Detail(id: any){
  //   var modal = this.modalService.open(DetailComponent, config.modalConfig);
  //   modal.componentInstance.id = id;
  //   modal.componentInstance.notifyParent.subscribe(() => {
  //     this.getAll(false);
  //   });
  // }
  
  pageChanged(event: any) {
    this.page = event;
    this.getAll(false);
  }

}
