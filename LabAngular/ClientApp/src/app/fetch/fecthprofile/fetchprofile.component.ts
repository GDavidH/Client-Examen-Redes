import { Component, Inject } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { GuerrillaService } from '../../services/guerrilla/guerrillaservice.service';

@Component({
    templateUrl: './fetchprofile.component.html'
})

export class FetchProfileComponent {
    
    public profileList: ProfiletData[];

    constructor(public http: HttpClient, private _router: Router, private _guerrillaService: GuerrillaService) {
        this.getGuerrilla();
    }

    getGuerrilla() {
        this._guerrillaService.getGuerrillas().subscribe(

            data => this.profileList=data
        )
    }

}  
interface ProfiletData {
    Oil: number,
    Money: number,
    People: number,

}  
