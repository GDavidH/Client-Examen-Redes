
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Key } from 'protractor';

import { GuerrillaService } from '../services/guerrilla/guerrillaservice.service';

@Component({templateUrl: './settings.component.html'})
export class SettingsComponent implements OnInit {
    settingsForm: FormGroup;
    loading = false;
    submitted = false;
    name: string;
    error = '';


    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService, 
        private _guerrillaService: GuerrillaService){ 
            this.settingsForm = this.formBuilder.group({
              IP: ['', Validators.required]
            })         
        }

    ngOnInit() {

        // reset login status
        this.authenticationService.logout();
        this.name='David';
    }

    // convenience getter for easy access to form fields
    
    
}

