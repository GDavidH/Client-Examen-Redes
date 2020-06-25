
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuerrillaService } from '../../services/guerrilla/guerrillaservice.service';
import { identifierModuleUrl } from '@angular/compiler';
import { stringify } from 'querystring';

@Component({
    templateUrl: './fetchprofile.component.html'
})
export class FetchProfileComponent implements OnInit{
    
    profileForm: FormGroup;
    name:string
    errorMessage: any;
    title: string = localStorage.getItem('name')+"";
    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _guerrillaService: GuerrillaService, private _router: Router) {
       
            this.profileForm = this._fb.group({
                Oil: ['', [Validators.required]],
                Money: ['', [Validators.required]],
                People: ['', [Validators.required]]    
            })
    }

    ngOnInit(): void {
        console.log(this.profileForm.value.AddBunker);
        this._guerrillaService.getGuerrillaByName(localStorage.getItem('name')+"")
        .subscribe((data) => {
            this.profileForm.controls['Oil'].setValue(data.resources.oil);
            this.profileForm.controls['Money'].setValue(data.resources.money);
            this.profileForm.controls['People'].setValue(data.resources.people);

        }, error => this.errorMessage = error)
    }
    get Oil() { return this.profileForm.get('Oil'); }
    get Money() { return this.profileForm.get('Money'); }
    get People() { return this.profileForm.get('People'); }
}
