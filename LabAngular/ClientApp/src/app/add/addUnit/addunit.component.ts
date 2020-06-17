
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { GuerrillaService } from '../../services/guerrilla/guerrillaservice.service';

@Component({
    templateUrl: './addUnit.component.html'
})
export class RegisterUnit implements OnInit{
    
    unitForm: FormGroup;
    name: string;
    errorMessage: any;
    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _guerrillaService: GuerrillaService, private _router: Router) {
        if (this._avRoute.snapshot.params["name"]) {
            this.name = this._avRoute.snapshot.params["name"];
        }
        this.unitForm = this._fb.group({
            Assault: ['', [Validators.required]],
            Engineer: ['', [Validators.required]],
            Tank: ['', [Validators.required]],
            Bunker: ['', [Validators.required]]
        })
    }

    ngOnInit(): void {

    
        this._guerrillaService.getGuerrillasByName(this.name)
            .subscribe((data) => {
                this.unitForm.controls['Assault'].setValue(data.Assault);
                this.unitForm.controls['Engineer'].setValue(data.Engineer);
                this.unitForm.controls['Tank'].setValue(data.Tank);
                this.unitForm.controls['Bunker'].setValue(data.Bunker);

            }, error => this.errorMessage = error)

        

    }

    save() {
        if (!this.unitForm.valid) {
            return;
        }
        else{
            this._guerrillaService.updateGuerrilla(this.unitForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/fetch-profile']);
                }, error => this.errorMessage = error)
        }  
    }
    cancel() {
        this._router.navigate(['/fetch-profile']);
    }
    get Assault() { return this.unitForm.get('AddAssault'); }
    get Engineer() { return this.unitForm.get('AddEngineer'); }
    get Tank() { return this.unitForm.get('AddTank'); }
    get Bunker() { return this.unitForm.get('AddBunker'); }

}
