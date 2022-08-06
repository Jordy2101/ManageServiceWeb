import {
    Component,
    ComponentFactoryResolver,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScriptLoaderService } from '../_services/script-loader.service';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { AlertComponent } from './_directives/alert.component';
import { LoginCustom } from './_helpers/login-custom';
import { Helpers } from '../../helpers';
import { AlertService } from './_services/alert.service';
import Swal from 'sweetalert2';
import { accountModuleAnimation } from '../../shared/animations/routerTransition';
import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
    selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
    templateUrl: './templates/login-4.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [accountModuleAnimation(),
        trigger('enterLogin',[
      state('void',style({
        transform: 'translateX(100%)',
        opacity:0
      })),
      transition(':enter',[
        animate(2000,style({
          transform: 'translateX(0)',
          opacity:1
        }))
      ])
    ])
  ]
  })
export class AuthComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    @ViewChild('alertSignin',
        { read: ViewContainerRef, static: false }) alertSignin: ViewContainerRef;
    @ViewChild('alertSignup',
        { read: ViewContainerRef, static: false }) alertSignup: ViewContainerRef;
    @ViewChild('alertForgotPass',
        { read: ViewContainerRef, static: false }) alertForgotPass: ViewContainerRef;
    constructor(
        private _router: Router,
        private _script: ScriptLoaderService,
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _authService: AuthenticationService,
        private _alertService: AlertService,
        private cfr: ComponentFactoryResolver) {
    }
    ngOnInit() {
        this.model.remember = true;
        // get return url from route parameters or default to '/'
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
        this._router.navigate([this.returnUrl]);
        this._script.loadScripts('body', [
            'assets/vendors/base/vendors.bundle.js',
            'assets/demo/demo12/base/scripts.bundle.js'], true).then(() => {
                Helpers.setLoading(false);
                LoginCustom.init();
            });
    }
    signin() {
        this.loading = true;
        localStorage.setItem('user', this.model.email);
        localStorage.setItem('password', this.model.password);
       let user =  localStorage.getItem('user');
        let password = localStorage.getItem('password');
        if(user === 'admin@gmail.com' && password === '123'){
        this._router.navigate([this.returnUrl]);
        }else {
            this._authService.logout();
            Swal.fire(
                'usuario incorrecto',
                '',
                'info'
              )
            this.loading = false;
        }
    }
    signup() {
        this.loading = true;
        this._userService.create(this.model).subscribe(
            data => {
                this.showAlert('alertSignin');
                this._alertService.success(
                    'Thank you. To complete your registration please check your email.',
                    true);
                this.loading = false;
                LoginCustom.displaySignInForm();
                this.model = {};
            },
            error => {
                this.showAlert('alertSignup');
                this._alertService.error(error);
                this.loading = false;
            });
    }
    forgotPass() {
        this.loading = true;
        this._userService.forgotPassword(this.model.email).subscribe(
            data => {
                this.showAlert('alertSignin');
                this._alertService.success(
                    'Cool! Password recovery instruction has been sent to your email.',
                    true);
                this.loading = false;
                LoginCustom.displaySignInForm();
                this.model = {};
            },
            error => {
                this.showAlert('alertForgotPass');
                this._alertService.error(error);
                this.loading = false;
            });
    }
    showAlert(target) {
        this[target].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this[target].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }
}