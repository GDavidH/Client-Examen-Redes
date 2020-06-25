
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { GuerrillaService } from '../../services/guerrilla/guerrillaservice.service';

@Component({
    templateUrl: './fetchattack.component.html'
})
export class FetchAttackComponent implements OnInit{
    
    attackForm: FormGroup;
    OpponentName: string;
    Name: string;
    units: string;
    attackResults:any;
    error = '';
    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _guerrillaService: GuerrillaService, private _router: Router) {
        if (this._avRoute.snapshot.params["opponentName"]) {
            this.OpponentName = this._avRoute.snapshot.params["opponentName"];
        }
        this.attackForm = this._fb.group({
            diTeam2: ['0', [Validators.required]],
            lootCap: ['0', [Validators.required]],
            assault: ['0', [Validators.required]],
            engineer: ['0', [Validators.required]],
            tank: ['0', [Validators.required]],
            bunker: ['0', [Validators.required]],
            money: ['0', [Validators.required]],
            oil: ['0', [Validators.required]],

            aiTeam1: ['0', [Validators.required]],
            assault2: ['0', [Validators.required]],
            engineer2: ['0', [Validators.required]],
            tank2: ['0', [Validators.required]],
            bunker2: ['0', [Validators.required]],
        })
        
        this.Name=localStorage.getItem('name')+"";
    }

    ngOnInit(): void {

    }

    attack(){
        this._guerrillaService.attackGuerrilla(this.Name, this.OpponentName).subscribe((data) => {
            this.attackResults = data;
            var a1=this.attackResults.guerrillas[1].army.assault;
            var e1=this.attackResults.guerrillas[1].army.engineer;
            var t1=this.attackResults.guerrillas[1].army.tank;
            var b1=this.attackResults.guerrillas[1].buildings.bunker;

            var a2=this.attackResults.guerrillas[0].army.assault;
            var e2=this.attackResults.guerrillas[0].army.engineer;
            var t2=this.attackResults.guerrillas[0].army.tank;
            var b2=this.attackResults.guerrillas[0].buildings.bunker;

            //After attack
            var aa1=this.attackResults.results[1].army.assault;
            var ae1=this.attackResults.results[1].army.engineer;
            var at1=this.attackResults.results[1].army.tank;
            var ab1=this.attackResults.results[1].buildings.bunker;

            var aa2=this.attackResults.results[0].army.assault;
            var ae2=this.attackResults.results[0].army.engineer;
            var at2=this.attackResults.results[0].army.tank;
            var ab2=this.attackResults.results[0].buildings.bunker;
            
            //Calculate Results
            this.getResults(a1,e1,t1,b1,a2,e2,t2,b2);
            this.getResultUnits(a1,e1,t1,b1,a2,e2,t2,b2,aa1,ae1,at1,ab1,aa2,ae2,at2,ab2);


        }, error => this.error = error)
    }

    cancel() {
        this._router.navigate(['/profile']);
    }

    getResults(assault:number, engineer:number, tank:number, bunker:number, 
        assault2:number, engineer2:number, tank2:number, bunker2:number) {

        var defense1 = assault*20+engineer*70+tank*20+bunker*600;
        var defense2 = assault2*20+engineer2*70+tank2*20+bunker2*600;

        var offense1 = assault*80+engineer*30+tank*500+bunker*0;
        var offense2 = assault2*80+engineer2*30+tank2*500+bunker2*0;

        var diT2=defense2/(defense2+offense1)+0.1;
        var aiT1=offense1/(offense1+defense2)+0.1;

        this.attackForm.controls['diTeam2'].setValue(diT2);
        this.attackForm.controls['aiTeam1'].setValue(aiT1);

        var lootCap=assault*25+engineer*60+tank*200+bunker*0;
        var lootCapMoney=Math.floor(Math.random() * (lootCap - 0 + 1)) + 0;
        var lootCapOil=lootCap-lootCapMoney;

        this.attackForm.controls['lootCap'].setValue(lootCap);
        this.attackForm.controls['money'].setValue(lootCapMoney);
        this.attackForm.controls['oil'].setValue(lootCapOil);
    }

    getResultUnits(assault:number, engineer:number, tank:number, bunker:number, 
        assault2:number, engineer2:number, tank2:number, bunker2:number,
        afterAssault:number, afterEngineer:number, afterTank:number, afterBunker:number, 
        afterAssault2:number, afterEngineer2:number, afterTank2:number, afterBunker2:number){

            var lostAsault1=assault-afterAssault;
            var lostEngineer1=engineer-afterEngineer;
            var lostTank1=tank-afterTank;
            var lostBunker1=bunker-afterBunker;

            this.attackForm.controls['assault'].setValue(lostAsault1);
            this.attackForm.controls['engineer'].setValue(lostEngineer1);
            this.attackForm.controls['tank'].setValue(lostTank1);
            this.attackForm.controls['bunker'].setValue(lostBunker1);

            var lostAsault2=assault2-afterAssault2;
            var lostEngineer2=engineer2-afterEngineer2;
            var lostTank2=tank2-afterTank2;
            var lostBunker2=bunker2-afterBunker2;

            this.attackForm.controls['assault2'].setValue(lostAsault2);
            this.attackForm.controls['engineer2'].setValue(lostEngineer2);
            this.attackForm.controls['tank2'].setValue(lostTank2);
            this.attackForm.controls['bunker2'].setValue(lostBunker2);

            
    }
    
    //get Assault() { return this.attackForm.get('AddAssault'); }


}
