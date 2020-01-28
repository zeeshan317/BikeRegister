import { Component, OnInit } from '@angular/core';
import { BikeService } from 'src/app/services/bike.service';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  models: string[] = [
    'Globo MTB 29 Full Suspension',
    'Carbon Fiber Race Series',
    'Time Trial Blade Runner'
  ];
  bikeform: FormGroup;
  validMessage: string = "";

  constructor(private bikeService: BikeService) { }

  ngOnInit() {
    this.bikeform = new FormGroup({
      name: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      phone: new FormControl('',Validators.required),
      model: new FormControl('',Validators.required),
      serialNumber: new FormControl('',Validators.required),
      purchasePrice: new FormControl('',Validators.required),
      purchaseDate: new FormControl('',Validators.required),
      contact: new FormControl()
    });
  }

  submitRegistration(){

    if(this.bikeform.valid){
      this.validMessage = "Your vehicle have been successfully registered";
      this.bikeService.createBikeRegistration(this.bikeform.value).subscribe(
        data =>{
          this.bikeform.reset();
          return true;
        },
        error =>{
          return Observable.throw(error);
        }
      )
        } else{
          this.validMessage= "Please fill out form before submitting";
        }
      
    }
  }

