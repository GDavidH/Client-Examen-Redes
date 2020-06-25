import { Component, Inject } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { GuerrillaService } from '../../services/guerrilla/guerrillaservice.service';

@Component({
    templateUrl: './fetchranking.component.html'
})

export class FetchRankingComponent {
    
    public rankingList: RankingData[];

    constructor(public http: HttpClient, private _router: Router, private _guerrillaService: GuerrillaService) {
        this.getGuerrilla();
    }

    getGuerrilla() {
        this._guerrillaService.getAllGuerrilla().subscribe(       
            data => this.rankingList=data        
        )
    }

}  
interface RankingData {
    guerrillaName: string,
    faction: string,
    rank: number

}  
