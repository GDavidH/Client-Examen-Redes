
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Key } from 'protractor';

import { GuerrillaService } from '../services/guerrilla/guerrillaservice.service';
 

@Component({templateUrl: 'settings.component.html'})
export class SettingsComponent implements OnInit {
    settingsForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private _router: Router) {}

    ngOnInit() {
        this.settingsForm = this.formBuilder.group({
            ip: ['', Validators.required]
        });

        // reset login status

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.settingsForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.settingsForm.invalid) {
            return;
        }
        this.loading = true;
        localStorage.setItem('ip', this.settingsForm.value.ip);
        this.submitted = false;
        this._router.navigate(['/login-page']);
        
    }
}

