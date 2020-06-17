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

    getGuerrillas() {
       
        return this._http.get('https://localhost:44331/Guerrilla/guerrilla/').pipe(map((res: any) => {
            return res;
        }));

    }

    getGuerrillasByName(name: string) {
        name = "asd";
        return this._http.get('https://localhost:44331/Guerrilla/guerrilla/' + name).pipe(map((res: any) => {
             return res;
        }));

    }

    saveGuerrilla(guerrilla) {

        return this._http.post('https://localhost:44331/Guerrilla/guerrilla/', guerrilla).pipe(map((res: any) => {
            return res;
        }));
    }


    updateGuerrilla(guerrilla) {
        return this._http.put('https://localhost:44331/Guerrilla/guerrilla/', guerrilla).pipe(map((res: any) => {
            return res;
        }));
    }


    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }

}  
