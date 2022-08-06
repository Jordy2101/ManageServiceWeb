import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme/theme.component';
import { AuthModule } from './auth/auth.module';
import { ThemeRoutingModule } from './theme/theme-routing.module';
import { LayoutModule } from './theme/layouts/layout.module';
import { ScriptLoaderService } from './_services/script-loader.service';
import { AlertService } from './_services/alert.service';
import { FilterService } from './_services/filter.service';
import { ApiService } from './_services/api.service';
import { AuthRoutingModule } from './auth/auth-routing.routing';
import { AuthGuard } from './auth/_guards/auth.guard';
import { PropertyovService } from './_services/propertyov.service';
import { StatusService } from './_services/status.service';
import { TypecurrencyService } from './_services/typecurrency.service';
import { TypepayService } from './_services/typepay.service';

@NgModule({
  imports: [
    AuthModule, ThemeRoutingModule, LayoutModule, AuthRoutingModule
  ],
  declarations: [ThemeComponent],
  exports: [LayoutModule, AuthModule, ThemeRoutingModule, ThemeComponent, AuthRoutingModule],
  providers: [ScriptLoaderService, AlertService, FilterService,StatusService,TypecurrencyService,TypepayService,PropertyovService,
    ApiService, AuthGuard]
})
export class CoreModule { }
