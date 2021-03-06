import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { coffeesData } from './coffeesData';
import { cartData } from '../cart/cartData';
import { CoffeeService } from './coffee.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Coffee } from './coffee';
import { Router } from '@angular/router';
import { CategoryService } from './category/category.service';
import { Category } from './category/category';
import { CoffeeOutput } from './coffee-output';
import { LoginService } from '../login/login.service';
import { User } from '../login/user';
import { apiMethods } from '../../environments/environment';
import { tokenNotExpired } from 'angular2-jwt';

@Component({
  selector: 'coffee',
  templateUrl: './coffees.component.html'
})
export class CoffeesComponent {

  coffees: Coffee[];
  filterArg: Category;
  $coffee: Subscription;

  public alerts: any = [];

  // Company Name and User Name
  email = '';
  companyName = '';

  @ViewChild('staticModal') button;

  onFilter(filter) {
    this.filterArg = filter;
  }

  constructor(private coffeeService: CoffeeService,
    private router: Router,
    private categoryService: CategoryService,
    private loginService: LoginService) {

    this.subToUserCoffees(this.loginService.user);

    // This is for the first time opening the page
    // and the user info is not loaded fast enough
    // from firebase
    loginService.userOutput.subscribe(
      (user: User) => {
        this.email = user.email;
        this.companyName = user.companyName;
        this.subToUserCoffees(user);
      }
    );

    this.categoryService.categoryChanged.subscribe(filterArg => {
      this.filterArg = filterArg;
      console.log(filterArg);
    });

  }

  private subToUserCoffees(user: User) {
    this.$coffee = this.coffeeService.loadAllCoffees(user).subscribe(
      coffees => {
        this.coffees = coffees;
        this.coffeeService.coffees = coffees;
        console.log(JSON.stringify(coffees));
      }
    );
  }

  newCoffee() {

    this.coffeeService.editCoffee(true, '');
    this.button.show();

  }

  onNgDestroy() {
    this.$coffee.unsubscribe();
  }

  hide() {
    this.button.hide();
  }

  hideModal() {
    this.hide();
  }

  onEdit(coffeeOutput) {
    this.button.show();
  }

  onAdd(coffeeName) {
    this.alerts.push({
      type: 'success',
      msg: `You successfully added ${coffeeName}`,
      timeout: 2000
    });
  }



}
