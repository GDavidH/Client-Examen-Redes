
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuerrillaService } from '../../services/guerrilla/guerrillaservice.service';
import { identifierModuleUrl } from '@angular/compiler';
import { stringify } from 'querystring';

@Component({
    templateUrl: './addguerrilla.component.html'
})
export class RegisterGuerrilla implements OnInit{
    
    guerrillaForm: FormGroup;
    name:string
    error = '';
    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _guerrillaService: GuerrillaService, private _router: Router) {
       
            this.guerrillaForm = this._fb.group({
                Name: ['', [Validators.required]],
                Email: ['', [Validators.required]],
                Faction: ['', [Validators.required]]    
            })
    }

    ngOnInit(): void {
        //console.log(this.guerrillaForm.value);
    }


    
    save() {
                 
        if (!this.guerrillaForm.valid) {
            return;
        }
        else{
            console.log();
            this._guerrillaService.saveGuerrilla(this.guerrillaForm.value.Name, this.guerrillaForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/login-page']);
                }, error => this.error = error)
        }
    }
    cancel() {
        this._router.navigate(['/login-page']);
    }

    get Name() { return this.guerrillaForm.get('Name'); }
    get Email() { return this.guerrillaForm.get('Email'); }
    get Faction() { return this.guerrillaForm.get('Faction'); }
}
