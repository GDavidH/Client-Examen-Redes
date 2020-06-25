import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs/Rx'

//@Injectable
export class GuerrillaService {

    myAppUrl: string = "";

    constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl){

        this.myAppUrl = baseUrl;
    }

    getAllGuerrilla() {
        return this._http.get('https://localhost:44331/Guerrilla').pipe(map((res: any) => {
            return res;
            
        }));

    }

    getGuerrillas(email) {
        return this._http.get('https://localhost:44331/Guerrilla?email='+ email).pipe(map((res: any) => {
            return res;
            
        }));

    }

    getGuerrillaByName(name: string) {
        return this._http.get('https://localhost:44331/Guerrilla/' + name).pipe(map((res: any) => {
             return res;
             
        }));

    }

    saveGuerrilla(name, guerrilla) {
        return this._http.post('https://localhost:44331/Guerrilla/'+ name, guerrilla).pipe(map((res: any) => {
            return res;
        }));
    }


    updateGuerrilla(name, units) {
        return this._http.put('https://localhost:44331/Guerrilla/'+name+'/units', units).pipe(map((res: any) => {
            return res;
        }));
    }

    attackGuerrilla(name:string, opponentName:string){
        return this._http.post('https://localhost:44331/Guerrilla/attack/'+ opponentName +
        '/?guerrillaSrc='+ name, name).pipe(map((res: any) => {
            return res;
            
        }));
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }

}  
