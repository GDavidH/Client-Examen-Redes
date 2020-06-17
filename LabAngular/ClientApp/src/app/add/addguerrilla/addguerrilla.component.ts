
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuerrillaService } from '../../services/guerrilla/guerrillaservice.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
    templateUrl: './addguerrilla.component.html'
})
export class RegisterGuerrilla implements OnInit{
    
    guerrillaForm: FormGroup;
    name:string
    errorMessage: any;
    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _guerrillaService: GuerrillaService, private _router: Router) {
        this.guerrillaForm = this._fb.group({

            GuerrillaName: ['', [Validators.required]],
            Email: ['', [Validators.required]],
            Type: ['', [Validators.required]]    

        })
    }

    ngOnInit(): void {
        
        this.name = "asd";
        this._guerrillaService.getGuerrillasByName(this.name)
            .subscribe((data) => {
                //this.guerrillaForm.controls['GuerrillaName'].setValue(data.GuerrillaName);
               // this.guerrillaForm.controls['Email'].setValue(data.Email);
                //this.guerrillaForm.controls['Faction'].setValue(data.Faction);
                
            }, error => this.errorMessage = error)

    }


    
    save() {
        if (!this.guerrillaForm.valid) {
            return;
        }
        else{
            this._guerrillaService.saveGuerrilla(this.guerrillaForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/login-page']);
                }, error => this.errorMessage = error)
        }
    }
    cancel() {
        this._router.navigate(['/login-page']);
    }

    get GuerrillaName() { return this.guerrillaForm.get('GuerrillaName'); }
    get Email() { return this.guerrillaForm.get('Email'); }
    get Faction() { return this.guerrillaForm.get('Faction'); }
}
