import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DefaultComponent } from '../../core/theme/pages/default/default.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '../../core/theme/layouts/layout.module';
import { SharedModule } from '../../shared/shared.module';
import { ManageservicesService } from './service/manageservices.service';
import { AddComponent } from './add/add.component';




const routes: Routes = [
  {
    path: "",
    component: DefaultComponent,
    children: [
        {
            path: "",
            component: ListComponent,
        },
    ],
  }
];



@NgModule({
  declarations: [ListComponent, AddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    LayoutModule,
    SharedModule,
    ReactiveFormsModule
  ], entryComponents: [AddComponent],
  providers: [
    ManageservicesService
  ],
})
export class ManageservicesModule { }
