import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RestService} from '../services/rest.service';
import {Payment} from '../Payment';
import {Observable} from 'rxjs';
import {Rent} from '../rent';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  pay: Payment = new Payment();
  rent: Observable<Rent[]>;
  price = localStorage.getItem('price');
  submitted = false;
  count: number;
  last: Rent;
  constructor(private  restService: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rent = this.restService.getRentList();
    this.rent.subscribe(result => { this.count = result.length; });
  }

  save() {
    this.pay.rentID = this.count + '';
    this.pay.price = '5000';
    this.restService.createPay(this.pay)
      .subscribe(data => console.log(data), error => console.log(error));
    this.pay = new Payment();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
