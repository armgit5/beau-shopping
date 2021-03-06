import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { coffeesData } from './coffeesData';
import {Coffee} from './coffee';
import { cartData } from '../cart/cartData';
import { CoffeeService } from './coffee.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { CategoryService } from './category/category.service';
import { CoffeeOutput } from './coffee-output';

@Component({
  selector: 'coffee-component',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent implements OnInit {

    @Input()
    coffee: Coffee;

    @Output()
    editCoffeeOutput = new EventEmitter<CoffeeOutput>();

    @Output()
    addCoffeeOutput = new EventEmitter<string>();

    mouseOver: boolean = false;
    added: boolean = false;

    coffeeCount:number = 1;
    coffeeCountModel = 1;
    cart = cartData.cart;
    comment:string = '';
    public alerts: any = [];


    constructor(private coffeeService: CoffeeService,
                private router: Router) {

    }

    ngOnInit() {

    }

    plus() {
      this.coffeeCount++;
      // console.log("plus");
    }

    minus() {
      if (this.coffeeCount > 1) {
        this.coffeeCount--;
      }
      // console.log("minus");
    }

    addCoffeeAlert() {
      this.added = true;
      setTimeout(() => {
        this.added = false;
      }, 1000);
    }

    add() {
      this.addCoffeeAlert();
      this.coffeeService.addToCart(this.coffee, Number(this.coffeeCount), this.comment);
      this.coffeeCount = 1;
      // this.alerts.push({
      //   type: 'md-local',
      //   msg: `${this.coffee.name} is added to cart`,
      //   timeout: 2000
      // });
      // this.comment = "";
      this.addCoffeeOutput.emit(this.coffee.name);
    }

    editCoffee() {
      this.coffeeService.editCoffee(false, this.coffee.$key);
      this.editCoffeeOutput.emit();
    }

    deleteCoffee() {
      this.coffeeService.deleteCoffee(this.coffee.$key);
    }

    over() {
      this.mouseOver = true;
    }

    out() {
      this.mouseOver = false;
    }


}
