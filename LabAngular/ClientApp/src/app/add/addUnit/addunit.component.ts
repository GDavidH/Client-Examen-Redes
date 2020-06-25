
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
    units: string;
    error = '';
    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _guerrillaService: GuerrillaService, private _router: Router) {
        if (this._avRoute.snapshot.params["name"]) {
            this.name = this._avRoute.snapshot.params["name"];
        }
        this.unitForm = this._fb.group({
            AddAssault: ['0', [Validators.required]],
            AddEngineer: ['0', [Validators.required]],
            AddTank: ['0', [Validators.required]],
            AddBunker: ['0', [Validators.required]],

            Assault: ['0', [Validators.required]],
            Engineer: ['0', [Validators.required]],
            Tank: ['0', [Validators.required]],
            Bunker: ['0', [Validators.required]]
        })

        
    }

    ngOnInit(): void {
        this._guerrillaService.getGuerrillaByName(localStorage.getItem('name')+"")
        .subscribe((data) => {
            this.unitForm.controls['Assault'].setValue(data.army.assault);
            this.unitForm.controls['Engineer'].setValue(data.army.enginner);
            this.unitForm.controls['Tank'].setValue(data.army.tank);
            this.unitForm.controls['Bunker'].setValue(data.buildings.bunker);

        }, error => this.error = error)
    }

    save() {
        this.units = '{"army": {"assault": '+this.unitForm.value.AddAssault+
        ', "enginner": '+this.unitForm.value.AddEngineer+', "tank": '+this.unitForm.value.AddTank+
        '}, "buildings": {"bunker": '+this.unitForm.value.AddBunker+'}}';      
        //console.log(this.units);
       // console.log(JSON.parse(this.units));
        if (!this.unitForm.valid) {
            return;
        }
        
        else{
            //hay que validar sea la cuenta
            //console.log(this.unitForm.value);
            this._guerrillaService.updateGuerrilla(localStorage.getItem('name')+"" ,JSON.parse(this.units))
                .subscribe((data) => {
                    this._router.navigate(['/profile']);
                }, error => this.error = error)
        }  
    }
    cancel() {
        this._router.navigate(['/profile']);
    }
    get Assault() { return this.unitForm.get('AddAssault'); }
    get Engineer() { return this.unitForm.get('AddEngineer'); }
    get Tank() { return this.unitForm.get('AddTank'); }
    get Bunker() { return this.unitForm.get('AddBunker'); }

}
