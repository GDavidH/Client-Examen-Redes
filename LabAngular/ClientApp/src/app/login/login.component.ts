import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Key } from 'protractor';

import { GuerrillaService } from '../services/guerrilla/guerrillaservice.service';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    name: string;
    error = '';
    guerrillas:any = [];


    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService, 
        private _guerrillaService: GuerrillaService){ 
            this.loginForm = this.formBuilder.group({
                Email: ['', Validators.required]
            })  
            this.name='';       
        }

    ngOnInit() {
        // reset login status
        this.name='';       
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit(form: FormGroup) {
               
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        else{
            //buscar por email
            this._guerrillaService.getGuerrillas(this.loginForm.value.Email)
            .subscribe((data) => {

                this.guerrillas = data;
                this.name = this.guerrillas[0].guerrillaName;

                localStorage.setItem('email', form.value.Email);
                localStorage.setItem('name', this.name);
                this.router.navigate(['/profile']);

            }, error => this.error = error)
        }
          
    }
}
