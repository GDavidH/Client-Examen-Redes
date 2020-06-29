
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
    error:'';
    messageWinner = '';
    messageLoser = '';
    messageTied = '';
    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _guerrillaService: GuerrillaService, private _router: Router) {
        if (this._avRoute.snapshot.params["opponentName"]) {
            this.OpponentName = this._avRoute.snapshot.params["opponentName"];
        }
        this.attackForm = this._fb.group({
            diTeam2: ['', [Validators.required]],
            lootCap: ['', [Validators.required]],
            assault: ['', [Validators.required]],
            engineer: ['', [Validators.required]],
            tank: ['', [Validators.required]],
            bunker: ['', [Validators.required]],
            money: ['', [Validators.required]],
            oil: ['', [Validators.required]],

            aiTeam1: ['', [Validators.required]],
            assault2: ['', [Validators.required]],
            engineer2: ['', [Validators.required]],
            tank2: ['', [Validators.required]],
            bunker2: ['', [Validators.required]],
        })
        
        this.Name=localStorage.getItem('name')+"";
    }

    ngOnInit(): void {

    }

    attack(){
        this._guerrillaService.attackGuerrilla(this.Name, this.OpponentName).subscribe((data) => {
            this.attackResults = data;
            //before attack
            var a1=this.attackResults.guerrillas[0].army.assault;
            var e1=this.attackResults.guerrillas[0].army.engineer;
            var t1=this.attackResults.guerrillas[0].army.tank;
            var b1=this.attackResults.guerrillas[0].buildings.bunker;

            var a2=this.attackResults.guerrillas[1].army.assault;
            var e2=this.attackResults.guerrillas[1].army.engineer;
            var t2=this.attackResults.guerrillas[1].army.tank;
            var b2=this.attackResults.guerrillas[1].buildings.bunker;

            var money=this.attackResults.guerrillas[0].resources.money;
            var oil=this.attackResults.guerrillas[0].resources.oil;

            //After attack
            var aa1=this.attackResults.results[0].army.assault;
            var ae1=this.attackResults.results[0].army.engineer;
            var at1=this.attackResults.results[0].army.tank;
            var ab1=this.attackResults.results[0].buildings.bunker;

            var aa2=this.attackResults.results[1].army.assault;
            var ae2=this.attackResults.results[1].army.engineer;
            var at2=this.attackResults.results[1].army.tank;
            var ab2=this.attackResults.results[1].buildings.bunker;

            var afterMoney=this.attackResults.results[0].resources.money;
            var afterOil=this.attackResults.results[0].resources.oil;

            //Calculate Results
            this.getResult(a1,e1,t1,b1,a2,e2,t2,b2,
                aa1,ae1,at1,ab1,aa2,ae2,at2,ab2, 
                money, oil, afterMoney, afterOil);


        }, error => this.error = error)
    }

    cancel() {
        this._router.navigate(['/profile']);
    }

    getResult(assault:number, engineer:number, tank:number, bunker:number, 
        assault2:number, engineer2:number, tank2:number, bunker2:number,
        afterAssault:number, afterEngineer:number, afterTank:number, afterBunker:number, 
        afterAssault2:number, afterEngineer2:number, afterTank2:number, afterBunker2:number, 
        money:number, oil:number, aftermoney:number, afterOil:number){

        //defense team2  
        var defense2 = assault*20+engineer*70+tank*20+bunker*600;
        //offense team1
        var offense1 = assault2*80+engineer2*30+tank2*500+bunker2*0;
        //defeseindex team2   
        var diT2=defense2/(defense2+offense1)+0.1;
        //offenseindex team1
        var aiT1=offense1/(offense1+defense2)+0.1;
        //show defeseindex & offenseindex
        this.attackForm.controls['diTeam2'].setValue(diT2);
        this.attackForm.controls['aiTeam1'].setValue(aiT1);

        //Calculate Loot
        
        var lootCapMoney=aftermoney-money;
        var lootCapOil=afterOil-oil;
        var lootCap=lootCapMoney+lootCapOil;
        //show Loot
        this.attackForm.controls['lootCap'].setValue(lootCap);
        this.attackForm.controls['money'].setValue(lootCapMoney);
        this.attackForm.controls['oil'].setValue(lootCapOil);

        //LOSSES
        var lostAsault1=assault-afterAssault;
        var lostEngineer1=engineer-afterEngineer;
        var lostTank1=tank-afterTank;
        var lostBunker1=bunker-afterBunker;
        //show lusses team2
        this.attackForm.controls['assault'].setValue(lostAsault1);
        this.attackForm.controls['engineer'].setValue(lostEngineer1);
        this.attackForm.controls['tank'].setValue(lostTank1);
        this.attackForm.controls['bunker'].setValue(lostBunker1);
        //lusses team1
        var lostAsault2=assault2-afterAssault2;
        var lostEngineer2=engineer2-afterEngineer2;
        var lostTank2=tank2-afterTank2;
        var lostBunker2=bunker2-afterBunker2;
        //show lusses team1
        this.attackForm.controls['assault2'].setValue(lostAsault2);
        this.attackForm.controls['engineer2'].setValue(lostEngineer2);
        this.attackForm.controls['tank2'].setValue(lostTank2);
        this.attackForm.controls['bunker2'].setValue(lostBunker2);

        //calculate winner
        var team1Units = afterAssault + afterEngineer + afterTank + afterBunker; 
        var team2Units = afterAssault2 + afterEngineer2 + afterTank2 + afterBunker2;
        //show message
        if(team1Units>team2Units){
            this.messageWinner = 'YOU WIN!!!'
        }else if(team1Units<team2Units){
            this.messageLoser = 'YOU LOSE!!!'
        }else{
            this.messageTied = 'TIED ATTACK!!!'
        }
            
    }
    
    //get Assault() { return this.attackForm.get('AddAssault'); }


}
